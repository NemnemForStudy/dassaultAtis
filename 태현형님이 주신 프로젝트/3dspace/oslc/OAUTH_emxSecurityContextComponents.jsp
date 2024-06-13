<%--  emxSecurityContextComponents.jsp   - security context selection page for MatrixOne applications

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

      static const char RCSID[] = $Id: emxSecurityContextSelection.jsp $
--%>
<%@ page import="matrix.db.*, matrix.util.*, com.matrixone.servlet.*, java.text.* ,java.util.* , java.net.URLEncoder, com.matrixone.apps.domain.util.*, com.matrixone.apps.framework.taglib.*"  %>
<%@ page import="com.matrixone.apps.domain.util.PersonUtil" %>
<%@ page import="com.matrixone.apps.domain.util.PropertyUtil" %>
<%@ page import="com.matrixone.apps.framework.ui.UIUtil" %>
<%@ page import="javax.json.JsonArray, javax.json.JsonObject, javax.json.Json, javax.json.JsonArrayBuilder"%>
<%
//JPA+
Context context= Framework.getMainContext(session);
String securityContextCompParamVal = request.getParameter("scParamValue");
String securityContextCompParamType = request.getParameter("scParamType");
JsonArrayBuilder jarrBuilder = Json.createArrayBuilder();
if (securityContextCompParamType.equalsIgnoreCase("Company"))
{
	String project = request.getParameter("project");
	StringList roleList = PersonUtil.getRoles(context,context.getUser(), securityContextCompParamVal, project);
	if (roleList.size() <= 0)
	{
		roleList = PersonUtil.getRoles(context,context.getUser(),"","");
	}
	Collections.sort(roleList);
	String languageStr = request.getHeader("Accept-Language");
	String strRoleDisplay ="";
	for(int i = 0 ; i < roleList.size() ; i++)
	{
		String strComp = (String)roleList.get(i);
		strRoleDisplay = i18nNow.getRoleI18NString(strComp, languageStr);
		jarrBuilder.add("role_"+strComp +"|" + strRoleDisplay );
	}

}
if (securityContextCompParamType.equalsIgnoreCase("Project"))
{
	String org = request.getParameter("organization");
	if(UIUtil.isNullOrEmpty(org)){
		StringList orgList = PersonUtil.getOrganizations(context, context.getUser(), securityContextCompParamVal);
		if(orgList.size() <= 0){
			orgList = PersonUtil.getOrganizations(context, context.getUser(), "");
		}
		Collections.sort(orgList);
		for(String orgName:orgList){
			jarrBuilder.add(orgName);
		}
		org = orgList.get(0);
	}else {
		jarrBuilder.add(org);
	}
	StringList roleList = PersonUtil.getRoles(context,context.getUser(), org, securityContextCompParamVal);
	String languageStr = request.getHeader("Accept-Language");
	String strRoleDisplay ="";
	if (roleList.size() <= 0)
	{
		String strComp = PersonUtil.getDefaultSCRole(context,context.getUser());
		strRoleDisplay = strComp;
		try
        {
        	strRoleDisplay = i18nNow.getRoleI18NString(strComp, languageStr);
        } catch (Exception ex)
        {
        	//Do Nothing just display actual role name
        }
		jarrBuilder.add("role_"+strComp + "|" + strRoleDisplay);			
	}
	else
	{
		Collections.sort(roleList);
		for(int i = 0 ; i < roleList.size() ; i++)
		{
			String strComp = (String)roleList.get(i);
			strRoleDisplay = strComp;
			try
	        {
	        	strRoleDisplay = i18nNow.getRoleI18NString(strComp, languageStr);
	        } catch (Exception ex)
	        {
	        	//Do Nothing just display actual role name
	        }
			jarrBuilder.add("role_"+strComp + "|" + strRoleDisplay);
		}
	}

}
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setDateHeader("Expires", 0); //prevents caching at the proxy server
response.setContentType("text/html; charset=UTF-8");
out.print(jarrBuilder.build().toString());
%>
