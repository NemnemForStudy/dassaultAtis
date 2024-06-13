/* emxQuestionBase.java
 *
 * Copyright (c) 2002-2020 Dassault Systemes.
 * All Rights Reserved
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 * static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.9.2.1 Thu Dec  4 07:55:03 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.9 Wed Oct 22 15:49:11 2008 przemek Experimental przemek $
 */

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;

import matrix.db.AccessConstants;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.MQLCommand;
import matrix.db.RelationshipType;
import matrix.util.MatrixException;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.ProjectTemplate;
import com.matrixone.apps.program.Question;
import com.matrixone.apps.program.QuestionRelationship;
import com.matrixone.apps.program.Task;
import com.matrixone.apps.domain.util.FrameworkUtil;

/**
 * The <code>emxQuestionBase</code> class represents the Question JPO
 * functionality for the AEF type.
 * 
 * @version AEF 9.5.1.1 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxQuestionBase_mxJPO extends com.matrixone.apps.program.Question {
    
    /** The parent/holder object of this question. */
    protected DomainObject _parentObject = null;

    /** The project access list id relative to project. */
    static protected final String SELECT_PARENT_ID = "to["
            + RELATIONSHIP_PROJECT_QUESTION + "].from.id";

    /**
     * Constructs a new emxQuestion JPO object.
     * 
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments: 0 - String containing the
     *            id
     * @throws Exception
     *             if the operation fails
     * @since AEF 9.5.1.1
     */
    public emxQuestionBase_mxJPO(Context context, String[] args)
            throws Exception {
        // Call the super constructor
        super();
        if (args != null && args.length > 0) {
            setId(args[0]);
        }
    }

    /**
     * Get the parent/holder object.
     * 
     * @param context
     *            the eMatrix <code>Context</code> object
     * @return DomainObject parent/holder object
     * @throws Exception
     *             if the operation fails
     * @since AEF 9.5.1.2
     */
    protected DomainObject getParentObject(Context context) throws Exception {
        if (_parentObject == null) {
            // System.out.println("Retrieving project security ID..." +
            // (new Date().getTime()));
            String parentId = getInfo(context, SELECT_PARENT_ID);
            if (parentId != null && !"".equals(parentId)) {
                _parentObject = DomainObject.newInstance(context, parentId);
            }
        }
        return _parentObject;
    }

    /**
     * This function verifies the user's permission for the given Question.
     * 
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds the following input arguments: PARENT_MODIFY to see if
     *            the context user has modify access to the parent object, <BR>
     * @return boolean true or false
     * @throws Exception
     *             if the operation fails
     * @since AEF 9.5.1.0
     */
    public boolean hasAccess(Context context, String args[]) throws Exception {
        // System.out.println("Start Question - " + (new Date().getTime()));
        // program[emxQuestion PARENT_MODIFY -method hasAccess
        // -construct ${OBJECTID}] == true
        boolean access = false;
        String accessType = args[0];

        if ("PARENT_MODIFY".equals(accessType)) {
            DomainObject parentObject = getParentObject(context);

            if (parentObject != null) {
                int iAccess = AccessConstants.cModify;
                // System.out.println("Checking access..." +
                // (new Date().getTime()));
                if (parentObject.checkAccess(context, (short) iAccess)) {
                    access = true;
                }
            }
			else{
			    access = true;
			}

        }
        // System.out.println(new Date().getTime());
        // System.out.println("End ProjectSpace - " + context.getUser() +
        // " : " + getId() + " : " + access);

        return access;
    }

    /**
     * getQuestions - This method gets the List the Question added to the
     * ProjectTemplate Task. Used for PMCTaskQuestionSummary table.
     * 
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            holds no arguments
     * @return MapList contains list of project members
     * @throws Exception
     *             if the operation fails
     * @since PMC X+2
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getQuestions(Context context, String[] args)
            throws Exception {

        com.matrixone.apps.program.Task task = (com.matrixone.apps.program.Task) DomainObject
                .newInstance(context, DomainConstants.TYPE_TASK, "PROGRAM");
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String objectId = (String) programMap.get("objectId");
        MapList questionList = new MapList();
        StringList taskQuestionIds = new StringList();
        if (objectId != null && !"null".equals(objectId)
                && !"".equals(objectId)) {
            task.setId(objectId);
            taskQuestionIds = task.getInfoList(context,
                    Task.SELECT_QUESTION_ID);
        }
        // Only access this part of the page if the task has a question assigned
        // to it
        if (taskQuestionIds != null && !"null".equals(taskQuestionIds)) {
            Map questionMap = null;
            // Get questionId
            StringList taskSelects = new StringList(4);
            taskSelects.add(DomainConstants.SELECT_NAME);
            taskSelects.add(DomainConstants.SELECT_DESCRIPTION);
            taskSelects.add(DomainConstants.SELECT_ID);
            taskSelects.add(Task.SELECT_TASK_TRANSFER);
			
			StringList relSelects = new StringList(2);
            relSelects.add(QuestionRelationship.SELECT_TASK_TRANSFER);
            relSelects.add(DomainRelationship.SELECT_ID);

			questionList = task.getRelatedObjects(context, "Question", "*", taskSelects, relSelects, true, false, (short)1, "", "",0);
			}
		return questionList;
    }
    
    
//Added:nr2:Bug#376468:23/06/09
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public Map changeRevision(Context context, String[] args)
    throws Exception {
        Map returnResult = new HashMap();
		Map programMap = (HashMap)JPO.unpackArgs(args);
        Map paramMap = (HashMap) programMap.get("paramMap");
		Map requestMap = (HashMap) programMap.get("requestMap");
        String expectedResponse = (String) requestMap.get("subquestion-expected-response");

        try{
			String relId = (String)paramMap.get("relId"); 
			if(ProgramCentralUtil.isNotNullString(relId)){
				DomainRelationship relObj = new DomainRelationship(relId);
				relObj.setAttributeValue(context,QuestionRelationship.ATTRIBUTE_TASK_TRANSFER,expectedResponse.toUpperCase());
			}
			/*
            //Unpack Incoming Arguments
            Map programMap = (HashMap)JPO.unpackArgs(args);
            Map paramMap = (HashMap) programMap.get("paramMap");
            String objectId = (String)paramMap.get("objectId"); 
            String relId = (String)paramMap.get("relId"); 
            Map requestMap = (HashMap) programMap.get("requestMap");
            String templateId = (String) requestMap.get("parentOID");
			if(ProgramCentralUtil.isNullString(templateId))
            	templateId=(String) requestMap.get("projectTemplateId");
            String newQuestionName = (String) requestMap.get("Name");
            String expectedResponse = (String) requestMap.get("subquestion-expected-response");

            ProjectTemplate projectTemplate = new ProjectTemplate(templateId);
			if(ProgramCentralUtil.isNotNullString(relId)){
			DomainRelationship relObj = new DomainRelationship(relId);
			relObj.setAttributeValue(context,QuestionRelationship.ATTRIBUTE_TASK_TRANSFER,expectedResponse.toUpperCase());
			}
            
            StringList questionNameList = new StringList();
         	StringList busSelectList = new StringList(2);
        	busSelectList.add(SELECT_ID);
        	busSelectList.add(SELECT_NAME);
        	StringList relSelectList = new StringList();
        	String busWhere = EMPTY_STRING;
    		String relWhere = EMPTY_STRING; 

            MapList questionInfoMapList = projectTemplate.getRelatedObjects(context,RELATIONSHIP_PROJECT_QUESTION+","+RELATIONSHIP_QUESTION,TYPE_QUESTION,
					busSelectList,relSelectList,false,true,(short)0,
					busWhere,relWhere,0);

            int questionInfoMapListSize = questionInfoMapList.size();
            for(int i=0; i<questionInfoMapListSize; i++){
            	Map questionInfoMap = (Map)questionInfoMapList.get(i);
            	String questionName = (String)questionInfoMap.get(SELECT_NAME);
            	String questionId = (String)questionInfoMap.get(SELECT_ID);
            	if(!(objectId.equalsIgnoreCase(questionId))){
            		questionNameList.add(questionName);
            	}
            }
            
            if(!(questionNameList.contains(newQuestionName))){
                String result = EMPTY_STRING;
                String origName = EMPTY_STRING;
                String origRev = EMPTY_STRING;
            
            //Get name,revision of the Question
            MQLCommand mqlcmd = new MQLCommand();
            //String cmd = "print bus " + objectId + " select name revision dump |;";
            String cmd = "print bus $1 select $2 $3 dump $4;";
                boolean res = mqlcmd.executeCommand(context,cmd,objectId,"name","revision","|");

            if(!res)
            {
                returnResult.put("Action","CONTINUE");
                returnResult.put("Message","Failure: Object Not Found"); 
                return returnResult;
            }                
            
            result = mqlcmd.getResult();
            StringTokenizer resultToken = new StringTokenizer(result,"|");
            if(resultToken.countTokens() == 2){
                origName = resultToken.nextToken();
                origRev = resultToken.nextToken();
            }
            
            origRev = DomainObject.newInstance(context).getUniqueName("QR",12); 
            //cmd = "modify bus " + objectId +" name " + tempName + " revision " + origRev + ";";
                cmd = "modify bus $1 $2 $3 $4 $5;";
                res = mqlcmd.executeCommand(context,cmd,objectId,"name",origName,"revision",origRev);
            
            if(!res){
                returnResult.put("Action","CONTINUE");
                returnResult.put("Message","Failure : Can not modify Question " + origName + " Quesion Already Exist"); 
                return returnResult;
            }
            }else{
        	   String editingNotAllowedMessage = "Question with this name already exist";
        	   returnResult.put("Message",editingNotAllowedMessage);
               return returnResult; 
            }
			*/
        }catch(Exception e){
            e.printStackTrace();
        }
        return returnResult;
    }
//End:Bug#376468   
    
    /**
     * This method returns Maplist which holds either question information related
     * to given project template or task information related to given question.
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
     * 			String array which holds either project template or question id.
     * @return	infoMapList
     * 			Maplist which holds question or question task information.
     * 
     * @throws 	FrameworkException		
	 * 			FrameworkException can be thrown in case of method fail to execute. 
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getQuestionORQuestionTaskList(Context context, String[] argumentArray) throws MatrixException {
    	
    	MapList infoMapList = null;
    	
    	StringList busSelectList = new StringList (4);
    	busSelectList.add (SELECT_ID);
    	busSelectList.add (SELECT_NAME);
    	busSelectList.add (SELECT_CURRENT);
    	busSelectList.add (SELECT_POLICY);
    	busSelectList.add (SELECT_DESCRIPTION);
    	
    	StringList relSelectList = new StringList(1);
		//relSelectList.add("to[Question].from.id");
		relSelectList.add(DomainConstants.SELECT_RELATIONSHIP_ID);
		busSelectList.add("to[Question].from.id");
    	String busWhere = EMPTY_STRING;
    	String relWhere = EMPTY_STRING;
    	
    	String strRelPattern = DomainConstants.RELATIONSHIP_PROJECT_QUESTION + "," + 
				   			   DomainConstants.RELATIONSHIP_QUESTION;
    	String strTypePattern = DomainConstants.TYPE_QUESTION + "," +
    							DomainConstants.TYPE_TASK_MANAGEMENT;
    	
    	try {
	    	Map<String,String> programMap = JPO.unpackArgs(argumentArray);
	        String objectId = programMap.get("objectId");
	        
	        String strExpandLevel = (String) programMap.get("expandLevel");
	    	short recurseToLevel = ProgramCentralUtil.getExpandLevel(strExpandLevel);
	        
	    	Question question = new Question(objectId);
	    	infoMapList = question.getRelatedObjects(context, strRelPattern, strTypePattern, busSelectList,
													 relSelectList, false, true, recurseToLevel, busWhere, relWhere, 0);	        
    	} catch (Exception exception) {
    		throw new MatrixException(exception);
    	}
        return infoMapList;
    }
    
    
    /**
     * This method populates and returns dropdown which holds 'True' and 'False'.
     * User will select either value while inline editing question.
     *  
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array.
     * @return	Map which has dropdown which holds 'True' and 'False'. User will 
     * 			select either value while inline editing question.
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Map getQuestionTaskResponseRangeValues(Context context, String[] argumentArray) throws MatrixException {
    	
    	String clientLanguage = context.getLocale().getLanguage();
        Map<String,StringList> returnMap = new HashMap<String,StringList>(2);
        StringList responseActualValueList = new StringList(2);
        StringList responseDisplayValueList = new StringList(2);
    	
    	String actualTrue = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.TRUE", Locale.US.getLanguage());
    	String actualFalse = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.FALSE",Locale.US.getLanguage());
    	responseActualValueList.add(actualTrue);
    	responseActualValueList.add(actualFalse);
    	
    	String i18True = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.TRUE", clientLanguage);
    	String i18False = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.FALSE", clientLanguage);
    	responseDisplayValueList.add(i18True);
    	responseDisplayValueList.add(i18False);
    	
        returnMap.put("field_choices", responseActualValueList);
        returnMap.put("field_display_choices", responseDisplayValueList);
        
        return returnMap;
    }
    /**
     * This method populates and returns dropdown which holds 'True' and 'False'.
     * User will select either value while connecting tasks to the question.
     *  
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array.
     * @return	Map which has dropdown which holds 'True' and 'False'. User will 
     * 			select either value while connecting tasks to the question.
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getQuestionResponseOptionList(Context context, String[] args) throws Exception {
    	
    	Map programMap = JPO.unpackArgs(args);
    	List<Map<String,String>> objectList = (List<Map<String,String>>) programMap.get("objectList");
    	int objectListSize = objectList.size(); 
    	
    	StringList programHTMLStringList = new StringList();
    	for( int i= 0; i<objectListSize;i++) {   		
    	String taskId = objectList.get(i).get("id");
    	String clientLanguage = context.getLocale().getLanguage();
    	String i18True = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.TRUE", clientLanguage);
    	String i18False = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.FALSE", clientLanguage);
    	String programHTMLString = "<select name=\"" + taskId + "\">" +
    							   		"<option value=\"True\">"+i18True+"</option>" +
    							   		"<option value=\"False\">"+i18False+"</option>" +
    							   "</select>";
	       	
    	programHTMLStringList.add(programHTMLString);
    	}
    	
	    return programHTMLStringList;
    }
    /**
     * This method checks if inline object is of Question, it makes that row
     * editable for the user, else makes that row read-only.
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array which holds id for objects to be rendered.
     * @return	editAccessList
     * 			It holds 'true' as value for question objects for other value ill be false.
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    public StringList makeQuestionCellEditable(Context context, String[] argumentArray) throws MatrixException {

    	try {
            Map programMap = JPO.unpackArgs(argumentArray);
            List<Map<String,String>> objectList = (List<Map<String,String>>) programMap.get("objectList");
            StringList editAccessList = new StringList(objectList.size());
            
        	for(int i=0;i<objectList.size();i++) {
        		String level = objectList.get(i).get("level");
        		String objectId = objectList.get(i).get("id");
				DomainObject domObj = new DomainObject(objectId);
				//boolean res = "0".equalsIgnoreCase(level) || "1".equalsIgnoreCase(level);
				boolean res = domObj.isKindOf(context, DomainConstants.TYPE_QUESTION);
				editAccessList.add(String.valueOf(res));
            } 
            return editAccessList;
            
        } catch (Exception exception) {
            throw new MatrixException(exception);
        }
    }
    /**
     * This method checks if inline object is of Task Management, it makes that row
     * editable for the user, else makes that row read-only.
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array which holds id for objects to be rendered.
     * @return	editAccessList
     * 			It holds 'true' as value for Task Management objects for other value ill be false.
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    public StringList makeTaskCellEditable(Context context, String[] argumentArray) throws MatrixException {
    	
        try {
            Map programMap = JPO.unpackArgs(argumentArray);
            List<Map<String,String>> objectList = (List<Map<String,String>>) programMap.get("objectList");
            StringList editAccessList = new StringList(objectList.size());
            
        	for(int i=0;i<objectList.size();i++) {
        		String level = objectList.get(i).get("level");
				//boolean res = "2".equalsIgnoreCase(level);
				boolean res = !("0".equalsIgnoreCase(level) || "1".equalsIgnoreCase(level));
				editAccessList.add(String.valueOf(res));
            } 
            return editAccessList;
            
        } catch (Exception exception) {
            throw new MatrixException(exception);
        }
    }
    /**
     * This method updates attribute of 'Question' relationship when user changes
     * Question response value.
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array which holds id for objects to be rendered.
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    public void updateQuestionResponse(Context context, String[] argumentArray) throws Exception {
    	
    	try {	
    		Map programMap    			= JPO.unpackArgs(argumentArray);
    		Map<String,String> paramMap = (Map)programMap.get("paramMap");
    		String taskId 	= paramMap.get("objectId");
    		String relId 	= paramMap.get("relId");
    		String newResponseValue = paramMap.get("New Value");
    			
    		Map<String,String> attributeValueMap = new HashMap<String,String>(1);
    		attributeValueMap.put(ATTRIBUTE_TASK_TRANSFER,newResponseValue);
    		
    		String SELECT_QUESTION_REL_ID = "to["+RELATIONSHIP_QUESTION+"].id";
    		/*
    		DomainObject taskObject = DomainObject.newInstance(context,TYPE_TASK_MANAGEMENT,PROGRAM);
    		taskObject.setId(taskId);
    		String connectionId = taskObject.getInfo(context,SELECT_QUESTION_REL_ID);
    		
    		DomainRelationship relObject  = new DomainRelationship(connectionId);
    		relObject.setAttributeValues(context, attributeValueMap);
			*/
			if(ProgramCentralUtil.isNotNullString(relId)){
				DomainRelationship relObject  = new DomainRelationship(relId);
				relObject.setAttributeValues(context, attributeValueMap);
			}
    		
    	} catch (Exception exception) {
    		throw new MatrixException(exception);
    	}
    }
    /**
     * This method connects newly created question with project template and
     * selected tasks of it.
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array which holds id of question,tasks and project template.
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void connectQuestionToTask(Context context, String[] argumentArray) throws Exception {
    	
    	try {
    		Map parameterMap = JPO.unpackArgs(argumentArray);
    		Map errorMap = new HashMap();

    		    errorMap = changeRevision(context, argumentArray);
    			if(errorMap.isEmpty()){
    		Map paramMap = (Map) parameterMap.get("paramMap");
    		String questionId = (String) paramMap.get("objectId");
    		
    		Map<String,String> requestMap = (Map<String,String>)parameterMap.get("requestMap");
			String projectTemplateId = requestMap.get("parentOID");
			if(ProgramCentralUtil.isNullString(projectTemplateId))
        			projectTemplateId=(String)requestMap.get("projectTemplateId");
        	String questionResponse  = requestMap.get("QuestionResponse");
        	String taskIdString 	 = requestMap.get("taskIdString");        	
        	String[] taskIdArray = taskIdString.split("_"); 
        	String[] questionResponseArray = new String[taskIdArray.length];
        	
        	for(int i=0;i<taskIdArray.length;i++) {
        		questionResponseArray[i]=questionResponse;
        	}
            String parentTemplateId = EMPTY_STRING;

    			if(ProgramCentralUtil.isNotNullString(taskIdArray[0])){
    				DomainObject taskObject = DomainObject.newInstance(context,taskIdArray[0]);
    				StringList objectSelects = new StringList();
    				objectSelects.add(ProgramCentralConstants.SELECT_PROJECT_ID);
    				Map taskInfo = taskObject.getInfo(context, objectSelects);
    				parentTemplateId = (String)taskInfo.get(ProgramCentralConstants.SELECT_PROJECT_ID);
    			}
        	RelationshipType projectQuestionRel = new RelationshipType(RELATIONSHIP_PROJECT_QUESTION);
        	
        	Question question = new Question(questionId);
        	question.connectTaskArray(context, taskIdArray, questionResponseArray);//connect Task(s) to Question.
    		question.addFromObject(context,projectQuestionRel,parentTemplateId);//connect Question to Template
    		}else{
				   String errorMessage = (String) errorMap.get("Message");
				   String alertMessage = EnoviaResourceBundle.getProperty(context, "emxProgramCentralStringResource", errorMessage, context.getSession().getLanguage());
    			if(alertMessage == null || alertMessage.isEmpty()) {
    				alertMessage = errorMessage;
    			}
    			emxContextUtilBase_mxJPO.mqlError(context, alertMessage);
    		}
    	} catch (Exception exception) {
    		throw new MatrixException(exception);
    	}
    }
    /**
     * This method returns true if user selects project template task/tasks and
     * create new question to assign it.
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array which holds "showQuestionResponse" in it.
	 *
     * @return  returns true if user selects project template task/tasks and
     * 			create new question to assign it.
     * 
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    public boolean isShowQuestionResponse(Context context, String[] argumentArray) throws MatrixException {
    	
        try {
            Map<String,String> programMap = JPO.unpackArgs(argumentArray);
            String showQuestionResponse= programMap.get("showQuestionResponseDD");
            
            return "true".equalsIgnoreCase(showQuestionResponse);
            
        } catch (Exception exception) {
            throw new MatrixException(exception);
        }
    }
    
    public void updateQuestionName(Context context, String[] args) throws MatrixException {
        try {
        	String languageStr = context.getSession().getLanguage();
        	StringList questionNameList = new StringList();
        	Map inputMap = (HashMap)JPO.unpackArgs(args);
            Map requestMap = (HashMap) inputMap.get("requestMap");
            String templateId = (String) requestMap.get("parentOID");
            Map paramMap = (HashMap) inputMap.get("paramMap");
            String questionId = (String) paramMap.get("objectId");
            String newAttrValue = (String) paramMap.get("New Value");
            
            ProjectTemplate projectTemplate = new ProjectTemplate(templateId);
            
         	StringList busSelectList = new StringList(2);
        	busSelectList.add(SELECT_ID);
        	busSelectList.add(SELECT_NAME);
        	
        	StringList relSelectList = new StringList();
        	String busWhere = EMPTY_STRING;
    		String relWhere = EMPTY_STRING; 
    		String relPattern = DomainConstants.RELATIONSHIP_PROJECT_QUESTION+","+DomainConstants.RELATIONSHIP_QUESTION;
            MapList questionInfoMapList = projectTemplate.getRelatedObjects(context,relPattern,TYPE_QUESTION,
					busSelectList,relSelectList,false,true,(short)0,
					busWhere,relWhere,0);
            
            int questionInfoMapListSize = questionInfoMapList.size();
            for(int i=0; i<questionInfoMapListSize; i++){
            	Map questionInfoMap = (Map)questionInfoMapList.get(i);
            	String questionName = (String)questionInfoMap.get(SELECT_NAME);
            	questionNameList.add(questionName);
            }
            
            if(!(questionNameList.contains(newAttrValue))){
           	 Question question = new Question(questionId);
                question.setName(context, newAttrValue);
           } else {
        	   String sErrorMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Question.QuestionAlreadyExist", languageStr);
               //${CLASS:emxContextUtil}.mqlError(context,sErrorMsg);
               throw new MatrixException(sErrorMsg);
           }
        } catch (Exception e) {
            throw new MatrixException(e);
        }
    }
    
    @com.matrixone.apps.framework.ui.PostProcessCallable
	public Map postProcessRefresh(Context context,String[]args)throws Exception
	{
		try{
			Map mapReturn = new HashMap();
			mapReturn.put("Action","refresh");
			return mapReturn;
		}
		catch(Exception ex){
			throw new MatrixException(ex);
		}
    	
	}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public StringList getTaskQuestionResponse(Context context, String[] args) throws Exception {
		StringList slOutput = new StringList();
		final String SELECT_HAS_QUESTION = "to[" + ProgramCentralConstants.RELATIONSHIP_QUESTION + "]";
		final String SELECT_TASK_TRANSFER =
				"to[" + RELATIONSHIP_QUESTION + "].attribute[" +
						QuestionRelationship.ATTRIBUTE_TASK_TRANSFER + "]";

		Map programMap = JPO.unpackArgs(args);
		MapList objectList = (MapList) programMap.get("objectList");
		int objectListSize = objectList.size(); 

		//Collect all task ids.
		StringList slTaskIds = new StringList(objectListSize);
		for (Iterator iterator = objectList.iterator(); iterator.hasNext();) {
			Map taskInfo = (Map) iterator.next();
			String taskId = (String) taskInfo.get(ProgramCentralConstants.SELECT_ID);
			slTaskIds.add(taskId);
		}

		//Make array out of taskIds list
		String[] aTaskIds = new String[objectListSize];
		slTaskIds.toArray(aTaskIds);

		//Get task info
		StringList slTaskSelects = new StringList();
		slTaskSelects.add(ProgramCentralConstants.SELECT_ID);
		slTaskSelects.add(SELECT_HAS_QUESTION);
		MapList mlTaskInfo = DomainObject.getInfo(context, aTaskIds, slTaskSelects);

		//Prepare HTML Output
		String clientLanguage = context.getLocale().getLanguage();
		String i18True = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.TRUE", clientLanguage);
		String i18False = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.FALSE", clientLanguage);
		for (Iterator iterator = mlTaskInfo.iterator(); iterator.hasNext();) {
			Map taskInfo = (Map) iterator.next();
			String taskId = (String) taskInfo.get(ProgramCentralConstants.SELECT_ID);
			String hasQuestion = (String) taskInfo.get(SELECT_HAS_QUESTION);
			StringBuffer sbOutput = new StringBuffer();
			if("TRUE".equalsIgnoreCase(hasQuestion)){
				com.matrixone.apps.program.Task progTask = new com.matrixone.apps.program.Task(taskId);
				String itemTransfer = progTask.getInfo(context, SELECT_TASK_TRANSFER);
				
				//if response is not matching, do not clone the task.  
				if("false".equalsIgnoreCase(itemTransfer)){
					sbOutput.append("<select id=\"" + "\" name=\"" + taskId + "\">")
					.append("<option value=\"FALSE\">" + i18False + "</option>")
					.append("<option value=\"TRUE\">" + i18True + "</option>")
					.append("</select>");
				}else{
					sbOutput.append("<select id=\"" + "\" name=\"" + taskId + "\">")
					.append("<option value=\"TRUE\">" + i18True + "</option>")
					.append("<option value=\"FALSE\">" + i18False + "</option>")
					.append("</select>");
				}
			} 
			slOutput.add(sbOutput.toString());
		}
		return slOutput;
	}

	/**
     * This method is used to check which column is shown on Copy From Project functionality
     * Used for PMCProjectSummaryForProjects table
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @return boolean based on the search result or preview page.
     */
	public boolean showQuestionColumn(Context context, String args[]) throws Exception {
		Map inputMap = (HashMap)JPO.unpackArgs(args);
		String isRootSelection = (String)inputMap.get("hideRootSelection");
		if("true".equalsIgnoreCase(isRootSelection)) 
			return false;
		
		return true;
	}
	
	/**
     * This method returns empty Maplist which is used as expand program for adding SubQuestion rows dynamically
     * depending on Parent Question response
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
     * 			String array which holds either project template or question id.
     * @return	infoMapList
     * 			Maplist which holds question or question task information.
     * 
     * @throws 	FrameworkException		
	 * 			FrameworkException can be thrown in case of method fail to execute. 
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getEmptyMapListForSubQuestion(Context context, String[] argumentArray) throws MatrixException {
    	
    	MapList infoMapList = null;
    	
        return new MapList();
    }
	
	/**
	 * To show the Parent Name with it's Type image
	 *
	 * @param context
	 *            the eMatrix <code>Context</code> object
	 * @param args
	 *            holds a HashMap containing the following entries: paramMap - a
	 *            HashMap containing the following keys, "objectId".
	 * @return String - Parent Name
	 * @throws Exception
	 *             if operation fails
	 * @since PMC V6R2008-1
	 */
	public String getParentNameWithTypeImage(Context context, String[] args)
	throws Exception
	{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");

		String selectedObjectId = (String) requestMap.get("objectId");
		StringBuffer output=new StringBuffer();

		if(null !=selectedObjectId && !selectedObjectId.equals("")){
			DomainObject selectedObj = new DomainObject(selectedObjectId);
			StringList objectSelect= new StringList(3);
			objectSelect.addElement(DomainConstants.SELECT_NAME);
			objectSelect.addElement(DomainConstants.SELECT_TYPE);
			Map infoMap=selectedObj.getInfo(context, objectSelect);
			String strName = (String)infoMap.get(DomainConstants.SELECT_NAME);
			String strType =  (String)infoMap.get(DomainConstants.SELECT_TYPE); 
			
			String strSymbolicType = FrameworkUtil.getAliasForAdmin(context, "Type", strType, true);
			String strTypeIcon = EnoviaResourceBundle.getProperty(context, "emxFramework.smallIcon." + strSymbolicType);
			String strTempObjectName = strName.replaceAll("&", "&amp;"); 
			output.append("<img src='../common/images/"+strTypeIcon+"' border='0' alt='"+strType+"' >"+strTempObjectName+"</img>");
		}
		return output.toString();
	}
	
	/**
     * This method populates and returns dropdown which holds 'True' and 'False'.
     * User will select either value while creating subquestion.
     *  
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array.
     * @return	Map which has dropdown which holds 'True' and 'False'. User will 
     * 			select either value while connecting tasks to the question.
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public String getQuestionResponseOptionListForQuestionCreationForm(Context context, String[] args) throws Exception {
    	
    	Map programMap = JPO.unpackArgs(args);
    	String clientLanguage = context.getLocale().getLanguage();
    	String i18True = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.TRUE", clientLanguage);
    	String i18False = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.FALSE", clientLanguage);
    	String programHTMLString = "<select name=\"subquestion-expected-response\">" +
    							   		"<option value=\"TRUE\">"+i18True+"</option>" +
    							   		"<option value=\"FALSE\">"+i18False+"</option>" +
    							   "</select>";
	       	
    	return programHTMLString;
    	
    }
	
	
	/**
     * This method returns true if user selects question and
     * create new subquestion under it.
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array which holds "showQuestionResponse" in it.
	 *
     * @return  returns true if user selects a question 
     * 			to create subquestion under it.
     * 
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
    public boolean getExpectedParentResponseAccess(Context context, String[] args) throws MatrixException {
    	
        try {
            Map<String,String> programMap = JPO.unpackArgs(args);
            String objectId= programMap.get("objectId");
			if(ProgramCentralUtil.isNotNullString(objectId)){
				DomainObject selectedObj = new DomainObject(objectId);
				return selectedObj.isKindOf(context, DomainConstants.TYPE_QUESTION);
            }
			return false;
        } catch (Exception exception) {
            throw new MatrixException(exception);
        }
    }
	
	/**
     * This method returns Expected Parent response for connected task or sub-question
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array which holds id of question,tasks and project template.
     * @throws 	Exception		
	 * 			Exception can be thrown in case of method fail to execute.
     */
	@com.matrixone.apps.framework.ui.ProgramCallable
    public StringList getQuestionORQuestionTaskExpectedResponse(Context context, String[] argumentArray) throws Exception {
    	
    	MapList infoMapList = null;
		StringList slReturn = new StringList();
		Map programMap      = JPO.unpackArgs(argumentArray);
		
		MapList objectList = (MapList) programMap.get("objectList");
		Map paramList = (HashMap) programMap.get("paramList");
		String tableMode = (String) paramList.get("mode");
    	int objectListSize = objectList.size();
		if(!"taskQuestions".equalsIgnoreCase(tableMode)){
			final String SELECT_HAS_QUESTION = "to[" + ProgramCentralConstants.RELATIONSHIP_QUESTION + "]";
			final String SELECT_TASK_TRANSFER =
					"to[" + RELATIONSHIP_QUESTION + "].attribute[" +
							QuestionRelationship.ATTRIBUTE_TASK_TRANSFER + "]";

			StringList slForParentSequence = new StringList();

			//Collect all task ids.
			StringList slTaskIds = new StringList(objectListSize);
			for (Iterator iterator = objectList.iterator(); iterator.hasNext();) {
				Map taskInfo = (Map) iterator.next();
				String taskId = (String) taskInfo.get(ProgramCentralConstants.SELECT_ID);
				String taskParentId = (String) taskInfo.get("id[parent]");
				slTaskIds.add(taskId);
				slForParentSequence.add(taskParentId);
			}

			//Make array out of taskIds list
			String[] aTaskIds = new String[objectListSize];
			slTaskIds.toArray(aTaskIds);

			//Get task info
			StringList slTaskSelects = new StringList();
			slTaskSelects.add(ProgramCentralConstants.SELECT_ID);
			slTaskSelects.add(SELECT_HAS_QUESTION);
			slTaskSelects.add("to[Question].from.id");
			slTaskSelects.add(SELECT_TASK_TRANSFER);
			//slTaskSelects.add(SELECT_HAS_QUESTION);
			MapList mlTaskInfo = DomainObject.getInfo(context, aTaskIds, slTaskSelects);

			//Prepare HTML Output
			String clientLanguage = context.getLocale().getLanguage();
			String i18True = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.TRUE", clientLanguage);
			String i18False = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.QuestionResponseRange.FALSE", clientLanguage);
			int taskInfoItrCount = 0;
			for (Iterator iterator = mlTaskInfo.iterator(); iterator.hasNext();) {
				
				Map taskInfo = (Map) iterator.next();
				String taskId = (String) taskInfo.get(ProgramCentralConstants.SELECT_ID);
				String hasQuestion = (String) taskInfo.get(SELECT_HAS_QUESTION);
				String questionIds = (String) taskInfo.get("to[Question].from.id");
				StringBuffer sbOutput = new StringBuffer();
				DomainObject progTask = new DomainObject(taskId);
				String itemTransfer = (String) taskInfo.get(SELECT_TASK_TRANSFER);
				StringList slItemTransfer = FrameworkUtil.split(itemTransfer,"");
				StringList slQuestionIds = FrameworkUtil.split(questionIds,"");
				if(slItemTransfer.size()>1 && slItemTransfer.size() == slQuestionIds.size()){
					
					for(int slItr = 0; slItr<slItemTransfer.size() && slItr<slQuestionIds.size(); slItr++){
						String questionId = (String) slQuestionIds.get(slItr);
						if(questionId.equalsIgnoreCase(slForParentSequence.get(taskInfoItrCount))){
							itemTransfer = slItemTransfer.get(slItr);
						}
					}
					
				}
				//if(!"FALSE".equalsIgnoreCase(hasQuestion)){
					//itemTransfer = progTask.getInfo(context, SELECT_TASK_TRANSFER);
					//if()
				//}
				
				if("TRUE".equalsIgnoreCase(itemTransfer)){
					itemTransfer = i18True;
				}
				else if("FALSE".equalsIgnoreCase(itemTransfer)){
					itemTransfer = i18False;
				}
				slReturn.add(itemTransfer);
				taskInfoItrCount++;
			}
		}
		else{
			for(int objListItr=0; objListItr<objectList.size(); objListItr++){
				Map objMap = (Map) objectList.get(objListItr);
				String relIdTemp = (String) objMap.get("id[connection]");
				DomainRelationship relObjTemp = new DomainRelationship(relIdTemp);
				String taskTransferAttr = (String) relObjTemp.getAttributeValue(context,"Task Transfer");
				slReturn.add(taskTransferAttr);
			}
		}
        return slReturn;
    }
	
	/**
     * This method returns List of all the questions connected to the task
     * 
     * @param	context 
     * 			The ENOVIA <code>Context</code> object.
     * @param 	argumentArray
	 *			Argument String Array which holds id of question,tasks and project template.
     * @throws 	MatrixException		
	 * 			MatrixException can be thrown in case of method fail to execute.
     */
	@com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getQuestionListConnectedToTask(Context context, String[] argumentArray) throws MatrixException {
    	
    	MapList infoMapList = null;
    	
    	StringList busSelectList = new StringList (4);
    	busSelectList.add (SELECT_ID);
    	busSelectList.add (SELECT_NAME);
    	busSelectList.add (SELECT_CURRENT);
    	busSelectList.add (SELECT_POLICY);
    	busSelectList.add (SELECT_DESCRIPTION);
    	
    	StringList relSelectList = new StringList(1);
		//relSelectList.add("to[Question].from.id");
		relSelectList.add(DomainConstants.SELECT_RELATIONSHIP_ID);
		busSelectList.add("to[Question].from.id");
    	String busWhere = EMPTY_STRING;
    	String relWhere = EMPTY_STRING;
    	
    	String strRelPattern = DomainConstants.RELATIONSHIP_QUESTION;
    	String strTypePattern = DomainConstants.TYPE_QUESTION;
    	
    	try {
	    	Map<String,String> programMap = JPO.unpackArgs(argumentArray);
	        String objectId = programMap.get("objectId");
	        
	        String strExpandLevel = (String) programMap.get("expandLevel");
	    	short recurseToLevel = ProgramCentralUtil.getExpandLevel(strExpandLevel);
	        
	    	Task taskObj = new Task(objectId);
	    	infoMapList = taskObj.getRelatedObjects(context, strRelPattern, strTypePattern, busSelectList,
													 relSelectList, true, false, (short) 1, busWhere, relWhere, 0);	        
    	} catch (Exception exception) {
    		throw new MatrixException(exception);
    	}
        return infoMapList;
    }
	
	@com.matrixone.apps.framework.ui.CreateProcessCallable
	public Map createNewQuestion(Context context, String[] args)throws Exception{
		Map programMap = JPO.unpackArgs(args);
		Map returnMap=new HashMap();
		String clientLanguage = context.getLocale().getLanguage();
		String templateId = (String) programMap.get("projectTemplateId");
		String QuestionName = (String) programMap.get("Name");

		if(ProgramCentralUtil.isNullString(templateId)){
			templateId = (String) programMap.get("objectId");
		}

		ProjectTemplate projectTemplate = new ProjectTemplate(templateId);
		StringList busSelectList = new StringList(2);
        	busSelectList.add(SELECT_ID);
        	busSelectList.add(SELECT_NAME);
        	StringList relSelectList = new StringList();
        	String busWhere = EMPTY_STRING;
    		String relWhere = EMPTY_STRING; 
            StringList questionNameList = new StringList();

            MapList questionInfoMapList = projectTemplate.getRelatedObjects(context,RELATIONSHIP_PROJECT_QUESTION+","+RELATIONSHIP_QUESTION,TYPE_QUESTION,
					busSelectList,relSelectList,false,true,(short)0,
					busWhere,relWhere,0);

			int questionInfoMapListSize = questionInfoMapList.size();
            for(int i=0; i<questionInfoMapListSize; i++){
            	Map questionInfoMap = (Map)questionInfoMapList.get(i);
            	String questionName = (String)questionInfoMap.get(SELECT_NAME);
            	String questionId = (String)questionInfoMap.get(SELECT_ID);            	
            	questionNameList.add(questionName);
            }
			
			if(!(questionNameList.contains(QuestionName))){
				DomainObject questionObj = DomainObject.newInstance(context);
				String uniqueRevision = DomainObject.newInstance(context).getUniqueName("QR",12);
				questionObj.createObject(context, DomainObject.TYPE_QUESTION, QuestionName, uniqueRevision, DomainObject.POLICY_QUESTION, null); 
				returnMap.put("id", questionObj.getId(context));
			}
			else{
				String editingNotAllowedMessage = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.Question.QuestionAlreadyExist", Locale.US.getLanguage());
				throw new MatrixException(editingNotAllowedMessage);
			}
		return returnMap;
	}
}
