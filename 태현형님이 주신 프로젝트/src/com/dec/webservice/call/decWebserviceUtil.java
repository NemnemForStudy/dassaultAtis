package com.dec.webservice.call;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

//import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dec.util.DecMatrixUtil;
import com.dec.util.DecMatrixUtil.SERVER_TYPE;
import com.dec.util.decPropertyUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class decWebserviceUtil {

//	private static Logger logger = Logger.getLogger(decWebserviceUtil.class);
	private static Logger logger = LoggerFactory.getLogger(decWebserviceUtil.class);
	
	/**
	 * <pre>
	 * call api GET
	 * </pre>
	 * @param urlStr
	 */
	public static Boolean callUrlGet(String urlStr) {
		logger.debug("url : "+urlStr);

		Map<String, Object> resultMap = new HashMap<String, Object>();

		Boolean result = false;

		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(urlStr).openConnection();
			connection.setRequestMethod("GET");
			connection.setRequestProperty("content-Type", "application/json");

			BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			StringBuffer sb = new StringBuffer();

			String strData = "";
			while ((strData = br.readLine()) != null) {
				sb.append(strData);
			}
			
			String responeStr = sb.toString();
			
			if ( responeStr.contains("{") )
			{
				resultMap = new ObjectMapper().readValue(responeStr, new TypeReference<Map<String, Object>>(){});				
				logger.debug("resultMap : " + resultMap.toString());
				String r = resultMap.get("result").toString();
				if(r.equals("success")) result = true;
			}
			else if ( responeStr.contains("dummypage") )
			{
				result = true;
			}

		} catch (MalformedURLException e) {

			logger.error("error occured while doing something ... ", e);
		} catch (IOException e) {

			logger.error("error occured while doing something ... ", e);
		}

		return result;
	}
	
	/**
	 * <pre>
	 * call api POST
	 * </pre>
	 * @param urlStr
	 */
	public static List<Map<String, Object>> callUrlPost(String urlStr, List<Map<String, Object>> data) {

		JSONObject inJsonOb = new JSONObject();
		JSONArray jsonArr = new JSONArray();
		if(!data.isEmpty()) jsonArr = convertListToJson(data);
		inJsonOb.put("data", jsonArr);
		logger.debug("url : "+urlStr);

		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();

		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(urlStr).openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("content-Type", "application/json");
			connection.setDoOutput(true); //post방식으로 스트링을 통한 json 전송: true
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
			bw.write(inJsonOb.toString());
			bw.flush();
			bw.close();

			int responseCode = connection.getResponseCode();
			if(responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
				StringBuffer sb = new StringBuffer();

				String strData = "";
				while ((strData = br.readLine()) != null) {
					sb.append(strData);
				}
				resultList = new ObjectMapper().readValue(sb.toString(), new TypeReference<List<Map<String, Object>>>(){});
			}

		} catch (MalformedURLException e) {

			logger.error("error occured while doing something ... ", e);
		} catch (IOException e) {

			logger.error("error occured while doing something ... ", e);
		}
		return resultList;
	}
	
	/**
	 * <pre>
	 * map to json
	 * </pre>
	 * @param map
	 * @return JSONObject
	 */
	public static JSONObject convertMapToJson(Map<String, Object> map) {
		try {
			JSONObject jsonOb = new JSONObject();
			for(Entry<String, Object> entry : map.entrySet()) {
				String key = entry.getKey();
				Object val = entry.getValue();
				if ( val instanceof Map )
				{
					jsonOb.put(key, convertMapToJson((Map)val));
				}
				else
				{
					jsonOb.put(key, val == null? "null":val);
				}
				
			}
			return jsonOb;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * <pre>
	 * list of map to json
	 * </pre>
	 * @param list of map
	 * @return JSONArray
	 */
	public static JSONArray convertListToJson(List<Map<String, Object>> list) {
		try {
			JSONArray jsonArr = new JSONArray();
			for(Map<String, Object> map : list) {
				jsonArr.add(convertMapToJson(map));
			}
			return jsonArr;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public static String convertListToJsonString(List<Map<String, Object>> list) {
		return convertObjectToJsonString(list);
	}
	public static String convertMapToJsonString(Map<String, Object> map) {
		return convertObjectToJsonString(map);
	}
	private static String convertObjectToJsonString(Object object) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			
			String jsonStr = objectMapper.writeValueAsString(object);
			
			return jsonStr;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public static String getConnectionProperty(String propKey) throws Exception{
		DecMatrixUtil.SERVER_TYPE serverType = DecMatrixUtil.getServerType();
		
		Properties connectionProp = decPropertyUtil.getConnectionProperties();
		String propValue = connectionProp.getProperty(serverType.name() + "." + propKey);
		return propValue;
	}
	
	public static String generateServiceURL(SERVER_TYPE serverType, String serivcePropKey, String... paramStrArr) throws Exception{
		if ( serverType == null )
		{
			serverType = DecMatrixUtil.getServerType();
		}
		
		Properties connectionProp = decPropertyUtil.getConnectionProperties();
		String urlHeader = connectionProp.getProperty(serverType.name() + ".java_batch_service");
		String urlBody = connectionProp.getProperty(serivcePropKey);
		
		for (int k = 0; paramStrArr != null && k < paramStrArr.length; k++)
		{
			urlBody = urlBody.replace("$" + (k + 1) + "" , paramStrArr[k]);
		}
		
		String url = urlHeader.concat(urlBody);
		logger.debug("url : " + url);
		return url;
	}
}
