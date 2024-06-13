/*
**  emxBookmarkBase.java
**
**  Copyright (c) 1992-2020 Dassault Systemes.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of MatrixOne,
**  Inc.  Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program
**
**   static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.8.2.1 Thu Dec  4 07:55:15 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.8 Wed Oct 22 15:49:51 2008 przemek Experimental przemek $
*/
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

import matrix.db.AccessConstants;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.program.PMCWorkspaceVault;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProgramCentralUtil;
import com.matrixone.apps.program.ProjectTemplate;
import com.matrixone.apps.program.URL;
import com.matrixone.apps.common.CommonDocument;


/*****************************************************************************************
*       New JPO for Bookmark Config Table Conversion Task
*******************************************************************************************/

/**
 * The <code>emxBookmarkBase</code> class represents the Bookmark JPO
 * functionality for the Program Central type.
 *
 * @version PMC 10-6 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxBookmarkBase_mxJPO
{
    /**
    * Constructor.
    *
    * @param context the eMatrix <code>Context</code> object
    * @param args holds no arguments
    * @throws Exception if the operation fails
    * @since PMC 10-6
    */
   public emxBookmarkBase_mxJPO(Context context, String[] args)
   {
       // Call the super constructor
       super();
   }

    /**
    * This method is executed if a specific method is not specified.
    *
    * @param context the eMatrix <code>Context</code> object
    * @param args holds no arguments
    * @return int 0 for success and non-zero for failure
    * @throws Exception if the operation fails
    */
   public int mxMain(Context context, String[] args)
     throws Exception
   {
       if (!context.isConnected())
         throw new Exception("not supported on desktop client");
       return 0;
   }

    /**
     * This method return true if user have permissions to create or delete Bookmark objects
     * otherwise return false.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds the following input arguments:
     *    objectId - String containing the object id
     * @return Boolean true or false.
     * @throws Exception If the operation fails.
     * @since PMC 10-6
     */
    public boolean hasAccessToCommand(Context context, String[] args)
      throws Exception
    {
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String objectId = DomainConstants.EMPTY_STRING;
        Map maprmbTableRowId = null;
        if(programMap.containsKey("rmbTableRowId"))
        {
            maprmbTableRowId = ProgramCentralUtil.parseTableRowId(context,(String) programMap.get("rmbTableRowId"));
            objectId = (String) maprmbTableRowId.get("objectId");
        }
        else
            objectId = (String) programMap.get("objectId");

        String parentId = (String) programMap.get("parentOID");
        String isFromRMB =  (String) programMap.get("isRMB");
        String portalCmdName =  (String) programMap.get("portalCmdName");
        boolean editFlag = false;
        boolean isToShowCommand = true;
        final String SELECT_IS_WORKSPACE_VAULT = "type.kindof["+DomainConstants.TYPE_WORKSPACE_VAULT+"]";
        final String SELECT_IS_PROJECT_MGNT = "type.kindof["+DomainConstants.TYPE_PROJECT_MANAGEMENT+"]";
        final String SELECT_IS_QUALITY = "type.kindof["+DomainConstants.TYPE_QUALITY+"]";

        StringList slBookmarkSelect = new StringList();
        slBookmarkSelect.add(SELECT_IS_WORKSPACE_VAULT);
        slBookmarkSelect.add(SELECT_IS_PROJECT_MGNT);
        slBookmarkSelect.add(SELECT_IS_QUALITY);
        slBookmarkSelect.add(DomainConstants.SELECT_CURRENT);
        slBookmarkSelect.add(DomainConstants.SELECT_TYPE);
        slBookmarkSelect.add(ProgramCentralConstants.SELECT_PROJECT_TYPE);//For Bookmark in Task
        slBookmarkSelect.add(ProgramCentralConstants.SELECT_PROJECT_ID);
        slBookmarkSelect.add(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);

        try {
            DomainObject domainObject = DomainObject.newInstance(context);
            domainObject.setId(objectId);
            Map bookmarkInfoMap =  domainObject.getInfo(context, slBookmarkSelect);
            String objType = (String)bookmarkInfoMap.get(DomainConstants.SELECT_TYPE);
            String rootObjType = (String) bookmarkInfoMap.get(ProgramCentralConstants.SELECT_PROJECT_TYPE);
            String rootObjID = (String) bookmarkInfoMap.get(ProgramCentralConstants.SELECT_PROJECT_ID);

            if(DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(objType) || DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(rootObjType)){
                ProjectTemplate projectTemplate = (ProjectTemplate)DomainObject.newInstance(context, DomainConstants.TYPE_PROJECT_TEMPLATE, DomainObject.PROGRAM);
                String projectTemplateId = objectId;

                if(DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(rootObjType)){
                    projectTemplateId = rootObjID;
                }

                boolean isCtxUserOwnerOrCoOwner = projectTemplate.isOwnerOrCoOwner(context, projectTemplateId);
                if(!isCtxUserOwnerOrCoOwner)
                    return false;
            }

            if(ProgramCentralUtil.isNotNullString(parentId)) {
                DomainObject dParentObj = DomainObject.newInstance(context,parentId);
                StringList selectList = new StringList();
                selectList.add(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
                selectList.add(ProgramCentralConstants.SELECT_IS_PROJECT_TEMPLATE);
                selectList.add(ProgramCentralConstants.SELECT_CURRENT);

                Map objectMap = (Map)dParentObj.getInfo(context, selectList);
                String isControlledFold = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_CONTROLLED_FOLDER);
                String isTemplate = (String)objectMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_TEMPLATE);
                String state = (String)objectMap.get(ProgramCentralConstants.SELECT_CURRENT);

                if("True".equalsIgnoreCase(isControlledFold)){
                    String strCurrState = dParentObj.getCurrentState(context).getName();
                    if("Superceded".equalsIgnoreCase(strCurrState)){
                        //isParentSuperceded =true;
                        return false;
                    }
                }
                if("True".equalsIgnoreCase(isTemplate)) {
                    if("Released".equalsIgnoreCase(state) || "Obsolete".equalsIgnoreCase(state)) {
                        return false;
                    }
                }else {//Required from Folder/Sub-Folder summary page.
                    StringList busSelects2 = new StringList();
                    busSelects2.add(DomainConstants.SELECT_ID);
                    busSelects2.add(ProgramCentralConstants.SELECT_IS_PROJECT_TEMPLATE);
                    busSelects2.add(DomainConstants.SELECT_CURRENT);
                    String relPattern = DomainConstants.RELATIONSHIP_PROJECT_VAULTS
                                        +","+ DomainConstants.RELATIONSHIP_SUB_VAULTS
                                        +","+ DomainConstants.RELATIONSHIP_VAULTED_OBJECTS_REV2
                                        +","+ CommonDocument.RELATIONSHIP_ACTIVE_VERSION;
                    String typePattern = DomainConstants.QUERY_WILDCARD;
                    MapList infoMapList = dParentObj.getRelatedObjects(context, relPattern, typePattern,
                                                                    busSelects2, null, true, false, (short)0,
                                                                    DomainConstants.EMPTY_STRING,
                                                                    DomainConstants.EMPTY_STRING, 0);
                    int infoMapListSize = infoMapList.size();
                    if(infoMapListSize>0){
                        Map rootObjMap = (Map) infoMapList.get(infoMapList.size()-1); //Get the root element in the heirarchy.
                        String isRootObjKindOfTemplate = (String) rootObjMap.get(ProgramCentralConstants.SELECT_IS_PROJECT_TEMPLATE);
                        if(Boolean.valueOf(isRootObjKindOfTemplate)) {
                            String templateId = (String) rootObjMap.get(DomainConstants.SELECT_ID);
                            String tempState = (String) rootObjMap.get(DomainConstants.SELECT_CURRENT);
                            ProjectTemplate projectTemplate = (ProjectTemplate)DomainObject.newInstance(context, DomainConstants.TYPE_PROJECT_TEMPLATE, DomainObject.PROGRAM);
                            if(!projectTemplate.isOwnerOrCoOwner(context, templateId)){
                                return false;
                            }
                            if(("Released".equalsIgnoreCase(tempState) || "Obsolete".equalsIgnoreCase(tempState))) {
                                return false;
                    }
                }
            }
        }


        }

            if(null != isFromRMB && "true".equalsIgnoreCase(isFromRMB)){
                String sRmbId = (String)programMap.get("rmbTableRowId");
                if(ProgramCentralUtil.isNotNullString(sRmbId)){
                    StringList slRmbIds = FrameworkUtil.splitString(sRmbId, "|");
                    if(null != slRmbIds && slRmbIds.size() > 1){
                        String sRmbObjectId = (String)slRmbIds.get(1);
                        if(ProgramCentralUtil.isNotNullString(sRmbObjectId)){
                            DomainObject dObj =  DomainObject.newInstance(context);
                            dObj.setId(sRmbObjectId);
                            if(!dObj.isKindOf(context, DomainConstants.TYPE_WORKSPACE_VAULT)){
                                isToShowCommand = false;
                            }
                        }
                    }
                }
                if(!isToShowCommand){
                    return isToShowCommand;
                }
            }

            String strCurrentState = (String)bookmarkInfoMap.get(DomainConstants.SELECT_CURRENT);
            String strIsWorkspaceVault = (String)bookmarkInfoMap.get(SELECT_IS_WORKSPACE_VAULT);
            String strIsProjectManagement = (String)bookmarkInfoMap.get(SELECT_IS_PROJECT_MGNT);
            String strIsQuality = (String)bookmarkInfoMap.get(SELECT_IS_QUALITY);
            String isKindOfTaskMgmt = (String) bookmarkInfoMap.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);

            if("TRUE".equalsIgnoreCase(isKindOfTaskMgmt) && "PMCDeliverableURL".equalsIgnoreCase(portalCmdName)){
                editFlag = true;
                if(ProgramCentralConstants.STATE_PROJECT_TASK_REVIEW.equalsIgnoreCase(strCurrentState) ||
                        ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equalsIgnoreCase(strCurrentState)){
                    editFlag = false;
                }
            }else{
            editFlag = (("true".equalsIgnoreCase(strIsWorkspaceVault) || "true".equalsIgnoreCase(strIsProjectManagement) || "true".equalsIgnoreCase(strIsQuality)) &&
                       (!(DomainConstants.STATE_CONTROLLED_FOLDER_SUPERCEDED.equalsIgnoreCase(strCurrentState)|| DomainConstants.STATE_CONTROLLED_FOLDER_RELEASE.equalsIgnoreCase(strCurrentState)) && (domainObject.checkAccess(context, (short) AccessConstants.cModify))));
        }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            return editFlag;
        }
    }

    /**
    * This method gets the List of Bookmarks for the specific Project.
    *
    * @param context the eMatrix <code>Context</code> object
    * @param args holds the following input arguments:
    *    objectId  -  String containing the object id
    * @return MapList containing ids of Bookmark Objects for the project.
    * @throws Exception if the operation fails
    * @since PMC 10-6
    */
   @com.matrixone.apps.framework.ui.ProgramCallable
   public MapList getBookmarks(Context context, String[] args)
     throws Exception
   {
       DomainObject domainObject = null;
       HashMap programMap = (HashMap) JPO.unpackArgs(args);
       String objectId = (String) programMap.get("objectId");
       MapList bookmarkList = null;
       try
       {
           com.matrixone.apps.program.URL bookmark =
               (com.matrixone.apps.program.URL) DomainObject.newInstance(context,
                    DomainConstants.TYPE_URL, "PROGRAM");
           com.matrixone.apps.program.ProjectSpace projectSpace =
               (com.matrixone.apps.program.ProjectSpace) DomainObject.newInstance(context,
                    DomainConstants.TYPE_PROJECT_SPACE, "PROGRAM");

           // Retrieve the list of bookmarks.
           StringList busSelects = new StringList(1);
           busSelects.add(bookmark.SELECT_ID);

           StringList relSelects = new StringList(1);
           relSelects.add(DomainRelationship.SELECT_ID);

           projectSpace.setId(objectId);
           bookmarkList = bookmark.getURLs(context, projectSpace, busSelects, relSelects, null, null);
       }
       catch (Exception ex)
       {
         throw ex;
       }
       finally
       {
         return bookmarkList;
       }
     }

     /**
     * This method displays the Links for the project also to open a pop up for the link.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args contains a Map with the following entries:
     *    objectId        - String containing the object id
     * @return Vector containing the list of links.
     * @throws Exception if the operation fails
     * @since PMC 10-6
     */
    public Vector getLinks(Context context, String[] args)
         throws Exception
    {
         Vector vecLink = new Vector();
         try
          {
               com.matrixone.apps.program.URL bookmark =
                   (com.matrixone.apps.program.URL) DomainObject.newInstance(context,
                        DomainConstants.TYPE_URL, "PROGRAM");
               com.matrixone.apps.program.ProjectSpace projectSpace =
                   (com.matrixone.apps.program.ProjectSpace) DomainObject.newInstance(context,
                        DomainConstants.TYPE_PROJECT_SPACE, "PROGRAM");
               HashMap programMap = (HashMap) JPO.unpackArgs(args);
               MapList objectList = (MapList)programMap.get("objectList");
               boolean isPrinterFriendly = false;
               Map paramList = (Map)programMap.get("paramList");
               String PrinterFriendly = (String)paramList.get("reportFormat");
               if ( PrinterFriendly != null ) {
                   isPrinterFriendly = true;
               }

               Map objectMap = null;
               Iterator objectListIterator = objectList.iterator();
               String[] objIdArr = new String[objectList.size()];
               int arrayCount = 0;
               while (objectListIterator.hasNext())
               {
                   objectMap = (Map) objectListIterator.next();
                   objIdArr[arrayCount] = (String) objectMap.get(bookmark.SELECT_ID);
                   arrayCount++;
               }

               MapList actionList = DomainObject.getInfo(context, objIdArr,
                 new StringList(bookmark.SELECT_LINK_URL));

               Iterator actionsListIterator = actionList.iterator();
               while(actionsListIterator.hasNext())
               {
                   String displayLink = "";
                   objectMap = (Map) actionsListIterator.next();
                   String website = (String)objectMap.get(bookmark.SELECT_LINK_URL);
                   String tipWebsite = (String)objectMap.get(bookmark.SELECT_LINK_URL);


                   if (website.indexOf("://")==-1)
                   {
                       website = "http://" + website;
                   }
                 //Added for special character.
                   website  =   XSSUtil.encodeForXML(context, website);
                   if(!isPrinterFriendly)
                   {
                       try
                       {
                           website = URL.parseBookMarkHref(website);
                       }catch(Exception e)
                       { }// rich text editor inputs while bookmark creation may affect the parsing so added try-catch for parsing url
                       StringBuffer strBookmarkActionBuffer = new StringBuffer();
                       // strBookmarkActionBuffer.append(URL.getBookmarkAnchor(context, website));
                       strBookmarkActionBuffer.append(URL.getBookmarkAnchor(website));
                       strBookmarkActionBuffer.append(website);
                       // strBookmarkActionBuffer.append("</a>");
                       strBookmarkActionBuffer.append("</a>&#160;");
                       displayLink = strBookmarkActionBuffer.toString();
                   } else {
                      displayLink = website;
                   }
                   vecLink.add(displayLink);
               }
         }
         catch (Exception ex)
         {
             throw ex;
         }
         finally
         {
             return vecLink;
         }
     }

      /**
       * This method will be called from Program create form for
       * connecting the created program object with the company object
       *
       * @param context the eMatrix <code>Context</code> object
       * @param args holds the following input arguments:
       *        0 - MapList containing the object Maps
       *        1 - MapList containing the parameters
       * @return boolean
       * @throws MatrixException if the operation fails
       * @since PMC X+2
       */
      @com.matrixone.apps.framework.ui.PostProcessCallable
      public boolean connectBookmark (Context context, String[] args) throws MatrixException
    {
          try
          {
              Map map = (Map)JPO.unpackArgs(args);
              Map paramMap = (Map)map.get("paramMap");
              Map requestMap = (Map)map.get("requestMap");
              String objectId = (String) requestMap.get("objectId");
                  //String parentId = (String) requestMap.get("parentOID");
                  String bookmarkURLId = (String) paramMap.get("objectId");
                  String sBookmarkName = (String)requestMap.get("Name");
                  String sLinkURL = (String) requestMap.get("Link");
                  if(sLinkURL.indexOf(" ")>-1) {
                      URL objURL = new URL(bookmarkURLId);
                      sLinkURL = sLinkURL.replace(" ","");
                      objURL.updateBookmarkLinkUrl(context, bookmarkURLId, sLinkURL);
                  }

              if(ProgramCentralUtil.isNotNullString(objectId)&&ProgramCentralUtil.isNotNullString(bookmarkURLId) ){
                 URL urlBookmark = new URL();
                      urlBookmark.connectBookmark(context, bookmarkURLId, objectId, sBookmarkName);
                      return true;
            }
}
          catch(Exception e)
            {
              throw new MatrixException(e);
            }
         return true;
     }

      @com.matrixone.apps.framework.ui.PostProcessCallable
      public void connectBookmarkAsTaskDeliverable (Context context, String[] args) throws MatrixException
    {
          try
          {
              Map map = (Map)JPO.unpackArgs(args);
              Map paramMap = (Map)map.get("paramMap");
              Map requestMap = (Map)map.get("requestMap");
              String parentTaskId = (String) requestMap.get("objectId");
              String parentId = (String) requestMap.get("parentOID");
              String bookmarkId = (String) paramMap.get("objectId");
              String relationship = ProgramCentralConstants.RELATIONSHIP_TASK_DELIVERABLE;
              //String sBookmarkName = (String)requestMap.get("Name");
              StringList selectables = new StringList(1);
              selectables.add(ProgramCentralConstants.SELECT_NAME);

              DomainObject domainObject = DomainObject.newInstance(context);
              domainObject.setId(bookmarkId);
              Map<String,String> bookmarkInfo = domainObject.getInfo(context, selectables);
              String bookmarkName = bookmarkInfo.get(ProgramCentralConstants.SELECT_NAME);
             String sCommandStatement = "modify bus $1 name $2 revision $3";

              MqlUtil.mqlCommand(context, sCommandStatement,bookmarkId,bookmarkName, domainObject.getUniqueName(""));

              if(ProgramCentralUtil.isNotNullString(bookmarkId) && ProgramCentralUtil.isNotNullString(parentTaskId)){
                  URL urlBookmark = new URL(bookmarkId);
                  urlBookmark.connectBookmark(context,parentId, relationship);
              }

            }
          catch(Exception e)
            {
              throw new MatrixException(e);
            }

     }

      @com.matrixone.apps.framework.ui.PostProcessCallable
      public void connectBookmarkAsTaskReferenceDocument (Context context, String[] args) throws MatrixException
    {
          try
          {
              Map map = (Map)JPO.unpackArgs(args);
              Map paramMap = (Map)map.get("paramMap");
              Map requestMap = (Map)map.get("requestMap");
              String parentTaskId = (String) requestMap.get("objectId");
              String parentId = (String) requestMap.get("parentOID");
              String bookmarkId = (String) paramMap.get("objectId");
              String relationship = ProgramCentralConstants.RELATIONSHIP_REFERENCE_DOCUMENT;
              StringList selectables = new StringList(1);
              selectables.add(ProgramCentralConstants.SELECT_NAME);

              DomainObject domainObject = DomainObject.newInstance(context);
              domainObject.setId(bookmarkId);
              Map<String,String> bookmarkInfo = domainObject.getInfo(context, selectables);
              String bookmarkName = bookmarkInfo.get(ProgramCentralConstants.SELECT_NAME);
             String sCommandStatement = "modify bus $1 name $2 revision $3";

              MqlUtil.mqlCommand(context, sCommandStatement,bookmarkId,bookmarkName, domainObject.getUniqueName(""));

              if(ProgramCentralUtil.isNotNullString(bookmarkId) && ProgramCentralUtil.isNotNullString(parentTaskId)){
                  URL urlBookmark = new URL(bookmarkId);
                  urlBookmark.connectBookmark(context,parentId, relationship);
              }

            }
          catch(Exception e)
            {
              throw new MatrixException(e);
            }

     }

    /**
     * This method return true if user have permissions to delete Bookmark objects
     * otherwise return false.
     *
     * @param context the eMatrix <code>Context</code> object.
     * @param args holds the following input arguments:
     *    objectId - String containing the object id
     * @return Boolean true or false.
     * @throws Exception If the operation fails.
     * @since 2012
     */
    public boolean hasAccessToCommandDeleteBookmark(Context context, String[] args) throws Exception{

        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String objectId = (String) programMap.get("objectId");
        String portalCmdName =  (String) programMap.get("portalCmdName");
        boolean editFlag = false;

        try {
            if(programMap.containsKey("rmbTableRowId")){
                String strId = DomainConstants.EMPTY_STRING;
                String strRmbTableRowId = (String) programMap.get("rmbTableRowId");
                StringList slTableRowId = FrameworkUtil.split(strRmbTableRowId, "|");
                if(strRmbTableRowId.charAt(0)=='|'){
                    strId = (String)slTableRowId.get(0);
                } else {
                    strId = (String)slTableRowId.get(1);
                }

                DomainObject domObj = DomainObject.newInstance(context,strId);
                if(domObj.isKindOf(context, DomainConstants.TYPE_WORKSPACE_VAULT)){
                    return false;
                }
                if(domObj.isKindOf(context, DomainConstants.TYPE_DOCUMENT)){
                    return false;
                }
                if(domObj.isKindOf(context, DomainConstants.TYPE_PROJECT_MANAGEMENT)){
                    return false;
                }
                if( domObj.isKindOf(context, ProgramCentralConstants.TYPE_REQUIREMENT) || domObj.isKindOf(context, ProgramCentralConstants.TYPE_REQUIREMENT_GROUP)){
                    return false;
                }

            }
            StringList selects = new StringList();
            selects.add(DomainConstants.SELECT_CURRENT);
            selects.add(DomainConstants.SELECT_TYPE);
            selects.add(ProgramCentralConstants.SELECT_PROJECT_TYPE);//For Bookmark in Task
            selects.add(ProgramCentralConstants.SELECT_PROJECT_ID);
            selects.add(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);

            DomainObject domainObject = DomainObject.newInstance(context);
            domainObject.setId(objectId);
            Map infoMap = domainObject.getInfo(context, selects);

            String strCurrentState = (String) infoMap.get(DomainConstants.SELECT_CURRENT);
            String objType = (String) infoMap.get(DomainConstants.SELECT_TYPE);
            String rootObjType = (String) infoMap.get(ProgramCentralConstants.SELECT_PROJECT_TYPE);
            String rootObjId = (String) infoMap.get(ProgramCentralConstants.SELECT_PROJECT_ID);

            String isKindOfTaskMgmt = (String) infoMap.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
            if(DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(objType) || DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(rootObjType)){
                ProjectTemplate projectTemplate = (ProjectTemplate)DomainObject.newInstance(context, DomainConstants.TYPE_PROJECT_TEMPLATE, DomainObject.PROGRAM);
                String projectTemplateId = objectId;

                if(DomainConstants.TYPE_PROJECT_TEMPLATE.equalsIgnoreCase(rootObjType)){
                    projectTemplateId = rootObjId;
                }

                boolean isCtxUserOwnerOrCoOwner = projectTemplate.isOwnerOrCoOwner(context, projectTemplateId);
                if(!isCtxUserOwnerOrCoOwner)
                    return false;
            }

            if("TRUE".equalsIgnoreCase(isKindOfTaskMgmt) && "PMCDeliverableURL".equalsIgnoreCase(portalCmdName)){
                editFlag = true;
                if(ProgramCentralConstants.STATE_PROJECT_TASK_REVIEW.equalsIgnoreCase(strCurrentState) ||
                        ProgramCentralConstants.STATE_PROJECT_TASK_COMPLETE.equalsIgnoreCase(strCurrentState)){
                    editFlag = false;
                }
            }else{
            editFlag =((domainObject.checkAccess(context, (short) AccessConstants.cModify)) &&
                    (!strCurrentState.equals(DomainConstants.STATE_CONTROLLED_FOLDER_SUPERCEDED)));
        }
        }
        catch (Exception ex){
            throw ex;
        }finally{
            return editFlag;
        }
    }

     /**
      * Checks if the folder bookmark action menu should be visible or not for selected folder view.
      * @param context   the eMatrix <code>Context</code> object
      * @param args : argument map
      * @return boolean true if has access to command
      * @throws MatrixException
      */
    public boolean hasAccessToBookmarkActionMenuInFolderView(Context context, String[] args) throws MatrixException
    {
        boolean accessFlag = true;
        try
        {
            Map programMap = (Map) JPO.unpackArgs(args);
            accessFlag = PMCWorkspaceVault.isFolderRoleOrMemberAccessView(context,programMap);
        }
        catch(Exception e)
        {
            throw new MatrixException(e);
        }

        return accessFlag;
    }

    /**
      * Checks if the Document subscription command should be visible or not for selected folder view.
      * @param context   the eMatrix <code>Context</code> object
      * @param args : argument map
      * @return boolean true if has access to command
      * @throws MatrixException
      */
    public boolean hasAccessToDocumentSubscriptionInFolderView(Context context, String[] args) throws MatrixException
    {
        boolean accessFlag = true;
        try
        {
            Map programMap = (Map) JPO.unpackArgs(args);
            accessFlag = PMCWorkspaceVault.isFolderRoleOrMemberAccessView(context,programMap);
        }
        catch(Exception e)
        {
            throw new MatrixException(e);
        }

        return accessFlag;
    }

    /**
      * Checks if the Document Push Subscription command should be visible or not for selected folder view.
      * @param context   the eMatrix <code>Context</code> object
      * @param args : argument map
      * @return boolean true if has access to command
      * @throws MatrixException
      */
    public boolean hasAccessToDocumentPushSubscriptionInFolderView(Context context, String[] args) throws MatrixException
    {
        boolean accessFlag = true;
        boolean accessOnSubscription = true;
        boolean hasAccess = true;
        try
        {
            Map programMap = (Map) JPO.unpackArgs(args);
            accessFlag = PMCWorkspaceVault.isFolderRoleOrMemberAccessView(context,programMap);
            // To check whether logged in user has Project Lead or Project Administrator role or Project Access as Project Lead
            emxProjectFolder_mxJPO projectFolder = new emxProjectFolder_mxJPO(context, args);
            accessOnSubscription = projectFolder.hasAccessOnPushSubscription(context, args);  // true if role and access is Project Lead or role is Project Administrator
            if(!(accessFlag && accessOnSubscription))
                hasAccess = false;
        }
        catch(Exception e)
        {
            throw new MatrixException(e);
        }

        return hasAccess;
    }

    /**
     * Render the bookamrk link field in the bookmark form.
     * @param context   the eMatrix <code>Context</code> object
     * @param String [] : bookmark object id and link url.
     * @return String rendered url link for the form field.
     * @throws MatrixException
     */
    public String getBookmarkUrl(Context context, String args[]) throws MatrixException
    {
        StringBuffer strBookmarkActionBuffer = new StringBuffer();
        try
        {
            Map programMap = (Map) JPO.unpackArgs(args);
            Map requestMap = (Map) programMap.get("requestMap");
            String sMode = (String)requestMap.get("mode");
            String sObjectId = (String)requestMap.get("objectId");
            DomainObject dObj = DomainObject.newInstance(context);
            dObj.setId(sObjectId);
            StringList slBookmarkSelectList = new StringList();
            slBookmarkSelectList.add(ProgramCentralConstants.SELECT_ATTRIBUTE_LINK_URL);

            Map mBookmarkInfo =  dObj.getInfo(context, slBookmarkSelectList);
            if(null != mBookmarkInfo)
            {
                String sLinkUrl = (String)mBookmarkInfo.get(ProgramCentralConstants.SELECT_ATTRIBUTE_LINK_URL);

                //String enableRichTextEditor = FrameworkProperties.getProperty(context,"emxFramework.Enable.RichTextEditor");
                //if("true".equalsIgnoreCase(enableRichTextEditor) || !"edit".equalsIgnoreCase(sMode))
                if(!"edit".equalsIgnoreCase(sMode))
                {
                    if (sLinkUrl.indexOf("://")==-1)
                        {
                            sLinkUrl = "http://"+sLinkUrl;
                        }
                    try
                    {
                        //Added for special character.
                        sLinkUrl    =   XSSUtil.encodeForHTML(context, sLinkUrl);
                        sLinkUrl =  URL.parseBookMarkHref(sLinkUrl);
                    }catch(Exception e)
                    { } // rich text editor inputs while bookmark creation may affect the parsing so added try-catch for parsing url


                    strBookmarkActionBuffer.append(URL.getBookmarkAnchor(sLinkUrl));
                    strBookmarkActionBuffer.append(sLinkUrl);
                    strBookmarkActionBuffer.append("</a>&#160;");
                }
                else
                {
                    strBookmarkActionBuffer.append(sLinkUrl);
                }

            }
        }catch(Exception e)
        {
            throw new MatrixException(e);
        }

        return strBookmarkActionBuffer.toString();
    }

    /**
     * update the bookmark link Url for the bookmark form based on if rich text editor is enabled or not.
     * @param context   the eMatrix <code>Context</code> object
     * @param String [] : updated field value.
     * @return void
     * @throws MatrixException
     */
    public void updateBookmarkLinkUrl(Context context,String args[]) throws MatrixException
    {
        try
        {
            Map programMap = (Map) JPO.unpackArgs(args);
            Map paramMap = (Map)programMap.get("paramMap");
            String objectId = (String) paramMap.get("objectId");
            String sNwLinkUrl = (String)paramMap.get("New Value");

            URL ulrBookmark = new URL();
            ulrBookmark.updateBookmarkLinkUrl(context, objectId, sNwLinkUrl);
        }
        catch(Exception e)
        {
            throw new MatrixException(e);
        }
    }
}
