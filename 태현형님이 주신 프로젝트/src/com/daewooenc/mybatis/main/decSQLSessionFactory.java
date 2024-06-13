package com.daewooenc.mybatis.main;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.dec.util.DecMatrixUtil;
import com.dec.util.DecMatrixUtil.SERVER_TYPE;
import com.dec.util.decPropertyUtil;

public class decSQLSessionFactory {
	
	private static Map<String, SqlSessionFactory> _sqlSessionFactoryCacheMap = new HashMap<String, SqlSessionFactory>();
	
	public static void initSession() throws Exception{
		_sqlSessionFactoryCacheMap.clear();
	}
	
	private static String getEnv() throws Exception{
		String envExpr = null;
		if ( DecMatrixUtil.getServerType() == SERVER_TYPE.LOCAL || DecMatrixUtil.getServerType() == SERVER_TYPE.DEV )
		{
			envExpr = "development";
		}
		else
		{
			envExpr = "production";
		}
		return envExpr;
	}
	
	public static SqlSession getSession() throws Exception{
		String envExpr = getEnv();
		return getSession(envExpr, null);
	}
	
	public static SqlSession getBatchSession() throws Exception{
		String envExpr = getEnv();
		return getSession(envExpr, ExecutorType.BATCH);
	}
	
	public static SqlSession getBatchSession(String env) throws Exception{
		return getSession(env, ExecutorType.BATCH);
	}
	
	public static SqlSession getSession(String env, ExecutorType execType) throws Exception{
		try {
			SqlSessionFactory factory = getSQLSessionFactory(env);
			SqlSession sqlSession = null;
			if ( execType == null )
			{
				sqlSession = factory.openSession();
			}
			else
			{
				sqlSession = factory.openSession(execType);
			}
			return sqlSession;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	private static SqlSessionFactory getSQLSessionFactory(String env) throws Exception{
		if ( _sqlSessionFactoryCacheMap == null )
		{
			_sqlSessionFactoryCacheMap = new HashMap<String, SqlSessionFactory>();
		}
		
		if ( !_sqlSessionFactoryCacheMap.containsKey(env) )
		{
			String resource = "com/daewooenc/mybatis/config/mybatis-config.xml";
			try (InputStream inputStream = Resources.getResourceAsStream(resource)) {
				SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
				_sqlSessionFactoryCacheMap.put(env, builder.build(inputStream, env, decPropertyUtil.getProperties("com/daewooenc/mybatis/config/connection.properties")));
			}
		}
		return _sqlSessionFactoryCacheMap.get(env);
	}
	
}
