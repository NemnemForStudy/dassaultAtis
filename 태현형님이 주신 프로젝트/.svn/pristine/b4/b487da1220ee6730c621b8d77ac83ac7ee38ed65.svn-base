/*
 *  emxInboxTaskBase.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */


import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;

import matrix.db.Access;
import matrix.db.Attribute;
import matrix.db.AttributeItr;
import matrix.db.AttributeList;
import matrix.db.AttributeType;
import matrix.db.BusinessObject;
import matrix.db.BusinessObjectAttributes;
import matrix.db.Context;
import matrix.db.ExpansionIterator;
import matrix.db.Group;
import matrix.db.JPO;
import matrix.db.MQLCommand;
import matrix.db.Relationship;
import matrix.db.Role;
import matrix.util.List;
import matrix.util.MatrixException;
import matrix.util.Pattern;
import matrix.util.SelectList;
import matrix.util.StringList;

import com.dassault_systemes.enovia.bps.widget.UIWidget;
import com.matrixone.apps.common.Document;
import com.matrixone.apps.common.InboxTask;
import com.matrixone.apps.common.Organization;
import com.matrixone.apps.common.Route;
import com.matrixone.apps.common.RouteTaskNotification;
import com.matrixone.apps.common.util.ComponentsUIUtil;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.FrameworkStringResource;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MailUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MessageUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;


/**
 * @version AEF Rossini - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxInboxTaskBase_mxJPO extends emxDomainObject_mxJPO
{
    private static final String sAttrReviewersComments = PropertyUtil.getSchemaProperty("attribute_ReviewersComments");
    private static final String sAttrReviewTask = PropertyUtil.getSchemaProperty("attribute_ReviewTask");
    private static final String sAttrReviewCommentsNeeded = PropertyUtil.getSchemaProperty("attribute_ReviewCommentsNeeded");
    private static final String sAttrRouteAction = PropertyUtil.getSchemaProperty("attribute_RouteAction");
    private static final String sAttrScheduledCompletionDate = PropertyUtil.getSchemaProperty("attribute_ScheduledCompletionDate");
    private static final String sAttrTitle = PropertyUtil.getSchemaProperty("attribute_Title");
    private static final String selTaskCompletedDate = PropertyUtil.getSchemaProperty("attribute_ActualCompletionDate");
    private static final String sTypeInboxTask = PropertyUtil.getSchemaProperty("type_InboxTask");
    private static final String sRelProjectTask = PropertyUtil.getSchemaProperty("relationship_ProjectTask");
    private static final String sRelRouteTask = PropertyUtil.getSchemaProperty("relationship_RouteTask");
    private static final String sRelProjectRouteTask = PropertyUtil.getSchemaProperty("relationship_ProjectRoute");
    private static final String sRelRouteScope = PropertyUtil.getSchemaProperty("relationship_RouteScope");
	private static final String sRelObjectRoute = PropertyUtil.getSchemaProperty("relationship_ObjectRoute");
    private static final String policyTask = PropertyUtil.getSchemaProperty("policy_InboxTask");
	private static final String  sAttRouteInstructions        =  PropertyUtil.getSchemaProperty("attribute_RouteInstructions");
    private static final String strAttrRouteAction = "attribute["+sAttrRouteAction +"]";
    private static final String strAttrCompletionDate ="attribute["+sAttrScheduledCompletionDate+"]";
    private static final String strAttrTitle="attribute["+sAttrTitle+"]";
    private static final String strAttrTaskCompletionDate ="attribute["+selTaskCompletedDate+"]";
    private static final String strAttrTaskApprovalStatus  = getAttributeSelect(DomainObject.ATTRIBUTE_APPROVAL_STATUS);
	private static final String sAttrRouteScope = PropertyUtil.getSchemaProperty("attribute_RestrictMembers");
	private static final String sAttrRouteOwnerUGChoice = PropertyUtil.getSchemaProperty("attribute_RouteOwnerUGChoice");
	private static final String sAttrRouteOwnerTask = PropertyUtil.getSchemaProperty("attribute_RouteOwnerTask");

    private static String routeIdSelectStr="from["+sRelRouteTask+"].to.id";
    private static String routeTypeSelectStr="from["+sRelRouteTask+"].to.type";
    private static String routeNameSelectStr ="from["+sRelRouteTask+"].to.name";
    private static String routeOwnerSelectStr="from["+sRelRouteTask+"].to.owner";
    private static String objectNameSelectStr="from["+sRelRouteTask+"].to.to["+sRelRouteScope+"].from.name";
    private static String objectTypeSelectStr="from["+sRelRouteTask+"].to.to["+sRelRouteScope+"].from.type";
    private static String objectTitleSelectStr="from["+sRelRouteTask+"].to.to["+sRelRouteScope+"].from."+DomainConstants.SELECT_ATTRIBUTE_TITLE;
    private static String objectIdSelectStr="from["+sRelRouteTask+"].to.to["+sRelRouteScope+"].from.id";
    private static final String routeApprovalStatusSelectStr ="from["+sRelRouteTask+"].to."+Route.SELECT_ROUTE_STATUS ;
    private i18nNow loc = new i18nNow();
    protected String lang=null;
    protected String rsBundle=null;

    private static final String sRelAssignedTask = PropertyUtil.getSchemaProperty("relationship_AssignedTasks");
    private static final String sRelSubTask = PropertyUtil.getSchemaProperty("relationship_Subtask");
    private static final String sRelWorkflowTask = PropertyUtil.getSchemaProperty("relationship_WorkflowTask");
    private static final String sRelWorkflowTaskAssinee = PropertyUtil.getSchemaProperty("relationship_WorkflowTaskAssignee");
    private static final String sRelWorkflowTaskDeliverable = PropertyUtil.getSchemaProperty("relationship_TaskDeliverable");

    private static final String workflowIdSelectStr = "to["+sRelWorkflowTask+"].from.id";
    private static final String workflowNameSelectStr = "to["+sRelWorkflowTask+"].from.name";
    private static final String workflowTypeSelectStr = "to["+sRelWorkflowTask+"].from.type";

    private static final String sTypeWorkflow = PropertyUtil.getSchemaProperty("type_Workflow");
    private static final String sTypeWorkflowTask = PropertyUtil.getSchemaProperty("type_WorkflowTask");

    private static final String policyWorkflowTask = PropertyUtil.getSchemaProperty("policy_WorkflowTask");
    private static final String attrworkFlowDueDate = PropertyUtil.getSchemaProperty("attribute_DueDate");
    private static final String attrTaskEstinatedFinishDate = PropertyUtil.getSchemaProperty("attribute_TaskEstimatedFinishDate");
    private static final String attrworkFlowActCompleteDate = PropertyUtil.getSchemaProperty("attribute_ActualCompletionDate");
    private static final String attrworkFlowInstructions = PropertyUtil.getSchemaProperty("attribute_Instructions");
    private static final String attrTaskFinishDate = PropertyUtil.getSchemaProperty("attribute_TaskActualFinishDate");

    private static String strAttrworkFlowDueDate = "attribute[" + attrworkFlowDueDate + "]";
    private static String strAttrTaskEstimatedFinishDate = "attribute[" + attrTaskEstinatedFinishDate + "]";
    private static String strAttrTaskFinishDate = "attribute[" + attrTaskFinishDate + "]";
    private static String strAttrworkFlowCompletinDate = "attribute[" + attrworkFlowActCompleteDate + "]";
    private static final String strAttrRouteOwnerUGChoice ="attribute["+sAttrRouteOwnerUGChoice+"]";
	private static final String strAttrRouteOwnerTask ="attribute["+sAttrRouteOwnerTask+"]";

    private static final String TYPE_INBOX_TASK_STATE_REVIEW = PropertyUtil.getSchemaProperty("Policy", DomainObject.POLICY_INBOX_TASK, "state_Review");
    private static final String TYPE_INBOX_TASK_STATE_ASSIGNED = PropertyUtil.getSchemaProperty("Policy", DomainObject.POLICY_INBOX_TASK, "state_Assigned");


    // added for IR - 043921V6R2011
    public static final String  SELECT_TEMPLATE_OWNING_ORG_ID =  "from["+ RELATIONSHIP_ROUTE_TASK + "].to.from[" + RELATIONSHIP_INITIATING_ROUTE_TEMPLATE
                                                     + "].to.to[" + RELATIONSHIP_OWNING_ORGANIZATION + "].from.id";

    public static final String SELECT_ROUTE_NODE_ID = getAttributeSelect(ATTRIBUTE_ROUTE_NODE_ID);
    public static final String SELECT_TASK_ASSIGNEE_CONNECTION = "from[" + RELATIONSHIP_PROJECT_TASK + "].id";
    protected static final String PERSON_WORKSPACE_LEAD_GRANTOR = PropertyUtil.getSchemaProperty("person_WorkspaceLeadGrantor");
    protected static final String SELECT_TASK_ASSIGNEE_NAME = "from[" + RELATIONSHIP_PROJECT_TASK + "].to.name";
    protected static final String SELECT_TASK_ASSIGNEE_TITLE = "from[" + RELATIONSHIP_PROJECT_TASK + "].to."+DomainConstants.SELECT_ATTRIBUTE_TITLE;
    protected static final String SELECT_TASK_ASSIGNEE_TYPE        = "from[" + RELATIONSHIP_PROJECT_TASK + "].to.type";

    private static final String TASK_PROJECT_ID = "to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.id";
    private static final String TASK_PROJECT_TYPE = "to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.type";
    private static final String TASK_PROJECT_NAME = "to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.name";
    private static final String TASK_PROJECT_ATTRIBUTE_TITLE = "to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to."+DomainConstants.SELECT_ATTRIBUTE_TITLE;
	private static final String ROUTE_TASK_PROJECT_ID = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from."+TASK_PROJECT_ID;
    private static final String ROUTE_TASK_PROJECT_NAME = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from."+TASK_PROJECT_NAME;
	private static final String ROUTE_TASK_PROJECT_TYPE = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from."+TASK_PROJECT_TYPE;
    private static final String ROUTE_TASK_PROJECT_ATTRIBUTE_TITLE = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from."+TASK_PROJECT_ATTRIBUTE_TITLE;
    private static final String ROUTE_PROJECT_ID = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from.id";
    private static final String ROUTE_PROJECT_NAME = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from.name";
    private static final String ROUTE_PROJECT_TYPE = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from.type";
    private static final String ROUTE_PROJECT_Title_NAME = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from."+DomainConstants.SELECT_ATTRIBUTE_TITLE;
    private static final String SELECT_KINDOF_TASK = "type.kindof[" + TYPE_TASK+ "]";
    private static final String SELECT_KINDOF_WORKFLOW_TASK = "type.kindof[" + sTypeWorkflowTask+ "]";
    private static final String SELECT_KINDOF_INBOX_TASK = "type.kindof[" + sTypeInboxTask+ "]";
	private static String routeScopeSelectStr="from["+sRelRouteTask+"].to.attribute["+sAttrRouteScope +"]";
    private static final String TASK_PROJECT_POLICY = "to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.policy";
	private static final String POLICY_PROJECT_SPACE_HOLD_CANCEL = PropertyUtil.getSchemaProperty("policy_ProjectSpaceHoldCancel");

    private static final String sRelTaskDeliverable = PropertyUtil.getSchemaProperty("relationship_TaskDeliverable");
    private static final String ROUTE_TASK_PROJECT_POLICY = "from["+sRelRouteTask+"].to.to["+sRelObjectRoute+"].from.to["+sRelTaskDeliverable+"].from."+TASK_PROJECT_POLICY;
    private static final String ATTRIBUTE_REQUIRES_ESIGN = PropertyUtil.getSchemaProperty("attribute_RequiresESign");
    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public emxInboxTaskBase_mxJPO (Context context, String[] args)
        throws Exception
    {
      super(context, args);
    }

    /**
     * This method is executed if a specific method is not specified.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @returns nothing
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public int mxMain(Context context, String[] args)
        throws Exception
    {
        if (!context.isConnected())
            throw new Exception(ComponentsUtil.i18nStringNow("emxComponents.Generic.NotSupportedOnDesktopClient", context.getLocale().getLanguage()));
        return 0;
    }

    /**
     * action trigger on promote event of state "Assigned" of policy "Inbox Task"
     * sends notification to the Route Owner if it needs to be reviewed, else promotes to complete
     *
     * @param context the eMatrix Context object
     * @param holds inboxtaskid
     * @return void
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public void triggerActionPromoteOnAssignedState(matrix.db.Context context, String[] args)
        throws Exception
    {

        //get the "Review Task" attribute, if it is "No", promote to "Complete"
        //else send notification to the route owner for task review
        String reviewTask = getInfo(context, "attribute["+ATTRIBUTE_REVIEW_TASK+"]");
        if(reviewTask.equalsIgnoreCase("No"))
        {
        	//promote to "Complete"
            setState(context, STATE_INBOX_TASK_COMPLETE);
            String isFDAEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.EnableFDA");
            String routeAction = getInfo(context, "attribute["+ATTRIBUTE_ROUTE_ACTION+"]");

            
            try {
            	String ATTRIBUTE_MIDDLE_NAME = PropertyUtil.getSchemaProperty(context,"attribute_MiddleName");
            	DomainObject person = PersonUtil.getPersonObject(context);
            	StringList personSelects = new StringList();
            	personSelects.addElement("attribute[" + ATTRIBUTE_LAST_NAME + "]");
            	personSelects.addElement("attribute[" + ATTRIBUTE_FIRST_NAME + "]");
            	personSelects.addElement("attribute[" + ATTRIBUTE_MIDDLE_NAME + "]");
	
            	Map personInfo = person.getInfo(context,personSelects);
	
	          String lastName = (String)personInfo.get("attribute[" + ATTRIBUTE_LAST_NAME + "]");
	          String firstName = (String)personInfo.get("attribute[" + ATTRIBUTE_FIRST_NAME + "]");
	          String middleName = (String)personInfo.get("attribute[" + ATTRIBUTE_MIDDLE_NAME + "]");
	          // Added for bug 306764
	          if(middleName.equals("Unknown"))
	          {
	              middleName = "";
	          }
	
	          //Get the task info.
	          String SELECT_ROUTE_NAME = "from[" + RELATIONSHIP_ROUTE_TASK + "].to.name";
	          StringList taskSelects = new StringList();
	          taskSelects.add("attribute[" + ATTRIBUTE_APPROVAL_STATUS + "]");
	          taskSelects.add(SELECT_ROUTE_NAME);
	          taskSelects.add("attribute[" + ATTRIBUTE_TITLE + "]");
	          taskSelects.add("attribute[" + ATTRIBUTE_APPROVERS_RESPONSIBILITY + "]");
	          taskSelects.add("attribute[" + ATTRIBUTE_COMMENTS + "]");
	          taskSelects.add("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
	          taskSelects.add(SELECT_REVISION ); 
	          taskSelects.add(SELECT_NAME);
	          taskSelects.add(SELECT_TYPE);
	          taskSelects.add("current");
	
	          Map taskInfo = getInfo(context,taskSelects);
	          String type=(String)taskInfo.get(SELECT_TYPE);
	          String name=(String)taskInfo.get(SELECT_NAME);
	          String revision =(String)taskInfo.get(SELECT_REVISION );
	          String current = (String) taskInfo.get("current");
	
	          String approvalStatus = (String)taskInfo.get("attribute[" + ATTRIBUTE_APPROVAL_STATUS + "]");
	          String routeName = (String)taskInfo.get(SELECT_ROUTE_NAME);
	          String title = (String)taskInfo.get("attribute[" + ATTRIBUTE_TITLE + "]");
	          String approversResponsibility = (String)taskInfo.get("attribute[" + ATTRIBUTE_APPROVERS_RESPONSIBILITY + "]");
	          String comments = (String)taskInfo.get("attribute[" + ATTRIBUTE_COMMENTS + "]");
	          String routeOwner = (String) taskInfo.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
	
	          String SELECT_ROUTE_ID = "from[" + RELATIONSHIP_ROUTE_TASK + "].to.id";
	          String routeId = getInfo(context,SELECT_ROUTE_ID);
	          if(isFDAEnabled != null && "true".equalsIgnoreCase(isFDAEnabled) && "Approve".equals(routeAction)){
	
		          emxRoute_mxJPO route = new emxRoute_mxJPO(context, null);
		          route.setId(routeId);
		
		          //Define route selects
		          StringList objectSelects = new StringList();
		          objectSelects.addElement(SELECT_ID);
		
		          ContextUtil.startTransaction(context,false);
		          ExpansionIterator expItr = route.getExpansionIterator(context,                    // matrix context
		                                                      RELATIONSHIP_OBJECT_ROUTE,    // relationship pattern
		                                                      "*",                // object pattern
		                                                      objectSelects,              // object selects
		                                                      new StringList(0),                       // relationship selects
		                                                      true,                      // to direction
		                                                      false,                       // from direction
		                                                      (short) 1,              // recursion level
		                                                      null,                       // object where clause
		                                                      null,                       // relationship where clause
		                                                      (short)0,                        // cached list
		                                                      false,
		                                                      false,
		                                                      (short)100,
		                                                      false);
		          MapList routedObjects = null;
	          try {
	              routedObjects = FrameworkUtil.toMapList(expItr,(short)0,null,null,null,null);
	          } finally {
	              expItr.close();
	          }
	          ContextUtil.commitTransaction(context);

	          Iterator routeItr = routedObjects.iterator();
	          while(routeItr.hasNext())
	          {
		            Map routedObjectMap = (Map)routeItr.next();
		            String routedObjectId = (String)routedObjectMap.get(SELECT_ID);
		            String historyEntry = "Task Assignee:" +  lastName + "," + firstName + " " + middleName + " Route Name:'"
		                         + routeName + "' Task Name:'" + title + "' Role Performed:'"
		                         + approversResponsibility + "' Assignee Comments:'" + comments + "'";
		
		            String mql =  "modify bus $1 add history $2 comment $3";
		            if (approvalStatus.equalsIgnoreCase("approve")){
		            	MqlUtil.mqlCommand(context, mql, true, routedObjectId, "approve", historyEntry);
		            } else {
		            	MqlUtil.mqlCommand(context, mql, true, routedObjectId, approvalStatus, historyEntry);
		            }
		          }
	          }
            } catch (Exception e){
            	System.out.println("exception " + e.getMessage());
            }	
        } else {
        	String SELECT_ROUTE_ID = "from[" + RELATIONSHIP_ROUTE_TASK + "].to.id";
        	String routeId = getInfo(context,SELECT_ROUTE_ID);
        	Route.updateRouteActivityStatus(context, routeId);
        }
       
        // The below code is commented since we are using emxNotificationUtil jpo for firing the email
        /*else
        {
            //build the select list
            StringList selects = new StringList();
            selects.addElement("id");
            selects.addElement("type");
            selects.addElement("name");
            selects.addElement("revision");
            selects.addElement("owner");
            selects.addElement("attribute["+ATTRIBUTE_TITLE+"]");
            selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.type");
            selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.name");
            selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.revision");
            selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");

            //get all task-route details
            Map taskMap = getInfo(context, selects);

            String taskName = (String) taskMap.get("attribute["+ATTRIBUTE_TITLE+"]");
            if(null == taskName || taskName.equals(""))
            {
                taskName = (String) taskMap.get("name");
            }
            String taskId     = (String) taskMap.get("id");
            String taskType   = (String) taskMap.get("type");
            String taskRev    = (String) taskMap.get("revision");
            String taskOwner  = (String) taskMap.get("owner");
            String routeType  = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.type");
            String routeName  = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.name");
            String routeRev   = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.revision");
            String routeOwner = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");

            //use emxMailUtil class to send notifications
            ${CLASS:emxMailUtil} mailUtil = new ${CLASS:emxMailUtil}(context, null);

            StringList toList = new StringList();
            toList.addElement(routeOwner);
            String subjectKey = "emxFramework.InboxTaskJPO.triggerActionPromoteOnAssignedState.SubjectReviewInitiated";
            String[] subjectKeys = {};
            String[] subjectValues = {};

            String messageKey = "emxFramework.InboxTaskJPO.triggerActionPromoteOnAssignedState.MessageReviewInitiated";
            String[] messageKeys = {"IBType", "IBName", "IBRev", "RType", "RName", "RRev"};
            String[] messageValues = {taskType, taskName, taskRev, routeType, routeName, routeRev};

            StringList objectIdList = new StringList();
            objectIdList.addElement(taskId);

            mailUtil.sendNotification(context,
                              toList,
                              null,
                              null,
                              subjectKey,
                              subjectKeys,
                              subjectValues,
                              messageKey,
                              messageKeys,
                              messageValues,
                              objectIdList,
                              null);
        }*/
    }

    /**
     * action trigger on demote event of state "Review" of policy "Inbox Task"
     * sends notification to the Task Assignee informing him of the Task demotion
     *
     * @param context the eMatrix Context object
     * @param holds inboxtaskid
     * @return void
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public void triggerActionDemoteOnReviewState(matrix.db.Context context, String[] args)
        throws Exception
    {
        
		// The below code is uncommented for 3dnotification
         //build the selects
		String reviewComments               = PropertyUtil.getSchemaProperty(context, "attribute_ReviewersComments");
		String SELECT_REVIEW_COMMENTS       	= "attribute["+reviewComments+"]";
		StringList selects = new StringList();
        selects.addElement(DomainConstants.SELECT_NAME);
        //selects.addElement(DomainConstants.SELECT_ATTRIBUTE_TITLE);   
        selects.addElement(DomainConstants.SELECT_REVISION);
        selects.addElement(DomainConstants.SELECT_OWNER);
        selects.addElement(DomainConstants.SELECT_PHYSICAL_ID);
        selects.addElement("attribute["+ATTRIBUTE_TITLE+"]");
        selects.addElement("attribute["+ATTRIBUTE_ROUTE_ACTION+"]");
        selects.addElement(SELECT_REVIEW_COMMENTS);
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.name");
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.physicalid");
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.attribute[Title]");
        selects.addElement("from[" + RELATIONSHIP_ROUTE_TASK + "].to.id");
        selects.addElement("attribute["+ATTRIBUTE_REVIEW_TASK+"]");
        selects.addElement("current");
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.physicalid");
        //get all details required
        Map taskMap = getInfo(context, selects);

        String taskTitle = (String) taskMap.get("attribute["+ATTRIBUTE_TITLE+"]");
        if(UIUtil.isNullOrEmpty(taskTitle))
        {
        	taskTitle = (String) taskMap.get(DomainConstants.SELECT_NAME);
        }
        String taskId     = (String) taskMap.get(DomainConstants.SELECT_PHYSICAL_ID);
        String taskType   = (String) taskMap.get("attribute["+ATTRIBUTE_ROUTE_ACTION+"]");
        String taskOwner  = (String) taskMap.get(DomainConstants.SELECT_OWNER);
        String routeOwner  = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
        String routeName  = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.name");
        String routeTitle  = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.attribute[Title]");
        String routePhysicalId   = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.physicalid");
        String reviewerComments   = (String) taskMap.get(SELECT_REVIEW_COMMENTS);
        String type=(String)taskMap.get(SELECT_TYPE);
        String name=(String)taskMap.get(SELECT_NAME);
        String revision =(String)taskMap.get(SELECT_REVISION);
        String reviewTask = (String) taskMap.get("attribute["+ATTRIBUTE_REVIEW_TASK+"]");
        Map<String, String> taskAndRouteInfo = new HashMap<>();
        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_ID, routePhysicalId);
        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_NAME, routeTitle);
        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_OWNER, routeOwner);
        taskAndRouteInfo.put(RouteTaskNotification.TASK_ID, taskId);
        taskAndRouteInfo.put(RouteTaskNotification.TASK_NAME, taskTitle);
        taskAndRouteInfo.put(RouteTaskNotification.TASK_ACTION, taskType);
        taskAndRouteInfo.put(RouteTaskNotification.REVIEW_COMMENTS, reviewerComments);
        taskAndRouteInfo.put(RouteTaskNotification.TASK_ASSIGNEE, taskOwner);
        taskAndRouteInfo.put(RouteTaskNotification.ASSIGNEE_TYPE, "Person");
        taskAndRouteInfo.put(RouteTaskNotification.REVIEW_STATUS, "rejected");
        
        RouteTaskNotification notifyObj = RouteTaskNotification.getInstance(context, "");
        notifyObj.sendTaskReviewCompleted3DNotification(context, taskAndRouteInfo);
        
        StringList toSelectList = new StringList();
        toSelectList.add("$<owner>");
        emxNotificationUtilBase_mxJPO.createNotification(context, taskId,  new StringList(),  new StringList(), "emxComponents.Notification.NotifyTaskAsignee.SubjectReviewCompleted", "emxComponents.Notification.NotifyTaskAsignee.MessageReviewCompletedPromote",  new StringList(), "emxComponentsStringResource", toSelectList, new StringList(), "", "", "", "", "");
        //String esignConfigSetting = MqlUtil.mqlCommand(context, "list expression $1 select $2 dump","ENXESignRequiresESign", "value");
		boolean isESigned = false;
		/*if("RouteSpecific".equalsIgnoreCase(esignConfigSetting)){
			Route routeObject = (Route)DomainObject.newInstance(context, routePhysicalId);
			String eSign = (String) routeObject.getInfo(context,"attribute[Requires ESign]");
			if("true".equalsIgnoreCase(eSign)) {
				isESigned = true;
			}
		}else if("All".equalsIgnoreCase(esignConfigSetting)) {
			isESigned = true;
		}*/
        if("Yes".equalsIgnoreCase(reviewTask))
        {   
        	InboxTask inboxTask = new InboxTask(taskId);
        	try{
        		ContextUtil.pushContext(context);
        		MqlUtil.mqlCommand(context,"history off;", true);
        		inboxTask.setAttributeValue(context, DomainObject.ATTRIBUTE_APPROVAL_STATUS, "None");
        	} catch(Exception ex) {
        		
        	} finally {
        		MqlUtil.mqlCommand(context,"history on;", true);
        		ContextUtil.popContext(context);
        	}
        	Route.updateRouteActivityStatus(context, routePhysicalId);
        	String taskTypeNameRevision=name+","+revision+"|";
        	updateHistory(context,"Review_Demote",type,taskTypeNameRevision+taskTitle,revision,routeOwner,reviewerComments,routePhysicalId,"rejected",isESigned);
        }    
       }

    /**
     * action trigger on promote event of state "Review" of policy "Inbox Task"
     * sends notification to the Task Assignee informing him of the Task promotion
     *
     * @param context the eMatrix Context object
     * @param holds inboxtaskid
     * @return void
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public void triggerActionPromoteOnReviewState(matrix.db.Context context, String[] args)
        throws Exception
    {
        StringList selects = new StringList();
        selects.add(SELECT_REVISION); 
        selects.add(SELECT_NAME);
        selects.add(SELECT_TYPE);
        selects.add("attribute["+ATTRIBUTE_TITLE+"]");
        selects.add("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
        selects.add("from[" + RELATIONSHIP_ROUTE_TASK + "].to.id");
        selects.add("attribute["+ATTRIBUTE_REVIEW_TASK+"]");
        selects.add("current");
        String reviewComments               = PropertyUtil.getSchemaProperty(context, "attribute_ReviewersComments");
        String SELECT_REVIEW_COMMENTS           = "attribute["+reviewComments+"]";
        selects.add(SELECT_REVIEW_COMMENTS);

        Map taskMap = getInfo(context, selects);
        String type=(String)taskMap.get(SELECT_TYPE);
        String name=(String)taskMap.get(SELECT_NAME);
        String taskTitle = (String) taskMap.get("attribute["+ATTRIBUTE_TITLE+"]");
        if(UIUtil.isNullOrEmpty(taskTitle))
        {
        	taskTitle = (String) taskMap.get(DomainConstants.SELECT_NAME);
        }
        String revision =(String)taskMap.get(SELECT_REVISION);
        String routeOwner = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
        String strReviewComments = (String)taskMap.get(SELECT_REVIEW_COMMENTS);
        String reviewTask = (String) taskMap.get("attribute["+ATTRIBUTE_REVIEW_TASK+"]");
        String routeId =(String) taskMap.get("from[" + RELATIONSHIP_ROUTE_TASK + "].to.id");
        //String esignConfigSetting = MqlUtil.mqlCommand(context, "list expression $1 select $2 dump","ENXESignRequiresESign", "value");
		boolean isESigned = false;
		/*if("RouteSpecific".equalsIgnoreCase(esignConfigSetting)){
			Route routeObject = (Route)DomainObject.newInstance(context, routeId);
			String eSign = (String) routeObject.getInfo(context,"attribute[Requires ESign]");
			if("true".equalsIgnoreCase(eSign)) {
				isESigned = true;
			}
		}else if("All".equalsIgnoreCase(esignConfigSetting)) {
			isESigned = true;
		}*/
        if("Yes".equalsIgnoreCase(reviewTask))
        {       
            String taskTypeNameRevision=name+","+revision+"|";
            updateHistory(context,"Review_Promote",type,taskTypeNameRevision+taskTitle,revision,routeOwner,strReviewComments,routeId,"completed",isESigned);
        }
        //this trigger will be executed on direct promotion from Assigned to Complete
        //and from a promote from Review to Complete
        //notifications should be sent only in the second case (if the task has undergone a review)
        // The below code is commented since we are using emxNotificationUtil jpo for firing the email
       /* String reviewTask = getInfo(context, "attribute["+ATTRIBUTE_REVIEW_TASK+"]");
        if(reviewTask.equalsIgnoreCase("No"))
        {
            return;
        }
        //build selects
        StringList selects = new StringList();
        selects.addElement("type");
        selects.addElement("name");
        selects.addElement("revision");
        selects.addElement("owner");
        selects.addElement("attribute["+ATTRIBUTE_TITLE+"]");
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.type");
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.name");
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.revision");

        //get all details required
        Map taskMap = getInfo(context, selects);

        String taskName = (String) taskMap.get("attribute["+ATTRIBUTE_TITLE+"]");
        if(null == taskName || taskName.equals(""))
        {
            taskName = (String) taskMap.get("name");
        }
        String taskId     = (String) taskMap.get("id");
        String taskType   = (String) taskMap.get("type");
        String taskRev    = (String) taskMap.get("revision");
        String taskOwner  = (String) taskMap.get("owner");
        String routeType  = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.type");
        String routeName  = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.name");
        String routeRev   = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.revision");

        //use emxMailUtil class to send notifications
        ${CLASS:emxMailUtil} mailUtil = new ${CLASS:emxMailUtil}(context, null);

        StringList toList = new StringList();
        toList.addElement(taskOwner);
        String subjectKey = "emxFramework.InboxTaskJPO.triggerActionDemoteOnReviewState.SubjectReviewCompleted";
        String[] subjectKeys = {};
        String[] subjectValues = {};

        String messageKey = "emxFramework.InboxTaskJPO.triggerActionPromoteOnReviewState.MessageReviewCompletedPromote";
        String[] messageKeys = {"IBType", "IBName", "IBRev", "RType", "RName", "RRev"};
        String[] messageValues = {taskType, taskName, taskRev, routeType, routeName, routeRev};

        mailUtil.sendNotification(context,
                          toList,
                          null,
                          null,
                          subjectKey,
                          subjectKeys,
                          subjectValues,
                          messageKey,
                          messageKeys,
                          messageValues,
                          null,
                          null);*/
    }

    /**
     * check trigger on promote event of state "Review" of policy "Inbox Task"
     * if the task is to be reviewed and the user is not the Route owner, an MQL error message needs to be shown
     * since Review can be done by the route owner only
     *
     * @param context the eMatrix Context object
     * @param holds inboxtaskid
     * @return int - "0" if check is true, "1" if check is false
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public int triggerCheckPromoteOnReviewState(matrix.db.Context context, String[] args)
        throws Exception
    {
    	String SELECT_ROUTE_STATUS  = "from[" + DomainObject.RELATIONSHIP_ROUTE_TASK + "].to.attribute[" + DomainObject.ATTRIBUTE_ROUTE_STATUS + "]";
    	String fromAutoComplete = MqlUtil.mqlCommand(context, "get env $1", "MX_TASK_AUTO_COMPLETE");
    	String fromAutoCompleteEKL = MqlUtil.mqlCommand(context, "get env $1", "MX_TASK_AUTO_COMPLETE_EKL");
    	if ("true".equals(fromAutoComplete)) {
    		
    		StringList selects = new StringList();            
    		selects.addElement(strAttrRouteOwnerTask);
    	    selects.addElement("id");
    	    selects.addElement(SELECT_ROUTE_NODE_ID);    
    	    selects.addElement("from[" + RELATIONSHIP_ROUTE_TASK + "].to.id");
    	    Map taskMap = getInfo(context, selects);
    	    
    	    String stAttrRouteOwnerTask = (String)taskMap.get(strAttrRouteOwnerTask);    	    
    	    
    	    if("TRUE".equalsIgnoreCase(stAttrRouteOwnerTask)) {  				
    				InboxTask taskObject = (InboxTask)DomainObject.newInstance(context, (String) taskMap.get("id"));
    				HashMap attributesMap = new HashMap();
    				attributesMap.put(sAttrRouteOwnerTask,"FALSE")	;
    				attributesMap.put(sAttrRouteOwnerUGChoice,"")	;
    				taskObject.setAttributeValues(context, attributesMap);
    				String routeId = (String)taskMap.get("from[" + RELATIONSHIP_ROUTE_TASK + "].to.id");
    				
    				String routeNodeId = (String) taskMap.get(SELECT_ROUTE_NODE_ID);
    				Route routeObject = (Route)DomainObject.newInstance(context, routeId);
    				String relId = routeObject.getRouteNodeRelId(context, routeNodeId);
    				DomainRelationship.setAttributeValues(context, relId, attributesMap);
    	    }  	    
    		
    		return 0;
    	}
    	if("true".equalsIgnoreCase(fromAutoCompleteEKL)) {
    		return 0;
    	}
        //build selects
        StringList selects = new StringList();
        selects.addElement("attribute["+ATTRIBUTE_REVIEW_TASK+"]");
        selects.addElement("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
		selects.addElement("from["+DomainObject.RELATIONSHIP_PROJECT_TASK+"]");
        selects.addElement("current");
        selects.addElement("owner");
        selects.addElement(strAttrRouteAction); 
        selects.addElement("attribute[" + ATTRIBUTE_TITLE + "]");
        selects.addElement("attribute[" + DomainObject.ATTRIBUTE_COMMENTS + "]");   
        selects.addElement(SELECT_REVISION); 
        selects.addElement(SELECT_NAME);
        selects.addElement(SELECT_TYPE);
		selects.addElement("attribute[" + ATTRIBUTE_APPROVAL_STATUS + "]");        
		selects.addElement(SELECT_ROUTE_STATUS);
		selects.addElement(strAttrRouteOwnerUGChoice);
	    selects.addElement(strAttrRouteOwnerTask);
	    selects.addElement(SELECT_ROUTE_NODE_ID);
		String reviewComments               = PropertyUtil.getSchemaProperty(context, "attribute_ReviewersComments");
		String reviewCommentsNeeded         = PropertyUtil.getSchemaProperty(context, "attribute_ReviewCommentsNeeded");
		String SELECT_REVIEW_COMMENTS       	= "attribute["+reviewComments+"]";
		String SELECT_REVIEW_COMMENTS_NEEDED	= "attribute["+reviewCommentsNeeded+"]";
        selects.addElement(SELECT_REVIEW_COMMENTS_NEEDED);
		selects.addElement(SELECT_REVIEW_COMMENTS);   
		String SELECT_REQUIRES_ESIGN = "from[" + RELATIONSHIP_ROUTE_TASK + "].to.attribute[" +ATTRIBUTE_REQUIRES_ESIGN + "]";
		selects.addElement(SELECT_REQUIRES_ESIGN);
        //get the details required
        Map taskMap = getInfo(context, selects);
        String type=(String)taskMap.get(SELECT_TYPE);
        String name=(String)taskMap.get(SELECT_NAME);
        String taskTitle=(String)taskMap.get("attribute[" + ATTRIBUTE_TITLE + "]");
        if(UIUtil.isNullOrEmpty(taskTitle)) {
        	taskTitle = name;
        }
        String revision =(String)taskMap.get(SELECT_REVISION);
        String reviewTask = (String) taskMap.get("attribute["+ATTRIBUTE_REVIEW_TASK+"]");
        String routeOwner = (String) taskMap.get("from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
        String taskOwner = (String) taskMap.get("owner");
        String comments = (String) taskMap.get("attribute[" + DomainObject.ATTRIBUTE_COMMENTS + "]");
		String status = (String) taskMap.get("attribute[" + DomainObject.ATTRIBUTE_APPROVAL_STATUS + "]");
		String isConnected = (String) taskMap.get("from["+RELATIONSHIP_PROJECT_TASK+"]");
		String stAttrRouteOwnerUGChoice=(String)taskMap.get(strAttrRouteOwnerUGChoice);
	    String stAttrRouteOwnerTask=(String)taskMap.get(strAttrRouteOwnerTask);
        
        String STATE_ASSIGNED = PropertyUtil.getSchemaProperty(context, "policy", POLICY_INBOX_TASK, "state_Assigned");
        String STATE_REVIEW = PropertyUtil.getSchemaProperty(context, "policy", POLICY_INBOX_TASK, "state_Review");
        String current = (String) taskMap.get("current");
        String SELECT_ROUTE_ID = "from[" + RELATIONSHIP_ROUTE_TASK + "].to.id";
        String routeId = getInfo(context,SELECT_ROUTE_ID);
        String strCommand = "error $1";
		if("false".equalsIgnoreCase(isConnected)){
			 String msg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.Common.CanNotApproveTask");
		     MqlUtil.mqlCommand(context, strCommand, msg);
		     return 1;
		}
		
		if("true".equalsIgnoreCase(stAttrRouteOwnerTask)){
			if(UIUtil.isNotNullAndNotEmpty(stAttrRouteOwnerUGChoice) && routeOwner.equals(taskOwner)){
				MapList ugMembers=FrameworkUtil.getProjectGroupAssignees(context, stAttrRouteOwnerUGChoice);
				boolean checkPerson=false;
				int ugMembersSize=ugMembers.size();
				for (int i = 0; i < ugMembersSize; i++) {
                   Map objectMap = (Map) ugMembers.get(i);
				   String personName = (String) objectMap.get(DomainObject.SELECT_NAME);
				   if(taskOwner.equalsIgnoreCase(personName))
				   {
					   checkPerson=true;
					   break;
				   }
				}
				if(!checkPerson)
				{   StringList selectable = new StringList(1);
                    selectable.add(SELECT_ATTRIBUTE_TITLE);
                    DomainObject ugObject = new DomainObject();
                    ugObject.setId(stAttrRouteOwnerUGChoice);
                    Map mapAssigneeInfo = ugObject.getInfo (context, selectable);
                    String ugTitle=(String)mapAssigneeInfo.get(SELECT_ATTRIBUTE_TITLE);
				    String msg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.Common.CanNotApproveUGTask");
				    msg+=" "+"'"+ugTitle+"'";
				    MqlUtil.mqlCommand(context, strCommand, msg);
		    		return 1;
                }
			}
			InboxTask taskObject = (InboxTask)DomainObject.newInstance(context, (String) taskMap.get("id"));
			HashMap attributesMap = new HashMap();
			attributesMap.put(sAttrRouteOwnerTask,"FALSE")	;
			attributesMap.put(sAttrRouteOwnerUGChoice,"")	;
			taskObject.setAttributeValues(context, attributesMap);
			
			String routeNodeId = (String) taskMap.get(SELECT_ROUTE_NODE_ID);
			Route routeObject = (Route)DomainObject.newInstance(context, routeId);
			String relId = routeObject.getRouteNodeRelId(context, routeNodeId);
			DomainRelationship.setAttributeValues(context, relId, attributesMap);
			
   		}
		strCommand = "notice $1";
        //the Task must be promoted after review only if the user is the Route owner
        if(STATE_REVIEW.equals(current) && reviewTask.equalsIgnoreCase("Yes"))
        {
            String isReviewCommentRequired = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.EnforceOwnerReviewComments");
        	boolean hasReviewerCommnets=true;
            String strReviewCommentsNeeded = (String)taskMap.get(SELECT_REVIEW_COMMENTS_NEEDED);
     		String strReviewComments = (String)taskMap.get(SELECT_REVIEW_COMMENTS);
     		if(UIUtil.isNotNullAndNotEmpty(strReviewCommentsNeeded) && strReviewCommentsNeeded.equalsIgnoreCase("Yes")) {
     	    	hasReviewerCommnets = UIUtil.isNotNullAndNotEmpty(strReviewComments);
				if("false".equals(isReviewCommentRequired)){
					hasReviewerCommnets = true;
				}
        	}
            //show MQL error message
        	if (!context.getUser().equals(routeOwner)) {
            String msg = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.InboxTaskJPO.triggerCheckPromoteOnReviewState.CannotPromoteRouteInReviewState", context.getLocale());
            MqlUtil.mqlCommand(context, strCommand, msg);
            return 1;
        	} 
        	if(!hasReviewerCommnets) {
        		 String msg = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.TaskDetails.EditReviewComments");
                 MqlUtil.mqlCommand(context, strCommand, msg);
                 return 1;
        		
        	}
        }else if(!"Notify Only".equals((String) taskMap.get(strAttrRouteAction)) && STATE_ASSIGNED.equals(current)){
        	if(!(context.getUser().equals(taskOwner) || context.getUser().equals("User Agent"))){
        		String msg = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.InboxTaskJPO.triggerCheckPromoteOnAssignedState.CannotPromoteRouteTaskState", context.getLocale());
                MqlUtil.mqlCommand(context, strCommand, msg);
        		return 1;
       		}else if (UIUtil.isNullOrEmpty(comments) && checkForCommentRequired(context, status, comments)) {
				String msg = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.FormComponent.MustEnterAValidValueFor",
						context.getLocale());
       		   msg +=" "+EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Comments", context.getLocale());
       		   MqlUtil.mqlCommand(context, strCommand, msg);
               return 1;
			}else{
				boolean canTaskCompleted = false;
				InboxTask taskObject = (InboxTask)DomainObject.newInstance(context, (String) taskMap.get("id"));
				try{
					ContextUtil.pushContext(context);
					canTaskCompleted = taskObject.canCompleteTask(context);
					if(!canTaskCompleted){
						String msg =  EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.Common.CanNotPromoteTask");
		                MqlUtil.mqlCommand(context, strCommand, msg);
		        		return 1;
						}
					} finally {
							ContextUtil.popContext(context);
					}
				//String esignConfigSetting = MqlUtil.mqlCommand(context, "list expression $1 select $2 dump","ENXESignRequiresESign", "value");
				boolean isESigned = false;
				String eSign = (String) taskMap.get(SELECT_REQUIRES_ESIGN);
				if("true".equalsIgnoreCase(eSign)) {
					isESigned = true;
				}
				/*if("RouteSpecific".equalsIgnoreCase(esignConfigSetting)){
					Route routeObject = (Route)DomainObject.newInstance(context, routeId);
					String eSign = (String) routeObject.getInfo(context,"attribute[Requires ESign]");
					if("true".equalsIgnoreCase(eSign)) {
						isESigned = true;
					}
				}else if("All".equalsIgnoreCase(esignConfigSetting)) {
					isESigned = true;
				}*/
				String taskTypeNameRevision=name+","+revision+"|";
				updateHistory(context,status,type,taskTypeNameRevision+taskTitle,revision,taskOwner,comments,routeId,null,isESigned);
           }
        }
        return 0;
    }
    
    
    private void updateHistory(matrix.db.Context context,String approvalStatus,String type,String name,String revision,String routeOwner,String comments,String routeId,String reviewRejectedOrCompleted, boolean isESigned) throws FrameworkException{
        String historyEntryAll="";
        String mql1 =  "modify bus $1 add history $2 comment $3";
        String comment= " Task :'" +" "+ type +","+ name +" ";
        String isSignedComment = " ";
        if(isESigned) {
        	isSignedComment = " with electronic signature ";
        }
            switch(approvalStatus){
                case "Approve": historyEntryAll = comment+ "' was approved"+ isSignedComment +"by: " +  routeOwner+ " with Comments:'" + comments + "'";
                                break;
                case "Reject": historyEntryAll = comment+ "' was rejected"+ isSignedComment +"by: " +  routeOwner+ " with Comments:'" + comments + "'";
                                break;
                case "Abstain": historyEntryAll = comment+ "' was abstained"+ isSignedComment +"by: " +  routeOwner+ " with Comments:'" + comments + "'";
                                break;
                case "Review_Demote": historyEntryAll = comment+ "' was reviewed and "+ reviewRejectedOrCompleted +" by: " +  routeOwner+ " with Comments:'" + comments + "'";
								break;
                case "Review_Promote": historyEntryAll = comment+ "' was reviewed and "+ reviewRejectedOrCompleted +" by: " +  routeOwner+ " with Comments:'" + comments + "'";
                				break;
                default:    historyEntryAll = comment+"' was commented by: " +  routeOwner+ " with Comments:'" + comments + "'"; 
                                break;
                                
        }
        
        MqlUtil.mqlCommand(context, mql1, false, routeId, approvalStatus, historyEntryAll); 
    }


  /**
     * getAllTasks - gets the list of All Tasks the user has access
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since 10.5
     * @grade 0
     */
   public Object getAllTasks(Context context, String[] args) throws Exception
   {

        return getTasks(context,"");
   }
  /**
     * getActiveTasks - gets the list of Tasks in Assigned State
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since 10.5
     * @grade 0
     */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public Object getActiveTasks(Context context, String[] args) throws Exception
   {

        String stateInboxTaskAssigned = PropertyUtil.getSchemaProperty(context,"policy",DomainObject.POLICY_INBOX_TASK,"state_Assigned");
        String stateWorkFlowTaskAssigned = PropertyUtil.getSchemaProperty(context,"policy", policyWorkflowTask, "state_Assigned");
        String stateTaskAssign = PropertyUtil.getSchemaProperty(context,"policy",DomainObject.POLICY_PROJECT_TASK,"state_Assign");
        String stateTaskActive = PropertyUtil.getSchemaProperty(context,"policy",DomainObject.POLICY_PROJECT_TASK,"state_Active");
        String stateTaskReview = PropertyUtil.getSchemaProperty(context,"policy",DomainObject.POLICY_PROJECT_TASK,"state_Review");

         //commented for Bug NO:338177
        /* String WBSWhereExp = "(type == 'Task'";
        if(stateTaskReview == null || "".equals(stateTaskReview) || "null".equals(stateTaskReview))
        {
          WBSWhereExp = WBSWhereExp+")";
        } else {
          WBSWhereExp = WBSWhereExp +" && current == " + stateTaskReview + ")";
        }*/
        StringBuffer sbf=new StringBuffer();
        if(stateInboxTaskAssigned != null && !"".equals(stateInboxTaskAssigned))
        {
          sbf.append("(current == "+stateInboxTaskAssigned);
          sbf.append(" && " + "from[" + RELATIONSHIP_ROUTE_TASK + "].to.attribute[" + ATTRIBUTE_ROUTE_STATUS + "] != \"Stopped\") ");
        }
        if(stateWorkFlowTaskAssigned!=null &&!"".equals(stateWorkFlowTaskAssigned))
        {
            if(sbf.length()!=0) {
              sbf.append(" || (");
            }
            sbf.append("type == \"" + sTypeWorkflowTask + "\" && ");
            sbf.append("current == "+stateWorkFlowTaskAssigned + ")");
         }
        if( stateTaskAssign!=null &&!"".equals( stateTaskAssign))
        {
            if(sbf.length()!=0) {
              sbf.append(" || ");
            }
            sbf.append("current == "+ stateTaskAssign);
        }
        if( stateTaskActive!=null &&!"".equals( stateTaskActive))
        {
            if(sbf.length()!=0) {
              sbf.append(" || ");
            }
            sbf.append("current == "+ stateTaskActive);
        }
        if(stateTaskReview!=null &&!"".equals( stateTaskReview))
        {
            if(sbf.length()!=0) {
              sbf.append(" || ");
            }
            sbf.append("current == "+ stateTaskReview);
        }
       // commented for Bug NO:338177
        /*  if(  WBSWhereExp!=null &&!"".equals(  WBSWhereExp))
        {
            if(sbf.length()!=0) {
              sbf.append(" || ");
            }
            sbf.append(WBSWhereExp);
        }*/
        return getTasks(context,sbf.toString()) ;
   }

  /**
     * getCompletedTasks - gets the list of Tasks in Complete State
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since 10.5
     * @grade 0
     */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public Object getCompletedTasks(Context context, String[] args) throws Exception
   {

        String stateInboxTaskComplete = PropertyUtil.getSchemaProperty(context,"policy", DomainObject.POLICY_INBOX_TASK,"state_Complete");
    String stateWorkFlowTaskComplete = PropertyUtil.getSchemaProperty(context,"policy", policyWorkflowTask, "state_Completed");
    String stateTaskComplete = PropertyUtil.getSchemaProperty(context,"policy",DomainObject.POLICY_PROJECT_TASK,"state_Complete");
    //added for the 325218
    StringBuffer sbf=new StringBuffer();
    if(stateInboxTaskComplete !=null && !"".equals(stateInboxTaskComplete))
      sbf.append("  current == "+ stateInboxTaskComplete);
    if(stateWorkFlowTaskComplete!=null &&!"".equals(stateWorkFlowTaskComplete))
     {
      if(sbf.length()!=0)
        sbf.append(" || ");
      sbf.append("current == "+stateWorkFlowTaskComplete);
     }
    if(stateTaskComplete!=null&&!"".equals(stateTaskComplete))
     {
      if(sbf.length()!=0)
        sbf.append(" || ");
        sbf.append("current == "+stateTaskComplete);
     }

       return getTasks(context,sbf.toString());
    //till here
   }
  /**
     * getTasks - gets the list of Tasks depending on condition
     * @param context the eMatrix <code>Context</code> object
     * @param busWhere condition to query
     * @returns Object
     * @throws Exception if the operation fails
     * @since 10.5
     * @grade 0
     */
   public Object getTasks(Context context, String busWhere ) throws Exception
   {

        try
        {
            DomainObject taskObject = DomainObject.newInstance(context);
            DomainObject boPerson     = PersonUtil.getPersonObject(context);
            String stateInboxTaskReview = PropertyUtil.getSchemaProperty(context,"policy",DomainObject.POLICY_INBOX_TASK,"state_Review");
            String selRouteTaskUser       = getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_TASK_USER);
            StringList selectRelStmts  = new StringList();
      //Added for Bug No 338177 Begin
            StringList selectTypeStmtId = new StringList();
            selectTypeStmtId.add(SELECT_ID);
            
            //Added for Bug No 338177 End
            StringList selectTypeStmts = new StringList();
            selectTypeStmts.add(SELECT_NAME);
            selectTypeStmts.add(SELECT_TYPE);
            selectTypeStmts.add(SELECT_ID);
            selectTypeStmts.add(SELECT_DESCRIPTION);
            selectTypeStmts.add(SELECT_OWNER);
            selectTypeStmts.add(SELECT_MODIFIED);
            selectTypeStmts.add(SELECT_CURRENT);
            selectTypeStmts.add(strAttrRouteAction);
            selectTypeStmts.add(strAttrCompletionDate);
            selectTypeStmts.add(strAttrTaskCompletionDate);
            selectTypeStmts.add("attribute[" + DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS + "]");
            selectTypeStmts.add(strAttrTitle);
            selectTypeStmts.add(objectTypeSelectStr);
            selectTypeStmts.add(objectIdSelectStr);
            selectTypeStmts.add(objectNameSelectStr);
            selectTypeStmts.add(objectTitleSelectStr);
            selectTypeStmts.add(routeIdSelectStr);
            selectTypeStmts.add(routeNameSelectStr);
            selectTypeStmts.add(routeOwnerSelectStr);
            selectTypeStmts.add(SELECT_TASK_ASSIGNEE_TYPE);
            selectTypeStmts.add(SELECT_TASK_ASSIGNEE_TITLE);
            selectTypeStmts.add(SELECT_TASK_ASSIGNEE_NAME);
            selectTypeStmts.add(selRouteTaskUser);

            selectTypeStmts.add(SELECT_TYPE);
            selectTypeStmts.add(routeTypeSelectStr);
            selectTypeStmts.add(workflowIdSelectStr);
            selectTypeStmts.add(workflowNameSelectStr);
            selectTypeStmts.add(workflowTypeSelectStr);
            selectTypeStmts.add(strAttrworkFlowDueDate);
            selectTypeStmts.add(strAttrTaskEstimatedFinishDate);
            selectTypeStmts.add(strAttrworkFlowCompletinDate);
            selectTypeStmts.add(strAttrTaskFinishDate);
            selectTypeStmts.add(TASK_PROJECT_ID);
            selectTypeStmts.add(TASK_PROJECT_NAME);
            selectTypeStmts.add(TASK_PROJECT_TYPE);
            selectTypeStmts.add(TASK_PROJECT_ATTRIBUTE_TITLE);
            selectTypeStmts.add(TASK_PROJECT_POLICY);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_POLICY);
            
            

			selectTypeStmts.add(SELECT_KINDOF_TASK);
			selectTypeStmts.add(SELECT_KINDOF_WORKFLOW_TASK);
			selectTypeStmts.add(SELECT_KINDOF_INBOX_TASK);

            selectTypeStmts.add(ROUTE_PROJECT_ID);
            selectTypeStmts.add(ROUTE_PROJECT_NAME);
            selectTypeStmts.add(ROUTE_PROJECT_TYPE);
            selectTypeStmts.add(ROUTE_PROJECT_Title_NAME);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_ID);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_TYPE);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_NAME);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_ATTRIBUTE_TITLE);
			selectTypeStmts.add(routeScopeSelectStr);
			selectTypeStmts.add(strAttrTaskApprovalStatus);

            /*  selectTypeStmts.add(Route.SELECT_APPROVAL_STATUS);*/
            String sPersonId = boPerson.getObjectId();

            Pattern relPattern = new Pattern(sRelProjectTask);
            relPattern.addPattern(sRelAssignedTask);
            relPattern.addPattern(sRelWorkflowTaskAssinee);

            Pattern typePattern = new Pattern(sTypeInboxTask);
            typePattern.addPattern(DomainObject.TYPE_TASK);
            typePattern.addPattern(sTypeWorkflowTask);
			typePattern.addPattern(DomainObject.TYPE_CHANGE_TASK);

            SelectList selectStmts = new SelectList();
            taskObject.setId(sPersonId);
           // get the list of tasks that needs owner review
       //Added for bug 352071
            String strCommand = "temp query bus $1 $2 $3 where $4 select $5 dump $6";
            StringBuffer bufWhereClause = new StringBuffer(100);
            bufWhereClause.append("attribute[");
            bufWhereClause.append(sAttrReviewCommentsNeeded);
            bufWhereClause.append("]==Yes && current==");
            bufWhereClause.append(stateInboxTaskReview);
            bufWhereClause.append("&& from[");
            bufWhereClause.append(sRelRouteTask);
            bufWhereClause.append("].to.owner==");
            bufWhereClause.append("'").append(context.getUser()).append("'");
            String strResult = MqlUtil.mqlCommand(context, strCommand, sTypeInboxTask, "*", "*", bufWhereClause.toString(), "id", "|" );
            //end of bug 352071
            //Added for Bug No 338177 Begin
      com.matrixone.apps.domain.util.MapList taskMapList =  taskObject.getRelatedObjects(context,
                                                                                relPattern.getPattern(),
                                                                                typePattern.getPattern(),
                                                                                selectTypeStmtId,
                                                                                selectRelStmts,
                                                                                true,
                                                                                true,
                                                                                (short)2,
                                                                                busWhere,
                                                                                null,
                                                                                null,
                                                                                null,
                                                                                null);

      
      StringList groupSelect = new StringList();
	  groupSelect.add(DomainConstants.SELECT_PHYSICAL_ID);
	  MapList groupMapList = taskObject.getRelatedObjects(context,DomainConstants.RELATIONSHIP_GROUPMEMBER, "*",groupSelect,null,true,false,(short) 1,"",null,0);
	  int groupMapListSize = groupMapList.size();
	  
	  for(int i = 0; i<groupMapListSize; i++){
		  Map groupInfo = (Map) groupMapList.get(i);
		  String groupId = (String) groupInfo.get(DomainConstants.SELECT_PHYSICAL_ID);
		  DomainObject groupObj = DomainObject.newInstance(context);
		  groupObj.setId(groupId);
		  MapList groupAssignedTasksMapList = groupObj.getRelatedObjects(context,DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "*",selectTypeStmts,null,false,true,(short) 0,busWhere,null,0);
		  
		  if(groupAssignedTasksMapList!=null && !groupAssignedTasksMapList.isEmpty()) {
			   
			  if(taskMapList.isEmpty()) {//Add all Group assignments if taskMapList is empty.
				  taskMapList.addAll(groupAssignedTasksMapList);  
			  } else {
				  MapList groupMapListToAdd = new MapList();
				  int taskMapListSize = taskMapList.size();
				  int groupAssignedTasksMapListSize = groupAssignedTasksMapList.size();
				  
				  for(int j=0;j<groupAssignedTasksMapListSize;j++) {
					  Map groupAssignedTasksMap = (Map)groupAssignedTasksMapList.get(j);
					  String groupTaskId	= (String)groupAssignedTasksMap.get(SELECT_ID);
					  boolean isDuplicateTask = false;
					  
					  for(int k=0;k<taskMapListSize;k++) {
						  Map taskMap = (Map)taskMapList.get(k);
						  String taskId	= (String)taskMap.get(SELECT_ID);
						  String taskName	= (String)taskMap.get(SELECT_NAME);
						  if(groupTaskId.equalsIgnoreCase(taskId)) {
							  isDuplicateTask = true;
							  break;
						  }
					  }
					  if(!isDuplicateTask) {
						  groupMapListToAdd.add(groupAssignedTasksMap);
					  }
				  }
				  //Add only tasks which were not present in taskMapList before
				  taskMapList.addAll(groupMapListToAdd);
			  }
		  }
	  }
      
      
       //Added for bug 352071
      if(strResult!=null && !"".equals(strResult))
            {
                String taskInbox = "";
                StringList strlResult = new StringList();
                String strTemp = "";
                StringList taskIds =FrameworkUtil.split(strResult,"\n");
                Iterator taskIdIterator=taskIds.iterator();
                while(taskIdIterator.hasNext())
                {
                	Map tempMap= new HashMap();
                    taskInbox=(String)taskIdIterator.next();
                    strlResult = FrameworkUtil.split(taskInbox,"|");
                    strTemp=(String)strlResult.get(3);
					boolean isPresent = false;
                    for( int i=0; i<taskMapList.size(); i++){
            			Map map = (Map)taskMapList.get(i);
            			String id = (String)map.get("id");
            			if(strTemp.equals(id)){
            				isPresent = true;
							break;
            			}
            		}
                    if(!isPresent){
                    tempMap.put("id",strTemp);
                    taskMapList.add(tempMap);
                }
            }
            }
       //end for bug 352071
            String[] objectIds=new String[taskMapList.size()];
            Iterator idsIterator=taskMapList.iterator();

            for(int i=0;idsIterator.hasNext();i++){
                Map map=(Map)idsIterator.next();
                objectIds[i]=(String)map.get("id");
            }
            taskMapList=DomainObject.getInfo(context,objectIds,selectTypeStmts);
            //Added for Bug No 338177 End


            // Added for 318463
            // Get the context (top parent) object for WBS Tasks to dispaly appropriate tree for WBS Tasks
            MQLCommand mql = new MQLCommand();
	        final String GROUPTYPE = PropertyUtil.getSchemaProperty(context,"type_Group");
	        final String PROXYGROUPTYPE = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
	        final String strUserGroup = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",context.getLocale(), "emxFramework.Type.Group");
            String sTaskType = "";
            String sTaskId = "";
            String sMql = "";
            String assigneeType = "";
            String taskAssingee = "";
            String routeTaskUser = "";
            boolean bResult = false;
            String sResult = "";
            StringTokenizer sResultTkz = null;
            MapList finalTaskMapList = new MapList();
           Iterator objectListItr = taskMapList.iterator();
           String kindOffTask="";
            while(objectListItr.hasNext())
            {

                Map objectMap = (Map) objectListItr.next();
                sTaskType = (String)objectMap.get(DomainObject.SELECT_TYPE);
                assigneeType = (String)objectMap.get(SELECT_TASK_ASSIGNEE_TYPE);
                kindOffTask = (String)objectMap.get(SELECT_KINDOF_TASK);
                
                if(DomainConstants.TYPE_PERSON.equals(assigneeType)){
              	  taskAssingee = (String)objectMap.get(SELECT_TASK_ASSIGNEE_NAME);
              	  objectMap.put("TaskAssignee", PersonUtil.getFullName(context, taskAssingee));
                }else if(PROXYGROUPTYPE.equals(assigneeType) || GROUPTYPE.equals(assigneeType)){
              	  taskAssingee = (String)objectMap.get(SELECT_TASK_ASSIGNEE_TITLE) + "("+strUserGroup+")";
              	  objectMap.put("TaskAssignee", taskAssingee);
                }else {
              	  routeTaskUser = (String)objectMap.get(selRouteTaskUser);
                    if (routeTaskUser != null && !"".equals(routeTaskUser)) {
                    	String isRoleGroup = "";
                    	if(routeTaskUser.indexOf("_") > -1){
                    		isRoleGroup = routeTaskUser.substring(0,routeTaskUser.indexOf("_"));
                    	}
                       if("role".equals(isRoleGroup)) {
                      	 objectMap.put("TaskAssignee", i18nNow.getAdminI18NString("Role",PropertyUtil.getSchemaProperty(context, routeTaskUser),context.getLocale().getLanguage())+"("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale(),"emxComponents.Common.Role")+")");
                       } else if ("group".equals(isRoleGroup)) {
                      	 objectMap.put("TaskAssignee", i18nNow.getAdminI18NString("Group", PropertyUtil.getSchemaProperty( context,routeTaskUser),context.getLocale().getLanguage())+"("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale(),"emxComponents.Common.Group")+")");
                       }else {
                      	 objectMap.put("TaskAssignee", routeTaskUser);
                       }
                   }
                }
                // if Task is WBS then add the context (top) object information
                if ("TRUE".equalsIgnoreCase(kindOffTask))
                {

                    sTaskId = (String)objectMap.get(taskObject.SELECT_ID);
                    String projectPolicy = (String)objectMap.get(TASK_PROJECT_POLICY);
                    if(POLICY_PROJECT_SPACE_HOLD_CANCEL.equalsIgnoreCase(projectPolicy)) {
                		continue;
                	}
                    sMql = "expand bus "+sTaskId+" to rel "+sRelSubTask+" recurse to 1 select bus id dump |";
                    bResult = mql.executeCommand(context, sMql);
                    if(bResult) {

                        sResult = mql.getResult().trim();
                        //Bug 318325. Added if condition to check sResult object as not null and not empty.
                        if(sResult!=null && !"".equals(sResult)) {

                            sResultTkz = new StringTokenizer(sResult,"|");
                            sResultTkz.nextToken();
                            sResultTkz.nextToken();
                            sResultTkz.nextToken();
                            objectMap.put("Context Object Type",(String)sResultTkz.nextToken());
                            objectMap.put("Context Object Name",(String)sResultTkz.nextToken());
                            sResultTkz.nextToken();
                            objectMap.put("Context Object Id",(String)sResultTkz.nextToken());
                        }
                    }
                }
                
                if ((DomainObject.TYPE_INBOX_TASK).equalsIgnoreCase(sTaskType))
                {
                    String projectPolicy = (String)objectMap.get(ROUTE_TASK_PROJECT_POLICY);
                    if(UIUtil.isNotNullAndNotEmpty(projectPolicy) && projectPolicy.contains(POLICY_PROJECT_SPACE_HOLD_CANCEL)) {
                		continue;
                	}
                }
                finalTaskMapList.add(objectMap);

            }
            return finalTaskMapList;
        }
        catch (Exception ex)
        {
            throw ex;
        }
   }
     /**
     * getMyDeskTasks - gets the list of Tasks the user has access
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Object getMyDeskTasks(Context context, String[] args)
        throws Exception
    {

        try
        {
            HashMap programMap        = (HashMap) JPO.unpackArgs(args);
            DomainObject taskObject = DomainObject.newInstance(context);
            DomainObject boPerson     = PersonUtil.getPersonObject(context);
            String selRouteTaskUser       = getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_TASK_USER);
            StringList selectTypeStmts = new StringList();
            StringList selectRelStmts  = new StringList();
            selectTypeStmts.add(DomainConstants.SELECT_NAME);
            selectTypeStmts.add(DomainConstants.SELECT_ID);
            selectTypeStmts.add(SELECT_TYPE);
            selectTypeStmts.add(DomainConstants.SELECT_DESCRIPTION);
            selectTypeStmts.add(DomainConstants.SELECT_OWNER);
            selectTypeStmts.add(DomainConstants.SELECT_CURRENT);
            selectTypeStmts.add(strAttrRouteAction);
            selectTypeStmts.add(strAttrCompletionDate);
            selectTypeStmts.add(strAttrTaskCompletionDate);
            selectTypeStmts.add(strAttrTaskApprovalStatus);
            selectTypeStmts.add(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_ACTION));
            selectTypeStmts.add("attribute[" + DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS + "]");
            selectTypeStmts.add(strAttrTitle);
            selectTypeStmts.add(objectTypeSelectStr);
            selectTypeStmts.add(objectIdSelectStr);
            selectTypeStmts.add(objectNameSelectStr);
            selectTypeStmts.add(objectTitleSelectStr);
            selectTypeStmts.add(routeIdSelectStr);
            selectTypeStmts.add(routeNameSelectStr);
            selectTypeStmts.add(routeOwnerSelectStr);
            selectTypeStmts.add(routeApprovalStatusSelectStr);
            selectTypeStmts.add(SELECT_TASK_ASSIGNEE_TYPE);
            selectTypeStmts.add(SELECT_TASK_ASSIGNEE_TITLE);
            selectTypeStmts.add(SELECT_TASK_ASSIGNEE_NAME);
            selectTypeStmts.add(selRouteTaskUser);
            selectTypeStmts.add(DomainConstants.SELECT_TYPE);
            selectTypeStmts.add(routeTypeSelectStr);
            selectTypeStmts.add(workflowIdSelectStr);
            selectTypeStmts.add(workflowNameSelectStr);
            selectTypeStmts.add(workflowTypeSelectStr);
            selectTypeStmts.add(strAttrworkFlowDueDate);
            selectTypeStmts.add(strAttrTaskEstimatedFinishDate);
            selectTypeStmts.add(strAttrworkFlowCompletinDate);
            selectTypeStmts.add(strAttrTaskFinishDate);
            selectTypeStmts.add(TASK_PROJECT_ID);
            selectTypeStmts.add(TASK_PROJECT_TYPE);
            selectTypeStmts.add(TASK_PROJECT_NAME);
            selectTypeStmts.add(TASK_PROJECT_ATTRIBUTE_TITLE);
            selectTypeStmts.add(SELECT_KINDOF_TASK);
        	selectTypeStmts.add(SELECT_KINDOF_WORKFLOW_TASK);
			selectTypeStmts.add(SELECT_KINDOF_INBOX_TASK);
            selectTypeStmts.add(ROUTE_PROJECT_ID);
            selectTypeStmts.add(ROUTE_PROJECT_NAME);
            selectTypeStmts.add(ROUTE_PROJECT_TYPE);
            selectTypeStmts.add(ROUTE_PROJECT_Title_NAME);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_TYPE);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_ID);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_NAME);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_ATTRIBUTE_TITLE);
            selectTypeStmts.add(TASK_PROJECT_POLICY);
            selectTypeStmts.add(routeScopeSelectStr);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_POLICY);            
            /*  selectTypeStmts.add(Route.SELECT_APPROVAL_STATUS);*/
            String sPersonId = boPerson.getObjectId();



            Pattern relPattern = new Pattern(sRelProjectTask);
            relPattern.addPattern(sRelAssignedTask);
            relPattern.addPattern(sRelWorkflowTaskAssinee);

            Pattern typePattern = new Pattern(sTypeInboxTask);
            typePattern.addPattern(DomainObject.TYPE_TASK);
            typePattern.addPattern(sTypeWorkflowTask);
            typePattern.addPattern(DomainObject.TYPE_CHANGE_TASK);

            SelectList selectStmts = new SelectList();
            taskObject.setId(sPersonId);
            String busWhere = null;

            ContextUtil.startTransaction(context,false);
            ExpansionIterator expItr = taskObject.getExpansionIterator(context,
                                                                       relPattern.getPattern(),
                                                                       typePattern.getPattern(),
                                                                       selectTypeStmts,
                                                                       selectRelStmts,
                                                                       true,
                                                                       true,
                                                                       (short)2,
                                                                       busWhere,
                                                                       null,
                                                                       (short)0,
                                                                       false,
                                                                       false,
                                                                       (short)100,
                                                                       false);

            com.matrixone.apps.domain.util.MapList taskMapList = null;
            try {
                taskMapList = FrameworkUtil.toMapList(expItr,(short)0,null,null,null,null);
            } finally {
                expItr.close();
            }
            ContextUtil.commitTransaction(context);

            // Added for 318463
            // Get the context (top parent) object for WBS Tasks to dispaly appropriate tree for WBS Tasks
	        String GROUPTYPE = PropertyUtil.getSchemaProperty(context,"type_Group");
	        String PROXYGROUPTYPE = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
	        String strUserGroup = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",context.getLocale(), "emxFramework.Type.Group");
            MQLCommand mql = new MQLCommand();
            String sTaskType = "";
            String sTaskId = "";
            String assigneeType = "";
            String taskAssingee = "";
            String routeTaskUser = "";
            String sMql = "";
            boolean bResult = false;
            String sResult = "";
            StringTokenizer sResultTkz = null;
            String kindOffTask="";

            MapList finalTaskMapList = new MapList();
            Iterator objectListItr = taskMapList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();
                sTaskType = (String)objectMap.get(DomainObject.SELECT_TYPE);
                assigneeType = (String)objectMap.get(SELECT_TASK_ASSIGNEE_TYPE);
                kindOffTask = (String)objectMap.get(SELECT_KINDOF_TASK);

                if(DomainConstants.TYPE_PERSON.equals(assigneeType)){
              	  taskAssingee = (String)objectMap.get(SELECT_TASK_ASSIGNEE_NAME);
              	  objectMap.put("TaskAssignee", PersonUtil.getFullName(context, taskAssingee));
                }else if(PROXYGROUPTYPE.equals(assigneeType) || GROUPTYPE.equals(assigneeType)){
              	  taskAssingee = (String)objectMap.get(SELECT_TASK_ASSIGNEE_TITLE) + "("+strUserGroup+")";
              	  objectMap.put("TaskAssignee", taskAssingee);
                }else {
              	  routeTaskUser = (String)objectMap.get(selRouteTaskUser);
                    if (routeTaskUser != null && !"".equals(routeTaskUser)) {
                    	String isRoleGroup = "";
                    	if(routeTaskUser.indexOf("_") > -1){
                    		isRoleGroup = routeTaskUser.substring(0,routeTaskUser.indexOf("_"));
                    	}
                       if("role".equals(isRoleGroup)) {
                      	 objectMap.put("TaskAssignee", i18nNow.getAdminI18NString("Role",PropertyUtil.getSchemaProperty(context, routeTaskUser),context.getLocale().getLanguage())+"("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.Common.Role")+")");
                       } else if ("group".equals(isRoleGroup)) {
                      	 objectMap.put("TaskAssignee", i18nNow.getAdminI18NString("Group", PropertyUtil.getSchemaProperty( context,routeTaskUser),context.getLocale().getLanguage())+"("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale(),"emxComponents.Common.Group")+")");
                       }else {
                      	 objectMap.put("TaskAssignee", routeTaskUser);
                       }
                   }
                }
                // if Task is WBS then add the context (top) object information
                if ("TRUE".equalsIgnoreCase(kindOffTask))
                {
                    sTaskId = (String)objectMap.get(taskObject.SELECT_ID);
                    String projectPolicy = (String)objectMap.get(TASK_PROJECT_POLICY);
                    if(POLICY_PROJECT_SPACE_HOLD_CANCEL.equalsIgnoreCase(projectPolicy)) {
                		continue;
                	}
                    sMql = "expand bus "+sTaskId+" to rel "+sRelSubTask+" recurse to 1 select bus id dump |";
                    bResult = mql.executeCommand(context, sMql);
                    if(bResult) {
                        sResult = mql.getResult().trim();
                        //Bug 318325. Added if condition to check sResult object as not null and not empty.
                        if(sResult!=null && !"".equals(sResult)) {
                            sResultTkz = new StringTokenizer(sResult,"|");
                            sResultTkz.nextToken();
                            sResultTkz.nextToken();
                            sResultTkz.nextToken();
                            objectMap.put("Context Object Type",(String)sResultTkz.nextToken());
                            objectMap.put("Context Object Name",(String)sResultTkz.nextToken());
                            sResultTkz.nextToken();
                            objectMap.put("Context Object Id",(String)sResultTkz.nextToken());
                        }
                    }
                }
                
                if ((DomainObject.TYPE_INBOX_TASK).equalsIgnoreCase(sTaskType))
                {
                    Object projectPolicy = (Object)objectMap.get(ROUTE_TASK_PROJECT_POLICY);
                    if(projectPolicy != null) {
                    	if((projectPolicy instanceof StringList && ((StringList)projectPolicy).contains(POLICY_PROJECT_SPACE_HOLD_CANCEL))
                    			|| (POLICY_PROJECT_SPACE_HOLD_CANCEL.equalsIgnoreCase((String)projectPolicy))) {
                    		continue;
                    	}
                    }
                }
                
                finalTaskMapList.add(objectMap);
            }

            return finalTaskMapList;
        }

        catch (Exception ex)
        {
           System.out.println("Error in getMyDeskTasks = " + ex.getMessage());
            throw ex;
        }
  }


    /**
     * getTasksToBeAccepted - gets the list of Tasks assigned to any of the person assignments
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Object getTasksToBeAccepted(Context context, String[] args)
          throws Exception
      {
        MapList taskMapList = new MapList();
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
        String languageStr = (String)programMap.get("languageStr");
        try
        {
           final String POLICY_INBOX_TASK_STATE_COMPLETE = PropertyUtil.getSchemaProperty(context, "Policy", DomainObject.POLICY_INBOX_TASK, "state_Complete");
           final String GROUPTYPE = PropertyUtil.getSchemaProperty(context,"type_Group");
           final String PROXYGROUPTYPE = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
           String selRouteTaskUser       = getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_TASK_USER);
           StringList selectTypeStmts = new StringList();
           selectTypeStmts.add(SELECT_NAME);
           selectTypeStmts.add(SELECT_ID);
           selectTypeStmts.add(SELECT_TYPE);
           selectTypeStmts.add(SELECT_DESCRIPTION);
           selectTypeStmts.add(SELECT_OWNER);
           selectTypeStmts.add(SELECT_CURRENT);
           selectTypeStmts.add(strAttrRouteAction);
           selectTypeStmts.add(strAttrCompletionDate);
           selectTypeStmts.add(strAttrTaskCompletionDate);
           selectTypeStmts.add(SELECT_TASK_ASSIGNEE_TYPE);
           selectTypeStmts.add(SELECT_TASK_ASSIGNEE_TITLE);
           selectTypeStmts.add(SELECT_TASK_ASSIGNEE_NAME);
           selectTypeStmts.add(selRouteTaskUser);
           
           
           selectTypeStmts.add("attribute[" + DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS + "]");
           selectTypeStmts.add("attribute[" + DomainObject.ATTRIBUTE_ROUTE_TASK_USER + "]");
           
           selectTypeStmts.add(strAttrTitle);
           selectTypeStmts.add(objectIdSelectStr);
           selectTypeStmts.add(objectNameSelectStr);
           selectTypeStmts.add(objectTypeSelectStr);
           selectTypeStmts.add(objectTitleSelectStr);
           selectTypeStmts.add(routeIdSelectStr);
           selectTypeStmts.add(routeNameSelectStr);
           selectTypeStmts.add(routeOwnerSelectStr);

            selectTypeStmts.add(SELECT_TYPE);
            selectTypeStmts.add(routeTypeSelectStr);
            selectTypeStmts.add(workflowIdSelectStr);
            selectTypeStmts.add(workflowNameSelectStr);
            selectTypeStmts.add(workflowTypeSelectStr);
            selectTypeStmts.add(strAttrworkFlowDueDate);
            selectTypeStmts.add(strAttrTaskEstimatedFinishDate);
            selectTypeStmts.add(strAttrworkFlowCompletinDate);
            selectTypeStmts.add(strAttrTaskFinishDate);
            selectTypeStmts.add(TASK_PROJECT_ID);
            selectTypeStmts.add(TASK_PROJECT_NAME);
            selectTypeStmts.add(TASK_PROJECT_TYPE);
            selectTypeStmts.add(TASK_PROJECT_ATTRIBUTE_TITLE);
            selectTypeStmts.add(SELECT_KINDOF_TASK);
			selectTypeStmts.add(SELECT_KINDOF_WORKFLOW_TASK);
			selectTypeStmts.add(SELECT_KINDOF_INBOX_TASK);

            selectTypeStmts.add(ROUTE_PROJECT_ID);
            selectTypeStmts.add(ROUTE_PROJECT_NAME);
            selectTypeStmts.add(ROUTE_PROJECT_TYPE);
            selectTypeStmts.add(ROUTE_PROJECT_Title_NAME);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_ID);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_TYPE);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_NAME);
            selectTypeStmts.add(ROUTE_TASK_PROJECT_ATTRIBUTE_TITLE);
			selectTypeStmts.add(routeScopeSelectStr);
            selectTypeStmts.add(TASK_PROJECT_POLICY);

           String strPersonAssignments = "";
           Vector groupAssignments = new Vector();
           //Vector personAssignments = PersonUtil.getAssignments(context);
           // To fetch the person user group from db instead of cache - issue when adding new user group/ person to user group // 
   		   Vector personAssignments = PersonUtil.getUserRoles(context,context.getUser());
   		   
           personAssignments.remove(context.getUser());

           Map<String,String> rolesMap = PersonUtil.getAssignmentsMap(context, context.getUser(), personAssignments);
           Iterator assignmentsItr = personAssignments.iterator();
           //Begin : Bug 346478
           Role roleObj = null;
           Group groupObj = null;
           StringList slParents = new StringList();
           StringList userGroupList = new StringList();
           StringList slParentRolesOrGroups = new StringList();
          String isRoleGroupOrUserGroup = null;
           //End : Bug 346478
           while(assignmentsItr.hasNext())
           {
               String assignment = (String)assignmentsItr.next();
               isRoleGroupOrUserGroup = rolesMap.get(assignment);
               try {
            	   if("projectgroup".equals(isRoleGroupOrUserGroup)){
                	   userGroupList.add(assignment);
                   }else if("role".equals(isRoleGroupOrUserGroup)){
                   roleObj = new Role(assignment);
                   roleObj.open(context);
                   // Find all its parents
                   slParents = roleObj.getParents(context, true);
                   if (slParents != null) {
                       slParentRolesOrGroups.addAll(slParents);
                   }
                   roleObj.close(context);
                   }else if("group".equals(isRoleGroupOrUserGroup)){
                       groupObj = new Group(assignment);
                       groupObj.open(context);

                       // Find all its parents
                       slParents = groupObj.getParents(context, true);
                       if (slParents != null) {
                           slParentRolesOrGroups.addAll(slParents);
                       }

                       groupObj.close(context);
                   }
               } catch (MatrixException me){}
               //End : Bug 346478 code modification

           }
           //Remove the last ","
           //strPersonAssignments = strPersonAssignments.substring(0,(strPersonAssignments.length())-1);

           // Begin : Bug 346478 code modification
           slParentRolesOrGroups.addAll(personAssignments);
           if(!userGroupList.isEmpty()){
        	   String ROLE_USER_GROUP = PropertyUtil.getSchemaProperty(context,"role_USERGROUPOWNER");
        	   slParentRolesOrGroups.add(ROLE_USER_GROUP);
           }
           strPersonAssignments = FrameworkUtil.join(slParentRolesOrGroups,",");
           strPersonAssignments = strPersonAssignments ;
           // End : Bug 346478 code modification
           StringBuffer objWhere = new StringBuffer();
           objWhere.append("("+DomainObject.SELECT_OWNER + " matchlist " + "\"" + strPersonAssignments + "\" \",\"");
           objWhere.append(")  &&  (current != "+POLICY_INBOX_TASK_STATE_COMPLETE);
           objWhere.append(" && " + "from[" + RELATIONSHIP_ROUTE_TASK + "].to.attribute[" + ATTRIBUTE_ROUTE_STATUS + "] != \"Stopped\") ");

            Pattern typePattern = new Pattern(TYPE_INBOX_TASK);
            typePattern.addPattern(TYPE_TASK);
            //typePattern.addPattern(sTypeWorkflowTask);// For Bug 346478, we shall find the WF tasks later

            taskMapList = DomainObject.findObjects(context,
                                                 typePattern.getPattern(),
                                                 null,
                                                 objWhere.toString(),
                                                 selectTypeStmts);

            // Removing those 'Inbox Tasks' that satisfy the following criteria
            // 1) The connected Route has a Route Template that has 'Owning Organization' relationship &
            // 2) The context user is not a member of that Organization
// IR-043921V6R2011 - Changes START
            StringList slInboxTasks = new StringList( taskMapList.size() );
            for( Iterator mlItr = taskMapList.iterator(); mlItr.hasNext(); ) {
                Map mTask = (Map) mlItr.next();
                if( TYPE_INBOX_TASK.equals( (String) mTask.get( SELECT_TYPE ) ) ) {
                    slInboxTasks.addElement( (String) mTask.get( SELECT_ID ) );
                }
            }

            StringList busSelects = new StringList(2);
            busSelects.addElement( SELECT_ID );
            busSelects.addElement( SELECT_TYPE );
            String taskAssingee = "";
            DomainObject doPerson = PersonUtil.getPersonObject(context);
            MapList mlOrganizations = doPerson.getRelatedObjects( context, RELATIONSHIP_MEMBER, TYPE_ORGANIZATION,
                busSelects, new StringList( SELECT_RELATIONSHIP_ID ), true, false, (short) 1, "", "", 0 );

            StringList slMember = new StringList( mlOrganizations.size() );
            for( Iterator mlItr = mlOrganizations.iterator(); mlItr.hasNext(); ) {
                Map mOrg = (Map) mlItr.next();
                slMember.addElement( (String) mOrg.get( SELECT_ID ) );
            }

            busSelects.addElement( SELECT_TEMPLATE_OWNING_ORG_ID );
            MapList mlIboxTasksInfo = DomainObject.getInfo(context, (String[])slInboxTasks.toArray(new String[slInboxTasks.size()]), busSelects );
            StringList slToRemoveTask = new StringList( mlIboxTasksInfo.size() );
            for( Iterator mlItr = mlIboxTasksInfo.iterator(); mlItr.hasNext(); ) {
                Map mTask = (Map) mlItr.next();
                String sOrgId = (String) mTask.get( SELECT_TEMPLATE_OWNING_ORG_ID );
                if( sOrgId !=null && !"null".equals( sOrgId ) && !"".equals( sOrgId ) && !(slMember.contains( sOrgId ))) {
                    slToRemoveTask.addElement( (String) mTask.get( SELECT_ID ) );
                }
            }
            for( Iterator mlItr = taskMapList.iterator(); mlItr.hasNext(); ) {
                Map mTask = (Map) mlItr.next();
                if( slToRemoveTask.contains( (String) mTask.get( SELECT_ID ))) {
                    mlItr.remove();
                }
            }
// IR-043921V6R2011 - Changes END


            // Added for 318463
            // Get the context (top parent) object for WBS Tasks to dispaly appropriate tree for WBS Tasks
            MQLCommand mql = new MQLCommand();
            String sTaskType = "";
            String sTaskId = "";
            String assigneeType = "";
            String routeTaskUser = "";
            String sMql = "";
            boolean bResult = false;
            String sResult = "";
            StringTokenizer sResultTkz = null;
            String kindOffTask="";

            MapList finalTaskMapList = new MapList();
            Iterator objectListItr = taskMapList.iterator();
            String strUserGroup = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.Type.Group");
            while(objectListItr.hasNext())
            {
              Map objectMap = (Map) objectListItr.next();
              sTaskType = (String)objectMap.get(DomainObject.SELECT_TYPE);
              assigneeType = (String)objectMap.get(SELECT_TASK_ASSIGNEE_TYPE);
              kindOffTask = (String)objectMap.get(SELECT_KINDOF_TASK);

              boolean addToFinalMap =true;
              if(DomainConstants.TYPE_PERSON.equals(assigneeType)){
            	  taskAssingee = (String)objectMap.get(SELECT_TASK_ASSIGNEE_NAME);
            	  objectMap.put("TaskAssignee", PersonUtil.getFullName(context, taskAssingee));
              }else if(PROXYGROUPTYPE.equals(assigneeType) || GROUPTYPE.equals(assigneeType)){
            	  if(!userGroupList.contains((String) objectMap.get(SELECT_TASK_ASSIGNEE_NAME))){
            		  addToFinalMap = false;
            	  }
            	  taskAssingee = (String)objectMap.get(SELECT_TASK_ASSIGNEE_TITLE) + "("+strUserGroup+")";
            	  objectMap.put("TaskAssignee", taskAssingee);
              }else {
            	  routeTaskUser = (String)objectMap.get(selRouteTaskUser);
                  if (routeTaskUser != null && !"".equals(routeTaskUser)) {
                  	String isRoleGroup = "";
                  	if(routeTaskUser.indexOf("_") > -1){
                  		isRoleGroup = routeTaskUser.substring(0,routeTaskUser.indexOf("_"));
                  	}
                     if("role".equals(isRoleGroup)) {
                    	 objectMap.put("TaskAssignee", i18nNow.getAdminI18NString("Role",PropertyUtil.getSchemaProperty(context, routeTaskUser),languageStr)+"("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Common.Role")+")");
                     } else if ("group".equals(isRoleGroup)) {
                    	 objectMap.put("TaskAssignee", i18nNow.getAdminI18NString("Group", PropertyUtil.getSchemaProperty( context,routeTaskUser),languageStr)+"("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Common.Group")+")");
                     }else {
                    	 objectMap.put("TaskAssignee", routeTaskUser);
                     }
                 }
              }
              // if Task is WBS then add the context (top) object information
              if ("TRUE".equalsIgnoreCase(kindOffTask))
              {
                  sTaskId = (String)objectMap.get(DomainObject.SELECT_ID);
            	  String projectPolicy = (String)objectMap.get(TASK_PROJECT_POLICY);
            	  if(POLICY_PROJECT_SPACE_HOLD_CANCEL.equalsIgnoreCase(projectPolicy)) {
            		  continue;
            	  }
                  taskAssingee = (String)objectMap.get("attribute[" + DomainObject.ATTRIBUTE_ROUTE_TASK_USER + "]");
                  sMql = "expand bus "+sTaskId+" to rel "+sRelSubTask+" recurse to 1 select bus id dump |";
                  bResult = mql.executeCommand(context, sMql);
                  if(bResult) {
                      sResult = mql.getResult().trim();
                      //Bug 318325. Added if condition to check sResult object as not null and not empty.
                      if(sResult!=null && !"".equals(sResult)) {
                          sResultTkz = new StringTokenizer(sResult,"|");
                          sResultTkz.nextToken();
                          sResultTkz.nextToken();
                          sResultTkz.nextToken();
                          objectMap.put("Context Object Type",(String)sResultTkz.nextToken());
                          objectMap.put("Context Object Name",(String)sResultTkz.nextToken());
                          sResultTkz.nextToken();
                          objectMap.put("Context Object Id",(String)sResultTkz.nextToken());
                      }
                  }
              }
              if(addToFinalMap) {
              finalTaskMapList.add(objectMap);
            }
            }
            return finalTaskMapList;

      }
      catch(Exception e)
      {
          throw new FrameworkException(e.getMessage());
      }
    }


   /**
     * showRoute - Retrives the Tasks parent objects
     * Inbox Task - Route
     * Workflow Task - Workflow
     * Task - Project Space
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector showRoute(Context context, String[] args) throws Exception
    {
        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) programMap.get("paramList");
            MapList objectList = (MapList)programMap.get("objectList");

            Map objectMap = null;
            Vector showRoute = new Vector();
            String statusImageString = "";
            String sRouteString = "";
            boolean isPrinterFriendly = false;
            String strPrinterFriendly = (String)paramMap.get("reportFormat");
            String languageStr = (String)paramMap.get("languageStr");

            String sAccDenied = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",new Locale(languageStr),"emxComponents.Common.AccessDenied");

            if (strPrinterFriendly != null )
            {
                isPrinterFriendly = true;
            }

            int objectListSize = 0 ;
            if(objectList != null)
            {
                objectListSize = objectList.size();
            }
            for(int i=0; i< objectListSize; i++)
            {
                statusImageString = "";
                sRouteString = "";
                try
                {
                    objectMap = (HashMap) objectList.get(i);
                }
                catch(ClassCastException cce)
                {
                    objectMap = (Hashtable) objectList.get(i);
                }

                String sTypeName = (String) objectMap.get(DomainObject.SELECT_TYPE);
				String isKindOfTask=(String) objectMap.get(SELECT_KINDOF_TASK);
                String sObjectId = "";
                String sObjectName = "";

                if (TYPE_INBOX_TASK.equalsIgnoreCase(sTypeName))
                {
                    sObjectId   =(String)objectMap.get(routeIdSelectStr);
                    sObjectName = (String)objectMap.get(routeNameSelectStr);
                }
                //add check for kind of in order to cover the other types derived from task
                else if ("true".equalsIgnoreCase(isKindOfTask))
                {
                    //Bug 318463. Commented below two lines and added 2 new lines to read id and name from main list.
                    sObjectId   =(String)objectMap.get("Context Object Id");
                    sObjectName = (String)objectMap.get("Context Object Name");
                    
                  //Bug 989457. Added below two lines
                    if(sObjectId == null && sObjectName == null) {
                    	sObjectId   =(String)objectMap.get("id");
                        sObjectName = (String)objectMap.get("name");
                    }
                }
                else if (sTypeWorkflowTask.equalsIgnoreCase(sTypeName))
                {
                    sObjectId   =(String)objectMap.get(workflowIdSelectStr);
                    sObjectName = (String)objectMap.get(workflowNameSelectStr);
                }

                //Bug 318325. If object id and Name are null don't show context object.
                if(sObjectId != null && sObjectName != null )
                {
                    String sRouteNextUrl = "./emxTree.jsp?objectId=" + XSSUtil.encodeForJavaScript(context, sObjectId);
                    //String sRouteUrl  = "javascript:showNonModalDialog('" + sRouteNextUrl + "',800,575)";
                    // Changed for bug 346533
                    String sRouteUrl  = "javascript:emxTableColumnLinkClick('" + sRouteNextUrl + "','800','575',false,'popup','')";


                    if(!isPrinterFriendly)
                    {
                        // Added for the 341122
                        sRouteString = "<a  href=\""+sRouteUrl+"\">"+XSSUtil.encodeForXML(context,sObjectName)+"</a>&#160;";
                    }
                    else
                    {
                        sRouteString = sObjectName;
                    }
                    showRoute.add(sRouteString);
                }
                else
                {
                    showRoute.add(sAccDenied);
                }
            }

            return showRoute;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showRoute= " + ex.getMessage());
            throw ex;
        }
    }

    /**
     * showType - shows the type of the task
     * Inbox Task - Route Action attribute value
     * Workflow Task - Activity
     * Task - WBS Task
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector showType(Context context, String[] args) throws Exception
    {
        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) programMap.get("paramList");
            MapList objectList = (MapList)programMap.get("objectList");
            String languageStr = (String)paramMap.get("languageStr");
            Vector vShowType = new Vector();
            Map objectMap = null;

            int objectListSize = 0 ;
            if(objectList != null)
            {
                objectListSize = objectList.size();
            }

            for(int i=0; i< objectListSize; i++)
            {
                try
                {
                    objectMap = (HashMap) objectList.get(i);
                }
                catch(ClassCastException cce)
                {
                    objectMap = (Hashtable) objectList.get(i);
                }

                String sTypeName = (String) objectMap.get(DomainObject.SELECT_TYPE);
                String sTypeString = "";

                if (TYPE_INBOX_TASK.equalsIgnoreCase(sTypeName))
                {
                    sTypeString = (String) objectMap.get(strAttrRouteAction);
                    if (sTypeString == null)
                    {
                        sTypeString = "";
                    }
                    else
                    {
                        sTypeString =  EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(languageStr),"emxFramework.Range.Route_Action."+sTypeString.replace(' ','_'));
                    }
                }
                else if (TYPE_TASK.equalsIgnoreCase(sTypeName))
                {
                    sTypeString = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Route.Type."+sTypeName.replace(' ','_'));
                }
                else if (sTypeWorkflowTask.equalsIgnoreCase(sTypeName))
                {
                    sTypeString = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Route.Type."+sTypeName.replace(' ','_'));
                }
                else
                {
                    sTypeString = EnoviaResourceBundle.getTypeI18NString(context,sTypeName, languageStr);
                }
                if("CSV".equals(paramMap.get("reportFormat"))||"CSV".equals(paramMap.get("exportFormat")))
                	vShowType.add(sTypeString);
                else
                vShowType.add(XSSUtil.encodeForXML(context, sTypeString));
            }

            return vShowType;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showType= " + ex.getMessage());
            throw ex;
        }
    }

    /**
     * showType - shows the task instructions
     * Inbox Task - Route Instructions
     * Workflow Task - Instructions
     * Task - Notes
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector showInstructions(Context context, String[] args) throws Exception
    {

        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) programMap.get("paramList");
            MapList objectList = (MapList)programMap.get("objectList");

            Vector vShowNotes = new Vector();
            Map objectMap = null;

            int objectListSize = 0 ;
            if(objectList != null)
            {
                objectListSize = objectList.size();
            }

            for(int i=0; i< objectListSize; i++)
            {
                try
                {
                    objectMap = (HashMap) objectList.get(i);
                }
                catch(ClassCastException cce)
                {
                    objectMap = (Hashtable) objectList.get(i);
                }

                String sTypeName = (String) objectMap.get(DomainObject.SELECT_TYPE);
                String objectId = (String) objectMap.get(DomainObject.SELECT_ID);
                String sTypeNotes = "";

                DomainObject domObject = new DomainObject(objectId);

                if (TYPE_INBOX_TASK.equalsIgnoreCase(sTypeName))
                {
                    sTypeNotes = (String) domObject.getAttributeValue(context, DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS);
                }
                else if (TYPE_TASK.equalsIgnoreCase(sTypeName))
                {
                    sTypeNotes = (String) domObject.getAttributeValue(context, DomainObject.ATTRIBUTE_NOTES);
                }

                else if (sTypeWorkflowTask.equalsIgnoreCase(sTypeName))
                {
                    sTypeNotes = (String) domObject.getAttributeValue(context, attrworkFlowInstructions);
                }
                if (sTypeNotes == null)
                {
                    sTypeNotes = "";
                }
                if("CSV".equals(paramMap.get("reportFormat"))||"CSV".equals(paramMap.get("exportFormat")))
                	vShowNotes.add(sTypeNotes);
                else
                vShowNotes.add(XSSUtil.encodeForXML(context,sTypeNotes));
            }

            return vShowNotes;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showInstructions= " + ex.getMessage());
            throw ex;
        }
    }

    /**
     * showType - shows the due date for the task
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector showDueDate(Context context, String[] args) throws Exception
    {
        Vector showDueDate = new Vector();
        boolean bDisplayTime = false;

        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");
            Map paramList      = (Map)programMap.get("paramList");
            String sLanguage = (String)paramList.get("languageStr");

            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();

				String taskDueDate = getDueDate(context, objectMap);

                Locale locale =context.getLocale();
                String timeZone = (String) (paramList != null ? paramList.get("timeZone") : programMap.get("timeZone"));
                double clientTZOffset   = (new Double(timeZone)).doubleValue();

				HashMap cellMap = new HashMap();
    			cellMap.put("ActualValue", taskDueDate);
                if(! UIUtil.isNullOrEmpty(taskDueDate)){
                	try {
                		//taskDueDate =   eMatrixDateFormat.getFormattedDisplayDateTime(taskDueDate, clientTZOffset, locale);
                		taskDueDate = eMatrixDateFormat.getFormattedDisplayDateTime(context,
                				taskDueDate, true,DateFormat.MEDIUM, clientTZOffset,context.getLocale());	
                	} catch (Exception dateException){
                		//do nothing,This exception is added to avoid formatting of taskduedate if the value is not of type date  i.e for ex: 4 days after Route start Date
                		taskDueDate = taskDueDate;
                	}
                }
                cellMap.put("DisplayValue", taskDueDate);
                showDueDate.add(cellMap);
            }
        }
        catch (Exception ex)
        {
            System.out.println("Error in showDueDate= " + ex.getMessage());
            throw ex;
        }
        return showDueDate;
    }

        /**
     * showStatusGif - gets the status gif to be shown in the column of the Task Summary table
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     * @modified V6R2014x for refactoring
     */
    public Vector showStatusGif(Context context, String[] args) throws Exception
    {
        try
        {
            Vector enableCheckbox = new Vector();

            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");

            String stateComplete = FrameworkUtil.lookupStateName(context, policyTask, "state_Complete");
            String stateCompleted = FrameworkUtil.lookupStateName(context, policyWorkflowTask, "state_Completed");
            String stateAssigned    = FrameworkUtil.lookupStateName(context, DomainObject.POLICY_INBOX_TASK, "state_Assigned");

            Date dueDate   = null;
            Date curDate = new Date();
            String statusImageString = "";
            String statusColor= "";

            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();
                //XSSOK
                enableCheckbox.add(getStatusImageForTasks(context, objectMap, "../"));
            }

            return enableCheckbox;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showStatusGif= " + ex.getMessage());
            throw ex;
        }
    }

    /**
     * getScheduledCompletionDate - get the route scheduled completion date that needs to be displayed in the column of the Route Summary table
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector getScheduledCompletionDate(Context context, String[] args)
        throws Exception
    {
        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");

            Vector enableCheckbox = new Vector();
            String selectScheduledDate = "from["+ DomainObject.RELATIONSHIP_ROUTE_NODE + "].attribute["+ DomainObject.ATTRIBUTE_SCHEDULED_COMPLETION_DATE +"]";

            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();
                String routeId = (String) objectMap.get("id");

                DomainObject routeObject = new DomainObject(routeId);
                StringList dateList = routeObject.getInfoList(context, selectScheduledDate);

                MapList dateMapList = new MapList();

                Iterator dateListItr = dateList.iterator();
                while(dateListItr.hasNext())
                {
                    String schDate = (String) dateListItr.next();
                    HashMap dateMap = new HashMap();
                    dateMap.put("date", schDate);
                    dateMapList.add(dateMap);
                }
                dateMapList.sort("date", "descending", "date");

                String displayDate = "";
                Iterator dateMapListItr = dateMapList.iterator();
                while(dateMapListItr.hasNext())
                {
                    Map tempMap = (Map) dateMapListItr.next();
                    displayDate = (String) tempMap.get("date");
                    break;
                }
                enableCheckbox.add(displayDate);
            }
            return enableCheckbox;
        }
        catch (Exception ex)
        {
            System.out.println("Error in getScheduledCompletionDate= " + ex.getMessage());
            throw ex;
        }
    }

    /**
     * getActualCompletionDate - get the route actual completion date that needs to be displayed in the column of the Route Summary table
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector showContent(Context context, String[] args) throws Exception
    {
        try
        {
            Vector contentCheckbox = new Vector();
            String compDate = "";

            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");

//          Begin : Bug 346997 code modification
            Map paramList = (Map)programMap.get("paramList");
            boolean isExporting = (paramList.get("reportFormat") != null);
//          End : Bug 346997 code modification

            DomainObject boRoute = DomainObject.newInstance(context);

            StringList objectSelects = new StringList();
            objectSelects.add(DomainConstants.SELECT_ID);

            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                // Bug 317688: Show the deliverables of Workflow tasks
                String sRouteId = null;
                String sRelName = "";
                boolean toSide = true;
                boolean fromSide = true;
                Map objectMap = (Map) objectListItr.next();
                String objType = (String)objectMap.get(DomainObject.SELECT_TYPE);

                MapList Maplist = new MapList();

                // Bug 317688: Show the deliverables of Workflow tasks
                if (TYPE_INBOX_TASK.equals(objType))
                {
                    sRouteId   =(String)objectMap.get(routeIdSelectStr);
                    sRelName = DomainConstants.RELATIONSHIP_OBJECT_ROUTE;
                    fromSide = false;
                }
                else if (sTypeWorkflowTask.equals(objType) || TYPE_TASK.equals(objType))
                {
                    sRouteId   = (String)objectMap.get(DomainObject.SELECT_ID);
                    sRelName = sRelWorkflowTaskDeliverable;
                    toSide = false;
                }

                if (sRouteId != null && !"".equals(sRouteId))
                {
                    boRoute.setId(sRouteId);

                    Maplist = boRoute.getRelatedObjects(context,
                                     sRelName,
                                     "*",
                                     objectSelects,
                                     null,
                                     toSide,
                                     fromSide,
                                     (short)0,
                                     "",
                                     "");
                }

//              Begin : Bug 346997 code modification
                if (isExporting) {
                    if(Maplist.size() > 0 && (TYPE_INBOX_TASK.equals(objType) || sTypeWorkflowTask.equals(objType)))
                    {
                        compDate = String.valueOf(Maplist.size());
                    }
                    else
                    {
                        compDate = "";
                    }
                }
                else {
                    if(Maplist.size()>0 && TYPE_INBOX_TASK.equals(objType))
                    {
                        //compDate ="<a href=javascript:showNonModalDialog('../components/emxRouteContentSummaryFS.jsp?objectId="+sRouteId+"',575,575);>"+Maplist.size()+"</a>";

                        // Modified for bug 346533
                        compDate ="<a href=\"javascript:emxTableColumnLinkClick('../components/emxRouteContentSummaryFS.jsp?objectId="+sRouteId+"','575','575', false,'popup','')\">"+Maplist.size()+"</a>";
                    }
                    else if (Maplist.size()>0 && sTypeWorkflowTask.equals(objType))
                    {
                        //compDate ="<a href=javascript:showNonModalDialog('../common/emxTable.jsp?program=emxCommonDocumentUI:getDocuments&table=APPDocumentSummary&selection=multiple&sortColumnName=Name&sortDirection=ascending&toolbar=APPWorkflowDeliverableSummaryToolBar&suiteKey=Components&header=emxComponents.Workflow.TaskDeliverables&HelpMarker=emxhelpcontentsummary&parentRelName=relationship_TaskDeliverable&objectId="+sRouteId+"',575,575);>"+Maplist.size()+"</a>";

//                      Modified for bug 346533
                        compDate ="<a href=\"javascript:emxTableColumnLinkClick('../common/emxTable.jsp?program=emxCommonDocumentUI:getDocuments&table=APPDocumentSummary&selection=multiple&sortColumnName=Name&sortDirection=ascending&toolbar=APPWorkflowDeliverableSummaryToolBar&suiteKey=Components&header=emxComponents.Workflow.TaskDeliverables&HelpMarker=emxhelpcontentsummary&parentRelName=relationship_TaskDeliverable&objectId="+sRouteId+"','575','575', false, 'popup','')\">"+Maplist.size()+"</a>";
                    }
					else if(Maplist.size()>0 && TYPE_TASK.equals(objType)){
                    	compDate="<a href=\"javascript:emxTableColumnLinkClick('../common/emxTree.jsp?DefaultCategory=PMCDeliverableCommandPowerView&amp;objectId="+sRouteId+"', '575','575', false, 'popup', '', '', '', '')\">"+Maplist.size()+"</a>";
                    }
                    else
                    {
                        compDate = "";//(new Integer(Maplist.size())).toString();
                    }
                }
//              End : Bug 346997 code modification

                contentCheckbox.add(compDate);
            }

            return contentCheckbox;
        }
        catch (Exception ex)
        {
            System.out.println("Error in getActualCompletionDate= Lanka " + ex.getMessage());
            throw ex;
        }
    }



    /**
     * showOwner - displays the owner with lastname,firstname format
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector showWorkspace(Context context, String[] args)
        throws Exception
    {
        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");
            String exportFormat = (String) programMap.get("exportFormat");
            boolean isCSVExport = "CSV".equals(exportFormat);
            boolean blnToDisplayWorkspaceLink = true;

//          Begin : Bug 346997 code modification
            Map paramList = (Map)programMap.get("paramList");
			if(UIUtil.isNullOrEmpty(exportFormat))
			{
				isCSVExport = "CSV".equals(paramList.get("exportFormat"));
			}
            boolean isExporting = (paramList.get("reportFormat") != null);
//          End : Bug 346997 code modification

            Vector vecShowWorkspace = new Vector();
            String showWorkspace="";
            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                blnToDisplayWorkspaceLink=true;
                Map objectMap = (Map) objectListItr.next();
    			String routeScope = (String)objectMap.get(routeScopeSelectStr);
				showWorkspace = "";
				if(UIUtil.isNotNullAndNotEmpty(routeScope) && (("All").equals(routeScope) || ("Organization").equals(routeScope))){ 
					routeScope = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale(),"emxComponents.Common."+routeScope);
					showWorkspace = routeScope;
				}else{
					String isKindOfTask=(String) objectMap.get(SELECT_KINDOF_TASK);
        			String sRelatedObjectId = "";
        			String sRelatedObjectName = "";
					//Bug 364761. Code added to fecth WBS task project
        			if ("true".equalsIgnoreCase(isKindOfTask))
        			{ 
        				sRelatedObjectId   =(String)objectMap.get(TASK_PROJECT_ID);
        				sRelatedObjectName = (String)objectMap.get(TASK_PROJECT_NAME);
        				if(UIUtil.isNotNullAndNotEmpty((String)objectMap.get(TASK_PROJECT_TYPE)) &&  ((DomainObject.TYPE_WORKSPACE).equals(objectMap.get(TASK_PROJECT_TYPE)) ||
                    			com.matrixone.apps.domain.util.mxType.isOfParentType(context,(String)objectMap.get(TASK_PROJECT_TYPE),com.matrixone.apps.domain.DomainObject.TYPE_WORKSPACE_VAULT))) {
        					sRelatedObjectName = (String)objectMap.get(TASK_PROJECT_ATTRIBUTE_TITLE);                  		
                    	}
        				
        			}else{
        				sRelatedObjectId   = (String)objectMap.get(objectIdSelectStr);
        				sRelatedObjectName = (String)objectMap.get(objectNameSelectStr);
        				if(UIUtil.isNotNullAndNotEmpty((String)objectMap.get(objectTypeSelectStr))&& ((DomainObject.TYPE_WORKSPACE).equals(objectMap.get(objectTypeSelectStr)) ||
                    			com.matrixone.apps.domain.util.mxType.isOfParentType(context,(String)objectMap.get(objectTypeSelectStr),com.matrixone.apps.domain.DomainObject.TYPE_WORKSPACE_VAULT))) {
        					sRelatedObjectName = (String)objectMap.get(objectTitleSelectStr);                  		
                    	}
        				//In case of inbox task for a route created under WBS task, fetch the project connected to the task
        				if(sRelatedObjectId == null){ 
        					Object projIdObj =  objectMap.get(ROUTE_TASK_PROJECT_ID);
        					Object projNameObj = objectMap.get(ROUTE_TASK_PROJECT_NAME);
        					if(UIUtil.isNotNullAndNotEmpty((String)objectMap.get(ROUTE_TASK_PROJECT_TYPE)) &&  ((DomainObject.TYPE_WORKSPACE).equals(objectMap.get(ROUTE_TASK_PROJECT_TYPE)) ||
                        			com.matrixone.apps.domain.util.mxType.isOfParentType(context,(String)objectMap.get(ROUTE_TASK_PROJECT_TYPE),com.matrixone.apps.domain.DomainObject.TYPE_WORKSPACE_VAULT))) {
            					projNameObj = (String)objectMap.get(ROUTE_TASK_PROJECT_ATTRIBUTE_TITLE);                  		
                        	}
        					if(projIdObj instanceof StringList) {
        						StringList idList = (StringList) projIdObj;
        						StringList nameList = (StringList) projNameObj;
        						
        						sRelatedObjectId = idList.get(0);
        						sRelatedObjectName = nameList.get(0);
        					}else {
        						sRelatedObjectId = (String) projIdObj;
        						sRelatedObjectName =(String) projNameObj;
        					}
        					
        					//In case of inbox task for a route created under Project
            				if(sRelatedObjectId == null){ 
            					projIdObj 	= objectMap.get(ROUTE_PROJECT_ID);
            					projNameObj = objectMap.get(ROUTE_PROJECT_NAME);
            					if(UIUtil.isNotNullAndNotEmpty((String)objectMap.get(ROUTE_PROJECT_TYPE)) && ((DomainObject.TYPE_WORKSPACE).equals(objectMap.get(ROUTE_PROJECT_TYPE)) ||
                            			com.matrixone.apps.domain.util.mxType.isOfParentType(context,(String)objectMap.get(ROUTE_PROJECT_TYPE),com.matrixone.apps.domain.DomainObject.TYPE_WORKSPACE_VAULT))) {
                					projNameObj = (String)objectMap.get(ROUTE_PROJECT_Title_NAME);                  		
                            	}
            					if(projIdObj instanceof StringList) {
            						StringList idList = (StringList) projIdObj;
            						StringList nameList = (StringList) projNameObj;
            						
            						sRelatedObjectId = idList.get(0);
            						sRelatedObjectName = nameList.get(0);
            					}else {
            						sRelatedObjectId = (String) projIdObj;
            						sRelatedObjectName =(String) projNameObj;
            					}
            				}
        				}
        			}            			
    				if(sRelatedObjectId != null){
		                String sRelatedObjectNextUrl =  "./emxTree.jsp?AppendParameters=true&amp;objectId=" + sRelatedObjectId;
		                String sRelatedObjectUrl     = "javascript:showModalDialog('" + sRelatedObjectNextUrl + "',800,575)";
		                if(sRelatedObjectId == null){
		                  blnToDisplayWorkspaceLink = false;
		                }
		
		//              Begin : Bug 346997 code modification
		                if (isExporting) {
		                    if(!blnToDisplayWorkspaceLink) {
		                        showWorkspace = "";
		                    } else {
		                    	if(isCSVExport){
		                    		 showWorkspace = sRelatedObjectName;
		                    	}else {
		                        showWorkspace = XSSUtil.encodeForXML(context, sRelatedObjectName);
		                    }
		                }
		                }
		                else {
		                    if(!blnToDisplayWorkspaceLink) {
		                        showWorkspace="&#160;";
		                    } else {
		                        showWorkspace="<a href=\""+sRelatedObjectUrl+"\">"+XSSUtil.encodeForXML(context, sRelatedObjectName)+"</a>";
		                    }
		                }
    				}
				}
//              End : Bug 346997 code modification
                vecShowWorkspace.add(showWorkspace);
            }

            return vecShowWorkspace;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showWorkspace= " + ex.getMessage());
            throw ex;
        }
    }

/**
     * showTaskName - displays the owner with lastname,firstname format
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector showTaskName(Context context, String[] args)
        throws Exception
    {
        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");
            DomainObject taskObject = new DomainObject();
            Vector vecShowTaskName  = new Vector();
            String name= "";
            String sTaskName  ="";
            String taskId  ="";


            String sTypePQP = PropertyUtil.getSchemaProperty(context,"type_PartQualityPlan");

            //Bug 318463. Start: Added below variables.
            Map paramList = (Map)programMap.get("paramList");

//          Begin : Bug 346997 code modification
            boolean isExporting = (paramList.get("reportFormat") != null);
//          End : Bug 346997 code modification

            StringBuffer prefixLinkBuffer = new StringBuffer();
            prefixLinkBuffer.append("<a href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?mode=insert");

            StringBuffer tempLinkBuffer = new StringBuffer();
            tempLinkBuffer.append("&amp;relId=");
            tempLinkBuffer.append((String)paramList.get("relId"));
            tempLinkBuffer.append("&amp;parentOID=");
            tempLinkBuffer.append((String)paramList.get("parentOID"));
            tempLinkBuffer.append("&amp;jsTreeID=");
            tempLinkBuffer.append((String)paramList.get("jsTreeID"));
            tempLinkBuffer.append("&amp;objectId=");
            String sContextType = "";
            //Bug 318463. End: Added above variables.

            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();
                //modified for IR-050410V6R2011x
               // sTaskName  = (String)objectMap.get("strAttrTitle");
                sTaskName  = (String)objectMap.get("name");
                taskId  = (String)objectMap.get(DomainObject.SELECT_ID);
                //Bug 318463. Modified if condition and assigning title to name instead of adding it directly to vector.
                if(sTaskName!= null && !sTaskName.equals("")) {
                    name = sTaskName;
                }
                else
                {
                    taskObject.setId((String)objectMap.get(taskObject.SELECT_ID));
                    name=taskObject.getInfo(context,"name");
                }
                 
                //Begin- Bug 318463. Added below code to add final href string to vector.
                StringBuffer finalURL = new StringBuffer();
                   
//              Begin : Bug 346997 code modification
                if (isExporting) {
                    finalURL.append(name);
                }
                else {
                	name=XSSUtil.encodeForXML(context,name);
                    finalURL.append(prefixLinkBuffer.toString());
                    //finalURL.append(FrameworkUtil.findAndReplace(name, "'", "\\'"));
                    finalURL.append(tempLinkBuffer.toString());
                    finalURL.append(objectMap.get(taskObject.SELECT_ID));

                    sContextType  =  (String)objectMap.get("Context Object Type");
                    if(sContextType != null && sContextType.equals(sTypePQP)) {
                        finalURL.append("&amp;suiteKey=");
                        finalURL.append("SupplierCentral");
                        finalURL.append("&amp;emxSuiteDirectory=");
                        finalURL.append("suppliercentral");
                    } else {
                        finalURL.append("&amp;suiteKey=");
                        finalURL.append((String)paramList.get("suiteKey"));
                        finalURL.append("&amp;emxSuiteDirectory=");
                        finalURL.append((String)paramList.get("SuiteDirectory"));
                    }
                    finalURL.append("', '', '', 'false', 'content', '')\"  class=\"object\">");
                    finalURL.append("<img border=\"0\" src=\"images/iconSmallTask16.png\"></img>");
                    finalURL.append(name);
                    finalURL.append("</a>");
                }
//              End : Bug 346997 code modification

                vecShowTaskName.add(finalURL.toString());
                //End- Bug 318463.
            }
            return vecShowTaskName;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showTaskName= " + ex.getMessage());
            throw ex;
        }
    }

    /** Added for IR-050410V6R2011x
     * showTaskTitle - displays the Inbox Task Title
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since R210
     * @grade 0
     */
    public Vector showTaskTitle(Context context, String[] args)
        throws Exception
    {
        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");
            DomainObject taskObject = new DomainObject();
            Vector vecShowTaskTitle  = new Vector();
            String sTaskTitle  ="";

            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();
                sTaskTitle  = (String)objectMap.get(strAttrTitle);
                sTaskTitle = UIUtil.isNullOrEmpty(sTaskTitle) ? EMPTY_STRING : sTaskTitle;
                vecShowTaskTitle.add(XSSUtil.encodeForXML(context, sTaskTitle));
            }
            return vecShowTaskTitle;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showTaskTitle= " + ex.getMessage());
            throw ex;
        }
    }
    /**
     * showNewWindowIcon - displays the new window icon to display object in new window
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since 10-6 SP2
     * @grade 0
     */
    public Vector showNewWindowIcon(Context context, String[] args)
        throws Exception
    {
        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");
            Vector vecShowNewWindow  = new Vector();

            //Bug 318463. Start: Added below variables.
            Map paramList = (Map)programMap.get("paramList");

            String sTypePQP = PropertyUtil.getSchemaProperty(context,"type_PartQualityPlan");

            String languageStr = (String)paramList.get("languageStr");
            String sNewWindow  = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(languageStr),"emxComponents.Common.OpenNew");

            StringBuffer prefixLinkBuffer = new StringBuffer();
            prefixLinkBuffer.append("<b><a href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?");
            prefixLinkBuffer.append((String)paramList.get("relId"));
            prefixLinkBuffer.append("&amp;parentOID=");
            prefixLinkBuffer.append((String)paramList.get("parentOID"));
            prefixLinkBuffer.append("&amp;jsTreeID=");
            prefixLinkBuffer.append((String)paramList.get("jsTreeID"));
            prefixLinkBuffer.append("&amp;objectId=");
            String sContextType = "";
            //Bug 318463. End: Added above variables.

            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();
                String taskId = (String)objectMap.get(SELECT_ID);
                String taskName = (String)objectMap.get(SELECT_NAME);
                //Begin- Bug 318463. Added below code to add final href string to vector.
                StringBuffer finalURL = new StringBuffer();
                if(paramList.get("reportFormat") != null)
                {
                    finalURL.append("<img border=\"0\" src=\"images/iconNewWindow.gif\"></img>");
                } else if(DomainConstants.RELATIONSHIP_ROUTE_NODE.equals(taskName))
                {
                    finalURL.append("");
                } else {
                    finalURL.append(prefixLinkBuffer.toString());
                    finalURL.append(taskId);

                    sContextType  =  (String)objectMap.get("Context Object Type");
                    if(sContextType != null && sContextType.equals(sTypePQP)) {
                        finalURL.append("&amp;suiteKey=");
                        finalURL.append("SupplierCentral");
                        finalURL.append("&amp;emxSuiteDirectory=");
                        finalURL.append("suppliercentral");
                    } else {
                        finalURL.append("&amp;suiteKey=");
                        finalURL.append((String)paramList.get("suiteKey"));
                        finalURL.append("&amp;emxSuiteDirectory=");
                        finalURL.append((String)paramList.get("SuiteDirectory"));
                    }
                    finalURL.append("', '875', '550', 'false', 'popup', '')\">");
                    finalURL.append("<img border=\"0\" src=\"images/iconNewWindow.gif\" title=\""+XSSUtil.encodeForHTMLAttribute(context,sNewWindow)+"\"></img>");
                    finalURL.append("</a></b>");
                }
                vecShowNewWindow.add(finalURL.toString());
                //End- Bug 318463.
            }
            return vecShowNewWindow;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showNewWindowIcon= " + ex.getMessage());
            throw ex;
        }
    }

   /*  showCheckBox - displays the owner with lastname,firstname format
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public Vector showCheckBox(Context context, String[] args)
        throws Exception
    {
        try
        {

            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");
            DomainObject taskObject = new DomainObject();
            Vector vecShowCheckBox  = new Vector();
      String taskId = "";
      String state= "";
      String sTaskTitle  ="";
            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();
        taskId        = (String)objectMap.get(taskObject.SELECT_ID);
        state         = (String)objectMap.get(taskObject.SELECT_CURRENT);

        if(state.equals("Complete"))
        {

          vecShowCheckBox.add("false");
        }
        else
        {

          vecShowCheckBox.add("true");
        }

      }
            return vecShowCheckBox;
        }
        catch (Exception ex)
        {
            System.out.println("Error in showCheckBox= " + ex.getMessage());
            throw ex;
        }
    }


 /* displayLinkAccessCheck - determines if the Create New, Create Route Wizard ,Set Task Escalation, Remove Selected, Start/ResumeRoute links needs to be show in the Route Summary table
  *
  * @param context the eMatrix <code>Context</code> object
  * @param args holds the objectId
  * @returns boolean type
  * @throws Exception if the operation fails
  * @since AEF Rossini
  * @grade 0
  */

  public static boolean showRemoveLink(Context context, String args[]) throws Exception
  {
      HashMap programMap         = (HashMap) JPO.unpackArgs(args);
     // DomainObject boRoute = DomainObject.newInstance(context);
       boolean result             = false;
     String sTypeName = "";
     String sOwner = "";
       String objectId    = (String) programMap.get("objectId");
       String sUser       = context.getUser();
       String sTypeRoute          = PropertyUtil.getSchemaProperty(context,"type_Route");

     /* System.out.println(objectId);
    if(objectId != null) {
       DomainObject boRoute = new DomainObject(objectId);
       boRoute.open(context);
       sTypeName = boRoute.getTypeName();
       sOwner = boRoute.getOwner().getName();
       boRoute.close(context);
      }

     if(sOwner.equals(sUser) && sTypeName.equals(sTypeRoute)) {
    result = true;
    }*/

      return result;
  }
  public String getInboxTaskMailMessage(Context context,Locale locale,String Bundle,String baseURL, String paramSuffix) throws Exception
  {
    StringBuffer msg = new StringBuffer();
    StringBuffer contentURL = new StringBuffer();
    try{

        lang = locale.getLanguage();

        rsBundle = Bundle;

        StringList selectstmts = new StringList();
        selectstmts.add("attribute[" + DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS + "]");
        selectstmts.add(strAttrCompletionDate);
        selectstmts.add(routeIdSelectStr);
        Map taskMap = getInfo(context,selectstmts);
        String routeId = (String)taskMap.get(routeIdSelectStr);
        Pattern relPattern = new Pattern(DomainObject.RELATIONSHIP_OBJECT_ROUTE);
        Pattern typePattern = new Pattern(DomainObject.TYPE_PART);
        StringList selectBusStmts    = new StringList();
         selectBusStmts.add(SELECT_ID);
         selectBusStmts.add(SELECT_TYPE);
         selectBusStmts.add(SELECT_NAME);
         selectBusStmts.add(SELECT_REVISION);
         StringList selectRelStmts    = new StringList();


         DomainObject route = DomainObject.newInstance(context,routeId);
        MapList contentMapList = route.getRelatedObjects(context,
                                                        relPattern.getPattern(),
                                                        typePattern.getPattern(),
                                                         selectBusStmts,
                                                         selectRelStmts,
                                                         true,
                                                         true,
                                                         (short)1,
                                                         "",
                                                         "",
                                                         null,
                                                         null,
                                                         null);

        int size=contentMapList.size();

        if(size > 0)
        {
            msg.append("\n"+getTranslatedMessage("emxFramework.InboxTask.MailNotification.WhereContent.Message"));
            contentURL.append("\n"+getTranslatedMessage("emxFramework.InboxTask.MailNotification.ContentFindMoreURL"));
            Map contentMap=null;
            for(int i=0;i<size;i++)
            {
                contentMap = (Map)contentMapList.get(i);
                msg.append(contentMap.get(SELECT_TYPE));
                msg.append(contentMap.get(SELECT_NAME));
                msg.append(contentMap.get(SELECT_REVISION));
                msg.append("\n");
                contentURL.append("\n" + MailUtil.getObjectLinkURI(context, baseURL, contentMap.get(SELECT_ID).toString()));
                if (paramSuffix != null && !"".equals(paramSuffix) && !"null".equals(paramSuffix) && !"\n".equals(paramSuffix)){
                    contentURL.append("&treeMenu=" + paramSuffix);
                }
            }
        }
        if(size <= 0)
            msg.append("\n");
        msg.append(getTranslatedMessage("emxFramework.InboxTask.MailNotification.TaskInstructions"));
        msg.append("\n");
        msg.append(taskMap.get("attribute[" + DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS + "]"));
        msg.append("\n");
        msg.append(getTranslatedMessage("emxFramework.InboxTask.MailNotification.TaskDueDate"));
        msg.append("\n");
        msg.append(taskMap.get(strAttrCompletionDate));
        msg.append("\n");
        msg.append(getTranslatedMessage("emxFramework.InboxTask.MailNotification.TaskFindMoreURL"));
        msg.append("\n"+ MailUtil.getObjectLinkURI(context, baseURL, getObjectId()));
        if (paramSuffix != null && !"".equals(paramSuffix) && !"null".equals(paramSuffix) && !"\n".equals(paramSuffix)){
            msg.append("&treeMenu=" + paramSuffix);
        }
        msg.append("\n");
        msg.append(getTranslatedMessage("emxFramework.InboxTask.MailNotification.RouteFindMoreURL"));
        msg.append("\n" + MailUtil.getObjectLinkURI(context, baseURL, routeId));
        if (paramSuffix != null && !"".equals(paramSuffix) && !"null".equals(paramSuffix) && !"\n".equals(paramSuffix)){
            msg.append("&treeMenu=" + paramSuffix);
        }
        msg.append(contentURL.toString());
    }catch(Exception ex){ System.out.println(" error  in getInboxTaskMailMessage "+ex);}
    return msg.toString();
  }
  public String getTranslatedMessage(String text) throws Exception
  {
        return (String)loc.GetString(rsBundle, lang, text);

  }

  /* getTaskContent - gets all the contents for the Task.Which will be used for
  *                   Displaying in the Task Content Summary
  * @param context the eMatrix <code>Context</code> object
  * @param args holds the String array args
  * @returns Object type
  * @throws Exception if the operation fails
  * @since AEF Rossini
  * @grade 0
  */
  @com.matrixone.apps.framework.ui.ProgramCallable
  public Object getTaskContent(Context context,String []args) throws Exception
  {
    HashMap programMap         = (HashMap) JPO.unpackArgs(args);
    String objectId    = (String) programMap.get("objectId");
    String selectStr = "from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.id";
    DomainObject taskObject = DomainObject.newInstance(context,objectId);
    objectId = taskObject.getInfo(context,selectStr);
    // Due to Resume Process implementation there can be tasks which are not connected to route and hence we cannot find
    // the route id from these tasks. Then the route id can be found by first finding the latest revision of the task
    // and then querying for the route object.
    if (objectId == null) {
        DomainObject dmoLastRevision = new DomainObject(taskObject.getLastRevision(context));
        objectId = dmoLastRevision.getInfo(context, selectStr);
    }
    Route routeObject = (Route)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE);
    routeObject.setId(objectId);
    StringList selListObj = new SelectList(6);
    selListObj.add(routeObject.SELECT_NAME);
    selListObj.add(routeObject.SELECT_ID);
    selListObj.add(routeObject.SELECT_TYPE);
    selListObj.add(routeObject.SELECT_DESCRIPTION);
    selListObj.add(routeObject.SELECT_POLICY);
    selListObj.add(routeObject.SELECT_CURRENT);
	selListObj.add(routeObject.SELECT_FILE_NAME);
	selListObj.add(routeObject.SELECT_FILE_FORMAT);
    // build select params for Relationship
    StringList selListRel = new SelectList(3);
    selListRel.add(routeObject.SELECT_RELATIONSHIP_ID);
    selListRel.addElement(routeObject.SELECT_ROUTE_BASEPOLICY);
    selListRel.addElement(routeObject.SELECT_ROUTE_BASESTATE);
    MapList routableObjsList = routeObject.getConnectedObjects(context,
                                                       selListObj,
                                                       selListRel,
                                                       false);
    return routableObjsList;
  }
   /* showAddContent - This method is used to determine if
   *             the context user can see the add content link.
   * @param context the eMatrix <code>Context</code> object
   * @param args empty
   * @return boolean
   * @throws Exception if the operation fails
   * @since Common 10-5
   */
   public boolean showAddContentLink(Context context,String []args) throws Exception
   {
     HashMap programMap = (HashMap) JPO.unpackArgs(args);
     String objectId    = (String) programMap.get("objectId");
     DomainObject domObj = new DomainObject(objectId);
     StringList objSel = new StringList();
     objSel.add(SELECT_TYPE);
     objSel.add(SELECT_CURRENT);   
     Map objMap = domObj.getInfo(context, objSel);
     if(TYPE_INBOX_TASK.equals(objMap.get(SELECT_TYPE))){
    	 String currentState = (String) objMap.get(SELECT_CURRENT);
    	 if(currentState.equals(DomainConstants.STATE_INBOX_TASK_COMPLETE)){
    		 return false;
    	 }
     }
     return checkContentAccess(context,objectId,true);
   }
   /* showUpload - This method is used to determine if
   *             the context user can see the Upload content link.
   * @param context the eMatrix <code>Context</code> object
   * @param args empty
   * @return boolean
   * @throws Exception if the operation fails
   * @since Common 10-5
   */
   public boolean showContentUploadLink(Context context,String []args) throws Exception
   {
     HashMap programMap = (HashMap) JPO.unpackArgs(args);
     String objectId    = (String) programMap.get("objectId");
     boolean bTeam = FrameworkUtil.isSuiteRegistered(context,"featureVersionTeamCentral",false,null,null);
     boolean bProgram = FrameworkUtil.isSuiteRegistered(context,"appVersionProgramCentral",false,null,null);
     boolean uploadcheck = false;
     DomainObject domObj = new DomainObject(objectId);
     StringList objSel = new StringList();
     objSel.add(SELECT_TYPE);
     objSel.add(SELECT_CURRENT);   
     Map objMap = domObj.getInfo(context, objSel);
     if(TYPE_INBOX_TASK.equals(objMap.get(SELECT_TYPE))){
    	 String currentState = (String) objMap.get(SELECT_CURRENT);
    	 if(currentState.equals(DomainConstants.STATE_INBOX_TASK_COMPLETE)){
    		 return false;
    	 }
     }
     boolean checkAccess=checkContentAccess(context,objectId,true);
     if(checkAccess){
        if(bTeam || bProgram)
          uploadcheck = true;
        else
          uploadcheck = false;
     }
     return uploadcheck;
   }
   /* showRemoveContentLink - This method is used to determine if
   *             the context user can see the Remove content link.
   * @param context the eMatrix <code>Context</code> object
   * @param args empty
   * @return boolean
   * @throws Exception if the operation fails
   * @since Common 10-5
   */
  public boolean showRemoveContentLink(Context context,String []args) throws Exception
   { 
     HashMap programMap = (HashMap) JPO.unpackArgs(args);
     String taskId    = (String) programMap.get("objectId");
     boolean bTeam = FrameworkUtil.isSuiteRegistered(context,"featureVersionTeamCentral",false,null,null);
     boolean bProgram = FrameworkUtil.isSuiteRegistered(context,"appVersionProgramCentral",false,null,null);
     boolean uploadcheck = false;
     boolean showLink = false;
	 DomainObject taskObject = DomainObject.newInstance(context,taskId);
	 StringList objSel = new StringList();
	 objSel.add("from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.id");
	 objSel.add("from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to."+SELECT_OWNER);	 
	 objSel.add("from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to."+SELECT_CURRENT);
     Map objMap = taskObject.getInfo(context,objSel);
	 String routeId = (String)objMap.get("from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.id");
	 String routeOwner = (String)objMap.get("from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to."+SELECT_OWNER);	 
	 String routeState = (String)objMap.get("from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to."+SELECT_CURRENT);

     // Due to Resume Process implementation there can be tasks which are not connected to route and hence we cannot find
     // the route id from these tasks. In case of such objects one will not be updating contents on the task.
     if (routeId == null) {
          return false;
     }
     Route route = (Route)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE);
     route.setId(routeId);
     boolean isRouteEditable = true;
     // Do not show links if the Route State is Complete or Archive
     if(routeState.equals("Complete") || routeState.equals("Archive")){
       isRouteEditable = false;
     }
     route.open(context);
     Access contextAccess = route.getAccessMask(context);
     route.close(context);
	 if ((routeOwner.equals(context.getUser()) && isRouteEditable) || (contextAccess.hasFromDisconnectAccess() && contextAccess.hasToDisconnectAccess()) ){
		showLink = true;
	 }
     if(showLink){
        if(!bTeam && !bProgram){
          showLink = false;
		}
     }
     return showLink;
   }
    /* showStateCondition - This method is used to show the Value
     *                      for the State Condition Column
   * @param context the eMatrix <code>Context</code> object
   * @param args empty
   * @return Object Vector
   * @throws Exception if the operation fails
   * @since Common 10-5
   */
   public Vector showStateCondition(Context context,String []args) throws Exception
   {
     HashMap programMap = (HashMap) JPO.unpackArgs(args);
     Map paramList      = (Map)programMap.get("paramList");
     String languageStr = (String)paramList.get("languageStr");
     MapList objectList   = (MapList) programMap.get("objectList");
     String sNoneValue=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(languageStr),"emxComponents.AttachmentsDialog.none");
     Map objectMap = null;
     String sPolicy ="",stateValue="";
     Vector showStateCon = new Vector();
    int objectListSize = 0 ;
    if(objectList != null)
    {
        objectListSize = objectList.size();
    }
    for(int i=0; i< objectListSize; i++)
    {
      try{
        objectMap = (HashMap) objectList.get(i);
      }catch(ClassCastException cce){
        objectMap = (Hashtable) objectList.get(i);
      }
    sPolicy = (String) objectMap.get(Route.SELECT_ROUTE_BASEPOLICY);
    sPolicy=(String) PropertyUtil.getSchemaProperty(context,sPolicy);
       stateValue = (String)objectMap.get(Route.SELECT_ROUTE_BASESTATE);
       if (!"Ad Hoc".equals(stateValue)){
        stateValue = FrameworkUtil.lookupStateName(context,sPolicy,stateValue);
        stateValue = i18nNow.getStateI18NString(sPolicy,stateValue,languageStr);
       } else {
         stateValue = sNoneValue;
       }
     showStateCon.add(stateValue);
    }
     return showStateCon;
   }
   /* checkAccess - This method is used to determine if
   *             the context user has access on the object which will be used in the above
   *              methods defined before this.
   * @param context the eMatrix <code>Context</code> object
   * @param args empty
   * @return boolean
   * @throws Exception if the operation fails
   * @since Common 10-5
   */
   public boolean checkContentAccess (Context context,String objectId,boolean andcondition) throws Exception
   {
     boolean checkAccess = false;
     String selectStr = "from["+DomainConstants.RELATIONSHIP_ROUTE_TASK+"].to.id";
     DomainObject taskObject = DomainObject.newInstance(context,objectId);
     objectId = taskObject.getInfo(context,selectStr);
     // Due to Resume Process implementation there can be tasks which are not connected to route and hence we cannot find
     // the route id from these tasks. In case of such objects one will not be updating contents on the task.
     if (objectId == null) {
          return false;
     }
     Route route = (Route)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE);

     route.setId(objectId);
     String sOwner       = route.getInfo(context, route.SELECT_OWNER);
     String sState = route.getInfo(context,route.SELECT_CURRENT);
     boolean isRouteEditable = true;
     // Do not show links if the Route State is Complete or Archive
     if(sState.equals("Complete") || sState.equals("Archive")){
       isRouteEditable = false;
     }
     route.open(context);
     Access contextAccess = route.getAccessMask(context);
     route.close(context);
     if(andcondition)
     {
       if ( (sOwner.equals(context.getUser()) && isRouteEditable)|| (contextAccess.hasFromConnectAccess() && contextAccess.hasToConnectAccess())){
        checkAccess = true;
       }
     }
     else
     {
       if ( sOwner.equals(context.getUser()) || isRouteEditable ){
          checkAccess = true;
       }
     }
     return checkAccess;
   }
    /**
     * Finds out the data for table APPRouteTaskRevisions
     * @param context The Matrix Context object
     * @param args The arguments
     * @return MapList the containing the data for table APPRouteTaskRevisions
     * @throws Exception if operation fails
     * @since Common V6R2009-1
     * @grade 0
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTaskRevisions(Context context, String[] args) throws Exception {
        Map programMap = (HashMap) JPO.unpackArgs(args);
        String strObjectId = (String)programMap.get("objectId");

        DomainObject dmoInboxTask = new DomainObject(strObjectId);

        StringList slBusSelect = new StringList(DomainObject.SELECT_ID);
        slBusSelect.add(DomainObject.SELECT_OWNER);

        MapList mlTaskRevisions = dmoInboxTask.getRevisionsInfo(context, slBusSelect, new StringList());
        return mlTaskRevisions;
   }

   /**
     * Finds out the data for column "Comments Or Instructions" in table APPRouteTaskRevisions
     * @param context The Matrix Context object
     * @param args The arguments
     * @return Vector containing data for column "Comments Or Instructions"
     * @throws Exception if operation fails
     * @since Common V6R2009-1
     * @grade 0
     */
   public Vector getTaskRevisionsCommentsOrInstructions(Context context, String[] args) throws Exception {
        Map programMap = (HashMap) JPO.unpackArgs(args);
        MapList mlObjectList = (MapList)programMap.get("objectList");

        Map mapObjectInfo = null;
        String strObjectId = null;
        String strStateName = null;
        String strComments = null;
        String strInstructions = null;
        DomainObject dmoInboxTask = null;
        Map mapInfo = null;
        Vector vecResult = new Vector();

        final String STATE_COMPLETE = PropertyUtil.getSchemaProperty(context, "Policy", DomainObject.POLICY_INBOX_TASK, "state_Complete");
        final String SELECT_COMMENTS = "attribute[" + DomainObject.ATTRIBUTE_COMMENTS + "]";
        final String SELECT_ROUTE_INSTRUCTIONS = "attribute[" + DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS + "]";

        StringList slBusSelects = new StringList();
        slBusSelects.add(DomainObject.SELECT_CURRENT);
        slBusSelects.add(SELECT_COMMENTS);
        slBusSelects.add(SELECT_ROUTE_INSTRUCTIONS);

        for (Iterator itrObjects = mlObjectList.iterator(); itrObjects.hasNext(); ) {
            mapObjectInfo = (Map)itrObjects.next();
            strObjectId = (String)mapObjectInfo.get(DomainObject.SELECT_ID);

            dmoInboxTask = new DomainObject(strObjectId);
            mapInfo = (Map)dmoInboxTask.getInfo(context, slBusSelects);

            strStateName = (String)mapInfo.get(DomainObject.SELECT_CURRENT);
            strComments = (String)mapInfo.get(SELECT_COMMENTS);
            strInstructions = (String)mapInfo.get(SELECT_ROUTE_INSTRUCTIONS);

            // If task is completed then show the comments else show the instructions
            if (STATE_COMPLETE.equals(strStateName)) {
                vecResult.add(strComments);
            }
            else {
                vecResult.add(strInstructions);
            }
        }
        return vecResult;
   }

   //Added for Next Gen UI migration - Inbox Task Details display

   /**
    * Used to display the value of Delegation allowed or not for the task
    *
    * @param context Object
    * @param args String array
    * @throws Exception
    */

   public String getAllowDelegationValue(Context context, String[] args)throws Exception
   {
        HashMap detailsMap = getInboxTaskFormFieldAccessDetails( context, args);
        String languageStr = (String)detailsMap.get("languageStr");
        if (languageStr == null)
        {
            Map programMap = (Map) JPO.unpackArgs(args);
            Map requestMap = (Map) programMap.get("requestMap");
            languageStr = (String) requestMap.get("languageStr");
        }
        return "FALSE".equalsIgnoreCase((String)detailsMap.get(ATTRIBUTE_ALLOW_DELEGATION)) ?
        		EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(languageStr),"emxComponents.Common.No") :
        		EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(languageStr),"emxComponents.Common.Yes");
   }

   public boolean checksToEditTask(Context context, String[] args) throws FrameworkException {
       HashMap detailsMap = getInboxTaskPropertiesAccessCommands( context, args);
       return ((Boolean)detailsMap.get("APPTaskEdit")).booleanValue();
   }

   public boolean checksToAcceptTask(Context context, String[] args) throws FrameworkException {
       HashMap detailsMap = getInboxTaskPropertiesAccessCommands( context, args);
       return ((Boolean)detailsMap.get("APPAcceptInboxTask")).booleanValue();
   }

   public boolean checksToPromoteTask(Context context, String[] args) throws FrameworkException {
       HashMap detailsMap = getInboxTaskPropertiesAccessCommands( context, args);
       return ((Boolean)detailsMap.get("APPPromoteInboxTask")).booleanValue();
   }

   public boolean checksToDemoteTask(Context context, String[] args) throws FrameworkException {
       HashMap detailsMap = getInboxTaskPropertiesAccessCommands( context, args);
       return ((Boolean)detailsMap.get("APPDemoteInboxTask")).booleanValue();
   }


   /**
    * Access Program to display the Task complete link
    *
    * @param context Object
    * @param args String array
    * @throws Exception
    */

   public boolean displayCompleteLink(Context context, String[] args)throws Exception
   {
       HashMap detailsMap = getInboxTaskPropertiesAccessCommands( context, args);
       return ((Boolean)detailsMap.get("APPCompleteTask")).booleanValue();
   }

   /**
    * Access Program to display the Task Approve/Reject link
    *
    * @param context Object
    * @param args String array
    * @throws Exception
    */

   public boolean displayApproveRejectLink(Context context, String[] args)throws Exception
   {
       HashMap detailsMap = getInboxTaskPropertiesAccessCommands( context, args);
       return ((Boolean)detailsMap.get("APPApproveTask")).booleanValue();

   }

   /**
    * Access Program to display the Task Abstain link
    *
    * @param context Object
    * @param args String array
    * @throws Exception
    */

   public boolean displayAbstainLink(Context context, String[] args)throws Exception
   {
       HashMap detailsMap = getInboxTaskPropertiesAccessCommands( context, args);
       return ((Boolean)detailsMap.get("APPAbstainTask")).booleanValue();

   }

   /**
    * Program to display the assignee set due date
    *
    * @param context Object
    * @param args String array
    * @throws Exception
    */

   public String displayAssigneeDueDate(Context context, String[] args)throws Exception{
	   
	   String duedate = "";
       String Actualduedate = "";
       
       HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
       String timeZone = (String)detailsMap.get("timeZone");
       String languageStr= (String)detailsMap.get("languageStr");
       String allowDelegation = (String)detailsMap.get(ATTRIBUTE_ALLOW_DELEGATION);
       String taskScheduledDate = (String)detailsMap.get(ATTRIBUTE_SCHEDULED_COMPLETION_DATE);

       HashMap programMap = (HashMap)JPO.unpackArgs(args);
       Map requestMap = (Map)programMap.get("requestMap");
       Locale locale = (Locale)requestMap.get("localeObj");
	   
	   boolean bAssigneeDueDate = ((Boolean)detailsMap.get("bAssigneeDueDate")).booleanValue();
       String objectId = (String) requestMap.get("objectId");
       DomainObject routeTask = DomainObject.newInstance(context, objectId);
       String strRouteOwner = routeTask.getInfo(context,"from["+RELATIONSHIP_ROUTE_TASK+"].to.owner");
       boolean check=false;
       if(UIUtil.isNotNullAndNotEmpty(strRouteOwner)){
    	   check = strRouteOwner.equals(context.getUser()) || bAssigneeDueDate ;
       }

       String finalLzDate           = "";
       Date taskDueDate             = null;
       StringBuffer strHTMLBuffer   = new StringBuffer();
       Calendar calendar            = new GregorianCalendar();

       String temp_hhrs_mmin = EnoviaResourceBundle.getProperty(context, "emxComponents.RouteScheduledCompletionTime");

       boolean bDueDateEmpty    = ((Boolean)detailsMap.get("bDueDateEmpty")).booleanValue();

       boolean is24= false;
		String amPm = " AM";
		// 24 Hours format for _de and _ja more can be added
		if(languageStr.startsWith("de") || languageStr.startsWith("ja") || languageStr.startsWith("zh")){
			
			is24 = true;
			amPm="";
		}
		
       if(!bDueDateEmpty) {

           double clientTZOffset   = (new Double(timeZone)).doubleValue();
           int intDateFormat = eMatrixDateFormat.getEMatrixDisplayDateFormat();
		   String displayDateTime = eMatrixDateFormat.getFormattedDisplayDateTime(context, taskScheduledDate, true, intDateFormat, clientTZOffset,Locale.US);
           taskDueDate             = com.matrixone.apps.domain.util.eMatrixDateFormat.getJavaDate(displayDateTime);
           finalLzDate             = eMatrixDateFormat.getFormattedDisplayDate(taskScheduledDate,clientTZOffset,locale);
          // calendar.setTime(taskDueDate);
           calendar = getTimeNow(temp_hhrs_mmin);
           
           int hour=taskDueDate.getHours();
           String minute="";
           
           minute= taskDueDate.getMinutes()<10?  "0"+taskDueDate.getMinutes():""+taskDueDate.getMinutes();         
		   String seconds =taskDueDate.getSeconds()<10?  "0"+taskDueDate.getSeconds():""+taskDueDate.getSeconds();          
           hour = (hour>12 && !is24 ) ? hour-12 : hour;
           amPm = is24  ? amPm : (displayDateTime.endsWith("AM")?" AM":" PM");
           Actualduedate = ""+hour+":"+minute+":"+seconds+amPm;
           if(UIUtil.isNotNullAndNotEmpty(amPm)){
           String[] messageValues = new String[1];
           messageValues[0] = hour+":"+minute;
           duedate = MessageUtil.getMessage(context,null,
        		                            "emxFramework.Calendar.Time."+amPm.trim(),
                                            messageValues,null,
                                            new Locale(languageStr),"emxFrameworkStringResource");
           }else{
        	   duedate = ""+hour+":"+minute;
			}
       }
       //Due date is always set. wont come to else block
       //  else{
       //    calendar = getTimeNow(temp_hhrs_mmin);
       // }
       if((bAssigneeDueDate && bDueDateEmpty) || (bAssigneeDueDate || (allowDelegation.equals("TRUE"))))
       {
		   Date taskDate = (UIUtil.isNotNullAndNotEmpty(taskScheduledDate)) ? new Date(taskScheduledDate) : new Date();
		   long taskMSValue = taskDate.getTime();
           strHTMLBuffer = new StringBuffer(64);
           strHTMLBuffer.append("<input type=\"text\" readonly=\"readonly\" style=\"background-color:#ebebe4;opacity: 0.3;\" onfocus=\"this.blur()\" size=\"\" name=\"DueDate\" value=\"").append(finalLzDate).append("\" id=\"DueDate\">");
		   
		   if(check) {
			   strHTMLBuffer.append("&#160;<a href=\"javascript:showCalendar('editDataForm', 'DueDate', '").append(taskScheduledDate).append("', '', saveFieldObjByName('DueDate'))\">");
			   strHTMLBuffer.append("<img src=\"../common/images/iconSmallCalendar.gif\" alt=\"Date Picker\" border=\"0\"></a>");
		   }
           strHTMLBuffer.append("<input type=\"hidden\" name=\"DueDate").append("fieldValue\"  value=\"\">");
           strHTMLBuffer.append("<input type=\"hidden\" name=\"DueDate").append("AmPm\"  value=\"\">");
		   strHTMLBuffer.append("<input type=\"hidden\" id=\"DueDate_msvalue\" name=\"DueDate_msvalue\"  value=\""+taskMSValue+"\">");
           strHTMLBuffer.append("<script language=\"JavaScript\">document.forms[\"editDataForm\"][\"DueDate\"].fieldLabel=\"DueDate\";</script>").append("&#160;");
           strHTMLBuffer.append("<select name=\"routeTime\" id= \"routeTime\" style=\"font-size: 8pt\"");		   
		   strHTMLBuffer.append((check)?(">"):("disabled onfocus=\" this.blur()\">"));
		   strHTMLBuffer.append("<Option value=\"").append(Actualduedate).append("\"").append("Selected").append(">").append(duedate).append("</Option>");
		   
            int hour = 5;
            
			boolean minFlag = true;
			boolean amFlag = true;
          // taskHour      = calendar.get(Calendar.HOUR_OF_DAY);
          // taskMinitue   = calendar.get(Calendar.MINUTE);
           for (int i=0;i<48;i++) {
               String ttime     = "";
               String Slct      ="";
               String timeValue = "";

				if(hour>12 && !is24)
				{
					hour =1 ;
				}
				if(minFlag)
				{
					ttime = hour + ":00" + amPm;
					timeValue = hour  + ":00" + ":00" + amPm;
					minFlag = false;
				}else
				{
					ttime = hour + ":30" + amPm;
					timeValue = hour  + ":30" + ":00" + amPm;
					hour++;
					minFlag = true;
					if(hour==12 && !is24)
	            	{
	            		amPm = " PM";
               }
               }

               strHTMLBuffer.append("<Option value=\"").append(timeValue).append("\"").append(Slct).append(">").append(ttime).append("</Option>");
               if(hour>12 && is24 && amFlag){
					hour=13;
					amFlag = false;
               }
           	if(hour>23 && is24){
					hour=00;
           }

           	if(ttime.contains("11:30") && ttime.contains("PM") && !is24)
           	{
           		amPm = " AM";
           	}
         }  //end for
         String defaultTime = temp_hhrs_mmin.substring(0, (temp_hhrs_mmin.indexOf(':')+3))+":00 "+(temp_hhrs_mmin.indexOf("AM")>0?"AM":"PM");
         strHTMLBuffer.append("</select>");
         strHTMLBuffer.append("<input type=\"hidden\" name=\"routeTime\" value=\"").append(duedate).append("\">");
   }
       return strHTMLBuffer.toString();
   }

   public static boolean taskEditCheck(Context context, String[] args)throws Exception
   {
	   HashMap inputMap = (HashMap) JPO.unpackArgs(args);
	   String mode = (String) inputMap.get("mode");
	   StringList slBusSelect = new StringList();
	   Map mapInfo = null;
	  
	   if(mode!=null && "edit".equalsIgnoreCase(mode) ){
		   
		  String objectId= (String) inputMap.get("objectId"); 
		  DomainObject domainObject = new DomainObject(objectId);
		  String relId = (String) inputMap.get("relId"); 
		  slBusSelect.add("from[" +DomainConstants.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE +"].to.attribute[" + DomainConstants.ATTRIBUTE_TASKEDIT_SETTING + "].value");
		  mapInfo = domainObject.getInfo(context, slBusSelect);

		  
		  String strEditSetting = (String) mapInfo.get("from[" +DomainConstants.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE +"].to.attribute[" + DomainConstants.ATTRIBUTE_TASKEDIT_SETTING + "].value");
		  HashMap settingMap= (HashMap)inputMap.get("SETTINGS");

		if("Modify Task List".equalsIgnoreCase(strEditSetting) || "Extend Task List".equalsIgnoreCase(strEditSetting)){
			DomainRelationship relRouteNode = new DomainRelationship(relId);
			String isTemplateTask = relRouteNode.getAttributeValue(context, "Template Task");
			if("yes".equalsIgnoreCase(isTemplateTask)){
			  settingMap.put("Editable","false");
			  inputMap.put("SETTINGS",settingMap);
			 }			 
		  }

		 if("Maintain Exact Task List".equalsIgnoreCase(strEditSetting)){ 
		  
	   
			 settingMap.put("Editable","false");
	         inputMap.put("SETTINGS",settingMap);
		  }
	   }
	    
       return true;
   }   
   
   public HashMap getInboxTaskPropertiesAccessCommands( Context context, String[] args) throws FrameworkException {
       try {
           String contextUser = context.getUser();
           HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap requestMap = (HashMap)programMap.get("requestMap");
           String objectId = (String)programMap.get("objectId");
           objectId = objectId != null ? objectId : (String)requestMap.get("objectId");

           String selAttrAssigneeSetDueDate 		= getAttributeSelect(ATTRIBUTE_ASSIGNEE_SET_DUEDATE);
           String selAttrAllowDelegation 			= getAttributeSelect(ATTRIBUTE_ALLOW_DELEGATION);
           String selAttrScheduledCompletionDate	= getAttributeSelect(ATTRIBUTE_SCHEDULED_COMPLETION_DATE);

           InboxTask taskBean = (InboxTask)DomainObject.newInstance(context, objectId);

           String SELECT_ROUTE_ID  = "from[" + RELATIONSHIP_ROUTE_TASK + "].to.id";
           String SELECT_TASK_ASSIGNEE_NAME    = "from[" + RELATIONSHIP_PROJECT_TASK + "].to.name";
           String selAttrNeedsReview = getAttributeSelect(ATTRIBUTE_REVIEW_TASK);

           StringList slBusSelect = new StringList();
           slBusSelect.add(SELECT_CURRENT);
           slBusSelect.add(SELECT_OWNER);
           slBusSelect.add(Route.SELECT_ROUTE_ACTION);
           slBusSelect.add(selAttrNeedsReview);
           slBusSelect.add(SELECT_ROUTE_ID);
           slBusSelect.add(SELECT_TASK_ASSIGNEE_NAME);

           Map mapTaskInfo = taskBean.getInfo(context, slBusSelect);
           String taskState         = (String)mapTaskInfo.get(SELECT_CURRENT);
           String sTaskOwner        = (String)mapTaskInfo.get(SELECT_OWNER);
           String routeAction       = (String)mapTaskInfo.get(Route.SELECT_ROUTE_ACTION);
           String needsReview       = (String)mapTaskInfo.get(selAttrNeedsReview);
           String strTaskAssignee = (String)mapTaskInfo.get(SELECT_TASK_ASSIGNEE_NAME);
           String taskScheduledDate 	= (String)mapTaskInfo.get(selAttrScheduledCompletionDate);
           String assigneeDueDateOpt 	= (String)mapTaskInfo.get(selAttrAssigneeSetDueDate);
           String allowDelegation 		= (String)mapTaskInfo.get(selAttrAllowDelegation);

           boolean isAssignedToGroupOrRole = taskBean.checkIfTaskIsAssignedToGroupOrRole(context);
           boolean isTaskAssingedToUserGroup = taskBean.checkIfTaskIsAssignedToUserGroup(context);
           boolean isApprovalRoute = "Approve".equals(routeAction);
           boolean isCommentTask = "Comment".equalsIgnoreCase(routeAction);

           // Due to Resume Process implementation there can be tasks which are not connected to route and hence we cannot find
           // the route id from these tasks. Then the route id can be found by first finding the latest revision of the task
           // and then querying for the route object.
           // Bug 302957 - Added push and pop context
           ContextUtil.pushContext(context);
           String routeId   = (String)mapTaskInfo.get(SELECT_ROUTE_ID);
           boolean isReadOnly = UIUtil.isNullOrEmpty(routeId);
           if (isReadOnly) {
               DomainObject dmoLastRevision = new DomainObject(taskBean.getLastRevision(context));
               routeId = dmoLastRevision.getInfo(context, SELECT_ROUTE_ID);
               // No action commands will be shown for such tasks
               isReadOnly = true;
           }

           Route boRoute = (Route)DomainObject.newInstance(context,TYPE_ROUTE);
           boRoute.setId(routeId);

           String sSelectOwningOrgId =  "from[" + RELATIONSHIP_INITIATING_ROUTE_TEMPLATE + "].to.to["
                                                + RELATIONSHIP_OWNING_ORGANIZATION + "].from.id";
           StringList busSelects = new StringList(4);
           busSelects.addElement(SELECT_ID );
           busSelects.addElement(SELECT_OWNER );
           busSelects.addElement(Route.SELECT_ROUTE_STATUS );
           busSelects.addElement(sSelectOwningOrgId );
           Map mRouteInfo = boRoute.getInfo( context, busSelects );
           String routeOwner= (String) mRouteInfo.get( DomainConstants.SELECT_OWNER ) ;
           String sStatus = (String) mRouteInfo.get( Route.SELECT_ROUTE_STATUS);
           String sOwningOrgId = (String) mRouteInfo.get( sSelectOwningOrgId );

           ContextUtil.popContext(context);

           boolean isRouteStarted = "Started".equals(sStatus);
           String showAbstain = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.ShowAbstainForTaskApproval");
           showAbstain = UIUtil.isNullOrEmpty(showAbstain) ? "true" : showAbstain;

           String STATE_ASSIGNED = PropertyUtil.getSchemaProperty(context, "policy", POLICY_INBOX_TASK, "state_Assigned");
           String STATE_REVIEW = PropertyUtil.getSchemaProperty(context, "policy", POLICY_INBOX_TASK, "state_Review");
           String STATE_COMPLETE = PropertyUtil.getSchemaProperty(context, "policy", POLICY_INBOX_TASK, "state_Complete");

           boolean isInAssignedState = taskState.equals(STATE_ASSIGNED);
           boolean isInReviewState = taskState.equals(STATE_REVIEW);
           boolean isInCompleteState = taskState.equalsIgnoreCase(STATE_COMPLETE);

           boolean isTaskOwner = sTaskOwner.equals(contextUser);
           boolean isRouteOwner = routeOwner.equals(contextUser);
           boolean isTaskAssignee = contextUser.equals(strTaskAssignee);

           boolean bShowAcceptCmd = true;
           boolean bEditDetails     = false;
           boolean bCompleteLink    = false;
           boolean bApproveLink     = false;
           boolean bNeedsReview          = isInReviewState && isRouteOwner;

           //////////////////////////////////////////////////////////////////////////////
           // The command Update Assignee will be shown in Assigned state only.
           // Route owner can Update Assignee any time
           // Task assignee can Update Assignee, only if the task is delegatable
           //
           if (isInAssignedState) {
//             IR-043921V6R2011 - Changes START
               if((isAssignedToGroupOrRole || isTaskAssingedToUserGroup) && !UIUtil.isNullOrEmpty(sOwningOrgId)) {
                   Organization org = (Organization) DomainObject.newInstance( context, sOwningOrgId );
                   busSelects = new StringList(2);
                   busSelects.addElement(SELECT_ID );
                   busSelects.addElement(SELECT_NAME );
                   String sWhereClause = "( name == \"" + contextUser + "\" )";
                   MapList mlMembers = org.getMemberPersons( context, busSelects, sWhereClause, null );
                   bShowAcceptCmd = !mlMembers.isEmpty();
               }
           }

           // Show Complete link for non-Approve type of tasks
           bCompleteLink = (isInAssignedState && isTaskOwner && !isApprovalRoute);

           // for Approve tasks, show the links Approve / Reject / Abstain
           //if(!taskState.equalsIgnoreCase("Complete") && (taskState.equals("Assigned") && sTaskOwner.equals(sLoginPerson) && "Approve".equals(routeAction) || strTaskAssignee.equals(sLoginPerson))) {

           if(isInAssignedState && isApprovalRoute && (isTaskOwner || isTaskAssignee)) {
               bApproveLink = true;
           }

           HashMap returnMap = new HashMap(5);

          //Edit details link is provided when any of the  3 fields in the edit task webform is displayed, otherwise we dont display thr edit details command.
           boolean bDueDateEmpty  = UIUtil.isNullOrEmpty(taskScheduledDate);
           boolean bAssigneeDueDate  = "Yes".equals(assigneeDueDateOpt);
           boolean showTaskComments  = isTaskOwner && isInAssignedState;
           boolean showReviewComments = "Yes".equalsIgnoreCase(needsReview);

           boolean showAssigneeDueDate = (bAssigneeDueDate && bDueDateEmpty) || (bAssigneeDueDate || "TRUE".equals(allowDelegation));
           boolean canEditReviewerComments = showReviewComments && STATE_REVIEW.equalsIgnoreCase(taskState) && isRouteOwner;
           bEditDetails = (showAssigneeDueDate || showTaskComments || canEditReviewerComments);


           bCompleteLink = isRouteStarted && !isReadOnly && bCompleteLink;
           bApproveLink =  isRouteStarted && !isReadOnly && bApproveLink;
           boolean bAbstainLink = bApproveLink && "true".equalsIgnoreCase(showAbstain);
           bShowAcceptCmd = (isAssignedToGroupOrRole || isTaskAssingedToUserGroup ) && (taskState.equals("") || taskState.equals("Assigned")) && bShowAcceptCmd;

           returnMap.put("APPTaskEdit", Boolean.valueOf(bEditDetails));
           returnMap.put("APPCompleteTask", Boolean.valueOf(bCompleteLink));
           returnMap.put("APPApproveTask", Boolean.valueOf(bApproveLink));
           returnMap.put("APPRejectTask", Boolean.valueOf(bApproveLink));
           returnMap.put("APPAbstainTask", Boolean.valueOf(bAbstainLink));
           returnMap.put("APPAcceptInboxTask", Boolean.valueOf(bShowAcceptCmd));
           returnMap.put("APPPromoteInboxTask", Boolean.valueOf(bNeedsReview));
           returnMap.put("APPDemoteInboxTask", Boolean.valueOf(bNeedsReview));

           return returnMap;
       } catch (Exception e) {
           throw new FrameworkException(e);
       }

   }

   protected HashMap getInboxTaskFormFieldAccessDetails( Context context, String[] args) throws Exception
   {
       HashMap programMap = (HashMap)JPO.unpackArgs(args);
       HashMap requestMap = (HashMap)programMap.get("requestMap");
       String objectId = (String)programMap.get("objectId");

       String languageStr = requestMap != null ? (String)requestMap.get("languageStr") : (String)programMap.get("languageStr");
       objectId = objectId != null ? objectId : (String)requestMap.get("objectId");
       String timeZone = requestMap != null ? (String)requestMap.get("timeZone") : (String)programMap.get("timeZone");


       String SELECT_ROUTE_ID = "from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.id";

       String loggedInUser = context.getUser();

       String selAttrAssigneeSetDueDate = getAttributeSelect(ATTRIBUTE_ASSIGNEE_SET_DUEDATE);
       String selAttrAllowDelegation = getAttributeSelect(ATTRIBUTE_ALLOW_DELEGATION);
       String selAttrScheduledCompletionDate = getAttributeSelect(ATTRIBUTE_SCHEDULED_COMPLETION_DATE);
       String selAttrReviewTask  = getAttributeSelect(PropertyUtil.getSchemaProperty(context, "attribute_ReviewTask"));
	   String selAttrRouteAction  = getAttributeSelect(DomainConstants.ATTRIBUTE_ROUTE_ACTION);	

       StringList selectables = new StringList(2);
       selectables.add(DomainConstants.SELECT_OWNER);
       selectables.add(DomainConstants.SELECT_CURRENT);
       selectables.add(selAttrAssigneeSetDueDate);
       selectables.add(selAttrAllowDelegation);
       selectables.add(selAttrScheduledCompletionDate);
       selectables.add(SELECT_ROUTE_ID);
       selectables.add(selAttrReviewTask);
       selectables.add(selAttrRouteAction);

       DomainObject doInboxTask = DomainObject.newInstance(context,objectId);
       Map infoMap = doInboxTask.getInfo(context,selectables);

       String taskOwner = (String)infoMap.get(SELECT_OWNER);
       String taskScheduledDate = (String)infoMap.get(selAttrScheduledCompletionDate);
       String assigneeDueDateOpt = (String)infoMap.get(selAttrAssigneeSetDueDate);
       String allowDelegation = (String)infoMap.get(selAttrAllowDelegation);
       String routeId = (String)infoMap.get(SELECT_ROUTE_ID);
       String strCurrentState = (String)infoMap.get(DomainConstants.SELECT_CURRENT);
       String reivewTask    = (String)infoMap.get(selAttrReviewTask);
       String routeAction = (String)infoMap.get(selAttrRouteAction);

        if (routeId == null) {
            DomainObject dmoLastRevision = new DomainObject(doInboxTask.getLastRevision(context));
            routeId = dmoLastRevision.getInfo(context, SELECT_ROUTE_ID);
        }

       DomainObject dmoRoute = new DomainObject(routeId);
       String routeOwner     = (String)dmoRoute.getInfo(context, DomainObject.SELECT_OWNER);
       String STATE_ASSIGNED = PropertyUtil.getSchemaProperty(context, "policy", DomainConstants.POLICY_INBOX_TASK, "state_Assigned");
       String STATE_REVIEW = PropertyUtil.getSchemaProperty(context, "policy", DomainConstants.POLICY_INBOX_TASK, "state_Review");
       boolean isInAssignedState = STATE_ASSIGNED.equals(strCurrentState);

       boolean isRouteOwner = routeOwner.equals(loggedInUser);
       boolean isTaskOwner = taskOwner.equals(loggedInUser);


       boolean showAssigneeField =  isInAssignedState &&
                                       (isRouteOwner ||
                                       (isTaskOwner && "TRUE".equalsIgnoreCase(allowDelegation)));

       boolean bDueDateEmpty  = UIUtil.isNullOrEmpty(taskScheduledDate);
       boolean bAssigneeDueDate  = "Yes".equals(assigneeDueDateOpt);
       boolean showTaskComments  = isTaskOwner && isInAssignedState;
       boolean showAssigneeDueDate = (bAssigneeDueDate && bDueDateEmpty) || (bAssigneeDueDate || allowDelegation.equals("TRUE"));
       boolean showReviewComments = "Yes".equalsIgnoreCase(reivewTask);
       boolean canEditReviewerComments = showReviewComments && STATE_REVIEW.equalsIgnoreCase(strCurrentState) && isRouteOwner;

       HashMap detailsMap = new HashMap();
       detailsMap.put("timeZone", timeZone);
       detailsMap.put("languageStr", languageStr);
       detailsMap.put("showAssigneeField", Boolean.valueOf(showAssigneeField));
       detailsMap.put("showAssigneeDueDate", Boolean.valueOf(showAssigneeDueDate));
       detailsMap.put("bDueDateEmpty", Boolean.valueOf(bDueDateEmpty));
       detailsMap.put("bAssigneeDueDate", Boolean.valueOf(bAssigneeDueDate));
       detailsMap.put("showTaskComments", Boolean.valueOf(showTaskComments));
       detailsMap.put("showReviewComments", Boolean.valueOf(showReviewComments));
       detailsMap.put("canEditReviewerComments", Boolean.valueOf(canEditReviewerComments));
       detailsMap.put(ATTRIBUTE_SCHEDULED_COMPLETION_DATE, taskScheduledDate);
       detailsMap.put(ATTRIBUTE_ALLOW_DELEGATION, allowDelegation);
       detailsMap.put("routeAction", routeAction);

       return detailsMap;
   }
// method to return system date calendar; time will be from property
   public GregorianCalendar getTimeNow(String temp_hhrs_mmin){


       GregorianCalendar cal = new GregorianCalendar();

       int hhrs              = Integer.parseInt(temp_hhrs_mmin.substring(0, temp_hhrs_mmin.indexOf(':')).trim());
       int index             = temp_hhrs_mmin.indexOf("AM");

       if(index < 0) {
            index            = temp_hhrs_mmin.indexOf("PM");
            if(hhrs < 12){
              hhrs += 12;
            }
       } else {
             if(hhrs == 12){
               hhrs = 0;
             }
       }

       int mmin              = Integer.parseInt(temp_hhrs_mmin.substring(temp_hhrs_mmin.indexOf(':')+1, index).trim());
       cal.set(Calendar.HOUR_OF_DAY, hhrs);
       cal.set(Calendar.MINUTE, mmin);

       return cal;
   }

   @com.matrixone.apps.framework.ui.PostProcessCallable
   public HashMap updateTaskDetails(Context context, String[] args) throws Exception
   {
       HashMap programMap = (HashMap)JPO.unpackArgs(args);
       HashMap requestMap = (HashMap)programMap.get("requestMap");
       String languageStr = (String)requestMap.get("languageStr");
       Locale locale = (Locale)requestMap.get("localeObj");
       String timeZone = (String)requestMap.get("timeZone");
       String taskId    = (String)requestMap.get("objectId");
       String taskComments    = (String)requestMap.get("Comments");
       String reviewerComments    = (String)requestMap.get("ReviewerComments");
       String taskScheduledDate    = (String)requestMap.get("DueDate");
       String assigneeDueTime    = (String)requestMap.get("routeTime");
	   String approvalStatus    = (String)requestMap.get("approvalStatus");
	   
	   String isReviewerCommentRequired  = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.EnforceOwnerReviewComments");
	   String isCommentRequired  = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.EnforceAssigneeApprovalComments");
	   if("false".equals(isCommentRequired))
	   {
	     taskComments    = (String)requestMap.get("Comments1");
		 requestMap.put("Comments",taskComments);
	   }
	   if("false".equals(isReviewerCommentRequired))
	   {
	     reviewerComments    = (String)requestMap.get("ReviewerComments1");
		 requestMap.put("ReviewerComments",reviewerComments); 
	   }
       HashMap resultsMap = new HashMap();
		String mailEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.EnableMails");
       InboxTask inboxTaskObj = (InboxTask)DomainObject.newInstance(context,DomainConstants.TYPE_INBOX_TASK);
       String typeInboxTask = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",locale, "emxFramework.Type.Inbox_Task");
       if(!UIUtil.isNullOrEmpty(taskId))
    	   inboxTaskObj.setId(taskId);
       inboxTaskObj.open(context);
       String selRouteActionOfTask = "attribute[" + PropertyUtil.getSchemaProperty(context, "attribute_RouteAction") + "]";
	   String selTskActCompDate = "attribute[" + PropertyUtil.getSchemaProperty(context, "attribute_ActualCompletionDate") + "]";
	   String selTaskComments = "attribute[" + PropertyUtil.getSchemaProperty(context, "attribute_Comments") + "]";
       String selRouteId = "from[" + PropertyUtil.getSchemaProperty(context, "relationship_RouteTask") + "].to.id";
		String selRoutePhysicalId = "from[" + PropertyUtil.getSchemaProperty(context, "relationship_RouteTask") + "].to.physicalid";
       StringList taskSel = new StringList();
       taskSel.add(DomainConstants.SELECT_ID);
       taskSel.add(DomainConstants.SELECT_NAME);
	   taskSel.add(DomainConstants.SELECT_REVISION);
       taskSel.add(DomainConstants.SELECT_OWNER);
       taskSel.add(selRouteId);
       taskSel.add(selRouteActionOfTask);
	   taskSel.add(selTskActCompDate);
	   taskSel.add(selTaskComments);
		taskSel.add(DomainConstants.SELECT_PHYSICAL_ID);
		taskSel.add("attribute["+ATTRIBUTE_TITLE+"]");
       Map<String, String> taskInfoMap = inboxTaskObj.getInfo(context, taskSel);
       String routeId = taskInfoMap.get(selRouteId);

       if (!UIUtil.isNullOrEmpty(taskScheduledDate)) {
           double clientTZOffset = (new Double(timeZone)).doubleValue();
           taskScheduledDate     =  eMatrixDateFormat.getFormattedInputDateTime(context,taskScheduledDate,assigneeDueTime,clientTZOffset, locale);

       }



           Route route = (Route)DomainObject.newInstance(context, DomainConstants.TYPE_ROUTE);
           DomainObject dmoLastRevision = new DomainObject(inboxTaskObj.getLastRevision(context));
           String sRouteId = dmoLastRevision.getInfo(context, selRouteId);
		String sRoutePhysicalId = dmoLastRevision.getInfo(context, selRoutePhysicalId);
           //BusinessObject boTask = new BusinessObject( taskId );
           //boTask.open( context );


           BusinessObjectAttributes boAttrGeneric = inboxTaskObj.getAttributes(context);
           AttributeItr attrItrGeneric   = new AttributeItr(boAttrGeneric.getAttributes());
           AttributeList attrListGeneric = new AttributeList();

           String sAttrValue = "";
           String sTrimVal   = "";
           while (attrItrGeneric.next()) {
             Attribute attrGeneric = attrItrGeneric.obj();
             sAttrValue = (String)requestMap.get(attrGeneric.getName());
             if (sAttrValue != null) {
               sTrimVal = sAttrValue.trim();
               if ( attrGeneric.getName().equals(DomainConstants.ATTRIBUTE_APPROVAL_STATUS) && sTrimVal.equals("Reject") ) {
                 Pattern relPattern  = new Pattern(DomainConstants.RELATIONSHIP_ROUTE_TASK);
                 Pattern typePattern = new Pattern(DomainConstants.TYPE_ROUTE);
                 BusinessObject boRoute = ComponentsUtil.getConnectedObject(context,inboxTaskObj,relPattern.getPattern(),typePattern.getPattern(),false,true);

                 if ( boRoute != null ) {
                 boRoute.open(context);

                 AttributeItr attributeItr = new AttributeItr(boRoute.getAttributes(context).getAttributes());

                 Route routeObj = (Route)DomainObject.newInstance(context,boRoute);

                 StringList routeSelects = new StringList(3);
                 routeSelects.add(Route.SELECT_OWNER);
                 routeSelects.add(Route.SELECT_NAME);
                 routeSelects.add(Route.SELECT_ATTRIBUTE_TITLE);
                 routeSelects.add(Route.SELECT_REVISION);
                 Map routeInfo = routeObj.getInfo(context,routeSelects);

                 String routeOwner = (String)routeInfo.get(Route.SELECT_OWNER);
                 String routeName = (String)routeInfo.get(Route.SELECT_NAME);
                 String routeRev = (String)routeInfo.get(Route.SELECT_REVISION);
                 

				 // Form Route Content and description - start
				 StringList routeContentSel = new StringList();
                 routeContentSel.add(DomainConstants.SELECT_ID);
                 routeContentSel.add(DomainConstants.SELECT_NAME);
                 routeContentSel.add(DomainConstants.SELECT_DESCRIPTION);
                 routeContentSel.add(DomainConstants.SELECT_TYPE);
                 routeContentSel.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
                 MapList routeContentList = routeObj.getRelatedObjects(context, Route.RELATIONSHIP_OBJECT_ROUTE, "*", routeContentSel, null, true, false, (short) 0, null, null, 0);
                 routeContentList.addSortKey(DomainConstants.SELECT_NAME, DomainConstants.SortDirection.ASCENDING.toString(), String.class.getSimpleName());
                 routeContentList.sort();
                 StringBuffer sRouteContent = new StringBuffer();
						StringBuffer routeContent3D = new StringBuffer();
				 StringBuffer routeContent3DIds = new StringBuffer();
				 StringBuffer routeContent3DTypes = new StringBuffer();
				 StringBuffer routeContent3DTitles = new StringBuffer();
                 StringBuffer sRouteContentDescription = new StringBuffer();
                 for(int i=0; i< routeContentList.size(); i++) {
                     // Map of the Objects
                     Map<String, String> routeContent = (Map<String, String>) routeContentList.get(i);
                 
                 	// build content links for notification table
					if(i > 0) {
						sRouteContent.append("<br/><br/>");
						sRouteContentDescription.append("<br/><br/>");
								routeContent3D.append(", ");
								routeContent3DTypes.append(", ");
								routeContent3DIds.append(", ");
								routeContent3DTitles.append(", ");
					}
							routeContent3D.append((String) routeContent.get(DomainConstants.SELECT_NAME));
							routeContent3DTypes.append((String) routeContent.get(DomainConstants.SELECT_TYPE));
							routeContent3DIds.append((String) routeContent.get(DomainConstants.SELECT_ID));
							routeContent3DTitles.append((String) routeContent.get(DomainConstants.SELECT_ATTRIBUTE_TITLE));
                    sRouteContent.append(emxNotificationUtil_mxJPO.getObjectLinkHTML(context, (String) routeContent.get(DomainConstants.SELECT_NAME), (String) routeContent.get(DomainConstants.SELECT_ID)));
                 	sRouteContentDescription.append(FrameworkUtil.stripString((String) routeContent.get(DomainConstants.SELECT_DESCRIPTION), InboxTask.MAX_LEN_OF_CNT_DESC_FOR_ROUTE_NOTIFICATIONS, FrameworkUtil.StripStringType.WORD_STRIP));
                 }
				 // Form Route Content and description - end

                 while ( attributeItr.next() ) {
                   AttributeList attributeList = new AttributeList();
                   Attribute attribute = attributeItr.obj();

                   if( attribute.getName().equals(DomainConstants.ATTRIBUTE_ROUTE_STATUS) ) {
                     Map attrMap = new Hashtable();
                     attrMap.put(DomainConstants.ATTRIBUTE_ROUTE_STATUS, "Stopped");
                     routeObj.modifyRouteAttributes(context, attrMap);
                     /*send notification to the owner*/
                     Map payload = new HashMap();
                     String sInboxTaskLink = emxNotificationUtil_mxJPO.getObjectLinkHTML(context, taskInfoMap.get(DomainConstants.SELECT_NAME), taskId);
                     String sRouteLink = emxNotificationUtil_mxJPO.getObjectLinkHTML(context, routeName, sRouteId);
                     
                     if(routeContentList.size() > 0) {
                         payload.put("tableHeader", "emxFramework.ProgramObject.eServicecommonCompleteTask.TableWithContentHeader");
                         payload.put("tableRow", "emxFramework.ProgramObject.eServicecommonCompleteTask.TableWithContentData");
                         String[] tableKeys = {"TaskType", "RouteName", "TaskName", "TaskOwner", "CompletionDate", "Comments", "Content", "ContentDescription"};
                         String[] tableValues = {taskInfoMap.get(selRouteActionOfTask), sRouteLink, sInboxTaskLink, taskInfoMap.get(DomainConstants.SELECT_OWNER), taskInfoMap.get(selTskActCompDate), taskInfoMap.get(selTaskComments), sRouteContent.toString(), sRouteContentDescription.toString()};
                         payload.put("tableRowKeys", tableKeys);
                         payload.put("tableRowValues", tableValues);
                     } else {
                  	   payload.put("tableHeader", "emxFramework.ProgramObject.eServicecommonCompleteTask.TableHeader");
                         payload.put("tableRow", "emxFramework.ProgramObject.eServicecommonCompleteTask.TableData");
                         String[] tableKeys = {"TaskType", "RouteName", "TaskName", "TaskOwner", "CompletionDate", "Comments"};
                         String[] tableValues = {taskInfoMap.get(selRouteActionOfTask), sRouteLink, sInboxTaskLink, taskInfoMap.get(DomainConstants.SELECT_OWNER), taskInfoMap.get(selTskActCompDate), taskInfoMap.get(selTaskComments)};
                         payload.put("tableRowKeys", tableKeys);
                         payload.put("tableRowValues", tableValues);
                     }

                     payload.put("subject", "emxFramework.ProgramObject.eServicecommonCompleteTask.SubjectReject");
                     payload.put("message", "emxFramework.ProgramObject.eServicecommonCompleteTask.MessageReject");
                     String[] messageKeys = {"name", "IBType", "IBName", "IBRev", "RType", "RName", "RRev", "TComments"};
					 String[] messageValues = {(context.getUser()).toString(), typeInboxTask, taskInfoMap.get(DomainConstants.SELECT_NAME), taskInfoMap.get(DomainConstants.SELECT_REVISION), Route.TYPE_ROUTE, routeName, routeRev, taskInfoMap.get(selTaskComments)};
                     payload.put("messageKeys", messageKeys);
                     payload.put("messageValues", messageValues);
					 payload.put("click", "emxFramework.ProgramObject.eServicecommonInitiateRoute.ClickMyTasks");
                     String sBaseURL = emxMailUtil_mxJPO.getBaseURL(context, null);
                     String[] clickKeys = {"url"};
                     String[] clickValues = {sBaseURL};
                     payload.put("clickKeys", clickKeys);
                     payload.put("clickValues", clickValues);
									if("true".equalsIgnoreCase(mailEnabled)) {
										emxNotificationUtil_mxJPO.objectNotification(context, taskId, "APPObjectRouteTaskRejectedEvent", payload,"both");
									}else {
										emxNotificationUtil_mxJPO.objectNotification(context, taskId, "APPObjectRouteTaskRejectedEvent", payload,"iconmail");
									}
								HashMap hmParam		= new HashMap();
								hmParam.put("id", taskInfoMap.get(DomainConstants.SELECT_ID));
								String[] args1 = (String[])JPO.packArgs(hmParam);
								StringList tolist =  (StringList) JPO.invoke(context, "emxInboxTaskNotificationBase", null, "getRejectionMailList", args1, StringList.class);
								tolist.add(routeOwner);
						        String taskTitle = (String) taskInfoMap.get("attribute["+ATTRIBUTE_TITLE+"]");
						        if(UIUtil.isNullOrEmpty(taskTitle))
						        {
						        	taskTitle = (String) taskInfoMap.get(DomainConstants.SELECT_NAME);
						        }
						        Map<String, String> taskAndRouteInfo = new HashMap<>();
						        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_ID, sRoutePhysicalId);
						        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_NAME, (String)routeInfo.get(Route.SELECT_ATTRIBUTE_TITLE));
						        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_OWNER, routeOwner);
						        taskAndRouteInfo.put(RouteTaskNotification.TASK_ID, (String)taskInfoMap.get(DomainConstants.SELECT_PHYSICAL_ID));
						        taskAndRouteInfo.put(RouteTaskNotification.TASK_NAME, taskTitle);
						        taskAndRouteInfo.put(RouteTaskNotification.TASK_ACTION, (String)taskInfoMap.get(selRouteActionOfTask));
						        taskAndRouteInfo.put(RouteTaskNotification.REJECT_COMMENTS, (String) taskInfoMap.get(selTaskComments));
						        taskAndRouteInfo.put(RouteTaskNotification.TASK_ASSIGNEE, (String)taskInfoMap.get(DomainConstants.SELECT_OWNER));
						        taskAndRouteInfo.put(RouteTaskNotification.SENDER_USER, context.getUser());
						        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_CONTENT_IDS, routeContent3DIds.toString());
						        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_CONTENT_TITLES, routeContent3DTitles.toString());
						        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_CONTENT_TYPES, routeContent3DTypes.toString());
						        taskAndRouteInfo.put(RouteTaskNotification.ROUTE_CONTENTS, routeContent3D.toString());
						        taskAndRouteInfo.put(RouteTaskNotification.TASK_ATTACHMENTS, InboxTask.getTaskAttachment(context, (String)taskInfoMap.get(DomainConstants.SELECT_PHYSICAL_ID)));
						        RouteTaskNotification notifyObj = RouteTaskNotification.getInstance(context, routeContent3DTypes.toString());
						        notifyObj.sendTaskRejection3DNotification(context, taskAndRouteInfo,tolist);
                     break;
                   }
                 }
                 boRoute.close(context);
                 }
               }
               attrGeneric.setValue(sTrimVal);
               attrListGeneric.addElement(attrGeneric);
             }
           }

           if(!UIUtil.isNullOrEmpty(reviewerComments)) {
               attrListGeneric.addElement(new Attribute(new AttributeType(sAttrReviewersComments), reviewerComments));
           }

           //Update the attributes on the Business Object
           // Do not use !UIUtil.isNullOrEmpty(taskScheduledDate) in the if condition here bcz sometimes we need to set empty value to due date.
		   if(!"Approve".equalsIgnoreCase(approvalStatus)) {
           if (taskScheduledDate != null)
               inboxTaskObj.setAttributeValue(context,inboxTaskObj.ATTRIBUTE_SCHEDULED_COMPLETION_DATE, taskScheduledDate);
           inboxTaskObj.setAttributes(context, attrListGeneric);
           inboxTaskObj.update(context);
		   }	   
           String RelationshipId = FrameworkUtil.getAttribute(context,inboxTaskObj,DomainConstants.ATTRIBUTE_ROUTE_NODE_ID);

           route.setId(sRouteId);
           //Get the correct relId for the RouteNodeRel given the attr routeNodeId from the InboxTask.
           RelationshipId = route.getRouteNodeRelId(context, RelationshipId);

           // Updating the relationship Attributes
           Map attrMap = new Hashtable();

           Relationship relRouteNode = new Relationship(RelationshipId);
           relRouteNode.open(context);
           AttributeItr attrRelItrGeneric   = new AttributeItr(relRouteNode.getAttributes(context));
           while (attrRelItrGeneric.next()) {
               sTrimVal = null;
               Attribute attrGeneric = attrRelItrGeneric.obj();
               sAttrValue = attrGeneric.getName();
               if(sAttrValue.equals(DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE)) {
                   sTrimVal = taskScheduledDate;
               } else if(sAttrValue.equals(DomainConstants.ATTRIBUTE_COMMENTS)) {
                   sTrimVal = taskComments;
               } else if(sAttrValue.equals(sAttrReviewersComments) && !UIUtil.isNullOrEmpty(sAttrReviewersComments)) {
                   sTrimVal = reviewerComments;
               }
             if(sTrimVal != null) {
               attrMap.put(sAttrValue, sTrimVal);
             }
           }

           Route.modifyRouteNodeAttributes(context, RelationshipId, attrMap);
           relRouteNode.close(context);
           inboxTaskObj.close( context );




       return resultsMap;
   }

   public boolean showAssigneeDueDate(Context context, String[] args) throws Exception
   {
       HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
       return ((Boolean)detailsMap.get("showAssigneeDueDate")).booleanValue();
   }

   public boolean showChangeAssigneeCommand(Context context, String[] args) throws Exception
   {
       HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
       return ((Boolean)detailsMap.get("showAssigneeField")).booleanValue();
   }



   public boolean showReviewComments(Context context, String[] args) throws Exception
   {
       HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
       return ((Boolean)detailsMap.get("showReviewComments")).booleanValue();
   }


   public boolean canEditReviewerComments(Context context, String[] args) throws Exception
   {
		String isReviewCommentRequired = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.EnforceOwnerReviewComments");
        HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
 		String routeAction = (String)detailsMap.get("routeAction");
		boolean canEditReviewComments = ((Boolean)detailsMap.get("canEditReviewerComments")).booleanValue();
		if(canEditReviewComments){
			if("Comment".equals(routeAction)){
		    	return true;
		    }else if("Approve".equals(routeAction) && "true".equalsIgnoreCase(isReviewCommentRequired)){
				return true;
			}else{
				return false;
			}			 
		}else{
			return false;
		}   
   }

   public boolean showTaskComments(Context context, String[] args) throws Exception
   {
 		String isCommentRequired = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.EnforceAssigneeApprovalComments");
       HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
       	boolean showTaskComments = ((Boolean)detailsMap.get("showTaskComments")).booleanValue();
		String routeAction = (String)detailsMap.get("routeAction");
		String showCommentsForTaskApproval = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.ShowCommentsForTaskApproval");
		
	   	if(showTaskComments){
	   		if("Comment".equals(routeAction) && "true".equalsIgnoreCase(isCommentRequired)){
				return true;
			}else if("Approve".equals(routeAction) && "true".equalsIgnoreCase(isCommentRequired) && "true".equalsIgnoreCase(showCommentsForTaskApproval)){
				return true;
			}else{
				return false;
			}
		}else{
			return showTaskComments;
		}   
   }

   public boolean isAssigneeDueDatePast(Date date, String time) throws Exception {

       boolean isPastDate= false;
       if(date != null && !"".equals(date) && time != null && !"".equals(time))
       {
       String hour=time.substring(0,time.indexOf(":"));
       String minute=time.substring((time.lastIndexOf(":"))-2,time.lastIndexOf(":"));
       String ampm=time.substring(time.indexOf(" ")+1,time.indexOf(" ")+3);

       if(ampm.equals("AM")){
           if(Integer.parseInt(hour) == 12){
               hour="0";
           }
       } else if(ampm.equals("PM")){
           // Here we are converting the 12 hour format time into 24 hour format
    	   // If the hour is from 1 to 11 PM, We are adding 12
    	   if(Integer.parseInt(hour) < 12){
        	   int hr = Integer.parseInt(hour)+12;
        	   hour = Integer.toString(hr);
       }
       }
       date.setHours(Integer.parseInt(hour));
       date.setMinutes(Integer.parseInt(minute));

       Date today = new Date();
       isPastDate = (date.equals(today) || date.after(today)) ? false : true;
       }
       return isPastDate;

   }

   public Vector getTaskRouteContentActions(Context context, String[] args) throws Exception
   {
       HashMap programMap = (HashMap)JPO.unpackArgs(args);
       HashMap paramMap = (HashMap)programMap.get("paramList");
       String objectId = (String)paramMap.get("objectId");
       String languageStr = (String)paramMap.get("languageStr");
       DomainObject inboxTaskObj = DomainObject.newInstance(context,objectId);
       String customSortDirections = (String)paramMap.get("customSortDirections");
       String uiType = (String)paramMap.get("uiType");
       String customSortColumns = (String)paramMap.get("customSortColumns");
       String table = (String)paramMap.get("table");
       String routeId = inboxTaskObj.getInfo(context, "from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.id");
       Vector contentActions = new Vector();
       MapList objectList = (MapList)programMap.get("objectList");
	   if(UIUtil.isNullOrEmpty(routeId)){
    	    for (int i = 0; i < objectList.size(); i++)
    	    {
    	    	contentActions.add(DomainObject.EMPTY_STRING);
    	    }
    	    return contentActions;
       }
       Route routeObject = (Route)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE);
       String nextURL     = "";
       String target      = "";

       // Set the domain object id with rout id
       routeObject.setId(routeId);

       String sPolicy = "";
       String sStates = "";
       String sRotableIds ="";
       String stateValue = "";
       String sNoneValue=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.AttachmentsDialog.none");
       String sDownloadTip = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.FileDownload.Download");
       String sViewerTip   = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Common.Viewer");


       Iterator contentItr = objectList.iterator();
       while(contentItr.hasNext())
       {
           StringList fileNames = new StringList();
           String fileName = "";
           StringBuffer strBuf = new StringBuffer();
           Map fileMap = (Map)contentItr.next();
           try{
               fileNames = (StringList) fileMap.get(routeObject.SELECT_FILE_NAME);
           } catch ( ClassCastException excep){
               fileName  = (String)fileMap.get(routeObject.SELECT_FILE_NAME);
               if(fileName != null && !"".equals(fileName) && !"null".equals(fileName)){
                   fileNames.addElement(fileName);
               }
           }

           boolean isActions = (fileNames != null) ? true : false;

           StringBuffer viewerURL    = new StringBuffer(256);
           String contentType = (String)fileMap.get(routeObject.SELECT_TYPE);
           String contentParentType = Document.getParentType(context,contentType);
		   String regstrdViewerURL = null;

           if(isActions && Document.TYPE_DOCUMENTS.equals(contentParentType)) {
//[IR-298882]:START
				if(fileNames.size() == 1){
					String tmpFormat = (String)fileMap.get(routeObject.SELECT_FILE_FORMAT);
					String tmpObjectID = (String)fileMap.get(routeObject.SELECT_ID);
					String tmpFileName = (String)fileMap.get(routeObject.SELECT_FILE_NAME);
					regstrdViewerURL = emxCommonFileUI_mxJPO.getViewerURL(context,tmpObjectID,tmpFormat,tmpFileName,"null",false);
				}
				//if registered viewer is not available for given format.
				if(UIUtil.isNullOrEmpty(regstrdViewerURL))
				{
					sViewerTip   = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Common.Viewer");
					viewerURL  = new StringBuffer("../components/emxCommonDocumentPreCheckout.jsp?objectId=");
					viewerURL.append(fileMap.get(routeObject.SELECT_ID));
					viewerURL.append("&action=view");
			    }
//[IR-298882]:END
           }

           sPolicy = (String) fileMap.get(routeObject.SELECT_ROUTE_BASEPOLICY);
           sPolicy=(String) PropertyUtil.getSchemaProperty(context,sPolicy);
           sStates = (String) fileMap.get(routeObject.SELECT_ROUTE_BASESTATE);

           if(!(sStates.indexOf('[') <0 ) ) {
               sStates = sStates.substring(sStates.indexOf('[')+1,sStates.indexOf(']'));
           }

           if(sRotableIds.equals("")) {
               sRotableIds = (String)fileMap.get(routeObject.SELECT_RELATIONSHIP_ID);
           } else {
               sRotableIds += "|" + (String)fileMap.get(routeObject.SELECT_RELATIONSHIP_ID);
           }
           stateValue = (String)fileMap.get(routeObject.SELECT_ROUTE_BASESTATE);
           if (!"Ad Hoc".equals(stateValue)){
               stateValue = FrameworkUtil.lookupStateName(context,sPolicy,stateValue);
           } else {
               stateValue = sNoneValue;
           }

           if(isActions && Document.TYPE_DOCUMENTS.equals(contentParentType))
           {
        	   if(!UINavigatorUtil.isMobile(context)) {
              strBuf.append("<a href='javascript:callCheckout(\"");
              strBuf.append(fileMap.get(routeObject.SELECT_ID));
              strBuf.append("\",\"download\", \"\", \"\",\"");
              strBuf.append(customSortColumns);
              strBuf.append("\", \"");
              strBuf.append(customSortDirections);
              strBuf.append("\", \"");
              strBuf.append(uiType);
              strBuf.append("\", \"");
              strBuf.append(table);
              strBuf.append("\"");
              strBuf.append(")'>");
              strBuf.append("<img border='0' src='../common/images/iconActionDownload.gif' alt='");
              strBuf.append(XSSUtil.encodeForHTMLAttribute(context,sDownloadTip));
              strBuf.append("' title='");
              strBuf.append(XSSUtil.encodeForHTMLAttribute(context,sDownloadTip));
              strBuf.append("'></a>&#160;");
        	   }
              if(fileNames.size() == 1){
//[IR-298882]:START
				if(UIUtil.isNullOrEmpty(regstrdViewerURL))
				{
					 strBuf.append("<a href='javascript:showModalDialog(\"");
					 strBuf.append(viewerURL.toString());
					 strBuf.append("\",575,575)'>");
					 strBuf.append("<img border='0' src='../common/images/iconActionView.gif' alt='");
                 strBuf.append(XSSUtil.encodeForHTMLAttribute(context,sViewerTip));
					 strBuf.append("' title='");
                 strBuf.append(XSSUtil.encodeForHTMLAttribute(context,sViewerTip));
					 strBuf.append("'></a>&#160;");
				}
				else
				{
					strBuf.append(regstrdViewerURL);
				}
//[IR-298882]:END
              }
           }
           contentActions.add(strBuf.toString());
       }
       return contentActions;
   }

   /**
    * getAllRouteTasks - gets the list of all Tasks
    * @param context the eMatrix <code>Context</code> object
    * @param args holds the following input arguments:
    *        0 - objectList MapList
    * @returns Object
    * @throws Exception if the operation fails
    * @since R211
    *
    *     */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public MapList getAllRouteTasks(Context context, String[] args) throws Exception
   {

       return getRouteTasks(context,args, "All");

   }

   /**
    * getActiveRouteTasks - gets the list of Tasks in Active state
    * @param context the eMatrix <code>Context</code> object
    * @param args holds the following input arguments:
    *        0 - objectList MapList
    * @returns Object
    * @throws Exception if the operation fails
    * @since R211
    *
    *     */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public MapList getActiveRouteTasks(Context context, String[] args) throws Exception
   {

       return getRouteTasks(context,args, "Active");

   }

   /**
    * getReviewRouteTasks - gets the list of Tasks in Review state
    * @param context the eMatrix <code>Context</code> object
    * @param args holds the following input arguments:
    *        0 - objectList MapList
    * @returns Object
    * @throws Exception if the operation fails
    * @since R211
    *
    *     */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public MapList getReviewRouteTasks(Context context, String[] args) throws Exception
   {

       return getRouteTasks(context,args, "Needs Review");

   }

   /**
    * getRouteTasks - gets the list of Tasks in the Route
    * @param context the eMatrix <code>Context</code> object
    * @param args args holds the following input arguments:
    *        0 - objectList MapList
    * @param filter which holds filter value
    * @returns MapList
    * @throws Exception if the operation fails
    * @since R211
    * @grade 0
    */
   protected MapList getRouteTasks(Context context, String[] args, String filter) throws FrameworkException {
       try
       {
           HashMap programMap = (HashMap)JPO.unpackArgs(args);
           String routeId = (String)programMap.get("objectId");
           String languageStr = (String)programMap.get("languageStr");
           boolean isFilterAll = "All".equals(filter);
           boolean isFilterActive = "Active".equals(filter);
           boolean isFilterNeedsReview = "Needs Review".equals(filter);
           String proxyGoupType = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
           DomainObject domainObject = DomainObject.newInstance(context , routeId);

           StringList objectSelects= new StringList();
           objectSelects.add("attribute["+DomainObject.ATTRIBUTE_TASKEDIT_SETTING+"].value");
   		   objectSelects.add(DomainConstants.SELECT_CURRENT);
   		   objectSelects.add("from[" + DomainObject.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE + "].to.attribute["+DomainObject.ATTRIBUTE_TASKEDIT_SETTING+"].value");
           Map objInfo = domainObject.getInfo(context, objectSelects);
           String routeState = (String)objInfo.get(DomainConstants.SELECT_CURRENT);
           String attr = (String)objInfo.get("from[" + DomainObject.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE + "].to.attribute["+DomainObject.ATTRIBUTE_TASKEDIT_SETTING+"].value");

           String strTaskEditSetting="";
           String strRouteTaskEditSetting="";
           if (UIUtil.isNotNullAndNotEmpty(attr)){
                 strTaskEditSetting  = attr;
           }else {
        	   strRouteTaskEditSetting  = (String)objInfo.get("attribute["+DomainObject.ATTRIBUTE_TASKEDIT_SETTING+"].value");
           }

           StringList objSelectables = new StringList(20);
           String taskAssigneeName  = "TaskAssingee";
           String selAsigneeName           = "from["+DomainObject.RELATIONSHIP_PROJECT_TASK+"].to.name";
           String selAsigneeType           = "from["+DomainObject.RELATIONSHIP_PROJECT_TASK+"].to.type.kindof["+ proxyGoupType +"]";
           String selUserGroupTitle   		= "from["+DomainObject.RELATIONSHIP_PROJECT_TASK+"].to."+DomainObject.SELECT_ATTRIBUTE_TITLE;
           String relAsigneeName           = "to.name";
           String relAsigneeType           = "to.type";
           String relUserGroupTitle           = "to."+DomainObject.SELECT_ATTRIBUTE_TITLE;
           String isRelAsigneeProxyGroup   = "to.type.kindof["+ proxyGoupType +"]";
           String selTaskTitle           = getAttributeSelect(DomainObject.ATTRIBUTE_TITLE);
           String selTaskAction          = getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_ACTION);
           String selRouteNodeId         = getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_NODE_ID);
           String selTaskDueDate         = getAttributeSelect(DomainObject.ATTRIBUTE_SCHEDULED_COMPLETION_DATE);
           String selTaskCompletedDate   = getAttributeSelect(DomainObject.ATTRIBUTE_ACTUAL_COMPLETION_DATE);
           String selTaskComment         = getAttributeSelect(DomainObject.ATTRIBUTE_COMMENTS);
           String selTaskAllowDelegation = getAttributeSelect(DomainObject.ATTRIBUTE_ALLOW_DELEGATION);
           String selAssigneeDueDateOpt  = getAttributeSelect(DomainObject.ATTRIBUTE_ASSIGNEE_SET_DUEDATE);
           String selDueDateOffset       = getAttributeSelect(DomainObject.ATTRIBUTE_DUEDATE_OFFSET);
           String selDueDateOffsetFrom   = getAttributeSelect(DomainObject.ATTRIBUTE_DATE_OFFSET_FROM);
           String selReviewTask          = getAttributeSelect(DomainObject.ATTRIBUTE_REVIEW_TASK);
           String selTemplateTask        = getAttributeSelect(DomainObject.ATTRIBUTE_TEMPLATE_TASK);
           String selRouteTaskUser       = getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_TASK_USER);
           String selTaskApprovalStatus  = getAttributeSelect(DomainObject.ATTRIBUTE_APPROVAL_STATUS);
           String selRouteSequence       = getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_SEQUENCE);
           String selRouteInstructions   = getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS);
           String selParallelNodeProcessionRule = "attribute["+PropertyUtil.getSchemaProperty(context, "attribute_ParallelNodeProcessionRule")+"]";
		   String selAttChooseUsersFromUG  =  getAttributeSelect(PropertyUtil.getSchemaProperty(context,"attribute_ChooseUsersFromUserGroup"));
		   String selAttrRouteOwnerTask  =  getAttributeSelect(PropertyUtil.getSchemaProperty(context,"attribute_RouteOwnerTask"));
		   String selAttrRouteOwnerUGChoice  =  getAttributeSelect(PropertyUtil.getSchemaProperty(context,"attribute_RouteOwnerUGChoice"));
		   String selAttrInitialTask  =  getAttributeSelect(PropertyUtil.getSchemaProperty(context,"attribute_InitialTask"));

           MapList taskList = null;
           if(!STATE_ROUTE_DEFINE.equals(routeState)) {
               objSelectables.add(SELECT_ID);
	           //initate Route - start
			   objSelectables.add("physicalid");
	           objSelectables.add(selRouteInstructions);
               //initate Route - end
               objSelectables.add(SELECT_TYPE);
               objSelectables.add(SELECT_NAME);
               objSelectables.add(SELECT_REVISION);
               objSelectables.add(SELECT_OWNER);
               objSelectables.add(SELECT_CURRENT);
               objSelectables.add(selAsigneeName);
               objSelectables.add(selAsigneeType);
               objSelectables.add(selTaskTitle);
               objSelectables.add(selTaskAction);
               objSelectables.add(selTaskApprovalStatus);
               objSelectables.add(selRouteNodeId);
               objSelectables.add(selTaskDueDate);
               objSelectables.add(selTaskCompletedDate);
               objSelectables.add(selTaskComment);
               objSelectables.add(selTaskAllowDelegation);
               objSelectables.add(selAssigneeDueDateOpt);
               objSelectables.add(selDueDateOffset);
               objSelectables.add(selDueDateOffsetFrom);
               objSelectables.add(selReviewTask);
               objSelectables.add(selTemplateTask);
               objSelectables.add(selRouteTaskUser);
               objSelectables.add(selUserGroupTitle);
               objSelectables.add(selAttrInitialTask);

               taskList = domainObject.getRelatedObjects (context,
                       DomainObject.RELATIONSHIP_ROUTE_TASK, //relationshipPattern
                       DomainObject.TYPE_INBOX_TASK, //typePattern
                       objSelectables, null,
                       true, false,
                       (short)1,
                       null, null,
                       0,
                       null, null, null);
           } else {
               taskList = new MapList(0);
           }


           StringList relSelectables = new StringList(20);
           relSelectables.add(selTaskTitle);
           relSelectables.add(SELECT_NAME);
           relSelectables.add(selTaskAction);
           relSelectables.add(SELECT_TYPE);
           relSelectables.add(selTaskApprovalStatus);
           relSelectables.add(selRouteNodeId);
           relSelectables.add(selRouteSequence);
           relSelectables.add(selTaskDueDate);
           relSelectables.add(selTaskCompletedDate);
           relSelectables.add(selTaskComment);
           relSelectables.add(selTaskAllowDelegation);
           relSelectables.add(selAssigneeDueDateOpt);
           relSelectables.add(selDueDateOffset);
           relSelectables.add(selDueDateOffsetFrom);
           relSelectables.add(relAsigneeName);
           relSelectables.add(relAsigneeType);
           relSelectables.add(selReviewTask);
           relSelectables.add(selTemplateTask);
           relSelectables.add(selRouteTaskUser);
           relSelectables.add(selRouteInstructions);
           relSelectables.add(isRelAsigneeProxyGroup);
           relSelectables.add(relUserGroupTitle);
           relSelectables.add(selAttrInitialTask);
           
           //Added for Bug No : 309522 Begin
           relSelectables.add(selParallelNodeProcessionRule);
           //Added for Bug No : 309522 End
           relSelectables.add(selAttChooseUsersFromUG);
           
           //Added to show the route owner task options in the route template task table
           relSelectables.add(selAttrRouteOwnerTask);
           relSelectables.add(selAttrRouteOwnerUGChoice);
           
           Pattern typePattern = new Pattern(DomainObject.TYPE_PERSON);
           typePattern.addPattern(DomainObject.TYPE_ROUTE_TASK_USER);
           typePattern.addPattern(proxyGoupType);

           //get all route-node rels connected to the route
           MapList routeNodeList =  domainObject.getRelatedObjects(context,
                                                       DomainObject.RELATIONSHIP_ROUTE_NODE, //relationshipPattern
                                                       typePattern.getPattern(), //typePattern
                                                       null, relSelectables,
                                                       false, true,
                                                       (short)1,
                                                       null, null,
                                                       0,
                                                       null, null, null);

           MapList mlTasksAssigned = new MapList();
           MapList mlTasksInReview = new MapList();
           MapList mlTasksCompleted = new MapList();
           MapList mlInactiveConnectedTasks = new MapList();
           MapList mlInactiveDisconnectedTasks = new MapList();
           MapList mlUninstantiatedTasks = new MapList();
           StringList instantiatedTasksNodeIds = new StringList();

           // Update the sequence and parallel node processing rule from route node relationships to the route tasks
           // because this information is not available on task objects
           updateInfoFromRouteNodes(context, taskList, routeNodeList);

           // Iterate over the tasks connected to route and seggregate the different tasks
           for (Iterator itrTasksList = taskList.iterator(); itrTasksList.hasNext();) {
               Map mapInfo = (Map)itrTasksList.next();
               String strTaskId = (String)mapInfo.get(SELECT_ID);
               String current = (String)mapInfo.get(SELECT_CURRENT);
               String assignee = (String) mapInfo.get(selAsigneeName);
               if(!UIUtil.isNullOrEmpty(assignee)){
            	   	if("true".equalsIgnoreCase((String) mapInfo.get(selAsigneeType))){
            	   	 mapInfo.put(taskAssigneeName, (String) mapInfo.get(selUserGroupTitle));
            	   	}else {
               mapInfo.put(taskAssigneeName, assignee);
               }
            		   mapInfo.put("isProxyObject", (String) mapInfo.get(selAsigneeType));
               }

               String stateAssigned = DomainConstants.STATE_INBOX_TASK_ASSIGNED;
               String stateReview = DomainConstants.STATE_INBOX_TASK_REVIEW;
               String stateTaskComplete = DomainConstants.STATE_INBOX_TASK_COMPLETE;
               String tempTask = (String)mapInfo.get(getAttributeSelect(DomainObject.ATTRIBUTE_TEMPLATE_TASK));
               String isInitialTask = (String)mapInfo.get(selAttrInitialTask);
               if(current==null) current = "";

               if((current.equals("") && tempTask.equals("Yes") && !"Modify/Delete Task List".equalsIgnoreCase(strTaskEditSetting)) || (current.equals("") && "Yes".equals(isInitialTask) && !"Modify/Delete Task List".equalsIgnoreCase(strRouteTaskEditSetting))
                       || current.equals(stateTaskComplete) || current.equals(stateAssigned) || current.equals(stateReview) ){
            	   mapInfo.put("disableSelection", "true");
               }
               else {
            	   mapInfo.put("disableSelection", "false");
               }

               // If the assignee found is null, means the task is not connected to the person object, its inactive task
               // Otherwise Depending on the state of the task, separate them as if they are active tasks which needs review
               if (assignee == null || assignee.equals("")) {
                   mlInactiveConnectedTasks.add(mapInfo);
               } else if (TYPE_INBOX_TASK_STATE_REVIEW.equals(current)) {
                   instantiatedTasksNodeIds.add((String)mapInfo.get(selRouteNodeId));
                   mlTasksInReview.add(mapInfo);
               } else if (TYPE_INBOX_TASK_STATE_ASSIGNED.equals(current)) {
                   instantiatedTasksNodeIds.add((String)mapInfo.get(selRouteNodeId));
                   mlTasksAssigned.add(mapInfo);
               } else {
                   instantiatedTasksNodeIds.add((String)mapInfo.get(selRouteNodeId));
                   mlTasksCompleted.add(mapInfo);
               }
               // For this task find the revisions and add the revisions to the separate list.
               // Take care that the current task should be eliminated from the found task revisions
               // This way the list will contains the tasks which are not connected but are previous revisions

               // Update following values in the new Map list
               // level - > Add level value as 1 to this list else sorting will give problem!
               // inactiveDisconnected - > Used while forming assignee name
               // selRouteNodeId - > Update the route node id from the latest task,
               //                   This rel id has changed because of the Resume Process revised the tasks
               //If there is only one rev (that is the current task then noting to update just continue with other task.


               DomainObject dmoTask = new DomainObject(strTaskId);
               MapList mlTaskRevisions = dmoTask.getRevisionsInfo(context, objSelectables, new StringList());
               if(mlTaskRevisions.size() == 1)
                      continue;
               for (Iterator itrTaskRevisions = mlTaskRevisions.iterator(); itrTaskRevisions.hasNext();) {
                   Map mapRevisionInfo = (Map)itrTaskRevisions.next();
                   String strRevisionTaskId = (String)mapRevisionInfo.get(SELECT_ID);
                   if (strTaskId != null && !strTaskId.equals(strRevisionTaskId)) {
                	   current = (String)mapRevisionInfo.get(SELECT_CURRENT);
                	   tempTask = (String)mapRevisionInfo.get(getAttributeSelect(DomainObject.ATTRIBUTE_TEMPLATE_TASK));
                	   if((UIUtil.isNotNullAndNotEmpty(current) && tempTask.equals("Yes") && !"Modify/Delete Task List".equalsIgnoreCase(strTaskEditSetting)) || (current.equals("") && "Yes".equals(isInitialTask) && !"Modify/Delete Task List".equalsIgnoreCase(strRouteTaskEditSetting))
                               || current.equals(stateTaskComplete) || current.equals(stateAssigned) || current.equals(stateReview) ){
                		   mapRevisionInfo.put("disableSelection", "true");
                       }
                       else {
                    	   mapRevisionInfo.put("disableSelection", "false");
                       }
                       mapRevisionInfo.put("level", "1");
                       mapRevisionInfo.put("inactiveDisconnected", "true");
                       mapRevisionInfo.put(selRouteNodeId, mapInfo.get(selRouteNodeId));
                       mlInactiveDisconnectedTasks.add(mapRevisionInfo);
                   }
               }
           }

           // Update the sequence and parallel node processing rule from route node relationships to the disconnected tasks revisions
           // because this information is not available on task objects
           updateInfoFromRouteNodes(context, mlInactiveDisconnectedTasks, routeNodeList);

           // Once we have categorized the tasks objects, now find out the uninstantiated task objects
           for (Iterator itrRouteNodeList = routeNodeList.iterator(); itrRouteNodeList.hasNext();) {
               Map mapRelInfo = (Map)itrRouteNodeList.next();
               String strRelRouteNodeID = (String)mapRelInfo.get(selRouteNodeId);

               //Ensure that No task is created for this Route Node
               boolean isTaskInstantiated = instantiatedTasksNodeIds.contains(strRelRouteNodeID);

               // Modify Task List - Start
               String tempRouteNode = (String)mapRelInfo.get(getAttributeSelect(DomainObject.ATTRIBUTE_TEMPLATE_TASK));
               String isInitialTask = (String)mapRelInfo.get(selAttrInitialTask);
               if( (tempRouteNode.equals("Yes") && !"Modify/Delete Task List".equalsIgnoreCase(strTaskEditSetting)) || ( "Yes".equals(isInitialTask) && !"Modify/Delete Task List".equalsIgnoreCase(strRouteTaskEditSetting))){
            	   mapRelInfo.put("disableSelection", "true");
               }else {
            	   mapRelInfo.put("disableSelection", "false");
               }
               //Modify Task List - end
               
               if (!isTaskInstantiated) {
            	   if("true".equalsIgnoreCase((String)mapRelInfo.get(isRelAsigneeProxyGroup))){
            		   mapRelInfo.put(taskAssigneeName, mapRelInfo.get(relUserGroupTitle));
            	   }else {
                   mapRelInfo.put(taskAssigneeName, mapRelInfo.get(relAsigneeName));
            	   }
                   mapRelInfo.put("isProxyObject", mapRelInfo.get(isRelAsigneeProxyGroup));
                   mapRelInfo.put(SELECT_ID, strRelRouteNodeID);
                   mlUninstantiatedTasks.add(mapRelInfo);
               }
            }

           MapList taskDisplayList = new MapList();
           // Form the final list of tasks to be shown
           if (isFilterAll) {
               taskDisplayList.addAll(mlTasksAssigned);
               taskDisplayList.addAll(mlTasksInReview);
               taskDisplayList.addAll(mlTasksCompleted);
               taskDisplayList.addAll(mlUninstantiatedTasks);
           } else if (isFilterActive) {
               taskDisplayList.addAll(mlTasksAssigned);
               taskDisplayList.addAll(mlTasksInReview);
           } else if (isFilterNeedsReview) {
               taskDisplayList.addAll(mlTasksInReview);
           }
           String strUserGroup = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.Type.Group");
           // Now process this final list of task display, for some parameters like owner name etc.
           for (Iterator itrDisplayTasks = taskDisplayList.iterator(); itrDisplayTasks.hasNext();) {
               Map mapInfo = (Map)itrDisplayTasks.next();

               // Adjustments for the owner name
               String assingee = (String)mapInfo.get(taskAssigneeName);
               
               String routeTaskUser = (String)mapInfo.get(selRouteTaskUser);
               String strTaskRevision = (String)mapInfo.get(SELECT_REVISION);
               String isProxyObject = (String)mapInfo.get("isProxyObject");
               if (strTaskRevision == null) {
                   mapInfo.put(SELECT_REVISION, "");
               }

               if(assingee != null && !"".equals(assingee)) {
            	   if("true".equalsIgnoreCase(isProxyObject)){
            		   mapInfo.put(SELECT_OWNER, assingee + "(" + strUserGroup +")");
            	   }else {
                    mapInfo.put(SELECT_OWNER, assingee);
            	   }
                    if (routeTaskUser != null && !"".equals(routeTaskUser)) {
                    	String isRoleGroup = "";
                    	if(routeTaskUser.indexOf("_") > -1){
                    		isRoleGroup = routeTaskUser.substring(0,routeTaskUser.indexOf("_"));
                    	}
                       if("role".equals(isRoleGroup)) {
                         mapInfo.put(SELECT_OWNER, i18nNow.getAdminI18NString("Role",PropertyUtil.getSchemaProperty(context, routeTaskUser),languageStr)+"("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Common.Role")+")");
                       } else if ("group".equals(isRoleGroup)) {
                        mapInfo.put(SELECT_OWNER, i18nNow.getAdminI18NString("Group", PropertyUtil.getSchemaProperty( context,routeTaskUser),languageStr)+"("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Common.Group")+")");
                       }else {
                    	   mapInfo.put(SELECT_OWNER, routeTaskUser);
                       }
                   }
               } else if ("true".equalsIgnoreCase((String)mapInfo.get("inactiveDisconnected"))) {
                   mapInfo.put(SELECT_OWNER, PersonUtil.getFullName(context, (String)mapInfo.get(SELECT_OWNER)));
               }
               if (mapInfo.get(SELECT_OWNER) == null) {
                   mapInfo.put(SELECT_OWNER, "");
               }
           }
           return taskDisplayList;
       } catch (Exception ex) {
           throw new FrameworkException(ex);
       }
   }

   /**
    * Updates certain information from route node list to task list. This information is not available on tasks.
    * Here sequence and parallel node processing rule is being updated.
    *
    * @param context The Matrix Context object
    * @param mlTasks The list of tasks
    * @param mlRouteNodes The list of route node relationships
    */
   private static void updateInfoFromRouteNodes(Context context, MapList mlTasks, MapList mlRouteNodes) {
       if (mlTasks == null || mlRouteNodes == null) {
           return;
       }
       Map mapTaskInfo = null;
       Map mapRouteNodeInfo = null;
       String strRouteNodeIDOnTask = null;
       String strRouteNodeIDOnRel = null;
       String strRouteSequence = null;
       String strParallelProcessingRule = null;


       final String SELECT_ROUTE_NODE_ID = "attribute["+DomainObject.ATTRIBUTE_ROUTE_NODE_ID+"]";
       final String SELECT_ROUTE_SEQUENCE = "attribute["+DomainObject.ATTRIBUTE_ROUTE_SEQUENCE+"]";
       final String SELECT_PARALLEL_NODE_PROCESSING_RULE = "attribute["+PropertyUtil.getSchemaProperty(context, "attribute_ParallelNodeProcessionRule")+"]";

       // Iterate on each task in list
       for (Iterator itrTasks = mlTasks.iterator(); itrTasks.hasNext();) {
           mapTaskInfo = (Map)itrTasks.next();

           strRouteNodeIDOnTask = (String)mapTaskInfo.get(SELECT_ROUTE_NODE_ID);

           // Iterate on each route node relationship and find if the matching rel exists
           for (Iterator itrRels = mlRouteNodes.iterator(); itrRels.hasNext();) {
               mapRouteNodeInfo = (Map)itrRels.next();

               strRouteNodeIDOnRel = (String)mapRouteNodeInfo.get(SELECT_ROUTE_NODE_ID);
               if (strRouteNodeIDOnTask != null && strRouteNodeIDOnTask.equals(strRouteNodeIDOnRel)) {

                   strRouteSequence = (String)mapRouteNodeInfo.get(SELECT_ROUTE_SEQUENCE);
                   strParallelProcessingRule = (String)mapRouteNodeInfo.get(SELECT_PARALLEL_NODE_PROCESSING_RULE);

                   mapTaskInfo.put(SELECT_ROUTE_SEQUENCE, strRouteSequence);
                   mapTaskInfo.put(SELECT_PARALLEL_NODE_PROCESSING_RULE, strParallelProcessingRule);
                   break;
               }
           }//for
       }//for
   }

   public Vector showRouteTaskName(Context context, String[] args) throws Exception
   {
       Vector taskNameVec = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");
       Map paramList      = (Map)programMap.get("paramList");
       String routeId = (String)paramList.get("objectId");
       String isTypeRouteTemplate="";

       if(routeId!=null)
       {
       DomainObject domainObject = new DomainObject(routeId);
       isTypeRouteTemplate = domainObject.getInfo(context, DomainConstants.SELECT_TYPE);
         }

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskState = (String)objectMap.get(DomainObject.SELECT_CURRENT);
           String taskId = (String)objectMap.get(DomainObject.SELECT_ID);
           String taskName = (String)objectMap.get(DomainObject.SELECT_NAME);

           if(isTypeRouteTemplate.equals(DomainConstants.TYPE_ROUTE_TEMPLATE))
           {
        	    taskName = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_TITLE));
           }


           String tempTask = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_TEMPLATE_TASK));
           String routeNodeId         = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_NODE_ID));
           String popTreeUrl = "";
           String popWindowTarget="";
           StringBuffer sb = new StringBuffer();
           sb.append(" <script src='../common/scripts/emxUIModal.js'> </script> ");
           boolean isPrinterFriendly = (paramList.get("reportFormat") != null) ? true : false;

           if(!DomainConstants.RELATIONSHIP_ROUTE_NODE.equals(taskName) && !(isTypeRouteTemplate.equals(DomainConstants.TYPE_ROUTE_TEMPLATE))) {
               popTreeUrl  = "../common/emxTree.jsp?mode=insert&amp;objectId="+taskId;
               popWindowTarget="content";
           }
           else {
               StringBuffer buffer = new StringBuffer(200);
               buffer.append("../common/emxForm.jsp?");
               buffer.append("objectId=").append(routeId.trim()).append("&amp;");
               buffer.append("relId=").append(routeNodeId).append("&amp;");
               buffer.append("form=").append("APPRouteNodeTask").append("&amp;");
               buffer.append("suiteKey=").append("Components").append("&amp;");
               buffer.append("formHeader=").append("emxComponents.Task.Properties").append("&amp;");
               buffer.append("HelpMarker=").append("emxhelptaskproperties").append("&amp;");
               buffer.append("toolbar=").append("APPRoleNodeTaskActionsToolBar");
               popTreeUrl  = "javascript:showModalDialog('" + buffer.toString() + "', 800,575)";
               popWindowTarget="";
           }

           if (taskName!=null && !taskName.equals("")){
        	   if(taskName.equals(DomainConstants.RELATIONSHIP_ROUTE_NODE)) {
        		   String languageStr = (String)paramList.get("languageStr");
        		   taskName = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(languageStr),"emxFramework.Relationship.Route_Node");
        	   }
        	   
               if(tempTask != null && tempTask.equals("Yes") && !isPrinterFriendly){

                   sb.append("<a href=\"").append(popTreeUrl).append("\" target=\"").
                   append(popWindowTarget).append("\"><img src=\"../common/images/iconSmallTask16.png\" name=\"imgTask\" border=\"0\"/>").
                   append(XSSUtil.encodeForXML(context,taskName)).append("(t) </a>");

               }else if(!isPrinterFriendly){

                   sb.append("<a href=\"").append(popTreeUrl).append("\" target=\"").
                   append(popWindowTarget).append("\"><img src=\"../common/images/iconSmallTask16.png\" name=\"imgTask\" border=\"0\"/>").
                   append(XSSUtil.encodeForXML(context,taskName)).append(" </a>");

               } else {
                   sb.append("<img src=\"../common/images/iconSmallTask16.png\" name=\"imgTask\" border=\"0\"/>").append(XSSUtil.encodeForXML(context,taskName));
               }
           }
           else{

               sb.append("&#160;");

           }
           taskNameVec.add(sb.toString());
       }
       return taskNameVec;
   }

   public Vector showRouteTaskSequence(Context context, String[] args) throws Exception
   {
       Vector sequenceVector = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskState = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_SEQUENCE));
           sequenceVector.add(taskState);
       }

       return sequenceVector;
   }


   public Vector showRouteTaskRevision(Context context, String[] args) throws Exception
   {
       Vector revisionVector = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskRev = (String)objectMap.get(DomainObject.SELECT_REVISION);
           revisionVector.add(taskRev);
       }

       return revisionVector;
   }

   public Vector showRouteTaskAssignee(Context context, String[] args) throws Exception
   {
       Vector taskAssigneeVec = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");
	   Map paramList      = (Map)programMap.get("paramList");
	   String routeId = (String)paramList.get("objectId");
	   String languageStr = (String)paramList.get("languageStr");
       String isTypeRouteTemplate="";

       if(UIUtil.isNotNullAndNotEmpty(routeId))
       {
		DomainObject domainObject = new DomainObject(routeId);
		isTypeRouteTemplate = domainObject.getInfo(context, DomainConstants.SELECT_TYPE);
       }

       Iterator objectListItr = objectList.iterator();
       String taskAssignee = "";
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           if(objectMap.containsKey("TaskAssignee")){
        	   taskAssignee = (String)objectMap.get("TaskAssignee");
           }else {
               taskAssignee = (String)objectMap.get(DomainObject.SELECT_OWNER);
           }
		   if(isTypeRouteTemplate.equals(DomainConstants.TYPE_ROUTE_TEMPLATE)) {
				String isRouteOwnerTask = (String)objectMap.get(getAttributeSelect(PropertyUtil.getSchemaProperty(context,"attribute_RouteOwnerTask")));
				if("TRUE".equals(isRouteOwnerTask)){
					taskAssignee = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.RouteTemplateTaskAssignees.route_owner");
				}
		   }	
			
		   
           taskAssigneeVec.add(taskAssignee);
       }

       return taskAssigneeVec;
   }

   public Vector showRouteTaskAction(Context context, String[] args) throws Exception
   {
       Vector taskActionVec = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");
       Map paramList      = (Map)programMap.get("paramList");
       String sLanguage = (String)paramList.get("languageStr");

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskAction = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_ACTION));
           taskActionVec.add(i18nNow.getRangeI18NString( DomainObject.ATTRIBUTE_ROUTE_ACTION, taskAction,sLanguage));
       }

       return taskActionVec;
   }

   public Vector showRouteTaskApprStatus(Context context, String[] args) throws Exception
   {
       Vector approvalStatus = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");
       Map paramList      = (Map)programMap.get("paramList");
       String sLanguage = (String)paramList.get("languageStr");

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskAction = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_ACTION));
           String taskApprovalStatus = (taskAction.equals("Approve")) ? (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_APPROVAL_STATUS)) : "";
           approvalStatus.add(i18nNow.getRangeI18NString( DomainObject.ATTRIBUTE_APPROVAL_STATUS, taskApprovalStatus,sLanguage));
       }

       return approvalStatus;
   }

   public Vector showRouteTaskComments(Context context, String[] args) throws Exception
   {
       Vector taskCommentsVec = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskComments = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_COMMENTS));
           taskCommentsVec.add(taskComments);
       }

       return taskCommentsVec;
   }

   public Vector showRouteTaskInstructions(Context context, String[] args) throws Exception
   {
       Vector taskInstr = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskInstructions = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_INSTRUCTIONS));
           taskInstr.add(taskInstructions);
       }

       return taskInstr;
   }

   public Vector showTaskCompletionDate(Context context, String[] args) throws Exception
   {
       Vector completionDate = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");
       Map paramList = (Map)programMap.get("paramList");
       String timeZone = (String)paramList.get("timeZone");
       double clientTZOffset = (new Double(timeZone)).doubleValue();

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskCompletionDate = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ACTUAL_COMPLETION_DATE));
           taskCompletionDate = eMatrixDateFormat.getFormattedDisplayDateTime(context,
                   taskCompletionDate, true,DateFormat.MEDIUM, clientTZOffset,context.getLocale());
           completionDate.add(taskCompletionDate);
       }

       return completionDate;
   }

   public Vector showTaskState(Context context, String[] args) throws Exception
   {
       Vector stateVector = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");
       Map paramList      = (Map)programMap.get("paramList");
       String languageStr = (String)paramList.get("languageStr");

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskState = (String)objectMap.get(DomainObject.SELECT_CURRENT);
           String taskId = (String)objectMap.get(DomainObject.SELECT_ID);
           StringBuffer sb = new StringBuffer();
           if( null == taskState){
               sb.append(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.TaskSummary.StateName"));
                 }
                 else{
                   BusinessObject busObj = new BusinessObject(taskId);
                   busObj.open(context);
                  sb.append(i18nNow.getStateI18NString(busObj.getPolicy().getName(),taskState, languageStr));

                   busObj.close(context);
                 }
           stateVector.add(sb.toString());
       }

       return stateVector;
   }
   public Vector showAssigneeIcon(Context context, String[] args) throws Exception
   {
       Vector showAssigneeIcon = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");
       HashMap paramList = (HashMap)programMap.get("paramList");
       String languageStr =  (String)paramList.get("languageStr");
       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           String taskAllowDelegation = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ALLOW_DELEGATION));
           StringBuffer imageSB = new StringBuffer();
           if("TRUE".equalsIgnoreCase(taskAllowDelegation)){
               imageSB.append("<img src=\"../common/images/iconAssignee.gif\" name=\"imgTask\" id=\"imgTask\" alt=\"");
               imageSB.append(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(languageStr),"emxComponents.TaskSummary.ToolTipAssignable")).append("\"/>");
           }
           showAssigneeIcon.add(imageSB.toString());
       }
       //XSSOK
       return showAssigneeIcon;
   }

   public Vector showOwnerReviewIcon(Context context, String[] args) throws Exception
   {
       Vector showOwnerReviewIcon = new Vector();
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       MapList objectList = (MapList)programMap.get("objectList");
       Map paramList = (Map)programMap.get("paramList");
       String languageStr =  (String)paramList.get("languageStr");
       String routeId =  (String)paramList.get("objectId");
       DomainObject domainObject = DomainObject.newInstance(context , routeId);
       String sTypeName = domainObject.getInfo(context, domainObject.SELECT_TYPE);

       Iterator objectListItr = objectList.iterator();
       while(objectListItr.hasNext())
       {
           Map objectMap = (Map) objectListItr.next();
           StringBuffer imageSB = new StringBuffer();
           String reviewTask = (String)objectMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_REVIEW_TASK));
           if(DomainObject.TYPE_ROUTE.equals(sTypeName) && "Yes".equalsIgnoreCase(reviewTask)){
               imageSB.append("<img src=\"../common/images/iconSmallOwnerReview.gif\" name=\"imgTask\" id=\"imgTask\" alt=\"");
               imageSB.append(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(languageStr),"emxComponents.TaskSummary.ToolTipOwnerReview")).append("\"/>");
           }
           showOwnerReviewIcon.add(imageSB.toString());
       }
       //XSSOK
       return showOwnerReviewIcon;
   }


   public boolean showRouteTaskContent(Context context, String[] args) throws Exception
   {
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       String showContent =  (String)programMap.get("showRouteContent");
       return (null != showContent && showContent.equals("false")) ? false : true;
   }

   public String getRouteStoppedMessage(Context context, String[] args) throws FrameworkException {
       try {
           HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap requestMap = (HashMap)programMap.get("requestMap");
           String objectId = (String)programMap.get("objectId");
           String languageStr = (String)programMap.get("languageStr");
           objectId = objectId != null ? objectId : (String)requestMap.get("objectId");

           String SELECT_ROUTE_ID = "from[" + RELATIONSHIP_ROUTE_TASK + "].to.id";

           StringList selectList = new StringList(4);
           selectList.add(SELECT_ROUTE_ID);
           selectList.add(SELECT_OWNER);

           DomainObject doInboxTask = DomainObject.newInstance(context,objectId);
           Map taskMap = doInboxTask.getInfo(context,selectList);

           if (taskMap.get(SELECT_ROUTE_ID) == null) {
               DomainObject dmoLastRevision = new DomainObject(doInboxTask.getLastRevision(context));
               String strRouteId = dmoLastRevision.getInfo(context, SELECT_ROUTE_ID);
               taskMap.put(SELECT_ROUTE_ID, strRouteId);
           }

           String strRouteId = (String) taskMap.get(SELECT_ROUTE_ID);
           String SELECT_ATTRIBUTE_ROUTE_STATUS  = "attribute[" + ATTRIBUTE_ROUTE_STATUS + "]";
           StringList routeInfoSel = new StringList(2);
           routeInfoSel.add(SELECT_CURRENT);
           routeInfoSel.add(SELECT_ATTRIBUTE_ROUTE_STATUS);


           DomainObject routeObj = DomainObject.newInstance(context, strRouteId);
           Map routeInfo = routeObj.getInfo(context, routeInfoSel);

           if("Stopped".equals(routeInfo.get(SELECT_ATTRIBUTE_ROUTE_STATUS)) && isRouteStoppedDueToRejection(context, strRouteId)) {
               String attrComments = "attribute[" + DomainConstants.ATTRIBUTE_COMMENTS + "]";

               StringList busSelect = new StringList(2);
               busSelect.add(DomainConstants.SELECT_OWNER);
               busSelect.add(attrComments);

               DomainObject dObj = new DomainObject(strRouteId);
               String objectWhere = "attribute["+ DomainConstants.ATTRIBUTE_APPROVAL_STATUS +"] == 'Reject'";
               MapList mapTaskRejected = dObj.getRelatedObjects(context,
                       RELATIONSHIP_ROUTE_TASK, TYPE_INBOX_TASK,
                       busSelect, new StringList(), true, false,(short)1, objectWhere, "");

               if(mapTaskRejected.size()>0) {
                   Map map = (Map)mapTaskRejected.get(0);
                   String rejectUser = (String)map.get(DomainConstants.SELECT_OWNER);
                   String reason = (String) map.get(attrComments);

                   StringBuffer sb = new StringBuffer();
                   sb.append("<font color=red><b>");
                   sb.append(ComponentsUIUtil.getI18NString(context, languageStr, "emxComponents.InboxTask.RouteStoppedMessage", new String[] {rejectUser, XSSUtil.encodeForHTML(context, reason)}));
                   sb.append("</b></font>");
                   return sb.toString();
               } else {
                   return EMPTY_STRING;
               }
           }
           return EMPTY_STRING;
       } catch (Exception e) {
           throw new FrameworkException(e);
       }
   }

   protected boolean isRouteStoppedDueToRejection(Context context, String strRouteId) throws FrameworkException {
       try {

           boolean isRouteStoppedDueToRejection = true;

           final String ATTRIBUTE_CURRENT_ROUTE_NODE = PropertyUtil.getSchemaProperty(context, "attribute_CurrentRouteNode");
           final String SELECT_CURRENT_ROUTE_NODE = "attribute[" + ATTRIBUTE_CURRENT_ROUTE_NODE + "]";
           final String SELECT_ROUTE_NODE_ID = "attribute[" + DomainObject.ATTRIBUTE_ROUTE_NODE_ID + "]";
           final boolean GET_TO = true;
           final boolean GET_FROM = true;

           Route objRoute = (Route)DomainObject.newInstance(context, DomainConstants.TYPE_ROUTE);
           objRoute.setId(strRouteId);

           StringList slBusSelect = new StringList();
           slBusSelect.add(SELECT_CURRENT_ROUTE_NODE);

           String strCurrentRouteNode = objRoute.getInfo(context, SELECT_CURRENT_ROUTE_NODE);

           slBusSelect.clear();
           StringList slRelSelect = new StringList();
           slRelSelect.add(SELECT_ROUTE_NODE_ID);

           String strRelPattern = DomainObject.RELATIONSHIP_ROUTE_NODE;
           String strRelWhere = "attribute[" + DomainObject.ATTRIBUTE_ROUTE_SEQUENCE + "]==" + strCurrentRouteNode;
           short nRecurseLevel = (short)1;

           MapList mlRouteNodes = objRoute.getRelatedObjects(context, strRelPattern, "*", slBusSelect, slRelSelect, !GET_TO, GET_FROM, nRecurseLevel, "", strRelWhere);
           if (mlRouteNodes == null || mlRouteNodes.size() == 0) {
               String[] formatArgs = {strCurrentRouteNode};
               String message =  ComponentsUIUtil.getI18NString(context, "emxComponents.InboxTask.NoTaskAtLevel",formatArgs);
               throw new FrameworkException(message);
           }

           StringBuffer sbufMatchList = new StringBuffer(64);
           for (Iterator itrRouteNodes = mlRouteNodes.iterator(); itrRouteNodes.hasNext();) {
               Map mapRouteNode = (Map)itrRouteNodes.next();
               if (sbufMatchList.length() > 0) {
                   sbufMatchList.append(",");
               }
               sbufMatchList.append(mapRouteNode.get(SELECT_ROUTE_NODE_ID));
           }

           slBusSelect = new StringList(DomainObject.SELECT_ID);
           strRelPattern = DomainObject.RELATIONSHIP_ROUTE_TASK;
           String strBusWhere = "attribute[" + DomainObject.ATTRIBUTE_APPROVAL_STATUS + "]==\"Reject\" && attribute[" + DomainObject.ATTRIBUTE_ROUTE_NODE_ID + "] matchlist \"" + sbufMatchList.toString() +"\" \",\"";

           MapList mlTasks = objRoute.getRelatedObjects(context, strRelPattern, DomainObject.TYPE_INBOX_TASK, slBusSelect, new StringList(), GET_TO, !GET_FROM, nRecurseLevel, strBusWhere, "");

           if (mlTasks == null || mlTasks.size() == 0) {
               isRouteStoppedDueToRejection = false;
           }

           return isRouteStoppedDueToRejection;

       } catch (Exception e) {
           throw new FrameworkException(e);
       }
   }

   /**
    * Shows the Assignee Selection radio option in Change Assignee Page
    *
    * @param context The Matrix Context object
    * @param args holds paramMap
    * @returns HashMap
    * @throws Exception if the operation fails
    * @since R212
    */

   public HashMap getChangeAssigneeRangeValues(Context context, String[] args) throws Exception {
       try {
			String isResponsibleRoleEnabled = DomainConstants.EMPTY_STRING;


		
           HashMap programMap = (HashMap)JPO.unpackArgs(args);
           HashMap paramMap = (HashMap)programMap.get("paramMap");
           String languageStr = (String) paramMap.get("languageStr");

           // initialize the return variable HashMap tempMap = new HashMap();
           HashMap tempMap = new HashMap();

           // initialize the Stringlists fieldRangeValues, fieldDisplayRangeValues
           StringList fieldRangeValues = new StringList();
           StringList fieldDisplayRangeValues = new StringList();

           String i18nPerson = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(languageStr),"emxComponents.Common.Person");
           String userGroup = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.Type.Group");

           fieldRangeValues.addElement("Person");
           fieldRangeValues.addElement("User Group");

           // Add the internationlized value of the range values to fieldDisplayRangeValues
           fieldDisplayRangeValues.addElement(i18nPerson);
           fieldDisplayRangeValues.addElement(userGroup);
			String isFDAEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.EnableFDA");
			try{
			isResponsibleRoleEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.ResponsibleRoleForSignatureMeaning.Preserve");
			if(UIUtil.isNotNullAndNotEmpty(isFDAEnabled) && isFDAEnabled.equalsIgnoreCase("true") && UIUtil.isNotNullAndNotEmpty(isResponsibleRoleEnabled) && isResponsibleRoleEnabled.equalsIgnoreCase("true"))
			{
				String strInboxTaskId = (String) paramMap.get("objectId");
				DomainObject dObjInboxTask = DomainObject.newInstance(context, strInboxTaskId);
				String strRouteTaskUser = dObjInboxTask.getAttributeValue(context,DomainConstants.ATTRIBUTE_ROUTE_TASK_USER);
				if(UIUtil.isNotNullAndNotEmpty(strRouteTaskUser) && strRouteTaskUser.startsWith("role_"))
				{
					fieldRangeValues.remove("User Group");
					fieldDisplayRangeValues.remove(userGroup);
				}
			}
			}
			catch(Exception e){
				isResponsibleRoleEnabled = "false";
			}

           tempMap.put("field_choices", fieldRangeValues);
           tempMap.put("field_display_choices", fieldDisplayRangeValues);

           return tempMap;
       } catch (Exception e) {
           throw new FrameworkException(e);
       }
   }

   /**
    * Reassigns the task to the selected group. Creates teh RTU object and connect to the Route and Inbox task
    *
    * @param context The Matrix Context object
    * @returns nothing
    * @throws Exception if the operation fails
    * @since R212
    */
   public void reAssignToGroup(Context context,  String newTaskAssignee, DomainObject inboxTaskObj, String sRouteId, String languageStr) throws Exception {
       try {
    	   	   String groupSymbolicName = newTaskAssignee;
    	   	   groupSymbolicName = FrameworkUtil.getAliasForAdmin(context, "Group", newTaskAssignee, true);
               DomainObject routeObject = new DomainObject(sRouteId);

               // Route.getRouteTaskUserObject() will check if any RTU is already connected to Route or not.
               // If already connected then return the RTU object else creates and returns
               // The 3rd parameter boolean true ensures to create a object if not exist
               DomainObject rtaskUser = Route.getRouteTaskUserObject(context, routeObject, true);

               Map taskInfo = getInboxTaskInfo(context, inboxTaskObj);

               // Change "Project Task" connection between InboxTask and previous assignee to the new delegator.
               String connectionId = (String) taskInfo.get(SELECT_TASK_ASSIGNEE_CONNECTION);
               DomainRelationship.setToObject(context, connectionId, rtaskUser);

               //get the Route Node Id from inbox task
               connectionId = (String) taskInfo.get(SELECT_ROUTE_NODE_ID);

               // get the route id for this inbox task
               String routeId = (String) taskInfo.get(routeIdSelectStr);
               Route tempRouteObject = (Route)DomainObject.newInstance(context, routeId);

               //Get the correct relId for the RouteNodeRel given the attr routeNodeId from the InboxTask.
               connectionId = tempRouteObject.getRouteNodeRelId(context, connectionId);

               DomainRelationship relRouteNode = new DomainRelationship(connectionId);
               relRouteNode.open(context);

               MapList items = new MapList();
               try {
                   //push context since the task owner might have only Read access
                   ContextUtil.pushContext(context);

                   // Change "RouteNode" connection between the Route and previous assignee to the new delegator.
                   DomainRelationship.setToObject(context, connectionId, rtaskUser);

                   // Change owner of existing object to the new Assignee
                   inboxTaskObj.setOwner(context, newTaskAssignee);

                   // Set the value of RTU attribute with the group symbolic name on route node relationship
                   relRouteNode.setAttributeValue(context, DomainObject.ATTRIBUTE_ROUTE_TASK_USER, groupSymbolicName);

                   // Set the value of RTU attribute with the group symbolic name on inbox task object
                   inboxTaskObj.setAttributeValue(context, DomainObject.ATTRIBUTE_ROUTE_TASK_USER, groupSymbolicName);
               } catch (Exception ex) {
                   throw (new FrameworkException(ex));
               } finally {
                   ContextUtil.popContext(context);
               }

               String currentTaskOwner = (String) taskInfo.get(SELECT_TASK_ASSIGNEE_NAME);
			   Route.grantAccessToNewGroup(context, routeObject, currentTaskOwner, newTaskAssignee);
               // Send notification to the group members
               sendNotificationToGroup(context, newTaskAssignee, taskInfo, routeObject, languageStr);
           } catch(Exception e){
               throw new FrameworkException(e.getMessage());
           }
    }
   /**
    * Updates the assignee for the Inbox Task.
    *
    * @param context The Matrix Context object
    * @returns Hashmap
    * @throws Exception if the operation fails
    * @since R212
    */
   @com.matrixone.apps.framework.ui.PostProcessCallable
   public HashMap updateAssignee(Context context, String[] args) throws Exception {

       HashMap programMap = (HashMap)JPO.unpackArgs(args);
       HashMap requestMap = (HashMap)programMap.get("requestMap");
       String languageStr = (String)requestMap.get("languageStr");
       String timeZone = (String)requestMap.get("timeZone");
       String taskId    = (String)requestMap.get("objectId");
       String reassignComments    = (String)requestMap.get("ReassignComments");
       String taskScheduledDate    = (String)requestMap.get("DueDate");
       String assigneeDueTime    = (String)requestMap.get("routeTime");
       String newTaskAssignee = (String)requestMap.get("NewAssignee");
       String newTaskAssigneeOID = (String)requestMap.get("NewAssigneeOID");
       String assigneeSelection = (String)requestMap.get("AssigneeSelection");
       
       Locale locale = (Locale)requestMap.get("localeObj");
       String strUserGroup = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.Type.Group");
	   String typeInboxTask = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",locale, "emxFramework.Type.Inbox_Task");
       boolean isPerson = false;
       boolean isGroup = false;

       boolean isUserGroup = false;
       boolean isOldAssigneeUserGroup = false;
       if(strUserGroup.equals(assigneeSelection)){
    	   isUserGroup = true;
       }
       if(!isUserGroup){
    	   // To see if the new assignee is a person or group
    	   String sCommand = "print user $1 select $2 $3 dump $4";
           String cmd = MqlUtil.mqlCommand(context, sCommand, newTaskAssignee, "isaperson", "isagroup", "|");
           isPerson = "TRUE|FALSE".equalsIgnoreCase(cmd);
           isGroup = "FALSE|TRUE".equalsIgnoreCase(cmd);
       }
       HashMap resultsMap = new HashMap();
	   StringList selectList = new StringList();
       selectList.add("from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.id");
       selectList.add("from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.type");
       selectList.add("from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.name");
       selectList.add("from[" + DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.name");
       selectList.add("from[" + DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.id");
       selectList.add(SELECT_TASK_ASSIGNEE_TYPE);
       selectList.add(DomainConstants.ATTRIBUTE_ROUTE_TASK_USER);
       selectList.add(getAttributeSelect(ATTRIBUTE_ALLOW_DELEGATION));
       selectList.add(getAttributeSelect(ATTRIBUTE_ROUTE_ACTION));
       selectList.add(getAttributeSelect(ATTRIBUTE_ROUTE_INSTRUCTIONS));
       selectList.add(getAttributeSelect(ATTRIBUTE_SCHEDULED_COMPLETION_DATE));
       selectList.add(SELECT_NAME);
       selectList.add(SELECT_TYPE);
       selectList.add(SELECT_REVISION);
       selectList.add("attribute["+ATTRIBUTE_TITLE+"]");
       selectList.add(DomainConstants.SELECT_PHYSICAL_ID);
       InboxTask inboxTaskObj = (InboxTask)DomainObject.newInstance(context,DomainConstants.TYPE_INBOX_TASK);
       if(taskId != null && !"".equals(taskId)){
           inboxTaskObj.setId(taskId);
       }

       Map routeInfoMap = inboxTaskObj.getInfo(context, selectList);
       String routeId =(String) routeInfoMap.get("from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.id");
		String taskName = (String) routeInfoMap.get(SELECT_NAME);
		String taskType = (String) routeInfoMap.get(SELECT_TYPE);
		String taskRevision = (String) routeInfoMap.get(SELECT_REVISION);
        String taskTitle = (String) routeInfoMap.get("attribute["+ATTRIBUTE_TITLE+"]");
        if(UIUtil.isNullOrEmpty(taskTitle))
        {
        	taskTitle = (String) routeInfoMap.get(DomainConstants.SELECT_NAME);
        }
		String taskPhysicalId = (String) routeInfoMap.get(DomainConstants.SELECT_PHYSICAL_ID);
		String taskAction = (String) routeInfoMap.get(getAttributeSelect(ATTRIBUTE_ROUTE_ACTION));
       if (!UIUtil.isNullOrEmpty(taskScheduledDate)) {
           double clientTZOffset = (new Double(timeZone)).doubleValue();
           taskScheduledDate     =  eMatrixDateFormat.getFormattedInputDateTime(context,taskScheduledDate,assigneeDueTime,clientTZOffset, locale);
       }
       String groupType = PropertyUtil.getSchemaProperty(context,"type_Group");
       String proxyGoupType = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
           // Get the old assignee
           String sTaskOldAssignee =(String) routeInfoMap.get( "from[" + DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.name");
           String sTaskOldAssigneeType =(String) routeInfoMap.get( SELECT_TASK_ASSIGNEE_TYPE);

           String sRTUAttrValue = (String) routeInfoMap.get(DomainConstants.ATTRIBUTE_ROUTE_TASK_USER);
           if(groupType.equals(sTaskOldAssigneeType) || proxyGoupType.equals(sTaskOldAssigneeType)){
        	   isOldAssigneeUserGroup = true;
           }else if(UIUtil.isNotNullAndNotEmpty(sRTUAttrValue)){
		   sTaskOldAssignee = UIUtil.isNotNullAndNotEmpty(sRTUAttrValue) ? PropertyUtil.getSchemaProperty(context, sRTUAttrValue) : sTaskOldAssignee;
           }

           // Check if both old assignee and new assignee are same then alert the end user
           if(newTaskAssignee.equals(sTaskOldAssignee)) {
               resultsMap.put("Message", EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(languageStr),"emxComponents.ChangeAssignee.NewAssignee"));
               return resultsMap;
           }

           Route route = (Route)DomainObject.newInstance(context, DomainConstants.TYPE_ROUTE);
           String allowDelegation = (String) routeInfoMap.get(getAttributeSelect(ATTRIBUTE_ALLOW_DELEGATION));
           String taskRouteAction = (String) routeInfoMap.get(getAttributeSelect(ATTRIBUTE_ROUTE_ACTION));
		String taskInstruction = (String)routeInfoMap.get(getAttributeSelect(ATTRIBUTE_ROUTE_INSTRUCTIONS));

           String sTaskOldAssigneeId = (String) routeInfoMap.get("from[" + DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.id");
           DomainObject dmoLastRevision = new DomainObject(inboxTaskObj.getLastRevision(context));
           String sRouteId = dmoLastRevision.getInfo(context, "from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.id");
           if("TRUE".equalsIgnoreCase(allowDelegation)){
              inboxTaskObj.setAttributeValue(context,inboxTaskObj.ATTRIBUTE_SCHEDULED_COMPLETION_DATE, taskScheduledDate);
           }

           reassignComments   = (reassignComments == null || "".equals(reassignComments.trim()) || "null".equals(reassignComments)) ? "" : reassignComments;
           // If the selected new Assignee  is a group then invoke reAssignToGroup()
           if(isGroup) {
               reAssignToGroup(context, newTaskAssignee, inboxTaskObj, sRouteId, languageStr);
			   Route.revokeAccessForOldAssigneeOnReassigningToGroup(context,(String) routeInfoMap.get("from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.id"),(String) routeInfoMap.get("from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.type"),(String) routeInfoMap.get("from[" + DomainConstants.RELATIONSHIP_ROUTE_TASK + "].to.name"),(String) routeInfoMap.get( "from[" + DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.name"),(String) routeInfoMap.get( "from[" + DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.type"),(String) routeInfoMap.get( "from[" + DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.id"));
               //String fromId, String fromType, String fromName, String discName, String discType, String discId
           }
           if(isOldAssigneeUserGroup){
        	   DomainAccess.deleteObjectOwnership(context, sRouteId, null,sTaskOldAssignee,DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
           }
           // If the selected new Assignee is a person
           if(isPerson || isUserGroup ) {
        	   String sTaskNewAssigneeId = "";
        	   	if(isUserGroup)	{
        	   		sTaskNewAssigneeId = newTaskAssigneeOID;
        	   	}else {
        		   sTaskNewAssigneeId = !UIUtil.isNullOrEmpty(newTaskAssignee) ? PersonUtil.getPersonObjectID(context, newTaskAssignee) : "";
        	   	}

           if(!UIUtil.isNullOrEmpty(sTaskNewAssigneeId)&& !UIUtil.isNullOrEmpty(sTaskOldAssigneeId) && !sTaskNewAssigneeId.equals(sTaskOldAssigneeId)) {
                 // For delegation functionality the Allow Delegation attribute should be TRUE. So we will do the same momentarily if the Allow Delegation is No

                //////////////////////////// START ABSENCE DELEGATION HANDLING/////////////////////////////
                // Check if the new assignee has configured absence delegation and he is absent
                if ("true".equalsIgnoreCase(allowDelegation) && !isUserGroup ) {
                    final String ATTRIBUTE_ABSENCE_DELEGATE = PropertyUtil.getSchemaProperty(context, "attribute_AbsenceDelegate");
                    final String ATTRIBUTE_ABSENCE_END_DATE = PropertyUtil.getSchemaProperty(context, "attribute_AbsenceEndDate");
                    final String ATTRIBUTE_ABSENCE_START_DATE = PropertyUtil.getSchemaProperty(context, "attribute_AbsenceStartDate");
                    final String SELECT_ATTRIBUTE_ABSENCE_DELEGATE = "attribute[" + ATTRIBUTE_ABSENCE_DELEGATE + "]";
                    final String SELECT_ATTRIBUTE_ABSENCE_END_DATE = "attribute[" + ATTRIBUTE_ABSENCE_END_DATE + "]";
                    final String SELECT_ATTRIBUTE_ABSENCE_START_DATE = "attribute[" + ATTRIBUTE_ABSENCE_START_DATE + "]";

                    SimpleDateFormat dateFormat = new SimpleDateFormat (eMatrixDateFormat.getInputDateFormat(), context.getLocale());
                    StringList slBusSelect = new StringList();
                    slBusSelect.addElement(SELECT_ATTRIBUTE_ABSENCE_DELEGATE);
                    slBusSelect.addElement(SELECT_ATTRIBUTE_ABSENCE_START_DATE);
                    slBusSelect.addElement(SELECT_ATTRIBUTE_ABSENCE_END_DATE);

                    Vector vecAlreadyVisitedNewAssignees = new Vector();

                    while (!vecAlreadyVisitedNewAssignees.contains(sTaskNewAssigneeId)) {
                        DomainObject dmoNewAssignee = new DomainObject(sTaskNewAssigneeId);
                        Map mapNewAssigneeInfo = dmoNewAssignee.getInfo(context, slBusSelect);

                        String strAbsenceDelegate = (String) mapNewAssigneeInfo.get(SELECT_ATTRIBUTE_ABSENCE_DELEGATE);
                        String strAbsenceStartDate = (String) mapNewAssigneeInfo.get(SELECT_ATTRIBUTE_ABSENCE_START_DATE);
                        String strAbsenceEndDate = (String) mapNewAssigneeInfo.get(SELECT_ATTRIBUTE_ABSENCE_END_DATE);

                        // If the absence delegation is configured then
                        if (strAbsenceDelegate != null
                                && !"".equals(strAbsenceDelegate)
                                && strAbsenceStartDate != null
                                && !"".equals(strAbsenceStartDate)
                                && strAbsenceEndDate != null
                                && !"".equals(strAbsenceEndDate)) {

                            // Is the new user absent?
                            Date dtAbsenceStart = dateFormat.parse(strAbsenceStartDate);
                            Date dtAbsenceEnd = dateFormat.parse(strAbsenceEndDate);
                            Date dtToday = new Date();
                            if (dtToday.after(dtAbsenceStart)
                                    && dtToday.before(dtAbsenceEnd)) {
                                vecAlreadyVisitedNewAssignees.add(sTaskNewAssigneeId);
                                sTaskNewAssigneeId = PersonUtil.getPersonObjectID(context,
                                        strAbsenceDelegate);
                            }
                            else {
                                break;
                            }
                        } else {
                            break;
                        }
                    }//~while

                    if(vecAlreadyVisitedNewAssignees.contains(sTaskNewAssigneeId)) {
                        resultsMap.put("Message", "Circular reference found while traversing absence delegation chain.");
                    }
                    vecAlreadyVisitedNewAssignees.clear();
                 }//~if allowdelegation is Yes
                 //
                 ////////////////////////////END ABSENCE DELEGATION HANDLING/////////////////////////////

                 //Delegate the current task to the new assignee
                 try{
                 boolean  checkForAllowDelegationAttribute= true;
                 	inboxTaskObj.delegateTask(context, (String)sTaskNewAssigneeId , checkForAllowDelegationAttribute);
                 	String mql1 =  "modify bus $1 add history $2 comment $3";
					String historyEntryAll= "TaskType:"+taskType +",TaskName:"+ taskName +",TaskRevision:"+ taskRevision+",newAssignee:" +PersonUtil.getFullName(context, newTaskAssignee)+",oldAssignee:"+PersonUtil.getFullName(context, sTaskOldAssignee)+",reassignComments:"+reassignComments;
					MqlUtil.mqlCommand(context, mql1, true, sRouteId, "Assignment", historyEntryAll);
				}catch(FrameworkException ex){    
					String msg = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, FrameworkStringResource.InboxTask_InvalidNewOwner, context.getLocale());
					if(ex.getMessage().contains(msg)){
						resultsMap.put("Message",msg);
						return resultsMap; 
					}else{
						throw new FrameworkException(ex.getMessage());
					}
				}

                 // If the attribute Allow Delegation was set "TRUE" momentarily then reset it back

                 ///////////////////////////////////////////////////////////////////////////////////////
                 //Send the reassignment notification comment provided by the user reassigning the task
                 // Find the route owner
                 route.setId(sRouteId);
				StringList routeSelects = new StringList();
				routeSelects.add(DomainObject.SELECT_OWNER);
				routeSelects.add(DomainObject.SELECT_NAME);
				routeSelects.add(DomainObject.SELECT_ATTRIBUTE_TITLE);
				routeSelects.add("physicalid");
				Map routeinfo = route.getInfo(context, routeSelects);


				String strRouteOwner = (String)routeinfo.get(DomainObject.SELECT_OWNER);
				String routeName = (String)routeinfo.get(DomainObject.SELECT_NAME);
				String routePhysicalId = (String)routeinfo.get("physicalid");
				
				// Get all the Route content information - Start
                StringList objSel = new StringList();
                objSel.add(DomainConstants.SELECT_ID);
                objSel.add(DomainConstants.SELECT_TYPE);
                objSel.add(DomainConstants.SELECT_NAME);
                objSel.add(DomainConstants.SELECT_DESCRIPTION);
                objSel.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
                MapList routeContentList = route.getRelatedObjects(context, DomainConstants.RELATIONSHIP_OBJECT_ROUTE, "*", objSel, null, true, false, (short) 0, null, null, 0);
				 routeContentList.addSortKey(DomainConstants.SELECT_NAME, DomainConstants.SortDirection.ASCENDING.toString(), String.class.getSimpleName());
				 routeContentList.sort();
                // Get all the Route content information -End

                // form Content with Description data for mail notifications - start
                StringBuffer sRouteContent = new StringBuffer();
                StringBuffer sRouteContentDescription = new StringBuffer();
				StringBuffer sRouteContentNotif = new StringBuffer();
				StringBuffer sRouteContentNotifIds = new StringBuffer();
				StringBuffer sRouteContentNotifTypes = new StringBuffer();
				StringBuffer sRouteContentNotifTitles = new StringBuffer();
                for(int i = 0; i < routeContentList.size(); i++) {
               	 // Map of the Objects
               	 Map routeContent = (Map) routeContentList.get(i);

               	 // build content links for notification table
               	 if (i > 0 && i < routeContentList.size()-1 ) {
               		 sRouteContent.append("<br/><br/>");
               		 sRouteContentDescription.append("<br/><br/>");
						sRouteContentNotif.append(", ");
						sRouteContentNotifIds.append(", ");
						sRouteContentNotifTypes.append(", ");
						sRouteContentNotifTitles.append(", ");
               	 }
               	 sRouteContent.append(emxNotificationUtil_mxJPO.getObjectLinkHTML(context, (String) routeContent.get(DomainConstants.SELECT_NAME), (String) routeContent.get(DomainConstants.SELECT_ID)));
               	 sRouteContentDescription.append(FrameworkUtil.stripString((String) routeContent.get(DomainConstants.SELECT_DESCRIPTION), InboxTask.MAX_LEN_OF_CNT_DESC_FOR_ROUTE_NOTIFICATIONS, FrameworkUtil.StripStringType.WORD_STRIP));
					sRouteContentNotif.append((String) routeContent.get(DomainConstants.SELECT_NAME));
					sRouteContentNotifIds.append((String) routeContent.get(DomainConstants.SELECT_ID));
					sRouteContentNotifTypes.append((String) routeContent.get(DomainConstants.SELECT_TYPE));
					sRouteContentNotifTitles.append((String) routeContent.get(DomainConstants.SELECT_ATTRIBUTE_TITLE));
                }
                // form Content with Description data for mail notifications - end
				
                 // Setting the allowDelegation as false once the task is delegated to some other user by Task Owner. So that the new Task Owner
                 // cannot delegate the task once again. If first time itself the task delegation is done by route owner then we should not
                 // change the value.
                 if(!strRouteOwner.equals(context.getUser()))
                    allowDelegation = "false";
                 // Ended

                 // Find the new and old task assignee name
                 java.util.Set userList = new java.util.HashSet();
                 userList.add(sTaskNewAssigneeId);

                 Map mapInfo = com.matrixone.apps.common.Person.getPersonsFromIds(context, userList, new StringList(com.matrixone.apps.common.Person.SELECT_NAME));
                 String strNewTaskAssigneeName = (String)((Map)mapInfo.get(sTaskNewAssigneeId)).get(com.matrixone.apps.common.Person.SELECT_NAME);

                 // If current user is the route owner then send notification to new user and old task assignee
                 // If current user is the old task assignee then send notification to route owner and old task assignee
                 StringList toList = new StringList(strNewTaskAssigneeName);
                 StringList ccList = new StringList(strRouteOwner);
              // Form the subject
				String mailEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.EnableMails");

                 String strSubject = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(languageStr),"emxFramework.ReassignTask.Notification.Subject");
                 String strBody = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", new Locale(languageStr),"emxFramework.ReassignTask.Notification.Body");
                 
                 StringList objectIdList = new StringList(taskId);
                 StringBuffer messageText = new StringBuffer();
                 //Adding task reassign comments to body

                 StringBuffer messageBody = new StringBuffer();
                 messageBody.append(strBody).append(reassignComments);

                 messageText.append(messageBody);
                 if(UIUtil.isNullOrEmpty(taskScheduledDate)){
                	 taskScheduledDate = "";
                 }
                 String strMessageBody = "";
                 String strIconMailBody = "";
                 String agentName = emxMailUtil_mxJPO.getAgentName(context, null);
                 String basePropFile = MessageUtil.getBundleName(context);
				String sInboxTaskLink = emxNotificationUtil_mxJPO.getObjectLinkHTML(context,(String)routeInfoMap.get(SELECT_NAME), taskId);
				String sRouteLink = emxNotificationUtil_mxJPO.getObjectLinkHTML(context, routeName, sRouteId);
				String sRouteInstructions = (String)routeInfoMap.get(getAttributeSelect(ATTRIBUTE_ROUTE_INSTRUCTIONS));

				 String tableHeader = "";
                String tableRow = "";
                String[] tableRowKeys = {};
                String[] tableRowValues = {};
                
                if(routeContentList.size() > 0) {
               	 tableHeader = "emxFramework.ProgramObject.eServicecommonInitiateRoute.TableWithContentHeader";
               	 tableRow = "emxFramework.ProgramObject.eServicecommonInitiateRoute.TableWithContentData";
               	 
               	 tableRowKeys = new String[]{"TaskType", "RouteName", "TaskName", "DueDate", "Instructions", "Content", "ContentDescription"};
               	 tableRowValues = new String[]{taskRouteAction, sRouteLink, sInboxTaskLink, taskScheduledDate, sRouteInstructions, sRouteContent.toString(), sRouteContentDescription.toString()};
                } else {
               	 tableHeader = "emxFramework.ProgramObject.eServicecommonInitiateRoute.TableHeader";
               	 tableRow = "emxFramework.ProgramObject.eServicecommonInitiateRoute.TableData";
               	 
               	 tableRowKeys = new String[]{"TaskType", "RouteName", "TaskName", "DueDate", "Instructions"};
               	 tableRowValues = new String[]{taskRouteAction, sRouteLink, sInboxTaskLink, taskScheduledDate, sRouteInstructions};
                }
				
                 tableHeader = MessageUtil.getMessage(context, tableHeader, null, locale, basePropFile);
                 String message = "<br><html><body><br>";
                 message += "<style>body, th, td {font-family:Verdana;font-size:11px;text-align:left;padding:5px;}</style>";
                 message += "<table border = 1><thead>" + tableHeader + "</thead><tbody><tr>";
                 message += MessageUtil.getMessage(context, null, tableRow, tableRowKeys, tableRowValues, "", locale, basePropFile);
                 message += "</tr></tbody></table><br></body></html>";
                 messageBody.append(message);

                 HashMap hmMailDetails = getInboxTaskMailDetails(context, null, toList, ccList, null, strSubject, null, null, messageBody.toString(), null, null, objectIdList, null, basePropFile, messageText.toString());
               	 if(hmMailDetails.size() > 0){
               		strMessageBody = (String)hmMailDetails.get("Email");
               		strIconMailBody = (String)hmMailDetails.get("IconMail");
               	 }
					if("true".equalsIgnoreCase(mailEnabled)) {
						emxNotificationUtil_mxJPO.sendJavaMail(context, toList, ccList, new StringList(), strSubject, strIconMailBody, strMessageBody, agentName, null , new StringList(), "both");
					}else {
						emxNotificationUtil_mxJPO.sendJavaMail(context, toList, ccList, new StringList(), strSubject, strIconMailBody, strMessageBody, agentName, null , new StringList(), "iconmail");
					}
				boolean isGroupIncluded = false;
				StringList newMailToList = new StringList();
				StringList oldMailToList = new StringList();
				String newAssigneeType = null;
				if(isUserGroup){
					MapList mlMembers = FrameworkUtil.getProjectGroupAssignees(context, newTaskAssignee);
					if( mlMembers.size() > 0 ) {
						Map mTemp = null;
						for( Iterator itr = mlMembers.iterator(); itr.hasNext(); ) {
							mTemp = (Map) itr.next();
							newMailToList.addElement( (String) mTemp.get( DomainConstants.SELECT_NAME ) );
						}
					}
					String tempValues = MqlUtil.mqlCommand(context,"temp query bus $1 $2 $3 select $4 dump $5", PropertyUtil.getSchemaProperty(context, "type_GroupProxy"), newTaskAssignee, "-", DomainConstants.SELECT_ATTRIBUTE_TITLE , "~");
					newTaskAssignee = tempValues.split("~")[3];
					newAssigneeType = "User Group";
				}else if(isPerson){
					newMailToList.add(newTaskAssignee);
					newAssigneeType = "Person";
				}else {
					isGroupIncluded = true;
				}

				if("Person".equalsIgnoreCase(sTaskOldAssigneeType)){
					oldMailToList.add(sTaskOldAssignee);
				}else if(isOldAssigneeUserGroup){
					sTaskOldAssigneeType = "User Group";
					MapList mlMembers = FrameworkUtil.getProjectGroupAssignees(context, sTaskOldAssignee);
					String tempValues = MqlUtil.mqlCommand(context,"temp query bus $1 $2 $3 select $4 dump $5", PropertyUtil.getSchemaProperty(context, "type_GroupProxy"), sTaskOldAssignee, "-", DomainConstants.SELECT_ATTRIBUTE_TITLE , "~");
					sTaskOldAssignee = tempValues.split("~")[3];
					if( mlMembers.size() > 0 ) {
						Map mTemp = null;
						for( Iterator itr = mlMembers.iterator(); itr.hasNext(); ) {
							mTemp = (Map) itr.next();
							oldMailToList.addElement( (String) mTemp.get( DomainConstants.SELECT_NAME ) );
						}
					}

				}else {
					isGroupIncluded = true;
				}
				if(!isGroupIncluded){
					Map<String, String> taskAndRouteInfo = new HashMap<>();
					taskAndRouteInfo.put(RouteTaskNotification.ROUTE_ID, routePhysicalId);
					taskAndRouteInfo.put(RouteTaskNotification.ROUTE_NAME,  (String)routeinfo.get(DomainObject.SELECT_ATTRIBUTE_TITLE));
					taskAndRouteInfo.put(RouteTaskNotification.ROUTE_OWNER, strRouteOwner);
		            taskAndRouteInfo.put(RouteTaskNotification.TASK_ID, taskPhysicalId);
		            taskAndRouteInfo.put(RouteTaskNotification.TASK_ACTION, taskAction);
		            taskAndRouteInfo.put(RouteTaskNotification.TASK_INSTRUCTION, taskInstruction);
		            taskAndRouteInfo.put(RouteTaskNotification.DUE_DATE, taskScheduledDate);
		            taskAndRouteInfo.put(RouteTaskNotification.ROUTE_CONTENT_IDS, sRouteContentNotifIds.toString());
		            taskAndRouteInfo.put(RouteTaskNotification.ROUTE_CONTENT_TYPES, sRouteContentNotifTypes.toString());
		            taskAndRouteInfo.put(RouteTaskNotification.ROUTE_CONTENT_TITLES, sRouteContentNotifTitles.toString());
		            taskAndRouteInfo.put(RouteTaskNotification.ROUTE_CONTENTS, sRouteContentNotif.toString());
		            taskAndRouteInfo.put(RouteTaskNotification.SENDER_USER, context.getUser());
		            taskAndRouteInfo.put(RouteTaskNotification.TASK_NAME, taskTitle);
	                taskAndRouteInfo.put(RouteTaskNotification.TASK_ASSIGNEE, newTaskAssignee);
	                taskAndRouteInfo.put(RouteTaskNotification.ASSIGNEE_TYPE, newAssigneeType);
	                taskAndRouteInfo.put(RouteTaskNotification.OLD_ASSIGNEE_NAME, sTaskOldAssignee);
	                taskAndRouteInfo.put(RouteTaskNotification.OLD_ASSIGNEE_TYPE, sTaskOldAssigneeType);

	                RouteTaskNotification notifyObj = RouteTaskNotification.getInstance(context, sRouteContentNotifTypes.toString());
	                notifyObj.sendTaskReassignment3DNotification(context, taskAndRouteInfo, newMailToList, oldMailToList);
              }
           }
		}

           BusinessObject boTask = new BusinessObject( taskId );
           boTask.open( context );

           BusinessObjectAttributes boAttrGeneric = boTask.getAttributes(context);
           AttributeItr attrItrGeneric   = new AttributeItr(boAttrGeneric.getAttributes());
           AttributeList attrListGeneric = new AttributeList();

           String sAttrValue = "";
           String sTrimVal   = "";
           while (attrItrGeneric.next()) {
             Attribute attrGeneric = attrItrGeneric.obj();
             sAttrValue = (String)requestMap.get(attrGeneric.getName());

             // Validating for the attribute allow delegation and updating the value
             if(attrGeneric.getName().equals(DomainConstants.ATTRIBUTE_ALLOW_DELEGATION)) {
                 sAttrValue = allowDelegation;
             }
             // Ended
             if (sAttrValue != null) {
               sTrimVal = sAttrValue.trim();
               if ( attrGeneric.getName().equals(DomainConstants.ATTRIBUTE_APPROVAL_STATUS) && sTrimVal.equals("Reject") ) {
                 Pattern relPattern  = new Pattern(DomainConstants.RELATIONSHIP_ROUTE_TASK);
                 Pattern typePattern = new Pattern(DomainConstants.TYPE_ROUTE);
                 BusinessObject boRoute = ComponentsUtil.getConnectedObject(context,boTask,relPattern.getPattern(),typePattern.getPattern(),false,true);

                 if ( boRoute != null ) {
                     boRoute.open(context);
                     AttributeItr attributeItr = new AttributeItr(boRoute.getAttributes(context).getAttributes());

                     Route routeObj = (Route)DomainObject.newInstance(context,boRoute);

                     StringList routeSelects = new StringList(3);
                     routeSelects.add(Route.SELECT_OWNER);
                     routeSelects.add(Route.SELECT_NAME);
                     routeSelects.add(Route.SELECT_REVISION);
                     Map routeInfo = routeObj.getInfo(context,routeSelects);

                     String routeOwner = (String)routeInfo.get(Route.SELECT_OWNER);
                     String routeName = (String)routeInfo.get(Route.SELECT_NAME);
                     String routeRev = (String)routeInfo.get(Route.SELECT_REVISION);

                     while ( attributeItr.next() ) {
                         AttributeList attributeList = new AttributeList();
                         Attribute attribute = attributeItr.obj();

                         if( attribute.getName().equals(DomainConstants.ATTRIBUTE_ROUTE_STATUS) ) {
                             Map attrMap = new Hashtable();
                             attrMap.put(DomainConstants.ATTRIBUTE_ROUTE_STATUS, "Stopped");
                             routeObj.modifyRouteAttributes(context, attrMap);
                             /*send notification to the owner*/
                             String[] subjectKeys = {};
                             String[] subjectValues = {};

                             String[] messageKeys = {"name","IBType", "IBName", "IBRev", "RType", "RName", "RRev", "TComments"};
                             String[] messageValues = {(context.getUser()).toString(),typeInboxTask, boTask.getName(), boTask.getRevision(), Route.TYPE_ROUTE, routeName, routeRev, (String) boTask.getAttributeValues(context, DomainConstants.ATTRIBUTE_COMMENTS).getValue()};

                             StringList objectIdList = new StringList();
                             objectIdList.addElement(taskId);

                             StringList toList = new StringList();
                             toList.add(routeOwner);
                             MailUtil.sendNotification(context,
                                                       toList,
                                                       null,
                                                       null,
                                                       "emxFramework.ProgramObject.eServicecommonCompleteTask.SubjectReject",
                                                       subjectKeys,
                                                       subjectValues,
                                                       "emxFramework.ProgramObject.eServicecommonCompleteTask.MessageReject",
                                                       messageKeys,
                                                       messageValues,
                                                       objectIdList,
                                                       null);
                             break;
                         }
                     }
                     boRoute.close(context);
                 }
               }
               attrGeneric.setValue(sTrimVal);
               attrListGeneric.addElement(attrGeneric);
             }
           }

           try
           {
        	   ContextUtil.pushContext(context);
           //Update the attributes on the Business Object
           boTask.setAttributes(context, attrListGeneric);
           }catch(FrameworkException fe)
           {
        	   throw (new FrameworkException(fe));
           }
           finally
           {
        	   ContextUtil.popContext(context);
           }
           boTask.update(context);
           String RelationshipId = FrameworkUtil.getAttribute(context,boTask,DomainConstants.ATTRIBUTE_ROUTE_NODE_ID);

           route.setId(sRouteId);

           //Get the correct relId for the RouteNodeRel given the attr routeNodeId from the InboxTask.
           RelationshipId = route.getRouteNodeRelId(context, RelationshipId);

           // Updating the relationship Attributes
           Map attrMap = new Hashtable();

           Relationship relRouteNode = new Relationship(RelationshipId);
           relRouteNode.open(context);
           AttributeItr attrRelItrGeneric   = new AttributeItr(relRouteNode.getAttributes(context));
           while (attrRelItrGeneric.next()) {
               sTrimVal = null;
               Attribute attrGeneric = attrRelItrGeneric.obj();
               sAttrValue = attrGeneric.getName();
               if(sAttrValue.equals(DomainConstants.ATTRIBUTE_SCHEDULED_COMPLETION_DATE)) {
                   sTrimVal = taskScheduledDate;
               } else if(sAttrValue.equals(DomainConstants.ATTRIBUTE_ALLOW_DELEGATION)) {
                   sTrimVal = allowDelegation;
               } else if(sAttrValue.equals(DomainConstants.ATTRIBUTE_ROUTE_ACTION)) {
                   sTrimVal = taskRouteAction;
               }
               if(sTrimVal != null) {
                   attrMap.put(sAttrValue, sTrimVal);
               }
           }
           Route.modifyRouteNodeAttributes(context, RelationshipId, attrMap);
           relRouteNode.close(context);
           boTask.close( context );


       return resultsMap;

   }

   /**
    * Get's the inbox task mail details and sends notification mail
    *
    * @param context The Matrix Context object
    * @param args
    * @throws Exception if the operation fails
    */
   public static void getInboxTaskMailDetails(Context context, String[] args) throws Exception{
	   String strMessageBody = "";
	   String strIconMailBody = "";
	   HashMap programMap = (HashMap)JPO.unpackArgs(args);
	   String agentName = emxMailUtil_mxJPO.getAgentName(context, null);
	   StringList toList = (StringList)programMap.get("toList");
	   StringList ccList = (StringList)programMap.get("ccList");
	   String subjectKey = (String)programMap.get("subjectKey");
	   String messageKey = (String)programMap.get("messageKey");
	   String[] messageKeys = (String [])programMap.get("messageKeys");
	   String[] messageValues = (String [])programMap.get("messageValues");
	   StringList objectIdList = (StringList)programMap.get("objectIdList");
	   String companyName = (String)programMap.get("companyName");
	   String basePropFile = (String)programMap.get("basePropFile");
	   String staskId = (String)programMap.get("staskId");
	   String routeId = (String)programMap.get("routeId");
		String sRouteName = (String)programMap.get("routeName");
		String taskScheduledDate = (String)programMap.get("ScheduledCompletionDate");
		String taskName = (String)programMap.get("staskName");
		String sRouteInstructions = (String)programMap.get("sRouteInstructions");
		String taskRouteAction = (String)programMap.get("taskRouteAction");
	   DomainObject inboxTaskObj = new DomainObject(staskId);
	   Route route = (Route)DomainObject.newInstance(context, DomainConstants.TYPE_ROUTE);
	   route.setId(routeId);


		if(taskScheduledDate == null){
			StringList selects = new StringList();
			selects.add(DomainObject.SELECT_NAME);
			selects.add(ATTRIBUTE_ROUTE_INSTRUCTIONS);
			selects.add(ATTRIBUTE_ROUTE_ACTION); 
			selects.add(ATTRIBUTE_SCHEDULED_COMPLETION_DATE);
			Map taskInfo = inboxTaskObj.getInfo(context, selects);
			taskRouteAction = (String)taskInfo.get(ATTRIBUTE_SCHEDULED_COMPLETION_DATE);
			taskName = (String)taskInfo.get(DomainObject.SELECT_NAME);
			sRouteInstructions = (String)taskInfo.get(ATTRIBUTE_ROUTE_INSTRUCTIONS);
			taskRouteAction = (String)taskInfo.get(ATTRIBUTE_ROUTE_ACTION);
		}
		if(UIUtil.isNullOrEmpty(sRouteName)){
			sRouteName = route.getInfo(context, DomainObject.SELECT_NAME);
		}
	   Locale locale = emxMailUtilBase_mxJPO.getLocale(context);
	   String messageText = MessageUtil.getMessage(context, null,  messageKey, messageKeys, messageValues, companyName, locale, basePropFile);
	   StringBuffer messageBody = new StringBuffer(messageText);
	   subjectKey = MessageUtil.getMessage(context, null,  subjectKey, null, null, companyName, locale, basePropFile);

       String[] tableRowKeys = {"TaskType", "RouteName", "TaskName", "DueDate", "Instructions"};
		String sInboxTaskLink = emxNotificationUtil_mxJPO.getObjectLinkHTML(context,taskName, staskId);
		String sRouteLink = emxNotificationUtil_mxJPO.getObjectLinkHTML(context,sRouteName, routeId);

       String[] tableRowValues = {taskRouteAction, sRouteLink, sInboxTaskLink, taskScheduledDate, sRouteInstructions};
       String tableHeader = "emxFramework.ProgramObject.eServicecommonInitiateRoute.TableHeader";
       String tableRow = "emxFramework.ProgramObject.eServicecommonInitiateRoute.TableData";
       tableHeader = MessageUtil.getMessage(context, tableHeader, null, locale, basePropFile);
       String message = "<br><html><body><br>";
       message += "<style>body, th, td {font-family:Verdana;font-size:11px;text-align:left;padding:5px;}</style>";
       message += "<table border = 1><thead>" + tableHeader + "</thead><tbody><tr>";
       message += MessageUtil.getMessage(context, null, tableRow, tableRowKeys, tableRowValues, "", locale, basePropFile);
       message += "</tr></tbody></table><br></body></html>";
       messageBody.append(message);

		String mailEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.EnableMails");
		String notifyType = "iconmail";
		if("true".equalsIgnoreCase(mailEnabled)){
			notifyType = "both";
		}

	   HashMap hmMailDetailsMap = (HashMap)getInboxTaskMailDetails(context, null, toList, ccList, null, subjectKey, null, null, messageBody.toString(), messageKeys, messageValues, objectIdList, companyName, basePropFile, messageText);
	   if(hmMailDetailsMap.size() > 0){
      		strMessageBody = (String)hmMailDetailsMap.get("Email");
      		strIconMailBody = (String)hmMailDetailsMap.get("IconMail");
       }

	   emxNotificationUtil_mxJPO.sendJavaMail(context, toList, ccList, new StringList(), subjectKey, strIconMailBody, strMessageBody,
				agentName, null , new StringList(), notifyType);

	  return;
   }

   /**
    * Get's the Inbox task mail details
    *
    * @param context              the eMatrix <code>Context</code> object
    * @param objectId             context objectId
    * @param toList               the eMatrix <code>StringList</code> object that holds the to list of users to notify
    * @param ccList               the eMatrix <code>StringList</code> object that holds the cc list of users to notify
    * @param bccList              the eMatrix <code>StringList</code> object that holds the bcc list of users to notify
    * @param subjectKey           the notification subject key
    * @param subjectKeys          an array of subject place holder keys
    * @param subjectValues        an array of subject place holder values
    * @param messageKey           the notification message key
    * @param messageKeys          an array of message place holder keys
    * @param messageValues        an array of message place holder values
    * @param objectIdList         the eMatrix <code>StringList</code> object that holds the list of objects to send with the notification
    * @param companyName          used for company-based messages
    * @param basePropFile         used to determine base properties file to be used
    * @param messageText          the message body used for iconMail
    * @throws Exception if the operation fails
    */
   public static HashMap getInboxTaskMailDetails(Context context,
           String objectId,
           StringList toList,
           StringList ccList,
           StringList bccList,
           String subjectKey,
           String[] subjectKeys,
           String[] subjectValues,
           String messageKey,
           String[] messageKeys,
           String[] messageValues,
           StringList objectIdList,
           String companyName,
           String basePropFile,
           String messageText)
throws Exception
{
	   HashMap names = new HashMap();
       //
       // "languages" holds the unique languages
       //
       HashMap languages = new HashMap();
       emxMailUtilBase_mxJPO.getNamesAndLanguagePreferences(context, names, languages, toList);
       emxMailUtilBase_mxJPO.getNamesAndLanguagePreferences(context, names, languages, ccList);

       //
       // send one message per language
       //

       //Added for bug 344780
       //add them to the message, do it here for localization purpose
       MapList objInfoMapList = null;
       boolean hasBusObjInfo = false;
       String sBaseURL = emxMailUtilBase_mxJPO.getBaseURL(context, null);
       Vector LocaleInfo = emxMailUtilBase_mxJPO.getLocales(context, null);
       if (objectIdList != null && objectIdList.size() != 0)
       {
           StringList busSels = new StringList(3);
           busSels.add(DomainObject.SELECT_TYPE);
           busSels.add(DomainObject.SELECT_NAME);
           busSels.add(DomainObject.SELECT_REVISION);

           objInfoMapList = DomainObject.getInfo(context, (String[])objectIdList.toArray(new String[]{}), busSels);
           hasBusObjInfo = objInfoMapList != null && objInfoMapList.size() > 0;
       }
       Iterator itr = languages.keySet().iterator();
       StringBuffer messageBuffer = new StringBuffer();
       StringBuffer sbIconMailBody = new StringBuffer();
       HashMap hmMailInfo = new HashMap();
       while (itr.hasNext())
       {
           String language = (String) itr.next();
           Locale userPrefLocale = language.length() > 0 ? MessageUtil.getLocale(language) : null;
           Locale userLocale = userPrefLocale == null ? emxMailUtilBase_mxJPO.getLocale(context) : userPrefLocale;

           //
           // build the to, cc and bcc lists for this language
           //
           StringList to = emxMailUtilBase_mxJPO.getNamesForLanguage(toList, names, language);
           StringList cc = emxMailUtilBase_mxJPO.getNamesForLanguage(ccList, names, language);

           String subject = MessageUtil.getMessage(context, null, subjectKey, null, null, null, userLocale, basePropFile);
           messageBuffer = new StringBuffer();
           sbIconMailBody = new StringBuffer();
           if(hasBusObjInfo)
           {
        	   String strBusinessObject = MessageUtil.getString("emxFramework.IconMail.ObjectDetails.BusinessObject", "", userLocale);
        	   StringBuffer strObjectInfo = new StringBuffer(strBusinessObject);
        	   String strCheckObjectMessage = MessageUtil.getString("emxFramework.IconMail.ObjectDetails.CheckBusinessObjects", "", userLocale);
        	   messageBuffer.append("<br>");
               messageBuffer.append(strCheckObjectMessage);
               sbIconMailBody.append(strCheckObjectMessage).append("\n");
               messageBuffer.append("<br>");
               for(int i=0; i < objInfoMapList.size() ; i++)
               {
                   Map objInfoMap = (Map)objInfoMapList.get(i);

                   String sObjType = (String)objInfoMap.get(DomainObject.SELECT_TYPE);
                   sObjType = UINavigatorUtil.getAdminI18NString("Type", sObjType, userLocale.getLanguage());
                   String sObjName = (String)objInfoMap.get(DomainObject.SELECT_NAME);
                   String sObjRevision = (String)objInfoMap.get(DomainObject.SELECT_REVISION);

                   sbIconMailBody.append("\n\"");
                   sbIconMailBody.append(sObjType);
                   sbIconMailBody.append("\" \"");
                   sbIconMailBody.append(sObjName);
                   sbIconMailBody.append("\" \"");
                   sbIconMailBody.append(sObjRevision);
                   sbIconMailBody.append("\"\n");

                   messageBuffer.append("<br>\"");
                   messageBuffer.append(sObjType);
                   messageBuffer.append("\" \"");
                   messageBuffer.append(sObjName);
                   messageBuffer.append("\" \"");
                   messageBuffer.append(sObjRevision);
                   messageBuffer.append("\"<br>");

                   strObjectInfo.append(" ");
                   strObjectInfo.append(sObjType);
                   strObjectInfo.append(" ");
                   strObjectInfo.append(sObjName);
                   strObjectInfo.append(" ");
                   strObjectInfo.append(sObjRevision);
                   strObjectInfo.append(",");
               }
               strBusinessObject = strObjectInfo.toString();
               strBusinessObject = strBusinessObject.substring(0, strBusinessObject.length() - 1);
               strBusinessObject += "<br>";
               messageBuffer.insert(0, strBusinessObject);
               messageBuffer.append("<br>");
               sbIconMailBody.append("\n");
           }

           // if this is the no language preference group
           if (userPrefLocale == null && LocaleInfo != null)
           {
               // generate a message containing multiple languages
               for (int i = 0; i < LocaleInfo.size(); i++)
               {
                   // Define the mail message.
                   messageBuffer.append(MessageUtil.getMessage(context,
                           null,
                           messageKey,
                           null,
                           null,
                           null,
                           (Locale) LocaleInfo.elementAt(i),
                           basePropFile));

                   // separate the different language strings
                   messageBuffer.append("<br>");
               }
           }
           // otherwise get message based on language
           else
           {
               messageBuffer.append(MessageUtil.getMessage(context, null,  messageKey, messageKeys, messageValues, companyName, userLocale, basePropFile));
           }

           MQLCommand mql = new MQLCommand();
           mql.open(context);
           mql.executeCommand(context, "get env global MX_TREE_MENU");
           String paramSuffix = mql.getResult();
           if (paramSuffix != null &&
               !"".equals(paramSuffix) &&
               !"\n".equals(paramSuffix))
           {
               mql.executeCommand(context, "unset env global MX_TREE_MENU");
           }

            String inBoxTaskId =null;
            String sTempObjId = null;
            DomainObject doTempObj = DomainObject.newInstance(context);

           // If the base URL and object id list are available,
           // then add urls to the end of the message.
           if ( (sBaseURL != null && ! "".equals(sBaseURL)) &&
               (objectIdList != null && objectIdList.size() != 0) )
           {
               // Prepare the message for adding urls.
               Iterator i = objectIdList.iterator();
               while (i.hasNext())
               {
                   sTempObjId= (String)i.next();

                   if( (sTempObjId != null) && (!sTempObjId.equals("")))
                   {
                       try{

                               doTempObj.setId(sTempObjId);

                               if( (doTempObj.getInfo(context,DomainConstants.SELECT_TYPE)).equals(DomainConstants.TYPE_INBOX_TASK)){

                                   inBoxTaskId = sTempObjId;
                                   break;
                               }
                       }catch(Exception ex){System.out.println("exception in box sendNotification "+ex); }
                   }
                   // Add the url to the end of the message.
                   messageBuffer.append("<br>").append(MailUtil.getObjectLinkURI(context, sBaseURL, sTempObjId));

               }
           }

           // If is inbox task the message has to be modified accordingly.
           if(inBoxTaskId != null && !inBoxTaskId.equals("")){
               if( (messageText != null) && (!messageText.equals("")))
            	   sbIconMailBody.append(messageText);
               sbIconMailBody.append(emxMailUtilBase_mxJPO.getInboxTaskMailMessage(context, inBoxTaskId, userLocale, basePropFile, sBaseURL, paramSuffix));
           }
       }
       hmMailInfo.put("Email", messageBuffer.toString());
       hmMailInfo.put("IconMail", sbIconMailBody.toString());
	   return hmMailInfo;

	}
   /**
    * Returns the Inbox task info
    *
    * @param context The Matrix Context object
    * @returns Map containing the info on "Inbox Task".
    * @throws Exception if the operation fails
    * @since R212
    */
   public Map getInboxTaskInfo(Context context, DomainObject inboxTaskObj) throws FrameworkException
   {
       // get inbox task assignee relationship id as well as other information.
       StringList objectSelects = new StringList(7);
       objectSelects.add(SELECT_ID);
       objectSelects.add(SELECT_TYPE);
       objectSelects.add(SELECT_NAME);
       objectSelects.add(SELECT_REVISION);
       objectSelects.add(SELECT_TASK_ASSIGNEE_CONNECTION);
       objectSelects.add(routeIdSelectStr);
       objectSelects.add(SELECT_ROUTE_NODE_ID);
       objectSelects.add(SELECT_TASK_ASSIGNEE_NAME);

       Map taskInfo = inboxTaskObj.getInfo(context, objectSelects);
       return taskInfo;
   }
   /**
    * Sends the notifiation to everyone in the group
    *
    * @param context The Matrix Context object
    * @returns nothing
    * @throws Exception if the operation fails
    * @since R212
    */
   public void sendNotificationToGroup(Context context, String sGroup, Map taskInfo,DomainObject routeObject, String languageStr) throws FrameworkException {
       try {
           // Building the Object of the Mail Util to be used Later
           emxMailUtil_mxJPO mailUtil = new emxMailUtil_mxJPO(context, null);

           StringList objectSelects = new StringList(4);
           objectSelects.add(SELECT_TYPE);
           objectSelects.add(SELECT_NAME);
           objectSelects.add(SELECT_REVISION);
           objectSelects.add(SELECT_OWNER);

           Map routeInfo = routeObject.getInfo(context, objectSelects);
           String sRouteOwner = (String)routeInfo.get(SELECT_OWNER);

           String aliasGroupName = i18nNow.getAdminI18NString("Group",sGroup, languageStr);
           String sGRName ="Group" +" - "+aliasGroupName;
			 String typeInboxTask = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",context.getLocale(), "emxFramework.Type.Inbox_Task");
           // Construct String array to send mail notification
           String[] mailArguments = new String[27];
           mailArguments[0] = sGroup;
           mailArguments[1] = "emxFramework.ProgramObject.eServicecommonInitiateRoute.SubjectNotice3";
           mailArguments[2] = "2";
           mailArguments[3] = "Name";
           mailArguments[4] = aliasGroupName;
           mailArguments[5] = "GroupOrRole";
           mailArguments[6] = "Group";
           mailArguments[7] = "emxFramework.ProgramObject.eServicecommonInitiateRoute.FirstMessage2";
           mailArguments[8] = "8";
           mailArguments[9] = "IBType";
           mailArguments[10] = typeInboxTask;
           mailArguments[11] = "IBName";
           mailArguments[12] = (String)taskInfo.get(SELECT_NAME);
           mailArguments[13] = "IBRev";
           mailArguments[14] = (String)taskInfo.get(SELECT_REVISION);
           mailArguments[15] = "GRName";
           mailArguments[16] = sGRName;
           mailArguments[17] = "Type";
           mailArguments[18] = (String)routeInfo.get(SELECT_TYPE);
           mailArguments[19] = "Name";
           mailArguments[20] = (String)routeInfo.get(SELECT_NAME);
           mailArguments[21] = "Rev";
           mailArguments[22] = (String)routeInfo.get(SELECT_REVISION);
           mailArguments[23] = "ROwner";
           mailArguments[24] = sRouteOwner;
           mailArguments[25] = (String)taskInfo.get(SELECT_ID);
           mailArguments[26] = "";

           String oldAgentName = mailUtil.getAgentName(context, new String[] {});
           mailUtil.setAgentName(context, new String[] { sRouteOwner });
           mailUtil.sendNotificationToUser(context, mailArguments);
           mailUtil.setAgentName(context, new String[] { oldAgentName });

       } catch (Exception e) {
           throw new FrameworkException(e.toString());
       }
   }
	/**
    * Gets the internationalised value for group
    *
    * @param context The Matrix Context object
    * @returns nothing
    * @throws FrameworkException if the operation fails
    * @since R212
    */
   public String getI18nAssignee(Context context, String args[]) throws FrameworkException {
	   try {
		   HashMap programMap = (HashMap)JPO.unpackArgs(args);
		   HashMap requestMap = (HashMap)programMap.get("requestMap");
		   String languageStr = (String)requestMap.get("languageStr");
		   String taskId    = (String)requestMap.get("objectId");
		   return getTaskAssignee(context,taskId,languageStr);
       } catch(Exception e) {
    	   throw new FrameworkException(e.toString());
       }
   }

	/**
    * Gets the internationalised value for group/role , User Group Name if task is assigned to UG , Person full name 
    *
    * @param context The Matrix Context object
    * @returns nothing
    * @throws FrameworkException if the operation fails
    * @since R421
    */
   public String getTaskAssignee(Context context, String taskId,String languageStr) throws FrameworkException {
	   try {
		   final String proxyGoupType = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
		   final String groupType = PropertyUtil.getSchemaProperty(context,"type_Group");
		   DomainObject inboxTaskObj = new DomainObject(taskId);
    	   StringList objectSelects = new StringList();
    	   objectSelects.add(DomainConstants.SELECT_OWNER);
    	   objectSelects.add(DomainConstants.SELECT_OWNER_ISGROUP);
    	   objectSelects.add(DomainConstants.SELECT_OWNER_ISROLE);
    	   objectSelects.add(SELECT_TASK_ASSIGNEE_NAME);
    	   objectSelects.add(SELECT_TASK_ASSIGNEE_TITLE);
    	   objectSelects.add(SELECT_TASK_ASSIGNEE_TYPE);

    	   Map taskInfo = inboxTaskObj.getInfo(context, objectSelects);
    	   String taskAssigneeType =  (String)taskInfo.get(SELECT_TASK_ASSIGNEE_TYPE);
    	   String assignee = (String)taskInfo.get(DomainConstants.SELECT_OWNER);
    	   String strUserGroup = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",new Locale(languageStr), "emxFramework.Type.Group");
    	   if(proxyGoupType.equals(taskAssigneeType) || groupType.equals(taskAssigneeType)){
    		   assignee =  (String)taskInfo.get(SELECT_TASK_ASSIGNEE_TITLE) + "("+strUserGroup+")";
    	   }else if(DomainObject.TYPE_PERSON.equals(taskAssigneeType)){
    		   assignee = PersonUtil.getFullName(context, assignee);
    	   }else {
    	      	   String isARole = (String)taskInfo.get(DomainConstants.SELECT_OWNER_ISROLE);
    	      	   String isAGroup = (String)taskInfo.get(DomainConstants.SELECT_OWNER_ISGROUP);
    	      	   if("TRUE".equals(isARole)) {
    	      		   assignee = i18nNow.getAdminI18NString("Role", assignee, languageStr) + "("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Common.Role")+")";
    	   } else if("TRUE".equals(isAGroup)) {
    	      		   assignee = i18nNow.getAdminI18NString("Group", assignee, languageStr) + "("+EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(languageStr),"emxComponents.Common.Group")+")";
    	      	   }
    	   }
    	   return assignee;
       } catch(Exception e) {
    	   throw new FrameworkException(e.toString());
       }
   }

   /**
    * Returns the Inbox Task due date as per Client Time Zone and browser language
    *
    * @param context The Matrix Context object
    * @returns date and time
    * @throws Exception if the operation fails
    * @since R212
    */

   public String getInboxTaskDueDate(Context context, String[] args) throws Exception
   {
       try{
       Map programMap = (Map) JPO.unpackArgs(args);
       Map paramMap   = (Map)programMap.get("paramMap");
       HashMap requestMap = (HashMap)programMap.get("requestMap");
       Locale locObj = (Locale)requestMap.get("localeObj");
       String objectId = (String)paramMap.get("objectId");
       String languageStr = (String)paramMap.get("languageStr");
       String timeZone = (String) (requestMap != null ? requestMap.get("timeZone") : programMap.get("timeZone"));
       double clientTZOffset   = (new Double(timeZone)).doubleValue();
       DomainObject dom = new DomainObject(objectId);
       String taskScheduledDate = dom.getAttributeValue(context, ATTRIBUTE_SCHEDULED_COMPLETION_DATE);
       String dueDate = "";
       if(! UIUtil.isNullOrEmpty(taskScheduledDate)){
		   dueDate = eMatrixDateFormat.getFormattedDisplayDateTime(context, taskScheduledDate, true, Integer.parseInt(PersonUtil.getPreferenceDateFormatString(context)), Double.parseDouble(timeZone), context.getLocale());
       }
       return dueDate;
       }catch(Exception e) {
           throw new FrameworkException(e.toString());
       }

   }

   /**
    * Range Values for Appproval Status in Inbox Task form
    * @param context
    * @param args
    * @return
    * @throws FrameworkException
    */

   public Map getTaskApprovalStatusOptions(Context context, String[] args) throws FrameworkException {

       try {
    	   Map programMap = (Map)JPO.unpackArgs(args);
    	   Map requestMap = (Map)programMap.get("requestMap");
    	   Map paramMap   = (Map)programMap.get("paramMap");
    	   String sLanguage = (String) paramMap.get("languageStr");
    	   String objectId = (String) requestMap.get("objectId");

    	   Map returnMap = new HashMap(2);
    	   StringList rangeDisplay = new StringList(3);
    	   StringList rangeActual = new StringList(3);
		   String showAbstain = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.ShowAbstainForTaskApproval");
    	   showAbstain = UIUtil.isNullOrEmpty(showAbstain) ? "true" : showAbstain;

    	   DomainObject taskObj = DomainObject.newInstance(context, objectId);
    	   StringList selects = new StringList();
    	   selects.addElement("attribute[" + sAttrReviewTask + "]");
    	   selects.addElement("attribute[" + sAttrReviewersComments + "]");

    	   //get the details required
    	   Map taskMap = taskObj.getInfo(context, selects);
    	   String reviewTask = (String) taskMap.get("attribute[" + sAttrReviewTask + "]");
    	   String reviewComments = (String) taskMap.get("attribute[" + sAttrReviewersComments + "]");

    	   if("Yes".equals(reviewTask) && UIUtil.isNotNullAndNotEmpty(reviewComments)) {

    		   String promote= (String) EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Promote", context.getLocale());
    		   String demote= (String) EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Demote", context.getLocale());
    		   rangeActual.addElement("promote");
    		   rangeDisplay.addElement(promote);
    		   rangeActual.addElement("demote");
    		   rangeDisplay.addElement(demote);
    		   returnMap.put("field_choices", rangeActual);
    		   returnMap.put("field_display_choices", rangeDisplay);

    	   } else {
    		   matrix.db.AttributeType attribName = new matrix.db.AttributeType(
    				   DomainConstants.ATTRIBUTE_APPROVAL_STATUS);
    		   attribName.open(context);
    		   // actual range values
    		   List attributeRange = attribName.getChoices();

    		   attribName.close(context);
    		   List attributeDisplayRange = i18nNow.getAttrRangeI18NStringList(
    				   DomainConstants.ATTRIBUTE_APPROVAL_STATUS, (StringList) attributeRange, sLanguage);
    		   attributeDisplayRange.remove(attributeRange.indexOf("Ignore"));
    		   attributeRange.remove("Ignore");
    		   attributeDisplayRange.remove(attributeRange.indexOf("Signature Reset"));
    		   attributeRange.remove("Signature Reset");
    		   attributeDisplayRange.remove(attributeRange.indexOf("None"));
    		   attributeRange.remove("None");
			   if ("FALSE".equalsIgnoreCase(showAbstain)) {
    			   attributeDisplayRange.remove(attributeRange.indexOf("Abstain"));
        		   attributeRange.remove("Abstain");
    		   }

    		   rangeActual.addAll(attributeRange);
    		   rangeDisplay.addAll(attributeDisplayRange);

    		   returnMap.put("field_choices", rangeActual);
    		   returnMap.put("field_display_choices", rangeDisplay);
    	   }
    	   return returnMap;

       } catch (Exception e) {
    	   throw new FrameworkException(e);
       }
   }

   /**
    * Rto show approve options based on route action
    * @param context
    * @param args
    * @return
    * @throws FrameworkException
    */

   public boolean showApproveOptions(Context context, String[] args) throws FrameworkException {
       try {

    	   boolean showApprove = false;
    	   Map programMap = (Map)JPO.unpackArgs(args);
    	   String objectId = (String) programMap.get("objectId");
    	   String fromSummaryPage = (String) programMap.get("summaryPage");

    	   DomainObject taskObj = DomainObject.newInstance(context, objectId);
    	   String routeAction = taskObj.getInfo(context, "attribute[" + sAttrRouteAction + "]");

    	   if("true".equals(fromSummaryPage) && "Approve".equals(routeAction)) {
    		   showApprove = true;
    	   }
    	   return showApprove;

       } catch (Exception e) {
    	   throw new FrameworkException(e);
       }
   }

   /**
    * getTaskStatusForWidget - gets the status icon for Inbox Task and progress bar icon for WBS Tasks
    *  to be shown Widget Dash Board
    *
    * @param context the eMatrix <code>Context</code> object
    * @param args holds the following input arguments:
    *        0 - objectList MapList
    * @returns MapList
    * @throws Exception if the operation fails
    * @since V6R2014x
    */
	public MapList getTaskStatusForWidget(Context context, String[] args) throws Exception
	{
		try{
			Map programMap = (HashMap) JPO.unpackArgs(args);
	        MapList widgetDataMapList = (MapList) programMap.get(UIWidget.JPO_WIDGET_DATA);
            String fieldKey = (String) programMap.get(UIWidget.JPO_WIDGET_FIELD_KEY);
            Map<String, String> widgetArgs = (Map<String, String>) programMap.get(UIWidget.JPO_WIDGET_ARGS);

            String baseURI = widgetArgs.get(UIWidget.ARG_BASE_URI);

			for (int i = 0; i < widgetDataMapList.size(); i++) {
				Map collMap = (Map)widgetDataMapList.get(i);
				String sType = (String)collMap.get(DomainConstants.SELECT_TYPE);
				if(DomainConstants.TYPE_INBOX_TASK.equalsIgnoreCase(sType)){
					collMap.put(fieldKey, getStatusImageForTasks(context, collMap, baseURI));
				}else{
					try{
						Class reqClass = Class.forName("com.matrixone.apps.program.Widgets");
			        	Class[] classArgs = new Class[3];
			            classArgs[0] = Context.class;
			            classArgs[1] = Map.class;
			            classArgs[2] = String.class;
			            Method reqMethod = reqClass.getMethod("getProgressStatus", classArgs);
		            	Object[] methodArgs = new Object[2];
		            	methodArgs[0] = context;
		            	methodArgs[1] = collMap;
		            	methodArgs[2] = fieldKey;
		            	reqMethod.invoke(null, methodArgs);
					}catch(Exception e){
					}
				}
            }
			return widgetDataMapList;
       }catch (Exception ex){
           System.out.println("Error in getTaskStatusForWidget= " + ex.getMessage());
           throw ex;
       }
   }


	/**
	 * This method returns a Status image for each task based on states and due dates
	 * @param context
	 * @param map
	 * @return String Status Image
	 * @throws Exception
	 * @since V6R2014x
	 */
	private String getStatusImageForTasks(Context context, Map map, String baseURI)
	throws Exception{
		String stateComplete = FrameworkUtil.lookupStateName(context, policyTask, "state_Complete");
		String stateCompleted = FrameworkUtil.lookupStateName(context, policyWorkflowTask, "state_Completed");
		String stateAssigned    = FrameworkUtil.lookupStateName(context, DomainConstants.POLICY_INBOX_TASK, "state_Assigned");

		Date dueDate   = null;
		Date curDate = new Date();
		String statusImageString = "";
		String statusColor= "";

		String taskState = (String) map.get(DomainConstants.SELECT_CURRENT);

		String taskDueDate = "";
        String taskCompletedDate = "";
        String dueDateOffset = "";
        String sTypeName = (String)map.get(DomainConstants.SELECT_TYPE);
        String assigneeDueDateOpt = (String)map.get(getAttributeSelect(DomainConstants.ATTRIBUTE_ASSIGNEE_SET_DUEDATE));

        if(taskState==null)
        	taskState = "";

        if ((DomainConstants.TYPE_INBOX_TASK).equalsIgnoreCase(sTypeName)){
            taskDueDate = (String)map.get(strAttrCompletionDate);
            taskCompletedDate = (String)map.get(strAttrTaskCompletionDate);
            dueDateOffset = (String)map.get(getAttributeSelect(DomainConstants.ATTRIBUTE_DUEDATE_OFFSET));
        }else if ((DomainConstants.TYPE_TASK).equalsIgnoreCase(sTypeName)){
            taskDueDate = (String)map.get(strAttrTaskEstimatedFinishDate);
            taskCompletedDate = (String)map.get(strAttrTaskFinishDate);
            dueDateOffset = (String)map.get(getAttributeSelect(DomainConstants.ATTRIBUTE_DUEDATE_OFFSET));
        }else if (sTypeWorkflowTask.equalsIgnoreCase(sTypeName)){
            taskDueDate = (String)map.get(strAttrworkFlowDueDate);
            taskCompletedDate = (String)map.get(strAttrworkFlowCompletinDate);
            dueDateOffset = (String)map.get(getAttributeSelect(DomainConstants.ATTRIBUTE_DUEDATE_OFFSET));
        }

        boolean bDueDateEmpty = (taskDueDate == null || "".equals(taskDueDate) || "null".equals(taskDueDate)) ? true : false;
        boolean bDeltaDueDate = (dueDateOffset != null && !"".equals(dueDateOffset) && !"null".equals(dueDateOffset) && bDueDateEmpty) ? true : false;

        if(!"".equals(taskState)){
            if(taskDueDate == null || "".equals(taskDueDate)){
                dueDate = new Date();
            }else{
                dueDate = eMatrixDateFormat.getJavaDate(taskDueDate);
            }

            if(!taskState.equals(stateComplete) && !taskState.equals(stateCompleted)){
                if(dueDate != null && curDate.after(dueDate)){
                    statusColor = "Red";
                }else{
                    statusColor = "Green";
                }
            }else{
                Date actualCompletionDate = (taskCompletedDate == null || "".equals(taskCompletedDate)) ? new Date() : eMatrixDateFormat.getJavaDate(taskCompletedDate);

                if(dueDate != null && actualCompletionDate.after(dueDate)){
                    statusColor = "Red";
                }else{
                    statusColor = "Green";
                }
            }

            if(statusColor.equals("Red")){
                statusImageString = "<img border='0' src='" + baseURI + "common/images/iconStatusRed.gif' name='red' alt='*' />";
            }else if(statusColor.equals("Green")){
                statusImageString = "<img border='0' src='" + baseURI + "common/images/iconStatusGreen.gif' name='green' alt='*' />";
            }else{
                statusImageString="&#160;";
            }

        } else if(taskState.equals("") || (taskState.equals(stateAssigned) && "Yes".equalsIgnoreCase(assigneeDueDateOpt) && bDueDateEmpty) || (bDueDateEmpty && bDeltaDueDate )){
            statusImageString="&#160;";
        }

		return statusImageString;
	}

	/**
	 * This method returns Inbox Task & WBS Task object details togeather in a MapList for Widgets
	 * @param context
	 * @param args
	 * @return MapList
	 * @throws Exception
	 * @since V6R2014x
	 */
	public MapList getUserTaskForWidgets(Context context, String[] args)
	throws Exception{
		Map programMap = (Map) JPO.unpackArgs(args);
		StringList busSelects = (StringList) programMap.get("JPO_BUS_SELECTS");
		MapList retMapList = new MapList();
		MapList tempIBTaskMapList = new MapList();

		//Fetch Inbox Task object details
        String typePattern = DomainObject.TYPE_INBOX_TASK;
        String whereExpression = "owner == context.user AND current != 'Complete'";
        tempIBTaskMapList = getInboxTaskDetails(context, busSelects, typePattern, whereExpression);
        for(int i=0; i<tempIBTaskMapList.size(); i++){
        	retMapList.add((Map)tempIBTaskMapList.get(i));
        }

        /*
		 * Project Tasks are no longer required in the Widget.
		//Fetch WBS Tasks object details
        try{
        	Class reqClass = Class.forName("com.matrixone.apps.program.Widgets");
        	Class[] classArgs = new Class[2];
            classArgs[0] = Context.class;
            classArgs[1] = String[].class;
            Method reqMethod = reqClass.getMethod("getUserTasks", classArgs);
        	Object[] methodArgs = new Object[2];
        	methodArgs[0] = context;
        	methodArgs[1] = args;
        	MapList tempWBSTaskMapList = (MapList) reqMethod.invoke(null, methodArgs);
        	for(int i=0; i<tempWBSTaskMapList.size(); i++){
            	retMapList.add((Map)tempWBSTaskMapList.get(i));
        	}
        }catch(Exception e){
        }
		*/
        return retMapList;
	}

	/**
	 * This method returns the details of Inbox Task for a perticular user
	 * @param context
	 * @param busSelects
	 * @param typePattern
	 * @param whereExpression
	 * @return MapList
	 * @throws Exception
	 * @since V6R2014x
	 */
	private MapList getInboxTaskDetails(Context context, StringList busSelects, String typePattern, String whereExpression)
	throws Exception{

        MapList returnMapList= DomainObject.findObjects(context,
        		typePattern,
				QUERY_WILDCARD,  // namepattern
				QUERY_WILDCARD,  // revpattern
				QUERY_WILDCARD,  // owner pattern
				QUERY_WILDCARD,  // vault pattern
				whereExpression, // where exp
				true,
				busSelects);

        return returnMapList;
	}

	/**
     * To get the quick task complete link
     * @param context
     * @param args
     * @return StringList
     * @throws Exception
     * @since V6R2015x
     */
	public StringList getQuickTaskCompleteLink(Context context, String [] args) throws Exception{
		HashMap programMap        = (HashMap) JPO.unpackArgs(args);
	    MapList relBusObjPageList = (MapList)programMap.get("objectList");
		StringList slLinks = new StringList(relBusObjPageList.size());
		String sTaskLink = "";
	    for (int i=0; i < relBusObjPageList.size(); i++) {
	         Map collMap = (Map)relBusObjPageList.get(i);
	         String sTaskType  = (String)collMap.get(DomainObject.SELECT_TYPE);
	         String sTaskId  = (String)collMap.get(DomainObject.SELECT_ID);
	         String routeTaskAction  = (String)collMap.get("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_ACTION +"]");
	         if(sTypeInboxTask.equals(sTaskType) && routeTaskAction.equalsIgnoreCase("Approve")){
	        	 sTaskLink = "javascript:emxTableColumnLinkClick('../components/emxTaskCompletePreProcess.jsp?action=Approve&amp;summaryPage=true&amp;emxSuiteDirectory=components&amp;suiteKey=Components&amp;objectId=" + sTaskId + "', null, null, 'false', 'listHidden', '', null, 'true')";
	         }else if(sTypeInboxTask.equals(sTaskType) && (routeTaskAction.equalsIgnoreCase("Comment") || routeTaskAction.equalsIgnoreCase("Notify Only"))){
	        	 sTaskLink = "javascript:emxTableColumnLinkClick('../components/emxTaskCompletePreProcess.jsp?action=Complete&amp;summaryPage=true&amp;emxSuiteDirectory=components&amp;suiteKey=Components&amp;objectId=" + sTaskId + "', null, null, 'false', 'listHidden', '', null, 'true')";
	         }else{
	        	 sTaskLink = "javascript:emxTableColumnLinkClick('../components/emxUserTasksSummaryLinksProcess.jsp?fromPage=Complete&amp;emxSuiteDirectory=components&amp;suiteKey=Components&amp;emxTableRowId=" + sTaskId + "', null, null, 'false', 'listHidden', '', null, 'true')";
	         }
	         sTaskLink  = "<a href=\"" + sTaskLink + "\">" + "<img src=\"" + "../common/images/buttonDialogDone.gif" + "\" width=\"16px\" height=\"16px\"/>" + "</a>";
	         slLinks.add(sTaskLink);
	    }
		return slLinks;
	}

	/**
     * To get the Approval Status
     * @param context
     * @param args
     * @return StringList
     * @throws Exception
     * @since V6R2015x
     */
	public StringList getApprovalStatusInfo(Context context, String [] args) throws Exception{
		
		 final String POLICY_INBOX_TASK_STATE_COMPLETE = PropertyUtil.getSchemaProperty(context, "Policy", DomainObject.POLICY_INBOX_TASK, "state_Complete");
         final String POLICY_INBOX_TASK_STATE_REVIEW = PropertyUtil.getSchemaProperty(context, "Policy", DomainObject.POLICY_INBOX_TASK, "state_Review");
         final String STRING_COMPLETED = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.LifecycleTasks.Completed", context.getLocale());
         final String STRING_APPROVED =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Approved", context.getLocale());
         final String STRING_REJECTED =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Rejected", context.getLocale());
         final String STRING_ABSTAINED =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Abstained", context.getLocale());
         final String STRING_AWAITING_REVIEW =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.NeedsReview", context.getLocale());
         final String STRING_AWAITING_APPROVAL =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.LifecycleTasks.AwaitingApproval",context.getLocale());   
		 final String STRING_PENDING =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context,"emxFramework.LifecycleTasks.Pending",context.getLocale());
         final String STRING_ROUTE_STOPPED = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.LifecycleTasks.RouteStopped", context.getLocale());
         final String STRING_AWAITING_COMMENT =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context,"emxFramework.LifecycleTasks.AwaitingComment",context.getLocale());
		 final String STRING_COMMENTED =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context,"emxFramework.LifecycleTasks.Commented",context.getLocale());
		 final String STRING_NOTIFICATION_SENT =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context,"emxFramework.LifecycleTasks.NotificationSent",context.getLocale());
		HashMap programMap        = (HashMap) JPO.unpackArgs(args);
	    MapList relBusObjPageList = (MapList)programMap.get("objectList");
		StringList slLinks = new StringList(relBusObjPageList.size());
		String sTaskLink = "";
		String contextUser = (String)context.getUser();
	    for (int i=0; i < relBusObjPageList.size(); i++) {
	         Map collMap = (Map)relBusObjPageList.get(i);
			 //System.out.println("getApprovalStatusInfo : collMap : " + collMap);
	         String sTaskType  = (String)collMap.get(DomainObject.SELECT_TYPE);
			 String sTaskAction  = (String)collMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_ACTION));
	         String strRouteOwner =  (String)collMap.get(DomainObject.SELECT_OWNER);
	         String strCurrentState  = (String)collMap.get(DomainObject.SELECT_CURRENT);
	         String strApprovalStatus  = (String)collMap.get(strAttrTaskApprovalStatus);
	         String strRouteStatus  = (String)collMap.get(routeApprovalStatusSelectStr);
	         
	         if(sTypeInboxTask.equals(sTaskType)){
	        	 if (POLICY_INBOX_TASK_STATE_COMPLETE.equalsIgnoreCase(strCurrentState)) {
                         if ("Approve".equals(strApprovalStatus)) {
                        	 slLinks.add(STRING_APPROVED);
                         }
                         else if ("Reject".equals(strApprovalStatus)) {
                        	 slLinks.add(STRING_REJECTED);
                         }
                         else if ("Abstain".equals(strApprovalStatus)) {
                        	 slLinks.add(STRING_ABSTAINED);
                         }
                         else {
							 
							 if(UIUtil.isNotNullAndNotEmpty(sTaskAction) && "Comment".equalsIgnoreCase(sTaskAction)) {
								 slLinks.add(STRING_COMMENTED);
							 } else if(UIUtil.isNotNullAndNotEmpty(sTaskAction) && "Notify Only".equalsIgnoreCase(sTaskAction)) {
								 slLinks.add(STRING_NOTIFICATION_SENT);
							 } else {								 
                        	 slLinks.add(STRING_COMPLETED);
                         }
                     }
                     }
                     else if(POLICY_INBOX_TASK_STATE_REVIEW.equals(strCurrentState)){
						 
                    	 slLinks.add(STRING_AWAITING_REVIEW);
                     }
                     else {
                    	 if ("Stopped".equals(strRouteStatus)) {
                    		 slLinks.add(STRING_ROUTE_STOPPED);
                         } else {
                        	/* if((UIUtil.isNotNullAndNotEmpty(strRouteOwner)) && strRouteOwner.equals(contextUser)){
                        		slLinks.add(STRING_PENDING);
							 }
                        	else{*/
							 if(UIUtil.isNotNullAndNotEmpty(sTaskAction) && "Comment".equalsIgnoreCase(sTaskAction)) {
								 slLinks.add(STRING_AWAITING_COMMENT);
							 }	else  if(UIUtil.isNotNullAndNotEmpty(sTaskAction) && "Approve".equalsIgnoreCase(sTaskAction)) {
                        	 slLinks.add(STRING_AWAITING_APPROVAL);
                         }
                        	 
                         //}
                     }
                     }
	         }else{
	        	 slLinks.add(DomainConstants.EMPTY_STRING);
	         }
	    }
		return slLinks;
	}   

	/**
	 * Method to set value of Responsible Role in hidden field added on Change Assignee form.
	 * @param context
	 * @param args
	 * @return script for hidden field and its value.
	 * @throws Exception
	 */
	public String getAssignedRolesForTask (Context context,String [] args) throws Exception
	{
		String isResponsibleRoleEnabled = DomainConstants.EMPTY_STRING;
		StringBuilder sbTaskRole = new StringBuilder();
		sbTaskRole.append("<input type = \"hidden\" name =\"taskRole\" id=\"taskRole\">");
		try {
			isResponsibleRoleEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.ResponsibleRoleForSignatureMeaning.Preserve");
			String isFDAEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.EnableFDA");		
			if(UIUtil.isNotNullAndNotEmpty(isFDAEnabled) && isFDAEnabled.equalsIgnoreCase("true") && UIUtil.isNotNullAndNotEmpty(isResponsibleRoleEnabled) && isResponsibleRoleEnabled.equalsIgnoreCase("true"))
			{
				HashMap programMap = (HashMap)JPO.unpackArgs(args);
				Map requestMap = (Map)programMap.get("requestMap");
				String strInboxTaskId = (String) requestMap.get("objectId");
				DomainObject dObjInboxTask = DomainObject.newInstance(context, strInboxTaskId);
				String strInboxTaskInfo = dObjInboxTask.getAttributeValue(context,DomainConstants.ATTRIBUTE_ROUTE_TASK_USER);	
				sbTaskRole
				.append("<script>var roleField = document.getElementById('taskRole');roleField.value=\"").append(strInboxTaskInfo).append("\";</script>");
			}
			else
				sbTaskRole
				.append("<script>var roleField = document.getElementById('taskRole');roleField.value=\"").append(DomainConstants.EMPTY_STRING).append("\";</script>");
			
		} catch (Exception e) {
			isResponsibleRoleEnabled = "false";
		}
		return sbTaskRole.toString();
	}

	/**
	 * Access function to show Responsible Role field on Task properties and Change Assignee form.
	 * @param context
	 * @param args
	 * @return true to show field , false to not show field.
	 * @throws Exception
	 */
	public boolean showResponsibleRole(Context context, String[] args) throws Exception
	{
		boolean flag = false;
		String isResponsibleRoleEnabled = DomainConstants.EMPTY_STRING;
		try {

			isResponsibleRoleEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.ResponsibleRoleForSignatureMeaning.Preserve");
			String isFDAEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.EnableFDA");
			if(UIUtil.isNotNullAndNotEmpty(isFDAEnabled) && isFDAEnabled.equalsIgnoreCase("true") && UIUtil.isNotNullAndNotEmpty(isResponsibleRoleEnabled) && isResponsibleRoleEnabled.equalsIgnoreCase("true"))
			{
				HashMap programMap = (HashMap)JPO.unpackArgs(args);
				String strInboxTaskId  = (String) programMap.get("objectId");
				DomainObject dObjInboxTask = DomainObject.newInstance(context, strInboxTaskId);
				String strRouteTaskUser = dObjInboxTask.getAttributeValue(context,DomainConstants.ATTRIBUTE_ROUTE_TASK_USER);
				if(UIUtil.isNotNullAndNotEmpty(strRouteTaskUser) && strRouteTaskUser.startsWith("role_"))
				{
					flag = true;
				}
			}
			

		} catch (Exception e) {
			isResponsibleRoleEnabled = "false";
					}
		return flag;
	}

	/**
	 * Method to get value for Responsible Role field on Task properties and Change Assignee form.
	 * @param context
	 * @param args
	 * @return value of Responsible Role.
	 * @throws Exception
	 */
	public String getResponsibleRole (Context context,String [] args) throws Exception
	{
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		Map requestMap = (Map)programMap.get("requestMap");
		String languageStr = (String)requestMap.get("languageStr");
		String strInboxTaskId = (String) requestMap.get("objectId");
		DomainObject dObjInboxTask = DomainObject.newInstance(context, strInboxTaskId);
		String strRouteTaskUser = dObjInboxTask.getAttributeValue(context,DomainConstants.ATTRIBUTE_ROUTE_TASK_USER);
		if(UIUtil.isNotNullAndNotEmpty(strRouteTaskUser) && strRouteTaskUser.startsWith("role_"))
		{
			String strResponsibleRole = i18nNow.getAdminI18NString("Role", PropertyUtil.getSchemaProperty(context, strRouteTaskUser), languageStr);
			return strResponsibleRole;
		}
		return DomainConstants.EMPTY_STRING;

	}

	/**
     * To get the Approval Status
     * @param context
     * @param args
     * @return String
     * @throws Exception
     * @since V6R2015x
     */
	public String getTaskState(Context context, String [] args) throws Exception{
		
		HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		Map requestMap = (Map)programMap.get("requestMap");
		String sLanguage = (String) programMap.get("languageStr");
		System.out.println("sLanguage : "+sLanguage);
	    String strObjectId = (String)requestMap.get("objectId");
	    StringList objectSelects=new StringList();
	    objectSelects.add(DomainObject.SELECT_CURRENT);
		objectSelects.add(DomainObject.SELECT_POLICY);
	    DomainObject taskObj = DomainObject.newInstance(context, strObjectId);
	    Map taskStateMap = taskObj.getInfo(context, objectSelects);
		String taskState = (String)taskStateMap.get(DomainObject.SELECT_CURRENT);
		
		String taskStateName = "";
	    if( null == taskState){
	    	return EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale().getLanguage(),"emxComponents.TaskSummary.StateName");
	    }
	    else{
	    	return i18nNow.getStateI18NString((String)taskStateMap.get(DomainObject.SELECT_POLICY),taskState, context.getLocale().getLanguage());
		
		}
		
		
	}
	
	/**
     * To get the Approval Status
     * @param context
     * @param args
     * @return String
     * @throws Exception
     * @since V6R2015x
     */
	public String getApprovalStatusInfoForInboxTask(Context context, String [] args) throws Exception{
		
		 final String POLICY_INBOX_TASK_STATE_COMPLETE = PropertyUtil.getSchemaProperty(context, "Policy", DomainObject.POLICY_INBOX_TASK, "state_Complete");
         final String POLICY_INBOX_TASK_STATE_REVIEW = PropertyUtil.getSchemaProperty(context, "Policy", DomainObject.POLICY_INBOX_TASK, "state_Review");
         final String STRING_COMPLETED = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.LifecycleTasks.Completed", context.getLocale());
         final String STRING_APPROVED =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Approved", context.getLocale());
         final String STRING_REJECTED =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Rejected", context.getLocale());
         final String STRING_ABSTAINED =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.Abstained", context.getLocale());
         final String STRING_AWAITING_REVIEW =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.Lifecycle.NeedsReview", context.getLocale());
         final String STRING_AWAITING_APPROVAL =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.LifecycleTasks.AwaitingApproval",context.getLocale());   
		 final String STRING_PENDING =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context,"emxFramework.LifecycleTasks.Pending",context.getLocale());
         final String STRING_ROUTE_STOPPED = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.LifecycleTasks.RouteStopped", context.getLocale());
         final String STRING_AWAITING_COMMENT =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context,"emxFramework.LifecycleTasks.AwaitingComment",context.getLocale());
		 final String STRING_COMMENTED =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context,"emxFramework.LifecycleTasks.Commented",context.getLocale());
		 final String STRING_NOTIFICATION_SENT =  EnoviaResourceBundle.getFrameworkStringResourceProperty(context,"emxFramework.LifecycleTasks.NotificationSent",context.getLocale());
		HashMap programMap        = (HashMap) JPO.unpackArgs(args);
		Map requestMap = (Map)programMap.get("requestMap");
	    String strObjectId = (String)requestMap.get("objectId");
		String strApprovalStatusForTask = DomainObject.EMPTY_STRING;
		StringList objectSelects=new StringList();
		objectSelects.add(DomainObject.SELECT_TYPE);
		objectSelects.add(strAttrTaskApprovalStatus);
		objectSelects.add(routeApprovalStatusSelectStr);
		objectSelects.add(DomainObject.SELECT_CURRENT);
		objectSelects.add(DomainObject.SELECT_NAME);
		objectSelects.add(DomainObject.SELECT_OWNER);
		objectSelects.add(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_ACTION));
	         Map collMap = DomainObject.newInstance(context, strObjectId).getInfo(context, objectSelects);
	         String sTaskType  = (String)collMap.get(DomainObject.SELECT_TYPE);
	         String sTaskAction  = (String)collMap.get(getAttributeSelect(DomainObject.ATTRIBUTE_ROUTE_ACTION));
	         String strCurrentState  = (String)collMap.get(DomainObject.SELECT_CURRENT);
	         String strApprovalStatus  = (String)collMap.get(strAttrTaskApprovalStatus);
	         String strRouteStatus  = (String)collMap.get(routeApprovalStatusSelectStr);
			 String strRouteOwner = (String)collMap.get(DomainObject.SELECT_OWNER);
			 String contextUser = (String)context.getUser();
	         
	         if(sTypeInboxTask.equals(sTaskType)){
	        	 if (POLICY_INBOX_TASK_STATE_COMPLETE.equalsIgnoreCase(strCurrentState)) {
                         if ("Approve".equals(strApprovalStatus)) {
                        	 strApprovalStatusForTask=STRING_APPROVED;
                         }
                         else if ("Reject".equals(strApprovalStatus)) {
                        	 strApprovalStatusForTask=STRING_REJECTED;
                         }
                         else if ("Abstain".equals(strApprovalStatus)) {
                        	 strApprovalStatusForTask=STRING_ABSTAINED;
                         }
                         else {
							 if(UIUtil.isNotNullAndNotEmpty(sTaskAction) && "Comment".equalsIgnoreCase(sTaskAction)) {
								 strApprovalStatusForTask=STRING_COMMENTED;
								 
							 } else  if(UIUtil.isNotNullAndNotEmpty(sTaskAction) && "Notify Only".equalsIgnoreCase(sTaskAction)) {
								 strApprovalStatusForTask=STRING_NOTIFICATION_SENT;
							 } else {								 
                        	 strApprovalStatusForTask=STRING_COMPLETED;
                         }
                        	 
                         }
                     }
                     else if(POLICY_INBOX_TASK_STATE_REVIEW.equals(strCurrentState)){
                    	 strApprovalStatusForTask=STRING_AWAITING_REVIEW;
                     }
                     else {
                    	 if ("Stopped".equals(strRouteStatus)) {
                    		 strApprovalStatusForTask=STRING_ROUTE_STOPPED;
                         } else {
							/* if(strRouteOwner.equals(contextUser)){
                        		 strApprovalStatusForTask=STRING_PENDING;
							 }
                        	else{*/
							 if(UIUtil.isNotNullAndNotEmpty(sTaskAction) && "Comment".equalsIgnoreCase(sTaskAction)) {
								 strApprovalStatusForTask= STRING_AWAITING_COMMENT;
							 }	else  if(UIUtil.isNotNullAndNotEmpty(sTaskAction) && "Approve".equalsIgnoreCase(sTaskAction)) {
                        	 strApprovalStatusForTask=STRING_AWAITING_APPROVAL;
							}
                        	//}
                         }
                     }
	         }else{
	        	 strApprovalStatusForTask=DomainConstants.EMPTY_STRING;
	         }
	    
		return strApprovalStatusForTask;
	}   

/**
     * To check if ResponsibleRole is enabled
     * @param context
     * @param args
     * @return boolean
     * @throws Exception
     * @since R419
     */
	public boolean checkIfResponsibleRoleEnabled(Context context, String [] args) throws Exception{
		
		boolean isResponsibleRoleEnabled=false;
		isResponsibleRoleEnabled = InboxTask.checkIfResponsibleRoleEnabled(context);
		return !isResponsibleRoleEnabled;

	}   	

	/**
     * To get Due Date 
     * @param context
     * @param map
     * @return String
     * @throws Exception
     * @since R420
     */
	public static String getDueDate(Context context, Map map) throws Exception{

		String taskDueDate = "";
		String dueDate   = "";
		String dueDateOffset   = "";
		String dueDateOffsetFrom   = "";
		String assigneeSetDueDate   = "";
		String sTypeName = (String) map.get(DomainConstants.SELECT_TYPE);
		if ((DomainObject.TYPE_INBOX_TASK).equalsIgnoreCase(sTypeName))
		{
			taskDueDate = (String)map.get(strAttrCompletionDate);
		}
		else if ((DomainObject.TYPE_TASK).equalsIgnoreCase(sTypeName))
		{
			taskDueDate = (String)map.get(strAttrTaskEstimatedFinishDate);
		}
		else if(DomainConstants.RELATIONSHIP_ROUTE_NODE.equals(sTypeName))
		{
			StringBuffer sb = new StringBuffer();
			taskDueDate = (String)map.get(strAttrCompletionDate);
			dueDateOffset = (String)map.get(getAttributeSelect(DomainObject.ATTRIBUTE_DUEDATE_OFFSET));
			dueDateOffsetFrom = (String)map.get(getAttributeSelect(DomainObject.ATTRIBUTE_DATE_OFFSET_FROM));
			assigneeSetDueDate = (String)map.get(getAttributeSelect(DomainObject.ATTRIBUTE_ASSIGNEE_SET_DUEDATE));
			boolean bDueDateEmpty  = UIUtil.isNullOrEmpty(taskDueDate) ? true : false;
			boolean bDeltaDueDate = (!UIUtil.isNullOrEmpty(dueDateOffset) && bDueDateEmpty) ? true : false;

			if(UIUtil.isNotNullAndNotEmpty(assigneeSetDueDate) && "Yes".equalsIgnoreCase(assigneeSetDueDate)){
				sb.append(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.AssignTasksDialog.AssigneeDueDate"));
			}else if(!bDeltaDueDate){
				sb.append(taskDueDate).append(" ");
			}else{
				sb.append(dueDateOffset).append(" ").append(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale(),"emxComponents.common.DaysFrom")).
				append(" ").append(i18nNow.getRangeI18NString( DomainObject.ATTRIBUTE_DATE_OFFSET_FROM, dueDateOffsetFrom,context.getLocale().getLanguage()));
			}
			taskDueDate = sb.toString();
		}


		return taskDueDate;
	}

	public boolean showTaskCommentsNotRequired(Context context, String [] args) throws Exception{
		HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
       	boolean showTaskComments = ((Boolean)detailsMap.get("showTaskComments")).booleanValue();
       	String showCommentsForTaskApproval = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.ShowCommentsForTaskApproval");
       	
	   	if(showTaskComments){
			return !showTaskComments(context, args) && "true".equalsIgnoreCase(showCommentsForTaskApproval);
		} else{
			return showTaskComments && "true".equalsIgnoreCase(showCommentsForTaskApproval);
		}
	}

	public boolean showCommentsFeild(Context context, String[] args) throws Exception {
		HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
		String routeAction = (String) detailsMap.get("routeAction");
		String showCommentsForTaskApproval = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.ShowCommentsForTaskApproval");

		if ("Approve".equals(routeAction)) {
			return "true".equalsIgnoreCase(showCommentsForTaskApproval);
		}
		return true;
	}
	
	public boolean canEditReviewerCommentsNotRequired(Context context, String[] args) throws Exception{
		HashMap detailsMap = getInboxTaskFormFieldAccessDetails(context, args);
		String routeAction = (String)detailsMap.get("routeAction");
		boolean canEditReviewComments = ((Boolean)detailsMap.get("canEditReviewerComments")).booleanValue();
		if(canEditReviewComments){		
			return !canEditReviewerComments(context, args);
		}else{
			return canEditReviewComments;
		}
	}
	
	private boolean checkForCommentRequired(Context context, String status, String comments) throws FrameworkException{
		String isCommentRequired              = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.EnforceAssigneeApprovalComments");
		String showCommentsForTaskApproval    = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.ShowCommentsForTaskApproval");
		String ignoreCommentsForTaskRejection = EnoviaResourceBundle.getProperty(context,"emxComponentsRoutes.InboxTask.IgnoreComments");
		//Condition to check if the comments are required and task action is approve abstain or reject and if comments field need to be shown
		if("true".equals(isCommentRequired) && ((("Approve".equals(status) || "Abstain".equals(status))  && "true".equals(showCommentsForTaskApproval)) || ("Reject".equals(status) && "false".equalsIgnoreCase(ignoreCommentsForTaskRejection)) || ("Comment".equals(status)))){
			return true;
		}else{
			return false;
		}	
	}
	
	/**
     * Trigger Method to add ownership for owners.
     *
     * @param context - the eMatrix <code>Context</code> object
     * @param args - args contains Context Issue Object, KINDOFOWNER, new owner, old owner
     * @return - int (0 or 1) 0 - If success and 1 - If blocked.
     * @throws Exception if the operation fails
     * @since 2019x.
     */

     public int updateOwnershipAccessonChangeOwner(Context context, String[] args) throws Exception {
        try {
                //Getting the object ID
                String strObjectId = args[0];
                String kindOfOwner = args[1];
                String newOwner = args[2];
                String oldOwner = args[3];
                String updateOwner = MqlUtil.mqlCommand(context, "get env $1", "NEED_TO_UPDATE_OWNERSHIP");
                if(UIUtil.isNotNullAndNotEmpty(updateOwner) && "false".equalsIgnoreCase(updateOwner)) {
                	return 0;
                }
                if("owner".equals(kindOfOwner) && !newOwner.equals("User Agent")){
                	StringList accessNames = DomainAccess.getLogicalNames(context, strObjectId);
                	DomainObject busObject = new DomainObject();
                	busObject.setId(strObjectId);
    				StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);                	
					busSel.add(DomainConstants.SELECT_HAS_CHANGEOWNER_ACCESS);
 					busSel.add(routeIdSelectStr);
 					busSel.addElement(strAttrRouteOwnerTask);
					busSel.addElement(strAttrRouteOwnerUGChoice);
					busSel.addElement(SELECT_ROUTE_NODE_ID);
           			Map busMap = busObject.getInfo(context, busSel);
    			 String routeId = (String) busMap.get(routeIdSelectStr);
    			 String grantAccessForNewUser = null;
    			 String defaultAccessOnRoute = null;
    			 if(!"User Agent".equals(oldOwner)) {
    				 grantAccessForNewUser = Route.getAccessbits(context,routeId,oldOwner);
    				 if(UIUtil.isNotNullAndNotEmpty(grantAccessForNewUser)){
    					 defaultAccessOnRoute = DomainAccess.getLogicalName(context, routeId,grantAccessForNewUser); 
    					}
    			 }
    			 boolean flag = true;
    			 String cmd = "list role $1 select person dump";
    			 String result = MqlUtil.mqlCommand(context, cmd, newOwner+"_PRJ");
    			 if(UIUtil.isNullOrEmpty(result)){
    				 flag = false;
                	}             
				if (("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS)) || "true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGEOWNER_ACCESS))) && flag) {
                    String newOwnerId = PersonUtil.getPersonObjectID(context, newOwner);
                	String defaultAccess = (String)accessNames.get(accessNames.size()-1);
                    	 DomainAccess.createObjectOwnership(context, strObjectId, newOwnerId, defaultAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
    				 if(UIUtil.isNotNullAndNotEmpty(grantAccessForNewUser) && UIUtil.isNotNullAndNotEmpty(defaultAccessOnRoute)){
    					 DomainAccess.createObjectOwnership(context, routeId, newOwnerId, defaultAccessOnRoute, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
    				 }
                    }              
    			 result = MqlUtil.mqlCommand(context, cmd, oldOwner+"_PRJ");
           			flag = true;
    			 if(UIUtil.isNullOrEmpty(result)){
    				 flag = false;
    			 }
				if(flag){              			                 	  
					if ("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS)) || "true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGEOWNER_ACCESS))) { 
						String oldOwnerId = PersonUtil.getPersonObjectID(context, oldOwner);
						String defaultAccess = (String)accessNames.get(0); 
						DomainAccess.createObjectOwnership(context, strObjectId,oldOwnerId, defaultAccess , DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, true); 
    				 }
    			 }             
				
				if(UIUtil.isNullOrEmpty(routeId)) {
					return 0;
				}
				String stAttrRouteOwnerTask=(String)busMap.get(strAttrRouteOwnerTask);
				String stAttrRouteOwnerUGChoice=(String)busMap.get(strAttrRouteOwnerUGChoice);
				
				DomainObject routeObj = new DomainObject();
				routeObj.setId(routeId);
				
			    StringList objectSelects = new StringList();
			    objectSelects.add(DomainConstants.SELECT_OWNER);
				
				Map routeInfoMap= routeObj.getInfo(context, objectSelects);
				String routeOwner= (String)routeInfoMap.get(DomainConstants.SELECT_OWNER);			
				
				if("true".equalsIgnoreCase(stAttrRouteOwnerTask) && !"User Agent".equals(oldOwner) && oldOwner.equalsIgnoreCase(routeOwner))
				 {
					boolean checkPerson=false;
					if(UIUtil.isNotNullAndNotEmpty(stAttrRouteOwnerUGChoice))
					{
						MapList ugMembers=FrameworkUtil.getProjectGroupAssignees(context, stAttrRouteOwnerUGChoice);
						int ugMembersSize=ugMembers.size();
						for (int i = 0; i < ugMembersSize; i++) {
                           Map objectMap = (Map) ugMembers.get(i);
						   String personName = (String) objectMap.get(DomainObject.SELECT_NAME);
						   if(newOwner.equalsIgnoreCase(personName))
						   {
							   checkPerson=true;
							   break;
						   }
						}
						if(!checkPerson)
						{
							StringList selectable = new StringList(1);
                            selectable.add(SELECT_ATTRIBUTE_TITLE);
                            DomainObject ugObject = new DomainObject();
                            ugObject.setId(stAttrRouteOwnerUGChoice);
                            Map mapAssigneeInfo = ugObject.getInfo (context, selectable);
                            String ugTitle=(String)mapAssigneeInfo.get(SELECT_ATTRIBUTE_TITLE);
							
							String msg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.Common.CanNotChangeAssignee");
							msg+=" "+"'"+ugTitle+"'";
			                String strCommand = "error $1";
		                    MqlUtil.mqlCommand(context, strCommand, msg);
		                    return 1;
                        }
					}
					HashMap attributesMap = new HashMap();
					attributesMap.put(sAttrRouteOwnerTask,"FALSE")	;
					attributesMap.put(sAttrRouteOwnerUGChoice,"")	;
					busObject.setAttributeValues(context, attributesMap);	
					
					String routeNodeId = (String) busMap.get(SELECT_ROUTE_NODE_ID);
			        Route routeObject = (Route)DomainObject.newInstance(context, routeId);
			        String relId = routeObject.getRouteNodeRelId(context, routeNodeId);
			        DomainRelationship.setAttributeValues(context, relId, attributesMap);
				 }
                }
                return 0;
        }
        catch (Exception e) {			
        	return 1;
		}        
     }
	 
	 /**
    * Returns an error message when any of the contents attached to the route is in a state prior 
    * to the route blocking state. Thus preventing user from completing the task
    * @param context
    * @param args
    * @return
    * @throws Exception
    */
   public String isRouteContentInFutureState(Context context, String[] args)throws Exception {
	   String sCannotCompleteTaskAlert = "";
	   SelectList slObjSelects = new SelectList(5);
   	   SelectList slRelSelects = new SelectList(1);
   	   String relPattern = Route.RELATIONSHIP_OBJECT_ROUTE;
   	   slObjSelects.addId();   	   
   	   slObjSelects.addType();
   	   slObjSelects.addName();
   	   slObjSelects.addRevision();
   	   slObjSelects.addPolicy();
   	   slRelSelects.add(Route.SELECT_ROUTE_BASESTATE);
   	   MapList contentObjInfo = new MapList(1);
	   try{
		   Map programMap = (Map)JPO.unpackArgs(args);
		   String objectId = (String) programMap.get("objectId");
		   DomainObject route = DomainObject.newInstance(context, objectId);
		   ContextUtil.pushContext(context);
       	   contentObjInfo = route.getRelatedObjects(context,
   					                relPattern , 
   					                "*",                            
   					                slObjSelects,                   
   					                slRelSelects,                    
   					                true,                          
   					                false,                            
   					                (short)1,                       
   					                "",                          
   					                null);
       	   String sPolicy, routeBaseState, routeBaseStateSymbolicName, sContentId;                
	       for(Object obj: contentObjInfo){
	        	Map contentObj = (Map)obj;
	        	sContentId = (String)contentObj.get(DomainConstants.SELECT_ID);
	        	routeBaseStateSymbolicName = (String)contentObj.get(Route.SELECT_ROUTE_BASESTATE);
	        	sPolicy = (String) contentObj.get(DomainConstants.SELECT_POLICY);
	        	routeBaseState = FrameworkUtil.lookupStateName(context, sPolicy, routeBaseStateSymbolicName);
	        	if(UIUtil.isNotNullAndNotEmpty(routeBaseState)){
	        	boolean bRouteContentInFutureState = com.matrixone.apps.domain.util.PolicyUtil.checkState(context, sContentId, routeBaseState, com.matrixone.apps.domain.util.PolicyUtil.LT);
	        	if(bRouteContentInFutureState){
	        		String sLanguage = (String) programMap.get("languageStr");
	        		sLanguage = UIUtil.getLanguage(sLanguage);
	        		Locale locale = new Locale(sLanguage);
	            	String sContentType = (String) contentObj.get(DomainConstants.SELECT_TYPE);
	            	sContentType = i18nNow.getTypeI18NString(sContentType, sLanguage);
	            	String sContentName = (String) contentObj.get(DomainConstants.SELECT_NAME);
	            	String sContentRevision = (String) contentObj.get(DomainConstants.SELECT_REVISION);
					routeBaseState = i18nNow.getStateI18NString(sPolicy, routeBaseState, sLanguage);
	            	sCannotCompleteTaskAlert = MessageUtil.getMessage(context, null, "emxComponents.Common.CannotPromoteTaskForFutureStates", 
	    		    		new String[]{sContentType, sContentName, sContentRevision, routeBaseState}, null, locale, "emxComponentsStringResource");        		
	        		break;
	        	}
	        	}
	        }
	   }finally{
		   ContextUtil.popContext(context);
	   }
	   return sCannotCompleteTaskAlert;
   }
	 
	 /**
     * check trigger on promote event of state "Assigned" of policy "Inbox Task"
     * To check if the connected route content is in proper state condition state
     *
     * @param context the eMatrix Context object
     * @param holds inboxtaskid
     * @return int - "0" if check is true, "1" if check is false
     * @throws Exception if the operation fails
     */
    public int triggerRouteContentInFutureStateCheck(matrix.db.Context context, String[] args)
        throws Exception
    {
    	String fromAutoComplete = MqlUtil.mqlCommand(context, "get env $1", "MX_TASK_AUTO_COMPLETE");
    	if ("true".equals(fromAutoComplete)) {
			return 0;
		}
        //build selects
        StringList selects = new StringList();
        selects.addElement("from[" + RELATIONSHIP_ROUTE_TASK + "].to.id");
		selects.addElement(DomainObject.SELECT_NAME);

        //get the details required
        Map taskMap = getInfo(context, selects);
        String sRouteId = (String) taskMap.get("from[" + RELATIONSHIP_ROUTE_TASK + "].to.id");
		
		HashMap programMap = new HashMap();
		programMap.put("objectId", sRouteId);
		programMap.put("languageStr", (String) context.getLocale().getLanguage());
		String sCannotCompleteTaskAlert =  isRouteContentInFutureState(context, JPO.packArgs(programMap));
		
		if(sCannotCompleteTaskAlert.length() != 0)
		{
			String msg = (String) taskMap.get(DomainObject.SELECT_NAME) + " :: " + sCannotCompleteTaskAlert;
			String strCommand = "notice $1";
			MqlUtil.mqlCommand(context, strCommand, msg);
            return 1;
		}

        return 0;
    }
    
    
    /**
     * This method will get the selected user group value for the route and route template if the route node is group.
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public Vector showRouteTaskSelectedUserGroup(Context context, String[] args) throws Exception
    {
        Vector taskActionVec = new Vector();
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        MapList objectList = (MapList)programMap.get("objectList");
        Map paramList      = (Map)programMap.get("paramList");
        String sLanguage = (String)paramList.get("languageStr");
        Iterator objectListItr = objectList.iterator();
 	   String proxyGoupType = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
        while(objectListItr.hasNext())
        {
            Map objectMap = (Map) objectListItr.next();
            String selectedUserGRoup = (String)objectMap.get(getAttributeSelect(PropertyUtil.getSchemaProperty(context,"attribute_ChooseUsersFromUserGroup")));		   
 		   String isRelAsigneeProxyGroup   = (String)objectMap.get("to.type.kindof["+ proxyGoupType +"]");
 		   if("False".equalsIgnoreCase(isRelAsigneeProxyGroup)){
 			   taskActionVec.add("");
 		   } else if("True".equalsIgnoreCase(selectedUserGRoup)){
 			   taskActionVec.add(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(sLanguage),"emxComponents.Common.Yes"));
 		   } else {
 			   taskActionVec.add(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",new Locale(sLanguage),"emxComponents.Common.No"));
 		   }
 		   		  
        }

        return taskActionVec;
    }
    /**
     * This method is used to clear the attribute Route owner task and Route Owner UG Choice
     * 
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
     public int updateAttributeOnChangeAssignee(Context context, String[] args) throws Exception {
        try {
			  String relID=args[0];
			  String currentOwner=args[1];
			  String type=args[2];
			  if(DomainConstants.TYPE_ROUTE_TEMPLATE.equalsIgnoreCase(type)) {
				  return 0;
			  }
              if(UIUtil.isNotNullAndNotEmpty(relID)) {
				StringList selectables = new StringList(3);
				selectables.addElement(strAttrRouteOwnerUGChoice);
				selectables.addElement(strAttrRouteOwnerTask);
				selectables.addElement("from.id[connection]");
				selectables.addElement("to.name");
				
		        Map relValues = (Map) DomainRelationship.getInfo(context, new String[]{relID}, selectables).get(0);
				
				String stAttrRouteOwnerUGChoice=(String)relValues.get(strAttrRouteOwnerUGChoice);
				String stAttrRouteOwnerTask=(String)relValues.get(strAttrRouteOwnerTask);
				String routeId=(String)relValues.get("from.id[connection]");
				String newOwner=(String)relValues.get("to.name");
			    DomainObject busObject = new DomainObject();
		        busObject.setId(routeId);
				
			    StringList objectSelects = new StringList();
			    objectSelects.add(DomainConstants.SELECT_OWNER);
				
				Map routeInfoMap= busObject.getInfo(context, objectSelects);
    
				String routeOwner= (String)routeInfoMap.get(DomainConstants.SELECT_OWNER);
				String contextUser=context.getUser();

				HashMap attributesMap = new HashMap();
				if("TRUE".equalsIgnoreCase(stAttrRouteOwnerTask) && contextUser.equalsIgnoreCase(routeOwner))
				{
				 boolean checkPerson=false;
					if(UIUtil.isNotNullAndNotEmpty(stAttrRouteOwnerUGChoice))
					{
						MapList ugMembers=FrameworkUtil.getProjectGroupAssignees(context, stAttrRouteOwnerUGChoice);
						int ugMembersSize=ugMembers.size();
						for (int i = 0; i < ugMembersSize; i++) {
                           Map objectMap = (Map) ugMembers.get(i);
						   String personName = (String) objectMap.get(DomainObject.SELECT_NAME);
						   if(newOwner.equalsIgnoreCase(personName))
						   {
							   checkPerson=true;
							   break;
						   }
						}
						if(!checkPerson)
						{
							StringList selectable = new StringList(1);
                            selectable.add(SELECT_ATTRIBUTE_TITLE);
                            DomainObject ugObject = new DomainObject();
                            ugObject.setId(stAttrRouteOwnerUGChoice);
                            Map mapAssigneeInfo = ugObject.getInfo (context, selectable);
                            String ugTitle=(String)mapAssigneeInfo.get(SELECT_ATTRIBUTE_TITLE);
							
							String msg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.Common.CanNotChangeAssignee");
							msg+=" "+"'"+ugTitle+"'";
			                String strCommand = "error $1";
		                    MqlUtil.mqlCommand(context, strCommand, msg);
		                    return 1;
                        }
					}
				 attributesMap.put(sAttrRouteOwnerTask,"FALSE")	;
				 attributesMap.put(sAttrRouteOwnerUGChoice,"")	;
				 DomainRelationship.setAttributeValues(context, relID, attributesMap);
                }
              }
            }
        catch (Exception e) {			
        	    return 1;
		}  
        return 0;
    }
     
}
