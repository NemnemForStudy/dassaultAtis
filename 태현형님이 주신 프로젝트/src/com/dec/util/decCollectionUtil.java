package com.dec.util;

import java.util.HashMap;
import java.util.Map;

import com.matrixone.apps.domain.util.MapList;

import matrix.util.StringList;

@SuppressWarnings({ "unchecked", "rawtypes" })
public class decCollectionUtil {

	public static Map<String,StringList> extractStringList(MapList mapList, String... keys) throws Exception{
		try {
			Map<String,StringList> returnMap = new HashMap();
			StringList slTemp = null;
			for (String key : keys)
			{
				slTemp = new StringList();
				returnMap.put(key, slTemp);
			}
			
			Map map = null;
			for (Object obj : mapList)
			{
				map = (Map) obj;
				
				for (String key : keys)
				{
					slTemp = returnMap.get(key);
//					slTemp.add((String) map.get(key));
					slTemp.add(String.valueOf( map.get(key)));
				}
			}
			
			return returnMap;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
