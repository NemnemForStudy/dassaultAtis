import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TimeZone;
import java.util.Vector;

import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;


import   javax.json.Json;
import java.util.stream.Collectors;

import matrix.db.AttributeType;
import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.Pattern;
import matrix.util.StringList;

import com.matrixone.apps.common.MemberRelationship;
import com.matrixone.apps.common.DependencyRelationship;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.DateUtil;
import com.matrixone.apps.domain.util.DebugUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.mxType;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.framework.ui.UITable;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.ProjectSpace;
import com.matrixone.apps.program.ResourceLoading;
import com.matrixone.apps.program.Task;
import com.matrixone.apps.program.URL;
import com.matrixone.apps.program.fiscal.Helper;
import com.matrixone.apps.domain.util.i18nNow;
import com.dassault_systemes.enovia.e6wv2.foundation.db.JPOUtil;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Dataobject;
import com.dassault_systemes.enovia.tskv2.ProjectSequence;
import com.matrixone.apps.domain.DomainSymbolicConstants;

import com.matrixone.apps.domain.util.FrameworkException;



public class emxProgramUIBase_mxJPO {

	private final static String ATTRIBUTE_PRIORITY = PropertyUtil.getSchemaProperty("attribute_Priority");
	private final static String SELECT_ATTRIBUTE_PRIORITY ="attribute["+ATTRIBUTE_PRIORITY+"]";
	private final static String SELECT_TASK_DELIVERABLE_CURRENT ="to["+DomainConstants.RELATIONSHIP_TASK_DELIVERABLE+"]+.from.current";
	private final static String SELECT_RELATIONSHIP_TASK_DELIVERABLE = "to["+DomainConstants.RELATIONSHIP_TASK_DELIVERABLE+"]";
	private final static String SELECT_RELATIONSHIP_ASSIGNED_TASKS ="to["+DomainConstants.RELATIONSHIP_ASSIGNED_TASKS+"]";
	private final static String SELECT_RELATIONSHIP_ASSIGNED_TASKS_FROM_NAME ="to["+DomainConstants.RELATIONSHIP_ASSIGNED_TASKS+"].from.name";
	private final static String SELECT_ASSIGNED_TASKS_PERCENT_ALLOCATION  = "to["+DomainRelationship.RELATIONSHIP_ASSIGNED_TASKS+"].attribute["+ProgramCentralConstants.ATTRIBUTE_PERCENT_ALLOCATION+"]";
	private final static String SELECT_TASK_DELIVERABLE_TASK_ESTIMATED_FINISH_DATA  = "to["+DomainConstants.RELATIONSHIP_TASK_DELIVERABLE+"].from.attribute["+DomainRelationship.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE+"]";
	private final static String SELECT_FROM_SUBTASK = "from["+DomainConstants.RELATIONSHIP_SUBTASK+"]";
	private final static String SELECT_FROM_ATTRIBUTE_TASK_EXTIMATED_FINISH_DATE = "from.attribute["+DomainRelationship.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE+"]";
    private final static String SELECT_ESTIMATED_END_DATE = "attribute[" + DomainConstants.ATTRIBUTE_ESTIMATED_END_DATE + "]";
    private final static String SELECT_ATTRIBUTE_ACTUAL_END_DATE = "attribute[" + DomainConstants.ATTRIBUTE_ACTUAL_END_DATE + "]";
    private final static String ATTRIBUTE_ASSESSMENT_STATUS = PropertyUtil.getSchemaProperty("attribute_AssessmentStatus");
    private final static String SELECT_ATTRIBUTE_ASSESSMENT_STATUS ="attribute["+ATTRIBUTE_ASSESSMENT_STATUS+"]";
    private final static String ATTRIBUTE_ASSESSMENT_COMMENTS = PropertyUtil.getSchemaProperty("attribute_AssessmentComments");
    private final static String SELECT_ATTRIBUTE_ASSESSMENT_COMMENTS ="attribute["+ATTRIBUTE_ASSESSMENT_COMMENTS+"]";
    private final static String ATTRIBUTE_RESOURCE_STATUS = PropertyUtil.getSchemaProperty("attribute_ResourceStatus");
    private final static String SELECT_ATTRIBUTE_RESOURCE_STATUS ="attribute["+ATTRIBUTE_RESOURCE_STATUS+"]";
    private final static String ATTRIBUTE_RESOURCE_COMMENTS = PropertyUtil.getSchemaProperty("attribute_ResourceComments");
    private final static String SELECT_ATTRIBUTE_RESOURCE_COMMENTS ="attribute["+ATTRIBUTE_RESOURCE_COMMENTS+"]";
    private final static String ATTRIBUTE_SCHEDULE_STATUS = PropertyUtil.getSchemaProperty("attribute_ScheduleStatus");
    private final static String SELECT_ATTRIBUTE_SCHEDULE_STATUS ="attribute["+ATTRIBUTE_SCHEDULE_STATUS+"]";
    private final static String ATTRIBUTE_SCHEDULE_COMMENTS = PropertyUtil.getSchemaProperty("attribute_ScheduleComments");
    private final static String SELECT_ATTRIBUTE_SCHEDULE_COMMENTS ="attribute["+ATTRIBUTE_SCHEDULE_COMMENTS+"]";
    private final static String ATTRIBUTE_FINANCE_STATUS = PropertyUtil.getSchemaProperty("attribute_FinanceStatus");
    private final static String SELECT_ATTRIBUTE_FINANCE_STATUS ="attribute["+ATTRIBUTE_FINANCE_STATUS+"]";
    private final static String ATTRIBUTE_FINANCE_COMMENTS = PropertyUtil.getSchemaProperty("attribute_FinanceComments");
    private final static String SELECT_ATTRIBUTE_FINANCE_COMMENTS ="attribute["+ATTRIBUTE_FINANCE_COMMENTS+"]";
    private final static String ATTRIBUTE_RISK_STATUS = PropertyUtil.getSchemaProperty("attribute_RiskStatus");
    private final static String SELECT_ATTRIBUTE_RISK_STATUS ="attribute["+ATTRIBUTE_RISK_STATUS+"]";
    private final static String ATTRIBUTE_RISK_COMMENTS = PropertyUtil.getSchemaProperty("attribute_RiskComments");
    private final static String SELECT_ATTRIBUTE_RISK_COMMENTS ="attribute["+ATTRIBUTE_RISK_COMMENTS+"]";
	private final static String SELECT_FROM_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE = "from.attribute["+DomainRelationship.ATTRIBUTE_TASK_ACTUAL_FINISH_DATE+"]";
    private final static String SELECT_DELEVERABLE_NAME = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to.name";
    private final static String ATTRIBUTE_WORK_PHONE_NUMBER = PropertyUtil.getSchemaProperty( "attribute_WorkPhoneNumber" );
    private final static String SELECT_ATTRIBUTE_WORK_PHONE_NUMBER ="attribute["+ATTRIBUTE_WORK_PHONE_NUMBER+"]";
    private final static String RELATIONSHIP_HAS_EFFORTS = PropertyUtil.getSchemaProperty("relationship_hasEfforts");
    private final static String TYPE_DOCUMENTS = PropertyUtil.getSchemaProperty("type_DOCUMENTS");
    private final static String TYPE_EFFORT = PropertyUtil.getSchemaProperty("type_Effort");
    private final static String RELATIONSHIP_ISSUE = PropertyUtil.getSchemaProperty("relationship_Issue" );
    private final static String TYPE_ISSUE = PropertyUtil.getSchemaProperty("type_Issue" );
    private final static String RELATIONSHIP_PROJECT_ASSESSMENT = PropertyUtil.getSchemaProperty("relationship_ProjectAssessment");
    private final static String TYPE_ASSESSMENT	= PropertyUtil.getSchemaProperty("type_Assessment");
    private final static String SELECT_ATTRIBUTE_TASK_ESTIMATED_END_DATE = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE  + "]";

    private Context context;
    
	String sColorRed        = "CC092F";
    String sColorGreen      = "6FBC4B";
    String sColorOrange     = "FF8A2E";
    String sColorGray       = "7F7F7F";
    String sColor025        = "d5e8f2";
    String sColor050        = "78befa";
    String sColor075        = "368ec4";
    String sColor099        = "005686";
    String sColor100        = "003c5a";
    SimpleDateFormat sdf;
    String[] sColors        = { "00AA86", "009DDB", "FEE000","6FBC4B","CC092F","70036B","8DDEE4","C6C68B","007A4C","F564A3","9B2C98"};

    public emxProgramUIBase_mxJPO(Context context, String[] args) throws Exception {
    	String dateTimeFormat =EnoviaResourceBundle.getProperty(context, "eServiceSuites.eMatrixDateFormat");
    	if(ProgramCentralUtil.isNullString(dateTimeFormat))
    	{
    		dateTimeFormat = "MM/dd/yyyy hh:mm:ss aaa";
    	}
    	sdf = new SimpleDateFormat(dateTimeFormat,Locale.US);
    }


    // Projects Dashboard
    public String[] getProjectsDashboardData(Context context, String[] args) throws Exception {


        String[] aResults           = new String[50];
        String[] initargs           = new String[] {};
        HashMap params              = new HashMap();
        HashMap paramMap            = (HashMap) JPO.unpackArgs(args);
        String sOID                 = (String) paramMap.get("objectId");
        String sLanguage            = (String)paramMap.get("languageStr");
        MapList mlProjects;
        MapList mlProjectEntries    = new MapList();
        MapList mlTasks             = new MapList();
        MapList mlDeliverables      = new MapList();
        MapList mlIssues            = new MapList();
        MapList mlAssessments       = new MapList();
        String sOIDParam            = "";

        StringBuilder sbProjects                = new StringBuilder();
        StringBuilder sbTasksWeek               = new StringBuilder();
        StringBuilder sbTasksMonth              = new StringBuilder();
        StringBuilder sbTasksSoon               = new StringBuilder();
        StringBuilder sbTasksOverdue            = new StringBuilder();
        StringBuilder sbTasksCategories         = new StringBuilder();
        StringBuilder sbTasksSeries             = new StringBuilder();
        StringBuilder sbDeliverablesWeek        = new StringBuilder();
        StringBuilder sbDeliverablesMonth       = new StringBuilder();
        StringBuilder sbDeliverablesSoon        = new StringBuilder();
        StringBuilder sbDeliverablesOverdue     = new StringBuilder();
        StringBuilder sbDeliverablesCategories  = new StringBuilder();
        StringBuilder sbDeliverablesSeries      = new StringBuilder();
        StringBuilder sbIssuesWeek              = new StringBuilder();
        StringBuilder sbIssuesMonth             = new StringBuilder();
        StringBuilder sbIssuesSoon              = new StringBuilder();
        StringBuilder sbIssuesOverdue           = new StringBuilder();
        StringBuilder sbIssuesCategories        = new StringBuilder();
        StringBuilder sbIssuesSeries            = new StringBuilder();
        StringBuilder sbCategoriesAssessmentX   = new StringBuilder();
        StringBuilder sbCategoriesAssessmentY   = new StringBuilder();
        StringBuilder sbDataAssessmentR         = new StringBuilder();
        StringBuilder sbDataAssessmentG         = new StringBuilder();
        StringBuilder sbDataAssessmentY         = new StringBuilder();
        StringBuilder sbDataAssessmentN         = new StringBuilder();
        StringBuilder sbCategoriesEffort        = new StringBuilder();
        StringBuilder sbDataEffortPlan          = new StringBuilder();
        StringBuilder sbDataEffortActual        = new StringBuilder();
        StringBuilder sbDataEffortProgress      = new StringBuilder();

        if("".equals(sOID)) {
            mlProjects = (MapList)JPO.invoke(context, "emxProjectSpace", initargs, "getActiveProjects", JPO.packArgs(params), MapList.class);
        } else {
            params.put("objectId", sOID);
            sOIDParam = "&portalMode=true&objectId=" + sOID;
            mlProjects = (MapList)JPO.invoke(context, "emxProgramUI", initargs, "getProjectsOfProgram", JPO.packArgs(params), MapList.class);
        }


        // Panel Header
        String  sSuffix = ProgramCentralConstants.EMPTY_STRING;
        if(ProgramCentralConstants.EMPTY_STRING.equals(sOID)) {
        	sSuffix = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.ActiveProjects", sLanguage);
        } else {
        	sSuffix = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.RelatedProjects", sLanguage);
        }
        sbProjects.append(" <span style='font-weight:bold;color:#7f7f7f;'>").append(mlProjects.size()).append("</span> ");
        sbProjects.append(sSuffix);

        // Panel Chart Headers
        String sHeaderTasks         = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.PendingTasks", sLanguage);
        String sHeaderDeliverables  = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.PendingDeliverables", sLanguage);
        String sHeaderIssues        = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.PendingIssues", sLanguage);
        String sHeaderAssessments   = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxFramework.Command.Assessment", sLanguage);
        String sHeaderEfforts       = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Effort", sLanguage);
        String sLabelThisWeek       = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.ThisWeek", sLanguage);
        String sLabelThisMonth      = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.ThisMonth", sLanguage);
        String sLabelSoon           = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Soon", sLanguage);
        String sLabelOverdue        = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Overdue", sLanguage);
        String sLabelPlanned        = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Planned", sLanguage);
        String sLabelActual         = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Actual", sLanguage);
        String sLabelProgress       = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.WeeklyTimesheet.Progress", sLanguage);

        sbCategoriesAssessmentX.append("\"").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.People.ProjectAssignmentFilterSummary", sLanguage)).append("\",");
        sbCategoriesAssessmentX.append("\"").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Resource", sLanguage)).append("\",");
        sbCategoriesAssessmentX.append("\"").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Schedule", sLanguage)).append("\",");
        sbCategoriesAssessmentX.append("\"").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Finance", sLanguage)).append("\",");
        sbCategoriesAssessmentX.append("\"").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Risk", sLanguage)).append("\"");
        // get the number of Projects allowed to display in Project Bar chart IR-817432
        String strNumberOfTasks =  EnoviaResourceBundle.getProperty(context, "emxProgramCentral.ProjectSummary.ChartsToDisplay");
		int numberOfProjects = Integer.parseInt(strNumberOfTasks);
	if (mlProjects.size() > 0) {

            StringList busSelects = new StringList();
            StringList relSelects = new StringList();
            busSelects.add(DomainObject.SELECT_ID);
            busSelects.add(DomainObject.SELECT_TYPE);
            busSelects.add(DomainObject.SELECT_NAME);
            busSelects.add(DomainObject.SELECT_CURRENT);
            busSelects.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            busSelects.add(Task.SELECT_TASK_ESTIMATED_DURATION);
            busSelects.add(ProgramCentralConstants.SELECT_ATTRIBUTE_TOTAL_EFFORT);
            busSelects.add(SELECT_ATTRIBUTE_PRIORITY);
            busSelects.add("type.kindof[DOCUMENTS]");
            busSelects.add(SELECT_RELATIONSHIP_TASK_DELIVERABLE);
            busSelects.add(SELECT_TASK_DELIVERABLE_CURRENT);
            busSelects.add(SELECT_RELATIONSHIP_ASSIGNED_TASKS);
            busSelects.add(SELECT_ASSIGNED_TASKS_PERCENT_ALLOCATION);
            busSelects.add(SELECT_FROM_SUBTASK);
            busSelects.add(DomainObject.SELECT_PERCENTCOMPLETE);
            relSelects.add(SELECT_FROM_ATTRIBUTE_TASK_EXTIMATED_FINISH_DATE);
            relSelects.add("from.current");

            StringList busSelectsIssues = new StringList();
            busSelectsIssues.add(SELECT_ESTIMATED_END_DATE);
            busSelectsIssues.add(DomainObject.SELECT_CURRENT);
            busSelectsIssues.add(DomainObject.SELECT_ID);

            StringList busSelectsAssessments = new StringList();
            busSelectsAssessments.add(DomainObject.SELECT_ORIGINATED);
            busSelectsAssessments.add(DomainObject.SELECT_MODIFIED);
            busSelectsAssessments.add(DomainObject.SELECT_ORIGINATOR);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_ASSESSMENT_STATUS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_ASSESSMENT_COMMENTS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_RESOURCE_STATUS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_RESOURCE_COMMENTS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_SCHEDULE_STATUS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_SCHEDULE_COMMENTS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_FINANCE_STATUS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_FINANCE_COMMENTS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_RISK_STATUS);
            busSelectsAssessments.add(SELECT_ATTRIBUTE_RISK_COMMENTS);


	        StringList selectList = new StringList(4);
	        selectList.addElement(DomainObject.SELECT_ID);
	        selectList.addElement(DomainObject.SELECT_NAME);
	        selectList.addElement(DomainObject.SELECT_PERCENTCOMPLETE);
	        selectList.addElement(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);

	        // sort the projects by the ones that are due sooner
            mlProjects.sort(SELECT_ATTRIBUTE_TASK_ESTIMATED_END_DATE, "ascending", "date");

            int size = mlProjects.size();
            if ( size < numberOfProjects ) {
            	numberOfProjects =  mlProjects.size();
            }

            String []relIdArr = new String[size];
    	    for (int i=0; i<size;i++) {
			    Map passedMap = (Map) mlProjects.get(i);
			    relIdArr[i] = (String) passedMap.get(DomainObject.SELECT_ID);
    	    }

	        MapList objectMapList = DomainObject.getInfo(context, relIdArr, selectList);
            int i = -1;
	        Iterator mapItr = objectMapList.iterator();
	        Map objectMap = null;
	        int pendingTaskProjectCount = 0;
	        while(mapItr.hasNext())
	        {
	        	i++;
	        	objectMap = (Map)mapItr.next();
		        String sOIDProject = (String)objectMap.get(DomainObject.SELECT_ID);
		        String sProjectName = (String)objectMap.get(DomainObject.SELECT_NAME);
		        String sPercentComplete = (String)objectMap.get(DomainObject.SELECT_PERCENTCOMPLETE);
		        String sProjectsEstimeatedFinishDate = (String)objectMap.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);

                Map mProjectEntry           = new HashMap();
                DomainObject doProject      = new DomainObject(sOIDProject);
                BigDecimal bdEffortPlanned  = new BigDecimal(0.0);
                BigDecimal bdEffortActual   = new BigDecimal(0.0);
                BigDecimal bdTotalProgress  = new BigDecimal(0.0);


                mProjectEntry.put(DomainObject.SELECT_ID, sOIDProject   );
                mProjectEntry.put(DomainObject.SELECT_NAME, sProjectName  );
                mProjectEntry.put("PercentComplete" , sPercentComplete  );
                mProjectEntry.put("openTasks"       , "0"           );
                mProjectEntry.put("openDeliverables", "0"           );
                mProjectEntry.put("openIssues"      , "0"           );
                mProjectEntry.put("color"           , sColors[i%sColors.length] );
                mProjectEntry.put("TaskEstimatedFinishDate", sProjectsEstimeatedFinishDate );

        		String relPattern = DomainConstants.RELATIONSHIP_SUBTASK + "," +
        							DomainConstants.RELATIONSHIP_TASK_DELIVERABLE + "," +
        							RELATIONSHIP_HAS_EFFORTS;
        		String typePattern = TYPE_DOCUMENTS + "," +
        							 DomainConstants.TYPE_TASK_MANAGEMENT + "," +
        							 DomainConstants.TYPE_PROJECT_SPACE + "," + //To consider subproject tasks.
        							 TYPE_EFFORT;

        		MapList mlTemp = doProject.getRelatedObjects(context, relPattern, typePattern, busSelects, relSelects, false, true, (short) 0, "", "", 10000);
        		int mlTempSize = mlTemp.size();
			/*
        		if(mlTempSize>0 && pendingTaskProjectCount < numberOfProjects ) {
        			pendingTaskProjectCount++;
                }else if(pendingTaskProjectCount == numberOfProjects){
                	break;
                }
			*/
                for (int j = 0; j < mlTempSize; j++) {

                    Map mTemp               = (Map)mlTemp.get(j);
                    String sIsDeliverable   = (String)mTemp.get(SELECT_RELATIONSHIP_TASK_DELIVERABLE);
                    String sType            = (String)mTemp.get(DomainObject.SELECT_TYPE);

                    if (sIsDeliverable.equalsIgnoreCase("TRUE")) {
                        mTemp.put("project", sProjectName);
                        if(!mlDeliverables.contains(mTemp)) { mlDeliverables.add(mTemp); }
                    } else if((mxType.isOfParentType(context, sType, DomainConstants.TYPE_EFFORT)))  {
                        bdEffortActual = bdEffortActual.add(new BigDecimal((String)mTemp.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TOTAL_EFFORT)));
                    } else {

                        String sHasAssignees    = (String)mTemp.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS);
                        String sDuration        = (String)mTemp.get(Task.SELECT_TASK_ESTIMATED_DURATION);
                        BigDecimal bdDuration   = new BigDecimal(sDuration);

                        if (mxType.isOfParentType(context, sType, DomainConstants.TYPE_TASK)) {
                            String sIsLeaf = (String)mTemp.get(SELECT_FROM_SUBTASK);
                            if (sIsLeaf.equalsIgnoreCase("FALSE")) {
                                mTemp.put("project", sProjectName);
                                mlTasks.add(mTemp);
                            }
                        }

                        if(sHasAssignees.equalsIgnoreCase("TRUE")) {
                            BigDecimal bdAssignment = new BigDecimal(0.0);
                            if (mTemp.get(SELECT_ASSIGNED_TASKS_PERCENT_ALLOCATION) instanceof StringList) {
                                StringList slPercentages = (StringList)mTemp.get(SELECT_ASSIGNED_TASKS_PERCENT_ALLOCATION);
                                for(int k = 0; k < slPercentages.size(); k++) {
                                    String sPercentage = (String)slPercentages.get(k);
                                    bdAssignment = bdAssignment.add(new BigDecimal(sPercentage));
                                }
                            } else {
                                String sPercentage = (String)mTemp.get(SELECT_ASSIGNED_TASKS_PERCENT_ALLOCATION);
                                bdAssignment = bdAssignment.add(new BigDecimal(sPercentage));
                            }
                            String sTaskPercentComplete    = (String)mTemp.get(DomainObject.SELECT_PERCENTCOMPLETE);
                            BigDecimal bdTaskPercentCompleten   = new BigDecimal(sTaskPercentComplete);
                            BigDecimal bdEffort = bdDuration.multiply(bdAssignment);
                            bdEffort = bdEffort.divide(new BigDecimal(100.0));
                            bdEffortPlanned = bdEffortPlanned.add(bdEffort);
                            BigDecimal bdTaskProgress = bdTaskPercentCompleten.multiply(bdEffort);
                            bdTotalProgress = bdTotalProgress.add(bdTaskProgress);
                        }
                    }
                }

                bdEffortActual = bdEffortActual.divide(new BigDecimal(8.0));
                mProjectEntry.put("EffortPlan", bdEffortPlanned.toString());
                mProjectEntry.put("EffortActual", bdEffortActual.toString());
                bdTotalProgress = bdTotalProgress.divide(new BigDecimal(100.0));
                mProjectEntry.put("EffortProgress", bdTotalProgress.toString());

                mlProjectEntries.add(mProjectEntry);

                MapList mlIssuesConnected = doProject.getRelatedObjects(context, RELATIONSHIP_ISSUE, TYPE_ISSUE, busSelectsIssues, relSelects, true, false, (short) 1, "current != 'Closed'", "", 10000);

                for (int j = 0; j < mlIssuesConnected.size(); j++) {
                    Map mIssue = (Map)mlIssuesConnected.get(j);
                    mIssue.put("project", sProjectName);
                    if(!mlIssues.contains(mIssue)) {
                        mlIssues.add(mIssue);
                    }
                }

                MapList mlAssessmentsConnected = doProject.getRelatedObjects(context, RELATIONSHIP_PROJECT_ASSESSMENT, TYPE_ASSESSMENT, busSelectsAssessments, relSelects, false, true, (short) 1, "", "", 10000);
                if(mlAssessmentsConnected.size() > 0) {
                    mlAssessmentsConnected.sort("originated", "descending", "date");
                    Map mAssessment = (Map)mlAssessmentsConnected.get(0);
                    mAssessment.put("project", sProjectName);
                    mAssessment.put("projectid", sOIDProject);
                    mlAssessments.add(mAssessment);
                }
            }
	}

	int iCountTasksThisWeek 		= 0;
	int iCountTasksThisMonth 		= 0;
	int iCountTasksSoon 			= 0;
	int iCountTasksOverdue			= 0;
	int iCountDeliverablesThisWeek          = 0;
	int iCountDeliverablesThisMonth         = 0;
	int iCountDeliverablesSoon 		= 0;
	int iCountDeliverablesOverdue           = 0;
	int iCountIssuesThisWeek 		= 0;
	int iCountIssuesThisMonth 		= 0;
	int iCountIssuesSoon 			= 0;
	int iCountIssuesOverdue 		= 0;
    int iCountEfforts               = 0;

	Calendar cCurrent 	= Calendar.getInstance();
	int iYearCurrent 	= cCurrent.get(Calendar.YEAR);
	int iMonthCurrent 	= cCurrent.get(Calendar.MONTH);
	int iWeekCurrent 	= cCurrent.get(Calendar.WEEK_OF_YEAR);
	long lCurrent           = cCurrent.getTimeInMillis();
	long lDiff              = 2592000000L;

		StringList tempTaskIdList = new StringList();
        for (int i = 0; i < mlTasks.size(); i++) {

            Map mTask       = (Map)mlTasks.get(i);
            String sCurrent = (String)mTask.get(DomainObject.SELECT_CURRENT);

            boolean isTaskRepeated = false;
            String taskId = (String) mTask.get(DomainObject.SELECT_ID);
            if(!tempTaskIdList.contains(taskId)) tempTaskIdList.add(taskId);
    		else isTaskRepeated = true;

            if (!sCurrent.equals("Complete")) {

            	if(!isTaskRepeated){ //When Project has sub-project, Tasks may be repetitive in the "mlTasks" because of both the project.
                String sTargetDate = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                Calendar cTarget = Calendar.getInstance();
                cTarget.setTime(sdf.parse(sTargetDate));

                int iYearTarget     = cTarget.get(Calendar.YEAR);
                int iMonthTarget    = cTarget.get(Calendar.MONTH);
                int iWeekTarget     = cTarget.get(Calendar.WEEK_OF_YEAR);
                long lTarget        = cTarget.getTimeInMillis();

                if (iYearCurrent == iYearTarget) {
                    if (iWeekCurrent == iWeekTarget) {
                        iCountTasksThisWeek++;
                    }
                    if (iMonthCurrent == iMonthTarget) {
                        iCountTasksThisMonth++;
                    }
                }
                if ((lTarget - lCurrent) < lDiff) {
                    if ((lTarget - lCurrent) > 0) {
                        iCountTasksSoon++;
                    }
                }
                if (cCurrent.after(cTarget)) {
                    iCountTasksOverdue++;
                }
            	}

                String sProject = (String)mTask.get("project");
                for (int j = 0; j < mlProjectEntries.size(); j++) {

                    Map mProjectEntry = (Map)mlProjectEntries.get(j);
                    String sProjectName = (String)mProjectEntry.get(DomainObject.SELECT_NAME);
                    if(sProjectName.equals(sProject)) {
                        String sOpenTasks = (String)mProjectEntry.get("openTasks");
                        int iOpenTasks = Integer.parseInt(sOpenTasks);
                        iOpenTasks++;
                        mProjectEntry.put("openTasks", String.valueOf(iOpenTasks));
                        break;
                    }
                }
            }
        }

        StringList deliverablesList = new StringList();
        for (int i = 0; i < mlDeliverables.size(); i++) {

            Map mDeliverable = (Map)mlDeliverables.get(i);
            String sCurrent = (String)mDeliverable.get("from.current");
            boolean isDeliverableRepeated = false;
            

            if (!sCurrent.equals("Complete")) {

            	 String deliverableId = (String) mDeliverable.get(DomainObject.SELECT_ID);
            	 if(!deliverablesList.contains(deliverableId)) {
            		 deliverablesList.add(deliverableId); 
            	 }else {
            		 isDeliverableRepeated = true;
            	 }
            	 
          if(!isDeliverableRepeated) {
                String sTargetDate = (String)mDeliverable.get(SELECT_FROM_ATTRIBUTE_TASK_EXTIMATED_FINISH_DATE);
                Calendar cTarget = Calendar.getInstance();
                cTarget.setTime(sdf.parse(sTargetDate));

                long lTarget        = cTarget.getTimeInMillis();
                int iYearTarget     = cTarget.get(Calendar.YEAR);
                int iMonthTarget    = cTarget.get(Calendar.MONTH);
                int iWeekTarget     = cTarget.get(Calendar.WEEK_OF_YEAR);

                if (iYearCurrent == iYearTarget) {
                    if (iWeekCurrent == iWeekTarget)    { iCountDeliverablesThisWeek++;     }
                    if (iMonthCurrent == iMonthTarget)  { iCountDeliverablesThisMonth++;    }
                }
                if ((lTarget - lCurrent) < lDiff) {
                    if ((lTarget - lCurrent) > 0) { iCountDeliverablesSoon++; }
                }
                if (cCurrent.after(cTarget)) {  iCountDeliverablesOverdue++; }

          }

                String sProject = (String)mDeliverable.get("project");

                for (int j = 0; j < mlProjectEntries.size(); j++) {
                    Map mProjectEntry = (Map)mlProjectEntries.get(j);
                    String sProjectName = (String)mProjectEntry.get(DomainObject.SELECT_NAME);
                    if(sProjectName.equals(sProject)) {
                        String sOpenDeliverables = (String)mProjectEntry.get("openDeliverables");
                        int iOpenDeliverables = Integer.parseInt(sOpenDeliverables);
                        iOpenDeliverables++;
                        mProjectEntry.put("openDeliverables", String.valueOf(iOpenDeliverables));
                        break;
                    }
                }

            }
        }

        StringList issueList = new StringList(mlIssues.size());
        for (int i = 0; i < mlIssues.size(); i++) {

            Map mIssue = (Map)mlIssues.get(i);
            String sTargetDate = (String)mIssue.get(SELECT_ESTIMATED_END_DATE);
            String IsuueId = (String)mIssue.get(DomainConstants.SELECT_ID);

            if(sTargetDate != null && !"".equals(sTargetDate) && !issueList.contains(IsuueId)) {
            	issueList.add(IsuueId);

                Calendar cTarget = Calendar.getInstance();
                cTarget.setTime(sdf.parse(sTargetDate));

                long lTarget        = cTarget.getTimeInMillis();
                int iYearTarget     = cTarget.get(Calendar.YEAR);
                int iMonthTarget    = cTarget.get(Calendar.MONTH);
                int iWeekTarget     = cTarget.get(Calendar.WEEK_OF_YEAR);

                if (iYearCurrent == iYearTarget) {
                    if (iWeekCurrent == iWeekTarget) { iCountIssuesThisWeek++; }
                    if (iMonthCurrent == iMonthTarget) { iCountIssuesThisMonth++; }
                }

                if ((lTarget - lCurrent) < lDiff) {
                    if ((lTarget - lCurrent) > 0) { iCountIssuesSoon++; }
                }
                if (cCurrent.after(cTarget)) { iCountIssuesOverdue++; }
            }

            String sProject = (String)mIssue.get("project");
            for (int j = 0; j < mlProjectEntries.size(); j++) {
                Map mProjectEntry = (Map)mlProjectEntries.get(j);
                String sProjectName = (String)mProjectEntry.get(DomainObject.SELECT_NAME);
                if(sProjectName.equals(sProject)) {
                    String sOpenIssues = (String)mProjectEntry.get("openIssues");
                    int iOpenIssues = Integer.parseInt(sOpenIssues);
                    iOpenIssues++;
                    mProjectEntry.put("openIssues", String.valueOf(iOpenIssues));
                    break;
                }
            }
        }

        String sPrefixTasks         = "<a onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?suiteKey=ProgramCentral&table=PMCAssignedWBSTaskSummary";
        String sSuffixTasks         = "&editLink=true&hideWeeklyEfforts=true&selection=multiple&freezePane=WBSTaskName,Status,Delivarable,NewWindow&program=emxProgramUI:";
        String sPrefixDeliverables  = " <a onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?suiteKey=ProgramCentral&table=PMCPendingDeliverableSummary";
        String sSuffixDeliverables  = "&sortColumnName=EstEndDate&sortDirection=ascending&editLink=true&parentRelName=relationship_TaskDeliverable&selection=multiple&freezePane=Name&program=emxProgramUI:";
        String sPrefixIssues        = " <a onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?suiteKey=ProgramCentral&table=IssueList&freezePane=Name,Files,NewWindow&editLink=true";
        String sSuffixIssues        = "&selection=multiple&program=emxProgramUI:";

        sbTasksWeek.append("<b>").append(iCountTasksThisWeek).append("</b> ").append(sPrefixTasks).append(sOIDParam).append(sSuffixTasks).append("getPendingTasks&mode=This Week&header=emxProgramCentral.String.OpenTasksThisWeek\")'>").append(sLabelThisWeek).append("</a>");
        sbTasksMonth.append("<b>").append(iCountTasksThisMonth).append("</b> ").append(sPrefixTasks).append(sOIDParam).append(sSuffixTasks).append("getPendingTasks&mode=This Month&header=emxProgramCentral.String.OpenTasksThisMonth\")'>").append(sLabelThisMonth).append("</a>");
        sbTasksSoon.append("<b>").append(iCountTasksSoon).append("</b> ").append(sPrefixTasks).append(sOIDParam).append(sSuffixTasks).append("getPendingTasks&mode=Soon&header=emxProgramCentral.String.OpenTasksSoon\")'>").append(sLabelSoon).append("</a>");
        sbTasksOverdue.append("<b>").append(iCountTasksOverdue).append("</b> ").append(sPrefixTasks).append(sOIDParam).append(sSuffixTasks).append("getPendingTasks&mode=Overdue&header=emxProgramCentral.String.OpenTasksOverdue\")'>").append(sLabelOverdue).append("</a>");

        sbDeliverablesWeek.append("<b>").append(iCountDeliverablesThisWeek).append("</b> ").append(sPrefixDeliverables).append(sOIDParam).append(sSuffixDeliverables).append("getDeliverablesByTask&mode=This Week&header=emxProgramCentral.String.OpenDeliverablesThisWeek\")'>").append(sLabelThisWeek).append("</a>");
        sbDeliverablesMonth.append("<b>").append(iCountDeliverablesThisMonth).append("</b> ").append(sPrefixDeliverables).append(sOIDParam).append(sSuffixDeliverables).append("getDeliverablesByTask&mode=This Month&header=emxProgramCentral.String.OpenDeliverablesThisMonth\")'>").append(sLabelThisMonth).append("</a>");
        sbDeliverablesSoon.append("<b>").append(iCountDeliverablesSoon).append("</b> ").append(sPrefixDeliverables).append(sOIDParam).append(sSuffixDeliverables).append("getDeliverablesByTask&mode=Soon&header=emxProgramCentral.String.OpenDeliverablesSoon\")'>").append(sLabelSoon).append("</a>");
        sbDeliverablesOverdue.append("<b>").append(iCountDeliverablesOverdue).append("</b> ").append(sPrefixDeliverables).append(sOIDParam).append(sSuffixDeliverables).append("getDeliverablesByTask&mode=Overdue&header=emxProgramCentral.String.OpenDeliverablesOverdue\")'>").append(sLabelOverdue).append("</a>");

        sbIssuesWeek.append("<b>").append(iCountIssuesThisWeek).append("</b> ").append(sPrefixIssues).append(sOIDParam).append(sSuffixIssues).append("getPendingIssues&mode=This Week&header=emxProgramCentral.String.OpenIssuesThisWeek\")'>").append(sLabelThisWeek).append("</a>");
        sbIssuesMonth.append("<b>").append(iCountIssuesThisMonth).append("</b> ").append(sPrefixIssues).append(sOIDParam).append(sSuffixIssues).append("getPendingIssues&mode=This Month&header=emxProgramCentral.String.OpenIssuesThisMonth\")'>").append(sLabelThisMonth).append("</a>");
        sbIssuesSoon.append("<b>").append(iCountIssuesSoon).append("</b> ").append(sPrefixIssues).append(sOIDParam).append(sSuffixIssues).append("getPendingIssues&mode=Soon&header=emxProgramCentral.String.OpenIssuesSoon\")'>").append(sLabelSoon).append("</a>");
        sbIssuesOverdue.append("<b>").append(iCountIssuesOverdue).append("</b> ").append(sPrefixIssues).append(sOIDParam).append(sSuffixIssues).append("getPendingIssues&mode=Overdue&header=emxProgramCentral.String.OpenIssuesOverdue\")'>").append(sLabelOverdue).append("</a>");

	int iCountTasks 	= 0;
	int iCountDeliverables  = 0;
	int iCountIssues 	= 0;

	mlProjectEntries.sort("TaskEstimatedFinishDate", "ascending", "date");
	
// Max number of projects are allowed in Project bar with openTasks
	int sizeOfOpenTasks = 0;
	for (int i = 0; i < mlProjectEntries.size(); i++) {
            Map mProject 	= (Map)mlProjectEntries.get(i);
            String sName 	= (String) mProject.get(DomainObject.SELECT_NAME);
            String sID 		= (String) mProject.get(DomainObject.SELECT_ID);
            String sCount	= (String) mProject.get("openTasks");
            String sColor	= (String) mProject.get("color");
            if(sizeOfOpenTasks >= numberOfProjects) {
            	break;
            }
            if(!sCount.equals("0")) {
            	sizeOfOpenTasks++;
                iCountTasks++;
                sbTasksCategories.append("'").append(sName).append("',");
                sbTasksSeries.append("{name:'").append(sName).append("', y:").append(sCount).append(", id:'").append(sID).append("', color:'#").append(sColor).append("'},");
            }
	}
	
	int sizeOfOpenDeliverables =0;
	if(sbTasksCategories.length() > 0) { sbTasksCategories.setLength(sbTasksCategories.length() - 1); }
	if(sbTasksSeries.length() > 0) { sbTasksSeries.setLength(sbTasksSeries.length() - 1); }

	// mlProjectEntries.sort(DomainObject.SELECT_NAME, "ascending", "String");
	// mlProjectEntries.sort("openDeliverables", "decending", "integer");
    mlProjectEntries.sort("TaskEstimatedFinishDate", "ascending", "date");
	for (int i = 0; i < mlProjectEntries.size(); i++) {
		Map mProject 	= (Map)mlProjectEntries.get(i);
		String sName 	= (String)mProject.get(DomainObject.SELECT_NAME);
		String sID 	= (String) mProject.get(DomainObject.SELECT_ID);
		String sCount	= (String) mProject.get("openDeliverables");
		String sColor	= (String) mProject.get("color");
		if(sizeOfOpenDeliverables >= numberOfProjects) {
        	break;
        }
		if(!sCount.equals("0")) {
			sizeOfOpenDeliverables++;
			iCountDeliverables++;
			sbDeliverablesCategories.append("'").append(sName).append("',");
			sbDeliverablesSeries.append("{name:'").append(sName).append("', y:").append(sCount).append(", id:'").append(sID).append("', color:'#").append(sColor).append("'},");
		}
	}
	if(sbDeliverablesCategories.length() > 0) { sbDeliverablesCategories.setLength(sbDeliverablesCategories.length() - 1); }
	if(sbDeliverablesSeries.length() > 0) { sbDeliverablesSeries.setLength(sbDeliverablesSeries.length() - 1); }

    mlProjectEntries.sort("TaskEstimatedFinishDate", "ascending", "date");
	// mlProjectEntries.sort(DomainObject.SELECT_NAME, "ascending", "String");


    sbDataEffortPlan.append("{ name: \"").append(sLabelPlanned).append("\", color:'#003c5a', data: [");
    sbDataEffortActual.append("{ name: \"").append(sLabelActual).append("\", color:'#FF8A2E', data: [");
    sbDataEffortProgress.append("{ name: \"").append(sLabelProgress).append("\", color:'#78befa', data: [");

    int sizeOfOpenEfforts =0;

    for (int i = 0; i < mlProjectEntries.size(); i++) {

        Map mProject            = (Map)mlProjectEntries.get(i);
        String sID              = (String) mProject.get(DomainObject.SELECT_ID);
        String sPercentComplete = (String)mProject.get("PercentComplete");
        String sEffortPlan      = (String)mProject.get("EffortPlan");
        BigDecimal bdProgress   = new BigDecimal(sPercentComplete).multiply(new BigDecimal(sEffortPlan));
        bdProgress              = bdProgress.divide(new BigDecimal(100.0));

        // don't show the project if there is no planned effort
        BigDecimal bdZero  = new BigDecimal(0.0);
        BigDecimal bdEffortPlanned  = new BigDecimal(sEffortPlan);
        
        if(sizeOfOpenEfforts >= numberOfProjects) {
        	break;
        }
        
        if (bdEffortPlanned.compareTo(bdZero) == 1) {
            sizeOfOpenEfforts++;
            sbCategoriesEffort.append("'").append((String)mProject.get(DomainObject.SELECT_NAME)).append("',");
            sbDataEffortPlan.append("{ id:'").append(sID).append("', y:").append((String)mProject.get("EffortPlan")).append("},");
            sbDataEffortActual.append("{ id:'").append(sID).append("', y:").append((String)mProject.get("EffortActual")).append("},");
            sbDataEffortProgress.append("{ id:'").append(sID).append("', y:").append((String)mProject.get("EffortProgress")).append("},");
            iCountEfforts++;
        }
    }


    sbDataEffortPlan.append("] }");
    sbDataEffortActual.append("] }");
    sbDataEffortProgress.append("] }");

    mlProjectEntries.sort("TaskEstimatedFinishDate", "ascending", "date");
    int sizeOfOpenIssues =0;
	// mlProjectEntries.sort("openIssues", "decending", "integer");
	for (int i = 0; i < mlProjectEntries.size(); i++) {
            Map mProject 	= (Map)mlProjectEntries.get(i);
            String sName 	= (String)mProject.get(DomainObject.SELECT_NAME);
            String sID          = (String) mProject.get(DomainObject.SELECT_ID);
            String sCount	= (String) mProject.get("openIssues");
            String sColor	= (String) mProject.get("color");
            if(sizeOfOpenIssues >= numberOfProjects) {
            	break;
            }
            if(!sCount.equals("0")) {
            	sizeOfOpenIssues++;
                iCountIssues++;
                sbIssuesCategories.append("'").append(sName).append("',");
                sbIssuesSeries.append("{name:'").append(sName).append("', y:").append(sCount).append(", id:'").append(sID).append("', color:'#").append(sColor).append("'},");
            }
	}

        // In order for the Projects to be displayed in the right order we need to go in the reverse order
		int yCoordinate = 0;
		for(int i = mlAssessments.size()-1 ; i >= 0 ; i--) {
            Map mAssessment             = (Map)mlAssessments.get(i);
            String sProject             = (String)mAssessment.get("project");
            String sProjectId           = (String)mAssessment.get("projectid");
            String sModified            = (String)mAssessment.get("modified");
            String sOriginator          = (String)mAssessment.get(DomainObject.SELECT_ORIGINATOR);
            String sStatusAssessment    = (String)mAssessment.get(SELECT_ATTRIBUTE_ASSESSMENT_STATUS);
            String sCommentAssessment   = (String)mAssessment.get(SELECT_ATTRIBUTE_ASSESSMENT_COMMENTS);
            String sStatusResource      = (String)mAssessment.get(SELECT_ATTRIBUTE_RESOURCE_STATUS);
            String sCommentResource     = (String)mAssessment.get(SELECT_ATTRIBUTE_RESOURCE_COMMENTS);
            String sStatusSchedule      = (String)mAssessment.get(SELECT_ATTRIBUTE_SCHEDULE_STATUS);
            String sCommentSchedule     = (String)mAssessment.get(SELECT_ATTRIBUTE_SCHEDULE_COMMENTS);
            String sStatusFinance       = (String)mAssessment.get(SELECT_ATTRIBUTE_FINANCE_STATUS);
            String sCommentFinance      = (String)mAssessment.get(SELECT_ATTRIBUTE_FINANCE_COMMENTS);
            String sStatusRisk          = (String)mAssessment.get(SELECT_ATTRIBUTE_RISK_STATUS);
            String sCommentRisk         = (String)mAssessment.get(SELECT_ATTRIBUTE_RISK_COMMENTS);

            if("".equals(sCommentAssessment))  { sCommentAssessment    = "-"; }
            if("".equals(sCommentResource) )   { sCommentResource      = "-"; }
            if("".equals(sCommentSchedule))    { sCommentSchedule      = "-"; }
            if("".equals(sCommentFinance))     { sCommentFinance       = "-"; }
            if("".equals(sCommentRisk))        { sCommentRisk          = "-"; }
            if(sModified.contains(" "))        { sModified = "<br/>" + sOriginator + " (" + sModified.substring(0, sModified.indexOf(" ")) + ")" ; }

            appendAssessmentData(sProjectId, yCoordinate, sModified, "0", sbDataAssessmentR, sbDataAssessmentG, sbDataAssessmentY, sbDataAssessmentN, sStatusAssessment   , sCommentAssessment);
            appendAssessmentData(sProjectId, yCoordinate, sModified, "1", sbDataAssessmentR, sbDataAssessmentG, sbDataAssessmentY, sbDataAssessmentN, sStatusResource     , sCommentResource  );
            appendAssessmentData(sProjectId, yCoordinate, sModified, "2", sbDataAssessmentR, sbDataAssessmentG, sbDataAssessmentY, sbDataAssessmentN, sStatusSchedule     , sCommentSchedule  );
            appendAssessmentData(sProjectId, yCoordinate, sModified, "3", sbDataAssessmentR, sbDataAssessmentG, sbDataAssessmentY, sbDataAssessmentN, sStatusFinance      , sCommentFinance   );
            appendAssessmentData(sProjectId, yCoordinate, sModified, "4", sbDataAssessmentR, sbDataAssessmentG, sbDataAssessmentY, sbDataAssessmentN, sStatusRisk         , sCommentRisk      );

            yCoordinate++;

            sbCategoriesAssessmentY.append("'").append(sProject).append("',");
        }

	if(sbIssuesCategories.length() > 0) { sbIssuesCategories.setLength(sbIssuesCategories.length() - 1); }
	if(sbIssuesSeries.length() > 0) { sbIssuesSeries.setLength(sbIssuesSeries.length() - 1); }
	if(sbCategoriesAssessmentY.length() > 0) { sbCategoriesAssessmentY.setLength(sbCategoriesAssessmentY.length() - 1); }
	if(sbDataAssessmentR.length() > 0) { sbDataAssessmentR.setLength(sbDataAssessmentR.length() - 1); }
	if(sbDataAssessmentG.length() > 0) { sbDataAssessmentG.setLength(sbDataAssessmentG.length() - 1); }
	if(sbDataAssessmentY.length() > 0) { sbDataAssessmentY.setLength(sbDataAssessmentY.length() - 1); }
	if(sbDataAssessmentN.length() > 0) { sbDataAssessmentN.setLength(sbDataAssessmentN.length() - 1); }


	int iHeightTasks 	= 35 + (iCountTasks * 20);
	int iHeightDeliverables = 35 + (iCountDeliverables * 20);
	int iHeightIssues	= 35 + (iCountIssues * 20);
	int iHeightAssessments	= 38 + (mlAssessments.size() * 28);
	int iHeightEffort	= 70 + (iCountEfforts * 40);

      if(iHeightAssessments < 100) { iHeightAssessments = 100; }


        aResults[0] = sbProjects.toString();
        aResults[10] = sHeaderTasks;
        aResults[11] = String.valueOf(iHeightTasks);
        aResults[12] = sbTasksWeek.toString();
        aResults[13] = sbTasksMonth.toString();
        aResults[14] = sbTasksSoon.toString();
        aResults[15] = sbTasksOverdue.toString();
        aResults[16] = sbTasksCategories.toString();
        aResults[17] = sbTasksSeries.toString();
        aResults[20] = sHeaderDeliverables;
        aResults[21] = String.valueOf(iHeightDeliverables);
        aResults[22] = sbDeliverablesWeek.toString();
        aResults[23] = sbDeliverablesMonth.toString();
        aResults[24] = sbDeliverablesSoon.toString();
        aResults[25] = sbDeliverablesOverdue.toString();
        aResults[26] = sbDeliverablesCategories.toString();
        aResults[27] = sbDeliverablesSeries.toString();
        aResults[30] = sHeaderIssues;
        aResults[31] = String.valueOf(iHeightIssues);
        aResults[32] = sbIssuesWeek.toString();
        aResults[33] = sbIssuesMonth.toString();
        aResults[34] = sbIssuesSoon.toString();
        aResults[35] = sbIssuesOverdue.toString();
        aResults[36] = sbIssuesCategories.toString();
        aResults[37] = sbIssuesSeries.toString();
        aResults[38] = sHeaderAssessments;
        aResults[39] = sbCategoriesAssessmentX.toString();
        aResults[40] = sbCategoriesAssessmentY.toString();
        aResults[41] = String.valueOf(mlAssessments.size() - 0.5);
        aResults[42] = sbDataAssessmentR.toString();
        aResults[43] = sbDataAssessmentY.toString();
        aResults[44] = sbDataAssessmentG.toString();
        aResults[45] = sbDataAssessmentN.toString();
        aResults[46] = String.valueOf(iHeightAssessments);
        aResults[47] = sHeaderEfforts;
        aResults[1] = sbCategoriesEffort.toString();
        aResults[2] = sbDataEffortPlan.toString();
        aResults[3] = sbDataEffortActual.toString();
        aResults[4] = sbDataEffortProgress.toString();
        aResults[5] = String.valueOf(iHeightEffort);


        return aResults;

    }


    public void appendAssessmentData(String sProjectId, int i, String sModified, String sCategory, StringBuilder sbDataAssessmentR, StringBuilder sbDataAssessmentG, StringBuilder sbDataAssessmentY, StringBuilder sbDataAssessmentN, String sStatus, String sComment) {


        StringBuilder sbToAppend = new StringBuilder();

        sComment=  sComment.length() >= 30 ? sComment.substring(0, 30) + "..." : sComment;
        sComment = sComment.replaceAll("\n", "<br/>");
        sComment = sComment.replace("'", "\\'");
        sComment = XSSUtil.encodeForJavaScript(context, sComment);

        sbToAppend.append("{ id:'").append(sProjectId).append("',");
        sbToAppend.append(" name:'").append(sComment).append(sModified).append("',");
        sbToAppend.append(" x:").append(sCategory).append(", y:").append(i).append("},");

        if(sStatus.equals("Red"))         { sbDataAssessmentR.append(sbToAppend.toString()); }
        else if(sStatus.equals("Green"))  { sbDataAssessmentG.append(sbToAppend.toString()); }
        else if(sStatus.equals("Yellow")) { sbDataAssessmentY.append(sbToAppend.toString()); }
        else                              { sbDataAssessmentN.append(sbToAppend.toString()); }

    }
    public Vector columnProjectFolders(Context context, String[] args) throws Exception {


        Vector vResult      = new Vector();
        /*Map paramMap        = (Map) JPO.unpackArgs(args);
        MapList mlObjects   = (MapList) paramMap.get("objectList");

        StringList busSelects = new StringList();
        busSelects.add(DomainObject.SELECT_TYPE);
        busSelects.add("from[Data Vaults]");

        for (int i = 0; i < mlObjects.size(); i++) {

            StringBuilder sbResult  = new StringBuilder();
            Map mObject             = (Map) mlObjects.get(i);
            String sOID             = (String)mObject.get(DomainObject.SELECT_ID);
            DomainObject dObject    = new DomainObject(sOID);
            Map mData               = dObject.getInfo(context, busSelects);

            String sIcon        = "../gnv/images/iconSmallFolderEmpty.gif";
            String sTitle       = "There are no folders";
            String sHasFolders  = (String)mData.get("from[Data Vaults]");
            if(sHasFolders.equalsIgnoreCase("TRUE")) { sIcon = "../common/images/iconSmallFolder.gif"; sTitle = "Open Folders view"; }

            sbResult.append("<a href='");
            sbResult.append("../common/emxTree.jsp?objectId=").append(sOID).append("&amp;DefaultCategory=PMCFolder'");
            sbResult.append(" target='content'><img src='").append(sIcon).append("' border='0' TITLE='").append(sTitle).append("'/></a>");
            vResult.add(sbResult.toString());

        }*/

        return vResult;
    }

    public Vector columnProgressBar(Context context, String[] args) throws Exception {

    	return getTasksProgressBar(context, args);

    }


    public Vector columnCurrentPhaseGate(Context context, String[] args) throws Exception {

    	return new Vector();
        /*HashMap programMap  = (HashMap) JPO.unpackArgs(args);
        MapList mlObjects   = (MapList) programMap.get("objectList");
        Vector resultVector = new Vector(mlObjects.size());

        for (int i = 0; i < mlObjects.size(); i++) {
            Map mObject = (Map) mlObjects.get(i);
            String sOID = (String) mObject.get(DomainObject.SELECT_ID);
            resultVector.addElement(retrieveCurrentPhaseGate(context, sOID));
        return resultVector;
        }*/

    }
    /*private String retrieveCurrentPhaseGate(Context context, String sOID) throws Exception {

        String sResult          = "";
        DomainObject dObject    = new DomainObject(sOID);

        // Get active Gate
        StringList busSelects = new StringList(5);
        StringList relSelects = new StringList();
        busSelects.add(DomainConstants.SELECT_ID);
        busSelects.add(DomainConstants.SELECT_NAME);
        busSelects.add(DomainConstants.SELECT_CURRENT);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
        relSelects.add(ProgramCentralConstants.SELECT_ATTRIBUTE_SEQUENCE_ORDER);

        MapList mlItems = dObject.getRelatedObjects(context, "Subtask", "Phase,Gate", busSelects, relSelects, false, true, (short) 1, "current != Complete", "", 0);

        if (mlItems.size() > 0) {

            mlItems.sort(ProgramCentralConstants.SELECT_ATTRIBUTE_SEQUENCE_ORDER, "ascending", "Integer");

            Map mItem           = (Map) mlItems.get(0);
            String sOIDPhase    = (String) mItem.get(DomainObject.SELECT_ID);
            String sName        = (String) mItem.get(DomainObject.SELECT_NAME);
            String sTarget      = (String) mItem.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);

            if (!sTarget.equals("") && !sTarget.equals("")) {

                Date dTarget    = sdf.parse(sTarget);
                Date dCurrent   = new Date();

                int iOTD = (int) ((dTarget.getTime() - dCurrent.getTime()) / (1000 * 60 * 60 * 24));
                if (iOTD < 0) {
                    sResult = "<img src='../common/images/iconStatusRed.gif' />";
                } else if (iOTD < 6) {
                    sResult = "<img src='../common/images/iconStatusYellow.gif' />";
                }

            }

            sResult = "<a href=\"javascript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=" + sOIDPhase + "', '950', '650', 'false', 'popup', '')\">" + sName + "</a> " + sResult;

        }

        return sResult;
    }*/
    public Vector columnPercentComplete(Context context, String[] args) throws Exception {


    	Vector vResult      = new Vector();

        Map programMap      = (Map) JPO.unpackArgs(args);     
        MapList mlObjects   = (MapList) programMap.get("objectList");
        HashMap paramList   = (HashMap) programMap.get("paramList"); 
        HashMap columnMap   = (HashMap) programMap.get("columnMap");
        HashMap settings    = (HashMap) columnMap.get("settings");      
        String sLanguage    = (String) paramList.get("languageStr"); 
        String sClickToSet  = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.ClickToSetProgressTo", sLanguage);
        String sAttribute   = "Percent Complete";   
        String sTarget      = "parent.frames[\"listHidden\"].document.location.href";
        String[] sStates    = new String[0];
        String[] sColors    = new String[0];
        Boolean bIsIndented = false;
        
        if(settings.containsKey("Attribute")) {
            sAttribute = (String) settings.get("Attribute"); 
        }
        if(settings.containsKey("States")) {
            if(settings.containsKey("Colors")) {
                String sParameterStates = (String) settings.get("States");
                String sParameterColors = (String) settings.get("Colors");
                sStates = sParameterStates.split(","); 
                sColors = sParameterColors.split(","); 
            }
        }
        if(paramList.containsKey("isIndentedView")) { 
            bIsIndented = true;
            sTarget = "self.frames[\"listHidden\"].document.location.href";
        }        
        
 
        int objSize = mlObjects.size();
        if ( objSize > 0) {
        	MapList objectList = new MapList();
        	StringList busSelects = new StringList();
        	busSelects.add("attribute[" + sAttribute + "]");
        	busSelects.add(DomainObject.SELECT_CURRENT);
        		
        		String[] objIds = new String[objSize];
        		for (int i = 0; i < objSize; i++) {
        			Map objMap 	= (Map) mlObjects.get(i);
        			objIds[i] 	= (String) objMap.get(DomainObject.SELECT_ID);
        		}
        		
    		objectList = ProgramCentralUtil.getObjectDetails(context, objIds, busSelects);

    		int objectListsize = objectList.size(); 
            for (int i = 0; i < objectListsize; i++) {

                Map mObject             = (Map) mlObjects.get(i);
                String sOID             = (String) mObject.get(DomainObject.SELECT_ID);
                String sRID             = (String) mObject.get("id[level]");
            	Map objMap			 	= (Map) objectList.get(i);
            	String sCurrent 		= (String) objMap.get(DomainObject.SELECT_CURRENT);
            	String sValue			= (String) objMap.get(DomainObject.SELECT_PERCENTCOMPLETE);
                Double dValue	= Task.parseToDouble(sValue);
                StringBuilder sbResult  = new StringBuilder();               
                String sColor           = "77797c";
                
                if(sStates.length > 0) {
                    for (int j = 0; j < sStates.length; j++) {
                        if(sStates[j].equals(sCurrent)) {
                            sColor = sColors[j];
                            continue;
                        }
                    }                        
                }                

                StringBuilder sbStyleCommon = new StringBuilder();
                sbStyleCommon.append("border-top:1px solid #");
                sbStyleCommon.append(sColor);
                sbStyleCommon.append(";border-bottom:1px solid #");
                sbStyleCommon.append(sColor);
                sbStyleCommon.append(";font-size:6pt;float:left;text-align:center;margin:0px;padding:0px;width:18px;height:16px;line-height:15px;vertical-align:middle;text-Shadow:1px 1px 1px #111;");
                
                String sStyleActive         = " style='color:#FFFFFF;background:#" + sColor + ";" + sbStyleCommon.toString() + "'";                
                String sStyleInactive       = " style='color:transparent;background:transparent;" + sbStyleCommon.toString() + "'";                
                String sOnMouseOutActive    = " onmouseout='this.style.color=\"#FFFFFF\";this.style.background=\"#" + sColor + "\";this.style.textShadow=\"1px 1px 1px #111\";this.innerHTML=\"\";'";
                String sOnMouseOutInactive  = " onmouseout='this.style.color=\"#transparent\";this.style.background=\"transparent\";this.style.textShadow=\"none\";this.innerHTML=\"\";'";
                String sOnMouseOutCurrent   = " onmouseout='this.style.color=\"#FFFFFF\";this.style.background=\"#" + sColor + "\";this.style.textShadow=\"1px 1px 1px #111\";'";
                String sOnMouseOver         = " onmouseover='this.style.cursor=\"pointer\";this.style.color=\"#FFF\";this.style.background=\"#CC092F\";this.style.textShadow=\"1px 1px 2px #333\";this.title=\"" + XSSUtil.encodeForXML(context, sClickToSet) + " : ";
                
                String sOnMouseOver10       = sOnMouseOver + " 10%\";this.innerHTML=\"10\";'";
                String sOnMouseOver20       = sOnMouseOver + " 20%\";this.innerHTML=\"20\";'";
                String sOnMouseOver25       = sOnMouseOver + " 25%\";this.innerHTML=\"25\";'";
                String sOnMouseOver30       = sOnMouseOver + " 30%\";this.innerHTML=\"30\";'";
                String sOnMouseOver40       = sOnMouseOver + " 40%\";this.innerHTML=\"40\";'";
                String sOnMouseOver50       = sOnMouseOver + " 50%\";this.innerHTML=\"50\";'";
                String sOnMouseOver60       = sOnMouseOver + " 60%\";this.innerHTML=\"60\";'";
                String sOnMouseOver70       = sOnMouseOver + " 70%\";this.innerHTML=\"70\";'";
                String sOnMouseOver75       = sOnMouseOver + " 75%\";this.innerHTML=\"75\";'";
                String sOnMouseOver80       = sOnMouseOver + " 80%\";this.innerHTML=\"80\";'";
                String sOnMouseOver90       = sOnMouseOver + " 90%\";this.innerHTML=\"90\";'";
                String sOnMouseOver100      = sOnMouseOver + " 100%\";this.innerHTML=\"100\";'";
                
                StringBuilder sbMouseDown = new StringBuilder();
                sbMouseDown.append(" onmousedown='");
                sbMouseDown.append(sTarget);
                sbMouseDown.append("=\"../programcentral/emxProgramCentralUtil.jsp?mode=updateTaskPercentageComplete");
                sbMouseDown.append("&amp;objectId=").append(sOID);
                sbMouseDown.append("&amp;attribute=");
                sbMouseDown.append(sAttribute);
                sbMouseDown.append("&amp;rowId=");                
                sbMouseDown.append(sRID);
                sbMouseDown.append("&amp;isIndented=");
                sbMouseDown.append(bIsIndented);
                sbMouseDown.append("&amp;newValue=");

                String sOnMouseDown10   = sbMouseDown.toString() + "10.0\";'";
                String sOnMouseDown20   = sbMouseDown.toString() + "20.0\";'";
                String sOnMouseDown25   = sbMouseDown.toString() + "25.0\";'";
                String sOnMouseDown30   = sbMouseDown.toString() + "30.0\";'";
                String sOnMouseDown40   = sbMouseDown.toString() + "40.0\";'";
                String sOnMouseDown50   = sbMouseDown.toString() + "50.0\";'";
                String sOnMouseDown60   = sbMouseDown.toString() + "60.0\";'";
                String sOnMouseDown70   = sbMouseDown.toString() + "70.0\";'";
                String sOnMouseDown75   = sbMouseDown.toString() + "75.0\";'";
                String sOnMouseDown80   = sbMouseDown.toString() + "80.0\";'";
                String sOnMouseDown90   = sbMouseDown.toString() + "90.0\";'";
                String sOnMouseDown100  = sbMouseDown.toString()+ "100.0\";'";
                
                String sValue10 = "";
                String sValue20 = "";
                String sValue25 = "";
                String sValue30 = "";
                String sValue40 = "";
                String sValue50 = "";
                String sValue60 = "";
                String sValue70 = "";
                String sValue75 = "";
                String sValue80 = "";
                String sValue90 = "";
                String sValue100= "";
                
                String sStyle10 = sStyleInactive + sOnMouseOutInactive; 
                String sStyle20 = sStyleInactive + sOnMouseOutInactive;
                String sStyle25 = sStyleInactive + sOnMouseOutInactive;
                String sStyle30 = sStyleInactive + sOnMouseOutInactive; 
                String sStyle40 = sStyleInactive + sOnMouseOutInactive; 
                String sStyle50 = sStyleInactive + sOnMouseOutInactive; 
                String sStyle60 = sStyleInactive + sOnMouseOutInactive; 
                String sStyle70 = sStyleInactive + sOnMouseOutInactive;
                String sStyle75 = sStyleInactive + sOnMouseOutInactive;
                String sStyle80 = sStyleInactive + sOnMouseOutInactive; 
                String sStyle90 = sStyleInactive + sOnMouseOutInactive; 
                String sStyle100= sStyleInactive + sOnMouseOutInactive;                 

                if(dValue >= 10.0) {sStyle10 = sStyleActive + sOnMouseOutActive; if(dValue < 20.0) { sValue10 = "10"; sStyle10 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 20.0) {sStyle20 = sStyleActive + sOnMouseOutActive; if(dValue < 25.0) { sValue20 = "20"; sStyle20 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 25.0) {sStyle25 = sStyleActive + sOnMouseOutActive; if(dValue < 30.0) { sValue25 = "25"; sStyle25 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 30.0) {sStyle30 = sStyleActive + sOnMouseOutActive; if(dValue < 40.0) { sValue30 = "30"; sStyle30 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 40.0) {sStyle40 = sStyleActive + sOnMouseOutActive; if(dValue < 50.0) { sValue40 = "40"; sStyle40 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 50.0) {sStyle50 = sStyleActive + sOnMouseOutActive; if(dValue < 60.0) { sValue50 = "50"; sStyle50 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 60.0) {sStyle60 = sStyleActive + sOnMouseOutActive; if(dValue < 70.0) { sValue60 = "60"; sStyle60 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 70.0) {sStyle70 = sStyleActive + sOnMouseOutActive; if(dValue < 75.0) { sValue70 = "70"; sStyle70 = sStyleActive + sOnMouseOutCurrent;}} 
                if(dValue >= 75.0) {sStyle75 = sStyleActive + sOnMouseOutActive; if(dValue < 80.0) { sValue75 = "75"; sStyle75 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 80.0) {sStyle80 = sStyleActive + sOnMouseOutActive; if(dValue < 90.0) { sValue80 = "80"; sStyle80 = sStyleActive + sOnMouseOutCurrent;}}
                if(dValue >= 90.0) {sStyle90 = sStyleActive + sOnMouseOutActive; 
                    if(dValue < 100.0){ sValue90 = "90"; sStyle90 = sStyleActive + sOnMouseOutCurrent;}
                    else { sValue100 = "100"; sStyle100 = sStyleActive + sOnMouseOutCurrent;}
                }
                
                sStyle10   = sStyle10.replace("style='", "style='border-left:1px  solid #" + sColor + ";");
                sStyle100 = sStyle100.replace("style='", "style='border-right:1px solid #" + sColor + ";");
                
                
                sbResult.append("<div style='visibility:hidden;display:none;'>");
                if(dValue < 100.0) { sbResult.append("0"); }
                sbResult.append(sValue).append("</div>");
                
                sbResult.append("<div").append(sStyle10).append(sOnMouseOver10).append(sOnMouseDown10).append(" >").append(sValue10).append("</div>");
                sbResult.append("<div").append(sStyle20).append(sOnMouseOver20).append(sOnMouseDown20).append(" >").append(sValue20).append("</div>");
               sbResult.append("<div").append(sStyle25).append(sOnMouseOver25).append(sOnMouseDown25).append(" >").append(sValue25).append("</div>");
                sbResult.append("<div").append(sStyle30).append(sOnMouseOver30).append(sOnMouseDown30).append(" >").append(sValue30).append("</div>");
                sbResult.append("<div").append(sStyle40).append(sOnMouseOver40).append(sOnMouseDown40).append(" >").append(sValue40).append("</div>");
                sbResult.append("<div").append(sStyle50).append(sOnMouseOver50).append(sOnMouseDown50).append(" >").append(sValue50).append("</div>");
                sbResult.append("<div").append(sStyle60).append(sOnMouseOver60).append(sOnMouseDown60).append(" >").append(sValue60).append("</div>");
                sbResult.append("<div").append(sStyle70).append(sOnMouseOver70).append(sOnMouseDown70).append(" >").append(sValue70).append("</div>");
                sbResult.append("<div").append(sStyle75).append(sOnMouseOver75).append(sOnMouseDown75).append(" >").append(sValue75).append("</div>");
                sbResult.append("<div").append(sStyle80).append(sOnMouseOver80).append(sOnMouseDown80).append(" >").append(sValue80).append("</div>");
                sbResult.append("<div").append(sStyle90).append(sOnMouseOver90).append(sOnMouseDown90).append(" >").append(sValue90).append("</div>");
                sbResult.append("<div").append(sStyle100).append(sOnMouseOver100).append(sOnMouseDown100).append(" >").append(sValue100).append("</div>");              
                sbResult.append("<div style='width:185px;'></div>");    
                
                vResult.addElement(sbResult.toString());
                
            }
        }
        
        return vResult;

    }


    // Project Status Report Data Retrieval
    public Integer[][] getDataStatusReportProject(Context context, String[] args) throws Exception {

    	return null;

        /*HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        String sOID             = (String) paramMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        Calendar cCurrent       = Calendar.getInstance();
        int iYearCurrent        = cCurrent.get(Calendar.YEAR);
        int iMonthCurrent       = cCurrent.get(Calendar.MONTH);
        int iWeekCurrent        = cCurrent.get(Calendar.WEEK_OF_YEAR);
        long lCurrent           = cCurrent.getTimeInMillis();
        long lDiff              = 2592000000L;

        Integer[][] aResult     = new Integer[3][12];
        // [0][X] = Tasks, [1][x] = deliverables, [2][X] = Issues
        // [X][0] = This Week
        // [X][1] = This Month
        // [X][2] = Soon
        // [X][3] = Overdue
        // [X][4] = State Assign
        // [X][5] = State Active
        // [X][6] = State Review
        // [X][7] = State Complete
        for (int i = 0; i < 3; i++) { for (int j = 0; j < 12; j++) { aResult[i][j] = 0; } }

        StringList slTasks = new StringList();
        slTasks.add(DomainObject.SELECT_TYPE);
        slTasks.add(DomainObject.SELECT_CURRENT);
        slTasks.add(SELECT_FROM_SUBTASK);
        slTasks.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
        slTasks.add(Task.SELECT_TASK_ACTUAL_FINISH_DATE);


        Pattern pTypes  = new Pattern("Task");
        MapList mlTasks = dObject.getRelatedObjects(context, "Subtask", "Task Management", slTasks, null, false, true, (short)0, "", "", 0, pTypes, null, null);

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask           = (Map)mlTasks.get(i);
            String sCurrent     = (String)mTask.get(DomainObject.SELECT_CURRENT);
            String sHasSubtask  = (String)mTask.get(SELECT_FROM_SUBTASK);

            if(sHasSubtask.equalsIgnoreCase("FALSE")) {

                if(sCurrent.equals("Create")) 		{ aResult[0][4]++; }
                else if(sCurrent.equals("Assign")) 	{ aResult[0][4]++; }
                else if(sCurrent.equals("Active")) 	{ aResult[0][5]++; }
                else if(sCurrent.equals("Review")) 	{ aResult[0][6]++; }
                else if(sCurrent.equals("Complete"))    { aResult[0][7]++; }

                Calendar cTarget    = Calendar.getInstance();
                String sTargetDate  = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                cTarget.setTime(sdf.parse(sTargetDate));

                if (!sCurrent.equals("Complete")) {

                    int iYearTarget     = cTarget.get(Calendar.YEAR);
                    int iMonthTarget    = cTarget.get(Calendar.MONTH);
                    int iWeekTarget     = cTarget.get(Calendar.WEEK_OF_YEAR);
                    long lTarget        = cTarget.getTimeInMillis();

                    if (iYearCurrent == iYearTarget) {
                        if (iWeekCurrent == iWeekTarget) {
                            aResult[0][0]++;
                        }
                    }
                    if (iYearCurrent == iYearTarget) {
                        if (iMonthCurrent == iMonthTarget) {
                            aResult[0][1]++;
                        }
                    }
                    if ((lTarget - lCurrent) < lDiff) {
                        if ((lTarget - lCurrent) > 0) {
                            aResult[0][2]++;
                        }
                    }
                    if (cCurrent.after(cTarget)) {
                        aResult[0][3]++;
                        aResult[0][9]++;
                    } else {
                        aResult[0][8]++;
                    }

                } else {

                    String sActualDate = (String)mTask.get(Task.SELECT_TASK_ACTUAL_FINISH_DATE);
                    if (sActualDate != null && !"".equals(sActualDate)) {
                        Calendar cActual = Calendar.getInstance();
                        cActual.setTime(sdf.parse(sActualDate));
                        if (cActual.after(cTarget)) {
                            aResult[0][10]++;
                        } else {
                            aResult[0][11]++;
                        }
                    }
                }

            }
        }

        MapList mlDeliverables = retrieveDeliverablesOfProject(context, args, "All", "Create,Assign,Active,Review,Complete", sOID);

        for(int i = 0; i < mlDeliverables.size(); i++) {

            Map mDeliverable    = (Map)mlDeliverables.get(i);
            String sCurrent     = (String)mDeliverable.get("from.current");

            if(sCurrent.equals("Create"))           { aResult[1][4]++; }
            else if(sCurrent.equals("Assign"))      { aResult[1][4]++; }
            else if(sCurrent.equals("Active"))      { aResult[1][5]++; }
            else if(sCurrent.equals("Review"))      { aResult[1][6]++; }
            else if(sCurrent.equals("Complete"))    { aResult[1][7]++; }

            Calendar cTarget    = Calendar.getInstance();
            String sTargetDate  = (String)mDeliverable.get(SELECT_FROM_ATTRIBUTE_TASK_EXTIMATED_FINISH_DATE);
            cTarget.setTime(sdf.parse(sTargetDate));

            if (!sCurrent.equals("Complete")) {

                int iYearTarget     = cTarget.get(Calendar.YEAR);
                int iMonthTarget    = cTarget.get(Calendar.MONTH);
                int iWeekTarget     = cTarget.get(Calendar.WEEK_OF_YEAR);
                long lTarget        = cTarget.getTimeInMillis();

                if (iYearCurrent == iYearTarget) {
                    if (iWeekCurrent == iWeekTarget) {
                        aResult[1][0]++;
                    }
                }
                if (iYearCurrent == iYearTarget) {
                    if (iMonthCurrent == iMonthTarget) {
                        aResult[1][1]++;
                    }
                }
                if ((lTarget - lCurrent) < lDiff) {
                    if ((lTarget - lCurrent) > 0) {
                        aResult[1][2]++;
                    }
                }
                if (cCurrent.after(cTarget)) {
                    aResult[1][3]++;
                    aResult[1][9]++;
                } else {
                    aResult[1][8]++;
                }

            } else {

                String sActualDate = (String)mDeliverable.get(SELECT_FROM_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
                if (sActualDate != null && !"".equals(sActualDate)) {
                    Calendar cActual = Calendar.getInstance();
                    cActual.setTime(sdf.parse(sActualDate));
                    if (cActual.after(cTarget)) {
                        aResult[1][10]++;
                    } else {
                        aResult[1][11]++;
                    }
                }
            }

        }


        StringList slIssues = new StringList();
        slIssues.add(DomainObject.SELECT_CURRENT);
        slIssues.add(SELECT_ESTIMATED_END_DATE);

       	MapList mlIssues = dObject.getRelatedObjects(context, "Issue", "Issue", slIssues, null, true, false, (short) 1, "", "", 0);

        for (int i = 0; i < mlIssues.size(); i++) {

            Map mIssue          = (Map)mlIssues.get(i);
            String sCurrent     = (String)mIssue.get(DomainObject.SELECT_CURRENT);
            String sTargetDate  = (String)mIssue.get(SELECT_ESTIMATED_END_DATE);

            if(sCurrent.equals("Create")) 	{ aResult[2][4]++; }
            else if(sCurrent.equals("Assign")) 	{ aResult[2][4]++; }
            else if(sCurrent.equals("Active")) 	{ aResult[2][5]++; }
            else if(sCurrent.equals("Review")) 	{ aResult[2][6]++; }
            else if(sCurrent.equals("Closed"))	{ aResult[2][7]++; }

            if (sTargetDate != null && !"".equals(sTargetDate)) {

                Calendar cTarget = Calendar.getInstance();
                cTarget.setTime(sdf.parse(sTargetDate));

                if (!sCurrent.equals("Closed") ) {

                    int iYearTarget     = cTarget.get(Calendar.YEAR);
                    int iMonthTarget    = cTarget.get(Calendar.MONTH);
                    int iWeekTarget     = cTarget.get(Calendar.WEEK_OF_YEAR);
                    long lTarget        = cTarget.getTimeInMillis();

                    if (iYearCurrent == iYearTarget) {
                        if (iWeekCurrent == iWeekTarget) {
                            aResult[2][0]++;
                        }
                    }
                    if (iYearCurrent == iYearTarget) {
                        if (iMonthCurrent == iMonthTarget) {
                            aResult[2][1]++;
                        }
                    }
                    if ((lTarget - lCurrent) < lDiff) {
                        if ((lTarget - lCurrent) > 0) {
                            aResult[2][2]++;
                        }
                    }
                    if (cCurrent.after(cTarget)) {
                        aResult[2][3]++;
                        aResult[2][9]++;
                    } else {
                        aResult[2][8]++;
                    }

                } else {
                    String sActualDate = (String)mIssue.get(SELECT_ATTRIBUTE_ACTUAL_END_DATE);
                    if (sActualDate != null && !"".equals(sActualDate)) {
                        Calendar cActual = Calendar.getInstance();
                        cActual.setTime(sdf.parse(sActualDate));
                        if (cActual.after(cTarget)) {
                            aResult[2][10]++;
                        } else {
                            aResult[2][11]++;
                        }
                    }
                }
            }

	}

        return aResult;*/


    }
    public StringBuffer[] getDataGanttChart(Context context, String[] args) throws Exception {
    	String[] init       = new String[]{};
    	return JPO.invoke(context, "emxProjectSpace", init, "getDataGanttChart", args, StringBuffer[].class);
    }

    // - Retrieve Tasks
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getPendingTasks(Context context, String[] args) throws Exception {


        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");
        String sMode        = (String) paramMap.get("mode");
        MapList mlResult    = new MapList();
        String[] init       = new String[]{};
        HashMap argsMap     = new HashMap();
        String[] methodargs;
        MapList mlProjects;

        if(null == sOID || "".equals(sOID)) {
            argsMap.put("objectId", "");
            methodargs = JPO.packArgs(argsMap);
            mlProjects = (com.matrixone.apps.domain.util.MapList) JPO.invoke(context, "emxProjectSpace", init, "getActiveProjects", methodargs, com.matrixone.apps.domain.util.MapList.class);
        }  else {
            argsMap.put("objectId", sOID);
            methodargs = JPO.packArgs(argsMap);
            mlProjects = (com.matrixone.apps.domain.util.MapList)JPO.invoke(context, "emxProgramUI", init, "getProjectsOfProgram", methodargs, com.matrixone.apps.domain.util.MapList.class);
        }

        // sort the projects by the ones that are due sooner
        mlProjects.sort(SELECT_ATTRIBUTE_TASK_ESTIMATED_END_DATE, "ascending", "date");

        // get the number of charts we want to display and only display data for that number of charts
        /* String strNumberOfProjects =  EnoviaResourceBundle.getProperty(context, "emxProgramCentral.ProjectSummary.ChartsToDisplay");
        int numberOfProjects = Integer.parseInt(strNumberOfProjects);
        if ( mlProjects.size() < numberOfProjects ) {
        	numberOfProjects =  mlProjects.size();
        }
        */
        int m1ProjectsSize = mlProjects.size();
        MapList tempMapList = new MapList();;
	    for (int i=0; i<m1ProjectsSize; i++) {
		    Map projectMap = (Map) mlProjects.get(i);
		    tempMapList.add(projectMap);
	    }

        // set the project list to number of projects set by ChartsToDisplay
	    mlProjects = tempMapList;

	    //Check for sub-project IDs starts : To avoid repetitive tasks.
	    String[] arrProjectId = new String[m1ProjectsSize];
	    for(int i = 0; i < m1ProjectsSize; i++){
                Map mProject = (Map) mlProjects.get(i);
                String sOIDProject = (String) mProject.get(DomainObject.SELECT_ID);
            arrProjectId[i] = sOIDProject;
	    }

	    String SELECT_SUB_PROJECT_ID = "from["+ DomainConstants.RELATIONSHIP_SUBTASK + "].to[" + DomainConstants.TYPE_PROJECT_SPACE +"].id";
	    MapList mlSubProjectsId = DomainObject.getInfo(context, arrProjectId, new StringList(SELECT_SUB_PROJECT_ID));
	    StringList subProjectIdList = new StringList();
	    for(int i = 0; i < mlSubProjectsId.size(); i++ ){
	    	Map projectMap =  (Map) mlSubProjectsId.get(i);
	    	String subProjectId = (String) projectMap.get(SELECT_SUB_PROJECT_ID);
	    	subProjectIdList.addAll(ProgramCentralUtil.getAsStringList(subProjectId));
	    }
	    //Check for sub-project IDs ends

        if (m1ProjectsSize > 0) {
            for (int i = 0; i < m1ProjectsSize; i++) {
                Map mProject = (Map) mlProjects.get(i);
                String sOIDProject = (String) mProject.get(DomainObject.SELECT_ID);
                if(subProjectIdList.contains(sOIDProject)){
                	continue;
                }
                MapList mlTemp = retrieveOpenTasksOfProject(context, args, sMode, sOIDProject);
                mlResult.addAll(mlTemp);
            }
        }

        return mlResult;

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getPendingTasksOfProject(Context context, String[] args) throws Exception {

        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");
        String sMode        = (String) paramMap.get("mode");

        return retrieveOpenTasksOfProject(context, args, sMode, sOID);
    }
    public MapList retrieveOpenTasksOfProject(Context context, String[] args, String sMode, String sOIDProject) throws Exception {


        MapList mlResult        = new MapList();
        DomainObject doProject  = new DomainObject(sOIDProject);
        Calendar cal            = Calendar.getInstance(TimeZone.getDefault());
        Calendar cCurrent       = Calendar.getInstance();
        int iYearCurrent        = cCurrent.get(Calendar.YEAR);
        int iMonthCurrent       = cCurrent.get(Calendar.MONTH);
        int iWeekCurrent        = cCurrent.get(Calendar.WEEK_OF_YEAR);
        long lCurrent           = cCurrent.getTimeInMillis();
        long lDiff              = 2592000000L;

        if(null == sMode) { sMode = "All"; }

        StringList busSelects = new StringList();
        StringList relSelects = new StringList();
        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_TYPE);
        busSelects.add(DomainObject.SELECT_NAME);
        busSelects.add(ProgramCentralConstants.SELECT_POLICY);
        busSelects.add(DomainObject.SELECT_CURRENT);
        busSelects.add(DomainObject.SELECT_OWNER);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
        busSelects.add(SELECT_FROM_SUBTASK);

        MapList mlTasks = doProject.getRelatedObjects(context, "Program Project,Subtask", "Project Space,Task Management", busSelects, relSelects, false, true, (short) 0, "", "", 0);

        if (mlTasks.size() > 0) {

            for (int j = 0; j < mlTasks.size(); j++) {

                Map mTask = (Map) mlTasks.get(j);
                String sCurrent     = (String) mTask.get(DomainObject.SELECT_CURRENT);
                String sType        = (String) mTask.get(DomainObject.SELECT_TYPE);
                String sIsLeaf      = (String) mTask.get(SELECT_FROM_SUBTASK);
                String sOIDResult   = (String) mTask.get(DomainObject.SELECT_ID);
                String sOwner       = (String) mTask.get(DomainObject.SELECT_OWNER);

                if (mxType.isOfParentType(context, sType, DomainConstants.TYPE_TASK)) {
                    if (!sCurrent.equals("Complete")) {
                        if (sIsLeaf.equalsIgnoreCase("FALSE")) {

                            Map mResult = new HashMap();
                            mResult.put(DomainObject.SELECT_ID        , sOIDResult    );
                            mResult.put(DomainObject.SELECT_OWNER     , sOwner        );
                            mResult.put(DomainObject.SELECT_CURRENT   , sCurrent      );

                            if (sMode.equals("All")) {
                                mlResult.add(mResult);
                            } else if (sMode.equals("Overdue")) {
                                String sTargetDate = (String) mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                if (sTargetDate != null && !"".equals(sTargetDate)) {

                                    Calendar cTarget = Calendar.getInstance();
                                    cTarget.setTime(sdf.parse(sTargetDate));

                                    if (cTarget.before(cal)) {
                                        mlResult.add(mResult);
                                    }
                                }
                            } else if (sMode.equals("This Week")) {
                                String sTargetDate = (String) mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                if (sTargetDate != null && !"".equals(sTargetDate)) {

                                    Calendar cTarget = Calendar.getInstance();
                                    cTarget.setTime(sdf.parse(sTargetDate));

                                    int iYearTarget = cTarget.get(Calendar.YEAR);
                                    int iWeekTarget = cTarget.get(Calendar.WEEK_OF_YEAR);

                                    if (iYearCurrent == iYearTarget) {
                                        if (iWeekCurrent == iWeekTarget) {
                                            mlResult.add(mResult);
                                        }
                                    }
                                }
                            } else if (sMode.equals("This Month")) {
                                String sTargetDate = (String) mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                if (sTargetDate != null && !"".equals(sTargetDate)) {

                                    Calendar cTarget = Calendar.getInstance();
                                    cTarget.setTime(sdf.parse(sTargetDate));

                                    int iYearTarget = cTarget.get(Calendar.YEAR);
                                    int iMonthTarget = cTarget.get(Calendar.MONTH);

                                    if (iYearCurrent == iYearTarget) {
                                        if (iMonthCurrent == iMonthTarget) {
                                            mlResult.add(mResult);
                                        }
                                    }
                                }
                            } else if (sMode.equals("Soon")) {
                                String sTargetDate = (String) mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                if (sTargetDate != null && !"".equals(sTargetDate)) {

                                    Calendar cTarget = Calendar.getInstance();
                                    cTarget.setTime(sdf.parse(sTargetDate));
                                    long lTarget        = cTarget.getTimeInMillis();

                                    if ((lTarget - lCurrent) < lDiff) {
                                        if ((lTarget - lCurrent) > 0) {
                                            mlResult.add(mResult);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return mlResult;

    }

    // - Deliverables
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getDeliverablesByTask(Context context, String[] args) throws Exception {

        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");
        String sMode        = (String) paramMap.get("mode");
        MapList mlResult    = new MapList();
        String[] init       = new String[]{};
        HashMap argsMap     = new HashMap();
        String[] methodargs ;
        MapList mlProjects;

        if(null == sOID || "".equals(sOID)) {
            argsMap.put("objectId", "");
            methodargs = JPO.packArgs(argsMap);
            mlProjects = (com.matrixone.apps.domain.util.MapList) JPO.invoke(context, "emxProjectSpace", init, "getActiveProjects", methodargs, com.matrixone.apps.domain.util.MapList.class);
        }  else {
            argsMap.put("objectId", sOID);
            methodargs = JPO.packArgs(argsMap);
            mlProjects = (com.matrixone.apps.domain.util.MapList)JPO.invoke(context, "emxProgramUI", init, "getProjectsOfProgram", methodargs, com.matrixone.apps.domain.util.MapList.class);
        }

        // sort the projects by the ones that are due sooner
        mlProjects.sort(SELECT_ATTRIBUTE_TASK_ESTIMATED_END_DATE, "ascending", "date");

        // get the number of charts we want to display and only display data for that number of charts
       /* String strNumberOfProjects =  EnoviaResourceBundle.getProperty(context, "emxProgramCentral.ProjectSummary.ChartsToDisplay");
        int numberOfProjects = Integer.parseInt(strNumberOfProjects);
        if ( mlProjects.size() < numberOfProjects ) {
        	numberOfProjects =  mlProjects.size();
        }

        MapList tempMapList = new MapList();;
	    for (int i=0; i<numberOfProjects;i++) {
		    Map projectMap = (Map) mlProjects.get(i);
		    tempMapList.add(projectMap);
	    }

        // set the project list to number of projects set by ChartsToDisplay
	    mlProjects = tempMapList;
        */
	    if (mlProjects.size() > 0) {
            for (int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map) mlProjects.get(i);
                String sOIDProject = (String) mProject.get(DomainObject.SELECT_ID);

                MapList mlTemp   = retrieveDeliverablesOfProject(context, args, sMode, "Create,Assign,Active,Review", sOIDProject);


                StringBuilder sbResults = new StringBuilder();
                for(int xxx = mlTemp.size() - 1; xxx >=0; xxx--) {
                    Map mResult = (Map)mlTemp.get(xxx);
                    String sOIDResult = (String)mResult.get("to.id");
                    HashMap deliverablesMap     = new HashMap();
                    deliverablesMap.put("id", sOIDResult);
                    mlResult.add(deliverablesMap);
                }


            }
        }
        return mlResult;

    }

    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getDeliverablesOfProjectByTask(Context context, String[] args) throws Exception {

        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");
        String sMode        = (String) paramMap.get("mode");
        MapList mlTemp   = retrieveDeliverablesOfProject(context, args, sMode, "Create,Assign,Active,Review", sOID);
        MapList mlResult    = new MapList();

        StringBuilder sbResults = new StringBuilder();
        for(int i = mlTemp.size() - 1; i >=0; i--) {
            Map mResult = (Map)mlTemp.get(i);
            String sOIDResult = (String)mResult.get("to.id");
            HashMap deliverablesMap     = new HashMap();
            deliverablesMap.put("id", sOIDResult);
            mlResult.add(deliverablesMap);
        }
        return mlResult;
    }
    public MapList retrieveDeliverablesOfProject(Context context, String[] args, String sMode, String sStates, String sOIDProject) throws Exception {

        MapList mlResult        = new MapList();
        DomainObject doProject  = new DomainObject(sOIDProject);
        Calendar cal            = Calendar.getInstance(TimeZone.getDefault());
        Calendar cCurrent       = Calendar.getInstance();
        int iYearCurrent        = cCurrent.get(Calendar.YEAR);
        int iMonthCurrent       = cCurrent.get(Calendar.MONTH);
        int iWeekCurrent        = cCurrent.get(Calendar.WEEK_OF_YEAR);
        long lCurrent           = cCurrent.getTimeInMillis();
        long lDiff              = 2592000000L;

        Pattern pTypes          = new Pattern("Task Deliverable");
        StringList busSelects   = new StringList();
        StringList relSelects   = new StringList();
        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_TYPE);
        busSelects.add(DomainObject.SELECT_NAME);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);
        relSelects.add("from.current");
        relSelects.add(SELECT_FROM_ATTRIBUTE_TASK_EXTIMATED_FINISH_DATE);
        relSelects.add(SELECT_FROM_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);          // Retrieve more details for dashboards using this function
        relSelects.add(DomainObject.SELECT_FROM_ID);
        relSelects.add("to.id");

        if(null == sMode) { sMode = "All"; }

        MapList mlDeliverables = doProject.getRelatedObjects(context, "Subtask,Task Deliverable", "*", busSelects, relSelects, false, true, (short) 0, "", "", 0, null, pTypes, null);

        if (mlDeliverables.size() > 0) {

            for (int j = 0; j < mlDeliverables.size(); j++) {

                Map mDeliverable    = (Map) mlDeliverables.get(j);
                String sResultOID   = (String) mDeliverable.get(DomainObject.SELECT_FROM_ID);
                String sCurrent     = (String) mDeliverable.get("from.current");
                String sTargetDate  = (String) mDeliverable.get(SELECT_FROM_ATTRIBUTE_TASK_EXTIMATED_FINISH_DATE);

                mDeliverable.put(DomainObject.SELECT_ID, sResultOID);
                mDeliverable.remove("level");
                mDeliverable.remove("Level");

                Calendar cTarget    = Calendar.getInstance();
                cTarget.setTime(sdf.parse(sTargetDate));
                int iYearTarget     = cTarget.get(Calendar.YEAR);
                int iWeekTarget     = cTarget.get(Calendar.WEEK_OF_YEAR);
                int iMonthTarget    = cTarget.get(Calendar.MONTH);


                if (sStates.contains(sCurrent)) {
                    if (sMode.equals("All")) {
                        mlResult.add(mDeliverable);
                    } else if (sMode.equals("Overdue")) {
                            if (sTargetDate != null && !"".equals(sTargetDate)) {
                                if (cTarget.before(cal)) {
                                    mlResult.add(mDeliverable);
                                }
                            }
                    } else if (sMode.equals("This Week")) {
                        if (iYearCurrent == iYearTarget) {
                            if (iWeekCurrent == iWeekTarget) {
                                mlResult.add(mDeliverable);
                            }
                        }
                    } else if (sMode.equals("This Month")) {
                        if (iYearCurrent == iYearTarget) {
                            if (iMonthCurrent == iMonthTarget) {
                                mlResult.add(mDeliverable);
                            }
                        }
                    } else if (sMode.equals("Soon")) {
                        long lTarget        = cTarget.getTimeInMillis();
                        if ((lTarget - lCurrent) < lDiff) {
                            if ((lTarget - lCurrent) > 0) {
                                mlResult.add(mDeliverable);
                            }
                        }
                    }

                }
            }
        }

        return mlResult;

    }

    // - Issues
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getPendingIssues(Context context, String[] args) throws Exception {


        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");
        String sMode        = (String) paramMap.get("mode");
        MapList mlResult    = new MapList();
        String[] init       = new String[]{};
        HashMap argsMap     = new HashMap();
        String[] methodargs;
        MapList mlProjects;
        Set resultSet = new HashSet();

        if(null == sOID || "".equals(sOID)) {
            argsMap.put("objectId", "");
            methodargs = JPO.packArgs(argsMap);
            mlProjects = (com.matrixone.apps.domain.util.MapList) JPO.invoke(context, "emxProjectSpace", init, "getActiveProjects", methodargs, com.matrixone.apps.domain.util.MapList.class);
        }  else {
            argsMap.put("objectId", sOID);
            methodargs = JPO.packArgs(argsMap);
            mlProjects = (com.matrixone.apps.domain.util.MapList)JPO.invoke(context, "emxProgramUI", init, "getProjectsOfProgram", methodargs, com.matrixone.apps.domain.util.MapList.class);
        }

        // sort the projects by the ones that are due sooner
        mlProjects.sort(SELECT_ATTRIBUTE_TASK_ESTIMATED_END_DATE, "ascending", "date");

        // get the number of charts we want to display and only display data for that number of charts
       /* String strNumberOfProjects =  EnoviaResourceBundle.getProperty(context, "emxProgramCentral.ProjectSummary.ChartsToDisplay");
        int numberOfProjects = Integer.parseInt(strNumberOfProjects);
        if ( mlProjects.size() < numberOfProjects ) {
        	numberOfProjects =  mlProjects.size();
        }

        MapList tempMapList = new MapList();;
	    for (int i=0; i<numberOfProjects;i++) {
		    Map projectMap = (Map) mlProjects.get(i);
		    tempMapList.add(projectMap);
	    }

        // set the project list to number of projects set by ChartsToDisplay
	    mlProjects = tempMapList;
        */
        if (mlProjects.size() > 0) {
            for (int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map) mlProjects.get(i);
                String sOIDProject = (String) mProject.get(DomainObject.SELECT_ID);
                MapList mlTemp = retrievePendingIssuesOfProject(context, args, sMode, sOIDProject);
                resultSet.addAll(mlTemp);
            }
        }
        mlResult.addAll(resultSet);

        return mlResult;

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getPendingIssuesOfProject(Context context, String[] args) throws Exception {
        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");
        String sMode        = (String) paramMap.get("mode");
        return retrievePendingIssuesOfProject(context, args, sMode, sOID);
    }
    public MapList retrievePendingIssuesOfProject(Context context, String[] args, String sMode, String sOIDProject) throws Exception {


        MapList mlResult        = new MapList();
        Calendar cal            = Calendar.getInstance(TimeZone.getDefault());
        Calendar cCurrent       = Calendar.getInstance();
        int iYearCurrent        = cCurrent.get(Calendar.YEAR);
        int iMonthCurrent       = cCurrent.get(Calendar.MONTH);
        int iWeekCurrent        = cCurrent.get(Calendar.WEEK_OF_YEAR);
        long lCurrent           = cCurrent.getTimeInMillis();
        long lDiff              = 2592000000L;

        StringList busSelectsIssues = new StringList();
        busSelectsIssues.add(SELECT_ESTIMATED_END_DATE);
        busSelectsIssues.add(SELECT_ATTRIBUTE_ACTUAL_END_DATE);
        busSelectsIssues.add(DomainObject.SELECT_CURRENT);
        busSelectsIssues.add(DomainObject.SELECT_ID);

        DomainObject doProject = new DomainObject(sOIDProject);
        MapList mlIssuesConnected = doProject.getRelatedObjects(context, "Issue", "Issue", busSelectsIssues, null, true, false, (short) 1, "", "", 0 );

        if (mlIssuesConnected.size() > 0) {

            for (int j = 0; j < mlIssuesConnected.size(); j++) {

                Map mIssue = (Map) mlIssuesConnected.get(j);
                String sCurrent = (String) mIssue.get(DomainObject.SELECT_CURRENT);

                if (!sCurrent.equals("Closed")) {
                    String sTargetDate = (String) mIssue.get(SELECT_ESTIMATED_END_DATE);
                    if(sMode.equals("All")) {
                                                        mlResult.add(mIssue);
                    } else if (sTargetDate != null && !"".equals(sTargetDate)) {
                        Calendar cTarget = Calendar.getInstance();
                        cTarget.setTime(sdf.parse(sTargetDate));
                        if (sMode.equals("Overdue")) {
                            if (cTarget.before(cal)) {
                                mlResult.add(mIssue);
                            }
                        } else if (sMode.equals("All")) {
                            mlResult.add(mIssue);
                        } else if (sMode.equals("This Week")) {
                            int iYearTarget = cTarget.get(Calendar.YEAR);
                            int iWeekTarget = cTarget.get(Calendar.WEEK_OF_YEAR);
                            if (iYearCurrent == iYearTarget) {
                                if (iWeekCurrent == iWeekTarget) {
                                    mlResult.add(mIssue);
                                }
                            }
                        } else if (sMode.equals("This Month")) {
                            int iYearTarget = cTarget.get(Calendar.YEAR);
                            int iMonthTarget = cTarget.get(Calendar.MONTH);
                            if (iYearCurrent == iYearTarget) {
                                if (iMonthCurrent == iMonthTarget) {
                                    mlResult.add(mIssue);
                                }
                            }
                        } else if (sMode.equals("Soon")) {
                            long lTarget        = cTarget.getTimeInMillis();
                            if ((lTarget - lCurrent) < lDiff) {
                                if ((lTarget - lCurrent) > 0) {
                                    mlResult.add(mIssue);
                                }
                            }
                        }
                    }
                }
            }
        }


        return mlResult;
    }


    // Program Browser
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getProjectsOfProgram(Context context, String[] args) throws Exception {

        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        String sOID             = (String) paramMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        StringList busSelects   = new StringList();
        StringList relSelects   = new StringList();
    	String busWhere ="current!=" + ProjectSpace.STATE_PROJECT_COMPLETE + " && current!=" + ProjectSpace.STATE_PROJECT_ARCHIVE +
    			" && current!=" + ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD + " && current!=" + ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_CANCEL;

        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(SELECT_ATTRIBUTE_TASK_ESTIMATED_END_DATE);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);

        String relPattern = DomainConstants.RELATIONSHIP_PROGRAM_PROJECT;
        String typePattern = DomainConstants.TYPE_PROJECT_SPACE + "," + DomainConstants.TYPE_PROJECT_CONCEPT;

    	return dObject.getRelatedObjects(context, relPattern, typePattern, busSelects, relSelects, false, true, (short)1, busWhere, "", 0);

    }

    // My Dashboard
    public JsonArray getUserDashboardData(Context context, String[] args) throws Exception {

        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        String sOID             = (String)paramMap.get("objectId");
        String sLanguage        = (String)paramMap.get("languageStr");
        Integer[] iCounters     = new Integer[7];
        Integer[] iCountPercent = new Integer[5];
        Integer[] iCountWeek    = new Integer[3];
        int iCountMRU           = 0;

        for(int i = 0; i < iCounters.length; i++)       { iCounters[i]      = 0; }
        for(int i = 0; i < iCountPercent.length; i++)   { iCountPercent[i]  = 0; }
        for(int i = 0; i < iCountWeek.length; i++)      { iCountWeek[i]     = 0; }

        StringBuilder sbAxisProjects    = new StringBuilder();
        StringBuilder sbDataProjects    = new StringBuilder();
        StringBuilder sbInfo1           = new StringBuilder();
        StringBuilder sbInfo2           = new StringBuilder();
        StringBuilder sbInfo3           = new StringBuilder();
        StringBuilder sbInfo4           = new StringBuilder();
        StringBuilder sbCountWeek1      = new StringBuilder();
        StringBuilder sbCountWeek2      = new StringBuilder();
        StringBuilder sbCountWeek3      = new StringBuilder();
        StringBuilder sbTimeline1       = new StringBuilder();
        StringBuilder sbTimeline2       = new StringBuilder();
        StringBuilder sbTimeline3       = new StringBuilder();

        JsonArrayBuilder   timeLine1ArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder   timeLine2ArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder   timeLine3ArrayBuilder = Json.createArrayBuilder();

        Calendar cNow   = Calendar.getInstance();
        int iNowWeek 	= cNow.get(Calendar.WEEK_OF_YEAR);
        int iNowMonth 	= cNow.get(Calendar.MONTH);
        int iNowYear 	= cNow.get(Calendar.YEAR);
        Calendar cSoon  = Calendar.getInstance();
        Calendar cMRU   = Calendar.getInstance();
        Calendar cModified    = Calendar.getInstance();
        Calendar cTarget    = Calendar.getInstance();
        Calendar cCreation = Calendar.getInstance();

        cSoon.add(java.util.GregorianCalendar.DAY_OF_YEAR, +30);
        cMRU.add(java.util.GregorianCalendar.DAY_OF_YEAR, -1);
		
		//This method will return assigned task(s) to user including completed task(s).
        MapList mlTasksPendingandCompleted = retrieveMyTasksPending(context, args, ProgramCentralConstants.EMPTY_STRING, true, true);
		MapList mlTasksPending = new MapList();

		int mlTasksPendingandCompletedSize = mlTasksPendingandCompleted.size();
        for(int i = 0; i < mlTasksPendingandCompletedSize; i++) {

            Map mTask           = (Map)mlTasksPendingandCompleted.get(i);
            String sDate        = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            String sPercent     = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
            String sModified     = (String)mTask.get("modified");
			String currentState = (String)mTask.get(Task.SELECT_CURRENT);
			

            cModified.setTime(sdf.parse(sModified));
            if(cModified.after(cMRU)) { iCountMRU++; }

            Double dPercent = Task.parseToDouble(sPercent);

            if(dPercent      <= 25.0)    { iCountPercent[0]++; }
            else if(dPercent <= 50.0)    { iCountPercent[1]++; }
            else if(dPercent <= 75.0)    { iCountPercent[2]++; }
            else if(dPercent < 100.0)   { iCountPercent[3]++; }
            else                        { iCountPercent[4]++; }

            if(UIUtil.isNullOrEmpty(sDate)){
				continue;
			}

            cTarget.setTime(sdf.parse(sDate));

            int iWeek 	= cTarget.get(Calendar.WEEK_OF_YEAR);
            int iMonth 	= cTarget.get(Calendar.MONTH);
            int iYear 	= cTarget.get(Calendar.YEAR);
			
			if(!"Complete".equalsIgnoreCase(currentState)){
				if(iYear == iNowYear) {
					if(iMonth == iNowMonth) { iCounters[1]++;}
					if(iWeek == iNowWeek) { iCounters[0]++;}
				}
				if(cTarget.before(cNow)) { iCounters[3]++; }
				else if(cTarget.before(cSoon)) { iCounters[2]++;}
				mlTasksPending.add(mTask);
			}
        }
 
		  int mlTasksPendingSize = mlTasksPending.size();
        JsonObject range1dataObject = Json.createObjectBuilder()
        .add("name", "25%")
        .add("y", iCountPercent[0])
        .add("color", "#d5e8f2")
        .add("value", "0-25")
        .build();

        JsonObject range2dataObject = Json.createObjectBuilder()
        .add("name", "26-50%")
        .add("y", iCountPercent[1])
        .add("color", "#78befa")
        .add("value", "26-50")
        .build();

        JsonObject range3dataObject = Json.createObjectBuilder()
        .add("name", "51-75%")
        .add("y", iCountPercent[2])
        .add("color", "#368ec4")
        .add("value", "51-75")
        .build();

        JsonObject range4dataObject = Json.createObjectBuilder()
		.add("name", "76-99%")
		.add("y", iCountPercent[3])
		.add("color", "#005686")
		.add("value", "76-99")
        .build();

        JsonObject range5dataObject = Json.createObjectBuilder()
		.add("name", "100%")
        .add("y", iCountPercent[4])
        .add("color", "#FF8A2E")
        .add("value", "100")
        .build();

        JsonArray projectsStatusArray = Json.createArrayBuilder()
        .add(range1dataObject)
        .add(range2dataObject)
        .add(range3dataObject)
        .add(range4dataObject)
        .add(range5dataObject)
        .build();

        MapList mlDataProjects              = new MapList();
        java.util.List<String> lProjects    = new ArrayList<String>();
        StringList slProject = new StringList();
        slProject.add(DomainObject.SELECT_ID);
        slProject.add(DomainObject.SELECT_NAME);

        for(int i = 0; i < mlTasksPendingSize; i++) {

            Map mTask           = (Map)mlTasksPending.get(i);
            //String sOIDTask     = (String)mTask.get(DomainObject.SELECT_ID);
            //Task task           = new Task(sOIDTask);

            try { // The method getpProject may fail if there is no project for a task (happens during import)

                //Map mProject        = task.getProject(context, slProject);
    		String sProjectName = (String)mTask.get(ProgramCentralConstants.SELECT_TASK_PROJECT_NAME);
    		if(ProgramCentralUtil.isNullString(sProjectName)){
            	continue;
            }
                if(!lProjects.contains(sProjectName)) {
                    lProjects.add(sProjectName);
    	 	    String sProjectOID = (String)mTask.get(ProgramCentralConstants.SELECT_TASK_PROJECT_ID);
                    Map mData = new HashMap();
                    mData.put(DomainObject.SELECT_ID, sProjectOID);
                    mData.put(DomainObject.SELECT_NAME, sProjectName);
                    mData.put("count", "1");
                    mlDataProjects.add(mData);
                } else {
                    int iIndex = lProjects.indexOf(sProjectName);
                    Map mData = (Map)mlDataProjects.get(iIndex);
                    String sValue = (String)mData.get("count");
                    int iValue = Integer.parseInt(sValue);
                    iValue++;
                    mData.put("count", String.valueOf(iValue));
                }
            } catch (Exception e) {}

        }

        mlDataProjects.sort("count", "descending", "integer");

        JsonArrayBuilder projectsObjectArrayBuilder = Json.createArrayBuilder();
        JsonArrayBuilder labelProjectsArrayBuilder = Json.createArrayBuilder();


        for(int i = 0; i < mlDataProjects.size(); i++) {
            Map mData = (Map)mlDataProjects.get(i);
            String sID = (String)mData.get(DomainObject.SELECT_ID);
            String sName = (String)mData.get(DomainObject.SELECT_NAME);
            int iCount = Integer.parseInt((String)mData.get("count"));
            labelProjectsArrayBuilder.add(sName);

            JsonObject dataObject = Json.createObjectBuilder()
    		.add("name", sName)
            .add("y", iCount)
            .add("color", "#"+sColors[i%sColors.length])
            .add("id", sID)
            .build();

            projectsObjectArrayBuilder.add(dataObject);

        }

        // Task Timeline data

        for(int i = 0; i < mlTasksPendingSize; i++) {

            Map mTask               = (Map)mlTasksPending.get(i);
            String sDateModified    = (String)mTask.get("modified");
            String sDateAssigned    = (String)mTask.get("state[Assign].start");
            String sDateInReview    = (String)mTask.get("state[Review].start");
            //Calendar cModified      = Calendar.getInstance();

            cModified.setTime(sdf.parse(sDateModified));
            if(cModified.get(Calendar.YEAR) == iNowYear) {
                if(cModified.get(Calendar.WEEK_OF_YEAR) == iNowWeek) {
                    iCountWeek[1]++;
                }
            }

            if(!"".equals(sDateAssigned)) {
                Calendar cAssigned = Calendar.getInstance();
                cAssigned.setTime(sdf.parse(sDateAssigned));
                if(cAssigned.get(Calendar.YEAR) == iNowYear) {
                    if(cAssigned.get(Calendar.WEEK_OF_YEAR) == iNowWeek) {
                        iCountWeek[0]++;
                    }
                }
            }

            if(ProgramCentralUtil.isNotNullString(sDateInReview)) {
                Calendar cInReview = Calendar.getInstance();
                cInReview.setTime(sdf.parse(sDateInReview));
                if(cInReview.get(Calendar.YEAR) == iNowYear) {
                    if(cInReview.get(Calendar.WEEK_OF_YEAR) == iNowWeek) {
                        iCountWeek[2]++;
                    }
                }
            }
        }

        mlTasksPending.sort(Task.SELECT_TASK_ESTIMATED_FINISH_DATE, "ascending", "date");

        if(mlTasksPendingSize > 0) {

            Map mTask                   = (Map)mlTasksPending.get(0);
            String sCurrent             = (String)mTask.get(DomainObject.SELECT_CURRENT);
            String sDateTimePrevious    = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            String sDatePrevious        = ProgramCentralConstants.EMPTY_STRING;
            if(UIUtil.isNotNullAndNotEmpty(sDateTimePrevious)){
            	sDatePrevious        = sDateTimePrevious.substring(0, sDateTimePrevious.indexOf(" "));
			}

            int iCountAssign            = 0;
            int iCountActive            = 0;
            int iCountReview            = 0;

            for(int i = 0; i < mlTasksPendingSize; i++) {
                mTask = (Map)mlTasksPending.get(i);
                sCurrent = (String)mTask.get(DomainObject.SELECT_CURRENT);
                String sDateTime = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);

                if(UIUtil.isNullOrEmpty(sDateTime)){
					continue;
				}

                if(UIUtil.isNullOrEmpty(sDatePrevious)){
                	sDateTimePrevious = sDateTime;
                	sDatePrevious = sDateTime.substring(0, sDateTime.indexOf(" "));
				}

                String sDate = sDateTime.substring(0, sDateTime.indexOf(" "));
                if(sDate.equals(sDatePrevious)) {
                    if(sCurrent.equals("Assign"))       { iCountAssign++; }
                    else if(sCurrent.equals("Active"))  { iCountActive++; }
                    else if(sCurrent.equals("Review"))  { iCountReview++; }
                } else {
                    cCreation.setTime(sdf.parse(sDateTimePrevious));

                    JsonArray assignedObjArr = Json.createArrayBuilder()
                    .add(cCreation.getTimeInMillis())
                    .add(iCountAssign)
                    .build();

                    timeLine1ArrayBuilder.add(assignedObjArr);

                    JsonArray activeObjArr = Json.createArrayBuilder()
                    .add(cCreation.getTimeInMillis())
                    .add(iCountActive)
                    .build();

                    timeLine2ArrayBuilder.add(activeObjArr);

                    JsonArray reviewObjArr = Json.createArrayBuilder()
                    .add(cCreation.getTimeInMillis())
                    .add(iCountReview)
                    .build();

                    timeLine3ArrayBuilder.add(reviewObjArr);

                    iCountAssign = 0;  iCountActive = 0; iCountReview = 0;

                    if(sCurrent.equals("Assign"))       { iCountAssign++; }
                    else if(sCurrent.equals("Active"))  { iCountActive++; }
                    else if(sCurrent.equals("Review"))  { iCountReview++; }

                    sDateTimePrevious = sDateTime;
                    sDatePrevious = sDate;
                }
                if (i == (mlTasksPendingSize - 1)) {
                  //  Calendar cCreation = Calendar.getInstance();
                    cCreation.setTime(sdf.parse(sDateTime));

                    JsonArray assignedObjArr = Json.createArrayBuilder()
                    .add(cCreation.getTimeInMillis())
                    .add(iCountAssign)
                    .build();

                    timeLine1ArrayBuilder.add(assignedObjArr);

                    JsonArray activeObjArr = Json.createArrayBuilder()
                    .add(cCreation.getTimeInMillis())
                    .add(iCountActive)
                    .build();

                    timeLine2ArrayBuilder.add(activeObjArr);

                    JsonArray reviewObjArr = Json.createArrayBuilder()
            		.add(cCreation.getTimeInMillis())
                    .add(iCountReview)
                    .build();

                    timeLine3ArrayBuilder.add(reviewObjArr);
                }
            }
        }

        String assignLabel = EnoviaResourceBundle.getStateI18NString(context, "Project Task", "Assign", sLanguage);
        String activeLabel = EnoviaResourceBundle.getStateI18NString(context, "Project Task", "Active", sLanguage);
        String reviewLabel = EnoviaResourceBundle.getStateI18NString(context, "Project Task", "Review", sLanguage);

        JsonObject timeLineAssigObj = Json.createObjectBuilder()
        .add("color", "#CC092F")
        .add("name", assignLabel)
        .add("data", timeLine1ArrayBuilder.build())
        .build();

        JsonObject timeLineActiveObject = Json.createObjectBuilder()
		.add("color", "#6FBC4B")
        .add("name", activeLabel)
        .add("data", timeLine2ArrayBuilder.build())
        .build();

        JsonObject timeLineReviewObject = Json.createObjectBuilder()
		.add("color", "#FF8A2E")
        .add("name", reviewLabel)
        .add("data", timeLine3ArrayBuilder.build())
        .build();

        JsonArray seriesMyPendingTasks = Json.createArrayBuilder()
        .add(timeLineAssigObj)
        .add(timeLineActiveObject)
        .add(timeLineReviewObject)
        .build();

        int iHeightProjects	= 35 + (mlDataProjects.size() * 20);

        // Info Links for My Pending Tasks By Project
        String sInfoPrefix      = " <a onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?suiteKey=ProgramCentral&table=PMCAssignedWBSTaskSummary&hideWeeklyEfforts=true&&maxCellsToDraw=2000&scrollPageSize=50&freezePane=Status,WBSTaskName,Delivarable,NewWindow&editLink=true&selection=multiple&sortColumnName=Modified&sortDirection=decending&program=emxProgramUI:";
        sbInfo1.append("<b>").append(iCounters[0]).append("</b>").append(sInfoPrefix).append("getAssignedTasksPending&mode=Week&header=emxProgramCentral.String.MyPendingTasksDueThisWeek\")'>").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.ThisWeek" , sLanguage)).append("</a>");
        sbInfo2.append("<b>").append(iCounters[1]).append("</b>").append(sInfoPrefix).append("getAssignedTasksPending&mode=Month&header=emxProgramCentral.String.MyPendingTasksDueThisMonth\")'>").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.ThisMonth" , sLanguage)).append("</a>");
        sbInfo3.append("<b>").append(iCounters[2]).append("</b>").append(sInfoPrefix).append("getAssignedTasksPending&mode=Soon&header=emxProgramCentral.String.MyPendingTasksDueSoon\")'>").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Soon" , sLanguage)).append("</a>");
        sbInfo4.append("<b>").append(iCounters[3]).append("</b>").append(sInfoPrefix).append("getAssignedTasksPending&mode=Overdue&header=emxProgramCentral.String.MyPendingTasksOverdue\")'>").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Overdue" , sLanguage)).append("</a>");

        // Info Links for My Pending Tasks By Date
        sbCountWeek1.append("<b>").append(iCountWeek[0]).append("</b>").append(sInfoPrefix).append("getAssignedTasksPending&mode=NEW&header=emxProgramCentral.String.MyPendingTasksCreatedThisWeek\")'>").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.NEW", sLanguage)).append("</a>");
        sbCountWeek2.append("<b>").append(iCountWeek[1]).append("</b>").append(sInfoPrefix).append("getAssignedTasksPending&mode=MOD&header=emxProgramCentral.String.MyPendingTasksModifiedThisWeek\")'>").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MODIFIED", sLanguage)).append("</a>");
        sbCountWeek3.append("<b>").append(iCountWeek[2]).append("</b>").append(sInfoPrefix).append("getAssignedTasksPending&mode=REV&header=emxProgramCentral.String.MyPendingTasksToReviewThisWeek\")'>").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.SetToRREVIEW", sLanguage)).append("</a>");

        // Dashboard Counters
        StringBuilder sbCounter = new StringBuilder();
        
        if(mlTasksPendingSize > 0) {
        	//Need to hide if count is 0. 
        	//It is already document that if count is zero, then it will not The Locked Document , Project Tasks , Issues , Changes or Assigned Tasks
        sbCounter.append("<td onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?table=PMCAssignedWBSTaskSummary&hideWeeklyEfforts=true&program=emxProgramUI:getAssignedTasksPending&header=emxProgramCentral.String.MyPendingTasks&maxCellsToDraw=2000&scrollPageSize=50&freezePane=Status,WBSTaskName,Delivarable,NewWindow&suiteKey=ProgramCentral\")'");
        sbCounter.append(" class='counterCell ");
        if(mlTasksPendingSize == 0)  { sbCounter.append("grayBright"); }
        else                            { sbCounter.append("greenBright");  }
        sbCounter.append("'><span class='counterText greenBright'>").append(mlTasksPendingSize).append("</span><br/>");
        sbCounter.append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.ProjectTasks", sLanguage)).append("</td>");
        }

        StringBuilder sbUpdates = new StringBuilder();
        if(sbCounter.length()>0) {
        sbUpdates.append("<td ");
        if(iCountMRU > 0) {
            sbUpdates.append(" onclick='openURLInDetails(\"../common/emxIndentedTable.jsp?table=PMCAssignedWBSTaskSummary&hideWeeklyEfforts=true&program=emxProgramUI:getAssignedTasksPending&mode=MRU&header=emxProgramCentral.String.MRUTasks&maxCellsToDraw=2000&scrollPageSize=50&freezePane=Status,WBSTaskName,Delivarable,NewWindow&suiteKey=ProgramCentral\")' ");
            sbUpdates.append(" class='mruCell'><span style='color:#000000;font-weight:bold;'>").append(iCountMRU).append("</span> <span class='counterTextMRU'>");
            if(iCountMRU == 1) { sbUpdates.append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MostRecentUpdates"  , sLanguage)); }
            else               { sbUpdates.append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MostRecentUpdates" , sLanguage)); }
            sbUpdates.append("</span>");
        } else {
				sbUpdates.append(" class='mruCell' >");
        }
        sbUpdates.append("</td>");
		}
       

        JsonObjectBuilder taskPendingObjectLinkBuilder = Json.createObjectBuilder();
        taskPendingObjectLinkBuilder.add("taskPendingThisWeek", sbInfo1.toString());
        taskPendingObjectLinkBuilder.add("taskPendingThisMonth", sbInfo2.toString());
        taskPendingObjectLinkBuilder.add("taskPendingSoon", sbInfo3.toString());
        taskPendingObjectLinkBuilder.add("taskPendingOverDue", sbInfo4.toString());

        String sLabelMyPendingTasks = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MyPendingTasksByProject", sLanguage);
        JsonObjectBuilder projectItemObjBuilder = Json.createObjectBuilder();
 	    projectItemObjBuilder.add("name", sLabelMyPendingTasks);
 	    projectItemObjBuilder.add("data", projectsObjectArrayBuilder.build());
 	   	JsonArrayBuilder seriesProjectsFinalBuilder = Json.createArrayBuilder();
 	   	seriesProjectsFinalBuilder.add(projectItemObjBuilder.build());

        JsonObjectBuilder widgetItem1 = Json.createObjectBuilder();
        widgetItem1.add("label", sLabelMyPendingTasks);
        widgetItem1.add("series", seriesProjectsFinalBuilder.build());
        widgetItem1.add("name", "Projects");
        widgetItem1.add("type", "bar");
        widgetItem1.add("height", String.valueOf(iHeightProjects));
        widgetItem1.add("xAxisCategories", labelProjectsArrayBuilder.build());
        widgetItem1.add("view", "expanded");
        widgetItem1.add("bottomLineData", taskPendingObjectLinkBuilder.build());
        widgetItem1.add("filterable", true);
        widgetItem1.add("filterURL", "../common/emxIndentedTable.jsp?hideExtendedHeader=true&suiteKey=ProgramCentral&header=emxProgramCentral.String.Name_PendingTasks&table=PMCAssignedWBSTaskSummary&program=emxProgramUI:getMyOpenTasksOfProject&hideWeeklyEfforts=true&freezePane=Status,WBSTaskName,Delivarable,NewWindow");

        String sLabelStatus = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Attribute.Percent_Complete", sLanguage);

        JsonObjectBuilder statusItemObjBuilder = Json.createObjectBuilder();
        statusItemObjBuilder.add("name", sLabelStatus);
        statusItemObjBuilder.add("data", projectsStatusArray);

 	   	JsonArrayBuilder seriesStatusFinal = Json.createArrayBuilder();
 	    seriesStatusFinal.add(statusItemObjBuilder.build());

 	   JsonObjectBuilder widgetItem2 = Json.createObjectBuilder();
        widgetItem2.add("label", sLabelStatus);
        widgetItem2.add("series", seriesStatusFinal.build());
        widgetItem2.add("name", "Status");
        widgetItem2.add("type", "pie");
        widgetItem2.add("view", "expanded");
        widgetItem2.add("filterable", true);
        widgetItem2.add("height",190);
        // add url
        String sLabelPendingTasksByDate = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MyPendingTasksByDate", sLanguage);
        String sLabelThisWeek = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.ThisWeek", sLanguage);

        JsonObjectBuilder myPendingTaskByDateObjectLink = Json.createObjectBuilder();
        myPendingTaskByDateObjectLink.add("taskPendingThisWeek", sLabelThisWeek);
        myPendingTaskByDateObjectLink.add("taskPendingThisMonth", sbCountWeek1.toString());
        myPendingTaskByDateObjectLink.add("taskPendingSoon", sbCountWeek2.toString());
        myPendingTaskByDateObjectLink.add("taskPendingOverDue", sbCountWeek3.toString());

        JsonObjectBuilder widgetItem3 = Json.createObjectBuilder();
        widgetItem3.add("label", sLabelPendingTasksByDate);
        widgetItem3.add("series", seriesMyPendingTasks);
        widgetItem3.add("name", "Tasks");
        widgetItem3.add("type", "spline");
        widgetItem3.add("view", "expanded");
        widgetItem3.add("bottomLineData", myPendingTaskByDateObjectLink.build());
        widgetItem3.add("filterable", true);
        // I am addin links to widget3, we can add this is any of widget but have to keep track.
        widgetItem3.add("counterLink", sbCounter.toString());
        widgetItem3.add("updateLink", sbUpdates.toString());

        JsonArray widgetArr = Json.createArrayBuilder()
		.add(widgetItem1.build())
        .add(widgetItem2.build())
        .add(widgetItem3.build())
        .build();
        return widgetArr;
    }
    public Vector columnFolderContext(Context context, String[] args) throws Exception {

    	Vector vResult          = new Vector ();

        /*HashMap programMap      = (HashMap) JPO.unpackArgs (args);
        MapList mlObjects       = (MapList) programMap.get ("objectList");
        String sDimensions      = EnoviaResourceBundle.getProperty(context, "emxFramework.PopupSize.Large");
        String[] aDimensions    = sDimensions.split("x");

        StringList busSelects = new StringList();
        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_TYPE);
        busSelects.add(DomainObject.SELECT_NAME);
        busSelects.add("originated");

        Pattern pTypes = new Pattern("Project Space");
        pTypes.addPattern("Workspace");

        for (int i = 0; i < mlObjects.size (); i++) {

            Map mObject             = (Map) mlObjects.get (i);
            String sOID             = (String) mObject.get (DomainObject.SELECT_ID);
            DomainObject dObject    = new DomainObject (sOID);
            StringBuilder sbResult  = new StringBuilder();

            MapList mlProjects = dObject.getRelatedObjects (context, "Sub Vaults,Data Vaults,Vaulted Objects,Vaulted Documents Rev2", "Project Space,Workspace Vault,Workspace", busSelects, null, true, false, (short)0, "", "", 0, pTypes, null, null);

            if(mlProjects.size() > 0) {

                mlProjects.sort("originated", "ascending", "date");

                Map mProject    = (Map)mlProjects.get(0);
                String sId      = (String)mProject.get(DomainObject.SELECT_ID);
                String sName    = (String)mProject.get(DomainObject.SELECT_NAME);
                String sType    = (String)mProject.get(DomainObject.SELECT_TYPE);
                String sIcon    = UINavigatorUtil.getTypeIconProperty(context, sType);

                sbResult.append("<span style='white-space:nowrap;'><img src=\"../common/images/").append(sIcon).append("\" /> <a href=\"javascript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=").append(sId).append("', '950', '650', 'false', 'popup', '')\" class=\"object\">").append(sName).append("</a></span>");

            }
            if(mlProjects.size() > 1) {
                sbResult.append(" ");
                sbResult.append("<a style='font-weight:normal !important;' href='#' onClick=\"");
                sbResult.append("emxTableColumnLinkClick('../common/emxTree.jsp?DefaultCategory=APPWhereUsed&amp;objectId=").append(sOID);
                sbResult.append("', 'popup', '', '").append(aDimensions[0]).append("', '").append(aDimensions[1]).append("', '')\">");
                sbResult.append("(more)");
                sbResult.append("</a>");
            }

            vResult.add(sbResult.toString());

        }*/

        return vResult;
    }
    public Vector columnDocumentPath(Context context, String[] args) throws Exception {

    	return new Vector();
       /* HashMap programMap      = (HashMap) JPO.unpackArgs (args);
        MapList mlObjects       = (MapList) programMap.get ("objectList");
        Vector vResult          = new Vector (mlObjects.size ());
        String sOID             = "";
        String sDimensions      = EnoviaResourceBundle.getProperty(context, "emxFramework.PopupSize.Large");
        String[] aDimensions    = sDimensions.split("x");

        StringList busSelects = new StringList();
        StringList relSelects = new StringList();
        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_NAME);
        relSelects.add("originated");

        for (int i = 0; i < mlObjects.size (); i++) {

            StringBuilder sbResult  = new StringBuilder();
            Map mObject             = (Map) mlObjects.get (i);
            sOID                    = (String) mObject.get (DomainObject.SELECT_ID);
            DomainObject doDocument = new DomainObject(sOID);
            MapList mlFolders       = doDocument.getRelatedObjects(context, "Sub Vaults,Vaulted Objects,Vaulted Documents Rev2", "Workspace Vault", busSelects, relSelects, true, false, (short)0, "", "", 0);
            Boolean bMore           = false;

            if(mlFolders.size() > 0) {

                mlFolders.sortStructure("originated", "ascending", "date");
                int iLevelPrev = 0;

                for(int j = 0; j < mlFolders.size(); j++) {

                    Map mFolder         = (Map)mlFolders.get(j);
                    String sLevel       = (String)mFolder.get("level");
                    String sOIDFolder   = (String)mFolder.get(DomainObject.SELECT_ID);
                    String sName        = (String)mFolder.get(DomainObject.SELECT_NAME);
                    int iLevel          = Integer.parseInt(sLevel);

                    if(iLevel <= iLevelPrev) {
                        bMore = true;
                        break;
                    }
                    if(j > 0) { sbResult.insert(0, " \\ "); }

                    sbResult.insert(0, "</a>");
                    sbResult.insert(0, sName);
                    sbResult.insert(0, "<img src = '../common/images/iconSmallFolder.gif' /> ");
                    sbResult.insert(0, "', 'popup', '', '" + aDimensions[0] + "', '" + aDimensions[1] + "', '');\">");
                    sbResult.insert(0, sOIDFolder);
                    sbResult.insert(0, "<a href='#' onClick=\"emxTableColumnLinkClick('../common/emxTree.jsp?emxSuiteDirectory=programcentral&amp;suiteKey=ProgramCentral&amp;objectId=");

                    iLevelPrev = iLevel;
                }

                if(bMore) {
                    sbResult.append(" ");
                    sbResult.append("<a style='font-weight:normal !important;' href='#' onClick=\"");
                    sbResult.append("emxTableColumnLinkClick('../common/emxTree.jsp?DefaultCategory=APPWhereUsed&amp;objectId=").append(sOID).append("', 'popup', '', '" + aDimensions[0] + "', '" + aDimensions[1] + "', '')\">");
                    sbResult.append("(more)");
                    sbResult.append("</a>");
                }

            }

            vResult.addElement (sbResult.toString());
        }
        return vResult;*/
    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getMyOpenTasks(Context context, String[] args) throws Exception {   // My Pending Tasks Tab
        return retrieveMyTasksPending(context, args, "", false);
    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAssignedTasksPending(Context context, String[] args) throws Exception {

        MapList mlResults       = new MapList();
        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        String sOID             = (String) paramMap.get("objectId");
        String sMode            = (String) paramMap.get("mode");
        StringBuilder sbWhere   = new StringBuilder();
        Calendar cal            = Calendar.getInstance(TimeZone.getDefault());

        if(null == sMode) { sMode = ""; }

        if(sMode.equals("MRU")) {

            cal.add(java.util.GregorianCalendar.DAY_OF_YEAR, -1);

            String sMinute  = String.valueOf(cal.get(Calendar.MINUTE));
            String sSecond  = String.valueOf(cal.get(Calendar.SECOND));
            String sAMPM    = (cal.get(Calendar.AM_PM) == 0 ) ? "AM" : "PM";

            if(sMinute.length() == 1) { sMinute = "0" + sMinute; }
            if(sSecond.length() == 1) { sSecond = "0" + sSecond; }

            sbWhere.append(" && (modified >= \"");
            sbWhere.append(cal.get(Calendar.MONTH) + 1).append("/").append(cal.get(Calendar.DAY_OF_MONTH)).append("/").append(cal.get(Calendar.YEAR));
            sbWhere.append(" ").append(cal.get(Calendar.HOUR)).append(":").append(sMinute).append(":").append(sSecond).append(" ").append(sAMPM);
            sbWhere.append("\")");

            return retrieveMyTasksPending(context, args, sbWhere.toString(), true);

        } else if(sMode.equals("Week")) {

            Calendar cNow       = Calendar.getInstance();
            int iNowWeek        = cNow.get(Calendar.WEEK_OF_YEAR);
            int iNowYear        = cNow.get(Calendar.YEAR);
            MapList mlTasks     = retrieveMyTasksPending(context, args, "", true);

            for(int i = 0; i < mlTasks.size(); i++) {

                Map mTask           = (Map)mlTasks.get(i);
                String sDate        = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                Calendar cTarget    = Calendar.getInstance();

                cTarget.setTime(sdf.parse(sDate));

                int iWeek 	= cTarget.get(Calendar.WEEK_OF_YEAR);
                int iYear 	= cTarget.get(Calendar.YEAR);

                if(iYear == iNowYear) {
                    if(iWeek == iNowWeek) {
                        mlResults.add(mTask);
                    }
                }

            }

        } else if(sMode.equals("Month")) {

            Calendar cNow = Calendar.getInstance();
            int iNowMonth 	= cNow.get(Calendar.MONTH);
            int iNowYear 	= cNow.get(Calendar.YEAR);

            MapList mlTasks = retrieveMyTasksPending(context, args, "", true);

            for(int i = 0; i < mlTasks.size(); i++) {
                Map mTask = (Map)mlTasks.get(i);
                String sDate = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                Calendar cTarget = Calendar.getInstance();
                cTarget.setTime(sdf.parse(sDate));
                int iMonth 	= cTarget.get(Calendar.MONTH);
                int iYear 	= cTarget.get(Calendar.YEAR);

                if(iYear == iNowYear) {
                    if(iMonth == iNowMonth) {
                        mlResults.add(mTask);
                    }
                }

            }

        } else if(sMode.equals("Soon")) {

            Calendar cTomorrow   = Calendar.getInstance();
            Calendar cSoon  = Calendar.getInstance();

            cSoon.add(java.util.GregorianCalendar.DAY_OF_YEAR, +30);

            sbWhere.append(" && ");
            sbWhere.append("(attribute[Task Estimated Finish Date] >= '").append(cTomorrow.get(Calendar.MONTH) + 1).append("/").append(cTomorrow.get(Calendar.DAY_OF_MONTH)).append("/").append(cTomorrow.get(Calendar.YEAR)).append("')");
            sbWhere.append(" && ");
            sbWhere.append("(attribute[Task Estimated Finish Date] <= '").append(cSoon.get(Calendar.MONTH) + 1).append("/").append(cSoon.get(Calendar.DAY_OF_MONTH)).append("/").append(cSoon.get(Calendar.YEAR)).append("')");

            mlResults = retrieveMyTasksPending(context, args, sbWhere.toString(), true);

        } else if(sMode.equals("Overdue")) {

            sbWhere.append(" && (attribute[Task Estimated Finish Date] < '");
            sbWhere.append(cal.get(Calendar.MONTH) + 1).append("/").append(cal.get(Calendar.DAY_OF_MONTH)).append("/").append(cal.get(Calendar.YEAR)).append(" 00:00:00 AM").append("')");

            mlResults = retrieveMyTasksPending(context, args, sbWhere.toString(), true);

        } else if(sMode.equals("By Project")) {

            String sUser        = context.getUser();
            MapList mlTasks     = retrieveOpenTasksOfProject(context, args, "All", sOID);

            StringList busSelects = new StringList();
            busSelects.add(DomainObject.SELECT_NAME);

            for (int i = 0; i < mlTasks.size(); i++) {
                Map mTask = (Map)mlTasks.get(i);
                    String sOIDTask = (String)mTask.get(DomainObject.SELECT_ID);
                    DomainObject doTask = new DomainObject(sOIDTask);
                    MapList mlAssignees = doTask.getRelatedObjects(context, DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "Person", busSelects, null, true, false, (short)1, "name == '" + sUser + "'", "", 0);
                    if(mlAssignees.size() > 0) {
                        mlResults.add(mTask);
                    }
            }

        } else if(sMode.equals("By Percent Complete")) {

            String sPercent     = (String) paramMap.get("percent");
            String sValueMin    = "100.0";
            String sValueMax    = "1000.0";

            if(sPercent.equals("0-25"))       { sValueMin =  "0.0"; sValueMax =  "26.0"; }
            else if(sPercent.equals("26-50")) { sValueMin = "26.0"; sValueMax =  "51.0"; }
            else if(sPercent.equals("51-75")) { sValueMin = "51.0"; sValueMax =  "76.0"; }
            else if(sPercent.equals("76-99")) { sValueMin = "76.0"; sValueMax = "100.0"; }

            sbWhere.append(" && ").append("(attribute[Percent Complete] >= '").append(sValueMin).append("')");
            sbWhere.append(" && ").append("(attribute[Percent Complete] <  '").append(sValueMax).append("')");

            mlResults = retrieveMyTasksPending(context, args, sbWhere.toString(), true);

        } else if(sMode.equals("By Date")) {

            String sDate        = (String) paramMap.get("date");
            Calendar cStart     = Calendar.getInstance();
            Calendar cEnd       = Calendar.getInstance();

            long lDate = Long.parseLong(sDate);
            cStart.setTimeInMillis(lDate);
            cEnd.setTimeInMillis(lDate);
            cEnd.add(java.util.GregorianCalendar.DAY_OF_YEAR, 1);

            sbWhere.append(" && ");
            sbWhere.append("(current != 'Create')");
            sbWhere.append(" && ");
            sbWhere.append("(attribute[Task Estimated Finish Date] >= '").append(cStart.get(Calendar.MONTH) + 1).append("/").append(cStart.get(Calendar.DAY_OF_MONTH)).append("/").append(cStart.get(Calendar.YEAR)).append("')");
            sbWhere.append(" && ");
            sbWhere.append("(attribute[Task Estimated Finish Date] <= '").append(cEnd.get(Calendar.MONTH) + 1).append("/").append(cEnd.get(Calendar.DAY_OF_MONTH)).append("/").append(cEnd.get(Calendar.YEAR)).append("')");

            mlResults = retrieveMyTasksPending(context, args, sbWhere.toString(), true);

        } else if(sMode.equals("NEW")) {

            Calendar cNow       = Calendar.getInstance();
            int iNowYear        = cNow.get(Calendar.YEAR);
            int iNowWeek        = cNow.get(Calendar.WEEK_OF_YEAR);

            cNow.add(java.util.GregorianCalendar.DAY_OF_YEAR,-8);
            sbWhere.append(" && (state[Assign].start > '");
            sbWhere.append(cNow.get(Calendar.MONTH) + 1).append("/").append(cNow.get(Calendar.DAY_OF_MONTH)).append("/").append(cNow.get(Calendar.YEAR)).append("')");

            MapList mlTasks = retrieveMyTasksPending(context, args, sbWhere.toString(), true);

            for(int i = 0; i < mlTasks.size(); i++) {

                Map mTask           = (Map)mlTasks.get(i);
                String sDate        = (String)mTask.get("state[Assign].start");
                Calendar cTarget    = Calendar.getInstance();

                cTarget.setTime(sdf.parse(sDate));

                int iWeek 	= cTarget.get(Calendar.WEEK_OF_YEAR);
                int iYear 	= cTarget.get(Calendar.YEAR);

                if(iYear == iNowYear) {
                    if(iWeek == iNowWeek) {
                        mlResults.add(mTask);
                    }
                }

            }

        } else if(sMode.equals("MOD")) {

            Calendar cNow   = Calendar.getInstance();
            int iNowYear    = cNow.get(Calendar.YEAR);
            int iNowWeek    = cNow.get(Calendar.WEEK_OF_YEAR);

            cNow.add(java.util.GregorianCalendar.DAY_OF_YEAR,-8);
            sbWhere.append(" && (modified > '");
            sbWhere.append(cNow.get(Calendar.MONTH) + 1).append("/").append(cNow.get(Calendar.DAY_OF_MONTH)).append("/").append(cNow.get(Calendar.YEAR)).append("')");

            MapList mlTasks = retrieveMyTasksPending(context, args, sbWhere.toString(), true);

            for(int i = 0; i < mlTasks.size(); i++) {
                Map mTask = (Map)mlTasks.get(i);
                String sDate = (String)mTask.get("modified");
                Calendar cTarget = Calendar.getInstance();
                cTarget.setTime(sdf.parse(sDate));
                int iWeek 	= cTarget.get(Calendar.WEEK_OF_YEAR);
                int iYear 	= cTarget.get(Calendar.YEAR);

                if(iYear == iNowYear) {
                    if(iWeek == iNowWeek) {
                        mlResults.add(mTask);
                    }
                }

            }

        } else if(sMode.equals("REV")) {

            Calendar cNow   = Calendar.getInstance();
            int iNowYear    = cNow.get(Calendar.YEAR);
            int iNowWeek    = cNow.get(Calendar.WEEK_OF_YEAR);

            cNow.add(java.util.GregorianCalendar.DAY_OF_YEAR,-8);
            sbWhere.append(" && (state[Review].start > '");
            sbWhere.append(cNow.get(Calendar.MONTH) + 1).append("/").append(cNow.get(Calendar.DAY_OF_MONTH)).append("/").append(cNow.get(Calendar.YEAR)).append("')");

            MapList mlTasks = retrieveMyTasksPending(context, args, sbWhere.toString(), true);

            for(int i = 0; i < mlTasks.size(); i++) {
                Map mTask = (Map)mlTasks.get(i);
                String sDate = (String)mTask.get("state[Review].start");
                Calendar cTarget = Calendar.getInstance();
                cTarget.setTime(sdf.parse(sDate));
                int iWeek 	= cTarget.get(Calendar.WEEK_OF_YEAR);
                int iYear 	= cTarget.get(Calendar.YEAR);

                if(iYear == iNowYear) {
                    if(iWeek == iNowWeek) {
                        mlResults.add(mTask);
                    }
                }

            }

        } else {
            mlResults = retrieveMyTasksPending(context, args, "", true);
        }

        return mlResults;

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getMyOpenTasksOfProject(Context context, String[] args) throws Exception {


        MapList mlResults   = new MapList();
        String sUser        = context.getUser();
        HashMap programMap  = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) programMap.get("objectId");
        MapList mlTasks     = retrieveOpenTasksOfProject(context, args, "All", sOID);
        StringList selBUS   = new StringList();

        selBUS.add(DomainObject.SELECT_NAME);

        for (int i = 0; i < mlTasks.size(); i++) {

            Map mTask       = (Map)mlTasks.get(i);
            String sOIDTask = (String)mTask.get(DomainObject.SELECT_ID);
            String sCurrent = (String)mTask.get(DomainObject.SELECT_CURRENT);

            if(!"Create".equals(sCurrent)) {
                DomainObject doTask = new DomainObject(sOIDTask);
                MapList mlAssignees = doTask.getRelatedObjects(context, DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "Person", selBUS, null, true, false, (short)1, "name == '" + sUser + "'", "", 0);
                if(mlAssignees.size() > 0) { mlResults.add(mTask); }
            }
        }

        return mlResults;

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getMyOpenTasksByPercentComplete(Context context, String[] args) throws Exception {

        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sPercent     = (String) paramMap.get("percent");
        String sValueMin    = "100.0";
        String sValueMax    = "1000.0";

        if(sPercent.equals("0-25"))       { sValueMin =  "0.0"; sValueMax =  "26.0"; }
        else if(sPercent.equals("26-50")) { sValueMin = "26.0"; sValueMax =  "51.0"; }
        else if(sPercent.equals("51-75")) { sValueMin = "51.0"; sValueMax =  "76.0"; }
        else if(sPercent.equals("76-99")) { sValueMin = "76.0"; sValueMax = "100.0"; }

        StringBuilder sbWhere = new StringBuilder();
        sbWhere.append(" && ").append("(attribute[Percent Complete] >= '").append(sValueMin).append("')");
        sbWhere.append(" && ").append("(attribute[Percent Complete] <  '").append(sValueMax).append("')");

        return retrieveMyTasksPending(context, args, sbWhere.toString(), true, true);

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getMyOpenTasksOfDate(Context context, String[] args) throws Exception {


        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sDate        = (String) paramMap.get("date");
        Calendar cStart     = Calendar.getInstance();
        Calendar cEnd       = Calendar.getInstance();


        long lDate = Long.parseLong(sDate);
        cStart.setTimeInMillis(lDate);
        cEnd.setTimeInMillis(lDate);
        cEnd.add(java.util.GregorianCalendar.DAY_OF_YEAR, 1);

        StringBuilder sbWhere = new StringBuilder();
        sbWhere.append(" && ");
        sbWhere.append("(current != 'Create')");
        sbWhere.append(" && ");
        sbWhere.append("(attribute[Task Estimated Finish Date] >= '").append(cStart.get(Calendar.MONTH) + 1).append("/").append(cStart.get(Calendar.DAY_OF_MONTH)).append("/").append(cStart.get(Calendar.YEAR)).append("')");
        sbWhere.append(" && ");
        sbWhere.append("(attribute[Task Estimated Finish Date] <= '").append(cEnd.get(Calendar.MONTH) + 1).append("/").append(cEnd.get(Calendar.DAY_OF_MONTH)).append("/").append(cEnd.get(Calendar.YEAR)).append("')");

        return retrieveMyTasksPending(context, args, sbWhere.toString(), true);

    }
    public MapList retrieveMyTasksPending(Context context, String[] args, String sWhereAppend, Boolean bAssignedOnly) throws Exception {

        return retrieveMyTasksPending(context, args, sWhereAppend, bAssignedOnly, false);

    }


	public MapList retrieveMyTasksPending(Context context, String[] args, String sWhereAppend, Boolean bAssignedOnly, Boolean needCompletedTasks) throws Exception {

        com.matrixone.apps.common.Person pUser = com.matrixone.apps.common.Person.getPerson(context);
        MapList mlResults = new MapList();
        StringList selTasks = new StringList();
		selTasks.add(DomainObject.SELECT_ID);
		selTasks.add(DomainObject.SELECT_NAME);
		selTasks.add(DomainObject.SELECT_OWNER);
		selTasks.add(DomainObject.SELECT_CURRENT);
		selTasks.add("modified");
		selTasks.add("originated");
		selTasks.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
		selTasks.add(DomainObject.SELECT_PERCENTCOMPLETE);
		selTasks.add("state[Assign].start");
		selTasks.add("state[Active].start");
		selTasks.add("state[Review].start");
		selTasks.add(SELECT_FROM_SUBTASK);
    	selTasks.add(ProgramCentralConstants.SELECT_TASK_PROJECT_ID);
    	selTasks.add(ProgramCentralConstants.SELECT_TASK_PROJECT_NAME);
    	String parentPolicy = "to[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.policy";
    	selTasks.add(parentPolicy);

		String sBusWhere = "to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "]==True";
		if(ProgramCentralUtil.isNotNullString(sWhereAppend)){
			sWhereAppend += "  && " + sBusWhere;
		}else{
			sWhereAppend = "  && " + sBusWhere;
		}

        if(bAssignedOnly) {
			if(needCompletedTasks){
				mlResults = pUser.getRelatedObjects(context, DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "Task", selTasks, null, false, true, (short)1, "(from[Subtask] == 'False') && (current == 'Assign' || current == 'Active' || current == 'Review' || current == 'Complete') " + sWhereAppend, "", 0);
			}
			else{				
				mlResults = pUser.getRelatedObjects(context, DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "Task", selTasks, null, false, true, (short)1, "(from[Subtask] == 'False') && (current == 'Assign' || current == 'Active' || current == 'Review') " + sWhereAppend, "", 0);
			}
        } else {
        	String vaultPattern = ProgramCentralConstants.QUERY_WILDCARD;
            MapList mlTasksOwned = DomainObject.findObjects(context, "Task", null, "(from[Subtask] == 'False') && (current == 'Assign' || current == 'Active' || current == 'Review') && (owner == '" + context.getUser() + "')" + sWhereAppend, selTasks);
            MapList mlTasksAssigned = pUser.getRelatedObjects(context, DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "Task", selTasks, null, false, true, (short)1, "(from[Subtask] == 'False') && (current == 'Assign' || current == 'Active' || current == 'Review') && (owner != '" + context.getUser() + "')" + sWhereAppend, "", 0);
            mlResults.addAll(mlTasksOwned);
            mlResults.addAll(mlTasksAssigned);
        }
        int size = mlResults.size();
        for(int i=size-1; i>=0; i--){
        	Map taskInfo = (Map)mlResults.get(i);
        	if(taskInfo.containsKey(parentPolicy)){
        		String pPolicy = (String)taskInfo.get(parentPolicy);
        		if(pPolicy.equalsIgnoreCase(ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL)){
            		mlResults.remove(taskInfo);
        	}
        	}
        }
        return mlResults;

    }


    // Task Assignment and Allocation in WBS View
    public List dynamicColumnsMembersDetails(Context context, String[] args) throws Exception {

    	Map programMap = (Map) JPO.unpackArgs(args);
        Map requestMap = (Map)programMap.get("requestMap");
        requestMap.put("isCallForDataGrid","true");
		args = JPO.packArgs(programMap);
    	return dynamicAssignmentViewMembersColumn(context, args);

    }
    public List dynamicColumnsMembersDetailsAllocation(Context context, String[] args) throws Exception {

		Map programMap = (Map) JPO.unpackArgs(args);
        Map requestMap = (Map)programMap.get("requestMap");
        requestMap.put("isCallForDataGrid","true");
		args = JPO.packArgs(programMap);
    	return dynamicAllocationViewMembersColumn(context, args);

    }
    public Vector columnTaskAssignment(Context context, String[] args) throws Exception {


        Vector vResult          = new Vector();
       /* Map paramMap            = (Map) JPO.unpackArgs(args);
        Map paramList           = (Map)paramMap.get("paramList");
        MapList mlObjects       = (MapList) paramMap.get("objectList");
        HashMap columnMap       = (HashMap) paramMap.get("columnMap");
        HashMap settings        = (HashMap) columnMap.get("settings");
        String sOIDPerson       = (String) settings.get("personId");
        String sLanguage        = (String)paramList.get("languageStr");
        String sCompleted       = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Completed", sLanguage);
        String sLabelAssign     = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Assign", sLanguage);
        String sLabelUnassign   = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Unassign", sLanguage);
        String sLabelAssigned   = EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.Common.Assigned", sLanguage);


        StringList busSelects = new StringList();
        StringList relSelects = new StringList();
        busSelects.add(DomainObject.SELECT_ID);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);

        for (int i = 0; i < mlObjects.size(); i++) {

            String sResult          = "";
            Boolean bIsAssigned     = false;
            Map mObject             = (Map) mlObjects.get(i);
            String sOID             = (String)mObject.get(DomainObject.SELECT_ID);
            String sRowID           = (String)mObject.get("id[level]");
            DomainObject dObject    = new DomainObject(sOID);


            StringList busSelects2 = new StringList();
            busSelects2.add(DomainObject.SELECT_CURRENT);
            busSelects2.add("type.kindof[Project Space]");

            Map mData               = dObject.getInfo(context, busSelects2);
            String sCurrent           = (String)mData.get(DomainObject.SELECT_CURRENT);
            String sIsProject         = (String)mData.get("type.kindof[Project Space]");

            if(sIsProject.equalsIgnoreCase("FALSE")) {

                MapList mlAssignees     = dObject.getRelatedObjects(context, DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "Person", busSelects, relSelects, true, false, (short)1, "id == '" + sOIDPerson + "'", "", 0);
                String sStyleComplete   = "style='color:#FFF;background-color:#d1d4d4;font-weight:normal;min-width:90px;width=100%;text-align:center;vertical-align:middle;height:20px;line-height:20px;padding:0px;margin:0px;font-style:oblique'";
                String sStyleAssigned   = "style='color:#FFF;background-color:#77797c;font-weight:normal;min-width:90px;width=100%;text-align:center;vertical-align:middle;height:20px;line-height:20px;padding:0px;margin:0px;'";
                String sStyleUnassigned = "style='font-weight:normal;min-width:90px;width=100%;text-align:center;vertical-align:middle;height:20px;line-height:20px;padding:0px;margin:0px;color:transparent;'";
                StringBuilder sbResult  = new StringBuilder();

                if(mlAssignees.size() > 0) {
                    bIsAssigned = true;
                    sResult     = "Assigned" + sResult;
                }

                if(!sCurrent.equals("Complete")) {

                    if(bIsAssigned) {

                        Map mAssignee   = (Map)mlAssignees.get(0);
                        String sRID     = (String)mAssignee.get(DomainObject.SELECT_RELATIONSHIP_ID);

                        sbResult.append("<div ");
                        sbResult.append(sStyleAssigned);
                        sbResult.append(" onclick='window.open(\"../common/emxColumnAssignmentProcess.jsp?relationship="+DomainConstants.RELATIONSHIP_ASSIGNED_TASKS+"&amp;from=false&amp;mode=remove&amp;objectId=" + sOID + "&amp;rowId=" + sRowID + "&amp;relId=" + sRID + "&amp;personId=" + sOIDPerson + "\", \"listHidden\", \"\", true);'");
                        sbResult.append(" onmouseout='this.style.background=\"#5F747D\";this.style.color=\"#FFF\";this.style.fontWeight=\"normal\"; this.innerHTML=\"").append(sLabelAssigned).append("\"'");
                        sbResult.append(" onmouseover='this.style.background=\"#cc0000\"; this.style.color=\"#FFF\";this.style.fontWeight=\"normal\"; this.style.cursor=\"pointer\"; this.innerHTML=\"- ").append(sLabelUnassign).append("\"'");
                        sbResult.append(">").append(sLabelAssigned).append("</div>");

                    } else {

                        sbResult.append("<div ");
                        sbResult.append(sStyleUnassigned);
                        sbResult.append("  onclick='window.open(\"../common/emxColumnAssignmentProcess.jsp?relationship="+DomainConstants.RELATIONSHIP_ASSIGNED_TASKS+"&amp;from=false&amp;mode=add&amp;objectId=" + sOID + "&amp;rowId=" + sRowID + "&amp;personId=" + sOIDPerson + "\", \"listHidden\", \"\", true);'");
                        sbResult.append("  onmouseout='this.style.background=\"transparent\";this.style.color=\"transparent\";this.style.fontWeight=\"normal\"; this.innerHTML=\"-\"'");
                        sbResult.append(" onmouseover='this.style.background=\"#6FBC4B\";    this.style.color=\"#FFF\";this.style.fontWeight=\"normal\"; this.style.cursor=\"pointer\"; this.innerHTML=\"+ ").append(sLabelAssign).append("\"'");
                        sbResult.append(">-</div>");

                    }

                } else {

                    sbResult.append("<div ").append(sStyleComplete).append(">");
                    sbResult.append(sCompleted).append("</div>");

                }

                sResult = sbResult.toString();

            }

            vResult.add(sResult);

        }*/

        return vResult;

   }
    public Vector columnTaskAllocation(Context context, String[] args) throws Exception {


        Vector vResult      = new Vector();
       /* Map paramMap        = (Map) JPO.unpackArgs(args);
        MapList mlObjects   = (MapList) paramMap.get("objectList");
        HashMap columnMap   = (HashMap) paramMap.get("columnMap");
        HashMap settings    = (HashMap) columnMap.get("settings");
        String sOIDPerson   = (String) settings.get("personId");

        StringList busSelects = new StringList();
        StringList relSelects = new StringList();
        busSelects.add(DomainObject.SELECT_ID);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);
        relSelects.add("attribute[Percent Allocation]");

        for (int i = 0; i < mlObjects.size(); i++) {

            String sResult          = "";
            Map mObject             = (Map) mlObjects.get(i);
            String sOID             = (String)mObject.get(DomainObject.SELECT_ID);
            String sRowID           = (String)mObject.get("id[level]");
            String sRID             = "";
            DomainObject dObject    = new DomainObject(sOID);

            StringList busSelects2 = new StringList();
            busSelects2.add(DomainObject.SELECT_CURRENT);
            busSelects2.add("type.kindof[Project Space]");

            Map mData               = dObject.getInfo(context, busSelects2);
            String sCurrent           = (String)mData.get(DomainObject.SELECT_CURRENT);
            String sIsProject         = (String)mData.get("type.kindof[Project Space]");
            String sText            = "";
            double dAllocation      = 0.0;
            String sPercentage      = "";
            String[] aContents      = {"0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"};

            if(sIsProject.equalsIgnoreCase("FALSE")) {

                MapList mlAssignees     = dObject.getRelatedObjects(context, DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "Person", busSelects, relSelects, true, false, (short)1, "id == '" + sOIDPerson + "'", "", 0);
                String sStyleTable      = "width:100%;";
                StringBuilder sbStyle   = new StringBuilder();
//                String sStyleLabel      = "";
                String sScriptTable     = " onmouseover='this.lastChild.lastChild.style.visibility=\"visible\";this.firstChild.firstChild.lastChild.firstChild.firstChild.style.visibility=\"visible\";' onmouseout='this.lastChild.lastChild.style.visibility=\"hidden\";this.firstChild.firstChild.lastChild.firstChild.firstChild.style.visibility=\"hidden\";' ";
                String sLabel           = "";

                if(mlAssignees.size() > 0) {

                    Map mAssignee   = (Map)mlAssignees.get(0);
                    sRID            = (String)mAssignee.get(DomainObject.SELECT_RELATIONSHIP_ID);
                    String sPercent = (String)mAssignee.get("attribute[Percent Allocation]");

                    double dValue   = Task.parseToDouble(sPercent) / 10;
                    dValue          = Math.round( dValue ) / 1d;
//                    dAllocation     = 0.5 + (dValue / 20);
                    dAllocation     = (dValue / 10);
                    sPercentage     = String.valueOf(dValue);
                    if(sPercentage.contains(".")) {
                        sPercentage = sPercentage.substring(0, sPercentage.indexOf("."));
                    }

                    sbStyle.append("padding-right:5px;");
                    sbStyle.append("font-size:7pt;");
                    sbStyle.append("color:#FFF;");
                    sbStyle.append("text-shadow: 1px 1px 1px #111;");
                    sbStyle.append("border:1px solid #77797c;");
                    sbStyle.append("background:-ms-linear-gradient(left,  #77797c 0%, #77797c ").append(dAllocation * 100).append("%, #abb8bd ").append(dAllocation).append("%);");
                    sbStyle.append("background:-moz-linear-gradient(left,  #77797c 0%, #77797c ").append(dAllocation * 100).append("%, #abb8bd ").append(dAllocation).append("%);");
                    sbStyle.append("background:-webkit-linear-gradient(left,  #77797c 0%, #77797c ").append(dAllocation * 100).append("%, #abb8bd ").append(dAllocation).append("%);");

                    sLabel = sPercentage + "0%";


                }

                String sURLPrefix       = "<a href='../gnv/GNVTaskAssignment.jsp?mode=update&amp;objectId=" + sOID + "&amp;rowId=" + sRowID + "&amp;personId=" + sOIDPerson + "&amp;relId=" + sRID + "&amp;percent=";
                String sURLSuffix       = "' target='listHidden' style='font-size:6pt;'>";
                String sStylePercentage = "style='text-align:center;font-size:6pt;' width='17px'";
                String sStyleSelected   = "style='color:#FFF;text-align:center;font-size:6pt;background:#77797c;' width='17px'";

                if(!sCurrent.equals("Complete")) {
                    if(!sPercentage.equals("0"))  {  aContents[0] = sURLPrefix +   "0.0' style='color:#CC092F !important;" + sURLSuffix +  "X</a>";}
                    if(!sPercentage.equals("1"))  {  aContents[1] = sURLPrefix +  "10.0" + sURLSuffix +  "10</a>";}
                    if(!sPercentage.equals("2"))  {  aContents[2] = sURLPrefix +  "20.0" + sURLSuffix +  "20</a>";}
                    if(!sPercentage.equals("3"))  {  aContents[3] = sURLPrefix +  "30.0" + sURLSuffix +  "30</a>";}
                    if(!sPercentage.equals("4"))  {  aContents[4] = sURLPrefix +  "40.0" + sURLSuffix +  "40</a>";}
                    if(!sPercentage.equals("5"))  {  aContents[5] = sURLPrefix +  "50.0" + sURLSuffix +  "50</a>";}
                    if(!sPercentage.equals("6"))  {  aContents[6] = sURLPrefix +  "60.0" + sURLSuffix +  "60</a>";}
                    if(!sPercentage.equals("7"))  {  aContents[7] = sURLPrefix +  "70.0" + sURLSuffix +  "70</a>";}
                    if(!sPercentage.equals("8"))  {  aContents[8] = sURLPrefix +  "80.0" + sURLSuffix +  "80</a>";}
                    if(!sPercentage.equals("9"))  {  aContents[9] = sURLPrefix +  "90.0" + sURLSuffix +  "90</a>";}
                    if(!sPercentage.equals("10")) { aContents[10] = sURLPrefix + "100.0" + sURLSuffix + "100</a>";}
                    if(sPercentage.equals(""))    {  aContents[0] = "";}
                    if(mlAssignees.size() > 0) {
                        sText  = sURLPrefix + "0.0" +sURLSuffix + "<img style='margin-right:4px;visibility:hidden;' border='0' src='../common/images/buttonMiniCancel.gif' /></a>";
                        sLabel = sPercentage + "0%";
                    }
                } else {
                    if(!sPercentage.equals("0"))  {  aContents[0] = "";}
                    if(!sPercentage.equals("1"))  {  aContents[1] = "";}
                    if(!sPercentage.equals("2"))  {  aContents[2] = "";}
                    if(!sPercentage.equals("3"))  {  aContents[3] = "";}
                    if(!sPercentage.equals("4"))  {  aContents[4] = "";}
                    if(!sPercentage.equals("5"))  {  aContents[5] = "";}
                    if(!sPercentage.equals("6"))  {  aContents[6] = "";}
                    if(!sPercentage.equals("7"))  {  aContents[7] = "";}
                    if(!sPercentage.equals("8"))  {  aContents[8] = "";}
                    if(!sPercentage.equals("9"))  {  aContents[9] = "";}
                    if(!sPercentage.equals("10")) { aContents[10] = "";}

                }

                StringBuilder sbResult = new StringBuilder();

                sbResult.append("<table style='" + sStyleTable + "'" + sScriptTable + ">");
    //            sbResult.append("<tr><td colspan='11' style='text-align:center;background:rgba(37, 66, 86, " + (dAllocation / 100) + ");line-height:18xp;height:18px;vertical-align:middle;font-weight:bold;'>" + sText + "</td></tr>");
//                sbResult.append("<tr><td colspan='11' style='text-align:center;background:rgba(118, 136, 148, " + dAllocation + ");line-height:18xp;height:18px;vertical-align:middle;font-weight:bold;'>" + sText + "</td></tr>");
//                sbResult.append("<tr onmouseover2='this.nextSibling.style.visibility=\"visible\";'><td colspan='11' style='text-align:center;background:rgba(118, 136, 148, " + dAllocation + ");line-height:18xp;height:18px;vertical-align:middle;font-weight:bold;'>" + sText + "</td></tr>");
//                sbResult.append("<tr onmouseover2='this.nextSibling.style.visibility=\"visible\";'><td colspan='11' style='text-align:center;background:rgba(24, 45, 58, " + dAllocation + ");line-height:18xp;height:18px;vertical-align:middle;font-weight:bold;'>" + sText + "</td></tr>");
//                sbResult.append("<tr><td colspan='11' style='text-align:center;background:rgba(43, 136, 217, " + dAllocation + ");line-height:18xp;height:18px;vertical-align:middle;font-weight:bold;'>" + sText + "</td></tr>");
    //            sbResult.append("<tr><td colspan='11' style='text-align:center;background:-moz-linear-gradient(left,  #2b88d9 0%, #207cca " + dAllocation + "%, #4fa0e2 100%);line-height:18xp;height:18px;vertical-align:middle;font-weight:bold;'>" + sText + "</td></tr>");
                sbResult.append("<tr style='border:1px solid transparent;'><td colspan='10' style='text-align:right;" + sbStyle.toString() + "line-height:18px;height:18px;vertical-align:middle;font-weight:bold;'>" + sText  + sLabel + "</td></tr>");
                sbResult.append("<tr style='visibility:hidden;'>");
//                if(sPercentage.equals("0"))  { sbResult.append("<td " + sStyleSelected + "> 0</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[0] + "</td>"); }
                if(sPercentage.equals("1")) { sbResult.append("<td " + sStyleSelected + ">10</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[1] + "</td>"); }
                if(sPercentage.equals("2")) { sbResult.append("<td " + sStyleSelected + ">20</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[2] + "</td>"); }
                if(sPercentage.equals("3")) { sbResult.append("<td " + sStyleSelected + ">30</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[3] + "</td>"); }
                if(sPercentage.equals("4")) { sbResult.append("<td " + sStyleSelected + ">40</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[4] + "</td>"); }
                if(sPercentage.equals("5")) { sbResult.append("<td " + sStyleSelected + ">50</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[5] + "</td>"); }
                if(sPercentage.equals("6")) { sbResult.append("<td " + sStyleSelected + ">60</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[6] + "</td>"); }
                if(sPercentage.equals("7")) { sbResult.append("<td " + sStyleSelected + ">70</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[7] + "</td>"); }
                if(sPercentage.equals("8")) { sbResult.append("<td " + sStyleSelected + ">80</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[8] + "</td>"); }
                if(sPercentage.equals("9")) { sbResult.append("<td " + sStyleSelected + ">90</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[9] + "</td>"); }
                if(sPercentage.equals("10")){ sbResult.append("<td " + sStyleSelected + ">100</td>"); } else { sbResult.append("<td " + sStylePercentage + ">" + aContents[10] + "</td>"); }

                sbResult.append("</tr>");
                sbResult.append("</table>");
                sResult = sbResult.toString();

            }

            vResult.add(sResult);
        }*/

        return vResult;

    }

    public Vector columnTaskAllocationTotal(Context context, String[] args) throws Exception {

    	return getTaskTotalAllocation(context, args);
    }


    public MapList getMembers(Context context, String[] args, boolean bKeepContextUser) throws Exception {

        MapList mlResults       = new MapList();
        HashMap paramMap        = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap      = (HashMap) paramMap.get("requestMap");
        String sOID             = (String) requestMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        String sType            = dObject.getInfo(context, DomainObject.SELECT_TYPE);

        String sSelectableName          = DomainObject.SELECT_NAME;
        String sSelectableID            = DomainObject.SELECT_ID;
        String sSelectableType          = "Person";
        String sSelectableRelationship  = "Member";

        if(sType.equals("Workspace")) {
            sSelectableName         = "to[Project Membership].from.name";
            sSelectableID           = "to[Project Membership].from.id";
            sSelectableType         = "Project Member";
            sSelectableRelationship = "Project Members";
        } else if(sType.equals("Workspace Vault")) {
            Pattern pTypes = new Pattern("Project Space");
            StringList slFolderTree = new StringList();
            slFolderTree.add(DomainObject.SELECT_ID);
            slFolderTree.add(DomainObject.SELECT_TYPE);
            MapList mlProjects = dObject.getRelatedObjects(context, "Data Vaults,Sub Vaults", "Workspace Vault,Project Space", slFolderTree, null, true, false, (short)0, "", "", 0, pTypes, null, null);
            if(mlProjects.size() > 0) {
                Map mProject = (Map)mlProjects.get(0);
                sOID = (String)mProject.get(DomainObject.SELECT_ID);
                dObject = new DomainObject(sOID);
            }
        }

        StringList busSelects = new StringList();
        busSelects.add(sSelectableName);
        busSelects.add(sSelectableID);
        busSelects.add(DomainObject.SELECT_ATTRIBUTE_FIRSTNAME);
        busSelects.add(DomainObject.SELECT_ATTRIBUTE_LASTNAME);
        StringList relSelects = new StringList();
        relSelects.add(Task.SELECT_PROJECT_ROLE);

        MapList mlProjectMembers = dObject.getRelatedObjects(context, sSelectableRelationship, sSelectableType, busSelects, relSelects, false, true, (short)1, "", "", 0);

        if(mlProjectMembers.size() > 0) {
            for (int i = 0; i < mlProjectMembers.size(); i++) {

                Map mProjectMember  = (Map)mlProjectMembers.get(i);
                String sPersonName  = (String)mProjectMember.get(sSelectableName);
                String sPersonOID   = (String)mProjectMember.get(sSelectableID);
                Map mPerson         = new HashMap();

                mPerson.put(DomainObject.SELECT_NAME, sPersonName);
                mPerson.put(DomainObject.SELECT_ID, sPersonOID);
                mPerson.put(DomainObject.SELECT_ATTRIBUTE_FIRSTNAME,    (String)mProjectMember.get(DomainObject.SELECT_ATTRIBUTE_FIRSTNAME));
                mPerson.put(DomainObject.SELECT_ATTRIBUTE_LASTNAME,     (String)mProjectMember.get(DomainObject.SELECT_ATTRIBUTE_LASTNAME));
                mPerson.put(Task.SELECT_PROJECT_ROLE,  (String)mProjectMember.get(Task.SELECT_PROJECT_ROLE));

                if(bKeepContextUser == false) {
                    if(!sPersonName.equals(context.getUser())){
                        mlResults.add(mPerson);
                    }
                } else{
                    mlResults.add(mPerson);
                }

            }
        }

        mlResults.sort(DomainObject.SELECT_ATTRIBUTE_FIRSTNAME, "ascending", "String");
        mlResults.sort(DomainObject.SELECT_ATTRIBUTE_LASTNAME, "ascending", "String");

        return mlResults;

    }


    // Enhanced WBS View / Apply State Filter to WBS expand
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList expandWBSInWork(Context context, String[] args) throws Exception {


        /*HashMap arguMap         = (HashMap) JPO.unpackArgs(args);
        String sOID             = (String) arguMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        StringList busSelects   = new StringList();
        StringList relSelects   = new StringList();

        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_CURRENT);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_START_DATE);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);

        MapList mapList =  dObject.getRelatedObjects(context, "Subtask", "Task Management,Project Space", busSelects, relSelects, false, true, (short) 1, "current != 'Complete'", "", 0);*/
        return applyDateFilter(context, args, new MapList());

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList expandWBSStateReview(Context context, String[] args) throws Exception {

        /*HashMap arguMap         = (HashMap) JPO.unpackArgs(args);
        String sOID             = (String) arguMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        StringList busSelects   = new StringList();
        StringList relSelects   = new StringList();

        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_CURRENT);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_START_DATE);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);

        MapList mapList =  dObject.getRelatedObjects(context, "Subtask", "Task Management,Project Space", busSelects, relSelects, false, true, (short) 1, "current == 'Active' || current == 'Review'", "");

        if(mapList.size() > 0) {
            for (int i = mapList.size() - 1; i >= 0; i--) {
                Map map = (Map)mapList.get(i);
                String sCurrent = (String)map.get(DomainObject.SELECT_CURRENT);
                if(sCurrent.equals("Active")) {
                    String sOIDSubtask = (String)map.get(DomainObject.SELECT_ID);
                    DomainObject doSubtask = new DomainObject(sOIDSubtask);
                    MapList mlSubtasks =  doSubtask.getRelatedObjects(context, "Subtask", "Task Management,Project Space", busSelects, relSelects, false, true, (short) 0, "current == 'Active' || current == 'Review'", "");
                    if(mlSubtasks.size() > 0) {
                        mlSubtasks.sort(DomainObject.SELECT_CURRENT, "descending", "String");
                        Map mSubtask = (Map)mlSubtasks.get(0);
                        String sCurrentSubtask = (String)mSubtask.get(DomainObject.SELECT_CURRENT);
                        if(!sCurrentSubtask.equals("Review")) {
                            mapList.remove(i);
                        }
                    } else {
                        mapList.remove(i);
                    }
                }
            }
        }*/

        return applyDateFilter(context, args, new MapList());
    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList expandWBSOwned(Context context, String[] args) throws Exception {


        /*HashMap arguMap         = (HashMap) JPO.unpackArgs(args);
        String sUser            = context.getUser();
        String sOID             = (String) arguMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        StringList busSelects   = new StringList();
        StringList relSelects   = new StringList();

        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_OWNER);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_START_DATE);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);
        relSelects.add(ProgramCentralConstants.SELECT_ATTRIBUTE_SEQUENCE_ORDER);

        MapList mapList = dObject.getRelatedObjects(context, "Subtask", "Task Management,Project Space", busSelects, relSelects, false, true, (short) 1, "", "", 0);
        mapList.sort(ProgramCentralConstants.SELECT_ATTRIBUTE_SEQUENCE_ORDER, "ascending", "integer");

        for (int i = mapList.size() - 1; i >= 0; i--) {

            Map map                 = (Map)mapList.get(i);
            String sOwnerSubtask    = (String)map.get(DomainObject.SELECT_OWNER);

            if(!sUser.equals(sOwnerSubtask)) {

                Boolean bRemove         = true;
                String sOIDSubtask      = (String)map.get(DomainObject.SELECT_ID);
                DomainObject doSubtask  = new DomainObject(sOIDSubtask);
                MapList mlSubtasks      =  doSubtask.getRelatedObjects(context, "Subtask", "Task Management,Project Space", busSelects, null, false, true, (short) 0, "", "", 0);

                for (int j = 0; j < mlSubtasks.size(); j++) {
                    Map mSubtask    = (Map)mlSubtasks.get(j);
                    sOwnerSubtask   = (String)mSubtask.get(DomainObject.SELECT_OWNER);
                    if(sUser.equals(sOwnerSubtask)) {
                        bRemove = false;
                        break;
                    }
                }

                if(bRemove) {
                    mapList.remove(i);
                }

            }

        }*/


        return applyDateFilter(context, args, new MapList());
    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList expandWBSOwnedUnassigned(Context context, String[] args) throws Exception {

        /*HashMap arguMap         = (HashMap) JPO.unpackArgs(args);
        String sUser            = context.getUser();
        String sOID             = (String) arguMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        StringList busSelects   = new StringList();
        StringList relSelects   = new StringList();

        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_NAME);
        busSelects.add(DomainObject.SELECT_OWNER);
        busSelects.add(SELECT_RELATIONSHIP_ASSIGNED_TASKS);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);
        relSelects.add(ProgramCentralConstants.SELECT_ATTRIBUTE_SEQUENCE_ORDER);

        MapList mapList = dObject.getRelatedObjects(context, "Subtask", "Task Management,Project Space", busSelects, relSelects, false, true, (short) 1, "", "", 0);
        mapList.sort(ProgramCentralConstants.SELECT_ATTRIBUTE_SEQUENCE_ORDER, "ascending", "integer");

        for (int i = mapList.size() - 1; i >= 0; i--) {

            Map map                 = (Map)mapList.get(i);
            String sOwnerSubtask    = (String)map.get(DomainObject.SELECT_OWNER);
            String sIsAssigned      = (String)map.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS);

            if(sUser.equals(sOwnerSubtask) && sIsAssigned.equalsIgnoreCase("FALSE")) {
            } else {

                Boolean bRemove         = true;
                String sOIDSubtask      = (String)map.get(DomainObject.SELECT_ID);
                DomainObject doSubtask  = new DomainObject(sOIDSubtask);
                MapList mlSubtasks      =  doSubtask.getRelatedObjects(context, "Subtask", "Task Management,Project Space", busSelects, null, false, true, (short) 0, "", "", 0);

                for (int j = 0; j < mlSubtasks.size(); j++) {
                    Map mSubtask    = (Map)mlSubtasks.get(j);
                    sOwnerSubtask   = (String)mSubtask.get(DomainObject.SELECT_OWNER);
                    sIsAssigned     = (String)mSubtask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS);
                    if(sUser.equals(sOwnerSubtask)) {
                        if(sIsAssigned.equalsIgnoreCase("FALSE")) {
                            bRemove = false;
                            break;
                        }
                    }
                }

                if(bRemove) {
                    mapList.remove(i);
                }

            }
        }*/

        return applyDateFilter(context, args, new MapList());
    }
    public MapList applyDateFilter(Context context, String[] args, MapList mapList) throws Exception {

    	return new MapList();
        /*HashMap arguMap         = (HashMap) JPO.unpackArgs(args);
        String sStartFrom 	= (String) arguMap.get("GNVWBSFilterStartFrom");
        String sStartTo		= (String) arguMap.get("GNVWBSFilterStartTo");
        String sFinishFrom 	= (String) arguMap.get("GNVWBSFilterFinishFrom");
        String sFinishTo 	= (String) arguMap.get("GNVWBSFilterFinishTo");
        String sLanguage        = (String) arguMap.get("languageStr");

        if(null == sStartFrom)  { sStartFrom = ""; }
        if(null == sStartTo)    { sStartTo = ""; }
        if(null == sFinishFrom) { sFinishFrom = ""; }
        if(null == sFinishTo)   { sFinishTo = ""; }

        sLanguage = sLanguage.substring(0, 2);
        Locale locale = new Locale(sLanguage);
        DateFormat dfFilter = DateFormat.getDateInstance(2, locale);

       if(sFinishTo.equals("")) {
            if(!sStartFrom.equals("")) {
                if(mapList.size() > 0) {
                    for (int i = mapList.size() - 1; i >= 0; i--) {
                        Map map = (Map)mapList.get(i);
                        Calendar cTaskStart = Calendar.getInstance();
                        String sTaskStart = (String)map.get(Task.SELECT_TASK_ESTIMATED_START_DATE);
                        cTaskStart.setTime(sdf.parse(sTaskStart));
                        Calendar cStartFrom = Calendar.getInstance();
                        cStartFrom.setTime(dfFilter.parse(sStartFrom));
                        if(cStartFrom.after(cTaskStart)) {
                            String sOIDTask = (String)map.get(DomainObject.SELECT_ID);
                            DomainObject doTask = new DomainObject(sOIDTask);
                            StringList slTask = new StringList();
                            slTask.add(Task.SELECT_TASK_ESTIMATED_START_DATE);
                            MapList mlTaskChildren = doTask.getRelatedObjects(context, "Subtask", "Project Space,Task Management", slTask, null, false, true, (short)0, "", "", 0);
                            if(mlTaskChildren.size() > 0) {
                                mlTaskChildren.sort(Task.SELECT_TASK_ESTIMATED_START_DATE, "decending", "date");
                                Map mTaskChild = (Map)mlTaskChildren.get(0);
                                sTaskStart = (String)mTaskChild.get(Task.SELECT_TASK_ESTIMATED_START_DATE);
                                cTaskStart.setTime(sdf.parse(sTaskStart));
                                if(cStartFrom.after(cTaskStart)) {
                                    mapList.remove(i);
                                }
                            } else {
                                mapList.remove(i);
                            }
                        }
                    }
                }
            }
        }

        if(!sStartTo.equals("")) {
            if(mapList.size() > 0) {
                for (int i = mapList.size() - 1; i >= 0; i--) {
                    Map map = (Map)mapList.get(i);
                    Calendar cStart = Calendar.getInstance();
                    String sTaskStart = (String)map.get(Task.SELECT_TASK_ESTIMATED_START_DATE);
                    cStart.setTime(sdf.parse(sTaskStart));
                    Calendar cStartTo = Calendar.getInstance();
                    cStartTo.setTime(dfFilter.parse(sStartTo));
                    cStartTo.add(java.util.GregorianCalendar.DAY_OF_YEAR, +1);
                    if(cStartTo.before(cStart)) {
                        mapList.remove(i);
                    }
                }
            }
        }
        if(!sFinishFrom.equals("")) {
            if(mapList.size() > 0) {
                for (int i = mapList.size() - 1; i >= 0; i--) {
                    Map map = (Map)mapList.get(i);
                    Calendar cFinish = Calendar.getInstance();
                    String sTaskFinish = (String)map.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                    cFinish.setTime(sdf.parse(sTaskFinish));
                    Calendar cFinishFrom = Calendar.getInstance();
                    cFinishFrom.setTime(dfFilter.parse(sFinishFrom));
                    if(cFinishFrom.after(cFinish)) {
                        mapList.remove(i);
                    }
                }
            }
        }
        if(!sFinishTo.equals("")) {
            if(mapList.size() > 0) {
                for (int i = mapList.size() - 1; i >= 0; i--) {
                    Map map = (Map)mapList.get(i);
                    Calendar cTaskFinish = Calendar.getInstance();
                    String sTaskFinish = (String)map.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                    cTaskFinish.setTime(sdf.parse(sTaskFinish));
                    Calendar cFinishTo = Calendar.getInstance();
                    cFinishTo.setTime(dfFilter.parse(sFinishTo));
                    cFinishTo.add(java.util.GregorianCalendar.DAY_OF_YEAR, +1);
                    if(cFinishTo.before(cTaskFinish)) {
                        String sOIDTask = (String)map.get(DomainObject.SELECT_ID);
                        DomainObject doTask = new DomainObject(sOIDTask);
                        StringList slTask = new StringList();
                        slTask.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                        slTask.add(Task.SELECT_TASK_ESTIMATED_START_DATE);
                        MapList mlTaskChildren = doTask.getRelatedObjects(context, "Subtask", "Project Space,Task Management", slTask, null, false, true, (short)0, "", "", 0);
                        if(!sStartFrom.equals("")) {

                            Calendar cStartFrom = Calendar.getInstance();
                            cStartFrom.setTime(dfFilter.parse(sStartFrom));
                            Calendar cTaskStart = Calendar.getInstance();
                            Boolean bKeep = false;

                            for(int j = 0; j < mlTaskChildren.size(); j++) {
                                Map mTaskChild = (Map)mlTaskChildren.get(j);
                                sTaskFinish = (String)mTaskChild.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                String sTaskStart = (String)mTaskChild.get(Task.SELECT_TASK_ESTIMATED_START_DATE);

                                cTaskFinish.setTime(sdf.parse(sTaskFinish));
                                cTaskStart.setTime(sdf.parse(sTaskStart));

                                if(cTaskFinish.before(cFinishTo)) {
                                    if(cTaskStart.after(cStartFrom)) {
                                        bKeep = true;
                                        break;
                                    }
                                }
                            }

                            if(!bKeep) {
                                mapList.remove(i);
                            }

                        } else {
                            if(mlTaskChildren.size() > 0) {
                                mlTaskChildren.sort(Task.SELECT_TASK_ESTIMATED_FINISH_DATE, "ascending", "date");
                                Map mTaskChild = (Map)mlTaskChildren.get(0);
                                sTaskFinish = (String)mTaskChild.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                cTaskFinish.setTime(sdf.parse(sTaskFinish));
                                if(cTaskFinish.after(cFinishTo)) {
                                    mapList.remove(i);
                                }
                            } else {
                                mapList.remove(i);
                            }
                        }
                    } else {
                        if(!sStartFrom.equals("")) {

                            Calendar cStartFrom = Calendar.getInstance();
                            Calendar cTaskStart = Calendar.getInstance();
                            cStartFrom.setTime(dfFilter.parse(sStartFrom));

                            String sTaskStart = (String)map.get(Task.SELECT_TASK_ESTIMATED_START_DATE);
                            cTaskStart.setTime(sdf.parse(sTaskStart));
                            if(cTaskStart.before(cStartFrom)) {
                                mapList.remove(i);
                            }

                        }
                    }
                }
            }
        }


        return mapList ;*/
    }


    // Project Assessment Tuning
    public  String getLatestAssessmentName(Context context, String[] args) throws Exception {

        StringBuilder sbResult  = new StringBuilder();
        /*HashMap programMap      = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap        = (HashMap) programMap.get("paramMap");
        String sOID             = (String) paramMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);
        String sDimensions      = EnoviaResourceBundle.getProperty(context, "emxFramework.PopupSize.Large");
        String[] aDimensions    = sDimensions.split("x");

        StringList busSelects = new StringList();
        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(DomainObject.SELECT_NAME);
        busSelects.add("modified");

        MapList mlAssessments = dObject.getRelatedObjects(context, "Project Assessment", "Assessment", busSelects, null, false, true, (short)1, "", "", 0);

        if(mlAssessments.size() > 0) {
            mlAssessments.sort("modified", "descending", "date");
            String sIcon = UINavigatorUtil.getTypeIconProperty(context, "Assessment");
            Map mAssessment = (Map)mlAssessments.get(0);
            sbResult.append("<a onClick=\"emxFormLinkClick('../common/emxTree.jsp?objectId=").append((String)mAssessment.get(DomainObject.SELECT_ID));
            sbResult.append("', 'popup', '', '").append(aDimensions[0]).append("', '").append(aDimensions[1]).append("', '')\">");
            sbResult.append("<img src='images/").append(sIcon).append("' /> ");
            sbResult.append((String)mAssessment.get(DomainObject.SELECT_NAME));
            sbResult.append("</a>");
        }*/

        return sbResult.toString();

    }
    public  String getLatestAssessmentModified(Context context, String[] args) throws Exception {

        StringBuilder sbResult  = new StringBuilder();
        /*HashMap programMap      = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap        = (HashMap) programMap.get("paramMap");
        String sOID             = (String) paramMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);

        StringList busSelects = new StringList();
        busSelects.add("modified");

        MapList mlAssessments = dObject.getRelatedObjects(context, "Project Assessment", "Assessment", busSelects, null, false, true, (short)1, "", "", 0);

        if(mlAssessments.size() > 0) {
            mlAssessments.sort("modified", "descending", "date");
            Map mAssessment = (Map)mlAssessments.get(0);
            sbResult.append((String)mAssessment.get("modified"));
        }*/

        return sbResult.toString();

    }
    public  String getLatestAssessmentAssessor(Context context, String[] args) throws Exception {

        StringBuilder sbResult  = new StringBuilder();
        /*HashMap programMap      = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap        = (HashMap) programMap.get("paramMap");
        String sOID             = (String) paramMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);

        StringList busSelects = new StringList();
        busSelects.add("modified");
        busSelects.add("attribute[Originator]");

        MapList mlAssessments = dObject.getRelatedObjects(context, "Project Assessment", "Assessment", busSelects, null, false, true, (short)1, "", "", 0);

        if(mlAssessments.size() > 0) {
            mlAssessments.sort("modified", "descending", "date");
            Map mAssessment = (Map)mlAssessments.get(0);
            sbResult.append((String)mAssessment.get("attribute[Originator]"));
        }*/

        return sbResult.toString();

    }
    public  String getLatestAssessmentSummary(Context context, String[] args) throws Exception {
        return retrieveLatestAssessmentComments(context, args, "attribute[Assessment Status]", "attribute[Assessment Comments]");
    }
    public  String getLatestAssessmentResource(Context context, String[] args) throws Exception {
        return retrieveLatestAssessmentComments(context, args, "attribute[Resource Status]", "attribute[Resource Comments]");
    }
    public  String getLatestAssessmentSchedule(Context context, String[] args) throws Exception {
        return retrieveLatestAssessmentComments(context, args, "attribute[Schedule Status]", "attribute[Schedule Comments]");
    }
    public  String getLatestAssessmentRisk(Context context, String[] args) throws Exception {
        return retrieveLatestAssessmentComments(context, args, "attribute[Risk Status]", "attribute[Risk Comments]");
    }
    public  String getLatestAssessmentFinance(Context context, String[] args) throws Exception {
        return retrieveLatestAssessmentComments(context, args, "attribute[Finance Status]", "attribute[Finance Comments]");
    }
    public  String retrieveLatestAssessmentComments(Context context, String[] args, String selectStatus, String selectComments) throws Exception {

        StringBuilder sbResult  = new StringBuilder();
       /* HashMap programMap      = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap        = (HashMap) programMap.get("paramMap");
        String sOID             = (String) paramMap.get("objectId");
        DomainObject dObject    = new DomainObject(sOID);

        StringList busSelects = new StringList();
        busSelects.add("modified");
        busSelects.add(selectStatus);
        busSelects.add(selectComments);

        MapList mlAssessments = dObject.getRelatedObjects(context, "Project Assessment", "Assessment", busSelects, null, false, true, (short)1, "", "", 0);

        if(mlAssessments.size() > 0) {
            mlAssessments.sort("modified", "descending", "date");
            Map mAssessment = (Map)mlAssessments.get(0);
            String sStatus = (String)mAssessment.get(selectStatus);
            String sComments = (String)mAssessment.get(selectComments);

            sComments = sComments.replaceAll("\r\n", "<br/>");
            sComments = sComments.replaceAll("\r", "<br/>");
            sComments = sComments.replaceAll("\n", "<br/>");
            String sImage = "iconStatusGrayMedium.png";
            sbResult.append("<table><tr><td style='padding-right:10px;width:28px;'>");

            if(sStatus.equals("Red")) { sImage = "iconStatusRedMedium.png"; }
            else if(sStatus.equals("Yellow")) { sImage = "iconStatusYellowMedium.png"; }
            else if(sStatus.equals("Green")) { sImage = "iconStatusGreenMedium.png"; }

            sbResult.append("<img src='../gnv/images/").append(sImage).append("' />");
            sbResult.append("</td><td>");
            sbResult.append(sComments);
            sbResult.append("<td></tr></table>");

        }*/

        return sbResult.toString();
    }
    public String[] getProjectAssessmentHistoryData(Context context, String[] args) throws Exception {


        String[] aResult            = new String[5];
        HashMap paramMap            = (HashMap) JPO.unpackArgs(args);
        String sOID                 = (String) paramMap.get("objectId");
        String sLanguage            = (String) paramMap.get("languageStr");
        String sRandomize           = (String) paramMap.get("randomize");
        StringBuilder sbCategories  = new StringBuilder();
        StringBuilder sbData1       = new StringBuilder();
        StringBuilder sbData2       = new StringBuilder();
        StringBuilder sbData3       = new StringBuilder();
        StringBuilder sbData4       = new StringBuilder();
        DomainObject doProject      = new DomainObject(sOID);


        if(null == sRandomize) { sRandomize = ""; }

        StringList busSelects = new StringList();
        busSelects.add(DomainObject.SELECT_ORIGINATED);
// fzs        busSelects.add("modified");
        busSelects.add(DomainObject.SELECT_ORIGINATOR);
        busSelects.add(SELECT_ATTRIBUTE_ASSESSMENT_STATUS);
        busSelects.add(SELECT_ATTRIBUTE_ASSESSMENT_COMMENTS);
        busSelects.add(SELECT_ATTRIBUTE_RESOURCE_STATUS);
        busSelects.add(SELECT_ATTRIBUTE_RESOURCE_COMMENTS);
        busSelects.add(SELECT_ATTRIBUTE_SCHEDULE_STATUS);
        busSelects.add(SELECT_ATTRIBUTE_SCHEDULE_COMMENTS);
        busSelects.add(SELECT_ATTRIBUTE_FINANCE_STATUS);
        busSelects.add(SELECT_ATTRIBUTE_FINANCE_COMMENTS);
        busSelects.add(SELECT_ATTRIBUTE_RISK_STATUS);
        busSelects.add(SELECT_ATTRIBUTE_RISK_COMMENTS);

        MapList mlAssessments = doProject.getRelatedObjects(context, "Project Assessment", "Assessment", busSelects, null, false, true, (short)1, "", "", 0);

        mlAssessments.sort(DomainObject.SELECT_ORIGINATED, "descending", "date");

        if(sRandomize.contains("AssessmentHistory")) {
            for(int i = mlAssessments.size() - 1; i >= 1; i --) {
                mlAssessments.remove(i);
            }
        }

        for(int i = 0; i < mlAssessments.size(); i ++) {

            Map mAssessment             = (Map)mlAssessments.get(i);
            String sOriginated          = (String)mAssessment.get(DomainObject.SELECT_ORIGINATED);
            String sOriginator          = (String)mAssessment.get(DomainObject.SELECT_ORIGINATOR);
            String sStatusAssessment    = (String)mAssessment.get(SELECT_ATTRIBUTE_ASSESSMENT_STATUS);
            String sCommentAssessment   = (String)mAssessment.get(SELECT_ATTRIBUTE_ASSESSMENT_COMMENTS);
            String sStatusResource      = (String)mAssessment.get(SELECT_ATTRIBUTE_RESOURCE_STATUS);
            String sCommentResource     = (String)mAssessment.get(SELECT_ATTRIBUTE_RESOURCE_COMMENTS);
            String sStatusSchedule      = (String)mAssessment.get(SELECT_ATTRIBUTE_SCHEDULE_STATUS);
            String sCommentSchedule     = (String)mAssessment.get(SELECT_ATTRIBUTE_SCHEDULE_COMMENTS);
            String sStatusFinance       = (String)mAssessment.get(SELECT_ATTRIBUTE_FINANCE_STATUS);
            String sCommentFinance      = (String)mAssessment.get(SELECT_ATTRIBUTE_FINANCE_COMMENTS);
            String sStatusRisk          = (String)mAssessment.get(SELECT_ATTRIBUTE_RISK_STATUS);
            String sCommentRisk         = (String)mAssessment.get(SELECT_ATTRIBUTE_RISK_COMMENTS);

            if("".equals(sCommentAssessment))  { sCommentAssessment    = "-"; }
            if("".equals(sCommentResource) )   { sCommentResource      = "-"; }
            if("".equals(sCommentSchedule))    { sCommentSchedule      = "-"; }
            if("".equals(sCommentFinance))     { sCommentFinance       = "-"; }
            if("".equals(sCommentRisk))        { sCommentRisk          = "-"; }

            appendAssessmentData(sOriginated, "4", sbData1, sbData3, sbData2, sbData4, sOriginator, sStatusAssessment   , sCommentAssessment);
            appendAssessmentData(sOriginated, "3", sbData1, sbData3, sbData2, sbData4, sOriginator, sStatusResource     , sCommentResource  );
            appendAssessmentData(sOriginated, "2", sbData1, sbData3, sbData2, sbData4, sOriginator, sStatusSchedule     , sCommentSchedule  );
            appendAssessmentData(sOriginated, "1", sbData1, sbData3, sbData2, sbData4, sOriginator, sStatusFinance      , sCommentFinance   );
            appendAssessmentData(sOriginated, "0", sbData1, sbData3, sbData2, sbData4, sOriginator, sStatusRisk         , sCommentRisk      );

        }

        if(sRandomize.equalsIgnoreCase("AssessmentHistory")) {

            Calendar cDate = Calendar.getInstance();
            Random generator    = new Random();

            cDate.add(java.util.GregorianCalendar.MONTH, -1);

            for(int i = 0; i < 9; i++) {

                cDate.add(java.util.GregorianCalendar.MONTH, -1);

                int iAssessment = generator.nextInt(3);
                int iResource   = generator.nextInt(3);
                int iSchedule   = generator.nextInt(3);
                int iFinance    = generator.nextInt(3);
                int iRisk       = generator.nextInt(3);

                String sStatusAssessment = "-";
                String sStatusResource = "-";
                String sStatusSchedule = "-";
                String sStatusFinance = "-";
                String sStatusRisk = "-";

                if(iAssessment == 2) { sStatusAssessment = "Red"; } else if(iAssessment == 1) { sStatusAssessment = "Yellow"; } else if(iAssessment == 0) { sStatusAssessment = "Green"; }
                if(iResource   == 2) { sStatusResource   = "Red"; } else if(iResource   == 1) { sStatusResource   = "Yellow"; } else if(iResource   == 0) { sStatusResource   = "Green"; }
                if(iSchedule   == 2) { sStatusSchedule   = "Red"; } else if(iSchedule   == 1) { sStatusSchedule   = "Yellow"; } else if(iSchedule   == 0) { sStatusSchedule   = "Green"; }
                if(iFinance    == 2) { sStatusFinance    = "Red"; } else if(iFinance    == 1) { sStatusFinance    = "Yellow"; } else if(iFinance    == 0) { sStatusFinance    = "Green"; }
                if(iRisk       == 2) { sStatusRisk       = "Red"; } else if(iRisk       == 1) { sStatusRisk       = "Yellow"; } else if(iRisk       == 0) { sStatusRisk       = "Green"; }

                String sDate = sdf.format(cDate.getTime());

                appendAssessmentData(sDate, "4", sbData1, sbData3, sbData2, sbData4, "", sStatusAssessment   , "-");
                appendAssessmentData(sDate, "3", sbData1, sbData3, sbData2, sbData4, "", sStatusResource     , "-"  );
                appendAssessmentData(sDate, "2", sbData1, sbData3, sbData2, sbData4, "", sStatusSchedule     , "-"  );
                appendAssessmentData(sDate, "1", sbData1, sbData3, sbData2, sbData4, "", sStatusFinance      , "-"   );
                appendAssessmentData(sDate, "0", sbData1, sbData3, sbData2, sbData4, "", sStatusRisk         , "-"      );


            }

        }


        if(sbData1.length() > 0) { sbData1.setLength(sbData1.length() - 1); }
        if(sbData2.length() > 0) { sbData2.setLength(sbData2.length() - 1); }
        if(sbData3.length() > 0) { sbData3.setLength(sbData3.length() - 1); }
        if(sbData4.length() > 0) { sbData4.setLength(sbData4.length() - 1); }

        sbCategories.append("'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Risk"     , sLanguage)).append("',");
        sbCategories.append("'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Finance"     , sLanguage)).append("',");
        sbCategories.append("'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Schedule"     , sLanguage)).append("',");
        sbCategories.append("'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Resource"     , sLanguage)).append("',");
        sbCategories.append("'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.People.ProjectAssignmentFilterSummary"     , sLanguage)).append("'");

        aResult[0] = sbCategories.toString();
        aResult[1] = sbData1.toString();
        aResult[2] = sbData2.toString();
        aResult[3] = sbData3.toString();
        aResult[4] = sbData4.toString();

        return aResult;

    }
    public void appendAssessmentData(String sDate, String sCategory, StringBuilder sbData1, StringBuilder sbData2, StringBuilder sbData3, StringBuilder sbData4, String sOriginator, String sStatus, String sComment) throws ParseException  {


        Calendar cDate = Calendar.getInstance();
        cDate.setTime(sdf.parse(sDate));


        StringBuilder sbToAppend = new StringBuilder();
        sComment=  sComment.length() >= 30 ? sComment.substring(0, 30) + "..." : sComment;
        sComment = sComment.replaceAll("\n", "<br/>");

        if(!"".equals(sOriginator)) { sOriginator += ", "; }

        sbToAppend.append("{ name:'").append(sComment).append("<br/>(").append(sOriginator).append(sDate.substring(0, sDate.indexOf(" "))).append(")',");
        sbToAppend.append(" x:Date.UTC(").append(cDate.get(Calendar.YEAR)).append(",").append(cDate.get(Calendar.MONTH)).append(",").append(cDate.get(Calendar.DAY_OF_MONTH)).append("), ");
        sbToAppend.append(" y:").append(sCategory).append("},");

        if(sStatus.equals("Red"))         { sbData1.append(sbToAppend.toString()); }
        else if(sStatus.equals("Green"))  { sbData2.append(sbToAppend.toString()); }
        else if(sStatus.equals("Yellow")) { sbData3.append(sbToAppend.toString()); }
        else                              { sbData4.append(sbToAppend.toString()); }

    }


    // Task Assignment Dashboards
    public MapList getTaskOwners(Context context, String[] args) throws Exception {


        MapList mlResult    = new MapList();
        MapList mlObjects   = new MapList();
        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");

        if(null == sOID || "".equals(sOID)) {
            mlObjects = getActiveProjects(context);
        } else {
            Map mObject = new HashMap();
            mObject.put(DomainObject.SELECT_ID, sOID);
            mlObjects.add(mObject);
        }

        if (mlObjects.size() > 0) {
            for (int i = 0; i < mlObjects.size(); i++) {
                Map mProject = (Map) mlObjects.get(i);
                String sOIDProject = (String) mProject.get(DomainObject.SELECT_ID);
                MapList mlTasks = retrieveTasksOfProgramOrProject(context, sOIDProject, "", "", "");
                if (mlTasks.size() > 0) {
                    for (int j = 0; j < mlTasks.size(); j++) {
                        Map mTask       = (Map) mlTasks.get(j);
                        String sOwner   = (String)mTask.get(DomainObject.SELECT_OWNER);
                        Map mOwner      = new HashMap();
                        mOwner.put(DomainObject.SELECT_OWNER, sOwner);
                        if(!mlResult.contains(mOwner)) {
                            mlResult.add(mOwner);
                        }
                    }
                }
            }
        }

        if (mlResult.size() > 0) {
            for (int i = 0; i < mlResult.size(); i++) {
                Map mResult = (Map)mlResult.get(i);
                String sOwner = (String)mResult.get(DomainObject.SELECT_OWNER);
                com.matrixone.apps.common.Person pOwner = com.matrixone.apps.common.Person.getPerson(context, sOwner);
                mResult.put(DomainObject.SELECT_ID, pOwner.getObjectId());
            }
        }

        return mlResult;

    }
    public MapList getTaskAssignees(Context context, String[] args) throws Exception {


        MapList mlResult    = new MapList();
        MapList mlObjects   = new MapList();
        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("objectId");
        String sOwner       = context.getUser();

        if(null == sOID || "".equals(sOID)) {
            mlObjects = getActiveProjects(context);
        } else {
            Map mObject = new HashMap();
            mObject.put(DomainObject.SELECT_ID, sOID);
            mlObjects.add(mObject);
        }


        for (int i = 0; i < mlObjects.size(); i++) {

            Map mProject        = (Map) mlObjects.get(i);
            String sOIDProject  = (String) mProject.get(DomainObject.SELECT_ID);
            MapList mlTasks     = retrieveTasksOfProgramOrProject(context, sOIDProject, "", sOwner, "");

            for (int j = 0; j < mlTasks.size(); j++) {

                Map mTask           = (Map) mlTasks.get(j);
                String sIsAssigned  = (String)mTask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS);

                if(sIsAssigned.equalsIgnoreCase("TRUE")) {

                    if (mTask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS_FROM_NAME) instanceof StringList) {

                        StringList slAssignees = (StringList)mTask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS_FROM_NAME);
                        for(int k = 0; k < slAssignees.size(); k++) {
                            String sAssignee = (String)slAssignees.get(k);
                            Map mAssignee      = new HashMap();
                            mAssignee.put("assignee", sAssignee);
                            if(!mlResult.contains(mAssignee)) {
                                mlResult.add(mAssignee);
                            }
                        }

                    } else {

                        String sAssignee = (String)mTask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS_FROM_NAME);
                        Map mAssignee      = new HashMap();
                        mAssignee.put("assignee", sAssignee);
                        if(!mlResult.contains(mAssignee)) {
                            mlResult.add(mAssignee);
                        }

                    }
                }
            }
        }

        if (mlResult.size() > 0) {
            for (int i = 0; i < mlResult.size(); i++) {
                Map mResult = (Map)mlResult.get(i);
                String sAssignee = (String)mResult.get("assignee");
                com.matrixone.apps.common.Person pOwner = com.matrixone.apps.common.Person.getPerson(context, sAssignee);
                mResult.put(DomainObject.SELECT_ID, pOwner.getObjectId());
            }
        }

        return mlResult;

    }
    public MapList getActiveProjects(Context context) throws Exception {

        String[] init       = new String[]{};
        String[] methodargs = new String[2];
        HashMap argsMap     = new HashMap();

        argsMap.put("objectId", "");
        methodargs = JPO.packArgs(argsMap);

        return (com.matrixone.apps.domain.util.MapList) JPO.invoke(context, "emxProjectSpace", init, "getActiveProjects", methodargs, com.matrixone.apps.domain.util.MapList.class);
    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getUsersTasksPending(Context context, String[] args) throws Exception {


        MapList mlResult                        = new MapList();
        MapList mlProjects                      = new MapList();
        HashMap programMap                      = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) programMap.get("objectId");
        String sParentOID                       = (String) programMap.get("rootOID");
        String sMode                            = (String) programMap.get("mode");
        com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        String sOwner                           = pOwner.getInfo(context, DomainObject.SELECT_NAME);

        if(null == sParentOID || "".equals(sParentOID)) {
            mlProjects = getActiveProjects(context);
        } else {
            Map mObject = new HashMap();
            mObject.put(DomainObject.SELECT_ID, sParentOID);
            mlProjects.add(mObject);
        }

        for (int i = 0; i < mlProjects.size(); i++) {
            Map mProject        = (Map) mlProjects.get(i);
            String sOIDProject  = (String) mProject.get(DomainObject.SELECT_ID);
            MapList mlTasks     = retrieveTasksOfProgramOrProject(context, sOIDProject, sMode, sOwner, "");
            mlResult.addAll(mlTasks);
        }

        return mlResult;

    }
    public MapList retrieveTasksOfProgramOrProject(Context context, String sOID, String sSchedule, String sOwner, String sAssignee) throws Exception {


        MapList mlResult        = new MapList();
        DomainObject dObject    = new DomainObject(sOID);
        Pattern pTypes          = new Pattern("Task");
        StringList busSelects   = new StringList();
        StringList relSelects   = new StringList();
        Calendar cal            = Calendar.getInstance(TimeZone.getDefault());
        Calendar cCurrent       = Calendar.getInstance();
        int iYearCurrent        = cCurrent.get(Calendar.YEAR);
        int iMonthCurrent       = cCurrent.get(Calendar.MONTH);
        int iWeekCurrent        = cCurrent.get(Calendar.WEEK_OF_YEAR);
        long lCurrent           = cCurrent.getTimeInMillis();
        long lDiff              = 2592000000L;

        busSelects.add(DomainObject.SELECT_TYPE);
        busSelects.add(DomainObject.SELECT_OWNER);
        busSelects.add(DomainObject.SELECT_CURRENT);
        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_DURATION);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_START_DATE);
        busSelects.add(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
        busSelects.add(Task.SELECT_TASK_ACTUAL_DURATION);
        busSelects.add(Task.SELECT_TASK_ACTUAL_START_DATE);
        busSelects.add(Task.SELECT_TASK_ACTUAL_FINISH_DATE);
        busSelects.add(DomainObject.SELECT_PERCENTCOMPLETE);
        busSelects.add(SELECT_RELATIONSHIP_ASSIGNED_TASKS);
        busSelects.add(SELECT_RELATIONSHIP_ASSIGNED_TASKS_FROM_NAME);
        busSelects.add(SELECT_FROM_SUBTASK);
        relSelects.add(DomainObject.SELECT_RELATIONSHIP_ID);

        MapList mlTasks = dObject.getRelatedObjects(context, "Program Project,Subtask", "Project Space,Task Management", busSelects, relSelects, false, true, (short)0, "" ,"", 0, pTypes, null, null);

        if (mlTasks.size() > 0) {

            for (int i = 0; i < mlTasks.size(); i++) {

                Map mTask           = (Map) mlTasks.get(i);
                String sHasSubtasks = (String) mTask.get(SELECT_FROM_SUBTASK);

                if(sHasSubtasks.equalsIgnoreCase("FALSE")) {

                    Boolean bAdd = true;

                    // Filter if owner has been defined
                    if(!sOwner.equals("")) {
                        String sTaskOwner = (String)mTask.get(DomainObject.SELECT_OWNER);
                        if(!sTaskOwner.equals(sOwner)) {
                            bAdd = false;
                        }
                    }

                    // Filter for time schedule
                    if(bAdd) {
                        if(!"".equals(sSchedule)) {
                            String sCurrent = (String)mTask.get(DomainObject.SELECT_CURRENT);
                            if ("Complete".equals(sCurrent)) {
                                bAdd = false;
                            } else {

                                if ("Overdue".equals(sSchedule)) {
                                    String sTargetDate = (String) mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                    if (sTargetDate != null && !"".equals(sTargetDate)) {
                                        Calendar cTarget = Calendar.getInstance();
                                        cTarget.setTime(sdf.parse(sTargetDate));
                                        if (cTarget.after(cal)) {
                                            bAdd = false;
                                        }
                                    }
                                } else if ("This Week".equals(sSchedule)) {
                                    String sTargetDate = (String) mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                    if (sTargetDate != null && !"".equals(sTargetDate)) {

                                        Calendar cTarget = Calendar.getInstance();
                                        cTarget.setTime(sdf.parse(sTargetDate));

                                        int iYearTarget = cTarget.get(Calendar.YEAR);
                                        int iWeekTarget = cTarget.get(Calendar.WEEK_OF_YEAR);

                                        bAdd = false;
                                        if (iYearCurrent == iYearTarget) {
                                            if (iWeekCurrent == iWeekTarget) {
                                                bAdd = true;
                                            }
                                        }
                                    }
                                } else if ("This Month".equals(sSchedule)) {
                                    String sTargetDate = (String) mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                    if (sTargetDate != null && !"".equals(sTargetDate)) {

                                        Calendar cTarget = Calendar.getInstance();
                                        cTarget.setTime(sdf.parse(sTargetDate));

                                        int iYearTarget = cTarget.get(Calendar.YEAR);
                                        int iMonthTarget = cTarget.get(Calendar.MONTH);

                                        bAdd = false;
                                        if (iYearCurrent == iYearTarget) {
                                            if (iMonthCurrent == iMonthTarget) {
                                                bAdd = true;
                                            }
                                        }
                                    }
                                } else if ("Soon".equals(sSchedule)) {
                                    String sTargetDate = (String) mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                                    if (sTargetDate != null && !"".equals(sTargetDate)) {

                                        Calendar cTarget = Calendar.getInstance();
                                        cTarget.setTime(sdf.parse(sTargetDate));
                                        long lTarget        = cTarget.getTimeInMillis();
                                        bAdd = false;

                                        if ((lTarget - lCurrent) < lDiff) {
                                            if ((lTarget - lCurrent) > 0) {
                                                 bAdd = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Filter for task assignment
                    if(bAdd) {
                        if(!sAssignee.equals("")) {
                            String sIsAssigned = (String)mTask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS);
                            bAdd = false;

                            if (sIsAssigned.equalsIgnoreCase("TRUE")) {
                                if (mTask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS_FROM_NAME) instanceof StringList) {

                                    StringList slAssignees = (StringList)mTask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS_FROM_NAME);
                                    for(int k = 0; k < slAssignees.size(); k++) {

                                        String sTaskAssignee = (String)slAssignees.get(k);
                                        if(sTaskAssignee.equals(sAssignee)) {
                                            bAdd = true;
                                            break;
                                        }
                                    }

                                } else {

                                    String sTaskAssignee = (String)mTask.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS_FROM_NAME);
                                    if(sTaskAssignee.equals(sAssignee)) {
                                        bAdd = true;
                                    }
                                }
                            }
                        }
                    }

                    if(bAdd) {
                        mTask.remove("level");
                        mlResult.add(mTask);
                    }
                }
            }
        }

        return mlResult;
    }
    public StringBuffer getDataUsersTasksOwnedDueDate (Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        String sLanguage                            = (String) paramMap.get("languageStr");
        com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        String sOwner                           = pOwner.getInfo(context, DomainObject.SELECT_NAME);

        StringBuffer sbResult       = new StringBuffer();
        StringBuffer sbResultCreate = new StringBuffer();
        StringBuffer sbResultAssign = new StringBuffer();
        StringBuffer sbResultActive = new StringBuffer();
        StringBuffer sbResultReview = new StringBuffer();

        sbResultCreate.append("name: '").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.State.Project_Task.Create", sLanguage)).append("',   color:'#d1d4d4', data: [");
        sbResultAssign.append("name: '").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.State.Project_Task.Assign", sLanguage)).append("',  color:'#CC092F', data: [");
        sbResultActive.append("name: '").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.State.Project_Task.Active", sLanguage)).append("',    color:'#FF8A2E', data: [");
        sbResultReview.append("name: '").append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.State.Project_Task.Review", sLanguage)).append("', color:'#6FBC4B', data: [");

        MapList mlTasks = new MapList();
        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "All", sOwner, "");
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "All", sOwner, "");
        }

        mlTasks.sort(Task.SELECT_TASK_ESTIMATED_FINISH_DATE, "ascending", "date");

        if(mlTasks.size() > 0) {

            Map mTask                   = (Map)mlTasks.get(0);
            String sCurrent             = (String)mTask.get(DomainObject.SELECT_CURRENT);
            String sDateTimePrevious    = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            String sDatePrevious        = sDateTimePrevious.substring(0, sDateTimePrevious.indexOf(" "));

            int iCountCreate = 0;
            int iCountAssign = 0;
            int iCountActive = 0;
            int iCountReview = 0;

            if(sCurrent.equals("Create"))       { iCountCreate++; }
            else if(sCurrent.equals("Assign"))  { iCountAssign++; }
            else if(sCurrent.equals("Active"))  { iCountActive++; }
            else if(sCurrent.equals("Review"))  { iCountReview++; }

            for(int i = 1; i < mlTasks.size(); i++) {
                mTask = (Map)mlTasks.get(i);
                sCurrent = (String)mTask.get(DomainObject.SELECT_CURRENT);
                String sDateTime = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                String sDate = sDateTime.substring(0, sDateTime.indexOf(" "));
                if(sDate.equals(sDatePrevious)) {
                    if(sCurrent.equals("Create"))       { iCountCreate++; }
                    else if(sCurrent.equals("Assign"))  { iCountAssign++; }
                    else if(sCurrent.equals("Active"))  { iCountActive++; }
                    else if(sCurrent.equals("Review"))  { iCountReview++; }
                } else {
                    Calendar cCreation = Calendar.getInstance();
                    cCreation.setTime(sdf.parse(sDateTimePrevious));
                    int iDay 	= cCreation.get(Calendar.DAY_OF_MONTH);
                    int iMonth 	= cCreation.get(Calendar.MONTH);
                    int iYear 	= cCreation.get(Calendar.YEAR);

                    sbResultCreate.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountCreate).append("],");
                    sbResultAssign.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountAssign).append("],");
                    sbResultActive.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountActive).append("],");
                    sbResultReview.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountReview).append("],");

                    iCountCreate = 0;
                    iCountAssign = 0;
                    iCountActive = 0;
                    iCountReview = 0;

                    if(sCurrent.equals("Create"))       { iCountCreate++; }
                    else if(sCurrent.equals("Assign"))  { iCountAssign++; }
                    else if(sCurrent.equals("Active"))  { iCountActive++; }
                    else if(sCurrent.equals("Review"))  { iCountReview++; }

                    sDateTimePrevious = sDateTime;
                    sDatePrevious = sDate;
                }
		if (i == (mlTasks.size() - 1)) {
                    Calendar cCreation = Calendar.getInstance();
                    cCreation.setTime(sdf.parse(sDateTime));
                    int iDay 	= cCreation.get(Calendar.DAY_OF_MONTH);
                    int iMonth 	= cCreation.get(Calendar.MONTH);
                    int iYear 	= cCreation.get(Calendar.YEAR);

                    sbResultCreate.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountCreate).append("]");
                    sbResultAssign.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountAssign).append("]");
                    sbResultActive.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountActive).append("]");
                    sbResultReview.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountReview).append("]");

		}
            }
        }

        sbResultCreate.append("]");
        sbResultAssign.append("]");
        sbResultActive.append("]");
        sbResultReview.append("]");

        sbResult.append(sbResultCreate);
        sbResult.append("},{");
        sbResult.append(sbResultAssign);
        sbResult.append("},{");
        sbResult.append(sbResultActive);
        sbResult.append("},{");
        sbResult.append(sbResultReview);

        return sbResult;

    }
    public StringBuffer getDataUsersTasksOwnedSchedule(Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        String sOwner                           = pOwner.getInfo(context, DomainObject.SELECT_NAME);

        int[][] aData = new int[4][5];
        for (int i = 0; i < 4; i++) { for(int j = 0; j < 5; j++) { aData[i][j] = 0; } }


        MapList mlProjects = new MapList();
        if(null == sParentOID || "".equals(sParentOID)) {
            mlProjects = getActiveProjects(context);
        } else {
            Map mProject = new HashMap();
            mProject.put(DomainObject.SELECT_ID, sParentOID);
            mlProjects.add(mProject);
        }
        for(int i = 0; i < mlProjects.size(); i++) {
            Map mProject                = (Map)mlProjects.get(i);
            String sOIDProject          = (String)mProject.get(DomainObject.SELECT_ID);
            MapList mlTasksThisWeek     = retrieveTasksOfProgramOrProject(context, sOIDProject, "This Week" , sOwner, "");
            MapList mlTasksThisMonth    = retrieveTasksOfProgramOrProject(context, sOIDProject, "This Month", sOwner, "");
            MapList mlTasksSoon         = retrieveTasksOfProgramOrProject(context, sOIDProject, "Soon"      , sOwner, "");
            MapList mlTasksOverdue      = retrieveTasksOfProgramOrProject(context, sOIDProject, "Overdue"   , sOwner, "");

            for(int j = 0; j < mlTasksThisWeek.size(); j++) {
                Map mTask = (Map)mlTasksThisWeek.get(j);
                String sPercentComplete = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
                double dPercent = Task.parseToDouble(sPercentComplete);
                if(dPercent <= 25.0)        { aData[0][0]++; }
                else if(dPercent <= 50.0)   { aData[0][1]++; }
                else if(dPercent <= 75.0)   { aData[0][2]++; }
                else if(dPercent < 100.0)   { aData[0][3]++; }
                else                        { aData[0][4]++; }
            }
            for(int j = 0; j < mlTasksThisMonth.size(); j++) {
                Map mTask = (Map)mlTasksThisMonth.get(j);
                String sPercentComplete = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
                double dPercent = Task.parseToDouble(sPercentComplete);
                if(dPercent <= 25.0)        { aData[1][0]++; }
                else if(dPercent <= 50.0)   { aData[1][1]++; }
                else if(dPercent <= 75.0)   { aData[1][2]++; }
                else if(dPercent < 100.0)   { aData[1][3]++; }
                else                        { aData[1][4]++; }
            }
            for(int j = 0; j < mlTasksSoon.size(); j++) {
                Map mTask = (Map)mlTasksSoon.get(j);
                String sPercentComplete = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
                double dPercent = Task.parseToDouble(sPercentComplete);
                if(dPercent <= 25.0)        { aData[2][0]++; }
                else if(dPercent <= 50.0)   { aData[2][1]++; }
                else if(dPercent <= 75.0)   { aData[2][2]++; }
                else if(dPercent < 100.0)   { aData[2][3]++; }
                else                        { aData[2][4]++; }
            }
            for(int j = 0; j < mlTasksOverdue.size(); j++) {
                Map mTask = (Map)mlTasksOverdue.get(j);
                String sPercentComplete = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
                double dPercent = Task.parseToDouble(sPercentComplete);
                if(dPercent <= 25.0)        { aData[3][0]++; }
                else if(dPercent <= 50.0)   { aData[3][1]++; }
                else if(dPercent <= 75.0)   { aData[3][2]++; }
                else if(dPercent < 100.0)   { aData[3][3]++; }
                else                        { aData[3][4]++; }
            }

        }

        StringBuffer sbResult     = new StringBuffer();
        StringBuffer sbResult0025 = new StringBuffer();
        StringBuffer sbResult2550 = new StringBuffer();
        StringBuffer sbResult5075 = new StringBuffer();
        StringBuffer sbResult7599 = new StringBuffer();
        StringBuffer sbResult9900 = new StringBuffer();

        sbResult0025.append("color: '#009DDB', name: '< 25%',     data: [");
        sbResult2550.append("color: '#005686', name: '25-50%',    data: [");
        sbResult5075.append("color: '#003c5a', name: '50-75%',    data: [");
        sbResult7599.append("color: '#3d3d3d', name: '75-99%',    data: [");
        sbResult9900.append("color: '#FF8A2E', name: 'In Review', data: [");

        sbResult0025.append(aData[0][0]).append(",").append(aData[1][0]).append(",").append(aData[2][0]).append(",").append(aData[3][0]).append("]");
        sbResult2550.append(aData[0][1]).append(",").append(aData[1][1]).append(",").append(aData[2][1]).append(",").append(aData[3][1]).append("]");
        sbResult5075.append(aData[0][2]).append(",").append(aData[1][2]).append(",").append(aData[2][2]).append(",").append(aData[3][2]).append("]");
        sbResult7599.append(aData[0][3]).append(",").append(aData[1][3]).append(",").append(aData[2][3]).append(",").append(aData[3][3]).append("]");
        sbResult9900.append(aData[0][4]).append(",").append(aData[1][4]).append(",").append(aData[2][4]).append(",").append(aData[3][4]).append("]");

        sbResult.append(sbResult9900);
        sbResult.append("},{");
        sbResult.append(sbResult7599);
        sbResult.append("},{");
        sbResult.append(sbResult5075);
        sbResult.append("},{");
        sbResult.append(sbResult2550);
        sbResult.append("},{");
        sbResult.append(sbResult0025);

        return sbResult;

    }
    public StringBuffer getDataUsersTasksOwnedStart   (Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        String sLanguage                        = (String) paramMap.get("languageStr");
        long lDiff                              = 172800000L;
        com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        String sOwner                           = pOwner.getInfo(context, DomainObject.SELECT_NAME);

        int[] aData = new int[4];
        for (int i = 0; i < 4; i++) { aData[i] = 0; }

        MapList mlTasks = new MapList();
        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", sOwner, "");
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", sOwner, "");
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask           = (Map)mlTasks.get(i);
            String sTarget      = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_START_DATE);
            String sActual      = (String)mTask.get(Task.SELECT_TASK_ACTUAL_START_DATE);
            Calendar cTarget    = Calendar.getInstance();

            cTarget.setTime(sdf.parse(sTarget));

            if(null == sActual || "".equals(sActual)) {

                Calendar cCurrent = Calendar.getInstance();
                if(cCurrent.after(cTarget)) {
                    aData[3]++;
                } else {
                    aData[0]++;
                }

            } else {

                Calendar cActual = Calendar.getInstance();
                cActual.setTime(sdf.parse(sActual));
                long lTarget        = cTarget.getTimeInMillis();
                long lActual        = cActual.getTimeInMillis();
                if(cTarget.after(cActual)) {
                    if((lTarget - lActual) < lDiff) {
                        aData[2]++;
                    } else {
                        aData[1]++;
                    }
                } else {
                    if((lActual - lTarget) < lDiff) {
                        aData[2]++;
                    } else {
                        aData[3]++;
                    }
                }
            }
        }

        StringBuffer sbResult = new StringBuffer();

        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.NotStarted", sLanguage)).append("', y:").append(aData[0]).append(", header:'OwnedTasksNotStarted'    , filter: 'Not Started'   },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Earlier", sLanguage)).append("', y:").append(aData[1]).append(", header:'OwnedTasksStartedEarly'  , filter: 'Early'         },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.OnTime", sLanguage)).append("', y:").append(aData[2]).append(", header:'OwnedTasksStartedOnTime' , filter: 'On Time'       },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Late", sLanguage)).append("', y:").append(aData[3]).append(", header:'OwnedTasksStartedLate'   , filter: 'Late'          } ");


        return sbResult;

    }
    public StringBuffer getDataUsersTasksOwnedFinish  (Context context, String[] args) throws Exception {


        HashMap programMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) programMap.get("objectId");
        String sParentOID                       = (String) programMap.get("parentOID");
        String sLanguage                        = (String) programMap.get("languageStr");
        long lDiff                              = 172800000L;
        com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        String sOwner                           = pOwner.getInfo(context, DomainObject.SELECT_NAME);
        MapList mlTasks                         = new MapList();

        int[] aData = new int[4];
        for (int i = 0; i < 4; i++) { aData[i] = 0; }

        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", sOwner, "");
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", sOwner, "");
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask           = (Map)mlTasks.get(i);
            String sTarget      = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            String sActual      = (String)mTask.get(Task.SELECT_TASK_ACTUAL_FINISH_DATE);
            Calendar cTarget    = Calendar.getInstance();

            cTarget.setTime(sdf.parse(sTarget));

            if(null == sActual || "".equals(sActual)) {

                Calendar cCurrent = Calendar.getInstance();
                if(cCurrent.after(cTarget)) {
                    aData[3]++;
                } else {
                    aData[0]++;
                }

            } else {

                Calendar cActual = Calendar.getInstance();
                cActual.setTime(sdf.parse(sActual));
                long lTarget    = cTarget.getTimeInMillis();
                long lActual    = cActual.getTimeInMillis();

                if(cTarget.after(cActual)) {
                    if((lTarget - lActual) <= lDiff) { aData[2]++;
                    } else { aData[1]++; }
                } else {
                    if((lActual - lTarget) <= lDiff) { aData[2]++;
                    } else { aData[3]++; }
                }

            }
        }

        StringBuffer sbResult = new StringBuffer();
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.NotFinished", sLanguage)).append("', y:").append(aData[0]).append(", header:'OwnedTasksNotFinished'    , filter: 'Not Finished'  },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Earlier", sLanguage)).append("', y:").append(aData[1]).append(", header:'OwnedTasksFinishedEarly'  , filter: 'Early'         },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.OnTime", sLanguage)).append("', y:").append(aData[2]).append(", header:'OwnedTasksFinishedOnTime' , filter: 'On Time'       },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Late", sLanguage)).append("', y:").append(aData[3]).append(", header:'OwnedTasksFinishedLate'   , filter: 'Late'          } ");

        return sbResult;

    }
    public StringBuffer getDataUsersTasksOwnedDuration(Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        String sLanguage                        = (String) paramMap.get("languageStr");
        com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        String sOwner                           = pOwner.getInfo(context, DomainObject.SELECT_NAME);
        MapList mlTasks                         = new MapList();

        int[] aData = new int[5];
        for (int i = 0; i < 5; i++) { aData[i] = 0; }

        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", sOwner, "");
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", sOwner, "");
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask       = (Map)mlTasks.get(i);
            String sTarget  = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_DURATION);
            String sActual  = (String)mTask.get(Task.SELECT_TASK_ACTUAL_DURATION);
            String sFinish  = (String)mTask.get(Task.SELECT_TASK_ACTUAL_FINISH_DATE);

            if(null != sFinish && !"".equals(sFinish)) {

                double dTarget  = Task.parseToDouble(sTarget);
                double dActual  = Task.parseToDouble(sActual);
                double dDev     = dTarget - dActual;

                if(dDev > 3.0) { aData[0]++; }
                else if(dDev > 1.0) { aData[1]++; }
                else if(dDev > -1.0) { aData[2]++; }
                else if(dDev > -3.0) { aData[3]++; }
                else { aData[4]++; }
            }
        }

        StringBuffer sbResult = new StringBuffer();
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MuchLess", sLanguage)).append("', y:").append(aData[0]).append(", header:'OwnedTasksDurationMuchLess'  , filter: 'Much Less'   },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.3DaysLess", sLanguage)).append("', y:").append(aData[1]).append(", header:'OwnedTasksDuration3DaysLess' , filter: '3 Days Less' },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.AsPlanned", sLanguage)).append("', y:").append(aData[2]).append(", header:'OwnedTasksDurationAsPlanned' , filter: 'As Planned'  },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.3DaysMore", sLanguage)).append("', y:").append(aData[3]).append(", header:'OwnedTasksDuration3DaysMore' , filter: '3 Days More' },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MuchMore", sLanguage)).append("', y:").append(aData[4]).append(", header:'OwnedTasksDurationMuchMore'  , filter: 'Much More'   } ");

        return sbResult;

    }
    public StringBuffer getDataUsersTasksAssignedResourceLoad(Context context, String[] args) throws Exception {

    	return new StringBuffer();
       /* HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        com.matrixone.apps.common.Person pUser  = new com.matrixone.apps.common.Person(sOID);
        String sAssignee                        = pUser.getInfo(context, DomainObject.SELECT_NAME);
        ResourceLoading resourceLoading         = new ResourceLoading (context);

        StringBuffer sbBlu      = new StringBuffer();
        StringBuffer sbOra      = new StringBuffer();
        StringBuffer sbRed      = new StringBuffer();
        StringBuffer sbResult   = new StringBuffer();
        sbBlu.append("{ name: 'Safe',     color:'#005686', data: [");
        sbOra.append("{ name: 'Limit',    color:'#FF8A2E', data: [");
        sbRed.append("{ name: 'Exceeded', color:'#CC092F', data: [");

        MapList mlTasks = new MapList();
        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "All", "", sAssignee);
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "All", "", sAssignee);
        }

        mlTasks.sort(Task.SELECT_TASK_ESTIMATED_FINISH_DATE, "ascending", "date");

        if(mlTasks.size() > 1) {

            ArrayList al        = new ArrayList();
            Vector vec          = new Vector();
            Map mTaskFirst      = (Map)mlTasks.get(0);
            Map mTaskLast       = (Map)mlTasks.get(mlTasks.size() - 1);
            String sDateFirst   = (String)mTaskFirst.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            String sDateLast    = (String)mTaskLast.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            Date dStart         = sdf.parse(sDateFirst);
            Date dEnd           = sdf.parse(sDateLast);
            Date dStartAdjusted = resourceLoading.adjustWeeklyStartDate(dStart);
            Date dEndAdjusted   = resourceLoading.adjustWeeklyStartDate(dEnd);
            al                  = resourceLoading.getWeeklyData(dStartAdjusted, dEndAdjusted);

            if(al.size() == 0) { return sbResult; }

            com.matrixone.apps.program.Task task = (com.matrixone.apps.program.Task) DomainObject.newInstance(context, DomainConstants.TYPE_TASK, "PROGRAM");
            SimpleDateFormat sdfValue  = new SimpleDateFormat("EEE MMM d HH:mm:ss z yyyy");

            for(int i = 0; i < mlTasks.size(); i++) {

                Map mTask               = (Map)mlTasks.get(i);
                String sTaskOID         = (String)mTask.get(DomainObject.SELECT_ID);
                String sTaskStart       = (String)mTask.get(task.SELECT_TASK_ESTIMATED_START_DATE);
                String sTaskEnd         = (String)mTask.get(task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                String sTaskDuration    = (String)mTask.get(task.SELECT_TASK_ESTIMATED_DURATION);

                Vector taskVec = resourceLoading.getAllocation(context, sTaskOID, DomainConstants.RELATIONSHIP_ASSIGNED_TASKS, "Person", true, false, (short)1, true);

                task.setId(sTaskOID);

                StringList busTaskSelects = new StringList(1);
                busTaskSelects.add(task.SELECT_ID);

                String attribute_ProjectVisibility="Project Visibility";
                StringList busProjSelects = new StringList();
                busProjSelects.addElement(DomainObject.SELECT_ID);
                busProjSelects.addElement("attribute[" + attribute_ProjectVisibility + "]");

                Map projMap             = (Map) task.getProject(context, busProjSelects);
                String projID           = (String)projMap.get(task.SELECT_ID);
                String projVisibility   = (String)projMap.get("attribute[" + attribute_ProjectVisibility + "]");

                //if visibility is set to members and the person is not a member of the project
                //then do not include this task in the report.

                boolean checkmembership = false;
                MapList ml              = (MapList)resourceLoading.getAssigneeInfo(context, sTaskOID, true);
                String pid              = null;
                Iterator mListItr       = ml.iterator();

                while(mListItr.hasNext()){
                    pid = (String) ( ( (Map)mListItr.next() ).get(DomainConstants.SELECT_ID) );
                    if(sOID.equals(pid) && pid != null && pid.length() != 0){
                        checkmembership = true;
                        break;
                    } else {
                        checkmembership = resourceLoading.isPersonProjectMember(context,projID,sOID);
                    }
                }

                if(projVisibility != null && projVisibility.trim().length()>0 && projVisibility.equalsIgnoreCase("Members") && !checkmembership) {
                    continue;
                }

                String totalAssingees   = "" + ml.size();
                String userCalendarId   = resourceLoading.getUserCalendar(context,sOID);
                String alloc_value      = resourceLoading.getAllocValue(taskVec,sOID);
                ArrayList hmInfo        = new ArrayList();

                if (userCalendarId != null && !"".equals(userCalendarId) && !"null".equals(userCalendarId)) {
                    Date sttDate = new Date(sTaskStart);
                    Date eddDate = new Date(sTaskEnd);
                    hmInfo = resourceLoading.getDaysInRange(context, userCalendarId, sttDate,eddDate,1);
                 }
                 else{
                    hmInfo = resourceLoading.getDateRangeData(sTaskStart, sTaskEnd, true);
                 }

                Map mData = new HashMap();
                mData.put("taskid", sTaskOID);
                mData.put("taskDays", hmInfo);
                mData.put("duration", sTaskDuration);
                mData.put("assignees", totalAssingees);
                mData.put("allocation", alloc_value);
                vec.add(mData);

            }

            HashMap top = new HashMap();
            top.put("personid", sOID);
            top.put("fullname", sAssignee);
            top.put("data",vec);

            for(int w=0; w<al.size(); w++){

                Date weekItem           = (Date)al.get(w);
                int MILLIS_IN_DAY       = 1000 * 60 * 60 * 24;
                Date week_date_end      = new Date( weekItem.getTime() + (6*MILLIS_IN_DAY));
                ArrayList daysofweek    = resourceLoading.getAvailableDates(context, weekItem, week_date_end, sOID, 1);
                String sWeeklyLoad      = "";

                try {
                sWeeklyLoad      = (String) resourceLoading.getWeeklyResourceLoading(top,daysofweek,false);
                } catch (Exception e) { return sbResult; }

                if(!sWeeklyLoad.equals("")) {

                    Double dBlu             = 0.0;
                    Double dOra             = 0.0;
                    Double dRed             = 0.0;

                    String sValue = sWeeklyLoad.replace("</font>", "");

                    if(sValue.contains(">")) {
                        sValue = sValue.substring(sValue.indexOf(">") + 1);
                    }

                    Double dValue   = Task.parseToDouble(sValue);
                    dValue          = dValue * 100;

                    if(sWeeklyLoad.contains("red"))         { dRed = dValue; }
                    else if(sWeeklyLoad.contains("orange")) { dOra = dValue; }
                    else                                    { dBlu = dValue; }

                    Calendar cValue = Calendar.getInstance();
                    cValue.setTime(sdfValue.parse(al.get(w).toString()));

                    int iDay 	= cValue.get(Calendar.DAY_OF_MONTH);
                    int iMonth 	= cValue.get(Calendar.MONTH);
                    int iYear 	= cValue.get(Calendar.YEAR);

                    sbBlu.append("[Date.UTC(" + iYear + "," + iMonth + "," + iDay);
                    sbBlu.append("), ");
                    sbBlu.append(dBlu);
                    sbBlu.append("],");

                    sbOra.append("[Date.UTC(" + iYear + "," + iMonth + "," + iDay);
                    sbOra.append("), ");
                    sbOra.append(dOra);
                    sbOra.append("],");

                    sbRed.append("[Date.UTC(" + iYear + "," + iMonth + "," + iDay);
                    sbRed.append("), ");
                    sbRed.append(dRed);
                    sbRed.append("],");

                }

            }
        } else {
            return sbResult;
        }

        if(sbBlu.length() > 0) { sbBlu.setLength(sbBlu.length() - 1); }
        if(sbOra.length() > 0) { sbOra.setLength(sbOra.length() - 1); }
        if(sbRed.length() > 0) { sbRed.setLength(sbRed.length() - 1); }

        sbBlu.append("]}");
        sbOra.append("]}");
        sbRed.append("]}");

        sbResult = sbResult.append(sbBlu + "," + sbOra + "," + sbRed);

        return sbResult;*/

    }
    public StringBuffer getDataUsersTasksAssignedDueDate(Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        com.matrixone.apps.common.Person pUser  = new com.matrixone.apps.common.Person(sOID);
        String sAssignee                        = pUser.getInfo(context, DomainObject.SELECT_NAME);

        StringBuffer sbResult       = new StringBuffer();
        StringBuffer sbResultCreate = new StringBuffer();
        StringBuffer sbResultAssign = new StringBuffer();
        StringBuffer sbResultActive = new StringBuffer();
        StringBuffer sbResultReview = new StringBuffer();

        sbResultCreate.append("name: 'Planned Tasks',   color:'#d1d4d4', data: [");
        sbResultAssign.append("name: 'Assigned Tasks',  color:'#CC092F', data: [");
        sbResultActive.append("name: 'Active Tasks',    color:'#FF8A2E', data: [");
        sbResultReview.append("name: 'Tasks In Review', color:'#6FBC4B', data: [");

        MapList mlTasks = new MapList();
        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "All", "", sAssignee);
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "All", "", sAssignee);
        }

        mlTasks.sort(Task.SELECT_TASK_ESTIMATED_FINISH_DATE, "ascending", "date");

        if(mlTasks.size() > 1) {

            Map mTask                   = (Map)mlTasks.get(0);
            String sCurrent             = (String)mTask.get(DomainObject.SELECT_CURRENT);
            String sDateTimePrevious    = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            String sDatePrevious        = sDateTimePrevious.substring(0, sDateTimePrevious.indexOf(" "));

            int iCountCreate = 0;
            int iCountAssign = 0;
            int iCountActive = 0;
            int iCountReview = 0;

            if(sCurrent.equals("Create"))       { iCountCreate++; }
            else if(sCurrent.equals("Assign"))  { iCountAssign++; }
            else if(sCurrent.equals("Active"))  { iCountActive++; }
            else if(sCurrent.equals("Review"))  { iCountReview++; }

            for(int i = 1; i < mlTasks.size(); i++) {
                mTask = (Map)mlTasks.get(i);


                sCurrent = (String)mTask.get(DomainObject.SELECT_CURRENT);
                String sDateTime = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
                String sDate = sDateTime.substring(0, sDateTime.indexOf(" "));
                if(sDate.equals(sDatePrevious)) {
                    if(sCurrent.equals("Create"))       { iCountCreate++; }
                    else if(sCurrent.equals("Assign"))  { iCountAssign++; }
                    else if(sCurrent.equals("Active"))  { iCountActive++; }
                    else if(sCurrent.equals("Review"))  { iCountReview++; }
                } else {
                    Calendar cCreation = Calendar.getInstance();
                    cCreation.setTime(sdf.parse(sDateTimePrevious));
                    int iDay 	= cCreation.get(Calendar.DAY_OF_MONTH);
                    int iMonth 	= cCreation.get(Calendar.MONTH);
                    int iYear 	= cCreation.get(Calendar.YEAR);

                    sbResultCreate.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountCreate).append("],");
                    sbResultAssign.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountAssign).append("],");
                    sbResultActive.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountActive).append("],");
                    sbResultReview.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountReview).append("],");

                    iCountCreate = 0;
                    iCountAssign = 0;
                    iCountActive = 0;
                    iCountReview = 0;

                    if(sCurrent.equals("Create"))       { iCountCreate++; }
                    else if(sCurrent.equals("Assign"))  { iCountAssign++; }
                    else if(sCurrent.equals("Active"))  { iCountActive++; }
                    else if(sCurrent.equals("Review"))  { iCountReview++; }

                    sDateTimePrevious = sDateTime;
                    sDatePrevious = sDate;
                }
		if (i == (mlTasks.size() - 1)) {
                    Calendar cCreation = Calendar.getInstance();
                    cCreation.setTime(sdf.parse(sDateTime));
                    int iDay 	= cCreation.get(Calendar.DAY_OF_MONTH);
                    int iMonth 	= cCreation.get(Calendar.MONTH);
                    int iYear 	= cCreation.get(Calendar.YEAR);

                    sbResultCreate.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountCreate).append("]");
                    sbResultAssign.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountAssign).append("]");
                    sbResultActive.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountActive).append("]");
                    sbResultReview.append("[Date.UTC(").append(iYear).append(",").append(iMonth).append(",").append(iDay).append("), ").append(iCountReview).append("]");

		}
            }
        } else { return sbResult; }

        sbResultCreate.append("]");
        sbResultAssign.append("]");
        sbResultActive.append("]");
        sbResultReview.append("]");

        sbResult.append(sbResultCreate);
        sbResult.append("},{");
        sbResult.append(sbResultAssign);
        sbResult.append("},{");
        sbResult.append(sbResultActive);
        sbResult.append("},{");
        sbResult.append(sbResultReview);

        return sbResult;

    }
    public StringBuffer getDataUsersTasksAssignedSchedule(Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        com.matrixone.apps.common.Person pUser  = new com.matrixone.apps.common.Person(sOID);
        String sAssignee                        = pUser.getInfo(context, DomainObject.SELECT_NAME);

        int[][] aData = new int[4][5];
        for (int i = 0; i < 4; i++) { for(int j = 0; j < 5; j++) { aData[i][j] = 0; } }


        MapList mlProjects = new MapList();
        if(null == sParentOID || "".equals(sParentOID)) {
            mlProjects = getActiveProjects(context);
        } else {
            Map mProject = new HashMap();
            mProject.put(DomainObject.SELECT_ID, sParentOID);
            mlProjects.add(mProject);
        }
        for(int i = 0; i < mlProjects.size(); i++) {
            Map mProject                = (Map)mlProjects.get(i);
            String sOIDProject          = (String)mProject.get(DomainObject.SELECT_ID);
            MapList mlTasksThisWeek     = retrieveTasksOfProgramOrProject(context, sOIDProject, "This Week", "", sAssignee);
            MapList mlTasksThisMonth    = retrieveTasksOfProgramOrProject(context, sOIDProject, "This Month", "", sAssignee);
            MapList mlTasksSoon         = retrieveTasksOfProgramOrProject(context, sOIDProject, "Soon", "", sAssignee);
            MapList mlTasksOverdue      = retrieveTasksOfProgramOrProject(context, sOIDProject, "Overdue", "", sAssignee);

            for(int j = 0; j < mlTasksThisWeek.size(); j++) {
                Map mTask = (Map)mlTasksThisWeek.get(j);
                String sPercentComplete = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
                double dPercent = Task.parseToDouble(sPercentComplete);
                if(dPercent <= 25.0)        { aData[0][0]++; }
                else if(dPercent <= 50.0)   { aData[0][1]++; }
                else if(dPercent <= 75.0)   { aData[0][2]++; }
                else if(dPercent < 100.0)   { aData[0][3]++; }
                else                        { aData[0][4]++; }
            }
            for(int j = 0; j < mlTasksThisMonth.size(); j++) {
                Map mTask = (Map)mlTasksThisMonth.get(j);
                String sPercentComplete = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
                double dPercent = Task.parseToDouble(sPercentComplete);
                if(dPercent <= 25.0)        { aData[1][0]++; }
                else if(dPercent <= 50.0)   { aData[1][1]++; }
                else if(dPercent <= 75.0)   { aData[1][2]++; }
                else if(dPercent < 100.0)   { aData[1][3]++; }
                else                        { aData[1][4]++; }
            }
            for(int j = 0; j < mlTasksSoon.size(); j++) {
                Map mTask = (Map)mlTasksSoon.get(j);
                String sPercentComplete = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
                double dPercent = Task.parseToDouble(sPercentComplete);
                if(dPercent <= 25.0)        { aData[2][0]++; }
                else if(dPercent <= 50.0)   { aData[2][1]++; }
                else if(dPercent <= 75.0)   { aData[2][2]++; }
                else if(dPercent < 100.0)   { aData[2][3]++; }
                else                        { aData[2][4]++; }
            }
            for(int j = 0; j < mlTasksOverdue.size(); j++) {
                Map mTask = (Map)mlTasksOverdue.get(j);
                String sPercentComplete = (String)mTask.get(DomainObject.SELECT_PERCENTCOMPLETE);
                double dPercent = Task.parseToDouble(sPercentComplete);
                if(dPercent <= 25.0)        { aData[3][0]++; }
                else if(dPercent <= 50.0)   { aData[3][1]++; }
                else if(dPercent <= 75.0)   { aData[3][2]++; }
                else if(dPercent < 100.0)   { aData[3][3]++; }
                else                        { aData[3][4]++; }
            }

        }

        StringBuffer sbResult     = new StringBuffer();
        StringBuffer sbResult0025 = new StringBuffer();
        StringBuffer sbResult2550 = new StringBuffer();
        StringBuffer sbResult5075 = new StringBuffer();
        StringBuffer sbResult7599 = new StringBuffer();
        StringBuffer sbResult9900 = new StringBuffer();

        sbResult0025.append("color: '#").append(sColor025).append("', name: '< 25%',     data: [");
        sbResult2550.append("color: '#").append(sColor050).append("', name: '25-50%',    data: [");
        sbResult5075.append("color: '#").append(sColor075).append("', name: '50-75%',    data: [");
        sbResult7599.append("color: '#").append(sColor099).append("', name: '75-99%',    data: [");
        sbResult9900.append("color: '#").append(sColorOrange).append("', name: 'In Review', data: [");

        sbResult0025.append(aData[0][0]).append(",").append(aData[1][0]).append(",").append(aData[2][0]).append(",").append(aData[3][0]).append("]");
        sbResult2550.append(aData[0][1]).append(",").append(aData[1][1]).append(",").append(aData[2][1]).append(",").append(aData[3][1]).append("]");
        sbResult5075.append(aData[0][2]).append(",").append(aData[1][2]).append(",").append(aData[2][2]).append(",").append(aData[3][2]).append("]");
        sbResult7599.append(aData[0][3]).append(",").append(aData[1][3]).append(",").append(aData[2][3]).append(",").append(aData[3][3]).append("]");
        sbResult9900.append(aData[0][4]).append(",").append(aData[1][4]).append(",").append(aData[2][4]).append(",").append(aData[3][4]).append("]");

        sbResult.append(sbResult9900);
        sbResult.append("},{");
        sbResult.append(sbResult7599);
        sbResult.append("},{");
        sbResult.append(sbResult5075);
        sbResult.append("},{");
        sbResult.append(sbResult2550);
        sbResult.append("},{");
        sbResult.append(sbResult0025);

        return sbResult;

    }
    public StringBuffer getDataUsersTasksAssignedStart(Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        String sLanguage                        = (String) paramMap.get("languageStr");
        long lDiff                              = 172800000L;
        com.matrixone.apps.common.Person pUser  = new com.matrixone.apps.common.Person(sOID);
        String sAssignee                        = pUser.getInfo(context, DomainObject.SELECT_NAME);

        int[] aData = new int[4];
        for (int i = 0; i < 4; i++) { aData[i] = 0; }

        MapList mlTasks = new MapList();
        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", "", sAssignee);
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", "", sAssignee);
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask           = (Map)mlTasks.get(i);
            String sTarget      = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_START_DATE);
            String sActual      = (String)mTask.get(Task.SELECT_TASK_ACTUAL_START_DATE);
            Calendar cTarget    = Calendar.getInstance();

            cTarget.setTime(sdf.parse(sTarget));

            if(null == sActual || "".equals(sActual)) {

                Calendar cCurrent = Calendar.getInstance();
                if(cCurrent.after(cTarget)) {
                    aData[3]++;
                } else {
                    aData[0]++;
                }

            } else {

                Calendar cActual = Calendar.getInstance();
                cActual.setTime(sdf.parse(sActual));
                cActual.setTime(sdf.parse(sActual));
                long lTarget        = cTarget.getTimeInMillis();
                long lActual        = cActual.getTimeInMillis();

                if(cTarget.after(cActual)) {
                    if((lTarget - lActual) < lDiff) {
                        aData[2]++;
                    } else {
                        aData[1]++;
                    }
                } else {
                    if((lActual - lTarget) < lDiff) {
                        aData[2]++;
                    } else {
                        aData[3]++;
                    }
                }
            }
        }

        StringBuffer sbResult = new StringBuffer();
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.NotStarted", sLanguage)).append("', y:").append(aData[0]).append(", header:'AssignedTasksNotStarted'    , filter: 'Not Started'   },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Earlier", sLanguage)).append("', y:").append(aData[1]).append(", header:'AssignedTasksStartedEarly'  , filter: 'Early'         },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.OnTime", sLanguage)).append("', y:").append(aData[2]).append(", header:'AssignedTasksStartedOnTime' , filter: 'On Time'       },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Late", sLanguage)).append("', y:").append(aData[3]).append(", header:'AssignedTasksStartedLate'   , filter: 'Late'          } ");

        return sbResult;

    }
    public StringBuffer getDataUsersTasksAssignedFinish(Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        String sLanguage                            = (String) paramMap.get("languageStr");
        long lDiff                              = 172800000L;
        com.matrixone.apps.common.Person pUser  = new com.matrixone.apps.common.Person(sOID);
        String sAssignee                        = pUser.getInfo(context, DomainObject.SELECT_NAME);
        MapList mlTasks                         = new MapList();

        int[] aData = new int[4];
        for (int i = 0; i < 4; i++) { aData[i] = 0; }

        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", "", sAssignee);
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", "", sAssignee);
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask           = (Map)mlTasks.get(i);
            String sTarget      = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            String sActual      = (String)mTask.get(Task.SELECT_TASK_ACTUAL_FINISH_DATE);
            Calendar cTarget    = Calendar.getInstance();

            cTarget.setTime(sdf.parse(sTarget));

            if(null == sActual || "".equals(sActual)) {

                Calendar cCurrent = Calendar.getInstance();
                if(cCurrent.after(cTarget)) {
                    aData[3]++;
                } else {
                    aData[0]++;
                }

            } else {

                Calendar cActual = Calendar.getInstance();
                cActual.setTime(sdf.parse(sActual));
                long lTarget    = cTarget.getTimeInMillis();
                long lActual    = cActual.getTimeInMillis();

                if(cTarget.after(cActual)) {
                    if((lTarget - lActual) <= lDiff) { aData[2]++;
                    } else { aData[1]++; }
                } else {
                    if((lActual - lTarget) <= lDiff) { aData[2]++;
                    } else { aData[3]++; }
                }
            }
        }

        StringBuffer sbResult = new StringBuffer();
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.NotFinished", sLanguage)).append("', y:").append(aData[0]).append(", header:'AssignedTasksNotFinished'    , filter: 'Not Finished'  },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.Earlier", sLanguage)).append("', y:").append(aData[1]).append(", header:'AssignedTasksFinishedEarly'  , filter: 'Early'         },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.OnTime", sLanguage)).append("', y:").append(aData[2]).append(", header:'AssignedTasksFinishedOnTime' , filter: 'On Time'       },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Late", sLanguage)).append("', y:").append(aData[3]).append(", header:'AssignedTasksFinishedLate'   , filter: 'Late'          } ");

        return sbResult;

    }
    public StringBuffer getDataUsersTasksAssignedDuration(Context context, String[] args) throws Exception {


        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("parentOID");
        String sLanguage                            = (String) paramMap.get("languageStr");
        com.matrixone.apps.common.Person pUser  = new com.matrixone.apps.common.Person(sOID);
        String sAssignee                        = pUser.getInfo(context, DomainObject.SELECT_NAME);
        MapList mlTasks                         = new MapList();

        int[] aData = new int[5];
        for (int i = 0; i < 5; i++) { aData[i] = 0; }

        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", "", sAssignee);
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", "", sAssignee);
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask       = (Map)mlTasks.get(i);
            String sTarget  = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_DURATION);
            String sActual  = (String)mTask.get(Task.SELECT_TASK_ACTUAL_DURATION);
            String sFinish  = (String)mTask.get(Task.SELECT_TASK_ACTUAL_FINISH_DATE);

            if(null != sFinish && !"".equals(sFinish)) {

                double dTarget  = Task.parseToDouble(sTarget);
                double dActual  = Task.parseToDouble(sActual);
                double dDev     = dTarget - dActual;

                if(dDev > 3.0) { aData[0]++; }
                else if(dDev > 1.0) { aData[1]++; }
                else if(dDev > -1.0) { aData[2]++; }
                else if(dDev > -3.0) { aData[3]++; }
                else { aData[4]++; }
            }
        }

        StringBuffer sbResult = new StringBuffer();

        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MuchLess" , sLanguage)).append("', y:").append(aData[0]).append(", header:'AssignedTasksDurationMuchLess'  , filter: 'Much Less'   },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.3DaysLess", sLanguage)).append("', y:").append(aData[1]).append(", header:'AssignedTasksDuration3DaysLess' , filter: '3 Days Less' },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.AsPlanned", sLanguage)).append("', y:").append(aData[2]).append(", header:'AssignedTasksDurationAsPlanned' , filter: 'As Planned'  },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.3DaysMore", sLanguage)).append("', y:").append(aData[3]).append(", header:'AssignedTasksDuration3DaysMore' , filter: '3 Days More' },");
        sbResult.append("{ name:'").append(EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.String.MuchMore" , sLanguage)).append("', y:").append(aData[4]).append(", header:'AssignedTasksDurationMuchMore'  , filter: 'Much More'   } ");

        return sbResult;

    }
    public static Boolean checkAssignmentCapabilities(Context context, String[] args) throws Exception {

        HashMap requestMap  = (HashMap) JPO.unpackArgs(args);
        String sShow        = (String)requestMap.get("showAssignmentColumn");

        if(null != sShow) {
            if(sShow.equalsIgnoreCase("TRUE")) {
               return true;
            }
        }

        return false;
    }
    public List dynamicColumnsTaskAssignment(Context context, String[] args) throws Exception {


        Map paramMap        = (Map) JPO.unpackArgs(args);
        HashMap requestMap  = (HashMap) paramMap.get("requestMap");
        String sOIDPerson   = (String)requestMap.get("parentOID");
        MapList mlResult    = new MapList();
        Map mColumn         = new HashMap();
        HashMap settingsMap = new HashMap();

        settingsMap.put("Column Type", "programHTMLOutput");
        settingsMap.put("program", "emxProgramUI");
        settingsMap.put("function", "columnTaskAssignment");
        settingsMap.put("personId", sOIDPerson);
        settingsMap.put("Sortable", "false");
        settingsMap.put("Registered Suite", "ProgramCentral");

        mColumn.put(DomainObject.SELECT_NAME, sOIDPerson);
        mColumn.put("label", "emxProgramCentral.String.Assignment");
        mColumn.put("expression", DomainObject.SELECT_ID);
        mColumn.put("select", DomainObject.SELECT_ID);
        mColumn.put("settings", settingsMap);

        mlResult.add(mColumn);

        return mlResult;

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getsUsersAssignedTasksPending(Context context, String[] args) throws Exception {


        MapList mlResult                        = new MapList();
        MapList mlProjects                      = new MapList();
        HashMap paramMap                        = (HashMap) JPO.unpackArgs(args);
        String sOID                             = (String) paramMap.get("objectId");
        String sParentOID                       = (String) paramMap.get("rootOID");
        String sMode                            = (String) paramMap.get("mode");
        com.matrixone.apps.common.Person pUser  = new com.matrixone.apps.common.Person(sOID);
        String sAssignee                        = pUser.getInfo(context, DomainObject.SELECT_NAME);

        if(null == sParentOID || "".equals(sParentOID)) {
            mlProjects = getActiveProjects(context);
        } else {
            Map mObject = new HashMap();
            mObject.put(DomainObject.SELECT_ID, sParentOID);
            mlProjects.add(mObject);
        }

        if (mlProjects.size() > 0) {
            for (int i = 0; i < mlProjects.size(); i++) {
                Map mProject        = (Map) mlProjects.get(i);
                String sOIDProject  = (String) mProject.get(DomainObject.SELECT_ID);
                MapList mlTasks     = retrieveTasksOfProgramOrProject(context, sOIDProject, sMode, "", sAssignee);
                mlResult.addAll(mlTasks);
            }
        }

        return mlResult;

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getUsersTasksNotAssigned(Context context, String[] args) throws Exception {

        MapList mlResult    = new MapList();
        MapList mlTasksAll  = new MapList();
        MapList mlProjects  = new MapList();
        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sParentOID   = (String) paramMap.get("rootOID");

        if(null == sParentOID || "".equals(sParentOID)) {
            mlProjects = getActiveProjects(context);
        } else {
            Map mObject = new HashMap();
            mObject.put(DomainObject.SELECT_ID, sParentOID);
            mlProjects.add(mObject);
        }

        MapList mlTasks = new MapList();
        if (mlProjects.size() > 0) {
            for (int i = 0; i < mlProjects.size(); i++) {
                Map mProject        = (Map) mlProjects.get(i);
                String sOIDProject  = (String) mProject.get(DomainObject.SELECT_ID);
                mlTasks     = retrieveTasksOfProgramOrProject(context, sOIDProject, "All", context.getUser(), "");
                mlTasksAll.addAll(mlTasks);
            }
        }

        if(mlTasksAll.size() > 0) {
            for(int i = 0; i < mlTasksAll.size(); i++) {
                Map mResult = (Map)mlTasksAll.get(i);
                String sIsAssigned = (String)mResult.get(SELECT_RELATIONSHIP_ASSIGNED_TASKS);
                if(sIsAssigned.equalsIgnoreCase("FALSE")) {
                    mlResult.add(mResult);
                }
            }
        }

        return mlResult;

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getUsersTasksAllOwned(Context context, String[] args) throws Exception {

        MapList mlResult    = new MapList();
        MapList mlProjects  = new MapList();
        HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sParentOID   = (String) paramMap.get("rootOID");

        if(null == sParentOID || "".equals(sParentOID)) {
            mlProjects = getActiveProjects(context);
        } else {
            Map mObject = new HashMap();
            mObject.put(DomainObject.SELECT_ID, sParentOID);
            mlProjects.add(mObject);
        }

        MapList mlTasks = new MapList();
        if (mlProjects.size() > 0) {
            for (int i = 0; i < mlProjects.size(); i++) {
                Map mProject        = (Map) mlProjects.get(i);
                String sOIDProject  = (String) mProject.get(DomainObject.SELECT_ID);
                mlTasks     = retrieveTasksOfProgramOrProject(context, sOIDProject, "All", context.getUser(), "");
                mlResult.addAll(mlTasks);
            }
        }

        return mlResult;

    }
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getUsersTasksDetails(Context context, String[] args) throws Exception {


    	MapList mlResults = new MapList();
        /*HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
        String sOID         = (String) paramMap.get("personId");
        String sParentOID   = (String) paramMap.get("parentOID");
        String sMode        = (String) paramMap.get("mode");
        String sSource      = (String) paramMap.get("source");


        if(sMode.equals("Duration|Much Less"))              {mlResults = retrieveUsersOwnedTasksOfDuration(context, sOID, sParentOID, sSource, 0); }
        else if(sMode.equals("Duration|3 Days Less"))       {mlResults = retrieveUsersOwnedTasksOfDuration(context, sOID, sParentOID, sSource, 1); }
        else if(sMode.equals("Duration|As Planned"))        {mlResults = retrieveUsersOwnedTasksOfDuration(context, sOID, sParentOID, sSource, 2); }
        else if(sMode.equals("Duration|3 Days More"))       {mlResults = retrieveUsersOwnedTasksOfDuration(context, sOID, sParentOID, sSource, 3); }
        else if(sMode.equals("Duration|Much More"))         {mlResults = retrieveUsersOwnedTasksOfDuration(context, sOID, sParentOID, sSource, 4); }
        else if(sMode.equals("Finish|Not Finished"))        {mlResults = retrieveUsersOwnedTasksOfFinishDate(context, sOID, sParentOID, sSource, 0); }
        else if(sMode.equals("Finish|Early"))               {mlResults = retrieveUsersOwnedTasksOfFinishDate(context, sOID, sParentOID, sSource, 1); }
        else if(sMode.equals("Finish|On Time"))             {mlResults = retrieveUsersOwnedTasksOfFinishDate(context, sOID, sParentOID, sSource, 2); }
        else if(sMode.equals("Finish|Late"))                {mlResults = retrieveUsersOwnedTasksOfFinishDate(context, sOID, sParentOID, sSource, 3); }
        else if(sMode.equals("Start|Not Started"))          {mlResults = retrieveUsersOwnedTasksOfStartDate(context, sOID, sParentOID, sSource, 0); }
        else if(sMode.equals("Start|Early"))                {mlResults = retrieveUsersOwnedTasksOfStartDate(context, sOID, sParentOID, sSource, 1); }
        else if(sMode.equals("Start|On Time"))              {mlResults = retrieveUsersOwnedTasksOfStartDate(context, sOID, sParentOID, sSource, 2); }
        else if(sMode.equals("Start|Late"))                 {mlResults = retrieveUsersOwnedTasksOfStartDate(context, sOID, sParentOID, sSource, 3); }*/

        return mlResults;
    }
    public MapList retrieveUsersOwnedTasksOfStartDate(Context context, String sOID, String sParentOID, String sSource, int iMode) throws Exception {

    	return new MapList();
        /*com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        MapList mlTasks                         = new MapList();
        MapList mlResults                       = new MapList();
        String sOwner                           = "";
        String sAssignee                        = "";

        if(sSource.equals(DomainObject.SELECT_OWNER)) {
            sOwner = pOwner.getInfo(context, DomainObject.SELECT_NAME);
        } else {
            sAssignee = pOwner.getInfo(context, DomainObject.SELECT_NAME);
        }

        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", sOwner, sAssignee);
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", sOwner, sAssignee);
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask           = (Map)mlTasks.get(i);
            String sTarget      = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_START_DATE);
            String sActual      = (String)mTask.get(Task.SELECT_TASK_ACTUAL_START_DATE);
            Calendar cTarget    = Calendar.getInstance();
            int iResult         = 10;

            cTarget.setTime(sdf.parse(sTarget));

            if(null == sActual || "".equals(sActual)) {

                Calendar cCurrent = Calendar.getInstance();
                if(cCurrent.after(cTarget)) {
                    iResult = 3;
                } else {
                    iResult = 0;
                }

            } else {

                Calendar cActual = Calendar.getInstance();
                cActual.setTime(sdf.parse(sActual));

                if(cActual.after(cTarget)) {
                    iResult = 3;
                } else {

                    iResult = 1;

                    int iYear = cActual.get(Calendar.YEAR);
                    int iWeek = cActual.get(Calendar.DAY_OF_WEEK);
                    int iDay = cActual.get(Calendar.DAY_OF_MONTH);
                    if(iDay == cActual.get(Calendar.DAY_OF_MONTH)) {
                        if(iWeek == cActual.get(Calendar.DAY_OF_WEEK)) {
                            if(iYear == cActual.get(Calendar.YEAR)) {
                                iResult = 2;
                            }
                        }
                    }
                }

            }

            if(iResult == iMode) {
                mlResults.add(mTask);
            }

        }

        return mlResults;*/

    }
    public MapList retrieveUsersOwnedTasksOfFinishDate(Context context, String sOID, String sParentOID, String sSource, int iMode) throws Exception {

    	return new MapList();
        /*long lDiff                              = 172800000L;
        com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        MapList mlTasks                         = new MapList();
        MapList mlResults                       = new MapList();
        String sOwner                           = "";
        String sAssignee                        = "";

        if(sSource.equals(DomainObject.SELECT_OWNER)) {
            sOwner = pOwner.getInfo(context, DomainObject.SELECT_NAME);
        } else {
            sAssignee = pOwner.getInfo(context, DomainObject.SELECT_NAME);
        }


        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", sOwner, sAssignee);
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", sOwner, sAssignee);
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask           = (Map)mlTasks.get(i);
            String sTarget      = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
            String sActual      = (String)mTask.get(Task.SELECT_TASK_ACTUAL_FINISH_DATE);
            Calendar cTarget    = Calendar.getInstance();
            int iResult         = 10;

            cTarget.setTime(sdf.parse(sTarget));

            if(null == sActual || "".equals(sActual)) {

                Calendar cCurrent = Calendar.getInstance();
                if(cCurrent.after(cTarget)) {
                    iResult = 3;
                } else {
                    iResult = 0;
                }

            } else {

                Calendar cActual = Calendar.getInstance();
                cActual.setTime(sdf.parse(sActual));
                long lTarget        = cTarget.getTimeInMillis();
                long lActual        = cActual.getTimeInMillis();
                if(cTarget.after(cActual)) {
                    if((lTarget - lActual) < lDiff) {
                        iResult = 2;
                    } else {
                        iResult = 1;
                    }
                } else {
                    if((lActual - lTarget) < lDiff) {
                        iResult = 2;
                    } else {
                        iResult = 3;
                    }
                }
            }

            if(iResult == iMode) {
                mlResults.add(mTask);
            }

        }

        return mlResults;*/

    }
    public MapList retrieveUsersOwnedTasksOfDuration(Context context, String sOID, String sParentOID, String sSource, int iMode) throws Exception {

    	return new MapList();
        /*com.matrixone.apps.common.Person pOwner = new com.matrixone.apps.common.Person(sOID);
        MapList mlTasks                         = new MapList();
        MapList mlResults                       = new MapList();
        String sOwner                           = "";
        String sAssignee                        = "";

        if(sSource.equals(DomainObject.SELECT_OWNER)) {
            sOwner = pOwner.getInfo(context, DomainObject.SELECT_NAME);
        } else {
            sAssignee = pOwner.getInfo(context, DomainObject.SELECT_NAME);
        }


        if(null == sParentOID || "".equals(sParentOID)) {
            MapList mlProjects = getActiveProjects(context);
            for(int i = 0; i < mlProjects.size(); i++) {
                Map mProject = (Map)mlProjects.get(i);
                String sOIDProject = (String)mProject.get(DomainObject.SELECT_ID);
                MapList mlTasksProject = retrieveTasksOfProgramOrProject(context, sOIDProject, "", sOwner, sAssignee);
                mlTasks.addAll(mlTasksProject);
            }
        } else {
            mlTasks = retrieveTasksOfProgramOrProject(context, sParentOID, "", sOwner, sAssignee);
        }

        for(int i = 0; i < mlTasks.size(); i++) {

            Map mTask       = (Map)mlTasks.get(i);
            String sTarget  = (String)mTask.get(Task.SELECT_TASK_ESTIMATED_DURATION);
            String sActual  = (String)mTask.get(Task.SELECT_TASK_ACTUAL_DURATION);
            String sFinish  = (String)mTask.get(Task.SELECT_TASK_ACTUAL_FINISH_DATE);
            int iResult     = 10;

            if(null != sFinish && !"".equals(sFinish)) {

                double dTarget  = Task.parseToDouble(sTarget);
                double dActual  = Task.parseToDouble(sActual);
                double dDev     = dTarget - dActual;

                if(dDev > 3.0)      { iResult = 0; }
                else if(dDev > 1.0) { iResult = 1; }
                else if(dDev > -1.0){ iResult = 2; }
                else if(dDev > -3.0){ iResult = 3; }
                else                { iResult = 4; }
            }

            if(iMode == iResult) {
                mlResults.add(mTask);
            }
        }

        return mlResults;*/

    }

    private static String COLUMN_MAP  = "columnMap";
    private static String FIELD_MAP   = "fieldMap";
    private static String OBJECT_LIST = "objectList";
    private static String PARAM_LIST  = "paramList";
    private static String PARAM_MAP   = "paramMap";
    private static String LANGUAGE_STR = "languageStr";
    private static String SETTINGS     = "settings";

    /**
     * Prepare the field for drag-and-drop operations. Reference columnDropZone and BPS API
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
   /* private String fieldDropZoneFile(Context context, String[] args) throws Exception
    {
        StringList dropIconList = new StringList();
        ${CLASS:emxGenericColumns} genericColumn = new ${CLASS:emxGenericColumns}(context,args);
        Vector columnIconList = genericColumn.columnDropZone(context, args);

        Map programMap      = (HashMap) JPO.unpackArgs(args);
        MapList objectList  = (MapList)programMap.get("objectList");
        int objectListSize = objectList.size();
        boolean needDBCall = false;

        if(objectList != null && objectListSize>0){

        String[] objectIdArray = new String[objectListSize];
        for (int i=0; i<objectListSize; i++) {
            Map objectMap = (Map) objectList.get(i);
            String objectId = (String)objectMap.get(DomainObject.SELECT_ID);
            objectIdArray[i] = objectId;

                String is_Project = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                String is_ProjectConcept = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
                String is_WorkspaceVault = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
                String hasModifyAccess = (String)objectMap.get("current.access[modify]");
                String hasfromconnectAccess = (String)objectMap.get("current.access[fromconnect]");
                String hasToconnectAccess = (String)objectMap.get("current.access[toconnect]");
                String is_ControlledFolder = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
                String current = (String)objectMap.get(ProgramCentralConstants.SELECT_CURRENT);

                if(is_Project==null || is_WorkspaceVault==null || hasModifyAccess==null || hasfromconnectAccess==null || hasToconnectAccess==null
                    || is_ControlledFolder==null || current==null || is_ProjectConcept==null){
                    needDBCall = true;
                }
            }

            MapList objectInfoList = new MapList();
            if(needDBCall){
                StringList busSelect = new StringList(5);
                busSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                busSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
                busSelect.addElement(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
                busSelect.addElement("current.access[modify]");
                busSelect.addElement("current.access[fromconnect]");
                busSelect.addElement("current.access[toconnect]");
                busSelect.addElement(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
                busSelect.addElement(ProgramCentralConstants.SELECT_CURRENT);

                //objectInfoList = DomainObject.getInfo(context, objectIdArray, busSelect);
                BusinessObjectWithSelectList objectWithSelectList = null;

                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objectIdArray, busSelect);

                for (int i=0, bsize = objectWithSelectList.size(); i <bsize ; i++) {
                    BusinessObjectWithSelect objectWithSelect = objectWithSelectList.getElement(i);

                    Map mapTask = new HashMap();
                    for (int j=0, busSelectSize = busSelect.size(); j <busSelectSize ; j++) {
                        String strSelectable = (String)busSelect.get(j);
                        mapTask.put(strSelectable, objectWithSelect.getSelectData(strSelectable));
                    }
                    objectInfoList.add(mapTask);
                }
            }

            for(int i=0;i<objectListSize;i++){
                Map objectMap = (Map)objectList.get(i);
                if(needDBCall){
                    Map objectInfoMap = (Map)objectInfoList.get(i);
                    objectMap.putAll(objectInfoMap);
                }
                String dropIcon = (String)columnIconList.get(i);

                String isProject = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                String isProjectConcept =(String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
                String isWorkspaceVault = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
                String modify = (String)objectMap.get("current.access[modify]");
                String fromconnect = (String)objectMap.get("current.access[fromconnect]");
                String toconnect = (String)objectMap.get("current.access[toconnect]");
                String isControlledFolder = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
                String currentState = (String)objectMap.get(ProgramCentralConstants.SELECT_CURRENT);

                boolean showDropIcon = false;
                if("TRUE".equalsIgnoreCase(modify) && "TRUE".equalsIgnoreCase(fromconnect) && "TRUE".equalsIgnoreCase(toconnect)){
                    showDropIcon = true;
                }

                // if(("true".equalsIgnoreCase(isWorkspaceVault) &&!(Boolean.parseBoolean(isControlledFolder)&&"Release".equalsIgnoreCase(currentState)))|| "true".equalsIgnoreCase(isProject)|| "true".equalsIgnoreCase(isProjectConcept))
                if (true)
                {

                    if(showDropIcon){
                        dropIconList.addElement(dropIcon);
                    }else{
                        dropIconList.addElement(ProgramCentralConstants.EMPTY_STRING);
                    }

                }else{
                    dropIconList.addElement(ProgramCentralConstants.EMPTY_STRING);
                }
            }
        }
        return dropIconList.toString();
    }*/

    private String fieldDropZone(Context context, String mode, String[] args) throws Exception
    {
        StringList dropIconList = new StringList();
        emxGenericColumns_mxJPO genericColumn = new emxGenericColumns_mxJPO(context,args);
        Vector columnIconList = genericColumn.columnDropZone(context, args);

        Map programMap      = (HashMap) JPO.unpackArgs(args);
        MapList objectList  = (MapList)programMap.get("objectList");
        int objectListSize = objectList.size();
        boolean needDBCall = false;

        if(objectList != null && objectListSize>0){

        String[] objectIdArray = new String[objectListSize];
        for (int i=0; i<objectListSize; i++) {
            Map objectMap = (Map) objectList.get(i);
            String objectId = (String)objectMap.get(DomainObject.SELECT_ID);
            objectIdArray[i] = objectId;

                String is_Project = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                String is_ProjectConcept = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
                String is_WorkspaceVault = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
                String hasModifyAccess = (String)objectMap.get("current.access[modify]");
                String hasfromconnectAccess = (String)objectMap.get("current.access[fromconnect]");
                String hasToconnectAccess = (String)objectMap.get("current.access[toconnect]");
                String is_ControlledFolder = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
                String current = (String)objectMap.get(ProgramCentralConstants.SELECT_CURRENT);

                if(is_Project==null || is_WorkspaceVault==null || hasModifyAccess==null || hasfromconnectAccess==null || hasToconnectAccess==null
                    || is_ControlledFolder==null || current==null || is_ProjectConcept==null){
                    needDBCall = true;
                }
            }

            MapList objectInfoList = new MapList();
            if(needDBCall){
                StringList busSelect = new StringList(5);
                busSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                busSelect.addElement(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
                busSelect.addElement(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
                busSelect.addElement("current.access[modify]");
                busSelect.addElement("current.access[fromconnect]");
                busSelect.addElement("current.access[toconnect]");
                busSelect.addElement(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
                busSelect.addElement(ProgramCentralConstants.SELECT_CURRENT);

                //objectInfoList = DomainObject.getInfo(context, objectIdArray, busSelect);
                BusinessObjectWithSelectList objectWithSelectList = null;

                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objectIdArray, busSelect);

                for (int i=0, bsize = objectWithSelectList.size(); i <bsize ; i++) {
                    BusinessObjectWithSelect objectWithSelect = objectWithSelectList.getElement(i);

                    Map mapTask = new HashMap();
                    for (int j=0, busSelectSize = busSelect.size(); j <busSelectSize ; j++) {
                        String strSelectable = (String)busSelect.get(j);
                        mapTask.put(strSelectable, objectWithSelect.getSelectData(strSelectable));
                    }
                    objectInfoList.add(mapTask);
                }
            }

            for(int i=0;i<objectListSize;i++){
                Map objectMap = (Map)objectList.get(i);
                if(needDBCall){
                    Map objectInfoMap = (Map)objectInfoList.get(i);
                    objectMap.putAll(objectInfoMap);
                }
                String dropIcon = (String)columnIconList.get(i);

                String isProject = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
                String isProjectConcept =(String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
                String isWorkspaceVault = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
                String modify = (String)objectMap.get("current.access[modify]");
                String fromconnect = (String)objectMap.get("current.access[fromconnect]");
                String toconnect = (String)objectMap.get("current.access[toconnect]");
                String isControlledFolder = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
                String currentState = (String)objectMap.get(ProgramCentralConstants.SELECT_CURRENT);

                boolean showDropIcon = false;
                if("TRUE".equalsIgnoreCase(modify) && "TRUE".equalsIgnoreCase(fromconnect) && "TRUE".equalsIgnoreCase(toconnect)){
                    showDropIcon = true;
                }

                // if(("true".equalsIgnoreCase(isWorkspaceVault) &&!(Boolean.parseBoolean(isControlledFolder)&&"Release".equalsIgnoreCase(currentState)))|| "true".equalsIgnoreCase(isProject)|| "true".equalsIgnoreCase(isProjectConcept))
                if (true)
                {

                    if(showDropIcon){
                        dropIconList.addElement(dropIcon);
                    	if ("json".equalsIgnoreCase(mode)) {
                        StringBuilder sbResult = new StringBuilder();
                    		//sbResult.append("<form id='").append(sFormId).append("' action=\"../common/emxFileUpload.jsp?objectId=").append(sOID).append("&amp;relationship=").append(sFileDropRelationship).append("&amp;type=").append(sFileDropType).append("\"  method='post'  enctype='multipart/form-data'>").append("   <div id='").append(sDivId).append("' class='dropAreaColumn'").append("        ondrop=\"FileSelectHandlerColumn(event, ").append("'").append(sOID).append("', ").append("'").append(sFormId).append("', ").append("'").append(sDivId).append("', ").append("'id[level]=").append(sLevel).append(".").append(sAction).append("', ").append("'").append(sLevel).append("', ").append("'").append(sParentOID).append("', ").append("'").append(sType).append("', ").append("'").append(sbTypes.toString()).append("', ").append("'").append(sbRelationships.toString()).append("', ").append("'").append(sbAttributes.toString()).append("', ").append("'").append(sbFrom.toString()).append("', ").append("'").append(sStructureTypes).append("', ").append("'").append(validator).append("')\" ").append("    ondragover=\"FileDragHoverColumn(event, '").append(sDivId).append("')\" ").append("   ondragleave=\"FileDragHoverColumn(event, '").append(sDivId).append("')\">").append("   </div>").append("</form>");
                        sbResult.append("<link rel=\"stylesheet\" href=\"../common/styles/emxUIExtendedHeader.css\">");
                        sbResult.append("<script src=\"../common/scripts/emxUIFreezePane.js\"></script>");
                        sbResult.append("<script src=\"../common/scripts/emxExtendedPageHeaderFreezePaneValidation.js\"></script>");
                        sbResult.append("<form id=\"formDrag00,0\" action=\"../common/emxFileUpload.jsp?objectId=54066.29826.4358.41091&amp;relationship=Task Deliverable&amp;type=Document\" method=\"post\" enctype=\"multipart/form-data\">");
                        sbResult.append("<div id=\"divDrag00,0\" class=\"dropArea\" ondrop=\"FileSelectHandler(event, '54066.29826.4358.41091', 'formDrag00,0', 'divDrag00,0', 'id[level]=0,0.refreshRow', '0,0', '54066.29826.4358.41091', 'Task', 'DOCUMENTS', 'Vaulted Documents Rev2', '', 'from', 'Workspace Vault', 'isValidDnDOperation',dropArea')\" ondragover=\"FileDragHover(event, 'divDrag00,0')\" ondragleave=\"FileDragHover(event, 'divDrag00,0')\">");
                        sbResult.append("XXXXXXXXXXXXX");
                        sbResult.append("</div>");
                        sbResult.append("</form>");
                    		
                        dropIconList.addElement(sbResult.toString());
                    	}
                    		

                    }else{
                        dropIconList.addElement(ProgramCentralConstants.EMPTY_STRING);
                    }

                }else{
                    dropIconList.addElement(ProgramCentralConstants.EMPTY_STRING);
                }
            }
        }
        return dropIconList.toString();
    }

    private static String ID_LEVEL = "id[level]";

    /**
     *
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public  String fieldDropZone(Context context, String[] args) throws Exception
    {
        String dropIcon = new String();

        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap  = (HashMap) programMap.get(PARAM_MAP);
        String sParentOID  = (String) paramMap.get("objectId");
        MapList mlObjects = (MapList) programMap.get(OBJECT_LIST);
        HashMap fieldMap  = (HashMap) programMap.get(FIELD_MAP);
        HashMap settings  = (HashMap) fieldMap.get(SETTINGS);

        // Use the current object
        if (mlObjects == null || mlObjects.isEmpty()) {
            mlObjects = new MapList();
            HashMap mapObject = new HashMap();
            mapObject.put(DomainObject.SELECT_ID, sParentOID);
            mapObject.put(ID_LEVEL,"0");
            mlObjects.add(mapObject);
        }

        String sDropMode = (String) settings.get("Drop Mode");

        // reclassify this to look like a column entry
        programMap.put(PARAM_LIST, paramMap);
        programMap.put(COLUMN_MAP, fieldMap);
        programMap.put(OBJECT_LIST, mlObjects);
        String[] args2 = JPO.packArgs(programMap);

        /*if ("file".equalsIgnoreCase(sDropMode)) {
            dropIcon =  fieldDropZoneFile(context, args2);
        } else if ( "json".equalsIgnoreCase(sDropMode)){*/
            dropIcon = fieldDropZone(context, sDropMode,  args2);
        //}

        return dropIcon;

     }



    /**
     * It gives Task deliverables in order of their latest modification.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @return Task deliverables list
     * @throws Exception if operation fails
     */
    public Vector getTasksDeliverables(Context context, String[] args) throws Exception
    {
		long start 			= System.currentTimeMillis();
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
        HashMap paramList = (HashMap) programMap.get("paramList");
        HashMap columnMap = (HashMap) programMap.get("columnMap");
        HashMap settings = (HashMap) columnMap.get("settings");
        String sMaxItems = (String)settings.get("Max Items");
        String sIsHyperlink = (String)settings.get("isHyperlink");

        int iMaxItems = Integer.parseInt(sMaxItems);
    	String strLanguage = context.getSession().getLanguage();
    	String sErrMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Deliverable.CannotOpenPhysicalProduct", strLanguage);
    	String sRevisionMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.ToolTip.HigherRevExists", strLanguage);

    	int size 		= objectList.size();
    	Vector vResult 	= new Vector(size);

    	Map<String,StringList> derivativeMap =
    			ProgramCentralUtil.getDerivativeTypeListFromUtilCache(context,DomainObject.TYPE_TASK_MANAGEMENT,ProgramCentralConstants.TYPE_MILESTONE,ProgramCentralConstants.TYPE_PROJECT_SPACE, ProgramCentralConstants.TYPE_PROJECT_CONCEPT, ProgramCentralConstants.TYPE_PROJECT_TEMPLATE);

    	StringList slTaskSubTypes = derivativeMap.get(DomainObject.TYPE_TASK_MANAGEMENT);
        //slTaskSubTypes.remove(ProgramCentralConstants.TYPE_MILESTONE);

    	StringList mileStoneSubtypeList = derivativeMap.get(ProgramCentralConstants.TYPE_MILESTONE);
        //slTaskSubTypes.removeAll(mileStoneSubtypeList);

        StringList subTypeList = new StringList();
        subTypeList.addAll(derivativeMap.get(ProgramCentralConstants.TYPE_PROJECT_SPACE));
        subTypeList.addAll(derivativeMap.get(ProgramCentralConstants.TYPE_PROJECT_CONCEPT));
        subTypeList.addAll(derivativeMap.get(ProgramCentralConstants.TYPE_PROJECT_TEMPLATE));
         
        String SELECT_DELIVERABLE_TYPE_IS_KINDOF_WORKSPACE = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to."+ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT;
        String SELECT_DELIVERABLE_TYPE_IS_KINDOF_CONTROLLEDFODLER = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to."+ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER;
        
    	StringList busSelects = new StringList(10);
        busSelects.add(ProgramCentralConstants.SELECT_TYPE);
    	busSelects.add(DomainObject.SELECT_ID);
        //busSelects.add(ProgramCentralConstants.SELECT_POLICY);
    	busSelects.add(ProgramCentralConstants.SELECT_DELIVERABLE_ID);
    	busSelects.add(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE);
    	busSelects.add(ProgramCentralConstants.SELECT_DELIVERABLE_NAME);
    	busSelects.add(ProgramCentralConstants.SELECT_DELIVERABLE_REVISION);
    	busSelects.add(ProgramCentralConstants.SELECT_DELIVERABLE_MODIFIED_DATE); //Document sort key
        busSelects.add(ProgramCentralConstants.SELECT_DELIVERABLE_LINK_URL);
        busSelects.add(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE_IS_KINDOF_DOCUMENT);
        busSelects.add(ProgramCentralConstants.SELECT_DELIVERABLE_LAST_REVISION);
        busSelects.add(SELECT_DELIVERABLE_TYPE_IS_KINDOF_WORKSPACE);
        busSelects.add(SELECT_DELIVERABLE_TYPE_IS_KINDOF_CONTROLLEDFODLER);
        String SELECT_PARENT_TYPE = "from[Task Deliverable].to.to[Data Vaults].from.type";
        busSelects.add(SELECT_PARENT_TYPE);
        String SELECT_DELIVERABLE_TITLE = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to."+ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE;
        busSelects.add(SELECT_DELIVERABLE_TITLE);

        String ReqSpecType = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_type_SoftwareRequirementSpecification);
        String SELECT_IS_REQUIREMENT_SPECIFICATION  = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to.type.kindof["+ReqSpecType+"]";
        busSelects.add(SELECT_IS_REQUIREMENT_SPECIFICATION);
        String SELECT_DELIVERABLE_IS_LAST_REVISION = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to.attribute[PLMReference.V_isLastVersion]";
        String SELECT_DELIVERABLE_VERSION_ID = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to.attribute[PLMReference.V_VersionID]";
        String SELECT_DELIVERABLE_IS_VPLMReference = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to.type.kindof[VPMReference]";
        busSelects.add(SELECT_DELIVERABLE_IS_LAST_REVISION);
    	busSelects.add(SELECT_DELIVERABLE_VERSION_ID);
		busSelects.add(SELECT_DELIVERABLE_IS_VPLMReference);
		busSelects.add("from[" + ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE + "].to.format[generic].hasfile");

		String SELECT_IS_REQUIREMENT  = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to.type.kindof["+ProgramCentralConstants.TYPE_REQUIREMENT+"]";
		busSelects.add(SELECT_IS_REQUIREMENT);
		String SELECT_DELIVERABLE_MAJORID  = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to.majorid";
		busSelects.add(SELECT_DELIVERABLE_MAJORID);
		String SELECT_DELIVERABLE_LAST_MAJORID  = "from["+ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE+"].to.majorid.lastmajorid";
		busSelects.add(SELECT_DELIVERABLE_LAST_MAJORID);
		
		String SELECT_IS_TASK_BASELINE = "to["+ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_KEY+"].from.from["+ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST+"].to.type.kindof[Project Baseline]";
		String SELECT_IS_TASK_EXPERIMENT = "to["+ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_KEY+"].from.from["+ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST+"].to.type.kindof["+ProgramCentralConstants.TYPE_EXPERIMENT+"]";
		busSelects.add(SELECT_IS_TASK_BASELINE);
		busSelects.add(SELECT_IS_TASK_EXPERIMENT);
    
        try {
    		String[] sObjIdArr = new String[size];
    		for (int i = 0; i < size; i++) {
    			Map objectMap = (Map) objectList.get(i);
            	sObjIdArr[i] = (String) objectMap.get(ProgramCentralConstants.SELECT_ID);
    		}

    		BusinessObjectWithSelectList bwsl = ProgramCentralUtil.getObjectWithSelectList(context, sObjIdArr, busSelects);
    		for (int i = 0; i < size; i++) {

                StringBuilder sbResult = new StringBuilder();
                Map objectMap = (Map) objectList.get(i);
                boolean isPasteOperation = objectMap.containsKey("id[connection]") && ProgramCentralUtil.isNullString((String) objectMap.get("id[connection]"));
                

    			BusinessObjectWithSelect bws = bwsl.getElement(i);
    			String sOID    = bws.getSelectData(ProgramCentralConstants.SELECT_ID);
    			String sTaskType = bws.getSelectData(ProgramCentralConstants.SELECT_TYPE);

    			StringList slDeliverablesIdList 			= bws.getSelectDataList(ProgramCentralConstants.SELECT_DELIVERABLE_ID);
    			StringList slDeliverablesTypeList 			= bws.getSelectDataList(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE);
				StringList slDeliverablesIsKindOfDocument 			= bws.getSelectDataList(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE_IS_KINDOF_DOCUMENT);
    			StringList slDeliverablesNameList 			= bws.getSelectDataList(ProgramCentralConstants.SELECT_DELIVERABLE_NAME);
    			StringList slDeliverablesRevisionList 		= bws.getSelectDataList(ProgramCentralConstants.SELECT_DELIVERABLE_REVISION);
    			StringList slDeliverablesModifiedDateList 	= bws.getSelectDataList(ProgramCentralConstants.SELECT_DELIVERABLE_MODIFIED_DATE);
    			StringList slURLList                        = bws.getSelectDataList(ProgramCentralConstants.SELECT_DELIVERABLE_LINK_URL);
    			StringList slDeliverablesLastRevisionList 	= bws.getSelectDataList(ProgramCentralConstants.SELECT_DELIVERABLE_LAST_REVISION);
    			StringList slDeliverablesIsKindOdWorkspaceVault 	= bws.getSelectDataList(SELECT_DELIVERABLE_TYPE_IS_KINDOF_WORKSPACE);
    			StringList slDeliverablesIsKindOdControlledFolder 	= bws.getSelectDataList(SELECT_DELIVERABLE_TYPE_IS_KINDOF_CONTROLLEDFODLER);
    			StringList slDeliverablesIsKindOfReqSpec 	= bws.getSelectDataList(SELECT_IS_REQUIREMENT_SPECIFICATION);
    			StringList slDeliverablesFromType 	= bws.getSelectDataList(SELECT_PARENT_TYPE);
    			StringList slDeliverablesTitleList 			= bws.getSelectDataList(SELECT_DELIVERABLE_TITLE);
    			
    			StringList slLastVersionList 	= bws.getSelectDataList(SELECT_DELIVERABLE_IS_LAST_REVISION);
    			StringList slVersionIdList 	= bws.getSelectDataList(SELECT_DELIVERABLE_VERSION_ID);
    			StringList slDeliverablesIsKindOfVPMReference 	= bws.getSelectDataList(SELECT_DELIVERABLE_IS_VPLMReference);
    			
				StringList slHasFilesList = bws.getSelectDataList("from[" + ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE + "].to.format[generic].hasfile");

				StringList slDeliverablesIsKindOfRequirement 	= bws.getSelectDataList(SELECT_IS_REQUIREMENT);
				StringList slDeliverablesMajorIdList 	= bws.getSelectDataList(SELECT_DELIVERABLE_MAJORID);
				StringList slDeliverablesLastMajorIdList	= bws.getSelectDataList(SELECT_DELIVERABLE_LAST_MAJORID);
				
				String slDeliverablesIsKindOfBaseline = bws.getSelectData(SELECT_IS_TASK_BASELINE);
    			String slDeliverablesIsKindOfExperiment = bws.getSelectData(SELECT_IS_TASK_EXPERIMENT);
			
    			if(slTaskSubTypes.contains(sTaskType)
    					//&& !mileStoneSubtypeList.contains(sTaskType)
					) {

    				int iNoOfDeliverables = slDeliverablesIdList != null && !slDeliverablesIdList.isEmpty()?slDeliverablesIdList.size():0;
                  //Convert taskInfoMap to a MapList of all the deliverables.
                    MapList taskDeliverablesMapList = new MapList(iNoOfDeliverables);

                    for (int j = 0; j < iNoOfDeliverables; j++) {

                    	Map taskDeliverableMap = new HashMap();

    					taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_ID, slDeliverablesIdList.get(j));
    					taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE, slDeliverablesTypeList.get(j));
						taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE_IS_KINDOF_DOCUMENT, slDeliverablesIsKindOfDocument.get(j));
    					//taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_NAME, slDeliverablesNameList.get(j));
    					taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_REVISION, slDeliverablesRevisionList.get(j));
    					taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_MODIFIED_DATE, slDeliverablesModifiedDateList.get(j));
        				taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_LINK_URL, slURLList.get(j));
        				taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_LAST_REVISION, slDeliverablesLastRevisionList.get(j));
						taskDeliverableMap.put(SELECT_DELIVERABLE_TYPE_IS_KINDOF_WORKSPACE, slDeliverablesIsKindOdWorkspaceVault.get(j));
						taskDeliverableMap.put(SELECT_DELIVERABLE_TYPE_IS_KINDOF_CONTROLLEDFODLER, slDeliverablesIsKindOdControlledFolder.get(j));
        				taskDeliverableMap.put(SELECT_IS_REQUIREMENT_SPECIFICATION, slDeliverablesIsKindOfReqSpec.get(j));
						taskDeliverableMap.put(SELECT_DELIVERABLE_TITLE, slDeliverablesTitleList.get(j));
        				taskDeliverableMap.put(SELECT_DELIVERABLE_IS_LAST_REVISION, slLastVersionList.get(j));
        				taskDeliverableMap.put(SELECT_DELIVERABLE_VERSION_ID, slVersionIdList.get(j));
        				taskDeliverableMap.put(SELECT_DELIVERABLE_IS_VPLMReference, slDeliverablesIsKindOfVPMReference.get(j));
        				
						taskDeliverableMap.put("from[" + ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE + "].to.format[generic].hasfile", slHasFilesList.get(j));

						taskDeliverableMap.put(SELECT_IS_REQUIREMENT, slDeliverablesIsKindOfRequirement.get(j));
						taskDeliverableMap.put(SELECT_DELIVERABLE_MAJORID, slDeliverablesMajorIdList.get(j));
						taskDeliverableMap.put(SELECT_DELIVERABLE_LAST_MAJORID, slDeliverablesLastMajorIdList.get(j));
						
						if("TRUE".equalsIgnoreCase(slDeliverablesIsKindOdWorkspaceVault.get(j))) {
							 taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_NAME, slDeliverablesTitleList.get(j));
						 } else {
		    				taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_NAME, slDeliverablesNameList.get(j));
						 }

        				taskDeliverablesMapList.add(taskDeliverableMap);
        			}

                    //Sort Deliverables
    				taskDeliverablesMapList.sort(ProgramCentralConstants.SELECT_DELIVERABLE_MODIFIED_DATE,
                    							 ProgramCentralConstants.DESCENDING_SORT,
                    							 ProgramCentralConstants.SORTTYPE_DATE);

                    // Apply limit
                    int iTotalNoOfDeliverables = taskDeliverablesMapList.size();
                    int iDeliverablesDisplayLimit = (iTotalNoOfDeliverables > iMaxItems) ? iMaxItems : iTotalNoOfDeliverables ;

                    sbResult.append("<table");
                    sbResult.append("><tr>");

                    //Show Counter Link
                    sbResult.append("<td style='vertical-align:middle;padding-right:5px;width:0px'>");
                    sbResult.append("<div ");
                    sbResult.append(" style='text-align:right;font-weight:bold;");

                    //To hide hyperlink for Copy From Project functionality on search Result/Preview Table
                    if("false".equalsIgnoreCase(sIsHyperlink) || isPasteOperation){
	                   	 sbResult.append("'>");
	                   	 sbResult.append(iTotalNoOfDeliverables);
                    }else{
	                    if( !(slDeliverablesIsKindOfBaseline.equalsIgnoreCase("TRUE") || slDeliverablesIsKindOfExperiment.equalsIgnoreCase("TRUE")) ){
                    		sbResult.append("cursor: pointer;' ");
     	                    sbResult.append("onmouseover='$(this).css(\"color\",\"#04A3CF\");$(this).css(\"text-decoration\",\"underline\");' onmouseout='$(this).css(\"color\",\"#333333\");$(this).css(\"text-decoration\",\"none\");' ");

     	                    sbResult.append("onClick=\"emxTableColumnLinkClick('");
     	                    sbResult.append("../common/emxTree.jsp?DefaultCategory=PMCDeliverableCommandPowerView&amp;objectId=").append(sOID);
     	                    sbResult.append("', '', '', false, 'content', '', '', '', '')\">");
                    	}
                    	else {
                    		sbResult.append("'>");
                    	}  
	                    sbResult.append(iTotalNoOfDeliverables);
                    }
                    sbResult.append("</div>");
                    sbResult.append("</td>");

                    //Show Type-Icon Link
                    Map<String,String> typeIconCacheMap = new HashMap<>(); 
                    for(int j = 0; j < iDeliverablesDisplayLimit; j++) {

                        Map mRelatedObject = (Map)taskDeliverablesMapList.get(j);
						String sObjectId = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_ID);
						String sType = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE);
						String isKindOfDocument = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE_IS_KINDOF_DOCUMENT);
                        String i18Type = EnoviaResourceBundle.getTypeI18NString(context, sType, context.getSession().getLanguage());
						String sName = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_NAME);
                        sName = XSSUtil.encodeForXML(context, sName);
						String sRevision = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_REVISION);
						String url = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_LINK_URL);
						String isKindOfWorkspace = (String)mRelatedObject.get(SELECT_DELIVERABLE_TYPE_IS_KINDOF_WORKSPACE);

						boolean  isKindOfReqSpec = "TRUE".equalsIgnoreCase((String)mRelatedObject.get(SELECT_IS_REQUIREMENT_SPECIFICATION));
						

						String isKindOfControlledFolder = (String)mRelatedObject.get(SELECT_DELIVERABLE_TYPE_IS_KINDOF_CONTROLLEDFODLER);
						String stitle = (String)mRelatedObject.get(SELECT_DELIVERABLE_TITLE);
						sName = "TRUE".equalsIgnoreCase(isKindOfControlledFolder)? stitle : sName;
						String sIcon = typeIconCacheMap.get(sType);
						
						if(sIcon == null) {
							sIcon = UINavigatorUtil.getTypeIconProperty(context, sType);	
							typeIconCacheMap.put(sType, sIcon);
						}
                        

                        sbResult.append("<td ");
                        if(isPasteOperation){
                    		sbResult.append(">");
                        }else if ("VPMReference".equalsIgnoreCase(sType)) {
                        	sbResult.append("onClick=\"javascript:alert('").append(sErrMsg).append("')\">");
							sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
							sbResult.append(" title=\"");
							sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);                        
							sbResult.append("\" />");
                        }else if(ProgramCentralConstants.TYPE_URL.equalsIgnoreCase(sType)){

                        	// rich text editor inputs while bookmark creation may affect the parsing so added try-catch for parsing url
                        	try{

                        		if (url.indexOf("://")==-1)
                        		{
                        			url = "http://" + url;
                        		}
                        		                        		
                        		url = URL.parseBookMarkHref(url);
                        		//Added for special character.
                        		url	=	XSSUtil.encodeForHTML(context, url);

                        		if("false".equalsIgnoreCase(sIsHyperlink) || isPasteOperation){
                            		sbResult.append(">");
                                }else{
                                	sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
                                	sbResult.append("onClick=\"javascript:openDynamicURLWindow('"+url);
                            		sbResult.append("', '', '', '','','true')\">");
                                }
								sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
								sbResult.append(" title=\"");
								sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);                        
								sbResult.append("\" />");
                        	} catch(Exception e){
                        		// rich text editor inputs while bookmark creation may affect the parsing so added try-catch for parsing url
                        	}
                        }
                        else if("TRUE".equalsIgnoreCase(isKindOfDocument) && !isKindOfReqSpec){
							// add check for files
							String strHasFiles = (String)mRelatedObject.get("from[" + ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE + "].to.format[generic].hasfile");
							if (UIUtil.isNotNullAndNotEmpty(strHasFiles) && strHasFiles.equals("FALSE"))
							{
								sbResult.append("style='vertical-align:middle;padding-left:1px'>");
								sbResult.append("<a href='");
								sbResult.append("../common/emxNavigator.jsp?isPopup=false&amp;objectId=").append(XSSUtil.encodeForURL(context,sObjectId));
								sbResult.append("' target='_blank'>");
								sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
								sbResult.append(" title=\"");
								sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);
								sbResult.append("\" /></a>");

							}
							else // includes files
							{
								sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
								sbResult.append("onClick=\"javascript:callCheckout('").append(sObjectId).append("',");
								sbResult.append("'download', '', '', 'null', 'null', 'structureBrowser', 'PMCPendingDeliverableSummary', 'null')\">");
								sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
								sbResult.append(" title=\"");
								sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);
								sbResult.append("\" />");

							}
                        }else if("TRUE".equalsIgnoreCase(isKindOfWorkspace)){
                        	sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
                        	sbResult.append("onClick=\"emxTableColumnLinkClick('");
                        	sbResult.append("../common/emxTree.jsp?objectId=").append(sObjectId);
                        	//int slDeliverablesFromTypeSize = slDeliverablesFromType.size();
                        	String fromType = "";
                        	if(slDeliverablesFromType != null){
								int slDeliverablesFromTypeSize = slDeliverablesFromType.size();
								if(slDeliverablesFromTypeSize == iNoOfDeliverables) {
									fromType = slDeliverablesFromType.get(j);
								}                        		
                        	}else {
                        		String SELECT_FROM_TYPE = "to[Data Vaults].from.type";
                        		String mqlCmd = "print bus $1 select $2 dump";
                        		fromType = MqlUtil.mqlCommand(context, 
                        				true,
                        				true,
                        				mqlCmd, 
                        				true,
                        				sObjectId,
                        				SELECT_FROM_TYPE);
                        	}
                        	
                        	if(ProgramCentralUtil.isNotNullString(fromType) && subTypeList.contains(fromType)) {
                    			sbResult.append("&amp;emxSuiteDirectory=programcentral");
                            }                        	
                        	
                        	
                        	sbResult.append("', '', '', false, 'popup', '', '', '', '')\">");
							sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
							sbResult.append(" title=\"");
							sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);                        
							sbResult.append("\" />");
                        }else {
                        	sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
                        	sbResult.append("onClick=\"emxTableColumnLinkClick('");
                        	sbResult.append("../common/emxTree.jsp?objectId=").append(sObjectId);
                        	sbResult.append("', '', '', false, 'popup', '', '', '', '')\">");
							sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
							sbResult.append(" title=\"");
							if(ProgramCentralConstants.TYPE_URL.equalsIgnoreCase(sType)){
								sbResult.append(url);
							}else{
								sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);
							}
							sbResult.append("\" />");

                        }
                        sbResult.append("</td>");

                    }
                    
                    //For Copy From Project and Create project from Template functionality on search Result/Preview Table
                    if("false".equalsIgnoreCase(sIsHyperlink)){
	                    //No need to show higher revision Icon
                    }else {
                    	for(int k = 0; k < iTotalNoOfDeliverables; k++) {
	                    	Map deliverablesInfoMap = (Map)taskDeliverablesMapList.get(k);
	 						String sCurrentRevision = (String)deliverablesInfoMap.get(ProgramCentralConstants.SELECT_DELIVERABLE_REVISION);
	 						String sLastRevision 	= (String)deliverablesInfoMap.get(ProgramCentralConstants.SELECT_DELIVERABLE_LAST_REVISION);
                    		String isVPLMReference 	= (String)deliverablesInfoMap.get(SELECT_DELIVERABLE_IS_VPLMReference);
                		    String strType 			= (String)deliverablesInfoMap.get(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE);
                    		boolean showHigherRevisionIcon = false;
                    		if("True".equalsIgnoreCase(isVPLMReference)) {
                    			String versionId 	= (String)deliverablesInfoMap.get(SELECT_DELIVERABLE_VERSION_ID);
                    			String isLastRevision 	= (String)deliverablesInfoMap.get(SELECT_DELIVERABLE_IS_LAST_REVISION);
                    			if("False".equalsIgnoreCase(isLastRevision)) {
                    				boolean higherRevisionAlreadyConnected = false;
                    				for(int y=0,slVersionIdListSize= slVersionIdList.size(); y<slVersionIdListSize; y++) {
                    					if(versionId.equalsIgnoreCase(slVersionIdList.get(y)) && "TRUE".equalsIgnoreCase(slLastVersionList.get(y))) {
                    						higherRevisionAlreadyConnected = true;
                    						break;
                    					}
                    				}
                    				if(!higherRevisionAlreadyConnected) {
                    					showHigherRevisionIcon = true;
                    				}
                    			}
                		}else if(ProgramCentralConstants.TYPE_REQUIREMENT.equalsIgnoreCase(strType) || ReqSpecType.equalsIgnoreCase(strType)) {
                			String majorId 	= (String)deliverablesInfoMap.get(SELECT_DELIVERABLE_MAJORID);
                			String lastMajorId 	= (String)deliverablesInfoMap.get(SELECT_DELIVERABLE_LAST_MAJORID);
                			if(UIUtil.isNotNullAndNotEmpty(majorId) && !majorId.equals(lastMajorId)) {
                				showHigherRevisionIcon = true;
                			}
                		}
                		else {
	
	 						int latestRevLength  = sLastRevision.length();
	 		    			int currentRevLength = sCurrentRevision.length();
	 		    			
	 		    			if((latestRevLength == currentRevLength && sLastRevision.compareTo(sCurrentRevision) > 0) || (latestRevLength > currentRevLength)) {
                    				showHigherRevisionIcon = true;

                    			}
                    		}
	 		    			   
                    		if(showHigherRevisionIcon) {
	 							sbResult.append("<td style='vertical-align:middle;padding-left:1px;' >");
	 	                    	sbResult.append("<img style='vertical-align:middle;' src='../common/images/iconSmallHigherRevision.png' ");
	 	                    	sbResult.append(" title=\"").append(sRevisionMsg).append("\" />").append("</td>");
	 	                    	break;
	 						}
	                    }
                    }
                    
                    sbResult.append("</tr></table>");

                    vResult.add(sbResult.toString());
                } else {
                	vResult.add(ProgramCentralConstants.EMPTY_STRING);
                }
            }

        } catch(Exception ex) {
        	ex.printStackTrace();
        }

		DebugUtil.debug("Total Time getTasksDeliverables(programHTMLOutput)::"+(System.currentTimeMillis()-start));

        return vResult;

    }

    /**
     * It gives Task Reference Documents in order of their latest modification.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @return Task Reference Documents list
     * @throws Exception if operation fails
     */
    public Vector getTasksRefDocument(Context context, String[] args) throws Exception
    {
		long start 			= System.currentTimeMillis();
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
        HashMap paramList = (HashMap) programMap.get("paramList");
        HashMap columnMap = (HashMap) programMap.get("columnMap");
        HashMap settings = (HashMap) columnMap.get("settings");
        String sMaxItems = (String)settings.get("Max Items");
        String sIsHyperlink = (String)settings.get("isHyperlink");

        int iMaxItems = Integer.parseInt(sMaxItems);
        String strLanguage = context.getSession().getLanguage();
        String sErrMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Deliverable.CannotOpenPhysicalProduct", strLanguage);

		int size 		= objectList.size();
		Vector vResult 	= new Vector(size);

		Map<String,StringList> derivativeMap =
				ProgramCentralUtil.getDerivativeTypeListFromUtilCache(context,DomainObject.TYPE_TASK_MANAGEMENT,ProgramCentralConstants.TYPE_MILESTONE);

		StringList slTaskSubTypes = derivativeMap.get(DomainObject.TYPE_TASK_MANAGEMENT);

    	StringList busSelects = new StringList(7);
        busSelects.add(ProgramCentralConstants.SELECT_TYPE);
        busSelects.add(DomainObject.SELECT_ID);
        busSelects.add(ProgramCentralConstants.SELECT_POLICY);
        busSelects.add(ProgramCentralConstants.SELECT_REF_DOC_ID);
        busSelects.add(ProgramCentralConstants.SELECT_REF_DOC_TYPE);
        busSelects.add(ProgramCentralConstants.SELECT_REF_DOC_NAME);
        busSelects.add(ProgramCentralConstants.SELECT_REF_DOC_REVISION);
        busSelects.add(ProgramCentralConstants.SELECT_REF_DOC_MODIFIED_DATE); //Document sort key
        busSelects.add(ProgramCentralConstants.SELECT_REF_DOC_LINK_URL);

        try {
			String[] sObjIdArr = new String[size];
			for (int i = 0; i < size; i++) {
				Map objectMap = (Map) objectList.get(i);
            	sObjIdArr[i] = (String) objectMap.get(ProgramCentralConstants.SELECT_ID);
    		}

			BusinessObjectWithSelectList bwsl = ProgramCentralUtil.getObjectWithSelectList(context, sObjIdArr, busSelects);
			for (int i = 0; i < size; i++) {

                StringBuilder sbResult = new StringBuilder();

				BusinessObjectWithSelect bws = bwsl.getElement(i);
				String sOID    = bws.getSelectData(ProgramCentralConstants.SELECT_ID);
				String sTaskType = bws.getSelectData(ProgramCentralConstants.SELECT_TYPE);

				StringList slRefDocumentIdList 			= bws.getSelectDataList(ProgramCentralConstants.SELECT_REF_DOC_ID);
				StringList slRefDocumentTypeList 			= bws.getSelectDataList(ProgramCentralConstants.SELECT_REF_DOC_TYPE);
				StringList slRefDocumentNameList 			= bws.getSelectDataList(ProgramCentralConstants.SELECT_REF_DOC_NAME);
				StringList slRefDocumentRevisionList 		= bws.getSelectDataList(ProgramCentralConstants.SELECT_REF_DOC_REVISION);
				StringList slRefDocumentModifiedDateList 	= bws.getSelectDataList(ProgramCentralConstants.SELECT_REF_DOC_MODIFIED_DATE);
				StringList slURLList                        = bws.getSelectDataList(ProgramCentralConstants.SELECT_REF_DOC_LINK_URL);

				if(slTaskSubTypes.contains(sTaskType) || ProgramCentralConstants.TYPE_MILESTONE.equalsIgnoreCase(sTaskType)) {

					int iNoOfRefDocument = slRefDocumentIdList != null && !slRefDocumentIdList.isEmpty()?slRefDocumentIdList.size():0;
                  //Convert taskInfoMap to a MapList of all the deliverables.
                    MapList taskRefDocumentMapList = new MapList(iNoOfRefDocument);

                    for (int j = 0; j < iNoOfRefDocument; j++) {

                    	Map taskRefDocumentMap = new HashMap();

						taskRefDocumentMap.put(ProgramCentralConstants.SELECT_REF_DOC_ID, slRefDocumentIdList.get(j));
						taskRefDocumentMap.put(ProgramCentralConstants.SELECT_REF_DOC_TYPE, slRefDocumentTypeList.get(j));
						taskRefDocumentMap.put(ProgramCentralConstants.SELECT_REF_DOC_NAME, slRefDocumentNameList.get(j));
						taskRefDocumentMap.put(ProgramCentralConstants.SELECT_REF_DOC_REVISION, slRefDocumentRevisionList.get(j));
						taskRefDocumentMap.put(ProgramCentralConstants.SELECT_REF_DOC_MODIFIED_DATE, slRefDocumentModifiedDateList.get(j));
						taskRefDocumentMap.put(ProgramCentralConstants.SELECT_REF_DOC_LINK_URL, slURLList.get(j));

        				taskRefDocumentMapList.add(taskRefDocumentMap);
        			}

                    //Sort Deliverables
					taskRefDocumentMapList.sort(ProgramCentralConstants.SELECT_REF_DOC_MODIFIED_DATE,
                    							 ProgramCentralConstants.DESCENDING_SORT,
                    							 ProgramCentralConstants.SORTTYPE_DATE);

                    // Apply limit
                    int iTotalNoOfRefDocument = taskRefDocumentMapList.size();
                    int iRefDocumentDisplayLimit = (iTotalNoOfRefDocument > iMaxItems) ? iMaxItems : iTotalNoOfRefDocument ;

                    sbResult.append("<table");
                    sbResult.append("><tr>");

                    //Show Counter Link
                    sbResult.append("<td style='vertical-align:middle;padding-right:5px;width:0px'>");
                    sbResult.append("<div ");
                    sbResult.append(" style='text-align:right;font-weight:bold; '>");

                    sbResult.append(iTotalNoOfRefDocument);

                    sbResult.append("</div>");
                    sbResult.append("</td>");

                    //Show Type-Icon Link
                    for(int j = 0; j < iRefDocumentDisplayLimit; j++) {

                        Map mRelatedObject = (Map)taskRefDocumentMapList.get(j);
						String sObjectId = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_REF_DOC_ID);
						String sType = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_REF_DOC_TYPE);
                        String i18Type = EnoviaResourceBundle.getTypeI18NString(context, sType, context.getSession().getLanguage());
						String sName = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_REF_DOC_NAME);
                        sName = XSSUtil.encodeForXML(context, sName);
						String sRevision = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_REF_DOC_REVISION);
						String url = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_REF_DOC_LINK_URL);

                        String sIcon = UINavigatorUtil.getTypeIconProperty(context, sType);
                        sbResult.append("<td ");
                        if ("VPMReference".equalsIgnoreCase(sType)) {
                        sbResult.append("onClick=\"javascript:alert('").append(sErrMsg).append("')\">");
                        }else if(ProgramCentralConstants.TYPE_URL.equalsIgnoreCase(sType)){

                        	// rich text editor inputs while bookmark creation may affect the parsing so added try-catch for parsing url
                        	try{

                        		if (url.indexOf("://")==-1)
                        		{
                        			url = "http://" + url;
                        		}
                        		//Added for special character.
                        		//url	=	XSSUtil.encodeForHTML(context, url);
                        		url = URL.parseBookMarkHref(url);

                        		if("false".equalsIgnoreCase(sIsHyperlink)){
                            		sbResult.append(">");
                                }else{
                                	sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
                                	sbResult.append("onClick=\"javascript:openDynamicURLWindow('"+url);
                            		sbResult.append("', '', '', '','','true')\">");
                                }
                        	} catch(Exception e){
                        		// rich text editor inputs while bookmark creation may affect the parsing so added try-catch for parsing url
                        	}
                        }else{
	                        sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
	                        sbResult.append("onClick=\"javascript:callCheckout('").append(sObjectId).append("',");
	                        sbResult.append("'download', '', '', 'null', 'null', 'structureBrowser', 'PMCPendingDeliverableSummary', 'null')\">");
                        }

                        sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
                        sbResult.append(" title=\"");

                        if(ProgramCentralConstants.TYPE_URL.equalsIgnoreCase(sType)){
                        	sbResult.append(url);
                        }else{
                        	sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);
                        }
                        sbResult.append("\" />");

                        sbResult.append("</td>");

                    }
                    sbResult.append("</tr></table>");

                    vResult.add(sbResult.toString());
                } else {
                	vResult.add(ProgramCentralConstants.EMPTY_STRING);
                }
            }

        } catch(Exception ex) {
        	ex.printStackTrace();
        }

		DebugUtil.debug("Total Time getTasksRefDocuments(programHTMLOutput)::"+(System.currentTimeMillis()-start));

        return vResult;

    }

    /**
     * It gives Documents deliverables in order of their latest modification.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @return Task deliverables list
     * @throws Exception if operation fails
     */
    public Vector getDocumentsDeliverables(Context context, String[] args) throws Exception {

        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        MapList mlObjects = (MapList) programMap.get("objectList");
        HashMap paramList = (HashMap) programMap.get("paramList");
        HashMap columnMap = (HashMap) programMap.get("columnMap");
        HashMap settings = (HashMap) columnMap.get("settings");
        String sMaxItems = (String)settings.get("Max Items");
        int iMaxItems = Integer.parseInt(sMaxItems);

        Vector vResult = new Vector(mlObjects.size());

        StringList slTaskSubTypes = ProgramCentralUtil.getTaskSubTypesList(context);
        slTaskSubTypes.remove(ProgramCentralConstants.TYPE_MILESTONE);
        StringList mileStoneSubtypeList = ProgramCentralUtil.getSubTypesList(context,ProgramCentralConstants.TYPE_MILESTONE);
        slTaskSubTypes.removeAll(mileStoneSubtypeList);

        String sDimensions = EnoviaResourceBundle.getProperty(context, "emxFramework.PopupSize.Large");
        String[] aDimensions = sDimensions.split("x");
        String sWindowHeight = aDimensions[1];
        String sWindowWidth = aDimensions[0];

        String sLinkPrefix = "onClick=\"emxTableColumnLinkClick('../common/";
        String sLinkSuffix = "', 'popup', '', '" + sWindowWidth + "', '" + sWindowHeight + "', '')\"";

        final String SELECT_DELIVERABLE_ID = DomainObject.SELECT_ID;
        final String SELECT_DELIVERABLE_TYPE = DomainObject.SELECT_TYPE;
        final String SELECT_DELIVERABLE_NAME = DomainObject.SELECT_NAME;
        final String SELECT_DELIVERABLE_REVISION = DomainObject.SELECT_REVISION;
        final String SELECT_DELIVERABLE_MODIFIED_DATE = DomainObject.SELECT_MODIFIED;

        StringList busSelects = new StringList();
        busSelects.add(ProgramCentralConstants.SELECT_POLICY);
        busSelects.add(SELECT_DELIVERABLE_ID);
        busSelects.add(SELECT_DELIVERABLE_TYPE);
        busSelects.add(SELECT_DELIVERABLE_NAME);
        busSelects.add(SELECT_DELIVERABLE_REVISION);
        busSelects.add(SELECT_DELIVERABLE_MODIFIED_DATE); //Document sort key

        try {
        	String[] sObjIdArr = new String[mlObjects.size()];
            for (int i = 0; i < mlObjects.size(); i++) {
    			Map objectMap = (Map) mlObjects.get(i);
            	sObjIdArr[i] = (String) objectMap.get(ProgramCentralConstants.SELECT_ID);
    		}

            MapList deliverablesInfoMapList = ProgramCentralUtil.getObjectDetails(context, sObjIdArr, busSelects, true);
            //DomainObject.getInfo(context, sObjIdArr, busSelects);

            for (int i = 0; i < deliverablesInfoMapList.size(); i++) {

                StringBuilder sbResult = new StringBuilder();

                Map mObject = (Map) mlObjects.get(i);
                String sOID = (String) mObject.get(ProgramCentralConstants.SELECT_ID);

                Map taskInfoMap = (Map) deliverablesInfoMapList.get(i);
                String sTaskType = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_TYPE);
                String sTaskPolicy = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_POLICY);


              	StringList slDeliverablesIdList =  ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_DELIVERABLE_ID));
                StringList slDeliverablesTypeList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_DELIVERABLE_TYPE));
                StringList slDeliverablesNameList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_DELIVERABLE_NAME));
                StringList slDeliverablesRevisionList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_DELIVERABLE_REVISION));
                StringList slDeliverablesModifiedDateList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_DELIVERABLE_MODIFIED_DATE));

                int iNoOfDeliverables = slDeliverablesIdList.size();
                MapList taskDeliverablesMapList = new MapList(iNoOfDeliverables);

                for (int j = 0; j < iNoOfDeliverables; j++) {

                  	Map taskDeliverableMap = new HashMap();
                   	String sDeliverableType        = (String) slDeliverablesTypeList.get(j);

                   	if (mxType.isOfParentType(context, sDeliverableType, DomainConstants.TYPE_DOCUMENT)) {
                   		taskDeliverableMap.put(SELECT_DELIVERABLE_ID, slDeliverablesIdList.get(j));
                       	taskDeliverableMap.put(SELECT_DELIVERABLE_TYPE, slDeliverablesTypeList.get(j));
           				taskDeliverableMap.put(SELECT_DELIVERABLE_NAME, slDeliverablesNameList.get(j));
           				taskDeliverableMap.put(SELECT_DELIVERABLE_REVISION, slDeliverablesRevisionList.get(j));
           				taskDeliverableMap.put(SELECT_DELIVERABLE_MODIFIED_DATE, slDeliverablesModifiedDateList.get(j));

           				taskDeliverablesMapList.add(taskDeliverableMap);
                   	}

       			}

                //Sort Deliverables
                taskDeliverablesMapList.sort(SELECT_DELIVERABLE_MODIFIED_DATE,
                    							 ProgramCentralConstants.DESCENDING_SORT,
                    							 ProgramCentralConstants.SORTTYPE_DATE);

                // Apply limit
                int iTotalNoOfDeliverables = taskDeliverablesMapList.size();
                int iDeliverablesDisplayLimit = (iTotalNoOfDeliverables > iMaxItems) ? iMaxItems : iTotalNoOfDeliverables ;

                sbResult.append("<table");
                sbResult.append("><tr>");
                //Show Type-Icon Link
                for(int j = 0; j < iDeliverablesDisplayLimit; j++) {

                    Map mRelatedObject = (Map)taskDeliverablesMapList.get(j);
                    String sObjectId = (String)mRelatedObject.get(SELECT_DELIVERABLE_ID);
                    String sType = (String)mRelatedObject.get(SELECT_DELIVERABLE_TYPE);
                    String sName = (String)mRelatedObject.get(SELECT_DELIVERABLE_NAME);
                    String sRevision = (String)mRelatedObject.get(SELECT_DELIVERABLE_REVISION);

                    String sIcon = UINavigatorUtil.getTypeIconProperty(context, sType);

                    sbResult.append("<td style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
                    sbResult.append("onClick=\"javascript:callCheckout('").append(sObjectId).append("',");
                    sbResult.append("'download', '', '', 'null', 'null', 'structureBrowser', 'PMCPendingDeliverableSummary', 'null')\">");
                    sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
                    sbResult.append(" title='");
                    sbResult.append(sType).append(" - ").append(sName).append(" - ").append(sRevision);
                    sbResult.append("' />");

                    sbResult.append("</td>");

                }
                sbResult.append("</tr></table>");

                vResult.add(sbResult.toString());
            }

        } catch(Exception ex) {
        	ex.printStackTrace();
        }

        return vResult;
    }

    /**
     * It gives percent complete info of a tasks in the form of graphical bar.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @return percent complete in the form of graphical bar
     * @throws Exception if operation fails
     */
    public Vector getTasksProgressBar(Context context, String[] args) throws Exception
    {
    	long start = System.currentTimeMillis();

         Map programMap = (Map) JPO.unpackArgs(args);
        MapList objectsMapList = (MapList) programMap.get("objectList");
    	String invokeFrom 	= (String)programMap.get("invokeFrom"); //Added for ODT

    	StringList objSelects = new StringList(4);
        objSelects.add(Task.SELECT_PERCENT_COMPLETE);
        objSelects.add(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE);
        objSelects.add(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
    	objSelects.add(Task.SELECT_TASK_ACTUAL_START_DATE);

        	int objListSize = objectsMapList.size();
        	String[] objIdArr = new String[objListSize];
            for (int i = 0; i < objListSize ; i++) {
            	Map objectMap = (Map) objectsMapList.get(i);
            	objIdArr[i] = (String) objectMap.get(ProgramCentralConstants.SELECT_ID);
    		}

    	Vector vResult = new Vector(objListSize);

    	BusinessObjectWithSelectList objectWithSelectList = null;
    	if("TestCase".equalsIgnoreCase(invokeFrom)) { //Added for ODT
    		objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIdArr, objSelects,true);
    	}else {
    		objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIdArr, objSelects);
    	}


    	objectWithSelectList.forEach(bws->{
    		String percentComplete 		= bws.getSelectData(Task.SELECT_PERCENT_COMPLETE);
    		String estimatedFinishDate 	= bws.getSelectData(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE);
    		String actualFinishDate 	= bws.getSelectData(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
    		String actualStartDate  	= bws.getSelectData(Task.SELECT_TASK_ACTUAL_START_DATE);

    		Map<String,String> taskMap = new HashMap();
    		taskMap.put(Task.SELECT_PERCENT_COMPLETE, percentComplete);
    		taskMap.put(Task.SELECT_TASK_ACTUAL_START_DATE, actualStartDate);
    		taskMap.put(Task.SELECT_TASK_ACTUAL_FINISH_DATE, actualFinishDate);
    		taskMap.put(Task.SELECT_TASK_ESTIMATED_FINISH_DATE, estimatedFinishDate);

    		String value = ProgramCentralConstants.EMPTY_STRING;
    		String color = ProgramCentralConstants.EMPTY_STRING;
    		try {
    			Map<String,String> statusInfo = Task.getTaskStatus(context, taskMap);
    			value = statusInfo.get("value");
        		color = statusInfo.get("colour");
    		} catch (MatrixException e) {
    			e.printStackTrace();
    		}

    		Double dPercent = 0.0;
    		if(ProgramCentralUtil.isNotNullString(percentComplete)) {
    			dPercent = Task.parseToDouble(percentComplete);
        }

    		percentComplete = "<div style=\"border:1px solid #808080;height:18px;\"><div style=\"background:" + color + ";" + "height:100%;width:" + dPercent + "%;" + "\"> </div></div>";

    		vResult.addElement(percentComplete);

    	});

    	DebugUtil.debug("Total time taken by getTasksProgressBar(programHTMLOutPut)::"+(System.currentTimeMillis()-start));
        return vResult;
    }


    /**
     * It returns the Project member list details for Assignee column of Assignment View.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @return Project member list details
     * @throws Exception if operation fails
     */
    public List dynamicAssignmentViewMembersColumn(Context context, String[] args) throws Exception {

    	MapList mlResult = new MapList();

        Map programMap = (Map) JPO.unpackArgs(args);
        Map requestMap = (Map)programMap.get("requestMap");
        Map imageData = (Map)requestMap.get("ImageData");
        String sMCSURL = (String)imageData.get("MCSURL");
        String objectId = (String) requestMap.get("objectId");
    	String isCallForDataGrid = (String)requestMap.get("isCallForDataGrid");
		String noPictureURL =  "../common/images/noPicture.gif";
		String userGroupPictureURL =  "../common/images/iconLargerUserGroup.png";
	    if( "true".equalsIgnoreCase(isCallForDataGrid)) {
	    	noPictureURL =  "../../common/images/noPicture.gif";
			userGroupPictureURL =  "../../common/images/iconLargerUserGroup.png";
	    }

        String strI18nMember = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                "emxProgramCentral.TaskAssignment.Member", context.getSession().getLanguage());
        String strI18nNonMember = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                "emxProgramCentral.TaskAssignment.NonMember", context.getSession().getLanguage());
        String strGridActive = "false";
        try {
        	strGridActive = EnoviaResourceBundle.getProperty(context, "emxFramework.Activate.GridView");
        } catch (Exception e) {
	strGridActive = "false";
        }

        try{
            HashMap paramMap = new HashMap();
            paramMap.put("objectId", objectId);
            String[] argss = JPO.packArgs(paramMap);

            ProjectSpace projectSpace = new ProjectSpace(objectId);
			String projectPolicy = projectSpace.getInfo(context, ProgramCentralConstants.SELECT_POLICY);

            //Finding Project Members.
			ProjectSpace project = new ProjectSpace(objectId);


			StringList memberSelects = new StringList();
			memberSelects.add(Person.SELECT_ID);
			memberSelects.add(Person.SELECT_NAME);
			memberSelects.add(Person.SELECT_FIRST_NAME);
			memberSelects.add(Person.SELECT_COMPANY_NAME);
			memberSelects.add(Person.SELECT_LAST_NAME);
			memberSelects.add(Person.SELECT_CURRENT);
			
			MapList mlMembers = project.getMembers(context, memberSelects, null,
					ProgramCentralConstants.EMPTY_STRING, ProgramCentralConstants.EMPTY_STRING);

			MapList mlExternalMembers = project.getProjectTaskAssignees(context, objectId);
			StringList slProjectMembersIdList = new StringList();

			String strMQLCmd = "print bus $1 select $2 dump $3;";
			String ownership= MqlUtil.mqlCommand(context, strMQLCmd, objectId, "ownership", ",");
			StringList ownershipList = FrameworkUtil.split(ownership, ",");
			int size = ownershipList.size();
			for(int i=0;i<size;i++){
				String ownershipstr = (String)ownershipList.get(i);
				if(ownershipstr.contains("_PRJ")){
					ownershipList.remove(ownershipstr);
					i--;
					size--;
				}

			}

            if(!mlExternalMembers.isEmpty()&&!ownershipList.isEmpty()){

            	addExternalMemberToProjectMemberList(context,objectId,mlMembers,mlExternalMembers);
			}

            mlMembers.sort(Person.SELECT_FIRST_NAME, ProgramCentralConstants.DESCENDING_SORT, ProgramCentralConstants.SORTTYPE_STRING);
            mlMembers.sort(Person.SELECT_LAST_NAME, ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_STRING);

            for (int i = 0; i < mlMembers.size(); i++) {
            	Map projectMemberMap = (Map) mlMembers.get(i);
            	String sName = (String) projectMemberMap.get(DomainConstants.SELECT_NAME);
            	String sPersonOID = (String) projectMemberMap.get(DomainConstants.SELECT_ID);
            	sPersonOID = sPersonOID.contains("personid_")?sPersonOID.replace("personid_", "") : sPersonOID;
            	String sFirstName = (String) projectMemberMap.get(Person.SELECT_FIRST_NAME);
            	String sLastName = (String) projectMemberMap.get(Person.SELECT_LAST_NAME);
				String sFullName=sFirstName +" "+ sLastName.toUpperCase();
				String state = (String) projectMemberMap.get(Person.SELECT_CURRENT);
				String type = (String) projectMemberMap.get(DomainConstants.SELECT_TYPE);
				String title = (String) projectMemberMap.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
				String sImage = null;
            	StringBuffer sbLabel = new StringBuffer();
				if(DomainConstants.TYPE_GROUP.equalsIgnoreCase(type) || ProgramCentralConstants.TYPE_GROUP_PROXY.equalsIgnoreCase(type)){
					sImage = emxUtilBase_mxJPO.getPrimaryImageURL(context, args, sPersonOID, "mxThumbnail Image",sMCSURL, userGroupPictureURL);
					sbLabel.append(title);
				} else {
					sImage = emxUtilBase_mxJPO.getPrimaryImageURL(context, args, sPersonOID, "mxThumbnail Image",sMCSURL, noPictureURL);
            	sbLabel.append(sFirstName).append(" ").append(sLastName.toUpperCase());
				}
            	if(ProgramCentralUtil.isNotNullString(sImage)) {
            		sbLabel = new StringBuffer();
            		sbLabel.append("<img style='height:40px;border:1px solid #bababa;' src=\"").append(sImage).append("\"/>");
            		  if ("false".equalsIgnoreCase(strGridActive)) {
            			  sbLabel.append("<br/>");
            			  sbLabel.append(sFirstName).append("<br/>");
						  sbLabel.append(sLastName.toUpperCase());
					} else{
						if(DomainConstants.TYPE_GROUP.equalsIgnoreCase(type) || ProgramCentralConstants.TYPE_GROUP_PROXY.equalsIgnoreCase(type)){
							sbLabel.append(title);
						} else {
            		sbLabel.append(sFullName);
            		  }
					}
            	}

            	HashMap settingsMap = new HashMap();
            	settingsMap.put("Auto Filter", "false");
            	settingsMap.put("Column Type", "programHTMLOutput");
            	settingsMap.put("program", "emxProgramUI");
            	settingsMap.put("function", "getAssignmentViewMembersColumnData");
            	settingsMap.put("personId", sPersonOID);
				settingsMap.put("personState", state);
            	settingsMap.put("Width", "100");
            	settingsMap.put("Group Header", strI18nMember);
            	settingsMap.put("Export", "true");
            	settingsMap.put("Project Policy", projectPolicy);
            	settingsMap.put("isCallForDataGrid", isCallForDataGrid);

            	Map mColumn = new HashMap();
            	//mColumn.put("name", sFirstName + " " + sLastName);
            	mColumn.put("name", sPersonOID);
            	mColumn.put("label", sbLabel.toString());
            	mColumn.put("expression", "id");
            	mColumn.put("select", "id");
            	mColumn.put("settings", settingsMap);

            	mlResult.add(mColumn);

            	slProjectMembersIdList.add(sPersonOID);
            }

            //Removing project Members from the list and keeps only external members.
            int tempSize = mlExternalMembers.size();
            for (int i = 0; i < tempSize; i++) {
            	Map externalMemberMap = (Map) mlExternalMembers.get(i);
            	String externalMemberId = (String) externalMemberMap.get(ProgramCentralConstants.SELECT_ID);
            	if (slProjectMembersIdList.contains(externalMemberId)) {
            		mlExternalMembers.remove(externalMemberMap);
            		i--;
            		tempSize--;
            	}
            }
            //Finding External Project Members.

            mlExternalMembers.sort(Person.SELECT_FIRST_NAME, ProgramCentralConstants.DESCENDING_SORT, ProgramCentralConstants.SORTTYPE_STRING);
            mlExternalMembers.sort(Person.SELECT_LAST_NAME, ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_STRING);

            for (int i = 0; i < mlExternalMembers.size(); i++) {
            	Map externalMemberMap = (Map) mlExternalMembers.get(i);
            	String sName = (String) externalMemberMap.get(DomainConstants.SELECT_NAME);
            	String sPersonOID = (String) externalMemberMap.get(DomainConstants.SELECT_ID);
            	sPersonOID = sPersonOID.contains("personid_")?sPersonOID.replace("personid_", "") : sPersonOID;
            	String sFirstName = (String) externalMemberMap.get(Person.SELECT_FIRST_NAME);
            	String sLastName = (String) externalMemberMap.get(Person.SELECT_LAST_NAME);
				String sFullName=sFirstName +" "+ sLastName.toUpperCase();
				String state = (String) externalMemberMap.get(Person.SELECT_CURRENT);
				String type = (String) externalMemberMap.get(DomainConstants.SELECT_TYPE);
				String title = (String) externalMemberMap.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
				String sImage = null;
            	StringBuffer sbLabel = new StringBuffer();
				if(DomainConstants.TYPE_GROUP.equalsIgnoreCase(type) || ProgramCentralConstants.TYPE_GROUP_PROXY.equalsIgnoreCase(type)){
					sImage = emxUtilBase_mxJPO.getPrimaryImageURL(context, args, sPersonOID, "mxThumbnail Image",sMCSURL, userGroupPictureURL);
					sbLabel.append(title);
				} else {
					sImage = emxUtilBase_mxJPO.getPrimaryImageURL(context, args, sPersonOID, "mxThumbnail Image",sMCSURL, noPictureURL);
            	sbLabel.append(sFirstName).append(" ").append(sLastName.toUpperCase());
				}
            	if(ProgramCentralUtil.isNotNullString(sImage)) {
            		sbLabel = new StringBuffer();
            		sbLabel.append("<img style='height:40px;border:1px solid #bababa;' src=\"").append(sImage).append("\"/>");
            		  if ("false".equalsIgnoreCase(strGridActive)) {
            			  sbLabel.append("<br/>");
            			  sbLabel.append(sFirstName).append("<br/>");
						  sbLabel.append(sLastName.toUpperCase());
					}else{
						if(DomainConstants.TYPE_GROUP.equalsIgnoreCase(type) || "Group Proxy".equalsIgnoreCase(type)){
						  sbLabel.append(title);
						} else {
            		sbLabel.append(sFullName);
            		  }
					}
            	}

            	HashMap settingsMap = new HashMap();
            	settingsMap.put("Auto Filter", "false");
            	settingsMap.put("Column Type", "programHTMLOutput");
            	settingsMap.put("program", "emxProgramUI");
            	settingsMap.put("function", "getAssignmentViewMembersColumnData");
            	settingsMap.put("personId", sPersonOID);
				settingsMap.put("personState", state);
            	settingsMap.put("Width", "100");
            	settingsMap.put("Group Header", strI18nNonMember);
            	settingsMap.put("Export", "true");
            	settingsMap.put("Project Policy", projectPolicy);
            	settingsMap.put("isCallForDataGrid", isCallForDataGrid);

            	Map mColumn = new HashMap();
            	//mColumn.put("name", sFirstName + " " + sLastName);
            	mColumn.put("name", sPersonOID);
            	mColumn.put("label", sbLabel.toString());
            	mColumn.put("expression", "id");
            	mColumn.put("select", "id");
            	mColumn.put("settings", settingsMap);

            	mlResult.add(mColumn);
            }

        }catch(Exception exception){
        	exception.printStackTrace();
        	throw exception;
        }

        return mlResult;
    }

    private void addExternalMemberToProjectMemberList(Context context ,String projectId,MapList mlMembers, MapList mlExternalMembers) throws Exception{
    	//Iniital member List
    	StringList projectMemberList = new StringList();
    	MapList excludeExternalMembersList = new MapList();
    	
    	for (int i = 0; i < mlMembers.size(); i++) {
    		Map memberMap = (Map) mlMembers.get(i);
    		String memberId = (String) memberMap.get("id");
    		projectMemberList.add(memberId);
    	}
    	//======Create org.Project list from SOV added======
    	MapList SecurityContext = DomainAccess.getAccessSummaryList(context, projectId);
    	StringList securityContextList = new StringList();
    	for(int j=0;j<SecurityContext.size();j++){
    		Map securityctxMap = (Map) SecurityContext.get(j);
    		String name = (String) securityctxMap.get(ProgramCentralConstants.SELECT_NAME);
    		String comment = (String) securityctxMap.get("comment");

    		if(!(name.contains("_PRJ")||"Primary".equalsIgnoreCase(comment)))
    			securityContextList.add(name);
    	}

    	//================= append external member to Project Member List if security context matches with external members org.project
    	
        Iterator mlExternalMembersIterator = mlExternalMembers.iterator();
    	while(mlExternalMembersIterator.hasNext()) {
    		Map externalMemberMap = (Map) mlExternalMembersIterator.next();
    		String externalMemberId = (String) externalMemberMap.get("id");
    		String externalMemberName = (String) externalMemberMap.get("name");
			String externalMemberState = (String) externalMemberMap.get("current");
			String externalMemberType = (String) externalMemberMap.get("type");
    		if(projectMemberList.contains(externalMemberId)){
    			excludeExternalMembersList.add(externalMemberMap);
    			continue;
    		}
			StringList finalAssignmentList = new StringList();
			if(DomainConstants.TYPE_PERSON.equalsIgnoreCase(externalMemberType)){
    		String strMQLCmd = "print person $1 select $2 dump $3;";
    		String assignment= MqlUtil.mqlCommand(context, strMQLCmd, externalMemberName, "assignment", "|");
    		StringList assignmentList = FrameworkUtil.split(assignment, "|");

    		for(int k=0;k<assignmentList.size();k++){
    			int c=0;
    			String assignm = (String)assignmentList.get(k);
    			if(assignm.startsWith("ctx::")){
    				String refineedAssignm = assignm.substring(assignm.indexOf(".")+1);
    				finalAssignmentList.add(c, refineedAssignm);
    				c++;
    			}
    		}
			}
			if(DomainConstants.TYPE_GROUP.equalsIgnoreCase(externalMemberType) || ProgramCentralConstants.TYPE_GROUP_PROXY.equalsIgnoreCase(externalMemberType)){
				String groupTitle = (String) externalMemberMap.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
				System.out.println("groupTitle... " + groupTitle);
			}
    		for(int l=0;l<securityContextList.size();l++){
    			for(int m=0;m<finalAssignmentList.size();m++){
    				String securityctx = (String) securityContextList.get(l);
    				String assignmentctx= (String) finalAssignmentList.get(m);

    				if(securityctx !=null && securityctx.equals(assignmentctx)){
    					if(!projectMemberList.contains(externalMemberId)) {
    					projectMemberList.add(externalMemberId);
    					mlMembers.add(externalMemberMap);
    					}
    					excludeExternalMembersList.add(externalMemberMap);
    					break;
    				}
    			}
    		}

    	}
    	
    	Iterator excludeExternalMembersListIterator = excludeExternalMembersList.iterator();
    	while(excludeExternalMembersListIterator.hasNext()) {
    		Map excludeExternalMemberInfo = (Map)excludeExternalMembersListIterator.next();
    		
    		if(mlExternalMembers!=null && !mlExternalMembers.isEmpty()) {
    			mlExternalMembers.remove(excludeExternalMemberInfo);
    		}
    		
    	}
    }

    /**
     * It returns the Project member list details for Assignee column of Allocation View.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @return Project member list details
     * @throws Exception if operation fails
     */
    public List dynamicAllocationViewMembersColumn(Context context, String[] args) throws Exception {

    	MapList mlResult = new MapList();

    	Map programMap = (Map) JPO.unpackArgs(args);
        Map requestMap = (Map)programMap.get("requestMap");
        String sLang = (String)requestMap.get("languageStr");
		String isCallForDataGrid = (String)requestMap.get("isCallForDataGrid");
		String noPictureURL =  "../common/images/noPicture.gif";
		String userGroupPictureURL =  "../common/images/iconLargerUserGroup.png";
	    if( "true".equalsIgnoreCase(isCallForDataGrid)) {
	    	noPictureURL =  "../../common/images/noPicture.gif";
			userGroupPictureURL =  "../../common/images/iconLargerUserGroup.png";
	    }
		
        Map imageData = imageData= (Map)requestMap.get("ImageData");
        String sMCSURL = (String)imageData.get("MCSURL");

        String objectId = (String) requestMap.get("originalObjectId");
        if(ProgramCentralUtil.isNullString(objectId)) {
        	 objectId = (String) requestMap.get("objectId");	
        }

        String strI18nMember = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                "emxProgramCentral.TaskAllocation.Member", context.getSession().getLanguage());
        String strI18nNonMember = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                "emxProgramCentral.TaskAllocation.NonMember", context.getSession().getLanguage());

        try{
            HashMap paramMap = new HashMap();
            paramMap.put("objectId", objectId);
            String[] argss = JPO.packArgs(paramMap);

           	ProjectSpace project = new ProjectSpace(objectId);
			String projectPolicy = project.getInfo(context, Task.SELECT_POLICY);

			StringList busSelects = new StringList();
			busSelects.add(Person.SELECT_ID);
			busSelects.add(Person.SELECT_NAME);
			busSelects.add(Person.SELECT_FIRST_NAME);
			busSelects.add(Person.SELECT_COMPANY_NAME);
			busSelects.add(Person.SELECT_LAST_NAME);
			busSelects.add(Person.SELECT_CURRENT);

			StringList relSelects = new StringList();
            relSelects.add(MemberRelationship.SELECT_PROJECT_ROLE);
            relSelects.add(MemberRelationship.SELECT_PROJECT_ACCESS);
            relSelects.add(MemberRelationship.SELECT_ID);

			MapList mlMembers = project.getMembers(context, busSelects, relSelects, ProgramCentralConstants.EMPTY_STRING, ProgramCentralConstants.EMPTY_STRING);
            	//Finding External Project Members.
            MapList mlExternalMembers = project.getProjectTaskAssignees(context, objectId);

            String strMQLCmd = "print bus $1 select $2 dump $3;";
			String ownership= MqlUtil.mqlCommand(context, strMQLCmd, objectId, "ownership", ",");
			StringList ownershipList = FrameworkUtil.split(ownership, ",");
			int size = ownershipList.size();
			for(int i=0;i<size;i++){
				String ownershipstr = (String)ownershipList.get(i);
				if(ownershipstr.contains("_PRJ")){
					ownershipList.remove(ownershipstr);
					i--;
					size--;
				}

			}

            if(!mlExternalMembers.isEmpty()&&!ownershipList.isEmpty()){
            	//Check if task assignee belong to security context added to ProjectSpace
            	addExternalMemberToProjectMemberList(context,objectId,mlMembers,mlExternalMembers);
			}
            mlMembers.sort(Person.SELECT_FIRST_NAME, ProgramCentralConstants.DESCENDING_SORT, ProgramCentralConstants.SORTTYPE_STRING);
            mlMembers.sort(Person.SELECT_LAST_NAME, ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_STRING);

            StringList slProjectMembersIdList = new StringList();
            for (int j = 0; j < mlMembers.size(); j++) {
            	Map projectMemberMap = (Map) mlMembers.get(j);
                String sName = (String) projectMemberMap.get(DomainConstants.SELECT_NAME);
                String sPersonOID = (String) projectMemberMap.get(DomainConstants.SELECT_ID);
                sPersonOID = sPersonOID.contains("personid_")?sPersonOID.replace("personid_", "") : sPersonOID;
                String sFirstName = (String) projectMemberMap.get(Person.SELECT_FIRST_NAME);
                String sLastName = (String) projectMemberMap.get(Person.SELECT_LAST_NAME);
				String state = (String) projectMemberMap.get(Person.SELECT_CURRENT);
                String sRole = (String) projectMemberMap.get(MemberRelationship.SELECT_PROJECT_ROLE);
				String type = (String) projectMemberMap.get(DomainConstants.SELECT_TYPE);
				String title = (String) projectMemberMap.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
                String sImage = emxUtilBase_mxJPO.getPrimaryImageURL(context, args, sPersonOID, "mxThumbnail Image",sMCSURL, noPictureURL);
				String fullName = null;
				if(DomainConstants.TYPE_GROUP.equalsIgnoreCase(type) || ProgramCentralConstants.TYPE_GROUP_PROXY.equalsIgnoreCase(type)){
					sImage = emxUtilBase_mxJPO.getPrimaryImageURL(context, args, sPersonOID, "mxThumbnail Image",sMCSURL, userGroupPictureURL);
					fullName = title;
				} else {
					fullName = sLastName.toUpperCase() + " " + sFirstName;
				}

                if(ProgramCentralUtil.isNotNullString(sRole)) {
                    sRole = EnoviaResourceBundle.getRangeI18NString(context, ProgramCentralConstants.ATTRIBUTE_PROJECT_ROLE, sRole, sLang) + " ";
                } else {
                	sRole = ProgramCentralConstants.EMPTY_STRING;
                }

                StringBuffer sbLabel = new StringBuffer();
                sbLabel.append("<img style='height:42px;float:left;margin-right:3px;border:1px solid #bababa;' src='").append(sImage).append("'/>");
                sbLabel.append(fullName).append("<br/>");
                sbLabel.append(sRole);

                HashMap settingsMap = new HashMap();
                settingsMap.put("Column Type","programHTMLOutput");
                settingsMap.put("program","emxProgramUI");
                settingsMap.put("function","getAllocationViewMembersColumnData");
                settingsMap.put("personId",sPersonOID);
				settingsMap.put("personState", state);
                settingsMap.put("Sortable","false");
                settingsMap.put("Width","200");
                settingsMap.put("Group Header", strI18nMember);
                settingsMap.put("Export", "true");
                settingsMap.put("Auto Filter", "false");
                settingsMap.put("Project Policy", projectPolicy);
				settingsMap.put("isCallForDataGrid", isCallForDataGrid);

                Map mColumn = new HashMap();
                //mColumn.put("name",sFirstName+" "+sLastName);
                mColumn.put("name",sPersonOID);
                mColumn.put("label",sbLabel.toString());
                mColumn.put("expression","id");
                mColumn.put("select","id");
                mColumn.put("settings",settingsMap);

                mlResult.add(mColumn);

                slProjectMembersIdList.add(sPersonOID);
            }

            //Removing project Members from the list and keeps only external members.
            int tempSize = mlExternalMembers.size();
            for (int i = 0; i < tempSize; i++) {
            	Map externalMemberMap = (Map) mlExternalMembers.get(i);
            	String externalMemberId = (String) externalMemberMap.get(ProgramCentralConstants.SELECT_ID);
            	if (slProjectMembersIdList.contains(externalMemberId)) {
            		mlExternalMembers.remove(externalMemberMap);
            		i--;
            		tempSize--;
            	}
            }

            mlExternalMembers.sort(Person.SELECT_FIRST_NAME, ProgramCentralConstants.DESCENDING_SORT, ProgramCentralConstants.SORTTYPE_STRING);
            mlExternalMembers.sort(Person.SELECT_LAST_NAME, ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_STRING);

            for (int j = 0; j < mlExternalMembers.size(); j++) {
            	Map externalMemberMap = (Map) mlExternalMembers.get(j);
                String sName = (String) externalMemberMap.get(DomainConstants.SELECT_NAME);
                String sPersonOID = (String) externalMemberMap.get(DomainConstants.SELECT_ID);
                sPersonOID = sPersonOID.contains("personid_")?sPersonOID.replace("personid_", "") : sPersonOID;
                String sFirstName = (String) externalMemberMap.get(Person.SELECT_FIRST_NAME);
                String sLastName = (String) externalMemberMap.get(Person.SELECT_LAST_NAME);
				String state = (String) externalMemberMap.get(Person.SELECT_CURRENT);
                String sRole = (String) externalMemberMap.get(MemberRelationship.SELECT_PROJECT_ROLE);

				String type = (String) externalMemberMap.get(DomainConstants.SELECT_TYPE);
				String title = (String) externalMemberMap.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
                String sImage = emxUtilBase_mxJPO.getPrimaryImageURL(context, args, sPersonOID, "mxThumbnail Image",sMCSURL,noPictureURL);
				String fullName = null;
				if(DomainConstants.TYPE_GROUP.equalsIgnoreCase(type) || ProgramCentralConstants.TYPE_GROUP_PROXY.equalsIgnoreCase(type)){
					sImage = emxUtilBase_mxJPO.getPrimaryImageURL(context, args, sPersonOID, "mxThumbnail Image",sMCSURL, userGroupPictureURL);
					fullName = title;
				} else {
					fullName = sLastName.toUpperCase() + " " + sFirstName;
				}

                if(ProgramCentralUtil.isNotNullString(sRole)) {
                    sRole = EnoviaResourceBundle.getRangeI18NString(context, ProgramCentralConstants.ATTRIBUTE_PROJECT_ROLE, sRole, sLang) + " ";
                } else {
                	sRole = ProgramCentralConstants.EMPTY_STRING;
                }

                StringBuffer sbLabel = new StringBuffer();
                sbLabel.append("<img style='height:42px;float:left;margin-right:3px;border:1px solid #bababa;' src='").append(sImage).append("'/>");
                sbLabel.append(fullName).append("<br/>");
                sbLabel.append(sRole);

                HashMap settingsMap = new HashMap();
                settingsMap.put("Column Type","programHTMLOutput");
                settingsMap.put("program","emxProgramUI");
                settingsMap.put("function","getAllocationViewMembersColumnData");
                settingsMap.put("personId",sPersonOID);
				settingsMap.put("personState", state);
                settingsMap.put("Sortable","false");
                settingsMap.put("Width","200");
                settingsMap.put("Group Header", strI18nNonMember);
                settingsMap.put("Export", "true");
                settingsMap.put("Auto Filter", "false");
                settingsMap.put("Project Policy", projectPolicy);
				settingsMap.put("isCallForDataGrid", isCallForDataGrid);

                Map mColumn = new HashMap();
                //mColumn.put("name",sFirstName+" "+sLastName);
                mColumn.put("name",sPersonOID);
                mColumn.put("label",sbLabel.toString());
                mColumn.put("expression","id");
                mColumn.put("select","id");
                mColumn.put("settings",settingsMap);

                mlResult.add(mColumn);
            }
        } catch(Exception exception){
        	exception.printStackTrace();
        	throw exception;
        }

        return mlResult;
    }


    /**
     * It gives assignment status details for each member of the Project.
     *
     * @param context  the eMatrix <code>Context</code> object
     * @param args
     * @return assignment status details of all project members.
     * @throws Exception if operation fails
     */
    public Vector getAssignmentViewMembersColumnData(Context context, String[] args) throws Exception {

        Vector vResult = new Vector();

        Map paramMap = (Map) JPO.unpackArgs(args);
        Map paramList = (Map)paramMap.get("paramList");
        String exportFormat = (String)paramList.get("exportFormat");
        MapList mlObjects = (MapList) paramMap.get("objectList");
        HashMap columnMap = (HashMap) paramMap.get("columnMap");
        HashMap settings = (HashMap) columnMap.get("settings");
        String sOIDPerson = (String) settings.get("personId");
		String sOIDPersonState = (String) settings.get("personState");
        String sProjectPolicy = (String) settings.get("Project Policy");
        String isCallForDataGrid = (String) settings.get("isCallForDataGrid");
        String sLanguage = (String)paramList.get("languageStr");

		String parentPrj=(String)paramList.get("parentOID");

        String sCompleted = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Completed", sLanguage);
        String sLabelAssign = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Assign", sLanguage);
        String sLabelUnassign = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Unassign", sLanguage);
        String sLabelAssigned = EnoviaResourceBundle.getProperty(context, "Components", "emxComponents.Common.Assigned", sLanguage);
		
		String selectedProgram = (String)paramList.get("selectedProgram");
		boolean isPassiveTaskProgramSelected =selectedProgram!=null && selectedProgram.contains("getPassiveSubtasks");

        //StringList slStyle = getAllocationStyle(context, args, sOIDPerson);
        final String SELECT_RELATIONSHIP_ID = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].id";
        final String SELECT_ASSIGNEE_ID = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].from.id";

        StringList objSelects = new StringList();
        objSelects.add(ProgramCentralConstants.SELECT_ID);
		objSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
        objSelects.add(ProgramCentralConstants.SELECT_CURRENT);
        objSelects.add(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
        objSelects.add(SELECT_RELATIONSHIP_ID);
        objSelects.add(SELECT_ASSIGNEE_ID);

        try{
			StringList passiveTaskIdList = new StringList();
        	String[] objIdArr = new String[mlObjects.size()];
        	for (int i = 0; i < mlObjects.size(); i++) {
        		Map mObject = (Map) mlObjects.get(i);
                objIdArr[i] = (String)mObject.get(ProgramCentralConstants.SELECT_ID);
				String seqId = mObject != null ? (String) mObject.get("seqId") : DomainConstants.EMPTY_STRING;
				if(ProgramCentralUtil.isNullString(seqId) && isPassiveTaskProgramSelected) {
					passiveTaskIdList.add((String)mObject.get(ProgramCentralConstants.SELECT_PHYSICALID));
				}
        	}

        	MapList taskInfoMapList = DomainObject.getInfo(context, objIdArr, objSelects);
        	for (int i = 0; i < taskInfoMapList.size(); i++){

        		String sResult = "";
        		String sRelId = "";
                Boolean bIsAssigned = false;

                Map mObject = (Map) mlObjects.get(i);
                String sRowID = (String)mObject.get("id[level]");
                String sOID = (String)mObject.get(ProgramCentralConstants.SELECT_ID);
				String physicalId = (String)mObject.get(ProgramCentralConstants.SELECT_PHYSICALID);

        		Map taskInfoMap = (Map) taskInfoMapList.get(i);

        		StringList slAssigneeList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_ASSIGNEE_ID));
        		StringList slRelIdList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_RELATIONSHIP_ID));

                String sCurrent = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_CURRENT);
        		String sIsTaskMgmtType = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
				if( "true".equalsIgnoreCase(sIsTaskMgmtType) && !passiveTaskIdList.contains(physicalId)) {

                    String sStyleComplete = "style='color:#FFF;background-color:#d1d4d4;font-weight:normal;min-width:90px;width=100%;text-align:center;vertical-align:middle;height:20px;line-height:20px;padding:0px;margin:0px;font-style:oblique'";
                    String sStyleAssigned = "style='color:#FFF;background-color:#77797c;font-weight:normal;min-width:90px;width=100%;text-align:center;vertical-align:middle;height:20px;line-height:20px;padding:0px;margin:0px;'";
                    String sStyleUnassigned = "style='font-weight:normal;min-width:90px;width=100%;text-align:center;vertical-align:middle;height:20px;line-height:20px;padding:0px;margin:0px;color:transparent;'";
                    StringBuilder sbResult = new StringBuilder();

                    if(slAssigneeList.size() > 0 && slAssigneeList.contains(sOIDPerson)) {
                        bIsAssigned = true;
                        sResult = "Assigned" + sResult;
                        int index = slAssigneeList.indexOf(sOIDPerson);
                    	sRelId = (String) slRelIdList.get(index);
                    }

                    if( !ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equals(sCurrent) && !"Inactive".equalsIgnoreCase(sOIDPersonState)) {

                        if(bIsAssigned) {

                    		if("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat)){
                    			sbResult.append(sLabelAssigned);
                    		} else {
                            sbResult.append("<div ");
                            sbResult.append(sStyleAssigned);
                            sbResult.append(" onmouseout='this.style.background=\"#77797c\";this.style.color=\"#FFF\";this.style.fontWeight=\"normal\"; this.innerHTML=\"").append(sLabelAssigned).append("\"'");
                            if(!ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL.equalsIgnoreCase(sProjectPolicy)){
                            if("true".equalsIgnoreCase(isCallForDataGrid)) {
                            	sbResult.append(" onclick='window.open(\"../../programcentral/emxProgramCentralUtil.jsp?mode=wbsAssignmentView&amp;isCallForDataGrid=true&amp;subMode=unassign&amp;relationship=" + ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS + "&amp;from=false&amp;objectId=" + sOID + "&amp;rowId=" + sRowID + "&amp;relId=" + sRelId + "&amp;personId=" + sOIDPerson + "\", \"listHidden\", \"\", true);'");
                            } else {
                            sbResult.append(" onclick='window.open(\"../programcentral/emxProgramCentralUtil.jsp?mode=wbsAssignmentView&amp;subMode=unassign&amp;relationship=" + ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS + "&amp;from=false&amp;objectId=" + sOID + "&amp;rowId=" + sRowID + "&amp;relId=" + sRelId + "&amp;personId=" + sOIDPerson + "\", \"listHidden\", \"\", true);'");
                            }
                            sbResult.append(" onmouseover='this.style.background=\"#CC092F\"; this.style.color=\"#FFF\";this.style.fontWeight=\"normal\"; this.style.cursor=\"pointer\"; this.innerHTML=\"").append(sLabelUnassign).append("\"'");
                            }
                            sbResult.append(">").append(sLabelAssigned).append("</div> ");
                    		}
                        } else {
                    		if(!("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat))){
                            sbResult.append("<div ");
                            sbResult.append(sStyleUnassigned);
                            sbResult.append("  onmouseout='this.style.background=\"transparent\";this.style.color=\"transparent\";this.style.fontWeight=\"normal\"; this.innerHTML=\"-\"'");
                            if(!ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL.equalsIgnoreCase(sProjectPolicy)){
                            	  if("true".equalsIgnoreCase(isCallForDataGrid)) {
                            		  sbResult.append("  onclick='window.open(\"../../programcentral/emxProgramCentralUtil.jsp?mode=wbsAssignmentView&amp;isCallForDataGrid=true&amp;subMode=assign&amp;relationship="+ ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS + "&amp;from=false&amp;objectId=" + sOID + "&amp;rowId=" + sRowID + "&amp;personId=" + sOIDPerson + "\", \"listHidden\", \"\", true);'");                            		  
                            	  } else {
                            sbResult.append("  onclick='window.open(\"../programcentral/emxProgramCentralUtil.jsp?mode=wbsAssignmentView&amp;subMode=assign&amp;relationship="+ ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS + "&amp;from=false&amp;objectId=" + sOID + "&amp;rowId=" + sRowID + "&amp;personId=" + sOIDPerson + "\", \"listHidden\", \"\", true);'");
                            	  }
                            sbResult.append(" onmouseover='this.style.background=\"#6FBC4B\";    this.style.color=\"#FFF\";this.style.fontWeight=\"normal\"; this.style.cursor=\"pointer\"; this.innerHTML=\"").append(sLabelAssign).append("\"'");
                            }
                            sbResult.append(">-</div>");
                        }
                    	}
                    }else if(slAssigneeList.size() > 0 && slAssigneeList.contains(sOIDPerson) && !ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equals(sCurrent)){
						if("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat)){
                    		  sbResult.append(sLabelAssigned);
                		} else {
                    	sbResult.append("<div ").append(sStyleAssigned).append(">");
                        sbResult.append(sLabelAssigned).append("</div>");
                		}
					} else if(slAssigneeList.size() > 0 && slAssigneeList.contains(sOIDPerson)){
                    	if("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat)){
                    		  sbResult.append(sCompleted);
                		} else {
                    	sbResult.append("<div ").append(sStyleComplete).append(">");
                        sbResult.append(sCompleted).append("</div>");
                		}
                    }
                    sResult = sbResult.toString();
                }
                vResult.add(sResult);
        	}
        } catch(Exception exception){
        	exception.printStackTrace();
        }

        return vResult;
    }


    /**
     * It gives allocation status details of each member of the Project.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @return allocation status details of all the members.
     * @throws Exception if operation fails
     */
    public Vector getAllocationViewMembersColumnData(Context context, String[] args) throws Exception {

        Vector vResult = new Vector();

        Map paramMap = (Map) JPO.unpackArgs(args);
        MapList mlObjects = (MapList) paramMap.get("objectList");
        HashMap columnMap = (HashMap) paramMap.get("columnMap");
        HashMap settings = (HashMap) columnMap.get("settings");
        String sOIDPerson = (String) settings.get("personId");
		String sOIDPersonState = (String) settings.get("personState");
        String sProjectPolicy = (String) settings.get("Project Policy");
		String isCallForDataGrid = (String) settings.get("isCallForDataGrid");
		
        Map paramList = (Map) paramMap.get("paramList");
        String exportFormat = (String)paramList.get("exportFormat");
        String projectID=(String)paramList.get("parentOID");


        final String SELECT_RELATIONSHIP_ID = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].id";
        final String SELECT_ASSIGNEE_ID = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].from.id";
        final String SELECT_PERCENT_ALLOCATION = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].attribute["+
												 ProgramCentralConstants.ATTRIBUTE_PERCENT_ALLOCATION+"].value";
												 
		String selectedProgram = (String)paramList.get("selectedProgram");
		boolean isPassiveTaskProgramSelected = selectedProgram!=null && selectedProgram.contains("getPassiveSubtasks");

        StringList objSelects = new StringList();
        objSelects.add(ProgramCentralConstants.SELECT_ID);
		objSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
        objSelects.add(ProgramCentralConstants.SELECT_CURRENT);
        objSelects.add(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
        objSelects.add(SELECT_RELATIONSHIP_ID);
        objSelects.add(SELECT_ASSIGNEE_ID);
        objSelects.add(SELECT_PERCENT_ALLOCATION);

        try{
			StringList passiveTaskIdList = new StringList();
        	String[] objIdArr = new String[mlObjects.size()];
        	for (int i = 0; i < mlObjects.size(); i++) {
        		Map mObject = (Map) mlObjects.get(i);
                objIdArr[i] = (String)mObject.get(ProgramCentralConstants.SELECT_ID);
				String seqId = mObject != null ? (String) mObject.get("seqId") : DomainConstants.EMPTY_STRING;
				if(ProgramCentralUtil.isNullString(seqId) && isPassiveTaskProgramSelected) {
					passiveTaskIdList.add((String)mObject.get(ProgramCentralConstants.SELECT_ID));
				}
        	}

        	MapList taskInfoMapList = DomainObject.getInfo(context, objIdArr, objSelects);

        	for (int i = 0; i < taskInfoMapList.size(); i++) {

        		String sResult = "";

        		String sRelId = "";
                String sText = "";
                double dAllocation = 0.0;
                String sPercentage = "";
                String[] aContents = {"", "", "", "", "", "", "", "", "", "", ""}; // for {"0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"};

                Map taskInfoMap = (Map) taskInfoMapList.get(i);

                StringList slAssigneeList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_ASSIGNEE_ID));
        		StringList slRelIdList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_RELATIONSHIP_ID));
        		StringList slPercentAllocationList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_PERCENT_ALLOCATION));

        		Map mObject = (Map) mlObjects.get(i);

                String sRowID = (String)mObject.get("id[level]");
                String sOID = (String)mObject.get(ProgramCentralConstants.SELECT_ID);
                String physicalId = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_PHYSICALID);
                String sCurrent = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_CURRENT);
                String sIsTaskMgmtType = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);

                String elementId = sOIDPerson.replace(".", "") + sRowID.replace(",", "");

				if("true".equalsIgnoreCase(sIsTaskMgmtType) && !passiveTaskIdList.contains(physicalId)) {

                    String sStyleTable = "width:100%;height:40px;";
                    StringBuilder sbStyle = new StringBuilder();
                    StringBuilder sbScriptTable = new StringBuilder();
                    sbScriptTable.append(" onmouseover='if(document.getElementById(\"cancelMarker" + elementId + "\")) document.getElementById(\"cancelMarker" + elementId + "\").style.visibility=\"visible\";");
                    sbScriptTable.append(" document.getElementById(\"percentageMarker" + elementId + "\").style.visibility=\"visible\";'");
                    sbScriptTable.append(" onmouseout='if(document.getElementById(\"cancelMarker" + elementId + "\")) document.getElementById(\"cancelMarker" + elementId + "\").style.visibility=\"hidden\";");
                    sbScriptTable.append(" document.getElementById(\"percentageMarker" + elementId + "\").style.visibility=\"hidden\";'");
                    String sLabel = "";

                    if(slAssigneeList.size() > 0 && slAssigneeList.contains(sOIDPerson)) {

                    	int index = slAssigneeList.indexOf(sOIDPerson);
                    	sRelId = (String)slRelIdList.get(index);
                        String sPercent = (String)slPercentAllocationList.get(index);

                        double dValue = Task.parseToDouble(sPercent)/10;
                        dValue = Math.round(dValue)/ 1d;
                        dAllocation = (dValue/10);
                        sPercentage = String.valueOf(dValue);
                        if(sPercentage.contains(".")) {
                            sPercentage = sPercentage.substring(0, sPercentage.indexOf("."));
                        }

                        sbStyle.append("padding-right:5px;");
                        sbStyle.append("font-size:7pt;");
                        sbStyle.append("color:#FFF;");
                        sbStyle.append("text-shadow: 1px 1px 1px #111;");
                        sbStyle.append("border:1px solid #5f747d;");
                        sbStyle.append("background:-ms-linear-gradient(left,  #5f747d 0%, #5f747d ").append(dAllocation * 100).append("%, #abb8bd ").append(dAllocation).append("%);");
                        sbStyle.append("background:-moz-linear-gradient(left,  #5f747d 0%, #5f747d ").append(dAllocation * 100).append("%, #abb8bd ").append(dAllocation).append("%);");
                        sbStyle.append("background:-webkit-linear-gradient(left,  #5f747d 0%, #5f747d ").append(dAllocation * 100).append("%, #abb8bd ").append(dAllocation).append("%);");

                        sLabel = sPercentage + "0%";

                    }

                    String sURLPrefix = "<a href='../programcentral/emxProgramCentralUtil.jsp?mode=wbsAllocationView&amp;subMode=allocate&amp;objectId=";
					if("true".equalsIgnoreCase(isCallForDataGrid)) {
						sURLPrefix = "<a href='../../programcentral/emxProgramCentralUtil.jsp?mode=wbsAllocationView&amp;subMode=allocate&amp;isCallForDataGrid=true&amp;objectId=";
					}
					sURLPrefix = sURLPrefix + sOID + "&amp;rowId=" + sRowID + "&amp;personId=" + sOIDPerson + "&amp;relId=" + sRelId + "&amp;relationship="+ ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS +"&amp;percent=";
					
                    String sURLSuffix = "' target='listHidden' style='font-size:6pt;'>";
                    String sStylePercentage = "style='text-align:center;font-size:6pt;' width='17px'";
                    String sStyleSelected = "style='color:#FFF;text-align:center;font-size:6pt;background:#5f747d;' width='17px'";

                    if( !ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL.equalsIgnoreCase(sProjectPolicy) && !ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equals(sCurrent) && !"Inactive".equalsIgnoreCase(sOIDPersonState)) {

                    	if(!sPercentage.equals("0")) {
                    		aContents[0] = sURLPrefix +   "0.0' style='color:#cc0000 !important;" + sURLSuffix +  "X</a>";
                    	}
                        if(!sPercentage.equals("1")) {
                        	aContents[1] = sURLPrefix +  "10.0" + sURLSuffix +  "10</a>";
                        }
                        if(!sPercentage.equals("2")) {
                        	aContents[2] = sURLPrefix +  "20.0" + sURLSuffix +  "20</a>";
                        }
                        if(!sPercentage.equals("3")) {
                        	aContents[3] = sURLPrefix +  "30.0" + sURLSuffix +  "30</a>";
                        }
                        if(!sPercentage.equals("4")) {
                        	aContents[4] = sURLPrefix +  "40.0" + sURLSuffix +  "40</a>";
                        }
                        if(!sPercentage.equals("5")) {
                        	aContents[5] = sURLPrefix +  "50.0" + sURLSuffix +  "50</a>";
                        }
                        if(!sPercentage.equals("6")) {
                        	aContents[6] = sURLPrefix +  "60.0" + sURLSuffix +  "60</a>";
                        }
                        if(!sPercentage.equals("7")) {
                        	aContents[7] = sURLPrefix +  "70.0" + sURLSuffix +  "70</a>";
                        }
                        if(!sPercentage.equals("8")) {
                        	aContents[8] = sURLPrefix +  "80.0" + sURLSuffix +  "80</a>";
                        }
                        if(!sPercentage.equals("9")) {
                        	aContents[9] = sURLPrefix +  "90.0" + sURLSuffix +  "90</a>";
                        }
                        if(!sPercentage.equals("10")){
                        	aContents[10] = sURLPrefix + "100.0" + sURLSuffix + "100</a>";
                        }
                        if(sPercentage.equals("")) {
                        	aContents[0] = "";
                        }

                        if(slAssigneeList.size() > 0 && slAssigneeList.contains(sOIDPerson)) {
                            sText  = sURLPrefix + "0.0" +sURLSuffix + "<img id='cancelMarker"+ elementId;
                            if( "true".equalsIgnoreCase(isCallForDataGrid)) {
                            	sText  = sText+"' style='margin-right:4px;visibility:hidden;' border='0' src='../../common/images/buttonMiniCancel.gif' /></a>";
                            } else {
                            	sText  = sText+"' style='margin-right:4px;visibility:hidden;' border='0' src='../common/images/buttonMiniCancel.gif' /></a>";
                            }
                            sLabel = sPercentage + "0%";
                        }
                    }

                    StringBuilder sbResult = new StringBuilder();
                    if(!("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat) || "text".equalsIgnoreCase(exportFormat))){
                    sbResult.append("<table style='" + sStyleTable + "'" + sbScriptTable + ">");
                    sbResult.append("<tr style='border:1px solid transparent;'><td colspan='10' style='text-align:right;" + sbStyle.toString() + "line-height:18px;height:18px;vertical-align:middle;font-weight:bold;'>" + sText  + sLabel + "</td></tr>");
                    sbResult.append("<tr style='visibility:hidden;' id='percentageMarker" + elementId +"'>");

                    if(sPercentage.equals("1")) {
                    	sbResult.append("<td " + sStyleSelected + ">10</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[1] + "</td>");
                    }

                    if(sPercentage.equals("2")) {
                    	sbResult.append("<td " + sStyleSelected + ">20</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[2] + "</td>");
                    }

                    if(sPercentage.equals("3")) {
                    	sbResult.append("<td " + sStyleSelected + ">30</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[3] + "</td>");
                    }

                    if(sPercentage.equals("4")) {
                    	sbResult.append("<td " + sStyleSelected + ">40</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[4] + "</td>");
                    }

                    if(sPercentage.equals("5")) {
                    	sbResult.append("<td " + sStyleSelected + ">50</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[5] + "</td>");
                    }

                    if(sPercentage.equals("6")) {
                    	sbResult.append("<td " + sStyleSelected + ">60</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[6] + "</td>");
                    }

                    if(sPercentage.equals("7")) {
                    	sbResult.append("<td " + sStyleSelected + ">70</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[7] + "</td>");
                    }

                    if(sPercentage.equals("8")) {
                    	sbResult.append("<td " + sStyleSelected + ">80</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[8] + "</td>");
                    }

                    if(sPercentage.equals("9")) {
                    	sbResult.append("<td " + sStyleSelected + ">90</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[9] + "</td>");
                    }

                    if(sPercentage.equals("10")) {
                    	sbResult.append("<td " + sStyleSelected + ">100</td>");
                    } else {
                    	sbResult.append("<td " + sStylePercentage + ">" + aContents[10] + "</td>");
                    }

                    sbResult.append("</tr>");
                    sbResult.append("</table>");
                }else{
                	sbResult.append(sPercentage).append("0%");
                }
                    sResult = sbResult.toString();
                }
                vResult.add(sResult);
        	}
        } catch(Exception exception){
        	exception.printStackTrace();
        }

        return vResult;
    }


    /**
     * It returns sum of the percent allocation of all the assigned members of the project.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @return
     * @throws Exception if operation fails
     */
    public Vector getTaskTotalAllocation(Context context, String[] args) throws Exception {

        Vector vResult = new Vector();
        Map paramMap = (Map) JPO.unpackArgs(args);
        Map paramList = (Map)paramMap.get("paramList");
        String exportFormat = (String)paramList.get("exportFormat");

        MapList mlObjects = (MapList) paramMap.get("objectList");
        final String SELECT_PERCENT_ALLOCATION = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].attribute["+
												 ProgramCentralConstants.ATTRIBUTE_PERCENT_ALLOCATION+"].value";
		String selectedProgram = (String)paramList.get("selectedProgram");
		boolean isPassiveTaskProgramSelected = selectedProgram!=null && selectedProgram.contains("getPassiveSubtasks");

        StringList objSelects = new StringList();
        objSelects.add(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
        objSelects.add(SELECT_PERCENT_ALLOCATION);
        objSelects.add(ProgramCentralConstants.SELECT_ID);
        try {
        	StringList passiveTaskIdList = new StringList();
        	String[] objIdArr = new String[mlObjects.size()];
            for (int i = 0; i < mlObjects.size(); i++) {
            	Map mObject = (Map) mlObjects.get(i);
                objIdArr[i] = (String)mObject.get(ProgramCentralConstants.SELECT_ID);
                String seqId = mObject != null ? (String) mObject.get("seqId") : DomainConstants.EMPTY_STRING;
				if(ProgramCentralUtil.isNullString(seqId) && isPassiveTaskProgramSelected) {
					passiveTaskIdList.add((String)mObject.get(ProgramCentralConstants.SELECT_ID));
				}
            }

            MapList taskInfoMapList = DomainObject.getInfo(context, objIdArr, objSelects);

            for (int i = 0; i < taskInfoMapList.size(); i++) {

                String sResult          = "";
                double dTotal           = 0.0;

                Map taskInfoMap = (Map) taskInfoMapList.get(i);
                String isTaskMgmtType = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
                String objectId = (String) taskInfoMap.get(ProgramCentralConstants.SELECT_ID);

                if("true".equalsIgnoreCase(isTaskMgmtType) && !passiveTaskIdList.contains(objectId)) {

                	StringList slPercentAllocationList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_PERCENT_ALLOCATION));

                	for (int j = 0; j < slPercentAllocationList.size(); j++) {
                        String sPercent = (String) slPercentAllocationList.get(j);
                        double dPercent = Task.parseToDouble(sPercent);
                        dTotal += dPercent;
                	}
                        sResult = String.valueOf(dTotal) + " %";
                        if(!("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat) || "text".equalsIgnoreCase(exportFormat))){
                        sResult = "<span style='text-align:right;'>" + sResult + "</span>";
                }
                }
                vResult.add(sResult);
            }
        } catch (Exception exception) {
        	exception.printStackTrace();
        	throw exception;
        }

        return vResult;
    }

	@com.matrixone.apps.framework.ui.ProgramCallable
	public static MapList getTaskManagementStatesForDataGrid(Context context, String[] args)throws Exception
	{
		HashMap programMap = (HashMap) JPOUtil.unpackArgs(args);
		
		MapList returnMapList = new MapList();
        MapList objectList  = (MapList) programMap.get("objectList");
        int listSize = objectList.size();
		String strLan = context.getSession().getLanguage();
		
		String[] objectIds = new String[listSize];
		
        for(int k=0;k<listSize;k++){

			Map mapObjectInfo    = (Map)objectList.get(k);
    		String sObjectPolicy = (String) mapObjectInfo.get(ProgramCentralConstants.SELECT_POLICY);
    		if(ProgramCentralUtil.isNullString(sObjectPolicy))
    		{
    			throw new IllegalArgumentException("Policy Value is null");
    		}

    		StringList slStates = new StringList();
    		slStates =ProjectSpace.getStates(context, sObjectPolicy);

    		StringList sli18States = new StringList();

    		if(null != slStates)
    		{
    			int size = slStates.size();
    			for(int i=0; i< size; i++)
    			{
    				String sObjState  = (String)slStates.get(i);
    				String si18nState = "";
    				if(ProgramCentralUtil.isNotNullString(sObjState))
    				{
    					si18nState = i18nNow.getStateI18NString(sObjectPolicy, sObjState, strLan);

    					if(ProgramCentralUtil.isNullString(si18nState))
    					{
    						si18nState = sObjState;
    					}
    				}

    				sli18States.add(si18nState);
    			}
    		}

    		// [MODIFIED::PRG:RG6:Jan 20, 2011:IR-091708V6R2012 :R211::END]

    		Map returnMap = new HashMap();
    		returnMap.put("RangeValues", slStates);
    		returnMap.put("RangeDisplayValue", sli18States);
    		returnMapList.add(returnMap);
        }
		
		return returnMapList;
	}
	
	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static MapList getTaskManagementTypesForDataGrid(Context context, String[] args)throws Exception
	{
		Map programMap 	= (Map) JPOUtil.unpackArgs(args);
		
		MapList returnMapList = new MapList();
		MapList objectList  = (MapList) programMap.get("objectList");
		int listSize = objectList.size();

		StringList slTaskType = ProgramCentralUtil.getSubTypesList(context, ProgramCentralConstants.TYPE_TASK);
		StringList slPhaseType = ProgramCentralUtil.getSubTypesList(context, ProgramCentralConstants.TYPE_PHASE);
		
		StringList subTaskList = ProgramCentralUtil.getTaskSubTypesList(context);
		String language = context.getSession().getLanguage();
		
	    for(int k=0;k<listSize;k++){
	    	StringList slTaskTypesTranslated = new StringList();
	    	StringList slTaskTypes = new StringList();

	    	Map mapObjectInfo 	 = (Map)objectList.get(k);
			
			String isSummaryTask = (String) mapObjectInfo.get(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);

			slTaskTypes.addAll(subTaskList);
			if("true".equalsIgnoreCase(isSummaryTask)){
				StringList reviewTypeList = new StringList(2);
				reviewTypeList.addAll(slTaskType);
				reviewTypeList.addAll(slPhaseType);
				slTaskTypes.retainAll(reviewTypeList);
			}

			for (String taskType: slTaskTypes) {
				String i18nTaskTypeName = i18nNow.getTypeI18NString(taskType, language);
				slTaskTypesTranslated.add(i18nTaskTypeName);
			}
			
			Map returnMap = new HashMap();
			returnMap.put("RangeValues", slTaskTypes);
			returnMap.put("RangeDisplayValue", slTaskTypesTranslated);
	    	 
			returnMapList.add(returnMap);
	    }
		
		return returnMapList;
	}
	
	/**
	 * Gets Object specific Constraint Type Ranges in table PMCWBSViewTable FOR DATA GRID
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getConstraintTypeRangeForDataGrid(Context context, String[] args)
			throws Exception
	{
		Map programMap 	= (Map) JPOUtil.unpackArgs(args);
		MapList returnMapList = new MapList();
		MapList objectList  = (MapList) programMap.get("objectList");
		int listSize = objectList.size();
        String[] objectIds = new String[listSize];
        
		String sLanguage = context.getSession().getLanguage();
		
		String strAttributeInt = "";

		//final String ATTR_PROJECT_SCHEDULE_FROM_VAL = "attribute["+ProgramCentralConstants.ATTRIBUTE_PROJECT_SCHEDULE_FROM+"]";
		
		AttributeType taskDefaultConstraintType = new AttributeType(ProgramCentralConstants.ATTRIBUTE_DEFAULT_CONSTRAINT_TYPE);
		
		taskDefaultConstraintType.open(context);
		StringList slDefaultContraintType = taskDefaultConstraintType.getChoices(context);
		taskDefaultConstraintType.close(context);
		
		AttributeType taskConstraintType = new AttributeType(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE);
		
		taskConstraintType.open(context);
		StringList slTaskConstraintType = taskConstraintType.getChoices(context);
		taskConstraintType.close(context);
		
		StringList constraintTypeList = new StringList();
		for(int k=0;k<listSize;k++){
			Map objectInfo = (Map)objectList.get(k);
			boolean isTaskManagementObject = "True".equalsIgnoreCase((String)objectInfo.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT));
			boolean isSummaryTask = "True".equalsIgnoreCase((String)objectInfo.get(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK));
			String strProjectScheduledFrom = (String)objectInfo.get(ProgramCentralConstants.ATTRIBUTE_PROJECT_SCHEDULE_FROM);

			//If Project or Template then set attribute to "Default constraint Type" else "Task Constraint Type"
			if(!isTaskManagementObject){
				strAttributeInt = ProgramCentralConstants.ATTRIBUTE_DEFAULT_CONSTRAINT_TYPE;
				constraintTypeList = slDefaultContraintType;
			}else{
				strAttributeInt = ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE;
				constraintTypeList = slTaskConstraintType;
				
			}

			StringList slTaskConstraintsRanges = new StringList();
			StringList slTaskConstraintsRangesTranslated = new StringList();
			String i18nSelectedRole = null;

			//Below code creates Constraint Type Ranges for Project, Summary Tasks and Leaf Tasks.
			for(int i=0; i<constraintTypeList.size();i++){
				String strTaskConstraintRange = (String)constraintTypeList.get(i);
				if(isSummaryTask){
					if(ProgramCentralConstants.ATTRIBUTE_SCHEDULED_FROM_RANGE_START.equals(strProjectScheduledFrom)){
						if(strTaskConstraintRange.equals(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ASAP) || strTaskConstraintRange.equals(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_FNLT) || strTaskConstraintRange.equals(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_SNET)){
							slTaskConstraintsRanges.add(strTaskConstraintRange);
							slTaskConstraintsRangesTranslated.add(i18nNow.getRangeI18NString(strAttributeInt, strTaskConstraintRange, sLanguage));
						}
					}else{
						if(strTaskConstraintRange.equals(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ALAP) || strTaskConstraintRange.equals(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_FNLT) || strTaskConstraintRange.equals(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_SNET)){
							slTaskConstraintsRanges.add(strTaskConstraintRange);
							slTaskConstraintsRangesTranslated.add(i18nNow.getRangeI18NString(strAttributeInt, strTaskConstraintRange, sLanguage));
						}
					}
				}else{
					slTaskConstraintsRanges.add(strTaskConstraintRange);
					slTaskConstraintsRangesTranslated.add(i18nNow.getRangeI18NString(strAttributeInt, strTaskConstraintRange, sLanguage));
				}
			}

			Map returnMap = new HashMap(2);
			returnMap.put("RangeValues", slTaskConstraintsRanges);
			returnMap.put("RangeDisplayValue", slTaskConstraintsRangesTranslated);
	    	 
			returnMapList.add(returnMap);
	    }
		
		return returnMapList;
	}


	/**
	 * Returns reload range values of Percentage for particular item in WBS of Projects.
	 * @param context the eMatrix <code>Context</code> object
	 * @param args holds the following input arguments.
	 * @throws Exception if operation fails
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static MapList getPercentageRangeValuesForDataGrid(Context context, String[] args)throws Exception
	{
		Map programMap 	= (Map) JPOUtil.unpackArgs(args);
		
		MapList returnMapList = new MapList();
		MapList objectList  = (MapList) programMap.get("objectList");
		int listSize = objectList.size();
        String[] objectIds = new String[listSize];
		
        for(int j=0;j<listSize;j++){
            Map objectMap = (Map)objectList.get(j);
            String id = (String)objectMap.get(DomainObject.SELECT_ID);
            objectIds[j] = id;
		}
     
		String percentages = EnoviaResourceBundle.getProperty(context,"emxComponents.TaskPercentages");
		StringList slPercentages = FrameworkUtil.split(percentages, ",");
		
		StringList objectSelects = new StringList();
		objectSelects.add(ProgramCentralConstants.SELECT_POLICY);
		
		MapList objectInfoList = ProgramCentralUtil.getObjectDetails(context, objectIds, objectSelects, true);
		
		for(int k=0;k<listSize;k++){
			
			Map objectInfo = (Map)objectInfoList.get(k);
			String sObjectPolicy = (String)objectInfo.get(ProgramCentralConstants.SELECT_POLICY);

			StringList percentageList = new StringList();

			if(ProgramCentralConstants.POLICY_PROJECT_REVIEW.equalsIgnoreCase(sObjectPolicy)){
				percentageList.add("0.0");
				percentageList.add("100.0");
			}else{
				percentageList.addAll(slPercentages);
			}

			Map returnMap = new HashMap(2);
			returnMap.put("RangeValues", percentageList);
			returnMap.put("RangeDisplayValue", percentageList);
	    	 
			returnMapList.add(returnMap);
	    }
		

		return returnMapList;
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public Vector getTasksProgressBarForDataGrid(Context context, String[] args) throws Exception
	{
		long start = System.currentTimeMillis();

		Map programMap = (Map) JPOUtil.unpackArgs(args);
		MapList objectsMapList = (MapList) programMap.get("objectList");
		String invokeFrom 	= (String)programMap.get("invokeFrom"); //Added for ODT

		int objListSize = objectsMapList.size();
		String[] objIdArr = new String[objListSize];
		for (int i = 0; i < objListSize ; i++) {
			Map objectMap = (Map) objectsMapList.get(i);
			objIdArr[i] = (String) objectMap.get(ProgramCentralConstants.SELECT_ID);
		}

		Vector vResult = new Vector(objListSize);

		for (int i = 0; i < objListSize; i++) {
			Map bws = (Map)objectsMapList.get(i);
			String percentComplete 		= (String)bws.get(Task.SELECT_PERCENT_COMPLETE);
			String estimatedFinishDate 	= (String)bws.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE);
			String actualFinishDate 	= (String)bws.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
			String actualStartDate  	= (String)bws.get(Task.SELECT_TASK_ACTUAL_START_DATE);

			Map<String,String> taskMap = new HashMap();
			taskMap.put(Task.SELECT_PERCENT_COMPLETE, percentComplete);
			taskMap.put(Task.SELECT_TASK_ACTUAL_START_DATE, actualStartDate);
			taskMap.put(Task.SELECT_TASK_ACTUAL_FINISH_DATE, actualFinishDate);
			taskMap.put(Task.SELECT_TASK_ESTIMATED_FINISH_DATE, estimatedFinishDate);

			String value = ProgramCentralConstants.EMPTY_STRING;
			String color = ProgramCentralConstants.EMPTY_STRING;
			try {
				Map<String,String> statusInfo = Task.getTaskStatus(context, taskMap);
				value = statusInfo.get("value");
				color = statusInfo.get("colour");
			} catch (MatrixException e) {
				e.printStackTrace();
			}

			Double dPercent = 0.0;
			if(ProgramCentralUtil.isNotNullString(percentComplete)) {
				dPercent = Task.parseToDouble(percentComplete);
			}

			percentComplete = "<div style=\"border:1px solid #808080;height:18px;\"><div style=\"background:" + color + ";" + "height:100%;width:" + dPercent + "%;" + "\"> </div></div>";

			vResult.addElement(percentComplete);
		}

		DebugUtil.debug("Total time taken by getTasksProgressBar(programHTMLOutPut)::"+(System.currentTimeMillis()-start));
		return vResult;
	}

	public Vector getTasksDeliverablesForDataGrid(Context context, String[] args) throws Exception
	{
		long start 			= System.currentTimeMillis();
		HashMap programMap = (HashMap) JPOUtil.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
		HashMap paramList = (HashMap) programMap.get("paramList");
		HashMap columnMap = (HashMap) programMap.get("columnMap");
		HashMap settings = (HashMap) columnMap.get("settings");
		String sMaxItems = (String)settings.get("Max Items");
		String sIsHyperlink = (String)settings.get("isHyperlink");

		int iMaxItems = Integer.parseInt(sMaxItems);
		String strLanguage = context.getSession().getLanguage();
		String sErrMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Deliverable.CannotOpenPhysicalProduct", strLanguage);

		int size 		= objectList.size();
		Vector vResult 	= new Vector(size);

		Map<String,StringList> derivativeMap =
				ProgramCentralUtil.getDerivativeTypeListFromUtilCache(context,DomainObject.TYPE_TASK_MANAGEMENT,ProgramCentralConstants.TYPE_MILESTONE);

		StringList slTaskSubTypes = derivativeMap.get(DomainObject.TYPE_TASK_MANAGEMENT);
		//slTaskSubTypes.remove(ProgramCentralConstants.TYPE_MILESTONE);

		StringList mileStoneSubtypeList = derivativeMap.get(ProgramCentralConstants.TYPE_MILESTONE);
		//slTaskSubTypes.removeAll(mileStoneSubtypeList);

		try {
			for (int i = 0; i < size; i++) {

				StringBuilder sbResult = new StringBuilder();

				Map objectInfo = (Map)objectList.get(i);
				boolean isPasteOperation = objectInfo.containsKey("id[connection]") && ProgramCentralUtil.isNullString((String) objectInfo.get("id[connection]"));
				String sOID    = (String)objectInfo.get(ProgramCentralConstants.SELECT_ID);
				String sTaskType = (String)objectInfo.get(ProgramCentralConstants.SELECT_TYPE);

				StringList slDeliverablesIdList 			= (StringList)objectInfo.get(ProgramCentralConstants.SELECT_DELIVERABLE_ID);
				StringList slDeliverablesTypeList 			= (StringList)objectInfo.get(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE);
				StringList slDeliverablesIsKindOfDocument 			= (StringList)objectInfo.get(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE_IS_KINDOF_DOCUMENT);
				StringList slDeliverablesNameList 			= (StringList)objectInfo.get(ProgramCentralConstants.SELECT_DELIVERABLE_NAME);
				StringList slDeliverablesRevisionList 		= (StringList)objectInfo.get(ProgramCentralConstants.SELECT_DELIVERABLE_REVISION);
				StringList slDeliverablesModifiedDateList 	= (StringList)objectInfo.get(ProgramCentralConstants.SELECT_DELIVERABLE_MODIFIED_DATE);
				StringList slURLList                        = (StringList)objectInfo.get(ProgramCentralConstants.SELECT_DELIVERABLE_LINK_URL);

				if(slTaskSubTypes.contains(sTaskType)) {

					int iNoOfDeliverables = slDeliverablesIdList != null && !slDeliverablesIdList.isEmpty()?slDeliverablesIdList.size():0;
					//Convert taskInfoMap to a MapList of all the deliverables.
					MapList taskDeliverablesMapList = new MapList(iNoOfDeliverables);

					for (int j = 0; j < iNoOfDeliverables; j++) {

						Map taskDeliverableMap = new HashMap();

						taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_ID, slDeliverablesIdList.get(j));
						taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE, slDeliverablesTypeList.get(j));
						taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE_IS_KINDOF_DOCUMENT, slDeliverablesIsKindOfDocument.get(j));
						taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_NAME, slDeliverablesNameList.get(j));
						taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_REVISION, slDeliverablesRevisionList.get(j));
						taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_MODIFIED_DATE, slDeliverablesModifiedDateList.get(j));
						taskDeliverableMap.put(ProgramCentralConstants.SELECT_DELIVERABLE_LINK_URL, slURLList.get(j));

						taskDeliverablesMapList.add(taskDeliverableMap);
					}

					//Sort Deliverables
					taskDeliverablesMapList.sort(ProgramCentralConstants.SELECT_DELIVERABLE_MODIFIED_DATE,
							ProgramCentralConstants.DESCENDING_SORT,
							ProgramCentralConstants.SORTTYPE_DATE);

					// Apply limit
					int iTotalNoOfDeliverables = taskDeliverablesMapList.size();
					int iDeliverablesDisplayLimit = (iTotalNoOfDeliverables > iMaxItems) ? iMaxItems : iTotalNoOfDeliverables ;

					sbResult.append("<table");
					sbResult.append("><tr>");

					//Show Counter Link
					sbResult.append("<td style='vertical-align:middle;padding-right:5px;width:0px'>");
					sbResult.append("<div ");
					sbResult.append(" style='text-align:left;font-weight:bold;");

					//To hide hyperlink for Copy From Project functionality on search Result/Preview Table
					if("false".equalsIgnoreCase(sIsHyperlink) || isPasteOperation){
						sbResult.append("'>");
						sbResult.append(iTotalNoOfDeliverables);
					}else{
						sbResult.append("cursor: pointer;' ");
						sbResult.append("onmouseover='$(this).css(\"color\",\"#04A3CF\");$(this).css(\"text-decoration\",\"underline\");' onmouseout='$(this).css(\"color\",\"#333333\");$(this).css(\"text-decoration\",\"none\");' ");

						sbResult.append("onClick=\"emxTableColumnLinkClick('");
						sbResult.append("../../common/emxTree.jsp?DefaultCategory=PMCDeliverableCommandPowerView&amp;objectId=").append(sOID);
						sbResult.append("', '', '', false, 'content', '', '', '', '')\">");

						sbResult.append(iTotalNoOfDeliverables);
					}
					sbResult.append("</div>");
					sbResult.append("</td>");

					//Show Type-Icon Link
					Map<String,String> typeIconCacheMap = new HashMap<>(); 
					for(int j = 0; j < iDeliverablesDisplayLimit; j++) {

						Map mRelatedObject = (Map)taskDeliverablesMapList.get(j);
						String sObjectId = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_ID);
						String sType = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE);
						String isKindOfDocument = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_TYPE_IS_KINDOF_DOCUMENT);
						String i18Type = EnoviaResourceBundle.getTypeI18NString(context, sType, context.getSession().getLanguage());
						String sName = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_NAME);
						sName = XSSUtil.encodeForXML(context, sName);
						String sRevision = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_REVISION);
						String url = (String)mRelatedObject.get(ProgramCentralConstants.SELECT_DELIVERABLE_LINK_URL);

						String sIcon = typeIconCacheMap.get(sType);

						if(sIcon == null) {
							sIcon = UINavigatorUtil.getTypeIconProperty(context, sType);	
							typeIconCacheMap.put(sType, sIcon);
						}


						sbResult.append("<td ");
						if(isPasteOperation){
                    		sbResult.append(">");
                        }else if ("VPMReference".equalsIgnoreCase(sType)) {
							sbResult.append("onClick=\"javascript:alert('").append(sErrMsg).append("')\">");
						}else if(ProgramCentralConstants.TYPE_URL.equalsIgnoreCase(sType)){

							// rich text editor inputs while bookmark creation may affect the parsing so added try-catch for parsing url
							try{

								if (url.indexOf("://")==-1)
								{
									url = "http://" + url;
								}
								//Added for special character.
								//url	=	XSSUtil.encodeForHTML(context, url);
								url = URL.parseBookMarkHref(url);
								//Added for special character.
                        		url	=	XSSUtil.encodeForHTML(context, url);

								if("false".equalsIgnoreCase(sIsHyperlink) || isPasteOperation){
									sbResult.append(">");
								}else{
									sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
									sbResult.append("onClick=\"javascript:showModalDialog('"+url);
									sbResult.append("', '700', '600','true')\">");
									
									sbResult.append("<img style='vertical-align:middle;' src='../../common/images/").append(sIcon).append("'");
									sbResult.append(" title=\"");
									sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);                        
									sbResult.append("\" />");
								}
							} catch(Exception e){
								// rich text editor inputs while bookmark creation may affect the parsing so added try-catch for parsing url
							}
						}
                        else if("TRUE".equalsIgnoreCase(isKindOfDocument)){
							// add check for files
							String strMQLCmd = "print bus $1 select $2 dump $3;";
							String strHasFiles= MqlUtil.mqlCommand(context, strMQLCmd, sObjectId, "format.hasfile", ",");
							if (strHasFiles.equals("FALSE") || FrameworkUtil.split(strHasFiles, ",").contains("FALSE"))
							{
								sbResult.append("style='vertical-align:middle;padding-left:1px'>");
								sbResult.append("<a href='");
								sbResult.append("../../common/emxNavigator.jsp?isPopup=false&amp;objectId=").append(XSSUtil.encodeForURL(context,sObjectId));
								sbResult.append("' target='_blank'>");
								sbResult.append("<img style='vertical-align:middle;' src='../../common/images/").append(sIcon).append("'");
								sbResult.append(" title=\"");
								sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);
								sbResult.append("\" /></a>");

							}
							else // includes files
							{
								sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
								sbResult.append("onClick=\"javascript:callCheckout('").append(sObjectId).append("',");
								sbResult.append("'download', '', '', 'null', 'null', 'structureBrowser', 'PMCPendingDeliverableSummary', 'null')\">");
								sbResult.append("<img style='vertical-align:middle;' src='../../common/images/").append(sIcon).append("'");
								sbResult.append(" title=\"");
								sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);
								sbResult.append("\" />");

							}
                        }else {
                        	sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
                        	sbResult.append("onClick=\"emxTableColumnLinkClick('");
                        	sbResult.append("../../common/emxNavigator.jsp?objectId=").append(sObjectId);
                        	sbResult.append("', '', '', false, 'popup', '', '', '', '')\">");
							sbResult.append("<img style='vertical-align:middle;' src='../../common/images/").append(sIcon).append("'");
							sbResult.append(" title=\"");
							if(ProgramCentralConstants.TYPE_URL.equalsIgnoreCase(sType)){
								sbResult.append(url);
							}else{
								sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);
							}
							sbResult.append("\" />");

                        }
                        sbResult.append("</td>");

					}
					sbResult.append("</tr></table>");

					vResult.add(sbResult.toString());
				} else {
					vResult.add(ProgramCentralConstants.EMPTY_STRING);
				}
			}

		} catch(Exception ex) {
			ex.printStackTrace();
		}

		DebugUtil.debug("Total Time getTasksDeliverables(programHTMLOutput)::"+(System.currentTimeMillis()-start));

		return vResult;

	}

	public StringList getIDColumnValueForDataGrid(Context context,String[]args)throws Exception
	{

		long start = System.currentTimeMillis();

		Map programMap 		= (Map) JPOUtil.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
		Map paramList 		= (Map) programMap.get("paramList");

		//Added for Flattened view
		String pageSize 		= (String)paramList.get("pageSize");
		String exportFormat 	= (String)paramList.get("exportFormat");
		boolean isFlattenedView = (pageSize != null && !pageSize.isEmpty())?true:false;

		String selectedProgram 		= (String)paramList.get("program");
		boolean isTaskDependencyView = (selectedProgram != null && selectedProgram.contains("getTaskDependencies"));

		int size = objectList.size();
		StringList palSeqIdList = new StringList(size);

		String parentObjId = (String)paramList.get("parentOID");
		if(parentObjId == null || parentObjId.isEmpty()) {
			parentObjId = (String)paramList.get("objectId");
		}

		if(parentObjId == null || parentObjId.isEmpty()) {
			return palSeqIdList;
		}

		//Get PAL objects
		String mqlCmd = "print bus $1 select $2 $3 dump";
		String rootNodePALPhysicalId = MqlUtil.mqlCommand(context, 
				true,
				true,
				mqlCmd, 
				true,
				parentObjId,
				ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT,
				ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);

		if(rootNodePALPhysicalId == null) {
			throw new Exception("Cotext object does not have PAL connection!");
		}

		Map<String,Map<String, Dataobject>> palCache = new HashMap<>(); //Cache Map
		ProjectSequence ps = new ProjectSequence(context,rootNodePALPhysicalId);
		int subProjectListSize = 0;

		List<Map<String,Object>> objectArrayList = objectList;	

		String[] objIds = new String[size];
		for (int i = 0; i < size; i++) {
			Map mapObject = (Map) objectList.get(i);
			String taskId = (String) mapObject.get(DomainObject.SELECT_ID);
			objIds[i] = taskId;
		}

		StringList busSel = new StringList(2);
		busSel.add(ProgramCentralConstants.SELECT_PHYSICALID);

		boolean hasSubProjects = false;
		Map<String, Dataobject> palSeqData = null;
		palSeqData = _taskSeqMap.get(rootNodePALPhysicalId);
		if(palSeqData == null) {
			palSeqData = ps.getSequenceData(context);
				_taskSeqMap.put(rootNodePALPhysicalId, palSeqData);
			}
			
			List<Dataobject> subProjects = ps.getProjects(context);
			hasSubProjects = subProjects.size() > 1 ;

			if(hasSubProjects || isTaskDependencyView) {
				busSel.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
			}

		long start1 = System.currentTimeMillis();
		BusinessObjectWithSelectList objectWithSelectList = null;
		if(size<500) {objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIds, busSel,true);}
		else {objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIds, busSel);}

		if(! isFlattenedView ) {
			//START: Added for experiment
			String objectId2 = (String)paramList.get("objectId2");
			boolean isComapreView = false;
			String object2PALPhysicalId = DomainConstants.EMPTY_STRING;
			if(ProgramCentralUtil.isNotNullString(objectId2)) {

				object2PALPhysicalId = MqlUtil.mqlCommand(context, 
						true,
						true,
						mqlCmd, 
						true,
						objectId2,
						ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT,
						ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);

				if(object2PALPhysicalId == null) {
					throw new Exception("Cotext object does not have PAL connection!");
				}

				ProjectSequence psExperiment = new ProjectSequence(context,object2PALPhysicalId);
				palSeqData.putAll(psExperiment.getSequenceData(context));
				isComapreView = true;
			}
			//END

			if(hasSubProjects || isTaskDependencyView) {

				String objectId2PALPhysicalId = object2PALPhysicalId;	
				List<BusinessObjectWithSelect> subProjectsPALIDList = objectWithSelectList.stream().filter(bws ->				
				!(rootNodePALPhysicalId.equalsIgnoreCase(bws.getSelectData(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK))
						|| (ProgramCentralUtil.isNotNullString(objectId2PALPhysicalId) 
								&& objectId2PALPhysicalId.equalsIgnoreCase(bws.getSelectData(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK)))))
						.collect(Collectors.toList());

				Set<String> subProjectPALIDSet = new HashSet<>();

				subProjectsPALIDList.stream().forEach(bws -> {
					String palID = bws.getSelectData(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK) ;
					if(ProgramCentralUtil.isNotNullString(palID)) {
						subProjectPALIDSet.add(palID);
					}
				});

				int subProjectIDSetSize = subProjectPALIDSet.size();

				if(subProjectIDSetSize > 0) {

					String[] palIds = new String[subProjectIDSetSize];
					subProjectPALIDSet.toArray(palIds);

					String SELECT_PROJECT_PHYSICALID_FROM_PAL = "from["+ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST+"].to.physicalid";

					busSel.clear();
					busSel.add(SELECT_PROJECT_PHYSICALID_FROM_PAL);
					busSel.add(ProgramCentralConstants.SELECT_PHYSICALID);

					BusinessObjectWithSelectList subProjectSelectList =
							ProgramCentralUtil.getObjectWithSelectList(context, palIds, busSel,true);
					for (BusinessObjectWithSelect bws : subProjectSelectList) {
						String subProjectPalId = bws.getSelectData(ProgramCentralConstants.SELECT_PHYSICALID);
						String subProjectPhysicalId = bws.getSelectData(SELECT_PROJECT_PHYSICALID_FROM_PAL);

						ProjectSequence subPal = new ProjectSequence(context, subProjectPalId);
						Map<String,Dataobject> subProjectPalData = subPal.getSequenceData(context);   
						subProjectPalData.remove(subProjectPhysicalId); //remove project data because it is already present in master project data.
						palSeqData.putAll(subProjectPalData);
					}  
				}
			}
		}

		for (BusinessObjectWithSelect bws : objectWithSelectList) {
			String taskPhysicalId = bws.getSelectData(ProgramCentralConstants.SELECT_PHYSICALID);
			Dataobject taskObj = palSeqData.get(taskPhysicalId);
			if(taskObj == null) {
				palSeqIdList.add("");
			}else {
				palSeqIdList.add((String)taskObj.getDataelements().get(ProgramCentralConstants.KEY_SEQ_ID));
			}
		}

		DebugUtil.debug("Total time taken by getIDColumnValue::("+size+")"+(System.currentTimeMillis()-start));

		return palSeqIdList;
	
	}


	@com.matrixone.apps.framework.ui.ProgramCallable
	public Object getTaskDependencyColumnForDataGrid(Context context, String[] args) throws Exception
	{
		long start 			= System.currentTimeMillis();
		HashMap programMap = (HashMap) JPOUtil.unpackArgs(args);
		MapList objectList = (MapList)programMap.get("objectList");
		Map paramList 		= (Map) programMap.get("paramList");

		String invokeFrom 	= (String)programMap.get("invokeFrom"); //Added for OTD

		Map<String,Map<String,Dataobject>> sequenceData = new HashMap<>();

		boolean isPrinterFriendly = false;
		String strPrinterFriendly = (String)paramList.get("reportFormat");
		if ( strPrinterFriendly != null ){
			isPrinterFriendly = true;
		}

		//Added for Flattened view
		String pageSize = (String)paramList.get("pageSize");
		boolean isFlattenedView = (pageSize != null && !pageSize.isEmpty())?true:false;

		//Identify the root node
		String parentObjId = (String)paramList.get("parentOID");
		if(parentObjId == null || parentObjId.isEmpty()) {
			parentObjId = (String)paramList.get("objectId");
		}

		/*String mqlCmd = "print bus $1 select $2 dump $3";
		String isTaskManagementObj = 
				MqlUtil.mqlCommand(context, true, true, mqlCmd, true,parentObjId,"type.kindof[Task Management]", "|");*/
		StringList busSelect = new StringList(3);
		busSelect.add(ProgramCentralConstants.SELECT_IS_TASK_MANAGEMENT);
		busSelect.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
		busSelect.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);

		BusinessObjectWithSelectList bowsl = ProgramCentralUtil.getObjectWithSelectList(context, new String[] {parentObjId}, busSelect,true);
		BusinessObjectWithSelect bows = bowsl.getElement(0);
		String isTaskManagementObj = bows.getSelectData(ProgramCentralConstants.SELECT_IS_TASK_MANAGEMENT);
		String palPhysicalId = bows.getSelectData(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
		if(ProgramCentralUtil.isNullString(palPhysicalId)) {
			palPhysicalId = bows.getSelectData(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
		}
		ProjectSequence prjSeq = new ProjectSequence(context, palPhysicalId);
		List<Dataobject> projects = prjSeq.getProjects(context);
		boolean hasSubProject = projects.size() > 1 ? true : false;

		//End

		//build an array of all the task ids from SB.
		int objSize = objectList.size();
		

		StringList projectAccessKeyIds = new StringList();

		if(!hasSubProject) {
			projectAccessKeyIds.add(palPhysicalId);
		}

		
		Vector results = new Vector(objSize);

		StringList predecessorTypes = new StringList();
		StringList predecessorLagTimes = new StringList();
		StringList predecessorLagTimeUnits = new StringList();
		StringList predecessorIds = new StringList();

		StringList projectAccessKeyIdsForPredecessor = new StringList();
		StringList predecessorTaskSequenceOrders = new StringList();
		//IR-504101
		StringList accessiblePredecessorIds = new StringList();

		Map palMapCache = new HashMap();
		String prjSpaceSubTypesHref = null;
		String prjConceptSubTypesHref = null;
		String prjTemplateSubTypesHref = null;

		StringBuilder value = new StringBuilder();
		//StringBuffer toolTip = new StringBuffer();

		for(int j=0, bsize = objSize; j <bsize ; j++){
			value.setLength(0);

			Map objectInfo = (Map)objectList.get(j);

			predecessorIds 					= (StringList)objectInfo.get(ProgramCentralConstants.SELECT_PREDECESSOR_PHYSICAL_IDS);

			int predesessorIdSize 			= predecessorIds == null ? 0 :predecessorIds.size();

			if (predesessorIdSize > 0 && !"".equals(((String)predecessorIds.get(0)).trim())){
				predecessorTypes 		= (StringList)objectInfo.get(Task.SELECT_PREDECESSOR_TYPES);
				predecessorLagTimes 	= (StringList)objectInfo.get(SELECT_PREDECESSOR_LAG_TIME_INPUT);
				predecessorLagTimeUnits = (StringList)objectInfo.get(SELECT_PREDECESSOR_LAG_TIME_UNITS);

				if(hasSubProject) {
					Object idList = objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
					if(idList instanceof String) {
						projectAccessKeyIds.add((String)idList);
					} else {
						projectAccessKeyIds 	= (StringList)idList;
					}

					//RELATIONSHIP_PROJECT_ACCESS_LIST is used to get projectAccessKeyIds if object is of ProjectSpace type
					if(projectAccessKeyIds== null || projectAccessKeyIds.isEmpty()){
					projectAccessKeyIds = (StringList)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
					}
				}

				//projectAccessKeyIdsForPredecessor = bws.getSelectDataList(SELECT_PROJECT_ACCESS_KEY_ID_FOR_PREDECESSOR);
				projectAccessKeyIdsForPredecessor = (StringList)objectInfo.get(SELECT_PROJECT_ACCESS_KEY_PHYSICAL_ID_FOR_PREDECESSOR);

				MapList depedencyList = new MapList();

				//if size of projectAccessKeyIdsForPredecessor is not same as size of predecessorIds, then task is depend on another Project. 
				//As we have added selectable for fetching PAL id of predecessor from task is using Project_Access_Key relationship, it will not fetch PAL id if predecessor is of type Project.
				boolean isPredecessorPalSizeSame = projectAccessKeyIdsForPredecessor != null && projectAccessKeyIdsForPredecessor.size() == predesessorIdSize;

				String projectAccessKeyId = (String) projectAccessKeyIds.get(0);
				for (int i=0; i < predesessorIdSize; i++){
					Map dependencyMap  = new HashMap();
					String predecessorId = (String) predecessorIds.get(i);
					String predecessorType = (String) predecessorTypes.get(i);
					String predecessorLagTime = (String) predecessorLagTimes.get(i);
					String predecessorLagTimeUnit = (String) predecessorLagTimeUnits.get(i);

					String projectAccessKeyIdForPredecessor =   isPredecessorPalSizeSame ?
							(String) projectAccessKeyIdsForPredecessor.get(i) : projectAccessKeyId;

							if(!sequenceData.containsKey(projectAccessKeyIdForPredecessor)){
								ProjectSequence ps = new ProjectSequence(context, projectAccessKeyIdForPredecessor);
								sequenceData.put(projectAccessKeyIdForPredecessor, ps.getSequenceData(context));
							}

							Map<String,Dataobject> projectSequenceData = sequenceData.get(projectAccessKeyIdForPredecessor);

							Dataobject taskDataObject = projectSequenceData.get(predecessorId);

							//external project dependency
							if( !isPredecessorPalSizeSame && taskDataObject == null ) {

								String mqlCmd = "print bus $1 select $2 $3 dump";
								projectAccessKeyIdForPredecessor = MqlUtil.mqlCommand(context, 
										true,
										true,
										mqlCmd, 
										true,
										predecessorId,
										ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK,
										ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);

								if(!sequenceData.containsKey(projectAccessKeyIdForPredecessor)) {

									ProjectSequence ps = new ProjectSequence(context, projectAccessKeyIdForPredecessor);
									Map<String, Dataobject> subProjectSequenceData = ps.getSequenceData(context);
									sequenceData.put(projectAccessKeyIdForPredecessor, subProjectSequenceData);
								}

								projectSequenceData = sequenceData.get(projectAccessKeyIdForPredecessor);
								taskDataObject = projectSequenceData.get(predecessorId);
							}

							String predecessorTaskSequenceOrder = ProgramCentralConstants.EMPTY_STRING;
							if(taskDataObject != null) {
								predecessorTaskSequenceOrder = (String)taskDataObject.getDataelements().get(ProgramCentralConstants.KEY_SEQ_ID);
							}

							if(ProgramCentralUtil.isNullString(predecessorTaskSequenceOrder)){
								predecessorTaskSequenceOrder = "0";
							}

							dependencyMap.put("PredecessorId", predecessorId);
							dependencyMap.put("PredecessorType", predecessorType);
							dependencyMap.put("PredecessorLagType", predecessorLagTime);
							dependencyMap.put("PredecessorLagTypeUnit", predecessorLagTimeUnit);
							dependencyMap.put("ProjectAccessKeyIdPredecessor", projectAccessKeyIdForPredecessor);
							dependencyMap.put("PredecessorTaskSequenceId", predecessorTaskSequenceOrder);
							depedencyList.add(dependencyMap);
				}

				depedencyList.sort("PredecessorTaskSequenceId", ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_INTEGER);

				for (int i=0, dSize=depedencyList.size(); i <dSize ; i++){
					String projectName = null;
					String externalProjectState = ProgramCentralConstants.EMPTY_STRING;

					Map dependencyMap = (Map)depedencyList.get(i);
					String predecessorId = (String) dependencyMap.get("PredecessorId");
					String predecessorType = (String) dependencyMap.get("PredecessorType");
					String predecessorLagTime = (String) dependencyMap.get("PredecessorLagType");
					String predecessorLagTimeUnit = (String) dependencyMap.get("PredecessorLagTypeUnit");
					//String projectAccessKeyId = (String) projectAccessKeyIds.get(0);
					String projectAccessKeyIdForPredecessor = (String) dependencyMap.get("ProjectAccessKeyIdPredecessor");
					String predecessorTaskSequenceOrder = (String) dependencyMap.get("PredecessorTaskSequenceId");

					String predecessorProjectType = (String) palMapCache.get(projectAccessKeyIdForPredecessor);

					boolean isFromProjectTemplate = false;
					if (predecessorProjectType == null){
						List<String> externalProjectSelectableList = new ArrayList<String>();
						externalProjectSelectableList.add(projectAccessKeyIdForPredecessor);
						externalProjectSelectableList.add("from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.type");
						externalProjectSelectableList.add("from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.name");
						externalProjectSelectableList.add("from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.current");
						externalProjectSelectableList.add("from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.type.kindof["+DomainObject.TYPE_PROJECT_TEMPLATE+"]");//type.kindof["+DomainObject.TYPE_PROJECT_TEMPLATE+"]
						externalProjectSelectableList.add(ProgramCentralConstants.SELECT_IS_GATE);
						externalProjectSelectableList.add("|");

						//PRG:RG6:R213:Mql Injection:parameterized Mql:17-Oct-2011:start
						String sCommandStatement = "print bus $1 select $2 $3 $4 $5 $6 dump $7";
						String output =  MqlUtil.mqlCommand(context,sCommandStatement,externalProjectSelectableList);
						if(ProgramCentralUtil.isNullString(output)||"false".equalsIgnoreCase(output)){
							try{
								ProgramCentralUtil.pushUserContext(context);
								output =  MqlUtil.mqlCommand(context,sCommandStatement,externalProjectSelectableList);
							}finally{
								ProgramCentralUtil.popUserContext(context);
							}
						}
						//PRG:RG6:R213:Mql Injection:parameterized Mql:17-Oct-2011:End
						StringList projectInfo = FrameworkUtil.split(output, "|");
						predecessorProjectType = (String) projectInfo.get(0);

						if("TRUE".equalsIgnoreCase((String)projectInfo.get(3)) && "FALSE".equalsIgnoreCase((String)projectInfo.get(4))){
							isFromProjectTemplate = true;
						}
						palMapCache.put(projectAccessKeyIdForPredecessor, predecessorProjectType);
						palMapCache.put("name:" + projectAccessKeyIdForPredecessor, projectInfo.get(1));
						palMapCache.put("current:"+ projectAccessKeyIdForPredecessor, projectInfo.get(2));
					}

					if (!projectAccessKeyId.equals(projectAccessKeyIdForPredecessor)){
						if("Experiment".equals(predecessorProjectType)){
							continue;
						}
						//dependent tasks are from different projects; prefix dependency label with project name.
						projectName = (String) palMapCache.get("name:" + projectAccessKeyIdForPredecessor);
						externalProjectState = (String)palMapCache.get("current:"+ projectAccessKeyIdForPredecessor);
					}

					if (i > 0){
						//seperate multiple dependencies with comma.
						//toolTip.append(",");
						value.append(",");
					}

					StringBuilder tip = new StringBuilder();
					if (projectName != null){
						//As we have changed ColumnType from  ProgramHTML to Program, no need to encode ProjectName value
						//projectName= XSSUtil.encodeForHTML(context,projectName);
						tip.append(projectName).append(":").append(predecessorTaskSequenceOrder).append(":").append(predecessorType);
					}else {
						tip.append(predecessorTaskSequenceOrder).append(":").append(predecessorType);
					}

					tip.append(Task.parseToDouble(predecessorLagTime) < 0 ? "" : "+");
					tip.append(predecessorLagTime).append(" ").append(predecessorLagTimeUnit);

					//toolTip.append(tip);
					value.append(tip.toString());
				}
			}
			results.add(value.toString());
		}


		DebugUtil.debug("Total time on getTaskDependencyColumn(programHTMLOutput)::"+(System.currentTimeMillis()-start));

		return results;
	}



	@com.matrixone.apps.framework.ui.ProgramCallable
	public Object getTaskSuccessorColumnForDataGrid(Context context, String[] args) throws Exception
	{
		long start = System.currentTimeMillis();
		HashMap programMap = (HashMap) JPOUtil.unpackArgs(args);
		MapList objectList = (MapList)programMap.get("objectList");
		Map paramList 		= (Map) programMap.get("paramList");
		String invokeFrom 	= (String)programMap.get("invokeFrom"); //Added for OTD

		Map<String,Map> sequenceData = new HashMap<>();

		boolean isPrinterFriendly = false;
		String strPrinterFriendly = (String)paramList.get("reportFormat");
		if ( strPrinterFriendly != null ){
			isPrinterFriendly = true;
		}

		//Added for Flattened view
		String pageSize = (String)paramList.get("pageSize");
		boolean isFlattenedView = (pageSize != null && !pageSize.isEmpty())?true:false;

		String parentObjId = (String)paramList.get("parentOID");
		if(parentObjId == null || parentObjId.isEmpty()) {
			parentObjId = (String)paramList.get("objectId");
		}

		String mqlCmd = "print bus $1 select $2 dump $3";
		String isTaskManagementObj = 
				MqlUtil.mqlCommand(context, true, true, mqlCmd, true,parentObjId,"type.kindof[Task Management]", "|");
		//End

		//build an array of all the task ids from SB.
		int objSize = objectList.size();


		//If the successor is project then following selectables are required to get the PAL id of successor project
		String SELECT_PROJECT_ACCESS_LIST_ID_FOR_SUCCESSOR = "to[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].from.to[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].from.id";
		String IS_SUCCESSOR_KINDOF_PROJECT = "to["+DomainConstants.RELATIONSHIP_DEPENDENCY+"].from.type.kindof["+DomainObject.TYPE_PROJECT_SPACE+"]";

		Vector results = new Vector(objSize);

		StringList successorTypes = new StringList();
		StringList successorLagTimes = new StringList();
		StringList successorLagTimeUnits = new StringList();
		StringList successorIds = new StringList();
		StringList projectAccessKeyIds = new StringList();
		StringList projectAccessKeyIdsForSuccessor = new StringList();
		StringList projectAccessListIdsForSuccessor = new StringList();
		StringList successorTaskSequenceOrders = new StringList();
		StringList successorObjectTypeList = new StringList();

		Map palMapCache = new HashMap();

		StringBuilder value = new StringBuilder();

		boolean isObjectInaccessible = false;
		for(int j=0; j < objSize; j++){
			value.setLength(0);

			Map objectInfo = (Map)objectList.get(j);
           
			successorIds = (StringList)objectInfo.get(ProgramCentralConstants.SELECT_SUCCESSOR_PHYSICAL_IDS);
			

			if (successorIds != null && successorIds.size() > 0 && !"".equals(((String)successorIds.get(0)).trim())){
				successorTypes = (StringList)objectInfo.get(SELECT_SUCCESSOR_TYPES);
				successorLagTimes =  (StringList)objectInfo.get(SELECT_SUCCESSOR_LAG_TIME_INPUT);
				successorLagTimeUnits =  (StringList)objectInfo.get(SELECT_SUCCESSOR_LAG_TIME_UNITS);
				projectAccessKeyIds =  (StringList)objectInfo.get(SELECT_PROJECT_ACCESS_KEY_ID);
				projectAccessKeyIdsForSuccessor =  (StringList)objectInfo.get(SELECT_PROJECT_ACCESS_KEY_ID_FOR_SUCCESSOR);
				projectAccessListIdsForSuccessor =  (StringList)objectInfo.get(SELECT_PROJECT_ACCESS_LIST_ID_FOR_SUCCESSOR);
				successorTaskSequenceOrders =  (StringList)objectInfo.get(SELECT_SUCCESSOR_TASK_ATTRIBUTE_SEQUENCE_ORDER);
				successorObjectTypeList =  (StringList)objectInfo.get(IS_SUCCESSOR_KINDOF_PROJECT);
				MapList depedencyList = new MapList();

				int countProjectAccessKey = 0;
				int countProjectAccessList = 0;

				for (int i=0,sSize=successorIds.size(); i <sSize ; i++){
					Map dependencyMap  = new HashMap();

					String successorId = (String) successorIds.get(i);
					String successorType = (String) successorTypes.get(i);
					String successorLagTime = (String) successorLagTimes.get(i);
					String successorLagTimeUnit = (String) successorLagTimeUnits.get(i);
					String projectAccessKeyId = (String) projectAccessKeyIds.get(0);
					String projectAccessKeyIdForSuccessor = projectAccessKeyIdsForSuccessor!= null?(String) projectAccessKeyIdsForSuccessor.get(countProjectAccessKey):null;
					if(ProgramCentralUtil.isNullString(projectAccessKeyIdForSuccessor)) {
						projectAccessKeyIdForSuccessor = projectAccessKeyId;
					}

					if(!sequenceData.containsKey(projectAccessKeyIdForSuccessor)){
						ProjectSequence ps = new ProjectSequence(context, projectAccessKeyIdForSuccessor);
						sequenceData.put(projectAccessKeyIdForSuccessor, ps.getSequenceData(context));
					}

					Map projectSequenceData = (Map) sequenceData.get(projectAccessKeyIdForSuccessor);
					Dataobject taskDataObject = (Dataobject) projectSequenceData.get(successorId);
					String successorTaskSequenceOrder = null;
					if(taskDataObject!= null) {
						successorTaskSequenceOrder = (String)taskDataObject.getDataelements().get(ProgramCentralConstants.KEY_SEQ_ID);	
					}

					String successorIsProject = (String) successorObjectTypeList.get(i);

					if("TRUE".equalsIgnoreCase(successorIsProject)){
						// Project is successor of a task
						projectAccessKeyIdForSuccessor = (String) projectAccessListIdsForSuccessor.get(countProjectAccessList);
						countProjectAccessList++;
					} else {
						countProjectAccessKey++;
					}

					if(ProgramCentralUtil.isNullString(successorTaskSequenceOrder)){
						// this should not be the case as every task should have a seq order unless a depend is againt a project.
						successorTaskSequenceOrder = "0";
					}

					dependencyMap.put("SuccessorId", successorId);
					dependencyMap.put("SuccessorType", successorType);
					dependencyMap.put("SuccessorLagType", successorLagTime);
					dependencyMap.put("SuccessorLagTypeUnit", successorLagTimeUnit);
					dependencyMap.put("ProjectAccessKeyIdSuccessor", projectAccessKeyIdForSuccessor);
					dependencyMap.put("SuccessorTaskSequenceId", successorTaskSequenceOrder);

					depedencyList.add(dependencyMap);
				}

				depedencyList.sort("SuccessorTaskSequenceId", ProgramCentralConstants.ASCENDING_SORT, ProgramCentralConstants.SORTTYPE_INTEGER);

				for (int i=0,dSize=depedencyList.size(); i <dSize ; i++){
					String projectName = null;
					String externalProjectState = ProgramCentralConstants.EMPTY_STRING;

					Map dependencyMap = (Map)depedencyList.get(i);
					String successorId = (String) dependencyMap.get("SuccessorId");
					String successorType = (String) dependencyMap.get("SuccessorType");
					String successorLagTime = (String) dependencyMap.get("SuccessorLagType");
					String successorLagTimeUnit = (String) dependencyMap.get("SuccessorLagTypeUnit");
					String projectAccessKeyId = (String) projectAccessKeyIds.get(0);
					String projectAccessKeyIdForSuccessor = (String) dependencyMap.get("ProjectAccessKeyIdSuccessor");
					String successorTaskSequenceOrder = (String) dependencyMap.get("SuccessorTaskSequenceId");

					String successorProjectType = (String) palMapCache.get(projectAccessKeyIdForSuccessor);
					isObjectInaccessible = false;
					if (successorProjectType == null){
						List<String> externalProjectSelectableList = new ArrayList<String>();
						externalProjectSelectableList.add(projectAccessKeyIdForSuccessor);
						externalProjectSelectableList.add("from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.type");
						externalProjectSelectableList.add("from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.name");
						externalProjectSelectableList.add("from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.current");
						externalProjectSelectableList.add("|");

						//PRG:RG6:R213:Mql Injection:parameterized Mql:17-Oct-2011:start
						String sCommandStatement = "print bus $1 select $2 $3 $4 dump $5";
						String output =  MqlUtil.mqlCommand(context,sCommandStatement,externalProjectSelectableList);
						if(ProgramCentralUtil.isNullString(output)){
							isObjectInaccessible = true;
							try{
								ProgramCentralUtil.pushUserContext(context);
								output =  MqlUtil.mqlCommand(context,sCommandStatement,externalProjectSelectableList);
							}finally{
								ProgramCentralUtil.popUserContext(context);
							}
						}
						//PRG:RG6:R213:Mql Injection:parameterized Mql:17-Oct-2011:End
						StringList projectInfo = FrameworkUtil.split(output, "|");
						successorProjectType = (String) projectInfo.get(0);
						palMapCache.put(projectAccessKeyIdForSuccessor, successorProjectType);
						palMapCache.put("name:" + projectAccessKeyIdForSuccessor, projectInfo.get(1));
						palMapCache.put("current:"+ projectAccessKeyIdForSuccessor, projectInfo.get(2));
						palMapCache.put("isAccssible:"+ projectAccessKeyIdForSuccessor, isObjectInaccessible);
					}

					if (!projectAccessKeyId.equals(projectAccessKeyIdForSuccessor)){
						if("Experiment".equals(successorProjectType)){
							continue;
						}
						//dependent tasks are from different projects; prefix dependency label with project name.
						projectName = (String) palMapCache.get("name:" + projectAccessKeyIdForSuccessor);
						externalProjectState = (String)palMapCache.get("current:"+ projectAccessKeyIdForSuccessor);
						isObjectInaccessible = (boolean)palMapCache.get("isAccssible:"+ projectAccessKeyIdForSuccessor);
					}

					if (i > 0){
						//seperate multiple dependencies with comma.
						value.append(",");
					}

					StringBuilder tip = new StringBuilder();
					if (projectName != null){
						tip.append(projectName).append(":").append(successorTaskSequenceOrder ).append(":").append(successorType);
					}else{
						tip.append(successorTaskSequenceOrder).append(":").append(successorType);
					}

					tip.append(Task.parseToDouble(successorLagTime) < 0 ? "" : "+");
					tip.append(successorLagTime).append(" ").append(successorLagTimeUnit);

					value.append(tip.toString());
				}
			}
			results.add(value.toString());

		}
		DebugUtil.debug("Total time of getTaskSuccessorColumn(programHTMLOutput)::"+(System.currentTimeMillis()-start));
		return results;
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList isDependencyCellsEditableForDataGrid(Context context, String[] args) throws Exception
	{
		long start = System.currentTimeMillis();

		String[] typeArray = new String[]{
				DomainObject.TYPE_PROJECT_SPACE,
				DomainObject.TYPE_PROJECT_CONCEPT,
				DomainObject.TYPE_PROJECT_TEMPLATE};

		Map<String,StringList> derivativeMap = ProgramCentralUtil.getDerivativeTypeListFromUtilCache(context, typeArray);

		StringList prjConceptSubTypes 	= derivativeMap.get(DomainObject.TYPE_PROJECT_CONCEPT);
		StringList prjTemplateSubTypes 	= derivativeMap.get(DomainObject.TYPE_PROJECT_TEMPLATE);
		StringList prjSpaceSubTypes 	= derivativeMap.get(DomainObject.TYPE_PROJECT_SPACE);

		Map programMap = (Map) JPOUtil.unpackArgs(args);
		MapList objectList = (MapList) programMap.get("objectList");
		Map paramList 			= (Map) programMap.get("paramList");

		StringList slHasAccess = new StringList();

		Map mpData = (Map)objectList.get(0);
		String strId = (String)mpData.get(DomainConstants.SELECT_ID);
		int intLevel = Integer.parseInt((String)mpData.get(DomainConstants.SELECT_LEVEL));

		StringList busSelect = new StringList(2);
		busSelect.addElement(ProgramCentralConstants.SELECT_CURRENT);
		busSelect.addElement(ProgramCentralConstants.SELECT_TYPE);

		int size = objectList.size();
		for(int i=0;i<size;i++){
			Map bws = (Map)objectList.get(i);
			String strCurrent 			= (String)bws.get(ProgramCentralConstants.SELECT_CURRENT);
			String type 				= (String)bws.get(ProgramCentralConstants.SELECT_TYPE);

			//dependency column should be disable only for root node.
			if(intLevel==0 && i==0
					&& (prjSpaceSubTypes.contains(type)|| 
							prjConceptSubTypes.contains(type)||
							prjTemplateSubTypes.contains(type))) {
				slHasAccess.add("false");
			} else {
				if(ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equals(strCurrent) || 
						ProgramCentralConstants.STATE_PROJECT_SPACE_ARCHIVE.equals(strCurrent)){
					slHasAccess.add("false");
				}else{
					slHasAccess.add("true");
				}
			}
		}

		DebugUtil.debug("Total time taken by isDependencyCellsEditable::"+(System.currentTimeMillis()-start));

		return slHasAccess;
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList isTaskNameCellEditableForDataGrid(Context context, String[] args) throws MatrixException{
		long start = System.currentTimeMillis();
		StringList isCellEditable = null;
		try{
			Map programMap = (HashMap) JPOUtil.unpackArgs(args);
			MapList objectList = (MapList) programMap.get("objectList");
			Map paramList 			= (Map) programMap.get("paramList");

			int size = objectList.size();
			isCellEditable = new StringList(size);

			for(int i=0;i<size;i++){
				Map objInfo = (Map)objectList.get(i);
				String currentState		 	 = (String)objInfo.get(ProgramCentralConstants.SELECT_CURRENT);

				if(ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equals(currentState) || 
						ProgramCentralConstants.STATE_PROJECT_SPACE_ARCHIVE.equals(currentState)){
					isCellEditable.add("false");
				}else{
					isCellEditable.add("true");
				}
			}

			DebugUtil.debug("Total time taken by isTaskNameCellEditable:"+(System.currentTimeMillis()-start));

		}catch(Exception e){
			e.printStackTrace();
		}
		return isCellEditable;

	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getEstimatedDurationColumnForDataGrid(Context context, String[] args) throws Exception 
	{
	
		long start = System.currentTimeMillis();
		StringList returnList = new StringList();
		//String SELECT_WORKING_TIME_PER_DAY = "from[" + ProgramCentralConstants.RELATIONSHIP_DEFAULT_CALENDAR + "].to."+WorkCalendar.SELECT_WORKING_TIME_PER_DAY;
		try
		{
			String strLanguage = context.getSession().getLanguage();
			Map projectMap = (Map) JPOUtil.unpackArgs(args);
			MapList objectList = (MapList) projectMap.get("objectList");
			String invokeFrom 	= (String)projectMap.get("invokeFrom"); //Added for OTD

			//Added for Flattened view
			Map paramList 		= (Map) projectMap.get("paramList");
			String pageSize 	= (String)paramList.get("pageSize");
			

			int size = objectList.size();
			

			//String taskEstimatedDuration = EMPTY_STRING;
			//String durationInputUnit = EMPTY_STRING;
			String strI18Days = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.DurationUnits.Days", strLanguage);
			String strI18Hours = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.DurationUnits.Hours", strLanguage);

			NumberFormat _df = NumberFormat.getInstance(Locale.US);
			_df.setMaximumFractionDigits(2);
			_df.setGroupingUsed(false);

			for(int i=0; i<size; i++) {
				Map objectInfo = (Map)objectList.get(i);
				
				String taskEstimatedDuration 	= (String)objectInfo.get(SELECT_TASK_ESTIMATED_DURATION);
				String durationInputUnit 		= (String)objectInfo.get(SELECT_TASK_ESTIMATED_DURATION+".inputunit");
				
				StringBuilder durationBldr = new StringBuilder();

				if("h".equalsIgnoreCase(durationInputUnit)&& taskEstimatedDuration!= null){
					double duration = Task.parseToDouble(taskEstimatedDuration);    				
					duration = duration * HOURS_PER_DAY;
					duration = Task.parseToDouble(_df.format(duration));
					
					durationBldr.append(String.valueOf(duration));
					durationBldr.append(ProgramCentralConstants.SPACE);
					durationBldr.append(strI18Hours);
				}else if(taskEstimatedDuration != null && !taskEstimatedDuration.isEmpty()){
					double duration = Double.valueOf(taskEstimatedDuration);
					duration = Task.parseToDouble(_df.format(duration));
					
					durationBldr.append(String.valueOf(duration));
					durationBldr.append(ProgramCentralConstants.SPACE);
					durationBldr.append(strI18Days);
				}
				returnList.add(durationBldr.toString());
			}


		} catch (Exception ex) {
			throw ex;
		}

		DebugUtil.debug("Total time getEstimatedDurationColumn::"+(System.currentTimeMillis() - start));


		return returnList;
	
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList isTypeCellEditableForDataGrid(Context context, String[] args) throws MatrixException
	{
		long start = System.currentTimeMillis();
		try {
			StringList isCellEditable = new StringList();
			Map programMap 		= (Map) JPOUtil.unpackArgs(args);
			MapList objectList 	= (MapList) programMap.get("objectList");

			int size = objectList.size();
			for(int i=0;i<size;i++){
				Map bws 	= (Map)objectList.get(i);
				String taskState 				= (String)bws.get(ProgramCentralConstants.SELECT_CURRENT);
				String isTaskManagement 		= (String)bws.get(ProgramCentralConstants.SELECT_IS_TASK_MANAGEMENT);

				if("true".equalsIgnoreCase(isTaskManagement) && 
						(ProgramCentralConstants.STATE_PROJECT_TASK_CREATE.equalsIgnoreCase(taskState)
								|| ProgramCentralConstants.STATE_PROJECT_TASK_ASSIGN.equalsIgnoreCase(taskState))){
					isCellEditable.add("true");
				}else{
					isCellEditable.add("false");
				}
			}

			DebugUtil.debug("Total time taken by isTypeCellEditable:"+(System.currentTimeMillis()-start));

			return isCellEditable;

		} catch (Exception exp) {
			exp.printStackTrace();
			throw new MatrixException(exp);
		}

	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList isConstraintFieldEditableForDataGrid(Context context, String[] args) throws MatrixException
	{
		long start = System.currentTimeMillis();
		try {
			StringList isCellEditable = new StringList();
			Map programMap 		= (Map) JPOUtil.unpackArgs(args);
			MapList objectList 	= (MapList) programMap.get("objectList");

			int size = objectList.size();

			for(int i=0;i<size;i++){
				Map bws = (Map)objectList.get(i);
				String taskProjectScheduleAtrib	= (String)bws.get(ProgramCentralConstants.SELECT_PROJECT_SCHEDULE_ATTRIBUTE_FROM_TASK);
				if(ProgramCentralUtil.isNullString(taskProjectScheduleAtrib)){
					taskProjectScheduleAtrib	= (String)bws.get(ProgramCentralConstants.SELECT_PROJECT_SCHEDULE);
				}

				if(ProgramCentralUtil.isNullString(taskProjectScheduleAtrib) 
						|| ProgramCentralConstants.PROJECT_SCHEDULE_AUTO.equalsIgnoreCase(taskProjectScheduleAtrib)){
					isCellEditable.add("true");
				}else{
					isCellEditable.add("false");
				}			
			}

			DebugUtil.debug("Total time taken by isConstraintFieldEditable:"+(System.currentTimeMillis()-start));

			return isCellEditable;

		} catch (Exception exp) {
			exp.printStackTrace();
			throw new MatrixException();
		}
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList isSummaryTaskCellEditableForDataGrid(Context context, String[] args) throws MatrixException
	{
		long start = System.currentTimeMillis();
		try{
			StringList isCellEditable = new StringList();
			Map programMap = (HashMap) JPOUtil.unpackArgs(args);
			MapList objectList = (MapList) programMap.get("objectList");

			int size = objectList.size();
			for(int i=0;i<size;i++){
				Map bws = (Map)objectList.get(i);
				String isSummasryTask = (String)bws.get(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);

				if("true".equalsIgnoreCase(isSummasryTask)){
					isCellEditable.add("false");
				}else{
					isCellEditable.add("true");
				}
			}

			DebugUtil.debug("Total time taken by isSummaryTaskCellEditable()::"+(System.currentTimeMillis()-start));

			return isCellEditable;

		}catch(Exception e){
			throw new MatrixException(e);
		}
	}
	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList isDurationCellEditableForDataGrid(Context context, String[] args) throws MatrixException
	{
		long start = System.currentTimeMillis();
		try{

			String[] typeArray = new String[]{
					ProgramCentralConstants.TYPE_MILESTONE,
					ProgramCentralConstants.TYPE_TASK,
					ProgramCentralConstants.TYPE_PHASE,
					ProgramCentralConstants.TYPE_GATE};

			Map<String,StringList> derivativeMap = ProgramCentralUtil.getDerivativeTypeListFromUtilCache(context, typeArray);

			StringList gateSubType 		= derivativeMap.get(ProgramCentralConstants.TYPE_GATE);
			StringList milestoneSubType = derivativeMap.get(ProgramCentralConstants.TYPE_MILESTONE);
			StringList taskSubtype 		= derivativeMap.get(ProgramCentralConstants.TYPE_TASK);
			StringList phaseSubType 	= derivativeMap.get(ProgramCentralConstants.TYPE_PHASE);

			StringList isCellEditable = new StringList();

			Map programMap 		= (Map) JPOUtil.unpackArgs(args);
			MapList objectList = (MapList) programMap.get("objectList");

			int size = objectList.size();
			for(int i = 0; i < size; i++) {
				Map bws = (Map)objectList.get(i);
				String isSummasryTask = (String)bws.get(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);

				if("true".equalsIgnoreCase(isSummasryTask) ){
					isCellEditable.add("false");
				}else{
					String type = (String)bws.get(ProgramCentralConstants.SELECT_TYPE);
					if(gateSubType.contains(type)|| 
							milestoneSubType.contains(type)) {
						isCellEditable.add("false");
					}else if(phaseSubType.contains(type)|| 
							taskSubtype.contains(type)) {
						String state = (String)bws.get(ProgramCentralConstants.SELECT_CURRENT);
						if(ProgramCentralConstants.STATE_PROJECT_TASK_REVIEW.equalsIgnoreCase(state) ||ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equalsIgnoreCase(state)){
							isCellEditable.add("false");
						}else{
							isCellEditable.add("true");
						}
					}else {
						isCellEditable.add("true");
					}
				}
			}
			DebugUtil.debug("Total time taken by isDurationCellEditable()::"+(System.currentTimeMillis()-start));

			return isCellEditable;

		}catch(Exception e){
			throw new MatrixException(e);
		}
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getLevelColumnValueForDataGrid(Context context,String[]args)throws Exception
	{
		long start = System.currentTimeMillis();

		Map programMap 		= (Map) JPO.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
		Map paramList 		= (Map) programMap.get("paramList"); 

		//Added for Flattened view
		String pageSize 		= (String)paramList.get("pageSize");
		String exportFormat 	= (String)paramList.get("exportFormat");
		boolean isFlattenedView = (pageSize != null && !pageSize.isEmpty())?true:false;


		int size = objectList.size();
		StringList palSeqIdList = new StringList(size);

		String parentObjId = (String)paramList.get("parentOID");
		if(parentObjId == null || parentObjId.isEmpty()) {
			parentObjId = (String)paramList.get("objectId");
		}

		if(parentObjId == null || parentObjId.isEmpty()) {
			return palSeqIdList;
		}

		//Get PAL objects
		String mqlCmd = "print bus $1 select $2 $3 dump $4";
		String rootNodePALPhysicalId = MqlUtil.mqlCommand(context, 
				true,
				true,
				mqlCmd, 
				true,
				parentObjId,
				ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT,
				ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK,
				"|");

		if(rootNodePALPhysicalId == null) {
			throw new Exception("Cotext object does not have PAL connection!");
		}

		Map<String,Map<String, Dataobject>> palCache = null;

		Map<String, Dataobject> palSeqData = null;

		int subProjectListSize = 0;
		boolean  useCache = !_taskSeqMap.isEmpty() && _taskSeqMap.containsKey(rootNodePALPhysicalId);
		//BusinessObjectWithSelectList objectWithSelectList = null;
		if(useCache) {
			palSeqData = _taskSeqMap.get(rootNodePALPhysicalId);
			_taskSeqMap.remove(rootNodePALPhysicalId);
		}else {
			ProjectSequence ps = new ProjectSequence(context,rootNodePALPhysicalId);

			palSeqData = ps.getSequenceData(context);

			List<Dataobject> subProjects = ps.getProjects(context);
			boolean hasSubProjects = subProjects.size() > 1 ;

			StringList busSel = new StringList(1);
			busSel.add(ProgramCentralConstants.SELECT_PHYSICALID);
			if(hasSubProjects) {
				busSel.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);
			}

			long start1 = System.currentTimeMillis();
			//if(size<500) {objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIds, busSel,true);}
			//else {objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIds, busSel);}

			if(! isFlattenedView ) {

				//START: Added for experiment
				String objectId2 = (String)paramList.get("objectId2");
				boolean isComapreView = false;
				String object2PALPhysicalId = ProgramCentralConstants.EMPTY_STRING;
				if(ProgramCentralUtil.isNotNullString(objectId2)) {

					object2PALPhysicalId = MqlUtil.mqlCommand(context, 
							true,
							true,
							mqlCmd, 
							true,
							objectId2,
							ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT,
							ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK,
							"|");

					if(object2PALPhysicalId == null) {
						throw new Exception("Cotext object does not have PAL connection!");
					}

					ProjectSequence psExperiment = new ProjectSequence(context,object2PALPhysicalId);
					palSeqData.putAll(psExperiment.getSequenceData(context));
					isComapreView = true;
				}
				//END

				if(hasSubProjects) {

					String objectId2PALPhysicalId = object2PALPhysicalId;
					List<Map> subProjectsPALIDList = new ArrayList<Map>();
					for(int i = 0; i < objectList.size(); i++) {
						Map objectInfo = (Map)objectList.get(i);
						if (!(rootNodePALPhysicalId.equalsIgnoreCase((String)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK))
								|| (ProgramCentralUtil.isNotNullString(objectId2PALPhysicalId) && objectId2PALPhysicalId.equalsIgnoreCase((String)objectInfo.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK))))
								) {
							subProjectsPALIDList.add(objectInfo);
						}

					}

					Set<String> subProjectPALIDSet = new HashSet<>();
					for(int i = 0; i < subProjectsPALIDList.size(); i++) {
						Map bws = (Map)subProjectsPALIDList.get(i);
						String palID = (String)bws.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK) ;
						if(ProgramCentralUtil.isNotNullString(palID)) {
							subProjectPALIDSet.add(palID);
						}
					}

					int subProjectIDSetSize = subProjectPALIDSet.size();

					if(subProjectIDSetSize > 0) {

						String[] palIds = new String[subProjectIDSetSize];
						subProjectPALIDSet.toArray(palIds);

						String SELECT_PROJECT_PHYSICALID_FROM_PAL = "from["+ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST+"].to.physicalid";

						busSel.clear();
						busSel.add(SELECT_PROJECT_PHYSICALID_FROM_PAL);
						busSel.add(ProgramCentralConstants.SELECT_PHYSICALID);

						BusinessObjectWithSelectList subProjectSelectList =
								ProgramCentralUtil.getObjectWithSelectList(context, palIds, busSel);
						Map<String, Dataobject> subPalSeqData = new HashMap<>();
						subProjectSelectList.stream().forEach( bws -> {
							try {
								String subProjectPalId = (String)bws.getSelectData(ProgramCentralConstants.SELECT_PHYSICALID);
								String subProjectPhysicalId = (String)bws.getSelectData(SELECT_PROJECT_PHYSICALID_FROM_PAL);
								ProjectSequence subPal = new ProjectSequence(context, subProjectPalId);
								Map<String,Dataobject> subProjectPalData = subPal.getSequenceData(context);   
								subProjectPalData.remove(subProjectPhysicalId); //remove project data because it is already present in master project data.
								subPalSeqData.putAll(subProjectPalData);
							} catch (Exception e) {
								e.printStackTrace();
							}  
						});
						palSeqData.putAll(subPalSeqData);

					}

				}

			}
		}


		for (int i = 0; i < size; i++) {
			Map bws = (Map)objectList.get(i);
			String taskPhysicalId = (String)bws.get(ProgramCentralConstants.SELECT_PHYSICALID);				
			Dataobject taskObj = palSeqData.get(taskPhysicalId);
			if(taskObj == null) {
				palSeqIdList.add("");
			}else {
				palSeqIdList.add((String)taskObj.getDataelements().get(ProgramCentralConstants.KEY_WBS_ID));
			}
		}

		DebugUtil.debug("Total time taken by getLevelColumnValue::("+size+")"+(System.currentTimeMillis()-start));

		return palSeqIdList;
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getTotalFloatForDataGrid (Context context,String[]args)throws Exception
	{   Map programMap 		= (HashMap) JPOUtil.unpackArgs(args);
		return getFloatForDataGrid(context, programMap, ProgramCentralConstants.KEY_TOTAL_FLOAT);
		
	}
	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getFreeFloatForDataGrid (Context context,String[]args)throws Exception
	{   Map programMap 		= (HashMap) JPOUtil.unpackArgs(args);
		return getFloatForDataGrid(context, programMap, ProgramCentralConstants.KEY_FREE_FLOAT);
		
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getProjectRoleRangeForDataGrid(Context context, String[] args)throws Exception
	{
		try{
			Map programMap 		= (Map) JPO.unpackArgs(args);
			MapList objectList 	= (MapList) programMap.get("objectList");
			MapList returnMapList = new MapList();
			HashMap mapReturnRoleRange = new HashMap();
			String sLanguage = context.getSession().getLanguage();
			StringList slProjectRoles = new StringList();
			StringList slProjectRolesTranslated = new StringList();

			// get project roles
			StringList strList = ProgramCentralUtil.getAllProjectRoles(context);
			String showRDORoles = EnoviaResourceBundle.getProperty(context, "emxProgramCentral.showRDORoles");
			boolean showRDORole = "true".equalsIgnoreCase(showRDORoles); 
			Map mapRoleI18nStrings = null;
			if(showRDORole) {
			emxProjectMemberBase_mxJPO projMember = new emxProjectMemberBase_mxJPO(context,args);
				mapRoleI18nStrings = projMember.geti18nProjectRoleRDOValues(context);
			}

			if(strList != null) {
				int size = strList.size();
				for(int itr = 0; itr < size; itr++) {
					String projectRole = (String)strList.get(itr);
					String sIntProjectRole = "";
					if(showRDORole)sIntProjectRole = (String) mapRoleI18nStrings.get(projectRole);
					else sIntProjectRole = i18nNow.getRangeI18NString(DomainConstants.ATTRIBUTE_PROJECT_ROLE,projectRole, sLanguage);

					if(ProgramCentralUtil.isNullString(projectRole)){
						projectRole = "";
						sIntProjectRole = "";
					}else{
						if(ProgramCentralUtil.isNullString(sIntProjectRole)){
							sIntProjectRole = projectRole;
						}
					}

					slProjectRoles.add(projectRole);
					slProjectRolesTranslated.add(sIntProjectRole.trim());
				}
			}

			mapReturnRoleRange.put("RangeValues", slProjectRoles);
			mapReturnRoleRange.put("RangeDisplayValue", slProjectRolesTranslated);
			
			for (int i = 0; i < objectList.size(); i++) {
				returnMapList.add(mapReturnRoleRange);
			}
			return  returnMapList;

		}catch (Exception e){
			e.printStackTrace();
			throw e;
		}
		// [MODIFIED::PRG:RG6:Jan 20, 2011:IR-055750V6R2012:R211::End]
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getCriticalColumnValueForDataGrid(Context context,String[] args)throws Exception
	{

		long start 			= System.currentTimeMillis();

		Map programMap 		= (HashMap) JPOUtil.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
		invokeFromODTFile 	= (String)programMap.get("invokeFrom"); //Added for ODT

		//Added for Flattened view
		Map paramList 			= (Map) programMap.get("paramList");
		String pageSize 		= (String)paramList.get("pageSize");
		String exportFormat 	= (String)paramList.get("exportFormat");
		boolean isFlattenedView = (pageSize != null && !pageSize.isEmpty())?true:false;
		String ctxLang = context.getLocale().getLanguage();
		int size = objectList.size();

		StringList valueList 	= new StringList(size);
		//String divTag = "<div style=\"background-image:url(../common/images/utilIcon16x16GenericAlert.png);width:16px;height:16px;margin:auto;\" title=\"Yes\"></div>";
		String divTag = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Yes", ctxLang);
		//String divTag = "Yes";

		for(int i=0;i<size;i++){
			Map objectInfo = (Map)objectList.get(i);
			String attributeCriticalTask = (String)objectInfo.get(SELECT_ATTRIBUTE_CRITICAL_TASK);

			boolean blDeletedTask = false;
			if("TRUE".equalsIgnoreCase((String)objectInfo.get(SELECT_IS_DELETED_SUBTASK)) 
					|| "TRUE".equalsIgnoreCase((String)objectInfo.get(SELECT_IS_PARENT_TASK_DELETED))) {
				blDeletedTask = true;
			}

			if("True".equalsIgnoreCase(attributeCriticalTask) && !blDeletedTask){
				if("CSV".equalsIgnoreCase(exportFormat)|| 
						"HTML".equalsIgnoreCase(exportFormat)){
					valueList.add("Yes");
				}else{
					valueList.add(divTag);
				}	
			} else {
				valueList.add(DomainConstants.EMPTY_STRING);
			}
		}

		DebugUtil.debug("Total time taken by getCriticalColumnValue(programHTMLOutput)("+size+")::"+(System.currentTimeMillis()-start));

		return valueList;
	
	}


	@com.matrixone.apps.framework.ui.ProgramCallable
	public Vector getStatusIconForDataGrid(Context context, String[] args) throws Exception 
	{
		long start = System.currentTimeMillis();
		Map programMap 		= (Map) JPOUtil.unpackArgs(args);
		Map paramList 		= (Map) programMap.get("paramList");
		String reportFormat = (String)paramList.get("reportFormat");
		MapList objectList 	= (MapList)programMap.get("objectList");
		int size = objectList.size();
		Vector showIcon = new Vector(size);
		String ctxLang = context.getLocale().getLanguage();
		SimpleDateFormat sdf = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);

		Calendar calendar = Calendar.getInstance();
		
		String onTime = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.OnTime", ctxLang);
		String late = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Late", ctxLang);
		String behindSchedule = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Legend.BehindSchedule", ctxLang);
		int yellowRedThreshold = Integer.parseInt(EnoviaResourceBundle.getProperty(context, "eServiceApplicationProgramCentral.SlipThresholdYellowRed"));

			Date systemDate = calendar.getTime();
			systemDate = Helper.cleanTime(systemDate);
			
		for(int i=0; i<size; i++){
			
			Map objectInfo = (Map)objectList.get(i);
			String percentComplete 		= (String)objectInfo.get(Task.SELECT_PERCENT_COMPLETE);
			String estimatedFinishDate 	= (String)objectInfo.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE);
			String actualFinishDate 	= (String)objectInfo.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
			String actualStartDate  	= (String)objectInfo.get(Task.SELECT_TASK_ACTUAL_START_DATE);

			String value = ProgramCentralConstants.EMPTY_STRING;
			String display = ProgramCentralConstants.EMPTY_STRING;
			try {
				Date estimatedFinish 	= sdf.parse(estimatedFinishDate);
				if ("100.0".equals(percentComplete)) {
					if(UIUtil.isNotNullAndNotEmpty(actualFinishDate)){
						Date actualFinish = sdf.parse(actualFinishDate);

						if(actualFinish.before(estimatedFinish) || actualFinish.equals(estimatedFinish))  {
							display = onTime;
							value = ProgramCentralConstants.TASK_STATUS_ON_TIME;
						} else {
							display = late;
							value = ProgramCentralConstants.TASK_STATUS_COMPLETED_LATE;
						}
					} else if(UIUtil.isNotNullAndNotEmpty(actualStartDate)){
						Date actStartDate = sdf.parse(actualStartDate);
						if(actStartDate.before(estimatedFinish)) {
							display = onTime;
							value = ProgramCentralConstants.TASK_STATUS_ON_TIME;
						} else {
							display = late;
							value = ProgramCentralConstants.TASK_STATUS_COMPLETED_LATE;
						}
					}
				} else {
					if (systemDate.after(estimatedFinish)) {
						display = late;
						value = ProgramCentralConstants.TASK_STATUS_LATE;
					} else if(DateUtil.computeDuration (systemDate, estimatedFinish) <= yellowRedThreshold) {
						display = behindSchedule;
						value = ProgramCentralConstants.TASK_STATUS_BEHIND_SCHEDULE;
					}
				}

			} catch (ParseException e) {
				e.printStackTrace();
			}

			if(ProgramCentralUtil.isNotNullString(reportFormat)) {
				showIcon.add(display);
			} else if(ProgramCentralConstants.TASK_STATUS_ON_TIME.equals(value)){
				showIcon.add("<div style=\"background:#6FBC4B;width:11px;height:11px;border-radius:50px;margin:auto;\" title=\"" + display + "\"> </div>");
			} else if (ProgramCentralConstants.TASK_STATUS_COMPLETED_LATE.equals(value)){
				showIcon.add("<div style=\"background:#6FBC4B;width:11px;height:11px;border-radius:50px;margin:auto;\" title=\"" + display + "\"> </div>");
			} else if (ProgramCentralConstants.TASK_STATUS_BEHIND_SCHEDULE.equals(value)){
				showIcon.add("<div style=\"background: #FEE000;width:11px;height:11px;border: none;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;font: normal 100%/normal Arial, Helvetica, sans-serif;color: rgba(0, 0, 0, 1);-o-text-overflow: clip;text-overflow: clip;-webkit-transform: rotateZ(-45deg);transform: rotateZ(-45deg);-webkit-transform-origin: 0 100% 0deg;transform-origin: 0 100% 0deg;;margin:auto;\" title=\"" + display + "\"> </div>");
			} else if (ProgramCentralConstants.TASK_STATUS_LATE.equals(value)){
				showIcon.add("<div style=\"background:#CC092F;width:11px;height:11px;margin:auto;\" title=\"" + display + "\"> </div>");
			}else{
				showIcon.add(ProgramCentralConstants.EMPTY_STRING);
			}
		}

		DebugUtil.debug("Total time taken by getStatusIcon(programHTMLOutPut)::"+(System.currentTimeMillis()-start));

		return showIcon;
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public Vector getProjectAndTaskConstraintsForDataGrid(Context context, String[] args) throws MatrixException
	{
    

		Vector vId = new Vector();
		try {
			final String ATTR_TASK_CONSTRAINT_TYPE_VAL = "attribute["+Task.ATTRIBUTE_TASK_CONSTRAINT_TYPE+"]";
			final String ATTR_DEFAULT_TASK_CONSTRAINT_TYPE_VAL = "attribute["+ProgramCentralConstants.ATTRIBUTE_DEFAULT_CONSTRAINT_TYPE+"]";
			String sLanguage = context.getSession().getLanguage();

			HashMap projectMap = (HashMap) JPOUtil.unpackArgs(args);
			MapList objectList = (MapList) projectMap.get("objectList");
			vId = new Vector(objectList.size());

			Map paramList = (Map) projectMap.get("paramList");
			String strObjectId = (String)paramList.get("objectId");
			String invokeFrom 		= (String)projectMap.get("invokeFrom"); //Added for OTD

			
			int size = objectList.size();

			
			for(int i=0; i<size; i++){

				Map objectInfo = (Map)objectList.get(i);
				String isProjectSpace = (String)objectInfo.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);
				String isProjectConcept = (String)objectInfo.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_CONCEPT);
				String isProjectTemplate = (String)objectInfo.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_TEMPLATE);
				String strDefaultTaskConstraint = ProgramCentralConstants.EMPTY_STRING;
				if ("TRUE".equalsIgnoreCase(isProjectSpace) || "TRUE".equalsIgnoreCase(isProjectConcept))
				{
					strDefaultTaskConstraint = (String)objectInfo.get(ATTR_DEFAULT_TASK_CONSTRAINT_TYPE_VAL);
				} else if("TRUE".equalsIgnoreCase(isProjectTemplate)) {
					strDefaultTaskConstraint = DomainConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ASAP;
					String scheduleFrom = (String)objectInfo.get(ProgramCentralConstants.ATTRIBUTE_PROJECT_SCHEDULE_FROM);
					if(ProgramCentralConstants.ATTRIBUTE_SCHEDULED_FROM_RANGE_FINISH.equalsIgnoreCase(scheduleFrom)){
						strDefaultTaskConstraint = DomainConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ALAP;
					}
				} else {
					strDefaultTaskConstraint = (String)objectInfo.get(ATTR_TASK_CONSTRAINT_TYPE_VAL);
				}
				if(ProgramCentralUtil.isNotNullString(strDefaultTaskConstraint)){
					strDefaultTaskConstraint = ((EnoviaResourceBundle.getRangeI18NString(context,Task.ATTRIBUTE_TASK_CONSTRAINT_TYPE, strDefaultTaskConstraint, sLanguage)));
				}
				vId.add(strDefaultTaskConstraint);
			}
		} catch (Exception e) {
			throw new MatrixException(e);
		}
		return vId;
	}

	private StringList getFloatForDataGrid (Context context,Map programMap, final String floatType)throws Exception
	{
		MapList objectList 	= (MapList) programMap.get("objectList");
		Map paramList 		= (Map) programMap.get("paramList");
		String selectedTable = (String)paramList.get("selectedTable");
				
		int size = objectList.size();
		String isRootNode = (String)(((Map)objectList.get(0)).get("Root Node"));
		if(size==0 && "true".equalsIgnoreCase(isRootNode)){
			return new StringList("0.0");
		}
		
		StringList floatList = new StringList(size);

		String parentObjId = (String)paramList.get("parentOID");
		if(ProgramCentralUtil.isNullString(parentObjId) || "PMCScheduleBaselineTable".equalsIgnoreCase(selectedTable)) {
			parentObjId = (String)paramList.get("objectId");
		}
		Map taskInfoMap = new HashMap<>();
		
		if(ProgramCentralUtil.isNullString(parentObjId)) {
			return floatList;
		}else {
			/*
			DomainObject parentProject = DomainObject.newInstance(context, parentObjId);
			String parentPALPhysicalId = parentProject.getInfo(context, ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
			*/
			String parentPALPhysicalId = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", true,
				parentObjId,
				ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT
				);

			taskInfoMap.putAll(ProjectSpace.getProjectFloatFromPAL(context, parentPALPhysicalId));
		}
		
		
		for (int i = 0; i < size; i++) {
			Map mapObject = (Map) objectList.get(i);
			String taskPhysicalId = (String)mapObject.get(ProgramCentralConstants.SELECT_PHYSICALID);
			//Object floatValue = taskInfoMap.get(taskPhysicalId+"_"+floatType);
			Object floatValue = taskInfoMap.get(taskPhysicalId);
			if(floatValue == null) {
				floatList.add("0.0");
			}else {
				StringList floatValuesList = FrameworkUtil.split((String)floatValue, "|");
				
				if(ProgramCentralConstants.KEY_TOTAL_FLOAT.equalsIgnoreCase(floatType)){
					floatList.add(floatValuesList.get(0));
				} else if(ProgramCentralConstants.KEY_FREE_FLOAT.equalsIgnoreCase(floatType)){
					floatList.add(floatValuesList.get(1));	
				} else if(KEY_CRITICAL_TASK.equalsIgnoreCase(floatType) && floatValuesList.size()>2){
					floatList.add(floatValuesList.get(2));
				} else {
					floatList.add("0.0");
				}
			}
		}
				
		return floatList;
	}
	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getOverallCriticalTaskStatusForDataGrid(Context context,String[]args)throws Exception
	{
		Map programMap 		= (Map) JPOUtil.unpackArgs(args);
		Map paramList 			= (Map) programMap.get("paramList");
		String exportFormat 	= (String)paramList.get("exportFormat");

		StringList valueList 	= getFloatForDataGrid(context, programMap, KEY_CRITICAL_TASK);
		int size = valueList.size();
		StringList overallCriticalTaskList = new StringList(size);
				
		String divTag = "<div style=\"background-image:url(../common/images/utilIcon16x16GenericAlert.png);width:16px;height:16px;margin:auto;\" title=\"Yes\"></div>";
		// For FUN090755 LA functionality - limitation in programHTMLOutput to filter div/images
		//    Therefore, will hard code exportFormat to CSV to display as text
		exportFormat = "CSV";
		
		for(int i=0; i<size; i++){
			String isCriticalTask = valueList.get(i);
			if("True".equalsIgnoreCase(isCriticalTask)){
				if("CSV".equalsIgnoreCase(exportFormat)|| 
						"HTML".equalsIgnoreCase(exportFormat)){
					overallCriticalTaskList.add("Yes");
				}else{
					overallCriticalTaskList.add(divTag);
				}	
			}else {
				overallCriticalTaskList.add(ProgramCentralConstants.EMPTY_STRING);
			}
		}
		
		return overallCriticalTaskList;
		
	}

	/**
	 * getPMCWBSPlanningViewsTable - Will generate table based on PMCWBSViewTable and add some dynamic columns
	 * in new WBS Planning view
	 * @param context
	 * @param args
	 * @return
	 * @since R209
	 * @throws FrameworkException
	 */
	public static MapList getPMCWBSPlanningViewTableForDataGrid(Context context, String[]args) throws Exception{
		MapList mlColumns = new MapList();
		MapList mlToRender = new MapList();
		try {
			Map hmTablePMCWBSView = new HashMap();
			HashMap mapSettings = new HashMap();
			
			HashMap programMap        = (HashMap) JPO.unpackArgs(args);
			HashMap requestMap        = (HashMap) programMap.get("requestMap");
			String objectId = (String)requestMap.get("objectId");
						
			BusinessObjectWithSelectList bwsl = 
					ProgramCentralUtil.getObjectWithSelectList(context, 
							new String[]{objectId}, 
							new StringList(ProgramCentralConstants.SELECT_PAL_OBJECTID_FROM_PROJECT),
							true);

			
			BusinessObjectWithSelect bws 	= bwsl.getElement(0);
			String strPALId 		= bws.getSelectData(ProgramCentralConstants.SELECT_PAL_OBJECTID_FROM_PROJECT);
			
			
			Map floatData = ProjectSpace.getProjectFloatFromPAL(context, strPALId);
			String strLastModifiedDate = (String)floatData.get("Last Modified");
			
			Locale locale 			= (Locale)requestMap.get("localeObj");
			double clientTZOffset 	= Task.parseToDouble((String)(requestMap.get("timeZone")));
			int iDateFormat 		= eMatrixDateFormat.getEMatrixDisplayDateFormat();
			DateFormat format 		= DateFormat.getDateTimeInstance(iDateFormat, iDateFormat, locale);
			
			strLastModifiedDate = eMatrixDateFormat.getFormattedDisplayDateTime(context, strLastModifiedDate, true,iDateFormat, clientTZOffset,locale);
								
			
			UITable uiPMCWBSViewTable = new UITable();

			mlColumns = uiPMCWBSViewTable.getColumns(context,"PMCWBSViewTableENXSBGrid",null);
			String languageStr = context.getSession().getLanguage();

			StringList types = new StringList();
			String strPlanningViewExcludeColumns  = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.TaskConstriant.WBSPlanningView.ExcludeColumns",Locale.US);
			
			String strProjectFloatGroupHeader = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Schedule.Float",languageStr);
			String strUpdated = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Schedule.Float.Updated",languageStr);
			
			StringList slExcludeColumns = FrameworkUtil.splitString(strPlanningViewExcludeColumns, ",");
			slExcludeColumns.add("Delivarable"); // Exclude deliverable column from planning view
			slExcludeColumns.add("CriticalTask");// Exclude critical task column from planning view
			
			for(Iterator itr = mlColumns.iterator();itr.hasNext();){
				Map ColumnMap = (Map)itr.next();
				String strColumnName = (String)ColumnMap.get("name");

				//Added:16-Feb-10:vm3:R209:PRG:Bug 030734
				String strConstraintTypei181 = "";
				String languageString = context.getSession().getLanguage();
				strConstraintTypei181 = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
						"emxProgramCentral.TaskConstriant.WBSPlanningView.ConstraintsColumns", languageStr);
				if (strConstraintTypei181.equals(strColumnName))
				{
					Map settingsMap = (Map) ColumnMap.get("settings");
					settingsMap.put("Column Type","program");
					settingsMap.put("Printer Friendly","true");
					ColumnMap.put("settings", settingsMap);
				}else if("TotalFloat".equalsIgnoreCase(strColumnName) || "FreeFloat".equalsIgnoreCase(strColumnName) || "OverallCriticalTask".equalsIgnoreCase(strColumnName)){
					Map settingsMap = (Map) ColumnMap.get("settings");
					settingsMap.put("Group Header",strProjectFloatGroupHeader+ " ("+strUpdated+" : "+strLastModifiedDate +" )");
					
					ColumnMap.put("settings", settingsMap);
					
				}
				//End-Added:16-Feb-10:vm3:R209:PRG:Bug 030734

				if(!slExcludeColumns.contains(strColumnName)){
					mlToRender.add(ColumnMap);
				}
				//System.out.println("ColumnMap : "+ColumnMap);
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return mlToRender;
	}
	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getTaskConstraintRangeForDataGrid(Context context, String[] args) throws MatrixException {

		MapList returnMapList = new MapList();
		try {

			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			MapList objectList  = (MapList) programMap.get("objectList");

			String strDefaultProjectVal = ProgramCentralConstants.EMPTY_STRING;
			String ATTRIBUTE_PROJECT_SCHEDULE_FROM_VAL = "attribute["+ DomainConstants.ATTRIBUTE_PROJECT_SCHEDULE_FROM+"]";
			String  ATTRIBUTE_DEFAULT_CONSTRAINT_VAL = "attribute["+DomainConstants.ATTRIBUTE_DEFAULT_CONSTRAINT_TYPE+"]";
			String ATTRIBUTE_TASK_CONSTRAINT_VAL = "attribute["+ DomainConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE+"]";
			String sLanguage = context.getSession().getLanguage();


			int size = objectList.size();

			for(int k=0; k< size ; k++){
				Map<String,String> parentObjectInfoMap = (Map)objectList.get(k);
				String parentType = parentObjectInfoMap.get(ProgramCentralConstants.SELECT_PROJECT_TYPE);
				String isProjectSpace = parentObjectInfoMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE);
				String isProjectConcept = parentObjectInfoMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT);
				String isProjectTemplate = parentObjectInfoMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_TEMPLATE);

				if("true".equalsIgnoreCase(isProjectSpace) || "true".equalsIgnoreCase(isProjectConcept)){
					strDefaultProjectVal = parentObjectInfoMap.get(ATTRIBUTE_DEFAULT_CONSTRAINT_VAL);
				}
				else if("true".equalsIgnoreCase(isProjectTemplate)){
					strDefaultProjectVal = DomainConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ASAP;
					String scheduleFrom = parentObjectInfoMap.get(ATTRIBUTE_PROJECT_SCHEDULE_FROM_VAL);
					if(ProgramCentralConstants.ATTRIBUTE_SCHEDULED_FROM_RANGE_FINISH.equalsIgnoreCase(scheduleFrom)){
						strDefaultProjectVal = DomainConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ALAP;
					}
				} else {
					strDefaultProjectVal = parentObjectInfoMap.get(ATTRIBUTE_TASK_CONSTRAINT_VAL);
				}

				AttributeType atrTaskConstraint = new AttributeType(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE);
				atrTaskConstraint.open(context);
				StringList strList = atrTaskConstraint.getChoices(context);
				atrTaskConstraint.close(context);

				StringList slTaskConstraintsRanges = new StringList();
				StringList slTaskConstraintsRangesTranslated = new StringList();

				if(strList.contains(strDefaultProjectVal)){
					slTaskConstraintsRanges.add(strDefaultProjectVal);
					strList.remove(strDefaultProjectVal);
					slTaskConstraintsRangesTranslated.add(EnoviaResourceBundle.getRangeI18NString(context, ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE, strDefaultProjectVal, sLanguage));
				}

				if(Boolean.valueOf(isProjectTemplate) || ProgramCentralConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(parentType)){
					String secondConstraintType = (strDefaultProjectVal.equalsIgnoreCase(ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ASAP))
							? ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ALAP : ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ASAP;
					slTaskConstraintsRanges.add(secondConstraintType);
					slTaskConstraintsRangesTranslated.add(EnoviaResourceBundle.getRangeI18NString(context,ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE, secondConstraintType, sLanguage));
				} else {
					for(int i=0; i<strList.size();i++){
						String strTaskConstraintRange = (String)strList.get(i);
						slTaskConstraintsRanges.add(strTaskConstraintRange);
						slTaskConstraintsRangesTranslated.add(EnoviaResourceBundle.getRangeI18NString(context,ProgramCentralConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE, strTaskConstraintRange, sLanguage));
					}
				}


				Map returnMap = new HashMap(2);
				returnMap.put("RangeValues", slTaskConstraintsRanges);
				returnMap.put("RangeDisplayValue", slTaskConstraintsRangesTranslated);

				returnMapList.add(returnMap);
			}	
		} catch (Exception e) {
			e.printStackTrace();
			throw new MatrixException(e);
		}
		return returnMapList;
	}

	private final String KEY_CRITICAL_TASK = "CriticalTask";
	public static final String ATTRIBUTE_CRITICAL_TASK = PropertyUtil.getSchemaProperty("attribute_CriticalTask");
	private static final String SELECT_ATTRIBUTE_CRITICAL_TASK = "attribute[" + ATTRIBUTE_CRITICAL_TASK + "]";
	private static final String SELECT_IS_DELETED_SUBTASK = "to[" + DomainConstants.RELATIONSHIP_DELETED_SUBTASK + "]";
	private static final String SELECT_IS_PARENT_TASK_DELETED = "to["+DomainConstants.RELATIONSHIP_SUBTASK+"].from.to[" + DomainConstants.RELATIONSHIP_DELETED_SUBTASK + "]";
	protected static String invokeFromODTFile = ProgramCentralConstants.EMPTY_STRING; 
	public static final String START_DATE_SET_TIME = "08:00:00 AM";
	public static final String FINISH_DATE_SET_TIME = "05:00:00 PM";
	public static final int HOURS_PER_DAY = 8;
	//End Addition:9-Jun-2010:DI1:R210 PRG:056258

	/** Keeps track of confirmed accesses for the context. */
	protected ArrayList _passedAccessTypes = new ArrayList();


	protected Map _taskMap = new HashMap();
	protected Map<String,Map<String, Dataobject>> _taskSeqMap = new HashMap<>();
	public static final String SELECT_TASK_ESTIMATED_DURATION =
			"attribute[" + DomainConstants.ATTRIBUTE_TASK_ESTIMATED_DURATION + "]";
	private static final String SELECT_SUBTASK_ATTRIBUTE_SEQUENCE_ORDER = "to["+DomainConstants.RELATIONSHIP_SUBTASK+"].attribute["+DomainConstants.ATTRIBUTE_SEQUENCE_ORDER+"]";
	private static final String SELECT_SUCCESSOR_TASK_ATTRIBUTE_SEQUENCE_ORDER = "to[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].from." + SELECT_SUBTASK_ATTRIBUTE_SEQUENCE_ORDER;
	/** The project access list id relative to project. */
	static protected final String SELECT_PROJECT_ACCESS_LIST_ID =
			"to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.id";

	static protected final String SELECT_PROJECT_ACCESS_KEY_PHYSICAL_ID =
			"to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.physicalid";

	/** The project access key id relative to task predecessor. */
	static protected final String SELECT_PROJECT_ACCESS_KEY_PHYSICAL_ID_FOR_PREDECESSOR =
			"from[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].to." + SELECT_PROJECT_ACCESS_KEY_PHYSICAL_ID;

	/** The project access list id relative to project. */
	static protected final String SELECT_PROJECT_ACCESS_KEY_ID =
			"to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.id";
	static protected final String SELECT_PROJECT_ACCESS_KEY_ID_FOR_SUCCESSOR =
			"to[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].from." + SELECT_PROJECT_ACCESS_KEY_ID;
	private static final String SELECT_SUCCESSOR_LAG_TIME_INPUT = "to[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].attribute[" + DependencyRelationship.ATTRIBUTE_LAG_TIME + "].inputvalue";
	private static final String SELECT_SUCCESSOR_LAG_TIME_UNITS = "to[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].attribute[" + DependencyRelationship.ATTRIBUTE_LAG_TIME + "].inputunit";
	public static final String SELECT_SUCCESSOR_TYPES = "to[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].attribute[" +DependencyRelationship.ATTRIBUTE_DEPENDENCY_TYPE + "]";
	private static final String SELECT_PREDECESSOR_LAG_TIME_INPUT = "from[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].attribute[" + DependencyRelationship.ATTRIBUTE_LAG_TIME + "].inputvalue";
	private static final String SELECT_PREDECESSOR_LAG_TIME_UNITS = "from[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].attribute[" + DependencyRelationship.ATTRIBUTE_LAG_TIME + "].inputunit";

	
 @com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getPMCWBSForecastViewTableForDataGrid(Context context, String[]args) throws Exception{
		MapList mlColumns = new MapList();
		MapList columnList = new MapList();
		try {
	
			UITable uiPMCWBSViewTable = new UITable();

			mlColumns = uiPMCWBSViewTable.getColumns(context,"PMCWBSViewTableENXSBGrid",null);
						
			StringList includeColumnList = new StringList();
			includeColumnList.add("Name");
			includeColumnList.add("Type");
			includeColumnList.add("ID");
			includeColumnList.add("Dependency");
			includeColumnList.add("Complete");
			includeColumnList.add("PhaseEstimatedDuration");
			includeColumnList.add("PhaseEstimatedStartDate");
			includeColumnList.add("PhaseEstimatedEndDate");
			includeColumnList.add("PhaseActualDuration");
			includeColumnList.add("PhaseActualStartDate");
			includeColumnList.add("PhaseActualEndDate");
			includeColumnList.add("ForecastDuration");
			includeColumnList.add("ForecastStartDate");
			includeColumnList.add("ForecastFinishDate");

			HashMap programMap        = (HashMap) JPO.unpackArgs(args);
			HashMap requestMap        = (HashMap) programMap.get("requestMap");
			String objectId = (String)requestMap.get("objectId");
			String strForecastCalculatedOn = ProgramCentralConstants.EMPTY_STRING;
			
			if(ProgramCentralUtil.isNotNullString(objectId)) {

				BusinessObjectWithSelectList bwsl = 
						ProgramCentralUtil.getObjectWithSelectList(context, 
								new String[]{objectId}, 
								new StringList(ProgramCentralConstants.SELECT_ATTRIBUTE_FORECAST_CALCULATED_ON),
								true);


				BusinessObjectWithSelect bws 	= bwsl.getElement(0);
				strForecastCalculatedOn	= bws.getSelectData(ProgramCentralConstants.SELECT_ATTRIBUTE_FORECAST_CALCULATED_ON);

				Locale locale 			= (Locale)requestMap.get("localeObj");
				double clientTZOffset 	= Task.parseToDouble((String)(requestMap.get("timeZone")));
				int iDateFormat 		= eMatrixDateFormat.getEMatrixDisplayDateFormat();
				DateFormat format 		= DateFormat.getDateTimeInstance(iDateFormat, iDateFormat, locale);

				strForecastCalculatedOn = eMatrixDateFormat.getFormattedDisplayDateTime(context, strForecastCalculatedOn, true,iDateFormat, clientTZOffset,locale);
			}
			String languageStr = context.getSession().getLanguage();

			StringList types = new StringList();
			
			String strForecastGroupHeader = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Forecast",languageStr);
			String strUpdated = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Schedule.Float.Updated",languageStr);
			
			for(Iterator itr = mlColumns.iterator();itr.hasNext();){
				Map ColumnMap = (Map)itr.next();
				String strColumnName = (String)ColumnMap.get("name");
				
				if(includeColumnList.contains(strColumnName)){
					columnList.add(ColumnMap);
				}
					if("ForecastDuration".equalsIgnoreCase(strColumnName) || "ForecastStartDate".equalsIgnoreCase(strColumnName) || "ForecastFinishDate".equalsIgnoreCase(strColumnName)){
					Map settingsMap = (Map) ColumnMap.get("settings");
					settingsMap.put("Group Header",strForecastGroupHeader+ " ("+strUpdated+" : "+strForecastCalculatedOn +" )");
					ColumnMap.put("settings", settingsMap);
				}
			}

		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return columnList;
	}
	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public boolean isForecastViewForDataGrid(Context context,String args[]) throws Exception
	{
		boolean isForecastView = false;
		try {
			HashMap inputMap = (HashMap)JPO.unpackArgs(args);
			String selectedTable = (String)inputMap.get("selectedTable");

			if(ProgramCentralUtil.isNotNullString(selectedTable) && selectedTable.contains("PMCWBSForecastViewTableENXSBGrid")){
				isForecastView = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return isForecastView;
	}
	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public boolean showForecastColumnForDataGrid(Context context,String args[]) throws Exception
	{
		boolean showForecastColumn = false;
		try {
			HashMap inputMap = (HashMap)JPOUtil.unpackArgs(args);
			String objectId = (String) inputMap.get("objectId");
			
			String scheduleBasedOn = ProgramCentralConstants.EMPTY_STRING;
			
			if(ProgramCentralUtil.isNotNullString(objectId)) {
				final String SELECT_PARENT_PROJECT_SCHEDULE_BASED_ON = ProgramCentralConstants.SELECT_PROJECT_OBJECT +"."+ProgramCentralConstants.SELECT_ATTRIBUTE_PROJECT_SCHEDULE_BASED_ON;
				StringList objectSelects = new StringList();
				objectSelects.add(ProgramCentralConstants.SELECT_ATTRIBUTE_PROJECT_SCHEDULE_BASED_ON);
				objectSelects.add(SELECT_PARENT_PROJECT_SCHEDULE_BASED_ON);
				
				MapList projectInfoList = ProgramCentralUtil.getObjectDetails(context, new String[] {objectId}, objectSelects, false);
				Map projectInfo = (Map)projectInfoList.get(0);
				scheduleBasedOn = (String)projectInfo.get(ProgramCentralConstants.SELECT_ATTRIBUTE_PROJECT_SCHEDULE_BASED_ON);
				
				if(ProgramCentralUtil.isNullString(scheduleBasedOn)) {
					scheduleBasedOn = (String)projectInfo.get(SELECT_PARENT_PROJECT_SCHEDULE_BASED_ON);
				}
			}
			String selectedTable = (String)inputMap.get("selectedTable");

			if("Forecast".equalsIgnoreCase(scheduleBasedOn) || ProgramCentralUtil.isNotNullString(selectedTable) && selectedTable.contains("PMCWBSForecastViewTableENXSBGrid")){
				showForecastColumn = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return showForecastColumn;
	}
	
    /**
	*column function for column "Actions" of PMCWBSViewTableENXSBGrid table 
	**/
	public StringList getActionsColumnForDataGrid(Context context,String[]args)throws Exception
	{
		Map programMap 		= (HashMap) JPOUtil.unpackArgs(args);
		Map paramList 		= (Map) programMap.get("paramList");
		MapList objectList 	= (MapList) programMap.get("objectList");
		invokeFromODTFile 	= (String)programMap.get("invokeFrom"); //Added for ODT
		String expandFilter = (String)paramList.get("emxExpandFilter");
		String exportFormat 	= (String)paramList.get("exportFormat");
		String contextObjectId 	= (String)paramList.get("objectId");
		String isCallFromDataGrid = "true";
		int size = objectList.size();
		StringList passiveIconList = new StringList(size);

		Map mapTaskInfo = new LinkedHashMap();
		String []taskIdArray = new String[size];
		for(int i=0;i<size;i++){
			Map objectMap = (Map)objectList.get(i);
			String taskId = (String) objectMap.get(DomainObject.SELECT_ID);
			taskIdArray[i] = taskId;
			mapTaskInfo.put(taskId, objectMap);
		}

	
		String lang = context.getSession().getLanguage();
		String switchPassiveToActiveTooltip = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
				"emxProgramCentral.Command.PMCPassiveSwitchProject", lang);
		String removePassiveProjectTooltip = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
				"emxProgramCentral.Command.PMCPassiveRemoveProject", lang);
		String dataInSyncTooltip = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
				"emxProgramCentral.PassiveProjectSpace.DataInSync", lang);
		String strDataOutOfSync = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
				"emxProgramCentral.PassiveProjectSpace.SyncData", lang);
		String strApproveGate = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
				"emxProgramCentral.Gate.SyncIconMessage", lang);

		
		
		String strI18_EstimatedStartDate = EnoviaResourceBundle.getProperty(context, "Framework","emxFramework.Attribute.Task_Estimated_Start_Date", lang);
		String strI18_EstimatedFinishDate = EnoviaResourceBundle.getProperty(context, "Framework","emxFramework.Attribute.Task_Estimated_Finish_Date", lang);
		String strI18_ActualStartDate = EnoviaResourceBundle.getProperty(context, "Framework","emxFramework.Attribute.Task_Actual_Start_Date", lang);
		String strI18_ActualFinishDate = EnoviaResourceBundle.getProperty(context, "Framework","emxFramework.Attribute.Task_Actual_Finish_Date", lang);
		String strI18_TaskPercentComplete = EnoviaResourceBundle.getProperty(context, "Framework","emxFramework.Attribute.Percent_Complete", lang);


		StringBuilder datesInSynchHTML = new StringBuilder();
		datesInSynchHTML.append("<img src=\"../../common/images/iconActionChecked.gif\"");
		datesInSynchHTML.append(" alt=\""+dataInSyncTooltip+"\"");
		datesInSynchHTML.append(" title=\""+dataInSyncTooltip+"");
		datesInSynchHTML.append("\"/>");


	

		Set<String> ids = new HashSet<>(Arrays.asList(taskIdArray));
		if("1".equalsIgnoreCase(expandFilter)) {
			for(int i=0;i<size;i++){
				Map objectMap = (Map)objectList.get(i);
				String parentId = (String) objectMap.get("id[parent]");
				ids.add(parentId); 
			}
		}

		for(int i=0;i<size;i++) {
			Map objectInfo = (Map)objectList.get(i);
			String hasPassiveProject 	= (String)objectInfo.get("from[Passive Subtask]");
			boolean isProjectSpaceOrConcept 	= "True".equalsIgnoreCase((String)objectInfo.get(ProgramCentralConstants.SELECT_IS_PROJECT_SPACE)) ||"True".equalsIgnoreCase((String)objectInfo.get(ProgramCentralConstants.SELECT_IS_PROJECT_CONCEPT));
			StringList passiveParentList = (StringList)objectInfo.get("to[Passive Subtask].from.id");
			StringList passiveConnectionIdList = (StringList)objectInfo.get("to[Passive Subtask].id");
			boolean hasModifyAccess = "True".equalsIgnoreCase((String)objectInfo.get("current.access[modify]"));
			boolean hasFromDisconnectAccess = "True".equalsIgnoreCase((String)objectInfo.get("current.access[fromdisconnect]"));
			String objectId = taskIdArray[i];
			boolean passiveProj = false;
			String passiveConnectionId = ProgramCentralConstants.EMPTY_STRING;
			String passiveParentId = ProgramCentralConstants.EMPTY_STRING;

			if(passiveParentList!= null) {
				for(int j=0;j<passiveParentList.size();j++) {
					if(ids.contains(passiveParentList.get(j))) {
						passiveConnectionId = passiveConnectionIdList.get(j);
						passiveParentId = passiveParentList.get(j);
						passiveProj = true;
						break;
					}
				}
			}

			System.out.println("objectInfo : " + objectInfo);
			String seqId = objectInfo != null ? (String) objectInfo.get("seqId") : ProgramCentralConstants.EMPTY_STRING;
			boolean isContextObject = objectId.equalsIgnoreCase(contextObjectId) && ProgramCentralUtil.isNullString(seqId);//Task open in new tab

			if("true".equalsIgnoreCase(hasPassiveProject)) {
				String placeholderTaskEstimatedStartDate = (String)objectInfo.get(Task.SELECT_TASK_ESTIMATED_START_DATE);
				String placeholderTaskEstimatedFinishDate = (String)objectInfo.get(Task.SELECT_TASK_ESTIMATED_FINISH_DATE);
				String placeholderTaskPercentComplete = (String)objectInfo.get(Task.SELECT_PERCENT_COMPLETE);
				String placeholderTaskActualStartDate = (String)objectInfo.get(Task.SELECT_TASK_ACTUAL_START_DATE);
				String placeholderTaskActualFinishDate = (String)objectInfo.get(Task.SELECT_TASK_ACTUAL_FINISH_DATE);
				boolean isPlaceholderTaskCompleted = (ProgramCentralUtil.isNotNullString(placeholderTaskActualStartDate) && ProgramCentralUtil.isNotNullString(placeholderTaskActualFinishDate));

				boolean isMilestone= "TRUE".equalsIgnoreCase((String)objectInfo.get(ProgramCentralConstants.SELECT_IS_MILESTONE));
                boolean isGate= "TRUE".equalsIgnoreCase((String)objectInfo.get(ProgramCentralConstants.SELECT_IS_GATE));
                String projectScheduledFrom= (String)objectInfo.get(ProgramCentralConstants.SELECT_PROJECT_SCHEDULE_FROM_TASK);


				
//				String passiveProjectEstimatedStartDate = (String)objectInfo.get("from[Passive Subtask].to.attribute[Task Estimated Start Date]");
//				String passiveProjectEstimatedFinishDate = (String)objectInfo.get("from[Passive Subtask].to.attribute[Task Estimated Finish Date]");
//				String passiveProjectActualStartDate = (String)objectInfo.get("from[Passive Subtask].to.attribute[Task Actual Start Date]");
//				String passiveProjectActualFinishDate = (String)objectInfo.get("from[Passive Subtask].to.attribute[Task Actual Finish Date]");
//				String passiveProjectPercentComplete = (String)objectInfo.get("from[Passive Subtask].to.attribute[Percent Complete]");
				
				StringList passiveEstimatedDurationList = (StringList)objectInfo.get("from[Passive Subtask].to."+SELECT_TASK_ESTIMATED_DURATION);
                StringList passiveEstimatedStartDateList = (StringList)objectInfo.get("from[Passive Subtask].to.attribute[Task Estimated Start Date]");
                StringList passiveEstimatedFinishDateList = (StringList)objectInfo.get("from[Passive Subtask].to.attribute[Task Estimated Finish Date]");
                StringList passiveActualStartDateList = (StringList)objectInfo.get("from[Passive Subtask].to.attribute[Task Actual Start Date]");
                StringList passiveActualFinishDateList = (StringList)objectInfo.get("from[Passive Subtask].to.attribute[Task Actual Finish Date]");
                StringList passivePecentCompleteList = (StringList)objectInfo.get("from[Passive Subtask].to.attribute[Percent Complete]");
                
                String passiveProjectEstimatedStartDate = Task.getEarliestDate(context, passiveEstimatedStartDateList, true);
                String passiveProjectEstimatedFinishDate = Task.getEarliestDate(context, passiveEstimatedFinishDateList, false);
                String passiveProjectActualStartDate = Task.getEarliestDate(context, passiveActualStartDateList, true);
                String passiveProjectActualFinishDate = passiveActualFinishDateList.contains(ProgramCentralConstants.EMPTY_STRING) ? ProgramCentralConstants.EMPTY_STRING : Task.getEarliestDate(context, passiveActualFinishDateList, false);
                String passiveProjectPercentComplete = Task.getPercentCompleteForPlaceholderTask(context, passiveEstimatedDurationList, passivePecentCompleteList);

			        if(isMilestone || isGate) {
	                	 if(ProgramCentralConstants.ATTRIBUTE_SCHEDULED_FROM_RANGE_START.equalsIgnoreCase(projectScheduledFrom)){
	                		 //if project schedule from START, use later dates
	                		 passiveProjectEstimatedStartDate = passiveProjectEstimatedFinishDate;
	                		 passiveProjectActualStartDate = ProgramCentralUtil.isNotNullString(passiveProjectActualFinishDate) ? passiveProjectActualFinishDate : Task.getEarliestDate(context, passiveActualStartDateList, false);
	                	 } else {
	                		//if project schedule from FINISH, use earlier dates
	                		 passiveProjectEstimatedFinishDate = passiveProjectEstimatedStartDate;
	                		 passiveProjectActualFinishDate = ProgramCentralUtil.isNotNullString(passiveProjectActualFinishDate) ? passiveProjectActualStartDate : "";
	                	 }
	                	 
//	                	 if(isGate) {
//	                		 passiveProjectActualFinishDate = null;
//	                	 }
	                	 
	                	 boolean allCompleted100Percent = true;
	                	 for(int j=0,passivePecentCompleteListSize=passivePecentCompleteList.size();j<passivePecentCompleteListSize;j++)
	                	 {
	                		 if(!"100.0".equals(passivePecentCompleteList.get(j))) {
	                			 allCompleted100Percent = false;
	                			 break;
	                		 }
	                	 }

	                	 if(allCompleted100Percent) {
	                		 passiveProjectPercentComplete = "100.0";
	                	 }else {
	                		 passiveProjectPercentComplete =  "0.0";
	                	 }
	                	                 	 
	                 }
				

				boolean isEstimatedStartDateInSync = placeholderTaskEstimatedStartDate.equalsIgnoreCase(passiveProjectEstimatedStartDate);
				boolean isEstimatedFinishDateInSync = placeholderTaskEstimatedFinishDate.equalsIgnoreCase(passiveProjectEstimatedFinishDate);
				boolean isActualStartDateInSync = placeholderTaskActualStartDate.equalsIgnoreCase(passiveProjectActualStartDate);
				boolean isActualFinishDateInSync = placeholderTaskActualFinishDate.equalsIgnoreCase(passiveProjectActualFinishDate);
				boolean isTaskPercentCompleteInSync = placeholderTaskPercentComplete.equalsIgnoreCase(passiveProjectPercentComplete);

				StringBuilder dataOutOfSyncTooltip = new StringBuilder();
				dataOutOfSyncTooltip.append(strDataOutOfSync+" : ");
				boolean showHyperlinkOnSyncIcon = true;

				if(!(isEstimatedStartDateInSync && isEstimatedFinishDateInSync && isActualStartDateInSync && isActualFinishDateInSync && isTaskPercentCompleteInSync)){

					if(!isEstimatedStartDateInSync) {
						dataOutOfSyncTooltip.append("'"+strI18_EstimatedStartDate+"'");
						dataOutOfSyncTooltip.append(", ");
					}

					if(!isEstimatedFinishDateInSync) {
						dataOutOfSyncTooltip.append("'"+strI18_EstimatedFinishDate+"'");
						dataOutOfSyncTooltip.append(", ");
					}

					if(!isActualStartDateInSync) {
						dataOutOfSyncTooltip.append("'"+strI18_ActualStartDate+"'");
						dataOutOfSyncTooltip.append(", ");
					}

					if(!isActualFinishDateInSync) {
						if(isGate && ProgramCentralUtil.isNullString(placeholderTaskActualFinishDate) && (isEstimatedStartDateInSync && isEstimatedFinishDateInSync && isActualStartDateInSync &&  isTaskPercentCompleteInSync)) {
							dataOutOfSyncTooltip = new StringBuilder();
							dataOutOfSyncTooltip.append(strApproveGate);
							dataOutOfSyncTooltip.append(", ");
							showHyperlinkOnSyncIcon = false;
						} else {
						dataOutOfSyncTooltip.append("'"+strI18_ActualFinishDate+"'");
						dataOutOfSyncTooltip.append(", ");
					}
					}

					if(!isTaskPercentCompleteInSync) {
						dataOutOfSyncTooltip.append("'"+strI18_TaskPercentComplete+"'");
						dataOutOfSyncTooltip.append(", ");
					}


					String outOfSyncTooltip = dataOutOfSyncTooltip.toString();
					outOfSyncTooltip = outOfSyncTooltip.substring(0, outOfSyncTooltip.lastIndexOf(", "));
					StringBuilder datesOutOfSynchHTML = new StringBuilder();
					if(showHyperlinkOnSyncIcon) {
					datesOutOfSynchHTML.append("<a href=\"javascript:syncPassiveProject('"+objectId+"','"+isCallFromDataGrid+"')\">");
					datesOutOfSynchHTML.append("<img src=\"../../programcentral/images/iconSyncChanges.gif\" title=\""+outOfSyncTooltip+"\"/></a>");
					}else {
						datesOutOfSynchHTML.append("<img src=\"../../programcentral/images/iconSyncChanges.gif\" title=\""+outOfSyncTooltip+"\"/>");
					}

					if(hasModifyAccess && !isPlaceholderTaskCompleted) {
					    passiveIconList.add(datesOutOfSynchHTML.toString());
					} else {
						passiveIconList.add(ProgramCentralConstants.EMPTY_STRING);
					}
				} else {
					passiveIconList.add(datesInSynchHTML.toString());
				}	
			}else if(passiveProj) {

				StringBuilder passiveProjectHTML = new StringBuilder();
				boolean isPlaceholderTaskCompleted = "Complete".equalsIgnoreCase((String)objectInfo.get("to[Passive Subtask].from.current"));
				String passiveProjectState = (String)objectInfo.get(ProgramCentralConstants.SELECT_CURRENT);
				boolean isPassiveProjectInHoldState = "Hold".equalsIgnoreCase(passiveProjectState);
				boolean isPassiveProjectInCancelState = "Cancel".equalsIgnoreCase(passiveProjectState);

				if(isProjectSpaceOrConcept && hasModifyAccess && !isPlaceholderTaskCompleted && !isPassiveProjectInHoldState && !isPassiveProjectInCancelState) {
					Map parentMapInfo = (Map) mapTaskInfo.get(passiveParentId);
					boolean hasSinglePassiveObject = parentMapInfo!= null ? ((StringList) parentMapInfo.get("from[Passive Subtask].to.id")).size() == 1 :
							passiveParentId.equalsIgnoreCase(contextObjectId) && size ==  1;
					if(hasSinglePassiveObject) {
					passiveProjectHTML.append("<a href=\"javascript:switchPassiveToActiveProject('"+passiveConnectionId+"','"+objectId+"','"+passiveParentId+"','"+isCallFromDataGrid+"')\">");
					passiveProjectHTML.append("<img src=\"../../programcentral/images/PassivePrj-32.png\" title=\""+switchPassiveToActiveTooltip+"\"/></a>");
				}
				}
				
				if(hasModifyAccess && hasFromDisconnectAccess || isPassiveProjectInCancelState) {
					passiveProjectHTML.append("<a href=\"javascript:removePassiveProject('"+passiveConnectionId+"','"+isCallFromDataGrid+"')\">");
					passiveProjectHTML.append("<img src=\"../../common/images/iconActionGenericRemove.png\" title=\""+removePassiveProjectTooltip+"\"/></a>");
				}
				passiveIconList.add(passiveProjectHTML.toString());	
			}else {
				passiveIconList.add(ProgramCentralConstants.EMPTY_STRING);
			}

		}

		return passiveIconList;
	}
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getTaskWeightageForDataGrid (Context context,String[]args)throws Exception
    {
	Map programMap      = (Map) JPOUtil.unpackArgs(args);
        
        MapList objectList  = (MapList) programMap.get("objectList");
        final String SELECT_TASKWEIGHTAGE_FROM_TASK = "to[Subtask].attribute[TaskWeightage]";

        int size = objectList.size();
        StringList taskWeightageList = new StringList(size);

        for (int i = 0; i < size; i++) {
            Map objectInfo = (Map)objectList.get(i);
            String weightageValue = (String)objectInfo.get(SELECT_TASKWEIGHTAGE_FROM_TASK);
            String isRootNode = (String)(((Map)objectList.get(i)).get("Root Node"));

            if(ProgramCentralUtil.isNotNullString(weightageValue)) {
                taskWeightageList.add(weightageValue);
            } else if("true".equalsIgnoreCase(isRootNode)){
                taskWeightageList.add("");
            } else {
                taskWeightageList.add("0");
            }
        }
        return taskWeightageList;
    }
    
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList isTaskWeightageCellEditableForDataGrid(Context context, String[] args) throws MatrixException
    {
    	try{
    		StringList editAccessList = new StringList();
		Map programMap      = (Map) JPOUtil.unpackArgs(args);
    		MapList objectList = (MapList) programMap.get("objectList");

    		int size = objectList.size();

    		for (int i = 0; i < size; i++) {
    			Map objectInfo = (Map)objectList.get(i);
    			String taskState = (String)objectInfo.get(ProgramCentralConstants.SELECT_CURRENT);

    			String isRootNode = (String)(((Map)objectList.get(i)).get("Root Node"));

    			if(ProgramCentralConstants.STATE_PROJECT_SPACE_REVIEW.equalsIgnoreCase(taskState) || ProgramCentralConstants.STATE_PROJECT_SPACE_COMPLETE.equalsIgnoreCase(taskState) || "True".equalsIgnoreCase(isRootNode)){
    				editAccessList.add("false");
    			} else {
    				editAccessList.add("true");
    			}
    		}
    		return editAccessList;

    	}catch(Exception e){
    		throw new MatrixException(e);
    	}
    }
    
	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getNameColumnForDataGrid(Context context,String[] args)throws Exception
	{
		Map programMap 		= (HashMap) JPOUtil.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
		
		int size = objectList.size();

		StringList nameList 	= new StringList(size);

		for(int i=0;i<size;i++){
			Map objectInfo = (Map)objectList.get(i);
			String objectType = (String)objectInfo.get(ProgramCentralConstants.SELECT_TYPE);
            String objectName = (String)objectInfo.get(ProgramCentralConstants.SELECT_NAME);
            
			 if(DomainConstants.TYPE_PERSON.equalsIgnoreCase(objectType)){
				 objectName = (String)objectInfo.get(Person.SELECT_LAST_NAME)+","+(String)objectInfo.get(Person.SELECT_FIRST_NAME);
			 }
			 nameList.add(objectName);
		}

		return nameList;
	
	}
    /**
     * Returns StringList of HTML code for task assignees.
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments.
     * @throws Exception if operation fails
     */
	 public StringList assignmentAllocationViewMembersColumn(Context context, String[] args) throws Exception {
			
			//Return value variable
			StringList returnStringList = new StringList();
			try {
			
			//To get arguments from UI
			HashMap argMap = JPO.unpackArgs(args);
			HashMap paramList   = (HashMap) argMap.get("paramList");
			HashMap requestMap   = (HashMap) argMap.get("requestMap");
			//String projectObjId = (String) paramList.get("objectId");
			String exportFormat = (String)paramList.get("exportFormat");
			
			String selectedProgram = (String)paramList.get("selectedProgram");
			boolean isPassiveTaskProgramSelected = selectedProgram!=null && selectedProgram.contains("getPassiveSubtasks");
			
			//To get object info from arguments
			List objList = (List) argMap.get("objectList");			
			
			StringList memberSelects = new StringList();
			memberSelects.add(Person.SELECT_ID);
			memberSelects.add(Person.SELECT_NAME);
			memberSelects.add(Person.SELECT_FIRST_NAME);
			memberSelects.add(Person.SELECT_COMPANY_NAME);
			memberSelects.add(Person.SELECT_LAST_NAME);
			memberSelects.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
			
			final String SELECT_RELATIONSHIP_ID = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].id";
		    final String SELECT_ASSIGNEE_ID = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].from.id";
		    final String SELECT_PERCENT_ALLOCATION = "to["+ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS+"].attribute["+
														 ProgramCentralConstants.ATTRIBUTE_PERCENT_ALLOCATION+"].value";

			
			StringList objSelects = new StringList();
		    objSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
		    objSelects.add(ProgramCentralConstants.SELECT_CURRENT);
		    objSelects.add(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
		    objSelects.add(SELECT_RELATIONSHIP_ID);
		    objSelects.add(SELECT_ASSIGNEE_ID);
		    objSelects.add(SELECT_PERCENT_ALLOCATION);
			objSelects.add("current.access[modify]");

		StringList passiveTaskIdList = new StringList();
		    String[] objIdArr = new String[objList.size()];
		    for (int i = 0; i < objList.size(); i++) {
		     	Map mObject = (Map) objList.get(i);
		     	objIdArr[i] = (String)mObject.get(ProgramCentralConstants.SELECT_ID);
			String seqId = mObject != null ? (String) mObject.get("seqId") : DomainConstants.EMPTY_STRING;
			if(ProgramCentralUtil.isNullString(seqId) && isPassiveTaskProgramSelected) {
				passiveTaskIdList.add((String)mObject.get(ProgramCentralConstants.SELECT_ID));
			}
		    }

		    MapList taskInfoMapList = DomainObject.getInfo(context, objIdArr, objSelects);
			
	       
	        //ProjectSpace project = new ProjectSpace(projectObjId);

			
			for(int objListIterator=0; objListIterator<objList.size(); objListIterator++) {
				
				String taskId="";
				String sRowID = "";
				String sOID = "";
					if(objList.get(objListIterator) instanceof HashMap) {
						HashMap mapListElement = (HashMap) objList.get(objListIterator);
						sOID = (String)mapListElement.get(ProgramCentralConstants.SELECT_ID);
				if(passiveTaskIdList.contains(sOID)) {
					returnStringList.add("");
					continue;
				}
				taskId = (String)mapListElement.get("physicalid");
						sRowID = (String)mapListElement.get("id[level]");

					}
					else if(objList.get(objListIterator) instanceof Hashtable) {//Member Task Assignment View passes Hashtable from objList Also it gives generic task ID so we need to convert it to physicalId
						Hashtable mapListElement = (Hashtable) objList.get(objListIterator);
				taskId = (String)mapListElement.get(ProgramCentralConstants.SELECT_ID);
				if(passiveTaskIdList.contains(taskId)) {
					returnStringList.add("");
					continue;
				}
						taskId = Task.getPhysicalId(context,taskId);
						sRowID = (String)mapListElement.get("id[level]");
						sOID = (String)mapListElement.get(ProgramCentralConstants.SELECT_ID);
					}
             
             
				Task taskObj = new Task(taskId);
				MapList assignedPeopleMap = new MapList();
				if(UIUtil.isNotNullAndNotEmpty(taskId)){
					assignedPeopleMap = taskObj.getAssignees(context, memberSelects, null, null);
					assignedPeopleMap.sort(Person.SELECT_FIRST_NAME, "ascending", "String");
					assignedPeopleMap.sort(Person.SELECT_LAST_NAME, "ascending", "String");
				}
				String htmlForInitialsButton = "";
				
				String htmlForAllAssigneesForTheTask = "";
				if(!("CSV".equalsIgnoreCase(exportFormat) || ("HTML".equalsIgnoreCase(exportFormat)) || "text".equalsIgnoreCase(exportFormat))){
					htmlForAllAssigneesForTheTask = "<link rel=\"stylesheet\" type=\"text/css\" href=\"../programcentral/styles/popup.css\"/><table><tr style='overflow-x : hidden;'>";
				}
				if(assignedPeopleMap.size()>0) {
				for(int assignedPeopleMapItr=0;assignedPeopleMapItr<assignedPeopleMap.size();assignedPeopleMapItr++) {
					/*
					int allocSpanId = 1;
					int allocSpanIdPercentChange = 1;
					*/
					String allocSpanId = "";
					String allocSpanIdPercentChange = "";
					Map assignedPerson = (Map) assignedPeopleMap.get(assignedPeopleMapItr);
					String firstName = assignedPerson.get(Person.SELECT_FIRST_NAME).toString();
					String lastName = assignedPerson.get(Person.SELECT_LAST_NAME).toString();
					String sPersonOID = assignedPerson.get(Person.SELECT_ID).toString();
					String sRelId = assignedPerson.get("id[connection]").toString();
					String userName = assignedPerson.get(Person.SELECT_NAME).toString();
					String randomNumberStr = Double.toString(Math.random()*99999 + Math.random()*99999).replace(".","-");
					//User Group title
					String title = assignedPerson.get(DomainConstants.SELECT_ATTRIBUTE_TITLE).toString();
					String assigneeType = assignedPerson.get(DomainConstants.SELECT_TYPE).toString();
					String altValue = title;
					String fullNameForMouseOver = title;
					
					String fullNameToDisplay = firstName+" "+lastName;
					if(DomainConstants.TYPE_GROUP.equalsIgnoreCase(assigneeType) || ProgramCentralConstants.TYPE_GROUP_PROXY.equalsIgnoreCase(assigneeType)){
						fullNameToDisplay = title;
					}
					if(fullNameToDisplay.length()>22){
						fullNameToDisplay = fullNameToDisplay.substring(0,19)+"...";
					}
					
					String sImage = getSwymURL(context, userName);
					String imageHtml = "";
					
					/*
					if(sImage.equalsIgnoreCase("noimage")){
						imageHtml = "<div class='assignee-allocation-initials assignee-allocation-img img-circle'>"+firstName.substring(0,1).toUpperCase()+lastName.substring(0,1).toUpperCase()+"</div>";
					}
					else{
						imageHtml = "<img src='"+sImage+"' alt='"+firstName.substring(0,1).toUpperCase()+lastName.substring(0,1).toUpperCase()+"' class='img-circle assignee-allocation-img' />";
					}
					*/
					double dValue = 0;
					boolean isTaskComplete = false;
					
					for (int i = 0; i < taskInfoMapList.size(); i++) {
						Map taskInfoMap = (Map) taskInfoMapList.get(i);
						StringList slAssigneeList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_ASSIGNEE_ID));
						StringList slPercentAllocationList = ProgramCentralUtil.getAsStringList(taskInfoMap.get(SELECT_PERCENT_ALLOCATION));
						 
					
					if(slAssigneeList.size() > 0 && slAssigneeList.contains(sPersonOID) && taskInfoMap.get("physicalid").equals(taskId)) {
						int index = slAssigneeList.indexOf(sPersonOID);
                 	//sRelId = (String)slRelIdList.get(index);
                     String sPercent = (String)slPercentAllocationList.get(index);

                     dValue = Task.parseToDouble(sPercent);
					 
					String hasModify = (String)taskInfoMap.get("current.access[modify]");
                     if(taskInfoMap.get("current").equals(Task.CHECKLIST_STATE_COMPLETE) || "False".equalsIgnoreCase(hasModify)) {
                     	isTaskComplete = true;
                     }
                     
                     break;
					}
					}
					
					if(!("CSV".equalsIgnoreCase(exportFormat) || ("HTML".equalsIgnoreCase(exportFormat)) || "text".equalsIgnoreCase(exportFormat))){
						
						if(DomainConstants.TYPE_PERSON.equalsIgnoreCase(assigneeType)){
							altValue = firstName.substring(0,1).toUpperCase()+lastName.substring(0,1).toUpperCase();
							fullNameForMouseOver = firstName+" "+lastName;
						}
						imageHtml = "<img src='"+sImage+"' alt='"+altValue+"' class='img-circle assignee-allocation-img' />";					
					
					
					String sURLPrefix = "<a href='../programcentral/emxProgramCentralUtil.jsp?mode=wbsAllocationView&amp;subMode=allocate&amp;objectId=" + sOID + "&amp;rowId=" + sRowID + "&amp;personId=" + sPersonOID + "&amp;relId=" + sRelId + "&amp;relationship="+ ProgramCentralConstants.RELATIONSHIP_ASSIGNED_TASKS +"&amp;percent=";
                 String sURLSuffix = "' target='listHidden' style='font-size:6pt;'>";
                 String sURLSuffixForCancel = "' target='listHidden' style='color:#5b5d5e'>";
                 
					String visibilityStatus = isTaskComplete?"hidden":"visible";
					allocSpanId=  sPersonOID.replace(".","-")+"-"+sRelId.replace(".","-")+"-"+objListIterator+"-1"+randomNumberStr;
					allocSpanIdPercentChange = sPersonOID.replace(".","-")+"-"+sRelId.replace(".","-")+"-"+objListIterator+"-2"+randomNumberStr;
					String cancelButtonHtml = "<span class='assignee-allocation-cancel-btn'>"+sURLPrefix+"0.0"+sURLSuffixForCancel+"x</a>"+"</span>";
					htmlForInitialsButton = "<td style='padding-bottom:10px;'>";
					htmlForInitialsButton += "<span>";
					
					//Image code START
					htmlForInitialsButton +=  imageHtml;
					//Image code END
					
					htmlForInitialsButton += "<span class='assignee-allocation-container' title='"+fullNameForMouseOver+" ("+dValue+"%)"+"' onmouseover=\"var allocSpanElement=document.getElementById('"+allocSpanId+"');allocSpanElement.style.background='linear-gradient(to right,#007DA3 "+dValue+"%,#77797c "+dValue+"%, #77797c)';allocSpanElement.style.color='white';allocSpanElement.style.width='190px !important';this.style.transition='all 0.2s';allocSpanElement.innerHTML='"+dValue+"%';allocSpanElement.style.textAlign='center';allocSpanElement.style.borderRadius='0px 20px 20px 0px';var allocSpanPercentElement=document.getElementById('"+allocSpanIdPercentChange+"');allocSpanPercentElement.style.visibility='"+visibilityStatus+"';\" onmouseout=\"var allocSpanElement=document.getElementById('"+allocSpanId+"');allocSpanElement.style.background='inherit';allocSpanElement.style.color='#5b5d5e';allocSpanElement.style.borderRadius='0px';allocSpanElement.innerHTML='"+fullNameToDisplay+"';allocSpanElement.style.textAlign='left';var allocSpanPercentElement=document.getElementById('"+allocSpanIdPercentChange+"');allocSpanPercentElement.style.visibility='hidden';\">";
					
					htmlForInitialsButton += "<span style='margin-right:5px;'>";
					htmlForInitialsButton += "<span id='"+allocSpanId+"' class='assignee-allocation-progress-bar-container' >"+fullNameToDisplay+"</span>";
					htmlForInitialsButton += "</span>";
					htmlForInitialsButton += isTaskComplete?"":cancelButtonHtml;
					
					htmlForInitialsButton += "<table id='"+allocSpanIdPercentChange+"' style='width:160px;text-align:center;position:relative;top:-5px; left:5px; visibility:hidden'>";
					htmlForInitialsButton += "<tr style='font-size:10px !important'>";
					
					
					htmlForInitialsButton += "<td>"+sURLPrefix +  "10.0" + sURLSuffix +  "10</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "20.0" + sURLSuffix +  "20</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "30.0" + sURLSuffix +  "30</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "40.0" + sURLSuffix +  "40</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "50.0" + sURLSuffix +  "50</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "60.0" + sURLSuffix +  "60</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "70.0" + sURLSuffix +  "70</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "80.0" + sURLSuffix +  "80</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "90.0" + sURLSuffix +  "90</a></td>";
					htmlForInitialsButton += "<td>"+sURLPrefix +  "100.0" + sURLSuffix +  "100</a></td>";
					htmlForInitialsButton += "</tr>";
					//htmlForInitialsButton += "</tbody>";
					htmlForInitialsButton += "</table>";
					
					htmlForInitialsButton += "</span>";
					htmlForInitialsButton += "</span>";
					htmlForInitialsButton += "</td>";
					htmlForAllAssigneesForTheTask += htmlForInitialsButton;
					
					if((assignedPeopleMapItr + 1)%4 == 0 ) {
						htmlForAllAssigneesForTheTask += "</tr>";
						htmlForAllAssigneesForTheTask += "<tr>";
					}
					if(assignedPeopleMapItr+1 == assignedPeopleMap.size()) {
						htmlForAllAssigneesForTheTask += "</tr>";
					}
				}
				else{
					htmlForAllAssigneesForTheTask += fullNameForMouseOver+"("+dValue+"%) ,";
				}
				
				}
				if(!("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat) || "text".equalsIgnoreCase(exportFormat))){
				htmlForAllAssigneesForTheTask += "</table>";
				}
				else{
					htmlForAllAssigneesForTheTask = htmlForAllAssigneesForTheTask.substring(0,htmlForAllAssigneesForTheTask.length()-2);
				}
				returnStringList.add(htmlForAllAssigneesForTheTask);
				}
				else {
					returnStringList.add("");
				}
			}
			} catch(Exception exception) {
				exception.printStackTrace();
			}
			return returnStringList;
		}

	 
	 private static String getSwymURL(Context context, String userName) throws FrameworkException{
		String sImage = "";
		String lTenant = context.getTenant().toLowerCase();
		if (userName != null && !userName.isEmpty()) {

			String defaultSwym = "";
			String url = com.matrixone.apps.domain.util.PropertyUtil.getEnvironmentProperty(context, "SWYM_URL");

			if(ProgramCentralUtil.isNotNullString(url)){
				defaultSwym=lTenant + url;
				if (!defaultSwym.startsWith("https://")){
					defaultSwym = "https://" + defaultSwym;
				}
				if (!defaultSwym.endsWith("/")){
					defaultSwym = defaultSwym + "/";
				}
				String pictureAPIPrefix="/api/user/getpicture/login/";
				String pictureAPISuffixMini="/format/mini";
				sImage = defaultSwym + pictureAPIPrefix + userName + pictureAPISuffixMini ;
			}else{
				sImage= "../common/images/iconSmallPerson.png";
				
				//sImage = "noimage";
			}
		}
		return sImage;
	}
}
