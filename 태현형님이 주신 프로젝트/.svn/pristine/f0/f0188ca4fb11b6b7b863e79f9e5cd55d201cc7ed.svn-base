import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import matrix.db.Access;
import matrix.db.Context;
import matrix.util.IntList;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.StringUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxSecurityMigrationMigrateTeamObjectsBase_mxJPO extends emxCommonMigration_mxJPO
{

    /**
     *
     */
    private static final long serialVersionUID = -5029177381386073045L;
    private static final StringList mulValSelects = new StringList();
    static private  Map<String, Integer> _accessMasksConstMapping = new HashMap<String, Integer>(35);
    static {
        _accessMasksConstMapping.put("read", Access.cRead);
        _accessMasksConstMapping.put("modify", Access.cModify);
        _accessMasksConstMapping.put("delete", Access.cDelete);
        _accessMasksConstMapping.put("checkout", Access.cCheckout);
        _accessMasksConstMapping.put("checkin", Access.cCheckin);
        _accessMasksConstMapping.put("lock", Access.cLock);
        _accessMasksConstMapping.put("unlock", Access.cUnLock);
        _accessMasksConstMapping.put("grant", Access.cGrant);
        _accessMasksConstMapping.put("revoke", Access.cRevoke);
        _accessMasksConstMapping.put("changeowner", Access.cChangeOwner);
        _accessMasksConstMapping.put("create", Access.cCreate);
        _accessMasksConstMapping.put("promote", Access.cPromote);
        _accessMasksConstMapping.put("demote", Access.cDemote);
        _accessMasksConstMapping.put("enable", Access.cEnable);
        _accessMasksConstMapping.put("disable", Access.cDisable);
        _accessMasksConstMapping.put("override", Access.cOverride);
        _accessMasksConstMapping.put("schedule", Access.cSchedule);
        _accessMasksConstMapping.put("revise", Access.cRevise);
        _accessMasksConstMapping.put("changevault", Access.cChangeLattice);
        _accessMasksConstMapping.put("changename", Access.cChangeName);
        _accessMasksConstMapping.put("changepolicy", Access.cChangePolicy);
        _accessMasksConstMapping.put("changetype", Access.cChangeType);
        _accessMasksConstMapping.put("fromconnect", Access.cFromConnect);
        _accessMasksConstMapping.put("toconnect", Access.cToConnect);
        _accessMasksConstMapping.put("fromdisconnect", Access.cFromDisconnect);
        _accessMasksConstMapping.put("todisconnect", Access.cToDisconnect);
        _accessMasksConstMapping.put("freeze", Access.cFreeze);
        _accessMasksConstMapping.put("thaw", Access.cThaw);
        _accessMasksConstMapping.put("execute", Access.cExecute);
        _accessMasksConstMapping.put("modifyform", Access.cModifyForm);
        _accessMasksConstMapping.put("viewform", Access.cViewForm);
        _accessMasksConstMapping.put("show", Access.cShow);
        _accessMasksConstMapping.put("majorrevise", Access.cMajorRevise);
        _accessMasksConstMapping.put("all", Access.cAll);
        _accessMasksConstMapping.put("none", Access.cNone);
    }

    public emxSecurityMigrationMigrateTeamObjectsBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }
	
	private static String BASIC						= "";
	private static String READ 						= "";
	private static String READ_WRITE 				= "";
	private static String READ_WRITE_RES_UNRES		= "";
	private static String ADD 						= "";
	private static String ADD_RES_UNRES				= "";
	private static String REMOVE 					= "";
	private static String REMOVE_RES_UNRES			= "";
	private static String ADD_REMOVE 				= "";
	private static String ADD_REMOVE_RES_UNRES 		= "";
	private static String FULL 						= "";	
	private static String FULL_RES_UNRES			= "";
    private static String READER 					= "";
	private static String AUTHOR 					= "";
	private static String OWNER 					= "";
	private static long BASIC_LONG_VALUE			= 0;
	private static long READ_LONG_VALUE				= 0;
	private static long READ_WRITE_LONG_VALUE		= 0;
	private static long ADD_LONG_VALUE				= 0;
	private static long REMOVE_LONG_VALUE			= 0;
	private static long ADD_REMOVE_LONG_VALUE		= 0;
	private static long FULL_LONG_VALUE				= 0;
	
	private static Long READ_WRITE_RES_UNRES_LONG_VALUE;
	private static Long ADD_RES_UNRES_LONG_VALUE;
	private static Long REMOVE_RES_UNRES_LONG_VALUE;
	private static Long ADD_REMOVE_RES_UNRES_LONG_VALUE;
	private static Long FULL_RES_UNRES_LONG_VALUE;
    public static StringList mxObjectSelects = new StringList(20);
    public static String parentWorkspaceId = "";
    public static String parentFolderId = "";
    public static String projectUserId = "";
    //public static String projectUserName="";
    public static String contentId = "";
    public static String parentWorkspaceGrantee = "";
    public static String parentFolderGrantee = "";
    public static String parentWorkspaceGrantGranteeAccess = "";
    public static String parentFolderGrantGranteeAccess = "";
    public static String contentParentId = "";
    public static String contentGrantGranteeAccess = "";
    public static String relationshipDataVaults = "";
    public static String relationshipSubVaults = "";
    public static String RELATIONSHIP_PROJECT_MEMBERS = "";
    public static String RELATIONSHIP_PROJECT_MEMBERSHIP = "";
    public static String RELATIONSHIP_VAULTED_OBJECTS = "";
    public static String TYPE_WORKSPACE = "";
    public static String TYPE_WORKSPACE_VAULT = "";
    public static String relationship_WorkspaceMember = "";
    public static String relationship_WorkspaceTemplateMember = "";
    public static String attribute_ProjectAccess ="";
    public static String templateMemberName = "";
    public static String templateMemberId = "";
    public static String templateMemberRole = "";
    public static String TYPE_WORKSPACE_TEMPLATE = "";
    public static String workspaceMemnerIds = "";
    public static StringList USER_PROJECTS = new StringList();
    public static boolean unconvertable = false;
    public static String unConvertableComments = "";
    public static String contentIdRev2 = "";
    public static String contentParentIdRev2 = "";
    public static String contentGrantGranteeAccess2 = "";
    
    public static String strFolderTypes = "";
    public static Map<String, String> PrjMap = new HashMap<String, String>();
    Map<String, Map> totalAccessMap=null;
    Map<String, Collection> objectAccessMap = null; 
	Map<String, Collection> parentAccessMap = null;
	public static Map<String, String> tempMap = new HashMap<String, String>();
	public static Map<String, Long> accessFlagMap = new HashMap<String, Long>();
	
	private boolean logTimings = false;
	private static boolean migrateContentSeparately = false;
    private static Set<String> contentTypesRequireGrants = new HashSet<>();
	private static StringList relSelect = new StringList("to.id");
	
    public static void init(Context context) throws Exception
    {
		
    	BASIC					= DomainAccess.getPhysicalAccessMasksForPolicy(context,"Default","Basic");//"read,show";
		READ 					= DomainAccess.getPhysicalAccessMasksForPolicy(context,"Default","Read");//"read,show,checkout";
		READ_WRITE 				= "read,show,checkout,modify,checkin,lock,unlock,revise";
		READ_WRITE_RES_UNRES 	= DomainAccess.getPhysicalAccessMasksForPolicy(context,"Default","Read Write");//"read,show,checkout,modify,checkin,lock,unlock,revise,reserve,unreserve";
		ADD 					= "read,show,checkout,modify,checkin,lock,unlock,revise,fromconnect,toconnect";
		ADD_RES_UNRES			= DomainAccess.getPhysicalAccessMasksForPolicy(context,"Default","Add");//"read,show,checkout,modify,checkin,lock,unlock,revise,fromconnect,toconnect,reserve,unreserve";
		REMOVE 					= "read,show,checkout,modify,checkin,lock,unlock,revise,fromdisconnect,todisconnect,delete";
		REMOVE_RES_UNRES 		= DomainAccess.getPhysicalAccessMasksForPolicy(context,"Default","Remove");//"read,show,checkout,modify,checkin,lock,unlock,revise,fromdisconnect,todisconnect,delete,reserve,unreserve";
		ADD_REMOVE 				= "read,show,checkout,modify,checkin,lock,unlock,revise,fromconnect,toconnect,fromdisconnect,todisconnect,delete";
		ADD_REMOVE_RES_UNRES 	= DomainAccess.getPhysicalAccessMasksForPolicy(context,"Default","Add Remove");//"read,show,checkout,modify,checkin,lock,unlock,revise,fromconnect,toconnect,fromdisconnect,todisconnect,delete,reserve,unreserve";
		FULL 					= "read,show,checkout,modify,checkin,lock,unlock,revise,promote,demote,fromconnect,toconnect,fromdisconnect,todisconnect,delete,changeowner";	
		FULL_RES_UNRES 			= DomainAccess.getPhysicalAccessMasksForPolicy(context,"Default","Full");//"read,show,checkout,modify,checkin,lock,unlock,revise,promote,demote,fromconnect,toconnect,fromdisconnect,todisconnect,delete,changeowner,changesov,reserve,unreserve";
		
		READER					= "Reader";
		AUTHOR 					= "Author";
		OWNER 					= "Owner";
		
		BASIC_LONG_VALUE		= getAccessFlag(FrameworkUtil.split(BASIC, ","));
		READ_LONG_VALUE			= getAccessFlag(FrameworkUtil.split(READ, ","));
		READ_WRITE_LONG_VALUE	= getAccessFlag(FrameworkUtil.split(READ_WRITE, ","));
		ADD_LONG_VALUE			= getAccessFlag(FrameworkUtil.split(ADD, ","));
		REMOVE_LONG_VALUE		= getAccessFlag(FrameworkUtil.split(REMOVE, ","));
		ADD_REMOVE_LONG_VALUE	= getAccessFlag(FrameworkUtil.split(ADD_REMOVE, ","));
		FULL_LONG_VALUE			= getAccessFlag(FrameworkUtil.split(FULL, ","));
		
		READ_WRITE_RES_UNRES_LONG_VALUE	= getAccessFlag(FrameworkUtil.split(READ_WRITE_RES_UNRES, ","));
		ADD_RES_UNRES_LONG_VALUE		= getAccessFlag(FrameworkUtil.split(ADD_RES_UNRES, ","));
		REMOVE_RES_UNRES_LONG_VALUE		= getAccessFlag(FrameworkUtil.split(REMOVE_RES_UNRES, ","));
		ADD_REMOVE_RES_UNRES_LONG_VALUE	= getAccessFlag(FrameworkUtil.split(ADD_REMOVE_RES_UNRES, ","));
		FULL_RES_UNRES_LONG_VALUE		= getAccessFlag(FrameworkUtil.split(FULL_RES_UNRES, ","));
        relationshipDataVaults = PropertyUtil.getSchemaProperty(context, "relationship_ProjectVaults");
        relationshipSubVaults = PropertyUtil.getSchemaProperty(context, "relationship_SubVaults");
        RELATIONSHIP_PROJECT_MEMBERS = PropertyUtil.getSchemaProperty(context, "relationship_ProjectMembers");
        RELATIONSHIP_PROJECT_MEMBERSHIP = PropertyUtil.getSchemaProperty(context, "relationship_ProjectMembership");
        RELATIONSHIP_VAULTED_OBJECTS = PropertyUtil.getSchemaProperty(context, "relationship_VaultedDocuments");

        // Issue with relationship_VaultedDocuments and relationship_VaultedDocumentsRev2 mapping to the same rel name
		String RELATIONSHIP_VAULTED_OBJECTS_REV2 = "Vaulted Documents Rev2";

        
        TYPE_WORKSPACE = PropertyUtil.getSchemaProperty(context, "type_Project");
        TYPE_WORKSPACE_VAULT =  PropertyUtil.getSchemaProperty(context, "type_ProjectVault");
        TYPE_WORKSPACE_TEMPLATE =  PropertyUtil.getSchemaProperty(context, "type_WorkspaceTemplate");
        relationship_WorkspaceMember = PropertyUtil.getSchemaProperty(context, "relationship_WorkspaceMember");
        relationship_WorkspaceTemplateMember = PropertyUtil.getSchemaProperty(context, "relationship_WorkspaceTemplateMember");
        attribute_ProjectAccess = PropertyUtil.getSchemaProperty(context, "attribute_ProjectAccess");
        parentWorkspaceId = "to[" + relationshipDataVaults + "].from.id";
        parentFolderId = "to[" + relationshipSubVaults + "].from.id";
        projectUserId = "from[" + RELATIONSHIP_PROJECT_MEMBERS + "].to.to[" + RELATIONSHIP_PROJECT_MEMBERSHIP + "].from.id";
        //projectUserName = "from[" + RELATIONSHIP_PROJECT_MEMBERS + "].to.to[" + RELATIONSHIP_PROJECT_MEMBERSHIP + "].from.name"; //NOT USED
        contentId = "from[" + RELATIONSHIP_VAULTED_OBJECTS + "].to.id";
        parentWorkspaceGrantee = "to[" + relationshipDataVaults + "].from.grantee"; //used by AccessMap
        parentFolderGrantee = "to[" + relationshipSubVaults + "].from.grantee"; //used by AccessMap
        parentWorkspaceGrantGranteeAccess = "to[" + relationshipDataVaults + "].from.grant.granteeaccess"; //used by AccessMap
        parentFolderGrantGranteeAccess = "to[" + relationshipSubVaults + "].from.grant.granteeaccess"; //used by AccessMap
		contentParentId = "to[" + RELATIONSHIP_VAULTED_OBJECTS + "].from.id"; //used by migrateContent
        contentGrantGranteeAccess = "from[" + RELATIONSHIP_VAULTED_OBJECTS + "].to.grant.granteeaccess";  //used by AccessMap
        templateMemberRole = "from["+ relationship_WorkspaceTemplateMember +"].attribute["+ attribute_ProjectAccess +"]"; //used by AccessMap
        templateMemberName = "from["+ relationship_WorkspaceTemplateMember +"].to.name";
        templateMemberId = "from["+ relationship_WorkspaceTemplateMember +"].to.id";
        workspaceMemnerIds = "from[Workspace Member].to.id";
        contentIdRev2 = "from[" + RELATIONSHIP_VAULTED_OBJECTS_REV2 + "].to.id";
        contentParentIdRev2 = "to[" + RELATIONSHIP_VAULTED_OBJECTS_REV2 + "].from.id"; //used by migrateContent
        contentGrantGranteeAccess2 = "to[" + RELATIONSHIP_VAULTED_OBJECTS_REV2 + "].from.grant.granteeaccess";  //used by AccessMap
        
		//store in HashSet for faster comparisons
        String contentTypes = EnoviaResourceBundle.getProperty(context, "emxFramework.FolderContentTypesThatRequireGrants");
		for (String symbolicType : contentTypes.split(",")) {
        	contentTypesRequireGrants.add(PropertyUtil.getSchemaProperty(context, symbolicType));
        } 

        mulValSelects.add(projectUserId);
        //mulValSelects.add(projectUserName);
        //mulValSelects.add(contentId);
        mulValSelects.add(parentWorkspaceGrantGranteeAccess);
        mulValSelects.add(contentGrantGranteeAccess); //?
        mulValSelects.add(parentFolderGrantGranteeAccess);
		//mulValSelects.add(contentParentId);
        mulValSelects.add(parentWorkspaceGrantee); //?
        mulValSelects.add(parentFolderGrantee); //?
        mulValSelects.add(templateMemberRole);
        mulValSelects.add(templateMemberName);
        mulValSelects.add(templateMemberId);
        mulValSelects.add(workspaceMemnerIds);
        //mulValSelects.add(contentIdRev2);
		//mulValSelects.add(contentParentIdRev2);
        
        mulValSelects.add("ownership");
        
        mxObjectSelects.addElement(parentWorkspaceId);
        mxObjectSelects.addElement(parentFolderId);
        mxObjectSelects.addElement(projectUserId);
        //mxObjectSelects.addElement(contentId);
        //mxObjectSelects.addElement(parentWorkspaceGrantee);
        //mxObjectSelects.addElement(parentFolderGrantee);
        mxObjectSelects.addElement("id");
        mxObjectSelects.addElement("type");
        mxObjectSelects.addElement("name");
        mxObjectSelects.addElement("policy");
        mxObjectSelects.addElement("grantee");
        mxObjectSelects.addElement("grant.granteeaccess");
        mxObjectSelects.addElement("owner");
        mxObjectSelects.addElement(DomainConstants.SELECT_ATTRIBUTE_DEFAULT_USER_ACCESS);
        //mxObjectSelects.addElement(contentParentId);
        mxObjectSelects.addElement(parentWorkspaceGrantGranteeAccess);
        mxObjectSelects.addElement(parentFolderGrantGranteeAccess);
        mxObjectSelects.addElement(templateMemberRole);
        mxObjectSelects.addElement(templateMemberName);
        mxObjectSelects.addElement(templateMemberId);
        mxObjectSelects.addElement(workspaceMemnerIds);
        //mxObjectSelects.addElement(contentIdRev2);
        //mxObjectSelects.addElement(contentParentIdRev2);
        
        mxObjectSelects.add("ownership");

		// Filter out Inactive users
        // String command = "list role *_PRJ where \"name !~= 'Grant*' && person.active=='TRUE'\"";	   
		String command = "list role *_PRJ";	
		
        String result = MqlUtil.mqlCommand(context, command, true);											   
        
        for (String token : result.split("\n")) {
        	PrjMap.put(token,"");
        }
		 
		 //To Resolve DB locks with parallel processing: Content is migrated separately
		 //This list is used to migrate Content after Bookmark Migration
		 command = "get env MIGRATE_TEAM_OBJECTS_CONTENT_SEPARATELY";
		 
		 result = MqlUtil.mqlCommand(context, command, true);
		 
		 System.out.println("MIGRATE_TEAM_OBJECTS_CONTENT_SEPARATELY is " + result +"\n");
		 
		 if (result != null && "TRUE".equalsIgnoreCase(result))
		 {
			migrateContentSeparately = true;
			mulValSelects.add(contentParentId);
			mulValSelects.add(contentParentIdRev2);
 			mulValSelects.add(contentGrantGranteeAccess2);
            mxObjectSelects.addElement(contentParentId);
            mxObjectSelects.addElement(contentParentIdRev2);
            mxObjectSelects.addElement(contentGrantGranteeAccess2);
		 } else {
			mulValSelects.add(contentId);
		    mxObjectSelects.addElement(contentId);
			mulValSelects.add(contentIdRev2);
			mxObjectSelects.addElement(contentIdRev2);
		 }
	 
    }
    
    public void migrateObjects(Context context, StringList objectList) throws Exception
    {
    	mqlLogWriter("In emxSecurityMigrationMigrateTeamObjects 'migrateObjects' method "+"\n");
    	long first = System.currentTimeMillis();
        init(context);
        String[] oidsArray = (String[])objectList.toArray(new String[objectList.size()]);
        MapList mapList = DomainObject.getInfo(context, oidsArray, mxObjectSelects, mulValSelects);
        mqlLogTimings("query search time "+(System.currentTimeMillis() - first));
        mqlLogWriter("=================================================================================================================================" + "\n");
	    mqlLogWriter("Migrate Content Separately: "+ migrateContentSeparately); 	
    	
        Iterator<?> itr = mapList.iterator();
    	Map<?, ?> m ;
    	String type="",oid="";
        while(itr.hasNext())
        {
			long first1 = System.currentTimeMillis();
            unconvertable = false;
            unConvertableComments = "";
            m = (Map<?, ?>)itr.next();
            type = (String)m.get("type");
            oid = (String)m.get("id");
            StringBuffer msgBuffer = new StringBuffer("Started Migrating Object Type '").append(type).append("'  Name '").append((String)m.get("name")).append("' with Object Id ").append(oid);
            mqlLogWriter(msgBuffer.toString());
            
            totalAccessMap = (Map<String, Map>)getTotalAccessMap(context, m);
        	objectAccessMap = totalAccessMap.get("OBJECTACCESSMAP");
        	parentAccessMap = totalAccessMap.get("PARENTACCESSMAP");
            mqlLogWriter("parentAccessMap = " + parentAccessMap +"\n");
			
			
            if(type.equals(TYPE_WORKSPACE) )
            {
            	migrateWorkspace(context, m);
            } else if( type.equals(TYPE_WORKSPACE_VAULT)) {
            	migrateWorkspaceFolder(context, m);
            } else if (type.equals(TYPE_WORKSPACE_TEMPLATE) ) {
            	migrateWorkspaceTemplate(context, m);
            } else if (migrateContentSeparately && contentTypesRequireGrants.contains(type)) {
			    migrateContent(context, m);
            } else {
	            mqlLogWriter((new StringBuffer("Un-Excepected type ").append(type).append(" found during team central migration .... \n")).toString());
	            unconvertable = true;
	            unConvertableComments += "Un-Excepected type " + type + " found during team central migration ....  \n";
            }
            if( unconvertable )
            {
                writeUnconvertedOID(unConvertableComments, oid);
            } else {
                loadMigratedOids(oid);
            }
            mqlLogWriter("-------------------------------------------" + "\n");
            mqlLogWriter(m.toString() +"\n");
            mqlLogWriter("#################################################################################################################################" + "\n");
			mqlLogTimings("successfully migrated object " + oid + " Time "+(System.currentTimeMillis() - first1));
    	}
            mqlLogTimings("success migrateObjects Time "+(System.currentTimeMillis() - first));
    }
    
    private void migrateWorkspaceTemplate(Context context, Map<?, ?> m) throws Exception
    {
    	mqlLogWriter("In migrateWorkspaceTemplate ");
    	long first = System.currentTimeMillis();
        String po = "Project Owner";
        String pl = "Project Lead";
        String templateId = (String)m.get("id");

        StringList templateMemberIds = (StringList)m.get(templateMemberId);
        StringList templateMemberNames = (StringList)m.get(templateMemberName);
        StringList templateMemberRoles = (StringList)m.get(templateMemberRole);
        if( (templateMemberIds.size() == templateMemberNames.size()) && (templateMemberIds.size() == templateMemberRoles.size()) )
        {
        	String memberName="";
        	String memberRole="";
        	String access="";
        	StringList ownershipList = (StringList)m.get("ownership");
        	
            String policy = (String)m.get("policy");
            for(int i=0; i<templateMemberIds.size(); i++)
            {
                memberName = (String)templateMemberNames.get(i);
                memberRole = (String)templateMemberRoles.get(i);
                access = "Read";
                if(po.equals(memberRole) || pl.equals(memberRole))
                {
                  access = "Add Remove";
                }

                if( PrjMap.containsKey(memberName+"_PRJ"))
                {
                	mqlLogWriter("Adding Multiple Ownership for Member '" + memberName + "' with access "+access +"  .... " );
                	DomainAccess.createObjectOwnership(context, templateId, null, memberName+"_PRJ" , access, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP,true,policy,ownershipList);                	
                } else {
                	mqlLogWriter("Adding Multiple Ownership for Member '"+ memberName + "' is not supported due to two reason 1. The member is a Role or Group 2. The member is not Migrated to be added...." );
                    unconvertable = true;
                    unConvertableComments += "Adding Multiple Ownership for Member '"+ memberName + "' is not supported due to two reason 1. The member is a Role or Group 2. The member is not Migrated to be added.... \n" ;
                }
            }
        }
        mqlLogTimings("success end migrateWorkspaceTemplate Time "+(System.currentTimeMillis() - first));
    }
	
    private void migrateWorkspaceFolder(Context context, Map<?, ?> m) throws Exception
    {
    	mqlLogWriter("In migrateWorkspaceFolder ");
    	long first = System.currentTimeMillis();
    	String parentId = (String) m.get(parentWorkspaceId);
    	if( parentId == null || "".equals(parentId))
    	{
    		parentId =  (String) m.get(parentFolderId);
    	}
    	if(UIUtil.isNullOrEmpty(parentId)){
    		mqlLogWriter("Folder '"+ (String)m.get("name") + "' is not migrated because it is not having any parent....");
    		unconvertable = true;
    		unConvertableComments += "Folder '"+ (String)m.get("name") + "' is not migrated because it is not having any parent.... \n";
    		return;
    	}
    	StringList grantees = (StringList)m.get("grantee");
    	grantees = removeDuplicates(grantees);
    	
    	mqlLogWriter("Started Migrating Object Access for Grantees = "+ grantees);

        migrateObjectAccess(context, objectAccessMap, parentAccessMap, grantees, m, parentId);
        mqlLogWriter("SuccessFully Migrated Workspace Folder = "+ contentParentId);

		if (!migrateContentSeparately)
		{
			String contentParentId = (String)m.get("id");
			StringList contentIds = (StringList)m.get(contentId);
			StringList contentIdsRev2 = (StringList)m.get(contentIdRev2);
			StringList contentList = new StringList();
			if(null != contentIds )
			{
			  contentList.addAll(contentIds);
			}
			if(null != contentIdsRev2 )
			{
			  contentList.addAll(contentIdsRev2);
			}
			mqlLogWriter("Started Migrating content Objects = "+ contentList);
			if( contentList != null && contentList.size() > 0 )
			{
				String[] oidsArray = new String[contentList.size()];
				oidsArray = (String[])contentList.toArray(oidsArray);
				long firstq = System.currentTimeMillis();
				
				MapList mapList = DomainObject.getInfo(context, oidsArray, mxObjectSelects, mulValSelects);
				mqlLogTimings("query content time "+(System.currentTimeMillis() - firstq));
			  
				mqlLogWriter("Content MapList = "+ mapList);
				
				Iterator<?> itr = mapList.iterator();
				Map cMap =null;
				String symbolicType ="";
				String type ="";
				String unConvertableFolderContentComments="";
				Map<String, Collection> contetntAccessMap =null;
				StringList contetnGrantees = null;
				while(itr.hasNext())
				{
					cMap = (Map)itr.next();
					type = (String)cMap.get("type");
					// Read the property key "emxFramework.FolderContentTypesThatRequireGrants"
					// and migrate only those Folder contents which are listed as part of this propery key in emxSystem.properties
					// Converted to use HashSet for performance
					/*if(!tempMap.containsKey(type)) {
						symbolicType = FrameworkUtil.getAliasForAdmin(context, "type", type, true);
						tempMap.put((String)cMap.get("type"),symbolicType);
					} else {
						symbolicType = tempMap.get(type);
					}
					if(!contentTypes.contains(symbolicType) ){
					*/
					if(!contentTypesRequireGrants.contains(type) ){
						mqlLogWriter("Object of type '"+ type + "' is not migrated because it does not require any grant....");
						unConvertableFolderContentComments = "Object of type '"+ type + "' is not migrated because it does not require any grant.... \n";
						writeUnconvertedOID(unConvertableFolderContentComments, (String)cMap.get("id"));
						continue;
					}
					
					contetntAccessMap = (Map<String, Collection>)((Map<String, Map>)getTotalAccessMap(context, cMap)).get("OBJECTACCESSMAP");
					contetnGrantees = (StringList)cMap.get("grantee");
					contetnGrantees = removeDuplicates(contetnGrantees);
					mqlLogWriter("Started Migrating Object "+ (String)cMap.get("type") + "  " + (String)cMap.get("name") + "  " + (String)cMap.get("revision") +" Access for Grantees = "+ contetnGrantees);
					migrateObjectAccess(context, contetntAccessMap, objectAccessMap, contetnGrantees, cMap, contentParentId);
					
					//The below method modifyPolicyForDocumentObject will be called 
					//only for the Document object which had been created with policy Document                
					String sPolicy = (String)cMap.get("policy");
					if("Document".equals(sPolicy)){
						modifyPolicyForDocumentObject(context, cMap);
					}
					
				}
				mqlLogTimings("Complete content including query time "+(System.currentTimeMillis() - firstq));
			}
		}
        mqlLogTimings("success end migrateWorkspaceFolder Time "+(System.currentTimeMillis() - first));
    }    
    
    private void migrateObjectAccess(Context context,  Map<String, Collection> objectAccessMap, Map<String, Collection> parentAccessMap, StringList grantees, Map<?, ?> m, String parentId) throws Exception
    {
    	mqlLogWriter("In migrateObjectAccess ");
    	long first = System.currentTimeMillis();
    	
        if( grantees != null )
        {
            Iterator gItr = grantees.iterator();
            boolean parentAccessAssigned = false;
            String objectId = (String)m.get("id");
            String objectName = (String)m.get("name");
            String objectType = (String)m.get("type");
            String policy = (String)m.get("policy");
            StringList ownershipList = (StringList)m.get("ownership");
 
 
            // In 13x, default value of below attribute is None; but in 2015x its default value is Read.
            // So while migrating we have to set the value of those objects which are created on 13x stack
        	String defaultUserAccess = (String)m.get(SELECT_ATTRIBUTE_DEFAULT_USER_ACCESS);        	
        	if("None".equals(defaultUserAccess)){
        		mqlLogWriter("Modify value of Attribute Default User Access for folder " + objectId);
        		String result = MqlUtil.mqlCommand(context, "modify bus $1 '$2' $3 ",objectId,ATTRIBUTE_DEFAULT_USER_ACCESS, "Viewer");        		
        	}
			
        	long startTimeHO = System.currentTimeMillis();
        	boolean hasObjectOwnership = hasObjectOwnership(context, objectId, parentId, "",ownershipList);
			mqlLogTimings("time hasObjectOwnership: " + (System.currentTimeMillis() - startTimeHO));
        				
        	String grantee = "";
			HashSet accessSet = null;
			StringList accessList = new StringList();
			long objectAccessLong = 0;
			long parentAccessLong = 0;
			StringList parentAccessList = new StringList();
			HashSet parentAccessSet =null;
			Map mpOwnershipinfo = null;
			MapList mlOwnerUpdateList = new MapList();
            StringBuffer sbMsgLog = new StringBuffer(50);
			long startTimeGrantee = System.currentTimeMillis();
            while(gItr.hasNext())
            {
            	mpOwnershipinfo= new HashMap<>();
                grantee = (String)gItr.next();
                if( grantee!= null && !"".equals(grantee.trim()) )
                {
                	long starttimeEachGrant = System.currentTimeMillis();
                    mqlLogWriter("grantee == "+ grantee);
                    accessSet = (HashSet)objectAccessMap.get(grantee);
                    mqlLogWriter("accessSet == "+ objectAccessMap.get(grantee));
                    accessList = new StringList();
                    if( accessSet != null )
                      accessList.addAll(accessSet);
                    objectAccessLong = getAccessFlag(accessList);
                    parentAccessSet = (HashSet)parentAccessMap.get(grantee);
                    parentAccessList = new StringList();
                    if( parentAccessSet != null )
                      parentAccessList.addAll(parentAccessSet);
                    parentAccessLong = getAccessFlag(parentAccessList);
					mqlLogWriter("time getting access list: " + (System.currentTimeMillis() - starttimeEachGrant));
					//System.out.println("ACCESS:" + parentAccessLong + " " + objectAccessLong);
                    if(parentAccessLong ==  objectAccessLong)
                    {
                    	if(!parentAccessAssigned && !hasObjectOwnership)
                        {
                            mqlLogWriter("------------------------------------------------------");
							sbMsgLog.setLength(0);
							sbMsgLog.append("Folder Access for ").append(objectName).append("is same as Parent ").append(parentId).append(" Access").toString();
                            mqlLogWriter(sbMsgLog.toString());
							sbMsgLog.setLength(0);
							sbMsgLog.append("Modify ").append(objectType).append(" ").append(objectId).append(" Add objectOwnership of parent object ").append(parentId);
                            mqlLogRequiredInformationWriter(sbMsgLog.toString());
                            mqlLogWriter("------------------------------------------------------");
							
							long startOWP = System.currentTimeMillis();
                            DomainAccess.createObjectOwnershipwithPolicy(context, objectId, parentId, "",policy);
							mqlLogTimings("time CREATE PARENT OWNERSHIP " + (System.currentTimeMillis() - startOWP));
                            parentAccessAssigned = true;
                        }
                    } else {
                    	mqlLogWriter("------------------------------------------------------");
						sbMsgLog.setLength(0);
						sbMsgLog.append("Folder Access for ").append(objectName).append("is NOT same as Parent ").append(parentId).append(" Access");
                        mqlLogWriter(sbMsgLog.toString());
                        if(!parentAccessAssigned && !hasObjectOwnership)
                        {
							sbMsgLog.setLength(0);
							sbMsgLog.append("Modify ").append(objectType).append(" ").append(objectId).append(" Add objectOwnership of parent object ").append(parentId);
                            mqlLogRequiredInformationWriter(sbMsgLog.toString());
                            DomainAccess.createObjectOwnershipwithPolicy(context, objectId, parentId, "",policy);
                            parentAccessAssigned = true;
                        }
                        if( PrjMap.containsKey(grantee+"_PRJ"))
                        {
								sbMsgLog.setLength(0);
								sbMsgLog.append("Modify Folder ").append(objectId).append(" Add objectOwnership for user ").append(grantee).append(" with access as ").append(accessList);
                                mqlLogRequiredInformationWriter(sbMsgLog.toString());
                                mpOwnershipinfo.put("id", objectId);
                                mpOwnershipinfo.put("org",null);
                                mpOwnershipinfo.put("proj",grantee + "_PRJ");
                                String newLogicalName = getLogicalAccessMapping(accessList);
                                mqlLogWriter("accessList == "+ accessList);
                                mqlLogWriter("newLogicalName == "+ newLogicalName);
                                if(UIUtil.isNotNullAndNotEmpty(newLogicalName)){
                                	 mpOwnershipinfo.put("access",newLogicalName);
                                }else{
									 mpOwnershipinfo.put("access",StringUtil.join(accessList, ","));
                                }
                                mpOwnershipinfo.put("comment",DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
                                mlOwnerUpdateList.add(mpOwnershipinfo);
                                //DomainAccess.createObjectOwnership(context, objectId , null, grantee + "_PRJ", StringUtil.join(accessList, ","), DomainAccess.COMMENT_MULTIPLE_OWNERSHIP,true,policy,ownershipList);
                        } else {
                            mqlLogWriter("Modify Folder " + objectId + " Add objectOwnership for user '" + grantee +"' is not supported due to two reason 1. The member is a Role or Group 2. The member is not Migrated to be added...." );
                            unconvertable = true;
                            unConvertableComments += "Modify Folder " + objectId + " Add objectOwnership for user '" + grantee +"' is not supported due to two reason 1. The member is a Role or Group 2. The member is not Migrated to be added.... \n" ;
                        }
                        mqlLogWriter("------------------------------------------------------");
                    }
                }
            }
        	mqlLogTimings("time to loop through grantees: " + (System.currentTimeMillis() - startTimeGrantee));

            if(mlOwnerUpdateList.size()>0) {
            	mqlLogWriter("mlOwnerUpdateList---"+mlOwnerUpdateList);
            	DomainAccess.createObjectOwnershipMultiple(context,objectId,mlOwnerUpdateList,true, policy,ownershipList);
            }
        }
    }

    private void migrateContent(Context context, Map<?, ?> m) throws Exception{
    	mqlLogWriter("In migrateContent ");
    	long first = System.currentTimeMillis();
            
		StringList parentIdSelect = null;	
		if((StringList)m.get(contentParentId)!=null)
			parentIdSelect = (StringList)m.get(contentParentId);
		else
			parentIdSelect = (StringList)m.get(contentParentIdRev2);

		String unConvertableFolderContentComments="";
		Map<String, Collection> contentAccessMap =null;
		StringList contentGrantees = null;
		String type = (String)m.get("type");
		// Read the property key "emxFramework.FolderContentTypesThatRequireGrants"
		// and migrate only those Folder contents which are listed as part of this propery key in emxSystem.properties
		// Should already be filtered out by FindObjects to only include these types.
		/*
		if(!tempMap.containsKey(type)) {
			symbolicType = FrameworkUtil.getAliasForAdmin(context, "type", type, true);
			tempMap.put((String)m.get("type"),symbolicType);
		} else {
			symbolicType = tempMap.get(type);
		}
		if(!contentTypes.contains(symbolicType) ){
         */
		if(!contentTypesRequireGrants.contains(type) ){
			mqlLogWriter("Object of type '"+ type + "' is not migrated because it does not require any grant....");
			unConvertableFolderContentComments = "Object of type '"+ type + "' is not migrated because it does not require any grant.... \n";
			writeUnconvertedOID(unConvertableFolderContentComments, (String)m.get("id"));
			return;
		}
		
		//contentAccessMap = (Map<String, Collection>)((Map<String, Map>)getTotalAccessMap(context, m)).get("OBJECTACCESSMAP");
		contentGrantees = (StringList)m.get("grantee");
		contentGrantees = removeDuplicates(contentGrantees);

		mqlLogWriter("Parent Ids "+ parentIdSelect);
		if (parentIdSelect !=null) {
			Iterator<String> parentIdIterator = parentIdSelect.iterator();
			String parentId = "";
			while (parentIdIterator.hasNext()) {
				parentId = parentIdIterator.next();
		        mqlLogWriter("Parent Id "+ parentId);
				
				mqlLogWriter("Started Migrating Object "+ (String)m.get("type") + "  " + (String)m.get("name") + "  " + (String)m.get("revision") +" Access for Grantees = "+ contentGrantees + " for Parent ID " + parentId);
				//migrateObjectAccess(context, contentAccessMap, objectAccessMap, contentGrantees, m, parentId);
 				//fxymigrateObjectAccess(context, objectAccessMap, objectAccessMap, contentGrantees, m, parentId);
 				migrateObjectAccess(context, objectAccessMap, parentAccessMap, contentGrantees, m, parentId);
           }
        }		

		//The below method modifyPolicyForDocumentObject will be called 
		//only for the Document object which had been created with policy Document                
		String sPolicy = (String)m.get("policy");
		if("Document".equals(sPolicy)){
			modifyPolicyForDocumentObject(context, m);
		}
                
        mqlLogTimings("success end migrateContent Time "+(System.currentTimeMillis() - first));
    }
	
    public static boolean hasObjectOwnership(Context context, String objectId,  String parentId, String comment,StringList ownershipList) throws FrameworkException {
        comment = (comment == null) ? DomainConstants.EMPTY_STRING : comment;
        if(ownershipList.contains(parentId + "|" + comment)) {
        	 return true;
        } else {
            return false;
        }
		/*
		 * String result = MqlUtil.mqlCommand(context,
		 * "print bus $1 select $2 dump",objectId,"ownership[" + parentId + "|" +
		 * comment + "]"); if("true".equalsIgnoreCase(result) ) { return true; } else {
		 * return false; }
		 */
    }
	
	
    private static StringList removeDuplicates(StringList list)
    {
        HashSet<String> hashSet = new HashSet<String>();
        hashSet.addAll(list);
        list.clear();
        list.addAll(hashSet);
        return list;
    }

    public void mqlLogRequiredInformationWriter(String command) throws Exception
    {
        super.mqlLogRequiredInformationWriter(command +"\n");
    }
    public void mqlLogWriter(String command) throws Exception
    {
        super.mqlLogWriter(command +"\n");
    }
    public void mqlLogTimings(String command) throws Exception
    {
		if (logTimings)
			super.mqlLogRequiredInformationWriter(command +"\n");
    }
	
    private Map<String, Map> getTotalAccessMap(Context context, Map<?, ?> m) throws Exception
    {
        Set keySet = m.keySet();
        Iterator keyItr = keySet.iterator();
        Map<String, Map> totalAccessMap = new HashMap<String, Map>();
        Map<String, Collection> objectAccessMap = new HashMap<String, Collection>();
        Map<String, Collection> parentAccessMap = new HashMap<String, Collection>();
        totalAccessMap.put("OBJECTACCESSMAP", objectAccessMap);
        totalAccessMap.put("PARENTACCESSMAP", parentAccessMap);
        //Collection accessBits = new HashSet(56);
        String key="";
        int startBindex = 0;
        int closeBindex = 0;
        String gratorGrantee="";
        String grantee="";
        String keyValue="";
        StringList accessList = null;
        Map<String, Collection> localAccessMap = null;
        Collection accessBits = null;
        while(keyItr.hasNext())
        {
            key = (String)keyItr.next();
            if( key.indexOf("grant[") >= 0)
            {
                startBindex = key.indexOf("[", key.indexOf("grant"));
                closeBindex = key.indexOf("]", key.indexOf("grant"));
                gratorGrantee = key.substring(startBindex+1, closeBindex);
                if( gratorGrantee.indexOf(",") > 0)
                {
                    grantee = gratorGrantee.substring(gratorGrantee.indexOf(",")+1, gratorGrantee.length());
                    keyValue = (String)m.get(key);
                    keyValue = keyValue.replace("majorrevise,", "");
                    if(keyValue.contains("grant") )
                    {
                        keyValue = keyValue.replace("grant,", "");
                        keyValue = keyValue.replace("revoke,", "changeowner,");
                    }
                    localAccessMap = new HashMap<String, Collection>();
                    if( key.startsWith("grant[") )
                    {
                        localAccessMap = totalAccessMap.get("OBJECTACCESSMAP");
                    } else {
                        localAccessMap = totalAccessMap.get("PARENTACCESSMAP");
                    }
                    accessList = StringUtil.split(keyValue, ",");
                	if (!accessFlagMap.containsKey(keyValue))
					{
						getAccessFlag(accessList);
					}
                    if(localAccessMap.containsKey(grantee))
                    {
                        accessBits = (Collection)localAccessMap.get(grantee);
                        accessBits.addAll(accessList);
                    } else {
                        accessBits = new HashSet(56);
                        accessBits.addAll(accessList);
                        localAccessMap.put(grantee, accessBits);
                    }
                }
            }
        }
        return totalAccessMap;
    }
	
    private void migrateWorkspace(Context context, Map<?, ?> m) throws Exception
    {
    	mqlLogWriter("In migrateWorkspace ");
    	long first = System.currentTimeMillis();
        StringList projectMemberIds = (StringList)m.get(projectUserId);
        if( projectMemberIds != null )
        {
            Iterator memberIdItr = projectMemberIds.iterator();
            StringList grantees = (StringList)m.get("grantee");
            grantees = removeDuplicates(grantees);
            Iterator gItr = grantees.iterator();
            String grantee="";
            HashSet accessSet = null;
            StringList accessList =null;
            String name = (String)m.get("name");
            StringList ownershipList = (StringList)m.get("ownership");
            String policy = (String)m.get("policy");
            String id =(String)m.get("id");
            while(gItr.hasNext())
            {
                grantee = (String)gItr.next();
                accessSet = (HashSet)objectAccessMap.get(grantee);
                accessList = new StringList();
                accessList.addAll(accessSet);
                if(PrjMap.containsKey(grantee+"_PRJ"))
                {
                	mqlLogWriter("------------------------------------------------------");
                    mqlLogWriter("Modify Workspace "+name+" for user "+ grantee +" with access as "+ StringUtil.join(accessList, ",") +" with comment as "+ DomainAccess.COMMENT_MULTIPLE_OWNERSHIP +" policy name "+policy+ "ownershipList "+ ownershipList.toString());
                    mqlLogWriter("------------------------------------------------------");
                    DomainAccess.createObjectOwnership(context, id , null, grantee + "_PRJ", StringUtil.join(accessList, ","), DomainAccess.COMMENT_MULTIPLE_OWNERSHIP,true,policy,ownershipList);
                } else {
                	mqlLogWriter("Modify Workspace " + id +  " adding Multiple Ownership for user '" + grantee +"' is not supported due to two reason 1. The member is a Role or Group 2. The member is not Migrated to be added...." );
                    unconvertable = true;
                    unConvertableComments += "Modify Workspace " + id + " adding Multiple Ownership for user '" + grantee +"' is not supported due to two reason 1. The member is a Role or Group 2. The member is not Migrated to be added.... \n" ;
                }
            }
            StringList addedUsers = (StringList)m.get(workspaceMemnerIds);
            while(memberIdItr.hasNext())
            {
                String memberId = (String)memberIdItr.next();
                if( addedUsers == null || !addedUsers.contains(memberId))
                {
                	DomainRelationship.connect(context, id, "Workspace Member", memberId, true);
                    mqlLogWriter("Connect Workspace " + name + " with user id "+ memberId +" as Workspace Member");
                }
            }
        } else {
        	mqlLogWriter("The Workspace '"+ m.get("name") +"' doesn't have any members connected to migrate to new security Model");
            unconvertable = true;
            unConvertableComments += "The Workspace '"+ m.get("name") +"' doesn't have any members connected to migrate to new security Model \n" ;

        }
        mqlLogTimings("end migrateWorkspace time "+(System.currentTimeMillis() - first));
    }
    static protected Long getAccessFlag(StringList masks) throws Exception
    {
    	String keyValue = String.join(",", masks);
		//System.out.println("getAccessFlag " + keyValue);
		if (accessFlagMap.containsKey(keyValue))
		{
			//System.out.println("getAccessFlag USING CACHE");

			return accessFlagMap.get(keyValue);
		}
		else
		{	
	        IntList intList = new IntList(masks.size());
	        Access access = new Access();
	        for (int i=0; i < masks.size(); i++) {
	            String mask = ((String) masks.get(i)).trim().toLowerCase();
	            Object maskValue = _accessMasksConstMapping.get(mask);
	            if (maskValue != null) {
	                int cMask = (Integer) maskValue;
	                intList.addElement(cMask);
	            }
	        }
	        access.processIntList(intList);
	        Long accessFlag = Long.valueOf(access.getLongAccessFlag());
			//System.out.println("getAccessFlag ADDING CACHE " +accessFlag);
			accessFlagMap.put(keyValue, accessFlag);
			return accessFlag;
		}
    }
    private Map<String, Collection> getObjectAccessMap(Context context, Map<?, ?> m)
    {
        Set keySet = m.keySet();
        Iterator keyItr = keySet.iterator();
        Map<String, Collection> accessMap = new HashMap<String, Collection>();
        //Collection accessBits = new HashSet(56);
        while(keyItr.hasNext())
        {
            String key = (String)keyItr.next();
            if( key.startsWith("grant["))
            {
                int startBindex = key.indexOf("[");
                int closeBindex = key.indexOf("]");
                String gratorGrantee = key.substring(startBindex+1, closeBindex);
                if( gratorGrantee.indexOf(",") > 0)
                {
                    String grantee = gratorGrantee.substring(gratorGrantee.indexOf(",")+1, gratorGrantee.length());
                    String keyValue = (String)m.get(key);
                    keyValue = keyValue.replace("majorrevise,", "");
                    if(keyValue.contains("grant") )
                    {
                        keyValue = keyValue.replace("grant,", "");
                        keyValue = keyValue.replace("revoke,", "changeowner,");
                    }
                    StringList accessList = StringUtil.split(keyValue, ",");
                    if(accessMap.containsKey(grantee))
                    {
                        Collection accessBits = (Collection)accessMap.get(grantee);
                        accessBits.addAll(accessList);
                    } else {
                        Collection accessBits = new HashSet(56);
                        accessBits.addAll(accessList);
                        accessMap.put(grantee, accessBits);
                    }
                }
            }
        }
        return accessMap;
    }

    /**
     * This method is used to modify the policy of Document objects
     * In migration we are modifying the policy to Document Release if it is Document
     * @param context
     * @param m
     * @throws Exception
     */
    private void modifyPolicyForDocumentObject(Context context, Map<?, ?> m) throws Exception
    {        
    	String objectId = (String)m.get(SELECT_ID);
    	mqlLogWriter("------------------------------------------------------");
    	mqlLogWriter("Modify policy for Document object "+objectId);
    	String mqlCommand = "modify bus $1 policy $2";
    	MqlUtil.mqlCommand(context, mqlCommand, objectId, POLICY_DOCUMENT);
    	mqlCommand = "promote bus $1";
    	MqlUtil.mqlCommand(context, mqlCommand, objectId);
    	mqlLogWriter("------------------------------------------------------");
    }

    public static void removeTeamCentralGrants(Context context, String[] args) throws Exception
    {
        String cmd = "modify policy 'Workspace' state 'Create' remove user 'Workspace Lead Grantor' all ";
        MqlUtil.mqlCommand(context, cmd, true);
        cmd = "modify policy 'Workspace' state 'Create' remove user 'Access Grantor' all ";
        MqlUtil.mqlCommand(context, cmd, true);

        cmd = "modify policy 'Workspace' state 'Active' remove user 'Workspace Lead Grantor' all ";
        MqlUtil.mqlCommand(context, cmd, true);
        cmd = "modify policy 'Workspace' state 'Active' remove user 'Access Grantor' all ";
        MqlUtil.mqlCommand(context, cmd, true);

        cmd = "modify policy 'Workspace' state 'Archive' remove user 'Workspace Lead Grantor' all ";
        MqlUtil.mqlCommand(context, cmd, true);

        cmd = "modify policy 'Workspace Vaults' state 'Exists' remove user 'Workspace Lead Grantor' all ";
        MqlUtil.mqlCommand(context, cmd, true);
        cmd = "modify policy 'Workspace Vaults' state 'Exists' remove user 'Access Grantor' all ";
        MqlUtil.mqlCommand(context, cmd, true);
    }

/**
     * Over written methods from emxCommonMigrationBase to handle 'Vaulted Documents Rev2' content ids
	 * Used when MigrateContentSeparately for perfomrance improvements
	 * This method writes the objectId to the sequential file, called from within JPO query where clause
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args[]  - [0]ObjectId, [1]type
     * @returns boolean
     * @throws Exception if the operation fails
     */
    public boolean writeOID(Context context, String[] args) throws Exception
    {
    	String writeIdStr = getObjectId(context, args); 
    	if ( writeIdStr != null && !"".equals(writeIdStr) )
        {
        	fileWriter(writeIdStr);
        }
        return false;
    }
	
    public String getObjectId(Context context, String[] args) throws Exception
    {
		//From the relId get the to.id
		MapList relML = DomainRelationship.getInfo(context, new String[]{ args[0]}, relSelect);
        if ( relML != null &&! relML.isEmpty() )
        {
        	return (String)((Map)relML.get(0)).get("to.id");
        } else {
        	return null;
        }
    }
	private static String getLogicalAccessMapping(StringList access) throws Exception{
		String logicalName 	= "";
		long accessLongValue = getAccessFlag(access);
		if(BASIC_LONG_VALUE == accessLongValue){
			logicalName = "";
		} else if( READ_LONG_VALUE == accessLongValue){
			logicalName = READER;
		} else if(READ_WRITE_LONG_VALUE == accessLongValue || READ_WRITE_RES_UNRES_LONG_VALUE == accessLongValue 
				 || ADD_LONG_VALUE == accessLongValue || ADD_RES_UNRES_LONG_VALUE == accessLongValue
				 || REMOVE_LONG_VALUE == accessLongValue || REMOVE_RES_UNRES_LONG_VALUE == accessLongValue
				 || ADD_REMOVE_LONG_VALUE == accessLongValue || ADD_REMOVE_RES_UNRES_LONG_VALUE == accessLongValue) {
			logicalName = AUTHOR;
		} else if(FULL_LONG_VALUE == accessLongValue || FULL_RES_UNRES_LONG_VALUE == accessLongValue){		
			logicalName = OWNER;
		}
		return logicalName;
	}  
    
}
