/*
 *  ${CLASS:enoFolderManagementFodlerBase}.java
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;

import matrix.db.Attribute;
import matrix.db.AttributeList;
import matrix.db.AttributeType;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.Pattern;
import matrix.util.StringList;

import com.matrixone.apps.common.CommonDocument;
import com.matrixone.apps.common.VCDocument;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.StringUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.framework.ui.UIUtil;

/**
 * @version Folder Management V6R2015x - Copyright (c) 1992-2020 Dassault Systemes.
 */
public class enoFolderManagementFolderBase_mxJPO extends emxDomainObject_mxJPO {

    /**
     *
     */

    private static final long serialVersionUID = -5767802832138958095L;
      String objectId                              = null;
      String docRouteId                            = null;
      String routeId                               = null;
      String docLocked                             = null;
      String docLocker                             = null;
      String docOwner                              = null;
      String Title                                 = null;
      //String docType                               = null;


    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public enoFolderManagementFolderBase_mxJPO (Context context, String[] args) throws Exception {
        super(context, args);
    }
    
    /**
     * This method is executed if a specific method is not specified.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @returns nothing
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public int mxMain(Context context, String[] args) throws Exception {
        if (!context.isConnected())
            throw new Exception(ComponentsUtil.i18nStringNow("emxComponents.Generic.NotSupportedOnDesktopClient", context.getLocale().getLanguage()));
        return 0;
    }
    
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getFolderContentIds(Context context, String[] args) throws Exception
    {
        return getFolderContentIds(context, args, false);
    }

    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getFilteredFolderContentIds(Context context, String[] args) throws Exception
    {
        return getFolderContentIds(context, args, true);
    }

    /**
     * getFolderContentIds - This method is used to get content ids in the folder
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        objectId is in the paramList
     *
     * @return MapList
     * @throws Exception if the operation fails
     * @since TMC V6R2015xFD01
     */
    @SuppressWarnings("unchecked")
    @com.matrixone.apps.framework.ui.ProgramCallable
    private MapList getFolderContentIds(Context context, String[] args, boolean filterChildNodes) throws Exception
    {
        //Due to performance issue when used in a configurable table,
        //this method should return only folder content ids.

        MapList contentMapList = null;
        try
        {
            HashMap<?, ?> programMap        = (HashMap<?, ?>) JPO.unpackArgs(args);
            String expLevel = (String)programMap.get("expandLevel");
            if(UIUtil.isNullOrEmpty(expLevel))
            {
                expLevel = "1";
            }
            boolean expandAll = "0".equals(expLevel) || "All".equalsIgnoreCase(expLevel)? true : false;

            // Object ID of the folder or route
            String objectId = (String)programMap.get("objectId");

            //Building the domain Object instance
            DomainObject domainObject = DomainObject.newInstance(context,objectId);

            // build select params
            StringList selectTypeStmts = new StringList(1);
            selectTypeStmts.add(DomainConstants.SELECT_ID);
            selectTypeStmts.add(DomainConstants.SELECT_TYPE);
            selectTypeStmts.add(DomainConstants.SELECT_NAME);
            StringList selectRelStmts = new StringList(1);
            selectRelStmts.add(DomainConstants.SELECT_RELATIONSHIP_ID);
            //added for bug 352726
            String sObjWhere = "current.access[read] == TRUE";
            String sRelWhere = "";
            String ATTRIBUTE_DISPLAY_ON_FILTER = PropertyUtil.getSchemaProperty(context, "attribute_DisplayOnFilter");
            String SELECT_ATTRIBUTE_DISPLAY_ON_FILTER = "attribute["+ ATTRIBUTE_DISPLAY_ON_FILTER +"]";
            if(ATTRIBUTE_DISPLAY_ON_FILTER == null || "".equals(ATTRIBUTE_DISPLAY_ON_FILTER) )
            {
                filterChildNodes = false;
            }
            String relationshipPattern = DomainObject.RELATIONSHIP_VAULTED_DOCUMENTS;
            String primaryRels = MqlUtil.mqlCommand(context, "print rel $1 select $2 dump $3", relationshipPattern, "totype.property[Primary Relationships].value", ",");
            String secondaryRels = MqlUtil.mqlCommand(context, "print rel $1 select $2 dump $3", relationshipPattern, "totype.property[Secondary Relationships].value", ",");
            relationshipPattern += ","+ DomainObject.RELATIONSHIP_SUB_VAULTS;
            int expandLevel = 0;
            if( !expandAll)
            {
                expandLevel = Integer.parseInt(expLevel);
            }

            StringList primaryRelList = StringUtil.split(primaryRels, ",");
        String totalRels = "";
            StringList secondaryRelList = StringUtil.split(secondaryRels, ",");
            StringList hasRelSelects = new StringList(10);
            hasRelSelects.addElement("from["+DomainObject.RELATIONSHIP_SUB_VAULTS+"]");
            hasRelSelects.addElement("from["+DomainObject.RELATIONSHIP_VAULTED_DOCUMENTS+"]");
            for (int i=0; i<primaryRelList.size(); i++)
            {
                String relName = (String)primaryRelList.get(i);
                String relWhere = null;
                if( relName.contains("|"))
                {
                    StringList relDetails = StringUtil.split(relName, "|");
                    relName = (String)relDetails.get(0);
                    relWhere = (String)relDetails.get(1);
                }
                if( !"".equals(totalRels) )
            {
                totalRels +=  "," + relName;
            } else {
                totalRels += relName;
                }
                if(relWhere != null) {
                    hasRelSelects.addElement("from["+ relName +"|"+relWhere+"]");
                    if(!RELATIONSHIP_VAULTED_DOCUMENTS.equals(relName) )
                    {
                        sRelWhere += "(name == \"" + relName + "\" && "+ relWhere +") ||";
                    }
                } else {
                hasRelSelects.addElement("from["+ relName +"]");
                    if( !RELATIONSHIP_VAULTED_DOCUMENTS.equals(relName) )
                    {
                        sRelWhere += "name == \"" + relName + "\" ||";
                    }
                }

            }
            for (int i=0; i<secondaryRelList.size(); i++)
            {
                String relName = (String)secondaryRelList.get(i);
                if( !"".equals(totalRels) )
            {
                totalRels +=  "," + relName;
            } else {
                totalRels += relName;
                }
                hasRelSelects.addElement("from["+ relName +"]");
                if(!RELATIONSHIP_VAULTED_DOCUMENTS.equals(relName) )
                {
                    sRelWhere += "name == \"" + relName + "\" ||";
                }
            }
            if( filterChildNodes )
            {
                sRelWhere += "name == \"" + DomainObject.RELATIONSHIP_SUB_VAULTS + "\" ||(name == \""+ RELATIONSHIP_VAULTED_DOCUMENTS + "\" && " + SELECT_ATTRIBUTE_DISPLAY_ON_FILTER + "== True)";
            } else {
                sRelWhere += "name == \"" + DomainObject.RELATIONSHIP_SUB_VAULTS + "\" ||(name == \""+ RELATIONSHIP_VAULTED_DOCUMENTS + "\")";
            }

            selectTypeStmts.addAll(hasRelSelects);
            contentMapList = domainObject.getRelatedObjects(context,
                                                        relationshipPattern +"," + totalRels,
                                                        "*",  selectTypeStmts, selectRelStmts,
                                                        false, true, (short)expandLevel,
                                                        sObjWhere, sRelWhere, (int)0,
                                                        null, null, null);
            Iterator<?> itr = contentMapList.iterator();
            while(itr.hasNext())
            {
                Map<String, String> m = (Map<String, String>)itr.next();
                Iterator<?> hasRelItr = hasRelSelects.iterator();
                String hasChild = "False";
                while(hasRelItr.hasNext())
                {
                    String hasRel = (String)hasRelItr.next();
                    if( hasRel.contains("|")) {
                        hasRel = hasRel.substring(0, hasRel.indexOf("|"));
                        hasRel += "]";
                    }
                    if("true".equalsIgnoreCase((String)m.remove(hasRel)))
                    {
                        hasChild = "True";
                        break;
                    }
                }
                m.put("hasChild", hasChild);
                m.put("hasChildren", hasChild);
            }

        }catch(Exception ex)
        {
            ex.printStackTrace();
            throw new Exception(ex.toString());
        }
        return contentMapList;
    }
    
    public static String FOLDER_PUBLISH_STATE = "Folder Publish State";
    
    /**
     * Change the state of content to publish state if publish state on bookmark is true
     * 
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @throws Exception if opertaion fails
     * @deprecated since R2022x FD01
     * @see ${CLASS:emxWorkspaceMdlRelationBase}#publishOnConnect(Context, String[])
     */
    @SuppressWarnings("unchecked")
    public void publishOnConnect(Context context, String[] args) throws Exception {
        try {
            String folderId = args[0];
            String contentId = args[1];
            String atribuePublishOnConnect = PropertyUtil.getSchemaProperty(context, "attribute_PublishOnConnect");
            String publishOnConnectSelect = "attribute[" + atribuePublishOnConnect + "]";
            DomainObject folder = DomainObject.newInstance(context, folderId);
            String publishOnConnectValue = folder.getInfo(context, publishOnConnectSelect);
            if ("True".equals(publishOnConnectValue)) {
                DomainObject content = DomainObject.newInstance(context, contentId);
                StringList selects = new StringList(3);
                selects.add("policy");
                selects.add(DomainObject.SELECT_CURRENT);
                selects.add("state");
                DomainObject.MULTI_VALUE_LIST.add("state");
                Map<String, ?> contentData = content.getInfo(context, selects);
                String policy = (String)contentData.get("policy");
                StringList states = (StringList)contentData.get("state");
                String currentState = (String)contentData.get(DomainObject.SELECT_CURRENT);
                String publishStateName = PropertyUtil.getAdminProperty(context, "policy", policy, FOLDER_PUBLISH_STATE);
                if (publishStateName != null && !"".equals(publishStateName) ) {
                	int currentStateIndex = states.indexOf(currentState);
                    int publishStateNameIndex = states.indexOf(publishStateName);
                    if (currentStateIndex < publishStateNameIndex) {
                        content.setState(context, publishStateName,false);
                    }
                }
            }
        } catch(Exception ex) {
            ex.printStackTrace();
            throw new Exception(ex);
        }
    }
    
    private HashMap<String, Object> getViewerURLInfo(Context context, String objectId, String fileName) {
        HashMap<String, Object> viewerInfoMap = null;
        try {
            DomainObject obj = DomainObject.newInstance(context, objectId);
            MapList associatedFileList = obj.getAllFormatFiles(context);
            for (int i = 0; i < associatedFileList.size(); i++) {
                Map<?, ?> associatedFile = (Map<?, ?>)associatedFileList.get(i);
                if (fileName.equals((String)associatedFile.get("filename"))) {
                    viewerInfoMap = new HashMap<String, Object>();
                    viewerInfoMap.put("fileName", fileName);
                    viewerInfoMap.put("format", associatedFile.get("format"));
                    viewerInfoMap.put("id", objectId);
                    break;
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return viewerInfoMap;
    }
    
    /**
     * This method is used to get the display the properties page of object
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     * @returns HashMap
     * @throws Exception if the operation fails
     * @since AEF 10.7 SP3
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
     @com.matrixone.apps.framework.ui.ProgramCallable
     public HashMap getFolderProperties(Context context ,
                         String[] args )throws Exception
     {
         HashMap hmpDummy = new HashMap();
         hmpDummy.put("type","menu");
         hmpDummy.put("label","I am dummy map");
         hmpDummy.put("description","get all the files checked into the object");
         hmpDummy.put("roles",new StringList("all"));
         hmpDummy.put("settings",null);
         MapList mapContent = new MapList();
         HashMap hmpInput  = (HashMap)JPO.unpackArgs(args);
         HashMap paramMap = (HashMap) hmpInput.get("paramMap");
         HashMap commandMap = (HashMap) hmpInput.get("commandMap");
         HashMap requestMap = (HashMap) hmpInput.get("requestMap");

         HashMap hmpSettings = (HashMap)commandMap.get("settings");
         hmpSettings.remove("Dynamic Command Function");
         hmpSettings.remove("Dynamic Command Program");
         String strObjId = "";
         String rmbTableRowId = (String) paramMap.get("rmbTableRowId");
         StringList sList = FrameworkUtil.split(rmbTableRowId,"|");
         if(sList.size() == 3){
             strObjId = (String)sList.get(0);
         }else if(sList.size() == 4){
             strObjId = (String)sList.get(1);
         }else if(sList.size() == 2){
             strObjId = (String)sList.get(1);
         }else{
             strObjId = rmbTableRowId;
         }
         commandMap.put("settings",hmpSettings);
         String suiteDir = (String)requestMap.get("emxSuiteDirectory");
         String href = "../common/emxDynamicAttributes.jsp?objectId="+strObjId;
         if(suiteDir != null && "FolderManagement".equalsIgnoreCase(suiteDir)){
            href = "javascript:nameRMB('" + strObjId + "')";
         }
         commandMap.put("href",href);
         mapContent.add(commandMap);
         hmpDummy.put("Children",mapContent);
         return hmpDummy;
     }

    /**
     * getContentActions - This method will be called to get the Actions that
     *                     can be performed on the Content
     *                     This is called in the Actions Column of the Table
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @return Object of type Vector
     * @throws Exception if the operation fails
     * @since V10 Patch1
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Vector<String> getContentActions(Context context, String[] args) throws Exception {
        Vector<String> vActions = new Vector<String>();
        try {
            HashMap<?, ?> programMap = (HashMap<?, ?>) JPO.unpackArgs(args);
            MapList objectList = (MapList) programMap.get("objectList");
            if (objectList == null || objectList.size() <= 0) {
                return vActions;
            }

            // Getting all the content ids
            boolean noDocuments = true;

            StringList nonDocumentIds = new StringList(objectList.size());
            StringList documentIds = new StringList(objectList.size());
            StringList oids = new StringList(objectList.size());
            for (int i = 0; i < objectList.size(); i++) {
                try {
                    Map contentObjectMap =(HashMap<?, ?>) objectList.get(i);
                    String type = (String)contentObjectMap.get("type");
                    String parentType = CommonDocument.getParentType(context, type);
                    oids.add((String) contentObjectMap.get("id"));
                    if (CommonDocument.TYPE_DOCUMENTS.equals(parentType)) {
                        documentIds.add((String) contentObjectMap.get("id"));
                        noDocuments = false;
                    } else {
                        nonDocumentIds.add((String) contentObjectMap.get("id"));
                    }
                } catch (Exception ex) {
                    Hashtable contentObjectMap =(Hashtable<?, ?>) objectList.get(i);
                    String type = (String)contentObjectMap.get("type");
                    String parentType = CommonDocument.getParentType(context, type);
                    oids.add((String) contentObjectMap.get("id"));
                    if (CommonDocument.TYPE_DOCUMENTS.equals(parentType)) {
                        documentIds.add((String) contentObjectMap.get("id"));
                        noDocuments = false;
                    } else {
                        nonDocumentIds.add((String) contentObjectMap.get("id"));
                    }
                }
            }
            Map<String, String> documentActionMap = new HashMap<String, String>();
            if(noDocuments)
            {
                String url = "&#160;";
                for (int i=0; i<objectList.size(); i++)
                {
                    vActions.add(url);
                }
                return vActions;
            } else {

                Map<?, ?> paramList = (Map<?, ?>) programMap.get("paramList");
                String uiType = (String) paramList.get("uiType");
                String customSortColumns = (String) paramList.get("customSortColumns");
                String customSortDirections = (String) paramList.get("customSortDirections");
                String table = (String) paramList.get("table");

                boolean isprinterFriendly = false;
                if (paramList.get("reportFormat") != null) {
                    isprinterFriendly = true;
                }

                Locale locale = context.getSession().getLocale();
                String sTipDownload = EnoviaResourceBundle.getProperty(context, "emxTeamCentralStringResource", locale, "emxTeamCentral.ContentSummary.ToolTipDownload");
                String sTipCheckout = EnoviaResourceBundle.getProperty(context, "emxTeamCentralStringResource", locale, "emxTeamCentral.ContentSummary.ToolTipCheckout");
                String sTipCheckin = EnoviaResourceBundle.getProperty(context, "emxTeamCentralStringResource", locale, "emxTeamCentral.ContentSummary.ToolTipCheckin");
                String sTipAddFiles = EnoviaResourceBundle.getProperty(context, "emxTeamCentralStringResource", locale, "emxTeamCentral.ContentSummary.ToolTipAddFiles");

                StringList selectTypeStmts = new StringList(15);
                selectTypeStmts.add(DomainConstants.SELECT_ID);
                selectTypeStmts.add(CommonDocument.SELECT_FILE_NAME);
                selectTypeStmts.add(CommonDocument.SELECT_FILE_FORMAT);
                selectTypeStmts.add(CommonDocument.SELECT_MOVE_FILES_TO_VERSION);
                selectTypeStmts.add(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
                selectTypeStmts.add("vcfile");
                selectTypeStmts.add(CommonDocument.SELECT_LOCKER);
                selectTypeStmts.add(DomainConstants.SELECT_TYPE);
                selectTypeStmts.add(CommonDocument.SELECT_LOCKED);

                selectTypeStmts.add(CommonDocument.SELECT_SUSPEND_VERSIONING);
                selectTypeStmts.add(CommonDocument.SELECT_HAS_CHECKOUT_ACCESS);
                selectTypeStmts.add(CommonDocument.SELECT_HAS_CHECKIN_ACCESS);
                selectTypeStmts.add("vcmodule");
                selectTypeStmts.add(CommonDocument.SELECT_OWNER);
                selectTypeStmts.add(CommonDocument.SELECT_HAS_TOCONNECT_ACCESS);

                selectTypeStmts.add(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION);
                selectTypeStmts.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKER);
                selectTypeStmts.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION_ID);

                selectTypeStmts.add(CommonDocument.SELECT_ACTIVE_FILE_LOCKED);
                selectTypeStmts.add(CommonDocument.SELECT_ACTIVE_FILE_VERSION);

                String oidsArray[] = new String[documentIds.size()];
                documentIds.toArray(oidsArray);

                MapList objList = DomainObject.getInfo(context, oidsArray, selectTypeStmts);

                Iterator<?> objectListItr = objList.iterator();
                while (objectListItr.hasNext()) {
                    Map contentObjectMap = (Map) objectListItr.next();
                    String documentId = (String) contentObjectMap.get(DomainConstants.SELECT_ID);
                    String newURL = "";
                    //if (oids.contains(documentId)) {
                        StringList fileList = (StringList) contentObjectMap.get(CommonDocument.SELECT_FILE_NAME);
                        StringList fileFormatList = (StringList) contentObjectMap.get(CommonDocument.SELECT_FILE_FORMAT);
                        StringList tempfileList = new StringList();
                        for (int ii = 0; ii < fileFormatList.size(); ii++) {
                            String format = (String) fileFormatList.get(ii);
                            if (!DomainObject.FORMAT_MX_MEDIUM_IMAGE.equalsIgnoreCase(format)) {
                                tempfileList.add(fileList.get(ii));
                            }
                        }
                        fileList = tempfileList;
                        int fileCount = 0;
                        String vcInterface = "";
                        boolean vcDocument = false;
                        boolean vcFile = false;
                        String activeFileVersionID = "";
                        String sFileName = "";

                        try {
                            docLocker = (String) contentObjectMap.get(CommonDocument.SELECT_ACTIVE_FILE_LOCKER);
                            if (docLocker == null)
                                docLocker = (String) contentObjectMap.get(CommonDocument.SELECT_LOCKER);
                        } catch (ClassCastException ex) {
                            docLocker = ((StringList) contentObjectMap.get(CommonDocument.SELECT_ACTIVE_FILE_LOCKER)).elementAt(0).toString();
                            if (docLocker == null)
                                docLocker = ((StringList) contentObjectMap.get(CommonDocument.SELECT_LOCKER)).elementAt(0).toString();
                        }

                        boolean moveFilesToVersion = (Boolean.valueOf((String) contentObjectMap.get(CommonDocument.SELECT_MOVE_FILES_TO_VERSION))).booleanValue();

                        String strFileFormat = null;
                        DomainObject docObject = DomainObject.newInstance(context, documentId);
                        strFileFormat = CommonDocument.getFileFormat(context, docObject);

                        // For getting the count of files
                        HashMap filemap = new HashMap();
                        filemap.put(CommonDocument.SELECT_MOVE_FILES_TO_VERSION, contentObjectMap.get(CommonDocument.SELECT_MOVE_FILES_TO_VERSION));
                        filemap.put(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION, contentObjectMap.get(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION));
                        filemap.put(CommonDocument.SELECT_FILE_NAME, fileList);
                        fileCount = CommonDocument.getFileCount(context, filemap);
                        contentObjectMap.put("fileCount", String.valueOf(fileCount));// Integer.toString(fileCount));

                        vcInterface = (String) contentObjectMap.get(CommonDocument.SELECT_IS_KIND_OF_VC_DOCUMENT);
                        vcDocument = "TRUE".equalsIgnoreCase(vcInterface) ? true : false;

                        if (CommonDocument.canView(context, contentObjectMap)) {

                            Object fileObj = contentObjectMap.get(CommonDocument.SELECT_FILE_NAMES_OF_ACTIVE_VERSION);
                            if (fileObj instanceof String) {
                                sFileName = (String) fileObj;
                            } else if (fileObj instanceof StringList) {
                                sFileName = ((StringList) fileObj).elementAt(0).toString();
                            }
                            if (!isprinterFriendly) {
                                if (moveFilesToVersion) {
                                    Object obj = contentObjectMap.get(CommonDocument.SELECT_ACTIVE_FILE_VERSION_ID);
                                    if (obj instanceof String) {
                                        activeFileVersionID = (String) obj;
                                    } else if (obj instanceof StringList) {
                                        activeFileVersionID = ((StringList) obj).elementAt(0).toString();
                                    }
                                    // get the format that the Active version object
                                    // contains the file
                                    HashMap<?, ?> viewerURLMap = getViewerURLInfo(context, activeFileVersionID, sFileName);
                                    if (viewerURLMap != null) {
                                        // XSSOK
                                        newURL = emxCommonFileUI_mxJPO.getViewerURL(context, activeFileVersionID, (String) viewerURLMap.get("format"), sFileName);
                                    }
                                } else { // Designer Central Changes

                                    // XSSOK
                                    newURL = emxCommonFileUI_mxJPO.getViewerURL(context, documentId, strFileFormat, sFileName);
                                }
                            }
                        }
                        // Can Download
                        if (CommonDocument.canDownload(context, contentObjectMap)) {
                            if (!isprinterFriendly) {
                                newURL += "<a href=\"javascript:callCheckout('" + XSSUtil.encodeForJavaScript(context, documentId)
                                        + "','download','','','"
                                        + XSSUtil.encodeForJavaScript(context,customSortColumns)
                                        + "','"
                                        + XSSUtil.encodeForJavaScript(context, uiType)
                                        + "','"
                                        + XSSUtil.encodeForJavaScript(context, table)
                                        + "');\"><img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionDownload.png\" alt=\""
                                        + sTipDownload + "\" title=\""
                                        + sTipDownload + "\"></img></a>";

                            } else {
                                newURL += "<img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionDownload.png\" alt=\""
                                        + sTipDownload + "\" ></img>";

                            }
                            // Changes for CLC start here..
                            // Show Download Icon for ClearCase Linked Objects
                            // DomainObject ccLinkedObject =
                            // DomainObject.newInstance(context, documentId);
                            String linkAttrName = PropertyUtil.getSchemaProperty( context, "attribute_MxCCIsObjectLinked");
                            String isObjLinked = null;
                            if (linkAttrName != null && !linkAttrName.equals("")) {
                                isObjLinked = docObject.getAttributeValue(context, linkAttrName);
                            }

                            if (isObjLinked != null && !isObjLinked.equals("")) {
                                if (isObjLinked.equalsIgnoreCase("True")) {
                                    // show download icon for Linked Objects
                                    newURL += "<a href=\"../servlet/MxCCCS/MxCCCommandsServlet.java?commandName=downloadallfiles&objectId="
                                            + XSSUtil.encodeForURL(context, documentId)
                                            + "\"><img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionDownload.png\" alt=\""
                                            + sTipDownload
                                            + "\" title=\""
                                            + sTipDownload + "\"></img></a>";
                                }
                            }
                        }

                        // Can Checkout
                        if (CommonDocument.canCheckout(context, contentObjectMap)) {
                            if (!isprinterFriendly) {
                                newURL += "<a href=\"javascript:callCheckout('"
                                        + XSSUtil.encodeForJavaScript(context, documentId)
                                        + "','checkout','','','"
                                        + XSSUtil.encodeForJavaScript(context, customSortColumns)
                                        + "','"
                                        + XSSUtil.encodeForJavaScript(context, customSortDirections)
                                        + "', '"
                                        + XSSUtil.encodeForJavaScript(context, uiType)
                                        + "', '"
                                        + XSSUtil.encodeForJavaScript(context, table)
                                        + "');\"><img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionCheckOut.png\" alt=\""
                                        + sTipCheckout + "\" title=\""
                                        + sTipCheckout + "\"></img></a>";

                            } else {
                                newURL += "<img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionCheckOut.png\" alt=\""
                                        + sTipCheckout + "\" ></img>";

                            }
                        }
                        // Can Checkout
                        if (CommonDocument.canCheckin(context, contentObjectMap) || VCDocument.canVCCheckin(context, contentObjectMap)) {
                            vcFile = (Boolean.valueOf((String) contentObjectMap.get("vcfile"))).booleanValue();
                            if (!isprinterFriendly) {
                                StringBuffer strBuf = new StringBuffer(1256);
                                if (!vcDocument) {
                                    strBuf.append("'../components/emxCommonDocumentPreCheckin.jsp?objectId=");
                                    strBuf.append(XSSUtil.encodeForJavaScript(context, documentId));
                                    strBuf.append("&amp;folderId=");
                                    strBuf.append(objectId);
                                    strBuf.append("&amp;customSortColumns="); // Added for Bug #371651 starts
                                    strBuf.append(XSSUtil.encodeForJavaScript(context, customSortColumns));
                                    strBuf.append("&amp;customSortDirections=");
                                    strBuf.append(XSSUtil.encodeForJavaScript(context, customSortDirections));
                                    strBuf.append("&amp;uiType=");
                                    strBuf.append(XSSUtil.encodeForJavaScript(context, uiType));
                                    strBuf.append("&amp;table=");
                                    strBuf.append(XSSUtil.encodeForJavaScript(context, table)); // Added for Bug
                                                                // #371651 ends
                                    strBuf.append("&amp;showFormat=true&amp;showComments=required&amp;objectAction=update&amp;JPOName=emxTeamDocumentBase&amp;appDir=teamcentral&amp;appProcessPage=emxTeamPostCheckinProcess.jsp&amp;refreshTableContent=true','730','450'");
                                    newURL += "<a href=\"javascript:showModalDialog("
                                            + strBuf.toString()
                                            + ");\"><img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionCheckIn.png\" alt=\""
                                            + sTipCheckin
                                            + "\" title=\""
                                            + sTipCheckin + "\"></img></a>";
                                } else {
                                    if (vcFile) {
                                        strBuf.append("'../components/emxCommonDocumentPreCheckin.jsp?objectId=");
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, documentId));
                                        strBuf.append("&amp;folderId=");
                                        strBuf.append(objectId);
                                        strBuf.append("&amp;customSortColumns="); // Added for Bug #371651 starts
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, customSortColumns));
                                        strBuf.append("&amp;customSortDirections=");
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, customSortDirections));
                                        strBuf.append("&amp;uiType=");
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, uiType));
                                        strBuf.append("&amp;table=");
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, table)); // Added for Bug #371651 ends
                                        strBuf.append("&amp;showFormat=false&amp;showComments=required&amp;objectAction=checkinVCFile&amp;allowFileNameChange=false&amp;noOfFiles=1&amp;JPOName=emxVCDocument&amp;methodName=checkinUpdate&amp;refreshTableContent=true','730','450'");
                                        newURL += "<a href=\"javascript:showModalDialog("
                                                + strBuf.toString()
                                                + ");\"><img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionCheckIn.png\" alt=\""
                                                + sTipCheckin
                                                + "\" title=\""
                                                + sTipCheckin + "\"></img></a>";
                                    } else {
                                        strBuf.append("'../components/emxCommonDocumentPreCheckin.jsp?objectId=");
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, documentId));
                                        strBuf.append("&amp;folderId=");
                                        strBuf.append(objectId);
                                        strBuf.append("&amp;customSortColumns="); // Added for Bug #371651 starts
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, customSortColumns));
                                        strBuf.append("&amp;customSortDirections=");
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, customSortDirections));
                                        strBuf.append("&amp;uiType=");
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, uiType));
                                        strBuf.append("&amp;table=");
                                        strBuf.append(XSSUtil.encodeForJavaScript(context, table)); // Added for Bug #371651 ends
                                        strBuf.append("&amp;override=false&amp;showFormat=false&amp;showComments=required&amp;objectAction=checkinVCFile&amp;allowFileNameChange=true&amp;noOfFiles=1&amp;JPOName=emxVCDocument&amp;methodName=checkinUpdate&amp;refreshTableContent=true','730','450'");
                                        newURL += "<a href=\"javascript:showModalDialog("
                                                + strBuf.toString()
                                                + ");\"><img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionCheckIn.png\" alt=\""
                                                + sTipCheckin
                                                + "\" title=\""
                                                + sTipCheckin + "\"></img></a>";
                                    }
                                }
                                if ((fileCount <= 1 && !vcDocument)) {
                                    // strBuf.append("<a href=\"../teamcentral/emxTeamUnlockDocument.jsp?&docId=");
                                    // //Commented for Bug #371651
                                    // Modified for Bug #371651 starts
                                    StringBuffer strngBuf = new StringBuffer(1256);
                                    strngBuf.append("'../teamcentral/emxTeamUnlockDocument.jsp?docId=");
                                    strngBuf.append(XSSUtil.encodeForJavaScript(context, documentId));
                                    strngBuf.append("&amp;customSortColumns=");
                                    strngBuf.append(XSSUtil.encodeForJavaScript(context, customSortColumns));
                                    strngBuf.append("&amp;customSortDirections=");
                                    strngBuf.append(XSSUtil.encodeForJavaScript(context, customSortDirections));
                                    strngBuf.append("&amp;uiType=");
                                    strngBuf.append(XSSUtil.encodeForJavaScript(context, uiType));
                                    strngBuf.append("&amp;table=");
                                    strngBuf.append(XSSUtil.encodeForJavaScript(context, table));
                                    strngBuf.append("'");// Modified for Bug #371651 ends
                                    newURL += "<a href=\"javascript:submitWithCSRF("
                                            + strngBuf.toString()
                                            + ", findFrame(getTopWindow(),'hiddenFrame'));\"><img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionUnlock.png\" alt=\""
                                            + docLocker
                                            + "\" title=\""
                                            + docLocker
                                            + "\"></img></a>";
                                }
                            } else {
                                newURL += "<img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionCheckIn.png\" alt=\""
                                        + sTipCheckin
                                        + "\" title=\""
                                        + sTipCheckin
                                        + "\"></img>";

                                if (fileCount <= 1) {
                                    newURL += "<img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionUnlock.png\" alt=\""
                                            + docLocker
                                            + "\" title=\""
                                            + docLocker
                                            + "\"></img>";

                                }
                            }
                        }
                        // Can Add Files
                        if (CommonDocument.canAddFiles(context, contentObjectMap)) {
                            if (!isprinterFriendly) {
                                StringBuffer strBuf = new StringBuffer(1256);
                                strBuf.append("'../components/emxCommonDocumentPreCheckin.jsp?objectId=");
                                strBuf.append(XSSUtil.encodeForJavaScript(context, documentId));
                                strBuf.append("&amp;folderId=");
                                strBuf.append(objectId);
                                strBuf.append("&amp;customSortColumns="); // Added for Bug #371651 starts
                                strBuf.append(XSSUtil.encodeForJavaScript(context, customSortColumns));
                                strBuf.append("&amp;customSortDirections=");
                                strBuf.append(XSSUtil.encodeForJavaScript(context, customSortDirections));
                                strBuf.append("&amp;uiType=");
                                strBuf.append(XSSUtil.encodeForJavaScript(context, uiType));
                                strBuf.append("&amp;table=");
                                strBuf.append(XSSUtil.encodeForJavaScript(context, table)); // Added for Bug #371651 ends
                                strBuf.append("&amp;showFormat=true&amp;showDescription=required&amp;objectAction=checkin&amp;showTitle=true&amp;JPOName=emxTeamDocumentBase&amp;appDir=teamcentral&amp;appProcessPage=emxTeamPostCheckinProcess.jsp&amp;refreshTableContent=true','730','450'");
                                newURL += "<a href=\"javascript:showModalDialog("
                                        + strBuf.toString()
                                        + ");\"><img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionAppend.png\" alt=\""
                                        + sTipAddFiles + "\" title=\""
                                        + sTipAddFiles + "\"></img></a>";

                            } else {
                                newURL += "<img style=\"border:0; padding: 2px;\" src=\"../common/images/iconActionAppend.png\" alt=\""
                                        + sTipAddFiles
                                        + "\" title=\""
                                        + sTipAddFiles + "\"></img>";

                            }
                        }
                        if (newURL.length() == 0)
                            newURL += "&#160;";
                    documentActionMap.put(documentId, newURL);
                }

                String blankURL = "&#160;";
                for (int i=0; i<oids.size(); i++)
                {
                    String id = (String)oids.get(i);
                    if(documentActionMap.containsKey(id) )
                    {
                        vActions.add((String)documentActionMap.get(id));
                    } else {
                        vActions.add(blankURL);
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
        return vActions;

    }

    /**
     * getHideShow - This method will be called to get the hide/show value for the object
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - objectList MapList
     * @return Object of type Vector
     * @throws Exception if the operation fails
     * @since V6R2015x
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public Vector<String> getHideShow(Context context, String[] args)
      throws Exception
    {
       Vector<String> vHideShow = new Vector<String>();
       try
       {
          HashMap<?, ?> programMap = (HashMap<?, ?>) JPO.unpackArgs(args);
          HashMap<?, ?>  columnMap = (HashMap<?, ?>)programMap.get("columnMap");
          HashMap<?, ?>  settings = (HashMap<?, ?>)columnMap.get("settings");
          MapList objectList = (MapList)programMap.get("objectList");
          if(objectList == null || objectList.size() <= 0)
          {
              return vHideShow;
          }

          StringList documentIds = new StringList(objectList.size());
          for (int i = 0; i < objectList.size(); i++)
          {
             try
             {
                  documentIds.add((String)((HashMap<?, ?>)objectList.get(i)).get(DomainConstants.SELECT_ID));
             } catch (Exception ex)
             {
                  documentIds.add((String)((Hashtable<?, ?>)objectList.get(i)).get(DomainConstants.SELECT_ID));
              }
          }

          String oidsArray[] = new String[documentIds.size()];
          documentIds.toArray(oidsArray);
          StringList selectTypeStmts = new StringList(15);
         String typeToShow =(String)settings.get("typeToShow");
         StringList typeToShowList = FrameworkUtil.split(typeToShow, ",");
         String strtypeToShow ="";
         for(int i=0;i<typeToShowList.size();i++){
             strtypeToShow +="type.kindof["+typeToShowList.get(i)+"]";

          selectTypeStmts.add("type.kindof["+typeToShowList.get(i)+"]");
          strtypeToShow+=",";
         }
         strtypeToShow=strtypeToShow.substring(0, strtypeToShow.length()-1);
          MapList objList = DomainObject.getInfo(context, oidsArray, selectTypeStmts);

           //Getting all the content ids
          String isOftypeToShow = "";
          StringList strtypeToShowList = FrameworkUtil.split(strtypeToShow, ",");
          for (int i = 0; i < objList.size(); i++)
          {
             for(int j=0;j<strtypeToShowList.size();j++){
             try
             {
                 isOftypeToShow+= (String)((HashMap<?, ?>)objList.get(i)).get(strtypeToShowList.get(j));
             } catch (Exception ex)
             {
                 isOftypeToShow+= (String)((Hashtable<?, ?>)objList.get(i)).get(strtypeToShowList.get(j));
             }
             }
             String strHideShow = "";
             if(!isOftypeToShow.contains("TRUE")){

              strHideShow = "none";
             } else {
              strHideShow = "false";
             }
             isOftypeToShow="";
             vHideShow.add(strHideShow);
          }
      } catch(Exception ex){
          ex.printStackTrace();
          throw ex;
      }
       return vHideShow;
    }
    
    /**
     * 
     * 
     * @param context the eMatrix <code>Context</code> object
     * @param args
     * @throws Exception if operation fails
     */
    public void delayedFloat(Context context, String[] args) throws Exception {
        try {
            String contentId = args[0];
            String newContentId = args[1];
            String relationshipVaultedObjects = PropertyUtil.getSchemaProperty(context, "relationship_VaultedObjects");
            String relationshipVaultedObjectsSelect = "to[" + relationshipVaultedObjects + "].id";
            String cmd = "print bus $1_ObjectId select $2 dump $3";
            String vaultedObjectIds = MqlUtil.mqlCommand(context, cmd, contentId, relationshipVaultedObjectsSelect, "|");
            if ( vaultedObjectIds != null ) {
                StringList vaultedObjectsRelIds = StringUtil.split(vaultedObjectIds, "|");
                Iterator<?> vaultedObjectsIterator = vaultedObjectsRelIds.iterator();
                while (vaultedObjectsIterator.hasNext()) {
                    String vaultedObjectsId = (String)vaultedObjectsIterator.next();
                    cmd = "mod connection $1_relID $2_direction $3_destinationid";
                    MqlUtil.mqlCommand(context, cmd, vaultedObjectsId, "to", newContentId);
                }
            }
        } catch(Exception ex) {
        	ex.printStackTrace();
            throw new Exception(ex);
        }
    }
    
    private static final String SELECT_PHYSICAL_ID = "physicalid";

    /**
     * Update Folder Path and Folder Classification attributes from Parent folder.
     *
     * @param context the eMatrix Context object
     * @param args[] of From Object Id as first parameter and To Object Id as second parameter
     * @return void
     * @throws Exception if the operation fails
     * @since TMC V6R2015x
     * @grade 0
     * @deprecated since R2022x FD01
     * @see ${CLASS:emxWorkspaceMdlRelationBase}#updateFolderPathAndClassification(Context, String[])
     */
     @SuppressWarnings("unchecked")
     public void updateFolderPathAndClassification(matrix.db.Context context, String[] args ) throws Exception {
         try {
             ContextUtil.startTransaction(context, true);
             DomainObject parentObject = new DomainObject(args[0]);
             DomainObject childObject = new DomainObject(args[1]);
             StringList selects = new StringList(4);
             String ATTRIBUTE_FOLDER_PATH = PropertyUtil.getSchemaProperty(context, "attribute_FolderPath");
             String ATTRIBUTE_FOLDER_CLASSIFICATION = PropertyUtil.getSchemaProperty(context, "attribute_FolderClassification");
             String SELECT_ATTRIBUTE_FOLDER_PATH = "attribute["+ ATTRIBUTE_FOLDER_PATH +"]";
             String SELECT_ATTRIBUTE_FOLDER_CLASSIFICATION = "attribute["+ ATTRIBUTE_FOLDER_CLASSIFICATION +"]";
             selects.add(SELECT_ATTRIBUTE_FOLDER_PATH);
             selects.add(SELECT_ATTRIBUTE_FOLDER_CLASSIFICATION);
             selects.add(SELECT_PHYSICAL_ID);
             Map<String, String> parentDataMap = parentObject.getInfo(context, selects);
             String pid =(String)parentDataMap.get(SELECT_PHYSICAL_ID);
             String parentFolderPath =(String)parentDataMap.get(SELECT_ATTRIBUTE_FOLDER_PATH);
             String folderClassification =(String)parentDataMap.get(SELECT_ATTRIBUTE_FOLDER_CLASSIFICATION);
             String folderPath = pid;
             if (parentFolderPath != null && !"null".equals(parentFolderPath) && !"".equals(parentFolderPath)) {
            	 folderPath = parentFolderPath + "|" + pid;
             }
             AttributeList attrList = new AttributeList();
             attrList.add( new Attribute( new AttributeType(ATTRIBUTE_FOLDER_PATH), folderPath));
             if ( folderClassification != null && !"".equals(folderClassification) && !"null".equals(folderClassification)) {
            	 attrList.add( new Attribute( new AttributeType(ATTRIBUTE_FOLDER_CLASSIFICATION), folderClassification));
             }
             childObject.setAttributes(context, attrList);
             ContextUtil.commitTransaction(context);
         } catch (Exception ex) {
        	 ContextUtil.abortTransaction(context);
             ex.printStackTrace();
             throw ex;
         }
     }
     
    /**
     * Update Folder Classification attributes for Personal workspace.
     * 
     * @param context the eMatrix Context object
     * @param args[] of From Object Id as first parameter and To Object Id as second parameter
     * @return void
     * @throws Exception if the operation fails
     * @since TMC V6R2015x
     * @grade 0
     * @deprecated R2022x FD01, 'Personal Workspace' type is deprecated since R2022x, this trigger
     *             method is no longer required.
     */
     public void updateFolderClassification(matrix.db.Context context, String[] args) throws Exception {
         try {
             ContextUtil.startTransaction(context, true);
             DomainObject object = new DomainObject(args[0]);
             String ATTRIBUTE_FOLDER_CLASSIFICATION = PropertyUtil.getSchemaProperty(context, "attribute_FolderClassification");
             if ( ATTRIBUTE_FOLDER_CLASSIFICATION != null && !"".equals(ATTRIBUTE_FOLDER_CLASSIFICATION)) {
                 AttributeList attrList = new AttributeList();
                 attrList.add( new Attribute( new AttributeType(ATTRIBUTE_FOLDER_CLASSIFICATION), "Personal"));
                 object.setAttributes(context, attrList);
             }
             ContextUtil.commitTransaction(context);
         } catch(Exception ex) {
             ContextUtil.abortTransaction(context);
             ex.printStackTrace();
             throw ex;
         }
     }

    @SuppressWarnings("unchecked")
    @com.matrixone.apps.framework.ui.ProgramCallable
    public static Vector<String> getFolderPath(Context context, String[] args) throws Exception
    {
        Vector<String> vFolderPaths = new Vector<String>();
        try
        {
            ContextUtil.startTransaction(context, false);
            HashMap<?, ?> programMap = (HashMap<?, ?>) JPO.unpackArgs(args);
            MapList objectList = (MapList)programMap.get("objectList");
            if(objectList == null || objectList.size() <= 0)
            {
                return vFolderPaths;
            }
            StringList oids = new StringList(objectList.size());
            for (int i = 0; i < objectList.size(); i++)
            {
                try
                {
                  oids.add((String)((HashMap<?, ?>)objectList.get(i)).get(DomainConstants.SELECT_ID));
                } catch (Exception ex)
                {
                  oids.add((String)((Hashtable<?, ?>)objectList.get(i)).get(DomainConstants.SELECT_ID));
                }
            }
            String oidsArray[] = new String[oids.size()];
            oids.toArray(oidsArray);

            String ATTRIBUTE_FOLDER_PATH = PropertyUtil.getSchemaProperty(context, "attribute_FolderPath");
            String SELECT_ATTRIBUTE_FOLDER_PATH = "attribute["+ ATTRIBUTE_FOLDER_PATH +"]";
            StringList selects = new StringList(1);
            selects.addElement(SELECT_ATTRIBUTE_FOLDER_PATH);
            MapList folderPathList = DomainObject.getInfo(context, oidsArray, selects);
            Iterator<?> folderPathItr = folderPathList.iterator();
            StringList pids = new StringList(folderPathList.size()* 5);
            StringList folderPaths = new StringList(folderPathList.size());
            while(folderPathItr.hasNext())
            {
                Map<String,String> m = (Map<String, String>)folderPathItr.next();
                String folderPath = m.get(SELECT_ATTRIBUTE_FOLDER_PATH);
                folderPaths.add(folderPath);
                pids.addAll(StringUtil.split(folderPath, "|"));
            }
            String[] ids = new String[pids.size()];
            pids.toArray(ids);
            StringList objectSelects = new StringList(1);
            objectSelects.addElement(SELECT_NAME);
            objectSelects.addElement("physicalid");
            objectSelects.addElement(SELECT_ID);
            MapList mlist = DomainObject.getInfo(context, ids, objectSelects);
            Iterator<?> mitr = mlist.iterator();
            Map<String, String> folderNames = new HashMap<String, String>();
            Map<String, String> folderIds = new HashMap<String, String>();
            while(mitr.hasNext())
            {
                Map<String,String> m = (Map<String, String>)mitr.next();
                String name = m.get(SELECT_NAME);
                String pid = m.get("physicalid");
                String id = m.get(SELECT_ID);
                folderNames.put(pid,name);
                folderIds.put(pid, id);
            }
            folderPathItr = folderPaths.iterator();
            while(folderPathItr.hasNext())
            {
                String folderPath = (String)folderPathItr.next();
                StringList paths = StringUtil.split(folderPath, "|");
                Iterator<?> pathItr = paths.iterator();
                boolean first = true;
                StringBuffer html = new StringBuffer("<div>");
                while( pathItr.hasNext())
                {
                    String pid = (String)pathItr.next();
                    if(first)
                    {
                        first = false;
                        html.append("<a href=\"javascript:displayFolderInFolderApp(null, '");
                        html.append(folderIds.get(pid));
                        html.append("')\">");
                        html.append(folderNames.get(pid));
                        html.append("</a>");
                    } else {
                        html.append(" / ");
                        html.append("<a href=\"javascript:displayFolderInFolderApp(null, '");
                        html.append(folderIds.get(pid));
                        html.append("')\">");
                        html.append(folderNames.get(pid));
                        html.append("</a>");
                    }
                }
                html.append("</div>");
                vFolderPaths.add(html.toString());
            }
            ContextUtil.commitTransaction(context);
            return vFolderPaths;
        }catch(Exception ex)
        {
            ContextUtil.abortTransaction(context);
            ex.printStackTrace();
            throw ex;
        }
    }

    /**
    * Update Folder Path and Folder Classification attributes from Parent folder.
    *
    * @param context the eMatrix Context object
    * @param args[] of From Object Id as first parameter and To Object Id as second parameter
    * @return void
    * @throws Exception if the operation fails
    * @since TMC V6R2015x
    * @grade 0
    */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public void updateDisplayOnFilter(matrix.db.Context context, String[] args ) throws Exception {
        try {
            ContextUtil.startTransaction(context, true);
            String contentType = args[3];
            String command = "print type $1 select $2 dump";
            String primaryRels = MqlUtil.mqlCommand(context, command, contentType, "property[Primary Relationships].value");
            if (primaryRels != null && !"".equals(primaryRels) && !"null".equals(primaryRels) ) {
                String ATTRIBUTE_DISPLAY_ON_FILTER = PropertyUtil.getSchemaProperty(context, "attribute_DisplayOnFilter");
                String relationshipVaultedObejcts = PropertyUtil.getSchemaProperty(context, "relationship_VaultedDocuments");
                DomainObject folderObject = new DomainObject(args[0]);
                DomainObject contentObject = new DomainObject(args[1]);
                String relId = args[2];
                StringList selects = new StringList(2);
                selects.add(SELECT_ID);
                selects.add(SELECT_ID);
                StringList relSelects = new StringList(2);
                relSelects.add(SELECT_RELATIONSHIP_ID);
                String totalRels = "";
                StringList primaryRelList = StringUtil.split(primaryRels, ",");
                String sRelWhere = "";
                for (int i=0; i<primaryRelList.size(); i++) {
                	String relName = (String)primaryRelList.get(i);
                    String relWhere = null;
                    if (relName.contains("|")) {
                        StringList relDetails = StringUtil.split(relName, "|");
                        relName = (String)relDetails.get(0);
                        relWhere = (String)relDetails.get(1);
                    }
                    
                    if ( !"".equals(totalRels) ) {
                        totalRels +=  "," + relName;
                        if (relWhere != null) {
                            sRelWhere += "|| (name == \"" + relName + "\" && "+ relWhere +")";
                        } else {
                            sRelWhere += " || name == \"" + relName + "\"";
                        }
                    } else {
                        totalRels += relName;
                        if(relWhere != null) {
                            sRelWhere += "(name == \"" + relName + "\" && "+ relWhere +")";
                        } else {
                            sRelWhere += "name == \"" + relName + "\"";
                        }
                    }
                }
                MapList childMapList = contentObject.getRelatedObjects(context,
                		                                               totalRels,
                		                                               "*",
                		                                               selects,
                		                                               null,
                		                                               false,
                		                                               true,
                		                                               (short)0,
                		                                               null,
                		                                               sRelWhere,
                		                                               (int)0,
                		                                               null,
                		                                               null,
                		                                               null);
                StringList childIds = new StringList(childMapList.size());
                Iterator childItr = childMapList.iterator();
                while (childItr.hasNext()) {
                    Map<String,String> m = (Map<String,String>)childItr.next();
                    childIds.add(m.get(SELECT_ID));
                }
                MapList parentMapList = contentObject.getRelatedObjects(context,
                		                                                totalRels,
                		                                                "*",
                		                                                selects,
                		                                                null,
                		                                                true,
                		                                                false,
                		                                                (short)0,
                		                                                null,
                		                                                sRelWhere,
                		                                                (int)0,
                		                                                null,
                		                                                null,
                		                                                null);
                StringList parentIds = new StringList(childMapList.size());
                Iterator parentItr = parentMapList.iterator();
                while (parentItr.hasNext()) {
                	Map<String,String> m = (Map<String,String>)parentItr.next();
                    parentIds.add(m.get(SELECT_ID));
                }
                MapList contentMapList = folderObject.getRelatedObjects(context,
                		                                                relationshipVaultedObejcts,
                		                                                "*",
                		                                                selects,
                		                                                relSelects,
                		                                                false,
                		                                                true,
                		                                                (short)0,
                		                                                null,
                		                                                null,
                		                                                (int)0,
                		                                                null,
                		                                                null,
                		                                                null);
                Iterator contentItr = contentMapList.iterator();
                while (contentItr.hasNext()) {
                    Map<String,String> m = (Map<String,String>)contentItr.next();
                    String contentId = m.get(SELECT_ID);
                    if ( parentIds.contains(contentId)) {
                    	DomainRelationship.setAttributeValue(context, relId, ATTRIBUTE_DISPLAY_ON_FILTER, "False");
                    } else if( childIds.contains(contentId)) {
                        DomainRelationship.setAttributeValue(context, m.get(SELECT_RELATIONSHIP_ID), ATTRIBUTE_DISPLAY_ON_FILTER, "False");
                    }
                }
            }
            ContextUtil.commitTransaction(context);
        } catch(Exception ex) {
        	ContextUtil.abortTransaction(context);
            ex.printStackTrace();
            throw ex;
        }
    }
    
    /**
    * Update Folder Path and Folder Classification attributes from Parent folder.
    *
    * @param context the eMatrix Context object
    * @param args[] of From Object Id as first parameter and To Object Id as second parameter
    * @return void
    * @throws Exception if the operation fails
    * @since TMC V6R2015x
    * @grade 0
    */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public void updateDisplayOnFilterOnDisconnect(matrix.db.Context context, String[] args ) throws Exception {
    	try {
            ContextUtil.startTransaction(context, true);
            String contentType = args[2];
            String command = "print type $1 select $2 dump";
            String primaryRels = MqlUtil.mqlCommand(context, command, contentType, "property[Primary Relationships].value");
            if (primaryRels != null && !"".equals(primaryRels) && !"null".equals(primaryRels) ) {
                String ATTRIBUTE_DISPLAY_ON_FILTER = PropertyUtil.getSchemaProperty(context, "attribute_DisplayOnFilter");
                String SELECT_ATTRIBUTE_DISPLAY_ON_FILTER = "attribute["+ATTRIBUTE_DISPLAY_ON_FILTER+"]";
                String detectRecursion = "false";
                try {
                	detectRecursion = EnoviaResourceBundle.getProperty(context,"enoFolderManagement.FilterChildren.DetectRecursion");                    
                } catch(Exception ex) {
                	//Do nothing
                }
                
                String relationshipVaultedObejcts = PropertyUtil.getSchemaProperty(context, "relationship_VaultedDocuments");
            	String folderId = args[0];
            	DomainObject folderObject = new DomainObject(folderId);
                DomainObject contentObject = new DomainObject(args[1]);
                StringList selects = new StringList(2);
                selects.add(SELECT_ID);
                selects.add(SELECT_NAME);
                StringList relSelects = new StringList(2);
                relSelects.add(SELECT_RELATIONSHIP_ID);
                relSelects.add(SELECT_RELATIONSHIP_NAME);
                String totalRels = "";
                StringList primaryRelList = StringUtil.split(primaryRels, ",");
                String sRelWhere = "";
                for (int i = 0; i < primaryRelList.size(); i++) {
                    String relName = (String)primaryRelList.get(i);

                    String relWhere = null;
                    if (relName.contains("|")) {
                        StringList relDetails = StringUtil.split(relName, "|");
                        relName = (String)relDetails.get(0);
                        relWhere = (String)relDetails.get(1);
                    }
                    if (!"".equals(totalRels)) {
                        totalRels +=  "," + relName;
                        if(relWhere != null) {
                            sRelWhere += "|| (name == \"" + relName + "\" && "+ relWhere +")";
                        } else {
                            sRelWhere += " || name == \"" + relName + "\"";
                        }
                    } else {
                        totalRels += relName;
                        if(relWhere != null) {
                            sRelWhere += "(name == \"" + relName + "\" && "+ relWhere +")";
                        } else {
                            sRelWhere += "name == \"" + relName + "\"";
                        }
                    }
                }
                String relWhere = sRelWhere + " || (name == \"" + relationshipVaultedObejcts + "\" && " + SELECT_ATTRIBUTE_DISPLAY_ON_FILTER + "== True)";

                MapList childMapList = contentObject.getRelatedObjects(context,
                		                                               totalRels,
                		                                               "*",
                		                                               selects,
                		                                               null,
                		                                               false,
                		                                               true,
                		                                               (short)0,
                		                                               null,
                		                                               sRelWhere,
                		                                               (int)0,
                		                                               null,
                		                                               null,
                		                                               null);
                MapList contentMapList = folderObject.getRelatedObjects(context,
                		                                                relationshipVaultedObejcts,
                		                                                "*",
                		                                                selects,
                		                                                relSelects,
                		                                                false,
                		                                                true,
                		                                                (short)0,
                		                                                null,
                		                                                null,
                		                                                (int)0,
                		                                                null,
                		                                                null,
                		                                                null);
                Map<String, String> contentMap = new HashMap<String, String>();
                StringList contentIds = new StringList(contentMapList.size());
                Iterator contentItr = contentMapList.iterator();
                while (contentItr.hasNext()) {
                    Map<String,String> m = (Map<String,String>)contentItr.next();
                    String contentId = m.get(SELECT_ID);
                    String relId = m.get(SELECT_RELATIONSHIP_ID);
                    contentMap.put(contentId, relId);
                    contentIds.add(contentId);
                }
                Iterator childItr = childMapList.iterator();
                int baseLevel = 1;
                boolean skipToLevel1 = false;
                Pattern includeRelationship = new Pattern(relationshipVaultedObejcts); 				
				folderId = folderObject.getInfo(context, "id");
                while (childItr.hasNext()) {
                    Map<String, String> childMap = (Map<String, String>) childItr.next();
                    String oid = childMap.get(SELECT_ID);
                    String olevel = (String) childMap.get("level");
                    int objLevel = Integer.parseInt(olevel);
                    if( skipToLevel1 && objLevel != baseLevel) {
                    	continue;
                    }
                    
                    if (contentIds.contains(oid)) {
                    	DomainObject childObject = new DomainObject(oid);                    
                    	MapList childFolderList =  new MapList();
                    	if( "false".equalsIgnoreCase(detectRecursion) ) {
                    		childFolderList = childObject.getRelatedObjects(context,
                    				                                        totalRels + "," + relationshipVaultedObejcts,
                    				                                        "*",
                    				                                        selects,
                    				                                        relSelects,
                    				                                        true,
                    				                                        false,
                    				                                        (short)-1,
                    				                                        null,
                    				                                        relWhere,
                    				                                        0,
                    				                                        null,
                    				                                        null,
                    				                                        null);
                    	} else {
                    		childFolderList = childObject.getRelatedObjects(context,
                    				                                        totalRels + "," + relationshipVaultedObejcts,
                    				                                        "*",
                    				                                        selects,
                    				                                        relSelects,
                    				                                        true,
                    				                                        false,
                    				                                        (short)0,
                    				                                        null,
                    				                                        relWhere,
                    				                                        (short)0,
                    				                                        true,
                    				                                        true,
                    				                                        (short)1000,
                    				                                        null,
                    				                                        includeRelationship,
                    				                                        null,
                    				                                        null);
                    	}
	                    List<String> childParentFolderIds = new StringList(childFolderList.size());
	                    Iterator childFolderItr = childFolderList.iterator();
	                    while (childFolderItr.hasNext()) {
	                    	Map childFolderMap = (Map)childFolderItr.next();
	                    	String childFolderId = (String)childFolderMap.get(SELECT_ID);
	                    	String relName = (String)childFolderMap.get(SELECT_RELATIONSHIP_NAME);
	                    	if (relName.equals(relationshipVaultedObejcts) && !childParentFolderIds.contains(childFolderId)) {
	                    		childParentFolderIds.add(childFolderId);
	                    	}
	                    }
	                    
	                    if (!childParentFolderIds.contains(folderId)) {
                            DomainRelationship.setAttributeValue(context, contentMap.get(oid), ATTRIBUTE_DISPLAY_ON_FILTER, "True");
	                    	skipToLevel1 = true;
                        }
                    }
                }
            }
            ContextUtil.commitTransaction(context);
         } catch(Exception ex) {
             ContextUtil.abortTransaction(context);
             ex.printStackTrace();
             throw ex;
         }
    }
        
    /**
     * Update Folder Path and Folder Classification attributes from Parent folder.
     * 
     * @param context the eMatrix Context object
     * @param args[] of From Object Id as first parameter and To Object Id as second parameter
     * @return void
     * @throws Exception if the operation fails
     * @since TMC V6R2015x
     * @grade 0
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public void updateDisplayOnFilterOnMove(matrix.db.Context context, String[] args) throws Exception {
        try {
            ContextUtil.startTransaction(context, true);
            String contentType = args[4];
            String command = "print type $1 select $2 dump";
            String primaryRels = MqlUtil.mqlCommand(context, command, contentType, "property[Primary Relationships].value");
            if (primaryRels != null && !"".equals(primaryRels) && !"null".equals(primaryRels) ) {
                String ATTRIBUTE_DISPLAY_ON_FILTER = PropertyUtil.getSchemaProperty(context, "attribute_DisplayOnFilter");
                String relationshipVaultedObejcts = PropertyUtil.getSchemaProperty(context, "relationship_VaultedDocuments");
                DomainObject newFolderObject = new DomainObject(args[0]);
                DomainObject oldFolderObject = new DomainObject(args[1]);
                DomainObject contentObject = new DomainObject(args[2]);
                String relId = args[3];
                StringList selects = new StringList(2);
                selects.add(SELECT_ID);
                selects.add(SELECT_NAME);
                StringList relSelects = new StringList(2);
                relSelects.add(SELECT_RELATIONSHIP_ID);
                
                String totalRels = "";
                StringList primaryRelList = StringUtil.split(primaryRels, ",");
                String sRelWhere = "";
                for (int i=0; i<primaryRelList.size(); i++) {
                    String relName = (String)primaryRelList.get(i);
                    String relWhere = null;
                    if ( relName.contains("|")) {
                        StringList relDetails = StringUtil.split(relName, "|");
                        relName = (String)relDetails.get(0);
                        relWhere = (String)relDetails.get(1);
                    }
                    
                    if ( !"".equals(totalRels) ) {
                        totalRels +=  "," + relName;
                        if (relWhere != null) {
                            sRelWhere += "|| (name == \"" + relName + "\" && "+ relWhere +")";
                        } else {
                            sRelWhere += " || name == \"" + relName + "\"";
                        }
                    } else {
                        totalRels += relName;
                        if (relWhere != null) {
                            sRelWhere += "(name == \"" + relName + "\" && "+ relWhere +")";
                        } else {
                            sRelWhere += "name == \"" + relName + "\"";
                        }
                    }
                }
                
                MapList childMapList = contentObject.getRelatedObjects(context,
                		                                               totalRels,
                		                                               "*",
                		                                               selects,
                		                                               null,
                		                                               false,
                		                                               true,
                		                                               (short)0,
                		                                               null,
                		                                               sRelWhere,
                		                                               (int)0,
                		                                               null,
                		                                               null,
                		                                               null);
                StringList childIds = new StringList(childMapList.size());
                Iterator itr = childMapList.iterator();
                while (itr.hasNext()) {
                    Map<String,String> m = (Map<String,String>)itr.next();
                    childIds.add(m.get(SELECT_ID));
                }
                MapList parentMapList = contentObject.getRelatedObjects(context,
                		                                                totalRels,
                		                                                "*",
                		                                                selects,
                		                                                null,
                		                                                true,
                		                                                false,
                		                                                (short)0,
                		                                                null,
                		                                                sRelWhere,
                		                                                (int)0,
                		                                                null,
                		                                                null,
                		                                                null);
                StringList parentIds = new StringList(childMapList.size());
                itr = parentMapList.iterator();
                while (itr.hasNext()) {
                    Map<String,String> m = (Map<String,String>)itr.next();
                    parentIds.add(m.get(SELECT_ID));
                }
                MapList newContentMapList = newFolderObject.getRelatedObjects(context,
                		                                                      relationshipVaultedObejcts,
                		                                                      "*",
                		                                                      selects,
                		                                                      relSelects,
                		                                                      false,
                		                                                      true,
                		                                                      (short)0,
                		                                                      null,
                		                                                      null,
                		                                                      (int)0,
                		                                                      null,
                		                                                      null,
                		                                                      null);
                itr = newContentMapList.iterator();
                while (itr.hasNext()) {
                    Map<String,String> m = (Map<String,String>)itr.next();
                    String contentId = m.get(SELECT_ID);
                    if ( parentIds.contains(contentId)) {
                    	DomainRelationship.setAttributeValue(context, relId, ATTRIBUTE_DISPLAY_ON_FILTER, "False");
                    } else if( childIds.contains(contentId)) {
                    	DomainRelationship.setAttributeValue(context, m.get(SELECT_RELATIONSHIP_ID), ATTRIBUTE_DISPLAY_ON_FILTER, "False");
                    }
                }
                MapList oldContentMapList = oldFolderObject.getRelatedObjects(context,
                		                                                      relationshipVaultedObejcts,
                		                                                      "*",
                		                                                      selects,
                		                                                      relSelects,
                		                                                      false,
                		                                                      true,
                		                                                      (short)0,
                		                                                      null,
                		                                                      null,
                		                                                      (int)0,
                		                                                      null,
                		                                                      null,
                		                                                      null);
                Map<String, String> contentMap = new HashMap<String, String>();
                StringList contentIds = new StringList(oldContentMapList.size());
                itr = oldContentMapList.iterator();
                while (itr.hasNext()) {
                    Map<String,String> m = (Map<String,String>)itr.next();
                    String contentId = m.get(SELECT_ID);
                    String rid = m.get(SELECT_RELATIONSHIP_ID);
                    contentMap.put(contentId, rid);
                    contentIds.add(contentId);
                }
                itr = childMapList.iterator();
                int baseLevel = 1;
                boolean changeRel = true;
                while (itr.hasNext()) {
                    Map<String,String> m = (Map<String,String>)itr.next();
                    String oid = m.get(SELECT_ID);
                    String olevel = (String)m.get("level");
                    int objLevel = Integer.parseInt(olevel);
                    if ( baseLevel == objLevel) {
                        changeRel = true;
                    }
                    
                    if ( contentIds.contains(oid)) {
                        if (changeRel) {
                            changeRel = false;
                            DomainRelationship.setAttributeValue(context, contentMap.get(oid), ATTRIBUTE_DISPLAY_ON_FILTER, "True");
                        }
                    }
                }
            }
            ContextUtil.commitTransaction(context);
         } catch(Exception ex) {
             ContextUtil.abortTransaction(context);
             ex.printStackTrace();
             throw ex;
         }
    }
    
    /**
     * Update Display Filter attribute from folder to content.
     * Update the value of DisplayOnFilter property of a relationship to false
     * 
     * @param context the eMatrix Context object
     * @param args[0]: From Object Id
     * @param args[1]: To Object Id
     * @param args[2]: relationship name
     * @return void
     * @throws Exception if the operation fails
     * @since TMC V6R2015x
     * @grade 0
     */
    public void updateDisplayOnFilterOnPrimaryRelConnection(matrix.db.Context context, String[] args) throws Exception {
    	updateDisplayOnFilter(context, args, "False");
    }
    
    /**
     * Update the value of DisplayOnFilter property of a relationship between folder and Content to true
     * 
     * @param context the eMatrix Context object
     * @param args[0]: From Object Id
     * @param args[1]: To Object Id
     * @param args[2]: relationship name
     * @return void
     * @throws Exception if the operation fails
     * @since TMC V6R2015x
     * @grade 0
     */
    public void updateDisplayOnFilterOnPrimaryRelDisconnect(matrix.db.Context context, String[] args ) throws Exception {
    	updateDisplayOnFilter(context, args, "True");
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private void updateDisplayOnFilter(matrix.db.Context context, String[] args, String value) throws FrameworkException {
    	try {
    		//String jponame = "enoFolderManagementFolderBase";
    		//String methodName = "updateDisplayOnFilterInBackground";
    		String[] JobArgs = {args[0], args[1], args[2], value};
    		String[]oids = {args[0],args[1]};
    		StringList objectSelects = new StringList();
    		String attributeIsVersionObject = PropertyUtil.getSchemaProperty(context, "attribute_IsVersionObject");
    		String IS_VERSION_OBJECT = "attribute["+ attributeIsVersionObject +"]";
    		objectSelects.add(IS_VERSION_OBJECT);
    		MapList mlist = DomainObject.getInfo(context, oids, objectSelects);
    		Iterator itr = mlist.iterator();
    		boolean isVersionObject = false;
    		while(itr.hasNext()) {
    			Map<String, String> m = (Map<String,String>)itr.next();
    			String isVersion = m.get(IS_VERSION_OBJECT);
    			if ( isVersion != null && "true".equalsIgnoreCase(isVersion)) {
    				isVersionObject = true;
    				break;
    			}
    		}
    		
    		if (!isVersionObject) {
    			updateDisplayOnFilterInBackground(context,JobArgs);
    		}
    	} catch (Exception ex) {
    		ex.printStackTrace();
    	}
    }
    
    /**
     * Update Folder Path and Folder Classification attributes from Parent folder.
     * Use this name updateDisplayOnFilter
     * 
     * @author RTR1
     * @param context the eMatrix Context object
     * @param args[0]: From Object Id
     * @param args[1]: To Object Id
     * @param args[2]: Relid
     * @param value: true or false(value to set on Display On Filter setting of a relationship)
     * @return void
     * @throws Exception if the operation fails
     * @since TMC V6R2015x
     * @grade 0
     */
    public void updateDisplayOnFilterInBackground(matrix.db.Context context, String[] args ) throws Exception {
    	try {
            ContextUtil.startTransaction(context, true);
            
            String fromObjId = args[0];
            String toObjId = args[1];
            String primaryRelName = args[2];
            String value = args[3];
            //For Connection
            if ("False".equals(value)) {
                updateDisplayOnFilterOnConnect(context, fromObjId, toObjId, primaryRelName);
            } else {
                updateDisplayOnAttributeOnDisconnect(context, fromObjId, toObjId, primaryRelName);
            }
            ContextUtil.commitTransaction(context);
        } catch(Exception ex) {
            ContextUtil.abortTransaction(context);
            ex.printStackTrace();
            throw ex;
        }
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private void updateDisplayOnAttributeOnDisconnect(Context context, String fromObjId, String toObjId, String primaryRelName) throws Exception, FrameworkException {
        String relationshipVaultedObejcts = PropertyUtil.getSchemaProperty(context, "relationship_VaultedDocuments");
        String attributeDisplayOnFilter = PropertyUtil.getSchemaProperty(context, "attribute_DisplayOnFilter");
        String SELECT_ATTRIBUTE_DISPLAY_ON_FILTER = "attribute["+attributeDisplayOnFilter+"]";
        String selectFolderId = "to["+relationshipVaultedObejcts+"].from.id";
        String selectVaultedObjectId = "to["+relationshipVaultedObejcts+"].id";
        String selectVaultedObjectDisplayFilter = "to["+relationshipVaultedObejcts+"].attribute["+attributeDisplayOnFilter+"]";
        
        StringList selects = new StringList(SELECT_ID);
        selects.add(selectFolderId);
        selects.add(selectVaultedObjectId);
        selects.add(selectVaultedObjectDisplayFilter);
        
        DomainObject.MULTI_VALUE_LIST.add(selectFolderId);
        DomainObject.MULTI_VALUE_LIST.add(selectVaultedObjectId);
        DomainObject.MULTI_VALUE_LIST.add(selectVaultedObjectDisplayFilter);
        
        StringList relSelects = new StringList(SELECT_RELATIONSHIP_ID);
        relSelects.add(SELECT_RELATIONSHIP_NAME);
        String command = "print bus $1 select $2 dump";
        String contentType = MqlUtil.mqlCommand(context, command, fromObjId, "type");
        command = "print type $1 select $2 dump";
        String primaryRels = MqlUtil.mqlCommand(context, command, contentType, "property[Primary Relationships].value");
        if (primaryRels != null && !"".equals(primaryRels) && !"null".equals(primaryRels)) {
            String totalRels = "";
            StringList primaryRelList = StringUtil.split(primaryRels, ",");
            String sRelWhere = "";
            String detectRecursion = "false";
            try {
            	detectRecursion = EnoviaResourceBundle.getProperty(context,"enoFolderManagement.FilterChildren.DetectRecursion");                    
            } catch(Exception ex) {
            	//Do nothing
            }
            
            for (int i = 0; i < primaryRelList.size(); i++) {
                String relName = (String) primaryRelList.get(i);
                String relWhere = null;
                if (relName.contains("|")) {
                    StringList relDetails = StringUtil.split(relName, "|");
                    relName = (String) relDetails.get(0);
                    relWhere = (String) relDetails.get(1);
                }
                
                if (!"".equals(totalRels)) {
                    totalRels += "," + relName;
                    if (relWhere != null) {
                        sRelWhere += "|| (name == \"" + relName + "\" && " + relWhere + ")";
                    } else {
                        sRelWhere += " || name == \"" + relName + "\"";
                    }
                } else {
                    totalRels += relName;
                    if (relWhere != null) {
                        sRelWhere += "(name == \"" + relName + "\" && " + relWhere + ")";
                    } else {
                        sRelWhere += "name == \"" + relName + "\"";
                    }
                }
            }
            String relWhere = sRelWhere + " || (name == \"" + relationshipVaultedObejcts + "\" && " + SELECT_ATTRIBUTE_DISPLAY_ON_FILTER + "== True)";
            // getToIdChildrenFolderIds start
            /*
             * Get all Folder connected to the TO object with relationship id.
             * Get Folder Ids from TO Object using expand to end with Primary Rel and Vaulted Objects
             * With a where clause of Display Filter is set to true. The where is to avoid duplicates and
             * only get folder Id from toplevel parent object. After expand iterate maplist and create folderid list.
             */
            Pattern includeRelationship = new Pattern(relationshipVaultedObejcts);
            DomainObject toObject = new DomainObject(toObjId);
            MapList toObjParentMapList = new MapList();
        	if ( "false".equalsIgnoreCase(detectRecursion) ) {
        		toObjParentMapList = toObject.getRelatedObjects(context,
        				                                        totalRels + "," + relationshipVaultedObejcts,
        				                                        "*",
        				                                        selects,
        				                                        relSelects,
        				                                        true,
        				                                        false,
        				                                        (short)-1,
        				                                        null,
        				                                        relWhere,
        				                                        0,
        				                                        null,
        				                                        null,
        				                                        null);
        	} else {
        		toObjParentMapList = toObject.getRelatedObjects(context,
        				                                        totalRels + "," + relationshipVaultedObejcts,
        				                                        "*",
        				                                        selects,
        				                                        relSelects,
        				                                        true,
        				                                        false,
        				                                        (short)0,
        				                                        null,
        				                                        relWhere,
        				                                        (short)0,
        				                                        true,
        				                                        true,
        				                                        (short)1000,
        				                                        null,
        				                                        includeRelationship,
        				                                        null,
        				                                        null); 
        	}
            List<String> toParentFolderIds = new StringList(toObjParentMapList.size());
            Iterator toObjParentItr = toObjParentMapList.iterator();
            while (toObjParentItr.hasNext()) {
                Map m = (Map)toObjParentItr.next();
                String folderId = (String)m.get(SELECT_ID);
                if (!toParentFolderIds.contains(folderId)) {
                    toParentFolderIds.add(folderId);
                }
            }
            
            Map toObjectInfo = toObject.getInfo(context, selects);
            if (toObjectInfo != null) {
                Object childFoldersObj = toObjectInfo.get(selectFolderId);
                if (childFoldersObj != null) {
                    StringList folders = (childFoldersObj instanceof String) ?
                            new StringList((String)toObjectInfo.get(selectFolderId)) :(StringList) toObjectInfo.get(selectFolderId);
                    StringList relIds = (childFoldersObj instanceof String) ?
                            new StringList((String)toObjectInfo.get(selectVaultedObjectId)) :(StringList) toObjectInfo.get(selectVaultedObjectId);
                    
                    // The size of folders and relIds will be same
                    for (int count=0; count<relIds.size(); count++) {
                        //toIdChildrenMap.put((String)relIds.get(count), (String)folders.get(count)+"|"+(String)displayOnFilterAttrValues.get(count));
                        String folderId = (String)folders.get(count);
                        String relId = (String)relIds.get(count);
                        if ( !toParentFolderIds.contains(folderId) ) {
                            DomainRelationship.setAttributeValue(context, relId, attributeDisplayOnFilter, "True");
                        }
                    }
                }
            }
            
            /*
             * Get Child objects from To object using expand with primary rel in downward.
             * Capture the folder Id and its relid. Making sure we are not getting folderids from multiple levels.
             * Check Folder Id is already exist (either from previous getinfo of to object or toplevel of child objects )then ignore that folder.
             * This is needed as child object connected to same folder doesn't need to be modified as it will have Display filter already false.
             */
            MapList toObjectChildrenMapList = toObject.getRelatedObjects(context,
            		                                                     totalRels,
            		                                                     "*",
            		                                                     selects,
            		                                                     relSelects,
            		                                                     false,
            		                                                     true,
            		                                                     (short) 0,
            		                                                     null,
            		                                                     sRelWhere,
            		                                                     0,
            		                                                     null,
            		                                                     null,
            		                                                     null);
            Iterator toObjChildrenItr = toObjectChildrenMapList.iterator();
            while (toObjChildrenItr.hasNext()) {
                Map childMap = (Map)toObjChildrenItr.next();
                String childId = (String)childMap.get(SELECT_ID);
                DomainObject childObject = new DomainObject(childId);
            	if ( "false".equalsIgnoreCase(detectRecursion) ) {
            		toObjParentMapList = childObject.getRelatedObjects(context,
            				                                           totalRels + "," + relationshipVaultedObejcts,
            				                                           "*",
            				                                           selects,
            				                                           relSelects,
            				                                           true,
            				                                           false,
            				                                           (short)-1,
            				                                           null,
            				                                           relWhere,
            				                                           0,
            				                                           null,
            				                                           null,
            				                                           null);
            	} else {
            		toObjParentMapList = childObject.getRelatedObjects(context,
            				                                           totalRels + "," + relationshipVaultedObejcts,
            				                                           "*",
            				                                           selects,
            				                                           relSelects,
            				                                           true,
            				                                           false,
            				                                           (short)0,
            				                                           null,
            				                                           relWhere,
            				                                           (short)0,
            				                                           true,
            				                                           true,
            				                                           (short)1000,
            				                                           null,
            				                                           includeRelationship,
            				                                           null,
            				                                           null); 
            	}
                toParentFolderIds = new StringList(toObjParentMapList.size());
                toObjParentItr = toObjParentMapList.iterator();
                while (toObjParentItr.hasNext()) {
                    Map m = (Map)toObjParentItr.next();
                    String folderId = (String)m.get(SELECT_ID);
                    if (!toParentFolderIds.contains(folderId)) {
                        toParentFolderIds.add(folderId);
                    }
                }
                
                Object toObjChildObj = childMap.get(selectFolderId);
                if (toObjChildObj != null) {
                    StringList toObjChildfolders = (toObjChildObj instanceof String) ?
                            new StringList((String)childMap.get(selectFolderId)) :(StringList) childMap.get(selectFolderId);
                    StringList toObjChildrelIds = (toObjChildObj instanceof String) ?
                            new StringList((String)childMap.get(selectVaultedObjectId)) :(StringList) childMap.get(selectVaultedObjectId);
                    
                    // The size of folders and relIds will be same
                    for (int count=0; count<toObjChildrelIds.size(); count++) {
                        String folderId = (String)toObjChildfolders.get(count);
                        String relId = (String)toObjChildrelIds.get(count);
                        if( !toParentFolderIds.contains(folderId) ) {
                        	DomainRelationship.setAttributeValue(context, relId, attributeDisplayOnFilter, "True");
                        }
                    }
                }
            }
        }
        DomainObject.MULTI_VALUE_LIST.remove(selectFolderId);
        DomainObject.MULTI_VALUE_LIST.remove(selectVaultedObjectId);
        DomainObject.MULTI_VALUE_LIST.remove(selectVaultedObjectDisplayFilter);
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private void updateDisplayOnFilterOnConnect(Context context, String fromObjId, String toObjId, String primaryRelName) throws Exception, FrameworkException {
    	StringList parentFolderIds = new StringList();
        String relationshipVaultedObejcts = PropertyUtil.getSchemaProperty(context, "relationship_VaultedDocuments");
        String attributeDisplayOnFilter = PropertyUtil.getSchemaProperty(context, "attribute_DisplayOnFilter");
        String SELECT_ATTRIBUTE_DISPLAY_ON_FILTER = "attribute["+attributeDisplayOnFilter+"]";
        String selectVaultedObjectId = "to["+relationshipVaultedObejcts+"].id";
        String selectFolderId = "to["+relationshipVaultedObejcts+"].from.id";
        
        StringList selects = new StringList(SELECT_ID);
        StringList relSelects = new StringList(SELECT_RELATIONSHIP_ID);
        relSelects.add(SELECT_RELATIONSHIP_NAME);
        String command = "print bus $1 select $2 dump";
        String contentType = MqlUtil.mqlCommand(context, command, fromObjId, "type");
        command = "print type $1 select $2 dump";
        String primaryRels = MqlUtil.mqlCommand(context, command, contentType, "property[Primary Relationships].value");
        if (primaryRels != null && !"".equals(primaryRels) && !"null".equals(primaryRels)) {
            String totalRels = "";
            StringList primaryRelList = StringUtil.split(primaryRels, ",");
            String sRelWhere = "";
            String detectRecursion = "false";
            try {
            	detectRecursion = EnoviaResourceBundle.getProperty(context,"enoFolderManagement.FilterChildren.DetectRecursion");                    
            } catch(Exception ex) {
            	//Do nothing
            }
            for (int i = 0; i < primaryRelList.size(); i++) {
                String relName = (String) primaryRelList.get(i);
                String relWhere = null;
                if (relName.contains("|")) {
                    StringList relDetails = StringUtil.split(relName, "|");
                    relName = (String) relDetails.get(0);
                    relWhere = (String) relDetails.get(1);
                }
                
                if (!"".equals(totalRels)) {
                    totalRels += "," + relName;
                    if (relWhere != null) {
                        sRelWhere += "|| (name == \"" + relName + "\" && " + relWhere + ")";
                    } else {
                        sRelWhere += " || name == \"" + relName + "\"";
                    }
                } else {
                    totalRels += relName;
                    if (relWhere != null) {
                        sRelWhere += "(name == \"" + relName + "\" && " + relWhere + ")";
                    } else {
                        sRelWhere += "name == \"" + relName + "\"";
                    }
                }
            }
            
            //For fromObject iterate upwards
            DomainObject fromObject = new DomainObject(fromObjId);
            
            String relWhere = sRelWhere + " || (name == \"" + RELATIONSHIP_VAULTED_DOCUMENTS + "\" && " + SELECT_ATTRIBUTE_DISPLAY_ON_FILTER + "== True)";
            Pattern includeRelationship = new Pattern(relationshipVaultedObejcts);
            MapList fromObjParentMapList = new MapList();
            if ( "false".equalsIgnoreCase(detectRecursion) ) {
            	fromObjParentMapList = fromObject.getRelatedObjects(context,
            			                                            totalRels + "," + relationshipVaultedObejcts,
            			                                            "*",
            			                                            selects,
            			                                            relSelects,
            			                                            true,
            			                                            false,
            			                                            (short)-1,
            			                                            null,
            			                                            relWhere,
            			                                            0,
            			                                            null,
            			                                            null,
            			                                            null);
        	} else {
        		fromObjParentMapList = fromObject.getRelatedObjects(context,
        				                                            totalRels + "," + relationshipVaultedObejcts,
        				                                            "*",
        				                                            selects,
        				                                            relSelects,
        				                                            true,
        				                                            false,
        				                                            (short)0,
        				                                            null,
        				                                            relWhere,
        				                                            (short)0,
        				                                            true,
        				                                            true,
        				                                            (short)1000,
        				                                            null,
        				                                            includeRelationship,
        				                                            null,
        				                                            null); 
        	}
            
            Iterator fromObjParentItr = fromObjParentMapList.iterator();
            while (fromObjParentItr.hasNext()) {
            	Map<String,String> m = (Map<String,String>)fromObjParentItr.next();
                if (relationshipVaultedObejcts.equals(m.get("relationship"))) {
                    parentFolderIds.add(m.get(SELECT_ID));
                }
            }
            
            //For toObject iterate downwards using the primary relationships and find all the objects
            DomainObject.MULTI_VALUE_LIST.add(selectFolderId);
            DomainObject.MULTI_VALUE_LIST.add(selectVaultedObjectId);
            
            DomainObject toObject = new DomainObject(toObjId);
            selects.add(selectFolderId);
            selects.add(selectVaultedObjectId);
            
            // For toObject
            Map toObjectInfo = toObject.getInfo(context, selects);
            
            DomainObject.MULTI_VALUE_LIST.remove(selectFolderId);
            DomainObject.MULTI_VALUE_LIST.remove(selectVaultedObjectId);
            
            Map<String, String> childrenMap = new HashMap<String, String>();
            if (toObjectInfo != null) {
                Object childFoldersObj = toObjectInfo.get(selectFolderId);
                if (childFoldersObj != null) {
                    StringList folders = (childFoldersObj instanceof String) ?
                            new StringList((String)toObjectInfo.get(selectFolderId)) :(StringList) toObjectInfo.get(selectFolderId);
                    StringList relIds = (childFoldersObj instanceof String) ?
                            new StringList((String)toObjectInfo.get(selectVaultedObjectId)) :(StringList) toObjectInfo.get(selectVaultedObjectId);
                    // The size of folders and relIds will be same
                    for (int count=0; count<relIds.size(); count++) {
                        String folderId = (String)folders.get(count);
                        String relId = (String)relIds.get(count);
                        if (!childrenMap.containsKey(folderId)) {
                            childrenMap.put(folderId, relId);
                        }
                    }
                }
            }
            MapList toObjectChildrenMapList = toObject.getRelatedObjects(context,
            		                                                     totalRels,
            		                                                     "*",
            		                                                     selects,
            		                                                     relSelects,
            		                                                     false,
            		                                                     true,
            		                                                     (short) 0,
            		                                                     null,
            		                                                     sRelWhere,
            		                                                     0,
            		                                                     null,
            		                                                     null,
            		                                                     null);
            Iterator toObjChildrenItr = toObjectChildrenMapList.iterator();
            while (toObjChildrenItr.hasNext()) {
                Map childMap = (Map)toObjChildrenItr.next();
                Object childFoldersObj = childMap.get(selectFolderId);
                if (childFoldersObj!= null) {
                    StringList folders = (childFoldersObj instanceof String) ?
                            new StringList((String)childMap.get(selectFolderId)) :(StringList) childMap.get(selectFolderId);
                    StringList relIds = (childFoldersObj instanceof String) ?
                            new StringList((String)childMap.get(selectVaultedObjectId)) :(StringList) childMap.get(selectVaultedObjectId);
                    
                    for (int count=0; count<relIds.size(); count++) {
                        //toIdChildrenMap.put((String)relIds.get(count), (String)folders.get(count)+"|"+(String)displayOnFilterAttrValues.get(count));
                        String folderId = (String)folders.get(count);
                        String relId = (String)relIds.get(count);
                        if (!childrenMap.containsKey(folderId)) {
                            childrenMap.put(folderId, relId);
                        }
                    }
                }
            }
            
            // Iterate through the childrenmapList and Check if the folder is present in FolderIds list
            for (Map.Entry<String, String> entry : childrenMap.entrySet()) {
                String folderId = (String) entry.getKey();
                String relId = (String) entry.getValue();
                if (parentFolderIds.contains(folderId)) {
                    //Change the attr value to false if it is true
                    DomainRelationship.setAttributeValue(context, relId, attributeDisplayOnFilter, "False");
                }
            }
        }
    }
    
    /**
     * Check if parent and child bookmarks have same CS and organization
     * 
     * @param context the eMatrix Context object
     * @param args parent and child bookmark object IDs
     * @throws Exception if operation fails
     * @deprecated since R2022x FD01
     * @see ${CLASS:emxWorkspaceMdlRelationBase}#forceFolderContentOwnershipOnConnect(Context, String[])
     */
    public static void ForceFolderOwnershipOnConnect(Context context, String[] args) throws Exception {
        String parentObjectId = args[0];
        String childObjectId = args[1];
        DomainObject parentObject = new DomainObject(parentObjectId);
        DomainObject childObject = new DomainObject(childObjectId);
        StringList selects = new StringList(3);
        selects.add("project");
        selects.add("organization");
        selects.add("attribute[Folder Classification]");
        Map<?,?> parentMap = parentObject.getInfo(context, selects);
        Map<?,?> childMap = childObject.getInfo(context, selects);
        String strFolderOwnership = EnoviaResourceBundle.getProperty(context,"enoFolderManagement.FolderOwnership");
        String parentCS = (String)parentMap.get("project");
        String childCS = (String)childMap.get("project");
        String parentOrg = (String)parentMap.get("organization");
        String childOrg = (String)childMap.get("organization");
        String folderClassification = (String)parentMap.get("attribute[Folder Classification]");
        if ( parentCS != null && !"".equals(parentCS) ) {
            String parentProject = MqlUtil.mqlCommand(context, "print role $1 select parent dump", parentCS);
            if (!"User Projects".equals(parentProject) && !"Personal".equals(folderClassification)) {
                if (strFolderOwnership.equalsIgnoreCase("Root") && (!parentCS.equals(childCS) || !parentOrg.equals(childOrg))) {
                    throw new FrameworkException(EnoviaResourceBundle.getProperty(context,
                    		                                                      "enoFolderManagementStringResource",
                    		                                                      context.getLocale(),
                    		                                                      "enoFolderManagement.FolderOwnershipRuleError"));
                }
            }
        }
    }
    
    /**
     * Check if parent bookmark and content have same CS and organization
     * 
     * @param context the eMatrix Context object
     * @param args parent and child object IDs
     * @throws Exception if operation fails
     * @deprecated since R2022x FD01
     * @see ${CLASS:emxWorkspaceMdlRelationBase}#forceFolderContentOwnershipOnConnect(Context, String[])
     */
    public static void ForceFolderContentOwnershipOnConnect(Context context, String[] args) throws Exception {
        String parentObjectId = args[0];
        String childObjectId = args[1];
        DomainObject parentObject = new DomainObject(parentObjectId);
        DomainObject childObject = new DomainObject(childObjectId);
        StringList selects = new StringList(3);
        selects.add("project");
        selects.add("organization");
        selects.add("attribute[Folder Classification]");
        Map<?,?> parentMap = parentObject.getInfo(context, selects);
        Map<?,?> childMap = childObject.getInfo(context, selects);
        String strFolderOwnership = EnoviaResourceBundle.getProperty(context,"enoFolderManagement.FolderContentOwnership");
        String parentCS = (String)parentMap.get("project");
        String childCS = (String)childMap.get("project");
        String parentOrg = (String)parentMap.get("organization");
        String childOrg = (String)childMap.get("organization");
        String folderClassification = (String)parentMap.get("attribute[Folder Classification]");
        if ( parentCS != null && !"".equals(parentCS) ) {
            String parentProject = MqlUtil.mqlCommand(context, "print role $1 select parent dump", parentCS);
            if (!"User Projects".equals(parentProject) && !"Personal".equals(folderClassification)) {
                if (strFolderOwnership.equalsIgnoreCase("Folder") && (!parentCS.equals(childCS) || !parentOrg.equals(childOrg))) {
                    String error = EnoviaResourceBundle.getProperty(context,
                    		                                        "enoFolderManagementStringResource",
                    		                                        context.getLocale(),
                    		                                        "enoFolderManagement.FolderContentOwnershipRuleError");
                    throw new FrameworkException(error);
                }
            }
        }
    }
}
