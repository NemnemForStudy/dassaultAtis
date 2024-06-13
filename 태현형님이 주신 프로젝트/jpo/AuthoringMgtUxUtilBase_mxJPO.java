
import com.matrixone.apps.domain.DomainObject;
import matrix.db.Context;
import com.matrixone.apps.domain.util.FrameworkException;
import matrix.db.JPO;
import matrix.util.StringList;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.jdom.*;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.dassault_systemes.enovia.changeaction.factory.ChangeActionFactory;
import com.dassault_systemes.enovia.changeaction.interfaces.IChangeActionServices;
import com.matrixone.apps.domain.DomainConstants;

public class AuthoringMgtUxUtilBase_mxJPO extends emxDomainObject_mxJPO {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static final String SUITE_KEY = "EnterpriseChangeMgt";
	public static final String TYPE_CHANGE_ACTION = PropertyUtil.getSchemaProperty("type_ChangeAction");
	public static final String POLICY_CHANGE_ACTION = PropertyUtil.getSchemaProperty("policy_ChangeAction");
	public static final String STATE_CHANGE_ACTION_INWORK = PropertyUtil.getSchemaProperty("policy", POLICY_CHANGE_ACTION, "state_InWork");
	public static final String SELECT_PHYSICAL_ID = "physicalid";
	public static final String ATTRIBUTE_CHANGE_ID = PropertyUtil.getSchemaProperty("attribute_ChangeId");
	
	public AuthoringMgtUxUtilBase_mxJPO(Context context, String[] args)throws Exception {
		super(context, args);
	}
	
	public boolean displayWorkUnderUX(Context context, String[] args) throws Exception{
		
		boolean isWorkUnderUXAccessible = false;
		boolean editCreateCheck = false;
		boolean workUnderAllowedFromChange = true;
		boolean workUnderAllowedFromApp = true;
		
		HashMap paramMap   = (HashMap) JPO.unpackArgs(args);
		/*
		String sCreateEditMode = (String)paramMap.get("mode");
			
		//true if called from create form or edit form or structure browser 
		if("edit".equals(sCreateEditMode) || "create".equals(sCreateEditMode) || UIUtil.isNotNullAndNotEmpty((String)paramMap.get("table")) ){
			editCreateCheck = true;
		}
		*/
		//validate app access on work under field
		String appWorkUnderCheck = (String)paramMap.get("ECMWorkUnderAppAccessJPOMethod");
		if ((appWorkUnderCheck != null && appWorkUnderCheck.trim().length() > 0)){
			String programParam = appWorkUnderCheck.trim();
			int index = programParam.indexOf(":");
			if (index > 0) {
                String program = programParam.substring(0, index);
                String method = programParam.substring(index + ":".length());
                
                try {
					FrameworkUtil.validateMethodBeforeInvoke(context, program, method,"program");
					workUnderAllowedFromApp = JPO.invoke(context, program, null, method, args, Boolean.class);
                } catch (Exception exJPO) {
                    throw (new FrameworkException(exJPO.toString()));
                }
            }
		}
				 
		//workUnderAllowedFromChange = modelerAPI();
		
		isWorkUnderUXAccessible = workUnderAllowedFromChange && workUnderAllowedFromApp /*&& editCreateCheck*/ ;
	
		return isWorkUnderUXAccessible;
	}	
	
	@com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
	public StringList getEligibleWorkunderChangeAction(Context context, String[] args) throws Exception
	{
	    HashMap programMap = (HashMap) JPO.unpackArgs(args);
	    String strObjectId = (String)  programMap.get("objectId");
	    StringList returnList = new StringList();
	    
	    try{
	          StringList objectSelects = new StringList();
	          objectSelects.add(SELECT_ID);
	          String objectWhere = "from[Technical Assignee].to.name == \""+context.getUser()+"\" || owner == \""+ context.getUser() +"\" ";

	          MapList ownedCO = DomainObject.findObjects(context,
	        		  TYPE_CHANGE_ACTION,                                 // type filter
	                  QUERY_WILDCARD,         // vault filter
	                  objectWhere,                            // where clause
	                  objectSelects);                         // object selects
	          returnList = getStringListFromMapList(ownedCO, "id");
	      }catch (Exception e) {

	          throw e;
	      }
	    	    
	    return returnList;
	}
	
	public static StringList getStringListFromMapList(MapList mList, String key) {
	   	Map map;
	   	int size = mList.size();
	   	StringList listReturn = new StringList(size);

	   	for (int i = 0; i < size; i++) {
	   		map = (Map) mList.get(i);
	   		listReturn.addAll(getListValue(map, key));
	   	}

	   	return listReturn;
	   }
	
	public static StringList getListValue(Map map, String key) {
  		Object data = map.get(key);
  		return (data == null) ? new StringList(0) : ((data instanceof String) ? new StringList((String) data) : (StringList) data);
  	}
	
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String getWorkUnderFormField(Context context, String[] args) throws Exception{
		
			StringBuffer sbBuffer  = new StringBuffer();
			 
		    Map programMap = (HashMap) JPO.unpackArgs(args);
		 
		    Map fieldMap = (HashMap) programMap.get("fieldMap");
		    String strFieldName = (String)fieldMap.get("name");
		    
		    String changeControlCAName = EMPTY_STRING;
	    	String changeControlCAId = EMPTY_STRING;
	    	String changeControlCAType 	 = EMPTY_STRING;
			String changeControlCACurrent = EMPTY_STRING;
	    	
	    	
	        Map changeControlCAInfo = getChangeControlCA(context, args);
	        
	        if(changeControlCAInfo != null && changeControlCAInfo.containsKey(DomainConstants.SELECT_CURRENT)){
				changeControlCACurrent = (String)changeControlCAInfo.get(DomainConstants.SELECT_CURRENT);
				if(changeControlCACurrent  != null && STATE_CHANGE_ACTION_INWORK.equalsIgnoreCase(changeControlCACurrent) ){
	        	changeControlCAName = (String)changeControlCAInfo.get(DomainConstants.SELECT_NAME);
	        	changeControlCAId = (String)changeControlCAInfo.get(DomainConstants.SELECT_ID);
	        	changeControlCAType = (String)changeControlCAInfo.get(DomainConstants.SELECT_TYPE);
	        	changeControlCAType = UINavigatorUtil.getTypeIconProperty(context, changeControlCAType);
				}	        	
	        }
		      
		      
	        sbBuffer.append("<div style=\"display: flex;\">");   
		    
	        if(UIUtil.isNullOrEmpty(changeControlCAId)){
	        	  
	        sbBuffer.append("<input type=\"text\" READONLY=\"true\" ");
	        sbBuffer.append("name=\"");
	        sbBuffer.append(XSSUtil.encodeForHTMLAttribute(context, strFieldName));
		        sbBuffer.append("Display\" id=\"\" value=\"\"></input>");
	        sbBuffer.append("<input type=\"hidden\" name=\"");
	        sbBuffer.append(XSSUtil.encodeForHTMLAttribute(context, strFieldName));
		        sbBuffer.append("\" value=\"\"></input>");
	        sbBuffer.append("<input type=\"hidden\" name=\"");
	        sbBuffer.append(XSSUtil.encodeForHTMLAttribute(context, strFieldName));
		        sbBuffer.append("OID\" value=\"\"></input>");
	        sbBuffer.append("<input ");
            sbBuffer.append("type=\"button\" name=\"btnWorkUnderSearch\" ");
            sbBuffer.append("size=\"200\" value=\"...\" alt=\"\" enabled=\"true\" ");
		    sbBuffer.append("onClick=\"javascript:showChooser('../common/emxFullSearch.jsp?suiteKey=EnterpriseChangeMgt");
		    sbBuffer.append("&amp;field=TYPES=type_ChangeAction:CURRENT=policy_ChangeAction.state_InWork");
		    sbBuffer.append("&amp;includeOIDprogram=AuthoringMgtUxUtil:getEligibleWorkunderChangeAction");
		    sbBuffer.append("&amp;table=AuthoringMgtUXSearchResult");
		    sbBuffer.append("&amp;Registered Suite=EnterpriseChangeMgt");
		    sbBuffer.append("&amp;selection=single&amp;showInitialResults=false");
		    sbBuffer.append("&amp;hideHeader=true");		      
		    sbBuffer.append("&amp;submitURL=../common/AEFSearchUtil.jsp");		      
		    sbBuffer.append("&amp;fieldNameActual=");
		    sbBuffer.append(strFieldName);
		    sbBuffer.append("&amp;fieldNameOID=");
		    sbBuffer.append(strFieldName);
		    sbBuffer.append("OID");
		    sbBuffer.append("&amp;fieldNameDisplay=");
		    sbBuffer.append(strFieldName);
		    sbBuffer.append("Display");
		    sbBuffer.append("&amp;HelpMarker=emxhelpfullsearch','850','630')\"></input>");
	        sbBuffer.append("<a href=\"javascript:basicClear('");
	        sbBuffer.append(strFieldName);
	        sbBuffer.append("')\">");
	        	
	        String strClear =
	        EnoviaResourceBundle.getProperty(context, SUITE_KEY,"AuthoringMgtUX.Button.Clear",context.getSession().getLanguage());
	        sbBuffer.append(strClear);
	        sbBuffer.append("</a>");
	        }
	        else{
	        	String strTreeLink = "<a class=\"object\" href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?objectId=" + XSSUtil.encodeForHTMLAttribute(context, changeControlCAId) + "', '800', '575','true','content')\"><img border='0' src='../common/images/"+XSSUtil.encodeForHTMLAttribute(context, changeControlCAType)+"'></img>"+XSSUtil.encodeForHTML(context, changeControlCAName)+"</a>";
	        	sbBuffer.append(strTreeLink);
	        }
	        
	        sbBuffer.append("</div>");     
		    return sbBuffer.toString();
	}
	 
	 /**
	 * 
	 */
	public Map getChangeControlCA(Context context, String[] args) throws FrameworkException {
    	
        Map changeControlCAInfo = new HashMap<String, String>();
                
        try{
        	
        	Map programMap = (HashMap) JPO.unpackArgs(args);
    	    Map requestMap = (HashMap) programMap.get("requestMap");	            
    	    String strObjectId = (String)requestMap.get("objectId");
    	    
    	    changeControlCAInfo = getChangeControlCA(context, strObjectId);
			
			return changeControlCAInfo;
			
		} catch (Exception e) {
			throw new FrameworkException(e);
		}		
    }
	
	/**
	 * 
	 */
	public Map getChangeControlCA(Context context, String strObjectId) throws Exception {
    	
        String ChangeControlCAId = "";
        Map changeControlCAInfo = new HashMap<String, String>();
        List<String> iPidObjectList = new ArrayList<String>(); 
        StringList objectSelects = new StringList(SELECT_PHYSICAL_ID);
        objectSelects.add(DomainConstants.SELECT_ID);
        objectSelects.add(DomainConstants.SELECT_NAME);
        objectSelects.add(DomainConstants.SELECT_TYPE);        
		objectSelects.add(DomainConstants.SELECT_CURRENT);   
    	    
        	if(UIUtil.isNotNullAndNotEmpty(strObjectId)){
        		Map objInfoMap = new DomainObject(strObjectId).getInfo(context, objectSelects);
            	String physicalId = (String)objInfoMap.get(SELECT_PHYSICAL_ID);
            	
            	iPidObjectList.add(physicalId);
            	
    	        IChangeActionServices iChangeActionServices = ChangeActionFactory.CreateChangeActionFactory();
    			Map<String, String> mapChangeControlObject = iChangeActionServices.getChangeControlFromPidList(context,iPidObjectList);
    	    	
    			if(mapChangeControlObject != null && mapChangeControlObject.containsKey(physicalId)){
    				ChangeControlCAId = mapChangeControlObject.get(physicalId);
    			}
    			
    			if(UIUtil.isNotNullAndNotEmpty(ChangeControlCAId) && !ChangeControlCAId.equals("None") 
    					&& !ChangeControlCAId.equals("any") && new DomainObject(ChangeControlCAId).exists(context)){
    				changeControlCAInfo = new DomainObject(ChangeControlCAId).getInfo(context, objectSelects);
    			}
        	}        	
			
			return changeControlCAInfo;
    }
			
	
	public String getChangeAuthoringContextOID(Context context, String[] args) throws Exception 
	{		
		String workUnderChangeId = "";
		
		Map programMap = JPO.unpackArgs(args);
		Map requestMap = (HashMap) programMap.get("requestMap");
		
		Document xmlDOC = (Document)requestMap.get("XMLDoc");
		
		if(xmlDOC != null){
			
			Element rootElement = xmlDOC.getRootElement();
			List <Element> requestMapList = rootElement.getChildren("requestMap");
			
			List <Element> settingList = requestMapList.get(requestMapList.size() - 1).getChildren("setting");
			int size = (settingList == null)? 0 : settingList.size();
			
			Element settingElement;
			
			for (int i = (size - 1); i > -1; i--) {
				settingElement = settingList.get(i);

				if ( "ChangeAuthoringContextOID".equals( settingElement.getAttributeValue("name") ) ) {
					workUnderChangeId = settingElement.getText();
					break;
				}
			}
		}
		
		return workUnderChangeId;
	}
	@com.matrixone.apps.framework.ui.IncludeOIDProgramCallable
	public StringList getWorkUnderChangesForUserFromControllingId(Context context, String[] args) throws Exception
	{
		HashMap programMap = (HashMap) JPO.unpackArgs(args);
	    String strObjectId = (String)  programMap.get("objectId");
	    StringList returnList = new StringList();
		
		IChangeActionServices iChangeActionServices = ChangeActionFactory.CreateChangeActionFactory();
		List<String> changeActionList = iChangeActionServices.getWorkUnderChangesForUserFromControllingId(context, context.getUser(), new DomainObject(strObjectId).getAttributeValue(context, ATTRIBUTE_CHANGE_ID));
		returnList.addAll(changeActionList);
		
		return returnList;
	}
	
}
