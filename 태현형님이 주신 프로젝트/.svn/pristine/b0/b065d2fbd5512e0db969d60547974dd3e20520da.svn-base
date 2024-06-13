<%@page import="java.util.Map"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.math.BigDecimal"%>
<%
  String projectCode = (String) request.getParameter("projectCode");
  String item = (String) request.getParameter("item");
  String status = (String) request.getParameter("status");
 
  HashMap map = new HashMap();	
  PrintWriter out2 = response.getWriter();
  
  List<Map> ClickItemList = null;
  
  List<String> detailList = new ArrayList();
  
  List<Map> sendList = new ArrayList();
  
  try(SqlSession sqlSession = decSQLSessionFactory.getSession())
  {
  	Map selectParamMap = new HashMap();
  	selectParamMap.put("SITE_CD",projectCode);
	selectParamMap.put("ITEM",item);
	selectParamMap.put("STATUS",status);
	
	ClickItemList = sqlSession.selectList("Project.selectDashMaterialStatusDetails", selectParamMap);
	
	for(int i=0;i < ClickItemList.size();i++){
		map = (HashMap) ClickItemList.get(i);
		sendList.add(map);
	}
	System.out.println(sendList);
  }catch(Exception e){
  	e.printStackTrace();
		throw e;
  }
  
  Map jsonMap = new HashMap();
  jsonMap.put("data", sendList);
// out.println(sendList);

//   String json = new com.google.gson.Gson().toJson(sendList);
String json = new com.google.gson.Gson().toJson(jsonMap);
  out2.flush();
  out2.write(json);
  out2.flush();
//   System.out.println("json : "+json);
%>
