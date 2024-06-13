import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.daewooenc.mybatis.main.decSQLSessionFactory;
import com.dec.util.DecConstants;
import com.dec.util.DecStringUtil;
import com.dec.util.decPropertyUtil;
import com.matrixone.apps.domain.util.MqlUtil;

import matrix.db.Context;
import matrix.db.JPO;

@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
public class decSSO_mxJPO {
	
	private static final Logger logger = LoggerFactory.getLogger(decSSO_mxJPO.class);
/*
	public Map checkSSO(Context context, String[] args) throws Exception{
		HttpURLConnection con = null;
		try (SqlSession sqlSession = decSQLSessionFactory.getSession()){
			Map programMap = JPO.unpackArgs(args);
			String username = (String) programMap.get("username");
			String password = (String) programMap.get("password");
			String token = new String(Base64.getEncoder().encode((username + ":" + password).getBytes()));
			
			Map resultMap = new HashMap();
			
			// Get SSO Check URL
			boolean checkPlatformPassword = false;
			DecMatrixUtil.SERVER_TYPE serverType = DecMatrixUtil.getServerType();
			List<Map> resultList = sqlSession.selectList("Project.selectSSOUser");
			for(Map mResult : resultList) {
				String sPName = (String)mResult.get("PERSON_NAME");
				if(DecStringUtil.equals(sPName, username)) {
					checkPlatformPassword = true;
				}
			}
			if (!checkPlatformPassword)
			{
				if ( serverType == DecMatrixUtil.SERVER_TYPE.PROD )
//					if ( serverType == DecMatrixUtil.SERVER_TYPE.PROD || serverType == DecMatrixUtil.SERVER_TYPE.DEV )
				{
					Properties connectionProp = decPropertyUtil.getConnectionProperties();
					String ssoCheckURL = connectionProp.getProperty(serverType.name() + ".ssoCheck.url");
					String ssoCheckToken = connectionProp.getProperty(serverType.name() + ".ssoCheck.token");
					
					logger.info("SSO Check URL : " + ssoCheckURL);
					logger.debug("SSO Check Token : " + ssoCheckToken);
					
					URL url = new URL(ssoCheckURL);
					con = (HttpURLConnection) url.openConnection();
					con.setRequestMethod("POST");
					con.setRequestProperty("content-type", "application/json+sua");
					con.setRequestProperty("dwenc-token", ssoCheckToken);
					con.setDoOutput(true);
					Map<String, Object> value = new HashMap<>();
					value.put("value", token);
					
					Map<String, Object> postBody = new HashMap<>();
					postBody.put("_param", value);
					
					ObjectMapper mapper = new ObjectMapper();
					mapper.writeValue(con.getOutputStream(), postBody);
					
					int status = con.getResponseCode();

					String response = null;
					if ( status == HttpServletResponse.SC_OK )
					{
						response = IOUtils.toString( con.getInputStream() );
						logger.info("OK response : " + response);
						JSONObject jsonObject = new JSONObject( response );
						boolean success = (Boolean) jsonObject.get("success");
						
						if ( success )
						{
							resultMap.put("SSO Check", true);
						}
						else
						{
							resultMap.put("SSO Check", false);
							resultMap.put("message", (String) jsonObject.get("message"));
						}
						
					}
					else if ( con.getErrorStream() != null )
					{
						response = IOUtils.toString(con.getErrorStream());
						logger.info("Error response : " + response);
						JSONObject jsonObject = new JSONObject( response );
						
						resultMap.put("SSO Check", false);
						resultMap.put("message", (String) jsonObject.get("message"));
					}
				}
				else
				{
					// 개발 또는 로컬인 경우
					checkPlatformPassword = true;
				}
			}
			
			if ( checkPlatformPassword )
			{
				if ( "Qwer1234".equals(password) )
				{
					resultMap.put("SSO Check", true);
				}
				else
				{
					resultMap.put("SSO Check", false);
					resultMap.put("message", "Incorrect username or password.");
				}
			}
			
			return resultMap;

		} catch (IOException e) {
			System.out.println("url Exception");
			throw e;
		} catch (Exception e) {
			System.out.println("unpackArgs Exception");
			throw e;
		} finally{
			if(con != null) {
				con.disconnect();
			}
		}
	}
*/	
	public Map checkExclude(Context context, String[] args) throws Exception{
		try (SqlSession sqlSession = decSQLSessionFactory.getSession()){
			Map programMap = JPO.unpackArgs(args);
			String username = (String) programMap.get("username");
			
			String exists = MqlUtil.mqlCommand(context, "print bus $1 $2 $3 select $4 dump", DecConstants.TYPE_PERSON, username, DecConstants.SYMB_HYPHEN, DecConstants.SELECT_EXISTS);
			
			Map resultMap = new HashMap();
			
			if ( Boolean.valueOf(exists) )
			{
				// Get SSO Check URL
				String checkExclude = "false";
				Properties connectionProp = decPropertyUtil.getConnectionProperties();
				String convertPassword = connectionProp.getProperty("ssoPassword");
				convertPassword = new String(Base64.getEncoder().encode(convertPassword.getBytes()));
				
				List<Map> resultList = sqlSession.selectList("Project.selectSSOUser");
				for(Map mResult : resultList) {
					String sPName = (String)mResult.get("PERSON_NAME");
					if(DecStringUtil.equals(sPName, username)) {
						checkExclude = "true";
						break;
					}
				}
				
				resultMap.put("checkExclude", checkExclude);
				resultMap.put("convertPassword", convertPassword);
			}
			else
			{
				resultMap.put("message", "There is no user. Username : " + username);
			}
			
			return resultMap;
		}
	}
}
