/* emxProgramUI.java

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   Dassault Systemes Inc.  Copyright notice is precautionary only and does
   not evidence any actual or intended publication of such program.

*/

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import com.dec.util.DecConstants;
import com.dec.util.DecStringUtil;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.DebugUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.URL;

import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

/**
 * The <code>emxProgramUI</code> class represents the HighCharts UI JPO
 * functionality.
 *
 */
public class emxProgramUI_mxJPO extends emxProgramUIBase_mxJPO
{

    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     */
    public emxProgramUI_mxJPO (Context context, String[] args)
        throws Exception
    {
        super(context, args);
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
    	busSelects.add(DecConstants.SELECT_ATTRIBUTE_DECWBSTYPE);
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
    			String sWBSType = bws.getSelectData(DecConstants.SELECT_ATTRIBUTE_DECWBSTYPE);
    			// jhlee Add 2023-07-27 Phase면서 Unit아니면 빈값
                if(DecStringUtil.equals(sTaskType, DecConstants.TYPE_PHASE) && !DecStringUtil.equalsIgnoreCase(sWBSType, "Unit")) {
                    vResult.add(DecConstants.EMPTY_STRING);
                    continue;
                }
                
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
    				// jhlee Add 2023-07-27 산춤물없으면 빈값
                    if(iNoOfDeliverables < 1) {
                        vResult.add(DecConstants.EMPTY_STRING);
                        continue;
                    }
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
							//	sbResult.append("onClick=\"javascript:callCheckout('").append(sObjectId).append("',");
							//	sbResult.append("'download', '', '', 'null', 'null', 'structureBrowser', 'PMCPendingDeliverableSummary', 'null')\">");
								// jhlee Add 2023-07-27 링크 타면 decDeliverableStatusCommand 커맨드로 이동하게 변경
								sbResult.append("onClick=\"javaScript:window.open('emxPortal.jsp?portal=decWBSFilePortal&amp;objectId=");
								sbResult.append(XSSUtil.encodeForURL(context,sOID));
								sbResult.append("&amp;suiteKey=ProgramCentral");
								sbResult.append("&amp;StringResourceFileId=emxProgramCentralStringResource&amp;showPageHeader=false");
								sbResult.append("&amp;SuiteDirectory=programcentral");
								sbResult.append("', '_blank', 'top=250,left=250,scrollbars=no,resizable=yes,width=800,height=600');\">");
								sbResult.append("<img style='vertical-align:middle;' src='../common/images/").append(sIcon).append("'");
								sbResult.append(" title=\"");
								sbResult.append(i18Type).append(" - ").append(sName).append(" - ").append(sRevision);
								sbResult.append("\" />");
		                        sbResult.append("</td>");
								break;

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
                    // jhlee Add 07-27 숫자 파일뒤로 위치 변경
                    //Show Counter Link
                    sbResult.append("<td style='vertical-align:middle;padding-right:5px;width:0px;'>");
                    sbResult.append("<div style='text-align:right;font-weight:bold;'>");

                    //To hide hyperlink for Copy From Project functionality on search Result/Preview Table
                    if("false".equalsIgnoreCase(sIsHyperlink) || isPasteOperation){
                    //	sbResult.append("'>");
	                   	sbResult.append(iTotalNoOfDeliverables);
                    }else{
	                    // if( !(slDeliverablesIsKindOfBaseline.equalsIgnoreCase("TRUE") || slDeliverablesIsKindOfExperiment.equalsIgnoreCase("TRUE")) ){
                    	// 	sbResult.append("cursor: pointer;' ");
     	                //     sbResult.append("onmouseover='$(this).css(\"color\",\"#04A3CF\");$(this).css(\"text-decoration\",\"underline\");' onmouseout='$(this).css(\"color\",\"#333333\");$(this).css(\"text-decoration\",\"none\");' ");
                        // 
     	                //     sbResult.append("onClick=\"emxTableColumnLinkClick('");
     	                //     sbResult.append("../common/emxTree.jsp?DefaultCategory=PMCDeliverableCommandPowerView&amp;objectId=").append(sOID);
     	                //     sbResult.append("', '', '', false, 'content', '', '', '', '')\">");
                    	// }
                    	// else {
                    	// 	sbResult.append("'>");
                    	// }  
                	//	sbResult.append("'>");
	                    sbResult.append("(" + iTotalNoOfDeliverables + ")");
                    }
                    sbResult.append("</div>");
                    sbResult.append("</td>");
                    
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

    public Vector getVPDocumentObjectColumn(Context context, String[] args) throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
        HashMap columnMap = (HashMap) programMap.get("columnMap");
        HashMap settings = (HashMap) columnMap.get("settings");

    	int size 		= objectList.size();
    	Vector vResult 	= new Vector(size);
        try {
    		String[] sObjIdArr = new String[size];
    		for (int i = 0; i < size; i++) {
    			Map objectMap = (Map) objectList.get(i);
            	sObjIdArr[i] = (String) objectMap.get(ProgramCentralConstants.SELECT_ID);
    		}
    		
    		StringList slbusSelects = new StringList(); 
    		slbusSelects.add(DecConstants.SELECT_TYPE);
    		slbusSelects.add("from[" + DecConstants.RELATIONSHIP_TASK_DELIVERABLE + "|to.type == '" + DecConstants.TYPE_DECVPDOCUMENT +"'].to.id");
    		
    		BusinessObjectWithSelectList bwsl = ProgramCentralUtil.getObjectWithSelectList(context, sObjIdArr, slbusSelects);
    		for (int i = 0; i < size; i++) {
    			BusinessObjectWithSelect bws = bwsl.getElement(i);
    			StringList slVPDocumentOID = bws.getSelectDataList("from[" + DecConstants.RELATIONSHIP_TASK_DELIVERABLE + "|to.type == '" + DecConstants.TYPE_DECVPDOCUMENT +"'].to.id");
    			String sObjType = bws.getSelectData(DecConstants.SELECT_TYPE);
    			int iNoOfDeliverables = slVPDocumentOID != null && !slVPDocumentOID.isEmpty()?slVPDocumentOID.size():0;
    			// jhlee Add 2023-07-27 산춤물없으면 빈값
                if(iNoOfDeliverables < 1) {
                    vResult.add(DecConstants.EMPTY_STRING);
                }else if(DecStringUtil.equals(sObjType, DecConstants.TYPE_PROJECT_SPACE)) {
                    vResult.add(DecConstants.EMPTY_STRING);
                }else {
                    StringBuilder sbResult = new StringBuilder();
                    sbResult.append("<table><tr>");
                    sbResult.append("<td ");
                    sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
                    sbResult.append("onClick=\"javaScript:window.open('emxPortal.jsp?portal=decWBSVPDocumentStatusPortal&amp;objectId=");
					sbResult.append(XSSUtil.encodeForURL(context,sObjIdArr[i]));
					sbResult.append("&amp;suiteKey=ProgramCentral");
					sbResult.append("&amp;StringResourceFileId=emxProgramCentralStringResource&amp;showPageHeader=false");
					sbResult.append("&amp;SuiteDirectory=programcentral");
					sbResult.append("', '_blank', 'top=250,left=250,scrollbars=no,resizable=yes,width=800,height=600');\">");
					sbResult.append("<img style='vertical-align:middle;' src='../common/images/iconSmallDocument.gif'");
					sbResult.append(" title=\"");
					sbResult.append("\" />");
                    sbResult.append("</td>");
                    sbResult.append("<td style='vertical-align:middle;padding-right:5px;width:0px;'>");
                    sbResult.append("<div style='text-align:right;font-weight:bold;'>");
                    sbResult.append("(" + iNoOfDeliverables + ")");
                    sbResult.append("</div>");
                    sbResult.append("</td>");
                    sbResult.append("</tr></table>");
                    vResult.add(sbResult.toString());
                }
                
    		}
        }catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    	
    	return vResult;

    }
    
    public Vector getEngineeringDocumentColumn(Context context, String[] args) throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList 	= (MapList) programMap.get("objectList");
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
        try {
    		String[] sObjIdArr = new String[size];
    		for (int i = 0; i < size; i++) {
    			Map objectMap = (Map) objectList.get(i);
            	sObjIdArr[i] = (String) objectMap.get(ProgramCentralConstants.SELECT_ID);
    		}
    		
    		StringList slbusSelects = new StringList(); 
    		slbusSelects.add(DecConstants.SELECT_TYPE);
    		slbusSelects.add("from[" + DecConstants.RELATIONSHIP_TASK_DELIVERABLE + "|to.type == '" + DecConstants.TYPE_DECDELIVERABLEDOC +"'].to.id");
    		
    		BusinessObjectWithSelectList bwsl = ProgramCentralUtil.getObjectWithSelectList(context, sObjIdArr, slbusSelects);
    		for (int i = 0; i < size; i++) {
    			BusinessObjectWithSelect bws = bwsl.getElement(i);
    			StringList slVPDocumentOID = bws.getSelectDataList("from[" + DecConstants.RELATIONSHIP_TASK_DELIVERABLE + "|to.type == '" + DecConstants.TYPE_DECDELIVERABLEDOC +"'].to.id");
    			String sObjType = bws.getSelectData(DecConstants.SELECT_TYPE);
    			int iNoOfDeliverables = slVPDocumentOID != null && !slVPDocumentOID.isEmpty()?slVPDocumentOID.size():0;
    			// jhlee Add 2023-07-27 산춤물없으면 빈값
                if(iNoOfDeliverables < 1) {
                    vResult.add(DecConstants.EMPTY_STRING);
                }else if(DecStringUtil.equals(sObjType, DecConstants.TYPE_PROJECT_SPACE)) {
                    vResult.add(DecConstants.EMPTY_STRING);
                }else {
                    StringBuilder sbResult = new StringBuilder();
                    sbResult.append("<table><tr>");
                    sbResult.append("<td ");
                    sbResult.append("style='vertical-align:middle;padding-left:1px;cursor:pointer;' ");
                    sbResult.append("onClick=\"javaScript:window.open('emxPortal.jsp?portal=decWBSDeliverableStatusPortal&amp;objectId=");
					sbResult.append(XSSUtil.encodeForURL(context,sObjIdArr[i]));
					sbResult.append("&amp;suiteKey=ProgramCentral");
					sbResult.append("&amp;StringResourceFileId=emxProgramCentralStringResource&amp;showPageHeader=false");
					sbResult.append("&amp;SuiteDirectory=programcentral");
					sbResult.append("', '_blank', 'top=250,left=250,scrollbars=no,resizable=yes,width=800,height=600');\">");
					sbResult.append("<img style='vertical-align:middle;' src='../common/images/iconSmallDocument.gif'");
					sbResult.append(" title=\"\" />");
                    sbResult.append("</td>");
                    sbResult.append("<td style='vertical-align:middle;padding-right:5px;width:0px;'>");
                    sbResult.append("<div style='text-align:right;font-weight:bold;'>");
                    sbResult.append("(" + iNoOfDeliverables + ")");
                    sbResult.append("</div>");
                    sbResult.append("</td>");
                    sbResult.append("</tr></table>");
                    vResult.add(sbResult.toString());
                }
    		}
        }catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    	
    	return vResult;

    }
}
