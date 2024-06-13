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

public class emxInboxTaskObjectMigrationBase_mxJPO extends emxCommonMigration_mxJPO
{ 
    private static final long serialVersionUID = -5029177381386073045L;
	public static String relationship_RouteTask = "";       
    public static String relationship_Route_id = "";    

    public emxInboxTaskObjectMigrationBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }

    public static void init(Context context) throws FrameworkException
    {
    	relationship_RouteTask = PropertyUtil.getSchemaProperty(context, "relationship_RouteTask");         
    	relationship_Route_id = "from["+ relationship_RouteTask +"].to.id";                
    }

    public void migrateObjects(Context context, StringList objectList) throws Exception
    {     
        init(context);
        StringList objectSelects = new StringList(15);
        objectSelects.add("id");
        objectSelects.add("name");
        objectSelects.add("type");        
        objectSelects.add(relationship_Route_id);
     
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);
        MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects);
        try{
        	ContextUtil.pushContext(context);               
        	Iterator itr = mapList.iterator();
        	while( itr.hasNext())
        	{
        		try{
        			Map valueMap = (Map) itr.next();
        			String strObjId = (String)valueMap.get("id");
        			String strName = (String)valueMap.get("name");
        			String routeId = (String)valueMap.get(relationship_Route_id);
        			if(routeId != null && routeId != "") {
        				mqlLogRequiredInformationWriter("updating Route Id "+ routeId +" as ownership on Task "+ strName);
        				DomainAccess.createObjectOwnership(context, strObjId, routeId, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
        			}                
            } catch (Exception ex) {
            	mqlLogRequiredInformationWriter("Failed to upgrade ownership ");
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
}
