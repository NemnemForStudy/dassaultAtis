/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2017 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 *
 ** kkr15: 10/3/2022 : First version
 */

import java.io.*;
import matrix.db.*;
import matrix.util.*;

import com.matrixone.apps.domain.DomainConstants;

public class enoEBOMSynchronizedDataMigrationFindRelationship_mxJPO extends emxCommonFindObjects_mxJPO
{
	String migrationProgramName = "enoEBOMSynchronizedDataMigration";
	String migrationMode = "";
	String whereClauseTrue = "attribute[isVPMVisible] == TRUE && frommid[VPLMInteg-VPLMProjection] == True";
	String whereClauseFalse = "attribute[isVPMVisible] == TRUE && frommid[VPLMInteg-VPLMProjection] == False";
	
 /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @grade 0
     */
    public enoEBOMSynchronizedDataMigrationFindRelationship_mxJPO (Context context, String[] args)
        throws Exception
    {    	
     super(context, args); 
    }
  	final String vpmProjection = "frommid[VPLMInteg-VPLMProjection]";
  	final String plmInstance_TreeOrder = "frommid[VPLMInteg-VPLMProjection].torel.attribute[PLMInstance.V_TreeOrder]";
  	final String plmInstance_PLMExternalID = "frommid[VPLMInteg-VPLMProjection].torel.attribute[PLMInstance.PLM_ExternalID]";
  	final String plmInstance_Vdescription = "frommid[VPLMInteg-VPLMProjection].torel.attribute[PLMInstance.V_description].value";
  	final String attrpartTitle = "to.name";
  	
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
            if (args.length != 4 )
            {
            	throw new IllegalArgumentException();
            }
           
            newArgs[0] = args[0]; //chunksize
            newArgs[1] = args[1]; //Rel name
            newArgs[2] = args[2]; //output directory
            newArgs[3] =args[3]; //migration mode, true for synced bom, false for nonsynced bom
            
            documentDirectory = args[2];
            migrationMode = args[3];

            // documentDirectory does not ends with "/" add it
            String fileSeparator = java.io.File.separator;
            if(documentDirectory != null && !documentDirectory.endsWith(fileSeparator))
            {
                documentDirectory = documentDirectory + fileSeparator;
            }
           if (!(migrationMode.equalsIgnoreCase("True") ||  migrationMode.equalsIgnoreCase("False") || migrationMode.equalsIgnoreCase("All")) ) {
         	   
         	   thirdParamException = true;
         	   throw new IllegalArgumentException();
         	   
            }
            
               super.mxMain(context, newArgs);
          
        }
        catch (IllegalArgumentException iExp)
        {
     	      if ( thirdParamException) {
     	    	  	writer.write("=================================================================\n");
            	   		writer.write(" The fourth paramater should be a keyword 'All' or 'True' or 'False' \n");
            	   		writer.write("=================================================================\n");
            	   		writer.close();
     	      } else {
     	    	  
     	      
     	      writer.write("=================================================================\n");
     	      writer.write("Invalid number arguments\n");
     	      writer.write("Please specify:\n");
     	      writer.write("1.Number of Rel Ids to be written to a file\n");
     	      writer.write("2.Relationship name : EBOM\n");
     	      writer.write("3.Directory for migration script\n");
     	      writer.write("4.Migration Option.  'All' for all EBOM 'True' for synchronized EBOM 'False' for non-synchronized EBOM.\n");
     	      writer.write("Step 1 of Migration enoEBOMSynchronizedDataMigrationFindRelationship_mxJPO :   " + iExp.toString() + "   : FAILED \n");
     	      writer.write("=================================================================\n");
     	      writer.close();
     	      }
     	      
            return 0;
        }
        
        finally {
        	return 0;
        }
    }
    /**
     * EBOM relationships are retrieved from database for migration and written in text file in output directory
     * Based on mode, whereClause and selectables differs. 
     * @param context the eMatrix <code>Context</code> object
     * @param chunksize has the no. of objects to be stored in file.
     * @return void
     * @exception Exception if the operation fails.
     */
    public void getIds(Context context, int chunkSize) throws Exception
    {
    	StringList selectablesTrue = new StringList(4);
    	StringList selectablesFalse = new StringList(4);
    	
    	selectablesTrue.add(DomainConstants.SELECT_ID);  //relID
    	selectablesTrue.add(plmInstance_TreeOrder);//treeOrder
    	selectablesTrue.add(plmInstance_PLMExternalID);//plmExternalId
    	selectablesTrue.add(plmInstance_Vdescription);//vDescription
    	
    	selectablesFalse.add(DomainConstants.SELECT_ID);  //relID
    	selectablesFalse.add(DomainConstants.SELECT_ATTRIBUTE_VNAME); //vName
    	selectablesFalse.add(DomainConstants.SELECT_ATTRIBUTE_FIND_NUMBER); //find number
    	selectablesFalse.add(attrpartTitle);//partTitle
    	
    	
        //reset/set static variabless back to original values every time this JPO is run
        enoEBOMSynchronizedDataMigration_mxJPO._counter  = 0;
        enoEBOMSynchronizedDataMigration_mxJPO._sequence  = 1;
        enoEBOMSynchronizedDataMigration_mxJPO._oidsFile = null;
        enoEBOMSynchronizedDataMigration_mxJPO._fileWriter = null;
        enoEBOMSynchronizedDataMigration_mxJPO._objectidList = null;
        enoEBOMSynchronizedDataMigration_mxJPO.migrationMode = null;

		RelationshipQuery relQueryTrue = new RelationshipQuery();
		RelationshipQueryIterator qitrTrue = null;
		relQueryTrue.setRelationshipType("EBOM");
		relQueryTrue.setWhereExpression(whereClauseTrue);
		
		RelationshipQuery relQueryFalse = new RelationshipQuery();
		RelationshipQueryIterator qitrFalse = null;
		relQueryFalse.setRelationshipType("EBOM");
		relQueryFalse.setWhereExpression(whereClauseFalse);
		
      //set statics
        //create BW and file first time
        if (enoEBOMSynchronizedDataMigration_mxJPO._fileWriter == null)
        {
            try
            {
            	enoEBOMSynchronizedDataMigration_mxJPO.documentDirectory = documentDirectory;
            	enoEBOMSynchronizedDataMigration_mxJPO._oidsFile = new java.io.File(documentDirectory + "objectids_1.txt");
            	enoEBOMSynchronizedDataMigration_mxJPO._fileWriter = new BufferedWriter(new FileWriter(enoEBOMSynchronizedDataMigration_mxJPO._oidsFile));
            	enoEBOMSynchronizedDataMigration_mxJPO._chunk = chunkSize;
            	enoEBOMSynchronizedDataMigration_mxJPO._objectidList = new StringList(chunkSize);
            	enoEBOMSynchronizedDataMigration_mxJPO.createIncorrectRelIDFile();
            	enoEBOMSynchronizedDataMigration_mxJPO.migrationMode = migrationMode;
            }
            catch(FileNotFoundException eee)
            {
                throw eee;
            }
        }

        try
        {   
        	//If mode is True
        	if(migrationMode.equalsIgnoreCase("True")){
	        	qitrTrue = relQueryTrue.getIterator(context, selectablesTrue, (short)1000);
	        	JPO.invoke(context, migrationProgramName, null, "writeOIDMigrationModeTrue", JPO.packArgs(qitrTrue), void.class);
	        	qitrTrue.close();
        	}else if(migrationMode.equalsIgnoreCase("False")){//If mode is True
	        	qitrFalse = relQueryFalse.getIterator(context, selectablesFalse, (short)1000);
	        	JPO.invoke(context, migrationProgramName, null, "writeOIDMigrationModeFalse", JPO.packArgs(qitrFalse), void.class);
	        	qitrFalse.close();
        	}else{//If mode is All, First extract data for collaborated EBOM and then for non-collaborated EBOM. Its similar to running first with mode True and then with mode False
        		//extract for synchronized EBOM
        		qitrTrue = relQueryTrue.getIterator(context, selectablesTrue, (short)1000);
	        	JPO.invoke(context, migrationProgramName, null, "writeOIDMigrationModeTrue", JPO.packArgs(qitrTrue), void.class);
	        	//extract for non-synchronized EBOM
	        	qitrTrue.close();
	        	qitrFalse = relQueryFalse.getIterator(context, selectablesFalse, (short)1000);
	        	JPO.invoke(context, migrationProgramName, null, "writeOIDMigrationModeFalse", JPO.packArgs(qitrFalse), void.class);
	        	qitrFalse.close();
	        }
        	
        }
        catch(Exception me)
        {
            throw me;
        }
        

        // call cleanup to write the left over oids to a file
        enoEBOMSynchronizedDataMigration_mxJPO.cleanup();
    }
    
}
