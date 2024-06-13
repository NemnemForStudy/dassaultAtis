import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import matrix.db.Context;
import matrix.util.StringList;

public class emxCommonDiscussionOwnershipMigrationBase_mxJPO extends emxCommonMigration_mxJPO {

    private static final long serialVersionUID = -5029177381386073046L;
    
    public static String relationship_Message = "";
    public static String relationship_Message_from_id = "";
    public static String relationship_Reply = "";
    public static String relationship_Reply_to_id = "";
    public static String relationship_Reply_to__policy = "";
    public static String relationship_Reply_to_name = "";
    public static String private_policy = "";  
    
    

    public emxCommonDiscussionOwnershipMigrationBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }

    public static void init(Context context) throws FrameworkException
    {
    	relationship_Message = PropertyUtil.getSchemaProperty(context, "relationship_Message");         
    	relationship_Message_from_id = "to["+ relationship_Message +"].from.id";
        relationship_Reply = PropertyUtil.getSchemaProperty(context, "relationship_Reply");;
        relationship_Reply_to_id = "from["+ relationship_Reply +"].to.id";
        relationship_Reply_to_name= "from["+ relationship_Reply +"].to.name";
        relationship_Reply_to__policy = "from["+ relationship_Reply +"].to.policy";
        private_policy = PropertyUtil.getSchemaProperty(context, "policy_PrivateMessage");  
          
    }

    public void migrateObjects(Context context, StringList objectList) throws Exception
    {     
        init(context);
        StringList objectSelects = new StringList(15);
        objectSelects.addElement("id");
        objectSelects.addElement("name");
        objectSelects.addElement("type");
        objectSelects.addElement("revision");   
        objectSelects.addElement("policy"); 
        objectSelects.addElement(relationship_Message_from_id);      
		objectSelects.addElement(relationship_Reply_to_id); 
		objectSelects.addElement(relationship_Reply_to_name); 
		objectSelects.addElement(relationship_Reply_to__policy); 
		HashSet<String> multiSelects = new HashSet<String>(3);
		multiSelects.add(relationship_Reply_to_id);
		multiSelects.add(relationship_Reply_to__policy);
		multiSelects.add(relationship_Reply_to_name);
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);        
        MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects,multiSelects);
		try{
		    Iterator itr = mapList.iterator();
		    while( itr.hasNext())
		    {
		        try{
		            Map valueMap = (Map) itr.next();
		            String strObjId = (String)valueMap.get("id");
		            String strType = (String)valueMap.get("type");
		            String strName = (String)valueMap.get("name");
		            String strRevision = (String)valueMap.get("revision");
		            String policy = (String)valueMap.get("policy");
		            String messageFromId = (String)valueMap.get(relationship_Message_from_id);//Thread Id
					StringList replyToId = (StringList)valueMap.get(relationship_Reply_to_id);//All replies id
					StringList replyToName = (StringList)valueMap.get(relationship_Reply_to_name);//All replies name 
					StringList replyToPolicy = (StringList)valueMap.get(relationship_Reply_to__policy);//replies policy
		            if(private_policy.equals(policy)){
		            	mqlLogRequiredInformationWriter("Deleting Parent Ownership from "+ strObjId);
		            	DomainAccess.deleteObjectOwnership(context, strObjId, messageFromId, null, true);
		            	DomainAccess.deleteObjectOwnership(context, strObjId, messageFromId, "Ownership Inheritance from Thread", true);
						checkAndloadMigratedOids(strObjId);
		            }else {
		            	checkAndWriteUnconvertedOID( strType+","+strName+","+strRevision+", Ownership Deletion is not required \n" , strObjId);	
		            }
		            if(replyToId != null) {
		            for(int i=0;i<replyToId.size();i++){
		            	String policy_name = replyToPolicy.get(i);
		            	String object_Id =  replyToId.get(i);
		            	 if(private_policy.equals(policy_name)){
		            		mqlLogRequiredInformationWriter("Deleting Parent Ownership from "+ object_Id);
		            		DomainAccess.deleteObjectOwnership(context, object_Id, strObjId, null, true);
							checkAndloadMigratedOids(object_Id);
		            	}else {
		            		checkAndWriteUnconvertedOID( strType+","+replyToName.get(i)+", Ownership Deletion is not required \n" ,  object_Id);	
		            	}
		            	
		            }   
		            }
		        } catch (Exception ex) {
		            mqlLogRequiredInformationWriter("Failed to update ownership ");
		        }
		    }
		    
		} catch(Exception ex){}   
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
