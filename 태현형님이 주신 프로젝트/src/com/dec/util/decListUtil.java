package com.dec.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.MapList;

import matrix.util.StringList;


public class decListUtil {

    /**
     * MapList의 Map데이터 중 넘어온 Key값만 뽑아서 StringList로 반환
     *
     * @param list
     * @param key
     * @return
     * @throws Exception
     */
    public static StringList getSelectValueListForMapList(Object list, String key) throws Exception {
        return getSelectValueListForMapList(list, key, true);
    }

    /**
     * MapList의 Map데이터 중 넘어온 Key값만 뽑아서 StringList로 반환
     *
     * @param list
     * @param key
     * @param isDuplicate - 중복값 포함여부
     * @return
     * @throws Exception
     */
    public static StringList getSelectValueListForMapList(Object list, String key, boolean isDuplicate) throws Exception {
        return getSelectValueListForMapList(list, key, isDuplicate, false);
    }

    /**
     * MapList의 Map데이터 중 넘어온 Key값만 뽑아서 StringList로 반환
     *
     * @param list
     * @param key
     * @param isDuplicate   - 중복값 포함여부
     * @param isRemoveEmpty - 공백값 제거여부
     * @return
     * @throws Exception
     */
    public static StringList getSelectValueListForMapList(Object list, String key, boolean isDuplicate, boolean isRemoveEmpty) throws Exception {
        return getSelectValueListForMapList(list, key, isDuplicate, isRemoveEmpty, true);
    }

    /**
     * MapList의 Map데이터 중 넘어온 Key값만 뽑아서 StringList로 반환
     *
     * @param list
     * @param key
     * @param isDuplicate   - 중복값 포함여부
     * @param isRemoveEmpty - 공백값 제거여부
     * @param isSort        - 반환데이터의 Sort
     * @return
     * @throws Exception
     */
    public static StringList getSelectValueListForMapList(Object list, String key, boolean isDuplicate, boolean isRemoveEmpty, boolean isSort) throws Exception {
        StringList resultList = new StringList();
        try {
            if (list != null) {
                ListIterator<Map> listItr = null;
                if (list instanceof MapList)
                    listItr = ((MapList) list).listIterator();
                else if (list instanceof List)
                    listItr = ((List) list).listIterator();

                for (ListIterator<Map> itr = listItr; itr.hasNext(); ) {
                    Map map = itr.next();
                    Object valueObject = map.get(key);

                    if (valueObject instanceof StringList) {
                        StringList valueList = DecStringUtil.getSelectStringList(valueObject);
                        for (String value : valueList) {
                            if ((isRemoveEmpty && value.length() > 0) || !isRemoveEmpty) {
                                if (isDuplicate) {
                                    resultList.addElement(value);
                                } else {
                                    if (!resultList.contains(value)) {
                                        resultList.addElement(value);
                                    }
                                }
                            }
                        }
                    } else {
                        String value = DecStringUtil.NVL((String) map.get(key));
                        if ((isRemoveEmpty && value.length() > 0) || !isRemoveEmpty) {
                            if (isDuplicate) {
                                resultList.addElement(value);
                            } else {
                                if (!resultList.contains(value)) {
                                    resultList.addElement(value);
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (isSort)
            resultList.sort();
        return resultList;
    }

    public static Map<String, String> getSelectKeyValueMapForMapList(Object list, String key, String value) throws Exception {
        Map<String, String> result = new HashMap<String, String>();
        try {
            if (list != null) {
                ListIterator<Map> listItr = null;
                if (list instanceof MapList)
                    listItr = ((MapList) list).listIterator();
                else if (list instanceof List)
                    listItr = ((List) list).listIterator();

                for (ListIterator<Map> itr = listItr; itr.hasNext(); ) {
                    Map map = itr.next();
                    String keyVal = DecStringUtil.NVL((String) map.get(key));
                    String valueVal = DecStringUtil.NVL((String) map.get(value));

                    if (DecStringUtil.isNotEmpty(keyVal)) {
                        result.put(keyVal, valueVal);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static Map<String, String> getSelectKeyValueMapForMapList(Object list, StringList keyList, String keyDelimiter, String value) throws Exception {
        Map<String, String> result = new HashMap<String, String>();
        try {
            if (list != null) {
                ListIterator<Map> listItr = null;
                if (list instanceof MapList)
                    listItr = ((MapList) list).listIterator();
                else if (list instanceof List)
                    listItr = ((List) list).listIterator();

                StringList slKeyValues = null;

                for (ListIterator<Map> itr = listItr; itr.hasNext(); ) {
                    Map map = itr.next();
                    slKeyValues = new StringList(keyList.size());

                    for (int i = 0; i < keyList.size(); i++) {
                        slKeyValues.add(i, DecStringUtil.NVL((String) map.get(keyList.get(i))));
                    }
                    String keyVal = slKeyValues.join(keyDelimiter);
                    String valueVal = DecStringUtil.NVL((String) map.get(value));

                    if (DecStringUtil.isNotEmpty(keyVal)) {
                        result.put(keyVal, valueVal);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static Map<String, Map> getSelectKeyDataMapForMapList(Object list, String key) throws Exception {
        Map<String, Map> result = new HashMap<String, Map>();
        try {
            if (list != null) {
                ListIterator<Map> listItr = null;
                if (list instanceof MapList)
                    listItr = ((MapList) list).listIterator();
                else if (list instanceof List)
                    listItr = ((List) list).listIterator();

                for (ListIterator<Map> itr = listItr; itr.hasNext(); ) {
                    Map map = itr.next();
                    String keyVal = DecStringUtil.NVL((String) map.get(key));

                    if (DecStringUtil.isNotEmpty(keyVal)) {
                        result.put(keyVal, map);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static Map<String, Map> getSelectKeyDataMapForMapList(Object list, StringList keyList, String keyDelimiter, String value) throws Exception {
        Map<String, Map> result = new HashMap<String, Map>();
        try {
            if (list != null) {
                ListIterator<Map> listItr = null;
                if (list instanceof MapList)
                    listItr = ((MapList) list).listIterator();
                else if (list instanceof List)
                    listItr = ((List) list).listIterator();

                StringList slKeyValues = null;
                String keyVal = "";
                for (ListIterator<Map> itr = listItr; itr.hasNext(); ) {
                    Map map = itr.next();
                    slKeyValues = new StringList(keyList.size());

                    for (int i = 0; i < keyList.size(); i++) {
                        slKeyValues.add(i, DecStringUtil.NVL((String) map.get(keyList.get(i))));
                    }
                    keyVal = slKeyValues.join(keyDelimiter);

                    if (DecStringUtil.isNotEmpty(keyVal)) {
                        result.put(keyVal, map);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * Key값의 데이터가 Value와 같은 Map을 Filtering
     *
     * @param baseList
     * @param key
     * @param value
     * @return
     * @throws Exception
     */
    public static Map getEqualsObjectOfMapList(MapList baseList, String key, String value) throws Exception {
        return getEqualsObjectOfMapList(baseList, key, value, false);
    }

    /**
     * Key값의 데이터가 Value와 같은 Map을 Filtering
     *
     * @param baseList
     * @param key
     * @param value
     * @param isRemove - 원본데이터의 삭제 여부
     * @return
     * @throws Exception
     */
    public static Map getEqualsObjectOfMapList(MapList baseList, String key, String value, boolean isRemove) throws Exception {
        MapList equalsList = (MapList) getEqualsObjectsOfMapList(baseList, key, value, isRemove, 1);
        return equalsList.size() == 0 ? new HashMap() : (Map) equalsList.get(0);
    }

    /**
     * Key값의 데이터가 Value와 같은 Map을 Filtering
     *
     * @param baseList
     * @param key
     * @param value
     * @return
     * @throws Exception
     */
    public static MapList getEqualsObjectsOfMapList(MapList baseList, String key, String value) throws Exception {
        return getEqualsObjectsOfMapList(baseList, key, value, false);
    }

    /**
     * Key값의 데이터가 Value와 같은 Map을 Filtering
     *
     * @param baseList
     * @param key
     * @param value
     * @param isRemove - 원본데이터의 삭제 여부
     * @return
     * @throws Exception
     */
    public static MapList getEqualsObjectsOfMapList(MapList baseList, String key, String value, boolean isRemove) throws Exception {
        return getEqualsObjectsOfMapList(baseList, key, value, isRemove, 0);
    }

    /**
     * Key값의 데이터가 Value와 같은 Map을 Filtering
     *
     * @param baseList
     * @param key
     * @param value
     * @param isRemove - 원본데이터의 삭제 여부
     * @param limit    - Filtering 개수
     * @return
     * @throws Exception
     */
    public static MapList getEqualsObjectsOfMapList(MapList baseList, String key, String value, boolean isRemove, int limit) throws Exception {
        MapList equalsList = new MapList();
        try {
            if (baseList == null || DecStringUtil.isEmpty(key))
                return equalsList;

            for (int i = 0; i < baseList.size(); i++) {
                Map baseMap = (Map) baseList.get(i);

                String compareValue = (String) baseMap.get(key);
                if ((compareValue == null && value == null) || (value.equals(compareValue))) {
                    equalsList.add(baseMap);
                    if (isRemove) {
                        baseList.remove(baseMap);
                        i--;
                    }
                    if (limit != 0 && equalsList.size() == limit) {
                        break;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return equalsList;
        }
        return equalsList;
    }

    /**
     * Key값의 데이터가 Value와 같은 Map을 Filtering
     *
     * @param baseList
     * @param key
     * @param value
     * @param isRemove - 원본데이터의 삭제 여부
     * @param limit    - Filtering 개수
     * @return
     * @throws Exception
     */
    public static MapList getEqualsObjectsOfList(List baseList, String key, String value, boolean isRemove, int limit) throws Exception {
        MapList equalsList = new MapList();
        try {
            if (baseList == null || DecStringUtil.isEmpty(key))
                return equalsList;

            for (int i = 0; i < baseList.size(); i++) {
                Map baseMap = (Map) baseList.get(i);

                String compareValue = (String) baseMap.get(key);
                if ((compareValue == null && value == null) || (compareValue.equals(value))) {
                    equalsList.add(baseMap);
                    if (isRemove) {
                        baseList.remove(baseMap);
                        i--;
                    }
                    if (limit != 0 && equalsList.size() == limit) {
                        break;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return equalsList;
        }
        return equalsList;
    }

    /**
     * Key값의 데이터와 Value가 다른 Map을 Filtering
     *
     * @param baseList
     * @param key
     * @param value
     * @param isRemove - 원본데이터의 삭제 여부
     * @param limit    - Filtering 개수
     * @return
     * @throws Exception
     */
    public static MapList getNotEqualsObjectsOfMapList(MapList baseList, String key, String value, boolean isRemove, int limit) throws Exception {
        MapList equalsList = new MapList();
        try {
            if (baseList == null || DecStringUtil.isEmpty(key))
                return equalsList;

            for (int i = 0; i < baseList.size(); i++) {
                Map baseMap = (Map) baseList.get(i);

                String compareValue = DecStringUtil.NVL((String) baseMap.get(key));
                if (!compareValue.equals(value)) {
                    equalsList.add(baseMap);
                    if (isRemove) {
                        baseList.remove(baseMap);
                        i--;
                    }
                    if (limit != 0 && equalsList.size() == limit) {
                        break;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return equalsList;
        }
        return equalsList;
    }

    /**
     * Key값의 데이터와 Value가 포함된 Map을 Filtering
     *
     * @param baseList
     * @param key
     * @param value
     * @param isRemove
     * @param limit
     * @return
     * @throws Exception
     */
    public static MapList getContainsValueObjectsOfMapList(MapList baseList, String key, String value, boolean isRemove, int limit) throws Exception {
        MapList equalsList = new MapList();
        try {
            if (baseList == null || DecStringUtil.isEmpty(key))
                return equalsList;

            for (int i = 0; i < baseList.size(); i++) {
                Map baseMap = (Map) baseList.get(i);

                String compareValue = (String) baseMap.get(key);
                if ((compareValue == null && value == null) || (compareValue.contains(value))) {
                    equalsList.add(baseMap);
                    if (isRemove) {
                        baseList.remove(baseMap);
                        i--;
                    }
                    if (limit != 0 && equalsList.size() == limit) {
                        break;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return equalsList;
        }
        return equalsList;
    }

    /**
     * Key값의 Value가 중복값이 있으면 하나를 제외한 다른 Map을 삭제
     *
     * @param mlList
     * @param sCompareKey
     * @return
     * @throws Exception
     */
    public static MapList removeDuplicateData(MapList mlList, String sCompareKey) throws Exception {
        try {
            if (DecStringUtil.isEmpty(sCompareKey))
                return null;

            StringList slCompareValueList = new StringList();
            int iSize = mlList.size();
            for (int i = 0; i < iSize; i++) {
                Map mData = (Map) mlList.get(i);
                String sCompareValue = (String) mData.get(sCompareKey);
                if (!slCompareValueList.contains(sCompareValue)) {
                    slCompareValueList.add(sCompareValue);
                } else {
                    mlList.remove(i--);
                    iSize--;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return mlList;
    }

    /**
     * 중복데이터 삭제
     *
     * @param slList
     * @return
     * @throws Exception
     */
    public static StringList removeDuplicateData(StringList slList) throws Exception {
        StringList rtnList = new StringList();
        try {
            for (ListIterator<String> itr = slList.listIterator(); itr.hasNext(); ) {
                String value = itr.next();
                if (!rtnList.contains(value))
                    rtnList.add(value);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rtnList;
    }

    /**
     * 중복데이터 삭제
     *
     * @param slList
     * @return
     * @throws Exception
     */
    public static StringList removeEmptyData(StringList slList) throws Exception {
        StringList rtnList = new StringList();
        try {
            for (ListIterator<String> itr = slList.listIterator(); itr.hasNext(); ) {
                String value = itr.next();
                if (DecStringUtil.isNotEmpty(value))
                    rtnList.add(value);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rtnList;
    }

    /**
     * 중복값만 Filtering
     *
     * @param slList
     * @return
     * @throws Exception
     */
    public static StringList getDuplicateData(StringList slList) throws Exception {
        StringList rtnList = new StringList();
        try {
            StringList slTemp = new StringList();
            for (ListIterator<String> itr = slList.listIterator(); itr.hasNext(); ) {
                String value = itr.next();
                if (!slTemp.contains(value))
                    slTemp.add(value);
                else {
                    if (!rtnList.contains(value))
                        rtnList.add(value);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rtnList;
    }

    /**
     * List데이터를 구분자로 문자열 만들어 반환
     *
     * @param slList
     * @param sDelimeter
     * @return
     * @throws Exception
     */
    public static String toString(StringList slList, String sDelimeter) throws Exception {
        String sToString = DomainConstants.EMPTY_STRING;
        if (slList != null) {
            for (ListIterator<String> itr = slList.listIterator(); itr.hasNext(); ) {
                sToString += (sToString.length() > 0 ? sDelimeter : "") + itr.next();
            }
        }
        return sToString;
    }

    public static String toString(List slList, String sDelimeter) throws Exception {
        String sToString = DomainConstants.EMPTY_STRING;
        if (slList != null) {
            for (ListIterator itr = slList.listIterator(); itr.hasNext(); ) {
                sToString += (sToString.length() > 0 ? sDelimeter : "") + itr.next();
            }
        }
        return sToString;
    }

    /**
     * List데이터를 구분자로 문자열 만들어 반환
     *
     * @param slList
     * @param sDelimeter
     * @param iCut       - 문자열을 만들 List 데이터의 index값
     * @return
     * @throws Exception
     */
    public static String toString(StringList slList, String sDelimeter, int iCut) throws Exception {
        String sToString = DomainConstants.EMPTY_STRING;
        if (slList != null) {
            int iIndex = 0;
            String sValue = "";
            for (ListIterator<String> itr = slList.listIterator(); itr.hasNext(); ) {
                iIndex = itr.nextIndex();
                sValue = itr.next();
                if (iCut == 0 || iIndex < iCut) {
                    sToString += (sToString.length() > 0 ? sDelimeter : "") + sValue;
                }
            }
        }
        return sToString;
    }

    /**
     * Map의 데이터를 StringList 변환
     *
     * @param mData
     * @param key
     * @return
     * @throws Exception
     */
    public static StringList getConvertStringListValue(Map mData, String key) throws Exception {
        StringList slValue = new StringList();
        try {
            Object object = mData.get(key);
            if (object != null) {
                if (object instanceof StringList) {
                    slValue = (StringList) object;
                } else {
                    slValue.add((String) object);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return slValue;
    }

    /**
     * Map의 Key를 리스트로 반환
     *
     * @param mMap
     * @return
     * @throws Exception
     */
    public static StringList getMapKeyList(Map mMap) throws Exception {
        StringList slKeyList = new StringList();
        try {
            if (mMap == null)
                return slKeyList;

            for (Iterator<String> keyItr = mMap.keySet().iterator(); keyItr.hasNext(); ) {
                String sKey = keyItr.next();
                if (!slKeyList.contains(sKey)) {
                    slKeyList.add(sKey);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return slKeyList;
    }

    /**
     * Map의 value를 리스트로 반환
     *
     * @param mMap
     * @return
     * @throws Exception
     */
    public static StringList getMapValueList(Map mMap) throws Exception {
        StringList slKeyList = new StringList();
        try {
            if (mMap == null)
                return slKeyList;

            String sKey = "";
            String sValue = "";
            for (Iterator<String> keyItr = mMap.keySet().iterator(); keyItr.hasNext(); ) {
                sKey = keyItr.next();
                sValue = DecStringUtil.NVL((String) mMap.get(sKey));
                if (!slKeyList.contains(sValue)) {
                    slKeyList.add(sValue);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return slKeyList;
    }

    /**
     * 넘어온 size크기에 따라 리스트 크기 조절 (remove)
     *
     * @param list
     * @param size
     */
    public static void setListSizeSetting(List list, int size) {
        try {
            if (size <= list.size()) {
                return;
            }

            for (int i = size; i < list.size(); ) {
                list.remove(i);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * MapList의 전체 행에 valueMap 데이터 추가
     *
     * @param list
     * @param valueMap
     */
    public static void addValues(MapList list, Map valueMap) {
        try {
            if (list != null && valueMap != null && !valueMap.isEmpty()) {
                String sKey = "";
                for (ListIterator<Map> itr = list.listIterator(); itr.hasNext(); ) {
                    Map map = itr.next();
                    for (Iterator<String> kItr = valueMap.keySet().iterator(); kItr.hasNext(); ) {
                        sKey = kItr.next();
                        map.put(sKey, valueMap.get(sKey));
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Maplist에서 key에 해당하는 row의 count 조회
     *
     * @param list
     * @param key
     * @param values
     * @return
     */
    public static Map<String, Integer> getListCount(MapList list, String key, StringList values) {
        Map<String, Integer> result = new HashMap<String, Integer>();

        try {
            if (list != null) {
                ListIterator<Map> listItr = null;
                if (list instanceof MapList)
                    listItr = ((MapList) list).listIterator();
                else if (list instanceof List)
                    listItr = ((List) list).listIterator();

                for (ListIterator<Map> itr = listItr; itr.hasNext(); ) {
                    Map map = itr.next();
                    String keyVal = DecStringUtil.NVL((String) map.get(key));

                    for (String checkVal : values) {
                        if (keyVal.equals(checkVal)) {
                            if (!result.containsKey(checkVal)) {
                                result.put(checkVal, 0);
                            }
                            result.put(checkVal, result.get(checkVal) + 1);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static void setHasChildren(MapList list, String key) {
        try {
            for (ListIterator<Map> itr = list.listIterator(); itr.hasNext(); ) {
                Map map = itr.next();
                map.put("hasChildren", map.get(key));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static MapList getMapListFromValues(StringList keys, StringList... values) {
        MapList result = new MapList();
        for (int i = 0; i < values[0].size(); i++) {
            result.add(new HashMap());
        }

        for (int i = 0; i < result.size(); i++) {
            Map map = (Map) result.get(i);

            for (int j = 0; j < keys.size(); j++) {
                map.put(keys.get(j), values[j].get(i));
            }
        }
        return result;
    }
    
    /**
     * 2개 이상의 동일한 사이즈의 StringList의 element를 delimiter를 이용해 연결하고 동일한 길이의 StringList로 반환한다.
     * @param delimiter
     * @param strListArr
     * @return
     */
    public static StringList mergeList(String delimiter, StringList... strListArr) {
        StringList mergeList = new StringList();
        StringBuffer sbData = new StringBuffer();
        StringList strList = strListArr[0];
        String data = null;
        
        for ( int k = 0; k < strList.size(); k++ )
        {
        	sbData.delete(0, sbData.length());
        	for (int m = 0; m < strListArr.length; m++)
        	{
        		data = strListArr[m].get(k);
        		if ( StringUtils.isNotEmpty(data) )
        		{
        			if ( sbData.length() > 0 )
        			{
        				sbData.append(delimiter);
        			}
        			sbData.append(data);
        		}
        	}
        	mergeList.add(sbData.toString());
        }
        return mergeList;
    }
    
}
