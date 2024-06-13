import java.util.Iterator;
import java.util.Map;

import matrix.db.Context;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;

/**
 * @author FZS
 *
 */
public class emxProgramMigrationAssignedTasksRelationshipConversion_mxJPO extends
    emxCommonMigration_mxJPO {
	private final String SELECT_IS_EXPERIMENT_TASK = "to[Project Access Key].from.from[Project Access List].to.type.kindof[Experiment]";
	
	private final String SELECT_TASK_ASSIGNEE_NAME = "to[" + DomainConstants.RELATIONSHIP_ASSIGNED_TASKS + "].from.name";
	
	private final String RELATIONSHIP_ASSIGNED_EXPERIMENT_TASKS =
            PropertyUtil.getSchemaProperty("relationship_AssignedExperimentTasks");
	
	private final String RELATIONSHIP_ASSIGNED_TASKS =
             PropertyUtil.getSchemaProperty("relationship_AssignedTasks");
	
	private final String SELECT_ASSIGNED_TASKS_REL_IDS =  "to[" + RELATIONSHIP_ASSIGNED_TASKS + "].id";


  /**
     * @param context
     * @param args
     * @throws Exception
     */
    public emxProgramMigrationAssignedTasksRelationshipConversion_mxJPO(Context context,
        String[] args) throws Exception {
      super(context, args);
    }

    @SuppressWarnings({ "unchecked", "deprecation" })
    @Override
    public void migrateObjects(Context context, StringList objectList) throws Exception
    {
    	// objectList is list of Experiment Ids
    	String RELATIONSHIP_SUBTASK = PropertyUtil.getSchemaProperty("relationship_Subtask");

    	try {
    		mqlLogRequiredInformationWriter("===================MIGRATION OF CHANGING EXPERIMENT TASK ASSIGNEE RELATIONSHIP STARTED=====================================");

    		ContextUtil.pushContext(context);
    		String cmd = "trigger off";
    		MqlUtil.mqlCommand(context, mqlCommand,  cmd);

    		if(null != objectList && !objectList.isEmpty()) {
    			mqlLogRequiredInformationWriter("===================ExperimentIdList====================================="+objectList);
    			int size = objectList.size();

    			for(int i=0;i<size;i++) {
    				String experimentId = (String) objectList.get(i);
    				DomainObject expObj = DomainObject.newInstance(context, experimentId);
    				mqlLogRequiredInformationWriter("===================EXPERIMENT ID << "+experimentId+" >>==================");
    				StringList busSelect = new StringList(ProgramCentralConstants.SELECT_ID);
    				busSelect.add(SELECT_IS_EXPERIMENT_TASK); 

    				String objectWhere ="("+SELECT_TASK_ASSIGNEE_NAME +"!="+ null+")";
    				
    				MapList taskInfoList = expObj.getRelatedObjects(context,
    						RELATIONSHIP_SUBTASK,
    						QUERY_WILDCARD,
    						false,
    						true,
    						(short)0,
    						busSelect,
    						null,
    						objectWhere,
    						null,
    						0,
    						null,
    						null,
    						null);

    				if(null != taskInfoList && !taskInfoList.isEmpty()) {

    					Iterator taskItr = taskInfoList.iterator(); 

    					while(taskItr.hasNext()) {
    						Map taskInfo = (Map) taskItr.next();
    						String taskId = (String) taskInfo.get(DomainConstants.SELECT_ID);
    						String isAnExperimentTask = (String) taskInfo.get(SELECT_IS_EXPERIMENT_TASK);

    						if("true".equalsIgnoreCase(isAnExperimentTask)) {
    							// If task is an Experiment Task

    							// get all Assignee of an Experiment Task with "Assigned Tasks" relationship

    							mqlLogRequiredInformationWriter("=================Experiment Task Id is << "+taskId+" >>========");

    							String assigneeRelationshipCmd = "print bus $1 select $2 dump $3 ";

    							String assigneeConnectionId = MqlUtil.mqlCommand(context, assigneeRelationshipCmd, taskId, SELECT_ASSIGNED_TASKS_REL_IDS,"|");
    							StringList assigneeConectionIdList = FrameworkUtil.split(assigneeConnectionId, "|");



    							mqlLogRequiredInformationWriter("=================assigneeConectionIdList=========== is << "+assigneeConectionIdList+" >>========");
    							if(null != assigneeConectionIdList && !assigneeConectionIdList.isEmpty()) {

    								for(int k=0;k<assigneeConectionIdList.size();k++){


    									String relId = (String)  assigneeConectionIdList.get(k);
    									mqlLogRequiredInformationWriter("=================relId is << "+relId+" >>=====================");
    									if(ProgramCentralUtil.isNotNullString(relId)) {
    										//Assignee rel name need to be changed from "Assigned Tasks" to "Assigned Experiment Tasks" 
    										cmd = "modify connection $1 type $2";
    										mqlLogRequiredInformationWriter("===================Changing relationship from 'Assigned Tasks' to 'Assigned Experiment Tasks' for connectionId << "+relId+" >>======");
    										MqlUtil.mqlCommand(context, cmd, relId, RELATIONSHIP_ASSIGNED_EXPERIMENT_TASKS); 
    										mqlLogRequiredInformationWriter("===================Relationship has been changed============");

    									}
    								}
    							}
    						}

    					}

    				}
    			}mqlLogRequiredInformationWriter("===================MIGRATION OF CHANGING EXPERIMENT TASK ASSIGNEE RELATIONSHIP ENDED=====================================");
    		}
    	}catch(Exception e) {	
    		e.printStackTrace();
    		throw e;
    	}
    	finally
    	{
    		String cmd = "trigger on";
    		MqlUtil.mqlCommand(context, mqlCommand,  cmd);
    		ContextUtil.popContext(context);
    	}
    }

    public void mqlLogRequiredInformationWriter(String command) throws Exception
    {
        super.mqlLogRequiredInformationWriter(command +"\n");
    }
    public void mqlLogWriter(String command) throws Exception
    {
        super.mqlLogWriter(command +"\n");
    }
}
