/*
 ** ${CLASS:enoECMChangeActionBase}
 **
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.Vector;
import java.util.ArrayList;
import java.util.Arrays;


import matrix.db.AttributeTypeList;
import matrix.db.BusinessInterface;
import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.RelationshipType;
import matrix.db.Vault;
import matrix.util.MatrixException;
import matrix.util.StringList;
import matrix.db.SelectConstants;

import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.UOMUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.domain.util.mxType;
import com.matrixone.apps.framework.ui.UICache;
import com.matrixone.apps.framework.ui.UIUtil;
import com.dassault_systemes.enovia.changeaction.constants.ActivitiesOperationConstants;
import com.dassault_systemes.enovia.changeaction.factory.ChangeActionFactory;
import com.dassault_systemes.enovia.changeaction.factory.ProposedActivityFactory;
import com.dassault_systemes.enovia.changeaction.interfaces.IBusinessObjectOrRelationshipObject;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeAction;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeActionServices;
import com.dassault_systemes.enovia.changeaction.interfaces.IOperationArgument;
import com.dassault_systemes.enovia.changeaction.interfaces.IProposedActivity;
import com.dassault_systemes.enovia.changeaction.interfaces.IProposedChanges;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeCommon;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeAction;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeManagement;
import com.dassault_systemes.enovia.enterprisechangemgt.admin.ECMAdmin;
import com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil;
import com.dassault_systemes.enovia.changeaction.dictionaryservices.AllowedOperationsServices;

public class enoECMChangeActionBase_mxJPO extends emxDomainObject_mxJPO
{
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	public static final String ATTR_VALUE_MANDATORY  = "Mandatory";
	protected static String RESOURCE_BUNDLE_COMPONENTS_STR = "emxEnterpriseChangeMgtStringResource";
	protected static final String SELECT_NEW_VALUE = "New Value";
	private ChangeManagement changeManagement = null;

    private static final String FORMAT_DATE = "date";
    private static final String FORMAT_NUMERIC = "numeric";
    private static final String FORMAT_INTEGER = "integer";
    private static final String FORMAT_BOOLEAN = "boolean";
    private static final String FORMAT_REAL = "real";
    private static final String FORMAT_TIMESTAMP = "timestamp";
    private static final String FORMAT_STRING = "string";
    protected static final String INPUT_TYPE_TEXTBOX = "textbox";
    private static final String INPUT_TYPE_TEXTAREA = "textarea";
    private static final String INPUT_TYPE_COMBOBOX = "combobox";
    protected static final String SETTING_INPUT_TYPE = "Input Type";
    private static final String SETTING_FORMAT = "format";
    private static final String FORMAT_CHOICES = "choices";
    public static final String SUITE_KEY = "EnterpriseChangeMgt";

	/**
	 * Constructor
	 * @param context
	 * @param args
	 * @throws Exception
	 */
	@Deprecated
	public enoECMChangeActionBase_mxJPO(Context context, String[] args) throws Exception {
		super(context, args);
	}

	/**
	 * Method to return CA Affecetd items
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	@com.matrixone.apps.framework.ui.ProgramCallable
	@Deprecated
	public MapList getAffectedItems(Context context, String[] args)throws Exception {
		Map programMap = (HashMap)JPO.unpackArgs(args);
		String changeObjId = (String)programMap.get("objectId");
		return new ChangeAction(changeObjId).getAffectedItems(context);
	}
	

	/**
	 * Method to update Requested change value
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public int updateRequestedChange(Context context, String[] args) throws Exception
	{
		try
		{

			String message="";
			String  SELECT_PHYSICALID = "physicalid";
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap   = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
			HashMap requestMap = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
			String strChangeObjId    = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			String strChangeActionId       = (String)requestMap.get(ChangeConstants.OBJECT_ID);
			String strNewRequestedChangeValue = (String)paramMap.get(ChangeConstants.NEW_VALUE);
			String strProposedActivityRelId = (String)paramMap.get("relId");
			StringList objectSelects=new StringList(DomainObject.SELECT_TYPE);
			objectSelects.add(DomainObject.SELECT_POLICY);
			objectSelects.add(SELECT_PHYSICALID);
			DomainObject affecteditemObj=new DomainObject(strChangeObjId);
			String language = context.getSession().getLanguage();
			Map affectediteminfoMap= affecteditemObj.getInfo(context,objectSelects);
			String policyName=(String)affectediteminfoMap.get(DomainObject.SELECT_POLICY);
			String[] relationshipIds=new String[1];
			  StringList selectable=new StringList( DomainRelationship.SELECT_TYPE);
			  selectable.add("to.physicalid");
			  selectable.add(DomainRelationship.SELECT_FROM_ID);
			  relationshipIds[0]=strProposedActivityRelId;
			  DomainRelationship ProposedActivityRel =new DomainRelationship(strProposedActivityRelId);
			  MapList mapList=ProposedActivityRel.getInfo(context, relationshipIds,selectable);
			  Map map=(Map)mapList.get(0);
			  strChangeActionId=(String)map.get(DomainRelationship.SELECT_FROM_ID);
			String targetStatus="";
			String strPreviousReasonForChange="";


			//IF THIS IS USED FOR BOTH MODE
			//1 Get the CA
			IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeActionId);

			//2 Get the proposed
			List<IProposedChanges> proposedChanges = iChangeAction.getProposedChanges(context);



			//3 Loop on the proposed until you find your objectSelects
			for(IProposedChanges proposed : proposedChanges)
			{
				String currentProposedPhysicalId= proposed.getBusinessObject().getObjectId(context);

				if(map.get("to.physicalid").equals(currentProposedPhysicalId))
				{
					//Now we find the good proposed

					//1 Get activities
					List<IProposedActivity> activities = proposed.getActivites();
					strPreviousReasonForChange=proposed.getWhy();
					//2 If I want to update proposed change:
					if(ChangeConstants.FOR_REVISE.equalsIgnoreCase(strNewRequestedChangeValue)
							|| ChangeConstants.FOR_MAJOR_REVISE.equalsIgnoreCase(strNewRequestedChangeValue)
							|| ChangeConstants.FOR_NONE.equalsIgnoreCase(strNewRequestedChangeValue)
							|| ChangeConstants.FOR_EVOLUTION.equalsIgnoreCase(strNewRequestedChangeValue))
					{
						//Major and / or minor allowedOperation
				List allowedOperation = AllowedOperationsServices.getAllowedOperationsFromPolicy(context, policyName);
    			boolean isMajorReviseSupported = false;
    			boolean isMinorReviseSupported = false;
						for(int i=0; i<allowedOperation.size(); i++)
						{
    				String operation = (String)allowedOperation.get(i);
    				if(ChangeConstants.MINOR_REVISE_MODELER.equalsIgnoreCase(operation))
							{
    					isMinorReviseSupported = true;
							}
    				else if(ChangeConstants.MAJOR_REVISE_MODELER.equalsIgnoreCase(operation))
							{
    					isMajorReviseSupported = true;
    			}
						}

						//Minor Revise
						if(ChangeConstants.FOR_REVISE.equalsIgnoreCase(strNewRequestedChangeValue))
						{
    				if(isMinorReviseSupported){
				String newRevision=affecteditemObj.getNextSequence(context);

								//First delete the activities behind proposed
								for( int i=0;i<activities.size();i++)
								{
									IProposedActivity activity=activities.get(i);
									if(strPreviousReasonForChange.isEmpty()){

										strPreviousReasonForChange=activity.getWhy();

									}
									activity.delete(context);
								}
								//Then change the proposed change
								proposed.setProposedChangeAsNewMinorVersion(context, newRevision);

								proposed.SetWhyComment(context, strPreviousReasonForChange);
			}
    				else{
								message = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Alert.RequestedChangeMinorReviseNotSupported",language);
    				}
    			}
						//Major Revise
						else if(ChangeConstants.FOR_MAJOR_REVISE.equalsIgnoreCase(strNewRequestedChangeValue))
						{
    				if(isMajorReviseSupported){
    					String newMajorRevision=affecteditemObj.getNextMajorSequence(context);
								//First delete the activities behind proposed
								for( int i=0;i<activities.size();i++)
								{
									IProposedActivity activity=activities.get(i);
									if(strPreviousReasonForChange.isEmpty()){
										strPreviousReasonForChange=activity.getWhy();
									}
									activity.delete(context);
								}
								//Then change the proposed change
								proposed.setProposedChangeAsNewVersion(context, newMajorRevision);
								proposed.SetWhyComment(context, strPreviousReasonForChange);
			}
    				else{
								message = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Alert.RequestedChangeMajorReviseNotSupported",language);
							}
						}

						//None
						else if(ChangeConstants.FOR_NONE.equalsIgnoreCase(strNewRequestedChangeValue))
						{
							for( int i=0;i<activities.size();i++)
							{
								IProposedActivity activity=activities.get(i);
								if(strPreviousReasonForChange.isEmpty()){
									strPreviousReasonForChange=activity.getWhy();
    				}
								activity.delete(context);
							}
							proposed.setProposedChangeAsNone(context);
							proposed.SetWhyComment(context, strPreviousReasonForChange);
    			}

						//Evolution
						else if(ChangeConstants.FOR_EVOLUTION.equalsIgnoreCase(strNewRequestedChangeValue))
						{
							for( int i=0;i<activities.size();i++)
							{
								IProposedActivity activity=activities.get(i);
								if(strPreviousReasonForChange.isEmpty()){
									strPreviousReasonForChange=activity.getWhy();
								}
								activity.delete(context);
							}
							proposed.setProposedChangeAsNewEvolution(context, "", "");
							proposed.SetWhyComment(context, strPreviousReasonForChange);
						}

			}
					else if(ChangeConstants.FOR_RELEASE.equalsIgnoreCase(strNewRequestedChangeValue)
							||ChangeConstants.FOR_OBSOLETE.equalsIgnoreCase(strNewRequestedChangeValue)
							||ChangeConstants.FOR_UPDATE.equalsIgnoreCase(strNewRequestedChangeValue)
							||ChangeConstants.FOR_RESTORE.equalsIgnoreCase(strNewRequestedChangeValue))
					{


						//FOR RELEASE
					if(ChangeConstants.FOR_RELEASE.equalsIgnoreCase(strNewRequestedChangeValue))
						{
							//1 First delete the activities behind proposed
							for( int i=0;i<activities.size();i++)
							{
								IProposedActivity activity=activities.get(i);
								strPreviousReasonForChange=activity.getWhy();
								activity.delete(context);
							}

							//2 If the proposed change is not none, set it as none
							String proposedWhat = proposed.getWhat();
							if(strPreviousReasonForChange.isEmpty()){

								strPreviousReasonForChange=proposed.getWhy();
							}
							if(!proposedWhat.equalsIgnoreCase("None"))
							{
								proposed.setProposedChangeAsNone(context);
							}

							//3 Add the subactivity
							//targetStatus=ChangeConstants.RElEASE;
							//proposed.createChangeStatusActivity(context, 0, affecteditemObj, targetStatus,strPreviousReasonForChange, null, null);
							proposed.createChangeStatusReleaseActivity(context, 0, strPreviousReasonForChange, null);
						}
						
						//FOR Restore: For Release(Demote)
					if(ChangeConstants.FOR_RESTORE.equalsIgnoreCase(strNewRequestedChangeValue))
						{
							//1 First delete the activities behind proposed
							for( int i=0;i<activities.size();i++)
							{
								IProposedActivity activity=activities.get(i);
								strPreviousReasonForChange=activity.getWhy();
								activity.delete(context);
							}

							//2 If the proposed change is not none, set it as none
							String proposedWhat = proposed.getWhat();
							if(strPreviousReasonForChange.isEmpty()){

								strPreviousReasonForChange=proposed.getWhy();
							}
							if(!proposedWhat.equalsIgnoreCase("None"))
							{
								proposed.setProposedChangeAsNone(context);
							}

							//3 Add the subactivity
							//targetStatus=ChangeConstants.Restore;
							//proposed.createChangeStatusActivity(context, 0, affecteditemObj, targetStatus,strPreviousReasonForChange, null, null);
							proposed.createChangeStatusRestoreActivity(context, 0, strPreviousReasonForChange, null);
						}
						
						//FOR OBSOLETE
						if(ChangeConstants.FOR_OBSOLETE.equalsIgnoreCase(strNewRequestedChangeValue))
						{

							//1 First delete the activities behind proposed
							/*	for(IProposedActivity activity : activities)
								{
									strPreviousReasonForChange=activity.getWhy();
									activity.delete(context);
								}*/
							for( int i=0;i<activities.size();i++)
							{
								IProposedActivity activity=activities.get(i);
								strPreviousReasonForChange=activity.getWhy();
								activity.delete(context);
							}

							//2 If the proposed change is not none, set it as none
							String proposedWhat = proposed.getWhat();
							if(strPreviousReasonForChange.isEmpty()){

								strPreviousReasonForChange=proposed.getWhy();
							}
							if(!proposedWhat.equalsIgnoreCase("None"))
							{
								proposed.setProposedChangeAsNone(context);
							}

							//3 Add the subactivity
							//targetStatus=ChangeConstants.OBSOLETE;
							//proposed.createChangeStatusActivity(context, 0, affecteditemObj, targetStatus,strPreviousReasonForChange, null, null);
							proposed.createChangeStatusObsoleteActivity(context, 0, strPreviousReasonForChange, null);
						}
						//FOR UPDATE
						if(ChangeConstants.FOR_UPDATE.equalsIgnoreCase(strNewRequestedChangeValue))
						{

							//1 First delete the activities behind proposed
							for( int i=0;i<activities.size();i++)
							{
								IProposedActivity activity=activities.get(i);
								strPreviousReasonForChange=activity.getWhy();
								activity.delete(context);
							}

							//2 If the proposed change is not none, set it as none
							String proposedWhat = proposed.getWhat();
							if(strPreviousReasonForChange.isEmpty()){

								strPreviousReasonForChange=proposed.getWhy();
							}
							if(!proposedWhat.equalsIgnoreCase("None"))
							{
								proposed.setProposedChangeAsNone(context);
							}

							//3 Add the subactivity
							//IBusinessObjectOrRelationshipObject  iBusinessObjectOrRelationshipObject=ProposedActivityFactory.CreateIProposedActivityArgument(affecteditemObj);
							//proposed.createModifyActivity(context, 0, iBusinessObjectOrRelationshipObject, null,strPreviousReasonForChange, null, null);
							proposed.createModifyActivity(context, 0, null, strPreviousReasonForChange, null);
						}

					}

				}
			}
			//if else block is for handling validation TODO
			if ("".equals(message)) {

				 return 0;//operation success
			 }
			 else {
					//${CLASS:emxContextUtil}.mqlNotice(context, message);
					 MqlUtil.mqlCommand(context, "notice $1", message);
				 return 1;// for failure
			 }
		}
		catch (Exception ex) {
			// ${CLASS:emxContextUtil}.mqlNotice(context, ex.getMessage());
			 MqlUtil.mqlCommand(context, "notice $1", ex.getMessage());
			ex.printStackTrace();
			return 1;// for failure
		}
	}
	/**
	 * Method to update the Reason for Change Value
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public void updateReasonForChangeValue(Context context, String[] args) throws Exception
	  {

		try {
			String SELECT_PHYSICALID = "physicalid";
			  HashMap programMap = (HashMap)JPO.unpackArgs(args);
			  HashMap paramMap   = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
			  HashMap requestMap = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
			String strChangeObjId = (String) paramMap.get(ChangeConstants.OBJECT_ID);
			  String strChangeActionId       = (String)requestMap.get(ChangeConstants.OBJECT_ID);
			String strNewRequestedChangeValue = (String) paramMap.get(ChangeConstants.NEW_VALUE);
			  String strProposedActivityRelId = (String)paramMap.get("relId");
			StringList objectSelects = new StringList(DomainObject.SELECT_TYPE);
			objectSelects.add(DomainObject.SELECT_POLICY);
			objectSelects.add(SELECT_PHYSICALID);
			DomainObject affecteditemObj = new DomainObject(strChangeObjId);
			String strNewReasonForChangeValue = (String) paramMap.get(ChangeConstants.NEW_VALUE);

			Map affectediteminfoMap = affecteditemObj.getInfo(context, objectSelects);

			  String[] relationshipIds=new String[1];
			  StringList selectable=new StringList( DomainRelationship.SELECT_TYPE);
			  selectable.add(DomainRelationship.SELECT_TO_ID);
			selectable.add(DomainRelationship.SELECT_FROM_ID);
			  relationshipIds[0]=strProposedActivityRelId;
			  DomainRelationship ProposedActivityRel =new DomainRelationship(strProposedActivityRelId);
			  MapList mapList=ProposedActivityRel.getInfo(context, relationshipIds,selectable);
			  Map map=(Map)mapList.get(0);
			strChangeActionId = (String) map.get(DomainRelationship.SELECT_FROM_ID);


			// 1 Get the CA
			IChangeAction iChangeAction = ChangeAction.getChangeAction(context, strChangeActionId);

			// 2 Get the proposed
			List<IProposedChanges> proposedChanges = iChangeAction.getProposedChanges(context);


			// 3 Loop on the proposed until you find your objectSelects
			for (IProposedChanges proposed : proposedChanges) {

				BusinessObject targetDo = proposed.getWhere();
				String targetDoId = targetDo.getObjectId(context);

				if (affectediteminfoMap.get(SELECT_PHYSICALID).equals(targetDoId)) {
					/*
					List<IProposedActivity> activities = proposed.getActivites();

					for (IProposedActivity activity : activities) {
						activity.SetWhyComment(context, strNewReasonForChangeValue);
					}
*/
					proposed.SetWhyComment(context, strNewReasonForChangeValue);

			  }
		  }

		} catch (Exception ex) {
			  ex.printStackTrace();
			  throw new FrameworkException(ex.getMessage());
		  }
	  }
 	/**
	 * Method to return implemented items
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	@com.matrixone.apps.framework.ui.ProgramCallable
	@Deprecated
	public MapList getImplementedItems(Context context, String[] args)throws Exception {
		Map programMap = (HashMap)JPO.unpackArgs(args);
		String changeObjId = (String)programMap.get("objectId");
	//	return new ChangeAction(changeObjId).getImplementedItems(context); calling the new API to support mode switch
		return new ChangeAction(changeObjId).getRealizedChanges(context);
	}

	/**
	 * Method to return prerequisites
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	
	@SuppressWarnings("deprecation")
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getPrerequisites(Context context, String[] args)throws Exception {
		Map programMap = (HashMap)JPO.unpackArgs(args);
		String changeObjId = (String)programMap.get("objectId");
		return new ChangeManagement(changeObjId).getPrerequisites(context,ChangeConstants.TYPE_CHANGE_ACTION);
	}

	/**
	 * Method to return prerequisites
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	
	@SuppressWarnings("deprecation")
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getRelatedItems(Context context, String[] args)throws Exception {
		Map programMap = (HashMap)JPO.unpackArgs(args);
		String changeObjId = (String)programMap.get("objectId");
		return new ChangeAction(changeObjId).getRelatedItems(context);
	}
	/**
	 * Method to return Referential
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	@Deprecated
	public MapList getReferntial(Context context, String[] args)throws Exception {
		Map programMap = (HashMap)JPO.unpackArgs(args);
		String changeObjId = (String)programMap.get("objectId");
		MapList mapListReferential=new MapList();

		IChangeAction mChangeAction=ChangeAction.getChangeAction(context, changeObjId);
		List referentialObjList=mChangeAction.GetReferentialObjects(context);
		Iterator referentialList=referentialObjList.iterator();
		while(referentialList.hasNext()){
			BusinessObject refObject=(BusinessObject) referentialList.next();
			DomainObject domObj = DomainObject.newInstance(context, refObject);
			
			Map referential =new HashMap();
			referential.put(DomainConstants.SELECT_ID, domObj.getInfo(context, DomainConstants.SELECT_ID));
			mapListReferential.add(referential);
			}
		return  mapListReferential;
	}
    /**
	 * excludeReferentialOIDs() method returns OIDs of Referential
	 * which are already connected to context change object
	 * @param context Context : User's Context.
	 * @param args String array
	 * @return The StringList value of OIDs
	 * @throws Exception if searching Parts object fails.
	 */
	@com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
	@Deprecated
	public StringList excludeReferentialOIDs(Context context, String args[])throws Exception
	{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		String  strChangeId = (String) programMap.get("objectId");
		StringList strlReferentialList = new StringList();

		if (ChangeUtil.isNullOrEmpty(strChangeId))
			return strlReferentialList;

		try
		{
			setId(strChangeId);
			strlReferentialList.addAll(getInfoList(context, "from["+ChangeConstants.RELATIONSHIP_RELATED_ITEM+"].to.id"));

		}
		catch (Exception e)
		{
			throw new FrameworkException(e.getMessage());
		}
		return strlReferentialList;
	}
/**
	 * Method to add Responsible Organizatoin for CA.
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public void connectResponsibleOrganization(Context context, String[] args)throws Exception
	{
		try
		{
			Map programMap = (HashMap)JPO.unpackArgs(args);
			HashMap hmParamMap = (HashMap)programMap.get("paramMap");
			String strChangeObjId = (String)hmParamMap.get("objectId");
			String strNewResponsibleOrgName = (String)hmParamMap.get(ChangeConstants.NEW_VALUE);
		    this.setId(strChangeObjId);
		    if(UIUtil.isNotNullAndNotEmpty(strNewResponsibleOrgName)) {
				this.setPrimaryOwnership(context, ChangeUtil.getDefaultProject(context), strNewResponsibleOrgName);
	  		}
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}

	/**
	 * connectTechAssignee -
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public void connectTechAssignee(Context context, String[] args)throws Exception
	{
		try
		{
			Map programMap = (HashMap)JPO.unpackArgs(args);
			HashMap hmParamMap = (HashMap)programMap.get("paramMap");
			String strChangeObjId = (String)hmParamMap.get("objectId");
			String strNewTechAssignee = (String)hmParamMap.get("New OID");
		    String relTechAssignee = PropertyUtil.getSchemaProperty(context, "relationship_TechnicalAssignee");

		    ChangeAction changeAction = new ChangeAction(strChangeObjId);
		    changeAction.connectTechAssigneeToCA(context, strChangeObjId, strNewTechAssignee, relTechAssignee);
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}
	/**
	 * connectContributor - Connect Change Action and Person with technical Assignee rel
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ConnectionProgramCallable
	@Deprecated
	public void connectContributor(Context context, String[] args)throws Exception
	{
		try
		{
			Map programMap = (HashMap)JPO.unpackArgs(args);
			HashMap hmParamMap = (HashMap)programMap.get("paramMap");
			String strChangeObjId = (String)hmParamMap.get("objectId");
			HashMap requestMap = (HashMap) programMap.get("requestMap");
			IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeObjId);
			
			String[] strNewContributorArr = (String[])requestMap.get("ContributorHidden");
			String[] strIsFieldModifiedArr = (String[])requestMap.get("IsContributorFieldModified");
			String strIsFieldModified = "true";
			if(strIsFieldModifiedArr != null && strIsFieldModifiedArr.length > 0){
				strIsFieldModified = strIsFieldModifiedArr[0];				
			}
			//To make the decision of calling connect/disconnect method only on field modification.
			if("true".equalsIgnoreCase(strIsFieldModified)){
			String strNewContributors=null;
			if(strNewContributorArr != null && strNewContributorArr.length > 0){
				strNewContributors = strNewContributorArr[0];
			}
			List<String> newContributorNameList=new MapList();
			StringTokenizer strNewContributorList = new StringTokenizer(strNewContributors,",");
			while (strNewContributorList.hasMoreTokens()){
				String strContributor = strNewContributorList.nextToken().trim();
				Person personObj=new Person(strContributor);
				String personName=personObj.getInfo(context,SELECT_NAME);
				newContributorNameList.add(personName);
			}
			List<String> oldContributorNameList=iChangeAction.GetContributors(context);
			List<String> contributorDisconnectList=differenceBetweenList(oldContributorNameList, newContributorNameList);
			List<String> contributorConnectList=differenceBetweenList(newContributorNameList, oldContributorNameList);
			Iterator<String> OldContributorDisconnectList=contributorDisconnectList.iterator();
			while(OldContributorDisconnectList.hasNext()){
				String contributorName=OldContributorDisconnectList.next();
				//BusinessObject objContributer=PersonUtil.getPersonObject(context,contributorName);
				iChangeAction.RemovePersonFromContributors(context, contributorName);
			}
			Iterator<String> NewContributorConnectList=contributorConnectList.iterator();
			while(NewContributorConnectList.hasNext()){
				String contributorName=NewContributorConnectList.next();
				//BusinessObject objContributer=PersonUtil.getPersonObject(context,contributorName);
				iChangeAction.AddPersonAsContributor(context, contributorName);
			}
		}
		}
		catch(Exception e)
		{
			throw new FrameworkException(e.getMessage());
		}
	}
	/**
	 * connectFollower - Connect Change Action with Person with Change Follower rel
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ConnectionProgramCallable
	@Deprecated
	public void connectFollower(Context context, String[] args)throws Exception
	{
		try
		{
			Map programMap = (HashMap)JPO.unpackArgs(args);
			HashMap hmParamMap = (HashMap)programMap.get("paramMap");
			String strChangeObjId = (String)hmParamMap.get("objectId");
			HashMap requestMap = (HashMap) programMap.get("requestMap");
			IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeObjId);

			String[] strNewFollowerArr = (String[])requestMap.get("FollowerHidden");
			String[] strIsFieldModifiedArr = (String[])requestMap.get("IsFollowerFieldModified");
			String strIsFieldModified = "true";
			if(strIsFieldModifiedArr != null && strIsFieldModifiedArr.length > 0){
				strIsFieldModified = strIsFieldModifiedArr[0];				
			}
			//To make the decision of calling connect/disconnect method only on field modification.
			if("true".equalsIgnoreCase(strIsFieldModified)){
			String strNewFollowers=null;
			if(strNewFollowerArr != null && strNewFollowerArr.length > 0){
				strNewFollowers = strNewFollowerArr[0];
			}
			List<String> newFollowerList=new MapList();
			StringTokenizer strNewFollowerList1 = new StringTokenizer(strNewFollowers,",");
			while (strNewFollowerList1.hasMoreTokens()){
				String strFollower = strNewFollowerList1.nextToken().trim();
				Person personObj=new Person(strFollower);
				String personName=personObj.getInfo(context,SELECT_NAME);
				newFollowerList.add(personName);
			}
			List<String> oldFollowerList=iChangeAction.GetFollowers(context);
			List<String> followerDisconnectList=differenceBetweenList(oldFollowerList, newFollowerList);
			List<String> followerConnectList=differenceBetweenList(newFollowerList, oldFollowerList);
			Iterator<String> oldfollowerDisconnectList=followerDisconnectList.iterator();
			while(oldfollowerDisconnectList.hasNext()){
				String personName=oldfollowerDisconnectList.next();
				iChangeAction.RemovePersonFromFollowers(context, personName);
				}
			Iterator<String> newFollowerConnectList=followerConnectList.iterator();
			while(newFollowerConnectList.hasNext()){
				String personName=newFollowerConnectList.next();
				iChangeAction.AddPersonAsFollower(context, personName);
				}
		}
		}
		catch(Exception e){
			throw new FrameworkException(e.getMessage());
		}
	}
	/**
	 * differenceBetweenList - return the difference(A-B) between firstList and secondList
	 * @param context
	 * @param List firstList
	 * @param List secondList
	 * @return List result(Fist-Second)
	 * @throws Exception
	 */
	@Deprecated
	public List differenceBetweenList(List firstList,List secondList)throws Exception
	{
		List resulList=new MapList();
		try
		{
			if(!firstList.isEmpty()){
				resulList.addAll(firstList);
			}
			if(!resulList.isEmpty()){
				resulList.removeAll(secondList);
			}
		}
		catch(Exception e){
			throw new FrameworkException(e.getMessage());
		}
		return resulList;
	}
	/**
  	 * Select the Follower Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Follower Field.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	@Deprecated
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

		if("AddToNewChangeAction".equals(functionality) || "AddToNewCA".equals(functionality)||"addChangeActionUnderChangeOrder".equalsIgnoreCase(functionality)){
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
						if (followerName!=null && !followerName.isEmpty()) {
							//XSSOK
							sb.append("<option value=\""+followersId+"\" >");
							//XSSOK
							sb.append(followerName);
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
						if (followerName!=null && !followerName.isEmpty()) {
							if(!exportToExcel)
							//XSSOK
							sb.append("<input type=\"hidden\" name=\""+followerName+"\" value=\""+followersId+"\" />");
							//XSSOK
							sb.append(followerName);
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
	@Deprecated
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



		if("AddToNewChangeAction".equals(functionality) || "AddToNewCA".equals(functionality)||"addChangeActionUnderChangeOrder".equalsIgnoreCase(functionality)){
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
						if (contributorName!=null && !contributorName.isEmpty()) {
							//XSSOK
							sb.append("<option value=\""+contributorsId+"\" >");
							//XSSOK
							sb.append(contributorName);
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
						if (contributorName!=null && !contributorName.isEmpty()) {
							if(!exportToExcel)
							//XSSOK
							sb.append("<input type=\"hidden\" name=\""+contributorName+"\" value=\""+contributorsId+"\" />");
							//XSSOK
							sb.append(contributorName);
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
	@Deprecated
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


		if("AddToNewChangeAction".equals(functionality) || "AddToNewCA".equals(functionality)||"addChangeActionUnderChangeOrder".equalsIgnoreCase(functionality)){
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
						if (reviewerName!=null && !reviewerName.isEmpty()) {

							sb.append("<option value=\""+reviewersId+"\" >");
							//XSSOK
							sb.append(reviewerName);
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
						if (reviewerName!=null && !reviewerName.isEmpty()) {
							if(!exportToExcel)
							//XSSOK
							sb.append("<input type=\"hidden\" name=\""+reviewerName+"\" value=\""+reviewersId+"\" />");
							//XSSOK
							sb.append(reviewerName);
							if(!lastReviewerId.equalsIgnoreCase(reviewersId))
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
	 * connectReviewers - Connect Change Action and Person or Route Template
	 *if Route Template Connect then People Associate with Route Template also connect to CA
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ConnectionProgramCallable
	@Deprecated
	public void connectReviewers(Context context, String[] args)throws Exception
	{
		try{
			Map programMap = (HashMap)JPO.unpackArgs(args);
			HashMap hmParamMap = (HashMap)programMap.get("paramMap");
			String strChangeObjId = (String)hmParamMap.get("objectId");
			HashMap requestMap = (HashMap) programMap.get("requestMap");
			IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeObjId);
			String[] strNewReviwersArr = (String[])requestMap.get("ReviewersHidden");
			String[] strIsFieldModifiedArr = (String[])requestMap.get("IsReviewerFieldModified");
			//Modified for 	IR-896300
			//String strIsFieldModified = "true";
			String strIsFieldModified = "false";
			if(strIsFieldModifiedArr != null && strIsFieldModifiedArr.length > 0){
				strIsFieldModified = strIsFieldModifiedArr[0];				
			}
			//To make the decision of calling connect/disconnect method only on field modification.
			if("true".equalsIgnoreCase(strIsFieldModified)){
			String strNewReviwers=null;

			String relRouteObjet=PropertyUtil.getSchemaProperty(context, "relationship_ObjectRoute");
			if(strNewReviwersArr != null && strNewReviwersArr.length > 0){
				strNewReviwers = strNewReviwersArr[0];
			}
			DomainObject changeAction = new DomainObject(strChangeObjId);
			StringList listRouteTemplaterelId=new StringList();
			MapList mapList=changeAction.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_OBJECT_ROUTE,
					  DomainConstants.TYPE_ROUTE_TEMPLATE,
					  new StringList(DomainObject.SELECT_ID),
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 2,
					  null, null, (short) 0);
			if(!mapList.isEmpty()){
				Iterator itr=mapList.iterator();
				while(itr.hasNext()){
					Map dataMap=(Map)itr.next();
					String routeTemplateRelId=(String) dataMap.get(DomainRelationship.SELECT_ID);
					listRouteTemplaterelId.add(routeTemplateRelId);
				}
			}
			List<String> newReviwerNameList=new MapList();
			if(!checkRouteTemplate(context,strNewReviwers)){
				StringTokenizer strNewReviwersList = new StringTokenizer(strNewReviwers,",");
				while (strNewReviwersList.hasMoreTokens()){
					String strReviwer = strNewReviwersList.nextToken().trim();
					Person personObj=new Person(strReviwer);
					String personName=personObj.getInfo(context,SELECT_NAME);
					newReviwerNameList.add(personName);
				}
			}
			List reviewerPersonlistOld=iChangeAction.GetReviewers(context);
			List reviwerDisconnectList=differenceBetweenList(reviewerPersonlistOld, newReviwerNameList);
			List reviwerConnectList=differenceBetweenList(newReviwerNameList, reviewerPersonlistOld);
			Iterator oldReviwerDisconnectList=reviwerDisconnectList.iterator();
			//Disconnecting old person from Change Action
			while(oldReviwerDisconnectList.hasNext()){
				String reviewerNameOld=(String) oldReviwerDisconnectList.next();
				iChangeAction.RemovePersonFromReviewers(context, reviewerNameOld);
			}
			//Disconnecting old Route Template from Change Action
			if(!listRouteTemplaterelId.isEmpty()){
				if(strNewReviwers.isEmpty()||!checkRouteTemplate(context,strNewReviwers)){
					String strOldReviwerRoute=	(String) listRouteTemplaterelId.get(0);
					DomainRelationship.disconnect(context, strOldReviwerRoute);
				}
			}
			//Connecting new person as Reviewer of Change Action
			if(!strNewReviwers.isEmpty()){
				if(!checkRouteTemplate(context,strNewReviwers)){
					Iterator newReviwerConnectList=reviwerConnectList.iterator();
					while (newReviwerConnectList.hasNext()){
						String strReviwer = (String) newReviwerConnectList.next();
						iChangeAction.AddPersonAsReviewer(context, strReviwer);
					}
				}else
				{
					if(strNewReviwers.indexOf(",") == -1){
						
					DomainObject objReviwer=new DomainObject(strNewReviwers);
						
					if(!listRouteTemplaterelId.isEmpty()&&!(listRouteTemplaterelId==null)){
							
							for(int i=0; i<listRouteTemplaterelId.size(); i++){
								String strOldReviwerRoute=	(String) listRouteTemplaterelId.get(i);
								DomainRelationship.disconnect(context, strOldReviwerRoute);
							}	
						}
						
						//DomainRelationship.connect(context,strChangeObjId,relRouteObjet,strNewReviwers,true);
						iChangeAction.addApprovalRouteTemplate(context, strNewReviwers);
					}
					else{
						throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.TooManyRouteTemplate"));
					}
				}		
				}
					}
				}
		catch(Exception e){
			throw new FrameworkException(e.getMessage());
		}
	}
	/**
	 * connectRouteTemplatePersonToCA - Connect Change Action and Person Associate with Route Template with Change Reviewer relationship
	 * @param context
	 * @param changeActionId
	 * @param routeTemplateNewId
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ConnectionProgramCallable
	@Deprecated
	public static void connectRouteTemplatePersonToCA (Context context,String changeActionId,String routeTemplateNewId)throws Exception{
		try {
			String  strRouteTemplateId=routeTemplateNewId;
			String  strChangeObjId=changeActionId;
			IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeObjId);
			DomainObject routeTemplate=new DomainObject(strRouteTemplateId);
			StringList stringListPerson=new StringList();
			MapList mapList=routeTemplate.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_ROUTE_NODE,
					  DomainConstants.TYPE_PERSON,
					  new StringList(DomainObject.SELECT_ID),
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 2,
					  null, null, (short) 0);
			if(!mapList.isEmpty()){
				Iterator itr=mapList.iterator();
				while(itr.hasNext()){
					Map dataMap=(Map)itr.next();
					String personId=(String) dataMap.get(DomainObject.SELECT_ID);
					stringListPerson.add(personId);
				}
			}
			Iterator strOldReviewersrelId = stringListPerson.iterator();
			while (strOldReviewersrelId.hasNext()){
				String strReviwer = (String) strOldReviewersrelId.next();
				strReviwer = DomainObject.newInstance(context, strReviwer).getInfo(context, DomainConstants.SELECT_NAME);
				//BusinessObject objReviwer=new BusinessObject(strReviwer);
				iChangeAction.AddPersonAsReviewer(context, strReviwer);
			}
		} catch (Exception e) {
			throw new FrameworkException(e.getMessage());
		}
	}
	/**
	 * checkRouteTemplate - Check whether given string contain Route Template type or Not
	 * @param Context  context
	 * @param String reviewers
	 * @return boolean -true/false
	 * @throws Exception
	 */
	@Deprecated
	public static boolean checkRouteTemplate(Context context,String reviewers)throws Exception{

		try {
			StringTokenizer strNewReviewersList = new StringTokenizer(reviewers,",");
			while (strNewReviewersList.hasMoreTokens())
			{
				String strReviewer = strNewReviewersList.nextToken().trim();
				DomainObject domainObj=new DomainObject(strReviewer);
				String objType=domainObj.getInfo(context,SELECT_TYPE);
				if(objType.equalsIgnoreCase(DomainConstants.TYPE_ROUTE_TEMPLATE)){
					return true;
				}
			}
		}
		catch (Exception e) {
			throw new FrameworkException(e.getMessage());
		}
		return false;
	}

	/**
	 * connectSeniorTechAssignee - Connect new Senior Tech Assignee -Update Program
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public void connectSeniorTechAssignee(Context context, String[] args)throws Exception
	{
		try
		{
			Map programMap = (HashMap)JPO.unpackArgs(args);
			HashMap hmParamMap = (HashMap)programMap.get("paramMap");
			String strChangeObjId = (String)hmParamMap.get("objectId");
			String strNewSeniorTechAssig = (String)hmParamMap.get("New OID");
			String relSeniorTechAssignee = PropertyUtil.getSchemaProperty(context, "relationship_SeniorTechnicalAssignee");
			this.setId(strChangeObjId);
			String strSrTechAssigneeRelId = getInfo(context, "from["+ relSeniorTechAssignee +"].id");

			if(!ChangeUtil.isNullOrEmpty(strSrTechAssigneeRelId))
			{
				DomainRelationship.disconnect(context, strSrTechAssigneeRelId);
			}
			if(!ChangeUtil.isNullOrEmpty(strNewSeniorTechAssig)){
				DomainRelationship.connect(context, new DomainObject(strChangeObjId), new RelationshipType(relSeniorTechAssignee), new DomainObject(strNewSeniorTechAssig));
			}
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}

	/**
	 * This is a check trigger method on (Pending --> InWork) to validate Estimated Completion Date and Technical Assignee on the Change Action
	 * @param context
	 * @param args Change Action Id and Notice
	 * @return integer (0 = pass, 1= block with notice)
	 * @throws Exception
	 */
	@Deprecated
	public int validateCompletionDateAndTechAssignee(Context context, String args[])throws Exception
	{
		int iReturn = 0;
		try
		{
			if (args == null || args.length < 1)
			{
				throw (new IllegalArgumentException());
			}
			String strChangeId = args[0];
			this.setId(strChangeId);

			// Getting the Tecchnical Assignee connected
			String strTechAssigneeId = getInfo(context, "from["+ ChangeConstants.RELATIONSHIP_TECHNICAL_ASSIGNEE +"].to.id");
			String strEstCompletionDateNotice = EnoviaResourceBundle.getProperty(context, args[3], context.getLocale(),args[1]);
			String strTechAssigneeNotice = EnoviaResourceBundle.getProperty(context, args[3], context.getLocale(),args[2]);
			// Getting the Estimated Completion Date Value
			String strCompletionDate = (String) getAttributeValue(context, ChangeConstants.ATTRIBUTE_ESTIMATED_COMPLETION_DATE);

			// Validating If both are not empty, if so accordingly sending the notice.
			if (ChangeUtil.isNullOrEmpty(strCompletionDate))
			{
				//${CLASS:emxContextUtilBase}.mqlNotice(context, strEstCompletionDateNotice);
				 MqlUtil.mqlCommand(context, "notice $1",strEstCompletionDateNotice);
				iReturn = 1;
			}

			if(ChangeUtil.isNullOrEmpty(strTechAssigneeId))
			{
				//${CLASS:emxContextUtilBase}.mqlNotice(context, strTechAssigneeNotice);
				 MqlUtil.mqlCommand(context, "notice $1",strTechAssigneeNotice);
				iReturn = 1;
			}
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw new FrameworkException(Ex.getMessage());
		}
		return iReturn;
	}

	/**
	 * Subsidiary method to add the new String to the StringBuffer
	 * @param context
	 * @param sbOutput - StringBuffer Output
	 * @param message - String need to be added
	 * @return String Buffer
	 * @throws Exception
	 */
	private StringBuffer addToStringBuffer(Context context, StringBuffer sbOutput, String message)throws Exception
	{
		try
		{
			if(sbOutput != null && sbOutput.length() != 0)
			{
				sbOutput.append(", ");
				sbOutput.append(message);
			}
			else
			{
				sbOutput.append(message);
			}
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
		return sbOutput;
	}

	/**
	 * Check Trigger on (Prepare --> InWork) to check whether Prerequisites Parent CA (Hard Dependency) are all in Complete State,
	 * Hard Dependency - Parent Change Action Id will  be having attribute value "Type of Dependency" as "Hard".
	 * @param context
	 * @param args - Change Action Id
	 * @return (0 = pass, 1= block with notice)
	 * @throws Exception
	 functions returning 0 for cloud, because trigger is enabled on CLoud ENV.
	*/
	@Deprecated
	public int checkForDependency(Context context, String args[])throws Exception
	{
		int iReturn = 0;
	/*	try
		{
			if (args == null || args.length < 1){ throw (new IllegalArgumentException());}
			
			//skip this trigger check if new Change Dependency feature is enabled
			String exp = "CHG_DEPENDENCY";
			//String cmdExp = "print expression $1 select value dump";
			String cmdExp = "list expression $1 select value dump";
			
			boolean bSkipDependencyCheck = false;
			try{
				bSkipDependencyCheck = "true".equalsIgnoreCase(MqlUtil.mqlCommand(context, cmdExp, exp).trim())?true:false;
			} catch(Exception ex){}
			
			if(bSkipDependencyCheck){ return 0;}

			String strCAName = "";
			Map tempMap = null;
			String strChangeId = args[0];
			this.setId(strChangeId);
			StringBuffer sBusWhere = new StringBuffer();
			StringBuffer sRelWhere = new StringBuffer();
			StringBuffer sbMessage = new StringBuffer();

			String strNotice = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Notice.HardDependency");

			sBusWhere.append("("+SELECT_CURRENT + " != \"");
			sBusWhere.append(ChangeConstants.STATE_CHANGE_ACTION_APPROVED);
			sBusWhere.append("\" && ");
			sBusWhere.append(SELECT_CURRENT + " != \"");
			sBusWhere.append(ChangeConstants.STATE_CHANGE_ACTION_COMPLETE);
			sBusWhere.append("\" && ");
			sBusWhere.append(SELECT_CURRENT + " != \"");
			sBusWhere.append(ChangeConstants.STATE_CHANGE_ACTION_CANCEL);
			sBusWhere.append("\" && ");
			sBusWhere.append(SELECT_CURRENT + " != \"");
			sBusWhere.append(ChangeConstants.STATE_CHANGE_ACTION_HOLD);
			sBusWhere.append("\")");
			sRelWhere.append("attribute[");
			sRelWhere.append(ChangeConstants.ATTRIBUTE_PREREQUISITE_TYPE);
			sRelWhere.append("] == ");
			sRelWhere.append(ATTR_VALUE_MANDATORY);

			// Get all the Prerequisites which are not in complete state and that are Hard Dependency.
			MapList mlPrerequisites = new ChangeAction(strChangeId).getPrerequisites(context,ChangeConstants.TYPE_CHANGE_ACTION, sBusWhere.toString(),sRelWhere.toString());

			if(mlPrerequisites != null && !mlPrerequisites.isEmpty())
			{
				for (Object var : mlPrerequisites)
				{
					tempMap = (Map) var;
					strCAName = (String) tempMap.get(SELECT_NAME);
					sbMessage = addToStringBuffer(context, sbMessage, strCAName);
				}
			}

			// If Message is not empty, send the notice with Change Action which are not completed.
			if(sbMessage.length() != 0)
			{
				${CLASS:emxContextUtilBase}.mqlNotice(context, strNotice + "  "+sbMessage.toString());
				iReturn = 1;
			}
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw new FrameworkException(Ex.getMessage());
		}*/
		return iReturn;
	}
 
	/**
	 * Check Trigger on (Pending --> InWork) to check whether parent CO is in In Work state,
	 * @param context
	 * @param args - Change Action Id
	 * @return (0 = pass, 1= block with notice)
	 * @throws Exception
	 */
	@Deprecated
	public int checkCOState(Context context, String args[]) throws Exception {
	
		return 0;
	}


	/**
	 * The Action trigger  method on (Pending --> In Work) to set current date as the Actual Start Date of Change Action
	 * @param context
	 * @param args (Change Action Id)
	 * @throws Exception
	 */
	@Deprecated
	public void setActualStartDate(Context context, String[] args)throws Exception
	{
		try
		{
			if (args == null || args.length < 1)
			{
				throw (new IllegalArgumentException());
			}
			String strObjId = args[0];
			this.setId(strObjId);
			SimpleDateFormat _mxDateFormat = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
			String strActualStartDate = _mxDateFormat.format(new Date());

			// Setting the Current Date to the Actual Start Date.
			setAttributeValue(context, ATTRIBUTE_ACTUAL_START_DATE, strActualStartDate);
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}

	
	/**
	 * Check Trigger on (In Work -->> In Approval) to check whether the Route Template or the Senior technical Assignee is connected to Change Action.
	 * @param context
	 * @param args (Change Action ID and Notice)
	 * @return (0 = pass, 1 = block the promotion)
	 * @throws Exception
	 */
	@Deprecated
	public int checkForSrTechnicalAssigneeAndRouteTemplate(Context context, String[] args)throws Exception
	{
		int iReturn = 0;
		if (args == null || args.length < 1)
		{
			throw (new IllegalArgumentException());
		}
		String objectId = args[0];// Change Object Id
		String strReviewerRouteTemplate = args[1];
		MapList mapRouteTemplate = new MapList();

		try
		{
			// create change object with the context Object Id
			setId(objectId);
			StringList selectStmts = new StringList(1);
			selectStmts.addElement("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");

			String whrClause = "attribute["
				+ ATTRIBUTE_ROUTE_BASE_PURPOSE + "] match '"
				+ strReviewerRouteTemplate + "' && current == Active";

			// get route template objects from change object
			mapRouteTemplate = getRelatedObjects(context,
					RELATIONSHIP_OBJECT_ROUTE, TYPE_ROUTE_TEMPLATE,
					selectStmts, null, false, true, (short) 1, whrClause, null, 0);

			// get the Senior Technical Assignee connected
			String strResponsibleOrgRelId = getInfo(context, "from["+ ChangeConstants.RELATIONSHIP_SENIOR_TECHNICAL_ASSIGNEE +"].id");

			// Send notice and block promotion if both are not connected.
			if ((mapRouteTemplate == null || mapRouteTemplate.isEmpty()) && ChangeUtil.isNullOrEmpty(strResponsibleOrgRelId))
			{
				//${CLASS:emxContextUtil}.mqlNotice(context,EnoviaResourceBundle.getProperty(context, args[3], context.getLocale(),args[2]));
				String msg = EnoviaResourceBundle.getProperty(context, args[3], context.getLocale(),args[2]);
				 MqlUtil.mqlCommand(context, "notice $1", msg);
				iReturn = 1;
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		return iReturn;
	}


	/**
	 * Action Trigger on (InApproval-- > Approved) to Set the current date as the Actual Completion Date
	 * @param context
	 * @param args (Cahnge Action Id)
	 * @throws Exception
	 */
	@Deprecated
	public void setActualCompletionDate(Context context, String[] args)throws Exception
	{
		try
		{
			if (args == null || args.length < 1)
			{
				throw (new IllegalArgumentException());
			}
			String strObjId = args[0];
			this.setId(strObjId);
			SimpleDateFormat _mxDateFormat = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
			String strActualCompletionDate = _mxDateFormat.format(new Date());
			// Set the Actual Completion Date
			setAttributeValue(context, ATTRIBUTE_ACTUAL_COMPLETION_DATE, strActualCompletionDate);
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}



	/**
	 * Action Trigger (InWork --> In Approval) to check whether Route Template is connected to the Change Action,
	 * If not get the Senior Technical Assignee and set as the Owner.
	 * @param context
	 * @param args (Change Action Id)
	 * @throws Exception
	 */
	@Deprecated
	public void setOwner(Context context, String args[])throws Exception
	{
		if (args == null || args.length < 1)
		{
			throw (new IllegalArgumentException());
		}
		try
		{
			String objectId = args[0];// Change Object Id
			String strReviewerRouteTemplate = args[1];
			MapList mapRouteTemplate = new MapList();

			setId(objectId);
			StringList selectStmts = new StringList(1);
			selectStmts.addElement("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");

			String whrClause = "attribute["
				+ ATTRIBUTE_ROUTE_BASE_PURPOSE + "] match '"
				+ strReviewerRouteTemplate + "' && current == Active";

			// get route template objects from change object
			mapRouteTemplate = getRelatedObjects(context,
					RELATIONSHIP_OBJECT_ROUTE, TYPE_ROUTE_TEMPLATE,
					selectStmts, null, false, true, (short) 1, whrClause, null, 0);

			// If not Route template is connected to the Change Action, the get the Senior Technical Assignee and set as change Action Owner.
			if(mapRouteTemplate == null || mapRouteTemplate.isEmpty())
			{

				String strSeniorTechAssignee = getInfo(context, "from["+ ChangeConstants.RELATIONSHIP_SENIOR_TECHNICAL_ASSIGNEE +"].to.name");
				setOwner(context, strSeniorTechAssignee);
			}
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}

	/**
	 * Action Trigger on (InApproval --> Approved) to check whether the context Change Action is the ast Change Action to be Approved.
	 * If so then Promote the Change Order to "In Approval" state and notify CO Owner.
	 * @param context
	 * @param args (Change Action Id and Notice)
	 * @throws Exception
	 
	public void checkForLastCA(Context context, String args[]) throws Exception {
		try {
			String strCAId;
			String strCAState;
			String strCAPolicy;
			String strChangeOrderId = null;
			String strChangeOrderPolicy = null;
			StringList strRouteList = new StringList();
			String strRoutetemplate = null;
			String strCCAId = null;
			Map tempMap = null;

			StringList listChangeActionAllStates;
			boolean pendingChangeExists = false;
			String objectId = args[0];// Change Object Id
			setId(objectId);


			StringList slObjectSelect = new StringList(4);
			slObjectSelect.add(SELECT_ID);
			slObjectSelect.add(SELECT_POLICY);
			slObjectSelect.add("from["+RELATIONSHIP_OBJECT_ROUTE+"|to.type=='"+TYPE_ROUTE_TEMPLATE+"' && to.revision == to.last &&  attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]==Approval].to.name");
			slObjectSelect.add("from["+RELATIONSHIP_OBJECT_ROUTE+"|to.type=='"+TYPE_ROUTE+"' &&  attribute["+ATTRIBUTE_ROUTE_BASE_STATE+"]=='state_InApproval'].to.name");

			MapList resultList= getRelatedObjects(context,
								ChangeConstants.RELATIONSHIP_CHANGE_ACTION,
								ChangeConstants.TYPE_CHANGE_ORDER,
								slObjectSelect,
								null,
								true,
								false,
								(short) 1,
								"",
								EMPTY_STRING,
								0);

			if(resultList != null && !resultList.isEmpty())
			{
				for (Object var : resultList)
				{
					tempMap = (Map) var;
					strChangeOrderId = (String) tempMap.get(SELECT_ID);
					strChangeOrderPolicy = (String) tempMap.get(SELECT_POLICY);
					if(tempMap.get("from["+RELATIONSHIP_OBJECT_ROUTE+"].to.name") instanceof StringList){
						strRouteList = (StringList) tempMap.get("from["+RELATIONSHIP_OBJECT_ROUTE+"].to.name");
						strRoutetemplate = (String) strRouteList.get(0);
					}else{
						strRoutetemplate = (String) tempMap.get("from["+RELATIONSHIP_OBJECT_ROUTE+"].to.name");
					}

				}
			}

			if (UIUtil.isNotNullAndNotEmpty(strChangeOrderId)) {
				// Get Change Actions connected to Change Order
				MapList mlChangeActions = getChangeActions(context, strChangeOrderId);
				HashMap releaseStateMap = ChangeUtil.getReleasePolicyStates(context);

				Map mapTemp;
				for (Object var : mlChangeActions) {
					mapTemp = (Map) var;
					strCAId = (String) mapTemp.get(SELECT_ID);
					if (!strCAId.equals(objectId)) {
						strCAState = (String) mapTemp.get(SELECT_CURRENT);
						strCAPolicy = (String) mapTemp.get(SELECT_POLICY);
						listChangeActionAllStates = ChangeUtil.getAllStates(context, strCAPolicy);
						if (new ChangeUtil().checkObjState(context, listChangeActionAllStates, strCAState, (String) releaseStateMap.get(strCAPolicy), ChangeConstants.LT) == 0) {
							if (ChangeConstants.TYPE_CCA.equals((String) mapTemp.get(SELECT_TYPE))) {
								String affectedItemExits = DomainObject.newInstance(context, strCAId).getInfo(context, "from[" + DomainConstants.RELATIONSHIP_AFFECTED_ITEM + "]");
								if ("True".equalsIgnoreCase(affectedItemExits)) {
									pendingChangeExists = true;
									break;
								} else {
									strCCAId = strCAId;
								}
							} else {
								pendingChangeExists = true;
								break;
							}
						}
					}
				}

				//If flag is empty, then set the CO state and notify the owner.
				if (!pendingChangeExists) {
					setId(strChangeOrderId);
					if(UIUtil.isNotNullAndNotEmpty(strRoutetemplate)){
						setState(context, PropertyUtil.getSchemaProperty(context, "policy", strChangeOrderPolicy, "state_InApproval"));
					}else{
						// This code has been changed to address the scenario wherein, when the only one CA of CO is promoted to Approved it would promote CO to complete. This in turn would lead to promotion auto promotion of CA
						setState(context, PropertyUtil.getSchemaProperty(context, "policy", strChangeOrderPolicy, "state_InApproval"));
					}

					${CLASS:emxNotificationUtilBase}.sendNotification(context,
																			strChangeOrderId,
																			new StringList(getOwner(context).getName()),
																			new StringList(),
																			new StringList(),
																			args[1],
																			args[2],
																			new StringList(),
																			args[3],
																			null, null, null);
					if (strCCAId != null) {
						DomainObject.deleteObjects(context, new String[] {strCCAId});
				}
			}
		}
		} catch (Exception Ex) {
			Ex.printStackTrace();
			throw Ex;
		}
	}
*/
	/**
	 * Subsidiary method to get Change Actions connected to the Change Order
	 * @param context
	 * @param strChangeOrderId
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public MapList getChangeActions(Context context, String strChangeOrderId)throws Exception
	{
		StringList slObjectSelect = new StringList(4);
		slObjectSelect.add(SELECT_ID);
		slObjectSelect.add(SELECT_NAME);
		slObjectSelect.add(SELECT_CURRENT);
		slObjectSelect.add(SELECT_TYPE);
		slObjectSelect.add(SELECT_POLICY);
		StringList slRelSelect = new StringList(SELECT_RELATIONSHIP_ID);
		setId(strChangeOrderId);
		return getRelatedObjects(context,
				ChangeConstants.RELATIONSHIP_CHANGE_ACTION,
											DomainConstants.QUERY_WILDCARD,
				slObjectSelect,
				slRelSelect,
				false,
				true,
				(short) 1,
				"",
				EMPTY_STRING,
				0);
	}

/**
		 * Displays the Range Values on Edit for Attribute Requested Change at COAffectedItemsTable/CAAffectedItemsTable..
		 * @param	context the eMatrix <code>Context</code> object
		 * @param	args holds a HashMap containing the following entries:
		 * @param   HashMap containing the following keys, "objectId"
	     * @return  HashMap contains actual and display values
		 * @throws	Exception if operation fails
		 * @since   ECM R211
		 */
		@Deprecated
	    public HashMap displayRequestedChangeRangeValues(Context context,String[] args) throws Exception
	    {
	    	String strLanguage  	   =  context.getSession().getLanguage();
	    	StringList requestedChange = new StringList();
	    	StringList strListRequestedChange = FrameworkUtil.getRanges(context , ATTRIBUTE_REQUESTED_CHANGE);
	    	HashMap rangeMap = new HashMap ();

	    	StringList listChoices     = new StringList();
	    	StringList listDispChoices = new StringList();

	    	String attrValue = "";
	    	String dispValue = "";
	    	String key = "";

	    	for (int i=0; i < strListRequestedChange.size(); i++)
	    	{
	    		attrValue = (String)strListRequestedChange.get(i);
	    		if(!ChangeConstants.FOR_NONE.equals(attrValue)){
	    		key = attrValue.replace(" ", "_");
	    		dispValue = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Range.Requested_Change."+key,strLanguage);
	    		listDispChoices.add(dispValue);
	    		listChoices.add(attrValue);
	    	}
	    	}

	    		attrValue = ChangeConstants.FOR_EVOLUTION;
	    		key = attrValue.replace(" ", "_");
	    		dispValue = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Range.Requested_Change."+key,strLanguage);
	    		listDispChoices.add(dispValue);
	    		listChoices.add(attrValue);
	    	
	    	rangeMap.put("field_choices", listChoices);
	    	rangeMap.put("field_display_choices", listDispChoices);

	    	return rangeMap;
	    }

	    /**
		 * excludeAffectedItems() method returns OIDs of Affect Items
		 * which are already connected to context change object
		 * @param context Context : User's Context.
		 * @param args String array
		 * @return The StringList value of OIDs
		 * @throws Exception if searching Parts object fails.
		 */
		@com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
		@Deprecated
		public StringList excludeAffectedItems(Context context, String args[])throws Exception
		{
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			String  strChangeId = (String) programMap.get("objectId");
			StringList strlAffItemList = new StringList();

			if (ChangeUtil.isNullOrEmpty(strChangeId))
				return strlAffItemList;

			try
			{
				MapList affectedItemMapList = getAffectedItems(context, args);
				Map affectedItemMap = null;
				Iterator itr = affectedItemMapList.iterator();

				while(itr.hasNext()){
					affectedItemMap = (Map)itr.next();
					strlAffItemList.add((String)affectedItemMap.get(SELECT_ID));
				}
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
			return strlAffItemList;
		}


	/**
     * Method to get the proper Input Type/Format settings for interface attributes
     * @param context
     * @param columnMap
     * @param attrType
     * @param choicesList
     * @param sMultiLine
     * @throws MatrixException
     */
    private void setColumnSettings(Context context, Map columnMap, String attrType, StringList choicesList,
    		String sMultiLine) throws MatrixException {
    	String strFieldFormat = "";
    	String strFieldIPType = INPUT_TYPE_TEXTBOX;

        if(FORMAT_STRING.equalsIgnoreCase(attrType)) {
        	strFieldIPType = INPUT_TYPE_TEXTBOX;
            if(choicesList != null && choicesList.size() > 0) {
                strFieldIPType = INPUT_TYPE_COMBOBOX;
            } else if ("true".equalsIgnoreCase(sMultiLine)) {
                strFieldIPType = INPUT_TYPE_TEXTAREA;
            }
        } else if(FORMAT_BOOLEAN.equalsIgnoreCase(attrType)) {
                strFieldIPType = INPUT_TYPE_COMBOBOX;
        } else if(FORMAT_REAL.equalsIgnoreCase(attrType)) {
            if(choicesList != null && choicesList.size() > 0) {
                strFieldIPType = INPUT_TYPE_COMBOBOX;
            }
            strFieldFormat = FORMAT_NUMERIC;
        } else if(FORMAT_TIMESTAMP.equalsIgnoreCase(attrType)) {
            strFieldFormat = FORMAT_DATE;
        } else if(FORMAT_INTEGER.equalsIgnoreCase(attrType)) {
            if(choicesList != null && choicesList.size() > 0) {
                strFieldIPType = INPUT_TYPE_COMBOBOX;
            }
            strFieldFormat = FORMAT_INTEGER;
        }

        columnMap.put(SETTING_INPUT_TYPE, strFieldIPType);
        if(strFieldFormat.length()>0)
        	columnMap.put(SETTING_FORMAT, strFieldFormat);
    }

	/**
	 * The Action trigger  method on (Pending --> In Work) to Promote Connected CO to In Work State
	 * @param context
	 * @param args (Change Action Id)
	 * @throws Exception
	 */
	@Deprecated
	public void promoteConnectedCO(Context context, String[] args)throws Exception {
	//	new ChangeAction().promoteConnectedCO(context, args);
		
		try
		{
			if (args == null || args.length < 1)
			{
				throw (new IllegalArgumentException());
			}
			String strObjId = args[0];
			this.setId(strObjId);
			String coObjIdSelect = "to[" + ChangeConstants.RELATIONSHIP_CHANGE_ACTION + "].from[" + ChangeConstants.TYPE_CHANGE_ORDER + "].id";
			String coPolicySelect = "to[" + ChangeConstants.RELATIONSHIP_CHANGE_ACTION + "].from[" + ChangeConstants.TYPE_CHANGE_ORDER + "].policy";
			String coStateSelect = "to[" + ChangeConstants.RELATIONSHIP_CHANGE_ACTION + "].from[" + ChangeConstants.TYPE_CHANGE_ORDER + "].current";

			StringList select = new StringList();
			select.add(coObjIdSelect);
			select.add(coPolicySelect);
			select.add(coStateSelect);

			Map resultList = getInfo(context, select);
			String coObjId = (String) resultList.get(coObjIdSelect);
			String copolicy = (String) resultList.get(coPolicySelect);
			String coState= (String) resultList.get(coStateSelect);

			if(UIUtil.isNotNullAndNotEmpty(coObjId) && ChangeConstants.POLICY_FASTTRACK_CHANGE.equalsIgnoreCase(copolicy) && ChangeConstants.STATE_FASTTRACKCHANGE_PREPARE.equalsIgnoreCase(coState)) {
				setId(coObjId);
				setState(context, ChangeConstants.STATE_FASTTRACKCHANGE_INWORK);
			}
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}

	/**
	 * Reset Owner on demote of ChangeAction
	 * @param context the eMatrix <code>Context</code> object
	 * @param args holds the following input arguments:
	 * 0 - String holding the object id.
	 * 1 - String to hold state.
	 * @returns void.
	 * @throws Exception if the operation fails
	 * @since ECM R417
	 */
	@Deprecated
	public void resetOwner(Context context, String[] args)
			throws Exception
			{
		try
		{
			String objectId = args[0];                              //changeObject ID
			setObjectId(objectId);
			String strCurrentState = args[1];                       //current state of ChangeObject

			StringList select	   = new StringList(SELECT_OWNER);
			select.add(SELECT_ORIGINATOR);
			select.add(SELECT_POLICY);
			select.add(ChangeConstants.SELECT_TECHNICAL_ASSIGNEE_NAME);
			Map resultList 		   = getInfo(context, select);
			String currentOwner    = (String) resultList.get(SELECT_OWNER);
			String sOriginator     = (String) resultList.get(SELECT_ORIGINATOR);
			String sPolicy		   = (String) resultList.get(SELECT_POLICY);
			String previousOwner =  (String) resultList.get(ChangeConstants.SELECT_TECHNICAL_ASSIGNEE_NAME);

			if(ChangeConstants.POLICY_CHANGE_ACTION.equalsIgnoreCase(sPolicy)&& ChangeConstants.STATE_CHANGE_ACTION_INAPPROVAL.equalsIgnoreCase(strCurrentState) && !ChangeUtil.isNullOrEmpty(previousOwner) && !currentOwner.equalsIgnoreCase(previousOwner))
			{
				setOwner(context, previousOwner);

			}

		}
		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
			}

	@com.matrixone.apps.framework.ui.ProgramCallable
	@Deprecated
	public static StringList getStateWithHoldInfoForTable(Context context,
			String[] args) throws FrameworkException {
		try {
			//String strLanguage = context.getSession().getLanguage();
			HashMap inputMap = (HashMap) JPO.unpackArgs(args);
			MapList objectMap = (MapList) inputMap.get("objectList");
			String objID = null;
			String[] objIDArr = new String[objectMap.size()];

			for (int i = 0; i < objectMap.size(); i++) {
				Map outerMap = new HashMap();
				outerMap = (Map) objectMap.get(i);
				objID = (String) outerMap.get(ChangeConstants.SELECT_ID);
				objIDArr[i] = objID;
			}

			StringList returnStringList = getStateWithHoldInfo(context, objIDArr);

			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}
	
	
	@Deprecated
	public static StringList getStateWithHoldInfo(Context context,
			String[] objIDArr) throws FrameworkException {
		try {
			String strLanguage = context.getSession().getLanguage();
			StringList objectSelects = new StringList();
			objectSelects.add(ChangeConstants.SELECT_INTERFACE_CHANGE_ON_HOLD);
			objectSelects.add(ChangeConstants.SELECT_CURRENT);
			objectSelects.add(ChangeConstants.SELECT_TYPE);
			objectSelects.add(ChangeConstants.SELECT_POLICY);
			StringList returnStringList = new StringList(objIDArr.length);

			MapList stateWithHoldInfoMapList = DomainObject.getInfo(context, objIDArr, objectSelects);

			for (int j = 0; j < stateWithHoldInfoMapList.size(); j++) {
				Map stateWithHoldInfoMap = (Map)stateWithHoldInfoMapList.get(j);
				String strState = (String)stateWithHoldInfoMap.get(ChangeConstants.SELECT_CURRENT);
				strState = strState.replace(" ", "_");
				String strType = (String)stateWithHoldInfoMap.get(ChangeConstants.SELECT_TYPE);
				String strPolicy = (String)stateWithHoldInfoMap.get(ChangeConstants.SELECT_POLICY);
				strPolicy = strPolicy.replace(" ", "_");
				String stateKey = "emxFramework.State."+strPolicy+"." + strState;
				strState = EnoviaResourceBundle.getProperty(context, "Framework", stateKey, strLanguage);
				String isOnHold = (String)stateWithHoldInfoMap.get(ChangeConstants.SELECT_INTERFACE_CHANGE_ON_HOLD);
				String holdI18NValue = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Label.hold",strLanguage);

				if(isOnHold.equalsIgnoreCase("TRUE") && mxType.isOfParentType(context, strType, ChangeConstants.TYPE_CHANGE_ACTION)){
					returnStringList.add(strState + " [" +  holdI18NValue + "]");
				}
				else{
					returnStringList.add(strState);
				}
			}

			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}
	
	/**
	 * 
	 * 
	 * Method to render Change Action applicability in CO content view 
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */	
	@com.matrixone.apps.framework.ui.ProgramCallable
	@Deprecated
	public static StringList getCaApplicability(Context context,
			String[] args) throws FrameworkException {
		try {
			HashMap inputMap = (HashMap) JPO.unpackArgs(args);
			MapList objectMap = (MapList) inputMap.get("objectList");
			String strChangeActionId = EMPTY_STRING;
			StringList returnStringList = new StringList(objectMap.size());

			for (int i = 0; i < objectMap.size(); i++) {
				Map outerMap = new HashMap();
				String caApplicability = EMPTY_STRING;
				outerMap = (Map) objectMap.get(i);
				strChangeActionId = (String) outerMap.get(ChangeConstants.SELECT_ID);
				IChangeAction iCa = ChangeAction.getChangeAction(context, strChangeActionId);
				caApplicability = iCa.GetXSLTransformedApplicabilityExpression(context);
				returnStringList.add(caApplicability);
			}	

			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	@Deprecated
	public String getStateWithHoldInfoForForm(Context context,String[] args)throws Exception
	{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String changeActionId = (String) requestMap.get("objectId");
		String[] objIDArr = new String[]{changeActionId};
		StringList returnStringList = getStateWithHoldInfo(context, objIDArr);

		return (String)returnStringList.get(0);
	}

	/**
	 * Transfers the ownership for CA
	 * @param context - context (the Matrix <code>Context</code> object).
	 * @param args containing CA Object, reason for transfer etc
	 * @throws Exception if the operation fails
	 */
	@com.matrixone.apps.framework.ui.PostProcessCallable
	@Deprecated
	public void transferOwnerShipCASummary(Context context, String[] args)throws Exception {

		HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		String strObjectIds    = (String)paramMap.get("objectId");
		if(ChangeUtil.isNullOrEmpty(strObjectIds)){
			strObjectIds    = (String)paramMap.get("objectIds");
		}
		String sReason     = (String)paramMap.get("TransferReason");

		String newOwner       = (String)paramMap.get(ChangeConstants.NAME);
        String Organization   = (String) paramMap.get("Organization");
        String project        = (String) paramMap.get("Project");

		String objectId = "";
		StringTokenizer strIds = new StringTokenizer(strObjectIds,",");
		ChangeAction caObj = new ChangeAction();
		while(strIds.hasMoreTokens()){
			objectId = (String)strIds.nextToken();
			caObj.setId(objectId);
			caObj.transferOwnership(context, sReason,newOwner);
			caObj.setPrimaryOwnership(context, project, Organization);
		}
	}


    /**Method to transfer the ownership of CO from properties page
    *
    */
   @com.matrixone.apps.framework.ui.PostProcessCallable
   @Deprecated
   public void transferOwnership(Context context, String[] args) throws Exception {

       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       HashMap requestMap = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);

       String transferReason = (String)requestMap.get(ChangeConstants.TRANSFER_REASON);
       String objectId 		 = (String)requestMap.get(ChangeConstants.OBJECT_ID);
       String newOwner 		 = (String)requestMap.get(ChangeConstants.NAME);
       String Organization   = (String) requestMap.get("Organization");
       String project        = (String) requestMap.get("Project");
      // String []params 	     = {transferReason,newOwner};
       ChangeAction caObj = new ChangeAction();
       caObj.setId(objectId);
       caObj.transferOwnership(context, transferReason, newOwner);
       caObj.setPrimaryOwnership(context, project, Organization);

       //new ChangeOrder(objectId).transferOwnership(context, transferReason,newOwner);

   }
	/**
	 * Program to get Column(Reviewer) value For CA Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return        Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 
	public Vector showReviewerColumn(Context context, String args[])throws Exception
	{
		//XSSOK
		Vector columnVals = new Vector();
		try {
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil=new ChangeUtil();
			StringList strObjectIdList = changeUtil.getStringListFromMapList(objectList,DomainObject.SELECT_ID);

			String[] strArrObjIds = new String[strObjectIdList.size()];
			strArrObjIds = (String[])strObjectIdList.toArray(strArrObjIds);

			MapList objectTypeList = DomainObject.getInfo(context, strArrObjIds, new StringList(DomainObject.SELECT_TYPE));
			StringList strObjectTypeList = changeUtil.getStringListFromMapList(objectTypeList,DomainObject.SELECT_TYPE);

			if (strObjectIdList == null || strObjectIdList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector(strObjectIdList.size());
			}
			for(int i=0;i<strObjectIdList.size();i++){
				String 	strChangeActionId = (String) strObjectIdList.get(i);
				String 	strChangeType = (String) strObjectTypeList.get(i);
				if(mxType.isOfParentType(context, strChangeType, ChangeConstants.TYPE_CHANGE_ACTION)){
				columnVals.add(getReviewers(context, strChangeActionId));
			}
				else{
					columnVals.add("");
				}

			}
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	}//end of method
*/
	/**
  	 * Get Reviewers column value
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Reviewers Column.
  	 * @throws Exception if operation fails.
  	 
	public String getReviewers(Context context,String strChangeActionId)throws Exception
	{
		StringBuilder sb = new StringBuilder();
		StringList finalReviewersList=new StringList();
		String relPattern =  new StringBuffer(ChangeConstants.RELATIONSHIP_CHANGE_REVIEWER).append(",").append(ChangeConstants.RELATIONSHIP_OBJECT_ROUTE).toString();
		String typePattern =  new StringBuffer(ChangeConstants.TYPE_PERSON).append(",").append(ChangeConstants.TYPE_ROUTE_TEMPLATE).toString();
		StringList objectSelects=new StringList(DomainObject.SELECT_ID);
		objectSelects.add(DomainObject.SELECT_TYPE);
		StringList personReviewersList=new StringList();
		StringList routeTemplateReviewersList=new StringList();
		DomainObject changeAction = new DomainObject(strChangeActionId);
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
		String reviewers = DomainObject.EMPTY_STRING;
		String reviewerstype = DomainObject.EMPTY_STRING;
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
			sb.append("<input type=\"hidden\" name=\"ReviewersHidden\" id=\"ReviewersHidden\" value=\""+XSSUtil.encodeForHTMLAttribute(context, reviewers)+"\" readonly=\"readonly\" />");
			if (finalReviewersList!=null && !finalReviewersList.isEmpty()){
				for (int i=0;i<finalReviewersList.size();i++) {
				String  lastReviewerId=(String)finalReviewersList.get(finalReviewersList.size()-1);
					String reviewersId = (String) finalReviewersList.get(i);
					if (reviewersId!=null && !reviewersId.isEmpty()) {
						String reviewerName = new DomainObject(reviewersId).getInfo(context, DomainConstants.SELECT_NAME);
						if (reviewerName!=null && !reviewerName.isEmpty()) {
							sb.append("<input type=\"hidden\" name=\""+XSSUtil.encodeForHTMLAttribute(context, reviewerName)+"\" value=\""+XSSUtil.encodeForHTMLAttribute(context, reviewersId)+"\" />");
							sb.append(XSSUtil.encodeForHTML(context, reviewerName));
							if(!lastReviewerId.equalsIgnoreCase(reviewersId))
							sb.append("<br/>");
						}
					}
				}
			}
		return sb.toString();
	}*/
	/**
	 * Program to get Column(Contributor) value For CA Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return        Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 
	public Vector showContributorColumn(Context context, String args[])throws Exception
	{
		//XSSOK
		Vector columnVals = new Vector();
		try {
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil=new ChangeUtil();
			StringList strObjectIdList = changeUtil.getStringListFromMapList(objectList,DomainObject.SELECT_ID);

			String[] strArrObjIds = new String[strObjectIdList.size()];
			strArrObjIds = (String[])strObjectIdList.toArray(strArrObjIds);

			MapList objectTypeList = DomainObject.getInfo(context, strArrObjIds, new StringList(DomainObject.SELECT_TYPE));
			StringList strObjectTypeList = changeUtil.getStringListFromMapList(objectTypeList,DomainObject.SELECT_TYPE);

			if (strObjectIdList == null || strObjectIdList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector(strObjectIdList.size());
			}
			for(int i=0;i<strObjectIdList.size();i++){
				String 	strChangeActionId = (String) strObjectIdList.get(i);
				String strChangeType = (String) strObjectTypeList.get(i);

				if(mxType.isOfParentType(context, strChangeType, ChangeConstants.TYPE_CHANGE_ACTION)){
				columnVals.add(getContributors(context, strChangeActionId));
			}
				else{
					columnVals.add("");
				}
			}
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	}//end of method
*/
	/**
  	 * Get Contributor column value
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Reviewers Column.
  	 * @throws Exception if operation fails.
  	
	public String getContributors(Context context,String strChangeActionId)throws Exception
	{
		StringBuilder sb = new StringBuilder();
	//	StringList finalContributorList=new StringList();
		String relPattern =  new StringBuffer(ChangeConstants.RELATIONSHIP_CHANGE_REVIEWER).append(",").append(ChangeConstants.RELATIONSHIP_OBJECT_ROUTE).toString();
		String typePattern =  new StringBuffer(ChangeConstants.TYPE_PERSON).append(",").append(ChangeConstants.TYPE_ROUTE_TEMPLATE).toString();
		StringList objectSelects=new StringList(DomainObject.SELECT_ID);
		DomainObject changeAction = new DomainObject(strChangeActionId);
		IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeActionId);
		List contributorList=iChangeAction.GetContributors(context);
			sb.append("<input type=\"hidden\" name=\"ReviewersHidden\" id=\"ReviewersHidden\" value=\""+XSSUtil.encodeForHTMLAttribute(context, contributorList.toString())+"\" readonly=\"readonly\" />");
			if (contributorList!=null && !contributorList.isEmpty()){
				for (int i=0;i<contributorList.size();i++) {
				String  lastContributorName=(String)contributorList.get(contributorList.size()-1);
					String contributorName = (String) contributorList.get(i);
				//	if (contributorName!=null && !contributorName.isEmpty()) {
				//		String contributorName = new DomainObject(contributorId).getInfo(context, DomainConstants.SELECT_NAME);
						if (contributorName!=null && !contributorName.isEmpty()) {
						//	sb.append("<input type=\"hidden\" name=\""+XSSUtil.encodeForHTMLAttribute(context, contributorName)+"\" value=\""+XSSUtil.encodeForHTMLAttribute(context, contributorId)+"\" />");
							sb.append(XSSUtil.encodeForHTML(context, contributorName));
							if(!lastContributorName.equalsIgnoreCase(contributorName))
							sb.append("<br/>");
						}
					}
				}
			//}
		return sb.toString();
	}
 */

	/**
	 * To create the Change Action from Create Component
	 *
	 * @author
	 * @param context the eMatrix code context object
	 * @param args packed hashMap of request parameter
	 * @return Map contains change object id
	 * @throws Exception if the operation fails
	 * @Since ECM R418
	 */
	@com.matrixone.apps.framework.ui.CreateProcessCallable
	@Deprecated
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
			String[] app = { "ENOWCHA_TP"};
			ComponentsUtil.checkLicenseReserved(context, app);
			String newCAId = new ChangeAction().create(context);

			//to handle error :Unexpected publication status value null while promoting CO to Complete
            /*
			String strType=ChangeConstants.TYPE_CHANGE_ACTION;
			String strObjectGeneratorName = FrameworkUtil.getAliasForAdmin(context, DomainConstants.SELECT_TYPE, strType, true);
			String strAutoName = DomainObject.getAutoGeneratedName(context,strObjectGeneratorName, null);
			IChangeActionServices iCaServices = ChangeActionFactory.CreateChangeActionFactory();
			IChangeAction iCa=iCaServices.CreateChangeAction(context,strType, strAutoName, null);
			String newCAId =iCa.getCaBusinessObject().getObjectId(context);
            */

	    	ChangeAction changeAction = new ChangeAction(newCAId);
	    	changeAction.setAttributeValues(context, sAttritubeMap);
	    	changeAction.setDescription(context, sDescription);

	        returnMap.put(ChangeConstants.ID, newCAId);

	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new FrameworkException(e);
	    }

	    return returnMap;
	}

	private String getStringFromArr(String[] StringArr, int intArrIndex) {
		return (StringArr != null) ? (String)StringArr[intArrIndex] : EMPTY_STRING;
	}


	/**
     * this method performs the cancel process of change Action
     *
     * @param context
     *            the eMatrix <code>Context</code> object.
     * @param args
     *            holds the following input arguments: - The ObjectID of the
     *            Change Action
     * @throws Exception
     *             if the operation fails.
     * @since ECM R418.
     */

    @com.matrixone.apps.framework.ui.PostProcessCallable
	@Deprecated
    public void cancelChangeAction(Context context, String[] args) throws Exception

    {
        HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = ChangeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		String cancelReason  = ChangeUtil.isNullOrEmpty((String)paramMap.get("cancelReason"))? (String)requestMap.get("Reason") : (String)paramMap.get("cancelReason");



		ChangeAction changeAction = new ChangeAction(objectId);
		changeAction.cancelChangeAction(context,cancelReason);
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
     * @since ECM R418.
     */
    @com.matrixone.apps.framework.ui.PostProcessCallable
	@Deprecated
    public void holdChangeAction(Context context, String[] args)throws Exception {

        HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap)paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = ChangeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		String holdReason  = ChangeUtil.isNullOrEmpty((String)paramMap.get("holdReason"))? (String)requestMap.get("Reason") : (String)paramMap.get("holdReason");
		ChangeAction changeAction = new ChangeAction(objectId);
		changeAction.holdChangeAction(context,holdReason);
    }
	/**
	 * This method is used as access function for Governing CO editable field.
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
    public boolean isGoverningCOEditable(Context context,String []args) throws Exception {
    		
    	boolean flag = false;
    	
		if(!isConnectedToCR(context, args) && isConnectedToCO(context, args) && ChangeUtil.hasLicenseOfECM(context) ){    			
			flag = true;
    	}
    	
    	return flag;
    }
	/**
	 * This method is used as access function for Governing CO non editable field.
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isGoverningCONonEditable(Context context,String []args) throws Exception {

		boolean flag = false;
    	boolean isConnectedToCR = isConnectedToCR(context, args);
    	boolean isConnectedToCO = isConnectedToCO(context, args);
    	
		if(isConnectedToCR && isConnectedToCO){
			flag = true;
		}
    	
    	//IR-738837: To show Governing CO field to CSV user to avoid loss of information to CSV user
    	if(flag==false && (!isConnectedToCR && isConnectedToCO && !ChangeUtil.hasLicenseOfECM(context)))
		{
			flag = true;
		}
    	
    	return flag;		
	}
	
	@Deprecated
	public boolean isConnectedToCO(Context context,String []args) throws Exception {
		
		boolean flag = false;
		
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String mode   = (String)programMap.get("mode");
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String strRelChangeAction = PropertyUtil.getSchemaProperty(context, "relationship_ChangeAction");
		String strTypeChangeOrder = PropertyUtil.getSchemaProperty(context, "type_ChangeOrder");
		
		this.setId(strObjId);
		StringList isConnectedToCO = getInfoList(context, "to["+ strRelChangeAction +"].from.type.kindof["+ strTypeChangeOrder +"]");
		
		for(int i =0; i < isConnectedToCO.size(); i++) {
			
			String boolConnected = isConnectedToCO.get(i);
			if(!ChangeUtil.isNullOrEmpty(boolConnected) && "TRUE".equals(boolConnected)){
				flag = true;
				break;
			}
		}
		if("edit".equals(mode)) {
			flag = true;
		}
		
		return flag;
	}
	
	@Deprecated
	public boolean isConnectedToCR(Context context,String []args) throws Exception {
		
		boolean flag = false;
		
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String strRelChangeAction = PropertyUtil.getSchemaProperty(context, "relationship_ChangeImplementation");
		String strTypeChangeRequest = PropertyUtil.getSchemaProperty(context, "type_ChangeRequest");
		
		this.setId(strObjId);
		
		StringList isConnectedToCR = getInfoList(context, "to["+ strRelChangeAction +"].from.type.kindof["+ strTypeChangeRequest +"]");
		
		for(int i =0; i < isConnectedToCR.size(); i++) {
			
			String boolConnected = isConnectedToCR.get(i);
			if(!ChangeUtil.isNullOrEmpty(boolConnected) && "TRUE".equals(boolConnected)){    			
				flag = true;
				break;
			}
		}
		
		
		return flag;
	}
	
	/**
	 * This method is used as access function for editCA command .
	 * @param context
	 * @return True or False
	 * @throws Exception
	 * //Temporary made changes once modeler API is available then replace this for edit access
	 */
	@Deprecated
	public boolean isChangeActionEditable(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return  getAccess(context, "Edit", strObjId);	
		}
	/**
	 * This method is used as access function for Transfer ownership command .
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isChangeActionTransferable(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return  getAccess(context, "Transfer", strObjId);		
				}
	/**
	 * This method is used as access function for add/remove Team .
	 * @param context
	 * @param String Function name
	 * @param Change Action id
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isTeamEditable(Context context,String functionName,String objectID) throws Exception {
		return  getAccess(context, functionName, objectID);		
	}
	/**
	 * This method is used get the create Change Action access bit.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean hasCreateChangeActionAccess(Context context,String []args) throws Exception {
		IChangeActionServices iChangeActionServices = ChangeActionFactory.CreateChangeActionFactory();
		return  iChangeActionServices.isContextUserAllowedToCreateCA(context);
	}
	/**
	 * This method is used as access function for Cancel Change Action command.
	 * @param context
	 * @param String Function name
	 * @param Change Action id
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isCACancelable(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return   getAccess(context, "Cancel", strObjId);
	}
	
	/**
	 * This method is used as access function for Hold Change Action command.
	 * @param context
	 * @param String Function name
	 * @param Change Action id
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isCAHoldable(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return   getAccess(context, "Hold", strObjId);
	}
	
	/**
	 * This method is used as access function for Resume Change Action command.
	 * @param context
	 * @param String Function name
	 * @param Change Action id
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isCAResumable(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return   getAccess(context, "Resume", strObjId);
	}
	/**
	 * This method is used as access function for Add Referential command in Change Action context.
	 * @param context
	 * @param String args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean hasAddReferentialAccessOnCA(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return  getAccess(context, "AddReferential", strObjId);
	}
	/**
	 * This method is used as access function for Remove Referential command in Change Action context.
	 * @param context
	 * @param String args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean hasRemoveReferentialAccessOnCA(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		return getAccess(context, "DeleteReferential", strObjId);
	}
	/**
	 * This method is used as access function for Create Impact analysis command in Change Action context.
	 * @param context
	 * @param String args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean hasCreateImpactAnalysisAccess(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String objectType = new DomainObject(strObjId).getInfo(context, SELECT_TYPE);
		if(ChangeCommon.isKindOfChangeAction(context,objectType)){
			return  getAccess(context, "ImpactAnalysis", strObjId);
		}
		else return false;
	}
	/**
	 * This method is used as access function for Delete Impact analysis command in Change Action context.
	 * @param context
	 * @param String args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean hasDeleteImpactAnalysisAccess(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String objectType = new DomainObject(strObjId).getInfo(context, SELECT_TYPE);
		if(ChangeCommon.isKindOfChangeAction(context,objectType)){
			return  getAccess(context, "ImpactAnalysis", strObjId);
		}
		else return false;
	}
	
	/**
	 * This method is used as access function for various function.
	 * @param context
	 * @param String function name
	 * @param String Change Action id
	 * @return boolean
	 * @throws Exceptions
	 */
	@Deprecated
	public static  boolean getAccess(Context context,String  functionName,String CAid)throws Exception {
		boolean isAccessible = false;
		IChangeAction changeActionObj = ChangeAction.getChangeAction(context, CAid);
		HashMap<String, Boolean> accessMap = changeActionObj.getAccessMap(context);
		if(accessMap.containsKey(functionName))
			isAccessible =  accessMap.get(functionName);
		return isAccessible;
	}
    	/**
	 * To get the fullname for multi value 
	 * @author
	 * @param context
	 * @param args
	 * @return [FullName1 ,FullName2]
	 * @throws Exception
	 */
@Deprecated
public String getFullNameForMultiValue(Context context, String[] args) throws Exception {
 String[] adminUsers = {
  "SLMInstallerAdmin",
  "3DIndexAdminUser",
  "ENOVIA_CLOUD",
  "User Agent"
 };
    StringBuffer fullNameBuf = new StringBuffer();
 String fullName = "";
    String delimeter = null;
    boolean isMatrixSearch = false;
    if (isMatrixSearch) {
        delimeter = "|";
    } else {
        delimeter = SelectConstants.cSelectDelimiter;
    }

    List < String > lAdminUsers = Arrays.asList(adminUsers);
    //System.out.println("GETFULLNAMEMULTI: args[0]: " + args[0]);
    //System.out.println("GETFULLNAMEMULTI: args[1]: " + args[1]);


    //System.out.println("GETFULLNAMEMULTI: resultsLst: " + resultsLst);
    if (UIUtil.isNotNullAndNotEmpty(args[0])) {
        StringTokenizer strNameTokenizer = new StringTokenizer(args[0], delimeter);        
        while (strNameTokenizer.hasMoreTokens()) {
            String strUserName = (String) strNameTokenizer.nextToken();
            if (!lAdminUsers.contains(strUserName)) {
                fullName = PersonUtil.getFullName(context, strUserName);
                fullNameBuf.append(fullNameBuf.length() == 0 ? fullName : delimeter + fullName);
            }
        }     
 }
    return fullNameBuf.toString();
}
/**
	 * To get the fullname and user Name
	 * @author
	 * @param context
	 * @param args
	 * @return  [FullName|UserName]
	 * @throws Exception
	 */
@Deprecated
public String getFullNameAndUserName(Context context, String[] args) throws Exception {

    String[] adminUsers = {
        "SLMInstallerAdmin",
        "3DIndexAdminUser",
        "ENOVIA_CLOUD",
        "User Agent"
    };
    String fullName = "";
    String delimeter = null;
    boolean isMatrixSearch = false;
    if (isMatrixSearch) {
        delimeter = "|";
    } else {
        delimeter = SelectConstants.cSelectDelimiter;
    }
    String strPersonNameList = "";
    List < String > lAdminUsers = Arrays.asList(adminUsers);

    if (UIUtil.isNotNullAndNotEmpty(args[0])) {
  StringTokenizer strNameTokenizer = new StringTokenizer(args[0], delimeter);
  StringList strFullNameList = new StringList(strNameTokenizer.countTokens());
  StringList finalResult = new StringList();

  while (strNameTokenizer.hasMoreTokens()) {
   String strUserName = (String) strNameTokenizer.nextToken();
   if (!lAdminUsers.contains(strUserName)) {
    fullName = PersonUtil.getFullName(context, strUserName);
    finalResult.add(fullName + "|" + strUserName);
   }
  }
  strPersonNameList = ChangeUtil.convertingListToString(context, finalResult);
 }
 return strPersonNameList;
}

/**
 * only shows if CA is rejected / TODO :return all status correctly
 * @param context
 * @param args
 * @return
 * @throws Exception
 */
@Deprecated
public String getRejectionStatus(Context context, String[] args) throws Exception {
	
	String status = "None";
	String query = "from[Object Route].to[Route|attribute[Route Status] == 'Stopped'].to[Route Task].from.attribute[Approval Status].value";
	ArrayList<String> multiValueList = new ArrayList<String>();
	multiValueList.add(query);
	StringList select = new StringList();
	select.add(DomainConstants.SELECT_CURRENT);
	select.add(query);
	
	if (UIUtil.isNotNullAndNotEmpty(args[0])) {
		DomainObject caObject = new DomainObject(args[0]);
		Map check = caObject.getInfo(context, select, multiValueList, false);

		if(check.containsKey(query) && check.get(DomainConstants.SELECT_CURRENT).equals(ChangeConstants.STATE_CHANGE_ACTION_INAPPROVAL)){
			if( check.get(query) instanceof StringList ){
				if(((StringList)check.get(query)).contains("Reject")){
					status= "Reject";
				}
			}else{
				status= check.get(query).toString();
			}
		}
	}
	return status ;
}

}

