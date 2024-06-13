package com.dec.util;

import java.io.IOException;
import java.io.InputStream;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.PreparedStatement;

import java.util.Properties;
import java.util.HashMap;
import java.util.Map;

import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import matrix.db.Context;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;

import com.dec.util.DecStringUtil;

public class DecDBUtil {
//	public DecDBUtil() {
//	}

	// ORACLE Info
	public static final String SYSTEM_DRIVER = "oracle.jdbc.driver.OracleDriver";
	public static final String SYSTEM_URL = "jdbc:oracle:thin:@WS-DSK-K5K:1521:orcl";
	public static final String SYSTEM_USERID = "X3DDEC_ADMIN"; // DB사용자계정
	public static final String SYSTEM_USERPASS = "X3DDEC_ADMIN"; // PASSWORD

	public static final String TABLE_DEC_CWP_CHANGE_REGISTER = "DEC_CWP_CHANGE_REGISTER";
	/**
	 * admin_platform Context 반환
	 * 
	 * @param isTriggerOff
	 * @param isHistoryOff
	 * @return
	 */
	public static Context getContextForAdminPlatform(String sCompanyName, String sProjectName, boolean isTriggerOff,
			boolean isHistoryOff) {
		String[] setRole = null;

		if (sProjectName.equals("Default")) {
			return setContextUser("creator", "", isTriggerOff, isHistoryOff);
		} else {
			setRole = new String[] { "ctx::VPLMProjectAdministrator." + sCompanyName + "." + sProjectName,
					"ctx::VPLMProjectLeader." + sCompanyName + "." + sProjectName };

			return setContextUser("admin_platform", "Qwer1234", isTriggerOff, isHistoryOff, setRole);
		}
	}

	private static Context setContextUser(String userId, String password, boolean isTriggerOff, boolean isHistoryOff,
			String... setRole) {
		Context context = null;

		try {
			context = new Context("");

			context.setUser(userId);
			context.setPassword(password);

			for (String str : setRole) {
				context.setRole(str);
			}

			context.connect();

			ContextUtil.pushContext(context);

			if (DomainAccess.init(context))
				context.setApplication("VPLM");

			ContextUtil.popContext(context);

			if (isTriggerOff)
				MqlUtil.mqlCommand(context, "trigger off");

			if (isHistoryOff)
				MqlUtil.mqlCommand(context, "history off");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return context;
	}

	/**
	 * 주어진 Table에 데이터 구함
	 * 
	 * @param sql 데이터를 Select할 SQL문
	 * @return MapList Data를 Select해서 MapList로 반환함.
	 * @exception Exception if the insert statement dose not execute correctly.
	 */

	public static MapList selectDataList(Connection conn, String tableName, String columnNames)
			throws Exception {
		return selectDataList(conn, tableName, columnNames, DecConstants.EMPTY_STRING, DecConstants.EMPTY_STRING);
	}

	public static MapList selectDataList(Connection conn, String tableName, String columnNames, Map whereMap,
			String orderbys) throws Exception {

		StringBuffer sqlSB = new StringBuffer();
		sqlSB.append(" SELECT " + columnNames + " ");
		sqlSB.append(" FROM " + tableName + " ");
		sqlSB.append(" WHERE 1 = 1 ");
	
		for (Object key : whereMap.keySet()) {
			sqlSB.append(" AND " + key + " = '" + whereMap.get(key) + "'");
		}
	
		if (!orderbys.equals("")) {
			sqlSB.append(" ORDER BY " + orderbys);
		}
	
		String sql = sqlSB.toString();
	
		return selectDataList(conn, sql);
	}


	public static MapList selectDataList(Connection conn, String tableName, String columnNames, String sbWhere,
			String orderbys) throws Exception {
		StringBuffer sqlSB = new StringBuffer();
		sqlSB.append(" SELECT " + columnNames + " ");
		sqlSB.append(" FROM " + tableName + " ");
		sqlSB.append(" WHERE 1 = 1 ");
		
		if (DecStringUtil.isNotEmpty(sbWhere)) {
			sqlSB.append(sbWhere);
		}
		
		if (!DecStringUtil.equals(orderbys, "")) {
			sqlSB.append(" ORDER BY " + orderbys);
		}
		
		String sql = sqlSB.toString();
		
		return selectDataList(conn, sql);
	}

	public static MapList selectDataList(Connection conn, String sql) throws Exception {
		PreparedStatement stmt = null;
		ResultSet rset = null;
		MapList mlReturn = new MapList();
		try {
			stmt = conn.prepareStatement(sql);

			rset = stmt.executeQuery();

			ResultSetMetaData rsmd = rset.getMetaData();

			int count = rsmd.getColumnCount();

			while (rset.next()) {
				Map map = new HashMap();

				for (int i = 1; i <= count; i++) {
					String val = rset.getString(i);

					if (rset.getObject(i) != null && (rsmd.getColumnType(i) == java.sql.Types.DATE
							|| rsmd.getColumnType(i) == java.sql.Types.TIME
							|| rsmd.getColumnType(i) == java.sql.Types.TIMESTAMP)) {
						val = rset.getObject(i).toString().substring(0, 19).replace('-', '.');
					}

					map.put(rsmd.getColumnName(i), DecStringUtil.nullToEmpty(val));
				}

				mlReturn.add(map);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			if (rset != null)
				rset.close();
			if (stmt != null)
				stmt.close();
		}
		return mlReturn;
	}

	/**
	 * DB Connection
	 *
	 * @param nmDriver   String
	 * @param nmUrl      String
	 * @param nmUser     String
	 * @param nmPassword String
	 * @throws Exception
	 * @return Connection
	 */
	public static Connection getDefaultDBConnection()
			throws Exception {
		Connection conn = null;

		try {
			// Load the JDBC driver
			Class.forName(SYSTEM_DRIVER);

			// Create a connection to the database
			conn = DriverManager.getConnection(SYSTEM_URL, SYSTEM_USERID, SYSTEM_USERPASS);
		} catch (ClassNotFoundException e) {
			throw new Exception("!!!!!!!! Could not find the database driver");
		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("!!!!!!!! Could not connect to the database");
		}

		return conn;
	}
	
	private static Connection getDBConnection(String nmDriver, String nmUrl, String nmUser, String nmPassword)
			throws Exception {
		Connection conn = null;

		try {
			// Load the JDBC driver
			Class.forName(nmDriver);

			// Create a connection to the database
			conn = DriverManager.getConnection(nmUrl, nmUser, nmPassword);
		} catch (ClassNotFoundException e) {
			throw new Exception("!!!!!!!! Could not find the database driver");
		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("!!!!!!!! Could not connect to the database");
		}

		return conn;
	}

	/**
	 * JDBC Connection 정보를 가진 Properties 파일을 읽어 들인다.
	 *
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @return Properties
	 */
//	public static Properties getJDBCPropFile() 
//        throws IOException, ClassNotFoundException 
//    {
//		return getPropFile( "Connection.properties" );
//	}

	/**
	 * 일반적인 Property File을 로드한다.
	 * 
	 * @param sFileName String
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @return Properties
	 */
//	public static Properties getPropFile( String sFileName ) 
//        throws IOException, ClassNotFoundException 
//    {
//		Properties prop = new Properties();

//		DBUtil pu = new DBUtil();

//		InputStream ips = pu.getClass().getResourceAsStream( "/" + sFileName );

//		prop.load( ips );
//		ips.close();

//		return prop;
//	}

	/**
	 * 특정 Properties 파일에서 특정 Attribute의 값을 읽어서 리턴한다.
	 *
	 * @param sFileName String
	 * @param sName     String
	 * @return String
	 */
//	public static String getPropValue( String sFileName, String sName ) 
//    {
//		String sRet = "";

//		try 
//        {
//			sRet = ( String )getPropFile( sFileName ).get( sName );
//		} 
//        catch( Exception e ) 
//        {
//		}

//		if( sRet == null                    || 
//            sRet.equals( "" )               || 
//            sRet.equalsIgnoreCase( "null" ) )
//        {
//			return "";
//		} 
//        else 
//        {
//            if( sRet != null ) 
//            {
//                sRet = sRet.trim();
//            }
//		}

//		return sRet;
//	}

	/**
	 * DB Auto Commit 비활성
	 *
	 * @param conn Connection
	 * @throws Exception
	 */
	public static void disableAutoCommit(Connection conn) throws Exception {
		try {
			conn.setAutoCommit(false);
		} catch (SQLException e) {
			throw e;
		}
	}

	/**
	 * DB Auto Commit 활성
	 * 
	 * @param conn Connection
	 * @throws Exception
	 */
	public static void enableAutoCommit(Connection conn) throws Exception {
		try {
			conn.setAutoCommit(true);
		} catch (SQLException e) {
			throw e;
		}
	}

	/**
	 * DB Connection 종료
	 * 
	 * @param conn Connection
	 * @throws Exception
	 */
	public static void closeConnection(Connection conn) throws Exception {
		try {
			if (conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (SQLException e) {
			throw e;
		}
	}

	/**
	 * DB Commit 처리
	 *
	 * @param conn Connection
	 * @throws Exception
	 */
	public static void commitJDBCTransaction(Connection conn) throws Exception {
		try {
			conn.commit();
		} catch (SQLException e) {
			throw e;
		}
	}

	/**
	 * DB Rollback 처리
	 *
	 * @param conn Connection
	 * @throws Exception
	 */
	public static void rollbackJDBCTransaction(Connection conn) throws Exception {
		try {
			conn.rollback();
		} catch (SQLException e) {
			throw e;
		}
	}

	/**
	 * 주어진 Table의 값을 변경함
	 * 
	 * @param tableName 값을 변경할 Table 이름
	 * @param setlist   변경할 값을 표현하는 문장
	 * @param where     변겨될 항목에 대한 조건문
	 * @return <code>true</code>값이 정상적으로 변경된 경우, 값이 변경된 행이 없으면<code>false</code>
	 * @exception Exception if the update statement dose not execute correctly.
	 */
	public static void update(Connection conn, String tableName, Map setlistMap, Map whereMap) throws Exception {
		PreparedStatement stmt = null;

		String sql = "";

		try {
			StringBuffer setlistSB = new StringBuffer();

			int cnt = 0;

			for (Object key : setlistMap.keySet()) {
				if (cnt == 0) {
					setlistSB.append(" " + key + " = '" + setlistMap.get(key) + "'");
				} else {
					setlistSB.append(", " + key + " = '" + setlistMap.get(key) + "'");
				}
				cnt++;
			}

			StringBuffer whereSB = new StringBuffer();

			for (Object key : whereMap.keySet()) {
				whereSB.append(" AND " + key + " = '" + whereMap.get(key) + "'");
			}

			sql = "UPDATE " + tableName + " SET " + setlistSB.toString() + " WHERE 1 = 1 " + whereSB.toString();

			stmt = conn.prepareStatement(sql);

			int inserted = stmt.executeUpdate();

			if (inserted == 0)
				throw new SQLException();
		} catch (Exception e) {
			throw new Exception("update Error : " + e.toString());
		} finally {
			if (stmt != null)
				stmt.close();
		}
	}

	/**
	 * 주어진 Table의 데이타를 삭제함.
	 * 
	 * @param tableName 값을 변경할 Table 이름
	 * @param setlist   변경할 값을 표현하는 문장
	 * @param where     변겨될 항목에 대한 조건문
	 * @return <code>true</code>값이 정상적으로 변경된 경우, 값이 변경된 행이 없으면<code>false</code>
	 * @exception Exception if the update statement dose not execute correctly.
	 */
	public static void delete(Connection conn, String tableName, Map whereMap) throws Exception {
		PreparedStatement stmt = null;

		String sql = "";

		try {
			int cnt = 0;

			StringBuffer whereSB = new StringBuffer();

			cnt = 0;

			for (Object key : whereMap.keySet()) {
				if (cnt == 0) {
					whereSB.append(" " + key + " = '" + whereMap.get(key) + "'");
				} else {
					whereSB.append(" AND " + key + " = '" + whereMap.get(key) + "'");
				}
				cnt++;
			}

			sql = "DELETE FROM " + tableName + " WHERE " + whereSB.toString();

			stmt = conn.prepareStatement(sql);

			int inserted = stmt.executeUpdate();

			if (inserted == 0)
				throw new SQLException();
		} catch (Exception e) {
			throw new Exception("delete Error : " + e.toString());
		} finally {
			if (stmt != null)
				stmt.close();
		}
	}

	/**
	 * 주어진 Table에 데이터 추가함
	 * 
	 * @param tableName 데이터를 추가할 Table 이름
	 * @param cols      column 이름
	 * @param values    값
	 * @return <code>true</code>값이 정상적으로 추가된 경우, 값이 추가된 행이 없으면<code>false</code>
	 * @exception Exception if the insert statement dose not execute correctly.
	 */
	public static void insert(Connection conn, String tableName, Map mapData) throws Exception {

		// convert Excel to DB Column Name
		// list = convertDBColumnMappingList(conn, tableName, list);

		StringList colList = new StringList();

		try {
			for (Object obj : mapData.keySet()) {
				String colName = (String) obj;

				if (colName.equals("ID"))
					continue;

				colList.add(colName);
			}

			StringBuffer colsSB = new StringBuffer();

			for (String colName : colList) {
				if (colsSB.length() > 0) {
					colsSB.append(", " + colName);
				} else {
					colsSB.append(colName);
				}
			}

			MapList maplistDecimalCol = selectDecimalColList(conn, tableName);
			MapList mlDateCol = selectDateColList(conn, tableName);

			StringBuffer valsSB = new StringBuffer();

			// valsSB.append(" CONVERT(CHAR(19), GETDATE(), 20)");

			for (String colName : colList) {
				String val = (String) mapData.getOrDefault(colName, "");
				val = val.replaceAll("'", "\"");

				boolean bDecimalCol = false;
				boolean bDateCol = false;

				for (int k = 0; k < maplistDecimalCol.size(); k++) {
					Map mapDecimalCol = (Map) maplistDecimalCol.get(k);

					String sDecimalCol = (String) mapDecimalCol.get("COLUMN_NAME");

					if (colName.equals(sDecimalCol)) {
						bDecimalCol = true;
						break;
					}
				}

				for (int k = 0; k < mlDateCol.size(); k++) {
					Map mapDateCol = (Map) mlDateCol.get(k);

					String sDateCol = (String) mapDateCol.get("COLUMN_NAME");

					if (colName.equals(sDateCol)) {
						bDateCol = true;
						break;
					}
				}

				if (bDecimalCol) {
					if (valsSB.length() > 0) {
						valsSB.append(", " + val);
					} else {
						valsSB.append(val);
					}
				} else if(bDateCol) {
					if (valsSB.length() > 0) {
						valsSB.append(", TO_DATE('" + val + "', 'YYYY-MM-DD HH24-MI-SS')");
					} else {
						valsSB.append("TO_DATE('" + val + "', 'YYYY-MM-DD HH24-MI-SS')");
					}
				} else {
					if (valsSB.length() > 0) {
						valsSB.append(", '" + val + "'");
					} else {
						valsSB.append("'" + val + "'");
					}
				}
			}

			insert(conn, tableName, colsSB.toString(), valsSB.toString());
		} catch (Exception e) {
			throw new Exception("insert Error : " + e.toString());
		}
	}

	public static MapList selectDecimalColList(Connection conn, String tableName) throws Exception {
		PreparedStatement stmt = null;
		ResultSet rset = null;

		MapList list = new MapList();

		String sql = "";

		try {
			StringBuffer sqlSB = new StringBuffer();
			sqlSB.append(" SELECT COLUMN_NAME");
		//	sqlSB.append(" FROM INFORMATION_SCHEMA.COLUMNS");
			sqlSB.append(" FROM all_tab_columns");
			sqlSB.append(" WHERE TABLE_NAME = '" + tableName + "'");
		//	sqlSB.append(" AND DATA_TYPE IN ('bigint','int','Numeric','Float','Real','decimal')");
			sqlSB.append(" AND DATA_TYPE IN ('INTEGER','NUMBER','FLOAT','REAL','DECIMAL')");

			sql = sqlSB.toString();

			stmt = conn.prepareStatement(sql);

			rset = stmt.executeQuery();

			ResultSetMetaData rsmd = rset.getMetaData();

			int count = rsmd.getColumnCount();

			while (rset.next()) {
				Map map = new HashMap();

				Map mapResult = new HashMap();

				map.put("COLUMN_NAME", (String) rset.getString("COLUMN_NAME"));

				list.add(map);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		} finally {
			if (rset != null)
				rset.close();
			if (stmt != null)
				stmt.close();
		}

		return list;
	}
	
	public static MapList selectDateColList(Connection conn, String tableName) throws Exception {
		PreparedStatement stmt = null;
		ResultSet rset = null;

		MapList list = new MapList();

		String sql = "";

		try {
			StringBuffer sqlSB = new StringBuffer();
			sqlSB.append(" SELECT COLUMN_NAME");
		//	sqlSB.append(" FROM INFORMATION_SCHEMA.COLUMNS");
			sqlSB.append(" FROM all_tab_columns");
			sqlSB.append(" WHERE TABLE_NAME = '" + tableName + "'");
		//	sqlSB.append(" AND DATA_TYPE IN ('bigint','int','Numeric','Float','Real','decimal')");
			sqlSB.append(" AND DATA_TYPE IN ('DATE','TIMESTAMP')");

			sql = sqlSB.toString();

			stmt = conn.prepareStatement(sql);

			rset = stmt.executeQuery();

			ResultSetMetaData rsmd = rset.getMetaData();

			int count = rsmd.getColumnCount();

			while (rset.next()) {
				Map map = new HashMap();

				Map mapResult = new HashMap();

				map.put("COLUMN_NAME", (String) rset.getString("COLUMN_NAME"));

				list.add(map);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		} finally {
			if (rset != null)
				rset.close();
			if (stmt != null)
				stmt.close();
		}

		return list;
	}

	public static void insert(Connection conn, String tableName, String cols, String values) throws Exception {
		PreparedStatement stmt = null;

		String sql = "";

		try {
			sql = "INSERT INTO " + tableName + " (" + cols + ")  VALUES (" + values + ")";

			stmt = conn.prepareStatement(sql);

			int inserted = stmt.executeUpdate();

			if (inserted == 0)
				throw new SQLException();
		} catch (Exception e) {
			System.out.println("sql===>" + sql);
			throw new Exception("insert Error : " + e.toString());
		} finally {
			if (stmt != null)
				stmt.close();
		}
	}
}
