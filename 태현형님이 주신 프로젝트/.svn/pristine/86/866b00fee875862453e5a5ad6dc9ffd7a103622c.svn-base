// IEFTMCUtilBase.java
//
// 
// Copyright (c) 2002 MatrixOne, Inc.
// All Rights Reserved
// This program contains proprietary and trade secret information of
// MatrixOne, Inc.  Copyright notice is precautionary only and does
// not evidence any actual or intended publication of such program.

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;


import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.Pattern;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.jsystem.util.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.common.*;

import com.matrixone.MCADIntegration.server.beans.MCADMxUtil;

/**
 * The <code>IEFUtil</code> class represents the JPO for
 * obtaining the MS Office integration menus
 *
 * @version AEF 10.5 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class IEFTMCUtilBase_mxJPO 
{

/**
   * Constructs a new IEFUtil JPO object.
   *
   * @param context the eMatrix <code>Context</code> object
   * @param args an array of String arguments for this method
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */
  public IEFTMCUtilBase_mxJPO (Context context, String[] args)
      throws Exception
  {
    // Call the super constructor
    super();
  }
   
  /**
   * Get Workspaces of a the current user
   * NOTE : This function is an extract of the emxTeamMyWorkSpaceSummary.jsp
   * the code to get the id list is reused in the JPO
   *
   * Returns a maplist of the current users project ids
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */
  @com.matrixone.apps.framework.ui.ProgramCallable
   public static MapList getCurrentUserWorkspaces(Context context, String[] args) throws MatrixException
   {
     MapList workspaceList = new MapList();
     try
     {
	 com.matrixone.apps.common.Person person = com.matrixone.apps.common.Person.getPerson(context);
	 
	 //IR-858464-3DEXPERIENCER2022x : adopt behavior same as BPS to reduce bad query issue as well as to return Bookmark Roots same as WEb-UI
	 String newSecurityModel = "true";
 	try {
 		newSecurityModel = EnoviaResourceBundle.getProperty(context, "emxComponents.NewSecurityModel");
 	} catch(Exception ex) {
 		//Do nothing
 	}
 	
 	//build object-select statements
 	StringList selectTypeStmts = new StringList();
 	selectTypeStmts.add(DomainObject.SELECT_TYPE);
 	selectTypeStmts.add(DomainObject.SELECT_NAME);
 	selectTypeStmts.add(DomainObject.SELECT_ID);
 	selectTypeStmts.add(DomainObject.SELECT_DESCRIPTION);
 	selectTypeStmts.add(DomainObject.SELECT_OWNER);
 	selectTypeStmts.add(DomainObject.SELECT_CURRENT);
 	selectTypeStmts.add(DomainObject.SELECT_POLICY);
 	
 	String queryTypeWhere   = "";
 	String expandTypeWhere  = "";
 	

         //get the vaults of the Person's company
         String personVault = person.getVaultName(context);
 	//query selects
 	StringList objectSelects = new StringList();
 	objectSelects.add(DomainObject.SELECT_ID);
 	//have to include SELECT_TYPE as a select since the expand has includeTypePattern
 	objectSelects.add(DomainObject.SELECT_TYPE);
 	objectSelects.add(DomainObject.SELECT_NAME);
 	if (newSecurityModel != null && "false".equals(newSecurityModel)) {
 		// where for the query, show workspaces in the "Active" state only, and the users(roles) must have read access on the workspace.
 		queryTypeWhere = "('" + DomainObject.SELECT_CURRENT + "' == 'Active')";
 		
		expandTypeWhere = "(('" + DomainObject.SELECT_OWNER + "' == '"+person.getName()+"' || '" + DomainObject.SELECT_CURRENT + "' == 'Active')) ";

 		//build type and rel patterns
 		Pattern typePattern = new Pattern(DomainConstants.TYPE_PROJECT_MEMBER);
 		typePattern.addPattern(DomainConstants.TYPE_PROJECT);
 		Pattern relPattern = new Pattern(DomainConstants.RELATIONSHIP_PROJECT_MEMBERSHIP);
 		relPattern.addPattern(DomainConstants.RELATIONSHIP_PROJECT_MEMBERS);
 		
 		// type and rel patterns to include in the final resultset
 		Pattern includeTypePattern = new Pattern(DomainConstants.TYPE_PROJECT);
 		Pattern includeRelPattern = new Pattern(DomainConstants.RELATIONSHIP_PROJECT_MEMBERS);
 		
 		// get all workspaces that the user is a Project-Member
 		workspaceList = person.getRelatedObjects(context,
                                     relPattern.getPattern(),  //String relPattern
                                     typePattern.getPattern(), //String typePattern
                                     objectSelects,            //StringList objectSelects,
                                     null,                     //StringList relationshipSelects,
                                     true,                     //boolean getTo,
                                     true,                     //boolean getFrom,
                                     (short)2,                 //short recurseToLevel,
                                     expandTypeWhere,          //String objectWhere,
                                     "",                       //String relationshipWhere,
                                     includeTypePattern,       //Pattern includeType,
                                     includeRelPattern,        //Pattern includeRelationship,
                                     null);                    //Map includeMap
 	} 
 	// get the where expression for the type
 	queryTypeWhere = FrameworkUtil.getWhereExpressionForMql(context,queryTypeWhere, DomainConstants.TYPE_PROJECT);
 	
 	//To avoid displaying Bookmark Roots objects migrated from Personal Workspace objects
 	String ATTRIBUTE_FOLDER_CLASSIFICATION = PropertyUtil.getSchemaProperty(context, "attribute_FolderClassification");
 	StringBuffer where = new StringBuffer(200);
 	where.append(queryTypeWhere);
 	where.append(" && (attribute[" + ATTRIBUTE_FOLDER_CLASSIFICATION + "] != 'Personal'");
 	where.append(" || (attribute[" + ATTRIBUTE_FOLDER_CLASSIFICATION + "] == 'Personal' && owner == '" + context.getUser() + "'))");
 	queryTypeWhere = where.toString();
 	
 	// get all workspaces that the current user is a member since one of his roles is a member
 	MapList roleWorkspaceList = DomainObject.querySelect(context,
 			                                             DomainConstants.TYPE_PROJECT,  // type pattern
 			                                             DomainObject.QUERY_WILDCARD,   // namePattern
 			                                             DomainObject.QUERY_WILDCARD,   // revPattern
 			                                             DomainObject.QUERY_WILDCARD,   // ownerPattern
 			                                             personVault,                 // get the Person Company vault
 			                                             queryTypeWhere,                // where expression
 			                                             true,                          // expandType
 			                                             objectSelects,                 // object selects
 			                                             null,                          // cached list
 			                                             true);                         // use cache
 	
 	Iterator workspaceListItr = workspaceList.iterator();
 	Iterator roleWorkspaceListItr = roleWorkspaceList.iterator();
 	// get a list of workspace id's for the member
 	StringList workspaceIdList = new StringList();
 	while (workspaceListItr.hasNext()) {
 		Map workspaceMap = (Map)workspaceListItr.next();
 		String workspaceId = (String)workspaceMap.get(DomainObject.SELECT_ID);
 		workspaceMap.remove("relationship");
 		workspaceMap.remove("level");
 		workspaceIdList.addElement(workspaceId);
 	}
 	
 	while(roleWorkspaceListItr.hasNext()) {
 		Map workspaceMap = (Map)roleWorkspaceListItr.next();
 		String workspaceId = (String)workspaceMap.get(DomainObject.SELECT_ID);
 		if (!workspaceIdList.contains(workspaceId)) {
 			workspaceIdList.addElement(workspaceId);
 			workspaceList.add(workspaceMap);
 		}
 	}

	 /*String sFtr = "All";
	 //build object-select statements
         StringList selectTypeStmts = new StringList();
         selectTypeStmts.add(DomainObject.SELECT_TYPE);
         selectTypeStmts.add(DomainObject.SELECT_NAME);
         selectTypeStmts.add(DomainObject.SELECT_ID);
         selectTypeStmts.add(DomainObject.SELECT_DESCRIPTION);
         selectTypeStmts.add(DomainObject.SELECT_OWNER);
         selectTypeStmts.add(DomainObject.SELECT_CURRENT);
         selectTypeStmts.add(DomainObject.SELECT_POLICY);

         String queryTypeWhere   = "";
         String expandTypeWhere  = "";

         // where for the query, show workspaces in the "Active" state only, and the users(roles) must have read access on the workspace.
         queryTypeWhere = "('" + DomainObject.SELECT_CURRENT + "' == 'Active')";

         // where for the expand, show workspaces in the "Active" state for members, Owner can see the Workspace in any state.
         if (sFtr.equals("Active")) {
           expandTypeWhere = "('" + DomainObject.SELECT_CURRENT + "' == 'Active')";
         } else {
           expandTypeWhere = "('" + DomainObject.SELECT_OWNER + "' == '"+person.getName()+"' || '" + DomainObject.SELECT_CURRENT + "' == 'Active')";
         }

         //get the vaults of the Person's company
         String personVault = person.getVaultName(context);

         //query selects
         StringList objectSelects = new StringList();
         objectSelects.add(DomainObject.SELECT_ID);
         //have to include SELECT_TYPE as a select since the expand has includeTypePattern
         objectSelects.add(DomainObject.SELECT_TYPE);

         //build type and rel patterns
         Pattern typePattern = new Pattern(DomainConstants.TYPE_PROJECT_MEMBER);
         typePattern.addPattern(DomainConstants.TYPE_PROJECT);
         Pattern relPattern = new Pattern(DomainConstants.RELATIONSHIP_PROJECT_MEMBERSHIP);
         relPattern.addPattern(DomainConstants.RELATIONSHIP_PROJECT_MEMBERS);
         relPattern.addPattern(MCADMxUtil.getActualNameForAEFData(context, "relationship_WorkspaceMember"));

         // type and rel patterns to include in the final resultset
         Pattern includeTypePattern = new Pattern(DomainConstants.TYPE_PROJECT);
         Pattern includeRelPattern = new Pattern(DomainConstants.RELATIONSHIP_PROJECT_MEMBERS);
         includeRelPattern.addPattern(MCADMxUtil.getActualNameForAEFData(context, "relationship_WorkspaceMember"));

         // get all workspaces that the user is a Project-Member
         workspaceList = person.getRelatedObjects(context,
                                        relPattern.getPattern(),  //String relPattern
                                        typePattern.getPattern(), //String typePattern
                                        objectSelects,            //StringList objectSelects,
                                        null,                     //StringList relationshipSelects,
                                        true,                     //boolean getTo,
                                        true,                     //boolean getFrom,
                                        (short)2,                 //short recurseToLevel,
                                        expandTypeWhere,          //String objectWhere,
                                        "",                       //String relationshipWhere,
                                        includeTypePattern,       //Pattern includeType,
                                        includeRelPattern,        //Pattern includeRelationship,
                                        null);                    //Map includeMap

         Pattern typeFindPattern = new Pattern(DomainConstants.TYPE_PROJECT);
         //IR-878146 : Deprecation of Personal Workspace, Removed 'Personal Workspace' type
     //    typeFindPattern.addPattern(MCADMxUtil.getActualNameForAEFData(context, "type_PersonalWorkspace"));
         
         // get all workspaces that the current user is a member since one of his roles is a member
        MapList roleWorkspaceList = DomainObject.findObjects(context,
                                      typeFindPattern.getPattern(),                // type pattern
                                      DomainObject.QUERY_WILDCARD, // namePattern
                                      DomainObject.QUERY_WILDCARD, // revPattern
                                      DomainObject.QUERY_WILDCARD, // ownerPattern
                                      personVault,                 // get the Person Company vault
                                      queryTypeWhere,              // where expression
                                      true,                        // expandType
                                      objectSelects);               // object selects
         
        
         Iterator workspaceListItr = workspaceList.iterator();
         Iterator roleWorkspaceListItr = roleWorkspaceList.iterator();

         // get a list of workspace id's for the member
         StringList workspaceIdList = new StringList();
         while(workspaceListItr.hasNext())
         {
             Map workspaceMap = (Map)workspaceListItr.next();
             String workspaceId = (String)workspaceMap.get(DomainObject.SELECT_ID);
             workspaceMap.remove("relationship");
             workspaceMap.remove("level");
             workspaceIdList.addElement(workspaceId);
         }

         while(roleWorkspaceListItr.hasNext())
         {
             Map workspaceMap = (Map)roleWorkspaceListItr.next();
             String workspaceId = (String)workspaceMap.get(DomainObject.SELECT_ID);
             if(!workspaceIdList.contains(workspaceId))
             {
               workspaceIdList.addElement(workspaceId);
               workspaceList.add(workspaceMap);
             }
         }

         //System.out.println("the workspace list is " + workspaceList);*/
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("IEFTMCUtil:getCurrentUserWorkspaces : " + ex.toString()) );
     }
     return workspaceList;
   }

  /**
   * Get the folders of a Project
   * Returns a maplist of folders 
   *
   * @param context the eMatrix <code>Context</code> object
   * @throws Exception if the operation fails
   * @since AEF 10.5
   */
  @com.matrixone.apps.framework.ui.ProgramCallable
   public static MapList getWorkspaceFolders(Context context, String[] args) throws MatrixException
   {
     MapList folderList = new MapList();
     try
     {
	//Workspace workspace = (Workspace)DomainObject.newInstance(context,sObjectId,DomainConstants.TEAM);
	HashMap initArgsMap = (HashMap)JPO.unpackArgs(args);
	
	        String busId = (String)initArgsMap.get("objectId");
		String parentRel = (String)initArgsMap.get("parentRelName");

	DomainObject workspace = (DomainObject)DomainObject.newInstance(context,busId,DomainConstants.TEAM);

        MapList totalresultList  = null;
        StringList objectSelects = new StringList(1);
        objectSelects.add(DomainObject.SELECT_ID);

        // IR-601912-3DEXPERIENCER2018x : 
        // Linked folders were not visible
        // The rel pattern is fetched from ${CLASS:IEFDesktopConfigurations}, typeNavigationMappings
        Pattern wsRelPattern = getRelPattern(context, parentRel);
        
        folderList =  workspace.getRelatedObjects (context,
        		                 wsRelPattern.getPattern(),
                                 "*",   // FUN089269 :Ability to view and create documents under Bookmark Workspace >>  MSF
                                 objectSelects,
                                 null,
                                 false,
                                 true,
                                 (short)1,
                                 null,
                                 null);
     }
     catch (Exception ex) 
     {
       throw (new MatrixException("IEFTMCUtil:getWorkspaceFolders: " + ex.toString()) );
     }
     return folderList;
   }
  
  private static Pattern getRelPattern(Context context, String  parentRel)
  {
      Pattern relPattern        = new Pattern("");

      // If parent relation ship is passed separated by comma
      // Tokenize and add it rel pattern

      if(parentRel != null)
      {
          StringTokenizer relString = new StringTokenizer(parentRel,",");
          while (relString.hasMoreTokens())
          {
              String relStr = relString.nextToken().trim();
				boolean patternFound = false;
              if(relStr != null && !"null".equals(relStr) && !"".equals(relStr))
              {
            	  MxPattern pattern = MxPattern.compile("\\[(.*?)\\]", MxPattern.CASE_INSENSITIVE|MxPattern.MULTILINE);
            	  MxMatcher matcher = pattern.matcher(relStr);                        
                  while (matcher.find())
                  {
					patternFound = true;
                  	String strMatch = matcher.group();
                      strMatch = strMatch.substring(strMatch.indexOf("[") + 1, strMatch.indexOf("]"));
                      if(strMatch != null && strMatch.indexOf("relationship_") != -1)
                      {
							String actRelName = PropertyUtil.getSchemaProperty(context, relStr);
                          if(actRelName != null && !"null".equals(actRelName) && !"".equals(actRelName))
                          {
								relPattern.addPattern(actRelName);
                          }
                      }
                      else
                      {
						relPattern.addPattern(strMatch);
                      }       
                  }
                  if(!patternFound) 
                  {
                	System.out.print("\nrelStr: " + relStr);
					if(relStr.indexOf("relationship_") != -1)
					{
						String actRelName = PropertyUtil.getSchemaProperty(context, relStr);
						if(actRelName != null && !"null".equals(actRelName) && !"".equals(actRelName))
						{
							relPattern.addPattern(actRelName);
							System.out.print("\nactRelName: " + actRelName);
						}
					} 
					else
					{
						relPattern.addPattern(relStr);
					}	
                  }
              }
}
      }

      // if not passed, or non-existing relationship passed then default to "Reference Document" relationship
      if("".equals(relPattern.getPattern()))
      {
          relPattern.addPattern(PropertyUtil.getSchemaProperty(context, CommonDocument.SYMBOLIC_relationship_ReferenceDocument));
      }
      
      return relPattern;
  }
}

