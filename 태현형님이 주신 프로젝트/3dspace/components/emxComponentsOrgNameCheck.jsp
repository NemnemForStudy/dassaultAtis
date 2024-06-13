<%--  
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program
--%>
<%@  include file = "../emxUICommonAppInclude.inc"%>
<%@ page import="com.matrixone.apps.framework.ui.UINavigatorUtil,com.matrixone.apps.domain.DomainConstants,com.matrixone.apps.domain.util.PropertyUtil,com.matrixone.apps.domain.util.MapList, matrix.util.StringList,com.matrixone.apps.domain.DomainObject" %>
<%
String orgName = emxGetParameter(request,"orgName");
String strLanguage = request.getHeader("Accept-Language");
String typeOrganization = PropertyUtil.getSchemaProperty(context, "type_Organization");
String objWhere = DomainConstants.SELECT_ATTRIBUTE_TITLE+"==\""+orgName+"\"";
StringList objSelects = new StringList(DomainConstants.SELECT_ID);
MapList compList= DomainObject.findObjects(context,typeOrganization,DomainConstants.QUERY_WILDCARD,DomainConstants.QUERY_WILDCARD,DomainConstants.QUERY_WILDCARD,DomainConstants.QUERY_WILDCARD,objWhere,true,objSelects);   

boolean orgNameExists = compList.size() > 0;
System.out.println("orgNameExists : " + orgNameExists);
String i18NOrgNameExists = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(), "emxComponents.Profiling.OrganizationAlreadyExists"); 

String result = "<result>success</result>";
String message = "<errorMsg><![CDATA[]]></errorMsg>";

if (orgNameExists) {
    result = "<result>fail</result>";
    message = "<errorMsg> <![CDATA["+i18NOrgNameExists+ "]]> </errorMsg>";            
} 
out.clear();
out.println("<mxOrgNameCheck>" + result + message +"</mxOrgNameCheck>");
%>
