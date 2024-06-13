/*
 * ${CLASSNAME}.java
 * program for ownership migration.
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
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

public class emxUpdateOwnershipBase_mxJPO extends emxCommonMigrationBase_mxJPO
{

    private static final String SELECT_OWNERSHIP = "ownership";
    private static final String SELECT_OWNERSHIP_ACCESS = "ownership.access";
    private static final String SELECT_OWNERSHIP_COMMENT = "ownership.comment";
    private static final String SELECT_KINDOF_PROJECT_SPACE = "type.kindof[Project Space]";
    private static final String SELECT_IS_PROJECT_SPACE = "type.kindof["+DomainConstants.TYPE_PROJECT_SPACE+"]";
    private static final String SELECT_IS_PROJECT_CONCEPT = "type.kindof["+DomainConstants.TYPE_PROJECT_CONCEPT+"]";
    private static final String SELECT_ASSIGNED_TASKS_PERSON_NAME = "to[Assigned Tasks].from.name";

    private static final String KEY_PROJECT_MEMBER = "Project Member";
    private static final String KEY_PROJECT_LEAD = "Project Lead";

    public emxUpdateOwnershipBase_mxJPO(Context context, String[] args)
            throws Exception {
        super(context, args);
        // TODO Auto-generated constructor stub
    }

    public void migrateObjects(Context context, StringList objectIdList) throws Exception{
		String objectId = "";
		String objectType = "";
		String objectName = "";

        try {
            // mqlLogRequiredInformationWriter("In emxUpdateOwnershipBase::migrateObjects");
            StringList logicalNames = DomainConstants.EMPTY_STRINGLIST;
            StringList objectSelects = new StringList(6);

            objectSelects.add(DomainConstants.SELECT_ID);
            objectSelects.add(DomainConstants.SELECT_TYPE);
            objectSelects.add(DomainConstants.SELECT_NAME);
            objectSelects.add(SELECT_OWNERSHIP);
            objectSelects.add(SELECT_OWNERSHIP_ACCESS);
            objectSelects.add(SELECT_OWNERSHIP_COMMENT);
            objectSelects.add(SELECT_IS_PROJECT_SPACE);
            objectSelects.add(SELECT_IS_PROJECT_CONCEPT);
            objectSelects.add(SELECT_ASSIGNED_TASKS_PERSON_NAME);

            String[] oidsArray = new String[objectIdList.size()];
            oidsArray = (String[])objectIdList.toArray(oidsArray);
            MapList objectList = DomainObject.getInfo(context, oidsArray, objectSelects);

            // TODO - Should use iterator here to build physical/logical map
            logicalNames = DomainAccess.getLogicalNamesForPolicy(context, DomainConstants.POLICY_PROJECT_SPACE);
            String sReader = DomainAccess.getPhysicalAccessMasksForPolicy(context, DomainConstants.POLICY_PROJECT_SPACE, (String)logicalNames.get(0));
            String sLeader = DomainAccess.getPhysicalAccessMasksForPolicy(context, DomainConstants.POLICY_PROJECT_SPACE, (String)logicalNames.get(1));
            String sAuthor = DomainAccess.getPhysicalAccessMasksForPolicy(context, DomainConstants.POLICY_PROJECT_TASK, "Author");

            Iterator itr = objectList.iterator();

            String physicalMask,s,o,access,comment;
            StringList tokens;
            boolean bChanged = false;
            Map m;
            Iterator ownershipItr;
            String org,role,bits,cmd;

            while (itr.hasNext())
            {
                m = (Map)itr.next();

                objectId = (String)m.get(DomainConstants.SELECT_ID);
                objectType = (String)m.get(DomainConstants.SELECT_TYPE);
                objectName = (String)m.get(DomainConstants.SELECT_NAME);

                StringList ownership = (StringList)m.get(SELECT_OWNERSHIP);
                String isKindOfProjectSpace = (String)m.get(SELECT_IS_PROJECT_SPACE);
                String isKindOfProjectConcept = (String)m.get(SELECT_IS_PROJECT_CONCEPT);
                StringList taskAssigneeNames = (StringList)m.get(SELECT_ASSIGNED_TASKS_PERSON_NAME);
                String sMOAUserName;

                ownershipItr = ownership.iterator();
                

                while (ownershipItr.hasNext())
                {
                    o = (String)ownershipItr.next();

                    //
                    // If not personal security context (i.e. xyz_PRJ) nothing to do
                    //
                    //if (-1 == o.indexOf("_PRJ")) {
					//	continue;
					//}

                    s = SELECT_OWNERSHIP + "[" + o + "].access";

                    //
                    // Get org and role (project) from ownership string
                    // (needed for MQL add/remove ownership)
                    //
                    tokens = FrameworkUtil.splitString(o,"|");
                    
                    //ownership = role | org | comments
                    if(tokens.size()<3) {
                    	continue;
                    }
                    org = (String)tokens.remove(0);
                    role = (String)tokens.remove(0);
                    sMOAUserName = role.replace("_PRJ", "");

                    //
                    // Get ownership.access from the map
                    //
                    access = (String)m.get(s);

                    //
                    // Determine Project Lead vs. Project Member by checking actual mask for modify access
                    //
                    if (access.contains("modify")) {
                        // if modify access bit then we know we need to re-stamp leader if we are migrating a PS or PC
                        if((Boolean.valueOf(isKindOfProjectSpace)) || (Boolean.valueOf(isKindOfProjectConcept))) {
                           physicalMask = sLeader;
                        }
                        else {
                           // if the user was assigned to this task we will change them from leader to author
                           if ((taskAssigneeNames != null) && (taskAssigneeNames.contains(sMOAUserName))) {
                              physicalMask = sAuthor;
                           }
                           else // the user was given lead access to a task thru MOA page to re-stamp as Leader
                           {
                              physicalMask = sLeader;
                           }
                        }
                    }else{
                        physicalMask = sReader;
                    }

					//
                    // Get ownership comment
                    //
                    s = SELECT_OWNERSHIP + "[" + o + "].comment";
                    comment = (String)m.get(s);

                    mqlLogRequiredInformationWriter("Removing ownership for project <<" + objectName + ">>");
                    cmd = "modify bus " + objectId + " remove ownership '" + org + "' '" + role + "' for '" + comment + "' as all";
                    mqlLogRequiredInformationWriter(cmd);
                    MqlUtil.mqlCommand(context,cmd);

                    mqlLogRequiredInformationWriter("Adding ownership for project <<" + objectName + ">>");
                    cmd = "modify bus " + objectId + " add ownership '" + org + "' '" + role + "' for '" + DomainAccess.COMMENT_MULTIPLE_OWNERSHIP + "' as " + physicalMask;
                    mqlLogRequiredInformationWriter(cmd);
                    MqlUtil.mqlCommand(context,cmd);
                }
				mqlLogRequiredInformationWriter("Migrated <<" + objectName + ">> with id <<" + objectId + ">> OK");
                loadMigratedOids(objectId);
            }
        }
        catch (Exception ex) {
			String comment = "Object <<" + objectName + ">> KO";
			mqlLogRequiredInformationWriter(comment);
            writeUnconvertedOID(comment, objectId);
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
