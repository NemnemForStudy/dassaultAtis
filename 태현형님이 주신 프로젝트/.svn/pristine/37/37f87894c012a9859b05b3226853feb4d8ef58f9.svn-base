/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 */

import matrix.db.BusinessObject;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Person;
import matrix.db.RelationshipType;
import matrix.util.StringList;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.Vector;

import com.dassault_systemes.enovia.changeaction.constants.ActivitiesOperationConstants;
import com.dassault_systemes.enovia.changeaction.factory.ChangeActionFactory;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeAction;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeActionServices;
import com.dassault_systemes.enovia.changeaction.interfaces.IECMConfigurationDataSchema;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeActionServices.Proposed;
import com.dassault_systemes.enovia.changeaction.interfaces.IOperation;
import com.dassault_systemes.enovia.changeaction.interfaces.IProposedChanges;
import com.dassault_systemes.enovia.changeaction.interfaces.IRealizedChange;
import com.dassault_systemes.enovia.e6w.foundation.jaxb.FieldValue;
import com.dassault_systemes.enovia.e6w.foundation.ServiceBase;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest;
import com.dassault_systemes.enovia.enterprisechangemgt.admin.ECMAdmin;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeCommon;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeManagement;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeOrder;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeSubscription;
import com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.common.util.SubscriptionUtil;
import com.matrixone.apps.domain.*;
import com.matrixone.apps.domain.util.*;
import com.matrixone.apps.framework.ui.UIUtil;
import com.dassault_systemes.enovia.e6w.foundation.jaxb.Status;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeAction;
import com.matrixone.apps.domain.util.MailUtil;

/**
 * The <code>enoECMChangeUtilBase</code> class contains implementation code for enoECMChangeUtil
 *
 * @version ECM R211  - # Copyright (c) 1992-2020 Dassault Systemes.
 */

public class enoECMChangeUtilBase_mxJPO extends emxDomainObject_mxJPO 
{

    /**
	 *
	 */
	private static final long serialVersionUID = 3382171941614201584L;
	private ChangeUtil changeUtil       =  null;
	private static HashMap _typePolicyStateIndexMap = null;
	public static final String SUITE_KEY = "EnterpriseChangeMgt";
    /** A string constant with the value objectList. */
    public static final String OBJECT_LIST = "objectList";
    /**
    * Constructor.
    *
    * @param context the eMatrix <code>Context</code> object.
    * @param args holds no arguments.
    * @throws Exception if the operation fails.
    * @since ECM R211
    */
	@Deprecated
    public enoECMChangeUtilBase_mxJPO (Context context, String[] args)
      throws Exception    {
        super(context, args);
        changeUtil    = new ChangeUtil();
    }

    /**
     * This method is executed if a specific method is not specified.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds no arguments.
     * @return int.
     * @throws Exception if the operation fails.
     * @since ECM R211
     */
	@Deprecated
    public int mxMain(Context context, String[] args)
        throws Exception
    {
        if (true)
        {
            throw new Exception("must specify method on emxDesignResponsibilityDeleteCheck invocation");
        }
        return 0;
    }


    /**
     * Connects ECR/ECO with the Passed Object.
     * @param context the eMatrix <code>Context</code> object
     * @param Hashmap holds the input arguments:
     * strRelationship holds relationship with which ECR will be connected
     * New Value is object Id of updated Object
     * @throws Exception if the operations fails
     * @since ECM R211
    */
	@Deprecated
    public DomainRelationship connect(Context context , HashMap paramMap ,String strRelationship, boolean isToSide) throws Exception {
         try {
            DomainRelationship drship=null;
            //Relationship name
            DomainObject oldListObject = null;
            DomainObject newListObject = null;
            //Getting the ECR Object id and the new MemberList object id
            String strChangeobjectId = (String)paramMap.get("objectId");
            DomainObject changeObj =  new DomainObject(strChangeobjectId);
            //for bug 343816 and 343817 starts
            String strNewToTypeObjId = (String)paramMap.get("New OID");

            if (strNewToTypeObjId == null || "null".equals(strNewToTypeObjId) || strNewToTypeObjId.length() <= 0
                      || "Unassigned".equals(strNewToTypeObjId)) {
                strNewToTypeObjId = (String)paramMap.get("New Value");
            }
            //for bug 343816 and 343817 ends
            String strOldToTypeObjId = (String)paramMap.get("Old OID");

            RelationshipType relType = new RelationshipType(strRelationship);
            if (strOldToTypeObjId != null && !"null".equals(strOldToTypeObjId) && strOldToTypeObjId.length() > 0
                      && !"Unassigned".equals(strOldToTypeObjId)) {
                    oldListObject = new DomainObject(strOldToTypeObjId);
                    changeObj.disconnect(context, relType, isToSide, oldListObject);
            }

            if(strNewToTypeObjId != null && !"null".equals(strNewToTypeObjId) && strNewToTypeObjId.length() > 0
                    && !"Unassigned".equals(strNewToTypeObjId)) {
                newListObject = new DomainObject(strNewToTypeObjId);

                drship = new DomainRelationship(isToSide ? DomainRelationship.connect(context,changeObj,relType,newListObject)
                              : DomainRelationship.connect(context, newListObject, relType, changeObj)) ;
            }

              return drship;
         } catch(Exception ex) {
             throw  new FrameworkException((String)ex.getMessage());
         }

      }


       /**Method to transfer the ownership of CO from properties page
        *
        */
	   @Deprecated
       @com.matrixone.apps.framework.ui.PostProcessCallable
       public void transferOwnership(Context context, String[] args) throws Exception {

           HashMap programMap = (HashMap) JPO.unpackArgs(args);
           HashMap requestMap = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);

           String transferReason = (String)requestMap.get(ChangeConstants.TRANSFER_REASON);
           String objectId 		 = (String)requestMap.get(ChangeConstants.OBJECT_ID);
           String newOwner 		 = (String)requestMap.get(ChangeConstants.NAME);
           String Organization   = (String) requestMap.get("Organization");
           String project        = (String) requestMap.get("Project");
           String []params 	     = {transferReason,newOwner};
           ChangeOrder changeOrder = new ChangeOrder(objectId);
           changeOrder.transferOwnership(context, transferReason,newOwner);
           changeOrder.setPrimaryOwnership(context, project, Organization);
       }



     /**
      * @author
      * this method gets the List of persons to be notified
      * on occurrence of events like cancel\On hold\Resume\Complete.
      *
      * The Owner\Originator\Reviewer\ApproverList\Distribution List members\Technical and Senior technical assignees of
      * related CAs will be added in ToList.
      *
      * @param context
      *            the eMatrix <code>Context</code> object.
      * @param args
      *            holds the following input arguments: - The ObjectID of the
      *            Change Process
      * @throws Exception
      *             if the operation fails.
      * @since ECM R214.
      */
	 @Deprecated
     @SuppressWarnings({ "rawtypes", "unchecked" })
   public StringList getToListForChangeProcess(Context context, String[] args) throws Exception {

       HashMap paramMap    = (HashMap) JPO.unpackArgs(args);
       String objectId     = (String) paramMap.get(SELECT_ID);
       //ChangeOrder changeOrder = new ChangeOrder(objectId);
       //return changeOrder.getToListForChangeProcess(context);
	   com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder changeCo =   new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder(objectId);
		return changeCo.getToListForChangeProcess(context);
    }

    /**
     * Get the list of all Objects connected to the context Change object as
     * Satisfied Items using 'Resolved To' relationship
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args     holds the following input arguments:
     *             0 - HashMap containing one String entry for key "objectId"
     * @return        a <code>MapList</code> object having the list of Implemented Items for this Change
     * @throws        Exception if the operation fails
     * @since         ECM 214
     **
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAllResolvedItems (Context context, String[] args) throws Exception {

        HashMap programMap      = (HashMap)JPO.unpackArgs(args);
        String strObjectId      = (String)programMap.get(ChangeConstants.OBJECT_ID);
        String strRelResolvedTo = RELATIONSHIP_RESOLVED_TO;

        MapList relBusObjPageList = new MapList();
        StringList objectSelects  = new StringList(SELECT_ID);
        StringList relSelects     = new StringList(SELECT_RELATIONSHIP_ID);

        //the number of levels to expand, 1 equals expand one level, 0 equals expand all
        short recurseToLevel = 1;
        //retrieving ImplementedItems List from Change Context
        setId(strObjectId);
        relBusObjPageList = getRelatedObjects(context,
                                              strRelResolvedTo,
                                              ChangeConstants.TYPE_ISSUE,
                                              objectSelects,
                                              relSelects,
                                              true,
                                              false,
                                              recurseToLevel,
                                              EMPTY_STRING,
                                              EMPTY_STRING,
                                              0);
        return  relBusObjPageList;
    }

    /**
     * Added for excluding the connected objects to the given object.
     * This can be used for generic purpose.
     * @param context
     * @param args
     * @return List of Object Ids
     * @throws Exception
     * @since R211 ECM
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
    public StringList excludeConnectedObjects(Context context, String[] args) throws Exception {
        Map programMap         = (Map) JPO.unpackArgs(args);
        String strObjectId     = (String)programMap.get(ChangeConstants.OBJECT_ID);
        String strRelationship = (String)programMap.get(ChangeConstants.TARGET_REL_NAME);
        //Get the From side from the URL to decide on traversal
        String strFrom         =(String)programMap.get(ChangeConstants.IS_FROM);
        String sMode           =(String)programMap.get("");
        StringList excludeList = new StringList();
        String strField        = (String)programMap.get("field");

        if(strField!= null){
            //get the Field value from URL param to know the types
            strField = strField.substring(strField.indexOf("=")+1,strField.length());
            if( strField.indexOf(":")>0){
                strField = strField.substring(0,strField.indexOf(":"));
            }
        }
        StringList sSelectables= new StringList();
        sSelectables.add(DomainConstants.SELECT_ID);

        boolean bisTo=true;
        boolean bisFrom=false;
        DomainObject domObj= DomainObject.newInstance(context, strObjectId);

        if("true".equalsIgnoreCase(strFrom))
        {
            bisTo=false;
            bisFrom=true;
        }
        MapList childObjects = domObj.getRelatedObjects(context,
									                    PropertyUtil.getSchemaProperty(context,strRelationship),
									                    strField==null?"*":strField,
									                    new StringList(DomainConstants.SELECT_ID),
									                    null,
									                    bisTo,
									                    bisFrom,
									                   (short) 1,
									                    DomainConstants.EMPTY_STRING,
									                    DomainConstants.EMPTY_STRING);

        for(int i=0;i<childObjects.size();i++){
            Map tempMap =(Map)childObjects.get(i);
            excludeList.add((String)tempMap.get(DomainConstants.SELECT_ID));
        }

        return excludeList;
    }

    /**
     * Method call to get the Name in the Last Name, First Name format.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the HashMap containing the following arguments
     *      objectList - MapList containn the list of busines objetcs
     *      paramList - HashMap containg the arguments like reportFormat,ObjectId, SuiteDirectory, TreeId
     * @return Object - Vector containing names in last name, first name format
     * @throws Exception if the operation fails
     * @since  ECM R211
     *
     */
	@Deprecated
    public Vector getCompleteName (Context context, String[] args) throws Exception {

    	//XSSOK
    	HashMap programMap        = (HashMap)JPO.unpackArgs(args);
        MapList objList 		  = (MapList)programMap.get("objectList");
        HashMap paramList         = (HashMap)programMap.get("paramList");
        String strReportFormat    = (String) paramList.get("reportFormat");
        Vector completeName		  = new Vector();

        String strSuiteDir = (String)paramList.get("SuiteDirectory");
        String strJsTreeID = (String)paramList.get("jsTreeID");
        String strParentObjectId = (String)paramList.get("objectId");

        //No of objects
        int iNoOfObjects = objList.size();
        String strObjId;String strFirstName;
        String strRelId;String strLastName;

        String arrObjId[] = new String[iNoOfObjects];
        String arrRelId[] = new String[iNoOfObjects];

        for (int i = 0; i < iNoOfObjects; i++) {
            arrObjId[i] = (String)((HashMap)objList.get(i)).get(DomainConstants.SELECT_ID);
            arrRelId[i] = (String)((HashMap)objList.get(i)).get(DomainConstants.SELECT_RELATIONSHIP_ID);
        }
        StringList listSelect = new StringList(2);
        String strAttrb1 = "attribute[" + DomainConstants.ATTRIBUTE_FIRST_NAME+ "]";
        String strAttrb2 = "attribute[" + DomainConstants.ATTRIBUTE_LAST_NAME+ "]";
        listSelect.addElement(strAttrb1);
        listSelect.addElement(strAttrb2);

        //Instantiating BusinessObjectWithSelectList of matrix.db and fetching  attributes of the objectids
        BusinessObjectWithSelectList attributeList = getSelectBusinessObjectData(context, arrObjId, listSelect);
        StringBuffer strFullName;
        for (int i = 0; i < iNoOfObjects; i++) {
        	strFullName = new StringBuffer(100);
            strObjId = arrObjId[i];
            strRelId = arrRelId[i];
            strFirstName = attributeList.getElement(i).getSelectData(strAttrb1);
            strLastName = attributeList.getElement(i).getSelectData(strAttrb2);
            //Constructing the HREF
            if(strReportFormat!=null&&strReportFormat.equals("null")==false&&strReportFormat.equals("")==false)
            {
                  strFullName.append(strLastName).append(" ").append(strFirstName);
            }
            else
            {

            	strFullName.append("<img src = \"images/iconSmallPerson.gif\"/>&#160;<a href=\"JavaScript:emxTableColumnLinkClick('emxTree.jsp?name="+XSSUtil.encodeForHTMLAttribute(context, strLastName)+XSSUtil.encodeForHTMLAttribute(context, strFirstName)+"&amp;treeMenu=type_Person&amp;emxSuiteDirectory=")
                		   .append(XSSUtil.encodeForHTMLAttribute(context, strSuiteDir)).append("&amp;relId=").append(XSSUtil.encodeForHTMLAttribute(context, strRelId)).append("&amp;parentOID=")
                		   .append(XSSUtil.encodeForHTMLAttribute(context, strParentObjectId)).append("&amp;jsTreeID=").append(XSSUtil.encodeForHTMLAttribute(context, strJsTreeID)).append("&amp;objectId=")
                		   .append(XSSUtil.encodeForHTMLAttribute(context, strObjId)).append("', 'null', 'null', 'true', 'popup')\" class=\"object\">")
                		   .append(XSSUtil.encodeForHTML(context, strLastName)).append(",&#160;").append(XSSUtil.encodeForHTML(context, strFirstName)).append("</a>");

            }

            completeName.addElement(strFullName.toString());
        }
        return  completeName;
    }

/**
 * Displays the Range Values on Edit for Attribute Type of dependency.
 * @param	context the eMatrix <code>Context</code> object
 * @param	args holds a HashMap containing the following entries:
 * @param   paramMap hold a HashMap containing the following keys, "objectId"
 * @return  HashMap contains actual and display values
 * @throws	Exception if operation fails
 * @since   ECM R211
 */
 @Deprecated
 public HashMap displayPrerequisiteTypeValues(Context context,String[] args) throws Exception
{
	String strLanguage         =  context.getSession().getLanguage();
	HashMap programMap         = (HashMap) JPO.unpackArgs(args);
	HashMap paramMap           = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);
	String ChangeObjectId 	   = (String) paramMap.get(ChangeConstants.OBJECT_ID);

    StringList dependencyTypes = FrameworkUtil.getRanges(context,ChangeConstants.ATTRIBUTE_PREREQUISITE_TYPE);
    HashMap rangeMap    	   = new HashMap();
    StringList listChoices 	   = new StringList();
    StringList listDispChoices = new StringList();

    String attrValue = "";
    String dispValue = "";

    for(Iterator dependencyItr = dependencyTypes.iterator(); dependencyItr.hasNext();) {
    	attrValue = dependencyItr.next().toString();
    	dispValue = i18nNow.getRangeI18NString(ChangeConstants.ATTRIBUTE_PREREQUISITE_TYPE, attrValue, strLanguage);
        listDispChoices.add(dispValue);
        listChoices.add(attrValue);
    }

    rangeMap.put("field_choices", listChoices);
    rangeMap.put("field_display_choices", listDispChoices);

	return rangeMap;
}
	/**
	 * Updates the Type of Dependency attribute value based on user selection.
	 * @param	context the eMatrix <code>Context</code> object
	 * @param	args holds a HashMap containing the following entries:
	 * @param   paramMap - a HashMap containing the following keys, "relId","RequestedChange"
	 * @return	int 0 for success or 1 for failure
	 * @throws	Exception if operation fails
	 * @since   ECM R211
	 */
@Deprecated
public int updatePrerequisiteTypeValues(Context context, String[] args) throws Exception
	{
	    String strLanguage  =  context.getSession().getLanguage();
	    HashMap programMap  = (HashMap)JPO.unpackArgs(args);
	    HashMap paramMap    = (HashMap)programMap.get(ChangeConstants.PARAM_MAP);

	    try {
			String sRelId 		= (String)paramMap.get(ChangeConstants.SELECT_REL_ID);
			String newTypeOfDependency  = (String)paramMap.get(ChangeConstants.NEW_VALUE);

			DomainRelationship.newInstance(context, sRelId).setAttributeValue(context, ChangeConstants.ATTRIBUTE_PREREQUISITE_TYPE, newTypeOfDependency);
	    }
	    catch (Exception ex) {
	    	ex.printStackTrace();
	    	return 1;
	    }
	    return 0;
}

/**
 * Exclude the Changes which leads to deadlock while connecting prerequisites
 * @author
 * @param context
 * @param argv
 * @return StringList
 * @throws Exception
 */
@Deprecated
@com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
public StringList excludePrerequisites(Context context, String[] argv) throws Exception
{
    HashMap programMap  = (HashMap) JPO.unpackArgs(argv);
    String strObjectId  = (String)programMap.get(ChangeConstants.OBJECT_ID);
    return  excludeParentAndChilds(context, ChangeConstants.RELATIONSHIP_PREREQUISITE);

}


/**
	 * Exclude the Changes which leads to deadlock while connecting prerequisites
	 * @param context
	 * @param argv
	 * @return StringList
	 * @throws Exception
	 */
	@Deprecated
	public StringList excludeParentAndChilds(Context context, String relationship) throws Exception {

	    StringList fromChangeList = new StringList();
	    MapList caList = getRelatedObjects(context, ChangeConstants.RELATIONSHIP_PREREQUISITE, "*",
	    		new StringList(SELECT_ID), null, true, false, (short)0, null, null);
	    Iterator caItr = caList.iterator();
	    Hashtable hashTable = null;
	    while(caItr.hasNext()){
	    	hashTable = (Hashtable)caItr.next();
	    	fromChangeList.add((String)hashTable.get(SELECT_ID));
	    }

	    StringList toChangeList   = getInfoList(context,"from[" + relationship + "].to.id");
	    fromChangeList.addAll(toChangeList);
	    return fromChangeList;
	}

/**
 * Fetches the objects which are subscribed by the context user
 * @author V1V
 * @param context
 * @param argv
 * @return MapList
 * @throws Exception
 */
@Deprecated
@com.matrixone.apps.framework.ui.ProgramCallable
public MapList getAllSubscribedObjects(Context context, String[] args) throws Exception {

	MapList mlObjectsList 	= null;
	MapList mlReturnList 	= new MapList();
	HashSet objSet			= new HashSet();
	String strObjId			= "";
	Map tempMap				= null;

	try {

		 // Getting the person object
		 DomainObject personObj = PersonUtil.getPersonObject(context);

		 // Relationship Pattern
		 String relPattern  = ChangeConstants.RELATIONSHIP_SUBSCRIBED_PERSON+","+ChangeConstants.RELATIONSHIP_PUBLISH+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.RELATIONSHIP_PUBLISH_SUBSCRIBE;
		// Type Pattern
		 String typePattern = ChangeConstants.TYPE_EVENT+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.TYPE_PUBLISH_SUBSCRIBE+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.TYPE_CHANGE_ACTION+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.TYPE_CHANGE_ORDER+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.TYPE_CHANGE_REQUEST;

		 // Getting all the objects subscribed by the context user
		 mlObjectsList = personObj.getRelatedObjects(context,
				relPattern,
				typePattern,
	            true,
	            false,
	            (short) 3,
	            new StringList(DomainConstants.SELECT_ID),
	            null,
	            DomainConstants.EMPTY_STRING,
	            DomainConstants.EMPTY_STRING,
	            0,
	            ChangeConstants.RELATIONSHIP_PUBLISH_SUBSCRIBE,
	            ChangeConstants.TYPE_CHANGE_ACTION+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.TYPE_CHANGE_ORDER+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.TYPE_CHANGE_REQUEST,
	            null);

		Iterator it = mlObjectsList.iterator();

		while (it.hasNext()) {

			Map objectMap = (Map) it.next();
			strObjId = (String) objectMap.get(DomainConstants.SELECT_ID);
			// Getting unique object ids
			objSet.add(strObjId);

		}

		Iterator iterator = objSet.iterator();

		while( iterator.hasNext()) {

			tempMap = new HashMap();
			tempMap.put(SELECT_ID, (String) iterator.next());
			// Adding unique object ids to be returned
			mlReturnList.add(tempMap);
		}

	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		throw new FrameworkException(e);
	}

	// Object Id Maplist
	return mlReturnList;

}


/**
 * Displays Edit and Delete link (Quick Actions) under Change Subscriptions of My Changes View
 * @author V1V
 * @param context
 * @param argv
 * @return Vector
 * @throws Exception
 */
@Deprecated
public Vector showChangeSubscriptionsQuickActions(Context context, String[] args) throws Exception
{
	//XSSOK
	HashMap programMap 	= (HashMap) JPO.unpackArgs(args);
	MapList objectList 	= (MapList) programMap.get("objectList");
	Vector vecReturn 	= new Vector(objectList.size());
	String strCommand	= PropertyUtil.getSchemaProperty(context,"command_ECMChangeSubscriptions");

	try {

	Map tempMap 						= null;
    String strSubscriptionEditEvents 	= "";
    String strSubscriptionDeleteEvents 	= "";
    String strObjectId 					= "";

     // Iterating each object
	 for (Iterator itrObjectList = objectList.iterator(); itrObjectList.hasNext();) {

		 StringBuffer sb	= new StringBuffer();
    	 tempMap 			= (Map)itrObjectList.next();
 		 strObjectId 		= (String) tempMap.get(DomainConstants.SELECT_ID);

 		// Setting Edit Link
 		strSubscriptionEditEvents = "<a target=\"listHidden\" href=\"javascript:showModalDialog('../components/emxSubscriptionDialog.jsp?objectId="+XSSUtil.encodeForHTMLAttribute(context, strObjectId)+"&amp;submitAction=refreshCaller')\"><img border='0' src='../common/images/iconSmallSignature.gif'/></a>";
        sb.append(strSubscriptionEditEvents);

        sb.append("\n");
        sb.append("\n");

        // Setting Delete Link
        strSubscriptionDeleteEvents = "<a href=\"javascript:submitWithCSRF('../enterprisechangemgtapp/ECMDisconnectProcess.jsp?objectId="+XSSUtil.encodeForHTMLAttribute(context, strObjectId)+"&amp;functionality=deleteSubscriptions&amp;commandName="+XSSUtil.encodeForHTMLAttribute(context, strCommand)+"',getTopWindow().findFrame(getTopWindow(),'listHidden'))\"><img border='0' src='../common/images/iconActionDelete.gif'/></a>";
        sb.append(strSubscriptionDeleteEvents);

        // Adding quick action for each row
	    vecReturn.add(sb.toString());

	 }


	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		throw new FrameworkException(e);
	}

	 return vecReturn;

}


/**
 * Displays Events subscribed by the context user for a particular object
 * @author V1V
 * @param context
 * @param argv
 * @return Vector
 * @throws Exception
 */
@Deprecated
public Vector showSubscribedEvents(Context context, String[] args) throws Exception
{
	//XSSOK
	HashMap programMap	= (HashMap) JPO.unpackArgs(args);
	MapList objectList 	= (MapList) programMap.get("objectList");
	Vector vecReturn 	= new Vector(objectList.size());
	DomainObject domObj = null;

	try {

	Map tempMap 		= null;
    String strObjectId 	= "";

    // Getting the business id of context person
    String strPersonId = PersonUtil.getPersonObject(context).getInfo(context, DomainConstants.SELECT_ID);

    // Iterating each object
	 for (Iterator itrObjectList = objectList.iterator(); itrObjectList.hasNext();) {

		 StringBuffer sb			= new StringBuffer();
		 StringList slEventSelects 	= new StringList();
		 tempMap 					= (Map)itrObjectList.next();
		 strObjectId 				= (String) tempMap.get(DomainConstants.SELECT_ID);
		 String strEventId			= "";
		 String strPerson			= "";
		 String strEventName		= "";
		 String strEventLabel		= "";
		 
		 StringList slPersonList	=  new StringList();

 		 domObj = DomainObject.newInstance(context, strObjectId);

 		 // Object Select List
 		 slEventSelects.addElement(DomainConstants.SELECT_ID);
 		 slEventSelects.addElement("attribute["+ChangeConstants.ATTRIBUTE_EVENT_TYPE+"]");

 		 // Relationship Pattern
		 String relPattern  = ChangeConstants.RELATIONSHIP_PUBLISH_SUBSCRIBE+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.RELATIONSHIP_PUBLISH;
		// Type Pattern
		 String typePattern = ChangeConstants.TYPE_PUBLISH_SUBSCRIBE+ChangeConstants.COMMA_SEPERATOR+ChangeConstants.TYPE_EVENT;

		 // Fetching all the events attached to this object
		 MapList mlObjectsList = domObj.getRelatedObjects(context,
				relPattern,
				typePattern,
	            false,
	            true,
	            (short) 2,
	            slEventSelects,
	            null,
	            DomainConstants.EMPTY_STRING,
	            DomainConstants.EMPTY_STRING,
	            0,
	            ChangeConstants.RELATIONSHIP_PUBLISH,
	            ChangeConstants.TYPE_EVENT,
	            null);


		 Iterator it = mlObjectsList.iterator();


		 while (it.hasNext()) {

			Map objectMap = (Map) it.next();

			strEventId = (String) objectMap.get(DomainConstants.SELECT_ID);
			// Get the person list for each event
			slPersonList = DomainObject.newInstance(context, strEventId).getInfoList(context, "from["+ChangeConstants.RELATIONSHIP_SUBSCRIBED_PERSON+"].to.id");

				// Check if context person has subscribed to above event
				if(slPersonList.contains(strPersonId)) {

					strEventName = (String) objectMap.get("attribute["+ChangeConstants.ATTRIBUTE_EVENT_TYPE+"]");
					strEventLabel = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Event."+strEventName.replace(" ", "_"));

					sb.append("<table>");
					sb.append("<tr>");
					//XSSOK
					sb.append("<td  title=\"" +  strEventLabel + "\">");
					sb.append("o");
			        sb.append("\n");
			        //XSSOK
			    	sb.append( strEventLabel);
					sb.append("<br/>");
					sb.append("</td>");
					sb.append("</tr>");
					sb.append("</table>");
				}


		}

		// Adding events for each row
	    vecReturn.add(sb.toString());

	 }


	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		throw new FrameworkException(e);
	}

	 return vecReturn;

}


/**
 * Sends notification when new CA is generated under CO
 * @author V1V
 * @param context
 * @param argv
 * @return void
 * @throws Exception
 */
@Deprecated
public void newCAAddedNotification(Context context, String args[]) throws Exception {

	if(getEnableDeprecatedNotifications(context))
		return;
	
	try
	{
		String sFromObjId 			= args[0];
		String sFromObject 			= args[1];
		String sToObject 			= args[2];
		String sNotificationName 	= args[3];

		StringList toList 			= new StringList();
		StringList objectIdList 	= new StringList();
	    StringList subscribersList 	= new StringList();


	    String sSubject = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.Subject.GenerateNewChangeAction");
	    String sMessage = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.Body.GenerateNewChangeAction");
	    String sAddedUnder = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.isAddedUnder");

		// Checking for Subscribers in CO Object
	    subscribersList = SubscriptionUtil.getSubscribersList(context, sFromObjId, sNotificationName, ChangeConstants.OBJECT, true);

	    // If there are subscribers for CO Object, create a toList
	    if(subscribersList.size() != 0) {

			String strSubscriberDetails = "";
			String strSubscribersName 	= "";

		    for (Iterator iterator = subscribersList.iterator(); iterator.hasNext();) {

		    	strSubscriberDetails = (String) iterator.next();
		    	if(strSubscriberDetails.contains("|")) {
		    	strSubscribersName = strSubscriberDetails.substring(0, strSubscriberDetails.indexOf("|"));

				// Adding Subscribed persons to the list
				toList.addElement(strSubscribersName);
		    	}

			}

			// Creating the Subject and Message for Icon Mail
			String sCOSubject = sSubject+sFromObject;
			String sCOMessage = sMessage+sToObject+" "+sAddedUnder+sFromObject;


			// Adding CO Id
			objectIdList.add(sFromObjId);

			// Notify all Subscribers of CO
			MailUtil.sendNotification(context,
					toList, null, null,
					sCOSubject,null, null,
					sCOMessage, null, null,
			        objectIdList, context.getRole(),
			        ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR);
	    }
	}
	catch (Exception ex)
	{
		throw ex;
	}
}


/**
 * Sends notification when CO Change Coordinator is assigned
 * @author V1V
 * @param context
 * @param argv
 * @return void
 * @throws Exception
 */
@Deprecated
public void changeCoordinatorAddedNotification(Context context, String args[]) throws Exception {

	if(getEnableDeprecatedNotifications(context))
		return;
	
	try
	{
		// args[] parameters
		String sFromObjId 			= args[0];
		String sFromObject 			= args[1];
		String sToObject 			= args[2];
		String sNotificationName 	= args[3];


		StringList toList 			= new StringList();
		StringList objectIdList 	= new StringList();
	    StringList subscribersList 	= new StringList();

	    String sSubject = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.Subject.ModifyCOAttribute");

	    String sMessage = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.Body.ModifyCOAttribute");

		// Checking for Subscribers in CO Object
	    subscribersList = SubscriptionUtil.getSubscribersList(context, sFromObjId, sNotificationName, ChangeConstants.OBJECT, true);

	    // If there are subscribers for CO Object, create a toList
	    if(subscribersList != null && subscribersList.size() > 0) {
			String strSubscribersName 	= "";
			int index = 0;
		    for (Object sIterator: subscribersList) {
		    	strSubscribersName = (String) sIterator;
		    	index = strSubscribersName.indexOf("|");
		    	if(index > 0){ // interested in only name
		    		strSubscribersName = strSubscribersName.substring(0, index);
		    	}

				// Adding Subscribed persons to the list if not already there
		    	if(!toList.contains(strSubscribersName)){
		    		toList.add(strSubscribersName);
		    	}
			}

            // Creating the Subject and Message for Icon Mail
			String sCOSubject = sSubject+sFromObject;
			String sCOMessage = sToObject+sMessage+sFromObject;


			// Adding CO Object Id
			objectIdList.add(sFromObjId);

			// Notify all Subscribers of CO
			MailUtil.sendNotification(context,
					toList, null, null,
					sCOSubject,null, null,
					sCOMessage, null, null,
			        objectIdList, context.getRole(),
			        ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR);
	    }
	}
	catch (Exception ex)
	{
	throw ex;
	}

}


/**
 * Sends notification when Affected Item Added - CO and CA Both
 * @Assumption Only Primary or Secondary Affected Items are added from CO or CA context, respectively
 * 			   In future if Secondary Affected Items are also allowed to be added from CO context, the logic of the code has to be changed
 * @author V1V
 * @param context
 * @param argv
 * @return void
 * @throws Exception
 */
@Deprecated
public void affectedItemAddedNotification(Context context, String args[]) throws Exception 
{
	return;
}


/**
 * Sends notification when Affected Item Removed - CO and CA Both
 *  * @Assumption Only Primary or Secondary Affected Items are removed from CO or CA context, respectively
 * 			   In future if Primary Affected Items are also allowed to be removed from CA context, the logic of the code has to be changed
 * @author V1V
 * @param context
 * @param argv
 * @return void
 * @throws Exception
 */
@Deprecated
public int affectedItemRemovedNotification(Context context, String args[]) throws Exception 
{
	return 0;
}

/**
 * Method to get connected CAs from CR and CO tabs from ChangeManagement from Application types(eg : Part,feature..)
 * @param context
 * @param args
 * @return MapList
 */
@Deprecated
@com.matrixone.apps.framework.ui.ProgramCallable
public MapList getConnectedChanges(Context context, String []args) throws Exception {
	  
	MapList totalRelatedListCAs = new MapList();
	 HashMap paramMap     = (HashMap)JPO.unpackArgs(args);
	  String functionality =(String)paramMap.get("functionality");
	  
	  StringList stlObjectSelects=new StringList();
	  stlObjectSelects.addElement(SELECT_ID);
		stlObjectSelects.addElement(SELECT_CURRENT);

	  Set changeActions    = new HashSet();
		String changeRequestOrOrderSelect = EMPTY_STRING;	
	  if("isChangeRequestTab".equalsIgnoreCase(functionality))
	  {
		  changeRequestOrOrderSelect = "evaluate[to["+ChangeConstants.RELATIONSHIP_CHANGE_ACTION+"].from["+ChangeConstants.TYPE_CHANGE_REQUEST+"].id]";
		  stlObjectSelects.addElement(changeRequestOrOrderSelect );
	  }
	  else if("isChangeOrderTab".equalsIgnoreCase(functionality))
	  {
		  changeRequestOrOrderSelect = "evaluate[to["+ChangeConstants.RELATIONSHIP_CHANGE_ACTION+"].from["+ChangeConstants.TYPE_CHANGE_ORDER+"].id]";
		  stlObjectSelects.addElement(changeRequestOrOrderSelect );
	  }



		String strObjectId = (String)paramMap.get(ChangeConstants.OBJECT_ID);
		BusinessObject busObjePart = new BusinessObject(strObjectId) ;
		List lBusoBject = new ArrayList(); 
		lBusoBject.add(busObjePart);

	String physicalId = new DomainObject(strObjectId).getInfo(context, "physicalid");
	List<String> lObjectId = new ArrayList();
	lObjectId.add(physicalId);


	MapList realizedCAMapList =new MapList();
		MapList proposedCAMapList =new MapList();

		ChangeActionFactory factory = new ChangeActionFactory();
		IChangeActionServices changeAction = factory.CreateChangeActionFactory();

	Map<String,Map<IChangeAction,List<IOperation>>> mapPrposedOperationAndCa = changeAction.getProposedOperationAndChangeActionFromIdList(context,lObjectId);
		Map<String, Map<IChangeAction, List<IRealizedChange>>> mapRealizedAndCaLinked = changeAction.getRealizedAndCaFromListObjects(context, lBusoBject, false, true, true);
		System.out.println("mapRealizedAndCaLinked: " + mapRealizedAndCaLinked);
	System.out.println("mapProposedAndCaLinked: " + mapPrposedOperationAndCa);
	for(Entry<String, Map<IChangeAction, List<IOperation>>> mapOutput : mapPrposedOperationAndCa.entrySet()){
		for(Entry<IChangeAction,List<IOperation>> mapOutput2: mapOutput.getValue().entrySet()){
			List<IOperation> proposedList = mapOutput2.getValue();
				IChangeAction iChangeAction = mapOutput2.getKey();
				// just check if it's attached as realized
				if(iChangeAction!= null){
				for(int index=0;index<proposedList.size();index++) {
					Map<String, String> proposedCAMap = new HashMap<String, String>();
					IOperation iOpreration = proposedList.get(index);
					String strOperationName = iOpreration.getOperationName();
					String strTargetedStatus = EMPTY_STRING;
					if(ActivitiesOperationConstants.operation_ChangeStatus.equalsIgnoreCase(strOperationName))
						strTargetedStatus = iOpreration.getTargetStatus();
					BusinessObject busChangeAction =  iChangeAction.getCaBusinessObject();
					String strChangeActionID = busChangeAction.getObjectId();
					DomainObject domChangeAction = new DomainObject(strChangeActionID);
					Map mapCAInfo = domChangeAction.getInfo(context, stlObjectSelects);
					String strCurrent = (String) mapCAInfo.get(SELECT_CURRENT);
					String strChangeId = (String) mapCAInfo.get(changeRequestOrOrderSelect);
					String strReasonForChange = new ChangeAction().getReasonForChangeFromChangeAction(context, strObjectId, strChangeActionID);
					String strRequestedChange = ChangeAction.getRequestedChangeFromOperationAndTargetedState(context, strOperationName, strTargetedStatus);
					proposedCAMap.put(SELECT_ID, strChangeActionID);
					proposedCAMap.put(SELECT_CURRENT, strCurrent);
					proposedCAMap.put(changeRequestOrOrderSelect,strChangeId);
					proposedCAMap.put(ATTRIBUTE_REQUESTED_CHANGE,strRequestedChange);
					proposedCAMap.put(ATTRIBUTE_REASON_FOR_CHANGE,strReasonForChange);
					IProposedChanges proposedChange = new ChangeAction().getProposedChangeObjectFromChangeActionAndObjectId(context, strObjectId, strChangeActionID);
					//For Old Schema id[Connection]  contains Change Affected Item relationship Id  and For New schema id[Connection] contains Proposed Activity rel  Id
					if(proposedChange!=null)
					{
						DomainObject objDomain = new DomainObject(proposedChange.getBusinessObject().getObjectId());
						if (!objDomain.exists(context)) 
						{
							proposedCAMap.put(DomainRelationship.SELECT_ID,proposedChange.getBusinessObject().getObjectId());
						} 
						else 
	  {
							proposedCAMap.put(DomainRelationship.SELECT_ID,new DomainObject(proposedChange.getBusinessObject()).getInfo(context, "to["+ChangeConstants.RELATIONSHIP_PROPOSED_ACTIVITIES+"].id"));
	  }
					}if(!proposedCAMap.isEmpty()){

						proposedCAMapList.add(proposedCAMap);
					}

				}
			}
	

			}
		}

		for(Entry<String, Map<IChangeAction,List<IRealizedChange>>> mapOutput : mapRealizedAndCaLinked.entrySet()){
			for(Entry<IChangeAction,List<IRealizedChange>> mapOutput2: mapOutput.getValue().entrySet()){
				List<IRealizedChange> realizedList = mapOutput2.getValue();
				IChangeAction iChangeAction = mapOutput2.getKey();
			Map<String, String> realizedCAMap = new HashMap<String, String>();
				if(iChangeAction!= null){

					BusinessObject busChangeAction =  iChangeAction.getCaBusinessObject();
					String strChangeActionID = busChangeAction.getObjectId();
					String strReasonForChange = EMPTY_STRING;
					DomainObject domChangeAction = new DomainObject(strChangeActionID);
					Map mapCAInfo = domChangeAction.getInfo(context, stlObjectSelects);
					String strCurrent = (String) mapCAInfo.get(SELECT_CURRENT);
					String strChangeId = (String) mapCAInfo.get(changeRequestOrOrderSelect);
					String strRequestedChange = new ChangeAction().getReaquestedChangeForRealizedFromChangeAction(context, strObjectId, strChangeActionID);
				realizedCAMap.put(SELECT_ID, strChangeActionID);
				realizedCAMap.put(SELECT_CURRENT, strCurrent);
				realizedCAMap.put(changeRequestOrOrderSelect, strChangeId);
				realizedCAMap.put(ATTRIBUTE_REQUESTED_CHANGE,strRequestedChange);
				realizedCAMap.put(ATTRIBUTE_REASON_FOR_CHANGE,strReasonForChange);
				}
			if(!realizedCAMap.isEmpty()){

				realizedCAMapList.add(realizedCAMap);
				}

			}
		}
		  
		String sCAId,changeId,current,strRelId = ""; 
		if(proposedCAMapList!=null){
		for(Object caObject:proposedCAMapList){
			Map caProposedMap = (Map)caObject;
			sCAId    = (String) caProposedMap.get(SELECT_ID);
			changeId = (String) caProposedMap.get(changeRequestOrOrderSelect);
			current  = (String) caProposedMap.get(SELECT_CURRENT);
			strRelId = (String) caProposedMap.get(DomainRelationship.SELECT_ID);
			if((!ChangeUtil.isNullOrEmpty(changeId)||"isChangeActionTab".equalsIgnoreCase(functionality))){
				if(!ChangeConstants.STATE_CHANGE_ACTION_PREPARE.equalsIgnoreCase(current) && !ChangeConstants.STATE_CHANGE_ACTION_INWORK.equalsIgnoreCase(current)||ChangeUtil.isNullOrEmpty(strRelId))caProposedMap.put("disableSelection", "true");
				totalRelatedListCAs.add(caProposedMap);
				changeActions.add(sCAId);
			}
		}
	}
	if(realizedCAMapList!=null){
		for(Object caObject:realizedCAMapList){
			Map caRealizedMap = (Map)caObject;
			sCAId    = (String) caRealizedMap.get(SELECT_ID);
			changeId = (String) caRealizedMap.get(changeRequestOrOrderSelect);
			current  = (String) caRealizedMap.get(SELECT_CURRENT);
			strRelId = (String) caRealizedMap.get(DomainRelationship.SELECT_ID);
							if((!ChangeUtil.isNullOrEmpty(changeId)||"isChangeActionTab".equalsIgnoreCase(functionality)) && !changeActions.contains(sCAId)){
				if(!ChangeConstants.STATE_CHANGE_ACTION_PREPARE.equalsIgnoreCase(current) && !ChangeConstants.STATE_CHANGE_ACTION_INWORK.equalsIgnoreCase(current)||ChangeUtil.isNullOrEmpty(strRelId))caRealizedMap.put("disableSelection", "true");
				totalRelatedListCAs.add(caRealizedMap);
							changeActions.add(sCAId);
							}

					}
		   }
	return totalRelatedListCAs;
}

/**
 * Method returns true if context object type and policy are registered as change type and policy
 * @param context
 * @param args
 * @return boolean
 */
@Deprecated
public boolean displayConnectedCACOLegacyObjects(Context context,String []args) throws Exception{
	HashMap programMap=JPO.unpackArgs(args);
	String strObjId = (String)programMap.get("objectId");
	DomainObject newObject = DomainObject.newInstance(context, strObjId);
	
	StringList objectSelect = new StringList(2);
	objectSelect.add(DomainConstants.SELECT_TYPE);
	objectSelect.add(DomainConstants.SELECT_POLICY);
	
	Map infoMap = newObject.getInfo(context, objectSelect);
	String type = (String) infoMap.get(DomainConstants.SELECT_TYPE);
	String policy = (String) infoMap.get(DomainConstants.SELECT_POLICY);
	 
	String configuredPartPolicy = PropertyUtil.getSchemaProperty(context, "policy_ConfiguredPart");
	IECMConfigurationDataSchema cfgDataSchemaServices = ChangeActionFactory.CreateChangeActionFactory().getDataSchemaInterface();
	//return (ECMAdmin.isRegisteredTypePolicy(context, type, policy));
	
	// First if type is not allowed, then return false
	if(!cfgDataSchemaServices.isTypeAllowedForProposed(context, type)){
		return false;
	}
	
	// Second if "Release" state is not defined, then return false;
	String releaseState = cfgDataSchemaServices.getECMReleaseFromPolicy(context, policy);
	if(releaseState==null || "".equals(releaseState)){
		return false;
	}
	return true;
}
	

/**
 * Shows status on CO/CR/CA Properties page.
 * @param context
 * @param args
 * @return String
 * @throws Exception
 * @since R216 ECM
 */
@Deprecated
public String showChangeStatusOnProperties(Context context, String[] args) throws Exception
{
	//XSSOK
	String statusString 	= "";
	try {
		HashMap paramMap     = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap   = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId      = (String)requestMap.get(ChangeConstants.OBJECT_ID);

    	// For export to CSV
    	String exportFormat = null;
    	boolean exportToExcel = false;
    	if(requestMap!=null && requestMap.containsKey("reportFormat")){
    		exportFormat = (String)requestMap.get("reportFormat");
    	}
    	if("CSV".equals(exportFormat)){
    		exportToExcel = true;
    	}
    	
		//The new parameter is added for IR-453887-3DEXPERIENCER2017X
		statusString = showStatusIcon(context, objectId,exportToExcel);
	}
	catch (Exception ex) {
		ex.printStackTrace();
		throw new FrameworkException(ex);
	}
	return statusString;
}

/**
 * Program to get Approval Status For CO/CR/CA
 * @param context the eMatrix <code>Context</code> object
 * @param args    holds the following input arguments:
 *           0 -  Object
 * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
 * @throws        Exception if the operation fails
 * @since         ECM R211
 **
 */
@Deprecated
public Vector showChangeStatus(Context context, String args[])throws Exception
{
	//XSSOK
	Vector columnVals = null;
	String objectId = "";
	String statusString = "";
	try {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		Map paramMap = (Map) programMap.get ("paramList");
		MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
    	
		// For export to CSV
    	String exportFormat = null;
    	boolean exportToExcel = false;
    	if(paramMap!=null && paramMap.containsKey("reportFormat")){
    		exportFormat = (String)paramMap.get("reportFormat");
    	}
    	if("CSV".equals(exportFormat)){
    		exportToExcel = true;
    	}

		StringList sObjectIDList = changeUtil.getStringListFromMapList(objectList, ChangeConstants.ID);

		if (objectList == null || objectList.size() == 0){
			return columnVals;
		} else{
			columnVals = new Vector(sObjectIDList.size());
		}
		for(int i=0;i<sObjectIDList.size();i++){
			objectId = (String) sObjectIDList.get(i);
			statusString = showStatusIcon(context, objectId,exportToExcel);
			columnVals.add(statusString);
		}
		return columnVals;

	} catch (Exception e) {
		throw new FrameworkException(e);
	}
}//end of method
/**
 * Program to get Column value For Proposed Change Summary table
 * @param context the eMatrix <code>Context</code> object
 * @param args    holds the following input arguments:
 *           0 -  Object
 * @return        Vector of column value
 * @throws        Exception if the operation fails
 **
 */
@Deprecated
public Vector showProposedChangeColumn(Context context, String args[],String showColumnKey)throws Exception
{
	//XSSOK
	Vector columnVals = new Vector();
	String objectId = "";
	String key = "";
	String objectRequestedChange = "";
	String strLanguage  	   =  context.getSession().getLanguage();
	try {
		HashMap programMap = (HashMap)JPO.unpackArgs(args);

		MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
		StringList sObjectRequestedChangeList = changeUtil.getStringListFromMapList(objectList,showColumnKey);

		if (objectList == null || objectList.size() == 0){
			return columnVals;
		} else{
			columnVals = new Vector(sObjectRequestedChangeList.size());
		}
		for(int i=0;i<sObjectRequestedChangeList.size();i++){
			objectRequestedChange = (String) sObjectRequestedChangeList.get(i);
			
			if(showColumnKey != null && showColumnKey.equals(DomainConstants.ATTRIBUTE_REQUESTED_CHANGE)){
			key = objectRequestedChange.replace(" ", "_");
			objectRequestedChange = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Range.Requested_Change."+key,strLanguage);
			}
			columnVals.add(objectRequestedChange);
		}
		return columnVals;

	} catch (Exception e) {
		throw new FrameworkException(e);
	}
}//end of method


/**
 * Program to get Column(Reason For Change) value For Proposed Change Summary table
 * @param context the eMatrix <code>Context</code> object
 * @param args    holds the following input arguments:
 *           0 -  Object
 * @return        Vector of column value
 * @throws        Exception if the operation fails
 **
 */
@Deprecated
public Vector showReasonForChange(Context context, String args[])throws Exception
{
	//XSSOK
	Vector columnVals = new Vector();
	String showColumnKey=DomainConstants.ATTRIBUTE_REASON_FOR_CHANGE;
	try {
		columnVals=showProposedChangeColumn(context, args,showColumnKey);
		return columnVals;

	} catch (Exception e) {
		throw new FrameworkException(e);
	}
}//end of method
/**
 * Program to get Column(Requested Change) value For Proposed Change Summary table
 * @param context the eMatrix <code>Context</code> object
 * @param args    holds the following input arguments:
 *           0 -  Object
 * @return       Vector of column value
 * @throws        Exception if the operation fails
 **
 */
@Deprecated
public Vector showRequestedChange(Context context, String args[])throws Exception
{
	//XSSOK
	Vector columnVals = null;
	String showColumnKey=DomainConstants.ATTRIBUTE_REQUESTED_CHANGE;
	try {
		columnVals=showProposedChangeColumn(context, args,showColumnKey);
		return columnVals;

	} catch (Exception e) {
		throw new FrameworkException(e);
	}
}//end of method

/**
 * Access program for 3DLive Examine channel in CO/CR affected items page
 * @param context
 * @param args
 * @return
 * @throws Exception
 */
	@Deprecated
	public Boolean showAffectedItem3DChannelCOCR(Context context, String[] args) throws Exception {

    return ChangeUtil.isReportedAgainstItemPart(context, args);
 	
}
	
/**
 * Access program for 3DLive Examine channel in affected items page
 * @param context
 * @param args
 * @return
 * @throws Exception
 */
	@Deprecated
	public Boolean showAffectedItem3DChannel(Context context, String[] args) throws Exception {

      String pref3DLive = PropertyUtil.getAdminProperty(context, "Person", context.getUser(), "preference_3DLiveExamineToggle");
     boolean flag = "Show".equals(pref3DLive);

     if(flag) {
 		return ChangeUtil.isReportedAgainstItemPart(context, args);
 	}
     return flag;
	}

	/**
     * Method to check 3D command enable
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	@Deprecated
    public Boolean show3DToggleCommand(Context context, String[] args) throws Exception {

    	String pref3DLive = PropertyUtil.getAdminProperty(context, "Person", context.getUser(), "preference_3DLiveExamineToggle");
    	boolean flag = ("Hide".equals(pref3DLive) || "".equals(pref3DLive));

    	if(flag) {
     		return ChangeUtil.isReportedAgainstItemPart(context, args);
     	}

	    return flag;
    }

    /**
     * Method to check 3D command disable
     * @param context
     * @param args
     * @return
     * @throws Exception
     */
	@Deprecated
    public Boolean hide3DToggleCommand(Context context, String[] args) throws Exception {

        String pref3DLive = PropertyUtil.getAdminProperty(context, "Person", context.getUser(), "preference_3DLiveExamineToggle");
    	boolean flag = "Show".equals(pref3DLive);

    	if(flag) {
     		return ChangeUtil.isReportedAgainstItemPart(context, args);
     	}

	    return flag;


    }


    
     /**
       * Gets the Affected Item Category for legacy changes.
       *
       * @param context - the eMatrix <code>Context</code> object
       * @return the same map list provided by the widget - MapList
       * @throws Exception if the operation fails
       **/   
    @SuppressWarnings({ "rawtypes", "unchecked" })
	private static Map getAffectedItemCategoryPerChange() {
    	HashMap categoryMap = new HashMap();
    	categoryMap.put("ECO", "msCategory");
    	categoryMap.put("ECR", "msCategory");
    	categoryMap.put("DECO", "msCategory");
    	categoryMap.put("PUE ECO", "PUEECOAffectedItemsTreeCategory");
    	categoryMap.put("Configured Change Action", "PUEECOAffectedItemsTreeCategory");
    	categoryMap.put("MECO", "MBOMMECOAffectedItemsTreeCategory");
    	categoryMap.put("DCR", "MBOMDCRAffectedItemsTreeCategory");
    	categoryMap.put("MCO", "MBOMAffectedPartRevisions");

    	return categoryMap;
    }
      
 
//############################# ENG OF ECM WIDGETS#############################
	/**
	 * This method is used as access function for Governing CO column in CR affected items page.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isChangeRequestTab(Context context,String []args) throws Exception {
		HashMap paramMap         = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap       = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String isChangeRequestTab= (String)paramMap.get("functionality");

		return "isChangeRequestTab".equalsIgnoreCase(isChangeRequestTab)? new Boolean(true) : new Boolean(false);

	}
	/**
	 * This method is used as access function for Governing CO column in CR affected items page.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isChangeOrderTab(Context context,String []args) throws Exception {
		HashMap paramMap         = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap       = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String isChangeOrderTab  = (String)paramMap.get("functionality");

		return "isChangeOrderTab".equalsIgnoreCase(isChangeOrderTab)? new Boolean(true) : new Boolean(false);

	}
	
	/**
	 * This method is used to send Notification while adding affected items to Change.
	 * @param context
	 * @param args
	 */
	@Deprecated
	public void sendNotificationforAffectedItemsAdded(Context context, String strParentObjId, String sAffectedItemAddedNotification, String sSubjectAddedUnder, String sMessageAddedUnder, String strParentObjName, String strObjectNames) throws Exception 
	{
		return;
	}
	
	/**
	 * This method is used as access function for non-CA type object for Review Affected Item in Cancel/Hold.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isNonCAContext(Context context,String []args) throws Exception {
		return ! isCAContext(context, args);
	}
	
	/**
	 * This method is used as access function for CA type object for Review Affected Item in Cancel/Hold.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isCAContext(Context context,String []args) throws Exception {
		HashMap paramMap         = (HashMap) JPO.unpackArgs(args);
		String type = (String)paramMap.get(ChangeConstants.SELECT_TYPE);
		
		return "type_ChangeAction".equalsIgnoreCase(type)? new Boolean(true) : new Boolean(false);
	}
	/**
	 * This method is used as access function for CO Summary menu under CR context.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isCOSummaryMenuAccessible(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		//getting parent object Id from args
		boolean isAccessible = false;
		String strObjectId = (String)programMap.get("objectId");
		ChangeRequest objChangeRequest =new ChangeRequest(strObjectId);
		String strCurrent = objChangeRequest.getInfo(context, DomainObject.SELECT_CURRENT);
		boolean isEnable = objChangeRequest.isChangeDecompositionEnabled(context);
		if(ChangeConstants.STATE_CHANGEREQUEST_INPROCESSCO.equalsIgnoreCase(strCurrent)
				&& isEnable && hasChangeCordinatorRole(context,args))
		{
			isAccessible=true;
		}
		
		return isAccessible;
		
	}	
	
	/**
	 * This method is used as access function for UnDispatch CA Channel and Drop Zone column of CO summary view in CR category Change Order
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean hasUndispatchedCA(Context context,String []args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		//getting parent object Id from args
		boolean hasUndispatchedCA = false;
		String strObjectId = (String)programMap.get("objectId");
		ChangeRequest objChangeRequest =new ChangeRequest(strObjectId);
		StringList slBusselects=new StringList(SELECT_ID);
		StringList slRelSelects = new StringList(SELECT_RELATIONSHIP_ID);
		MapList mlCA = objChangeRequest.getChangeActionsNotGovernedByCO(context, slBusselects, slRelSelects, EMPTY_STRING, EMPTY_STRING);
		if(!mlCA.isEmpty())
		{
			hasUndispatchedCA=true;
		}		
		return hasUndispatchedCA;
	}
	/**
	 * This method is used to check is context user has Change Coordinator role or not.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean hasChangeCordinatorRole(Context context,String []args) throws Exception {
		 boolean bHasRole = false;
		 String strContextUser = context.getUser();
		Person person =new Person(strContextUser);
		if((person.isAssigned(context,ChangeConstants.ROLE_CHANGE_COORDINATOR))
	            ||(person.isAssigned(context,ChangeConstants.ROLE_VPLM_PROJECT_LEADER))) {
			bHasRole = true;
	        }
		return bHasRole;
	}
	
	/**
     * For Properties Page Active Change Exists Field
     * "Active Change Exists" will show Yes if
     * object has Change Action connected with Affected Item relationship, and
     * Change Action is not in "Complete", "On Hold" and "Cancelled"
     * other wise No 
     * @param context
     * @param args
     * @return
     * @throws Exception
     * @since R419
     */
	@Deprecated
    public String getActiveChangeIconInProperty(Context context, String[] args)
            throws Exception {
    	String strActiveChangeIcon = "";
    	
		try {
			Map programMap = (HashMap) JPO.unpackArgs(args);
			Map relBusObjPageList = (HashMap) programMap.get("paramMap");
			String strObjectId = (String) relBusObjPageList.get("objectId");
			HashMap requestMap = (HashMap) programMap.get("requestMap");

			String POLICY_CHANGE_ACTION = PropertyUtil.getSchemaProperty(context,"policy_ChangeAction");
			String STATE_CHANGE_ACTION_COMPLETE = PropertyUtil.getSchemaProperty(context,"policy", POLICY_CHANGE_ACTION, "state_Complete");
			StringBuffer sbActiveChangeIcon = new StringBuffer(100);

			String strTooltipActiveChangeIcon = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Change.ToolTipActiveChangeExists");
			String strNo = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(), "EnterpriseChangeMgt.ActiveChange.No");
			String strYes = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(), "EnterpriseChangeMgt.ActiveChange.Yes");
			boolean isCSVExport = requestMap.get("reportFormat") != null && "CSV".equalsIgnoreCase((String) requestMap.get("reportFormat"));

			String strActiveChangeIconTag = "";
			String strIcon = EnoviaResourceBundle.getProperty(context,"emxComponents.ActiveECImage");
			//Modeler API Call to get CA info
			List<BusinessObject> myObject = new ArrayList<BusinessObject>();
			myObject.add(new BusinessObject(strObjectId));
            ChangeActionFactory factory = new ChangeActionFactory();
            IChangeActionServices changeAction = factory.CreateChangeActionFactory();

			Map<String,Map<IChangeAction,Proposed>> ProposedAndCaLinked = changeAction.getProposedAndCaFromListObject(context, myObject);

			//DB Call to get CA more info which is missing in Modeler API
			StringList slCASelects=new StringList();
			String POLICY_CANCELLED = PropertyUtil.getSchemaProperty(context,"policy_Cancelled");
			String INTERFACE_CHANGE_ON_HOLD = PropertyUtil.getSchemaProperty(context,"interface_ChangeOnHold");
			slCASelects.add(DomainObject.SELECT_CURRENT);
			slCASelects.add(DomainObject.SELECT_POLICY);
			slCASelects.add("interface["+ INTERFACE_CHANGE_ON_HOLD +"]");
			boolean activeChange = false;
			for(Entry <String,Map<IChangeAction,Proposed>> objectMapEntry : ProposedAndCaLinked.entrySet()){
				for(Entry <IChangeAction,Proposed> proposedEntry : objectMapEntry.getValue().entrySet()){
					DomainObject ca = new DomainObject(proposedEntry.getKey().getCaBusinessObject());
					//DB Call to get CA details
					Map caCurrentState = ca.getInfo(context, slCASelects);
					String slCurrent = (String)caCurrentState.get(DomainObject.SELECT_CURRENT);
					String strPolicy = (String)caCurrentState.get(DomainObject.SELECT_POLICY);
					String onHold = (String)caCurrentState.get("interface["+ INTERFACE_CHANGE_ON_HOLD +"]");
					if(!strPolicy.equalsIgnoreCase(POLICY_CANCELLED) 
							&& !slCurrent.equalsIgnoreCase(STATE_CHANGE_ACTION_COMPLETE) 
							&&!onHold.equalsIgnoreCase("TRUE")){
						activeChange = true;
						break;
					}else{
						activeChange = false;
					}
				}
			}
			if (activeChange) {
				strActiveChangeIconTag = "<img src=\"../common/images/" + strIcon
						+ "\" border=\"0\"  align=\"middle\" " + "TITLE=\"" + " "
						+ strTooltipActiveChangeIcon + "\"" + "/>";
				if (!isCSVExport) {
					sbActiveChangeIcon.append(strActiveChangeIconTag);
				}
				sbActiveChangeIcon.append(strYes);
				strActiveChangeIcon = sbActiveChangeIcon.toString();
			} else {
				strActiveChangeIconTag = "&nbsp;";
				sbActiveChangeIcon.append(strNo);
				if (!isCSVExport) {
					sbActiveChangeIcon.append(strActiveChangeIconTag);
				}
				strActiveChangeIcon = sbActiveChangeIcon.toString();
			}
		} catch (Exception e) {
			throw new FrameworkException(e.getMessage()); 
		}
		return strActiveChangeIcon;		
    }
    
    /**
     * with the ECM adoption of FTR, for Active EC Column for LF/CF/MF - 
     * "Active Engineering Change" renamed "Active Change" will show Yes if
     * object has Change action connected with Affected Item relatonship, and
     * Change Action is not in "Complete", "On Hold" and "Cancelled"
     * 
     * other wise No
     * 
     * @param context
     * @param args
     * @return
     * @throws Exception
     * 
     */
	@Deprecated
    public List getActiveChangeIconInColumn(Context context, String[] args) throws Exception{        List lstActiveECIcon= new Vector();
        try {
        	Map programMap = (HashMap) JPO.unpackArgs(args);
        	MapList relBusObjPageList = (MapList) programMap.get(OBJECT_LIST);
        	Map paramList = (HashMap)programMap.get("paramList");
        	String reportFormat = (String)paramList.get("reportFormat");
        	int iNumOfObjects = relBusObjPageList.size();
        	String strActiveECIconTag = "";
        	String strIcon = EnoviaResourceBundle.getProperty(context,"emxComponents.ActiveECImage");
        	String strTooltipActiveECIcon = EnoviaResourceBundle.getProperty(context,ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR,context.getLocale(),"EnterpriseChangeMgt.Change.ToolTipActiveChangeExists");
        	String POLICY_CHANGE_ACTION = PropertyUtil.getSchemaProperty(context,"policy_ChangeAction");
        	String STATE_CHANGE_ACTION_COMPLETE = PropertyUtil.getSchemaProperty(context,"policy", POLICY_CHANGE_ACTION, "state_Complete");
        	Map objPhyIDActiveCA=new HashMap<String, String>();
        	//create list of BusinessObject for which CA Information required
        	List<BusinessObject> myObject = new ArrayList<BusinessObject>();
        	int iCount;
        	for (iCount = 0; iCount < iNumOfObjects; iCount++) {
        		Object obj = relBusObjPageList.get(iCount);
        		if (obj instanceof HashMap) {
        			myObject.add(new BusinessObject((String)((HashMap)relBusObjPageList.get(iCount)).get(DomainConstants.SELECT_ID)));
        		}
        		else if (obj instanceof Hashtable){
        			myObject.add(new BusinessObject((String)((Hashtable)relBusObjPageList.get(iCount)).get(DomainConstants.SELECT_ID)));
        		}
        	}
        	//TODO - Remove chunking of objects, once Modeler API 'getProposedAndCaFromListObject' gets fixed for 300 or more objects.
        	//IR-456937-3DEXPERIENCER2017x
        	List<List<BusinessObject>> myObjectList = new ArrayList<List<BusinessObject>>();
        	int chunksize = 100;
        	int idx = 0;
        	for (idx = 0; idx + chunksize <= myObject.size(); idx += chunksize) {
        		myObjectList.add(myObject.subList(idx, idx + chunksize));
            }
            if (idx < myObject.size()) {
            	myObjectList.add(myObject.subList(idx, myObject.size()));
            }

        	Iterator itr = myObjectList.iterator();
            while(itr.hasNext()){
            List<BusinessObject> myObjectSubList = (List<BusinessObject>) itr.next();
        	//Modeler API Call to get CA info        
            ChangeActionFactory factory = new ChangeActionFactory();
            IChangeActionServices changeAction = factory.CreateChangeActionFactory();
            Map<String,Map<IChangeAction,Proposed>> ProposedAndCaLinked = changeAction.getProposedAndCaFromListObject(context, myObjectSubList);
            
        	StringList slCASelects=new StringList();
        	String POLICY_CANCELLED = PropertyUtil.getSchemaProperty(context,"policy_Cancelled");
        	String INTERFACE_CHANGE_ON_HOLD = PropertyUtil.getSchemaProperty(context,"interface_ChangeOnHold");
        	slCASelects.add(DomainObject.SELECT_CURRENT);
        	slCASelects.add(DomainObject.SELECT_POLICY);
        	slCASelects.add("interface["+ INTERFACE_CHANGE_ON_HOLD +"]");
        	//for each object passed-DB Call to get CA more info which is mising in Modeler API
        	//TODO-- FROM MODELER SIDE- remove the implicit information by an explicite one. No CA = ObjectID + Empty Map @ ChangeModeler.
        	//TODO -- are we getting API/selectable API to get exact CA to avoid DB Calls?

        	for(Entry <String,Map<IChangeAction,Proposed>> objectMapEntry : ProposedAndCaLinked.entrySet()){
        		boolean activeEC = false;
        		String objectPhysicalID=objectMapEntry.getKey();
        		for(Entry <IChangeAction,Proposed> proposedEntry : objectMapEntry.getValue().entrySet()){
        			//iterate for each CA on Object, will chec if Active CA Exists.
        			DomainObject ca = new DomainObject(proposedEntry.getKey().getCaBusinessObject());
        			Map caCurrentState = ca.getInfo(context, slCASelects);
        			String slCurrent = (String)caCurrentState.get(DomainObject.SELECT_CURRENT);
        			String strPolicy = (String)caCurrentState.get(DomainObject.SELECT_POLICY);
        			String onHold = (String)caCurrentState.get("interface["+ INTERFACE_CHANGE_ON_HOLD +"]");
        			if(!strPolicy.equalsIgnoreCase(POLICY_CANCELLED) 
        					&& !slCurrent.equalsIgnoreCase(STATE_CHANGE_ACTION_COMPLETE) 
        					&&!onHold.equalsIgnoreCase("TRUE")){
        				activeEC = true;
        				break;
        			}else{
        				activeEC = false;
        			}
        		}
        		if(activeEC) {
        			if (reportFormat != null && !("null".equalsIgnoreCase(reportFormat)) && reportFormat.length()>0){
        				lstActiveECIcon.add(strTooltipActiveECIcon);
        			}else{
        				strActiveECIconTag =
        						"<img src=\"../common/images/"
        								+ strIcon
        								+ "\" border=\"0\"  align=\"middle\" "
        								+ "TITLE=\""
        								+ " "
        								+ strTooltipActiveECIcon
        								+ "\""
        								+ "/>";
        			}
        		} else {
        			strActiveECIconTag = " ";
        		}
        		//each Object with CA maintain Cell data in Map
        		objPhyIDActiveCA.put(objectPhysicalID,strActiveECIconTag);
        	}
            }
        	//iterate again
        	int iCount2;
        	for (iCount2 = 0; iCount2 < iNumOfObjects;iCount2++) {
        		Object obj = relBusObjPageList.get(iCount2);
        		String phyid="";
        		String objID="";
        		if (obj instanceof HashMap) {
        			phyid=(String)(((HashMap)relBusObjPageList.get(iCount2)).get("physicalid"));
        			objID=(String)(((HashMap)relBusObjPageList.get(iCount2)).get(DomainObject.SELECT_ID));
        		}
        		else if (obj instanceof Hashtable){
        			phyid=(String)((Hashtable)relBusObjPageList.get(iCount2)).get("physicalid");
        			objID=(String)(((Hashtable)relBusObjPageList.get(iCount2)).get(DomainObject.SELECT_ID));
        		}
        		
        		if((phyid==null ||phyid.trim().isEmpty()) && UIUtil.isNotNullAndNotEmpty(objID)){
        			//ROOT NODE- SELCTABLE PHYSICAL ID MISSING FOR EXPAND PROG CASE
        			phyid=DomainObject.newInstance(context, objID).getInfo(context, "physicalid");
        		}
        		if(objPhyIDActiveCA.containsKey(phyid)){
        			lstActiveECIcon.add((String)objPhyIDActiveCA.get(phyid));
        		}else{
        			lstActiveECIcon.add("");
        		}
        	}
        } catch (Exception e) {
        	throw new FrameworkException(e.getMessage());
        }
        return lstActiveECIcon;
    }  
    
    /**
	 * This method is used to check if CFF is installed or not.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isCFFInstalled(Context context,String []args) throws Exception {
		boolean isCFFInstalled = false;
		isCFFInstalled = isCFFInstalled(context);
		
		return isCFFInstalled;		
	}	
	
	@Deprecated
	public static boolean isCFFInstalled(Context context) {
   	 return (FrameworkUtil.isSuiteRegistered(context, "appVersionEffectivityFramework", false, null, null));
    }

	
	/**
	  * To obtain the list of Documents Object IDs to be excluded from the search for Add Existing Actions
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  StringList- consisting of the object ids to be excluded from the Search Results
	  * @throws Exception if the operation fails
	  * 
	  */
	 @Deprecated
	 @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
	 public StringList excludeConnectedDocumentsOID(Context context, String[] args) throws Exception
	 {
	     Map programMap = (Map) JPO.unpackArgs(args);
	     String strObjectIds = (String)programMap.get("objectId");
	     String strRelationship=(String)programMap.get("relName");
	     StringList excludeList= new StringList();
	     StringTokenizer objIDs = new StringTokenizer(strObjectIds,",");
	     
	     DomainObject domObjFeature = DomainObject.newInstance(context,strObjectIds);
	     MapList childObjects=domObjFeature.getRelatedObjects(context,
	             PropertyUtil.getSchemaProperty(context,strRelationship),
	             DomainConstants.TYPE_DOCUMENT,
	             new StringList(DomainConstants.SELECT_ID),
	             null,
	             false,
	             true,
	            (short) 1,
	             DomainConstants.EMPTY_STRING,
	             DomainConstants.EMPTY_STRING,
	             0);
	     for(int i=0;i<childObjects.size();i++){
	         Map tempMap=(Map)childObjects.get(i);
	         excludeList.add((String)tempMap.get(DomainConstants.SELECT_ID));
	     }
	     excludeList.add(strObjectIds);
	     return excludeList;
	 }

	 /**
	  * To check if new UX is to be loaded for Realized Changes
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  StringList- consisting of the object ids to be excluded from the Search Results
	  * @throws Exception if the operation fails
	  * 
	  */
	 @Deprecated
	 public boolean isNewUXForRealized(Context context,String []args) throws Exception {
		 boolean isNewUX = true;
		 String UXPropertyProposedRealized = EnoviaResourceBundle.getProperty(context, "EnterpriseChangeMgt", context.getLocale(), "EnterpriseChangeMgt.NewProposedAndRealizedUX");
			if(UXPropertyProposedRealized!=null && !UXPropertyProposedRealized.isEmpty()){
				if(UXPropertyProposedRealized.trim().equalsIgnoreCase("false"))isNewUX = false;
			}
			
		 return isNewUX;		
	 }
	 /**
	  * To check if old UX is to be loaded for Realized Changes
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  StringList- consisting of the object ids to be excluded from the Search Results
	  * @throws Exception if the operation fails
	  * 
	  */
	 @Deprecated
	 public boolean isOldUXForRealized(Context context,String []args) throws Exception {
		 boolean isOldUX = true;
		 isOldUX = !isNewUXForRealized(context, args);
		 return isOldUX;		
	 }
	 
	 @Deprecated
	 public String showStatusIcon(Context context, String objectId, boolean exportToExcel)throws Exception
		{
			String strLanguage = context.getSession().getLanguage();
			StringList objSelects = new StringList();
			objSelects.addElement(SELECT_TYPE);
			objSelects.addElement(SELECT_CURRENT);
			objSelects.addElement(SELECT_POLICY);
			objSelects.addElement(ChangeConstants.SELECT_ATTRIBUTE_ACTUAL_COMPLETION_DATE);
			objSelects.addElement(ChangeConstants.SELECT_ATTRIBUTE_ACTUAL_START_DATE);
			objSelects.addElement(ChangeConstants.SELECT_ATTRIBUTE_ESTIMATED_COMPLETION_DATE);
			objSelects.addElement(ChangeConstants.SELECT_TYPE_KINDOF);

			String current = "";
			String policy = "";
			String type = "";
			String symbStateName = "";
			String estimateCompletionDate = "";
			String statusString = "";
			String strTypeKindOf = EMPTY_STRING;

			Date actStartDate = null;
			Date actCompletionDate = null;
			Date estCompletionDate = null;

			String strActualStartDate = "";
			String strActualCompletionDate = "";
			String strEstimatedCompletionDate = "";

			int currStateIndex;
			int completeStateIndex;

			SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
			Date currentDate = dateFormat.parse(dateFormat.format(new Date()));
			try {
				setId(objectId);

				Map resultList = getInfo(context, objSelects);
				type = (String) resultList.get(SELECT_TYPE);
				current = (String) resultList.get(SELECT_CURRENT);
				policy = (String) resultList.get(SELECT_POLICY);
				symbStateName = FrameworkUtil.reverseLookupStateName(context,
						policy, current);
				estimateCompletionDate = (String) resultList
						.get(ChangeConstants.SELECT_ATTRIBUTE_ESTIMATED_COMPLETION_DATE);
				changeUtil = null == changeUtil ? new ChangeUtil() : changeUtil;
				currStateIndex = changeUtil.getStateIndex(context, policy, current);
				completeStateIndex = changeUtil.getStateIndex(context, policy,
						"Complete");
				current = EnoviaResourceBundle.getStateI18NString(context,policy,current,strLanguage);

				strTypeKindOf = (String) resultList.get(ChangeConstants.SELECT_TYPE_KINDOF);

				if (type.equals(ChangeConstants.TYPE_CHANGE_REQUEST)||isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST)) {
				  if(!exportToExcel)
				  {
					strActualStartDate = (String) resultList.get(ChangeConstants.SELECT_ATTRIBUTE_ACTUAL_START_DATE);
					strActualCompletionDate = (String) resultList.get(ChangeConstants.SELECT_ATTRIBUTE_ACTUAL_COMPLETION_DATE);

					actCompletionDate = !ChangeUtil.isNullOrEmpty(strActualCompletionDate) ?dateFormat.parse(dateFormat.format(eMatrixDateFormat.getJavaDate(strActualCompletionDate))) : null;
					estCompletionDate = !ChangeUtil.isNullOrEmpty(estimateCompletionDate) ?dateFormat.parse(dateFormat.format(eMatrixDateFormat.getJavaDate(estimateCompletionDate))) : null;

					if (currStateIndex == 0) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneInactive.png' name='grey' id='grey' alt=\""+ current + " \" title=\"" + current + " \" />";
					}
					if (currStateIndex > 0&& currStateIndex < completeStateIndex) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneDelayed.png' name='yellow' id='yellow' alt=\""+ current + " \" title=\"" + current + " \" />";
					}
					if (currStateIndex > 0 && currStateIndex < completeStateIndex
							&& estCompletionDate != null&& estCompletionDate.before(currentDate)) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneLate.png' name='red' id='red' alt=\""+ current + " \" title=\"" + current + " \" />";
					}
					if (ChangeConstants.STATE_SYMBOLIC_COMPLETE.equals(symbStateName)) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneCompleted.png' name='green' id='green' alt=\""+ current + " \" title=\"" + current + " \" />";
					}
				  }
				  else
				  {
					  statusString = current;
				  }

				}
				if (type.equals(ChangeConstants.TYPE_CHANGE_ORDER)||isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER)) {
				  if(!exportToExcel)
				  {
					Date estimatedJavaDate = !ChangeUtil.isNullOrEmpty(estimateCompletionDate) ? dateFormat.parse(dateFormat.format(eMatrixDateFormat.getJavaDate(estimateCompletionDate))) : null;
					if (currStateIndex == 0) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneInactive.png' name='grey' id='grey' alt=\""+ current + " \"  title=\"" + current + " \" />";
					}
					if ((currStateIndex == 0 || currStateIndex == 1 || currStateIndex == 2)&&!(ChangeConstants.POLICY_FASTTRACK_CHANGE.equals(policy))) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneInactive.png' name='grey' id='grey' alt=\""+ current + " \"  title=\"" + current + " \" />";
					}
					if (((currStateIndex > 0 &&(ChangeConstants.POLICY_FASTTRACK_CHANGE.equalsIgnoreCase(policy)))||(currStateIndex > 2 && (ChangeConstants.POLICY_FORMAL_CHANGE.equalsIgnoreCase(policy)))) && (currStateIndex < completeStateIndex)) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneDelayed.png' name='yellow' id='yellow' alt=\""+ current + " \" title=\"" + current + " \"  />";
					}
					if (estimatedJavaDate != null&& currentDate.after(estimatedJavaDate)
							&& (((currStateIndex > 0 &&(ChangeConstants.POLICY_FASTTRACK_CHANGE.equalsIgnoreCase(policy)))||(currStateIndex > 2 && (ChangeConstants.POLICY_FORMAL_CHANGE.equalsIgnoreCase(policy)))) && (currStateIndex < completeStateIndex))) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneLate.png' name='red' id='red' alt=\""+ current + " \" title=\"" + current + " \"  />";
					}
					if ((ChangeConstants.STATE_SYMBOLIC_COMPLETE.equals(symbStateName) || ChangeConstants.STATE_SYMBOLIC_IMPLEMENTED.equals(symbStateName))) {
						//XSSOK
						statusString = "<img border='0' src='../common/images/iconMilestoneCompleted.png' name='green' id='green' alt=\""+ current + " \" title=\"" + current + " \"  />";
					}
				  }
				  else
				  {
					  statusString= current;
				  }

				}
				if (type.equals(ChangeConstants.TYPE_CHANGE_ACTION)||isKindOf(context, ChangeConstants.TYPE_CHANGE_ACTION)) {
				  IChangeAction iCa=ChangeAction.getChangeAction(context, objectId);
				  if(iCa.isOnHold(context)){
					  statusString=EMPTY_STRING;
				  }else{

					  if(!exportToExcel)
					  {
					strActualCompletionDate = (String) resultList.get(ChangeConstants.SELECT_ATTRIBUTE_ACTUAL_COMPLETION_DATE);
					strEstimatedCompletionDate = (String) resultList.get(ChangeConstants.SELECT_ATTRIBUTE_ESTIMATED_COMPLETION_DATE);

					actCompletionDate = !ChangeUtil.isNullOrEmpty(strActualCompletionDate) ? dateFormat.parse(dateFormat.format(eMatrixDateFormat.getJavaDate(strActualCompletionDate))) : null;
					estCompletionDate = !ChangeUtil.isNullOrEmpty(estimateCompletionDate) ? dateFormat.parse(dateFormat.format(eMatrixDateFormat.getJavaDate(estimateCompletionDate))) : null;

						if (currStateIndex == 0) {
							//XSSOK
							statusString = "<img border='0' src='../common/images/iconMilestoneInactive.png' name='grey' id='grey' alt=\""+ current + " \"  title=\"" + current + " \" />";
						}
						if (currStateIndex > 0&& currStateIndex < completeStateIndex) {
							//XSSOK
							statusString = "<img border='0' src='../common/images/iconMilestoneDelayed.png' name='yellow' id='yellow' alt=\""+ current + " \" title=\"" + current + " \" />";
						}
						if (currStateIndex > 0 && currStateIndex < completeStateIndex
								&& estCompletionDate != null&& estCompletionDate.before(currentDate)) {
							//XSSOK
							statusString = "<img border='0' src='../common/images/iconMilestoneLate.png' name='red' id='red' alt=\""+ current + " \" title=\"" + current + " \" />";
						}
						if (ChangeConstants.STATE_SYMBOLIC_COMPLETE.equals(symbStateName)){
							//XSSOK
							statusString = "<img border='0' src='../common/images/iconMilestoneCompleted.png' name='green' id='green' alt=\""+ current + " \" title=\"" + current + " \" />";
						}
					}

					  else
					  {
						  statusString = current;

					  }
				  }
				}
				if(!type.equals(ChangeConstants.TYPE_CHANGE_ORDER) && !type.equals(ChangeConstants.TYPE_CHANGE_ACTION) && !type.equals(ChangeConstants.TYPE_CHANGE_REQUEST) && !"Change".equalsIgnoreCase(strTypeKindOf)){
					statusString 	= "-";
				}

			} catch (Exception Ex) {
				Ex.printStackTrace();
				throw Ex;
			}
			return statusString;
		}//end of method
	
	@Deprecated
	public boolean getEnableDeprecatedNotifications(Context context)
	{
		try
		{
			// 1 - Retrieve the expression		
			String exp = "ECM_EnableDeprecatedNotifications";
			String CmdExp = "list expression $1 select value dump";
			String Result = MqlUtil.mqlCommand(context, CmdExp, exp).trim();
			
			String testingVar = System.getenv("EnableDeprecatedNotifications");
		
			if(testingVar!=null && testingVar.equalsIgnoreCase("true")) return true;
			else if(Result!=null && Result.contains("true"))	return true;
			else return false;
		}
		catch(Exception e)
		{
			return false;
		}
	}
}//end of class

