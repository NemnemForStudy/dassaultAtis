<%@page import="com.dassault_systemes.enovia.e6wv2.foundation.jaxbext.DataelementMap"%>
<%@page import="javax.json.JsonReader"%>
<%@page import="javax.json.Json"%>
<%@page contentType="text/xml;charset=ISO-8859-1" %>
<%@page import="com.matrixone.json.JSONObject"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Set"%>
<%@page import="java.util.Iterator"%>
<%@page import="javax.json.JsonObjectBuilder"%>
<%@page import="javax.json.JsonObject"%>
<%@page import="javax.json.JsonArray"%>
<%@page import="javax.json.JsonArrayBuilder"%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.matrixone.apps.domain.util.FrameworkUtil"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>

<%@page import="java.util.Vector"%>
<%@page import="java.util.stream.Collectors"%>
<%@page import="com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Dataobject"%>
<%@page import="com.dassault_systemes.enovia.tskv2.ProjectSequence"%>
<%@include file="../emxGantt.inc" %>

<%!
String SUCCESSOR_TASK_PROJCT_PHYSICALID = "to[Dependency].from." + "to[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + ProgramCentralConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].to.physicalid";
String SUCCESSOR_PHYSICAL_ID			= "to[" + DomainConstants.RELATIONSHIP_DEPENDENCY + "].physicalid";

	List<Map<String,String>> getSuccessorInfoMapList(Context context, String taskId, String taskProjectId, String successorInfoString){
	
		List<Map<String,String>> successorInfoMapList = new ArrayList<Map<String,String>>();
	
		String[] firstSplitArray = successorInfoString.split(taskId);
		
		if(firstSplitArray != null && firstSplitArray.length == 2) {
			
			String[] dependencyIdArray 	= firstSplitArray[0].split("@");
			int successorCount 			= dependencyIdArray.length;
			
			String[] otherInfoArray = firstSplitArray[1].substring(1).split("@");
			for(int i=0;i<successorCount; i++) {
				
				int counter  = i;
				Map<String,String> successorInfo = new HashMap<String,String>();
				String dependencyPhysicalId			= dependencyIdArray[i];
				String successorTaskProjectPhysicalId 	= otherInfoArray[counter];
				String successorType 				= otherInfoArray[counter+=successorCount];
				String lagTime 						= otherInfoArray[counter+=successorCount];
				String lagUnit 						= otherInfoArray[counter+=successorCount];
				String successorPhysicalId 			= otherInfoArray[counter+=successorCount];
				String successorName 				= otherInfoArray[counter+=successorCount];
				
				//add only if successor is from same project. don't show external successor in overlay.
				if(taskProjectId.equalsIgnoreCase(successorTaskProjectPhysicalId)) {
					successorInfo.put(SUCCESSOR_PHYSICAL_ID,dependencyPhysicalId);
					successorInfo.put(SUCCESSOR_TASK_PROJCT_PHYSICALID,successorTaskProjectPhysicalId);
					successorInfo.put(ProgramCentralConstants.SELECT_SUCCESSOR_TYPES,successorType);
					successorInfo.put(ProgramCentralConstants.SELECT_SUCCESSOR_LAG_TIMES,lagTime);
					successorInfo.put(ProgramCentralConstants.SELECT_SUCCESSOR_LAG_TIME_INPUT_UNIT,lagUnit);
					successorInfo.put(ProgramCentralConstants.SELECT_SUCCESSOR_PHYSICAL_IDS,successorPhysicalId);
					successorInfo.put(ProgramCentralConstants.SELECT_SUCCESSOR_TASK_NAME,successorName);
					
					successorInfoMapList.add(successorInfo);
				}
			}
		}
		return successorInfoMapList;
	}
	
	MapList getExternalProjects(Context context, Map<String, String> paramMap){
		MapList externalProjectMapList = new MapList();
		try {
			String strProjectId = (String) paramMap.get("projectId");
			externalProjectMapList = (MapList) JPO.invoke(context, "emxProjectSpace", null,
														  "getActiveProjects", JPO.packArgs(paramMap),MapList.class);

			Iterator itr = externalProjectMapList.iterator();
			while (itr.hasNext()) {
				Map mpExcludeProject = (Map) itr.next();

				String id = (String) mpExcludeProject.get(DomainConstants.SELECT_ID);
				if (strProjectId.equals(id)) {
					externalProjectMapList.remove(mpExcludeProject);
					itr = externalProjectMapList.iterator();
				}

				String strType = (String) mpExcludeProject.get(DomainConstants.SELECT_TYPE);
				if (DomainConstants.TYPE_PROJECT_CONCEPT.equals(strType)) {
					externalProjectMapList.remove(mpExcludeProject);
					itr = externalProjectMapList.iterator();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return externalProjectMapList;
	}

JsonObjectBuilder getExternalProjectTaskId(Context context, Map<String, String> paramMap){
	JsonObjectBuilder jsonQueryBuilder = Json.createObjectBuilder();
	try {
		String extProjectName = (String) paramMap.get("extProjectName");
		String fromSequenceId = (String) paramMap.get("fromSequenceId");
		String rootNodePhysicalId = (String) paramMap.get("rootNodePhysicalId");
		String isInternal = (String) paramMap.get("isInternal");
		String needTaskName = (String) paramMap.get("needTaskName");
		
		StringList busSelects = new StringList(2);
    	busSelects.add(ProgramCentralConstants.SELECT_ID);
    	busSelects.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
    	busSelects.add(ProgramCentralConstants.SELECT_PHYSICALID);
    	
    	String busWhere = "";
    		busWhere = "name=='"+extProjectName+"'";
    	
		String typePattern = ProgramCentralConstants.TYPE_PROJECT_SPACE + "," + ProgramCentralConstants.TYPE_PROJECT_CONCEPT;
		MapList projectList = DomainObject.findObjects(context, typePattern, "*", "*", "*",DomainConstants.QUERY_WILDCARD, busWhere, true, busSelects);
		int projectListSize = projectList.size();
		if(projectListSize==0){
			jsonQueryBuilder.add("success","404");
		}else{
			String taskID = "";
			Map project = new HashMap();
			if(projectListSize==1){
				project = (Map) projectList.get(0);
			}else{
				for(int i=0; i<projectListSize; i++){
					Map mpProject = (Map) projectList.get(i);
					if("true".equalsIgnoreCase(isInternal)){
						if(rootNodePhysicalId.equalsIgnoreCase((String)mpProject.get(ProgramCentralConstants.SELECT_PHYSICALID))){
							project = mpProject;
							break;
						}
					}else if(!rootNodePhysicalId.equalsIgnoreCase((String)mpProject.get(ProgramCentralConstants.SELECT_PHYSICALID))){
						project = mpProject;
						break;
					}
				}
			}
		
			String projectId = (String)project.get(ProgramCentralConstants.SELECT_ID);
			String projectPALId = (String)project.get(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
			String projectPhyId = (String)project.get(ProgramCentralConstants.SELECT_PHYSICALID);
			ProjectSequence extps = new ProjectSequence(context, projectPALId);
			Map<String,Dataobject>  extSequenceData = extps.getSequenceData(context);
			Set<String> keys = extSequenceData.keySet();

			for (String key : keys) {
				String seqID = (String) extSequenceData.get(key).getDataelements().get(ProgramCentralConstants.KEY_SEQ_ID);
				if(seqID.equalsIgnoreCase(fromSequenceId)){
					taskID = key;
					break;
					}
				}
				if(ProgramCentralUtil.isNullString(taskID)){
					jsonQueryBuilder.add("success","404");
				}else{
					jsonQueryBuilder.add("success","200");
					jsonQueryBuilder.add("taskId",taskID);
					jsonQueryBuilder.add("projectPhyId",projectPhyId);
					
					if("true".equalsIgnoreCase(needTaskName)) {
						String mqlQueryString = "print bus $1 select $2 dump";
    					String taskName = MqlUtil.mqlCommand(context, mqlQueryString, true, taskID, "name");
    					jsonQueryBuilder.add("taskName",taskName);
					}
				}
		}
		
	} catch (Exception e) {
		e.printStackTrace();
		jsonQueryBuilder.add("success","404");
	}
	return jsonQueryBuilder;
}
//======================= API to return last Sequence ID for a Project .
JsonObjectBuilder getExternalProjectLastSequenceId(Context context, Map<String, String> paramMap){
	JsonObjectBuilder jsonQueryBuilder = Json.createObjectBuilder();
	try {
		String projectId = (String) paramMap.get("projectId");
		String lastSeq = "0";
		StringList busSelects = new StringList();
    	busSelects.add(ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);
			DomainObject project = new DomainObject(projectId);
			String projectPALId = (String)project.getInfo(context, ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_PROJECT);

			ProjectSequence extps = new ProjectSequence(context, projectPALId);
			Map<String,Dataobject>  extSequenceData = extps.getSequenceData(context);
			Set<String> keys = extSequenceData.keySet();

			for (String key : keys) {
				String seqID = (String) extSequenceData.get(key).getDataelements().get(ProgramCentralConstants.KEY_SEQ_ID);
				if(Integer.parseInt(seqID)>=Integer.parseInt(lastSeq)){
					lastSeq = seqID;
				}
			}	
				if(ProgramCentralUtil.isNullString(lastSeq)){
					jsonQueryBuilder.add("success","404");
				}else{
					jsonQueryBuilder.add("success","200");
					jsonQueryBuilder.add("lastSequence",lastSeq);
				}
		
	} catch (Exception e) {
		e.printStackTrace();
		jsonQueryBuilder.add("success","404");
	}
	return jsonQueryBuilder;
}
//==
%>

<%

//In absence of below code, IE caches and shows old data of filter, this does not allow IE to 
//cache the filter data and show latest data.
response.addHeader("Pragma", "no-cache");
response.addHeader("Cache-Control", "no-cache");
response.addHeader("Cache-Control", "must-revalidate");
response.addHeader("Expires", "Mon, 8 Aug 2006 10:00:00 GMT");

String outPutString = DomainConstants.EMPTY_STRING;

try {
	String mode = emxGetParameter(request,"mode");
	String objectId = emxGetParameter(request,"objectId");
	String language = emxGetParameter(request,"language");
	
	if ("full".equalsIgnoreCase(mode)) {
		GanttChart ganttChart = new GanttChart(context,request);
		outPutString = ganttChart.load();
		
	} else if("cacheTaskChangeData".equalsIgnoreCase(mode)) {
		GanttChart ganttChart = new GanttChart(context,request);
		String queryString = request.getQueryString();
		ganttChart.cacheTaskChangeData(queryString);		
		
	} else if("cacheDependencyChangeData".equalsIgnoreCase(mode)) {
		JsonObjectBuilder jsonQueryBuilder = Json.createObjectBuilder();
		Enumeration nameEnumration = emxGetParameterNames(request);
		while(nameEnumration.hasMoreElements()){
			Object obj = nameEnumration.nextElement();
			String key = (String)obj;
			String value = emxGetParameter(request,key);
			jsonQueryBuilder.add(key, value);				
		}		
		JsonObject queryStringPayLoad =jsonQueryBuilder.build();		
		
		JsonReader jsonReader = Json.createReader(request.getReader());
		JsonArray requestPayload = jsonReader.readArray();
		jsonReader.close();
		
		GanttChart ganttChart = new GanttChart(context,request);
		ganttChart.cacheDependencyData(requestPayload,queryStringPayLoad);
		
	} else if("cacheCustomColumn".equalsIgnoreCase(mode)) {

		String queryString = request.getQueryString();

		GanttChart ganttChart = new GanttChart(context,request);
		Object object = ganttChart.cacheCustomColumnData(queryString);
		
	} else if("saveData".equalsIgnoreCase(mode)) {
		GanttChart ganttChart = new GanttChart(context,request);
		List<Map<String,Map>> startDateMapList  = (List<Map<String,Map>>)session.getAttribute("startDateMapList");
		List<Map<String,Map>> finishDateMapList = (List<Map<String,Map>>)session.getAttribute("finishDateMapList");
		List<Map<String,Map>> durationMapList 	= (List<Map<String,Map>>)session.getAttribute("durationMapList");
		List<Map<String,Map>> dependencyMapList = (List<Map<String,Map>>)session.getAttribute("dependencyMapList");
		
		MapList customColumnMapList = (MapList)session.getAttribute("customColumnMapList");
		
		Map allDataMap = new HashMap();
		allDataMap.put("startDateMapList",startDateMapList);
		allDataMap.put("finishDateMapList",finishDateMapList);
		allDataMap.put("durationMapList",durationMapList);
		allDataMap.put("dependencyMapList",dependencyMapList);
		allDataMap.put("taskIdToOrderJSONStr", request.getParameter("taskIdToOrderJSONStr"));
		
		session.removeAttribute("durationMapList");
		session.removeAttribute("startDateMapList");
		session.removeAttribute("finishDateMapList");
		session.removeAttribute("dependencyMapList");
		session.removeAttribute("customColumnMapList");
		
        request.getParameterNames();	
		JsonObjectBuilder jsonQueryBuilder = Json.createObjectBuilder();
		
		Enumeration en = request.getParameterNames();
		while(en.hasMoreElements()){
			Object obj = en.nextElement();
			String key = (String)obj;
			String value = request.getParameter(key);
			jsonQueryBuilder.add(key, value);				
		}		
			
		JsonObject queryStringPayLoad =jsonQueryBuilder.build();		
		JsonReader jsonReader = Json.createReader(request.getReader());
		JsonObject requestPayload = jsonReader.readObject();
		jsonReader.close();

		JsonObjectBuilder syncRequestPayloadBuilder = Json.createObjectBuilder();
		
		syncRequestPayloadBuilder.add("requestPayload", requestPayload);
		syncRequestPayloadBuilder.add("queryStringPayLoad", queryStringPayLoad);
		
		outPutString = ganttChart.sync(allDataMap, customColumnMapList, syncRequestPayloadBuilder.build()).toString();
		
	} else if("resetData".equalsIgnoreCase(mode)) {
		
		List<Map<String,Map>> startDateMapList  = (List<Map<String,Map>>)session.getAttribute("startDateMapList");
		List<Map<String,Map>> finishDateMapList = (List<Map<String,Map>>)session.getAttribute("finishDateMapList");
		List<Map<String,Map>> durationMapList 	= (List<Map<String,Map>>)session.getAttribute("durationMapList");
		List<Map<String,Map>> dependencyMapList = (List<Map<String,Map>>)session.getAttribute("dependencyMapList");
		
		if(startDateMapList == null && finishDateMapList == null && durationMapList == null && dependencyMapList == null) {
			outPutString="false";
		} else {
			session.removeAttribute("durationMapList");
			session.removeAttribute("startDateMapList");
			session.removeAttribute("finishDateMapList");
			session.removeAttribute("dependencyMapList");
			outPutString = "true";	
		}
		
	} else if("basic".equalsIgnoreCase(mode)) {
		GanttChart ganttChart = new GanttChart(context,request);
		MapList taskInfoMapList = (MapList) session.getAttribute("objectList");
		outPutString = ganttChart.load(taskInfoMapList);
		
	} /* else if("loadFieldString".equalsIgnoreCase(mode)) {
		GanttChart ganttChart = new GanttChart(context,request);
		out.clear();		
		response.setContentType("application/json;charset=UTF-8");
		JsonArray fieldArray = ganttChart.getFieldNameTypeString();
		out.write(fieldArray.toString());
		return;
		
	} */ else if("loadcolumnLabelDataIndexValueMap".equalsIgnoreCase(mode)) {
		GanttChart ganttChart = new GanttChart(context,request);
		out.clear();
		response.setContentType("application/json;charset=UTF-8");
		JsonArray fieldArray = ganttChart.getColumnArray();
		out.write(fieldArray.toString());
		return;
		
	} else if("getInfra".equalsIgnoreCase(mode)) {
		GanttChart ganttChart = new GanttChart(context,request);
		out.clear();
		response.setContentType("application/json;charset=UTF-8");
		JsonObject infra = ganttChart.getInfra(context);
		out.write(infra.toString());
		return;
		
	} else if("preDeleteCheck".equalsIgnoreCase(mode)) {
		out.clear();		
		response.setContentType("application/json;charset=UTF-8");
		GanttChart ganttChart = new GanttChart(context,request);
		JsonObject jsonObjresponse = ganttChart.preDeleteCheck();
		out.write(jsonObjresponse.toString());
		return; 
	} else if("getExternalProjectsName".equalsIgnoreCase(mode)) {
		out.clear();		
		response.setContentType("application/json;charset=UTF-8");
		
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("projectId", objectId);
		List<Map<String, String>> externalProjectMapList = getExternalProjects(context, paramMap);
		JsonArrayBuilder externalProjectNameArr = Json.createArrayBuilder();
		for(Map<String, String> externalProjectMap : externalProjectMapList) {
			String extProjectName = externalProjectMap.get(ProgramCentralConstants.SELECT_NAME);
			externalProjectNameArr.add(extProjectName);
		}
		out.write(externalProjectNameArr.build().toString());
		return; 
	} else if("getCriticalTasks".equalsIgnoreCase(mode)){
		GanttChart ganttChart = new GanttChart(context,request);
		JsonArray jsonArray = ganttChart.getCriticalTasks(context);
		out.write(jsonArray.toString());
		return;
	} 

else if("getAssignments".equalsIgnoreCase(mode)){
	String taskId = emxGetParameter(request, "taskId");
	String taskProjectId = emxGetParameter(request, "taskProjectId");
	String projectStart = emxGetParameter(request, "projectStart");
	String projectEnd = emxGetParameter(request, "projectEnd");
	GanttChart ganttChart = new GanttChart(context, request);
		try {
			Map selectedTaskInfo = new HashMap();
			selectedTaskInfo.put(ProgramCentralConstants.SELECT_ID, taskId);
			selectedTaskInfo.put(ProgramCentralConstants.SELECT_PROJECT_ID, taskProjectId);
			selectedTaskInfo.put("Project Start", projectStart);
			selectedTaskInfo.put("Project End", projectEnd);
			JsonObject json = ganttChart.getAssignments(context, selectedTaskInfo);
			out.write(json.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return;
	} else if("getResources".equalsIgnoreCase(mode)){
		String resourceName = emxGetParameter(request, "query");
		GanttChart ganttChart = new GanttChart(context, request);
		try {
			JsonObject json = ganttChart.getResources(context, resourceName);
			out.write(json.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return;
	} else if("assign".equalsIgnoreCase(mode)){
		String taskId = emxGetParameter(request, "taskId");
		String resourceId = emxGetParameter(request, "resourceId");
		String taskProjectId = emxGetParameter(request, "taskProjectId");
		String projectStart = emxGetParameter(request, "projectStart");
		String projectEnd = emxGetParameter(request, "projectEnd");

		Map selectedTaskInfo = new HashMap();
		selectedTaskInfo.put(ProgramCentralConstants.SELECT_ID, taskId);
		selectedTaskInfo.put(ProgramCentralConstants.SELECT_PROJECT_ID, taskProjectId);
		selectedTaskInfo.put("Project Start", projectStart);
		selectedTaskInfo.put("Project End", projectEnd);

		GanttChart ganttChart = new GanttChart(context, request);
		JsonObject json = ganttChart.assign(context, selectedTaskInfo, resourceId);
		out.write(json.toString());
		return;
	} else if("getExternalProjectsTaskId".equalsIgnoreCase(mode)) {
		out.clear();		
		response.setContentType("application/json;charset=UTF-8");
		String extProjectName = emxGetParameter(request,"extProjectName");
		String fromSequenceId = emxGetParameter(request,"fromSequenceId");
		String rootNodePhysicalId = emxGetParameter(request,"rootNodePhysicalId");
		String isInternal = emxGetParameter(request,"isInternal");
		String needTaskName = emxGetParameter(request,"needTaskName");
		
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("extProjectName", extProjectName);
		paramMap.put("fromSequenceId", fromSequenceId);
		paramMap.put("rootNodePhysicalId", rootNodePhysicalId);
		paramMap.put("isInternal", isInternal);
		paramMap.put("needTaskName", needTaskName);
		
		JsonObjectBuilder jsonObjResponse = getExternalProjectTaskId(context, paramMap);

		out.write(jsonObjResponse.build().toString());
		return; 
	}	else if("getProjectsLastSeq".equalsIgnoreCase(mode)) {
		out.clear();		
		response.setContentType("application/json;charset=UTF-8");
		String projectId = emxGetParameter(request,"projectId");
		
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("projectId", projectId);
		
		JsonObjectBuilder jsonObjResponse = getExternalProjectLastSequenceId(context, paramMap);

		out.write(jsonObjResponse.build().toString());
		return; 
	}else if("getCustomizationFlag".equalsIgnoreCase(mode)) {
		out.clear();		
		response.setContentType("application/json;charset=UTF-8");
		boolean isCustomizedEnvironment = (Boolean)JPO.invoke(context,"emxGantt",null,"getCustomizationFlag",JPO.packArgs(""),Boolean.class);		
		JsonObjectBuilder jsonObjResponse = Json.createObjectBuilder();
		jsonObjResponse.add("isCustomizedEnvironment",isCustomizedEnvironment);		
		out.write(jsonObjResponse.build().toString());
		return; 
	} else if("getSuccesorTaskInfo".equalsIgnoreCase(mode)) {
		out.clear();		
		response.setContentType("application/json;charset=UTF-8");
		String taskId = emxGetParameter(request,"taskId");
		String taskName = emxGetParameter(request,"taskName");
		String taskSequenceId = emxGetParameter(request,"taskSequenceId");
		String taskProjectId = emxGetParameter(request,"taskProjectId");
		String ss = emxGetParameter(request,"clientDepCount");
		int clientDepCount = Integer.parseInt(ss);
		
		//please DON'T change order of selectable added into the list. 
		List<String> successorSelectList = new ArrayList<String>();
		successorSelectList.add(taskId);
		successorSelectList.add(SUCCESSOR_PHYSICAL_ID);
		successorSelectList.add(ProgramCentralConstants.SELECT_PHYSICALID);
		successorSelectList.add(SUCCESSOR_TASK_PROJCT_PHYSICALID);
		successorSelectList.add(ProgramCentralConstants.SELECT_SUCCESSOR_TYPES);
		successorSelectList.add(ProgramCentralConstants.SELECT_SUCCESSOR_LAG_TIMES);
		successorSelectList.add(ProgramCentralConstants.SELECT_SUCCESSOR_LAG_TIME_INPUT_UNIT);
		successorSelectList.add(ProgramCentralConstants.SELECT_SUCCESSOR_PHYSICAL_IDS);
		successorSelectList.add(ProgramCentralConstants.SELECT_SUCCESSOR_TASK_NAME);
		successorSelectList.add("@");
		
        String successorInfoQMLQuery = "print bus $1 select $2 $3 $4 $5 $6 $7 $8 $9 dump $10";
       	String palMQLQuery 			 = "print bus $1 select $2 dump $3";
        
       	JsonArrayBuilder dependencyArray = Json.createArrayBuilder();
       
       	try {
        	String successorInfoString 	=  MqlUtil.mqlCommand(context,successorInfoQMLQuery,successorSelectList);
        	String[] firstSplitArray 	= successorInfoString.split(taskId);

			if(firstSplitArray == null || firstSplitArray.length < 2) {
    			//RETURN if no successor exists in database.
    			JsonObjectBuilder jsonResponseBuilder = Json.createObjectBuilder();
    			jsonResponseBuilder.add("success","200");
    			out.write(jsonResponseBuilder.build().toString());
    			return;
    		} else {
    			String[] dependencyIdArray 	= firstSplitArray[0].split("@");
    			int successorCount 			= dependencyIdArray.length;
    			
    			//RETURN if count of successors present in client and in database are same.
    			if(successorCount == clientDepCount) {
    				JsonObjectBuilder jsonResponseBuilder = Json.createObjectBuilder();
        			jsonResponseBuilder.add("success","200");
        			out.write(jsonResponseBuilder.build().toString());
        			return;
    			}
    		}
			
        	//Map<String,Map<String,String>> mapOfSuccessorInfoMap = getSuccessorInfoMap(context, taskId, taskProjectId, successorInfoString);
        	List<Map<String,String>> successorInfoMapList = 
        			getSuccessorInfoMapList(context, taskId, taskProjectId, successorInfoString);
        	
        	//Create list of successor task ids, there could be duplicate entries
        	//as we do support multiple dependencies between same 2 tasks.
        	List<String> successorPhysicalIdList = new ArrayList<String>();
        	for(Map<String,String> successorInfoMap : successorInfoMapList) {
        		successorPhysicalIdList.add(successorInfoMap.get(ProgramCentralConstants.SELECT_SUCCESSOR_PHYSICAL_IDS));
        	}
        	
        	String taskPALId =  MqlUtil.mqlCommand(context,palMQLQuery, taskId, 
        										   ProgramCentralConstants.SELECT_PAL_PHYSICALID_FROM_TASK,
        										   "|");
        	
        	if(ProgramCentralUtil.isNotNullString(taskPALId)) {
        		
        		Map<String,String> DEPENDENCY_TYPE_NUMBER_MAPPING = new HashMap<String,String>();
        		DEPENDENCY_TYPE_NUMBER_MAPPING.put("SS","0");
        		DEPENDENCY_TYPE_NUMBER_MAPPING.put("SF","1");
        		DEPENDENCY_TYPE_NUMBER_MAPPING.put("FS","2");
        		DEPENDENCY_TYPE_NUMBER_MAPPING.put("FF","3");
        		
        		//Load Sequence Id and WBS Id of the structure.
	         	ProjectSequence projectSequence = new ProjectSequence(context, taskPALId);
	         	Map<String,Dataobject>  projectSequenceData = projectSequence.getSequenceData(context);
				Set<String> taskPhysicalIdSet = projectSequenceData.keySet();
				
				int counter = 0;
				for (String taskPhysicalId : taskPhysicalIdSet) {
					if(successorPhysicalIdList.contains(taskPhysicalId)) {
						
						DataelementMap dataElementMap	= projectSequenceData.get(taskPhysicalId).getDataelements();
						String taskSeqNumber 		 	= (String)dataElementMap.get(ProgramCentralConstants.KEY_SEQ_ID);
						String taskWBS  			 	= (String)dataElementMap.get(ProgramCentralConstants.KEY_WBS_ID);
						
						//Iterate over all successors for 'taskPhysicalId' as
						//there could be multiple dependencies of this task with 'successorTaskId'.
						for(int i=0, size = successorInfoMapList.size(); i<size; i++) {
							
							Map<String,String> successorInfoMap = successorInfoMapList.get(i);
							String successorTaskId 	 = successorInfoMap.get(ProgramCentralConstants.SELECT_SUCCESSOR_PHYSICAL_IDS);
							//For dependency if task id and successor task id matches.
							if(!taskPhysicalId.equalsIgnoreCase(successorTaskId)) {
								continue;
							}
							JsonObjectBuilder dependencyBuilder = Json.createObjectBuilder();
							
							String dependencyId 	 = successorInfoMap.get(SUCCESSOR_PHYSICAL_ID);
							String dependencyType 	 = successorInfoMap.get(ProgramCentralConstants.SELECT_SUCCESSOR_TYPES);
							String lag 				 = successorInfoMap.get(ProgramCentralConstants.SELECT_SUCCESSOR_LAG_TIMES);
							String lagUnit 			 = successorInfoMap.get(ProgramCentralConstants.SELECT_SUCCESSOR_LAG_TIME_INPUT_UNIT);
							String successorTaskName = successorInfoMap.get(ProgramCentralConstants.SELECT_SUCCESSOR_TASK_NAME);
							
							dependencyBuilder.add("Id", dependencyId);
							
							dependencyBuilder.add("From", taskId);
							dependencyBuilder.add("predTaskSeqNumber", Integer.parseInt(taskSequenceId));
							dependencyBuilder.add("predecessorTaskName", taskName);
							dependencyBuilder.add("predProjectId", taskProjectId);
							
							dependencyBuilder.add("type",DEPENDENCY_TYPE_NUMBER_MAPPING.get(dependencyType));
							dependencyBuilder.add("Lag", Double.parseDouble(lag));
							dependencyBuilder.add("LagUnit", lagUnit);
	
							dependencyBuilder.add("To", successorTaskId);
							dependencyBuilder.add("taskSeqNumber", Integer.parseInt(taskSeqNumber));
							dependencyBuilder.add("taskWBS", taskWBS);
							dependencyBuilder.add("successorTaskName", successorTaskName);
							dependencyBuilder.add("predProjectId", taskProjectId);
							
							dependencyArray.add(dependencyBuilder.build());
							counter++;
						}
						//break if it is done for all successor tasks.
						if(counter >= successorPhysicalIdList.size()) {
							break;
						}
					}
				} 
        	}
        } catch (Exception e){
        	e.printStackTrace();
        }
        out.write(dependencyArray.build().toString());
		return; 
	} 
} catch(Exception e) {
	e.printStackTrace();
}
%>
<%=outPutString %> <%--XSSOK--%>
