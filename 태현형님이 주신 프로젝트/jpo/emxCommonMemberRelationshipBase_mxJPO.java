// emxCommonMemberRelationshipBase.java
//
// Copyright (c) 2002-2020 Dassault Systemes.
// All Rights Reserved
// This program contains proprietary and trade secret information of
// MatrixOne, Inc.  Copyright notice is precautionary only and does
// not evidence any actual or intended publication of such program.
//
//

import java.io.*;
import java.util.*;
import matrix.db.*;
import matrix.util.*;
import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.common.util.*;

/**
 * The <code>emxMemberRelationshipBase</code> class represents the
 * Member relationship JPO functionality for the AEF type.
 *
 * @version AEF 9.5.1.3 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxCommonMemberRelationshipBase_mxJPO extends com.matrixone.apps.common.MemberRelationship
{
    /**
     * Constructs a new emxMemberRelationship JPO object.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args an array of String arguments for this method
     * @throws Exception if the operation fails
     * @since AEF 9.5.1.3
     */
    public emxCommonMemberRelationshipBase_mxJPO (Context context, String[] args)
        throws Exception
    {
        // Call the super constructor
        super();
        if (args != null && args.length > 0)
        {
            setName(args[0]);
        }
    }

	// Stubs left for PRG-specific triggers logic removed, in case the triggers are called
	// before the trigger objects get deleted in R423 section of Build.tcl
	//
	public void triggerCreateAction(Context context, String[] args) throws Exception {}
	public void triggerDeleteAction(Context context, String[] args) throws Exception {}
	public void triggerModifyAttributeAction(Context context, String[] args) throws Exception {}

	public void removeFromBUDepAndSub(Context context, String[] args)
            throws Exception
    {
    	String orgId = args[0];
        String personId = args[1];

        DomainObject person = DomainObject.newInstance(context, personId);

        DomainObject currOrg = DomainObject.newInstance(context,orgId);

    	StringList objSelects = new StringList();
        objSelects.add(DomainConstants.SELECT_ID);

        StringList relSelects =new StringList();
        relSelects.add(SELECT_RELATIONSHIP_ID);

        String relWhereClause="from[Member].to.id==\""+personId+"\"";

        //get the BU, Dep and Subsidaries
        MapList ml = currOrg.getRelatedObjects(
                context,                            // matrix context
                RELATIONSHIP_SUBSIDIARY + "," +
                RELATIONSHIP_DIVISION + "," +
                RELATIONSHIP_COMPANY_DEPARTMENT,// relationship pattern
                TYPE_ORGANIZATION,                 // object pattern
                objSelects,                   // object selects
                relSelects,                         // relationship selects
                false,                              // to direction
                true,                               // from direction
                (short) 1,                          // recursion level
                relWhereClause,                       // object where clause
                EMPTY_STRING,0);                      // relationship where clause

        Iterator itr = ml.iterator();
        while (itr.hasNext())
        {
            Map map = (Map) itr.next();
            String locOrgId = (String) map.get(DomainConstants.SELECT_ID);
            DomainObject locOrg = DomainObject.newInstance(context,locOrgId);
            locOrg.disconnect(context, new RelationshipType(RELATIONSHIP_MEMBER), true, person);
        }
    }

    public void removeSecurityContext(Context context, String[] args)
            throws Exception
    {
    	String orgId = args[0];
        String personId = args[1];
		//Getting KEEP_CREDENTIALS value for Move person function and check if false then remove the security context.
        String keepCredentials = PropertyUtil.getRPEValue(context, "KEEP_CREDENTIALS", true);
        if(UIUtil.isNullOrEmpty(keepCredentials) || (UIUtil.isNotNullAndNotEmpty(keepCredentials) && "false".equals(keepCredentials))){
			DomainObject person = DomainObject.newInstance(context, personId);
			DomainObject domOrg = DomainObject.newInstance(context, orgId);
			if(domOrg.isKindOf(context, TYPE_ORGANIZATION)){
				String currentRole=context.getRole();
				String currentApplication=context.getApplication();
				String companyName = PropertyUtil.getSchemaProperty(context, "role_CompanyName");
				ContextUtil.pushContext(context, null, null, null);
				/* DomainAccess.VPLMADMIN_COMPANYNAME_DEFAULT_SC = "ctx::VPLMAdmin."+ companyName +".Default";
				String result = MqlUtil.mqlCommand(context, "list role $1;", DomainAccess.VPLMADMIN_COMPANYNAME_DEFAULT_SC);
				if( result != null && !"".equals(result))
				{
					String userAgentAssignments = MqlUtil.mqlCommand(context, "print person $1 select  assignment dump;", context.getUser());
					if( !userAgentAssignments.contains(result) )
					{
						MqlUtil.mqlCommand(context, "mod person $1 assign role $2;", context.getUser(), DomainAccess.VPLMADMIN_COMPANYNAME_DEFAULT_SC);
					}
				}
				context.resetRole(DomainAccess.VPLMADMIN_COMPANYNAME_DEFAULT_SC);
				context.setApplication("VPLM");*/
				StringList relSelects = new StringList();
				relSelects.add(SELECT_RELATIONSHIP_ID);
				String relWhereClause="to.from[Security Context Organization].to.id==\""+orgId+"\"";
				MapList ml = person.getRelatedObjects(
						context,                            // matrix context
						"Assigned Security Context",                // relationship pattern
						TYPE_SECURITYCONTEXT,                                // object pattern
						EMPTY_STRINGLIST,                   // object selects
						relSelects,                         // relationship selects
						false,                              // to direction
						true,                               // from direction
						(short) 1,                          // recursion level
						EMPTY_STRING,                       // object where clause
						relWhereClause,0);
				Iterator itr = ml.iterator();
				while (itr.hasNext())
				{
					Map map = (Map) itr.next();
					String connectionId = (String) map.get(SELECT_RELATIONSHIP_ID);
					DomainRelationship.disconnect(context, connectionId);
				}
				/* context.resetRole(currentRole);
				context.setApplication(currentApplication);
				MqlUtil.mqlCommand(context, "mod person $1 remove assign role $2;", context.getUser(), DomainAccess.VPLMADMIN_COMPANYNAME_DEFAULT_SC);*/
				ContextUtil.popContext(context);
			}
        }
     }
}
