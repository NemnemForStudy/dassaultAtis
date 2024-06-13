import java.util.ArrayList;
import java.util.List;

import com.dassault_systemes.enovia.partmanagement.modeler.constants.PartMgtConstants;
import com.dassault_systemes.enovia.partmanagement.modeler.impl.PartCollaborationService;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.dvo.IChangeControlled;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.dvo.IPart;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.input.IPartIngress;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.parameterization.IParameterization;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.services.IPartCollaborationService;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.services.IPartService;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.services.IUserFactChangeLogService;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.validator.IPartValidator;
import com.dassault_systemes.enovia.partmanagement.modeler.util.SynchronizationUtil;
import com.dassault_systemes.enovia.partmanagement.modeler.kernel.PartMgtKernel;
import com.dassault_systemes.enovia.partmanagement.modeler.util.ECMUtil;
import com.dassault_systemes.enovia.partmanagement.modeler.util.PartMgtUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

import matrix.db.Attribute;
import matrix.db.AttributeType;
import matrix.db.BusinessObjectWithSelectItr;
import matrix.db.Context;
import matrix.util.MatrixException;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Locale;

import matrix.db.JPO;
import matrix.util.StringList;

public class enoPartManagementBase_mxJPO {

	public enoPartManagementBase_mxJPO(Context context, String[] args) throws Exception {

	}

	/**
	 * To create the part object from create component
	 *
	 * @param context
	 * @param args
	 * @return Map
	 * @throws Exception
	 * @Since R419
	 */
	@com.matrixone.apps.framework.ui.CreateProcessCallable
	public int checkPartDeleteAllowed(Context context, String [] args) throws MatrixException {
		String objectId = args[0];
		String relationshipName = args[1];
				
		IPartIngress iPartIngress =  IPartIngress.getService();
		iPartIngress.setOperation(IPartValidator.OPERATION_DELETE);
		iPartIngress.setObjectId(objectId);
		
		IPartService iPartService = IPartService.getService(context, objectId); 
		//For IR-536032-3DEXPERIENCER2018x
		String sPolicy = (iPartService.getInfo(context).getPolicy());
		
		String SHOPPER_PRODUCT = PartMgtUtil.isNotNullAndNotEmpty(PropertyUtil.getSchemaProperty(context,"policy_ShopperProduct"))?PropertyUtil.getSchemaProperty(context,"policy_ShopperProduct"):"";
		if(SHOPPER_PRODUCT.equalsIgnoreCase(sPolicy)){
			return 0;
		}
		
		IPartValidator iPartValidator = iPartService.getValidator();
		iPartValidator.validate(context, iPartService, iPartIngress);
		
		String sRelName = PartMgtUtil.getActualSchemaName(context,relationshipName);
		if(!sRelName.equals(PartMgtConstants.RELATIONSHIP_EBOM)){
			Boolean isChildPart = PartMgtUtil.isConnectedAsChild(context,iPartIngress.getObjectId(),sRelName);
			if (isChildPart ) {
				String errorMsgPropertyKey = "emxPartManagement.DeletePart.CheckPartConnectedAsChild";
				String errorMsg = PartMgtUtil.getActualPropertyValue(context, errorMsgPropertyKey, PartMgtConstants.PART_MGT_RESOURCE_FILE);
				String displayValue = PartMgtUtil.getDisplayPropertyValue(context, errorMsgPropertyKey, PartMgtConstants.PART_MGT_RESOURCE_FILE);
				
				throw PartMgtUtil.createPartException(errorMsgPropertyKey, errorMsg, displayValue);
			}
		}
		
		return 0;
	}
/**
     * This method is used as Table Program to fetch the Raw material data for a context Part.(Make From Relationship)
     * @param context
     * 	The Context Object represents the User context
     * @param args
     * 	The String[] object represents the arguments passed
     * @return
     * 	MapList Objects consists of Raw Material's Id and Relation Ship Id
     * @throws Exception
     * 	If any
     * @From 2017x FD02
     */
	@SuppressWarnings("rawtypes")
	@com.matrixone.apps.framework.ui.ProgramCallable
	  public MapList getRawMaterials(Context context,String[] args) throws Exception{
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
	      MapList rawmaterialPartList = null;
	      String objectId = (String)programMap.get("objectId");
	      
	      StringList objectSelects = new StringList(7);
	      objectSelects.addElement(DomainConstants.SELECT_ID);
	      
	      StringList relSelects = new StringList(7);
	      
	      IPartService iPartService = IPartService.getService(context,objectId);
	      rawmaterialPartList =  iPartService.getRawMaterials(context, objectSelects, relSelects);

	      return rawmaterialPartList;
	  }  
	/**
	 * This method is used to add the raw materials to the context part. And it is called from emxEngineeringAlternatePartsAddExistingProcess.jsp"
	 * as a JPO invoke
	 * @param context
	 * 	The Context object represents the user context
	 * @param args
	 * 	The String[] object represents the arguments passed.
	 * @throws
	 * 	Exception if an error
	 */
	@SuppressWarnings("rawtypes")
	public void addRawMaterials(Context context,String[] args) throws Exception{

			HashMap programMap = JPO.unpackArgs(args);
			String objectId = (String)programMap.get("objectId");
			String[] emxTableRawIds = (String[])programMap.get("emxTableRowId");
			StringList rawMaterialObjects =  PartMgtUtil.getListFromSelectedTableRowIds(emxTableRawIds, 1);
			IPartService iPartService = IPartService.getService(context,objectId);
			IPartIngress iPartIngress =  IPartIngress.getService();
			iPartIngress.setRawMaterialObjectIds(rawMaterialObjects);
			iPartService.addRawMaterials(context, iPartIngress);

	}
/**
 * This method is used to remove the connected raw materials from the Context part. and 
 * It is called from the emxEngrTableDisconnectProcess.jsp  as a JPO invoke
 * @param context
 * 	The Context Object represents the user context.
 * @param args
 * 		The String[] object represents the arguments passed.
 * @throws Exception	
 * 	Exception if any error.
 */
	@SuppressWarnings("rawtypes")
	public void removeRawMaterials(Context context,String[] args) throws Exception {
		
			HashMap programMap = JPO.unpackArgs(args);
			String objectId = (String)programMap.get("objectId");
			String[] emxTableRawIds = (String[])programMap.get("emxTableRowId");
			StringList rawMaterialObjects =  PartMgtUtil.getListFromSelectedTableRowIds(emxTableRawIds, 1);			
			IPartService iPartService = IPartService.getService(context,objectId);
			IPartIngress iPartIngress =  IPartIngress.getService();
			iPartIngress.setRawMaterialObjectIds(rawMaterialObjects);
			iPartService.removeRawMaterials(context, iPartIngress);

	}
      
  /**
   * This Program/Function used as excludeOID program in "Add Make From" functionality
   * @param context Context 
   * 		The Context Object represents the User Context
   * @param args 
   * 	The String[] object presents the parameter having Part's details
   * @return 
   * 	The StringList object consists of value of exclude connected Raw Materials (Make From)
   * @throws Exception 
   * 	if searching Parts object fails.
   * @ from 17x FD02
   */
  @SuppressWarnings("rawtypes")
  @com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
  public StringList excludeConnectedRawMaterialOIDs(Context context, String[] args)throws Exception
  {
	  HashMap params = (HashMap)JPO.unpackArgs(args);
	  String objectId = (String)params.get("objectId");

	  Map object;
	  String tempObj="";
	  StringList resultExclude=new StringList();

	  if(objectId!=null){

		  //Exclude context part
		  resultExclude.add(objectId);

		  MapList totalConnectedList = null;			  
		  StringList objectSelects = new StringList(7);
		  objectSelects.addElement(DomainConstants.SELECT_ID);

		  StringList relSelects = new StringList(7);

		  IPartService iPartService = IPartService.getService(context,objectId);
		  totalConnectedList =  iPartService.getRawMaterials(context, objectSelects, relSelects);

		  //Getting all connected Object Id
		  Iterator itr = totalConnectedList.iterator();

		 return  PartMgtUtil.getSListForTheKey(totalConnectedList, DomainConstants.SELECT_ID);
/*		  while (itr.hasNext()){
			  object = (Map) itr.next();
			  tempObj = (String) object.get(DomainConstants.SELECT_ID);
			  resultExclude.add(tempObj);
		  }//End of for loop
*/
		  /*
		   * Exclude the Raw Materials whose "Deign Collaboration" is true.
		   */


		/*  String typePattern = PropertyUtil.getSchemaProperty(context,"type_RawMaterial");
		  String whereExpression = "attribute["+PropertyUtil.getSchemaProperty(context,"attribute_isVPMVisible")+"].value == TRUE";
		  MapList rawMaterialWithDesignCollab = findObjects(context,typePattern,context.getVault().toString(),whereExpression,objectSelects);

		  itr = rawMaterialWithDesignCollab.iterator();

		  while (itr.hasNext()){
			  object = (Map) itr.next();
			  tempObj = (String) object.get(DomainConstants.SELECT_ID);
			  resultExclude.add(tempObj);
		  }*/
	  }
	  return resultExclude;
  }
  /**
   * To display the structure content value for part in properties page.
   * If already Synchronized, displays the V_Name of the corresponding product and links to the Product.
   * @param context
   * @param args
   * @return String
   * @throws Exception
   */

  public String getStructureContent(Context context, String[] args) throws Exception{
      HashMap programMap = (HashMap) JPO.unpackArgs(args);
      HashMap requestMap = (HashMap) programMap.get("requestMap");
      String partId = (String)requestMap.get("objectId");
      String strContentValue = EnoviaResourceBundle.getProperty(context, "emxPartManagementStringResource", context.getLocale(),"emxPartManagement.StructureContent.StandAlone");
      StringList slSelectables = new StringList(2);
      slSelectables.add("to["+PartMgtConstants.RELATIONSHIP_EBOM+"]");
      slSelectables.add("from["+PartMgtConstants.RELATIONSHIP_EBOM+"]");
      String sPartDetails = MqlUtil.mqlCommand(context,"print bus $1 select $2 $3 dump $4",partId,"to["+PartMgtConstants.RELATIONSHIP_EBOM+"]", "from["+PartMgtConstants.RELATIONSHIP_EBOM+"]","|");
      String[] slPartDetail = sPartDetails.split("[|]");
      String sToEBOMConnection = slPartDetail[0];
      String sFromEBOMConnection = slPartDetail[1];
      if("True".equalsIgnoreCase(sToEBOMConnection) && "True".equalsIgnoreCase(sFromEBOMConnection)){
      	strContentValue = EnoviaResourceBundle.getProperty(context, "emxPartManagementStringResource", context.getLocale(),"emxPartManagement.StructureContent.Intermediate");
      }
      else if("False".equalsIgnoreCase(sToEBOMConnection) && "True".equalsIgnoreCase(sFromEBOMConnection)){
      	strContentValue = EnoviaResourceBundle.getProperty(context, "emxPartManagementStringResource", context.getLocale(),"emxPartManagement.StructureContent.Root");
      }
      else if("True".equalsIgnoreCase(sToEBOMConnection) && "False".equalsIgnoreCase(sFromEBOMConnection)){
      	strContentValue = EnoviaResourceBundle.getProperty(context, "emxPartManagementStringResource", context.getLocale(),"emxPartManagement.StructureContent.Leaf");
      }
      return strContentValue;
  }
  
  /**
   * To display if the part is Configured or Not.
   * If already Synchronized, displays the V_Name of the corresponding product and links to the Product.
   * @param context
   * @param args
   * @return String
   * @throws Exception
   */
  public String getConfiguredVal(Context context, String[] args) throws Exception{
      HashMap programMap = (HashMap) JPO.unpackArgs(args);
      HashMap requestMap = (HashMap) programMap.get("requestMap");
      String partId = (String)requestMap.get("objectId");
      IPart part = IPartService.getInfo(context, partId);
      String isConfigured = EnoviaResourceBundle.getProperty(context, "emxPartManagementStringResource", context.getLocale(),"emxPartManagement.Value.False");
      if(part.isPolicyClassification_Unresolved()) {
      	isConfigured = EnoviaResourceBundle.getProperty(context, "emxPartManagementStringResource", context.getLocale(),"emxPartManagement.Value.True");;
      }
      return isConfigured;
  }
  
  /** This Method checks if the attribute is classified on the Part, returns true if it is classified and attribute exists on it.
  * returns false if it is classified and attribute does not exists. 
  * @param context enovia context
  * @param partId part object Id 
  * @return boolean
  * @throws Exception if any operation fails.
  */
  private boolean isClassifiedAttributeExist(Context context, String partId) throws Exception {
      DomainObject domObject = DomainObject.newInstance(context, partId);
      
      StringList sList = domObject.getInfoList(context, "to[" + PropertyUtil.getSchemaProperty(context, "relationship_ClassifiedItem") + "].from.attribute[mxsysInterface]");
      
      boolean classifiedAttrExists = false;
      for (int i = 0; i < sList.size(); i++) {
    	  String strinterface = (String) sList.get(i);
    	  if(PartMgtUtil.isNotNullAndNotEmpty(strinterface)){
	    	  String mqlOutPut = MqlUtil.mqlCommand(context, "print interface $1 select $2 dump $3", (String) sList.get(i), "allparents.derived", "|");
	    	  
	    	  if ( PartMgtUtil.isNotNullAndNotEmpty(mqlOutPut) ) {
	    		  if ( FrameworkUtil.split(mqlOutPut, "|").contains("Classification Attribute Groups") ) {
		    		  classifiedAttrExists = true;
		    		  break;
	    		  }
	    	  }
    	  }
      }
      
	  return classifiedAttrExists;
  }
  
  /** This method is called from Part properties page Classification field Access Program, Used to hide or display the field based on Classified attribute exists or not.
 * @param context enovia context
 * @param args arguments passed from UI.
 * @return true if Classified Item exists else returns false.
 * @throws Exception if any operation fails.
 */
  public boolean classifiedAttributeExist(Context context, String [] args) throws Exception {
	  HashMap programMap = (HashMap) JPO.unpackArgs(args);
	  
	  String partId = (String) programMap.get("objectId");
	  
	  return isClassifiedAttributeExist(context, partId);
  }

 /** This method is called for showing change controlled option/checkbox from revise part and clone part
	   * @param context enovia context
	   * @param args arguments passed from UI.
	   * @return sets true if changecontrolled check box is checked , sets false if change controlled checkbox is false
	   * @throws Exception if any operation fails.
	   */
	public String setChangeControlledOption(Context context,String[] args) throws Exception {
		HashMap paramMap = (HashMap)JPO.unpackArgs(args);
		HashMap requestMap = (HashMap)paramMap.get("requestMap");
		Locale locale = (Locale) requestMap.get("localeObj");
		if (locale == null) { context.getLocale(); }

		// Retrieve the default value of of isVPMVisible from the IParamaterization
		IParameterization iParam = IParameterization.getService(context);
		String defDCVal = iParam.getDefaultDesignCollaboration(context);

		StringBuffer sbHTMLOutPut = new StringBuffer(2048);
		sbHTMLOutPut.append("<div name=\"divChange\">");
		sbHTMLOutPut.append("<table>");
		sbHTMLOutPut.append("<tr>");
		sbHTMLOutPut.append("<td>");
		String copyObjectId = (String)requestMap.get("copyObjectId");
		String revisePart = (String)requestMap.get("reviseAction");
		String clonePartForm = (String)requestMap.get("form");
		if((PartMgtUtil.isNotNullAndNotEmpty(revisePart) && revisePart.equalsIgnoreCase("true")||(PartMgtUtil.isNotNullAndNotEmpty(clonePartForm) && PartMgtUtil.isNotNullAndNotEmpty(copyObjectId)))){ //show  change controlled option revise part
			IPartService iPartService = IPartService.getService(context,copyObjectId);
			IChangeControlled isChangeControlled= iPartService.getChangeControlledInfo(context);
			String changeControlledValue=isChangeControlled.getChangeControlledValue();
			IPart iPart=iPartService.getInfo(context);
			boolean isVPMVisible=iPart.isVPMVisible();
			if ( !isChangeControlled.is_None() ) {
				sbHTMLOutPut.append("<input type=\"checkbox\" name=\"ChangeControlled\" value=\"true\" checked=\"true\" onclick=\"javascript:onChangeControlled()\"/>&amp;#160;");
				sbHTMLOutPut.append(EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", locale, "emxEngineeringCentral.Common.ChangeControlled"));
				sbHTMLOutPut.append("</td>");
				sbHTMLOutPut.append("</tr>");

			}else{
				sbHTMLOutPut.append("<input type=\"checkbox\" name=\"ChangeControlled\" value=\"false\" onclick=\"javascript:onChangeControlled()\"/>&amp;#160;");
				sbHTMLOutPut.append(EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", locale, "emxEngineeringCentral.Common.ChangeControlled"));
				sbHTMLOutPut.append("</td>");
				sbHTMLOutPut.append("</tr>");

			}
			if(isVPMVisible==true){
				sbHTMLOutPut.append("<tr>");
				sbHTMLOutPut.append("<td height=\"30\">");
				sbHTMLOutPut.append("<input type=\"checkbox\" name=\"isVPMVisible\" value=\"true\" checked=\"true\" onclick=\"javascript:onChangeDesignCollaboration()\"");
				if((PartMgtUtil.isNotNullAndNotEmpty(revisePart) && revisePart.equalsIgnoreCase("true"))){
					sbHTMLOutPut.append(" disabled=\"true\"");
				}
				sbHTMLOutPut.append("/>&amp;#160;");
				sbHTMLOutPut.append(EnoviaResourceBundle.getProperty(context, "emxVPMCentralStringResource", locale, "emxVPMCentral.Label.DesignCollaboration"));
				sbHTMLOutPut.append("</td>");
				sbHTMLOutPut.append("</tr>");
			}else{
				sbHTMLOutPut.append("<tr>");
				sbHTMLOutPut.append("<td  height=\"30\">");
				sbHTMLOutPut.append("<input type=\"checkbox\" name=\"isVPMVisible\" value=\"false\" onclick=\"javascript:onChangeDesignCollaboration()\"");
				if((PartMgtUtil.isNotNullAndNotEmpty(revisePart) && revisePart.equalsIgnoreCase("true"))){
					sbHTMLOutPut.append(" disabled=\"true\"");
				}
				sbHTMLOutPut.append("/>&amp;#160;");
				sbHTMLOutPut.append(EnoviaResourceBundle.getProperty(context, "emxVPMCentralStringResource", locale, "emxVPMCentral.Label.DesignCollaboration"));
				sbHTMLOutPut.append("</td>");
				sbHTMLOutPut.append("</tr>");
			}

		}
		else{ //intial load of clone part page from actions menu
			sbHTMLOutPut.append("<input type=\"checkbox\" name=\"ChangeControlled\" value=\"false\" onclick=\"javascript:onChangeControlled()\"/>&amp;#160;");
			sbHTMLOutPut.append(EnoviaResourceBundle.getProperty(context, "emxEngineeringCentralStringResource", locale, "emxEngineeringCentral.Common.ChangeControlled"));
			sbHTMLOutPut.append("</td>");
			sbHTMLOutPut.append("</tr>");
			sbHTMLOutPut.append("<tr>");
			sbHTMLOutPut.append("<td  height=\"30\">");
			sbHTMLOutPut.append("<input type=\"checkbox\" name=\"isVPMVisible\" value=\"false\" onclick=\"javascript:onChangeDesignCollaboration()\"/>&amp;#160;");
			sbHTMLOutPut.append(EnoviaResourceBundle.getProperty(context, "emxVPMCentralStringResource", locale, "emxVPMCentral.Label.DesignCollaboration"));
			sbHTMLOutPut.append("</td>");
			sbHTMLOutPut.append("</tr>");
		}

		sbHTMLOutPut.append("</table>");
		sbHTMLOutPut.append("</div>");
		return sbHTMLOutPut.toString();

	}
	public void updateWorkUnderChange(Context context, String[] args) throws Exception {

		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");

		HashMap paramMap = (HashMap)programMap.get("paramMap");
		String changeId = (String)paramMap.get("New OID");
		
	}
	public String getWorkUnderField(Context context, String[] args) throws Exception {

			String strWorkUnderDisplay = "";

			try {
				HashMap programMap = (HashMap) JPO.unpackArgs(args);
				HashMap requestMap = (HashMap) programMap.get("requestMap");
				String strObjectId = (String) requestMap.get("objectId");
				if(UIUtil.isNotNullAndNotEmpty(strObjectId)){
					DomainObject domNewObj = DomainObject.newInstance(context, strObjectId);
					if(domNewObj.isKindOf(context, PartMgtConstants.TYPE_PART)){
						IPartService iPartService = IPartService.getService(context,strObjectId);
						IPart iPart=iPartService.getInfo(context);
						String strPolicy = (domNewObj.getPolicy(context)).toString();
						String changeid= domNewObj.getAttributeValue(context, PartMgtConstants.ChangeId);
						if(PartMgtConstants.POLICY_EC_PART.equalsIgnoreCase(strPolicy) ||PartMgtConstants.POLICY_CONFIGURED_PART.equalsIgnoreCase(strPolicy)){
							 if(UIUtil.isNotNullAndNotEmpty(changeid)){
								 String strChangeId =iPart.getAttributeValue(PartMgtConstants.ChangeId);
								 strWorkUnderDisplay = MqlUtil.mqlCommand(context,"print bus $1 select $2 dump",strChangeId,DomainObject.SELECT_NAME);
							 }
						}
					}
				}
			} catch (Exception ex) {
				ex.printStackTrace();
				throw ex;
			}

			return strWorkUnderDisplay;
		
	}
	
	public boolean isChangeSyncEnabled(Context context,String[] args)throws Exception{
        return true;
	}
	 
	 public String getReviseChangeControlled(Context context , String[] args) throws Exception {
		 HashMap programMap = JPO.unpackArgs(args);
		 
		 String strObjectId = PartMgtUtil.getStringValue(programMap, "objectId");
		 
		 if ( PartMgtUtil.isNotNullAndNotEmpty(strObjectId) && DomainObject.newInstance(context, strObjectId).isKindOf(context, PartMgtConstants.TYPE_PART) ) {
			 IPartService iPartService = IPartService.getService(context, strObjectId);
			 
			 return iPartService.getChangeControlledInfo(context).getChangeControlledValue();
		 }
		 
		 return "";
	 }
	 
	public boolean displayWorkUnderChangeField(Context context, String [] args) throws Exception {
		HashMap programMap = JPO.unpackArgs(args);
		
		String strMode = (String) programMap.get("initialMode");	
		String createMode = PartMgtUtil.getStringValue(programMap, "createMode");
		String strFormName = PartMgtUtil.getStringValue(programMap, "form");
		String sEditMode = PartMgtUtil.getStringValue(programMap, "EditMode");
		String sReviseAction = PartMgtUtil.getStringValue(programMap, "reviseAction");
		String sLastRevPolicy = PartMgtUtil.getStringValue(programMap, "lastRevPolicy");
		
		if("MFG".equalsIgnoreCase(createMode) || "MFG".equalsIgnoreCase(sEditMode) || ("TRUE".equalsIgnoreCase(sReviseAction) && PartMgtConstants.POLICY_MANUFACTURING_PART.equalsIgnoreCase(sLastRevPolicy) )) // For Manufacturing part hide work under change from Create Part form and Edit Part form.
			return false;
		
		if("type_PartSlidein".equals(strFormName)) // To hide  WorkUnderChangeField in Slidein(RMB) in view mode.
			return "edit".equalsIgnoreCase(PartMgtUtil.getStringValue(programMap, "mode"));
			
		// Hide work under change field if it is create Part from BOM powerview 
		return !( "view".equalsIgnoreCase(strMode) || "EBOM".equals(createMode) || "EBOMReplaceNew".equals(createMode) );
	}
	
	public boolean displayConfiguredField(Context context, String [] args) throws Exception {
		HashMap programMap = JPO.unpackArgs(args);
		String sReviseAction = PartMgtUtil.getStringValue(programMap, "reviseAction");
		String sLastRevPolicy = PartMgtUtil.getStringValue(programMap, "lastRevPolicy");
		
		if("TRUE".equalsIgnoreCase(sReviseAction) && PartMgtConstants.POLICY_MANUFACTURING_PART.equalsIgnoreCase(sLastRevPolicy))
			return false;
		
		return true;
	}
	
	public boolean displayReleaseProcessField(Context context, String [] args) throws Exception {
		HashMap programMap = JPO.unpackArgs(args);
		String sReviseAction = PartMgtUtil.getStringValue(programMap, "reviseAction");
		String sLastRevPolicy = PartMgtUtil.getStringValue(programMap, "lastRevPolicy");
		
		if("TRUE".equalsIgnoreCase(sReviseAction) && PartMgtConstants.POLICY_MANUFACTURING_PART.equalsIgnoreCase(sLastRevPolicy))
			return false;
		
		return true;
	}
	
	public boolean displayDesignCollaboration(Context context, String [] args) throws Exception {
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		boolean isOCDXUser = SynchronizationUtil.isOCDXUser(context);
		if(!isOCDXUser){
			String objectId = (String)programMap.get("objectId");
			IPartService iPart = IPartService.getService(context, objectId);
			return (iPart.getInfo(context).isVPMVisible() && !iPart.isCollaboratedWithDesign(context));
		}
		else{	 return isOCDXUser;		}
		
	}
	
	 // for clone and revise to field type program dummy function
	public String dummyFunction(Context context, String[] args) {
		return "";
	}
	
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public int massPartUpdate(Context context, String args[]) throws Exception {
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		
		Map tableData = (Map) programMap.get("tableData");
		
		MapList tableRowList = (MapList) tableData.get("ObjectList");
		
		Map <String, Object> organizedMap = PartMgtUtil.getOrganizedDataMap(tableRowList, PartMgtConstants.SELECT_ID, null);
		
		BusinessObjectWithSelectItr businessObjectWithSelectItr = PartMgtKernel.busWithSelectListItr( context, 
																												organizedMap.keySet().toArray( new String[0] ), 
																												PartMgtUtil.createStringList( new String [] { PartMgtConstants.SELECT_ID, PartMgtConstants.SELECT_MODIFIED } ) );
		String modifiedDate, modifiedObjectId;
		String initialLoadDateModified;
		MapList modifiedObjectList = new MapList();
		Map rowDataMap;
		
		while ( businessObjectWithSelectItr.next() ) {
			modifiedObjectId = businessObjectWithSelectItr.obj().getSelectData(PartMgtConstants.SELECT_ID);
			modifiedDate = businessObjectWithSelectItr.obj().getSelectData(PartMgtConstants.SELECT_MODIFIED);
			rowDataMap = (Map) organizedMap.get(modifiedObjectId);
			initialLoadDateModified = (String) rowDataMap.get(PartMgtConstants.SELECT_MODIFIED);
			
			if ( !initialLoadDateModified.equals(modifiedDate) ) {
				modifiedObjectList.add(rowDataMap);
			}
		}
		
		Map <String, StringList> organizedGroupedDataMap = PartMgtUtil.getOrganizedGroupedDataMap(modifiedObjectList, "WorkUnderOID", PartMgtConstants.SELECT_ID);
		
		IUserFactChangeLogService iUserFactChangeLogService = IUserFactChangeLogService.getService();
		for ( Entry <String, StringList> entry : organizedGroupedDataMap.entrySet() ) {
			
			if ("WorkUnderOID".equals( entry.getKey() ) ) {
				IPartCollaborationService iPartCollabService = new PartCollaborationService();
				iPartCollabService.setCollaboratToDesign(true);
				iPartCollabService.performCollabOperation(context, new ArrayList(entry.getValue()), IPartValidator.OPERATION_MODIFY);
			}
			
			else {
				ECMUtil.setWorkUnderChange( context, entry.getKey() );
				
				try {
					iUserFactChangeLogService.updateObjectUserFact(context, entry.getValue(), IUserFactChangeLogService.USER_EVENT_OBJECT_MODIFY);
				}

				finally {
					ECMUtil.clearWorkUnderChange(context);
				}
			}
		}
		
		return 0;
	}
	
	/**Field Function to fetch the Maturity of the collaborated Product.
	 * @param context eMatrix Context object.
	 * @param args
	 * @return String value of the maturity of the collaborated Product.
	 * @throws Exception
	 */
	public String displayProductMaturity(Context context, String[] args) throws Exception {
			HashMap programMap = JPO.unpackArgs(args);
			HashMap requestMap = (HashMap) programMap.get("requestMap");
			String partId = (String)requestMap.get("objectId");
			String strState = "";
			
			IPartService iPartService = IPartService.getService(context, partId); 
			String prodId = iPartService.getCollaboratedDesignId(context);
			
			if(UIUtil.isNotNullAndNotEmpty(prodId)){
				StringList selectStmtsList = new StringList();
				selectStmtsList.add(PartMgtConstants.SELECT_POLICY);
				selectStmtsList.add(PartMgtConstants.SELECT_CURRENT);

				DomainObject domObj = new DomainObject(prodId);

				Map <String, String> prodDataMap = domObj.getInfo(context, selectStmtsList);
				
		        String strProdPolicy = prodDataMap.get(PartMgtConstants.SELECT_POLICY);
		        String strProdState = prodDataMap.get(PartMgtConstants.SELECT_CURRENT);
		        String strProdStateKey = "emxFramework.State."+strProdPolicy+"."+strProdState;
		        strState = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),strProdStateKey);
			}

			return strState;
	}
}
