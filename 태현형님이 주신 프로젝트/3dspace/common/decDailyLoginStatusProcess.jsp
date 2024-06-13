<%@page import="java.sql.SQLException"%>
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


<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@ include file="../emxUICommonAppInclude.inc"%>
<%@ page import="java.util.HashMap" %>


<%
  // 필요한 데이터를 처리하는 로직을 작성합니다.
 // HashMap map2 = request.getParameterMap();
  String proId = (String) request.getParameter("proId");
  String[] dates = proId.split(",");
  System.out.println("proId :"+proId);
  HashMap map = new HashMap();	
  PrintWriter out2 = response.getWriter();
  DateTimeFormatter originalFormatter = DateTimeFormatter.ofPattern("M/d/yyyy HH:mm:ss");  
  String mapInputData = "";
  String userNameStr ="";
  String personFullNameStr ="";
  String personEmailStr ="";
  try {
		try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ){
			Map selectParamMap = new HashMap();
			for(int i = 0; i <dates.length; i++) {
			//	LocalDate yesterday = LocalDate.now().minusDays(i);
			//	String start_date = yesterday.format(dateTimeFormatter); // mql 접속기록에 일치하는 데이터형태
			//	System.out.println( "조회할 날짜의 형태 : "+ start_date);
				String loginDate = dates[i];
				selectParamMap.put("LOGIN_DATE",  dates[i]);
				List<Map> resultList = sqlSession.selectList("Project.selectDailyLoginStatus", selectParamMap);
				
				userNameStr 	  +=  "'";
				personFullNameStr +=  "'";
    			personEmailStr 	  +=  "'";
				
				StringList userNameList = new StringList();
				StringList fullNameList = new StringList();
				StringList emailList = new StringList();
				
    			for(Object oDecImageHolder : resultList) {
    				Map mDecImageHolder = (Map)oDecImageHolder;
    				String userName = (String) mDecImageHolder.get("PERSON_NAME");
    				System.out.println("userName: "+userName);
    				userNameList.add(userName);
    				
    				String mPersonFullName = MqlUtil.mqlCommand(context, "print person $1 select $2 dump",
    						userName,"fullname");
    				String mPersonEmail = MqlUtil.mqlCommand(context, "print person $1 select $2 dump",
    						userName,"email");
    				
    				System.out.println("mPersonFullName : "+mPersonFullName);
    				System.out.println("email : "+mPersonEmail);
    				
    				userNameStr += userName+"|";
    				personFullNameStr += mPersonFullName+"|";
    				personEmailStr += mPersonEmail+"|";
    				
    				fullNameList.add(mPersonFullName);
    				emailList.add(mPersonEmail);
    			}
    			userNameStr 	  = userNameStr 		+ "',";
    			personFullNameStr = personFullNameStr   + "',";
    			personEmailStr 	  = personEmailStr      + "',";
    			
    			
	
				int rows = resultList.size();
				String loginUserCount = String.valueOf(rows);
				mapInputData += loginUserCount+",";
				
				
			//	System.out.println("categories : "+categories.substring(0, categories.length()-1));
			//	System.out.println( "data : "+ data.substring(0, data.length()-1) );
			}
			
			userNameStr = userNameStr.substring(0, userNameStr.length()-2);
			personFullNameStr = personFullNameStr.substring(0, personFullNameStr.length()-2);
			personEmailStr = personEmailStr.substring(0, personEmailStr.length()-2);
			
			System.out.println( "userNameStr : "+ userNameStr);
			System.out.println( "personFullNameStr : "+ personFullNameStr);
			System.out.println( "personEmailStr : "+ personEmailStr);
			
			map.put("userName",userNameStr);
			map.put("personName",personFullNameStr);
			map.put("eMail",personEmailStr);
			
			String str = mapInputData.substring(0, mapInputData.length() - 1);
			System.out.println( "넘어올 데이터 : "+ str );
			map.put("logindata",str);
		}
			
	}catch(SQLException e) {
		e.printStackTrace();
		throw e;
	} finally {
	}


  String json = new com.google.gson.Gson().toJson(map);
  out2.flush();
  out2.write(json);
  out2.flush();
  System.out.println("json : "+json);
%>
