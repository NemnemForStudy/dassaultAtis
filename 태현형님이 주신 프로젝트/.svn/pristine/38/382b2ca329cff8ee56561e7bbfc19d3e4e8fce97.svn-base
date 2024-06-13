/*
 *  emxProjectFolder.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 * static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.7.2.2 Thu Dec  4 07:56:10 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.7.2.1 Thu Dec  4 01:55:03 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.7 Wed Oct 22 15:50:28 2008 przemek Experimental przemek $
 */
import matrix.db.*;
import matrix.util.MatrixException;
import matrix.util.StringList;

import java.lang.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

import org.apache.commons.lang3.StringUtils;

import com.matrixone.apps.common.UserTask;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.CacheUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.PMCWorkspaceVault;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
/**
 * @version PMC 10-6 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxProjectFolder_mxJPO extends emxProjectFolderBase_mxJPO
{
    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since PMC 10-6
     */
    public emxProjectFolder_mxJPO (Context context, String[] args)
        throws Exception
    {
        super(context, args);
    }

	@Override
	public Map createNewFolder(Context context, String[] args) throws Exception {
//		com.matrixone.apps.common.WorkspaceVault workspaceVault =
//		(com.matrixone.apps.common.WorkspaceVault) DomainObject.newInstance(context,
//				DomainConstants.TYPE_WORKSPACE_VAULT);
//com.matrixone.apps.common.WorkspaceVault workspaceVaultSource =
//		(com.matrixone.apps.common.WorkspaceVault) DomainObject.newInstance(context,
//				DomainConstants.TYPE_WORKSPACE_VAULT);

// To use WorkspaceVault from Modeler
com.dassault_systemes.enovia.workspace.modeler.WorkspaceVault workspaceVault =
		(com.dassault_systemes.enovia.workspace.modeler.WorkspaceVault) DomainObject.newInstance(context,
				DomainConstants.TYPE_WORKSPACE_VAULT, DomainConstants.WORKSPACEMDL);
com.dassault_systemes.enovia.workspace.modeler.WorkspaceVault workspaceVaultSource =
		(com.dassault_systemes.enovia.workspace.modeler.WorkspaceVault) DomainObject.newInstance(context,
				DomainConstants.TYPE_WORKSPACE_VAULT, DomainConstants.WORKSPACEMDL);

Map returnMap = new HashMap();
try{
	Map programMap = JPO.unpackArgs(args);
	
	String relationship 		= DomainConstants.RELATIONSHIP_PROJECT_VAULTS;
	
	// Created objects Id
	String objectId 			= (String) programMap.get("objectId");
	String selectedType 		= (String) programMap.get("TypeActual");
	//String strFolderName 		= (String) programMap.get("Name");
	String strFolderName 		= DomainObject.EMPTY_STRING;
	String strFolderTitle 		= (String) programMap.get("Title");
	String selectedPolicy 		= (String) programMap.get("Policy");
	String strDescription 		= (String) programMap.get("Description");
	String inheritedAccessType	= (String) programMap.get("AccessType");
	String numberOf     		= (String) programMap.get("NumberOf");
	//String autonameCheck 		= (String) programMap.get("autoNameCheck");
	String autonameCheck 		= "true";
	//Identify operation is clone or create bookmark
	String isClone 				= (String) programMap.get("IsClone");
	boolean isCloneOperation 	=  "true".equalsIgnoreCase(isClone); 
	
	// Added by hslee on 2023.07.31 --- [s]
	if ( StringUtils.isEmpty( inheritedAccessType ) )
	{
		inheritedAccessType = "Inherited";
	}
	// Added by hslee on 2023.07.31 --- [e]
	
	//Create new task
    int count = 1;
    try{
    	count = Integer.parseInt(numberOf);
	}catch(Exception e){
		count = 1;
	}
    
	// if count is > 1 and autonameCheck=true we need to autoname the folders
    boolean isAutoNameCheck = false;
    if ((count == 1  && "true".equalsIgnoreCase(autonameCheck)) || count > 1){
    	isAutoNameCheck = true;
    }
    
	String emxTableRowId	= (String) programMap.get("emxTableRowIds");
	String rowId 			= DomainObject.EMPTY_STRING;
	String sParsedObjectId 	= DomainObject.EMPTY_STRING;
	String projectID 		= DomainObject.EMPTY_STRING;
	String sParsedParentObjId = DomainObject.EMPTY_STRING;
	
	
	//if Row is not selected then consider as root node with rowId=0			
	if(emxTableRowId.equals("") || emxTableRowId.equals(null)){
		rowId="0";
		projectID =(String) programMap.get("parentOID");
    }else{
    	Map rowIdMap = ProgramCentralUtil.parseTableRowId(context, emxTableRowId);
    	sParsedObjectId 	= (String)rowIdMap.get("objectId"); //selected object as Parent for creation
    	sParsedParentObjId	= (String)rowIdMap.get("parentOId"); //selected object as Parent for clone 
		rowId 				= (String)rowIdMap.get("rowId"); // selected object rowId	
		
		if(ProgramCentralUtil.isNullString(sParsedParentObjId)){
			sParsedParentObjId = (String) rowIdMap.get("objectId");
			projectID = UserTask.getProjectId(context, sParsedParentObjId);
			if(ProgramCentralUtil.isNullString(sParsedParentObjId)){
				projectID = sParsedParentObjId;
			}
		}else{
			projectID = UserTask.getProjectId(context, sParsedParentObjId);
		}
    }
	/*
	 * if object is selected for creation then use parsed emxtablerow id for getting parent object for revision
	 * if no object selected then use tree as parent and for getting the revision 
	 */
	String strObjectId = DomainObject.EMPTY_STRING;
	String revision = DomainObject.EMPTY_STRING;
	
	if(ProgramCentralUtil.isNotNullString(sParsedParentObjId)){
		if(isCloneOperation){
			strObjectId = sParsedParentObjId;
		}else{
			strObjectId = sParsedObjectId;
		}
	}else if(programMap.containsKey("parentOID")){
		strObjectId = (String) programMap.get("parentOID");
	}else{
		strObjectId = (String) programMap.get("objectId");
	}
	
    StringList newFolderIdList 	= new StringList();
    
    if(ProgramCentralUtil.isNotNullString(strObjectId)){
	
			JsonObjectBuilder folderInfoBuilder 		= Json.createObjectBuilder();
			DomainObject parentObject 	= DomainObject.newInstance(context, strObjectId);

			PMCWorkspaceVault folder = new PMCWorkspaceVault();

			Map parentObjectInfoMap 	= parentObject.getInfo(context, new StringList(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT));
			String isWorkspaceVault 	= (String)parentObjectInfoMap.get(ProgramCentralConstants.SELECT_IS_WORKSPACE_VAULT);
			
			if("true".equalsIgnoreCase(isWorkspaceVault)){
				relationship = DomainConstants.RELATIONSHIP_SUB_VAULTS;
			}
			
			if(!isAutoNameCheck && UIUtil.isNotNullAndNotEmpty(strFolderName)){
				folderInfoBuilder.add("folderName", strFolderName);
			}
			
			if(UIUtil.isNullOrEmpty(strFolderTitle)){
				strFolderTitle = DomainConstants.EMPTY_STRING;
			}
			folderInfoBuilder.add("autonameCheck", String.valueOf(isAutoNameCheck));
			folderInfoBuilder.add("parentId", strObjectId);
			folderInfoBuilder.add("folderType", selectedType);
			folderInfoBuilder.add("folderToAdd", String.valueOf(count));
			folderInfoBuilder.add("folderAccessType", inheritedAccessType);
			folderInfoBuilder.add("isWorkspaceVault", isWorkspaceVault);
			folderInfoBuilder.add("relationship", relationship);
			folderInfoBuilder.add("rowId", rowId);
			folderInfoBuilder.add("policy", selectedPolicy);
			folderInfoBuilder.add("folderTitle", strFolderTitle);
			
			JsonObject folderInfo = folderInfoBuilder.build();
			// Below changes are to use create method from WorkspaceVault instead of PMCWorkspaceVault.
			//newFolderIdList = folder.create(context,folderInfo);

			boolean promoteToInWork = false;
			if(DomainConstants.POLICY_PROJECT.equals(selectedPolicy)) {
				promoteToInWork = true;
			}else {
				promoteToInWork = false;
			}
			for(int i=0;i<count;i++){
			 		Map attributes = new HashMap();
			 		attributes.put(ProgramCentralConstants.ATTRIBUTE_TITLE,strFolderTitle);
			 		if(ProgramCentralUtil.isNotNullString(inheritedAccessType)) {
			 			attributes.put(DomainObject.ATTRIBUTE_ACCESS_TYPE, inheritedAccessType);
			 		}
			 		
			 		if("true".equalsIgnoreCase(isWorkspaceVault)){
			 			//com.dassault_systemes.enovia.workspace.modeler.WorkspaceVault parentWorkspaceVault = new com.dassault_systemes.enovia.workspace.modeler.WorkspaceVault(parentObject);
			 			workspaceVault.setId(parentObject.getObjectId());
			 			workspaceVault = workspaceVault.createSubVault(context, selectedType, strFolderName, selectedPolicy, attributes, strDescription, promoteToInWork);
					}else {
						workspaceVault.create(context,selectedType,strFolderName,selectedPolicy,parentObject,attributes,strDescription,promoteToInWork);
					    }
			
			 		String sFolderId = workspaceVault.getObjectId();
			 		returnMap.put("id", sFolderId);
			 		
			 		newFolderIdList.add(sFolderId);
			}
			
				MapList newFolderInfoList = new MapList();
			
			if(!newFolderIdList.isEmpty()){
				for ( Object obj: newFolderIdList) {
					Map newFolderInfoMap = new HashMap();
                    String sFolderId = (String) obj;
                    DomainObject objFolder 	= DomainObject.newInstance(context, sFolderId);
                    
                    StringList busSelect  = new StringList(2);
    				busSelect.addElement(DomainObject.SELECT_NAME);
    				busSelect.addElement(ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);

                    Map folderInfoMap = objFolder.getInfo(context, busSelect);
					
                    String sFolderName = (String) folderInfoMap.get(DomainConstants.SELECT_NAME);
					String sContFolderTitle = (String)folderInfoMap.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);
					
					newFolderInfoMap.put("sFolderId", sFolderId);
					newFolderInfoMap.put("sFolderName", sFolderName);
					newFolderInfoMap.put("sContFolderTitle", sContFolderTitle);
					
					newFolderInfoList.add(newFolderInfoMap);
					returnMap.put("id", sFolderId);
				}
			}
			
			//PostProcess actions logic
			//Commented for FUN112344 to avoid modification of name and revision of object.
			/* try
			{
				if(ProgramCentralUtil.isNotNullString(strObjectId)) {
					String sCommandStatement = "print bus $1 select $2 dump $3";
					revision =  MqlUtil.mqlCommand(context, sCommandStatement,strObjectId, "physicalid", "|"); 
				}else{
					throw new IllegalArgumentException("No parent Object id is not available");
				}
			}catch( IllegalArgumentException e){
				e.printStackTrace();
				throw new IllegalArgumentException("strObjectId");
			}
			
			if (!DomainConstants.POLICY_CONTROLLED_FOLDER.equals(selectedPolicy)){
				//check: same name folder should not exist on same level
				String SELECT_FOLDER_NAME = "from[Data Vaults].to.name";
				String SELECT_FOLDER_REVISION = "from[Data Vaults].to.revision";
				String SELECT_SUB_FOLDER_NAME = "from[Sub Vaults].to.name";
				String SELECT_SUB_FOLDER_REVISION = "from[Sub Vaults].to.revision";

				StringList busSelect  = new StringList(5);
				busSelect.addElement(DomainObject.SELECT_NAME);
				busSelect.addElement(SELECT_FOLDER_NAME);
				busSelect.addElement(SELECT_FOLDER_REVISION);
				busSelect.addElement(SELECT_SUB_FOLDER_NAME);
				busSelect.addElement(SELECT_SUB_FOLDER_REVISION);
				
				BusinessObjectWithSelectList objectWithSelectList = 
						ProgramCentralUtil.getObjectWithSelectList(context, new String[]{strObjectId}, busSelect);
		
				BusinessObjectWithSelect bws 	= objectWithSelectList.getElement(0);
				String parentName 				= bws.getSelectData(DomainObject.SELECT_NAME);
				StringList folderNameList 		= bws.getSelectDataList(SELECT_FOLDER_NAME);
				StringList folderRevisionList 	= bws.getSelectDataList(SELECT_FOLDER_REVISION);

				if(folderNameList == null || folderNameList.isEmpty()){
					folderNameList 		= bws.getSelectDataList(SELECT_SUB_FOLDER_NAME);
					folderRevisionList 	= bws.getSelectDataList(SELECT_SUB_FOLDER_REVISION);
				}

				for ( Object obj: newFolderInfoList) {
                    Map newfolderInfoMap = (Map) obj;
                    
                    String newFolderId = (String)newfolderInfoMap.get("sFolderId");
					String sFolderName = (String)newfolderInfoMap.get("sFolderName");
                
                    // if autoname is not check then check: same name folder should not exist on same level
                    if (!isAutoNameCheck) {
						boolean isAllowToCreateFolder = true;
						if(folderNameList != null && folderRevisionList != null){
							for(int i=0;i<folderNameList.size();i++) {
		
								String folderName     = (String)folderNameList.get(i);
								String folderRevision = (String)folderRevisionList.get(i);
		
								if(strFolderName.equalsIgnoreCase(folderName) &&
										ProgramCentralUtil.isNotNullString(folderRevision)) {
									isAllowToCreateFolder = false;
									break;
								}
							}
						}
					
						if (isAllowToCreateFolder) {
							String sCommandStatement = " modify bus $1 name $2 revision $3";
							MqlUtil.mqlCommand(context, sCommandStatement,newFolderId, sFolderName,revision); 
						}else{
							String error = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL, 
									"emxProgramCentral.ProjectFolder.ErrorMessage", context.getSession().getLanguage());
							error = parentName +" "+error+" '"+strFolderName+"'.";
							throw new MatrixException(error);
						}
					}else{
						String sCommandStatement = " modify bus $1 name $2 revision $3";
						MqlUtil.mqlCommand(context, sCommandStatement,newFolderId, sFolderName,revision); 
			        }
				}

			}else{
				for (Object obj: newFolderInfoList) {
                    Map newFolderInfoMap = (Map) obj;
                    
                    String newFolderId = (String)newFolderInfoMap.get("sFolderId");
					String sContFolderTitle = (String)newFolderInfoMap.get("sContFolderTitle");
					
					workspaceVault.setId(newFolderId);
					if(!isAutoNameCheck){
						sContFolderTitle = workspaceVault.getUniqueName(sContFolderTitle+"_",12);
					}
					workspaceVault.setName(context,sContFolderTitle);
				}
			} */
			
			//To get Project Owner information 
            String projectOwner		= ProgramCentralConstants.EMPTY_STRING;
			DomainObject projObject = DomainObject.newInstance(context, projectID);
			Map projectInfoMap = projObject.getInfo(context, new StringList(DomainConstants.SELECT_OWNER));
			projectOwner = (String)projectInfoMap.get(DomainConstants.SELECT_OWNER);
			
			for (Object obj: newFolderInfoList) {
                Map newFolderInfoMap = (Map) obj;
                
                String newFolderId = (String)newFolderInfoMap.get("sFolderId");
                workspaceVault.setId(newFolderId);
                
                //Create inherited ownership for Template folder
    			boolean isTemplate = false;
    			if(ProgramCentralUtil.isNotNullString(strObjectId)){
    				DomainObject projectTemplate = DomainObject.newInstance(context, strObjectId);
    				isTemplate=projectTemplate.isKindOf(context, DomainObject.TYPE_PROJECT_TEMPLATE);
    				if(isTemplate){
    					 DomainAccess.createObjectOwnership(context, newFolderId, strObjectId, "");
    				}else{
    					int accessMapSize=1;
    					String loggedInUser = context.getUser();
    					String defaultAccessGrantPermission = EnoviaResourceBundle.getProperty(context, "emxComponents.WSO_Default_AccessGrant");
    					
    					Map accessMap = new HashMap(accessMapSize);
    					
    					if(!"Specific".equals(inheritedAccessType)){
    						accessMap.put(loggedInUser, "Full");
    					}
    				
    					if(("Specific".equalsIgnoreCase(inheritedAccessType)||"No".equalsIgnoreCase(inheritedAccessType))&&ProgramCentralUtil.isNotNullString(projectOwner)&&!(loggedInUser.equals(projectOwner))&&"true".equalsIgnoreCase(defaultAccessGrantPermission))
    			        {
    					   accessMap.put(projectOwner, "Full");
    					   workspaceVault.setUserPermissions(context, accessMap);
    					   
    					}
    					
    					
    				}
    			}
    			
    			//Clone bookmark folder structure for selected object using 
    			if(isCloneOperation){
    				workspaceVaultSource.setId(sParsedObjectId);
    				workspaceVault.setContentRelationshipType(DomainConstants.RELATIONSHIP_VAULTED_OBJECTS_REV2);
    				Map accessMap = new HashMap();
    				accessMap = getFolderOwnershipAccessPermissions(context,sParsedObjectId);
    				
    				workspaceVault.setUserPermissions(context, accessMap);   //TODO solved
					// To use WorkspaceVault from Modeler
    				com.dassault_systemes.enovia.workspace.modeler.WorkspaceVault.cloneStructure(context,         // context
    						workspaceVaultSource,            // source
    						workspaceVault,           // target
    						null,
    						true);  
    			}
    			
			}

			//To refresh UI with multiple created bookmark folder
			String xmlMessage = folder.refreshFolderStructure(context, parentObject, newFolderIdList, folderInfo);

			// make sure to remove cache object once refresh the structure from emxProjectManagementUtil.jsp
			CacheUtil.setCacheObject(context, "PMCBookmarkFolderRefreshXML", xmlMessage);
			CacheUtil.setCacheObject(context, "newCreatedFolderIdList", newFolderIdList); 
		}
		
	}catch (Exception e) {
		e.printStackTrace();
		throw e;
	}
	
	return returnMap;
	}
	
	/**
	 * Returns a Map<String,String> containing direct ownership for a user on specified folder object.
	 * @param context the eMatrix <code>Context</code> object
	 * @param String - folder object id.
	 * @return Map<Strin,Map> - Map of user (KEY_USER) and corresponding access (String).
	 * @throws MatrixException if operation fails
	 */
	private Map getFolderOwnershipAccessPermissions(Context context, String folderId) throws MatrixException{

		Map<String,String> userPermission = new HashMap<String,String>();
		Map<String,Map> userAccessInfo = PMCWorkspaceVault.getFolderOwnershipAccessInfo(context, folderId);
		Iterator<String> itr = userAccessInfo.keySet().iterator();
		while(itr.hasNext()){
			String userName = itr.next();
			Map map = userAccessInfo.get(userName);
			String isDirectOwner = (String)map.get(PMCWorkspaceVault.KEY_IS_DIRECT_OWNERSHIP);

			if("true".equalsIgnoreCase(isDirectOwner)){
				String access = (String)map.get(DomainAccess.KEY_ACCESS_GRANTED);
				userPermission.put(userName, access);
			}
		}
		return userPermission;
	}
    
    
}
