
import matrix.db.Access;
import matrix.db.Context;
import matrix.util.IntList;
import matrix.util.StringList;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.CacheUtil;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.jdom.Element;
import com.matrixone.jdom.input.SAXBuilder;

public class emxSecurityMigrationMigrateMOAAccessBase_mxJPO extends emxCommonMigration_mxJPO
{

    /**
     *Migration script to migrate the old access mask and access bit to new access mask and updated access bit as per the baseline behaviour
     */
	
    private static final long serialVersionUID = -5029177381386073045L;
    
    public emxSecurityMigrationMigrateMOAAccessBase_mxJPO(Context context, String[] args) throws Exception {
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
	
	private static StringList POLICY_LIST           = null;
	private static String ATTRIBUTE_DEFAULT_USER_ACCESS = "";
	private static Long READ_WRITE_RES_UNRES_LONG_VALUE;
	private static Long ADD_RES_UNRES_LONG_VALUE;
	private static Long REMOVE_RES_UNRES_LONG_VALUE;
	private static Long ADD_REMOVE_RES_UNRES_LONG_VALUE;
	private static Long FULL_RES_UNRES_LONG_VALUE;
	private static final String KEY_CACHE_DEFAULT_POLICY_LIST = "default_policy_list";
	
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
	
    /*New mapping for policy Workspace,Workspace Vaults,Document Release,Workspace Template,Template Workspace Vault in DomainAccess page object as in 17x...
     * 
	 <policy>Workspace,Workspace Vaults,Document Release,Workspace Template,Template Workspace Vault
        <logicalMappings>
            <logical physical="read,show,checkout,toconnect,todisconnect" inheritedLogicalNames="">Reader</logical>		
            <logical physical="read,show,checkout,modify,checkin,lock,unlock,revise,reserve,unreserve,toconnect,todisconnect,fromconnect,fromdisconnect,changetype,majorrevise" inheritedLogicalNames="">Author</logical>	
			<logical physical="read,show,checkout,modify,checkin,lock,unlock,revise,reserve,unreserve,toconnect,todisconnect,fromconnect,fromdisconnect,changetype,majorrevise,delete,changesov,changeowner,promote,demote">Owner</logical>
        </logicalMappings>
        <accessMasksInheritanceLimit></accessMasksInheritanceLimit>
    </policy>
	 * 
	 */
    	
    public static void init(Context context) throws Exception
    {
		BASIC					= "read,show";
		READ 					= "read,show,checkout";
		READ_WRITE 				= "read,show,checkout,modify,checkin,lock,unlock,revise";
		READ_WRITE_RES_UNRES 	= "read,show,checkout,modify,checkin,lock,unlock,revise,reserve,unreserve";
		ADD 					= "read,show,checkout,modify,checkin,lock,unlock,revise,fromconnect,toconnect";
		ADD_RES_UNRES			= "read,show,checkout,modify,checkin,lock,unlock,revise,fromconnect,toconnect,reserve,unreserve";
		REMOVE 					= "read,show,checkout,modify,checkin,lock,unlock,revise,fromdisconnect,todisconnect,delete";
		REMOVE_RES_UNRES 		= "read,show,checkout,modify,checkin,lock,unlock,revise,fromdisconnect,todisconnect,delete,reserve,unreserve";
		ADD_REMOVE 				= "read,show,checkout,modify,checkin,lock,unlock,revise,fromconnect,toconnect,fromdisconnect,todisconnect,delete";
		ADD_REMOVE_RES_UNRES 	= "read,show,checkout,modify,checkin,lock,unlock,revise,fromconnect,toconnect,fromdisconnect,todisconnect,delete,reserve,unreserve";
		FULL 					= "read,show,checkout,modify,checkin,lock,unlock,revise,promote,demote,fromconnect,toconnect,fromdisconnect,todisconnect,delete,changeowner";	
		FULL_RES_UNRES 			= "read,show,checkout,modify,checkin,lock,unlock,revise,promote,demote,fromconnect,toconnect,fromdisconnect,todisconnect,delete,changeowner,changesov,reserve,unreserve";
		
		READER					= "Reader";
		AUTHOR 					= "Author";
		OWNER 					= "Owner";
		
		BASIC_LONG_VALUE		= getAccessFlag(BASIC);
		READ_LONG_VALUE			= getAccessFlag(READ);
		READ_WRITE_LONG_VALUE	= getAccessFlag(READ_WRITE);
		ADD_LONG_VALUE			= getAccessFlag(ADD);
		REMOVE_LONG_VALUE		= getAccessFlag(REMOVE);
		ADD_REMOVE_LONG_VALUE	= getAccessFlag(ADD_REMOVE);
		FULL_LONG_VALUE			= getAccessFlag(FULL);
		
		READ_WRITE_RES_UNRES_LONG_VALUE	= getAccessFlag(READ_WRITE_RES_UNRES);
		ADD_RES_UNRES_LONG_VALUE		= getAccessFlag(ADD_RES_UNRES);
		REMOVE_RES_UNRES_LONG_VALUE		= getAccessFlag(REMOVE_RES_UNRES);
		ADD_REMOVE_RES_UNRES_LONG_VALUE	= getAccessFlag(ADD_REMOVE_RES_UNRES);
		FULL_RES_UNRES_LONG_VALUE		= getAccessFlag(FULL_RES_UNRES);
		
		POLICY_LIST             = getPolicyDomainAccessSettings(context, "Workspace");
		
		ATTRIBUTE_DEFAULT_USER_ACCESS = PropertyUtil.getSchemaProperty("attribute_DefaultUserAccess");
    }

  /**?
   * 
   * 
   * 
   * execute program emxSecurityMigrationMigrateMOAAccessBase "/home/data/RTV" 1 n "list of policies";
   * Method to Migrate the access for the objects
   */
    public void migrateObjects(Context context, StringList objectList) throws Exception
    {
        mqlLogRequiredInformationWriter("In emxSecurityMigrationMigrateMOAAccess 'migrateObjects' method "+"\n");
        mqlLogRequiredInformationWriter("=================================================================================================================================" + "\n");
        init(context);
        String[] oidsArray 			    = new String[objectList.size()];
        oidsArray					    = (String[])objectList.toArray(oidsArray);
        Map accessSummaryMap	        = getAccessSummaryList(context, oidsArray);
        Iterator itrAccessSummaryMap    = accessSummaryMap.entrySet().iterator();
    	while (itrAccessSummaryMap.hasNext()) {
    		Map.Entry entryAccessSummary= (Map.Entry)itrAccessSummaryMap.next();
    		String objectId             = (String)entryAccessSummary.getKey();
    		Map objectDetails           = (Map)entryAccessSummary.getValue();
    		String type                 = (String)objectDetails.get("type");
    		String name                 = (String)objectDetails.get("name");
    		String revision             = (String)objectDetails.get("revision");
    		String policy               = (String)objectDetails.get("policy");
    		String attributeDUA         = (String)objectDetails.get("ATTRIBUTE_DEFAULT_USER_ACCESS");
    		if(UIUtil.isNotNullAndNotEmpty(attributeDUA)){
    			String newValue = updateLogicalMappingforDefaultTypes(context, attributeDUA);
    			MqlUtil.mqlCommand(context, "mod bus $1 $2 $3", objectId, ATTRIBUTE_DEFAULT_USER_ACCESS, newValue);
    		}
    		Map ownershipDetails        = (Map)objectDetails.get("ownership");
    		Iterator itrOwnershipDetails = ownershipDetails.entrySet().iterator();
    		while (itrOwnershipDetails.hasNext()) {
    			Map.Entry entryOwnershipDetails = (Map.Entry)itrOwnershipDetails.next();
    			String ownershipKey             = (String)entryOwnershipDetails.getKey();
    			Map ownershipValue              = (Map)entryOwnershipDetails.getValue();
    			String businessobject           = (String)ownershipValue.get("businessobject");
    			//AS IT IS INHERITED FROM PARENT AND WE ARE NOT EXPLICITLY GIVING ANY ACCESS SO NOT REQUIRED FOR MIGRATION
    			if(UIUtil.isNotNullAndNotEmpty(businessobject)){
    				checkAndWriteUnconvertedOID(type+","+name+","+revision+",Ownership Update is not required \n" , objectId);
    	     		mqlLogRequiredInformationWriter("As it is inherited from parent and we are not explicitly giving any access no nned to migrate '" + type + "'  Name '"+ name + "' Revision '"+ revision +"' with Object Id "+ objectId + "\n");
					continue;
				}
    			String project                  = (String)ownershipValue.get("project");
    			String organization             = (String)ownershipValue.get("organization");
    			String access                   = (String)ownershipValue.get("access");
    			String comment                  = (String)ownershipValue.get("comment");   			
    			String newLogicalName			= getLogicalAccessMapping(access);
    			mqlLogRequiredInformationWriter("Started Migrating Object Type '" + type + "'  Name '"+ name + "' Revision '"+ revision +"' with Object Id "+ objectId + "\n");
 	        	mqlLogRequiredInformationWriter("-----------------------------------------------------------------------------------------------------------------------" + "\n");
    			if (UIUtil.isNotNullAndNotEmpty(organization) && UIUtil.isNotNullAndNotEmpty(project) && UIUtil.isNotNullAndNotEmpty(newLogicalName)) {
 	        		DomainAccess.createObjectOwnership(context, objectId, organization, project, newLogicalName, comment, true);
 	        		checkAndloadMigratedOids(objectId);  
 	        		mqlLogRequiredInformationWriter("Migrated security context  :::: "+organization+"."+project+ "\n");
 	        	} else if (UIUtil.isNotNullAndNotEmpty(project) && UIUtil.isNotNullAndNotEmpty(newLogicalName)) {
 	        		DomainAccess.createObjectOwnership(context, objectId, null, project, newLogicalName, comment, true);
 	        		checkAndloadMigratedOids(objectId);  
 	        		mqlLogRequiredInformationWriter("Migrated project           :::: "+project+ "\n");               
 	        	} else {
 	        		checkAndWriteUnconvertedOID(type+","+name+","+revision+",Ownership Update is not required \n" , objectId);
 	        		mqlLogRequiredInformationWriter("Access bit does not match with the DomainAccess page Object for Type '" + type + "'  Name '"+ name + "' Revision '"+ revision +"' with Object Id "+ objectId + "\n");
 	        		mqlLogRequiredInformationWriter("-----------------------------------------------------------------------------------------------------------------------" + "\n");
 	        		continue;
 	        	}
 	        	checkAndloadMigratedOids(objectId);  	               
 	        	mqlLogRequiredInformationWriter("-----------------------------------------------------------------------------------------------------------------------" + "\n");              	 	        	
 	        }
    	}
 	    mqlLogRequiredInformationWriter("Finished migrating all the data..........."+ "\n");
   	}

    /**
     * Method to get the access summary for the objectId
     * @param context
     * @param objectId
     * @return
     * @throws Exception
     */
    private Map getAccessSummaryList(Context context, String[] oidsArray) throws Exception {
		String ownershipKeyString      = "(?is)\\[(.*?)\\]"; // getting the data between square brackets
		String ownershipMapKeyString   = "\\.([^].]+)$"; // getting the data after ].
		Pattern ownershipKeyPattern    = Pattern.compile(ownershipKeyString);	//init block
		Pattern ownershipMapKeyPattern = Pattern.compile(ownershipMapKeyString);		//init block										// ].
		StringList objectSelects       = new StringList();
		objectSelects.add("id");
		objectSelects.add("type");
		objectSelects.add("name");
		objectSelects.add("revision");
		objectSelects.add("policy");
		objectSelects.add("attribute["+ATTRIBUTE_DEFAULT_USER_ACCESS+"].value");
		objectSelects.add("ownership.businessobject");
		objectSelects.add("ownership.organization");
		objectSelects.add("ownership.project");
		objectSelects.add("ownership.access");
		objectSelects.add("ownership.comment");
		MapList mapList      = DomainObject.getInfo(context, oidsArray, objectSelects);
		
		Map accessSummaryMap = new HashMap();
		for (int i = 0; i < mapList.size(); i++) {
			Map<String, String> map = (Map) mapList.get(i);
			Map objectDetailsMap    = new HashMap();
			String policyName       = map.get("policy");
			if (POLICY_LIST.contains(policyName)) {	//change required
				objectDetailsMap.put("objectId", map.get("id"));
				objectDetailsMap.put("type", map.get("type"));
				objectDetailsMap.put("name", map.get("name"));
				objectDetailsMap.put("revision", map.get("revision"));
				objectDetailsMap.put("policy", map.get("policy"));
				objectDetailsMap.put("ATTRIBUTE_DEFAULT_USER_ACCESS", map.get("attribute["+ATTRIBUTE_DEFAULT_USER_ACCESS+"].value"));
				Map ownershipDetailsMap = new HashMap();
				for (Map.Entry<String, String> entry : map.entrySet()) {
					String key = entry.getKey();
					String value = entry.getValue();
					if ("id".equals(key.toString()) || "type".equals(key.toString()) || "name".equals(key.toString())
							|| "revision".equals(key.toString()) || "policy".equals(key.toString()) || "attribute[Default User Access].value".equals(key.toString())) {
						continue;
					} else {						
						Matcher ownershipKeyMatcher    = ownershipKeyPattern.matcher(key);
						Matcher ownershipMapKeyMatcher = ownershipMapKeyPattern.matcher(key);
						String  ownershipKey           = "";
						String  ownershipMapKey        = "";
						if(ownershipKeyMatcher.find()){
							ownershipKey = ownershipKeyMatcher.group(1);
						}
						if(ownershipMapKeyMatcher.find()){
							ownershipMapKey = ownershipMapKeyMatcher.group(1);
						}						
						if (ownershipDetailsMap.containsKey(ownershipKey)) {
							Map accessDetails = (Map) ownershipDetailsMap.get(ownershipKey);
							accessDetails.put(ownershipMapKey, value);
							ownershipDetailsMap.put(ownershipKey, accessDetails);
						} else {
							Map accessDetails         = new HashMap();
							String accessDetailMapKey = ownershipMapKey;
							accessDetails.put(accessDetailMapKey, value);
							ownershipDetailsMap.put(ownershipKey, accessDetails);
						}
					}
				}
				objectDetailsMap.put("ownership", ownershipDetailsMap);
				accessSummaryMap.put(map.get("id"), objectDetailsMap);
			}

		}
		return accessSummaryMap;
	}
	
	/**
	 * Method to get the new logical name mapped to the old
	 * @param context
	 * @param access
	 * @return
	 * @throws Exception 
	 */
	private static String getLogicalAccessMapping(String access) throws Exception{
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
	
	/**?
     * Get the list of policy having the workspace that is mapped to new access mask
     * @param context
     * @return
     * @throws Exception
     */
    static private StringList getPolicyDomainAccessSettings(Context context, String policyname) throws Exception {
    	StringList policyList = (StringList) CacheUtil.getCacheObject(context, KEY_CACHE_DEFAULT_POLICY_LIST);
        if(policyList == null){
        	synchronized (DomainAccess.class) {
        		policyList = (StringList) CacheUtil.getCacheObject(context, KEY_CACHE_DEFAULT_POLICY_LIST);
        		if(policyList == null){
            		String policiesLogicalNames = MqlUtil.mqlCommand(context, "print page $1 select content dump", "DomainAccess");
            		SAXBuilder saxBuilder = new SAXBuilder();
            		saxBuilder.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            		saxBuilder.setFeature("http://xml.org/sax/features/external-general-entities", false);
            		saxBuilder.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            		Element root = saxBuilder.build(new StringReader(policiesLogicalNames)).getRootElement();
            		List policies = root.getChildren("policy");
            		policyList = new StringList();
            		for (int i=0; i < policies.size(); i++) {
            			Element policy = (Element) policies.get(i);
            			String policyName = policy.getTextTrim();
            			StringList policyNames = FrameworkUtil.splitString(policyName, ",");
            			if(policyNames.contains(policyname)){
            				for (int iPolicyIndex=0; iPolicyIndex < policyNames.size(); iPolicyIndex++) {
            					policyName = (String) policyNames.get(iPolicyIndex);
            					policyList.add(policyName);
            				}
            				break;
            			}                        
                    }
            		CacheUtil.setCacheObject(context, KEY_CACHE_DEFAULT_POLICY_LIST, policyList);
        		}
        	}      
        }  	        
        return policyList;
    }
        
    /**
     * Method to write to migrated object id to the file
     * @param command
     * @throws Exception
     */    
    private void checkAndloadMigratedOids(String command) throws Exception
	{
	    if(migratedOids.indexOf(command)<= -1){
	    	super.loadMigratedOids(command +"\n");
	    }
	}
	
    /**
     * Method to write the unconverted object ids to file
     * @param command
     * @param ObjectId
     * @throws Exception
     */
	private void checkAndWriteUnconvertedOID(String command, String ObjectId) throws Exception
	{
		if(migratedOids.indexOf(ObjectId)<= -1){
			super.writeUnconvertedOID(command, ObjectId);
	    }
	}
	
    /**
     * Get the New access mask as mapped
     * @param context
     * @param accessMask
     * @return
     */
    private static String updateLogicalMappingforDefaultTypes(Context context, String accessMask){
    	if(DomainConstants.DOMAIN_ACCESS_MASK.FULL.toString().equals(accessMask)){
    		accessMask = DomainConstants.DOMAIN_ACCESS_MASK.OWNER.toString();
    	}
    	else if(DomainConstants.DOMAIN_ACCESS_MASK.READ_WRITE.toString().equals(accessMask) 
    			|| DomainConstants.DOMAIN_ACCESS_MASK.ADD.toString().equals(accessMask) 
    			|| DomainConstants.DOMAIN_ACCESS_MASK.REMOVE.toString().equals(accessMask) 
    			|| DomainConstants.DOMAIN_ACCESS_MASK.ADD_REMOVE.toString().equals(accessMask) ){
    		accessMask = DomainConstants.DOMAIN_ACCESS_MASK.AUTHOR.toString();
    	}
    	else if(DomainConstants.DOMAIN_ACCESS_MASK.READ.toString().equals(accessMask)){
    		accessMask = DomainConstants.DOMAIN_ACCESS_MASK.READER.toString();
    	}   	
		else if(DomainConstants.DOMAIN_ACCESS_MASK.BASIC.toString().equals(accessMask)){
			accessMask = DomainConstants.DOMAIN_ACCESS_MASK.VIEWER.toString();
		}  	
    	return accessMask;
    }
    
    static private Long getAccessFlag(String accessMasks) throws Exception {
        StringList masks = FrameworkUtil.split(accessMasks, ",");
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
        return Long.valueOf(access.getLongAccessFlag());
    }
    
    
    
    
}


