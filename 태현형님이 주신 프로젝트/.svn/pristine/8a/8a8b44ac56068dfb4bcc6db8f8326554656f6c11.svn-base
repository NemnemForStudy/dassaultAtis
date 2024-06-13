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
<%@page import="javax.json.JsonArrayBuilder,javax.json.Json"%>
<%
//JPA+
Context context= Framework.getMainContext(session);
String securityContextCompParamVal = request.getParameter("scParamValue");
String securityContextCompParamType = request.getParameter("scParamType");
JsonArrayBuilder jarr = Json.createArrayBuilder();
if (securityContextCompParamType.equalsIgnoreCase("Company"))
{
	String project = request.getParameter("project");
	String actualSCCompName = PersonUtil.getCompanyNameFromTitle(context, securityContextCompParamVal);
	if(UIUtil.isNullOrEmpty(actualSCCompName)) {
		actualSCCompName = securityContextCompParamVal;
	}
	StringList roleList = PersonUtil.getRoles(context,context.getUser(), actualSCCompName, project);
	if (roleList.size() <= 0)
	{
		roleList = PersonUtil.getRoles(context,context.getUser(),"","");
	}
	String languageStr = request.getHeader("Accept-Language");
	String strRoleDisplay ="";
	Collections.sort(roleList);
	Map roleNameToDisplayName = new HashMap();
	for(int i = 0 ; i < roleList.size() ; i++)
	{
		String strComp = (String)roleList.get(i);
		strRoleDisplay = i18nNow.getRoleI18NString(strComp, languageStr);
		roleNameToDisplayName.put(strComp,strRoleDisplay);		
	}
	java.util.List<String> roleKeys = UIUtil.getSortedListFromMap(roleNameToDisplayName);	
	for(int i = 0 ; i < roleKeys.size() ; i++) {
		String strRole = (String)roleKeys.get(i);
		String strRoleDisplayValue = (String)roleNameToDisplayName.get(strRole);
		jarr.add("role_"+strRole + "|" + strRoleDisplayValue);
	}

}
if (securityContextCompParamType.equalsIgnoreCase("Project"))
{
	String org = request.getParameter("organization");
	String orgActualName= org;
	if(UIUtil.isNullOrEmpty(org)){
		Map orgMap = PersonUtil.getOrganizationsForDisplayForSCSelection(context, context.getUser(), securityContextCompParamVal);
		
		java.util.List<Map.Entry<String, String> > list = 
                new LinkedList<Map.Entry<String, String> >(orgMap.entrySet()); 
   
         // Sort the list 
         Collections.sort(list, new Comparator<Map.Entry<String, String> >() { 
             public int compare(Map.Entry<String, String> o1,  
                                Map.Entry<String, String> o2) 
             { 
                 return (o1.getValue()).compareTo(o2.getValue()); 
             } 
         }); 
           
         // put data from sorted list to hashmap  
         HashMap<String, String> temp = new LinkedHashMap<String, String>(); 
         for (Map.Entry<String, String> aa : list) { 
             temp.put(aa.getKey(), aa.getValue()); 
         }
         StringList orgList =  new StringList();
         java.util.List<String> orgKeys = new ArrayList<>(temp.keySet());
         for(String orgName:orgKeys) {
        	 if(!orgList.contains(orgName)) {
        		 orgList.add(orgName+","+temp.get(orgName));
        		 jarr.add(orgName+","+temp.get(orgName));
        	 }
         }
         orgActualName = orgKeys.get(0);
	}else {
		jarr.add(PersonUtil.getCompanyNameFromTitle(context,org)+","+org);
	}
	StringList roleList = PersonUtil.getRoles(context,context.getUser(), orgActualName, securityContextCompParamVal);
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
		jarr.add("role_"+strComp + "|" + strRoleDisplay);			
	}
	else
	{
		Collections.sort(roleList);
		Map roleNameToDisplayName = new HashMap();
		for(int i = 0 ; i < roleList.size() ; i++)
		{
			String strComp = (String)roleList.get(i);
			strRoleDisplay = strComp;
			try
	        {
	        	strRoleDisplay = i18nNow.getRoleI18NString(strComp, languageStr);
	        	roleNameToDisplayName.put(strComp,strRoleDisplay);
	        } catch (Exception ex)
	        {
	        	//Do Nothing just display actual role name
	        }			
		}
		java.util.List<String> roleKeys = UIUtil.getSortedListFromMap(roleNameToDisplayName);	
		for(int i = 0 ; i < roleKeys.size() ; i++) {
			String strRole = (String)roleKeys.get(i);
			String strRoleDisplayValue = (String)roleNameToDisplayName.get(strRole);
			jarr.add("role_"+strRole + "|" + strRoleDisplayValue);
		}
	}

}
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setDateHeader("Expires", 0); //prevents caching at the proxy server
response.setContentType("text/html; charset=UTF-8");
out.print(jarr.build().toString());
%>
