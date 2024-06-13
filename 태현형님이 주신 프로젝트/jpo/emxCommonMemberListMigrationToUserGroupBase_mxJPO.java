import java.util.Iterator;
import java.util.Map;
import matrix.db.Context;
import matrix.util.StringList;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxCommonMemberListMigrationToUserGroupBase_mxJPO extends emxCommonMigration_mxJPO
{

    private static final long serialVersionUID = -5029177381386073045L;
    
    public static String relationship_ListMember = "";
    public static String relationship_ListMember_name = "";
    public static String relationship_ListMember_type = "";
    public static String relationship_ListMember_current = "";
    
    public static String relationship_MemberList_type = "";
    public static String accessName = "";  
    public static String relationship_GroupMember = "";  
    public static String policy_GroupProxy = "";  
    public static String type_Group = "";  
    
    public static String RELATIONSHIP_MEMBER_LIST="";
    public static String TYPE_PERSON = "";
    public static StringList userGroupList;
    String runUser="";

    public emxCommonMemberListMigrationToUserGroupBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
      runUser = context.getUser();
    }

    public static void init(Context context) throws FrameworkException
    {
    	relationship_ListMember = PropertyUtil.getSchemaProperty(context, "relationship_ListMember");  
    	relationship_GroupMember = PropertyUtil.getSchemaProperty(context, "relationship_GroupMember");  
    	RELATIONSHIP_MEMBER_LIST = PropertyUtil.getSchemaProperty(context,"relationship_MemberList");
    	policy_GroupProxy = PropertyUtil.getSchemaProperty(context, "policy_GroupProxy");  
    	type_Group = PropertyUtil.getSchemaProperty(context, "type_Group");  
    	relationship_ListMember_name = "from[List Member].to.name";  //this is to get the list of persons and Business Groups connected to member-list
    	relationship_ListMember_type = "from[List Member].to.type";
    	relationship_ListMember_current = "from[List Member].to.current";
    	
    	relationship_MemberList_type="to[Member List].from.type";    //this is to check the scope of member-list Personal or Organizational
    	
    	TYPE_PERSON = PropertyUtil.getSchemaProperty(context,"type_Person");
    	String printUserGroup = "temp query bus $1 $2 $3 select $4 dump";
    	String ugResult = MqlUtil.mqlCommand(context,printUserGroup, type_Group, "*","-","name");
    	String[] ugGroups= ugResult.split("\n");
    		userGroupList = new StringList();
    	for(String ugName : ugGroups) {
			if(UIUtil.isNotNullAndNotEmpty(ugResult)){
    		String[] ugNameParts = ugName.split(",");
    		userGroupList.add(ugNameParts[1]);
    		}
      	}
    }

    public void migrateObjects(Context context, StringList objectList) throws Exception
    {     
        init(context);
        StringList objectSelects = new StringList(15);
        objectSelects.addElement("id");
        objectSelects.addElement("name");
        objectSelects.addElement("type");
        objectSelects.addElement("revision");     
        objectSelects.addElement("owner");  
        objectSelects.addElement("organization");  
        objectSelects.addElement("project");  
        objectSelects.addElement(relationship_ListMember_name); 
        objectSelects.addElement(relationship_ListMember_type); 
        objectSelects.addElement(relationship_ListMember_current);
        
        objectSelects.addElement(relationship_MemberList_type); 
        StringList mulValSelects = new StringList();
        mulValSelects.add(relationship_ListMember_name);
        mulValSelects.add(relationship_ListMember_type);
        mulValSelects.add(relationship_ListMember_current);
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);          
        MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects, mulValSelects);
		try{
		    ContextUtil.pushContext(context);     
		    Iterator itr = mapList.iterator();
		    while( itr.hasNext())
		    {
		        try{
		            Map valueMap = (Map) itr.next();
		            String strObjId = (String)valueMap.get("id");
		            String strType = (String)valueMap.get("type");
		            String strName = (String)valueMap.get("name");
		            String strRevision = (String)valueMap.get("revision");
		            String owner = (String)valueMap.get("owner");
		            String organization = (String)valueMap.get("organization");
		            String project = (String)valueMap.get("project");
		            String memberListScope=(String)valueMap.get(relationship_MemberList_type);
		            
		            StringList memberListAssigneeList = (StringList)valueMap.get(relationship_ListMember_name);
		            StringList memberListAssigneeTypeList = (StringList)valueMap.get(relationship_ListMember_type);
		            StringList memberListAssigneeCurrentStateList = (StringList)valueMap.get(relationship_ListMember_current);
		            
		            if(!memberListScope.equals(TYPE_PERSON)){
		            	mqlLogRequiredInformationWriter("==============================================================");
		            	createUserGroupObject(context,strObjId,strName,owner,project,organization,memberListAssigneeList,memberListAssigneeTypeList,memberListAssigneeCurrentStateList);	
		            	mqlLogRequiredInformationWriter("==============================================================");
		            	//Updating non migratedId's information
		            	checkAndWriteUnconvertedOID( "User Group with same name already exists "+strType+","+strName+","+strRevision+",  \n" , strObjId);	
		            }else{
		            	mqlLogRequiredInformationWriter("Member List "+strName+ " not migrated since the scope of Member List is Personal");
		            	checkAndWriteUnconvertedOID( "Member Lists not migrated\n", strObjId);
		            }
		        } catch (Exception ex) {
		            mqlLogRequiredInformationWriter("Failed to migrate object "+ex.getStackTrace().toString());
		            
		        }
		    }
		    
		} catch(Exception ex){ 
			mqlLogRequiredInformationWriter("Failed to migrate object "+ex.getStackTrace().toString());
        }finally{
         ContextUtil.popContext(context);
        }     
    }
        
    private void createUserGroupObject(Context context,String ObjectID,String name,String owner,String project,String organization,StringList memberListAssigneeList,StringList memberListAssigneeTypeList,StringList memberListAssigneeCurrentStateList){
    	try{
    		String userGroupName = "UG-"+name;
    		if(userGroupList!= null && userGroupList.contains(userGroupName)) {
    			mqlLogRequiredInformationWriter("User Group " + userGroupName + " already exists");
    		}else{
    			MqlUtil.mqlCommand(context, "trig $1", "off");   		
        		MqlUtil.mqlCommand(context, "add role $1 asaprojectgroup;", true,userGroupName);
        		mqlLogRequiredInformationWriter("Creating User Group for MemberList "+name);
        		MqlUtil.mqlCommand(context, "add businessobject $1 $2 $3 policy $4 owner $5 Title $6 vault $7;", true,type_Group,userGroupName,"-",policy_GroupProxy,runUser,userGroupName,"eService Production");
        		mqlLogRequiredInformationWriter("User Group "+userGroupName+" is created for Memberlist "+name);
        		if(memberListAssigneeList != null && memberListAssigneeList.size() > 0){
        			for(int i=0;i<memberListAssigneeList.size();i++) {
        				String memberName = memberListAssigneeList.get(i);
        				String memberType = memberListAssigneeTypeList.get(i);
        				String memberCurrentState=memberListAssigneeCurrentStateList.get(i);
        				if(memberType.equals(TYPE_PERSON) && memberCurrentState.equalsIgnoreCase("Active")){
        					MqlUtil.mqlCommand(context, "modify role $1 assign person $2;", true,userGroupName,memberName);
        					MqlUtil.mqlCommand(context, "connect businessobject $1 $2 $3 to $4 $5 $6 relationship $7;", true,type_Group,userGroupName,"-",DomainConstants.TYPE_PERSON,memberName,"-",relationship_GroupMember);
        					mqlLogRequiredInformationWriter("Person "+memberName+ " is added as Member to User Group "+userGroupName);
        				}
        			}
        		}else {
        			mqlLogRequiredInformationWriter("No Member present in MemberList "+name);
        		}
        		checkAndloadMigratedOids(ObjectID);
        		MqlUtil.mqlCommand(context, "trig $1", "on");
    		}	
    	}catch(Exception e){}
    }
    
    public void mqlLogRequiredInformationWriter(String command) throws Exception
    {
        super.mqlLogRequiredInformationWriter(command +"\n");
    }
    
    
    public void checkAndloadMigratedOids(String command) throws Exception
    {
     if(migratedOids.indexOf(command)<= -1){
        super.loadMigratedOids(command +"\n");
     }
        
    }
    public void checkAndWriteUnconvertedOID(String command, String ObjectId) throws Exception
    {
     if(migratedOids.indexOf(ObjectId)<= -1){
        super.writeUnconvertedOID(command, ObjectId);
     }
        
    }
    
}
