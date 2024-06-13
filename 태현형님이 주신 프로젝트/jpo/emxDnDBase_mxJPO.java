/*
 * Copyright (c) 1992-2020 Dassault Systemes.
 * All Rights Reserved.
 */
import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.common.CommonImageConverterRemoteExec;
import com.matrixone.apps.common.SubscriptionManager;
import com.matrixone.apps.common.Workspace;
import com.matrixone.apps.common.WorkspaceVault;
import com.matrixone.apps.common.util.ImageManagerUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MessageUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UICache;
import com.matrixone.apps.framework.ui.UIUtil;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;

import org.apache.commons.fileupload.FileItem;

import matrix.db.Access;
import matrix.db.BusinessType;
import matrix.db.BusinessTypeList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.db.Policy;
import matrix.db.RelationshipType;
import matrix.util.StringList;
//L48
import com.matrixone.apps.common.util.DocumentUtil;

public class emxDnDBase_mxJPO {
			public static String SELECT_FILE_NAME = "format.file.name";
			public static String SELECT_FILE_FORMAT = "format.file.format";
	public emxDnDBase_mxJPO(Context context, String[] args) throws Exception {}

	// Image Column providing check in capabilities by Drag&Drop
	public Vector columnImage(Context context, String[] args) throws Exception {

		Vector vResult      = new Vector();
		Map paramMap        = (Map) JPO.unpackArgs(args);
		Map paramList       = (Map)paramMap.get("paramList");
		MapList mlObjects   = (MapList) paramMap.get("objectList");
		String sMCSURL      = emxUtil_mxJPO.getMCSURL(context, args);
		String sLang        = (String)paramList.get("languageStr");

		String sLabel        = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.DropImagesHere", sLang);
		String sLabelNoImage = EnoviaResourceBundle.getProperty(context, "Framework", "emxFramework.String.NoImage", sLang);
		boolean useInPlaceManager = false;
		try{
			useInPlaceManager = "true".equalsIgnoreCase(EnoviaResourceBundle.getProperty(context, "emxFramework.InPlaceImageManager"));
		}catch(Exception e){
		}
		boolean excluded = false;
		StringList contentTypesList = new StringList();
		try{
			String excludedTypes = EnoviaResourceBundle.getProperty(context, "emxFramework.InPlaceImageManager.TypeExclusionList");
			contentTypesList = FrameworkUtil.split(excludedTypes, ",");
		}catch(Exception e){
		}

		if (mlObjects.size() > 0) {

			for (int i = 0; i < mlObjects.size(); i++) {

				StringBuilder sbResult  = new StringBuilder();
				Map mObject             = (Map) mlObjects.get(i);
				String sOID             = (String) mObject.get("id");
				String objectType = (String)mObject.get("type");
				String symbolicType = FrameworkUtil.getAliasForAdmin(context, "type", objectType, true);
				if(contentTypesList.indexOf(symbolicType) > -1)
				{
					excluded = true;
				}
				else{
					excluded = false;
				}
				DomainObject dObject    = new DomainObject(sOID);
				String sURLImage        = emxUtil_mxJPO.getPrimaryImageURL(context, args, sOID, "mxThumbnail Image", sMCSURL, "NoImageFound");
				Access access           = dObject.getAccessMask(context);
				Boolean bAccess         = access.hasFromConnectAccess();

				String sLevel           = (String) mObject.get("id[level]");
				String sFormId          = "formDrag"        + i + sLevel;
				String sDivId           = "divDrop"         + i + sLevel;
				String sDivIdImage      = "divDropImge"     + i + sLevel;

				if(sURLImage.equals("NoImageFound")) {
					if(bAccess && !excluded) {
						sbResult.append("<form class='dropAreaInColumn' id='").append(sFormId).append("' action=\"../common/emxExtendedPageHeaderFileUploadImage.jsp?objectId=").append(sOID).append("\"  method='post'  enctype='multipart/form-data'>");
						sbResult.append("<div id='").append(sDivId).append("' class='dropArea'");
						if(useInPlaceManager){
							sbResult.append(" onClick=\"launchImageManager('" + sOID + "');\"");
						}
						sbResult.append("       ondrop=\"ImageDropColumn(event, '").append(sFormId).append("', '").append(sDivId).append("', '").append(sLevel).append("')\" ");
						sbResult.append("   ondragover=\"ImageDragHover(event, '").append(sDivId).append("')\" ");
						sbResult.append("  ondragleave=\"ImageDragHover(event, '").append(sDivId).append("')\">");
						sbResult.append(sLabel);
						sbResult.append("   </div>");
						sbResult.append("</form>");
					} else {
						sbResult.append("<div class='dropArea' style='border:none;white-space:normal;'>");
						sbResult.append(sLabelNoImage);
						sbResult.append("</div>");
					}
				} else {
					if(bAccess && !excluded) {
						sbResult.append("<form class='dropAreaInColumn' id='").append(sFormId).append("' action=\"../common/emxExtendedPageHeaderFileUploadImage.jsp?objectId=").append(sOID).append("\"  method='post'  enctype='multipart/form-data'>");
						sbResult.append("<div id='").append(sDivId).append("' class='dropAreaWithImage' ");
						sbResult.append("        ondrop=\"ImageDropOnImageColumn(event, '").append(sFormId).append("', '").append(sDivId).append("', '").append(sDivIdImage).append("', '").append(sLevel).append("')\" ");
						sbResult.append("    ondragover=\"ImageDragHoverWithImage(event, '").append(sDivId).append("', '").append(sDivIdImage).append("')\" ");
						sbResult.append("   ondragleave=\"ImageDragHoverWithImage(event, '").append(sDivId).append("', '").append(sDivIdImage).append("')\">");
						sbResult.append("<img class='dropAreaImage' id='").append(sDivIdImage).append("' src='").append(sURLImage).append("' ");
						if(useInPlaceManager){
							sbResult.append(" onClick=\"launchImageManager('" + sOID + "');\"");
						}else{
							sbResult.append(" onClick=\"var posLeft=(screen.width/2)-(900/2);var posTop = (screen.height/2)-(650/2);");
							sbResult.append("window.open('../components/emxImageManager.jsp?isPopup=false&amp;toolbar=APPImageManagerToolBar&amp;header=emxComponents.Image.ImageManagerHeading&amp;HelpMarker=emxhelpimagesview&amp;");
							sbResult.append("objectId=").append(sOID).append("', '', 'height=650,width=850,top=' + posTop + ',left=' + posLeft + ',toolbar=no,directories=no,status=no,menubar=no;return false;')\"");
						}
						sbResult.append(" />");
						sbResult.append("   </div>");
						sbResult.append("</form>");
					} else {
						sbResult.append("<img class='dropAreaImage' id='").append(sDivIdImage).append("' src='").append(sURLImage).append("' ");
						if(!excluded){
							if(useInPlaceManager){
								sbResult.append(" onClick=\"launchImageManager('" + sOID + "');\"");
							}else{
								sbResult.append(" onClick=\"var posLeft=(screen.width/2)-(850/2);var posTop = (screen.height/2)-(650/2);");
								sbResult.append("window.open('../components/emxImageManager.jsp?isPopup=false&amp;toolbar=APPImageManagerToolBar&amp;header=emxComponents.Image.ImageManagerHeading&amp;HelpMarker=emxhelpimagesview&amp;");
								sbResult.append("objectId=").append(sOID).append("', '', 'height=650,width=850,top=' + posTop + ',left=' + posLeft + ',toolbar=no,directories=no,status=no,menubar=no;return false;')\"");
							}
						}
						sbResult.append(" />");
					}
				}
				vResult.add(sbResult.toString());
			}
		}

		return vResult;

	}
	@com.matrixone.apps.framework.ui.ProgramCallable
	public String checkInImage(Context context, String[] args) throws Exception {

		try {
			Map paramMap = (Map) JPO.unpackArgs(args);
			String sLanguage = (String) paramMap.get("language");
			String sOIDParent = (String) paramMap.get("objectId");
			List files = (List) paramMap.get("files");
			String sFolder = (String) paramMap.get("folder");
			String sMCSURL = (String) paramMap.get("MCSURL");
			String imageRelType = (String) paramMap.get("relationship");

			DomainObject imageHolder = new DomainObject();
			DomainObject doParent = new DomainObject(sOIDParent);
			String sIsProductLine = doParent.getInfo(context, "type.kindof["+DomainConstants.TYPE_PRODUCTLINE+"]");
			String sIsModel = doParent.getInfo(context, "type.kindof["+PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_type_Model)+"]");
			String sIsProducts = doParent.getInfo(context, "type.kindof["+PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_type_Products)+"]");
			String sOIDImageHolder = doParent.getInfo(context, "to["+ PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_ImageHolder) +"].from.id");

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

				//if(sIsProductLine.equalsIgnoreCase("TRUE") || sIsModel.equalsIgnoreCase("TRUE")|| sIsProducts.equalsIgnoreCase("TRUE")) {
				if(DomainConstants.RELATIONSHIP_IMAGES.equals(imageRelType)){
					String sName = DomainObject.getAutoGeneratedName(context, "type_Image", "");
					imageHolder.createObject(context, DomainConstants.TYPE_IMAGE, sName, "-", DomainConstants.POLICY_IMAGE, context.getVault().getName());
					imageHolder.addRelatedObject(context, new RelationshipType(DomainConstants.RELATIONSHIP_IMAGES), true, sOIDParent);
					sOIDImageHolder = imageHolder.getInfo(context, DomainConstants.SELECT_ID);
					String sHasPrimaryImage = doParent.getInfo(context, "from["+ DomainConstants.RELATIONSHIP_PRIMARY_IMAGE + "]");

					if(sHasPrimaryImage.equalsIgnoreCase("FALSE")) {
						imageHolder.addRelatedObject(context, new RelationshipType(DomainConstants.RELATIONSHIP_PRIMARY_IMAGE), true, sOIDParent);
					}
				} else {
					String typeImageHolder = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_type_ImageHolder);
					String relImageHolder = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_relationship_ImageHolder);
					String attrPrimayImage = PropertyUtil.getSchemaProperty(context, DomainSymbolicConstants.SYMBOLIC_attribute_PrimaryImage);

					if(sOIDImageHolder == null) {
						imageHolder = DomainObject.newInstance(context, typeImageHolder);
						imageHolder.createAndConnect(context, typeImageHolder, relImageHolder, doParent, false);
						imageHolder.setAttributeValue(context, attrPrimayImage, ImageManagerUtil.getPrimaryImageFileNameForImageManager(context, sFilename));
						sOIDImageHolder = imageHolder.getInfo(context, DomainConstants.SELECT_ID);
					} else {
						imageHolder = new DomainObject(sOIDImageHolder);
					}
				}

				imageHolder.checkinFile(context, true, true, "", "generic", sFilename, sFolder);

				String gotMcsURL = MqlUtil.mqlCommand(context, "get env global MCSURL");

				List lstFilesToTransform = new ArrayList();
				Hashtable htCCIHInfo = new Hashtable();

				htCCIHInfo.put("Oid"    , sOIDImageHolder   );
				htCCIHInfo.put("File"   , sFilename         );
				htCCIHInfo.put("Format" , "generic"         );

				lstFilesToTransform.add(htCCIHInfo);
				new CommonImageConverterRemoteExec().convertImageAndCheckinSameObject(context, gotMcsURL, lstFilesToTransform, null, ".jpg");
				outfile.delete();
			}

			ContextUtil.commitTransaction(context);
			return emxExtendedHeader_mxJPO.genHeaderImage(context, args, sOIDParent, sLanguage, sMCSURL,imageRelType, false , "true");
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
			String dropFilesHere = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",context.getLocale(),"emxFramework.String.DropFilesHere");
			String checkInError=EnoviaResourceBundle.getProperty(context,"emxComponentsStringResource",context.getLocale(),"emxComponents.CommonDocument.DocumentsAreNotLockedByUser");
			errorMessage.append(errorMsg);
			boolean fileCheckedOut=isFileCheckedOut(context, sOID, files);
			if(isDuplicateFile(context, sOID, files, errorMessage)){
				if(!fileCheckedOut)
					return "ERROR"+errorMessage+"@"+dropFilesHere;
			}
			ContextUtil.startTransaction(context, true);
			StringList lockedFiles = new StringList();
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
					if(fileCheckedOut){
						
						CommonDocument  cDoc = new CommonDocument(sOID);
						StringList selects = new StringList(12);
						selects.add(SELECT_FILE_NAME);
						selects.add(SELECT_FILE_FORMAT);
						StringList selectsList = new StringList();
						selectsList.add("attribute[Title]");
						selectsList.add(DomainConstants.SELECT_LOCKER);
						MapList mlist = cDoc.getRelatedObjects(context,                       // context.
								"Active Version",  // rel filter.
								"Document",               // type filter.
								selectsList,                   // business selectables.
								null,                   // relationship selectables.
								false,                        // expand to direction.
								true,                         // expand from direction.
								(short) 1,                    // level
								"",                  // object where clause
								"",
								0);		
					Iterator itr = mlist.iterator();	
					while(itr.hasNext()){
						Map m = (Map)itr.next();
						String title = (String) m.get("attribute[Title]");
						String locker=(String)m.get("locker");
						//If user is try to upload file,which is locked by other user
						if(sFilename.equals(title)&&!context.getUser().equals(locker)){
							lockedFiles.add(title);
						} 
					}
					if(!lockedFiles.contains(sFilename)){
						cDoc.lock(context);
						cDoc.reviseVersion(context, null,sFilename, null); 
						//cDoc.checkinFile(context, true, true, "generic", null, sFilename, sFolder); // commented by L48
						System.out.println("L48Trace DnD 1 ");
						String storeFromBL = null;
						storeFromBL = DocumentUtil.getStoreFromBL(context, "Document");
						System.out.println("L48Trace DnD 2 :: Store : " + storeFromBL);
						cDoc.checkinFile(context, true, true, "", "generic", storeFromBL, sFilename, sFolder);
					}

					}else{
						CommonDocument cDoc = new CommonDocument(sOID);
						//cDoc.checkinFile(context, true, true, "", "generic", sFilename, sFolder);
						System.out.println("L48Trace DnD 3 sOID : " + sOID);
						String storeFromBL = null;
						storeFromBL = DocumentUtil.getStoreFromBL(context, "Document");
						System.out.println("L48Trace DnD 4 :: Store : " + storeFromBL);
						cDoc.checkinFile(context, true, true, "", "generic", storeFromBL, sFilename, sFolder);
						cDoc.createVersion(context, sFilename, sFilename, null);
					}

				} else {
					String sObjGeneratorName = UICache.getObjectGenerator(context, "type_Document", "");
					String sName = DomainObject.getAutoGeneratedName(context, sObjGeneratorName, "");
					String docPolicy = PropertyUtil.getSchemaProperty(EnoviaResourceBundle.getProperty(context, "emxFrameowrk.FileUpload.Default.Policy"));
					if (UIUtil.isNotNullAndNotEmpty(docPolicy)) {
						CommonDocument cDoc = new CommonDocument();
						Policy policy = new Policy(docPolicy);
						String revision = policy.getFirstInSequence(context);
						PropertyUtil.setRPEValue(context, "MX_ALLOW_POV_STAMPING", "true", false);
						cDoc.createObject(context, DomainObject.TYPE_DOCUMENT, sName, revision, docPolicy, context.getVault().getName());
						cDoc.addRelatedObject(context, new RelationshipType(sRelType), true, sOID);
						cDoc.setAttributeValue(context, "Title", sFilename);
						//cDoc.checkinFile(context, true, true, "", "generic", sFilename, sFolder);
						System.out.println("L48Trace DnD 5 cDoc : " + cDoc);
						String storeFromBL = null;
						storeFromBL = DocumentUtil.getStoreFromBL(context, "Document");
						System.out.println("L48Trace DnD 6 :: Store : " + storeFromBL);
						cDoc.checkinFile(context, true, true, "", "generic", storeFromBL, sFilename, sFolder);

						cDoc.createVersion(context, sFilename, sFilename, null);
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
				//When User try to drag & drop file,locked by another user
			checkInError=checkInError+"\n"+lockedFiles;
			if(lockedFiles.size()!=0){
				return "ERROR"+checkInError+"*"+dropFilesHere;
			}
			return emxExtendedHeader_mxJPO.genHeaderDocuments(context, sOID,sRelType, documentCommand, sLanguage, false,timeZone);

		}catch (Exception ex) {
			ContextUtil.abortTransaction(context);
			ex.printStackTrace();
			return "ERROR"+ex.getMessage();
		} finally {
			PropertyUtil.setRPEValue(context, "MX_ALLOW_POV_STAMPING", "false", false);
		}
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
		selectFileList.add(CommonDocument.SELECT_LOCKED);

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
					if((error.indexOf(sFilename)<0))
							error.append(" \n" + sFilename);
				isFileFound = true;
				break;
			}
		}
		return isFileFound;

	}

	private boolean	 isFileCheckedOut(Context context,String objectID,List checkinFiles) throws Exception{
		DomainObject domainObject = DomainObject.newInstance(context, objectID);
		if(!(domainObject instanceof CommonDocument)){
			return false;
		}
		StringList files = getFiles(context, domainObject);
		return isFilePresentandCheckedOut(context, files, checkinFiles);
	}

	private boolean isFilePresentandCheckedOut(Context context,StringList files,List checkinFiles) throws Exception{
		boolean fileCheckedOut = false;
		if(files!=null && !files.isEmpty()){
			Iterator fileItr = files.iterator();
			while(fileItr.hasNext()){
				Iterator revItr = getRevisionFiles(context,(String)fileItr.next()).iterator();
				while(revItr.hasNext()){
					Map fileMap = (Map)revItr.next();
					fileCheckedOut=fileFoundandCheckedout(context,fileMap,checkinFiles);
					if(fileCheckedOut)
						break;
				}
				if(fileCheckedOut)
						break;
			}
		}
		return fileCheckedOut;
	}

	private boolean fileFoundandCheckedout(Context context,Map fileMap,List checkinFiles){
		String fileTitle = (String)fileMap.get(CommonDocument.SELECT_TITLE);
		String fileLocked = (String)fileMap.get(CommonDocument.SELECT_LOCKED);
		boolean fileCheckedOut = false;

		Iterator chekingFileItr = checkinFiles.iterator();
		while(chekingFileItr.hasNext()){
			FileItem file = (FileItem) chekingFileItr.next();
			String sFilename 		= file.getName();
			String[] sFilenamePath=sFilename.split("\\\\");
			sFilename = sFilenamePath[sFilenamePath.length-1].trim();
			if(sFilename.equalsIgnoreCase(fileTitle)){
				if(fileLocked.equalsIgnoreCase("true"))
					fileCheckedOut=true;
				break;
			}
		}
		return fileCheckedOut;

	}
}
