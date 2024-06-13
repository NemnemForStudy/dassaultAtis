/*
 * emxResourcePoolBase
 *
 * Copyright (c) 1999-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 */

/**
Change History:
Date       Change By  Release        Bug/Functionality        Details
-----------------------------------------------------------------------------------------------------------------------------
20-Aug-09   wqy        V6R2010x     IR-012043V6R2010x        modify function assignPeoplesToResourceRequest to change the logic
                                                             of adding resource Request

*/


import java.text.NumberFormat;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;
import java.util.stream.Collectors;

import com.matrixone.apps.common.Organization;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.common.Task;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PolicyUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.program.FTE;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;

import matrix.db.BusinessObject;
import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectItr;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Relationship;
import matrix.db.RelationshipWithSelect;
import matrix.db.RelationshipWithSelectItr;
import matrix.db.RelationshipWithSelectList;
import matrix.db.Role;
import matrix.db.UserItr;
import matrix.db.UserList;
import matrix.util.MatrixException;
import matrix.util.StringItr;
import matrix.util.StringList;

public class emxResourcePoolBase_mxJPO extends emxDomainObjectBase_mxJPO {

    private static final String STRING_CAPACITY = "Capacity";

    final short nObjectLimit = 0;
    /**
     * Constructor
     *
     * @param context The Matrix Context object
     * @param args The arguments array
     * @throws Exception if operation fails
     */
    public emxResourcePoolBase_mxJPO(Context context, String[] args) throws Exception {
        super(context, args);
    }

    /**
     * <method description>
     *
     * @param context The Matrix Context object
     * @param args The ARgument String Array
     * @returns int  It returns integer
     * @throws Exception if the operation fails
     */
    public int mxMain(Context context, String[] args) throws MatrixException {
        throw new MatrixException("This JPO cannot be run stand alone.");
    }

    /**
     * Returns comma separated names of the Resource Managers. This method is used for getting value of Resource Manager field on web form.
     * It is used for
     * -Field ResourceManager in form type_BusinessUnit
     * -Field ResourceManager in form type_Company
     *
     * @param context The Matrix Context object
     * @param args Packed programMap
     * @returns String the comma separated names of Resource Managers
     * @throws MatrixException if context is null / objectId parameter is invalid / the operation fails
     * @since PRG R207
     */
    public String getFieldResourceManagersData (Context context, String[] args) throws MatrixException
    {

        try
        {
            // Check method arguments
            if (context == null)
            {
                throw new IllegalArgumentException("context");
            }

            Map programMap = (Map) JPO.unpackArgs(args);
            Map relBusObjPageList = (Map) programMap.get("paramMap");
            String strObjectId = (String)relBusObjPageList.get("objectId");

            if ( !(strObjectId != null && !"".equals(strObjectId) && !"null".equals(strObjectId)) )
            {
                throw new IllegalArgumentException(ComponentsUtil.i18nStringNow("emxComponents.Organisation.ArgsCannotFindObjectIdInProgramMap", context.getLocale().getLanguage()));
            }

            this.setId(strObjectId);

            MapList mlResourceManagers = this.getResourceManagers(context, new String[] {DomainObject.SELECT_NAME});

            Map mapRelatedObjectInfo = null;
            String strResourceManager = null;
            String strResourceManagerId = null;
            StringList slResourceManagers = new StringList();
            for (Iterator itrRelatedObjects = mlResourceManagers.iterator(); itrRelatedObjects .hasNext();)
            {
                mapRelatedObjectInfo = (Map) itrRelatedObjects.next();

                strResourceManager = (String)mapRelatedObjectInfo.get(DomainObject.SELECT_NAME);
                strResourceManagerId = PersonUtil.getPersonObjectID(context, strResourceManager);
                strResourceManager = PersonUtil.getFullName(context, strResourceManager);

                if (strResourceManager != null && !"".equals(strResourceManager) && !"null".equals(strResourceManager))
                {
                    slResourceManagers.add(strResourceManager);
                }

            }

            return FrameworkUtil.join(slResourceManagers, ";");
        }
        catch (IllegalArgumentException iaexp)
        {
            iaexp.printStackTrace();
            throw new MatrixException(iaexp);
        }
        catch (Exception exp)
        {
            exp.printStackTrace();
            throw new MatrixException(exp);
        }
    }

    /**
     * Finds the Resource Managers information. This method should not be used for table & form fields.
     *
     * @param context The Matrix Context object
     * @param args String array of selectables
     * @returns MapList information about Resource Managers
     * @throws MatrixException if context is null / the operation fails
     * @since PRG R207
     */
    public MapList getResourceManagers (Context context, String[] args) throws MatrixException {

        try {
            // Check method arguments
            if (context == null) {
                throw new IllegalArgumentException("context");
            }

            emxOrganization_mxJPO organization = new emxOrganization_mxJPO(context, new String[]{this.getId()});
            return organization.getResourceManagers (context, args);
        }
        catch (Exception exp) {
            exp.printStackTrace();
            throw new MatrixException(exp);
        }
    }


    /**
     * This method assigns selected persons as Resource managers to the Business Units field when selected from edit form mode.
     *  It is used for
     * -Field ResourceManager in form type_BusinessUnit
     * -Field ResourceManager in form type_Company
     *
     * @param context The Matrix Context object
     * @param args Packed ProgramMap
     * @throws MatrixException if context is null / objectId parameter is invalid / the operation fails
     * @since PRG R207
     */
    public void updateFieldResourceManagerData(Context context, String[] args) throws MatrixException
    {
        try
        {
            if(context == null) {
                throw new IllegalArgumentException("context");
            }
            Map programMap = (Map) JPO.unpackArgs(args);
            Map paramMap = (Map) programMap.get("paramMap");
            String strObjectId = (String)paramMap.get("objectId");
            if (!(strObjectId != null && !"".equals(strObjectId) && !"null".equals(strObjectId))) {
                throw new IllegalArgumentException(ComponentsUtil.i18nStringNow("emxComponents.Organisation.CannotFindObjectIdInProgramMap", context.getLocale().getLanguage()));
            }
            this.setId(strObjectId);
            String resourceMgrIds = (String) paramMap.get("New OID");
            StringList resourceMgrIdList =
                    (resourceMgrIds == null || "".equals(resourceMgrIds) || "null".equals(resourceMgrIds)) ? new StringList() :
                     resourceMgrIds.indexOf("|") != -1 ?  FrameworkUtil.split(resourceMgrIds, "|") : FrameworkUtil.split(resourceMgrIds, ",");
           assignResourceManagers(context, (String[]) resourceMgrIdList.toArray(new String[resourceMgrIdList.size()]));
        }
        catch(Exception exe)
        {
            exe.printStackTrace();
            throw new MatrixException(exe);
        }
    }

    /**
     * Gets the data for the column "ResourceManagers" for table "PMCResourcePoolSummary"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing
     * @throws Exception if operation fails
     */
    public Vector getColumnResourceManagersData(Context context, String[] args) throws Exception
    {
        try {
            // Create result vector
            Vector vecResult = new Vector();

            // Get object list information from packed arguments
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            Map paramList = (Map) programMap.get("paramList");
            MapList objectList = (MapList) programMap.get("objectList");
            boolean isExport = false;
            boolean isPrinterFriendly = false;
            String strReport= (String)paramList.get("reportFormat");
            String strExport= (String)paramList.get("exportFormat");
            if((ProgramCentralUtil.isNotNullString(strExport) && "CSV".equalsIgnoreCase(strExport)) ||
                    (ProgramCentralUtil.isNotNullString(strReport) && "CSV".equalsIgnoreCase(strReport)))
            {
                isExport = true;
            }
            if((ProgramCentralUtil.isNotNullString(strExport) && "HTML".equalsIgnoreCase(strExport)) ||
                    (ProgramCentralUtil.isNotNullString(strReport) && "HTML".equalsIgnoreCase(strReport)))
            {
                isPrinterFriendly = true;
            }
            Map mapRowData = null;
            for (Iterator itrRowData = objectList.iterator(); itrRowData.hasNext();)
 {
                mapRowData = (Map) itrRowData.next();
               String strResourceManager = (String) mapRowData.get("Resource_Managers");
                StringList slResourceManagers = FrameworkUtil.split(strResourceManager,",");
                StringList slResourceManagersReturned = new StringList();
                String strResourceManagerFullName = null;
                String strResourceManagerId = null;
                String imageStr = "../common/images/iconSmallPerson.gif";

                for (int i = 0; i < slResourceManagers.size(); i++)
                {
                    strResourceManagerFullName = PersonUtil.getFullName(context,(String) slResourceManagers.get(i));
                    if(isExport)
                    {
                        slResourceManagersReturned.add(XSSUtil.encodeForHTML(context,strResourceManagerFullName));
                    }
                    else if (isPrinterFriendly)
                    {
                        StringBuffer sbSubstanceLink = new StringBuffer();
                        sbSubstanceLink.append("<img border=\"0\" src=\""+ imageStr + "\" title=\"\"></img>");
                        sbSubstanceLink.append(XSSUtil.encodeForHTML(context, strResourceManagerFullName));
                        slResourceManagersReturned.add(sbSubstanceLink.toString());
                    }
                    else
                    {
                    strResourceManagerId = PersonUtil.getPersonObjectID(context, (String) slResourceManagers.get(i));
                    StringBuffer sbSubstanceLink = new StringBuffer();
                    sbSubstanceLink.append("<img border=\"0\" src=\""+ imageStr + "\" title=\"\"></img>");
                    sbSubstanceLink.append("<a href='../common/emxTree.jsp?objectId=").append(strResourceManagerId);
                    sbSubstanceLink.append("' >");
                    sbSubstanceLink.append(XSSUtil.encodeForHTML(context, strResourceManagerFullName));
                    sbSubstanceLink.append("</a>");
                    slResourceManagersReturned.add(sbSubstanceLink.toString());
                }
                }
                vecResult.add(FrameworkUtil.join(slResourceManagersReturned,";"));
            }
            return vecResult;
        } catch (Exception exp)
        {
            exp.printStackTrace();
            throw exp;
        }
    }

    /**
     * Gets the data for the column "Capacity" for table "PMCResourcePoolSummary"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing no. of peoples available to particular Resource Pool
     * @throws Exception if operation fails
     */
    public Vector getColumnCapacityData(Context context, String[] args)
            throws Exception {
        try {
            // Create result vector
            Vector vecResult = new Vector();

            // Get object list information from packed arguments
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");

            Map mapRowData = null;
            for (Iterator itrRowData = objectList.iterator(); itrRowData.hasNext();) {
                mapRowData = (Map) itrRowData.next();

                vecResult.add(mapRowData.get(STRING_CAPACITY));
            }

            return vecResult;

        } catch (Exception exp) {
            exp.printStackTrace();
            throw exp;
        }
    }

    /**
     * This is common method used for finding the resource pool data for My Desk > Program > Resource Pools table.
     * This method is supposed to be used only for the Resource Pool table methods.
     *
     *
     * @param context The Matrix Context object
     * @param strPMCResourcePoolFilter  Resource Pool Table filter for e.g. MyResourcePools/ AllResourcePools
     *              If this is "AllResourcePools", then strObjectId, strRelPattern, getTo & getFrom parameters are ignored.
     * @param strSelectedResourceManager Selected Resource Manager for which
     * @param strObjectId The object id of business object from which expansion is to be performed to get Organization objects
     * @param strRelPattern The command separated relationship patterns to be used for expansion
     * @param getTo true id given object lies on to side of the relationships else false
     * @param getFrom true id given object lies on from side of the relationships else false
     * @param isExpandFunction true if this call is being used to find the objects when an object in table is expanded. This parameter
     *              is only used when strPMCResourcePoolFilter = "AllResourcePools" to return no data in expand mode, otherwise it is ignored.
     * @return MapList containing Organization information for rendering the table. This map will have values against following keys
     *              DomainConstants.SELECT_ID
     *              "SELECT_ORGANIZATION_MEMBERS_ID"
     *              "SELECT_RESOURCE_MANAGERS_NAME"
     *              "Capacity"
     *              "Resource_Managers"
     * @throws MatrixException if operation fails
     */
    protected MapList getTableResourcePoolsData (Context context, String strPMCResourcePoolFilter,String strSelectedResourceManager, String strObjectId, String strRelPattern, boolean getTo, boolean getFrom, boolean isExpandFunction) throws MatrixException
    {
        try
        {
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }

            MapList mlResult = new MapList();

            //
            // Depending on the filter selected decide how to find the resource pools
            //
            String sAll = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,
                    "emxProgramCentral.Common.All", context.getSession().getLanguage());
            DomainObject dmoObject = DomainObject.newInstance(context, strObjectId);

            if ("AllResourcePools".equals(strPMCResourcePoolFilter) && !isExpandFunction)
            {
                final String SELECT_RESOURCE_POOLS_ID = "from.id";
                strRelPattern = RELATIONSHIP_RESOURCE_MANAGER;
                String strVaultPattern = context.getVault().getName();
                String strRelExpression = null;
                //Modified:Jan 10, 2011:HP5:R211:PRG:IR-080992V6R2012
                strRelExpression = "";
                MapList tempResult = new MapList();
                //End:R207:PRG:IR-080992V6R2012
                short nObjectLimit = 0;// TODO for all Objects ??
                StringList slSelectStmts = new StringList();
                slSelectStmts.add(SELECT_RESOURCE_POOLS_ID);

                StringList slOrderBy = new StringList();
                slOrderBy.add(SELECT_RESOURCE_POOLS_ID);

                RelationshipWithSelectList relationshipWithSelectList = Relationship.query(context,
                                                                                                                    strRelPattern,
                                                                                                                    strVaultPattern,
                                                                                                                    strRelExpression,
                                                                                                                    nObjectLimit,
                                                                                                                    slSelectStmts,
                                                                                                                    slOrderBy);
                RelationshipWithSelect relationshipWithSelect = null;
                String strResourcePoolId = null;
                Map mapConsolidatedInfo = null;
                for (RelationshipWithSelectItr relationshipWithSelectItr = new RelationshipWithSelectItr(relationshipWithSelectList);relationshipWithSelectItr.next();)
                {
                    try{
                        // Logged in Resource Manager can access not information of other resourcePools thats why pushing context.
                        ContextUtil.pushContext(context, PropertyUtil.getSchemaProperty(context, "person_UserAgent"),DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING);
                        relationshipWithSelect = relationshipWithSelectItr.obj();
                        strResourcePoolId = relationshipWithSelect.getSelectData(SELECT_RESOURCE_POOLS_ID);

                        mapConsolidatedInfo = new HashMap();
                        mapConsolidatedInfo.put(DomainConstants.SELECT_ID, strResourcePoolId);
                        //Modified:Jan 10, 2011:HP5:R211:PRG:IR-080992V6R2012
                            tempResult.add(mapConsolidatedInfo);
                        //End:Jan 10, 2011:HP5:R211:PRG:IR-080992V6R2012
                    }catch(Exception e){
                        e.printStackTrace();
                    }finally{
                        //Set the context back to the context user
                        ContextUtil.popContext(context);
                   }
                }
                //Added:Jan 10, 2011:HP5:R211:PRG:IR-080992V6R2012
                if (!sAll.equalsIgnoreCase(strSelectedResourceManager))
                {   //resourcePoolList is used to remove duplicate records
                    StringList resourcePoolList = new StringList();
                    for(int i=0; i<tempResult.size();i++)
                    {
                        Map tempMapConsolidatedInfo = (Map)tempResult.get(i);
                        String strTempResourcePoolId = (String)tempMapConsolidatedInfo.get(DomainConstants.SELECT_ID);
                        StringList slResourceManagersId = new StringList();
                        StringList slMembersId  = new StringList();
                        if(null!=tempMapConsolidatedInfo.get("SELECT_RESOURCE_MANAGERS_NAME"))
                        {
                            slResourceManagersId = (StringList)tempMapConsolidatedInfo.get("SELECT_RESOURCE_MANAGERS_NAME");
                        }
                        if(slResourceManagersId.contains(strSelectedResourceManager) && !resourcePoolList.contains(strTempResourcePoolId))
                        {   resourcePoolList.add(strTempResourcePoolId);
                            mlResult.add(tempMapConsolidatedInfo);
                        }
                    }
                }
                else
                {   StringList resourcePoolList = new StringList();
                    for(int i=0; i<tempResult.size();i++)
                {
                        Map tempMapConsolidatedInfo = (Map)tempResult.get(i);
                        String strTempResourcePoolId = (String)tempMapConsolidatedInfo.get(DomainConstants.SELECT_ID);

                    if(!resourcePoolList.contains(strTempResourcePoolId)){
                         resourcePoolList.add(strTempResourcePoolId);
                         mlResult.add(tempMapConsolidatedInfo);
                    }

                    //mlResult.addAll(tempResult);
                }
              //End:Jan 10, 2011:HP5:R211:PRG:IR-080992V6R2012
              //Modified:6-Jan-2010:ixe:R209:PRG:IR-023305
            }
          //End Modified:6-Jan-2010:ixe:R209:PRG:IR-023305
            }
            return mlResult;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }

    }
    /**
     * This Method Return Resource Pools related to the Context user.
     *
     * @param context Matrix Context Object
     * @param args String array
     * @return MapList
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTableMyResourcePoolsData(Context context, String[] args) throws MatrixException {
        try
        {
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }
            Map programMap = (Map) JPO.unpackArgs(args);
            String strPMCResourcePoolFilter = (String)programMap.get("PMCResourcePoolFilter");

            String relPattern = RELATIONSHIP_RESOURCE_MANAGER;
            String typePattern = TYPE_ORGANIZATION;
            String personId = PersonUtil.getPersonObjectID(context);

           StringList slAllResourceManagers = getAllResourceManagers(context,args);
           String strSelectedResourceManager = (String)programMap.get("PMCResourcePoolResourceManagerFilter");
           MapList returnResult = new MapList();
           if("MyResourcePools".equalsIgnoreCase(strPMCResourcePoolFilter)){
               returnResult =  getResourcePoolObjects(context,
                       strPMCResourcePoolFilter,
                       strSelectedResourceManager,
                       personId,
                       relPattern,
                       typePattern);
           }else{
               returnResult = getTableResourcePoolsData(context, strPMCResourcePoolFilter, strSelectedResourceManager,personId, relPattern, true, false, false);
           }

           return returnResult;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }
    }

    /**
     * This Method Return Child Resource Pools when a Resource Pool is expanded in PMCResourcePoolSummary table.
     *
     * @param context Matrix Context Object
     * @param args String array
     * @return MapList
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTableExpandChildResourcePoolsData(Context context, String[] args) throws MatrixException {
        try
        {
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }

            Map programMap = (Map)JPO.unpackArgs(args);
            String strPMCResourcePoolFilter = (String)programMap.get("PMCResourcePoolFilter");
            String strPMCResourcePoolResourceManagerFilter = (String)programMap.get("PMCResourcePoolResourceManagerFilter");

            String strParentResourcePoolId = (String)programMap.get("objectId");
            String strRelPattern = RELATIONSHIP_DIVISION + "," + RELATIONSHIP_COMPANY_DEPARTMENT + "," + RELATIONSHIP_ORGANIZATION_PLANT + "," + RELATIONSHIP_SUBSIDIARY;

            return getTableResourcePoolsData(context, strPMCResourcePoolFilter, strPMCResourcePoolResourceManagerFilter,strParentResourcePoolId, strRelPattern, false, true, true);
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }
    }

    /**
     * Gets the data for the column "Open Requests" for table "PMCResourcePoolSummary"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing no. of Open Requests available to particular Resource Pool
     * @throws Exception if operation fails
     */
    public Vector getColumnOpenRequestsData(Context context, String[] args) throws Exception
    {
        try {
            // Create result vector
            Vector vecResult = new Vector();

            // Get object list information from packed arguments
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");

            Map mapRowData = null;
            for (Iterator itrRowData = objectList.iterator(); itrRowData.hasNext();) {
                mapRowData = (Map) itrRowData.next();

                vecResult.add(mapRowData.get("Open_Requests"));
            }

            return vecResult;

        } catch (Exception exp) {
            exp.printStackTrace();
            throw exp;
        }
    }


    /**
     * Provides data for Resource Pool people table "PMCResourcePoolPeople"
     *
     * @param context The Matrix Context object
     * @param args packed arguments by emxIndentedTable.jsp
     * @return MapList of the table data
     * @throws Exception if operation fails
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTableResourcePoolPeopleData(Context context, String[] args) throws MatrixException {
        try {

            Map programMap = (Map)JPO.unpackArgs(args);
            String strResourcePoolId = (String)programMap.get("objectId");

            final String SELECT_ATTRIBUTE_EMAIL_ADDRESS = "attribute[" + ATTRIBUTE_EMAIL_ADDRESS + "]";
           final String SELECT_REL_ATTRIBUTE_PROJECT_ROLE = "from["+RELATIONSHIP_LEAD_RESPONSIBILITY+"].attribute[" + ATTRIBUTE_PROJECT_ROLE + "]";
           final String SELECT_REL_ATTRIBUTE_PROJECT_ROLE_ID = "from["+RELATIONSHIP_LEAD_RESPONSIBILITY+"].fromtype.id";
            final String SELECT_PERSON_BUSINESS_SKILL = "from[" + RELATIONSHIP_HAS_BUSINESS_SKILL + "].to.name";
            //
            // Following code find the connected members recursively
            //
            DomainObject dmoResourcePool = DomainObject.newInstance(context, strResourcePoolId);

           String strRelationshipPattern = RELATIONSHIP_LEAD_RESPONSIBILITY + "," + RELATIONSHIP_MEMBER + ","+ RELATIONSHIP_DIVISION + "," + RELATIONSHIP_COMPANY_DEPARTMENT + "," + RELATIONSHIP_ORGANIZATION_PLANT + "," + RELATIONSHIP_SUBSIDIARY;
            String strTypePattern = TYPE_PERSON;

            StringList slBusSelect = new StringList();
            slBusSelect.add(SELECT_ID);
            slBusSelect.add(SELECT_NAME);
            slBusSelect.add(SELECT_ATTRIBUTE_EMAIL_ADDRESS);
            slBusSelect.add(SELECT_PERSON_BUSINESS_SKILL);

            StringList slRelSelect = new StringList();
            slRelSelect.add(DomainRelationship.SELECT_ID);
           slRelSelect.add(SELECT_REL_ATTRIBUTE_PROJECT_ROLE);

            boolean getTo = false;
            boolean getFrom = true;
            short recurseToLevel = 0;
            String strBusWhere = "";
            String strRelWhere = "";
            //String strRelWhere = " "SELECT_REL_ATTRIBUTE_PROJECT_ROLE_ID == "+strResourcePoolId+\";
          // String strRelWhere = ""+SELECT_REL_ATTRIBUTE_PROJECT_ROLE_ID+" == \"" + strResourcePoolId + "\"";
            MapList mlPersons = dmoResourcePool.getRelatedObjects(context,
                                                                                                    strRelationshipPattern, //pattern to match relationships
                                                                                                    strTypePattern, //pattern to match types
                                                                                                    slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                                                                    slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                                                                    getTo, //get To relationships
                                                                                                    getFrom, //get From relationships
                                                                                                    recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                                                                    strBusWhere, //where clause to apply to objects, can be empty ""
                                                                                                    strRelWhere); //where clause to apply to relationship, can be empty ""

            System.out.println("<<RVW>>::mlPersons = " + mlPersons);

            //
            // Find PMC users
            //
            String strPMCSymbolicRoles = EnoviaResourceBundle.getProperty(context, "eServiceSuiteProgramCentral.Roles");
            System.out.println("<<RVW>>::strPMCSymbolicRoles = " + strPMCSymbolicRoles);
            StringList slPMCSymbolicRoles = FrameworkUtil.split(strPMCSymbolicRoles, ",");
            System.out.println("<<RVW>>::slPMCSymbolicRoles = " + slPMCSymbolicRoles);


            String strRole = null;
            Role matrixRole = null;
            UserList assignments = null;

            StringList slPMCRoles = new StringList(slPMCSymbolicRoles.size());
            Set<String> roleSet = new HashSet<String>();
            for (Iterator itrPMCSymbolicRoles = slPMCSymbolicRoles.iterator(); itrPMCSymbolicRoles.hasNext();) {
                String strPMCSymbolicRole = (String) itrPMCSymbolicRoles.next();
                String strPMCRole = PropertyUtil.getSchemaProperty(context, strPMCSymbolicRole);
                System.out.println("<<RVW>>::strPMCRole = " + strPMCRole);

                StringList slChildRoles = ProgramCentralUtil.getRoleHierarchy(context, strPMCRole);
                System.out.println("<<RVW>>::slChildRoles = " + slChildRoles);
                roleSet.add(strPMCRole);
                roleSet.addAll(slChildRoles);
            }
            String loggedInUserName = context.getUser();
            MapList mlResult = new MapList();
            StringList personIds = new StringList();

            for (Iterator itrPerson = mlPersons.iterator(); itrPerson.hasNext();) {
                Map personInfoMap = (Map) itrPerson.next();
                String personId = (String)personInfoMap.get(SELECT_ID);
                String personName = (String)personInfoMap.get(SELECT_NAME);
                //context.setUser(personName);

                //To remove duplicate person entries from UI
                if(personIds.contains(personId)){
                    continue;
                }
                //Here for each person getAssignment is being called. This could be performance
                //issue. Need refactoring
                Vector<String> roles = PersonUtil.getAssignments(context, personName);
                System.out.println("<<RVW>>::roles = " + roles);

                for (Iterator itrRole = roles.iterator(); itrRole.hasNext();) {
                    String role = (String) itrRole.next();
                    if(roleSet.contains(role)){
                        mlResult.add(personInfoMap);
                        personIds.add(personId);
                        break;
                    }
                }
            }
            return mlResult;
        }
        catch(Exception exp) {
            exp.printStackTrace();
            throw new MatrixException(exp);
        }
    }

    /**
     * Gets the data for the column "FullName" for table "PMCResourcePoolPeople"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing
     * @throws Exception if operation fails
     */
    public Vector getColumnFullNameData(Context context, String[] args) throws Exception {
        try {
            // Create result vector
            Vector vecResult = new Vector();

            // Get object list information from packed arguments
            Map programMap = (Map) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");
            Map paramList = (Map) programMap.get("paramList");

            Map mapObjectInfo = null;

            // Do for each object
            String strPersonName = null;
            String strPersonFullName = null;
            String strObjectId="";
            for (Iterator itrObjects = objectList.iterator(); itrObjects.hasNext();) {
                mapObjectInfo = (Map) itrObjects.next();
                //[MODIFIED::Dec 30, 2010:s4e:R211:IR-020546V6R2012::Start]
                //Modified to get fullname only for type Person, because the column also displays Project name.
                strObjectId= (String)mapObjectInfo.get(SELECT_ID);
                if(null!=strObjectId && !"null".equalsIgnoreCase(strObjectId) && !"".equals(strObjectId))
                {
                    DomainObject objectDo = DomainObject.newInstance(context,strObjectId);
                    strPersonName = (String)mapObjectInfo.get(SELECT_NAME);
                    if(objectDo.isKindOf(context, TYPE_PERSON))
                    {
                        strPersonFullName = PersonUtil.getFullName(context, strPersonName);
                    }
                    else{
                        strPersonFullName=strPersonName;
                    }
                    vecResult.add(strPersonFullName);
                }
              //[MODIFIED::Dec 30, 2010:s4e:R211:IR-020546V6R2012::End]
            }
            return vecResult;
        } catch (Exception exp) {
            exp.printStackTrace();
            throw exp;
        }
    }

    /**
     * Gets the data for the column "Email" for table "PMCResourcePoolPeople"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing
     * @throws Exception if operation fails
     */
    public Vector getColumnEmailData(Context context, String[] args) throws Exception {
        try {
            // Create result vector
            Vector vecResult = new Vector();

            // Get object list information from packed arguments
            Map programMap = (Map) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");
            Map paramList = (Map) programMap.get("paramList");

            final String SELECT_ATTRIBUTE_EMAIL_ADDRESS = "attribute[" + ATTRIBUTE_EMAIL_ADDRESS + "]";

            Map mapObjectInfo = null;

            // Do for each object
            StringBuffer strEmailHTML = null;
            String strEmail = null;
            for (Iterator itrObjects = objectList.iterator(); itrObjects.hasNext();)
            {
                mapObjectInfo = (Map) itrObjects.next();
                strEmail = (String)mapObjectInfo.get(SELECT_ATTRIBUTE_EMAIL_ADDRESS);

                strEmailHTML = new StringBuffer(64);
                if(null == strEmail  || "null".equals(strEmail))
                {
                    strEmail = "";
                }
                strEmailHTML.append("<a href=\"mailto:").append(strEmail).append("\">").append(strEmail).append("</a>");

                vecResult.add(strEmailHTML.toString());
            }
            return vecResult;
        } catch (Exception exp) {
            exp.printStackTrace();
            throw exp;
        }
    }

    /**
     * This Method is used to show the Resource Pool Category(Tree)- Business Unit Data.
     * Provides data for Resource Pool people table "PMCResourcePoolBusinessUnits"
     * This Method is also used for expanding the "PMCResourcePoolBusinessUnits" table.
     * @param context
     * @param args
     * @return MapList
     * @throws MatrixException
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTableResourcePoolBusinessUnitData(Context context, String[] args) throws MatrixException
    {
        try
        {
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }
            Map programMap = (Map)JPO.unpackArgs(args);
            String strParentResourcePoolId = (String)programMap.get("objectId");
            String strRelPattern = RELATIONSHIP_DIVISION;
            boolean getTo = false;
            boolean getFrom = true;

            final String SELECT_RESOURCE_MANAGERS_NAME = "from["+DomainConstants.RELATIONSHIP_RESOURCE_MANAGER+"].to.name";

            String strTypePattern = TYPE_BUSINESS_UNIT;

            StringList slBusSelect = new StringList();
            slBusSelect.add(DomainConstants.SELECT_ID);
            slBusSelect.add(SELECT_RESOURCE_MANAGERS_NAME);//Reqd to find resource managers

            StringList slRelSelect = new StringList();

            short recurseToLevel = 1;
            String strBusWhere = "";
            String strRelWhere = "";

            DomainObject dmoResourcePool = DomainObject.newInstance(context, strParentResourcePoolId);
            MapList mlResourcePoolBusinessUnits = dmoResourcePool.getRelatedObjects(context,
                                                                          strRelPattern, //pattern to match relationships
                                                                          strTypePattern, //pattern to match types
                                                                          slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                                          slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                                          getTo, //get To relationships
                                                                          getFrom, //get From relationships
                                                                          recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                                          strBusWhere, //where clause to apply to objects, can be empty ""
                                                                          strRelWhere); //where clause to apply to relationship, can be empty ""
           Map mapResourcePoolBusinessUnits = null;
           Object objValue = null;
           StringList slValue = null;
           String strValue = "";
           MapList mlFilteredResourcePoolBusinessUnits = new MapList();
           for (Iterator itrResourcePools = mlResourcePoolBusinessUnits.iterator(); itrResourcePools.hasNext();)
           {
               mapResourcePoolBusinessUnits = (Map) itrResourcePools.next();
               objValue = mapResourcePoolBusinessUnits.get(SELECT_RESOURCE_MANAGERS_NAME);
               //check if resource managers are present then only show this business unit
               if (objValue != null)
               {
                   if (objValue instanceof String) {
                       strValue = (String)objValue;
                       mapResourcePoolBusinessUnits.put("Resource_Managers", strValue);
                   }
                   else if (objValue instanceof StringList) {
                       slValue = (StringList)objValue;
                       mapResourcePoolBusinessUnits.put("Resource_Managers", FrameworkUtil.join(slValue, ","));
                   }
                   mlFilteredResourcePoolBusinessUnits.add(mapResourcePoolBusinessUnits);
               }
           }
           return mlFilteredResourcePoolBusinessUnits;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }
    }

    /**
     * This Method is used to show the Resource Pool Category(Tree)- Department Data.
     * Provides data for Resource Pool people table "PMCResourcePoolDepartments"
     * @param context Matrix context Object
     * @param args String array
     * @return maplist  information about resource pool departments
     * @throws MatrixException
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTableResourcePoolDepartmentData(Context context, String[] args) throws MatrixException
    {
        try
        {
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }

            Map programMap = (Map)JPO.unpackArgs(args);
            String strParentResourcePoolId = (String)programMap.get("objectId");
            String strRelPattern = RELATIONSHIP_COMPANY_DEPARTMENT;
            boolean getTo = false;
            boolean getFrom = true;

            final String SELECT_RESOURCE_MANAGERS_NAME = "from["+RELATIONSHIP_RESOURCE_MANAGER+"].to.name";

            String strTypePattern = TYPE_DEPARTMENT;

            StringList slBusSelect = new StringList();
            slBusSelect.add(DomainConstants.SELECT_ID);
            slBusSelect.add(SELECT_RESOURCE_MANAGERS_NAME);//Reqd to find resource managers

            StringList slRelSelect = new StringList();

            short recurseToLevel = 1;
            String strBusWhere = "";
            String strRelWhere = "";

            DomainObject dmoObject = DomainObject.newInstance(context, strParentResourcePoolId);
            MapList mlResourcePoolDepartments = dmoObject.getRelatedObjects(context,
                                                                          strRelPattern, //pattern to match relationships
                                                                          strTypePattern, //pattern to match types
                                                                          slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                                          slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                                          getTo, //get To relationships
                                                                          getFrom, //get From relationships
                                                                          recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                                          strBusWhere, //where clause to apply to objects, can be empty ""
                                                                          strRelWhere); //where clause to apply to relationship, can be empty ""
            Map mapResourcePoolDepartments = null;
            Object objValue = null;
            String strValue = "";
            StringList slValue = null;
            MapList mlFilteredResourcePoolDepartments = new MapList();
            for (Iterator itrResourcePools = mlResourcePoolDepartments.iterator(); itrResourcePools.hasNext();)
            {
                mapResourcePoolDepartments = (Map) itrResourcePools.next();
                objValue = mapResourcePoolDepartments.get(SELECT_RESOURCE_MANAGERS_NAME);
                //check if resource managers are present then only show this Department
                if (objValue != null)
                {
                    if (objValue instanceof String) {
                        strValue = (String)objValue;
                        mapResourcePoolDepartments.put("Resource_Managers", strValue);
                    }
                    else if (objValue instanceof StringList) {
                        slValue = (StringList)objValue;
                        mapResourcePoolDepartments.put("Resource_Managers", FrameworkUtil.join(slValue, ","));
                    }
                    mlFilteredResourcePoolDepartments.add(mapResourcePoolDepartments);
                }
            }
            return mlFilteredResourcePoolDepartments;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }
    }

   /**
    * Returns info about all peoples associated to resource Request when navigates to Request Tree
    * @param context Matrix context object
    * @param args String array
    * @return MapList of allocated peoples to request
    * @throws MatrixException
     */


    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTableResourceRequestPeopleData(Context context,String[] args) throws MatrixException
    {
        try{
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }

            Map programMap = (Map)JPO.unpackArgs(args);
            String strResourceRequestId = (String)programMap.get("objectId");
            DomainObject dmoResourceRequest = DomainObject.newInstance(context, strResourceRequestId);

            final String SELECT_ATTRIBUTE_EMAIL_ADDRESS = "attribute[" + ATTRIBUTE_EMAIL_ADDRESS + "]";

            String strRelationshipPattern = DomainConstants.RELATIONSHIP_ALLOCATED;
            String strTypePattern = DomainConstants.TYPE_PERSON;

            StringList slBusSelect = new StringList();
            slBusSelect.add(SELECT_ID);
            slBusSelect.add(SELECT_NAME);
            slBusSelect.add(SELECT_ATTRIBUTE_EMAIL_ADDRESS);

            StringList slRelSelect = new StringList();
            slRelSelect.add(DomainRelationship.SELECT_ID);
            boolean getTo = false;
            boolean getFrom = true;
            short recurseToLevel = 1;
            String strBusWhere = "";
            String strRelWhere = "";

            MapList mlResourceRequestPeoples = dmoResourceRequest.getRelatedObjects(context,
                                                                                            strRelationshipPattern, //pattern to match relationships
                                                                                            strTypePattern, //pattern to match types
                                                                                            slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                                                            slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                                                            getTo, //get To relationships
                                                                                            getFrom, //get From relationships
                                                                                            recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                                                            strBusWhere, //where clause to apply to objects, can be empty ""
                                                                                            strRelWhere); //where clause to apply to relationship, can be empty ""


            return mlResourceRequestPeoples;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }
    }

  /**
   * Returns skill associated to resource Request
   * @param context
   * @param args
   * @return
   * @throws MatrixException
    */

    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getResourceRequestSkills(Context context,String[] args) throws MatrixException
    {
        try
        {
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }

            Map programMap = (Map)JPO.unpackArgs(args);
            String strResourceRequestId = (String)programMap.get("objectId");
            DomainObject dmoObject = DomainObject.newInstance(context, strResourceRequestId);

            String strRelationshipPattern = DomainConstants.RELATIONSHIP_RESOURCE_REQUEST_SKILL;
            String strTypePattern = DomainConstants.TYPE_BUSINESS_SKILL;

            StringList slBusSelect = new StringList();
            slBusSelect.add(DomainObject.SELECT_ID);
            slBusSelect.add(DomainObject.SELECT_NAME);

            StringList slRelSelect = new StringList();
            slRelSelect.add(DomainRelationship.SELECT_ID);

            boolean getTo = false;
            boolean getFrom = true;
            short recurseToLevel = 1;
            String strBusWhere = "";
            String strRelWhere = "";

            MapList mlRelatedObjects = dmoObject.getRelatedObjects(context,
                                                                                            strRelationshipPattern, //pattern to match relationships
                                                                                            strTypePattern, //pattern to match types
                                                                                            slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                                                            slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                                                            getTo, //get To relationships
                                                                                            getFrom, //get From relationships
                                                                                            recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                                                            strBusWhere, //where clause to apply to objects, can be empty ""
                                                                                            strRelWhere); //where clause to apply to relationship, can be empty ""
            Map mapRelatedObjectInfo = null;
            String strBusinessSkill = null;
            StringList slBusinessSkills = new StringList();
            for (Iterator itrRelatedObjects = mlRelatedObjects.iterator(); itrRelatedObjects.hasNext();)
            {
                mapRelatedObjectInfo = (Map) itrRelatedObjects.next();
                strBusinessSkill = (String)mapRelatedObjectInfo.get(DomainObject.SELECT_NAME);
                slBusinessSkills.add(strBusinessSkill);
            }
            return mlRelatedObjects;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }
    }

  /**This will list all active projects(create,assign,active,review) for users in resource pool
     *
   * @param context The Matrix Context Object.
   * @param args String array
   * @return MapList of all active projects
   * @throws MatrixException
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getTableExpandChildPeopleProjectData(Context context,String[] args)throws MatrixException
    {
        try
        {
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }

            Map programMap = (Map)JPO.unpackArgs(args);
            String strResourceId = (String)programMap.get("objectId");
            DomainObject dmoObject = DomainObject.newInstance(context, strResourceId);

            String strRelationshipPattern = RELATIONSHIP_MEMBER ;
            String strTypePattern = TYPE_PROJECT_SPACE;

            StringList slBusSelect = new StringList();
            slBusSelect.add(SELECT_ID);
            slBusSelect.add(SELECT_NAME);
            slBusSelect.add(SELECT_CURRENT);

            StringList slRelSelect = new StringList();
            slRelSelect.add(DomainRelationship.SELECT_ID);

            boolean getTo = true;
            boolean getFrom = false;
            short recurseToLevel = 1;
          //String strBusWhere = "DomainObject.SELECT_CURRENT~~DomainConstants.STATE_PROJECT_SPACE_ACTIVE";
            String strBusWhere = "";
            String strRelWhere = "";

            MapList mlPeoplesProject = dmoObject.getRelatedObjects(context,
                                                                                            strRelationshipPattern, //pattern to match relationships
                                                                                            strTypePattern, //pattern to match types
                                                                                            slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                                                            slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                                                            getTo, //get To relationships
                                                                                            getFrom, //get From relationships
                                                                                            recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                                                            strBusWhere, //where clause to apply to objects, can be empty ""
                                                                                            strRelWhere); //where clause to apply to relationship, can be empty ""
            Map mapRelatedObjectInfo = null;
            String strProjectName = null;
            String strProjectId = null;
            String strCurrentState = null;
            boolean isInActiveProject = false;
            for (Iterator itrProjects = mlPeoplesProject.iterator(); itrProjects.hasNext();)
            {
                mapRelatedObjectInfo = (Map) itrProjects.next();
                strCurrentState = (String)mapRelatedObjectInfo.get(SELECT_CURRENT);
                strProjectName = (String)mapRelatedObjectInfo.get(SELECT_NAME);
                strProjectId = (String) mapRelatedObjectInfo.get(SELECT_ID);
                isInActiveProject = PolicyUtil.checkState(context,strProjectId,STATE_PROJECT_SPACE_COMPLETE,PolicyUtil.GE);
                if (isInActiveProject)
                {
                    itrProjects.remove();
                }
            }
            return mlPeoplesProject;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }

    }
    /**
     * Returns the Organizational Roles for Resource Pool Peoples
     *
     * @param context The Matrix Context.
     * @param args holds object id list and parameter list
     * @return a Vector of Organizational Role values
     *
     */
    public Vector getColumnOrganizationalRolesData(Context context, String[] args)throws Exception
    {
        try
        {

            // Create result vector
            Vector vecResult = new Vector();

            // Get object list information from packed arguments
            Map programMap = (Map) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");
            Map paramList = (Map) programMap.get("paramList");

            Map mapObjectInfo = null;

            // Do for each object
            String strPersonName = null;
            String strPersonRoleName = null;
            String strRelId =  null;
            for (Iterator itrObjects = objectList.iterator(); itrObjects.hasNext();)
            {
                mapObjectInfo = (Map) itrObjects.next();
                strPersonName = (String)mapObjectInfo.get(SELECT_NAME);
//                strRelId = (String)mapObjectInfo.get(DomainRelationship.SELECT_ID);
//
//                strPersonRoleName = Organization.getMemberRolesAsString(context,strRelId);
//                vecResult.add(strPersonRoleName);

                //made consistent logic with Company->People->OrganizationalRoles column
                Iterator it = PersonUtil.getAssignments(context,strPersonName).iterator();
                HashSet<String> rolesList = new HashSet<String>();

                while(it.hasNext()){
                    String roleName = it.next().toString() ;
                    if((roleName.matches("([\\w\\s+]+)\\.([\\w\\s+-]+)\\.([\\w\\s+-]+)") || roleName.equalsIgnoreCase(strPersonName))){
                        continue;
                    }else if (roleName.startsWith("ctx::")){
                        String[] ctxParts = roleName.split("::");
                        String[] ctxOtherParts = ctxParts[1].split("\\.");
                        roleName = ctxOtherParts[0];
            }
                    roleName = i18nNow.getRoleI18NString(roleName.trim() ,context.getSession().getLanguage());
                    rolesList.add(roleName);
                }
                vecResult.add(rolesList.stream().collect(Collectors.joining(", ")));
            }

            return vecResult;
        }
        catch (Exception exp)
        {
            exp.printStackTrace();
            throw exp;
        }
        }


/**
 *  This will return Project roles to the persons in resource Pool.
 *
 * @param context Matrix Context Object
 * @param args String array
 * @return vector corresponding Project roles
 * @throws MatrixException
 */

    public Vector getColumnProjectRolesData(Context context,String[] args) throws Exception
    {
        Map programMap = (Map) JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");

        Map mapObjectInfo = null;

        // Do for each object
        String strProjectRole = null;
        String strRelId =  null;
        String strObjectId =  null;
        Vector vecResult = new Vector();


        for (Iterator itrObjects = objectList.iterator(); itrObjects.hasNext();)
        {
            mapObjectInfo = (Map) itrObjects.next();
            strObjectId = (String)mapObjectInfo.get(SELECT_ID);
            strRelId = (String)mapObjectInfo.get(DomainRelationship.SELECT_ID);
            DomainRelationship dmoRelationship = new DomainRelationship(strRelId);
            strProjectRole = dmoRelationship.getAttributeValue(context, ATTRIBUTE_PROJECT_ROLE);
            DomainObject dmoObject = newInstance(context,strObjectId);

            String roleTranslated = i18nNow.getRoleI18NString(strProjectRole, context.getSession().getLanguage());

            if (dmoObject.isKindOf(context, TYPE_PERSON))
            {
                vecResult.add(EMPTY_STRING);
            }
            else if(dmoObject.isKindOf(context,TYPE_PROJECT_SPACE))
            {
                vecResult.add(roleTranslated);
            }
        }
        return vecResult;

    }


    /**
     * Returns the Lead roles for Resource Pool Peoples in that Organization
     *
     * @param context The Matrix Context.
     * @param args holds object id list and parameter list
     * @return a Vector of Lead role values
     *
     */
    public Vector getColumnLeadRolesData(Context context, String[] args)throws Exception
    {
        try
        {
            Map programMap = (Map) JPO.unpackArgs(args);

            MapList objectList = (MapList) programMap.get("objectList");
            Map mapParamMap = (Map) programMap.get("paramList");
            String strOrganizationId = (String) mapParamMap.get("objectId");
            Map mapObjectInfo = null;
            final String SELECT_REL_ATTRIBUTE_LEAD_ROLE = "from["+RELATIONSHIP_LEAD_RESPONSIBILITY+"].attribute[" + ATTRIBUTE_PROJECT_ROLE + "]";
            final String SELECT_REL_ATTRIBUTE_PERSON_ID = "from["+RELATIONSHIP_LEAD_RESPONSIBILITY+"].to.id";
            // Do for each object
            Vector vecResult = new Vector();

            Map mapLeadRolePersonId = null;

            String strObjectId = null;
            String [] strOrganizationIds = new String[1];
            strOrganizationIds[0] = strOrganizationId;
            DomainObject dmoObject;
            StringList slSelectList = new StringList();
            slSelectList.add(SELECT_REL_ATTRIBUTE_LEAD_ROLE);
            slSelectList.add(SELECT_REL_ATTRIBUTE_PERSON_ID);

            BusinessObjectWithSelectList bos = BusinessObject.getSelectBusinessObjectData(context, strOrganizationIds, slSelectList);
            BusinessObjectWithSelect bows = null;
            Map mapQueryWithDataList = new HashMap();
            StringList slPersonId = new StringList();
            StringList slLeadRole = new StringList();

            for(BusinessObjectWithSelectItr itr= new BusinessObjectWithSelectItr(bos); itr.next();)
            {
                bows = itr.obj();
                slPersonId = (StringList)bows.getSelectDataList(SELECT_REL_ATTRIBUTE_PERSON_ID);
                slLeadRole = (StringList)bows.getSelectDataList(SELECT_REL_ATTRIBUTE_LEAD_ROLE);
            }
            for (Iterator itrObjects = objectList.iterator(); itrObjects.hasNext();)
            {
                mapObjectInfo = (Map) itrObjects.next();
                strObjectId = (String)mapObjectInfo.get(SELECT_ID);
                dmoObject = newInstance(context,strObjectId);

                if (dmoObject.isKindOf(context,TYPE_PERSON))
                {
                    if(null!=slPersonId && slPersonId.contains(strObjectId))
                    {
                        int nIndex = slPersonId.indexOf(strObjectId);
                        String strLeadRole = (String)slLeadRole.get(nIndex);
                        StringList slSplitLeadRole = FrameworkUtil.split(strLeadRole, "~");
                        StringList sli18LeadRole = new StringList();
                        for(int i=0;i<slSplitLeadRole.size();i++)
                        {
                            String strNLeadRole = "";
                            String roleSymbolic = (String)slSplitLeadRole.get(i);
                        String roleName = PropertyUtil.getSchemaProperty(context,roleSymbolic);

                            String roleTranslated = i18nNow.getRoleI18NString(roleName, context.getSession().getLanguage());
                            if (roleTranslated != null && roleTranslated.length() > 0)
                            {
                                sli18LeadRole.add(roleTranslated);
                            }
                            else
                            {
                                sli18LeadRole.add(roleName);
                            }
                        }
                        strLeadRole = FrameworkUtil.join(sli18LeadRole, ",");
                        vecResult.add(strLeadRole);
                    }
                    else
                    {
                        vecResult.add(EMPTY_STRING);
                    }
                }
                else
                {
                    vecResult.add(EMPTY_STRING);
                }
            }

            return vecResult;
        }
        catch (Exception exp)
        {
            exp.printStackTrace();
            throw exp;
        }
        }

   /**Returns all peoples assigned as Resource managers to Resource Pools in Resource pool summary table.
    *
    * @param context Matrix context Object
    * @param args array of String
    * @return StringList of Resource managers
    * @throws Exception if operation fails
     */
    public StringList getAllResourceManagers(Context context,String[] args)throws Exception
    {
        try
        {
            final String SELECT_RESOURCE_MANAGERS_NAME = "to.name";
            String strRelPattern = RELATIONSHIP_RESOURCE_MANAGER;
            String strVaultPattern = context.getVault().getName();
            String strRelExpression = "";
            short nObjectLimit = 0;
            StringList slSelectStmts = new StringList();
            StringList slOrderBy = new StringList();
            String strContextUser = context.getUser();
            slSelectStmts.add(SELECT_RESOURCE_MANAGERS_NAME);

            RelationshipWithSelectList relationshipWithSelectList = Relationship.query(context,
                                                                                                                strRelPattern,
                                                                                                                strVaultPattern,
                                                                                                                strRelExpression,
                                                                                                                nObjectLimit,
                                                                                                                slSelectStmts,
                                                                                                                slOrderBy);
            RelationshipWithSelect relationshipWithSelect = null;
            String strResourceManager = null;

            StringList slResourceManager = new StringList();

            for (RelationshipWithSelectItr relationshipWithSelectItr = new RelationshipWithSelectItr(relationshipWithSelectList);relationshipWithSelectItr.next();)
            {
                relationshipWithSelect = relationshipWithSelectItr.obj();
                strResourceManager = relationshipWithSelect.getSelectData(SELECT_RESOURCE_MANAGERS_NAME);
                //strResourceManager = PersonUtil.getFullName(context, strResourceManager);
                if(!slResourceManager.contains(strResourceManager))
                {
                    slResourceManager.add(strResourceManager);
                }
            }
            if (slResourceManager.contains(strContextUser))
            {
                slResourceManager.remove(strContextUser);
                slResourceManager.insertElementAt(strContextUser,0);
            }
            String allProjects = ProgramCentralUtil.i18nStringNow("emxProgramCentral.Common.All",context.getSession().getLanguage());
            slResourceManager.add(allProjects);
            return slResourceManager;
        }
        catch (Exception exp)
        {
            exp.printStackTrace();
            throw exp;
        }


    }

    /**
     * Access method to show Resource Manager filed on Company /Business Unit properties webform
     *
     * @param context
     * @param args
     * @return boolean value
     * @throws Exception if the operation fails
     * @since V6R2009x
     */
    public boolean isPMCInstalled(Context context, String[] args) throws Exception
    {
        return FrameworkUtil.isSuiteRegistered(context,"appVersionProgramCentral",false,null,null);
    }


/**
     * Access method to show/hide Column "Lead Role" in Table PMCResourcePoolPeople
 *
 * @param context Matrix Context Object
 * @param args
 * @return boolean value
 * @throws Exception if operation fails
     */
   public boolean isResourcePoolPeopleTable(Context context, String[] args) throws Exception
   {
       Map programMap = (Map)JPO.unpackArgs(args);
       String strObjId = (String) programMap.get("objectId");
       String strRelId = (String) programMap.get("relId");
       DomainObject dmoObject = DomainObject.newInstance(context, strObjId);
       return dmoObject.isKindOf(context, TYPE_ORGANIZATION);

   }

   /**used to avoid allocated peoples in search while adding to Resource Request
    *
    * @param context Matrix Context Object
    * @param args String array
    * @return StringList for person objects to be excluded
    * @throws Exception
    */
   @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
   public StringList getExcludeOIDForAddResourcesSearch(Context context, String[] args) throws Exception {
           try
       {   /*
            * Exclude list will contain all the person who are having Non PMC role and who
            * are already allocated to the list.
            */
           Map programMap = (Map)JPO.unpackArgs(args);
           //String strResourcePoolId = (String)programMap.get("objectId");

           String strFieldValue = (String)programMap.get("field");
           String strResourcePoolId = (String) FrameworkUtil.split(strFieldValue, "=").lastElement();

           String strRequestIdInfo = (String)programMap.get("requestId");
            DomainObject resourcePoolObject = DomainObject.newInstance(context,strResourcePoolId);
            DomainObject requestObject = null;
            if(ProgramCentralUtil.isNotNullString(strRequestIdInfo)){
           StringList slRequestTokens = FrameworkUtil.split(strRequestIdInfo, "|");
           String strRequestId = (String) slRequestTokens.get(0);
                requestObject = DomainObject.newInstance(context,strRequestId);
            }

           String strRelationshipPatternAllocated = DomainConstants.RELATIONSHIP_ALLOCATED;
           String strRelationshipPatternMember = DomainConstants.RELATIONSHIP_MEMBER;
           String strTypePattern = DomainConstants.TYPE_PERSON;

            String relAssignedSecurityContext = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_AssignedSecurityContext);
            String relSecurityContextRole = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_SecurityContextRole);
           StringList slBusSelect = new StringList();
           slBusSelect.add(DomainObject.SELECT_ID);
            slBusSelect.add(DomainObject.SELECT_NAME);
            slBusSelect.add(DomainObject.SELECT_CURRENT);
            String roleSelectExpression = "from[" + relAssignedSecurityContext + "].to.from[" + relSecurityContextRole + "].to.name";
            slBusSelect.add(roleSelectExpression);
           StringList slRelSelect = new StringList();
           slRelSelect.add(DomainRelationship.SELECT_ID);

           boolean getTo = false;
           boolean getFrom = true;
           short recurseToLevel = 1;
            //Exclude Inactive users
            String strBusWhere = DomainObject.EMPTY_STRING;
           String strRelWhere = DomainObject.EMPTY_STRING;

           // To get All the people in pool
            MapList resourceInfoList = resourcePoolObject.getRelatedObjects(context,
                                                           strRelationshipPatternMember, //pattern to match relationships
                                                           strTypePattern, //pattern to match types
                                                           slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                           slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                           getTo, //get To relationships
                                                           getFrom, //get From relationships
                                                           recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                           strBusWhere, //where clause to apply to objects, can be empty ""
                                                           strRelWhere, //where clause to apply to relationship, can be empty ""
                                                           0);

           StringList slNonPMCPersonIds = new StringList();
            String personId = DomainConstants.EMPTY_STRING;
            String current = DomainConstants.EMPTY_STRING;
            // All the people who are in pool without PMC role put in slNonPMCPersonIds.these will be excluded
            StringList validRoles = new StringList();
            validRoles.add(ProgramCentralConstants.ROLE_PROJECT_LEAD);
            validRoles.add(ProgramCentralConstants.ROLE_PROJECT_USER);
            validRoles.add(ProgramCentralConstants.ROLE_VPLM_PROJECT_LEADER);
            validRoles.add(ProgramCentralConstants.ROLE_VPLM_VIEWER);
            validRoles.add(ProgramCentralConstants.PROJECT_ROLE_PUBLIC_READER);
            validRoles.add(ProgramCentralConstants.PROJECT_ROLE_RESTRICTED_READER);

            for (Iterator itrResourceInfoList = resourceInfoList.iterator(); itrResourceInfoList.hasNext();){
                Map resourceInfo = (Map)itrResourceInfoList.next();
                personId = (String)resourceInfo.get(ProgramCentralConstants.SELECT_ID);
                current = (String)resourceInfo.get(ProgramCentralConstants.SELECT_CURRENT);

                //If a Person is Inactive, exclude it.
                if(!ProgramCentralConstants.STATE_PERSON_ACTIVE.equals(current)){
                    slNonPMCPersonIds.add(personId);
                    continue;
                }

                Object objRoles = resourceInfo.get(roleSelectExpression);
                if (objRoles instanceof String) {
                    String role = (String) objRoles;
                    if(!validRoles.contains(role)){
                        slNonPMCPersonIds.add(personId);
                    }
                }else if (objRoles instanceof StringList) {
                    StringList roles = (StringList) objRoles;
                    boolean isValidUser = false;
                    for (Iterator itrRoles = roles.iterator(); itrRoles.hasNext();) {
                        String role = (String) itrRoles.next();
                        if(validRoles.contains(role)){
                            isValidUser = true;
                            break;
                        }
                    }
                    if(!isValidUser){
                        slNonPMCPersonIds.add(personId);
                    }
               }else if (objRoles == null) {
				   slNonPMCPersonIds.add(personId);
			   }
           }

            //Find already-connected resource to Resource request
            if(requestObject == null){
                return slNonPMCPersonIds;
            }
           MapList mlRelatedObjects = requestObject.getRelatedObjects(context,
                                                                               strRelationshipPatternAllocated, //pattern to match relationships
                                                                               strTypePattern, //pattern to match types
                                                                               slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                                               slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                                               getTo, //get To relationships
                                                                               getFrom, //get From relationships
                                                                               recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                                               strBusWhere, //where clause to apply to objects, can be empty ""
                                                                               strRelWhere, //where clause to apply to relationship, can be empty ""
                                                                               0);

           //all those who are already allocated will also be excluded.
            Map mapRelatedObjectInfo = null;
            for (Iterator itrRelatedObjects = mlRelatedObjects.iterator(); itrRelatedObjects.hasNext();){
               mapRelatedObjectInfo = (Map) itrRelatedObjects.next();
                personId = (String)mapRelatedObjectInfo.get(DomainObject.SELECT_ID);
                slNonPMCPersonIds.add(personId);
           }
           return slNonPMCPersonIds;
   }
   catch(Exception exp)
   {
       exp.printStackTrace();
       throw new MatrixException(exp);
   }

   }

   /**
    * Gets the data for the column "Business Skill" for table "PMCResourcePoolPeople"
    *
    * @param context The matrix context object
    * @param args The arguments, it contains objectList and paramList maps
    * @return The Vector object containing Business Skill of selected peoples
    * @throws Exception if operation fails
    */
   public Vector getColumnPeopleSkillData(Context context, String[] args) throws Exception
   {
       try {
           // Create result vector
           Vector vecResult = new Vector();
           final String SELECT_PERSON_BUSINESS_SKILL = "from[" + RELATIONSHIP_HAS_BUSINESS_SKILL + "].to.name";
           // Get object list information from packed arguments
           Map programMap = (Map) JPO.unpackArgs(args);
           MapList objectList = (MapList) programMap.get("objectList");
           Map paramList = (Map) programMap.get("paramList");

           Map mapObjectInfo = null;

           // Do for each object
           String strPersonSkill = null;
           StringList slPersonSkill = null;
           Object objSkill = null;
           for (Iterator itrObjects = objectList.iterator(); itrObjects.hasNext();)
           {
               mapObjectInfo = (Map) itrObjects.next();
               objSkill = mapObjectInfo.get(SELECT_PERSON_BUSINESS_SKILL);

               if(objSkill == null ||"".equals(objSkill) ||"null".equals(objSkill))
               {
                   vecResult.add(DomainConstants.EMPTY_STRING);
               }

               else if (objSkill instanceof String)
               {
                   strPersonSkill  = (String)mapObjectInfo.get(SELECT_PERSON_BUSINESS_SKILL);
                   vecResult.add(strPersonSkill);
               }
               else if (objSkill instanceof StringList)
               {
                   StringList slAllSkills = new StringList();
                   slPersonSkill = (StringList) mapObjectInfo.get(SELECT_PERSON_BUSINESS_SKILL);
                   for (int i = 0; i < slPersonSkill.size(); i++)
                   {
                       strPersonSkill = (String)slPersonSkill.get(i);
                       slAllSkills.add(strPersonSkill);
                   }
                   vecResult.add(FrameworkUtil.join(slAllSkills, ", "));
               }
           }
           return vecResult;
       }
       catch (Exception exp)
       {
           exp.printStackTrace();
           throw exp;
       }
   }
  /**
   * Assign (connect) selected Peoples from Resource Pool  to given project
   *
   * @param context Matrix Context object.
   * @param args packed String array which will contain ProjectId,Project Role of Person and stringList of peoples to be assigned .
   * @throws MatrixException if operation fails.
   */
   public void assignPeoplesToProjectSpace(Context context,String[] args) throws MatrixException
   {
       try
       {
           if (context == null)
           {
               throw new MatrixException("Illegal Argument Exception context");
           }
           Map mapPeoplesToConnect = (Map)JPO.unpackArgs(args);

           StringList strProjectIds = (StringList) mapPeoplesToConnect.get("ProjectIds");

           String strProjectRole = (String) mapPeoplesToConnect.get("ProjectRole");
           StringList slPeoplesToAssign = (StringList) mapPeoplesToConnect.get("PeoplesToassign");

           final String SELECT_PROJECT_MEMBER_IDS ="from["+RELATIONSHIP_MEMBER+"].to.id";

           StringList slProjectMemberIds = new StringList();

           DomainObject dmoProject;
           String strProjectId = "";
           boolean IfAppropriateState = false;
           StringList slTobeMembers = null;
           for (int i = 0; i < strProjectIds.size(); i++)
           {
               strProjectId = (String) strProjectIds.get(i);
               slTobeMembers = new StringList();
               IfAppropriateState = PolicyUtil.checkState(context,strProjectId,STATE_PROJECT_SPACE_COMPLETE,PolicyUtil.LE);

               if (IfAppropriateState)
               {
                   dmoProject = DomainObject.newInstance(context,strProjectId);
                   slProjectMemberIds= dmoProject.getInfoList(context, SELECT_PROJECT_MEMBER_IDS);

                   for(int j=0; j<slPeoplesToAssign.size(); j++)
                   {
                        if(!slProjectMemberIds.contains((String)slPeoplesToAssign.get(j)))
                        {
                            slTobeMembers.add((String)slPeoplesToAssign.get(j));
                        }
                   }

                   String[] strTobeMembers = (String[]) slTobeMembers.toArray(new String[slTobeMembers.size()]);

                   DomainRelationship.connect(context,dmoProject,RELATIONSHIP_MEMBER,true,strTobeMembers);

        //            commented for not overriding the existing roles for earlier Request
                   //              for (int i = 0; i < strPeoplesToAssign.length; i++)
                   //              {
                   //                  String strRelId = (String) mapConnectionInfo.get(strPeoplesToAssign[i]);
                   //                  DomainRelationship.setAttributeValue(context, strRelId, ATTRIBUTE_PROJECT_ROLE, strProjectRole);
                   //              }
               }
               else
               {
                   String strTxtNotice = EnoviaResourceBundle.getProperty(context, "ProgramCentral",
                            "emxProgramCentral.ProjectSpace.Notice.CantAddPersons.NotInAppropriateState", context.getSession().getLanguage());
                   throw new MatrixException(strTxtNotice);
               }
           }


       }
       catch(Exception ex)
       {
           ex.printStackTrace();
           throw new MatrixException(ex);
       }

   }
   /**
    * Assign (connect) selected Peoples from Resource Pool People to given Resource Request
    *
    * @param context Matrix Context object.
    * @param args packed String array which will contain ResourceRequestId and Stringlist of peoples to be assigned.
    * @throws MatrixException if operation fails.
    */
    public void assignPeoplesToResourceRequest(Context context,String[] args) throws MatrixException
    {
        try
        {
            if (context == null)
            {
                throw new MatrixException("Illegal Argument Exception context");
            }
            Map mapPeoplesToConnect = (Map)JPO.unpackArgs(args);
            final String SELECT_REL_FROM_ALLOCATED_PERSON_ID = "from["+DomainConstants.RELATIONSHIP_ALLOCATED+"].businessobject."+DomainConstants.SELECT_ID;
            final String SELECT_REL_RESOURCE_PLAN_ATTRIBUTE_FTE = "to["+DomainConstants.RELATIONSHIP_RESOURCE_PLAN+"].attribute["+DomainConstants.ATTRIBUTE_FTE+"].value";
            final String SELECT_REL_FROM_ALLOCATED_ATTRIBUTE_FTE = "from["+DomainConstants.RELATIONSHIP_ALLOCATED+"].attribute["+DomainConstants.ATTRIBUTE_FTE+"].value";

            String strResourceRequestId = (String) mapPeoplesToConnect.get("ResourceRequestId");
            StringList slPeoplesToAssign = (StringList) mapPeoplesToConnect.get("PeoplesToAssign");
            StringList slPeopleToAssignListCheck = new StringList();
            slPeopleToAssignListCheck.addAll(slPeoplesToAssign);

            StringList slSelectList = new StringList();
            slSelectList.add(SELECT_REL_RESOURCE_PLAN_ATTRIBUTE_FTE);
            slSelectList.add(SELECT_CURRENT);
            slSelectList.add(SELECT_REL_FROM_ALLOCATED_PERSON_ID);
            slSelectList.add(SELECT_REL_FROM_ALLOCATED_ATTRIBUTE_FTE);
            String[] strRequestIds = new String[1];
            strRequestIds[0] = strResourceRequestId;
            String strRequestState = "";
            BusinessObjectWithSelectList resourceRequestObjWithSelectList = BusinessObject.getSelectBusinessObjectData(context,strRequestIds,slSelectList);
            BusinessObjectWithSelect bows = null;
            Map mapPlanFTEValue = new HashMap();
            Map mapAllocatedFTEValue = new HashMap();
            for(BusinessObjectWithSelectItr itr= new BusinessObjectWithSelectItr(resourceRequestObjWithSelectList); itr.next();)
            {
                bows = itr.obj();
                String strFTEPlanValue = bows.getSelectData(SELECT_REL_RESOURCE_PLAN_ATTRIBUTE_FTE);
                strRequestState = bows.getSelectData(SELECT_CURRENT);
                mapPlanFTEValue = getCalculatedMonthFTEMap(strFTEPlanValue, mapPlanFTEValue);
                StringList slPersonIdList = bows.getSelectDataList(SELECT_REL_FROM_ALLOCATED_PERSON_ID);
                StringList slFTEAllocatedValueList = bows.getSelectDataList(SELECT_REL_FROM_ALLOCATED_ATTRIBUTE_FTE);
                if(null!=slPersonIdList && slPersonIdList.size()>0)
                {
                    for(int i=0; i<slPersonIdList.size(); i++)
                    {
                        String strPerosnId = (String)slPersonIdList.get(i);
                        if(slPeoplesToAssign.contains(strPerosnId))
                        {
                            slPeoplesToAssign.remove(strPerosnId);
                        }
                        String strFTEAllocatedValue = (String)slFTEAllocatedValueList.get(i);
                        mapAllocatedFTEValue = getCalculatedMonthFTEMap(strFTEAllocatedValue, mapAllocatedFTEValue);
                    }
                }
            }
            Map mapResultantFTEValue = new HashMap();
            String strFTEValue = EnoviaResourceBundle.getProperty(context,"emxProgramCentral.ResourceRequest.FTE");
            Double nFTEValidateValue = Task.parseToDouble(strFTEValue);
            for (Iterator iterator = mapPlanFTEValue.keySet().iterator(); iterator.hasNext();)
            {
                String strTimeLine = (String) iterator.next();
                Double dPlanFTEValue = (Double)mapPlanFTEValue.get(strTimeLine);
                Double dAllocatedFTEValue = 0d;
                if(null!=mapAllocatedFTEValue.get(strTimeLine))
                {
                    dAllocatedFTEValue = (Double)mapAllocatedFTEValue.get(strTimeLine);
                }
                Double dResultantFTEValue = dPlanFTEValue - dAllocatedFTEValue;
                Double dPerResultantFTEValue = 0d;

                if(dResultantFTEValue > 0)
                {
                    dPerResultantFTEValue = dResultantFTEValue/slPeoplesToAssign.size();
                    if(dPerResultantFTEValue>nFTEValidateValue)
                    {
                        dPerResultantFTEValue = nFTEValidateValue;
                    }
                }
                else
                {

                    dPerResultantFTEValue = nFTEValidateValue;
                }
                NumberFormat numberFormat = ProgramCentralUtil.getNumberFormatInstance(2, true);
                mapResultantFTEValue.put(strTimeLine, numberFormat.format(dPerResultantFTEValue));
            }
            MapList mlResources = new MapList();
            Map mapResourceMap = null;
            for(int i=0; i<slPeoplesToAssign.size(); i++)
            {
                mapResourceMap = new HashMap();
                String slResourceId = (String)slPeoplesToAssign.get(i);
                mapResourceMap.put("Resource_Id",slResourceId);
                MapList mapResultantFTEList = new MapList();
                mapResultantFTEList.add(mapResultantFTEValue);
                mapResourceMap.put("FTE",mapResultantFTEList);
                mapResourceMap.put("ResourceState",strRequestState);
                mapResourceMap.put("RequestId", strResourceRequestId);
                mlResources.add(mapResourceMap);
            }
            String[] strMethodArgs = JPO.packArgs(mlResources);
            emxResourceRequestBase_mxJPO resourceRequestObj = new emxResourceRequestBase_mxJPO(context, strMethodArgs);
            ContextUtil.pushContext(context, PropertyUtil.getSchemaProperty(context, "person_UserAgent"),DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING);
            resourceRequestObj.addResourcesToRequest(context, strMethodArgs);
            ContextUtil.popContext(context);
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }

    }

    protected static Map getCalculatedMonthFTEMap(String strFTEValue, Map mapAllFTEValue) throws MatrixException
    {

        String strMonthYearValue = "";
        Double dFTEValue = null;

        if (strFTEValue != null && !"".equals(strFTEValue) && !"null".equals(strFTEValue))
        {
            FTE fteRequest = FTE.getInstance(strFTEValue);
            Map mapMonthYearFTEValue = fteRequest.getAllFTE();

            if(null!=mapMonthYearFTEValue)
            {
                for (Iterator iter = mapMonthYearFTEValue.keySet().iterator(); iter.hasNext();)
                {
                    strMonthYearValue = (String)iter.next();
                    dFTEValue = new Double(0);
                    if(null!=mapAllFTEValue.get(strMonthYearValue))
                    {
                        dFTEValue = (Double)mapAllFTEValue.get(strMonthYearValue);
                    }
                    dFTEValue = new Double(((Double)mapMonthYearFTEValue.get(strMonthYearValue)).doubleValue()+dFTEValue.doubleValue());
                    mapAllFTEValue.put(strMonthYearValue,dFTEValue);
                }
            }
        }
        return mapAllFTEValue;
    }
    /**
     * @param context
     * @return
     * @throws MatrixException
     */
    public StringList getPMCUser(Context context) throws MatrixException
    {
        StringList slPMCUsers = new StringList();
        try
        {
            String strPMCSymbolicRoles = EnoviaResourceBundle.getProperty(context, "eServiceSuiteProgramCentral.Roles");
            StringList slPMCSymbolicRoles = FrameworkUtil.split(strPMCSymbolicRoles, ",");


               StringList slAllProjectUserList = null;
               String sCommandStatement = "print role $1 select $2 $3 dump $4";
               String strAllProjectUsers =  MqlUtil.mqlCommand(context, sCommandStatement,ProgramCentralConstants.ROLE_PROJECT_USER, "person", "person.inactive", ",");
               slAllProjectUserList = FrameworkUtil.split(strAllProjectUsers, ",");

               int size = slAllProjectUserList != null ? slAllProjectUserList.size() : 0;
               int mid = size/2;
               for (int i = 0, k=mid; i < mid && k <size; i++, k++)
               {
                   String sUserName = (String)slAllProjectUserList.get(i);
                   if(!sUserName.equalsIgnoreCase("User Agent")){
                       String sIsInActive = (String)slAllProjectUserList.get(k);
                       String personObjId = PersonUtil.getPersonObjectID(context, sUserName);
                       if("false".equalsIgnoreCase(sIsInActive) && !slPMCUsers.contains(personObjId))
                       {
                           slPMCUsers.add(personObjId);
                       }
                   }
               }

            String strRole = DomainObject.EMPTY_STRING;
            Role matrixRole = null;
            UserList assignments = null;
            String personObjId = DomainObject.EMPTY_STRING;
            for (StringItr itrRoles = new StringItr(slPMCSymbolicRoles); itrRoles.next();)
            {
                strRole = PropertyUtil.getSchemaProperty(context, itrRoles.obj().trim());

                matrixRole = new Role(strRole);
                matrixRole.open(context);

                StringList projectUsers = new StringList();
                assignments = matrixRole.getAssignments(context);

                UserItr userItr = new UserItr(assignments);

                while(userItr.next())
                {
                    if (userItr.obj() instanceof matrix.db.Person)
                    {
						String name = userItr.obj().getName();
                    	if("creator".equalsIgnoreCase(name))
                    		continue;
                        personObjId = PersonUtil.getPersonObjectID(context, name);
                        if (!slPMCUsers.contains(personObjId))
                        {
                            slPMCUsers.add(personObjId);
                        }
                    }
                }
                matrixRole.close(context);
            }
        }
        catch(FrameworkException fwe)
        {
            throw new MatrixException(fwe);
        }
        return slPMCUsers;
    }



    protected MapList getAllRelatedResourcePools (Context context, String strPMCResourcePoolFilter,String strSelectedResourceManager, String strObjectId, String strRelPattern, boolean getTo, boolean getFrom, boolean isExpandFunction) throws MatrixException
    {

        try
        {
            if(context == null)
            {
                throw new MatrixException("Null Context !");
            }

            MapList mlResult = new MapList();

            final String RESOURCE_REQUEST_STATE_REQUESTED = PropertyUtil.getSchemaProperty(context, "Policy", POLICY_RESOURCE_REQUEST, "state_Requested");
            final String RESOURCE_REQUEST_STATE_PROPOSED = PropertyUtil.getSchemaProperty(context, "Policy", POLICY_RESOURCE_REQUEST, "state_Proposed");
            final String RESOURCE_REQUEST_STATE_REJECTED = PropertyUtil.getSchemaProperty(context, "Policy", POLICY_RESOURCE_REQUEST, "state_Rejected");
            //
            // Depending on the filter selected decide how to find the resource pools
            //
            DomainObject dmoObject = DomainObject.newInstance(context, strObjectId);
            String strLoggedInRM = dmoObject.getInfo(context,SELECT_NAME);

            StringList slPMCUsers = new StringList();

                String strPMCSymbolicRoles = EnoviaResourceBundle.getProperty(context, "eServiceSuiteProgramCentral.Roles");
                StringList slPMCSymbolicRoles = FrameworkUtil.split(strPMCSymbolicRoles, ",");

                String strRole = "";
                Role matrixRole = null;
                UserList assignments = null;
                String personObjId = "";
                for (StringItr itrRoles = new StringItr(slPMCSymbolicRoles); itrRoles.next();)
                {
                    strRole = PropertyUtil.getSchemaProperty(context, itrRoles.obj().trim());

                    matrixRole = new Role(strRole);
                    matrixRole.open(context);

                    StringList projectUsers = new StringList();
                    assignments = matrixRole.getAssignments(context);

                    UserItr userItr = new UserItr(assignments);

                    while(userItr.next()) {
                        if (userItr.obj() instanceof matrix.db.Person) {
                            try {
                                personObjId = PersonUtil.getPersonObjectID(context, userItr.obj().getName());
                                if (!slPMCUsers.contains(personObjId)) {
                                    slPMCUsers.add(personObjId);
                                }
                            } catch(Exception exception) {
                                //PersonUtil.getPersonObjectID() Throws exception when Person Admin
                                //object exists and Business object does not.
                           }
                        }
                    }
                    matrixRole.close(context);
                }

                final String SELECT_ORGANIZATION_MEMBERS_ID = "from["+RELATIONSHIP_MEMBER+"].to.id";
                final String SELECT_RESOURCE_MANAGERS_NAME = "from["+RELATIONSHIP_RESOURCE_MANAGER+"].to.name";
                final String SELECT_RESOURCE_REQUEST_ID = "to["+RELATIONSHIP_RESOURCE_POOL+"].from.id";
                final String SELECT_RESOURCE_REQUEST_STATE = "to["+RELATIONSHIP_RESOURCE_POOL+"].from.current";

                String strTypePattern = TYPE_ORGANIZATION;

                StringList slBusSelect = new StringList();
                slBusSelect.add(DomainConstants.SELECT_ID);
                slBusSelect.add(SELECT_ORGANIZATION_MEMBERS_ID);//Reqd to calculate Capacity
                slBusSelect.add(SELECT_RESOURCE_REQUEST_ID);//Reqd to calculate Open requests
                slBusSelect.add(SELECT_RESOURCE_REQUEST_STATE);//Reqd to calculate Open requests
                slBusSelect.add(SELECT_RESOURCE_MANAGERS_NAME);//Reqd to find resource managers

                StringList slRelSelect = new StringList();
                short recurseToLevel = 0;
                String strBusWhere ="";

               // if ("All".equalsIgnoreCase(strSelectedResourceManager))
              //  {
               //      strBusWhere = "";
              //  }
             //   else
             //   {
            //        strBusWhere = ""+ SELECT_RESOURCE_MANAGERS_NAME +" smatch  \""+ strSelectedResourceManager +"\"";
            //    }

                String strRelWhere = "";
                MapList mlContextResourcePools = dmoObject.getRelatedObjects(context,
                                                                                                        strRelPattern, //pattern to match relationships
                                                                                                        strTypePattern, //pattern to match types
                                                                                                        slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                                                                                                        slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                                                                                                        getTo, //get To relationships
                                                                                                        getFrom, //get From relationships
                                                                                                        recurseToLevel, //the number of levels to expand, 0 equals expand all.
                                                                                                        strBusWhere, //where clause to apply to objects, can be empty ""
                                                                                                        strRelWhere); //where clause to apply to relationship, can be empty ""


                // Consolidated this data against consistent keys so that it will be easy to process later
                Map mapContextResourcePool = null;
                Map mapConsolidatedInfo = null;
                for (Iterator itrContextResourcePools = mlContextResourcePools.iterator(); itrContextResourcePools.hasNext();) {
                    mapContextResourcePool = (Map) itrContextResourcePools.next();

                    mapConsolidatedInfo = new HashMap();
                    mapConsolidatedInfo.put(DomainConstants.SELECT_ID, mapContextResourcePool.get(DomainConstants.SELECT_ID));
                    mapConsolidatedInfo.put("level", mapContextResourcePool.get("level"));
                    mapConsolidatedInfo.put("SELECT_ORGANIZATION_MEMBERS_ID", mapContextResourcePool.get(SELECT_ORGANIZATION_MEMBERS_ID));
                    mapConsolidatedInfo.put("SELECT_RESOURCE_MANAGERS_NAME", mapContextResourcePool.get(SELECT_RESOURCE_MANAGERS_NAME));
                    mapConsolidatedInfo.put("SELECT_RESOURCE_REQUEST_ID", mapContextResourcePool.get(SELECT_RESOURCE_REQUEST_ID));
                    mapConsolidatedInfo.put("SELECT_RESOURCE_REQUEST_STATE", mapContextResourcePool.get(SELECT_RESOURCE_REQUEST_STATE));

                    mlResult.add(mapConsolidatedInfo);
                }

          //End Modified:6-Jan-2010:ixe:R209:PRG:IR-023305



            return mlResult;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            throw new MatrixException(ex);
        }


    }
    /**
     * This method returns Maplist which are connected to specific company.
     *
     * @param   context
     *          The Matrix Context object.
     * @param   stringArray
     *          It contains id of company of which resource managers will be returned.
     *
     * @throws  MatrixException
     *          MatrixException can be thrown in case of method fail to execute.
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getCompanyResourceManagerList(Context context, String[] stringArray) throws MatrixException {

        MapList resourceManagerMapList = null;
        String[] resourceManagerSelectableArray = new String[5];
        resourceManagerSelectableArray[0] = SELECT_ID;
        resourceManagerSelectableArray[1] = SELECT_NAME;
        resourceManagerSelectableArray[2] = Person.SELECT_FIRST_NAME;
        resourceManagerSelectableArray[3] = Person.SELECT_LAST_NAME;
        resourceManagerSelectableArray[4] = Person.SELECT_EMAIL_ADDRESS;

        try {
            Map paramterMap  = JPO.unpackArgs(stringArray);
            String companyId = (String)paramterMap.get("objectId");

            emxOrganization_mxJPO orgJPO = new emxOrganization_mxJPO(context,stringArray);
            orgJPO.setId(companyId);
            resourceManagerMapList = orgJPO.getResourceManagers(context,resourceManagerSelectableArray);

        } catch (Exception exp) {
            throw new MatrixException(exp);
        }

        return resourceManagerMapList;
    }
    /**
     * This method connects resource managers from Company.
     *
     * @param   context
     *          The Matrix Context object.
     * @param   stringArray
     *          It contains ids of resource managers those should get connected.
     *
     * @throws  MatrixException
     *          MatrixException can be thrown in case of method fail to execute.
     */
    public void addResourceManagerToCompany(Context context, String[] stringArray) throws MatrixException {

        try {
            Map paramMap = JPO.unpackArgs(stringArray);
            String companyId = (String)paramMap.get("objectId");
            List<String> resourceManagerIdList = (List<String>)paramMap.get("resourceManagerIdList");

            if (resourceManagerIdList.size() > 0) {

                //Get already connected resource managers and remove them from new connection process.
                MapList resourceManagerMapList = getCompanyResourceManagerList(context,stringArray);
                if (resourceManagerMapList != null && resourceManagerMapList.size()  > 0) {

                    for (int i=0;i<resourceManagerMapList.size();i++) {
                        Map map = (Map)resourceManagerMapList.get(i);
                        String existingConnectedId = (String)map.get(SELECT_ID);
                        resourceManagerIdList.remove(existingConnectedId);
                    }
                }
                //Connect new resource managers to company.
                if (resourceManagerIdList.size() > 0) {
                    String[] newResourceManagerIdArray = new String[resourceManagerIdList.size()];
                    resourceManagerIdList.toArray(newResourceManagerIdArray);

                    ContextUtil.startTransaction(context,true);

                    DomainObject domainObject = DomainObject.newInstance (context,companyId);
                    DomainRelationship.connect (context,domainObject,RELATIONSHIP_RESOURCE_MANAGER,true,newResourceManagerIdArray);

                    ContextUtil.commitTransaction(context);
                }
            }
        } catch (Exception exp) {
            ContextUtil.abortTransaction(context);
            throw new MatrixException(exp);
        }
    }
    /**
     * This method disconnects resource managers from Company.
     *
     * @param   context
     *          The Matrix Context object.
     * @param   stringArray
     *          It contains ids of resource managers those should get disconnected.
     *
     * @throws  MatrixException
     *          MatrixException can be thrown in case of method fail to execute.
     */
    public void removeResourceManagerFromCompany(Context context, String[] stringArray) throws MatrixException {

        try {
            boolean getTo = false;
            boolean getFrom = true;
            short recurseToLevel = 1;
            String strBusWhere = EMPTY_STRING;
            String strRelWhere = EMPTY_STRING;

            Map paramMap = JPO.unpackArgs(stringArray);
            String companyId = (String)paramMap.get("objectId");
            List<String> resourceManagerIdList = (List<String>)paramMap.get("resourceManagerIdList");

            StringList removeRelIdList = new StringList();

            StringList busSelectList   = new StringList();
            busSelectList.add(DomainObject.SELECT_ID);

            StringList relSectableList = new StringList();
            relSectableList.add(DomainRelationship.SELECT_ID);

            if (ProgramCentralUtil.isNotNullString(companyId) && resourceManagerIdList.size() > 0) {

                DomainObject companyObject = DomainObject.newInstance(context,companyId);

                MapList resourceManagerDataMapList =
                        companyObject.getRelatedObjects(context,
                                                        RELATIONSHIP_RESOURCE_MANAGER,
                                                        TYPE_PERSON,
                                                        busSelectList,
                                                        relSectableList,
                                                        getTo,
                                                        getFrom,
                                                        recurseToLevel,
                                                        strBusWhere,
                                                        strRelWhere,0);


                 for (int i=0;i<resourceManagerDataMapList.size();i++) {

                     Map relatedObjectInfoMap = (Map) resourceManagerDataMapList.get(i);

                     String resourceManagerId = (String)relatedObjectInfoMap.get(DomainObject.SELECT_ID);
                     String relationshipId = (String)relatedObjectInfoMap.get(DomainRelationship.SELECT_ID);

                     if (resourceManagerIdList.contains(resourceManagerId)) {
                         removeRelIdList.add(relationshipId);
                     }
                }

                ContextUtil.startTransaction(context,true);

                String[] removeRelIdArray = (String[])removeRelIdList.toArray(new String[removeRelIdList.size()]);
                DomainRelationship.disconnect(context, removeRelIdArray);

                ContextUtil.commitTransaction(context);
            }
        } catch (Exception exception) {
            ContextUtil.abortTransaction(context);
            throw new MatrixException(exception);
        }
    }
    /**
     * This Function returns only those person who have the role Resource Manager,
     * VPLMProjectAdministrator & are Active,
     *
     * @param   context
     *          Matrix Context Object.
     * @param   args
     *          holds input packed arguments send by autonomy search framework.
     *
     * @return  StringList
     *          List of Id's which will get excluded from autonomy search.
     *
     * @throws  Exception
     *          if the operation fails.
     */
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList getExcludeOIDForResourceManagerSearch(Context context,String args[]) throws Exception {

        try {
            Map programMap = (Map) JPO.unpackArgs(args);
            String strOrganizationId = (String) programMap.get("objectId");
            final String SELECT_ORGANIZATION_ID = "from.id";
            final String SELECT_MEMBER_NAME = "to.name";
            final String SELECT_MEMBER_ID = "to.id";
            final String SELECT_MEMBER_STATE = "to.current";
            String strRelExpression = EMPTY_STRING;
            String strVaultPattern = "*";
            String SearchInAllOrganizationKey = "emxComponents.ResourcePool.ResourceManager.SearchInAllOrganization";

            short nObjectLimit = 0;
            StringList slSelectStmts = new StringList();
            StringList slOrderBy = new StringList();
            slSelectStmts.add(SELECT_ORGANIZATION_ID);
            slSelectStmts.add(SELECT_MEMBER_NAME);
            slSelectStmts.add(SELECT_MEMBER_ID);
            slSelectStmts.add(SELECT_MEMBER_STATE);
            RelationshipWithSelectList relationshipWithSelectList = null;

            String strSearchAllResourceManager = EnoviaResourceBundle.getProperty(context,SearchInAllOrganizationKey);
            boolean isSearchingAllResourceManager = "true".equalsIgnoreCase(strSearchAllResourceManager);
            StringList excludePersonList = new StringList();
            StringList activeUserNameList = new StringList();

            if(!isSearchingAllResourceManager) {
                strRelExpression = " "+ SELECT_ORGANIZATION_ID +" == "+strOrganizationId+" ";
            }

            relationshipWithSelectList = Relationship.query(context,RELATIONSHIP_MEMBER,strVaultPattern,
                                                            strRelExpression,nObjectLimit,slSelectStmts,slOrderBy);

            MapList memberInfoMapList = new MapList();
            StringList activeMemberIdList = new StringList();
            StringList activeMemberNameList = new StringList();

            for (int i=0;i<relationshipWithSelectList.size();i++) {

                RelationshipWithSelect relationshipWithSelect = (RelationshipWithSelect)relationshipWithSelectList.get(i);

                HashMap memberInfoMap = new HashMap();
                String memberId     = relationshipWithSelect.getSelectData(SELECT_MEMBER_ID);
                String memberName   = relationshipWithSelect.getSelectData(SELECT_MEMBER_NAME);
                String memberState  = relationshipWithSelect.getSelectData(SELECT_MEMBER_STATE);

                memberInfoMap.put("MemberId",memberId);
                memberInfoMap.put("MemberName",memberName);
                memberInfoMap.put("MemberState",memberState);

                if(STATE_PERSON_ACTIVE.equalsIgnoreCase(memberState)){
                    activeMemberNameList.add(memberName);
                    activeMemberIdList.add(memberId);
                }

               if (!memberInfoMapList.contains(memberInfoMap)){
                   memberInfoMapList.add(memberInfoMap);
               }
            }

            // get all active Resource Managers.
            Role resourceManagerRole = new Role(PropertyUtil.getSchemaProperty(context,"role_ResourceManager"));
            resourceManagerRole.open(context);

            UserList resourceManagerRoleUserList = resourceManagerRole.getAssignments(context);
            for (int i = 0; i < resourceManagerRoleUserList.size(); i++) {
                String personName = ((matrix.db.Person)resourceManagerRoleUserList.get(i)).getName();

                if (activeMemberNameList.contains(personName)) {
                    activeUserNameList.add(personName);

                } else if(!activeMemberNameList.contains(personName)) {
                    try {
                        String strPersonId  = PersonUtil.getPersonObjectID(context,personName);
                        excludePersonList.add(strPersonId);
                    } catch(Exception exception) {
                        //PersonUtil.getPersonObjectID() Throws exception when Person Admin
                        //object exists and Business object does not. So, nothing to exclude.
                    }
                }
            }
            resourceManagerRole.close(context);

            // get all active VPLM Project Administrators.
            String VPMProjectAdministratorRole = PropertyUtil.getSchemaProperty(context,"role_VPLMProjectLeader");
            StringList VPLMProjectAdminUserList = null;
            if(ProgramCentralUtil.isNotNullString(VPMProjectAdministratorRole)) {
               String mqlCommand = "print role $1 select $2 dump $3";
               String strVPLMProjectAdminUsers =  MqlUtil.mqlCommand(context, mqlCommand,VPMProjectAdministratorRole, "person",",");
               VPLMProjectAdminUserList = FrameworkUtil.split(strVPLMProjectAdminUsers, ",");
            }

           int size = VPLMProjectAdminUserList != null ? VPLMProjectAdminUserList.size() : 0;

           for (int i = 0; i < size; i++) {

               String userName = (String)VPLMProjectAdminUserList.get(i);

               if (activeMemberNameList.contains(userName)) {

                  activeUserNameList.add (userName);

               } else {
                   try {
                        String strPersonId  = PersonUtil.getPersonObjectID(context,userName);
                        excludePersonList.add(strPersonId);
                   } catch(Exception exception) {
                        //PersonUtil.getPersonObjectID() Throws exception when Person Admin
                        //object exists and Business object does not. So, nothing to exclude.
                   }
               }
           }

            for (int i = 0;i < memberInfoMapList.size(); i++) {

                Map mapUser = (Map) memberInfoMapList.get(i);
                String strUserId = (String) mapUser.get("MemberId");
                String strUserName= (String) mapUser.get("MemberName");

                if (!activeUserNameList.contains(strUserName)) {
                    excludePersonList.add(strUserId);
                }
            }
            // to exclude the person which are removed from company but active or inactive in database
            String strWhere="to["+RELATIONSHIP_EMPLOYEE+"]==False";

            StringList slTypeSelects = new StringList();
            slTypeSelects.add(SELECT_ID);
            slTypeSelects.add(SELECT_CURRENT);

            MapList allActiveUserMapList = DomainObject.findObjects(context, TYPE_PERSON, null, strWhere, slTypeSelects);

            for (int i=0; i<allActiveUserMapList.size();i++) {

               Map mapPerson         = (Map) allActiveUserMapList.get(i);
               String strPersonId    = (String) mapPerson.get(SELECT_ID);
               String strPersonState = (String) mapPerson.get(SELECT_CURRENT);

               if(!excludePersonList.contains(strPersonId) ||
                            !STATE_PERSON_ACTIVE.equalsIgnoreCase(strPersonState)) {
                   excludePersonList.add(strPersonId);
               }
            }
          //end
            return excludePersonList;
        }
        catch (Exception exp) {
            throw exp;
        }
    }

    // New methods added for performance improvement

    /**
     * Gets all assigned resource pool on "PMCResourcePoolSummary"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing no. of resource pool available for logged in user
     * @throws Exception if operation fails
     */
    private MapList getResourcePoolObjects(Context context,
            String filter,
            String resourceManager,
            String personId,
            String relPattern,
            String typePattern) throws FrameworkException{


        MapList resultList = new MapList();

        StringList busSelect = new StringList(5);
        busSelect.add(DomainConstants.SELECT_ID);

        if("MyResourcePools".equalsIgnoreCase(filter)){
            DomainObject person = DomainObject.newInstance(context, personId);

                resultList = person.getRelatedObjects(context,
                        relPattern, //pattern to match relationships
                        typePattern, //pattern to match types
                        busSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                        null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                        true, //get To relationships
                        false, //get From relationships
                        (short)1, //the number of levels to expand, 0 equals expand all.
                        null, //where clause to apply to objects, can be empty ""
                        null, //where clause t
                        0);
        }

        return resultList;
    }

    /**
     * Gets the data for the column "Capacity" for table "PMCResourcePoolSummary"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing no. of peoples available to particular Resource Pool
     * @throws Exception if operation fails
     */
    public StringList getCapacityData(Context context, String[] args)throws Exception
    {

        Map programMap      = (HashMap) JPO.unpackArgs(args);
        MapList objectList  = (MapList) programMap.get("objectList");
        int objListSize     = objectList.size();

        StringList capacityList = new StringList(objListSize);

        String[] objArrayIds = new String[objListSize];
        for(int i=0;i<objListSize;i++){
            Map resourceMap = (Map)objectList.get(i);
            objArrayIds[i] = (String) resourceMap.get(DomainObject.SELECT_ID);
        }

        String pmcSymbolicRoles         = EnoviaResourceBundle.getProperty(context, "eServiceSuiteProgramCentral.Roles");
        StringList pmcSymbolicRoleList  = FrameworkUtil.split(pmcSymbolicRoles, ",");
        int rolesSize                   = pmcSymbolicRoleList.size();

        StringList orgMembersNameList   = new StringList();
        StringList orgMembersStateList  = new StringList();

        String SELECT_ORGANIZATION_MEMBERS_NAME = "from[Member].to.name";
        String SELECT_ORGANIZATION_MEMBERS_STATE = "from[Member].to.current";

        StringList multiValueSelectable = new StringList(2);
        multiValueSelectable.add(SELECT_ORGANIZATION_MEMBERS_NAME);
        multiValueSelectable.add(SELECT_ORGANIZATION_MEMBERS_STATE);

        StringList objectSelects= new StringList();
        objectSelects.addElement(SELECT_ORGANIZATION_MEMBERS_NAME);
        objectSelects.addElement(SELECT_ORGANIZATION_MEMBERS_STATE);

        MapList resourcePoolList = new MapList();
        try {
            ProgramCentralUtil.pushUserContext(context);
            resourcePoolList = DomainObject.getInfo(context, objArrayIds, objectSelects,multiValueSelectable);
        } finally {
            ProgramCentralUtil.popUserContext(context);
        }

        for (Object objectMap : resourcePoolList) {
            Map resourceMap = (Map)objectMap;

            Object orgMembersNames  = resourceMap.get(SELECT_ORGANIZATION_MEMBERS_NAME);
            Object orgMemberState = resourceMap.get(SELECT_ORGANIZATION_MEMBERS_STATE);
            long capacityCount = 0;
            if(orgMembersNames == null){
                capacityList.add(Long.toString(capacityCount));
                continue;
            }
                orgMembersNameList = (StringList) orgMembersNames;
                orgMembersStateList = (StringList) orgMemberState;
            /*
            if(orgMembersNames instanceof String){
            orgMembersNameList.addElement((String) orgMembersNames);}
            else{
            orgMembersNameList = (StringList) orgMembersNames;}

            if(orgMemberState instanceof String){
            orgMembersStateList.addElement((String) orgMemberState);}
            else{
                orgMembersStateList = (StringList) orgMemberState;
            }
            */
            capacityCount = orgMembersStateList.stream().filter(key -> "Active".equalsIgnoreCase(key)).count();
            capacityList.add(Long.toString(capacityCount));
        }
            /*int slCapacityValue = 0;
            if (orgMembersNameList == null) {
                capacityList.add(Integer.toString(slCapacityValue));
            }else{
                for(int i=0,size=orgMembersNameList.size(); i<size; i++){
                    String personName = (String) orgMembersNameList.get(i);

                    for(int j=0; j < rolesSize; j++) {
                        String assignment = PropertyUtil.getSchemaProperty(context, (String)pmcSymbolicRoleList.get(j));
                        String assignedRole = "assignment["+ assignment +"]";
                        String hasAssignment = MqlUtil.mqlCommand(context, "print person $1 select $2 dump", true, personName, assignedRole);
                        if("true".equalsIgnoreCase(hasAssignment)) {
                            slCapacityValue++;
                            break;
                        }
                    }
                }
            }
            capacityList.add(Integer.toString(slCapacityValue));
        }
*/
        return capacityList;
    }

    /**
     * Gets the data for the column "Open Requests" for table "PMCResourcePoolSummary"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing no. of Open Requests available to particular Resource Pool
     * @throws Exception if operation fails
     */
    public StringList getOpenRequestsData(Context context, String[] args) throws Exception
    {

        // Get object list information from packed arguments
        Map programMap = (HashMap) JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");

        String RESOURCE_REQUEST_STATE_REQUESTED = PropertyUtil.getSchemaProperty(context, "Policy",
                POLICY_RESOURCE_REQUEST, "state_Requested");
        String RESOURCE_REQUEST_STATE_PROPOSED = PropertyUtil.getSchemaProperty(context, "Policy",
                POLICY_RESOURCE_REQUEST, "state_Proposed");

        int objListSize = objectList.size();
        StringList openRequestList = new StringList(objListSize);

        String[] objArrayIds = new String[objListSize];
        for (int i = 0; i < objListSize; i++) {
            Map resourceMap = (Map) objectList.get(i);
            objArrayIds[i] = (String) resourceMap.get(DomainObject.SELECT_ID);
        }

        StringList orgMembersIdsList = null;

        String SELECT_RESOURCE_REQUEST_ID = "to[Resource Pool].from.id";

        StringList objectSelects = new StringList();
        objectSelects.addElement(SELECT_RESOURCE_REQUEST_ID);

        StringList multiValueSelectables = new StringList(1);
        multiValueSelectables.add(SELECT_RESOURCE_REQUEST_ID);

        MapList resourcePoolList = null;
        try {
            ProgramCentralUtil.pushUserContext(context);
            resourcePoolList = DomainObject.getInfo(context, objArrayIds, objectSelects, multiValueSelectables);
        } finally {
            ProgramCentralUtil.popUserContext(context);
        }

        //MapList resourcePoolList = DomainObject.getInfo(context, objArrayIds, objectSelects);
        int nOpenRequests = 0;

        for (Object objectMap : resourcePoolList) {
            Map resourceMap = (Map) objectMap;
            nOpenRequests = 0;
            StringList orgResourceRequestIdList = (StringList)resourceMap.get(SELECT_RESOURCE_REQUEST_ID);

            if (orgResourceRequestIdList == null) {
                openRequestList.add("0");
            } else {
                String[] slRequestIdList = new String[orgResourceRequestIdList.size()];
                orgResourceRequestIdList.copyInto(slRequestIdList);

                String strRequestID = "";

                BusinessObjectWithSelectList resourceRequestObjWithSelectList = null;
                BusinessObjectWithSelect bows = null;
                final String SELECT_REL_RESOURCE_PLAN_PROJECT_ID = "to[" + DomainConstants.RELATIONSHIP_RESOURCE_PLAN
                        + "].from." + DomainConstants.SELECT_ID;
                StringList slProjectSelectList = new StringList();
                slProjectSelectList.add(SELECT_REL_RESOURCE_PLAN_PROJECT_ID);
                slProjectSelectList.add("to[" + DomainConstants.RELATIONSHIP_RESOURCE_PLAN + "].from."
                        + DomainConstants.SELECT_CURRENT);

                try {
                    ProgramCentralUtil.pushUserContext(context);
                    resourceRequestObjWithSelectList = BusinessObject.getSelectBusinessObjectData(context,
                            slRequestIdList, slProjectSelectList);
                } finally {
                    ProgramCentralUtil.popUserContext(context);
                }

                for (BusinessObjectWithSelectItr itr = new BusinessObjectWithSelectItr(
                        resourceRequestObjWithSelectList); itr.next();) {
                    String strProjectId = "";
                    String strCurrentState = "";
                    bows = itr.obj();
                    strProjectId = bows.getSelectData(SELECT_REL_RESOURCE_PLAN_PROJECT_ID);
                    String strProjectState = bows.getSelectData("to[" + DomainConstants.RELATIONSHIP_RESOURCE_PLAN
                            + "].from." + DomainConstants.SELECT_CURRENT);

                    // Added null check for request related to Resource plan
                    // template
                    if (null != strProjectState && (!strProjectState.equals(DomainConstants.STATE_PROJECT_SPACE_CREATE)
                            && !strProjectState.equals(DomainConstants.STATE_PROJECT_SPACE_ASSIGN)
                            && !strProjectState.equals(DomainConstants.STATE_PROJECT_SPACE_ACTIVE))) {
                        orgResourceRequestIdList.remove(bows.getObjectId());
                    }
                }
                for (int i = 0; i < orgResourceRequestIdList.size(); i++) {
                    strRequestID = (String) orgResourceRequestIdList.get(i);
                    if (null != strRequestID) {
                        //DomainObject dmoRequest = DomainObject.newInstance(context, strRequestID);
                        String mqlCmd = "print bus $1 select $2 dump $3";
                        String mqlResult = MqlUtil.mqlCommand(context, mqlCmd, true, strRequestID, SELECT_CURRENT, "|");

                        String strValue = DomainObject.EMPTY_STRING;//dmoRequest.getInfo(context, SELECT_CURRENT);
                        if(mqlResult != null){
                        strValue = (String) (FrameworkUtil.split(mqlResult, "|").get(0));
                        }
                        if (RESOURCE_REQUEST_STATE_REQUESTED.equals(strValue)
                                || RESOURCE_REQUEST_STATE_PROPOSED.equals(strValue)) {
                            nOpenRequests++;
                        }
                    }
                }
            }

            openRequestList.add(Integer.toString(nOpenRequests));
        }

        return openRequestList;
    }

    /**
     * Gets the data for the column "ResourceManagers" for table "PMCResourcePoolSummary"
     *
     * @param context The matrix context object
     * @param args The arguments, it contains objectList and paramList maps
     * @return The Vector object containing
     * @throws Exception if operation fails
     */
    public StringList getResourceManager(Context context, String[] args) throws Exception
    {

        Map programMap = (HashMap) JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        Map paramList = (Map) programMap.get("paramList");
        boolean isExport = false;
        boolean isPrinterFriendly = false;
        String strReport= (String)paramList.get("reportFormat");
        String strExport= (String)paramList.get("exportFormat");
        if((ProgramCentralUtil.isNotNullString(strExport) && "CSV".equalsIgnoreCase(strExport)) ||
                (ProgramCentralUtil.isNotNullString(strReport) && "CSV".equalsIgnoreCase(strReport))){
            isExport = true;
        }

        if((ProgramCentralUtil.isNotNullString(strExport) && "HTML".equalsIgnoreCase(strExport)) ||
                (ProgramCentralUtil.isNotNullString(strReport) && "HTML".equalsIgnoreCase(strReport))){
            isPrinterFriendly = true;
        }

        String personIcon = "../common/images/iconSmallPerson.gif";

        int objListSize = objectList.size();
        StringList resourceManagerList = new StringList(objListSize);

        String[] objArrayIds = new String[objListSize];
        for(int i=0;i<objListSize;i++){
            Map resourceMap = (Map)objectList.get(i);
            objArrayIds[i] = (String) resourceMap.get(DomainObject.SELECT_ID);
        }

        String emxSystemUserNameFormat = EnoviaResourceBundle.getProperty(context,"emxFramework.FullName.Format");

        String SELECT_RESOURCE_MANAGER_ID_FROM_ORG = "from[Resource Managers].to.id";
        String SELECT_RESOURCE_MANAGER_FNAME_FROM_ORG = "from[Resource Managers].to.attribute[First Name].value";
        String SELECT_RESOURCE_MANAGER_LNAME_FROM_ORG = "from[Resource Managers].to.attribute[Last Name].value";

        StringList objectSelects= new StringList();
        objectSelects.addElement(SELECT_RESOURCE_MANAGER_FNAME_FROM_ORG);
        objectSelects.addElement(SELECT_RESOURCE_MANAGER_LNAME_FROM_ORG);
        objectSelects.addElement(SELECT_RESOURCE_MANAGER_ID_FROM_ORG);

        StringList multiValueSelectables = new StringList(3);
        multiValueSelectables.add(SELECT_RESOURCE_MANAGER_FNAME_FROM_ORG);
        multiValueSelectables.add(SELECT_RESOURCE_MANAGER_LNAME_FROM_ORG);
        multiValueSelectables.add(SELECT_RESOURCE_MANAGER_ID_FROM_ORG);

        MapList resourceList = null;
        try {
            ProgramCentralUtil.pushUserContext(context);
            resourceList = DomainObject.getInfo(context, objArrayIds, objectSelects, multiValueSelectables);
        } finally {
            ProgramCentralUtil.popUserContext(context);
        }

        //MapList resourceList = DomainObject.getInfo(context, objArrayIds, objectSelects);
        for (Object objectMap : resourceList) {
            Map resourceMap = (Map)objectMap;

            StringList resourceManagerIdList        = (StringList)resourceMap.get(SELECT_RESOURCE_MANAGER_ID_FROM_ORG);
            StringList resourceManagerFirstNameList     = (StringList)resourceMap.get(SELECT_RESOURCE_MANAGER_FNAME_FROM_ORG);
            StringList resourceManagerLastNameList  = (StringList)resourceMap.get(SELECT_RESOURCE_MANAGER_LNAME_FROM_ORG);


            String fullName = null;
            StringList allResourceManagerList = new StringList();

            for(int i=0,size =resourceManagerIdList.size(); i<size; i++){
                fullName = emxSystemUserNameFormat.replace("<First Name>", (String)resourceManagerFirstNameList.get(i));
                fullName = fullName.replace("<Last Name>", (String)resourceManagerLastNameList.get(i));

                String resourceManagerId =  (String)resourceManagerIdList.get(i);

                if(isExport){
                    allResourceManagerList.add(XSSUtil.encodeForHTML(context,fullName));
                } else if (isPrinterFriendly){
                    StringBuilder sbSubstanceLink = new StringBuilder();
                    sbSubstanceLink.append("<img border=\"0\" src=\""+ personIcon + "\" title=\"\"></img>");
                    sbSubstanceLink.append(XSSUtil.encodeForHTML(context, fullName));
                    allResourceManagerList.add(sbSubstanceLink.toString());
                } else {

                    StringBuilder sbSubstanceLink = new StringBuilder();
                    sbSubstanceLink.append("<img border=\"0\" src=\""+ personIcon + "\" title=\"\"></img>");
                    sbSubstanceLink.append("<a href='../common/emxTree.jsp?objectId=").append(resourceManagerId);
                    sbSubstanceLink.append("' >");
                    sbSubstanceLink.append(XSSUtil.encodeForHTML(context, fullName));
                    sbSubstanceLink.append("</a>");
                    allResourceManagerList.add(sbSubstanceLink.toString());
                }
            }

            resourceManagerList.add(FrameworkUtil.join(allResourceManagerList, ","));
        }

        return resourceManagerList;
    }

     /**
     * This Method will Assign (Connect) Selected Resource Managers to Business Units, it will also disconnect the resource managers already connected which are not selected
     *
     * @param context Matrix Context object
     * @param args The array of resource manager ids
     * @throws MatrixException if operation fails
     * @since PRG R208
     */
    public int assignResourceManagers (Context context, String[] args) throws MatrixException
    {
        try {
            if (context == null) {
                throw new IllegalArgumentException ("context");
            }

            StringList slResourceManagerIDs =  new StringList(args);
            if (slResourceManagerIDs == null) {
                slResourceManagerIDs = new StringList();
            }
            ContextUtil.startTransaction(context,true);

            Map mapResourceManagerRelIds = new HashMap(); // Used to map Person ID to corresponding rel id

            //
            // Find existing resource managers

            DomainObject dmoBU = DomainObject.newInstance (context,this.getId());

            String strRelationshipPattern = DomainConstants.RELATIONSHIP_RESOURCE_MANAGER;
            String strTypePattern = DomainConstants.TYPE_PERSON;

            StringList slBusSelect = new StringList();
            slBusSelect.add(DomainObject.SELECT_ID);

            StringList slRelSelect = new StringList();
            slRelSelect.add(DomainRelationship.SELECT_ID);

            boolean getTo = false;
            boolean getFrom = true;
            short recurseToLevel = 1;
            String strBusWhere = "";
            String strRelWhere = "";

            MapList mlResourceManagers = dmoBU.getRelatedObjects(context,
                    strRelationshipPattern, //pattern to match relationships
                    strTypePattern, //pattern to match types
                    slBusSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
                    slRelSelect, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
                    getTo, //get To relationships
                    getFrom, //get From relationships
                    recurseToLevel, //the number of levels to expand, 0 equals expand all.
                    strBusWhere, //where clause to apply to objects, can be empty ""
                    strRelWhere,0); //where clause to apply to relationship, can be empty ""
            StringList slAlreadyAssignedResourceManagers = new StringList();

            Map mapRelatedObjectInfo = null;
            String resourceManagerID = null;

            for (Iterator itrRelatedObjects = mlResourceManagers.iterator(); itrRelatedObjects .hasNext();)
            {
                mapRelatedObjectInfo = (Map) itrRelatedObjects.next();

                resourceManagerID = (String)mapRelatedObjectInfo.get(DomainObject.SELECT_ID);
                slAlreadyAssignedResourceManagers.add(resourceManagerID);

                mapResourceManagerRelIds.put(resourceManagerID, (String)mapRelatedObjectInfo.get(DomainRelationship.SELECT_ID));
            }

            if (slResourceManagerIDs.size() == 0) {
                if (slAlreadyAssignedResourceManagers.size() != 0) {
                    // If nothing is selected we need to dsconnect the existing Resource Managers
                    StringList slRelIds = new StringList();

                    for (Iterator itrPersons = slAlreadyAssignedResourceManagers
                            .iterator(); itrPersons.hasNext();) {
                        String strPersonID = (String) itrPersons.next();
                        slRelIds.add((String)mapResourceManagerRelIds.get(strPersonID));
                    }

                    String[] strRelIDs = (String[])slRelIds.toArray(new String[slRelIds.size()]);
                    DomainRelationship.disconnect(context, strRelIDs);

                    return 0;
                }
            }

            //
            // Decide which new ones to be assigned
            //
            StringList slAssignment = new StringList();
            String strCurrentPersonId = null;
            for (Iterator itrPersons = slResourceManagerIDs.iterator(); itrPersons.hasNext();) {
                strCurrentPersonId = (String) itrPersons.next();
                if (!slAlreadyAssignedResourceManagers.contains(strCurrentPersonId)) {
                    slAssignment.add(strCurrentPersonId);
                }
            }

            if (slAssignment.size() != 0) {
                String[] strResourceManagers = new String[slAssignment.size()];
                strResourceManagers = (String[])slAssignment.toArray(strResourceManagers);
                DomainRelationship.connect (context, dmoBU, DomainConstants.RELATIONSHIP_RESOURCE_MANAGER, true, strResourceManagers);
            }

            //
            // Decide which new ones to be unassigned
            //
            StringList slUnassignment = new StringList();
            String strRelId = null;
            for (Iterator itrPersons = slAlreadyAssignedResourceManagers.iterator(); itrPersons.hasNext();) {
                strCurrentPersonId = (String) itrPersons.next();
                if (!slResourceManagerIDs.contains(strCurrentPersonId)) {
                    strRelId = (String)mapResourceManagerRelIds.get(strCurrentPersonId);
                    slUnassignment.add(strRelId);
                }
            }

            if (slUnassignment.size() != 0) {
                String[] strRelIds = new String[slUnassignment.size()];
                strRelIds = (String[])slUnassignment.toArray(strRelIds);
                DomainRelationship.disconnect(context, strRelIds);
            }

            ContextUtil.commitTransaction(context);

            return 0;
        }
        catch (Exception exp) {
            if (context != null) {
                ContextUtil.abortTransaction(context);
            }

            exp.printStackTrace();
            throw new MatrixException(exp);
        }
    }


 }

