import java.util.Iterator;
import java.util.Map;
import matrix.db.Context;
import matrix.util.StringList;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxCommonMeetingAssigneeOwnershipMigrationBase_mxJPO extends emxCommonMigration_mxJPO
{

    private static final long serialVersionUID = -5029177381386073045L;
    
    public static String relationship_AssignedMeetings = "";
    public static String relationship_AssignedMeetings_id = "";
    public static String relationship_AssignedMeetings_name = "";
    public static String accessName = "";  
    
    

    public emxCommonMeetingAssigneeOwnershipMigrationBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }

    public static void init(Context context) throws FrameworkException
    {
    	relationship_AssignedMeetings = PropertyUtil.getSchemaProperty(context, "relationship_AssignedMeetings");         
    	relationship_AssignedMeetings_id = "to["+ relationship_AssignedMeetings +"].from.id";
        relationship_AssignedMeetings_name = "to["+ relationship_AssignedMeetings +"].from.name";
          
    }

    public void migrateObjects(Context context, StringList objectList) throws Exception
    {     
        init(context);
        StringList objectSelects = new StringList(15);
        objectSelects.addElement("id");
        objectSelects.addElement("name");
        objectSelects.addElement("type");
        objectSelects.addElement("revision");        
        objectSelects.addElement(relationship_AssignedMeetings_id);        
		objectSelects.addElement(relationship_AssignedMeetings_name);        
        StringList mulValSelects = new StringList();
        mulValSelects.add(relationship_AssignedMeetings_id);
		mulValSelects.add(relationship_AssignedMeetings_name);
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
		            StringList meetingAssigneeList = (StringList)valueMap.get(relationship_AssignedMeetings_id);
					StringList meetingAssigneeNameList = (StringList)valueMap.get(relationship_AssignedMeetings_name);
		            if(meetingAssigneeList != null){
		            	updateMeetingAssigneeAsSOVonMeetingObject(context, strObjId, meetingAssigneeNameList);
		            }		            	           
		             
		            //Updating non migratedId's information
		            checkAndWriteUnconvertedOID( strType+","+strName+","+strRevision+", Ownership Update is not required \n" , strObjId);		                          
		            
		        } catch (Exception ex) {
		            mqlLogRequiredInformationWriter("Failed to update ownership ");
		        }
		    }
		    
		} catch(Exception ex){        
        }finally{
         ContextUtil.popContext(context);
        }     
    }
    
    private void updateMeetingAssigneeAsSOVonMeetingObject(Context context, String ObjectID, StringList meetingAssigneeList) throws Exception{
    	
    	for(int i = 0; i < meetingAssigneeList.size(); i++){
    		String assigneeName = (String)meetingAssigneeList.get(i);
    		if(!UIUtil.isNullOrEmpty(ObjectID) && !UIUtil.isNullOrEmpty(assigneeName)){    	 
        		mqlLogRequiredInformationWriter("Updating  Ownership on "+ ObjectID +" with Assignee Name "+ assigneeName +" as SOV............"); 
        		if(UIUtil.isNullOrEmpty(accessName)){
        			StringList accessNames = DomainAccess.getLogicalNames(context, ObjectID);	
            		accessName = (String)accessNames.get(0);         
        		}    		
        		String project = assigneeName + "_PRJ";
        		DomainAccess.createObjectOwnership(context, ObjectID, null, project, accessName, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP, true);        
        		checkAndloadMigratedOids(ObjectID);
        	}    		
    	}   	 
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
