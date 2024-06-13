import org.apache.commons.lang3.StringUtils;

import matrix.db.Context;
import matrix.util.StringList;

public class decFilterUtil_mxJPO {

	public String generateFMCSDisciplineWhereExpr(Context context, String projectId, String discipline, String tableAlias) throws Exception{
		try {
			tableAlias = StringUtils.defaultIfEmpty(tableAlias, "");
			
			StringBuffer sbWhere = new StringBuffer();
			decCodeMaster_mxJPO codeJPO = new decCodeMaster_mxJPO();
			
			if ( StringUtils.isNotEmpty(discipline) )
    		{
    			StringList excludeDisciplineList = new StringList( new String[] {"PP","ME","EL","IC"} );
    			
    			if ( "Others".equalsIgnoreCase(discipline) )
    			{
    				sbWhere.append(tableAlias).append("DCPLN_CD NOT IN (");
    				int k = 0;
    				for (String excludeDiscipline : excludeDisciplineList)
    				{
    					if ( k > 0 )
    					{
    						sbWhere.append(",");
    					}
    					sbWhere.append("'").append(codeJPO.getFMCSDiscipline(context, projectId, excludeDiscipline)).append("'");
    					k++;
    				}
    				sbWhere.append(")");
    			}
    			else
    			{
    				sbWhere.append(tableAlias).append("DCPLN_CD = '").append(codeJPO.getFMCSDiscipline(context, projectId, discipline)).append("'");
    			}
    		}
			
			return sbWhere.toString();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
