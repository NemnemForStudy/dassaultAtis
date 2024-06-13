<%--  ECMCreateFormValidation.jsp

	Copyright (c) 1992-2020 Dassault Systemes.
	ECMCreateFormValidation.jsp which is validation jsp for all create forms in ECM.
--%>

<%@include file = "ECMDesignTopInclude.inc"%>

<%
			out.clear();
			String strLanguage = request.getHeader("Accept-Language");
			String languageStr   			= context.getSession().getLanguage();
		    String companyName 	 			="";
		    String companyId 	 			="";
		    String sPersonBussinessUnitId   		= "";
		    String sPersonBussinessUnitName 		= "";
		    String strCOName = "";
		    String strCODescription = "";
		    String strCRName = "";
		    String strCRDescription = "";
		    
			//Added for IR-875061-3DEXPERIENCER2022x.....START
			boolean bIsCloud = false;
			try{
				if(UINavigatorUtil.isCloud(context)){
					bIsCloud = true;
				}
			}catch(Exception e){
				System.out.println(e);
			}
			//Added for IR-875061-3DEXPERIENCER2022x.....END
			
		    Person person = Person.getPerson(context);
		    Company company 			= person.getCompany(context);
		    companyName 				= company.getName();
		    companyId 					= company.getId();
			DomainObject domObj = DomainObject.newInstance(context, companyId);
			String companyTitle= domObj.getInfo(context,"attribute["+DomainConstants.ATTRIBUTE_TITLE+"]");
		    String strDefRDOName = "";	   
		    String strUser = context.getUser();
		    strDefRDOName = PersonUtil.getDefaultOrganization(context, strUser);
		    companyName=strDefRDOName;
		    if(UIUtil.isNullOrEmpty(strDefRDOName)) {
		    	 DomainObject dCompanyObj = DomainObject.newInstance(context,Company.getHostCompany(context));
		    	 strDefRDOName = dCompanyObj.getInfo(context, DomainConstants.SELECT_NAME);	             
		    	 companyName=strDefRDOName;	
		    }
		   String strDefRDOId = MqlUtil.mqlCommand(context, "temp query bus $1 $2 $3 select $4 dump $5",DomainConstants.TYPE_ORGANIZATION,strDefRDOName,"*","id","|"); 	        
 	        strDefRDOId = strDefRDOId.substring(strDefRDOId.lastIndexOf('|')+1);
 	       companyId=strDefRDOId;
		   companyTitle=DomainObject.newInstance(context, companyId).getInfo(context,"attribute["+DomainConstants.ATTRIBUTE_TITLE+"]");
		   
		    String orgId 				= PersonUtil.getUserCompanyId(context);
		    String loggedInPersonId 			= PersonUtil.getPersonObjectID(context);
		    
		    boolean isChangeAdmin 			= ChangeUtil.hasChangeAdministrationAccess(context);
		    boolean isBusinessUnitEmployee  = false;
		    
		    DomainObject dmObj 				= DomainObject.newInstance(context);
		    
		    
		    if(!UIUtil.isNullOrEmpty(loggedInPersonId))
		    {
		    	dmObj.setId(loggedInPersonId);
		    	sPersonBussinessUnitId 	 = dmObj.getInfo(context, "to["+DomainConstants.RELATIONSHIP_BUSINESS_UNIT_EMPLOYEE+"].from.id");
		    	sPersonBussinessUnitName = dmObj.getInfo(context, "to["+DomainConstants.RELATIONSHIP_BUSINESS_UNIT_EMPLOYEE+"].from.name");
		    }
		    
		    if(!UIUtil.isNullOrEmpty(sPersonBussinessUnitId))
			{
		    	isBusinessUnitEmployee = true;
			}
			String sFunctionality = (String) session.getAttribute("functionality");
			String CustomChooser =  (String) session.getAttribute("CustomChooser");
		    String objectID = "";
		    String sTemplateName = "";
		    String sTemplateOID = "";
		    String sROName = "";
			String sROTitle = "";
		    String sROID = "";
		    String sChangeCoordinator = "";
		    String sChangeCoordinatorOID = "";
		    String sReportedAgainstName = "";
		    String sReportedAgainstOID = "";
		    String sApprovalListName ="";
		    String sApprovalListOID ="";
		    String sReviewListName = "";
		    String sReviewListOID = "";
		    String sDistributionListOID 		= "";
		    String sDistributionListType 		= "";
		    
			//Added for IR-873885-3DEXPERIENCER2022x
		    String sChangeCoordinatorDisplay = "";
		    
			//Additionally for Create CO form for updating fields using Cha ge Template
		    
			String sDescription 				= "";
			String sCategoryOfChange 		= "";
			String sDefaultType 			= "";
			String sDefaultPolicy 			= "";
			String sSeverity 				= "";
			String sDistributionListName	= "";
			String sApproverName 			= "";
		    
		    StringList selectStmts = new StringList();
			selectStmts.addElement("to["+ChangeConstants.RELATIONSHIP_CHANGE_INSTANCE+"].from.name");
			selectStmts.addElement("to["+ChangeConstants.RELATIONSHIP_CHANGE_INSTANCE+"].from.id");
			selectStmts.addElement("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.name");
			selectStmts.addElement("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.id");
			selectStmts.addElement(ChangeConstants.SELECT_ORGANIZATION);
			selectStmts.addElement("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.name");
			selectStmts.addElement("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.id");
			selectStmts.addElement("from["+ChangeConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST+"].to.id");
			
			//Additionally for Create CO form for updating fields using Cha ge Template
			
			String SELECT_DEFAULT_TYPE 			= DomainObject.getAttributeSelect(ChangeConstants.ATTRIBUTE_DEFAULT_TYPE);
			String SELECT_DEFAULT_POLICY 		= DomainObject.getAttributeSelect(ChangeConstants.ATTRIBUTE_DEFAULT_POLICY);
			String SELECT_CATEGORY_OF_CHANGE 	= DomainObject.getAttributeSelect(DomainConstants.ATTRIBUTE_CATEGORY_OF_CHANGE);
			String SELECT_SEVERITY 				= DomainObject.getAttributeSelect(DomainConstants.ATTRIBUTE_SEVERITY);
			String orgTitle 					= "organization.property["+ DomainConstants.ATTRIBUTE_TITLE +"].value";
			
			SelectList selectStmtsTmpl 			= new SelectList();
			selectStmtsTmpl.addElement(DomainConstants.SELECT_NAME);
			selectStmtsTmpl.addElement(DomainConstants.SELECT_DESCRIPTION);
			selectStmtsTmpl.addElement(SELECT_CATEGORY_OF_CHANGE);
			selectStmtsTmpl.addElement(SELECT_SEVERITY);
			selectStmtsTmpl.addElement(SELECT_DEFAULT_TYPE);
			selectStmtsTmpl.addElement(SELECT_DEFAULT_POLICY);
			selectStmtsTmpl.addElement("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.name");
			selectStmtsTmpl.addElement("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.id");
			selectStmtsTmpl.addElement(ChangeConstants.SELECT_ORGANIZATION);
			selectStmtsTmpl.addElement(orgTitle);
			selectStmtsTmpl.addElement("from["+ChangeConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST+"].to.name");
			selectStmtsTmpl.addElement("from["+ChangeConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST+"].to.id");
			selectStmtsTmpl.addElement("from["+ChangeConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST+"].to.type");
			selectStmtsTmpl.addElement("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.name");
			selectStmtsTmpl.addElement("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.id");
			
			if(UIUtil.isNotNullAndNotEmpty(CustomChooser)&&"CustomChooser".equals(CustomChooser))
		    {
				sTemplateOID 				= (String) session.getAttribute("tmplObjectID");
				if((null!=sTemplateOID)&&(sTemplateOID!="")){
					session.removeAttribute("tmplObjectID");
			    	dmObj.setId(sTemplateOID);
			    	Map resultMap 			= dmObj.getInfo(context, selectStmtsTmpl);
			    	sTemplateName 			= (String) resultMap.get(DomainConstants.SELECT_NAME);
			    	sDescription 			= (String) resultMap.get(DomainConstants.SELECT_DESCRIPTION);
					sSeverity 				= (String) resultMap.get(SELECT_SEVERITY);
					sCategoryOfChange 		= (String) resultMap.get(SELECT_CATEGORY_OF_CHANGE);
					sDefaultType 			= (String) resultMap.get(SELECT_DEFAULT_TYPE);
					sDefaultPolicy 			= (String) resultMap.get(SELECT_DEFAULT_POLICY);
					if(UIUtil.isNullOrEmpty(sDefaultType)){
						sDefaultType = ChangeConstants.TYPE_CHANGE_ORDER;
					}
					//Getting Responsible Organization
					sROName 				= (String) resultMap.get(ChangeConstants.SELECT_ORGANIZATION);
					sROTitle				= (String) resultMap.get(orgTitle);
					sROID 					= (String) ChangeUtil.getRtoIdFromName(context,sROName);
					
					//Getting Relationship Change Coordinator
					sChangeCoordinator 		= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.name");
					sChangeCoordinatorOID 	= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.id");
					
					if(UIUtil.isNotNullAndNotEmpty(sChangeCoordinator)){
						//Modified for IR-873885-3DEXPERIENCER2022x.....START
						//sChangeCoordinator 		= PersonUtil.getFullName(context, sChangeCoordinator);
						sChangeCoordinatorDisplay	= PersonUtil.getFullName(context, sChangeCoordinator);
						//Modified for IR-873885-3DEXPERIENCER2022x.....END
					}											
					//Getting Reported Against
					sReportedAgainstName    = (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.name");
					sReportedAgainstOID    	= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.id");
					
					//Getting DistributionList from Change Template
					sDistributionListName 	= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST+"].to.name");
					sDistributionListOID 	= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST+"].to.id");
					sDistributionListType   = (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST+"].to.type");
					
					//Getting ApproverList Name
					sApprovalListName 		= MqlUtil
												.mqlCommand(
												context,
												"print bus $1 select $2 dump $3",
												sTemplateOID,
												"relationship["
												+ DomainConstants.RELATIONSHIP_OBJECT_ROUTE
												+ "|attribute["
												+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE
												+ "]=='Approval' && to.latest==true && to.current=='Active'].to.name","|");
											
					
					
					//Getting ApproverList OID
					sApprovalListOID 		= MqlUtil
												.mqlCommand(
												context,
												"print bus $1 select $2 dump $3",
												sTemplateOID,
												"relationship["
												+ DomainConstants.RELATIONSHIP_OBJECT_ROUTE
												+ "|attribute["
												+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE
												+ "]=='Approval' && to.latest==true && to.current=='Active'].to.id","|");
					
	
					//Getting ReviewerList Name
					sReviewListName 		= MqlUtil
												.mqlCommand(
												context,
												"print bus $1 select $2 dump $3",
												sTemplateOID,
												"relationship["
												+ DomainConstants.RELATIONSHIP_OBJECT_ROUTE
												+ "|attribute["
												+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE
												+ "]=='Review' && to.latest==true && to.current=='Active'].to.name","|");
					
					
					
					//Getting ReviewerList OID
					sReviewListOID 			= MqlUtil
												.mqlCommand(
												context,
												"print bus $1 select $2 dump $3",
												sTemplateOID,
												"relationship["
												+ DomainConstants.RELATIONSHIP_OBJECT_ROUTE
												+ "|attribute["
												+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE
												+ "]=='Review' && to.latest==true && to.current=='Active'].to.id","|");
					
					if(sDistributionListName==null)
					{
						sDistributionListName	="";
					}
					if(sDistributionListOID==null)
					{
						sDistributionListOID	="";
					}
					if(sDistributionListType==null)
					{
						sDistributionListType	="";
					}					
					if(sChangeCoordinator==null)
					{
						sChangeCoordinator		="";
					}
					//Added for IR-873885-3DEXPERIENCER2022x.....START
					if(sChangeCoordinatorDisplay==null)
					{
						sChangeCoordinatorDisplay ="";
					}
					//Added for IR-873885-3DEXPERIENCER2022x.....END
					if(sReportedAgainstName==null)
					{
						sReportedAgainstName	="";
					}
				}
		    }
			
		    if("copyCO".equals(sFunctionality) || "copyCR".equals(sFunctionality))
		    {
		    	objectID 				= (String) session.getAttribute("copyObjectId");
		    	dmObj.setId(objectID);
		    	Map resultMap 			= dmObj.getInfo(context, selectStmts);
		    	
		    	sTemplateName 			= (String) resultMap.get("to["+ChangeConstants.RELATIONSHIP_CHANGE_INSTANCE+"].from.name");
		    	sTemplateOID 			= (String) resultMap.get("to["+ChangeConstants.RELATIONSHIP_CHANGE_INSTANCE+"].from.id");
		    	
		    	sROName 				= (String) resultMap.get(ChangeConstants.SELECT_ORGANIZATION);
			sROID 					= (String) ChangeUtil.getRtoIdFromName(context,sROName);
		    	
		    	sChangeCoordinator 		= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.name");
		    	sChangeCoordinatorOID 	= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.id");
		    	
		    	sReportedAgainstName    = (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.name");
		    	sReportedAgainstOID    	= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.id");
		    	
		    	sApprovalListName = MqlUtil.mqlCommand(	context,
		    											"print bus $1 select $2 dump $3",
		    											objectID,
		    											"relationship["
		    											+ DomainConstants.RELATIONSHIP_OBJECT_ROUTE
		    											+ "|attribute["
		    											+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE
		    											+ "]=='Approval'].to.name","|");
		    	
		    	sApprovalListOID = MqlUtil.mqlCommand(context,
		    					"print bus $1 select $2 dump $3",
		    							objectID,
		    							"relationship["
		    							+ DomainConstants.RELATIONSHIP_OBJECT_ROUTE
		    							+ "|attribute["
		    							+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE
		    							+ "]=='Approval'].to.id","|");
		    	sReviewListName = MqlUtil
		    			.mqlCommand(
		    					context,
		    					"print bus $1 select $2 dump $3",
		    							objectID,
		    							"relationship["
		    							+ DomainConstants.RELATIONSHIP_OBJECT_ROUTE
		    							+ "|attribute["
		    							+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE
		    							+ "]=='Review'].to.name","|");
		    	
		    	sReviewListOID = MqlUtil
		    			.mqlCommand(
		    					context,
		    					"print bus $1 select $2 dump $3",
		    							objectID,
		    							"relationship["
		    							+ DomainConstants.RELATIONSHIP_OBJECT_ROUTE
		    							+ "|attribute["
		    							+ DomainConstants.ATTRIBUTE_ROUTE_BASE_PURPOSE
		    							+ "]=='Review'].to.id","|");
		    	
		    	sDistributionListOID 		= (String) resultMap.get("from["+ChangeConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST+"].to.id");
		    	
		    	if(UIUtil.isNullOrEmpty(sTemplateName))
		    	{
		    		sTemplateName	="";
		    	}
		    	if(UIUtil.isNullOrEmpty(sChangeCoordinator))
		    	{
		    		sChangeCoordinator	="";
		    	}
		    	if(UIUtil.isNullOrEmpty(sReportedAgainstName))
		    	{
		    		sReportedAgainstName	="";
		    	}	
		    	if(UIUtil.isNullOrEmpty(sApprovalListName))
		    	{
		    		sApprovalListName	="";
		    	}	
		    	if(UIUtil.isNullOrEmpty(sReviewListName))
		    	{
		    		sReviewListName	="";
		    	}
		    }
		    if("addChangeActionUnderChangeOrder".equals(sFunctionality)){
		    	objectID 				= (String) session.getAttribute("ObjectId");
		    	dmObj.setId(objectID);
		    	selectStmts.clear();
		    	selectStmts.addElement(DomainConstants.SELECT_NAME);
		    	selectStmts.addElement(DomainConstants.SELECT_DESCRIPTION);
		    	Map resultMap = dmObj.getInfo(context, selectStmts);
		    	strCOName = (String) resultMap.get(DomainConstants.SELECT_NAME);
		    	strCODescription = (String) resultMap.get(DomainConstants.SELECT_DESCRIPTION);
		    }
			if("addChangeActionUnderChangeRequest".equals(sFunctionality)){
		    	objectID 				= (String) session.getAttribute("ObjectId");
		    	dmObj.setId(objectID);
		    	selectStmts.clear();
		    	selectStmts.addElement(DomainConstants.SELECT_NAME);
		    	selectStmts.addElement(DomainConstants.SELECT_DESCRIPTION);
		    	Map resultMap = dmObj.getInfo(context, selectStmts);
		    	strCRName = (String) resultMap.get(DomainConstants.SELECT_NAME);
		    	strCRDescription = (String) resultMap.get(DomainConstants.SELECT_DESCRIPTION);
		    }
		    boolean check = true;
		    if(UIUtil.isNullOrEmpty(sFunctionality))
		    {
		    	check = false;
		    } 
%>
<emxUtil:localize id="i18nIdn" bundle="emxEnterpriseChangeMgtStringResource" locale='<%= XSSUtil.encodeForHTML(context, strLanguage) %>' />


/******************************************************************************/
/* function clearAll() - clear all the field on Create Change Page        */
/*                                                                            */
/******************************************************************************/
function clearAll()
{
	
	if(document.forms['emxCreateForm'].elements["ChangeTemplateDisplay"]){
		var sChangeTemplateDisplay  		= document.forms['emxCreateForm'].elements["ChangeTemplateDisplay"].value;
		if(sChangeTemplateDisplay=="")
		{
			basicClear("ResponsibleOrganization");
			//basicClear("ReviewersList");
			basicClear("ChangeCoordinator");
			basicClear("ApprovalList");
			basicClear("DistributionList");
			basicClear("ReportedAgainst");
			var url = document.location.href ;
			if(url.search("tmplId=")!=-1){
				var urlStart = url.substring(0,url.search("tmplId=")-1);
				var urlEnd = url.substring(url.search("tmplId=")+7,url.length);
				urlEnd = urlEnd.substring(urlEnd.indexOf("&"),urlEnd.length);
				if(urlEnd.search("&")==-1)urlEnd="";
				document.location.href = urlStart+urlEnd;
			}else{
				//document.location.href = document.location.href;
			}
		}
		var changeTemplateOID = document.forms['emxCreateForm'].elements["ChangeTemplateOID"].value;
		if(changeTemplateOID!=""){
			<%
			final String USER_FULL_NAME = "UserFullName";
			final String DisplayValue = "DisplayValue";
			String strSelectTitle = "attribute[" + DomainConstants.ATTRIBUTE_TITLE  + "]";
			StringList objSelects = new StringList();
			objSelects.add(DomainConstants.SELECT_ID);
			objSelects.add(DomainConstants.SELECT_NAME);
			objSelects.add(DomainConstants.SELECT_TYPE);
			objSelects.add(strSelectTitle);
			//Get existing Member List followers
			MapList mlMemberList = dmObj.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST,
					  DomainConstants.TYPE_MEMBER_LIST,
					  objSelects,
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			//Get existing user group followers
			MapList mlGroupFollower = dmObj.getRelatedObjects(context,
					  PropertyUtil.getSchemaProperty(context,"relationship_ChangeFollower"),
					  DomainConstants.TYPE_GROUP,
					  objSelects,
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			
			//Get existing user followers
			MapList mlUserFollower = dmObj.getRelatedObjects(context,
					  PropertyUtil.getSchemaProperty(context,"relationship_ChangeFollower"),
					  DomainConstants.TYPE_PERSON,
					  objSelects,
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			MapList mlInformedUsers = new MapList();
			String informedUsers = DomainObject.EMPTY_STRING;
			String informedMemberLists = DomainObject.EMPTY_STRING;
			String informedUserGroups = DomainObject.EMPTY_STRING;
			if(!mlMemberList.isEmpty()){
				Iterator itrMemberList = mlMemberList.iterator();
				while(itrMemberList.hasNext()){
					
					Map memberList = (Map)itrMemberList.next();
					String memberListId = (String) memberList.get(DomainConstants.SELECT_ID);
					String memberListName = (String) memberList.get(DomainConstants.SELECT_NAME);
					String memberListType = (String) memberList.get(DomainConstants.SELECT_TYPE);
					Map<String, String> mpMemberList = new HashMap<String, String>();
					mpMemberList.put(DomainConstants.SELECT_ID, memberListId);
					mpMemberList.put(DomainConstants.SELECT_NAME, memberListName);
					mpMemberList.put(DisplayValue, memberListName);
					mpMemberList.put(DomainConstants.SELECT_TYPE, memberListType);
					mlInformedUsers.add(mpMemberList);
					informedMemberLists = informedMemberLists.concat(memberListId+",");
				}
			}
			if(!mlGroupFollower.isEmpty()){
				Iterator itrUserGroup = mlGroupFollower.iterator();
				while(itrUserGroup.hasNext()){
					Map userGroup = (Map)itrUserGroup.next();
					String userGroupId = (String) userGroup.get(DomainConstants.SELECT_ID);
					String userGroupName = (String) userGroup.get(DomainConstants.SELECT_NAME);
					String userGroupType = (String) userGroup.get(DomainConstants.SELECT_TYPE);
					String userGroupTitle = (String) userGroup.get(strSelectTitle);
					Map<String, String> mpUserGroup = new HashMap<String, String>();
					mpUserGroup.put(DomainConstants.SELECT_ID, userGroupId);
					mpUserGroup.put(DomainConstants.SELECT_NAME, userGroupName);
					mpUserGroup.put(DisplayValue, userGroupTitle);
					mpUserGroup.put(DomainConstants.SELECT_TYPE, userGroupType);
					mlInformedUsers.add(mpUserGroup);
					informedUserGroups = informedUserGroups.concat(userGroupId+",");
				}
			}
			if(!mlUserFollower.isEmpty()){
				Iterator itrUserFollower = mlUserFollower.iterator();
				while(itrUserFollower.hasNext()){
					Map userFollower = (Map)itrUserFollower.next();
					String userFollowerId = (String) userFollower.get(DomainConstants.SELECT_ID);
					String userFollowerName = (String) userFollower.get(DomainConstants.SELECT_NAME);
					String userFollowerType = (String) userFollower.get(DomainConstants.SELECT_TYPE);
					String userFollowerTitle = (String) userFollower.get(strSelectTitle);
					Map<String, String> mpUserFollower = new HashMap<String, String>();
					mpUserFollower.put(DomainConstants.SELECT_ID, userFollowerId);
					mpUserFollower.put(DomainConstants.SELECT_NAME, userFollowerName);
					mpUserFollower.put(DomainConstants.ATTRIBUTE_TITLE, userFollowerTitle);
					mpUserFollower.put(DomainConstants.SELECT_TYPE, userFollowerType);
					mpUserFollower.put(DisplayValue, PersonUtil.getFullName(context, userFollowerName));
					mlInformedUsers.add(mpUserFollower);
					informedUsers = informedUsers.concat(userFollowerId+",");
				}
			}
			if(mlInformedUsers.size() > 0){
				%>
				var targetLocation = getTopWindow().openerFindFrame(getTopWindow(), 'slideInFrame');
	            if(!targetLocation || targetLocation.document.title == "blank Document")
	               targetLocation = getTopWindow().openerFindFrame(getTopWindow(), 'ECMCRProperties');
	            if(!targetLocation || getTopWindow().location.href.indexOf("targetLocation=popup") > -1){
	               targetLocation = getTopWindow().getWindowOpener();
	            }
	            var isInformedUsersWithGroupFieldModified = targetLocation.document.getElementById("IsInformedUsersWithGroupFieldModified");
				isInformedUsersWithGroupFieldModified.value = "true";
				
				var displayCombo = targetLocation.document.getElementsByName("InformedUsersWithGroup")[0];
				
            	<%
				for(int i = 0 ; i < mlInformedUsers.size() ; i++){
					Map mpFollower = (Map) mlInformedUsers.get(i);
					String strFollowerId = (String) mpFollower.get(DomainConstants.SELECT_ID);
					String strDisplayValue = (String) mpFollower.get(DisplayValue);
					%>
					
					var option = targetLocation.document.createElement("option");
					option.value = "<%=XSSUtil.encodeForJavaScript(context,strFollowerId)%>";
					option.text = "<%=XSSUtil.encodeForJavaScript(context,strDisplayValue)%>";
					displayCombo.add(option);
					
					<%
				}
            	
            	if(informedUsers!=null && !informedUsers.isEmpty()){
            		%>
    				
    				var userFollowersHidden = targetLocation.document.getElementById("UserFollowersHidden");
    				var userFollowersHiddenValue = userFollowersHidden.value;
					userFollowersHiddenValue += ",";
					userFollowersHiddenValue += "<%=XSSUtil.encodeForJavaScript(context, informedUsers)%>";									
					userFollowersHidden.value = userFollowersHiddenValue;
    				
                	<%
            	}
            	if(informedUserGroups!=null && !informedUserGroups.isEmpty()){
            		%>
    				
    				var userGroupFollowerHidden = targetLocation.document.getElementById("GroupFollowersHidden");
    				var userGroupFollowerHiddenValue = userGroupFollowerHidden.value;
    				userGroupFollowerHiddenValue += ",";
    				userGroupFollowerHiddenValue += "<%=XSSUtil.encodeForJavaScript(context, informedUserGroups)%>";									
    				userGroupFollowerHidden.value = userGroupFollowerHiddenValue;
    				
                	<%
            	}
            	if(informedMemberLists!=null && !informedMemberLists.isEmpty()){
            		%>
    				
    				var memberListFollowersHidden = targetLocation.document.getElementById("MemberListFollowersHidden");
    				var memberListFollowersHiddenValue = memberListFollowersHidden.value;
					memberListFollowersHiddenValue += ",";
					memberListFollowersHiddenValue += "<%=XSSUtil.encodeForJavaScript(context, informedMemberLists)%>";									
					memberListFollowersHidden.value = memberListFollowersHiddenValue;
    				
                	<%
            	}
			}
			%>
		}
	}	
}

/******************************************************************************/
/* function preProcessInCloneCO() - Preprocess Script        */
/*                                                                            */
/******************************************************************************/
function setCOCloneFields()
{	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeTemplate2"].value				=	"<%=sTemplateName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeTemplate2OID"].value				=	"<%=XSSUtil.encodeForJavaScript(context, sTemplateOID)%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeTemplate2Display"].value			=	"<%=sTemplateName%>";
	document.forms['emxCreateForm'].elements["ChangeTemplate2Display"].disabled		=	true;
	document.forms['emxCreateForm'].elements["ChangeTemplate2"].disabled			=	true;
	document.forms['emxCreateForm'].elements["btnChangeTemplate2"].disabled			=	true;
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganization"].value		=	"<%=sROName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganizationOID"].value	=	"<%=sROID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganizationDisplay"].value=	"<%=sROName%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeCoordinator"].value				=	"<%=sChangeCoordinator%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeCoordinatorOID"].value			=	"<%=sChangeCoordinatorOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeCoordinatorDisplay"].value		=	"<%=sChangeCoordinator%>";
	/*
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersList"].value					=	"<%=sReviewListName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersListOID"].value				=	"<%=sReviewListOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersListDisplay"].value			=	"<%=sReviewListName%>";
	*/
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ApprovalList"].value					=	"<%=sApprovalListName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ApprovalListOID"].value				=	"<%=sApprovalListOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ApprovalListDisplay"].value			=	"<%=sApprovalListName%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainst"].value				=	"<%=sReportedAgainstName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainstOID"].value			=	"<%=sReportedAgainstOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainstDisplay"].value		=	"<%=sReportedAgainstName%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["DistributionListOID"].value			=	"<%=sDistributionListOID%>";
}

function preProcessInCloneCO() {
	<!-- XSSOK -->
	if(<%=check%>){
		/*setTimeout(function() {DisableReviewersListAndChangeCoordinator(true)}, 300);*/
		setCOCloneFields();
	}	
}
function setCreateCOFieldsUsingCT()
{	
	
	if(document.forms['emxCreateForm'].elements["ChangeTemplate"]){
		<!-- XSSOK -->
		document.forms['emxCreateForm'].elements["ChangeTemplate"].value				=	"<%=sTemplateName%>";
		<!-- XSSOK -->
		document.forms['emxCreateForm'].elements["ChangeTemplateOID"].value				=	"<%=XSSUtil.encodeForJavaScript(context, sTemplateOID)%>";
		<!-- XSSOK -->
		document.forms['emxCreateForm'].elements["ChangeTemplateDisplay"].value			=	"<%=sTemplateName%>";
		<!-- XSSOK -->
	}
	
	
	
	if("<%=sDefaultType%>"!=""){
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["TypeActualDisplay"].value						=	"<%= UINavigatorUtil.getAdminI18NString("Type", sDefaultType, context.getSession().getLanguage()) %>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["TypeActual"].value						=	"<%=sDefaultType%>";
	}
	
	if("<%=sDefaultPolicy%>"!="" && document.forms['emxCreateForm'].elements["Policy"])
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["Policy"].value						=	"<%=sDefaultPolicy%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["Description"].value					=	"<%=XSSUtil.encodeForJavaScript(context, sDescription)%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganization"].value		=	"<%=sROName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganizationOID"].value	=	"<%=sROID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganizationDisplay"].value=	"<%=sROTitle%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainst"].value				=	"<%=sReportedAgainstName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainstOID"].value			=	"<%=sReportedAgainstOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainstDisplay"].value		=	"<%=sReportedAgainstName%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeCoordinator"].value				=	"<%=sChangeCoordinator%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeCoordinatorOID"].value			=	"<%=sChangeCoordinatorOID%>";
	<!-- XSSOK -->
	<!-- Modified for IR-873885-3DEXPERIENCER2022x.....START -->
	<!-- document.forms['emxCreateForm'].elements["ChangeCoordinatorDisplay"].value		=	"<%=sChangeCoordinator%>"; -->
	document.forms['emxCreateForm'].elements["ChangeCoordinatorDisplay"].value		=	"<%=sChangeCoordinatorDisplay%>";
	<!-- Modified for IR-873885-3DEXPERIENCER2022x.....END -->
	
	<!-- XSSOK -->
	if("<%=sCategoryOfChange%>"!="")
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["CategoryOfChange"].value				=	"<%=sCategoryOfChange%>";
	<!-- XSSOK -->
	if("<%=sSeverity%>"!="")
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["Severity"].value						=	"<%=sSeverity%>";
	
	/*
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersList"].value					=	"<%=sReviewListName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersListOID"].value				=	"<%=sReviewListOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersListDisplay"].value			=	"<%=sReviewListName%>";
	*/
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ApprovalList"].value					=	"<%=sApprovalListName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ApprovalListOID"].value				=	"<%=sApprovalListOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ApprovalListDisplay"].value			=	"<%=sApprovalListName%>";
	
    
    //Updating as field changed.............START
	/*
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["DistributionList"].value				=	"<%=sDistributionListName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["DistributionListOID"].value			=	"<%=sDistributionListOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["DistributionListDisplay"].value		=	"<%=sDistributionListName%>";
	*/
	if("<%=sDistributionListOID%>"!="" && document.forms['emxCreateForm'].elements["InformedUsers"] ){
		const newOption = document.createElement('option');
		const optionText = document.createTextNode("<%=sDistributionListName%>");
		newOption.appendChild(optionText);
		newOption.setAttribute('value',"<%=sDistributionListOID%>");
		document.forms['emxCreateForm'].elements["InformedUsers"].appendChild(newOption);
		document.forms['emxCreateForm'].elements["InformedUsersHidden"].value			=	"<%=sDistributionListOID%>";
		document.forms['emxCreateForm'].elements["IsInformedUsersFieldModified"].value			=	"true";
		document.forms['emxCreateForm'].elements["InformedUsersHiddenType"].value			=	"<%=sDistributionListType%>";
	}
	//Updating as field changed.............END	
	
}
function preProcessInCloneCR()
{	
	document.forms['emxCreateForm'].elements["TypeActualDisplay"].disabled 			= true
	document.forms['emxCreateForm'].elements["btnTypeActual"].disabled 				= true
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganization"].value		=	"<%=sROName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganizationOID"].value	=	"<%=sROID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganizationDisplay"].value=	"<%=sROName%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeCoordinator"].value				=	"<%=sChangeCoordinator%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeCoordinatorOID"].value			=	"<%=sChangeCoordinatorOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ChangeCoordinatorDisplay"].value		=	"<%=sChangeCoordinator%>";
	/*
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersList"].value					=	"<%=sReviewListName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersListOID"].value				=	"<%=sReviewListOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReviewersListDisplay"].value			=	"<%=sReviewListName%>";
	*/
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainst"].value				=	"<%=sReportedAgainstName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainstOID"].value			=	"<%=sReportedAgainstOID%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ReportedAgainstDisplay"].value		=	"<%=sReportedAgainstName%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["DistributionListOID"].value			=	"<%=sDistributionListOID%>";
}

/******************************************************************************/
/* function setRO() - set the RO on Create Change & Change Tempate Page       */
/*                                                                            */
/******************************************************************************/
function preProcessInCreateCO() {	
	setRO();
	setCreateCOFieldsUsingCT();
	/*setTimeout(function() {DisableReviewersListAndChangeCoordinator()}, 300);*/
	<%
	if(UIUtil.isNullOrEmpty(sROName)||UIUtil.isNullOrEmpty(sROID)){
	%>
		setRO();
	<%	
	}
	%>
}



function setRO()
{	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganization"].value		= 	"<%=companyName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganizationOID"].value	= 	"<%=companyId%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["ResponsibleOrganizationDisplay"].value= 	"<%=companyTitle%>";		
}

function setOwningOrg()
{
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["OwningOrganization"].value			=	"<%=companyName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["OwningOrganizationOID"].value			=	"<%=companyId%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["OwningOrganizationDisplay"].value		=	"<%=companyTitle%>";
}

function setPersonOrg()
{
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["OwningOrganization"].value			=	"<%=sPersonBussinessUnitName%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["OwningOrganizationOID"].value			=	"<%=sPersonBussinessUnitId%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["OwningOrganizationDisplay"].value		=	"<%=sPersonBussinessUnitName%>";
}

function setCreateFormROField() {
	<!-- XSSOK -->
	if("<%=XSSUtil.encodeForJavaScript(context, sTemplateOID)%>"!=""){
		setCreateCOFieldsUsingCT();
		setRO();
	}else{
		<!-- XSSOK -->
		document.forms['emxCreateForm'].elements["ResponsibleOrganization"].value		=	"<%=companyName%>";
		<!-- XSSOK -->
		document.forms['emxCreateForm'].elements["ResponsibleOrganizationOID"].value		=	"<%=companyId%>";
		<!-- XSSOK -->
		document.forms['emxCreateForm'].elements["ResponsibleOrganizationDisplay"].value	=	"<%=companyName%>";
	}
}

function enableOwningOrgButton()
{
	document.forms['emxCreateForm'].elements["OwningOrganizationDisplay"].disabled	=	false;
	document.forms['emxCreateForm'].elements["btnOwningOrganization"].disabled		=	false;
}

function disableOwningOrgButton()
{
	document.forms['emxCreateForm'].elements["OwningOrganizationDisplay"].disabled	=	true;
	document.forms['emxCreateForm'].elements["btnOwningOrganization"].disabled		=	true;
	document.forms['emxCreateForm'].elements["OwningOrganization"].disabled			=	true;
}

function setOwningOrgEmpty()
{
	document.forms['emxCreateForm'].elements["OwningOrganization"].value			=	"";
	document.forms['emxCreateForm'].elements["OwningOrganizationOID"].value			=	"";
	document.forms['emxCreateForm'].elements["OwningOrganizationDisplay"].value		=	"";
}
 

/******************************************************************************/
/* function setDefaultPolicy() - set Default Change Policy on Create Change Template page*/
/*                                                                            */
/******************************************************************************/
function setDefaultPolicy()
{
	emxFormReloadField("DefaultCOPolicy");
}

/******************************************************************************/
/* function setPolicy() - set Default Change Policy on Create Change Template page*/
/*                                                                            */
/******************************************************************************/
function setPolicy()
{
	emxFormReloadField("Policy");
}

/******************************************************************************/
/* function setOwningOrganization() - set Owning Org on Create Change Template page*/
/*                                                                            */
/******************************************************************************/
function setOwningOrganization()
{	
		setRO();		
		<!-- XSSOK -->
		if(<%=isChangeAdmin%>)
		{		
			<!-- XSSOK -->
			if(<%=isBusinessUnitEmployee%>)
			{	
				// setPersonOrg();
				setOwningOrg()
			}
			else
			{
				setOwningOrg();
			}
		}
		else
		{
			disableOwningOrgButton();
			
		}
}

function preProcessInCreateTemplate() {
	setOwningOrganization();
	/*setTimeout(function() {DisableReviewersListAndChangeCoordinatorFromCT()}, 300);*/
}

/******************************************************************************/
/* function disableOrganizationField() - disable Owning Org on Create Change Template page upon selection of Availability as Personal*/
/*                                                                            */
/******************************************************************************/
function disableOrganizationField(elem)
{
	var availability = elem.value;
	if(availability == "Enterprise") 
	{
		<!-- XSSOK -->
		if(<%=isBusinessUnitEmployee%>)
		{	
			enableOwningOrgButton();
			setPersonOrg();
		}
		else{
			enableOwningOrgButton();
			setOwningOrg();
		}
	}
	else
	{
		setOwningOrgEmpty();
		disableOwningOrgButton();
	}
	
}

/******************************************************************************/
/* function disableOrganizationField() - enable Owning Org on Create Change Template page upon selection of Availability as Organization*/
/*                                                                            */
/******************************************************************************/
function clearOrganizationField(elem)
{	
	var availability = elem.value;
	if(availability == "Enterprise")
	{
		setOwningOrgEmpty();
		enableOwningOrgButton();
	}
}

 
/******************************************************************************/
/* function enableLists() - enable ReviewerList & ApprovalList on Create Change Page        */
/*                                                                            */
/******************************************************************************/
function enableListFields()
{
		/*
			document.forms['emxCreateForm'].elements["ReviewersListDisplay"].disabled     =      false;
            document.forms['emxCreateForm'].elements["ReviewersList"].disabled            =     false;
            document.forms['emxCreateForm'].elements["btnReviewersList"].disabled		=	false;
        */
		
            if(document.forms['emxCreateForm'].elements["ApprovalListDisplay"]){
            	document.forms['emxCreateForm'].elements["ApprovalListDisplay"].disabled      =      false;
            	document.forms['emxCreateForm'].elements["ApprovalList"].disabled             =      false;
            	document.forms['emxCreateForm'].elements["btnApprovalList"].disabled		=	false;
            }
            
            document.forms['emxCreateForm'].elements["ChangeCoordinatorDisplay"].disabled      =      false;
            document.forms['emxCreateForm'].elements["ChangeCoordinator"].disabled             =      false;
            document.forms['emxCreateForm'].elements["btnChangeCoordinator"].disabled		=	false;
}

/******************************************************************************/
/* function disableLists() - disable ReviewerList & ApprovalList on Create Change Page        */
/*                                                                            */
/******************************************************************************/
function disableListFields()
{
	/*
			document.forms['emxCreateForm'].elements["ReviewersListDisplay"].disabled     =      true;
            document.forms['emxCreateForm'].elements["ReviewersList"].disabled            =      true;
            document.forms['emxCreateForm'].elements["btnReviewersList"].disabled			=	   true;
    */
	
            if(document.forms['emxCreateForm'].elements["ApprovalListDisplay"])
            {
            document.forms['emxCreateForm'].elements["ApprovalListDisplay"].disabled      =      true;
            document.forms['emxCreateForm'].elements["ApprovalList"].disabled             =      true;
            document.forms['emxCreateForm'].elements["btnApprovalList"].disabled			 =	    true;
            }
            
            document.forms['emxCreateForm'].elements["ChangeCoordinatorDisplay"].disabled      =      true;
            document.forms['emxCreateForm'].elements["ChangeCoordinator"].disabled             =      true;
            document.forms['emxCreateForm'].elements["btnChangeCoordinator"].disabled		=	true;
}

/******************************************************************************/
/* function clearAllRO() - Clears the RO field on Create Change Page           */
/*                                                                            */
/******************************************************************************/
function clearAllRO()
{
	var sResponsibleOrganization              = document.forms['emxCreateForm'].elements["ResponsibleOrganization"].value;
    
    if(sResponsibleOrganization=="")
    {
          //basicClear("ReviewersList");
          basicClear("ChangeCoordinator");
          basicClear("ApprovalList");
          basicClear("DistributionList");
          basicClear("ReportedAgainst");
          disableListFields();
          
    } else {
    
        //  enableListFields();
    
    }
    
}
/******************************************************************************/
/* function clearTemplateRO() - Clears the ApproverList, ReviewerList & Change Coordinator on Create Template page           */
/*                                                                            */
/******************************************************************************/
function clearTemplateRO()
{
	var sResponsibleOrganization              = document.forms['emxCreateForm'].elements["ResponsibleOrganization"].value;
      if(sResponsibleOrganization==""){
      		basicClear("ChangeCoordinator");
      		 //basicClear("ReviewersList");
      		 basicClear("ApprovalList");
      		 basicClear("DistributionList");
      		 basicClear("ReportedAgainst");
      		 disableListFields();
      }
      else{
      	//	enableListFields();
      }
}

function DisableReviewersListAndChangeCoordinatorFromCT(){
	var policy = document.emxCreateForm.DefaultCOPolicy.value;
	<!-- XSSOK -->
	if(policy=="<%=ChangeConstants.POLICY_FASTTRACK_CHANGE %>"){
		clearAndDisableReviewersList();
		clearAndDisableCoordinator();
	}else{
		DisableEnableField(document.emxCreateForm.ReviewersListDisplay,false);
		DisableEnableField(document.emxCreateForm.btnReviewersList,false);
		DisableEnableField(document.emxCreateForm.ChangeCoordinatorDisplay,false);
		DisableEnableField(document.emxCreateForm.btnChangeCoordinator,false);
	}
}

function DisableReviewersListAndChangeCoordinator(isClone){
	var policy = "";
	if(isClone == true){
		policy = document.emxCreateForm.Policy2.value;
	}
	else{
		policy = document.emxCreateForm.Policy.value;
	}
	<!-- XSSOK -->
	if(policy=="<%=ChangeConstants.POLICY_FASTTRACK_CHANGE %>"){
		clearAndDisableReviewersList();
		clearAndDisableCoordinator();
	}else{
		DisableEnableField(document.emxCreateForm.ReviewersListDisplay,false);
		DisableEnableField(document.emxCreateForm.btnReviewersList,false);
		DisableEnableField(document.emxCreateForm.ChangeCoordinatorDisplay,false);
		DisableEnableField(document.emxCreateForm.btnChangeCoordinator,false);
	}
}

function clearAndDisableReviewersList(){
		DisableEnableField(document.emxCreateForm.ReviewersListDisplay,true);
		DisableEnableField(document.emxCreateForm.btnReviewersList,true);
		document.emxCreateForm.ReviewersListDisplay.value = "";
		document.emxCreateForm.ReviewersList.value = "";
		document.emxCreateForm.ReviewersListOID.value = "";
}
function clearAndDisableCoordinator(){
		DisableEnableField(document.emxCreateForm.ChangeCoordinatorDisplay,true);
		DisableEnableField(document.emxCreateForm.btnChangeCoordinator,true);
		document.emxCreateForm.ChangeCoordinatorDisplay.value = "";
		document.emxCreateForm.ChangeCoordinator.value = "";
		document.emxCreateForm.ChangeCoordinatorOID.value = "";
}

function DisableEnableField(fieldName,operation)
{
	fieldName.disabled = operation;
}

 /******************************************************************************/
/* function pastEstDateCheck() - Validates Estimated dates           
/*                                                                            
/******************************************************************************/
  function pastEstDateCheck()
  {
  	var strStartDate = "";
	var strCompletionDate = "";
	var strEstStartDate = "";
	var strEstCompletionDate = "";
	var fieldEstStartDate = '';
	var fieldEstCompletionDate = '';
	var fieldEstStartMod ='';
	var fieldEstCompletionMod = '';
	var fieldEstStartDay = '';
	var fieldEstCompletionDay = '';

	var createFormObj = document.forms['emxCreateForm'];
	if(createFormObj != "" && createFormObj != undefined){
		if(createFormObj.elements["Estimated Start Date"] != "" 
			&& createFormObj.elements["Estimated Start Date"] != undefined){
			strStartDate = createFormObj.elements["Estimated Start Date"].value; 
		}
		
		if(createFormObj.elements["Estimated Completion Date"] != "" 
			&& createFormObj.elements["Estimated Completion Date"] != undefined){
			strCompletionDate = createFormObj.elements["Estimated Completion Date"].value; 
		}

		if(createFormObj.elements["Estimated Start Date_msvalue"] != "" 
			&& createFormObj.elements["Estimated Start Date_msvalue"] != undefined){
			strEstStartDate = createFormObj.elements["Estimated Start Date_msvalue"].value; 
		}

		if(createFormObj.elements["Estimated Completion Date_msvalue"] != "" 
			&& createFormObj.elements["Estimated Completion Date_msvalue"] != undefined){
			strEstCompletionDate = createFormObj.elements["Estimated Completion Date_msvalue"].value; 
		}
	}

	if (trimWhitespace(strStartDate) != '') {
		fieldEstStartDate = new Date(new Date(parseInt(strEstStartDate)).toDateString());
  		fieldEstStartDay = fieldEstStartDate.getDate();
  		fieldEstStartMod = Date.parse(fieldEstStartDate);
		}
		
	if (trimWhitespace(strCompletionDate) != '') {
		fieldEstCompletionDate = new Date(new Date(parseInt(strEstCompletionDate)).toDateString());
  		fieldEstCompletionDay = fieldEstCompletionDate.getDate();
  		fieldEstCompletionMod = Date.parse(fieldEstCompletionDate);
		}
	
	var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentDateMod = Date.parse(currentDate);
	
	if(trimWhitespace(strStartDate) != '' && (fieldEstStartMod < currentDateMod) && (fieldEstStartDay!=currentDay)){
    	var errormessage="<emxUtil:i18nScript localize="i18nIdn">EnterpriseChangeMgt.Alert.EstimatedStartDate</emxUtil:i18nScript>";
		alert(errormessage);
    	return false;
    }
	
	if (trimWhitespace(strStartDate) == '' && trimWhitespace(strCompletionDate) != ''){
		var errormessage="<emxUtil:i18nScript localize="i18nIdn">EnterpriseChangeMgt.Alert.DueDateCheckStartDate</emxUtil:i18nScript>";
		alert(errormessage);
		return false;
		}
	
	
	if (trimWhitespace(strCompletionDate) != '' && (fieldEstStartMod > fieldEstCompletionMod)) {
		var errormessage="<emxUtil:i18nScript localize="i18nIdn">EnterpriseChangeMgt.Alert.DueDate</emxUtil:i18nScript>";
		alert(errormessage);
		return false;
		}
	return true;
  }
/******************************************************************************/
/* function checkForDecimal() - Check for decimal values                        
/*                                                                              
/******************************************************************************/
 function checkForDecimal(num)
 {
 	return num%1 ? false : true;
 }

/******************************************************************************/
/* function validateEffortDays() - Validates Effort days as integer             
/*                                                                              
/******************************************************************************/
function validateEffortDays(){
	var ScheduleImpact = trim(this.value);
	if(!isNaN(ScheduleImpact)&&checkForDecimal(ScheduleImpact)){
		return true;
	}
	var fieldName=this.name;
	fieldName=fieldName.split(' ').join('_');
	var key="EnterpriseChangeMgt.Label."+fieldName;
	var url="../enterprisechangemgtapp/ECMUtil.jsp";	
    var queryString = "functionality=validateEffortDaysGetKeyVaule&key=" + encodeURIComponent(key);
    var jsonString = emxUICore.getDataPost(url, queryString);
	var json = JSON.parse(jsonString);
	var keyValue = json.valueofkey;
	alert("<emxUtil:i18nScript localize="i18nIdn">EnterpriseChangeMgt.Alert.IntegerValueAlert</emxUtil:i18nScript> : "+keyValue);
	return false;
}  

/*****************************************************************************************************************************/
/* function validateEstimatedStartDate() - Validates Estimated Start Date which should be greater than today's date
/*                                                                            
/*****************************************************************************************************************************/
function validateEstimatedStartDate() {
	var strStartDate_msvalue = "";
	var strStartDate = "";
	
	var createFormObj = document.forms['emxCreateForm'];
	if(createFormObj != "" && createFormObj != undefined){
		if(createFormObj.elements["EstimatedStartDate_msvalue"] != "" 
			&& createFormObj.elements["EstimatedStartDate_msvalue"] != undefined){
			strStartDate_msvalue = createFormObj.elements["EstimatedStartDate_msvalue"].value; 
		}
		
		if(createFormObj.elements["EstimatedStartDate"] != "" 
			&& createFormObj.elements["EstimatedStartDate"] != undefined){
			strStartDate = createFormObj.elements["EstimatedStartDate"].value; 
		}
	}
	
    var currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    var eDate = new Date(new Date(parseInt(strStartDate_msvalue)).toDateString());
    eDate.setHours(0,0,0,0);
   if(trimWhitespace(strStartDate) != "" && strStartDate != undefined) {
	    if(eDate<currentDate) {
	    	var errormessage="<emxUtil:i18nScript localize="i18nIdn">EnterpriseChangeMgt.Alert.EstimatedStartDate</emxUtil:i18nScript>";
	        alert(errormessage);
	        return false;
	    }
    }
    
    return true;
}  

/*****************************************************************************************************************************/
/* function validateEstimatedCompletionDate() - Validates Estimated Completion date which should be greater than today's date 
/*                                              and greater than or equal to Estimated Start Date (if entered)
/*****************************************************************************************************************************/
function validateEstimatedCompletionDate() {

	var strCompletionDate_msvalue = "";
	var strCompletionDate = "";
	var strStartDate_msvalue = "";
	var strStartDate = "";
	var startDate = '';

	var createFormObj = document.forms['emxCreateForm'];
	if(createFormObj != "" && createFormObj != undefined){
		if(createFormObj.elements["Estimated Completion Date_msvalue"] != "" 
			&& createFormObj.elements["Estimated Completion Date_msvalue"] != undefined){
			strCompletionDate_msvalue = createFormObj.elements["Estimated Completion Date_msvalue"].value; 
		}

		if(createFormObj.elements["Estimated Completion Date"] != "" 
			&& createFormObj.elements["Estimated Completion Date"] != undefined){
			strCompletionDate = createFormObj.elements["Estimated Completion Date"].value; 
		}

		if(createFormObj.elements["EstimatedStartDate_msvalue"] != "" 
			&& createFormObj.elements["EstimatedStartDate_msvalue"] != undefined){
			strStartDate_msvalue = createFormObj.elements["EstimatedStartDate_msvalue"].value; 
		}

		if(createFormObj.elements["EstimatedStartDate"] != "" 
			&& createFormObj.elements["EstimatedStartDate"] != undefined){
			strStartDate = createFormObj.elements["EstimatedStartDate"].value; 
		}
	}

    var currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    var dueDate = new Date(new Date(parseInt(strCompletionDate_msvalue)).toDateString());
    dueDate.setHours(0,0,0,0);

	if (trimWhitespace(strStartDate) != '') {
		startDate = new Date(new Date(parseInt(strStartDate_msvalue)).toDateString());	
		startDate.setHours(0,0,0,0);
	}

   if(trimWhitespace(strCompletionDate) != "" && strCompletionDate != undefined) {
	    if(dueDate<currentDate) {
	    	var errormessage="<emxUtil:i18nScript localize="i18nIdn">EnterpriseChangeMgt.Alert.DueDateGreaterThanCurrent</emxUtil:i18nScript>";
	        alert(errormessage);
	        return false;
	    }

	    if(trimWhitespace(strStartDate) != '' && strStartDate != undefined) {
	    	if(startDate>dueDate){
				var errormessage="<emxUtil:i18nScript localize="i18nIdn">EnterpriseChangeMgt.Alert.DueDate</emxUtil:i18nScript>";
				alert(errormessage);
				return false;	    		
	    	}
	    }
    }
    
    return true;
}

function addPersonAsFollower(){
	var followerHidden = document.getElementById("FollowerHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_Person:CURRENT=policy_Person.state_Active&txtExcludeOIDs='+followerHidden.value+'&table=AEFGeneralSearchResults&selection=multiple&hideHeader=true&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilPerson&targetTag=select&selectName=Follower&&inputFieldHidden=FollowerHidden';
	showChooser(sURL, 850, 630);
}
function removeFollower(){
	var selectTag = document.getElementsByName("Follower");
	var selectedOptionsValue = "";
	var bIsFollowerFieldModified = "false";
	for (var i=selectTag[0].options.length-1;i>=0;i--) {
		if (selectTag[0].options[i].selected) {
			if (selectedOptionsValue!="") {
				selectedOptionsValue += ",";
			}
			selectedOptionsValue += selectTag[0].options[i].value;
			selectTag[0].remove(i);
			bIsFollowerFieldModified = "true";
		}
	}
	//To make the decision of calling connect/disconnect method only on field modification.
	if(bIsFollowerFieldModified==="true"){
		var isFollowerFieldModified = document.getElementById("IsFollowerFieldModified");
		isFollowerFieldModified.value = "true";
	}	
	var followerHidden = document.getElementById("FollowerHidden");
	var followerHiddenValues = followerHidden.value.split(",");
	var selectedOptionsValues = selectedOptionsValue.split(",");
	var followerHiddenNewValue = "";
	for (var j=0;j<followerHiddenValues.length;j++) {
		var followerHiddenValue = followerHiddenValues[j];
		var contains = "false";
		for (var k=0;k<selectedOptionsValues.length;k++) {
    		var selectedOptionValue = selectedOptionsValues[k];
    		if (followerHiddenValue == selectedOptionValue) {
    			contains = "true";
    		}
    	}
		if (contains == "false") {
			if (followerHiddenNewValue!="") {
				followerHiddenNewValue += ",";
    		}
			followerHiddenNewValue += followerHiddenValue;
		}
	}
	followerHidden.value = followerHiddenNewValue;
}
function addPersonAsContributor(){
	var contributorHidden = document.getElementById("ContributorHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_Person:CURRENT=policy_Person.state_Active&txtExcludeOIDs='+contributorHidden.value+'&table=AEFGeneralSearchResults&selection=multiple&hideHeader=true&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilPerson&targetTag=select&selectName=Contributor&inputFieldHidden=ContributorHidden';
	showChooser(sURL, 850, 630);
}
function removeContributor(){
	var selectTag = document.getElementsByName("Contributor");
	var selectedOptionsValue = "";
	var bIsContributorFieldModified = "false";
	for (var i=selectTag[0].options.length-1;i>=0;i--) {
		if (selectTag[0].options[i].selected) {
			if (selectedOptionsValue!="") {
				selectedOptionsValue += ",";
			}
			selectedOptionsValue += selectTag[0].options[i].value;
			selectTag[0].remove(i);
			bIsContributorFieldModified = "true";
		}
	}
	//To make the decision of calling connect/disconnect method only on field modification.
	if(bIsContributorFieldModified==="true"){
		var isContributorFieldModified = document.getElementById("IsContributorFieldModified");
		isContributorFieldModified.value = "true";
	}
	var contributorHidden = document.getElementById("ContributorHidden");
	var contributorHiddenValues = contributorHidden.value.split(",");
	var selectedOptionsValues = selectedOptionsValue.split(",");
	var contributorHiddenNewValue = "";
	for (var j=0;j<contributorHiddenValues.length;j++) {
		var contributorHiddenValue = contributorHiddenValues[j];
		var contains = "false";
		for (var k=0;k<selectedOptionsValues.length;k++) {
    		var selectedOptionValue = selectedOptionsValues[k];
    		if (contributorHiddenValue == selectedOptionValue) {
    			contains = "true";
    		}
    	}
		if (contains == "false") {
			if (contributorHiddenNewValue!="") {
				contributorHiddenNewValue += ",";
    		}
			contributorHiddenNewValue += contributorHiddenValue;
		}
	}
	contributorHidden.value = contributorHiddenNewValue;
}

//Added for IR-875061-3DEXPERIENCER2022x.....START
function addUserFollowersSelectors(){
	var UserFollowersHidden = document.getElementById("UserFollowersHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_Person:CURRENT=policy_Person.state_Active&txtExcludeOIDs='+UserFollowersHidden.value+'&table=AEFGeneralSearchResults&selection=multiple&hideHeader=true';	
	sURL = sURL + '&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilInformedUsersWithGroup&targetTag=select&selectName=InformedUsersWithGroup';
	
	showChooser(sURL, 850, 630);
}

function addGroupFollowersSelectors(){
	var GroupFollowersHidden = document.getElementById("GroupFollowersHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_Group:CURRENT=policy_Person.state_Active&txtExcludeOIDs='+GroupFollowersHidden.value+'&table=AEFGeneralSearchResults&selection=multiple&hideHeader=true';
	if(<%=bIsCloud%>) {
		sURL = sURL +'&excludeOIDprogram=enoECMChangeRequestUX:excludeUserGroups&source=usersgroup&rdfQuery=[ds6w:type]:(Group)';
	}	
	sURL = sURL + '&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilInformedUsersWithGroup&targetTag=select&selectName=InformedUsersWithGroup';
	
	showChooser(sURL, 850, 630);
}

function removeInformedUsersWithGroup() {
	var selectTag = document.getElementsByName("InformedUsersWithGroup");
	var selectedOptionsValue = "";
	var bIsInformedUsersWithGroupFieldModified = "false";
	for (var i=selectTag[0].options.length-1;i>=0;i--) {
		if (selectTag[0].options[i].selected) {
			if (selectedOptionsValue!="") {
				selectedOptionsValue += ",";
			}
			selectedOptionsValue += selectTag[0].options[i].value;
			selectTag[0].remove(i);
			bIsInformedUsersWithGroupFieldModified = "true";
		}
	}
	//To make the decision of calling connect/disconnect method only on field modification.
	if(bIsInformedUsersWithGroupFieldModified==="true"){
		var isInformedUsersWithGroupFieldModified = document.getElementById("IsInformedUsersWithGroupFieldModified");
		isInformedUsersWithGroupFieldModified.value = "true";
	}
	
	var selectedOptionsValues = selectedOptionsValue.split(",");
	
	var userFollowersHidden = document.getElementById("UserFollowersHidden");
	var userFollowersHiddenValues = userFollowersHidden.value.split(",");

	var userFollowersHiddenNewValue = "";
	for (var j=0;j<userFollowersHiddenValues.length;j++) {
		var userFollowersHiddenValue = userFollowersHiddenValues[j];
		
		var contains = "false";
		for (var k=0;k<selectedOptionsValues.length;k++) {
    		var selectedOptionValue = selectedOptionsValues[k];
    		if (userFollowersHiddenValue == selectedOptionValue) {
    			contains = "true";
    		}
    	}
		if (contains == "false") {
			if (userFollowersHiddenNewValue!="") {
				userFollowersHiddenNewValue += ",";
    		}
			userFollowersHiddenNewValue += userFollowersHiddenValue;
		}
	}
	userFollowersHidden.value = userFollowersHiddenNewValue;
	
	var groupFollowersHidden = document.getElementById("GroupFollowersHidden");
	var groupFollowersHiddenValues = groupFollowersHidden.value.split(",");

	var groupFollowersHiddenNewValue = "";
	for (var j=0;j<groupFollowersHiddenValues.length;j++) {
		var groupFollowersHiddenValue = groupFollowersHiddenValues[j];
		
		var contains = "false";
		for (var k=0;k<selectedOptionsValues.length;k++) {
    		var selectedOptionValue = selectedOptionsValues[k];
    		if (groupFollowersHiddenValue == selectedOptionValue) {
    			contains = "true";
    		}
    	}
		if (contains == "false") {
			if (groupFollowersHiddenNewValue!="") {
				groupFollowersHiddenNewValue += ",";
    		}
			groupFollowersHiddenNewValue += groupFollowersHiddenValue;
		}
	}
	groupFollowersHidden.value = groupFollowersHiddenNewValue;	
}
//Added for IR-875061-3DEXPERIENCER2022x.....END

function addUserAssigneesSelectors(){
	var UserAssigneesHidden = document.getElementById("UserAssigneesHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_Person:CURRENT=policy_Person.state_Active&txtExcludeOIDs='+UserAssigneesHidden.value+'&table=AEFGeneralSearchResults&selection=multiple&hideHeader=true';	
	sURL = sURL + '&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilAssignee&targetTag=select&selectName=Assignees';
	
	showChooser(sURL, 850, 630);
}

function addGroupAssigneesSelectors(){
	var GroupAssigneesHidden = document.getElementById("GroupAssigneesHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_Group:CURRENT=policy_Person.state_Active&txtExcludeOIDs='+GroupAssigneesHidden.value+'&table=AEFGeneralSearchResults&selection=multiple&hideHeader=true';
	if(<%=bIsCloud%>) {
		sURL = sURL +'&excludeOIDprogram=enoECMChangeRequestUX:excludeUserGroups&source=usersgroup&rdfQuery=[ds6w:type]:(Group)';
	}	
	sURL = sURL + '&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilAssignee&targetTag=select&selectName=Assignees';
	
	showChooser(sURL, 850, 630);
}

function removeAssignees() {
	var selectTag = document.getElementsByName("Assignees");
	var selectedOptionsValue = "";
	var bIsAssigneeFieldModified = "false";
	for (var i=selectTag[0].options.length-1;i>=0;i--) {
		if (selectTag[0].options[i].selected) {
			if (selectedOptionsValue!="") {
				selectedOptionsValue += ",";
			}
			selectedOptionsValue += selectTag[0].options[i].value;
			selectTag[0].remove(i);
			bIsAssigneeFieldModified = "true";
		}
	}
	//To make the decision of calling connect/disconnect method only on field modification.
	if(bIsAssigneeFieldModified==="true"){
		var isAssigneeFieldModified = document.getElementById("IsAssigneesFieldModified");
		isAssigneeFieldModified.value = "true";
	}
	
	var selectedOptionsValues = selectedOptionsValue.split(",");
	
	var userAssigneesHidden = document.getElementById("UserAssigneesHidden");
	var userAssigneesHiddenValues = userAssigneesHidden.value.split(",");

	var userAssigneesHiddenNewValue = "";
	for (var j=0;j<userAssigneesHiddenValues.length;j++) {
		var userAssigneesHiddenValue = userAssigneesHiddenValues[j];
		
		var contains = "false";
		for (var k=0;k<selectedOptionsValues.length;k++) {
    		var selectedOptionValue = selectedOptionsValues[k];
    		if (userAssigneesHiddenValue == selectedOptionValue) {
    			contains = "true";
    		}
    	}
		if (contains == "false") {
			if (userAssigneesHiddenNewValue!="") {
				userAssigneesHiddenNewValue += ",";
    		}
			userAssigneesHiddenNewValue += userAssigneesHiddenValue;
		}
	}
	userAssigneesHidden.value = userAssigneesHiddenNewValue;
	
	var groupAssigneesHidden = document.getElementById("GroupAssigneesHidden");
	var groupAssigneesHiddenValues = groupAssigneesHidden.value.split(",");

	var groupAssigneesHiddenNewValue = "";
	for (var j=0;j<groupAssigneesHiddenValues.length;j++) {
		var groupAssigneesHiddenValue = groupAssigneesHiddenValues[j];
		
		var contains = "false";
		for (var k=0;k<selectedOptionsValues.length;k++) {
    		var selectedOptionValue = selectedOptionsValues[k];
    		if (groupAssigneesHiddenValue == selectedOptionValue) {
    			contains = "true";
    		}
    	}
		if (contains == "false") {
			if (groupAssigneesHiddenNewValue!="") {
				groupAssigneesHiddenNewValue += ",";
    		}
			groupAssigneesHiddenNewValue += groupAssigneesHiddenValue;
		}
	}
	groupAssigneesHidden.value = groupAssigneesHiddenNewValue;	
}

function addInformedUsersPersonSelectors(){
	var InformedUsersHidden = document.getElementById("InformedUsersHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_Person:CURRENT=policy_Person.state_Active&txtExcludeOIDs='+InformedUsersHidden.value+'&table=AEFGeneralSearchResults&selection=multiple&hideHeader=true&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilInformedUsers&targetTag=select&selectName=InformedUsers';
	showChooser(sURL, 850, 630);
}
function addInformedUsersMemberListSelectors(){
	var InformedUsersHidden = document.getElementById("InformedUsersHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_MemberList:CURRENT=policy_MemberList.state_Active&table=APPECMemberListsSearchList&selection=single&txtExcludeOIDs='+InformedUsersHidden.value+'&hideHeader=true&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilInformedUsers&targetTag=select&selectName=InformedUsers';
	showChooser(sURL, 850, 630);
}

function removeInformedUsers() {
	var selectTag = document.getElementsByName("InformedUsers");
	var selectedOptionsValue = "";
	var bIsInformedUsersFieldModified = "false";
	for (var i=selectTag[0].options.length-1;i>=0;i--) {
		if (selectTag[0].options[i].selected) {
			if (selectedOptionsValue!="") {
				selectedOptionsValue += ",";
			}
			selectedOptionsValue += selectTag[0].options[i].value;
			selectTag[0].remove(i);
			bIsInformedUsersFieldModified = "true";
		}
	}
	//To make the decision of calling connect/disconnect method only on field modification.
	if(bIsInformedUsersFieldModified==="true"){
		var isInformedUsersFieldModified = document.getElementById("IsInformedUsersFieldModified");
		isInformedUsersFieldModified.value = "true";
	}	
	var informedUsersHidden = document.getElementById("InformedUsersHidden");
	var informedUsersHiddenType = document.getElementById("InformedUsersHiddenType");
	var informedUsersHiddenValues = informedUsersHidden.value.split(",");
	var informedUsersHiddenTypeValues = informedUsersHiddenType.value.split(",");
	var selectedOptionsValues = selectedOptionsValue.split(",");
	var informedUsersHiddenNewValue = "";
	var informedUsersHiddenTypeNewValue = "";
	for (var j=0;j<informedUsersHiddenValues.length;j++) {
		var informedUsersHiddenValue = informedUsersHiddenValues[j];
		var informedUsersHiddenTypeValue = informedUsersHiddenTypeValues[j];		
		var contains = "false";
		for (var k=0;k<selectedOptionsValues.length;k++) {
    		var selectedOptionValue = selectedOptionsValues[k];
    		if (informedUsersHiddenValue == selectedOptionValue) {
    			contains = "true";
    		}
    	}
		if (contains == "false") {
			if (informedUsersHiddenNewValue!="") {
				informedUsersHiddenNewValue += ",";
				informedUsersHiddenTypeNewValue+=",";
    		}
			informedUsersHiddenNewValue += informedUsersHiddenValue;
			informedUsersHiddenTypeNewValue += informedUsersHiddenTypeValue;
		}
	}
	informedUsersHidden.value = informedUsersHiddenNewValue;
	informedUsersHiddenType.value = informedUsersHiddenTypeNewValue;
	if(informedUsersHiddenTypeNewValue!="")
	{
		var informedUsersHiddenValues = informedUsersHiddenTypeNewValue.split(",");
		var informedUsersTypePresent = informedUsersHiddenValues[0];
		if(informedUsersTypePresent=="Person")
		{
			hideInformedUsers("MemberList");
		}
		else if(informedUsersTypePresent=="Member List"){
			hideInformedUsers("Person");
		}
		
	}else
	{
		hideInformedUsers("None");
	}
}	

function hideInformedUsers(hidebutton){
	var informedUsersHidePerson = document.getElementById("InformedUsersHidePerson");
	var informedUsersHideMemberList = document.getElementById("InformedUsersHideMemberList");
	if(hidebutton=="None")
	{
		informedUsersHidePerson.style.display= "block";
		informedUsersHideMemberList.style.display= "block";
		
	}else if(hidebutton=="Person")
	{
		informedUsersHidePerson.style.display= "none";
		}
	else if(hidebutton=="MemberList"){
		informedUsersHideMemberList.style.display= "none";
		}
}


function addReviewSelectors(){
	var ReviewersHidden = document.getElementById("ReviewersHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_Person:CURRENT=policy_Person.state_Active&txtExcludeOIDs='+ReviewersHidden.value+'&table=AEFGeneralSearchResults&selection=multiple&hideHeader=true&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilReviewer&targetTag=select&selectName=Reviewers';
	showChooser(sURL, 850, 630);
}
function addRouteSelectors(){
	var ReviewersHidden = document.getElementById("ReviewersHidden");
	var sURL=	'../common/emxFullSearch.jsp?field=TYPES=type_RouteTemplate:ROUTE_BASE_PURPOSE=Approval:CURRENT=policy_RouteTemplate.state_Active:LATESTREVISION=TRUE&table=APPECRouteTemplateSearchList&selection=single&txtExcludeOIDs='+ReviewersHidden.value+'&hideHeader=true&submitURL=../enterprisechangemgtapp/ECMUtil.jsp?mode=searchUtilReviewer&targetTag=select&selectName=Reviewers';
	showChooser(sURL, 850, 630);
}
	
function removeReviewers() {
	var selectTag = document.getElementsByName("Reviewers");
	var selectedOptionsValue = "";
	var bIsReviewerFieldModified = "false";
	for (var i=selectTag[0].options.length-1;i>=0;i--) {
		if (selectTag[0].options[i].selected) {
			if (selectedOptionsValue!="") {
				selectedOptionsValue += ",";
			}
			selectedOptionsValue += selectTag[0].options[i].value;
			selectTag[0].remove(i);
			bIsReviewerFieldModified = "true";
		}
	}
	//To make the decision of calling connect/disconnect method only on field modification.
	if(bIsReviewerFieldModified==="true"){
		var isReviewerFieldModified = document.getElementById("IsReviewerFieldModified");
		isReviewerFieldModified.value = "true";
	}
	
	var reviewersHidden = document.getElementById("ReviewersHidden");
	var reviewersHiddenType = document.getElementById("ReviewersHiddenType");
	var reviewersHiddenValues = reviewersHidden.value.split(",");
	var reviewersHiddenTypeValues = reviewersHiddenType.value.split(",");
	var selectedOptionsValues = selectedOptionsValue.split(",");
	var reviewersHiddenNewValue = "";
	var reviewersHiddenTypeNewValue = "";
	for (var j=0;j<reviewersHiddenValues.length;j++) {
		var reviewersHiddenValue = reviewersHiddenValues[j];
		var reviewersHiddenTypeValue = reviewersHiddenTypeValues[j];		
		var contains = "false";
		for (var k=0;k<selectedOptionsValues.length;k++) {
    		var selectedOptionValue = selectedOptionsValues[k];
    		if (reviewersHiddenValue == selectedOptionValue) {
    			contains = "true";
    		}
    	}
		if (contains == "false") {
			if (reviewersHiddenNewValue!="") {
				reviewersHiddenNewValue += ",";
				reviewersHiddenTypeNewValue+=",";
    		}
			reviewersHiddenNewValue += reviewersHiddenValue;
			reviewersHiddenTypeNewValue += reviewersHiddenTypeValue;
		}
	}
	reviewersHidden.value = reviewersHiddenNewValue;
	reviewersHiddenType.value = reviewersHiddenTypeNewValue;
	if(reviewersHiddenTypeNewValue!="")
	{
		var reviewersHiddenValues = reviewersHiddenTypeNewValue.split(",");
		var reviewerTypePresent = reviewersHiddenValues[0];
		if(reviewerTypePresent=="Person")
		{
			hideReviewers("RouteTemplate");
		}
		else if(reviewerTypePresent=="Route Template"){
			hideReviewers("Person");
		}
		
	}else
	{
		hideReviewers("None");
	}
}	

  

function hideReviewers(hidebutton){
	var hideReviewerPerson = document.getElementById("ReviewrHidePerson");
	var hideReviewerRouteTemplate = document.getElementById("ReviewrHideRouteTemplate");
	if(hidebutton=="None")
	{
		hideReviewerPerson.style.display= "block";
		hideReviewerRouteTemplate.style.display= "block";
		
	}else if(hidebutton=="Person")
	{
		hideReviewerPerson.style.display= "none";
		}
	else if(hidebutton=="RouteTemplate"){
		hideReviewerRouteTemplate.style.display= "none";
		}
}
function loadDelegatedUICreate(){
	
		console.log("loadDelegatedUICreate ");
		parent.parent.window.launchDelegatedUI("frames.slideInFrame");
		
}
function preProcessCreateCAUnderCO(){
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["Description"].value                   =   "<%=XSSUtil.encodeForJavaScript(context,strCODescription)%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["DescriptionId"].value                 =   "<%=XSSUtil.encodeForJavaScript(context,strCODescription)%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["GoverningCO1"].value                   =   "<%=strCOName%>";

	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["GoverningCO1"].disabled		=	true;
				
}

function preProcessCreateCAUnderCR(){
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["Description"].value                   =   "<%=strCRDescription%>";
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["DescriptionId"].value                 =   "<%=strCRDescription%>";
	
	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["GoverningCR1"].value                   =   "<%=strCRName%>";

	<!-- XSSOK -->
	document.forms['emxCreateForm'].elements["GoverningCR1"].disabled		=	true;
				
}

function validateReviewerListAndApprovalList() {

	var reviewerListOid = "";
	var approvalListOid = "";
	var reviewerList = document.getElementsByName("ReviewersListOID");
	var approvalList = document.getElementsByName("ApprovalListOID");
	
	if(typeof reviewerList == 'undefined' || reviewerList == ''){
		reviewerList = document.getElementsByName("ReviewerListOID");
	}
	
	if(typeof reviewerList != 'undefined' && reviewerList != '' && reviewerList.length > 0){
		reviewerListOid = reviewerList[0].value;
	}
	
	if(typeof approvalList != 'undefined' && approvalList != '' && approvalList.length > 0){
		approvalListOid = approvalList[0].value;
	}
	
	if(reviewerListOid != "" && approvalListOid != "" && reviewerListOid == approvalListOid){
		var errormessage="<emxUtil:i18nScript localize="i18nIdn">EnterpriseChangeMgt.Alert.SameReviewerApprovalListRouteTemplateCO</emxUtil:i18nScript>";
	   	alert(errormessage);
	   	return false;
	}
    return true;
}
