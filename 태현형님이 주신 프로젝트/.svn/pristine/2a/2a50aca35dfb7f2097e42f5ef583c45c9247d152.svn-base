package com.dec.webservice.rest.main;

import javax.ws.rs.ApplicationPath;

import com.dassault_systemes.platform.restServices.ModelerBase;

/**
 * REST 서비스를 위한 메인 클래스.
 * REST 구현 서비스를 getServices()에 설정한다.
 * @author "hslee"
 *
 */
@ApplicationPath(ModelerBase.REST_BASE_PATH)
public class decRESTMain extends ModelerBase{

	/**
	 * REST 구현 서비스를 설정한다.
	 */
	@Override
	public Class<?>[] getServices() {
		return (new Class<?>[] {
			com.dec.webservice.rest.services.decRESTCommon.class,
			com.dec.webservice.rest.services.decRESTAdmin.class,
			com.dec.webservice.rest.services.decHelloWorld.class,
			com.dec.webservice.rest.services.decIFProject.class
		});
	}

}
