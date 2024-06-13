import java.util.Iterator;
import java.util.Map;

import com.dassault_systemes.enovia.workspace.modeler.WorkspaceVault;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

import matrix.db.Attribute;
import matrix.db.AttributeList;
import matrix.db.AttributeType;
import matrix.db.Context;
import matrix.util.StringList;

public class emxWorkspaceMdlRelationBase_mxJPO extends emxDomainObject_mxJPO {
    
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public emxWorkspaceMdlRelationBase_mxJPO(Context context, String[] args) throws Exception {
		super(context, args);
	}
    	
	/**
	 * Checks if ownership can be added to a bookmark
	 * 
	 * @param context context the eMatrix Context object
	 * @param args holds parent and child bookmark id
	 * @throws Exception if the operation fails
	 * @since R2022x GA
	 */
	public static void forceFolderOwnershipOnConnect(Context context, String[] args) throws Exception {
        String parentBookmarkId = args[0];
        String childBookmarkId = args[1];
        DomainObject parentBookmark = new DomainObject(parentBookmarkId);
        DomainObject childBookmark = new DomainObject(childBookmarkId);
        StringList objectSelects = new StringList(3);
        objectSelects.add("project");
        objectSelects.add("organization");
        objectSelects.add("attribute[Folder Classification]");
        
        Map<?,?> parentMap = parentBookmark.getInfo(context, objectSelects);
        String parentCS = (String)parentMap.get("project");
        String parentOrg = (String)parentMap.get("organization");
        String parentFolderClassification = (String)parentMap.get("attribute[Folder Classification]");
        
        Map<?,?> childMap = childBookmark.getInfo(context, objectSelects);
        String childCS = (String)childMap.get("project");
        String childOrg = (String)childMap.get("organization");
        String bookmarkOwnership = EnoviaResourceBundle.getProperty(context, "WorkspaceMdl.FolderOwnership");
        if (parentCS != null && !parentCS.isEmpty()) {
            String parentProject = MqlUtil.mqlCommand(context, "print role $1 select parent dump", parentCS);
            if (!"User Projects".equals(parentProject) && !"Personal".equals(parentFolderClassification)) {
            	// The value of bookmarkOwnership is fixed why this check is required?
                if (bookmarkOwnership.equalsIgnoreCase("Root") && (!parentCS.equals(childCS) || !parentOrg.equals(childOrg))) {
                    throw new FrameworkException(EnoviaResourceBundle.getProperty(context,
                    		                                                     "WorkspaceMdlStringResource",
                    		                                                     context.getLocale(),
                    		                                                     "WorkspaceMdl.FolderOwnershipRuleError"));
                }
            }
        }
    }
    	
	/**
	 * Checks if ownership can be added to content
	 * 
	 * @param context context the eMatrix Context object
	 * @param args holds parent and child object id
	 * @throws Exception if the operation fails
	 * @since R2022x GA
	 */
	public static void forceFolderContentOwnershipOnConnect(Context context, String[] args) throws Exception {
		String parentObjectId = args[0];
        String childObjectId = args[1];
        DomainObject parentObject = new DomainObject(parentObjectId);
        DomainObject childObject = new DomainObject(childObjectId);
        StringList objectSelects = new StringList(3);
        objectSelects.add("project");
        objectSelects.add("organization");
        objectSelects.add("attribute[Folder Classification]");
        Map<?,?> parentMap = parentObject.getInfo(context, objectSelects);
        String parentCS = (String)parentMap.get("project");
        String parentOrg = (String)parentMap.get("organization");
        String folderClassification = (String)parentMap.get("attribute[Folder Classification]");
        
        Map<?,?> childMap = childObject.getInfo(context, objectSelects);
        String childCS = (String)childMap.get("project");
        String childOrg = (String)childMap.get("organization");
        
        String bookmarkOwnership = EnoviaResourceBundle.getProperty(context, "WorkspaceMdl.FolderContentOwnership");
        if (parentCS != null && !parentCS.isEmpty() ) {
        	String parentProject = MqlUtil.mqlCommand(context, "print role $1 select parent dump", parentCS);
            if (!"User Projects".equals(parentProject) && !"Personal".equals(folderClassification)) {
            	//The value of bookmarkOwnership is fixed why this check is required?
                if (bookmarkOwnership.equalsIgnoreCase("Folder") && (!parentCS.equals(childCS) || !parentOrg.equals(childOrg))) {
                    String message = EnoviaResourceBundle.getProperty(context,
                    		                                          "WorkspaceMdlStringResource",
                    		                                          context.getLocale(),
                    		                                          "WorkspaceMdl.FolderContentOwnershipRuleError");
                    throw new FrameworkException(message);
                }
            }
        }
    }	
    
	/**
     * Update "Folder Path" and "Folder Classification" attributes from Parent bookmark.
     * 
     * @param context the eMatrix Context object
     * @param args[] of From Object Id as first parameter and To Object Id as second parameter
     * @return void
     * @throws Exception if the operation fails
     * @since R2022x GA
     * @grade 0
     */
    public void updateFolderPathAndClassification(Context context, String[] args ) throws Exception {
        try {
            ContextUtil.startTransaction(context, true);
            DomainObject parentBookmark = new DomainObject(args[0]);
            DomainObject childBookmark = new DomainObject(args[1]);
            String ATTRIBUTE_FOLDER_PATH = PropertyUtil.getSchemaProperty(context, "attribute_FolderPath");
            String ATTRIBUTE_FOLDER_CLASSIFICATION = PropertyUtil.getSchemaProperty(context, "attribute_FolderClassification");
            String SELECT_ATTRIBUTE_FOLDER_PATH = getAttributeSelect(ATTRIBUTE_FOLDER_PATH);
            String SELECT_ATTRIBUTE_FOLDER_CLASSIFICATION = getAttributeSelect(ATTRIBUTE_FOLDER_CLASSIFICATION);
            
            StringList objectSelects = new StringList(3);
            objectSelects.add(SELECT_ATTRIBUTE_FOLDER_PATH);
            objectSelects.add(SELECT_ATTRIBUTE_FOLDER_CLASSIFICATION);
            objectSelects.add(SELECT_PHYSICAL_ID);
            Map<?, ?> parentDataMap = parentBookmark.getInfo(context, objectSelects);
            String parentPhysicalId =(String)parentDataMap.get(SELECT_PHYSICAL_ID);
            String parentFolderPath =(String)parentDataMap.get(SELECT_ATTRIBUTE_FOLDER_PATH);
            String folderClassification =(String)parentDataMap.get(SELECT_ATTRIBUTE_FOLDER_CLASSIFICATION);
            String folderPath = parentPhysicalId;
            if (parentFolderPath != null && !"null".equals(parentFolderPath) && !parentFolderPath.isEmpty()) {
                folderPath = parentFolderPath + "|" + parentPhysicalId;
            }
            
            AttributeList attributeList = new AttributeList();
            attributeList.add( new Attribute( new AttributeType(ATTRIBUTE_FOLDER_PATH), folderPath));
            if (folderClassification != null && !folderClassification.isEmpty() && !"null".equals(folderClassification)) {
                attributeList.add( new Attribute( new AttributeType(ATTRIBUTE_FOLDER_CLASSIFICATION), folderClassification));
            }
            childBookmark.setAttributes(context, attributeList);
            ContextUtil.commitTransaction(context);
        } catch(Exception ex) {
            ContextUtil.abortTransaction(context);
            ex.printStackTrace();
            throw ex;
        }
    }
    
    /**
     * Utility method: Checks the current state of the object with the target state, using the comparison operator
     * and returns the result.
     * @return integer representing the following values.
     *                  0 if object state logic satisfies Comparison Operator.
     *                  1 if object state logic didn't satisfies Comparison Operator.
     *                  1 if a program error is encountered.
     *                  1 if state in state argument does not exist in objects policy.
     *                  1 if an invalid comparison operator is passed in.
     * @param context the eMatrix <code>Context</code> object.
     * @param domObj the DomainObject of the object whose state is to be checked.
     * @param targetState the target state against which the current state of the object is compared.
     * @param comparisonOperator the operator used for comparison LT, GT, EQ, LE, GE, NE.
     */
    static final int LT = 0;
    static final int GT = 1;
    static final int EQ = 2;
    static final int LE = 3;
    static final int GE = 4;
    static final int NE = 5;
    
    /**
     * Check if bookmark connection can be manipulated
     * 
     * @param context context the eMatrix Context object
     * @param args holds object and connection details
     * @return 0 if bookmark connection can be modified
     * @throws Exception if the operation fails
     * @since R2022x GA
     */
    public static int checkAllowChangeConnection(Context context, String[] args) throws Exception {
    	String isBulkRemove = PropertyUtil.getGlobalRPEValue(context, "ENO_BOOKMARK_BULK_REMOVE_CONTENT");
    	if (isBulkRemove!=null && "true".equalsIgnoreCase(isBulkRemove))
    		return 0;
    	
    	int intReturn = 0;
 		try {
 			intReturn = WorkspaceVault.checkAllowChangeConnection(context, args);
 		} catch (FrameworkException e) {
 			String msg = e.getMessage();
 			emxContextUtil_mxJPO.mqlNotice(context, msg);
 			intReturn = 1;
 		}
 		return intReturn;
    }
    
    /**
     * Compare current state with states of bookmark
     * 
     * @param context context context The Matrix Context object
     * @param bookmark object for which state is compared
     * @param targetState the blocking state
     * @param comparisonOperator
     * @return non-zero value if target state is greater than or equal to blocked state index
     * @throws FrameworkException if operation fails
     * @since R2022x GA
     */
    protected static int checkObjState(Context context, DomainObject bookmark, String targetState, int comparisonOperator) {
    	try {
    		String currentState = bookmark.getInfo(context, SELECT_CURRENT);
    		StringList childStateList = bookmark.getInfoList(context, SELECT_STATES);
    		int targetIndex = childStateList.indexOf(targetState);
    		int stateIndex  = childStateList.indexOf(currentState);
    		
    		// Check if State exist in Policy
    		if (targetIndex < 0) {
    			return 1; // State doesn't exist in the policy
    		}
    		
    		// check Target State index with object Current state index
    		switch (comparisonOperator) {
    		    case LT :
    		    	if (stateIndex < targetIndex) {
    		    		return 0;
    		    	}
    		    	break;
    		    case GT :
    		    	if (stateIndex > targetIndex) {
    		    		return 0;
    		    	}
    		    	break;
    		    case EQ :
    		    	if (stateIndex == targetIndex) {
    		    		return 0;
    		    	}
    		    	break;
    		    case LE :
    		    	if (stateIndex <= targetIndex) {
    		    		return 0;
    		    	}
    		    	break;
    		    case GE :
    		    	if (stateIndex >= targetIndex) {
    		    		return 0;
    		    	}
    		    	break;
    		    case NE :
    		    	if (stateIndex != targetIndex) {
    		    		return 0;
    		    	}
    		    	break;
    		    default :
    		    	return 1;
    		}
    		return 1;
    	} catch (Exception ex) {
    		return 1;
    	}
    }
    
    /**
     * Publish when a content is connected to a bookmark
     * 
     * @param context the eMatrix <code>Context</code> object
     * @param args holds bookmark and content object id
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public void publishOnConnect(Context context, String[] args) throws Exception {
        try {
            String bookmarkId = args[0];
            String contentId = args[1];
            String publishOnConnectSelect = getAttributeSelect(ATTRIBUTE_PUBLISH_ON_CONNECT);
            DomainObject bookmark = DomainObject.newInstance(context, bookmarkId);
            String publishOnConnectValue = bookmark.getInfo(context, publishOnConnectSelect);
            if ("True".equals(publishOnConnectValue)) {
                DomainObject content = DomainObject.newInstance(context, contentId);
                StringList objectSelects = new StringList(3);
                objectSelects.add(SELECT_POLICY);
                objectSelects.add(SELECT_CURRENT);
                objectSelects.add(SELECT_STATES);
                DomainObject.MULTI_VALUE_LIST.add("state");
                Map<?, ?> contentData = content.getInfo(context, objectSelects);
                String policy = (String)contentData.get(SELECT_POLICY);
                StringList states = (StringList)contentData.get(SELECT_STATES);
                String currentState = (String)contentData.get(SELECT_CURRENT);
                final String FOLDER_PUBLISH_STATE = "Folder Publish State";
                String publishStateName = PropertyUtil.getAdminProperty(context, "policy", policy, FOLDER_PUBLISH_STATE);
                if (publishStateName != null && !publishStateName.isEmpty()) {
                    int currentStateIndex = states.indexOf(currentState);
                    int publishStateNameIndex = states.indexOf(publishStateName);
                    if (currentStateIndex < publishStateNameIndex) {
                        content.setState(context, publishStateName, false);
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new Exception(ex);
        }
    }
    
    /**
     * Updates the count attribute on bookmark and its parent in the hierarchy
     * 
     * @param context context the eMatrix Context object
     * @param args holds bookmark id and event
     * @return 0 if operation is successful, 1 on failure
     * @throws Exception if the operation fails
     * @since R2022x GA
     */
    public static int updateCountOnCreateAndDelete(Context context, String[] args) throws Exception {
        String bookmarkId = args[0];
        String event = args[1];
        
        DomainObject bookmark = new DomainObject(bookmarkId);
        bookmark.lockForUpdate(context);
        int count = Integer.parseInt(bookmark.getAttributeValue(context, ATTRIBUTE_COUNT));
        try {
            ContextUtil.pushContext(context);
            if (UIUtil.isNotNullAndNotEmpty(event) && "Create".equalsIgnoreCase(event)) {
                bookmark.setAttributeValue(context, ATTRIBUTE_COUNT, String.valueOf(++count));
            } else if("Delete".equalsIgnoreCase(event)) {
                bookmark.setAttributeValue(context, ATTRIBUTE_COUNT, String.valueOf(--count));
            }
            
            StringList objectSelects = new StringList(SELECT_ID);
            MapList bookmarkParentList = bookmark.getRelatedObjects(context,
                                                                    RELATIONSHIP_SUB_VAULTS,
                                                                    QUERY_WILDCARD,
                                                                    objectSelects,
                                                                    null,
                                                                    true,
                                                                    false,
                                                                    (short)0,
                                                                    null,
                                                                    null,
                                                                    0,
                                                                    null,
                                                                    null,
                                                                    null);
            DomainObject parentBookmark = null;
            Iterator<?> iterator = bookmarkParentList.iterator();
            Map<?,?> valueMap = null;
            while (iterator.hasNext()) {
                valueMap = (Map<?,?>)iterator.next();
                String parentBookmarkId = (String) valueMap.get(SELECT_ID);
                parentBookmark = new DomainObject(parentBookmarkId);
                parentBookmark.lockForUpdate(context);
                count = Integer.parseInt(parentBookmark.getAttributeValue(context, ATTRIBUTE_COUNT));
                if (UIUtil.isNotNullAndNotEmpty(event) && "Create".equalsIgnoreCase(event)) {
                    parentBookmark.setAttributeValue(context, ATTRIBUTE_COUNT, String.valueOf(++count));
                } else if("Delete".equalsIgnoreCase(event)) {
                    parentBookmark.setAttributeValue(context, ATTRIBUTE_COUNT, String.valueOf(--count));
                }
            }
        } catch(Exception e) {
            return 1;
        } finally {
            ContextUtil.popContext(context);
        }
        return 0;
    }
}
