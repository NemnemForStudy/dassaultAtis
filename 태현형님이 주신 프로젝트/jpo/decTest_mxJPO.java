import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.matrixone.apps.domain.DomainObject;

import matrix.db.Context;
import matrix.util.StringList;

public class decTest_mxJPO {

	public int test(Context context, String[] args) throws Exception{
		try {
			String objectId = args[0];
			if ( StringUtils.isNotEmpty(objectId) )
			{
				DomainObject newObj = DomainObject.newInstance(context, objectId);
				DomainObject templateObj = DomainObject.newInstance(context, "1178.38624.22290.5833");
				
				StringList slSelect = new StringList();
				slSelect.add("attribute[Content Data]");
				slSelect.add("attribute[Content Text]");
				slSelect.add("attribute[Content Type]");
				
				Map templateInfo = templateObj.getInfo(context, slSelect);
				
				Map attrMap = new HashMap();
				attrMap.put("Content Data", (String) templateInfo.get("attribute[Content Data]"));
				attrMap.put("Content Text", (String) templateInfo.get("attribute[Content Text]"));
				attrMap.put("Content Type", (String) templateInfo.get("attribute[Content Type]"));
				
				newObj.setAttributeValues(context, attrMap);
			}
			return 0;
		} catch (Exception e) {
			e.printStackTrace();
			return 1;
		}
	}
}
