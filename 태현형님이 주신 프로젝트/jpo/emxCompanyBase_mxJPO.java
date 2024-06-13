/*   emxCompanyBase
**
**   Copyright (c) 2003-2020 Dassault Systemes.
**   All Rights Reserved.
**   This program contains proprietary and trade secret information of MatrixOne,
**   Inc.  Copyright notice is precautionary only
**   and does not evidence any actual or intended publication of such program
**
**   This JPO contains the implementation of emxCompany
**
*/

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.Vector;
import matrix.util.Pattern;
import matrix.db.Attribute;
import matrix.db.AttributeList;
import matrix.db.AttributeType;
import matrix.db.BusinessObjectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.RelationshipType;
import matrix.db.Store;
import matrix.db.StoreList;
import matrix.db.UserItr;
import matrix.util.SelectList;
import matrix.util.StringItr;
import matrix.util.StringList;
import com.matrixone.apps.domain.util.AccessUtil;
import com.matrixone.apps.common.BusinessUnit;
import com.matrixone.apps.common.Company;
import com.matrixone.apps.common.Organization;

import com.matrixone.apps.common.Person;
/*import com.matrixone.apps.common.WorkspaceVault;*/
import com.matrixone.apps.common.util.ComponentsUIUtil;
/*import com.matrixone.apps.common.Workspace;*/
import com.matrixone.apps.common.util.ComponentsUtil;
/*import com.matrixone.apps.common.util.VaultedObjectsAccessUtil;*/
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.DebugUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.domain.util.PersonUtil;

import matrix.db.ExpansionIterator;
import matrix.db.RelationshipWithSelect;
import com.matrixone.apps.domain.util.CacheUtil;


/**
 * The <code>emxCompanyBase</code> class contains implementation code for emxCompany.
 * @version Common 10.0.0.0 - Copyright (c) 2003, MatrixOne, Inc.
 */
public class emxCompanyBase_mxJPO extends emxDomainObject_mxJPO
{

	public static final String STRING_DOUBLE_QUOTE = "\"";
    public static final String STRING_COMMA = ",";
    public static String ATTRIBUTE_SUPPLIER_TYPE = PropertyUtil.getSchemaProperty("attribute_SupplierType");
 
    
    public static final String ADD_RELATION = "add";
    /**
     * To invoke when removing a new Vaulted Objects relation
     */
    public static final String REMOVE_RELATION = "remove";
    /**
     * To invoke when Workspace or Folder access is updated
     */
    public static final String UPDATE_ACCESS = "update";


    /*
     * For the performace _ACCESS_BITS are stored in sorted order,
     * for any updates in these bits please update in the sorted order and also
     * update getAccessString() function.
     */
    private static final int _ACCESS_BITS_COUNT = 13;
    private static final String[] _ACCESS_BITS = new String[_ACCESS_BITS_COUNT];
    private static final String[] _ACCESS_EXPRESSIONS = new String[6];

    private static final Integer _READ_ACCESS = new Integer(0);
    private static final Integer _READ_WRITE_ACCESS = new Integer(1);
    private static final Integer _ADD_ACCESS = new Integer(2);
    private static final Integer _REMOVE_ACCESS = new Integer(3);
    private static final Integer _ADD_REMOVE_ACCESS = new Integer(4);
    private static final int _WLG_ACCESS = 5;

    private static final String WAG_SEARCH_STR = "grant[" + AccessUtil.WORKSPACE_ACCESS_GRANTOR + ",";
    private static final int WAG_GRANTEE_START_INDEX = WAG_SEARCH_STR.length();
    private static final String GRANTEEACCESS_SEARCH_STR = "].granteeaccess";

    private static final String WLG_SEARCH_STR = "grant[" + AccessUtil.WORKSPACE_LEAD_GRANTOR + ",";

    private static final String SELECT_WAG_GRANTEEACCESS = "grant[" + AccessUtil.WORKSPACE_ACCESS_GRANTOR +"].granteeaccess";
    private static final String SELECT_WAG_GRANTEE_GRANTEEACCESS_BEGIN = "grant[" + AccessUtil.WORKSPACE_ACCESS_GRANTOR + ",";
    private static final String SELECT_WAG_GRANTEE_GRANTEEACCESS_END = "].granteeaccess";

    private static final String SELECT_WLG_GRANTEE = "grant[" + AccessUtil.WORKSPACE_LEAD_GRANTOR +"].grantee";
    private static final String SELECT_WLG_GRANTEE_GRANTEE_BEGIN = "grant[" + AccessUtil.WORKSPACE_LEAD_GRANTOR + ",";
    private static final String SELECT_WLG_GRANTEE_GRANTEE_END = "].grantee";

    private static final String GRANT_ACCESS_STR_1 = " grant '";
    private static final String GRANT_ACCESS_STR_2 = "' access ";

    private static final String REVOKE_ACCESS_BY_WAG = " revoke grantor '" + AccessUtil.WORKSPACE_ACCESS_GRANTOR + "' grantee '";
    private static final String REVOKE_ACCESS_BY_WLG = " revoke grantor '" + AccessUtil.WORKSPACE_LEAD_GRANTOR + "' grantee '";

    static {
        /**
         * These values are stored in sorted order, for faster access while doing search.
         * To add/remove any access flag, add it in proper position.
         * Update the getAccessString() function accordingly.
         */

        _ACCESS_BITS[0]    =   "checkin";
        _ACCESS_BITS[1]    =   "checkout";
        _ACCESS_BITS[2]    =   "delete";
        _ACCESS_BITS[3]    =   "fromconnect";
        _ACCESS_BITS[4]    =   "fromdisconnect";
        _ACCESS_BITS[5]    =   "lock";
        _ACCESS_BITS[6]    =   "modify";
        _ACCESS_BITS[7]    =   "read";
        _ACCESS_BITS[8]    =   "revise";
        _ACCESS_BITS[9]    =   "show";
        _ACCESS_BITS[10]   =   "toconnect";
        _ACCESS_BITS[11]   =   "todisconnect";
        _ACCESS_BITS[12]   =   "unlock";

        //These expressions are in order how core returns, this gives performace when getting Access from access expression
        _ACCESS_EXPRESSIONS[0] = "read,checkout,show";
        _ACCESS_EXPRESSIONS[1] = "read,modify,checkout,checkin,lock,unlock,revise,show";
        _ACCESS_EXPRESSIONS[2] = "read,modify,checkout,checkin,lock,unlock,revise,fromconnect,toconnect,show";
        _ACCESS_EXPRESSIONS[3] = "read,modify,delete,checkout,checkin,lock,unlock,revise,fromdisconnect,todisconnect,show";
        _ACCESS_EXPRESSIONS[4] = "read,modify,delete,checkout,checkin,lock,unlock,revise,fromconnect,toconnect,fromdisconnect,todisconnect,show";
        _ACCESS_EXPRESSIONS[5] = "read,modify,delete,checkout,checkin,lock,unlock,promote,demote,revise,fromconnect,toconnect,fromdisconnect,todisconnect,grant,revoke,show";

    }
    
    
    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since Common 10.0.0.0
     * @grade 0
     */
    public emxCompanyBase_mxJPO (Context context, String[] args)
        throws Exception
    {
        super(context, args);
    }

    /**
     * This method is executed if a specific method is not specified.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @returns nothing
     * @throws Exception if the operation fails
     * @since Common 10.0.0.0
     */
    public int mxMain(Context context, String[] args)
        throws Exception
    {
        if (true)
        {
            throw new Exception(ComponentsUtil.i18nStringNow("emxComponents.CompanyBase.SpecifyMethodOnPartInvocation", context.getLocale().getLanguage()));
        }
        return 0;
    }

    /**
        * Gets the Business Units for the Company.
        *
        * @param context The Matrix Context.
        * @param selectStmts The list of selects.
        * @return maplist of BusinessUnits
        * @throws FrameworkException If the operation fails.
        * @since Common 10.0.0.0
        */
        @com.matrixone.apps.framework.ui.ProgramCallable
        public MapList getBusinessUnits (Context context,String[] args)
            throws Exception
       {
          HashMap paramMap = (HashMap)JPO.unpackArgs(args);

          String objectId = (String) paramMap.get("objectId");
          MapList mapList = new MapList();

          try {
              Company companyObj = (Company)newInstance(context,TYPE_COMPANY);
              companyObj.setId(objectId);
              StringList selectStmts = new StringList(1);
              selectStmts.addElement(companyObj.SELECT_ID);
              selectStmts.addElement(Organization.SELECT_WEB_SITE);
              selectStmts.addElement(DomainConstants.SELECT_ATTRIBUTE_TITLE);
              mapList = companyObj.getDivisions(context, selectStmts);
          }

          catch (FrameworkException Ex) {
               throw Ex;
         }
         return mapList;

      }

      /**
          * Gets the Subsidiaries for the Company.
          *
          * @param context The Matrix Context.
          * @param selectStmts The list of selects.
          * @return maplist of Subsidiaries
          * @throws FrameworkException If the operation fails.
          * @since Common 10.0.0.0
          */
          @com.matrixone.apps.framework.ui.ProgramCallable
          public MapList getSubsidiaries (Context context,String[] args)
              throws Exception
         {
            HashMap paramMap = (HashMap)JPO.unpackArgs(args);

            String objectId = (String) paramMap.get("objectId");
            MapList mapList = new MapList();

            try {
                Company companyObj = (Company)newInstance(context, objectId);
                StringList selectStmts = new StringList(2);
                selectStmts.addElement(companyObj.SELECT_ID);
                selectStmts.addElement(Organization.SELECT_WEB_SITE);
                selectStmts.addElement(Organization.SELECT_ORGANIZATION_PHONE_NUMBER);
                mapList = companyObj.getSubsidiaries(context, selectStmts);
            }
            catch (FrameworkException Ex) {
                 throw Ex;
           }
           return mapList;

        }

        /**
             * Gets the People for the Company.
             *
             * @param context The Matrix Context.
             * @param selectStmts The list of selects.
             * @return maplist of People
             * @throws FrameworkException If the operation fails.
             * @since Common 10.0.0.0
             */
             @com.matrixone.apps.framework.ui.ProgramCallable
             public MapList getEmployeeMembers (Context context,String[] args)
                 throws Exception
            {
               HashMap paramMap = (HashMap)JPO.unpackArgs(args);

               String objectId = (String) paramMap.get("objectId");
               MapList mapList = new MapList();
               try
               {
                   Organization organization = (Organization)newInstance(context, objectId);
                   StringList selectStmts = new StringList(4);
                   selectStmts.addElement(DomainConstants.SELECT_ID);
                   selectStmts.addElement("attribute[" + ATTRIBUTE_EMAIL_ADDRESS + "]");
                   selectStmts.addElement(Organization.SELECT_LOGIN_TYPE);
                   selectStmts.addElement("relationship[" + Organization.RELATIONSHIP_COMPANY_REPRESENTATIVE + "]");
                   selectStmts.addElement("attribute[" + ATTRIBUTE_LICENSED_HOURS + "]");
                   mapList = organization.getMemberPersons(context, selectStmts, null, null);
               }
               catch (FrameworkException Ex)
               {
                  throw Ex;
               }
               return mapList;
           }


    /**
     * Trigger on the employee relationship creation.
     *      When a person is connected as an employee to a company,
     *      make sure a member relationship is also created and its roles
     *      parameter filled with all of the person's roles.
     *
     * @param context The Matrix Context.
     * @param args Additional program arguments
     * @throws Exception If the operation fails.
     * @since Common 10.0.0.0
     * @trigger RelationshipEmployeeCreateAction
     */
    public void addMemberRelationship(Context context, String[] args)
        throws Exception
    {
        DebugUtil.debug("RelationshipEmployeeCreateAction:addMemberRelationship");

        // args[] parameters
        //
        String companyId = args[0];
        String personId = args[1];
        String employeeRelId = args[2];

        DebugUtil.debug("companyId = " + companyId);
        DebugUtil.debug("personId  = " + personId);
        DebugUtil.debug("employeeRelId = " + employeeRelId);

        try
        {
            Organization organization = (Organization)newInstance(context, companyId);

            com.matrixone.apps.common.Person person =
                (com.matrixone.apps.common.Person)newInstance(context, personId);

            StringList roles = person.getRoleAssignments(context);

            organization.addMemberPerson(context, personId, roles);
        }
        catch (Exception e)
        {
            DebugUtil.debug("RelationshipEmployeeCreateAction:addMemberRelationship-----Exception=", e.toString());
            throw (e);
        }
        finally
        {
        }
    }

	
	/**@param context The Matrix Context.
     * @param args Additional program arguments
     * @throws Exception If the operation fails.
	 * @since R419
     * @trigger RelationshipEmployeeDeleteAction
     */
    public void removeMemberRelationship(Context context, String[] args) throws FrameworkException {
    	String companyId = args[0];
        String personId = args[1];
        
       	Organization org = (Organization) newInstance(context, companyId);
       	
        String objWhereClause = "id==" + personId;
        MapList membersList = org.getRelatedObjects(context, DomainConstants.RELATIONSHIP_MEMBER, DomainConstants.TYPE_PERSON, new StringList(DomainConstants.SELECT_ID), new StringList(1), false, true, (short) 1, objWhereClause, null, 0);
        if(!membersList.isEmpty()) {
        	org.removeMemberPersons(context, new String[]{personId});
        }
    }
	
	
    /**
    * This method gets the href link of "email Address" attribute for each element in the MapList.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds no arguments as it is getting the params list,objects list from the Config UI table.
    * @returns Vector of "email Address" values for each row.
    * @throws Exception if the operation fails
    * @since EC 10-0-0-0
    */
    public Vector getEmailAddress(Context context, String[] args)
            throws Exception
    {
        HashMap programMap  = (HashMap)JPO.unpackArgs(args);
        // getting the MapList of the objects.
        MapList objList = (MapList)programMap.get("objectList");
        Vector columnVals = new Vector(objList.size());
        Iterator iterator = objList.iterator();
        String emailAddress;
        // iterating to get the Share Type attribute object
        while (iterator.hasNext())
        {
            Map map = (Map) iterator.next();
            emailAddress = (String)map.get("attribute[" + ATTRIBUTE_EMAIL_ADDRESS + "]");
            // add the web site value along with the href tag to show the link on the website
            columnVals.addElement("<a href=\""+"mailto:"+emailAddress+"\">"+emailAddress);
        }
        return columnVals;
    }

    /**
    * This method gets the image link of "login type" attribute for each element in the MapList.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds no arguments as it is getting the params list,objects list from the Config UI table
    * @returns Vector of "login type" values for each row
    * @throws Exception if the operation fails
    * @since Common 10-0-0-0
    */
    public Vector getLoginType(Context context, String[] args)
            throws Exception
    {
        HashMap programMap  = (HashMap)JPO.unpackArgs(args);
        // getting the MapList of the objects.
        MapList objList = (MapList)programMap.get("objectList");
        Vector columnVals = new Vector(objList.size());
        Iterator iterator = objList.iterator();
        String columnValue="";
        String loginType="";
        String sCompRep="";
        while (iterator.hasNext())
        {
            Map map = (Map) iterator.next();
            sCompRep = (String)map.get("relationship[" + Organization.RELATIONSHIP_COMPANY_REPRESENTATIVE + "]");
            if ("true".equalsIgnoreCase(sCompRep)) {
             columnValue = "<img src=\"../engineeringcentral/images/iconSmallCompanyRep.gif\" border=0>";
            }
            // display secure id image
            loginType = (String)map.get(Organization.SELECT_LOGIN_TYPE);
            if ("Secure ID".equals(loginType)) {
              columnValue += "&nbsp;<img src=\"../common/images/iconSmallAccess.gif\" border=0 >";
            }
            columnVals.addElement(columnValue);
        }
        return columnVals;
    }
/**
     * Gets the Departments of the Company.
     * @param context The Matrix Context.
     * @param args
     * @return maplist of Departments
     * @throws Exception If the operation fails.
     * @since Common 10.0.0.0
     * @grade 0
     */
     @com.matrixone.apps.framework.ui.ProgramCallable
     public MapList getDepartments (Context context,String[] args)
                      throws Exception
     {
       if(args.length == 0 ) {
         throw new IllegalArgumentException();
       }
       HashMap paramMap = (HashMap)JPO.unpackArgs(args);
       String objectId = (String) paramMap.get("objectId");
       MapList mapList = null;
       try {
         BusinessUnit businessUnitObj = (BusinessUnit)newInstance(context,TYPE_BUSINESS_UNIT);
         businessUnitObj.setId(objectId);
         StringList selectStmts = new StringList(2);
         selectStmts.addElement(SELECT_ID);
         selectStmts.addElement(Organization.SELECT_WEB_SITE);
         selectStmts.addElement(DomainConstants.SELECT_ATTRIBUTE_TITLE);
         mapList = businessUnitObj.getDepartments(context, selectStmts);
       } catch (Exception ex) {
         throw ex;
       }
       return mapList;
     }

    /**
         * Checks the context person for Host rep Access to display create company command
         * @param context The Matrix Context.
         * @param args
         * @return Boolean Yes if person is host rep, false if Person is not host rep
         * @throws Exception If the operation fails.
         * @since Common 10.0.0.0
         * @grade 0
         */
         public boolean isHostRep (Context context,String[] args)
                          throws Exception
         {
        	 if(FrameworkUtil.isOnPremise(context)){
        		 return PersonUtil.isVPLMAdminInHostCompany(context) || (Company.isHostRep(context,com.matrixone.apps.common.Person.getPerson(context)));
        	 }
        return true;    		 
     }

   /**
     * Gets the Departments for the People
     * @param context The Matrix Context.
     * @param args
     * @return maplist of Departments
     * @throws Exception If the operation fails.
     * @since Common 10.0.0.0
     * @grade 0
     */
     @com.matrixone.apps.framework.ui.ProgramCallable
     public MapList getDepartmentsforPeople (Context context,String[] args)
                      throws Exception
     {
       if(args.length == 0 ) {
         throw new IllegalArgumentException();
       }
       HashMap paramMap = (HashMap)JPO.unpackArgs(args);
       String id = (String) paramMap.get("objectId");
       MapList mapList = null;
       StringList stringList = new StringList();
       stringList.addElement(DomainConstants.SELECT_ID);
       stringList.addElement(Organization.SELECT_WEB_SITE);
       stringList.addElement(DomainConstants.SELECT_ATTRIBUTE_TITLE);
       StringList relList = new StringList();
       relList.addElement(DomainConstants.SELECT_RELATIONSHIP_ID);

             try {
               Person person =(Person)DomainObject.newInstance(context,DomainConstants.TYPE_PERSON);
               person.setId(id);
               mapList=person.getRelatedObjects(context,DomainConstants.RELATIONSHIP_MEMBER,TYPE_DEPARTMENT,stringList,relList,true,false,(short)1,"","");
               } catch (Exception ex) {
               throw ex;
        }
        return mapList;
     }


       /**
             * Gets the Inactive People for the Company.
             *
             * @param context The Matrix Context.
             * @param
             * @return maplist of People
             * @throws FrameworkException If the operation fails.
             * @since Common 10.0.0.0
             */

             @com.matrixone.apps.framework.ui.ProgramCallable
             public MapList getInactivePeople (Context context,String[] args)
                 throws Exception
            {

               String objectId = Person.getPerson(context).getCompanyId(context);
               String hostCompanyType = Company.getHostCompany(context); 
               MapList mapList = new MapList();
               if(!UIUtil.isNullOrEmpty(hostCompanyType)&&hostCompanyType.equals(objectId)){
            	   String typePattern = PropertyUtil.getSchemaProperty(context,
                           SYMBOLIC_type_Company);
            	   String vaultPattern = "*";       	   
            	   String relEmployee  = PropertyUtil.getSchemaProperty(context, "relationship_Employee");
                   StringList objectSelects = new StringList(1);
                   objectSelects.addElement(DomainObject.SELECT_ID);
                   String whereExpression = "current==Active";
                   MapList compMapList = new MapList();
                   String  personObjectList = "from["+relEmployee+"].to."+DomainConstants.SELECT_ID;
                   StringList mulValSelects =new StringList();
                   mulValSelects.add(personObjectList);
                   objectSelects.addElement(personObjectList);
                   compMapList = DomainObject.findObjects(context,typePattern,vaultPattern,whereExpression,objectSelects, mulValSelects);
                   Iterator itr =  compMapList.iterator();
                   StringList compnayEmployeeList = null;
                   Map companyMap = null;
                   while(itr.hasNext()){
                	    companyMap = (Map)itr.next();
                	    if(companyMap.containsKey("from["+relEmployee+"].to.id")){
                	    compnayEmployeeList = (StringList)companyMap.get("from["+relEmployee+"].to.id");
                	    Iterator  itrEmployeeList = compnayEmployeeList.iterator();
                	    while(itrEmployeeList.hasNext()){
                	    	String personObjectId = (String)itrEmployeeList.next();
                	    	Person  personObj = (Person)DomainObject.newInstance(context, personObjectId);
                    	    StringList objectSelectsPerson = new StringList();
                            objectSelectsPerson.addElement(DomainObject.SELECT_CURRENT);
                            objectSelectsPerson.addElement(Person.SELECT_EMAIL_ADDRESS);
                            Map personObjInfo = personObj.getInfo(context, objectSelectsPerson);
                            String currentState = (String)personObjInfo.get("current");
                            String emailAddress = (String)personObjInfo.get("attribute["+ATTRIBUTE_EMAIL_ADDRESS+"]");
                            Hashtable ht = new Hashtable();
                            if("Inactive".equals(currentState)){    	
                            	 ht.put("current",currentState);
                            	 ht.put("id",personObjectId);
                            	 ht.put("attribute["+ATTRIBUTE_EMAIL_ADDRESS+"]",emailAddress);
                            	 mapList.add(ht);
                            }     	    	
                	    } 
                	   }
                   }   
               }   
               else{
               try
               {
                   Company organization = (Company)newInstance(context, objectId);
                   SelectList  busSelects = new SelectList();
                   busSelects.addId();
                   busSelects.addCurrentState();
                   busSelects.addAttribute(ATTRIBUTE_EMAIL_ADDRESS);

                  // Find all employees in the organization.
                   ContextUtil.startTransaction(context,false);
                   ExpansionIterator  expIter = organization.getExpansionIterator(context, "Employee", "Person",busSelects, new StringList(0), false, true, (short) 1, null, null, (short)0, false, false, (short)100, false);
                   
                   try {
                       
                       // Loop through the employees and add each inactive one to a list.
                       while (expIter.hasNext()) {
                           Hashtable ht = new Hashtable();
                           RelationshipWithSelect relWS = expIter.next();
                           if (relWS.getTargetSelectData("current").equals("Inactive")) {
                               ht.put("current",relWS.getTargetSelectData("current"));
                               ht.put("id",relWS.getTargetSelectData("id"));
                               ht.put("attribute["+ATTRIBUTE_EMAIL_ADDRESS+"]",relWS.getTargetSelectData("attribute["+ATTRIBUTE_EMAIL_ADDRESS+"]"));
                               mapList.add(ht);
                           }
                       }
                   } finally {
                       expIter.close();
                   }
                   ContextUtil.commitTransaction(context);

               }
               catch (FrameworkException Ex)
               {
                  ContextUtil.abortTransaction(context);
                  throw Ex;
               }
               }
               return mapList;
           }

       /**
             * Gets the All Companies list.
             *
             * @param context The Matrix Context.
             * @param
             * @return maplist of All Companies
             * @throws FrameworkException If the operation fails.
             * @since Common 10.0.0.0
             */
             public MapList getAllCompanies (Context context,String[] args)
                 throws Exception
            {
               MapList mapList = new MapList();
               try
               {
                  StringList selectStmts = new StringList(3);
                  selectStmts.addElement(Company.SELECT_NAME);
                  selectStmts.addElement(Company.SELECT_ATTRIBUTE_TITLE);
                  selectStmts.addElement(Organization.SELECT_ORGANIZATION_PHONE_NUMBER);
                  selectStmts.addElement(Organization.SELECT_WEB_SITE);
                  mapList = Company.getCompanies(context,DomainConstants.QUERY_WILDCARD,selectStmts,null);
               }
               catch (FrameworkException Ex)
               {
                  throw Ex;
               }
               return mapList;
           }
    /**
     * This method return true if user have permissions on the command
     * otherwise return false.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds objectId and param values.
     * @return Boolean true if FCS is enabled and property set to true othewise return false.
     * @throws Exception If the operation fails.
     * @since EC 10-5.
     */
     public Boolean hasAccessToPotentialSuppliers(Context context, String[] args)
         throws Exception
    {
        HashMap paramMap = (HashMap)JPO.unpackArgs(args);
        String adminRoleList = "";
        String roleList = "role_BuyerAdministrator,role_OrganizationManager,role_SupplierDevelopmentManager";
        com.matrixone.apps.common.Person loginPerson = (com.matrixone.apps.common.Person) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PERSON);
        loginPerson.setId(com.matrixone.apps.common.Person.getPerson(context).getObjectId());
        StringList adminRolesList = FrameworkUtil.split(adminRoleList,",");
        StringList RolesList = FrameworkUtil.split(roleList,",");

        Iterator adminRolesItr = adminRolesList.iterator();
        Iterator rolesItr = RolesList.iterator();

        String role = "";
        String roleName = "";
        while (adminRolesItr.hasNext())
        {
            role = (String) adminRolesItr.next();
            roleName = PropertyUtil.getSchemaProperty(context,role);
            if(loginPerson.hasRole(context,roleName))
            {
                return Boolean.TRUE;
            }
        }

        //If private exchange environment and non-host company then add the host as supplier
        //String isSetupAsPublicExchange = EnoviaResourceBundle.getProperty(context,"emxQuoteCentral.isSetupAsPublicExchange");
        //boolean isPublicExchange = true;

        /*if(isSetupAsPublicExchange != null && isSetupAsPublicExchange.equalsIgnoreCase("false"))
        {
              isPublicExchange = false;
        }*/

        while (rolesItr.hasNext())
        {
            role = (String) rolesItr.next();
            roleName =  PropertyUtil.getSchemaProperty(context,role);

            if(loginPerson.hasRole(context,roleName))
            {
                return Boolean.TRUE;
            }
        }

        return Boolean.FALSE;

    }

    /**
     * This method return true if user have permissions on the command
     * otherwise return false.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds objectId and param values.
     * @return Boolean true if FCS is enabled and property set to true othewise return false.
     * @throws Exception If the operation fails.
     * @since EC 10-5.
     */
     public Boolean hasAccessToPotentialCustomers(Context context, String[] args)
         throws Exception
    {
        HashMap paramMap = (HashMap)JPO.unpackArgs(args);
        String adminRoleList = "";
        String roleList = "role_BuyerAdministrator";
        com.matrixone.apps.common.Person loginPerson = (com.matrixone.apps.common.Person) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PERSON);

        loginPerson.setId(com.matrixone.apps.common.Person.getPerson(context).getObjectId());

        String companyType = loginPerson.getCompany(context).getCompanyType(context);

        StringList adminRolesList = FrameworkUtil.split(adminRoleList,",");
        StringList RolesList = FrameworkUtil.split(roleList,",");

        Iterator adminRolesItr = adminRolesList.iterator();
        Iterator rolesItr = RolesList.iterator();

        String role = "";
        String roleName = "";
        while (adminRolesItr.hasNext())
        {
            role = (String) adminRolesItr.next();
            roleName = PropertyUtil.getSchemaProperty(context,role);
            if(loginPerson.hasRole(context,roleName))
            {
                return Boolean.TRUE;
            }
        }

        //If private exchange environment and non-host company then add the host as supplier
        String isSetupAsPublicExchange = EnoviaResourceBundle.getProperty(context,"emxSourcing.isSetupAsPublicExchange");
        boolean isPublicExchange = true;

        if(isSetupAsPublicExchange != null && isSetupAsPublicExchange.equalsIgnoreCase("false"))
        {
              isPublicExchange = false;
        }

        while (rolesItr.hasNext())
        {
            role = (String) rolesItr.next();
            roleName =  PropertyUtil.getSchemaProperty(context,role);

            if(loginPerson.hasRole(context,roleName) && !isPublicExchange && "Host".equals(companyType))
            {
                return Boolean.TRUE;
            }
        }

        return Boolean.FALSE;

    }

    /**
     * This method return true if user have permissions on the command
     * otherwise return false.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds objectId and param values.
     * @return Boolean true if FCS is enabled and property set to true othewise return false.
     * @throws Exception If the operation fails.
     * @since EC 10-5.
     */
     public Boolean hasAccessToCreateCompanies(Context context, String[] args)
         throws Exception
     {
    	 if(FrameworkUtil.isOnPremise(context)){
 			return PersonUtil.isVPLMAdminInHostCompany(context) || Boolean.valueOf(Company.isHostRep(context,Person.getPerson(context)));
    	 }
         return true;
     }

    /**
     * This method return true if user have permissions on the command
     * otherwise return false.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds objectId and param values.
     * @return Boolean true if FCS is enabled and property set to true othewise return false.
     * @throws Exception If the operation fails.
     * @since EC 10-5.
     */
     public Boolean hasAccessToDeleteCompanies(Context context, String[] args)
         throws Exception
     {
         return Boolean.valueOf(Company.isHostRep(context,Person.getPerson(context)));
     }

              /**
         * Gets All Companies list.
         *
         * @param context The Matrix Context.
         * @param
         * @return maplist of All Companies
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         public MapList getCompanies (Context context,String[] args) throws Exception
         {
           MapList mapList = new MapList();
           HashMap arguMap = (HashMap)JPO.unpackArgs(args);
           String type = (String)arguMap.get("type");
           String state = (String)arguMap.get("state");
           
		   String stateActive = FrameworkUtil.lookupStateName(context, DomainConstants.POLICY_ORGANIZATION, "state_Active");
		   String stateInactive = FrameworkUtil.lookupStateName(context, DomainConstants.POLICY_ORGANIZATION, "state_Inactive");
		  
           String objWhere = null;
		   if(UIUtil.isNotNullAndNotEmpty(state)){
			   if(state.equalsIgnoreCase(stateActive)){
				   objWhere = "current == '"+stateActive +"'";
			   }else if(state.equalsIgnoreCase(stateInactive)){
				   objWhere = "current == '"+stateInactive +"'";
			   }
		   }else{ //if no state is passed we'll fetch both Active and Inactive companies 
				   objWhere = "current == '"+stateActive+ "' || "+" current == '"+stateInactive + "'";
		   }
           
           try
           {
              StringList selectStmts = new StringList();
              selectStmts.addElement(DomainObject.SELECT_ID);
              selectStmts.addElement(DomainObject.SELECT_CURRENT);
              selectStmts.addElement(Organization.SELECT_WEB_SITE);
              selectStmts.addElement(Organization.SELECT_ORGANIZATION_PHONE_NUMBER);
              selectStmts.addElement(Company.SELECT_IS_SUPPLIER);
              selectStmts.addElement(Company.SELECT_IS_CUSTOMER);
              selectStmts.addElement(Company.SELECT_ATTRIBUTE_TITLE);
              boolean isHostRep  = Company.isHostRep(context,Person.getPerson(context));
              
			  if(isHostRep || PersonUtil.isVPLMAdminInHostCompany(context) || !FrameworkUtil.isOnPremise(context))
              {
                mapList = Company.getCompanies(context,DomainConstants.QUERY_WILDCARD,selectStmts,objWhere);
              }
              else
              {
                mapList = getMyCompanyAndSubsidiaries(context,args);
              }
              if(type!=null && type.equals(DomainConstants.TYPE_ROUTE_TEMPLATE) && !"".equals(type))
              {
              Iterator fieldsItr = mapList.iterator();
              HashMap curField = new HashMap();
              MapList objectList = new MapList();
              while(fieldsItr.hasNext()){
                  curField = (HashMap) fieldsItr.next();
                  curField.put("selection", "single");

                  objectList.add(curField);
              }
              return objectList;
              }
           }
           catch (FrameworkException Ex)
           {
              throw Ex;
           }
           return mapList;
         }

         /**
         * Gets All Active Companies list.
         *
         * @param context The Matrix Context.
         * @param
         * @return maplist of All Active Companies
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         @com.matrixone.apps.framework.ui.ProgramCallable
         public MapList getAllActiveCompanies (Context context,String[] args) throws Exception
         {
           MapList mapList = new MapList();
           try
           {
              String stateActive = FrameworkUtil.lookupStateName(context, DomainConstants.POLICY_ORGANIZATION, "state_Active");

              HashMap arguMap = (HashMap)JPO.unpackArgs(args);
              arguMap.put("state", stateActive );
              String [] newArgs = JPO.packArgs(arguMap);
              
              mapList = getCompanies(context,newArgs);
           
           }
           catch (FrameworkException Ex)
           {
              throw Ex;
           }
           return mapList;
         }

         /**
         * Gets All InActive Companies list.
         *
         * @param context The Matrix Context.
         * @param
         * @return maplist of All InActive Companies
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         @com.matrixone.apps.framework.ui.ProgramCallable
         public MapList getAllInActiveCompanies (Context context,String[] args) throws Exception
         {
           MapList mapList = new MapList();
           try
           {
              String stateInactive = FrameworkUtil.lookupStateName(context, DomainConstants.POLICY_ORGANIZATION, "state_Inactive");
				
 		      HashMap arguMap = (HashMap)JPO.unpackArgs(args);
              arguMap.put("state", stateInactive );
              String [] newArgs = JPO.packArgs(arguMap);

              mapList = getCompanies(context,args);
              
           }
           catch (FrameworkException Ex)
           {
              throw Ex;
           }
           return mapList;
         }

         /**
         * Get My Company.
         *
         * @param context The Matrix Context.
         * @param
         * @return maplist of My Company
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         @com.matrixone.apps.framework.ui.ProgramCallable
         public MapList getMyCompany (Context context,String[] args) throws Exception
         {
           MapList mapList = new MapList();

           StringList selectStmts = new StringList();
           selectStmts.addElement(DomainObject.SELECT_ID);
           selectStmts.addElement(DomainObject.SELECT_ATTRIBUTE_TITLE);
           selectStmts.addElement(DomainObject.SELECT_CURRENT);
           selectStmts.addElement(Organization.SELECT_ORGANIZATION_PHONE_NUMBER);
           selectStmts.addElement(Organization.SELECT_WEB_SITE);
           try
           {
              String companyId =  com.matrixone.apps.common.Person.getPerson(context).getCompanyId(context);
              Company companyObj = new Company(companyId);
              Map map = companyObj.getInfo(context,selectStmts);
              mapList.add(map);
           }
           catch (FrameworkException Ex)
           {
              throw Ex;
           }
           return mapList;
         }

         /**
         * Get My Company and Subsidiaries.
         *
         * @param context The Matrix Context.
         * @param
         * @return maplist of My Company and Subsidiaries
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         public MapList getMyCompanyAndSubsidiaries (Context context,String[] args) throws Exception
         {
           MapList mapList = new MapList();
           try
           {
              StringList selectStmts = new StringList();
              selectStmts.addElement(DomainObject.SELECT_ID);
              selectStmts.addElement(DomainObject.SELECT_CURRENT);
              selectStmts.addElement(Organization.SELECT_WEB_SITE);
              selectStmts.addElement(Organization.SELECT_ORGANIZATION_PHONE_NUMBER);
              selectStmts.addElement(Organization.SELECT_ATTRIBUTE_TITLE);
              String companyId =  com.matrixone.apps.common.Person.getPerson(context).getCompanyId(context);
              Company companyObj = new Company(companyId);
              Map map = companyObj.getInfo(context,selectStmts);
              mapList.add(map);
              MapList tempList = (MapList) companyObj.getSubsidiaries(context,selectStmts);
              if(tempList != null && tempList.size() > 0)
              {
                mapList.addAll(tempList);
              }
           }
           catch (FrameworkException Ex)
           {
              throw Ex;
           }
           return mapList;
         }

         /**
         * Get Active My Company and Subsidiaries.
         *
         * @param context The Matrix Context.
         * @param
         * @return maplist of Active My Company and Subsidiaries
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         @com.matrixone.apps.framework.ui.ProgramCallable
         public MapList getActiveMyCompanyAndSubsidiaries (Context context,String[] args) throws Exception
         {
           MapList mapList = new MapList();
           try
           {
              String stateActive = FrameworkUtil.lookupStateName(context, DomainConstants.POLICY_ORGANIZATION, "state_Active");

              MapList tempList = getMyCompanyAndSubsidiaries(context,args);

              int size = 0;
              Map tempMap = null;
              if(tempList != null && (size = tempList.size()) > 0)
              {
                for (int i = 0 ; i < size ; i++)
                {
                    tempMap = (Map)tempList.get(i);
                    if(stateActive.equals((String)tempMap.get(DomainObject.SELECT_CURRENT)))
                    {
                        mapList.add(tempMap);
                    }
                }
              }
           }
           catch (FrameworkException Ex)
           {
              throw Ex;
           }
           return mapList;
         }


         /**
         * Get Enable/Disable check box
         *
         * @param context The Matrix Context.
         * @param
         * @return Vector of true/false
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         public Vector getCheckBoxForCompanySummary (Context context,String[] args) throws Exception
         {
            Vector columnVals   = null;

            HashMap programMap  = (HashMap)JPO.unpackArgs(args);
            // getting the MapList of the objects.
            MapList objList     = (MapList)programMap.get("objectList");

            com.matrixone.apps.common.Person loginPerson = (com.matrixone.apps.common.Person) com.matrixone.apps.common.Person.getPerson(context);
            String companyId =  loginPerson.getCompanyId(context);

            int listSize = 0;
            Map map = null;
            String strObjectId = "";
            if(objList != null && (listSize = objList.size()) > 0 )
            {
                columnVals   = new Vector(listSize);
                for(int i = 0; i < listSize ; i++)
                {
                    map = (Map)objList.get(i);
                    strObjectId = (String)map.get(DomainObject.SELECT_ID);
                    if(companyId.equals(strObjectId) ) // Modified for Bug 354460
                    {
                        columnVals.add("false");
                    }
                    else
                    {
                        columnVals.add("true");
                    }
                }
            }
            return columnVals;
         }

// Added for Bug 354460
         /**
         * Get Enable/Disable check box
         *
         * @param context The Matrix Context.
         * @param
         * @return Boolean of true/false
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         public Boolean canDeleteOrDeactivateCompany (Context context,String[] args) throws Exception
         {
            String strObjectId = args[0];
            com.matrixone.apps.common.Person loginPerson = (com.matrixone.apps.common.Person) com.matrixone.apps.common.Person.getPerson(context);
            String companyId =  loginPerson.getCompanyId(context);

            boolean canDeleteOrDeactivate   = false;
            if(loginPerson.isRepresentativeFor(context,strObjectId) || companyId.equals(strObjectId) )
            {
                canDeleteOrDeactivate = false;
            }
            else
            {
                canDeleteOrDeactivate = true;
            }
            return Boolean.valueOf(canDeleteOrDeactivate);
         }

       /**
        * Gets the Suppliers for the Company.
        *
        * @param context The Matrix Context.
        * @param selectStmts The list of selects.
        * @return maplist of Suppliers
        * @throws FrameworkException If the operation fails.
        * @since Common 10.5.SP1
        */
        @com.matrixone.apps.framework.ui.ProgramCallable
        public MapList getSuppliers (Context context,String[] args)
            throws Exception
       {
          HashMap paramMap = (HashMap)JPO.unpackArgs(args);

          String objectId = (String) paramMap.get("objectId");
          MapList mapList = new MapList();

          try
          {
              Company companyObj = (Company)newInstance(context,TYPE_COMPANY);
              companyObj.setId(objectId);
              StringList selectStmts = new StringList(2);
              selectStmts.addElement(companyObj.SELECT_ID);
              selectStmts.addElement(companyObj.SELECT_NAME);
              selectStmts.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
              StringList relSelects = new StringList(2);
              relSelects.addElement(companyObj.SELECT_RELATIONSHIP_ID);

              mapList = companyObj.getSuppliers(context, selectStmts, relSelects, null, null);
          }
          catch (FrameworkException Ex)
          {
               throw Ex;
          }

         return mapList;

      }

       /**
        * Gets the Customers for the Company.
        *
        * @param context The Matrix Context.
        * @param selectStmts The list of selects.
        * @return maplist of Customers
        * @throws FrameworkException If the operation fails.
        * @since Common 10.5.SP1
        */
        @com.matrixone.apps.framework.ui.ProgramCallable
        public MapList getCustomers (Context context,String[] args)
            throws Exception
       {
          HashMap paramMap = (HashMap)JPO.unpackArgs(args);

          String objectId = (String) paramMap.get("objectId");
          MapList mapList = new MapList();

          try
          {
              Company companyObj = (Company)newInstance(context,TYPE_COMPANY);
              companyObj.setId(objectId);
              StringList selectStmts = new StringList(2);
              selectStmts.addElement(companyObj.SELECT_ID);
              selectStmts.addElement(companyObj.SELECT_NAME);
              selectStmts.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
              mapList = companyObj.getCustomers(context, selectStmts);
          }
          catch (FrameworkException Ex)
          {
               throw Ex;
          }

         return mapList;

      }

         /**
         * Gets Telephone Numbers ...
         * added for #295605 fix (internationalization issue)
         * @param context The Matrix Context.
         * @param
         * @return Vector of Telephone Numbers
         * @throws FrameworkException If the operation fails.
         * @since Common 10.5.Next
         */
         public Vector getTelephoneNumbers (Context context,String[] args) throws Exception
         {
            HashMap programMap = (HashMap)JPO.unpackArgs(args);
            MapList objList = (MapList)programMap.get("objectList");
            String sLanguage = (String)((HashMap)programMap.get("paramList")).get("languageStr");
            Object objPhone;
            String strPhone ;
            Vector phonesVector=new Vector();
            i18nNow loc = new i18nNow();

            // $<attribute[attribute_OrganizationPhoneNumber].value>
            for ( ListIterator objListIterator=objList.listIterator(); objListIterator.hasNext(); ) {
                Object obj=objListIterator.next();
                String objType=obj.getClass().getName();
                objPhone=null;
                if ("java.util.HashMap".equals(objType)) {
                    HashMap map=(HashMap)obj;
                    objPhone=map.get(Company.SELECT_ORGANIZATION_PHONE_NUMBER);
                }
                else if ("java.util.Hashtable".equals(objType)) {
                    Hashtable table=(Hashtable)obj;
                    objPhone=table.get(Company.SELECT_ORGANIZATION_PHONE_NUMBER);
                }
                if ( objPhone==null ) {
                    strPhone="";
                }
                else {
                    strPhone=((String)objPhone).trim();
                }
                if ( strPhone.length()==0 || "Unknown".equalsIgnoreCase(strPhone) || "0".equals(strPhone) ) {
                    strPhone=loc.GetString("emxFrameworkStringResource",sLanguage,"emxFramework.Default.Organization_Phone_Number");
                }
                phonesVector.add(strPhone);
            }
           return phonesVector;
         }
    public static void assignPersonToGroups(Context context, String[] args) throws Exception
    {
        try
        {
            String companyId = args[0];
            String personId = args[1];
            String ROLES_REQUIRED_GROUP_PER_COMPANY = EnoviaResourceBundle.getProperty(context,"emxComponents.rolesRequireGroupPerCompany");
            
            
            DebugUtil.debug("companyId = " + companyId);
            DebugUtil.debug("personId  = " + personId);
            DomainObject object = DomainObject.newInstance(context, personId);
            String personName = object.getInfo(context, SELECT_NAME);
            matrix.db.Person personObj = new matrix.db.Person(personName);
            personObj.open(context);
            UserItr userItr = new UserItr(personObj.getAssignments(context));
            StringList roleList = new StringList();
            while(userItr.next())
            {
                String sExistingRole = userItr.obj().getName();
                if( ROLES_REQUIRED_GROUP_PER_COMPANY.indexOf(sExistingRole) > -1 )
                {
                    roleList.add(sExistingRole);
                }
            }
            personObj.close(context);
            ComponentsUtil.assignPersonToGroups(context, companyId, personName, roleList);
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw ex;
        }

    }
    public static void removePersonFromGroups(Context context, String[] args) throws Exception
    {
        try
        {
            String companyId = args[0];
            String personId = args[1];
            String role="";
            String ROLES_REQUIRED_GROUP_PER_COMPANY = EnoviaResourceBundle.getProperty(context,"emxComponents.rolesRequireGroupPerCompany");
            
            DebugUtil.debug("companyId = " + companyId);
            DebugUtil.debug("personId  = " + personId);
            if( personId != null )
            {
              DomainObject object = DomainObject.newInstance(context, personId);
              String personName = object.getInfo(context, SELECT_NAME);
              matrix.db.Person personObj = new matrix.db.Person(personName);
              personObj.open(context);
              UserItr userItr = new UserItr(personObj.getAssignments(context));
              StringList roleList = new StringList();
              while(userItr.next())
              {
                  String sExistingRole = userItr.obj().getName();
                  if( ROLES_REQUIRED_GROUP_PER_COMPANY.indexOf(sExistingRole) > -1 )
                  {
                      roleList.add(sExistingRole);
                  }
                  if(sExistingRole.indexOf(personName)>-1 && sExistingRole.indexOf("Grant")>-1){
                	  role=sExistingRole;
                  }
              }
              personObj.close(context);
              ComponentsUtil.removePersonFromGroups(context, companyId, personName, roleList);
              // Remove Company associated Grant access
              if(UIUtil.isNotNullAndNotEmpty(role)) {
                  MqlUtil.mqlCommand(context,"modify person $1 remove  $2 $3 $4 ",true, personName,"assign","role",role);
              }
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw ex;
        }

    }
//till here
       /**
         * Gets Company type based on relationship.The Company Type column will have values as below:
         *   "Customer" for non host company connected to host with Customer relatioship.
         *   "Supplier" for non host company connected to host with Supplier relatioship.
         *   "Host" for the host company.
         *    "" do not show anything (or empty space) for non host company which are neither customer nor supplier.
         *
         * @param context The Matrix Context.
         * @param
         * @return maplist of  the company type
         * @throws Exception If the operation fails.
         * @since Common V11-0-0-0
         */
         public Vector getCompanyType (Context context,String[] args) throws Exception
         {
            Vector columnVals   = null;
            HashMap programMap  = (HashMap)JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) programMap.get("paramList");
            Locale strLocale =context.getLocale();
            // getting the MapList of the objects.
            MapList objList     = (MapList)programMap.get("objectList");
            int listSize = 0;
            Map map = null;
            String strObjectId = "";
            if(objList != null && (listSize = objList.size()) > 0 )
            {
                columnVals   = new Vector(listSize);
                Company companyObj =null;
                String hostId ="";
                String strKeyValue="";
                String relCustomer =PropertyUtil.getSchemaProperty(context, "relationship_Customer");
                for(int i = 0; i < listSize ; i++)
                {
                    strKeyValue="";
                    map = (Map)objList.get(i);
                    strObjectId = (String)map.get(DomainObject.SELECT_ID);
                    companyObj = new Company(strObjectId);
                    hostId = Company.getHostCompany(context);
                    //check for host company
                    if(hostId.equals(strObjectId))
                    {
                       strKeyValue=EnoviaResourceBundle.getProperty(context,"emxPersonOrgModelStringResource", strLocale,"emxComponents.Label.Host");
                       columnVals.add(strKeyValue);
                    }
                    else
                    {
                       //check for supplier company connected to host with Supplier relatioship
                       StringList supList = companyObj.getInfoList(context,"to["+RELATIONSHIP_SUPPLIER+"].from.id");
                       if(supList.size() >0)
                       {
                          strKeyValue=EnoviaResourceBundle.getProperty(context,"emxPersonOrgModelStringResource", strLocale,"emxComponents.Command.Supplier");
                          columnVals.add(strKeyValue);
                       }

                       //check for customer company  connected to host with Customer relatioship.
                       StringList custList = companyObj.getInfoList(context,"to["+relCustomer+"].from.id");
                       if(custList.size() >0)
                       {
                           //check if same company  connected to host Company with "Supplier" & "Customer" relatioships.
                           if(!"".equals(strKeyValue) && strKeyValue.length()>0 )
                           {
                              //Replaces the element at the specified position in this vector
                              columnVals.set(i,strKeyValue +" "+EnoviaResourceBundle.getProperty(context,"emxPersonOrgModelStringResource", strLocale,"emxComponents.Command.Customer"));
                           }
                           else
                           {
                               strKeyValue=EnoviaResourceBundle.getProperty(context,"emxPersonOrgModelStringResource", strLocale,"emxComponents.Command.Customer");
                               columnVals.add(strKeyValue);
                           }
                       }
                       else if(supList.size() <= 0)
                       {
                              // "" do not show anything (or empty space) for non host company which are neither customer nor supplier.
                              columnVals.add("");
                       }
                    }//end outer else
                }//end of for loop
            } //end of if
            return columnVals;
         }

       /**
        * Returns the list of active suppliers organization connected to host company
        *
        * @param context The Matrix Context.
        * @param
        * @return maplist of Suppliers
        * @throws FrameworkException If the operation fails.
        * @since Common V11-0-0-0
        */
         @com.matrixone.apps.framework.ui.ProgramCallable
         public MapList getHostCompanySuppliers (Context context,String[] args) throws Exception
          {
              String objectId = Company.getHostCompany(context);
              MapList mapList = new MapList();

              try
              {
                  String stateActive = FrameworkUtil.lookupStateName(context, DomainConstants.POLICY_ORGANIZATION, "state_Active");
                  Company companyObj = (Company)newInstance(context,TYPE_COMPANY);
                  companyObj.setId(objectId);
                  StringList selectStmts = new StringList(5);
                  selectStmts.addElement(companyObj.SELECT_ID);
                  selectStmts.addElement(companyObj.SELECT_ATTRIBUTE_TITLE);
                  selectStmts.addElement(companyObj.SELECT_NAME);
                  selectStmts.addElement(Organization.SELECT_ORGANIZATION_PHONE_NUMBER);
                  selectStmts.addElement(Organization.SELECT_WEB_SITE);
                  selectStmts.addElement(Organization.SELECT_CURRENT);
                  MapList tempList = companyObj.getSuppliers(context, selectStmts);

                  int size = 0;
                  Map tempMap = null;
                  //add the list of active suppliers organization
                  if(tempList != null && (size = tempList.size()) > 0)
                  {
                        for (int i = 0 ; i < size ; i++)
                        {
                                tempMap = (Map)tempList.get(i);
                                if(stateActive.equals((String)tempMap.get(DomainObject.SELECT_CURRENT)))
                                {
                                    mapList.add(tempMap);
                                }
                        }
                  }
              }
              catch (Exception Ex)
              {
                   throw Ex;
              }

              return mapList;
        }

       /**
        * Returns the list of active customers organization connected to host company
        *
        * @param context The Matrix Context.
        * @param
        * @return maplist of Suppliers
        * @throws FrameworkException If the operation fails.
        * @since Common V11-0-0-0
        */
        @com.matrixone.apps.framework.ui.ProgramCallable
        public MapList getHostCompanyCustomers (Context context,String[] args) throws Exception
        {
            String objectId = Company.getHostCompany(context);
            MapList mapList = new MapList();
            try
            {
                String stateActive = FrameworkUtil.lookupStateName(context, DomainConstants.POLICY_ORGANIZATION, "state_Active");
                Company companyObj = (Company)newInstance(context,TYPE_COMPANY);
                companyObj.setId(objectId);
                StringList selectStmts = new StringList(5);
                selectStmts.addElement(companyObj.SELECT_ID);
                selectStmts.addElement(companyObj.SELECT_ATTRIBUTE_TITLE);
                selectStmts.addElement(companyObj.SELECT_NAME);
                selectStmts.addElement(Organization.SELECT_ORGANIZATION_PHONE_NUMBER);
                selectStmts.addElement(Organization.SELECT_WEB_SITE);
                selectStmts.addElement(Organization.SELECT_CURRENT);

                String relCustomer =PropertyUtil.getSchemaProperty(context, "relationship_Customer");

                MapList tempList  = companyObj.getRelatedObjects( context,
                                                                                relCustomer, // relationship pattern
                                                                                TYPE_ORGANIZATION,     // object pattern
                                                                                selectStmts,         // object selects
                                                                                null,   // relationship selects
                                                                                false,                 // to direction
                                                                                true,                  // from direction
                                                                                (short) 1,             // recursion level
                                                                                null,           // object where clause
                                                                                null);    // relationship where clause
                 int size = 0;
                 Map tempMap = null;
                 //add the list of active customers organization
                 if(tempList != null && (size = tempList.size()) > 0)
                 {
                        for (int i = 0 ; i < size ; i++)
                        {
                                tempMap = (Map)tempList.get(i);
                                if(stateActive.equals((String)tempMap.get(DomainObject.SELECT_CURRENT)))
                                {
                                    mapList.add(tempMap);
                                }
                        }
                 }//end of if
            }
            catch (Exception Ex)
            {
                 throw Ex;
            }

            return mapList;
        }

    /**
     * Access method to show mandatory and non mandatory Cage Code fileds on company properties webform
     * mutually exclusive based on the property setting emxComponents.cageCode.Uniqueness and Required setting on the field.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     * @return boolean value
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public boolean isCageCodeRequired(Context context, String[] args)
            throws Exception {
        boolean bCageCodeRequired = false;
        try {
            String sCageCodeRequired = EnoviaResourceBundle
                    .getProperty(context,"emxComponents.cageCode.Uniqueness");
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map settings = (Map) programMap.get("SETTINGS");
            String strSetting = (String) settings.get("Required");
            // Show the Mandtory Cage Code field if property setting is true & Require setting on the field is true
            // Show the Non Mandatory Cage Code if property setting is false & Require setting on the field is false
            if (("true".equalsIgnoreCase(sCageCodeRequired) && "true"
                    .equals(strSetting))
                    || (!"true".equalsIgnoreCase(sCageCodeRequired) && !"true"
                            .equals(strSetting))) {
                bCageCodeRequired = true;
            }
        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return bCageCodeRequired;
    }

    /**
     * Checks the context person for Host rep Access fail
     *
     * @param context
     *            The Matrix Context.
     * @param args
     * @return Boolean false if person is host rep, true if Person is not host
     *         rep
     * @throws Exception
     *             If the operation fails.
     * @since V6R2009-1
     */
    public boolean isNotHostRep(Context context, String[] args)
            throws Exception {
    	if(FrameworkUtil.isOnPremise(context)){
        return (!isHostRep(context, args));
    	}else{
    		return false;
    	}
    }

    /**
     * Access Method for the Meeting fields in the company properties
     * returns true if the emxComponents.enableWebEx is true. Always
     * returns true when mode is view.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     * @return boolean value
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
	 
    public boolean isWebExEnabled(Context context, String[] args)
            throws Exception {
        boolean bWebExEnabled = false;
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            String sMode = (String) programMap.get("mode");

            String sEnableWebEx = EnoviaResourceBundle
                    .getProperty(context,"emxComponents.enableWebEx");

            if (!"edit".equals(sMode)) {
                bWebExEnabled = true;
            }

            if ("true".equalsIgnoreCase(sEnableWebEx)) {
                bWebExEnabled = true;
            }
        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return bWebExEnabled;
    }

    /**
     * This method returns HashMap Which contains range values for File Store.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     * @return HashMap contains actual and display values
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public HashMap getRangeValuesForFileStore(Context context, String[] args)
            throws Exception {
        HashMap rangeMap = new HashMap();
        try {
            StringList listChoices = new StringList();
            StringList listDispChoices = new StringList();
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) programMap.get("paramMap");
            String languageStr = (String) paramMap.get("languageStr");

            StoreList storeList = Store.getStores(context);
            Iterator storeListItr = storeList.iterator();
            String sStoreName = "";
            String sSYMStoreName = "";

            while (storeListItr.hasNext()) {
                sStoreName = ((Store) storeListItr.next()).getName();
                sSYMStoreName = i18nNow.getAdminI18NString("Store", sStoreName,
                        languageStr);
                listDispChoices.add(sSYMStoreName);
                sSYMStoreName = FrameworkUtil.getAliasForAdmin(context,
                        "Store", sStoreName, true);
                if (sSYMStoreName == null) {
                    sSYMStoreName = sStoreName;
                }
                listChoices.add(sSYMStoreName);
            }

            listChoices.add("");
            listDispChoices.add("");

            rangeMap.put("field_choices", listChoices);
            rangeMap.put("field_display_choices", listDispChoices);

        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return rangeMap;
    }

    /**
     * This method returns the given attribute value of the company. Returns the
     * i18n value if its value is Unknown. Attribute name will be taken from Sym
     * Name setting.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            contains objectId
     * @return StringList
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public StringList getI18NAttributeDefaultValue(Context context,
            String[] args) throws Exception {
        StringList attrValueList = new StringList();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            Map fieldMap = (Map) programMap.get("fieldMap");
            Map settings = (Map) fieldMap.get("settings");
            String sAttrSymName = (String) settings.get("Sym Name");
            Locale strLocale = context.getLocale();

            String objectId = (String) paramMap.get("objectId");

            DomainObject objComp = new DomainObject(objectId);
            String attrName = PropertyUtil.getSchemaProperty(context,
                    sAttrSymName);
            String strAttrValue = objComp.getInfo(context, "attribute["
                    + attrName + "]");

            if ("Unknown".equals(strAttrValue)) {
              String strAttrName = FrameworkUtil.findAndReplace(attrName, " ", "_");
                String sKey = "emxFramework.Default."
                        + strAttrName;
                strAttrValue = EnoviaResourceBundle.getProperty(context,
                        "emxFrameworkStringResource", strLocale,sKey);
            }

            attrValueList.add(strAttrValue);

        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return attrValueList;
    }

    /**
     * This method returns the given File Store value of the company.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            contains objectID
     * @return StringList
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public StringList getValueForFileStore(Context context, String[] args)
            throws Exception {
        StringList attrValueList = new StringList();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            String languageStr = (String) paramMap.get("languageStr");

            String objectId = (String) paramMap.get("objectId");

            DomainObject objComp = new DomainObject(objectId);
            String attrName = PropertyUtil.getSchemaProperty(context,
                    SYMBOLIC_attribute_FileStoreSymbolicName);
            String strAttrValue = objComp.getInfo(context, "attribute["
                    + attrName + "]");
            strAttrValue = PropertyUtil
                    .getSchemaProperty(context, strAttrValue);
            if (strAttrValue == null) {
                strAttrValue = "";
            } else {
                strAttrValue = i18nNow.getAdminI18NString("Store",
                        strAttrValue, languageStr);
            }

            attrValueList.add(strAttrValue);

        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return attrValueList;
    }

    /**
     * This method returns secondary vaults of the company.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            contains objectID
     * @return String
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public String getValueForSecondaryVaults(Context context, String[] args)
            throws Exception {
        String sSecondaryVaults = "";
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap requestMap = (HashMap) programMap.get("requestMap");
            Map paramMap = (Map) programMap.get("paramMap");
            Map fieldMap = (Map) programMap.get("fieldMap");

            String sFieldName = (String) fieldMap.get("name");
            String objectId = (String) paramMap.get("objectId");
            String sMode = (String) requestMap.get("mode");
            String languageStr = (String) paramMap.get("languageStr");

            Company companyObj = (Company) DomainObject.newInstance(context,
                    objectId);
            companyObj.open(context);
            sSecondaryVaults = companyObj.getSecondaryVaults(context);
            if (sSecondaryVaults == null) {
                sSecondaryVaults = "";
            }
            companyObj.close(context);

            StringBuffer sVaultName = new StringBuffer(100);

            StringList secVaultList = FrameworkUtil
                    .split(sSecondaryVaults, ",");

            Iterator itr = secVaultList.iterator();
            String secondaryVaultName = null;

            while (itr.hasNext()) {
                secondaryVaultName = (String) itr.next();
                sVaultName.append(i18nNow.getAdminI18NString("Vault",
                        secondaryVaultName, languageStr));
                sVaultName.append(STRING_COMMA);
            }

            if (sVaultName.length() > 0) {
                sVaultName.deleteCharAt(sVaultName.length() - 1);
            }

            String actualSecondaryVaults = sSecondaryVaults;
            sSecondaryVaults = sVaultName.toString();

            if ("edit".equals(sMode)) {
                sVaultName = new StringBuffer(150);

                sVaultName.append("<textarea name=\"");
                sVaultName.append(sFieldName);
                sVaultName
                        .append("Display\" cols=\"25\" rows=\"5\" wrap READONLY>");
                sVaultName.append(sSecondaryVaults);
                sVaultName
                        .append("</textarea><input type=\"button\" name=\"\" id=\"\" value=\"...\" onClick=\"javascript:showSecondaryVaultsSelector('");
                sVaultName.append(objectId);
                sVaultName.append("')\"");
                if (!Company.isHostRep(context,
                        com.matrixone.apps.common.Person.getPerson(context))) {
                    sVaultName.append("disabled");
                }
                sVaultName
                        .append("/>&nbsp;&nbsp;<input type=\"hidden\" name=\"");
                sVaultName.append(sFieldName);
                sVaultName.append("\" value=\"");
                sVaultName.append(XSSUtil.encodeForHTMLAttribute(context,actualSecondaryVaults));
                sVaultName.append(STRING_DOUBLE_QUOTE);
                sSecondaryVaults = sVaultName.toString();
            }

        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return sSecondaryVaults;
    }

    /**
     * This method returns primary vault of the company and hidden variable.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            contains objectID
     * @return boolean value
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public String getValueForPrimaryVaults(Context context, String[] args)
            throws Exception {
        StringBuffer bufVaults = new StringBuffer(55);
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            String objectId = (String) paramMap.get("objectId");

            Company companyObj = (Company) DomainObject.newInstance(context,
                    objectId);
            String vault = companyObj.getInfo(context, "vault");
            String languageStr = (String) paramMap.get("languageStr");
            bufVaults.append(i18nNow.getAdminI18NString("Vault", vault,
                    languageStr));
            bufVaults
                    .append("<input type=\"hidden\" name=\"vaultPrime\" value=\"");
            bufVaults.append(XSSUtil.encodeForHTMLAttribute(context,vault));
            bufVaults.append("\"/>");

        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return bufVaults.toString();
    }

    /**
     * This method returns website utl with hyperlink
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            contains objectID
     * @return String value
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public String formatSiteURL(Context context, String[] args)
            throws Exception {
        StringBuffer strWebSiteHref = new StringBuffer(100);
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            HashMap requestMap = (HashMap) programMap.get("requestMap");
            Map fieldMap = (Map) programMap.get("fieldMap");

            String objectId = (String) paramMap.get("objectId");
            String printerFriendly = (String) requestMap.get("PFmode");
            String sMode = (String) requestMap.get("mode");
            String sFieldName = (String) fieldMap.get("name");
            Locale strLocale =context.getLocale();

            boolean isPrinterFriendly = false;
            if ("true".equalsIgnoreCase(printerFriendly)) {
                isPrinterFriendly = true;
            }

            String sTypeBU = PropertyUtil.getSchemaProperty(context,
                     SYMBOLIC_type_BusinessUnit);
            DomainObject objComp = new DomainObject(objectId);
            String attrWebSite = PropertyUtil.getSchemaProperty(context,
                    SYMBOLIC_attribute_WebSite);
            attrWebSite = "attribute[" + attrWebSite + "]";
            String strWebSite = objComp.getInfo(context, attrWebSite);
            //strWebSite=XSSUtil.encodeForHTMLAttribute(context, strWebSite);
            if (strWebSite == null) {
                strWebSite = "";
            }
            String i18nWebSite = strWebSite;
            if ("Unknown".equals(strWebSite)) {
                i18nWebSite = EnoviaResourceBundle.getProperty(context,
                        "emxFrameworkStringResource", strLocale,"emxFramework.Default.Web_Site");
            }

            if ("edit".equals(sMode)) {
                strWebSiteHref.append("<input type=\"text\" name=\"");
                strWebSiteHref.append(sFieldName);
                strWebSiteHref.append("\" value=\"");
                strWebSiteHref.append(i18nWebSite);
                strWebSiteHref.append("\" size=\"40\">");
            } else {
                String strWebSiteTemp = strWebSite.toLowerCase();
                String hrefWebsite = strWebSite;
                if ((strWebSiteTemp.startsWith("http://")
                        || strWebSiteTemp.startsWith("https://")) && !objComp.isKindOf(context, sTypeBU)) {
                    strWebSite = strWebSite.substring(7);
                    i18nWebSite = strWebSite;
                    if (strWebSite.charAt(0) == '/') {
                        strWebSite = strWebSite.substring(1);
                    }
                } else {
                    if (!(strWebSiteTemp.startsWith("http://")
                        || strWebSiteTemp.startsWith("https://"))){
                         hrefWebsite = "http://" + strWebSite;
                    }
                }
                if (isPrinterFriendly) {
                    strWebSiteHref.append(XSSUtil.encodeForHTML(context,i18nWebSite));
                    strWebSiteHref.append("&nbsp");
                } else {
                    strWebSiteHref.append("<a target=\"_blank\" href=\"");
                    strWebSiteHref.append(XSSUtil.encodeForHTMLAttribute(context, hrefWebsite));
                    strWebSiteHref.append("\">");
                    strWebSiteHref.append(XSSUtil.encodeForHTML(context, i18nWebSite));
                    strWebSiteHref.append("</a>&nbsp");
                }
            }
        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return strWebSiteHref.toString();
    }

    /**
     * This method connects or disconnects the selected parent company
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            contains New OID, Old OID and objectID
     * @returns void
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public void updateParentCompany(Context context, String[] args)
            throws Exception {
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            String parentId = (String) paramMap.get("New OID");
            String oldParentId = (String) paramMap.get("Old OID");
            String objectId = (String) paramMap.get("objectId");

            if (!parentId.equals(oldParentId)) {
                String relSubsidiary = PropertyUtil.getSchemaProperty(context,
                        SYMBOLIC_relationship_Subsidiary);
                Company boParentCompany = (Company) newInstance(context,
                        DomainConstants.TYPE_COMPANY);
                Company company = (Company) newInstance(context,
                        DomainConstants.TYPE_COMPANY);
                company.setId(objectId);

                if (oldParentId != null && !"".equals(oldParentId)) {
                    boParentCompany.setId(oldParentId);
                    company.disconnect(context, new RelationshipType(
                            relSubsidiary), false, boParentCompany);
                }

                if (parentId != null && !"".equals(parentId)) {
                    company.addRelatedObject(context, new RelationshipType(
                            relSubsidiary), true, parentId);
                }
                company.update(context);
            }
        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
    }

    /**
     * This method updates attribute value of the company. Attribute name will
     * be taken from setting Sym Name
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            contains New value and objectID
     * @returns void
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public void updateI18NAttributeDefaultValue(Context context, String[] args)
            throws Exception {
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            String sNewValue = (String) paramMap.get("New Value");
            String objectId = (String) paramMap.get("objectId");

            Map fieldMap = (Map) programMap.get("fieldMap");
            Map settings = (Map) fieldMap.get("settings");
            String sAttrSymName = (String) settings.get("Sym Name");

            DomainObject objComp = new DomainObject(objectId);
            String attrName = PropertyUtil.getSchemaProperty(context,
                    sAttrSymName);
            objComp.setAttributeValue(context, attrName, sNewValue);

        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
    }

    /**
     * This method udpates the file store.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     * @returns void
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public void updateFileStore(Context context, String[] args)
            throws Exception {
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            String sFileStore = (String) paramMap.get("New Value");
            String objectId = (String) paramMap.get("objectId");
            Company company = (Company) DomainObject.newInstance(context,
                    objectId);
            String attrName = PropertyUtil.getSchemaProperty(context,
                    SYMBOLIC_attribute_FileStoreSymbolicName);
            if (!sFileStore.startsWith("store_") && !"".equals(sFileStore)) {
                PropertyUtil.setRPEValue(context, "FileStore", sFileStore,
                        false);
                // This is a bug. Should retain the original value.
                sFileStore = "";
            }
            company.setAttributeValue(context, attrName, sFileStore);
        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
    }

    /**
     * This method updates the secondary vaults.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     * @returns void
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    public void updateSecondaryVaults(Context context, String[] args)
            throws Exception {
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            String sSecondaryVaults = (String) paramMap.get("New Value");
            String objectId = (String) paramMap.get("objectId");
            Company company = (Company) DomainObject.newInstance(context,
                    objectId);
            String attrSecondaryVaults = PropertyUtil.getSchemaProperty(
                    context, SYMBOLIC_attribute_SecondaryVaults);

            String sVault = "";
            String strVaultName = "";
            StringItr vaultItr = new StringItr(FrameworkUtil.split(
                    sSecondaryVaults, ","));
            StringList secondaryVaultList = new StringList();
            StringBuffer bufSecVaults = new StringBuffer();

            while (vaultItr.next()) {
                strVaultName = (String) vaultItr.obj();
                sVault = FrameworkUtil.getAliasForAdmin(context, "vault",
                        strVaultName, true);

        //Bug 306725 Fix Start
                if (sVault == null || "".equals(sVault))
                {
                    sVault = FrameworkUtil.getAliasForAdmin(context, "vault",
                        strVaultName, false);
                }
        //Bug 306725 Fix End

                if (sVault == null || "".equals(sVault)) {
                    if (bufSecVaults.length() > 0) {
                        bufSecVaults.append(", ");
                    }
                    bufSecVaults.append(strVaultName);

                } else {
                    secondaryVaultList.add(sVault);
                }
            }

            // This for validation purpose in post process jpo used in edit company form
            if (bufSecVaults.length() > 0) {
                PropertyUtil.setRPEValue(context, "SecondaryVaults",
                        bufSecVaults.toString(), true);
            }

            sVault = FrameworkUtil.join(secondaryVaultList, "~");
            company.setAttributeValue(context, attrSecondaryVaults, sVault);
        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
    }

    /**
     * This is postProcessJPO method. It validates the unique ness of Ord ID ,
     * Cage Cage and Company Name. And also validates File store and secondary
     * vaults.
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param args
     *            contains objectID and field values
     * @return HashMap
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public HashMap validateUniqueness(Context context, String[] args)
            throws Exception {
        HashMap actionMap = new HashMap();
        boolean bContinueProcess = true;
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            String businessUnitId = (String)paramMap.get("BusinessUnit ID");
            boolean isBU = (businessUnitId!=null?true:false);

            bContinueProcess = validateCageCodeAndOrgID(context, paramMap,
                    actionMap, false);
            if (bContinueProcess) {
                String isUniqueCageCode = EnoviaResourceBundle
                        .getProperty(context,"emxComponents.cageCode.Uniqueness");
                if ("true".equalsIgnoreCase(isUniqueCageCode)) {
                    bContinueProcess = validateCageCodeAndOrgID(context,
                            paramMap, actionMap, true);
                }
                if (bContinueProcess) {
                    bContinueProcess = validateCompanyName(context, paramMap,
                            actionMap);
                }

                if (bContinueProcess && !isBU) {
                    bContinueProcess = validateStoreAndVault(context, paramMap,
                            actionMap, "FileStore");
                }
                if (bContinueProcess && !isBU) {
                    bContinueProcess = validateStoreAndVault(context, paramMap,
                            actionMap, "SecondaryVaults");
                }
                if (bContinueProcess) {
                    actionMap.put("Action", "continue");
                }
            }

        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return actionMap;
    }

    /**
     * This method validates the uniqueness of Organization ID and Cage Code
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param paramMap
     *            contains objectID and field values
     * @param actionMap
     *            is the actionMap of post process JPO
     * @param bCageCode
     *            true-for cage code attribute, false - Org ID
     * @return boolean
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    private boolean validateCageCodeAndOrgID(Context context, Map paramMap,
            HashMap actionMap, boolean bCageCode) throws Exception {
        boolean bIsValidID = true;
        try {
            String languageStr = (String) paramMap.get("languageStr");
            StringBuffer bufMessage = new StringBuffer(100);

            MapList orgList = new MapList();
            String relDivision  = PropertyUtil.getSchemaProperty(context, "relationship_Division");

            boolean bCompanyId = false;
            boolean bBUId = false;
            String objectId = (String) paramMap.get("objectId");

            String sOrdId = (String) paramMap.get("Subsidiary ID");
            if (sOrdId == null) {
                sOrdId = (String) paramMap.get("Company ID");
                bCompanyId = true;
            }
            if (sOrdId == null) {
                sOrdId = (String) paramMap.get("BusinessUnit ID");
                bCompanyId = false;
                bBUId = true;
            }
            String sCageCode = (String) paramMap.get("Cage Code2");
            if (sCageCode == null) {
                sCageCode = (String) paramMap.get("Cage Code1");
            }
            String attrName = "";
            if (bCageCode) {
                attrName = PropertyUtil.getSchemaProperty(context,
                        SYMBOLIC_attribute_CageCode);
            } else {
                attrName = PropertyUtil.getSchemaProperty(context,
                        SYMBOLIC_attribute_OrganizationID);
            }

            String attrValue = bCageCode ? sCageCode : sOrdId;
            String sType = PropertyUtil.getSchemaProperty(context,
                    SYMBOLIC_type_Company);
            if(bBUId){
                    sType = PropertyUtil.getSchemaProperty(context,
                     SYMBOLIC_type_BusinessUnit);
            }

            StringList strlistObjectSelect = new StringList(1);
            strlistObjectSelect.addElement(DomainObject.SELECT_ID);

            String whereStr = DomainObject.getAttributeSelect(attrName)
                    + " == \"" + attrValue + "\" && id !=" + objectId;

            if(!bBUId){
                orgList = DomainObject.findObjects(context, sType, "*",
                    whereStr, strlistObjectSelect);
            }else{

                DomainObject domObject =  DomainObject.newInstance(context, objectId);
                String parentCompanyId = domObject.getInfo(context,"to["+relDivision+"].from.id");
                DomainObject BUCompany = new DomainObject(parentCompanyId);

                StringList relationshipSelects = new StringList(1);
                relationshipSelects.addElement(DomainRelationship.SELECT_ID);

                orgList = BUCompany.getRelatedObjects(context, relDivision, sType, strlistObjectSelect, relationshipSelects, false, true, (short)1, whereStr, "");
            }

            int orgCount = orgList.size();

            if (orgCount > 0) {
                if (bCageCode) {
                    bufMessage
                            .append(EnoviaResourceBundle
                                    .getProperty(context,
                                            "emxPersonOrgModelStringResource",
											 context.getLocale(),
                                            "emxComponents.CreateOrEditCompany.CageCodeAlreadyExists"));
                } else {
                    if (bCompanyId) {
                        bufMessage
                                .append(EnoviaResourceBundle
                                		.getProperty(context,
                                                "emxPersonOrgModelStringResource",
   											     context.getLocale(),
                                                "emxComponents.CreateOrEditCompany.CompanyIdAlreadyExists"));
                    } else if (bBUId) {
                        bufMessage
                                .append(EnoviaResourceBundle
                                		.getProperty(context,
                                                "emxPersonOrgModelStringResource",
   											     context.getLocale(),
                                                "emxComponents.CreateOrEditOrganization.OrganizationIdAlreadyExists"));
                    } else {
                        bufMessage
                                .append(EnoviaResourceBundle
                                		.getProperty(context,
                                                "emxPersonOrgModelStringResource",
   											     context.getLocale(),
                                                "emxComponents.CreateOrEditCompany.SubsidiaryIdAlreadyExists"));
                    }

                }
                if(bCageCode || UIUtil.isNotNullAndNotEmpty(bufMessage.toString()))
                {
                  actionMap.put("Message", bufMessage.toString());
                }
                actionMap.put("Action", "stop");
                bIsValidID = false;
            }
        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return bIsValidID;
    }

    /**
     * This method validates the uniqueness Company Name
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param paramMap
     *            contains objectID and field values
     * @param actionMap
     *            is the actionMap of post process JPO
     * @return boolean
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    private boolean validateCompanyName(Context context, Map paramMap,
            HashMap actionMap) throws Exception {
        boolean bValidName = true;
        try {
            String languageStr = (String) paramMap.get("languageStr");
            String objectId = (String) paramMap.get("objectId");
            boolean bBUId = false;
            String relDivision  = PropertyUtil.getSchemaProperty(context, "relationship_Division");

            String sCompNewName = (String) paramMap.get("Name1");
            if (sCompNewName == null) {
                sCompNewName = (String) paramMap.get("Name2");
            }

            /*
              do not validate if new name is null i.e. the field is not editable in ui
            */
            if (sCompNewName != null && !"".equals(sCompNewName) && !"null".equals(sCompNewName))
            {
                StringList objectSelects = new StringList(3);
                objectSelects.addElement(DomainObject.SELECT_ID);
                objectSelects.addElement(DomainObject.SELECT_NAME);
                objectSelects.addElement(DomainObject.SELECT_ATTRIBUTE_TITLE);
                objectSelects.addElement("to["+relDivision+"].from.id");

                StringBuffer bufMessage = new StringBuffer(100);
                DomainObject domObj = DomainObject.newInstance(context,
                        objectId);

                Map domInfo = domObj.getInfo(context,objectSelects);
                String sCompName = (String)domInfo.get(DomainObject.SELECT_ATTRIBUTE_TITLE);
                
                String parentCompanyId = (String) domInfo.get("to["+relDivision+"].from.id");
                if(parentCompanyId!=null && !"".equals(parentCompanyId)){
                    bBUId = true;
                }

                if(bBUId)
                {
                   String whereStr = DomainConstants.SELECT_ATTRIBUTE_TITLE+" == \""+sCompNewName+"\" && id !="+objectId;
                   StringList relationshipSelects = new StringList(1);
                   relationshipSelects.addElement(DomainRelationship.SELECT_ID);

                   DomainObject buCompany = new DomainObject(parentCompanyId);

                   String sType = PropertyUtil.getSchemaProperty(context,
                                       SYMBOLIC_type_BusinessUnit);

                   MapList buList = buCompany.getRelatedObjects(context, relDivision, sType, objectSelects, relationshipSelects, false, true, (short)1, whereStr, "");
                   if(buList.size()>0){
                    bufMessage
                            .append(i18nNow
                                    .getI18nString(
                                            "emxComponents.BusinessUnit.BusinessAlreadyExists",
                                            "emxPersonOrgModelStringResource",
                                            languageStr));
                    actionMap.put("Message", bufMessage.toString());
                    actionMap.put("Action", "stop");
                    bValidName = false;
                   }
                }
                else if (!sCompNewName.equals(sCompName))
                {
                	String whereClause= "property[Title].value==\""+sCompNewName+"\"";
                    String strCmd = "list user $1 where $2";
                    String strResult = MqlUtil.mqlCommand(context, strCmd, true, QUERY_WILDCARD, whereClause);
                    
                    if (!"".equals(strResult)) {
                        bufMessage
                                .append(i18nNow
                                        .getI18nString(
                                                "emxComponents.CreateOrEditCompany.CompanyNameAlreadyExists1",
                                                "emxPersonOrgModelStringResource",
                                                languageStr));
                        bufMessage.append(sCompNewName);
                        bufMessage
                                .append(i18nNow
                                        .getI18nString(
                                                "emxComponents.CreateOrEditCompany.CompanyNameAlreadyExists2",
                                                "emxPersonOrgModelStringResource",
                                                languageStr));
                        actionMap.put("Message", bufMessage.toString());
                        actionMap.put("Action", "stop");
                        bValidName = false;
                    }
                }
           }
        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return bValidName;
    }

    /**
     * This method validates File Store and Secondary valuts
     *
     * @param context
     *            the eMatrix <code>Context</code> object
     * @param paramMap
     *            contains objectID and field values
     * @param actionMap
     *            is the actionMap of post process JPO
     * @return boolean
     * @throws Exception
     *             if the operation fails
     * @since V6R2009-1
     */
    private boolean validateStoreAndVault(Context context, Map paramMap,
            HashMap actionMap, String sRPEKey) throws Exception {
        boolean bValidStoreAndVault = true;
        try {
            StringBuffer strBufMessage = new StringBuffer(50);
            String languageStr = (String) paramMap.get("languageStr");
            Locale strLocale = context.getLocale();
            String sError = PropertyUtil.getRPEValue(context, sRPEKey, false);
            if (sError != null && !"".equals(sError)) {
                if ("SecondaryVaults".equals(sRPEKey)) {
                    strBufMessage.append(EnoviaResourceBundle.getProperty(context,
                            "emxPersonOrgModelStringResource", strLocale,"emxComponents.CompanyEdit.SecondaryVaultMessage1"));
                    strBufMessage.append(" '");
                    strBufMessage.append(sError);
                    strBufMessage.append("' ");
                    strBufMessage.append(EnoviaResourceBundle.getProperty(context,
                            "emxPersonOrgModelStringResource", strLocale,"emxComponents.CompanyEdit.SecondaryVaultMessage2"));

                } else {
                    strBufMessage.append(EnoviaResourceBundle.getProperty(context,
                            "emxPersonOrgModelStringResource", strLocale,"emxComponents.CompanyEdit.StoreMessage1"));
                    strBufMessage.append(" '");
                    strBufMessage.append(sError);
                    strBufMessage.append("' ");
                    strBufMessage.append(EnoviaResourceBundle.getProperty(context,
                            "emxPersonOrgModelStringResource", strLocale,
                            "emxComponents.CompanyEdit.StoreMessage2"));
                }
                actionMap.put("Message", strBufMessage.toString());
                actionMap.put("Action", "continue");
                bValidStoreAndVault = false;
            }

        } catch (Exception e) {
            throw new FrameworkException(e.toString());
        }
        return bValidStoreAndVault;
    }

    /**
    * Gets Supplier Type
    * @param context The Matrix Context.
    * @param
    * @return Vector of Supplier Types
    * @throws FrameworkException If the operation fails.
    * @since Common V6R2008-2.0
    */
    public Vector getSupplierType(Context context,String[] args) throws Exception
    {
        HashMap programMap = (HashMap)JPO.unpackArgs(args);
        MapList objList     = (MapList)programMap.get("objectList");

        com.matrixone.apps.common.Person loginPerson = (com.matrixone.apps.common.Person) com.matrixone.apps.common.Person.getPerson(context);
        String companyId =  loginPerson.getCompanyId(context);

        String []objIdArray=new String[objList.size()];
        int listSize =objList.size();
        Vector columnVals = null;
        Map map=null;
        if(objList != null && listSize  > 0 )
        {
          columnVals = new Vector(listSize );;

          for(int i = 0; i < listSize ; i++)
          {
            map = (Map)objList.get(i);
            objIdArray[i]=(String)map.get(SELECT_ID);
          }
        }

        String busSelect = "to[" + RELATIONSHIP_SUPPLIER + "|from.id=='" + companyId + "'].attribute[" + ATTRIBUTE_SUPPLIER_TYPE + "]";
        String select = "to[" + RELATIONSHIP_SUPPLIER + "].attribute[" + ATTRIBUTE_SUPPLIER_TYPE + "]";
        StringList busSel1=new StringList(1);
        busSel1.add(busSelect);

        MapList mList = DomainObject.getInfo(context,objIdArray,busSel1);
        Iterator iter=mList.iterator();
        while(iter.hasNext())
        {
          map=(Map)iter.next();
          columnVals.add(EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(), "emxFramework.Range.Supplier_Type."+(String)map.get(select)));
        }
        return columnVals;
    }

    /**
     * generate and set Company ID on Object Creation.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - Object Id of the newly created object
     * @returns nothing
     * @throws Exception if the operation fails
     * @since Common 10.0.0.0
     */
    public static void generateAndSetCompanyID(Context context, String[] args) throws Exception
    {
        try{

            String oid = args[0];
            String attrOrganizationID = PropertyUtil.getSchemaProperty(context, SYMBOLIC_attribute_OrganizationID);
            DomainObject obj = newInstance(context, oid);
            String key = obj.getInfo(context,DomainConstants.SELECT_PRIMARY_KEY);
            if( key != null )
            {
                obj.setAttributeValue(context,attrOrganizationID,key);
            } else {
                obj.setAttributeValue(context,attrOrganizationID,obj.getUniqueName("0"));
            }
        } catch(Exception ex)
        {
            ex.printStackTrace();
            throw ex;
        }
    }
    public static int checkForCompanyIDUniqueness(Context context, String[] args) throws Exception
    {
            String oid = args[0];
            String newValue = args[1];
            DomainObject obj = newInstance(context, oid);
            String typeCompany = PropertyUtil.getSchemaProperty(context, "type_Company");
            String type = obj.getInfo(context,DomainConstants.SELECT_TYPE);
            if( typeCompany.equals(type) )
            {
                matrix.db.Query query = new matrix.db.Query();
                query.open(context);
            	query.setBusinessObjectType(typeCompany);
                query.setBusinessObjectRevision("*");
                query.setBusinessObjectName("*");
                query.setVaultPattern("*");
                query.setOwnerPattern("*");
                query.setWhereExpression("id != "+ oid + " && " +DomainObject.getAttributeSelect(PropertyUtil.getSchemaProperty(context, "attribute_OrganizationID")) + " == \""+newValue+"\"");
                BusinessObjectList boList1 = query.evaluate(context);
                query.close(context);
                int countCompanyId = boList1.size();
                String strMessage = "";
                String languageStr = "";
            	if(countCompanyId > 0 ) {
                    strMessage = EnoviaResourceBundle.getProperty(context,"emxPersonOrgModelStringResource",context.getLocale(), "emxComponents.CreateOrEditCompany.CompanyIdAlreadyExists");
                    emxContextUtil_mxJPO.mqlNotice(context, strMessage);
                	return 1;
                }
            }
            return 0;
    }
    private boolean hasAdminUserRole(Context context, String compNewName) throws Exception {
        //This query will return empty string if there is no role with this name or the role is not Project or Org type.
        String strResult = MqlUtil.mqlCommand(context, "list role $1 where $2", true, compNewName, "isanorg");
        return compNewName.equals(strResult);
    }

   /**
     * This method will be invoked on post editing the company details.
     * This method will check for uniqueness of the fields and also updates schema property cache.
     * If host company name is changed system need to update the schema property 'role_CompanyName'
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public HashMap companyEditPostProcess(Context context, String[] args) throws Exception
    {

        HashMap actionMap = validateUniqueness(context, args);
        //<Fix for 374428>
        /**
         * Reload PropertyUtil schemaProperty Cache
         * If the Company Name is changed and it has corresponding role attached.
         * we need to update this in schema property 'role_CompanyName'
         */
        if("continue".equals(actionMap.get("Action"))){
            HashMap hashMap = (HashMap)JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) hashMap.get("paramMap");
            String companyID = (String)paramMap.get("objectId");
            String attrOrganizationName = PropertyUtil.getSchemaProperty(context, SYMBOLIC_attribute_OrganizationName);
            String attrTitle  = PropertyUtil.getSchemaProperty(context, "attribute_Title");
            String companyNameFieldName = paramMap.get("Name1") != null ? "Name1" : "Name2";

            String  sCompNewName =  (String) paramMap.get(companyNameFieldName);
            boolean isCompanyNameChanged = false;
            MapList fields = (MapList) ((HashMap) hashMap.get("formMap")).get("fields");
            for (Iterator iter = fields.iterator(); iter.hasNext();) {
                Map field = (Map) iter.next();
                if(companyNameFieldName.equals(field.get("name"))) {
                    StringList values =  (StringList) field.get("field_value");
                    if(values != null && values.size() == 1) {
                        isCompanyNameChanged = !values.get(0).equals(sCompNewName);
                    }
                    break;
                    
                }
            }
              	DomainObject obj = newInstance(context, companyID);

            try {
                if (isCompanyNameChanged && hasAdminUserRole(context, sCompNewName)){
                    try {
                    	//obj.setAttributeValue(context, attrTitle, sCompNewName);
                    	obj.setAttributeValue(context, attrOrganizationName, sCompNewName);
                        //ContextUtil.pushContext(context);
                        PropertyUtil.cacheSymbolicNames(context);
                    } finally {
                        //ContextUtil.popContext(context);
                    }
                }
            } catch (Exception e) {
                //No need to update the cache.
                e.printStackTrace();
            }
        }else{
			if(UIUtil.isNotNullAndNotEmpty((String)actionMap.get("Message"))){
				throw new FrameworkException((String)actionMap.get("Message"));
			}
		}
        return actionMap;
        //</Fix for 374428>
    }

    public Object getOrganizationTypesOnExpansion(Context context, String[] args) throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String companyID = (String)programMap.get("objectId");
        String expandLevel = (String)programMap.get("expandLevel");

        if("All".equalsIgnoreCase(expandLevel))
        {
             expandLevel = "0";
        }
        if(expandLevel == null || expandLevel.length() == 0)
        {
             expandLevel = "1";
        }
        DomainObject wsObj = new DomainObject(companyID);
        MapList resultsList = new MapList();
        StringList objectSelects = new StringList();
        objectSelects.addElement(DomainConstants.SELECT_ID);


        resultsList = (MapList)wsObj.getRelatedObjects(context,
                                                DomainObject.RELATIONSHIP_ORGANIZATION_PLANT +","+ DomainObject.RELATIONSHIP_DIVISION+","+ DomainObject.RELATIONSHIP_DIVISION,
                                                DomainObject.TYPE_BUSINESS_UNIT +","+ DomainObject.TYPE_ORGANIZATION,
                                                objectSelects,
                                                null,
                                                false,
                                                true,
                                                (short)1,
                                                "",
                                                null);
        Iterator fieldsItr = resultsList.iterator();
        Hashtable curField = new Hashtable();
        MapList objectList = new MapList();

        while(fieldsItr.hasNext()){
            curField = (Hashtable) fieldsItr.next();
            curField.put("selection", "single");

            objectList.add(curField);
        }
        return objectList;
    }
     /**
     * Disconnecting connected persons from objects after they are removed from the company.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - Object Id of the removed person
     *        1 - Username of the person
     * @returns nothing
     * @throws Exception if the operation fails
     * @since Common R213
     */
    
    
    public void removeParentOrganizationRole(Context context, String[] args) throws FrameworkException
    {   
       try{
        Organization organization1 = new Organization(args[0]);
   		organization1.open(context);
   	    String objname=  organization1.getName();
        ContextUtil.pushContext(context);
        MqlUtil.mqlCommand(context,"mod role $1 remove $2", objname,"parent"); 
       }catch (Exception e)
       {
           throw (new FrameworkException(e));
       }
       finally
       {
           ContextUtil.popContext(context);
       }
    }
    
    public void removePersonFromConnectedObjects(Context context, String[] args) throws Exception
    {       
        DomainObject user = (DomainObject) new DomainObject(args[0]);
        String toName = args[1];
	    String workspaceSel = "from["+RELATIONSHIP_PROJECT_MEMBERSHIP+"].to.to["+RELATIONSHIP_PROJECT_MEMBERS+"].from.id";
	    String projMemberSel = "from["+RELATIONSHIP_PROJECT_MEMBERSHIP+"].to.to["+RELATIONSHIP_PROJECT_MEMBERS+"].to.id";
	    StringList workSpaceList = (StringList) user.getInfoList(context, workspaceSel);
	    StringList projMemberList = (StringList) user.getInfoList(context, projMemberSel);
	    int size = workSpaceList.size();
	    for(int i=0 ; i<size;i++)
	    {
	    	removeProjectMember(context, (String)workSpaceList.get(i), toName, (String)projMemberList.get(i));
	    }
    }
	
    /**
     * @param context
     * @param grantees
     * @param projectMemberIds
     * @throws FrameworkException
     */
    private static void removeProjectMembers(Context context, String[] grantees, String[] projectMemberIds,String ObjId) throws FrameworkException {
        try
        {
            ContextUtil.pushContext(context);
            ContextUtil.startTransaction(context, true);

            String selectWMG = "grant[" + AccessUtil.WORKSPACE_MEMBER_GRANTOR + ",";
            String selectWAG = "grant[" + AccessUtil.WORKSPACE_ACCESS_GRANTOR + ",";
            String selectWLG = "grant[" + AccessUtil.WORKSPACE_LEAD_GRANTOR + ",";
            String selectGranteeStr = "].grantee";

            StringList objectSelects = new StringList((grantees.length * 3) + 4);
            for (int i = 0; i < grantees.length; i++) {
                objectSelects.add(selectWAG + grantees[i] + selectGranteeStr);
                objectSelects.add(selectWLG + grantees[i] + selectGranteeStr);
            }
            DomainObject obj= new DomainObject(ObjId);
            MapList objectMapList = getRelatedObjectsToUpdateAccess(context, obj, objectSelects);

            for (int i = 0; i < grantees.length; i++) {
                objectSelects.add(selectWMG + grantees[i] + selectGranteeStr);
            }
            objectMapList.add(obj.getInfo(context, objectSelects));

            List vaultedObjects = new ArrayList();
            Map granteesInfo = new HashMap(objectMapList.size());

            StringList FOLDERCONTENT_TYPES_REQUIRE_GRANTS = getFolderContentTypesRequireGrants(context);

            for (Iterator iter = objectMapList.iterator(); iter.hasNext();) {
                Map objectMap = (Map) iter.next();
                String id = (String)objectMap.get(SELECT_ID);
                String type = (String)objectMap.get(SELECT_TYPE);
                boolean isWorkspaceObj = id.equals(obj.getId());
                //Check if object type is in the list of types/subtypes configured as emxFramework.FolderContentTypesThatRequireGrants key
                if(!isWorkspaceObj && FOLDERCONTENT_TYPES_REQUIRE_GRANTS.indexOf(type) == -1) {
                    continue;
                }

                if(!isWorkspaceObj && RELATIONSHIP_VAULTED_OBJECTS.equals(objectMap.get(DomainRelationship.SELECT_NAME))) {
                    vaultedObjects.add(id);
                } else {
                    Object[] granttesPerGrantor = (Object[]) granteesInfo.get(id);
                    Set wmg = null;
                    Set wag = null;
                    Set wlg = null;

                    if(granttesPerGrantor == null ){
                        wmg = isWorkspaceObj ? new HashSet() : null;
                        wag = new HashSet();
                        wlg = new HashSet();
                        granttesPerGrantor = new Object[] {wmg, wag, wlg};
                        granteesInfo.put(id, granttesPerGrantor);
                    } else {
                        wmg = (Set) granttesPerGrantor[0];
                        wag = (Set) granttesPerGrantor[1];
                        wlg = (Set) granttesPerGrantor[2];
                    }

                    for (Iterator iterator = objectMap.keySet().iterator(); iterator.hasNext();) {
                        String key = (String) iterator.next();
                        String value = (String) objectMap.get(key);
                        if(value == null || value.equals("") || value.equals("null"))
                            continue;

                        if(key.startsWith(selectWAG)) {
                            wag.add(value);
                        } else if(key.startsWith(selectWLG)) {
                            wlg.add(value);
                        } else if(isWorkspaceObj && key.startsWith(selectWMG)) {
                            wmg.add(value);
                        }
                    }
                }
            }

            String revokeWMG = " revoke grantor '" + AccessUtil.WORKSPACE_MEMBER_GRANTOR + "' grantee '";
            String revokeWAG = " revoke grantor '" + AccessUtil.WORKSPACE_ACCESS_GRANTOR + "' grantee '";
            String revokeWLG = " revoke grantor '" + AccessUtil.WORKSPACE_LEAD_GRANTOR + "' grantee '";
            
            StringList commands = null;
            StringBuffer sCommand = null;
            int count = 1;
            for (Iterator iter = granteesInfo.keySet().iterator(); iter.hasNext();) {
				commands = new StringList();
				sCommand = new StringBuffer(100);
				count = 1;
                String id = (String) iter.next();
                commands.add(id);
                sCommand.append("mod bus $").append(count++);
                Object[] granttesPerGrantor = (Object[]) granteesInfo.get(id);
                Set wmg = (Set) granttesPerGrantor[0];
                Set wag = (Set) granttesPerGrantor[1];
                Set wlg = (Set) granttesPerGrantor[2];

               // StringBuffer buffer = new StringBuffer(100);
                if(wmg != null) {
                    for (Iterator iterator = wmg.iterator(); iterator.hasNext();) {
                        sCommand.append(" revoke grantor $'").append(count++).append("' grantee $'").append(count++);
                        commands.add(AccessUtil.WORKSPACE_MEMBER_GRANTOR);
                        commands.add(iterator.next().toString());
                    }
                }
                for (Iterator iterator = wag.iterator(); iterator.hasNext();) {
                	 sCommand.append(" revoke grantor $'").append(count++).append("' grantee $'").append(count++);
                     commands.add(AccessUtil.WORKSPACE_ACCESS_GRANTOR);
                     commands.add(iterator.next().toString());
                }
                for (Iterator iterator = wlg.iterator(); iterator.hasNext();) {
                	sCommand.append(" revoke grantor $'").append(count++).append("' grantee $'").append(count++);
                    commands.add(AccessUtil.WORKSPACE_LEAD_GRANTOR);
                    commands.add(iterator.next().toString());
                }
                
                if(sCommand.length() != 0) {
                	System.out.println("removeProjectMembers: mql command----" + sCommand.toString());
                    MqlUtil.mqlCommand(context,sCommand.toString(), commands);             
                }
            }

            for (int i = 0; i < projectMemberIds.length; i++) {
                if (projectMemberIds[i] != null ) {
                    DomainObject projectMember = new DomainObject(projectMemberIds[i]);
                    projectMember.deleteObject(context,true);
                }
            }
            String[] vaultedObjectsArr = new String[vaultedObjects.size()];
            vaultedObjects.toArray(vaultedObjectsArr);
            updateVaultedObjectsAccess(context, vaultedObjectsArr, grantees, grantees, "update");
            ContextUtil.commitTransaction(context);
        }
        catch (Exception ex )
        {
            ContextUtil.abortTransaction(context);
            throw new FrameworkException(ex);
        }
        finally
        {
            ContextUtil.popContext(context);
        }

    }
    
    private static void updateVaultedObjectsAccess(Context context, String[] vaultedObjectIds, String[] granteesWAG, String[] granteesWLG, String action) throws Exception {

        boolean add = "add".equals(action);
        boolean remove = "remove".equals(action);
        boolean update = "update".equals(action);

        if(!(add || remove || update)) {
            String[] formatArgs = {action};
            String message =  ComponentsUIUtil.getI18NString(context, "emxComponents.VaultedObjectAccess.InvalidAction",formatArgs);
            throw new FrameworkException(message);
        }

        try {
            ContextUtil.pushContext(context,null,null,null);

            StringList selects = new StringList();
            selects.add(DomainConstants.SELECT_ID);
            selects.add(DomainConstants.SELECT_TYPE);
            selects.add(getAttributeSelect(ATTRIBUTE_ACCESS_TYPE));
            selects.add( "to[" + RELATIONSHIP_VAULTED_OBJECTS + "].from.id");

            MapList result = DomainObject.getInfo(context, vaultedObjectIds, selects);
            for (Iterator resultIter = result.iterator(); resultIter.hasNext();) {
                Map vaultedObjInfo = (Map) resultIter.next();
                String vaultedObjId = (String) vaultedObjInfo.get(DomainObject.SELECT_ID);
                String vaultedObjType = (String) vaultedObjInfo.get(DomainObject.SELECT_TYPE);
                String accessType = (String) vaultedObjInfo.get(getAttributeSelect(ATTRIBUTE_ACCESS_TYPE));
                if(!shouldUpdateAccessForContent(context, vaultedObjType, accessType)) {
                    continue;
                }
                Object workspaceVaults = vaultedObjInfo.get( "to[" + RELATIONSHIP_VAULTED_OBJECTS + "].from.id");
                StringList folderIds = null;
                if(workspaceVaults == null || workspaceVaults.equals("") || workspaceVaults.equals("null")) {
                    folderIds = new StringList();
                } else if (workspaceVaults instanceof StringList) {
                    folderIds = (StringList) workspaceVaults;
                } else {
                    folderIds = new StringList((String)workspaceVaults);
                }

                Object[] accessInfo = getGranteesToGrantRevokeAccess(context, folderIds, vaultedObjId, granteesWAG, granteesWLG, action);

                Map grantWAG = (Map) accessInfo[0];
                Set revokeWAG = (Set) accessInfo[1];

                Set grantWLG = (Set) accessInfo[2];
                Set revokeWLG = (Set) accessInfo[3];

                if(!grantWAG.isEmpty() || !revokeWAG.isEmpty()) {
                    //Give the initial capacity approximately.
                    //140 max grant exp for Add Remove is considered
                    StringBuffer buffer = new StringBuffer(20 + (140* grantWAG.size()) + (60* revokeWAG.size()));
                    buffer.append("mod bus ").append(vaultedObjId);
                    for (Iterator iter = grantWAG.keySet().iterator(); iter.hasNext();) {
                        String user = (String) iter.next();
                        //GRANT_ACCESS_STR_1 = " grant '";
                        //GRANT_ACCESS_STR_2 = "' access ";
                        // grant 'Test 1' access read,show,checkout
                        buffer.append(GRANT_ACCESS_STR_1).append(user).append(GRANT_ACCESS_STR_2).append(grantWAG.get(user));
                    }
                    for (Iterator iter = revokeWAG.iterator(); iter.hasNext();) {
                        //REVOKE_ACCESS_BY_WAG = " revoke grantor '" + AccessUtil.WORKSPACE_ACCESS_GRANTOR + "' grantee '";
                        // revoke grantor 'Workspace Access Grantor' grantee 'Test 1'
                        buffer.append(REVOKE_ACCESS_BY_WAG).append(iter.next()).append('\'');
                    }
                    updateAccess(context, AccessUtil.WORKSPACE_ACCESS_GRANTOR, buffer.toString());
                }

                if(!grantWLG.isEmpty() || !revokeWLG.isEmpty()) {
                    //160 max grant exp for Add Remove with Lead is considered
                    StringBuffer buffer = new StringBuffer(20 + (160* grantWAG.size()) + (60* revokeWAG.size()));
                    buffer.append("mod bus ").append(vaultedObjId);
                    for (Iterator iter = grantWLG.iterator(); iter.hasNext();) {
                        //GRANT_ACCESS_STR_1 = " grant '";
                        //GRANT_ACCESS_STR_2 = "' access ";
                        // grant 'Test 1' access read,modify,delete,...
                        buffer.append(GRANT_ACCESS_STR_1).append(iter.next()).append(GRANT_ACCESS_STR_2).append(_ACCESS_EXPRESSIONS[_WLG_ACCESS]);
                    }
                    for (Iterator iter = revokeWLG.iterator(); iter.hasNext();) {
                        //REVOKE_ACCESS_BY_WLG = " revoke grantor '" + AccessUtil.WORKSPACE_LEAD_GRANTOR + "' grantee '";
                        // revoke grantor 'Workspace Lead Grantor' grantee 'Test 1'
                        buffer.append(REVOKE_ACCESS_BY_WLG).append(iter.next()).append('\'');
                    }
                    updateAccess(context, AccessUtil.WORKSPACE_LEAD_GRANTOR, buffer.toString());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            ContextUtil.popContext(context);
        }
    }
    
    private static void updateAccess(Context context, String grantor, String command) throws FrameworkException {
        boolean isContextPushed = false;
        try {
            ContextUtil.pushContext(context, grantor, null, null);
            isContextPushed = true;
            MqlUtil.mqlCommand(context, command);
        } finally {
            if(isContextPushed)
                ContextUtil.popContext(context);
        }
        
    }
    
    private static Object[] getGranteesToGrantRevokeAccess(Context context, StringList ids, String contentId, String[] granteesWAG, String[] granteesWLG, String action) throws FrameworkException {
        SelectList selectables = new SelectList();
        selectables.addId();
        if(granteesWAG == null) {
            selectables.add(SELECT_WAG_GRANTEEACCESS);
        } else if(granteesWAG.length > 0 ){
            for (int i = 0; i < granteesWAG.length; i++) {
                //SELECT_WAG_GRANTEE_GRANTEEACCESS_BEGIN = "grant[" + AccessUtil.WORKSPACE_ACCESS_GRANTOR + ",";
                //SELECT_WAG_GRANTEE_GRANTEEACCESS_END = "].granteeaccess";
                //grant[Workspace Access Grantor,Test 1].granteeaccess
                selectables.add(SELECT_WAG_GRANTEE_GRANTEEACCESS_BEGIN + granteesWAG[i] + SELECT_WAG_GRANTEE_GRANTEEACCESS_END);
            }
        }

        if(granteesWLG == null) {
            selectables.add(SELECT_WLG_GRANTEE);
        } else if(granteesWLG.length > 0){
            for (int i = 0; i < granteesWLG.length; i++) {
                //SELECT_WLG_GRANTEE_GRANTEE_BEGIN = "grant[" + AccessUtil.WORKSPACE_LEAD_GRANTOR + ",";
                //SELECT_WLG_GRANTEE_GRANTEE_END = "].grantee";
                //grant[Workspace Lead Grantor].grantee
                selectables.add(SELECT_WLG_GRANTEE_GRANTEE_BEGIN + granteesWLG[i] + SELECT_WLG_GRANTEE_GRANTEE_END);
            }
        }

        if(!ids.contains(contentId))
            ids.add(contentId);

        MapList list = DomainObject.getInfo(context, (String[]) ids.toArray(new String[] {}), selectables);

        Map contentMap = null;

        Map grantWAG = new HashMap();
        Set revokeWAG = new HashSet();

        Set grantWLG = new HashSet();
        Set revokeWLG = new HashSet();

        for (Iterator iter = list.iterator(); iter.hasNext();) {
            Map accessInfoMap = (Map) iter.next();
            String id = (String) accessInfoMap.get(DomainConstants.SELECT_ID);
            accessInfoMap.remove(DomainConstants.SELECT_ID);

            if(id.equals(contentId)) {
                contentMap = accessInfoMap;
            } else {
                getUsersAndAccess(accessInfoMap, grantWAG, grantWLG);
            }
        }

        Map contentWAG = new HashMap();
        Set contentWLG = new HashSet();
        getUsersAndAccess(contentMap, contentWAG, contentWLG);

        //Now update the users in grantWAG to whom we need to give acces or update the access
        //grantWLG to whom we need to give Workpsace Lead access
        //revokeWAG, revokeWLG to whom we need to revoke the access.
        boolean add = "add".equals(action);
        for (Iterator iter = contentWAG.keySet().iterator(); iter.hasNext();) {
            String user = (String) iter.next();
            Integer contentAccess = (Integer) contentWAG.get(user);
            Integer foldersAccess = (Integer) grantWAG.get(user);
            if(foldersAccess == null) {
                //Connected folders doesn't have this user so can revoke access to this user.
                revokeWAG.add(user);
            } else if((add && foldersAccess.compareTo(contentAccess) <= 0) || foldersAccess.equals(contentAccess)) {
                //In case of add operation if content access is higher than folder access keep the same access
                //In case of update/remove folder access should be same as content access.
                grantWAG.remove(user);
            }
        }

        for (Iterator iter = contentWLG.iterator(); iter.hasNext();) {
            String user = (String) iter.next();
            if(grantWLG.contains(user)) {
                grantWLG.remove(user);
            } else {
                revokeWLG.add(user);
            }
        }

        for (Iterator iter = grantWAG.keySet().iterator(); iter.hasNext();) {
            Object user = iter.next();
            grantWAG.put(user, _ACCESS_EXPRESSIONS[((Integer)grantWAG.get(user)).intValue()]);
        }

        return new Object[] {grantWAG, revokeWAG, grantWLG, revokeWLG};
    }
    
    private static void getUsersAndAccess(Map accessInfoMap, Map wagUsers, Set wlgUsers) {
        for (Iterator iterator = accessInfoMap.keySet().iterator(); iterator.hasNext();) {
            String key = (String) iterator.next();
            String value = (String) accessInfoMap.get(key);
            if(key.indexOf(WAG_SEARCH_STR) != -1) {
                String user = key.substring(WAG_GRANTEE_START_INDEX, key.indexOf(GRANTEEACCESS_SEARCH_STR));
                Integer otherAccess = (Integer) wagUsers.get(user);

                //Already user has high access Add Remove no need to check further
                if(otherAccess != null && _ADD_REMOVE_ACCESS.equals(otherAccess))
                    continue;
                //User has None access at folder no need to add this access to document
                Integer access = getAccessFromExpression(value);
                if(access == null)
                    continue;
                //User not exist in wagUsers so we need to add him
                if(otherAccess == null) {
                    wagUsers.put(user, access);
                } else if(otherAccess.compareTo(access) < 0) {
                    // If current access is higher than other access update the map
                    wagUsers.put(user, access);
                }
            } else if(key.indexOf(WLG_SEARCH_STR) != -1) {
                //In case of WLG value will be user name.
                wlgUsers.add(value);
            }
        }
    }
    
    private static Integer getAccessFromExpression(String accessExpression) {        
        String[] accessBit = accessExpression.split(",");
        Integer access =
            (accessBit.length == 1   &&  accessExpression.equals("all")) ? _ADD_REMOVE_ACCESS :
            (accessBit.length == 1   &&  accessExpression.equals("none")) ? null :
            (accessBit.length == 3   &&  accessExpression.equals(_ACCESS_EXPRESSIONS[0])) ? _READ_ACCESS :
            (accessBit.length == 8   &&  accessExpression.equals(_ACCESS_EXPRESSIONS[1])) ? _READ_WRITE_ACCESS :
            (accessBit.length == 10  &&  accessExpression.equals(_ACCESS_EXPRESSIONS[2])) ? _ADD_ACCESS :
            (accessBit.length == 11  &&  accessExpression.equals(_ACCESS_EXPRESSIONS[3])) ? _REMOVE_ACCESS :
            (accessBit.length == 13  &&  accessExpression.equals(_ACCESS_EXPRESSIONS[4])) ? _ADD_REMOVE_ACCESS : null;

        if(access == null) {
            boolean[] accessArray = new boolean[_ACCESS_BITS_COUNT];
            for (int i = 0; i < accessBit.length; i++) {
                int index = Arrays.binarySearch(_ACCESS_BITS, accessBit[i]);
                if(index >= 0)
                    accessArray[index] = true;
            }
            access = getAccessFromBits(accessArray);
        }

        return access;
    }

    private static Integer getAccessFromBits(boolean[] accessBits) {

        /*   This method need to be updated when ever there is a change in the access bits array.
         *
         *   _ACCESS_BITS[0]    =   "checkin";
         *   _ACCESS_BITS[1]    =   "checkout";
         *   _ACCESS_BITS[2]    =   "delete";
         *   _ACCESS_BITS[3]    =   "fromconnect";
         *   _ACCESS_BITS[4]    =   "fromdisconnect";
         *   _ACCESS_BITS[5]    =   "lock";
         *   _ACCESS_BITS[6]    =   "modify";
         *   _ACCESS_BITS[7]    =   "read";
         *   _ACCESS_BITS[8]    =   "revise";
         *   _ACCESS_BITS[9]    =   "show";
         *   _ACCESS_BITS[10]   =   "toconnect";
         *   _ACCESS_BITS[11]   =   "todisconnect";
         *   _ACCESS_BITS[12]   =   "unlock";
         */

        //readAccess = read, checkout, show
        boolean readAccess = accessBits[7] && accessBits[1] && accessBits[9];

        //readWriteAccess =  readAccess + checkin, modify, lock, unlock, revise
        boolean readWriteAccess = readAccess && accessBits[0] && accessBits[6] && accessBits[5] && accessBits[12] && accessBits[8];

        //addAccess = readWriteAccess + fromconnect, toconnect
        boolean addAccess = readWriteAccess && accessBits[3] && accessBits[10];

        //removeAccess = readWriteAccess + fromdisconnect, todisconnect, delete
        boolean removeAccess = readWriteAccess && accessBits[4] && accessBits[11] && accessBits[2];

        //addremoveAccess = addAccess + removeAccess
        boolean addremoveAccess = addAccess && removeAccess;

        return addremoveAccess    ? _ADD_REMOVE_ACCESS :
               removeAccess       ? _REMOVE_ACCESS     :
               addAccess          ? _ADD_ACCESS        :
               readWriteAccess    ? _READ_WRITE_ACCESS :
               readAccess         ? _READ_ACCESS       :  null;
    }
    
    
    private static synchronized boolean shouldUpdateAccessForContent(Context context, String type, String accessType) throws FrameworkException {
        loadFolderContentTypesRelRequireGrants(context);

        String contentTypes = EnoviaResourceBundle.getProperty(context, "emxFramework.FolderContentTypesThatRequireGrants");
        //give access of the parent object only for Documents/Content listed in _documentTypes and Vaults
        // do not propogate grants if access is specific
        StringList FOLDERCONTENT_TYPES_REQUIRE_GRANTS = (StringList) CacheUtil.getCacheObject(context, "common.util.VaultedObjectsAccess_FOLDERCONTENT_TYPES_REQUIRE_GRANTS");
        if( FOLDERCONTENT_TYPES_REQUIRE_GRANTS == null )
        {
            FOLDERCONTENT_TYPES_REQUIRE_GRANTS = new StringList();
        }
        return !"Specific".equals(accessType) && ("All".equalsIgnoreCase(contentTypes) || FOLDERCONTENT_TYPES_REQUIRE_GRANTS.contains(type));
    }
    
    private static synchronized StringList getFolderContentTypesRequireGrants(Context context) throws Exception {
        loadFolderContentTypesRelRequireGrants(context);
        StringList FOLDERCONTENT_TYPES_REQUIRE_GRANTS = (StringList) CacheUtil.getCacheObject(context, "common.util.VaultedObjectsAccess_FOLDERCONTENT_TYPES_REQUIRE_GRANTS");
        if( FOLDERCONTENT_TYPES_REQUIRE_GRANTS == null)
        {
            FOLDERCONTENT_TYPES_REQUIRE_GRANTS = new StringList();
        }
        return FOLDERCONTENT_TYPES_REQUIRE_GRANTS;
    }
    
    private static Pattern getFolderContentRelRequireGrants(Context context) throws Exception {
        loadFolderContentTypesRelRequireGrants(context);
        Pattern REL_PATTERN = (Pattern) CacheUtil.getCacheObject(context, "common.util.VaultedObjectsAccess_REL_PATTERN");
        if(REL_PATTERN == null )
        {
            REL_PATTERN = new Pattern("");
        }
        return REL_PATTERN.duplicate(); // return a copy so that one thread cannot modify REL_PATTERN while another is using it.
    }
    
    private static synchronized void loadFolderContentTypesRelRequireGrants(Context context) throws FrameworkException {

        boolean folderContentTypeRelReqGrantLoaded = false;
        Boolean cacheValue = (Boolean)CacheUtil.getCacheObject(context, "common.util.VaultedObjectsAccess_folderContentTypeRelReqGrantLoaded");
        if( cacheValue != null )
        {
            folderContentTypeRelReqGrantLoaded = cacheValue.booleanValue();
        }
        if(folderContentTypeRelReqGrantLoaded) {
            return;
        }
        Pattern REL_PATTERN = (Pattern) CacheUtil.getCacheObject(context, "common.util.VaultedObjectsAccess_REL_PATTERN");
        if(REL_PATTERN == null )
        {
            REL_PATTERN = new Pattern("");
        }
        StringList PROP_ACT_TYPES = (StringList) CacheUtil.getCacheObject(context, "common.util.VaultedObjectsAccess_PROP_ACT_TYPES");
        if( PROP_ACT_TYPES == null )
        {
            PROP_ACT_TYPES = new StringList();
        }
        Set typesSet = new HashSet();
        String inheritAccessForTypes = EnoviaResourceBundle.getProperty(context, "emxFramework.FolderContentTypesThatRequireGrants");
        if(!"All".equalsIgnoreCase(inheritAccessForTypes)) {
            boolean checkSubTypes = "true".equalsIgnoreCase(EnoviaResourceBundle.getProperty(context, "emxFramework.IncludeSubTypesForGrants"));            
            String[] types = inheritAccessForTypes.split(",");
            for (int i = 0; i < types.length; i++) {
                String sType = PropertyUtil.getSchemaProperty(context, types[i]);
                if(sType!=null && !"".equals(sType.trim()) && !PROP_ACT_TYPES.contains(sType)) {
                    PROP_ACT_TYPES.add(sType);
                    typesSet.add(sType);
                    if(checkSubTypes) {                                          	
                    	String strCommand = "print type $1 select derivative dump $2";
                        String subTypes = MqlUtil.mqlCommand(context,strCommand, true, sType, "|");
                        typesSet.addAll(FrameworkUtil.split(subTypes, "|"));
                    }
                }
            }
            //throws exception when emxFramework.FolderContentTypesThatRequireGrants is not found in emxSystem.properties of it is empty or there are no
            //corresponding type for all the symbolic names configured. below if conditions evaluates to false even if one correct symbolic name is configured.
            if(typesSet.size()<=0)
            {
                PROP_ACT_TYPES.clear();
                throw(new FrameworkException("Error - Property key emxFramework.FolderContentTypesThatRequireGrants is empty or Incorrect symbolic name configured for all the content types"));
            }
        }

        String inheritAccessForRels = EnoviaResourceBundle.getProperty(context,"emxFramework.FolderContentRelationshipsThatRequireGrants");        
        String[] rel = inheritAccessForRels.split(",");
        for (int i = 0; i < rel.length; i++) {
            String sRel = PropertyUtil.getSchemaProperty(context, rel[i]);
            if(sRel!=null && !"".equals(sRel.trim()))
            {
              REL_PATTERN.addPattern(sRel);
            }
        }

        //throws exception when emxFramework.FolderContentRelationshipsThatRequireGrants is not found in emxSystem.properties of it is empty or there are no
        //corresponding relationship for all the symbolic names configured. below if conditions evaluates to false even if one correct symbolic name is configured.
        if("".equals(REL_PATTERN.getPattern()))
        {
            PROP_ACT_TYPES.clear();
            throw(new FrameworkException("Error - Property key emxFramework.FolderContentRelationshipsThatRequireGrants is empty or Incorrect symbolic name configured for all the content relationships"));
        }

	PROP_ACT_TYPES = PROP_ACT_TYPES.unmodifiableCopy();
        StringList FOLDERCONTENT_TYPES_REQUIRE_GRANTS = new StringList();
        FOLDERCONTENT_TYPES_REQUIRE_GRANTS.addAll(typesSet);
	FOLDERCONTENT_TYPES_REQUIRE_GRANTS = FOLDERCONTENT_TYPES_REQUIRE_GRANTS.unmodifiableCopy();
        CacheUtil.setCacheObject(context, "common.util.VaultedObjectsAccess_FOLDERCONTENT_TYPES_REQUIRE_GRANTS", FOLDERCONTENT_TYPES_REQUIRE_GRANTS);
        CacheUtil.setCacheObject(context, "common.util.VaultedObjectsAccess_PROP_ACT_TYPES", PROP_ACT_TYPES);
        CacheUtil.setCacheObject(context, "common.util.VaultedObjectsAccess_REL_PATTERN", REL_PATTERN);
        folderContentTypeRelReqGrantLoaded = true;
        CacheUtil.setCacheObject(context, "common.util.VaultedObjectsAccess_folderContentTypeRelReqGrantLoaded", new Boolean(folderContentTypeRelReqGrantLoaded));
    }
    
	private static void removeProjectMember(Context context, String objectId, String grantee, String projectMemberId)
			throws Exception {
		removeProjectMembers(context, new String[] { grantee },
				new String[] { projectMemberId },objectId);
	}
	
	private static MapList getRelatedObjectsToUpdateAccess(Context context, DomainObject object, StringList objectSelects) throws Exception {
        Pattern REL_PATTERN = getFolderContentRelRequireGrants(context);

        objectSelects = objectSelects == null ? new StringList() : objectSelects;
        objectSelects.addElement(SELECT_ID);
        objectSelects.addElement(SELECT_TYPE);
        objectSelects.addElement(SELECT_NAME);
        objectSelects.addElement(SELECT_REVISION);
        return object.getRelatedObjects(context, REL_PATTERN.getPattern(), "*", objectSelects, new StringList(DomainRelationship.SELECT_NAME), false, true,(short)0, "", "", 0, null, null, null);
    }
	
	
	/**
     * Range function for move person functionality.
     * @param context The Matrix context
     * @param args program args
     * @return Map of range values.
     * @throws FrameworkException
     */
	public String getPersonMoveOptionRange(Context context, String[] args) throws FrameworkException {
      	StringBuffer sb = new StringBuffer();
		sb.append("<br>").append("<table><tr><td>").append("<input type=\"radio\" name=\"PersonMoveOption\" id=\"PersonMoveOption\" value=\"keep\" checked>&nbsp;&nbsp;").append("</td><td>").append(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale(),"emxComponents.MovePerson.Keep")).append("</td></tr><table>").append("<br>").append("<table><tr><td>").append("<input type=\"radio\" name=\"PersonMoveOption\" id=\"PersonMoveOption\" value=\"reset\">&nbsp;&nbsp;").append("</td><td>").append(EnoviaResourceBundle.getProperty(context,"emxPersonOrgModelStringResource", context.getLocale(),"emxComponents.MovePerson.Reset"));
		sb.append("</td></tr><table>");
    	return sb.toString(); 
   }


	public boolean isCompanyEditable(Context context,String[] args) throws Exception
    {
   	 	HashMap programMap = (HashMap) JPO.unpackArgs(args);
   	 	String companyID = (String)programMap.get("objectId");
   	 	String hostId = Company.getHostCompany(context);
		return !companyID.equals(hostId);
	}


	/**
	 * API to create the company object
	 * @param context
	 * @param args
	 * @return the company id
	 * @throws Exception
	 */	
	@com.matrixone.apps.framework.ui.CreateProcessCallable
	public Map createCompanyObject(Context context, String args[]) throws Exception {
		HashMap retMap = new HashMap(); 
		HashMap requestMap 				= (HashMap)JPO.unpackArgs(args);
		Company company 				= (Company)DomainObject.newInstance(context, DomainConstants.TYPE_COMPANY, null);
		boolean returnErrorMessage		= false;
		String strStoreMessage 			= "";
     	StringBuffer strBufSecondaryVaultMessage = new StringBuffer();
		String strAttrCageCode			= (String)requestMap.get("Cage Code");
		String sName					= (String)requestMap.get("Name");
	    String parentId 				= (String)requestMap.get("parentNameOID");
	    String companyType				= (String)requestMap.get("companyType") ;
	    String relSubsidiary            = PropertyUtil.getSchemaProperty(context, "relationship_Subsidiary");
	    String attrCageCode             = PropertyUtil.getSchemaProperty(context, "attribute_CageCode");
	    String sType                    = PropertyUtil.getSchemaProperty(context, "type_Company");
	    String sPolicy                  = PropertyUtil.getSchemaProperty(context, "policy_Organization");
	    String attrSecondaryVaults  	= PropertyUtil.getSchemaProperty(context, "attribute_SecondaryVaults");
	    String attrFileStoreSymName     = PropertyUtil.getSchemaProperty(context, "attribute_FileStoreSymbolicName");
		String attrOrgId                = PropertyUtil.getSchemaProperty(context, "attribute_OrganizationID");
	    String attributeOrganizationName= PropertyUtil.getSchemaProperty(context, "attribute_OrganizationName");
		String isUniqueCageCode         = EnoviaResourceBundle.getProperty(context, "emxComponents.cageCode.Uniqueness");
		String attrTitle                = PropertyUtil.getSchemaProperty(context, "attribute_Title");
		
 	    String autoNameComp = DomainObject.getAutoGeneratedName(context, "type_Company", "");
 	    // Checking for Name is unique
 	    if(isCompanyExists(context, sType, sName)) {
        	retMap.put("ErrorMessage", EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.Profiling.OrganizationAlreadyExists"));
        	return retMap;
        }
		// Check to see if the cagecode is unique if the property setting is true
 	    if("true".equals(isUniqueCageCode) && isCageCodeExists(context, sType, strAttrCageCode)) {
            retMap.put("ErrorMessage", EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.CreateOrEditCompany.CageCodeAlreadyExists"));
        	return retMap;
        }
 	    try {
 	    	company.create(context, autoNameComp, sPolicy, null, false);
 	    	company.open(context);	 	            		
 	    	// Connect the created company as subsidiary to selected parent.
 	    	if(UIUtil.isNotNullAndNotEmpty(parentId))
 	    	{
 	    		company.addFromObject(context, new RelationshipType(relSubsidiary), parentId);
 	    	} 	            		
 	    	
 	    	// This block is only for Suppliers and Customers
 	    	if (UIUtil.isNotNullAndNotEmpty(companyType))
 	    	{
 	    		// get logged in person's host company
 	    		String strCompanyId = com.matrixone.apps.common.Person.getPerson(context).getCompanyId(context);
 	    		if(UIUtil.isNotNullAndNotEmpty(strCompanyId))
 	    		{
 	    			if("Supplier".equalsIgnoreCase(companyType))
 	    			{
 	    				String relSupplier= PropertyUtil.getSchemaProperty(context, "relationship_Supplier");
 	    				//Connect Company(Supplier) to Host Company
 	    				company.addFromObject(context, new RelationshipType(relSupplier), strCompanyId);
 	    			}
 	    			else if("Customer".equalsIgnoreCase(companyType))
 	    			{
 	    				String relCustomer= PropertyUtil.getSchemaProperty(context, "relationship_Customer");
 	    				//Connect Company(Customer) to Host Company
 	    				company.addFromObject(context, new RelationshipType(relCustomer), strCompanyId);
 	    			}
 	    		}
 	    	}
 	    	//end
 	    	
 	    	company.promote(context);
 	    	company.setDescription(context, (String)requestMap.get("Description"));
 	    	AttributeList companyAttrList = new AttributeList();
 	    	companyAttrList.addElement(new Attribute(new AttributeType(attrTitle), sName));
			//update the "Organization ID" attribute
			String sAttrOrgIdValue = (String)requestMap.get(attrOrgId);
			if(UIUtil.isNotNullAndNotEmpty(sAttrOrgIdValue)){		
				companyAttrList.addElement(new Attribute(new AttributeType(attrOrgId), sAttrOrgIdValue));
			}

 	    	//update the "Organization name" attribute
 	    	companyAttrList.addElement(new Attribute(new AttributeType(attributeOrganizationName), sName));

 	    	//update the "File store" attribute
 	    	String sAttrFileStoreValue = (String)requestMap.get(attrFileStoreSymName);
 	    	if(UIUtil.isNotNullAndNotEmpty(sAttrFileStoreValue))
 	    	{
 	    		if (sAttrFileStoreValue.startsWith("store_")) {
 	    			companyAttrList.addElement(new Attribute(new AttributeType(attrFileStoreSymName), sAttrFileStoreValue));
 	    		}else {
 	    			strStoreMessage = sAttrFileStoreValue;
 	    		}
 	    	}
 	    	company.setAttributes(context, companyAttrList);
 	    	company.update(context);
 	    	String strCompanyObjectId = company.getId(context);
 	    	retMap.put(SELECT_ID, strCompanyObjectId);
 	    } catch(Exception ex) {
 	    	throw (new FrameworkException(ex));
 	    }finally{
			company.close(context);
		}
	    
        if(strStoreMessage.length() > 0)
        {
            StringBuffer strBufStoreMessage = new StringBuffer();
            strBufStoreMessage.append(EnoviaResourceBundle.getProperty(context, "emxPersonOrgModelStringResource", context.getLocale(), "emxComponents.CompanyEdit.StoreMessage1"));
            strBufStoreMessage.append(" '");
            strBufStoreMessage.append(strStoreMessage);
            strBufStoreMessage.append("' ");
            strBufStoreMessage.append(EnoviaResourceBundle.getProperty(context, "emxPersonOrgModelStringResource", context.getLocale(), "emxComponents.CompanyEdit.StoreMessage2"));
            MqlUtil.mqlCommand(context, "warning $1",strBufStoreMessage.toString());
        }
		return retMap;
	}
	
	/**
	 * API to check the companyis supplier company or not
	 * @param context
	 * @param args
	 * @return true if the company type is supplier
	 * @throws Exception
	 */
	public boolean isSupplierCompany(Context context,String[] args) throws Exception
    {
   	 	HashMap programMap = (HashMap) JPO.unpackArgs(args);
   	 	String companyType = (String)programMap.get("companyType"); 	 	
   	 	return "Supplier".equals(companyType); 	 		
	}
	
	/**
	 * API to check the company is Subsidiary company or not
	 * @param context
	 * @param args
	 * @return true if the company type is Subsidiary
	 * @throws Exception
	 */
	public boolean isSubsidiaryCompany(Context context,String[] args) throws Exception
    {
   	 	HashMap programMap = (HashMap) JPO.unpackArgs(args);
   	 	String companyType = (String)programMap.get("companyType");
		return "Subsidiary".equals(companyType);
	}
	
	/**
	 * API to check the company is Subsidiary company or not
	 * @param context
	 * @param args
	 * @return true if the company type is Subsidiary
	 * @throws Exception
	 */
	public boolean isNotSubsidiaryCompany(Context context,String[] args) throws Exception
    {
		return !isSubsidiaryCompany(context, args);	 		
	}
	
	/**
	 * API to create the parent company field for subsidiary company
	 * @param context
	 * @param args
	 * @return the field string
	 * @throws Exception
	 */	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String getParentCompanyName(Context context, String[] args) throws Exception {
		StringBuffer sbReturnString = new StringBuffer();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap"); 
		String parentNameOID = (String)requestMap.get("parentOID");
		DomainObject parentCompany = DomainObject.newInstance(context, parentNameOID);
		sbReturnString.append(parentCompany.getInfo(context, DomainConstants.SELECT_ATTRIBUTE_TITLE));
		sbReturnString.append("<input value=\""+parentNameOID+"\" name=\"parentNameOID\" type=\"hidden\" />");
		return sbReturnString.toString();
	}
	
	/**
	 *  API to check if the cage code is unique
	 * @param context
	 * @param sType
	 * @param strAttrCageCode
	 * @return true if the cage code not unique
	 * @throws Exception
	 */
	private boolean isCageCodeExists(Context context, String sType, String strAttrCageCode) throws Exception {
		matrix.db.Query query = new matrix.db.Query();
		String whereStr = DomainObject.getAttributeSelect(PropertyUtil.getSchemaProperty(context, "attribute_CageCode")) + " == \""+strAttrCageCode+"\"";
        query.open(context);
        query.setBusinessObjectType(sType);
        query.setBusinessObjectRevision("-");
        query.setVaultPattern("*");
        query.setOwnerPattern("*");
        query.setWhereExpression(whereStr);
        BusinessObjectList boList = query.evaluate(context);
        query.close(context);
        if(boList.size() > 0) {
	    	return true;
	    }else {
	    	return false;
	    }
	}
	
	/**
	 * API to check if the company name is unique
	 * @param context
	 * @param sType
	 * @param sName
	 * @return true if the company name is not unique
	 * @throws Exception
	 */
	private boolean isCompanyExists(Context context, String sType, String sName) throws Exception {
		String objectWhere = DomainConstants.SELECT_ATTRIBUTE_TITLE+"==\""+sName+"\"";
		StringList objSelects = new StringList(DomainConstants.SELECT_ID);

		MapList compList= findObjects(
				context,            // eMatrix context
				sType,       // type pattern
				QUERY_WILDCARD,         // name pattern
				QUERY_WILDCARD,     // revision pattern
				QUERY_WILDCARD,     // owner pattern
				QUERY_WILDCARD,     // vault pattern
				objectWhere,        // where expression
				true,               // expand types
				objSelects);     // object selects
		if(compList.size() > 0) {
	    	return true;
	    }else {
	    	return false;
	    }
	}
	
	 public static MapList getIcon(Context context, String[] args) throws Exception {
	   	  HashMap programMap = (HashMap) JPO.unpackArgs(args);
	   	  MapList iconMap = new MapList();
	   	  Map<String, String> iconHm = new HashMap<String, String>();
	   	  MapList objectList= (MapList) programMap.get("objectList");
	   	  String objectInfo = "";
	   	  if(objectList != null){
	   		  for (int i=0; i < objectList.size(); i++){
	   			Map collMap = (Map)objectList.get(i);
				objectInfo = UIUtil.isNullOrEmpty((String) collMap.get("name"))?(String) collMap.get("id"):(String) collMap.get("name");
				if("True".equalsIgnoreCase((String)collMap.get(Company.SELECT_IS_SUPPLIER))){
					iconHm.put(objectInfo, "iconSupplier16.png");
				}else if("True".equalsIgnoreCase((String)collMap.get(Company.SELECT_IS_CUSTOMER))){
					iconHm.put(objectInfo, "ENOCustomer16.png");
				}else{
					iconHm.put(objectInfo, "iconCompany16.png");
				} 
				iconMap.add(iconHm);
	   		  }
	   	  }
	   	  return iconMap;
     }

	@com.matrixone.apps.framework.ui.ProgramCallable
	public String getFieldQueryForCompany(Context context, String[] args) throws Exception {
		try {
			HashMap paramMap = (HashMap) JPO.unpackArgs(args);
			String objectId = (String) paramMap.get("objectId");
			String mqlCmd = "print bus $1 select $2 dump";
			String mqlOutPut = MqlUtil.mqlCommand(context, mqlCmd, objectId, "name");
			return "TYPES=type_Person:CURRENT=policy_Person.state_Active:member!="+(String) mqlOutPut;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}
	
}
