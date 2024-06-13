<%@page import="java.io.File"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file = "emxNavigatorInclude.inc"%>

<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.decUITableIndented" scope="session"/>

<%
OutputStream os = null; 
FileInputStream fis = null;		
try { 
	String timeStamp = emxGetParameter(request, "timeStamp");
	MapList objectList = indentedTableBean.getObjectList(timeStamp);
	HashMap tableData = indentedTableBean.getTableData(timeStamp);
	MapList columns = (MapList) tableData.get("columns");
	
	Map programMap = new HashMap();
	programMap.put("exportMode", emxGetParameter(request, "exportMode"));
	programMap.put("exportTitle", emxGetParameter(request, "exportTitle"));
	programMap.put("objectList", objectList);
	programMap.put("columns", columns);
	
	Map resultMap =	JPO.invoke(context, "decCommonUtil", null, "export", JPO.packArgs(programMap), Map.class);
	String result = (String) resultMap.get("result");
	if ( "Success".equalsIgnoreCase(result) )
	{
		String filePath = (String) resultMap.get("filePath");
		String fileName = (String) resultMap.get("fileName");
		
		File file = new File(filePath);
		fis = new FileInputStream(file);
		fileName = new String(fileName.getBytes("utf-8"), "iso-8859-1");

		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
		response.setHeader("Content-Length", "" + file.length());
		
		os = response.getOutputStream();
		
		int length = (int) file.length();
		
		byte[] buffer = new byte[length];
		int leng = 0;
		
		while ( (leng = fis.read(buffer)) > 0 ) {
			os.write(buffer, 0, length);
		}
		
	}
	
} catch(Exception e) {
	e.printStackTrace();
	throw e;
} finally {
	if ( fis != null ) fis.close();
	if ( os != null ) os.close();
}
%>