<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<%@ page import="java.io.*"%>
<%@ page import="java.text.*" %>
<%@ page import="java.lang.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>

<%
	request.setCharacterEncoding("UTF-8");
	String sType = request.getParameter("type");
	Map m = request.getParameterMap();

	// 파일 업로드된 경로
	String root = request.getSession().getServletContext().getRealPath("/");
	String savePath = root + "\\WEB-INF\\resources\\ExampleImportExcel";

	// 서버에 실제 저장된 파일명
	String filename = "" ;
	// 실제 내보낼 파일명
	String orgfilename = "" ;
	
	switch (sType) {
	case "KeyQtyMaster":
		filename = "Key Quantity Tracking_master Sample.xlsx" ;
		orgfilename = "Key Quantity Tracking_master Sample.xlsx" ;
		break;
	case "KeyQty":
		filename = "Key Quantity Tracking_report Sample.xlsx" ;
		orgfilename = "Key Quantity Tracking_report Sample.xlsx" ;
		break;
	case "CodeMasterCreate":
		filename = "Code Master Create Sample.xlsx" ;
		orgfilename = "Code Master Create Sample.xlsx" ;
		break;
	case "CodeMasterAdd":
		filename = "Code Master Add Sample.xlsx" ;
		orgfilename = "Code Master Add Sample.xlsx" ;
		break;
	case "KPI":
		filename = "Construction KPI Sample.xlsx" ;
		orgfilename = "Construction KPI Sample.xlsx" ;
		break;
	case "CWP":
		filename = "CWP Master Sample.xlsx" ;
		orgfilename = "CWP Master Sample.xlsx" ;
		break;
	case "CWPPlan":
		filename = "CWP Plan Sample.xlsx" ;
		orgfilename = "CWP Plan Sample.xlsx" ;
		break;
	case "IWP":
		filename = "IWP Execution Sample.xlsx" ;
		orgfilename = "IWP Execution Sample.xlsx" ;
		break;
	case "CWPNo":
		filename = "CWP No Sample.xlsx" ;
		orgfilename = "CWP No Sample.xlsx" ;
		break;
	case "BMTracking":
		break;
	default:
		break;
	}
	
	 

	InputStream in = null;
	OutputStream os = null;
	File file = null;
	boolean skip = false;
	String client = "";


	try{
		

		// 파일을 읽어 스트림에 담기
		try{
			file = new File(savePath, filename);
			in = new FileInputStream(file);
		}catch(FileNotFoundException fe){
			skip = true;
		}



		
		client = request.getHeader("User-Agent");

		// 파일 다운로드 헤더 지정
		response.reset() ;
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Description", "JSP Generated Data");


		if(!skip){

			
			// IE
			if(client.indexOf("MSIE") != -1){
				response.setHeader ("Content-Disposition", "attachment; filename="+new String(orgfilename.getBytes("KSC5601"),"ISO8859_1"));

			}else{
				// 한글 파일명 처리
				orgfilename = new String(orgfilename.getBytes("utf-8"),"iso-8859-1");

				response.setHeader("Content-Disposition", "attachment; filename=\"" + orgfilename + "\"");
				response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
			}  
			
			response.setHeader ("Content-Length", ""+file.length() );
			out.clear();
			pageContext.pushBody();

			os = response.getOutputStream();
			byte b[] = new byte[(int)file.length()];
			int leng = 0;
			
			while( (leng = in.read(b)) > 0 ){
				os.write(b,0,leng);
			}

		}else{
			response.setContentType("text/html;charset=UTF-8");
			out.println("<script language='javascript'>alert('파일을 찾을 수 없습니다');</script>");
		}
		
		in.close();
		os.close();
	}catch(Exception e){
	  e.printStackTrace();
	}
%>