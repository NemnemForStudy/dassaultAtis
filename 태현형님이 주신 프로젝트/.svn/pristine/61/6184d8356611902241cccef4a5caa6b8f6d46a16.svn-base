/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2021 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 ** kkr15: 10/3/2022 : First version
 */

import matrix.db.*;
import matrix.util.*;

import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;


public class enoEBOMSynchronizedDataMigration_mxJPO  extends emxCommonMigration_mxJPO
{
	public static FileWriter ObjectsToBeCorrectedOidsLog;
	public static String migrationMode;
	
	/**
	 *
	 * @param context the eMatrix <code>Context</code> object
	 * @param args holds no arguments
	 * @throws Exception if the operation fails
	 * @grade 0
	 */
	public enoEBOMSynchronizedDataMigration_mxJPO (Context context, String[] args)
			throws Exception
	{
		super(context, args);
	}

	final String vpmProjection = "frommid[VPLMInteg-VPLMProjection]";
	final String plmInstance_TreeOrder = "frommid[VPLMInteg-VPLMProjection].torel.attribute[PLMInstance.V_TreeOrder]";
	final String plmInstance_PLMExternalID = "frommid[VPLMInteg-VPLMProjection].torel.attribute[PLMInstance.PLM_ExternalID]";
	final String plmInstance_Vdescription = "frommid[VPLMInteg-VPLMProjection].torel.attribute[PLMInstance.V_description].value";
	final String attrpartTitle = "to.name";



	// Overriding the method to add additional data(selectables from projection rel) to the find objects text file.
	public boolean writeOID(Context context, String[] args) throws Exception {
		boolean writeReturn = false;
		if(migrationMode.equalsIgnoreCase("True")){
			writeReturn = writeOIDMigrationModeTrue(context, args);
		}
		else{
			writeReturn = writeOIDMigrationModeFalse(context, args);
		}
		return writeReturn;
	}
	/**
	 * Writes the output in a text file for collaborated EBOM relationship
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean writeOIDMigrationModeTrue(Context context, String[] args) throws Exception {
		RelationshipQueryIterator qitr = JPO.unpackArgs(args);

		String relId = null;
		StringList tempTreeOrder,tempPlmExtId,tempDescription = new StringList();
		String treeOrder="";
		String plmExternalId="";
		String vDescription="";

		int iMinTreeOrderIndex = 0;
		List<Double> listOfTreeOrderinFloat;

		for(RelationshipWithSelect relws : qitr){
			treeOrder="";
			plmExternalId="";
			vDescription="";
			try {
				relId  = relws.getSelectData(DomainConstants.SELECT_ID);	
				tempTreeOrder  = relws.getSelectDataList(plmInstance_TreeOrder);
				tempPlmExtId  = relws.getSelectDataList(plmInstance_PLMExternalID);
				tempDescription  = relws.getSelectDataList(plmInstance_Vdescription);
				//Find the minimum tree order in case of multiple instances
				if(tempTreeOrder.size()>1){
					listOfTreeOrderinFloat = new ArrayList<Double>();

					for(String sTO : tempTreeOrder){
						listOfTreeOrderinFloat.add(Double.parseDouble(sTO));
					}
					iMinTreeOrderIndex = getIndexOfMin(listOfTreeOrderinFloat);
				}else{
					iMinTreeOrderIndex = 0;
				}
				treeOrder = tempTreeOrder.get(iMinTreeOrderIndex);
				plmExternalId = tempPlmExtId.get(iMinTreeOrderIndex);
				vDescription = tempDescription.get(iMinTreeOrderIndex);
				fileWriter(relId +"|"+treeOrder+"|"+plmExternalId+"|"+vDescription);
			}catch(Exception ex){
				ObjectsToBeCorrectedOidsLog.write(relId+ ex.getMessage() +"\n");
				ObjectsToBeCorrectedOidsLog.flush();
			}
		}
		return false;
	}
	/**
	 * Writes the output in a text file for non-collaborated EBOM relationship
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean writeOIDMigrationModeFalse(Context context, String[] args) throws Exception {
		RelationshipQueryIterator qitr = JPO.unpackArgs(args);

		String relId=null, partTitle="",vName = "",findNumber = "";	
		String treeOrder = "",plmExternalId = "",vDescription = "";


		for(RelationshipWithSelect relws : qitr){
			treeOrder="";
			plmExternalId="";
			vDescription="";
			try {
				relId  = relws.getSelectData(DomainConstants.SELECT_ID);
				partTitle  = relws.getSelectData(attrpartTitle);
				vName  = relws.getSelectData(DomainConstants.SELECT_ATTRIBUTE_VNAME);
				findNumber  = relws.getSelectData(DomainConstants.SELECT_ATTRIBUTE_FIND_NUMBER);

				if(isNullOrEmpty(plmExternalId) && !isNullOrEmpty(partTitle)) {
					plmExternalId=partTitle+"."+findNumber;
				}
				else if(isNullOrEmpty(plmExternalId) && isNullOrEmpty(partTitle)) {
					plmExternalId=vName+"."+findNumber;
				}

				fileWriter(relId +"|"+treeOrder+"|"+plmExternalId+"|"+vDescription);
			}catch(Exception ex){
				ObjectsToBeCorrectedOidsLog.write(relId+ ex.getMessage() +"\n");
				ObjectsToBeCorrectedOidsLog.flush();
			}
		}
		return false;
	}

	/** This method creates the IncorrectRelID.csv file and add the page headers.
	 * @throws Exception if any operation fails.
	 */
	public static void createIncorrectRelIDFile() throws Exception{

		ObjectsToBeCorrectedOidsLog = new FileWriter(documentDirectory + "IncorrectRelID.csv");
		ObjectsToBeCorrectedOidsLog.write("The following relationships cannot be migrated. Please correct those values before migration\n");
		ObjectsToBeCorrectedOidsLog.write("REL. ID.\n");
	}
	/*This method does the relationship modification based on the values written in output file
	 * (non-Javadoc)
	 * @see ${CLASS:emxCommonMigrationBase}#migrateObjects(matrix.db.Context, matrix.util.StringList)
	 */
	public void  migrateObjects(Context context, StringList objectIdList)
			throws Exception
	{
		String relId = "";
		try{
			// context.start(true);
			Iterator itr = objectIdList.iterator();	
			//String[] relData=new String[4];
			StringList relData = new StringList();
			String treeOrder="";
			String plmExternalId ="";      
			String vDescription="";
			
			Map relAttributeMap = null;
			DomainRelationship domRel = null;
			while (itr.hasNext())
			{
				relData=  FrameworkUtil.split((String)itr.next(), "|");
				relId=relData.get(0);
				treeOrder=relData.get(1);
				plmExternalId=relData.get(2);
				vDescription = relData.get(3);
				relAttributeMap = new HashMap();

				//Set the attribute vlaue to be updated in map
				relAttributeMap.put("TreeOrder", treeOrder);
				relAttributeMap.put("PLM_ExternalID", plmExternalId);
				relAttributeMap.put("V_description", vDescription);

				//Update rel attributes
				domRel = DomainRelationship.newInstance(context, relId);
				domRel.setAttributeValues(context, relAttributeMap);
				
				mqlLogWriter ("relId- "+relId+"treeOrder:"+treeOrder+" plmExternalId :"+ plmExternalId +" relDescription: "+vDescription+" updated ");  
				loadMigratedOids(relId);                   
			}         

		}
		catch(Exception ex)
		{
			writeUnconvertedOID(relId+","+ex.toString().replace(',', ';')+"\n");
			ex.printStackTrace();
			throw ex;
		}

	}

	private int getIndexOfMin(List<Double> data) {
		double min = Double.MAX_VALUE;
		int index = -1;
		for (int i = 0; i < data.size(); i++) {
			Double f = data.get(i);
			if (Double.compare(f.doubleValue(), min) < 0) {
				min = f.doubleValue();
				index = i;
			}
		}
		return index;
	}
	/** Checks if the value passed as string is NULL or Empty.
	 * returns true if it is NULL/Empty, returns false if it is not NULL/Empty */
	public static boolean isNullOrEmpty(String data) {
		return (data == null || data.trim().length() == 0 || "null".equalsIgnoreCase(data.trim()));
	}
	
	
	public void help(Context context, String[] args) throws Exception {
		if (!context.isConnected()) {
			throw new Exception("not supported on desktop client");
		}

		writer.write("================================================================================================\n");
		writer.write(" EBOM Synchronized data Migration is a two step process  \n");
		writer.write(" Step1: Find relationship ids with type \"EBOM\", attribute isVPMVisible==TRUE, \n");
		writer.write(" and whether projection relation exists or not and write them into flat files \n");
		writer.write(" Example: \n");
		writer.write(" execute program enoEBOMSynchronizedDataMigrationFindRelationship 1000 EBOM C:/Temp/oids/ <migration_mode>; \n");
		writer.write(" First parameter  = indicates number of object per file \n");
		writer.write(" Second Parameter  = Relationship name i.e. EBOM \n");
		writer.write(" Third Parameter  = the directory where files should be written \n");
		writer.write(" Fourth  Parameter  = Migration mode, this is a keyword to say whether to extract all EBOM or synchronized EBOM or unsynchronized EBOM relationship id's\n");
		writer.write(" Fourth  Parameter  = This can take 'All' or 'True'  or 'False' \n");
		writer.write(" Selection of mode should be done based on number of EBOM relationships to be migrated. Execute method selectModeHelp for more info. \n");
		writer.write(" execute program enoEBOMSynchronizedDataMigration -method selectModeHelp; \n");
		writer.write(" \n");
		writer.write(" Step2: Migrate the objects \n");
		writer.write(" Example: \n");
		writer.write(" execute program enoEBOMSynchronizedDataMigration  'C:/Temp/oids/' 1 n ; \n");
		writer.write(" First parameter  = the directory to read the files from\n");
		writer.write(" Second Parameter = minimum range of file to start migrating  \n");
		writer.write(" Third Parameter  = maximum range of file to end migrating  \n");
		writer.write("        - value of 'n' means all the files starting from minimum range\n");
		writer.write("================================================================================================\n");
		writer.close();
	}
	
	public void selectModeHelp(Context context, String[] args) throws Exception{
		Long sTotalEBOMForMigration = Long.parseLong(MqlUtil.mqlCommand(context, "eval expr $1 on query connection type $2 where $3", "count true", "EBOM", "attribute[isVPMVisible]==TRUE"));
		Long sSynchronizedEBOMForMigration = Long.parseLong(MqlUtil.mqlCommand(context, "eval expr $1 on query connection type $2 where $3", "count true", "EBOM", "attribute[isVPMVisible]==TRUE && frommid[VPLMInteg-VPLMProjection]==True"));
		Long sNonSynchronizedEBOMForMigration = Long.parseLong(MqlUtil.mqlCommand(context, "eval expr $1 on query connection type $2 where $3", "count true", "EBOM", "attribute[isVPMVisible]==TRUE && frommid[VPLMInteg-VPLMProjection]==False"));
		String sMode = "";
		
		int sPercentOfSyncData = (int)(sSynchronizedEBOMForMigration/sTotalEBOMForMigration)*100;
		//sTotalEBOMForMigration < 1M -> return All
		//sTotalEBOMForMigration > 1M , sSynchronizedEBOMForMigration/sTotalEBOMForMigration > 0.3 , parallel mode is preferred, else, sequential mode
		if(sTotalEBOMForMigration<1000000){
			sMode = "Sequential";
		}else if(sPercentOfSyncData<30){
			sMode = "Sequential";
		}else{
			sMode = "Parallel";
		}
		
		writer.write("==============================================================================================================================================\n");
		writer.write("Number of EBOM relationships that requires migration: " +sTotalEBOMForMigration + "\n");
		writer.write("Out of which, \n");
		writer.write("Number of collaborated EBOM relationship: "+sSynchronizedEBOMForMigration + " \n");
		writer.write("Number of non-collaborated EBOM relationship: "+sNonSynchronizedEBOMForMigration + " \n\n");
		writer.write("==============================================================================================================================================\n");
		
		if(sMode.equals("Sequential")){
			writer.write("It is suggested to run the data extraction program in single sequential process with 'All' mode. \n");
		}else {
			writer.write("It is suggested to run the data extraction program in two parallel processes with mode 'True' and 'False'. \n");
			writer.write("\n");
			writer.write("! Caution: When running the data extraction program in two parallel process, output directory must be different \n");
		}
		writer.write("==============================================================================================================================================\n");
		writer.write("Note: These suggestions are applicable to data extraction part of migration and are based on volume of data to be migrated. \n"
				+ " If the total number of EBOM relationships to be migrated is more, let's say, more than 1 million, out of which, percent of collaborated \n "
				+ "EBOM relationship > 30, it's recommended to execute data extraction program in parallel process, with mode True and False for efficient result. \n "
				+ "These are only suggestions and it's choice of user based on volume of data and other project parameters. \n");
		writer.write("==============================================================================================================================================\n");
		writer.close();
	}
}
