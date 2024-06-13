/*
**   emxCriticalTaskBase
**
**   Copyright (c) 1992-2020 Dassault Systemes.
**   All Rights Reserved.
**   This program contains proprietary and trade secret information of MatrixOne,
**   Inc.  Copyright notice is precautionary only
**   and does not evidence any actual or intended publication of such program
**
**   static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.10.2.1 Thu Dec  4 07:55:15 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.10 Wed Oct 22 15:50:30 2008 przemek Experimental przemek $
*/

import java.io.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import matrix.db.*;
import matrix.util.*;
import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.domain.util.CacheUtil;
import com.matrixone.apps.program.Task;
import com.matrixone.apps.framework.ui.UIUtil;


/**
 * The <code>emxCriticalTaskBase</code> class contains methods for emxTask.
 *
 */

public class emxCriticalTaskBase_mxJPO
{

	protected static synchronized void putIsExperimentCache(Context context, String key, String value) throws MatrixException {
		Map <String, String> mapIsExperiment = CacheUtil.getCacheMap(context, "PRGIsExperiment");
		
		if ( mapIsExperiment == null || mapIsExperiment.isEmpty() ) {
			mapIsExperiment = new ConcurrentHashMap <String, String> ();
			CacheUtil.setCacheMap(context, "PRGIsExperiment", mapIsExperiment);			
		}
		
		if (mapIsExperiment.get(key) == null) { mapIsExperiment.put(key, value); }
	}
	
	protected static String getCachedIsExperiment(Context context, String key) throws MatrixException {
		Map <String, String> mapIsExperiment = CacheUtil.getCacheMap(context, "PRGIsExperiment");
		
		return (mapIsExperiment == null) ? null : (String) mapIsExperiment.get(key);
	}
	

   protected emxProgramCentralUtil_mxJPO emxProgramCentralUtilClass = null;

   /**
    * Constructs a new emxCriticalTask JPO object.
    *
    * @param context the eMatrix <code>Context</code> object
    * @param args holds the following input arguments:
    *        0 - String containing the id
    * @throws Exception if the operation fails
    * @since PMC 10.5.1.2
    */

    public emxCriticalTaskBase_mxJPO (Context context, String[] args)
    throws Exception
    {
    }

      /**
       * This method is executed if a specific method is not specified.
       *
       * @param context the eMatrix <code>Context</code> object
       * @param args holds no arguments
       * @returns int
       * @throws Exception if the operation fails
       * @since PMC 10.5.1.2
       */
      public int mxMain(Context context, String[] args)
          throws Exception
      {
          if (true)
          {
              throw new Exception("must specify method on emxCriticalTaskBase invocation");
          }
          return 0;
      }

    /**
     * Returns the "Critical Task" Status and sends notification if it is TRUE.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     *        0 - objectId of the Task
	 *	      1 - current state of the Task
     * @throws Exception if the operation fails
     * @since PMC 10.5.1.2
     */
    public void triggerModifyCriticalTaskAction (Context context, String[] args)
    throws Exception
    {
		String isExpCreation = PropertyUtil.getGlobalRPEValue(context, "IGNORE_CREATE_TRIGGER");
		if(UIUtil.isNotNullAndNotEmpty(isExpCreation) && "true".equalsIgnoreCase(isExpCreation)) {
			return ;
		}

        // get values from args.
        String objectId = args[0];
		String strTaskCurrent = args[1];

        //Determine if Critical Task attribute is set to TRUE.
		String strProjectId = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", true,
					objectId,
					ProgramCentralConstants.SELECT_TASK_PROJECT_ID);

		String isExperimentProject = getCachedIsExperiment(context, strProjectId);
		if (UIUtil.isNullOrEmpty(isExperimentProject))
		{
			isExperimentProject = MqlUtil.mqlCommand(context, "print bus $1 select $2 $3 dump $4", true,
					strProjectId,
					ProgramCentralConstants.SELECT_KINDOF_EXPERIMENT_PROJECT,
					DomainConstants.SELECT_NAME,
					"|");
			putIsExperimentCache(context, strProjectId, isExperimentProject);
		}

		if(isExperimentProject.startsWith("FALSE")){
			// When the task is in either Assign/Active state
			if(ProgramCentralConstants.STATE_PROJECT_TASK_ASSIGN.equals(strTaskCurrent) ||  ProgramCentralConstants.STATE_PROJECT_TASK_ACTIVE.equals(strTaskCurrent))
			{
				String projectName = (String)FrameworkUtil.split(isExperimentProject, "|").get(1);
				StringList busSelects = new StringList(4);
				busSelects.add(DomainConstants.SELECT_NAME);
				busSelects.add(DomainConstants.SELECT_DESCRIPTION);
				busSelects.add(ProgramCentralConstants.SELECT_CRITICAL_TASK);
				busSelects.add(DomainConstants.SELECT_OWNER);
				Task newTask = new Task();
				newTask.setId(objectId);
				Map taskMap = newTask.getInfo(context, busSelects);

				String isCriticalTask = (String)taskMap.get(ProgramCentralConstants.SELECT_CRITICAL_TASK);
        StringList mailToList = new StringList();
        StringList mailAssigneeToList = new StringList();
				mailToList.add((String)taskMap.get(DomainConstants.SELECT_OWNER));

        StringList objectIdList = new StringList();
        StringList emptyList = new StringList();
				busSelects = new StringList();
				busSelects.add(DomainConstants.SELECT_NAME);

				String taskName = (String)taskMap.get(DomainConstants.SELECT_NAME);
				String taskDescription = (String)taskMap.get(DomainConstants.SELECT_DESCRIPTION);
				String taskOwner = (String)taskMap.get(DomainConstants.SELECT_OWNER);
				String taskAssignee = (String)taskMap.get(DomainConstants.SELECT_OWNER);

				MapList assigneeList =  newTask.getAssignees(context, busSelects, emptyList, "");

        if(assigneeList != null && assigneeList.size() > 0){
            for(int i =0; i <assigneeList.size(); i++){
                Map taskAssigneeMap = (Map) assigneeList.get(i);
						String assigneeName = (String)taskAssigneeMap.get(DomainConstants.SELECT_NAME);
                if(!assigneeName.equals(taskOwner))
                {
                    mailAssigneeToList.add(assigneeName);
                    taskAssignee += ", " + assigneeName;
                }
            }
        }
        objectIdList.add(objectId);
        String mKey[] = {"ProjectName", "TaskName", "TaskDescription",
                                     "TaskAssignee"};
        String mValue[] = {projectName, taskName, taskDescription,
                               taskAssignee};
				String companyName = null;
            // Sends mail notification to the owners.
            //get the mail subject
            String sMailSubject = "emxProgramCentral.ProgramObject.emxProgramTriggerNotifyCriticalTaskOwner.Subject";

            //get the mail message
            String sMailMessage = "emxProgramCentral.ProgramObject.emxProgramTriggerNotifyCriticalTaskOwner.Message";
            String sMailAssigneeMessage = "emxProgramCentral.ProgramObject.emxProgramTriggerNotifyCriticalTaskAssignee.Message";

            // When the task is not critical
            if(isCriticalTask.equalsIgnoreCase("FALSE"))
            {
                // Sends mail notification to the owners.
                //get the mail subject
                sMailSubject = "emxProgramCentral.ProgramObject.emxProgramTriggerNotifyNonCriticalTaskOwner.Subject";

                //get the mail message
                sMailMessage = "emxProgramCentral.ProgramObject.emxProgramTriggerNotifyNonCriticalTaskOwner.Message";
                sMailAssigneeMessage = "emxProgramCentral.ProgramObject.emxProgramTriggerNotifyNonCriticalTaskAssignee.Message";
            }
            sMailSubject  = emxProgramCentralUtilClass.getMessage(
                        context, sMailSubject, null, null, companyName);
            sMailMessage  = emxProgramCentralUtilClass.getMessage(
                            context, sMailMessage, mKey, mValue, companyName);
            sMailAssigneeMessage  = emxProgramCentralUtilClass.getMessage(
                            context, sMailAssigneeMessage, mKey, mValue, companyName);

            String rpeUserName = PropertyUtil.getGlobalRPEValue(context,ContextUtil.MX_LOGGED_IN_USER_NAME);
            MailUtil.setAgentName(context, rpeUserName);

            MailUtil.sendMessage(context, mailToList, null, null, sMailSubject, sMailMessage, objectIdList);
            MailUtil.sendMessage(context, mailAssigneeToList, null, null, sMailSubject, sMailAssigneeMessage, objectIdList);
        }
}
    }
}

