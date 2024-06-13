package com.dec.webservice.rest.services;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.daewooenc.webservice.rest.util.decRestUtil;
import com.dassault_systemes.platform.restServices.RestService;

/**
 * Barocon 공사관리시스템과의 I/F 구현
 * URL 형식 : /if/project/공사 코드
 * URL 예제 : 
 * 	local - https://local.daewooenc.com/3dspace/resources/if/project/KNJA0
 * 	dev - https://epcplatformdev.daewooenc.com/internal/resources/if/project/KNJA0
 * 	prod - https://epcplatform.daewooenc.com/internal/resources/if/project/KNJA0
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Path("/if/project")
public class decIFProject extends RestService{
	
	decRestUtil _restUtil = new decRestUtil();

	@GET
	@Path("/{projectCode}")
	public Response doInterface(@Context HttpServletRequest request, @PathParam("projectCode") String projectCode) throws Exception{
		Map paramMap = new HashMap();
		paramMap.put("projectCode", projectCode);
		
		return _restUtil.doProcess(request, "emxProjectSpace", "doInterface", paramMap, HttpMethod.GET);
	}
}
