<%@page import="java.util.List"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	
	
	// Select
	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
		Map selectParamMap = new HashMap();
		selectParamMap.put("SITE_CD", "T7");
		List<Map> resultList = sqlSession.selectList("Project.selectChangeRegister", selectParamMap);
		
		for (Map resultMap : resultList)
		{
			out.println(resultMap);
			out.print("<br/>");
		}
	}
	
	/*
	// Insert
	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
		// success case
		Map insertParamMap = new HashMap();
		insertParamMap.put("SITE_CD", "1234567");
		insertParamMap.put("CWP_NO", "CWP-B01-WP2.5-012-FI-LC-103");
		int insertedRow = sqlSession.insert("Project.insertChangeRegister", insertParamMap);
		// error case
		Map insertParamMap2 = new HashMap();
		insertParamMap2.put("SITE_CD", "12345678");
		insertParamMap2.put("CWP_NO", "CWP-B01-WP2.5-012-FI-LC-103");
// 		int insertedRow2 = sqlSession.insert("Project.insertChangeRegister", insertParamMap2);
// 		System.out.println(insertedRow2);
		sqlSession.commit();
	}

	// Update
	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
		// success case
		Map updateParamMap = new HashMap();
		updateParamMap.put("ID", "4038");
		updateParamMap.put("SITE_CD", "T3");
		int updatedRow = sqlSession.update("Project.updateChangeRegister", updateParamMap);
		// error case
		Map updateParamMap2 = new HashMap();
		updateParamMap2.put("ID", "4038");
		updateParamMap2.put("SITE_CD", "12345678");
// 		int updatedRow2 = sqlSession.update("Project.updateChangeRegister", updateParamMap2);
// 		System.out.println(updatedRow2);
		sqlSession.commit();
	}
	*/
	
	
	// Delete
	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
		// success case
		Map deleteParamMap = new HashMap();
		deleteParamMap.put("ID", "4038");
		int deletedRow = sqlSession.delete("Project.deleteChangeRegister", deleteParamMap);
		// error case
		Map deleteParamMap2 = new HashMap();
		deleteParamMap2.put("ID", "99999");
		int deletedRow2 = sqlSession.delete("Project.deleteChangeRegister", deleteParamMap2);
		System.out.println(deletedRow2);
		sqlSession.commit();
	}
	/*
	*/
	
} catch(Exception e) {
	e.printStackTrace();
	throw e;
} finally {
}
%>