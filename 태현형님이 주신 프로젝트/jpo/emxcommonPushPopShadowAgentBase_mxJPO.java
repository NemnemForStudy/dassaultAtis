/*
**  emxcommonPushPopShadowAgentBase
**
**  Copyright (c) 1992-2017 Dassault Systemes.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of MatrixOne,
**  Inc.  Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program
**
*/

import matrix.db.Context;
import matrix.db.Program;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MqlUtil;

/**
 * The <code>emxcommonPushPopShadowAgentBase</code> class contains Push Pop Shadow Agent methods.
 *
 * @version AEF 10.0.1.0 - Copyright (c) 2003, MatrixOne, Inc.
 */

public class emxcommonPushPopShadowAgentBase_mxJPO
{


    /** Create an instant of emxUtil JPO. */
    protected emxUtil_mxJPO utilityClass = null;

    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF 10.0.1.0
     */

    public emxcommonPushPopShadowAgentBase_mxJPO (Context context, String[] args)
        throws Exception
    {
        //if (!context.isConnected())
            //throw new Exception("not supported no desktop client");
        // Create an instant of emxUtil JPO
        utilityClass = new emxUtil_mxJPO(context, null);
    }

    /**
     * This method is executed if a specific method is not specified.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @return int 0, status code
     * @throws Exception if the operation fails
     * @since AEF 10.0.1.0
     */

    public int mxMain(Context context, String[] args)
        throws Exception
    {
        //if (!context.isConnected())
            //throw new Exception("not supported no desktop client");
        return 0;
    }


    private static void setAgentPassword(Context context,  String agentSymbolicName, String agentPassword) throws Exception
    {
    	//System.out.println("setAgentPassword");
        String agentName = PropertyUtil.getSchemaProperty(context, agentSymbolicName);
        if (agentName != null && agentName.length() > 0) {
            String strBuff="escape modify person $1 password $2";
            MqlUtil.mqlCommand(context, strBuff, agentName, escape(agentPassword));
        }
    }

    public static void setAgentPassword(Context context,  String[] args) throws Exception
    {
    	//System.out.println("setAgentPassword with args");
        // password info program.
        String passwordFile = "emxcommonSessionInfo";

        // Get the code of the password info program.
        Program prog = new Program(passwordFile, false, false, false, false);
        prog.open(context);
        String passwd = prog.getCode(context);
        prog.close(context);

        if (passwd != null && "shadowsecret".equals(passwd.trim())) {
            setAgentPassword(context, args[0], args[1]);
        }
    }

    /**
     * This utility method to set password of the shadow agent.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args[0] should be User Agent Password
     * @return nothing
     * @throws Exception if the operation fails
     * @since AEF 10.0.1.0
     */
    public static void setShadowAgentPassword(Context context,  String[] args)
        throws Exception
    {
    	//System.out.println("setShadowAgentPassword");
        try
        {
            ContextUtil.startTransaction(context, true);
            String agentPassword = args[0];

            // Setting the "User Agent" password
            setAgentPassword(context, "person_UserAgent", agentPassword);

            // Setting the "Common Access Grantor" password
            setAgentPassword(context, "person_CommonAccessGrantor", agentPassword);

            // Setting the "Project Space Access Grantor" password
            setAgentPassword(context, "person_ProjectSpaceAccessGrantor", agentPassword);

            // Setting the "Request Access Grantor" password
            setAgentPassword(context, "person_RequestAccessGrantor", agentPassword);

            // Setting the "Route Access Grantor" password
            setAgentPassword(context, "person_RouteAccessGrantor", agentPassword);

            // Setting the "Route Delegation Grantor" password
            setAgentPassword(context, "person_RouteDelegationGrantor", agentPassword);

            // Setting the "Service Creator" password
            setAgentPassword(context, "person_ServiceCreator", agentPassword);

            // Setting the "Unmanaged Document Grantor" password
            setAgentPassword(context, "person_UnmanagedDocumentGrantor", agentPassword);

            // Setting the "Workspace Access Grantor" password
            setAgentPassword(context, "person_WorkspaceAccessGrantor", agentPassword);

            // Setting the "Workspace Lead Grantor" password
            setAgentPassword(context, "person_WorkspaceLeadGrantor", agentPassword);

            // Setting the "Workspace Member Grantor" password
            setAgentPassword(context, "person_WorkspaceMemberGrantor", agentPassword);

            String strBuff = "modify program $1 code $2";
            agentPassword = FrameworkUtil.encrypt(FrameworkUtil.encrypt(agentPassword));
            MqlUtil.mqlCommand(context, strBuff.toString(), "emxcommonSessionInfo", agentPassword);
            ContextUtil.commitTransaction(context);
        }
        catch(Exception ex)
        {
            ContextUtil.abortTransaction(context);
            ex.printStackTrace();
            throw ex;
        }
    }

    private static String escape(String input)
    {
        input = input.replaceAll("'", "\'");
        input = input.replaceAll("\"", "\\\"");
        return input;
    }
    /**
     * This utility method pushes context to the shadow agent.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *      0 - a String which contains userName
     * @return  int 0, status code
     * @throws Exception if the operation fails
     * @since AEF 10.0.1.0
     * @deprecated use emxContextUtil.pushContext
     */

    public int pushContext(Context context,  String[] args)
        throws Exception
    {
        String userName = null;

        // If user not passed then default to User Agent
        if (args == null) {
            userName = "person_UserAgent";
        } else {
            userName = args[0];
        }

        // If property name of user is defined then get user name from property.
        if (userName.startsWith("person_") == true) {
            userName = PropertyUtil.getSchemaProperty(context, userName);
        }

        // reset the context to shadow agent
        ContextUtil.pushContext(context, userName, null, context.getVault().getName());

        return 0;
    }

    /**
     * This utility method pops context.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @return  int 0, status code
     * @throws Exception if the operation fails
     * @since AEF 10.0.1.0
     * @deprecated use emxContextUtil.popContext
     */

    public int popContext(Context context, String[] args)
        throws Exception
    {
        ContextUtil.popContext(context);
        return 0;
    }

}
