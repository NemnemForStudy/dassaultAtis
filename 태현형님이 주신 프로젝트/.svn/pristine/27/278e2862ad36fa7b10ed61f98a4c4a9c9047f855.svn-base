<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.domain.util.MapList"%>
<%@page import="org.apache.commons.fileupload.*,java.util.*,java.io.*"%>
<%@page import="matrix.db.JPO"%>
<%@page import="matrix.db.Environment"%>
<%@page import="com.matrixone.apps.domain.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
StringBuilder sbReturn = new StringBuilder();
	try{
		String sFolder = request.getParameter("folder");
		// Save file on disk
		DiskFileUpload upload	= new DiskFileUpload();
		//List items 				= upload.parseRequest(request);  
		List files = upload.parseRequest(request);
		
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
				
				// Added by hslee on 2023.06.23 --- [s]
				if (sFilename.contains(".")) {
					index = sFilename.lastIndexOf(".");
					String sExtension = sFilename.substring(index + 1);
					sFilename = sFilename.substring(0, index) + System.currentTimeMillis() + "." + sExtension;
				}
				// Added by hslee on 2023.06.23 --- [e]
			
				try {
					// 비교하여 화면에 보여주기위한 엑셀파일 복사
				    outfile = new File(sFolder + sFilename);
					file.write(outfile);
				} catch (Exception e) {
					System.gc();
					System.runFinalization();
					// Modified by hslee on 2023.06.23 --- [s]
					try {
						if(!outfile.delete()) {
							outfile.deleteOnExit();
						}
					} catch(Exception e2) {
						e2.printStackTrace();
					}
					// Modified by hslee on 2023.06.23 --- [e]
					e.printStackTrace();
					throw e;
				}
			}
		}
		sbReturn.append("./decDashboardemxIndentedTable.jsp?table=decCwpTaskCompareExcelTable&program=emxDnD:getCodeMasterExcelData&freezePane=ActionCnt,Row,Action,Message");
		sbReturn.append("&fileName=");
		sbReturn.append(outfile.getName());
		System.out.println("sbReturn 지나감");
	} catch (Exception e) {
		e.printStackTrace();
	}
%><%=sbReturn.toString()%>
