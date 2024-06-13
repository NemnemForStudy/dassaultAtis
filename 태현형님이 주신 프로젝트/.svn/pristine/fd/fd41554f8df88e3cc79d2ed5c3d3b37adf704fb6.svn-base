/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 */

import java.util.HashMap;
import java.util.Map;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;

import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.dassault_systemes.enovia.bom.ReleasePhase;
import com.matrixone.apps.framework.ui.UIUtil;

import com.dassault_systemes.enovia.partmanagement.modeler.constants.PartMgtConstants;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.dvo.IEngineeringViewRefinements;
import com.dassault_systemes.enovia.partmanagement.modeler.interfaces.services.IMyEngineeringViewService;
import com.dassault_systemes.enovia.partmanagement.modeler.kernel.PartMgtKernel;
import com.dassault_systemes.enovia.partmanagement.modeler.util.MyEngineeringViewUIUtil;
import com.dassault_systemes.enovia.partmanagement.modeler.util.PartMgtUtil;


/**
 * The <code>emxPartBase</code> class contains implementation code for emxPart.
 *
 * @version EC 9.5.JCI.0 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class enoENGViewBase_mxJPO
{

	/**
	 * returns the list of policies governing Part type in dropdown range value form 
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static HashMap getPartPolicies(Context context, String[] args) throws Exception{
		StringList policyList = FrameworkUtil.split(PartMgtKernel.printType(context, PartMgtConstants.TYPE_PART, PartMgtConstants.SELECT_POLICY),"|");//new StringList(PartMgtConstants.TYPE_PART);
		policyList = MyEngineeringViewUIUtil.excludeFromList(context, policyList, "emxPartManagement.EngView.SearchCriteria.ExcludePolicies", null);
		StringList policyDisplayList =  MyEngineeringViewUIUtil.getUniqueDisplayPolicyList(context, policyList);
		return MyEngineeringViewUIUtil.getRangeValuesForDropdown(context, policyList, policyDisplayList, "range", true);
	}

	/**
	 *  returns the list of policies governing Specification types in dropdown range value form 
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static HashMap getSpecificationsPolicy(Context context, String[] args) throws Exception{
		StringList specTypes = (StringList)MyEngineeringViewUIUtil.getSpecificationTypesBasedOnVersion(context, MyEngineeringViewUIUtil.getPartSpecificationTypes(context)).get("versionTypes");
		StringList specPolicyList = MyEngineeringViewUIUtil.getUniqueActualPolicyList(context, specTypes);
		specPolicyList = MyEngineeringViewUIUtil.excludeFromList(context, specPolicyList, "emxPartManagement.EngView.SearchCriteria.ExcludePoliciesSpecs", null);
		StringList policyDisplayList = MyEngineeringViewUIUtil.getUniqueDisplayPolicyList(context, specPolicyList);
		return MyEngineeringViewUIUtil.getRangeValuesForDropdown(context, specPolicyList, policyDisplayList, "range", true);
	}
	
	/**
	 * returns the policy states in checkbox form
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static String getStatesforPolicy(Context context, String[] args) throws Exception{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		StringList typeList = FrameworkUtil.split((String)requestMap.get("searchType"), ",");
		String searchView = (String)requestMap.get("searchView");
		String excludePolicy = (searchView.equals("PartView")) ? "emxPartManagement.EngView.SearchCriteria.ExcludePolicies" : "emxPartManagement.EngView.SearchCriteria.ExcludePoliciesSpecs";
		StringList actualPolicyList = MyEngineeringViewUIUtil.getUniqueActualPolicyList(context, typeList);
		actualPolicyList = MyEngineeringViewUIUtil.excludeFromList(context, actualPolicyList, excludePolicy, null);
		HashMap actualAndDisplayStateMap = MyEngineeringViewUIUtil.getActualAndDisplayStateName(context, actualPolicyList);
		StringList actualStateList = (StringList)actualAndDisplayStateMap.get("actualState");
		StringList ocdxStateList = (StringList)actualAndDisplayStateMap.get("displayState");
		return showStateListinCheckboxForm(context, actualStateList, ocdxStateList);
	}

	/**
	 * returns the policy states in checkbox form
	 * @param context
	 * @param actualStateList
	 * @param ocdxStateList
	 * @return
	 * @throws MatrixException
	 */
	private static String showStateListinCheckboxForm(Context context, StringList actualStateList, StringList ocdxStateList) throws MatrixException{
		Map<String,String> stateDisplay = new HashMap<String,String>();
		StringBuffer sb = new StringBuffer();
		sb.append("<table>");
		sb.append("<tr><td align =\"center\" valign=\"center\"><input type=\"checkbox\" name=\"State\" value=\"*\" onclick=\"javascript:validateCheckedStates()\">&nbsp;");
		sb.append(PartMgtUtil.getDisplayPropertyValue(context, "emxPartManagement.Common.All", "emxPartManagementStringResource"));
		sb.append("</td>");
		sb.append("<td style=\"width:30px\"/>");
		sb.append("<td>");
		sb.append("<table cellspacing=\"5\">");
		for(int i=0;i<actualStateList.size();i++) {
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<input type=\"checkbox\" name=\"State\" value=\"");
			sb.append(actualStateList.get(i));
			sb.append("\">&nbsp;");
			sb.append(ocdxStateList.get(i));
			stateDisplay.put(actualStateList.get(i), ocdxStateList.get(i));
			sb.append("</td>");
			sb.append("</tr>");
		}
		sb.append("<input type=\"hidden\" name=\"StateDisplayValue\" value=\"");
		sb.append(stateDisplay);
		sb.append("\">");
		sb.append("</table>");
		sb.append("</td>");
		sb.append("</tr>");
		sb.append("</table>");
		return sb.toString();
	}

	/**
	 * Release phase values as dropdown list for given type
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static Object getReleasePhaseRanges(Context context, String[] args) throws Exception{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap)programMap.get("requestMap");
		String sTypeAdmin = (String)requestMap.get(PartMgtConstants.SELECT_TYPE);
		if(UIUtil.isNullOrEmpty(sTypeAdmin)) {
			sTypeAdmin = PartMgtConstants.TYPE_PART;

		}
		String objectId = (String)requestMap.get("objectId");

		if(sTypeAdmin.indexOf("_selectedType:")>-1)
			sTypeAdmin = sTypeAdmin.substring("_selectedType:".length());
		StringList sType_Admin_List = FrameworkUtil.split(sTypeAdmin, ",");
		String sType = (String)sType_Admin_List.get(0);
		sType = ("*".equals(sType)) ? PartMgtKernel.getInfo(context, objectId, PartMgtConstants.SELECT_TYPE): sType;
		sType = ((sType).indexOf("type_") >-1) ? PartMgtUtil.getActualSchemaName(context, sType):sType;

		return ReleasePhase.getPhaseList(context, sType);
	}

	/**
	 * updates the release phase values on selection of type in Search Criteria form
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static HashMap updateReleasePhase(Context context, String[] args)throws Exception{
		StringList fieldChoices = (StringList)((HashMap)getReleasePhaseRanges(context, args)).get("field_choices");
		StringList fieldDisplayChoices = (StringList)((HashMap)getReleasePhaseRanges(context, args)).get("field_display_choices");
		return MyEngineeringViewUIUtil.getRangeValuesForDropdown(context, fieldChoices, fieldDisplayChoices, "reload", false);
	}

	/**
	 * shows the context user in Owner field of Search Criteria
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String getContextOwner(Context context, String[] args) throws Exception{
		return context.getUser();
	}

	/**
	 * Reloads Policy field values on Selection of Type
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static HashMap reloadPolicyOnTypeSelection(Context context, String[] args) throws Exception{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap)programMap.get("requestMap");
		String selType = (String)((HashMap)programMap.get("fieldValues")).get("Type");
		String sTypeAdmin = (String)requestMap.get(PartMgtConstants.SELECT_TYPE);
		String searchView = (String)requestMap.get("searchView");
		if(PartMgtUtil.isNullOrEmpty(sTypeAdmin) && PartMgtUtil.isNotNullAndNotEmpty(selType)) {
			sTypeAdmin = selType;
		}
		if(PartMgtUtil.isNotNullAndNotEmpty(sTypeAdmin)){
			String excludePolicy = (searchView.equals("PartView")) ? "emxPartManagement.EngView.SearchCriteria.ExcludePolicies" : "emxPartManagement.EngView.SearchCriteria.ExcludePoliciesSpecs";
			StringList strfieldChoices = FrameworkUtil.split(PartMgtKernel.printType(context, sTypeAdmin, PartMgtConstants.SELECT_POLICY),"|");
			strfieldChoices = MyEngineeringViewUIUtil.excludeFromList(context, strfieldChoices, excludePolicy, null);
			StringList strFieldDisplay = MyEngineeringViewUIUtil.getUniqueDisplayPolicyList(context, strfieldChoices);
			return MyEngineeringViewUIUtil.getRangeValuesForDropdown(context, strfieldChoices, strFieldDisplay, "reload", true);
		}
		return new HashMap();
	}   

	/**
	 * 
	 * @param context
	 * @param paramMap
	 * @return
	 * @throws MatrixException
	 */
	private int getQueryLimit(Context context, Map paramMap) throws MatrixException {
		String searchQueryLimit = (String) paramMap.get("QueryLimit");

		if ( PartMgtUtil.isNullOrEmpty(searchQueryLimit) ) {
			String initialQueryLimit = (String) paramMap.get("initialQueryLimit");
			searchQueryLimit = PartMgtUtil.isNullOrEmpty(initialQueryLimit) ? PartMgtUtil.getPropertyValue(context, "emxPartManagement.MyENGViewInitialLoad.QueryLimit") : initialQueryLimit;
		}

		return PartMgtUtil.getValueInShort(searchQueryLimit);
	}

	/**
	 * type of object to be filtered
	 * @param paramMap
	 * @return
	 */
	private String getSelectedType(Map paramMap) {
		String searchType = (String) paramMap.get("Type");

		String sFromExportToExcel = (String) paramMap.get("sFromExportToExcel");
		String selType = ( "True".equalsIgnoreCase(sFromExportToExcel) ) ? (String) paramMap.get("sSelType") 
				: (String) paramMap.get("type"); 

		return (PartMgtUtil.isNullOrEmpty(searchType) || PartMgtConstants.QUERY_WILDCARD.equals(searchType)) ? selType : searchType;
	}
	
	

	/**
	 * based on type, gives the Engineering View to be filtered
	 * @param searchType
	 * @return
	 */
	private String getEngineeringView(Context context, String searchType) throws Exception {
		if ( "Change".equalsIgnoreCase(searchType) ) {
			return IEngineeringViewRefinements.CHANGE_VIEW;
		}

		else if ( CommonDocument.TYPE_DOCUMENTS.equalsIgnoreCase(searchType) ) {
			return IEngineeringViewRefinements.REFERENCE_DOCUMENT_VIEW;
		}

		else if (searchType.indexOf(PartMgtConstants.TYPE_CAD_MODEL) > -1) {
			return IEngineeringViewRefinements.SPECIFICATION_VIEW;
		}

		return IEngineeringViewRefinements.PART_VIEW;
	}

	/**
	 * Displays the objects in My Engineering View home page
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList findMyViewObjects(Context context, String [] args)throws Exception {
		HashMap paramMap = JPO.unpackArgs(args);

		IMyEngineeringViewService iEngineeringViewService;
		Boolean fromChart= Boolean.valueOf((String)paramMap.get("openedFromChart")) ;
		if(fromChart == null){
			fromChart = false;
		}
		String searchEngine = (String) paramMap.get("SearchEngine");
		iEngineeringViewService = ( "Indexed".equalsIgnoreCase(searchEngine) ) ? IMyEngineeringViewService.getService(context, IMyEngineeringViewService.SEARCH_ENGINE_INDEXED)
				: IMyEngineeringViewService.getService(context, IMyEngineeringViewService.SEARCH_ENGINE_REAL_TIME);

		String searchType = getSelectedType(paramMap);
		String searchView = (String) paramMap.get("searchView");
		String engineeringView = (PartMgtUtil.isNullOrEmpty(searchView)) ?  getEngineeringView(context, searchType) : searchView;
		
		IEngineeringViewRefinements iEngineeringViewRefinements = IEngineeringViewRefinements.getService(context, engineeringView);
		iEngineeringViewRefinements.setObjectSelect(context, new String [] { DomainConstants.SELECT_ID, PartMgtConstants.SELECT_ORIGINATED, PartMgtConstants.SELECT_TYPE } );
		iEngineeringViewRefinements.setQueryLimit( getQueryLimit(context, paramMap) );
		if(!searchType.equals(PartMgtConstants.QUERY_WILDCARD) && !fromChart) {
			iEngineeringViewRefinements.setType(context, new String [] {searchType});
		}
		String sFilterResult = (String)paramMap.get("filterResult");
		if("true".equals(sFilterResult)){
			addSearchRefinements(context, iEngineeringViewRefinements, paramMap);
		}
		MapList ObjectList = iEngineeringViewService.getObjects(context, iEngineeringViewRefinements);
		boolean showLimitMessage = false;
		if(ObjectList.size()>=getQueryLimit(context, paramMap)){
			showLimitMessage = true;
		}
		if(showLimitMessage){
			String  strError = PartMgtUtil.getDisplayPropertyValue(context,"emxEngineering.MyEngViewObjects.LimitReached", "emxEngineeringCentralStringResource");
			strError = FrameworkUtil.findAndReplace(strError, "{0}", String.valueOf(getQueryLimit(context, paramMap)));
			StringBuilder sb = new StringBuilder(strError);
			sb.insert(0, "Transient:");
			emxContextUtil_mxJPO.mqlNotice(context, sb.toString());
		}

		return ObjectList;
	}

	/**
	 * Add additional filter conditions when Search Criteria is done
	 * @param context
	 * @param iEngineeringViewRefinements
	 * @param paramMap
	 * @throws Exception
	 */
	private void addSearchRefinements(Context context, IEngineeringViewRefinements iEngineeringViewRefinements, HashMap paramMap)throws Exception{
		String searchView = (String) paramMap.get("searchView");
		if(searchView.equals("PartView")) {
			iEngineeringViewRefinements.setReleasePhase(context, new String [] {(String)paramMap.get("ReleasePhase")});
		}
		iEngineeringViewRefinements.setState(context, getOCDXStates((String)paramMap.get("State")));
		iEngineeringViewRefinements.setPolicie(context, new String [] {(String)paramMap.get("Policy")});
		iEngineeringViewRefinements.setTitle(context, new String [] {(String)paramMap.get("Title")});
		if(UIUtil.isNotNullAndNotEmpty((String)paramMap.get("Owner"))) {
			iEngineeringViewRefinements.setOwner(context, new String [] {(String)paramMap.get("Owner")});
		}
		if(UIUtil.isNotNullAndNotEmpty((String)paramMap.get("Name"))){
			iEngineeringViewRefinements.setName(context, new String [] {(String)paramMap.get("Name")});
		}
		
	}
	private String[] getOCDXStates(String states) {
		String [] stateList = null;
		if(states != null) {
			stateList = states.split(",");
		}
		return stateList;
	}


	/**
	 * Reloads the state field values when Policy field is chosen in Search Criteria form
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static Object reloadStatesOnPolicySelection(Context context, String[] args) throws Exception{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String policy = (String)((HashMap)programMap.get("fieldValues")).get("Policy");
		if(PartMgtConstants.QUERY_WILDCARD.equals(policy)) {
			StringList ret = new StringList(getStatesforPolicy(context, args));
			return MyEngineeringViewUIUtil.getRangeValuesForDropdown(context, ret, ret, "selected", false);
		}
		HashMap actualAndDisplayStateMap = MyEngineeringViewUIUtil.getActualAndDisplayStateName(context, new StringList(policy));
		StringList actualStateList = (StringList)actualAndDisplayStateMap.get("actualState");
		StringList ocdxStateList = (StringList)actualAndDisplayStateMap.get("displayState");
		StringList finalStateList = new StringList(showStateListinCheckboxForm(context, actualStateList, ocdxStateList));
		return MyEngineeringViewUIUtil.getRangeValuesForDropdown(context, finalStateList, finalStateList, "selected", false);
	}

}


