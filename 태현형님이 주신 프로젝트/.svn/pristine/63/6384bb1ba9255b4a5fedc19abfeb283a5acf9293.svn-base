import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;

import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.dassault_systemes.enovia.changeaction.factory.ChangeActionFactory;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeAction;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeActionServices;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeAction;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants;
import com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.dassault_systemes.enovia.changeaction.interfaces.IProposedChanges;
import com.dassault_systemes.enovia.changeaction.interfaces.IProposedActivity.ProposedActivityStatus;
import com.dassault_systemes.enovia.versioning.factory.VersioningFactory;
import com.dassault_systemes.enovia.versioning.interfaces.IRequestLastVersion;
import com.dassault_systemes.enovia.versioning.interfaces.IVersioningServices;
import com.dassault_systemes.enovia.versioning.util.ENOVersioningSemanticRelationType;

public class enoECMChangeActionUXBase_mxJPO extends emxDomainObject_mxJPO {

	public static final String SUITE_KEY = "EnterpriseChangeMgt";
	private static Map<String, String> iconMap = new HashMap<>();
	private com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeCommon changeCommonApp = null;
	private ChangeUtil changeUtil = null;
	public enoECMChangeActionUXBase_mxJPO(Context context, String[] args)throws Exception {
		super(context, args);
		// TODO Auto-generated constructor stub
		changeUtil = new ChangeUtil();
	}
	/**
	 * To create the Change Action from Create Component
	 *
	 * @author
	 * @param context the eMatrix code context object
	 * @param args packed hashMap of request parameter
	 * @return Map contains change object id
	 * @throws Exception if the operation fails
	 * @Since ECM R420
	 */
	@com.matrixone.apps.framework.ui.CreateProcessCallable
	public Map createChangeAction(Context context, String[] args) throws Exception {

	    HashMap programMap   = (HashMap) JPO.unpackArgs(args);
	    HashMap requestValue = (HashMap) programMap.get(ChangeConstants.REQUEST_VALUES_MAP);
	    HashMap requestMap   = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);
	    Map sAttritubeMap				  = new HashMap();

	    String strTimeZone = getStringFromArr((String[])requestValue.get("timeZone"),0);
	    double clientTZOffset = Double.parseDouble(strTimeZone);
	    Locale local = context.getLocale();

	    String sType   = getStringFromArr((String[])requestValue.get("TypeActual"),0);
	    String sEstimatedCompletionDate   = getStringFromArr((String[])requestValue.get("Estimated Completion Date"),0);
	    String sEstimatedStartDate   = getStringFromArr((String[])requestValue.get("EstimatedStartDate"),0);
	    String sDescription   = getStringFromArr((String[])requestValue.get("Description"),0);
	    String sContributor   = getStringFromArr((String[])requestValue.get("ContributorHidden"),0);
	    String sReviewers   = getStringFromArr((String[])requestValue.get("ReviewersHidden"),0);
	    String sFollower   = getStringFromArr((String[])requestValue.get("FollowerHidden"),0);
	    String sGoverningCO   = getStringFromArr((String[])requestValue.get("GoverningCOOID"),0);
	    String sAbstract   = getStringFromArr((String[])requestValue.get("Abstract"),0);
	    String sSeverity   = getStringFromArr((String[])requestValue.get("Severity"),0);
	    String sReviewersType   = getStringFromArr((String[])requestValue.get("ReviewersHiddenType"),0);
	    String sEstimatedCompletionDate_msvalue   = getStringFromArr((String[])requestValue.get("Estimated Completion Date_msvalue"),0);
	    sEstimatedCompletionDate_msvalue = eMatrixDateFormat.getDateValue(context,sEstimatedCompletionDate_msvalue,strTimeZone,local);
	    if(!ChangeUtil.isNullOrEmpty(sEstimatedCompletionDate_msvalue))
	    	sEstimatedCompletionDate_msvalue = com.matrixone.apps.domain.util.eMatrixDateFormat.getFormattedInputDate(context,sEstimatedCompletionDate_msvalue,clientTZOffset,local);

	    String sEstimatedStartDate_msvalue   = getStringFromArr((String[])requestValue.get("EstimatedStartDate_msvalue"),0);
	    sEstimatedStartDate_msvalue = eMatrixDateFormat.getDateValue(context,sEstimatedStartDate_msvalue,strTimeZone,local);
	    if(!ChangeUtil.isNullOrEmpty(sEstimatedStartDate_msvalue))
	    	sEstimatedStartDate_msvalue = com.matrixone.apps.domain.util.eMatrixDateFormat.getFormattedInputDate(context,sEstimatedStartDate_msvalue,clientTZOffset,local);

	    String sOwner = context.getUser();

	    sAttritubeMap.put(ATTRIBUTE_ORIGINATOR, sOwner);
		sAttritubeMap.put(ChangeConstants.ATTRIBUTE_ESTIMATED_COMPLETION_DATE, sEstimatedCompletionDate_msvalue);
		sAttritubeMap.put(ChangeConstants.ATTRIBUTE_ESTIMATED_START_DATE, sEstimatedStartDate_msvalue);
		sAttritubeMap.put(ATTRIBUTE_SEVERITY, sSeverity);
		sAttritubeMap.put(ChangeConstants.ATTRIBUTE_SYNOPSIS, sAbstract);
		String changeId   = "";
	    Map returnMap     = new HashMap();

	    try {
	    	//Check license
			/*
			String[] app = { "ENO_ECM_TP"};
			ComponentsUtil.checkLicenseReserved(context, app);
			*/
			
			String strType=sType;
			IChangeActionServices iCaServices = ChangeActionFactory.CreateChangeActionFactory();
			String newCAId = iCaServices.CreateChangeAction(context,strType, null, null).getCaBusinessObject().getObjectId(context);

	    	ChangeAction changeAction = new ChangeAction(newCAId);
	    	changeAction.setAttributeValues(context, sAttritubeMap);
	    	changeAction.setDescription(context, sDescription);

	        returnMap.put(ChangeConstants.ID, newCAId);

	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new FrameworkException(e.getMessage());
	    }

	    return returnMap;
	}
	private String getStringFromArr(String[] StringArr, int intArrIndex) {
		return (StringArr != null) ? (String)StringArr[intArrIndex] : EMPTY_STRING;
	}
	
	/**
	 * Displays Governing CO Filed on Create CA page while creating CA under CO
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean showFieldInCreateCAunderCO(Context context,String []args) throws Exception {

		boolean sReturn = false;
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String sfunctionality    = (String)paramMap.get("functionality");
		if("addChangeActionUnderChangeOrder".equals(sfunctionality))
		{
			sReturn = true;
		}
		return sReturn;
	}
	
	/**
	 * Displays Governing CR Filed on Create CA page while creating CA under CR
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean showFieldInCreateCAunderCR(Context context,String []args) throws Exception {

		boolean sReturn = false;
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String sfunctionality    = (String)paramMap.get("functionality");
		if("addChangeActionUnderChangeRequest".equals(sfunctionality))
		{
			sReturn = true;
		}
		return sReturn;
	}
	
	/**
	 * Displays Governing CO Filed on Create CA page while creating Stand alone CA
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean showFieldInCreateStandaloneCA(Context context,String []args) throws Exception {		
		boolean sReturn = false;
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String sfunctionality    = (String)paramMap.get("functionality");
		if("addChangeActionUnderChangeRequest".equals(sfunctionality))
		{
			return sReturn;
		}
		else
		return (!showFieldInCreateCAunderCO(context,args) && ChangeUtil.hasLicenseOfECM(context));
	}
	
		/**
	 * Method to connect Change Order and Change Action 
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args - Holds the HashMap containing the following arguments
	 *          paramMap - contains newly created ObjectId
	 * @return void 
	 * @throws Exception if the operation fails
	 */
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void connectChangeActionUnderCO (Context context, String[] args) throws Exception{
		// unpack the incoming arguments
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramMap   = (HashMap)programMap.get("paramMap");
		HashMap requestMap = (HashMap)programMap.get("requestMap");
		String strCOId = (String) requestMap.get("parentOID");
		String newObjID = (String)paramMap.get("objectId");
		
		com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder mChangeOrder = new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder(strCOId);
		String[] newObjIDArray = new String[1];
		newObjIDArray[0] = newObjID;
		mChangeOrder.addChangeActions(context, newObjIDArray);
	}


	/**
	 * Method to connect Change Request and Change Action 
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args - Holds the HashMap containing the following arguments
	 *          paramMap - contains newly created ObjectId
	 * @return void 
	 * @throws Exception if the operation fails
	 */
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void connectChangeActionUnderCR (Context context, String[] args) throws Exception{
		// unpack the incoming arguments
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramMap   = (HashMap)programMap.get("paramMap");
		HashMap requestMap = (HashMap)programMap.get("requestMap");
		String strCRId = (String) requestMap.get("parentOID");
		String newObjID = (String)paramMap.get("objectId");
		
		com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest mChangeRequest = new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest(strCRId);
		String[] newObjIDArray = new String[1];
		newObjIDArray[0] = newObjID;
		mChangeRequest.addChangeActions(context, newObjIDArray);
	}
	
	/**
  	 * Select the Follower Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Follower Field.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String selectFollower(Context context,String[] args)throws Exception
	{
		boolean isEditable = false;
		boolean isMobileDevice = false;
		StringBuilder sb = new StringBuilder();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String strMode = (String) requestMap.get("mode");
		String changeActionId = (String) requestMap.get("objectId");
		String followers = DomainObject.EMPTY_STRING;
		StringList finalFollowerList=new StringList();
		String functionality = (String) requestMap.get("functionality");
		if("edit".equalsIgnoreCase(strMode))
		isEditable = isTeamEditable(context, "AddFollower",changeActionId);

		String userAgentString = (String)requestMap.get("User-Agent");
		//if(!ChangeUtil.isNullOrEmpty(userAgentString) && userAgentString.indexOf("Mobile") != -1)
		//	isMobileDevice = true;

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}

		if("AddToNewChangeAction".equals(functionality) || "AddToNewCA".equals(functionality) || "addChangeActionUnderChangeOrder".equalsIgnoreCase(functionality) || "addChangeActionUnderChangeRequest".equalsIgnoreCase(functionality)){
			changeActionId = null;
		}

		if(null != changeActionId){
		IChangeAction mChangeAction=ChangeAction.getChangeAction(context, changeActionId);
		String strCAOwner = mChangeAction.getOwner(context);
		String currentUser = context.getUser();
		List followerNameList=mChangeAction.GetFollowers(context);
		Iterator followersList=followerNameList.iterator();
		while(followersList.hasNext()){
			String followerName=(String)followersList.next();
			String followerId=PersonUtil.getPersonObjectID(context, followerName);
			followers=followers.concat(followerId+",");
			finalFollowerList.addElement(followerId);
		}
		}


		if(followers.length()>0&&!followers.isEmpty()){
			followers = followers.substring(0,followers.length()-1);
			}
		if(!isMobileDevice && ("edit".equalsIgnoreCase(strMode) && isEditable)|| "create".equalsIgnoreCase(strMode))
		{
			String addFollower= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddFollower", context.getSession().getLanguage());
			String remove = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.Remove", context.getSession().getLanguage());
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"IsFollowerFieldModified\" id=\"IsFollowerFieldModified\" value=\"false\" readonly=\"readonly\" />"); 
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"FollowerHidden\" id=\"FollowerHidden\" value=\""+followers+"\" readonly=\"readonly\" />");
			sb.append("<table>");
			sb.append("<tr>");
			sb.append("<th rowspan=\"2\">");
			sb.append("<select name=\"Follower\" style=\"width:200px\" multiple=\"multiple\">");

			if (finalFollowerList!=null && !finalFollowerList.isEmpty()){
				for (int i=0;i<finalFollowerList.size();i++) {
					String followersId = (String) finalFollowerList.get(i);
					if (followersId!=null && !followersId.isEmpty()) {
						String followerName = new DomainObject(followersId).getInfo(context, DomainConstants.SELECT_NAME);
						String followerFullName = PersonUtil.getFullName(context, followerName);
						if (followerName!=null && !followerName.isEmpty()) {
							//XSSOK
							sb.append("<option value=\""+followersId+"\" >");
							//XSSOK
							sb.append(followerFullName);
							sb.append("</option>");

						}
					}
				}
			}

			sb.append("</select>");
			sb.append("</th>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:addPersonAsFollower()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addPersonAsFollower()\">");
			//XSSOK
			sb.append(addFollower);
			sb.append("</a>");
			//sb.append("</div>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:removeFollower()\">");
			sb.append("<img src=\"../common/images/iconStatusRemoved.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:removeFollower()\">");
			//XSSOK
			sb.append(remove);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("</table>");
		}else
		{
			if(!exportToExcel)
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"FollowerHidden\" id=\"FollowerHidden\" value=\""+followers+"\" readonly=\"readonly\" />");
			if (finalFollowerList!=null && !finalFollowerList.isEmpty()){
				for (int i=0;i<finalFollowerList.size();i++) {
					String  lastFollowerId=(String)finalFollowerList.get(finalFollowerList.size()-1);
					String followersId = (String) finalFollowerList.get(i);
					if (followersId!=null && !followersId.isEmpty()) {
						String followerName = new DomainObject(followersId).getInfo(context, DomainConstants.SELECT_NAME);
						String followerFullName = PersonUtil.getFullName(context, followerName);
						if (followerName!=null && !followerName.isEmpty()) {
							if(!exportToExcel)
							//XSSOK
							sb.append("<input type=\"hidden\" name=\""+followerFullName+"\" value=\""+followersId+"\" />");
							//XSSOK
							sb.append(followerFullName);
							if(!lastFollowerId.equalsIgnoreCase(followersId))
								if(!exportToExcel)
								sb.append("<br>");
								else
									sb.append("\n");
						}
					}
				}
			}
		}
		return sb.toString();
	}
	/**
  	 * Select the Contributor Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Contributor Field.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String selectContributor(Context context,String[] args)throws Exception
	{
		boolean isEditable = false;
		boolean isMobileDevice = false;
		StringBuilder sb = new StringBuilder();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String strMode = (String) requestMap.get("mode");
		String changeActionId = (String) requestMap.get("objectId");
		String contributors = DomainObject.EMPTY_STRING;
		StringList finalContributorList=new StringList();
		String functionality = (String) requestMap.get("functionality");
		if("edit".equalsIgnoreCase(strMode))
		isEditable = isTeamEditable(context,"AddContributor",changeActionId);

		String userAgentString = (String)requestMap.get("User-Agent");
		//if(!ChangeUtil.isNullOrEmpty(userAgentString) && userAgentString.indexOf("Mobile") != -1)
		//	isMobileDevice = true;
		

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}



		if("AddToNewChangeAction".equals(functionality) || "AddToNewCA".equals(functionality) || "addChangeActionUnderChangeOrder".equalsIgnoreCase(functionality) || "addChangeActionUnderChangeRequest".equalsIgnoreCase(functionality)){
			changeActionId = null;
		}

		if(null != changeActionId){
		IChangeAction mChangeAction=ChangeAction.getChangeAction(context, changeActionId);
		String strCAOwner = mChangeAction.getOwner(context);
		String currentUser = context.getUser();
		
		List contributorNameList=mChangeAction.GetContributors(context);
		Iterator contributorsItr=contributorNameList.iterator();
		while(contributorsItr.hasNext()){
			String contributorName=(String)contributorsItr.next();
			String contributorId=PersonUtil.getPersonObjectID(context, contributorName);
			contributors=contributors.concat(contributorId+",");
			finalContributorList.addElement(contributorId);
		}
		}

		if(contributors.length()>0&&!contributors.isEmpty()){
			contributors = contributors.substring(0,contributors.length()-1);
			}
		if(!isMobileDevice && ("edit".equalsIgnoreCase(strMode) && isEditable)|| "create".equalsIgnoreCase(strMode))
		{
			String addContributor= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddContributor", context.getSession().getLanguage());

			String remove = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.Remove", context.getSession().getLanguage());
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"IsContributorFieldModified\" id=\"IsContributorFieldModified\" value=\"false\" readonly=\"readonly\" />"); 
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"ContributorHidden\" id=\"ContributorHidden\" value=\""+contributors+"\" readonly=\"readonly\" />");
			sb.append("<table>");
			sb.append("<tr>");
			sb.append("<th rowspan=\"2\">");
			sb.append("<select name=\"Contributor\" style=\"width:200px\" multiple=\"multiple\">");

			if (finalContributorList!=null && !finalContributorList.isEmpty()){
				for (int i=0;i<finalContributorList.size();i++) {
					String contributorsId = (String) finalContributorList.get(i);
					if (contributorsId!=null && !contributorsId.isEmpty()) {
						String contributorName = new DomainObject(contributorsId).getInfo(context, DomainConstants.SELECT_NAME);
						String contributorFullName = PersonUtil.getFullName(context, contributorName);
						if (contributorName!=null && !contributorName.isEmpty()) {
							//XSSOK
							sb.append("<option value=\""+contributorsId+"\" >");
							//XSSOK
							sb.append(contributorFullName);
							sb.append("</option>");

						}
					}
				}
			}

			sb.append("</select>");
			sb.append("</th>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:addPersonAsContributor()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addPersonAsContributor()\">");
			//XSSOK
			sb.append(addContributor);
			sb.append("</a>");
			//sb.append("</div>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:removeContributor()\">");
			sb.append("<img src=\"../common/images/iconStatusRemoved.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:removeContributor()\">");
			//XSSOK
			sb.append(remove);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("</table>");
		}else
		{
			if(!exportToExcel)
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"ContributorHidden\" id=\"ContributorHidden\" value=\""+contributors+"\" readonly=\"readonly\" />");
			if (finalContributorList!=null && !finalContributorList.isEmpty()){
				for (int i=0;i<finalContributorList.size();i++) {
				String  lastContributorId=(String)finalContributorList.get(finalContributorList.size()-1);
					String contributorsId = (String) finalContributorList.get(i);
					if (contributorsId!=null && !contributorsId.isEmpty()) {
						String contributorName = new DomainObject(contributorsId).getInfo(context, DomainConstants.SELECT_NAME);
						String contributorFullName = PersonUtil.getFullName(context, contributorName);
						if (contributorName!=null && !contributorName.isEmpty()) {
							if(!exportToExcel)
							//XSSOK
							sb.append("<input type=\"hidden\" name=\""+contributorFullName+"\" value=\""+contributorsId+"\" />");
							//XSSOK
							sb.append(contributorFullName);
							if(!lastContributorId.equalsIgnoreCase(contributorsId))
								if(!exportToExcel)
							sb.append("<br>");
								else
									sb.append("\n");
						}
					}
				}
			}
		}
		return sb.toString();
	}
 	/**
  	 * Get Reviewers Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Reviewers Field.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String selectReviewers(Context context,String[] args)throws Exception
	{
		boolean isEditable = false;
		boolean isMobileDevice = false;
		StringBuilder sb = new StringBuilder();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String strMode = (String) requestMap.get("mode");
		String changeActionId = (String) requestMap.get("objectId");
		String styleDisplayPerson="block";
		String styleDisplayRouteTemplate="block";
		StringList finalReviewersList=new StringList();
		String relPattern =  new StringBuffer(ChangeConstants.RELATIONSHIP_CHANGE_REVIEWER).append(",").append(ChangeConstants.RELATIONSHIP_OBJECT_ROUTE).toString();
		String typePattern =  new StringBuffer(ChangeConstants.TYPE_PERSON).append(",").append(ChangeConstants.TYPE_ROUTE_TEMPLATE).toString();
		StringList objectSelects=new StringList(DomainObject.SELECT_ID);
		objectSelects.add(DomainObject.SELECT_TYPE);
		StringList personReviewersList=new StringList();
		StringList routeTemplateReviewersList=new StringList();
		String functionality = (String) requestMap.get("functionality");
		if("edit".equalsIgnoreCase(strMode))
		isEditable = isTeamEditable(context, "AddReviewer",changeActionId);

		String userAgentString = (String)requestMap.get("User-Agent");
		//if(!ChangeUtil.isNullOrEmpty(userAgentString) && userAgentString.indexOf("Mobile") != -1)
		//	isMobileDevice = true;

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}


		if("AddToNewChangeAction".equals(functionality) || "AddToNewCA".equals(functionality) || "addChangeActionUnderChangeOrder".equalsIgnoreCase(functionality) || "addChangeActionUnderChangeRequest".equalsIgnoreCase(functionality)){
			changeActionId = null;
		}

		if(null != changeActionId){
			IChangeAction iCa=ChangeAction.getChangeAction(context, changeActionId);
			String strCAOwner = iCa.getOwner(context);
			String currentUser = context.getUser();
		DomainObject changeAction = new DomainObject(changeActionId);
		MapList mapList=changeAction.getRelatedObjects(context,
				  relPattern,
				  typePattern,
				  objectSelects,
				  new StringList(DomainRelationship.SELECT_ID),
				  false,
				  true,
				  (short) 2,
				  null, null, (short) 0);

		if(!mapList.isEmpty()){
			Iterator iterator=mapList.iterator();
			while(iterator.hasNext()){
				Map dataMap=(Map)iterator.next();
				String objectType=(String)dataMap.get(DomainObject.SELECT_TYPE);
				String objectId=(String)dataMap.get(DomainObject.SELECT_ID);
				if(objectType.equalsIgnoreCase(ChangeConstants.TYPE_PERSON)){
					personReviewersList.add(objectId);
				}else if(objectType.equalsIgnoreCase(ChangeConstants.TYPE_ROUTE_TEMPLATE)){
					routeTemplateReviewersList.add(objectId);
				}
			}
		}
		}


		String reviewers = DomainObject.EMPTY_STRING;
		String reviewerstype = DomainObject.EMPTY_STRING;
		if(!routeTemplateReviewersList.isEmpty() && personReviewersList.isEmpty())
		{
			 styleDisplayPerson="none";
		}
		else if(routeTemplateReviewersList.isEmpty() && !personReviewersList.isEmpty())
		{
			styleDisplayRouteTemplate="none";
		}
		else if(!routeTemplateReviewersList.isEmpty() && !personReviewersList.isEmpty()){
			styleDisplayPerson="none";
		}
		if (personReviewersList!=null && !personReviewersList.isEmpty() && routeTemplateReviewersList.isEmpty()){
			for (int i=0;i<personReviewersList.size();i++) {
				String reviewersId = (String) personReviewersList.get(i);
				String reviewerType = new DomainObject(reviewersId).getInfo(context, DomainConstants.SELECT_TYPE);
				reviewers=reviewers.concat(reviewersId+",");
				reviewerstype=reviewerstype.concat(reviewerType+",");
				finalReviewersList.addElement(reviewersId);
			}
		}
			if (routeTemplateReviewersList!=null && !routeTemplateReviewersList.isEmpty()){
				for (int i=0;i<routeTemplateReviewersList.size();i++) {
					String reviewersId = (String) routeTemplateReviewersList.get(i);
					String reviewerType = new DomainObject(reviewersId).getInfo(context, DomainConstants.SELECT_TYPE);
					reviewers=reviewers.concat(reviewersId+",");
					reviewerstype=reviewerstype.concat(reviewerType+",");
					finalReviewersList.addElement(reviewersId);
				}

		}

		if(reviewers.length()>0&&!reviewers.isEmpty()){
			reviewers = reviewers.substring(0,reviewers.length()-1);
			reviewerstype = reviewerstype.substring(0,reviewerstype.length()-1);
		}
		if(!isMobileDevice && ("edit".equalsIgnoreCase(strMode) && isEditable)|| "create".equalsIgnoreCase(strMode))
		{
			String addRouteTemplate= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddRouteTemplate", context.getSession().getLanguage());
			String addPeople= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddPeople", context.getSession().getLanguage());
			String remove = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.Remove", context.getSession().getLanguage());
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"IsReviewerFieldModified\" id=\"IsReviewerFieldModified\" value=\"false\" readonly=\"readonly\" />");
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"ReviewersHidden\" id=\"ReviewersHidden\" value=\""+reviewers+"\" readonly=\"readonly\" />");
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"ReviewersHiddenType\" id=\"ReviewersHiddenType\" value=\""+reviewerstype+"\" readonly=\"readonly\" />");
			sb.append("<table>");
			sb.append("<tr>");
			sb.append("<th rowspan=\"3\">");
			sb.append("<select name=\"Reviewers\" style=\"width:200px\" multiple=\"multiple\">");

			if (finalReviewersList!=null && !finalReviewersList.isEmpty()){
				for (int i=0;i<finalReviewersList.size();i++) {
					String reviewersId = (String) finalReviewersList.get(i);
					if (reviewersId!=null && !reviewersId.isEmpty()) {
						String reviewerName = new DomainObject(reviewersId).getInfo(context, DomainConstants.SELECT_NAME);
						String reviewerFullName = PersonUtil.getFullName(context, reviewerName);
						if (reviewerName!=null && !reviewerName.isEmpty()) {

							sb.append("<option value=\""+reviewersId+"\" >");
							//XSSOK
							sb.append(reviewerFullName);
							sb.append("</option>");

						}
					}
				}
			}

			sb.append("</select>");
			sb.append("</th>");
			sb.append("<td>");
			sb.append("<div style=\"display:"+styleDisplayPerson+"\" name=\"ReviewrHidePerson\" id=\"ReviewrHidePerson\">");
			sb.append("<a href=\"javascript:addReviewSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addReviewSelectors()\">");
			//XSSOK
			sb.append(addPeople);
			sb.append("</a>");
			sb.append("</div>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<div style=\"display:"+styleDisplayRouteTemplate+"\" name=\"ReviewrHideRouteTemplate\" id=\"ReviewrHideRouteTemplate\">");
			sb.append("<a href=\"javascript:addRouteSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addRouteSelectors()\">");
			//XSSOK
			sb.append(addRouteTemplate);
			sb.append("</a>");
			sb.append("</div>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:removeReviewers()\">");
			sb.append("<img src=\"../common/images/iconStatusRemoved.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:removeReviewers()\">");
			//XSSOK
			sb.append(remove);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("</table>");
		}else
		{
			if(!exportToExcel)
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"ReviewersHidden\" id=\"ReviewersHidden\" value=\""+reviewers+"\" readonly=\"readonly\" />");
			if (finalReviewersList!=null && !finalReviewersList.isEmpty()){
				for (int i=0;i<finalReviewersList.size();i++) {
				String  lastReviewerId=(String)finalReviewersList.get(finalReviewersList.size()-1);
					String reviewersId = (String) finalReviewersList.get(i);
					if (reviewersId!=null && !reviewersId.isEmpty()) {
						String reviewerName = new DomainObject(reviewersId).getInfo(context, DomainConstants.SELECT_NAME);
						String reviewerFullName = PersonUtil.getFullName(context, reviewerName);
						if (reviewerName!=null && !reviewerName.isEmpty()) {
							if(!exportToExcel)
							//XSSOK
							sb.append("<input type=\"hidden\" name=\""+reviewerFullName+"\" value=\""+reviewersId+"\" />");
							//XSSOK
							sb.append(reviewerFullName);
							if(!lastReviewerId.equalsIgnoreCase(reviewersId))
								if(!exportToExcel)
							sb.append("<br>");
								else
									sb.append("\n");

							//get all the members of route template attached to CA and show on properties page- IR-707371
							if(reviewerstype.equals("Route Template"))
							{
								sb.append("<tr>");
								sb.append("<td>");
								sb.append("</td>");
								sb.append("<td colspan=\"3\">");
								changeCommonApp = new com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeCommon();
								changeCommonApp.setId(changeActionId);
								sb.append(changeCommonApp.getMembersBasedOnPurpose(context,"Standard",exportToExcel));
								sb.append("</td>");
								sb.append("</tr>");
							}
						}
					}
				}
			}
		}
		return sb.toString();
	}
	/**
	 * This method is used as access function for add/remove Team .
	 * @param context
	 * @param String Function name
	 * @param Change Action id
	 * @return True or False
	 * @throws Exception
	 */
	public boolean isTeamEditable(Context context,String functionName,String objectID) throws Exception {
		return ChangeAction.getAccess(context, functionName, objectID);		
	}

    /**Method to transfer the ownership of CO from properties page
    *
    */
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void transferOwnership(Context context, String[] args) throws Exception {

       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       HashMap requestMap = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);

       String transferReason = (String)requestMap.get(ChangeConstants.TRANSFER_REASON);
       String objectId 		 = (String)requestMap.get(ChangeConstants.OBJECT_ID);
       String newOwner 		 = (String)requestMap.get(ChangeConstants.NAME);
       String Organization   = (String) requestMap.get("Organization");
       String project        = (String) requestMap.get("Project");
       String []params 	     = {transferReason,newOwner};
       
       try{
		   
			StringList objectSelects = new StringList(SELECT_OWNER);objectSelects.addElement(SELECT_TYPE);
			DomainObject domainObject = new DomainObject(objectId);
		   
			Map<String,String> objectInfo   = (Map<String,String>)domainObject.getInfo(context,objectSelects);
			String currentOwner = objectInfo.get(SELECT_OWNER);
	   
			//domainObject.TransferOwnership(context, newOwner, project, Organization);
		   
			StringBuffer transferCommentBuffer = new StringBuffer(1024);
			transferCommentBuffer.append(transferReason);

			ContextUtil.pushContext(context, ChangeConstants.USER_AGENT, null, null);
			ChangeUtil.addHistory(context, objectId, "TransferHistory", transferCommentBuffer.toString());
			ContextUtil.popContext(context);
			
			domainObject.TransferOwnership(context, newOwner, project, Organization);
             
         } catch(Exception e){
			 
			e.printStackTrace();
			
			//in case transfer is not successful, transfer comment should be removed
			ContextUtil.pushContext(context);
			String strCommandHistory    = "modify bus $1 delete history last";
			MqlUtil.mqlCommand(context, strCommandHistory, objectId);
			ContextUtil.popContext(context);
			
             emxContextUtil_mxJPO.mqlNotice(context,e.getMessage());
         }
   }

   /**
	 * This method is used as access function for add proposed change of Change Action.
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
   	public boolean isProposedAddAllowed(Context context,String[] args) throws Exception{
	   HashMap programMap = (HashMap) JPO.unpackArgs(args);
	   String functionName = "AddProposed";
	   String objectID = (String) programMap.get("objectId");
	   try{
		   return ChangeAction.getAccess(context, functionName, objectID);
	   }catch(Exception e)
	   {
		   return false;
	   }
	}
   
   /**
	 * This method is used as access function for edit proposed change of Change Action.
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */

	public boolean isProposedEditAllowed(Context context,String[] args) throws Exception{
	   HashMap programMap = (HashMap) JPO.unpackArgs(args);
	   String functionName = "AddProposed";
	   String objectID = (String) programMap.get("objectId");
	   //IChangeAction changeActionObj = ChangeAction.getChangeAction(context, objectID);
	   //boolean isResolutionItemActivated = false;
	   
	   try{
	   		//isResolutionItemActivated = JPO.invoke(context,"enoECMChangeUX",null,"isResolutionItemActivated",new String[0],Boolean.class);

		    return (ChangeAction.getAccess(context, functionName, objectID) || 
		   			ChangeAction.getAccess(context, "proposedStatusAsComplete", objectID) ||
		   			ChangeAction.getAccess(context, "proposedStatusAsRejected", objectID) ||
		   			ChangeAction.getAccess(context, "proposedStatusAsIgnored", objectID) ||
		   			ChangeAction.getAccess(context, "proposedStatusAsStarted", objectID) ||
		   			ChangeAction.getAccess(context, "proposedStatusAsNotStarted", objectID)
		   	);
	   }catch(Exception e)
	   {
		   return false;
	   }
	}
   
   /**
	 * This method is used as access function for remove proposed change of Change Action.
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
   	public boolean isProposedRemoveAllowed(Context context,String[] args) throws Exception{
	   HashMap programMap = (HashMap) JPO.unpackArgs(args);
	   String functionName = "DeleteProposed";
	   String objectID = (String) programMap.get("objectId");
	   try{
		   return ChangeAction.getAccess(context, functionName, objectID);
	   }catch(Exception e)
	   {
		   return false;
	   }
	}

	/**
     * This method performs the cancel process of change Action
     *
     * @param context
     *            the eMatrix <code>Context</code> object.
     * @param args
     *            holds the following input arguments: - The ObjectID of the
     *            Change Action
     * @throws Exception
     *             if the operation fails.
     * @since ECM R422.
     */

    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void cancelChangeAction(Context context, String[] args) throws Exception

    {
        HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = ChangeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		String cancelReason  = ChangeUtil.isNullOrEmpty((String)paramMap.get("cancelReason"))? (String)requestMap.get("Reason") : (String)paramMap.get("cancelReason");

		IChangeAction changeActionObj = ChangeAction.getChangeAction(context, objectId);
		changeActionObj.cancel(context,cancelReason);
    }

	/**
     * @author
     * this method performs the hold process of Change Action.
     *
     *
     * @param context
     *            the eMatrix <code>Context</code> object.
     * @param args
     *            holds the following input arguments: - The ObjectID of the
     *            Change Process
     * @throws Exception
     *             if the operation fails.
     * @since ECM R422_HF2.
     */
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void holdChangeAction(Context context, String[] args)throws Exception {

        HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap)paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = ChangeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		String holdReason  = ChangeUtil.isNullOrEmpty((String)paramMap.get("holdReason"))? (String)requestMap.get("Reason") : (String)paramMap.get("holdReason");
		
		IChangeAction changeActionObj = ChangeAction.getChangeAction(context, objectId);
		changeActionObj.setOnHold(context, holdReason);
    }

	/**
  	 * showCANameRelatedToCO
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Related CA Names for CRCO.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public Vector showCANameRelatedToCO(Context context, String[] args) throws Exception
	{
		//XSSOK
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
		Vector vecReturn   = null;
		StringBuffer sb    = null;
		try
		{
			vecReturn = new Vector(objectList.size());
			Map map = null;
			String strObjID     = "";
			String strObjType   = "";
			String strObjName   = "";
			String strTreeLink			= "";
			StringBuffer objectIcon		= new StringBuffer();

			Iterator objectItr = objectList.iterator();

			while (objectItr.hasNext()) {
				map = (Map)objectItr.next();
				sb = new StringBuffer(500);
				strObjType 	 = (String)map.get("type");
				objectIcon.append(UINavigatorUtil.getTypeIconProperty(context, strObjType));
				strObjName   = (String)map.get("name");
				strObjID = (String)map.get("id");
				strTreeLink = "<a class=\"object\" href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, strObjID) + "&amp;DefaultCategory=ECMCAAffectedItems', '800', '575','true','content')\"><img border='0' src='../common/images/"+XSSUtil.encodeForHTMLAttribute(context, objectIcon.toString())+"'/>"+XSSUtil.encodeForHTML(context, strObjName)+"</a>";
				sb.append(strTreeLink);
                objectIcon.setLength(0);

				vecReturn.addElement(sb.toString());

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}

		return vecReturn;

	}
	/**
	 * Displays Name on CA Summary page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean isNameColumnOnSummaryPage(Context context,String []args) throws Exception {
		return (!isRelatedCANameUnderCRCO(context,args));
	}
	/**
	 * Displays Name on under CR\CO
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean isRelatedCANameUnderCRCO(Context context,String []args) throws Exception {

		boolean sReturn = false;
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		String sfunctionality = (String) paramMap.get("functionality");
		if("showCRCOAffectedChangeActions".equals(sfunctionality))
		{
			sReturn = true;
		}
		return sReturn;
	}

	/**
	 * This method is used as access function for Create Impact analysis command in Change Action context.
	 * @param context
	 * @param String args
	 * @return True or False
	 * @throws Exception
	 */
	public boolean hasCreateImpactAnalysisAccess(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String objectType = new DomainObject(strObjId).getInfo(context, SELECT_TYPE);
		
		return  ChangeAction.getAccess(context, "ImpactAnalysis", strObjId);
	}
	/**
	 * This method is used as access function for Delete Impact analysis command in Change Action context.
	 * @param context
	 * @param String args
	 * @return True or False
	 * @throws Exception
	 */
	public boolean hasDeleteImpactAnalysisAccess(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String objectType = new DomainObject(strObjId).getInfo(context, SELECT_TYPE);
		
		return  ChangeAction.getAccess(context, "ImpactAnalysis", strObjId);
	}

	/**
	* Displays the Range Values on Edit for Proposed Change Status at CAAffectedItemsTable..
	* @param	context the eMatrix <code>Context</code> object
	* @param	args holds a HashMap containing the following entries:
	* @param   HashMap containing the following keys, "objectId"
	* @return  HashMap contains actual and display values
	* @throws	Exception if operation fails
	* @since   ECM R422
	*/
	public HashMap displayPropsedChangeStatusRange(Context context,String[] args) throws Exception
	{
		HashMap rangeMap = new HashMap ();
		StringList listChoices     = new StringList();
	    StringList listDispChoices = new StringList();
	    String strLanguage  	   =  context.getSession().getLanguage();
		
		ProposedActivityStatus[] rangeArray = ProposedActivityStatus.values();

		
		for (int index = 0; index < rangeArray.length; index++) {
			String key = rangeArray[index].toString();
			//Not have to include deprecated in range and ignored(in first release)
			if(key.equals(ProposedActivityStatus.DEPRECATED.toString()) || key.equals(ProposedActivityStatus.IGNORED.toString())) {
				continue;
			}
			else {
				listChoices.add(key);
				String nlsKey = key.replace(" ", "_");
				listDispChoices.add(EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Range.Proposal_Status."+nlsKey,strLanguage));
			}
  
        }

	    rangeMap.put("field_choices", listChoices);
	    rangeMap.put("field_display_choices", listDispChoices);

	    return rangeMap;
	}

	/**
	 * Program to get Column(Status) value For Proposed Change Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return       Vector of column value
	 * @throws        Exception if the operation fails
	 **
	*/
	public Vector showProposedChangeStatus(Context context, String args[])throws Exception
	{
		//XSSOK
		Vector columnVals = null;

		String showColumnKey=ChangeConstants.PROPOSAL_STATUS;
		try {
			columnVals=showProposedChangeColumn(context, args,showColumnKey);
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e.getMessage());
		}
	}//end of method

	/**
	 * Program to get Column value For Proposed Change Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return        Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 */
	public Vector showProposedChangeColumn(Context context, String args[],String showColumnKey)throws Exception
	{
		//XSSOK
		Vector columnVals = new Vector();
		String objectId = "";
		String key = "";
		String objectRequestedChange = "";
		String strLanguage  	   =  context.getSession().getLanguage();
		try {
			HashMap programMap = (HashMap)JPO.unpackArgs(args);

			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);

			StringList sObjectRequestedChangeList = changeUtil.getStringListFromMapList(objectList,showColumnKey);

			if (objectList == null || objectList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector(sObjectRequestedChangeList.size());
			}
			for(int i=0;i<sObjectRequestedChangeList.size();i++){
				objectRequestedChange = (String) sObjectRequestedChangeList.get(i);
				
				if(showColumnKey != null && showColumnKey.equals(ChangeConstants.PROPOSAL_STATUS)){
				key = objectRequestedChange.replace(" ", "_");
				objectRequestedChange = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Range.Proposal_Status."+key,strLanguage);
				}
				if(showColumnKey != null && showColumnKey.equals(DomainConstants.ATTRIBUTE_REQUESTED_CHANGE)){
				key = objectRequestedChange.replace(" ", "_");
				objectRequestedChange = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Range.Requested_Change."+key,strLanguage);
				}
				if(showColumnKey != null && showColumnKey.equals(ChangeConstants.RESOLUTION_ITEM)){
					objectRequestedChange = getResolutionItemFieldHTML(context, objectRequestedChange);
				}
				columnVals.add(objectRequestedChange);
			}
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e.getMessage());
		}
	}//end of method
	/**
	 * Program to get HTML for Resolution Item field in CAAffectedItems table
	 * @param context the eMatrix <code>Context</code> object
	 * @param objectResolutionItem data for creating HTML
	 *          
	 * @return        Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 */
	public String  getResolutionItemFieldHTML(Context context, String objectResolutionItem){
		HashMap<String, String> map = new HashMap<>();
		objectResolutionItem = objectResolutionItem.substring(1, objectResolutionItem.length()-1);
		String resolutionItemArr[] = objectResolutionItem.split(",");
		for(int i=0;i<resolutionItemArr.length;i++){
			String data = resolutionItemArr[i];
			String dataArr[] = data.split("=");
			if(dataArr.length==1){
				return "";
			}
			else{
				
				map.put(dataArr[0].trim(),dataArr[1].trim());
			}
		
		}
		String strObjID = (String)map.get("id");
		String strObjType 	 = (String)map.get("type");
		String strObjName   = (String)map.get("name");
		String strObjRevision   = (String)map.get("revision");
		
		//check from icons cached in iconMap
		String objectIcon;
		if(iconMap.containsKey(strObjType)){
			objectIcon = iconMap.get(strObjType);
		}
		else{
			objectIcon = UINavigatorUtil.getTypeIconProperty(context, strObjType);
			iconMap.put(strObjType,objectIcon);
		}

		String strTreeLink = "<a class=\"object\" href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, strObjID) + "&amp;DefaultCategory=ECMCAAffectedItems', '800', '575','true','content')\" title=\""+XSSUtil.encodeForHTML(context, strObjName)+" "+XSSUtil.encodeForHTML(context, strObjRevision)+" \"><img border='0' src='../common/images/"+XSSUtil.encodeForHTMLAttribute(context, objectIcon.toString())+"'/>"+XSSUtil.encodeForHTML(context, strObjName)+" "+XSSUtil.encodeForHTML(context, strObjRevision)+"</a>";

		return strTreeLink;
	}
	
	/**
	 * Method to update Proposed Change Status
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public void updateProposedChangeStatus(Context context, String[] args) throws Exception
	{
		try
		{

			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap requestMap   = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);
			String strChangeActionId = (String) requestMap.get("objectId");
			HashMap paramMap   = (HashMap)programMap.get("paramMap");
			String newStatus = (String)paramMap.get("New Value");
			
			IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeActionId);

			String strProposedActivityRelId = (String)paramMap.get("relId");
			String[] relationshipIds=new String[1];
			StringList selectable=new StringList( DomainRelationship.SELECT_TYPE);
			selectable.add("to.physicalid");
			relationshipIds[0]=strProposedActivityRelId;
			DomainRelationship ProposedActivityRel =new DomainRelationship(strProposedActivityRelId);
			MapList mapList=ProposedActivityRel.getInfo(context, relationshipIds,selectable);
			Map map=(Map)mapList.get(0);
			
			List<IProposedChanges> proposedChanges = iChangeAction.getProposedChanges(context);

			for(IProposedChanges proposed : proposedChanges)
			{
				String currentProposedPhysicalId = proposed.getBusinessObject().getObjectId(context);
				if(map.get("to.physicalid").equals(currentProposedPhysicalId))
				{
					if(!ChangeUtil.isNullOrEmpty(newStatus)){
						proposed.setStatusAs(context, newStatus);
					}
					
				}
			}
		}
		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}

	/**
	 * Method to update Proposed Resolution Item
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public void updateProposedResolutionItem(Context context, String[] args) throws Exception
	{
		try
		{
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap requestMap   = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);
			String strChangeActionId = (String) requestMap.get("objectId");
			HashMap paramMap   = (HashMap)programMap.get("paramMap");
			String resolutionItemId = (String)paramMap.get("New Value");
			
			IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeActionId);

			String strProposedActivityRelId = (String)paramMap.get("relId");
			String[] relationshipIds=new String[1];
			StringList selectable=new StringList( DomainRelationship.SELECT_TYPE);
			selectable.add("to.physicalid");
			relationshipIds[0]=strProposedActivityRelId;
			DomainRelationship ProposedActivityRel =new DomainRelationship(strProposedActivityRelId);
			MapList mapList=ProposedActivityRel.getInfo(context, relationshipIds,selectable);
			Map map=(Map)mapList.get(0);
			
			List<IProposedChanges> proposedChanges = iChangeAction.getProposedChanges(context);

			for(IProposedChanges proposed : proposedChanges)
			{
				String currentProposedPhysicalId = proposed.getBusinessObject().getObjectId(context);
				if(map.get("to.physicalid").equals(currentProposedPhysicalId))
				{
					if(!ChangeUtil.isNullOrEmpty(resolutionItemId)){
						BusinessObject resolutionItemBO = new BusinessObject(resolutionItemId);
						proposed.setResolution(context, resolutionItemBO);
					} 
					else {
						proposed.removeResolution(context);
					}
					
				}
			}
		}
		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}

	/**
	 * Program to get Column(Resolution Item) value For Proposed Change Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return       Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 */
	public Vector showProposedResolutionItem(Context context, String args[])throws Exception
	{
		//XSSOK
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		Vector columnVals = null;
		String showColumnKey=ChangeConstants.RESOLUTION_ITEM;
		try {
			columnVals=showProposedChangeColumn(context, args,showColumnKey);
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e.getMessage());
		}
	}
        /**
	 * Program to get Column(Revision Cue) value For Proposed Change Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 * @return       Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 */
	public Vector showRevisionCue(Context context, String args[])throws Exception
	{
		//XSSOK
		Vector columnVals = new Vector();
		String showColumnKey=ChangeConstants.RESOLUTION_ITEM;
		
		try {

			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get("paramList");
			String parentCAId = (String) paramMap.get("parentOID");
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);

			if (objectList == null || objectList.size() == 0){
				return columnVals;
			}

			String objectId, relId, strContextID;
			boolean isLastVersion;
			columnVals = new Vector(objectList.size());

			StringList objectIdList = changeUtil.getStringListFromMapList(objectList,"id");
			StringList proposalStatusList = changeUtil.getStringListFromMapList(objectList,"ProposalStatus");
			StringList relIdList = changeUtil.getStringListFromMapList(objectList,"id[connection]");
			String[] objectPhyIdArr = new String[objectList.size()];
			Map<String,IRequestLastVersion> candidateVersionReqs = new HashMap<String,IRequestLastVersion>() ;
			IVersioningServices	versioningServices = VersioningFactory.getVersioningServices();
			int nIntentMask = ENOVersioningSemanticRelationType.InitSemanticIntentMask(ENOVersioningSemanticRelationType.EVOLUTION) ;
			
			for(int i=0;i<objectList.size();i++){
				objectId = (String) objectIdList.get(i);
				DomainObject rootDom = new DomainObject(objectId);
			    strContextID = rootDom.getInfo(context, "physicalid");
			    objectPhyIdArr[i] = strContextID;
			    candidateVersionReqs.put(strContextID, versioningServices.newRequestLastVersion(strContextID)) ;
			}

			versioningServices.getLastVersions(context,nIntentMask, candidateVersionReqs);

			String toolTip= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Label.SwitchToHigherRevisionTooltip", context.getSession().getLanguage());

			for(int i=0;i<objectList.size();i++){
				isLastVersion =  candidateVersionReqs.get(objectPhyIdArr[i]).isLastVersion() ;
				objectId = (String) objectIdList.get(i);
				relId = (String) relIdList.get(i);
				String strTreeLink = "";
				if(!isLastVersion){
					//IR-787090
					if(proposalStatusList.get(i).equals(ProposedActivityStatus.COMPLETE.toString()))
					{
						strTreeLink = "<img border='0' src='../common/images/ExploreRevisions32.png' height='22' width='22' title='"+toolTip+"' style=\" -webkit-filter: grayscale(1); filter: grayscale(1);\"/>";
					}
					else strTreeLink = "<a class=\"object\" href=\"JavaScript:emxTableColumnLinkClick('../enterprisechangemgtapp/ECMRevisionExplorer.jsp?functionality=higherRevisionPopup&amp;parentOID=" + XSSUtil.encodeForHTMLAttribute(context, parentCAId) + "&amp;objectId=" + XSSUtil.encodeForHTMLAttribute(context, objectId) + "&amp;relId=" + XSSUtil.encodeForHTMLAttribute(context, relId) + "', '800', '575','true','popup')\"><img border='0' src='../common/images/ExploreRevisions32.png' height='22' width='22' title='"+toolTip+"'/></a>";
				}
				columnVals.add(strTreeLink);
			}
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e.getMessage());
		}
	}

	/**
	 * Program to refresh Proposed Change Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 * @return       Map of action value
	 * @throws        Exception if the operation fails
	 **
	 */

	@com.matrixone.apps.framework.ui.PostProcessCallable
	public Map editAffectedItemsPostProcess(Context context, String[] args) throws Exception {
      Map returnMap = new HashMap();
      try{
		    returnMap.put ("Action", "execScript");
	        returnMap.put("Message", "{ main:function()  {var frame = findFrame(getTopWindow(),\"ECM3DAffectedItemsCA\");frame.location.href = frame.location.href+\"&mode=edit\";}}");    	
      	}catch(Exception e){
           throw e;
      	}
      	return returnMap;
  	}
	
	
	/**
	 * This method is used as access function for editCA command .
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
	public boolean isChangeActionEditable(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return  ChangeAction.getAccess(context, "Edit", strObjId);
	}
	
	/**
	 * This method is used as access function for Transfer ownership command .
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
	public boolean isChangeActionTransferable(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return  ChangeAction.getAccess(context, "Transfer", strObjId);		
	}
	
	
	/**
	 * Updates the Change Order in CA WebForm.
	 * @param context the eMatrix <code>Context</code> object
	 * @param args contains a MapList with the following as input arguments or entries:
	 * objectId holds the context CA object Id
	 * @throws Exception if the operations fails
	 * @since ECM-R418
	 */
	public void connectChangeOrder(Context context, String[] args) throws Exception {

		try {
			//unpacking the Arguments from variable args
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get("paramMap");
			HashMap requestMap = (HashMap)programMap.get("requestMap");
			String CAId    = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			String COId    = (String)paramMap.get("New Value");
            String relChangeAction = PropertyUtil.getSchemaProperty(context, "relationship_ChangeAction");
            this.setId(CAId);
            String strChangeActionRelId = getInfo(context, "to["+ relChangeAction +"].id");
            if(!ChangeUtil.isNullOrEmpty(strChangeActionRelId))
			{
				DomainRelationship.disconnect(context, strChangeActionRelId);
			}
			if(!ChangeUtil.isNullOrEmpty(CAId) && !ChangeUtil.isNullOrEmpty(COId))
			{
				ChangeAction changeAction = new ChangeAction(CAId);
				//ChangeOrder changeOrder = new ChangeOrder(COId);
				//DomainRelationship.connect(context, changeOrder, ChangeConstants.RELATIONSHIP_CHANGE_ACTION, changeAction);
				ChangeOrder changeOrder = new ChangeOrder(COId);
				changeOrder.addChangeActions(context, new String[]{CAId});
			}
		}

		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}
	
	/**
	 * This method check if manage members are allowed on CA
	 * @param context
	 * @param args
	 * @return 
	 * @throws Exception
	 */
		@com.matrixone.apps.framework.ui.PreProcessCallable
	public void checkEditAccessOnField(Context context, String args[]) throws Exception {
		try {
			Map programMap = JPO.unpackArgs(args);
			Map requestMap = (Map) programMap.get("requestMap");
			
			String strObjectId = (String) requestMap.get("parentOID");
			String formName    = (String) requestMap.get("form");
			
			Map<?, ?> formMap = (Map<?, ?>) programMap.get("formMap");
			MapList formFieldList = (MapList) formMap.get("fields");
					
			boolean isAddContributorAllowed = false;
			boolean isAddFollowerAllowed = false;
			boolean isAddReviewerAllowed = false;
	
			isAddContributorAllowed = ChangeAction.getAccess(context, "AddContributor", strObjectId);
			
			isAddFollowerAllowed = ChangeAction.getAccess(context, "AddFollower", strObjectId);
			
			isAddReviewerAllowed = ChangeAction.getAccess(context, "AddReviewer", strObjectId);
			
			if(formName.equals("type_ChangeAction")){
				for (Object map : formFieldList) {
					Map fieldMap = (Map) map;
					String strFieldName = (String) fieldMap.get(DomainObject.SELECT_NAME);
				
					if ((strFieldName.equals("Contributor") && !isAddContributorAllowed) || (strFieldName.equals("Follower") && !isAddFollowerAllowed) || (strFieldName.equals("Reviewers") && !isAddReviewerAllowed)) {
						Map settingMap = (Map) fieldMap.get("settings");
						settingMap.put("Editable", "false");
					}
				}
			}

		}
		catch (Exception e) {
			throw new Exception(e.getLocalizedMessage());
		}
	}

}
