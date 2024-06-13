import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import javax.json.stream.JsonParsingException;

import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.common.MemberRelationship;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.common.SubtaskRelationship;
import com.matrixone.apps.common.TaskDateRollup;
import com.matrixone.apps.common.WorkCalendar;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.CacheUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.StringUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.ProjectSpace;
import com.matrixone.apps.program.Task;


import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Dataobject;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.ExpressionType;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Sort;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.SortType;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxbext.DataelementMapAdapter;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxbext.Sortdata;
import com.dassault_systemes.enovia.tskv2.ProjectSequence;

import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.State;
import matrix.util.MatrixException;
import matrix.util.StringList;
/**
 * @author
 *
 */
public class emxProgramObjectMigrationBase_mxJPO extends emxCommonMigration_mxJPO {

    private static final long serialVersionUID = -5029177381386073045L;
    final String IS_KINDOF_WORKSPACE_VAULT = "type.kindof[" + TYPE_PROJECT_VAULT + "]";
    final String IS_KINDOF_FINANCIAL_ITEM = "type.kindof[" + TYPE_FINANCIAL_ITEM + "]";
    final String IS_KINDOF_ISSUE = "type.kindof[" + ProgramCentralConstants.TYPE_ISSUE + "]";
    final String IS_KINDOF_PROJECT_SPACE = "type.kindof[" + TYPE_PROJECT_SPACE + "]";
    final String IS_KINDOF_TASK_MANAGEMENT = "type.kindof[" + TYPE_TASK_MANAGEMENT + "]";
    final String SELECT_DOCUMENT_ID = "from[" + DomainConstants.RELATIONSHIP_VAULTED_OBJECTS_REV2 + "].to.id" ;
    final String SELECT_TASK_DELIVERABLE_ID = "to[" + DomainConstants.RELATIONSHIP_TASK_DELIVERABLE + "].from.id" ;
    final static String SELECT_SUBTASK_IDS = "from[" + DomainConstants.RELATIONSHIP_SUBTASK + "].to.physicalid";
    final String SELECT_EXPERIMENT_PROJECT_CURRENT  = "to["+ ProgramCentralConstants.RELATIONSHIP_EXPERIMENT + "].from.current";
	final String RELATIONSHIP_CALENDAR_EVENT = PropertyUtil.getSchemaProperty("relationship_CalendarEvent");
    private boolean fromMQL = false;

     private static final String SELECT_OWNERSHIP = "ownership";
        private static final String SELECT_OWNERSHIP_ACCESS = "ownership.access";
        private static final String SELECT_KINDOF_PROJECT_SPACE = "type.kindof[Project Space]";
        private static final String KEY_PROJECT_MEMBER  = "Project Member";
        private static final String KEY_PROJECT_LEAD    = "Project Lead";


    /**
     * @param context
     * @param args
     * @throws Exception
     */
    public emxProgramObjectMigrationBase_mxJPO(Context context,
            String[] args) throws Exception {
        super(context, args);
    }

    @SuppressWarnings({ "unchecked", "deprecation" })
    @Override
    public void migrateObjects(Context context, StringList objectList) throws Exception
    {
        StringList mxObjectSelects = new StringList(4);
        mxObjectSelects.addElement(SELECT_ID);
        mxObjectSelects.addElement(SELECT_TYPE);
        mxObjectSelects.addElement(SELECT_NAME);
        mxObjectSelects.addElement(SELECT_REVISION);
        mxObjectSelects.addElement(SELECT_ORIGINATED);
        mxObjectSelects.addElement(SELECT_MODIFIED);
        mxObjectSelects.addElement(SELECT_VAULT);
        mxObjectSelects.addElement(SELECT_OWNER);
        mxObjectSelects.addElement(SELECT_POLICY);
        mxObjectSelects.addElement(SELECT_CURRENT);
        mxObjectSelects.addElement(SELECT_PERCENTCOMPLETE);
        mxObjectSelects.addElement(IS_KINDOF_WORKSPACE_VAULT);
        mxObjectSelects.addElement(IS_KINDOF_FINANCIAL_ITEM);
        mxObjectSelects.addElement(SELECT_ATTRIBUTE_DEFAULT_USER_ACCESS);
        mxObjectSelects.addElement(IS_KINDOF_ISSUE);
        mxObjectSelects.addElement(IS_KINDOF_PROJECT_SPACE);
        mxObjectSelects.addElement(IS_KINDOF_TASK_MANAGEMENT);
        mxObjectSelects.addElement(ProgramCentralConstants.SELECT_IS_DOCUMENTS);
        MapList issueList = new MapList();
        String SELECT_FOLDER_PROJECT_ID = "to[" + DomainConstants.RELATIONSHIP_PROJECT_VAULTS + "].from.id" ;
        String SELECT_PARENT_FOLDER_ID = "to[" + DomainConstants.RELATIONSHIP_SUB_VAULTS + "].from.id" ;
        mxObjectSelects.addElement(SELECT_TASK_DELIVERABLE_ID);
        mxObjectSelects.addElement(SELECT_FOLDER_PROJECT_ID);
        mxObjectSelects.addElement(SELECT_PARENT_FOLDER_ID);
        mxObjectSelects.addElement(SELECT_DOCUMENT_ID);
        mxObjectSelects.addElement(SELECT_ORGANIZATION);
        mxObjectSelects.addElement(SELECT_PROJECT);
        mxObjectSelects.add(SELECT_OWNERSHIP);
        mxObjectSelects.add(SELECT_OWNERSHIP_ACCESS);

        //added for migrateSequenceIdAndWBSId
        mxObjectSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
        mxObjectSelects.add(ProgramCentralConstants.SELECT_IS_PROJECT_TEMPLATE);
        mxObjectSelects.add(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
        mxObjectSelects.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
        mxObjectSelects.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);

        //Added for migrateGateMilestoneObjects
        mxObjectSelects.addElement(SELECT_CURRENT);
        mxObjectSelects.addElement(ProgramCentralConstants.SELECT_KINDOF_EXPERIMENT_PROJECT);
        mxObjectSelects.addElement(ProgramCentralConstants.SELECT_KINDOF_PROJECT_BASELINE);
        mxObjectSelects.addElement(ProgramCentralConstants.SELECT_IS_KINDOF_PROJECT_SNAPSHOT);
        mxObjectSelects.addElement(SELECT_EXPERIMENT_PROJECT_CURRENT);

		//Calendar migration : Multiple Recess
		String IS_WORK_CALENDAR     = "type.kindof["+ProgramCentralConstants.TYPE_WORK_CALENDAR+"]";
		mxObjectSelects.addElement(IS_WORK_CALENDAR);

        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);
        MapList objectInfoList = DomainObject.getInfo(context, oidsArray, mxObjectSelects);
        MapList financialItemList = new MapList();
        MapList workspaceVaultList = new MapList();
        MapList projectSpaceList = new MapList();
        MapList taskList = new MapList();
        MapList documentList = new MapList();
        MapList projectConceptList = new MapList();
        MapList projectTemplateList = new MapList();
        MapList nonCompleteProjectList = new MapList();
		MapList workCalendarList = new MapList();

        try{


            ContextUtil.pushContext(context);
            String cmd = "trigger off";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            Iterator objectInfoListIterator = objectInfoList.iterator();
            while (objectInfoListIterator.hasNext())
            {
                Map objectInfo = (Map)objectInfoListIterator.next();

                String isKindOfWorkspaceVault = (String)objectInfo.get(IS_KINDOF_WORKSPACE_VAULT);
                String isKindOfFinancialItem = (String)objectInfo.get(IS_KINDOF_FINANCIAL_ITEM);
                String isKindOfIssue = (String)objectInfo.get(IS_KINDOF_ISSUE);
                String isKindOfProjectSpace = (String)objectInfo.get(IS_KINDOF_PROJECT_SPACE);
                String isKindOfTaskManagement = (String)objectInfo.get(IS_KINDOF_TASK_MANAGEMENT);
                String isKindOfDocument = (String)objectInfo.get(ProgramCentralConstants.SELECT_IS_DOCUMENTS);
                String isKindOfProjectConcpet = (String)objectInfo.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
                String isKindOfProjectTemplate = (String)objectInfo.get(ProgramCentralConstants.SELECT_IS_PROJECT_TEMPLATE);

                //Added for migrateGateMilestoneObjects
                String isKindOfExperimentProject    = (String)objectInfo.get(ProgramCentralConstants.SELECT_KINDOF_EXPERIMENT_PROJECT);
                String isKindOfProjectBaseline      = (String)objectInfo.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_BASELINE);
                String isKindOfProjectSnapshot      = (String)objectInfo.get(ProgramCentralConstants.SELECT_IS_KINDOF_PROJECT_SNAPSHOT);
                String currentState = (String)objectInfo.get(SELECT_CURRENT);
                String parentState  = (String)objectInfo.get(SELECT_EXPERIMENT_PROJECT_CURRENT);


				String isKindOfWorkCalendar = (String)objectInfo.get(IS_WORK_CALENDAR);
				
                if("True".equalsIgnoreCase(isKindOfFinancialItem)){
                    financialItemList.add(objectInfo);
                }else if("True".equalsIgnoreCase(isKindOfWorkspaceVault)){
                    workspaceVaultList.add(objectInfo);
                }else if("True".equalsIgnoreCase(isKindOfIssue)){
                    issueList.add(objectInfo);
                }else if("True".equalsIgnoreCase(isKindOfProjectSpace)){
                    projectSpaceList.add(objectInfo);

                    //Added for migrateGateMilestoneObjects
                    if("True".equalsIgnoreCase(isKindOfProjectBaseline) || "True".equalsIgnoreCase(isKindOfProjectSnapshot)){
                        continue;
                    }else if("True".equalsIgnoreCase(isKindOfExperimentProject) && !ProgramCentralConstants.STATE_PROJECT_SPACE_COMPLETE.equals(parentState)){
                        nonCompleteProjectList.add(objectInfo);
                    }else if(!ProgramCentralConstants.STATE_PROJECT_SPACE_COMPLETE.equals(currentState) && "false".equalsIgnoreCase(isKindOfExperimentProject)){
                        nonCompleteProjectList.add(objectInfo);
                    }

                }else if("True".equalsIgnoreCase(isKindOfTaskManagement)){
                    taskList.add(objectInfo);
                }else if("True".equalsIgnoreCase(isKindOfDocument)){
                    documentList.add(objectInfo);
                }else if("True".equalsIgnoreCase(isKindOfProjectConcpet)){
                    projectConceptList.add(objectInfo);
                }else if("True".equalsIgnoreCase(isKindOfProjectTemplate)){
                    projectTemplateList.add(objectInfo);
				}else if("True".equalsIgnoreCase(isKindOfWorkCalendar)){
					workCalendarList.add(objectInfo);
                }
            }
            //migrateFinancialItemObjects(context, financialItemList);
            //migrateDefaultUserAccess(context, workspaceVaultList);
            //migrateIssueToReconnect(context, issueList);
            //migrateProjectToRestampProjectMember(context, projectSpaceList);
            //migrateProjectsDPJLeadersToMember(context, projectSpaceList);
            //migrateTaskDeliverableForOriginator(context, taskList);
            //migrateTaskToRestampAssignee(context, taskList);
            //migrateTaskDeliverableToReConnect(context, taskList);
            //migrateSpecificFolderForProjectOwnerAccess(context, projectSpaceList);
            //migrateDocumentObjectForUnlockingAlreadyLockedFile(context);
            //migrateReferenceDocOfIssuesToReConnect(context, issueList);
            //migrateDomainAccessChanges(context, projectSpaceList);
            //migrateProjectFolderObjectsToReconnect(context, workspaceVaultList);
            //migrateTaskInheritedFrom(context, taskList);
            //migrateGateAndMilestoneToModifyPercentComplete(context, taskList);
            //migrateDocumentToRemoveOwnership(context, documentList);
            //migrateProjectsMemberToLeaders(context, projectSpaceList);
            //migrateProjectsMemberToLeaders(context, projectSpaceList);

            MapList gateMilestoneMigrationObjectList = new MapList();
            gateMilestoneMigrationObjectList.addAll(nonCompleteProjectList);
            gateMilestoneMigrationObjectList.addAll(projectConceptList);
            gateMilestoneMigrationObjectList.addAll(projectTemplateList);
            //migrateGateMilestoneObjects(context, gateMilestoneMigrationObjectList);

            MapList seqIdMigrationObjectList = new MapList();
            seqIdMigrationObjectList.addAll(projectSpaceList);
            seqIdMigrationObjectList.addAll(projectConceptList);
            seqIdMigrationObjectList.addAll(projectTemplateList);
            migrateSequenceIdAndWBSId(context, seqIdMigrationObjectList);
            //validateSequenceIdAndWBSId(context, seqIdMigrationObjectList);
            //validateProjectSequenceAttribute(context, seqIdMigrationObjectList);
			//migrateWorkingTimes(context, workCalendarList);
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            String cmd = "trigger on";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            ContextUtil.popContext(context);
        }
    }

    private void migrateTaskInheritedFrom(Context context,MapList objectList)throws Exception
    {
        try{
            int size = objectList.size();
            String[] oidArray = new String[size];
            mqlLogRequiredInformationWriter("===================MIGRATION OF TASK INHERITEDFROM STARTED=====================================");
            for (int i=0;i<size;i++) {
                Map objMap = (Map) objectList.get(i);
                oidArray[i] = (String) objMap.get(DomainObject.SELECT_ID);
            }

            String SELECT_OBJECT_OWNERSHIP = "ownership.businessobject";

            StringList busSelect  = new StringList();
            busSelect.addElement(ProgramCentralConstants.SELECT_PARENT_TASK_IDS);
            busSelect.addElement(SELECT_OBJECT_OWNERSHIP);

            BusinessObjectWithSelectList bwsl = ProgramCentralUtil.getObjectWithSelectList(context, oidArray, busSelect);

            for(int i=0;i<size;i++){
                BusinessObjectWithSelect bws    = bwsl.getElement(i);
                String parentId                 = bws.getSelectData(ProgramCentralConstants.SELECT_PARENT_TASK_IDS);
                StringList ownershipObjList     = bws.getSelectDataList(SELECT_OBJECT_OWNERSHIP);

                if(ownershipObjList != null && ownershipObjList.size()>1){
                    for(int j=0;j<ownershipObjList.size();j++){
                        String ownershipObjId = (String)ownershipObjList.get(j);

                        if(!parentId.equals(ownershipObjId)){
                            DomainAccess.deleteObjectOwnership(context, oidArray[i], ownershipObjId, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                        }
                    }
                }
            }
            mqlLogRequiredInformationWriter("===================MIGRATION OF TASK INHERITEDFROM COMPLETED=====================================");

        }catch(Exception e){
            e.printStackTrace();
        }
    }

    /**
     * This method will change the type of object from "Financial Item" to "Budget"
     */
    private  void migrateFinancialItemObjects(Context context, MapList objectList) throws Exception
    {

        try{

            ContextUtil.pushContext(context);
            String cmd = "trigger off";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===================MIGRATION OF FINANCIAL ITEM STARTED=====================================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String objectType = (String)objectInfo.get(SELECT_TYPE);
                String objectId = (String)objectInfo.get(SELECT_ID);
                String objectName = (String)objectInfo.get(SELECT_NAME);
                String objectRevision = (String)objectInfo.get(SELECT_REVISION);
                String objectVault = (String)objectInfo.get(SELECT_VAULT);
                String objectPolicy = (String)objectInfo.get(SELECT_POLICY);

                if(TYPE_FINANCIAL_ITEM.equals(objectType)){
                    mqlLogRequiredInformationWriter("Changing the type of object " + objectId+" from "+objectType+" to "+ProgramCentralConstants.TYPE_BUDGET);
                    String mqlCommand = "modify bus $1 type $2";
                    MqlUtil.mqlCommand(context, mqlCommand, objectId, ProgramCentralConstants.TYPE_BUDGET);
                    // Add object to list of converted OIDs
                    loadMigratedOids(objectId);
                } else {
                    mqlLogRequiredInformationWriter("Skipping object <<" + objectId + ">>, NO MIGRATION NEEDED");

                    // Add object to list of unconverted OIDs
                    String comment = "Skipping object <<" + objectId + ">> NO MIGRATIION NEEDED";
                    writeUnconvertedOID(comment, objectId);
                }
            }
            mqlLogRequiredInformationWriter("===================MIGRATION OF FINANCIAL ITEM COMPLETED=====================================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            String cmd = "trigger on";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            ContextUtil.popContext(context);
        }
    }

    /**
     * This method will change the "Default User Access" attribute value from "None" to "Read"
     */
    private void migrateDefaultUserAccess(Context context, MapList objectList) throws Exception
    {

        try{

            ContextUtil.pushContext(context);
            String cmd = "trigger off";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===================MIGRATION FOR CHANGING DEFAULT USER ACCESS STARTED=====================================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String objectId = (String)objectInfo.get(SELECT_ID);
                String defaultUserAccess = (String)objectInfo.get(SELECT_ATTRIBUTE_DEFAULT_USER_ACCESS);

                if("None".equals(defaultUserAccess)){
                    mqlLogRequiredInformationWriter("Modify value of Attribute Default User Access for folder " + objectId);
                    defaultUserAccess = "Read";
                    DomainObject folderObj = DomainObject.newInstance(context, objectId);
                    folderObj.setAttributeValue(context, ATTRIBUTE_DEFAULT_USER_ACCESS, defaultUserAccess);
                    // Add object to list of converted OIDs
                    loadMigratedOids(objectId);
                }else{
                    mqlLogRequiredInformationWriter("Skipping object <<" + objectId + ">>, NO MIGRATION NEEDED");

                    // Add object to list of unconverted OIDs
                    String comment = "Skipping object <<" + objectId + ">> NO MIGRATIION NEEDED";
                    writeUnconvertedOID(comment, objectId);
                }
            }
            mqlLogRequiredInformationWriter("===================MIGRATION FOR CHANGING DEFAULT USER ACCESS COMPLETED=====================================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            String cmd = "trigger on";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            ContextUtil.popContext(context);
        }
    }
    /**
     * This method will restamp the users who have project member access on project"
     */
    private void migrateIssueToReconnect(Context context, MapList objectList) throws Exception {

        try{
            String RELATIONSHIP_ISSUE = PropertyUtil.getSchemaProperty("relationship_Issue" );
            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            String accessBits = "all";
            mqlLogRequiredInformationWriter("===================MIGRATION FOR RECONNECTING ISSUE STARTED========================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String issueId = (String)objectInfo.get(SELECT_ID);
                DomainObject issueObj = DomainObject.newInstance(context, issueId);
                StringList busSelect = new StringList(ProgramCentralConstants.SELECT_ID);
                StringList relSelect = new StringList(DomainRelationship.SELECT_ID);

                MapList issueInfoList = issueObj.getRelatedObjects(context,
                        RELATIONSHIP_ISSUE,
                        QUERY_WILDCARD,
                        false,
                        true,
                        1,
                        busSelect,
                        relSelect,
                        "",
                        null,
                        0,
                        null,
                        null,
                        null);

                Iterator issueInfoListIterator = issueInfoList.iterator();
                StringList parentIdsToAdd =  new StringList();

                while(issueInfoListIterator.hasNext()){
                    Map issueInfoMap = (Map)issueInfoListIterator.next();
                    String parentId =(String) issueInfoMap.get(ProgramCentralConstants.SELECT_ID);
                    parentIdsToAdd.add(parentId);
                    String connectionIdToDelete = (String) issueInfoMap.get("id[connection]");
                    //String select = "del connection "+connectionIdToDelete+"";
                    //String relId = MqlUtil.mqlCommand(context, select, true);
                    MqlUtil.mqlCommand(context, "del connection $1",connectionIdToDelete);
                    String sResult = MqlUtil.mqlCommand(context,"print bus $1 select $2 dump",issueId,"access["+parentId+"|Inherited Access]");
                    if("TRUE".equalsIgnoreCase(sResult)){
                        /*String command = "modify bus " + issueId + " remove access bus " + parentId + " for 'Inherited Access' as " +  accessBits;
                        MqlUtil.mqlCommand(context, command);*/
                        MqlUtil.mqlCommand(context,"modify bus $1 remove access bus $2 for $3 as $4",issueId, parentId,"'Inherited Access'", accessBits);
                    }
                }

                //Reconnecting disconnected Issues...
                String cmd = "trigger on";
                MqlUtil.mqlCommand(context, mqlCommand,  cmd);

                for(int i=0 ; i< parentIdsToAdd.size();i++){
                    String pObjectId = (String) parentIdsToAdd.get(i);
                    DomainObject domParent = DomainObject.newInstance(context,pObjectId);
                    DomainRelationship domRel = DomainRelationship.connect(context,
                    issueObj,
                    RELATIONSHIP_ISSUE,
                    domParent);
                }

                String cmd2 = "trigger off";
                MqlUtil.mqlCommand(context, mqlCommand,  cmd2);
                // Add object to list of converted OIDs
                loadMigratedOids(issueId);
            }
            mqlLogRequiredInformationWriter("==================MIGRATION FOR RECONNECTING ISSUE COMPLETED=========================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }
    /**
     * This method will restamp the users who have project member access on project"
     */
    private void migrateProjectToRestampProjectMember(Context context, MapList objectList) throws Exception
    {

        try{

            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("================MIGRATION FOR RESTAMPING THE PROJCET MEMBER STARTED===================");
            String cmd = "trigger on";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String projectId = (String)objectInfo.get(SELECT_ID);
                String objectName = (String)objectInfo.get(SELECT_NAME);

                DomainObject projectObj = DomainObject.newInstance(context, projectId);
                StringList busSelect = new StringList(ProgramCentralConstants.SELECT_NAME);
                busSelect.add("from["+ProgramCentralConstants.RELATIONSHIP_MEMBER+"].to.name");
                busSelect.add(SELECT_CURRENT);

                StringList relSelect = new StringList(ProgramCentralConstants.SELECT_ID);
                relSelect.add(MemberRelationship.SELECT_PROJECT_ACCESS);
                relSelect.add(MemberRelationship.SELECT_PROJECT_ROLE);

                MapList projectInfoList = projectObj.getRelatedObjects(context,
                        ProgramCentralConstants.RELATIONSHIP_MEMBER,
                        ProgramCentralConstants.TYPE_PERSON,
                        false,
                        true,
                        1,
                        busSelect,
                        relSelect,
                        "",
                        null,
                        0,
                        null,
                        null,
                        null);

                Iterator projectInfoListIterator = projectInfoList.iterator();
                StringList personIDstoAdd =  new StringList();
                StringList membersRestamped = new StringList();
                Map roleList = new HashMap();
                while(projectInfoListIterator.hasNext()){
                    Map projectInfoMap = (Map)projectInfoListIterator.next();
                    String accessOnProject = (String) projectInfoMap.get("attribute[Project Access].value");
                    String roleOnProject = (String) projectInfoMap.get("attribute[Project Role].value");
                    //If access is project member then delete connection
                    if("Project Member".equalsIgnoreCase(accessOnProject)){
                        String personName = (String) projectInfoMap.get(ProgramCentralConstants.SELECT_NAME);
                        String personId = PersonUtil.getPersonObjectID(context, personName);
                        String personState = (String) projectInfoMap.get(SELECT_CURRENT);
                        if(personState.equalsIgnoreCase("Inactive")){
                            continue;
                        }
                        ContextUtil.pushContext(context, personName ,DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING);
                        //String accessBits = MqlUtil.mqlCommand(context, "print bus "+projectId+" select current.access dump", false);
                        String accessBits = MqlUtil.mqlCommand(context,"print bus $1 select $2 dump", false,projectId,"current.access");
                        ContextUtil.popContext(context);
                        if(accessBits.contains("delete")){
                            continue;
                        }
                        membersRestamped.add(personName);
                        personIDstoAdd.add(personId);
                        roleList.put(personId, roleOnProject);
                        String connectionIdToDelete = (String) projectInfoMap.get("id[connection]");
                        //String relId = MqlUtil.mqlCommand(context, select, true);
                        MqlUtil.mqlCommand(context,"del connection $1",true, connectionIdToDelete);
                    }
                }
                //restamping deleted connections..
                for(int i=0 ; i< personIDstoAdd.size();i++){
                    String personId = (String) personIDstoAdd.get(i);
                    DomainObject domPerson = DomainObject.newInstance(context,personId);
                    DomainRelationship domRel = DomainRelationship.connect(context, projectObj,  DomainConstants.RELATIONSHIP_MEMBER, domPerson);
                    domRel.setAttributeValue(context,DomainConstants.ATTRIBUTE_PROJECT_ACCESS,"Project Member");
                    domRel.setAttributeValue(context,DomainConstants.ATTRIBUTE_PROJECT_ROLE,(String)roleList.get(personId));

                }
                if(membersRestamped.size()>0){
                    System.out.println("Member Restamping in project "+ objectName + " Completed");
                    System.out.println("Restamped Members : "+membersRestamped);
                }
            }
            String cmd2 = "trigger off";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd2);
            mqlLogRequiredInformationWriter("=================MIGRATION FOR RESTAMPING THE PROJCET MEMBER COMPLETED======================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }

    /**
     * This method converts access of DPJ members from Project Lead to project member on all projects"
     */
    private void migrateProjectsDPJLeadersToMember(Context context, MapList objectList) throws Exception
    {

        try{

            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===============MIGRATION FOR TRANSLATION OF DPJ LEAD TO PROJCET MEMBER STARTED===================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String projectSpaceId = (String)objectInfo.get(SELECT_ID);
                String objectName = (String)objectInfo.get(SELECT_NAME);

                DomainObject projectspace = DomainObject.newInstance(context, projectSpaceId);
                StringList busSelect = new StringList(ProgramCentralConstants.SELECT_NAME);
                busSelect.add("from["+ProgramCentralConstants.RELATIONSHIP_MEMBER+"].to.name");
                busSelect.add(SELECT_CURRENT);

                StringList relSelect = new StringList(ProgramCentralConstants.SELECT_ID);
                relSelect.add(MemberRelationship.SELECT_PROJECT_ACCESS);
                relSelect.add(MemberRelationship.SELECT_PROJECT_ROLE);

                MapList projectInfoList = projectspace.getRelatedObjects(context,
                        ProgramCentralConstants.RELATIONSHIP_MEMBER,
                        ProgramCentralConstants.TYPE_PERSON,
                        false,
                        true,
                        1,
                        busSelect,
                        relSelect,
                        "",
                        null,
                        0,
                        null,
                        null,
                        null);


                Iterator projectInfoListIterator = projectInfoList.iterator();
                StringList personNamesToAdd =  new StringList();
                Map roleList = new HashMap();
                while(projectInfoListIterator.hasNext()){

                    Map projectInfoMap = (Map)projectInfoListIterator.next();
                    String accessOnProject = (String) projectInfoMap.get("attribute[Project Access].value");
                    String roleOnProject = (String) projectInfoMap.get("attribute[Project Role].value");
                    String personState = (String) projectInfoMap.get(SELECT_CURRENT);
                    if(personState.equalsIgnoreCase("Inactive")){
                        continue;
                    }
                    boolean isProjectLead = false;
                    //If access is project member then delete connection
                    if("Project Owner".equalsIgnoreCase(accessOnProject)){
                        continue;
                    }
                    String user  = (String)projectInfoMap.get(ProgramCentralConstants.SELECT_NAME);

                    ContextUtil.pushContext(context, user ,DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING);
                    //String accessBits = MqlUtil.mqlCommand(context, "print bus "+projectSpaceId+" select current.access dump", false);
                    String accessBits = MqlUtil.mqlCommand(context,"print bus $1 select $2 dump",false, projectSpaceId, "current.access");
                    ContextUtil.popContext(context);
                    if(accessBits.contains("delete")){
                        isProjectLead = true;
                    }

                    String mqlQuery = "print person $1 select $2 dump $3";
                    List<String> mqlParameterList = new ArrayList<String>();
                    mqlParameterList.add(user);
                    mqlParameterList.add("product");
                    mqlParameterList.add("|");

                    String[] queryParameterArray = new String[mqlParameterList.size()];
                    mqlParameterList.toArray(queryParameterArray);

                    String productNameList = MqlUtil.mqlCommand(context, true, true, mqlQuery, true,queryParameterArray);
                    StringList assignProductList = FrameworkUtil.split(productNameList, "|");
/*
                    if(assignProductList.contains(ProgramCentralConstants.DPJ_LICENSE) && !assignProductList.contains(ProgramCentralConstants.DPM_LICENSE) && isProjectLead){

                        String personId = PersonUtil.getPersonObjectID(context,user);
                        roleList.put(personId, roleOnProject);
                        System.out.println("Access of user "+ user +" is changed from Project Lead to Project Member on Project "+ objectName);
                        String user_PRJ = user+"_PRJ";

                        DomainAccess.createObjectOwnership(context, projectSpaceId, "", user_PRJ, "Project Member", "Multiple Ownership For Object", true);

                        String select = "print bus "+ projectSpaceId +" select from["+ DomainConstants.RELATIONSHIP_MEMBER +"|to.id==" + personId +"].id dump";
                        String relId = MqlUtil.mqlCommand(context, select, true);
                        DomainRelationship relOBj = new DomainRelationship(relId);
                        relOBj.setAttributeValue(context,DomainConstants.ATTRIBUTE_PROJECT_ACCESS,"Project Member");
                        relOBj.setAttributeValue(context,DomainConstants.ATTRIBUTE_PROJECT_ROLE,(String)roleList.get(personId));

                    }*/
                }
            }
            mqlLogRequiredInformationWriter("================MIGRATION FOR TRANSLATION OF DPJ LEAD TO PROJCET MEMBER COMPLETED=====================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }

    /**
     * This method will set Deliverable Owner as the originator for Task Deliverable"
     */
    private void migrateTaskDeliverableForOriginator(Context context, MapList objectList) throws Exception {

        try{
            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===============MIGRATION FOR TASK DELIVERABLE TO SET ORIGINATOR STARTED===================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String taskId = (String)objectInfo.get(SELECT_ID);

                DomainObject taskObj = DomainObject.newInstance(context, taskId);

                StringList busSelect = new StringList();
                busSelect.add(ProgramCentralConstants.SELECT_ID);
                busSelect.add("owner");

                StringList relSelect = new StringList();

                MapList DeliverableInfoList = taskObj.getRelatedObjects(context,
                        ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE,
                        ProgramCentralConstants.QUERY_WILDCARD,
                        false,
                        true,
                        1,
                        busSelect,
                        relSelect,
                        "",
                        null,
                        0,
                        null,
                        null,
                        null);

                Iterator deliverableInfoListIterator = DeliverableInfoList.iterator();
                while(deliverableInfoListIterator.hasNext()){

                    Map deliverableInfoMap = (Map)deliverableInfoListIterator.next();
                    String deliverableId = (String) deliverableInfoMap.get(ProgramCentralConstants.SELECT_ID);
                    String strUser = (String)deliverableInfoMap.get("owner");

                    DomainObject devObject = new DomainObject();

                    devObject.setId(deliverableId);
                    devObject.setAttributeValue(context, ATTRIBUTE_ORIGINATOR, strUser);
                    loadMigratedOids(deliverableId);

                }
            }
            mqlLogRequiredInformationWriter("================MIGRATION FOR TASK DELIVERABLE TO SET ORIGINATOR END=====================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }
    /**
     * This method restamps the task assignee on task to reflect access bit changes from DomainAccess.xml
     */
    private void migrateTaskToRestampAssignee(Context context, MapList objectList) throws Exception
    {
        try{
            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===============MIGRATION FOR RE-STAMPING TASK ASSIGNEES STARTED===================");

            final String SELECT_PARENTOBJECT_KINDOF_EXPERIMENT_PROJECT = ProgramCentralConstants.SELECT_PROJECT_TYPE+".kindof["+ProgramCentralConstants.TYPE_EXPERIMENT+"]";
            final String SELECT_PARENTOBJECT_KINDOF_PROJECT_TEMPLATE = ProgramCentralConstants.SELECT_PROJECT_TYPE+".kindof["+DomainObject.TYPE_PROJECT_TEMPLATE+"]";
            final String SELECT_PARENTOBJECT_KINDOF_PROJECT_CONCEPT = ProgramCentralConstants.SELECT_PROJECT_TYPE+".kindof["+DomainObject.TYPE_PROJECT_CONCEPT+"]";
            com.matrixone.apps.program.Task task = (com.matrixone.apps.program.Task) DomainObject.newInstance(context, DomainConstants.TYPE_TASK, "PROGRAM");

            StringList objectSelects = new StringList(3);
            objectSelects.add(SELECT_PARENTOBJECT_KINDOF_EXPERIMENT_PROJECT);
            objectSelects.add(SELECT_PARENTOBJECT_KINDOF_PROJECT_TEMPLATE);
            objectSelects.add(SELECT_PARENTOBJECT_KINDOF_PROJECT_CONCEPT);

            while(objectListIterator.hasNext()) {

                Map objectInfo = (Map)objectListIterator.next();
                String taskId = (String)objectInfo.get(SELECT_ID);
                String taskName = (String)objectInfo.get(SELECT_NAME);

                task.setId(taskId);
                Map taskInfo = task.getInfo(context, objectSelects);

                String isKindOfProjectExperiment = (String) taskInfo.get(SELECT_PARENTOBJECT_KINDOF_EXPERIMENT_PROJECT);
                String isKindOfProjectTemplate = (String) taskInfo.get(SELECT_PARENTOBJECT_KINDOF_PROJECT_TEMPLATE);
                String isKindOfProjectConcept = (String) taskInfo.get(SELECT_PARENTOBJECT_KINDOF_PROJECT_CONCEPT);

                if("True".equalsIgnoreCase(isKindOfProjectExperiment) || "True".equalsIgnoreCase(isKindOfProjectTemplate) || "True".equalsIgnoreCase(isKindOfProjectConcept)){
                    continue;
                }
                // Get list of the persons who have ownership on this task
                MapList ownershipMap = DomainAccess.getAccessSummaryList(context, taskId);
                Iterator itr = ownershipMap.iterator();

                while(itr.hasNext()){

                    Map taskMemberInfo = (Map) itr.next();

                    String accessOnTask = (String) taskMemberInfo.get("access");
                    String project = (String) taskMemberInfo.get(SELECT_NAME);
                    String isOwner = (String) taskMemberInfo.get("disableSelection");
                    Boolean isOktoInherit = false;

                    if(project.endsWith("_PRJ")){

                        String personName = project.substring(0, project.indexOf("_PRJ"));

                        String personId = PersonUtil.getPersonObjectID(context, personName);
                        Person person = new Person(personId);
                        State strState = person.getCurrentState(context);
                        String personState = strState.getName();

                        if("Inactive".equalsIgnoreCase(personState)){
                            continue;
                        }
                        isOktoInherit =true;
                    }

                    if("Project Member".equalsIgnoreCase(accessOnTask) || "All".equalsIgnoreCase(accessOnTask)|| "True".equalsIgnoreCase(isOwner)){
                        continue;
                    }
                    if(isOktoInherit){

                        //create ownership on task for the user on that task
                        DomainAccess.createObjectOwnership(context, taskId, null, project, "Project Lead", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, true);
                    }
                }
                System.out.println("Restamping the assignees of the Task -  : "+ taskName +"  is DONE");
            }
            mqlLogRequiredInformationWriter("===============MIGRATION FOR RE-STAMPING TASK ASSIGNEES COMPLETED====================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }

        /**
     * This method will re-connect the Task Deliverables to tasks to create ownership & remove Inherited access"
     */
    private void migrateTaskDeliverableToReConnect(Context context, MapList objectList) throws Exception {

        try{
            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            String accessBits = "all";
            mqlLogRequiredInformationWriter("===================MIGRATION FOR RECONNECTING TASK DELIVERABLE STARTED========================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String taskId = (String)objectInfo.get(SELECT_ID);
                DomainObject taskObj = DomainObject.newInstance(context, taskId);
                StringList busSelect = new StringList(ProgramCentralConstants.SELECT_ID);
                StringList relSelect = new StringList(DomainRelationship.SELECT_ID);

                MapList deliverableInfoList = taskObj.getRelatedObjects(context,
                        ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE,
                        ProgramCentralConstants.QUERY_WILDCARD,
                        false,
                        true,
                        1,
                        busSelect,
                        relSelect,
                        "",
                        null,
                        0,
                        null,
                        null,
                        null);


                Iterator deliverableInfoListIterator = deliverableInfoList.iterator();
                StringList childIdsToAdd =  new StringList();

                while(deliverableInfoListIterator.hasNext()){
                    Map deliverableInfoMap = (Map)deliverableInfoListIterator.next();
                    String deliverableId =(String) deliverableInfoMap.get(ProgramCentralConstants.SELECT_ID);
                    childIdsToAdd.add(deliverableId);
                    String connectionIdToDelete = (String) deliverableInfoMap.get("id[connection]");
                    //String select = "del connection "+connectionIdToDelete+"";
                    //String relId = MqlUtil.mqlCommand(context, select, true);
                    MqlUtil.mqlCommand(context,"del connection $1 ", true, connectionIdToDelete);
                    String sResult = MqlUtil.mqlCommand(context,"print bus $1 select $2 dump",deliverableId,"access["+taskId+"|Inherited Access]");
                    if("TRUE".equalsIgnoreCase(sResult)){
                        //String command = "modify bus " + deliverableId + " remove access bus " + taskId + " for 'Inherited Access' as " +  accessBits;
                        //MqlUtil.mqlCommand(context, command);
                        MqlUtil.mqlCommand(context,"modify bus $1 remove access bus $2 for $3 as $4", deliverableId, taskId, "'Inherited Access'", accessBits);
                    }
                }

                //Reconnecting disconnected Task Deliverables...
                for(int i=0 ; i< childIdsToAdd.size();i++){
                    String cObjectId = (String) childIdsToAdd.get(i);
                    DomainObject domChild = DomainObject.newInstance(context,cObjectId);
                    DomainRelationship domRel = DomainRelationship.connect(context, taskObj,  ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE, domChild);
                    DomainAccess.createObjectOwnership(context, cObjectId, taskId, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                }
                // Add object to list of converted OIDs(taskIds)
                loadMigratedOids(taskId);
            }
            mqlLogRequiredInformationWriter("==================MIGRATION FOR RECONNECTING TASK DELIVERABLE COMPLETED=========================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }

    /**
     * This method will set access of the Project Owner on Specific Folder to "Full"
     */
    private void migrateSpecificFolderForProjectOwnerAccess(Context context, MapList objectList) throws Exception
    {
        try{
            ProgramCentralUtil.pushUserContext(context);
            Iterator objectListIterator = objectList.iterator();
            String access = "Full";
            mqlLogRequiredInformationWriter("===================MIGRATION FOR SETTING PROJECT OWNER ACESS TO FULL STARTED========================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String projectId = (String)objectInfo.get(SELECT_ID);
                DomainObject projectObj = DomainObject.newInstance(context, projectId);
                String owner = projectObj.getInfo(context, SELECT_OWNER);
                String ownerID = PersonUtil.getPersonObjectID(context, owner);
                String projectName = projectObj.getInfo(context, SELECT_NAME);


                StringList busSelect = new StringList(ProgramCentralConstants.SELECT_ID);
                StringList relSelect = new StringList();
                String whereClause = "attribute["+ProgramCentralConstants.ATTRIBUTE_ACCESS_TYPE+"] == Specific && owner != \""+owner+"\"" ;

                MapList folderInfoList = projectObj.getRelatedObjects(context,
                        "Data Vaults,Sub Vaults", //pattern to match relationships
                        ProgramCentralConstants.QUERY_WILDCARD, //pattern to match types
                        busSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                        relSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                        false, //get To relationships
                        true, //get From relationships
                        (short)0, //the number of levels to expand, 0 equals expand all.
                        whereClause, //where clause to apply to objects, can be empty ""
                        "", //where clause to apply to relationship, can be empty ""
                        0);

                Iterator folderInfoListIterator = folderInfoList.iterator();

                mqlLogRequiredInformationWriter("Migrating for project: "+ projectName);

                while(folderInfoListIterator.hasNext()){
                    Map folderInfo = (Map)folderInfoListIterator.next();
                    String folderId = (String)folderInfo.get(ProgramCentralConstants.SELECT_ID);
                    DomainAccess.createObjectOwnership(context,folderId, ownerID,access,DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                }
            }
            mqlLogRequiredInformationWriter("==================MIGRATION FOR SETTING PROJECT OWNER ACESS TO FULL STARTED=========================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ProgramCentralUtil.popUserContext(context);
        }
    }

    /**
     * This method will unlock the previously locked document files which can't be unlocked from UI
     */
    private void migrateDocumentObjectForUnlockingAlreadyLockedFile(Context context) throws Exception
    {
        try{
            ProgramCentralUtil.pushUserContext(context);
            mqlLogRequiredInformationWriter("===================MIGRATION FOR UNLOCKING PREVIOUSLY OLDER REVISION LOCKED DOCUMENT STARTED========================");
            String typePattern = "DOCUMENTS,DOCUMENT CLASSIFICATION";
            StringList slRelSelects  = new StringList();
            StringList selectList = new StringList(3);
            selectList.add(DomainConstants.SELECT_ID);
            selectList.add(DomainConstants.SELECT_NAME);
            selectList.add(CommonDocument.SELECT_LAST_ID);

            String strWhere ="locked==TRUE";
            ContextUtil.startTransaction(context, true);
            MapList documentInfoList = DomainObject.findObjects(context,typePattern, DomainConstants.QUERY_WILDCARD, strWhere, selectList);
            DomainObject docObj = DomainObject.newInstance(context, DomainConstants.TYPE_DOCUMENT);
            int totalLockedDoc = documentInfoList.size();
            int totalUnlockedDoc = 0;
            for (int i =0 ;i< totalLockedDoc ; i++){
                Map infoMap = (Map)documentInfoList.get(i);
                String lastId = (String) infoMap.get(CommonDocument.SELECT_LAST_ID);
                String id = (String) infoMap.get(CommonDocument.SELECT_ID);
                String name = (String) infoMap.get(CommonDocument.SELECT_NAME);
                if(!lastId.equals(id)){
                    docObj.setId(id);
                    mqlLogRequiredInformationWriter("Unlocking Document: "+ name+" ID:"+id);
                    docObj.unlock(context);
                    loadMigratedOids(id);
                    totalUnlockedDoc++;
                }else{
                    writeUnconvertedOID(id);
                }
            }
            ContextUtil.commitTransaction(context);
            mqlLogRequiredInformationWriter(totalUnlockedDoc+" Objects unlocked out of "+totalLockedDoc);
            mqlLogRequiredInformationWriter("==================MIGRATION FOR UNLOCKING PREVIOUSLY OLDER REVISION LOCKED DOCUMENT ENDED=========================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ProgramCentralUtil.popUserContext(context);
        }
    }

    /**
     * This script, removes the inherited access and creates ownership on all reference documents connected to the issues.
     * @param context
     * @param objectList
     * @throws Exception
     */
    private void migrateReferenceDocOfIssuesToReConnect(Context context, MapList objectList) throws Exception {

        try{
            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            String accessBits = "all";
            mqlLogRequiredInformationWriter("===================MIGRATION FOR REFERENCE DOCUMENT OF ISSUES IS STARTED========================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String issueId = (String)objectInfo.get(SELECT_ID);
                DomainObject issueObj = DomainObject.newInstance(context, issueId);
                StringList busSelect = new StringList(ProgramCentralConstants.SELECT_ID);
                StringList relSelect = new StringList(DomainRelationship.SELECT_ID);

                MapList docInfoList = issueObj.getRelatedObjects(context,
                        ProgramCentralConstants.RELATIONSHIP_REFERENCE_DOCUMENT,
                        ProgramCentralConstants.QUERY_WILDCARD,
                        false,
                        true,
                        1,
                        busSelect,
                        relSelect,
                        "",
                        null,
                        0,
                        null,
                        null,
                        null);


                Iterator docInfoListIterator = docInfoList.iterator();
                StringList childIdsToAdd =  new StringList();

                while(docInfoListIterator.hasNext()){
                    Map docInfoMap = (Map)docInfoListIterator.next();
                    String docId =(String) docInfoMap.get(ProgramCentralConstants.SELECT_ID);
                    childIdsToAdd.add(docId);
                    String connectionIdToDelete = (String) docInfoMap.get("id[connection]");
                    /*String select = "del connection "+connectionIdToDelete+"";
                    String relId = MqlUtil.mqlCommand(context, select, true);*/
                    MqlUtil.mqlCommand(context,"del connection $1",true, connectionIdToDelete);
                    String sResult = MqlUtil.mqlCommand(context,"print bus $1 select $2 dump",docId,"access["+issueId+"|Inherited Access]");
                    if("TRUE".equalsIgnoreCase(sResult)){
                        /*String command = "modify bus " + docId + " remove access bus " + issueId + " for 'Inherited Access' as " +  accessBits;
                        MqlUtil.mqlCommand(context, command);*/
                        MqlUtil.mqlCommand(context,"modify bus $1 remove access bus $2 for $3 as $4", docId, issueId,"'Inherited Access'", accessBits);
                    }
                }

                //Reconnecting disconnected Reference documents...
                String cmd = "trigger on";
                MqlUtil.mqlCommand(context, cmd);
                for(int i=0 ; i< childIdsToAdd.size();i++){
                    String cObjectId = EMPTY_STRING;
                    try{
                    cObjectId = (String) childIdsToAdd.get(i);
                    DomainObject domChild = DomainObject.newInstance(context,cObjectId);
                    DomainRelationship domRel = DomainRelationship.connect(context, issueObj,  ProgramCentralConstants.RELATIONSHIP_REFERENCE_DOCUMENT, domChild);
                    // Add object to list of converted OIDs(documentId)
                    loadMigratedOids(cObjectId);
                    }catch(Exception e){
                        // Add object to list of unconverted OIDs(IssueId & documentId)
                        writeUnconvertedOID("UnConverted IssueId : " + issueId+" & Document Id : "+cObjectId);
                        mqlLogRequiredInformationWriter("UnConverted IssueId : " + issueId+" & Document Id : "+cObjectId);
                        e.printStackTrace();
                    }
                }
                String cmd2 = "trigger off";
                MqlUtil.mqlCommand(context,cmd2);
            }
            mqlLogRequiredInformationWriter("==================MIGRATION FOR REFERENCE DOCUMENT OF ISSUES IS COMPLETED=========================");
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }

    /**
     * This method will set access of the Folder Owner on Specific Folder to "Full" Earlier it was "Add Remove".
     * This Migration written for IR-490492-3DEXPERIENCER2015x
     */
    private void migrateSpecificFoldersForOwnerAccess(Context context, MapList objectList) throws Exception
    {
        try{
            ProgramCentralUtil.pushUserContext(context);
            Iterator objectListIterator = objectList.iterator();
            String access = "Full";
            mqlLogRequiredInformationWriter("===================MIGRATION FOR SETTING PROJECT OWNER ACESS TO FULL STARTED========================");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String projectId = (String)objectInfo.get(SELECT_ID);
                DomainObject projectObj = DomainObject.newInstance(context, projectId);
                String projectName = projectObj.getInfo(context, SELECT_NAME);

                StringList busSelect = new StringList(2);
                busSelect.add(ProgramCentralConstants.SELECT_ID);
                busSelect.add(ProgramCentralConstants.SELECT_OWNER);
                StringList relSelect = new StringList();
                String whereClause = "attribute["+ProgramCentralConstants.ATTRIBUTE_ACCESS_TYPE+"] == Specific" ;

                MapList folderInfoList = projectObj.getRelatedObjects(context,
                        "Data Vaults,Sub Vaults", //pattern to match relationships
                        ProgramCentralConstants.QUERY_WILDCARD, //pattern to match types
                        busSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                        relSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                        false, //get To relationships
                        true, //get From relationships
                        (short)0, //the number of levels to expand, 0 equals expand all.
                        whereClause, //where clause to apply to objects, can be empty ""
                        "", //where clause to apply to relationship, can be empty ""
                        0);

                Iterator folderInfoListIterator = folderInfoList.iterator();

                mqlLogRequiredInformationWriter("Migrating for project: "+ projectName);

                while(folderInfoListIterator.hasNext()){
                    Map folderInfo = (Map)folderInfoListIterator.next();
                    String folderId = (String)folderInfo.get(ProgramCentralConstants.SELECT_ID);
                    String folderOwner = (String)folderInfo.get(ProgramCentralConstants.SELECT_OWNER);
                    String ownerId = PersonUtil.getPersonObjectID(context, folderOwner);
                    mqlLogRequiredInformationWriter("Migrating for folderId: "+ folderId);
                    DomainAccess.createObjectOwnership(context,folderId, ownerId,access,DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                }
            }
            mqlLogRequiredInformationWriter("==================MIGRATION FOR SETTING PROJECT OWNER ACESS TO FULL STARTED=========================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ProgramCentralUtil.popUserContext(context);
        }
    }

    /**
     * Added for DomainAccess.xml changes.
     * Added for 498140 but it will applicable for all DomainAccess.xml changes.
     * @param context
     * @param objectList
     * @throws Exception
     */
    private void migrateDomainAccessChanges(Context context, MapList objectList) throws Exception
    {
        try{
            mqlLogRequiredInformationWriter("================MIGRATION FOR RESTAMPING THE PROJCET MEMBER/LEAD STARTED===================");

            Map policiesLogicalNames = (Map) CacheUtil.getCacheObject(context, "policy_logical_mappings");

            for(int i=0,size = objectList.size(); i<size; i++){
                Map projectInfo     = (Map)objectList.get(i);
                String projectId    = (String)projectInfo.get(SELECT_ID);

                MapList accessList = DomainAccess.getAccessSummaryList(context, projectId);

                StringList personListForProjectLead = new StringList();
                StringList personListForProjectMember = new StringList();
                String projectMember = EMPTY_STRING;
                String projectLead = EMPTY_STRING;;

                for (int j=0; j < accessList.size(); j++) {
                    Map<?, ?> map = (Map<?, ?>) accessList.get(j);
                    String ownershipProject = (String)map.get("name");
                    String accessMasks = (String) map.get(DomainAccess.KEY_ACCESS_GRANTED);

                    if("All".equalsIgnoreCase(accessMasks)){
                        continue;
                    }

                    if(!"Project Member".equalsIgnoreCase(accessMasks) && !"Project Lead".equalsIgnoreCase(accessMasks)){
                        accessMasks =FrameworkUtil.findAndReplace(accessMasks, " ", "");
                        StringList accessMaskList = FrameworkUtil.split(accessMasks, ",");
                        int accessMasksSize = accessMaskList.size();

                        if(policiesLogicalNames == null){ //hard coded based on FP1701
                            projectMember = "read,show,checkout,fromconnect,fromdisconnect,execute";
                            projectLead = "read,show,checkout,checkin,fromconnect,fromdisconnect,execute,changeowner,modify,delete,promote,demote,toconnect,todisconnect,changename,changetype,changepolicy,revise";
                        }else{
                            Map policySettings = (Map) policiesLogicalNames.get("Project Space");
                            projectMember   = (String)policySettings.get("Project Member");
                            projectLead     = (String)policySettings.get("Project Lead");
                        }

                        projectMember =FrameworkUtil.findAndReplace(projectMember, " ", "");
                        projectLead =FrameworkUtil.findAndReplace(projectLead, " ", "");

                        StringList projectMemberAccessBit = FrameworkUtil.split(projectMember, ",");
                        StringList projectLeadAccessBit = FrameworkUtil.split(projectLead, ",");

                        int memberAccessBit = projectMemberAccessBit.size();
                        int leadAccessBit   = projectLeadAccessBit.size();

                        if(accessMasksSize < memberAccessBit){
                            personListForProjectMember.addElement(ownershipProject);
                        }else if(accessMasksSize == memberAccessBit){
                            personListForProjectMember.addElement(ownershipProject);
                        }else if(accessMasksSize > memberAccessBit && accessMasksSize < (memberAccessBit + 4)){ //corrector should correct this condition based on DomainAccess changes.
                            personListForProjectMember.addElement(ownershipProject);
                        }else if(leadAccessBit == accessMasksSize){
                            personListForProjectLead.addElement(ownershipProject);
                        }else{
                            personListForProjectLead.addElement(ownershipProject);
                        }
                    }
                }

                //Remove existing ownership and create new

                if(personListForProjectMember != null && !personListForProjectMember.isEmpty()){
                    for(int k=0;k<personListForProjectMember.size();k++){
                        String ownershipPRJ =  (String)personListForProjectMember.get(k);
                        //String ownershipProject = MqlUtil.mqlCommand(context,"print role '" + ownershipPRJ + "' select person dump");
                        String ownershipProject = MqlUtil.mqlCommand(context, "print role $1 select person dump", "'"+ownershipPRJ+"'");
                        String personId     = PersonUtil.getPersonObjectID(context, ownershipProject);
                        //String personState = MqlUtil.mqlCommand(context,"print bus "+ personId+" select current dump");
                        String personState = MqlUtil.mqlCommand(context,"print bus $1 select current dump ",personId);

                        if(personState.equalsIgnoreCase("Inactive")){
                            continue;
                        }

                        DomainAccess.deleteObjectOwnership(context, projectId, null, ownershipPRJ, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                        DomainAccess.createObjectOwnership(context, projectId, personId, "Project Member", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                        loadMigratedOids(projectId);
                    }
                }

                if(personListForProjectLead != null && !personListForProjectLead.isEmpty()){
                    for(int k=0;k<personListForProjectLead.size();k++){
                        String ownershipPRJ =  (String)personListForProjectLead.get(k);
                        //String ownershipProject   = MqlUtil.mqlCommand(context,"print role '" + ownershipPRJ + "' select person dump");
                        String ownershipProject = MqlUtil.mqlCommand(context, "print role $1 select person dump", "'"+ownershipPRJ+"'");
                        String personId     = PersonUtil.getPersonObjectID(context, ownershipProject);
                        //String personState    = MqlUtil.mqlCommand(context,"print bus "+ personId+" select current dump");
                        String personState = MqlUtil.mqlCommand(context,"print bus $1 select current dump ",personId);

                        if(personState.equalsIgnoreCase("Inactive")){
                            continue;
                        }

                        DomainAccess.deleteObjectOwnership(context, projectId, null, ownershipPRJ, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                        DomainAccess.createObjectOwnership(context, projectId, personId, "Project Lead", DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                        loadMigratedOids(projectId);
                    }
                }

            }

            mqlLogRequiredInformationWriter("=================MIGRATION FOR RESTAMPING THE PROJCET MEMBER COMPLETED======================");
        }catch(Exception ex) {
            ex.printStackTrace();
        }
    }

    /**
     * This method will connect the object "Project Folder" which are not connected to any ProjectFolder/ProjectSpace
     * These "Project Folder" objects are disconnected from parent object in CUT-PASTE operation
     */
    private void migrateProjectFolderObjectsToReconnect(Context context, MapList objectList) throws Exception
    {
        try{
            ContextUtil.pushContext(context);
            String cmd = "trigger off";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===================MIGRATION OF PROJECT FOLDER STARTED=====================================");

            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String objectType = (String)objectInfo.get(SELECT_TYPE);
                String objectOwner = (String)objectInfo.get(SELECT_OWNER);
                String objectId = (String)objectInfo.get(SELECT_ID);
                String objectName = (String)objectInfo.get(SELECT_NAME);
                String objectRevision = (String)objectInfo.get(SELECT_REVISION);
                String isKindOfWorkspaceVault = (String)objectInfo.get(DomainConstants.SELECT_KINDOF_WORKSPACE_VAULT);
                String objectPolicy = (String)objectInfo.get(SELECT_POLICY);
                String SELECT_FOLDER_PROJECT_ID = "to[" + DomainConstants.RELATIONSHIP_PROJECT_VAULTS + "].from.id" ;
                String SELECT_PARENT_FOLDER_ID = "to[" + DomainConstants.RELATIONSHIP_SUB_VAULTS + "].from.id" ;
                String projectId = (String)objectInfo.get(SELECT_FOLDER_PROJECT_ID);
                String parentFolderId = (String)objectInfo.get(SELECT_PARENT_FOLDER_ID);
                Object documentIds = objectInfo.get(SELECT_DOCUMENT_ID);
                StringList documentIdList =  new StringList();
                if (documentIds != null && documentIds instanceof StringList) {
                    documentIdList  =   ((StringList)documentIds);
                }else if (documentIds != null && documentIds instanceof String){
                    documentIdList.add((String)documentIds);
                }



                if("true".equalsIgnoreCase(isKindOfWorkspaceVault) && ProgramCentralUtil.isNullString(projectId) && ProgramCentralUtil.isNullString(parentFolderId)){
                    DomainObject dobj = new DomainObject(objectId);
                    StringList slHistory = dobj.getInfoList(context, "history.connect");
                    for(int i = slHistory.size() -1; i>0; i-- ){
                        String str = (String) slHistory.get(i);
                        if(str.indexOf("disconnect Sub Vaults") >= 0 || str.indexOf("disconnect Data Vaults") >= 0){
                            //disconnect Sub Vaults from Workspace Vault eee CF4A4D5A00004524598952BA000004E5 - user: pl1  time: 8/8/2017 11:43:19 AM  state: Exists
                            //mqlLogRequiredInformationWriter("=============OBJECT ID OF MIGRATED PROJECT FOLDER : "+objectId+"=====================================");
                            loadMigratedOids("************************************************************************************************************");
                            loadMigratedOids(" ");

                            //Find disconnected folder information
                            loadMigratedOids("INFORAMTION OF DISCONNECTED PROJECT FOLDER : ");
                            loadMigratedOids(" ");
                            loadMigratedOids("OBJECT ID OF DISCONEECTED PROJECT FOLDER : "+objectId);
                            loadMigratedOids("TYPE NAME REVISION OF DISCONEECTED PROJECT FOLDER : "+objectType+" : "+objectName+" : "+objectRevision);
                            loadMigratedOids("OWNER OF DISCONEECTED PROJECT FOLDER : "+objectOwner);
                            loadMigratedOids(" ");
                            loadMigratedOids("INFORMATION OF DOCUMENTS UNDER DISCONNECTED PROJECT FOLDER : ");
                            loadMigratedOids(" ");

                            //DOCUMENT INFORMATION
                            String[] oidsArray = new String[documentIdList.size()];
                            oidsArray = (String[])documentIdList.toArray(oidsArray);
                            StringList slProjectSelects = new StringList();
                            slProjectSelects.add(SELECT_ID);
                            slProjectSelects.add(SELECT_TYPE);
                            slProjectSelects.add(SELECT_NAME);
                            slProjectSelects.add(SELECT_REVISION);
                            slProjectSelects.add(SELECT_OWNER);
                            MapList objectInfoList = DomainObject.getInfo(context, oidsArray, slProjectSelects);
                            Iterator objListIterator = objectInfoList.iterator();
                            while(objListIterator.hasNext()){
                                Map docInfo = (Map)objListIterator.next();
                                loadMigratedOids("OBJECT ID OF DISAPPEARED DOCUMENT : "+docInfo.get(SELECT_ID));
                                loadMigratedOids("TYPE NAME REVISION OF DISAPPEARED DOCUMENT : "+docInfo.get(SELECT_TYPE)+" : "+docInfo.get(SELECT_NAME)+" : "+docInfo.get(SELECT_REVISION));
                                loadMigratedOids("OWNER OF DISAPPEARED DOCUMENT : "+docInfo.get(SELECT_OWNER)+"");
                                loadMigratedOids(" ");
                            }

                            loadMigratedOids(" ");

                            //Find Parent folder information
                            loadMigratedOids("INFORAMTION OF PARENT FOLDER OF DISCONNECTED PROJECT FOLDER :  ");
                            loadMigratedOids(" ");

                            String type = str.indexOf("Workspace Vault")>0 ? "Workspace Vault" : "Controlled Folder";
                            int typeIndex = str.indexOf(type) + type.length();
                            int userIndex = str.indexOf("- user");
                            String name = str.substring(typeIndex, userIndex).trim();
                            int lastSpaceIndex  = name.lastIndexOf(" ");
                            String revision = name.substring(lastSpaceIndex).trim();
                            name = name.substring(0, lastSpaceIndex);
                            //String command = "print bus \""+type+"\" \""+name+"\" "+revision+" select id owner dump |";
                            String sResult = " ";
                            try{
                                //sResult = MqlUtil.mqlCommand(context,command,true);
                                String[] mqlParameterArray = new String[] {type,name,revision,"|"};
                                sResult = MqlUtil.mqlCommand(context,"print bus $1 $2 $3 select id owner dump $4",true, mqlParameterArray);
                            }catch(Exception e){
                                loadMigratedOids(" ");
                                loadMigratedOids("PARENT FOLDER NOT FOUND : Name of "+type + " " + name + " "+revision + " is changed");
                                loadMigratedOids(" ");
                                loadMigratedOids("************************************************************************************************************");
                                loadMigratedOids(" ");
                                break;
                            }
                            StringList strInfo = FrameworkUtil.split(sResult, "|");
                            String FolderID = strInfo.get(0).toString().trim();
                            String ownerName = strInfo.get(1).toString().trim();
                            loadMigratedOids("OBJECT ID OF PREVIOUS PARENT : "+FolderID);
                            loadMigratedOids("TYPE NAME REVISION OF PREVIOUS PARENT PROJECT FOLDER : "+type+" : "+name+" : "+revision);
                            loadMigratedOids("OWNER OF PREVIOUS PARENT PROJECT FOLDER : "+ownerName);
                            loadMigratedOids(" ");


                            DomainObject dFolderObj = DomainObject.newInstance(context,FolderID);
                            String relName = str.indexOf("Sub Vaults")>0 ? "Sub Vaults" : "Data Vaults";

                            //Find Project information
                            loadMigratedOids("PROJECT INFORMATION : ");
                            loadMigratedOids(" ");
                            String sFromObjectIdFolder =  "to["+DomainConstants.RELATIONSHIP_SUB_VAULTS+"].from.id";
                            String sFromObjectIdProject =  "to["+DomainConstants.RELATIONSHIP_PROJECT_VAULTS+"].from.id";
                            String sIsFromObjectFolderType =  "to["+DomainConstants.RELATIONSHIP_SUB_VAULTS+"].from.type.kindof["+DomainConstants.TYPE_WORKSPACE_VAULT+"]";
                            String sIsFromObjectProjectType =  "to["+DomainConstants.RELATIONSHIP_PROJECT_VAULTS+"].from.type.kindof["+DomainConstants.TYPE_PROJECT_MANAGEMENT+"]";
                            String sIsProjectType = "type.kindof["+DomainConstants.TYPE_PROJECT_MANAGEMENT+"]";

                            StringList slFolderSelects = new StringList();
                            slFolderSelects.add(sFromObjectIdFolder);
                            slFolderSelects.add(sFromObjectIdProject);
                            slFolderSelects.add(sIsFromObjectFolderType);
                            slFolderSelects.add(sIsFromObjectProjectType);
                            slFolderSelects.add(sIsProjectType);

                            String sReturnProjectId = "";

                            if(dFolderObj.isKindOf(context, DomainConstants.TYPE_PROJECT_MANAGEMENT))
                            {
                                sReturnProjectId =  FolderID;
                            }
                            else
                            {
                                while(true)
                                {
                                    Map mFolderInfo = dFolderObj.getInfo(context,slFolderSelects);

                                    String sIsProject = (String)mFolderInfo.get(sIsFromObjectProjectType);
                                    if("true".equalsIgnoreCase(sIsProject))
                                    {
                                        sReturnProjectId = (String) mFolderInfo.get(sFromObjectIdProject);
                                        break;
                                    }

                                    String sNwFolderId =  (String) mFolderInfo.get(sFromObjectIdFolder);
                                    dFolderObj.setId(sNwFolderId);
                                }

                            }

                            DomainObject dProjectObj = DomainObject.newInstance(context,sReturnProjectId);

                            Map mProjectInfo = dProjectObj.getInfo(context,slProjectSelects);
                            loadMigratedOids("OBJECT ID OF PROJECT : "+sReturnProjectId);
                            loadMigratedOids("TYPE NAME REVISION OF PROJECT : "+mProjectInfo.get(SELECT_TYPE)+" : "+mProjectInfo.get(SELECT_NAME)+" : "+mProjectInfo.get(SELECT_REVISION));
                            loadMigratedOids("OWNER OF PROJECT : "+mProjectInfo.get(SELECT_OWNER));
                            loadMigratedOids(" ");
                            loadMigratedOids("************************************************************************************************************");
                            loadMigratedOids(" ");

                            //DomainRelationship domRel = DomainRelationship.connect(context,domParent,relName,dobj);
                            //loadMigratedOids(objectId);
                            break;
                        }
                    }
                } else {
                    //mqlLogRequiredInformationWriter("Skipping object <<" + objectId + ">>, NO MIGRATION NEEDED");
                    // Add object to list of unconverted OIDs
                    String comment = "Skipping object <<" + objectId + ">> NO MIGRATIION NEEDED";
                    //writeUnconvertedOID(comment, objectId);
                }
            }
            mqlLogRequiredInformationWriter("===================MIGRATION OF PROJECT FOLDER COMPLETED=====================================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            String cmd = "trigger on";
            MqlUtil.mqlCommand(context, mqlCommand,  cmd);
            ContextUtil.popContext(context);
        }
    }

    /**
     * This method will set % complete of Gate/Milestone to 100% if task is in Review state and  Owner as the originator for Task Deliverable"
     */
    private void migrateGateAndMilestoneToModifyPercentComplete(Context context, MapList objectList) throws Exception {

        try{
            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===============MIGRATION FOR Gate/Milestone TO SET % complete to 100% STARTED===================");
            DomainObject devObject = new DomainObject();
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String taskId = (String)objectInfo.get(SELECT_ID);
                String taskState = (String)objectInfo.get(SELECT_CURRENT);
                String taskPercentComplete = (String)objectInfo.get(SELECT_PERCENTCOMPLETE);
                String isSummaryTask = (String)objectInfo.get(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
                double newPercentValue = Task.parseToDouble(taskPercentComplete);

                boolean needToMigrate = "false".equalsIgnoreCase(isSummaryTask) &&
                        ProgramCentralConstants.STATE_PROJECT_REVIEW_REVIEW.equalsIgnoreCase(taskState) &&
                        newPercentValue != 100;

                if(needToMigrate){
                    devObject.setId(taskId);
                    devObject.setAttributeValue(context, ATTRIBUTE_PERCENT_COMPLETE, "100");
                    loadMigratedOids(taskId);
                }
            }
            mqlLogRequiredInformationWriter("================MIGRATION FOR TASK DELIVERABLE TO SET ORIGINATOR END=====================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }

    /**
     * This method will remove ownership of Task on Document if Task Deliverable disconnected but its ownership not deleted"
     */
    private void migrateDocumentToRemoveOwnership(Context context, MapList objectList) throws Exception {

        try{
            ContextUtil.pushContext(context);
            Iterator objectListIterator = objectList.iterator();
            mqlLogRequiredInformationWriter("===============MIGRATION FOR DOCUMENT TO REMOVE OWNERSHIP STARTED===================");
            DomainObject migratedObj = new DomainObject();
            loadMigratedOids("************************************************************************************************************");
            while(objectListIterator.hasNext())
            {
                Map objectInfo = (Map)objectListIterator.next();
                String docId = (String)objectInfo.get(SELECT_ID);
                String objectName = (String)objectInfo.get(SELECT_NAME);
                String objectRevision = (String)objectInfo.get(SELECT_REVISION);
                migratedObj.setId(docId);
                StringList slHistory = migratedObj.getInfoList(context, "history.connect");

                for(int i = slHistory.size() -1; i>0; i-- ){
                    String str = (String) slHistory.get(i);
                    if(str.indexOf("disconnect Task Deliverable") >= 0 ){
                        //disconnect Task Deliverable from Task T-0000148 11526465491798 - user: gke1  time: 5/28/2018 4:55:16 PM  state: IN_WORK
                        String strType = "from Task";
                        if(str.indexOf("from Gate") > -1){
                            strType = "from Gate";
                        }else if(str.indexOf("from Phase") > -1){
                            strType = "from Phase";
                        }
                        int typeIndex = str.indexOf(strType) + strType.length();
                        int userIndex = str.indexOf("- user");
                        String name = str.substring(typeIndex, userIndex).trim();
                        int lastSpaceIndex  = name.lastIndexOf(" ");
                        String revision = name.substring(lastSpaceIndex).trim();
                        name = name.substring(0, lastSpaceIndex);
                        String type = strType.substring(5).trim();//"Task";
                        try{
                            String result = MqlUtil.mqlCommand(context, "temp query bus $1 $2 $3 select $4 dump $5", type, name, revision, "id", "|");
                            StringList resultList = StringUtil.split(result, "\n");
                            if(resultList.size()>0){
                                StringList strInfo = FrameworkUtil.split(resultList.get(0).toString(), "|");
                                String taskID = strInfo.get(3).toString().trim();
                                String comment = "Ownership Inheritance from "+type;
                                if( DomainAccess.hasObjectOwnership(context, docId, taskID, comment)){

                                    String connectedTaskIds = (String) objectInfo.get(SELECT_TASK_DELIVERABLE_ID);

                                    if(ProgramCentralUtil.isNullString(connectedTaskIds) || (ProgramCentralUtil.isNotNullString(connectedTaskIds) && !connectedTaskIds.contains(taskID))){
                                        loadMigratedOids("OBJECT ID OF DOCUMENT: "+docId);
                                        loadMigratedOids("OBJECT NAME OF DOCUMENT: "+objectName);
                                        loadMigratedOids("OBJECT REVISION OF DOCUMENT: "+objectRevision);
                                        loadMigratedOids("************************************************************************************************************");

                                        String ownerName = strInfo.get(1).toString().trim();
                                        loadMigratedOids("OBJECT ID OF PREVIOUS PARENT TASK: "+taskID);
                                        loadMigratedOids("TYPE NAME REVISION OF PREVIOUS PARENT TASK : "+type+" : "+name+" : "+revision);
                                        loadMigratedOids("OWNER OF PREVIOUS TASK : "+ownerName);
                                        loadMigratedOids(" ");

                                        loadMigratedOids("************************************************************************************************************");
                                        loadMigratedOids("************************************************************************************************************");

                                        DomainAccess.deleteObjectOwnership(context, docId, taskID, comment, false);
                                    }
                                }
                            }
                        }catch(Exception e){
                            loadMigratedOids("Exception : "+e.getMessage());
                            loadMigratedOids("************************************************************************************************************");
                            break;
                        }
                    }
                }

            }
            mqlLogRequiredInformationWriter("===============MIGRATION FOR DOCUMENT TO REMOVE OWNERSHIP ENDED===================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }



    /**
     * This method converts access of project members from Project Member to Project Lead if person has leader access in CS in which Project is created and added as member in Project
     */
    private void migrateProjectsMemberToLeaders(Context context, MapList objectList) throws Exception
    {

        try{

            ContextUtil.pushContext(context);
             String ownership = ProgramCentralConstants.EMPTY_STRING;
             String access = ProgramCentralConstants.EMPTY_STRING;
             String role = ProgramCentralConstants.EMPTY_STRING;
             StringList tokens = new StringList();
             String accessOnProject = ProgramCentralConstants.EMPTY_STRING;
             String assignment = ProgramCentralConstants.EMPTY_STRING;
             String comment  = ProgramCentralConstants.EMPTY_STRING;
            mqlLogRequiredInformationWriter("===============MIGRATION FOR UPDATION OF  PROJCET MEMBER TO PROJECT LEAD STARTED===================");
            for(int i = 0, j = objectList.size(); i<j ; i++)
            {
                Map objectInfo = (Map)objectList.get(i);
                String projectSpaceId = (String)objectInfo.get(SELECT_ID);
                String projectSpaceName = (String)objectInfo.get(SELECT_NAME);
                String org = (String)objectInfo.get(SELECT_ORGANIZATION);
                String proj = (String)objectInfo.get(SELECT_PROJECT);
                String pov = org+"."+proj;
                String leader = "VPLMProjectLeader";
                if (pov != null && pov.contains("GLOBAL")) {
                    leader = "Project Lead";
                } else {
                    leader = "VPLMProjectLeader";
                }

                StringList objOwnership = (StringList)objectInfo.get(SELECT_OWNERSHIP);

                 for(int k = 0, l = objOwnership.size(); k<l ; k++){
                        ownership = (String)objOwnership.get(k);
                        // If not personal security context (i.e. xyz_PRJ) nothing to do
                        if (-1 == ownership.indexOf("_PRJ")) {
                            continue;
                        }

                        String select = SELECT_OWNERSHIP + "[" + ownership + "].access";

                        // Get org and role (project) from ownership string
                        tokens = FrameworkUtil.splitString(ownership,"|");
                        org = (String)tokens.remove(0);
                        role = (String)tokens.remove(0);
                        comment = (String)tokens.remove(0);

                        String personName = role.substring(0, role.lastIndexOf("_"));

                        // Get ownership.access from the map
                        access = (String)objectInfo.get(select);

                        // Determine Project Lead vs. Project Member by checking actual mask for modify access
                        if (access.contains("modify")) {
                            accessOnProject = KEY_PROJECT_LEAD;
                        }else{
                            accessOnProject =KEY_PROJECT_MEMBER;
                        }

                        if(KEY_PROJECT_MEMBER.equalsIgnoreCase(accessOnProject)){
                            assignment = "assignment[ctx::" + leader + "." + pov + "]";

                            String isValidAssignment = MqlUtil.mqlCommand(context, "print person $1 select $2 dump", true, personName, assignment);

                            //If person has leader access in CS in which Project is created and added as member in Project then change the access to "Project Lead"
                            if("TRUE".equalsIgnoreCase(isValidAssignment)){
                                DomainAccess.createObjectOwnership(context, projectSpaceId, org, role, KEY_PROJECT_LEAD, comment, true);
                                loadMigratedOids("**********************************************************************");
                                loadMigratedOids("NAME OF PROJECT : "+projectSpaceName + " : ID : " +projectSpaceId);
                                loadMigratedOids("NAME OF MEMBER : "+personName);
                            }
                        }
                    }
            }
            mqlLogRequiredInformationWriter("================MIGRATION FOR UPDATION OF DPJ LEAD TO PROJCET MEMBER COMPLETED=====================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        finally
        {
            ContextUtil.popContext(context);
        }
    }






    /**
     *
     * @param context
     * @param objectList : List of object to be migrated
     * @throws Exception
     * This method will migrate SequenceId and WBSId
     */
    private void migrateSequenceIdAndWBSId(Context context, MapList objectList) throws Exception
    {

        try{
            mqlLogRequiredInformationWriter("================MIGRATION FOR SequenceId And WBSId STARTED=====================");
            long start = System.currentTimeMillis();
            int objectListSize = objectList.size();
            mqlLogRequiredInformationWriter("================TOTAL NUMBER OF OBJECTS : "+objectListSize+"=====================");
            for(int i = 0; i<objectListSize ; i++)
            {
                Map objectInfo = (Map)objectList.get(i);
                String projectPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PHYSICALID);
                String masterProjectPALPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
                if(ProgramCentralUtil.isNullString(masterProjectPALPhysicalId)) {
                    masterProjectPALPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);

                    if(ProgramCentralUtil.isNullString(masterProjectPALPhysicalId)) {
                        String comment = "Skipping object <<" + projectPhysicalId + ">> NO MIGRATIION NEEDED AS DON'T HAVE PAL CONNECTED";
                        writeUnconvertedOID(comment, projectPhysicalId);
                        continue;
                    }
                }

                // RVW - Modified to check for corrupt ProjectSequence attribute
                //
                boolean hasRelBasedSequence = true;
                ProjectSequence pal = new ProjectSequence(context, masterProjectPALPhysicalId);
                try {
                    Map<String,Dataobject>palDataMap = pal.getSequenceData(context);

                    // Check to see if we already have PAL-based sequence data
                    //
                    if(palDataMap != null && palDataMap.size()>0 ) {
                        hasRelBasedSequence = false;
                    }
                } catch(IllegalArgumentException | javax.json.stream.JsonParsingException e) {
                    String ATTRIBUTE_PROJECT_SEQUENCE = PropertyUtil.getSchemaProperty(context, "attribute_ProjectSequence");
                    DomainObject palObj = DomainObject.newInstance(context, masterProjectPALPhysicalId);
                    palObj.setAttributeValue(context, ATTRIBUTE_PROJECT_SEQUENCE, DomainConstants.EMPTY_STRING);
                    // e.printStackTrace();
                } catch (Exception e) {
                    System.out.println("Some other error occurred");
                    e.printStackTrace();
                }

                if(hasRelBasedSequence) {
                    String name = (String)objectInfo.get(ProgramCentralConstants.SELECT_NAME);
                    String type = (String)objectInfo.get(ProgramCentralConstants.SELECT_TYPE);
                    String revision = (String)objectInfo.get(SELECT_REVISION);
                    loadMigratedOids(" ***********************MIGRATION FOR OBJECT : "+projectPhysicalId+"  STARTED*********************************** ");
                    loadMigratedOids(" OBJECT TYPE : "+type);
                    loadMigratedOids(" OBJECT NAME : "+name);
                    loadMigratedOids(" OBJECT REVISION : "+revision);
                    loadMigratedOids(" PAL ID : "+masterProjectPALPhysicalId);
                    migrateRelBasedSequenceProject(context, pal, projectPhysicalId, masterProjectPALPhysicalId);
                    loadMigratedOids(" ***********************MIGRATION FOR OBJECT : "+projectPhysicalId+"  COMPLETED*********************************** ");
                } else {
                    String comment = "Skipping object <<" + projectPhysicalId + ">> NO MIGRATIION NEEDED AS EXISTING PROJECT HAS CORRECT PROJECT SEQUENCE INFORMATION";
                    writeUnconvertedOID(comment, projectPhysicalId);
                }
            }

            mqlLogRequiredInformationWriter("================TOTAL TIME REQUIRED FOR MIGRATION : "+(System.currentTimeMillis() -start)+" ms=====================");
            mqlLogRequiredInformationWriter("================MIGRATION FOR SequenceId And WBSId COMPLETED=====================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }

    }

    private void migrateRelBasedSequenceProject(Context context,
            ProjectSequence pal,
            String projectPhysicalId,
            String masterProjectPALPhysicalId)throws Exception {

        Set<String> alreadyAddedTaskIdSet = new HashSet<>();
        long start = System.currentTimeMillis();
        try {

            MapList objectList = new MapList();

            try {
                StringList objectSelect = new StringList(9);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PHYSICALID);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PARENT_TASK_PHYSICALID);
                objectSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                objectSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
                objectSelect.addElement(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);

                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_TASK);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_PROJECT);

                objectSelect.addElement(SELECT_SUBTASK_IDS);

                StringList relationshipSelects = new StringList(2);
                relationshipSelects.addElement(DomainConstants.SELECT_LEVEL);
                relationshipSelects.addElement(SubtaskRelationship.SELECT_SEQUENCE_ORDER);

                ProgramCentralUtil.pushUserContext(context);
                ProjectSpace project = new ProjectSpace(projectPhysicalId);
                objectList = project.getRelatedObjects(
                        context,               // context
                        Task.RELATIONSHIP_SUBTASK,    // relationshipPattern
                        ProgramCentralConstants.TYPE_PROJECT_MANAGEMENT,// typePattern
                        objectSelect,            // objectSelects
                        relationshipSelects,                   // relationshipSelects
                        false,                  // getTo,
                        true,                   // getFrom
                        (short) 0,              // recurseToLevel
                        null,                   // objectWhere
                        null,                   // relationshipWhere
                        (short) 0,              // limit
                        false,                  // check hidden
                        false,                  // prevent duplicates
                        (short) 1000,           // page size
                        null, null, null, null);// includeType, includeRelationship, postPatterns, relKeyPrefix
                objectList.sort(SubtaskRelationship.SELECT_SEQUENCE_ORDER, ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_INTEGER);

                int objectListSize = objectList.size();
                // System.out.println("migrateRelBasedSequenceProject::obectListSize = " + objectListSize);
                int lastSeq = 0;
                if(objectListSize > 0) {
                    //Need to check whether multiple task has same seq id
                    //Checking whether last task in map has correct seq id
                    Map<String,Object> latsTaskMap  = (Map)objectList.get(objectListSize-1);
                    lastSeq = Integer.parseInt((String) latsTaskMap.get(SubtaskRelationship.SELECT_SEQUENCE_ORDER));
                    // System.out.println("migrateRelBasedSequenceProject::lastSeq = " + lastSeq);
                }

                if(objectListSize != lastSeq) {
                    //existing Project has incorrect sequence data so need to correct it before going to execute migration script
                    loadMigratedOids(" ***********************NEED TO RUN OLD RESEQUENCE PROCESS TO CORRECT DATA*********************************** ");
                    Task masterProj = new Task();
                    masterProj.reSequence(context, project.getObjectId(context));
                    objectList = project.getRelatedObjects(
                            context,               // context
                            Task.RELATIONSHIP_SUBTASK,    // relationshipPattern
                            ProgramCentralConstants.TYPE_PROJECT_MANAGEMENT,// typePattern
                            objectSelect,            // objectSelects
                            relationshipSelects,                   // relationshipSelects
                            false,                  // getTo,
                            true,                   // getFrom
                            (short) 0,              // recurseToLevel
                            null,                   // objectWhere
                            null,                   // relationshipWhere
                            (short) 0,              // limit
                            false,                  // check hidden
                            false,                  // prevent duplicates
                            (short) 1000,           // page size
                            null, null, null, null);// includeType, includeRelationship, postPatterns, relKeyPrefix
                    objectList.sort(SubtaskRelationship.SELECT_SEQUENCE_ORDER, ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_INTEGER);
                }


            }catch(Exception e) {
                e.printStackTrace();
            }finally{
                ProgramCentralUtil.popUserContext(context);
            }


            int size = objectList.size();
            loadMigratedOids("TOTAL NUMEBR OF OBJECTS : "+size);
            // System.out.println("migrateRelBasedSequenceProject::size = " + size);

            Map<String, Map<String,Object>> objectListMap = new HashMap<>();
			boolean isValid = true;
			String parentIdsStr = "";
            for(int j = 0; j <size; j++) {
                Map<String,Object> taskMap  = (Map)objectList.get(j);
                String taskPhysicalId       = (String) taskMap.get(ProgramCentralConstants.SELECT_PHYSICALID);
                String isKindOfTaskManagement       = (String) taskMap.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
				if("TRUE".equalsIgnoreCase(isKindOfTaskManagement) && (taskMap.get(ProgramCentralConstants.SELECT_PARENT_TASK_PHYSICALID) instanceof StringList)){
					StringList slTaskParents = (StringList) taskMap.get(ProgramCentralConstants.SELECT_PARENT_TASK_PHYSICALID);
					parentIdsStr+="\nTask with ID : {"+taskPhysicalId+"} is not migrated as it has multiple parent IDs which are: {";
					if(slTaskParents.size()>1){
						isValid = false;
						for(int tempItr = 0; tempItr<slTaskParents.size(); tempItr++){
							parentIdsStr+=slTaskParents.get(tempItr)+"|";
						}
					parentIdsStr = parentIdsStr.substring(0,parentIdsStr.length()-1)+"}\n";
					}
					
				}
                objectListMap.put(taskPhysicalId, taskMap);
            }

            //check whether any task is connected to multiple parent
            //objectListMap contains unique object id as key and objectList contains all object ids including duplicate
            // System.out.println("migrateRelBasedSequenceProject::isValid = " + isValid);


            if(isValid) {

                ContextUtil.startTransaction(context, true);
                pal.startUpdateSession(context);
                pal.assignSequence(context, null, projectPhysicalId, null, null, true);

            for(int i=0; i<size; i++){
                Map<String,Object> taskMap  = (Map)objectList.get(i);
                String taskPhysicalId       = (String) taskMap.get(ProgramCentralConstants.SELECT_PHYSICALID);

                if(alreadyAddedTaskIdSet.contains(taskPhysicalId)) {
                    continue;
                }

                //If Project Space/Concept connect in more than one ProjectSpace/ProjectConcept
                //START:

                Set<String> taskPALPhysicalIdSet = new HashSet<>();

                Object taskPALPhysicalId    = taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
                if(taskPALPhysicalId != null){
                    if(taskPALPhysicalId instanceof StringList){
                        taskPALPhysicalIdSet.addAll((StringList) taskPALPhysicalId);
                    }else{
                        taskPALPhysicalIdSet.add((String)taskPALPhysicalId);
                    }
                }

                Object taskPALPhysicalIdFromParentTask =  taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_TASK);
                if(taskPALPhysicalIdFromParentTask != null){
                    if(taskPALPhysicalIdFromParentTask instanceof StringList){
                        taskPALPhysicalIdSet.addAll((StringList) taskPALPhysicalIdFromParentTask) ;
                    }else{
                        taskPALPhysicalIdSet.add((String)taskPALPhysicalIdFromParentTask);
                    }
                }

                Object taskPALPhysicalIdFromParentProject =  taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_PROJECT);
                if(taskPALPhysicalIdFromParentProject != null){
                    if(taskPALPhysicalIdFromParentProject instanceof StringList){
                        taskPALPhysicalIdSet.addAll((StringList) taskPALPhysicalIdFromParentProject) ;
                    }else{
                        taskPALPhysicalIdSet.add((String)taskPALPhysicalIdFromParentProject);
                    }
                }

                //END:

                boolean isProject       = "TRUE".equalsIgnoreCase((String) taskMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE)) ||
                        "TRUE".equalsIgnoreCase((String) taskMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT));


                if(taskPALPhysicalIdSet.contains(masterProjectPALPhysicalId)) { //avoid to add sub-project task in the 'Master project PAL

                    //If Project Space/Concept connect in more than one ProjectSpace/ProjectConcept
                    //START:
                    StringList taskParentPhysicalIdList = new StringList();
                    Object taskParentPhysicalIdObj =  taskMap.get(ProgramCentralConstants.SELECT_PARENT_TASK_PHYSICALID);
                    if(taskParentPhysicalIdObj != null){
                        if(taskParentPhysicalIdObj instanceof StringList){
                            taskParentPhysicalIdList = (StringList) taskParentPhysicalIdObj;
                        }else{
                            taskParentPhysicalIdList.add((String)taskParentPhysicalIdObj);
                        }
                    }

                    String taskParentPhysicalId = "";
                    if(taskParentPhysicalIdList.size() >1 ){

                        //if it is connect to more than one parent , need to find actual parent id in current project.. so either it is master project or it is present in objectlist
                        for (String parentId : taskParentPhysicalIdList) {
                            if(projectPhysicalId.equalsIgnoreCase(parentId) || objectListMap.containsKey(parentId)){
                                taskParentPhysicalId = parentId;
                                break;
                            }
                        }

                    }else{
                        taskParentPhysicalId = taskParentPhysicalIdList.get(0);
                    }
                    //END:


                        if(ProgramCentralUtil.isNullString(taskParentPhysicalId)) {
                            String comment = "Skipping object <<" + projectPhysicalId + ">> NO MIGRATIION NEEDED AS EXISTING PROJECT HAS INCORRECT SEQUENCE INFORMATION : FAILED AT TASK << " +taskPhysicalId + " >>";
                            writeUnconvertedOID(comment, projectPhysicalId);
                        }

                    pal.assignSequence(context, taskParentPhysicalId, taskPhysicalId, null, null, isProject);
                    alreadyAddedTaskIdSet.add(taskPhysicalId);

                    StringList subTaskIdList = new StringList();
                    Object subTaskIdObj = taskMap.get(SELECT_SUBTASK_IDS);
                    if(subTaskIdObj != null){
                        if( subTaskIdObj instanceof StringList){
                            subTaskIdList = (StringList) subTaskIdObj;
                        }else if(subTaskIdObj instanceof String ){
                            subTaskIdList.add((String)subTaskIdObj);
                        }


                        if(subTaskIdList!= null && !(isProject)) {

                            MapList subTaskList = new MapList();
                            for (String subTaskId : subTaskIdList) {
                                Map subTaskMap = objectListMap.get(subTaskId);
                                subTaskList.add(subTaskMap);
                            }
                            //Need to sort subTaskList by sequence order
                            subTaskList.sort(SubtaskRelationship.SELECT_SEQUENCE_ORDER, ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_INTEGER);
                            int subTaskListSize = subTaskList.size();

                            for(int j = 0; j<subTaskListSize; j++){
                                Map subTaskMap = (Map) subTaskList.get(j);
                                boolean isSubProject = "TRUE".equalsIgnoreCase((String)subTaskMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE))||
                                        "TRUE".equalsIgnoreCase((String) subTaskMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT));;
                                        String subTaskId        = (String) subTaskMap.get(ProgramCentralConstants.SELECT_PHYSICALID);
                                        pal.assignSequence(context, taskPhysicalId, subTaskId, null, null, isSubProject);
                                        alreadyAddedTaskIdSet.add(subTaskId);
                            }
                        }
                    }
                }
            }
            pal.finishUpdateSession(context);

            loadMigratedOids(" ********************************************************** ");
            Map<String, Dataobject> seqData = pal.getSequenceData(context);
            Iterator<String> itr = seqData.keySet().iterator();
            while(itr.hasNext()) {
                String id = itr.next();
                String seqId = DataelementMapAdapter.getDataelementValue(seqData.get(id), ProgramCentralConstants.KEY_SEQ_ID);
                String wbsId = DataelementMapAdapter.getDataelementValue(seqData.get(id), ProgramCentralConstants.KEY_WBS_ID);
                String level = DataelementMapAdapter.getDataelementValue(seqData.get(id), ProgramCentralConstants.KEY_LEVEL);
                String isProject = DataelementMapAdapter.getDataelementValue(seqData.get(id), ProgramCentralConstants.KEY_PROJECT);
                loadMigratedOids(" PhysicalId : "+id );
                loadMigratedOids(" SeqID : "+seqId);
                loadMigratedOids(" WBSID : "+wbsId);
                loadMigratedOids(" Level : "+level);
                loadMigratedOids(" isProject : "+isProject);
                loadMigratedOids(" ********************************************************** ");

            }

            ContextUtil.commitTransaction(context);
                loadMigratedOids(" ***********************TIME REQUIRED TO COMPLETE MILGRATION :  "+(System.currentTimeMillis() - start)+" ms*********************************** ");
            }else {
                String comment = "Skipping object <<" + projectPhysicalId + ">> NO MIGRATIION NEEDED AS TASK IS CONNECTED TO MULTIPLE PARENT"+parentIdsStr;
                writeUnconvertedOID(comment, projectPhysicalId);
            }
        }catch(Exception me) {

            String comment = "Skipping object <<" + projectPhysicalId + ">> NO MIGRATIION NEEDED";
            writeUnconvertedOID(comment, projectPhysicalId);
            ContextUtil.abortTransaction(context);
            //me.printStackTrace();
            //throw me;
        }
    }


    /**
     *
     * @param context
     * @param objectList : List of objects to be validated
     * @throws Exception
     * This method will validate whether SequenceId and WBSId are assign correctly or not. If not, then it will correct SequenceId and WBSId.
     */

    private void validateSequenceIdAndWBSId(Context context, MapList objectList) throws Exception
    {

        try{
            mqlLogRequiredInformationWriter("================VALIDATION FOR SequenceId And WBSId STARTED=====================");
            long start = System.currentTimeMillis();

            int objectListSize = objectList.size();
            mqlLogRequiredInformationWriter("================TOTAL NUMBER OF OBJECTS : "+objectListSize+"=====================");

            for(int i = 0; i<objectListSize ; i++)
            {
                Map objectInfo = (Map)objectList.get(i);
                String projectPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PHYSICALID);
                String masterProjectPALPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
                if(ProgramCentralUtil.isNullString(masterProjectPALPhysicalId)) {
                    masterProjectPALPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
                }

                boolean hasPalBasedSequence = false;

                ProjectSequence pal = new ProjectSequence(context, masterProjectPALPhysicalId);
                Map<String,Dataobject>palDataMap = pal.getSequenceData(context);


                if(palDataMap != null && palDataMap.size()>0 ) {
                    hasPalBasedSequence = true;
                }

                if(hasPalBasedSequence) {

                    String name = (String)objectInfo.get(ProgramCentralConstants.SELECT_NAME);
                    String type = (String)objectInfo.get(ProgramCentralConstants.SELECT_TYPE);
                    String revision = (String)objectInfo.get(SELECT_REVISION);
                    loadMigratedOids(" ***********************VALIDATION FOR OBJECT : "+projectPhysicalId+"  STARTED*********************************** ");
                    loadMigratedOids(" OBJECT TYPE : "+type);
                    loadMigratedOids(" OBJECT NAME : "+name);
                    loadMigratedOids(" OBJECT REVISION : "+revision);
                    loadMigratedOids(" PAL ID : "+masterProjectPALPhysicalId);
                    validatePALBasedSequenceProject(context, pal,  projectPhysicalId, masterProjectPALPhysicalId, palDataMap);
                }
            }

            mqlLogRequiredInformationWriter("================TOTAL TIME REQUIRED FOR VALIDATION : "+(System.currentTimeMillis() - start)+" ms =====================");
            mqlLogRequiredInformationWriter("================VALIDATION FOR SequenceId And WBSId COMPLETED=====================");
        }
        catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        }

    }


    private  void validatePALBasedSequenceProject(Context context,
            ProjectSequence pal,
            String projectPhysicalId,
            String masterProjectPALPhysicalId,
            Map<String,Dataobject>palDataMap)throws Exception {

        long start = System.currentTimeMillis();
        Set<String> validatedTaskIdList = new HashSet<>();
        try {
            ContextUtil.startTransaction(context, true);

            MapList objectList = new MapList();

            try {
                Task task = new Task(projectPhysicalId);
                StringList objectSelect = new StringList(2);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PHYSICALID);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PARENT_TASK_PHYSICALID);
                objectSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                objectSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);

                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_TASK);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_PROJECT);

                objectSelect.addElement(SELECT_SUBTASK_IDS);

                StringList relationshipSelects = new StringList(2);
                relationshipSelects.addElement(DomainConstants.SELECT_LEVEL);
                relationshipSelects.addElement(SubtaskRelationship.SELECT_SEQUENCE_ORDER);
                objectList = Task.getTasks(context, task, 0, objectSelect, relationshipSelects);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                throw new MatrixException();
            }

            pal.startUpdateSession(context);

            //Check the size
            Set<String> palObjIdList = palDataMap.keySet();
            int palObjIdSize = palObjIdList.size();

            List<String> objectIdList = new ArrayList<>();
            Map<String, Map<String,Object>> objectListMap = new HashMap<>();
            for(int i=0,size = objectList.size(); i<size; i++){
                Map<String,Object> taskMap  = (Map<String,Object>)objectList.get(i);
                String taskPhysicalId       = (String) taskMap.get(ProgramCentralConstants.SELECT_PHYSICALID);
                objectIdList.add(taskPhysicalId);
                objectListMap.put(taskPhysicalId, taskMap);
            }
            int objIdSize = objectIdList.size();

            for(int i=0,size = objectList.size(); i<size; i++){
                Map<String,Object> taskMap  = (Map<String,Object>)objectList.get(i);
                String taskPhysicalId       = (String) taskMap.get(ProgramCentralConstants.SELECT_PHYSICALID);

                if(validatedTaskIdList.contains(taskPhysicalId)) {
                    continue;
                }

                Set<String> taskPALPhysicalIdSet = new HashSet<>();

                Object taskPALPhysicalId    = taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
                if(taskPALPhysicalId != null){
                    if(taskPALPhysicalId instanceof StringList){
                        taskPALPhysicalIdSet.addAll((StringList) taskPALPhysicalId);
                    }else{
                        taskPALPhysicalIdSet.add((String)taskPALPhysicalId);
                    }
                }

                Object taskPALPhysicalIdFromParentTask =  taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_TASK);
                if(taskPALPhysicalIdFromParentTask != null){
                    if(taskPALPhysicalIdFromParentTask instanceof StringList){
                        taskPALPhysicalIdSet.addAll((StringList) taskPALPhysicalIdFromParentTask) ;
                    }else{
                        taskPALPhysicalIdSet.add((String)taskPALPhysicalIdFromParentTask);
                    }
                }

                Object taskPALPhysicalIdFromParentProject =  taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_PROJECT);
                if(taskPALPhysicalIdFromParentProject != null){
                    if(taskPALPhysicalIdFromParentProject instanceof StringList){
                        taskPALPhysicalIdSet.addAll((StringList) taskPALPhysicalIdFromParentProject) ;
                    }else{
                        taskPALPhysicalIdSet.add((String)taskPALPhysicalIdFromParentProject);
                    }
                }


                boolean isProject       = "TRUE".equalsIgnoreCase((String) taskMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE))
                        || "TRUE".equalsIgnoreCase((String) taskMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT));

                //avoid to add sub-project task in the 'Master project PAL
                if(taskPALPhysicalIdSet.contains(masterProjectPALPhysicalId)) {
                    validatedTaskIdList.add(taskPhysicalId);

                    //If Project Space/Concept connect in more than one ProjectSpace/ProjectConcept
                    //START:
                    StringList taskParentPhysicalIdList = new StringList();
                    Object taskParentPhysicalIdObj =  taskMap.get(ProgramCentralConstants.SELECT_PARENT_TASK_PHYSICALID);
                    if(taskParentPhysicalIdObj != null){
                        if(taskParentPhysicalIdObj instanceof StringList){
                            taskParentPhysicalIdList = (StringList) taskParentPhysicalIdObj;
                        }else{
                            taskParentPhysicalIdList.add((String)taskParentPhysicalIdObj);
                        }
                    }

                    String taskParentPhysicalId = "";
                    if(taskParentPhysicalIdList.size() >1 ){

                        //if it is connect to more than one parent , need to find actual parent id in current project.. so either it is master project or it is present in objectlist
                        for (String parentId : taskParentPhysicalIdList) {
                            if(projectPhysicalId.equalsIgnoreCase(parentId) || objectListMap.containsKey(parentId)){
                                taskParentPhysicalId = parentId;
                                break;
                            }
                        }

                    }else{
                        taskParentPhysicalId = taskParentPhysicalIdList.get(0);
                    }
                    //END:

                    Dataobject parentObj = palDataMap.get(taskParentPhysicalId);
                    if(parentObj == null) {
                        pal.assignSequence(context, taskParentPhysicalId, taskPhysicalId, null, null, isProject);
                        continue;
                    }

                    List<Dataobject> children = parentObj.getChildren();
                    int childrenSize = children != null ?children.size():0;

                    if(childrenSize > 0) {
                        Dataobject taskObj = children.stream()
                                .filter(childObj-> taskPhysicalId.equalsIgnoreCase(childObj.getId()))
                                .findAny()
                                .orElse(null);

                        // taskObj != null :- If taskObj is present under correct parent object then no need to perform any action
                        if(taskObj == null) {
                            taskObj = palDataMap.get(taskPhysicalId);
                            if(taskObj == null) {
                                //taskObj is not present under correct Parent obj also not present in palDataMap i.e. not connected under other parent object
                                pal.assignSequence(context, taskParentPhysicalId, taskPhysicalId, null, null, isProject);
                            }else {
                                //taskObj is not present under correct Parent obj but present in palDataMap i.e. connected under wrong parent object
                                String taskSeq = DataelementMapAdapter.getDataelementValue(taskObj, ProgramCentralConstants.KEY_SEQ_ID);
                                int iTaskSeq = Integer.parseInt(taskSeq);

                                Dataobject lastChild = children.get(childrenSize-1);
                                String lastChildSeq = DataelementMapAdapter.getDataelementValue(lastChild, ProgramCentralConstants.KEY_SEQ_ID);

                                String addBeforeObjId = "";

                                //If seqId of taskObj is less than seqId of last child object then find physical id of child object above which we are going to assign taskObj
                                //Else assign taskObj at last position under correct parent object
                                if(iTaskSeq < Integer.parseInt(lastChildSeq)) {

                                    List<Dataobject> result = children.stream()
                                            .filter(obj -> Integer.parseInt((String) obj.getDataelements().get(ProgramCentralConstants.KEY_SEQ_ID))>iTaskSeq)
                                            .collect(Collectors.toList());

                                    Sort sortItem = Sortdata.newSortItem(ProgramCentralConstants.KEY_SEQ_ID,SortType.INTEGER, com.dassault_systemes.enovia.e6wv2.foundation.jaxb.SortDirection.ASCENDING, ExpressionType.BUS);
                                    List<Sort> sortItemList = new ArrayList<>();
                                    sortItemList.add(sortItem);
                                    Sortdata.sortDataobjects(result, sortItemList);

                                    Dataobject addBeforeObj = result.get(0);
                                    addBeforeObjId = addBeforeObj.getId();
                                }

                                //Un-assign taskObj from wrong parent object
                                List<String> unassignedIdList = new ArrayList<>();
                                unassignedIdList.add(taskPhysicalId);
                                pal.unAssignSequence(context,unassignedIdList);

                                //Assign taskObj to correct parent object
                                pal.assignSequence(context, taskParentPhysicalId, taskPhysicalId, null, addBeforeObjId, isProject);
                            }
                        }
                    }else {

                        Dataobject taskObj = palDataMap.get(taskPhysicalId);
                        if(taskObj == null) {
                            pal.assignSequence(context, taskParentPhysicalId, taskPhysicalId, null, null, isProject);
                        }else{
                            //Un-assign taskObj from wrong parent object
                            List<String> unassignedIdList = new ArrayList<>();
                            unassignedIdList.add(taskPhysicalId);
                            pal.unAssignSequence(context,unassignedIdList);

                            //Assign taskObj to correct parent object
                            pal.assignSequence(context, taskParentPhysicalId, taskPhysicalId, null, null, isProject);
                        }
                    }
                }
            }

            //Un-assign additional objects which are not connected to Project
            Map<String, Dataobject> seqData = pal.getSequenceData(context);
            palObjIdSize = seqData.size();
            if(objIdSize < palObjIdSize) {

                List<String>unassignedIdList = palObjIdList.stream()
                        .filter(objId -> !objectIdList.contains(objId))
                        .collect(Collectors.toList());

                unassignedIdList.remove(projectPhysicalId);
                pal.unAssignSequence(context, unassignedIdList);
            //e3b : delete Risk connection if Risk is connected to stand alone task and Delete Risk object if it is last connection else delete connection.
                repairRisks(context, unassignedIdList);
            }

            pal.finishUpdateSession(context);

            seqData = pal.getSequenceData(context);
            Iterator<String> itr = seqData.keySet().iterator();
            loadMigratedOids(" ********************************************************** ");
            while(itr.hasNext()) {
                String id = itr.next();
                String seqId = DataelementMapAdapter.getDataelementValue(seqData.get(id), ProgramCentralConstants.KEY_SEQ_ID);
                String wbsId = DataelementMapAdapter.getDataelementValue(seqData.get(id), ProgramCentralConstants.KEY_WBS_ID);
                String level = DataelementMapAdapter.getDataelementValue(seqData.get(id), ProgramCentralConstants.KEY_LEVEL);
                String isProject = DataelementMapAdapter.getDataelementValue(seqData.get(id), ProgramCentralConstants.KEY_PROJECT);
                loadMigratedOids("PhysicalId : "+id );
                loadMigratedOids(" SeqID : "+seqId);
                loadMigratedOids(" WBSID : "+wbsId);
                loadMigratedOids(" Level : "+level);
                loadMigratedOids(" isProject : "+isProject);
                loadMigratedOids(" ********************************************************** ");

            }

            ContextUtil.commitTransaction(context);
        }catch(Exception me) {
            ContextUtil.abortTransaction(context);
            me.printStackTrace();
            throw me;
        }

        loadMigratedOids(" ***********************TIME REQUIRED TO COMPLETE VALIDATION :  "+(System.currentTimeMillis() - start)+" ms*********************************** ");
        loadMigratedOids(" ***********************VALIDATION FOR OBJECT : "+projectPhysicalId+"  COMPLETED *********************************** ");
    }


    private  void repairRisks(Context context, List unassignedIdList)throws Exception {
    	try {
    		
    		if(unassignedIdList !=null && unassignedIdList.size() >0) {	

    			String[] strarray = (String[])unassignedIdList.toArray(new String[0]);
    			StringList riskSelects = new StringList();
    			riskSelects.add("from[Risk].to.physicalid");        //RiskId

    			BusinessObjectWithSelectList  riskBwsl =ProgramCentralUtil.getObjectWithSelectList(context, strarray, riskSelects);
    			MapList RiskList = FrameworkUtil.toMapList(riskBwsl,riskSelects); 

    			int riskSize = RiskList.size();
    			StringList risks = new StringList();
    			for (int i = 0; i < riskSize; i++) {
    				Map mapObject = (Map) RiskList.get(i);
    				StringList riskIds =  (StringList)mapObject.get("from[Risk].to.physicalid");
    				if(riskIds !=null) { 
    					risks.addAll(riskIds);
    				}
    			}

    			String[] riskIdArray = (String[])risks.toArray(new String[0]);
    			StringList riskConnectionSelect = new StringList();
    			riskConnectionSelect.add("to[Risk].from.physicalid");           //Objects connected to Risk
    			riskConnectionSelect.add("to[Risk].physicalid"); 				//ConnectionIds of Risk and all object

    			BusinessObjectWithSelectList  bwsl1 =ProgramCentralUtil.getObjectWithSelectList(context, riskIdArray, riskConnectionSelect);

    			MapList RiskConectedObjList = FrameworkUtil.toMapList(bwsl1,riskConnectionSelect); 

    			StringList deletedRiskList = new StringList(); 
    			for (int i = 0; i < RiskConectedObjList.size(); i++) {
    				Map connectedObjectMap = (Map) RiskConectedObjList.get(i);
    				StringList objIds = (StringList) connectedObjectMap.get("to[Risk].from.physicalid");
    				if(objIds != null) { 
    					if(objIds.size()==1){
    						//delete Risk
    						String riskId = (String)risks.get(i);
    						if(!(deletedRiskList.contains(riskId))) {
    							String mqlCommand = "delete bus $1";
    							MqlUtil.mqlCommand(context, true, true, mqlCommand, true, riskId);

    						//MqlUtil.mqlCommand(context, "delete bus $1",true, riskId);
    						deletedRiskList.add(riskId);
    						}
    					}else {
    						StringList connectionIds = (StringList) connectedObjectMap.get("to[Risk].physicalid");

    						//If both the connected tasks are in unassignedIdList : delete Risk
    						int corruptIdCount = 0;
    						for(int m = 0; m < objIds.size(); m++) {
    							String taskId = (String)objIds.get(m);
    							if(unassignedIdList.contains(taskId)) {
    								corruptIdCount++;
    							}
    						}

    						if(corruptIdCount == objIds.size()) {
    							String riskId = (String)risks.get(i);
    							if(!(deletedRiskList.contains(riskId))) {
    								String mqlCommand = "delete bus $1";
        							MqlUtil.mqlCommand(context, true, true, mqlCommand, true, riskId);
    							//	MqlUtil.mqlCommand(context, "delete bus $1",true, riskId);
    								deletedRiskList.add(riskId);
    							}
    						}else {
    							//If Risk connected to other Objects than object from unassignedIdList : delete connection :This will disconnect risk from corrupt Task only. 
    							for(int j = 0; j < objIds.size(); j++) {
    								String taskId = (String)objIds.get(j);
    								if(unassignedIdList.contains(taskId)) {
    									String connectionId = (String)connectionIds.get(j);
    									MqlUtil.mqlCommand(context, "delete connection $1", true, connectionId);
    								}
    							}
    						}
    					}
    				}
    			}

    		}
    	}catch(Exception me) {
    		me.printStackTrace();
    		throw me;
    	}

    }
    
    /**
     * CLOUD: Correct the corrupted project.
     * @param context - Enovia object.
     * @param args - command line argument - args[0] - pass corrupted project Id.
     * @throws Exception if operation fails.
     */
    public void repairProject(Context context,String[] args) throws Exception{
        StringList mxObjectSelects = new StringList(6);
        mxObjectSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
        mxObjectSelects.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
        mxObjectSelects.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
        mxObjectSelects.addElement(SELECT_TYPE);
        mxObjectSelects.addElement(SELECT_NAME);
        mxObjectSelects.addElement(SELECT_REVISION);

        String projectId = args[0];

        if(projectId== null || projectId.isEmpty()) {
            throw new MatrixException("Pass valid objectId");
        }
        boolean force = false;
        if (args.length > 1) {
            String strForce = args[1];
            if (strForce.equalsIgnoreCase("force")) {
                force = true;
            }
        }

        fromMQL = true;

        BusinessObjectWithSelectList  bwsl =
                ProgramCentralUtil.getObjectWithSelectList(context, new String[] {projectId}, mxObjectSelects);

        MapList objList = FrameworkUtil.toMapList(bwsl);
        Map<String,String> projectMap = (Map<String,String>) objList.get(0);
        String palId = projectMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
        projectId = projectMap.get(ProgramCentralConstants.SELECT_PHYSICALID);

        if(palId != null && !palId.isEmpty()) {
            ProjectSequence pal = null;
            Map<String,Dataobject>palDataMap = null;
            boolean migrateProj = false;
            try {
                pal = new ProjectSequence(context, palId);
                palDataMap = pal.getSequenceData(context);
            }catch(IllegalArgumentException | javax.json.stream.JsonParsingException e) {
                migrateProj = true;
                e.printStackTrace();
            }

            if(force || migrateProj) { //migrate project
                String ATTRIBUTE_PROJECT_SEQUENCE = PropertyUtil.getSchemaProperty(context, "attribute_ProjectSequence");
                DomainObject palObj = DomainObject.newInstance(context, palId);
                palObj.setAttributeValue(context, ATTRIBUTE_PROJECT_SEQUENCE, DomainConstants.EMPTY_STRING);
                migrateRelBasedSequenceProject(context, pal, projectId, palId);
            }else { //validate the project
                validatePALBasedSequenceProject(context, pal,  projectId, palId, palDataMap);
            }
        }
    }

    /**
     * This method will migrate Gate/Milestone objects of non completed projects / project concept / project template / experiment and its subtypes
     * It is delivered with IR-696060
     * @param context
     * @param objectList : List of object to be migrated
     * @throws Exception
     *
     */
    private void migrateGateMilestoneObjects(Context context, MapList objectList) throws Exception
    {
        /* Relationship between all type and type Checklist*/
        String  RELATIONSHIP_CHECKLIST = PropertyUtil.getSchemaProperty("relationship_Checklist");

        mqlLogRequiredInformationWriter(" *********************** MIGRATION FOR GATE/MILESTONE STARTED *********************** ");

        long start = System.currentTimeMillis();
        try {
            MapList projectTaskList = new MapList();
            int objectListSize =  objectList.size();
            mqlLogRequiredInformationWriter(" *********************** TOTAL NUMBER OF NON COMPLETED PROJECTS REQUIRED TO MIGRATE : "+objectListSize+" *********************** ");
            for (int i = 0; i < objectListSize; i++) {
                Map objectInfo          = (Map) objectList.get(i);
                String projectSpaceId   = (String) objectInfo.get(SELECT_ID);
                String projectName      = (String) objectInfo.get(SELECT_NAME);

                loadMigratedOids("PROJECT - "+ projectName + " - ID : "+ projectSpaceId);

                String typePattern = ProgramCentralConstants.TYPE_TASK_MANAGEMENT;
                String whereClause = "current != "+ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE;

                ProgramCentralUtil.pushUserContext(context);
                DomainObject projectObject = newInstance(context, projectSpaceId);
                projectTaskList = projectObject.getRelatedObjects(
                                    context,               // context
                                    Task.RELATIONSHIP_SUBTASK,  // relationshipPattern
                                    typePattern,                // typePattern
                                    new StringList(SELECT_ID),  // objectSelects
                                    null,                   // relationshipSelects
                                    false,                  // getTo,
                                    true,                   // getFrom
                                    (short) 0,              // recurseToLevel
                                    whereClause,            // objectWhere
                                    null,                   // relationshipWhere
                                    (short) 0,              // limit
                                    false,                  // check hidden
                                    false,                  // prevent duplicates
                                    (short) 1000,           // page size
                                    null, null, null, null);// includeType, includeRelationship, postPatterns, relKeyPrefix
                ProgramCentralUtil.popUserContext(context);

                int size = projectTaskList.size();
                loadMigratedOids("TOTAL NUMEBR OF PROJECT OBJECTS : "+size);

                String []objIds = new String[size];

                for(int j=0;j<size;j++){
                    Map objectMap = (Map)projectTaskList.get(j);
                    objIds[j] = (String)objectMap.get(SELECT_ID);
                }

                StringList objectSelect = new StringList(8);
                objectSelect.addElement(SELECT_ID);
                objectSelect.addElement(SELECT_TYPE);
                objectSelect.addElement(SELECT_CURRENT);
                objectSelect.addElement(SELECT_POLICY);
                objectSelect.addElement(ProgramCentralConstants.SELECT_KINDOF_TASK);
                objectSelect.addElement(ProgramCentralConstants.SELECT_KINDOF_PHASE);
                objectSelect.addElement(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
                objectSelect.addElement(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_DURATION);

                BusinessObjectWithSelectList objectWithSelectList =
                        ProgramCentralUtil.getObjectWithSelectList(context,objIds,objectSelect);

                boolean isRollupNeeded = false;
                if(!objectWithSelectList.isEmpty()){
                    //Need to iterate through all the Objects
                    for(int j=0; j<size; j++) {
                        BusinessObjectWithSelect bows = objectWithSelectList.getElement(j);
                        String isKindOfTask     = bows.getSelectData(ProgramCentralConstants.SELECT_KINDOF_TASK);
                        String isKindOfPhase    = bows.getSelectData(ProgramCentralConstants.SELECT_KINDOF_PHASE);
                        String objectId         = bows.getSelectData(SELECT_ID);

                        //If type is KindOf "Task" or "Phase" will skip those objects
                        if("True".equalsIgnoreCase(isKindOfTask) || "True".equalsIgnoreCase(isKindOfPhase)){

                            mqlLogRequiredInformationWriter("Skipping object <<" + objectId + ">>, NO MIGRATION NEEDED AS TYPE IS EITHER KIND OF TASK/PHASE ");

                            // Add object to list of unconverted OIDs
                            String comment = "Skipping object <<" + objectId + ">> NO MIGRATION NEEDED";
                            writeUnconvertedOID(comment, objectId);

                            continue;
                        }

                        //Retrieve Gate/Milestone information to migrate
                        String objectPolicy = bows.getSelectData(SELECT_POLICY);
                        String objectType   = bows.getSelectData(SELECT_TYPE);
                        String objectState  = bows.getSelectData(SELECT_CURRENT);
                        String isSummary    = bows.getSelectData(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);

                        DomainObject domainObject = newInstance(context, objectId);

                        if("True".equalsIgnoreCase(isSummary)){
                            isRollupNeeded = true;
                            if(ProgramCentralConstants.TYPE_GATE.equals(objectType)){

                                //Find all checklist objects Connected with summary Gate
                                StringList checkListInfo = domainObject.getInfoList(context, "from["+ RELATIONSHIP_CHECKLIST +"].to.id");
                                String [] strChecklistIDArr = new String[checkListInfo.size()];
                                checkListInfo.toArray(strChecklistIDArr);

                                //Delete all Connected checklist
                                DomainObject.deleteObjects(context,strChecklistIDArr);

                            }
                            //Policy Change from "Project Review" To "Project Task"
                            mqlLogRequiredInformationWriter("Changing the Policy of object " + objectId+" from "+objectPolicy+" to "+ProgramCentralConstants.POLICY_PROJECT_TASK+ " becasue it is summary");
                            domainObject.setPolicy(context, ProgramCentralConstants.POLICY_PROJECT_TASK);

                            //Type Change from "Gate/Milestone" To "Phase"
                            mqlLogRequiredInformationWriter("Changing the Type of object " + objectId+" from "+objectType+" to "+ProgramCentralConstants.TYPE_PHASE + " becasue it is summary");
                            String mqlCommandTypeModify = "modify bus $1 type  $2";
                            MqlUtil.mqlCommand(context, mqlCommandTypeModify, objectId, ProgramCentralConstants.TYPE_PHASE);

                            // Add object to list of converted OIDs - (Gate/Milestone)
                            loadMigratedOids("Summary Gate/Milestone Converted : "+objectId);

                        }else {
                            isRollupNeeded = true;
                            String estimatedDuration = bows.getSelectData(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_DURATION);

                            //Set Estimated Duration To "0" if not equals to 0
                            if(!"0.0".equals(estimatedDuration)){
                                domainObject.setAttributeValue(context, ProgramCentralConstants.ATTRIBUTE_TASK_ESTIMATED_DURATION, "0");
                            }

                            //Policy Change from "Project Task" to "Project Review"
                            if(ProgramCentralConstants.POLICY_PROJECT_TASK.equals(objectPolicy)){
                                mqlLogRequiredInformationWriter("Changing the Policy of object " + objectId +" from "+objectPolicy+" to "+ProgramCentralConstants.POLICY_PROJECT_REVIEW);
                                domainObject.setPolicy(context, ProgramCentralConstants.POLICY_PROJECT_REVIEW);
                            }

                            if(ProgramCentralConstants.STATE_PROJECT_TASK_ASSIGN.equalsIgnoreCase(objectState)){
                                domainObject.setState(context, ProgramCentralConstants.STATE_PROJECT_TASK_CREATE);
                            }else if(ProgramCentralConstants.STATE_PROJECT_TASK_ACTIVE.equalsIgnoreCase(objectState)){
                                domainObject.setState(context, ProgramCentralConstants.STATE_PROJECT_TASK_REVIEW);
                                domainObject.setAttributeValue(context, ATTRIBUTE_PERCENT_COMPLETE, "100");
                            }

                            // Add object to list of converted OIDs - (Gate/Milestone)
                            loadMigratedOids("Leaf Gate/Milestone Converted : "+objectId);
                        }
                    }
                }

                if(isRollupNeeded){
                    TaskDateRollup.rolloutProject(context,new StringList(projectSpaceId), false);
                }

                mqlLogRequiredInformationWriter(" *********************** TOTAL TIME REQUIRED FOR MIGRATION : "+(System.currentTimeMillis() - start)+" ms *********************** ");
                mqlLogRequiredInformationWriter(" *********************** MIGRATION FOR GATE/MILESTONE COMPLETED *********************** ");
            }

        }catch (Exception ex) {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }
    }

    private void validateProjectSequenceAttribute(Context context, MapList objectList) throws Exception
        {

            try{
                mqlLogRequiredInformationWriter("================Validation for SequenceId started=====================");
                long start = System.currentTimeMillis();

                int objectListSize = objectList.size();
                mqlLogRequiredInformationWriter("================Total number of objects : "+objectListSize+"=====================");

                for(int i = 0; i<objectListSize ; i++)
                {
                    Map objectInfo = (Map)objectList.get(i);
                    String name = (String)objectInfo.get(ProgramCentralConstants.SELECT_NAME);
                    String type = (String)objectInfo.get(ProgramCentralConstants.SELECT_TYPE);
                    String revision = (String)objectInfo.get(SELECT_REVISION);
                    String created = (String)objectInfo.get(SELECT_ORIGINATED);
                    String modified = (String)objectInfo.get(SELECT_MODIFIED);
                    String projectPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PHYSICALID);

                    String masterProjectPALPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
                    if(ProgramCentralUtil.isNullString(masterProjectPALPhysicalId)) {
                        masterProjectPALPhysicalId = (String)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
						
                        if(ProgramCentralUtil.isNullString(masterProjectPALPhysicalId)) {
                        	String comment = "Skipping object <<" + projectPhysicalId + ">> NO MIGRATIION NEEDED AS DON'T HAVE PAL CONNECTED";
                        	writeUnconvertedOID(comment, projectPhysicalId);
                        	continue;
                        }
                    }


                    loadMigratedOids("***********************Validation for object : "+projectPhysicalId+"  started*********************************** ");
                    loadMigratedOids("Type : "+type);
                    loadMigratedOids("Name : "+name);
                    loadMigratedOids("Revision : "+revision);
                    loadMigratedOids("Created : "+created);
                    loadMigratedOids("Modified : "+modified);
                    loadMigratedOids("PAL Id : "+masterProjectPALPhysicalId);

                    boolean isDataReadable = true;
                    Map<String,Dataobject>palDataMap = null;
                    ProjectSequence pal = new ProjectSequence(context, masterProjectPALPhysicalId);
                    try {
                        palDataMap = pal.getSequenceData(context);
                    } catch (Exception e) {
                        isDataReadable = false;
                    }


                    if(palDataMap == null || palDataMap.size()==0 ) {
                        loadMigratedOids("Failed : Does not have value in PROJECTSEQUENCE attribute.");
                        if(!isDataReadable) {
                            loadMigratedOids("Reason : PROJECTSEQUENCE attribute is not readable.");
                        }
                        loadMigratedOids("***********************Validation for object : "+projectPhysicalId+"  completed *********************************** ");
                    }else {
                        validateSequenceProjectData(context, pal,  projectPhysicalId, masterProjectPALPhysicalId, palDataMap, objectInfo);
                    }
                }

                mqlLogRequiredInformationWriter("================Total time required for validation : "+(System.currentTimeMillis() - start)+" ms =====================");
                mqlLogRequiredInformationWriter("================Validation for SequenceId completed=====================");
            }
            catch(Exception ex) {
                // ex.printStackTrace();
                throw ex;
            }

        }

        private void validateSequenceProjectData(Context context,
                ProjectSequence pal,
                String projectPhysicalId,
                String masterProjectPALPhysicalId,
                Map<String,Dataobject>palDataMap,
                Map objectInfo) throws Exception
        {

            long start = System.currentTimeMillis();
            Set<String> validatedTaskIdList = new HashSet<>();
            try {

                MapList objectList = new MapList();

                try {
                    Task task = new Task(projectPhysicalId);
                    StringList objectSelect = new StringList(2);
                    objectSelect.addElement(ProgramCentralConstants.SELECT_PHYSICALID);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PARENT_TASK_PHYSICALID);
                objectSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                objectSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);

                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_TASK);
                objectSelect.addElement(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_PROJECT);

                objectSelect.addElement(SELECT_SUBTASK_IDS);

                StringList relationshipSelects = new StringList(2);
                relationshipSelects.addElement(DomainConstants.SELECT_LEVEL);
                relationshipSelects.addElement(SubtaskRelationship.SELECT_SEQUENCE_ORDER);

                objectList = Task.getTasks(context, task, 0, objectSelect, relationshipSelects);
                } catch (Exception e) {
                    throw new MatrixException();
                }


                Set<String> ObjIdSet = new HashSet<>();
                Map<String, Map<String,Object>> objectListMap = new HashMap<>();

                Set<String> noSeqIdObjectIds = new HashSet<>();
                Set<String> validObjectIds = new HashSet<>();

                //Contains object ids those are not connected to tasks.
                //These objects may be : 1. stale or  2. present in database and not connected to to current project (for example subproject)
                Set<String> invalidObjectIds = palDataMap.keySet();
            int highestSeqId = 0;
            int taskCount = 0;
                boolean validSequenceOrder = true;
                int objectListSize = objectList.size();

            for(int i=0; i<objectListSize; i++){
                    Map taskMap     = (Map)objectList.get(i);
                    String taskPhysicalId       = (String) taskMap.get(ProgramCentralConstants.SELECT_PHYSICALID);

                String taskPALPhysicalId        = (String) taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);

                boolean isProject       = "TRUE".equalsIgnoreCase((String) taskMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE))
                        || "TRUE".equalsIgnoreCase((String) taskMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT));

                Set<String> taskPALPhysicalIdSet = new HashSet<>();

                if(isProject) {
                    Object taskPALPhysicalIdFromParentTask =  taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_TASK);
                    if(taskPALPhysicalIdFromParentTask != null){
                        if(taskPALPhysicalIdFromParentTask instanceof StringList){
                            taskPALPhysicalIdSet.addAll((StringList) taskPALPhysicalIdFromParentTask) ;
                        }else{
                            taskPALPhysicalIdSet.add((String)taskPALPhysicalIdFromParentTask);
                        }
                    }

                    Object taskPALPhysicalIdFromParentProject =  taskMap.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PARENT_PROJECT);
                    if(taskPALPhysicalIdFromParentProject != null){
                        if(taskPALPhysicalIdFromParentProject instanceof StringList){
                            taskPALPhysicalIdSet.addAll((StringList) taskPALPhysicalIdFromParentProject) ;
                        }else{
                            taskPALPhysicalIdSet.add((String)taskPALPhysicalIdFromParentProject);
                        }
                    }
                }


                boolean isConnectedToMasterProject = masterProjectPALPhysicalId.equalsIgnoreCase(taskPALPhysicalId)
                        || taskPALPhysicalIdSet.contains(masterProjectPALPhysicalId);
                if(isConnectedToMasterProject) {
                    taskCount++;

                    int seqId = Integer.parseInt((String) taskMap.get(SubtaskRelationship.SELECT_SEQUENCE_ORDER));

                    //Checking whether task has correct sequence id
                    if(taskCount != seqId) {
                        validSequenceOrder = false;
                    }

                    if(!palDataMap.containsKey(taskPhysicalId)) {
                        //Task is connected to Project but don't have sequence id.
                        noSeqIdObjectIds.add(taskPhysicalId);
                    }else {
                        //Task is connected to Project and have sequence id.
                        validObjectIds.add(taskPhysicalId);
                        int taskSeqId = Integer.parseInt(DataelementMapAdapter.getDataelementValue(palDataMap.get(taskPhysicalId), ProgramCentralConstants.KEY_SEQ_ID));
                        highestSeqId = taskSeqId > highestSeqId ? taskSeqId : highestSeqId;
                    }

                    //Removing taskPhysicalId as it is valid (connected to project)
                    invalidObjectIds.remove(taskPhysicalId);
                }
            }

                //Removing project entry
                invalidObjectIds.remove(projectPhysicalId);

            boolean isLastSeqIdCorrect = (highestSeqId == taskCount);

            boolean  areAllObjectsValid = ((validObjectIds.size() == taskCount)
                        && invalidObjectIds.size()==0 && validSequenceOrder && isLastSeqIdCorrect);


                if (areAllObjectsValid) {
                    loadMigratedOids("Passed : All objects are valid in PROJECTSEQUNCE attribute.");
                } else {
                    loadMigratedOids("Failed : Some of the tasks in PROJECTSEQUNCE attribute are stale or not connected to project.");


                    if (invalidObjectIds.size() > 0) {
                        loadMigratedOids("List of invalid IDs : " + invalidObjectIds.toString());
                    }

                    if (noSeqIdObjectIds.size() > 0) {
                        loadMigratedOids("Reason : Some of the tasks don't have sequence id assigned. Need to run migration to correct sequence ID data.");
                        loadMigratedOids("List of IDs those don't have sequence Id: " + noSeqIdObjectIds.toString());
                    }

                    if (!(isLastSeqIdCorrect && validSequenceOrder)) {
                        loadMigratedOids("Reason : Sequence IDs are not in correct order. Need to run migration to correct sequence ID data.");
                    }
                    String comment = (String)objectInfo.get(SELECT_TYPE) + "," + (String)objectInfo.get(SELECT_NAME) + "," + (String)objectInfo.get(SELECT_REVISION) + "," + (String)objectInfo.get(SELECT_ORIGINATED) + "," + (String)objectInfo.get(SELECT_MODIFIED) + System.getProperty("line.separator");
                    writeUnconvertedOID(comment, projectPhysicalId);
                }

            }catch(Exception me) {
                me.printStackTrace();
                throw me;
            }

            loadMigratedOids("***********************Time required to complete validation :  "+(System.currentTimeMillis() - start)+" ms*********************************** ");
            loadMigratedOids("***********************Validation for object : "+projectPhysicalId+"  completed *********************************** ");
            loadMigratedOids("");
            loadMigratedOids("");
    }

    /**
     *
     * @override
     */
    public void mqlLogRequiredInformationWriter(String command) throws Exception
    {
        if (fromMQL) {
            System.out.println(command);
        } else {
            super.mqlLogRequiredInformationWriter(command +"\n");
        }
    }

    /**
     *
     * @override
     */
    public void mqlLogWriter(String command) throws Exception
    {
        if (fromMQL) {
            System.out.println(command);
        } else {
            super.mqlLogWriter(command +"\n");
        }
    }

    /**
     *
     * @override
     */

    public void loadMigratedOids (String objectId) throws Exception
    {
        if (fromMQL) {
            System.out.println(objectId);
        } else {
            String newLine = System.getProperty("line.separator");
            super.loadMigratedOids(objectId + newLine);
        }
    }

	/**
	 * This method work calendar object to set attribute "Working Times" based on Work Start/Finish Time and Lunch Start/Finish Time
	 */
	private void migrateWorkingTimes(Context context, MapList objectList) throws Exception
	{

		try{

			ContextUtil.pushContext(context);

			String comment  = ProgramCentralConstants.EMPTY_STRING;
			mqlLogRequiredInformationWriter("===============MIGRATION FOR UPDATION OF ATTRIBUTE[WORKING TIMES] STARTED===================");
			DomainObject calendarObj = DomainObject.newInstance(context);


			for(int i = 0, j = objectList.size(); i<j ; i++)
			{
				Map objectInfo = (Map)objectList.get(i);
				String calendarId = (String)objectInfo.get(SELECT_ID);
				String calendarName = (String)objectInfo.get(SELECT_NAME);
				calendarObj.setId(calendarId);
				
				loadMigratedOids("Migration Started for calendar :  ID : " + calendarId + " Name : " + calendarName);

				StringList busSelect = new StringList(ProgramCentralConstants.SELECT_ID);
				StringList relSelect = new StringList(DomainRelationship.SELECT_ID);
				relSelect.add(WorkCalendar.SELECT_WORKING_TIMES);
				relSelect.add(WorkCalendar.SELECT_WORK_START_TIME);
				relSelect.add(WorkCalendar.SELECT_WORK_FINISH_TIME);
				relSelect.add(WorkCalendar.SELECT_LUNCH_START_TIME);
				relSelect.add(WorkCalendar.SELECT_LUNCH_FINISH_TIME);

				MapList eventInfoList = calendarObj.getRelatedObjects(context,
						RELATIONSHIP_CALENDAR_EVENT,
						QUERY_WILDCARD,
						false,
						true,
						1,
						busSelect,
						relSelect,
						"",
						null,
						0,
						null,
						null,
						null);

				
				for(int k=0, size=eventInfoList.size(); k<size; k++) {
					Map eventInfoMap = (Map)eventInfoList.get(k);

					String workingTimes = (String)eventInfoMap.get(WorkCalendar.SELECT_WORKING_TIMES);

					if(ProgramCentralUtil.isNullString(workingTimes)) {
						
						String workStartTime = String.format("%04d", Integer.parseInt((String)eventInfoMap.get(WorkCalendar.SELECT_WORK_START_TIME)));
						String workFinishTime = String.format("%04d", Integer.parseInt((String)eventInfoMap.get(WorkCalendar.SELECT_WORK_FINISH_TIME)));
						String lunchStartTime = String.format("%04d", Integer.parseInt((String)eventInfoMap.get(WorkCalendar.SELECT_LUNCH_START_TIME)));
						String lunchFinishTime = String.format("%04d", Integer.parseInt((String)eventInfoMap.get(WorkCalendar.SELECT_LUNCH_FINISH_TIME)));
						
						StringBuilder sb = new StringBuilder();
						if(lunchStartTime.equalsIgnoreCase(lunchFinishTime)) {
							//No-recess Calendar : Don't save recess timing
							// Working time will be stored as "workStartTime-workFinishTime" , example : 0800-1700
							sb.append(workStartTime).append("-").append(workFinishTime);
						}
						else {
							// Working time will be stored as "workStartTime-lunchStartTime,lunchFinishTime-workFinishTime" , example : 0800-1200,1300-1700
							sb.append(workStartTime).append("-").append(lunchStartTime).append(",");
							sb.append(lunchFinishTime).append("-").append(workFinishTime);
						}

						String connectionId = (String)eventInfoMap.get(DomainRelationship.SELECT_ID);
						DomainRelationship rel = new DomainRelationship(connectionId);
						Map attrMap = new HashMap();
						workingTimes = sb.toString();
						attrMap.put("Working Times", workingTimes); 
						rel.setAttributeValues(context, attrMap);
						loadMigratedOids("Event :  ID : " + calendarId + " migrated successfully.");
					}else {
						loadMigratedOids("Event :  ID : " + calendarId + " migration not required.");
					}
				}
				
				loadMigratedOids("Migration completed for calendar :  ID : " + calendarId + " Name : " + calendarName);

			}
			mqlLogRequiredInformationWriter("================MIGRATION FOR UPDATION OF ATTRIBUTE[WORKING TIMES] COMPLETED=====================");
		}
		catch(Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
		finally
		{
			ContextUtil.popContext(context);
		}
	}
	

}
