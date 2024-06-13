/*
 * emxEngineeringLeadTimeAttributeMigrationFindObjectsBase.java program to get all document type Object Ids.
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */

import java.io.*;

import matrix.db.*;
import matrix.util.*;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.engineering.EngineeringConstants;

public class emxEngineeringisVPMVisibleAttributeMigrationFindObjectsBase_mxJPO extends emxCommonFindObjects_mxJPO
{
    String migrationProgramName = "emxEngineeringisVPMVisibleAttributeMigration";
    boolean IncludeInWorkParts = false;
    boolean fourthParamException = false;
    
    public int mxMain(Context context, String[] args)
    	       throws Exception
    	   {
		    	try{
		    		if (args.length == 4 )
		            {
		    		  IncludeInWorkParts = "IncludeInWorkParts".equalsIgnoreCase(args[3]);
		    		  if(!IncludeInWorkParts){
			    		  fourthParamException = true;
		    			  throw new IllegalArgumentException("The Fourth Migration Option value should be IncludeInWorkParts to migrate parts in InWork state OR remove the fourth parameter to exclude objects in In_Wwork from migration");
		    		  }
		            }
		    		   super.mxMain(context, args);
		    	       return 0;
		    	} catch (IllegalArgumentException iExp)
		        {
		  	      writer.write("=================================================================\n");
		  	      writer.write("Step 1 of Migration emxEngineeringisVPMVisibleAttributeMigrationFindObjectsBase_mxJPO :   " + iExp.getLocalizedMessage() + "   : FAILED \n");
		  	      writer.write("Invalid arguments\n");
		  	      writer.write("Please specify:\n");
		  	      writer.write("1.Number of Object Ids to be written to a file\n");
		  	      writer.write("2.Object Type to be Migrated\n");
		  	      writer.write("3.Directory for migration script\n");
			  	  if (fourthParamException) {
			  	     writer.write("4.Migration Option value should be IncludeInWorkParts\n");
			  	  }
		  	      writer.write("=================================================================\n");
		  	      writer.close();
		  	      
		         return 0;
		     }
    	       
    	   }
    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @grade 0
     */
    public emxEngineeringisVPMVisibleAttributeMigrationFindObjectsBase_mxJPO (Context context, String[] args)
        throws Exception
    {
     super(context, args);
    }

    /**
     * Evalutes a temp query to get all the DOCUEMENTS objects in the system
     * @param context the eMatrix <code>Context</code> object
     * @param chunksize has the no. of objects to be stored in file.
     * @return void
     * @exception Exception if the operation fails.
     */
    public void getIds(Context context, int chunkSize) throws Exception
    {
        // Written using temp query to optimize performance in anticipation of
        // large 1m+ Substitute in system.
        // Utilize query limit to use different algorithim in memory allocation
        
        String vaultList = "*";
        try
        {
            //FrameworkProperties.getProperty("emxComponents.CommonDocumentMigration.VaultList");
        	EnoviaResourceBundle.getProperty(context,"emxComponents.CommonDocumentMigration.VaultList");
        }
        catch(Exception e)
        {
            //do nothing
        }

        //reset/set static variabless back to original values every time this JPO is run
        emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._counter  = 0;
        emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._sequence  = 1;
        emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._oidsFile = null;
        emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._fileWriter = null;
        emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._objectidList = null;

        //set statics
        //create BW and file first time
        if (emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._fileWriter == null)
        {
            try
            {
                emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO.documentDirectory = documentDirectory;
                emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._oidsFile = new java.io.File(documentDirectory + "objectids_1.txt");
                emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._fileWriter = new BufferedWriter(new FileWriter(emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._oidsFile));
                emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._chunk = chunkSize;
                emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO._objectidList = new StringList(chunkSize);
            }
            catch(FileNotFoundException eee)
            {
                throw eee;
            }
        }

        try
        {
        	String cmdParameterized = "temp query bus $1 $2 $3  vault $4 limit $5 where $6";
        	String whereClause = "";
			if(IncludeInWorkParts){
				whereClause = "(revision==first && attribute["+EngineeringConstants.ATTRIBUTE_VPM_VISIBLE+"] == TRUE && !(from["+ DomainConstants.RELATIONSHIP_PART_SPECIFICATION+"].to["+EngineeringConstants.TYPE_VPLM_VPMREFERENCE+"] != '')) && program[" + migrationProgramName + " -method writeOID ${OBJECTID} \"${TYPE}\"] == true" ;
        	}else{
        		whereClause = "(revision==first && current!="+EngineeringConstants.STATE_PART_PRELIMINARY +" && attribute["+EngineeringConstants.ATTRIBUTE_VPM_VISIBLE+"] == TRUE && !(from["+ DomainConstants.RELATIONSHIP_PART_SPECIFICATION+"].to["+EngineeringConstants.TYPE_VPLM_VPMREFERENCE+"] != '')) && program[" + migrationProgramName + " -method writeOID ${OBJECTID} \"${TYPE}\"] == true" ;
        	}
			MqlUtil.mqlCommand(context, 
								cmdParameterized, 
								DomainConstants.TYPE_PART , "*", "*", vaultList, "0", whereClause );
        }
        catch(Exception me)
        {
            throw me;
        }

        // call cleanup to write the left over oids to a file
        emxEngineeringisVPMVisibleAttributeMigration_mxJPO.cleanup();
    }
}
