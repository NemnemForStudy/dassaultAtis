/*
 *  emxCommonFileUI.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;
import java.net.URLDecoder;

import com.dec.util.DecConstants;
import com.dec.util.DecDateUtil;
import com.dec.util.DecStringUtil;

import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.DomainSymbolicConstants;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FormatUtil;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.framework.ui.UIComponent;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
/**
 * @version AEF Rossini - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxCommonFileUI_mxJPO extends emxCommonFileUIBase_mxJPO
{
	 private static final String OBJECT_MAP_IS_LATEST_REVISION = "isLatestRevision";
	    private static final String OBJECT_MAP_ID = "id";
	    private static final String OBJECT_MAP_FILE_ID = "fileId";
	    private static final String EMX_COMPONENTS_STRING_RESOURCE = "emxComponentsStringResource";
	    private static final String PARAM_LIST_LANGUAGE_STR = "languageStr";
	    private static final String PARAM_LIST_REPORT_FORMAT = "reportFormat";
	    private static final String PARAM_LIST_FROM_ID = "from.id";
	    private static final String PARAM_LIST_TRACK_USAGE_PART_ID = "trackUsagePartId";
	    private static final String PARAM_LIST_REL_ID = "relId";
	    private static final String PROGRAM_MAP_PARAM_LIST = "paramList";
	    private static final String PROGRAM_MAP_OBJECT_LIST = "objectList";
    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public emxCommonFileUI_mxJPO (Context context, String[] args)
        throws Exception
    {
      super(context, args);
    }
    
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Object getDeliverableFile(Context context, String[] args, MapList ml ) throws Exception
    {	
	          try
	          {	  MapList fileMapList = new MapList();	          
	              HashMap programMap         = (HashMap) JPO.unpackArgs(args);
	              //Added to make a single database call to
	              StringList masterObjectSelectList = new StringList(12);
	              masterObjectSelectList.add(CommonDocument.SELECT_ID);
	              masterObjectSelectList.add(CommonDocument.SELECT_TYPE);
	              masterObjectSelectList.add(CommonDocument.SELECT_NAME);
	              masterObjectSelectList.add(CommonDocument.SELECT_REVISION);
	              masterObjectSelectList.add(CommonDocument.SELECT_OWNER);
	              masterObjectSelectList.add(CommonDocument.SELECT_FILE_NAME);
	              masterObjectSelectList.add(CommonDocument.SELECT_FILE_FORMAT);
	              masterObjectSelectList.add(CommonDocument.SELECT_FILE_MODIFIED);
	              masterObjectSelectList.add(CommonDocument.SELECT_FILE_SIZE);
	              masterObjectSelectList.add(CommonDocument.SELECT_HAS_CHECKOUT_ACCESS);
	              masterObjectSelectList.add(CommonDocument.SELECT_HAS_CHECKIN_ACCESS);
	              masterObjectSelectList.add(CommonDocument.SELECT_HAS_LOCK_ACCESS);
	              masterObjectSelectList.add(CommonDocument.SELECT_HAS_UNLOCK_ACCESS);
	              masterObjectSelectList.add(CommonDocument.SELECT_SUSPEND_VERSIONING);
	              masterObjectSelectList.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
	              masterObjectSelectList.add(CommonDocument.SELECT_LATEST_REVISION);
	              masterObjectSelectList.add(CommonDocument.SELECT_CURRENT);
	              StringList versionSelectList = new StringList(9);
	              versionSelectList.add(CommonDocument.SELECT_ID);
	              versionSelectList.add(CommonDocument.SELECT_REVISION);
	              versionSelectList.add(CommonDocument.SELECT_DESCRIPTION);
	              versionSelectList.add(CommonDocument.SELECT_LOCKED);
	              versionSelectList.add(CommonDocument.SELECT_LOCKER);
	              versionSelectList.add(CommonDocument.SELECT_TITLE);
	              versionSelectList.add(CommonDocument.SELECT_FILE_NAME);
	              versionSelectList.add(CommonDocument.SELECT_FILE_FORMAT);
	              versionSelectList.add(CommonDocument.SELECT_FILE_MODIFIED);
	              versionSelectList.add(CommonDocument.SELECT_FILE_SIZE);
	              versionSelectList.add(CommonDocument.SELECT_OWNER);
	              versionSelectList.add(DomainConstants.SELECT_ORIGINATED);
	              versionSelectList.add(DomainConstants.SELECT_TYPE);
	              versionSelectList.add(CommonDocument.SELECT_SUSPEND_VERSIONING);
	              versionSelectList.add(CommonDocument.SELECT_IS_VERSION_OBJECT);
		          	//	Object busMap = ml.get(i);
		          for(int i=0; i<ml.size(); i++) {
		          Map deliverableMap = (Map)ml.get(i);
	              String  masterObjectId    =(String) deliverableMap.get("id");
	              DomainObject masterObject  = DomainObject.newInstance(context, masterObjectId);
	
	 
	
	              // get the Master Object data
	              Map masterObjectMap = masterObject.getInfo(context,masterObjectSelectList);
	              // Version Object seletcs

	        
	
	              // get the file (Version Object) data
	              MapList versionList = masterObject.getRelatedObjects(context,
	                                                                    CommonDocument.RELATIONSHIP_ACTIVE_VERSION,
	                                                                    CommonDocument.TYPE_DOCUMENTS,
	                                                                    versionSelectList,
	                                                                    null,
	                                                                    false,
	                                                                    true,
	                                                                    (short)1,
	                                                                    null,
	                                                                    null,
	                                                                    null,
	                                                                    null,
	                                                                    null);

	              // get all the files in the Master Object
	              StringList fileList = (StringList) masterObjectMap.get(CommonDocument.SELECT_FILE_NAME);
	              StringList fileFormatList = (StringList) masterObjectMap.get(CommonDocument.SELECT_FILE_FORMAT);
	              StringList fileSizeList   = (StringList) masterObjectMap.get(CommonDocument.SELECT_FILE_SIZE);
	              StringList fileModifiedList   = (StringList) masterObjectMap.get(CommonDocument.SELECT_FILE_MODIFIED);
	
	              StringList tempfileFormatList = new StringList();
	              StringList tempfileList  = new StringList();
	              for(int ii =0; ii< fileFormatList.size(); ii++){
	                  String format = (String)fileFormatList.get(ii);
	                  if(!DomainObject.FORMAT_MX_MEDIUM_IMAGE.equalsIgnoreCase(format)){
	                      tempfileFormatList.add(format);
	                      tempfileList.add(fileList.get(ii));
	                  }
	              }
	              fileFormatList =tempfileFormatList;
	              fileList =tempfileList;
	
	              // get the Master Object meta data
	              String masterId    = (String) masterObjectMap.get(CommonDocument.SELECT_ID);
	              String canCheckout = (String) masterObjectMap.get(CommonDocument.SELECT_HAS_CHECKOUT_ACCESS);
	              String canCheckin  = (String) masterObjectMap.get(CommonDocument.SELECT_HAS_CHECKIN_ACCESS);
	              String canLock     = (String) masterObjectMap.get(CommonDocument.SELECT_HAS_LOCK_ACCESS);
	              String canUnLock     = (String) masterObjectMap.get(CommonDocument.SELECT_HAS_UNLOCK_ACCESS);
	              boolean isLatestRevision=((String)masterObjectMap.get(CommonDocument.SELECT_REVISION)).equalsIgnoreCase((String)masterObjectMap.get(CommonDocument.SELECT_LATEST_REVISION));
	              String suspendVersioning     = (String) masterObjectMap.get(CommonDocument.SELECT_SUSPEND_VERSIONING);
	              boolean moveFilesToVersion = (Boolean.valueOf((String) masterObjectMap.get(CommonDocument.SELECT_MOVE_FILES_TO_VERSION))).booleanValue();
	
	              // to store the object ID of the object where file resides
	              // this can be either master object Id or version object Id depending on the "Moves Files To Version" attribute value
	              String fileId    = (String) masterObjectMap.get(CommonDocument.SELECT_ID);
	
	              // loop thru each file to build MapList, each Map corresponds to one file
	             // MapList fileMapList = new MapList();
	              String fileFormat = null;
	              String fileSize   = null;
	              String fileModified   = null;
	              Iterator versionItr  = versionList.iterator();
	              while(versionItr.hasNext())
	              {
	                  Map fileVersionMap     = (Map)versionItr.next();
	                  String versionFileName = (String)fileVersionMap.get(CommonDocument.SELECT_TITLE);
	                  //Added information for MSF
	                  String locker = (String)fileVersionMap.get(CommonDocument.SELECT_LOCKER);
	                  String versionFileRevision = (String)fileVersionMap.get(CommonDocument.SELECT_REVISION);
	                  fileFormat = CommonDocument.FORMAT_GENERIC;
	                  fileSize   = "";
	                  fileModified = "";
	                  DomainObject fileObject = DomainObject.newInstance(context, fileId);
	                  boolean fileObjectIsKindOfCAD=false;
	                  String SYMBOLIC_type_MCADDrawing="type_MCADDrawing";
	                  String mCADDrawing = PropertyUtil.getSchemaProperty(context,SYMBOLIC_type_MCADDrawing);
	                  String mCADModel = PropertyUtil.getSchemaProperty(context,DomainSymbolicConstants.SYMBOLIC_type_MCADModel);
	                   if(fileObject.isKindOf(context, mCADModel)||fileObject.isKindOf(context, mCADDrawing)) {
	                       fileObjectIsKindOfCAD=true;
	                  }
	                   if(fileObjectIsKindOfCAD) {
	                       moveFilesToVersion=false;
	                   }
	                  if( moveFilesToVersion )
	                  {
	                      fileId = (String)fileVersionMap.get(CommonDocument.SELECT_ID);
	                      try
	                      {
	                          String versionFiles = (String)fileVersionMap.get(CommonDocument.SELECT_FILE_NAME);
	                          fileFormat = (String) fileVersionMap.get(CommonDocument.SELECT_FILE_FORMAT);
	                          fileSize = (String) fileVersionMap.get(CommonDocument.SELECT_FILE_SIZE);
	                          fileModified = (String) fileVersionMap.get(CommonDocument.SELECT_FILE_MODIFIED);
	                      } catch (ClassCastException cex) {
	                          StringList versionFilesList = (StringList)fileVersionMap.get(CommonDocument.SELECT_FILE_NAME);
	                          StringList versionFileSize = (StringList)fileVersionMap.get(CommonDocument.SELECT_FILE_SIZE);
	                          StringList versionFileFormat = (StringList)fileVersionMap.get(CommonDocument.SELECT_FILE_FORMAT);
	                          StringList versionFileModified = (StringList)fileVersionMap.get(CommonDocument.SELECT_FILE_MODIFIED);
	
	                          // get the file corresponding to this Version by filtering the above fileList
	                          int index = versionFilesList.indexOf(versionFileName.trim());
	
	                          // get the File Format
	                          if (index != -1 && versionFileFormat != null && versionFileFormat.size() >= index )
	                          {
	                              fileFormat = (String)versionFileFormat.get(index);
	                          }
	
	                          // get the File Size
	                          if (index != -1 && versionFileSize != null && versionFileSize.size() >= index )
	                          {
	                              fileSize = (String)versionFileSize.get(index);
	                          }
	
	                          // get the File Modified date
	                          if (index != -1 && versionFileModified != null && versionFileModified.size() >= index )
	                          {
	                              fileModified = (String)versionFileModified.get(index);
	                          }
	                      }
	                  } else {
	                      // get the file corresponding to this Version by filtering the above fileList
	                      int index = fileList.indexOf(versionFileName);
	
	                      // get the File Format
	                      if (index != -1 && fileFormatList != null && fileFormatList.size() >= index )
	                      {
	                          fileFormat = (String)fileFormatList.get(index);
	                      }
	
	                      // get the File Size
	                      if (index != -1 && fileSizeList != null && fileSizeList.size() >= index )
	                      {
	                          fileSize = (String)fileSizeList.get(index);
	                      }
	
	                      // get the File Modified date
	                      if (index != -1 && fileModifiedList != null && fileModifiedList.size() >= index )
	                      {
	                          fileModified = (String)fileModifiedList.get(index);
	                      }
	                  }
	                  String documentOwner = (String) masterObjectMap.get(CommonDocument.SELECT_OWNER);
	                  fileVersionMap.put("masterId", masterId);
	                  fileVersionMap.put(OBJECT_MAP_FILE_ID, fileId);
	                  fileVersionMap.put(CommonDocument.SELECT_FILE_FORMAT, fileFormat);
	                  fileVersionMap.put(CommonDocument.SELECT_FILE_MODIFIED, fileModified);
	          fileVersionMap.put(CommonDocument.SELECT_FILE_NAME, versionFileName);
	          fileVersionMap.put(CommonDocument.SELECT_REVISION, versionFileRevision);
	                  fileVersionMap.put(CommonDocument.SELECT_FILE_SIZE, fileSize);
	                  fileVersionMap.put(CommonDocument.SELECT_HAS_CHECKOUT_ACCESS, canCheckout);
	                  fileVersionMap.put(CommonDocument.SELECT_HAS_CHECKIN_ACCESS, canCheckin);
	                  fileVersionMap.put(CommonDocument.SELECT_HAS_LOCK_ACCESS, canLock);
	                  fileVersionMap.put(CommonDocument.SELECT_HAS_UNLOCK_ACCESS, canUnLock);
	                  fileVersionMap.put(CommonDocument.SELECT_SUSPEND_VERSIONING, suspendVersioning);
	                  fileVersionMap.put(OBJECT_MAP_IS_LATEST_REVISION, isLatestRevision);
	                  fileVersionMap.put("DocumentOwner", documentOwner);         
	                  //Added information for MSF
	                  fileVersionMap.put(CommonDocument.SELECT_LOCKER, locker);
	                  fileMapList.add(fileVersionMap);
	              }
	            }
	              return fileMapList;
	          }
	          catch (Exception ex)
	          {
	              ex.printStackTrace();
	              throw ex;
	          }
  	  
    }
    
    
    public static Vector getFileActions(Context context, String[] args)
  	        throws Exception
  	    {
  	        Vector fileActionsVector = new Vector();
  	        try {
  	            HashMap programMap = (HashMap) JPO.unpackArgs(args);
  	            MapList objectList = (MapList) programMap.get(PROGRAM_MAP_OBJECT_LIST);
  	            if (objectList.isEmpty())
  	                return fileActionsVector;
  	            Map paramList = (Map) programMap.get(PROGRAM_MAP_PARAM_LIST);

  	            String strDocumentPartRel = (String) paramList.get(PARAM_LIST_REL_ID);
  	            String strPartId = (String) paramList.get(PARAM_LIST_TRACK_USAGE_PART_ID);
  	            try {

  	                if (strPartId == null && strDocumentPartRel != null) {
  	                    String[] relIds = { strDocumentPartRel };
  	                    StringList slRelSelect = new StringList(PARAM_LIST_FROM_ID);
  	                    MapList mlPart = DomainRelationship.getInfo(context, relIds, slRelSelect);

  	                    if (mlPart.size() > 0) {
  	                        strPartId = (String) ((Map) mlPart.get(0)).get(PARAM_LIST_FROM_ID);
  	                    }
  	                }
  	            } catch (Exception e) {// do nothing...
  	            }
  	            boolean isprinterFriendly = false;
  	            if (paramList.get(PARAM_LIST_REPORT_FORMAT) != null) {
  	                isprinterFriendly = true;
  	            }

  	            StringList lockinfo = new StringList(2);
  	            lockinfo.add(CommonDocument.SELECT_LOCKED);
  	            lockinfo.add(CommonDocument.SELECT_LOCKER);
  	            lockinfo.add(CommonDocument.SELECT_ID);
  	            MapList lockInfo = getUpdatedColumnValues(context, objectList, lockinfo);
  	            Map fileLockInfoGroypById = new HashMap();
  	            for (Iterator iter = lockInfo.iterator(); iter.hasNext();) {
  	                Map element = (Map) iter.next();
  	                String[] lock = new String[2];
  	                lock[0] = (String) element.get(CommonDocument.SELECT_LOCKED);
  	                lock[1] = (String) element.get(CommonDocument.SELECT_LOCKER);
  	                fileLockInfoGroypById.put(element.get(CommonDocument.SELECT_ID), lock);
  	            }

  	            Iterator objectListItr = objectList.iterator();
  	            String languageStr = (String) paramList.get(PARAM_LIST_LANGUAGE_STR);
  	            Locale strLocale = context.getLocale();

  	            String masterId = null;
  	            String versionId = null;
  	            String revision = null;
  	            String fileActions = null;
  	            String fileName = null;
  	            String encodedFileName = null;
  	            String encodedFormat = null;
  	            String fileFormat = null;

  	            String strViewerURL = null;
  	            String downloadURL = null;
  	            String checkoutURL = null;
  	            String checkinURL = null;
  	            String unlockURL = null;
  	            String s3DViaURL = null;
  	            String sFileExt = null;

  	            String sTipDownload = EnoviaResourceBundle.getProperty(context, EMX_COMPONENTS_STRING_RESOURCE, strLocale,
  	                    "emxComponents.DocumentSummary.ToolTipDownload");
  	            String sTipCheckout = EnoviaResourceBundle.getProperty(context, EMX_COMPONENTS_STRING_RESOURCE, strLocale,
  	                    "emxComponents.DocumentSummary.ToolTipCheckout");
  	            String sTipCheckin = EnoviaResourceBundle.getProperty(context, EMX_COMPONENTS_STRING_RESOURCE, strLocale,
  	                    "emxComponents.DocumentSummary.ToolTipCheckin");
  	            String sTipUnlock = EnoviaResourceBundle.getProperty(context, EMX_COMPONENTS_STRING_RESOURCE, strLocale,
  	                    "emxComponents.DocumentSummary.ToolTipUnlock");
  	            String sTipLock = EnoviaResourceBundle.getProperty(context, EMX_COMPONENTS_STRING_RESOURCE, strLocale,
  	                    "emxComponents.DocumentSummary.ToolTipLock");
  	            String sTip3DVIAViewer = EnoviaResourceBundle.getProperty(context, EMX_COMPONENTS_STRING_RESOURCE, strLocale,
  	                    "emxComponents.DocumentSummary.ToolTip3DLiveExamine");

  	            String suspendVersioning = "False";
  	            String viewerTip = "Default";
  	            String i18nViewerTip = i18nNow.getViewerI18NString(viewerTip, context.getSession().getLanguage());
  	            // Start MSF
  	            String msfRequestData = "";
  	            // End MSF

  	            while (objectListItr.hasNext()) {
  	                // Start MSF
  	                msfRequestData = "";
  	                // End MSF
  	                fileName = "";
  	                fileActions = "";

  	                StringBuffer fileActionsStrBuff = new StringBuffer();

  	                Map objectMap = (Map) objectListItr.next();
  	                suspendVersioning = (String) objectMap.get(CommonDocument.SELECT_SUSPEND_VERSIONING);
  	                masterId = (String) objectMap.get(OBJECT_MAP_FILE_ID);

  	                versionId = (String) objectMap.get(OBJECT_MAP_ID);
  	                revision = (String) objectMap.get(CommonDocument.SELECT_REVISION);// seeta

  	                String[] fileLockInfo = (String[]) fileLockInfoGroypById.get(versionId);
  	                String fileLocked = fileLockInfo != null ? fileLockInfo[0]
  	                        : (String) objectMap.get(CommonDocument.SELECT_LOCKED);
  	                String fileLockedBy = fileLockInfo != null ? fileLockInfo[1]
  	                        : (String) objectMap.get(CommonDocument.SELECT_LOCKER);

  	                fileName = (String) objectMap.get(CommonDocument.SELECT_TITLE);
  	                encodedFileName = FrameworkUtil.findAndReplace(fileName, "+", "%252b"); // Added
  	                                                                                        // to
  	                                                                                        // support
  	                                                                                        // +
  	                                                                                        // character
  	                                                                                        // in
  	                                                                                        // file
  	                                                                                        // names
  	                encodedFileName = FrameworkUtil.findAndReplace(encodedFileName, "&", "%26");
  	                fileFormat = (String) objectMap.get(CommonDocument.SELECT_FILE_FORMAT);
  	                if ("".equals(fileFormat)) {
  	                    fileFormat = CommonDocument.FORMAT_GENERIC;
  	                }

  	                Map lockCheckinStatusMap = CommonDocument.getLockAndCheckinIconStatus(context, objectMap);
  	                boolean isAnyFileLockedByContext = (boolean)lockCheckinStatusMap.get("isAnyFileLockedByContext");
  	                boolean isContextDocumentOwner= (boolean)lockCheckinStatusMap.get("isContextDocumentOwner");

  	                encodedFormat = fileFormat;

  	                int fileCount = 0;
  	                String vcInterface = null;
  	                boolean vcDocument = false;
  	                boolean sOwnerWorkspace = false;
  	                fileCount = CommonDocument.getFileCount(context, objectMap);
  	                vcInterface = (String) objectMap.get(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
  	                vcDocument = "TRUE".equalsIgnoreCase(vcInterface) ? true : false;
  	                objectMap.put(CommonDocument.SELECT_LOCKED, fileLocked);
  	                objectMap.put(CommonDocument.SELECT_LOCKER, fileLockedBy);
  	                boolean isLatestRevision = (Boolean) objectMap.get(OBJECT_MAP_IS_LATEST_REVISION);
  	                if (CommonDocument.canView(context, objectMap)) {

  	                    if (is3DViaSupported(context, encodedFileName)) {
  	                        if (!isprinterFriendly) {
  	                            
  	                            String ext = encodedFileName.substring(encodedFileName.lastIndexOf(".") + 1);
  	                            
  	                            if(ext.equalsIgnoreCase("3dxml")){
  	                                s3DViaURL = "../components/emxLaunch3DPlay.jsp?objectId=" + masterId
  	                                    + "&amp;mode=fileBased&amp;fileName=" + encodedFileName + "&amp;fileFormat="
  	                                    + encodedFormat;
  	                                
  	                                sTip3DVIAViewer = EnoviaResourceBundle.getProperty(context, EMX_COMPONENTS_STRING_RESOURCE, strLocale,
  	                    "emxComponents.ImageManager.3DPlay");
  	                    
  	                            }
  	                            else{
  	                                s3DViaURL = "../components/emxLaunch3DLiveExamine.jsp?objectId=" + masterId
  	                                    + "&amp;mode=fileBased&amp;fileName=" + encodedFileName + "&amp;fileFormat="
  	                                    + encodedFormat;
  	                            }
  	                            
  	                            fileActionsStrBuff
  	                                    .append("<a href='javascript:showModalDialog(\"" + s3DViaURL + "\",600,600)'>");
  	                            fileActionsStrBuff
  	                                    .append("<img border='0' src='../common/images/iconSmallShowHide3D.gif' alt=\""
  	                                            + sTipDownload + "\" title=\"" + sTip3DVIAViewer + "\"></img></a>&#160;");
  	                        } else {
  	                            fileActionsStrBuff
  	                                    .append("<img border='0' src='../common/images/iconSmallShowHide3D.gif' alt=\""
  	                                            + sTipDownload + "\" title=\"" + sTip3DVIAViewer + "\"></img></a>&#160;");
  	                        }
  	                    }
  	                    if (!isprinterFriendly) {                       
  	                        String viewerURL = getViewerURL(context, masterId, fileFormat, fileName, strPartId);
  	                        fileActionsStrBuff.append(viewerURL);
  	                        
  	                    } else {
  	                        fileActionsStrBuff.append("<img border='0' src='../common/images/iconActionView.gif' alt=\""
  	                                + i18nViewerTip + "\" title=\"" + i18nViewerTip + "\"></img></a>&#160;");                       
  	                    }
  	                }
  	                if (CommonDocument.canDownload(context, objectMap)) {
  	                    if (!isprinterFriendly) {
  	                        downloadURL = "javascript:getTopWindow().callCheckout('"
  	                                + XSSUtil.encodeForJavaScript(context, masterId) + "','download', '"
  	                                + XSSUtil.encodeForJavaScript(context, fileName) + "', '"
  	                                + XSSUtil.encodeForJavaScript(context, fileFormat) + "', null, null, null, null, '"
  	                                + XSSUtil.encodeForJavaScript(context, strPartId) + "', '" + revision
  	                                + "',null,null, null,null, null,null ,null,null, null, '" + versionId + "');";
  	                        fileActionsStrBuff.append("<a href=\"" + downloadURL + "\">");
  	                        fileActionsStrBuff.append("<img border='0' src='../common/images/iconActionDownload.gif' alt=\""
  	                                + sTipDownload + "\" title=\"" + sTipDownload + "\"></img></a>&#160;");
  	                    } else {
  	                        fileActionsStrBuff.append("<img border='0' src='../common/images/iconActionDownload.gif' alt=\""
  	                                + sTipDownload + "\" title=\"" + sTipDownload + "\"></img></a>&#160;");
  	                    }
  	                }
  	                if (CommonDocument.canCheckout(context, objectMap)) {
  	                    if (!isprinterFriendly) {
  	                        checkoutURL = "javascript:getTopWindow().callCheckout('"
  	                                + XSSUtil.encodeForJavaScript(context, masterId) + "','checkout', '"
  	                                + XSSUtil.encodeForJavaScript(context, fileName) + "', '"
  	                                + XSSUtil.encodeForJavaScript(context, fileFormat) + "', null, null, null, null, '"
  	                                + XSSUtil.encodeForJavaScript(context, strPartId) + "', '" + revision
  	                                + "',null,null, null,null, null,null ,null,null, null, '" + versionId + "');";
  	                        fileActionsStrBuff.append("<a href=\"" + checkoutURL + "\">");
  	                        fileActionsStrBuff
  	                                .append("<img border=\"0\" src=\"../common/images/iconActionCheckOut.gif\" alt=\""
  	                                        + sTipCheckout + "\" title=\"" + sTipCheckout + "\"></img></a>&#160;");

  	                        unlockURL = "../components/emxCommonDocumentLock.jsp?objectId="
  	                                + XSSUtil.encodeForJavaScript(context, versionId);
  	                        fileActionsStrBuff.append("<a href=\"javascript:submitWithCSRF('" + unlockURL
  	                                + "', findFrame(getTopWindow(),'listHidden'))\">");
  	                        fileActionsStrBuff.append("<img border=\"0\" src=\"../common/images/iconActionLock.gif\" alt=\""
  	                                + sTipLock + "\" title=\"" + sTipLock + "\"></img></a>&#160;");
  	                    } else {
  	                        fileActionsStrBuff
  	                                .append("<img border=\"0\" src=\"../common/images/iconActionCheckOut.gif\" alt=\""
  	                                        + sTipCheckout + "\" title=\"" + sTipCheckout + "\"></img></a>&#160;");

  	                        fileActionsStrBuff.append("<img border=\"0\" src=\"../common/images/iconActionLock.gif\" alt=\""
  	                                + sTipLock + "\" title=\"" + sTipLock + "\"></img></a>&#160;");
  	                    }
  	                } else if (CommonDocument.canCheckin(context, objectMap)) {
  	                    if (!isprinterFriendly) {
  	                        
  	                        checkinURL = "../components/emxCommonDocumentPreCheckin.jsp?showComments=required&amp;refreshTable=true&amp;deleteFromTree="
  	                                + XSSUtil.encodeForJavaScript(context, versionId) + "&amp;objectId="
  	                                + XSSUtil.encodeForURL(context, masterId)
  	                                + "&amp;showFormat=readonly&amp;append=true&amp;objectAction="
  	                                + CommonDocument.OBJECT_ACTION_UPDATE_MASTER + "&amp;format=" + encodedFormat
  	                                + "&amp;oldFileName=" + XSSUtil.encodeForURL(context, encodedFileName); 
  	                        // Start MSF
  	                        msfRequestData = "{RequestType: 'CheckIn', DocumentID: '"
  	                                + XSSUtil.encodeForJavaScript(context, masterId) + "', PartId: '"
  	                                + XSSUtil.encodeForJavaScript(context, strPartId)
  	                                + "', MSFFileFormatDetails:[{FileName: '"
  	                                + XSSUtil.encodeForJavaScript(context, fileName) + "', Format: '"
  	                                + XSSUtil.encodeForJavaScript(context, fileFormat) + "', VersionId: '"
  	                                + XSSUtil.encodeForJavaScript(context, versionId) + "'}]}";
  	                        fileActionsStrBuff.append("<a onclick=\"javascript:processModalDialog(" + msfRequestData + ", '"
  	                                + checkinURL + "',730,450)\">");
  	                        // End MSF
  	                        fileActionsStrBuff
  	                                .append("<img border=\"0\" src=\"../common/images/iconActionCheckIn.gif\" alt=\""
  	                                        + sTipCheckin + "\" title=\"" + sTipCheckin + "\"></img></a>");
  	                        
  	                        
  	                        unlockURL = "../components/emxCommonDocumentUnlock.jsp?objectId="
  	                                + XSSUtil.encodeForJavaScript(context, versionId);
  	                        fileActionsStrBuff.append("<a href=\"javascript:submitWithCSRF('" + unlockURL
  	                                + "',findFrame(getTopWindow(),'listHidden'))\">");
  	                        fileActionsStrBuff
  	                                .append("<img border=\"0\" src=\"../common/images/iconActionUnlock.gif\" alt=\""
  	                                        + sTipUnlock + "\" title=\"" + sTipUnlock + "\"></img></a>");
  	                    } else {
  	                        
  	                        fileActionsStrBuff
  	                                .append("<img border=\"0\" src=\"../common/images/iconActionCheckIn.gif\" alt=\""
  	                                        + sTipCheckin + "\" title=\"" + sTipCheckin + "\"></img></a>&#160;");
  	 
  	                       
  	                        fileActionsStrBuff
  	                                .append("<img border=\"0\" src=\"../common/images/iconActionUnlock.gif\" alt=\""
  	                                        + sTipUnlock + "\" title=\"" + sTipUnlock + "\"></img></a>&#160;");
  	                    }
  	                }

  	                fileActions = fileActionsStrBuff.toString();

  	                fileActionsVector.add(fileActions);
  	            }
  	        } catch (Exception ex) {
  	            //ex.printStackTrace();
  	        } finally {
  	            return fileActionsVector;
  	        }
  	    }

    		private static boolean is3DViaSupported(Context context, String sFileName)
  		    throws Exception
  		    {
  		        boolean is3DViaSupported        = false;
  		        String sFileExtn                = getFileExtension(sFileName);
  		        String s3DVIASuppFileExtns      = EnoviaResourceBundle.getProperty(context,"emxComponents.3DVIAViewer.SupportedFileExtensions");

  		        if (s3DVIASuppFileExtns != null && !"".equals(s3DVIASuppFileExtns))
  		        {
  		            StringList sl3DVIASuppExtns = FrameworkUtil.split(s3DVIASuppFileExtns.toLowerCase(), ",");
  		            if (sFileExtn != null && !"".equals(sFileExtn) && sl3DVIASuppExtns.contains(sFileExtn.toLowerCase()))
  		            {
  		                is3DViaSupported        = true;

  		            }
  		        }
  		        return is3DViaSupported;

  		    }
    		
    		
    		public static String getFileExtension(String sFileName)
    	    {
    	        int index = sFileName.lastIndexOf('.');

    	        if (index == -1)
    	        {
    	            return sFileName;
    	        } else
    	        {
    	            return sFileName.substring(index + 1, sFileName.length());
    	        }
    	    }
    		
    		
    	  public static String getDVDocumentViewerURL(Context context, String objectId, String format, String fileName, String partId) throws Exception
        {
            return getDVDocumentViewerURL(context,objectId,format,fileName,partId,false);
        }
    	  
    	   public static String getDVDocumentViewerURL(Context context, String objectId, String format, String fileName, String partId,boolean bUIType) throws Exception
    	    {	
    	        try
    	        {	
    	        	
    	        	DomainObject dom = new DomainObject(objectId);
    	        	String objectName = dom.getName(context);
    	            Map formatViewerMap = FormatUtil.getViewerCache(context);
    	            String returnURL = "";
    	            String URLParameters = "?action=view&amp;id="+objectId+"&amp;objectId="+objectId+"&amp;format="+format+"&amp;file="+fileName+"&amp;fileName="+fileName;
    	            Map formatDetailsMap = (Map)formatViewerMap.get(format);
    	            if ( formatDetailsMap == null )
    	            {
    	                FormatUtil.loadViewerCache(context);
    	            }
    	            formatDetailsMap = (Map)formatViewerMap.get(format);
    	            String viewerURL = "";
    	            String servletPreFix = EnoviaResourceBundle.getProperty(context,"emxFramework.Viewer.ServletPreFix");
    	            String viewerTip = "Default";
    	            String i18nViewerTip = i18nNow.getViewerI18NString(viewerTip, context.getSession().getLanguage());
    	            String servletURL = "";
    	            StringBuffer fileViewerURL = new StringBuffer(256);
    	            String aliasFormat = FrameworkUtil.getAliasForAdmin(context,"format", format ,true);
    	            FormatUtil formatUtil = new FormatUtil(aliasFormat);
    	            String viewer = formatUtil.getViewerPreference(context, null);
    	            if ( formatDetailsMap == null )
    	            {
    	                if(!bUIType)
    	                    viewerURL = "<a href=\"javascript:callCheckout('"+ XSSUtil.encodeForJavaScript(context, objectId) +"','view', '"+ XSSUtil.encodeForJavaScript(context, fileName)+ "', '" + XSSUtil.encodeForJavaScript(context, format) +"', null, null, null, null, '"+XSSUtil.encodeForJavaScript(context, partId)+"');\">"+objectName+"</a>";
    	                else
    	                    viewerURL = "<a href=\"javascript:openViewer('"+ XSSUtil.encodeForJavaScript(context, objectId) +"','view', '"+ XSSUtil.encodeForJavaScript(context, fileName)+ "', '" + XSSUtil.encodeForJavaScript(context, format) +"', null, null, null, null, '"+XSSUtil.encodeForJavaScript(context, partId)+"');\">"+objectName+"</a>";
    	                returnURL = viewerURL;
    	            } else {
    	                java.util.Set set = formatDetailsMap.keySet();
    	                Iterator itr = set.iterator();
    	                boolean needDefaultViewer = false;
    	                while (itr.hasNext())
    	                {
    	                    viewerURL = (String)itr.next();
    	                    if ( viewer == null || "".equals(viewer) || "null".equals(viewer) || viewerURL.equals(viewer) )
    	                    {
    	                        needDefaultViewer = true;
    	                        viewerTip = ((String)formatDetailsMap.get(viewerURL));
    	                        i18nViewerTip = i18nNow.getViewerI18NString(viewerTip, context.getSession().getLanguage());
    	                        if ( viewerTip.equalsIgnoreCase("Default") )
    	                        {
    	                            if(!bUIType)
    	                                viewerURL = "<a href=\"javascript:getTopWindow().callCheckout('"+XSSUtil.encodeForJavaScript(context, objectId)+"','view', '"+XSSUtil.encodeForJavaScript(context, fileName)+"', '"+XSSUtil.encodeForJavaScript(context, format)+"', null, null, null, null, '"+XSSUtil.encodeForJavaScript(context, partId)+"');\">"+objectName+"</a>";
    	                            else
    	                                viewerURL = "<a href=\"javascript:openViewer('"+ XSSUtil.encodeForJavaScript(context, objectId) +"','view', '"+ XSSUtil.encodeForJavaScript(context, fileName)+ "', '" + XSSUtil.encodeForJavaScript(context, format) +"', null, null, null, null, '"+XSSUtil.encodeForJavaScript(context, partId)+"');\">"+objectName+"</a>";
    	                        } else {
    	                            viewerURL = servletPreFix + viewerURL + "?action=view&amp;";
    	                            viewerURL = "<a href=\"javascript:callViewer('"+ XSSUtil.encodeForJavaScript(context, objectId) +"','view', '"+ XSSUtil.encodeForJavaScript(context, fileName)+ "', '" + XSSUtil.encodeForJavaScript(context, format) +"', '"+ XSSUtil.encodeForJavaScript(context, viewerURL) +"', '"+ XSSUtil.encodeForJavaScript(context, partId)+"');\">"+objectName+"</a>";
    	                            }
    	                    }
    	                }
    	                if ( !needDefaultViewer )
    	                {
    	                    if(!bUIType)
    	                        viewerURL = "<a href=\"javascript:callCheckout('"+XSSUtil.encodeForJavaScript(context, objectId)  +"','view', '"+ XSSUtil.encodeForJavaScript(context, fileName)+ "', '" + XSSUtil.encodeForJavaScript(context, format) +"', null, null, null, null, '"+XSSUtil.encodeForJavaScript(context, partId)+"');\">"+objectName+"</a>";
    	                    else
    	                        viewerURL = "<a href=\"javascript:openViewer('"+ XSSUtil.encodeForJavaScript(context, objectId) +"','view', '"+ XSSUtil.encodeForJavaScript(context, fileName)+ "', '" + XSSUtil.encodeForJavaScript(context, format) +"', null, null, null, null, '"+XSSUtil.encodeForJavaScript(context, partId)+"');\">"+objectName+"</a>";
    	                }
    	                returnURL = viewerURL;
    	            }
    	            return returnURL;
    	        }
    	        catch (Exception ex)
    	        {
    	            ex.printStackTrace();
    	            throw ex;
    	        }
    	    }

    	    private static MapList getUpdatedColumnValues(Context context, MapList objectList, StringList selectables) throws Exception {
    	        String oidsArray[] = new String[objectList.size()];
    	        for (int i = 0; i < objectList.size(); i++)
    	        {
    	            String objId = (String)((Map)objectList.get(i)).get(OBJECT_MAP_ID);
    	            oidsArray[i] = (String)(FrameworkUtil.split(objId, "~").get(0));

    	        }
    	        selectables.add(CommonDocument.SELECT_ID);
    	        return DomainObject.getInfo(context, oidsArray, selectables);
    	    }
    	    
    	    /// 230802 choimingi add [S]   	 
    	    public Vector getFileName(Context context, String[] args)throws Exception
    	    {
    	    	
    	          Vector fileRevisionVector = new Vector();
    	          HashMap programMap = (HashMap) JPO.unpackArgs(args);
    	          MapList objectList = (MapList)programMap.get(PROGRAM_MAP_OBJECT_LIST);
    	          Map paramList = (Map)programMap.get(PROGRAM_MAP_PARAM_LIST);
    	          boolean isPopup = "true".equalsIgnoreCase((String)paramList.get("popup"));
    	          String reportFormat = (String) paramList.get(PARAM_LIST_REPORT_FORMAT);
    	          boolean bExport = "ExcelHTML".equals(reportFormat)  || "CSV".equals(reportFormat) ;
    	          boolean bPrintMode = "HTML".equals(reportFormat);
    	          String masterId = "";
    	          String strDocumentPartRel = (String)paramList.get(PARAM_LIST_REL_ID);
    	          String strPartId = (String)paramList.get(PARAM_LIST_TRACK_USAGE_PART_ID);
    	          try
    	          {
    	              if(strPartId == null && strDocumentPartRel != null)
    	              {
    	                String[] relIds = {strDocumentPartRel};
    	                StringList slRelSelect = new StringList(PARAM_LIST_FROM_ID);
    	                MapList mlPart = DomainRelationship.getInfo(context, relIds, slRelSelect);

    	                if(mlPart.size()>0)
    	                {
    	                  strPartId = (String) ((Map)mlPart.get(0)).get(PARAM_LIST_FROM_ID);
    	                }
    	              }
    	          }catch(Exception e){}
    	          
    	          String[] strArrayIds = new String[objectList.size()];
    	      	
	    	      for(int i=0; i<objectList.size(); i++)
	    	      {
	    	        Map objectMap = (Map) objectList.get(i);
	    	        strArrayIds[i] = (String) objectMap.get(DomainConstants.SELECT_ID);
	    	        masterId = (String) objectMap.get("masterId");
	    	      }
	    	      StringList sl = new StringList(3);
	    	        sl.add("attribute["+DomainConstants.ATTRIBUTE_TITLE+"]");
	    	        sl.add(DomainConstants.SELECT_TYPE);
	    	        sl.add(DomainConstants.SELECT_ID);
	    	      MapList ml = DomainObject.getInfo(context, strArrayIds, sl);
    	          
    	          
    	                  
    	          String parendId = (String) paramList.get("parentOID");
    	          DomainObject pDom = new DomainObject(parendId);
    	          String pType = pDom.getType(context);
    	          if(DecStringUtil.equalsAny(pType, DecConstants.TYPE_DECDELIVERABLEDOC, DecConstants.TYPE_DECVPDOCUMENT)) {
    	        	  for(int i=0; i<ml.size(); i++){
    	        		  Map objectMap = (Map) ml.get(i);
    	        		  String strFileName = (String)objectMap.get("attribute["+DomainConstants.ATTRIBUTE_TITLE+"]");
    	    	          String str = strFileName.trim();
    	    	          fileRevisionVector.add(strFileName);
    	        	  }
    	        	 
    	          }else {
	    	          String strLink = "<a href=\"JavaScript:emxTableColumnLinkClick('../common/emxTree.jsp?mode=insert&amp;emxSuiteDirectory=components&amp;relId=null&amp;jsTreeID="+(String)paramList.get("jsTreeID");
	
	    	          //Begin:Addition:Form Single Page Properties and Files
	    	          // The parameter 'treePopup' will indicate, when the file summary table is invoked from the document properties page, and the hyperlinks to the file name should open the file tree in new window.
	    	          boolean treePopup = "true".equalsIgnoreCase((String)paramList.get("treePopup"));
	    	          if (treePopup) {
	    	              strLink = "<a href=\"JavaScript:showModalDialog('../common/emxTree.jsp?emxSuiteDirectory=components&amp;relId=null&amp;jsTreeID="+(String)paramList.get("jsTreeID");
	    	          }
	    	          //End:Addition:Form Single Page Properties and Files
    
	    	         for(int i=0; i<ml.size(); i++)
	    	         {
	    	           Map objectMap = (Map) ml.get(i);
	    	           String strTypeSymName = FrameworkUtil.getAliasForAdmin(context, "type", (String)objectMap.get(DomainConstants.SELECT_TYPE), true);
	    	           String typeIcon = "";
	    	           try{
	    	               typeIcon = EnoviaResourceBundle.getProperty(context,"emxFramework.smallIcon." + strTypeSymName);
	    	             }catch(Exception e){
	    	               typeIcon  = EnoviaResourceBundle.getProperty(context,"emxFramework.smallIcon.defaultType");
	    	             }
	    	           String defaultTypeIcon = "<img src=\"../common/images/"+typeIcon+"\" border=\"0\"></img>";
	    	           //ADDED BUG: 347008
	    	           String strFileName = (String)objectMap.get("attribute["+DomainConstants.ATTRIBUTE_TITLE+"]");
	    	           String str = strFileName.trim();
	    	           //END BUG: 347008
	    	           if(bExport)
	    	           {
	    	               fileRevisionVector.add((String)objectMap.get("attribute["+DomainConstants.ATTRIBUTE_TITLE+"]"));
	    	           }
	    	           else if(isPopup || bPrintMode)
	    	           {
	    	               fileRevisionVector.add("<nobr>"+defaultTypeIcon+"&#160;"+XSSUtil.encodeForHTML(context,(String)objectMap.get("attribute["+DomainConstants.ATTRIBUTE_TITLE+"]"))+"</nobr>");
	    	           }
	    	           else
	    	           {//changed for 366568 : parameters for width n height are given 700 X 600
	    	           //String sLink = strLink + "&parentOID="+objectMap.get("masterId")+"&objectId="+objectMap.get(DomainConstants.SELECT_ID)+"&AppendParameters=true&trackUsagePartId="+strPartId+"', '700', '600', 'false', 'popup', '')\">";
	              
	    	               String sLink = strLink + "&amp;parentOID="+XSSUtil.encodeForJavaScript(context,masterId)+"&amp;objectId="+objectMap.get(DomainConstants.SELECT_ID)+"&amp;AppendParameters=true&amp;trackUsagePartId="+strPartId+"', '700', '600', 'false', 'content', '');\">";
	              
	    	               String strURL = sLink + defaultTypeIcon + "</a> ";
	    	  	 		// modified for IR-970418 , using two different api's for & and chinese characters. will be modified with appropriate api later.
	    	  	 		if(!strFileName.contains("&")){
	    	  	 		strURL += sLink +URLDecoder.decode(strFileName, "UTF-8") + "</a>&#160;";
	    	  	 		}
	    	  	 		else{
	    	  	 			strURL += sLink +XSSUtil.encodeForXML(context, strFileName) + "</a>&#160;";
	    	  	 		}
	    	               fileRevisionVector.add("<nobr>"+strURL+"</nobr>");
	    	           }
	    	         }
    	      }
    	      return fileRevisionVector;
    	    }
    	  /// 230802 choimingi add [E]
}	
