/*
 * enoEBOMInstanceMigrationFindRelationshipBase.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 */

import java.io.*;
import java.util.StringTokenizer;

import matrix.db.*;
import matrix.util.*;

import com.dassault_systemes.enovia.bom.modeler.constants.BOMMgtConstants;
import com.dassault_systemes.enovia.changeaction.interfaces.IBusinessObjectOrRelationshipObject;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeAction;
import com.dassault_systemes.enovia.changeaction.interfaces.IRealizedActivity;
import com.dassault_systemes.enovia.changeaction.interfaces.IRealizedChange;
import com.dassault_systemes.enovia.partmanagement.modeler.util.ECMUtil;
import com.dassault_systemes.vplmintegration.unifiedchange.factory.VPLMJChangeCollaborationFactory;
import com.dassault_systemes.vplmintegration.unifiedchange.itf.IVPLMJChangeCollaborationModeler;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.*;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class enoEBOMInstanceMigrationFindRelationshipBase_mxJPO extends emxCommonFindObjects_mxJPO
{
    String migrationProgramName = "enoEBOMInstanceMigration";
    String migrationMode = "";
 	String relType  = DomainConstants.RELATIONSHIP_EBOM;
 	String attrUOM = DomainConstants.ATTRIBUTE_UNIT_OF_MEASURE ;
 	String attrQty = DomainConstants.ATTRIBUTE_QUANTITY ;
 	String sInterfaceName = "ignoreForInstMig";
 	
	String whereClause = "(!interface == 'ignoreForInstMig') && (!interface == 'Effectivity Framework') && attribute["+attrUOM+"].value == 'EA (each)' && attribute["+attrQty+"].value > 1";
	String documentDirectory = "";
	
	public static FileWriter EBOMRelsNotmigratedDueToSync;
	String newLine = System.getProperty("line.separator");
	StringList ebomid ;
	private  final String select_attr_isVPMVisible	= "attribute["+ BOMMgtConstants.ATTRIBUTE_ISVPMVISIBLE+ "]";
	private  final String select_attr_Qty	= "attribute["+BOMMgtConstants.ATTRIBUTE_QUANTITY+"]";
	private  final String select_attr_UOM = "attribute["+BOMMgtConstants.ATTRIBUTE_UNIT_OF_MEASURE+"]";
	private String documentDir=  ""; 
    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @grade 0
     */
    public enoEBOMInstanceMigrationFindRelationshipBase_mxJPO (Context context, String[] args)
        throws Exception
    {
    	super(context, args);
    	ebomid = new StringList();
    }

    /**
    * This method is executed if a specific method is not specified.
    *
    * @param context the eMatrix <code>Context</code> object
    * @param args holds no arguments
    * @returns nothing
    * @throws Exception if the operation fails
    */
   public int mxMain(Context context, String[] args)
       throws Exception
   {
	   
	   String[] newArgs = new String[4];
	   boolean  thirdParamException = false;
       try
       {
           if (args.length != 3 )
           {
		
	        thirdParamException = true;
               throw new IllegalArgumentException();
           }
          
           newArgs[0] = args[0];
           newArgs[1] = "EBOM";
           newArgs[2] = args[1];
           newArgs[3] =args[2]; 
           migrationMode =  args[2];
           
           documentDirectory = args[1];

           // documentDirectory does not ends with "/" add it
           String fileSeparator = java.io.File.separator;
           if(documentDirectory != null && !documentDirectory.endsWith(fileSeparator))
           {
               documentDirectory = documentDirectory + fileSeparator;
           }
           
		

           if (!(migrationMode.equalsIgnoreCase("Inwork") ||  migrationMode.equalsIgnoreCase("All")) ) {
        	   
        	   thirdParamException = true;
        	   throw new IllegalArgumentException();
        	   
           }
           
           // Genarate Logs
           createPendingEBOMForSync();
           
           // Update for pending changes
           updatePendingEBOMRel(context);
          
            super.mxMain(context, newArgs);
         

         
       }
       catch (IllegalArgumentException iExp)
       {
    	      if ( thirdParamException) {
    	    	  	writer.write("=================================================================\n");
           	   		writer.write(" The third paramater should be a keyword 'Inwork' or 'All' \n");
           	   		writer.write("=================================================================\n");
           	   		writer.close();
    	      } else {
    	    	  
    	      
    	      writer.write("=================================================================\n");
    	      writer.write("Invalid number arguments\n");
    	      writer.write("Please specify:\n");
    	      writer.write("1.Number of Rel Ids to be written to a file\n");
    	      writer.write("2.Directory for migration script\n");
    	      writer.write("3.Migration Option.  'All' for all relationship 'Inwork' for In work BOM  only.\n");
    	      writer.write("Step 1 of Migration ${CLASS:enoConfiguredEBOMExplodeFindObjectsBase} :   " + iExp.toString() + "   : FAILED \n");
    	      writer.write("=================================================================\n");
    	      writer.close();
    	      }
    	      
           return 0;
       }
       
       finally {
    
           if(!thirdParamException) { 		
    	   cleanEBOMRel(context);
    	   EBOMRelsNotmigratedDueToSync.close();
	   }
    	   
    	   return 0;
       }
       
       
   }
   
   /* 
   To cleanup the pending EBOM rel to remove the temp interface 
   */
   
   public void cleanEBOMRel(Context context) throws Exception
   {
	
	   try{
		   		for (int i= 0; i <ebomid.size(); i++) {
			   		String eId= (String)ebomid.get(i);
			   		MqlUtil.mqlCommand(context, "modify connection $1  remove interface $2", eId,sInterfaceName);
		   		}
		   		MqlUtil.mqlCommand(context, "delete interface $1", sInterfaceName);
	   		}
	  	   catch( Exception e) 
	   		{
				System.out.println("Exception in cleanEBOMRel(): "+e.getMessage());
	  		   throw e;
	   		}
   }
   
   
	/* 
		Update EBOM rel for not migrating such data if it had pening rel
	*/
   
   public void updatePendingEBOMRel(Context context) throws Exception
   {
	   try
	   {
	   String sinterface = MqlUtil.mqlCommand(context, "list interface $1", sInterfaceName);
	   
			if(sinterface.trim().length() == 0 ||  sinterface.trim().equals("")){
				String res = MqlUtil.mqlCommand(context, "add interface $1 relationship $2", sInterfaceName,"EBOM");  
	   }

	   String swhereClause ="current == 'In Work'";

		// Get all the CAs which are unreleased
		String strOp = MqlUtil.mqlCommand(context, "temp query bus $1  $2 $3 where $4 select $5 dump $6", "Change Action","*","*",swhereClause,"physicalid","|");
		
		// Retrieve each CAs
		StringTokenizer tokens = new StringTokenizer(strOp,"\n");
		 
			
		// Retrieve the CAs information.
		  while(tokens.hasMoreTokens())
	      {
			  String strTok = (String)tokens.nextToken();
			  StringTokenizer caTokens = new StringTokenizer(strTok,"|");
			  String changeType = (String)caTokens.nextToken();
			  String changeName = (String)caTokens.nextToken();
			  String chagneRevision = (String)caTokens.nextToken();
			  String pId = (String)caTokens.nextToken();
			  
			  processforPendingCAs(context,pId,changeName);
			  
	     }
		 } catch (Exception e){
		   System.out.println("Exception in updatePendingEBOMRel"+e.getMessage());
		   throw e;
	   }
			
   }
   
   public void processforPendingCAs(Context context, String changeId, String changeName) throws Exception {
	   
	   try
	   {
		   
		IVPLMJChangeCollaborationModeler syncItf = VPLMJChangeCollaborationFactory.getChangeCollaborationAbstraction();
	
		boolean doesCAHasPendingCollab = syncItf.isPromotionOfCAAuthorized(context, changeId);
		boolean applicabilityDefined = ECMUtil.isApplicabilityDefinedOnChange(context, changeId);
		
               
		
		if(!doesCAHasPendingCollab && !applicabilityDefined) {
			
			
		 	IChangeAction ica =  ECMUtil.getChangeActionInstance( context,  changeId);
			List<IRealizedChange> listRealizedChanges = ica.getRealizedChanges(context);
			
			for(IRealizedChange iRealizedChange : listRealizedChanges)
			{
				List<IRealizedActivity> iRealizedActivities = iRealizedChange.getActivites();

				for(IRealizedActivity iRealAct : iRealizedActivities)
				{
			 	
			 		String sRelType = "";
			 		String sParentInfo = "";
		 	
			 		if(null != iRealAct.getWhere()) {
			 			BusinessObject frombo = iRealAct.getWhere();

			 			Map proposed =new HashMap();
	        		 	StringList slObjectSeletables =  new  StringList();
	        		 	slObjectSeletables.add("type"); slObjectSeletables.add("name"); slObjectSeletables.add("revision");
	        		 	DomainObject domainwhereObj=new DomainObject(frombo.getName());
	        		 	proposed=domainwhereObj.getInfo(context, slObjectSeletables);
	        		 	sParentInfo = proposed.get("type")+ "," +proposed.get("name") +","+ proposed.get("revision"); 
			 			 
			 		}
		
			 		if (null != iRealAct.getWhichAfter()) {
			 			
			 			IBusinessObjectOrRelationshipObject ibr = iRealAct.getWhichAfter();
			 			sRelType = ibr.getType();

			 			if (sRelType.equalsIgnoreCase("EBOM")) {
			 				
			 					String ebomId = ibr.getId();
			 					
			 					String [] arrConn = new String[1];
			 			    	arrConn[0]= ebomId;
			 			    	
			 			    	SelectList resultSelects    = new SelectList(3);
			 			    	resultSelects.add(select_attr_isVPMVisible);
			 			    	resultSelects.add(select_attr_Qty);
			 			    	resultSelects.add(select_attr_UOM);
			 			    	
			 			    	MapList resultList = DomainRelationship.getInfo(context,arrConn,resultSelects);
			 			    	
			 			    	Iterator itr = resultList.iterator();
			 			    	Map map = (Map) itr.next();
			 		    		String attr_designCollab = (String) map.get(select_attr_isVPMVisible);
			 		    		String attr_Qty	= (String) map.get(select_attr_Qty);
			 		    		String attr_UOM 	=	 (String) map.get(select_attr_UOM);

			 					float iQty = Float.valueOf(attr_Qty);
			 					
			 					if(iQty > 1 && attr_UOM.equalsIgnoreCase("EA (each)") && attr_designCollab.equalsIgnoreCase("true")){
			 							MqlUtil.mqlCommand(context, "modify connection $1  add interface $2", ebomId,sInterfaceName);
				 						ebomid.add(ebomId);
			 					}
			 					
			 					EBOMRelsNotmigratedDueToSync.flush();
			 					EBOMRelsNotmigratedDueToSync.write(changeName +" , "+sParentInfo +" , "+ebomId +  newLine);
			 					EBOMRelsNotmigratedDueToSync.flush();
	
			 			}
			 		}
				 }  // End Activity for loop
			 } // End Realized Change loop
			
		}  // IF ICA 
	   } catch (Exception e){
		   System.out.println("Exception in processforPendingCAs"+e.getMessage());
		   throw e;
	   }
   }
   
   
    /**
     * Evalutes a temp query to get all the EBOM relationships in the system
     * @param context the eMatrix <code>Context</code> object
     * @param chunksize has the no. of objects to be stored in file.
     * @return void
     * @exception Exception if the operation fails.
     */
    public void getIds(Context context, int chunkSize) throws Exception
    {
        
    	if (migrationMode.equalsIgnoreCase("Inwork")) {
    		whereClause = whereClause.concat(" && from.current == 'Preliminary'");
    	}
        
        //reset/set static variabless back to original values every time this JPO is run
        enoEBOMInstanceMigration_mxJPO._counter  = 0;
        enoEBOMInstanceMigration_mxJPO._sequence  = 1;
        enoEBOMInstanceMigration_mxJPO._oidsFile = null;
        enoEBOMInstanceMigration_mxJPO._fileWriter = null;
        enoEBOMInstanceMigration_mxJPO._objectidList = null;

        //set statics
        //create BW and file first time
        if (enoEBOMInstanceMigration_mxJPO._fileWriter == null)
        {
            try
            {
            	enoEBOMInstanceMigration_mxJPO.documentDirectory = documentDirectory;
            	enoEBOMInstanceMigration_mxJPO._oidsFile = new java.io.File(documentDirectory + "objectids_1.txt");
            	enoEBOMInstanceMigration_mxJPO.createIncorrectQtyValuesFile();
            	enoEBOMInstanceMigration_mxJPO._fileWriter = new BufferedWriter(new FileWriter(enoEBOMInstanceMigration_mxJPO._oidsFile));
            	enoEBOMInstanceMigration_mxJPO._chunk = chunkSize;
            	enoEBOMInstanceMigration_mxJPO._objectidList = new StringList(chunkSize);
            }
            catch(FileNotFoundException eee)
            {
                throw eee;
            }
        }

        try
        {
        	MqlUtil.mqlCommand(context, "query connection relationship $1 where $2", relType, whereClause+" && program[" + migrationProgramName + " -method writeOID ${OBJECTID} \"${TYPE}\"  ] == true" );
        }
        catch(Exception me)
        {
            throw me;
        }

        // call cleanup to write the left over oids to a file
        enoEBOMInstanceMigration_mxJPO.cleanup();
        writer.write("====================================================================================\n");
    	writer.write("All the relationships with Unit of Measue as \"EA (each)\" and having\n");
    	writer.write("decimal value for the Attribute Quantity cannot be migrated.\n");
    	writer.write("All such Relationship IDs will be written to IncorrectQtyValues.csv file.\n");
    	writer.write("Please correct those values before migration \n");
    	writer.write("---------------------------------------------------------------------------------------------------\n");
    	writer.write("There may be certain EBOMs which might be consumed in Change Action's \n ");
    	writer.write("change log and the Change Action might not have been collaborated.\n");
    	writer.write("All such Relationship will not be migrated. This will be written in NotMigratedEBOMRel.csv file.\n");
    	writer.write( "====================================================================================\n");
        enoEBOMInstanceMigration_mxJPO.ObjectsToBeCorrectedOidsLog.close();
    }
    
    public void simul (Context context, String[] args) throws Exception {
   
    	 try
         {
    		 
    		if (args.length != 1 )
    		{
    			throw new IllegalArgumentException("nomode");
    		}
    	
    		String sMode = args[0];
    		
    		if (!(sMode.equalsIgnoreCase("Inwork") || sMode.equalsIgnoreCase("All"))){
    			throw new IllegalArgumentException("invalidmode");
    		}
    		
        	if (sMode.equalsIgnoreCase("Inwork")) {
        		whereClause = whereClause.concat(" && from.current == 'Preliminary'");
        	}
            
            String sCount = MqlUtil.mqlCommand(context, "evaluate expression $1 on query connection type $2 where $3", "count TRUE",relType, whereClause);
            writer.write("=============================================================================\n");
            writer.write("Mode  :"+sMode +" \n");
            writer.write("The number of EBOM relationships impacted by this migration for your given criteria = "+sCount +" \n");
            writer.write("=============================================================================\n");
         }
         catch (IllegalArgumentException iExp)
          {
        	 if (iExp.getMessage().equals("nomode")){
            	writer.write("=============================================================================\n");
      	      	writer.write("Invalid number arguments. Please specify the mode of migration, All or Inwork \n");
      	      	writer.write("=============================================================================\n");
        	 }
        	 if (iExp.getMessage().equals("invalidmode")){
             	writer.write("=============================================================================\n");
       	      	writer.write("Invalide mode keyword. The mode can be All or Inwork \n");
       	      	writer.write("=============================================================================\n");
         	 }
         }
    	 finally {
    		writer.close();
    	 }
    }
    

	public void help(Context context, String[] args) throws Exception {
		if (!context.isConnected()) {
			throw new Exception("not supported on desktop client");
		}

		writer.write("================================================================================================\n");
		writer.write(" EBOM Instance Migration is a two step process  \n\n");
		writer.write(" Step1: Find relationship ids with type \"EBOM\", Rel Attribute->Quantity >1, \n");
		writer.write(" \t and Attribute-> Unit of Measure \"EA (each)\" and write them into flat files \n");
		writer.write(" \n\t Example:.... \n");
		writer.write(" \t execute program enoEBOMInstanceMigrationFindRelationship 1000 C:/Temp/oids/  <migration_mode>; \n");
		writer.write(" \t First parameter  = indicates number of object per file \n");
		writer.write(" \t Second Parameter  = the directory where files should be written \n");
		writer.write(" \t Third  Parameter  = Migration mode, this is a keyword to say whether all data or selected data needs to be migrated \n");
		writer.write(" \t \t \t \t This can take 'All'  or 'Inwork' \n");
		writer.write(" \n\n");
		writer.write(" Step2: Migrate the objects \n");
		writer.write(" \n\t Example: \n");
		writer.write(" \t execute program enoEBOMInstanceMigration  'C:/Temp/oids/' 1 n ; \n");
		writer.write(" \t First parameter  = the directory to read the files from\n");
		writer.write(" \t Second Parameter = minimum range of file to start migrating  \n");
		writer.write(" \t Third Parameter  = maximum range of file to end migrating  \n");
		writer.write(" \t      - value of 'n' means all the files starting from mimimum range\n");
		writer.write("================================================================================================\n");
		writer.close();
	}
	
	/**
    *  Captures the EBOM Id with the Change Name and Parent Part for which the migration will not occur
    *  
    * */
    
    public void createPendingEBOMForSync() throws Exception{
    	try {
    		EBOMRelsNotmigratedDueToSync = new FileWriter(documentDirectory + "NotMigratedEBOMRel.csv");
    		EBOMRelsNotmigratedDueToSync.write("The following EBOM relationships associated with the given Change Action are not migrated. \n");
    		EBOMRelsNotmigratedDueToSync.write("Collaborate the CA and run the complete migration to migrate such EBOMs \n");
    		EBOMRelsNotmigratedDueToSync.write("===========================================================================================================================\n");
    		EBOMRelsNotmigratedDueToSync.write("Change Action , Parent Part Type , Parent Part Name , Parent Part Revision , EBOM Id \n");
    		EBOMRelsNotmigratedDueToSync.flush();
    	} catch (Exception e) {
    		System.out.println("Unable to open the file. One reason could be that the file might be open!");
    		System.out.println("Please close the files and try again.");
    		throw e;
    	}
    }
	
}
