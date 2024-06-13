import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.Vector;

import com.dassault_systemes.changegovernance.interfaces.IChangeGovernanceServices.UserGroup;
import com.dassault_systemes.enovia.changeorder.factory.ChangeOrderFactory;
import com.dassault_systemes.enovia.changeorder.interfaces.IChangeOrder;
import com.dassault_systemes.enovia.changeorder.interfaces.IChangeOrderServices;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeTemplate;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants;
import com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil;

import com.matrixone.apps.common.Company;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.framework.ui.UIUtil;

import matrix.db.BusinessObject;
import matrix.db.ConnectParameters;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.RelationshipType;
import matrix.util.StringList;


public class enoECMChangeTemplateUXBase_mxJPO extends emxDomainObject_mxJPO {
	public static final String SUITE_KEY = "EnterpriseChangeMgt";
	public enoECMChangeTemplateUXBase_mxJPO(Context context, String[] args)
			throws Exception {
		super(context, args);
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * Gets the Change Templates as per the Context User Visibility. - As per "Member" relationship
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  HashMap containing one String entry for key "objectId"
	 * @return        a <code>MapList</code> object having the list of Change Templates, Object Id of Change Template objects.
	 * @throws        Exception if the operation fails
	 * @since         ECM R420
	 **
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getMyTemplatesView(Context context, String[] args) throws Exception
	{

		HashSet<String> sOrgSet 		= 		new HashSet<String>();
		MapList sTemplateList 			= 		new MapList();
		MapList sFinalTemplateList      = 		new MapList();
		try
		{
			String loggedInPersonId 	= 		PersonUtil.getPersonObjectID(context);
			boolean isChangeAdmin 		= 		ChangeUtil.hasChangeAdministrationAccess(context);

			DomainObject dmObj 			= 		DomainObject.newInstance(context);
			sOrgSet.add(loggedInPersonId); //To get Personal Templates, adding the person ID


			String sObjectId = "";
			String sOwner ="";
			String sMemberOrgId = "";
			String sParentOrgID = "";
			String sChildOrgID = "";


			StringBuffer selectTemplate = 		new StringBuffer("from[");
			selectTemplate.append(ChangeConstants.RELATIONSHIP_CHANGE_TEMPLATES);
			selectTemplate.append("].to.id");


			StringList sSelectList = new StringList();
			sSelectList.add(selectTemplate.substring(0));
			sSelectList.add(SELECT_ID);
			sSelectList.add(SELECT_OWNER);


			StringBuffer selectMemberOrg = 		new StringBuffer("to[");
			selectMemberOrg.append(RELATIONSHIP_MEMBER);
			selectMemberOrg.append("].from.id");

			//Getting Member Organizations object IDs
			dmObj.setId(loggedInPersonId);
			StringList sMemberOrgList = dmObj.getInfoList(context, selectMemberOrg.substring(0));



			Iterator sItr = sMemberOrgList.iterator();
			while(sItr.hasNext())
			{
				sMemberOrgId = (String)sItr.next();
				sOrgSet.add(sMemberOrgId);

				//Getting the above Parent Organizations Object IDs
				DomainObject orgObj = new DomainObject(sMemberOrgId);
				MapList sParentOrgList = orgObj.getRelatedObjects(context,
						RELATIONSHIP_DIVISION+","
						+RELATIONSHIP_COMPANY_DEPARTMENT,
						TYPE_ORGANIZATION,
						new StringList(SELECT_ID),
						null,
						true,
						false,
						(short)0,
						EMPTY_STRING,
						EMPTY_STRING,
						null,
						null,
						null);
				Iterator sParentOrgItr = sParentOrgList.iterator();
				while(sParentOrgItr.hasNext())
				{
					Map tempMap = (Map)sParentOrgItr.next();
					sParentOrgID = (String)tempMap.get(SELECT_ID);
					sOrgSet.add(sParentOrgID);
				}

				if(isChangeAdmin)
				{
					//Getting Business Units and Departments object IDs
					Company sCompanyObj = new Company(sMemberOrgId);
					MapList sOrgList = sCompanyObj.getBusinessUnitsAndDepartments(context, 0, new StringList(SELECT_ID), false);
					Iterator sOrgItr = sOrgList.iterator();
					while(sOrgItr.hasNext())
					{
						Map tempMap = (Map)sOrgItr.next();
						sChildOrgID = (String)tempMap.get(SELECT_ID);
						sOrgSet.add(sChildOrgID);
					}
				}

			}
			String[] arrObjectIDs = (String[])sOrgSet.toArray(new String[0]);

			//getting Templates connected to each organization/person
			sTemplateList = DomainObject.getInfo(context, arrObjectIDs, sSelectList);


			Iterator sTempItr = sTemplateList.iterator();
			while(sTempItr.hasNext())
			{
				Map newMap = (Map)sTempItr.next();
				sObjectId = (String)newMap.get(selectTemplate.substring(0));
				sOwner = (String)newMap.get("owner");
				if(!UIUtil.isNullOrEmpty(sObjectId))
				{
					StringList sList = FrameworkUtil.split(sObjectId,"\7");
					Iterator sListItr = sList.iterator();
					while(sListItr.hasNext())
					{
						Map sTempMap = new HashMap();
						sObjectId = (String)sListItr.next();
						sTempMap.put("id", sObjectId);
						sTempMap.put("owner", sOwner);
						sFinalTemplateList.add(sTempMap);
					}


				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw new FrameworkException(e);
		}
		return sFinalTemplateList;
	}//end of method


	/**
	 * To create the Attribute Group on Change Template
	 * @param context the eMatrix code context object
	 * @param args packed hashMap of request parameter
	 * @throws Exception if the operation fails
	 */
	
	public void createAttributeGroup(Context context,String [] args) throws Exception{
		HashMap<?, ?> programMap      = (HashMap<?, ?>)JPO.unpackArgs(args);
		HashMap<?, ?> paramMap        = (HashMap<?, ?>)programMap.get("paramMap");
        HashMap<?, ?> requestMap      = (HashMap<?, ?>)programMap.get("requestMap");
        String objectId         = (String)paramMap.get("objectId");
        String newName          = (String) paramMap.get("New Value");
        String description      = ((String[])requestMap.get("Description"))[0];
        String attributes       = ((String[])requestMap.get("Attributes"))[0];
        // calling modeler API to create attribute on CHT
        ChangeTemplate chgTemplateObj  = new ChangeTemplate(objectId);
        chgTemplateObj.createAttributeGroup(context, newName, description, attributes);
	}
	
	/**
	 * Returns the HTML based Edit Icon in the StructureBrowser
	 *
	 * @param context   the eMatrix <code>Context</code> object
	 * @param args      holds input arguments.
	 * @return          Vector attachment as HTML
	 * @throws          Exception if the operation fails
	 * @since           ECM R212
	 */
	public Vector showEditIconforStructureBrowser(Context context, String args[])throws FrameworkException{
		try{
			//XSSOK
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			Vector columnVals = showEditIconforStructureBrowser(context, programMap);
			if(columnVals.size()!=0){
				return columnVals;
			}
			else{
				return new Vector();
			}
		} catch (Exception e){
			throw new FrameworkException(e);
		}
	}
	
	/**
	 * Returns the HTML based Edit Icon in the StructureBrowser
	 * Note - This method is replacement for same method in enoECMChangeTemplateBase
	 * 
	 * @param context   the eMatrix <code>Context</code> object
	 * @param args      holds input arguments.
	 * @return          Vector attachment as HTML
	 * @throws          Exception if the operation fails
	 * @since           ECM R212
	 */
	public Vector showEditIconforStructureBrowser(Context context, java.util.HashMap arguMap)throws FrameworkException{

		//XSSOK
		Vector columnVals = null;

		try {

			MapList objectList = (MapList) arguMap.get("objectList");
			StringBuffer sbEditIcon = null;
			DomainObject dmObj = DomainObject.newInstance(context);


			boolean isChangeAdmin = ChangeUtil.hasChangeAdministrationAccess(context);
			String orgId = PersonUtil.getUserCompanyId(context);
			String loggedInPersonId = PersonUtil.getPersonObjectID(context);

			boolean isBUEmployee = false;

			Company companyObj = new Company();

			StringList sSelectList = new StringList();
			sSelectList.add("to["+ChangeConstants.RELATIONSHIP_CHANGE_TEMPLATES+"].from.type");
			sSelectList.add("to["+ChangeConstants.RELATIONSHIP_CHANGE_TEMPLATES+"].from.name");
			sSelectList.add("to["+ChangeConstants.RELATIONSHIP_CHANGE_TEMPLATES+"].from.id");

			String sConnectedType = "";
			String sConnectedID = "";
			String sConnectedName ="";
			String sOwner ="";
			String si18NEditChangeTemplate = EnoviaResourceBundle.getProperty(context,  ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.EditChangeTemplate");

			StringBuffer sbStartHref = new StringBuffer();
			sbStartHref.append("<a href=\"JavaScript:emxTableColumnLinkClick('");
			sbStartHref.append("../common/emxForm.jsp?formHeader=Edit Change Template&amp;mode=edit");
			sbStartHref.append("&amp;preProcessJavaScript=setOwningOrganization&amp;HelpMarker=emxhelpparteditdetails&amp;postProcessJPO=enoECMChangeUX%3AupdateRouteTemplateForChangeEdit&amp;commandName=ECMMyChangeTemplates&amp;refreshStructure=false&amp;postProcessURL=../enterprisechangemgtapp/ECMCommonRefresh.jsp&amp;suiteKey=EnterpriseChangeMgt&amp;objectId=");

			StringBuffer sbEndHref = new StringBuffer();
			sbEndHref.append("&amp;form=type_ChangeTemplate'");
			sbEndHref.append(", '700', '600', 'true', 'slidein', '')\">");
			sbEndHref.append("<img border=\"0\" src=\"../common/images/iconActionEdit.gif\" title=\""+XSSUtil.encodeForXML(context, si18NEditChangeTemplate)+"\" /></a>");

			int listSize = 0;
			if (objectList != null && (listSize = objectList.size()) > 0) {
				columnVals = new Vector(objectList.size());
				Map sTempMap = new HashMap();

				Iterator objectListItr    = objectList.iterator();
				while( objectListItr.hasNext()){
					Map objectMap           = (Map) objectListItr.next();
					String objectID = (String)objectMap.get("id");
					sbEditIcon = new StringBuffer();

					dmObj.setId(objectID);

					Map sResultMap = dmObj.getInfo(context, sSelectList);
					sConnectedType = (String)sResultMap.get("to["+ChangeConstants.RELATIONSHIP_CHANGE_TEMPLATES+"].from.type");
					sConnectedName = (String)sResultMap.get("to["+ChangeConstants.RELATIONSHIP_CHANGE_TEMPLATES+"].from.name");
					sConnectedID = (String)sResultMap.get("to["+ChangeConstants.RELATIONSHIP_CHANGE_TEMPLATES+"].from.id");

					dmObj.setId(loggedInPersonId);
					String sPersonBUID = dmObj.getInfo(context,"to["+RELATIONSHIP_BUSINESS_UNIT_EMPLOYEE+"].from.id");

					if(sConnectedType.equals(TYPE_PERSON)){

						if(sOwner.equals(context.getUser()) || sConnectedName.equals(context.getUser())){
							sbEditIcon = new StringBuffer(sbStartHref);
							sbEditIcon.append(XSSUtil.encodeForHTMLAttribute(context, objectID));
							sbEditIcon.append(sbEndHref);
						}
					}
					if(!UIUtil.isNullOrEmpty(sPersonBUID)){
						isBUEmployee = true;
						companyObj.setId(sPersonBUID);
						sTempMap.put("id",sPersonBUID);
					}
					if(!isBUEmployee){
						companyObj.setId(orgId);
						sTempMap.put("id",orgId);
					}

					MapList sList = companyObj.getBusinessUnitsAndDepartments(context, 0, new StringList(SELECT_ID), false);
					sList.add(sTempMap);
					Iterator sItr = sList.iterator();

					while(sItr.hasNext()){
						Map sMap = (Map)sItr.next();
						boolean sContains = sMap.containsValue(sConnectedID);
						if(sContains){
							if(isChangeAdmin){
								sbEditIcon = new StringBuffer(sbStartHref);
								sbEditIcon.append(XSSUtil.encodeForHTMLAttribute(context, objectID));
								sbEditIcon.append(sbEndHref);
							}
						}
					}
					columnVals.add(sbEditIcon.toString());
				}//end while

			}//end if
			return columnVals;
		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	}//end of method
	
	/**
  	 * Get Informed Users with user group Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Informed Users with user group Field.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String selectInformedUsersWithGroup(Context context,String[] args)throws Exception
	{
		boolean isEditable = true;
		boolean isMobileDevice = false;
		StringBuilder sb = new StringBuilder();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String strMode = (String) requestMap.get("mode");
		String changeTemplateId = (String) requestMap.get("objectId");
		MapList mlInformedUsers = new MapList();
		String strFollowerAccessKey = "ManageFollowers";
		String informedUsers = DomainObject.EMPTY_STRING;
		String informedMemberLists = DomainObject.EMPTY_STRING;
		String informedUserGroups = DomainObject.EMPTY_STRING;
		StringList slMemberListId = new StringList();
		String USER_FULL_NAME = "UserFullName";

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}
		
		//Get current informed users and member lists
		if(null != changeTemplateId){
			
			DomainObject domChangeTemplate = DomainObject.newInstance(context, changeTemplateId);
			
			//Get existing Members list

			String strSelectTitle = "attribute[" + DomainConstants.ATTRIBUTE_TITLE  + "]";
			StringList objSelects = new StringList();
			objSelects.add(DomainConstants.SELECT_ID);
			objSelects.add(DomainConstants.SELECT_NAME);
			objSelects.add(DomainConstants.SELECT_TYPE);
			objSelects.add(strSelectTitle);
			
			MapList mlMemberList = domChangeTemplate.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST,
					  DomainConstants.TYPE_MEMBER_LIST,
					  objSelects,
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
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
					mpMemberList.put(DomainConstants.ATTRIBUTE_TITLE, memberListName);
					mpMemberList.put(DomainConstants.SELECT_TYPE, memberListType);
					mlInformedUsers.add(mpMemberList);
					slMemberListId.add(memberListId);
				}
			}
			
			//Get existing user group followers
			MapList mlGroupFollower = domChangeTemplate.getRelatedObjects(context,
					  PropertyUtil.getSchemaProperty(context,"relationship_ChangeFollower"),
					  DomainConstants.TYPE_GROUP,
					  objSelects,
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
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
					mpUserGroup.put(DomainConstants.ATTRIBUTE_TITLE, userGroupTitle);
					mpUserGroup.put(DomainConstants.SELECT_TYPE, userGroupType);
					mlInformedUsers.add(mpUserGroup);
					informedUserGroups = informedUserGroups.concat(userGroupId+",");
				}
			}
			
									
			//Get existing user followers
			MapList mlUserFollower = domChangeTemplate.getRelatedObjects(context,
					  PropertyUtil.getSchemaProperty(context,"relationship_ChangeFollower"),
					  DomainConstants.TYPE_PERSON,
					  objSelects,
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
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
					mpUserFollower.put(USER_FULL_NAME, PersonUtil.getFullName(context, userFollowerName));
					mlInformedUsers.add(mpUserFollower);
					informedUsers = informedUsers.concat(userFollowerId+",");
				}
			}
			
			if (slMemberListId!=null && !slMemberListId.isEmpty()){
				for (int i=0;i<slMemberListId.size();i++) {
					String memberListId = (String) slMemberListId.get(i);
					String informedUserType = new DomainObject(memberListId).getInfo(context, DomainConstants.SELECT_TYPE);
					informedMemberLists=informedMemberLists.concat(memberListId+",");
				}
			}	
		}	
		
		if(informedUserGroups.length()>0 && !informedUserGroups.isEmpty()){
			informedUserGroups = informedUserGroups.substring(0,informedUserGroups.length()-1);
		}
				
		if(informedUsers.length()>0 && !informedUsers.isEmpty()){
			informedUsers = informedUsers.substring(0,informedUsers.length()-1);
		}

		if(informedMemberLists.length()>0 && !informedMemberLists.isEmpty()){
			informedMemberLists = informedMemberLists.substring(0,informedMemberLists.length()-1);
		}	
		if(!isMobileDevice && ("edit".equalsIgnoreCase(strMode) && isEditable)|| strMode==null && !exportToExcel)
		{
			String addPeople= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddPeople", context.getSession().getLanguage());
			String addUserGroup = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddUserGroup", context.getSession().getLanguage());
			String remove = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.Remove", context.getSession().getLanguage());
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"IsInformedUsersWithGroupFieldModified\" id=\"IsInformedUsersWithGroupFieldModified\" value=\"false\" readonly=\"readonly\" />");
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"UserFollowersHidden\" id=\"UserFollowersHidden\" value=\""+informedUsers+"\" readonly=\"readonly\" />");
			sb.append("<input type=\"hidden\" name=\"GroupFollowersHidden\" id=\"GroupFollowersHidden\" value=\""+informedUserGroups+"\" readonly=\"readonly\" />");
			sb.append("<input type=\"hidden\" name=\"MemberListFollowersHidden\" id=\"MemberListFollowersHidden\" value=\""+informedMemberLists+"\" readonly=\"readonly\" />");
			sb.append("<table>");
			sb.append("<tr>");
			sb.append("<th rowspan=\"3\">");
			sb.append("<select name=\"InformedUsersWithGroup\" style=\"width:200px\" multiple=\"multiple\">");

			for (int i=0; i<mlInformedUsers.size(); i++) {
				Map mpFollower = (Map) mlInformedUsers.get(i);
				String strFollowerType = (String) mpFollower.get(DomainConstants.SELECT_TYPE);
				String strFollowerPhyId = (String) mpFollower.get(DomainConstants.SELECT_PHYSICAL_ID);
				String strFollowerTitle = (String) mpFollower.get(DomainConstants.ATTRIBUTE_TITLE);
				String strFollowerGrpURI = (String) mpFollower.get(DomainConstants.ATTRIBUTE_GROUPURI);
				String strFollowerId = (String) mpFollower.get(DomainConstants.SELECT_ID);
				String strFollowerName = (String) mpFollower.get(DomainConstants.SELECT_NAME);
				String strFollowerFullName = (String) mpFollower.get(USER_FULL_NAME);
				if(!ChangeUtil.isNullOrEmpty(strFollowerType) && (DomainConstants.TYPE_PERSON.equalsIgnoreCase(strFollowerType))) {	
					if(!ChangeUtil.isNullOrEmpty(strFollowerId) && !ChangeUtil.isNullOrEmpty(strFollowerFullName)) {
						sb.append("<option value=\""+strFollowerId+"\" >");
						sb.append(strFollowerFullName);
						sb.append("</option>");	
					}
				}else {
					if(!ChangeUtil.isNullOrEmpty(strFollowerId) && !ChangeUtil.isNullOrEmpty(strFollowerTitle)) {
						sb.append("<option value=\""+strFollowerId+"\" >");
						sb.append(strFollowerTitle);
						sb.append("</option>");	
					}					
				}
			}
			
			sb.append("</select>");
			sb.append("</th>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:addUserFollowersSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addUserFollowersSelectors()\">");
			//XSSOK
			sb.append(addPeople);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:addGroupFollowersSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addGroupFollowersSelectors()\">");
			//XSSOK
			sb.append(addUserGroup);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:removeInformedUsersWithGroup()\">");
			sb.append("<img src=\"../common/images/iconStatusRemoved.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:removeInformedUsersWithGroup()\">");
			//XSSOK
			sb.append(remove);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("</table>");			
			
		}else {
			if(!exportToExcel) {
				sb.append("<input type=\"hidden\" name=\"UserFollowersHidden\" id=\"UserFollowersHidden\" value=\""+informedUsers+"\" readonly=\"readonly\" />");
				sb.append("<input type=\"hidden\" name=\"GroupFollowersHidden\" id=\"GroupFollowersHidden\" value=\""+informedUserGroups+"\" readonly=\"readonly\" />");
				sb.append("<input type=\"hidden\" name=\"MemberListFollowersHidden\" id=\"MemberListFollowersHidden\" value=\""+informedMemberLists+"\" readonly=\"readonly\" />");
			}

			for (int i=0; i<mlInformedUsers.size(); i++) {
				Map mpFollower = (Map) mlInformedUsers.get(i);
				String strFollowerType = (String) mpFollower.get(DomainConstants.SELECT_TYPE);
				String strFollowerPhyId = (String) mpFollower.get(DomainConstants.SELECT_PHYSICAL_ID);
				String strFollowerTitle = (String) mpFollower.get(DomainConstants.ATTRIBUTE_TITLE);
				String strFollowerGrpURI = (String) mpFollower.get(DomainConstants.ATTRIBUTE_GROUPURI);
				String strFollowerId = (String) mpFollower.get(DomainConstants.SELECT_ID);
				String strFollowerName = (String) mpFollower.get(DomainConstants.SELECT_NAME);
				String strFollowerFullName = (String) mpFollower.get(USER_FULL_NAME);
				if(!ChangeUtil.isNullOrEmpty(strFollowerType) && (DomainConstants.TYPE_PERSON.equalsIgnoreCase(strFollowerType))) {	
					if(!ChangeUtil.isNullOrEmpty(strFollowerId) && !ChangeUtil.isNullOrEmpty(strFollowerFullName)) {
						if(!exportToExcel) {
							sb.append("<input type=\"hidden\" name=\""+strFollowerFullName+"\" value=\""+strFollowerId+"\" />");
						}
						sb.append(strFollowerFullName);
						if(i < mlInformedUsers.size()-1) {	
							if(!exportToExcel) {	
								sb.append("<br>");
							}else {
								sb.append("\n");
							}
						}
					}
				}else {
					if(!ChangeUtil.isNullOrEmpty(strFollowerId) && !ChangeUtil.isNullOrEmpty(strFollowerTitle)) {
						if(!exportToExcel) {
							sb.append("<input type=\"hidden\" name=\""+strFollowerTitle+"\" value=\""+strFollowerId+"\" />");
							sb.append("<a onclick='findFrame(getTopWindow(), \"content\").location.href = \"../common/emxTree.jsp?objectId="+strFollowerId+"\"'>");
						}
						sb.append(strFollowerTitle);	
						if(i < mlInformedUsers.size()-1) {
							if(!exportToExcel){
								sb.append("</a>");
								sb.append("<br>");
							}else {
								sb.append("\n");
							}
						}
					}					
				}			
			}			
		}		
		return sb.toString();
	}
	
	/**
	 * connectInformedUsersWithGroup - Connect Change Template and Person or user group
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 * Added for IR-875061-3DEXPERIENCER2022x
	 */
	@com.matrixone.apps.framework.ui.ConnectionProgramCallable
	public void connectInformedUsersWithGroup(Context context, String[] args)throws Exception
	{
		Map programMap = (HashMap)JPO.unpackArgs(args);
		HashMap hmParamMap = (HashMap)programMap.get("paramMap");
		String changeTemplateId = (String)hmParamMap.get("objectId");
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		
		String[] strNewUserFollowerArr = (String[])requestMap.get("UserFollowersHidden");
		String[] strNewGroupFollowerArr = (String[])requestMap.get("GroupFollowersHidden");
		String[] strNewMemberListFollowerArr = (String[])requestMap.get("MemberListFollowersHidden");
		
		String[] strIsFieldModifiedArr = (String[])requestMap.get("IsInformedUsersWithGroupFieldModified");
		String strIsFieldModified = "true";
		if(strIsFieldModifiedArr != null && strIsFieldModifiedArr.length > 0){
			strIsFieldModified = strIsFieldModifiedArr[0];				
		}	
		
		//To make the decision of calling connect/disconnect method only on field modification.
		if("true".equalsIgnoreCase(strIsFieldModified)){
			Boolean isFrom = false, preserve = true;
			DomainObject domChangeTemplate = DomainObject.newInstance(context, changeTemplateId);
			
			//Creating set of updated user follower after edit
			String strNewUserFollowers = null;	
			Set<String> setOfNewUserFollowerIDs = new HashSet<>();
			if(strNewUserFollowerArr != null && strNewUserFollowerArr.length > 0){
				strNewUserFollowers = strNewUserFollowerArr[0];
				StringTokenizer strNewUserFollowersList = new StringTokenizer(strNewUserFollowers,",");
				while (strNewUserFollowersList.hasMoreTokens()){
					String strInformedUser = strNewUserFollowersList.nextToken().trim();
					setOfNewUserFollowerIDs.add(strInformedUser);
				}
			}
			
			//Creating set of updated group follower after edit
			String strNewGroupFollowers = null;
			Set<String> setOfNewUserGroupFollowerIDs = new HashSet<>();
			if(strNewGroupFollowerArr != null && strNewGroupFollowerArr.length > 0){
				strNewGroupFollowers = strNewGroupFollowerArr[0];
				StringTokenizer strNewGroupFollowersList = new StringTokenizer(strNewGroupFollowers,",");
				while (strNewGroupFollowersList.hasMoreTokens()){
					String strInformedUser = strNewGroupFollowersList.nextToken().trim();
					setOfNewUserGroupFollowerIDs.add(strInformedUser);
				}
			}
			
			//Creating set of updated member list after edit
			String strNewMemberListFollowers = null;
			Set<String> setOfNewMemberListIDs = new HashSet<>();
			if(strNewMemberListFollowerArr != null && strNewMemberListFollowerArr.length > 0){
				strNewMemberListFollowers = strNewMemberListFollowerArr[0];
				StringTokenizer strNewMemberListFollowersList = new StringTokenizer(strNewMemberListFollowers,",");
				while (strNewMemberListFollowersList.hasMoreTokens()){
					String strInformedUser = strNewMemberListFollowersList.nextToken().trim();
					setOfNewMemberListIDs.add(strInformedUser);
				}
			}
			
			
			//getting existing follower ids
			MapList mlExistingUserFollower = domChangeTemplate.getRelatedObjects(context,
					  PropertyUtil.getSchemaProperty(context,"relationship_ChangeFollower"),
					  DomainConstants.TYPE_PERSON,
					  new StringList(DomainConstants.SELECT_ID),
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			MapList mlExistingUserGroup = domChangeTemplate.getRelatedObjects(context,
					  PropertyUtil.getSchemaProperty(context,"relationship_ChangeFollower"),
					  DomainConstants.TYPE_GROUP,
					  new StringList(DomainConstants.SELECT_ID),
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			MapList mlExistingMemberList = domChangeTemplate.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST,
					  DomainConstants.TYPE_MEMBER_LIST,
					  new StringList(DomainConstants.SELECT_ID),
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			
			
			//update connect and disconnect list, followed by connect and disconnect
			//user follower
			List<String> userFollowerDisconnectList = new ArrayList<String>();
			if(!mlExistingUserFollower.isEmpty()){
				Iterator itrUser = mlExistingUserFollower.iterator();
				while(itrUser.hasNext()){
					Map userFollower = (Map)itrUser.next();
					String userFollowerId = (String) userFollower.get(DomainConstants.SELECT_ID);
					String userFollowerRelId = (String) userFollower.get(DomainRelationship.SELECT_ID);
					if(!setOfNewUserFollowerIDs.contains(userFollowerId))
						userFollowerDisconnectList.add(userFollowerRelId);
					else {
						setOfNewUserFollowerIDs.remove(userFollowerId);
					}
				}
			}
			if(userFollowerDisconnectList.size()>0) {
				String[] userFollowerDisconnectArr = new String[userFollowerDisconnectList.size()];
				userFollowerDisconnectArr = userFollowerDisconnectList.toArray(userFollowerDisconnectArr);
				DomainRelationship.disconnect(context, userFollowerDisconnectArr);
			}
			if(setOfNewUserFollowerIDs.size()>0) {
				for (String newUserFollowerID : setOfNewUserFollowerIDs) {
					RelationshipType rel_Follower = new RelationshipType(PropertyUtil.getSchemaProperty(context,"relationship_ChangeFollower"));
					ConnectParameters connectParams = new ConnectParameters();
					connectParams.setRelType(rel_Follower);
					connectParams.setFrom(true);
					connectParams.setTarget(new BusinessObject(newUserFollowerID));
					new BusinessObject(changeTemplateId).connect(context,connectParams);
				}
			}
								
			//user group
			List<String> userGroupFollowerDisconnectList = new ArrayList<String>();
			if(!mlExistingUserGroup.isEmpty()){
				Iterator itrUserGroup = mlExistingUserGroup.iterator();
				while(itrUserGroup.hasNext()){
					Map userGroup = (Map)itrUserGroup.next();
					String userGroupId = (String) userGroup.get(DomainConstants.SELECT_ID);
					String userGroupRelId = (String) userGroup.get(DomainRelationship.SELECT_ID);
					if(!setOfNewUserGroupFollowerIDs.contains(userGroupId))
						userGroupFollowerDisconnectList.add(userGroupRelId);
					else {
						setOfNewUserGroupFollowerIDs.remove(userGroupId);
					}
				}
			}
			if(userGroupFollowerDisconnectList.size()>0) {
				String[] userGroupFollowerDisconnectArr = new String[userGroupFollowerDisconnectList.size()];
				userGroupFollowerDisconnectArr = userGroupFollowerDisconnectList.toArray(userGroupFollowerDisconnectArr);
				DomainRelationship.disconnect(context, userGroupFollowerDisconnectArr);
			}
			if(setOfNewUserGroupFollowerIDs.size()>0) {
				for (String newUserGroupFollowerID : setOfNewUserGroupFollowerIDs) {
					RelationshipType rel_Follower = new RelationshipType(PropertyUtil.getSchemaProperty(context,"relationship_ChangeFollower"));
					ConnectParameters connectParams = new ConnectParameters();
					connectParams.setRelType(rel_Follower);
					connectParams.setFrom(true);
					connectParams.setTarget(new BusinessObject(newUserGroupFollowerID));
					new BusinessObject(changeTemplateId).connect(context,connectParams);
				}
			}
						
			//Member list remove
			List<String> memberListFollowerDisconnectList = new ArrayList<String>();
			if(!mlExistingMemberList.isEmpty()){
				Iterator itrMemberList = mlExistingMemberList.iterator();
				while(itrMemberList.hasNext()){
					Map memberList = (Map)itrMemberList.next();
					String memberListId = (String) memberList.get(DomainConstants.SELECT_ID);
					String memberListRelId = (String) memberList.get(DomainRelationship.SELECT_ID);
					if(!setOfNewMemberListIDs.contains(memberListId))
						memberListFollowerDisconnectList.add(memberListRelId);
				}
			}
			
			//if disconnectlist has items disconnect them
			if(memberListFollowerDisconnectList.size()>0) {
				String[] memberListFollowerDisconnectArr = new String[memberListFollowerDisconnectList.size()];
				memberListFollowerDisconnectArr = memberListFollowerDisconnectList.toArray(memberListFollowerDisconnectArr);
				DomainRelationship.disconnect(context, memberListFollowerDisconnectArr);
			}
		}
					
	}

}
