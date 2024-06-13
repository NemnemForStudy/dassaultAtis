/*
 * ${CLASSNAME}
 *
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 *
 *
 */

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.Vector;
import java.util.List;
import java.util.ArrayList;

import matrix.db.BusinessObject;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Relationship;
import matrix.db.RelationshipType;
import matrix.util.StringList;

import com.dassault_systemes.enovia.changedependencies.factory.ChangeDependenciesFactory;
import com.dassault_systemes.enovia.changedependencies.interfaces.IChangeDependenciesServices;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeCommon;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeOrder;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeRequest;
import com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MailUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.jsystem.util.StringUtils;

/**
 * The <code>enoECMChangeOrderBase</code> class contains methods for executing
 * JPO operations related to objects of the admin type Change.
 *
 * @author YOQ/R3D
 * @version Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */
public class enoECMChangeRequestBase_mxJPO extends emxDomainObject_mxJPO
			{

		private ChangeUtil changeUtil = null;
		private ChangeRequest changeRequest     =  null;
		private static String  _ECM_DepAvoidLicencingCheck  = "ECM_DepAvoidLicencingCheck";
		/**   
		 * Default Constructor.
		 *
		 * @param context
		 *            the eMatrix <code>Context</code> object
		 * @param args
		 *            holds no arguments
		 * @throws Exception
		 *             if the operation fails
		 * @since Ecm R211
		 **
		 */
		@Deprecated
		public enoECMChangeRequestBase_mxJPO(Context context, String[] args)
				throws Exception {

			super(context, args);

			 changeUtil = new ChangeUtil();
			 changeRequest   = new ChangeRequest ();
		}

		/**
		 * Main entry point.
		 *
		 * @param context
		 *            the eMatrix <code>Context</code> object
		 * @param args
		 *            holds no arguments
		 * @return an integer status code (0 = success)
		 * @throws Exception
		 *             when problems occurred in the Common Components
		 * @since Common X3
		 **
		 */
		@Deprecated
		public int mxMain(Context context, String[] args) throws Exception {
			if (!context.isConnected()) {
				i18nNow i18nnow = new i18nNow();
				String strContentLabel = EnoviaResourceBundle.getProperty(context,
						ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),
						"EnterpriseChangeMgt.Error.UnsupportedClient");
				throw new Exception(strContentLabel);
			}
			return 0;
		}

		/**
		 * To create the Change Request from Create Component
		 *
		 * @author r2y
		 * @param context the eMatrix code context object
		 * @param args packed hashMap of request parameter
		 * @return Map contains change object id
		 * @throws Exception if the operation fails
		 * @Since ECM R216
		 */
		@Deprecated
		@com.matrixone.apps.framework.ui.CreateProcessCallable
		public Map createChangeRequest(Context context, String[] args) throws Exception {

		    HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		    HashMap requestValue = (HashMap) programMap.get(ChangeConstants.REQUEST_VALUES_MAP);
		    HashMap requestMap   = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);

		    String changeRequestId   = "";
		    String sType      = (String) programMap.get("TypeActual");
		    String sPolicy    = (String) programMap.get("Policy");
		    String sVault     = (String) programMap.get("Vault");
		    String sOwner     = (String) programMap.get(SELECT_OWNER);
			String sChangeDecomposition= (String) programMap.get("ChangeDecomposition");
			boolean bChangeDecompositionEnabled=false;
			if("Enabled".equalsIgnoreCase(sChangeDecomposition))
			{
				bChangeDecompositionEnabled=true;
			}

		    Map returnMap     = new HashMap();
		    boolean bAutoName = false;

		    try {
				com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest changeRequest=new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest();
				//Passing null for policy so that change request object will be created with default policy
				//changeRequestId= changeRequest.create(context, sType, sPolicy, bChangeDecompositionEnabled);
				changeRequestId= changeRequest.create(context, sType, null, bChangeDecompositionEnabled);
		        returnMap.put(ChangeConstants.ID, changeRequestId);

		    } catch (Exception e) {
		        e.printStackTrace();
		        throw new FrameworkException(e);
		    }

		    return returnMap;
		}

		/**
		 * Program promotes the CR to complete state when connected CO is completed.
		 *
		 * @author r2y
		 * @param context
		 * @param args
		 * @return
		 * @throws Exception
		 */
		@Deprecated
		public void promoteConnectedCRToCompleteState(Context context,String args[]) throws Exception {

			try {
				String strChangeOrderState = "";
				String strChangeOrderId = "";
				String strCROwner = "";
				String objectId = args[0];// Change Object Id
				setId(objectId);
				Map mapTemp = null;
				boolean bFlag = false;
				String strChangeRequestId = getInfo(context, "to["+ ChangeConstants.RELATIONSHIP_CHANGE_ORDER + "].from.id");
				String SubjectKey = args[1];
				String suiteKey = args[3];
				String MessageKey = args[2];
				StringList ccList = new StringList();
				StringList bccList = new StringList();
				StringList lstAttachments = new StringList();
				String STATE_CHANGE_REQUEST_COMPLETE = PropertyUtil.getSchemaProperty(context, "policy",ChangeConstants.POLICY_CHANGE_REQUEST, "state_Complete");

				if(!ChangeUtil.isNullOrEmpty(strChangeRequestId))
				{
					// Get Change Orders connected to Change Request
					MapList mlChangeOrders = getChangeOrders(context, strChangeRequestId);

					for (Object var : mlChangeOrders)
					{
						mapTemp = (Map) var;
						strChangeOrderState = (String)mapTemp.get(SELECT_CURRENT);
						strChangeOrderId = (String)mapTemp.get(SELECT_ID);
						if(!ChangeUtil.isNullOrEmpty(strChangeOrderState) && (ChangeConstants.STATE_FORMALCHANGE_PREPARE.equalsIgnoreCase(strChangeOrderState)
								|| ChangeConstants.STATE_FORMALCHANGE_INWORK.equalsIgnoreCase(strChangeOrderState) || ChangeConstants.STATE_FORMALCHANGE_INAPPROVAL.equalsIgnoreCase(strChangeOrderState) 
								|| ChangeConstants.STATE_FORMALCHANGE_INREVIEW.equalsIgnoreCase(strChangeOrderState) || ChangeConstants.STATE_FORMALCHANGE_PROPOSE.equalsIgnoreCase(strChangeOrderState))
								&& !strChangeOrderId.equals(objectId))
						{
							bFlag = true;
						}
					}

					//If flag is empty, then set the CO state and notify the owner.
				if (!bFlag) {
					
					setId(strChangeRequestId);
					
			System.out.println("inside new change added for ChangeRequest");
			StringList busSelects1 = new StringList(3);
			busSelects1.add(SELECT_ID);
			busSelects1.add(SELECT_CURRENT);
				
			MapList	routemaplistObjects = getRelatedObjects(context,
					RELATIONSHIP_OBJECT_ROUTE,
						DomainConstants.TYPE_ROUTE,
						busSelects1,          // object Select
						null,           // rel Select
						false,            // to
						true,              // from
						(short)1,
						"",                // ob where
						"",  // rel where
						(short)0
						);
			System.out.println("size  of  maplistObjects  Routes connected    " +  routemaplistObjects.size() +"  items    "  + routemaplistObjects) ;
				if(null!=routemaplistObjects &&  !routemaplistObjects.isEmpty() )
				{
					for(int i=0;i<routemaplistObjects.size();i++)
					{
						String currentState  = (String)((Map)routemaplistObjects.get(i)).get(SELECT_CURRENT);
						if(currentState.equalsIgnoreCase("In Process") || currentState.equalsIgnoreCase("Define"))
							return;
					}
					
				}	
			setState(context, STATE_CHANGE_REQUEST_COMPLETE);
				
					strCROwner = getOwner(context).getName();
					
					
					String type = getTypeName();
					String name = getName();
					String revision = getRevision();

					
					String subject = EnoviaResourceBundle.getProperty(context, suiteKey,context.getLocale(),  SubjectKey.trim());
					String description = EnoviaResourceBundle.getProperty(context, suiteKey,context.getLocale(),  MessageKey);
				    }
				}
			} catch (Exception Ex) {
				Ex.printStackTrace();
				throw Ex;
			}
		}

		/**
	       * Program returns StringList of CR Object IDs if the context user is Owner/Change Initiator(Originator)/Change Coordinator.
	       * @param context the eMatrix <code>Context</code> object
	       * @param args    holds the following input arguments:
	       *           0 -  Object
	       * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
	       * @throws        Exception if the operation fails
	       * @since         ECM R216
	       **
	     */
		@Deprecated
		@com.matrixone.apps.framework.ui.ProgramCallable
		public MapList getMyChangeRequests(Context context,String args[]) throws Exception{
		    MapList objList = new MapList();
			try{
				System.out.println("  inside getMyChangeRequests   " );
				String objectId 			= PersonUtil.getPersonObjectID(context);

				StringList strCROwned 		= (StringList)getOwnedCR(context, args);
		        StringList sRouteCR 		= getRouteTaskAssignedCRs(context, objectId);
		        StringList sRouteTemplateCR = getRouteTemplateAssignedCRs(context, objectId);

		        Set<String> hs = new HashSet();
		        hs.addAll(strCROwned);
		        hs.addAll(sRouteCR);
		        hs.addAll(sRouteTemplateCR);

		        String[] args1 = new String[hs.size()];
		        int i=0;
		        for(String s : hs )
		        {
		        	args1[i++] = s;
		        }

		        StringList objectSelects = new StringList();
		    	objectSelects.add(ChangeConstants.SELECT_ID);
				objectSelects.add(ChangeConstants.SELECT_POLICY);
				
				DomainObject domObj = new DomainObject(objectId);
			    MapList crListwithPolicyInfo = domObj.getInfo(context, args1 , objectSelects); 
			
			    Iterator itr = crListwithPolicyInfo.iterator();
		        String id = "";
		        while(itr.hasNext()){
		            Map  eachCR = (Map)itr.next();
		         String policy = (String) eachCR.get(SELECT_POLICY);	
		         System.out.println("  policy  " +  policy);   
		         if(!"".equalsIgnoreCase(policy) && policy.equalsIgnoreCase(ChangeConstants.POLICY_REQUEST_FOR_CHANGE))    
		            objList.add(eachCR);
		        }
		     		        
		        if(objList.size()!=0)
		            return objList;
		       else
		            return new MapList();
		    }catch (Exception e) {

		        throw e;
		    }
		}

		/**
		 * Program returns StringList of CR Object IDs if the context user is Owner/Change Initiator(Originator)/Change Coordinator.
		 * @param context the eMatrix <code>Context</code> object
		 * @param args    holds the following input arguments:
		 *           0 -  Object
		 * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
		 * @throws        Exception if the operation fails
		 * @since         ECM R211
		 **
		*/
		@Deprecated
		public Object getOwnedCR(Context context,String args[]) throws Exception{
		  StringList returnList = new StringList();
		  try{
		      StringList objectSelects = new StringList(1);
		      objectSelects.add(SELECT_ID);
		      String objectWhere = "owner == \""+ context.getUser() +"\" || attribute[Originator]==\""+context.getUser()+"\"";
		      MapList ownedCO = DomainObject.findObjects(context,
		    		  ChangeConstants.TYPE_CHANGE_REQUEST,                                 // type filter
		              QUERY_WILDCARD,         // vault filter
		              objectWhere,                            // where clause
		              objectSelects);                         // object selects

		      //IR-727836-3DEXPERIENCER2020x - separately gets CRs as Change Coordinator
		      String RELATIONSHIP_CHANGE_COORDINATOR = PropertyUtil.getSchemaProperty(context,"relationhip_ChangeCoordinator");
		      String strPersonId = PersonUtil.getPersonObjectID(context);
		      Person person = new Person(strPersonId);
		      MapList ccCRs = person.getRelatedObjects(context,
		      					    RELATIONSHIP_CHANGE_COORDINATOR,
		      					    ChangeConstants.TYPE_CHANGE_REQUEST,
		      					    objectSelects,
		      					    null,true,
		      					    false,
		      					    (short)1,
		      					    null,
		      					    null,
                                    0);

		      if(ccCRs!=null && ccCRs.size()>0){
                  //check and remove duplicates
                  Iterator itr = ccCRs.iterator();
                  while(itr.hasNext()){
                      Map ccCRMap = (Map)itr.next();
                      if(!containsId(ownedCO, (String)ccCRMap.get(SELECT_ID))){
                          ownedCO.add(ccCRMap);
                      }
                  }
		      }

		      return new ChangeUtil().getStringListFromMapList(ownedCO, "id");
		  }catch (Exception e) {

		      throw e;
		  }

		}
		
		private boolean containsId(MapList ml, String id){
            Iterator itr = ml.iterator();
            while(itr.hasNext()){
              Map map = (Map)itr.next();
              if(((String)map.get(SELECT_ID)).equals(id)) return true;
            }
            return false;
        }		

		/**
	     * Retrieves  Change Request assigned to person via Route Task
	     * @author R3D
	     * @param context
	     * @param args
	     * @return
	     * @throws Exception
	     */
		@Deprecated
	    public StringList getRouteTaskAssignedCRs(Context context, String personObjId) throws Exception {

	    	 String objSelect   = "to["+RELATIONSHIP_PROJECT_TASK+"].from."+
	     			"from["+RELATIONSHIP_ROUTE_TASK+"].to."+
	     			"to["+RELATIONSHIP_OBJECT_ROUTE+"|from.type=='"+ChangeConstants.TYPE_CHANGE_REQUEST+"'].from.id";

	         String sCR = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump",personObjId,objSelect);
	    	return FrameworkUtil.split(sCR, ChangeConstants.COMMA_SEPERATOR);

	       }

	    /**
	     * Retrieves  Change Request assigned to person via Route Template where Route Base Purpose is Approval/Review
	     * @author R3D
	     * @param context
	     * @param args
	     * @return
	     * @throws Exception
	     */
		@Deprecated
	    public StringList getRouteTemplateAssignedCRs(Context context,String personObjId) throws Exception {


	    	String objSelect   = "to["+RELATIONSHIP_ROUTE_NODE+"|from.type=='"+TYPE_ROUTE_TEMPLATE+"']."+
	   			 "from.to["+RELATIONSHIP_INITIATING_ROUTE_TEMPLATE+"].from."+
	   			 "to["+RELATIONSHIP_OBJECT_ROUTE+"|from.type=='"+ChangeConstants.TYPE_CHANGE_REQUEST+"'].from.id";

	      	String sCR = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump",personObjId,objSelect);
	    	return FrameworkUtil.split(sCR, ChangeConstants.COMMA_SEPERATOR);

	       }

		/**
		 * This method Create CO from CR context while promoting CR from In Review to In Process CR State.
		 * @author r2y
		 * @param context
		 *            the eMatrix <code>Context</code> object.
		 * @param args
		 *            holds objectId.
		 * @param args
		 *            holds relationship name
		 * @throws Exception if the operation fails.
		 * @since ECM R216
		 */
		@Deprecated
		public void createCOFromCR(Context context, String args[]) throws Exception {
			if (args == null || args.length < 1) {
				throw (new IllegalArgumentException());
			}
			System.out.println("inside  CreateCOFromCR ");
			String sChangeCoordinatorId 	  = "";
			String sReportedAgainstId   	  = "";
			String sResponsibleOrganizationId = "";
			String sOwner					  = "";
			String sDesc					  = "";
			String sCOId  					  = "";
			String sPolicy				      = ChangeConstants.FASTTRACK_CHANGE;
			String estimatedCompletionDate    = "";
			String severity					  = "";
			String sCategoryOfChange		  = "";
			Map sAttritubeMap				  = new HashMap(); 
			String PROJECT					  = "project";
			
			try {
				String sCRObjectId = args[0];
				setId(sCRObjectId);

                //exit if this is Change Decomposition 
			    String ATTRIBUTE_CHANGE_DECOMPOSITION = PropertyUtil.getSchemaProperty(context, "attribute_ChangeDecomposition");
			    String sChgDecompSelect = "attribute[" + ATTRIBUTE_CHANGE_DECOMPOSITION + "]";
			    if("Enabled".equalsIgnoreCase(getInfo(context, sChgDecompSelect))){
			    	return;
			    }
                
				String sChangeCoordinator     	= "from["+ ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR +"].to.id";
				String sReportedAgainst 		= "from["+ ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE +"].to.id";
				String sResponsibleOrganization = SELECT_ORGANIZATION;

				StringList selectable = new StringList();
				selectable.addElement(sChangeCoordinator);
				selectable.addElement(sReportedAgainst);
				selectable.addElement(sResponsibleOrganization);
				selectable.addElement(SELECT_OWNER);
				selectable.addElement(SELECT_DESCRIPTION);
				selectable.addElement(ChangeConstants.SELECT_ATTRIBUTE_ESTIMATED_COMPLETION_DATE);
				selectable.addElement(ChangeConstants.SELECT_ATTRIBUTE_SEVERITY);
				selectable.addElement(ChangeConstants.SELECT_ATTRIBUTE_CATEGORY_OF_CHANGE);
				selectable.addElement(SELECT_ORGANIZATION);
				selectable.addElement(PROJECT);
				
				Map resultList   			= getInfo(context, selectable);
				sChangeCoordinatorId	 	= (String) resultList.get(sChangeCoordinator);
				sReportedAgainstId 			= (String) resultList.get(sReportedAgainst);
				sResponsibleOrganizationId 	= (String) resultList.get(sResponsibleOrganization);
				sOwner 						= (String) resultList.get(SELECT_OWNER);
				sDesc						= (String) resultList.get(SELECT_DESCRIPTION);
				estimatedCompletionDate 	= (String) resultList.get(ChangeConstants.SELECT_ATTRIBUTE_ESTIMATED_COMPLETION_DATE);
				severity 					= (String) resultList.get(ChangeConstants.SELECT_ATTRIBUTE_SEVERITY);
				sCategoryOfChange 			= (String) resultList.get(ChangeConstants.SELECT_ATTRIBUTE_CATEGORY_OF_CHANGE);
				String sOrganization 		= (String) resultList.get(SELECT_ORGANIZATION);
				String sProject     		= (String) resultList.get(PROJECT);
				
				
				sAttritubeMap.put(ATTRIBUTE_ORIGINATOR, sOwner);
				sAttritubeMap.put(ChangeConstants.ATTRIBUTE_ESTIMATED_COMPLETION_DATE, estimatedCompletionDate);
				sAttritubeMap.put(ATTRIBUTE_SEVERITY, severity);
				sAttritubeMap.put(ATTRIBUTE_CATEGORY_OF_CHANGE, sCategoryOfChange);
				
				
				if(!hasRelatedObjects(context, ChangeConstants.RELATIONSHIP_CHANGE_ORDER, true)){
					ChangeOrder changeOrder= new ChangeOrder();
					sCOId = changeOrder.create(context,null,sPolicy,null,sOwner);
					changeOrder.setId(sCOId);
					changeOrder.setDescription(context, sDesc);
					changeOrder.setOwner(context, sOwner);
					// Connects CR and CO while promoting CR from In-Review State
					connect(context,ChangeConstants.RELATIONSHIP_CHANGE_ORDER,changeOrder,false);

					//Copy ResponsibleOrganization from CR to CO
					if(!ChangeUtil.isNullOrEmpty(sResponsibleOrganizationId)){
						changeOrder.setPrimaryOwnership(context, sProject, sOrganization);
					}
					//Adding CO name as its Title. 
					String strCOName = changeOrder.getInfo(context, SELECT_NAME );
					sAttritubeMap.put(ATTRIBUTE_TITLE, strCOName);
					
					//Copy ChangeCoordinator from CR to CO
					//May be in future it is needed.
					/*ss
					if(!ChangeUtil.isNullOrEmpty(sChangeCoordinatorId)){
						DomainRelationship.connect(context,changeOrder,ChangeConstants.RELATIONSHIP_CHANGE_COORDINATOR,DomainObject.newInstance(context, sChangeCoordinatorId));
					}
					*/
					//Copy ReportedAgainst from CR to CO
					if(!ChangeUtil.isNullOrEmpty(sReportedAgainstId)){
						DomainRelationship.connect(context,changeOrder,ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE,DomainObject.newInstance(context, sReportedAgainstId));
					}
					//Coping Estimated Completion Date, Severity, Originator and Category of Change to CO while generating CO from CR.
					changeOrder.setAttributeValues(context, sAttritubeMap);
					
					//Added for displaying Effectivity field on CO Properties page
					if(isCFFInstalled(context))
					{
						String RELATIONSHIP_NAMED_EFFECTIVITY =  PropertyUtil.getSchemaProperty(context, "relationship_NamedEffectivity") ;
						String TYPE_NAMED_EFFECTIVITY = PropertyUtil.getSchemaProperty(context,"type_NamedEffectivity");
						String POLICY_NAMED_EFFECTIVITY = PropertyUtil.getSchemaProperty(context,"policy_NamedEffectivity");
						
						String changeName = 		  (String)resultList.get(DomainConstants.SELECT_NAME);
		                String changeVault =         (String)resultList.get(DomainConstants.SELECT_VAULT);
												
						DomainObject neObj = DomainObject.newInstance(context);
	                    neObj.createObject(context, TYPE_NAMED_EFFECTIVITY, changeName, "", POLICY_NAMED_EFFECTIVITY, changeVault);
	                    String neObjectId = neObj.getObjectId(context); 
						
						RelationshipType relType = new RelationshipType();
	                    relType.setName(RELATIONSHIP_NAMED_EFFECTIVITY);
	                    changeOrder.addToObject(context, relType, neObjectId);
					}
					
			        if (!ChangeUtil.isNullOrEmpty(sCRObjectId)) {
			        	StringList objectSelects = new StringList(1);
						objectSelects.addElement(SELECT_ID);
						StringList relSelects = new StringList(1);
						relSelects.addElement(SELECT_RELATIONSHIP_ID);
						MapList changeActionList = getRelatedObjects(context, // context
								ChangeConstants.RELATIONSHIP_CHANGE_ACTION, // relationship pattern
								ChangeConstants.TYPE_CHANGE_ACTION, // object pattern
												   objectSelects, // object selects
												   relSelects, // relationship selects
												   false, // to direction
												   true, // from direction
												   (short) 1, // recursion level
												   null, // object where clause
												   null, // relationship where clause
												   (short) 0);

						StringList affectedObjList = changeUtil.getStringListFromMapList(
								changeActionList, SELECT_ID);
						if (!ChangeUtil.isNullOrEmpty(affectedObjList.toString())) {
							
							// create dependency link if Change type is CO only
							if(ChangeCommon.isKindOfObject(context, sCOId, PropertyUtil.getSchemaProperty(context, "type_ChangeOrder"))){
								String strCOPID = changeOrder.getInfo(context, "physicalid");
								context.setCustomData(_ECM_DepAvoidLicencingCheck,"TRUE");
								MapList mlPidInfo = DomainObject.getInfo(context, (String[]) affectedObjList.toArray(new String[affectedObjList.size()]), new StringList("physicalid"));
								for(int i=0 ; i<mlPidInfo.size() ;i++){									
									String strCAPID =(String) ((Map)mlPidInfo.get(i)).get("physicalid");
									IChangeDependenciesServices services = ChangeDependenciesFactory.getChangeDependenciesServices(); 
									services.createChangeDecompositionLink(context, strCOPID,strCAPID);
								}
							}
							
							// Connects all the CA's to CO which are connect to CR.
							DomainRelationship.connect(context, changeOrder, ChangeConstants.RELATIONSHIP_CHANGE_ACTION, true,(String[]) affectedObjList.toArray(new String[affectedObjList.size()]),true);
							}
			        	}

					}
			}
				
				catch (Exception ex) {
				ex.printStackTrace();
				throw new FrameworkException(ex.getMessage());
			    }
				
				finally {
					context.setCustomData(_ECM_DepAvoidLicencingCheck,"FALSE");
				}
			}

	/**
	 * Display Governing CO names for each CA Object under CR Affected Items Table
	 * @param context
	 * @param args
	 * @return Vector containing list of Quick Actions
	 * @throws Exception
	 * @since R216 ECM
	 */
	@Deprecated
	public Vector showGoverningCOName(Context context, String[] args) throws Exception
	{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
		MapList sConnectedItems = null;
		Vector colist = new Vector();
		try
		{
			String strCAObjID = "";
			StringList busSelects = new StringList();
			busSelects.add(SELECT_NAME);

			DomainObject dmObj = DomainObject.newInstance(context);

			colist = new Vector(objectList.size());
			Iterator objectListItr    = objectList.iterator();
			while( objectListItr.hasNext() )
			{
				Map objectMap = (Map) objectListItr.next();
				strCAObjID = (String)objectMap.get("id");
				if(!UIUtil.isNullOrEmpty(strCAObjID)){
					dmObj.setId(strCAObjID);
					sConnectedItems  = dmObj.getRelatedObjects(context,
							ChangeConstants.RELATIONSHIP_CHANGE_ACTION,
							ChangeConstants.TYPE_CHANGE_ORDER,
						   				 	busSelects,
						   				 	null,
						   				 	true,
						   				 	false,
						   				 	(short)1,
						   				 	EMPTY_STRING,
						   				 	EMPTY_STRING);

				}
				Iterator iter = sConnectedItems.iterator();
				while( iter.hasNext() )
				{
					Map map = (Map) iter.next();
					String strCOName = (String)map.get("name");
					colist.add(strCOName);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}

		return colist;

	}
	
	@Deprecated
	@com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
	public StringList includeCOOIDs(Context context, String args[]) throws Exception
    {
	  HashMap paramMap = (HashMap)JPO.unpackArgs(args);
	  String objectId = (String)paramMap.get("objectId");
	  StringList returnList = new StringList();

	  try
        {
		  ChangeOrder changeOrder = new ChangeOrder(objectId);
		  String crId =  changeOrder.getInfo(context, "to["+ChangeConstants.RELATIONSHIP_CHANGE_ORDER+"].from.id");
		  String isConnected = "False";
		  String whereclause = "(current == \"" + ChangeConstants.STATE_FORMALCHANGE_PREPARE + "\"||current == \"" + ChangeConstants.STATE_FORMALCHANGE_PROPOSE + "\") && ((to[" + ChangeConstants.RELATIONSHIP_CHANGE_ORDER + "].from.id == \"" + crId +"\") || (to[" + ChangeConstants.RELATIONSHIP_CHANGE_ORDER + "]== \"" + isConnected +"\"))";
		  StringList objectSelects = new StringList(SELECT_ID);
		  MapList tempList = findObjects(context,
				  ChangeConstants.TYPE_CHANGE_ORDER,
										 "*",
										 whereclause,
										 objectSelects);

		   returnList = changeUtil.getStringListFromMapList(
							tempList, SELECT_ID);
		} catch(Exception e){
            throw e;
        }
		return returnList;
    }

	/**
	 * Subsidiary method to get Change Orders connected to the Change request
	 * @param context
	 * @param strChangeOrderId
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public MapList getChangeOrders(Context context, String strChangeRequestId)throws Exception
	{
		
		StringList slBusSelects=new StringList(DomainObject.SELECT_ID);
		slBusSelects.add(DomainObject.SELECT_TYPE);
		slBusSelects.add(DomainObject.SELECT_OWNER);
		slBusSelects.add(DomainObject.SELECT_CURRENT);
		slBusSelects.add(DomainObject.SELECT_TYPE);
		StringList slRelSelects = new StringList(SELECT_RELATIONSHIP_ID); 
		com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest objChangeRequest=new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest(strChangeRequestId);
		return objChangeRequest.getChangeOrders(context, slBusSelects, slRelSelects, EMPTY_STRING, EMPTY_STRING, false);
	}

	/**
	 * The Action trigger  method on (Create --> Evaluate) to set current date as the Actual Start Date of Change Request
	 * @param context
	 * @param args (Change Request Id)
	 * @throws Exception
	 */
	@Deprecated
	public void setActualStartDate(Context context, String[] args)throws Exception
	{
		try
		{
			if (args == null || args.length < 1)
			{
				throw (new IllegalArgumentException());
			}
			String strObjId = args[0];
			this.setId(strObjId);
			SimpleDateFormat _mxDateFormat = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
			String strActualStartDate = _mxDateFormat.format(new Date());

			// Setting the Current Date to the Actual Start Date.
			setAttributeValue(context, ATTRIBUTE_ACTUAL_START_DATE, strActualStartDate);
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}

	/**
	 * Action Trigger on (InApproval-- > Approved) to Set the current date as the Actual End Date
	 * @param context
	 * @param args (Change Request Id)
	 * @throws Exception
	 */
	@Deprecated
	public void setActualEndDate(Context context, String[] args)throws Exception
	{
		try
		{
			if (args == null || args.length < 1)
			{
				throw (new IllegalArgumentException());
			}
			String strObjId = args[0];
			this.setId(strObjId);
			SimpleDateFormat _mxDateFormat = new SimpleDateFormat(eMatrixDateFormat.getEMatrixDateFormat(), Locale.US);
			String strActualCompletionDate = _mxDateFormat.format(new Date());
			// Set the Actual Completion Date
			setAttributeValue(context, ATTRIBUTE_ACTUAL_COMPLETION_DATE, strActualCompletionDate);
		}
		catch(Exception Ex)
		{
			Ex.printStackTrace();
			throw Ex;
		}
	}

	/**
     * To hide Estimate date Fields in Edit webform
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds objectId.
     * @return Boolean.
     * @throws Exception If the operation fails.
     * @since ECM R211
     */
   @Deprecated
   public boolean hideEstimateDateFieldInEdit(Context context, String []args) throws Exception
     {
	    boolean hideField = true;
	    try{
	    	HashMap paramMap = (HashMap)JPO.unpackArgs(args);

	    	String mode =(String) paramMap.get("mode");
	    	String sCurrent = "";
	    	String strChangeRequestId =((String)paramMap.get("objectId"));

	    	if(!ChangeUtil.isNullOrEmpty(strChangeRequestId) && mode.equals("edit")){
	    		setId(strChangeRequestId);
	    		sCurrent = getInfo(context, SELECT_CURRENT);
	    		if(!ChangeConstants.STATE_CHANGEREQUEST_CREATE.equals(sCurrent)){
	    			hideField=false;
	    			}
	    		}

			}catch(Exception ex){
			}
			return hideField;
     }


	/**
     * Connects Sketch object from CR
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args    holds ParamMap
     * @throws        Exception if the operation fails
     **/
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void connectToCR(Context context, String[] args) throws Exception {
	    HashMap progMap = (HashMap) JPO.unpackArgs(args);
	    HashMap paramMap = (HashMap) progMap.get("paramMap");
		HashMap requestMap = (HashMap) progMap.get("requestMap");

		String sketchId = (String)paramMap.get("objectId");
		String crId = (String)requestMap.get("parentOID");

	    DomainObject sketchDomObj = DomainObject.newInstance(context, sketchId);

	    HashMap attributeMap = new HashMap(1);
		attributeMap.put(DomainConstants.ATTRIBUTE_TITLE, sketchDomObj.getName(context));

	    ContextUtil.pushContext(context);

	    sketchDomObj.setAttributeValues(context, attributeMap);

	    if (UIUtil.isNotNullAndNotEmpty(crId)) {
	    	DomainRelationship.connect(context, new DomainObject(crId),
					DomainConstants.RELATIONSHIP_ECR_SUPPORTING_DOCUMENT,
					sketchDomObj);
	    }

	    ContextUtil.popContext(context);
	}

	// Returns the originator
	@Deprecated
	public String getOriginator(Context context, String[] args) throws Exception {
		String contextUser = Person.getPerson(context).getName();
		return PersonUtil.getFullName(context, contextUser);
	}

	/**
	 * This method is added to check at least one CA have completed Impact Analysis before promoting to "InReview" State.
	 * @author r2y
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds objectId.
	 * @param args
	 *            holds relationship name
	 * @return integer 0 atleast one CA have completed Impact Analysis else 1
	 * @throws Exception if the operation fails.
	 * @since ECM R216
	 */
	@Deprecated
	public int CheckForImpactAnalysis(Context context, String args[]) throws Exception {
		if (args == null || args.length < 1) {
			throw (new IllegalArgumentException());
		}

		try {
			String objectId = args[0];
			String relationshipChangeAction 		  = PropertyUtil.getSchemaProperty(context,args[1]);
			String relationshipImpactAnalysis   = PropertyUtil.getSchemaProperty(context,args[2]);
			String resourceKey = args[3];
			String propertyKey = args[4];

			setId(objectId);
            String TYPE_CHANGE_ACTION = PropertyUtil.getSchemaProperty(context,"type_ChangeAction");
			
            //get only Change Action type
			//StringList  changeActionList = getInfoList(context,"from["+relationshipChangeAction+"].to.id");            
       //     StringList  changeActionList = getInfoList(context,"from["+relationshipChangeAction+"].to["+TYPE_CHANGE_ACTION+"].id");
            
        	StringList objSelects = new StringList();
			//objSelects.add(DomainConstants.SELECT_OWNER);
			objSelects.add(DomainObject.SELECT_ID);
			String impactAnalysisSelect   = "from["+relationshipImpactAnalysis+"].to.current";	
			objSelects.add(impactAnalysisSelect);
			
			MapList mapList =  getRelatedObjects(context,				           // matrix context
					ChangeConstants.RELATIONSHIP_CHANGE_ACTION,		   // relationship pattern
					ChangeConstants.TYPE_CHANGE_ACTION,  					   	   // object pattern
					objSelects,                      // object selects
					null,            			       // relationship selects
					false,                              // to direction
					true,                        	   // from direction
					(short) 1,                          // recursion level
					null,                               // object where clause
					null,                               // relationship where clause
					(short) 0);
			

			String Message               = EnoviaResourceBundle.getProperty(context, resourceKey, context.getLocale(),propertyKey);
			
			if(null != mapList  && mapList.size()>0)
			{
				Map objMap;
				for(Iterator mapListItr = mapList.iterator();mapListItr.hasNext(); ) {
					objMap = (Map)mapListItr.next();
					Object objId = objMap.get(impactAnalysisSelect);
					System.out.println("Impact analysis  objId    " +objId);
					if( objId!= null && objId instanceof StringList){
						StringList sl = (StringList)objId;
						
					/*if(null != StrIAState){
						String[] s1 = com.matrixone.jsystem.util.StringUtils.split(StrIAState, "\\a");*/
						for(int i=0;i<sl.size() ;i++){
							String sIAState = sl.get(i);
							if(!changeUtil.isNullOrEmpty(sIAState) && ChangeConstants.STATE_IA_COMPLETE.equalsIgnoreCase(sIAState)) {
								return 0;
							}
						}
					}
					else if( objId!= null  && objId instanceof String)
					{
						String strIAState = (String)objId;
						if(!changeUtil.isNullOrEmpty(strIAState) && ChangeConstants.STATE_IA_COMPLETE.equalsIgnoreCase(strIAState)) {
							return 0;
						}
					}
				}
			}
			//Sends a warning message like at least one CA have completed Impact Analysis before promoting to "InReview" State.
			//${CLASS:emxContextUtilBase}.mqlNotice(context, Message);
			 MqlUtil.mqlCommand(context, "notice $1", Message);
			return 1;

		}catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
	}

	/**
	 * This method is used as access function for Governing CO column in CR affected items page.
	 * @param context
	 * @param args
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean displayGovernedCO(Context context,String []args) throws Exception {
		boolean sReturn          = false;
		HashMap paramMap         = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap       = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId		     = (String)paramMap.get(ChangeConstants.OBJECT_ID);

		return DomainObject.newInstance(context, objectId).isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST) ?
						    new Boolean(true) : new Boolean(false);

	}
	
	@Deprecated
	@com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
	public StringList excludeConnectSupportingDocOIDs(Context context, String args[]) throws Exception
    {
	  StringList returnList = new StringList();

	  try
        {
		  String whereclause = "to["+RELATIONSHIP_ECR_SUPPORTING_DOCUMENT+"]";
		  StringList objectSelects = new StringList(SELECT_ID);
		  MapList tempList = findObjects(context,
										 TYPE_SKETCH+","+TYPE_MARKUP,
										 "*",
										 whereclause,
										 objectSelects);
		   returnList = changeUtil.getStringListFromMapList(
							tempList, SELECT_ID);
		} catch(Exception e){
            throw e;
        }
		return returnList;
    }
	
	/**
	 * @author YOQ
	 * this method performs the cancel process of change - The
	 * Affected CAs,Affected Items, Routes,Reference Documents,Prerequisites Connected to this Particular CO are
	 * Disconnected and finally change promoted to cancel state.
	 *
	 *
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change Process
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R211.
	 */
	
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void cancelChange(Context context, String[] args) throws Exception

	{
	    HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
	    HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = changeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		String cancelReason  = changeUtil.isNullOrEmpty((String)paramMap.get("cancelReason"))? (String)requestMap.get("Reason") : (String)paramMap.get("cancelReason");
		ChangeRequest changeRequest = new ChangeRequest(objectId);
		changeRequest.cancel(context,cancelReason);
	}

	/**
	 * @author YOQ
	 * this method performs the hold process of change.Moves all associated CAs to Cancel state.
	 *
	 *
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change Process
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R211.
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void holdChange(Context context, String[] args)throws Exception {

	    HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
	    HashMap requestMap = (HashMap)paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = changeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		String holdReason  = changeUtil.isNullOrEmpty((String)paramMap.get("holdReason"))? (String)requestMap.get("Reason") : (String)paramMap.get("holdReason");
		ChangeRequest changeRequest = new ChangeRequest(objectId);
		changeRequest.hold(context,holdReason);
	}

	/**
	 * @author R3D
	 * this method performs the Mass hold process of change.Moves all associated CAs to hold state.
	 *
	 *
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change Process
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R211.
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void massHoldChangeRequest(Context context, String[] args)throws Exception {

		HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestValuesMap = (HashMap) programMap.get("requestValuesMap");
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		String strObjectIds    = (String)paramMap.get("objectsToHold");
		String sReason     = (String)paramMap.get("Reason");

		String objectId = "";
		StringTokenizer strIds = new StringTokenizer(strObjectIds,",");
		while(strIds.hasMoreTokens())
		{
			objectId = (String)strIds.nextToken();
			ChangeRequest changeRequest = new ChangeRequest(objectId);
			changeRequest.hold(context,sReason);
		}

	}

	/**
	 * @author R3D
	 * this method performs the Mass Cancel process of change.Moves all associated CAs to hold state.
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change Process
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R211.
	 */
	@Deprecated
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void massCancelChangeRequest(Context context, String[] args)throws Exception {

		HashMap programMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestValuesMap = (HashMap) programMap.get("requestValuesMap");
		HashMap paramMap = (HashMap) programMap.get("paramMap");
		String strObjectIds    = (String)paramMap.get("objectsToCancel");
		String sReason     = (String)paramMap.get("Reason");

		String objectId = "";
		StringTokenizer strIds = new StringTokenizer(strObjectIds,",");
		while(strIds.hasMoreTokens())
		{
			objectId = (String)strIds.nextToken();
			ChangeRequest changeRequest = new ChangeRequest(objectId);
			changeRequest.cancel(context,sReason);
		}

	}
	
	/**@author YOQ
	 * Resumes the Hold Changes and sends notification and updates the history
	 * @param context
	 * @throws Exception
	 */
	@Deprecated
	public void resumeChange(Context context,String[] args)throws Exception {

        HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
        HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = changeUtil.isNullOrEmpty((String)paramMap.get(ChangeConstants.OBJECT_ID))? (String)requestMap.get(ChangeConstants.OBJECT_ID) : (String)paramMap.get(ChangeConstants.OBJECT_ID);
		ChangeRequest changeRequest = new ChangeRequest(objectId);
		changeRequest.resume(context);
	}

	
    /**
     * Get All the Change Order connected to the CR object
     * @param context
     * @param args
     * @return MapList
     * @throws Exception
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getChangeOrders (Context context, String[] args) throws Exception 
    {
    		//unpacking the Arguments from variable args
    		HashMap programMap = (HashMap)JPO.unpackArgs(args);
    		//getting  object Id from args
    		String strObjectId = (String)programMap.get("objectId");
    		return  getChangeOrders(context,strObjectId);
    }
    /**
     * Get  a list of related Change Actions, which are not governed by any Change Order, from context Change Request
     * @param context
     * @param args
     * @return MapList
     * @throws Exception
     */
	@Deprecated
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getChangeActionsNotGovernedByCO (Context context, String[] args) throws Exception 
    {
    		//unpacking the Arguments from variable args
    		HashMap programMap = (HashMap)JPO.unpackArgs(args);
    		MapList result= new MapList();
    		//getting parent object Id from args
    		String strParentId = (String)programMap.get("objectId");
    		StringList slBusSelects=new StringList(DomainObject.SELECT_ID);
    		StringList slRelSelects=new StringList(DomainConstants.SELECT_RELATIONSHIP_ID);
    		String strObjWhere="current!="+ChangeConstants.STATE_CHANGE_ACTION_CANCEL;
    		com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest changerequest=new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest(strParentId);	
    		result=changerequest.getChangeActionsNotGovernedByCO(context, slBusSelects, slRelSelects, strObjWhere, EMPTY_STRING);
    	    return result;
    }
	
	/**
	 * This method is used as access function for Change Decomposition editable field.
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
    public boolean isChangeDecompositionEditable(Context context,String []args) throws Exception {	
    	
    	return ChangeUtil.hasLicenseOfECM(context);
    }
	/**
	 * This method is used as access function for Change Decomposition non editable field.
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
	@Deprecated
	public boolean isChangeDecompositionNonEditable(Context context,String []args) throws Exception {
		return !isChangeDecompositionEditable(context, args);
		
	}

	/**
	 * Checks if Change Request has any Change Action that is not governed by some Change Order.
	 * If yes, it will block the promotion of Change Request to Complete state. 
	 *  
	 * @param context - ENOVIA <code>Context</code> object
	 * @param args the arguments passed into the method:
	 * 	[0]: Change Request object id
	 * @return int the value 0 is a succeed, else is a failure  
	 * @throws Exception
	 */
	@Deprecated
	public int checkForCANotGovernedByCO(Context context, String [] args) throws Exception{
		int iRetCode = 0;		
		com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest crObj = new com.dassault_systemes.enovia.enterprisechange.modeler.ChangeRequest(args[0]);
		StringBuffer sbBuffer = new StringBuffer();
		sbBuffer.append(DomainConstants.SELECT_CURRENT);
        sbBuffer.append("!=" );
        sbBuffer.append("'");
        sbBuffer.append(ChangeConstants.STATE_CHANGE_ACTION_CANCEL);
        sbBuffer.append("'");
        String strWhere = sbBuffer.toString();
		MapList mlCAs = crObj.getChangeActionsNotGovernedByCO(context, null, null, strWhere, null);
		boolean bValue = (mlCAs != null && mlCAs.size() > 0)? true : false;
		if(bValue){
			iRetCode = 1;
			String sError  =  EnoviaResourceBundle.getProperty(context ,
										"emxEnterpriseChangeMgtStringResource",
										context.getLocale(),
										"EnterpriseChangeMgt.Error.CR.CANotGovernedByCO");
			//${CLASS:emxContextUtil}.mqlNotice(context, sError);
			 MqlUtil.mqlCommand(context, "error  $1", sError);
		}
		return iRetCode;
	}
	
	@Deprecated
	public static boolean isCFFInstalled(Context context) {
	   	 return (FrameworkUtil.isSuiteRegistered(context, "appVersionEffectivityFramework", false, null, null));
	    }

}// end of class

