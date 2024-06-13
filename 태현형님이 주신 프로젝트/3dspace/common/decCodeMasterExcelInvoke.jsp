
<%@page import="com.dec.util.DecExcelUtil"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="java.io.File"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="org.apache.commons.fileupload.DiskFileUpload"%>
<%@page import="java.util.List"%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>

<%@include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/emxUIConstantsInclude.inc"%>


<%@include file = "../emxUICommonHeaderEndInclude.inc" %>

<%
String sResult = null;
try{
	String sFolder = request.getParameter("folder");
	DiskFileUpload upload	= new DiskFileUpload();
	//List items 				= upload.parseRequest(request);  
	List files = upload.parseRequest(request);
	MapList mlExcelData = null;
	
	String sFilename = "";
	FileItem file = null;
	File outfile = null;
	Iterator iter = files.iterator();
	
	int index;
	while (iter.hasNext()) {
		file = (FileItem) iter.next();
		sFilename = file.getName();
		if(DecStringUtil.isNotNullString(sFilename)) {
			if (sFilename.contains("/")) {
				index = sFilename.lastIndexOf("/");
				sFilename = sFilename.substring(index);
			}
			if (sFilename.contains("\\")) {
				index = sFilename.lastIndexOf("\\");
				sFilename = sFilename.substring(index + 1);
			}
		
			try {
				outfile = new File(sFolder + sFilename);
				file.write(outfile);
				mlExcelData = DecExcelUtil.getCodeMasterExcelDataToList(outfile.getPath());
			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			} finally{
				System.gc();
				System.runFinalization();
				if(!outfile.delete()) {
					outfile.deleteOnExit();
				}
			}
		}
	}
	Map mParam = new HashMap();
	mParam.put("objectList", mlExcelData);
	sResult = JPO.invoke(context, "decCodeMaster", null, "importCodeMasterExcelData", JPO.packArgs(mParam), String.class);

}
catch (Exception e) {
	e.printStackTrace();
	sResult = e.getMessage();
}
out.clear();

%>
<%=sResult%>