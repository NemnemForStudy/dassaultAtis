import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import matrix.util.Pattern;

import matrix.db.Access;
import matrix.db.AccessList;
import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.util.SelectList;
import matrix.util.StringList;

import com.matrixone.apps.common.Route;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.AccessUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxCommonRouteAndTemplateTitleAttributeMigrationBase_mxJPO extends emxCommonMigration_mxJPO
{

    private static final long serialVersionUID = -5029177381386073045L;

    public emxCommonRouteAndTemplateTitleAttributeMigrationBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }
    public void migrateObjects(Context context, StringList objectList) throws Exception
    {     
        StringList objectSelects = new StringList(3);
        objectSelects.add(DomainConstants.SELECT_NAME);
		objectSelects.add(DomainConstants.SELECT_TYPE);
		objectSelects.add(DomainConstants.SELECT_REVISION);
        objectSelects.add(DomainConstants.SELECT_ID);
        objectSelects.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
             
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);
        StringList mulValSelects= new StringList();       
		mqlLogRequiredInformationWriter("getInfo ...................."); 
        MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects, mulValSelects);
        try{
        	ContextUtil.pushContext(context);               
        	Iterator itr = mapList.iterator();
        	while( itr.hasNext())
        	{
        		try{
        			Map valueMap = (Map) itr.next();
                
        			String strObjId = (String)valueMap.get(DomainConstants.SELECT_ID);
        			String strName = (String)valueMap.get(DomainConstants.SELECT_NAME);
					String strType = (String)valueMap.get(DomainConstants.SELECT_TYPE);
					String revision = (String)valueMap.get(DomainConstants.SELECT_REVISION);
        			String strTitle = (String)valueMap.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
        			if(UIUtil.isNullOrEmpty(strTitle)) {
        				DomainObject route = DomainObject.newInstance(context,strObjId);
        				mqlLogRequiredInformationWriter("Updating title on "+strName);
        				route.setAttributeValue(context, DomainConstants.ATTRIBUTE_TITLE, strName);
        				mqlLogRequiredInformationWriter(strName+" : Title attribute is updated \n");
						checkAndloadMigratedOids(strObjId);
        			
        			}else {
        				checkAndWriteUnconvertedOID(strType +","+strName+","+revision +","+" Title migration is not required \n" , strObjId);  
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
