package com.dec.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.framework.ui.UITableCustom;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.StringList;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class decFilterUtil {
	
	public static final String RDB_SYMB_EQUAL = "=";
	public static final String RDB_SYMB_NOT_EQUAL = "<>";
	public static final String RDB_IS_NULL = "IS NULL";
	public static final String RDB_IS_NOT_NULL = "IS NOT NULL";
	public static final String RDB_LIKE = "LIKE";
	public static final String RDB_AND = "AND";
	public static final String RDB_OR = "OR";
	public static final String RDB_SYMB_WILD = "%";
	
	public static void generateWhereExpr(Map programMap, String key, StringBuffer sbWhere, String condition) throws Exception{
    	generateWhereExpr(programMap, key, sbWhere, null, condition, null);
    }
    
    public static void generateWhereExpr(Map programMap, String key, StringBuffer sbWhere, String logicalOperator, String condition, String compareOperator) throws Exception{
    	if ( programMap.containsKey(key) )
    	{
    		String value = (String) programMap.get(key);
    		
    		if ( StringUtils.isNotEmpty(value) )
        	{
	    		generateWhereExpr(sbWhere, logicalOperator, condition, compareOperator, value);
        	}
    	}
    }
    
    public static void generateWhereExpr(StringBuffer sbWhere, String condition, String value) {
    	generateWhereExpr(sbWhere, null, condition, null, value);
	}

	public static void generateWhereExpr(StringBuffer sbWhere, String logicalOperator, String condition, String compareOperator, String value) {
		logicalOperator = StringUtils.isEmpty(logicalOperator) ? DecConstants.SYMB_AND : logicalOperator;
		compareOperator = StringUtils.isEmpty(compareOperator) ? DecConstants.SYMB_EQUAL : compareOperator;
		
		String prefix = "";
		String suffix = "";
		if ( DecConstants.SYMB_MATCH.equals(compareOperator) || DecConstants.SYMB_SMATCH.equals(compareOperator) )
		{
			prefix = DecConstants.SYMB_WILD;
			suffix = DecConstants.SYMB_WILD;
		}
     	
		if ( sbWhere.length() > 0 )
		{
			sbWhere.append(" ").append(logicalOperator).append(" ");
		}
		sbWhere.append(condition).append(" ").append(compareOperator).append(" '").append(prefix).append(value).append(suffix).append("'");
	}
	
	public static void generateWhereExpr4RDB(Map programMap, String key, StringBuffer sbWhere, String condition) throws Exception{
		generateWhereExpr4RDB(programMap, key, sbWhere, null, condition, null);
    }
    
    public static void generateWhereExpr4RDB(Map programMap, String key, StringBuffer sbWhere, String logicalOperator, String condition, String compareOperator) throws Exception{
    	if ( programMap.containsKey(key) )
    	{
    		String value = (String) programMap.get(key);
    		
    		if ( StringUtils.isNotEmpty(value) )
        	{
    			generateWhereExpr4RDB(sbWhere, logicalOperator, condition, compareOperator, value);
        	}
    	}
    }
    
    public static void generateWhereExpr4RDB(StringBuffer sbWhere, String condition, String value) {
    	generateWhereExpr4RDB(sbWhere, null, condition, null, value);
	}

	public static void generateWhereExpr4RDB(StringBuffer sbWhere, String logicalOperator, String condition, String compareOperator, String value) {
		logicalOperator = StringUtils.isEmpty(logicalOperator) ? RDB_AND : logicalOperator;
		compareOperator = StringUtils.isEmpty(compareOperator) ? RDB_SYMB_EQUAL : compareOperator;
		
		String prefix = "";
		String suffix = "";
		if ( RDB_LIKE.equalsIgnoreCase(compareOperator) )
		{
			prefix = RDB_SYMB_WILD;
			suffix = RDB_SYMB_WILD;
		}
     	
		if ( sbWhere.length() > 0 )
		{
			sbWhere.append(" ").append(logicalOperator).append(" ");
		}
		
		switch (compareOperator) {
		case "IS NULL": case "IS NOT NULL":
			sbWhere.append(condition).append(" ").append(compareOperator);
			break;

		default:
			sbWhere.append(condition).append(" ").append(compareOperator).append(" '").append(prefix).append(value).append(suffix).append("'");
			break;
		}
		
	}
	
    
    public static void generateMatchlistWhereExpr(Map programMap, String key, StringBuffer sbWhere, String condition) throws Exception{
    	generateMatchlistWhereExpr(programMap, key, sbWhere, null, condition, null);
    }
    
    public static void generateMatchlistWhereExpr(Map programMap, String key, StringBuffer sbWhere, String logicalOperator, String condition, String valueDelimiter) throws Exception{
    	String value = null;
    	if ( programMap.containsKey(key) )
    	{
    		value = (String) programMap.get(key);
    	}
    	else
    	{
    		Map requestMap = (Map) programMap.get("RequestValuesMap");
    		Object obj = requestMap.get(key);
    		if ( obj instanceof String[] )
    		{
    			String[] arr = (String[]) obj;
    			if ( arr.length == 1)
    			{
    				value = arr[0];
    			}
    			else if ( arr.length > 1)
    			{
    				value = arr[1];
    			}
    		}
    	}
    	
    	if ( StringUtils.isNotEmpty(value) && !"null".equalsIgnoreCase(value) )
		{
    		generateMatchlistWhereExpr(sbWhere, logicalOperator, condition, valueDelimiter, value);
    	}
    }
    
    public static void generateMatchlistWhereExpr(StringBuffer sbWhere, String condition, String value) {
    	generateMatchlistWhereExpr(sbWhere, null, condition, null, value);
    }

	public static void generateMatchlistWhereExpr(StringBuffer sbWhere, String logicalOperator, String condition, String valueDelimiter, String value) {
		logicalOperator = StringUtils.isEmpty(logicalOperator) ? DecConstants.SYMB_AND : logicalOperator;
		valueDelimiter = StringUtils.isEmpty(valueDelimiter) ? DecConstants.SYMB_VERTICAL_BAR : valueDelimiter;
     	
		if ( sbWhere.length() > 0 )
		{
			sbWhere.append(" ").append(logicalOperator).append(" ");
		}
		sbWhere.append(condition).append(" matchlist '").append(value).append("' '").append(valueDelimiter).append("'");
	}
	
	public static Map<String, String> generateOtherWhereExpr(Context context, String[] args) throws Exception{
		return generateOtherWhereExpr(context, args, null);
	}
	
	public static Map<String, String> generateOtherWhereExpr4RDB(Context context, String[] args) throws Exception{
		return generateOtherWhereExpr(context, args, "RDB");
	}

	public static Map<String, String> generateOtherWhereExpr(Context context, String[] args, String mode) throws Exception{
		try {
			Map programMap = JPO.unpackArgs(args);
			String table = (String) programMap.get("table");
			
			MapList columnList = UITableCustom.getColumns(context, table, null);
			Map<String,Map> columnSummary = decListUtil.getSelectKeyDataMapForMapList(columnList, DecConstants.SELECT_NAME);
			
			Iterator<String> iter = programMap.keySet().iterator();
			
			StringBuffer sbBusWhere = new StringBuffer();
			StringBuffer sbRelWhere = new StringBuffer();
			
			String key = null;
			String value = null;
			Map columnMap = null;
			String columnName = null;
			Map settings = null;
			String filterSelectExpr = null;
			StringBuffer sbWhere = null;
			
			while ( iter.hasNext() )
			{
				key = iter.next();
				if ( key.startsWith("kw_") )
				{
					value = (String) programMap.get(key);
					
					columnName = key.substring(3); // kw_ 제거
					columnMap = columnSummary.get(columnName);
					if ( columnMap == null )
					{
						filterSelectExpr = columnName;
						sbWhere = sbBusWhere;
					}
					else
					{
						settings = (Map) columnMap.get("settings");
						
						filterSelectExpr = (String) settings.get("filterSelectExpr");
						sbWhere = sbBusWhere;
						
						if ( StringUtils.isEmpty(filterSelectExpr) )
						{
							filterSelectExpr = (String) columnMap.get("expression_businessobject");
							sbWhere = sbBusWhere;
						}
						
						if ( StringUtils.isEmpty(filterSelectExpr) )
						{
							filterSelectExpr = (String) columnMap.get("expression_relationship");
							sbWhere = sbRelWhere;
						}
						
						if ( StringUtils.isEmpty(filterSelectExpr) )
						{
							filterSelectExpr = (String) settings.get("columnName");
							sbWhere = sbBusWhere;
						}
					}
					
					if ( StringUtils.isNotEmpty(filterSelectExpr) )
					{
						if ( "RDB".equals(mode) )
						{
							generateWhereExpr4RDB(sbWhere, null, filterSelectExpr, RDB_LIKE, value);
						}
						else
						{
							generateWhereExpr(sbWhere, null, filterSelectExpr, DecConstants.SYMB_MATCH, value);
						}
					}
				}
			}
			
			Map whereMap = new HashMap<String, String>();
			whereMap.put("busWhere", sbBusWhere.toString());
			whereMap.put("relWhere", sbRelWhere.toString());
			
			return whereMap;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	public static void append(StringBuffer mainWhereExpr, StringBuffer appendWhereExpr) throws Exception{
		append(mainWhereExpr, DecConstants.SYMB_AND, appendWhereExpr.toString());
	}
	
	public static void append(StringBuffer mainWhereExpr, String appendWhereExpr) throws Exception{
		append(mainWhereExpr, DecConstants.SYMB_AND, appendWhereExpr);
	}
	
	public static void append(StringBuffer mainWhereExpr, String logicalOperator, String appendWhereExpr) throws Exception{
		logicalOperator = mainWhereExpr.length() > 0 ? logicalOperator : "";
		if ( StringUtils.isNotEmpty(appendWhereExpr) )
		{
			mainWhereExpr.append(" ").append(logicalOperator).append(" (").append(appendWhereExpr).append(")");
		}
	}
	
	public static void append4RDB(StringBuffer mainWhereExpr, StringBuffer appendWhereExpr) throws Exception{
		append(mainWhereExpr, RDB_AND, appendWhereExpr.toString());
	}
	
	public static void append4RDB(StringBuffer mainWhereExpr, String appendWhereExpr) throws Exception{
		append(mainWhereExpr, RDB_AND, appendWhereExpr);
	}
	
	public static void generateEmxTableRowIdWhereExpr(Context context, StringBuffer whereExpr, String emxTableRowIdExpr, String logicalOperator, String prefix, String suffix, String tableAlias) throws Exception{
		try {
			StringList emxTableRowIdList = FrameworkUtil.splitString(emxTableRowIdExpr, DecConstants.SYMB_VERTICAL_BAR);
			StringList idNLevel = null;
			String id = null;
			String name = null;
			String level = null;
			
			StringBuffer sbTempExpr = new StringBuffer();
			boolean init = true; 
			String tempLogicalOperator = null;
			for (String emxTableRowId : emxTableRowIdList)
			{
				idNLevel = FrameworkUtil.splitString(emxTableRowId, ",");
				if ( idNLevel != null && idNLevel.size() >= 2 )
				{
					id = idNLevel.get(0);
					name = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", id, DecConstants.SELECT_NAME);
					level = idNLevel.get(1);
					
					if ( !"0".equals(level) )
					{
						if ( init )
						{
							init = false;
							tempLogicalOperator = " ";
						}
						else
						{
							tempLogicalOperator = RDB_OR;
						}
						
						generateWhereExpr4RDB(sbTempExpr, tempLogicalOperator, tableAlias + "PACK_LVL_CD" + level, RDB_SYMB_EQUAL, name);
					}
				}
			}
			
			if ( sbTempExpr.length() > 0 )
			{
				if ( StringUtils.isNotEmpty(logicalOperator) )
				{
					whereExpr.append(logicalOperator).append(" ");
				}
				if ( StringUtils.isNotEmpty(prefix) )
				{
					whereExpr.append(prefix).append(" ");
				}
				
				whereExpr.append(sbTempExpr.toString());
				
				if ( StringUtils.isNotEmpty(suffix) )
				{
					whereExpr.append(suffix).append(" ");
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
}
