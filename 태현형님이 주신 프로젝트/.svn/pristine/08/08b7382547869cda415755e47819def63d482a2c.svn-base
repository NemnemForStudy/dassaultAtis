
<%@ page import="com.matrixone.apps.domain.util.*" %>
<%@ page import="com.matrixone.servlet.Framework" %>
<%@ include file ="MCADTopInclude.inc" %>



<%@ page import="com.matrixone.MCADIntegration.server.*" %>
<%@ page import="com.matrixone.MCADIntegration.server.beans.*" %>
<%@ page import="com.matrixone.MCADIntegration.server.*" %>
<%@ page import="com.matrixone.MCADIntegration.ui.*" %>
<%@ page import="java.lang.reflect.*" %>
<%@ page import="java.util.List" %>

<%

	String jsMethodName	=Request.getParameter(request,"jsMethodName");
	Context context = Framework.getFrameContext(session);
	//ENOCsrfGuard.validateRequest(context, session, request, response);	

	MCADIntegrationSessionData integSessionData = (MCADIntegrationSessionData)session.getAttribute(MCADServerSettings.MCAD_INTEGRATION_SESSION_DATA_OBJECT);
	
//QTP	//////////////////////////////////
	String sProtocol, sPort, sHost, refServer;

	//check for forwarded first
	sProtocol = request.getHeader("X-Forwarded-Proto");
	sPort     = request.getHeader("X-Forwarded-Port");
	sHost     = request.getHeader("X-Forwarded-Host");
	
	//if not forwarded use regular
	if (sProtocol == null) {
		sProtocol = request.getScheme();
	}
	if (sPort == null) {
		sPort = "" + request.getLocalPort();
	}
	if (sHost == null) {
		sHost = request.getServerName();
	} else { //port sometimes comes thru in the X-Forwarded-Host, so clean up
		int portIndex = sHost.indexOf(':');
		if (portIndex != -1) {
			 sPort = sHost.substring(portIndex + 1);
			 sHost = sHost.substring(0, portIndex);
		}
	}
	
	refServer = sProtocol + "://" + sHost;
	if (sPort.length() > 0) {
		refServer += ":"+ sPort;
	}
		
	String requestURI   = request.getRequestURI();

    String pathWithIntegrationsDir	= requestURI.substring(0, requestURI.lastIndexOf('/'));
    String pathWithAppName			= pathWithIntegrationsDir.substring(0, pathWithIntegrationsDir.lastIndexOf('/'));

    String appName = application.getInitParameter("ematrix.page.path");
    if(appName == null)
		appName = "";

    String virtualPath								= refServer + appName;

    java.util.ResourceBundle  mcadIntegrationBundle			= java.util.ResourceBundle.getBundle("ief");
    String acceptLanguage							= request.getHeader("Accept-Language");
	String sessionid 								= "JSESSIONID=" + session.getId();
	
	/*IR-907816* getting cookies from the store*/
	System.out.println("Getting cookies in jsp ===== "+request.getCookies());
    Cookie[] cookies = request.getCookies();
   
	List keyValuePairList = new ArrayList();
	
					
	if(cookies !=null) {
		for(int j=0; j < cookies.length; j++) {
			Cookie cookie=cookies[j];
								
		    String cookieName =cookie.getName();
			String cookieValue = cookie.getValue();
			keyValuePairList.add(cookieName+"="+cookieValue);
		    System.out.println("Getting cookies in jsp cookieName ====== "+cookieName);
			System.out.println("Getting cookies in jsp cookieValue ===== "+cookieValue);
			}
		}

//QTP	//////////////////////////////////	
	
	DSCAppletFreeCmdHandler preferencePageHelper = (DSCAppletFreeCmdHandler)session.getAttribute("preferencehandler");
	if(preferencePageHelper == null){
		/*IR-907816* passing cookies to the appletFreeCmdHandler*/
		preferencePageHelper = new DSCAppletFreeCmdHandler(integSessionData, sProtocol, sPort, sHost, refServer, requestURI, pathWithIntegrationsDir, pathWithAppName, appName, virtualPath, acceptLanguage,sessionid,  mcadIntegrationBundle,keyValuePairList);				
		session.setAttribute("preferencehandler", preferencePageHelper );		    
	}
	IEFPreferencesPage preferencesPageObject = preferencePageHelper.createPreferencesPage("", "", "");
%>

<script language="JavaScript" src="scripts/IEFUIConstants.js" type="text/javascript"></script>
<script language="JavaScript" src="scripts/IEFUIModal.js" type="text/javascript"></script>
<script language="JavaScript" src="scripts/MCADUtilMethods.js" type="text/javascript"></script>
<script language="JavaScript" src="../common/scripts/emxUICore.js" type="text/javascript"></script>
<SCRIPT LANGUAGE="JavaScript">
function isFunction(object) {
	   return !!(object && object.constructor && object.call && object.apply);
	  }

	function ifFnExistsInvokeIt(refFrame, fnName)
	{
	   var fn = refFrame[fnName];
	   	var fnExists = isFunction(fn);
	   if(fnExists)
	      fn();
	}

	showIEFModalDialog("<%=pathWithIntegrationsDir%>/IEFPreferencesFS.jsp?" + "integrationName=Global", 850, 650);	
</SCRIPT>

