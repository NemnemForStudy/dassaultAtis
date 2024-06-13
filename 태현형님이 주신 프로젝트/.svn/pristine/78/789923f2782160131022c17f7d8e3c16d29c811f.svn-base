import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.dassault_systemes.enovia.workspace.modeler.WorkspaceMdlUtil;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.MapList;

import matrix.db.Context;
import matrix.util.StringList;

public class emxWorkspaceMdlSystemUtil_mxJPO extends emxDomainObject_mxJPO {
    
    private final String SELECT_ATTRIBUTE_COUNT = getAttributeSelect(ATTRIBUTE_COUNT);
    
    //to ensure data retrieved from RPE variable only once 
    private int _contentCount =0;
    
    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public emxWorkspaceMdlSystemUtil_mxJPO(Context context, String[] args) throws Exception {
        super(context, args);
    }
    
    /**
     * Update the count attribute of bookmark when removing content from it.
     * 
     * @param context the eMatrix Context object
     * @param args history records of bookmark.
     * @since R2022x FD01
     * The algorithm to update Count is changed in 23x
     */
    public void updateCountOnTransaction(Context context, String[] args) throws Exception {
        String transactionHistory = args[0];
        String[] transactionRecords = transactionHistory.split("\n");
        
        //Cache to be used to keep track of content count
        Map<String, Integer> contentCountCache = new HashMap<>();
        String bookmarkId = null;
        int count =0;
        
        //Load Cache with all the bookmarks (ID) involved in transaction with the number of content added/removed
        for (String record : transactionRecords) {
            if (record.startsWith("id=")) {
                if (bookmarkId!=null && count!=0) {
                    contentCountCache.put(bookmarkId, count);
                    count=0;
                }
                bookmarkId = record.substring("id=".length());
            } else {
                if (record.contains("disconnect Vaulted Objects to")) {
                    count--;
                } else if (record.contains("connect Vaulted Objects to")) {
                    count++;
                }
            }
        }
        if (count!=0) {
            contentCountCache.put(bookmarkId, count);
        }
        
        //The entire computation is only required when content is involved in operation
        if (!contentCountCache.isEmpty()) {
            Set<String> bookmarkIdSet = contentCountCache.keySet();
            String[] objectIds = bookmarkIdSet.toArray(new String[bookmarkIdSet.size()]);
            StringList objectSelects = new StringList(2);
            objectSelects.add(SELECT_ID);
            objectSelects.add(SELECT_ATTRIBUTE_COUNT);
            
            //Single DB call to retrieve existing value of Count attribute for all bookmarks involved in transaction
            MapList bookmarkContentCount = DomainObject.getInfo(context, objectIds, objectSelects);
            
            //A temporary cache is required to retrieve the Number of content objects added/removed to bookmarks [COPY scenario]
            Map<String, Integer> tempCache = new HashMap<>(contentCountCache);
            
            //Update Cache with all the bookmarks in the hierarchy
            for (int i=0;i<bookmarkContentCount.size();i++) {
                Map<?,?> bookmarkMap = (Map<?,?>)bookmarkContentCount.get(i);
                bookmarkId = (String)bookmarkMap.get(SELECT_ID);
                //Update bookmarks in Cache with 'existing count value' + 'number of content objects added/removed in given transaction'
                contentCountCache.put(bookmarkId,  contentCountCache.get(bookmarkId) +
                                                   Integer.parseInt((String)bookmarkMap.get(SELECT_ATTRIBUTE_COUNT)));
                
                DomainObject bookmark = new DomainObject(bookmarkId);
                MapList parentBookmarksList = bookmark.getRelatedObjects(context,
                                                                         RELATIONSHIP_SUB_VAULTS,
                                                                         TYPE_WORKSPACE_VAULT,
                                                                         objectSelects,
                                                                         null,
                                                                         true,
                                                                         false,
                                                                         (short)0,
                                                                         null,
                                                                         null,
                                                                         0, null, null, null);
                String parentBookmarkId =null;
                count = tempCache.get(bookmarkId);
                for (int j=0;j<parentBookmarksList.size();j++) {
                    Map<?,?> parentBookmarkMap = (Map<?,?>)parentBookmarksList.get(j);
                    parentBookmarkId = (String)parentBookmarkMap.get(SELECT_ID);
                    if (contentCountCache.containsKey(parentBookmarkId)) {
                        contentCountCache.put(parentBookmarkId, contentCountCache.get(parentBookmarkId) + count);
                    } else {
                        contentCountCache.put(parentBookmarkId, Integer.parseInt((String)parentBookmarkMap.get(SELECT_ATTRIBUTE_COUNT)) + count);
                    }
                }
            }
            
            //Update Count of all bookmarks from the Cache
            bookmarkIdSet = contentCountCache.keySet();
            DomainObject bookmark = null;
            for (String id : bookmarkIdSet) {
                bookmark = new DomainObject(id);
                count = contentCountCache.get(id);
                bookmark.setAttributeValue(context, ATTRIBUTE_COUNT, String.valueOf(count));
            }
        }
    }
    
    /*
     * The Approach to update Count attribute is changed. Thus this method no longer required.
     * 
     * Updates Count attribute of a bookmark
     * 
     * @param context the eMatrix Context object
     * @param bookmark the bookmark whose Count attribute is to be update
     * @param count the number by which bookmark Count attribute need to be updated.
     * @throws Exception if operation fails.
    private void updateCount(Context context, DomainObject bookmark, int count) throws Exception {
        String SELECT_ATTRIBUTE_COUNT = getAttributeSelect(ATTRIBUTE_COUNT);
        try {
            //Update count attribute of given bookmark
            int updatedCount = Integer.parseInt(bookmark.getInfo(context, SELECT_ATTRIBUTE_COUNT)) + count;
            bookmark.setAttributeValue(context, ATTRIBUTE_COUNT, String.valueOf(updatedCount));
            
            //Now update the count of parent bookmarks
            StringList objectSelects = new StringList(2);
            objectSelects.add(SELECT_ID);
            objectSelects.add(SELECT_ATTRIBUTE_COUNT);
            MapList parentBookmarksList = bookmark.getRelatedObjects(context,
                                                                     RELATIONSHIP_SUB_VAULTS,
                                                                     TYPE_WORKSPACE_VAULT,
                                                                     objectSelects,
                                                                     null,
                                                                     true,
                                                                     false,
                                                                     (short)0,
                                                                     null,
                                                                     null,
                                                                     0, null, null, null);
            Map<?,?> parentBookmarkInfo = null;
            DomainObject parentBookmarkObject = null;
            Iterator<?> iterator = parentBookmarksList.iterator();
            while (iterator.hasNext()) {
                parentBookmarkInfo = (Map<?,?>)iterator.next();
                parentBookmarkObject = new DomainObject((String)parentBookmarkInfo.get(SELECT_ID));
                updatedCount = Integer.parseInt((String)parentBookmarkInfo.get(SELECT_ATTRIBUTE_COUNT)) + count;
                parentBookmarkObject.setAttributeValue(context, ATTRIBUTE_COUNT, Integer.toString(updatedCount));
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    */
    
    /**
     * Publishes message when content is attached to/detached from bookmark
     * 
     * @param context the eMatrix Context object
     * @param args contains history records of objects in current transaction.
     * @since R2023x FD02
     */
    public void sendAttachDetachEventMessage(Context context, String[] args) {
        try {
            String transactionHistory = args[0];
            //System.out.println("BOOKMARK RAISE EVENTS :\n" + transactionHistory);
            String[] transactionRecords = transactionHistory.split("\n");
            
            //Check if connect/disconnect event actually happens
            boolean isEventRequired = false;
            for (String record : transactionRecords) {
                if (record.contains("disconnect Vaulted Objects to") || record.contains("connect Vaulted Objects to")) {
                    isEventRequired = true;
                    break;
                }
            }
            
            if (isEventRequired) {
                MapList bookmarkContent = null;
                String bookmarkId = null;
                DomainObject bookmark = null;
                for (String record : transactionRecords) {
                    if (record.startsWith("id=")) {
                        bookmarkId = record.substring("id=".length());
                        
                        //Get details from this object
                        bookmark = new DomainObject(bookmarkId);
                        //object selectAbles
                        StringList objectSelects = new StringList();
                        objectSelects.add(SELECT_NAME);
                        objectSelects.add(SELECT_TYPE);
                        objectSelects.add(SELECT_PHYSICAL_ID);
                        objectSelects.add("type.property[PublicResourceURI].value");
                        //relationship selectAbles
                        StringList relationshipSelects = new StringList();
                        relationshipSelects.add("from.type");
                        relationshipSelects.add("from.physicalid");
                        //Get all the details in one DB call
                        bookmarkContent = bookmark.getRelatedObjects(context,
                                                                     RELATIONSHIP_VAULTED_OBJECTS,
                                                                     QUERY_WILDCARD,
                                                                     objectSelects,
                                                                     relationshipSelects,
                                                                     false,
                                                                     true,
                                                                     (short) 1,
                                                                     null,
                                                                     null,
                                                                     0,
                                                                     null,
                                                                     null,
                                                                     null);
                        _contentCount = bookmarkContent.size();
                    } else {
                        if (record.contains("disconnect Vaulted Objects to")) {  //detach event occurred
                            WorkspaceMdlUtil.sendEventMessage(context, bookmarkContent, record, "detach", _contentCount);
                        } else if (record.contains("connect Vaulted Objects to")) {  //attach event occurred
                            WorkspaceMdlUtil.sendEventMessage(context, bookmarkContent, record, "attach", _contentCount);
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Error publishing events");
            e.printStackTrace();
        }
    }
}
