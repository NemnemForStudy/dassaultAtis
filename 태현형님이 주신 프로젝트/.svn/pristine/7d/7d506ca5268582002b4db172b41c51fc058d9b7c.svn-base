import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

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

import matrix.db.Access;
import matrix.db.AccessList;
import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.util.Pattern;
import matrix.util.SelectList;
import matrix.util.StringList;

public class emxCommonOrganizationMigrationBase_mxJPO extends emxCommonMigration_mxJPO {
	 private static final long serialVersionUID = -5029177381386073045L;
	   
	   
	    public emxCommonOrganizationMigrationBase_mxJPO(Context context, String[] args) throws Exception {
	      super(context, args);
	    }

	   	    public void migrateObjects(Context context, StringList objectList) throws Exception
	    {     
	        StringList objectSelects = new StringList(15);
	        objectSelects.add(DomainConstants.SELECT_ID);
	        objectSelects.add(DomainConstants.SELECT_TYPE);
	        objectSelects.add(DomainConstants.SELECT_NAME);
	        objectSelects.add(DomainConstants.SELECT_REVISION);
	        objectSelects.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
	        
	        String[] oidsArray = new String[objectList.size()];
	        oidsArray = (String[])objectList.toArray(oidsArray);
	        StringList mulValSelects= new StringList();
			/*
			 * mulValSelects.add(relationship_ObjectRoute_id);
			 * mulValSelects.add(relationship_ObjectRoute_type);
			 * mulValSelects.add(relationship_ObjectRoute_name);
			 */
	        
			mqlLogRequiredInformationWriter("getInfo ...................."); 
			
	        MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects, mulValSelects);
	        try{
	        	ContextUtil.pushContext(context);               
	        	Iterator itr = mapList.iterator();
	        	mqlLogRequiredInformationWriter("Updating Title for Organization Objects ....................");
	        	MqlUtil.mqlCommand(context, "trig off",true);
	        	String strObjId = "";
    			String strObjType = "";
    			String strObjName = "";
    			String strObjRevision ="";
	        	while( itr.hasNext())
	        	{
	        		
	        		try{
	        			Map valueMap = (Map) itr.next();
	                
	        			strObjId = (String)valueMap.get("id");
	        			strObjType = (String)valueMap.get(DomainConstants.SELECT_TYPE);
	        			strObjName = (String)valueMap.get(DomainConstants.SELECT_NAME);
	        			strObjRevision = (String)valueMap.get(DomainConstants.SELECT_REVISION);
	        			String strAttrTitle = (String)valueMap.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
	        			
	        			if(UIUtil.isNullOrEmpty(strAttrTitle)) {
	        				MqlUtil.mqlCommand(context, "mod bus $1 $2 $3", strObjId, DomainConstants.ATTRIBUTE_TITLE, strObjName);
	        				String roleExists = MqlUtil.mqlCommand(context, "list role $1 ", strObjName);
	        				if(UIUtil.isNotNullAndNotEmpty(roleExists)) {
	        					MqlUtil.mqlCommand(context, "modify role $1 property $2 value $3", strObjName, DomainConstants.ATTRIBUTE_TITLE, strObjName);
	        				}
	        				mqlLogRequiredInformationWriter("Successfully migrated organization : " + strObjName);
	        				checkAndloadMigratedOids(strObjId);
	        			} else {
	        				checkAndWriteUnconvertedOID( strObjType+","+strObjName+","+strObjRevision+",Title not Updated \n" , strObjId);       
	        			}
	        			                          
	                
	            } catch (Exception ex) {
	            	//Updating non migratedId's information
        			checkAndWriteUnconvertedOID( strObjType+","+strObjName+","+strObjRevision+",Title not Updated \n" , strObjId);
	            	mqlLogRequiredInformationWriter("Failed to update Title ");
	            }
	        }
	        
	        } catch(Exception ex){        
	        }finally{
	          MqlUtil.mqlCommand(context, "trig on",true);
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
