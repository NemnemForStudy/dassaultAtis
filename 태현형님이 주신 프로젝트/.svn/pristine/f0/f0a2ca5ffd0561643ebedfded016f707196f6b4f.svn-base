import java.util.Map;

import matrix.db.Context;
import matrix.db.JPO;

@SuppressWarnings("rawtypes")
public class decDashboardCommon_mxJPO {

	public boolean isDashboard(Context context, String[] args) throws Exception{
		try {
			Map programMap = JPO.unpackArgs(args);
			Map requestMap = (Map) programMap.get("requestMap");
			
	    	if(!requestMap.containsKey("dashboard")) {
	    		return false;
	    	}else {
	    		String dashboard = (String) requestMap.get("dashboard");
	    		return Boolean.valueOf(dashboard);
	    	}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
