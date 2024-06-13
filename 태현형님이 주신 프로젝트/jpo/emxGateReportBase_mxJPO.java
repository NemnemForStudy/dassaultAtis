/* emxGateReportBase.java

   Copyright (c) 1999-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.36.2.1 Thu Dec  4 07:55:16 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.36 Tue Oct 28 18:55:12 2008 przemek Experimental przemek $
   @since Program Central R210
   @author NR2
*/

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.util.Collections;
import java.util.Vector;

import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Dataobject;
import com.dassault_systemes.enovia.tskv2.ProjectSequence;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.program.GateReport;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.Task;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;


/**
 * The <code>emxGateReportBase</code> class represents the JPO to create Phase-Gate Dashboard Report
 *
 *
 * @version AEF 9.5.1.1 - Copyright (c) 2002, MatrixOne, Inc.
 * @since Program Central R210
 * @author NR2
 */
public class emxGateReportBase_mxJPO extends emxDomainObjectBase_mxJPO
{
    String APPROVE ;
    String CONDITIONALLYAPPROVE ;
    String HOLD ;
    String CANCEL ;
    String REACTIVATE ;

	public static final String STATE_HOLD = ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD;
	public static final String STATE_CANCEL = ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_CANCEL;
	public static final String TYPE_GATE = ProgramCentralConstants.TYPE_GATE;
	public static final String TYPE_PHASE = ProgramCentralConstants.TYPE_PHASE;
	public static final String STATUS = "status";
	public static final String LAST_DECISION = "lastDecision";
	public static final String  ISARROWHERE= "isArrowHere";
	public static final String GATE_HOLD = "hold";
	public static final String GATE_CANCELED = "canceled";
	public static final String GATE_CONDITIONAL = "conditional";
	public static final String GATE_APPROVED = "approved";
	public static final String TASK_COMPLETE = "completed";
	public static final String TASK_LATE = "late";
	public static final String TASK_DELAYED = "delayed";
	public static final String TASK_INACTIVE = "inactive";


    /**
     * Constructs a new emxGateReport JPO object.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the id
     * @throws Exception if the operation fails
     * @since Program Central R210
     * @author NR2
     */
    public emxGateReportBase_mxJPO (Context context, String[] args)
        throws Exception
    {
        // Call the super constructor
        super(context,args);
        if (args != null && args.length > 0){
            setId(args[0]);
        }
        APPROVE = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Approve", "en");
        CONDITIONALLYAPPROVE = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.ConditionallyApprove", "en");
        HOLD = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Hold", "en");
        CANCEL = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Cancel", "en");
        REACTIVATE = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Resume", "en");
    }
    /**
     * This method returns the name of the last decison connected with the gate identified by gateId.
     * will return empty string if no decision connected to the gate is found.
     * Note: This is an performance overhead doing database fetch in JSP, will move the code in JPO.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the Gate id
     * @throws MatrixException if the operation fails
     * @since Program Central R210
     * @author NR2
     */
    public String getLastDecision(Context context,String[] args) throws MatrixException{
        String decisionName = "";
        try{
            boolean matches = true;

            Map programMap = (HashMap) JPO.unpackArgs(args);
            String gateId = (String) programMap.get("gateId");

			if(ProgramCentralUtil.isNullString(gateId)){
                throw new Exception();
            }

			String APPROVE = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Approve", "en");
			String CONDITIONALLYAPPROVE = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Common.Gate.ConditionallyApprove", "en");
			String HOLD = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Hold", "en");
			String CANCEL = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Common.Gate.Cancel", "en");
			String RESUME = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Common.Gate.Resume", "en");

            DomainObject gateObj = DomainObject.newInstance(context);
            gateObj.setId(gateId);
            StringList objectSelects = new StringList();
            objectSelects.add(SELECT_NAME);
            objectSelects.add(DomainConstants.SELECT_REVISION);

            String where = SELECT_NAME + "==" + APPROVE + "||";
            where += SELECT_NAME + "==" + CONDITIONALLYAPPROVE + "||";
            where += SELECT_NAME + "==" + HOLD + "||";
            where += SELECT_NAME + "==" + CANCEL + "||";
            where += SELECT_NAME + "==" + RESUME;

            MapList relatedDecisions = gateObj.getRelatedObjects(context,
                                                    DomainConstants.RELATIONSHIP_DECISION, //Relationship type
                                                    DomainConstants.TYPE_DECISION,         //objects type
                                                    objectSelects,                         //objectSelectable
                                                    null,                                  //relationship Selectables
                                                    true,                                  //from
                                                    false,                                 //to
                                                    (short) 0,                             //level
                                                    where,                                 //where filter
                                                    null,
                                                    (short) 0);                             //limit


            //Added Newly
            String pattern = "^\\d+$";
            MapList mlListToRemove = new MapList();
            if (relatedDecisions != null){
                for(int i=0;i<relatedDecisions.size();i++){
                    Map tempMap = (Hashtable) relatedDecisions.get(i);
                    String revision = (String) tempMap.get(SELECT_REVISION);
                    matches = revision.matches(pattern);
                    if(revision.length() <= 12 || !matches){
                        mlListToRemove.add(tempMap);
                    }
                }
                relatedDecisions.removeAll(mlListToRemove);
            }
            else{
                return decisionName;
            }

            //From the remaining sort
            if(relatedDecisions.size() > 0){
                relatedDecisions.sort(DomainConstants.SELECT_REVISION,"descending","String");

                //Remove all maps except 1st one
                Map lastRevisionMap = (Hashtable) relatedDecisions.get(0);
                relatedDecisions.clear();

                decisionName = (String) lastRevisionMap.get(DomainConstants.SELECT_NAME);
            }
        }
        catch(Exception e){
            throw new MatrixException(e);
        }
        return decisionName;
    }

    /**
	 * Will return milestones connected at level two for the phase whose id is being passed
     * Called From : renderPhaseHTML
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the Phase Id
     * @throws MatrixException if the operation fails
     * @since Program Central R210
     * @author NR2
     */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getMilestones(Context context,String[] args) throws MatrixException{
        MapList mlMilestones = new MapList();
        try{
            Map programMap = (HashMap) JPO.unpackArgs(args);
            String phaseId = (String) programMap.get("phaseId");

			if(ProgramCentralUtil.isNullString(phaseId)){
				phaseId = (String) programMap.get("objectId");
			}

			if(ProgramCentralUtil.isNullString(phaseId)){

                throw new Exception();
            }

            /* Start Processing Here*/
            String attrDependencyTaskWBS =  "to["+DomainConstants.RELATIONSHIP_SUBTASK+"].attribute["+DomainConstants.ATTRIBUTE_TASK_WBS+"]";
            String attrDependencySequence =  "to["+DomainConstants.RELATIONSHIP_SUBTASK+"].attribute["+DomainConstants.ATTRIBUTE_SEQUENCE_ORDER+"]";
            String estStartDate = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE + "]";
            String estFinishDate = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE + "]";
            String actStartDate = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ACTUAL_START_DATE + "]";
            String actFinishDate = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ACTUAL_FINISH_DATE + "]";
            String parentName = "to[" + DomainConstants.RELATIONSHIP_SUBTASK + "].from.name";

            StringList objectSelects = new StringList();
            objectSelects.add(SELECT_ID);
            objectSelects.add(SELECT_TYPE);
            objectSelects.add(SELECT_NAME);
            objectSelects.add(SELECT_CURRENT);
            objectSelects.add(attrDependencyTaskWBS);
            objectSelects.add(attrDependencySequence);
            objectSelects.add(estStartDate);
            objectSelects.add(estFinishDate);
            objectSelects.add(actStartDate);
            objectSelects.add(actFinishDate);
            objectSelects.add(parentName);

            //String whereClause = SELECT_POLICY  + " == '" + ProgramCentralConstants.POLICY_PROJECT_REVIEW + "'";
            String whereClause = "";
            com.matrixone.apps.program.Task phase = (com.matrixone.apps.program.Task) DomainObject.newInstance(context,
                DomainConstants.TYPE_TASK, "PROGRAM");
            phase.setId(phaseId);
            objectSelects.add(phase.SELECT_PERCENT_COMPLETE);
            objectSelects.add(phase.SELECT_BASELINE_CURRENT_END_DATE);

            mlMilestones = phase.getRelatedObjects(context,
                                                                DomainConstants.RELATIONSHIP_SUBTASK,
                                                                ProgramCentralConstants.TYPE_MILESTONE,
                                                                objectSelects,
                                                                null,
                                                                false,
                                                                true,
                                                                (short) 1,
                                                                "",
                                                                whereClause,
                                                                (short) 0);
            mlMilestones.sort(attrDependencySequence, "ascending", "integer");
        }
        catch(Exception e){
            throw new MatrixException(e);
        }
        return mlMilestones;
    }

    /**
     * Will return MapList containg Phase and Gates at level 1 and 2 connected to 
	 * the project.
     * Called From : renderPhaseHTML
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the Project id
     * @throws MatrixException if the operation fails
     * @since Program Central R210
     * @author NR2
     */
	  public MapList getStageGateMap(Context context,String[] args) throws MatrixException{
          MapList returnVal = new MapList();
          try{
              MapList relatedFirstAndSecondLevelGatesAndPhases = new MapList();
              MapList tempMap = new MapList();

              HashMap programMap = new HashMap();

              programMap = (HashMap)JPO.unpackArgs(args);
              String projectId = (String)programMap.get("projectID");
			  String invokeFrom   = (String)programMap.get("invokeFrom"); //Added for OTD

              //Added NEWLY
              String selectedOption = (String)programMap.get("selectedOption");
              //END

              //We expect objectList's size to be 1 i.e containt only one Map of Project object
              com.matrixone.apps.program.ProjectSpace project =
                                                                (com.matrixone.apps.program.ProjectSpace)
                                                                 DomainObject.newInstance(context,
                                                                                          DomainConstants.TYPE_PROJECT_SPACE,
                                                                                          DomainConstants.PROGRAM);

              if(null == projectId || "".equals(projectId)){
                  throw new Exception();
              }

              project.setId(projectId);

            //Get PAL objects
      		String mqlCmd = "print bus $1 select $2 $3 dump";
      		String rootNodePALPhysicalId = MqlUtil.mqlCommand(context, 
      				true,
      				true,
      				mqlCmd, 
      				true,
      				projectId,
      				ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT,
      				ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK);

      		if(rootNodePALPhysicalId == null) {
      			throw new Exception("Cotext object does not have PAL connection!");
      		}

      		ProjectSequence ps = new ProjectSequence(context,rootNodePALPhysicalId);
      		Map<String, Dataobject> palSeqData = ps.getSequenceData(context);

              //Get all level 1 gates
              //selectables are id,type,name, est. start date, est. end date, state
              String attrTaskWBSId =  "to["+DomainConstants.RELATIONSHIP_SUBTASK+"].attribute["+DomainConstants.ATTRIBUTE_TASK_WBS+"]";
             // String attrWBSSequence =  "to["+DomainConstants.RELATIONSHIP_SUBTASK+"].attribute["+DomainConstants.ATTRIBUTE_SEQUENCE_ORDER+"]";
              String estStartDate = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ESTIMATED_START_DATE + "]";
              String estFinishDate = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE + "]";
              String actStartDate = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ACTUAL_START_DATE + "]";
              String actFinishDate = "attribute[" + DomainConstants.ATTRIBUTE_TASK_ACTUAL_FINISH_DATE + "]";
              String parentName = "to[" + DomainConstants.RELATIONSHIP_SUBTASK + "].from.name";
              String parentType = "to[" + DomainConstants.RELATIONSHIP_SUBTASK + "].from.type";
              StringList objectSelects = new StringList();
              objectSelects.addElement(SELECT_ID);
              objectSelects.addElement(SELECT_TYPE);
              objectSelects.addElement(ProgramCentralConstants.SELECT_IS_GATE);
              objectSelects.addElement(ProgramCentralConstants.SELECT_IS_PHASE);
              objectSelects.addElement(SELECT_NAME);
              objectSelects.addElement(SELECT_CURRENT);
            //  objectSelects.addElement(attrTaskWBSId);
             // objectSelects.addElement(attrWBSSequence);
              objectSelects.addElement(estStartDate);
              objectSelects.addElement(estFinishDate);
              objectSelects.addElement(actStartDate);
              objectSelects.addElement(actFinishDate);
              objectSelects.addElement(parentName);
              objectSelects.addElement(parentType);
              objectSelects.addElement(SELECT_POLICY);
              objectSelects.addElement(project.SELECT_PERCENT_COMPLETE);
              objectSelects.addElement(project.SELECT_BASELINE_CURRENT_END_DATE);

              objectSelects.addElement(ProgramCentralConstants.SELECT_PHYSICALID);


              String typePattern = ProgramCentralConstants.TYPE_GATE + "," + ProgramCentralConstants.TYPE_PHASE;

              relatedFirstAndSecondLevelGatesAndPhases = project.getRelatedObjects(context,
                                        DomainConstants.RELATIONSHIP_SUBTASK,
                                        typePattern,
                                        objectSelects,
                                        null,
                                        false,
                                        true,
                                        (short) 2,
                                        "",
                                        "",
                                        (short) 0);

              //Remove second level phases
              int numberOfGates = 0;
              int numberOfPhases = 0;

              MapList mapToRemove = new MapList();
              for(int i=0;i<relatedFirstAndSecondLevelGatesAndPhases.size();i++){
                  Map tMap = (Hashtable)relatedFirstAndSecondLevelGatesAndPhases.get(i);
                  String level = null;
                  
                  String phisicalId = (String) tMap.get(ProgramCentralConstants.SELECT_PHYSICALID);
                  Dataobject taskObj = palSeqData.get(phisicalId);
      			if(taskObj != null) {
      				level =  (String)taskObj.getDataelements().get(ProgramCentralConstants.KEY_WBS_ID);
      				tMap.put(attrTaskWBSId, level);
    			}
                  String type = (String) tMap.get(ProgramCentralConstants.SELECT_IS_PHASE);
                  String parent = (String) tMap.get(parentType);

                  // Remove any phases at level 2
                  // Only top-level phases should be supported
                  // Gates at level one or two should be supported
                  if("TRUE".equalsIgnoreCase(type)){
                      if(level != null && level.indexOf(".") != -1){
                          mapToRemove.add(tMap);
                      }
                  }
              }
              //end

              relatedFirstAndSecondLevelGatesAndPhases.removeAll(mapToRemove);

              tempMap.addAll(relatedFirstAndSecondLevelGatesAndPhases);
              if("option2".equals(selectedOption)){ //Sort By WBS ID
                  if("TestCase".equalsIgnoreCase(invokeFrom)) {
				  HashMap argsMap = new HashMap();
            	  argsMap.put("name", "to[Subtask].attribute[Task WBS]");
            	  argsMap.put("dir", "ascending");
            	  argsMap.put("type", "other");
                  argsMap.put("comparatorName", "emxWBSColumnComparator");
                  argsMap.put("list", tempMap);
                  String[] methodargs = JPO.packArgs(argsMap);
                  String compName  = (String)JPO.invoke(context,
                                                        "emxWBSColumnComparator",
                                                        methodargs,
                                                        "getClassName",
                                                        null,
                                                        String.class);
                 
                  Class cls = Class.forName(compName);
                  emxCommonBaseComparator_mxJPO cmp = (emxCommonBaseComparator_mxJPO)cls.newInstance();
                  cmp.setSortKeys(argsMap);
                  Collections.sort(tempMap, cmp);
				  }else{
                  tempMap.sortStructure(context, attrTaskWBSId, "ascending", "emxWBSColumnComparator");
              }
              }
              else{ //Sort Bt TimeLine
                  tempMap.sortStructure(context, attrTaskWBSId, "ascending", "emxWBSIDComparator");
              }

              returnVal = tempMap;
          }
          catch(Exception e){
              throw new MatrixException(e);
          }


		int numberOfGates = 0;
		int numberOfPhases = 0;
		MapList mlGate = new MapList();
		MapList finalGatePhaseList = new MapList();
		MapList mlMilestones = new MapList();

		for(int i=0;i<returnVal.size();i++){
			Map tempMap = (Hashtable) returnVal.get(i);
			String type = (String) tempMap.get(SELECT_TYPE);
			String isGate = (String) tempMap.get(ProgramCentralConstants.SELECT_IS_GATE);
			String isPhase = (String) tempMap.get(ProgramCentralConstants.SELECT_IS_PHASE);
			if("TRUE".equalsIgnoreCase(isGate)){
				numberOfGates++;
			}   // TODO!  Add Stage here, in addition to phase
			else if("TRUE".equalsIgnoreCase(isPhase)){
				String id = (String) tempMap.get(SELECT_ID);

				// Get the milestones for this phase, and store them in the final MapList
				//
				mlMilestones = getMilestones(context, id);

				// Update status of milestones (i.e. Late, Complete, etc.)
				//
				for(int j=0; j < mlMilestones.size(); j++){
					Map rowMap = (Hashtable) mlMilestones.get(j);
					String status = getTaskStatus(context, rowMap);
					rowMap.put(STATUS, status);
				}
				tempMap.put("milestones", mlMilestones);
				numberOfPhases++;
			}
		}

		// initialized the finalGatePhaseList
		finalGatePhaseList = returnVal;

		// Change the finalGatePhaseList structure by calling method modifyFinalMapList
		// Two new parameters gateColor and lastDecision will be added to the gate Maps.
		modifyFinalMapList(context,finalGatePhaseList,mlMilestones,numberOfGates,numberOfPhases);




		return finalGatePhaseList;
	}

	private MapList getMilestones(Context context,String id) throws MatrixException{
		MapList mlMilestones = new MapList();
		try{
			GateReport grBean = new GateReport();
			mlMilestones = grBean.getMilestones(context,id);
		}
		catch(Exception e){
			throw new MatrixException(e);
		}
		return mlMilestones;
	}


	private String getTaskStatus(Context context, Map objectMap) throws MatrixException
	{
		String status = EMPTY_STRING;

		com.matrixone.apps.program.Task task = (com.matrixone.apps.program.Task) DomainObject.newInstance(context,
				DomainConstants.TYPE_TASK, "PROGRAM");

		try
		{
			java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(),
					Locale.US);
			int yellowRedThreshold = Integer.parseInt(EnoviaResourceBundle.getProperty(context, "eServiceApplicationProgramCentral.SlipThresholdYellowRed"));
			Date tempDate = new Date();

			Date sysDate = new Date(tempDate.getYear(), tempDate.getMonth(),tempDate.getDate());
			Date estFinishDate = sdf.parse((String) objectMap.get(task.SELECT_TASK_ESTIMATED_FINISH_DATE));

			String strActualFinishDate = (String) objectMap.get(task.SELECT_TASK_ACTUAL_FINISH_DATE);

			Date actualFinishDate = null; 
			if(ProgramCentralUtil.isNotNullString(strActualFinishDate)){
				actualFinishDate = sdf.parse(strActualFinishDate);
			}

			String state = (String)objectMap.get(task.SELECT_CURRENT);
			String percentComplete = (String) objectMap.get(task.SELECT_PERCENT_COMPLETE);

			long  daysRemaining = (long) task.computeDuration(sysDate,estFinishDate);

			if ((ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE).equals(state) ||"100".equals(percentComplete))
			{
				if(actualFinishDate.compareTo(estFinishDate)<=0){

					status = TASK_COMPLETE;
				} else{
					status = TASK_LATE;
				}
			}
			else if (!(ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE).equals(state) && sysDate.after(estFinishDate))
			{
				status = TASK_LATE;
			}
			else if (!(ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE).equals(state) && daysRemaining <= yellowRedThreshold)
			{
				status = TASK_DELAYED;
			}
			else
			{
				status = TASK_INACTIVE;
			}


		}
		catch(Exception e){
			e.printStackTrace();
			throw new MatrixException(e);
		}
		finally {
			return status;
		}
	}

	private void modifyFinalMapList(Context context,MapList finalMapList,MapList finalMilestoneMapList, int numberOfGates,int numberOfPhases) throws MatrixException{
		try{
			GateReport gateReport = new GateReport();

			for(int i=0;i<finalMapList.size();i++){
				Map rowMap = (Map) finalMapList.get(i);
				String type = (String) rowMap.get(SELECT_TYPE);
				String id = (String) rowMap.get(SELECT_ID);

				String decisionName = "";
				Map tempMap = new HashMap();
				tempMap.putAll(rowMap);

				if(ProgramCentralConstants.TYPE_GATE.equals(type)){
					decisionName = gateReport.getLastDecision(context,id);
					tempMap.put(LAST_DECISION,decisionName);
					tempMap.put(STATUS, getGateStatus(context,decisionName));
					finalMapList.remove(rowMap);
					finalMapList.add(i,tempMap);
				}
				else {
					tempMap.put(STATUS, getTaskStatus(context, rowMap));
					finalMapList.remove(rowMap);
					finalMapList.add(i, tempMap);
				}
			}
			// modifyFinalMapForArrow(context,finalMapList);
			// FINAL_GATE_PHASE_MAPLIST = finalMapList;
		}
		catch(Exception e){
			throw new MatrixException(e);
		}
		return;
      }

	private String getGateStatus(Context context, String decisionName) throws MatrixException, Exception {
		String gateStatus = EMPTY_STRING;

		try{
			String APPROVE = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Approve", "en");
			String CONDITIONALLYAPPROVE = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.ConditionallyApprove", "en");
			String HOLD = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Hold", "en");
			String CANCEL = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Cancel", "en");
			String REACTIVATE = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Reactivate", "en");
			// Gate status is dependent on last decision made for that Gate
			//
			if((APPROVE).equals(decisionName) || (REACTIVATE).equals(decisionName)){
				gateStatus = GATE_APPROVED;
			}
			else if((CONDITIONALLYAPPROVE).equals(decisionName)){
				gateStatus = GATE_CONDITIONAL;
			}
			else if((HOLD).equals(decisionName)){
				gateStatus = GATE_HOLD;
			}
			else if ((CANCEL).equals(decisionName)){
				gateStatus = GATE_CANCELED;
			}
			else{
				gateStatus = ""; //Even if no Decision is connected to this gate.
			}
		}
		catch(Exception e){
			throw new MatrixException(e);
		}
		return gateStatus;
	}

	public MapList getPhaseGateViewDynamicColumns(Context context, String[] args) throws MatrixException
	{
		try {
			Map mapProgram = (Map) JPO.unpackArgs(args);
			Map requestMap = (Map)mapProgram.get("requestMap");
			String objectId = (String)requestMap.get("objectId") == null?(String)requestMap.get("parentOID"):(String)requestMap.get("objectId");
			String selectedOption = (String)requestMap.get("selectedOption");
			 String invokeFrom   = (String)requestMap.get("invokeFrom"); //Added for OTD
			selectedOption = selectedOption==null?"option2":selectedOption;

			Map<String,String> tempMap = new HashMap<>();
			tempMap.put("projectID",objectId);
			tempMap.put("invokeFrom",invokeFrom);
			tempMap.put("selectedOption",selectedOption);
			String[] JPOArgs = JPO.packArgs(tempMap);
			MapList ml = (MapList)JPO.invoke(context,"emxGateReport",null,"getStageGateMap",JPOArgs,MapList.class);

			Map mapColumn = new HashMap();
			MapList mlColumns = new MapList();


			mapColumn.put("name", "labels");
			mapColumn.put("label", "emxProgramCentral.PhaseGateView.PhaseGate");

			Map<String,String> mapSettings = new HashMap<>();
			mapSettings.put("Registered Suite","ProgramCentral");
			mapSettings.put("program","emxGateReport");
			mapSettings.put("function","getPhaseGateViewFreezePaneColumn");
			mapSettings.put("Column Type","programHTMLOutput");
			mapSettings.put("Sortable","false");
			mapSettings.put("Dynamic URL", "disable"); 

			mapColumn.put("settings", mapSettings);
			mlColumns.add(mapColumn);

			int size = ml.size();

			if(size==0){
				//Add separator column after freezepane if there isn't any dynamic column
				mapColumn = new HashMap();
				mapColumn.put("name", "separator");
				mapSettings = new HashMap();
				mapSettings.put("Column Type","separator");
				mapSettings.put("Dynamic URL", "disable");
				mapColumn.put("settings", mapSettings);
				mlColumns.add(mapColumn);
			}
			
			for (int i=0; i<size; i++) {
				Map objectMap = (Map) ml.get(i);

				String isPhase = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_PHASE);
				String isGate = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_GATE);
				String state = (String)objectMap.get(SELECT_CURRENT);
				boolean isCurrentPhase = "True".equalsIgnoreCase(isPhase) && (ProgramCentralConstants.STATE_PROJECT_TASK_ACTIVE.equalsIgnoreCase(state) || ProgramCentralConstants.STATE_PROJECT_TASK_REVIEW.equalsIgnoreCase(state));
				mapColumn = new HashMap();
								
				if(isCurrentPhase){
					mapColumn.put("label", "<div style=\"background-image: linear-gradient(to bottom, #fff 0%,#f5f6f7 100%) !important;\"><img src=\"../programcentral/images/Phase.png\" style=\"opacity:1\" border=\"0\"/></div>");
				}else if("True".equalsIgnoreCase(isPhase)){
					mapColumn.put("label", "<img src=\"../programcentral/images/Phase.png\" style=\"opacity:0.5\" border=\"0\"/>");
				}else if("True".equalsIgnoreCase(isGate)){
					mapColumn.put("label", "<img src=\"../programcentral/images/Gate.png\" style=\"opacity:0.5\" border=\"0\"/>");
				}else{
					mapColumn.put("label", EMPTY_STRING);
				}

				mapSettings = new HashMap();
				mapSettings.put("Registered Suite","ProgramCentral");
				mapSettings.put("program","emxGateReport");
				mapSettings.put("function","getPhaseGateViewColumn");
				mapSettings.put("Column Type","programHTMLOutput");
				mapSettings.put("Width","155");
				mapSettings.put("Dynamic URL", "disable");
				mapSettings.put("Style Program","emxGateReport");
				mapSettings.put("Style Function","getPhaseGateViewColumnStyle");
				mapSettings.put("Sortable","false");
				
				if(isCurrentPhase){
					mapSettings.put("Style Function","getCurrentPhaseColumnStyle");
				}

				mapColumn.put("settings", mapSettings);
				mapColumn.putAll(objectMap);
				mlColumns.add(mapColumn);

				//Add separator column after every dynamic column
				mapColumn = new HashMap();
				mapColumn.put("name", "separator"+i);
				mapSettings = new HashMap();
				mapSettings.put("Column Type","separator");
				mapSettings.put("Dynamic URL", "disable");
				mapColumn.put("settings", mapSettings);
				mlColumns.add(mapColumn);

			}

			return mlColumns;
		} catch (Exception e) {
			e.printStackTrace();
			throw new MatrixException(e);
		}
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public Vector getPhaseGateViewFreezePaneColumn (Context context, String[] args) throws MatrixException
	{
		try {
			Vector columnList = new Vector();
			HashMap hm = (HashMap)JPO.unpackArgs(args);

			Map paramList = (Map)hm.get("paramList");
			String strLang = (String)paramList.get("languageStr");

			String type = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Type", strLang);
			String name = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Name", strLang);
			String progressBar = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.ScheduleColumnHeader.ProgressBar", strLang);
			String status = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Status", strLang);

			String estimatedStartDate = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.EstimatedStartDate", strLang);
			String estimatedFinishDate = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.EstimatedFinishDate", strLang);
			String actualStartDate = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.ActualStartDate", strLang);
			String actualFinishDate = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.ActualFinishDate", strLang);

			columnList.add("<b>"+type+"</b>");
			columnList.add("<b>"+name+"</b>");
			columnList.add("<b>"+progressBar+"</b>");
			columnList.add("<b>"+status+"</b>");
			columnList.add("<b>"+estimatedStartDate+"</b>");
			columnList.add("<b>"+estimatedFinishDate+"</b>");
			columnList.add("<b>"+actualStartDate+"</b>");
			columnList.add("<b>"+actualFinishDate+"</b>");
			columnList.add("");
			

			return columnList;

		} catch (Exception e) {
			e.printStackTrace();
			throw new MatrixException(e);
		}
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public Vector getPhaseGateViewColumn (Context context, String[] args) throws MatrixException
	{
		try {
			HashMap hm = (HashMap)JPO.unpackArgs(args);
			Map columnMap = (Map)hm.get("columnMap");
			Map paramList = (Map)hm.get("paramList");
			String languageStr = (String)paramList.get("languageStr");

			String strTaskEstStartDate = (String)columnMap.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
			String strTaskEstFinishDate = (String)columnMap.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE);
			String strTaskActualStartDate = (String)columnMap.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_START_DATE);
			String strTaskActualFinishDate = (String)columnMap.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TASK_ACTUAL_FINISH_DATE);
			String objectType = (String)columnMap.get(ProgramCentralConstants.SELECT_TYPE);
			String i18ObjectType = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.Type."+objectType, languageStr);
			String objectId = (String)columnMap.get(ProgramCentralConstants.SELECT_ID);
			String objectName = (String)columnMap.get(ProgramCentralConstants.SELECT_NAME);
			String status = (String)columnMap.get("status");
			String strCurrent = (String)columnMap.get(Task.SELECT_CURRENT);
			String strPercentComplete = (String)columnMap.get(Task.SELECT_PERCENT_COMPLETE);
			String isKindOfPhase = (String)columnMap.get(ProgramCentralConstants.SELECT_IS_PHASE);  

			String strBaselineCurrentEndDate = (String)columnMap.get(Task.SELECT_BASELINE_CURRENT_END_DATE);

			boolean isPhaseColumn = "True".equalsIgnoreCase(isKindOfPhase);

			Vector columnList = new Vector();
			
			String strName = (String) XSSUtil.encodeForXML(context,objectName);

			String strStrong = "font-weight: bold";
			String nameHTML = "<a href=\'../common/emxTree.jsp?objectId="+XSSUtil.encodeForURL(context,objectId)+"\' title=\'"+strName+"\' target=\'_blank\' style=\'"+strStrong+"\'>"+strName+"</a>";
			columnList.add("<b>"+i18ObjectType+"</b>");
			columnList.add(nameHTML);

			//progress row start
			int iThresholdValue = Integer.parseInt(EnoviaResourceBundle.getProperty(context,
					"eServiceApplicationProgramCentral.SlipThresholdYellowRed"));

			Double dPercent = 0.0;
			if(ProgramCentralUtil.isNotNullString(strPercentComplete))
				dPercent = Task.parseToDouble(strPercentComplete);
			String sColor = "";                

			if (ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equals(strCurrent) || "100.0".equals(strPercentComplete) ){
				sColor = "Green";
			} else {
				Calendar cNow = Calendar.getInstance(TimeZone.getDefault());

				String strTaskFinishDate = (ProgramCentralUtil.isNotNullString(strBaselineCurrentEndDate)) ? strBaselineCurrentEndDate : strTaskEstFinishDate;
				if(ProgramCentralUtil.isNotNullString(strPercentComplete)){
					String dateTimeFormat =EnoviaResourceBundle.getProperty(context, "eServiceSuites.eMatrixDateFormat");
					if(ProgramCentralUtil.isNullString(dateTimeFormat))
					{
						dateTimeFormat = "MM/dd/yyyy hh:mm:ss aaa";
					}
					SimpleDateFormat sdf = new SimpleDateFormat(dateTimeFormat,Locale.US);
					Date date = sdf.parse(strTaskFinishDate);

					Calendar cTaskFinishDate = Calendar.getInstance();
					cTaskFinishDate.setTime(date);

					if (cTaskFinishDate.before(cNow)) {
						sColor = "Red";
					} else {
						cNow.add(GregorianCalendar.DAY_OF_YEAR, +iThresholdValue);
						if (cTaskFinishDate.before(cNow)) { 
							sColor = "Yellow"; 
						}else { 
							sColor = "Green"; 
						}
					}
				}
			}

			String barImage = ("Red".equalsIgnoreCase(sColor)) ? "WBSProgressBar" : "progressBar";

			if (dPercent < 9.5) {
				strPercentComplete = "<img src='../common/images/progressBar000.gif'/>"; 
			} else if (dPercent < 15.0) {
				strPercentComplete = "<img src='../common/images/"+ barImage + "010" + sColor + ".gif'/>"; 
			} else if (dPercent < 25.0) { 
				strPercentComplete = "<img src='../common/images/"+ barImage + "020" + sColor + ".gif'/>"; 
			} else if (dPercent < 35.0) { 
				strPercentComplete = "<img src='../common/images/"+ barImage + "030" + sColor + ".gif'/>"; 
			} else if (dPercent < 45.0) { 
				strPercentComplete = "<img src='../common/images/"+ barImage + "040" + sColor + ".gif'/>"; 
			} else if (dPercent < 55.0) { 
				strPercentComplete = "<img src='../common/images/"+ barImage + "050" + sColor + ".gif'/>"; 
			} else if (dPercent < 65.0) { 
				strPercentComplete = "<img src='../common/images/"+ barImage + "060" + sColor + ".gif'/>"; 
			} else if (dPercent < 75.0) { 
				strPercentComplete = "<img src='../common/images/"+ barImage + "070" + sColor + ".gif'/>"; 
			} else if (dPercent < 85.0) { 
				strPercentComplete = "<img src='../common/images/"+ barImage + "080" + sColor + ".gif'/>";
			} else if (dPercent < 95.0) { 
				strPercentComplete = "<img src='../common/images/"+ barImage + "090" + sColor + ".gif'/>"; 
			} else { 
				strPercentComplete = "<img src='../common/images/progressBar100" + sColor + ".gif'/>"; 
			}

			columnList.add(strPercentComplete);
			//progress row end


			//status row start
			if(isPhaseColumn){
				if (TASK_LATE.equals(status)){
					status = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Late", languageStr);
				}
				else if (TASK_DELAYED.equals(status)){
					status = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Legend.BehindSchedule", languageStr);
				}
				else if (TASK_COMPLETE.equals(status)){
					status = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.OnTime", languageStr);
				}
				else{
					status = EMPTY_STRING; 
				}
			}else {

				// Gate status is dependent on last decision made for that Gate
				//
				if(GATE_APPROVED.equals(status)){
					status = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Approve", languageStr);
				}
				else if(GATE_CONDITIONAL.equals(status)){
					status = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.ConditionallyApprove", languageStr);
				}
				else if(GATE_HOLD.equals(status)){
					status = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Hold", languageStr);
				}
				else if (GATE_CANCELED.equals(status)){
					status = CANCEL = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Gate.Cancel", languageStr);
				}
				else{
					status = ""; //Even if no Decision is connected to this gate.
				}
			}
			columnList.add(status);
			//status row end

			//date formatting start

			Locale locale = (Locale)paramList.get("localeObj");
			TimeZone tz = TimeZone.getTimeZone(context.getSession().getTimezone());
			double dbMilisecondsOffset = (double)(-1)*tz.getRawOffset();
			double clientTZOffset = (new Double(dbMilisecondsOffset/(1000*60*60))).doubleValue();

			//date formatting end


			columnList.add(eMatrixDateFormat.getFormattedDisplayDate(strTaskEstStartDate, clientTZOffset, locale));
			columnList.add(eMatrixDateFormat.getFormattedDisplayDate(strTaskEstFinishDate, clientTZOffset, locale));
			columnList.add(eMatrixDateFormat.getFormattedDisplayDate(strTaskActualStartDate, clientTZOffset, locale));
			columnList.add(eMatrixDateFormat.getFormattedDisplayDate(strTaskActualFinishDate, clientTZOffset, locale));

			columnList.add(getDeliveryChecklistHTML(context,objectId,languageStr,isPhaseColumn));

			return columnList;

		} catch (Exception e) {
			e.printStackTrace();
			throw new MatrixException(e);
		}
	}


	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList expandPhaseGateView(Context context, String[] args) throws Exception
	{
		MapList mapList = new MapList();

		for(int i=0;i<9;i++){
			Map objectInfo = new HashMap();
			objectInfo.put("test", Integer.toString(i));
			mapList.add(objectInfo);
		}

		return mapList;
	}

	private String getDeliveryChecklistHTML(Context context, String id, String strLang,boolean isPhaseColumn) throws MatrixException, Exception {
		String returnString = EMPTY_STRING;
		try{

			StringBuffer sbHTML = new StringBuffer();
			String closeTitle = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Close", strLang);
	
			if(isPhaseColumn){
				String strMilestone = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Milestones", strLang);

				String mileStoneURL = "../common/emxIndentedTable.jsp?table=PMCPhaseGateViewMilestones&program=emxGateReport:getMilestones&sortColumnName=Name&suiteKey=ProgramCentral&hideLaunchButton=true&customize=false&displayView=details&autoFilter=false&showPageURLIcon=false&rowGrouping=false&Export=false&triggerValidation=false&massPromoteDemote=false&multiColumnSort=false&header=emxProgramCentral.header.Milestones&objectId="+id;

				mileStoneURL = mileStoneURL.replace("&", "&amp;");
				mileStoneURL = "\""+mileStoneURL+"\"";
				
				sbHTML.append("<a href = 'javascript:loadDialog("+mileStoneURL+", \""+XSSUtil.encodeForJavaScript(context,strMilestone)+"\", \""+closeTitle+"\");'>");				
				sbHTML.append("<img src=\"../common/images/iconSmallMilestone.png\" title=\""+strMilestone+"\"/></a>");
			}
			else {
				com.matrixone.apps.program.Task task = (com.matrixone.apps.program.Task) DomainObject.newInstance(context,
						DomainConstants.TYPE_TASK, "PROGRAM");
				task.setId(id);

				String taskPolicy = task.getInfo(context, SELECT_POLICY);

				String toolTipMeeting = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Dashboards.Meeting", strLang);
				String toolTipDecision = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Dashboards.Decision", strLang);
				String toolTipDeliverable = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Dashboards.Deliverables", strLang);
				String toolTipChecklist = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Dashboards.Checklist", strLang);

				String meetingTitle = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Meetings", strLang);
				String decisionTitle = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Decisions", strLang);
				String deliverableTitle = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Dashboards.Deliverables", strLang);
				String checklistTitle = EnoviaResourceBundle.getProperty(context, "ProgramCentral", "emxProgramCentral.Common.Checklist.DisplayChecklistSummaryTable", strLang);

				boolean returnValue = true;
				Map methodMap = new HashMap(1);
				methodMap.put("objectId",id);
				methodMap.put("languageStr",strLang);
				String[] methodArgs = JPO.packArgs(methodMap);
				Boolean returnVal  = (Boolean) JPO.invoke(context,
						"emxChecklist", 
						null,
						"checkCreateObjectAccessFunctionProjectLead", 
						methodArgs,
						Boolean.class);
				String strReturnValue = returnVal.toString();

				String deliverableURL = "../common/emxTable.jsp?program=emxTask:getAllDeliverables&table=APPDocumentSummary&sortColumnName=Name&sortDirection=ascending&header=emxProgramCentral.Common.Deliverable&HelpMarker=emxhelpcontentsummary&suiteKey=ProgramCentral&parentRelName=relationship_TaskDeliverable&customize=false&displayView=details&autoFilter=false&showPageURLIcon=false&rowGrouping=false&Export=false&triggerValidation=false&massPromoteDemote=false&multiColumnSort=false&objectId=";

				String checkListURL = "../common/emxIndentedTable.jsp?table=PMCChecklistSummaryTable&nameColumnHyperlink=false&selection=multiple&sortColumnName=Name,Type&suiteKey=ProgramCentral&relationship=relationship_Checklist,relationship_ChecklistItem&type=type_Checklist,type_ChecklistItem&direction=From&expandLevelFilter=true&editRootNode=false&header=emxProgramCentral.Common.Checklist.ChecklistSummary&customize=false&displayView=details&autoFilter=false&showPageURLIcon=false&rowGrouping=false&Export=false&triggerValidation=false&massPromoteDemote=false&multiColumnSort=false&findMxLink=false&objectCompare=false&showClipboard=false&objectId="+id;
				if(null != strReturnValue && strReturnValue.equalsIgnoreCase("true")){
					checkListURL += "&editLink=true";
				}

				String meetingURL = "../common/emxIndentedTable.jsp?program=emxMeeting:getMeetings&table=PMCPhaseGateViewMeetings&sortColumnName=Name&GlobalContext=false&direction=from&objectCompare=false&SuiteDirectory=components&header=emxComponents.Heading.Meetings&suiteKey=Components&StringResourceFileId=emxComponentsStringResource&expandProgram=emxMeeting:getTableMeetingData&customize=false&displayView=details&autoFilter=false&showPageURLIcon=false&rowGrouping=false&Export=false&triggerValidation=false&massPromoteDemote=false&multiColumnSort=false&objectId="+id;
				String decisionURL = "../common/emxIndentedTable.jsp?program=emxDecision:getRelatedDecisions&table=PMCPhaseGateViewDecisionsList&header=emxComponents.Header.Decisions&sortColumnName=Name&sortDirection=ascending&customize=false&displayView=details&autoFilter=false&showPageURLIcon=false&rowGrouping=false&Export=false&triggerValidation=false&massPromoteDemote=false&multiColumnSort=false&HelpMarker=emxhelpdecisions&objectId=";


				meetingURL = meetingURL.replace("&", "&amp;");
				meetingURL = "\""+meetingURL+"\"";
				
				sbHTML.append("<a style=\"padding-right:10px;\" href = 'javascript:loadDialog("+meetingURL+", \""+XSSUtil.encodeForJavaScript(context,meetingTitle)+"\", \""+closeTitle+"\");'>");
				sbHTML.append("<img src=\"../common/images/iconSmallMeeting.png\" title=\""+toolTipMeeting+"\"/></a>");


				// Decision
				//
				decisionURL = decisionURL + id;
				decisionURL = decisionURL.replace("&", "&amp;");
				decisionURL = "\""+decisionURL+"\"";

				sbHTML.append("<a style=\"padding-right:10px;\" href = 'javascript:loadDialog("+decisionURL+", \""+XSSUtil.encodeForJavaScript(context,decisionTitle)+"\", \""+closeTitle+"\");'>");				
				sbHTML.append("<img src=\"../programcentral/images/Decision.png\" title=\""+toolTipDecision+"\"/></a>");


				// Deliverable
				//
				deliverableURL = deliverableURL + id;
				deliverableURL = deliverableURL.replace("&", "&amp;");
				deliverableURL = "\""+deliverableURL+"\"";

				/*sbHTML.append("<td style=\"padding-right:10px;\">");
				sbHTML.append("<a href = 'javascript:loadDialog("+deliverableURL+", \""+deliverableTitle+"\");'>");
				sbHTML.append("<img src=\"../programcentral/images/Deliverable.png\" title=\""+toolTipDeliverable+"\"/></a>");
				sbHTML.append("</td>");*/

				sbHTML.append("<a style=\"padding-right:10px;\" href = 'javascript:showModalDialog(");
				sbHTML.append(deliverableURL);
				sbHTML.append(", \"875\", \"550\", \"false\", \"popup\")'>");
				sbHTML.append("<img src=\"../programcentral/images/Deliverable.png\" title=\""+toolTipDeliverable+"\"/></a>");


				// Checklist
				//
				if(ProgramCentralConstants.POLICY_PROJECT_REVIEW.equalsIgnoreCase(taskPolicy)){
					checkListURL = checkListURL.replace("&", "&amp;");
					checkListURL = "\""+checkListURL+"\"";

					sbHTML.append("<a style=\"padding-right:10px;\" href = 'javascript:loadDialog("+checkListURL+", \""+XSSUtil.encodeForJavaScript(context,checklistTitle)+"\", \""+closeTitle+"\");'>");				
					sbHTML.append("<img src=\"../programcentral/images/CheckList.png\" title=\""+toolTipChecklist+"\"/></a>");

				}


			}

			returnString = sbHTML.toString();
		}
		catch(Exception e){
			throw new MatrixException(e);
		}
		return returnString;
	}

	public StringList getPhaseGateViewColumnStyle(Context context, String[] args)  throws Exception 
	{
		try 
		{
			StringList slStyles = new StringList();
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			MapList objectList = (MapList) programMap.get("objectList");

			int size = objectList.size();

			for(int i=0; i<size; i++){
				slStyles.addElement("phase-gate-column");
			}
			return slStyles;
		} catch (Exception exp) {
			exp.printStackTrace();
			throw exp;
		}
	}

	public StringList getCurrentPhaseColumnStyle(Context context, String[] args)  throws Exception 
	{
		try 
		{
			StringList slStyles = new StringList();
			HashMap programMap = (HashMap) JPO.unpackArgs(args);
			MapList objectList = (MapList) programMap.get("objectList");

			int size = objectList.size();

			for(int i=0; i<size; i++){
				slStyles.addElement("current-phase-column");
			}
			return slStyles;
		} catch (Exception exp) {
			exp.printStackTrace();
			throw exp;
		}
	}

	/**
	 * Returns the Name for Meeting/Agenda Item/Decision/person object in PMCPhaseGateViewMeetings
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public StringList getColumnMeetingNameData(Context context, String[] args)  throws Exception 
	{

		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList = (MapList) programMap.get("objectList");
		String strColumnName = EMPTY_STRING;
		int objectListSize = objectList.size();
		StringList returnNameList = new StringList(objectListSize);
		for (int i=0;i<objectListSize;i++) {
			Map objectMap = (Map) objectList.get(i);
			strColumnName = (String) objectMap.get(SELECT_NAME);
			returnNameList.add(strColumnName);
		}
		return returnNameList;

	}

}
