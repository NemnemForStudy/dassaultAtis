/*
 * enoEBOMInstanceMigrationBase.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 */

import java.io.FileWriter;
import java.util.*;

import matrix.db.*;
import matrix.util.*;

import com.dassault_systemes.enovia.bom.modeler.util.BOMMgtUtil;
import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.framework.ui.UIUtil;

public class enoEBOMInstanceMigrationBase_mxJPO extends emxCommonMigration_mxJPO {

	public static FileWriter ObjectsToBeCorrectedOidsLog;
	String sInterfaceName = "ignoreForInstMig";
	
	
	/**
	 *
	 * @param context
	 *            the eMatrix <code>Context</code> object
	 * @param args
	 *            holds no arguments
	 * @throws Exception
	 *             if the operation fails
	 * @grade 0
	 */
	public enoEBOMInstanceMigrationBase_mxJPO(Context context,
			String[] args) throws Exception {
		super(context, args);
	}

	/**
	 * This method does the migration work. New Part Master objects are created
	 * for those that do not have any. All revisions of a Part are connected to
	 * a single Part Master with the Part Revision relationship. Only parts with
	 * Production or Development policies are migrated.
	 *
	 * @param context
	 *            the eMatrix <code>Context</code> object
	 * @param objectIdList
	 *            StringList holds list objectids to migrate
	 * @returns nothing
	 * @throws Exception
	 *             if the operation fails
	 */
	public void migrateObjects(Context context, StringList objectData)
			throws Exception {

		// if scan variable is set, then do not migrate data
		// just write the problamatic ids to log else proceed with migration
		if (scan) {
			return;
		}

		String relID="";
		try{
			String relType="";
       	 	Iterator itr = objectData.iterator(); 
       	 	String[] relData=new String[3];
       	 	int qty;
       	 	String strQty="";
       	 	String strRD="";
       	 	Map attributeMap=new HashMap();
       	 	
            String SELECT_VPLM_INTEG_REL_ID = "frommid[VPLMInteg-VPLMProjection].id";
            String SELECT_EBOMSubstitute = "frommid[" +PropertyUtil.getSchemaProperty("relationship_EBOMSubstitute")+ "].id";
            
            StringList relSelect = createStringList(new String[] {SELECT_VPLM_INTEG_REL_ID,SELECT_EBOMSubstitute});
            
            while(itr.hasNext()){
       	 		
            	relData=((String)itr.next()).split(",");
       	 		relID=relData[0];
       	 		relType=relData[2];
       	 		
       	 		DomainRelationship dR=new DomainRelationship(relID);
       	 		dR.open(context);
       	 		
       	 		/* Get the Parent & Child part for the given EBOM connection */ 
       	 		String parentID=dR.getFrom().getObjectId();
       	 		String childID=dR.getTo().getObjectId();
       	 		
       	 		/* Get attribute Quantity 	*/
       	 		strQty=dR.getAttributeValue(context, DomainConstants.ATTRIBUTE_QUANTITY);
       	 		qty=(int)Float.parseFloat(strQty);
       	 		
       	 		/* Get attribute Reference Designator */
       	 		strRD=dR.getAttributeValue(context, DomainConstants.ATTRIBUTE_REFERENCE_DESIGNATOR);
       	 		StringList RDList=new StringList();
       	 		
       	 		if(UIUtil.isNotNullAndNotEmpty(strRD))
       	 			RDList=BOMMgtUtil.getIndividualRdValues(context,strRD);
       	 		
       	 		
       	 		if(qty>1){
   	 				
       	 			MapList intermediateRelInfoList = DomainRelationship.getInfo(context, new String[] {relID}, relSelect);
   	 				Map mapTemp;
   	 				StringList interfaceList=new StringList();
   	 				StringList ebomSubstituteRelID=new StringList();
   	 				
   	 				StringList VPLMIntegRelIDList=new StringList();
   	 				
   	 				if (intermediateRelInfoList.size() > 0){ 
   	 					mapTemp = (Map) intermediateRelInfoList.get(0);
   	 					VPLMIntegRelIDList=getListValue(mapTemp,SELECT_VPLM_INTEG_REL_ID);
   	 					ebomSubstituteRelID=getListValue(mapTemp,SELECT_EBOMSubstitute);
   	 				
   	 				}
   	 				
   	 				//Modifying the Attribute[Quantity] value to 1.0
   	 				dR.setAttributeValue(context, DomainConstants.ATTRIBUTE_QUANTITY, "1.0");

   	 				//Modifying the Attribute[Reference Designator] value if it exists
   	       	 		if(UIUtil.isNotNullAndNotEmpty(strRD))   	     
   	       	 			dR.setAttributeValue(context, DomainConstants.ATTRIBUTE_REFERENCE_DESIGNATOR, (String) RDList.get(0));
   	       	 		
   	       	 		//Creating new connections multiple times.
       	 			for (int i = 1; i < qty; i++) {
       	 				
       	 				//Establishing new connection.  
       	 				DomainRelationship domConnectedRel = DomainRelationship.connect(context,DomainObject.newInstance(context, parentID), relType, DomainObject.newInstance(context, childID));
       	 				
       	 				//Copying Old RelAttributes to the newly created connection.
       	 				attributeMap=dR.getAttributeMap(context,true);
       	 				domConnectedRel.setAttributeValues(context, attributeMap);

       	 				//Modifying the Attribute[Reference Designator] value if it exists
       	       	 		if(UIUtil.isNotNullAndNotEmpty(strRD))
       	       	 			domConnectedRel.setAttributeValue(context, DomainConstants.ATTRIBUTE_REFERENCE_DESIGNATOR, (String) RDList.get(i));
  	 				       	 				
       	 				// Copies all EBOM Substitutes connections
       	 				copyEBOMSubstituteRels(context, PropertyUtil.getSchemaProperty("relationship_EBOMSubstitute"), domConnectedRel.toString(), ebomSubstituteRelID, "to");

       	 				//Modify VPLMInteg-VPLMProjection accordingly, if any exists.
       	 				if(VPLMIntegRelIDList.size()>0){
       	 					String mqlCommand = "modify connection $1 fromrel $2";
       	 					MqlUtil.mqlCommand(context, mqlCommand,(String)VPLMIntegRelIDList.get(i),domConnectedRel.toString());
       	 				}
       	 			}
       	 			
       	 			/* Hook for customer specific implementation */
       	 			migrateRelatedData(context,relID);
       	 		
                    loadMigratedOids(relID);
       	 		}
       	 	}
            //throw new Exception();

		} catch (Exception ex) {
			writeUnconvertedOID(relID+","+ex.toString().replace(',', ';')+"\n");
			ex.printStackTrace();
			throw ex;
		}
	}



	public void help(Context context, String[] args) throws Exception {
		if (!context.isConnected()) {
			throw new Exception("not supported on desktop client");
		}

		writer.write("================================================================================================\n");
		writer.write(" EBOM Instance Migration is a two step process  \n");
		writer.write(" Step1: Find relationship ids with type \"EBOM\", Rel Attribute->Quantity >1, \n");
		writer.write(" and Attribute-> Unit of Measure \"EA (each)\" and write them into flat files \n");
		writer.write(" Example: \n");
		writer.write(" execute program enoEBOMInstanceMigrationFindRelationship 1000 C:/Temp/oids/  <migration_mode>; \n");
		writer.write(" First parameter  = indicates number of object per file \n");
		writer.write(" Second Parameter  = the directory where files should be written \n");
		writer.write(" Third  Parameter  = Migration mode, this is a keyword to say whether all data or selected data needs to be migrated \n");
		writer.write(" Third  Parameter  = This can take 'All'  or 'Inwork' \n");
		writer.write(" \n");
		writer.write(" Step2: Migrate the objects \n");
		writer.write(" Example: \n");
		writer.write(" execute program enoEBOMInstanceMigration  'C:/Temp/oids/' 1 n ; \n");
		writer.write(" First parameter  = the directory to read the files from\n");
		writer.write(" Second Parameter = minimum range of file to start migrating  \n");
		writer.write(" Third Parameter  = maximum range of file to end migrating  \n");
		writer.write("        - value of 'n' means all the files starting from mimimum range\n");
		writer.write("================================================================================================\n");
		writer.close();
	}

	// Overriding the method to add additional data(Quantity and Relationship Type) to the find objects text file.
	public boolean writeOID(Context context, String[] args) throws Exception {
		String writeIdStr = writeObjectId(context, args);
		
		if (writeIdStr != null && !"".equals(writeIdStr)) {
				StringList selectObjectsList = new StringList();
				selectObjectsList.add(DomainRelationship.SELECT_ATTRIBUTE_QUANTITY);
				selectObjectsList.add(DomainRelationship.SELECT_NAME);
				String str[] = { "" };
				str[0] = writeIdStr;
				MapList tempMapList = DomainRelationship.getInfo(context, str, selectObjectsList);
				Map tempMap = (Map) tempMapList.get(0);
				String strQty = (String) tempMap.get(DomainRelationship.SELECT_ATTRIBUTE_QUANTITY);
				String strRelType = (String) tempMap.get(DomainRelationship.SELECT_NAME);
				float floatQty = Float.parseFloat(strQty);
				if (floatQty % 1 == 0) {
					int intQty = (int) floatQty;
					fileWriter(writeIdStr+","+intQty+","+strRelType);
				} else {
					String newLine = System.getProperty("line.separator");
					ObjectsToBeCorrectedOidsLog.write(writeIdStr+","+floatQty+newLine);
					ObjectsToBeCorrectedOidsLog.flush();
				}
		}
		return false;
	}
	
	/** Returns values of String array in StringList.
	 * @param selectable
	 * @return
	 */	
	public static StringList createStringList(String[] selectable) {
		int length = (selectable == null) ? 0 : selectable.length;

		StringList list = new StringList(length);

		for (int i = 0; i < length; i++)
			list.add(selectable[i]);

		return list;
	}

	/**
	 * Removes duplicate values in StringList.
	 * @param map infoMap
	 * @param key the value toc retrive from the map.
	 * @return StringList
	 */
    public static StringList getUniqueListValue(Map map, String key) {
		//return new StringList((String[]) new HashSet(getListValue(map, key)).toArray(new String[0]));
		StringList sL=getListValue(map, key);
		StringList returnList=new StringList();
		for(int i=0;i<sL.size();i++){
			if(!returnList.contains(sL.get(i))){
				returnList.add(sL.get(i));
			}
		}
		return returnList;
	}
    
    /** Returns StringList from the map key is passed as param2
	 * @param map contains info map
	 * @param key value to return
	 * @return StringList
	 */
    public static StringList getListValue(Map map, String key) {
		Object data = map.get(key);

		if (data == null)
			return new StringList(0);

		return (data instanceof String) ? FrameworkUtil.split((String) data, matrix.db.SelectConstants.cSelectDelimiter)
										: (StringList) data;
	}
    
	//Overriding the method to change the title of unConvertedObjectIds_xx.csv file.
    public void createLogs()throws Exception{
    	errorLog   = new FileWriter(documentDirectory + "unConvertedObjectIds_"+ unconvertedFileCount +".csv", false);
    	unconvertedFileCount ++;
    	errorLog.write("REL. ID.,ERROR DETAILS \n");
    	errorLog.flush();
    	convertedOidsLog    = new FileWriter(documentDirectory + "convertedIds.txt", false);
    	warningLog = new FileWriter(documentDirectory + "migration.log", false);
    }
    
	/** This method creates the IncorrectQtyValues.csv file and add the page headers.
	 * @throws Exception if any operation fails.
	 */
    public static void createIncorrectQtyValuesFile() throws Exception{
    	ObjectsToBeCorrectedOidsLog = new FileWriter(documentDirectory + "IncorrectQtyValues.csv");
    	ObjectsToBeCorrectedOidsLog.write("The following relationships with Unit of Measue as \"EA (each)\" and having decimal value for the Attribute Quantity cannot be migrated. Please correct those values before migration\n");
    	ObjectsToBeCorrectedOidsLog.write("REL. ID.,Attribute[Quantity]\n");
    }

 
	/** Copies EBOMSubstitutes relationship to an new Relationship.
	 * @param context ematrix context.
	 * @param relType contains the type of the relationship that needs to be copied.
	 * @param newRelID contains the id of the new relationship to which the intermediate relationships needs to be copied.
	 * @param relIds contains all Rel IDs that needs to be copied.
	 * @param direction contains either "to" or "from".
	 * @throws Exception if any operation fails.
	 */
    public void copyEBOMSubstituteRels(Context context, String relType, String newRelID, StringList relIds, String direction) throws Exception{
    	if(relIds.size()>0){
    				for(int i=0;i<relIds.size();i++){
    					MapList ML=DomainRelationship.getInfo(context,new String[]{(String)relIds.get(i)}, createStringList(new String[] {direction+".id","torel.id"}));
    					String objID=(String) ((Map)ML.get(0)).get(direction+".id");
    					String relID="";
					
    					if(UIUtil.isNullOrEmpty(objID))
    						relID=(String) ((Map)ML.get(0)).get("torel.id");
					
    					String result="";
					
    					if("to".equals(direction)){
    						if(UIUtil.isNullOrEmpty(objID))
    							result=MqlUtil.mqlCommand(context, "add connection $1 fromrel $2 torel $3 select $4 dump",relType,newRelID,relID,"id");
    						else
    							result=MqlUtil.mqlCommand(context, "add connection $1 fromrel $2 to $3 select $4 dump",relType,newRelID,objID,"id");

    					}else
    							result=MqlUtil.mqlCommand(context, "add connection $1 from $2 torel $3 select $4 dump",relType,objID,newRelID,"id");
    					
    							Map attributeMap=new HashMap();
    							DomainRelationship tempRel=new DomainRelationship((String)relIds.get(i));
    							attributeMap=tempRel.getAttributeMap(context);
    							tempRel=new DomainRelationship(result);
    							tempRel.setAttributeValues(context, attributeMap);
				} // End For
			} // End If 
    }
    
    /*
     * Following method is the hook  for customer to implement a customer any customer.
     *  specific use case
     * The implementation can be done by adding the below method to the derived jpo
     * 
     * */
    
    public void migrateRelatedData(Context context,String  relID) {
    	
    }
}
