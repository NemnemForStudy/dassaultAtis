package com.dassault_systemes.enovia.processsteps;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.fileupload.FileItem;

import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkProperties;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MessageUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.framework.ui.UICache;
import com.matrixone.apps.framework.ui.UIFormCommon;
import com.matrixone.apps.framework.ui.UIMenu;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.framework.lifecycle.LifeCycleUtil;

import matrix.db.AccessConstants;
import matrix.db.BusinessType;
import matrix.db.BusinessTypeList;
import matrix.db.Command;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.MenuObject;
import matrix.db.Policy;
import matrix.db.RelationshipType;
import matrix.dbutil.SelectSetting;
import matrix.util.MatrixException;
import matrix.util.StringList;

/**
 * This program generates XML for configuration of Process Dashboard for
 * Dassault Systemes' DOCO product UI. The details of the generation are
 * described in RFL in PES. This program is to be executed from MQL command
 * line. The program produces traces under <ENOVIA Server installation dir/logs.
 *
 * @author Dassault Systemes
 *
 */
public class ENOProcessStepsUI_mxJPO {

	public MapList renderDynamicEditForm(Context context, String args[]) throws Exception {
		try {
			Map<?, ?> programMap = (Map<?, ?>) JPO.unpackArgs(args);
			Map requestMap = (Map) programMap.get("requestMap");
			String formName =(String) requestMap.get("formName");
			String formFieldName=(String) requestMap.get("fieldName");
			List<String> slDynamicFieldsName=FrameworkUtil.split(formFieldName,",");
			Map<?, ?> formHashMap = UIFormCommon.getForm(context, formName);
			
			List<Map> mList = (MapList) formHashMap.get("fields");
			MapList mlDynamicFormList=new MapList();
			for(Map mFieldMap:mList)
			{
				String fieldName=(String) mFieldMap.get("name");
				if(UIUtil.isNotNullAndNotEmpty(fieldName)&&UIUtil.isNotNullAndNotEmpty(formFieldName))
					for(String dynamicFieldName:slDynamicFieldsName)
					{
						if(fieldName.equals(dynamicFieldName))
							mlDynamicFormList.add(mFieldMap);
					}
					
			}
			if(mlDynamicFormList.size()>0)
				return mlDynamicFormList;
			else 
				return (MapList)mList;
		}
		catch (Exception e) {
			throw new Exception(e.getLocalizedMessage());
		}
		
	}

	public boolean isProcessDashboardEnabled(Context context, String args[]) throws Exception {

		boolean isEnabled = false;

		try {

			Map<?,?> programMap 	= (Map<?,?>) JPO.unpackArgs(args);
			String changeOrderObjId = (String) programMap.get("objectId");

			DomainObject dObj = DomainObject.newInstance(context, changeOrderObjId);
			String strPolicy = dObj.getInfo(context, DomainConstants.SELECT_POLICY);

			String policyControlledDocuments = PropertyUtil.getSchemaProperty(context, "policy_ControlledDocuments");
			String policyControlledDocumentTemplate = PropertyUtil.getSchemaProperty(context, "policy_ControlledDocumentTemplate");
			if (policyControlledDocuments.equals(strPolicy)) {
				isEnabled= true;
			}
			else if (policyControlledDocumentTemplate.equals(strPolicy)) {
				isEnabled = false;
			}
			else{
				try{
					String strIsEnabled = EnoviaResourceBundle.getProperty(context,"enoECMProcessSteps.EnableProcessSteps");
					isEnabled = Boolean.valueOf(strIsEnabled).booleanValue();
				}catch(Exception e1){
					isEnabled = false;
				}
			}
		}
		catch (Exception e) {
			throw new Exception(e.getLocalizedMessage());
		}

		return isEnabled;
	}

	public boolean checkPromoteAccess(Context context, String args[]) throws Exception {

		Boolean promoteAccess = false;

		try {

			Map<?,?> programMap 	= (Map<?,?>)JPO.unpackArgs(args);
			String objectId 		= (String) programMap.get("objectId");

			DomainObject domObj = DomainObject.newInstance(context, objectId);
			promoteAccess 		= domObj.checkAccess(context, (short) AccessConstants.cPromote);
			LifeCycleUtil.checksToPromoteObject(context, DomainObject.newInstance(context,objectId));

		}
		catch (Exception e) {
			promoteAccess = false;
		}

		return promoteAccess.booleanValue();
	}

	public MapList getDynamicCommand(Context context, String[] args) throws Exception {
		MapList commandMapList = new MapList();
		try {
			Map<?, ?> inputMap = (HashMap) JPO.unpackArgs(args);
			Map<?, ?> requestMap = (HashMap) inputMap.get("requestMap");
			String commandName = (String) requestMap.get("commandName");
			UIMenu uiMenu = new UIMenu();
			Map commandPMCWBS = createDynamicCommand(context, commandName, uiMenu, false);
			commandMapList.add(commandPMCWBS);
		}
		catch (Exception e) {
			throw new Exception(e);
		}
		return commandMapList;
	}

	public static Map createDynamicCommand(Context context,String commandName,UIMenu uiMenu,boolean isToUseCommonDir) throws MatrixException
	{
		if(UIUtil.isNullOrEmpty(commandName)){
			throw new IllegalArgumentException();
		}
		Map commandParamMap = new HashMap();
		try {
			commandParamMap = uiMenu.getCommand(context, commandName);
			String strLang = context.getSession().getLanguage();
			String href =(String)commandParamMap.get("href");  //modify href of the command as per suite directory
			StringBuffer sbHref = new StringBuffer(href);

			String label = (String)commandParamMap.get("label");  // internationlise the label
			Map mapSetting = (Map)commandParamMap.get("settings");

			String strRegSuite = null;
			String strToReplace = null;
			//String strStringResourceFileName = null;
			String strNewLabel = null;
			String strImageIconPath = null;

			// code to replace the href as per suite directory
			if(mapSetting != null){
				strRegSuite = (String)mapSetting.get("Registered Suite");
				strImageIconPath = (String)mapSetting.get("Image");
				if(UIUtil.isNotNullAndNotEmpty(strImageIconPath))
				{
					strImageIconPath = strImageIconPath.replace("${COMMON_DIR}","../common" );
					mapSetting.put("Image", strImageIconPath);
				}
			}

			//H1A: Commenting entire block. The reason being the variable "strStringResourceFileName" is not used.

			// code to internationlise the label
			if(UIUtil.isNotNullAndNotEmpty(label)){
				strNewLabel = EnoviaResourceBundle.getProperty(context, strRegSuite, label, strLang);
				commandParamMap.put("label",strNewLabel);
			}
			//code to replace ${suite directory} from herf by appropriate folder name
			if(UIUtil.isNotNullAndNotEmpty(href)) {
				href = href.replace("${COMMON_DIR}","../common" );
				commandParamMap.put("href", href);
			}
		}
		catch(Exception e){
			throw new MatrixException(e);
		}
		return commandParamMap;
	}
	   public String checkinFileFromDrop(Context context, String[] args) throws Exception {

	    	try{
		        Map paramMap = (Map) JPO.unpackArgs(args);
		        String sOID = (String) paramMap.get("objectId");
		        String sRelType = (String) paramMap.get("relationship");
		        String sFolder  = (String) paramMap.get("folder");
		        
		        String sfileName  = (String) paramMap.get("fileName");
		        
		        List files = (List) paramMap.get("files");    
		        
		        
		        if(files.size()>1)
		        {
		        	String errorMsg = EnoviaResourceBundle.getProperty(context,"enoProcessStepsStringResource",context.getLocale(),"enoProcessSteps.Message.PleaseDropOnlyOneFile");
		        	return "ERROR"+errorMsg;
		        }
		        	
		        FileItem f=(FileItem) files.get(0);
		        String uploadFileName= f.getName();
		       
		       if(!sfileName.equals(uploadFileName))
		       {
		    	   String errorMsg = EnoviaResourceBundle.getProperty(context,"enoProcessStepsStringResource",context.getLocale(),"enoProcessSteps.Message.FilenameisnotSame");
		    	   return "ERROR"+errorMsg;
		       }
		     	StringBuffer errorMessage=new StringBuffer();
		    	String errorMsg = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.CommonDocument.DocumentAlreadyExist");
		    	errorMessage.append(errorMsg);
		        
				
		        DomainObject dObject    = new DomainObject(sOID);               
		        String strType     = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_type_DOCUMENTS);
		        String sIsDocument      = dObject.getInfo(context, "type.kindof["+strType+"]");
		        
		        
		        Iterator iter = files.iterator();
		        int index;
		    	String sFilename="";
		    	FileItem file = null;
		    	File outfile = null;
		    	
		    	ContextUtil.startTransaction(context, true);
		    	
		    	
		        while (iter.hasNext())
		        {
		        	file = (FileItem) iter.next();
		            sFilename 		= file.getName();        
		            if(sFilename.contains("/")) {
		        		index = sFilename.lastIndexOf("/");
		        		sFilename = sFilename.substring(index);
		        	}
		        	if(sFilename.contains("\\")) {
		        		index = sFilename.lastIndexOf("\\");
		        		sFilename = sFilename.substring(index+1);
		        	}        
		            outfile = new File(sFolder +  sFilename);
		        	file.write(outfile);
		        
			        if(sRelType.equals("Active Version") && sIsDocument.equalsIgnoreCase("TRUE")) {
			        	
           			CommonDocument doc2 = new CommonDocument(sOID);
						doc2.reviseVersion(context, sfileName, sfileName, null);
			            CommonDocument cDoc = new CommonDocument(sOID);
			            cDoc.checkinFile(context, true, true, "", "generic", sFilename, sFolder);
			            
			        }
			        outfile.delete();
		        }
		        ContextUtil.commitTransaction(context);        
		        return "";       
	        
	    	}catch (Exception ex) {
	            ContextUtil.abortTransaction(context);
	            ex.printStackTrace();
	            return "ERROR"+ex.getMessage();
	    	}
	    }  
	   
	   // Drop column
	    public String checkinFile(Context context, String[] args) throws Exception {

	    	try{
		        Map paramMap = (Map) JPO.unpackArgs(args);
		        String sLanguage = (String) paramMap.get("language");
				String timeZone = (String) paramMap.get("timezone");
		        String sOID = (String) paramMap.get("objectId");
		        String sRelType = (String) paramMap.get("relationship");
		        String sFolder  = (String) paramMap.get("folder");
		        List files = (List) paramMap.get("files");        		
		        
		        HashMap uploadParamsMap=new HashMap();
		        String objectAction = (String) paramMap.get("objectAction"); 
		        uploadParamsMap.put("objectAction", objectAction);
		        uploadParamsMap.put("parentId", sOID); 
		        StringList ids=new StringList();
		        
		        String documentCommand  = (String) paramMap.get("documentCommand");        
		        DomainObject dObject    = new DomainObject(sOID);               
		        String strType     = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_type_DOCUMENTS);
		        RelationshipType relTypes = new RelationshipType(sRelType);
		        BusinessTypeList allowedFromTypes = relTypes.getFromTypes(context, true);
		        StringList selectableList	=	new StringList();
		    	selectableList.add("type.kindof["+strType+"]");
		    	selectableList.add(DomainObject.SELECT_TYPE);
		        Map objectInfo			=	dObject.getInfo(context,selectableList);
		        String sIsDocument      = (String)objectInfo.get("type.kindof["+strType+"]");
		        String typeName      = (String)objectInfo.get(DomainObject.SELECT_TYPE);
		        BusinessType bType		= allowedFromTypes.find(typeName);
		        
		        if(bType == null){
		        	
		        	Locale locale = context.getLocale();
		        	String type1 = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",locale,"emxFramework.Type.Document");
		        	String key = "emxFramework.Type." + dObject.getTypeName().replace(' ', '_');
		        	String type2 = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",locale,key);
		        	String[] messageValues = new String[]{type1,type2};
			        String msg = MessageUtil.getMessage(context, null, "emxComponents.DragAndDrop.WarningMessage",messageValues, null, locale, "emxComponentsStringResource");
		        	return "ERROR"+msg; 
		        }
		        //String strType     = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_type_DOCUMENTS);
		        //String sIsDocument      = dObject.getInfo(context, "type.kindof["+strType+"]");
		        
		        
		        if(UIUtil.isNullOrEmpty(sRelType)){
		        	sRelType = "Reference Document";
		        }
		        if( UIUtil.isNullOrEmpty(documentCommand)){
		        	documentCommand = "APPReferenceDocumentsTreeCategory";
		        }
		        
		        Iterator iter = files.iterator();
		        int index;
		    	String sFilename="";
		    	FileItem file = null;
		    	File outfile = null;
		    	StringBuffer errorMessage=new StringBuffer();
		    	String errorMsg = EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.CommonDocument.DocumentAlreadyExist");
		    	errorMessage.append(errorMsg);
		    	if(isDuplicateFile(context, sOID, files, errorMessage)){
		    		return "ERROR"+errorMessage;
		    	}
		    	ContextUtil.startTransaction(context, true);
		        while (iter.hasNext())
		        {
		        	file = (FileItem) iter.next();
		            sFilename 		= file.getName();        
		            if(sFilename.contains("/")) {
		        		index = sFilename.lastIndexOf("/");
		        		sFilename = sFilename.substring(index);
		        	}
		        	if(sFilename.contains("\\")) {
		        		index = sFilename.lastIndexOf("\\");
		        		sFilename = sFilename.substring(index+1);
		        	}        
		            outfile = new File(sFolder +  sFilename);
		        	file.write(outfile);
		        
			        if(sRelType.equals("Active Version") && sIsDocument.equalsIgnoreCase("TRUE")) {
			            CommonDocument cDoc = new CommonDocument(sOID);
						cDoc.createVersion(context, sFilename, sFilename, null); 
			            cDoc.checkinFile(context, true, true, "", "generic", sFilename, sFolder);
			            
			            
			            
			        } else {
			        	String sObjGeneratorName = UICache.getObjectGenerator(context, "type_Document", "");
			        	String sName = DomainObject.getAutoGeneratedName(context, sObjGeneratorName, "");		       
						String docPolicy = PropertyUtil.getSchemaProperty(EnoviaResourceBundle.getProperty(context, "emxFrameowrk.FileUpload.Default.Policy"));
						if (UIUtil.isNotNullAndNotEmpty(docPolicy)) {
			            	CommonDocument cDoc = new CommonDocument(); 
							Policy policy = new Policy(docPolicy);
			            	String revision = policy.getFirstInSequence(context);
							cDoc.createObject(context, DomainObject.TYPE_DOCUMENT, sName, revision, docPolicy, context.getVault().getName());
							cDoc.createVersion(context, sFilename, sFilename, null);
				            cDoc.checkinFile(context, true, true, "", "generic", sFilename, sFolder); 
				            
				            cDoc.addRelatedObject(context, new RelationshipType(sRelType), true, sOID);
				            cDoc.setAttributeValue(context, "Title", sFilename);
				            ids.add(cDoc.getId(context));
						}
			        }        
		        
			        outfile.delete();
		        }
		        HashMap params = new HashMap();
		        params.put("uploadParamsMap",uploadParamsMap);
		        params.put("objectIds",ids);
		        String initargs[] = {};
		        JPO.invoke(context, "emxTeamDocumentBase", initargs, "postCheckinDND", JPO.packArgs (params));
		        ContextUtil.commitTransaction(context);        
		       // 
		        return genHeaderDocuments(context, sOID,sRelType, documentCommand, sLanguage, false,timeZone);        
	        
	    	}catch (Exception ex) {
	            ContextUtil.abortTransaction(context);
	            ex.printStackTrace();
	            return "ERROR"+ex.getMessage();
	    	}
	    }     
	    public static String genHeaderDocuments(Context context, String sOID, String sRelationship, String sCommand,  String sLanguage, Boolean bFromJSP, String timeZone) throws Exception {

	    	StringBuilder sbResult  = new StringBuilder();
	        StringList selDocuments = new StringList();
	        DomainObject dObject    = new DomainObject(sOID);
	        StringList selBUS       = new StringList();
	        String className =" document-count";
	        String sProjectVault     = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_type_ProjectVault);

	        selBUS.add(DomainConstants.SELECT_CURRENT);
	        selBUS.add(DomainConstants.SELECT_TYPE);
	        selBUS.add("type.kindof");
	        selBUS.add("type.kindof["+DomainConstants.TYPE_TASK_MANAGEMENT+"]");

	        Map mData = dObject.getInfo(context, selBUS);

	        String sCurrent         = (String) mData.get(DomainConstants.SELECT_CURRENT);
	        String sKind            = (String) mData.get("type.kindof");

			String sObjType         = (String) mData.get(DomainConstants.SELECT_TYPE);
	        String sHref            = "";
	        String sSuite           = "Components";
	        String sLabel           = "emxComponents.Command.Documents";
	        String sMenu            = "";

	        if(sCommand.startsWith("type_")){
	        	sMenu = sCommand;
	        	sCommand = "";
	        	sLabel = "emxTeamCentral.DocumentSummary.Document";
	        }

	        if(sKind.equals("DOCUMENTS")){
	        	sCommand  = "APPDocumentFiles";
	        	sRelationship = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_ActiveVersion);
	        }
	        /*
	        else if(sKindTask.equalsIgnoreCase("TRUE")) {
	        	sCommand  = "PMCDeliverableCommandPowerView";
	        	sRelationship = DomainConstants.RELATIONSHIP_TASK_DELIVERABLE;
	        }*/

	        // Get command or menu details
	        if(!sCommand.equals("")) {
	            Command command = new Command(context, sCommand);
	            if(null != command) {

	                sHref                   = command.getHref();
	                sLabel                  = command.getLabel();
	                SelectSetting setting   = command.getSettings();
	                String sSuiteCommand    = setting.getValue("Registered Suite");
	                String sSuiteDirTemp    = "";

	                if(!sSuiteCommand.equals(""))  {
	                    sSuite          = sSuiteCommand;
	                    sSuiteDirTemp   = FrameworkProperties.getProperty(context, "eServiceSuite" + sSuiteCommand + ".Directory");
	                }

	                if(sHref.contains("${COMMON_DIR}/"))    { sHref = sHref.replace("${COMMON_DIR}/", ""); }
	                if(sHref.contains("${ROOT_DIR}/"))      { sHref = sHref.replace("${ROOT_DIR}/", "../"); }
	                if(sHref.contains("${SUITE_DIR}/"))     { sHref = sHref.replace("${SUITE_DIR}/", "../" + sSuiteDirTemp + "/"); }
	                if(sHref.contains("${COMPONENT_DIR}/")) { sHref = sHref.replace("${COMPONENT_DIR}/", "../components/"); }

	                sLabel = EnoviaResourceBundle.getProperty(context, sSuite, sLabel, sLanguage);

	            }
	        } else if(!sMenu.equals("")) {
	            MenuObject menu = new MenuObject(context, sMenu);
	            if(null != menu) {

	                sHref                   = menu.getHref();
	                SelectSetting setting   = menu.getSettings();
	                String sSuiteCommand    = setting.getValue("Registered Suite");
	                String sSuiteDirTemp    = "";

	                if(!sSuiteCommand.equals(""))  {
	                    sSuite          = sSuiteCommand;
	                    sSuiteDirTemp   = FrameworkProperties.getProperty(context, "eServiceSuite" + sSuiteCommand + ".Directory");
	                }

	                if(sHref.contains("${COMMON_DIR}/"))    { sHref = sHref.replace("${COMMON_DIR}/", ""); }
	                if(sHref.contains("${ROOT_DIR}/"))      { sHref = sHref.replace("${ROOT_DIR}/", "../"); }
	                if(sHref.contains("${SUITE_DIR}/"))     { sHref = sHref.replace("${SUITE_DIR}/", "../" + sSuiteDirTemp + "/"); }
	                if(sHref.contains("${COMPONENT_DIR}/")) { sHref = sHref.replace("${COMPONENT_DIR}/", "../components/"); }

	                sLabel = EnoviaResourceBundle.getProperty(context, sSuite, sLabel, sLanguage);

	            }
	            sCommand = sMenu;
	        }

	        selDocuments.add(DomainConstants.SELECT_ID);
	        selDocuments.add(DomainConstants.SELECT_TYPE);
	        selDocuments.add(DomainConstants.SELECT_MODIFIED);
	        selDocuments.add("attribute[" + DomainConstants.ATTRIBUTE_TITLE + "]");

	        String selType     = PropertyUtil.getSchemaProperty(context,DomainObject.SYMBOLIC_type_DOCUMENTS);
	        MapList mlDocuments = dObject.getRelatedObjects(context, sRelationship, selType, selDocuments, null, false, true, (short)0, "", "", 2);
			String strCount = MqlUtil.mqlCommand(context, "eval expr $1 on expand bus $2 type $3 rel $4 dump","Count TRUE",sOID,selType,sRelationship);
	        int iDocsCount = Integer.parseInt(strCount);
	       

	        String sDisplay = "block";

	        if(sCurrent.equals("Complete")) { sDisplay = "none"; }
	        else if(sCurrent.equals("Archive")) { sDisplay = "none"; }
	        else if(sCurrent.equals("Inactive")) { sDisplay = "none"; }
//	        if(UINavigatorUtil.isMobile(context)){
//	        	sDisplay = "none";
//	        }
	        sbResult.append("<div id='headerDropZone' style='float:left;padding-right:5px;display:").append(sDisplay).append(";'>");
	        sbResult.append("<form id='formDrag' action='../common/emxFileUpload.jsp?relationship=").append(XSSUtil.encodeForURL(context, sRelationship)).append("&documentCommand=").append(XSSUtil.encodeForURL(context, sCommand)).append("&objectId=").append(XSSUtil.encodeForURL(context, sOID)).append("'  method='post'  enctype='multipart/form-data'>\n");
	        sbResult.append("   <div id='divDrag' class='dropArea' ");
	        sbResult.append("      ondrop=\"FileSelectHandlerHeader(event, '" + sOID + "', 'formDrag', 'divDrag', 'divExtendedHeaderDocuments', '").append(sRelationship).append("')\" ");
	        sbResult.append("  ondragover=\"FileDragHover(event, 'divDrag')\" ");
	        sbResult.append(" ondragleave=\"FileDragHover(event, 'divDrag')\">\n");
	        sbResult.append(EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.DropFilesHere", sLanguage));
	        sbResult.append("   </div>");
	        sbResult.append("</form></div>");

	        if(mlDocuments.size() > 0) {

	            int iNumberDocuments = mlDocuments.size() > 2 ? 2 : mlDocuments.size();
	            mlDocuments.sort("modified", "descending", "date");
	          //  if(!UINavigatorUtil.isMobile(context)){
	            for(int i = 0; i < iNumberDocuments; i++) {

	                Map mDocument 		= (Map)mlDocuments.get(i);
	                String sDocumentId 	= (String)mDocument.get(DomainConstants.SELECT_ID);
	                String sDocumentType 	= (String)mDocument.get(DomainConstants.SELECT_TYPE);
	                String sDocumentFile 	= (String)mDocument.get("attribute[" + DomainConstants.ATTRIBUTE_TITLE + "]");
	                String sDocumentDate 	= (String)mDocument.get(DomainConstants.SELECT_MODIFIED);
					sDocumentDate = eMatrixDateFormat.getFormattedDisplayDateTime(context, sDocumentDate, true, Integer.parseInt(PersonUtil.getPreferenceDateFormatString(context)), Double.parseDouble(timeZone), context.getLocale());
	                StringBuilder documentTitleAndDate  = new StringBuilder();
	                documentTitleAndDate.append(sDocumentFile).append("(").append(sDocumentDate).append(")");

	                sbResult.append("<span class=\"extendedHeader\" onmouseover='this.style.color=\"").append("#04A3CF").append("\";' onmouseout='this.style.color=\"#000\";' ");
	                sbResult.append(" onClick=\"javascript:callCheckout('").append(XSSUtil.encodeForJavaScript(context, sDocumentId)).append("',");
	                sbResult.append("'download', '', '', 'null', 'null', 'structureBrowser', 'APPDocumentSummary', 'null')\">");
	                sbResult.append("<img src='../common/images/").append(UINavigatorUtil.getTypeIconProperty(context, sDocumentType)).append("' />");
	                sbResult.append("<span title='"+ XSSUtil.encodeForHTMLAttribute(context, documentTitleAndDate.toString()) +"' class=\"extendedHeader document-name\">"+XSSUtil.encodeForHTML(context, documentTitleAndDate.toString())+"</span>");
	                sbResult.append("</span>");
	            }
	          //  }
	            if(iDocsCount > 2){
	            	sbResult.append("<span class=\"extendedHeader\">");
		            sbResult.append("<span title='"+XSSUtil.encodeForHTMLAttribute(context, sLabel)+"' class=\"extendedHeader" +className+"\" style='cursor:pointer;color:").append("#04A3CF").append("' ");
		            sbResult.append("onclick=\"javascript:showRefDocs('").append(sCommand).append("','").append(sHref);
		            sbResult.append("&objectId=").append(XSSUtil.encodeForJavaScript(context, sOID)).append("&parentOID=").append(XSSUtil.encodeForJavaScript(context, sOID)).append("');");

		            sbResult.append("\" >");
		            sbResult.append(iDocsCount).append(" ").append(XSSUtil.encodeForHTML(context, sLabel));
		            sbResult.append("</span>");
		            sbResult.append("</span>");
			     if(sProjectVault.equals(sObjType)){
			     	     sbResult.append("<input type=\"hidden\" id=\"ext-doc-count\" name=\"ext-doc-count\" value=\""+ iDocsCount + "\"></input>");
			     }
	            }else{
					if(sProjectVault.equals(sObjType)){
	            	     sbResult.append("<input type=\"hidden\" id=\"ext-doc-count\" name=\"ext-doc-count\" value=\""+ iNumberDocuments + "\"></input>");
					}
	            }
	        }

	        return sbResult.toString();

	    }
	    private boolean isDuplicateFile(Context context,String objectID,List checkinFiles,StringBuffer error) throws Exception{
	    	DomainObject domainObject = DomainObject.newInstance(context, objectID);
	    	if(!(domainObject instanceof CommonDocument)){
	    		return false;
	    	}
	    	StringList files = getFiles(context, domainObject);
	    	return isFilePresent(context, files, checkinFiles,error);
	    }
	    private StringList getFiles(Context context,DomainObject domainObject) throws Exception{
	    	CommonDocument object = (CommonDocument)domainObject;
	    	StringList selectList = new StringList();
	    	selectList.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
	        selectList.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION_ID);
	        Map selectMap = object.getInfo(context, selectList);
	        StringList selectFileList = new StringList();
	        selectFileList.add(CommonDocument.SELECT_TITLE);
	        selectFileList.add(CommonDocument.SELECT_LOCKER);
	    	return (StringList) selectMap.get(CommonDocument.SELECT_ACTIVE_FILE_VERSION_ID);
	    }
	    private boolean isFilePresent(Context context,StringList files,List checkinFiles,StringBuffer error) throws Exception{
	    	boolean isFileFound = false;
	    	if(files!=null && !files.isEmpty()){
		    	Iterator fileItr = files.iterator();
		    	while(fileItr.hasNext()){
		    		Iterator revItr = getRevisionFiles(context,(String)fileItr.next()).iterator();
		    		while(revItr.hasNext()){
		    			Map fileMap = (Map)revItr.next();
		    			if(fileFound(context,fileMap,checkinFiles,error)){
		    				isFileFound=true;
		    			}
		    		}
		    	}
	    	}
	    	return isFileFound;
	    }
	    private MapList getRevisionFiles(Context context,String fileId) throws Exception{
	    	DomainObject versionObj = DomainObject.newInstance(context, fileId);
	    	StringList selectFileList = new StringList();
	        selectFileList.add(CommonDocument.SELECT_TITLE);
	        selectFileList.add(CommonDocument.SELECT_LOCKER);
	        return versionObj.getRevisionsInfo(context,selectFileList,new StringList());
	    	
	    }
	    private boolean fileFound(Context context,Map fileMap,List checkinFiles,StringBuffer error){
	    	String fileTitle = (String)fileMap.get(CommonDocument.SELECT_TITLE);
	    	Iterator chekingFileItr = checkinFiles.iterator();
	    	boolean isFileFound = false;
	    	while(chekingFileItr.hasNext()){
	    		FileItem file = (FileItem) chekingFileItr.next();
	            String sFilename 		= file.getName();
	            String[] sFilenamePath=sFilename.split("\\\\");
	            sFilename = sFilenamePath[sFilenamePath.length-1].trim();
	            if(sFilename.equalsIgnoreCase(fileTitle)){
	            	error.append(" \n" + sFilename);
	            	isFileFound = true;
	            	break;
	            }
	    	}
	    	return isFileFound;
	    	
	    }
}
