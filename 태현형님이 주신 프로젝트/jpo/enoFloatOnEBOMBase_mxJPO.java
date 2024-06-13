/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 */

import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonNumber;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonValue;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

import com.dassault_systemes.enovia.bom.modeler.util.BOMMgtUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.engineering.EBOMFloat;
import com.matrixone.apps.framework.ui.UIUtil;


/**
 * The <code>${CLASSNAME}</code> class contains implementation code for Engineering Float on EBOM functionality.
 *
 * 
 */
@SuppressWarnings({"unchecked","rawtypes"})
public class enoFloatOnEBOMBase_mxJPO extends EBOMFloat
{
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
    * Constructor.
    *
    * @param context the eMatrix <code>Context</code> object.
    * @param args holds no arguments.
	 * @throws FrameworkException 
    * @throws Exception if the operation fails.
    * @since R418.
    */
    public enoFloatOnEBOMBase_mxJPO (Context context, String[] args) throws FrameworkException  {
        super();
        fillUpProperties(context);
    	if(args != null && args.length > 0) {
    		setId(args[0]);
    	}
    }

    /**
     * This method is executed if a specific method is not specified.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds no arguments.
     * @return int.
     * @throws Exception if the operation fails.
     * @since R418
     */
    public int mxMain(Context context, String[] args) throws Exception
    {
		if (true) {
			throw new FrameworkException("must specify method on enoFloatOnEBOM invocation");
		}
        return 0;
    }

      
	/**
     *This is a common API across ENG to show revision value with status across Full Search/ ENG multi root nodes
     */
    public StringList showRevisionStatus(Context context, String args[]) throws FrameworkException, Exception {    	
		StringList revisionList = new StringList();
		HashMap programMap 		= (HashMap)JPO.unpackArgs(args);
		MapList objectList      = (MapList)programMap.get("objectList");		
        HashMap paramList 	    = (HashMap)programMap.get("paramList");      
        String reportFormat     = (String)paramList.get("reportFormat");
        String isIndentedView   = (String)paramList.get("isIndentedView");        
                
		try {
				revisionList = "True".equalsIgnoreCase(isIndentedView) ? showRevisionStatusInBOM(context, objectList,UIUtil.isNotNullAndNotEmpty(reportFormat)) :
								showRevisionStatus(context, objectList,UIUtil.isNotNullAndNotEmpty(reportFormat));
			}
		catch (Exception ex) {
				System.out.println("EXCEPTION OCCURRED IN enoFloatOnEBOM : getRevisionStatus API");
				ex.printStackTrace();			
			}
		return revisionList;
    }
    
       
    /**
     *This API is to show level information in Revision Management table
     */
    public StringList getRevisionRelatedInfo(Context context, String args[]) throws FrameworkException, Exception {    	
		StringList revisionList = new StringList();
		HashMap programMap 		= (HashMap)JPO.unpackArgs(args);		
		MapList objectList      = (MapList)programMap.get("objectList");
		HashMap columnMap		= (HashMap)programMap.get("columnMap");
		
		try {
				revisionList = getRevisionRelatedInfo(context, objectList,(String)columnMap.get("name"));			
			}
		catch (Exception ex) {
				System.out.println("EXCEPTION OCCURRED IN enoFloatOnEBOM : getRevisionRelatedInfo API");
				ex.printStackTrace();			
			}
		return revisionList;
    }
    
   
    /**
     *This API is specific to single root node SB 
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getRevisionSummary(Context context, String args[]) throws FrameworkException, Exception {  
    	MapList revisionList    = new MapList();
    	try {
		HashMap programMap 		 = (HashMap)JPO.unpackArgs(args);
		HashMap requestValuesMap = (HashMap)programMap.get("RequestValuesMap");		
		String revisionData     = ((String[])requestValuesMap.get("revisionData"))[0];
		
		JsonReader jsonReader = Json.createReader(new StringReader(revisionData));
	    JsonObject revData = jsonReader.readObject();
	   
		
		String sBOMViewMode = (String)programMap.get("BOMViewMode");
		JsonArray rowItems  = revData.getJsonArray("revisionData");
		
		if(rowItems != null) {
			int size = rowItems.size();			
			Map map;JsonObject rowItem;
			for(int i=0; i < size; i++) {
				map = new HashMap();
				rowItem = rowItems.getJsonObject(i);
				String sFindNumber = rowItem.getString("findNumber");
				if(("Rollup".equalsIgnoreCase(sBOMViewMode))){
					sFindNumber = (String)BOMMgtUtil.getRollupDataMap(context, rowItem.getString("connectionId")).get(SELECT_ATTRIBUTE_FIND_NUMBER);
				}
				
				map.put(SELECT_NAME, rowItem.getString(SELECT_NAME));
				map.put(SELECT_CURRENT, rowItem.getString(SELECT_CURRENT));
				map.put(SELECT_ID, rowItem.getString(SELECT_ID));
				map.put(SELECT_FROM_NAME, rowItem.getString(SELECT_FROM_NAME));
				map.put(SELECT_ATTRIBUTE_FIND_NUMBER,sFindNumber);//map.put(SELECT_ATTRIBUTE_FIND_NUMBER, rowItem.get("findNumber") instanceof Integer ? String.valueOf(rowItem.get("findNumber")) : (String)rowItem.get("findNumber"));				   
				map.put(SELECT_RELATIONSHIP_ID, rowItem.getString("connectionId"));
			    map.put(LEVEL_INFO,rowItem.get(LEVEL_INFO));	
				revisionList.add(map);
			}
		  }
    	}	
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return revisionList;
    }
    
    /**
     *This API is specific to single root node SB 
     */
    public String displayRevisionStatusInPartForm(Context context, String args[]) throws FrameworkException, Exception {  
    	HashMap programMap = (HashMap) JPO.unpackArgs(args);
        Map requestMap     = (Map) programMap.get("requestMap");
        String objectId    = (String) requestMap.get("objectId");
        String reportFormat = (String) requestMap.get("reportFormat");

		try {
			String returnValue = "";
			Map revisionMap = getRevisionData(context, objectId);
			returnValue = getRevision(context, revisionMap, false, true);
			String sCurrentRev = (String)revisionMap.get(DomainConstants.SELECT_REVISION);
			
			if(UIUtil.isNullOrEmpty(returnValue)){
				returnValue = sCurrentRev;
			}
			
			else if ("CSV".equalsIgnoreCase(reportFormat)) {
				returnValue = sCurrentRev + " (" + EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", context.getLocale(),"emxEngineeringCentral.Title.HigherRevision") + " : " + revisionMap.get(SELECT_LAST_REVISION) + " " + EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", context.getLocale(),"emxEngineeringCentral.Title.Exists") + ")";
			}
			
			else {
				returnValue = sCurrentRev+returnValue;
				returnValue+="&nbsp;("+EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", context.getLocale(),"emxEngineeringCentral.Title.HigherRevision")+"&nbsp;";
				returnValue+=": "+(String)revisionMap.get(SELECT_LAST_REVISION);
				returnValue+="&nbsp;"+EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", context.getLocale(),"emxEngineeringCentral.Title.Exists")+")";
			}
			
			return returnValue;		
		}	
		catch (Exception ex) {
			System.out.println("EXCEPTION OCCURRED IN enoFloatOnEBOM : displayRevisionStatusInPartForm API");
			ex.printStackTrace();			
		}
        return "";        
    }
    
    /**
     *This API is specific to single root node SB 
     */
    public Boolean showOrHideRevisionStatus(Context context, String args[]) throws Exception {  
    	HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String objectId    = (String) programMap.get("objectId");

		try {
				return isLatestRevisionExists(context, objectId);			
		}	
		catch (Exception ex) {
			System.out.println("EXCEPTION OCCURRED IN enoFloatOnEBOM : isRevisionStatusRequired API");
			ex.printStackTrace();			
		}
        return Boolean.FALSE;       
    }
    
    
    public Boolean isManualFloatBehaviorEnabled(Context context, String[] args) throws FrameworkException, Exception {
    	return isManualFloatBehaviorEnabled(context) ? Boolean.TRUE : Boolean.FALSE;
    }
    
}
