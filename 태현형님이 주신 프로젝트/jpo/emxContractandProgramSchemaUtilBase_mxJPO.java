/*
**  emxProgramCentralAttributeTypeConversionBase
**
**  Copyright (c) 1992-2020 Dassault Systems, Inc.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of Dassault Systems,
**  Inc. Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program
**
*/

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.RegistrationUtil;
import com.matrixone.apps.domain.util.mxAttr;

import matrix.db.Context;
import matrix.util.MatrixException;
import matrix.util.StringList;

public class emxContractandProgramSchemaUtilBase_mxJPO
{
    /**
     * Enables the debug logging
     */
    private static boolean debug = false;
    private static final String INSTALLER = "Framework";
    private static final String APPLICATION = "ENOVIAEngineering";


    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args the arguments
     * @throws Exception if the operation fails
     */

    public emxContractandProgramSchemaUtilBase_mxJPO (Context context, String[] args) throws Exception {
        debug (context, "Constructor called");
    }

    /**
     * This method needs to create the admin type if it doesn't exist since the XML files will only do
     * a modify.  The create will occur on new installs.
     * minimum command ....  add type NAME
            <Command Type="JPO" ReloadCache="Yes">
                <JPO> emxContractandProgramSchemaUtil </JPO>
                <Method> reuseType </Method>
                <MethodArg> type_Opportunity </MethodArg>
                <MethodArg> Opportunity </MethodArg>
            </Command>
      *
     * args[0]  Symbolic name (existing)
     * args[1]  Name
     * args[2]  Version
     * @param context
     * @param args
     */
    public void reuseType (Context context, String[] args)
        throws Exception
    {
        final String ADMINTYPE = "type";
        		
        info (context, "PGM->DPM Type Conversion: " + args[0]);
        if (args == null || args.length < 3)
        {
            throw (new Exception("Error:reuseType:Invalid argument"));
        }
        String symbolicName = args[0];        
        String adminName    = args[1];
        String version      = args[2];

        // Create the schema element
        String adminNameFound = checkExistence(context, symbolicName, ADMINTYPE, adminName);
        if (adminNameFound == null) {

            String strMQL =  new String ("add $1 $2");
            List<String> queryParameterList = new ArrayList<String>();
            queryParameterList.add( ADMINTYPE );
            queryParameterList.add( adminName );
            MqlUtil.mqlCommand (context, strMQL, queryParameterList);
            
            String symbolicNew = ADMINTYPE + "_" + adminName.replace(" ","");
            createRegistration (context, ADMINTYPE, adminName, symbolicNew, version);
         } else {
          	updateAdminObject (context, ADMINTYPE, adminNameFound, adminName, symbolicName, version); 
         }

    }

    /**
     * This method needs to create the relationship if it doesn't exist since the XML files will only do
     * a modify.  The create will occur on new installs.
     * minimum command ....  add relationship NAME
             <Command Type="JPO" ReloadCache="Yes">
                <JPO> emxContractandProgramSchemaUtil </JPO>
                <Method> reuseRelationship </Method>
                <MethodArg> relationship_RiskAffectedItems </MethodArg>
                <MethodArg> Risk Affected Items </MethodArg>
            </Command>
     *
     * args[0]  Symbolic name (existing)
     * args[1]  Name
     * args[2]  Version
     * @param context
     * @param args
     */
    public void reuseRelationship (Context context, String[] args)
        throws Exception
    {
        final String ADMINTYPE = "relationship";
    	
        info (context, "PGM->DPM Relationship Conversion: " + args[0]);
        if (args == null || args.length < 3)
        {
            throw (new Exception("Error:reuseRelationship:Invalid argument"));
        }
        String symbolicName = args[0];        
        String adminName    = args[1];
        String version      = args[2];

        // Create the schema element
        String adminNameFound = checkExistence (context, symbolicName, ADMINTYPE, adminName);
        if (adminNameFound == null) {

            String strMQL =  new String ("add $1 $2");
            List<String> queryParameterList = new ArrayList<String>();
            queryParameterList.add( ADMINTYPE );
            queryParameterList.add( adminName );
            MqlUtil.mqlCommand (context, strMQL, queryParameterList);
            
            String symbolicNew = ADMINTYPE + "_" + adminName.replace(" ","");
            createRegistration (context, ADMINTYPE, adminName, symbolicNew, version);
        } else {
        	
           	updateAdminObject (context, ADMINTYPE, adminNameFound, adminName, symbolicName, version); 
        }

    }

    /**
     * This method needs to create the attribute if it doesn't exist since the XML files will only do
     * a modify.  The create will occur on new installs.
     * minimum command ....  add attribute NAME type integer
            <Command Type="JPO" ReloadCache="Yes">
                <JPO> emxContractandProgramSchemaUtil </JPO>
                <Method> reuseAttribute </Method>
                <MethodArg> attribute_OpportunityProbability </MethodArg>
                <MethodArg> Opportunity Probability</MethodArg>
                <MethodArg> integer </MethodArg>
            </Command>
     *
     * args[0]  Symbolic name (existing)
     * args[1]  Name
     * args[2]  Version
     * args[3]  Attribute type
     * @param context
     * @param args
     */
    public void reuseAttribute (Context context, String[] args)
        throws Exception

    {
        final String ADMINTYPE = "attribute";
        
        info (context, "PGM->DPM Attribute Conversion: " + args[0]);
        if (args == null || args.length < 4)
        {
            throw (new Exception("Error:reuseAttribute:Invalid argument"));
        }
        String symbolicName = args[0];        
        String adminName    = args[1];
        String version      = args[2];
        String adminAttrType = args[3];

        // Create the schema element if its not found
        String adminNameFound = checkExistence (context, symbolicName, ADMINTYPE,  adminName);
        if (adminNameFound == null) {

            String strMQL =  new String ("add $1 $2 $3 $4");
            List<String> queryParameterList = new ArrayList<String>();
            queryParameterList.add( ADMINTYPE );
            queryParameterList.add( adminName );
            queryParameterList.add( "type" );
            queryParameterList.add( adminAttrType );
            MqlUtil.mqlCommand (context,strMQL,queryParameterList);

            String symbolicNew = ADMINTYPE + "_" + adminName.replace(" ","");
            createRegistration (context, ADMINTYPE, adminName, symbolicNew, version);           
        } else {
            removeRanges (context, adminNameFound);
         	updateAdminObject (context, ADMINTYPE, adminNameFound, adminName, symbolicName, version); 
       }
        info (context, "PGM->DPM Attribute Conversion Done: " + symbolicName);

    }
 /**
     * This method needs to create the role if it doesn't exist since the XML files will only do
     * a modify.  The create will occur on new installs.
     * minimum command ....  add role NAME 
            <Command Type="JPO" ReloadCache="Yes">
                <JPO> emxContractandProgramSchemaUtil </JPO>
                <Method> reuseRole</Method>
                <MethodArg> role_ReleaseManager </MethodArg>
                <MethodArg>Release Manager</MethodArg>
                <MethodArg> R421 </MethodArg>
            </Command>
     *
     * args[0]  Symbolic name (existing)
     * args[1]  Name
     * args[2]  Version
     * @param context
     * @param args
     */
    public void reuseRole (Context context, String[] args)
        throws Exception

    {
        final String ADMINTYPE = "role";
        
        info (context, "Role Conversion: " + args[0]);
        if (args == null || args.length < 3)
        {
            throw (new Exception("Error:reuseRole:Invalid argument"));
        }    
		addOrUpdateAdminObject(context,args,ADMINTYPE);
        info (context, "Role Conversion Done: " + args[0]);

    }
	
	/**
     * This method needs to create the rule if it doesn't exist since the XML files will only do
     * a modify.  The create will occur on new installs.
     * minimum command ....  add role NAME 
            <Command Type="JPO" ReloadCache="Yes">
                <JPO> emxContractandProgramSchemaUtil </JPO>
                <Method> reuseRule</Method>
                <MethodArg> rule_UndisclosedConstituentRule </MethodArg>
                <MethodArg>Undisclosed Constituent Rule</MethodArg>
                <MethodArg> R421 </MethodArg>
            </Command>
     *
     * args[0]  Symbolic name (existing)
     * args[1]  Name
     * args[2]  Version
     * @param context
     * @param args
     */
    public void reuseRule (Context context, String[] args)
        throws Exception

    {
        final String ADMINTYPE = "rule";
        
        info (context, "Rule Conversion: " + args[0]);
        if (args == null || args.length < 3)
        {
            throw (new Exception("Error:reuseRole:Invalid argument"));
        }
        addOrUpdateAdminObject(context,args,ADMINTYPE);
        info (context, "Rule Conversion Done: " + args[0]);

    }
	
	/**
     * This method needs to create the package if it doesn't exist since the XML files will only do
     * a modify.  The create will occur on new installs.
     * minimum command ....  add package NAME 
            <Command Type="JPO" ReloadCache="Yes">
                <JPO> emxContractandProgramSchemaUtil </JPO>
                <Method> reusePackage</Method>
                <MethodArg>package_EBOM</MethodArg>
                <MethodArg>EBOM</MethodArg>
                <MethodArg>R423</MethodArg>
            </Command>
     *
     * args[0]  Symbolic name (existing)
     * args[1]  Name
     * args[2]  Version
     * @param context
     * @param args
     */
    public void reusePackage (Context context, String[] args)
        throws Exception

    {
        final String ADMINTYPE = "package";
        
        info (context, "package Conversion: " + args[0]);
        if (args == null || args.length < 3)
        {
            throw (new Exception("Error:reusePackage:Invalid argument"));
        }
        addOrUpdateAdminObject(context,args,ADMINTYPE);
        info (context, "Package Conversion Done: " + args[0]);

    }
	/**
     * This method needs to create the interface if it doesn't exist since the XML files will only do
     * a modify.  The create will occur on new installs.
     * minimum command ....  add role NAME 
            <Command Type="JPO" ReloadCache="Yes">
                <JPO> emxContractandProgramSchemaUtil </JPO>
                <Method> reuseInterface</Method>
                <MethodArg>interface_BasicMaterialRule </MethodArg>
                <MethodArg>Basic Material Rule</MethodArg>
                <MethodArg> R421 </MethodArg>
            </Command>
     *
     * args[0]  Symbolic name (existing)
     * args[1]  Name
     * args[2]  Version
     * @param context
     * @param args
     */
    public void reuseInterface (Context context, String[] args)
        throws Exception

    {
        final String ADMINTYPE = "interface";
        info (context, "Interface Conversion: " + args[0]);
        if (args == null || args.length < 3)
        {
            throw (new Exception("Error:reuseInterface:Invalid argument"));
        }
		addOrUpdateAdminObject(context,args,ADMINTYPE);
		info (context, "Interface Conversion Done: " + args[0]);
    }
	
	private void addOrUpdateAdminObject(Context context, String[] args,String adminType) throws Exception{
		
		
        String symbolicName = args[0];        
        String adminName    = args[1];
        String version      = args[2];

        // Create the schema element if its not found
        String adminNameFound = checkExistence (context, symbolicName, adminType,  adminName);
        if (adminNameFound == null) {

            String strMQL =  new String ("add $1 $2");
            List<String> queryParameterList = new ArrayList<String>();
            queryParameterList.add( adminType );
            queryParameterList.add( adminName );
            MqlUtil.mqlCommand (context,strMQL,queryParameterList);

            String symbolicNew = adminType + "_" + adminName.replace(" ","");
            createRegistration (context, adminType, adminName, symbolicNew, version);           
        } else {
         	updateAdminObject (context, adminType, adminNameFound, adminName, symbolicName, version); 
       }
        
		
    }		

	protected static void updateAdminObject (Context context, 
										String ADMINTYPE, 
										String adminNameFound, 
										String adminName, 
										String symbolicName, 
										String version) 
		throws Exception
	{
		String symbolicNew = remameAdmin (context, ADMINTYPE,  adminName, adminNameFound, symbolicName);
		updateRegistration (context, ADMINTYPE, adminName, symbolicNew, version);
	}

    protected void removeRanges (Context context, String ADMIN_NAME)
        throws Exception
    {
        StringList slRanges = mxAttr.getChoices(context, ADMIN_NAME);
        if (slRanges != null) {
            for(int i=0; i<slRanges.size();i++){
                String sRange = (String)slRanges.get(i);

                String strMQL =  new String ("modify $1 $2 $3 $4 $5 $6");
                List<String> queryParameterList = new ArrayList<String>();
                queryParameterList.add("attribute");
                queryParameterList.add(ADMIN_NAME);
                queryParameterList.add("remove");
                queryParameterList.add("range");
                queryParameterList.add("=");
                queryParameterList.add(sRange);

                MqlUtil.mqlCommand (context,strMQL,queryParameterList);
            }
            info (context, "PGM->DPM Attribute Removed Ranges: " + ADMIN_NAME);
        }
     }

/*
    protected static void updateProperties(Context context, String adminType, String adminName, String version) throws Exception
    {

        StringBuffer strMQL = new StringBuffer (128);
        List<String> queryParameterList = new ArrayList<String>();
        queryParameterList.add(adminType);
        queryParameterList.add(adminName);
        queryParameterList.add("application");
        queryParameterList.add(APPLICATION);
        queryParameterList.add("version");
        queryParameterList.add(version);
        queryParameterList.add("installer");
        queryParameterList.add(INSTALLER);
        queryParameterList.add("installed date");
        queryParameterList.add(new java.util.Date().toString());

        strMQL.append ("modify $1 $2")
              .append(" property $3  value $4")
              .append(" property $5  value $6")
              .append(" property $7  value $8")
              .append(" property $9  value $10");

        MqlUtil.mqlCommand (context,strMQL.toString(),queryParameterList);
    }
*/

    protected static void createRegistration (Context context,
                                            String adminType,
                                            String adminName,
                                            String symbolicName,
                                            String version)
         throws Exception {

    	// Properties
        StringBuffer strMQL = new StringBuffer (128);
        List<String> queryParameterList = new ArrayList<String>();
        queryParameterList.add(adminType);
        queryParameterList.add(adminName);
        queryParameterList.add("application");
        queryParameterList.add(APPLICATION);
        queryParameterList.add("version");
        queryParameterList.add(version);
        queryParameterList.add("installer");
        queryParameterList.add(INSTALLER);
        queryParameterList.add("installed date");
        queryParameterList.add(new java.util.Date().toString());

        strMQL.append ("modify $1 $2")
              .append(" add property $3  value $4")
              .append(" add property $5  value $6")
              .append(" add property $7  value $8")
              .append(" add property $9  value $10");

        MqlUtil.mqlCommand (context,strMQL.toString(),queryParameterList);
    	
    	// Symbolic Name - new create, use the one supplied
        String mqlCmd = "add property $1 on program $2 to $3 $4";
        MqlUtil.mqlCommand(context, mqlCmd, symbolicName, "eServiceSchemaVariableMapping.tcl", adminType, adminName);

        String[] sym = new String[1];
        sym[0] = symbolicName;
        emxAdminCache_mxJPO.reloadSymbolicName(context, sym);

        debug (context, "Created Registration for admin '" + adminName + "'  " + symbolicName);
    }

    protected static void updateRegistration (Context context,
                                            String adminType,
                                            String adminName,
                                            String symbolicName,
                                            String version)                                             		
	throws Exception {
        String strInstalledDate = new java.util.Date().toString();

        HashMap map = new HashMap();
        map.put("lstAdminType", adminType);
        map.put("hdnregisteredadmins",adminName);
        map.put("lstregisteredadmins",adminName);
        map.put("txtSymbolicName", symbolicName);
        map.put("txtApplication", APPLICATION);
        map.put("txtVersion", version);
        map.put("txtInstaller", INSTALLER);
        map.put("txtInstalledDate", strInstalledDate);
        // map.put("txtOriginalName", adminName);

        RegistrationUtil regUtil = new RegistrationUtil();
        regUtil.updateRegistration (context, map);
        
        
        String[] sym = new String[1];
        sym[0] = symbolicName;
        emxAdminCache_mxJPO.reloadSymbolicName(context, sym);

        debug (context, "Updated Registration for admin '" + adminName + "'");
    }

    /**
     * Check for PGM existence by symbolic name
     * @param context
     * @param adminType		Base type (attribute, type, relationship)
     * @param symbolicName  Symbolic name (From) to search for
     * @param adminName		(To) Name of the admin
     * @return
     */
    protected String checkExistence (Context context, String symbolicName, String ADMINTYPE,  String adminName) {
        String ADMIN_NAME = null;
        String symbolicNew = ADMINTYPE + "_" + adminName.replace(" ","");

        try {
            // This is to resolve symbolic name changes from PGM to DPM (relationship "Risk Project" to "Resolution Project")
            // On a new re-install, "Resolution Project" will exist
            debug (context, "PGM->DPM Existence Check: " + symbolicName);
            ADMIN_NAME = emxAdminCache_mxJPO.getName(context, ADMINTYPE, symbolicName);
 
            if (ADMIN_NAME == null) {
                debug (context, "PGM->DPM Existence Check: " + symbolicNew);
            	ADMIN_NAME = emxAdminCache_mxJPO.getName(context, ADMINTYPE, symbolicNew);
          }
        } catch (Exception ex) {
           System.out.println("PGM->DPM Existence Check Exception");
        }
        return ADMIN_NAME;
    }

    /**
     * Base the rename on a symbolic mismatch
     * @param context
     * @param adminType
     * @param adminName
     * @param adminNameOld
     * @param symbolicOld
     * @return
     */
    protected static String remameAdmin (Context context, String adminType,  String adminName, String adminNameOld, String symbolicOld) {
    	String symbolicName = symbolicOld;
        String symbolicNew = adminType + "_" + adminName.replace(" ","");
        try {       
        	if (!symbolicOld.equalsIgnoreCase(symbolicNew)) {
        		symbolicName = symbolicNew;
        		
        		String mqlCmd = "modify $1 $2 name $3";
        		MqlUtil.mqlCommand(context, mqlCmd, adminType, adminNameOld, adminName);
        	  
        		mqlCmd = "add property $1 on program $2 to $3 $4";
       	        MqlUtil.mqlCommand(context, mqlCmd, symbolicNew, "eServiceSchemaVariableMapping.tcl", adminType, adminName);
        	}
        } catch (Exception ex) {
            return symbolicName;      	
        }
       return symbolicName;
    }
    
    
    /************************
     * Logging mechanism
     ************************/

    /**
     * Prints information message
     */
    protected static void info(Context context, String strMessage) throws MatrixException {
        strMessage = new java.util.Date() + " : emxContractandProgramSchemaUtil: " + strMessage;
        log (context, strMessage);
    }

    /**
     * Prints debugging message
     */
    protected static void debug(Context context, String strMessage) throws MatrixException {
        if (debug) {
            strMessage = new java.util.Date() + " : emxContractandProgramSchemaUtil: [DEBUG] " + strMessage;
            log (context, strMessage);
        }
    }

    /**
     * Prints raw log message
     */
    protected static void log(Context context, String strMessage) throws MatrixException {
        try {
            emxInstallUtil_mxJPO.println(context, strMessage);
            if (debug) {
                System.out.println(strMessage);
            }
        }
        catch (Exception exp) {
            throw new MatrixException (exp);
        }
    }
}
