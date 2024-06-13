package com.dec.webservice.rest.services;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

import com.daewooenc.webservice.rest.util.decRestUtil;

@Path("/helloworld")
public class decHelloWorld {

	/**
	 * GET 방식으로 요청 시 처리한다.
	 */
	@GET
	public Response doGet(@Context HttpServletRequest request) throws Exception{
		return doProcess(request);
	}
	
	/**
	 * POST 방식으로 요청 시 처리한다.
	 */
	@POST
	public Response doPost(@Context HttpServletRequest request) throws Exception{
		return doProcess(request);
	}
	
	/**
	 * REST 요청을 JPO로 전달하고 그 처리 결과를 REST 형식에 맞게 회신한다.
	 */
	private Response doProcess(HttpServletRequest request) throws Exception{
		int respCode = HttpServletResponse.SC_OK;
		
		JSONObject output = new JSONObject();
		try {
			
			Map<String,String> paramMap = decRestUtil.extractParameterMap(request);
			
			output.put("msg", "Hello World");
			output.put("parameter", paramMap);
			
		} catch (Exception e) {
			e.printStackTrace();
			respCode = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
			output.put("msg", e.getMessage());
		}
		String outputStr = output.toString();
		return Response.status(respCode).entity(outputStr).build();
	}
	
}
