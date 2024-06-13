import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Vector;

import com.dassault_systemes.enovia.changeaction.factory.ChangeActionFactory;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeAction;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeActionServices;
import com.dassault_systemes.enovia.changeorder.factory.ChangeOrderFactory;
import com.dassault_systemes.enovia.changeorder.interfaces.IChangeOrder;
import com.dassault_systemes.enovia.changeorder.interfaces.IChangeOrderServices;
import com.dassault_systemes.enovia.e6w.foundation.ServiceBase;
import com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Dataobject;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeCommon;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder;
import com.dassault_systemes.enovia.enterprisechange.modeler.Decision;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeAction;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeManagement;
import com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil;
import com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeUXUtil;
import com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeWidgets;
import com.dassault_systemes.oslc.utils.OslcCommonUtils;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.mxType;
import com.matrixone.apps.framework.ui.UICache;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.SelectConstants;
import matrix.util.StringList;

public class enoECMChangeUXBase_mxJPO extends emxDomainObject_mxJPO {
	/**
	 * 
	 */
	private ChangeUtil changeUtil       =  null;
	private static final long serialVersionUID = 1L;
	public static final String SUITE_KEY = "EnterpriseChangeMgt";
    public static final String OBJECT_LIST = "objectList";
	//private ChangeOrderUI changeOrderUI =  null;
	private com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeCommon changeCommonApp = null;
	private com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeOrder changeOrderApp = null;

	public enoECMChangeUXBase_mxJPO(Context context, String[] args)throws Exception {
		super(context, args);
		changeUtil    = new ChangeUtil();
		//changeOrderUI = new ChangeOrderUI();
		changeCommonApp = new com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeCommon();
		changeOrderApp = new com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeOrder();
	}
	/**
	 * Method to get HTML For Change Control Value
	 * @param Context context
	 * @param args holds information about object.
	 * @return Change Control Value
	 * @throws Exception if operation fails.
	 * @since R420.HF1 ECM
	 */
	public Vector<String> getHTMLForChangeControlValue(Context context,String[] args) throws Exception{

		//XSSOK
		Vector<String> columnVals = new Vector<String>();
		List<String> iPidObjectList = new ArrayList<String>(); 
		String changeControlHTML = EMPTY_STRING;
		
		try {
			String strLanguage  	   =  context.getSession().getLanguage();
			String changeControlDisabled = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Label.Disabled",strLanguage);
			String changeControlEnabledAny = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Label.EnabledAnyChange",strLanguage);
			String strCADisplayPreference = EnoviaResourceBundle.getProperty(context, "EnterpriseChangeMgt", Locale.US, "EnterpriseChangeMgt.ChangeControl.CADisplayPreference");
			
			HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);
			
			Map paramMap = (Map) programMap.get("paramList");
			StringList objectSelects = new StringList(ChangeConstants.SELECT_PHYSICAL_ID);
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil = new ChangeUtil();
			String exportFormat = null;
			boolean exportToExcel = false;
			if(paramMap!=null){
				exportFormat = (String) paramMap.get("reportFormat");
				
				exportToExcel = ("CSV".equals(exportFormat));
			}

			Map map;
		   	int size = objectList.size();
		   	String[] objectIdArray = new String[size];
		   	
		   	for (int i = 0; i < size; i++) {
		   		map = (Map) objectList.get(i);
		   		objectIdArray[i] = (String)map.get(DomainObject.SELECT_ID);
		   	}

			if (objectList == null || objectList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector<String>(size);
			}

			// get the physical id from object id
			MapList objMapList =  DomainObject.getInfo( context,objectIdArray, objectSelects) ;
			for(int index=0; index<objMapList.size();index++) {
				Map<?, ?> objMap = (Map<?, ?>) objMapList.get(index);
				String physicalId = (String) objMap.get(ChangeConstants.SELECT_PHYSICAL_ID);
				iPidObjectList.add(physicalId);
			}
			//Calling modeler API to get Change control flag
			IChangeActionServices iChangeActionServices = ChangeActionFactory.CreateChangeActionFactory();
						
			Map<String, String> mapChangeControlObject = iChangeActionServices.getChangeControlFromPidList(context,iPidObjectList);
								    
			for(int index=0;index<iPidObjectList.size();index++){

				String changeControl = EMPTY_STRING;
				String physicalId = iPidObjectList.get(index);
				if(mapChangeControlObject.containsKey(physicalId)) {
					changeControl =	(String) mapChangeControlObject.get(physicalId);
					if(!ChangeUtil.isNullOrEmpty(changeControl)){
						changeControlHTML = makeHTMLForChangeControl(context, changeControl,exportToExcel, changeControlDisabled, changeControlEnabledAny, strCADisplayPreference);
					}else{
						changeControlHTML = EMPTY_STRING;
					}
				}
				columnVals.add(changeControlHTML);
			}
		      
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e);
		}

	}
	/**
	 * Method to get HTML For Change Control Value on Properties page.
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 * @since R420.HF1 ECM
	 */
	public String getHTMLForChangeControlValueOnForm(Context context, String[] args) throws Exception
	{
		String changeControlHTML = EMPTY_STRING;
		try {
			String strLanguage  	   =  context.getSession().getLanguage();
			String changeControlDisabled = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Label.Disabled",strLanguage);
			String changeControlEnabledAny = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Label.EnabledAnyChange",strLanguage);
			String strCADisplayPreference = EnoviaResourceBundle.getProperty(context, "EnterpriseChangeMgt", Locale.US, "EnterpriseChangeMgt.ChangeControl.CADisplayPreference");
			
			HashMap<?, ?> paramMap     = (HashMap<?, ?>) JPO.unpackArgs(args);
			HashMap<?, ?> requestMap   = (HashMap<?, ?>) paramMap.get(ChangeConstants.REQUEST_MAP);
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

			DomainObject domObj = new DomainObject(objectId);
			String strPhysicalId = domObj.getInfo(context, ChangeConstants.SELECT_PHYSICAL_ID);
			List<String> iPidObjectList = new ArrayList<String>(); 
			iPidObjectList.add(strPhysicalId);
			//Calling modeler API to get Change control flag
			IChangeActionServices iChangeActionServices = ChangeActionFactory.CreateChangeActionFactory();
			Map<String, String> mapChangeControlObject = iChangeActionServices.getChangeControlFromPidList(context,iPidObjectList);
			for(int index=0;index<mapChangeControlObject.size();index++){

				String changeControl = EMPTY_STRING;
				String physicalId = iPidObjectList.get(index);
				if(mapChangeControlObject.containsKey(physicalId)) {
					changeControl =	(String) mapChangeControlObject.get(physicalId);
					if(!ChangeUtil.isNullOrEmpty(changeControl)){
						changeControlHTML = makeHTMLForChangeControl(context, changeControl,exportToExcel, changeControlDisabled, changeControlEnabledAny, strCADisplayPreference);
					}else{
						changeControlHTML = EMPTY_STRING;
					}
				}
			}
		}

		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex);
		}
		return changeControlHTML;
	}
	/**
	 * Method to make HTML For Change Control Value .
	 * Sending constant strings from parent method for performance reason
	 * @param context
	 * @param ChangeControl
	 * @param exportToExcel
	 * @return String
	 * @throws Exception
	 * @since R420.HF1 ECM
	 */
	private String makeHTMLForChangeControl(Context context,String changeControl,boolean exportToExcel, String changeControlDisabled, 
			String changeControlEnabledAny, String strCADisplayPreference) throws Exception{
		String strLanguage  	   =  context.getSession().getLanguage();
		StringBuffer sb    = new StringBuffer(500);
		String strTreeLink			= EMPTY_STRING;
		StringBuffer objectIcon		= new StringBuffer();
		try{
			if(!ChangeUtil.isNullOrEmpty(changeControl)){


			if("None".equalsIgnoreCase(changeControl)){
				changeControl = changeControlDisabled;
				sb.append(changeControl);
			}else if("any".equalsIgnoreCase(changeControl)){
				changeControl = changeControlEnabledAny;
				sb.append(changeControl);
				}else if(new DomainObject(changeControl).exists(context)) {
				StringList slSelectable = new StringList(SELECT_NAME);
				slSelectable.add(ChangeConstants.SELECT_ATTRIBUTE_SYNOPSIS);
				slSelectable.add(SELECT_TYPE);

				String changeName = EMPTY_STRING;
				String changeTitle = EMPTY_STRING;
				String changeType 	 = EMPTY_STRING;
					
					Map<String, String> changeInfo = new DomainObject(changeControl).getInfo(context, slSelectable);
					changeName = changeInfo.get(SELECT_NAME);
					changeTitle = changeInfo.get(ChangeConstants.SELECT_ATTRIBUTE_SYNOPSIS);
					changeType = changeInfo.get(SELECT_TYPE);

					strCADisplayPreference = "Title".equalsIgnoreCase(strCADisplayPreference)?changeTitle:changeName;
					if (exportToExcel) {
						sb.append(strCADisplayPreference);
					}

					else {
				objectIcon.append(UINavigatorUtil.getTypeIconProperty(context, changeType));
					strTreeLink = "<a class=\"object\" href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, changeControl) + "', '800', '575','true','content')\"><img border='0' src='../common/images/"+XSSUtil.encodeForHTMLAttribute(context, objectIcon.toString())+"'/>"+XSSUtil.encodeForHTML(context, strCADisplayPreference)+"</a>";
				sb.append(strTreeLink);
				objectIcon.setLength(0);
					}

			}
			}else{
				sb.append(EMPTY_STRING);
			}
		}catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex);
		}
		return sb.toString();

	}
    /** This is Access program  for Set Change control command. Here we are invoking Application specific JPO and Modeler API.
    * JPO we have provided so that application can put addiction access check on this command.
    * Applications team will pass two URL parameters in the URL which has menu that has ECM 
    * commands or call ECM commands directly. The name of the URL parameters would be :
    * ECMChangeControlAppAccessJPO and ECMChangeControlAppAccessMethod
    * we have added FromSetChangeControl in args so that application program need to identify for which action it is invoked
    * @param context
    * @param args holds information about object.
    * @return true if  set change control command is available 
    * @throws Exception
	* @since R420.HF1 ECM
    */

	public boolean isSetChanageControlAvailable(Context context, String[] args) throws Exception{
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strChangeControlAppAccessMethod = (String)programMap.get("ECMChangeControlAppAccessMethod");
		String strChangeControlAppAccessJPO    = (String)programMap.get("ECMChangeControlAppAccessJPO");
		boolean isSetChanageControlAvailable   = false;
		boolean isChangeControlAppAccess       = true; 
		
		if(!ChangeUtil.isNullOrEmpty(strChangeControlAppAccessJPO) && !ChangeUtil.isNullOrEmpty(strChangeControlAppAccessMethod)){
			isChangeControlAppAccess = false;
			programMap.put("FromSetChangeControl",true);
			try{
				isChangeControlAppAccess = JPO.invoke(context,strChangeControlAppAccessJPO,null,strChangeControlAppAccessMethod,JPO.packArgs(programMap),Boolean.class);
			}catch (Exception e) {
				isChangeControlAppAccess =false;
			}
		}
		if(isChangeControlAppAccess){
			String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
			if(!ChangeUtil.isNullOrEmpty(strObjId)){
				String pid = new DomainObject(strObjId).getInfo(context, ChangeConstants.SELECT_PHYSICAL_ID);
				IChangeActionServices iChangeActionServices = ChangeActionFactory.CreateChangeActionFactory();
				int canObjectBeUnsetAsChangeControl = iChangeActionServices.canObjectBeSetAsChangeControl(context,pid);
				if(canObjectBeUnsetAsChangeControl==0)
					isSetChanageControlAvailable = true;
			}
		}
		return isSetChanageControlAvailable;
	}
	/**This is Access program  for Unset Change control command. Here we are invoking Application specific JPO and Modeler API.
    * JPO we have provided so that application can put addiction access check on this command.
    * Applications team will pass two URL parameters in the URL which has menu that has ECM 
    * commands or call ECM commands directly. The name of the URL parameters would be :
    * ECMChangeControlAppAccessJPO and ECMChangeControlAppAccessMethod
    * we have added FromSetChangeControl in args so that application program need to identify for which action it is invoked
	* @param context
	* @param args holds information about object.
	* @return true if  Unset change control command is available 
	* @throws Exception
	* @since R420.HF1 ECM
	*/
	public boolean isUnsetChanageControlAvailable(Context context, String[] args) throws Exception{
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		String strChangeControlAppAccessMethod = (String)programMap.get("ECMChangeControlAppAccessMethod");
		String strChangeControlAppAccessJPO    = (String)programMap.get("ECMChangeControlAppAccessJPO");
		boolean isUnsetChanageControlAvailable = false;
		boolean isChangeControlAppAccess       = true; 
		
		if(!ChangeUtil.isNullOrEmpty(strChangeControlAppAccessJPO) && !ChangeUtil.isNullOrEmpty(strChangeControlAppAccessMethod)){
			isChangeControlAppAccess = false;
			programMap.put("FromSetChangeControl",false);
			try{
				isChangeControlAppAccess = JPO.invoke(context,strChangeControlAppAccessJPO,null,strChangeControlAppAccessMethod,JPO.packArgs(programMap),Boolean.class);
			}catch (Exception e) {
				isChangeControlAppAccess =false;
			}
		}
		if(isChangeControlAppAccess){
			String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
			if(!ChangeUtil.isNullOrEmpty(strObjId)){
				String pid = new DomainObject(strObjId).getInfo(context, ChangeConstants.SELECT_PHYSICAL_ID);
				IChangeActionServices iChangeActionServices = ChangeActionFactory.CreateChangeActionFactory();
				int canObjectBeUnsetAsChangeControl = iChangeActionServices.canObjectBeUnsetAsChangeControl(context,pid);
				if(canObjectBeUnsetAsChangeControl==0)
					isUnsetChanageControlAvailable = true;
			}
		}
		
		return isUnsetChanageControlAvailable;
	}
    /**
    * @param context
    * @param args holds information about object.
    * @return true if  collaborate command is available 
    * @throws Exception
	* @since R419.HF6 ECM
    */

	public boolean isCollaborateAvailable(Context context, String[] args) throws Exception{
		//unpacking the Arguments from variable args
		HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);
		boolean isCollaborateAvailable = false;
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		if(!ChangeUtil.isNullOrEmpty(strObjId)){
			isCollaborateAvailable = ChangeAction.getAccess(context, "Synchronization", strObjId);
			
		}
		
		return isCollaborateAvailable;
	}
    
    /**	Return a list of Change Actions for the Proposed Item. Used by Indexer.
    * @param context
    * @param String [] ObjectId
    * @return String of Proposed Change Actions for an Object
    * @throws Exception
    */

	public String getProposedCAsForObject(Context context, String[] args) throws Exception{

		String ObjectId   = args[0];
        
		StringBuffer sbProposedCA = new StringBuffer();
		StringList busSelect =new StringList(DomainObject.SELECT_NAME);
		Map mapChangeObjectsInProposed = ChangeUtil.getChangeObjectsInProposed(context, busSelect, args, 1);
		if(!mapChangeObjectsInProposed.isEmpty()){
			MapList mlProposedCAsForObject = (MapList) mapChangeObjectsInProposed.get(ObjectId);
			if(!mlProposedCAsForObject.isEmpty())
				for(int index=0;index<mlProposedCAsForObject.size();index++){
					Map mapProposedCAsForObject = (Map) mlProposedCAsForObject.get(index);
					String strCAName = (String)mapProposedCAsForObject.get(DomainObject.SELECT_NAME);
					if(!ChangeUtil.isNullOrEmpty(strCAName)){
						if(sbProposedCA.length()==0)
							sbProposedCA.append(strCAName);
						else{
							sbProposedCA.append(SelectConstants.cSelectDelimiter);
							sbProposedCA.append(strCAName);
						}
					}

				}


		}
		return sbProposedCA.toString();
	}
    /**	Return a list of Change Actions for the Realized Item. Used by Indexer.
    * @param context
    * @param String [] ObjectId
    * @return String of Realized Change Actions for an Object
    * @throws Exception
    */
	public String getRealizedCAsForObject(Context context, String[] args) throws Exception{

		String ObjectId   = args[0];

		StringBuffer sbRealizedCA = new StringBuffer();
		StringList busSelect =new StringList(DomainObject.SELECT_NAME);
		Map mapChangeObjectsInRealized = ChangeUtil.getChangeObjectsInRealized(context, busSelect, args, 1);
		if(!mapChangeObjectsInRealized.isEmpty()){
			MapList mlRealizedCAsForObject = (MapList) mapChangeObjectsInRealized.get(ObjectId);
			if(!mlRealizedCAsForObject.isEmpty())
				for(int index=0;index<mlRealizedCAsForObject.size();index++){
					Map mapRealizedCAsForObject = (Map) mlRealizedCAsForObject.get(index);						
					String strCAName = (String)mapRealizedCAsForObject.get(DomainObject.SELECT_NAME);
					if(!ChangeUtil.isNullOrEmpty(strCAName)){
						if(sbRealizedCA.length()==0)
							sbRealizedCA.append(strCAName);
						else{
							sbRealizedCA.append(SelectConstants.cSelectDelimiter);
							sbRealizedCA.append(strCAName);
						}
					}

				}


		}
		return sbRealizedCA.toString();
	}
    /**	Return a list of Change Requests for the Proposed Item. Used by Indexer.
    * @param context
    * @param String [] ObjectId
    * @return String of Proposed Change Requests for an Object
    * @throws Exception
    */
	public String getProposedCRsForObject(Context context, String[] args) throws Exception{

		String ObjectId   = args[0];

		StringBuffer sbProposedCR = new StringBuffer();
		StringList busSelect =new StringList(DomainObject.SELECT_NAME);
		Map mapChangeObjectsInProposed = ChangeUtil.getChangeObjectsInProposed(context, busSelect, args, 3);
		if(!mapChangeObjectsInProposed.isEmpty()){
			MapList mlProposedCAsForObject = (MapList) mapChangeObjectsInProposed.get(ObjectId);
			if(!mlProposedCAsForObject.isEmpty())
				for(int index=0;index<mlProposedCAsForObject.size();index++){
					Map mapProposedCAsForObject = (Map) mlProposedCAsForObject.get(index);						
					String strCRName = (String)mapProposedCAsForObject.get(DomainObject.SELECT_NAME);
					String level = (String)mapProposedCAsForObject.get("level");
					if(!level.equalsIgnoreCase("2"))
						continue;
					if(!ChangeUtil.isNullOrEmpty(strCRName)){
						if(sbProposedCR.length()==0)
							sbProposedCR.append(strCRName);
						else{
							sbProposedCR.append(SelectConstants.cSelectDelimiter);
							sbProposedCR.append(strCRName);
						}
					}

				}


		}
		return sbProposedCR.toString();
	}
    /**	Return a list of Change Requests for the Realized Item. Used by Indexer.
    * @param context
    * @param String [] ObjectId
    * @return String of Realized Change Requests for an Object
    * @throws Exception
    */
	public String getRealizedCRsForObject(Context context, String[] args) throws Exception{

		String ObjectId   = args[0];

		StringBuffer sbRealizedCR = new StringBuffer();
		StringList busSelect =new StringList(DomainObject.SELECT_NAME);
		Map mapChangeObjectsInRealized = ChangeUtil.getChangeObjectsInRealized(context, busSelect, args, 3);
		if(!mapChangeObjectsInRealized.isEmpty()){
			MapList mlRealizedCRsForObject = (MapList) mapChangeObjectsInRealized.get(ObjectId);
			if(!mlRealizedCRsForObject.isEmpty())
				for(int index=0;index<mlRealizedCRsForObject.size();index++){
					Map mapRealizedCRsForObject = (Map) mlRealizedCRsForObject.get(index);						
					String strCRName = (String)mapRealizedCRsForObject.get(DomainObject.SELECT_NAME);
					String level = (String)mapRealizedCRsForObject.get("level");
					if(!level.equalsIgnoreCase("2"))
						continue;
					if(!ChangeUtil.isNullOrEmpty(strCRName)){
						if(sbRealizedCR.length()==0)
							sbRealizedCR.append(strCRName);
						else{
							sbRealizedCR.append(SelectConstants.cSelectDelimiter);
							sbRealizedCR.append(strCRName);
						}
					}

				}
		}
        
		return sbRealizedCR.toString();
	}
        
    /**	Return a list of Change Orders for the Proposed Item. Used by Indexer.
    * @param context
    * @param String [] ObjectId
    * @return String of Proposed Change Orders for an Object
    * @throws Exception
    */
	
	public String getProposedCOsForObject(Context context, String[] args) throws Exception{
		String ObjectId   = args[0];

		StringBuffer sbProposedCO = new StringBuffer();
		StringList busSelect =new StringList(DomainObject.SELECT_NAME);
		Map mapChangeObjectsInProposed = ChangeUtil.getChangeObjectsInProposed(context, busSelect, args, 2);
		if(!mapChangeObjectsInProposed.isEmpty()){
			MapList mlProposedCOsForObject = (MapList) mapChangeObjectsInProposed.get(ObjectId);
			if(!mlProposedCOsForObject.isEmpty())
				for(int index=0;index<mlProposedCOsForObject.size();index++){
					Map mapProposedCOsForObject = (Map) mlProposedCOsForObject.get(index);						
					String strCOName = (String)mapProposedCOsForObject.get(DomainObject.SELECT_NAME);
					String level = (String)mapProposedCOsForObject.get("level");
					if(!level.equalsIgnoreCase("2"))
						continue;
					if(!ChangeUtil.isNullOrEmpty(strCOName)){
						if(sbProposedCO.length()==0)
							sbProposedCO.append(strCOName);
						else{
							sbProposedCO.append(SelectConstants.cSelectDelimiter);
							sbProposedCO.append(strCOName);
						}
					}

				}


		}
		return sbProposedCO.toString();
	}

    /**
    /**	Return a list of Change Orders for the Realized Item. Used by Indexer.
    * @param String [] ObjectId
    * @return String of Realized Change Orders for an Object
    * @throws Exception
    */

	public String getRealizedCOsForObject(Context context, String[] args) throws Exception{

		String ObjectId   = args[0];

		StringBuffer sbRealizedCO = new StringBuffer();
		StringList busSelect =new StringList(DomainObject.SELECT_NAME);
		Map mapChangeObjectsInRealized = ChangeUtil.getChangeObjectsInRealized(context, busSelect, args, 2);
		if(!mapChangeObjectsInRealized.isEmpty()){
			MapList mlRealizedCOsForObject = (MapList) mapChangeObjectsInRealized.get(ObjectId);
			if(!mlRealizedCOsForObject.isEmpty())
				for(int index=0;index<mlRealizedCOsForObject.size();index++){
					Map mapRealizedCOsForObject = (Map) mlRealizedCOsForObject.get(index);						
					String strCOName = (String)mapRealizedCOsForObject.get(DomainObject.SELECT_NAME);
					String level = (String)mapRealizedCOsForObject.get("level");
					if(!level.equalsIgnoreCase("2"))
						continue;
					if(!ChangeUtil.isNullOrEmpty(strCOName)){
						if(sbRealizedCO.length()==0)
							sbRealizedCO.append(strCOName);
						else{
							sbRealizedCO.append(SelectConstants.cSelectDelimiter);
							sbRealizedCO.append(strCOName);
						}
					}

				}
		}
		return sbRealizedCO.toString();
   }

    /**	Return a list of Contexts (Models) for the Change Actions for the Proposed Item. Used by Indexer.
    * @param context
    * @param String [] ObjectId
    * @return String of Contexts for Proposed CA
    * @throws Exception
    */

	public String getContextCAsForObject(Context context, String[] args) throws Exception{
		StringBuffer sbCAContexts = new StringBuffer();
		return sbCAContexts.toString();
   }

public boolean isEditCOAvailable(Context context,String []args) throws Exception {
		HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		ChangeCommon changeObj = new ChangeCommon(strObjId);
		boolean isAccessible = false;
		
		try{
			DomainObject dom = new DomainObject(strObjId);
			isAccessible = dom.getAccessMask(context).hasModifyAccess() && dom.getAccessMask(context).hasFromConnectAccess();
			
			if(changeObj != null)
				isAccessible = isAccessible & !changeObj.isOnHold(context);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		
		return isAccessible;
	 }

	
	/**
	 * Method to get column value for Applicability column in Decision summary tables
	 * @param Context context
	 * @param args holds information about object.
	 * @return if Applicability available Yes/No
	 * @throws Exception if operation fails.
	 * @since R420.HF2 ECM
	 */
	public Vector<String> getApplicabilityColumnValueForDecision(Context context,String[] args) throws Exception{
	
		//XSSOK
		Vector<String> columnVals = new Vector<String>();
		String strNo = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(), "EnterpriseChangeMgt.ApplicabilityAvailable.No");
		String strYes = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(), "EnterpriseChangeMgt.ApplicabilityAvailable.Yes");
		
		try {
			HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);			
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil = new ChangeUtil();
			
			StringList slObjectIdList = changeUtil.getStringListFromMapList(objectList,DomainObject.SELECT_ID);
			
			if (objectList == null || objectList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector<String>(slObjectIdList.size());
			}
			
			String objectId = "";
			for(int index=0;index<slObjectIdList.size();index++) {
				objectId = (String)slObjectIdList.get(index);
				Decision decision = new Decision(objectId);
				
				String applicabilityDisplay = decision.getApplicabilityForDisplay(context);
				
				if(UIUtil.isNotNullAndNotEmpty(applicabilityDisplay)){
					columnVals.add(strYes);
				}
				else{
					columnVals.add(strNo);
				}
			}
			
			return columnVals;
	
		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	
	}
	
	/**
	 * Method to get column value for Applicability Propagation column in Decision -> Applies To tables
	 * @param Context context
	 * @param args holds information about object.
	 * @return Applicability Propagation possible Yes/No
	 * @throws Exception if operation fails.
	 * @since R420.HF2 ECM
	 */
	public Vector<String> getApplicabilityPropagationColumnValue(Context context,String[] args) throws Exception{
	
		//XSSOK
		Vector<String> columnVals = new Vector<String>();
		String strNo = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(), "EnterpriseChangeMgt.ApplicabilityPropagation.No");
		String strYes = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(), "EnterpriseChangeMgt.ApplicabilityPropagation.Yes");
		
		try {
			HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);			
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil = new ChangeUtil();
			
			StringList slObjectIdList = changeUtil.getStringListFromMapList(objectList,DomainObject.SELECT_ID);
			
			if (objectList == null || objectList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector<String>(slObjectIdList.size());
			}
			
			String objectId = "";
			for(int index=0;index<slObjectIdList.size();index++) {
				objectId = (String)slObjectIdList.get(index);
				DomainObject dom = new DomainObject(objectId);
				
				if(dom.isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER) || dom.isKindOf(context, ChangeConstants.TYPE_CHANGE_ACTION)){
					columnVals.add(strYes);
				}
				else{
					columnVals.add(strNo);
				}
			}
			
			return columnVals;
	
		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	
	}
	
    @com.matrixone.apps.framework.ui.PostProcessCallable
    public void updateRouteTemplateForChangeEdit(Context context,String[] args) throws Exception
    {
    	DomainRelationship newRelationship = null;
        Map programMap = (Map) JPO.unpackArgs(args);
        Map requestMap = (Map)programMap.get("requestMap");
        String objectId = (String)requestMap.get("objectId");
		DomainObject domChange = DomainObject.newInstance(context, objectId);
		boolean bIsChangeOrderType = domChange.isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER);
            
        if(requestMap.containsKey("ReviewerListOID")){
        	String selectedReviewRT = (String)requestMap.get("ReviewerListOID");
        	
        	if(!ChangeUtil.isNullOrEmpty(selectedReviewRT)) {
           	 
        		if( (selectedReviewRT.indexOf(",") != -1) || (selectedReviewRT.indexOf("|") != -1)  ){
        			throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.TooManyRouteTemplate"));			 
                }
        		
        		disconnectConnectedRoutes(context, objectId, "Review");
        		
        		newRelationship = DomainRelationship.connect(context, DomainObject.newInstance(context, objectId), RELATIONSHIP_OBJECT_ROUTE, DomainObject.newInstance(context, selectedReviewRT));
        		
        		if (newRelationship != null) {
//                    newRelationship.setAttributeValue(context, ATTRIBUTE_ROUTE_BASE_PURPOSE,
//       				                     newInstance(context, selectedReviewRT).getAttributeValue(context, ATTRIBUTE_ROUTE_BASE_PURPOSE));
                    newRelationship.setAttributeValue(context, ATTRIBUTE_ROUTE_BASE_PURPOSE, "Review");
                    newRelationship.setAttributeValue(context, ATTRIBUTE_ROUTE_BASE_STATE, "state_InReview");
                }
            }            
            else{
            	disconnectConnectedRoutes(context, objectId, "Review");
            }
        }
        
        //Updated this section to use with new modeler api--------------START
        if(!bIsChangeOrderType) { //this code is used in change template case
	        if(requestMap.containsKey("ApprovalListOID")){
	        	String selectedReviewRT = (String)requestMap.get("ApprovalListOID");
	        	
	        	if(!ChangeUtil.isNullOrEmpty(selectedReviewRT)) {
	           	 
	        		if( (selectedReviewRT.indexOf(",") != -1) || (selectedReviewRT.indexOf("|") != -1)  ){
	        			throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.TooManyRouteTemplate"));			 
	                }
	        		
	        		disconnectConnectedRoutes(context, objectId, "Approval");
	        		
	        		newRelationship = DomainRelationship.connect(context, DomainObject.newInstance(context, objectId), RELATIONSHIP_OBJECT_ROUTE, DomainObject.newInstance(context, selectedReviewRT));
	        		
	        		if (newRelationship != null) {
	//                    newRelationship.setAttributeValue(context, ATTRIBUTE_ROUTE_BASE_PURPOSE,
	//       		      newInstance(context, selectedReviewRT).getAttributeValue(context, ATTRIBUTE_ROUTE_BASE_PURPOSE));
	        			newRelationship.setAttributeValue(context, ATTRIBUTE_ROUTE_BASE_PURPOSE, "Approval");
	        			newRelationship.setAttributeValue(context, ATTRIBUTE_ROUTE_BASE_STATE, "state_InApproval");
	                }
	            }            
	            else{
	            	disconnectConnectedRoutes(context, objectId, "Approval");
	            }
	        }
        }else {
    		IChangeOrderServices changeOrderFactory = ChangeOrderFactory.createChangeOrderFactory();
    	    IChangeOrder iChangeOrder = changeOrderFactory.retrieveChangeOrderFromDatabase(context, domChange);	
	        //Disconnecting Old RT
	        //check if Old RT exists
	        if(requestMap.containsKey("ApprovalListfieldValueOID")){
	        	
	        	String oldApprovalRT = (String)requestMap.get("ApprovalListfieldValueOID");
	
	        	//check if new RT is added and is same as old RT
	        	if(requestMap.containsKey("ApprovalListOID") && !ChangeUtil.isNullOrEmpty((String)requestMap.get("ApprovalListOID"))){
	        		String newApprovalRT = (String)requestMap.get("ApprovalListOID");
	        		if(oldApprovalRT == newApprovalRT)
	        			return;
	        	}
	
	        	//if new RT is not added or new RT not same as old RT remove old RT
	        	if(!ChangeUtil.isNullOrEmpty(oldApprovalRT)) {       		
	        		String strOldRouteTemplatePhyId = new DomainObject(oldApprovalRT).getInfo(context, "physicalid");
	        		iChangeOrder.removeApprovalRouteTemplate(context, strOldRouteTemplatePhyId); 
	        	}
	        }
	        //Connecting NEW RT
	        if(requestMap.containsKey("ApprovalListOID")){
	        	String selectedReviewRT = (String)requestMap.get("ApprovalListOID");
	        	if(!ChangeUtil.isNullOrEmpty(selectedReviewRT)) { 
	        		
	        		//Check if multiple RT connected
	        		if( (selectedReviewRT.indexOf(",") != -1) || (selectedReviewRT.indexOf("|") != -1)  ){
	        			throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.TooManyRouteTemplate"));			 
	                }
	        		
	                //getting Route Template Physical ID
		        	String strNewRouteTemplatePhyId = new DomainObject(selectedReviewRT).getInfo(context, "physicalid");
		        	iChangeOrder.addApprovalRouteTemplate(context, strNewRouteTemplatePhyId); 
	        	}
	        }
       }
      //Updated this section to use with new modeler api--------------END
        
    }
    
    public void disconnectConnectedRoutes(Context context, String changeObjectId, String RouteBasePurpose) throws Exception {
    	
    	Map dataMap = null;
    	String routeTemplateRelID = null;
    	
    	String relPattern =  new StringBuffer(ChangeConstants.RELATIONSHIP_OBJECT_ROUTE).toString();
		String typePattern =  new StringBuffer(ChangeConstants.TYPE_ROUTE_TEMPLATE).toString();
		
		StringList objectSelects = new StringList(DomainConstants.SELECT_ID);
		
		String strWherePattern = "attribute["+ATTRIBUTE_ROUTE_BASE_PURPOSE+"].value=="+ RouteBasePurpose;
		
		DomainObject changeObject = new DomainObject(changeObjectId);
        
		MapList mapList = changeObject.getRelatedObjects(context,
				relPattern,
				typePattern,
				objectSelects,
				new StringList(DomainRelationship.SELECT_ID),
				false,
				true,
				(short) 1,
				DomainConstants.EMPTY_STRING,
				strWherePattern, (short) 0);
		
		if(mapList!=null && !mapList.isEmpty() && mapList.size() > 0){

			Iterator iterator=mapList.iterator();
			while(iterator.hasNext()){
				dataMap = (Map)iterator.next();		
				
				routeTemplateRelID = (String)dataMap.get(DomainRelationship.SELECT_ID);
				DomainRelationship.disconnect(context, routeTemplateRelID);				
			}
		}
    }
	 
	 /**
	  * To check if Depenency category to be loaded for Change Action and Change Order
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if activated, false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	  public String getExpressionValue(Context context, String expressionKey) throws Exception{
		 String strNamePattern = "CHG*";
		 Dataobject dataObject =  com.dassault_systemes.enovia.e6wv2.foundation.db.MqlUtil.findExpressions(context, strNamePattern);
		 System.out.println("dataObject::" + dataObject);
		 if(dataObject == null) return null;
		 System.out.println(dataObject.getDataelements());
		 com.dassault_systemes.enovia.e6wv2.foundation.jaxbext.DataelementMap elementMap =  dataObject.getDataelements();
		 //if(elementMap.isEmpty()) return false;
		 if(null==elementMap || elementMap.isEmpty()) return null;
		 String expressionVal = "";
		 
		 /*
		 if("CHG_DEPENDENCY".equals(expressionKey)){
			expressionVal = (String)elementMap.get("CHG_DEPENDENCY");
			System.out.println("CHG_DEPENDENCY Value::" + expressionVal);	
		 }
		 if("CHG_DEPENDENCY_LEGACY".equals(expressionKey)){
			expressionVal = (String)elementMap.get("CHG_DEPENDENCY_LEGACY");
			System.out.println("CHG_DEPENDENCY_LEGACY Value::" + expressionVal);	
		 }
		 */
		 
		 expressionVal = (String)elementMap.get(expressionKey);
		 System.out.println("Expression for Change found: "+ expressionKey + " --> " + expressionVal);
		 
		 return expressionVal;
	  }
	 
	 /**
	  * To check if Depenency category to be loaded for Change Action and Change Order
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if activated, false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	 
	 public boolean isDependencyActivated(Context context,String []args) throws Exception {
		 boolean bNewDependencyActivated = true;
		 
		 /*String expressionKey = "CHG_DEPENDENCY";
		 String expressionVal = getExpressionValue(context, expressionKey);		 
		 boolean bIsNewDepSet = ChangeUtil.isNullOrEmpty(expressionVal);
		 
		 if((bIsNewDepSet) || (! "true".equalsIgnoreCase(expressionVal))) bNewDependencyActivated = false;
		 
		 System.out.println("CHG_DEPENDENCY Boolean Value::" + bNewDependencyActivated);	*/
		 
		 return bNewDependencyActivated; 
	 }
	 /**
	  * To check if Depenency category to be loaded for Change Action and Change Order
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if activated, false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	 
	 public boolean isOldDependencyActivated(Context context,String []args) throws Exception {
		
		 boolean bOldDependencyActivated = true;
		 
		 boolean bIsNewDepSet = isDependencyActivated(context, args);
		 
		 String expressionKey = "CHG_DEPENDENCY_LEGACY";
		 String legacyDepExpressionVal = getExpressionValue(context, expressionKey);
		 boolean bIsLegacyDepSet = ChangeUtil.isNullOrEmpty(legacyDepExpressionVal);
		 
		 if(bIsNewDepSet && (bIsLegacyDepSet || (!"true".equalsIgnoreCase(legacyDepExpressionVal)))) bOldDependencyActivated = false;
		 
		 System.out.println("CHG_DEPENDENCY_LEGACY Boolean Value::" + bOldDependencyActivated);	
		 		 
		 return bOldDependencyActivated;
	 }
	 /**
	  * To check if Authoring commands in Change Order Dependency to be loaded
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if activated, false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	 
	 public boolean isCODependencyAuthoringActivated(Context context,String []args) throws Exception {
		
		 boolean bCODependencyAuthoringActivated = true;
		 
		 boolean bIsNewDepSet = isDependencyActivated(context, args);
		 boolean bIsOldDepSet = isOldDependencyActivated(context, args);
		 
		 if(bIsNewDepSet && bIsOldDepSet)bCODependencyAuthoringActivated = false; 
		 
		 System.out.println("CHG_DEPENDENCY_AUTHORING Boolean Value::" + bCODependencyAuthoringActivated);	
		 		 
		 return bCODependencyAuthoringActivated;
	 }
	 

	 /**
	  * To check if OSLC commands in Change Action category of CO/CR will available or not
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if available  false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	 
	 public boolean isOSLCCommandCommandAccessible(Context context,String []args) throws Exception {
		 
		 Map programMap = (Map) JPO.unpackArgs(args);
	     String objectId = (String)programMap.get("objectId");
	     boolean bIsOslcConfigured = false;
		 boolean bisOSLCCommandCommandAccessible = false;		 
		 bIsOslcConfigured = OslcCommonUtils.isOSLCEnabled();
		 boolean bIsContextUserhasAccess = false;
		 ChangeCommon changeObj = new ChangeCommon(objectId);
	     DomainObject domObj = new DomainObject(objectId);
	     if(domObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER)){
	    	 ChangeOrder co = new ChangeOrder(objectId);
	    	 bIsContextUserhasAccess = co.isAllowedToAddProposedChange(context, args);
	     }
	     else if(domObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST)){
	    	 StringList slSelectable = new StringList(SELECT_OWNER);
		     slSelectable.add(SELECT_CURRENT);
		     Map mDomInfo = domObj.getInfo(context, slSelectable);
	    	 String strCurrent = (String)mDomInfo.get(SELECT_CURRENT);
	    	 String strOwner = (String)mDomInfo.get(SELECT_OWNER);
	    	 String strContextUser = context.getUser();
	    	 if((ChangeConstants.STATE_CHANGEREQUEST_CREATE.equalsIgnoreCase(strCurrent)
	    					||ChangeConstants.STATE_CHANGEREQUEST_EVALUATE.equalsIgnoreCase(strCurrent))){
	    		 bIsContextUserhasAccess = true;	 
	    	 }
	    	 
	    	 if(changeObj != null)
	    		 bIsContextUserhasAccess = bIsContextUserhasAccess && !changeObj.isOnHold(context);
	     }
	     if(bIsOslcConfigured && bIsContextUserhasAccess)
	    	 bisOSLCCommandCommandAccessible = true;
		 		 
		 return bisOSLCCommandCommandAccessible;
	 }
	 
	//#############################START OF ECM WIDGETS#############################	 
	 
	/**
	 * Method to get Change Requests/Change Orders objects for widgets
	 * @param context
	 * @param args
	 * @return MapList
	 * @throws Exception
	 */		 
    public MapList getMyChangesForWidget(Context context, String[] args) throws Exception {
    	try {
		        Map<String, Object> programMap = (Map<String, Object>) JPO.unpackArgs(args);
		        Map jpoArgs = (Map) programMap.get(ServiceBase.JPO_ARGS);
		        String selectedTypes    = (String) jpoArgs.get(ChangeConstants.TYPE);
		        String widgetName  	    = (String) jpoArgs.get("widgetName");
		        ChangeWidgets changeWidgets = new ChangeWidgets();
		        if("CRCOs".equalsIgnoreCase(widgetName))
		        	return changeWidgets.getMyChangeRequestsAndChangeOrdersForWidget(context, selectedTypes);
    	}
    	catch (Exception widgetException) {
    			System.out.println("Exception occurred in enoECMChangeUtil : getMyChangesForWidget");
    			widgetException.printStackTrace();
    	}
        return new MapList();	
    }
    
    /**
	 * Returns the Badge status COs/CRs
	 * @param context
	 * @param args
	 * @throws Exception
	 */
    public void getBadgeStatusForWidgets(Context context, String[] args) throws Exception {
    	try {
	        Map<String, Object> map = (Map<String, Object>) JPO.unpackArgs(args);
	        MapList ml 				= (MapList) map.get("JPO_WIDGET_DATA");
	        String fieldKey 		= (String) map.get("JPO_WIDGET_FIELD_KEY");
	    	new ChangeWidgets().getBadgeStatusForWidgets(context, fieldKey, ml);
    	}catch (Exception badge) {
    		System.out.println("Exception occurred in getBadgeStatusForWidgets");
    		badge.printStackTrace();
    	}
    }
    
    /**
	 * Returns the Progress status of CO/CRs
	 * @param context
	 * @param args
	 * @throws Exception
	 */
    public void getProgressStatusForWidgets(Context context, String[] args) throws Exception {
    	try {
		    Map programMap     = (Map) JPO.unpackArgs(args);
		    String fieldKey    = (String) programMap.get(ServiceBase.JPO_WIDGET_FIELD_KEY);
		    MapList objectList = (MapList) programMap.get(ServiceBase.JPO_WIDGET_DATA);		    
		    new ChangeWidgets().getProgressStatus(context,fieldKey,objectList);
    	}
    	catch (Exception progress) {
    		System.out.println("Exception occurred in getProgressStatusForWidgets");
    		progress.printStackTrace();
    	}
    }
    
    /**
	 * Returns the label of Change Actions
	 * @param context
	 * @param args
	 * @throws Exception
	 */
    public void getChangeActionsCountAndLabel(Context context, String[] args) throws Exception {

    	try {
    	    Map programMap     = (Map) JPO.unpackArgs(args);
    	    String fieldKey    = (String) programMap.get(ServiceBase.JPO_WIDGET_FIELD_KEY);
    	    MapList objectList = (MapList) programMap.get(ServiceBase.JPO_WIDGET_DATA); 
		    Map<String, String> widgetArgs = (Map<String, String>) programMap.get(ServiceBase.JPO_WIDGET_ARGS);
		    String baseURI      =	widgetArgs.get(ServiceBase.ARG_BASE_URI);
    	    Map typeCategoryMap = new HashMap();
    	    typeCategoryMap.put(ChangeConstants.TYPE_CHANGE_ORDER, "ECMCRCOAffectedChangeActions");
    	    typeCategoryMap.put(ChangeConstants.TYPE_CHANGE_REQUEST, "ECMCRCOAffectedChangeActions");
    	    new ChangeWidgets().getHTMLForCountAndLabel(context, fieldKey, objectList,
    	    											"EnterpriseChangeMgt.Widget.ChangeActionsLabel","EnterpriseChangeMgt.Widget.ChangeActionsMouseOverText",baseURI);  
    	}
    	catch (Exception label) {
    		System.out.println("Exception occurred in getChangeActionLabel");
    		label.printStackTrace();
    	}
    }
	 

	 /**
	  * To check if Create Change Action commands in category of CO will available or not
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if available  false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	 
	 public boolean isAllowedToCreateChangeAction(Context context,String []args) throws Exception {
		 
		 Map programMap = (Map) JPO.unpackArgs(args);
	     String objectId = (String)programMap.get("objectId");
		 boolean bIsContextUserhasAccess = false;
		 
	     DomainObject domObj = new DomainObject(objectId);
	     if(domObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER)){
	    	 ChangeOrder co = new ChangeOrder(objectId);
	    	 bIsContextUserhasAccess = co.isAllowedToAddProposedChange(context, args);
	     }		 		 
		 return bIsContextUserhasAccess;
	 }
	 

	 /**
	  * To check if Remove Change Action commands in category of CO/CR will available or not
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if available  false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	 
	 public boolean isAllowedToRemoveChangeAction(Context context,String []args) throws Exception {
		 
		 Map programMap = (Map) JPO.unpackArgs(args);
	     String objectId = (String)programMap.get("objectId");
		 boolean bIsContextUserhasAccess = false;
		 boolean bIsOslcConfigured = false;		 
		 bIsOslcConfigured = OslcCommonUtils.isOSLCEnabled();
		 ChangeCommon changeObj = new ChangeCommon(objectId);
	     DomainObject domObj = new DomainObject(objectId);
	     if(domObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER)){
	    	 ChangeOrder co = new ChangeOrder(objectId);
	    	 bIsContextUserhasAccess = co.isAllowedToAddProposedChange(context, args);
	     }
	     else if(domObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST)){
	    	 StringList slSelectable = new StringList(SELECT_OWNER);
		     slSelectable.add(SELECT_CURRENT);
		     Map<String, String> mDomInfo = domObj.getInfo(context, slSelectable);
	    	 String strCurrent = (String)mDomInfo.get(SELECT_CURRENT);
	    	 if((ChangeConstants.STATE_CHANGEREQUEST_CREATE.equalsIgnoreCase(strCurrent)
	    					||ChangeConstants.STATE_CHANGEREQUEST_EVALUATE.equalsIgnoreCase(strCurrent)) && bIsOslcConfigured){	    		 
	    		 bIsContextUserhasAccess = true;	 
	    	 }
	    	 
	    	 if(changeObj != null)
	    		 bIsContextUserhasAccess = bIsContextUserhasAccess && !changeObj.isOnHold(context);
	     }
		 		 
		 return bIsContextUserhasAccess;
	 }
	 
		/**
		 * Program to get CO Edit Icon in structure browser
		 * Note - This method is replacement for same method in enoECMChangeOrderBase
		 * 
		 * @param context the eMatrix <code>Context</code> object
		 * @param args    holds the following input arguments:
		 *           0 -  Object
		 * @return        a <code>MapList</code> object having the list of Assignees,their relIds and rel names for this Change Object
		 * @throws        Exception if the operation fails
		 * @since         ECM R211
		 **
		 */
		public Vector showEditIconforStructureBrowser(Context context, String args[])throws FrameworkException{
			//XSSOK
			Vector columnVals = null;
			try {
				HashMap programMap = (HashMap) JPO.unpackArgs(args);
				StringList objSelects = new StringList(2);
				objSelects.addElement(SELECT_TYPE);
				objSelects.addElement(SELECT_CURRENT);
				objSelects.addElement(SELECT_ID);
				objSelects.addElement(SELECT_OWNER);
				objSelects.addElement(ChangeConstants.SELECT_TYPE_KINDOF);
	
				String type ="";
				String objectId ="";
				String current = "";
				String owner = "";
				String strTypeKinfOf = EMPTY_STRING;
				String strEditCO= EnoviaResourceBundle.getProperty(context,SUITE_KEY, 
						"EnterpriseChangeMgt.Label.EditCO", context.getSession().getLanguage());
				String strEditCR= EnoviaResourceBundle.getProperty(context,SUITE_KEY, 
						"EnterpriseChangeMgt.Label.EditCR", context.getSession().getLanguage());
				String strEditCA= EnoviaResourceBundle.getProperty(context,SUITE_KEY, 
						"EnterpriseChangeMgt.Label.EditCA", context.getSession().getLanguage());
				Map mapObjectInfo = null;
				StringBuffer sbEditIcon = null;
	
				MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
				StringList sObjectIDList = changeUtil.getStringListFromMapList(objectList, ChangeConstants.ID);
	
				if (objectList == null || objectList.size() == 0)
					return columnVals;
				else
	
					columnVals = new Vector(sObjectIDList.size());
	
				MapList COInfoList = DomainObject.getInfo(context, (String[])sObjectIDList.toArray(new String[sObjectIDList.size()]), objSelects);
	
				if(!COInfoList.isEmpty()){
					Iterator sItr = COInfoList.iterator();
					while(sItr.hasNext()){
						mapObjectInfo = (Map)sItr.next();
						type = (String)mapObjectInfo.get(SELECT_TYPE);
						objectId = (String)mapObjectInfo.get(SELECT_ID);
						current =(String)mapObjectInfo.get(SELECT_CURRENT);
						owner =(String)mapObjectInfo.get(SELECT_OWNER);
						strTypeKinfOf = (String)mapObjectInfo.get(ChangeConstants.SELECT_TYPE_KINDOF);
	
						sbEditIcon = new StringBuffer();
						if (type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_ORDER)||new DomainObject(objectId).isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER)){
							if((ChangeConstants.STATE_FORMALCHANGE_PROPOSE.equalsIgnoreCase(current) || ChangeConstants.STATE_FORMALCHANGE_PREPARE.equalsIgnoreCase(current)  || ChangeConstants.STATE_FORMALCHANGE_HOLD.equalsIgnoreCase(current)) && (context.getUser().equalsIgnoreCase(owner))){
							sbEditIcon.append("<a href=\"JavaScript:emxTableColumnLinkClick('");
							sbEditIcon.append("../common/emxForm.jsp?formHeader=EnterpriseChangeMgt.Heading.EditCO&amp;mode=edit");
							sbEditIcon.append("&amp;HelpMarker=emxhelpecoeditdetails&amp;postProcessJPO=enoECMChangeUX%3AupdateRouteTemplateForChangeEdit&amp;submitAction=refreshCaller&amp;suiteKey=EnterpriseChangeMgt&amp;objectId=");
							sbEditIcon.append(XSSUtil.encodeForHTMLAttribute(context, objectId)); //common code
	
							sbEditIcon.append("&amp;form=type_ChangeOrderSlidein'"); //give CO edit form here.
							sbEditIcon.append(", '700', '600', 'true', 'slidein', '')\">");
							sbEditIcon.append("<img border=\"0\" src=\"../common/images/iconActionEdit.gif\" title=");
							sbEditIcon.append("\""+ XSSUtil.encodeForXML(context, strEditCO)+"\"");
							sbEditIcon.append("/></a>");
							}else{
								sbEditIcon.append("-");
							}
							columnVals.add(sbEditIcon.toString());
	
						}
						if (type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_REQUEST)||new DomainObject(objectId).isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST)){
							if((ChangeConstants.STATE_CHANGEREQUEST_CREATE.equalsIgnoreCase(current) || ChangeConstants.STATE_CHANGEREQUEST_EVALUATE.equalsIgnoreCase(current) || ChangeConstants.STATE_CHANGEREQUEST_HOLD.equalsIgnoreCase(current)) && (context.getUser().equalsIgnoreCase(owner))){
								sbEditIcon.append("<a href=\"JavaScript:emxTableColumnLinkClick('");
								sbEditIcon.append("../common/emxForm.jsp?formHeader=EnterpriseChangeMgt.Heading.EditCR&amp;mode=edit");
								sbEditIcon.append("&amp;HelpMarker=emxhelpeCReditdetails&amp;postProcessJPO=enoECMChangeUX%3AupdateRouteTemplateForChangeEdit&amp;submitAction=refreshCaller&amp;suiteKey=EnterpriseChangeMgt&amp;objectId=");
								sbEditIcon.append(XSSUtil.encodeForHTMLAttribute(context, objectId)); //common code
	
								sbEditIcon.append("&amp;form=type_ChangeRequestSlidein'"); //give CR edit form here.
								sbEditIcon.append(", '700', '600', 'true', 'slidein', '')\">");
								sbEditIcon.append("<img border=\"0\" src=\"../common/images/iconActionEdit.gif\" title=");
								sbEditIcon.append("\""+ XSSUtil.encodeForXML(context, strEditCR)+"\"");
								sbEditIcon.append("/></a>");
							} else{
								sbEditIcon.append("-");
							}
							columnVals.add(sbEditIcon.toString());
	
						}
						if (type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_ACTION)||new DomainObject(objectId).isKindOf(context, ChangeConstants.TYPE_CHANGE_ACTION)){
							if((ChangeConstants.STATE_CHANGE_ACTION_PREPARE.equalsIgnoreCase(current) || ChangeConstants.STATE_CHANGE_ACTION_INWORK.equalsIgnoreCase(current) || ChangeConstants.STATE_CHANGE_ACTION_HOLD.equalsIgnoreCase(current)) && (context.getUser().equalsIgnoreCase(owner))){
								sbEditIcon.append("<a href=\"JavaScript:emxTableColumnLinkClick('");
								sbEditIcon.append("../common/emxForm.jsp?formHeader=EnterpriseChangeMgt.Heading.EditCA&amp;mode=edit");
								sbEditIcon.append("&amp;HelpMarker=emxhelpeCAeditdetails&amp;submitAction=refreshCaller&amp;suiteKey=EnterpriseChangeMgt&amp;objectId=");
								sbEditIcon.append(XSSUtil.encodeForHTMLAttribute(context, objectId)); //common code
								sbEditIcon.append("&amp;form=type_ChangeActionSlidein'"); //give CR edit form here.
								sbEditIcon.append(", '700', '600', 'true', 'slidein', '')\">");
								sbEditIcon.append("<img border=\"0\" src=\"../common/images/iconActionEdit.gif\" title=");
								sbEditIcon.append("\""+ XSSUtil.encodeForXML(context, strEditCA)+"\"");
								sbEditIcon.append("/></a>");
							} else{
							sbEditIcon.append("-");
							}
							columnVals.add(sbEditIcon.toString());
	
						}
	
						if(!type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_ORDER) && !type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_REQUEST) && !type.equalsIgnoreCase(ChangeConstants.TYPE_CHANGE_ACTION) && !strTypeKinfOf.equalsIgnoreCase("Change")) {
							sbEditIcon.append("-");
							columnVals.add(sbEditIcon.toString());
						}
	
					}//end of while
	
				}
	
				return columnVals;
			} catch (Exception e) {
				throw new FrameworkException(e);
			}
		}

	@com.matrixone.apps.framework.ui.ProgramCallable
	public String getStateWithHoldInfoForForm(Context context,String[] args) throws Exception {
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String changeActionId = (String) requestMap.get("objectId");
		String[] objIDArr = new String[]{changeActionId};
		StringList returnStringList = com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeCommon.getStateWithHoldInfo(context, objIDArr);

		return (String)returnStringList.get(0);
	}
	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static StringList getStateWithHoldInfoForTable(Context context,
			String[] args) throws FrameworkException {
		try {
			HashMap inputMap = (HashMap) JPO.unpackArgs(args);
			MapList objectMap = (MapList) inputMap.get("objectList");
			String objID = null;
			String[] objIDArr = new String[objectMap.size()];
	
			for (int i = 0; i < objectMap.size(); i++) {
				Map outerMap = new HashMap();
				outerMap = (Map) objectMap.get(i);
				objID = (String) outerMap.get(ChangeConstants.SELECT_ID);
				objIDArr[i] = objID;
			}
	
			StringList returnStringList = com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeCommon.getStateWithHoldInfo(context, objIDArr);
	
			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}
	
	
    public HashMap getPolicies(Context context,String []args) throws Exception {
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
		String type        = (String)requestMap.get(ChangeConstants.TYPE);
		String functionality = (String)requestMap.get("functionality");
		boolean isCreateChildCOUnderFasttrackCO = false;
		if("CreateNewCOUnderCO".equalsIgnoreCase(functionality)){
			String strObjectId = (String)requestMap.get("objectId");
			if(!ChangeUtil.isNullOrEmpty(strObjectId)){
				String strParentPolicy = new DomainObject(strObjectId).getPolicy(context).getName();
				 isCreateChildCOUnderFasttrackCO = ChangeConstants.POLICY_FASTTRACK_CHANGE.equalsIgnoreCase(strParentPolicy)?true:false;
			}
		}
		boolean  isconnectedtoCR = (UIUtil.isNotNullAndNotEmpty((String)requestMap.get("isconnectedtoCR")));
		return changeOrderApp.getPolicies(context, type, ChangeConstants.CHANGE_POLICY_DEFAULT,(ChangeConstants.FOR_RELEASE.equalsIgnoreCase(functionality)||ChangeConstants.FOR_OBSOLETE.equalsIgnoreCase(functionality) || isconnectedtoCR||isCreateChildCOUnderFasttrackCO));
    }
    
	/**
	 * This method gets ownership history on a Change object for the table to display on change properties page.
	 *
	 * @author
	 * @param context
	 *                the eMatrix <code>Context</code> object
	 * @param args
	 *                holds the following input arguments: 0 - String containing
	 *                Service object id.
	 * @return MapList holds a list of history records.
	 * @throws Exception
	 *                 if the operation fails
	 * @since ECM R211
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getOwnershipHistory (Context context,String []args) throws Exception {
		HashMap programMap  = (HashMap)JPO.unpackArgs(args);
		String  objectId    = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String timeZone     = (String) programMap.get("timeZone");

		changeOrderApp = new com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeOrder(objectId);
		StringList customHistoryList = changeOrderApp.getCustomHistory(context);
		//changeOrderApp = new com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeOrder(objectId);
		return changeOrderApp.getFilteredHistoryBasedOnAction(context,timeZone,customHistoryList,ChangeConstants.OWNERSHIP_HISTORY);

	}
	
	/**
	 * This method gets hold and resume history on a Change object for the table to display on change properties page.
	 * @author
	 * @param context
	 *                the eMatrix <code>Context</code> object
	 * @param args
	 *                holds the following input arguments: 0 - String containing
	 *                Service object id.
	 * @return MapList holds a list of history records.
	 * @throws Exception
	 *                 if the operation fails
	 * @since ECM R211
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getHoldAndResumeHistory (Context context,String []args) throws Exception {
		HashMap programMap  = (HashMap)JPO.unpackArgs(args);
		String  objectId    = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String timeZone     = (String) programMap.get("timeZone");
		MapList historyMapList = new MapList();

		//changeOrderUI = new ChangeOrderUI(objectId);
		changeOrderApp = new com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeOrder(objectId);
		StringList customHistoryList = changeOrderApp.getCustomHistory(context);
		historyMapList = changeOrderApp.getFilteredHistoryBasedOnAction(context,timeZone,customHistoryList,ChangeConstants.HOLD_HISTORY);
		historyMapList.addAll(changeOrderApp.getFilteredHistoryBasedOnAction(context,timeZone,customHistoryList,ChangeConstants.RESUME_HISTORY));

		return historyMapList;
	}
	
	/**
	 * This method gets cancel history on a Change object for the table to display on change properties page.
	 *
	 * @author
	 * @param context
	 *                the eMatrix <code>Context</code> object
	 * @param args
	 *                holds the following input arguments: 0 - String containing
	 *                Service object id.
	 * @return MapList holds a list of history records.
	 * @throws Exception
	 *                 if the operation fails
	 * @since ECM R211
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable 
	public MapList getCancelHistory (Context context,String []args) throws Exception {
		HashMap programMap  = (HashMap)JPO.unpackArgs(args);
		String  objectId    = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String timeZone     = (String) programMap.get("timeZone");

		//changeOrderUI = new ChangeOrderUI(objectId);
		changeOrderApp = new com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeOrder(objectId);
		StringList customHistoryList = changeOrderApp.getCustomHistory(context);
		return changeOrderApp.getFilteredHistoryBasedOnAction(context,timeZone,customHistoryList,ChangeConstants.CANCEL_HISTORY);
	}
	
	/**
	 * Displays Reviewer list members of Route Template in CO Properties page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public String getReviewerListMembers(Context context,String []args) throws Exception {
		//XSSOK
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = (String)requestMap.get(ChangeConstants.OBJECT_ID);

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}
		
		changeCommonApp.setId(objectId);
		return changeCommonApp.getMembersBasedOnPurpose(context,"Review",exportToExcel);
	}
	
	/**
	 * Displays Approver list members of Route Template in CO Properties page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public String getApprovalListMembers(Context context,String []args) throws Exception {
		//XSSOK
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String objectId    = (String)requestMap.get(ChangeConstants.OBJECT_ID);
		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}

		changeCommonApp.setId(objectId);
		return changeCommonApp.getMembersBasedOnPurpose(context,"Approval",exportToExcel);
	}
	
    /**
     * Getting the Child/ Parent from the selected item
     * @param context
     * @param args
     * @return MapList of Child/ Parent
     * @throws Exception
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getChangeAssessmentItems(Context context, String[] args)throws Exception
    {
    	MapList mlOutput = new MapList(10);
    	try
    	{
    		HashMap hmParamMap = (HashMap) JPO.unpackArgs(args);
    		String strRec = "";
			String[] strarr;
			String strRelName = "";
			String strDir = "";
			String strLabel = "";
			Map tempmap;
			String[] arrTableRowIds = new String[1];
			String strTableRowID = (String)hmParamMap.get("emxTableRowId");
			arrTableRowIds[0]=strTableRowID;
			ChangeUXUtil changeUXUtil = new ChangeUXUtil ();
			StringList slObjectIds = changeUXUtil.getAffectedItemsIds(context, arrTableRowIds);
    					
			mlOutput = new ChangeManagement().getChangeAssessment(context, slObjectIds);
    	}
 		catch(Exception Ex)
 		{
 			Ex.printStackTrace();
 			throw Ex;
 		}
 		return mlOutput;
 	}
	
	/**
	 * Show Mass Approval Link in SB Table
	 * @param context
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	public Vector showCAQuickMassApproval(Context context, String[] args) throws Exception
	{
		//XSSOK
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
		String languageStr = context.getSession().getLanguage();
		Vector vecReturn   = null;
		StringBuffer sb    = null;
		try
		{
			StringList changeOrderIDList = changeUtil.getStringListFromMapList(objectList, ChangeConstants.ID);
	
			String transferOwnership = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.TransferOwnershipOfCA");
	
			String approvalTasks     = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.ApprovalTasksOfCA");
	
			String approvalRequired = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.ApprovalStatus");
	
			vecReturn = new Vector(changeOrderIDList.size());
			String strCOId				= "";
			String strTransferOwnership	= "";
			String strApproveTasks		= "";
	
			//ChangeOrderUI changeOrderUI 	= null;
			MapList mlTableData 			= new MapList();
			
			
			// For export to CSV
	    	String exportFormat = null;
	    	boolean exportToExcel = false;
	    	//Set keys = programMap.keySet();
	    	
	    	if(programMap!=null && programMap.containsKey("paramList")){
	    		Map paramMap = (HashMap)programMap.get("paramList");
	    		if(paramMap!=null && paramMap.containsKey("reportFormat"))
	    			exportFormat = (String)paramMap.get("reportFormat");
	    	}
	    	if("CSV".equals(exportFormat)){
	    		exportToExcel = true;
	    	}
			
			Iterator changeOrderItr = changeOrderIDList.iterator();
			while (changeOrderItr.hasNext()) {
				strCOId = changeOrderItr.next().toString();
				//changeOrderUI 	= new ChangeOrderUI(strCOId);
				//String type = changeOrderUI.getInfo(context, SELECT_TYPE);
				DomainObject dObj =  new DomainObject(strCOId);
				if(dObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ACTION)){
					//mlTableData = changeOrderUI.getCurrentAssignedTasksOnObject(context);
					ChangeOrder changeCo = new ChangeOrder(strCOId);
					mlTableData = changeCo.getCurrentAssignedTasksOnObject(context);
	
	
					if(!mlTableData.isEmpty()){
						sb = new StringBuffer(500);
	
						//Multitenant
						//strApproveTasks = "<a href=\"javascript:showModalDialog('../common/emxTableEdit.jsp?program=enoECMChangeOrder:getTasks&amp;table=AEFMyTaskMassApprovalSummary&amp;selection=multiple&amp;header=emxComponents.Common.TaskMassApproval&amp;postProcessURL=../common/emxLifecycleTasksMassApprovalProcess.jsp&amp;HelpMarker=emxhelpmytaskmassapprove&amp;suiteKey=Components&amp;StringResourceFileId=emxComponentsStringResource&amp;SuiteDirectory=component&amp;objectId=" + strCOId + "', '800', '575')\"><img border='0' src='../common/images/iconActionApprove.gif' name='person' id='person' alt='"+approvalTasks+"' title='"+approvalTasks+"'/>"+i18nNow.getI18nString("EnterpriseChangeMgt.Command.AwaitingApproval", ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getSession().getLanguage())+"</a>";
						if(!exportToExcel)
							strApproveTasks = "<a href=\"javascript:showModalDialog('../enterprisechangemgtapp/ECMUtil.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, strCOId) + "&amp;functionality=MassTaskApproval', '400', '400')\">"+EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.Pending")+"</a>";
						else strApproveTasks = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.Pending");
						sb.append(strApproveTasks);
						vecReturn.addElement(sb.toString());
					}
					else{
						vecReturn.addElement("-");
					}
				}
	
	
				if(!dObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ACTION))
				{
					vecReturn.addElement("-");
				}
			}
	
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}
	
		return vecReturn;
	
	}
	
	public Vector showQuickMassApproval(Context context, String[] args) throws Exception
	{
		//XSSOK
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
		String languageStr = context.getSession().getLanguage();
		Vector vecReturn   = null;
		StringBuffer sb    = null;
		try
		{
			StringList changeOrderIDList = changeUtil.getStringListFromMapList(objectList, ChangeConstants.ID);
	
			String transferOwnership =EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.TransferOwnershipOfCA");
	
			String approvalTasks     = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Message.ApprovalTasksOfCA");
	
			String approvalRequired = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Label.ApprovalStatus");
	
			vecReturn = new Vector(changeOrderIDList.size());
			String strCOId				= "";
			String strTransferOwnership	= "";
			String strApproveTasks		= "";
	
			//ChangeOrderUI changeOrderUI 	= null;
			MapList mlTableData 			= new MapList();
	
			// For export to CSV
	    	String exportFormat = null;
	    	boolean exportToExcel = false;
	    	//Set keys = programMap.keySet();
	    	
	    	if(programMap!=null && programMap.containsKey("paramList")){
	    		Map paramMap = (HashMap)programMap.get("paramList");
	    		if(paramMap!=null && paramMap.containsKey("reportFormat"))
	    			exportFormat = (String)paramMap.get("reportFormat");
	    	}
	    	if("CSV".equals(exportFormat)){
	    		exportToExcel = true;
	    	}
			
			Iterator changeOrderItr = changeOrderIDList.iterator();
			while (changeOrderItr.hasNext()) {
				strCOId = changeOrderItr.next().toString();
				//changeOrderUI 	= new ChangeOrderUI(strCOId);
				//String type = changeOrderUI.getInfo(context, SELECT_TYPE);
				DomainObject dObj =  new DomainObject(strCOId);
				if(dObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER) || dObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST) || dObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ACTION)){
					//mlTableData = changeOrderUI.getCurrentAssignedTasksOnObject(context);
					ChangeOrder changeCo = new ChangeOrder(strCOId);
					mlTableData = changeCo.getCurrentAssignedTasksOnObject(context);
	
					if(!mlTableData.isEmpty()){
						sb = new StringBuffer(500);
						if(!exportToExcel)
							strApproveTasks = "<a href=\"javascript:showModalDialog('../enterprisechangemgtapp/ECMUtil.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, strCOId) + "&amp;functionality=MassTaskApproval', '400', '400')\">"+EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.Pending")+"</a>";
						else
							strApproveTasks = EnoviaResourceBundle.getProperty(context, ChangeConstants.RESOURCE_BUNDLE_ENTERPRISE_STR, context.getLocale(),"EnterpriseChangeMgt.Command.Pending");
						sb.append(strApproveTasks);
						vecReturn.addElement(sb.toString());
					}
					else{
						vecReturn.addElement("-");
					}
				}
				
				if(!dObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER) && !dObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST) && !dObj.isKindOf(context, ChangeConstants.TYPE_CHANGE_ACTION))
				{
					vecReturn.addElement("-");
				}
			}
	
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e);
		}
	
		return vecReturn;
	
	}
	
	/**
	 * Program to get Column(Contributor) value For CA Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return        Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 */
	public Vector showContributorColumn(Context context, String args[])throws Exception
	{
		//XSSOK
		Vector columnVals = new Vector();
		try {
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil=new ChangeUtil();
			StringList strObjectIdList = changeUtil.getStringListFromMapList(objectList,DomainObject.SELECT_ID);

			String[] strArrObjIds = new String[strObjectIdList.size()];
			strArrObjIds = (String[])strObjectIdList.toArray(strArrObjIds);

			MapList objectTypeList = DomainObject.getInfo(context, strArrObjIds, new StringList(DomainObject.SELECT_TYPE));
			StringList strObjectTypeList = changeUtil.getStringListFromMapList(objectTypeList,DomainObject.SELECT_TYPE);
			
			
			// For export to CSV
	    	String exportFormat = null;
	    	boolean exportToExcel = false;
	    	//Set keys = programMap.keySet();
	    	
	    	if(programMap!=null && programMap.containsKey("paramList")){
	    		Map paramMap = (HashMap)programMap.get("paramList");
	    		if(paramMap!=null && paramMap.containsKey("reportFormat"))
	    			exportFormat = (String)paramMap.get("reportFormat");
	    	}
	    	if("CSV".equals(exportFormat)){
	    		exportToExcel = true;
	    	}
			
			
			
			if (strObjectIdList == null || strObjectIdList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector(strObjectIdList.size());
			}
			for(int i=0;i<strObjectIdList.size();i++){
				String 	strChangeActionId = (String) strObjectIdList.get(i);
				String strChangeType = (String) strObjectTypeList.get(i);

				if(mxType.isOfParentType(context, strChangeType, ChangeConstants.TYPE_CHANGE_ACTION)){
				columnVals.add(getContributors(context, strChangeActionId, exportToExcel));
			}
				else{
					columnVals.add("");
				}
			}
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	}//end of method

	/**
  	 * Get Contributor column value
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Reviewers Column.
  	 * @throws Exception if operation fails.
  	 */
	public String getContributors(Context context,String strChangeActionId, boolean exportToExcel)throws Exception
	{
		StringBuilder sb = new StringBuilder();
	//	StringList finalContributorList=new StringList();
		String relPattern =  new StringBuffer(ChangeConstants.RELATIONSHIP_CHANGE_REVIEWER).append(",").append(ChangeConstants.RELATIONSHIP_OBJECT_ROUTE).toString();
		String typePattern =  new StringBuffer(ChangeConstants.TYPE_PERSON).append(",").append(ChangeConstants.TYPE_ROUTE_TEMPLATE).toString();
		StringList objectSelects=new StringList(DomainObject.SELECT_ID);
		DomainObject changeAction = new DomainObject(strChangeActionId);
		IChangeAction iChangeAction=ChangeAction.getChangeAction(context, strChangeActionId);
		List contributorList=iChangeAction.GetContributors(context);
			if(!exportToExcel)
				sb.append("<input type=\"hidden\" name=\"ReviewersHidden\" id=\"ReviewersHidden\" value=\""+XSSUtil.encodeForJavaScript(context, contributorList.toString())+"\" readonly=\"readonly\" />");
			if (contributorList!=null && !contributorList.isEmpty()){
				for (int i=0;i<contributorList.size();i++) {
				String  lastContributorName=(String)contributorList.get(contributorList.size()-1);
					String contributorName = (String) contributorList.get(i);
					String contributorFullName = PersonUtil.getFullName(context, contributorName);
				//	if (contributorName!=null && !contributorName.isEmpty()) {
				//		String contributorName = new DomainObject(contributorId).getInfo(context, DomainConstants.SELECT_NAME);
						if (contributorName!=null && !contributorName.isEmpty()) {
						//	sb.append("<input type=\"hidden\" name=\""+XSSUtil.encodeForHTMLAttribute(context, contributorName)+"\" value=\""+XSSUtil.encodeForHTMLAttribute(context, contributorId)+"\" />");
							sb.append(XSSUtil.encodeForXML(context, contributorFullName));
							if(!lastContributorName.equalsIgnoreCase(contributorName))
								if(!exportToExcel)
									sb.append("<br/>");
								else sb.append("\n");
						}
					}
				}
			//}
		return sb.toString();
	}
	
	/**
	 * Program to get Column(Reviewer) value For CA Summary table
	 * @param context the eMatrix <code>Context</code> object
	 * @param args    holds the following input arguments:
	 *           0 -  Object
	 * @return        Vector of column value
	 * @throws        Exception if the operation fails
	 **
	 */
	public Vector showReviewerColumn(Context context, String args[])throws Exception
	{
		//XSSOK
		Vector columnVals = new Vector();
		try {
			
			HashMap programMap = (HashMap)JPO.unpackArgs(args);
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil=new ChangeUtil();
			StringList strObjectIdList = changeUtil.getStringListFromMapList(objectList,DomainObject.SELECT_ID);

			String[] strArrObjIds = new String[strObjectIdList.size()];
			strArrObjIds = (String[])strObjectIdList.toArray(strArrObjIds);

			MapList objectTypeList = DomainObject.getInfo(context, strArrObjIds, new StringList(DomainObject.SELECT_TYPE));
			StringList strObjectTypeList = changeUtil.getStringListFromMapList(objectTypeList,DomainObject.SELECT_TYPE);
			
			// For export to CSV
	    	String exportFormat = null;
	    	boolean exportToExcel = false;
	    	//Set keys = programMap.keySet();
	    	
	    	if(programMap!=null && programMap.containsKey("paramList")){
	    		Map paramMap = (HashMap)programMap.get("paramList");
	    		if(paramMap!=null && paramMap.containsKey("reportFormat"))
	    			exportFormat = (String)paramMap.get("reportFormat");
	    	}
	    	if("CSV".equals(exportFormat)){
	    		exportToExcel = true;
	    	}
			
			
			
			
			if (strObjectIdList == null || strObjectIdList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector(strObjectIdList.size());
			}
			for(int i=0;i<strObjectIdList.size();i++){
				String 	strChangeActionId = (String) strObjectIdList.get(i);
				String 	strChangeType = (String) strObjectTypeList.get(i);
				if(mxType.isOfParentType(context, strChangeType, ChangeConstants.TYPE_CHANGE_ACTION)){
				columnVals.add(getReviewers(context, strChangeActionId, exportToExcel));
			}
				else{
					columnVals.add("");
				}

			}
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e);
		}
	}//end of method

	/**
  	 * Get Reviewers column value
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Reviewers Column.
  	 * @throws Exception if operation fails.
  	 */
	public String getReviewers(Context context,String strChangeActionId, boolean exportToExcel)throws Exception
	{
		StringBuilder sb = new StringBuilder();
		StringList finalReviewersList=new StringList();
		String relPattern =  new StringBuffer(ChangeConstants.RELATIONSHIP_CHANGE_REVIEWER).append(",").append(ChangeConstants.RELATIONSHIP_OBJECT_ROUTE).toString();
		String typePattern =  new StringBuffer(ChangeConstants.TYPE_PERSON).append(",").append(ChangeConstants.TYPE_ROUTE_TEMPLATE).toString();
		StringList objectSelects=new StringList(DomainObject.SELECT_ID);
		objectSelects.add(DomainObject.SELECT_TYPE);
		StringList personReviewersList=new StringList();
		StringList routeTemplateReviewersList=new StringList();
		DomainObject changeAction = new DomainObject(strChangeActionId);
		MapList mapList=changeAction.getRelatedObjects(context,
				  relPattern,
				  typePattern,
				  objectSelects,
				  new StringList(DomainRelationship.SELECT_ID),
				  false,
				  true,
				  (short) 2,
				  null, null, (short) 0);

		if(!mapList.isEmpty()){
			Iterator iterator=mapList.iterator();
			while(iterator.hasNext()){
				Map dataMap=(Map)iterator.next();
				String objectType=(String)dataMap.get(DomainObject.SELECT_TYPE);
				String objectId=(String)dataMap.get(DomainObject.SELECT_ID);
				if(objectType.equalsIgnoreCase(ChangeConstants.TYPE_PERSON)){
					personReviewersList.add(objectId);
				}else if(objectType.equalsIgnoreCase(ChangeConstants.TYPE_ROUTE_TEMPLATE)){
					routeTemplateReviewersList.add(objectId);
				}
			}
		}
		String reviewers = DomainObject.EMPTY_STRING;
		String reviewerstype = DomainObject.EMPTY_STRING;
		if (personReviewersList!=null && !personReviewersList.isEmpty() && routeTemplateReviewersList.isEmpty()){
			for (int i=0;i<personReviewersList.size();i++) {
				String reviewersId = (String) personReviewersList.get(i);
				String reviewerType = new DomainObject(reviewersId).getInfo(context, DomainConstants.SELECT_TYPE);
				reviewers=reviewers.concat(reviewersId+",");
				reviewerstype=reviewerstype.concat(reviewerType+",");
				finalReviewersList.addElement(reviewersId);
			}
		}
			if (routeTemplateReviewersList!=null && !routeTemplateReviewersList.isEmpty()){
				for (int i=0;i<routeTemplateReviewersList.size();i++) {
					String reviewersId = (String) routeTemplateReviewersList.get(i);
					String reviewerType = new DomainObject(reviewersId).getInfo(context, DomainConstants.SELECT_TYPE);
					reviewers=reviewers.concat(reviewersId+",");
					reviewerstype=reviewerstype.concat(reviewerType+",");
					finalReviewersList.addElement(reviewersId);
				}

		}
			if(!exportToExcel)
				sb.append("<input type=\"hidden\" name=\"ReviewersHidden\" id=\"ReviewersHidden\" value=\""+XSSUtil.encodeForHTMLAttribute(context, reviewers)+"\" readonly=\"readonly\" />");
			if (finalReviewersList!=null && !finalReviewersList.isEmpty()){
				for (int i=0;i<finalReviewersList.size();i++) {
				String  lastReviewerId=(String)finalReviewersList.get(finalReviewersList.size()-1);
					String reviewersId = (String) finalReviewersList.get(i);
					if (reviewersId!=null && !reviewersId.isEmpty()) {
						String reviewerName = new DomainObject(reviewersId).getInfo(context, DomainConstants.SELECT_NAME);
						String reviewerFullName = PersonUtil.getFullName(context, reviewerName);
						if (reviewerName!=null && !reviewerName.isEmpty()) {
							if(!exportToExcel)
							sb.append("<input type=\"hidden\" name=\""+ reviewerFullName +"\" value=\""+ reviewersId +"\" />");
							sb.append(XSSUtil.encodeForXML(context, reviewerFullName));
							if(!lastReviewerId.equalsIgnoreCase(reviewersId))
								if(!exportToExcel)
									sb.append("<br/>");
								else sb.append("\n");
						}
					}
				}
			}
		return sb.toString();
	}
	 
	 /* This program is used for Query Program
	  * 
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  String - consisting of the Query parameter for Search.
	  * @throws Exception if the operation fails	  * 
	  * */	   
	 
	  @com.matrixone.apps.framework.ui.ProgramCallable
	  public String fieldQueryProgramForexcludeContextOID( Context context, String args[] ) throws Exception
	  {
	    String excludeContextObject = new String();
	    Map programMap = (Map) JPO.unpackArgs( args );
	    System.out.println("------------------------------------------------------------- ");
	    System.out.println("programMap:  " + programMap);
	    String contextOID = (String) programMap.get( "objectId" );
	    String strTagName=(String) programMap.get( "tag" );
	    excludeContextObject=strTagName+"!="+contextOID;
	    System.out.println("Query Param for search:  " + excludeContextObject);
	    System.out.println("------------------------------------------------------------- ");
	    return excludeContextObject;
	  }
	  
   /**Method to transfer the ownership of CO from properties page
    *
    */
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
       
       try{
           
			StringList objectSelects = new StringList(SELECT_OWNER);objectSelects.addElement(SELECT_TYPE);
			DomainObject domainObject = new DomainObject(objectId);
		   
			Map<String,String> objectInfo   = (Map<String,String>)domainObject.getInfo(context,objectSelects);
			String currentOwner = objectInfo.get(SELECT_OWNER);
	   
			//domainObject.TransferOwnership(context, newOwner, project, Organization);
		   
			StringBuffer transferCommentBuffer = new StringBuffer(1024);
			transferCommentBuffer.append(transferReason);

			ContextUtil.pushContext(context, ChangeConstants.USER_AGENT, null, null);
			ChangeUtil.addHistory(context, objectId, "TransferHistory", transferCommentBuffer.toString());
			ContextUtil.popContext(context);
			
			domainObject.TransferOwnership(context, newOwner, project, Organization);
           
       } catch(Exception e){
           emxContextUtil_mxJPO.mqlNotice(context,e.getMessage());
       }
   }
/**	 
	 * Generates dynamic query for Change Coordinator field
	 * @param context
	 * @param args
	 * @return String
	 * @throws Exception
	 */
	public String getChangeCoordinatorDynamicSearchQuery(Context context, String[] args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		Map requestMap     = (HashMap)programMap.get(ChangeConstants.REQUEST_MAP);
		Map fieldValuesMap = (HashMap)programMap.get(ChangeConstants.FIELD_VALUES);
		String orgId      = EMPTY_STRING;
		//Getting the Change Object id
		String changeObjID = (String)requestMap.get(ChangeConstants.OBJECT_ID);
			if(UIUtil.isNotNullAndNotEmpty(changeObjID)){

                //Getting the Orgnization name of Change object and then getting Id from that name
				orgId = ChangeUtil.getRtoIdFromName(context, DomainObject.newInstance(context, changeObjID).getInfo(context, SELECT_ORGANIZATION));
			
			}else if (fieldValuesMap.containsKey(ChangeConstants.RESPONSIBLE_ORGANISATION_OID) &&
					fieldValuesMap.get(ChangeConstants.RESPONSIBLE_ORGANISATION_OID) != null
					&& fieldValuesMap.get(ChangeConstants.RESPONSIBLE_ORGANISATION_OID) instanceof String){
				
				orgId = (String) fieldValuesMap.get(ChangeConstants.RESPONSIBLE_ORGANISATION_OID);
			}
		
		return "MEMBER_ID="+orgId+":USERROLE=role_ChangeCoordinator,role_VPLMProjectLeader";

	}
	
	/**
     * For Properties Page Active Change Exists Field
     * "Active Change Exists" will show Yes if
     * object has Change Action connected to it, and
     * Change Action is not in "Complete" and "Cancelled"
     * other wise No 
     * @param context
     * @param args
     * @return
     * @throws Exception
     * @since R422
     */

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
			
        	
        	List phyidList = new ArrayList<>();        	
        	
        	String objectid =  (String) relBusObjPageList.get("objectId");
        	String physicalid = (String) relBusObjPageList.get("physicalid");        	
        	if((physicalid==null ||physicalid.trim().isEmpty()) && UIUtil.isNotNullAndNotEmpty(objectid)){
        		//ROOT NODE- SELCTABLE PHYSICAL ID MISSING FOR EXPAND PROG CASE
        		physicalid=DomainObject.newInstance(context, objectid).getInfo(context, "physicalid");
        	}
        	phyidList.add(physicalid);
        	
        	
        	
        	
        	//Modeler API Call to get CA info        
            ChangeActionFactory factory = new ChangeActionFactory();
            IChangeActionServices changeAction = factory.CreateChangeActionFactory();
        	Map<String,Map<String,String>> ImpactsFromListObject = changeAction.getImpactsFromListObject(context, phyidList);
        	for(Entry <String,Map<String,String>> objectMapEntry : ImpactsFromListObject.entrySet()){
        		boolean activeEC = false;
        		String objectPhysicalID=objectMapEntry.getKey();
        		for(Entry <String,String> proposedEntry : objectMapEntry.getValue().entrySet()){      
        			String slCurrent = proposedEntry.getValue();
        			if(!ChangeUtil.isNullOrEmpty(slCurrent) && !slCurrent.equalsIgnoreCase(STATE_CHANGE_ACTION_COMPLETE) && !slCurrent.equalsIgnoreCase("Cancelled")){
        				activeEC = true;
        				break;
        			} 
        			
        		}
        		if(activeEC) {
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
        		
        	}
			
			
			
		} catch (Exception e) {
			throw new FrameworkException(e.getMessage()); 
		}
		return strActiveChangeIcon;		
    }
    
    /**
     * with the ECM adoption of FTR, for Active EC Column for LF/CF/MF - 
     * "Active Engineering Change" renamed "Active Change" will show Yes if
     * object has Change action connected with it, and
     * Change Action is not in "Complete" and "Cancelled"
     * 
     * other wise No
     * 
     * @param context
     * @param args
     * @return
     * @throws Exception
     * 
     */
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
        	
        	
        	List phyidList = new ArrayList<>();
        	for(int index=0;index<relBusObjPageList.size();index++){
        	Map relBusObjMap = (Map) relBusObjPageList.get(index);
        	String objectid = (String) relBusObjMap.get(SELECT_ID);
        	String physicalid = (String) relBusObjMap.get("physicalid");        	
        	if((physicalid==null ||physicalid.trim().isEmpty()) && UIUtil.isNotNullAndNotEmpty(objectid)){
        		//ROOT NODE- SELCTABLE PHYSICAL ID MISSING FOR EXPAND PROG CASE
        		physicalid=DomainObject.newInstance(context, objectid).getInfo(context, "physicalid");
        	}
        	phyidList.add(physicalid);
        	
        	}
        	
        	
        	//Modeler API Call to get CA info        
            ChangeActionFactory factory = new ChangeActionFactory();
            IChangeActionServices changeAction = factory.CreateChangeActionFactory();
        	Map<String,Map<String,String>> ImpactsFromListObject = changeAction.getImpactsFromListObject(context, phyidList);
        	for(Entry <String,Map<String,String>> objectMapEntry : ImpactsFromListObject.entrySet()){
        		boolean activeEC = false;
        		String objectPhysicalID=objectMapEntry.getKey();
        		for(Entry <String,String> proposedEntry : objectMapEntry.getValue().entrySet()){      
        			String slCurrent = proposedEntry.getValue();
        			if(!ChangeUtil.isNullOrEmpty(slCurrent) && !slCurrent.equalsIgnoreCase(STATE_CHANGE_ACTION_COMPLETE) && !slCurrent.equalsIgnoreCase("Cancelled")){
        				activeEC = true;
        				break;
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
        	
        	for(int index=0;index<phyidList.size();index++){
        		String phyid = (String) phyidList.get(index);
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
	
		//Below methods are used in Channel Home UI in 3DSpace while logged in using admin
	    /**
	 * Returns the Badge status COs/CRs
	 * @param context
	 * @param args
	 * @throws Exception
	 */
    public void getBadgeStatusForChangeActionWidgets(Context context, String[] args) throws Exception {
    	try {
	        Map<String, Object> map = (Map<String, Object>) JPO.unpackArgs(args);
	        MapList ml 				= (MapList) map.get("JPO_WIDGET_DATA");
	        String fieldKey 		= (String) map.get("JPO_WIDGET_FIELD_KEY");
	    	new ChangeWidgets().getBadgeStatusForChangeAction(context, fieldKey, ml);
    	}catch (Exception badge) {
    		System.out.println("Exception occurred in getBadgeStatusForChangeActionWidgets");
    		badge.printStackTrace();
    	}
    }
	
	    /**
	 * Returns the label of Affected items
	 * @param context
	 * @param args
	 * @throws Exception
	 */
    public void getAffectedItemsCountAndLabel(Context context, String[] args) throws Exception {	    
    	try {
    	    Map programMap     = (Map) JPO.unpackArgs(args);
    	    String fieldKey    = (String) programMap.get(ServiceBase.JPO_WIDGET_FIELD_KEY);
    	    MapList objectList = (MapList) programMap.get(ServiceBase.JPO_WIDGET_DATA); 
		    Map<String, String> widgetArgs = (Map<String, String>) programMap.get(ServiceBase.JPO_WIDGET_ARGS);
		    String baseURI      =	widgetArgs.get(ServiceBase.ARG_BASE_URI);
    	    Map typeCategoryMap    = new HashMap();
    	    typeCategoryMap.put(ChangeConstants.TYPE_CHANGE_ACTION, "ECMCAAffectedItems");
    	    new ChangeWidgets().getHTMLForCountAndLabel(context, fieldKey, objectList,
    	    											"EnterpriseChangeMgt.Widget.ProposedChanges","EnterpriseChangeMgt.Widget.ProposedChangesMouseOverText",baseURI); 
    	}
    	catch (Exception label) {
    		System.out.println("Exception occurred in getAffectedItemsLabel");
    		label.printStackTrace();
    	}
    }
	
	    /**
	 * Returns the Progress status of CAs
	 * @param context
	 * @param args
	 * @throws Exception
	 */
    public void getProgressStatusForChangeActionWidgets(Context context, String[] args) throws Exception {
    	try {
		    Map programMap     = (Map) JPO.unpackArgs(args);
		    String fieldKey    = (String) programMap.get(ServiceBase.JPO_WIDGET_FIELD_KEY);
		    MapList objectList = (MapList) programMap.get(ServiceBase.JPO_WIDGET_DATA);		    
		    new ChangeWidgets().getProgressStatusForChangeAction(context,fieldKey,objectList);
    	}
    	catch (Exception progress) {
    		System.out.println("Exception occurred in getProgressStatusForChangeAction");
    		progress.printStackTrace();
    	}
    }
	
	/**
	 * Range Program to display Legacy Change Filter Options
	 * @param context   the eMatrix <code>Context</code> object
	 * @param           String[] of ObjectIds.
	 * @return          Object containing CO objects
	 * @throws          Exception if the operation fails
	 * @since           ECM R212
	 */
	public HashMap getLegacyChangeFilters(Context context, String args[])throws Exception {
		HashMap ViewMap 					= new HashMap();
		HashMap programMap 					= (HashMap) JPO.unpackArgs(args);
		HashMap requestMap 					= (HashMap) programMap.get("requestMap");
		HashMap menuMap 					= UICache.getMenu(context, "ECMChangeLegacyMenu");
		MapList commandMap 					= (MapList)menuMap.get("children");

		String cmdName 						= "";
		String cmdLabel 					= "";
		String sDisplayValue 				= "";
		String sRegisteredSuite 			= "";
		String strStringResourceFile 		= "";
		StringList fieldRangeValues 		= new StringList();
		StringList fieldDisplayRangeValues 	= new StringList();

		if(commandMap!=null){
			Iterator cmdItr = commandMap.iterator();
			while(cmdItr.hasNext())
			{
				Map tempMap 				= (Map)cmdItr.next();
				cmdName 					= (String)tempMap.get("name");
				HashMap cmdMap 				= UICache.getCommand(context, cmdName);
				HashMap settingMap 			= (HashMap)cmdMap.get("settings");
				cmdLabel 					= (String)cmdMap.get("label");
				sRegisteredSuite 			= (String)settingMap.get("Registered Suite");


				strStringResourceFile 		= UINavigatorUtil.getStringResourceFileId(sRegisteredSuite);
				//sDisplayValue 				= i18nNow.getI18nString (cmdLabel, strStringResourceFile, context.getSession().getLanguage());

				sDisplayValue = EnoviaResourceBundle.getProperty(context, strStringResourceFile, context.getLocale(),cmdLabel);

				fieldRangeValues.addElement(sDisplayValue);
				fieldDisplayRangeValues.addElement(sDisplayValue);
			}
			ViewMap.put("field_choices", fieldRangeValues);
			ViewMap.put("field_display_choices", fieldDisplayRangeValues);
		}
		if(commandMap!=null)
			return ViewMap;
		else
			return new HashMap();
	}

    /**
    * @param context
    * @param args holds information about object.
    * @return false if change request with new policy 
    * @throws Exception
	* @since R423.HF7 ECM
    */
	public boolean hasAccess(Context context, String[] args) throws Exception{
		//unpacking the Arguments from variable args
		HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);
		boolean hasAccess = true;
		String strObjId   = (String)programMap.get(ChangeConstants.OBJECT_ID);
		String POLICY_REQUEST_FOR_CHANGE = PropertyUtil.getSchemaProperty(context, "policy_RequestForChange");
		if(!ChangeUtil.isNullOrEmpty(strObjId)){
			DomainObject domChange = DomainObject.newInstance(context, strObjId);
			if(domChange.isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST)){
		    	 StringList slSelectable = new StringList(SELECT_POLICY);
			     Map mDomInfo = domChange.getInfo(context, slSelectable);
		    	 String strPolicy = (String)mDomInfo.get(SELECT_POLICY);
		    	 if((!ChangeUtil.isNullOrEmpty(POLICY_REQUEST_FOR_CHANGE) && POLICY_REQUEST_FOR_CHANGE.equals(strPolicy))){
		    		 hasAccess = false;	 
		    	 }	
			}
		}	
		return hasAccess;
	}	


	/**
	 * Displays Cloned CO Name on Copy Selected page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean showFieldInClone(Context context,String []args) throws Exception {

		boolean sReturn = false;
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String sCeateMode    = (String)paramMap.get("CreateMode");
		if("CloneCO".equals(sCeateMode) && isChangeTemplateActivated(context, args)){
			sReturn = true;
		}
		return sReturn;
	}

	/**
	 * Displays Cloned CO Name on Copy Selected page
	 * @author
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	public boolean showFieldInCreate(Context context,String []args) throws Exception {

		boolean sReturn = false;
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String sCeateMode    = (String)paramMap.get("CreateMode");
		if("CreateCO".equals(sCeateMode) && isChangeTemplateActivated(context, args)){
			sReturn = true;
		}

		return sReturn;
	}

	/**
	  * To check if Change Template is activated by mql expression
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if activated, false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	 
	 public boolean isChangeTemplateActivated(Context context,String []args) throws Exception {
		 boolean bChangeTemplateActivated = false;
		 
		 String expressionKey = "CHG_CO_Enable_ChangeTemplate";
		 String expressionVal = getExpressionValue(context, expressionKey);		 
		 boolean bIsNotFound = ChangeUtil.isNullOrEmpty(expressionVal);
		 
		 if(!bIsNotFound && "true".equalsIgnoreCase(expressionVal) ) bChangeTemplateActivated = true;
		 
		 System.out.println("CHG_CO_Enable_ChangeTemplate Boolean Value::" + bChangeTemplateActivated);
		 
		 return bChangeTemplateActivated; 
	 }

	 /**
	  * To check if preReviewerRoute is activated by mql expression
	  *
	  * @param context- the eMatrix <code>Context</code> object
	  * @param args- holds the HashMap containing the following arguments
	  * @return  boolean- true if activated, false otherwise
	  * @throws Exception if the operation fails
	  * 
	  */
	 
	 public boolean isPreReviewerRouteActivated(Context context,String []args) throws Exception {
		 boolean bPreReviewerRouteActivated = false;
		 
		 String expressionKey = "CHG_ENABLE_CO_REVIEW";
		 String expressionVal = getExpressionValue(context, expressionKey);		 
		 boolean bIsNotFound = ChangeUtil.isNullOrEmpty(expressionVal);
		 
		 if(!bIsNotFound && "true".equalsIgnoreCase(expressionVal) ) bPreReviewerRouteActivated = true;
		 
		 System.out.println("CHG_ENABLE_CO_REVIEW Boolean Value::" + bPreReviewerRouteActivated);
		 
		 return bPreReviewerRouteActivated; 
	 }
	 
	 /**
	 * Method to get HTML For Change Control Value on Relationship instance
	 * @param Context context
	 * @param args holds information about object.
	 * @return Change Control Value
	 * @throws Exception if operation fails.
	 * @since R425 ECM
	 */
	public Vector<String> getHTMLForChangeControlValueOnInstance(Context context,String[] args) throws Exception{

		//XSSOK
		Vector<String> columnVals = new Vector<String>();
		List<String> iPidObjectList = new ArrayList<String>(); 
		String changeControlHTML = EMPTY_STRING;
		
		try {
			String strLanguage  	   =  context.getSession().getLanguage();
			String changeControlDisabled = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Label.Disabled",strLanguage);
			String changeControlEnabledAny = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Label.EnabledAnyChange",strLanguage);
			String strCADisplayPreference = EnoviaResourceBundle.getProperty(context, "EnterpriseChangeMgt", Locale.US, "EnterpriseChangeMgt.ChangeControl.CADisplayPreference");
			
			HashMap<?, ?> programMap = (HashMap<?, ?>)JPO.unpackArgs(args);
			
			Map paramMap = (Map) programMap.get("paramList");
			StringList objectSelects = new StringList(ChangeConstants.SELECT_PHYSICAL_ID);
			
			MapList objectList = (MapList) programMap.get(ChangeConstants.OBJECT_LIST);
			ChangeUtil changeUtil = new ChangeUtil();
			String exportFormat = null;
			boolean exportToExcel = false;
			if(paramMap!=null){
				exportFormat = (String) paramMap.get("reportFormat");
				
				exportToExcel = ("CSV".equals(exportFormat));
			}

			Map map;
		   	int size = objectList.size();
		   	String[] objectIdArray = new String[size];
		   	
		   	for (int i = 0; i < size; i++) {
		   		map = (Map) objectList.get(i);
				objectIdArray[i] = (String)map.get(DomainObject.SELECT_RELATIONSHIP_ID);
		   	}

			if (objectList == null || objectList.size() == 0){
				return columnVals;
			} else{
				columnVals = new Vector<String>(size);
			}
			// get the physical id from object id
			MapList objMapList =  DomainRelationship.getInfo( context,objectIdArray, objectSelects) ;
			for(int index=0; index<objMapList.size();index++) {
				Map<?, ?> objMap = (Map<?, ?>) objMapList.get(index);
				String physicalId = (String) objMap.get(ChangeConstants.SELECT_PHYSICAL_ID);
				iPidObjectList.add(physicalId);
			}
			
			//Calling modeler API to get Change control flag
			IChangeActionServices iChangeActionServices = ChangeActionFactory.CreateChangeActionFactory();
						
			Map<String, String> mapChangeControlObject = iChangeActionServices.getChangeControlFromPidList(context,iPidObjectList);
								    
			for(int index=0;index<iPidObjectList.size();index++){

				String changeControl = EMPTY_STRING;
				String physicalId = iPidObjectList.get(index);
				if(mapChangeControlObject.containsKey(physicalId)) {
					changeControl =	(String) mapChangeControlObject.get(physicalId);
					if(!ChangeUtil.isNullOrEmpty(changeControl)){
						changeControlHTML = makeHTMLForChangeControl(context, changeControl,exportToExcel, changeControlDisabled, changeControlEnabledAny, strCADisplayPreference);
					}else{
						changeControlHTML = EMPTY_STRING;
					}
				}
				columnVals.add(changeControlHTML);
			}
		      
			return columnVals;

		} catch (Exception e) {
			throw new FrameworkException(e);
		}

	}
	 
}
