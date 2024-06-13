/* emxTask.java

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxTask.java.rca 1.6 Wed Oct 22 16:21:23 2008 przemek Experimental przemek $
*/

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.SqlSession;

import com.daewooenc.mybatis.main.decSQLSessionFactory;
import com.dec.util.DecCommonUtil;
import com.dec.util.DecConstants;
import com.dec.util.DecDateUtil;
import com.dec.util.DecMatrixUtil;
import com.dec.util.DecStringUtil;
import com.dec.util.decFilterUtil;
import com.matrixone.apps.common.WorkCalendar;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.CacheUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.DebugUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.ProjectSpace;
import com.matrixone.apps.program.ProjectTemplate;
import com.matrixone.apps.program.Task;
import com.matrixone.jdom.Document;
import com.matrixone.jdom.Element;

import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectItr;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;

/**
 * The <code>emxTask</code> class represents the Task JPO
 * functionality for the AEF type.
 *
 * @version AEF 10.0.SP4 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxTask_mxJPO extends emxTaskBase_mxJPO
{
	private final String TASK_PROJECT_ID = "to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.id";
    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF 10.0.SP4
     * @grade 0
     */
    public emxTask_mxJPO (Context context, String[] args)
        throws Exception
    {
      super(context, args);
    }
    // jhlee Add 2023-07-28 상태 아이콘 변경
    /**
     * This method is used to show the status image.
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Vector containing all the status image value as String.
     * @throws Exception if the operation fails
     */
    public Vector getStatusIcon(Context context, String[] args) throws Exception
    {
        long start = System.currentTimeMillis();
    	Vector showIcon = new Vector();
        Map programMap      = (Map) JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        Map paramList       = (Map) programMap.get("paramList");
        String exportFormat = (String)paramList.get("exportFormat");
        String invokeFrom   = (String)programMap.get("invokeFrom"); //Added for OTD

        String sState = "";
        String sEstDate = "";
        String sForecastDate = "";

        
        Date date = new Date();
    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);
    	Locale locale = context.getLocale();

        String languageStr = (String) paramList.get("languageStr");
        
        try {
        	
            final String STRING_DELETED = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                    "emxProgramCentral.Common.Deleted", languageStr);

            // Find all the required infomration on each of the tasks here
            int size = objectList.size();
            String[] strObjectIds = new String[size];
            for (int i = 0; i < size; i++) {
                Map mapObject = (Map) objectList.get(i);
                String taskId = (String) mapObject.get(DomainObject.SELECT_ID);
                strObjectIds[i] = taskId;
            }

            StringList slBusSelect = new StringList(4);
            slBusSelect.add(DomainConstants.SELECT_ID);
            slBusSelect.add(DomainConstants.SELECT_CURRENT);
            slBusSelect.add(DomainConstants.SELECT_POLICY);
            slBusSelect.add(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
            slBusSelect.add(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
            slBusSelect.add("to[" + DomainConstants.RELATIONSHIP_DELETED_SUBTASK + "]");

            MapList taskInfoList = new MapList();
            BusinessObjectWithSelectList objectWithSelectList = null;
            if("TestCase".equalsIgnoreCase(invokeFrom)) { ////Added for OTD
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, strObjectIds, slBusSelect,true);
            }else {
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, strObjectIds, slBusSelect);
            }

            for (BusinessObjectWithSelectItr objectWithSelectItr = new BusinessObjectWithSelectItr(objectWithSelectList); objectWithSelectItr.next();) {
                BusinessObjectWithSelect objectWithSelect = objectWithSelectItr.obj();

                Map mapTask = new HashMap();
                for (Iterator itrSelectables = slBusSelect.iterator(); itrSelectables.hasNext();) {
                    String strSelectable = (String)itrSelectables.next();
                    mapTask.put(strSelectable, objectWithSelect.getSelectData(strSelectable));
                }

                taskInfoList.add(mapTask);
            }

            Iterator taskInfoListIterator = taskInfoList.iterator();
            while(taskInfoListIterator.hasNext()){

                Map objectInfo = (Map)taskInfoListIterator.next();

                if (objectInfo!=null) {
                    sState = XSSUtil.encodeForHTML(context,(String)objectInfo.get(DomainConstants.SELECT_CURRENT));
                    sEstDate = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
                    sForecastDate = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
                    
                    if("TRUE".equalsIgnoreCase((String)objectInfo.get("to[" + DomainConstants.RELATIONSHIP_DELETED_SUBTASK + "]"))) {
                        sState = STRING_DELETED;
                    }else {
                    	sState = getCWPTaskStateName(context, sForecastDate, sEstDate, sState, sToday, locale);
                    }
                    if(ProgramCentralUtil.isNotNullString(exportFormat)) {
                        showIcon.add(sState);
                    } else if(DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_TOBESTARTED.equals(sState)){
                        showIcon.add(" ");
                    } else if(DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_DELAY.equals(sState)){
                    	showIcon.add("<div style=\"background:#FEE000;width:11px;height:11px;border: none;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;font: normal 100%/normal Arial, Helvetica, sans-serif;color: rgba(0, 0, 0, 1);-o-text-overflow: clip;text-overflow: clip;-webkit-transform: rotateZ(-45deg);transform: rotateZ(-45deg);-webkit-transform-origin: 0 100% 0deg;transform-origin: 0 100% 0deg;;margin:auto;\" title=\"" + sState + "\"> </div>");
                    } else if(DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_INPROGRESS.equals(sState)){
                    //	showIcon.add("<div style=\"background:#6FBC4B;width:11px;height:11px;border-radius:50px;margin:auto;\" title=\"" + sState + "\"> </div>");
                        showIcon.add(" ");
                    } else if(DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_INTROUBLE.equals(sState)){
                        showIcon.add("<div style=\"background:#CC092F;width:11px;height:11px;margin:auto;\" title=\"" + sState + "\"> </div>");
                    } else if(DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_COMPLETED.equals(sState)){
                        showIcon.add(" ");
                    }else{
                        showIcon.add(" ");
                    }
                }
            }
        	
        } catch(Exception e) {
            System.out.println("Exception at getStatusIcon "+e);
            throw e;
        } 
        DebugUtil.debug("Total time taken by getStatusIcon(programHTMLOutPut)::"+(System.currentTimeMillis()-start));

        return showIcon;
    }
    // jhlee Add 2023-07-28 테이블에 나오는 상태 이름 변경
    /**
     * Where : In the Structure Browser, display current state at PMCWBSViewTable table
     * How : gets the current state of the Project Space & Task
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the "paramMap"
     *        paramMap holds the following input arguments:
     *          0 - String containing "objectId"
     * @returns MapList
     * @throws Exception if operation fails
     * @since PMC V6R2008-1
     */
    public Vector getStateName(Context context, String[] args) throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        HashMap paramList    = (HashMap) programMap.get("paramList");
        String invokeFrom   = (String)programMap.get("invokeFrom"); //Added for OTD

        String sState = "";
        String sPolicy = "";
        String sEstDate = "";
        String sForecastDate = "";
        
        Date date = new Date();
    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);
    	Locale locale = context.getLocale();

        Vector columnValues = new Vector();
        String languageStr = (String) paramList.get("languageStr");

        try {
            final String STRING_DELETED = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                    "emxProgramCentral.Common.Deleted", languageStr);

            // Find all the required infomration on each of the tasks here
            int size = objectList.size();
            String[] strObjectIds = new String[size];
            for (int i = 0; i < size; i++) {
                Map mapObject = (Map) objectList.get(i);
                String taskId = (String) mapObject.get(DomainObject.SELECT_ID);
                strObjectIds[i] = taskId;
            }

            StringList slBusSelect = new StringList(4);
            slBusSelect.add(DomainConstants.SELECT_ID);
            slBusSelect.add(DomainConstants.SELECT_CURRENT);
            slBusSelect.add(DomainConstants.SELECT_POLICY);
            slBusSelect.add(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
            slBusSelect.add(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
            slBusSelect.add("to[" + DomainConstants.RELATIONSHIP_DELETED_SUBTASK + "]");

            MapList taskInfoList = new MapList();
            BusinessObjectWithSelectList objectWithSelectList = null;
            if("TestCase".equalsIgnoreCase(invokeFrom)) { ////Added for OTD
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, strObjectIds, slBusSelect,true);
            }else {
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, strObjectIds, slBusSelect);
            }

            for (BusinessObjectWithSelectItr objectWithSelectItr = new BusinessObjectWithSelectItr(objectWithSelectList); objectWithSelectItr.next();) {
                BusinessObjectWithSelect objectWithSelect = objectWithSelectItr.obj();

                Map mapTask = new HashMap();
                for (Iterator itrSelectables = slBusSelect.iterator(); itrSelectables.hasNext();) {
                    String strSelectable = (String)itrSelectables.next();
                    mapTask.put(strSelectable, objectWithSelect.getSelectData(strSelectable));
                }

                taskInfoList.add(mapTask);
            }

            Iterator taskInfoListIterator = taskInfoList.iterator();
            while(taskInfoListIterator.hasNext()){

                Map objectInfo = (Map)taskInfoListIterator.next();

                if (objectInfo!=null) {
                    sState = XSSUtil.encodeForHTML(context,(String)objectInfo.get(DomainConstants.SELECT_CURRENT));
                    sPolicy = (String)objectInfo.get(DomainConstants.SELECT_POLICY);
                    sEstDate = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
                    sForecastDate = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
                    
                    if("TRUE".equalsIgnoreCase((String)objectInfo.get("to[" + DomainConstants.RELATIONSHIP_DELETED_SUBTASK + "]"))) {
                        sState = STRING_DELETED;
                        columnValues.add(i18nNow.getStateI18NString(sPolicy,sState, languageStr));
                    }else {
                    	columnValues.add(getCWPTaskStateName(context, sForecastDate, sEstDate, sState, sToday, locale));
                    }
                }
            }
        } catch(Exception e) {
            System.out.println("Exception at getStateName "+e);
            throw e;
        } finally {
            return columnValues;
        }
    }
    // jhlee Add 2023-07-28 Stage 테이블에 나오는 이름
    public StringList getStage(Context context, String[] args) throws Exception {
    	StringList slStage = new StringList();
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        
        String sState = "";
        String sStage = "";
        String sEstDate = "";
        String sForecastDate = "";
        String sActualDate = "";
        String sDeleted = "Deleted";
        
        Date date = new Date();
    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);
    	Locale locale = context.getLocale();
    	

        try {

            // Find all the required infomration on each of the tasks here
            int size = objectList.size();
            String[] strObjectIds = new String[size];
            for (int i = 0; i < size; i++) {
                Map mapObject = (Map) objectList.get(i);
                String taskId = (String) mapObject.get(DomainObject.SELECT_ID);
                strObjectIds[i] = taskId;
            }

            StringList slBusSelect = new StringList(4);
            slBusSelect.add(DomainConstants.SELECT_ID);
            slBusSelect.add(DomainConstants.SELECT_NAME);
            slBusSelect.add(DomainConstants.SELECT_CURRENT);
            slBusSelect.add(DomainConstants.SELECT_POLICY);
            slBusSelect.add(DecConstants.SELECT_ATTRIBUTE_DECSTAGE);
            slBusSelect.add(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
            slBusSelect.add(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
            slBusSelect.add(DecConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_START_DATE);
            slBusSelect.add("to[" + DomainConstants.RELATIONSHIP_DELETED_SUBTASK + "]");
        	

            MapList taskInfoList = new MapList();
            BusinessObjectWithSelectList objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, strObjectIds, slBusSelect);
            

            for (BusinessObjectWithSelectItr objectWithSelectItr = new BusinessObjectWithSelectItr(objectWithSelectList); objectWithSelectItr.next();) {
                BusinessObjectWithSelect objectWithSelect = objectWithSelectItr.obj();

                Map mapTask = new HashMap();
                for (Iterator itrSelectables = slBusSelect.iterator(); itrSelectables.hasNext();) {
                    String strSelectable = (String)itrSelectables.next();
                    mapTask.put(strSelectable, objectWithSelect.getSelectData(strSelectable));
                }

                taskInfoList.add(mapTask);
            }

            Iterator taskInfoListIterator = taskInfoList.iterator();
            while(taskInfoListIterator.hasNext()){

                Map objectInfo = (Map)taskInfoListIterator.next();

                if (objectInfo!=null) {
                	sStage = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECSTAGE);
                	if("TRUE".equalsIgnoreCase((String)objectInfo.get("to[" + DomainConstants.RELATIONSHIP_DELETED_SUBTASK + "]"))) {
                		sStage = sDeleted;
                	}else if(DecStringUtil.isEmpty(sStage)) {
                        sState = (String)objectInfo.get(DomainConstants.SELECT_CURRENT);
                        sEstDate = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
                        sForecastDate = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
                        sActualDate = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_START_DATE);
                        sState = getCWPTaskStateName(context, sForecastDate, sEstDate, sState, sToday, locale);
                        if(DecStringUtil.equalsAny(sState, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_TOBESTARTED, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_DELAY)) {
                        	sStage = DecConstants.ATTRIBUTE_DECSTAGE_RANGE_TOBESTARTED;
                        }else if(DecStringUtil.equals(sState, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_COMPLETED)) {
                        	sStage = DecConstants.ATTRIBUTE_DECSTAGE_RANGE_CLOSEOUT;
                        }else {
                    		String targetDate = sForecastDate;
                    		if(DecStringUtil.isEmpty(targetDate)) {
                    			targetDate = sEstDate;
                    		}
                            if(DecDateUtil.getDifference(sActualDate, targetDate) >= 0) {
                            	sStage = DecConstants.ATTRIBUTE_DECSTAGE_RANGE_PLANSTART;
                        	}else {
                        		sStage = DecConstants.ATTRIBUTE_DECSTAGE_RANGE_LATESTART;
                        	}
                        }
                    }
            		slStage.add(sStage);
                }
            }
            
        } catch(Exception e) {
            System.out.println("Exception at getStage "+e);
            throw e;
        } 
    	return slStage;
    }
    
    // jhlee Add 2023-08-03 Complete상태에서만 변경 불가능하게 변경

    /**
     * Check whether summary task cell editable or not.
     * @param context the ENOVIA <code>Context</code> object.
     * @param args request arguments
     * @return A list of edit access settings for column in Project WBS.
     * @throws MatrixException if operation fails.
     */
    public StringList isSummaryTaskCellEditable(Context context, String[] args) throws MatrixException
    {
        long start = System.currentTimeMillis();
        try{
            StringList isCellEditable = new StringList();
            Map programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");

            int size = objectList.size();
            String[] objIds = new String[size];

            for(int i=0;i<size;i++){
                Map objectMap = (Map)objectList.get(i);
                objIds[i]       = (String)objectMap.get(SELECT_ID);
            }

            invokeFromODTFile = (String)programMap.get("invokeFrom"); //Added for ODT
            BusinessObjectWithSelectList objectWithSelectList = null;
            StringList slParam = new StringList();
            slParam.add(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
            slParam.add(ProgramCentralConstants.SELECT_CURRENT);
            slParam.add(ProgramCentralConstants.SELECT_TYPE);
            if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT usage
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList( context, objIds, slParam,false);
            }else {
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList( context, objIds, slParam);
            }

            for(int i=0;i<size;i++){
                BusinessObjectWithSelect bws = objectWithSelectList.getElement(i);
                String isSummasryTask = bws.getSelectData(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
                String sCurrent = bws.getSelectData(ProgramCentralConstants.SELECT_CURRENT);
                String sType = bws.getSelectData(ProgramCentralConstants.SELECT_TYPE);
                if(sType.equals(DecConstants.TYPE_PROJECT_SPACE)) {
                	isCellEditable.add("false");
                }else if("true".equalsIgnoreCase(isSummasryTask)){
                    isCellEditable.add("false");
                }else if(sCurrent.equals(DecConstants.STATE_PROJECT_TASK_COMPLETE)) {
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

    public StringList isConstraintFieldEditable(Context context, String[] args) throws MatrixException
    {
        long start = System.currentTimeMillis();
        try {
            StringList isCellEditable = new StringList();
            Map programMap      = (Map) JPO.unpackArgs(args);
            MapList objectList  = (MapList) programMap.get("objectList");

            int size = objectList.size();
            String[] objIds = new String[size];

            for(int i=0;i<size;i++){
                Map objectMap = (Map)objectList.get(i);
                String id = (String)objectMap.get(SELECT_ID);
                objIds[i] = id;
            }

            StringList busSelect = new StringList(1);
            busSelect.addElement(ProgramCentralConstants.SELECT_PROJECT_SCHEDULE_ATTRIBUTE_FROM_TASK);
            busSelect.add(ProgramCentralConstants.SELECT_PROJECT_SCHEDULE);
            busSelect.add(ProgramCentralConstants.SELECT_TYPE);

            BusinessObjectWithSelectList objectWithSelectList =
                    ProgramCentralUtil.getObjectWithSelectList(context,objIds,busSelect,true);

            for(int i=0;i<size;i++){
                BusinessObjectWithSelect bws = objectWithSelectList.getElement(i);
                String taskProjectScheduleAtrib = bws.getSelectData(ProgramCentralConstants.SELECT_PROJECT_SCHEDULE_ATTRIBUTE_FROM_TASK);
                String sType = bws.getSelectData(ProgramCentralConstants.SELECT_TYPE);
                if(ProgramCentralUtil.isNullString(taskProjectScheduleAtrib)){
                    taskProjectScheduleAtrib    = bws.getSelectData(ProgramCentralConstants.SELECT_PROJECT_SCHEDULE);
                }
                if(sType.equals(DecConstants.TYPE_PROJECT_SPACE)) {
                    isCellEditable.add("false");
                }else if(ProgramCentralUtil.isNullString(taskProjectScheduleAtrib)
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

    public StringList isDurationCellEditable(Context context, String[] args) throws MatrixException
    {
        long start = System.currentTimeMillis();
        try{

            String[] typeArray = new String[]{
                    ProgramCentralConstants.TYPE_MILESTONE,
                    ProgramCentralConstants.TYPE_TASK,
                    ProgramCentralConstants.TYPE_PHASE,
                    ProgramCentralConstants.TYPE_GATE};

            Map<String,StringList> derivativeMap = ProgramCentralUtil.getDerivativeTypeListFromUtilCache(context, typeArray);

            StringList gateSubType      = derivativeMap.get(ProgramCentralConstants.TYPE_GATE);
            StringList milestoneSubType = derivativeMap.get(ProgramCentralConstants.TYPE_MILESTONE);
            StringList taskSubtype      = derivativeMap.get(ProgramCentralConstants.TYPE_TASK);
            StringList phaseSubType     = derivativeMap.get(ProgramCentralConstants.TYPE_PHASE);

            StringList isCellEditable = new StringList();

            Map programMap      = (Map) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");

            int size = objectList.size();
            String[] objIds = new String[size];

            for(int i=0;i<size;i++){
                Map objectMap = (Map)objectList.get(i);
                objIds[i] = (String)objectMap.get(SELECT_ID);
            }

            StringList busSel = new StringList(3);
            busSel.add(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
            busSel.add(ProgramCentralConstants.SELECT_CURRENT);
            busSel.add(ProgramCentralConstants.SELECT_TYPE);

            invokeFromODTFile       = (String)programMap.get("invokeFrom"); //Added for ODT
            BusinessObjectWithSelectList objectWithSelectList = null;
            if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT usage
                objectWithSelectList =
                        ProgramCentralUtil.getObjectWithSelectList(context, objIds, busSel,false);
            }else {
                objectWithSelectList =
                    ProgramCentralUtil.getObjectWithSelectList(context, objIds, busSel);
            }

            objectWithSelectList.forEach(bws->{
                String isSummasryTask = bws.getSelectData(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);

                if("true".equalsIgnoreCase(isSummasryTask) ){
                    isCellEditable.add("false");
                }else{
                    String type = bws.getSelectData(ProgramCentralConstants.SELECT_TYPE);
                    if(type.equals(DecConstants.TYPE_PROJECT_SPACE)) {
                        isCellEditable.add("false");
                    }else if(gateSubType.contains(type)||
                            milestoneSubType.contains(type)) {
                        isCellEditable.add("false");
                    }else if(phaseSubType.contains(type)||
                            taskSubtype.contains(type)) {
                            String state = bws.getSelectData(ProgramCentralConstants.SELECT_CURRENT);
                        if(STATE_PROJECT_TASK_REVIEW.equalsIgnoreCase(state) ||STATE_PROJECT_TASK_COMPLETE.equalsIgnoreCase(state)){
                                isCellEditable.add("false");
                        }else{
                                isCellEditable.add("true");
                            }
                    }else {
                            isCellEditable.add("true");
                        }
                }
            });

            DebugUtil.debug("Total time taken by isDurationCellEditable()::"+(System.currentTimeMillis()-start));

            return isCellEditable;

        }catch(Exception e){
            throw new MatrixException(e);
        }
    }

    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList isTaskWeightageCellEditable(Context context, String[] args) throws MatrixException
    {

        try{

            StringList editAccessList = new StringList();

            Map programMap      = (Map) JPO.unpackArgs(args);
            String invokeFromODTFile = (String)programMap.get("invokeFrom");
            MapList objectList = (MapList) programMap.get("objectList");

            int size = objectList.size();
            String[] objIds = new String[size];

            for(int i=0;i<size;i++){
                Map objectMap = (Map)objectList.get(i);
                objIds[i] = (String)objectMap.get(SELECT_ID);
            }

            StringList busSel = new StringList();
            busSel.add(ProgramCentralConstants.SELECT_CURRENT);
            busSel.add(ProgramCentralConstants.SELECT_TYPE);


            BusinessObjectWithSelectList objectWithSelectList = null;

            if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIds, busSel, true);
            } else {
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIds, busSel);
            }

            for (int i = 0; i < size; i++) {
                BusinessObjectWithSelect bws = objectWithSelectList.getElement(i);
                String taskState = bws.getSelectData(ProgramCentralConstants.SELECT_CURRENT);
                String sType = bws.getSelectData(ProgramCentralConstants.SELECT_TYPE);

                String isRootNode = (String)(((Map)objectList.get(i)).get("Root Node"));
                if(sType.equals(DecConstants.TYPE_PROJECT_SPACE)) {
                	editAccessList.add("false");
                }else  if(ProgramCentralConstants.STATE_PROJECT_SPACE_REVIEW.equalsIgnoreCase(taskState) || ProgramCentralConstants.STATE_PROJECT_SPACE_COMPLETE.equalsIgnoreCase(taskState) || "True".equalsIgnoreCase(isRootNode)){
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
    public StringList isTaskExpectedEndDateEditable(Context context, String[] args) throws MatrixException{
        try{
            StringList editAccessList = new StringList();
            Map programMap      = (Map) JPO.unpackArgs(args);
            String invokeFromODTFile = (String)programMap.get("invokeFrom");
            MapList objectList = (MapList) programMap.get("objectList");

            int size = objectList.size();
            String[] objIds = new String[size];

            for(int i=0;i<size;i++){
                Map objectMap = (Map)objectList.get(i);
                objIds[i] = (String)objectMap.get(SELECT_ID);
            }

            BusinessObjectWithSelectList objectWithSelectList = null;
            StringList selectable = new StringList(3);
            selectable.add(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
            selectable.add(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_START_DATE);
            selectable.add(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
            selectable.add(ProgramCentralConstants.SELECT_TYPE);

            if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT usage
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList( context, objIds, selectable,false);
            }else {
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList( context, objIds, selectable);
            }

            for(int i=0;i<size;i++){
                BusinessObjectWithSelect bws = objectWithSelectList.getElement(i);
                String isSummasryTask = bws.getSelectData(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
                String hasActualStartDate = bws.getSelectData(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_START_DATE);
                String hasActualFinishDate = bws.getSelectData(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
                String sType = bws.getSelectData(ProgramCentralConstants.SELECT_TYPE);

                //Summary task/task which don't have actual Start date/ Task having Actual finish date : won't be editable.
                if(sType.equals(DecConstants.TYPE_PROJECT_SPACE)) {
                	editAccessList.add("false");
                }else if("true".equalsIgnoreCase(isSummasryTask)){
                    editAccessList.add("false");
                }else if(ProgramCentralUtil.isNullString(hasActualStartDate)){
                    editAccessList.add("false");
                }else if(ProgramCentralUtil.isNotNullString(hasActualFinishDate)) {
                    editAccessList.add("false");
                }else{
                    editAccessList.add("true");
                }
            }
            return editAccessList;
        }catch(Exception e){
            throw new MatrixException(e);
        }
    }

    public StringList checkTaskEnforcement(Context context, String[] args) throws Exception
    {


        StringList slIsEditable=new StringList();
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        StringList templateTaskSourceIds=new StringList();
        String templateId=EMPTY_STRING;
        String isParentProjectSpace=EMPTY_STRING;
        String isParentProjectSpaceSelectable="to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.type.kindof["+DomainObject.TYPE_PROJECT_SPACE+"]";
        String templateIdSelectable="to[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.from[Initiated Template Project].to.id";
        boolean selectableRequired=true;
        String strFalse="false";
        String strTrue="true";
        String strMandatory="Mandatory";



        for(int j = 0; j <objectList.size();j++)
        {

             Map objectMap = (Map) objectList.get(j);
             String objId= (String)objectMap.get(SELECT_ID);
             DomainObject dobj= DomainObject.newInstance(context,objId);

            String typeKindofTask= dobj.getInfo(context, ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
            String type= dobj.getTypeName(context);
            if(type.equals(DecConstants.TYPE_PROJECT_SPACE)) {
                slIsEditable.add(strFalse);
                continue;
            }
            if(strFalse.equalsIgnoreCase(typeKindofTask))
            {
                slIsEditable.add(strFalse);
                continue;
            }

            boolean blIsEditable=true;
            StringList slObjectSelect = new StringList(DomainObject.getAttributeSelect(ATTRIBUTE_TASK_REQUIREMENT));
            slObjectSelect.add(ProgramCentralConstants.SELECT_ATTRIBUTE_SOURCE_ID);

            if(selectableRequired)
            {
                slObjectSelect.add(templateIdSelectable);
                slObjectSelect.add(isParentProjectSpaceSelectable);

            }



             String strCurrentTaskRequirement=EMPTY_STRING;
             String taskSourceId=EMPTY_STRING;



            BusinessObjectWithSelectList objectWithSelectList = null;


            invokeFromODTFile = (String) programMap.get("invokeFrom"); // Added for ODT
            if (ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile))
            { // Added for ODT usage
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, new String[] {objId}, slObjectSelect, false);
            } else {
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, new String[] {objId}, slObjectSelect);
            }

            for (int i = 0; i < objectWithSelectList.size(); i++) {
                BusinessObjectWithSelect objectWithSelect = objectWithSelectList.get(i);
                 taskSourceId = (String)objectWithSelect.getSelectData(ProgramCentralConstants.SELECT_ATTRIBUTE_SOURCE_ID);
                 strCurrentTaskRequirement =(String)objectWithSelect.getSelectData(DomainObject.getAttributeSelect(ATTRIBUTE_TASK_REQUIREMENT));

                if(selectableRequired)
                {
                        templateId = (String)objectWithSelect.getSelectData(templateIdSelectable);
                        isParentProjectSpace = (String)objectWithSelect.getSelectData(isParentProjectSpaceSelectable);
                }

            }




            if(strTrue.equalsIgnoreCase(isParentProjectSpace) && UIUtil.isNotNullAndNotEmpty(templateId))
            {

                    StringList busSelects = new StringList(ProgramCentralConstants.SELECT_ATTRIBUTE_SOURCE_ID);
                    if(templateTaskSourceIds.size()==0)
                    {
                        ProjectTemplate template=new ProjectTemplate(templateId);
                        MapList templateTasks=ProjectSpace.getTemplateTasks(context, template, 0, busSelects, null, false, false,true, null);
                        templateTasks.parallelStream().forEach(taskMap ->{
                            String templateTaskSourceId = (String)  ((Map)taskMap).get(ProgramCentralConstants.SELECT_ATTRIBUTE_SOURCE_ID);
                            templateTaskSourceIds.add(templateTaskSourceId);
                        });

                        selectableRequired=false;

                    }


                    if(strMandatory.equalsIgnoreCase(strCurrentTaskRequirement) && templateTaskSourceIds.contains(taskSourceId))
                    {

                            blIsEditable=false;
                    }
            }

            slIsEditable.add(String.valueOf(blIsEditable));

        }

        return slIsEditable;
    }
    
    //jhlee Add 2023-08-03 Work Package관련 테이블에서 Complete 상태에서 변경 불가하게 막는 기능
    public StringList isTaskCellEditable(Context context, String[] args) throws MatrixException {
        long start = System.currentTimeMillis();
        try{
            StringList isCellEditable = new StringList();
            Map programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");

            int size = objectList.size();
            String[] objIds = new String[size];

            for(int i=0;i<size;i++){
                Map objectMap = (Map)objectList.get(i);
                objIds[i]       = (String)objectMap.get(SELECT_ID);
            }

            invokeFromODTFile = (String)programMap.get("invokeFrom"); //Added for ODT
            BusinessObjectWithSelectList objectWithSelectList = null;
            StringList slParam = new StringList();
            slParam.add(ProgramCentralConstants.SELECT_CURRENT);
            
            if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT usage
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList( context, objIds, slParam,false);
            }else {
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList( context, objIds, slParam);
            }

            for(int i=0;i<size;i++){
                BusinessObjectWithSelect bws = objectWithSelectList.getElement(i);
                String sCurrent = bws.getSelectData(ProgramCentralConstants.SELECT_CURRENT);
                if(sCurrent.equals(DecConstants.STATE_PROJECT_TASK_COMPLETE)) {
                    isCellEditable.add("false");
                }else{
                    isCellEditable.add("true");
                }
            }

            DebugUtil.debug("Total time taken by isTaskCellEditable()::"+(System.currentTimeMillis()-start));

            return isCellEditable;

        }catch(Exception e){
        	e.printStackTrace();
            throw new MatrixException(e);
        }
    }
    
    public StringList isTaskNameCellEditable(Context context, String[] args) throws MatrixException{
        long start = System.currentTimeMillis();
        StringList isCellEditable = null;
        try{
            Map programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");
            int size = objectList.size();
            String[] objIds = new String[size];

            for(int i=0;i<size;i++){
                Map objectMap = (Map)objectList.get(i);
                String id = (String)objectMap.get(SELECT_ID);
                objIds[i] = id;
            }
            isCellEditable = new StringList(size);

            BusinessObjectWithSelectList objectWithSelectList = null;
            StringList slParam = new StringList(SELECT_CURRENT);
            slParam.add(DecConstants.SELECT_TYPE);
            invokeFromODTFile       = (String)programMap.get("invokeFrom"); //Added for ODT
            if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT usage
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIds,slParam,false);
            }else{
                objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, objIds,slParam);
            }

            for(int i=0;i<size;i++){
                BusinessObjectWithSelect bws = objectWithSelectList.getElement(i);
                String currentState          = bws.getSelectData(SELECT_CURRENT);
                String sType        = bws.getSelectData(SELECT_TYPE);
                if(sType.equals(DecConstants.TYPE_PROJECT_SPACE)) {
                    isCellEditable.add("false");
                }else if(ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equals(currentState) ||
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
	@Override
	public MapList getWBSSubtasks(Context context, String[] args) throws Exception {
//		return super.getWBSSubtasks(context, args);
        HashMap arguMap         = (HashMap)JPO.unpackArgs(args);
        String strObjectId      = (String) arguMap.get("objectId");
        String strExpandLevel   = (String) arguMap.get("expandLevel");
        String selectedProgram  = (String) arguMap.get("selectedProgram");
        String selectedTable    = (String) arguMap.get("selectedTable");
        String effortFilter     = (String) arguMap.get("PMCWBSEffortFilter");
        invokeFromODTFile       = (String) arguMap.get("invokeFrom"); //Added for OTD

        MapList mapList = new MapList();

        short nExpandLevel =  ProgramCentralUtil.getExpandLevel(strExpandLevel);
        if("PMCProjectTaskEffort".equalsIgnoreCase(selectedTable)){
            String[] arrJPOArguments = new String[3];
            HashMap programMap = new HashMap();
            programMap.put("objectId", strObjectId);
            programMap.put("ExpandLevel", strExpandLevel);
            programMap.put("ScheduleEffortView", "true");

            if(!"null".equals(effortFilter) && null!= effortFilter && !"".equals(effortFilter)) {
                programMap.put("effortFilter", effortFilter);
            }
            arrJPOArguments = JPO.packArgs(programMap);
            mapList = (MapList)JPO.invoke(context,
                    "emxEffortManagementBase", null, "getProjectTaskList",
                    arrJPOArguments, MapList.class);

            Iterator itr;
            Map map;
            int size = mapList.size();
            for(int j = 0; j < size; j++){
                map = (Map) mapList.get(j);
                if("TRUE".equalsIgnoreCase((String)map.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE))){
                    map.put("hasChildren","true");
                    mapList.set(j, map);
                }
            }
        }else if ("decFilterHierarchySummary".equalsIgnoreCase(selectedTable)){
//            mapList = (MapList) getWBSTasks(context,strObjectId,DomainConstants.RELATIONSHIP_SUBTASK,nExpandLevel);
            
            StringList objectSelects = new StringList(5);
            objectSelects.addElement(DomainConstants.SELECT_ID);
            objectSelects.addElement(DomainConstants.SELECT_NAME);
            //objectSelects.addElement(SELECT_IS_PARENT_TASK_DELETED);
        //  objectSelects.addElement(DomainConstants.SELECT_POLICY);
            objectSelects.addElement(ProgramCentralConstants.SELECT_PHYSICALID);
            
            StringList relationshipSelects = new StringList(2);
            relationshipSelects.addElement(DomainConstants.SELECT_RELATIONSHIP_ID);
            relationshipSelects.addElement(DomainConstants.SELECT_LEVEL);
            
            ProjectSpace rootNodeObj = new ProjectSpace(strObjectId);
            
            StringBuffer sbDPWhere = new StringBuffer(" ");
            decFilterUtil.generateMatchlistWhereExpr(arguMap, "Discipline", sbDPWhere, DecConstants.SYMB_AND, DecConstants.SELECT_ATTRIBUTE_DECDISCIPLINE, DecConstants.SYMB_VERTICAL_BAR);
            StringBuffer sbSubConWhere = new StringBuffer(" ");
            decFilterUtil.generateMatchlistWhereExpr(arguMap, "Sub-Con", sbSubConWhere, " && (", DecConstants.SELECT_ATTRIBUTE_DECSUBCONNO, DecConstants.SYMB_VERTICAL_BAR);
            decFilterUtil.generateMatchlistWhereExpr(arguMap, "Sub-Con", sbSubConWhere, " || ", DecConstants.SELECT_ATTRIBUTE_DECSUBCONNO2, DecConstants.SYMB_VERTICAL_BAR);
            if ( sbSubConWhere.length() > 1 )
            {
            	sbSubConWhere.append(")");
            }
            
            String type = rootNodeObj.getInfo(context, DecConstants.SELECT_TYPE);
            int expandLevel = 1;
            if ( type.equals(DecConstants.TYPE_PROJECT_SPACE) )
            {
            	decCodeMaster_mxJPO codeJPO = new decCodeMaster_mxJPO();
                String CWALevel = codeJPO.getCodeDetailDisplayValueWithCodePath(context, strObjectId, null, "WBS Type", null, DecConstants.SELECT_ATTRIBUTE_DECCODEDETAILATT1, new String[]{"CWA"});
                
                if ( StringUtils.isNotEmpty(CWALevel) )
                {
                	expandLevel = Integer.parseInt(CWALevel);
                }
            }
            
            MapList streamDataList = rootNodeObj.getRelatedObjects(context,
                    DomainConstants.RELATIONSHIP_SUBTASK,
                    ProgramCentralConstants.TYPE_PROJECT_MANAGEMENT,
                    objectSelects,
                    relationshipSelects,
                    false,
                    true,
                    (short)expandLevel,
//                    null,
                    "(type != decCWPTask && type != decIWPTask) || (type == 'decCWPTask'" + sbDPWhere.toString() + sbSubConWhere.toString() + ")", // Modified by hslee on 2023.05.17
//                    "((type != decCWPTask && type != decIWPTask) || from[Subtask|to.type == 'decCWPTask' && to.attribute[decDiscipline] == '" + decDisciplineFilterCmd + "') || (type == 'decCWPTask' && attribute[decDiscipline] == '" + decDisciplineFilterCmd + "')", // Modified by hslee on 2023.05.17
                    null,
                    0);
            for(int i=0,size=streamDataList.size();i<size;i++) {
                Map taskMap = (Map) streamDataList.get(i);

                String isSummary    = (String)taskMap.get(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
                //taskMap.put("hasChildren",isSummary);
                taskMap.put("direction","from");

                mapList.add(taskMap);
            }
        }else {
        	mapList = (MapList) getWBSTasks(context,strObjectId,DomainConstants.RELATIONSHIP_SUBTASK,nExpandLevel);
        }

        HashMap hmTemp = new HashMap();
        hmTemp.put("expandMultiLevelsJPO","true");
        mapList.add(hmTemp);

        //Need to ask f1m -- is it really required in DPM code base?
        boolean isAnDInstalled = FrameworkUtil.isSuiteRegistered(context,"appVersionAerospaceProgramManagementAccelerator",false,null,null);
        if(isAnDInstalled){
            boolean isLocked = Task.isParentProjectLocked(context, strObjectId);
            if(isLocked){
                for(Object tempMap : mapList){
                    ((Map)tempMap).put("disableSelection", "true");
                    ((Map)tempMap).put("RowEditable", "readonly");
                }
            }
        }

        return mapList;
    }

	public MapList getWBSTasks(Context context, String objectId, String relPattern, short nExpandLevel, String where) throws Exception {
        long start = System.currentTimeMillis();
        MapList objectList  = new MapList();

        try {
            ProjectSpace rootNodeObj = new ProjectSpace(objectId);

            StringList objectSelects = new StringList(5);
            objectSelects.addElement(DomainConstants.SELECT_ID);
            objectSelects.addElement(DomainConstants.SELECT_NAME);
            //objectSelects.addElement(SELECT_IS_PARENT_TASK_DELETED);
        //  objectSelects.addElement(DomainConstants.SELECT_POLICY);
            objectSelects.addElement(ProgramCentralConstants.SELECT_PHYSICALID);

            if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT usage

                objectSelects.addElement(DomainConstants.SELECT_NAME);

                StringList relationshipSelects = new StringList(2);
                relationshipSelects.addElement(DomainConstants.SELECT_RELATIONSHIP_ID);
                relationshipSelects.addElement(DomainConstants.SELECT_LEVEL);

                MapList streamDataList = rootNodeObj.getRelatedObjects(context,
                        relPattern,
                        ProgramCentralConstants.TYPE_PROJECT_MANAGEMENT,
                        new StringList(SELECT_ID),
                        relationshipSelects,
                        false,
                        true,
                        nExpandLevel,
                        where,
                        null,
                        0);

                int size =  streamDataList.size();
                String[] objIds = new String[size];
                for(int i=0;i<size;i++) {
                    Map<String,String> taskMap = (Map<String, String>) streamDataList.get(i);
                    objIds[i] = taskMap.get(SELECT_ID);
                }

                BusinessObjectWithSelectList bwsl=ProgramCentralUtil.getObjectWithSelectList(context, objIds, objectSelects,false);
                objectList = FrameworkUtil.toMapList(bwsl);

                for(int i=0;i<size;i++) {
                    Map taskMap = (Map) objectList.get(i);
                    taskMap.putAll((Map)streamDataList.get(i));

                    String isSummary    = (String)taskMap.get(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
                    taskMap.put("hasChildren",isSummary);
                    taskMap.put("direction","from");
                }

            }else {
                //Added for PCS-expand query
                objectList = rootNodeObj.getObjectListFromPAL(context, objectSelects, nExpandLevel);
                if(relPattern!= null && relPattern.contains(DomainConstants.RELATIONSHIP_DELETED_SUBTASK)) {
                    //objectSelects.add(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);

                    StringList relationshipSelects = new StringList(2);
                    relationshipSelects.addElement(DomainConstants.SELECT_RELATIONSHIP_ID);
                    relationshipSelects.addElement(DomainConstants.SELECT_LEVEL);

                    MapList streamDataList = rootNodeObj.getRelatedObjects(context,
                            DomainConstants.RELATIONSHIP_DELETED_SUBTASK,
                            ProgramCentralConstants.TYPE_PROJECT_MANAGEMENT,
                            objectSelects,
                            relationshipSelects,
                            false,
                            true,
                            nExpandLevel,
//                            null,
                            where, // Modified by hslee on 2023.05.17
                            null,
                            0);
                    for(int i=0,size=streamDataList.size();i<size;i++) {
                        Map taskMap = (Map) streamDataList.get(i);

                        String isSummary    = (String)taskMap.get(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
                        //taskMap.put("hasChildren",isSummary);
                        taskMap.put("direction","from");

                        objectList.add(taskMap);
                    }
                }
            }

        } catch(Exception e){
            e.printStackTrace();
            throw e;
        } finally {
            DebugUtil.debug("Total time taken by expand program(getWBSTasks)::"+(System.currentTimeMillis()-start)+"ms");
            return objectList;
        }
    }
	
	public StringList getCWPTaskStateName(Context context, String[] args) throws Exception {
		StringList slReturn = new StringList();
        Map programMap =  JPO.unpackArgs(args);
        MapList mlObject = (MapList) programMap.get("objectList");
        Map mObject = null;
        String sForecastDate = DecConstants.EMPTY_STRING; // Added by hslee on 2023.07.05
        String sEstDate = DecConstants.EMPTY_STRING;
        String sCurrent = DecConstants.EMPTY_STRING;
        Date date = new Date();
    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);
    	Locale locale = context.getLocale(); // Added by hslee on 2023.07.05
        for(Object o : mlObject) {
        	mObject = (Map)o;
        	/*
        	 * Modified by hslee on 2023.07.05
        	sEstDate = (String)mObject.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
        	if(DecStringUtil.isEmpty(sEstDate)) {
            	sEstDate = (String)mObject.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
        	}
        	sCurrent = (String)(mObject).get(DecConstants.SELECT_CURRENT);
        	if(DecStringUtil.equals(DecConstants.STATE_PROJECT_TASK_CREATE, sCurrent) && DecDateUtil.getDifference(sEstDate, sToday) > 0) {
        		sCurrent = "Delay";
        	}
        	slReturn.add(EnoviaResourceBundle.getProperty(context, "emxProgramCentralStringResource", context.getLocale(), "ProgramCentral.State.Project_Task." + sCurrent));
        	*/
        	sForecastDate = (String)mObject.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
        	sEstDate = (String)mObject.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
        	sCurrent = (String)(mObject).get(DecConstants.SELECT_CURRENT);
        	
        	slReturn.add( getCWPTaskStateName(context, sForecastDate, sEstDate, sCurrent, sToday, locale) );
        }
        return slReturn;
	}
	/** jhlee Add 2023-08-09 form에서 상태 가져오기
	 * 
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public String getTaskFormStateName(Context context, String[] args) throws Exception {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap) programMap.get("paramMap");
        HashMap requestMap = (HashMap) programMap.get("requestMap");
        String objectId = (String) paramMap.get("objectId");
        // String invokeFrom   = (String)programMap.get("invokeFrom"); //Added for OTD
        
        Locale locale = context.getLocale();
        Date date = new Date();
    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);
    	
        StringList slParam = new StringList();
        slParam.add(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
        slParam.add(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
        slParam.add(DecConstants.SELECT_CURRENT);
        
        DomainObject doTask = DomainObject.newInstance(context, objectId);
        Map<String, String> mInfo = doTask.getInfo(context, slParam);

        String sForecastDate = mInfo.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
        String sEstDate = mInfo.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
        String sCurrent = mInfo.get(DecConstants.SELECT_CURRENT);
        
        return getCWPTaskStateName(context, sForecastDate, sEstDate, sCurrent, sToday, locale);
	}
	/**
	 * jhlee Add 2023-08-09 form에서 상태 변경가능 여부
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean canEditTaskState(Context context, String args[]) throws Exception {
		HashMap inputMap = (HashMap)JPO.unpackArgs(args);
		HashMap requestMap    = (HashMap) inputMap.get("requestMap");
		String objectId = null;
		if(requestMap == null){
			objectId   = (String)inputMap.get("objectId");
		}else{
			objectId   = (String)requestMap.get("objectId");
		}
		DomainObject doTask = new DomainObject(objectId);
		String sCurrent = doTask.getInfo(context, DomainConstants.SELECT_CURRENT);
		if(DecStringUtil.equalsAny(sCurrent, DecConstants.STATE_PROJECT_TASK_ACTIVE, DecConstants.STATE_PROJECT_TASK_REVIEW)){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * jhlee Add 2023-08-09 form에서 상태 변경기능
	 * @param context
	 * @param args
	 * @throws Exception
	 */
	public void updateTaskState(Context context, String[] args) throws Exception {
		try {
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			HashMap paramMap = (HashMap)programMap.get("paramMap");
			String sTaskOID = (String)paramMap.get("objectId");
			String sNewValue = (String)paramMap.get("New Value");
			DomainObject doTask = DomainObject.newInstance(context, sTaskOID);
			doTask.setState(context, sNewValue);
		}
		catch(Exception Ex) {
			Ex.printStackTrace();
			throw Ex;
		}
	}
	
	public String getCWPTaskStateName(Context context, String forecastStartDate, String estDate, String current, String today, Locale locale) throws Exception {
		String targetDate = forecastStartDate;
		if(DecStringUtil.isEmpty(targetDate)) {
			targetDate = estDate;
		}
		String stateName = current;
		if(DecStringUtil.equals(DecConstants.STATE_PROJECT_TASK_CREATE, current) && DecDateUtil.getDifference(targetDate, today) > 0) {
			stateName = "Delay";
		}
		return EnoviaResourceBundle.getProperty(context, "emxProgramCentralStringResource", locale, "ProgramCentral.State.Project_Task." + stateName);
	}
	
    /**
     * jhlee Add 2023-05-26  CWP Task State Range
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    public Map getCWPTaskManagementStateRange(Context context, String[] args) throws Exception {
    	Map mRange = new HashMap();
    	try {
    		StringList slfieldRangeValue = ProjectSpace.getStates(context, DecConstants.POLICY_PROJECT_TASK);
    		StringList slfieldDisplayRangeValue = new StringList();

    		slfieldRangeValue.remove(DecConstants.STATE_PROJECT_TASK_CREATE);
    		slfieldRangeValue.remove(DecConstants.STATE_PROJECT_TASK_ASSIGN);
    		for(String sState : slfieldRangeValue) {
    			slfieldDisplayRangeValue.add(EnoviaResourceBundle.getProperty(context, "emxProgramCentralStringResource", context.getLocale(), "ProgramCentral.State.Project_Task." + sState));
    		}
	    	
	    	mRange.put("field_choices", slfieldRangeValue);
	    	mRange.put("field_display_choices", slfieldDisplayRangeValue);
    	} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    	return mRange;
    }
    public void updateCWPTaskEWPReleasePlan(Context context, String[] args) throws Exception {
    	updateCWPTaskEWPAttr(context, args, DecConstants.ATTRIBUTE_DECEWPRELEASEPLAN);
    }

    public void updateCWPTaskEWPReleaseForecast(Context context, String[] args) throws Exception {
    	updateCWPTaskEWPAttr(context, args, DecConstants.ATTRIBUTE_DECEWPRELEASEFORECAST);
    }
    
    public void updateCWPTaskEWPReleaseActual(Context context, String[] args) throws Exception {
    	updateCWPTaskEWPAttr(context, args, DecConstants.ATTRIBUTE_DECEWPRELEASEACTUAL);
    }
    
    public void updateCWPTaskEWPAttr(Context context, String[] args, String sAttrName) throws Exception {
    	Map programMap = JPO.unpackArgs(args);
    	Map paramMap = (Map)programMap.get("paramMap");
		
		String objectId = (String) paramMap.get("objectId");
        String newValue = (String) paramMap.get("New Value");
        
        DomainObject doCWPTask = DomainObject.newInstance(context, objectId);
        objectId = doCWPTask.getInfo(context, "from[" + DecConstants.RELATIONSHIP_DECEWPREL + "].to.id");
        DomainObject doEWP = DomainObject.newInstance(context, objectId);
        try {
            ContextUtil.startTransaction(context, true);
            doEWP.setAttributeValue(context, sAttrName, DecDateUtil.changeDateFormat(newValue, new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US)));
        }catch (Exception e) {
            ContextUtil.abortTransaction(context);
            e.printStackTrace();
            throw e;
		}
        ContextUtil.commitTransaction(context);
    }
    
    public StringList accessUpdateStatus(Context context, String[] args) throws Exception {
    	StringList slReturn = new StringList();
		try {
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			MapList mlObject = (MapList) programMap.get("objectList");
			Map mObject = null;
			String sCurrent = DecConstants.EMPTY_STRING;
			
			int size = mlObject.size();
			String[] objIds = new String[size];
			
			for(int i=0;i<size;i++){
			    Map objectMap = (Map)mlObject.get(i);
			    objIds[i]       = (String)objectMap.get(SELECT_ID);
			}
			
			StringList slist = new StringList();
			slist.add(ProgramCentralConstants.SELECT_KINDOF_GATE);
			slist.add(ProgramCentralConstants.SELECT_CURRENT);
			slist.add(ProgramCentralConstants.SELECT_TYPE);
			slist.add(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
			
			invokeFromODTFile = (String)programMap.get("invokeFrom"); //Added for ODT
			BusinessObjectWithSelectList objectWithSelectList = null;
			if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT usage
			    objectWithSelectList =
			            ProgramCentralUtil.getObjectWithSelectList( context, objIds, slist,false);
			}else {
			    objectWithSelectList =
			        ProgramCentralUtil.getObjectWithSelectList( context, objIds, slist);
			}
			
			for(int i=0;i<size;i++){
				BusinessObjectWithSelect bws = objectWithSelectList.getElement(i);
				String isSummasryTask = bws.getSelectData(ProgramCentralConstants.SELECT_IS_SUMMARY_TASK);
				String isGateType = bws.getSelectData(ProgramCentralConstants.SELECT_KINDOF_GATE);
				String isCompleteState = bws.getSelectData(ProgramCentralConstants.SELECT_CURRENT);
				String sType = bws.getSelectData(DecConstants.SELECT_TYPE);
				if(sType.equals(DecConstants.TYPE_PROJECT_SPACE)) {
					slReturn.add("false");
				}else if(DecStringUtil.equalsAny(isCompleteState, DecConstants.STATE_PROJECT_TASK_CREATE, DecConstants.STATE_PROJECT_TASK_COMPLETE)) {
					slReturn.add("false");
				}else {
					slReturn.add("true");
				}
			
			//    if("true".equalsIgnoreCase(isSummasryTask) ||
			//            ("true".equalsIgnoreCase(isGateType) && ProgramCentralConstants.STATE_PROJECT_REVIEW_COMPLETE.equalsIgnoreCase(isCompleteState)))
			//    {
			//        isStateCellEditableList.add("false");
			//    }
			//    else{
			//        isStateCellEditableList.add("true");
			//    }
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return slReturn;
    }
    /**
     * jhlee Add 2023-05-26 
     * Where : In the Structure Browser, Updating State in Edit mode
     * How : Get the objectId from argument map update with "New Value" state.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the "columnMap"
     *        1 - String containing the "paramMap"
     *        @param args holds the following input arguments:
     *          0 - String containing "objectId"
     *          1 - String containing "New Value"
     * @returns None
     * @throws Exception if operation fails
     * @since PMC V6R2008-1
     */
    public void updateState(Context context, String[] args) throws Exception {
        HashMap inputMap = (HashMap)JPO.unpackArgs(args);
        //HashMap columnMap = (HashMap) inputMap.get("columnMap");
        HashMap requestMap = (HashMap) inputMap.get("requestMap");
        HashMap paramMap = (HashMap) inputMap.get("paramMap");
        String languageStr = (String) paramMap.get("languageStr");
        String objectId = (String) paramMap.get("objectId");
        String newAttrValue = (String) paramMap.get("New Value");
        Object objTimezone = requestMap.get("timeZone");
        if(objTimezone != null){
         //   PropertyUtil.setGlobalRPEValue(context,"CLIENT_TIMEZONE", (String)objTimezone);
        }
        Task commonTask = new Task();
        commonTask.setId(objectId);
        String sCurrent = commonTask.getInfo(context, DecConstants.SELECT_CURRENT);
        StringList slState = ProjectSpace.getStates(context, DecConstants.POLICY_PROJECT_TASK);
        int iCurrent = slState.indexOf(sCurrent);
        int iNewCurrent = slState.indexOf(newAttrValue);
        if(ProgramCentralUtil.isNotNullString(newAttrValue)){
            PropertyUtil.setRPEValue(context, "State", newAttrValue, true);
            PropertyUtil.setGlobalRPEValue(context,"PERCENTAGE_COMPLETE", "true");
            ContextUtil.startTransaction(context, CHECK_HIDDEN);
            try {
                commonTask.setState(context, newAttrValue);
            //	for(;iCurrent<iNewCurrent; iCurrent++) {
            //		commonTask.promoteWithBL(context);
            //	}
            //	for(;iCurrent>iNewCurrent; iNewCurrent++) {
            //		commonTask.demoteWithBL(context);
            //	}
         // commonTask.setState(context, newAttrValue);
            }catch(Exception e) {
				String errorMessage = e.getMessage();
				String checkStateNotFoundError = "is not found in the object's policy.";
				if(errorMessage.contains(checkStateNotFoundError)) {
					errorMessage = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
							"emxProgramCentral.Policy.StateNotFound", languageStr);
				}
				ContextUtil.abortTransaction(context);
				throw (new MatrixException(errorMessage));
			}
            //commonTask.rollupAndSave(context);
        }
        ContextUtil.commitTransaction(context);
        //PropertyUtil.setGlobalRPEValue(context,"CLIENT_TIMEZONE", EMPTY_STRING);
    }
    
    
    /**
     * jhlee Add 2023-05-31
     * When the task is promoted this function is called.
     * Depending on which state the promote is triggered from
     * it performs the necessary actions based on the arg-STATENAME value
     *
     * Note: object id must be passed as first argument.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the object id
     *        1 - String containing the from state
     *        2 - String containing the to state
     * @throws Exception if operation fails
     */
    public void triggerPromoteAction(Context context, String[] args)
            throws Exception
    {
        DebugUtil.debug("Entering triggerPromoteAction");

        // get values from args.
        String objectId  = args[0];
        String fromState = args[1];
        String toState   = args[2];
        String checkAssignees = args[3];
        setId(objectId);
    StringList projectSpaceStates = new StringList();

        String strParentType = getInfo(context, SELECT_SUBTASK_TYPE);

        if (strParentType != null && strParentType.equals(TYPE_PART_QUALITY_PLAN))
        {
            _doNotRecurse = false;
        }

        if (fromState.equals(STATE_PROJECT_TASK_CREATE) && (_doNotRecurse && !isGateOrMilestone))
        {
            return;
        }

        java.util.ArrayList taskToPromoteList = new java.util.ArrayList();
        StringList busSelects = new StringList(4);
        busSelects.add(SELECT_ID);
        busSelects.add(SELECT_CURRENT);
        busSelects.add(SELECT_STATES);
        busSelects.add(SELECT_NAME);
        busSelects.add(SELECT_TYPE);
        busSelects.add(ProgramCentralConstants.SELECT_NEEDS_REVIEW);
        //Added:nr2:17-05-2010:PRG:R210:For Phase Gate Highlight
        busSelects.add(SELECT_POLICY);
        //End:nr2:17-05-2010:PRG:R210:For Phase Gate Highlight

        busSelects.add(ProgramCentralConstants.SELECT_KINDOF_GATE);
        busSelects.add(ProgramCentralConstants.SELECT_KINDOF_MILESTONE);
    busSelects.add(SELECT_IS_PROJECT_SPACE);

    //for paraentTaskInfo selectables
    StringList parentBusSelects = new StringList(4);
    parentBusSelects.add(SELECT_ID);
    parentBusSelects.add(SELECT_CURRENT);
    parentBusSelects.add(SELECT_STATES);
    parentBusSelects.add(SELECT_IS_PROJECT_SPACE);

        if (fromState.equals(STATE_PROJECT_TASK_CREATE))
        {
            //The first time this function is called this value will be false
            //second time around this will be true
            //The reason for doing this is since getTasks function gets all the
            //sub-tasks in one call all the sub-tasks are promoted in one pass
            //thereon if the sub-tasks call the function it returns without
            //doing anything
            //if (_doNotRecurse)
            //{
            //function called recursively return without doing anything
            //    return;
            //}

            busSelects.add(SELECT_HAS_ASSIGNED_TASKS);
            busSelects.add("relationship["+DomainConstants.RELATIONSHIP_OBJECT_ROUTE+"].to");

            // get all the subtasks
            MapList utsList = getTasks(context, this, 0, busSelects, null);
            if (utsList.size() > 0)
            {
                _doNotRecurse = true;
                Iterator itr = utsList.iterator();
                while (itr.hasNext())
                {
                    boolean promoteTask = false;
                    Map map = (Map) itr.next();
                    String state = (String) map.get(SELECT_CURRENT);
                    Object routes =  map.get("relationship["+DomainConstants.RELATIONSHIP_OBJECT_ROUTE+"].to");
                    StringList taskStateList =
                            (StringList) map.get(SELECT_STATES);

                    //get the position of the task's current state wrt
                    //to its state list
                    int taskCurrentPosition = taskStateList.indexOf(state);

                    //get the position to which the task need to be promoted
                    //if the toState does not exist then taskPromoteToPosition
                    //will be -1
                    //Added:nr2:17-05-2010:PRG:R210:For Phase Gate Highlight
                    String type = (String) map.get(SELECT_TYPE);
                    String policy = (String) map.get(SELECT_POLICY);

                    boolean isGateType      =   "TRUE".equalsIgnoreCase((String)map.get(ProgramCentralConstants.SELECT_KINDOF_GATE));
                    boolean isMilestoneType =   "TRUE".equalsIgnoreCase((String)map.get(ProgramCentralConstants.SELECT_KINDOF_MILESTONE));

                    if(type != null && ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(policy) && (isGateType || isMilestoneType)){

                        if( !_doNotRecurse && (STATE_PROJECT_TASK_ASSIGN.equals(toState) || STATE_PROJECT_TASK_ACTIVE.equals(toState))){
                            String [] arg1 = new String[4];
                            arg1[0] = objectId;
                            arg1[1] = STATE_PROJECT_TASK_ASSIGN;
                            arg1[2] = STATE_PROJECT_TASK_ACTIVE;
                            arg1[3] = "false";
                            triggerPromoteAction(context,arg1);
                            triggerSetPercentageCompletion(context,arg1);

                            arg1[0] = objectId;
                            arg1[1] = STATE_PROJECT_TASK_ACTIVE;
                            arg1[2] = STATE_PROJECT_TASK_REVIEW;
                            arg1[3] = "false";
                            triggerPromoteAction(context,arg1);
                        }
                    }
                    //End:nr2:17-05-2010:PRG:R210:For Phase Gate Highlight
                    int taskPromoteToPosition = taskStateList.indexOf(toState);
                    //check if the toState exists and if the current
                    //position of the task is less than the toState
                    if(taskPromoteToPosition != -1 &&
                            taskCurrentPosition < taskPromoteToPosition)
                    {
                        if ("true".equalsIgnoreCase(checkAssignees))
                        {
                            //is this task assigned to anyone?
                            //if true promote otherwise do not promote
                            if ("true".equalsIgnoreCase(
                                    (String) map.get(SELECT_HAS_ASSIGNED_TASKS)))
                            {
                                promoteTask = true;
                            }
                        }
                        else
                        {
                            //task can be promoted even if the task is not
                            //assigned to anyone
                            promoteTask = true;
                        }
                    }
                    if (promoteTask)
                    {
                        String taskId = (String) map.get(SELECT_ID);
                        if (routes != null) {
                            DomainObject taskObject = DomainObject.newInstance(
                                    context, taskId);
                            StringList relSelects = new StringList("attribute["+ DomainConstants.ATTRIBUTE_ROUTE_BASE_STATE+ "]");
                            String relWhere = "attribute["+ DomainConstants.ATTRIBUTE_ROUTE_BASE_STATE+ "] == \"state_Create\"";
                            MapList routeList = taskObject.getRelatedObjects(
                                    context,
                                    DomainConstants.RELATIONSHIP_OBJECT_ROUTE,
                                    DomainConstants.TYPE_ROUTE, null,
                                    relSelects, false, true, (short) 0, "",
                                    relWhere, (short) 0);
                            if (routeList != null && routeList.size() > 0) {
                                promoteTask = false;
                            }
                        }
                        if(promoteTask)
                        {
                            taskToPromoteList.add(taskId);
                        }
                    }
                }
                //_doNotRecurse = false;
            }
            else{
                //Added:nr2:17-05-2010:PRG:R210:For Phase Gate Highlight
                Map mInfo = getInfo(context, busSelects);
                String type = (String) mInfo.get(SELECT_TYPE);
                String policy = (String) mInfo.get(SELECT_POLICY);
                boolean isGateType      =   "TRUE".equalsIgnoreCase((String)mInfo.get(ProgramCentralConstants.SELECT_KINDOF_GATE));
                boolean isMilestoneType =   "TRUE".equalsIgnoreCase((String)mInfo.get(ProgramCentralConstants.SELECT_KINDOF_MILESTONE));
                if(type != null && ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(policy) && (isGateType || isMilestoneType)) {

                    //toState = STATE_PROJECT_TASK_REVIEW;
                    String [] arg1 = new String[4];
                    arg1[0] = objectId;
                    arg1[1] = STATE_PROJECT_TASK_ASSIGN;
                    arg1[2] = STATE_PROJECT_TASK_ACTIVE;
                    arg1[3] = "false";
                    triggerPromoteAction(context,arg1);

                    //String [] arg2 = new String[4];
                    arg1[0] = objectId;
                    arg1[1] = STATE_PROJECT_TASK_ACTIVE;
                    arg1[2] = STATE_PROJECT_TASK_REVIEW;
                    arg1[3] = "false";
                    triggerPromoteAction(context,arg1);

                    triggerSetPercentageCompletion(context,arg1);
                    isGateOrMilestone = true;
                }
                //End:nr2:17-05-2010:PRG:R210:For Phase Gate Highlight
            }
        }
        else if (fromState.equals(STATE_PROJECT_TASK_ASSIGN))
        {
            //******************start Business Goal promote to Active state*********
            //when the project is promoted from the assign to active state
            //promote the business goal if it is the first business goal
            //use super user to overcome access issue
            ContextUtil.pushContext(context);
            try
            {
                com.matrixone.apps.program.BusinessGoal businessGoal =
                        (com.matrixone.apps.program.BusinessGoal) DomainObject.newInstance(context,
                                DomainConstants.TYPE_BUSINESS_GOAL, DomainConstants.PROGRAM);
                com.matrixone.apps.program.ProjectSpace project =
                        (com.matrixone.apps.program.ProjectSpace) DomainObject.newInstance(context,
                                DomainConstants.TYPE_PROJECT_SPACE,DomainConstants.PROGRAM);
                project.setId(objectId);
                MapList businessGoalList = new MapList();
                businessGoalList = businessGoal.getBusinessGoals(context, project, busSelects, null);
                if (null != businessGoalList && businessGoalList.size()>0)
                {
                    Iterator businessGoalItr = businessGoalList.iterator();
                    while(businessGoalItr.hasNext())
                    {
                        Map businessGoalMap = (Map) businessGoalItr.next();
                        String businessGoalId = (String) businessGoalMap.get(businessGoal.SELECT_ID);
                        String businessGoalState = (String) businessGoalMap.get(businessGoal.SELECT_CURRENT);
                        businessGoal.setId(businessGoalId);
                        if(fromState.equals(STATE_PROJECT_TASK_ASSIGN) && businessGoalState.equals(STATE_BUSINESS_GOAL_CREATED))
                        {
                            businessGoal.changeTheState(context, businessGoalState);
                        } //ends if
                    }//ends while
                }//ends if
            }//ends try
            catch (Exception e)
            {
                DebugUtil.debug("Exception Task triggerPromoteAction- ",
                        e.getMessage());
                throw e;
            }
            finally
            {
                ContextUtil.popContext(context);
            }
            //******************end Business Goal promote to Active state*********

            //when the task is promoted from Assign to Active
            //promote the parent to Active
            DomainObject task = DomainObject.newInstance(context);
            //get the parent task
            MapList parentList = null;
            if(DecStringUtil.equals(getTypeName(context), DecConstants.TYPE_DECIWPTASK)) {
            	parentList = getRelatedObjects(context,
        				DecConstants.RELATIONSHIP_SUBTASK, //pattern to match relationships
        				DecConstants.TYPE_DECCWPTASK, //pattern to match types
        				parentBusSelects, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
        				null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
        				true, //get To relationships
        				false, //get From relationships
        				(short)1, //the number of levels to expand, 0 equals expand all.
        				DecConstants.EMPTY_STRING, //where clause to apply to objects, can be empty ""
        				DecConstants.EMPTY_STRING,
        				0); //where clause to apply to relationship, can be empty ""
            }
            else if(DecStringUtil.equalsAny(getTypeName(context), DecConstants.TYPE_TASK, DecConstants.TYPE_DECCWPTASK)) {
            	parentList = getParentInfo(context, 0, parentBusSelects);
            }else {
            	parentList = new MapList();
            }
         // if(parentList.size() > 0)  
            for(int i=0; i<parentList.size(); i++)
            {
                Map map = (Map) parentList.get(i);
                String state = (String) map.get(SELECT_CURRENT);
                StringList taskStateList = (StringList) map.get(SELECT_STATES);
                //get the position of the task's current state wrt to
                //its state list
                int taskCurrentPosition = taskStateList.indexOf(state);

                int taskPromoteToPosition = taskStateList.indexOf(toState);

                //check if the toState exists and if the current
                //position of the task is less than the toState
                if (taskPromoteToPosition != -1 &&
                        taskCurrentPosition < taskPromoteToPosition)
                {
                    String taskId = (String) map.get(SELECT_ID);
                    //use super user to overcome access issue
                    ContextUtil.pushContext(context);
                    try
                    {
                        //DI7 - Start solution for deadlock ---------------------------------
                      ContextUtil.setSavePoint(context, "PROMOTE");
                      MqlUtil.mqlCommand(context, "modify bus $1",taskId); //Obtain the modify lock before state promotion in order to guarantee accurate value
                        task.setId(taskId);
                        if(toState.equalsIgnoreCase(task.getInfo(context, DomainObject.SELECT_CURRENT))){
                            ContextUtil.abortSavePoint(context, "PROMOTE");
                        }else{
                            task.setState(context, toState);
                            promotedTasklist.add(taskId);
                        }
                        //END ---------------------------------
                    }catch (Exception e) {
						System.out.println(getTypeName(context));
						e.printStackTrace();
						throw e;
					}
                    finally
                    {
                        ContextUtil.popContext(context);
                    }
                }
                //Added:nr2:PRG:R210:For Project Hold Cancel Highlight
                //Coming in this condition since Project May be in Hold
                //and Task is promoted.
                else if(taskPromoteToPosition == -1){
                    String id = (String) map.get(SELECT_ID); //Should be Project Space id
        String isKindOfProjectSpace = (String) map.get(SELECT_IS_PROJECT_SPACE);
                    //DomainObject dObj = DomainObject.newInstance(context,id);

                   if("TRUE".equalsIgnoreCase(isKindOfProjectSpace)){
                        if(projectSpaceStates == null || projectSpaceStates.isEmpty() || projectSpaceStates.size() !=0 ) {
                        String mqlCmd = "print policy $1 select $2 dump $3";
                        String projectSpaceStatesRes = MqlUtil.mqlCommand(context, true, true, mqlCmd, true,POLICY_PROJECT_SPACE,"state","|");
                         projectSpaceStates= FrameworkUtil.split(projectSpaceStatesRes,"|");
                        }

                        int tasktoBePromotedToPosition = projectSpaceStates.indexOf(toState);
                        //Check the Value stored in Previous Project State Attribute.
                        //To store the new state only if greater than the one stored.
                        task.setId(id);

                        HashMap programMap = new HashMap();
                        programMap.put(SELECT_ID, id);
                        String[] arrJPOArguments = JPO.packArgs(programMap);
                        String previousState = (String)JPO.invoke(context, "emxProgramCentralUtilBase", null, "getPreviousState",arrJPOArguments,String.class);

                        int previousStatePos = projectSpaceStates.indexOf(previousState);

                        if(previousStatePos == -1){
                            previousStatePos = 6;
                        }

                        if (tasktoBePromotedToPosition != -1 && tasktoBePromotedToPosition > previousStatePos)
                        {
                            //String taskId = (String) map.get(SELECT_ID);

                            //use super user to overcome access issue
                            ContextUtil.pushContext(context);
                            try
                            {
                                programMap.put(SELECT_CURRENT, toState);
                                String[] arrJPOArgs = JPO.packArgs(programMap);
                                JPO.invoke(context, "emxProgramCentralUtilBase", null, "setPreviousState",arrJPOArgs,String.class);
                            }
                            finally
                            {
                                ContextUtil.popContext(context);
                            }
                        }
                    }
                } //End of Else if
                //End:nr2:PRG:R210:For Project Space Hold Cancel Highlight
            }
        }
        else if(fromState.equals(STATE_PROJECT_TASK_ACTIVE))
        {
            //do nothing for now
        }
        else if(fromState.equals(STATE_PROJECT_TASK_REVIEW))
        {
            //******************start Business Goal promote****to Complete state****
            //when the project is promoted from the review to complete state
            //promote the business goal if it is the first business goal
            //use super user to overcome access issue
            ContextUtil.pushContext(context);
            try
            {
                com.matrixone.apps.program.BusinessGoal businessGoal =
                        (com.matrixone.apps.program.BusinessGoal) DomainObject.newInstance(context,
                                DomainConstants.TYPE_BUSINESS_GOAL, DomainConstants.PROGRAM);
                com.matrixone.apps.program.ProjectSpace project =
                        (com.matrixone.apps.program.ProjectSpace) DomainObject.newInstance(context,
                                DomainConstants.TYPE_PROJECT_SPACE,DomainConstants.PROGRAM);
                project.setId(objectId);
                MapList businessGoalList = new MapList();
                businessGoalList = businessGoal.getBusinessGoals(context, project, busSelects, null);
                if (null != businessGoalList && businessGoalList.size()>0)
                {
                    Iterator businessGoalItr = businessGoalList.iterator();
                    while(businessGoalItr.hasNext())
                    {
                        Map businessGoalMap = (Map) businessGoalItr.next();
                        String businessGoalId = (String) businessGoalMap.get(businessGoal.SELECT_ID);
                        String businessGoalState = (String) businessGoalMap.get(businessGoal.SELECT_CURRENT);
                        businessGoal.setId(businessGoalId);
                        if(fromState.equals(STATE_PROJECT_TASK_REVIEW) && businessGoalState.equals(STATE_BUSINESS_GOAL_ACTIVE))
                        {
                            MapList projectList = businessGoal.getProjects(context, busSelects, null);
                            boolean changeState = true;
                            if (null != projectList && projectList.size()>0)
                            {
                                Iterator projectItr = projectList.iterator();
                                while(projectItr.hasNext())
                                {
                                    Map projectMap = (Map) projectItr.next();
                                    String projectId = (String) projectMap.get(project.SELECT_ID);
                                    String projectState = (String) projectMap.get(project.SELECT_CURRENT);
                                    if(!projectState.equals(STATE_PROJECT_TASK_COMPLETE) && !projectState.equals(STATE_PROJECT_TASK_ARCHIVE)  && !projectId.equals(objectId))
                                    {
                                        changeState = false;
                                    }
                                }
                                if(changeState)
                                {
                                    businessGoal.changeTheState(context,businessGoalState);
                                }//ends if
                            }//ends if
                        }//ends if
                    }//ends while
                }//ends if
            }//ends try
            catch (Exception e)
            {
                DebugUtil.debug("Exception Task triggerPromoteAction- ",
                        e.getMessage());
                e.printStackTrace();
                throw e;
            }
            finally
            {
                ContextUtil.popContext(context);
            }
            //******************end Business Goal promote to Complete state*******

            MapList parentList = null;
            if(DecStringUtil.equals(getTypeName(context), DecConstants.TYPE_DECIWPTASK)) {
            	parentList = getRelatedObjects(context,
        				DecConstants.RELATIONSHIP_SUBTASK, //pattern to match relationships
        				DecConstants.TYPE_DECCWPTASK, //pattern to match types
        				parentBusSelects, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
        				null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
        				true, //get To relationships
        				false, //get From relationships
        				(short)1, //the number of levels to expand, 0 equals expand all.
        				DecConstants.EMPTY_STRING, //where clause to apply to objects, can be empty ""
        				DecConstants.EMPTY_STRING,
        				0); //where clause to apply to relationship, can be empty ""
            }else if(DecStringUtil.equalsAny(getTypeName(context), DecConstants.TYPE_TASK, DecConstants.TYPE_DECCWPTASK)) {
            	parentList = getParentInfo(context, 0, parentBusSelects);
            }else {
            	parentList = new MapList();
            }
         // if(parentList.size() > 0)  
            for(int i=0; i<parentList.size(); i++)
            {
                Map map = (Map) parentList.get(i);
                String state = (String) map.get(SELECT_CURRENT);
                String parentType = (String) map.get(SELECT_TYPE);
                StringList parentStateList = (StringList)map.get(SELECT_STATES);

                if (state.equals(STATE_PROJECT_TASK_ACTIVE) || state.equals(STATE_PROJECT_TASK_REVIEW))
                {
                    String parentId = (String) map.get(SELECT_ID);
                    String parentNeedsReview = (String) map.get(ProgramCentralConstants.SELECT_NEEDS_REVIEW);

                    //set up the args as required for the check trigger
                    //check whether all the children for this parent is in the
                    //specified state
                    //String sArgs[] = {parentId, "", "state_Complete"};

                    setId(parentId);
                    boolean checkPassed = checkChildrenStates(context,
                            STATE_PROJECT_TASK_COMPLETE, null);

                    //int status = triggerCheckChildrenStates(context, sArgs);

                    //all children in complete state
                    if (checkPassed)
                    {
                        //get the position of the task's current state wrt to
                        //its state list
                        int taskCurrentPosition =parentStateList.indexOf(state);

                        //get the position of the Review state wrt to its
                        //state list
                        int taskPromoteToPosition = parentStateList.indexOf(STATE_PROJECT_TASK_ACTIVE);
                     //   if("No".equalsIgnoreCase(parentNeedsReview)){
                     //       taskPromoteToPosition = parentStateList.indexOf(STATE_PROJECT_TASK_COMPLETE);
                     //   }else{
                     //       taskPromoteToPosition = parentStateList.indexOf(STATE_PROJECT_TASK_REVIEW);
                     //   }
                        if(DecStringUtil.equals(toState, STATE_PROJECT_TASK_COMPLETE)) {
                            taskPromoteToPosition = parentStateList.indexOf(STATE_PROJECT_TASK_COMPLETE);
                        }
                     
                        if (parentType != null && parentType.equals(TYPE_PART_QUALITY_PLAN))
                        {
                            taskPromoteToPosition =
                                    parentStateList.indexOf(STATE_PART_QUALITY_PLAN_COMPLETE);
                        }

                        //Review state exists and is the state next to Active.
                        //Promote the parent
                        if (taskPromoteToPosition != -1 &&
                                (taskPromoteToPosition == (taskCurrentPosition + 1) || taskPromoteToPosition == (taskCurrentPosition + 2)))
                        {
                            //use super user to overcome access issue
                            ContextUtil.pushContext(context);
                            try
                            {
                                for(int j=taskCurrentPosition; j<taskPromoteToPosition; j++)
                                {
                                    setId(parentId);
                                    promote(context);
                                    promotedTasklist.add(parentId);
                                }
                            }
                            finally
                            {
                                ContextUtil.popContext(context);
                            }
                        }
                        //Added:nr2:PRG:R210:For Project Hold Cancel Highlight
                        //Coming in this condition since Project May be in Hold
                        //and Task is promoted.
                        else if(taskPromoteToPosition == -1){
                            String id = (String) map.get(SELECT_ID); //Should be Project Space id
            String isKindOfProjectSpace = (String) map.get(SELECT_IS_PROJECT_SPACE);
                            //DomainObject dObj = DomainObject.newInstance(context,id);

                            if("TRUE".equalsIgnoreCase(isKindOfProjectSpace)){
                                if(projectSpaceStates == null || projectSpaceStates.isEmpty() || projectSpaceStates.size() !=0 ) {
                                String mqlCmd = "print policy $1 select $2 dump $3";
                                String projectSpaceStatesRes = MqlUtil.mqlCommand(context, true, true, mqlCmd, true,POLICY_PROJECT_SPACE,"state","|");
                                 projectSpaceStates= FrameworkUtil.split(projectSpaceStatesRes,"|");
                                }
                                int tasktoBePromotedToPosition = projectSpaceStates.indexOf(toState); //toState is Completed hence 4
                                //Check the Value stored in Previous Project State Attribute.
                                //To store the new state only if greater than the one stored.
                                Task task = new Task(id);

                                HashMap programMap = new HashMap();
                                programMap.put(SELECT_ID, id);
                                String[] arrJPOArguments = JPO.packArgs(programMap);
                                String previousState = (String)JPO.invoke(context, "emxProgramCentralUtilBase", null, "getPreviousState",arrJPOArguments,String.class);

                                int previousStatePos = projectSpaceStates.indexOf(previousState); //This will be 2 (Active) most Probably

                                if(previousStatePos == -1){
                                    previousStatePos = 6;
                                }

                                if (tasktoBePromotedToPosition != -1 && tasktoBePromotedToPosition > previousStatePos)
                                {
                                    //String taskId = (String) map.get(SELECT_ID);

                                    //use super user to overcome access issue
                                    ContextUtil.pushContext(context);
                                    try
                                    {
                                        programMap.put(SELECT_CURRENT, STATE_PROJECT_TASK_REVIEW);
                                        String[] arrJPOArgs = JPO.packArgs(programMap);
                                        JPO.invoke(context, "emxProgramCentralUtilBase", null, "setPreviousState",arrJPOArgs,String.class);
                                    }
                                    finally
                                    {
                                        ContextUtil.popContext(context);
                                    }
                                }
                            }
                        } //End of Else if
                        //End:nr2:PRG:R210:For Project Space Hold Cancel Highlight
                    }
                }
            }
        }
        //Set in Cahche for refresh
        CacheUtil.setCacheObject(context, context.getUser()+"_PromotedTaskIdList", promotedTasklist);
        DebugUtil.debug("Exiting Task triggerPromoteAction");
    }
    
    /**
     * jhlee Add 2023-05-31
     * When the task is demoted this function is called.
     * Depending on which state the promote is triggered from
     * it performs the necessary actions based on the arg-STATENAME value
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the object id
     *        1 - String containing the from state
     *        2 - String containing the to state
     * @throws Exception if operation fails
     */
    public void triggerDemoteAction(Context context, String[] args)
            throws Exception
    {
        DebugUtil.debug("Entering triggerDemoteAction");

        // get values from args.
        String objectId  = args[0];
        String fromState = args[1];
        String toState   = args[2];

        setId(objectId);

        StringList busSelects = new StringList(4);
        busSelects.add(SELECT_ID);
        busSelects.add(SELECT_CURRENT);
        busSelects.add(SELECT_STATES);
        busSelects.add(SELECT_NAME);
        busSelects.add(SELECT_TYPE);
        busSelects.add(SELECT_POLICY);

        MapList parentList = new MapList();
        try{
            ProgramCentralUtil.pushUserContext(context);
            parentList = getParentInfo(context, 1, busSelects);
            if(DecStringUtil.equals(getTypeName(context), DecConstants.TYPE_DECIWPTASK)) {
            	parentList = getRelatedObjects(context,
        				DecConstants.RELATIONSHIP_SUBTASK, //pattern to match relationships
        				DecConstants.TYPE_DECCWPTASK, //pattern to match types
        				busSelects, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
        				null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
        				true, //get To relationships
        				false, //get From relationships
        				(short)1, //the number of levels to expand, 0 equals expand all.
        				DecConstants.EMPTY_STRING, //where clause to apply to objects, can be empty ""
        				DecConstants.EMPTY_STRING,
        				0); //where clause to apply to relationship, can be empty ""
            }else if(DecStringUtil.equalsAny(getTypeName(context), DecConstants.TYPE_TASK, DecConstants.TYPE_DECCWPTASK)) {
            	parentList = getParentInfo(context, 0, busSelects);
            }else {
            	parentList = new MapList();
            }
        }finally{
            ProgramCentralUtil.popUserContext(context);
        }

        if (fromState.equals(STATE_PROJECT_TASK_ASSIGN))
        {
            //check if the parent is in Assign state
            //then check the status of the siblings
            //if none of the siblings are in assign state
            //the demote the parent to "Create" state
            boolean demoteParent = false;
            //Added:10-Aug-2010"PRG:R210:For Hold and Cancel Highlight
            String parentPolicy = EMPTY_STRING;
            String parentId = EMPTY_STRING;
            //End:10-Aug-2010"PRG:R210:For Hold and Cancel Highlight

        //  if (parentList.size() > 0)
            for(int i=0; i<parentList.size(); i++)
            {
                Map map = (Map) parentList.get(i);
                String state = (String) map.get(SELECT_CURRENT);
                parentId = (String) map.get(SELECT_ID);
                setId(parentId);

                //Added:10-Aug-2010:PRG:R210:For Hold and Cancel Highlight
                parentPolicy = (String) map.get(SELECT_POLICY);

                //if (state.equals(STATE_PROJECT_TASK_ASSIGN))
                if (state.equals(STATE_PROJECT_TASK_ASSIGN) ||
                        (ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD.equals(state)
                                && ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL.equals(parentPolicy)))
                {
                    //check if atleast one child is in assign state
                    // get children (one level)
                    MapList utsList = new MapList();
                    try{
                        ProgramCentralUtil.pushUserContext(context);
                        utsList = getTasks(context, this, 1,busSelects, null);
                    }finally{
                        ProgramCentralUtil.popUserContext(context);
                    }

                    if (utsList.size() > 0)
                    {
                        demoteParent = true;
                        Iterator itr = utsList.iterator();
                        while (itr.hasNext())
                        {
                            Map taskmap = (Map) itr.next();
                            state = (String) taskmap.get(SELECT_CURRENT);
                            /*                            StringList taskStateList =
                                    (StringList) map.get(SELECT_STATES);
                             */
                            StringList taskStateList =
                                    (StringList) taskmap.get(SELECT_STATES);

                            //Added:nr2:PRG:R210:For Project Gate Highlight
                            String taskId = (String) taskmap.get(SELECT_ID);
                            String taskPolicy = "";
                            taskPolicy = (String)taskmap.get(SELECT_POLICY);
                            //End:nr2:PRG:R210:For Project Gate Highlight

                            //get the position of the task's current state wrt
                            //to its state list
                            int taskCurrentPosition =
                                    taskStateList.indexOf(state);

                            //get the position of "Assign" in the state list
                            //if the "Assign" state does not exist then
                            //taskAssignPostion will be -1
                            int taskAssignStatePosition = taskStateList.indexOf(
                                    STATE_PROJECT_TASK_ASSIGN);

                            //Added:nr2:PRG:R210:For Project Gate Highlight
                            if(ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(taskPolicy) && taskAssignStatePosition == -1)
                            {
                                taskAssignStatePosition = 1;
                            }
                            //End:nr2:PRG:R210:For Project Gate Highlight

                            //if the current task position is less then the
                            //taskAssignStatePosition, demote the task
                            if (taskAssignStatePosition == -1 ||
                                    taskCurrentPosition >= taskAssignStatePosition)
                            {
                                demoteParent = false;
                                break;
                            }
                        }
                    }
                }
            }
            if (demoteParent)
            {
                //use super user to overcome access issue
                ContextUtil.pushContext(context);
                try
                {
                    //Added:10-Aug-2010"PRG:R210:For Hold and Cancel Highlight
                    if(ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL.equals(parentPolicy)){
                        HashMap programMap = new HashMap();
                        programMap.put(SELECT_ID,parentId);
                        programMap.put(SELECT_CURRENT, STATE_PROJECT_TASK_CREATE);
                        String[] arrJPOArgs = JPO.packArgs(programMap);
                        JPO.invoke(context, "emxProgramCentralUtilBase", null, "setPreviousState",arrJPOArgs,String.class);
                    }
                    //End:10-Aug-2010"PRG:R210:For Hold and Cancel Highlight
                    else{
                        demote(context);
                        promotedTasklist.add(parentId);
                    }
                }
                finally
                {
                    ContextUtil.popContext(context);
                }
            }
        }
        else if (fromState.equals(STATE_PROJECT_TASK_ACTIVE))
        {
            //when the task is demoted from Active to Assign
            //if this is the last sibling being demoted,
            //demote the parent too

            //get the parent task
            //Added:nr2:PRG:R210:For project Gate Highlight
            String parentIdHolder = EMPTY_STRING;
            String parentId = EMPTY_STRING;
            //End:nr2:PRG:R210:For project Gate Highlight

            boolean demoteParent = false;
         // if(parentList.size() > 0)  
            for(int i=0; i<parentList.size(); i++)
            {
                demoteParent = true;
                Map map = (Map) parentList.get(i);
                String state = (String) map.get(SELECT_CURRENT);
                String type = (String) map.get(SELECT_TYPE);
                parentId = (String) map.get(SELECT_ID);
                //Added:nr2:PRG:R210:For project Gate Highlight
                parentIdHolder = parentId;
                //End:nr2:PRG:R210:For project Gate Highlight
                setId(parentId);

                //Added:nr2:PRG:R210:10-Aug-2010:For project Gate Highlight
                String parentPolicy = (String) map.get(SELECT_POLICY);
                if(ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL.equals(parentPolicy)){
                    try{
                        ProgramCentralUtil.pushUserContext(context);
                        HashMap programMap = new HashMap();
                        programMap.put(SELECT_ID, parentId);
                        String[] arrJPOArguments = JPO.packArgs(programMap);
                        String previousState = (String)JPO.invoke(context, "emxProgramCentralUtilBase", null, "getPreviousState",arrJPOArguments,String.class);

                        if(null!=previousState && STATE_PROJECT_TASK_ACTIVE.equals(previousState)){
                            state = STATE_PROJECT_TASK_ACTIVE;
                        }
                    }finally{
                        ProgramCentralUtil.popUserContext(context);
                    }
                }
                //End:nr2:PRG:R210:10-Aug-2010:For project Gate Highlight

                if (state.equals(STATE_PROJECT_TASK_ACTIVE) && (type == null || !TYPE_PART_QUALITY_PLAN.equals(type)))
                {
                    //get children (one level)
                    MapList utsList = new MapList();
                    try{
                        ProgramCentralUtil.pushUserContext(context);
                        utsList = getTasks(context, this, 1,busSelects, null);
                    }finally{
                        ProgramCentralUtil.popUserContext(context);
                    }
                    if (utsList.size() > 0)
                    {
                        Iterator itr = utsList.iterator();
                        while (itr.hasNext())
                        {
                            Map taskmap = (Map) itr.next();
                            state = (String) taskmap.get(SELECT_CURRENT);
                            /*                            StringList taskStateList =
                                    (StringList) map.get(SELECT_STATES);
                             */
                            String taskPolicy = (String)taskmap.get(SELECT_POLICY);
                            StringList taskStateList =
                                    (StringList) taskmap.get(SELECT_STATES);

                            //get the position of the task's current state wrt to its state list
                            int taskCurrentPosition =
                                    taskStateList.indexOf(state);

                            //get the position of "Active" in the state list
                            //if the "Active" state does not exist then
                            //taskActivePostion will be -1
                            int taskActiveStatePosition = taskStateList.indexOf(
                                    STATE_PROJECT_TASK_ACTIVE);

                            if(ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(taskPolicy) && taskActiveStatePosition == -1)
                            {
                                taskActiveStatePosition = 1;
                            }
                            //check if any of the tasks are in active state.
                            //If there are no tasks in active state, then demote
                            //the parent task
                            if (taskActiveStatePosition != -1 &&
                                    taskCurrentPosition >= taskActiveStatePosition)
                            {
                                demoteParent = false;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    //Added:nr2:PRG:R210:03-Aug-2010:For Project Gate highlight
                    //Comes here if parent is a Gate/Milestone
                    if(ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(parentPolicy) &&
                            state.equals(ProgramCentralConstants.STATE_PROJECT_REVIEW_REVIEW)){
                        demoteParent = true;
                    }
                    //End:nr2:PRG:R210:03-Aug-2010:For Project Gate highlight
                    else{
                        demoteParent = false;
                    }
                }
            }
            if (demoteParent)
            {
                //use super user to overcome access issue
                ContextUtil.pushContext(context);
                try
                {
                    //Added:nr2:PRG:R210:For Project Hold Cancel Highlight
                    //if Project is in Hold and subtask's states are changed
                    //The intended demoted state is remembered.
                    String projectPolicy = getInfo(context,SELECT_POLICY);

                    if(ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL.equals(projectPolicy)){
                        HashMap programMap = new HashMap();
                        programMap.put(SELECT_ID,parentId);
                        programMap.put(SELECT_CURRENT, STATE_PROJECT_SPACE_ASSIGN);
                        String[] arrJPOArgs = JPO.packArgs(programMap);
                        JPO.invoke(context, "emxProgramCentralUtilBase", null, "setPreviousState",arrJPOArgs,String.class);
                    }
                    else{
                        demote(context);
                        promotedTasklist.add(parentId);
                    }
                    //End:nr2:PRG:R210:For Project Hold Cancel Highlight
                }
                finally
                {
                    ContextUtil.popContext(context);
                }
            }
            //Added:nr2:PRG:R210:For Project Gate Highlight
            //This addition simulates the behaviour of task demotion for gates/milestones
            //If the selected task being demoted from review state is gate or milestone they
            //are demoted in the order review->Active->Assign
            setId(objectId);
            String policyName = getInfo(context,SELECT_POLICY);
            if(ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(policyName)){
                String [] arg = new String[3];
                arg[0] = objectId;
                arg[1] = STATE_PROJECT_TASK_ASSIGN;
                arg[2] = STATE_PROJECT_TASK_CREATE;
                //arg1[3] = "false";
                triggerDemoteAction(context,arg);
            }
            setId(parentIdHolder);
            //End:nr2:PRG:R210:For Project Gate Highlight
        }
        else if(fromState.equals(STATE_PROJECT_TASK_REVIEW))
        {
            //Action:Check whether the parent is in review state if so demote
            //it to active state
            //i.e when the first child is demoted from Review to Active
            // demote the parent too

            //get the parent task
            //Added:nr2:PRG:R210:For project Gate Highlight
            String parentIdHolder = EMPTY_STRING;
            //End:nr2:PRG:R210:For project Gate Highlight

            // if(parentList.size() > 0)  
            for(int i=0; i<parentList.size(); i++)
            {
                Map map = (Map) parentList.get(i);
                String state = (String) map.get(SELECT_CURRENT);
                String parentId = (String) map.get(SELECT_ID);

                //Added:nr2:PRG:R210:For project Gate Highlight
                parentIdHolder = parentId;
                //End:nr2:PRG:R210:For project Gate Highlight
                setId(parentId);

                //parent is in Review state
                if(state.equals(STATE_PROJECT_TASK_REVIEW))
                {
                    StringList taskStateList =
                            (StringList) map.get(SELECT_STATES);
                    //get the position of the task's current state wrt to
                    //its state list
                    int taskCurrentPosition = taskStateList.indexOf(state);

                    //get the position of "Active" state in the state list
                    //if the "Active" state does not exist then
                    //taskActivePostion will be -1
                    int taskActiveStatePosition =
                            taskStateList.indexOf(STATE_PROJECT_TASK_ACTIVE);

                    //Added:nr2:31-05-2010:PRG:R210:For Stage Gate Highlight
                    //This condition is added so that non-availability of Active state
                    //in Project Review policy does not block the demotion of Parent
                    //tasks in Active state.
                    String taskPolicy =  (String)map.get(SELECT_POLICY);
                    if(ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(taskPolicy) && taskActiveStatePosition == -1){
                        taskActiveStatePosition = 2;
                    }
                    //End:nr2:31-05-2010:PRG:R210:For Stage Gate Highlight

                    //check if any of the tasks are in active state.
                    if (taskActiveStatePosition != -1 &&
                            taskCurrentPosition > taskActiveStatePosition)
                    {
                        //use super user to overcome access issue
                        ContextUtil.pushContext(context);
                        try
                        {
                            //demote the parent to Active state
                            //Added:nr2:31-05-2010:PRG:R210:For Stage Gate Highlight
                            //Demote the parent to Active state only when the parent is not
                            //Geverned by Project Review Policy.
                            if(! ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(taskPolicy)){
                                if(ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL.equals(taskPolicy))
                                {
                                    HashMap programMap = new HashMap();
                                    programMap.put(SELECT_ID, parentId);
                                    programMap.put(SELECT_CURRENT, STATE_PROJECT_SPACE_ACTIVE);
                                    String[] arrJPOArgs = JPO.packArgs(programMap);
                                    JPO.invoke(context, "emxProgramCentralUtilBase", null, "setPreviousState",arrJPOArgs,String.class);
                                }
                                else {
                                    setState(context, STATE_PROJECT_TASK_ACTIVE);
                                    promotedTasklist.add(parentId);
                                }
                            }
                            //End:nr2:31-05-2010:PRG:R210:For Stage Gate Highlight
                        }
                        finally
                        {
                            ContextUtil.popContext(context);
                        }
                    }
                }
            }

            //Added:nr2:PRG:R210:For Project Gate Highlight
            //This addition simulates the behaviour of task demotion for gates/milestones
            //If the selected task being demoted from review state is gate or milestone they
            //are demoted in the order review->Active->Assign

            //process for task instead of parent
            setId(objectId);
            String policyName = getInfo(context,SELECT_POLICY);
            //Coming at this position means

            if(ProgramCentralConstants.POLICY_PROJECT_REVIEW.equals(policyName)){
                String [] arg = new String[3];
                arg[0] = objectId;
                arg[1] = STATE_PROJECT_TASK_REVIEW;
                arg[2] = STATE_PROJECT_TASK_ACTIVE;
                //arg1[3] = "false";
                triggerSetPercentageCompletion(context,arg);

                arg[0] = objectId;
                arg[1] = STATE_PROJECT_TASK_ACTIVE;
                arg[2] = STATE_PROJECT_TASK_ASSIGN;
                triggerDemoteAction(context,arg);
                //String [] arg2 = new String[4];
            }
            setId(parentIdHolder);
            //End:nr2:PRG:R210:For Project gate Highlight
        }
        if (toState.equals(STATE_PROJECT_TASK_ACTIVE))
        {
            setId(objectId);
            String value = getInfo(context, SELECT_PERCENT_COMPLETE);
            double percent = Task.parseToDouble(value);
            if (90 < percent)
            {
                setAttributeValue(context, ATTRIBUTE_PERCENT_COMPLETE, "90");
            }
        }

        CacheUtil.setCacheObject(context, context.getUser()+"_PromotedTaskIdList", promotedTasklist);
        DebugUtil.debug("Exiting Task triggerDemoteAction");
    }
    
    public void updateTableRelEWPAttrValue(Context context, String[] args) throws Exception{
    	updateTableAttrValue(context, args, "from[" + DecConstants.RELATIONSHIP_DECEWPREL +"].to.id");
    }
    
    public void updateTableAttrValue(Context context, String[] args) throws Exception{
    	updateTableAttrValue(context, args, null);
    }
    
    public void updateTableAttrValue(Context context, String[] args, String sParam) throws Exception{
		
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		HashMap columnMap = (HashMap) programMap.get("columnMap");
		HashMap settings = (HashMap) columnMap.get("settings");
		
		String objectId = (String) paramMap.get("objectId");
        String newValue = (String) paramMap.get("New Value");
        String sAdminType = (String) settings.get("Admin Type");
        String sAttrName = PropertyUtil.getSchemaProperty(sAdminType);
        try {
            DomainObject doObj = DomainObject.newInstance(context, objectId);
            ContextUtil.startTransaction(context, true);
            doObj.setAttributeValue(context, sAttrName, newValue); 
            if(sParam != null) {
            	objectId = doObj.getInfo(context, sParam);
            	if(DecStringUtil.isNotEmpty(objectId)) {
                	doObj = DomainObject.newInstance(context, objectId);
                    doObj.setAttributeValue(context, sAttrName, newValue); 
            	}
            }
            ContextUtil.commitTransaction(context);
        }catch (Exception e) {
        	ContextUtil.abortTransaction(context);
        	e.printStackTrace();
        	throw e;
		}
	}
    public void updateFormRelParentSubTaskAttrValue(Context context, String[] args) throws Exception{
    	updateFormAttrValue(context, args, "to[" + DecConstants.RELATIONSHIP_SUBTASK +"].from.id");
    }
    public void updateFormRelEWPAttrValue(Context context, String[] args) throws Exception{
    	updateFormAttrValue(context, args, "from[" + DecConstants.RELATIONSHIP_DECEWPREL +"].to.id");
    }
    
    public void updateFormAttrValue(Context context, String[] args) throws Exception{
    	updateFormAttrValue(context, args, null);
    }
    
    public void updateFormAttrValue(Context context, String[] args, String sParam) throws Exception{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap paramMap = (HashMap) programMap.get("paramMap");
        Map fieldMap = (Map)programMap.get("fieldMap");
        Map settings = (Map)fieldMap.get("settings");
		
		String objectId = (String) paramMap.get("objectId");
        String newValue = (String) paramMap.get("New Value");
        String sAdminType = (String) settings.get("Admin Type");
        String sAttrName = PropertyUtil.getSchemaProperty(sAdminType);
        try {
            DomainObject doObj = DomainObject.newInstance(context, objectId);
            ContextUtil.startTransaction(context, true);
            if(sParam != null) {
            	objectId = doObj.getInfo(context, sParam);
            	if(DecStringUtil.isNotEmpty(objectId)) {
                	doObj = DomainObject.newInstance(context, objectId);
            	}
            }
            doObj.setAttributeValue(context, sAttrName, newValue);
            ContextUtil.commitTransaction(context);
        }catch (Exception e) {
        	ContextUtil.abortTransaction(context);
        	e.printStackTrace();
        	throw e;
		}
    }
    public Map decUpdateScheduleChangesOOTB (Context context, String[] args) throws Exception {
    	return decUpdateScheduleChanges(context, args, true);
	}
    public Map decUpdateScheduleChanges (Context context, String[] args) throws Exception {
    	return decUpdateScheduleChanges(context, args, false);
	}
    
    /**
     * Update schedule changes.
     * @param context - The eMatrix <code>Context</code> object.
     * @param args holds object related information.
     * @return Map - Modified row object information.
     * @throws Exception - If Operation fails.
     * @author DI7
     */

    @com.matrixone.apps.framework.ui.PostProcessCallable
    public Map decUpdateScheduleChanges (Context context, String[] args, boolean returnOOTB) throws Exception
    {
    	Map returnMap = new HashMap();
    	Map returnOOTBMap = new HashMap();
        // returnMap.put("Action","refresh");
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append("main:function() {");
        //sb.append("var topFrame = findFrame(getTopWindow(), \"detailsDisplay\");");
        //sb.append("var cmdURL = topFrame.location.href;");
        //sb.append("topFrame.location.href = cmdURL;");
        sb.append("switchToViewMode();");
        sb.append("getTopWindow().refreshTablePage();");
        sb.append("}}");

        returnMap.put("Action","execScript");
        returnMap.put("Message", sb.toString());
    	try {
    		returnOOTBMap = updateScheduleChanges(context, args);
            Map inputMap = (HashMap)JPO.unpackArgs(args);
            List elementList = null;
            Document doc = (Document) inputMap.get("XMLDoc");
            if(doc != null) {
                Element rootElement = (Element)doc.getRootElement();
                elementList     = rootElement.getChildren("object");
            }
            DomainObject doTask = DomainObject.newInstance(context);
            DomainObject doCWPTask = null;
            DomainObject doEWPTask = DomainObject.newInstance(context);
            Map<String, String> mAttr = null;
            StringList slParam = new StringList();
            slParam.add(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
            slParam.add(DecConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_START_DATE);
            slParam.add(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
            slParam.add(DecConstants.SELECT_ATTRIBUTE_DECSTAGE);
            slParam.add("to[" + DecConstants.RELATIONSHIP_SUBTASK + "].from.id");
            StringList slEWPParam = new StringList();
            slEWPParam.add(DecConstants.SELECT_ATTRIBUTE_DECEWPRELEASEPLAN);
            slEWPParam.add(DecConstants.SELECT_ATTRIBUTE_DECEWPRELEASEFORECAST);
            slEWPParam.add(DecConstants.SELECT_ATTRIBUTE_DECEWPRELEASEACTUAL);
            slEWPParam.add(DecConstants.SELECT_ATTRIBUTE_DECEWPSTAGE);
            slEWPParam.add(DecConstants.SELECT_ATTRIBUTE_DECEWPSTATUS);
            String sEstDate = null;
            String sActualDate = null;
            String sEWPId = null;
            String sStage = null;
            String sStatus = null;
            MapList taskSchedulingInfoList      = new MapList();
            if(elementList != null){
            	ContextUtil.startTransaction(context, true);
                Iterator itrC  = elementList.iterator();
                while(itrC.hasNext()){
                    Element childCElement   = (Element)itrC.next();
                    String objectId         = childCElement.getAttributeValue("objectId");
                    
                    List columnList = childCElement.getChildren();
                    if(columnList != null){
                        Iterator itrC1 = columnList.iterator();
                        while(itrC1.hasNext()) {
                            Element colEle  = (Element)itrC1.next();
                            String colValue = colEle.getTextTrim();
                            String colName  = colEle.getAttributeValue("name");

                        	doTask.setId(objectId);
                        	String sTaskType = doTask.getTypeName(context);
                        	String sCurrent = doTask.getInfo(context, DecConstants.SELECT_CURRENT);
                        	mAttr = doTask.getInfo(context, slParam);
                        	if(DecStringUtil.equals(sCurrent, DecConstants.STATE_PROJECT_TASK_COMPLETE)) {
                        		doTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_CLOSEOUT);
                        	}else if(DecStringUtil.equalsAnyIgnoreCase(colName, COLUMN_ACTUAL_START_DATE, COLUMN_ESTIMATED_START_DATE, "PhaseForecastStartDate")) {
                            	if(DecStringUtil.isNotEmpty(mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE))) {
                            		sEstDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
                            	}else {
                            		sEstDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
                            	}
                            	sActualDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_START_DATE);
                            	
                                if(COLUMN_ACTUAL_START_DATE.equalsIgnoreCase(colName)) {
                                	sActualDate = colValue;
                                }else if(DecStringUtil.equalsAnyIgnoreCase(colName, COLUMN_ESTIMATED_START_DATE, "PhaseForecastStartDate")) {
                                	sEstDate = colValue;
                                }
                                sStage = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECSTAGE);
                                if(!DecStringUtil.equalsIgnoreCase(sStage, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_CLOSEOUT) && DecStringUtil.isNotEmpty(sActualDate)) {
                                    if(DecDateUtil.getDifference(sActualDate, sEstDate) >= 0) {
                                		doTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_PLANSTART);
                                	}else {
                                		doTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_LATESTART);
                                	}
                                }
                            	if(DecStringUtil.equals(sTaskType, DecConstants.TYPE_DECIWPTASK)) {
                            		String sCWPOID = mAttr.get("to[" + DecConstants.RELATIONSHIP_SUBTASK + "].from.id");
                            		if(DecStringUtil.isNotEmpty(sCWPOID)) {
                                		doCWPTask = DomainObject.newInstance(context, sCWPOID);
                                    	sCurrent = doCWPTask.getInfo(context, DecConstants.SELECT_CURRENT);
                                    	if(DecStringUtil.equals(sCurrent, DecConstants.STATE_PROJECT_TASK_COMPLETE)) {
                                    		doCWPTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_CLOSEOUT);
                                    		continue;
                                    	}
                                    	mAttr = doCWPTask.getInfo(context, slParam);
                                    	if(DecStringUtil.isNotEmpty(mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE))) {
                                    		sEstDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECTASKFORECASTSTARTDATE);
                                    	}else {
                                    		sEstDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
                                    	}
                                    	sActualDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_START_DATE);
                                        sStage = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECSTAGE);
                                        if(!DecStringUtil.equalsIgnoreCase(sStage, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_CLOSEOUT) && DecStringUtil.isNotEmpty(sActualDate)) {
                                            if(DecDateUtil.getDifference(sActualDate, sEstDate) >= 0) {
                                            	doCWPTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_PLANSTART);
                                        	}else {
                                        		doCWPTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_LATESTART);
                                        	}
                                        }
                            		}
                            	}
                        	}else if(DecStringUtil.equalsAnyIgnoreCase(colName, "EWPReleasePlan", "EWPReleaseForecast", "EWPReleaseActual")) {
                        		sEWPId = doTask.getInfo(context, "from[" + DecConstants.RELATIONSHIP_DECEWPREL + "].to.id");
                        		if(DecStringUtil.isNotEmpty(sEWPId)) {
                        			doEWPTask.setId(sEWPId);
                        			mAttr = doEWPTask.getInfo(context, slEWPParam);
                                	sCurrent = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECEWPSTATUS);
                                	if(DecStringUtil.equals(sCurrent, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_COMPLETED)) {
                                		doEWPTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECEWPSTAGE, DecConstants.ATTRIBUTE_DECEWPSTAGE_RANGE_CLOSEOUT);
                                		continue;
                                	}
                                	if(DecStringUtil.isNotEmpty(mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECEWPRELEASEFORECAST))) {
                                		sEstDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECEWPRELEASEFORECAST);
                                	}else {
                                		sEstDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECEWPRELEASEPLAN);
                                	}
                                	sActualDate = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECEWPRELEASEACTUAL);

                                    sStage = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECSTAGE);
                                    sStatus = mAttr.get(DecConstants.SELECT_ATTRIBUTE_DECEWPSTATUS);
                                    if("EWPReleaseActual".equalsIgnoreCase(colName)) {
                                    	sActualDate = colValue;
                                    	if(!DecStringUtil.equalsAnyIgnoreCase(sStatus, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_COMPLETED, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_INTROUBLE, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_INPROGRESS)) {
                                        	doEWPTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECEWPSTATUS, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_INPROGRESS);
                                    	}
                                    }else if(DecStringUtil.equalsAnyIgnoreCase(colName, "EWPReleasePlan", "EWPReleaseForecast")) {
                                    	sEstDate = colValue;
                                    }
                                    if(!DecStringUtil.equalsIgnoreCase(sStage, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_CLOSEOUT)) {
                                        if(DecDateUtil.getDifference(sActualDate, sEstDate) >= 0) {
                                        	doEWPTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECEWPSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_PLANSTART);
                                    	}else {
                                    		doEWPTask.setAttributeValue(context, DecConstants.ATTRIBUTE_DECEWPSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_LATESTART);
                                    	}
                                    }
                        		}
                        	}
                        }
                    }
                }
            }
            ContextUtil.commitTransaction(context);
    	}catch (Exception e) {
    		ContextUtil.abortTransaction(context);
			e.printStackTrace();
			throw e;
		}
    	if(returnOOTB) {
            return returnOOTBMap;
    	}else {
            return returnMap;
    	}
    }
    
    public StringList isHasEWP(Context context, String[] args) throws Exception {
        HashMap<?, ?> inputMap = (HashMap<?, ?>)JPO.unpackArgs(args);
		MapList mlObject = (MapList) inputMap.get("objectList");

		StringList slReturn = new StringList();
		Iterator objectItr = mlObject.iterator();
		Map mObject = null;
		String sObjectId = null;
		String sHasEWP = null;
		String sCurrent = null;

        int size = mlObject.size();
        String[] objIds = new String[size];

        for(int i=0;i<size;i++){
            Map objectMap = (Map)mlObject.get(i);
            objIds[i]       = (String)objectMap.get(SELECT_ID);
        }

    	try {
	        invokeFromODTFile = (String)inputMap.get("invokeFrom"); //Added for ODT
	        BusinessObjectWithSelectList objectWithSelectList = null;
	        StringList slParam = new StringList();
	        slParam.add("from[" + DecConstants.RELATIONSHIP_DECEWPREL + "]");
            slParam.add(ProgramCentralConstants.SELECT_CURRENT);
	
	        if(ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)){ //Added for ODT usage
	            objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList( context, objIds, slParam,false);
	        }else {
	            objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList( context, objIds, slParam);
	        }
	        
	        for(int i=0;i<size;i++){
	            BusinessObjectWithSelect bws = objectWithSelectList.getElement(i);
	            sHasEWP = bws.getSelectData("from[" + DecConstants.RELATIONSHIP_DECEWPREL + "]");
	            sCurrent = bws.getSelectData(ProgramCentralConstants.SELECT_CURRENT);
	            if("false".equalsIgnoreCase(sHasEWP) || sCurrent.equals(DecConstants.STATE_PROJECT_TASK_COMPLETE)) {
	            	slReturn.add("false");
	            }else{
	            	slReturn.add("true");
	            }
	        }
    	}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
        return slReturn;
    }
    
    public StringList getWBSType (Context context, String[] args) throws Exception {
    	StringList slReturn = new StringList();
    	try {
            Map programMap      = (Map)JPO.unpackArgs(args);
            MapList mlObject  = (MapList) programMap.get("objectList");
    		Iterator objectItr = mlObject.iterator();
    		Map mObject = null;
    		String sType = null;
    		String sObjectId = null;
    		DomainObject dObj = DomainObject.newInstance(context);
			while (objectItr.hasNext()) {
				mObject = (Map) objectItr.next();
				sType = (String)mObject.get(DecConstants.SELECT_TYPE);
				if(DecStringUtil.equals(sType, DecConstants.TYPE_DECCWPTASK)) {
					slReturn.add("CWP");
				}else if(DecStringUtil.equals(sType, DecConstants.TYPE_DECIWPTASK)) {
					slReturn.add("IWP");
				}else if(DecStringUtil.equals(sType, DecConstants.TYPE_PROJECT_SPACE)) {
					slReturn.add("Project");
				}else {
					sObjectId = (String)mObject.get(DecConstants.SELECT_ID);
					dObj.setId(sObjectId);
					slReturn.add(dObj.getAttributeValue(context, DecConstants.ATTRIBUTE_DECWBSTYPE));
				}
			}
    	}catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    	return slReturn;
    }
    
    /**
     * Create new task.
     * @param context - The ENOVIA <code>Context</code> object.
     * @param args - The args hold information about object.
     * @return New object.
     * @throws Exception If operation fails.
     */
    @com.matrixone.apps.framework.ui.CreateProcessCallable
    public Map createNewTask(Context context,String[]args)throws Exception
    {
        long start = System.currentTimeMillis();
        Task task =  new Task();
        Map returnMap=new HashMap();

        try{
            Map programMap = JPO.unpackArgs(args);

            String selectedTaskId           = (String) programMap.get("objectId");
            String parentId                 = (String) programMap.get("parentId");
            String addTask                  = (String)programMap.get("addTask");
            String InsertAboveBelow         = (String)programMap.get("InsertAboveBelow");
            String autonameCheck            = (String) programMap.get("autoNameCheck");
            String taskName                 = (String) programMap.get("Name");
            String taskType                 = (String) programMap.get("TypeActual");
            String selectedPolicy           = (String) programMap.get("Policy");
            String ownerId                  = (String) programMap.get("OwnerOID");
            String description              = (String) programMap.get("Description");
            String assigneeIds              = (String) programMap.get("AssigneeOID");
            String taskRequirement          = (String) programMap.get("TaskRequirement");
            String projectRole              = (String) programMap.get("ProjectRole");
            String calendarId               = (String) programMap.get("CalendarOID");
            if(ProgramCentralUtil.isNullString(calendarId)) {
                calendarId  = (String) programMap.get("Calendar");
            }
            if(DecStringUtil.isEmpty(calendarId)) {
            	calendarId = DecConstants.EMPTY_STRING;
            }
            String taskConstraintDate       = (String) programMap.get("TaskConstraintDate");
            String taskConstraintType       = (String) programMap.get("Task Constraint Type");
            if(DecStringUtil.isEmpty(taskConstraintDate)) {
            	taskConstraintDate = "";
            }
            if(DecStringUtil.isEmpty(taskConstraintType)) {
            	taskConstraintType = "As Soon As Possible";
            }
            String durationKeyword          = (String) programMap.get("DurationKeywords");
            String duration                 = (String) programMap.get("Duration");
            String deliverableId            = (String) programMap.get("DeliverableOID");
            String numberOf                 = (String) programMap.get("NumberOf");
            String needsReview              = (String) programMap.get("NeedsReview");
            String estimatedStartDate       = (String) programMap.get("EstimatedStartDate");
            String estimatedEndDate         = (String) programMap.get("EstimatedEndDate");
            String durationUnit             = ProgramCentralConstants.DEFAULT_DURATION_UNIT;
            Locale locale                   = (Locale)programMap.get("localeObj");
            String deliverablesInheritance  = (String)programMap.get("DeliverablesInheritance");  //FUN103737
            String sWBSType                 = (String) programMap.get("WBS Type");
            String sTaskForecastStartDate   = (String) programMap.get("decTaskForecastStartDate");
            String sTaskForecastEndDate     = (String) programMap.get("decTaskForecastEndDate");
            String sCWPActivityType         = (String) programMap.get("CWPActivityType");
            String sIWPType                 = (String) programMap.get("IWPType");
            String sDiscipline              = (String) programMap.get("Discipline");
            String sSequentialNo            = (String) programMap.get("SequenceNo");
            String sEWPNo 					= (String) programMap.get("EWPNo");
            String sKeyQtyItem            	= (String) programMap.get("KeyQtyType");
            String sUOM 					= (String) programMap.get("UOM");
            String strLanguage = context.getSession().getLanguage();
            
            Map <String,Object> requestMap = new HashMap();
            requestMap.put("localeObj", locale);

            //Create new task
            /*
            int count = Integer.valueOf(numberOf);
            if (count > 1)
                autonameCheck = "true";
			*/
            if(ProgramCentralUtil.isNullString(selectedPolicy)){
                selectedPolicy = DecConstants.POLICY_PROJECT_TASK;
            }

            if(ProgramCentralUtil.isNullString(parentId)){
                parentId = selectedTaskId;
            }
            Map <String,String>basicTaskInfoMap = new HashMap();
            Map <String,String>taskAttributeMap = new HashMap();
            Map <String,String>relatedInfoMap = new HashMap();
            Map <String,String> mAttr = new HashMap();
            if(DecStringUtil.isNotEmpty(sWBSType)) {
            	InsertAboveBelow = "addTaskBelow";
            }
	        if(DecStringUtil.equalsAnyIgnoreCase(sWBSType, "CWP", "IWP")) {
	        	getFE(context, strLanguage, "ProgramCentral.Common.PlanStartDate", estimatedStartDate);
	        	getFE(context, strLanguage, "ProgramCentral.Common.PlanEndDate", estimatedEndDate);
	        	getFE(context, strLanguage, "ProgramCentral.Label.Sequence_No", sSequentialNo);
	            if(DecStringUtil.equalsIgnoreCase(sWBSType, "CWP")) {
		        	getFE(context, strLanguage, "ProgramCentral.Common.CWPActivityType", sCWPActivityType);
		        	getFE(context, strLanguage, "ProgramCentral.Label.Discipline", sDiscipline);
		        //	getFE(context, strLanguage, "ProgramCentral.Label.CWPKeyQtyItem", sKeyQtyItem);
		        //	getFE(context, strLanguage, "ProgramCentral.Label.CWP_Key_Qty_-_UOM", sUOM);
	            	taskType = DecConstants.TYPE_DECCWPTASK;
		            mAttr.put(DecConstants.ATTRIBUTE_DECSEQUENTIALNO, sSequentialNo);
	            	mAttr.put(DecConstants.ATTRIBUTE_DECCWPACTIVITYTYPE, sCWPActivityType);
		            mAttr.put(DecConstants.ATTRIBUTE_DECDISCIPLINE, sDiscipline);
		            mAttr.put(DecConstants.ATTRIBUTE_DECKEYQUANTITYTYPE, sKeyQtyItem);
		            mAttr.put(DecConstants.ATTRIBUTE_DECKEYQUANTITYUOM,  sUOM);
	            }else if(DecStringUtil.equalsIgnoreCase(sWBSType, "IWP")) {
		        	getFE(context, strLanguage, "ProgramCentral.Label.IWP_Type", sIWPType);
	            	taskType = DecConstants.TYPE_DECIWPTASK;
	            	mAttr.put(DecConstants.ATTRIBUTE_DECIWPTYPE, sIWPType);
		            mAttr.put(DecConstants.ATTRIBUTE_DECIWPSEQUENCE, sSequentialNo);
	            }
	            
	            if(DecStringUtil.isNotEmpty(sTaskForecastStartDate)) {
		            mAttr.put(DecConstants.ATTRIBUTE_DECTASKFORECASTSTARTDATE, DecDateUtil.changeDateFormat(sTaskForecastStartDate, new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US)));
	            }
	            if(DecStringUtil.isNotEmpty(sTaskForecastEndDate)) {
		            mAttr.put(DecConstants.ATTRIBUTE_DECTASKFORECASTFINISHDATE, DecDateUtil.changeDateFormat(sTaskForecastEndDate, new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US)));
	            }
            }else {
            	if(DecStringUtil.equals(autonameCheck, "true")) {
            		throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "ProgramCentral","ProgramCentral.Alert.IsNotUseAutoName", strLanguage));
            	}
            	taskType = DecConstants.TYPE_PHASE;
            	estimatedStartDate = DecConstants.EMPTY_STRING;
            	estimatedEndDate = DecConstants.EMPTY_STRING;
            	sTaskForecastStartDate = DecConstants.EMPTY_STRING;
            	sTaskForecastEndDate = DecConstants.EMPTY_STRING;
            }
        	mAttr.put(DecConstants.ATTRIBUTE_DECWBSTYPE, sWBSType);
	        String sTypePattern = DecConstants.TYPE_PHASE + "," + DecConstants.TYPE_TASK + "," + DecConstants.TYPE_DECCWPTASK + "," + DecConstants.TYPE_DECIWPTASK;
            DomainObject doProject = DomainObject.newInstance(context, parentId);
            doProject.open(context);
            MapList mlValidate = doProject.getRelatedObjects(context,
			   		DecConstants.RELATIONSHIP_SUBTASK, //pattern to match relationships
			   		sTypePattern, //pattern to match types
			   		new StringList(DecConstants.SELECT_NAME), //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
			   		null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
			   		false, //get To relationships
			   		true, //get From relationships
			   		(short)0, //the number of levels to expand, 0 equals expand all.
			   		DecConstants.EMPTY_STRING, //where clause to apply to objects, can be empty ""
			   		DecConstants.EMPTY_STRING,
			   		0); //where clause to apply to relationship, can be empty ""
            for(Object o : mlValidate) {
            	Map mValidate = (Map)o;
            	String sName = (String)mValidate.get(DecConstants.SELECT_NAME);
            	String sType = (String)mValidate.get(DecConstants.SELECT_TYPE);
            	 
                if(DecStringUtil.equals(taskName, sName) && DecStringUtil.equals(taskType, sType)) {
                	throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "ProgramCentral","ProgramCentral.Alert.IsValidateTaskname", strLanguage));
                }
            }
            
            Map<String,StringList> derivativeMap =
                    ProgramCentralUtil.getDerivativeTypeListFromUtilCache(context,
                            ProgramCentralConstants.TYPE_GATE,
                            ProgramCentralConstants.TYPE_MILESTONE);

            StringList derivativeGateTypeList       =  derivativeMap.get(ProgramCentralConstants.TYPE_GATE);
            StringList derivativeMilestoneTypeList  =  derivativeMap.get(ProgramCentralConstants.TYPE_MILESTONE);

            if(derivativeGateTypeList.contains(taskType) || derivativeMilestoneTypeList.contains(taskType) ){
                duration = "0";
                durationUnit = "d";
            }else{
            	if(duration == null) {
            		duration = "0";
                    durationUnit = "d";
            	}
                duration=duration.toLowerCase();
                String strI18Days = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.DurationUnits.Days", strLanguage);
                String strI18Hours = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.DurationUnits.Hours", strLanguage);

                strI18Days = strI18Days.toLowerCase();
                strI18Hours = strI18Hours.toLowerCase();
                //input unit of duration entered in the duration column can be "Days" or "Hours" need to replace it by "d" or "h" respectively.
                if(duration.indexOf(strI18Days) != -1){
                    duration = duration.replace(strI18Days, "d");

                }else if(duration.indexOf(strI18Hours) != -1){
                    duration = duration.replace(strI18Hours, "h");

                }
                String[] tempD = new String[2];
                if(duration.lastIndexOf("h") == -1){
                    tempD = duration.split(" d");
                    duration = tempD[0];
                }else{
                    durationUnit="h";
                    tempD = duration.split(" h");
                    duration = tempD[0];
                }
            }

            //Basic info
            basicTaskInfoMap.put("name", taskName);
            basicTaskInfoMap.put("type", taskType);
            basicTaskInfoMap.put("policy", selectedPolicy);
            basicTaskInfoMap.put("description", description);
            basicTaskInfoMap.put("ParentId", parentId);
            basicTaskInfoMap.put("selectedObjectId", selectedTaskId);
            basicTaskInfoMap.put("HowMany", "1");
            basicTaskInfoMap.put("AutoName", autonameCheck);

            // if we are insert via the create Task form and the user chooses the Insert radio button then use it
            if(ProgramCentralUtil.isNullString(InsertAboveBelow)){
                basicTaskInfoMap.put("AddTask", addTask);
            }else{
                basicTaskInfoMap.put("AddTask", InsertAboveBelow);
            }

            //Attribute info
            taskAttributeMap.put("Project Role", projectRole);
            taskAttributeMap.put("TaskConstraintDate", taskConstraintDate);
            taskAttributeMap.put("TaskConstraintType", taskConstraintType);
            taskAttributeMap.put("DurationKeywords",durationKeyword);
            taskAttributeMap.put("Duration", duration);
            taskAttributeMap.put("DurationUnit", durationUnit);
            taskAttributeMap.put("TaskRequirement", "Optional");
            taskAttributeMap.put("NeedsReview", "No");
            taskAttributeMap.put("DeliverablesInheritance", deliverablesInheritance);//FUN103737
            Map<String,String> projectScheduleMap = ProgramCentralUtil.getProjectSchedule(context, selectedTaskId);
            String projectSchedule = projectScheduleMap.get(selectedTaskId);
            if(projectSchedule == null || projectSchedule.isEmpty()){
                projectSchedule = ProgramCentralConstants.PROJECT_SCHEDULE_AUTO;
            }

            //to create a task with start and end date
            if("Manual".equalsIgnoreCase(projectSchedule) ||((UIUtil.isNotNullAndNotEmpty(estimatedStartDate) || UIUtil.isNotNullAndNotEmpty(estimatedEndDate)) &&(taskConstraintType.equals(DomainConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ASAP)||
                    taskConstraintType.equals(DomainConstants.ATTRIBUTE_TASK_CONSTRAINT_TYPE_RANGE_ALAP))) )
            {
                Map attributeMap= new HashMap();
                attributeMap.put("EstimatedStartDate", estimatedStartDate);
                attributeMap.put("EstimatedFinishDate", estimatedEndDate);
                attributeMap.put("CalendarId", calendarId);
                attributeMap.put("ParentId", parentId);
                attributeMap.put("Assignee", assigneeIds);
                attributeMap.put("Duration", duration);
                attributeMap.put("DurationUnit", durationUnit);
                attributeMap.put("selectedObjectId", selectedTaskId);
                attributeMap.put("projectSchedule", projectSchedule);

                Map taskAttributes=(Map)task.getUpdatedAttributesForSelectedDates(context,attributeMap, requestMap);

                estimatedStartDate=(String)taskAttributes.get("EstimatedStartDate");
                estimatedEndDate=(String)taskAttributes.get("EstimatedEndDate");
                duration=(String)taskAttributes.get("Duration");
                durationUnit=(String)taskAttributes.get("DurationUnit");
                taskConstraintType=(String)taskAttributes.get("TaskConstraintType");
                taskConstraintDate=(String)taskAttributes.get("TaskConstraintDate");

                taskAttributeMap.put("EstimatedStartDate", estimatedStartDate);
                taskAttributeMap.put("EstimatedEndDate", estimatedEndDate);
                taskAttributeMap.put("TaskConstraintType", taskConstraintType);
                taskAttributeMap.put("TaskConstraintDate", taskConstraintDate);
                taskAttributeMap.put("Duration", duration);
                taskAttributeMap.put("DurationUnit", durationUnit);
            }
            //Related info
            if(DecStringUtil.isEmpty(ownerId)) {
            	ownerId = DecMatrixUtil.getObjectId(context, DecConstants.TYPE_PERSON, context.getUser());
            }
            relatedInfoMap.put("Owner", ownerId);
            relatedInfoMap.put("Assignee", "");
            relatedInfoMap.put("Calendar", calendarId);
            relatedInfoMap.put("deliverableId", deliverableId);
            relatedInfoMap.put("isExperimentAssignedTasksRelFlag", "false");
            

            ContextUtil.startTransaction(context, true);
            task.createTask(context,
                        basicTaskInfoMap,
                        taskAttributeMap,
                        relatedInfoMap,
                        requestMap);
            task.setAttributeValues(context, mAttr);
			if(DecStringUtil.isNotEmpty(sEWPNo) && DecStringUtil.equalsIgnoreCase(sWBSType, "CWP")) {
				DomainObject doEWP = DomainObject.newInstance(context);
				doEWP.createAndConnect(context, DecConstants.TYPE_DECEWP, sEWPNo, doProject.getName(), DecConstants.POLICY_DECEXIST, DecConstants.VAULT_ESERVICE_PRODUCTION, DecConstants.RELATIONSHIP_DECEWPREL, task, true);
				doEWP.setAttributeValue(context, DecConstants.ATTRIBUTE_DECEWPSTAGE, DecConstants.ATTRIBUTE_DECEWPSTAGE_RANGE_TOBESTARTED);
				doEWP.setAttributeValue(context, DecConstants.ATTRIBUTE_DECEWPSTATUS, DecConstants.ATTRIBUTE_DECEWPSTATUS_RANGE_TOBESTARTED);
			}
			
            returnMap.put("id", task.getObjectId());

            //To refresh UI with multiple created task
            MapList newTasksMapList = task.getNewObjectDetailsForRefresh();
            CacheUtil.setCacheObject(context, "newTasksMapList", newTasksMapList);
            ContextUtil.commitTransaction(context);
        }catch(Exception e){
        	ContextUtil.abortTransaction(context);
            e.printStackTrace();
            throw e;
        }

        DebugUtil.debug("Total time for create Task...................."+(System.currentTimeMillis()-start));

        return  returnMap;
    }
    
    private void getFE(Context context, String strLanguage, String sAttrProp, String sAttrValue) throws FrameworkException {
	    if(DecStringUtil.isEmpty(sAttrValue)) {
	    	throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "Framework","emxFramework.FormComponent.MustEnterAValidValueFor", strLanguage) + " " + EnoviaResourceBundle.getProperty(context, "ProgramCentral", sAttrProp, strLanguage));
	    }
    }
    
    public int insertChangeHistory(Context context, String[] args) throws Exception{
    	Date date = new Date();
    	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
	    	StringList slParam = new StringList();
	    	slParam.add("to[" + DecConstants.RELATIONSHIP_SUBTASK + "].from.to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.id");
	    	slParam.add("to[" + DecConstants.RELATIONSHIP_SUBTASK + "].from.id");
	    	slParam.add(TASK_PROJECT_ID);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF1);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF2);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF3);
	    	String strLanguage = context.getSession().getLanguage();
	    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);
	    	Throwable t = new Throwable();
	    	StackTraceElement[] steArr = t.getStackTrace();
	    	String sClassName = null;
	    	String sMethodName = null;
	    	
	    	if(DecStringUtil.isAllBlank(args[2], args[3])) {
		    	for(StackTraceElement ste : steArr) {
		    		sClassName = ste.getClassName();
		    		sMethodName = ste.getMethodName();
		    		if(DecStringUtil.equals(sClassName, "emxDnD_mxJPO") && DecStringUtil.equalsAny(sMethodName, "importExcelCWPMasterData", "importExcelCWPPlanData", "importExcelIWPExcutionData")) {
		    			return 0;
		    		}
		    	}
	    		String sFromOID = args[0];
	    		String sTOOID = args[1];
	    		DomainObject doPAL = DomainObject.newInstance(context, sFromOID);
		    	DomainObject doCreateObj = DomainObject.newInstance(context, sTOOID);
		    	doCreateObj.open(context);
		    	String sMapperId = null;
		    	if(DecStringUtil.equals(doCreateObj.getTypeName(), DecConstants.TYPE_DECIWPTASK)) {
		    		sMapperId = "insertImportIWPChangeRegister";
		    	}else if(DecStringUtil.equals(doCreateObj.getTypeName(), DecConstants.TYPE_DECCWPTASK)) {
		    		sMapperId = "insertImportCWPChangeRegister";
		    	}else {
		    		return 0;
		    	}
		    	Map<String, String> mInfo = doCreateObj.getInfo(context, slParam);
		    	
		    	String sProjectOID = doPAL.getInfo(context, "from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.id");
		    	DomainObject doProject = DomainObject.newInstance(context, sProjectOID);
		    	
		    	Map mChangeRegister = new HashMap();
				mChangeRegister.put("SITE_CD", doProject.getInfo(context, DecConstants.SELECT_NAME));
				mChangeRegister.put("CHANGE_DATE", sToday);
				mChangeRegister.put("CHANGE_USER", context.getUser());
    			mChangeRegister.put("INPUT_TYPE", "View");
    			mChangeRegister.put("CWP_NO", doCreateObj.getName());
    			mChangeRegister.put("IWP_NO", doCreateObj.getName());
    			mChangeRegister.put("CWP_OID", sTOOID);
    			mChangeRegister.put("IWP_OID", sTOOID);
    			mChangeRegister.put("CHANGE_ACTION", "Create");
        		mChangeRegister.put("CHANGE_ATTRIBUTE", DecConstants.EMPTY_STRING);
        		mChangeRegister.put("BEFORE_VALUE", DecConstants.EMPTY_STRING);
        		mChangeRegister.put("AFTER_VALUE", DecConstants.EMPTY_STRING);
    			sqlSession.insert("Project." + sMapperId, mChangeRegister);
    	    	sqlSession.commit();
    			return 0;
	    	}
	    	String sObjectId = args[0];
	    	String sAttrName = args[1];
	    	String sOldAttrVal = args[2];
	    	String sNewAttrVal = args[3];
	    	if(DecStringUtil.equalsAnyIgnoreCase(sAttrName, "Task Constraint Date", "Critical Task")) {
	    		return 0;
	    	}
	    	DomainObject doObj = DomainObject.newInstance(context, sObjectId);
	    	doObj.open(context);
	    	Map<String, String> mInfo = doObj.getInfo(context, slParam);
	    	String sMapperId = null;
	    	if(DecStringUtil.equals(doObj.getTypeName(), DecConstants.TYPE_DECIWPTASK)) {
	    		sMapperId = "insertImportIWPChangeRegister";
	    		if(DecStringUtil.equals(sAttrName, DecConstants.ATTRIBUTE_DECKEYQUANTITYCOMPLETED)) {
	    			String sCWPOID = mInfo.get("to[" + DecConstants.RELATIONSHIP_SUBTASK + "].from.id");
	    			DomainObject doCWP = DomainObject.newInstance(context, sCWPOID);
	    			int iChangeCompleted = Integer.valueOf(DecStringUtil.nullToZero(sNewAttrVal)) - Integer.valueOf(DecStringUtil.nullToZero(sOldAttrVal));
	    			int iCWPCompleted = Integer.valueOf(DecStringUtil.nullToZero(doCWP.getAttributeValue(context, DecConstants.ATTRIBUTE_DECKEYQUANTITYCOMPLETED)));
	    			doCWP.setAttributeValue(context, DecConstants.ATTRIBUTE_DECKEYQUANTITYCOMPLETED, String.valueOf(iCWPCompleted + iChangeCompleted));
	    		}
	    	}else if(DecStringUtil.equals(doObj.getTypeName(), DecConstants.TYPE_DECCWPTASK)) {
	    		sMapperId = "insertImportCWPChangeRegister";
	    	}else {
	    		return 0;
	    	}
	    	sAttrName = DecStringUtil.trim(sAttrName);
	    	String sAttrType = MqlUtil.mqlCommand(context, "print attribute $1 select type dump ", sAttrName);
	    	sAttrName = sAttrName.replaceAll(" ", "_");
	    	String sChangeAttribute = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Attribute." + sAttrName, strLanguage);
	    	if(DecStringUtil.equalsIgnoreCase(sAttrName, DecConstants.ATTRIBUTE_TASK_ACTUAL_START_DATE)) {
	    		sChangeAttribute = "Actual Start Date";
	    	}else if(DecStringUtil.equalsIgnoreCase(sAttrName, DecConstants.ATTRIBUTE_TASK_ACTUAL_FINISH_DATE)) {
	    		sChangeAttribute = "Actual Finish Date";
	    	}else if(DecStringUtil.equalsIgnoreCase(sAttrName, DecConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE)) {
	    		sChangeAttribute = "Plan Start Date";
	    	}else if(DecStringUtil.equalsIgnoreCase(sAttrName, DecConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE)) {
	    		sChangeAttribute = "Plan Finish Date";
	    	}else if(DecStringUtil.equalsIgnoreCase(sAttrName, DecConstants.ATTRIBUTE_TASK_ESTIMATED_DURATION)) {
	    		sChangeAttribute = "Plan Duration";
	    	}else if(DecStringUtil.equalsIgnoreCase(sAttrName, DecConstants.ATTRIBUTE_TASK_ACTUAL_DURATION)) {
	    		sChangeAttribute = "Actual Duration";
	    	}
	    	
	    	String sProjectOID = mInfo.get(TASK_PROJECT_ID);
	    	if(DecStringUtil.isEmpty(sProjectOID)) {
	    		sProjectOID = mInfo.get("to[" + DecConstants.RELATIONSHIP_SUBTASK + "].from.to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.id");
	    	}
	    	if(DecStringUtil.isEmpty(sProjectOID)) {
	    		return 0;
	    	}
	    	DomainObject doProject = DomainObject.newInstance(context, sProjectOID);
	    	
	    	Map mChangeRegister = new HashMap();
			mChangeRegister.put("SITE_CD", doProject.getInfo(context, DecConstants.SELECT_NAME));
			mChangeRegister.put("CHANGE_DATE", sToday);
			mChangeRegister.put("CHANGE_USER", context.getUser());
			
	    	for(StackTraceElement ste : steArr) {
	    		sClassName = ste.getClassName();
	    		sMethodName = ste.getMethodName();
	    		if(DecStringUtil.equals(sClassName, "emxDnD_mxJPO") && DecStringUtil.equalsAny(sMethodName, "importExcelCWPMasterData", "importExcelCWPPlanData", "importExcelIWPExcutionData")) {
	    			mChangeRegister.put("INPUT_TYPE", "Excel");
	    			break;
	    		}else {
	    			mChangeRegister.put("INPUT_TYPE", "View");
	    		}
	    	}
			mChangeRegister.put("CWP_NO", doObj.getName());
			mChangeRegister.put("IWP_NO", doObj.getName());
			mChangeRegister.put("CWP_OID", sObjectId);
			mChangeRegister.put("IWP_OID", sObjectId);
			
	    	Map mOldAttr = new HashMap();
	    	mOldAttr.put(sAttrName, sOldAttrVal);
	    	
	    	if(DecStringUtil.equalsIgnoreCase(sAttrType, DecConstants.FORMAT_TIMESTAMP)) {
	    		modifyTaskDateAttribute(doObj, mChangeRegister, mOldAttr, sqlSession, context, sAttrName, sNewAttrVal, sChangeAttribute, sMapperId);
	    	}else {
	    		modifyTaskAttribute(doObj, mChangeRegister, mOldAttr, sqlSession, context, sAttrName, sNewAttrVal, sChangeAttribute, sMapperId);
	    	}
	    	sqlSession.commit();
    	} catch (Exception e) {
    		e.printStackTrace();
    		throw e;
		}
    	
    	return 0;
    }
    
    public int InsertCWPChangeHistoryForEWPRel(Context context, String[] args) throws Exception{
    	return InsertCWPChangeHistoryForRel(context, args, DecConstants.RELATIONSHIP_DECEWPREL);
    }
    
    public int InsertCWPChangeHistoryForRel(Context context, String[] args, String sRelName) throws Exception{
    	String sFromOID = args[0];
    	String sToOID = args[1];
    	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
    		DomainObject doFromObj = DomainObject.newInstance(context, sFromOID);
    		DomainObject doToObj = DomainObject.newInstance(context, sToOID);
	    	
    		if(DecStringUtil.equals(DecConstants.TYPE_DECCWPTASK, doFromObj.getTypeName(context))) {
    	    	Date date = new Date();
    	    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);

    	    	StringList slParam = new StringList();
    	    	slParam.add(TASK_PROJECT_ID);
    	    	slParam.add("from[" + sRelName + "].to.name");
    	    	slParam.add(DecConstants.SELECT_NAME);
    	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF1);
    	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF2);
    	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF3);
    	    	Map<String, String> mFromInfo = doFromObj.getInfo(context, slParam);
    	    	
    	    	String sProjectOID = mFromInfo.get(TASK_PROJECT_ID);
    	    	DomainObject doProject = DomainObject.newInstance(context, sProjectOID);
        		
    	    	Map mCWPChangeRegister = new HashMap();
    			mCWPChangeRegister.put("SITE_CD", doProject.getInfo(context, DecConstants.SELECT_NAME));
    			mCWPChangeRegister.put("CHANGE_DATE", sToday);
    			mCWPChangeRegister.put("CHANGE_USER", context.getUser());
    			mCWPChangeRegister.put("INPUT_TYPE", "View");
    	    	Throwable t = new Throwable();
    	    	StackTraceElement[] steArr = t.getStackTrace();
    	    	String sClassName = null;
    	    	String sMethodName = null;
    	    	for(StackTraceElement ste : steArr) {
    	    		sClassName = ste.getClassName();
    	    		sMethodName = ste.getMethodName();
    	    		if(DecStringUtil.equals(sClassName, "emxDnD_mxJPO") && DecStringUtil.equalsAny(sMethodName, "importExcelCWPMasterData", "importExcelCWPPlanData", "importExcelIWPExcutionData")) {
    	    			mCWPChangeRegister.put("INPUT_TYPE", "Excel");
    	    			break;
    	    		}
    	    	}
    			mCWPChangeRegister.put("CWP_NO", doFromObj.getName());
    			mCWPChangeRegister.put("CWP_OID", sFromOID);
        		mCWPChangeRegister.put("CHANGE_ACTION", "Modify");
        		if(DecStringUtil.equals(sRelName, DecConstants.RELATIONSHIP_DECEWPREL)) {
            		mCWPChangeRegister.put("CHANGE_ATTRIBUTE", "EWP");
        		}else{
            		mCWPChangeRegister.put("CHANGE_ATTRIBUTE", "Sub-Con");
        		}
        		mCWPChangeRegister.put("BEFORE_VALUE", mFromInfo.get("from[" + sRelName + "].to.name"));
        		doToObj.open(context);
        		mCWPChangeRegister.put("AFTER_VALUE", doToObj.getName());

    			sqlSession.insert("Project.insertImportCWPChangeRegister", mCWPChangeRegister);
    			sqlSession.commit();
    		}
    	} catch (Exception e) {
    		e.printStackTrace();
    		throw e;
		}
    	return 0;
    }
    
    public int updateTaskAttribute(Context context, String[] args) throws Exception {
    	try {
    		String sFromOID = args[0];
    		String sTOOID = args[1];
    		DomainObject doPAL = DomainObject.newInstance(context, sFromOID);
        	DomainObject doCreateObj = DomainObject.newInstance(context, sTOOID);
        	doCreateObj.open(context);
        	String sType = doCreateObj.getTypeName();
        	if(DecStringUtil.equalsAny(sType, DecConstants.TYPE_PHASE, DecConstants.TYPE_DECCWPTASK, DecConstants.TYPE_DECIWPTASK)) {
            	String sProjectCode = doPAL.getInfo(context, "from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.name");
            	doCreateObj.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTCODE, sProjectCode);
        	}
        	if(DecStringUtil.equals(sType, DecConstants.TYPE_DECCWPTASK)) {
        		doCreateObj.setAttributeValue(context, DecConstants.ATTRIBUTE_DECWBSTYPE, "CWP");
        	}else if(DecStringUtil.equals(sType, DecConstants.TYPE_DECIWPTASK)) {
        		doCreateObj.setAttributeValue(context, DecConstants.ATTRIBUTE_DECWBSTYPE, "IWP");
        	}
    	} catch (Exception e) {
    		e.printStackTrace();
    		throw e;
		}
    	return 0;
    }
    
    public int deleteRelEWP(Context context, String[] args) throws Exception{
    	String sCWPOID = args[0];
    	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
    		DomainObject doCWPTask = DomainObject.newInstance(context, sCWPOID);
    		doCWPTask.open(context);
    		String sEWPOID = doCWPTask.getInfo(context, "from[" + DecConstants.RELATIONSHIP_DECEWPREL + "].to.id");
    		if(DecStringUtil.isNotEmpty(sEWPOID)) {
        		DomainObject doEWP = DomainObject.newInstance(context, sEWPOID);
        		MapList mlRelCWPTaskOID = doEWP.getRelatedObjects(context,
												DecConstants.RELATIONSHIP_DECEWPREL, //pattern to match relationships
												DecConstants.TYPE_DECCWPTASK, //pattern to match types
												new StringList(DecConstants.SELECT_ID), //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
												null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
												true, //get To relationships
												false, //get From relationships
												(short)0, //the number of levels to expand, 0 equals expand all.
												DecConstants.EMPTY_STRING, //where clause to apply to objects, can be empty ""
												DecConstants.EMPTY_STRING,
												0); //where clause to apply to relationship, can be empty ""
        		for(Object o : mlRelCWPTaskOID) {
        			Map mCWPTaskOID = (Map)o;
        			String sCWPTaskOID = (String)mCWPTaskOID.get(DecConstants.SELECT_ID);
        			if(!DecStringUtil.equals(sCWPTaskOID, sCWPOID)) {
        				return 0;
        			}
        		}
        		doEWP.open(context);
    			doEWP.deleteObject(context);
    		}
    		
	    	Date date = new Date();
	    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);

	    	StringList slParam = new StringList();
	    	slParam.add(TASK_PROJECT_ID);
	    	slParam.add("from[" + DecConstants.RELATIONSHIP_DECEWPREL + "].to.name");
	    	slParam.add(DecConstants.SELECT_NAME);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF1);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF2);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF3);
	    	Map<String, String> mCWPInfo = doCWPTask.getInfo(context, slParam);

	    	String sProjectOID = mCWPInfo.get(TASK_PROJECT_ID);
	    	DomainObject doProject = DomainObject.newInstance(context, sProjectOID);

	    	Map mCWPChangeRegister = new HashMap();
			mCWPChangeRegister.put("SITE_CD", doProject.getInfo(context, DecConstants.SELECT_NAME));
			mCWPChangeRegister.put("CHANGE_DATE", sToday);
			mCWPChangeRegister.put("CHANGE_USER", context.getUser());
			mCWPChangeRegister.put("INPUT_TYPE", "View");
	    	Throwable t = new Throwable();
	    	StackTraceElement[] steArr = t.getStackTrace();
	    	String sClassName = null;
	    	String sMethodName = null;
	    	for(StackTraceElement ste : steArr) {
	    		sClassName = ste.getClassName();
	    		sMethodName = ste.getMethodName();
	    		if(DecStringUtil.equals(sClassName, "emxDnD_mxJPO") && DecStringUtil.equalsAny(sMethodName, "importExcelCWPMasterData", "importExcelCWPPlanData", "importExcelIWPExcutionData")) {
	    			mCWPChangeRegister.put("INPUT_TYPE", "Excel");
	    			break;
	    		}
	    	}
			mCWPChangeRegister.put("CWP_NO", doCWPTask.getName());
			mCWPChangeRegister.put("CWP_OID", sCWPOID);
    		mCWPChangeRegister.put("CHANGE_ACTION", "Delete");
    		mCWPChangeRegister.put("CHANGE_ATTRIBUTE", DecConstants.EMPTY_STRING);
    		mCWPChangeRegister.put("BEFORE_VALUE", DecConstants.EMPTY_STRING);
    		mCWPChangeRegister.put("AFTER_VALUE", DecConstants.EMPTY_STRING);
	    	
			sqlSession.insert("Project.insertImportCWPChangeRegister", mCWPChangeRegister);
			sqlSession.commit();
    	} catch (Exception e) {
    		e.printStackTrace();
    		throw e;
		}
    	return 0;
    }

    public int deleteIWPHistoryInsert(Context context, String[] args) throws Exception{
    	String sIWPOID = args[0];
    	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
    		DomainObject doIWPTask = DomainObject.newInstance(context, sIWPOID);
    		doIWPTask.open(context);
    		
	    	Date date = new Date();
	    	String sToday = DecDateUtil.changeDateFormat(date, DecDateUtil.IF_FORMAT);

	    	StringList slParam = new StringList();
	    	slParam.add(TASK_PROJECT_ID);
	    	slParam.add("from[" + DecConstants.RELATIONSHIP_DECEWPREL + "].to.name");
	    	slParam.add(DecConstants.SELECT_NAME);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF1);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF2);
	    	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECUPF3);
	    	Map<String, String> mIWPInfo = doIWPTask.getInfo(context, slParam);

	    	String sProjectOID = mIWPInfo.get(TASK_PROJECT_ID);
	    	DomainObject doProject = DomainObject.newInstance(context, sProjectOID);

	    	Map mIWPChangeRegister = new HashMap();
			mIWPChangeRegister.put("SITE_CD", doProject.getInfo(context, DecConstants.SELECT_NAME));
			mIWPChangeRegister.put("CHANGE_DATE", sToday);
			mIWPChangeRegister.put("CHANGE_USER", context.getUser());
			mIWPChangeRegister.put("INPUT_TYPE", "View");
	    	Throwable t = new Throwable();
	    	StackTraceElement[] steArr = t.getStackTrace();
	    	String sClassName = null;
	    	String sMethodName = null;
	    	for(StackTraceElement ste : steArr) {
	    		sClassName = ste.getClassName();
	    		sMethodName = ste.getMethodName();
	    		if(DecStringUtil.equals(sClassName, "emxDnD_mxJPO") && DecStringUtil.equalsAny(sMethodName, "importExcelCWPMasterData", "importExcelCWPPlanData", "importExcelIWPExcutionData")) {
	    			mIWPChangeRegister.put("INPUT_TYPE", "Excel");
	    			break;
	    		}
	    	}
			mIWPChangeRegister.put("IWP_NO", doIWPTask.getName());
			mIWPChangeRegister.put("IWP_OID", sIWPOID);
    		mIWPChangeRegister.put("CHANGE_ACTION", "Delete");
    		mIWPChangeRegister.put("CHANGE_ATTRIBUTE", DecConstants.EMPTY_STRING);
    		mIWPChangeRegister.put("BEFORE_VALUE", DecConstants.EMPTY_STRING);
    		mIWPChangeRegister.put("AFTER_VALUE", DecConstants.EMPTY_STRING);
	    	
			sqlSession.insert("Project.insertImportIWPChangeRegister", mIWPChangeRegister);
			sqlSession.commit();
    	} catch (Exception e) {
    		e.printStackTrace();
    		throw e;
		}
    	return 0;
    }

    public Map getEWPRange(Context context, String[] args) throws Exception {
    	Map mRange = new HashMap();
    	try {
	    	Map programMap = JPO.unpackArgs(args);
	    	Map paramMap = (Map)programMap.get("paramMap");
	    	String sProjectSpaceOID = (String)paramMap.get("objectId");
	    	String sTypePatterns = DecConstants.TYPE_PHASE + "," + DecConstants.TYPE_DECCWPTASK + "," + DecConstants.TYPE_DECEWP;
	    	String sRelPatterns = DecConstants.RELATIONSHIP_SUBTASK + "," + DecConstants.RELATIONSHIP_DECEWPREL;
	    	StringList slSubTaskParam = new StringList();
    		StringList slfieldRangeValue = new StringList();
    		StringList slfieldDisplayRangeValue = new StringList();
	    	slSubTaskParam.add(DecConstants.SELECT_NAME);
	    	slSubTaskParam.add(DecConstants.SELECT_TYPE);
	    	slSubTaskParam.add(DecConstants.SELECT_ID);
	    	DomainObject doPS = DomainObject.newInstance(context, sProjectSpaceOID);
	    	doPS.open(context);
	    	if(!doPS.getTypeName().equals(DecConstants.TYPE_PROJECT_SPACE)) {
	    		sProjectSpaceOID = doPS.getInfo(context, TASK_PROJECT_ID);
	    		doPS = DomainObject.newInstance(context, sProjectSpaceOID);
	    	}
	    	MapList mlSubTask = doPS.getRelatedObjects(context,
				    			sRelPatterns, //pattern to match relationships
				    			sTypePatterns, //pattern to match types
			    				slSubTaskParam, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
			    				null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
			    				false, //get To relationships
			    				true, //get From relationships
			    				(short)0, //the number of levels to expand, 0 equals expand all.
			    				DecConstants.EMPTY_STRING, //where clause to apply to objects, can be empty ""
			    				DecConstants.EMPTY_STRING, //where clause to apply to relationship, can be empty ""
			    				0);
	    	for(Object oSubTask : mlSubTask) {
	    		Map mSubTask = (Map)oSubTask;
	    		String sType = (String)mSubTask.get(DecConstants.SELECT_TYPE);
	    		if(DecStringUtil.equals(DecConstants.TYPE_DECEWP, sType)) {
	    			slfieldRangeValue.add((String)mSubTask.get(DecConstants.SELECT_ID));
	    			slfieldDisplayRangeValue.add((String)mSubTask.get(DecConstants.SELECT_NAME));
	    		}
	    	}
	    	
	    	mRange.put("field_choices", slfieldRangeValue);
	    	mRange.put("field_display_choices", slfieldDisplayRangeValue);
    	} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    	return mRange;
    }
    

    public void connectEWP(Context context, String[] args) throws Exception{
		
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		HashMap columnMap = (HashMap) programMap.get("columnMap");
		HashMap settings = null;
		if(columnMap == null) {
	        Map fieldMap = (Map)programMap.get("fieldMap");
	        settings = (HashMap)fieldMap.get("settings");
		}else {
			settings = (HashMap) columnMap.get("settings");
		}
		
		String objectId = (String) paramMap.get("objectId");
        String newValue = (String) paramMap.get("New Value");
        try {
            DomainObject doCWP = DomainObject.newInstance(context, objectId);
            DomainObject doEWP = DomainObject.newInstance(context);
            String sOldEWPRID = doCWP.getInfo(context, "from[" + DecConstants.RELATIONSHIP_DECEWPREL + "].id");
            DomainRelationship.disconnect(context, sOldEWPRID);
            if(DecStringUtil.isNotEmpty(newValue)) {
                doEWP.setId(newValue);
                DomainRelationship.connect(context, doCWP, DecConstants.RELATIONSHIP_DECEWPREL, doEWP);
            }
            ContextUtil.startTransaction(context, true);
            
            ContextUtil.commitTransaction(context);
        }catch (Exception e) {
        	ContextUtil.abortTransaction(context);
        	e.printStackTrace();
        	throw e;
		}
	}
    
    public StringList getNameColumnLinkTree(Context context, String[] args) throws Exception{
    	StringList slReturn = new StringList();
        Map programMap      = (Map)JPO.unpackArgs(args);
        MapList objectList  = (MapList) programMap.get("objectList");
        HashMap paramList   = (HashMap) programMap.get("paramList");
        String exportFormat = (String)  paramList.get("exportFormat");
        String dataStatus = (String)paramList.get("dataStatus");
		HashMap columnMap = (HashMap) programMap.get("columnMap");
		HashMap settings = (HashMap) columnMap.get("settings");
        String sAlternateObj = (String)settings.get("Alternate Object");
        boolean isPrinterFriendly = false;
        String strPrinterFriendly = (String)paramList.get("reportFormat");
        if ( strPrinterFriendly != null ) {
            isPrinterFriendly = true;
        }

        int size = objectList.size();
        for (int i = 0; i < size; i++) {
            Map mapObject = (Map) objectList.get(i);
            String sTaskId	 = (String) mapObject.get(DomainObject.SELECT_ID);
            String sTaskName = (String) mapObject.get(DomainObject.SELECT_NAME);
            if(DecStringUtil.isNotEmpty(sAlternateObj)) {
            	sTaskId		 = (String) mapObject.get(sAlternateObj + "." + DomainObject.SELECT_ID);
            	sTaskName	 = (String) mapObject.get(sAlternateObj + "." + DomainObject.SELECT_NAME); 
            }
            if(isPrinterFriendly || "pending".equalsIgnoreCase(dataStatus)){
                if("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat) || "Text".equalsIgnoreCase(exportFormat) || "pending".equalsIgnoreCase(dataStatus)){
                    slReturn.add(sTaskName);
                }else{
                    slReturn.add("<div title=\""+sTaskName+"\">" + sTaskName + "</div>");
                }
            }else {
            	slReturn.add(DecCommonUtil.getColumnTreeLinkURL(context, sTaskName, sTaskId));
            }
        }

        return slReturn;
    }
    
    public static void modifyCWPTaskDateAttribute(DomainObject doObj, Map mCWPChangeRegister, Map<String, String> mOldAttr, SqlSession sqlSession, Context context, String sAttrName, String sNewAttrValue, String sColumnName) throws Exception {
    	modifyTaskDateAttribute(doObj, mCWPChangeRegister, mOldAttr, sqlSession, context, sAttrName, sNewAttrValue, sColumnName, "insertImportCWPChangeRegister");
    }
    public static void modifyCWPTaskAttribute(DomainObject doObj, Map mCWPChangeRegister, Map<String, String> mOldAttr, SqlSession sqlSession, Context context, String sAttrName, String sNewAttrValue, String sColumnName) throws Exception {
    	modifyTaskAttribute(doObj, mCWPChangeRegister, mOldAttr, sqlSession, context, sAttrName, sNewAttrValue, sColumnName, "insertImportCWPChangeRegister");
    }
    public static void modifyIWPTaskDateAttribute(DomainObject doObj, Map mCWPChangeRegister, Map<String, String> mOldAttr, SqlSession sqlSession, Context context, String sAttrName, String sNewAttrValue, String sColumnName) throws Exception {
    	modifyTaskDateAttribute(doObj, mCWPChangeRegister, mOldAttr, sqlSession, context, sAttrName, sNewAttrValue, sColumnName, "insertImportIWPChangeRegister");
    }
    public static void modifyIWPTaskAttribute(DomainObject doObj, Map mCWPChangeRegister, Map<String, String> mOldAttr, SqlSession sqlSession, Context context, String sAttrName, String sNewAttrValue, String sColumnName) throws Exception {
    	modifyTaskAttribute(doObj, mCWPChangeRegister, mOldAttr, sqlSession, context, sAttrName, sNewAttrValue, sColumnName, "insertImportIWPChangeRegister");
    }
    public static void modifyTaskDateAttribute(DomainObject doObj, Map mCWPChangeRegister, Map<String, String> mOldAttr, SqlSession sqlSession, Context context, String sAttrName, String sNewAttrValue, String sColumnName, String sMapperId) throws Exception {
    	String sBeforeValue = mOldAttr.get(sAttrName);
		sBeforeValue = DecDateUtil.changeFullDateFormat(sBeforeValue, new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US));
		sNewAttrValue = DecDateUtil.changeFullDateFormat(sNewAttrValue, new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US));
    	if(!DecStringUtil.equals(sBeforeValue, sNewAttrValue)) {
	        mCWPChangeRegister.put("CHANGE_ACTION", "Modify");
	        mCWPChangeRegister.put("CHANGE_ATTRIBUTE", sColumnName);
	        mCWPChangeRegister.put("BEFORE_VALUE", sBeforeValue);
	        mCWPChangeRegister.put("AFTER_VALUE", sNewAttrValue);
	    	sqlSession.insert("Project." + sMapperId, mCWPChangeRegister);
    	}
    }
    
    public static void modifyTaskAttribute(DomainObject doObj, Map mCWPChangeRegister, Map<String, String> mOldAttr, SqlSession sqlSession, Context context, String sAttrName, String sNewAttrValue, String sColumnName, String sMapperId) throws Exception {
    	String sBeforeValue = mOldAttr.get(sAttrName);
    	if(!DecStringUtil.equals(sBeforeValue, sNewAttrValue)) {
    		if(DecStringUtil.isNotEmpty(sBeforeValue)) {
        		mCWPChangeRegister.put("CHANGE_ACTION", "Modify");
        		mCWPChangeRegister.put("CHANGE_ATTRIBUTE", sColumnName);
        		mCWPChangeRegister.put("BEFORE_VALUE", sBeforeValue);
        		mCWPChangeRegister.put("AFTER_VALUE", sNewAttrValue);
    			sqlSession.insert("Project." + sMapperId, mCWPChangeRegister);
    		}
    	}
    }
    
    public boolean canEditCWPTaskProperties(Context context, String[] args) throws Exception {
    	return decCanEditTaskProperties(context, args, DecConstants.TYPE_DECCWPTASK);
    }
    
    public boolean canEditIWPTaskProperties(Context context, String[] args) throws Exception {
    	return decCanEditTaskProperties(context, args, DecConstants.TYPE_DECIWPTASK);
    }
    
    public boolean canEditPhaseProperties(Context context, String[] args) throws Exception {
    	return decCanEditTaskProperties(context, args, DecConstants.TYPE_PHASE);
    }
    
    public boolean decCanEditTaskProperties(Context context, String[] args, String sIsType) throws Exception {
    	boolean bCanEdit = canEditTaskProperties(context, args);
        Map programMap = (Map) JPO.unpackArgs(args);
        String objectId = (String) programMap.get("objectId");
        DomainObject domObj = DomainObject.newInstance(context, objectId);
        String sType = domObj.getInfo(context, DecConstants.SELECT_TYPE);
        if(sIsType.equals(sType) && bCanEdit) {
        	bCanEdit = true;
        }else {
        	bCanEdit = false;
        }
        if(bCanEdit) {
        	objectId = domObj.getInfo(context, "to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.id");
        	Map mAccessMap = new HashMap();
        	mAccessMap.putAll(programMap);
        	mAccessMap.put("objectId", objectId);
        	String[] args2 = JPO.packArgs(mAccessMap);
        	decAccess_mxJPO accessJPO = new decAccess_mxJPO();
        	bCanEdit = accessJPO.hasAccess(context, args2);
        }
        return bCanEdit;
    }
    
    /**
     * Where : In the Structure Browser, All the Actions links at WBSView
     *
     * How : Get the objectId from argument map, show the link based on following conditions
     *      1. selectedTable should not contain "BaseLine" string
     *
     * Settings Required :
     *      AccessProgram /Function
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the "objectId"
     *        1 - String containing "selectedTable"
     * @returns boolean
     * @throws Exception if operation fails
     * @since PMC V6R2008-1
     */

    public boolean hasAccessForWBSView(Context context, String args[]) throws Exception {

        HashMap inputMap = (HashMap)JPO.unpackArgs(args);
        String strTable = (String)inputMap.get("selectedTable");
        String strProgram = (String)inputMap.get("selectedProgram");
        String objectId = (String)inputMap.get("objectId");
        String parentOID = (String)inputMap.get("parentOID");
        String isRMB = (String)inputMap.get("isRMB");
        String RMBID = (String)inputMap.get("RMBID");

        StringList busSelects = new StringList();
        busSelects.add(ProgramCentralConstants.SELECT_PROJECT_TYPE);
        busSelects.add(ProgramCentralConstants.SELECT_PROJECT_ID);
        busSelects.add(DomainConstants.SELECT_HAS_MODIFY_ACCESS);
        busSelects.add(ProgramCentralConstants.SELECT_CURRENT);    //Added for Template usecase
        busSelects.add(ProgramCentralConstants.SELECT_PROJECT_STATE);//Added for Template usecase

        DomainObject domObj = DomainObject.newInstance(context, objectId);
        Map infoMap = domObj.getInfo(context, busSelects);

        String objType = (String) infoMap.get(DomainConstants.SELECT_TYPE);
        String rootObjType = (String) infoMap.get(ProgramCentralConstants.SELECT_PROJECT_TYPE);
        String rootObjId = (String) infoMap.get(ProgramCentralConstants.SELECT_PROJECT_ID);
        String rootObjState = (String) infoMap.get(ProgramCentralConstants.SELECT_CURRENT);
        String ptState = (String) infoMap.get(ProgramCentralConstants.SELECT_PROJECT_STATE);

        if(DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(objType) || DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(rootObjType)) {    //From task popup in Template side.
            ProjectTemplate projectTemplate = (ProjectTemplate)DomainObject.newInstance(context, DomainConstants.TYPE_PROJECT_TEMPLATE, DomainObject.PROGRAM);
            String projectTemplateId = objectId;

            if(DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(rootObjType)){
                projectTemplateId = rootObjId;
            }
            boolean isCtxUserOwnerOrCoOwner = false;
            if("Draft".equalsIgnoreCase(rootObjState) || "In Approval".equalsIgnoreCase(rootObjState) || "Draft".equalsIgnoreCase(ptState) || "In Approval".equalsIgnoreCase(ptState)){
                 isCtxUserOwnerOrCoOwner =  projectTemplate.isOwnerOrCoOwner(context, projectTemplateId);
           }
            return (isCtxUserOwnerOrCoOwner) ? true : false;
        }

        if(ProgramCentralUtil.isNotNullString(RMBID)) {
            StringList selectable = new StringList();
            selectable.add(ProgramCentralConstants.SELECT_HAS_PASSIVE_TASK);
            selectable.add("to[Passive Subtask].from."+ProgramCentralConstants.SELECT_PROJECT_ID);
            selectable.add("to[Passive Subtask]");

            DomainObject domainObject = DomainObject.newInstance(context, RMBID);
            Map objectInfo = domainObject.getInfo(context, selectable);
            boolean hasPassiveProject = "True".equalsIgnoreCase((String) objectInfo.get(ProgramCentralConstants.SELECT_HAS_PASSIVE_TASK));
            boolean connectAsPassiveProject = "True".equalsIgnoreCase((String) objectInfo.get("to[Passive Subtask]"));

             String rootProjectId = (String) objectInfo.get("to[Passive Subtask].from."+ProgramCentralConstants.SELECT_PROJECT_ID);
             if(hasPassiveProject) {
                return false;
             } else if(connectAsPassiveProject && objectId.equalsIgnoreCase(rootProjectId)) {
                 return false;
             }
        }

        // Start User access for the Links
        boolean blAccess = false;

        //To hide Remove Project command from RMB on ProjectSpace root node
        if(parentOID!=null && RMBID!=null &&
                parentOID.equals(RMBID) && "True".equalsIgnoreCase(isRMB) &&
                ProgramCentralConstants.TYPE_PROJECT_SPACE.equalsIgnoreCase(objType)){
            return blAccess;
        }

        //${CLASS:emxProjectMember} emxProjectMember = new ${CLASS:emxProjectMember}(context, args);
        //boolean projectAccess = emxProjectMember.hasAccess(context, args);//Checks Modify_Access
        String hasModifyAcc = (String) infoMap.get(DomainConstants.SELECT_HAS_MODIFY_ACCESS);

        // Baseline is Part of Command Name PMCWBSBaselineView
        //selectedProgram=emxTask:getWBSAllSubtasks
        //selectedProgram=emxTask:getWBSDeletedtasks

        if(strTable!=null && strTable.indexOf("BaseLine")>0 ||
                (strProgram!=null && strProgram.indexOf("MemberTasks")>0) ||
                (strProgram!=null && strProgram.indexOf("Deleted")>0)){
            blAccess = false;
        }else if(Boolean.valueOf(hasModifyAcc)){
            blAccess = true;
        }
        
        if(blAccess) {
        	decAccess_mxJPO accessJPO = new decAccess_mxJPO();
        	blAccess = accessJPO.hasAccess(context, args);
        }
        
        return blAccess;
    }
    public StringList getEstimatedDurations(Context context, String[] args) throws Exception {
    	return getDurations(context, args, DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_DURATION);
    }
    public StringList getActualDurations(Context context, String[] args) throws Exception {
    	return getDurations(context, args, DecConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_DURATION);
    }
    
    public StringList getDurations(Context context, String[] args, String sSelAttr) throws Exception {
    	StringList slReturn = new StringList();
    	String strI18DurationUnit = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.DurationUnits.Days", context.getSession().getLanguage());
    	try {
	    	Map programMap = JPO.unpackArgs(args);
	    	Map columnMap = (Map)programMap.get("columnMap");
	    	Map settings = (Map)columnMap.get("settings");
	    	Map mObject = null;
	    	
	    	MapList mlObject = (MapList)programMap.get("objectList");
	    	String[] sTaskIds = new String[mlObject.size()];
	    	for(int i=0; i<mlObject.size(); i++) {
	    		mObject = (Map)mlObject.get(i);
	    		String sOID = (String)mObject.get(DecConstants.SELECT_ID);
	    		sTaskIds[i] = sOID;
	    	}
	    	
	    	BusinessObjectWithSelectList objectWithSelectList = ProgramCentralUtil.getObjectWithSelectList(context, sTaskIds, new StringList(sSelAttr));
	    	for(BusinessObjectWithSelect bow : objectWithSelectList) {
	    		String sDuration = bow.getSelectData(sSelAttr);
	    		slReturn.add(DecStringUtil.removeDecimal(sDuration) + " " + strI18DurationUnit);
	    	}
    	} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    	return slReturn;
    }
    
    public void updateTaskDateInForm(Context context, String[] args) throws FrameworkException{
    	try {
    		HashMap programMap = (HashMap)JPO.unpackArgs(args);
    		HashMap paramMap   = (HashMap)programMap.get("paramMap");
    		HashMap fieldMap   = (HashMap)programMap.get("fieldMap");
    		HashMap settingMap = (HashMap)fieldMap.get("settings");
    		
    		String sObjId = (String)paramMap.get("objectId");
    		String sAdminType = (String)settingMap.get("Admin Type");
    		String sOldValue = (String)paramMap.get("Old Value");
    		String sNewValue = (String)paramMap.get("New Value");
    		String sModAttr = PropertyUtil.getSchemaProperty(context, sAdminType);
    		String sModAnotherAttr = null;

    		DomainObject doObj = DomainObject.newInstance(context, sObjId);
    		
    		BigDecimal bdEstDuration = new BigDecimal(doObj.getAttributeValue(context, DecConstants.ATTRIBUTE_TASK_ESTIMATED_DURATION));
    		BigDecimal bdActDuration = new BigDecimal(doObj.getAttributeValue(context, DecConstants.ATTRIBUTE_TASK_ACTUAL_DURATION));
    		long lEstDuration = bdEstDuration.longValue();
    		long lActDuration = bdActDuration.longValue();
    		LocalDate ldOld = DecDateUtil.autoChangeLocalDate(sOldValue);
    		LocalDate ldNew = DecDateUtil.autoChangeLocalDate(sNewValue);
    		LocalDateTime ldtOld = ldOld.atStartOfDay();
    		LocalDateTime ldtNew = ldNew.atStartOfDay();
    		
    		ContextUtil.startTransaction(context, true);
    		if(!ldOld.isEqual(ldNew) || DecStringUtil.isEmpty(sOldValue)) {
    			
                WorkCalendar workcalendar = WorkCalendar.getDefaultCalendar();
                
    			long lBetween = Duration.between(ldtOld, ldtNew).toDays();
        		LocalDate ldAnotherDate = ldNew;
        		if(DecConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE.equals(sModAttr)) {
        			sModAnotherAttr = DecConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE;
        			for(int i=0; i<lEstDuration; i++) {
        				ldAnotherDate = ldAnotherDate.plusDays(1);
        				
        				Set holidayListSet = workcalendar.getHolidays(context,DecDateUtil.autoChangeDate(ldAnotherDate.toString()),DecDateUtil.autoChangeDate(ldAnotherDate.plusDays(1).toString()));
        				
        				while(!holidayListSet.isEmpty()) {
        					ldAnotherDate = ldAnotherDate.plusDays(1);
        					holidayListSet = workcalendar.getHolidays(context,DecDateUtil.autoChangeDate(ldAnotherDate.toString()),DecDateUtil.autoChangeDate(ldAnotherDate.plusDays(1).toString()));
        				}
        			}
        		}else if(DecConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE.equals(sModAttr)) {
        			sModAnotherAttr = DecConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE;
        			for(int i=0; i<lEstDuration; i++) {
        				ldAnotherDate = ldAnotherDate.minusDays(1);
        				
        				Set holidayListSet = workcalendar.getHolidays(context,DecDateUtil.autoChangeDate(ldAnotherDate.toString()),DecDateUtil.autoChangeDate(ldAnotherDate.plusDays(1).toString()));
        				
        				while(!holidayListSet.isEmpty()) {
        					ldAnotherDate = ldAnotherDate.minusDays(1);
        					holidayListSet = workcalendar.getHolidays(context,DecDateUtil.autoChangeDate(ldAnotherDate.toString()),DecDateUtil.autoChangeDate(ldAnotherDate.plusDays(1).toString()));
        				}
        			}
        		}else if(DecConstants.ATTRIBUTE_TASK_ACTUAL_START_DATE.equals(sModAttr)) {
        			sModAnotherAttr = DecConstants.ATTRIBUTE_TASK_ACTUAL_FINISH_DATE;
        			for(int i=0; i<lActDuration; i++) {
        				ldAnotherDate = ldAnotherDate.plusDays(1);
        				
        				Set holidayListSet = workcalendar.getHolidays(context,DecDateUtil.autoChangeDate(ldAnotherDate.toString()),DecDateUtil.autoChangeDate(ldAnotherDate.plusDays(1).toString()));
        				
        				while(!holidayListSet.isEmpty()) {
        					ldAnotherDate = ldAnotherDate.plusDays(1);
        					holidayListSet = workcalendar.getHolidays(context,DecDateUtil.autoChangeDate(ldAnotherDate.toString()),DecDateUtil.autoChangeDate(ldAnotherDate.plusDays(1).toString()));
        				}
        			}
        			if(!DecStringUtil.isEmpty(sOldValue)) {
        				doObj.setState(context, DecConstants.STATE_PROJECT_TASK_ACTIVE);
        				String sEstStartDate = doObj.getAttributeValue(context, DecConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE);
        				LocalDate ldEstStartDate = DecDateUtil.autoChangeLocalDate(sEstStartDate);
	    				if(ldEstStartDate.isAfter(ldNew)) {
	        				doObj.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_PLANSTART);
	    				}else {
	        				doObj.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_LATESTART);
	    				}
        			}
            	}else if(DecConstants.ATTRIBUTE_TASK_ACTUAL_FINISH_DATE.equals(sModAttr)) {
        			sModAnotherAttr = DecConstants.ATTRIBUTE_TASK_ACTUAL_START_DATE;
        			for(int i=0; i<lActDuration; i++) {
        				ldAnotherDate = ldAnotherDate.minusDays(1);
        				
        				Set holidayListSet = workcalendar.getHolidays(context,DecDateUtil.autoChangeDate(ldAnotherDate.toString()),DecDateUtil.autoChangeDate(ldAnotherDate.plusDays(1).toString()));
        				
        				while(!holidayListSet.isEmpty()) {
        					ldAnotherDate = ldAnotherDate.minusDays(1);
        					holidayListSet = workcalendar.getHolidays(context,DecDateUtil.autoChangeDate(ldAnotherDate.toString()),DecDateUtil.autoChangeDate(ldAnotherDate.plusDays(1).toString()));
        				}
        			}
    				String sEstStartDate = doObj.getAttributeValue(context, DecConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE);
    				LocalDate ldEstStartDate = DecDateUtil.autoChangeLocalDate(sEstStartDate);
    				if(ldEstStartDate.isAfter(ldAnotherDate)) {
        				doObj.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_PLANSTART);
    				}else {
        				doObj.setAttributeValue(context, DecConstants.ATTRIBUTE_DECSTAGE, DecConstants.ATTRIBUTE_DECSTAGE_RANGE_LATESTART);
    				}
            	}
        		
        		doObj.setAttributeValue(context, sModAttr, DecDateUtil.changeLocalDateTimeFormat(ldNew.atStartOfDay(), eMatrixDateFormat.getEMatrixDateFormat()));
        		doObj.setAttributeValue(context, sModAnotherAttr, DecDateUtil.changeLocalDateTimeFormat(ldAnotherDate.atStartOfDay(), eMatrixDateFormat.getEMatrixDateFormat()));
    		}
    		ContextUtil.commitTransaction(context);
    	} catch (FrameworkException e) {
    		ContextUtil.abortTransaction(context);
    		throw new FrameworkException("Update Date is Failed.");
		} catch (Exception e) {
    		ContextUtil.abortTransaction(context);
    		e.printStackTrace();
    		throw new FrameworkException("Update Date is Failed.");
		}
    }
}
