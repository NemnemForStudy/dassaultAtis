<%@page import="com.google.gson.Gson"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="java.io.File"%>
<%@page import="java.util.HashMap"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>
<%
  try{
	  
  String objectId = (String) request.getParameter("objectId");
  String fileName = (String) request.getParameter("fileName");
  
  HashMap map = new HashMap();
  PrintWriter out2 = response.getWriter();

  String savePath = context.createWorkspace();
  // 업로드한 파일의 전체 경로를 DB에 저장하기 위함
  String m_fileFullPath = savePath + "/" + fileName;
	
  DomainObject doObj = DomainObject.newInstance(context, objectId);

  File file = new File(m_fileFullPath);

  String genericFormat = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_format_generic);

  FileList files = new FileList();
  matrix.db.File file2 = new matrix.db.File(file.getName(), genericFormat);
  files.addElement(file2);
	
  doObj.checkoutFiles(context, false, "generic", files, "c:\\temp");
  
  map.put("msg", "success");
 
  String json = new com.google.gson.Gson().toJson(map);
  out2.flush();
  out2.write(json);
  out2.flush();
  
  }catch(Exception e){
		e.printStackTrace();
		throw e;
  }
/*
String json = new com.google.gson.Gson().toJson(map);
out2.flush();
out2.write(json);
out2.flush();
System.out.println("json : "+json);*/
%>