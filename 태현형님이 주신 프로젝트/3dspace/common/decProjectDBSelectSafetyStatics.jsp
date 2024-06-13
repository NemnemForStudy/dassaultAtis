<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.domain.util.*"%>
<%@page import="matrix.db.JPO"%>
<%@page import="matrix.db.Environment"%>
<%@page import="com.matrixone.apps.domain.*"%>
<%@page import="java.util.*"%>
<%@page import="java.util.regex.Pattern"%>
<%@page import="java.util.regex.Matcher"%>
<%@page import="java.time.LocalDate"%>
<%@page import="java.time.format.DateTimeFormatter"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="java.sql.Timestamp"%>
<%@page import="java.text.SimpleDateFormat"%>

<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@ include file="../emxUICommonAppInclude.inc"%>
<%@ page import="java.util.HashMap" %>

<%
  String objectId = (String) request.getParameter("objectId");
  String year = (String) request.getParameter("year");
  String month = (String) request.getParameter("month");
  String week = (String) request.getParameter("weekNo");
  String date = (String) request.getParameter("date");
  HashMap map = new HashMap();	
  PrintWriter out2 = response.getWriter();
  
  try (SqlSession sqlSession = decSQLSessionFactory.getSession()){
	  	Map insertParamMap = new HashMap();
	  	
	  	long longDate = Long.parseLong(date);  
    	String pattern = "yyyyMMdd";
    	SimpleDateFormat ProjectSpacedateFormat = new SimpleDateFormat(pattern);     
		String formatDate = (String) ProjectSpacedateFormat.format(new Timestamp(longDate));
	  	
	  	DomainObject object = new DomainObject(objectId);
	  	String objectName = object.getInfo(context,"name");

  		insertParamMap.put("SITE_CD",objectName); 
		insertParamMap.put("CUT_OFF_YEAR",year); 
		insertParamMap.put("CUT_OFF_MONTH",month); 
		insertParamMap.put("CUT_OFF_WEEK",week); 
		insertParamMap.put("CUT_OFF_DATE",formatDate); 
		
		List<Map> selectList = sqlSession.selectList("Project.selectSafetyStaticsOne2",insertParamMap);
		
		HashMap hm = new HashMap();
		if(selectList.size() > 0){
			hm = (HashMap) selectList.get(0);
		}
		
		if(!hm.isEmpty()){
			Iterator<String> iter = hm.keySet().iterator();
            
            while(iter.hasNext()) {
                String key = iter.next();
                String value = String.valueOf(hm.get(key));
                map.put(key,value);
            }
		}
		
		System.out.println("넘어올 데이터 : "+ insertParamMap );
		if(map.size() < 1){
			map.put("Data","Empty");
		}
  }catch(Exception e) {
		e.printStackTrace();
		throw e;
  } 
  String json = new com.google.gson.Gson().toJson(map);
  out2.flush();
  out2.write(json);
  out2.flush();
  System.out.println("json : "+json);
%>
