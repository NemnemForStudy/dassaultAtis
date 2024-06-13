import java.util.Map;

import matrix.db.Context;

public class decSortWeek_mxJPO extends emxCommonBaseComparator_mxJPO{

    public decSortWeek_mxJPO (Context context, String[] args) throws Exception {
    }
	public decSortWeek_mxJPO() {
	}
	public int compare (Object object1,Object object2) {
        Map map1 = (Map)object1;
        Map map2 = (Map)object2;

        Map sortKeys = getSortKeys();

		String keyName = (String) sortKeys.get("name");
        String keyDir  = (String) sortKeys.get("dir");
        
        String stringValue1 = (String) map1.get(keyName);
        String stringValue2 = (String) map2.get(keyName);
        
        stringValue1 = stringValue1.replace("W", "");
        stringValue2 = stringValue2.replace("W", "");
        
        int iValue1 = Integer.valueOf(stringValue1);
        int iValue2 = Integer.valueOf(stringValue2);
        
        if(keyDir.equals("descending")) {
            if(iValue1 > iValue2) {
            	return -1;
            }else if(iValue1 == iValue2) {
            	return 0;
            }else {
            	return 1;
            }
        }else {
            if(iValue1 > iValue2) {
            	return 1;
            }else if(iValue1 == iValue2) {
            	return 0;
            }else {
            	return -1;
            }
        }
        
	}
}
