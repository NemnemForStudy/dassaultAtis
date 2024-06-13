/* emxProjectManagement.java

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne, Inc.  Copyright notice is precautionary only and does
   not evidence any actual or intended publication of such program.

   static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.19.2.1 Thu Dec  4 07:56:05 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.19 Wed Oct 22 15:50:33 2008 przemek Experimental przemek $
*/

import java.io.*;
import java.util.*;
import matrix.db.*;
import matrix.util.*;

import com.matrixone.apps.common.WorkspaceVault;
import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.Assessment;
import com.matrixone.apps.program.Experiment;
import com.matrixone.apps.program.FinancialItem;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.ProjectBaseline;
import com.matrixone.apps.program.ProjectSpace;
import com.matrixone.apps.program.Quality;
import com.matrixone.apps.program.ResourcePlanTemplate;
import com.matrixone.apps.program.Risk;
import com.matrixone.apps.program.Task;

/**
 * The <code>emxProjectManagement</code> class represents the Project Management
 * JPO functionality for the AEF type.
 *
 * @version AEF 9.5.2.0 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxProjectManagement_mxJPO extends emxProjectManagementBase_mxJPO
{

    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since PMC 10.0.0.0
     */
    public emxProjectManagement_mxJPO (Context context, String[] args)
        throws Exception
    {
        super(context, args);
    }

    /**
     * Constructs a new emxProjectManagement JPO object.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param String the business object id
     * @throws Exception if the operation fails
     * @since 10.0.0.0
     */
    public emxProjectManagement_mxJPO (String id)
        throws Exception
    {
        // Call the super constructor
        super(id);
    }
    
    public int triggerDeleteOverride(Context context,String[] args) throws Exception {

        final int DO_NOT_REPLACE_EVENT = 0;
        final int REPLACE_EVENT = 1;
        int triggerAction = DO_NOT_REPLACE_EVENT;
        boolean isPushedContext = false; 
        String strErrorMsg = ProgramCentralConstants.EMPTY_STRING;
        try
        {
            // [ADDED::PRG:RG6:Jan 21, 2011:IR-089218V6R2012 :R211::]
            String sUserAgent = PropertyUtil.getSchemaProperty(context, "person_UserAgent");

            //The first time this function is called this value will be false
            //second time around this will be true
            //Instead of recurssing through each of the subtasks the program
            //gets all the tasks in one call and deletes all the tasks
            //thereon if the sub-tasks call this function it returns without
            //doing anything
            //**Start**

            //Modified:27-Dec-2010:s4e:R211 PRG:IR-068141V6R2012 
            //Moved this code here because this code needs to get called recursively for Phase Delete.

            String objectId = args[0];
            ProjectSpace project = new ProjectSpace(objectId);

            String SELECT_PROJECT_BASELINE_ID = "from["+ProgramCentralConstants.RELATIONSHIP_PROJECT_BASELINE+"].to.id";
            String SELECT_EXPERIMENT_ID =  "from["+ProgramCentralConstants.RELATIONSHIP_EXPERIMENT+"].to.id";
            StringList multiValueSelectables = new StringList(2);
			multiValueSelectables.add(SELECT_PROJECT_BASELINE_ID);
			multiValueSelectables.add(SELECT_EXPERIMENT_ID);

            StringList selectables = new StringList(9);
            selectables.add(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);
            selectables.add(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
            selectables.add(SELECT_OWNER);
            selectables.add("to["+DomainConstants.RELATIONSHIP_SUBTASK+"].from.current.access[modify]");
            selectables.add("from[" + RELATIONSHIP_BASELINE_LOG + "].to.id");
            selectables.add("to[" + RELATIONSHIP_PROJECT_ACCESS_LIST + "].from.id");
			
			selectables.add("physicalId");
            
            selectables.add(SELECT_PROJECT_BASELINE_ID);
            selectables.add(SELECT_EXPERIMENT_ID);

            Map typeInfo = project.getInfo(context, selectables,multiValueSelectables);

            String isKindOfTaskManagement = (String) typeInfo.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
            String isKindOfProject = (String) typeInfo.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);
            String ownerName  = (String) typeInfo.get(SELECT_OWNER);
            String hasModifyOnParent  = (String) typeInfo.get("to["+DomainConstants.RELATIONSHIP_SUBTASK+"].from.current.access[modify]");
            String logged_in_user = (String)context.getUser();
            String baselineLogId = (String)typeInfo.get("from[" + RELATIONSHIP_BASELINE_LOG + "].to.id");
            String accessListId = (String)typeInfo.get("to[" + RELATIONSHIP_PROJECT_ACCESS_LIST + "].from.id");
			
			String strPhysicalId = (String)typeInfo.get("physicalid");
			
            StringList projectBaselineIdList = (StringList)typeInfo.get(SELECT_PROJECT_BASELINE_ID);
            StringList experimentProjectIdList = (StringList)typeInfo.get(SELECT_EXPERIMENT_ID);

            boolean haveAccesToDelete = true;

            //If logged in user is not owner of the project then don't allow to delete..
            if("TRUE".equalsIgnoreCase(isKindOfProject) && !logged_in_user.equalsIgnoreCase(ownerName)){
                haveAccesToDelete = false;
            }
            //If logged in user have modify access on parent task/Project then allow to delete.
            if("TRUE".equalsIgnoreCase(isKindOfTaskManagement) && !logged_in_user.equalsIgnoreCase(ownerName) && "FALSE".equalsIgnoreCase(hasModifyOnParent)){
                haveAccesToDelete = false;
            }
            
            if(!haveAccesToDelete && !"User Agent".equalsIgnoreCase(logged_in_user) && !context.isAssigned("decSystemAdmin")){
                throw new Exception(EnoviaResourceBundle.getProperty(context,"ProgramCentral","emxProgramCentral.Project.NoRightsToDeleteTask",context.getSession().getLanguage()));
                    }
            //Added:4-Jun-2010:di1:R210 PRG:Advanced Resource Planning

            if("TRUE".equalsIgnoreCase(isKindOfProject)){

                final String RESOURCE_REQUEST_PHASE = "to["+ResourcePlanTemplate.RELATIONSHIP_PHASE_FTE+"].from."+SELECT_ID;
                final String LIST_OF_CONNECTED_PHASE_IDS = "from["+ResourcePlanTemplate.RELATIONSHIP_PHASE_FTE+"].to."+SELECT_ID;
                StringList resourceRequestList = project.getInfoList(context, RESOURCE_REQUEST_PHASE);

                if(null!=resourceRequestList && resourceRequestList.size()>0)
                {
                    String[] reourceRequestIdArr=new String[resourceRequestList.size()];                    
                    resourceRequestList.copyInto(reourceRequestIdArr) ;                 
                    StringList busSelect=new StringList(LIST_OF_CONNECTED_PHASE_IDS);
                    StringList slToDeleteResourceReq=new StringList();
                    BusinessObjectWithSelectList resourceRequestObjWithSelectList = BusinessObject.getSelectBusinessObjectData(context, reourceRequestIdArr, busSelect);
                    BusinessObjectWithSelect bows = null;
                    for(BusinessObjectWithSelectItr itr= new BusinessObjectWithSelectItr(resourceRequestObjWithSelectList); itr.next();)
                    {
                        bows = itr.obj();               
                        StringList slPhaseIds = bows.getSelectDataList(LIST_OF_CONNECTED_PHASE_IDS);
                        if(null!=slPhaseIds && slPhaseIds.size()==1)
                        {   
                            slToDeleteResourceReq.add(bows.getObjectId());
                        }
                    }
                    if(null!=resourceRequestList && slToDeleteResourceReq.size()>0)
                    {
                        reourceRequestIdArr=new String[slToDeleteResourceReq.size()];
                        slToDeleteResourceReq.copyInto(reourceRequestIdArr);
                        isPushedContext = false;
                        ContextUtil.pushContext(context, sUserAgent, DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING); // [ADDED::PRG:RG6:Jan 21, 2011:IR-089218V6R2012 :R211::Start] 
                        isPushedContext = true;
                        try
                        {
                            DomainObject.deleteObjects(context, reourceRequestIdArr);
                        }
                        finally
                        {
                            if(isPushedContext)
                            {
                                ContextUtil.popContext(context);
                            }
                        }
                    }
                }
            }
            //End Added:4-Jun-2010:di1:R210 PRG:Advanced Resource Planning

            //Modified:27-Dec-2010:s4e:R211 PRG:IR-068141V6R2012
            //**End**
            if (doNotRecurse)
            {
                //function called recursively return without doing anything
                return 0;
            }

            doNotRecurse = true;

            // get values from args.
            com.matrixone.apps.common.ICDocument ic = new com.matrixone.apps.common.ICDocument();
            DomainObject domainObject = DomainObject.newInstance(context);
            com.matrixone.apps.program.Task task = new Task();
            com.matrixone.apps.common.WorkspaceVault workspaceVault = null;
            com.matrixone.apps.program.Assessment assessment = null;
            com.matrixone.apps.program.Risk risk = new Risk();
            com.matrixone.apps.program.FinancialItem financialItem = null;
            com.matrixone.apps.program.URL bookmark = null;
            com.matrixone.apps.program.Quality quality = null;
            com.matrixone.apps.common.Route route = null;
            com.matrixone.apps.common.Message discussion = null;

            StringList busSelects = new StringList();

            if("TRUE".equalsIgnoreCase(isKindOfProject)){

                //delete the project folders
                busSelects.add(WorkspaceVault.SELECT_ID);
                String workspaceVaultType = project.TYPE_PROJECT_VAULT;
                MapList vaultList = workspaceVault.getWorkspaceVaults(context, project, busSelects, 0);
                if (vaultList.size() > 0)
                {
                    Iterator itr1 = vaultList.iterator();
                    while (itr1.hasNext())
                    {
                        Map map = (Map) itr1.next();
                        String vaultId = (String) map.get(WorkspaceVault.SELECT_ID);
                        domainObject.setId(vaultId);
                        domainObject.remove(context);
                    }
                }

                //delete the project assessments
                busSelects.clear();
                busSelects.add(Assessment.SELECT_ID);
                MapList assessmentList = assessment.getAssessments(context,project, busSelects, null, null, null);

                if (assessmentList.size() > 0)
                {
                    Iterator itr1 = assessmentList.iterator();
                    while (itr1.hasNext())
                    {
                        Map map = (Map) itr1.next();
                        String assessmentId = (String) map.get(Assessment.SELECT_ID);
                        domainObject.setId(assessmentId);
                        domainObject.remove(context);
                    }
                }

                //delete all the Quality objects
                busSelects.clear();
                busSelects.add(Quality.SELECT_ID);
                MapList qualityList = quality.getQualityItems(context, project, busSelects, null);
                if (qualityList.size() > 0)
                {
                    Iterator itr1 = qualityList.iterator();
                    while (itr1.hasNext())
                    {
                        Map map = (Map) itr1.next();
                        String qualityId = (String) map.get(Quality.SELECT_ID);
                        domainObject.setId(qualityId);
                        domainObject.remove(context);
                    }
                }

                //delete the financials associated with this project
                busSelects.clear();
                busSelects.add(FinancialItem.SELECT_ID);
                MapList financialList = financialItem.getFinancialItems(context,project, busSelects);
                if (financialList.size() > 0)
                {
                    isPushedContext = false;
                    ContextUtil.pushContext(context, sUserAgent, DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING); // [ADDED::PRG:RG6:Jan 21, 2011:IR-089218V6R2012 :R211::Start] 
                    isPushedContext = true;
                    try
                    {
                        Iterator itr1 = financialList.iterator();
                        while (itr1.hasNext())
                        {
                            Map map = (Map) itr1.next();
                            String financialId = (String) map.get(FinancialItem.SELECT_ID);
                            domainObject.setId(financialId);
                            domainObject.remove(context);
                        }
                    }
                    finally
                    {
                        if(isPushedContext)
                        {
                            ContextUtil.popContext(context);       // [ADDED::PRG:RG6:Jan 21, 2011:IR-089218V6R2012 :R211::End]
                        }
                    }
                }

                //delete the Baseline Log object
                if(ProgramCentralUtil.isNotNullString(baselineLogId))
                {
                    domainObject.setId(baselineLogId);
                    domainObject.remove(context);
                }

                //delete Project Baseline connected to Project.
	            if(projectBaselineIdList!= null && projectBaselineIdList.size()>0){
	                for(int i=0;i<projectBaselineIdList.size();i++){
	                    String strBaselineId = (String)projectBaselineIdList.get(i);
	                    ProjectBaseline baseline = new ProjectBaseline();
	                    baseline.delete(context, strBaselineId);
	                }
	            }

                //Delete Experiment project from Project space
                if(experimentProjectIdList!= null && experimentProjectIdList.size()>0){
                    for(int i=0;i<experimentProjectIdList.size();i++){
                        String strExperimentId = (String)experimentProjectIdList.get(i);
                        Experiment experiment = new Experiment();
                        experiment.delete(context, strExperimentId);
                    }
                }

                //delete the resource Requests associated with Project Space

                StringList slBusSelects = new StringList();
                slBusSelects.add(SELECT_ID);

                StringList slRelSelects = new StringList();

                String strBusWhere = ProgramCentralConstants.EMPTY_STRING;
                String strRelWhere = ProgramCentralConstants.EMPTY_STRING;

                MapList mlResourceRequestInfo = project.getResourceRequests(context,slBusSelects,slRelSelects,strBusWhere,strRelWhere);

                String strRequestId = ProgramCentralConstants.EMPTY_STRING;
                StringList slRequestIds = new StringList();

                DomainObject dmoResourceRequest = DomainObject.newInstance(context);

                for (Iterator itrRequests = mlResourceRequestInfo.iterator(); itrRequests.hasNext();)
                {
                    Map mapRequestMap = (Map) itrRequests.next();
                    strRequestId = (String) mapRequestMap.get(SELECT_ID);
                    slRequestIds.add(strRequestId);
                }
                String[] strRequetsToDelete = (String[]) slRequestIds.toArray(new String[slRequestIds.size()]);
                //to push the context as having no rights to delete
                isPushedContext = false;
                ContextUtil.pushContext(context, sUserAgent, DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING);
                isPushedContext = true;
                try
                {
                    DomainObject.deleteObjects(context,strRequetsToDelete);
                }
                finally
                {
                    if(isPushedContext)
                    {
                        ContextUtil.popContext(context);       
                    }
                }
            }
            //disconnect or delete the risks associated with this project
            busSelects.clear();
            busSelects.add(risk.SELECT_ID);
            busSelects.add(risk.SELECT_RPN_ID);
            MapList riskList = risk.getRisks(context, project,busSelects, null, null);
            int riskListSize=riskList.size();
            String connectedRisk[] = new String[riskListSize];
            int index=0;

            if (riskListSize > 0)
            {
                Iterator itr1 = riskList.iterator();
                while (itr1.hasNext())
                {
                    Map map = (Map) itr1.next();
                    String riskId = (String) map.get(risk.SELECT_ID);
                    connectedRisk[index]=riskId;
                    index++;
                }
            }
            if(riskListSize>0)
            {
                Risk.removeOrDeleteRisksfromParent(context, objectId, connectedRisk);
            }

            //delete the bookmarks
            StringList relSelects = new StringList(1);
            relSelects.add(DomainRelationship.SELECT_ID);

            MapList  bookmarkList = bookmark.getURLs(context, project, null, relSelects, null, null);
            int bookmarkCount =  bookmarkList.size();
            //**Start**
            /*if(ProjectSpace.isEPMInstalled(context))
            {
                if(bookmarkCount > 0)
                {
                    String[] urlConnectionIds = new String[bookmarkCount];
                    for(int i=0; i< bookmarkCount; i++)
                    {
                        urlConnectionIds[i] = (String)(((Map)bookmarkList.get(i)).get(DomainRelationship.SELECT_ID));
                    }

                    //remove all urls which do not have more than one reference; otherwise, disconect
                    bookmark.removeURLs(context, urlConnectionIds, true);
                }

                //Before deleting the tasks, delete the associated IC Objects
                if ("true".equalsIgnoreCase(EnoviaResourceBundle.getProperty(context, "emxProgramCentral.Bridge.enabled")))
                {
                    StringList objSelects = new StringList(1);
                    objSelects.add(DomainConstants.SELECT_ID);
                    MapList icList = ic.getICObjects(context,objectId,objSelects);
                    if(icList != null && icList.size() > 0)
                    {
                        Iterator itr = icList.iterator();
                        while (itr.hasNext())
                        {
                            Map map = (Map) itr.next();
                            String icId = (String) map.get(DomainConstants.SELECT_ID);
                            if(icId!=null && !"null".equals(icId) && !"".equals(icId))
                            {
                                ic.setId(icId);
                                ic.delete(context, true);
                            }
                        }
                    }
                }
            }
            else
            {*/
                if(bookmarkCount > 0)
                {
                    String[] urlConnectionIds = new String[bookmarkCount];
                    for(int i=0; i< bookmarkCount; i++)
                    {
                        urlConnectionIds[i] = (String)(((Map)bookmarkList.get(i)).get(DomainRelationship.SELECT_ID));
                    }
                    //remove all urls which do not have more than one reference; otherwise, disconect
                    bookmark.removeURLs(context, urlConnectionIds, true);
                }
                //delete all the subtasks
                busSelects.clear();
                busSelects.add(task.SELECT_ID);
                busSelects.add(ProgramCentralConstants.SELECT_TASK_PROJECT_ID);
                busSelects.add(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);

                //START:Commented and Added for IR-226589V6R2014x
                // MapList utsList = task.getTasks(context, project, 1, busSelects, null, true);
                MapList utsList = task.getTasks(context, project, 0, busSelects, null, true);
                //END:Commented and Added for IR-226589V6R2014x
                if (utsList.size() > 0)
                {
                    Iterator itr = utsList.iterator();
                    while (itr.hasNext())
                    {
                        Map map = (Map) itr.next();
                        String taskId = (String) map.get(task.SELECT_ID);
                        String taskProjectId = (String) map.get(ProgramCentralConstants.SELECT_TASK_PROJECT_ID);
                        String isKindOfProjectSpace = (String) map.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);

                        if(!"TRUE".equalsIgnoreCase(isKindOfProjectSpace) && objectId.equals(taskProjectId)){
                            task.setId(taskId);
                            task.delete(context, true);
                        }
                    }
                }
            //}
            //delete all Route objects if they are not referenced to any other object;
            //otherwise, just disconnect them from the project.
            route.removeRoutes(context, objectId, true);

			// IR-902835-3DEXPERIENCER2022x
			// change any project scope routes to All
            if("TRUE".equalsIgnoreCase(isKindOfProject) && UIUtil.isNotNullAndNotEmpty(strPhysicalId))
			{
				String busWhere = "attribute[" + DomainConstants.ATTRIBUTE_RESTRICT_MEMBERS + "] == '" + strPhysicalId + "'";
				String strCommandStatement = "temp query bus $1 $2 $3 where $4 select $5 dump $6";
				String routeId =  MqlUtil.mqlCommand(context, strCommandStatement, true,
						DomainConstants.TYPE_ROUTE, "*", "*", busWhere, "id", "|");
						
				if (UIUtil.isNotNullAndNotEmpty(routeId))
				{
					StringList routeIds = getQueryIds(context, routeId, "|");
				
					for (int i=0; i<routeIds.size(); i++)
					{
						MqlUtil.mqlCommand(context, "modify businessobject $1 $2 $3", true,
								(String)routeIds.get(i),
								DomainConstants.ATTRIBUTE_RESTRICT_MEMBERS,
								"All");
					}
				}
				
			
			}
            //delete all Thread/Message objects connected to the project
            discussion.deleteMessages(context, (DomainObject)project);

            //delete the "Project Access List" object
            //*** Leave this last to be deleted.
            if (accessListId != null)
            {
                domainObject.setId(accessListId);
                domainObject.remove(context);
            }
        }catch(Exception e){
            throw e;
        }
        return triggerAction;
    }
    
    private StringList getQueryIds(Context context, String strQueryResult, String strSplitter) {

		String strObjId = "";
		StringList slTmpObjIds = null;
		StringList slReturnObjIds = new StringList();
		StringList slObjIds = FrameworkUtil.split(strQueryResult, "\n");
		
		for (int i = 0; i < slObjIds.size(); i++){
			
			strObjId = (String) slObjIds.get(i);
			slTmpObjIds = FrameworkUtil.split(strObjId, strSplitter);
			strObjId = (String) slTmpObjIds.get(slTmpObjIds.size() - 1);
			if(!slReturnObjIds.contains(strObjId)){
				slReturnObjIds.add(strObjId);
			}
		}
		
		return slReturnObjIds;
	}
}
