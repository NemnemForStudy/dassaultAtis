package com.daewooenc.webservice.rest.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

import com.dassault_systemes.platform.restServices.RestService;
import com.dassault_systemes.platform.ven.jackson.core.type.TypeReference;
import com.dassault_systemes.platform.ven.jackson.databind.ObjectMapper;
import com.dec.util.DecLoggerUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.vplm.posmodel.VPLMSecurityContext;

import matrix.db.JPO;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class decRestUtil extends RestService{
	
	private matrix.db.Context getLoginContext(HttpServletRequest request) throws Exception
    {
		matrix.db.Context context = getAuthenticatedContext(request, false);
        String sRole = context.getRole();
        if(sRole == null || sRole.isEmpty())
        {
            String sPreferredCtx = VPLMSecurityContext.getPreferredSecurityContext(context, context.getUser());
            if(sPreferredCtx != null && !sPreferredCtx.isEmpty())
            {
                sPreferredCtx = (new StringBuilder("ctx::")).append(sPreferredCtx).toString();
                context.resetRole(sPreferredCtx);
            } else
            {
                System.out.println((new StringBuilder("No preferred security context defined for person ")).append(context.getUser()).toString());
            }
        }
        return context;
    }
	
	/**
	 * REST 요청을 JPO로 전달하고 그 처리 결과를 REST 형식에 맞게 회신한다.
	 */
	public Response doProcess(HttpServletRequest request, String jpo, String method, Map paramMap, String httpMethod) throws Exception{
		int respCode = HttpServletResponse.SC_OK;
		
		JSONObject output = new JSONObject();
		try {
			Map<String,String> extractedParamMap = extractParameterMap(request);
			if ( paramMap != null )
			{
				extractedParamMap.putAll(paramMap);
			}
			
			String pushContext = (String) extractedParamMap.get("pushContext");
			
			matrix.db.Context context = null;
			if ( Boolean.valueOf(pushContext) )
			{
				context = new matrix.db.Context("localhost");
				context.setUser("admin_platform");
				context.setPassword("Qwer1234");
				context.connect();
			}
			else
			{
				context = getLoginContext(request);
			}
			
//			matrix.db.Context context = new matrix.db.Context("localhost");
//			context.setUser("admin_platform");
//			context.setPassword("Qwer1234");
//			context.connect();
			
			Object result = null;
			boolean startTrans = false;
			try {
				if ( HttpMethod.POST.equals(httpMethod) )
				{
					ContextUtil.startTransaction(context, true);
					startTrans = true;
				}
				result = JPO.invoke(context, jpo, null, method, JPO.packArgs(extractedParamMap), Object.class);
				if ( startTrans )
				{
					ContextUtil.commitTransaction(context);
				}
			} catch (Exception e) {
				if ( startTrans )
				{
					ContextUtil.abortTransaction(context);
				}
				e.printStackTrace();
			}
			
			if ( result instanceof Map )
			{
				DecLoggerUtil.info(((Map) result).toString());
				output.put("data", (Map) result);
			}
			else
			{
				DecLoggerUtil.info(((MapList) result).toString());
				output.put("data", (MapList) result);
			}
			
			output.put("result", "SUCCESS");
			
		} catch (Exception e) {
			e.printStackTrace();
			respCode = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
			output.put("result", e.getMessage());
		}
		String outputStr = output.toString();
		return Response.status(respCode).entity(outputStr).build();
	}
	
	/**
	 * REST 요청 시 전달된 Parameter를 정리하여 Map 형태로 리턴한다.
	 */
	public static Map<String,String> extractParameterMap(HttpServletRequest request) throws Exception{
		StringBuffer sb = new StringBuffer();
		Map<String,String> paramMap = new HashMap<String,String>();
		
		if ( MediaType.APPLICATION_JSON.equals( request.getContentType() ) )  
		{
			try ( 
				BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
			)
			{
				char[] buffer = new char[128];
				int bytesRead = -1;
				while ( (bytesRead = br.read(buffer)) > 0 )
				{
					sb.append(buffer, 0, bytesRead);
				}
				
				if ( sb.length() > 0 )
				{
					ObjectMapper mapper = new ObjectMapper();
					TypeReference<Map<String,String>> typeReference = new TypeReference<Map<String,String>>() {};
					paramMap = mapper.readValue(sb.toString(), typeReference);
				}
				
			}
		}
		
		Enumeration<String> en = request.getParameterNames();
		
		String key = null;
		while ( en.hasMoreElements() )
		{
			key = en.nextElement();
			paramMap.put(key, request.getParameter(key));
		}
		
		return paramMap;
	}
}
