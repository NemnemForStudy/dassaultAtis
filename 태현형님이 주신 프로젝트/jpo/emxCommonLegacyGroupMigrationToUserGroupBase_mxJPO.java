import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Map;
import matrix.db.Context;
import matrix.db.MQLCommand;
import matrix.db.MatrixWriter;
import matrix.util.StringList;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxCommonLegacyGroupMigrationToUserGroupBase_mxJPO extends emxCommonMigration_mxJPO
{

    private static final long serialVersionUID = -5029177381386073045L;
    
    public static String relationship_ListMember = "";
    public static String relationship_ListMember_name = "";
    public static String relationship_GroupMember = "";  
    public static String policy_GroupProxy = "";  
    public static String type_Group = "";  
    public static StringList groupList;
    public static StringList userGroupList;
    StringList migratedGroups = new StringList();
    FileWriter unconvertedGroupLogs = null;
	String runUser="";

    public emxCommonLegacyGroupMigrationToUserGroupBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }

    public static void init(Context context) throws FrameworkException
    {
    	relationship_ListMember = PropertyUtil.getSchemaProperty(context, "relationship_ListMember");  
    	relationship_GroupMember = PropertyUtil.getSchemaProperty(context, "relationship_GroupMember");  
    	policy_GroupProxy = PropertyUtil.getSchemaProperty(context, "policy_GroupProxy");  
    	type_Group = PropertyUtil.getSchemaProperty(context, "type_Group");  
    	String printGroup = "list group $1 select $2 dump";
    	String result = MqlUtil.mqlCommand(context,printGroup, "*","name");
    	String[] groups= result.split("\n");
    	groupList = new StringList();
    	for (String groupName : groups) {
    		groupList.add(groupName);
		}  
    	//System.out.println("Init groupList : " + groupList);
    	
    	String printUserGroup = "temp query bus $1 $2 $3 select $4 dump";
    	String ugResult = MqlUtil.mqlCommand(context,printUserGroup, type_Group, "*","-","name");
    	//System.out.println("UG result : " +ugResult);
    	String[] ugGroups= ugResult.split("\n");
    	if(ugGroups != null && UIUtil.isNotNullAndNotEmpty(ugGroups[0])) {
    		userGroupList = new StringList();
    	}
    	for(String ugName : ugGroups) {
			if(UIUtil.isNotNullAndNotEmpty(ugName)) {
    		String[] ugNameParts = ugName.split(",");
    		userGroupList.add(ugNameParts[1]);
    	}
    }
	}
    
    public static void getGroupsToBeMigrated(Context context, String[] args) throws Exception {
    	String documentDirectory = "";
    	java.io.File groupsFile = null;
    	BufferedWriter fileWriter = null;
    	int chunkSize = 0;
    	
    	if (args.length < 2 )
        {
            throw new IllegalArgumentException();
        }

        chunkSize = Integer.parseInt(args[0]);
        //System.out.println("chunkSize : " + chunkSize);
        if (chunkSize == 0 || chunkSize < 1 )
        {
            throw new IllegalArgumentException();
        }
    	
    	documentDirectory = args[1];

        // documentDirectory does not ends with "/" add it
        String fileSeparator = java.io.File.separator;
        if(documentDirectory != null && !documentDirectory.endsWith(fileSeparator))
        {
            documentDirectory = documentDirectory + fileSeparator;
        }
        //System.out.println("documentDirectory : " + documentDirectory);
    	String printGroup = "list group $1 select $2 dump";
    	String result = MqlUtil.mqlCommand(context,printGroup, "*","name");
    	String[] groups= result.split("\n");
    	//System.out.println("groups length : " + groups.length);
    	StringList groupChunk = new StringList();
    	int counter = 0;
    	int sequence = 0;
    	for (String groupName : groups) {
    		//System.out.println("groups Name : " + groupName);
    		groupChunk.add(groupName);
    		counter++;
    		if (counter == chunkSize)
        	{
        		counter=0;
        		sequence++;
        		try {
        		//create new file
        		groupsFile = new java.io.File(documentDirectory + "groups_" + sequence + ".txt");
        		fileWriter = new BufferedWriter(new FileWriter(groupsFile));
        		}
        		catch(Exception e) {e.printStackTrace();}
        		//write oid from _objectidList
        		for (int s=0;s<groupChunk.size();s++)
        		{
        			//System.out.println("groupChunk name :" + groupChunk.elementAt(s));
        			fileWriter.write((String)groupChunk.elementAt(s));
        			fileWriter.newLine();
        		}

        		groupChunk=new StringList();
        		fileWriter.close();

        		
        	}
    		
		}
    	if(sequence == 0) {
    		sequence++;
    		groupsFile = new java.io.File(documentDirectory + "groups_" + sequence + ".txt");
    		fileWriter = new BufferedWriter(new FileWriter(groupsFile));
    		for (int s=0;s<groupChunk.size();s++)
    		{
    			//System.out.println("groupChunk name :" + groupChunk.elementAt(s));
    			fileWriter.write((String)groupChunk.elementAt(s));
    			fileWriter.newLine();
    		}
    		fileWriter.close();
    	}
    	
        
    }

    public void migrateObjects(Context context, String[] args) throws Exception
    {     
		boolean isContextPushed = false;
        try{
			runUser = context.getUser();
			documentDirectory = args[0];

	        // documentDirectory does not ends with "/" add it
	        String fileSeparator = java.io.File.separator;
	        if(documentDirectory != null && !documentDirectory.endsWith(fileSeparator))
	        {
	            documentDirectory = documentDirectory + fileSeparator;
	        }
	        //System.out.println("documentDirectory : " + documentDirectory);

			createLogs();
			String cmd = "print person $1 select system dump" ;
			String error=null;
			MQLCommand mqlCommand = new MQLCommand();
            String businessAccess = MqlUtil.mqlCommand(context,cmd, true,runUser);
              //if context user does not have admin privilages then throwing Exception
              if("false".equalsIgnoreCase(businessAccess))
              {
				  
                  error = "User does not have Admin Privileges";
                  throw new Exception(error);
              }
			
		    ContextUtil.pushContext(context);
			isContextPushed = true;
		    init(context);
		    	        
	        Map groupMembersMap = null;
		    for(String groupName : groupList)
		    {
		        try{
		            String printGroup = "print group $1 select $2 $3 dump";
		            String groupMembersResult = MqlUtil.mqlCommand(context,printGroup, groupName, "person", "person.active");
		            String[] groupMembers = groupMembersResult.split(",");
		            StringList groupMembersList = null;
		            //System.out.println("Length groupMembers : " + groupMembers.length);
		            if(groupMembers.length > 0 && UIUtil.isNotNullAndNotEmpty(groupMembers[0])) {
		            	groupMembersMap = new HashMap();
		            	int mid = groupMembers.length/2;
		            	groupMembersList = new StringList();
		            	groupMembersList.addAll(groupMembers);
		            	for(int i=0;i<groupMembers.length/2;i++) {
		            		//System.out.println("groupMembers[i] : " + groupMembers[i] + "    ::   groupMembers[mid+i] : "+ groupMembers[mid+i]);
		            		groupMembersMap.put(groupMembers[i], groupMembers[mid+i]);
		            	}
		            	
		            	
		            }
		            //System.out.println("group name : "+groupName +" : groupMembersList : " + groupMembersList);
		            mqlLogRequiredInformationWriter("==============================================================");
		            mqlLogRequiredInformationWriter("Starting migration for Group "+ groupName);
		            mqlLogRequiredInformationWriter("==============================================================");
		            createUserGroupObject(context,groupName,groupMembersList,groupMembersMap);	
		            
		            //Updating non migratedId's information
		            checkAndWriteUnconvertedGroup(groupName);
		            mqlLogRequiredInformationWriter("==============================================================");
		            mqlLogRequiredInformationWriter("Migration for Group "+ groupName + " is complete");
		            mqlLogRequiredInformationWriter("==============================================================");
		        } catch (Exception ex) {
		        	ex.printStackTrace();
		            mqlLogRequiredInformationWriter("Migration failed for group " + groupName);
		        }
		    }
		    
		} catch(Exception ex){
			 BufferedWriter writer   = new BufferedWriter(new MatrixWriter(context));
			  writer.write("====================================================================\n");
              writer.write(ex.getMessage() + " \n");
			  writer.write("====================================================================\n");   
			  writer.close();
        }finally{
         unconvertedGroupLogs.close();
         errorLog.close();
         warningLog.close();
		 if(isContextPushed)
			ContextUtil.popContext(context);
        }     
    }
        
    private void createUserGroupObject(Context context,String groupName,StringList groupMembers, Map groupMembersMap) throws Exception{
    	try{
    		String userGroupName = "UG-"+groupName;
    		if(userGroupList!= null && userGroupList.contains(userGroupName)) {
    			mqlLogRequiredInformationWriter("User Group " + userGroupName + " already exists");
    			checkAndloadMigratedGroups(groupName);
    		} else {
	    		ContextUtil.startTransaction(context, true);
	    		MqlUtil.mqlCommand(context, "trig $1", "off");
	    		MqlUtil.mqlCommand(context, "add role $1 asaprojectgroup;", true,userGroupName);
	    		MqlUtil.mqlCommand(context, "add businessobject $1 $2 $3 policy $4 owner $5 Title $6 vault $7;", true,type_Group,userGroupName,"-",policy_GroupProxy,runUser,userGroupName, "eService Production");
	    		mqlLogRequiredInformationWriter("User Group "+userGroupName+" is created for Group "+ groupName);
	    		
	    		if(groupMembers != null && groupMembers.size() > 0){
	    			for(int i=0;i<groupMembers.size()/2;i++) {
	    				String groupMemberName = groupMembers.get(i);
	    				boolean isMemberActive = Boolean.parseBoolean((String)groupMembersMap.get(groupMemberName));
	    				if(!isMemberActive) {
	    					mqlLogRequiredInformationWriter("Person "+groupMemberName+ " is inactive and not added as Member to User Group "+userGroupName);
	    				} else {
	    					MqlUtil.mqlCommand(context, "modify role $1 assign person $2;", true,userGroupName,groupMemberName);
		    				MqlUtil.mqlCommand(context, "connect businessobject $1 $2 $3 to $4 $5 $6 relationship $7;", true,type_Group,userGroupName,"-",DomainConstants.TYPE_PERSON,groupMemberName,"-",relationship_GroupMember);
		    				mqlLogRequiredInformationWriter("Person "+groupMemberName+ " is added as Member to User Group "+userGroupName);
	    				}
	    				//System.out.println("Group Member : " + groupMemberName);
	    				
	    				
	    			}
	    		}else {
	    			mqlLogRequiredInformationWriter("Group " + groupName + " has no members");
	    		}
	    		checkAndloadMigratedGroups(groupName);
	    		MqlUtil.mqlCommand(context, "trig $1", "on");
	    		ContextUtil.commitTransaction(context);
    		}
    	}catch(Exception e){
    		mqlLogRequiredInformationWriter("Group " + groupName + " failed migration");
    		ContextUtil.abortTransaction(context);
    		//e.printStackTrace();
    	}
    }
    
    public void mqlLogRequiredInformationWriter(String command) throws Exception
    {
        super.mqlLogRequiredInformationWriter(command +"\n");
    }
    
    
    public void checkAndloadMigratedGroups(String groupName) throws Exception
    {
     if(!migratedGroups.contains(groupName)){
        migratedGroups.add(groupName);
     }
        
    }
    public void checkAndWriteUnconvertedGroup(String groupName) throws Exception
    {
     if(!migratedGroups.contains(groupName)){
    	unconvertedGroupLogs.write(groupName);
    	unconvertedGroupLogs.write("\n");
    	unconvertedGroupLogs.flush();
     }
        
    }
    
    public void createLogs()throws Exception{
    	
    	unconvertedGroupLogs = new FileWriter(documentDirectory + "UnconvertedGroupsLog.log", false);;
        unconvertedGroupLogs.write("The unconverted Groups are listed below:");
        unconvertedGroupLogs.write("\n");
        unconvertedGroupLogs.flush();
    	errorLog   = new FileWriter(documentDirectory + "ErrorLogs.log", false);
    	errorLog.flush();
    	warningLog = new FileWriter(documentDirectory + "migration.log", false);
    	warningLog.flush();
    }
    
}
