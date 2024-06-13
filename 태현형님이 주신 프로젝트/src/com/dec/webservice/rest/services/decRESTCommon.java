package com.dec.webservice.rest.services;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.daewooenc.webservice.rest.util.decRestUtil;
import com.dassault_systemes.platform.restServices.RestService;

/**
 * REST 서비스에서 공통적으로 사용할 수 있는 기능 구현
 * parameter로 JPO:method를 전달받아 실제 처리는 JPO에서 처리하도록 한다. 
 * URL 형식 : /JPO/jpo명/method명
 * URL 예제 : 
 * 	local - https://local.daewooenc.com/3dspace/resources/jpo/emxProjectSpace/getProjectSpaceUnitImage
 * 	dev - https://epcplatformdev.daewooenc.com/internal/resources/jpo/emxProjectSpace/getProjectSpaceUnitImage
 * 	prod - https://epcplatform.daewooenc.com/internal/resources/jpo/emxProjectSpace/getProjectSpaceUnitImage
 */
@Path("/JPO/{jpo}/{method}")
public class decRESTCommon extends RestService{
	
	decRestUtil _restUtil = new decRestUtil();
	
	/**
	 * GET 방식으로 요청 시 처리한다.
	 */
	@GET
	public Response doGet(@Context HttpServletRequest request, @PathParam("jpo") String jpo, @PathParam("method") String method) throws Exception{
		return _restUtil.doProcess(request, jpo, method, null, HttpMethod.GET);
	}
	
	/**
	 * POST 방식으로 요청 시 처리한다.
	 */
	@POST
	public Response doPost(@Context HttpServletRequest request, @PathParam("jpo") String jpo, @PathParam("method") String method) throws Exception{
		return _restUtil.doProcess(request, jpo, method, null, HttpMethod.POST);
	}
	
}
