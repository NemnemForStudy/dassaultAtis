import java.util.Iterator;
import java.util.Map;

import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PersonUtil;

import matrix.db.Context;
import matrix.util.StringList;

public class emxWorkspaceVaultMdlBase_mxJPO extends emxDomainObject_mxJPO {
    
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public emxWorkspaceVaultMdlBase_mxJPO(Context context, String[] args) throws Exception {
		super(context, args);
	}
	
	/**
	 * Changes ownership on bookmark
	 * 
	 * @param context context the eMatrix Context object
	 * @param args holds bookmark id and ownership details
	 * @return 0 if action is completed successfully
	 * @throws Exception 
	 * @since R2022x GA
	 */
    public int changeOwnerAction(Context context, String[] args) throws Exception {
		try {
			String bookmarkObjectId = args[0];
			String kindOfOwner = args[1];
			String newOwner = args[2];

			// check if old owner is the same as the new owner, nothing to do
			// issue caused by Move where only changing CS also changes owner to same owner and context user does not have changesov after CS is changed - so change CS is blocked
			String oldOwner =  args[3];
			if (oldOwner!=null && oldOwner.equals(newOwner))
				return 0;

			if ("owner".equals(kindOfOwner)) {
				StringList accessNames = DomainAccess.getLogicalNames(context, bookmarkObjectId);
				String defaultAccess = accessNames.get(accessNames.size() - 1);
				DomainAccess.createObjectOwnership(context,
						                           bookmarkObjectId,
						                           PersonUtil.getPersonObjectID(context, newOwner),
						                           defaultAccess,
						                           DomainAccess.COMMENT_MULTIPLE_OWNERSHIP);
			}
			return 0;
		} catch (Exception e) {
			return 1;
		}
	}
    
    /**
     * Update Count of Parent when bookmarks are added/deleted.
     *
     * @param context the eMatrix Context object
     * @param args holds id of subBookmark object and event 
     * @return void
     * @throws Exception if the operation fails
     * @since R2022x GA
     * @grade 0
     */
    public void updateCount(Context context, String[] args) throws Exception {
        DomainObject subBookmark = new DomainObject(args[0]);
        String event = args[1];
        String SELECT_ATTRIBUTE_COUNT = getAttributeSelect(ATTRIBUTE_COUNT);
        
        try {
            ContextUtil.startTransaction(context, true);
            int toCountInt = 0;
            int fromCountInt = 0;
            try {
                toCountInt = Integer.parseInt(subBookmark.getInfo(context, SELECT_ATTRIBUTE_COUNT));
                fromCountInt = Integer.parseInt(getInfo(context, SELECT_ATTRIBUTE_COUNT));
            } catch(Exception ex) {
                
            }
            
            if ("CREATE".equalsIgnoreCase(event))
                setAttributeValue(context, ATTRIBUTE_COUNT, Integer.toString(fromCountInt + toCountInt));
            else
                setAttributeValue(context, ATTRIBUTE_COUNT, Integer.toString(fromCountInt - toCountInt));
            
            StringList objectSelects = new StringList(2);
            objectSelects.add(SELECT_ID);
            objectSelects.add(SELECT_ATTRIBUTE_COUNT);
            
            MapList parentBookmarksList = getRelatedObjects(context,
                                                            RELATIONSHIP_SUB_VAULTS,
                                                            TYPE_WORKSPACE_VAULT,
                                                            objectSelects,
                                                            null,
                                                            true,
                                                            false,
                                                            (short)0,
                                                            null,
                                                            null,
                                                            0);
            Iterator<?> iterator = parentBookmarksList.iterator();
            while (iterator.hasNext()) {
                Map<?,?> parentBookmark = (Map<?,?>)iterator.next();
                String parentBookmarkId = (String)parentBookmark.get(SELECT_ID);
                DomainObject parentBookmarkObject = new DomainObject(parentBookmarkId);
                int parentCount = 0;
                try {
                    parentCount = Integer.parseInt((String)parentBookmark.get(SELECT_ATTRIBUTE_COUNT));
                } catch(Exception ex) {
                }
                
                if ("CREATE".equalsIgnoreCase(event))
                    parentBookmarkObject.setAttributeValue(context, ATTRIBUTE_COUNT, Integer.toString(parentCount + toCountInt));
                else
                    parentBookmarkObject.setAttributeValue(context, ATTRIBUTE_COUNT, Integer.toString(parentCount - toCountInt));
            }
            ContextUtil.commitTransaction(context);
        } catch(Exception ex) {
            ContextUtil.abortTransaction(context);
            ex.printStackTrace();
            throw ex;
        }
    }
    
    /**
     * Update the count attribute of bookmark when removing content from it.
     * 
     * @param context the eMatrix Context object
     * @param args history records of bookmark.
     * @since R2022x FD01
     */
    public void updateCountOnTransaction(Context context, String[] args) throws Exception {
        String transactionHistory = args[0];
        String[] transactionRecords = transactionHistory.split("\n");
        DomainObject bookmark = null;
        int count =0;
        for (String record : transactionRecords) {
            if (record.startsWith("id=")) {
                if (bookmark!=null) {
                    updateCount(context, bookmark, count);
                    count =0;
                }
                bookmark = new DomainObject(record.substring("id=".length()));
            } else {
                if (record.contains("disconnect Vaulted Objects to")) {
                    count--;
                } else if (record.contains("connect Vaulted Objects to")) {
                    count++;
                }
            }
        }
        updateCount(context, bookmark, count);
    }
    
    /**
     * Updates Count attribute of a bookmark
     * 
     * @param context the eMatrix Context object
     * @param bookmark the bookmark whose Count attribute is to be update
     * @param count the number by which bookmark Count attribute need to be updated.
     * @throws Exception if operation fails.
     */
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
}
