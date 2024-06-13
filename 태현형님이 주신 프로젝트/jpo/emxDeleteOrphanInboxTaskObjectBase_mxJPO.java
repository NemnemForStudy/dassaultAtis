import java.util.Iterator;
import java.util.Map;
import matrix.db.Context;
import matrix.util.StringList;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;

public class emxDeleteOrphanInboxTaskObjectBase_mxJPO extends emxCommonMigration_mxJPO
{

	private static final long serialVersionUID = -5029177381386073045L;
    private static String routeTaskRel = null;
    private static String taskType = null;       
    private static String connectedRoute = null;

    public emxDeleteOrphanInboxTaskObjectBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }

    public static void init(Context context) throws FrameworkException
    {
    	routeTaskRel = PropertyUtil.getSchemaProperty(context, "relationship_RouteTask"); 
    	taskType = PropertyUtil.getSchemaProperty(context, "type_InboxTask"); 
    	connectedRoute = "from[" + routeTaskRel + "].to.id";
    }

    public void migrateObjects(Context context, StringList objectList) throws Exception
    {     
        init(context);
        StringList objectSelects = new StringList(15);
        objectSelects.add("id");
        objectSelects.add(connectedRoute);
        objectSelects.add("name");     
        objectSelects.add("type");
        
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);        
             
        MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects);
		
		String strType="";
		String strName="";
		String strRevision="";
		String taskId ="";
		try{
		    ContextUtil.pushContext(context);  
		    Iterator itr = mapList.iterator();
		    while( itr.hasNext())
		    {
		        try{
		            Map valueMap = (Map) itr.next();
		            strType = (String)valueMap.get("type");
		            taskId = (String)valueMap.get("id");
		            String routeId = (String)valueMap.getOrDefault(connectedRoute,null);
		            if((routeId == null || routeId == "") && taskType.equals(strType)) {
			             strName = (String)valueMap.get("name");
			             DomainObject taskObject = new DomainObject(taskId);  
			             taskObject.deleteObject(context);
			             checkAndloadMigratedOids(taskId);
		            }
					checkAndloadMigratedOids(taskId);
		        } catch (Exception ex) {
					checkAndWriteUnconvertedOID(strType+" "+strName+" is orphan object and failed to delete \n", taskId);		                          
		            mqlLogRequiredInformationWriter("Failed to delete ophan object.");
		        }
		    }
		    
		} catch(Exception ex){        
        }finally{
         ContextUtil.popContext(context);
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
