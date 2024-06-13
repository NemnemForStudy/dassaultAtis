/*
 * ${CLASS:emxUpdateOwnershipBase}.java
 * program for ownership migration.
 *
 * Copyright (c) 1992-2022 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;


import matrix.db.Context;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;

public class emxUpdatePALOwnershipBase_mxJPO extends emxCommonMigrationBase_mxJPO
{

    public emxUpdatePALOwnershipBase_mxJPO(Context context, String[] args)
            throws Exception {
        super(context, args);
        // TODO Auto-generated constructor stub
    }

    public void migrateObjects(Context context, StringList objectIdList) throws Exception{
        String strPALID = "";
	
        try {
            if(null!=objectIdList && !objectIdList.isEmpty())
            {                	
                mqlLogRequiredInformationWriter("Begin fixing PAL without Access Inheritance from Project");
                MapList projectList = new MapList();
              
                StringList objectSelects = new StringList();
                objectSelects.add(DomainObject.SELECT_ID);
                objectSelects.add(DomainObject.SELECT_NAME);

                //build type and rel patterns
                DomainObject PALObject = DomainObject.newInstance(context);

                for(int nCount=0;nCount<objectIdList.size();nCount++)
                {
                    strPALID = (String)objectIdList.get(nCount);
                    PALObject.setId(strPALID);
 			 	  
                    // get Project this PAL belongs to
                    projectList = PALObject.getRelatedObjects(context,
                                        DomainConstants.RELATIONSHIP_PROJECT_ACCESS_LIST,  //String relPattern
                                        DomainConstants.TYPE_PROJECT_SPACE, //String typePattern
                                        objectSelects,            //StringList objectSelects,
                                        null,                     //StringList relationshipSelects,
                                        true,                     //boolean getTo,
                                        true,                     //boolean getFrom,
                                        (short)1,                 //short recurseToLevel,
                                        null,                     //String objectWhere,
                                        "",                       //String relationshipWhere,
                                        null,                     //Pattern includeType,
                                        null,                     //Pattern includeRelationship,
                                        null);                    //Map includeMap


                    Iterator projectListItr = projectList.iterator();

                    // get a list of Project id's for the PAL
					String projectId = "";
					String projectName = "";
                    while(projectListItr.hasNext())
                    {
                        Map projectMap = (Map)projectListItr.next();
                        projectId = (String)projectMap.get(DomainObject.SELECT_ID);
                        projectName = (String)projectMap.get(DomainObject.SELECT_NAME);
                        mqlLogRequiredInformationWriter("Checking Inheritance for PAL " + projectName);
						
						if(!DomainAccess.hasObjectOwnership(context, strPALID, projectId, "")){
                            mqlLogRequiredInformationWriter(":: Inherited Ownership Created for PAL: OID: "+strPALID+" FROM PARENT PROJECT: "+ projectId +" PARENT PROJECT NAME: "+ projectName);
                            DomainAccess.createObjectOwnership(context, strPALID, projectId, "");
						}
						else {
                            mqlLogRequiredInformationWriter(":: Inherited Ownership Already Exists for PAL: OID: "+strPALID+" FROM PARENT PROJECT: "+ projectId +" PARENT PROJECT NAME: "+ projectName);
	
						}
                   }
  
			   }
			}
        }
        catch (Exception ex) {
			String comment = "Object <<" + strPALID + ">> KO";
			mqlLogRequiredInformationWriter(comment);
            writeUnconvertedOID(comment, strPALID);
			mqlLogRequiredInformationWriter("Exception caught <<" + ex.toString() + ">>");
            ex.printStackTrace();
        }
    }
    public void mqlLogRequiredInformationWriter(String command) throws Exception
	{
		super.mqlLogRequiredInformationWriter(command +"\n");
	}
	public void mqlLogWriter(String command) throws Exception
	{
	    super.mqlLogWriter(command +"\n");
	}
}
