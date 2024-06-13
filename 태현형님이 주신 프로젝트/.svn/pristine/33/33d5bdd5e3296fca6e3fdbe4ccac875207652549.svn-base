
import java.util.Iterator;
import java.util.Map;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxRouteOwnershipMigrationBase_mxJPO extends emxCommonMigration_mxJPO
{

    private static final long serialVersionUID = -5029177381386073045L;
           
    

    public emxRouteOwnershipMigrationBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }

    public static void init(Context context) throws FrameworkException
    {
    	          
    }

    public void migrateObjects(Context context, StringList objectList) throws Exception
    {     
        init(context);
        StringList objectSelects = new StringList(15);
        objectSelects.addElement("id");
        objectSelects.addElement("name");
        objectSelects.addElement("owner");     
        objectSelects.addElement("type");
        objectSelects.addElement("revision");
        
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);        
             
        MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects);
		
		String strType="";
		String strName="";
		String strRevision="";
		String strObjId ="";
		try{
		    ContextUtil.pushContext(context);
		    
		            
		    Iterator itr = mapList.iterator();
		    while( itr.hasNext())
		    {
		        try{
		            Map valueMap = (Map) itr.next();
		            
		             strObjId = (String)valueMap.get("id");
		            String strOwner = (String)valueMap.get("owner");
		             strType = (String)valueMap.get("type");
		             strName = (String)valueMap.get("name");
		             strRevision = (String)valueMap.get("revision");
		            
		            
		            String[] args = new String[2];
		            args[0] = strObjId;
		            args[1] = strOwner;
		            
		
		            //addOwnerAccessOnRoute(context, args);	            	           
		            JPO.invoke(context, "emxRoute", new String[0], "addOwnerAccessOnRoute", args, Integer.class);
					checkAndloadMigratedOids(strObjId);
		            //Updating non migratedId's information
		            checkAndWriteUnconvertedOID( strType+","+strName+","+strRevision+", Ownership Update is not required \n" , strObjId);		                          
		            
		        } catch (Exception ex) {
					checkAndWriteUnconvertedOID( strType+","+strName+","+strRevision+", Ownership Update is not required \n" , strObjId);		                          
		            mqlLogRequiredInformationWriter("Failed to update ownership ");
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
