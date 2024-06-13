/*
 * ${CLASSNAME}
 *
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 *
 *
 */


import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.Vector;

import matrix.db.Attribute;
import matrix.db.AttributeList;
import matrix.db.AttributeType;
import matrix.db.BusinessObject;
import matrix.db.BusinessObjectWithSelect;
import matrix.db.Context;
import matrix.db.ExpansionIterator;
import matrix.db.JPO;
import matrix.db.RelationshipWithSelect;
import matrix.db.RelationshipType;
import matrix.db.Query;
import matrix.db.QueryIterator;
import matrix.util.StringList;
import matrix.util.SelectList;

import com.dassault_systemes.enovia.changeaction.factory.ChangeActionFactory;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeAction;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeActionServices;
import com.dassault_systemes.enovia.changeaction.interfaces.IProposedChanges;
import com.dassault_systemes.enovia.changeaction.interfaces.IRealizedChange;
import com.dassault_systemes.enovia.changedependencies.factory.ChangeDependenciesFactory;
import com.dassault_systemes.enovia.changedependencies.interfaces.IChangeDependenciesServices;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeCommon;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeAction;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeManagement;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeOrder;
//import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeOrderUI;
import com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil;
import com.dassault_systemes.oslc.utils.OslcCommonUtils;
import com.matrixone.apps.common.Company;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.common.Route;
import com.matrixone.apps.common.RouteTemplate;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MailUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.domain.util.mxType;
import com.matrixone.apps.framework.ui.UICache;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;

/**
 * The <code>enoECMChangeOrderBase</code> class contains methods for executing JPO operations related
 * to objects of the admin type  Change.
 * @author/R3D
 * @version Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */
public class enoECMChangeOrderBase_mxJPO extends emxDomainObject_mxJPO {


	/********************************* MAP SELECTABLES/*********************************
    /** A string constant with the value "field_Choices". */
	private static String FIELD_CHOICES = "field_choices";
	/** A string constant with the value "field_display_choices". */
	private static String FIELD_DISPLAY_CHOICES = "field_display_choices";
	private static final String INFO_TYPE_ACTIVATED_TASK  = "activatedTask";
	public static final String SUITE_KEY = "EnterpriseChangeMgt";
	private static final String SOURCE_TYPE = "sourceType";
	private static final String TYPE_CHANGE_REQUEST = "type_ChangeRequest";

	private ChangeUtil changeUtil       =  null;
	//private ChangeOrderUI changeOrderUI =  null;
	private ChangeOrder changeOrder     =  null;



	/**
	 * Default Constructor.
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds no arguments
	 * @throws        Exception if the operation fails
	 * @since         Ecm R211
	 **
	 */
	@Deprecated
	public enoECMChangeOrderBase_mxJPO (Context context, String[] args) throws Exception {

		super(context, args);
		changeUtil    = new ChangeUtil();
		//changeOrderUI = new ChangeOrderUI();
		changeOrder   = new ChangeOrder ();
	}

	/**
	 * Main entry point.
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds no arguments
	 * @return        an integer status code (0 = success)
	 * @throws        Exception when problems occurred in the Common Components
	 * @since         Common X3
	 **
	 */
	@Deprecated
	public int mxMain (Context context, String[] args) throws Exception {
		if (!context.isConnected()) {
			i18nNow i18nnow = new i18nNow();
			String strContentLabel = EnoviaResourceBundle.getProperty(context,
					ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(), "EnterpriseChangeMgt.Error.UnsupportedClient");
			throw  new Exception(strContentLabel);
		}
		return  0;
	}


	/**
	 * @author
	 * Updates the Reported Against field in CO WebForm.
	 * @param context the eMatrix <code>Context</code> object
	 * @param args contains a MapList with the following as input arguments or entries:
	 * objectId holds the context ECR object Id
	 * New Value holds the newly selected Reported Against Object Id
	 * @throws Exception if the operations fails
	 * @since ECM-R211

	 */
	@Deprecated
	public DomainRelationship connectReportedAgainstChange (Context context, String[] args) throws Exception {

		try{
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
			String strObjectId = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			String strOldValue = (String) new DomainObject(strObjectId).getInfo(context, "from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.id");
			paramMap.replace(ChangeConstants.OLD_VALUE, strOldValue);
			return connect(context,paramMap,ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE);

		}catch(Exception ex){
			ex.printStackTrace();
			throw  new FrameworkException((String)ex.getMessage());
		}
	}

	/**
	 * @author
	 * Updates the Responsible Organisation in CO WebForm.
	 * @param context the eMatrix <code>Context</code> object
	 * @param args contains a MapList with the following as input arguments or entries:
	 * objectId holds the context CO object Id
	 * @throws Exception if the operations fails
	 * @since ECM-R211
	 */
	@Deprecated
	public void connectResponsibleOrganisation(Context context, String[] args) throws Exception {

		try {
			//unpacking the Arguments from variable args
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
			String objectId    = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			String strROName     = (String)paramMap.get("New Value");
			changeOrder.setId(objectId);
			if(UIUtil.isNotNullAndNotEmpty(strROName)) {
				String strProject = changeOrder.getInfo(context, SELECT_PROJECT);
				//changed for IR-994761
				//changeOrder.setPrimaryOwnership(context, ChangeUtil.getDefaultProject(context), strROName);
				changeOrder.setPrimaryOwnership(context, strProject, strROName); 
	  		}
		}

		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}

	/**
	 * @author
	 * Updates the Responsible Organisation in CO WebForm.
	 * @param context the eMatrix <code>Context</code> object
	 * @param args contains a MapList with the following as input arguments or entries:
	 * objectId holds the context CO object Id
	 * @throws Exception if the operations fails
	 * @since ECM-R211
	 */
	@Deprecated
	public DomainRelationship connectChangeCoordinator(Context context, String[] args) throws Exception {

		try {
			//unpacking the Arguments from variable args
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get("paramMap");

			return connect(context,paramMap,ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR);
		}

		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}

	/**
	 * @author
	 * Updates the Responsible Organisation in CO WebForm.
	 * @param context the eMatrix <code>Context</code> object
	 * @param args contains a MapList with the following as input arguments or entries:
	 * objectId holds the context CO object Id
	 * @throws Exception if the operations fails
	 * @since ECM-R211
	 */
	private DomainRelationship connect(Context context, HashMap paramMap,String targetRelName) throws Exception {

		try {
			String objectId    = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			changeOrder.setId(objectId);
			return changeOrder.connect(context,paramMap,targetRelName, true);
		}

		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}
	/**
	 * @author
	 * Generates dynamic query for Change Coordinator field
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 */
	@Deprecated
	public String getChangeCoordinatorDynamicSearchQuery(Context context, String[] args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		Map fieldValuesMap = (HashMap)programMap.get(ChangeConstants.FIELD_VALUES);
		Map requestMap     = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);

		String orgId = null;
		if(fieldValuesMap.containsKey(ChangeConstants.RESPONSIBLE_ORGANISATION_OID) &&
				fieldValuesMap.get(ChangeConstants.RESPONSIBLE_ORGANISATION_OID) != null
				&& fieldValuesMap.get(ChangeConstants.RESPONSIBLE_ORGANISATION_OID) instanceof String) {
			orgId = (String) fieldValuesMap.get(ChangeConstants.RESPONSIBLE_ORGANISATION_OID);
		}

		if(UIUtil.isNullOrEmpty(orgId)){
		String changeObjID = (String)requestMap.get(ChangeConstants.OBJECT_ID);
			if(UIUtil.isNotNullAndNotEmpty(changeObjID)){
				orgId = ChangeUtil.getRtoIdFromName(context, DomainObject.newInstance(context, changeObjID).getInfo(context, SELECT_ORGANIZATION));
			}
		}
		return "MEMBER_ID="+orgId+":USERROLE=role_ChangeCoordinator,role_VPLMProjectLeader";

	}

	/**
	 * @author
	 * Method for including Review Route templates owned by context user
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 */
	/*	@com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
	public Object includeReviewRouteTemplates(Context context, String[] args) throws Exception {
		String objWhere = "attribute[" + ATTRIBUTE_ROUTE_BASE_PURPOSE + "]== Review && current == Active";
		MapList routeTemplateList = (MapList)changeOrderUI.getRouteTemplates(context,objWhere);
		return  changeUtil.getStringListFromMapList(routeTemplateList,SELECT_ID);
	}*/
	/**
	 * @author
	 * Method for including Approval Route templates
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 */
	/*@com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
	public Object includeApprovalRouteTemplates(Context context, String[] args) throws Exception {
		String objWhere = "attribute[" + ATTRIBUTE_ROUTE_BASE_PURPOSE + "]== Approval && current == Active";
		MapList routeTemplateList = (MapList)changeOrderUI.getRouteTemplates(context,objWhere);
		return  changeUtil.getStringListFromMapList(routeTemplateList,SELECT_ID);
	}*/

	/**
	 * @author
	 * Generates dynamic query for Tech/Sr Tech Assignee Chooser fields from CO affected items table.
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 */
	@Deprecated
	public String getRoleDynamicSearchQuery(Context context, Map programMap,boolean isTechRole) throws Exception {
		Map requestMap     = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
		String changeObjID = (String)requestMap.get(ChangeConstants.OBJECT_ID);
		Map fieldValuesMap = (HashMap)programMap.get("typeAheadMap");
		String RTOId = "";
		String techRole  = "";
		if(fieldValuesMap != null & fieldValuesMap.size() > 0) {
			String caID = (String)fieldValuesMap.get(ChangeConstants.ROW_OBJECT_ID);
			RTOId = ChangeUtil.getRtoIdFromName(context, DomainObject.newInstance(context, caID).getInfo(context, SELECT_ORGANIZATION));
		}
		if(changeUtil.isNullOrEmpty(RTOId)) {
			RTOId = ChangeUtil.getRtoIdFromName(context, DomainObject.newInstance(context, changeObjID).getInfo(context, SELECT_ORGANIZATION));
		}
		return "TYPES=type_Person:CURRENT=policy_Person.state_Active:MEMBER_ID="+RTOId+":USERROLE="+techRole;
	}

	/**
	 * @author
	 * Generates dynamic query for Tech Role Column
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 */
	@Deprecated
	public String getTechAssigneeRoleDynamicSearchQuery(Context context, String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		return getRoleDynamicSearchQuery(context, programMap,true);
	}

	/**
	 * @author
	 * Generates dynamic query for Senior Tech Role Column
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 */
	@Deprecated
	public String getSrTechAssigneeoleDynamicSearchQuery(Context context, String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		return getRoleDynamicSearchQuery(context, programMap,false);
	}

	/**
	 * @author
	 * Generates dynamic search types for Reported Against field
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 */
	@Deprecated
	public String getFieldSearchTypes(Context context, String[] args) throws Exception {

		String searchTypes = (String)changeUtil.getRelationshipTypes(context,ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE,true,false,null);
		return "TYPES="+searchTypes;
	}

    /**
     * @author
     * Generates dynamic query for new owner field in transfer ownership form
     * @param context
     * @param args
     * @return String
     * @throws Exception
     */
	@Deprecated
    public String getSearchQueryForTransferOwnership(Context context, String[] args) throws Exception
    {
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
    	Map requestMap     = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
    	String objectId    = (String)requestMap.get(ChangeConstants.OBJECT_ID);

		if(!UIUtil.isNullOrEmpty(objectId)){
			setId(objectId);
		}
		else{
			objectId = 	(String)requestMap.get("objectId");
			StringTokenizer strTok = new StringTokenizer(objectId,",");
			if (strTok.hasMoreElements()){
				objectId = (String)strTok.nextToken();
			}
			setId(objectId);
		}
		StringList slOrgSelect = new StringList(SELECT_TYPE);
		slOrgSelect.add(SELECT_ORGANIZATION);
    	Map mapOrgId = getInfo(context, slOrgSelect);

    	String strResponsibleOrg = (String) ChangeUtil.getRtoIdFromName(context, (String)mapOrgId.get(SELECT_ORGANIZATION));
    	String strObjectType = (String) mapOrgId.get(SELECT_TYPE);

    	if(ChangeUtil.isNullOrEmpty(strResponsibleOrg) && !ChangeUtil.isNullOrEmpty(strObjectType)&& ChangeConstants.TYPE_CHANGE_ACTION.equals(strObjectType))
    	{
    		strResponsibleOrg = ChangeUtil.getRtoIdFromName(context, (String)getInfo(context, "to["+ ChangeConstants.RELATIONSHIP_CHANGE_ACTION +"].from."+SELECT_ORGANIZATION));
    	}

    	return "TYPES=type_Person:CURRENT=policy_Person.state_Active:MEMBER_ID=" + strResponsibleOrg +":USERROLE=role_ChangeCoordinator,role_VPLMProjectLeader";
    }


    /**
     * @author
     * Generates dynamic query for new owner field in transfer ownership form
     * @param context
     * @param args
     * @return String
     * @throws Exception
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList excludeCurrentOwner(Context context, String[] args) throws Exception {

		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String objectId    = (String)programMap.get(ChangeConstants.OBJECT_ID);
		if(UIUtil.isNullOrEmpty(objectId)){
			objectId = 	(String)programMap.get("parentOID");
		}

		StringList excludeList = new StringList(1);
		StringList objSelects  = new StringList(2);
		objSelects.addElement(SELECT_OWNER);
		objSelects.addElement("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.id");
		Map objInfo = (Map)DomainObject.newInstance(context, objectId).getInfo(context, objSelects);
		String owner = (String)objInfo.get(SELECT_OWNER);
		String changeCoordinator = (String)objInfo.get("from["+ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR+"].to.id");
		if(!changeUtil.isNullOrEmpty(owner) && !changeUtil.isNullOrEmpty(changeCoordinator) && owner.equals(changeCoordinator))
			excludeList   = new StringList(PersonUtil.getPersonObjectID(context, owner));

        return excludeList;
    }

    /**
     * @author
     * Generates dynamic query for new owner field in transfer ownership form
     * @param context
     * @param args
     * @return String
     * @throws Exception
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
    public StringList includeOIDPerson(Context context, String[] args) throws Exception {

    	System.out.println("In: includeOIDPerson method");
    	HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjectId    = (String)programMap.get(ChangeConstants.OBJECT_ID);
		if(UIUtil.isNullOrEmpty(strObjectId)){
			strObjectId = 	(String)programMap.get("parentOID");
		}
		StringList slIncludePersonOID = new StringList();
		StringList slObjSelects  = new StringList(2);
		slObjSelects.addElement(DomainConstants.SELECT_ORGANIZATION);
		slObjSelects.addElement("project");
		Map objInfo = (Map)DomainObject.newInstance(context, strObjectId).getInfo(context, slObjSelects);
		String strOrganiztion = (String)objInfo.get(DomainConstants.SELECT_ORGANIZATION);
		String strProject = (String)objInfo.get("project");
		strProject = "*"+strProject+"*";
		String strName = "*";
		String strWhere1 = "(to[Member].from.name=='"+strOrganiztion+"') && from[Assigned Security Context].to.name ~='"+strProject+"'";
		String sResult = EMPTY_STRING;
		if(!changeUtil.isNullOrEmpty(strOrganiztion) && !changeUtil.isNullOrEmpty(strProject))
		{
			sResult  = MqlUtil.mqlCommand(context,"temp query bus $1 $2 $3 where $4 select $5 dump $6","Person",strName,"-",strWhere1,"id","|");
		}else{
			sResult  = MqlUtil.mqlCommand(context,"temp query bus $1 $2 $3 select $4 dump $5","Person",strName,"-","id","|");
		}
		StringList slPersons = FrameworkUtil.split(sResult, "\n");
		for (int i=0;i<slPersons.size();i++) {
			String strIterVal = (String) slPersons.get(i);
				StringList slPersonDetails = FrameworkUtil.split(strIterVal, "|");
				slIncludePersonOID.add(slPersonDetails.get(3));

		    }
		System.out.println("out: includeOIDPerson method");
        return slIncludePersonOID;
    }
    /**
     * @author
     * This method is called from update program of CO, Create/Edit, Reviewer/Approval List fields.
     * @param context ematrix context.
     * @param args holds a Map with the following input arguments.
     * @throws Exception if any operation fails.
     */
	@Deprecated
    public void updateReviewRouteObject (Context context, String[] args) throws Exception {

    	System.out.println("Inside  updateReviewRouteObject ");
         HashMap programMap = (HashMap) JPO.unpackArgs(args);
         HashMap fieldMap   = (HashMap) programMap.get(ChangeConstants.FIELD_MAP);
         HashMap paramMap   = (HashMap) programMap.get(ChangeConstants.PARAM_MAP);

		 String strNewToTypeObjId = (String)paramMap.get(ChangeConstants.NEW_OID);
		 String strOldToTypeObjId = (String)paramMap.get(ChangeConstants.OLD_OID);

         String objectId           = (String)paramMap.get(ChangeConstants.OBJECT_ID);

		 strNewToTypeObjId = (ChangeUtil.isNullOrEmpty(strNewToTypeObjId)) ?
							 (String)paramMap.get(ChangeConstants.NEW_VALUE) : strNewToTypeObjId ;

		 strOldToTypeObjId = (ChangeUtil.isNullOrEmpty(strOldToTypeObjId)) ?
							 (String)paramMap.get(ChangeConstants.OLD_VALUE) : strOldToTypeObjId ;

		new ChangeOrder(objectId).updateRouteObject(context, strNewToTypeObjId, strOldToTypeObjId, "Review");
     }
    /**
     * @author
     * This method is called from update program of CO, Create/Edit, Reviewer/Approval List fields.
     * @param context ematrix context.
     * @param args holds a Map with the following input arguments.
     * @throws Exception if any operation fails.
     */
	@Deprecated
    public void updateApprovalRouteObject (Context context, String[] args) throws Exception {

    	System.out.println("Inside  updateApprovalRouteObject ");
         HashMap programMap = (HashMap) JPO.unpackArgs(args);
         HashMap fieldMap   = (HashMap) programMap.get(ChangeConstants.FIELD_MAP);
         HashMap paramMap   = (HashMap) programMap.get(ChangeConstants.PARAM_MAP);

		 String strNewToTypeObjId = (String)paramMap.get(ChangeConstants.NEW_OID);
		 String strOldToTypeObjId = (String)paramMap.get(ChangeConstants.OLD_OID);

         String objectId           = (String)paramMap.get(ChangeConstants.OBJECT_ID);

		 strNewToTypeObjId = (ChangeUtil.isNullOrEmpty(strNewToTypeObjId)) ?
							 (String)paramMap.get(ChangeConstants.NEW_VALUE) : strNewToTypeObjId ;

		 strOldToTypeObjId = (ChangeUtil.isNullOrEmpty(strOldToTypeObjId)) ?
							 (String)paramMap.get(ChangeConstants.OLD_VALUE) : strOldToTypeObjId ;

		new ChangeOrder(objectId).updateRouteObject(context, strNewToTypeObjId, strOldToTypeObjId, "Approval");
     }



    /**
     * @author
     * Updates the Distribution List field in CO WebForm.
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     * object Id object Id of context CO.
     * New Value object Id of updated Distribution List Object
     * @throws Exception if the operations fails
     * @since ECM-R211
  */
	@Deprecated
     public DomainRelationship connectDistributionList (Context context, String[] args) throws Exception {
         //unpacking the Arguments from variable args
         HashMap programMap = (HashMap) JPO.unpackArgs(args);
         HashMap paramMap   = (HashMap) programMap.get(ChangeConstants.PARAM_MAP);
         return connect(context,paramMap,RELATIONSHIP_EC_DISTRIBUTION_LIST);
     }

     /**
      * Get the list of all Objects(CAs) which are connected to the Change object and From CAs retrieve all the affected items and send the list
      *
      * @param context the eMatrix <code>Context</code> object
      * @param args    holds the following input arguments:
      *            0 - HashMap containing one String entry for key "objectId"
      * @return        a eMatrix <code>MapList</code> object having the list of Affected
      * @throws        Exception if the operation fails
      * @since         ECM R211
      **/
	@Deprecated
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAffectedItems(Context context, String[] args) throws Exception {


             HashMap programMap = (HashMap)JPO.unpackArgs(args);
             Map paramMap       = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
             String strParentId = (String) programMap.get("parentOID");

             changeOrder.setId(strParentId);
             return changeOrder.getProposedItems(context);
     }
    /**
     * Get the list of all Objects(CAs) which are connected to the Change object and From CAs retrieve all the affected items and send the list
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args    holds the following input arguments:
     *            0 - HashMap containing one String entry for key "objectId"
     * @return        a eMatrix <code>MapList</code> object having the list of Affected
     * @throws        Exception if the operation fails
     * @since         ECM R211
     **/
	@Deprecated
   @com.matrixone.apps.framework.ui.ProgramCallable
   public MapList getAffectedChangeActions(Context context, String[] args) throws Exception {


            HashMap programMap = (HashMap)JPO.unpackArgs(args);
            String changeObjId = (String)programMap.get(ChangeConstants.OBJECT_ID);

            changeOrder.setId(changeObjId);
            return changeOrder.getAffectedChangeActions(context);
    }



    /**
     * @author
     * this method performs the cancel process of change - The
     * Affected CAs,Affected Items, Routes,Reference Documents,Prerequisites Connected to this Particular CO are
     * Disconnected and finally change promoted to cancel state.
     *
     *
     * @param context
     *            the eMatrix <code>Context</code> object.
     * @param args
     *            holds the following input arguments: - The ObjectID of the
     *            Change Process
     * @throws Exception
     *             if the operation fails.
     * @since ECM R211.
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void cancelChange(Context context, String[] args) throws Exception

    {
        HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = changeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		String cancelReason  = changeUtil.isNullOrEmpty((String)paramMap.get("cancelReason"))? (String)requestMap.get("Reason") : (String)paramMap.get("cancelReason");



		ChangeOrder changeOrder = new ChangeOrder(objectId);
		try{
			changeOrder.cancel(context,cancelReason);
		}catch (Exception e) {
			 e.printStackTrace();
			// ${CLASS:emxContextUtil}.mqlNotice(context, e.getMessage());
			  MqlUtil.mqlCommand(context, "notice $1",  e.getMessage());
		}
    }

    private void sendNotification(Context context,String objectId,String subjectKey,String messageKey, String propertyKey, String notificationName) throws Exception 
	{
		return;
	}

    /**
     * @author
     * this method performs the hold process of change.Moves all associated CAs to hold state.
     *
     *
     * @param context
     *            the eMatrix <code>Context</code> object.
     * @param args
     *            holds the following input arguments: - The ObjectID of the
     *            Change Process
     * @throws Exception
     *             if the operation fails.
     * @since ECM R211.
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void holdChange(Context context, String[] args)throws Exception {

        HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap)paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = changeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		String holdReason  = changeUtil.isNullOrEmpty((String)paramMap.get("holdReason"))? (String)requestMap.get("Reason") : (String)paramMap.get("holdReason");
		ChangeOrder changeOrder = new ChangeOrder(objectId);
		changeOrder.hold(context,holdReason);
    }


    /**@author
	 * Resumes the Hold Changes and sends notification and updates the history
	 * @param context
	 * @throws Exception
	 */
	@Deprecated
	public void resumeChange(Context context,String[] args)throws Exception {

        HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = changeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		ChangeOrder changeOrder = new ChangeOrder(objectId);
		changeOrder.resume(context);
	}


    /**
     * Gets all the persons with which this Change object is connected with
     * Assignee relationship
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args    holds the following input arguments:
     *           0 -  HashMap containing one String entry for key "objectId"
     * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
     * @throws        Exception if the operation fails
     * @since         ECM R211
     **
     */
	@Deprecated
    public MapList getAssignees(Context context, String[] args)
        throws Exception
        {
            //unpacking the Arguments from variable args
            HashMap programMap = (HashMap)JPO.unpackArgs(args);
            //getting parent object Id from args
            String changeObjId = (String)programMap.get(ChangeConstants.OBJECT_ID);

            return  getAssignees(context);

        }

    
	/**
	 * Gets all the persons with which this Change object is connected with
	 * Assignee relationship
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  HashMap containing one String entry for key "objectId"
	 * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
	 * @throws        Exception if the operation fails
	 * @since         ECM R215
	 **
	 */
	@Deprecated
	public MapList getAssignees(Context context) throws Exception {
		//Initializing the return type
		MapList relBusObjPageList = new MapList();
		//Business Objects are selected by its Ids
		StringList objectSelects = new StringList(DomainConstants.SELECT_ID);
		//Relationships are selected by its Ids
		StringList relSelects = new StringList(DomainConstants.SELECT_RELATIONSHIP_ID);
		//retrieving Assignees from EC Context

		relBusObjPageList = getRelatedObjects(context,ChangeConstants.RELATIONSHIP_ASSIGNEE,
													  ChangeConstants.TYPE_PERSON,
													  objectSelects,
													  relSelects,
													  false,
													  true,
													  (short) 1,
													  DomainConstants.EMPTY_STRING,
													  DomainConstants.EMPTY_STRING,
													  (short) 0);


		return  relBusObjPageList;
	}
	
    /**
     * @author
     * Gets Approval tasks and shows on Properties page of Change.
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	@Deprecated
    public String getApprovalTasksOnChange(Context context, String []args) throws Exception {

    	//XSSOK
    	HashMap programMap  = (HashMap)JPO.unpackArgs(args);
        HashMap paramMap    = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
        HashMap requestMap  = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
        String  objectId    = (String)requestMap.get(ChangeConstants.OBJECT_ID);

        com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder changeOrder = new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder(objectId);
        MapList taskMapList =  changeOrder.getCurrentAssignedTasksOnObject(context);

        boolean isPrinterFriendly = (requestMap.get("PFmode")!= null);

        boolean isExporting = (paramMap.get("reportFormat") != null);


    	// For export to CSV
    	String exportFormat = null;
    	boolean exportToExcel = false;
    	if(requestMap!=null && requestMap.containsKey("reportFormat")){
    		exportFormat = (String)requestMap.get("reportFormat");
    	}
    	if("CSV".equals(exportFormat)){
    		exportToExcel = true;
    	}

        String taskTreeActualLink     = getTaskTreeHref(context, requestMap);
        String taskApprovalActualLink = getTaskApprovalHref(context);

        String taskTreeTranslatedLink = "";
        String taskApprovalTranslatedLink = "";

        Map mapObjectInfo;String strName;String strInfoType; String taskObjectId;
        StringBuffer returnHTMLBuffer = new StringBuffer(100);
        if (taskMapList.size() > 0) {
    		if(!exportToExcel)
    		{
            returnHTMLBuffer.append("<div><table><tr><td class=\"object\">");
            returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.ApprovalRequired"));
            returnHTMLBuffer.append("</td></tr><br/><tr><td>");
            returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.ApprovalMessage"));
            returnHTMLBuffer.append("</td></tr></table></div>");
    		}else{
    			returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.ApprovalRequired"));
    			returnHTMLBuffer.append("\n");
    			returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.ApprovalMessage"));
    			returnHTMLBuffer.append("\n\n");

    		}
        }
        // Do for each object
        for (Iterator itrObjects = taskMapList.iterator(); itrObjects.hasNext();) {
            mapObjectInfo = (Map) itrObjects.next();
            strName = (String)mapObjectInfo.get("name");
            strInfoType = (String)mapObjectInfo.get("infoType");

                if (INFO_TYPE_ACTIVATED_TASK.equals(strInfoType)) {

            	if(!exportToExcel && !isPrinterFriendly)
    			{
                    taskObjectId = (String)mapObjectInfo.get(ChangeConstants.ID);
                    taskTreeTranslatedLink = FrameworkUtil.findAndReplace(taskTreeActualLink, "${OBJECT_ID}", taskObjectId);
                    taskTreeTranslatedLink = FrameworkUtil.findAndReplace(taskTreeTranslatedLink,"${NAME}", strName);
                    returnHTMLBuffer.append("<div><table><tr><td>");

                    returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.TaskAssigned"))
                                    .append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").append(taskTreeTranslatedLink);
                    returnHTMLBuffer.append("</td></tr><br/>\n\n\n\n\n<td>");

                    taskApprovalTranslatedLink = FrameworkUtil.findAndReplace(taskApprovalActualLink, "${TASK_ID}", taskObjectId);
                    taskApprovalTranslatedLink = FrameworkUtil.findAndReplace(taskApprovalTranslatedLink, "${OBJECT_ID}",(String)mapObjectInfo.get("parentObjectId"));
                    taskApprovalTranslatedLink = FrameworkUtil.findAndReplace(taskApprovalTranslatedLink, "${TASK_STATE}",(String)mapObjectInfo.get("current"));
                    taskApprovalTranslatedLink = FrameworkUtil.findAndReplace(taskApprovalTranslatedLink, "${TASK_TYPE}",(String)mapObjectInfo.get("type"));

                    returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.ApprovalStatus"))
                                    .append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").append(taskApprovalTranslatedLink);
                    returnHTMLBuffer.append("</td></tr></table></div>");
    			}
            	else if(exportToExcel) {
    				returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.TaskAssigned"))
    				.append("      ").append(strName);
    				returnHTMLBuffer.append("\n");
    				returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.ApprovalStatus"))
    				.append("      ").append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.AwaitingApproval"));

            	}else if(isPrinterFriendly){

            		String taskTreeTranslated = "<img border=\"0\" src=\"images/iconSmallTask.gif\">"+ strName;
            		returnHTMLBuffer.append("<div><table><tr><td>");

            		returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.TaskAssigned"))
            		.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").append(taskTreeTranslated);
            		returnHTMLBuffer.append("</td></tr><br/>\n\n\n\n\n<td>");
            		String strAwaitingApproval =  EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.AwaitingApproval");
            		String taskApprovalTranslated = "<img border='0' src='../common/images/iconActionApprove.gif' />"+strAwaitingApproval;

            		returnHTMLBuffer.append(EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.ApprovalStatus"))
            		.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").append(taskApprovalTranslated);
            		returnHTMLBuffer.append("</td></tr></table></div>");

                }

            }

        }
        return returnHTMLBuffer.toString();
    }


/**
 * @author
 * Prepare Task Tree HREF for the give map values
 * @param context
 * @param paramMap
 * @return
 * @throws Exception
 */
private String getTaskTreeHref(Context context,Map paramMap)throws Exception {
    StringBuffer strTreeLink = new StringBuffer();
    strTreeLink.append("<a href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?relId=");
    strTreeLink.append((String)paramMap.get("relId"));
    strTreeLink.append("&parentOID=");
    strTreeLink.append((String)paramMap.get("parentOID"));
    strTreeLink.append("&jsTreeID=");
    strTreeLink.append((String)paramMap.get("jsTreeID"));
    strTreeLink.append("&suiteKey=Framework");
    strTreeLink.append("&emxSuiteDirectory=common");
    strTreeLink.append("&objectId=${OBJECT_ID}&taskName=${NAME}");
    strTreeLink.append("', '', '', 'true', 'popup', '')\"  class=\"object\">");
    strTreeLink.append("<img border=\"0\" src=\"images/iconSmallTask.gif\">${NAME}</a>");
    return strTreeLink.toString();
 }

/**
 * @author
 * Prepare Awaiting Approval HREF for the give map values
 * @param context
 * @param paramMap
 * @return
 * @throws Exception
 */
private String getTaskApprovalHref(Context context)throws Exception {
    // Form the Approve link template

	final String STRING_PENDING = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.Pending");

    StringBuffer strTaskApproveLink = new StringBuffer(64);
	String sTaskApproveURL = "'../common/emxLifecycleApproveRejectPreProcess.jsp'";
	String sTaskApproveParameters = "'emxTableRowId=${OBJECT_ID}^${TASK_STATE}^^${TASK_ID}^${TASK_TYPE}&objectId=${OBJECT_ID}&suiteKey=Framework'";
	strTaskApproveLink.append("<a href=\"javascript:submitWithCSRF("+sTaskApproveURL+", findFrame(getTopWindow(),'listHidden'),"+sTaskApproveParameters+");\">");
	strTaskApproveLink.append( STRING_PENDING);
    strTaskApproveLink.append("</a>");

    return strTaskApproveLink.toString();

 }

/**
 * To create the Change Object from Create Component
 *
 * @author
 * @param context the eMatrix code context object
 * @param args packed hashMap of request parameter
 * @return Map contains change object id
 * @throws Exception if the operation fails
 * @Since ECM R211
 */
@Deprecated
@com.matrixone.apps.framework.ui.CreateProcessCallable
public Map createChange(Context context, String[] args) throws Exception {

    HashMap programMap   = (HashMap) JPO.unpackArgs(args);
    HashMap requestValue = (HashMap) programMap.get(ChangeConstants.REQUEST_VALUES_MAP);
    HashMap requestMap   = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);
    String strFunctinality = (String)programMap.get("functionality");
    String strObjectId = (String)programMap.get("objectId");
    String strCreationMode = (String)programMap.get("CreateMode");

    String sType   = getStringFromArr((String[])requestValue.get("TypeActual"),0);
    String sPolicy = "";
    if(strCreationMode.equals("CloneCO")) {

    	sPolicy = getStringFromArr((String[])requestValue.get("Policy2"),0);
    }
    else {
    	sPolicy = getStringFromArr((String[])requestValue.get("Policy"),0);
    }
    String sVault  = getStringFromArr((String[])requestValue.get("Vault"),0);
    String sOwner  = getStringFromArr((String[])requestValue.get("Owner"),0);
    String sDescription = getStringFromArr((String[])requestValue.get("Description"),0);
    String sChangeTemplateID  = getStringFromArr((String[])requestValue.get("ChangeTemplateOID"),0);
    String effectivityExpr =  getStringFromArr((String[])requestValue.get("ChangeEffectivityOID"),0);
    String selectedObjId =  ((String)programMap.get("selectedObjIdList"));
    String fromConfiguredBOMView = "false";

    if (UIUtil.isNullOrEmpty(selectedObjId)) {
    	selectedObjId =  ((String) programMap.get("selectedPartsList")); // for XCE use case selected objectIds will be passed.
    	fromConfiguredBOMView = "true";
    }

    sType   = UIUtil.isNotNullAndNotEmpty(sType)  ? (String) programMap.get("TypeActual") : EMPTY_STRING;
    if(strCreationMode.equals("CloneCO")) {

    	sPolicy = UIUtil.isNotNullAndNotEmpty(sPolicy)? (String) programMap.get("Policy2") : EMPTY_STRING;
    }
    else {
    	sPolicy = UIUtil.isNotNullAndNotEmpty(sPolicy)? (String) programMap.get("Policy") : EMPTY_STRING;
    }
    sVault  = UIUtil.isNotNullAndNotEmpty(sVault) ? (String) programMap.get("Vault") : EMPTY_STRING;
    sOwner  = UIUtil.isNotNullAndNotEmpty(sOwner) ? (String) programMap.get("Owner") : EMPTY_STRING;
    String changeId   = "";
    String sInterfaceName = "";
    String[] sourceAffectedItemRowIds= null;

    Map returnMap     = new HashMap();
    boolean bAutoName = false;

    try {
    	if("CreateNewCOUnderCO".equalsIgnoreCase(strFunctinality) && !ChangeUtil.isNullOrEmpty(strObjectId)){
    		com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder mChangeOrder = new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder(strObjectId);
    		changeId = mChangeOrder.createChild(context, sType, sPolicy);

    	}else{
        ChangeOrder change = new ChangeOrder();
        changeId = change.create(context,sType,sPolicy,sVault,sOwner);
    	}
                DomainObject coDomObj = DomainObject.newInstance(context, changeId);
        coDomObj.setDescription(context, sDescription);
        //Logic to apply Interface of Template to CO
		if(!UIUtil.isNullOrEmpty(sChangeTemplateID)){
                        sInterfaceName = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump $3",sChangeTemplateID,"interface","|");
			if(!UIUtil.isNullOrEmpty(sInterfaceName)){
				Iterator intrItr         = FrameworkUtil.split(sInterfaceName, "|").iterator();
				//Add all Change Template Interfaces to CO
				for(int i=0; intrItr.hasNext();i++){
					MqlUtil.mqlCommand(context, "modify bus $1 add interface $2",changeId,(String)intrItr.next());
				}
			}
		}

		/*
		We do not have effectivity on CO.
		//Added for displaying effectivity field on CO properties page for Mobile Mode
        if(UINavigatorUtil.isMobile(context)){
        	EffectivityUtil.setEffectivityOnChange(context,changeId,"");
		}
		*/

        returnMap.put(ChangeConstants.ID, changeId);

    } catch (Exception e) {
        e.printStackTrace();
        throw new FrameworkException(e);
    }

    return returnMap;
}

private String getStringFromArr(String[] StringArr, int intArrIndex) {
	return (StringArr != null) ? (String)StringArr[intArrIndex] : EMPTY_STRING;
}


    ///////////////////////////////////////My Changes View/////////////////////////////////////////



    /**
         * Program get all the CO (assigned via Route, Route Template, Owned)
         * @param context the eMatrix <code>Context</code> object
         * @param args    holds the following input arguments:
         *           0 -  MapList containing "objectId"
         * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
         * @throws        Exception if the operation fails
         * @since         ECM R211
         **
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getMyChangeOrders(Context context,String args[]) throws Exception{
        MapList objList = new MapList();
		try{
			String objectId 			= PersonUtil.getPersonObjectID(context);

			StringList strCOOwned 		= (StringList)getOwnedCO(context, args);
            StringList sRouteCO 		= getRouteTaskAssignedCOs(context, objectId);
            StringList sRouteTemplateCO = getRouteTemplateAssignedCOs(context, objectId);

            Set hs = new HashSet();
            hs.addAll(strCOOwned);
            hs.addAll(sRouteCO);
            hs.addAll(sRouteTemplateCO);

            Iterator itr = hs.iterator();
            String id = "";
            while(itr.hasNext()){
                id = (String)itr.next();
                Map map = new HashMap();
                map.put("id", id);
                objList.add(map);
            }
            if(objList.size()!=0)
                return objList;
           else
                return new MapList();
        }catch (Exception e) {

            throw e;
        }
    }


    /**
     * Retrieves  Change Order assigned to person via Route Task
     * @author R3D
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	@Deprecated
    public StringList getRouteTaskAssignedCOs(Context context, String personObjId) throws Exception {

    	 String objSelect   = "to["+RELATIONSHIP_PROJECT_TASK+"].from."+
     			"from["+RELATIONSHIP_ROUTE_TASK+"].to."+
     			"to["+RELATIONSHIP_OBJECT_ROUTE+"|from.type.kindof["+ChangeConstants.TYPE_CHANGE_ORDER+"]].from.id";

         String sCO = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump",personObjId,objSelect);
    	return FrameworkUtil.split(sCO, ChangeConstants.COMMA_SEPERATOR);

       }

    /**
     * Retrieves  Change Order assigned to person via Route Template where Route Base Purpose is Approval/Review
     * @author R3D
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	@Deprecated
    public StringList getRouteTemplateAssignedCOs(Context context,String personObjId) throws Exception {


    	String objSelect   = "to["+RELATIONSHIP_ROUTE_NODE+"|from.type=='"+TYPE_ROUTE_TEMPLATE+"']."+
   			 "from.to["+RELATIONSHIP_INITIATING_ROUTE_TEMPLATE+"].from."+
   			 "to["+RELATIONSHIP_OBJECT_ROUTE+"|from.type=='"+ChangeConstants.TYPE_CHANGE_ORDER+"'].from.id";

      	String sCO = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump",personObjId,objSelect);
    	return FrameworkUtil.split(sCO, ChangeConstants.COMMA_SEPERATOR);

       }


    /**
       * Program returns StringList of CO Object IDs if the context user is Owner/Change Initiator(Originator)/Change Coordinator.
       * @param context the eMatrix <code>Context</code> object
       * @param args    holds the following input arguments:
       *           0 -  Object
       * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
       * @throws        Exception if the operation fails
       * @since         ECM R211
       **
     */
	@Deprecated
    public Object getOwnedCO(Context context,String args[]) throws Exception{
    	StringList slOwnedCO = new StringList();
    	try{
    		String userName = context.getUser();

    		// 1 - We need to retrieve all the Change Orders owned by the user
    		List<String> coOwned = new ArrayList<String>();

    		// 1.1 - Create the Query
    		Query ownedCOQuery = new Query("Change Owned by User Query" );

    		// 1.2 - Define the type
    		ownedCOQuery.setBusinessObjectType(ChangeConstants.TYPE_CHANGE_ORDER);

    		// 1.3 - Create the Where clause
    		String ownedCOQueryWhereClause = "owner=='"+userName+"' || attribute[Originator]=='"+userName+"'";
    		ownedCOQuery.setWhereExpression(ownedCOQueryWhereClause);

    		// 1.4 - Define the selectables
    		StringList ownedCOQuerySelectables = new StringList();
    		String idSelectable = "id";
    		ownedCOQuerySelectables.add(idSelectable);

    		// 1.5 - Perform the Query
    		QueryIterator itOwnedCO = ownedCOQuery.getIterator(context, ownedCOQuerySelectables, (short)1024);

    		try{
    			while( itOwnedCO.hasNext())
    			{
    				BusinessObjectWithSelect ownedCOSelect = itOwnedCO.next();

    				String ownedCOId = ownedCOSelect.getSelectData(idSelectable);

    				if(ownedCOId!=null && !slOwnedCO.contains(ownedCOId)){
    					slOwnedCO.add(ownedCOId);
    				}
    			}
    		}
    		finally{
    			itOwnedCO.close();
    			ownedCOQuery.close(context);
    		}

    		//  Reterive all Change Orders in which user is Change Coordinator
    		// 2 - Retrieve the "Person" Object from which expand should start. Get out of this part if person is not found
    		BusinessObject person = getPersonObjectFromName(context, userName);

    		if(null!=person)
    		{

    			// 2.1 - Define the rel pattern on which expand is performed
    			String relPattern = ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR ;

    			// 2.2 - Define the selectables to retrieve on the objects
    			StringList busSelectables = new StringList();

    			String kindOfChangeOrderSelectable = "type.kindof["+ChangeConstants.TYPE_CHANGE_ORDER+"]";

    			busSelectables.add(idSelectable);
    			busSelectables.add(kindOfChangeOrderSelectable);

    			// 2.3 - Define the selectables to apply on the relationship
    			StringList relSelectables = new StringList();
    			
    			// 2.4 - Perform the expand
    			ExpansionIterator itr = null;

    			try
    			{
    				// 2.4.1 - Get the expansion iterator
    				itr = person.getExpansionIterator(context, relPattern, "*", busSelectables, relSelectables, true, false, (short)1, "", "", (short)0, false, true, (short)1024, false);

    				// 2.4.2 - Loop through the results
    				while (itr.hasNext())
    				{
    					// 2.4.2.1 - Get the next element
    					RelationshipWithSelect relWithSelect = itr.next();

    					// 2.4.2.3 - Get the pointed element
    					BusinessObjectWithSelect boWithSelect = relWithSelect.getTarget();

    					// 2.4.2.4 - Get the data
    					String strId = boWithSelect.getSelectData(idSelectable);
    					String kindOfChangeOrder = boWithSelect.getSelectData(kindOfChangeOrderSelectable);


    					// 2.4.2.5 - If this is a kind of Change Order then it needs to be added
    					if(kindOfChangeOrder!=null && kindOfChangeOrder.equalsIgnoreCase("true"))
    					{
    							if(strId!=null && !strId.isEmpty() && !slOwnedCO.contains(strId)){
    								slOwnedCO.add(strId);
    						}
    					}
    				}

    			}finally{	
    				if(itr!=null)
    					itr.close();					
    			}
    		}
    	}catch (Exception e) {
    		throw e;
    	}
    	return slOwnedCO;
    }
	
	private static BusinessObject getPersonObjectFromName(Context context, String personName) throws Exception{
        		String output = MqlUtil.mqlCommand(context,"temp query bus $1 $2 $3 limit 1 select $4 dump $5", PropertyUtil.getSchemaProperty(context,"type_Person"), personName, "*", "id", "#");
        		
        		if(output!=null && !output.isEmpty())
        		{
        			String[] outputSplitted = output.split("#");
        			String personId = outputSplitted[3];
        			
        			return new BusinessObject(personId);
        		}
        		return null;
    }

    /**
                             * Method to list all the "Change Actions"
                             * @param context the eMatrix <code>Context</code> object
                             * @param args    holds the following input arguments:
                             *           0 -  MapList ontaining objectID
                             * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
                             * @throws        Exception if the operation fails
                             * @since         ECM R211
                             **
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAllChangeActions(Context context,String args[]) throws Exception
    {
        MapList listCA = new MapList();
        try{

            IChangeActionServices iCaServices = ChangeActionFactory.CreateChangeActionFactory();
            Map<String,List<String>> userCAMap = iCaServices.getChangesForUser(context, context.getUser());

            Iterator<String> itrOut = userCAMap.keySet().iterator();

            String key,id;
            Set physicalIdSet = new HashSet<String>();

            while (itrOut.hasNext()) {
                key = itrOut.next();
                List listPerRole = userCAMap.get(key);

                Iterator<String> itrIn = listPerRole.iterator();

                while (itrIn.hasNext()) {
                    id = itrIn.next();

                    if(!physicalIdSet.contains(id)){

                    	physicalIdSet.add(id);

                Map map = new HashMap();
                map.put("id", id);
                listCA.add(map);
            }
            }
            }

        }catch (Exception e) {
            throw e;
        }
        return listCA;
    }



    /**
     * Retrieves  Change Action assigned to person via Route Task
     * @author R3D
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	@Deprecated
    public StringList getRouteTaskAssignedCAs(Context context, String personObjId) throws Exception {

    	 String objSelect   = "to["+RELATIONSHIP_PROJECT_TASK+"].from."+
     			"from["+RELATIONSHIP_ROUTE_TASK+"].to."+
     			"to["+RELATIONSHIP_OBJECT_ROUTE+"|from.type=='"+ChangeConstants.TYPE_CHANGE_ACTION+"'].from.id";

         String sCA = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump",personObjId,objSelect);
    	return FrameworkUtil.split(sCA, ChangeConstants.COMMA_SEPERATOR);

       }

    /**
     * Retrieves  Change Action assigned to person via Route Template where Route Base Purpose is Approval/Review
     * @author R3D
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	@Deprecated
    public StringList getRouteTemplateAssignedCAs(Context context,String personObjId) throws Exception {

    	String objSelect   = "to["+RELATIONSHIP_ROUTE_NODE+"|from.type=='"+TYPE_ROUTE_TEMPLATE+"']."+
      			 "from.to["+RELATIONSHIP_INITIATING_ROUTE_TEMPLATE+"].from."+
      			 "to["+RELATIONSHIP_OBJECT_ROUTE+"|from.type=='"+ChangeConstants.TYPE_CHANGE_ACTION+"'].from.id";


        String sCA = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump",personObjId,objSelect);
    	return FrameworkUtil.split(sCA, ChangeConstants.COMMA_SEPERATOR);

       }


    /**
     * Program returns StringList of CA Object IDs if the context user is Owner/Technical Assignee/Senior Technical Assignee.
     * @param context the eMatrix <code>Context</code> object
     * @param args    holds the following input arguments:
     *           0 -  Object
     * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
     * @throws        Exception if the operation fails
     * @since         ECM R211
     **
   */
  @Deprecated
  public Object getOwnedCAs(Context context,String args[]) throws Exception{
      StringList returnList = new StringList();
      try{
          StringList objectSelects = new StringList(6);
          objectSelects.add(SELECT_ID);
          String objectWhere = "from[Technical Assignee].to.name == \""+context.getUser()+"\" || owner == \""+ context.getUser() +"\" || from[Senior Technical Assignee].to.name==\""+context.getUser()+"\"";

          MapList ownedCO = DomainObject.findObjects(context,
        		  ChangeConstants.TYPE_CHANGE_ACTION,                                 // type filter
                  QUERY_WILDCARD,         // vault filter
                  objectWhere,                            // where clause
                  objectSelects);                         // object selects
          return new ChangeUtil().getStringListFromMapList(ownedCO, "id");
      }catch (Exception e) {

          throw e;
      }

  }

	/**
	 * Program to get CO Edit Icon in structure browser
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
	 * @throws        Exception if the operation fails
	 * @since         ECM R211
	 **
	 */
	@Deprecated
	public Vector showEditIconforStructureBrowser(Context context, String args[])throws FrameworkException{
		//XSSOK
		Vector columnVals = null;
		try {
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			StringList objSelects = new StringList(2);
			objSelects.addElement(SELECT_TYPE);
			objSelects.addElement(SELECT_CURRENT);
			objSelects.addElement(SELECT_ID);
			objSelects.addElement(SELECT_OWNER);
			objSelects.addElement(ChangeConstants.SELECT_TYPE_KINDOF);

			String type ="";
			String objectId ="";
			String current = "";
			String owner = "";
			String strTypeKinfOf = EMPTY_STRING;
			String strEditCO= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Label.EditCO", context.getSession().getLanguage());
			String strEditCR= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Label.EditCR", context.getSession().getLanguage());
			String strEditCA= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Label.EditCA", context.getSession().getLanguage());
			Map mapObjectInfo = null;
			StringBuffer sbEditIcon = null;

			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			StringList sObjectIDList = changeUtil.getStringListFromMapList(objectList, ChangeConstants.ID);

			if (objectList == null || objectList.size() == 0)
				return columnVals;
			else

				columnVals = new Vector(sObjectIDList.size());

			MapList COInfoList = DomainObject.getInfo(context, (String[])sObjectIDList.toArray(new String[sObjectIDList.size()]), objSelects);

			if(!COInfoList.isEmpty()){
				Iterator sItr = COInfoList.iterator();
				while(sItr.hasNext()){
					mapObjectInfo = (Map)sItr.next();
					type = (String)mapObjectInfo.get(SELECT_TYPE);
					objectId = (String)mapObjectInfo.get(SELECT_ID);
					current =(String)mapObjectInfo.get(SELECT_CURRENT);
					owner =(String)mapObjectInfo.get(SELECT_OWNER);
					strTypeKinfOf = (String)mapObjectInfo.get(ChangeConstants.SELECT_TYPE_KINDOF);

					sbEditIcon = new StringBuffer();
					if (type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_ORDER)||new DomainObject(objectId).isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER)){
						if((ChangeConstants.STATE_FORMALCHANGE_PROPOSE.equalsIgnoreCase(current) || ChangeConstants.STATE_FORMALCHANGE_PREPARE.equalsIgnoreCase(current)  || ChangeConstants.STATE_FORMALCHANGE_HOLD.equalsIgnoreCase(current)) && (context.getUser().equalsIgnoreCase(owner))){
						sbEditIcon.append("<a href=\"JavaScript:emxTableColumnLinkClick('");
						sbEditIcon.append("../common/emxForm.jsp?formHeader=EnterpriseChangeMgt.Heading.EditCO&amp;mode=edit");
						sbEditIcon.append("&amp;HelpMarker=emxhelpecoeditdetails&amp;submitAction=refreshCaller&amp;suiteKey=EnterpriseChangeMgt&amp;objectId=");
						sbEditIcon.append(XSSUtil.encodeForHTMLAttribute(context, objectId)); //common code

						sbEditIcon.append("&amp;form=type_ChangeOrderSlidein'"); //give CO edit form here.
						sbEditIcon.append(", '700', '600', 'true', 'slidein', '')\">");
						sbEditIcon.append("<img border=\"0\" src=\"../common/images/iconActionEdit.gif\" title=");
						sbEditIcon.append("\""+ XSSUtil.encodeForXML(context, strEditCO)+"\"");
						sbEditIcon.append("/></a>");
						}else{
							sbEditIcon.append("-");
						}
						columnVals.add(sbEditIcon.toString());

					}
					if (type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_REQUEST)||new DomainObject(objectId).isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST)){
						if((ChangeConstants.STATE_CHANGEREQUEST_CREATE.equalsIgnoreCase(current) || ChangeConstants.STATE_CHANGEREQUEST_EVALUATE.equalsIgnoreCase(current) || ChangeConstants.STATE_CHANGEREQUEST_HOLD.equalsIgnoreCase(current)) && (context.getUser().equalsIgnoreCase(owner))){
							sbEditIcon.append("<a href=\"JavaScript:emxTableColumnLinkClick('");
							sbEditIcon.append("../common/emxForm.jsp?formHeader=EnterpriseChangeMgt.Heading.EditCR&amp;mode=edit");
							sbEditIcon.append("&amp;HelpMarker=emxhelpeCReditdetails&amp;submitAction=refreshCaller&amp;suiteKey=EnterpriseChangeMgt&amp;objectId=");
							sbEditIcon.append(XSSUtil.encodeForHTMLAttribute(context, objectId)); //common code

							sbEditIcon.append("&amp;form=type_ChangeRequestSlidein'"); //give CR edit form here.
							sbEditIcon.append(", '700', '600', 'true', 'slidein', '')\">");
							sbEditIcon.append("<img border=\"0\" src=\"../common/images/iconActionEdit.gif\" title=");
							sbEditIcon.append("\""+ XSSUtil.encodeForXML(context, strEditCR)+"\"");
							sbEditIcon.append("/></a>");
						} else{
							sbEditIcon.append("-");
						}
						columnVals.add(sbEditIcon.toString());

					}
					if(ChangeCommon.isKindOfChangeAction(context,type)){
						if((ChangeConstants.STATE_CHANGE_ACTION_PREPARE.equalsIgnoreCase(current) || ChangeConstants.STATE_CHANGE_ACTION_INWORK.equalsIgnoreCase(current) || ChangeConstants.STATE_CHANGE_ACTION_HOLD.equalsIgnoreCase(current)) && (context.getUser().equalsIgnoreCase(owner))){
							sbEditIcon.append("<a href=\"JavaScript:emxTableColumnLinkClick('");
							sbEditIcon.append("../common/emxForm.jsp?formHeader=EnterpriseChangeMgt.Heading.EditCA&amp;mode=edit");
							sbEditIcon.append("&amp;HelpMarker=emxhelpeCAeditdetails&amp;submitAction=refreshCaller&amp;suiteKey=EnterpriseChangeMgt&amp;objectId=");
							sbEditIcon.append(XSSUtil.encodeForHTMLAttribute(context, objectId)); //common code
							sbEditIcon.append("&amp;form=type_ChangeActionSlidein'"); //give CR edit form here.
							sbEditIcon.append(", '700', '600', 'true', 'slidein', '')\">");
							sbEditIcon.append("<img border=\"0\" src=\"../common/images/iconActionEdit.gif\" title=");
							sbEditIcon.append("\""+ XSSUtil.encodeForXML(context, strEditCA)+"\"");
							sbEditIcon.append("/></a>");
						} else{
						sbEditIcon.append("-");
						}
						columnVals.add(sbEditIcon.toString());

					}

					if(!type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_ORDER) && !type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_REQUEST) && !ChangeCommon.isKindOfChangeAction(context,type) && !strTypeKinfOf.equalsIgnoreCase("Change")) {
						sbEditIcon.append("-");
						columnVals.add(sbEditIcon.toString());
					}

				}//end of while

			}

			return columnVals;
		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	}

	/**
	 * Program to Show Policies
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
	 * @throws        Exception if the operation fails
	 * @since         ECM R211
	 **
	 */
	@Deprecated
	public HashMap showPolicies(Context context,String []args) throws Exception {

		if (args.length == 0 )
		{
			throw new IllegalArgumentException();
		}




		HashMap paramMap = (HashMap)JPO.unpackArgs(args);
		HashMap requestMap = (HashMap)paramMap.get("requestMap");
		HashMap fieldMap = (HashMap)paramMap.get("fieldMap");

		String language     = (String)requestMap.get("languageStr");
		String propertyFile = (String)requestMap.get("StringResourceField");

		String sFormalPolicy = PropertyUtil.getSchemaProperty(context,"policy_FormalChange");
		String sFasttrackPolicy = PropertyUtil.getSchemaProperty(context,"policy_FasttrackChange");

		String localsFormalProcess = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),"emxFramework.Policy."+sFormalPolicy.replaceAll(" ", "_"));

		String localsFasttrack = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),"emxFramework.Policy."+sFasttrackPolicy.replaceAll(" ", "_"));

		StringList fieldRangeValues = new StringList();
		StringList fieldDisplayRangeValues = new StringList();
		HashMap tempMap = new HashMap();

		String policy = "";
		String il18NPolicyName;
		HashMap fieldValues = (HashMap)paramMap.get("fieldValues");

		String selectType = "Change Order";
		String keyRangeValue = "field_choices";
		String keyDisplayRangeValue = "field_display_choices";

		if(fieldValues!=null)
		{

			selectType = (String)fieldValues.get("DefaultType");
			keyRangeValue = "RangeValues";
			keyDisplayRangeValue = "RangeDisplayValues";

		}
			Map sPolicyMap = mxType.getDefaultPolicy(context,selectType, false);

			String languageStr = context.getSession().getLanguage();
			String sDefaultPolicy = (String)sPolicyMap.get("name");

			MapList policyList = mxType.getPolicies(context, selectType, false);

			Iterator itr = policyList.iterator();
			while(itr.hasNext())
			{
				Map newMap = (Map)itr.next();
				String policyName = (String)newMap.get("name");
				il18NPolicyName=i18nNow.getAdminI18NString(ChangeConstants.POLICY, policyName,languageStr);
				fieldRangeValues.add(policyName);
				fieldDisplayRangeValues.add(il18NPolicyName);

			}

			tempMap.put(keyRangeValue, fieldRangeValues);
			tempMap.put(keyDisplayRangeValue, fieldDisplayRangeValues);


			return tempMap;
	}//end of method

	/**
	 * Shows History Date column values on table in CO Properties page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public Vector getHistoryDate(Context context, String[] args) throws Exception {
		return getHistoryColumn(context, args, ChangeConstants.DATE);
	}

	/**
	 * Shows History Person column values on table in CO Properties page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public Vector getHistoryPerson(Context context, String[] args) throws Exception {
		return getHistoryColumn(context, args, ChangeConstants.PERSON);
	}

	/**
	 * Shows History Action column values on table in CO Properties page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public Vector getHistoryAction(Context context, String[] args) throws Exception {
		return getHistoryColumn(context, args, ChangeConstants.ACTION);
	}

	/**
	 * Shows History State column values on table in CO Properties page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public Vector getHistoryState(Context context, String[] args) throws Exception {
		return getHistoryColumn(context, args, ChangeConstants.STATE);
	}
	/**
	 * Shows History Description column values on table in CO Properties page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public Vector getHistoryDescription(Context context, String[] args) throws Exception {
		return getHistoryColumn(context, args, ChangeConstants.DESCRIPTION);
	}

	/**
	 * Shows History column values on table in CO Properties page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	private Vector getHistoryColumn(Context context, String[] args, String colName) throws Exception {
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		MapList objectList = (MapList) paramMap.get(ChangeConstants.OBJECT_LIST);
		Vector valVactor = new Vector();
		if (objectList != null) {
			for (int i = 0; i < objectList.size(); i++) {
				Map obj      = (Map) objectList.get(i);
				String value = (String) obj.get(colName);
				if (ChangeUtil.isNullOrEmpty(value))
					valVactor.add("");
				else
					valVactor.add(value);
			}
		}
		return valVactor;
	}

	/**
	 * Trigger Method to send notification after functionality Change Owner.
	 * @author
	 * @param context - the eMatrix <code>Context</code> object
	 * @param args - Object Id of Change
	 * @return int - Returns integer status code
            0 - in case the trigger is successful
	 * @throws Exception if the operation fails
	 * @since ECM R211
	 */
	@Deprecated
	public int notifyOwner(Context context, String[] args) throws Exception {
		return 0;
	}
	/**
	 * This method checks whether Change Coordinator is assigned to change or not.
	 * @author
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds objectId.
	 * @param args
	 *            holds relationship name
	 * @return integer 0 if Change Coordinator is assigned else 1
	 * @throws Exception if the operation fails.
	 * @since ECM R211
	 */
	@Deprecated
	public int checkForChangeCoordinator(Context context, String args[]) throws Exception {
		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}

		int retValue = 0;
		try {
			String objectId = args[0];
			setId(objectId);
			String relationshipName =  PropertyUtil.getSchemaProperty(context,args[1]);
			String resourceFieldId  =  args[2];
			String propertyKey      =  args[3];

			String changeCoordinator = getInfo(context,"from["+relationshipName+"].to.id");

			String Message           = EnoviaResourceBundle.getProperty(context, resourceFieldId, context.getLocale(),propertyKey);

			if (ChangeUtil.isNullOrEmpty(changeCoordinator)){
				//${CLASS:emxContextUtilBase}.mqlNotice(context, Message);
				MqlUtil.mqlCommand(context, "notice $1",Message);
				return 1;
			}
		}catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		return retValue;
	}

	/**
	 * This method checks whether atleast one primary affected item connected to Change Order before moving to prepare state
	 * @author
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds objectId.
	 * @param args
	 *            holds relationship name
	 * @return Integer 0 if primary affected item is connected else 1.
	 * @throws Exception if the operation fails.
	 * @since ECM R211
	 */
	@Deprecated
	public int checkForAffectedItemConnected(Context context, String args[]) throws Exception {

		System.out.println("inside    checkForAffectedItemConnected");
		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}

		int retValue = 0;
		try {
			String objectId = args[0];
			setId(objectId);
			String relationshipName =  PropertyUtil.getSchemaProperty(context,args[1]);
			String typeName         =  PropertyUtil.getSchemaProperty(context,args[2]); //Change Action
			String resourceFieldId  =  args[3];
			String propertyKey      =  args[4];

			StringList objectSelect = new StringList(1);
			objectSelect.addElement(SELECT_TYPE);
			objectSelect.addElement(SELECT_ID);
			objectSelect.addElement("physicalid");
			String Message       =EnoviaResourceBundle.getProperty(context, resourceFieldId, context.getLocale(),propertyKey);
			MapList affectedList = getRelatedObjects(context,
					relationshipName,
					typeName, //DomainConstants.QUERY_WILDCARD,
					objectSelect,
					null,
					false,
					true,
					(short) 1,
					null,null,
					(short)0);

			// Get All Child COs
			String strCOPolicy = getInfo(context, DomainConstants.SELECT_POLICY);
			String state_Cancelled = PropertyUtil.getSchemaProperty(context,
                    "policy",
                    strCOPolicy, //use context's policy
                    "state_Cancelled");
			StringBuffer strWhereExpressionBuf = new StringBuffer(100);
			strWhereExpressionBuf.append("(current!=\"");
			 strWhereExpressionBuf.append(state_Cancelled);
             strWhereExpressionBuf.append("\")");
			com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder changeOrder = new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder(objectId);
			MapList mlAllChildCOs = changeOrder.getChildren(context, new StringList(), new StringList(), strWhereExpressionBuf.toString(), DomainConstants.EMPTY_STRING);
			boolean checkNoPropesedChnage = false;
			
			if (affectedList != null && affectedList.size() > 0) {
                // IR-621439 need a change action (not necessarily proposed changes)
                // TSK4444152 allow Fast track CO without proposed change attached to be promoted to In Work (but with CA)
                String POLICY_FASTTRACK_CHANGE = PropertyUtil.getSchemaProperty(context,"policy_FasttrackChange");
                String sPolicy = getInfo(context, DomainObject.SELECT_POLICY);
                boolean bSkipCheck = POLICY_FASTTRACK_CHANGE.equals(sPolicy);

                if(bSkipCheck){
				System.out.println("returning because bSkipCheck  retValue  from checkForAffectedItemConnected  " + retValue);
				return retValue;}

				Iterator iter = affectedList.iterator();
				retValue = 1;
				while( iter.hasNext()){
					Map caMap = (Map)iter.next();
					String type = (String) caMap.get(SELECT_TYPE);

					if (type.equals(ChangeConstants.TYPE_CCA)) {
						String ccaId = (String) caMap.get(SELECT_ID);
						retValue = 0;
						String affectedItemExists = DomainObject.newInstance(context, ccaId).getInfo(context, "from[" + DomainConstants.RELATIONSHIP_AFFECTED_ITEM + "]");

						if ("False".equalsIgnoreCase(affectedItemExists)) {
							retValue = 1;
						}
					}else{
						String sCAId = (String) caMap.get("physicalid");
						//check if proposed change or realized change (work under) present
						IChangeAction changeActionObj = new ChangeAction().getChangeAction(context, sCAId);
						List<IProposedChanges> proposedChangesList = changeActionObj.getProposedChanges(context);
                        List<IRealizedChange> realizedChangesList = changeActionObj.getRealizedChanges(context);

						if((proposedChangesList != null && proposedChangesList.size() > 0) ||
                           (realizedChangesList != null && realizedChangesList.size() > 0)){
							retValue = 0;
							break;
						}
						else 
							checkNoPropesedChnage = true;
					}
				}
			} else if(mlAllChildCOs!=null && mlAllChildCOs.size()>0){
				retValue = 0;
			} else {
				checkNoPropesedChnage = true;
			}	
			if(checkNoPropesedChnage)
			{
			//	${CLASS:emxContextUtilBase}.mqlNotice(context, Message);
			   MqlUtil.mqlCommand(context, "notice $1", Message);
				retValue = 1;
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		System.out.println("returning  retValue  from checkForAffectedItemConnected  " + retValue);
		return retValue;
	}
   /**
	 * This trigger function determines if there are any connected objects to CO/CA
	 * @author S4Y
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds Trigger Params
	 * @return Integer 0 if primary affected item is connected else 1.
	 * @throws Exception if the operation fails.
	 * @since ECM R216
	 */
	@Deprecated
	public int checkIfAffectedItemConnected(Context context, String args[]) throws Exception {

		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}

		int retValue = 0;
		try {
			String objectId = args[0];
			setId(objectId);

			String relationshipName =  PropertyUtil.getSchemaProperty(context,args[1]);
			String typeName         =  PropertyUtil.getSchemaProperty(context,args[2]);
			if(UIUtil.isNullOrEmpty(typeName))
				typeName = args[2];
			String resourceFieldId  =  args[3];
			String propertyKey      =  args[4];
			String sCurrent 		=  args[5];
			String sOwner			=  args[6];

			StringList objectSelects = new StringList(3);
			objectSelects.addElement("physicalid");

		    StringList relSelects = new StringList(SELECT_ID);
		    StringList strAffectedItemId = null;

		    String Message       =EnoviaResourceBundle.getProperty(context, resourceFieldId, context.getLocale(),propertyKey);
			MapList connectedCAList = getRelatedObjects(context,
													relationshipName,
													"*",
													objectSelects,
													null,
													false,
													true,
													(short) 1,
													null,null,
													(short)0);

				if (connectedCAList != null && connectedCAList.size() > 0){
					Iterator iter = connectedCAList.iterator();
					while( iter.hasNext()){
						String sCAId = (String)((Map)iter.next()).get("physicalid");
						//check if proposed \ realized change is present
						IChangeAction changeActionObj = new ChangeAction().getChangeAction(context, sCAId);
						List<IProposedChanges> proposedChangesList = changeActionObj.getProposedChanges(context);
						List realizedChangeList=changeActionObj.getRealizedChanges(context);

						if((proposedChangesList != null && proposedChangesList.size() > 0) ||
						   (realizedChangeList != null && realizedChangeList.size() > 0)){
							//${CLASS:emxContextUtilBase}.mqlNotice(context, Message);
							MqlUtil.mqlCommand(context, "notice $1", Message);
							return 1;
						}
					}
				}
		}catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		return retValue;
	}

	/**
	 * this method retrieves the Change Coordinator and assigns as the owner of the Change
	 * @author
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args1
	 *            holds objectId.
	 * @param args2
	 *            holds Relationship Name.
	 * @return 0 if success else 1 for failure
	 * @throws Exception if the operation fails.
	 * @since ECM R211
	 */
	@Deprecated
	public int RouteToChangeCoordinator(Context context, String args[]) throws Exception {

		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}
		System.out.println("inside   RouteToChangeCoordinator ");

		int success = 0;

		String objectId = args[0];
		setId(objectId);
		String relationName      = PropertyUtil.getSchemaProperty(context,args[1]);
		String coordinatorSelect = "from["+relationName+"].to.name";
		String owner = SELECT_OWNER;

		StringList objSelects = new StringList(2); objSelects.addElement(coordinatorSelect);
		objSelects.addElement(owner);
		try {
			Map objMap = getInfo(context, objSelects);
			String currentOwner      = (String)objMap.get(owner);
			String changeCoordinator = (String)objMap.get(coordinatorSelect);

			System.out.println("inside  RouteToChangeCoordinator currentOwner       " +currentOwner);
			System.out.println("inside  RouteToChangeCoordinator changeCoordinator       " +changeCoordinator	 	);

			//If Change Coordinator is not empty and if he is not the owner then set Change Coordinator as owner
			if (!ChangeUtil.isNullOrEmpty(changeCoordinator) && !currentOwner.equalsIgnoreCase(changeCoordinator))
				setOwner(context, changeCoordinator);
		}
		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		System.out.println("exiting RouteToChangeCoordinator  return val    " +success);
		return success;
	}

	/**
	 * This method is used check promote trigger on different states of the policies. checks if the RouteTemplate is attached
	 * for context change object or not
	 * @author
	 * @param context
	 * @param args
	 *            0 - String containing object id.
	 *            1 - String Approval Or Reviewer RouteTemplate.
	 *            2 - String Resource file name
	 *            3 - String Resource field key
	 * @return int 0 for success or 1 for failure
	 * @throws Exception if the operation fails. * *
	 * @since  ECM R211
	 */
	@Deprecated
	public int checkRouteTemplateForState(Context context, String[] args) throws Exception {

		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}
		System.out.println(" Inside    checkRouteTemplateForState   ");

		String objectId = args[0];// Change Object Id
		String routeBasePurpose  = args[1];
		String relationName      = RELATIONSHIP_OBJECT_ROUTE;
		String typeName          = TYPE_ROUTE_TEMPLATE;
		String resourceFieldId   = args[2];
		String propertyKey       = args[3];

		System.out.println("routeBasePurpose      "  +  routeBasePurpose);
		MapList mapRouteTemplate = null;//new MapList();

		try {

			// create change object with the context Object Id
			setId(objectId);
			StringList selectStmts = new StringList(1);
			selectStmts.addElement("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");

            String sRouteBaseStateSymbolic = "Review".equals(routeBasePurpose)?"state_InReview":"state_InApproval";
            String strRelWhereClause = "(attribute[" + ATTRIBUTE_ROUTE_BASE_STATE + "] == "+sRouteBaseStateSymbolic+")";
            String strWhereClause = "current == Active";
			//String strWhereClause = "attribute["+ ATTRIBUTE_ROUTE_BASE_PURPOSE + "] match '"	+ routeBasePurpose + "' && current == Active";

			// get route template objects from change object
			mapRouteTemplate = getRelatedObjects(context,
					relationName,
					typeName,
					selectStmts,
					null,
					false,
					true,
					(short) 1,
					strWhereClause,
					strRelWhereClause,
					(short) 0);

			System.out.println("mapRouteTemplate   from latest  data       "  +  mapRouteTemplate);
            //try to find from legacy data
            if(mapRouteTemplate==null || mapRouteTemplate.size() < 1){
                strWhereClause = "attribute["+ ATTRIBUTE_ROUTE_BASE_PURPOSE + "] match '"	+ routeBasePurpose + "' && current == Active";
                mapRouteTemplate = getRelatedObjects(context,
					relationName,
					typeName,
					selectStmts,
					null,
					false,
					true,
					(short) 1,
					strWhereClause,
					null,
					(short) 0);
            }

        	System.out.println("mapRouteTemplate   from legacy  data       "  +  mapRouteTemplate);
        	System.out.println("mapRouteTemplate    "  + mapRouteTemplate.size());

			if(mapRouteTemplate != null && mapRouteTemplate.size() == 1) {
				return 0; // returns true if there is only one Active route template objects connected with change object
			}
			else if(mapRouteTemplate != null && mapRouteTemplate.size() > 1) { //returns error in case multiple route template connected
				//${CLASS:emxContextUtil}.mqlNotice(context,EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.TooManyRouteTemplate"));
				String Message = EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.TooManyRouteTemplate");
				MqlUtil.mqlCommand(context, "notice $1", Message);
				return 1;
			}
			else {
				//${CLASS:emxContextUtil}.mqlNotice(context,EnoviaResourceBundle.getProperty(context, resourceFieldId, context.getLocale(),propertyKey));
				String msg = EnoviaResourceBundle.getProperty(context, resourceFieldId, context.getLocale(),propertyKey);
				MqlUtil.mqlCommand(context, "notice $1", msg);
				return 1;
			}

		} catch (Exception ex) {
			ex.printStackTrace();
			System.out.println(" Inside    checkRouteTemplateForState  returing  1 ");
			return 1;// return false
		}

	}

	/**
	 * This method retrieves all the route template details from Change Object, then calls Route API to create
	 * route from Route Template and attaches to Change Object.
	 * @param context
	 *            the eMatrix <code>Context</code> object
	 * @param args:
	 *            0 - Change Order Id
	 *            1 - Route Base Purpose The kind of Route (Route Base Purpose) can be Approval,Review,Standard
	 *            2 - Change Order policy
	 *            3 - Change Order current state
	 * @returns 0 for success
	 * @throws Exception if the operation fails
	 * @since ECM R211
	 */
	@Deprecated
	public int createRouteFromRouteTemplate(Context context, String[] args) throws Exception {

		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}
		System.out.println("createRouteFromRouteTemplate  INside");
		String changeObjId       = args[0]; // Change Object
		String routeBasePurpose  = args[1];
		String contextObjectPolicyName  = args[2];
		String contextObjectStateName  = args[3];

		String strAttributeRouteCompletionAction = PropertyUtil.getSchemaProperty(context, "attribute_RouteCompletionAction");

		String strAttributeRouteBasePurpose = PropertyUtil.getSchemaProperty(context, "attribute_RouteBasePurpose");
		String SELECT_ATTR_ROUTE_BASE_PURPOSE = "attribute[" +  PropertyUtil.getSchemaProperty(context, "attribute_RouteBasePurpose")  + "]";

		String strAttributeRouteBasePolicy = PropertyUtil.getSchemaProperty(context, "attribute_RouteBasePolicy");
		String strAttributeRouteBaseState = PropertyUtil.getSchemaProperty(context, "attribute_RouteBaseState");
		String strAttributeAutoStopRejection = PropertyUtil.getSchemaProperty(context, "attribute_AutoStopOnRejection" );
		String SELECT_ATTR_AUTO_STOP_REJECTION = "attribute[" + PropertyUtil.getSchemaProperty(context, "attribute_AutoStopOnRejection" ) + "]";

		try {
			Map reviewerInfo = new HashMap();
			String routeTemplateID   = "";
			String strRouteTemplateDescription  = "";
            boolean bOldBehavior = false;

			setId(changeObjId);// change object

			// Change Object Owner will be set as Route Owner
			String strCOOwner = getInfo(context, DomainConstants.SELECT_OWNER);

			Map routeAttributeMap = new HashMap();

			Map objectRouteAttributeMap = new HashMap();

			StringList objectSelects = new StringList(SELECT_ID);
			objectSelects.add(RouteTemplate.SELECT_DESCRIPTION);
			objectSelects.add(SELECT_ATTR_AUTO_STOP_REJECTION);
			objectSelects.add(SELECT_ATTR_ROUTE_BASE_PURPOSE);

			StringList relSelects = new StringList();
            String sRouteBaseStateSymbolic = "Review".equals(routeBasePurpose)?"state_InReview":"state_InApproval";
            String strRelWhereClause = "(attribute[" + ATTRIBUTE_ROUTE_BASE_STATE + "] == "+sRouteBaseStateSymbolic+")";
			//String strWhereClause = "attribute[" + ATTRIBUTE_ROUTE_BASE_PURPOSE + "] == "+routeBasePurpose+"] && (current == '"+ STATE_ROUTE_TEMPLATE_ACTIVE +"')";
            String strWhereClause = "(current == '"+ STATE_ROUTE_TEMPLATE_ACTIVE +"')";

			//Getting Route Template Details for new behavior: filter Route Base State instead of Route Base Purpose
			MapList mlRouteTemplate = getRelatedObjects(context,
					RELATIONSHIP_OBJECT_ROUTE,
					TYPE_ROUTE_TEMPLATE,
					objectSelects,
					relSelects,
					false,
					true,
					(short) 1,
					strWhereClause,
					strRelWhereClause,
					(short) 0);

			System.out.println("mlRouteTemplate 1 " + mlRouteTemplate);
            //not found, find route template from old behavior: Route Base Purpose
            if(mlRouteTemplate==null || mlRouteTemplate.size()<1){
                bOldBehavior = true;
                String strWhereClauseOldBehavior = "attribute[" + ATTRIBUTE_ROUTE_BASE_PURPOSE + "] == "+routeBasePurpose+" && (current == '"+ STATE_ROUTE_TEMPLATE_ACTIVE +"')";
                mlRouteTemplate = getRelatedObjects(context,
                                                    RELATIONSHIP_OBJECT_ROUTE,
                                                    TYPE_ROUTE_TEMPLATE,
                                                    objectSelects,
                                                    relSelects,
                                                    false,
                                                    true,
                                                    (short) 1,
                                                    strWhereClauseOldBehavior,
                                                    null,
                                                    (short) 0);
            }

            System.out.println("mlRouteTemplate   size      "  +  mlRouteTemplate);

			Iterator<?> itr = mlRouteTemplate.iterator();
			while(itr.hasNext()){
				Map mapRouteTemplate = (Map)itr.next();
				routeTemplateID = (String)mapRouteTemplate.get(SELECT_ID);
				strRouteTemplateDescription = (String)mapRouteTemplate.get(RouteTemplate.SELECT_DESCRIPTION);

				//attributes to be set on type Route
				routeAttributeMap.put(strAttributeRouteCompletionAction, "Promote Connected Object");
				routeAttributeMap.put(strAttributeAutoStopRejection, mapRouteTemplate.get(SELECT_ATTR_AUTO_STOP_REJECTION));
				routeAttributeMap.put(strAttributeRouteBasePurpose,mapRouteTemplate.get(SELECT_ATTR_ROUTE_BASE_PURPOSE));

				// attributes to be set on relationship Object Route
				objectRouteAttributeMap.put(strAttributeRouteBasePolicy,FrameworkUtil.getAliasForAdmin(context, "Policy", args[2], false));
				objectRouteAttributeMap.put(strAttributeRouteBaseState, FrameworkUtil.reverseLookupStateName(context, args[2], args[3]));
				objectRouteAttributeMap.put(strAttributeRouteBasePurpose, "Standard");

				//added temporary to check with user other than User Agent
				ContextUtil.pushContext(context,strCOOwner, null, null);

				Route newRouteObj = Route.createAndStartRouteFromTemplateAndReviewers(context,
						routeTemplateID,
						strRouteTemplateDescription,
						strCOOwner,
						changeObjId,
						contextObjectPolicyName,
						contextObjectStateName,
						routeAttributeMap,
						objectRouteAttributeMap,
						reviewerInfo,
						true);

				//if routeBasePurpose is not for Approval, set all route's action to "Approve"
				//this needs to be removed once the full function implementation is in place to take in only Approval Route Templates
                //FUN084308 - as only Approval RT is supported, this code is obsolete.
                //However, to support legacy data, needs to keep this
				System.out.println("inside  createRoutefromtemplate    newRouteObj  prin  " +  newRouteObj);
				System.out.println("inside  createRoutefromtemplate    routeBasePurpose   " +  routeBasePurpose);
				if(!"Approval".equalsIgnoreCase(routeBasePurpose)){
					//String nodeTypePattern = TYPE_PERSON + "," + TYPE_ROUTE_TASK_USER;
					System.out.println("task creation for Route");
					String nodeTypePattern = "Inbox Task";
					StringList relProductSelects = new StringList(1);
					relProductSelects.add(SELECT_RELATIONSHIP_ID);
					StringList busSelects = new StringList(SELECT_ID);
					MapList routeNodeList = newRouteObj.getRelatedObjects(context,
							RELATIONSHIP_ROUTE_TASK,
							TYPE_INBOX_TASK, busSelects,
							relProductSelects, true, false, (short) 1, null,null,(short) 0);

					System.out.println("task creation for Route" + routeNodeList) ;
					Iterator itrRouteNodeList = routeNodeList.iterator();
					while (itrRouteNodeList.hasNext()) {
						Map routeNodeMap = (Map) itrRouteNodeList.next();
						String strInboxTask = (String)routeNodeMap.get(SELECT_ID);
						DomainObject domIT = DomainObject.newInstance(context, strInboxTask);
						//attribute map for Route node relationship
						HashMap routeAttrMap = new HashMap();
						routeAttrMap.put(ATTRIBUTE_ROUTE_ACTION,"Approve");
						domIT.setAttributeValues(context, routeAttrMap);
                    }
                }

				ContextUtil.popContext(context);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());

		}
		return 0;
	}

	/**
	 * @author
	 * Set Scheduled Complete Date attribute for all RouteNodes constructed from the maplist
	 * The Completion Due Date is got by adding Offset days attribute to current System date-time
	 * @param context the eMatrix <code>Context</code> object
	 * @param MapList Task list for which offset date has to be set
	 * @returns nothing
	 * @throws FrameworkException if the operation fails
	 * @since Common X3
	 */
	@Deprecated
	public void setDueDatesFromOffset(Context context, MapList offsetList) throws Exception
	{

		String attrDueDateOffset      = PropertyUtil.getSchemaProperty(context, "attribute_DueDateOffset");
		String selDueDateOffset       = "attribute["+attrDueDateOffset+"]";

		Map rNodeMap                     = null;
		DomainRelationship relObjRouteNode     = null;
		Attribute scheduledDateAttribute = null;
		AttributeList timeAttrList       = new AttributeList();
		GregorianCalendar cal            = new GregorianCalendar();
		GregorianCalendar offSetCal      = new GregorianCalendar();
		SimpleDateFormat formatterTest   = new SimpleDateFormat (eMatrixDateFormat.getInputDateFormat(),Locale.US);

		Iterator nextOrderOffsetItr      = offsetList.iterator();

		// get the equivalent server time with required timezone

		cal.setTime(new Date(cal.getTime().getTime())); //modified on 8th March
		String routeTaskScheduledDateStr  = null;
		String rNodeId                    = null;
		String duedateOffset              = null;

		try
		{
			while(nextOrderOffsetItr.hasNext())
			{
				// use separate calendar objects and reset offSetCal to master calendar to ensure
				// all delta tasks are offset from same Route Start Time.
				offSetCal      = (GregorianCalendar)cal.clone();
				rNodeMap       = (Map) nextOrderOffsetItr.next();
				rNodeId        = (String)rNodeMap.get(DomainObject.SELECT_RELATIONSHIP_ID);
				duedateOffset  = (String)rNodeMap.get(selDueDateOffset);
				// construct corresponding RouteNode relationships and now set correct due-date
				// by adding delta offset to Current time (Route Start) time
				relObjRouteNode             = new DomainRelationship(rNodeId);
				offSetCal.add(Calendar.DATE, Integer.parseInt(duedateOffset));
				routeTaskScheduledDateStr   = formatterTest.format(offSetCal.getTime());
				scheduledDateAttribute      = new Attribute(new AttributeType(ATTRIBUTE_SCHEDULED_COMPLETION_DATE) ,routeTaskScheduledDateStr);
				timeAttrList.add(scheduledDateAttribute);

				// set Scheduled Completion date attribute
				relObjRouteNode.setAttributes(context,timeAttrList);
			}
		}
		catch (Exception ex)
		{
			throw ex;
		}
	}
	/**
	 * Reset Owner on demote of ChangeObject
	 * @author
	 * @param context the eMatrix <code>Context</code> object
	 * @param args holds the following input arguments:
	 * 0 - String holding the object id.
	 * @returns void.
	 * @throws Exception if the operation fails
	 * @since ECM R211
	 */
	@Deprecated
	public void resetOwner(Context context, String[] args)
			throws Exception
			{
		com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder changeOrder = new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder();
		changeOrder.resetOwner(context,args);
			}

	/**
	 * this method checks the Related object state Returns Boolean determines whether the connected
	 * objects are in appropriate state.
	 *
	 * @author
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds objectId.
	 * @param args
	 *            holds relationship name.
	 * @param args
	 *            holds type name.
	 * @param args
	 *            holds policy name.
	 * @param args
	 *            holds State.
	 * @param args
	 *            holds TO/FROM.
	 * @param args
	 *            holds String Resource file name
	 * @param args
	 *            holds String resource filed key name.
	 * @return Boolean determines whether the connected objects are in
	 *         appropriate state.
	 * @throws Exception if the operation fails.
	 * @since ECM R211
	 */
	@Deprecated
	public int checkRelatedObjectsInProperState(Context context,String args[]) throws Exception {

		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}

		System.out.println("checkRelatedObjectsInProperState  inside ");
		String objectId = args[0];
		setId(objectId);
		String strRelationshipName = PropertyUtil.getSchemaProperty(context,args[1]);
		String strTypeName         = PropertyUtil.getSchemaProperty(context,args[2]);
		String strPolicyName       = PropertyUtil.getSchemaProperty(context,args[3]);

		String strStates = args[4];
		boolean boolTo   = args[5].equalsIgnoreCase("TO")?true:false;
		boolean boolFrom = args[5].equalsIgnoreCase("FROM")?true:false;

		String strResourceFieldId = args[6];
		String strStringId        = args[7];

		String strMessage         = EnoviaResourceBundle.getProperty(context, strResourceFieldId, context.getLocale(),strStringId);
		String strCurrentState    = args[8];
		String strPolicy          = args[9];


		StringList stateList = new StringList ();
		String state = "";
		String strRelnWhereClause = "";
		String strSymbolicCurrentPolicy = FrameworkUtil.getAliasForAdmin(context, "policy", strPolicy, true);
		String strSymbolicCurrentState  = FrameworkUtil.reverseLookupStateName(context,strPolicy,strCurrentState);

		String RouteBasePolicy = PropertyUtil.getSchemaProperty(context,"attribute_RouteBasePolicy");
		String RouteBaseState  = PropertyUtil.getSchemaProperty(context,"attribute_RouteBaseState");

		String INTERFACE_CHANGEONHOLD = PropertyUtil.getSchemaProperty(context, "interface_ChangeOnHold");
		String SELECT_INTERFACE_CHANGE_ON_HOLD = "interface[" + INTERFACE_CHANGEONHOLD + "]";

		int ichkvalue = 0;
		if (strStates.indexOf(" ")>-1){
			stateList = FrameworkUtil.split(strStates, EMPTY_STRING);
		}
		else if (strStates.indexOf(",")>-1){
			stateList = FrameworkUtil.split(strStates, ChangeConstants.COMMA_SEPERATOR);
		}
		else if(strStates.indexOf("~")>-1){
			stateList = FrameworkUtil.split(strStates, ChangeConstants.TILDE_DELIMITER);
		}
		else{
			stateList = FrameworkUtil.split(strStates, "");
		}

		StringList actualStatelist = new StringList();
		for (Iterator stateItr = stateList.iterator();stateItr.hasNext();){
			state = (String)stateItr.next();
			if("state_Cancelled".equals(state)){
				actualStatelist.addElement(PropertyUtil.getSchemaProperty(context, "policy", "Cancelled" ,state));
			}
			actualStatelist.addElement(PropertyUtil.getSchemaProperty(context, "policy", strPolicyName , state));
		}

		if(RELATIONSHIP_OBJECT_ROUTE.equalsIgnoreCase(strRelationshipName)){
			strRelnWhereClause = "attribute["+RouteBasePolicy+"] == "+strSymbolicCurrentPolicy+" && attribute["+RouteBaseState+"] == "+strSymbolicCurrentState;
		}

		//if type is type_ChangeAction, check whether it's a Post Process CA. If so, ignore the check
        //String TYPE_CHANGE_ACTION = PropertyUtil.getSchemaProperty(context,"type_ChangeAction");
		boolean bCAType = ChangeCommon.isKindOfChangeAction(context,strTypeName);//(TYPE_CHANGE_ACTION.equals(strTypeName))?true:false;

		StringList busSelects = new StringList(3);
		busSelects.add(SELECT_ID);
		busSelects.add(SELECT_CURRENT);
		busSelects.add(SELECT_INTERFACE_CHANGE_ON_HOLD);
		busSelects.add(SELECT_TYPE);
		MapList maplistObjects = new MapList();

		try
		{
			maplistObjects = getRelatedObjects(context,
					strRelationshipName,
					strTypeName,
					busSelects,          // object Select
					null,           // rel Select
					boolFrom,            // to
					boolTo,              // from
					(short)1,
					null,                // ob where
					strRelnWhereClause,  // rel where
					(short)0
					);
		}
		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		if (maplistObjects != null && (maplistObjects.size() > 0)) {
			Iterator itr = maplistObjects.iterator();
			while (itr.hasNext() && ichkvalue != 1) {
				Map mapObject = (Map) itr.next();
				String type = (String) mapObject.get(SELECT_TYPE);
				//commented to handle both the conditions below
				//ichkvalue     = actualStatelist.contains(mapObject.get("current")) ? 0 : 1;

                //if it's a Post Process CA object, ignore the check
                String sObjId = (String)mapObject.get(SELECT_ID);
                DomainObject dmObj = DomainObject.newInstance(context, sObjId);
				//if(bCAType && dmObj.isKindOf(context, TYPE_CHANGE_ACTION)){
				if(bCAType && ChangeCommon.isKindOfChangeAction(context,type)){
					IChangeAction changeActionObj = new ChangeAction().getChangeAction(context, sObjId);
					if(changeActionObj.isPostProcess(context)){continue;}
				}

				String strChangeOnHold = (String) mapObject.get(SELECT_INTERFACE_CHANGE_ON_HOLD);
				ichkvalue = actualStatelist.contains(mapObject.get("current")) && "FALSE".equalsIgnoreCase(strChangeOnHold)? 0 : 1;
				if(ichkvalue==1){
					break;
				}
			}

		}
		if((maplistObjects == null || maplistObjects.size()==0) && ChangeConstants.TYPE_CHANGE_ORDER.equals(strTypeName)){
			strMessage = EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.CRIsNotConnectedToCO");
			ichkvalue = 1;
		}
		if(ichkvalue == 1) {
			//${CLASS:emxContextUtil}.mqlNotice(context,strMessage);
			 MqlUtil.mqlCommand(context, "notice $1", strMessage);
		}

		return ichkvalue;
	}
	/**
	 * This method notifies CA assignees regarding CA assignment
	 * @author yoq
	 * @param context matrix code context object
	 * @param args trigger parameters
	 * @param args[0]-------change object id
	 * @param args[1]-------Change Action relationship helps to retrieve all CAs from CO
	 * @param args[2]-------Assignee relationship helps to retrieve all Assignees from CA
	 * @param args[3]-------Subject key to pass in the notification
	 * @param args[4]-------message key to pass in the notification
	 * @param args[5]-------Suite key to pass in the notification
	 * @throws Exception if the operation fails
	 */
	@Deprecated
	public int transferOwnershipAndNotifyAssignees(Context context,String []args) throws Exception 
	{
		return 0;
	}

	/**
	 * This trigger method notifies the owner/originator/Distribution List members regarding change Completion.
	 *
	 * @author
	 * @param context The ematrix context of the request.
	 * @param args The string array containing the following arguments
	 *          0 - The object id of the context Engineering Change Object
	 *          1 - The attribute person selectables
	 *          2 - The relationship person selectables
	 * @throws Exception
	 * @throws FrameworkException
	 * @since ECM R211
	 */
	@Deprecated
	public int notifyOnComplete(Context context, String[] args) throws Exception, FrameworkException {
		return 0;
	}

	/**This method includes Responsible Organisation OIDs for Create CO RO field search.
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
	public StringList includeROs(Context context, String []args) throws Exception {
		boolean isChangeRequest = false;
		if (args.length == 0 ){
			throw new IllegalArgumentException();
		}

		//Check if Change Request object creation
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		String sourceType = (String) paramMap.get(SOURCE_TYPE);
		if(sourceType != null){
			if(sourceType.trim().equals(this.TYPE_CHANGE_REQUEST)){
				isChangeRequest = true;
			}
		}

		boolean userAtHostCompanylevel = false;
		StringList includeOIDList = new StringList();
		HashSet sFinalOrgSet = new HashSet();
		MapList sOrganizationList = new MapList();

		try{
			DomainObject dmObj = DomainObject.newInstance(context);

			SelectList selectList = new SelectList();
			Vector vAssignment = new Vector();
			selectList.add(SELECT_ID);

			String orgId = PersonUtil.getUserCompanyId(context);
			String loggedInPersonId = PersonUtil.getPersonObjectID(context);
			String orgName = new DomainObject(orgId).getInfo(context, SELECT_NAME);


			StringList SCList = new StringList();
			SCList = PersonUtil.getSecurityContextsNames(context, context.getUser());

			vAssignment = PersonUtil.getAssignments(context);
			Set setOrganization = new HashSet();

			for(int index = 0; index<SCList.size(); index++) {
				String sOrganization = EMPTY_STRING;
				String securityContext = (String) SCList.get(index);
				int beginIndex = securityContext.indexOf(".");
				int endIndex = securityContext.lastIndexOf(".");
				if(beginIndex!=-1 && endIndex!=-1) {
					beginIndex = beginIndex+1;
					String sRole = securityContext.substring(0, (beginIndex - 1));
					if(!isRoleOCDX(context,sRole) || isChangeRequest ||
							(sRole.indexOf("Admin") >= 0 || sRole.indexOf("Leader") >= 0)) {
						sOrganization = securityContext.substring(beginIndex, endIndex);
						System.out.println("Organization Name::ZUK " + sOrganization);
						setOrganization.add(sOrganization);
					}
				}

			}

			Iterator organazationItr = setOrganization.iterator();
			while(organazationItr.hasNext()) {

				String sPersonBUName = (String)organazationItr.next();
				String sPersonBUId = MqlUtil.mqlCommand(context, "temp query bus $1 $2 $3 select $4 dump $5",DomainConstants.TYPE_ORGANIZATION,sPersonBUName,"*","id","|");
				sPersonBUId = sPersonBUId.substring(sPersonBUId.lastIndexOf('|')+1);


				dmObj.setId(sPersonBUId); //Organization Object
				sFinalOrgSet.add(sPersonBUId);

				sOrganizationList = dmObj.getRelatedObjects(context,
						RELATIONSHIP_DIVISION+","
						+RELATIONSHIP_COMPANY_DEPARTMENT,
						TYPE_ORGANIZATION,
						selectList,
						null,
						false,
						true,
						(short)0,
						EMPTY_STRING,
						EMPTY_STRING,
						null,
						null,
						null);

				Iterator sItr = sOrganizationList.iterator();
				while(sItr.hasNext()){
					Map sTempMap = (Map)sItr.next();
					String sOrgID = (String)sTempMap.get(SELECT_ID);
					System.out.println("BU/Dept Name::ZUK " + sOrgID);
					sFinalOrgSet.add(sOrgID);
				}

			}
			//Iterating final return list
			Iterator itr = sFinalOrgSet.iterator();
			while(itr.hasNext()){
				String id = (String)itr.next();
				includeOIDList.add(id);
			}

		}
		catch (Exception ex){
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		return includeOIDList;
	}

	/*Identify if given role is OCDX-role*/
	private boolean isRoleOCDX(Context context, String role) throws FrameworkException{
		boolean isOCDX = false;
		if(role != null){
			role = role.trim();
			String sResultOCDX = MqlUtil.mqlCommand(context,"print role $1 select $2",
					role,"property[SOLUTION].value");
			if(sResultOCDX!=null && !sResultOCDX.isEmpty() && sResultOCDX.contains("Team")){
				isOCDX = true;
			}
		}
		return isOCDX;
	}
	/**
	 * excludeAffectedItems() method returns OIDs of Affect Items
	 * which are already connected to context change object
	 * @param context Context : User's Context.
	 * @param args String array
	 * @return The StringList value of OIDs
	 * @throws Exception if searching Parts object fails.
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
	public StringList excludeAffectedItems(Context context, String args[])throws Exception
	{

		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		String  strChangeId = (String) programMap.get("objectId");
		changeOrder = new ChangeOrder(strChangeId);

		StringList strlAffItemList =excludeProposedItems(context);
		return strlAffItemList;
	}

	   /**
			 * excludeProposedItems() method returns OIDs of Affect Items
			 * which are already connected to context change object/change Request
			 * @param context mMatrix context
			 * @return The StringList value of OIDs
			 * @throws Exception if operation fails
			 */
			@Deprecated
			public StringList excludeProposedItems(Context context)throws Exception
			{
				StringList strlAffItemList = new StringList();
				try
				{
					//to check whether old legacy mode
						// get CO/CR id
						String ObjectId  = getInfo(context, DomainConstants.SELECT_ID);
						setId(ObjectId);
						MapList mlProposedItem = changeOrder.getProposedItems(context);

							Iterator itr = mlProposedItem.iterator();
							while(itr.hasNext()) {
								Map mapProposedItem = (Map)itr.next();
								DomainObject domObj = DomainObject.newInstance(context, (String)mapProposedItem.get(DomainObject.SELECT_ID));
								strlAffItemList.addElement(domObj.getInfo(context, DomainObject.SELECT_ID));
						}
				}catch (Exception e) {
					e.printStackTrace();
				}
				return strlAffItemList;
			}

	/**
	 * excludeCandidateItems() method returns OIDs of Candidate Items
	 * which are already connected to context change object
	 * @param context Context : User's Context.
	 * @param args String array
	 * @return The StringList value of OIDs
	 * @throws Exception if searching Parts object fails.
	 */
@Deprecated
@com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
public StringList excludeCandidateItems(Context context, String args[])throws Exception
	{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		String  strChangeId = (String) programMap.get("objectId");
		StringList strlAffItemList = new StringList();

		if (ChangeUtil.isNullOrEmpty(strChangeId))
			return strlAffItemList;

		try
		{
			setId(strChangeId);
			strlAffItemList.addAll(getInfoList(context, "from["+ChangeConstants.RELATIONSHIP_CANDIDATE_AFFECTED_ITEM+"].to.id"));

			changeOrder.setId(strChangeId);
			MapList mapList = changeOrder.getProposedItems(context);

			Iterator mapListItr = mapList.iterator();
			Map objMap;

			while(mapListItr.hasNext()) {
				objMap = (Map)mapListItr.next();

					strlAffItemList.add((String)objMap.get("id"));
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return strlAffItemList;
	}

	/**
	 * @author R3D
	 * Updates the Change Template in CO WebForm.
	 * @param context the eMatrix <code>Context</code> object
	 * @param args contains a MapList with the following as input arguments or entries:
	 * objectId holds the context CO object Id
	 * @throws Exception if the operations fails
	 * @since ECM-R215
	 */
	@Deprecated
	public DomainRelationship connectChangeTemplate(Context context, String[] args) throws Exception {

		try {
			//unpacking the Arguments from variable args
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get("paramMap");
			HashMap requestMap = (HashMap)programMap.get("requestMap");
			String objectId    = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			changeOrder.setId(objectId);

			String[] sChangeTemplateOID = (String[])requestMap.get("ChangeTemplateOID");
			String ssChangeTemplateID = null;
			if(sChangeTemplateOID != null)
				ssChangeTemplateID = sChangeTemplateOID[0];
			String sInterfaceName = "";
			String sReferenceDoc = "";
			Iterator intrItr;
			String sCOType = changeOrder.getInfo(context, SELECT_TYPE);
			StringList intrList;
			String[] arrRefDoc;

			//Connecting Reference Document of Template to CO
			DomainObject dmObj = DomainObject.newInstance(context);
			if(!UIUtil.isNullOrEmpty(ssChangeTemplateID)){
				dmObj.setId(ssChangeTemplateID);
				//IR-248788V6R2014x
				intrList = dmObj.getInfoList(context, "from["+RELATIONSHIP_REFERENCE_DOCUMENT+"].to.id");
				if(!UIUtil.isNullOrEmpty(intrList.toString().trim())){
					arrRefDoc = (String[])intrList.toArray(new String[0]);
					changeOrder.addRelatedObjects(context, new RelationshipType(RELATIONSHIP_REFERENCE_DOCUMENT) , true, arrRefDoc);
				}
			}
			//This Logic is moved to Create Jpo method (createChange)
			//Logic to apply Interface of Template to CO
			/*if(!UIUtil.isNullOrEmpty(ssChangeTemplateID)){
                            sInterfaceName = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump $3",ssChangeTemplateID,"interface","|");
				if(!UIUtil.isNullOrEmpty(sInterfaceName)){
					intrItr         = FrameworkUtil.split(sInterfaceName, "|").iterator();
					//Add all Change Template Interfaces to CO
					for(int i=0; intrItr.hasNext();i++){
						MqlUtil.mqlCommand(context, "modify bus $1 add interface $2",objectId,(String)intrItr.next());
					}

				}
			}*/


			return changeOrder.connect(context,paramMap,ChangeConstants.RELATIONSHIP_CHANGE_INSTANCE, false);
		}

		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}//end of method



	/**
	 * @author R3D
	 * Updates the Change Template in CO Clone WebForm.
	 * @param context the eMatrix <code>Context</code> object
	 * @param args contains a MapList with the following as input arguments or entries:
	 * objectId holds the context CO object Id
	 * @throws Exception if the operations fails
	 * @since ECM-R215
	 */
	@Deprecated
	public DomainRelationship connectTemplateToCloneCO(Context context, String[] args) throws Exception {

		try {
			//unpacking the Arguments from variable args
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get("paramMap");
			HashMap requestMap = (HashMap)programMap.get("requestMap");
			String objectId    = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			changeOrder.setId(objectId);

			String[] sChangeTemplateOID = (String[])requestMap.get("ChangeTemplate2OID");
			String ssChangeTemplateID = sChangeTemplateOID[0];
			String sInterfaceName = "";
			String sReferenceDoc = "";
			Iterator intrItr;
			StringList intrList;
			String[] arrRefDoc;
			String sCOType = changeOrder.getInfo(context, SELECT_TYPE);

			//Connecting Reference Document of Template to CO
			DomainObject dmObj = DomainObject.newInstance(context);
			if(!UIUtil.isNullOrEmpty(ssChangeTemplateID)){
				dmObj.setId(ssChangeTemplateID);
				//IR-248788V6R2014x modification
				/*sReferenceDoc = dmObj.getInfo(context, "from["+RELATIONSHIP_REFERENCE_DOCUMENT+"].to.id");
				if(!UIUtil.isNullOrEmpty(sReferenceDoc)){
					changeOrder.addRelatedObject(context, new RelationshipType(RELATIONSHIP_REFERENCE_DOCUMENT) , false, sReferenceDoc);
				}*/

				intrList = dmObj.getInfoList(context, "from["+RELATIONSHIP_REFERENCE_DOCUMENT+"].to.id");
				if(!UIUtil.isNullOrEmpty(intrList.toString().trim())){
					arrRefDoc = (String[])intrList.toArray(new String[0]);
					changeOrder.addRelatedObjects(context, new RelationshipType(RELATIONSHIP_REFERENCE_DOCUMENT) , true, arrRefDoc);
				}
			}

			//Logic to apply Interface of Template to CO
			if(!UIUtil.isNullOrEmpty(ssChangeTemplateID)){
                            sInterfaceName = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump $3",ssChangeTemplateID,"interface","|");
				if(!UIUtil.isNullOrEmpty(sInterfaceName)){
					intrItr         = FrameworkUtil.split(sInterfaceName, "|").iterator();
					//Add all Change Template Interfaces to CO
					for(int i=0; intrItr.hasNext();i++){
						MqlUtil.mqlCommand(context, "modify bus $1 add interface $2",objectId,(String)intrItr.next());
					}
				}
			}


			return changeOrder.connect(context,paramMap,ChangeConstants.RELATIONSHIP_CHANGE_INSTANCE, false);
		}

		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}//end of method

	/**
	 * Display Quick Actions for each CA Object under CO Affected Items Table
	 * @param context
	 * @param args
	 * @return Vector containing list of Quick Actions
	 * @throws Exception
	 * @since R211 ECM
	 */
	@Deprecated
	public Vector showQuickActions(Context context, String[] args) throws Exception
	{
		//XSSOK
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
		String languageStr = context.getSession().getLanguage();
		Vector vecReturn   = null;
		StringBuffer sb    = null;
		try
		{
			String transferOwnershipOfCA = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.TransferOwnershipOfCA");
			String approvalTasks     = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.ApprovalTasksOfCA");
			String ImpactAnalysis    = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.alt.ImpactAnalysis");
			String si18NtransferOwnership = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.TransferOwnership");

			vecReturn = new Vector(objectList.size());

			String strCAId				= "";
			String strType				= "";
			String strTransferOwnership	= "";
			String strApproveTasks		= "";
			String strImpactAnalysis    = "";
			Map changeActionMap = null;

			Iterator changeActionItr = objectList.iterator();

			while (changeActionItr.hasNext()) {
				changeActionMap = (Map)changeActionItr.next();
				strCAId = (String)changeActionMap.get(ChangeConstants.ID);
				strType = (String)changeActionMap.get(ChangeConstants.TYPE);

				sb = new StringBuffer(500);

				if(mxType.isOfParentType(context, strType, ChangeConstants.TYPE_CHANGE_ACTION)){
				strTransferOwnership = "<a href=\"javascript:getTopWindow().showSlideInDialog('../common/emxForm.jsp?form=type_TransferOwnership&amp;formHeader="+XSSUtil.encodeForHTML(context, si18NtransferOwnership)+"&amp;mode=edit&amp;submitAction=refreshCaller&amp;postProcessJPO=enoECMChangeUtil:transferOwnership&amp;objectId=" + XSSUtil.encodeForHTMLAttribute(context, strCAId) + "', 'true')\"><img border='0' src='../common/images/iconSmallPerson.gif' name='person' id='person' alt=\""+transferOwnershipOfCA+"\" title=\""+transferOwnershipOfCA+"\"/></a>";
				sb.append(strTransferOwnership);

				strApproveTasks = "<a href=\"javascript:showModalDialog('../common/emxTableEdit.jsp?program=enoECMChangeOrder:getTasks&amp;table=AEFMyTaskMassApprovalSummary&amp;selection=multiple&amp;header=emxComponents.Common.TaskMassApproval&amp;postProcessURL=../common/emxLifecycleTasksMassApprovalProcess.jsp&amp;HelpMarker=emxhelpmytaskmassapprove&amp;suiteKey=Components&amp;StringResourceFileId=emxComponentsStringResource&amp;SuiteDirectory=component&amp;objectId=" + XSSUtil.encodeForHTMLAttribute(context, strCAId) + "', '800', '575')\"><img border='0' src='../common/images/iconSmallSignature.gif' name='person' id='person' alt=\""+approvalTasks+"\" title=\""+approvalTasks+"\"/></a>";
				sb.append(strApproveTasks);

				strImpactAnalysis = "<a href=\"javascript:showModalDialog('../common/emxTree.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, strCAId) + "&amp;DefaultCategory="+XSSUtil.encodeForURL("Impact Analysis")+"', '800', '575')\"><img border='0' src='../common/images/iconSmallImpactAnalysis.gif' name='IA' id='IA' alt=\""+ImpactAnalysis+"\" title=\""+ImpactAnalysis+"\"/></a>";
				sb.append("&#160;&#160;"+strImpactAnalysis);
				}

				vecReturn.addElement(sb.toString());

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}

		return vecReturn;

	}
	/**
	 * Display Affected Item names for each CA Object under CO Affected Items Table
	 * @param context
	 * @param args
	 * @return Vector containing list of Quick Actions
	 * @throws Exception
	 * @since R211 ECM
	 */
	@Deprecated
	public Vector showAffectedItemNames(Context context, String[] args) throws Exception
	{
		//XSSOK
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
		HashMap paramList = (HashMap)programMap.get("paramList");
		String strReportFormat = (String) paramList.get("reportFormat");
		Vector vecReturn   = null;
		StringBuffer sb    = null;
		try
		{
			vecReturn = new Vector(objectList.size());
			Map map = null;
			String strAffectedObjID     = "";
			String strAffectedObjType   = "";
			String strAffectedObjName   = "";
			String strApproveTasks		= "";
			StringBuffer objectIcon		= new StringBuffer();

			Iterator objectItr = objectList.iterator();

			while (objectItr.hasNext()) {
				map = (Map)objectItr.next();
				sb = new StringBuffer(500);
				strAffectedObjID = (String)map.get(ChangeConstants.AFFECTED_ITEM_ID);
				if(!ChangeUtil.isNullOrEmpty(strAffectedObjID)) {
					strAffectedObjType 	 = (String)map.get(SELECT_TYPE);
					strAffectedObjName   = (String)map.get(SELECT_NAME);
					objectIcon.append(UINavigatorUtil.getTypeIconProperty(context, strAffectedObjType));
					if(strReportFormat!=null&&strReportFormat.equals("null")==false&&strReportFormat.equals("")==false){
						sb.append(strAffectedObjName);
					}
					else{
						sb.append("<a href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, strAffectedObjID) + "', '800', '575')\"><img border='0' src='../common/images/"+XSSUtil.encodeForHTMLAttribute(context, objectIcon.toString())+"'/>"+XSSUtil.encodeForHTML(context, strAffectedObjName)+"</a>");
                    objectIcon.setLength(0);
					}
				}
				else
					sb.append("");

				vecReturn.addElement(sb.toString());

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}

		return vecReturn;

	}
	/**
	 * Display Affected Item names for each CA Object under CO Affected Items Table
	 * @param context
	 * @param args
	 * @return Vector containing list of Quick Actions
	 * @throws Exception
	 * @since R211 ECM
	 */
	@Deprecated
	public Vector showRelatedCANames(Context context, String[] args) throws Exception
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
			String strAffectedObjID     = "";
			String strAffectedObjType   = "";
			String strAffectedObjName   = "";
			String strTreeLink			= "";
			String strApproveTasks		= "";
			StringBuffer objectIcon		= new StringBuffer();

			Iterator objectItr = objectList.iterator();

			while (objectItr.hasNext()) {
				map = (Map)objectItr.next();
				sb = new StringBuffer(500);
				strAffectedObjID = (String)map.get(ChangeConstants.RELATED_CA_ID);
				if(!ChangeUtil.isNullOrEmpty(strAffectedObjID)) {
					strAffectedObjType 	 = (String)map.get(ChangeConstants.RELATED_CA_TYPE);
					strAffectedObjName   = (String)map.get(ChangeConstants.RELATED_CA_NAME);

					objectIcon.append(UINavigatorUtil.getTypeIconProperty(context, strAffectedObjType));
					strTreeLink = "<a class=\"object\" href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, strAffectedObjID) + "&amp;DefaultCategory=ECMCAAffectedItems', '800', '575','true','content')\"><img border='0' src='../common/images/"+XSSUtil.encodeForHTMLAttribute(context, objectIcon.toString())+"'/>"+XSSUtil.encodeForHTML(context, strAffectedObjName)+"</a>";
					sb.append(strTreeLink);
                    objectIcon.setLength(0);

				}
				else
					sb.append("");

				vecReturn.addElement(sb.toString());

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}

		return vecReturn;

	}

	/**
	 * Update Technical Assignee under CO Affected Items Table
	 * @param context
	 * @param args
	 * @return boolean
	 * @throws Exception
	 * @since R211 ECM
	 */
	@Deprecated
	public Boolean updateTechnicalAssignee(Context context, String[] args)throws Exception {

		try
		{
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
			String  objectId   = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			ChangeAction changeAction = new ChangeAction(objectId);
			return changeAction.updateAssignee(context, programMap, ChangeConstants.RELATIONSHIP_TECHNICAL_ASSIGNEE);

		}
		catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}
	}

	/**
	 * Update Change Owner under CO summary Table
	 * @param context
	 * @param args
	 * @return boolean
	 * @throws Exception
	 */
	@Deprecated
	public Boolean updateOwner(Context context, String[] args)throws Exception {

		try
		{
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
			String  objectId   = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			ChangeOrder changeOrderobj = new ChangeOrder(objectId);

	   		String strNewOwner	= (String)paramMap.get(ChangeConstants.NEW_VALUE);
	   		changeOrderobj.transferOwnership(context, EMPTY_STRING, strNewOwner);
	   		return true;

		}
		catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}
	}


	/**
	 * Update Change Coordinator under CO summary Table
	 * @param context
	 * @param args
	 * @return boolean
	 * @throws Exception
	 */
	@Deprecated
	public Boolean updateChangeCoordinator(Context context, String[] args)throws Exception {

		try
		{
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
			String  objectId   = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			ChangeOrder changeOrderobj = new ChangeOrder(objectId);

	   		String strNewOwner	= (String)paramMap.get(ChangeConstants.NEW_VALUE);
	   		changeOrderobj.updateChangeCoordinator(context, strNewOwner);
	   		return true;

		}
		catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}
	}

	/**
	 * Update Technical Assignee under CO Affected Items Table
	 * @param context
	 * @param args
	 * @return boolean
	 * @throws Exception
	 * @since R211 ECM
	 */
	@Deprecated
	public Boolean updateSeniorTechnicalAssignee(Context context, String[] args)throws Exception {

		try
		{
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
			String  objectId   = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			ChangeAction changeAction = new ChangeAction(objectId);
			return changeAction.updateAssignee(context, programMap, ChangeConstants.RELATIONSHIP_SENIOR_TECHNICAL_ASSIGNEE);

		}
		catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}
	}
	/**
	 * Update Planned End Date of the context CA under CO Affected Items Table
	 * @param context
	 * @param args
	 * @return int
	 * @throws Exception
	 * @since R211 ECM
	 */
	@Deprecated
	public int updatePlannedEndDate(Context context, String[] args) throws Exception
	{
		try {

			HashMap programMap	= (HashMap)JPO.unpackArgs(args);
			HashMap paramMap 	= (HashMap)programMap.get(ChangeConstants.PARAM_MAP);

			String strEstCompletionDate	= ChangeConstants.ATTRIBUTE_ESTIMATED_COMPLETION_DATE;
			String CAObjectID 		 	= (String)paramMap.get(ChangeConstants.OBJECT_ID);
			String newDateValue  		= (String)paramMap.get(ChangeConstants.NEW_VALUE);

			HashMap columnMap   = (HashMap)programMap.get("columnMap");
			HashMap requestMap  = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
			HashMap settingsMap = (HashMap)columnMap.get("settings");
			String strFormat    = (String) settingsMap.get("format");

			if ("date".equalsIgnoreCase(strFormat) && !ChangeUtil.isNullOrEmpty(newDateValue)) {

				double iClientTimeOffset = (new Double((String) requestMap.get("timeZone"))).doubleValue();
				String strTempStartDate= eMatrixDateFormat.getFormattedInputDate(newDateValue,iClientTimeOffset,(java.util.Locale)(requestMap.get("locale")));
				DomainObject.newInstance(context, CAObjectID).setAttributeValue(context, strEstCompletionDate, strTempStartDate);

			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}

		return 0;
	}



	/**
	 * Fetch all the Inbox Tasks related to context CA under CO Affected Items Table
	 * @param context
	 * @param args
	 * @return MapList
	 * @throws Exception
	 * @since R211 ECM
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getTasks(Context context, String args[]) throws Exception {

		HashMap progMap    = (HashMap) JPO.unpackArgs(args);
		String strObjectId = (String) progMap.get(ChangeConstants.OBJECT_ID);
		MapList mapList    = new MapList();
		try {
			if(!ChangeUtil.isNullOrEmpty(strObjectId)) {
				mapList = ( new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder(strObjectId)).getCurrentAssignedTasksOnObject(context);
			}
		}
		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		return mapList;
	}

	/**
	 * This method checks whether TechAssignees for all CAs under CO is assigned or not.
	 * @author
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds objectId.
	 * @param args
	 *            holds relationship name
	 * @return integer 0 if Change Coordinator is assigned else 1
	 * @throws Exception if the operation fails.
	 * @since ECM R211
	 */
	@Deprecated
	public int CheckForAssignees(Context context, String args[]) throws Exception {
		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}

		try {
			String objectId = args[0];
			String relationshipChangeAction 		  = PropertyUtil.getSchemaProperty(context,args[1]);
			String relationshipTechnicalAssignee   = PropertyUtil.getSchemaProperty(context,args[2]);
			String relationshipSrTechnicalAssignee = PropertyUtil.getSchemaProperty(context,args[3]);
			String resourceKey = args[4];
			String propertyKey = args[5];

			setId(objectId);
		//	StringList  changeActionList = getInfoList(context,"from["+relationshipChangeAction+"].to[" + ChangeConstants.TYPE_CHANGE_ACTION + "].id");
			StringList objSelects = new StringList();
			objSelects.add(DomainObject.SELECT_ID);
			objSelects.addElement(DomainObject.SELECT_CURRENT);
			String techAssigneeSelect   = "from["+relationshipTechnicalAssignee+"].to.id";
			objSelects.add(techAssigneeSelect);

			MapList caMapList =  getRelatedObjects(context,				           // matrix context
					ChangeConstants.RELATIONSHIP_CHANGE_ACTION,		   // relationship pattern
					ChangeConstants.TYPE_CHANGE_ACTION,  					   	   // object pattern
					objSelects,                      // object selects
					null,            			       // relationship selects
					false,                              // to direction
					true,                        	   // from direction
					(short) 1,                          // recursion level
					null,                               // object where clause
					null,                               // relationship where clause
					(short) 0);


			if ( null  != caMapList && caMapList.size() > 0) {
				String Message               = EnoviaResourceBundle.getProperty(context, resourceKey, context.getLocale(),propertyKey);
				//MapList mapList = DomainObject.getInfo(context, (String[])changeActionList.toArray(new String[changeActionList.size()]), objSelects);

				Map objMap;Object techAssignee;String SrTechAssignee;String currentState;
				for(Iterator mapListItr = caMapList.iterator();mapListItr.hasNext(); ) {
					objMap = (Map)mapListItr.next();
					techAssignee   = (Object)objMap.get(techAssigneeSelect);
					System.out.println("Object techAssignee    " + techAssignee );
					//SrTechAssignee = (String)objMap.get(SrtechAssigneeSelect);
					currentState=(String)objMap.get(DomainObject.SELECT_CURRENT);
					String sPolicy = ChangeConstants.POLICY_CHANGE_ACTION;
		        	String strSymbolicPolicy =  FrameworkUtil.getAliasForAdmin(context, "policy", sPolicy, true);
		            String strSymbStateName = FrameworkUtil.reverseLookupStateName(context, sPolicy, "In Approval");
					StringList slStates = ChangeCommon.getPolicyStates(context, strSymbolicPolicy, strSymbStateName, true);
					if(null == techAssignee && !ChangeConstants.STATE_CHANGE_ACTION_CANCEL.equalsIgnoreCase(currentState)  && slStates.contains(currentState)) {
						//Sends a warning message like Techassignees should be assigned before moving to next state.
						//${CLASS:emxContextUtilBase}.mqlNotice(context, Message);
						 MqlUtil.mqlCommand(context, "notice $1", Message);
						return 1;
					}
				}
			}

		}catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		return 0;
	}




	/**
	 * This method updates attribute Estimated Completion Date on CO by retrieving longer estimated completion date of all related CAs.
	 * @author
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds objectId.
	 * @param args
	 *            holds relationship name
	 * @return integer 0 if Change Coordinator is assigned else 1
	 * @throws Exception if the operation fails.
	 * @since ECM R211
	 */
	@Deprecated
	public int updateCAHighestEstimationCompletionDateOnCO(Context context, String args[]) throws Exception {
		return 0;
	}

	/**
	 * This method displays Hold Affected CAs Warning field of Hold CO form with radio button
	 * @param context the eMatrix <code>Context</code> object.
	 * @param args[] packed hashMap of request parameters
	 * @return String containing html data to construct with radio button.
	 * @throws Exception if the operation fails.
	 * @since R212
	 */
	@Deprecated
	public Object displayHoldCAsWarning(Context context, String[] args) throws Exception
	{
		//XSSOK
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramMap   = (HashMap)programMap.get("paramMap");
		String languageStr = (String) paramMap.get("languageStr");

		String CAConnections  = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.holdWarning");

		StringBuffer strBuf = new StringBuffer();
		strBuf.append("<table><tr><td align=left>");
		strBuf.append("<input type=radio checked name=\"CAHoldItemsWarning\" value=\"true\">");
		strBuf.append("</td><td align=left>");
		strBuf.append(CAConnections);
		strBuf.append("</td></tr></table>");

		return strBuf.toString();
	}
	
	@Deprecated
	public void sendNotification(Context context,String []args) throws Exception 
	{
		return;
	}

	/**
	 * Used to get Tasks of CO/CA for Mass Approval
	 * @param context
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getChangeTasks(Context context, String[] args) throws Exception {
		try {
			HashMap programMap              = (HashMap)JPO.unpackArgs(args);
			HashMap requestMap              = (HashMap)programMap.get("requestMap");
			MapList mlTableData 			= new MapList();
			String objectIDs 				= (String)programMap.get("objectIdToApprove");
			StringList objectList 			= FrameworkUtil.split(objectIDs, ",");
			String sObjectId 				= "";
			Map mapTemp = new HashMap();

			Iterator itr = objectList.iterator();
			while(itr.hasNext()){
				sObjectId 		= (String)itr.next();
				mlTableData.addAll((new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder(sObjectId)).getCurrentAssignedTasksOnObject(context));
			}
			int nSerialNumber = 0;
            for (Iterator objectListItr = mlTableData.iterator(); objectListItr.hasNext(); nSerialNumber++) {
                mapTemp = (Map) objectListItr.next();

                // Add level value else sorting will give problem
                mapTemp.put("serialNumber", String.valueOf(nSerialNumber));
            }
			return mlTableData;
		}
		catch(Exception exp) {
			exp.printStackTrace();
			throw new FrameworkException(exp.getMessage());
		}
	}

	/**
	 * Displays Cloned CO Name on Copy Selected page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public String getClonedCOName(Context context,String []args) throws Exception {

		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = (String)requestMap.get("copyObjectId");
		DomainObject dmObj = DomainObject.newInstance(context);
		if(!UIUtil.isNullOrEmpty(objectId)){
			dmObj.setId(objectId);
			return dmObj.getName(context);}
		else
                    return "";
	}

	/**
	 * @author R3D
	 * this method performs the Mass hold process of change.Moves all associated CAs to hold state.
	 *
	 *
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change Process
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R211.
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void massHoldCO(Context context, String[] args)throws Exception {

		HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestValuesMap = (HashMap) programMap.get("requestValuesMap");
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		String strObjectIds    = (String)paramMap.get("objectsToHold");
		String sReason     = (String)paramMap.get("Reason");

		String objectId = "";
		StringTokenizer strIds = new StringTokenizer(strObjectIds,",");
		while(strIds.hasMoreTokens())
		{
			objectId = (String)strIds.nextToken();
			ChangeOrder changeOrder = new ChangeOrder(objectId);
			changeOrder.hold(context,sReason);
			//hold(context,objectId,sReason);
		}

	}

	/**
	 * @author R3D
	 * this method performs the Mass Cancel process of change.Moves all associated CAs to hold state.
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change Process
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R211.
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void massHoldCancelCO(Context context, String[] args)throws Exception {

		HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestValuesMap = (HashMap) programMap.get("requestValuesMap");
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		String strObjectIds    = (String)paramMap.get("objectsToCancel");
		String sReason     = (String)paramMap.get("Reason");

		String objectId = "";
		StringTokenizer strIds = new StringTokenizer(strObjectIds,",");
		while(strIds.hasMoreTokens())
		{
			objectId = (String)strIds.nextToken();
			ChangeOrder changeOrder = new ChangeOrder(objectId);
			changeOrder.cancel(context,sReason);
			//cancel(context,objectId,sReason);
		}

	}



	/**
	 * @author R3D
	 * this method performs the Mass Transfer Ownership
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change Process
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R211.
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void massTransferOwnershipToChangeCoordinator(Context context, String[] args)throws Exception {

		HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestValuesMap = (HashMap) programMap.get("requestValuesMap");
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		String strObjectIds    = (String)paramMap.get("objectId");
		String sReason     = (String)paramMap.get("TransferReason");


		String newOwner 		 = (String)paramMap.get(ChangeConstants.NAME);
		String []params 	     = {sReason,newOwner};

		String objectId = "";
		StringTokenizer strIds = new StringTokenizer(strObjectIds,",");
		while(strIds.hasMoreTokens()){
			objectId = (String)strIds.nextToken();
			changeOrder.setId(objectId);
			changeOrder.transferOwnership(context, sReason,newOwner);
		}
	}

	/**
	 * @author R3D
	 * this method performs the Mass Transfer Ownership
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change Process
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R211.
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void massTransferOwnershipToTechnicalAssignee(Context context, String[] args)throws Exception {

		HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestValuesMap = (HashMap) programMap.get("requestValuesMap");
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		String strObjectIds    = (String)paramMap.get("objectId");
		String sReason     = (String)paramMap.get("TransferReason");

		String newOwner 		 = (String)paramMap.get(ChangeConstants.NEW_OWNER);
		String []params 	     = {sReason,newOwner};

		String objectId = "";
		StringTokenizer strIds = new StringTokenizer(strObjectIds,",");
		while(strIds.hasMoreTokens()){
			objectId = (String)strIds.nextToken();
			changeOrder.setId(objectId);
			changeOrder.transferOwnership(context, sReason,newOwner);
		}
	}


	/**
	 * Method to get Legacy Changes
	 * @param context   the eMatrix <code>Context</code> object
	 * @param           String[] of ObjectIds.
	 * @return          Object containing CO objects
	 * @throws          Exception if the operation fails
	 * @since           ECM R212
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getLegacyChangeForSearchType(Context context, String args[]) throws Exception
	{

		MapList sTableData = new MapList();
		HashMap programMap              = (HashMap)JPO.unpackArgs(args);

		String searchType = (String)programMap.get("searchType");
		String strObjectId = (String)programMap.get("objectId");

		StringBuffer sb = new StringBuffer();
		StringList sTypeList = FrameworkUtil.split(searchType, ",");
		String type ="";
		for(int i= 0; i<sTypeList.size(); i++){
			String single = (String)sTypeList.get(i);
			type = PropertyUtil.getSchemaProperty(context,single);
			sb.append(type);
			if(i!=sTypeList.size()-1)
				sb.append(",");
		}


		StringList strList = new StringList();
		strList.add(SELECT_NAME);
		strList.add(SELECT_TYPE);
		strList.add(SELECT_ID);

		try{
		//String wherClause = SELECT_CURRENT + "== 'Active' ";
			if(UIUtil.isNullOrEmpty(strObjectId))
		sTableData = DomainObject.findObjects(context, sb.toString(), "*", null, strList);
			else{
				DomainObject partObject=new DomainObject(strObjectId);
			   sTableData= partObject.getRelatedObjects(context,
					  											QUERY_WILDCARD,
					  											sb.toString(),
					  											strList,
															  	null,
															  	true,
															  	false,
															  	(short)0,
															  	null,
													  			null,
													  			0);
			}
		}

		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}

		return sTableData;

	}//end of method

	/**
	 * Method invoked from the Owner Notification Trigger.
	 * This method is Used to get transfer reason while transferring the owner of the context change
	 * @param context
	 * @param args Object ID
	 * @return String
	 * @throws Exception
	 */
	@Deprecated
	public static String getTransferComments(Context context, StringList args, Locale locale, String string1,String string2, String string3)
	throws Exception
	{
		try
		{
			String objectId = (String)args.firstElement();
			String person = context.getUser();
			String transferReason      = "";
			String historyData     = ChangeUtil.getHistory(context,objectId,"history.custom");
			StringList historyList = FrameworkUtil.splitString(historyData, ChangeConstants.COMMA_SEPERATOR);
			if(UIUtil.isNotNullAndNotEmpty(historyData) && historyData.contains("Transfer Comments:"))
			{
				transferReason = historyData.substring(historyData.lastIndexOf("Transfer Comments:"), historyData.length()-1);
			}
			return transferReason;

		}
			catch (Exception ex) {
				ex.printStackTrace();
				throw new FrameworkException(ex.getMessage());
			}
		}

	/**
	 * This method is Used to refresh the whole affected item page after editing any values in the column.
	 * @param context
	 * @param args
	 * @return HashMap
	 * @throws Exception
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public HashMap refreshAffectedItems (Context context, String args[]) throws Exception
    {
		HashMap doc     = new HashMap();
		doc.put("Action", "refresh");
		return doc;
    }
	/**
	 * This method is Used to get the locale specific values for given list of properties.
	 * @param context
	 * @param Props  Array of Properties.
	 * @param stringResourceFileID String Resource File ID
	 * @param languageStr Language String
	 * @return List of Values for given Properties
	 * @throws Exception
	 */
	@Deprecated
	public StringList getValuesforProperties(Context context, String[] Props, String stringResourceFileID, String languageStr){
		StringList slPropValue = new StringList(Props.length);
		for(int i=0;i<Props.length;i++){
			slPropValue.add(EnoviaResourceBundle.getProperty(context, stringResourceFileID, new Locale(languageStr), Props[i]));
		}
		return slPropValue;
	}
	/**
	 * This method is used to get Range Values for Fast track Process options.
	 * @param context
	 * @param args.
	 * @return Map of Display and Actual values for the options
	 * @throws Exception
	 */
	@Deprecated
	public HashMap FastTrackProcessOptionsRangeValues(Context context,String[] args){
		// This is intentional change to take off immediate options
		String [] rangeOptionsStrings = {"EnterpriseChangeMgt.Range.FastTrackProcess.Deferred"};
		HashMap rangeMap              = new HashMap(2);
		rangeMap.put("field_choices", getValuesforProperties(context,rangeOptionsStrings, "emxEnterpriseChangeMgtStringResource", "en"));
		rangeMap.put("field_display_choices", getValuesforProperties(context,rangeOptionsStrings, "emxEnterpriseChangeMgtStringResource", context.getSession().getLanguage()));
		return rangeMap;
	}
	/**
	 * This method is used for restricting the access of field limited to Mass Release or Mass Obsolete operations.
	 * @param context
	 * @param args to get Functionality (Mass Release or Mass Obsolete).
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean ShowFieldInMassReleaseOrObsolete(Context context,String []args) throws Exception {
		boolean sReturn          = false;
		HashMap paramMap         = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap       = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String sFunctionality    = (String)paramMap.get("functionality");
		if((ChangeConstants.FOR_OBSOLETE.equals(sFunctionality))||(ChangeConstants.FOR_RELEASE.equals(sFunctionality)))
		{
			sReturn = true;
		}
		return sReturn;
	}

	/**
	 * Trigger Method to set context user as Change Coordinator if CO policy is Fast track Change.
	 * @author M24
	 * @param context - the eMatrix <code>Context</code> object
	 * @param args - Object Id and Policy of Change Order
	 * @return int - Returns integer status code
            0 - in case the trigger is successful
	 * @throws Exception if the operation fails
	 * @since ECM R211
	 */
	@Deprecated
	public int setCOChangeCoordinator(Context context,String []args) throws Exception {
		String strObjId                  = args[0];
		String strPolicy                 = args[1];
		String strRelChangeCoordinator   = PropertyUtil.getSchemaProperty(context,args[2]);
		if(ChangeConstants.POLICY_FASTTRACK_CHANGE.equalsIgnoreCase(strPolicy)){
			try{
				ChangeOrder co           = new ChangeOrder(strObjId);
				DomainObject loginUser   = new DomainObject(PersonUtil.getPersonObjectID(context));
				co.connect(context, strRelChangeCoordinator, loginUser, false);
			}catch(Exception e){
				e.printStackTrace();
			//	${CLASS:emxContextUtil}.mqlNotice(context,EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource",context.getLocale(),"EnterpriseChangeMgt.Notice.NotConnectedAsChangeCoordinator"));
			String Message  = EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource",context.getLocale(),"EnterpriseChangeMgt.Notice.NotConnectedAsChangeCoordinator");
			 MqlUtil.mqlCommand(context, "notice $1", Message);
				return 1;
			}
		}
		return 0;
	}

	/**
	 * Post Process of CO create. If nonempty effectivity is set on CO,
	 * then auto generate a PUE ECO and add same effectivity to it.
	 *
	 * @author D2E
	 * @param context - the eMatrix <code>Context</code> object
	 * @param <code>String[]</code> args - requestMap
	 * @return void
	 * @throws Exception if the operation fails
	 * @since ECM R211
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public HashMap coPostProcessJPO(Context context, String args[]) throws Exception {
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");

		HashMap resultMap = new HashMap();

		//CUSTOMCHANGE is no longer supported
		/*
		if (ChangeUtil.isCFFInstalled(context)) {
			String createJPO = ECMAdmin.getCustomChangeCreateJPO(context, "XCE");

			if (UIUtil.isNotNullAndNotEmpty(createJPO)) {
				String programName = createJPO.replaceAll(":.*$", "").trim();
				String methodName = createJPO.replaceAll("^.*:", "").trim();

				resultMap = JPO.invoke(context, programName, null, methodName, args, HashMap.class);
			}
		}
		*/

		return resultMap;
	}
	
	@Deprecated
	public MapList getEffectivity(Context context, String[] args) throws Exception {
		
		final String strExceptionMsg = "Wrong Effectivity  API in Used, please use getEffectivity API from EffectivityFramework ";
		throw new Exception(strExceptionMsg);
	}

	/*public String getEffectivityOnChange(Context context, String args[]) throws Exception {
		HashMap programMap = (HashMap) JPO.unpackArgs(args);

		HashMap requestMap = (HashMap) programMap.get("requestMap");

		return (String) ((Map) EffectivityUtil.getEffectivityOnChange(context, (String) requestMap.get(ChangeConstants.OBJECT_ID))).get("displayValue");
	}
*/
	/**
	 * Method to get dynamic search string for Change Template search in Mass Change Functionality
	 *  (Mass Release or Mass Obsolete)
	 * @author M24
	 * @param context - the eMatrix <code>Context</code> object
	 * @param <code>String[]</code> args - requestMap
	 * @return String StringPattern
	 * @throws Exception if the operation fails
	 * @since ECM R216
	 */
	@Deprecated
	public String getCTDynamicSearchQuery(Context context, String [] args) throws Exception {
		StringBuffer returnString  = new StringBuffer();
		returnString.append("TYPES=type_ChangeTemplate:CURRENT=policy_ChangeTemplate.state_Active");
		HashMap programMap   = (HashMap)JPO.unpackArgs(args);
		Map requestMap       = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
		String functionality = (String)requestMap.get("functionality");

		boolean isCreateChildCOUnderFasttrackCO = false;
        if("CreateNewCOUnderCO".equalsIgnoreCase(functionality)){
        	String strObjectId = (String)requestMap.get("objectId");
        	if(!ChangeUtil.isNullOrEmpty(strObjectId)){
        		String strParentPolicy = new DomainObject(strObjectId).getPolicy(context).getName();
        		 isCreateChildCOUnderFasttrackCO = ChangeConstants.POLICY_FASTTRACK_CHANGE.equalsIgnoreCase(strParentPolicy)?true:false;
        	}
        }

		if((UIUtil.isNotNullAndNotEmpty(functionality)&&(ChangeConstants.FOR_RELEASE.equals(functionality)||ChangeConstants.FOR_OBSOLETE.equals(functionality))||isCreateChildCOUnderFasttrackCO))
			returnString.append(":ECM_CHANGE_POLICY=").append(ChangeConstants.FASTTRACK_CHANGE);
		return returnString.toString();
	}

	/**
     * Program to get ApprovalList For CA from Co/CR Context
     * @param context the eMatrix <code>Context</code> object
     * @param args    holds the following input arguments:
     *           0 -  Object
     * @return        a <code>MapList</code> object having the list of ApprovalList names for this Change Object
     * @throws        Exception if the operation fails
     * @since         ECM R216
     **
   */
	@Deprecated
	public  Vector getApprovalListForChangeAction(Context context, String[] args) throws Exception {
		// Create result vector
        Vector vecResult = new Vector();
        Map mapObjectInfo = null;
        String sApprovalListName = "";

        // Get object list information from packed arguments
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        MapList objectList = (MapList)programMap.get("objectList");
        for (Iterator itrObjects = objectList.iterator(); itrObjects.hasNext();) {
            mapObjectInfo = (Map) itrObjects.next();
            sApprovalListName = (String)mapObjectInfo.get("from[Object Route].to.name");
            vecResult.add(sApprovalListName);
        }
        return vecResult;
	}
	/**
	 * Method to get dynamic search string for Change TEmplate search in Mass Change Functionality
	 *
	 * @author M24
	 * @param context - the eMatrix <code>Context</code> object
	 * @param <code>String[]</code> args - MapList argsList
	 * @throws Exception if the operation fails
	 * @since ECM R216
	 */
	@Deprecated
	public void moveAffectdItemsToNewCA(Context context, String [] args) throws Exception {
		MapList argsList = (MapList)JPO.unpackArgs(args);
		ChangeOrder changeOrder = new ChangeOrder(argsList.get(0).toString());
		changeOrder.moveToCA(context, argsList);
	}

	/**
	 * Program to get Column(Drop Zone) value For CO Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return        Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 */
	@Deprecated
	public Vector showDropZoneColumn(Context context, String args[])throws Exception
	{
		//XSSOK
		Vector columnVals = new Vector();
		String drop= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
				"EnterpriseChangeMgt.Label.Drop", context.getSession().getLanguage());
		String changeAction= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
				"EnterpriseChangeMgt.Label.ChangeAction", context.getSession().getLanguage());
		StringBuilder sb = new StringBuilder();
		sb.append("<div style=\"border-radius:4px;font-size:9px;text-align:center;border:1px dashed #aaa;color:#aaa;\">");
		//XSSOK
		sb.append(drop);
		sb.append("<br/>");
		//XSSOK
		sb.append(changeAction);
		sb.append("</div>");
		try {
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil=new ChangeUtil();
			StringList strObjectIdList = changeUtil.getStringListFromMapList(objectList,DomainObject.SELECT_ID);

			if (strObjectIdList == null || strObjectIdList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector(strObjectIdList.size());
			}
			for(int i=0;i<strObjectIdList.size();i++){
				String 	strChangeActionId = (String) strObjectIdList.get(i);
				columnVals.add(sb.toString());
			}
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	}//end of method

	/**
	 * Checks if the being connected Change Action to context Change Order \ Request belongs to the parent company \ subsidiary or not.
	 * If so, it will block that connection establishment as CA at parent company \ subsidiary can not be attached to CO from the child organization.
	 *
	 * @param context - ENOVIA <code>Context</code> object
	 * @param args
	 * @return int the value 0 is a succeed, else is a failure
	 * @throws Exception
	 */
	@Deprecated
	public int checkForCAInParentCompany(Context context, String [] args) throws Exception{
		int iRetCode = 0;
		String sCOId = args[0];
		String sCAId = args[1];

		String[] saIds = new String[]{sCOId,sCAId};
		MapList mlCOCA = DomainObject.getInfo(context, saIds, new StringList(DomainObject.SELECT_ORGANIZATION));

		String sCOOrgName = (String)((Map)mlCOCA.get(0)).get(DomainObject.SELECT_ORGANIZATION);
		String sCAOrgName = (String)((Map)mlCOCA.get(1)).get(DomainObject.SELECT_ORGANIZATION);

		//perform the check if CO and CA are not from the same organization
		if(!sCAOrgName.equals(sCOOrgName)){
			//get CA's hierarchy and check
			String sValues = MqlUtil.mqlCommand(context, "print role $1 select $2 dump $3", sCAOrgName, "ancestor", "|");

			StringList slRoleHierarchy  =  FrameworkUtil.split(sValues, "|");
			if(!slRoleHierarchy.contains(sCOOrgName)){
				iRetCode = 1;
				String sError  =  EnoviaResourceBundle.getProperty(context ,
											"emxEnterpriseChangeMgtStringResource",
											context.getLocale(),
											"EnterpriseChangeMgt.Error.COCAConnection.NotSameOrg");
				throw new FrameworkException(sError);
			}
		}

		return iRetCode;
	}

	/**
	 * Performs a check of whether all CA's are either in complete or cancelled state before CO is promoted from complete to implemented
	 * If any one or more CA is in state other than complete or cancelled, raises an mql notice.
	 * @author
	 * @param context
	 * @param args
	 *           0 - object id
	 *           1 - Property key for Notice/Error message
	 *           2 - Suite key
	 * @return integer 0 for success or 1 for failure
	 * @throws Exception  if the operation fails
	 */
	@Deprecated
	public int checkAllCACompleteOrCanclled(Context context,String[] args) throws Exception
	{
		String objectId     = args[0];
		String propertyKey  = args[1];
		String suiteKey     = args[2];
		MapList mListCAs  = null;

		try{
			if(null== propertyKey||propertyKey.isEmpty()){ propertyKey = "EnterpriseChangeMgt.Error.CannotPromoteBecauseCAInOtherState"; }
			StringList sList = new StringList(2);
			sList.addElement(SELECT_CURRENT);
			sList.addElement(SELECT_ID);

			// State complete or cancelled for CA
			String POLICY_CHANGE_ACTION_STATE_COMPLETE = PropertyUtil.getSchemaProperty(context,
					"policy",
					PropertyUtil.getSchemaProperty(context,"policy_ChangeAction"), "state_Complete");

			// The state "Cancelled" as such does not exist on the Change Object, the state is changed to Cancelled after policy Cancelled is set on an object.
			String POLICY_CHANGE_ACTION_CANCELLED = PropertyUtil.getSchemaProperty(context,"policy_Cancelled");

			String RELATIONSHIP_CHANGE_ACTION = PropertyUtil.getSchemaProperty(context,"relationship_ChangeAction");
			StringBuffer sbPatterns = new StringBuffer(50);
			sbPatterns.append(ChangeConstants.TYPE_CHANGE_ACTION);

			//get the related change actions in the MapList
			DomainObject dmObj = DomainObject.newInstance(context, objectId);
			mListCAs = dmObj.getRelatedObjects(context,
					ChangeConstants.RELATIONSHIP_CHANGE_ACTION,
					sbPatterns.toString(),
					sList,
					null,
					false,
					true,
					(short)1,
					EMPTY_STRING,
					EMPTY_STRING,(short) 0);
			String strAlertMessage = EnoviaResourceBundle.getProperty(context, suiteKey, context.getLocale(),propertyKey);

			if(!(null==mListCAs||mListCAs.isEmpty())){
				for (Iterator caIterator = mListCAs.iterator(); caIterator.hasNext();)
				{
					Map m = (Map) caIterator.next();
					String currentState =  m.get(SELECT_CURRENT).toString();

					// For exception CA, while promote CO from Complete to Implemented, check all CAs either complete or cancelled
					if(!((POLICY_CHANGE_ACTION_STATE_COMPLETE.equalsIgnoreCase(currentState))||
							(POLICY_CHANGE_ACTION_CANCELLED.equalsIgnoreCase(currentState)))){
						 MqlUtil.mqlCommand(context, "notice $1", strAlertMessage);
						//${CLASS:emxContextUtilBase}.mqlNotice(context, strAlertMessage);	
						return 1 ;
					}
				}
			}
		}
		catch(Exception d){ 	throw new FrameworkException(d);  }
		return 0;
	}

    /**
     * @author
     * Method to return Change Orders for Change Change Order
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getConnectedChangeOrders(Context context, String[] args)throws Exception {

        Map programMap     = (HashMap)JPO.unpackArgs(args);
        String changeObjId = (String)programMap.get(ChangeConstants.OBJECT_ID);

        int nExpandLevel = 0;
        String sExpandLevels = (String)programMap.get("emxExpandFilter");
        if(ChangeUtil.isNullOrEmpty(sExpandLevels))
        {
        	nExpandLevel = 1;
        }
        else
        {
        	if("All".equalsIgnoreCase(sExpandLevels) ||"EndItem".equalsIgnoreCase(sExpandLevels) )
        		nExpandLevel = 0;
        	else
        		nExpandLevel = Integer.parseInt(sExpandLevels);
        }

        String relPattern = ChangeConstants.RELATIONSHIP_CHANGE_BREAKDOWN;
		StringList objectSelects = new StringList(3);
		objectSelects.addElement(SELECT_NAME);
		objectSelects.addElement(SELECT_TYPE);
		objectSelects.addElement(SELECT_ID);
		setId(changeObjId);
		return getRelatedObjects(context, relPattern, 									// relationship pattern
										  ChangeConstants.TYPE_CHANGE_ORDER, 		  							// object pattern
										  objectSelects, 							// object selects
										  new StringList(SELECT_RELATIONSHIP_ID), // relationship selects
										  false, 										// to direction
										  true, 										// from direction
										  (short) nExpandLevel, 									// recursion level
										  "", 				// object where clause
										  "",
										  (short)0);
    }
	
	
	/**
	 * Displays Cloned CO Name on Copy Selected page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public boolean showFieldInClone(Context context,String []args) throws Exception {

		boolean sReturn = false;
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String sCeateMode    = (String)paramMap.get("CreateMode");
		if("CloneCO".equals(sCeateMode)){
			sReturn = true;
		}
		return sReturn;
	}

	/**
	 * Displays Cloned CO Name on Copy Selected page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public boolean showFieldInCreate(Context context,String []args) throws Exception {

		boolean sReturn = false;
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String sCeateMode    = (String)paramMap.get("CreateMode");
		if("CreateCO".equals(sCeateMode)){
			sReturn = true;
		}

		return sReturn;
	}


}//end of class



