/*
 *  emxRouteTemplateBase.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;

import matrix.db.Access;
import matrix.db.AccessList;
import matrix.db.Attribute;
import matrix.db.AttributeList;
import matrix.db.AttributeType;
import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.db.ExpansionIterator;
import matrix.db.JPO;
import matrix.db.RelationshipType;
import matrix.util.Pattern;
import matrix.util.SelectList;
import matrix.util.StringItr;
import matrix.util.StringList;

import com.matrixone.apps.common.BusinessUnit;
import com.matrixone.apps.common.Company;
import com.matrixone.apps.common.Organization;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.common.Route;
import com.matrixone.apps.common.RouteTemplate;
import com.matrixone.apps.common.RouteTemplateNotification;
import com.matrixone.apps.common.Workspace;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.AccessUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.StringUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.domain.util.mxType;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.common.util.ComponentsUIUtil;
import matrix.db.RelationshipWithSelectItr;
import matrix.db.ExpansionWithSelect;
import com.matrixone.apps.domain.util.MqlUtil;;


/**
 * @version Common 10-0-0-0 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxRouteTemplateBase_mxJPO extends emxDomainObject_mxJPO
{

	static final String ROUTE_SCOPE = "attribute[Restrict Members]";
	private static final String OBJECTID = "objectId";
	private static final String PARAMMAP = "paramMap";
    
    private static Map<String,Map<String,String>> routeTemplateNotifInfo = new HashMap<>();
    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since Common 10-0-0-0
     * @grade 0
     */
    public emxRouteTemplateBase_mxJPO (Context context, String[] args)
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
     * @since Common 10-0-0-0
     * @grade 0
     */
    public int mxMain(Context context, String[] args)
        throws Exception
    {
        if (!context.isConnected())
            throw new Exception(ComponentsUtil.i18nStringNow("emxComponents.Generic.NotSupportedOnDesktopClient", context.getLocale().getLanguage()));
        return 0;
    }


    /**
     * showCheckbox - determines if the checkbox needs to be enabled in the column of the RouteTemplate Summary table
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since Common 10-0-0-0
     * @grade 0
     */
    public Vector showCheckbox(Context context, String[] args)
        throws Exception
    {
        try
        {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");

            Vector enableCheckbox = new Vector();
            String user = context.getUser();

            Iterator objectListItr = objectList.iterator();
            while(objectListItr.hasNext())
            {
                Map objectMap = (Map) objectListItr.next();
                String owner = (String)objectMap.get(SELECT_OWNER);

                if(user.equals(owner))
                {
                    enableCheckbox.add("true");
                }
                else
                {
                    enableCheckbox.add("false");
                }
            }
            return enableCheckbox;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    /**
     * getScope - displays the scope of the template
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @returns Object of type Vector
     * @throws Exception if the operation fails
     * @since Common 10-0-0-0
     * @grade 0
     */
    public Vector getAvailability(Context context, String[] args)
            throws Exception {
// IR-047371V6R2011 - START
        Vector availabilityList = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");
            HashMap paramMap   = (HashMap) programMap.get("paramList");
            String strLang     = (String) paramMap.get("languageStr");
            String strLabelUser       = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(strLang),"emxComponents.SearchTemplate.User");
            String strLabelEnterprise = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(strLang),"emxComponents.SearchTemplate.Enterprise");
            String strProjectElement  = "<a href='javascript:showModalDialog(\"../common/emxTree.jsp?objectId=${OBJECTID}\",575,575)'>${NAME}</a>";
            String strAvailability    = "";
            Iterator objectListItr    = objectList.iterator();
            while( objectListItr.hasNext() ) {
                Map objectMap           = (Map) objectListItr.next();
                String strConnectedId   = (String) objectMap.get( RouteTemplate.SELECT_ROUTE_TEMPLATES_OBJECT_ID );
                String strConnectedType = (String) objectMap.get( RouteTemplate.SELECT_ROUTE_TEMPLATES_TYPE );
                String strSuffix        = (String) objectMap.get( RouteTemplate.SELECT_OWNING_ORGANIZATION_TITLE );
                
                /**	IR-268393V6R2014x - k3d
                 * RCA:	Latin characters are not getting encoded properly to be parsed by SAXBuilder in UIFormCommon:addFields()
                 * FIX:	changing encodeForHTML to encodeForXML as ProgramHTMLOutput field value is being parsed as XML
                 */
                if( strSuffix == null || "null".equals( strSuffix ) || "".equals( strSuffix ) ) {
                    strSuffix = XSSUtil.encodeForXML(context,(String) objectMap.get( "to["+ DomainObject.RELATIONSHIP_ROUTE_TEMPLATES+"].from.name" ));
                }
                if(((DomainObject.TYPE_WORKSPACE).equals(strConnectedType)) || (DomainObject.TYPE_WORKSPACE_VAULT).equals(strConnectedType)) {
                	strSuffix = XSSUtil.encodeForXML(context,(String) objectMap.get( "to["+ DomainObject.RELATIONSHIP_ROUTE_TEMPLATES+"].from."+DomainConstants.SELECT_ATTRIBUTE_TITLE ));
                }
                if( ( TYPE_PROJECT.equals( strConnectedType ) ) || ( TYPE_PROJECT_SPACE.equals( strConnectedType ) )
                                || mxType.isOfParentType( context, strConnectedType, DomainConstants.TYPE_PROJECT_SPACE ) ) {
					if(mxType.isOfParentType( context, strConnectedType, DomainConstants.TYPE_PROJECT_SPACE )){
                		strConnectedType = EnoviaResourceBundle.getTypeI18NString(context, DomainConstants.TYPE_PROJECT_SPACE, strLang);
                	}else{
                		strConnectedType = EnoviaResourceBundle.getTypeI18NString(context, strConnectedType, strLang);
                	}
                    strAvailability = FrameworkUtil.findAndReplace( strProjectElement, "${OBJECTID}", strConnectedId );
                    strAvailability = FrameworkUtil.findAndReplace( strAvailability, "${NAME}", XSSUtil.encodeForHTML(context, strConnectedType) + " : " + strSuffix );
                } else if( TYPE_PERSON.equals( strConnectedType ) ) {
                    strAvailability = strLabelUser + " : " + strSuffix;
                } else {
                    strAvailability = strLabelEnterprise + " : " + strSuffix;
                }
                availabilityList.add( strAvailability );
            }
        } catch (Exception ex) {
            throw ex;
        }
        return availabilityList;
    }
//  IR-047371V6R2011 - END



    /**
    * Gets the MapList containing all Route Templates connected to the BusinessUnit.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds input arguments.
    * @return a MapList containing all Route Templates connected to the BusinessUnit .
    * @throws Exception if the operation fails.
    * @since Common 10.0.0.0
    */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public  Object getBusinessUnitRouteTemplates(matrix.db.Context context, String[] args) throws Exception
    {
       String sScope = "to[" + RELATIONSHIP_ROUTE_TEMPLATES + "].from.type";
       String WorkspaceId                    = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from.id";
       String WorkspaceName                  = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from.name";
       String typeFilter                     = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from.type";
      if (args.length == 0 ){
        throw new IllegalArgumentException();
      }
      String busWhere = "current=='Active'";
      SelectList objectSelects = new SelectList(1);
      SelectList relSelects = new SelectList(1);
      objectSelects.add(DomainConstants.SELECT_ID);
      objectSelects.add(RouteTemplate.SELECT_NAME);
      objectSelects.add(RouteTemplate.SELECT_DESCRIPTION);
      objectSelects.add(RouteTemplate.SELECT_REVISION);
      objectSelects.add(RouteTemplate.SELECT_OWNER);
      objectSelects.add(RouteTemplate.SELECT_ROUTE_TEMPLATES_TYPE);
      objectSelects.add(RouteTemplate.SELECT_TYPE);
      objectSelects.add(WorkspaceId);
      objectSelects.add(WorkspaceName);
      objectSelects.add(typeFilter);
      objectSelects.add(RouteTemplate.SELECT_RESTRICT_MEMBERS);

      relSelects.add(DomainConstants.SELECT_RELATIONSHIP_ID);
      HashMap paramMap = (HashMap)JPO.unpackArgs(args);
      String objectId = (String)paramMap.get("objectId");
      MapList list = null;
      DomainObject obj = (DomainObject) DomainObject.newInstance(context);
      obj.setId(objectId);
      list = obj.getRelatedObjects(context,
                                    RouteTemplate.RELATIONSHIP_OWNING_ORGANIZATION,
                                    TYPE_ROUTE_TEMPLATE,
                                    objectSelects,
                                    relSelects,false,true,(short) 1,busWhere,null);
      return list;
    }

    /**
    * Gets the MapList containing all Route Templates.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds input arguments.
    * @return a MapList containing all Route Templates.
    * @throws Exception if the operation fails.
    * @since Common 10.0.1.1
    */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public Object getAllRouteTemplates(Context context, String[] args) throws Exception
   {
        return getRouteTemplates(context,null);
   }
   /**
    * Gets the MapList containing all Active Route Templates.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds input arguments.
    * @return a MapList containing all Route Templates.
    * @throws Exception if the operation fails.
    * @since Common 10.0.1.1
    */

   @com.matrixone.apps.framework.ui.ProgramCallable
   public Object getAllSearchRouteTemplates(Context context, String[] args) throws Exception
   {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        MapList routeTemplateList = new MapList();
        String typeFilter                     = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from.type";
        
        String sName =(String)programMap.get("txtName");
        String sScope = (String)programMap.get("selScope");
        String templateName="";
        String availability="";
         String where = "(current == Active)";
         boolean checkName=false;
         boolean checkAvailability=false;
         MapList tempList = (MapList)getRouteTemplates(context,where);
         Pattern namePattern = null;
         if( (sName != null) && (!sName.equals("*"))) {
            namePattern = new Pattern(sName);
            checkName=true;
         } else {
            sName = "*";
            namePattern = new Pattern(sName);
            checkName=false;
         }
         Pattern availabilityPattern = null;
         if( (sScope != null) && (!sScope.equals("*"))) {
            if(sScope.equals("User")){
                sScope=DomainObject.TYPE_PERSON;
            }else if(sScope.equals("Enterprise")){
                sScope=DomainObject.TYPE_COMPANY;
            }else if(sScope.equals("Workspace")){
                sScope=DomainObject.TYPE_WORKSPACE;
            }
            availabilityPattern = new Pattern(sScope);
            checkAvailability=true;
         }else {
            sScope = "*";
            availabilityPattern = new Pattern(sScope);
            checkAvailability=false;
         }
         if( !checkName && !checkAvailability )
         {
        	 //return tempList;
        	 routeTemplateList.addAll(tempList);
         }else{
             Hashtable tempMap=null;
             if(tempList != null)
             {
                for(int i=0;i<tempList.size();i++)
                {
                    tempMap=(Hashtable)tempList.get(i);
                    templateName = (String)tempMap.get(DomainObject.SELECT_NAME);
                    availability=(String)tempMap.get(typeFilter);
                    if((checkName) && (checkAvailability))
                    {
                        if ( (namePattern.match(templateName)) && (availabilityPattern.match(availability) ) )
                        {
                            routeTemplateList.add(tempMap);
                        }
                    }else if(checkName)
                    {
                        if (namePattern.match(templateName))
                        {
                            routeTemplateList.add(tempMap);
                        }
                    }else if(checkAvailability)
                    {
                        if (availabilityPattern.match(availability))
                        {
                            routeTemplateList.add(tempMap);
                        }
                    }
                }
             }
        }
         
         String workspaceFilter = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from.id";
         String workspaceId = (String)programMap.get("workspaceId");
         MapList routeTemplateListTemp = new MapList();
         if(workspaceId != null && workspaceId.trim().length() > 0){
        	 Hashtable tempMap=null;
        	 for(int i=0;i<routeTemplateList.size();i++)
        	 {
        		 tempMap=(Hashtable)routeTemplateList.get(i);
        		 String resultType = (String)tempMap.get(typeFilter);
        		 String resultWorkspaceId = (String)tempMap.get(workspaceFilter);
        		 if(DomainObject.TYPE_WORKSPACE.equalsIgnoreCase(resultType) )
        		 {
        			 if(workspaceId.equals(resultWorkspaceId)){
        				 routeTemplateListTemp.add(tempMap);
        			 }
        		 } else {
        			 routeTemplateListTemp.add(tempMap);
        		 }
        	 }
        	 return routeTemplateListTemp;
         } else {
        	 return routeTemplateList;
         }
   }

    /**
    * Gets the MapList containing Approval Route Templates.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds input arguments.
    * @return a MapList containing Approval Route Templates.
    * @throws Exception if the operation fails.
    * @since Common 10.0.1.1
    */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public Object getApprovalRouteTemplates(Context context, String[] args) throws Exception
   {
        String SELECT_ROUTE_BASE_PURPOSE = getAttributeSelect(ATTRIBUTE_ROUTE_BASE_PURPOSE);
        String buswhere = SELECT_ROUTE_BASE_PURPOSE + " == Approval";

        return getRouteTemplates(context,buswhere);
   }

    /**
    * Gets the MapList containing Review Route Templates.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds input arguments.
    * @return a MapList containing Review Route Templates.
    * @throws Exception if the operation fails.
    * @since Common 10.0.1.1
    */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public Object getReviewerRouteTemplates(Context context, String[] args) throws Exception
   {
        String SELECT_ROUTE_BASE_PURPOSE = getAttributeSelect(ATTRIBUTE_ROUTE_BASE_PURPOSE);
        String buswhere = SELECT_ROUTE_BASE_PURPOSE + " == Review";

        return getRouteTemplates(context,buswhere);
   }

    /**
    * Gets the MapList containing Standard Route Templates.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds input arguments.
    * @return a MapList containing Standard Route Templates.
    * @throws Exception if the operation fails.
    * @since Common 10.0.1.1
    */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public Object getStandardRouteTemplates(Context context, String[] args) throws Exception
   {
        String SELECT_ROUTE_BASE_PURPOSE = getAttributeSelect(ATTRIBUTE_ROUTE_BASE_PURPOSE);
        String buswhere = SELECT_ROUTE_BASE_PURPOSE + " == Standard";

        return getRouteTemplates(context,buswhere);
   }


    /**
    * Gets the MapList containing all Route Templates.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds input arguments.
    * @return a MapList containing all Route Templates.
    * @throws Exception if the operation fails.
    * @since Common 10.0.1.1
    */
   @SuppressWarnings({ "static-access", "deprecation" })
   private Object getRouteTemplates(Context context, String objWhere) throws Exception
   {

       //commented for bug 352540
       //String sScope = "to[" + RELATIONSHIP_ROUTE_TEMPLATES + "].from.type"; 
        
        String WorkspaceId                    = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from.id";
        String WorkspaceName                  = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from.name";
        String typeFilter                     = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from.type";
        String WorkspaceTitle                  = "to["+RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES+"].from."+DomainConstants.SELECT_ATTRIBUTE_TITLE;
       //Added for bug 352071
       String buFilter = RouteTemplate.SELECT_OWNING_ORGANIZATION_ID;
        // build select params
        if (objWhere != null)
        {
            //Added for bug 376335
            if(objWhere.indexOf("current == Active") != -1)
                objWhere=objWhere+" && latest==TRUE";
            //Ended
            else
                objWhere=objWhere+" && revision==last";
            
        }else{
            objWhere="revision==last";
        }

        SelectList selectStmts = new SelectList();


        selectStmts.add(RouteTemplate.SELECT_NAME);
        selectStmts.add(RouteTemplate.SELECT_DESCRIPTION);
        selectStmts.add(RouteTemplate.SELECT_REVISION);
        selectStmts.add(RouteTemplate.SELECT_OWNER);
        //commented for bug 352540
        //selectStmts.add(RouteTemplate.SELECT_ID);
        selectStmts.add(RouteTemplate.SELECT_ROUTE_TEMPLATES_TYPE);
       //Added SELECT_OWNING_ORGANIZATION_ID for bug 352071
       selectStmts.add(RouteTemplate.SELECT_OWNING_ORGANIZATION_ID);
        selectStmts.add(RouteTemplate.SELECT_TYPE);
        selectStmts.add(RouteTemplate.SELECT_ID);
        selectStmts.add(WorkspaceId);
        selectStmts.add(WorkspaceName);
        selectStmts.add(WorkspaceTitle);
        selectStmts.add(typeFilter);
        selectStmts.add(RouteTemplate.SELECT_RESTRICT_MEMBERS);
//  IR-047371V6R2011 - START
       selectStmts.add( RouteTemplate.SELECT_OWNING_ORGANIZATION_NAME );
       selectStmts.add( RouteTemplate.SELECT_OWNING_ORGANIZATION_TITLE );
//  IR-047371V6R2011 - END

       String relLinkRT= PropertyUtil.getSchemaProperty(context,"relationship_LinkRouteTemplate" );
       String selectable_name = "from["+relLinkRT+"].to.name";
       String selectable_id = "from["+relLinkRT+"].to.id";
       selectStmts.add( selectable_id );
       selectStmts.add( selectable_name );

		List<Map> templateMapList = new MapList();
        MapList templatePersonMapList = new MapList();
       MapList finalTemplateMap = new MapList();
       MapList tempMap = new MapList();
        try
        {
            String orgId = PersonUtil.getUserCompanyId(context);
            DomainObject templateObj = DomainObject.newInstance(context);
            Pattern OrgRelPattern = new Pattern(RELATIONSHIP_ROUTE_TEMPLATES);
            OrgRelPattern.addPattern(DomainConstants.RELATIONSHIP_DIVISION);
            OrgRelPattern.addPattern(RELATIONSHIP_COMPANY_DEPARTMENT );
            Pattern OrgTypePattern = new Pattern(TYPE_ROUTE_TEMPLATE);
            OrgTypePattern.addPattern(DomainConstants.TYPE_BUSINESS_UNIT);
            OrgTypePattern.addPattern(DomainConstants.TYPE_DEPARTMENT);
            Pattern includeOrgRelPattern = new Pattern(RELATIONSHIP_ROUTE_TEMPLATES);
            Pattern includeOrgTypePattern = new Pattern(TYPE_ROUTE_TEMPLATE);

            //Get the enterprise level RouteTemplates
            if(orgId != null)
            {
                templateObj.setId(orgId);
                templateMapList = templateObj.getRelatedObjects(context,
                                                                OrgRelPattern.getPattern(),
                                                                OrgTypePattern.getPattern(),
                                                                selectStmts,
                                                                null,
                                                                false,//modified for bug 352540
                                                                true,
                                                                (short)0,
                                                                objWhere,
                                                                null,
                                                                includeOrgTypePattern,
                                                                includeOrgRelPattern,
                                                                null);

            }
            // TO retrieve templates Owned by Current User

     /*       Collection obPersonIds    = null;
            Iterator personItr        = null;
            BusinessObject objPerson = null;

            HashMap personHash = new HashMap();
            personHash.put("",PersonUtil.getPersonObjectID(context));
            obPersonIds = personHash.values();
            personItr = obPersonIds.iterator();

            while(personItr.hasNext())
            {
                objPerson = new BusinessObject((String)personItr.next());
                templateObj.setId(objPerson.getObjectId()); */  //commented for bug 352540

				templateObj.setId(PersonUtil.getPersonObjectID(context));

                ContextUtil.startTransaction(context,false);
                ExpansionIterator expIter = templateObj.getExpansionIterator(context,
                                                                            RELATIONSHIP_ROUTE_TEMPLATES,
                                                                            TYPE_ROUTE_TEMPLATE,
                                                                            selectStmts,
                                                                            new StringList(),
                                                                            false,
                                                                            true,
                                                                            (short)1,
                                                                            objWhere,
                                                                            null,
                                                                            (short)0,
                                                                            false,
                                                                            false,
                                                                            (short)100,
                                                                            false);

                templatePersonMapList =  FrameworkUtil.toMapList(expIter,(short)0,null,null,null,null);
                expIter.close();
                ContextUtil.commitTransaction(context);

                for (int i=0;i<templatePersonMapList.size();i++)
                {
                	Map map = (Map)templatePersonMapList.get(i);
                	tempMap.add((String)map.get(RouteTemplate.SELECT_ID));
                    templateMapList.add(map);
                }
                    
            

            if(FrameworkUtil.isSuiteRegistered(context,"featureVersionTeamCentral",false,null,null))
            {
            	   templateObj.setId(com.matrixone.apps.common.Person.getPerson(context).getObjectId());
                   Pattern typePattern = new Pattern(templateObj.TYPE_ROUTE_TEMPLATE);
                   typePattern.addPattern(templateObj.TYPE_PROJECT);
                   Pattern relPattern = new Pattern(templateObj.RELATIONSHIP_ROUTE_TEMPLATES);
                   relPattern.addPattern(templateObj.RELATIONSHIP_WORKSPACE_MEMBER);
                   Pattern includeTypePattern = new Pattern(templateObj.TYPE_ROUTE_TEMPLATE);

                   MapList templateWorkspaceMapList = templateObj.getRelatedObjects(context,
                                   relPattern.getPattern(),
                                   typePattern.getPattern(),
                                   selectStmts,
                                   null,
                                   true,
                                   true,
                                   (short)2,
                                   objWhere,
                                   "",
                                   includeTypePattern,
                                   null,
                                   null);

                   Iterator tempMapItr = templateWorkspaceMapList.iterator();
                   while(tempMapItr.hasNext()) {
                   Map map = (Map)tempMapItr.next();
                   if(((String)map.get(typeFilter)).equals(templateObj.TYPE_PROJECT)&&(!templateMapList.contains(map))&&!tempMap.contains((String)map.get(RouteTemplate.SELECT_ID))) {
                        templateMapList.add(map);
            }
                }
            }
            if(FrameworkUtil.isSuiteRegistered(context,"appVersionProgramCentral",false,null,null))
            {

                templateObj.setId(com.matrixone.apps.common.Person.getPerson(context).getObjectId());
                Pattern typePattern = new Pattern(templateObj.TYPE_ROUTE_TEMPLATE);
                typePattern.addPattern(templateObj.TYPE_PROJECT_SPACE);
                Pattern relPattern = new Pattern(templateObj.RELATIONSHIP_ROUTE_TEMPLATES);
                relPattern.addPattern(templateObj.RELATIONSHIP_MEMBER);
                //String sWhere             = "(revision ~~ last)";
                Pattern includeTypePattern = new Pattern(templateObj.TYPE_ROUTE_TEMPLATE);

                StringBuilder isKindOfProjectSpace = new StringBuilder(55);
                isKindOfProjectSpace.append("to[").append(RouteTemplate.RELATIONSHIP_ROUTE_TEMPLATES).append("].from.");
                isKindOfProjectSpace.append(DomainConstants.SELECT_KINDOF_PROJECT_SPACE);
                
                selectStmts.add(isKindOfProjectSpace.toString());
                
                MapList templateProjectspaceMapList = templateObj.getRelatedObjects(context,
                                relPattern.getPattern(),
                                typePattern.getPattern(),
                                selectStmts,
                                null,
                                true,
                                true,
                                (short)2,
                                objWhere,
                                "",
                                includeTypePattern,
                                null,
                                null);

                Iterator tempMapItr = templateProjectspaceMapList.iterator();
                HashMap attrMap = new HashMap();
       	   while(tempMapItr.hasNext()) {
                Map map = (Map)tempMapItr.next();
                    //getting ITable:sortObjects - java.lang.IllegalArgumentException: fromIndex(4) > toIndex(2) error when directly add the map
                    //may be because of different levels
                    if("TRUE".equalsIgnoreCase((String) map.get(isKindOfProjectSpace.toString())) &&(!templateMapList.contains(map))) {
                    templateMapList.add(map);
                    }
           }
            }

			//get the BUs for the context person
			ArrayList buList = getBURelatedToPerson (context);
            Iterator templateMapListItr = templateMapList.iterator();
           String contextPerson = context.getUser();
           String perName = "";
           String busUnitId = "";
           String owner = "";
       		String type = "";
           
            Map templateMap;
            DomainObject busUnitBO;
            BusinessUnit businessUnit;
            while(templateMapListItr.hasNext()){

                templateMap = (Map)templateMapListItr.next();
                templateMap.remove("level");
               // Modified for bug 352071
                String buFilterQuery=buFilter;
               busUnitId = (String) templateMap.get(buFilterQuery);
               String buTypeOfCompany=PropertyUtil.getSchemaProperty(context,"type_BusinessUnit");
               String deptTypeOfCompany=PropertyUtil.getSchemaProperty(context,"type_Department");
                if(busUnitId != null && !"".equals(busUnitId))
                {
                    busUnitBO = DomainObject.newInstance(context, busUnitId);
                    type = (String) busUnitBO.getInfo(context,DomainConstants.SELECT_TYPE);
                }

                owner = (String) templateMap.get("owner");
                if (contextPerson.equals(owner)) {
                    finalTemplateMap.add(templateMap);
                }

               else if (buTypeOfCompany.equals(type)) {

				   	//Add the Template if the Context Person is part of the BU
					
				   	if (buList.contains(busUnitId)) {
						finalTemplateMap.add(templateMap);
					}
               }
                else if (deptTypeOfCompany.equals(type)) {

                        //Add the Template if the Context Person is part of the BU
                        
                        if (buList.contains(busUnitId)) {
                            finalTemplateMap.add(templateMap);
                        }
                   }
/*
                   businessUnit = new BusinessUnit(busUnitId);
                   StringList personNameList = new StringList();
                   personNameList.add(DomainObject.SELECT_NAME);
                   MapList personMapList = businessUnit.getPersons(context, personNameList,objWhere);
                   Iterator iterator = personMapList.iterator();
                   while (iterator.hasNext()) {
                       Map buPerson = (Map) iterator.next();
                       perName = (String) buPerson.get("name");
                        if(contextPerson.equalsIgnoreCase(perName))
                        {
                            finalTemplateMap.add(templateMap);
                            break;
                        }
                   }
*/

                else {
                   finalTemplateMap.add(templateMap);
               }

               //end of bug 352071

           }

       } catch (Exception e) {

       }

       return finalTemplateMap;

    }

public Vector getScope(Context context, String[] args) throws Exception {
    Vector vScope = new Vector();
    try {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        MapList objectList = (MapList) programMap.get("objectList");
        HashMap paramMap = (HashMap) programMap.get("paramList");
        String langStr = (String) paramMap.get("languageStr");

        Iterator objectListItr = objectList.iterator();
        while (objectListItr.hasNext()) {
            Map objectMap = (Map) objectListItr.next();
            String restrictMembers = (String) objectMap
                    .get(RouteTemplate.SELECT_RESTRICT_MEMBERS);
            if (restrictMembers.equalsIgnoreCase("All")) {
                restrictMembers = EnoviaResourceBundle.getProperty(context,
                		"emxComponentsStringResource", new Locale(langStr),"emxComponents.Common.All");
            } else if (restrictMembers.equalsIgnoreCase("Organization")) {
                restrictMembers = EnoviaResourceBundle.getProperty(context,
                		"emxComponentsStringResource", new Locale(langStr),"emxComponents.Common.Organization");
            }
            vScope.add(restrictMembers);
        }

    } catch (Exception ex) {
        throw ex;
    }
    return vScope;
}
   /**
    * Gets the MapList containing all Revision of the  Route Templates.
    * @param context the eMatrix <code>Context</code> object
    * @param args holds input arguments.
    * @return a MapList containing all Route Templates.
    * @throws Exception if the operation fails.
    * @since Common 10.0.1.1
    */

   @com.matrixone.apps.framework.ui.ProgramCallable
   public Object getRevisions(Context context, String[] args) throws Exception
   {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String routeTemplateId=(String)programMap.get("objectId");
        MapList routeTemplateList = new MapList();
        DomainObject templateObj = DomainObject.newInstance(context);
        templateObj.setId(routeTemplateId);
        MapList templateMapList =  null;
        StringList sList = new StringList();
        sList.addElement(templateObj.SELECT_ID);
        sList.addElement(templateObj.SELECT_NAME);
        sList.addElement(templateObj.SELECT_REVISION);
        sList.addElement(templateObj.SELECT_ORIGINATED);
        templateMapList = templateObj.getRevisions(context,sList,false);
        return templateMapList;
   }


public String getRouteTemplateAvailability(Context context, String[] args) throws Exception
{

        String routTempList = "";
        String strRouteTempId = args[0];
        DomainObject doRouteObject = new DomainObject(strRouteTempId);
        
        //Commented and modified for bug 359291
        //String strType = (String) doRouteObject.getInfo(context,SELECT_TYPE);
        String strType = args[1];

        if (mxType.isOfParentType(context,strType,DomainConstants.TYPE_ROUTE_TEMPLATE)) {
			SelectList busSelList = new SelectList(2);
			busSelList.add("to[" + DomainConstants.RELATIONSHIP_ROUTE_TEMPLATES + "].from.name");
			busSelList.add("to[" + DomainConstants.RELATIONSHIP_ROUTE_TEMPLATES + "].from.type");

			Map scopeMap = doRouteObject.getInfo(context, busSelList);
			String strScopeType = (String) scopeMap.get("to[" + DomainConstants.RELATIONSHIP_ROUTE_TEMPLATES + "].from.type");
			String strScopeName = (String) scopeMap.get("to[" + DomainConstants.RELATIONSHIP_ROUTE_TEMPLATES + "].from.name");
			if ((strScopeName != null)&&(!strScopeName.equals("")))
			{
			  if (mxType.isOfParentType(context,strScopeType,DomainConstants.TYPE_PERSON))
					 {
				routTempList = ((String) scopeMap.get("to[" + DomainConstants.RELATIONSHIP_ROUTE_TEMPLATES + "].from.name"));
				 } else {
					  routTempList = "Enterprise";
					}
			}
        }
        return routTempList;
   }

public boolean isValidTemplateId(Context context, String[] args) throws Exception
{

	String routTempList = "";
	String strRouteTempId = args[0];
	DomainObject domTemplateObj = new DomainObject(strRouteTempId);
	//No need to restrict based on due date offset, as we start supporting on route management widget
	//final String selDueDateOffset = "attribute["+DomainObject.ATTRIBUTE_DUEDATE_OFFSET+"]";
	final String selRouteTaskUser = "attribute["+DomainObject.ATTRIBUTE_ROUTE_TASK_USER+"]";
	//No need to restrict the templates based on RTE settings
		/*
		 * final String selTaskEditSetting =
		 * "attribute["+DomainObject.ATTRIBUTE_TASKEDIT_SETTING+"]"; StringList
		 * selectables = new StringList(4); selectables.add(selTaskEditSetting);
		 * 
		 * Map mTemplateInfo = domTemplateObj.getInfo (context, selectables); String
		 * strTaskEditSetting = (String) mTemplateInfo.get(selTaskEditSetting);
		 * if(UIUtil.isNotNullAndNotEmpty(strTaskEditSetting) &&
		 * !"Modify/Delete Task List".equals(strTaskEditSetting)){ return false; }
		 */



	StringList relSelectables = new StringList(4);
	//relSelectables.addElement(selDueDateOffset);
	relSelectables.addElement(selRouteTaskUser);

	StringList objSelects = new StringList(2);
	objSelects.addElement(SELECT_TYPE);

	Pattern typePattern = new Pattern(DomainObject.TYPE_PERSON);
	typePattern.addPattern(DomainObject.TYPE_ROUTE_TASK_USER);
	//get all route-node rels connected to the route
	MapList routeNodeList =  domTemplateObj.getRelatedObjects(context,
			DomainObject.RELATIONSHIP_ROUTE_NODE, //relationshipPattern
			typePattern.getPattern(), //typePattern
			objSelects, relSelectables,
			false, true,
			(short)1,
			null, null,
			0,
			null, null, null);

	for (Iterator itrRouteNodeList = routeNodeList.iterator(); itrRouteNodeList.hasNext();) {
		Map mapRelInfo = (Map)itrRouteNodeList.next();
		String strTaskAssigneeType = (String) mapRelInfo.get(SELECT_TYPE);
		if(DomainObject.TYPE_ROUTE_TASK_USER.equals(strTaskAssigneeType)){
			return false;
		}
			/*
			 * else{ String strDueDateOffset = (String) mapRelInfo.get(selDueDateOffset);
			 * if(UIUtil.isNotNullAndNotEmpty(strDueDateOffset)){ return false; } }
			 */
	}
	return true;
}


public boolean isRouteOwnerTemplate(Context context, String[] args) throws Exception
{

	String routTempList = "";
	String strRouteTempId = args[0];
	String strRouteNodeValue = args[1];
	System.out.println("strRouteTempId : "+strRouteTempId);
	System.out.println("strRouteNodeValue : "+strRouteNodeValue);

	return true;
}

public ArrayList getBURelatedToPerson (Context context) throws Exception {

				ArrayList BUList = new ArrayList();
				SelectList selectStmts = new SelectList(1);
        		selectStmts.add("id");

				DomainObject personObj = DomainObject.newInstance(context);
                personObj.setId(com.matrixone.apps.common.Person.getPerson(context).getObjectId());
                Pattern typePattern = new Pattern(PropertyUtil.getSchemaProperty(context,"type_BusinessUnit"));
                typePattern.addPattern(DomainConstants.TYPE_BUSINESS_UNIT);
                typePattern.addPattern(DomainConstants.TYPE_DEPARTMENT);
                Pattern relPattern = new Pattern(PropertyUtil.getSchemaProperty(context,"relationship_BusinessUnitEmployee"));
                relPattern.addPattern(DomainConstants.RELATIONSHIP_BUSINESS_UNIT_EMPLOYEE);
                relPattern.addPattern(RELATIONSHIP_MEMBER );
				String objWhere  = "";

                MapList BUMapList = personObj.getRelatedObjects(context,
                                relPattern.getPattern(),
                                typePattern.getPattern(),
                                selectStmts,
                                null,
                                true,
                                true,
                                (short)1,
                                objWhere,
                                "",
                                null,
                                null,
                                null);

				Iterator BUListItr = BUMapList.iterator();
				String busUnitId = "";
				Map BUMap = null;
				while(BUListItr.hasNext()){
					BUMap = (Map)BUListItr.next();
					busUnitId = (String)BUMap.get("id");
					if (busUnitId!=null && !busUnitId.equals("")) {
						BUList.add(busUnitId);
					}
				}

				return BUList;
}

/**
 * gets route template's scope name and id(only for WS and WS vault, Project space scopes) based on its availability
 * @param context
 * @param args - route template id as String
 * @return HashMap with values for scopeName, scopeID (only for Workspace and Workspace vault)
 * @throws Exception
 */

public HashMap getRouteTemplateScopeInfo(Context context, String[] args) throws Exception{
	HashMap routeTemplateScopeMap = new HashMap();
	StringList routeTemplateSelects = new StringList(1);
	String strRouteTemplateId = (String) JPO.unpackArgs(args);
	RouteTemplate routeTemplateObject = (RouteTemplate) DomainObject.newInstance(context, DomainConstants.TYPE_ROUTE_TEMPLATE);
	routeTemplateObject.setId(strRouteTemplateId);
    routeTemplateSelects.add(routeTemplateObject.SELECT_ROUTE_TEMPLATES_TYPE);
    routeTemplateSelects.add("to["+routeTemplateObject.RELATIONSHIP_ROUTE_TEMPLATES+"].from.name");
    routeTemplateSelects.add("to[" + routeTemplateObject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.id");
    routeTemplateSelects.add("attribute[" + routeTemplateObject.ATTRIBUTE_RESTRICT_MEMBERS + "]");
    
    Map routeTemplateInfo = routeTemplateObject.getInfo(context, routeTemplateSelects);
    String scopeType = (String)routeTemplateInfo.get(routeTemplateObject.SELECT_ROUTE_TEMPLATES_TYPE);
    String sAvailabilityName      = (String)routeTemplateInfo.get("to[" + routeTemplateObject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.name");
    String sAvailabilityId      = (String)routeTemplateInfo.get("to[" + routeTemplateObject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.id");
    routeTemplateScopeMap.put("scopeType", scopeType);
    if(scopeType.equals(DomainConstants.TYPE_PERSON) || scopeType.equals(DomainConstants.TYPE_DEPARTMENT) || 
    		scopeType.equals(DomainConstants.TYPE_ORGANIZATION) || scopeType.equals(DomainConstants.TYPE_COMPANY) || 
    		scopeType.equals(DomainConstants.TYPE_BUSINESS_UNIT)){
        String restrictMembers = (String) routeTemplateInfo.get("attribute[" + routeTemplateObject.ATTRIBUTE_RESTRICT_MEMBERS + "]");
        routeTemplateScopeMap.put("scopeName", restrictMembers);
        
    }else{
    	routeTemplateScopeMap.put("scopeName", sAvailabilityName);
    	routeTemplateScopeMap.put("scopeID", sAvailabilityId);
    }
	return routeTemplateScopeMap;
}

public String showRouteTemplateAvailability(Context context, String[] args) throws Exception
{
    HashMap programMap         = (HashMap) JPO.unpackArgs(args);
    Map requestMap             = (Map) programMap.get("requestMap");
    String strLanguage         = (String)requestMap.get("languageStr");
    StringBuffer sb            = new StringBuffer();
    i18nNow i18nnow            = new i18nNow();
    String routeTemplateId     = (String) requestMap.get("objectId");
    String mode                = (String) requestMap.get("mode");
    RouteTemplate boProject    = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);
    StringList routeSelects    = new StringList(4);
    boProject.setId(routeTemplateId);
    routeSelects.add(boProject.SELECT_ROUTE_TEMPLATES_TYPE);
    routeSelects.add("to["+boProject.RELATIONSHIP_ROUTE_TEMPLATES+"].from.name");
    routeSelects.add("to["+boProject.RELATIONSHIP_OWNING_ORGANIZATION+"].from.name");
    routeSelects.add("to["+boProject.RELATIONSHIP_OWNING_ORGANIZATION+"].from.attribute[Title]");
    routeSelects.addElement("to[" + boProject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.id");
    routeSelects.add("to["+boProject.RELATIONSHIP_ROUTE_TEMPLATES+"].from.attribute[Title]");
    Map routeMap = boProject.getInfo(context,routeSelects);
    String connectedType = (String)routeMap.get(boProject.SELECT_ROUTE_TEMPLATES_TYPE);
    String connectedName =  (String)routeMap.get("to["+boProject.RELATIONSHIP_OWNING_ORGANIZATION+"].from.attribute[Title]");
    String sAvailabilityName      = (String)routeMap.get("to[" + boProject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.name");
    String sAvailabilityId      = (String)routeMap.get("to[" + boProject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.id");
    String sAvailabilityTitle      = (String)routeMap.get("to[" + boProject.RELATIONSHIP_ROUTE_TEMPLATES + "].from.attribute[Title]");
    String sAvailability = "";
    String sChecked="";
    String sLabel=EnoviaResourceBundle.getProperty(context,"Components","emxComponents.CreateRoute.SelectScope",strLanguage);
    String strSelectScope      = sLabel;
    boolean hasEnterpriseAccess = false;
    com.matrixone.apps.common.Person person = com.matrixone.apps.common.Person.getPerson(context);
    if(person.hasRole(context,DomainObject.ROLE_ORGANIZATION_MANAGER) || person.hasRole(context,DomainObject.ROLE_COMPANY_REPRESENTATIVE) || person.hasRole(context,PropertyUtil.getSchemaProperty(context, "role_VPLMProjectLeader"))
    		|| person.hasRole(context,PropertyUtil.getSchemaProperty(context, "role_VPLMProjectAdministrator"))
    		|| person.hasRole(context,PropertyUtil.getSchemaProperty(context, "role_3DSRestrictedOwner"))
    		|| person.hasRole(context,PropertyUtil.getSchemaProperty(context, "role_VPLMAdmin")))
    {
      hasEnterpriseAccess = true;
    }
    if(connectedType.equals(boProject.TYPE_PERSON))
    {
         sChecked="";
    }else if(connectedType.equals(boProject.TYPE_DEPARTMENT) || connectedType.equals(boProject.TYPE_ORGANIZATION) || connectedType.equals(boProject.TYPE_COMPANY) || connectedType.equals(boProject.TYPE_BUSINESS_UNIT)){

         sChecked="";
    }
    else 
    {
         sChecked="checked";
         sLabel=sAvailabilityName;
         if(connectedType.equals(boProject.TYPE_WORKSPACE)) {
 			sLabel=sAvailabilityTitle;
 		}
    }
    if(connectedName == null)
    {
      connectedName = (String)routeMap.get("to["+boProject.RELATIONSHIP_ROUTE_TEMPLATES+"].from.name");
    }
    if(mode.equals("view"))
    {
    if(connectedType.equals(boProject.TYPE_PERSON))
    {
        sAvailability = EnoviaResourceBundle.getProperty(context,"Components","emxComponents.SearchTemplate.User",strLanguage);
        connectedName = PersonUtil.getFullName(context,connectedName);
    }
    else if(connectedType.equals(boProject.TYPE_PROJECT_SPACE)   || mxType.isOfParentType(context,connectedType,DomainConstants.TYPE_PROJECT_SPACE) ){
    	 sAvailability =EnoviaResourceBundle.getProperty(context,"Components","emxComponents.Common.Projectspace",strLanguage); 	
   	}
    	else if(connectedType.equals(boProject.TYPE_WORKSPACE)) //Modified to handle Sub Type
    {
         sAvailability =EnoviaResourceBundle.getProperty(context,"Components","emxComponents.SearchTemplate.Workspace",strLanguage); 
     }else{
         sAvailability =EnoviaResourceBundle.getProperty(context,"Components","emxComponents.SearchTemplate.Enterprise",strLanguage);
      }
    sb.append(sAvailability);
    sb.append(": ");
    if(connectedType.equals(boProject.TYPE_WORKSPACE)) {
    	sb.append(sAvailabilityTitle);
    } else {
    	sb.append(connectedName);
    }
     
    }
    if(mode.equals("edit"))
    {
        sb.append("<input type=\"radio\" name=\"availability\" value=\"User\" ");
                sb.append(connectedType.equals(boProject.TYPE_PERSON)?"checked":"");
                    sb.append(" onClick=\"routeTemplateEditScopeClearAll()\">");
        sb.append(EnoviaResourceBundle.getProperty(context,"Components","emxComponents.Common.User",strLanguage));
        sb.append("<br>");
    if( hasEnterpriseAccess)
      {
        sb.append("<input type=\"radio\" name=\"availability\" value=\"Enterprise\" " );
                sb.append(connectedType.equals(boProject.TYPE_DEPARTMENT)||connectedType.equals(boProject.TYPE_COMPANY)||connectedType.equals(boProject.TYPE_BUSINESS_UNIT)||connectedType.equals(boProject.TYPE_ORGANIZATION) ?"checked":"");
        sb.append(" onClick=\"setRouteTemplateEditOrganization()\">");
        sb.append(EnoviaResourceBundle.getProperty(context,"Components","emxComponents.Common.Enterprise",strLanguage));
        sb.append("<br>");
     }
    sb.append("<input type=\"radio\" name=\"availability\" value=\"Workspace\"" );
            sb.append(sChecked);
    sb.append(" onClick=\"setRouteTemplateEditAvailability()\">");
    sb.append("<input READONLY type = \"text\" name = \"txtWSFolder\" id = \"txtWSFolder\" readonly value = \"");
            sb.append(sLabel);
            sb.append("\" size = \"20\">");
            sb.append("<input type = \"hidden\" name = \"folderId\" value = \"");
                    sb.append(sAvailabilityId);
                    sb.append("\" >" );
            sb.append("<input type=button name = \"ellipseButton\" value=\"...\" onClick=showRouteTemplateEditWSChooser() ");
                    sb.append(!sLabel.equals(null)&& !sLabel.equals("null") && !sLabel.equals(strSelectScope) ? "":"disabled");
                    sb.append(" >");

    }
    return sb.toString();
}

@com.matrixone.apps.framework.ui.PostProcessCallable
public void routeTemplateEditProcess(Context context, String[] args) throws Exception
{
    HashMap programMap         = (HashMap) JPO.unpackArgs(args);
    Map requestMap             = (Map) programMap.get("requestMap");
    Map paramMap               = (Map) programMap.get("paramMap");
    
    String strAutoStopOnRejection = (String)requestMap.get("AutoStopOnRejection");
    String sDescription           = (String)requestMap.get("Description");
    String organizationId         = (String)requestMap.get("organizationId");
    String ownerId                = (String)requestMap.get("OwnerOID");
    String scope                  = (String)requestMap.get("scope");
    String routeTemplateId        = (String)requestMap.get("objectId");
    String sOwner                 = (String)requestMap.get("Owner");
    String sAvailability          = (String)requestMap.get("availability");
    String sExternalAvailable     = (String)requestMap.get("txtWSFolder");//sWorkspaceName
    String sExternalAvailableId   = (String)requestMap.get("folderId");//sWorkspaceId
    String strRouteTaskEdit       = (String)requestMap.get("Route Task Edits");
    String sAttrRouteTaskEdit     = PropertyUtil.getSchemaProperty(context, "attribute_TaskEditSetting");
    String strOldRouteTaskEdits   = null;
    boolean errFlag               = false;
    final String ATTRIBUTE_AUTO_STOP_ON_REJECTION = PropertyUtil.getSchemaProperty(context, "attribute_AutoStopOnRejection" );
    if(strRouteTaskEdit == null){
        strRouteTaskEdit = "";
    }
    RouteTemplate template        = new RouteTemplate(routeTemplateId);
    if (routeTemplateId != null) {
        RouteTemplate routeTemplateObj = (RouteTemplate)DomainObject.newInstance(context , routeTemplateId );
        strOldRouteTaskEdits  = routeTemplateObj.getAttributeValue(context, sAttrRouteTaskEdit);
        if(strOldRouteTaskEdits == null){
            strOldRouteTaskEdits = "";
        }
        if( (sAvailability == null) || ("".equals(sAvailability)) )
        {
            DomainObject connectDO = DomainObject.newInstance(context);
            if( (sExternalAvailableId != null) && (!sExternalAvailableId.equals("")) )
            {
                connectDO.setId(sExternalAvailableId);
                sAvailability = connectDO.getInfo(context,connectDO.SELECT_TYPE);
            }
        }
        HashMap detailsMap = new HashMap();
        ContextUtil.startTransaction(context, true);
        if(organizationId == null || "null".equals(organizationId))
        {
            organizationId = "";
        }
        if(organizationId.trim().length() > 0)
        {
            String keyVal = "newId=";
            int i = organizationId.indexOf(keyVal);
            if(i > -1) {
                organizationId = organizationId.substring(i+keyVal.length(),organizationId.length());
            }
        }
        detailsMap.put("ownerId" , ownerId);
        detailsMap.put("availability" , sAvailability);
        detailsMap.put("workspaceName" , sExternalAvailable);
        detailsMap.put("workspaceId" , sExternalAvailableId);
        detailsMap.put("description", sDescription);
        detailsMap.put("organizationId" , organizationId); 
        
        String oldRelId     = (String)routeTemplateObj.getInfo(context,"to[" +routeTemplateObj.RELATIONSHIP_OWNING_ORGANIZATION + "].id");
        String oldScopeId     = (String)routeTemplateObj.getInfo(context,"to[" +routeTemplateObj.RELATIONSHIP_OWNING_ORGANIZATION + "].from.id");
        try{
            if(oldScopeId != null && !oldScopeId.equals(organizationId) && !organizationId.equals("")) {
                Organization organization=new Organization(organizationId);
                DomainRelationship.modifyFrom(context, oldRelId, organization);
                String oldRouteScopeId     = (String)routeTemplateObj.getInfo(context,"to[" +routeTemplateObj.RELATIONSHIP_ROUTE_TEMPLATES + "].from.id");
                detailsMap.put("organizationId" , oldRouteScopeId); 
            }
            
            Map mapAttributeValues = new HashMap();
            
            if(!strRouteTaskEdit.equals(strOldRouteTaskEdits)){
                mapAttributeValues.put(sAttrRouteTaskEdit, strRouteTaskEdit);
            }
            
            mapAttributeValues.put(routeTemplateObj.ATTRIBUTE_RESTRICT_MEMBERS, scope);
            
            if (strAutoStopOnRejection != null) {
                mapAttributeValues.put(ATTRIBUTE_AUTO_STOP_ON_REJECTION, strAutoStopOnRejection);
            }
            
            routeTemplateObj.setAttributeValues(context, mapAttributeValues);
            
            routeTemplateObj.editRouteTemplate(context , detailsMap);
            ContextUtil.commitTransaction(context);  
        }catch(Exception e)
        {
            ContextUtil.abortTransaction(context);  
            errFlag        = true;
        }
    }
}

public boolean showOwningOrganizationField(Context context, String[] args) throws Exception
{
    HashMap programMap         = (HashMap) JPO.unpackArgs(args);
    String mode                = (String)programMap.get("mode");
    return mode.equals("edit")? true : false;
}

public String owningOrganizationProgramHTML(Context context, String[] args) throws Exception
{
    HashMap programMap         = (HashMap) JPO.unpackArgs(args);
    Map requestMap             = (Map) programMap.get("requestMap");
    String routeTemplateId     = (String) requestMap.get("objectId");
    RouteTemplate boProject    = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);
    boProject.setId(routeTemplateId);
    SelectList selectStmts = new SelectList(7);
    selectStmts.addElement("to[" + boProject.RELATIONSHIP_OWNING_ORGANIZATION + "].from.name");
    selectStmts.addElement("to[" + boProject.RELATIONSHIP_OWNING_ORGANIZATION + "].from.attribute[Title]");
    selectStmts.addElement("to[" + boProject.RELATIONSHIP_OWNING_ORGANIZATION + "].from.id");
    Map resultMap = boProject.getInfo(context, selectStmts);
    String sOwningOrganization = (String)resultMap.get("to["+boProject.RELATIONSHIP_OWNING_ORGANIZATION+"].from.name");
    String sOwningOrganizationTitle = (String)resultMap.get("to["+boProject.RELATIONSHIP_OWNING_ORGANIZATION+"].from.attribute[Title]");
    String sOwningOrganizationId = (String)resultMap.get("to["+boProject.RELATIONSHIP_OWNING_ORGANIZATION+"].from.id");
    StringBuffer sb = new StringBuffer();
    if(sOwningOrganization==null)
    {
    sOwningOrganization=""; 
    }
    if(sOwningOrganizationTitle==null)
    {
    	sOwningOrganizationTitle=sOwningOrganization; 
    }
    sb.append("<input type=text name=\"organization\" value=\"").append(sOwningOrganizationTitle).append("\" size=\"20\" readonly>");
    sb.append("<input type=\"button\" name=\"selectOrganization\" value=\"...\"  onclick=\"javascript:showRTEditOrganizationChooser()\" ").append(!sOwningOrganization.equals(null)&& !sOwningOrganization.equals("null") && !sOwningOrganization.equals("") ? "":"disabled").append(">");
    sb.append("<input type=hidden name=\"organizationId\" value=\"").append(sOwningOrganizationId).append("\" >");
    return sb.toString();
}

	/**
	 * Returns OIDs of 'Route Templates' based on User or Enterprise or Workspace/ProjectSpace Availability
	 * @param context the eMatrix <code>Context</code> object
	 * @param args holds input arguments.
	 * @return a StringList containing all OIDS of Route Templates.
	 * @throws Exception if the operation fails.
	 * @since BPS R211
	 */

	@com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
	public StringList getRouteTemplateIncludeIDs(Context context, String[] args) throws FrameworkException 
	{
		try {
			Map programMap = (Map) JPO.unpackArgs(args);
        
			MapList routeTemplateList = (MapList)getRouteTemplates(context,null);   
			StringList ids = new StringList(routeTemplateList.size());
        
			for (int i = 0; i < routeTemplateList.size(); i++) {
				Map routeTemplate = (Map) routeTemplateList.get(i);
				ids.add((String)routeTemplate.get(SELECT_ID));
			}        
			return ids;
			
		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	}
     /**
     * Access Function for APPRouteTemplateEditDetails command.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args contains a packed HashMap with the following entries:
     * objectId - Object Id of the Route object.
     * @return boolean true or false values.
     * @throws Exception if the operation fails.
     * @since CommonComponents R211
     * */
    public boolean checksToEditRouteTemplate(Context context,String[] args) throws Exception {

           HashMap programMap         = (HashMap) JPO.unpackArgs(args);
           String objectId            = (String) programMap.get("objectId");

           return routetemplateEditAccessCheck(context, objectId);
    }    

    protected boolean routetemplateEditAccessCheck(Context context, String objectId) throws Exception {
        
        RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainObject.TYPE_ROUTE_TEMPLATE);
        boRouteTemplate.setId(objectId);
        
        StringList selectables = new StringList();
        selectables.add(SELECT_OWNER);
        selectables.add(SELECT_HAS_MODIFY_ACCESS);
        selectables.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
        String selectScopeObject = "to[" + RELATIONSHIP_ROUTE_TEMPLATES + "].from.type";
        selectables.add(selectScopeObject);
        
        DomainObject boObj = DomainObject.newInstance(context, objectId);
        Map objInfo = boObj.getInfo(context, selectables);
        
        String sOwner = (String)objInfo.get(SELECT_OWNER);
        String routeBasePurpose = (String) objInfo.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
        if(!RouteTemplate.isOperationAllowed(context, routeBasePurpose,sOwner)){
        	return false;
        }
        
        String hasModifyAccess =objInfo.get(SELECT_HAS_MODIFY_ACCESS).toString();
        
        if(sOwner.equals(context.getUser()) || "true".equalsIgnoreCase(hasModifyAccess)){
              return true;
        }
        String scopeType = (String) objInfo.get(selectScopeObject);
        Person personObj  =  Person.getPerson(context);
        if (TYPE_PROJECT.equals(scopeType)) {
            String scopeId = boRouteTemplate.getInfo(context, "to[" + RELATIONSHIP_ROUTE_TEMPLATES + "].from.id");
            Workspace wsObj = new Workspace(scopeId);
            if(wsObj.isProjectLead(context,personObj))
                return true;
        }
        
        return personObj.isRepresentativeFor(context, personObj.getCompanyId(context));
        
    }
    /**
     * Access Function for APPRouteTemplateActivateDeactivate command.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args contains a packed HashMap with the following entries:
     * objectId - Object Id of the Route object.
     * @return boolean true or false values.
     * @throws Exception if the operation fails.
     * @since CommonComponents R211
     * */
    public boolean showActivateDeactivateLink(Context context,String[] args) throws Exception {
        
        HashMap programMap         = (HashMap) JPO.unpackArgs(args);
        String objectId            = (String) programMap.get("objectId");
        boolean result             =  false;
        
        RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainObject.TYPE_ROUTE_TEMPLATE);
        boRouteTemplate.setId(objectId);
        StringList accessSelects = new StringList();
        accessSelects.add("current.access[promote]");
        accessSelects.add("current.access[demote]");
        accessSelects.add(SELECT_OWNER);
        accessSelects.add("last.id");
        accessSelects.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
        
        Map accessMap = boRouteTemplate.getInfo(context,accessSelects);
        
        String sOwner = (String)accessMap.get(SELECT_OWNER);
        String routeBasePurpose = (String) accessMap.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
        if(!RouteTemplate.isOperationAllowed(context, routeBasePurpose,sOwner)){
        	return false;
        }
        
        String promoteAccess = (String)accessMap.get("current.access[promote]");
        String demoteAccess = (String)accessMap.get("current.access[demote]");
        
        String latestrevisionid=(String)accessMap.get("last.id");
		
		if(!objectId.equalsIgnoreCase(latestrevisionid)){
        	return false;
        }
		
        if(("true".equalsIgnoreCase(promoteAccess) || "true".equalsIgnoreCase(demoteAccess)) && routetemplateEditAccessCheck(context, objectId)) {
            result=true;
        }
        return result;
    }
    
    
    protected Map getRangeValuesMap(StringList values, StringList displayValues, StringList selectedValues) {
        HashMap resultMap = new HashMap();
        resultMap.put("field_choices", values);
        resultMap.put("field_display_choices", displayValues);
        resultMap.put("field_value", selectedValues);
        return resultMap;
    }
    
    /**
     * Range Values for Availability field in Route Save As Template form
     * @param context
     * @param args
     * @return
     * @throws FrameworkException
     */
    public Map getSaveAsTemplateAvailabilityRange(Context context, String[] args) throws FrameworkException {
        try {
            Map programMap = (Map)JPO.unpackArgs(args);
            Map paramMap   = (Map)programMap.get("paramMap");
            String sLanguage = (String) paramMap.get("languageStr");
			String sVPLMProjectLeaderRole = PropertyUtil.getSchemaProperty(context, "role_VPLMProjectLeader"); 
			String sSecuredVPLMProjectLeaderRole = PropertyUtil.getSchemaProperty(context, "role_3DSRestrictedLeader"); 
            
            StringList values = new StringList(3);
            StringList range = new StringList(3);
            
            values.add("User");
            range.add(ComponentsUtil.i18nStringNow("emxComponents.SaveTemplateDialog.User", sLanguage));
            
            Person contextUser = Person.getPerson(context);
            if(contextUser.isRepresentativeFor(context, contextUser.getCompanyId(context)) || PersonUtil.hasAssignment(context, sVPLMProjectLeaderRole) || PersonUtil.hasAssignment(context, sSecuredVPLMProjectLeaderRole)) {
                values.add("Enterprise");
                range.add(ComponentsUtil.i18nStringNow("emxComponents.SaveTemplateDialog.Enterprise", sLanguage));
            }
            
            values.add("Workspace");
            range.add(ComponentsUtil.i18nStringNow("emxComponents.Common.WorkProjectspace", sLanguage));
            
            return  getRangeValuesMap(values, range, new StringList());           
            
        } catch (Exception e) {
            throw new FrameworkException(e);
        }
    }
        
    /**
     * Range Values for Scope field in Route Save As Template form
     * @param context
     * @param args
     * @return
     * @throws FrameworkException
     */
    
        public Map getSaveAsTemplateScopeRange(Context context, String[] args) throws FrameworkException {

            try {
                Map programMap = (Map)JPO.unpackArgs(args);
                Map paramMap   = (Map)programMap.get("paramMap");
                Map requestMap = (Map)programMap.get("requestMap");
                
                String objectId = (String)requestMap.get("objectId");
                String sLanguage = (String) paramMap.get("languageStr");
                
                StringList values = new StringList(2);
                StringList range = new StringList(2);
                StringList selectedValues = new StringList(1);
                
                values.add("All");
                range.add(ComponentsUtil.i18nStringNow("emxComponents.Common.All", sLanguage));
                
                values.add("Organization");
                range.add(ComponentsUtil.i18nStringNow("emxComponents.Common.Organization", sLanguage));
                
                String selectedScope = getScopeForRouteTemplate(context, objectId);
                if("Organization".equals(selectedScope)){
                	selectedValues.add(ComponentsUtil.i18nStringNow("emxComponents.Common.Organization", sLanguage));
                }else{
                	//to check the radio button 'All' if scope is WS or All
                	selectedValues.add(ComponentsUtil.i18nStringNow("emxComponents.Common.All", sLanguage));
                }
               
                return  getRangeValuesMap(values, range, selectedValues);  
                
            } catch (Exception e) {
                throw new FrameworkException(e);
            }
                   
        }
        
        /**
         * Range Values for RouteTaskEdit field in Route Save As Template form
         * @param context
         * @param args
         * @return
         * @throws FrameworkException
         */
        
        public Map getSaveAsTemplateRouteTaskEditRange(Context context, String[] args) throws FrameworkException {

            try {
                Map programMap = (Map)JPO.unpackArgs(args);
                Map paramMap   = (Map)programMap.get("paramMap");
                String sLanguage = (String) paramMap.get("languageStr");
                
                StringList values = new StringList(4);
                StringList range = new StringList(4);
                
                values.add("Modify/Delete Task List");
                range.add(ComponentsUtil.i18nStringNow("emxComponents.TaskEditSetting.ModifyDeleteTaskList", sLanguage));
                
                values.add("Extend Task List");
                range.add(ComponentsUtil.i18nStringNow("emxComponents.TaskEditSetting.ExtendTaskList", sLanguage));
                
                values.add("Modify Task List");
                range.add(ComponentsUtil.i18nStringNow("emxComponents.TaskEditSetting.ModifyTaskList", sLanguage));
                
                values.add("Maintain Exact Task List");
                range.add(ComponentsUtil.i18nStringNow("emxComponents.TaskEditSetting.MaintainExactTaskList", sLanguage));
                
                return  getRangeValuesMap(values, range, new StringList());                 
            } catch (Exception e) {
                throw new FrameworkException(e);
            }
                   
        }
        
        /**
         * Range Values for RouteTaskEdit field in Route Save As Template form
         * @param context
         * @param args
         * @return
         * @throws FrameworkException
         */
        
        public Map getSaveAsTemplateSaveOptionsRange(Context context, String[] args) throws FrameworkException {

            try {
                Map programMap = (Map)JPO.unpackArgs(args);
                Map requestMap = (Map)programMap.get("requestMap");
                Map paramMap   = (Map)programMap.get("paramMap");
                String sLanguage = (String) paramMap.get("languageStr");
                
                Route route = new Route((String)requestMap.get("objectId"));
                RouteTemplate routeTemp = route.getRouteTemplate(context);
                    
                StringList values = new StringList(2);
                StringList range = new StringList(2);
                
                values.add("NewTemplate");
                range.add(ComponentsUtil.i18nStringNow("emxComponents.SaveTemplateDialog.SavenewTemp", sLanguage));
                
                if(routeTemp != null &&  "TRUE".equalsIgnoreCase(routeTemp.getInfo(context, "current.access[revise]"))) {
                    values.add("Revise");
                    range.add(ComponentsUtil.i18nStringNow("emxComponents.SaveTemplateDialog.ReviseTemp", sLanguage));
                }
                
                return  getRangeValuesMap(values, range, new StringList());                 
            } catch (Exception e) {
                throw new FrameworkException(e);
            }
        }
        
        /**
         * Range Values for Save As Template, Template Data selection
         * @param context
         * @param args
         * @return
         * @throws FrameworkException
         */
        public Map getSaveAsTemplateTemplateDataRange(Context context, String[] args) throws FrameworkException {

            try {
                Map programMap = (Map)JPO.unpackArgs(args);
                Map paramMap   = (Map)programMap.get("paramMap");
                String sLanguage = (String) paramMap.get("languageStr");
                
                return  getRangeValuesMap(new StringList("SaveTaskAssignees"), 
                        new StringList(ComponentsUtil.i18nStringNow("emxComponents.RouteTemplateSaveDialog.TaskAssignees", sLanguage)),new StringList());                 
            } catch (Exception e) {
                throw new FrameworkException(e);
            }
        } 
        
        /**
         * Create JPO for Save Route as Template.
         * @param context
         * @param args
         * @return
         * @throws FrameworkException
         */
		 @com.matrixone.apps.framework.ui.CreateProcessCallable
		 public Map saveRouteAsTemplate(Context context, String[] args) throws FrameworkException {
            try {
                ContextUtil.startTransaction(context, true);
                
                Map programMap = (Map)JPO.unpackArgs(args);
                Map requestValuesMap = (Map) programMap.get("RequestValuesMap");
                
                Map returnMap = new HashMap();
                
                String routeId              = ((String[])requestValuesMap.get("objectId"))[0];
                String strTemplateName      = ((String)programMap.get("Name"));
                String strTemplateDesc      = ((String[])requestValuesMap.get("Description"))[0];
                String strAvailability      = ((String[])requestValuesMap.get("Availability"))[0];
                String workspaceId          = ((String[])requestValuesMap.get("WorkspaceAvailableOID"))[0];
                String strScope             = ((String[])requestValuesMap.get("Scope"))[0];
                String strRouteTaskEdit     = ((String[])requestValuesMap.get("RouteTaskEdits"))[0];
                String strOption            = ((String[])requestValuesMap.get("SaveOptions"))[0];
                String ChooseUsersFromUserGroup            = ((String[])requestValuesMap.get("ChooseUsersFromUserGroup"))[0];
                String[] tempdateDataArr       = (String[])requestValuesMap.get("TemplateData");
				String[] requireEsign       = (String[])requestValuesMap.get("ApprovalWithSignature");
				String strRequireEsign=requireEsign== null ?"False":requireEsign[0];
                List tempdateDataList = new ArrayList(tempdateDataArr == null ? 0 : tempdateDataArr.length);

                if(tempdateDataArr != null) {
                    for (int i = 0; i < tempdateDataArr.length; i++) {
                        tempdateDataList.add(tempdateDataArr[i]);
                    }
                }
               
                String languageStr          = (String) programMap.get("languageStr");
                
                if("Workspace".equals(strAvailability) && UIUtil.isNullOrEmpty(workspaceId)) {
                    returnMap.put("ErrorMessage", ComponentsUtil.i18nStringNow("emxComponents.SaveTemplateDialog.WorkspaceAlert", languageStr));
                    return returnMap;

                } 
                
                Route route = new Route(routeId);
                Person contextUser = Person.getPerson(context);
                Company company = contextUser.getCompany(context);
                
                RouteTemplate routeTempConnected = route.getRouteTemplate(context);
                
                String vault = context.getVault().getName();
                
                boolean isNewTemplate = "NewTemplate".equals(strOption);
                BusinessObject newOrRevisedRTObject = null;
                AttributeList routeAttrList = new AttributeList();
                if(isNewTemplate) {
                    newOrRevisedRTObject = new BusinessObject(TYPE_ROUTE_TEMPLATE, strTemplateName, "1", vault);
                    if(newOrRevisedRTObject.exists(context)) {
                        returnMap.put("ErrorMessage", ComponentsUtil.i18nStringNow("emxComponents.RouteTemplateDialog.AlreadyExists", languageStr));
                        return returnMap;
                    }
                    newOrRevisedRTObject.create(context, POLICY_ROUTE_TEMPLATE);
                } else {
                    BusinessObject lastRev = routeTempConnected.getLastRevision(context);
                    lastRev.open(context);
                    newOrRevisedRTObject = lastRev.revise(context, lastRev.getNextSequence(context), vault);
                    lastRev.close(context);
                }
                
                // updating the attributes of Route Template object
                newOrRevisedRTObject.open(context);
               if(!isNewTemplate){
				   DomainAccess.clearMultipleOwnership(context, newOrRevisedRTObject.getObjectId(context));
			   }
               
                
                Map mapRouteInfo = route.getAttributeMap(context);
                
                String ATTRIBUTE_AUTO_STOP_ON_REJECTION = PropertyUtil.getSchemaProperty(context, "attribute_AutoStopOnRejection");
                String ATTRIBUTE_PRESERVE_TASK_OWNER = PropertyUtil.getSchemaProperty(context, "attribute_PreserveTaskOwner");
                String ATTRIBUTE_ChooseUsersFromUserGroup = PropertyUtil.getSchemaProperty(context, "attribute_ChooseUsersFromUserGroup");
			    String ATTRIBUTE_RouteOwnerTask = PropertyUtil.getSchemaProperty("attribute_RouteOwnerTask");
				String ATTRIBUTE_RouteOwnerUGChoice= PropertyUtil.getSchemaProperty("attribute_RouteOwnerUGChoice");
                String strAutoStopOnRejection = (String)mapRouteInfo.get(ATTRIBUTE_AUTO_STOP_ON_REJECTION);
                String strRouteBasePurpose = (String)mapRouteInfo.get(ATTRIBUTE_ROUTE_BASE_PURPOSE);
                String strRoutePreserveTaskOwner =  (String)mapRouteInfo.get(ATTRIBUTE_PRESERVE_TASK_OWNER);
                String ATTRIBUTE_UserGroupAction = PropertyUtil.getSchemaProperty(context, "attribute_UserGroupAction");
                String ATTRIBUTE_UserGroupLevelInfo = PropertyUtil.getSchemaProperty(context, "attribute_UserGroupLevelInfo");
				String ATTRIBUTE_ROUTE_REQUIRES_ESIGN = PropertyUtil.getSchemaProperty(context, "attribute_RequiresESign");
				String ATTRIBUTE_ROUTE_TITLE = PropertyUtil.getSchemaProperty(context, "attribute_Title");
                // Set value of Auto Stop On Rejection attribute from Route object to Route Template object
                if (!UIUtil.isNullOrEmpty(strAutoStopOnRejection)) {
                    routeAttrList.addElement(new Attribute(new AttributeType(ATTRIBUTE_AUTO_STOP_ON_REJECTION), strAutoStopOnRejection));
                }
                if(isNewTemplate){
                	routeAttrList.addElement(new Attribute(new AttributeType(ATTRIBUTE_ChooseUsersFromUserGroup), ChooseUsersFromUserGroup));
                }
                // Bug 345546 Save Route Base Purpose value
                if (!UIUtil.isNullOrEmpty(strRouteBasePurpose)) {
                    routeAttrList.addElement(new Attribute(new AttributeType(ATTRIBUTE_ROUTE_BASE_PURPOSE), strRouteBasePurpose));
                }
                
                if (UIUtil.isNotNullAndNotEmpty(strRoutePreserveTaskOwner)) {
                    routeAttrList.addElement(new Attribute(new AttributeType(ATTRIBUTE_PRESERVE_TASK_OWNER), strRoutePreserveTaskOwner));
                }
                routeAttrList.addElement(new Attribute(new AttributeType(ATTRIBUTE_ORIGINATOR),context.getUser()));
                //Added for Designate Route Template Tasks as non Editable
                routeAttrList.addElement(new Attribute(new AttributeType(DomainObject.ATTRIBUTE_TASKEDIT_SETTING), strRouteTaskEdit));
                routeAttrList.addElement(new Attribute(new AttributeType(DomainObject.ATTRIBUTE_RESTRICT_MEMBERS), strScope));
				if(isNewTemplate ||  requireEsign != null) {
					routeAttrList.addElement(new Attribute(new AttributeType(ATTRIBUTE_ROUTE_REQUIRES_ESIGN), strRequireEsign));
				}
				//IR-1015454
				if (UIUtil.isNotNullAndNotEmpty(strTemplateName)) {
                    routeAttrList.addElement(new Attribute(new AttributeType(ATTRIBUTE_ROUTE_TITLE), strTemplateName ));
                }
                newOrRevisedRTObject.setDescription(context, strTemplateDesc);
                newOrRevisedRTObject.setAttributes(context,routeAttrList);
                newOrRevisedRTObject.update(context);
                
                
                
                
                // connecting the routetemplate object to the person/company
                DomainObject connectingObj = "User".equals(strAvailability) ? contextUser :
                    "Enterprise".equals(strAvailability) ? company : DomainObject.newInstance(context, workspaceId);
                
                connectingObj.connect(context, new RelationshipType(RELATIONSHIP_ROUTE_TEMPLATES), true, newOrRevisedRTObject);
                if("Enterprise".equals(strAvailability)){
                	connectingObj.connect(context, new RelationshipType(RELATIONSHIP_OWNING_ORGANIZATION),true, newOrRevisedRTObject);
                }
                /*ContextUtil.pushContext(context);
                //Connect new or revised Route Temp to Route 
                if(routeTempConnected != null) {
                    // This pushContext is used to disconnect the Existing RouteTemplate of 
                    //Enterprise scope, for Which the user is not a owner.  
                    routeTempConnected.disconnect(context, new RelationshipType(RELATIONSHIP_INITIATING_ROUTE_TEMPLATE), false, route);
                }
                newOrRevisedRTObject.connect(context,new RelationshipType(RELATIONSHIP_INITIATING_ROUTE_TEMPLATE), false, route);
                ContextUtil.popContext(context);*/
                
                boolean saveTaskAssignees = tempdateDataList.contains("SaveTaskAssignees");
                String sAttParallelNodeProcessionRule  = PropertyUtil.getSchemaProperty(context,"attribute_ParallelNodeProcessionRule");
                String  sAttReviewTask               =  PropertyUtil.getSchemaProperty(context,"attribute_ReviewTask");
                
                // build Relationship and Type patterns
                String proxyGoupType = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
                Pattern relPersonPattern     = new Pattern(RELATIONSHIP_ROUTE_NODE);
                Pattern typePersonPattern    = new Pattern(TYPE_PERSON);
                typePersonPattern.addPattern(TYPE_ROUTE_TASK_USER);
                typePersonPattern.addPattern(proxyGoupType);
                
                SelectList objSel = new SelectList();
                objSel.addId();
                objSel.addType();
                objSel.addName();
                
                // build select params for Relationship
                SelectList selectPersonRelStmts = new SelectList();
                selectPersonRelStmts.add(Route.SELECT_ROUTE_SEQUENCE);
                selectPersonRelStmts.add(Route.SELECT_ROUTE_ACTION);
                selectPersonRelStmts.add(Route.SELECT_ROUTE_INSTRUCTIONS);
                selectPersonRelStmts.add(Route.SELECT_SCHEDULED_COMPLETION_DATE);
                selectPersonRelStmts.add(Route.SELECT_TITLE);
                selectPersonRelStmts.add(Route.SELECT_ROUTE_TASK_USER);
                selectPersonRelStmts.add(Route.SELECT_ALLOW_DELEGATION);
                selectPersonRelStmts.addAttribute(ATTRIBUTE_ASSIGNEE_SET_DUEDATE);
                selectPersonRelStmts.addAttribute(ATTRIBUTE_DUEDATE_OFFSET);
                selectPersonRelStmts.addAttribute(ATTRIBUTE_DATE_OFFSET_FROM);
                selectPersonRelStmts.addAttribute(sAttParallelNodeProcessionRule); 
                selectPersonRelStmts.addAttribute(sAttReviewTask);
                selectPersonRelStmts.addAttribute(DomainRelationship.SELECT_TO_ID);
                selectPersonRelStmts.addAttribute(ATTRIBUTE_ChooseUsersFromUserGroup);
                selectPersonRelStmts.addAttribute(ATTRIBUTE_UserGroupAction);
                selectPersonRelStmts.addAttribute(ATTRIBUTE_UserGroupLevelInfo);
				selectPersonRelStmts.addAttribute(ATTRIBUTE_RouteOwnerTask);
				selectPersonRelStmts.addAttribute(ATTRIBUTE_RouteOwnerUGChoice);
                
                MapList routeNodeList = route.getRelatedObjects(context, relPersonPattern.getPattern(),typePersonPattern.getPattern(),
                        objSel, selectPersonRelStmts,
                        false, true,
                        (short)1,
                        EMPTY_STRING, EMPTY_STRING,
                        0);
                AccessUtil accessUtil = new AccessUtil();
                
                DomainObject routeNodeToConnect = null;
                if(!saveTaskAssignees) {
                    routeNodeToConnect = new DomainObject();
                    routeNodeToConnect.createObject(context, TYPE_ROUTE_TASK_USER, null, null, POLICY_ROUTE_TASK_USER, vault);
                }
                
                for (int i = 0; i < routeNodeList.size(); i++) {
                    Map routeNodeInfo = (Map) routeNodeList.get(i);
                    
                    if(saveTaskAssignees) {
                        routeNodeToConnect = new DomainObject((String) routeNodeInfo.get(SELECT_ID));
                        String rtu = PropertyUtil.getSchemaProperty(context, (String) routeNodeInfo.get(Route.SELECT_ROUTE_TASK_USER));
                        if(!UIUtil.isNullOrEmpty(rtu)) {
                            accessUtil.setAccess(rtu, AccessUtil.ROUTE_ACCESS_GRANTOR, accessUtil.getReadAccess());

                        }
                    }
                    
                    DomainRelationship newRouteNodeRel = DomainRelationship.connect(context, new DomainObject(newOrRevisedRTObject), RELATIONSHIP_ROUTE_NODE, routeNodeToConnect);
                    Map newRouteNodeRelAttributes = new HashMap(15);
                    newRouteNodeRelAttributes.put(ATTRIBUTE_ROUTE_SEQUENCE, routeNodeInfo.get(Route.SELECT_ROUTE_SEQUENCE));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_TITLE, routeNodeInfo.get(Route.SELECT_TITLE));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_ROUTE_ACTION, routeNodeInfo.get(Route.SELECT_ROUTE_ACTION));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_ROUTE_INSTRUCTIONS, routeNodeInfo.get(Route.SELECT_ROUTE_INSTRUCTIONS));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_SCHEDULED_COMPLETION_DATE, routeNodeInfo.get(Route.SELECT_SCHEDULED_COMPLETION_DATE));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_ASSIGNEE_SET_DUEDATE, routeNodeInfo.get(getAttributeSelect(ATTRIBUTE_ASSIGNEE_SET_DUEDATE)));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_DUEDATE_OFFSET, routeNodeInfo.get(getAttributeSelect(ATTRIBUTE_DUEDATE_OFFSET)));                   
                    newRouteNodeRelAttributes.put(ATTRIBUTE_DATE_OFFSET_FROM, routeNodeInfo.get(getAttributeSelect(ATTRIBUTE_DATE_OFFSET_FROM)));                   
                    newRouteNodeRelAttributes.put(sAttParallelNodeProcessionRule, routeNodeInfo.get(getAttributeSelect(sAttParallelNodeProcessionRule)));
                    newRouteNodeRelAttributes.put(sAttReviewTask, routeNodeInfo.get(getAttributeSelect(sAttReviewTask)));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_ALLOW_DELEGATION, routeNodeInfo.get(Route.SELECT_ALLOW_DELEGATION));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_UserGroupAction, routeNodeInfo.get(getAttributeSelect(ATTRIBUTE_UserGroupAction)));
                    newRouteNodeRelAttributes.put(ATTRIBUTE_UserGroupLevelInfo, routeNodeInfo.get(getAttributeSelect(ATTRIBUTE_UserGroupLevelInfo)));
					newRouteNodeRelAttributes.put(ATTRIBUTE_RouteOwnerTask, routeNodeInfo.get(getAttributeSelect(ATTRIBUTE_RouteOwnerTask)));
					newRouteNodeRelAttributes.put(ATTRIBUTE_RouteOwnerUGChoice, routeNodeInfo.get(getAttributeSelect(ATTRIBUTE_RouteOwnerUGChoice)));
                    if(saveTaskAssignees){
                        newRouteNodeRelAttributes.put(ATTRIBUTE_ROUTE_TASK_USER, routeNodeInfo.get(Route.SELECT_ROUTE_TASK_USER));
                    }
                    if("true".equalsIgnoreCase(ChooseUsersFromUserGroup)){
                    	 newRouteNodeRelAttributes.put(ATTRIBUTE_ChooseUsersFromUserGroup, routeNodeInfo.get(getAttributeSelect(ATTRIBUTE_ChooseUsersFromUserGroup)));
                    }else {
                    	 newRouteNodeRelAttributes.put(ATTRIBUTE_ChooseUsersFromUserGroup, "False");
                    }
                    newRouteNodeRel.setAttributeValues(context, newRouteNodeRelAttributes);
                }
                //newOrRevisedRTObject.promote(context);
                if(accessUtil.getAccessList().size() > 0)  {
                    String[] jpoArgs = new String[]{newOrRevisedRTObject.getObjectId(context)};
                    JPO.invoke(context, "emxWorkspaceConstants", jpoArgs, "grantAccess", JPO.packArgs(accessUtil.getAccessList()));
                }
                newOrRevisedRTObject.close(context);
                ContextUtil.commitTransaction(context);
                
                returnMap.put(SELECT_ID, newOrRevisedRTObject.getObjectId(context));
				if(tempdateDataArr != null){
					Route.updateMembersAccess(context, routeId, newOrRevisedRTObject.getObjectId(context));
			    }
                return returnMap;
            } catch (Exception e) {
                ContextUtil.abortTransaction(context);
                throw new FrameworkException(e);
            } finally {
                
            }
        }
        
        
		  @com.matrixone.apps.framework.ui.PostProcessCallable
		   public void promoteRouteTemplate(Context context, String[] args) throws Exception
		   {
			  Map map = (Map) JPO.unpackArgs(args);
		      Map mapParamMap = (Map) map.get("paramMap");
		      Map mapRequestMap = (Map) map.get("requestMap");
		      String strObjectId = (String) mapRequestMap.get("objectId");
		      String routeTemplateId = (String) mapParamMap.get("newObjectId");
		      BusinessObject newOrRevisedRTObject = new BusinessObject(routeTemplateId);
		      newOrRevisedRTObject.promote(context);
		  }
        
        /**
         * getRouteTemplateName - method to return the Route template name if already connected to Route
         * @param context the eMatrix <code>Context</code> object
         * @return String
         * @throws Exception if the operation fails
         * @since R214
         * @grade 0
         */ 
        public String getRouteTemplateName(Context context, String[] args) throws Exception
        {
               Map programMap = (Map)JPO.unpackArgs(args);
               Map requestMap = (Map)programMap.get("requestMap");
               String sLanguage = (String) programMap.get("languageStr");
               String objectId;
               String sRouteTemplateName = EMPTY_STRING;
               if(requestMap == null) {
            	   objectId = ((String)programMap.get("parentOID"));
               }  
               else{
            	   objectId = ((String)requestMap.get("objectId"));
               }
                
               DomainObject dob = new DomainObject(objectId);
               String strTempId = dob.getInfo(context,"from[Initiating Route Template].to.id");
               if(UIUtil.isNotNullAndNotEmpty(strTempId)) {
                       DomainObject boTemplate=DomainObject.newInstance(context,strTempId);
                       SelectList selectStmts = new SelectList();
                       selectStmts.add("name");
                       selectStmts.add("current.access[revise]");
                       boTemplate.open(context);
                       Map routeTemplateMap=boTemplate.getInfo(context, selectStmts);
                       boTemplate.close(context);
                       if("true".equalsIgnoreCase((String)routeTemplateMap.get("current.access[revise]"))){
                       		sRouteTemplateName = (String)routeTemplateMap.get("name");
                       }
                }
            return sRouteTemplateName;
        }
        

        
      public boolean isReviseRouteTemplate(Context context, String[] args) throws Exception{
        	 return (!UIUtil.isNullOrEmpty(getRouteTemplateName(context, args))) ? true : false;
      }
        
        
        
      public boolean isNotReviseRouteTemplate(Context context, String[] args) throws Exception{
              return(!isReviseRouteTemplate(context,args));
      }
 public boolean isESignFieldRequire(Context context, String[] args) throws Exception
    {
       boolean isEsignRequire=true;
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
		    String routeID = (String) programMap.get("objectId");
			String esignConfigSetting = "None";
			try{
					esignConfigSetting = MqlUtil.mqlCommand(context, "list expression $1 select $2 dump","ENXESignRequiresESign", "value");
					if(UIUtil.isNullOrEmpty(esignConfigSetting))
						esignConfigSetting="None";
			}
			catch (Exception e){
					esignConfigSetting="None";
			}
			String routeBasePurpose="";
			DomainObject dmoRoute;
			 if(routeID!=null)
			 {
				try {
			 dmoRoute = new DomainObject(routeID);
      		 String SELECT_ATTRIBUTE_ROUTE_BASE_PURPOSE = "attribute[" + ATTRIBUTE_ROUTE_BASE_PURPOSE + "]";
			 routeBasePurpose = dmoRoute.getInfo(context, SELECT_ATTRIBUTE_ROUTE_BASE_PURPOSE);
			  if(routeBasePurpose != null&&("Review".equalsIgnoreCase(routeBasePurpose)||"None".equalsIgnoreCase(esignConfigSetting)))
				  isEsignRequire=false;
			 } catch (Exception e) {
					e.printStackTrace();
				}
			 }
       
        } catch (Exception exc) {
            throw exc;
        }
        return isEsignRequire;
    } 
  public Object getApprovalWithEsignField(Context context, String[] args) throws Exception
    {
        StringBuffer sbReturnValue = new StringBuffer();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
			HashMap requestMap = (HashMap) programMap.get("requestMap");
            HashMap fieldMap = (HashMap) programMap.get("fieldMap");
			String routeID = (String) requestMap.get("objectId");
			String routeBasePurpose="";
			String esignConfigSetting ="None";
			try{
					esignConfigSetting = MqlUtil.mqlCommand(context, "list expression $1 select $2 dump","ENXESignRequiresESign", "value");
					if(UIUtil.isNullOrEmpty(esignConfigSetting))
							esignConfigSetting="None";
			}
			catch (Exception e){
					esignConfigSetting="None";
			}
			DomainObject dmoRoute;
			 if(routeID!=null)
			 {
				try {
			 dmoRoute = new DomainObject(routeID);
      		 String SELECT_ATTRIBUTE_ROUTE_BASE_PURPOSE = "attribute[" + ATTRIBUTE_ROUTE_BASE_PURPOSE + "]";
			 routeBasePurpose = dmoRoute.getInfo(context, SELECT_ATTRIBUTE_ROUTE_BASE_PURPOSE);
			 } catch (Exception e) {
					e.printStackTrace();
				}
			 }
		String noLabel=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale(),"emxComponents.Common.No");
		String yesLabel=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", context.getLocale(),"emxComponents.Common.Yes");
			  if(routeBasePurpose != null&&("Approval".equalsIgnoreCase(routeBasePurpose)||"Standard".equalsIgnoreCase(routeBasePurpose)))
			  {

					  if("RouteSpecific".equalsIgnoreCase(esignConfigSetting)){
						  
					 RouteTemplate routeTemplateobject = new Route(routeID).getRouteTemplate(context);
					 
					 String checkedNo="checked='true'";
					 String checkedYes="";
                     if(routeTemplateobject != null){
						  String attributeRequiresESign = PropertyUtil.getSchemaProperty(context, "attribute_RequiresESign");
						  String rtRequiresESign  = routeTemplateobject.getInfo(context, "attribute["+attributeRequiresESign+"]");
						  if("true".equalsIgnoreCase(rtRequiresESign)){
							  checkedYes="checked='true'";
							  checkedNo="";
						  }
					 }
					  sbReturnValue.append("<table><tr><td>");
					  sbReturnValue.append("<input type='radio' name='"+fieldMap.get("name")+"' value='False' "+checkedNo+"  />");
					   sbReturnValue.append("</td><td>");
					  sbReturnValue.append(noLabel);
					  sbReturnValue.append("</td></tr><tr><td>");
					  sbReturnValue.append("<input type='radio' name='"+fieldMap.get("name")+"' value='True' "+ checkedYes+" />");
					  sbReturnValue.append("</td><td>");
					  sbReturnValue.append(yesLabel);
					  sbReturnValue.append("</td></tr></table>");
				
				  }
					if("All".equalsIgnoreCase(esignConfigSetting)){
					  sbReturnValue.append("<table><tr><td>");
					  sbReturnValue.append("<input type='radio' name='"+fieldMap.get("name")+"' value='False' disabled=\"true\"  />");
					  sbReturnValue.append("</td><td>");
					  sbReturnValue.append(noLabel);
					  sbReturnValue.append("</td></tr><tr><td>");
					  sbReturnValue.append("<input type='radio' name='"+fieldMap.get("name")+"' value='True' checked=\"true\" />");
					  sbReturnValue.append("</td><td>");
					  sbReturnValue.append(yesLabel);
					  sbReturnValue.append("</td></tr></table>");
				  }
				 
			  }
          
        } catch (Exception exc) {
            throw exc;
        }
        return sbReturnValue.toString();
    }

      /*setRouteTemplateName - method to update the Route template name if already connected to Route
       * @param context the eMatrix <code>Context</code> object
       * @return String
       * @throws Exception if the operation fails
       * @since R214
       * @grade 0
       */  
      public Object setRouteTemplateName(Context context, String[] args)
        throws Exception
        {
        	
        	HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap paramMap = (HashMap) programMap.get("paramMap");
            String objectId = (String) paramMap.get("objectId");
            String newRTId = (String) paramMap.get("New OID");
            String NewRTName = (String) paramMap.get("New Value");
           
            if(newRTId == null || "null".equals(newRTId))
            {
            	newRTId = "";
            }

            if (!newRTId.equals("")) {           
            DomainObject dob = DomainObject.newInstance(context, objectId);
            dob.setName(context, NewRTName);
            }
            return Boolean.valueOf(true);
        }
     
      /*getTemplateDescription - method to return the Route template description if already connected to Route
      * @param context the eMatrix <code>Context</code> object
      * @return String
      * @throws Exception if the operation fails
      * @since R214
      * @grade 0
      */  
      public String getRouteTemplateDescription(Context context, String[] args) throws Exception
      {
             Map programMap = (Map)JPO.unpackArgs(args);
             Map requestMap = (Map)programMap.get("requestMap");
             String objectId = ((String)requestMap.get("objectId"));
          	 
             DomainObject dob = new DomainObject(objectId);
             String sRouteTemplateDesc = "";
             String strTempId = dob.getInfo(context,"from[Initiating Route Template].to.id");
             if(!UIUtil.isNullOrEmpty(strTempId)) {
                     DomainObject boTemplate=DomainObject.newInstance(context,strTempId);
                     boTemplate.open(context);
                     String strRouteTempDesc=boTemplate.getInfo(context,boTemplate.SELECT_DESCRIPTION);
					 boTemplate.close(context);
                     sRouteTemplateDesc = strRouteTempDesc;
                }
             return sRouteTemplateDesc;
      }
     
      /*setRouteTemplateName - method to update the Route template Description if already connected to Route
       * @param context the eMatrix <code>Context</code> object
       * @return String
       * @throws Exception if the operation fails
       * @since R214
       * @grade 0
       */  
      public Object setRouteTemplateDescrition(Context context, String[] args)
      throws Exception
      {
      	
      	HashMap programMap = (HashMap) JPO.unpackArgs(args);
          HashMap paramMap = (HashMap) programMap.get("paramMap");
          String objectId = (String) paramMap.get("objectId");
          String newRTId = (String) paramMap.get("New OID");
          String NewRTName = (String) paramMap.get("New Value");
         
          if(newRTId == null || "null".equals(newRTId))
          {
          	newRTId = "";
          }

          if (!newRTId.equals("")) {           
          DomainObject dob = DomainObject.newInstance(context, objectId);
          dob.setDescription(context, NewRTName);
          }
          return Boolean.valueOf(true);
      }

        /**
         * Post Process JPO for Route Node Task edit.
         * @param context
         * @param args
         * @return
         * @throws FrameworkException
         */
        
        public HashMap updateRouteNodeTaskForRouteTemplate(Context context, String[] args) throws FrameworkException {
            try {
                Map programMap = (Map)JPO.unpackArgs(args);
                Map paramMap   = (Map)programMap.get("paramMap");
                
                String objectId = (String) paramMap.get("objectId");
                String relId = (String) paramMap.get("relId");
                
                HashMap requestMap = (HashMap)programMap.get("requestMap");
                String newTaskAssignee    = (String)requestMap.get("Assignee");
                StringList newTaskAssigneeInfo = FrameworkUtil.split(newTaskAssignee, "#");
                
                String newAssigneeType = (String) newTaskAssigneeInfo.get(0);
                String newAssigneeID = (String) newTaskAssigneeInfo.get(1);
                String newAssigneeValue = (String) newTaskAssigneeInfo.get(2);
                boolean connectToRTU = !"person".equals(newAssigneeType);
                
                HashMap resultsMap = new HashMap();
                HashMap newValues = new HashMap(3);
                
				if("ROUTE_OWNER".equals(newAssigneeType)){ //Ask owner selected, don't update the value
					return resultsMap;
				}
                
                newValues.put(ATTRIBUTE_ROUTE_TASK_USER, connectToRTU ? newAssigneeValue : EMPTY_STRING);
                newValues.put(ATTRIBUTE_ROUTE_ACTION, (String) requestMap.get("Action"));
                newValues.put(ATTRIBUTE_ALLOW_DELEGATION, (String) requestMap.get("AllowDelegation"));
                newValues.put(ATTRIBUTE_ROUTE_INSTRUCTIONS, (String) requestMap.get("Instructions"));
                
				String sAttrRouteOwnerTask = PropertyUtil.getSchemaProperty(context,"attribute_RouteOwnerTask");
				String sAttrRouteOwnerUGchoice = PropertyUtil.getSchemaProperty(context,"attribute_RouteOwnerUGChoice");
                
                RouteTemplate routeTemplate = (RouteTemplate)DomainObject.newInstance(context, objectId, TYPE_ROUTE_TEMPLATE);
                if(routeTemplate.getInfo(context, SELECT_CURRENT).equals(STATE_ROUTE_TEMPLATE_ACTIVE)) {
                    newValues.put("Assignee", newAssigneeID);
                    routeTemplate.revise(context, relId, newValues);
                } else {
                    DomainRelationship domRel = DomainRelationship.newInstance(context, relId);
                    
                    StringList selectables = new StringList(5);
                    selectables.add(DomainRelationship.SELECT_TO_ID);
                    selectables.add(Route.SELECT_ROUTE_TASK_USER);
					selectables.add("attribute["+sAttrRouteOwnerTask+"]");
                    Map relValues = (Map) DomainRelationship.getInfo(context, new String[]{relId}, selectables).get(0);
                    
					String sAttrRouteOwnerTaskValue = (String) relValues.get("attribute["+sAttrRouteOwnerTask+"]");
					if("TRUE".equals(sAttrRouteOwnerTaskValue)){
						//Clear out the task assignment values
						newValues.put(sAttrRouteOwnerTask, "FALSE");
						newValues.put(sAttrRouteOwnerUGchoice, "");
					}
					
                    DomainObject dmoAssignee = new DomainObject ((String) relValues.get(DomainRelationship.SELECT_TO_ID));
                    selectables.clear();
                    selectables.add(SELECT_TYPE);
                    selectables.add(SELECT_NAME);
                    selectables.add(SELECT_ID);
                    
                    Map mapAssigneeInfo = dmoAssignee.getInfo (context, selectables);
                    String routeNodeType = (String) mapAssigneeInfo.get(SELECT_TYPE);
                    
                    boolean isConnectedToRTU = routeNodeType.equals(TYPE_ROUTE_TASK_USER);
                    String currentAssignee = (String) (isConnectedToRTU ? relValues.get(Route.SELECT_ROUTE_TASK_USER) : mapAssigneeInfo.get(SELECT_ID));
                    
                    if(!currentAssignee.equals(newAssigneeValue)) {
                        DomainRelationship.setToObject(context, relId, new DomainObject(newAssigneeID));
                    }                   
                    
                    domRel.setAttributeValues(context, newValues);
                }           
                return resultsMap;
            } catch (Exception e) {
                throw new FrameworkException(e);
            }
        }        
        
        /**
    	 * This method fetch the selected Scope of the Route Template.
    	 * method returns the scope of the template if the route already has a template else scope of the route.
    	 * return 'All' if the scope is a Workspace
    	 * @param objectId - Object ID of the Route 
    	 * @throws Exception 
    	 */
    	private String getScopeForRouteTemplate(Context context, String objectId) throws Exception{
    		String routeTemplateScope = EMPTY_STRING;
    		
    		if(UIUtil.isNotNullAndNotEmpty(objectId)){
    			try {
    	               DomainObject doRoute = new DomainObject(objectId);
    	               String strTempId = doRoute.getInfo(context,"from[Initiating Route Template].to.id");
    	               if(UIUtil.isNotNullAndNotEmpty(strTempId)) {
    	                       DomainObject doTemplate=DomainObject.newInstance(context,strTempId);
    	                       routeTemplateScope = doTemplate.getInfo(context, ROUTE_SCOPE);
    	                }
    				if(UIUtil.isNotNullAndNotEmpty(routeTemplateScope)){
        				return routeTemplateScope;
    				}
    				else{
        				return doRoute.getInfo(context, ROUTE_SCOPE);
    				}

    			} catch (Exception e) {
    				
    				e.printStackTrace();
    			}

    		}
    		return EMPTY_STRING;
    	}
    	/**
    	 * This method is to check demote operation whether any Routes are connected to the Route Template.
    	 * Returns 0 when no routes are connected and returns 1 when routes are connected.
    	 * This method will be called only in Active state of route template
    	 * @param objectId - Object ID of the Route Template
    	 * @throws Exception 
    	 */
		public int triggerCheckDemoteOnActiveState(Context context,String[] args)throws Exception
		{
			if(args!=null && args.length>1){
				String strRouteTemplateId=args[0];

			  RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);
			  
			  Pattern relPattern        = new Pattern(DomainObject.RELATIONSHIP_INITIATING_ROUTE_TEMPLATE);
			  Pattern typePattern       = new Pattern(DomainObject.TYPE_ROUTE);
			  
			  StringList selectStmts = new StringList();
			  selectStmts.addElement(boRouteTemplate.SELECT_TYPE);
			
			  boRouteTemplate.setId(strRouteTemplateId);
			  //boRouteTemplate.open(context);		
			   
			  MapList routeConnectedToTemplateList=boRouteTemplate.getRelatedObjects(context, relPattern.getPattern(),typePattern.getPattern(), selectStmts, null, 
					  true, true, (short) 1, "", "", 0); 
			  String strType="";
			  Iterator relItr=routeConnectedToTemplateList.iterator();
			  Map map=null;
				while(relItr.hasNext()) {
					map=(Map)relItr.next();
					strType = (String)map.get(DomainObject.SELECT_TYPE);
					if(UIUtil.isNotNullAndNotEmpty(strType) && strType.equals(DomainObject.TYPE_ROUTE)){
						String strMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.RouteTemplate.DemoteMsg");
						emxContextUtil_mxJPO.mqlNotice(context,strMessage);				
						return 1;
					}
			  }
				String relLinkRT= PropertyUtil.getSchemaProperty(context,"relationship_LinkRouteTemplate" );
                String selectable_name = "to["+relLinkRT+"].from.name";
                String linkTemplateId = (String) boRouteTemplate.getInfo(context,selectable_name);
                if(UIUtil.isNotNullAndNotEmpty(linkTemplateId)) {
                	String strMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.RouteTemplate.DemoteMsg");
					emxContextUtil_mxJPO.mqlNotice(context,strMessage);				
					return 1;
                }
				return 0;
			} 
			   return 0;
		}
		
		/**
		    * Access Function for APPRouteSaveAsTemplateLink command.
		    *
		    * @param context the eMatrix <code>Context</code> object.
		    * @param args contains a packed HashMap with the following entries:
		    * objectId - Object Id of the Route object.
		    * @return boolean true or false values.
		    * @throws Exception if the operation fails.
		    * @since CommonComponents R421
		    * */
		public boolean showSaveAsRouteTemplateLink(Context context, String args[]) throws Exception {
			boolean returnValue =false;
			HashMap programMap         = (HashMap) JPO.unpackArgs(args);
			String routeId            = (String) programMap.get("objectId");
			String activeOrganization=PersonUtil.getActiveOrganization(context);
			String activeProject=PersonUtil.getActiveProject(context);
			DomainObject routeObject = new DomainObject(routeId);

			SelectList busSelList = new SelectList(2);
			busSelList.add(SELECT_ORGANIZATION);
			busSelList.add(SELECT_PROJECT);
			busSelList.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");

			Map returnMap = routeObject.getInfo(context, busSelList);

			Map<String,Boolean> routeTemplateCreationInfoMap = RouteTemplate.getRouteTemplateCreationInfo(context);
			String routeBasePurpose = (String) returnMap.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
			if(!routeTemplateCreationInfoMap.get(routeBasePurpose+"Template")){
				return false;
			}

			String routeOrganization = (String) returnMap.get(SELECT_ORGANIZATION);
			String routeProject = (String) returnMap.get(SELECT_PROJECT);
			//SELECT_ORGANIZATION SELECT_PROJECT
			if(routeOrganization.equalsIgnoreCase(activeOrganization) && routeProject.equalsIgnoreCase(activeProject)){
				returnValue= true;
			}
			return returnValue;
		}
		   
		   /**
     * The trigger will check the necessary conditions before promoting
     *
     * @param context The Matrix Context object
     * @param args The arguments, args[0]: Route object id
     * @return 0 for success 1 for failure
     * @throws Exception if operation fails
     */
    public int validateRouteTemplateActive (Context context, String[] args) throws Exception {
    	try {
			
    		if (context == null) {
    			throw new Exception("Invalid context");
            }
            if (args == null) {
                throw new Exception("Invalid arguments");
            }

            String strObjectId = args[0];
			String message = "";
            if (strObjectId == null || "".equals(strObjectId.trim()) || "null".equals(strObjectId.trim())) {
                String[] formatArgs = {strObjectId};
                message =  ComponentsUIUtil.getI18NString(context, "emxComponents.RouteBase.InvalidObjectId",formatArgs); 
                throw new Exception(message);
            }
			
			String strlanguage = context.getSession().getLanguage();
			BusinessObject boGeneric  = null;
			BusinessObject boPerson         = null;
			boolean bFlag                   = false;
			boolean bDateEmpty              = false;
			String sAsigneeId               = null;
			String sTaskName = "";
    		String sTaskInstructions = "";
			String sAttrRestrictMembers = PropertyUtil.getSchemaProperty(context, "attribute_RestrictMembers" );
      		String SELECT_RESTRICT_MEMBERS = DomainObject.getAttributeSelect(sAttrRestrictMembers);
			SelectList selectStmts = new SelectList();
			selectStmts.addElement(SELECT_RESTRICT_MEMBERS);
      		selectStmts.addElement(DomainConstants.SELECT_OWNER);
	  		RelationshipWithSelectItr relItr  = null;
            RouteTemplate routeTemplate = (RouteTemplate)DomainObject.newInstance(context, strObjectId, TYPE_ROUTE_TEMPLATE);
			Pattern relPattern  = new Pattern(DomainObject.RELATIONSHIP_ROUTE_NODE);
			Pattern typePattern = new Pattern(DomainObject.TYPE_PERSON);
			typePattern.addPattern(DomainObject.TYPE_ROUTE_TASK_USER);
			
			routeTemplate.open(context);
			boGeneric = com.matrixone.apps.common.util.ComponentsUtil.getConnectedObject(context,routeTemplate,relPattern.getPattern(),typePattern.getPattern(),false,true);
			ExpansionWithSelect routeTemplateTaskSelect = routeTemplate.expandSelect(context,relPattern.getPattern(),typePattern.getPattern(),
      		selectStmts, new StringList(),false, true, (short)1);
	  		relItr = new RelationshipWithSelectItr(routeTemplateTaskSelect.getRelationships());
	  
	  
	  		ArrayList arrayPersons = new ArrayList();

	  		while(relItr.next()) {

	  			boPerson   = relItr.obj().getTo();
	  			String routeTaskUser = FrameworkUtil.getRelAttribute(context, relItr.obj(), DomainObject.ATTRIBUTE_ROUTE_TASK_USER);
	  			boPerson.open(context);
	  			sAsigneeId = boPerson.getObjectId();
	  			boPerson.close(context);

	  			if (!(arrayPersons.contains(sAsigneeId))){
	  				arrayPersons.add(sAsigneeId);
	  			}
	  		}
	  		relItr.reset();

	  		ExpansionWithSelect routeTemplateSelect = null;
	  		Hashtable routeNodeAttributesTable          = new Hashtable();
	  		for (int num=0; num < arrayPersons.size();num++) {
	  			boPerson = new BusinessObject((String)arrayPersons.get(num));
	  			boPerson.open(context);

	  			if ( bFlag == true){
	  				break;
	  			}
		
	  			SelectList selectRouteTemplateRelStmts = new SelectList();
	  			selectRouteTemplateRelStmts.addAttribute(DomainObject.ATTRIBUTE_ROUTE_SEQUENCE);
	  			selectRouteTemplateRelStmts.addAttribute(DomainObject.ATTRIBUTE_SCHEDULED_COMPLETION_DATE);
	  			selectRouteTemplateRelStmts.addAttribute(DomainObject.ATTRIBUTE_ASSIGNEE_SET_DUEDATE);
	  			selectRouteTemplateRelStmts.addAttribute(DomainObject.ATTRIBUTE_TITLE);
	  			selectRouteTemplateRelStmts.addAttribute("Route Instructions");
	  			selectRouteTemplateRelStmts.addAttribute(DomainObject.ATTRIBUTE_DUEDATE_OFFSET);
	  			selectRouteTemplateRelStmts.add("from."+DomainObject.SELECT_ID);
	  			Pattern relRouteTemplatePattern     = new Pattern(DomainObject.RELATIONSHIP_ROUTE_NODE);
	  			Pattern typeRouteTemplatePattern    = new Pattern(TYPE_ROUTE_TEMPLATE);
	  			SelectList selectRouteTemplateStmts = new SelectList();
	  			String sSchCompletionDt = "";
	  			String sOrder = "";
	  			String sDueDateOffset = "";
	  			String sAssigneeSetDate = "";
	  			routeTemplateSelect = boPerson.expandSelect(context,relRouteTemplatePattern.getPattern(),typeRouteTemplatePattern.getPattern(),
                                           selectRouteTemplateStmts,selectRouteTemplateRelStmts,true, false, (short)1);      
	  			RelationshipWithSelectItr relRouteTemplateItr = new RelationshipWithSelectItr(routeTemplateSelect.getRelationships());
	  			while (relRouteTemplateItr != null && relRouteTemplateItr.next()) {
	  				routeNodeAttributesTable             =  relRouteTemplateItr.obj().getRelationshipData();
	  				String sSelectRouteTemplateId = "";
	  				sSelectRouteTemplateId = (String)routeNodeAttributesTable.get("from."+DomainObject.SELECT_ID);
	  				if(!sSelectRouteTemplateId.equals(strObjectId))
	  					continue;
	  				if ( bFlag == true){
	  					break;
	  				}
	  				sTaskName                = (String)routeNodeAttributesTable.get("attribute[" + DomainObject.ATTRIBUTE_TITLE + "]" );
	  				sTaskInstructions                = (String)routeNodeAttributesTable.get("attribute[Route Instructions]" );

	  				sSchCompletionDt = (String)routeNodeAttributesTable.get("attribute[" + DomainObject.ATTRIBUTE_SCHEDULED_COMPLETION_DATE + "]" );
	  				sOrder           = (String)routeNodeAttributesTable.get("attribute[" + DomainObject.ATTRIBUTE_ROUTE_SEQUENCE + "]" );
	  				sDueDateOffset   = (String)routeNodeAttributesTable.get("attribute[" + DomainObject.ATTRIBUTE_DUEDATE_OFFSET + "]" );
	  				sAssigneeSetDate = (String)routeNodeAttributesTable.get("attribute[" + DomainObject.ATTRIBUTE_ASSIGNEE_SET_DUEDATE + "]" );
	  			}
	  			if ((sSchCompletionDt.equals("")) && (sDueDateOffset.equals("")) && (sAssigneeSetDate.equals("No"))) {
	  				bDateEmpty = true;
	  			}

	  			if ("".equals(sOrder) || sOrder == null) {
	  				bFlag = true;
	  			}
	  		}
	  		routeTemplate.close(context);
      
	  		// throw alert if the Route Template doesn't have Route Node and Object route Relationship
	  		if ( boGeneric == null ) {
	  			message =   EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.RouteTemplateDetails.StartMessage");
	  			MqlUtil.mqlCommand(context, "notice $1", message);
	  			return 1;
	  			// throw alert if the Route Node Relationsip is not updated with attributes
    
	  		}else if ( boGeneric != null && bFlag == true ) {
	  			message =  EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.RouteTemplateDetails.TaskAttrMessage");
	  			MqlUtil.mqlCommand(context, "notice $1", message);
	  			return 1;
	  			// throw alert to intimate owner that few due-dates not filled yet.
	  		} else if (bDateEmpty) {
	  			message =  EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.RouteTemplateDetails.AssigneeDueDateAlert");
	  			MqlUtil.mqlCommand(context, "notice $1", message);
	  			return 1;
	  			// throw alert to intimate owner that the task name and instaructions are blank.
	  		} else if (UIUtil.isNullOrEmpty(sTaskName) || UIUtil.isNullOrEmpty(sTaskInstructions)){
	  			message = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.RouteTemplateDetails.TaskAttrMessage");
	  			MqlUtil.mqlCommand(context, "notice $1", message);
	  			return 1;
	  		}
	  		return 0;//Validation success
    	}
    	catch(Exception exception) {
    		emxContextUtil_mxJPO.mqlError(context, exception.getMessage());
    		return 1;//Validation failure
    	}
    }
    
    /**
     * Promote check Trigger for Route Template.
     * @param context
     * @param args
     * @return
     * @throws FrameworkException
     */
	 
    public int checkTaskTitleAndInstructions(Context context, String[] args) throws Exception{
		String objectId= args[0];
		try{
		    RouteTemplate rtObj = (RouteTemplate) newInstance(context,objectId);
		    String assignedRTRelAttr1			= "relationship[Route Node].attribute[Title]";
		    String assignedRTRelAttr2			= "relationship[Route Node].attribute[Route Instructions]";
	        DomainObject.MULTI_VALUE_LIST.add(assignedRTRelAttr1);
	        DomainObject.MULTI_VALUE_LIST.add(assignedRTRelAttr2);
		    StringList busSelects 			= new StringList();
		    busSelects.add(assignedRTRelAttr1);
		    busSelects.add(assignedRTRelAttr2);
	        Map data              			= rtObj.getInfo(context, busSelects);
		    StringList titleValue 			= (StringList)data.get(assignedRTRelAttr1);  
		    StringList routeInstructionValues = (StringList) data.get(assignedRTRelAttr2);
		    DomainObject.MULTI_VALUE_LIST.remove(assignedRTRelAttr1);
		    DomainObject.MULTI_VALUE_LIST.remove(assignedRTRelAttr2);
		    Iterator itr = titleValue.iterator();
		    while( itr.hasNext()){
		       if(UIUtil.isNullOrEmpty((String)itr.next())){
			        String msg =  EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.RouteTemplateDetails.TaskAttrMessage");
        	        MqlUtil.mqlCommand(context, "notice $1", msg);
			        return 1;
		       }
		    }
		    itr = routeInstructionValues.iterator();
		    while( itr.hasNext()){
  		        if(UIUtil.isNullOrEmpty((String)itr.next())){
  			        String msg =  EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource",context.getLocale(),"emxComponents.RouteTemplateDetails.TaskAttrMessage");
    		        MqlUtil.mqlCommand(context, "notice $1", msg);
  			        return 1;
  		        }
  		    }
	   }catch (Exception ex) {
         throw new FrameworkException((String) ex.getMessage());
       }   
        return 0;
	}
    /**
     * This method grants the access for the connected Route Templates if the availability is either Workspace or Company
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - Availability Id String
     *        1 - Route Template Id String
	 *		  2 - Availability Type String
     *        3 - Availability Name String
     * @returns nothing
     * @throws Exception if the operation fails
     * @since R420HF5
     */
    public static void addOwnershipAvailabilityAccess(Context context, String[] args) throws Exception
    {
        String strAvailabilityId = args[0];
        String strRouteTemplateId = args[1];
        String strConnectedType = args[2];
        String strCompanyName = args[3];
		DomainObject dobjRouteTemplate = new DomainObject();
		dobjRouteTemplate.setId(strRouteTemplateId);
		StringList busSel =  new StringList(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS);
        Map busMap = null;
		if(!"Person".equals(strConnectedType)){	
			busMap = dobjRouteTemplate.getInfo(context, busSel);	
			if ("true".equalsIgnoreCase((String)busMap.get(DomainConstants.SELECT_HAS_CHANGESOV_ACCESS))) {		   
				if("Company".equals(strConnectedType)){
					StringList accessNames = DomainAccess.getLogicalNames(context, strRouteTemplateId);
					String strAccess = (String)accessNames.get(accessNames.size()-2);
					DomainAccess.createObjectOwnership(context, strRouteTemplateId, strCompanyName, null, strAccess, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
				}else {
					DomainAccess.createObjectOwnership(context, strRouteTemplateId, strAvailabilityId,DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
				}
			}
		}
    }
	
	/**
     * This method clears the access for the connected Route Templates if the availability is either Workspace or Company
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - Availability Id String
     *        1 - Route Template Id String
	 *		  2 - Availability Type String
     *        3 - Availability Name String
     * @returns nothing
     * @throws Exception if the operation fails
     * @since R420HF5 
     */
    public static void clearOwnershipAvailabilityAccess(Context context, String[] args) throws Exception
    {
        String strAvailabilityId = args[0];
        String strRouteTemplateId = args[1];
        String strConnectedType = args[2];
        String strCompanyName = args[3];
		if(!"Person".equals(strConnectedType)){
			 if("Company".equals(strConnectedType)){
				DomainAccess.deleteObjectOwnership(context, strRouteTemplateId, strCompanyName, null, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
			 }else{
				DomainAccess.deleteObjectOwnership(context, strRouteTemplateId, strAvailabilityId,DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
			 }
		}
    }
    
    /**
     * Range Values for PreserveTaskOwner field in Route Save As Template form, default value will be the attribute value set in the Route
     * @param context
     * @param args
     * @return
     * @throws FrameworkException
     */
    
        public Map getSaveAsTemplatePreserveTaskOwnerRange(Context context, String[] args) throws FrameworkException {

            try {
                Map programMap = (Map)JPO.unpackArgs(args);
                Map paramMap   = (Map)programMap.get("paramMap");
                Map requestMap = (Map)programMap.get("requestMap");
                
                String objectId = (String)requestMap.get("objectId");
                String sLanguage = (String) paramMap.get("languageStr");
                String routeId = (String)requestMap.get("parentOID");
                
                StringList values = new StringList(2);
                StringList range = new StringList(2);
                StringList selectedValues = new StringList(1);
                
                values.add("False");
                range.add(EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(sLanguage),"emxFramework.Range.Preserve_Task_Owner.False"));
                
                values.add("True");
                range.add(EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(sLanguage),"emxFramework.Range.Preserve_Task_Owner.True"));
                
                
                String attributePreserveTaskOwner = PropertyUtil.getSchemaProperty(context, "attribute_PreserveTaskOwner");
                String selectedPreserveTaskOwner = new Route(routeId).getAttributeValue(context, attributePreserveTaskOwner);
                if("True".equals(selectedPreserveTaskOwner)){
                	selectedValues.add(EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(sLanguage),"emxFramework.Range.Preserve_Task_Owner.True"));
                }else{
                	selectedValues.add(EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource", new Locale(sLanguage),"emxFramework.Range.Preserve_Task_Owner.False"));
                }
               
                return  getRangeValuesMap(values, range, selectedValues);  
                
            } catch (Exception e) {
                throw new FrameworkException(e);
            }
                   
        }
    		public int checkTaskAttributes(Context context,String[] args)throws Exception
    		{
    			if(args!=null && args.length>0){
    				String strRoutetemplateId=args[0];
    				String selSequence            = "attribute["+DomainObject.ATTRIBUTE_ROUTE_SEQUENCE+"]";
    				RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);
    				final String PROXYGROUPTYPE = PropertyUtil.getSchemaProperty(context,"type_GroupProxy");
    				Pattern relPattern        = new Pattern(DomainObject.RELATIONSHIP_ROUTE_NODE);
    				Pattern typePattern       = new Pattern(DomainObject.TYPE_PERSON);
    				typePattern.addPattern(DomainObject.TYPE_ROUTE_TASK_USER);
    				typePattern.addPattern(PROXYGROUPTYPE);
    				//typePattern.addPattern(DomainConstants.TYPE_PERSON);
    				
    				StringList selectStmts = new StringList();
    				selectStmts.addElement(boRouteTemplate.SELECT_TYPE);
    				selectStmts.addElement(boRouteTemplate.SELECT_CURRENT);
    				
    				StringList relStmts= new StringList();
    				relStmts.addElement(selSequence);
    				relStmts.addElement(boRouteTemplate.SELECT_TITLE);

    				boRouteTemplate.setId(strRoutetemplateId);
    				boRouteTemplate.open(context);		

    				MapList routeTaskList=boRouteTemplate.getRelatedObjects(context, relPattern.getPattern(),typePattern.getPattern(), selectStmts, relStmts, 
    						false, true, (short) 1, "", "", 0); 
    				if(routeTaskList.size() == 0) {
    					String taskAlertMsg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(),"emxComponents.RouteTemplate.MissingTask");
    					emxContextUtil_mxJPO.mqlNotice(context,taskAlertMsg);				
    					return 1;
    				}
    				Iterator memberItr = routeTaskList.iterator();
    				boolean bOrderFlag = false;
    				boolean titleEmpty = false;
    				boolean personInactive = false;
    				while(memberItr.hasNext())
    				{
    					Map memberMap = (Map)memberItr.next();
    					if (memberMap != null)
    					{
    						String strOrder = (String)memberMap.get(selSequence);
    						String strTaskTitle = (String)memberMap.get(boRouteTemplate.SELECT_TITLE);
    						String personORgroup = (String)memberMap.get(boRouteTemplate.SELECT_TYPE);
    						String state = (String)memberMap.get(boRouteTemplate.SELECT_CURRENT);
    						if(UIUtil.isNullOrEmpty(strTaskTitle)){
    							titleEmpty = true;
    							break;
    						}
    						if (UIUtil.isNullOrEmpty(strOrder))
    						{
    							bOrderFlag = true;
    							break;
    						}
    						if(TYPE_PERSON.equalsIgnoreCase(personORgroup) && !STATE_PERSON_ACTIVE.equalsIgnoreCase(state)) {
    							personInactive = true;
    							break;
    						}
    					}
    				}
    				if(bOrderFlag || titleEmpty){
    					String taskAlertMsg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(),"emxComponents.RouteTemplate.MissingTaskInfo");
    					emxContextUtil_mxJPO.mqlNotice(context,taskAlertMsg);				
    					return 1;
    				}
    				if(personInactive){
    					String taskAlertMsg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(),"emxComponents.RouteTemplate.InactiveUser");
    					emxContextUtil_mxJPO.mqlNotice(context,taskAlertMsg);				
    					return 1;
    				}
    				return 0;
    			}
    			return 0;
    		}
        /**
         * Edit access program to control the edit of Preserve Task owner field based on "choose users from User group" attribute
         * @param context
         * @param args
         * @return
         * @throws FrameworkException
         */
    	public static boolean canEditPreserveTaskOwnerField(Context context, String args[]) throws Exception {
        	HashMap inputMap = (HashMap)JPO.unpackArgs(args);
        	HashMap requestMap    = (HashMap) inputMap.get("requestMap");
        	String objectId = (requestMap == null) ? (String)inputMap.get("objectId") : (String)requestMap.get("objectId");
    		DomainObject routeTemplateObject = new DomainObject(objectId);
        	String chooseUsersFromUG = routeTemplateObject.getInfo(context, "attribute[Choose Users From User Group]");
    		if("True".equalsIgnoreCase(chooseUsersFromUG)){
        		return false;
        	}else{
        		return true;
        	}
    	}
    	
    	  /**
         * Range Values for ChooseUsersFromUG field in Route Save As Template form, default value will be the attribute value set in the Route Template
         * @param context
         * @param args
         * @return
         * @throws FrameworkException
         */
        
            public Map getSaveAsTemplateChooseUsersFromUGRange(Context context, String[] args) throws FrameworkException {

                try {
                    Map programMap = (Map)JPO.unpackArgs(args);
                    Map paramMap   = (Map)programMap.get("paramMap");
                    Map requestMap = (Map)programMap.get("requestMap");
                    
                    String objectId = (String)requestMap.get("objectId");
                    String sLanguage = (String) paramMap.get("languageStr");
                    
                    StringList values = new StringList(2);
                    StringList range = new StringList(2);
                    StringList selectedValues = new StringList(1);
                    
                    values.add("False");
                    range.add(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.No"));
                    
                    values.add("True");
                    range.add(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.Yes"));
                                        
                    String routeTemplate = "from[Initiating Route Template].to.id";
                    
                    RouteTemplate routeTemplateobject = new Route(objectId).getRouteTemplate(context);
                    
                    if(routeTemplateobject != null){
                    	String attributeChooseUsersFromUserGroup = PropertyUtil.getSchemaProperty(context, "attribute_ChooseUsersFromUserGroup");
                    	String attributeValue  = routeTemplateobject.getInfo(context, "attribute["+attributeChooseUsersFromUserGroup+"]");
                    	if("True".equalsIgnoreCase(attributeValue)) {
                    		selectedValues.add(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.Yes"));
                    	}else{
                    		selectedValues.add(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.No"));
                    	}
                    }else {
                    	selectedValues.add(EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource", new Locale(sLanguage),"emxComponents.Common.No"));
                    }
                   
                    return  getRangeValuesMap(values, range, selectedValues);  
                    
                } catch (Exception e) {
                    throw new FrameworkException(e);
                }
                       
            }
            
            /** this method is used on create RT command.
             * @param context
             * @param args
             * @return
             * @throws Exception
             */
            public boolean showCreateCommand(Context context , String[] args)throws Exception {
                String loggedInRole = PersonUtil.getActiveSecurityContext(context);
                String roleAdmin =   PropertyUtil.getSchemaProperty(context,"role_VPLMAdmin");
                if (loggedInRole.contains(roleAdmin))  {
                    return false;
                }
                Map<String,Boolean> routeTemplateCreationInfoMap = RouteTemplate.getRouteTemplateCreationInfo(context);
                if(routeTemplateCreationInfoMap.get("StandardTemplate") || routeTemplateCreationInfoMap.get("ApprovalTemplate") || routeTemplateCreationInfoMap.get("ReviewTemplate") ){
                    return true;
                }
                return false;
            }
            
            /** this method is used on revise RT command.
             * @param context
             * @param args
             * @return
             * @throws Exception
             */
            public boolean showReviseCommand(Context context , String[] args)throws Exception {
                try
                {
                    HashMap programMap        = (HashMap) JPO.unpackArgs(args);
                    String  objectId          = (String) programMap.get("objectId");
                    Map<String,Boolean> routeTemplateCreationInfoMap = RouteTemplate.getRouteTemplateCreationInfo(context);
                    RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);                
                    boRouteTemplate.setId(objectId);        
                    StringList selects  = new StringList(2);
                    selects.add(DomainConstants.SELECT_OWNER);
                    selects.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                    Map routeTemplateInfo    = boRouteTemplate.getInfo(context, selects);
                    String owner = (String) routeTemplateInfo.get(DomainConstants.SELECT_OWNER);
                    if(owner.equalsIgnoreCase(context.getUser())){
                        return true;
                    }
                    String routeBasePurpose = (String) routeTemplateInfo.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                    if(routeTemplateCreationInfoMap.get(routeBasePurpose+"Template")){
                        return true;
                    }
                    return false;
                } catch (Exception ex) {
                    ex.printStackTrace();
                    throw ex;
                }
                
            }
            
            /** this method is used on revise RT command.
             * @param context
             * @param args
             * @return
             * @throws Exception
             */
            public boolean showCommand(Context context , String[] args)throws Exception {
            	try
            	{
            		HashMap programMap        = (HashMap) JPO.unpackArgs(args);
            		if(programMap.containsKey("objectId") && UIUtil.isNotNullAndNotEmpty((String) programMap.get("objectId"))) {
            			String  objectId          = (String) programMap.get("objectId");
            			DomainObject domObj       = new DomainObject();
            			domObj.setId(objectId);

            			StringList selects  = new StringList(2);
            			selects.add(DomainConstants.SELECT_OWNER);
            			selects.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
            			selects.add(DomainConstants.SELECT_TYPE);
            			Map routeTemplateInfo    = domObj.getInfo(context, selects);

            			String type = (String) routeTemplateInfo.get(DomainConstants.SELECT_TYPE);
            			if(TYPE_ROUTE_TEMPLATE.equals(type)) { 
            				String owner = (String) routeTemplateInfo.get(DomainConstants.SELECT_OWNER);
            				String routeBasePurpose = (String) routeTemplateInfo.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
            				if(RouteTemplate.isOperationAllowed(context, routeBasePurpose, owner)){
            					return true;
            				}
            				return false;
            			}
            		}
            		return true;
            	} catch (Exception ex) {
            		ex.printStackTrace();
            		throw ex;
            	}

            }
            /**
             * This method is to check promote/demote operation whether user is allowed to promote/demote the object.
             * Returns 0 when user has rights to promote
             * This method will be called only in inactive and active state of route template
             * @param objectId - Object ID of the Route Template
             * @throws Exception 
             */
            public int triggerStateCheck(Context context,String[] args)throws Exception
            {
                if(args!=null && args.length > 0){
                    String routeTemplateId = args[0];
                    RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);                
                    boRouteTemplate.setId(routeTemplateId);
                    StringList selects  = new StringList(2);
                    selects.add(DomainConstants.SELECT_OWNER);
                    selects.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                    Map routeTemplateInfo    = boRouteTemplate.getInfo(context, selects);
                    String owner = (String) routeTemplateInfo.get(DomainConstants.SELECT_OWNER);
                    String routeBasePurpose = (String) routeTemplateInfo.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                    if(!RouteTemplate.isOperationAllowed(context, routeBasePurpose,owner)){
                        String strMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.RouteTemplate.PromotionFailed");
                        String userGroups = "";
                        try{
                            userGroups = EnoviaResourceBundle.getProperty(context,"emxComponents.RouteTemplate."+routeBasePurpose+"UserGroups");
                        }catch(Exception e){}
                        strMessage = strMessage.replace("<USERGROUP>",userGroups );
                        emxContextUtil_mxJPO.mqlNotice(context,strMessage);                
                        return 1;
                    }
                }
                return 0;
            }
            
             /**
             * This method is to check RT revise.
             * Returns 0 when user is not allowed to revise RT
             * @param objectId - Object ID of the Route Template
             * @throws Exception 
             */
            public int triggerReviseCheck(Context context,String[] args)throws Exception
            {
                if(args!=null && args.length > 0){
                    String routeTemplateId = args[0];
                    RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);                
                    boRouteTemplate.setId(routeTemplateId);
                    StringList selects  = new StringList(2);
                    selects.add(DomainConstants.SELECT_OWNER);
                    selects.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                    Map routeTemplateInfo    = boRouteTemplate.getInfo(context, selects);
                    String owner = (String) routeTemplateInfo.get(DomainConstants.SELECT_OWNER);
                    String routeBasePurpose = (String) routeTemplateInfo.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                    if(!RouteTemplate.isOperationAllowed(context, routeBasePurpose,owner)){
                        String strMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.RouteTemplate.ReviseFailed");
                        String userGroups = "";
                        try{
                            userGroups = EnoviaResourceBundle.getProperty(context,"emxComponents.RouteTemplate."+routeBasePurpose+"UserGroups");
                        }catch(Exception e){}
                        strMessage = strMessage.replace("<USERGROUP>",userGroups );
                        emxContextUtil_mxJPO.mqlNotice(context,strMessage);                
                        return 1;
                    }
                }
                return 0;
            }
            
            /**
             * Trigger Method to check whether user is allowed to perform change owner operation.
             *
             * @param context - the eMatrix <code>Context</code> object
             * @param args - args contains Context RT Object, KINDOFOWNER, new owner, old owner
             * @return - int (0 or 1) 0 - If success and 1 - If blocked.
             * @throws Exception if the operation fails
             * @since 2021x.
             */

             public int triggerOwnerChangeCheck(Context context, String[] args) throws Exception {
                try {
                        //Getting the object ID
                        String strObjectId = args[0];
                        String kindOfOwner = args[1];
                        String newOwner = args[2];
                        String oldOwner = args[3];
                        if("owner".equals(kindOfOwner)){
                            String routeTemplateId = args[0];
                            RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);                
                            boRouteTemplate.setId(routeTemplateId);
                            StringList selects  = new StringList(2);
                            selects.add(DomainConstants.SELECT_OWNER);
                            selects.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                            selects.add(DomainConstants.SELECT_ATTRIBUTE_TITLE);
                            selects.add(DomainConstants.SELECT_PHYSICAL_ID);
                            Map routeTemplateInfo    = boRouteTemplate.getInfo(context, selects);
                            String owner = (String) routeTemplateInfo.get(DomainConstants.SELECT_OWNER);
                            String routeBasePurpose = (String) routeTemplateInfo.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                            String title = (String) routeTemplateInfo.get(DomainConstants.SELECT_ATTRIBUTE_TITLE);
                            String templatePhysicalId = (String) routeTemplateInfo.get(DomainConstants.SELECT_PHYSICAL_ID);
                            if(!RouteTemplate.isOperationAllowed(context, routeBasePurpose,owner)){
                                String strMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.RouteTemplate.TransferOwnerFailed");
                                String userGroups = "";
                                try{
                                    userGroups = EnoviaResourceBundle.getProperty(context,"emxComponents.RouteTemplate."+routeBasePurpose+"UserGroups");
                                }catch(Exception e){}
                                strMessage = strMessage.replace("<USERGROUP>",userGroups );
                                emxContextUtil_mxJPO.mqlNotice(context,strMessage);                
                                return 1;
                            }
                        	if(!newOwner.equals(oldOwner)) {
                        	   Map<String, String> info = new HashMap<>();
                               info.put("MX_ROUTE_TEMPLATE_OLDOWNER", oldOwner);
                               info.put("MX_ROUTE_TEMPLATE_NEWOWNER", newOwner);
                               info.put("MX_ROUTE_TEMPLATE_TITLE", title);
                               info.put("MX_ROUTE_TEMPLATE_PHYSICALID", templatePhysicalId);
                        
                               routeTemplateNotifInfo.put(args[0], info);
                           }
                        }
                        return 0;
                }
                catch (Exception e) {            
                    return 1;
                }        
             }
             
             /**
              * This method is to check promote/demote operation whether user is allowed to delete the object.
              * Returns 0 when user has rights to promote
              * This method will be called only in inactive and active state of route template
              * @param objectId - Object ID of the Route Template
              * @throws Exception 
              */
             public int triggerDeleteCheck(Context context,String[] args)throws Exception
             {
                 if(args!=null && args.length > 0){
                     String routeTemplateId = args[0];
                     RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);                
                     boRouteTemplate.setId(routeTemplateId);
                     StringList selects  = new StringList(2);
                     selects.add(DomainConstants.SELECT_OWNER);
                     selects.add(DomainConstants.SELECT_NAME);
                     selects.add("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                     Map routeTemplateInfo    = boRouteTemplate.getInfo(context, selects);
                     String owner = (String) routeTemplateInfo.get(DomainConstants.SELECT_OWNER);
                     String rtName = (String) routeTemplateInfo.get(DomainConstants.SELECT_NAME);
                     String routeBasePurpose = (String) routeTemplateInfo.get("attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"]");
                     if(!RouteTemplate.isOperationAllowed(context, routeBasePurpose,owner)){
                         String strMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.RouteTemplate.DeletionFailed");
                         String userGroups = "";
                         try{
                             userGroups = EnoviaResourceBundle.getProperty(context,"emxComponents.RouteTemplate."+routeBasePurpose+"UserGroups");
                         }catch(Exception e){}
                         strMessage = strMessage.replace("<USERGROUP>",userGroups );
                         strMessage = strMessage.replace("<RTNAME>",rtName );
                         emxContextUtil_mxJPO.mqlNotice(context,strMessage);                
                         return 1;
                     }
            		 String relLinkRT= PropertyUtil.getSchemaProperty(context,"relationship_LinkRouteTemplate" );		
            		 Pattern relPattern        = new Pattern(relLinkRT);
            		 Pattern typePattern       = new Pattern(DomainObject.TYPE_ROUTE_TEMPLATE);

            		 StringList selectStmts = new StringList();
            		 selectStmts.addElement(boRouteTemplate.SELECT_NAME);      			   
            		 MapList routeConnectedToTemplateList=boRouteTemplate.getRelatedObjects(context, relPattern.getPattern(),typePattern.getPattern(), selectStmts, null, 
            				 false, true, (short) 1, "", "", 0); 
            		 StringList strNames= new StringList();
            		 Iterator relItr=routeConnectedToTemplateList.iterator();
            		 Map map=null;
            		 while(relItr.hasNext()) {
            			 map=(Map)relItr.next();
            			 strNames.add((String)map.get(DomainObject.SELECT_NAME));    				
            		 }
            		 if(strNames.size() > 0) {
            			 String templateIds = StringUtil.join(strNames, ",");
            			 String strMessage = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.RouteTemplate.DeleteMsg");
            			 strMessage = strMessage.replace("<RTNAME>",rtName );
            			 strMessage = strMessage.replace("<ROUTETEMPLATE>",templateIds );
            			 emxContextUtil_mxJPO.mqlNotice(context,strMessage);				
            			 return 1;
            		 }
            		 return 0;
                 }
                 return 0;
             }
             
             public String getLinkRouteTemplate(Context context,String[] args)
                     throws Exception
                {
                     HashMap programMap = (HashMap) JPO.unpackArgs(args);
                     HashMap requestMap = (HashMap) programMap.get("requestMap");
                     String strObjId = (String) requestMap.get("objectId");
                     String suiteKey = (String) requestMap.get("suiteKey");
                     String languageStr = (String) requestMap.get("languageStr");
                     String printFormat = (String)requestMap.get("PFmode");
                     String reportFormat = (String)requestMap.get("reportFormat");
                     String strMode = (String) requestMap.get("mode");
                     setId(strObjId);
                     String placeholderLabel = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(), "emxComponents.RouteTemplate.PlaceholderSubRT");
                     String noAccess = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(), "emxFramework.Access.NoAccess");
                     
                     StringBuffer returnString=new StringBuffer();                    
                     StringList selects = new StringList(2);
                     String relLinkRouteTemplate = PropertyUtil.getSchemaProperty(context, "relationship_LinkRouteTemplate" );
                     selects.add("from["+relLinkRouteTemplate+"].to.id");
                     selects.add("from["+relLinkRouteTemplate+"].to.name");
                     selects.add("from["+relLinkRouteTemplate+"].id");
                     selects.add(getAttributeSelect(ATTRIBUTE_ROUTE_BASE_PURPOSE));
                     ContextUtil.pushContext(context);
                     Map details = this.getInfo(context, selects);
                     String routeBase = (String) details.get(getAttributeSelect(ATTRIBUTE_ROUTE_BASE_PURPOSE));
                     String linkId = (String) details.get("from["+relLinkRouteTemplate+"].to.id");
                     String linkName = (String) details.get("from["+relLinkRouteTemplate+"].to.name");
                     String linkRelId = (String) details.get("from["+relLinkRouteTemplate+"].id");
                     String strAccess = "false";
                     try
                     {
                         DomainObject domObj = new DomainObject(linkId);
                         strAccess = domObj.getInfo(context,"current.access[read]");
                     }
                     catch (Exception e)
                     {
                         strAccess = "false";
                     }
                     ContextUtil.popContext(context);
                     if(UIUtil.isNullOrEmpty(linkId)) {
                    	 linkId = "";
                    	 linkName = "";
                    	 linkRelId = "";
                     }
                     if("false".equalsIgnoreCase(strAccess) && UIUtil.isNotNullAndNotEmpty(linkId)) {
                    	 return noAccess;
                     }else if(UIUtil.isNotNullAndNotEmpty(reportFormat) || UIUtil.isNotNullAndNotEmpty(printFormat)) {
                    	 return linkName;
                     }else if("view".equalsIgnoreCase(strMode) || !"Standard".equalsIgnoreCase(routeBase)) {
                    	 if(UIUtil.isNullOrEmpty(linkId)) {
                    		 return "";
                    	 }
                    	 String URLToShow = "../common/emxTree.jsp?objectId="+linkId;
                    	 returnString.append("<a href=\"javascript:showModalDialog(\'" +URLToShow + "\',700,600,false)\">"+linkName+"</a>");
                    	 return returnString.toString();
                     }else {  
                    	 returnString.append("<input type=\"text\" readonly=\"readonly\"  name=\"subRouteTemplateDisplay\" placeholder="+XSSUtil.encodeForHTMLAttribute(context,placeholderLabel) +" value=\""+XSSUtil.encodeForHTMLAttribute(context,linkName)+"\">");
                    	 returnString.append("<input type=\"hidden\" name=\"subRouteTemplate\"  value=\""+XSSUtil.encodeForHTMLAttribute(context,linkName)+"\">");
                    	 returnString.append("<input type=\"hidden\" name=\"subRouteTemplateOID\" value=\""+XSSUtil.encodeForHTMLAttribute(context,linkId)+"\">");
                    	 returnString.append("<input type=\"hidden\" name=\"OLDsubRouteTemplateOID\" value=\""+XSSUtil.encodeForHTMLAttribute(context,linkId)+"\">");
                    	 returnString.append("<input type=\"hidden\" name=\"OLDsubRouteTemplateRelOID\" value=\""+XSSUtil.encodeForHTMLAttribute(context,linkRelId)+"\">");
                    	 returnString.append("<input type=\"button\" name=\"btnsubRouteTemplateName\" value='...'  "+XSSUtil.encodeForHTMLAttribute(context,"true")+" onClick=\"");
                    	 returnString.append("javascript:showChooser('../common/emxFullSearch.jsp?field=TYPES=type_RouteTemplate:ROUTE_BASE_PURPOSE=Standard:CURRENT=policy_RouteTemplate.state_Active:LATESTREVISION=TRUE:route_95_template_95_valid=TRUE&table=RouteTemplateSummary&excludeOIDprogram=emxRouteTemplate:excludeCurrentRouteTemplate&selection=single&fieldNameActual=subRouteTemplate&fieldNameDisplay=subRouteTemplateDisplay&submitURL=../components/emxComponentsFullSearchUtil.jsp&mode=Chooser&HelpMarker=emxhelpfullsearch&templateId="+strObjId+"&fromPage=editrouteTemplate&showInitialResults=true', 600, 600)\">");
                    	 returnString.append("&nbsp;&nbsp;<a href=\"JavaScript:basicClear('subRouteTemplate')\">"+ComponentsUtil.i18nStringNow("emxComponents.Common.Clear",languageStr)+"</a>");
                    	 return returnString.toString();
                     }
                }
             public void updateLinkRouteTemplate(Context context, String[] args) throws Exception
             {
            	 HashMap programMap = (HashMap) JPO.unpackArgs(args);
                 HashMap requestMap = (HashMap) programMap.get("requestMap");
                 HashMap paramMap = (HashMap) programMap.get(PARAMMAP);
                 String strObjId = (String) paramMap.get(OBJECTID);
                 String[] newIds = (String[])requestMap.get("subRouteTemplateOID");
                 String[] oldIds = (String[]) requestMap.get("OLDsubRouteTemplateOID");
                 String[] oldRelIds = (String[]) requestMap.get("OLDsubRouteTemplateRelOID");
                 String newlinkTemplateId = "";
                 String oldLinkTId = "";
                 String oldLinkRelId = "";
                 if(newIds.length > 0) {
                	 newlinkTemplateId = newIds[0];
                 }
                 if(oldIds.length > 0) {
                	 oldLinkTId = oldIds[0];
                	 oldLinkRelId = oldRelIds[0];
                 }
                 if(oldLinkTId.equals(newlinkTemplateId)) {
                	 return;
                 }
                 String relLinkRT= PropertyUtil.getSchemaProperty(context,"relationship_LinkRouteTemplate" );
                 RouteTemplate routeTemplate = new RouteTemplate(strObjId);
                 if(UIUtil.isNotNullAndNotEmpty(newlinkTemplateId)) {
            		RouteTemplate linkRTObj = new RouteTemplate(newlinkTemplateId);
            		routeTemplate.connectTo(context,relLinkRT,linkRTObj);
            	 }
                 if(UIUtil.isNotNullAndNotEmpty(oldLinkTId)) {
             		RouteTemplate linkRTObj = new RouteTemplate(oldLinkTId);
             		DomainRelationship.disconnect(context, oldLinkRelId);
             	 }
                 
             }
             
             @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
         	public StringList excludeCurrentRouteTemplate(Context context, String[] args)
         	throws Exception
         	{
         		Map programMap = (Map) JPO.unpackArgs(args);
         		StringList excludeList = new StringList();   	
         		String strObjectId = (String)programMap.get("templateId");
         		if(UIUtil.isNotNullAndNotEmpty(strObjectId)) {
         			      		
             		DomainObject domObject = new DomainObject(strObjectId);
            		            		
            		MapList linkedTemplates = domObject.getRelatedObjects(context,
                			"Link Route Template",          // Expand this relationship
                			DomainConstants.TYPE_ROUTE_TEMPLATE,                // retrieving all object types
                			false, true, 0,                                // in the from direction, 1 level
                			new StringList(DomainConstants.SELECT_ID),     // just get the objectid att
                			DomainConstants.EMPTY_STRINGLIST,              // don't bother with rel atts
                			DomainConstants.EMPTY_STRING,                  // empty object where clause
                			DomainConstants.EMPTY_STRING,                  // empty rel where clause
                			null,                                          // don't filter out any relationships
                			null,                                      	   // don't filter the return type(s)
                			null);
            		
             		excludeList.add(strObjectId);
            		for(int ii = 0; ii < linkedTemplates.size(); ii++)
            		{
            			Map tempMap = (Map)linkedTemplates.get(ii);
            			excludeList.add((String)tempMap.get(DomainConstants.SELECT_ID));
            		}        		
             		
         		}         		
         		return excludeList;
         	}
             
             public Vector getLink(Context context,String[] args) throws Exception
             {
                 Vector AvailabilityList = new Vector();

                 try
                 {
                     HashMap programMap = (HashMap) JPO.unpackArgs(args);
                     Map paramList      = (Map)programMap.get("paramList");
                     String languageStr = (String)paramList.get("languageStr");
                     MapList objectList = (MapList)programMap.get("objectList");
                     boolean isPrinterFriendly = false;
                     String PrinterFriendly = (String)paramList.get("reportFormat");
                     String noAccess = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(), "emxFramework.Access.NoAccess");
                     
                     if (PrinterFriendly != null ) {
                        isPrinterFriendly = true;
                     }
                     String relLinkRT= PropertyUtil.getSchemaProperty(context,"relationship_LinkRouteTemplate" );
                     String selectable_name = "from["+relLinkRT+"].to.name";
                     String selectable_id = "from["+relLinkRT+"].to.id";
                     Iterator objectListItr = objectList.iterator();
                     while(objectListItr.hasNext())
                     {
                         Map objectMap = (Map) objectListItr.next();
                         String link_name =(String)objectMap.get(selectable_name);
                         String link_id =(String)objectMap.get(selectable_id);
                         String strAccess = "false";
                         try
                         {
                             DomainObject domObj = new DomainObject(link_id);
                             strAccess = domObj.getInfo(context,"current.access[read]");
                         }
                         catch (Exception e)
                         {
                             strAccess = "false";
                         }
                         StringBuffer strBuf = new StringBuffer();
                         if("false".equals(strAccess) && !UIUtil.isNullOrEmpty(link_id)) {
                        	 strBuf.append(XSSUtil.encodeForXML(context,noAccess));
                         }else if (UIUtil.isNotNullAndNotEmpty(link_name))
                         {
                        	 StringBuffer sbAvailabilityURL = new StringBuffer();
                             if(!isPrinterFriendly) {
                                 sbAvailabilityURL.append("../common/emxTree.jsp?objectId=");
                                 sbAvailabilityURL.append(XSSUtil.encodeForJavaScript(context, link_id));
                                 strBuf.append("<a href='javascript:showModalDialog(\""+sbAvailabilityURL.toString()+"\",575,575)'>");
                                 strBuf.append(XSSUtil.encodeForXML(context, link_name)).append("</a>");
                             } else
                             {
                                 strBuf.append(XSSUtil.encodeForXML(context,link_name));
                             }
                         }
                         AvailabilityList.add(strBuf.toString());
                     }
                 }
                 catch (Exception ex)
                 {
                     throw ex;
                 }
                 return AvailabilityList;
             }
             
             /**
              * Trigger Method to change all Route Node tasks to new owner.
              *
              * @param context - the eMatrix <code>Context</code> object
              * @param args - args contains Context RT Object, KINDOFOWNER, new owner, old owner
              * @return - int (0 or 1) 0 - If success and 1 - If blocked.
              * @throws Exception if the operation fails
              * @since 2021x.
              */

             public int performRouteTaskOwnerChangeOperation(Context context, String[] args) throws Exception {
            	 try {
            		 String routeTemplateId = args[0];
            		 String newOwner = args[1];
            		 String kindOfOwner = args[2];
            		 if("owner".equals(kindOfOwner)){
            			 String sAttrRouteOwnerTask = PropertyUtil.getSchemaProperty(context, "attribute_RouteOwnerTask");
            			 final String SELECT_ROUTE_OWNER_TASK = DomainObject.getAttributeSelect(sAttrRouteOwnerTask);
            			 RouteTemplate boRouteTemplate = (RouteTemplate)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE_TEMPLATE);                
            			 boRouteTemplate.setId(routeTemplateId);
            			 StringList relSelectables = new StringList(4);
            			 relSelectables.add(SELECT_ID);
            			 relSelectables.add(SELECT_ROUTE_OWNER_TASK);

            			 StringList objSelects = new StringList(2);
            			 objSelects.add(SELECT_TYPE);

            			 Pattern typePattern = new Pattern(DomainObject.TYPE_PERSON);
            			 //get all route-node rels connected to the route
            			 MapList routeNodeList =  boRouteTemplate.getRelatedObjects(context,
            					 DomainObject.RELATIONSHIP_ROUTE_NODE, //relationshipPattern
            					 typePattern.getPattern(), //typePattern
            					 objSelects, relSelectables,
            					 false, true,
            					 (short)1,
            					 null, null,
            					 0,
            					 null, null, null);
            			 DomainObject toObject = new DomainObject(PersonUtil.getPersonObjectID(context, newOwner));
            			 for (Iterator itrRouteNodeList = routeNodeList.iterator(); itrRouteNodeList.hasNext();) {
            				 Map mapRelInfo = (Map)itrRouteNodeList.next();
            				 String routeOwnerTask = (String) mapRelInfo.get(SELECT_ROUTE_OWNER_TASK);
            				 if("true".equalsIgnoreCase(routeOwnerTask)) {
            					 String relId = (String) mapRelInfo.get(SELECT_ID);
            					 try {
            						 ContextUtil.pushContext(context);
            						 MqlUtil.mqlCommand(context,"history off;", true);
            						 DomainRelationship.setToObject(context, relId,toObject);
            					 }
            					 catch (Exception e) { 
            						 return 1;
            					 } 
            					 finally {
            						 MqlUtil.mqlCommand(context,"history on;", true);
            						 ContextUtil.popContext(context);
            				      }
            				 }
            			 }
            		 }
            		 return 0;
            	 }
            	 catch (Exception e) {  
            		 return 1;
            	 }        
             }
             
             public boolean showLinkTemplateField(Context context, String[] args) throws Exception {
                 boolean showField = false;
                 try{
                     HashMap programMap = (HashMap) JPO.unpackArgs(args);
                     String strMode = (String) programMap.get("mode");
                     String strObjectId = (String) programMap.get("objectId");
                     setId(strObjectId);    
                     String relLinkRT= PropertyUtil.getSchemaProperty(context,"relationship_LinkRouteTemplate" );
                     StringList selects = new StringList(1);
                     selects.add(getAttributeSelect(ATTRIBUTE_ROUTE_BASE_PURPOSE));
                     selects.add("from["+relLinkRT+"].id");
                     ContextUtil.pushContext(context);
                     Map details = this.getInfo(context, selects);
                     String routeBasePurpose = (String) details.get(getAttributeSelect(ATTRIBUTE_ROUTE_BASE_PURPOSE));
                     String linkId = (String) details.get("from["+relLinkRT+"].id");
                     if("Standard".equalsIgnoreCase(routeBasePurpose)) {
                    	 showField = true;
                     }
                     if("view".equalsIgnoreCase(strMode) && UIUtil.isNullOrEmpty(linkId)) {
                    	 showField = false;
                     }
                     ContextUtil.popContext(context);
                 }catch(Exception e) {ContextUtil.popContext(context);}
                 return showField;
             }
             
             public static  Object getRouteTemplateCompletionAction(Context context, String[] args) throws Exception, FrameworkException {

            	 HashMap programMap = (HashMap) JPO.unpackArgs(args);
            	 HashMap requestMap = (HashMap) programMap.get("requestMap");
            	 HashMap paramMap = (HashMap) programMap.get("paramMap");
            	 String strMode = (String) requestMap.get("mode");
            	 String sAttrRouteCompletionAction = PropertyUtil.getSchemaProperty(context, "attribute_RouteCompletionAction" );
            	 String relLinkRT= PropertyUtil.getSchemaProperty(context,"relationship_LinkRouteTemplate" );
            	 String  languageStr = (String) paramMap.get("languageStr"); 
            	 String  objectId = (String) requestMap.get("objectId");
            	 DomainObject routeTemplateObject = new DomainObject(objectId);
            	 String routeBasePurpose =  routeTemplateObject.getInfo(context, "from["+relLinkRT+"].attribute["+sAttrRouteCompletionAction+"]");
            	 if(UIUtil.isNotNullAndNotEmpty(routeBasePurpose)) {
            		 routeBasePurpose = EnoviaResourceBundle.getRangeI18NString(context, sAttrRouteCompletionAction, routeBasePurpose,languageStr);
            	 }
            	 if("edit".equalsIgnoreCase(strMode) && UIUtil.isNullOrEmpty(routeBasePurpose)) {
            		 routeBasePurpose = EnoviaResourceBundle.getRangeI18NString(context, sAttrRouteCompletionAction, "Notify Route Owner",languageStr);
            	 }
            	 return routeBasePurpose;
             }
             public static  Object getRouteTemplateCompletionActionRange(Context context, String[] args) throws Exception, FrameworkException {

            	 HashMap programMap = (HashMap) JPO.unpackArgs(args);
            	 HashMap requestMap = (HashMap) programMap.get("requestMap");
            	 HashMap paramMap = (HashMap) programMap.get("paramMap");
            	 String sAttrRouteCompletionAction = PropertyUtil.getSchemaProperty(context, "attribute_RouteCompletionAction" );
            	 String  languageStr = (String) paramMap.get("languageStr"); 
            	
            	 HashMap tempMap = new HashMap();
            	 StringList fieldRangeValues = new StringList();
            	 StringList fieldDisplayRangeValues = new StringList();
            	 StringItr strItr = new StringItr(FrameworkUtil.getRanges(context,sAttrRouteCompletionAction));
            	 String sAttrRange = "";
            	 while(strItr.next())
            	 {
            		 sAttrRange = strItr.obj();
            	     fieldRangeValues.add(sAttrRange);
            		 fieldDisplayRangeValues.add(EnoviaResourceBundle.getRangeI18NString(context, sAttrRouteCompletionAction, sAttrRange,languageStr));
            	 }
            	 tempMap.put("field_choices", fieldRangeValues);
            	 tempMap.put("field_display_choices", fieldDisplayRangeValues);
            	 return tempMap;
             }
             public void updateRouteTemplateCompletionAction(Context context, String[] args) throws Exception
             {
            	 HashMap programMap = (HashMap) JPO.unpackArgs(args);
                 HashMap requestMap = (HashMap) programMap.get("requestMap");
                 HashMap paramMap = (HashMap) programMap.get(PARAMMAP);
                 String[] changeValue = (String[])requestMap.get("RouteTemplateCompletionAction");
                 String strObjId = (String) paramMap.get(OBJECTID);
                 this.setId(strObjId);
                 String relLinkRT= PropertyUtil.getSchemaProperty(context,"relationship_LinkRouteTemplate" );
                 StringList selects = new StringList(1);
                 selects.add("from["+relLinkRT+"].id");
                 Map details = this.getInfo(context, selects);
                 String connection_id = (String) details.get("from["+relLinkRT+"].id");
                 if(UIUtil.isNotNullAndNotEmpty(connection_id)) {
                	 DomainRelationship relObj = DomainRelationship.newInstance(context, connection_id);
            		 String sAttrRouteCompletion = PropertyUtil.getSchemaProperty(context, "attribute_RouteCompletionAction" );
            		 relObj.setAttributeValue(context, sAttrRouteCompletion, changeValue[0]);	
                 }
             }
             
             public int checkRouteTemplateState(Context context,String[] args)throws Exception
     		{
     			if(args!=null && args.length>0){
     				String policy=args[1];
     				String type=args[2];
     				String currentState=args[3];
     				String attributeName=args[4];
     				String routeTemplatePolicy = PropertyUtil.getSchemaProperty(context, "policy_RouteTemplate" );
     				String routeTemplateType = PropertyUtil.getSchemaProperty(context, "type_RouteTemplate" );
     				StringList attributeList = new StringList();
     				attributeList.add("Name");
     				attributeList.add("Auto Stop On Rejection");
     				attributeList.add("Description");
     				if(routeTemplatePolicy.equals(policy) && routeTemplateType.equals(type) && "Active".equals(currentState)) {
     					if(attributeList.contains(attributeName)) {
     						String errorMsg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(),"emxComponents.RouteMgmt.Error.RouteTemplateModifyFailed");
     						emxContextUtil_mxJPO.mqlNotice(context,errorMsg);				
     						return 1;
     					}
     				}
     				return 0;
     			}
     			return 0;
     		}
     		
             // Action Trigger for Route Template Change Owner
             public void templateChangeOwnerNotification(Context context, String[] args)throws Exception {
            	 if (args == null || args.length < 1) {
        			 throw (new IllegalArgumentException());
        		 }
            	 try {
            		 String kindOfOwner = args[2];            		  
            		 if ("owner".equals(kindOfOwner) && !routeTemplateNotifInfo.isEmpty()) {
            			 Map<String, String> infoMap = routeTemplateNotifInfo.containsKey(args[0]) ? routeTemplateNotifInfo.get(args[0]) : new HashMap<>();
            			 if(routeTemplateNotifInfo.containsKey(args[0])) {
            				 String templateTitle = infoMap.get("MX_ROUTE_TEMPLATE_TITLE");
            				 String newOwner = infoMap.get("MX_ROUTE_TEMPLATE_NEWOWNER");
            				 String oldOwner = infoMap.get("MX_ROUTE_TEMPLATE_OLDOWNER");
            				 String templatePhysicalId = infoMap.get("MX_ROUTE_TEMPLATE_PHYSICALID");

            				 Map<String, String> routeInfoNotif = new HashMap<>();
            				 routeInfoNotif.put(RouteTemplateNotification.ROUTE_TEMPLATE_ID, templatePhysicalId);
            				 routeInfoNotif.put(RouteTemplateNotification.ROUTE_TEMPLATE_NAME, templateTitle);
            				 routeInfoNotif.put(RouteTemplateNotification.ROUTE_TEMPLATE_OWNER, newOwner);
            				 routeInfoNotif.put(RouteTemplateNotification.OLD_OWNER, oldOwner);
            				 routeInfoNotif.put(RouteTemplateNotification.SENDER_USER, context.getUser());
            				 RouteTemplateNotification notifObj =new RouteTemplateNotification();
            				 notifObj.sendTemplateTransferOwnershipNotification(context, routeInfoNotif);
            			 }            			
            		 }
            	 }catch(Exception e) {
            		 //Unable to send notification
            	 }finally {
            		 routeTemplateNotifInfo.remove(args[0]);
            	 }
             }
}
