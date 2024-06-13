import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;

import com.dassault_systemes.changegovernance.interfaces.IChangeGovernanceServices.UserGroup;
import com.dassault_systemes.enovia.changerequest.factory.ChangeRequestFactory;
import com.dassault_systemes.enovia.changerequest.interfaces.IChangeRequest;
import com.dassault_systemes.enovia.changerequest.interfaces.IChangeRequestServices;
import com.dassault_systemes.enovia.enterprisechange.modeler.ChangeOrder;
import com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants;
import com.dassault_systemes.enovia.enterprisechangemgt.util.ChangeUtil;
import com.dassault_systemes.enovia.enterprisechangemgtapp.common.ChangeRequest;
import com.dassault_systemes.enovia.changerequest.interfaces.IChangeAnalysis;
import com.dassault_systemes.oslc.utils.OslcCommonUtils;
import com.matrixone.apps.common.Person;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.StringUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.framework.ui.UICache;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;

import matrix.db.Attribute;
import matrix.db.AttributeList;
import matrix.db.AttributeType;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

public class enoECMChangeRequestUXBase_mxJPO extends emxDomainObject_mxJPO {

	public static final String SUITE_KEY = "EnterpriseChangeMgt";

	private ChangeUtil changeUtil       =  null;

	public enoECMChangeRequestUXBase_mxJPO(Context context, String[] args)throws Exception {
		super(context, args);
		changeUtil    = new ChangeUtil();
		// TODO Auto-generated constructor stub
	}
	/*
	 *   Returns a JsonObject with required information to perform a Drag and drop Operation. 
	 *   @args: Will have the information of the Dragged Object and the Dropped Object in the following format.
	 *   		drop={"window":"ECMCRChangeOrders","columnName":,"timestamp":"","object":{"oid":,:,"rid":}}
	 * 			drag={"objects":[{"icon":,"id":,"oid":,"rid":,"type":},{"icon":,"id":,"oid":,"rid":,"type":}],"action":,"window":}}
	 *   @return JsonObject with contains the information about the operation is pass or fail along with relationship id's of the connected objects.
	 *   @throws Exception if error encountered while carrying out the request
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public JsonObject dropCAProcess(Context context, String[] args) throws Exception{

		Map param = (Map)JPO.unpackArgs(args);
		System.out.println(param);
		StringBuffer returnMsgBuffer = new StringBuffer();
		JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
		JsonObject jsonObject ;

		try{

		String dropString = param.get("drop").toString();
		String dragString = param.get("drag").toString();
		System.out.println("drop String  "+dropString);
		System.out.println("drag String  "+dragString);
		JsonReader dropReader = Json.createReader(new StringReader(dropString));
		JsonObject dropJson =  dropReader.readObject();
		JsonReader dragReader = Json.createReader(new StringReader(dragString));
		JsonObject dragJson =  dragReader.readObject();
		JsonObject dropJsonObject = dropJson.getJsonObject("object");
		String dropObjectId = dropJsonObject.getString("oid");	
			ChangeOrder objChangeOrder=new ChangeOrder(dropObjectId);
		JsonArray jDragObjectArray = dragJson.getJsonArray("objects");
		String object[]=new String[jDragObjectArray.size()];
		for(int index=0;index<jDragObjectArray.size();index++){
			JsonObject dragJsonObject = (JsonObject) jDragObjectArray.getJsonObject(index);
			String dragObjectId = dragJsonObject.getString("oid");
			object[index] = dragObjectId;
			}

		//Connect CO and CA
			objChangeOrder.addChangeActions(context, object);
		
			returnMsgBuffer.append("  var coContentFrame  =findFrame(getTopWindow(),\"ECMCRChangeOrders\");");
			returnMsgBuffer.append(" coContentFrame.location.href =coContentFrame.location.href ;");
			returnMsgBuffer.append("  var caContentFrame  =findFrame(getTopWindow(),\"ECMUndispatchedCA\");");
			returnMsgBuffer.append(" caContentFrame.editableTable.loadData();");
			returnMsgBuffer.append("caContentFrame.rebuildView();");
		
		jsonObjBuilder.add("result", "pass");
		jsonObjBuilder.add("onDrop", "function () {"+returnMsgBuffer.toString()+"}");

		jsonObject = jsonObjBuilder.build();

		}
		catch (Exception e)
		{	
			jsonObjBuilder.add("result", "fail");
			jsonObjBuilder.add("message", e.toString());
			jsonObject = jsonObjBuilder.build();
			throw new Exception(e.toString());
		}

		return jsonObject;
	}
	
	/**
	 * Method to get Legacy Changes
	 * @param context   the eMatrix <code>Context</code> object
	 * @param           String[] of ObjectIds.
	 * @return          Object containing CO objects
	 * @throws          Exception if the operation fails
	 * @since           ECM R212
	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getLegacyChanges(Context context, String args[]) throws Exception
	{
		MapList sTableData 			= new MapList();
		MapList sResultList 		= new MapList();
		StringList s1 				= new StringList();
		HashMap programMap          = (HashMap)JPO.unpackArgs(args);
		String strObjectId			= (String)programMap.get("objectId");
		HashMap requestMap          = (HashMap)programMap.get("requestMap");
		String filterToolbar 		= (String)programMap.get("toolbar");
		Map tmpMap 					= UICache.getMenu(context, filterToolbar);
		MapList filterCmdsList 		= (MapList)tmpMap.get("children");
		Map filterOptCmdMap 		= (Map)filterCmdsList.get(0);
		String filterOptCmd 		= (String)filterOptCmdMap.get("name");

		Map commandInfoMap 			= (Map)UICache.getCommand(context, filterOptCmd);
		Map commandSetting 			= (Map)commandInfoMap.get("settings");
		String sRangeProgram 		= (String)commandSetting.get("Range Program");
		String sRangeFunction 		= (String)commandSetting.get("Range Function");
		HashMap sRangeProgramResultMap = (HashMap)JPO.invoke(context, sRangeProgram, null,
				sRangeFunction, JPO.packArgs(new HashMap()), HashMap.class);

		StringList choicesList 			= null;
		String singleSearchType 		="";
		String cmdLabel 				= "";
		String commandName 				= "";
		String sDisplayValue 			= "";
		String sActualValue 			= "";
		String sRegisteredSuite 		= "";
		String strStringResourceFile 	= "";
		String sRequiredCommand 		= "";
		String searchType   			= "";
		String sLegacytype 				= "";

		StringList strList = new StringList();
		strList.add(SELECT_NAME);
		strList.add(SELECT_TYPE);
		strList.add(SELECT_ID);
		String wherClause = SELECT_CURRENT + "== 'Active' ";
		StringBuffer sbSearchType = new StringBuffer();

		if(sRangeProgramResultMap!=null){
			choicesList 		= (StringList)sRangeProgramResultMap.get("field_display_choices");
			if(choicesList!=null)
				singleSearchType 	= (String)choicesList.get(0);
		}
		//Getting the ECM Menu details and its commands
		HashMap menuMap 	= UICache.getMenu(context, "ECMChangeLegacyMenu");
		String sECMMenu 	= (String)menuMap.get("name");
		MapList commandMap 	= (MapList)menuMap.get("children");
		if(commandMap!=null){
			Iterator cmdItr = commandMap.iterator();
			while(cmdItr.hasNext())	{
				Map tempMap = (Map)cmdItr.next();
				commandName = (String)tempMap.get("name");
				HashMap cmdMap = UICache.getCommand(context, commandName);
				HashMap settingMap = (HashMap)cmdMap.get("settings");
				cmdLabel = (String)cmdMap.get("label");
				sRegisteredSuite = (String)settingMap.get("Registered Suite");


				//strStringResourceFile = UINavigatorUtil.getStringResourceFileId(sRegisteredSuite);


				StringBuffer strBuf = new StringBuffer("emx");
				strBuf.append(sRegisteredSuite);
				strBuf.append("StringResource");

				sDisplayValue =EnoviaResourceBundle.getProperty(context, strBuf.toString(), context.getLocale(),cmdLabel);
				if(sDisplayValue.equals(singleSearchType)){
					sRequiredCommand =  commandName;
					break;
				}
			}
		}

		if(!UIUtil.isNullOrEmpty(sRequiredCommand)){
			HashMap cmdMap = UICache.getCommand(context, sRequiredCommand);
			String cmdHref = (String)cmdMap.get("href");
			HashMap settingsMap = (HashMap)cmdMap.get("settings");
			searchType = (String)settingsMap.get("searchType");
		}
		//Getting ECM details

		if(!UIUtil.isNullOrEmpty(searchType)){
			StringList sTypeList = FrameworkUtil.split(searchType, ",");
			for(int i= 0; i<sTypeList.size(); i++){
				String single = (String)sTypeList.get(i);
				sLegacytype = PropertyUtil.getSchemaProperty(context,single);
				sbSearchType.append(sLegacytype);
				if(i!=sTypeList.size()-1)
					sbSearchType.append(",");
			}
		}

		try{
			if(!UIUtil.isNullOrEmpty(sbSearchType.toString()))
				if(UIUtil.isNullOrEmpty(strObjectId))
				sTableData = DomainObject.findObjects(context, sbSearchType.toString(), "*", null, strList);
				else{
					DomainObject partObject=new DomainObject(strObjectId);
					sResultList= partObject.getRelatedObjects(context, 
							  											QUERY_WILDCARD, 
							  											sbSearchType.toString(), 
							  											strList, 
																	  	null, 
																	  	true, 
																	  	false, 
																	  	(short)1, 
																	  	null, 
															  			null,
															  			0);
					
					Iterator itr = sResultList.iterator();
					while (itr.hasNext())
					{
						Map sChangeObject = (Map) itr.next();
						String sChangeId = (String) sChangeObject.get(SELECT_ID);
						if(!s1.contains(sChangeId)){
							s1.add(sChangeId);
							sTableData.add(sChangeObject);
						}
					}
				}
		}
		catch (Exception ex) {
			ex.printStackTrace();
			throw new FrameworkException(ex.getMessage());
		}
		if(sTableData!=null)
			return sTableData;
		else
			return new MapList();



	}
    /**
  	 * Select the Reported Against Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Contributor Field.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String selectReportedAgainst(Context context,String[] args)throws Exception
	{
		boolean bIsOslcConfigured = false;
		StringBuilder sb = new StringBuilder();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String strMode = (String) requestMap.get("mode");
		String changeId = (String) requestMap.get("objectId");
		String portalMode = (String) requestMap.get("portalMode");
		String targetLocation = (String) requestMap.get("targetLocation");
		String targetWindow = EMPTY_STRING;
		String strOldReportedAginstId = EMPTY_STRING;
		String strOldReportedAginstName = EMPTY_STRING;
		String strOldReportedAginstType = EMPTY_STRING;
		String strOldReportedAginstTypeIcon = EMPTY_STRING;
		String strLanguage = context.getSession().getLanguage();
		bIsOslcConfigured = OslcCommonUtils.isOSLCEnabled();
		DomainObject domObjet = null;

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}



		if(!ChangeUtil.isNullOrEmpty(changeId)){
			domObjet = new DomainObject(changeId);
			StringList slSelect = new StringList("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.id");
			slSelect.add("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.name");
			slSelect.add("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.type");
			Map mObjInfo = domObjet.getInfo(context, slSelect);
			strOldReportedAginstId = (String) mObjInfo.get("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.id");
			strOldReportedAginstName = (String) mObjInfo.get("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.name");
			strOldReportedAginstType = (String) mObjInfo.get("from["+ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE+"].to.type");
			
			if(!ChangeUtil.isNullOrEmpty(strOldReportedAginstId)){
				strOldReportedAginstTypeIcon = UINavigatorUtil.getTypeIconProperty(context, strOldReportedAginstType);
			}else{
				strOldReportedAginstName = strOldReportedAginstType = strOldReportedAginstId =EMPTY_STRING;
			}
		}

		if("edit".equalsIgnoreCase(strMode)|| "create".equalsIgnoreCase(strMode))
		{
			
			String nlsNative = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Command.Native",strLanguage);
			String nlsExternal = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Command.External",strLanguage);
			String nlsClear = EnoviaResourceBundle.getProperty(context, SUITE_KEY,"EnterpriseChangeMgt.Command.Clear",strLanguage);
			
			if(!bIsOslcConfigured)
				nlsNative = "...";
			
			String searchTypes = (String)changeUtil.getRelationshipTypes(context,ChangeConstants.RELATIONSHIP_REPORTED_AGAINST_CHANGE,true,false,null);
			// "TYPES="+searchTypes
			
			portalMode = "true".equalsIgnoreCase(portalMode)?portalMode:"false";
			if("slidein".equalsIgnoreCase(targetLocation)){
				 targetWindow = "frames.slideInFrame";
			}else{
				if(domObjet.isKindOf(context, ChangeConstants.TYPE_CHANGE_ORDER)){
					targetWindow = "findFrame(getTopWindow(),\"ECMCOProperties\")";					
				}else if(domObjet.isKindOf(context, ChangeConstants.TYPE_CHANGE_REQUEST)){
					targetWindow = "findFrame(getTopWindow(),\"ECMCRProperties\")";
				}else if(domObjet.isKindOf(context, ChangeConstants.TYPE_CHANGETEMPLATE)){
					targetWindow = "findFrame(getTopWindow(),\"detailsDisplay\")";
				}
			}
			
			sb.append("<table>");
				sb.append("<tbody>");
					sb.append("<tr>");
						sb.append("<td>");
							sb.append("<input type=\"hidden\" name=\"ReportedAgainstfieldValue\" value=\""+strOldReportedAginstId+"\"/>");
							sb.append("<input type=\"hidden\" name=\"ReportedAgainst\" value=\""+strOldReportedAginstName+"\"/>");
							sb.append("<input type=\"hidden\" name=\"ReportedAgainstOID\" value=\""+strOldReportedAginstId+"\"/>");
							sb.append("<input type=\"text\" name=\"ReportedAgainstDisplay\" value=\""+strOldReportedAginstName+"\" maxlength=\"\" size=\"20\" />");
						sb.append("</td>");
						sb.append("<td>");
		
						sb.append("<input type=\"button\" name=\"btnReportedAgainst\" value=\""+ XSSUtil.encodeForHTMLAttribute(context, nlsNative) + "\" onclick=\"javascript:showChooser('../common/emxFullSearch.jsp?field=TYPES="+searchTypes+"&hideHeader=true&selection=single&fieldNameActual=ReportedAgainst&targetRelName=relationship_ReportedAgainstChange&suiteKey=EnterpriseChangeMgt&HelpMarker=emxhelpfullsearch&fieldNameOID=ReportedAgainstOID&table=APPECReportedAgainstSearchList&fieldNameDisplay=ReportedAgainstDisplay&&submitURL=AEFSearchUtil.jsp','600','600','true','','ReportedAgainst')\" />");
		
						sb.append("</td>");
						if(bIsOslcConfigured){
							
							sb.append("<td>");
			
								sb.append("<input type=\"button\" name=\"btnReportedAgainst\" value=\""+ XSSUtil.encodeForHTMLAttribute(context, nlsExternal) +"\" onclick=\"javascript:loadDelegatedUIEditChange('"+ XSSUtil.encodeForHTMLAttribute(context, portalMode)+"','"+ XSSUtil.encodeForHTMLAttribute(context, targetWindow)+"')\" />");
			
							sb.append("</td>");
						}
						sb.append("<td>");
		
							sb.append("<a href=\"javascript:basicClear('ReportedAgainst')\">");
							sb.append(XSSUtil.encodeForHTMLAttribute(context, nlsClear));
							sb.append("</a>");
		
						sb.append("</td>");
					sb.append("</tr>");		
				sb.append("</tbody>");
			sb.append("</table>");


		}else
		{

			if (strOldReportedAginstName!=null && !strOldReportedAginstName.isEmpty()) {

				//XSSOK
				String strTreeLink = "<a class=\"object\" href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, strOldReportedAginstId) + "', '800', '575','true','content')\"><img border='0' src='../common/images/"+XSSUtil.encodeForHTMLAttribute(context, strOldReportedAginstTypeIcon)+"'></img>"+XSSUtil.encodeForHTML(context, strOldReportedAginstName)+"</a>";
				if(!exportToExcel)
					sb.append(strTreeLink);
			}

		}
		return sb.toString();
	}	

    /**
  	 * Get change request from affected item
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return change request details
  	 * @throws FrameworkException if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public MapList getChangeRequestsFromAffectedItemsIds(Context context, String []args) throws Exception {
		
			HashMap paramMap     = (HashMap)JPO.unpackArgs(args);
			String strObjectId = (String)paramMap.get(ChangeConstants.OBJECT_ID);
			String physicalId = new DomainObject(strObjectId).getInfo(context, "physicalid");
			return new ChangeRequest().getChangeRequestsFromAffectedItemsIds(context, physicalId);
	}	

    /**
  	 * Get change request name for table view
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return change request name field values
  	 * @throws FrameworkException if operation fails.
  	 */	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static StringList getChangeRequestName(Context context,
			String[] args) throws FrameworkException {
		try {			
			HashMap inputMap = (HashMap) JPO.unpackArgs(args);
			MapList objectMap = (MapList) inputMap.get("objectList");
			StringList returnStringList = new StringList(objectMap.size());

			for (int i = 0; i < objectMap.size(); i++) {
				Map outerMap = (Map) objectMap.get(i);
				returnStringList.add((String) outerMap.get(SELECT_NAME));
			}		
			
			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}	

    /**
  	 * Get change request organization for table view
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return change request organization field values
  	 * @throws FrameworkException if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static StringList getChangeRequestOrganization(Context context,
			String[] args) throws FrameworkException {
		try {			
			HashMap inputMap = (HashMap) JPO.unpackArgs(args);
			MapList objectMap = (MapList) inputMap.get("objectList");
			StringList returnStringList = new StringList(objectMap.size());
	
			for (int i = 0; i < objectMap.size(); i++) {
				Map outerMap = (Map) objectMap.get(i);
				returnStringList.add((String) outerMap.get("Organization"));
			}		
			
			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}

    /**
  	 * Get change request title for table view
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return change request title field values
  	 * @throws FrameworkException if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static StringList getChangeRequestTitle(Context context,
			String[] args) throws FrameworkException {
		try {			
			HashMap inputMap = (HashMap) JPO.unpackArgs(args);
			MapList objectMap = (MapList) inputMap.get("objectList");
			StringList returnStringList = new StringList(objectMap.size());
	
			for (int i = 0; i < objectMap.size(); i++) {
				Map outerMap = (Map) objectMap.get(i);
				returnStringList.add((String) outerMap.get("Title"));
			}		
			
			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}
	
    /**
  	 * Get change request change coordinator for table view
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return change coordinator field values
  	 * @throws FrameworkException if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static StringList getChangeRequestCoordinator(Context context,
			String[] args) throws FrameworkException {
		try {			
			HashMap inputMap = (HashMap) JPO.unpackArgs(args);
			MapList objectMap = (MapList) inputMap.get("objectList");
			StringList returnStringList = new StringList(objectMap.size());
	
			for (int i = 0; i < objectMap.size(); i++) {
				Map outerMap = (Map) objectMap.get(i);
				returnStringList.add((String) outerMap.get("ChangeCoordinator"));
			}		
			
			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}
	
    /**
  	 * Get change request due date for table view
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Due date field values
  	 * @throws FrameworkException if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public static StringList getChangeRequestDueDate(Context context,
			String[] args) throws FrameworkException {
		try {			
			HashMap inputMap = (HashMap) JPO.unpackArgs(args);
			MapList objectMap = (MapList) inputMap.get("objectList");
			StringList returnStringList = new StringList(objectMap.size());
	
			for (int i = 0; i < objectMap.size(); i++) {
				Map outerMap = (Map) objectMap.get(i);
				returnStringList.add((String) outerMap.get("DueDate"));
			}		
			
			return returnStringList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FrameworkException(e.getMessage());
		}
	}	

	/**
	 * To create the Change Request
	 *
	 * @author skr15
	 * @param context the eMatrix code context object
	 * @param args packed hashMap of request parameter
	 * @return Map contains change object id
	 * @throws Exception if the operation fails
	 * @Since ECM R424
	 */
	@com.matrixone.apps.framework.ui.CreateProcessCallable
	public Map createChangeRequest(Context context, String[] args) throws Exception {

	    HashMap programMap   = (HashMap) JPO.unpackArgs(args);
	    HashMap requestValue = (HashMap) programMap.get(ChangeConstants.REQUEST_VALUES_MAP);
	    HashMap requestMap   = (HashMap) programMap.get(ChangeConstants.REQUEST_MAP);

	    String changeRequestId   = "";
	    Map returnMap     = new HashMap();
	    String sType      = (String) programMap.get("TypeActual");
		String strAnalysisType= (String) programMap.get("AnalysisType");

	    try {
	    	
			String AttrAnalysisType = PropertyUtil.getSchemaProperty(context, "attribute_ChangeRequestAnalysisType");
			AttributeList attributeList = new AttributeList();
			if("Simple".equalsIgnoreCase(strAnalysisType)) {
				AttributeType attributeType = new AttributeType(AttrAnalysisType);
				attributeType.open(context);
				Attribute attribute = new Attribute(attributeType, "Simple");
				attributeList.add(attribute); 
}

	        changeRequestId = ChangeRequest.createChangeRequest(context, sType, null, null, null, attributeList);
	        returnMap.put(ChangeConstants.ID, changeRequestId);

	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new FrameworkException(e);
	    }

	    return returnMap;
	}

	/**
	 * To connect the Change Request with route template during creation
	 *
	 * @author nbt8
	 * @param context the eMatrix code context object
	 * @param args packed hashMap of request parameter
	 * @return Map contains change object id of CR and NEW_OID of Route Template
	 * @throws Exception if the operation fails
	 * @Since ECM R424
	 */
	public void connectRouteTemplate (Context context, String[] args) throws Exception {
		
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap fieldMap   = (HashMap) programMap.get(ChangeConstants.FIELD_MAP);
        HashMap paramMap   = (HashMap) programMap.get(ChangeConstants.PARAM_MAP);
        
        //getting Route Template Object ID
        String strNewToTypeObjId = (String)paramMap.get(ChangeConstants.NEW_OID);
        
        //if not null/empty try to connect with CR
        if(!ChangeUtil.isNullOrEmpty(strNewToTypeObjId)){
	        
	        //getting Route Template Physical ID
	        String strNewRouteTemplatePhyId = new DomainObject(strNewToTypeObjId).getInfo(context, "physicalid");
	        
	        //getting CR Object ID
	        String strObjectId = (String)paramMap.get(ChangeConstants.OBJECT_ID);
	        DomainObject domObj = new DomainObject(strObjectId);
			
			//Connecting Route Template with CR
	        IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
	        IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domObj);
	        iChangeRequest.addApprovalRouteTemplate(context, strNewRouteTemplatePhyId); 
	    }

	}

     /**
	 * To get the ChangeAnalysis/Impact Analysis connected with Change Request
	 *
	 * @author cai1
	 * @param context the eMatrix code context object
	 * @param args packed hashMap of request parameter
	 * @return List contain ImpactAnalysis IDs
	 * @throws Exception if the operation fails
	 * @Since ECM R424
	 */
	public StringList  getConnectedImpactAnalysis (Context context, String[] args) throws Exception {
		HashMap programMap = (HashMap) JPO.unpackArgs(args);     
		String strObjectId = (String)programMap.get("objectid");
	    
		StringList list = new StringList();
		DomainObject domObj = new DomainObject(strObjectId);
				
		//fetching connected ImpactAnalysis of CR
		IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
		IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domObj);
		List<IChangeAnalysis> ChangeAnalysis = iChangeRequest.getConnectedChangeAnalysises(context); 
		for(int j=0; j<ChangeAnalysis.size();j++) {
			IChangeAnalysis ImpactAnalysis = ChangeAnalysis.get(j);	
			if(ImpactAnalysis.getCurrent().equals("In Work"))
				list.add(ImpactAnalysis.getPhysicalId());
		}
		return list;
	}
	
	/**
	 * To update the Change Request's route template using edit form
	 *
	 * @author nbt8
	 * @param context the eMatrix code context object
	 * @param args packed hashMap of request parameter
	 * @return Map contains change object id of CR and ReviewerListfieldValueOID of already connected RT and ReviewerListOID of new connected RT
	 * @throws Exception if the operation fails
	 * @Since ECM R424
	 */
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void updateRouteTemplateChangeRequestEdit(Context context,String[] args) throws Exception
    {
    	Map programMap = (Map) JPO.unpackArgs(args);
        Map requestMap = (Map)programMap.get("requestMap");
        
        //Get CR object
        String objectId = objectId = (String)requestMap.get("objectId");
		DomainObject domObj = new DomainObject(objectId);
		IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
	    IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domObj);
        
        //Disconnecting Old RT
        //check if Old RT exists
        if(requestMap.containsKey("ReviewerListfieldValueOID")){
        	
        	String oldReviewRT = (String)requestMap.get("ReviewerListfieldValueOID");

        	//check if new RT is added and is same as old RT
        	if(requestMap.containsKey("ReviewerListOID") && !ChangeUtil.isNullOrEmpty((String)requestMap.get("ReviewerListOID"))){
        		String newReviewRT = (String)requestMap.get("ReviewerListOID");
        		if(oldReviewRT == newReviewRT)
        			return;
        	}

        	//if new RT is not added or new RT not same as old RT remove old RT
        	if(!ChangeUtil.isNullOrEmpty(oldReviewRT)) {
        		
        		String strOldRouteTemplatePhyId = new DomainObject(oldReviewRT).getInfo(context, "physicalid");
	        	iChangeRequest.removeApprovalRouteTemplate(context, strOldRouteTemplatePhyId); 
        	}
        }
        
        //Connecting NEW RT
        if(requestMap.containsKey("ReviewerListOID")){
        	String selectedReviewRT = (String)requestMap.get("ReviewerListOID");
        	if(!ChangeUtil.isNullOrEmpty(selectedReviewRT)) {
           	 	
           	 	//Check if multiple RT connected
           	 	if( (selectedReviewRT.indexOf(",") != -1) || (selectedReviewRT.indexOf("|") != -1)  ){
        			throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.TooManyRouteTemplate"));			 
                }

                //getting Route Template Physical ID
	        	String strNewRouteTemplatePhyId = new DomainObject(selectedReviewRT).getInfo(context, "physicalid");
	        	iChangeRequest.addApprovalRouteTemplate(context, strNewRouteTemplatePhyId); 
            }   
        }
    }	
	
 	/**
  	 * Get Informed Users Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Informed Users Field.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String selectInformedUsers(Context context,String[] args)throws Exception
	{
		boolean isEditable = false;
		boolean isMobileDevice = false;
		StringBuilder sb = new StringBuilder();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String strMode = (String) requestMap.get("mode");
		String changeRequestId = (String) requestMap.get("objectId");
		String styleDisplayPerson = "block";
		String styleDisplayMemberList = "block";
		StringList finalInformedUsersList = new StringList();
		StringList slInformedUsers = new StringList();
		StringList slMemberListId = new StringList();
		String functionality = (String) requestMap.get("functionality");

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}

		if("ECMAddToNewCR".equals(functionality) || "AddToNewChangeRequest".equals(functionality)){
			changeRequestId = null;
		}

		//Get current informed users and member lists
		if(null != changeRequestId){
			ChangeRequest changeRequest = new ChangeRequest(changeRequestId);
			
			//Has Access to add/remove informed users
			isEditable = changeRequest.getAccess(context, "ManageFollowers");
			
			//Get existing Members list
			MapList mlMemberList = changeRequest.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST,
					  DomainConstants.TYPE_MEMBER_LIST,
					  new StringList(DomainConstants.SELECT_ID),
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			if(!mlMemberList.isEmpty()){
				Iterator itrMemberList = mlMemberList.iterator();
				while(itrMemberList.hasNext()){
					Map mpMemberList = (Map)itrMemberList.next();
					String memberListId = (String) mpMemberList.get(DomainConstants.SELECT_ID);
					slMemberListId.add(memberListId);
				}
			}
									
			//Get existing Informed Users
			List<String> lsInformedUsers = changeRequest.getFollowers(context);
			slInformedUsers.addAll(lsInformedUsers);
		}	
		
		String informedUsers = DomainObject.EMPTY_STRING;
		String informedUsersType = DomainObject.EMPTY_STRING;
		if(!slMemberListId.isEmpty() && slInformedUsers.isEmpty())
		{
			 styleDisplayPerson="none";
		}
		else if(slMemberListId.isEmpty() && !slInformedUsers.isEmpty())
		{
			styleDisplayMemberList="none";
		}
		else if(!slMemberListId.isEmpty() && !slInformedUsers.isEmpty()){
			styleDisplayPerson="none";
		}

		if (slInformedUsers!=null && !slInformedUsers.isEmpty() && slMemberListId.isEmpty()){
			for (int i=0;i<slInformedUsers.size();i++) {
				String informedUserName = (String) slInformedUsers.get(i);
				String informedUserId = PersonUtil.getPersonObjectID(context, informedUserName);
				String informedUserType = new DomainObject(informedUserId).getInfo(context, DomainConstants.SELECT_TYPE);
				informedUsers=informedUsers.concat(informedUserId+",");
				informedUsersType=informedUsersType.concat(informedUserType+",");
				finalInformedUsersList.add(informedUserId);
			}
		}
		
		if (slMemberListId!=null && !slMemberListId.isEmpty()){
			for (int i=0;i<slMemberListId.size();i++) {
				String memberListId = (String) slMemberListId.get(i);
				String informedUserType = new DomainObject(memberListId).getInfo(context, DomainConstants.SELECT_TYPE);
				informedUsers=informedUsers.concat(memberListId+",");
				informedUsersType=informedUsersType.concat(informedUserType+",");
				finalInformedUsersList.add(memberListId);
			}
		}

		if(informedUsers.length()>0 && !informedUsers.isEmpty()){
			informedUsers = informedUsers.substring(0,informedUsers.length()-1);
			informedUsersType = informedUsersType.substring(0,informedUsersType.length()-1);
		}	
		
		if(!isMobileDevice && ("edit".equalsIgnoreCase(strMode) && isEditable)|| "create".equalsIgnoreCase(strMode))
		{
			String addMemberList= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddMemberList", context.getSession().getLanguage());
			String addPeople= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddPeople", context.getSession().getLanguage());
			String remove = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.Remove", context.getSession().getLanguage());
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"IsInformedUsersFieldModified\" id=\"IsInformedUsersFieldModified\" value=\"false\" readonly=\"readonly\" />");
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"InformedUsersHidden\" id=\"InformedUsersHidden\" value=\""+informedUsers+"\" readonly=\"readonly\" />");
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"InformedUsersHiddenType\" id=\"InformedUsersHiddenType\" value=\""+informedUsersType+"\" readonly=\"readonly\" />");
			sb.append("<table>");
			sb.append("<tr>");
			sb.append("<th rowspan=\"3\">");
			sb.append("<select name=\"InformedUsers\" style=\"width:200px\" multiple=\"multiple\">");

			if (finalInformedUsersList!=null && !finalInformedUsersList.isEmpty()){
				for (int i=0; i<finalInformedUsersList.size(); i++) {
					String informedUserId = (String) finalInformedUsersList.get(i);
					if (informedUserId != null && !informedUserId.isEmpty()) {
						String informedUserName = new DomainObject(informedUserId).getInfo(context, DomainConstants.SELECT_NAME);
						String informedUserFullName = PersonUtil.getFullName(context, informedUserName);
						if (informedUserName!=null && !informedUserName.isEmpty()) {
							sb.append("<option value=\""+informedUserId+"\" >");
							//XSSOK
							sb.append(informedUserFullName);
							sb.append("</option>");

						}
					}
				}
			}
			
			sb.append("</select>");
			sb.append("</th>");
			sb.append("<td>");
			sb.append("<div style=\"display:"+styleDisplayPerson+"\" name=\"InformedUsersHidePerson\" id=\"InformedUsersHidePerson\">");
			sb.append("<a href=\"javascript:addInformedUsersPersonSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addInformedUsersPersonSelectors()\">");
			//XSSOK
			sb.append(addPeople);
			sb.append("</a>");
			sb.append("</div>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<div style=\"display:"+styleDisplayMemberList+"\" name=\"InformedUsersHideMemberList\" id=\"InformedUsersHideMemberList\">");
			sb.append("<a href=\"javascript:addInformedUsersMemberListSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addInformedUsersMemberListSelectors()\">");
			//XSSOK
			sb.append(addMemberList);
			sb.append("</a>");
			sb.append("</div>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:removeInformedUsers()\">");
			sb.append("<img src=\"../common/images/iconStatusRemoved.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:removeInformedUsers()\">");
			//XSSOK
			sb.append(remove);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("</table>");			
			
		}else {
			if(!exportToExcel)
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"InformedUsersHidden\" id=\"InformedUsersHidden\" value=\""+informedUsers+"\" readonly=\"readonly\" />");
			if (finalInformedUsersList!=null && !finalInformedUsersList.isEmpty()){
				for (int i=0;i<finalInformedUsersList.size();i++) {
				    String  lastInformedUserId = (String)finalInformedUsersList.get(finalInformedUsersList.size()-1);
					String informedUserId = (String) finalInformedUsersList.get(i);
					if (informedUserId!=null && !informedUserId.isEmpty()) {
						StringList slObjSelect = new StringList();
						slObjSelect.add(DomainConstants.SELECT_NAME);
						slObjSelect.add(DomainConstants.SELECT_TYPE);
						Map mpObjInfo = DomainObject.newInstance(context, informedUserId).getInfo(context, slObjSelect);
						String informedUserName = (String) mpObjInfo.get(DomainConstants.SELECT_NAME);
						String informedUserType = (String) mpObjInfo.get(DomainConstants.SELECT_TYPE);
						String informedUserFullName = PersonUtil.getFullName(context, informedUserName);
						if (informedUserName!=null && !informedUserName.isEmpty()) {
							if(!exportToExcel)
								//XSSOK
								sb.append("<input type=\"hidden\" name=\""+informedUserFullName+"\" value=\""+informedUserId+"\" />");
								
								if(informedUserType.equalsIgnoreCase("Member List") && !exportToExcel){
									sb.append("<a href=\"JavaScript:emxFormLinkClick('../common/emxTree.jsp?objectId=");
									sb.append(XSSUtil.encodeForHTMLAttribute(context, informedUserId));
									sb.append("','content', '', '', '')\">");
									sb.append(XSSUtil.encodeForHTML(context, informedUserFullName));
									sb.append("</a>");
								}else {
									//XSSOK
									sb.append(informedUserFullName);
								}
							
							if(!lastInformedUserId.equalsIgnoreCase(informedUserId))
								if(!exportToExcel)
									sb.append("<br>");
								else
									sb.append("\n");
						}
					}
				}
			}
		}
		
		return sb.toString();
	}
	
	/**
	 * connectInformedUsers - Connect Change request and Person or member list
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ConnectionProgramCallable
	public void connectInformedUsers(Context context, String[] args)throws Exception
	{
		try{
			Map programMap = (HashMap)JPO.unpackArgs(args);
			HashMap hmParamMap = (HashMap)programMap.get("paramMap");
			String changeRequestId = (String)hmParamMap.get("objectId");
			HashMap requestMap = (HashMap) programMap.get("requestMap");
			String[] strNewIUArr = (String[])requestMap.get("InformedUsersHidden");
			String[] strIsFieldModifiedArr = (String[])requestMap.get("IsInformedUsersFieldModified");
			String strIsFieldModified = "true";
			if(strIsFieldModifiedArr != null && strIsFieldModifiedArr.length > 0){
				strIsFieldModified = strIsFieldModifiedArr[0];				
			}
			//To make the decision of calling connect/disconnect method only on field modification.
			if("true".equalsIgnoreCase(strIsFieldModified)){
				ChangeRequest changeRequest = new ChangeRequest(changeRequestId);
				String strNewInformedUsers=null;
				
				if(strNewIUArr != null && strNewIUArr.length > 0){
					strNewInformedUsers = strNewIUArr[0];
				}
				
				//Get Members list
				StringList slMemberListRelId = new StringList();
				MapList mlMemberList = changeRequest.getRelatedObjects(context,
						  DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST,
						  DomainConstants.TYPE_MEMBER_LIST,
						  new StringList(DomainObject.SELECT_ID),
						  new StringList(DomainRelationship.SELECT_ID),
						  false,
						  true,
						  (short) 1,
						  null, null, (short) 0);
				if(!mlMemberList.isEmpty()){
					Iterator itrMemberList = mlMemberList.iterator();
					while(itrMemberList.hasNext()){
						Map mpMemberList = (Map)itrMemberList.next();
						String memberListRelId = (String) mpMemberList.get(DomainRelationship.SELECT_ID);
						slMemberListRelId.add(memberListRelId);
					}
				}
				
				List<String> newInformedUserNameList=new ArrayList<String>();
				if(!checkMemberList(context, strNewInformedUsers)){
					StringTokenizer strNewInformedUsersList = new StringTokenizer(strNewInformedUsers,",");
					while (strNewInformedUsersList.hasMoreTokens()){
						String strInformedUser = strNewInformedUsersList.nextToken().trim();
						Person personObj = new Person(strInformedUser);
						String personName = personObj.getInfo(context,SELECT_NAME);
						newInformedUserNameList.add(personName);
					}
				}
				
				//Existing Informed Users
				List<String> informedUserslistOld = changeRequest.getFollowers(context);
				
				List<String> informedUsersDisconnectList = differenceBetweenList(informedUserslistOld, newInformedUserNameList);
				List<String> informedUsersConnectList = differenceBetweenList(newInformedUserNameList, informedUserslistOld);
				
				//Disconnecting old person from Change Request
				changeRequest.removeFollowers(context, informedUsersDisconnectList);
				
				//Disconnecting old Member List from Change Request
				if(!slMemberListRelId.isEmpty()){
					if(strNewInformedUsers.isEmpty()||!checkMemberList(context,strNewInformedUsers)){
						for(int i=0; i<slMemberListRelId.size(); i++){
							String strMemberListRelID =	(String) slMemberListRelId.get(i);
							DomainRelationship.disconnect(context, strMemberListRelID);
						}
					}
				}
				
				//Connecting new informed users to Change Request
				if(!strNewInformedUsers.isEmpty()){
					if(!checkMemberList(context,strNewInformedUsers)){
						changeRequest.addFollowers(context, informedUsersConnectList);
					}else
					{
						if(strNewInformedUsers.indexOf(",") == -1){														
							if(!slMemberListRelId.isEmpty() && !(slMemberListRelId == null)){								
								for(int i=0; i<slMemberListRelId.size(); i++){
									String strMemberListRelID =	(String) slMemberListRelId.get(i);
									DomainRelationship.disconnect(context, strMemberListRelID);
								}	
							}
							
							//Connect new member list
							DomainRelationship.connect(context, changeRequest, DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST, DomainObject.newInstance(context, strNewInformedUsers));
						}
						else{
							throw new FrameworkException(EnoviaResourceBundle.getProperty(context, "emxEnterpriseChangeMgtStringResource", context.getLocale(), "EnterpriseChangeMgt.Notice.TooManyMemberList"));
						}
					}		
				}
			}
		}
		catch(Exception e){
			throw new FrameworkException(e.getMessage());
		}			
	}

	/**
	 * differenceBetweenList - return the difference(A-B) between firstList and secondList
	 * @param context
	 * @param List firstList
	 * @param List secondList
	 * @return List result(Fist-Second)
	 * @throws Exception
	 */
	public List differenceBetweenList(List<String> firstList, List<String> secondList)throws Exception
	{
		List resulList=new ArrayList<String>();
		try
		{
			if(!firstList.isEmpty()){
				resulList.addAll(firstList);
			}
			if(!resulList.isEmpty()){
				resulList.removeAll(secondList);
			}
		}
		catch(Exception e){
			throw new FrameworkException(e.getMessage());
		}
		return resulList;
	}	
	
	/**
	 * checkMemberList - Check whether given string contain Member List type or Not
	 * @param Context  context
	 * @param String informed users
	 * @return boolean -true/false
	 * @throws Exception
	 */
	public static boolean checkMemberList(Context context,String informedUsers)throws Exception{

		try {
			StringTokenizer strNewInformedUsersList = new StringTokenizer(informedUsers,",");
			while (strNewInformedUsersList.hasMoreTokens())
			{
				String strInformedUser = strNewInformedUsersList.nextToken().trim();
				DomainObject domainObj=new DomainObject(strInformedUser);
				String objType=domainObj.getInfo(context,SELECT_TYPE);
				if(objType.equalsIgnoreCase(DomainConstants.TYPE_MEMBER_LIST)){
					return true;
				}
			}
		}
		catch (Exception e) {
			throw new FrameworkException(e.getMessage());
		}
		return false;
	}	
	
	/**
	 * To update the Change Request's change coordinator using create/edit form
	 *
	 * @author skr15
	 * @param context the eMatrix code context object
	 * @param args packed hashMap of request parameter
	 * @return 
	 * @throws Exception if the operation fails
	 * @Since ECM R424
	 */
	public void connectChangeCoordinator(Context context, String[] args) throws Exception {
		//unpacking the Arguments from variable args
		HashMap programMap = (HashMap)JPO.unpackArgs(args);
		HashMap paramMap   = (HashMap)programMap.get("paramMap");
		
        //Get CR object
		String changeRequestId = (String)paramMap.get("objectId");
		DomainObject domObj = DomainObject.newInstance(context,changeRequestId);
		IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
	    IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domObj);
	    
	    //Updating change coordinator
	    String strChangeCoordinator = (String)paramMap.get(ChangeConstants.NEW_VALUE);
	    iChangeRequest.setChangeCoordinator(context, strChangeCoordinator);
	}
	
	/**
	 * This method performs the hold process of change request.
	 * @author SKR15
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change request and reason 
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R424.
	 */
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void holdChangeRequest(Context context, String[] args)throws Exception {

	    HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
	    HashMap requestMap = (HashMap)paramMap.get(ChangeConstants.REQUEST_MAP);
		String changeRequestId    = (String)requestMap.get(ChangeConstants.OBJECT_ID);
		String holdReason  = (String)requestMap.get("Reason");
		
		DomainObject domObj = DomainObject.newInstance(context,changeRequestId);
		IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
	    IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domObj);
	    iChangeRequest.setOnHold(context, holdReason);
	}	
	
	/**
	 * This method performs the cancel process of change request.
	 * @author YOQ
	 * @param context
	 *            the eMatrix <code>Context</code> object.
	 * @param args
	 *            holds the following input arguments: - The ObjectID of the
	 *            Change request and reason
	 * @throws Exception
	 *             if the operation fails.
	 * @since ECM R424.
	 */
	@com.matrixone.apps.framework.ui.PostProcessCallable
	public void cancelChangeRequest(Context context, String[] args) throws Exception
	{
	    HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
	    HashMap requestMap = (HashMap) paramMap.get(ChangeConstants.REQUEST_MAP);
		String changeRequestId    = (String)requestMap.get(ChangeConstants.OBJECT_ID);
		String cancelReason  = (String)requestMap.get("Reason");

		DomainObject domObj = DomainObject.newInstance(context,changeRequestId);
		IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
	    IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domObj);
	    iChangeRequest.cancel(context, cancelReason);
	}	
	
 	/**
  	 * Get Informed Users with user group Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Informed Users with user group Field.
  	 * @throws Exception if operation fails.
  	 * Added for IR-875061-3DEXPERIENCER2022x
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String selectInformedUsersWithGroup(Context context,String[] args)throws Exception
	{
		boolean isEditable = false;
		boolean isMobileDevice = false;
		StringBuilder sb = new StringBuilder();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String strMode = (String) requestMap.get("mode");
		String changeRequestId = (String) requestMap.get("objectId");

		String functionality = (String) requestMap.get("functionality");
		
		MapList mlInformedUsers = new MapList();
		String strFollowerAccessKey = "ManageFollowers";
		String informedUsers = DomainObject.EMPTY_STRING;
		String informedMemberLists = DomainObject.EMPTY_STRING;
		String informedUserGroups = DomainObject.EMPTY_STRING;
		StringList slMemberListId = new StringList();
		String USER_FULL_NAME = "UserFullName";

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}

		if("ECMAddToNewCR".equals(functionality) || "AddToNewChangeRequest".equals(functionality)){
			changeRequestId = null;
		}
		
		//Get current informed users and member lists
		if(null != changeRequestId){
			
			DomainObject domChangeRequest = DomainObject.newInstance(context, changeRequestId);
			IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
			IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domChangeRequest); 
						
			//Has Access to add/remove informed users
			HashMap<String, Boolean> accessMap = iChangeRequest.getAccessMap(context);
			if(accessMap.containsKey(strFollowerAccessKey)) {
				isEditable = accessMap.get(strFollowerAccessKey);
			}
			
			//Get existing Members list
			
			StringList objSelects = new StringList();
			objSelects.add(DomainConstants.SELECT_ID);
			objSelects.add(DomainConstants.SELECT_NAME);
			objSelects.add(DomainConstants.SELECT_TYPE);
			MapList mlMemberList = domChangeRequest.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST,
					  DomainConstants.TYPE_MEMBER_LIST,
					  objSelects,
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			if(!mlMemberList.isEmpty()){
				Iterator itrMemberList = mlMemberList.iterator();
				while(itrMemberList.hasNext()){
					Map memberList = (Map)itrMemberList.next();
					String memberListId = (String) memberList.get(DomainConstants.SELECT_ID);
					String memberListName = (String) memberList.get(DomainConstants.SELECT_NAME);
					String memberListType = (String) memberList.get(DomainConstants.SELECT_TYPE);
					Map<String, String> mpMemberList = new HashMap<String, String>();
					mpMemberList.put(DomainConstants.SELECT_ID, memberListId);
					mpMemberList.put(DomainConstants.SELECT_NAME, memberListName);
					mpMemberList.put(DomainConstants.ATTRIBUTE_TITLE, memberListName);
					mpMemberList.put(DomainConstants.SELECT_TYPE, memberListType);
					mlInformedUsers.add(mpMemberList);
					slMemberListId.add(memberListId);
				}
			}
			
			//Get existing user group followers
			List<UserGroup> lsGroupFollower = iChangeRequest.getGroupFollowers(context);
			MapList mlGroupFollower = new MapList();
			StringList slGroupFollowerPhyId = new StringList();
			for (int i=0; i<lsGroupFollower.size(); i++) {
				UserGroup userGroup = lsGroupFollower.get(i);
				String strUserGroupPhyId = userGroup._physicalid;
				String strUserGroupURI = userGroup._uri;
				String strUserGroupTitle = userGroup._title;
				
				//get physical id from uuid if physical id not there
				if(ChangeUtil.isNullOrEmpty(strUserGroupPhyId) && !ChangeUtil.isNullOrEmpty(strUserGroupURI)) {
					strUserGroupPhyId = FrameworkUtil.getPhysicalIdfromUUId(context, strUserGroupURI);
				}
				
				if(!ChangeUtil.isNullOrEmpty(strUserGroupPhyId)) {
					slGroupFollowerPhyId.add(strUserGroupPhyId);
					
					Map<String, String> mpUserGroup = new HashMap<String, String>();
					mpUserGroup.put(DomainConstants.SELECT_PHYSICAL_ID, strUserGroupPhyId);
					mpUserGroup.put(DomainConstants.ATTRIBUTE_GROUPURI, strUserGroupURI);
					mpUserGroup.put(DomainConstants.ATTRIBUTE_TITLE, strUserGroupTitle);
					mlGroupFollower.add(mpUserGroup);
				}
			}
			
			//Getting object id from physicalid
			StringList selects = new StringList(2);
			selects.add(DomainConstants.SELECT_ID);
			selects.add(DomainConstants.SELECT_PHYSICAL_ID);
			MapList mlGroupFollowerId = DomainObject.getInfo(context, (String[])slGroupFollowerPhyId.toArray(new String[slGroupFollowerPhyId.size()]), selects);
			
			//Merging maplist for object id
			for (int i=0; i<mlGroupFollower.size(); i++) {
				Map mpUserGroup = (Map) mlGroupFollower.get(i);
				String strUserGroupPhyId = (String) mpUserGroup.get(DomainConstants.SELECT_PHYSICAL_ID);
				for(int j=0; j<mlGroupFollowerId.size(); j++) {
					Map mpUserGroupId = (Map) mlGroupFollowerId.get(i);
					String strGroupPhyId = (String) mpUserGroupId.get(DomainConstants.SELECT_PHYSICAL_ID);
					String strGroupId = (String) mpUserGroupId.get(DomainConstants.SELECT_ID);
					if(strUserGroupPhyId.equals(strGroupPhyId)) {
						mpUserGroup.put(DomainConstants.SELECT_ID, strGroupId);
						mlInformedUsers.add(mpUserGroup);
						informedUserGroups = informedUserGroups.concat(strGroupId+",");
						break;
					}					
				}
			}
						
			//Get existing user followers
			List<String> lsUserFollower = iChangeRequest.getFollowers(context);
			for (int i=0; i<lsUserFollower.size(); i++) {
				String informedUserName = (String) lsUserFollower.get(i);
				String informedUserId = PersonUtil.getPersonObjectID(context, informedUserName);
				String informedUserFullName = PersonUtil.getFullName(context, informedUserName);
				Map<String, String> mpUserFollower = new HashMap<String, String>();
				mpUserFollower.put(DomainConstants.SELECT_TYPE, DomainConstants.TYPE_PERSON);
				mpUserFollower.put(DomainConstants.SELECT_ID, informedUserId);
				mpUserFollower.put(DomainConstants.SELECT_NAME, informedUserName);
				mpUserFollower.put(USER_FULL_NAME, informedUserFullName);
				mlInformedUsers.add(mpUserFollower);	
				
				informedUsers = informedUsers.concat(informedUserId+",");
			}	
			if (slMemberListId!=null && !slMemberListId.isEmpty()){
				for (int i=0;i<slMemberListId.size();i++) {
					String memberListId = (String) slMemberListId.get(i);
					String informedUserType = new DomainObject(memberListId).getInfo(context, DomainConstants.SELECT_TYPE);
					informedMemberLists=informedMemberLists.concat(memberListId+",");
				}
			}	
		}	
		
		if(informedUserGroups.length()>0 && !informedUserGroups.isEmpty()){
			informedUserGroups = informedUserGroups.substring(0,informedUserGroups.length()-1);
		}
				
		if(informedUsers.length()>0 && !informedUsers.isEmpty()){
			informedUsers = informedUsers.substring(0,informedUsers.length()-1);
		}	
		if(informedMemberLists.length()>0 && !informedMemberLists.isEmpty()){
			informedMemberLists = informedMemberLists.substring(0,informedMemberLists.length()-1);
		}
		
		if(!isMobileDevice && ("edit".equalsIgnoreCase(strMode) && isEditable)|| "create".equalsIgnoreCase(strMode))
		{
			String addPeople= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddPeople", context.getSession().getLanguage());
			String addUserGroup = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddUserGroup", context.getSession().getLanguage());
			String remove = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.Remove", context.getSession().getLanguage());
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"IsInformedUsersWithGroupFieldModified\" id=\"IsInformedUsersWithGroupFieldModified\" value=\"false\" readonly=\"readonly\" />");
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"UserFollowersHidden\" id=\"UserFollowersHidden\" value=\""+informedUsers+"\" readonly=\"readonly\" />");
			sb.append("<input type=\"hidden\" name=\"GroupFollowersHidden\" id=\"GroupFollowersHidden\" value=\""+informedUserGroups+"\" readonly=\"readonly\" />");
			sb.append("<input type=\"hidden\" name=\"MemberListFollowersHidden\" id=\"MemberListFollowersHidden\" value=\""+informedMemberLists+"\" readonly=\"readonly\" />");
			sb.append("<table>");
			sb.append("<tr>");
			sb.append("<th rowspan=\"3\">");
			sb.append("<select name=\"InformedUsersWithGroup\" style=\"width:200px\" multiple=\"multiple\">");

			for (int i=0; i<mlInformedUsers.size(); i++) {
				Map mpFollower = (Map) mlInformedUsers.get(i);
				String strFollowerType = (String) mpFollower.get(DomainConstants.SELECT_TYPE);
				String strFollowerPhyId = (String) mpFollower.get(DomainConstants.SELECT_PHYSICAL_ID);
				String strFollowerTitle = (String) mpFollower.get(DomainConstants.ATTRIBUTE_TITLE);
				String strFollowerGrpURI = (String) mpFollower.get(DomainConstants.ATTRIBUTE_GROUPURI);
				String strFollowerId = (String) mpFollower.get(DomainConstants.SELECT_ID);
				String strFollowerName = (String) mpFollower.get(DomainConstants.SELECT_NAME);
				String strFollowerFullName = (String) mpFollower.get(USER_FULL_NAME);
				if(!ChangeUtil.isNullOrEmpty(strFollowerType) && (DomainConstants.TYPE_PERSON.equalsIgnoreCase(strFollowerType))) {	
					if(!ChangeUtil.isNullOrEmpty(strFollowerId) && !ChangeUtil.isNullOrEmpty(strFollowerFullName)) {
						sb.append("<option value=\""+strFollowerId+"\" >");
						sb.append(strFollowerFullName);
						sb.append("</option>");	
					}
				}else {
					if(!ChangeUtil.isNullOrEmpty(strFollowerId) && !ChangeUtil.isNullOrEmpty(strFollowerTitle)) {
						sb.append("<option value=\""+strFollowerId+"\" >");
						sb.append(strFollowerTitle);
						sb.append("</option>");	
					}					
				}
			}
			
			sb.append("</select>");
			sb.append("</th>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:addUserFollowersSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addUserFollowersSelectors()\">");
			//XSSOK
			sb.append(addPeople);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:addGroupFollowersSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addGroupFollowersSelectors()\">");
			//XSSOK
			sb.append(addUserGroup);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:removeInformedUsersWithGroup()\">");
			sb.append("<img src=\"../common/images/iconStatusRemoved.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:removeInformedUsersWithGroup()\">");
			//XSSOK
			sb.append(remove);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("</table>");			
			
		}else {
			if(!exportToExcel) {
				sb.append("<input type=\"hidden\" name=\"UserFollowersHidden\" id=\"UserFollowersHidden\" value=\""+informedUsers+"\" readonly=\"readonly\" />");
				sb.append("<input type=\"hidden\" name=\"GroupFollowersHidden\" id=\"GroupFollowersHidden\" value=\""+informedUserGroups+"\" readonly=\"readonly\" />");
				sb.append("<input type=\"hidden\" name=\"MemberListFollowersHidden\" id=\"MemberListFollowersHidden\" value=\""+informedMemberLists+"\" readonly=\"readonly\" />");
			}

			for (int i=0; i<mlInformedUsers.size(); i++) {
				Map mpFollower = (Map) mlInformedUsers.get(i);
				String strFollowerType = (String) mpFollower.get(DomainConstants.SELECT_TYPE);
				String strFollowerPhyId = (String) mpFollower.get(DomainConstants.SELECT_PHYSICAL_ID);
				String strFollowerTitle = (String) mpFollower.get(DomainConstants.ATTRIBUTE_TITLE);
				String strFollowerGrpURI = (String) mpFollower.get(DomainConstants.ATTRIBUTE_GROUPURI);
				String strFollowerId = (String) mpFollower.get(DomainConstants.SELECT_ID);
				String strFollowerName = (String) mpFollower.get(DomainConstants.SELECT_NAME);
				String strFollowerFullName = (String) mpFollower.get(USER_FULL_NAME);
				if(!ChangeUtil.isNullOrEmpty(strFollowerType) && (DomainConstants.TYPE_PERSON.equalsIgnoreCase(strFollowerType))) {	
					if(!ChangeUtil.isNullOrEmpty(strFollowerId) && !ChangeUtil.isNullOrEmpty(strFollowerFullName)) {
						if(!exportToExcel) {
							sb.append("<input type=\"hidden\" name=\""+strFollowerFullName+"\" value=\""+strFollowerId+"\" />");
						}
						sb.append(strFollowerFullName);
						if(i < mlInformedUsers.size()-1) {	
							if(!exportToExcel) {	
								sb.append("<br>");
							}else {
								sb.append("\n");
							}
						}
					}
				}else {
					if(!ChangeUtil.isNullOrEmpty(strFollowerId) && !ChangeUtil.isNullOrEmpty(strFollowerTitle)) {
						if(!exportToExcel) {
							sb.append("<input type=\"hidden\" name=\""+strFollowerTitle+"\" value=\""+strFollowerId+"\" />");
							sb.append("<a onclick='findFrame(getTopWindow(), \"content\").location.href = \"../common/emxTree.jsp?objectId="+strFollowerId+"\"'>");
						}
						sb.append(strFollowerTitle);	
						if(i < mlInformedUsers.size()-1) {
							if(!exportToExcel){
								sb.append("</a>");								
								sb.append("<br>");
							}else {
								sb.append("\n");
							}
						}
					}					
				}			
			}			
		}		
		return sb.toString();
	}
	/**
  	 * Get Assignee Field
  	 * @param Context context
  	 * @param args holds information about object.
  	 * @return Assignee Field.
  	 * @throws Exception if operation fails.
  	 */
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String selectAssignee(Context context,String[] args)throws Exception
	{
		boolean isEditable = false;
		boolean isMobileDevice = false;
		StringBuilder sb = new StringBuilder();
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String strMode = (String) requestMap.get("mode");
		String changeRequestId = (String) requestMap.get("objectId");

		String functionality = (String) requestMap.get("functionality");
		
		MapList mlAssignees = new MapList();
		String strAssigneeAccessKey = "ManageFollowers";
		String assignee = DomainObject.EMPTY_STRING;
		//String informedMemberLists = DomainObject.EMPTY_STRING;
		String assigneeGroups = DomainObject.EMPTY_STRING;
		//StringList slMemberListId = new StringList();
		String USER_FULL_NAME = "UserFullName";

		// For export to CSV
		String exportFormat = null;
		boolean exportToExcel = false;
		if(requestMap!=null && requestMap.containsKey("reportFormat")){
			exportFormat = (String)requestMap.get("reportFormat");
		}
		if("CSV".equals(exportFormat)){
			exportToExcel = true;
		}

		if("ECMAddToNewCR".equals(functionality) || "AddToNewChangeRequest".equals(functionality)){
			changeRequestId = null;
		}
		
		//Get current informed users and member lists
		if(null != changeRequestId){
			
			DomainObject domChangeRequest = DomainObject.newInstance(context, changeRequestId);
			IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
			IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domChangeRequest); 
						
			//Has Access to add/remove informed users
			HashMap<String, Boolean> accessMap = iChangeRequest.getAccessMap(context);
			if(accessMap.containsKey(strAssigneeAccessKey)) {
				isEditable = accessMap.get(strAssigneeAccessKey);
			}
			
			//Get existing Members list
			
			StringList objSelects = new StringList();
			objSelects.add(DomainConstants.SELECT_ID);
			objSelects.add(DomainConstants.SELECT_NAME);
			objSelects.add(DomainConstants.SELECT_TYPE);
			/*
			MapList mlMemberList = domChangeRequest.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST,
					  DomainConstants.TYPE_MEMBER_LIST,
					  objSelects,
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			if(!mlMemberList.isEmpty()){
				Iterator itrMemberList = mlMemberList.iterator();
				while(itrMemberList.hasNext()){
					Map memberList = (Map)itrMemberList.next();
					String memberListId = (String) memberList.get(DomainConstants.SELECT_ID);
					String memberListName = (String) memberList.get(DomainConstants.SELECT_NAME);
					String memberListType = (String) memberList.get(DomainConstants.SELECT_TYPE);
					Map<String, String> mpMemberList = new HashMap<String, String>();
					mpMemberList.put(DomainConstants.SELECT_ID, memberListId);
					mpMemberList.put(DomainConstants.SELECT_NAME, memberListName);
					mpMemberList.put(DomainConstants.ATTRIBUTE_TITLE, memberListName);
					mpMemberList.put(DomainConstants.SELECT_TYPE, memberListType);
					mlAssignees.add(mpMemberList);
					slMemberListId.add(memberListId);
				}
			}*/
			
			//Get existing user group followers
			List<UserGroup> lsGroupAssignee = iChangeRequest.getGroupAssignees(context);
			MapList mlGroupAssignee = new MapList();
			StringList slGroupAssigneePhyId = new StringList();
			for (int i=0; i<lsGroupAssignee.size(); i++) {
				UserGroup userGroup = lsGroupAssignee.get(i);
				String strUserGroupPhyId = userGroup._physicalid;
				String strUserGroupURI = userGroup._uri;
				String strUserGroupTitle = userGroup._title;
				
				//get physical id from uuid if physical id not there
				if(ChangeUtil.isNullOrEmpty(strUserGroupPhyId) && !ChangeUtil.isNullOrEmpty(strUserGroupURI)) {
					strUserGroupPhyId = FrameworkUtil.getPhysicalIdfromUUId(context, strUserGroupURI);
				}
				
				if(!ChangeUtil.isNullOrEmpty(strUserGroupPhyId)) {
					slGroupAssigneePhyId.add(strUserGroupPhyId);
					
					Map<String, String> mpUserGroup = new HashMap<String, String>();
					mpUserGroup.put(DomainConstants.SELECT_PHYSICAL_ID, strUserGroupPhyId);
					mpUserGroup.put(DomainConstants.ATTRIBUTE_GROUPURI, strUserGroupURI);
					mpUserGroup.put(DomainConstants.ATTRIBUTE_TITLE, strUserGroupTitle);
					mlGroupAssignee.add(mpUserGroup);
				}
			}
			
			//Getting object id from physicalid
			StringList selects = new StringList(2);
			selects.add(DomainConstants.SELECT_ID);
			selects.add(DomainConstants.SELECT_PHYSICAL_ID);
			MapList mlGroupAssigneeId = DomainObject.getInfo(context, (String[])slGroupAssigneePhyId.toArray(new String[slGroupAssigneePhyId.size()]), selects);
			
			//Merging maplist for object id
			for (int i=0; i<mlGroupAssignee.size(); i++) {
				Map mpUserGroup = (Map) mlGroupAssignee.get(i);
				String strUserGroupPhyId = (String) mpUserGroup.get(DomainConstants.SELECT_PHYSICAL_ID);
				for(int j=0; j<mlGroupAssigneeId.size(); j++) {
					Map mpUserGroupId = (Map) mlGroupAssigneeId.get(i);
					String strGroupPhyId = (String) mpUserGroupId.get(DomainConstants.SELECT_PHYSICAL_ID);
					String strGroupId = (String) mpUserGroupId.get(DomainConstants.SELECT_ID);
					if(strUserGroupPhyId.equals(strGroupPhyId)) {
						mpUserGroup.put(DomainConstants.SELECT_ID, strGroupId);
						mlAssignees.add(mpUserGroup);
						assigneeGroups = assigneeGroups.concat(strGroupId+",");
						break;
					}					
				}
			}
						
			//Get existing user followers
			List<String> lsUserAssignee = iChangeRequest.getAssignees(context);
			for (int i=0; i<lsUserAssignee.size(); i++) {
				String assigneeName = (String) lsUserAssignee.get(i);
				String assigneeId = PersonUtil.getPersonObjectID(context, assigneeName);
				String assigneeFullName = PersonUtil.getFullName(context, assigneeName);
				Map<String, String> mpUserAssignee = new HashMap<String, String>();
				mpUserAssignee.put(DomainConstants.SELECT_TYPE, DomainConstants.TYPE_PERSON);
				mpUserAssignee.put(DomainConstants.SELECT_ID, assigneeId);
				mpUserAssignee.put(DomainConstants.SELECT_NAME, assigneeName);
				mpUserAssignee.put(USER_FULL_NAME, assigneeFullName);
				mlAssignees.add(mpUserAssignee);	
				
				assignee = assignee.concat(assigneeId+",");
			}	
			/*if (slMemberListId!=null && !slMemberListId.isEmpty()){
				for (int i=0;i<slMemberListId.size();i++) {
					String memberListId = (String) slMemberListId.get(i);
					String assigneeType = new DomainObject(memberListId).getInfo(context, DomainConstants.SELECT_TYPE);
					informedMemberLists=informedMemberLists.concat(memberListId+",");
				}
			}*/	
		}	
		
		if(assigneeGroups.length()>0 && !assigneeGroups.isEmpty()){
			assigneeGroups = assigneeGroups.substring(0,assigneeGroups.length()-1);
		}
				
		if(assignee.length()>0 && !assignee.isEmpty()){
			assignee = assignee.substring(0,assignee.length()-1);
		}
		/*	
		if(informedMemberLists.length()>0 && !informedMemberLists.isEmpty()){
			informedMemberLists = informedMemberLists.substring(0,informedMemberLists.length()-1);
		}*/
		
		if(!isMobileDevice && ("edit".equalsIgnoreCase(strMode) && isEditable)|| "create".equalsIgnoreCase(strMode))
		{
			String addPeople= EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddPeople", context.getSession().getLanguage());
			String addUserGroup = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.AddUserGroup", context.getSession().getLanguage());
			String remove = EnoviaResourceBundle.getProperty(context,SUITE_KEY,
					"EnterpriseChangeMgt.Command.Remove", context.getSession().getLanguage());
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"IsAssigneesFieldModified\" id=\"IsAssigneesFieldModified\" value=\"false\" readonly=\"readonly\" />");
			//XSSOK
			sb.append("<input type=\"hidden\" name=\"UserAssigneesHidden\" id=\"UserAssigneesHidden\" value=\""+assignee+"\" readonly=\"readonly\" />");
			sb.append("<input type=\"hidden\" name=\"GroupAssigneesHidden\" id=\"GroupAssigneesHidden\" value=\""+assigneeGroups+"\" readonly=\"readonly\" />");
			sb.append("<table>");
			sb.append("<tr>");
			sb.append("<th rowspan=\"3\">");
			sb.append("<select name=\"Assignees\" style=\"width:200px\" multiple=\"multiple\">");

			for (int i=0; i<mlAssignees.size(); i++) {
				Map mpAssignee = (Map) mlAssignees.get(i);
				String strAssigneeType = (String) mpAssignee.get(DomainConstants.SELECT_TYPE);
				String strAssigneePhyId = (String) mpAssignee.get(DomainConstants.SELECT_PHYSICAL_ID);
				String strAssigneeTitle = (String) mpAssignee.get(DomainConstants.ATTRIBUTE_TITLE);
				String strAssigneeGrpURI = (String) mpAssignee.get(DomainConstants.ATTRIBUTE_GROUPURI);
				String strAssigneeId = (String) mpAssignee.get(DomainConstants.SELECT_ID);
				String strAssigneeName = (String) mpAssignee.get(DomainConstants.SELECT_NAME);
				String strAssigneeFullName = (String) mpAssignee.get(USER_FULL_NAME);
				if(!ChangeUtil.isNullOrEmpty(strAssigneeType) && (DomainConstants.TYPE_PERSON.equalsIgnoreCase(strAssigneeType))) {	
					if(!ChangeUtil.isNullOrEmpty(strAssigneeId) && !ChangeUtil.isNullOrEmpty(strAssigneeFullName)) {
						sb.append("<option value=\""+strAssigneeId+"\" >");
						sb.append(strAssigneeFullName);
						sb.append("</option>");	
					}
				}else {
					if(!ChangeUtil.isNullOrEmpty(strAssigneeId) && !ChangeUtil.isNullOrEmpty(strAssigneeTitle)) {
						sb.append("<option value=\""+strAssigneeId+"\" >");
						sb.append(strAssigneeTitle);
						sb.append("</option>");	
					}					
				}
			}
			
			sb.append("</select>");
			sb.append("</th>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:addUserAssigneesSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addUserAssigneesSelectors()\">");
			//XSSOK
			sb.append(addPeople);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:addGroupAssigneesSelectors()\">");
			sb.append("<img src=\"../common/images/iconStatusAdded.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:addGroupAssigneesSelectors()\">");
			//XSSOK
			sb.append(addUserGroup);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			
			sb.append("<tr>");
			sb.append("<td>");
			sb.append("<a href=\"javascript:removeAssignees()\">");
			sb.append("<img src=\"../common/images/iconStatusRemoved.gif\" width=\"12\" height=\"12\" border=\"0\" />");
			sb.append("</a>");
			sb.append("<a href=\"javascript:removeAssignees()\">");
			//XSSOK
			sb.append(remove);
			sb.append("</a>");
			sb.append("</td>");
			sb.append("</tr>");
			sb.append("</table>");			
			
		}else {
			if(!exportToExcel) {
				sb.append("<input type=\"hidden\" name=\"UserAssigneesHidden\" id=\"UserAssigneesHidden\" value=\""+assignee+"\" readonly=\"readonly\" />");
				sb.append("<input type=\"hidden\" name=\"GroupAssigneesHidden\" id=\"GroupAssigneesHidden\" value=\""+assigneeGroups+"\" readonly=\"readonly\" />");
			}

			for (int i=0; i<mlAssignees.size(); i++) {
				Map mpAssignee = (Map) mlAssignees.get(i);
				String strAssigneeType = (String) mpAssignee.get(DomainConstants.SELECT_TYPE);
				String strAssigneePhyId = (String) mpAssignee.get(DomainConstants.SELECT_PHYSICAL_ID);
				String strAssigneeTitle = (String) mpAssignee.get(DomainConstants.ATTRIBUTE_TITLE);
				String strAssigneeGrpURI = (String) mpAssignee.get(DomainConstants.ATTRIBUTE_GROUPURI);
				String strAssigneeId = (String) mpAssignee.get(DomainConstants.SELECT_ID);
				String strAssigneeName = (String) mpAssignee.get(DomainConstants.SELECT_NAME);
				String strAssigneeFullName = (String) mpAssignee.get(USER_FULL_NAME);
				if(!ChangeUtil.isNullOrEmpty(strAssigneeType) && (DomainConstants.TYPE_PERSON.equalsIgnoreCase(strAssigneeType))) {	
					if(!ChangeUtil.isNullOrEmpty(strAssigneeId) && !ChangeUtil.isNullOrEmpty(strAssigneeFullName)) {
						if(!exportToExcel) {
							sb.append("<input type=\"hidden\" name=\""+strAssigneeFullName+"\" value=\""+strAssigneeId+"\" />");
						}
						sb.append(strAssigneeFullName);
						if(i < mlAssignees.size()-1) {	
							if(!exportToExcel) {	
								sb.append("<br>");
							}else {
								sb.append("\n");
							}
						}
					}
				}else {
					if(!ChangeUtil.isNullOrEmpty(strAssigneeId) && !ChangeUtil.isNullOrEmpty(strAssigneeTitle)) {
						if(!exportToExcel) {
							sb.append("<input type=\"hidden\" name=\""+strAssigneeTitle+"\" value=\""+strAssigneeId+"\" />");
							sb.append("<a onclick='findFrame(getTopWindow(), \"content\").location.href = \"../common/emxTree.jsp?objectId="+strAssigneeId+"\"'>");
						}
						sb.append(strAssigneeTitle);	
						if(i < mlAssignees.size()-1) {
							if(!exportToExcel){
								sb.append("</a>");								
								sb.append("<br>");
							}else {
								sb.append("\n");
							}
						}
					}					
				}			
			}			
		}		
		return sb.toString();
	}
	
	/**
	 * connectInformedUsersWithGroup - Connect Change request and Person or user group
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 * Added for IR-875061-3DEXPERIENCER2022x
	 */
	@com.matrixone.apps.framework.ui.ConnectionProgramCallable
	public void connectInformedUsersWithGroup(Context context, String[] args)throws Exception
	{
		Map programMap = (HashMap)JPO.unpackArgs(args);
		HashMap hmParamMap = (HashMap)programMap.get("paramMap");
		String changeRequestId = (String)hmParamMap.get("objectId");
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String[] strNewUserFollowerArr = (String[])requestMap.get("UserFollowersHidden");
		String[] strNewGroupFollowerArr = (String[])requestMap.get("GroupFollowersHidden");
		String[] strNewMemberListFollowerArr = (String[])requestMap.get("MemberListFollowersHidden");
		
		String[] strIsFieldModifiedArr = (String[])requestMap.get("IsInformedUsersWithGroupFieldModified");
		String strIsFieldModified = "true";
		if(strIsFieldModifiedArr != null && strIsFieldModifiedArr.length > 0){
			strIsFieldModified = strIsFieldModifiedArr[0];				
		}	
		
		//To make the decision of calling connect/disconnect method only on field modification.
		if("true".equalsIgnoreCase(strIsFieldModified)){
			
			DomainObject domChangeRequest = DomainObject.newInstance(context, changeRequestId);
			IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
			IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domChangeRequest); 
			
			String strNewUserFollowers = null;			
			if(strNewUserFollowerArr != null && strNewUserFollowerArr.length > 0){
				strNewUserFollowers = strNewUserFollowerArr[0];
			}
			
			String strNewGroupFollowers = null;			
			if(strNewGroupFollowerArr != null && strNewGroupFollowerArr.length > 0){
				strNewGroupFollowers = strNewGroupFollowerArr[0];
			}
			
			String strNewMemberListFollowers = null;			
			if(strNewMemberListFollowerArr != null && strNewMemberListFollowerArr.length > 0){
				strNewMemberListFollowers = strNewMemberListFollowerArr[0];
			}
			
			StringList selects = new StringList(4);
			selects.add(DomainConstants.SELECT_TYPE);
			selects.add(DomainConstants.SELECT_NAME);
			selects.add(DomainConstants.SELECT_ID);
			selects.add(DomainConstants.SELECT_PHYSICAL_ID);
			
			StringList slInformedUsers = new StringList();
			StringTokenizer strNewUserFollowersList = new StringTokenizer(strNewUserFollowers,",");
			while (strNewUserFollowersList.hasMoreTokens()){
				String strInformedUser = strNewUserFollowersList.nextToken().trim();
				slInformedUsers.add(strInformedUser);
			}
			
			StringTokenizer strNewGroupFollowersList = new StringTokenizer(strNewGroupFollowers,",");
			while (strNewGroupFollowersList.hasMoreTokens()){
				String strInformedUser = strNewGroupFollowersList.nextToken().trim();
				slInformedUsers.add(strInformedUser);
			}
			
			MapList mlInformedUsers = DomainObject.getInfo(context, (String[])slInformedUsers.toArray(new String[slInformedUsers.size()]), selects);
			
			List<String> newInformedUserNameList = new ArrayList<String>();
			List<String> newGroupFollowerList = new ArrayList<String>();
			for(int i=0; i<mlInformedUsers.size(); i++) {
				Map mpInformedUser = (Map)mlInformedUsers.get(i);
				String strInformedUserPhyId = (String) mpInformedUser.get(DomainConstants.SELECT_PHYSICAL_ID);
				String strInformedUserType = (String) mpInformedUser.get(DomainConstants.SELECT_TYPE);
				String strInformedUserName = (String) mpInformedUser.get(DomainConstants.SELECT_NAME);
				if(!ChangeUtil.isNullOrEmpty(strInformedUserType) && (DomainConstants.TYPE_PERSON.equalsIgnoreCase(strInformedUserType))) {	
					newInformedUserNameList.add(strInformedUserName);
				}else {
					newGroupFollowerList.add(strInformedUserPhyId);
				}
			}
			
			//Existing group followers
			List<UserGroup> lsGroupFollower = iChangeRequest.getGroupFollowers(context);
			List<String> lsExistinGroupFollower = new ArrayList<String>();
			for(int i=0; i<lsGroupFollower.size(); i++) {
				UserGroup userGroup = lsGroupFollower.get(i);
				String strUserGroupPhyId = userGroup._physicalid; 
				String strUserGroupURI = userGroup._uri; 
				//get physical id from uuid if physical id not there
				if(ChangeUtil.isNullOrEmpty(strUserGroupPhyId) && !ChangeUtil.isNullOrEmpty(strUserGroupURI)) {
					strUserGroupPhyId = FrameworkUtil.getPhysicalIdfromUUId(context, strUserGroupURI);
				}
				lsExistinGroupFollower.add(strUserGroupPhyId);				
			}
			
			List<String> groupFollowerDisconnectList = differenceBetweenList(lsExistinGroupFollower, newGroupFollowerList);
			List<String> groupFollowerConnectList = differenceBetweenList(newGroupFollowerList, lsExistinGroupFollower);
			
			//Existing Informed Users
			List<String> lsUserFollower = iChangeRequest.getFollowers(context);
			
			List<String> informedUsersDisconnectList = differenceBetweenList(lsUserFollower, newInformedUserNameList);
			List<String> informedUsersConnectList = differenceBetweenList(newInformedUserNameList, lsUserFollower);
			
			//Disconnecting old informed users from Change Request
			for(String strFollower : informedUsersDisconnectList) {
				iChangeRequest.removeFollower(context, strFollower);
			}
						
			//Connecting new informed users to Change Request
			for(String strFollower : informedUsersConnectList) {
				iChangeRequest.addFollower(context, strFollower);	
			}
			
			//Disconnecting old group follower from Change Request
			for(String strGroupFollower : groupFollowerDisconnectList) {
				iChangeRequest.removeGroupAsFollower(context, strGroupFollower);
			}
						
			//Connecting new group follower to Change Request
			for(String strGroupFollower : groupFollowerConnectList) {
				iChangeRequest.addGroupAsFollower(context, strGroupFollower);	
			}
			
			//Code for handling member list remove
			//Creating set of updated member list after edit
			StringTokenizer strNewMemberListFollowersList = new StringTokenizer(strNewMemberListFollowers,",");
			Set<String> setOfNewMemberListIDs = new HashSet<>();
			while (strNewMemberListFollowersList.hasMoreTokens()){
				String strInformedUser = strNewMemberListFollowersList.nextToken().trim();
				setOfNewMemberListIDs.add(strInformedUser);
			}
			
			//getting existing
			MapList mlExistingMemberList = domChangeRequest.getRelatedObjects(context,
					  DomainConstants.RELATIONSHIP_EC_DISTRIBUTION_LIST,
					  DomainConstants.TYPE_MEMBER_LIST,
					  new StringList(DomainConstants.SELECT_ID),
					  new StringList(DomainRelationship.SELECT_ID),
					  false,
					  true,
					  (short) 1,
					  null, null, (short) 0);
			List<String> memberListFollowerDisconnectList = new ArrayList<String>();
			if(!mlExistingMemberList.isEmpty()){
				Iterator itrMemberList = mlExistingMemberList.iterator();
				while(itrMemberList.hasNext()){
					Map memberList = (Map)itrMemberList.next();
					String memberListId = (String) memberList.get(DomainConstants.SELECT_ID);
					String memberListRelId = (String) memberList.get(DomainRelationship.SELECT_ID);
					if(!setOfNewMemberListIDs.contains(memberListId)) {
						memberListFollowerDisconnectList.add(memberListRelId);
					}
				}
			}
			
			//if disconnectlist has items disconnect them
			if(memberListFollowerDisconnectList.size()>0) {
				String[] memberListFollowerDisconnectArr = new String[memberListFollowerDisconnectList.size()];
				memberListFollowerDisconnectArr = memberListFollowerDisconnectList.toArray(memberListFollowerDisconnectArr);
				DomainRelationship.disconnect(context, memberListFollowerDisconnectArr);
			}
			
		}					
	}
	/**
	 * connectAssignee - Connect Change request and Person or user group
	 * @param context
	 * @param args
	 * @return
	 * @throws Exception
	 */
	@com.matrixone.apps.framework.ui.ConnectionProgramCallable
	public void connectAssignee(Context context, String[] args)throws Exception
	{
		Map programMap = (HashMap)JPO.unpackArgs(args);
		HashMap hmParamMap = (HashMap)programMap.get("paramMap");
		String changeRequestId = (String)hmParamMap.get("objectId");
		HashMap requestMap = (HashMap) programMap.get("requestMap");
		String[] strNewUserAssigneeArr = (String[])requestMap.get("UserAssigneesHidden");
		String[] strNewGroupAssigneeArr = (String[])requestMap.get("GroupAssigneesHidden");
		
		String[] strIsFieldModifiedArr = (String[])requestMap.get("IsAssigneesFieldModified");
		String strIsFieldModified = "true";
		if(strIsFieldModifiedArr != null && strIsFieldModifiedArr.length > 0){
			strIsFieldModified = strIsFieldModifiedArr[0];				
		}	
		
		//To make the decision of calling connect/disconnect method only on field modification.
		if("true".equalsIgnoreCase(strIsFieldModified)){
			
			DomainObject domChangeRequest = DomainObject.newInstance(context, changeRequestId);
			IChangeRequestServices changeRequestFactory = ChangeRequestFactory.createChangeRequestFactory();
			IChangeRequest iChangeRequest = changeRequestFactory.retrieveChangeRequestFromDatabase(context, domChangeRequest); 
			
			String strNewUserAssignees = null;			
			if(strNewUserAssigneeArr != null && strNewUserAssigneeArr.length > 0){
				strNewUserAssignees = strNewUserAssigneeArr[0];
			}
			
			String strNewGroupAssignees = null;			
			if(strNewGroupAssigneeArr != null && strNewGroupAssigneeArr.length > 0){
				strNewGroupAssignees = strNewGroupAssigneeArr[0];
			}
			
			StringList selects = new StringList(4);
			selects.add(DomainConstants.SELECT_TYPE);
			selects.add(DomainConstants.SELECT_NAME);
			selects.add(DomainConstants.SELECT_ID);
			selects.add(DomainConstants.SELECT_PHYSICAL_ID);
			
			StringList slAssignees = new StringList();
			StringTokenizer strNewUserAssigneesList = new StringTokenizer(strNewUserAssignees,",");
			while (strNewUserAssigneesList.hasMoreTokens()){
				String strAssignee = strNewUserAssigneesList.nextToken().trim();
				slAssignees.add(strAssignee);
			}
			
			StringTokenizer strNewGroupAssigneesList = new StringTokenizer(strNewGroupAssignees,",");
			while (strNewGroupAssigneesList.hasMoreTokens()){
				String strAssignee = strNewGroupAssigneesList.nextToken().trim();
				slAssignees.add(strAssignee);
			}
			
			MapList mlAssignees = DomainObject.getInfo(context, (String[])slAssignees.toArray(new String[slAssignees.size()]), selects);
			
			List<String> newAssigneeNameList = new ArrayList<String>();
			List<String> newGroupAssigneeList = new ArrayList<String>();
			for(int i=0; i<mlAssignees.size(); i++) {
				Map mpAssignee = (Map)mlAssignees.get(i);
				String strAssigneePhyId = (String) mpAssignee.get(DomainConstants.SELECT_PHYSICAL_ID);
				String strAssigneeType = (String) mpAssignee.get(DomainConstants.SELECT_TYPE);
				String strAssigneeName = (String) mpAssignee.get(DomainConstants.SELECT_NAME);
				if(!ChangeUtil.isNullOrEmpty(strAssigneeType) && (DomainConstants.TYPE_PERSON.equalsIgnoreCase(strAssigneeType))) {	
					newAssigneeNameList.add(strAssigneeName);
				}else {
					newGroupAssigneeList.add(strAssigneePhyId);
				}
			}
			
			//Existing group followers
			List<UserGroup> lsGroupAssignee = iChangeRequest.getGroupAssignees(context);
			List<String> lsExistinGroupAssignee = new ArrayList<String>();
			for(int i=0; i<lsGroupAssignee.size(); i++) {
				UserGroup userGroup = lsGroupAssignee.get(i);
				String strUserGroupPhyId = userGroup._physicalid; 
				String strUserGroupURI = userGroup._uri; 
				//get physical id from uuid if physical id not there
				if(ChangeUtil.isNullOrEmpty(strUserGroupPhyId) && !ChangeUtil.isNullOrEmpty(strUserGroupURI)) {
					strUserGroupPhyId = FrameworkUtil.getPhysicalIdfromUUId(context, strUserGroupURI);
				}
				lsExistinGroupAssignee.add(strUserGroupPhyId);				
			}
			
			List<String> groupAssigneeDisconnectList = differenceBetweenList(lsExistinGroupAssignee, newGroupAssigneeList);
			List<String> groupAssigneeConnectList = differenceBetweenList(newGroupAssigneeList, lsExistinGroupAssignee);
			
			//Existing Informed Users
			List<String> lsUserAssignee = iChangeRequest.getAssignees(context);
			
			List<String> assigneesDisconnectList = differenceBetweenList(lsUserAssignee, newAssigneeNameList);
			List<String> assigneesConnectList = differenceBetweenList(newAssigneeNameList, lsUserAssignee);
			
			//Disconnecting old assignee from Change Request
			for(String strAssignee : assigneesDisconnectList) {
				iChangeRequest.removeAssignee(context, strAssignee);
			}
						
			//Connecting new assignee to Change Request
			for(String strAssignee : assigneesConnectList) {
				iChangeRequest.addAssignee(context, strAssignee);	
			}
			
			//Disconnecting old group assignee from Change Request
			for(String strGroupAssignee : groupAssigneeDisconnectList) {
				iChangeRequest.removeGroupAsAssignee(context, strGroupAssignee);
			}
						
			//Connecting new group assignee to Change Request
			for(String strGroupAssignee : groupAssigneeConnectList) {
				iChangeRequest.addGroupAsAssignee(context, strGroupAssignee);	
			}
			
		}					
	}
	
	 /**
   	 * Method returns uuids to exclude in FTS for onCloud
   	 * @param context
   	 * @param args
   	 * @return stringlist
   	 * @throws Exception
   	 * @since R424
   	 */
	@com.matrixone.apps.framework.ui.ExcludeOIDProgramCallable
   	public StringList excludeUserGroups(Context context, String[] args ) throws Exception
   	{
		StringList excludeOID = new StringList();
		
		HashMap paramMap = (HashMap)JPO.unpackArgs(args);
		boolean isRDFQuery = UIUtil.isNotNullAndNotEmpty((String)paramMap.get("rdfQuery")); 
		String txtExcludeOIDs = (String)paramMap.get("txtExcludeOIDs");
		if(UIUtil.isNotNullAndNotEmpty(txtExcludeOIDs)) {
			StringList oids = StringUtil.split(txtExcludeOIDs, ",");			
			if(isRDFQuery && UINavigatorUtil.isCloud(context)) {
				String strSelectAttributeGroupURI = "attribute[" +DomainConstants.ATTRIBUTE_GROUPURI+ "]";
				StringList selects = new StringList();
				selects.add(strSelectAttributeGroupURI);			
				MapList mlUserGroup = DomainObject.getInfo(context, (String[])oids.toArray(new String[oids.size()]), selects);
				for(int i=0; i<mlUserGroup.size(); i++) {
					Map mpUserGroup = (Map) mlUserGroup.get(i);
					String strUserGroupURI = (String)mpUserGroup.get(strSelectAttributeGroupURI);
					if(UIUtil.isNotNullAndNotEmpty(strUserGroupURI)) {
						excludeOID.add(strUserGroupURI);
					}
				}
			}
		}
		return excludeOID;
   	}

	/**
	 * This method is used as access function for change objects properties commands
	 * @param context
	 * @return True or False
	 * @throws Exception
	 */
	public boolean isAccessAllowed(Context context,String []args) throws Exception {
		
		boolean isAccessAllowed = false;
		try{		
			//unpacking the Arguments from variable args
			HashMap programMap      = (HashMap)JPO.unpackArgs(args);
			String changeRequestId  = (String)programMap.get(ChangeConstants.OBJECT_ID);
			Map CommandSettingsMap  = (Map)programMap.get("SETTINGS");
			String accessBit        = (String)CommandSettingsMap.get("AccessBit");
			
			ChangeRequest changeRequest = new ChangeRequest(changeRequestId);
				
			//Has Access to functions
			isAccessAllowed = changeRequest.getAccess(context, accessBit);
		} catch (Exception e) {
			throw new Exception(e.getLocalizedMessage());
		}	
		return  isAccessAllowed;
	}
	
	
	/**
	 * This method check if manage members are allowed on CR
	 * @param context
	 * @param args
	 * @return 
	 * @throws Exception
	 */
	 @com.matrixone.apps.framework.ui.PreProcessCallable
	public void checkIfManageMembersAllowed(Context context,String []args) throws Exception {
		try {			
			Map programMap = JPO.unpackArgs(args);
			Map requestMap = (Map) programMap.get("requestMap");
			
			String strObjectId = (String) requestMap.get("parentOID");
			String formName    = (String) requestMap.get("form");
			
			Map<?, ?> formMap = (Map<?, ?>) programMap.get("formMap");
			MapList formFieldList = (MapList) formMap.get("fields");
			
			boolean isSetCoordinatorAllowed = false;
			boolean isManageAssigneeAllowed = false;
			boolean isManageFollowersAllowed = false;
			boolean isManageRouteTemplatesAllowed = false;   	
					
			HashMap accessMap = new HashMap();
			HashMap argMap = new HashMap();
			argMap.put("objectId", strObjectId);
			
			accessMap.put("AccessBit", "SetCoordinator");
			argMap.put("SETTINGS", accessMap);
			isSetCoordinatorAllowed = isAccessAllowed(context, JPO.packArgs(argMap));
			
			accessMap.put("AccessBit", "ManageAssignees");
			argMap.put("SETTINGS", accessMap);
			isManageAssigneeAllowed = isAccessAllowed(context, JPO.packArgs(argMap));
			
			accessMap.put("AccessBit", "ManageFollowers");
			argMap.put("SETTINGS", accessMap); 
			isManageFollowersAllowed = isAccessAllowed(context, JPO.packArgs(argMap));			
			
			accessMap.put("AccessBit", "ManageRouteTemplates");
			argMap.put("SETTINGS", accessMap);
			isManageRouteTemplatesAllowed = isAccessAllowed(context, JPO.packArgs(argMap));
			
			if(formName.equals("type_ChangeRequest")){
				for (Object map : formFieldList) {
					Map fieldMap = (Map) map;
					String strFieldName = (String) fieldMap.get(DomainObject.SELECT_NAME);
				
					if ((strFieldName.equals("ChangeCoordinator") && !isSetCoordinatorAllowed) || (strFieldName.equals("Assignee") && !isManageAssigneeAllowed) || (strFieldName.equals("InformedUsersWithGroup") && !isManageFollowersAllowed) || (strFieldName.equals("ReviewerList") && !isManageRouteTemplatesAllowed)) {
						Map settingMap = (Map) fieldMap.get("settings");
						settingMap.put("Editable", "false");
					}
				}
			}
		} catch (Exception e) {
			throw new Exception(e.getLocalizedMessage());
		}	
	}
	
}

