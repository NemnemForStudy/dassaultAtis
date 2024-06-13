<%--  emxSecurityContextSelection.jsp   - security context selection page for MatrixOne applications

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This programs contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

      static const char RCSID[] = $Id: emxSecurityContextSelection.jsp $
--%>
<!DOCTYPE html>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<%@include file = "../emxTagLibInclude.inc"%>
<%@include file = "../emxContentTypeInclude.inc"%>
<%@include file = "../emxRequestWrapperMethods.inc"%>
<%@ page import="matrix.db.*, matrix.util.*, com.matrixone.servlet.*, java.text.* ,java.util.* , com.matrixone.apps.domain.*, com.matrixone.apps.domain.util.*, com.matrixone.apps.framework.taglib.*, com.matrixone.apps.framework.ui.*"  %>
<% 
    String languageStr = request.getLocale().getLanguage();
    if (languageStr == null || languageStr == "") languageStr = "en";
%>
<emxUtil:localize id="i18nId" bundle="emxFrameworkStringResource" locale='<%=languageStr%>' />


<%@ page import="com.matrixone.apps.domain.util.PersonUtil" %>
<%@ page import="com.matrixone.apps.domain.util.PropertyUtil" %>
<%@ page import="com.matrixone.apps.framework.ui.UIUtil" %>
<%
//System.out.println("####################################  EMXSECURITYCONTEXTSELECTION.jsp ####################################");
boolean contextAlreadySelected = true;
if (session.getAttribute("switchContext") == null) {
    contextAlreadySelected = false;
}
String sRoleToDisplay = "true";
String disableAutoLogin = "false";
String displaySingleValue = "true";
String loginPage =  Framework.getPropertyValue("ematrix.login.page");
matrix.db.Context context = Framework.getFrameContext(session);
String counrtyError = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.SecurityContextSelection.Error.SelectCountry", languageStr);
boolean isExportControl = UINavigatorUtil.showLocation(context);

String widgetId = emxGetParameter(request, "widgetId");
String stremxNavigatorData = "emxNavigatorData";
if(widgetId != null){
	stremxNavigatorData = widgetId + "emxNavigatorData";
}

Map emxNavigatorData = (Map)session.getAttribute(stremxNavigatorData);
String paramNameValues = "";
if( emxNavigatorData == null )
{
    emxNavigatorData = new HashMap();
}
Enumeration enumParam = request.getParameterNames();
// Loop through the request elements and
boolean isFirstParam = true;
while (enumParam.hasMoreElements())
{
    String paramName  = (String) enumParam.nextElement();
    String paramValue = emxGetParameter(request, paramName);
    if( !paramName.equals(LoginServlet.FORM_LOGIN_NAME) && !paramName.equals(LoginServlet.FORM_LOGIN_PASSWORD) && !paramName.toLowerCase().contains("username") && !paramName.toLowerCase().contains("password") )
    {
        if( isFirstParam )
        {
            paramNameValues = XSSUtil.encodeForURL(context, paramName) + "=" + XSSUtil.encodeForURL(context, paramValue);
            isFirstParam = false;
        } else {
            paramNameValues += "&" +XSSUtil.encodeForURL(context, paramName) + "=" + XSSUtil.encodeForURL(context, paramValue);
        }
        emxNavigatorData.put(paramName, paramValue);
    }
}
session.setAttribute(stremxNavigatorData, emxNavigatorData);

String switchContext = emxGetParameter(request,"switchContext");
String collabSpace = emxGetParameter(request,"collabSpace");
MatrixServletException servletException = Framework.getError(request);
if (switchContext != null)
{
     session.setAttribute("switchContext", switchContext);
} else {
	switchContext = "false";
     session.setAttribute("switchContext", switchContext);
}
if (servletException != null)
{
     session.setAttribute("error.message", servletException.getMessage());
}
if( context != null )
{
    boolean passwordExpired = false;
    if ( context.getPasswordStatus() != 0)
    {
        passwordExpired = true;
        String requestURI = request.getRequestURI();
        String dispatcherURL = "../common/emxChangeExpiredPassword.jsp";
        if (requestURI != null && (requestURI.indexOf("emxNavigator.jsp") > 0 || requestURI.indexOf("emxSecurityContextSelection.jsp") > 0))
        {
            dispatcherURL = "emxChangeExpiredPassword.jsp";
        } else {
            dispatcherURL = "common/emxChangeExpiredPassword.jsp";
        }
        request.getRequestDispatcher(dispatcherURL).forward(request, response);
    }
    if( !passwordExpired )
    {
        disableAutoLogin = emxGetParameter(request,"disableAutoLogin");
        if( disableAutoLogin == null || "".equals(disableAutoLogin))
        {
            if (isExportControl && !contextAlreadySelected) {
                disableAutoLogin = "true";
            } else {
            disableAutoLogin = "false";
        }
        }
        String securityContext = emxGetParameter(request,"SecurityContext");;
        String forwardURL = (String)session.getAttribute("ForwardURL");
        String appName = (String) emxNavigatorData.get("appName");
        if (forwardURL != null && forwardURL.length() > 0 ){
            if(forwardURL.indexOf("//") == 0){
                forwardURL = forwardURL.substring(1,forwardURL.length());
            }
        } else {
            forwardURL = "/common/emxNavigator.jsp?appName="+ appName;
        }
        if(Framework.isLoggedIn(request)&& forwardURL.contains("emxNavigatorDialog.jsp")  ){
           forwardURL = "/common/emxNavigator.jsp?appName="+ appName;
           session.setAttribute("ForwardURL", forwardURL);
        }
        forwardURL = Framework.getClientSideURL(response, forwardURL);
        if ("true".equalsIgnoreCase(switchContext))
        {
            out.clear();
        } else {
            try
            {
              PersonUtil.refreshUserAssignments(context);
            } catch(Exception ex)
            {
              // Do Nothing
            }

        }
        if (!"true".equalsIgnoreCase(switchContext))
        {
%>

          <html>
          <head>
          <meta HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE"/>
          <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
          <title><emxUtil:i18n localize="i18nId">emxFramework.Login.Title</emxUtil:i18n></title>
          <script>var topMostEnoviaWindow=true;</script>
          <!-- //XSSOK -->
          <script language="javascript" src="<%=Framework.getClientSideURL(response, "common/scripts/emxUIConstants.js")%>"></script>
          <!-- //XSSOK -->
          <script language="javascript" src="<%=Framework.getClientSideURL(response, "common/scripts/emxUICore.js")%>"></script>
          <script language="javascript" src="scripts/jquery-latest.js"></script>
          <script language="javascript" src="../webapps/AmdLoader/AmdLoader.js"></script>
          
          <link rel="stylesheet" type="text/css" href="<%=Framework.getClientSideURL(response, "common/styles/emxUIDefault.css")%>"/>

<%
        }
%>
        <script language="javascript">
        function onOrganizationChange(){
        	  var sData = 'scParamType=Company&scParamValue='+encodeURIComponent($('#Organization').val());
        		  sData+="&project="+encodeURIComponent($('#Project').val());   	  
              $.ajax({
                  url: 'emxSecurityContextComponents.jsp',
                  dataType: 'json',
                data: sData,
                  success: function(data)
                  {
                    $('#Role').empty();
                    $.each(data, function(i, val1){
                        if(val1.indexOf("role_") >= 0){
                        	val1 = val1.replace("role_", "");
                        	var arryRoles = val1.split("|");                        	
                            $('#Role').append($('<option></option>').val(arryRoles[0]).html(arryRoles[1]));
                        }
                    });
                  }
              });
          }

        function onProjectChange(){
        	 var sData = 'scParamType=Project&scParamValue='+encodeURIComponent($('#Project').val());
        	 var orgDisabled = $('#Organization')[0].disabled;
        	 if(orgDisabled){
        		 sData+="&organization="+encodeURIComponent($('#Organization').val());
        	 }
                        $.ajax({
                              url: 'emxSecurityContextComponents.jsp',
                              dataType: 'json',
                  data: sData,
                              success: function(data)
                                        {
                                          $('#Role').empty();
                                          $('#Organization').empty();
                                              $.each(data, function(i, val1){
                                           		if(val1.indexOf("role_") >= 0){
                                           			val1 = val1.replace("role_", "");
                                            	  var arrRoles = val1.split("|"); 
                                                  $('#Role').append($('<option></option>').val(arrRoles[0]).html(arrRoles[1]));
                                           		} else {
                        							var orgName = val1; 
                        							if(orgName.indexOf(",") >=0) {
                        								var arrOrg = val1.split(",");
                        							}
                                                    $('#Organization').append($('<option></option>').val(arrOrg[0]).html(arrOrg[1]));
                                                }
                                              });
                        }
                });
        }

        </script>
        <script language=Javascript>
        function adjustLoginPanel(){
            var pnlouter = document.getElementById('panelouter');

            var hlfht = pnlouter.offsetHeight;
            hlfht = hlfht/2;
            var tp = '-' + hlfht + 'px';
            pnlouter.style.marginTop = tp;

            var hlflft = pnlouter.offsetWidth;
            hlflft = hlflft/2;
            var lft = '-' + hlflft + 'px';
            pnlouter.style.marginLeft = lft;
         }

         function mxSubmitSwitchContext()
         {
            var frameContent = findFrame(getTopWindow(),"content");
            var objForm = document.loginForm;
            if(frameContent.cntFrameURL != null && typeof frameContent.cntFrameURL != "undefined"){
            	objForm.ContentURL.value = frameContent.cntFrameURL;
            }else{
				objForm.ContentURL.value = frameContent.document.location.href;
            }
            objForm.currentApp.value = getTopWindow().currentApp;
            
            objForm.switchContext.value = "true";
			if(getTopWindow().bclist){
	            var currBC=getTopWindow().bclist.getCurrentBC();
				if(currBC.fancyTreeData){
	            	localStorage.setItem('SC~'+currBC.id,JSON.stringify(currBC.fancyTreeData));
				}
	         }
            //addSecureToken(objForm);
            objForm.submit();
            //removeSecureToken(objForm);
         }
        function mxSubmit ()
        {
          var objForm = document.loginForm;
          //addSecureToken(objForm);
          objForm.submit();
          //removeSecureToken(objForm);

        }
        function mxCancel ()
        {
          closeSecurityContextDialog();
        }
		function getContenFrameURL(){
			// function to get the content frame URL
			var contentFrameURL = "";
			var frameContent = findFrame(getTopWindow(),"content");
			if(frameContent == null || frameContent == "undefined" || frameContent == "null" || frameContent == "" || typeof frameContent == "undefined" ){
				contentFrameURL = "";
			}else{
				if(frameContent.cntFrameURL != null && typeof frameContent.cntFrameURL != "undefined"){
					contentFrameURL = frameContent.cntFrameURL;
				}else{
					contentFrameURL = frameContent.document.location.href;
				}
			}
			return contentFrameURL;
		}
        function checkIfCountrySelected(checkbox) {
            if (checkbox.checked && document.getElementById("country").value == "NO_LOCATION_DEFINED") {
                alert("<%=counrtyError%>");
                checkbox.checked = false;
            }
        }
        </script>

<%
        if (!"true".equalsIgnoreCase(switchContext))
        {
%>
            </head>
            <body class="sign-in security-context" onload="$('#submitButton').focus();">
            <div id="panelouter" class="wrap-outer">
<%
        } else {
%>
            <div id="panelouter" class="wrap-outer popup-dialog  sign-in security-context">
<%
        }
%>
        <div class="wrap-inner">
        <div class="panel">
<%
        String strdefOrg = "";
        String strdefPrj = "";
        String strdefRole = "";
        StringList organizations = new StringList();
        StringList projects = new StringList();
        StringList roles = new StringList();
		Map projNameToDisplayName = new HashMap();
		Map orgNameToDisplayName = new HashMap();
		Map roleNameToDisplayName = new HashMap();
		if( collabSpace != null && !"".equals(collabSpace))
        {
            securityContext = PersonUtil.getSecurityContext(context, collabSpace);
            if( securityContext.indexOf("|") > 0)
            {
                securityContext = "";
            }
        }

        if( securityContext!= null && PersonUtil.isValidSecurityContext(context, securityContext) ) {
            //System.out.println("COLLAB SPACE IS PROVIDED AND FOUND UNIQUE SECURITY CONTEXT");
            //System.out.println("OR SECURITY CONTEXT IS BEEN PROVIDED AND VALID");
%>
            <script> submitWithCSRF("emxSecurityContextSelectionProcess.jsp?widgetId=<%=XSSUtil.encodeForJavaScript(context, emxGetParameter(request, "widgetId"))%>&SecurityContext=<%=XSSUtil.encodeForURL(context, securityContext)%>&ContentURL="+encodeURIComponent(getContenFrameURL()), window);</script>
<%
			return;
        } else if( !PersonUtil.hasSecurityContext(context, context.getUser()) ) {
            //System.out.println("CONTEXT PERSON "+ context.getUser() +" DOESN'T HAVE ANY SECURITY CONTEXT AVIALABLE");
			session.removeAttribute("ForwardURL");
%>
            <!-- //XSSOK -->
            <script> document.location.href="<%=forwardURL%>"; </script>
<%
        } else {
        	String relSecurityContextProject= PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_SecurityContextProject);
            String relSecurityContextOrganization = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_SecurityContextOrganization);
            String relSecurityContextRole = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_SecurityContextRole);

            //System.out.println("DISABLE AUTOLOGIN PARAMETER IS SET AS " + disableAutoLogin);
            if( "false".equals(disableAutoLogin))
            {
                //System.out.println("DISABLE AUTOLOGIN PARAMETER IS NOT PROVIDED");
               	securityContext = PersonUtil.getActiveSecurityContext(context);
               	if(UIUtil.isNullOrEmpty(securityContext)) {
					securityContext = PersonUtil.getDefaultSecurityContext(context);
				}
                //System.out.println("CONTEXT PERSON "+ context.getUser() +" HAVE DEFAULT SECURITY CONTEXT SET AS == " + securityContext);
            }
            if(PersonUtil.isValidSecurityContext(context, securityContext) && !"true".equalsIgnoreCase(switchContext) )
            {
                //System.out.println("CONTEXT PERSON "+ context.getUser() +" HAVE DEFAULT SECURITY CONTEXT SET AS == " + securityContext);
                //System.out.println("AND IT IS VALID and SWITCHCONTEXT PARAMETER IS FALSE");
    %>
                <script> submitWithCSRF("emxSecurityContextSelectionProcess.jsp?widgetId=<%=XSSUtil.encodeForJavaScript(context, emxGetParameter(request, "widgetId"))%>&SecurityContext=<%=XSSUtil.encodeForURL(context, securityContext)%>",window); </script>
                </body>
    </html>
    <%
    			return;
   		        } else {
                StringList selects = new StringList();
                selects.addElement(DomainObject.SELECT_NAME);
                MapList securityContextDetails = PersonUtil.getSecurityContexts(context, context.getUser(), selects);
                if( (securityContextDetails != null && securityContextDetails.size() == 1) && ("false".equals(switchContext) || ("true".equalsIgnoreCase(switchContext) && (collabSpace != null))) && !isExportControl)
                {
                    Map scMap = (Map)securityContextDetails.get(0);
                    securityContext = (String)scMap.get(DomainObject.SELECT_NAME);
                    //System.out.println("CONTEXT PERSON "+ context.getUser() +" HAVE ONLY ONE SECURITY CONTEXT AS == " + securityContext);
    %>
                    <script> submitWithCSRF("emxSecurityContextSelectionProcess.jsp?widgetId=<%=XSSUtil.encodeForJavaScript(context, emxGetParameter(request, "widgetId"))%>&SecurityContext=<%=XSSUtil.encodeForURL(context, securityContext)%>",window); </script>
                    </body>
    </html>
    <%
    			return;
                } else if(UIUtil.isNotNullAndNotEmpty(collabSpace)){
	            	String projSelect = "from[" + relSecurityContextProject + "].to.name";
					String projSelectDisplay = "from[" + relSecurityContextProject + "].to.attribute[Title]";
	                String orgSelect = "from[" + relSecurityContextOrganization + "].to.name";
	                String orgSelectDisplay = "from[" + relSecurityContextOrganization + "].to.attribute[Title]";
	                String roleSelect = "from[" + relSecurityContextRole + "].to.name";
	                HashSet<String> orgSet = new HashSet<String>();
	                for(Object scObj : securityContextDetails) {
	        			Map scMap = (Map) scObj;
	        			if(collabSpace.equals((String)scMap.get(projSelect))){
							
								String projDisplayName = (String)scMap.get(projSelectDisplay);
								if(UIUtil.isNotNullAndNotEmpty(projDisplayName) && !projNameToDisplayName.containsKey((String)scMap.get(projSelect))) {
									
									projNameToDisplayName.put((String)scMap.get(projSelect),projDisplayName);
								} else if(!projNameToDisplayName.containsKey((String)scMap.get(projSelect))){
									
									projNameToDisplayName.put((String)scMap.get(projSelect),(String)scMap.get(projSelect));
								}
							
								String orgDisplayName = (String)scMap.get(orgSelectDisplay);
								if(UIUtil.isNotNullAndNotEmpty(orgDisplayName) && !orgNameToDisplayName.containsKey((String)scMap.get(orgSelectDisplay))) {
									
									orgNameToDisplayName.put((String)scMap.get(orgSelect),orgDisplayName);
								} else if(!orgNameToDisplayName.containsKey((String)scMap.get(orgSelect))){
									
									orgNameToDisplayName.put((String)scMap.get(orgSelect),(String)scMap.get(orgSelect));
								}
										
	        				orgSet.add((String)scMap.get(orgSelect));
	        			}
	        		}
	                
	        		organizations = new StringList(new ArrayList<String>(orgSet));
	            	strdefOrg = PersonUtil.getDefaultOrganization(context, context.getUser());
	                projects = new StringList(collabSpace);
	                
	                HashSet<String> roleSet = new HashSet<String>();
	                for(Object scObj : securityContextDetails) {
	        			Map scMap = (Map) scObj;
	        			if(collabSpace.equals((String)scMap.get(projSelect))
        						&& ((organizations.contains(strdefOrg) && ((String)scMap.get(orgSelect)).equals(strdefOrg))
        								|| (!organizations.contains(strdefOrg)
        										&& ((String)scMap.get(orgSelect)).equals(organizations.get(0))))){
	        				roleSet.add((String)scMap.get(roleSelect));
	        				roleNameToDisplayName.put((String)scMap.get(roleSelect), EnoviaResourceBundle.getRoleI18NString(context,(String)scMap.get(roleSelect), languageStr));
	        			}
	        		}
	                roles = new StringList(new ArrayList<String>(roleSet));
                } else {

                    Iterator itr = securityContextDetails.iterator();
                    strdefOrg = PersonUtil.getDefaultOrganization(context, context.getUser());
                    strdefPrj = PersonUtil.getDefaultProject(context, context.getUser());
                    strdefRole = PersonUtil.getDefaultSCRole(context, context.getUser());
                    while(itr.hasNext())
                    {
                        Map scMap = (Map)itr.next();
                        String strOrg = (String)scMap.get("from[" + relSecurityContextOrganization + "].to.name");
                        String orgSelectDisplay =  (String)scMap.get("from[" + relSecurityContextOrganization + "].to.attribute[Title]");
                        String strPrj = (String)scMap.get("from[" + relSecurityContextProject + "].to.name");
						String strProjSelectDisplay = (String)scMap.get("from[" + relSecurityContextProject + "].to.attribute[Title]");
                        String strRole = (String)scMap.get("from[" + relSecurityContextRole + "].to.name");
                        if( "".equals(strdefOrg) )
                        {
                            strdefOrg = (String)scMap.get("from[" + relSecurityContextOrganization + "].to.name");
                            strdefPrj = (String)scMap.get("from[" + relSecurityContextProject + "].to.name");
                            strdefRole = (String)scMap.get("from[" + relSecurityContextRole + "].to.name");
                        }
                        
                        if( !projects.contains(strPrj))
                        {
                            projects.addElement(strPrj);
							if(UIUtil.isNotNullAndNotEmpty(strProjSelectDisplay) && !projNameToDisplayName.containsKey(strPrj)) {
								projNameToDisplayName.put(strPrj,strProjSelectDisplay);
							} else if(!projNameToDisplayName.containsKey(strPrj)){
								projNameToDisplayName.put(strPrj,strPrj);
							}	
                        }
                        
                        if( !organizations.contains(strOrg) && strdefPrj.equals(strPrj) )
                        {
                            organizations.addElement(strOrg);
                            if(UIUtil.isNotNullAndNotEmpty(orgSelectDisplay) && !orgNameToDisplayName.containsKey(strOrg)) {
                            	orgNameToDisplayName.put(strOrg,orgSelectDisplay);
							} else if(!orgNameToDisplayName.containsKey(strOrg)){
								orgNameToDisplayName.put(strOrg,strOrg);
							}	
                            
                        }
                        if( !roles.contains(strRole) && strdefPrj.equals(strPrj) && strdefOrg.equals(strOrg))
                        {
                            roles.addElement(strRole);
                            roleNameToDisplayName.put(strRole,EnoviaResourceBundle.getRoleI18NString(context,strRole, languageStr));
                        }
                    }
                }
            }
        }
		projects.sort();
		organizations.sort();
		roles.sort();
	 
		java.util.List<String> projKeys = UIUtil.getSortedListFromMap(projNameToDisplayName);//new ArrayList<>(temp.keySet());
		//projectsDisplayList.sort();
		java.util.List<String> roleKeys= UIUtil.getSortedListFromMap(roleNameToDisplayName);	

        String strOrganization = "";
        if(UIUtil.isNotNullAndNotEmpty(collabSpace) && organizations.contains(strdefOrg)){
        	strOrganization = strdefOrg;
        } else if (organizations != null && organizations.size() >0 )
        {
            strOrganization = (String)organizations.get(0);
        }
        String strProject = "";
        if (projKeys != null && projKeys.size() >0 )
        {
            strProject = (String)projKeys.get(0);
        }
        String strRole = "";
        if (roleKeys != null && roleKeys.size() >0 )
        {
            strRole = (String)roleKeys.get(0);
        }

        if( FrameworkUtil.isOnPremise(context) && organizations.size() == 1 && projects.size() == 1)
        {
            sRoleToDisplay = "false";
        }
//Org

		java.util.List<String> orgKeys = UIUtil.getSortedListFromMap(orgNameToDisplayName);	//new ArrayList<>(orgTemp.keySet());
		
       
       
//Org ends
        try
        {
        	  sRoleToDisplay = EnoviaResourceBundle.getProperty(context,"emxComponents.NewSecurityModel.RoleDefaultSelectionForContextSelection");        	  
        	  displaySingleValue = EnoviaResourceBundle.getProperty(context,"emxComponents.NewSecurityModel.DisplaySingleValueInContextSelection");            
        } catch(Exception ex )
        {
          // Do nothing
        }
        if( "false".equals(sRoleToDisplay) && organizations.size() == 1 && projects.size() == 1 && !isExportControl)
        {
            //System.out.println("DISPLAY ROLE IS SET TO FALSE AND THE CONTEXT PERSON "+ context.getUser() +" HAVE ONLY ONE ORG and ONE PROJECT AS == " + organizations.get(0) + " && " + projects.get(0));
            if( "false".equalsIgnoreCase(switchContext) || ("true".equalsIgnoreCase(switchContext) && (collabSpace != null)))
            {
%>
                <script> submitWithCSRF("emxSecurityContextSelectionProcess.jsp?widgetId=<%=XSSUtil.encodeForJavaScript(context, emxGetParameter(request, "widgetId"))%>&Organization=<%=XSSUtil.encodeForURL(context, (String)organizations.get(0))%>&Project=<%=XSSUtil.encodeForURL(context, (String)projects.get(0))%>",window); </script>
<%
            }
        }
%>
            <h1><emxUtil:i18n localize="i18nId">emxFramework.ChooseSecurityContext</emxUtil:i18n></h1>
            <div id="panelcnt" class="panel-content">
            <form id="loginForm" name="loginForm" method="post" action="emxSecurityContextSelectionProcess.jsp">
                <input type="hidden" name="widgetId" id="widgetId" value="<xss:encodeForHTMLAttribute><%=widgetId%></xss:encodeForHTMLAttribute>" />
                <div class="panel-mask"></div>
                <div class="panel-head"><emxUtil:i18n localize="i18nId">emxFramework.Login.Head</emxUtil:i18n></div>
                <div class="panel-body">
                <ul>
                   <li class="select-box">
<%
        if( "true".equals(displaySingleValue) || (projects != null && projects.size() > 1))
        {
%>
            <label><emxUtil:i18n localize="i18nId">emxFramework.SecurityContextSelection.Project</emxUtil:i18n></label>
<%
        }
        if(projects != null && projects.size() > 1)
        {
        	String projectValueInHidden;
        	if(collabSpace!=null && organizations.size() < 1 ){
        		projectValueInHidden = strProject;
%>
	    	    <span><select disabled="disabled" name="Project" id="Project" onchange="onProjectChange()">
<%
        	}else{
        		projectValueInHidden = strdefPrj;
%>
            <span><select name="Project" id="Project" onchange="onProjectChange()">
<%
        	}
            for(int i = 0 ; i < projKeys.size() ; i++)
            {
                strProject = (String)projKeys.get(i);
                if (strProject.equals(strdefPrj))
                {
%>
                    <option selected="selected" value="<xss:encodeForHTMLAttribute><%=strProject.trim()%></xss:encodeForHTMLAttribute>"><xss:encodeForHTML><%=(String)projNameToDisplayName.get(strProject.trim())%></xss:encodeForHTML></option>
<%
                } else {
%>
                    <option value="<xss:encodeForHTMLAttribute><%=strProject.trim()%></xss:encodeForHTMLAttribute>"><xss:encodeForHTML><%=(String)projNameToDisplayName.get(strProject.trim())%></xss:encodeForHTML></option>
<%
                }
            }
%>
			<input type="hidden" name="Project" id="Project" value="<xss:encodeForHTMLAttribute><%=projectValueInHidden%></xss:encodeForHTMLAttribute>" />
                </select></span>
<%
        } else {
            if( "true".equals(displaySingleValue))
            {
%>
                <input type="text" name="Project_txt" id="Project_txt" value="<xss:encodeForHTMLAttribute><%=(String)projNameToDisplayName.get(strProject.trim())%></xss:encodeForHTMLAttribute>" disabled="disabled"/>
<%
            }
%>
            <input type="hidden" name="Project" id="Project" value="<xss:encodeForHTMLAttribute><%=strProject%></xss:encodeForHTMLAttribute>" />
<%
        }
%>
        </li>
        <li class="select-box">
<%
        if( "true".equals(displaySingleValue) || (projects != null && projects.size() > 1) || organizations.size() > 1)
        {
%>
            <label><emxUtil:i18n localize="i18nId">emxFramework.SecurityContextSelection.Organization</emxUtil:i18n></label>
<%
        }
        if(organizations.size() > 1 || (projects != null && projects.size() > 1))
        {
%>
            <span><select name="Organization" id="Organization" onchange="onOrganizationChange()">
<%
            for(int i = 0 ; i < orgKeys.size() ; i++)
            {
                strOrganization = (String)orgKeys.get(i);
                if (strOrganization.equals(strdefOrg))
                {
%>
                    <option selected="selected"><xss:encodeForHTML><%=(String)orgNameToDisplayName.get(strOrganization.trim())%></xss:encodeForHTML></option>
<%
                } else {
%>
                    <option><xss:encodeForHTML><%=(String)orgNameToDisplayName.get(strOrganization.trim())%></xss:encodeForHTML></option>
<%
                }
            }
%>
            </select></span>
<%
        } else {
            if( "true".equals(displaySingleValue))
            {

%>
                <input type="text" name="Organization_txt" id="Organization_txt" value="<xss:encodeForHTMLAttribute><%=(String)orgNameToDisplayName.get(strOrganization.trim())%></xss:encodeForHTMLAttribute>" disabled="disabled"/>
<%
            }
%>
            <input type="hidden" name="Organization" id="Organization" value="<xss:encodeForHTMLAttribute><%=strOrganization%></xss:encodeForHTMLAttribute>"/>
<%
        }
%>
        </li>
        <li class="select-box">
<%
        if( "true".equals(sRoleToDisplay) )
        {
            if( "true".equals(displaySingleValue) || organizations.size() > 1 || (projects.size() > 1) || roles.size() > 1)
            {
%>
                <label><emxUtil:i18n localize="i18nId">emxFramework.SecurityContextSelection.Role</emxUtil:i18n></label>
<%
            }
            if( roles.size() > 1 || projects.size() > 1 || organizations.size() > 1)
            {
            	 
%>
                <span>
                <select name="Role" id="Role">
<%
				for(int i = 0 ; i < roleKeys.size() ; i++)
				{
				    strRole = (String)roleKeys.get(i);
				    String strRoleDisplay = (String)roleNameToDisplayName.get(strRole); 
                    if (strRole.equals(strdefRole))
                    {
%>
                        <option selected="selected" value="<xss:encodeForHTMLAttribute><%=strRole.trim()%></xss:encodeForHTMLAttribute>"><%=strRoleDisplay.trim()%></option>
<%
                    } else {
%>
                        <option value="<xss:encodeForHTMLAttribute><%=strRole.trim()%></xss:encodeForHTMLAttribute>"><%=strRoleDisplay.trim()%></option>
<%
                    }
                }
%>
                </select></span>
<%
            } else {
                if( "true".equals(displaySingleValue))
                {
                	String strRoleDisplay = strRole;
                	 try
                     {
                		 strRoleDisplay =  (String)roleNameToDisplayName.get(strRole);
                     } catch (Exception ex)
                     {
                     	//just display actual role name
                     }
%>
                    <input type="text" name="Role_txt" id="Role_txt" value="<xss:encodeForHTMLAttribute><%=strRoleDisplay%></xss:encodeForHTMLAttribute>" disabled="disabled"/>
<%
                }
%>
                <input type="hidden" name="Role" id="Role" value="<xss:encodeForHTMLAttribute><%=strRole%></xss:encodeForHTMLAttribute>" />
<%
            }
        }
%>
        </li>
<%
    String hidden = "hidden";
    java.util.List<String> countries = new ArrayList<>();
    String oldLocation = "NO_LOCATION_DEFINED";
    String oldDate = "";
    String currentLocation = "NO_LOCATION_DEFINED";

    if (isExportControl) {
        String helpTitle = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.SecurityContextSelection.Help.Title", languageStr);
        String helpContent = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.SecurityContextSelection.Help.Content", languageStr);

%>
<script>
$( document ).ready(function() {
    var loginInfo = document.getElementById("loginInfo");
    var text = loginInfo.innerHTML;
    if (text != "") {
        var words = text.split(" ");
        words[words.length - 1] = new Date(new Number(words[words.length - 1])).toLocaleString();
        loginInfo.innerHTML = words.join(" ");
    }
    require(["DS/Controls/TooltipModel"],
        function(WUXTooltipModel) {
            
            document.getElementById("helpImg").tooltipInfos = new WUXTooltipModel({
                                                           title: "<%=helpTitle%>",
                                                           shortHelp: "<%=helpContent%>",
                                                           mouseRelativePosition: false,
                                                           position: "bottom"
                                                       });
        }
    );
});
</script>
<%
        hidden = "";
        countries = Country.getActiveCountries(context);
        countries.sort(Comparator.comparing( String::toString ));
        try
        {
            java.util.Map output = JPO.invoke(context, "EXCPersonLicenseCheck", null, "getPersonLocationInfo", null, java.util.Map.class);
            oldLocation = (String)output.get("lastLocation");
            oldDate = (String)output.get("lastTime");
            
            if (!"true".equalsIgnoreCase((String)output.get("lastLocationExpired"))) {

                currentLocation = oldLocation;
            }
        }
        catch(Exception e)
        {
             e.printStackTrace();
        }
    }

    String loginInfo = "";
    if (!oldLocation.equals("NO_LOCATION_DEFINED")) {
        loginInfo = MessageUtil.getMessage(context, "emxFramework.SecurityContextSelection.LastLoginInfo", new String[] {"country", "date"}, new String[] {oldLocation, oldDate}, null, "emxFrameworkStringResource");
    }
%>
        <li class="IP-select-box <%=hidden%> divider" style="font-size: 12px; color: #3d3d3d">
            <span id="loginInfo"><%=loginInfo%></span>
        </li>

        <li class="IP-select-box <%=hidden%>">
          <label><emxUtil:i18n localize="i18nId">emxFramework.SecurityContextSelection.CountryLabel</emxUtil:i18n><img id="helpImg" src="images/iconActionHelp.png" style="height: 16px;width: auto;vertical-align: middle;margin-left: 4px;"></label>
          <span>
              <select name="country" id="country">
<%
	    String unassignedCountry = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.SecurityContextSelection.Country.PlaceHolder", languageStr);
            if (currentLocation.equals("NO_LOCATION_DEFINED")) {
%>
	        <option disabled selected value="<xss:encodeForHTMLAttribute>NO_LOCATION_DEFINED</xss:encodeForHTMLAttribute>"><xss:encodeForHTML><%=unassignedCountry%></xss:encodeForHTML></option>
<%
            } else {
%>
	        <option disabled value="<xss:encodeForHTMLAttribute>NO_LOCATION_DEFINED</xss:encodeForHTMLAttribute>"><xss:encodeForHTML><%=unassignedCountry%></xss:encodeForHTML></option>
<%
            }
	    for(String country: countries) {
	        String i18NCountry = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Range.Country." + country.replaceAll(" ", "_"), languageStr);

            if (country.equals(currentLocation)) {
%>
                    <option selected="selected" value="<xss:encodeForHTMLAttribute><%=country%></xss:encodeForHTMLAttribute>"><xss:encodeForHTML><%=i18NCountry%></xss:encodeForHTML></option>
<%
	        } else {
%>
                    <option value="<xss:encodeForHTMLAttribute><%=country%></xss:encodeForHTMLAttribute>"><xss:encodeForHTML><%=i18NCountry%></xss:encodeForHTML></option>
<%
	        }
	    }
%>
              </select>
              <input type="hidden" name="oldCountry" id="oldCountry" value="<xss:encodeForHTMLAttribute><%=oldLocation%></xss:encodeForHTMLAttribute>">

          </span>
        </li>

        <li class="IP-select-box <%=hidden%>">
            <input type="checkbox" name="remember" onChange="javascript:checkIfCountrySelected(this)" value="true" style="display: inline-block; width: auto;">
            <span style="display: inline-block; margin-top: 0; vertical-align: middle" class="checkbox-label-remember"><emxUtil:i18n localize="i18nId">emxFramework.SecurityContextSelection.CountryRemember</emxUtil:i18n></span>
        </li>

        <li class="buttons">
<%
        if (!"true".equalsIgnoreCase(switchContext))
        {
%>
            <button id="submitButton" onClick="mxSubmit(); return false;" class="btn-primary"><label><emxUtil:i18n localize="i18nId">emxFramework.SecurityContextSelection.Done</emxUtil:i18n></label></button>
<%
        } else {
%>
            <input type="hidden" name="ContentURL" />
            <input type="hidden" name="currentApp" />
            <input type="hidden" name="switchContext" />
            <button onClick="mxSubmitSwitchContext(); return false;" class="btn-primary"><emxUtil:i18n localize="i18nId">emxFramework.SecurityContextSelection.Done</emxUtil:i18n></button>
            <button onClick="mxCancel(); return false;" class="btn-default"><emxUtil:i18n localize="i18nId">emxFramework.Button.Cancel</emxUtil:i18n></button>
<%
        }
%>
        </li>
        </ul>
<%@include file = "enoviaCSRFTokenInjection.inc"%>        
        </div><!-- /.panel-body -->
        </form>
        </div><!-- /.panel-content -->
        </div><!-- /.panel -->
        </div><!-- /.wrap-inner -->
<%
    if (isExportControl && !"true".equalsIgnoreCase(switchContext)) {
        String disclaimerHeader = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.SecurityContextSelection.Disclaimer", languageStr);
        String disclaimer = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.SecurityContextSelection.Disclaimer.Value", languageStr);

%>
<div class="EC-disclaimer">
    <div class="EC-disclaimer-header"><%=disclaimerHeader%></div>

<div class="EC-disclaimer-message">
</div>
    <%=disclaimer%>
</div>

<%
    }
%>
        </div><!-- /.wrap-outer -->
<%
        if (!"true".equalsIgnoreCase(switchContext))
        {
%>
            </body>
<%
        }
    }
} else {
	String loginurl = getServletConfig().getServletContext().getInitParameter("ematrix.login.page");
    String pagePath = getServletConfig().getServletContext().getInitParameter("ematrix.page.path");
    if (loginurl == null || loginurl.length() == 0)
    {
    	loginurl = "/emxLogin.jsp";
    }
    loginurl = pagePath+loginurl;
    if(!"".equals(paramNameValues)){
    	loginurl += (loginurl.indexOf("?") > -1) ? ("&" + paramNameValues) : ("?" + paramNameValues);
    }
    //System.out.println("USER IS NOT LOGGED IN SENDING TO LOGIN PAGE WITH URL AS == "+ loginurl);
%>
<!-- \\XSSOK -->
    <script>document.location.href="<%=loginurl%>"</script>
<%
}
if (!"true".equalsIgnoreCase(switchContext))
{
%>
    </html>
<%
}
%>
