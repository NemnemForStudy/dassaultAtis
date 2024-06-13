import java.util.Iterator;
import java.util.Map;

import com.dassault_systemes.enovia.workspace.modeler.Workspace;
import com.dassault_systemes.enovia.workspace.modeler.WorkspaceMdlUtil;
import com.matrixone.apps.common.SubscriptionManager;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.StringUtil;

import matrix.db.Context;
import matrix.util.StringList;

import java.util.HashMap;
import com.matrixone.apps.domain.util.CacheUtil;

public class emxWorkspaceMdlBase_mxJPO extends emxDomainObject_mxJPO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public emxWorkspaceMdlBase_mxJPO(Context context, String[] args) throws Exception {
		super(context, args);
	}
	
	/**
	 * Add ownership of new Workspace Member.
	 * 
	 * @param context the eMatrix Context object
	 * @param args holds id of Workspace Member object
	 * @return void
	 * @throws Exception if the operation fails
	 * @since R2022x GA
	 */
	  public void connectMember(Context context, String[] args) throws Exception {
	      try {
	          String workspaceId = args[0];
	          String project = args[1];
	          String result = MqlUtil.mqlCommand(context, "list role $1 select $2 $3 dump $4", true, project, "person", "parent", "|");
	          StringList resultList = StringUtil.split(result, "|");
	          String personId = "";
	          if (resultList.size() == 2 && "User Projects".equals(resultList.get(1))) {
	              personId = PersonUtil.getPersonObjectID(context, (String)resultList.get(0));
	              if (personId != null) {
	                  String memberSelects = "from[" + RELATIONSHIP_WORKSPACE_MEMBER + "|to.id==" + personId + "].id";
	                  String relId = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", true, workspaceId, memberSelects);
	                  
	                  if (relId == null || relId.isEmpty()) {
	                      DomainRelationship.connect(context, workspaceId, RELATIONSHIP_WORKSPACE_MEMBER, personId, true);
	                  }
	              }
	          }
	          
	          String rpe = PropertyUtil.getGlobalRPEValue(context, "RPE_MEMBER_ADDED_REMOVED");
	          if ("true".equalsIgnoreCase(rpe)) {
	              Workspace workspace = new Workspace(workspaceId);
	              SubscriptionManager subscriptionMgr = workspace.getSubscriptionManager();
	              subscriptionMgr.publishEvent(context, Workspace.EVENT_MEMBER_ADDED, personId);
	          }
	      } catch (FrameworkException e) {
	    	  if(e.getMessage().indexOf("fromconnect") > 0){
	    		  String sMsg = EnoviaResourceBundle.getProperty(context,
	    				                                         "WorkspaceMdlStringResource",
	    				                                         context.getLocale(),
	    				                                         "WorkspaceMdl.ObjectAccess.NoAccessToAddRemove");
	    		  emxContextUtil_mxJPO.mqlError(context,sMsg);
	    	  }else {
	    		  throw e;
	    	  }
	      }
	  }
	  
	  
	  /**
	   * Removes ownership of a given Workspace Member
	   * 
	   * @param context context the eMatrix Context object
	   * @param args holds Bookmark Root id and ownership details of a Workspace Member
	   * @throws Exception if the operation fails
	   * @since R2022x GA
	   */
	  public void disconnectMember(Context context, String[] args) throws Exception {
	      try {
	          String workspaceId = args[0];
	          String project = args[1];
	          String organization = args[2];
	          String comment = args[3];
	          String personId = "";
	          String result = MqlUtil.mqlCommand(context, "list role $1 select $2 $3 dump $4", true, project, "person", "parent", "|");
	          StringList resultList = StringUtil.split(result, "|");
	          if (resultList.size() == 2 && "User Projects".equals(resultList.get(1))) {
	              String personName = (String)resultList.get(0);
	              personId = PersonUtil.getPersonObjectID(context, personName);
	              project = personName + "_PRJ";
	              organization = null;
	              if (personId != null) {
	            	  String memberSelects = "from[" + RELATIONSHIP_WORKSPACE_MEMBER + "|to.id==" + personId + "].id";
	                  String relId = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", true, workspaceId, memberSelects);
	                  if ( relId != null && !relId.isEmpty()) {
	                      DomainRelationship.disconnect(context, relId);
	                  }
	              }
	          }
	          
	          String rpe = PropertyUtil.getGlobalRPEValue(context, "RPE_MEMBER_ADDED_REMOVED");
	          if ("true".equalsIgnoreCase(rpe)) {
	              Workspace workspace = new Workspace(workspaceId);
	              SubscriptionManager subscriptionMgr = workspace.getSubscriptionManager();
	              subscriptionMgr.publishEvent(context, Workspace.EVENT_MEMBER_REMOVED, personId);
	              StringList objectSelects = new StringList(1);
	              objectSelects.add(SELECT_ID);
	              ContextUtil.pushContext(context, null, null, null);
	              MapList bookmarks = getWorkspaceVaults(context, workspace, objectSelects, 0);
	              Iterator<?> itr = bookmarks.iterator();
	              while (itr.hasNext()) {
	                  Map<?, ?> bookmarkMap = (Map<?, ?>)itr.next();
	                  String bookmarkId = (String)bookmarkMap.get(SELECT_ID);
	                  DomainAccess.deleteObjectOwnership(context, bookmarkId, organization, project, comment);
	              }
	              ContextUtil.popContext(context);
	          }
	      } catch (Exception e) {
	    	  throw e;
	      }
	  }
	  
	  /**
	   * Checks if a Bookmark Root with a given name already exists
	   * @param context context the eMatrix Context object
	   * @param args holds Bookmark Root object details 
	   * @throws Exception if the operation fails
	   * @since R2022x GA
	   */
	  public void preventDuplicateWorkspaceName(Context context, String[] args) throws Exception {
		  String bookmarkRootId = args[0];
		  String newName = args[1];
		  String vault = args[2];
		  
		  if (vault == null || vault.isEmpty() || "null".equals(vault)) {
			  DomainObject object = new DomainObject(bookmarkRootId);
			  vault = object.getInfo(context, SELECT_VAULT);
		  }
		  
		  boolean workspaceExists  = false;
		  ContextUtil.pushContext(context);
		  try {
			  workspaceExists = Workspace.isWorkspaceExists(context, newName);
		  } catch (Exception ex) {
			  throw ex;
		  } finally {
			  ContextUtil.popContext(context);
		  }
		  
		  if (workspaceExists) {
			  String error = EnoviaResourceBundle.getProperty(context,
						                                      "WorkspaceMdlStringResource",
						                                      context.getLocale(),
						                                      "WorkspaceMdl.Workspace.AlreadyExists");
			  throw new Exception(error);
		  }
	  }
	  
	  /**
	   * Checks if the bookmark (or root) can be deleted
	   * @param context context the eMatrix Context object
	   * @param args holds bookmark (or root) id
	   * @return 0 if bookmark (or root) can be deleted
	   * @throws Exception
	   * @since R2022x GA
	   */
	  public int workspaceDeleteCheck(Context context, String []args) throws Exception {
		  String bookmarkId  = args[0];
		  
		  if (!WorkspaceMdlUtil.canProjectDeleted(context, null, bookmarkId)) {
			  String sMsg = EnoviaResourceBundle.getProperty(context,
					                                         "WorkspaceMdlStringResource",
					                                         context.getLocale(),
					                                         "WorkspaceMdl.WorkspaceDelete.Msg");
			  emxContextUtil_mxJPO.mqlNotice(context, sMsg);
			  return 1;
		  }
		  return 0;
	  }
	  
	  
	  /**
	   * Retrieves list of bookmarks in a given Bookmark Root
	   * @param context context the eMatrix Context object
	   * @param domainobject object for which related object list is retrieved
	   * @param objectSelects object selectAbles
	   * @param level the number of levels to expand, 0 equals expand all.
	   * @return list of child bookmarks 
	   * @throws FrameworkException
	   * @since R2022x GA
	   */
	  private static MapList getWorkspaceVaults(Context context, DomainObject domainobject, StringList objectSelects, int level) throws FrameworkException {
		  String relationshipPattern = RELATIONSHIP_WORKSPACE_VAULTS;
		  if (level != 1) {
			  relationshipPattern += "," + RELATIONSHIP_SUB_VAULTS;
		  }
		  
		  return domainobject.getRelatedObjects(context,
				                                relationshipPattern,    
				                                QUERY_WILDCARD,
				                                objectSelects,
				                                null,
				                                false,
				                                true,
				                                (short)level,
				                                null,
				                                null,
				                                0,
				                                null,
				                                null,
				                                null);
	  }
	  

	/**
	 * This is a Vaulted Objects modifyto action trigger to implement the content revise behavior, float, replicate or none 
	 * @param context the eMatrix <code>Context</code> object
	 * @param args fromObjectId, toObjectId, relId, parentEvent, fromType
	 * @throws FrameworkException if the operation fails
	 */
	public void bookmarkContentReviseBehavior(Context context, String[] args) throws FrameworkException
	{
	    String fromObjectId = args[0];
	    String toObjectId = args[1];
	    String relId = args[2];
	    String parentEvent = args[3];
	    String fromType = args[4];
	    String newRev = args[5];
   
	    // Only consider if the parent event is a revise, not clone
	    //
		if (parentEvent.equalsIgnoreCase("revise") ) {
			try{
				//Check for override RPE variable to keep revise float behavior under specific cases
				String keepFloatBehavior = PropertyUtil.getGlobalRPEValue(context, "BOOKMARK_CONTENT_REVISE_FLOAT");
				if (keepFloatBehavior != null && !"null".equalsIgnoreCase(keepFloatBehavior) && keepFloatBehavior.equalsIgnoreCase("TRUE"))
					return;

				String strToRevisionBehavior = "";
				Map<String, String> BookmarkContentReviseSettingMap = CacheUtil.getCacheMap(context, "BookmarkContentReviseSettingMap");
				if ( BookmarkContentReviseSettingMap == null || BookmarkContentReviseSettingMap.isEmpty() ) {
					BookmarkContentReviseSettingMap = new HashMap <String, String> ();
					String exp = "BookmarkContentToReviseBehavior";
					String CmdExp = "list expression $1 select value dump";
					strToRevisionBehavior = MqlUtil.mqlCommand(context, CmdExp, exp).trim();
					BookmarkContentReviseSettingMap.put("BookmarkContentToReviseBehavior", strToRevisionBehavior);
					CacheUtil.setCacheMap(context, "BookmarkContentReviseSettingMap", BookmarkContentReviseSettingMap);
				} 
				else {
					strToRevisionBehavior = BookmarkContentReviseSettingMap.get("BookmarkContentToReviseBehavior");
				}
				
				if (strToRevisionBehavior == null || "".equals(strToRevisionBehavior) || strToRevisionBehavior.equalsIgnoreCase("none")) {
					// revise None behavior
					// put back original revision
                                        // need to turn history off as the modify connection causes a connect/disconnect record on the content object
					String sCommandStatement = "modify connection $1 to $2";
			        	MqlUtil.mqlCommand(context, true, sCommandStatement, true, relId,toObjectId); 
				} 
				else if (strToRevisionBehavior.equalsIgnoreCase("float")) {
					// revise float behavior
					// Vaulted Objects already set to 'float' - nothing to do here
					; 
				} 
				else if (strToRevisionBehavior.equalsIgnoreCase("replicate")) {
					// revise replicate behavior

					// get id of floated new revision
					String sCommandStatement = "print connection $1 select $2 dump ";
			        	String newRevId = MqlUtil.mqlCommand(context, true, sCommandStatement, true, relId, "to.id");
					
                                        // need to turn history off as the modify connection causes a connect/disconnect record on the content object
					// put back original revision
					sCommandStatement = "modify connection $1 to $2";
			        	MqlUtil.mqlCommand(context, true, sCommandStatement, true, relId, toObjectId);

					// add connection for new revision
					sCommandStatement = "add connection $1 from $2 to $3";
			        	MqlUtil.mqlCommand(context, sCommandStatement, RELATIONSHIP_VAULTED_OBJECTS, fromObjectId, newRevId);
				}

            }catch(Exception exp){
                exp.printStackTrace();
                throw new FrameworkException(exp);
            }
		}
	}
}
