<%--  emxCreateRouteTemplateWizardDialog.jsp   -  Create Dialog for Route Template Wizard

   Copyright (c) 1992-2020 Dassault Systemes.All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne, Inc.
   Copyright notice is precautionary only and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxCreateRouteTemplateWizardDialog.jsp.rca 1.23 Wed Oct 22 16:18:46 2008 przemek Experimental przemek $
--%>

<%@page import="com.matrixone.apps.framework.ui.UIUtil"%>
<%@ include file = "../emxUICommonAppInclude.inc" %>
<%@ include file = "emxRouteInclude.inc" %>
<%@ include file = "../emxJSValidation.inc" %>
<%@ include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@ include file = "emxComponentsJavaScript.js"%>
<%@page import  = "com.matrixone.apps.common.RouteTemplate"%>
<jsp:useBean id="formBean" scope="session" class="com.matrixone.apps.common.util.FormBean"/>

<%
String keyValue=emxGetParameter(request,"keyValue");
String firstTime=emxGetParameter(request,"firstTime");
String routePreserveTaskOwner=emxGetParameter(request,"routePreserveTaskOwner");
String routeChooseUsersFromUG=emxGetParameter(request,"routeChooseUsersFromUG");
Map<String,Boolean> routeTemplateCreationInfoMap = RouteTemplate.getRouteTemplateCreationInfo(context);
String sAttrRouteTemplateCompletionAction = PropertyUtil.getSchemaProperty(context, "attribute_RouteCompletionAction" );
AttributeType attributeCompletionType = new AttributeType(sAttrRouteTemplateCompletionAction);
String strRouteTemplateCompletion  = attributeCompletionType.getDefaultValue(context);
if(keyValue == null){
        keyValue = formBean.newFormKey(session);
}

// Fix for bug # 296380
boolean isTeamCentralInstalled = FrameworkUtil.isSuiteRegistered(context,"featureVersionTeamCentral",false,null,null);
// Fix for bug # 296380 End

formBean.processForm(session,request,"keyValue");


  String SELECT_AVAILABILITY = "to[" + DomainObject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.type";
  String SELECT_ROUTE_TEMPLATES_OBJECT = "to[" + DomainObject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.id";

//  RouteTemplate routeTemplateObject = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);

//  String templateId      =   (String)formBean.getElementValue("templateId");
  String scopeId          =  (String) formBean.getElementValue("scopeId");


  final String ATTRIBUTE_AUTO_STOP_ON_REJECTION = PropertyUtil.getSchemaProperty(context, "attribute_AutoStopOnRejection" );
  final String ATTRIBUTE_AUTO_ROUTE_TEMPLATE_BASE_PURPOSE = PropertyUtil.getSchemaProperty(context, "attribute_RouteBasePurpose" );
  String routeTemplateName                  = "";
  String routeTemplateDescription           = "";
  String routeTemplateRestrictMembers       = "All";
  AttributeType attributePurposeType = new AttributeType(ATTRIBUTE_AUTO_ROUTE_TEMPLATE_BASE_PURPOSE);
  String routeTemplateBasePurpose           = attributePurposeType.getDefaultValue(context);
  String routeTemplateScope                 = "User";
  String orgName                            = "";
  String orgId                              = "";
  String subRouteTemplateName               = "";
  String subRouteTemplateId                 = "";
  
  AttributeType attributeRejectionType = new AttributeType(ATTRIBUTE_AUTO_STOP_ON_REJECTION);
  String strAutoStopOnRejection  = attributeRejectionType.getDefaultValue(context);
  String sWorkspaceId="";
  String sWorkspaceName="";
  String routeTaskEdits=""; 
  String esignConfigSetting = "None";
  try{
		esignConfigSetting = MqlUtil.mqlCommand(context, "list expression $1 select $2 dump","ENXESignRequiresESign", "value");
		if(UIUtil.isNullOrEmpty(esignConfigSetting))
				 esignConfigSetting="None";
	}
  catch (Exception e){
		esignConfigSetting="None";
	}
  boolean previous=true;
  String previousButtonClick=(String) formBean.getElementValue("previousButtonClick");
// Bug No: 304380 Begin
  String routeTemplateorganizationId        = "";
  String companyName ="";
  String companyId ="";
  boolean isCompanyRepresentative=false;
  boolean isSpecOfficeManager=false;
  String esign1= "";
// Bug No: 304380 End
  if (( previousButtonClick == null) || (previousButtonClick.equals("")) )
		previous=false;

  if (previous || !(firstTime!=null && firstTime.equals("true"))) {
        routeTemplateName               = (String)formBean.getElementValue("routeName");
        routeTemplateDescription        = (String)formBean.getElementValue("description");
        routeTemplateRestrictMembers    = (String)formBean.getElementValue("scopeId");
        routeTemplateBasePurpose        = (String)formBean.getElementValue("routeTemplateBasePurpose");
        strRouteTemplateCompletion        = (String)formBean.getElementValue("routeTemplateCompletionAction");
        routeTemplateScope              = (String)formBean.getElementValue("availability");
        routeTemplateorganizationId     = (String)formBean.getElementValue("organizationId");  // Bug No: 304380 
        strAutoStopOnRejection          = (String)formBean.getElementValue("autoStopOnRejection");
        Hashtable hashRouteWizFirst = (Hashtable)formBean.getElementValue("hashRouteWizFirst");
        if(hashRouteWizFirst == null){
        	routePreserveTaskOwner = (String)formBean.getElementValue("routePreserveTaskOwner");
        	routeChooseUsersFromUG = (String)formBean.getElementValue("routeChooseUsersFromUG");
        	subRouteTemplateName          	= (String)formBean.getElementValue("subRouteTemplateName");
            subRouteTemplateId          	= (String)formBean.getElementValue("subRouteTemplateId");
	    	esign1= (String)formBean.getElementValue("esign");
        } else {
        	routePreserveTaskOwner = (String)hashRouteWizFirst.get("routePreserveTaskOwner");
        	routeChooseUsersFromUG = (String)hashRouteWizFirst.get("routeChooseUsersFromUG");
        	subRouteTemplateName          	= (String)hashRouteWizFirst.get("subRouteTemplateName");
            subRouteTemplateId          	= (String)hashRouteWizFirst.get("subRouteTemplateId");
	    	esign1 = (String)hashRouteWizFirst.get("esign");
        }
        if(subRouteTemplateName == null){
        	subRouteTemplateName          	= "";
            subRouteTemplateId          	= "";
        }
// Fix for bug # 296380
if(isTeamCentralInstalled) {
		sWorkspaceId = (String)formBean.getElementValue("WorkspaceId");
		sWorkspaceName= (String)formBean.getElementValue("WorkspaceAvailable");
}
// Fix for bug # 296380 End

		routeTaskEdits= (String)formBean.getElementValue("RouteTaskEdits");
		formBean.setElementValue("previousButtonClick",null);
	}  
  
  	String isLinkTemplateCompletionSelectedStyle = UIUtil.isNotNullAndNotEmpty(subRouteTemplateName) ? "table-row" : "none";
  	String isLinkTemplateSelectedStyle = "Standard".equalsIgnoreCase(routeTemplateBasePurpose) ? "table-row" : "none";
//Bug No :304380 
     com.matrixone.apps.common.Person person = com.matrixone.apps.common.Person.getPerson(context);
     Company company = person.getCompany(context);
     companyName = company.getInfo(context,DomainConstants.SELECT_ATTRIBUTE_TITLE);
     companyId = company.getId();
     StringTokenizer stk;
     String id ="";
     if (routeTemplateorganizationId!=null && !"".equals(routeTemplateorganizationId)) {
        stk=new  StringTokenizer (routeTemplateorganizationId,"newId=");
        while (stk.hasMoreTokens()) {
          id=(String)stk.nextToken();
     }

        if(id!=null && !"".equals(id)&& !"null".equals(id)) {
        String name="";
        DomainObject domainObject = DomainObject.newInstance(context,id );
        domainObject.open(context);
        orgName=domainObject.getInfo(context,DomainConstants.SELECT_ATTRIBUTE_TITLE);
        orgId=id;
        domainObject.close(context);
   }
  }
     isCompanyRepresentative= person.isRepresentativeFor(context, companyId);
     String ROLE_SPECIFICATION_OFFICE_MANAGER = PropertyUtil.getSchemaProperty(context,"role_SpecificationOfficeManager");
     isSpecOfficeManager= person.hasRole(context, ROLE_SPECIFICATION_OFFICE_MANAGER);
//Bug No :304380 End


// Fix for bug # 296380
if(isTeamCentralInstalled) {
  if(sWorkspaceName==null)
              sWorkspaceName="";
 if(sWorkspaceId==null)
              sWorkspaceId="";
}
// Fix for bug # 296380

  boolean hasEnterpriseAccess = false;

  //Get the company details to initialize the company field to person's company
  //if scope is selected as Enterprise.
  
//if(person.hasRole(context,DomainObject.ROLE_ORGANIZATION_MANAGER) || person.hasRole(context,DomainObject.ROLE_COMPANY_REPRESENTATIVE) || person.hasRole(context,ROLE_SPECIFICATION_OFFICE_MANAGER))
if(isCompanyRepresentative || isSpecOfficeManager || person.hasRole(context,PropertyUtil.getSchemaProperty(context, "role_VPLMProjectLeader")) || person.hasRole(context,PropertyUtil.getSchemaProperty(context, "role_3DSRestrictedLeader"))) {
  hasEnterpriseAccess = true;
}
//for bug # 280646 related to BU 
// Bug No :304380 
if("Enterprise".equals(routeTemplateScope) && previous==false) {
    orgName = companyName;
    orgId   =  companyId;
  }
%>

<script language="javascript">
  function trim (textBox) {
    while (textBox.charAt(textBox.length-1) == ' ' || textBox.charAt(textBox.length-1) == "\r" || textBox.charAt(textBox.length-1) == "\n" )
      textBox = textBox.substring(0,textBox.length - 1);
    while (textBox.charAt(0) == ' ' || textBox.charAt(0) == "\r" || textBox.charAt(0) == "\n")
      textBox = textBox.substring(1,textBox.length);
      return textBox;
  }

<%
// Fix for bug # 296380
if(isTeamCentralInstalled) {
%>
  function updateWorkspace() {

               document.createDialog.WorkspaceId.value='<%=XSSUtil.encodeForJavaScript(context,sWorkspaceId)%>';
               document.createDialog.WorkspaceAvailable.value='<%=XSSUtil.encodeForJavaScript(context,sWorkspaceName)%>';
               document.createDialog.ellipseButton.disabled=false;
        <%
           if(hasEnterpriseAccess){
        %>
                //for bug # 280646 related to BU 
               document.createDialog.organization.value = "";
               document.createDialog.organizationId.value = "";
               document.createDialog.selectOrganization.disabled=true;
        <%
              }
        %>
 }
   // This function gets executed when the user clicks Ellipse Button Present in the Workspace Availability.
function showTypeSelector() {
      var workspaceChooserURL = "../common/emxIndentedTable.jsp?expandProgram=emxWorkspace:getWorkspaceFoldersForSelection&table=TMCSelectFolder&program=emxWorkspace:getDisabledWorkspaces&header=emxComponents.CreateRoute.SelectAvailability&type=Route Template&suiteKey=Components&customize=false&objectCompare=false&HelpMarker=emxhelpsearch&displayView=details&multiColumnSort=false&submitLabel=emxComponents.Common.Done&cancelLabel=emxComponents.Common.Cancel&submitURL=../components/emxCommonSelectWorkspaceFolderProcess.jsp&fromPage=routeTemplateWizard";
      showModalDialog(workspaceChooserURL , "400", "400", false, "Medium");
  }
   
function showRouteTemplate() {
    var routeTemplateChooserURL = "../common/emxFullSearch.jsp?field=TYPES=type_RouteTemplate:ROUTE_BASE_PURPOSE=Standard:CURRENT=policy_RouteTemplate.state_Active:LATESTREVISION=TRUE:route_95_template_95_valid=TRUE&table=RouteTemplateSummary&selection=single&fieldNameActual=subRouteTemplateId&fieldNameDisplay=subRouteTemplate&submitURL=../components/emxComponentsFullSearchUtil.jsp&mode=Chooser&HelpMarker=emxhelpfullsearch&fromPage=routeTemplate&showInitialResults=false";
    showModalDialog(routeTemplateChooserURL , "400", "400", false, "Medium");
}
function clearRouteTemplate() {
	var form = document.forms[0];
    if (form) {
        if (form.subRouteTemplateName) {
            form.subRouteTemplateName.value="";
        }
        if (form.subRouteTemplateId) {
            form.subRouteTemplateId.value="";
        }
        if (form.routeTemplateCompletionAction) {
        	form.routeTemplateCompletionAction[0].selected= true;
        	form.routeTemplateCompletionAction.parentElement.parentElement.style.display="none";
        }
     }
}

<%
        }
// Fix for bug # 296380 End
%>

  function autoNameValue() {
    if(document.createDialog.routeAutoName.checked ) {
      document.createDialog.routeName.value = "";
      document.createDialog.routeAutoName.focus();
    }
    return;
  }
  
  function disableLinkField() {
	  debugger;
	  var isStandardSelected = document.createDialog.routeTemplateBasePurpose[2];
	  if(isStandardSelected.selected){
		  document.createDialog.subRouteTemplateName.parentElement.parentElement.style.display="table-row";;
	  }else {
		  clearRouteTemplate();
		  document.createDialog.subRouteTemplateName.parentElement.parentElement.style.display="none";
	  }
	  	<%
	if("RouteSpecific".equalsIgnoreCase(esignConfigSetting)||"All".equalsIgnoreCase(esignConfigSetting)){
		%>
		   if("Approval"==document.createDialog.routeTemplateBasePurpose.value || "Standard"==document.createDialog.routeTemplateBasePurpose.value){
			    document.getElementById('approvalWithSign').style.display='';
		   }
		  else{
			  document.getElementById('approvalWithSign').style.display='none';
		  }
	
	 <%
              }
        %>
	    return;
	  }
  
  function changeVal(obj){
		if (obj.checked) {
			obj.value= true;
		}
		else{
			obj.value= false;
		}
	}
  function submitForm() {
    var checkedAutoname = false;
      document.createDialog.routeName.value = trim(document.createDialog.routeName.value);
    var namebadCharName = checkForNameBadCharsList(document.createDialog.routeName);
    var descrptionBadChar = checkForBadChars(document.createDialog.description);

	   if (!document.createDialog.routeAutoName.checked )  {
          if ( (document.createDialog.routeName.value==""))  {
            alert("<emxUtil:i18nScript localize="i18nId">emxComponents.CreateFolderDialog.EnterRouteTemplateName</emxUtil:i18nScript>");
            document.createDialog.routeName.value = "";
            document.createDialog.routeName.focus();
            return;
        } else if (namebadCharName.length != 0) {
            alert("<emxUtil:i18nScript localize="i18nId">emxComponents.Alert.InvalidChars</emxUtil:i18nScript>"+namebadCharName+"<emxUtil:i18nScript localize="i18nId">emxComponents.Common.AlertRemoveInValidChars</emxUtil:i18nScript>");
            document.createDialog.routeName.focus();
            return;
          }
        }

<%
// Fix for bug # 296380
if(isTeamCentralInstalled) {
%>
        for(var i=0; i < document.createDialog.availability.length; i++) {
            if (document.createDialog.availability[i].checked && document.createDialog.availability[i].value == "Workspace" && trim(document.createDialog.WorkspaceAvailable.value) == "") {
         alert("<emxUtil:i18nScript localize="i18nId">emxComponents.RouteTemplates.SelectWorkspaceAvailability</emxUtil:i18nScript>");
         document.createDialog.ellipseButton.focus();
		 return;
       }
  }
<%
               }
// Fix for bug # 296380 End
%>

    if(trim(document.createDialog.description.value)=="") {
      alert("<emxUtil:i18nScript localize="i18nId">emxComponents.CreateFolderDialog.EnterRouteTemplateDesc</emxUtil:i18nScript>");
      document.createDialog.description.value = "";
      document.createDialog.description.focus();
      return;
    } else if (descrptionBadChar.length != 0) {
        alert("<emxUtil:i18nScript localize="i18nId">emxComponents.Alert.InvalidChars</emxUtil:i18nScript>"+descrptionBadChar+"<emxUtil:i18nScript localize="i18nId">emxComponents.Common.AlertRemoveInValidChars</emxUtil:i18nScript>");
        document.createDialog.description.focus();
        return;
    } else {

      // Make sure user doesnt double clicks on create route
      if (jsDblClick()) {
        document.createDialog.submit();
        return;
      }
    }
  }

  function showSearchWindow() {
    emxShowModalDialog('emxSearchRouteTemplateDialogFS.jsp',775, 500);
  }

  function closeWindow() {
	  submitWithCSRF("emxRouteWizardCancelProcess.jsp?keyValue=<%=XSSUtil.encodeForURL(context, keyValue)%>", window);

    return;
  }
<%
// Fix for bug # 296380
if(isTeamCentralInstalled) {
%>
  function clearAll() {
    if(trim(document.createDialog.WorkspaceAvailable.value) !=null) {
      document.createDialog.WorkspaceAvailable.value="";
      document.createDialog.WorkspaceId.value="";
      document.createDialog.ellipseButton.disabled=true;
    }
    return;
  }
<%
               }
// Fix for bug # 296380 End
%>

//for bug # 280646 related to BU - start
 function clearOrganization() {

<%
if(hasEnterpriseAccess){
%>
    document.createDialog.organization.value = "";
    document.createDialog.organizationId.value = "";
    document.createDialog.selectOrganization.disabled=true;
<%
}
%>

<%
// Fix for bug # 296380
if(isTeamCentralInstalled) {
%>
    document.createDialog.WorkspaceAvailable.value="";
    document.createDialog.WorkspaceId.value="";
    document.createDialog.ellipseButton.disabled=true;
<%
        }
// Fix for bug # 296380 End
%>
  }

  function setOrganization() {
	  <%
if(hasEnterpriseAccess){

%>
    document.createDialog.organization.value = "<%=XSSUtil.encodeForJavaScript(context,companyName)%>";
    document.createDialog.organizationId.value = "<%=XSSUtil.encodeForJavaScript(context,companyId)%>";
    document.createDialog.selectOrganization.disabled=false;
<%
	  }
// Fix for bug # 296380
if(isTeamCentralInstalled) {
%>
    document.createDialog.WorkspaceAvailable.value="";
      document.createDialog.WorkspaceId.value="";
      document.createDialog.ellipseButton.disabled=true;
<%
}
// Fix for bug # 296380 End
%>
}

  function showNoShow() {

    if(document.createDialog.availability[1].checked){
<%   
// Fix for bug # 296380
if(isTeamCentralInstalled) {

%>
      document.createDialog.WorkspaceAvailable.value="";
      document.createDialog.WorkspaceId.value="";
      document.createDialog.ellipseButton.disabled=true;
<%
}
// Fix for bug # 296380 End
%>

      var organizationURL = "emxComponentsSelectOwningOrganizationDialogFS.jsp?objectId=<%=XSSUtil.encodeForJavaScript(context,companyId)%>&fieldName=organization&fieldId=organizationId&selectParent=true";
      emxShowModalDialog(organizationURL, 300, 350);
    }
  } 
  //for bug # 280646 related to BU - end
  
    function showRetainUserGroupOpiton(value) {
		var checkPreserveOwnerTD = document.getElementById("checkPreserveOwnerTD");
		var checkPreserveOwnerLabel = document.getElementById("checkPreserveOwnerLabel");
		var resetChooseUserGroups = document.getElementsByName("resetChooseUserGroups");
		if(value === "True"){	
			resetChooseUserGroups[0].value = "True";	
			checkPreserveOwnerTD.querySelectorAll('input')[1].setAttribute("disabled","");
			document.createDialog.checkPreserveOwner.value = "False";
			//checkPreserveOwnerTD.style.pointerEvents = "none";
		}else{
			checkPreserveOwnerTD.querySelectorAll('input')[1].removeAttribute("disabled");
			checkPreserveOwnerTD.querySelectorAll('input')[1].removeAttribute("style");
			//checkPreserveOwnerTD.style.pointerEvents = "";
		}
}
</script>

<%@include file = "../emxUICommonHeaderEndInclude.inc" %>

<form name="createDialog" method="post" onSubmit="return false" action="emxCreateRouteTemplateWizardProcess.jsp" target="_parent">


  <input type="hidden" name="keyValue" value="<xss:encodeForHTMLAttribute><%=keyValue%></xss:encodeForHTMLAttribute>"/>

  <table>

    <tr>
      <td nowrap  class="labelRequired"><label for="Name"><emxUtil:i18n localize="i18nId">emxComponents.Common.Name</emxUtil:i18n></label></td>
      <td nowrap  class="field">
	<%

	if(routeTemplateName.trim().length() > 0)
	{   // Bug No :304380 
	%>
	  <input type="Text" name="routeName" value="<xss:encodeForHTMLAttribute><%=routeTemplateName%></xss:encodeForHTMLAttribute>" size="20" onFocus="autoNameValue()" onKeyPress="autoNameValue()" onClick="autoNameValue()" onBlur="autoNameValue()" onSelect="autoNameValue()" onKeyDown="autoNameValue()" onChange="autoNameValue()"/>
      <input type=checkbox value="No" name="routeAutoName" onClick="autoNameValue()" />&nbsp;
      <emxUtil:i18n localize="i18nId">emxComponents.Common.AutoName</emxUtil:i18n>&nbsp;
	<%
	}
	else
	{
	%>
		<input type="Text" name="routeName" value="<xss:encodeForHTMLAttribute><%=routeTemplateName%></xss:encodeForHTMLAttribute>" size="20" onFocus="autoNameValue()" onKeyPress="autoNameValue()" onClick="autoNameValue()" onBlur="autoNameValue()" onSelect="autoNameValue()" onKeyDown="autoNameValue()" onChange="autoNameValue()"/>
        <input type=checkbox value="Yes" name="routeAutoName" onClick="autoNameValue()" checked />&nbsp;
        <emxUtil:i18n localize="i18nId">emxComponents.Common.AutoName</emxUtil:i18n>&nbsp;
	<%
	}
	%>
    </td>
    </tr>
    <tr>
      <td class="labelRequired"><label for="Description"><emxUtil:i18n localize="i18nId">emxComponents.Common.Description</emxUtil:i18n></label></td>
      <td class="field" ><textarea name="description" cols="30" rows="5" wrap><xss:encodeForHTML><%=routeTemplateDescription%></xss:encodeForHTML></textarea></td>
    </tr>
    <tr>
      <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxComponents.RouteTemplate.Availability</emxUtil:i18n></label></td>
      <!-- emxComponents.RouteTemplate.Scope -->
      <td class="inputField">
        <table border="0">
	
            <!--//for bug # 280646 related to BU - start-->
  <tr>
  <td>
  <%
//if(hasEnterpriseAccess){
%><!-- //XSSOK -->
            <input type="radio" name="availability" value="User" <%=routeTemplateScope.equals("User")?"checked":""%> onClick="javascript:clearOrganization()"/>
            <emxUtil:i18n localize="i18nId">emxComponents.Common.User</emxUtil:i18n>
<%
//}else{
%>
   <!--         <input type="hidden" name="availability" value="User" /> -->
<%
//}
%>
                </td>
          </tr>
<%
if(hasEnterpriseAccess){
%>
          <tr><!-- //XSSOK -->
            <td><input type="radio" name="availability" value="Enterprise" <%=routeTemplateScope.equals("Enterprise")?"checked":""%> onClick="javascript:setOrganization()"/>&nbsp;<emxUtil:i18n localize="i18nId">emxComponents.Common.Enterprise</emxUtil:i18n></td>
          </tr>
<%
}

// Fix for bug # 296380
if(isTeamCentralInstalled) {
%>
<tr>
              <td>
                <!-- //XSSOK -->
                <input type = "radio" name = "availability" value = "Workspace" onClick="updateWorkspace()" <%=routeTemplateScope.equals("Workspace")?"checked":""%>/>
                <!-- emxComponents.Common.WorkProjectspace-->
                <input readonly type="text" name="WorkspaceAvailable" id="WorkspaceAvailable" onfocus="blur()" onchange="" size="20" value="<xss:encodeForHTMLAttribute><%=sWorkspaceName%></xss:encodeForHTMLAttribute>"/>
                <input type = "hidden" name = "WorkspaceId" value = "<xss:encodeForHTMLAttribute><%=sWorkspaceId%></xss:encodeForHTMLAttribute>"/>
                <!-- //XSSOK -->
                <input type="button" name = "ellipseButton" value="..." onClick=showTypeSelector() <%=routeTemplateScope.equals("Workspace")?"":"disabled"%>/>
                &nbsp;&nbsp;
              </td>
          </tr>
<%
               }
// Fix for bug # 296380 End
%>
        </table>
      </td>
    </tr>

<%
if(hasEnterpriseAccess){  
   // Bug No :304380 
%>
    <tr>
      <td class="label"><emxUtil:i18n localize="i18nId">emxComponents.RouteTemplate.OwningOrganization</emxUtil:i18n></label></td>
      <td class="inputField"><input type="text" name="organization" size="20" onfocus="javascript:blur()" value="<xss:encodeForHTMLAttribute><%=orgName%></xss:encodeForHTMLAttribute>"/>
      <!-- //XSSOK -->
      <input type="button" name="selectOrganization" value="..."  onclick="javascript:showNoShow()"<%=routeTemplateScope.equals("Enterprise")?"":"disabled"%>/>&nbsp;</td>
      <input type="hidden" name="organizationId" value="<xss:encodeForHTMLAttribute><%=orgId%></xss:encodeForHTMLAttribute>"/>
    </tr>
<%
}else{
%>
            <input type="hidden" name="organization" value="" />
            <input type="hidden" name="organizationId" value="" />
<%
}
%>
  <!--//for bug # 280646 related to BU - end-->
   <tr>
      <td class="label"><emxUtil:i18n localize="i18nId">emxComponents.Route.RouteBasePurpose</emxUtil:i18n></td>
      <td class="inputField">
      <select name="routeTemplateBasePurpose" onSelect="disableLinkField()" onChange="disableLinkField()">
<%
        StringItr strRouteBasePurposeItr = new StringItr(FrameworkUtil.getRanges(context,RouteTemplate.ATTRIBUTE_ROUTE_BASE_PURPOSE));
        String sAttrRange = "";
        while(strRouteBasePurposeItr.next()) {
          sAttrRange = strRouteBasePurposeItr.obj();
          if(routeTemplateCreationInfoMap.get(sAttrRange+"Template")) {
%><!-- //XSSOK -->
          <option value="<%= XSSUtil.encodeForHTMLAttribute(context, sAttrRange) %>" <%=sAttrRange.equals(routeTemplateBasePurpose)?"Selected":""%> ><%= XSSUtil.encodeForHTMLAttribute(context, i18nNow.getRangeI18NString(RouteTemplate.ATTRIBUTE_ROUTE_BASE_PURPOSE, sAttrRange,request.getHeader("Accept-Language"))) %></option>
<%
        }
        }
%>
      </select>
      </td>
    </tr>
    <tr style="display:<%=isLinkTemplateSelectedStyle%>">
      <td class="label"><emxUtil:i18n localize="i18nId">emxComponents.RouteTemplate.LinkedSubRouteTemplate</emxUtil:i18n></label></td>

      <td class="inputField"><input type="text" name="subRouteTemplateName" size="20" placeholder= "<emxUtil:i18n localize="i18nId">emxComponents.RouteTemplate.PlaceholderSubRT</emxUtil:i18n>"  onfocus="javascript:blur()" value="<xss:encodeForHTMLAttribute><%=subRouteTemplateName%></xss:encodeForHTMLAttribute>"/>
      <!-- //XSSOK -->
      <input type="button" name="selectSubRouteTemplate" value="..."  onclick="javascript:showRouteTemplate()" />
      <a onclick="javascript:clearRouteTemplate()" href="#"/><emxUtil:i18n localize="i18nId">emxComponents.Common.Clear</emxUtil:i18n></td>
      <input type="hidden" name="subRouteTemplateId" value="<xss:encodeForHTMLAttribute><%=subRouteTemplateId%></xss:encodeForHTMLAttribute>"/>
    </tr>  
   
   <tr style="display:<%=isLinkTemplateCompletionSelectedStyle%>">
      <td class="label"><emxUtil:i18n localize="i18nId">emxComponents.RouteTemplate.RouteTemplateCompletionAction</emxUtil:i18n></td>
      <td class="inputField">
      <select name="routeTemplateCompletionAction">
<%
        StringItr strRouteCompletionItr = new StringItr(FrameworkUtil.getRanges(context,sAttrRouteTemplateCompletionAction));
		String strRange_completion = "";
		String strTranslatedRange__completion = "";
		String  disabled= "";
		for (Iterator itrRanges = strRouteCompletionItr.iterator(); itrRanges.hasNext();) {
			strRange_completion = (String)itrRanges.next();
			strTranslatedRange__completion = i18nNow.getRangeI18NString(sAttrRouteTemplateCompletionAction, strRange_completion, sLanguage);
%>		<!-- //XSSOK -->
    		<option value="<%= XSSUtil.encodeForHTMLAttribute(context, strRange_completion)%>" <%=(strRouteTemplateCompletion.equals(strRange_completion))?"selected":""%>><%=XSSUtil.encodeForHTMLAttribute(context, strTranslatedRange__completion)%></option>
<%				
		}
%>
      </select>
      </td>
    </tr>

    <tr>
      <td width="150" class="label"><emxUtil:i18n localize="i18nId">emxComponents.RouteTemplate.Scope</emxUtil:i18n></td>
      <td class="inputField">
        <table border="0">
          <tr><!-- //XSSOK -->
            <td><input type="radio" name="scopeId" value="All" <%=routeTemplateRestrictMembers.equals("All")?"checked":""%>/>
            &nbsp;
            <emxUtil:i18n localize="i18nId">emxComponents.Common.All</emxUtil:i18n></td>
          </tr>
          <tr><!-- //XSSOK -->
            <td><input type="radio" name="scopeId" value="Organization" <%=routeTemplateRestrictMembers.equals("Organization")?"checked":""%>/>
            &nbsp;
            <emxUtil:i18n localize="i18nId">emxComponents.Common.Organization</emxUtil:i18n></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
        <td class = "label">
          <emxUtil:i18n localize="i18nId">emxComponents.RouteTemplate.RouteTaskEdits</emxUtil:i18n>
        </td>
        <td class = "inputField">
          <select name="RouteTaskEdits" size="1">
			<!-- //XSSOK -->
            <option value="Modify/Delete Task List" <%=routeTaskEdits.equals("Modify/Delete Task List")?"Selected":""%>><emxUtil:i18n localize="i18nId">emxComponents.TaskEditSetting.ModifyDeleteTaskList</emxUtil:i18n></option>
            <!-- //XSSOK -->
            <option value="Extend Task List" <%=routeTaskEdits.equals("Extend Task List")?"Selected":""%>><emxUtil:i18n localize="i18nId">emxComponents.TaskEditSetting.ExtendTaskList</emxUtil:i18n></option>
            <!-- //XSSOK -->
            <option value="Modify Task List" <%=routeTaskEdits.equals("Modify Task List")?"Selected":""%>><emxUtil:i18n localize="i18nId">emxComponents.TaskEditSetting.ModifyTaskList</emxUtil:i18n></option>
            <!-- //XSSOK -->
            <option value="Maintain Exact Task List" <%=routeTaskEdits.equals("Maintain Exact Task List")?"Selected":""%>><emxUtil:i18n localize="i18nId">emxComponents.TaskEditSetting.MaintainExactTaskList</emxUtil:i18n></option>
          </select>
        </td>
      </tr>
      
      <!-- Begin:Added to show the Auto Stop On Rejection field -->

     
      <tr>
        <!-- //XSSOK -->
		<td class = "label"><%=EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Attribute.Auto_Stop_On_Rejection", context.getLocale())%></td>
        <td class = "inputField">
          <select name="autoStopOnRejection" size="1">
<%
            StringList slAutoStopOnRejectionRanges = FrameworkUtil.getRanges(context, ATTRIBUTE_AUTO_STOP_ON_REJECTION);
            String strRange = "";
            String strTranslatedRange = "";
            for (Iterator itrRanges = slAutoStopOnRejectionRanges.iterator(); itrRanges.hasNext();) {
                strRange = (String)itrRanges.next();
                strTranslatedRange = i18nNow.getRangeI18NString(ATTRIBUTE_AUTO_STOP_ON_REJECTION, strRange, sLanguage);
%><!-- //XSSOK -->
                <option value="<%= XSSUtil.encodeForHTMLAttribute(context, strRange)%>" <%=(strAutoStopOnRejection.equals(strRange))?"selected":""%>><%=XSSUtil.encodeForHTMLAttribute(context, strTranslatedRange)%></option>
<%
            }
%>          
          </select>
        </td>
      </tr>
      <tr>
    <!--XSSOK-->
        <td class="label" id="checkPreserveOwnerLabel" width="150">
        	<%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(sLanguage),"emxComponents.Routes.PreserveTaskOwner")%>
        </td>   
 <td class="inputField">
 <table border="0">
  <tr>
<%
if("true".equalsIgnoreCase(routePreserveTaskOwner)) {
%>
       <td id="checkPreserveOwnerTD">
       <input type="radio" name="checkPreserveOwner" id="checkPreserveOwner" value = "False" /><%=EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(sLanguage),"emxFramework.Range.Preserve_Task_Owner.False")%>
   		</br>
   	    <input type="radio" name="checkPreserveOwner" id="checkPreserveOwner" value = "True" checked /><%=EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(sLanguage),"emxFramework.Range.Preserve_Task_Owner.True")%>
   		</td>
<% } else {
%>
        <td id="checkPreserveOwnerTD">
        <input type="radio" name="checkPreserveOwner" id="checkPreserveOwner" value = "False" checked/><%=EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(sLanguage),"emxFramework.Range.Preserve_Task_Owner.False")%>
   		</br>
   		<input type="radio" name="checkPreserveOwner" id="checkPreserveOwner" value = "True"   <%="true".equalsIgnoreCase(routeChooseUsersFromUG)?"disabled style='pointer-events: none;'":""%>/><%=EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(sLanguage),"emxFramework.Range.Preserve_Task_Owner.True")%>   		
   		</td>
<%	
}
%>
</tr>
 </table>
 </td>
</tr>

  <tr>
 
    <!--XSSOK-->
        <td class="label" width="150"><%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(sLanguage),"emxComponents.Routes.ChooseUsersFromUG")%></td>   
<td class="inputField">
 <table border="0">
  <tr>
<%
if("true".equalsIgnoreCase(routeChooseUsersFromUG)) {
%>
       <td>
       <input type="radio" name="ChooseUsersFromUG" id="ChooseUsersFromUG" value = "False" onclick="javascript:showRetainUserGroupOpiton(value)"/><%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.No")%>
   		</br>
   	    <input type="radio" name="ChooseUsersFromUG" id="ChooseUsersFromUG" value = "True" onclick="javascript:showRetainUserGroupOpiton(value)" checked /><%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.Yes")%>
   		</td>
<% } else {
%>
        <td>
        <input type="radio" name="ChooseUsersFromUG" id="ChooseUsersFromUG" value = "False" onclick="javascript:showRetainUserGroupOpiton(value)" checked/><%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.No")%>
   		</br>
   		<input type="radio" name="ChooseUsersFromUG" id="ChooseUsersFromUG" value = "True"  onclick="javascript:showRetainUserGroupOpiton(value)" /><%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.Yes")%>   		
   		</td>
<%	
}
%>
<input type="hidden" name="resetChooseUserGroups" value="False"/>
</tr>
 </table>
 </td>
</tr>
<!-- End:Added to show the Auto Stop On Rejection field 
	-->
     <%
if("RouteSpecific".equalsIgnoreCase(esignConfigSetting)||"All".equalsIgnoreCase(esignConfigSetting)) {
%>

<tr id='approvalWithSign'  <%= "Review".equalsIgnoreCase(routeTemplateBasePurpose)? "style='display:none;'":"" %> >
      <td width="150" class="label"><%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(sLanguage),"emxComponents.RouteTemplate.ApprovalWithSign")%></td>
      <td class="inputField">
        <table border="0">
          <tr><!-- //XSSOK -->
			 <td>
       <input type="radio" name="esign" id="esign" value = "False" checked <%="All".equalsIgnoreCase(esignConfigSetting)?"disabled":"" %> /><%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.No")%>
   		</br>
   	    <input type="radio" name="esign" id="esign" value = "True" <%="All".equalsIgnoreCase(esignConfigSetting)||"True".equalsIgnoreCase(esign1)? "checked" :"" %> /><%=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.Yes")%>
   		</td>
          </tr>
    
        </table>
      </td>
    </tr>

<%	
}
%>  
  </table>
</form>
<%@include file = "../emxUICommonEndOfPageInclude.inc" %>
