/*
 * ${CLASS:emxSecurityMigrationContentFindObjectsBase}.java program to get all Content Object Ids for Bookmarks.
 *
 * Copyright (c) 1992-2022 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */

import matrix.db.*;
import matrix.util.*;
import java.io.*;
import java.util.*;
import java.text.*;
import java.util.Set;

import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxSecurityMigrationContentFindObjects_mxJPO extends emxCommonFindObjects_mxJPO
{
    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @grade 0
     */
    public emxSecurityMigrationContentFindObjects_mxJPO (Context context, String[] args)
        throws Exception
    {
		super(context, args);
		migrationProgramName = "emxSecurityMigrationMigrateTeamObjects";

    }

    /**
     * Evalutes a query connection to get all the Content objects for Bookmarks
     * @param context the eMatrix <code>Context</code> object
     * @param chunksize has the no. of objects to be stored in file.
     * @return void
     * @exception Exception if the operation fails.
     */
    public void getIds(Context context, int chunkSize) throws Exception
    {
        //reset/set static variabless back to original values every time this JPO is run
        emxCommonMigration_mxJPO._counter  = 0;
        emxCommonMigration_mxJPO._sequence  = 1;
        emxCommonMigration_mxJPO._oidsFile = null;
        emxCommonMigration_mxJPO._fileWriter = null;
        emxCommonMigration_mxJPO._objectidList = null;

        //set statics
        //create BW and file first time
        if (emxCommonMigration_mxJPO._fileWriter == null)
        {
            try
            {
                emxCommonMigration_mxJPO.documentDirectory = documentDirectory;
                emxCommonMigration_mxJPO._oidsFile = new java.io.File(documentDirectory + "objectids_1.txt");
                emxCommonMigration_mxJPO._fileWriter = new BufferedWriter(new FileWriter(emxCommonMigration_mxJPO._oidsFile));
                emxCommonMigration_mxJPO._chunk = chunkSize;
                emxCommonMigration_mxJPO._objectidList = new StringList(chunkSize);
            }
            catch(FileNotFoundException eee)
            {
                throw eee;
            }
        }

        try
        {
        	// Written using temp query to optimize performance in anticipation of
            // large 1m+ documents in system.
            // Utilize query limit to use different algorithim in memory allocation
			
			Set<String> contentTypesRequireGrants = new HashSet<>();
			String contentTypes = EnoviaResourceBundle.getProperty(context, "emxFramework.FolderContentTypesThatRequireGrants");
			for (String symbolicType : contentTypes.split(",")) {
				contentTypesRequireGrants.add(PropertyUtil.getSchemaProperty(context, symbolicType));
			} 
			Iterator<String> contentTypesItr = contentTypesRequireGrants.iterator(); 

			StringBuffer whereExpr = new StringBuffer("to.type matchlist '");
			String contentType = "";
			boolean first = true;
			while (contentTypesItr.hasNext())
			{
				contentType = contentTypesItr.next();
				if (contentType!=null && contentType.length() > 0)
				{
					if (!first) whereExpr.append(",");
					whereExpr.append(contentType);
					first = false;
				}
			}
			whereExpr.append("' ','");
			System.out.println("Where:" +whereExpr.toString());
		
            MqlUtil.mqlCommand(context, "query connection relationship $1 limit $2 where $3", type, "1", whereExpr.toString() + "&& program[" + migrationProgramName + " -method writeOID ${OBJECTID} \"${TYPE}\"] == true" );

        }
        catch(Exception me)
        {
            throw me;
        }

        // call cleanup to write the left over oids to a file
        emxCommonMigration_mxJPO.cleanup();
    }
}
