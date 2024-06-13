package com.matrixone.apps.framework.ui;

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import javax.servlet.jsp.PageContext;

import org.apache.commons.lang3.StringUtils;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;

/**
 * indentedtable의 컬럼명을 프로젝트의 설정에 따라 보여주기 위해 Table Master 정보를 mapping하는 부분 추가
 */
@SuppressWarnings({ "rawtypes", "unchecked", "serial" })
public class decUITableIndented extends UITableIndented {
	
	@Override
	public void init(Context context, PageContext var2, HashMap var3, String var4, Vector var5) throws FrameworkException {
		try {
			super.init(context, var2, var3, var4, var5);

			HashMap tempMap = getTableData(var4);
			Map RequestMap = (Map) tempMap.get("RequestMap");
			String table = (String) RequestMap.get("table");
			String objectId = (String) RequestMap.get("objectId");
			
			// type이 Project Space인지 확인
			String tableMasterRevision = "-";
			if ( StringUtils.isNotEmpty(objectId) )
			{
				String type = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, DomainConstants.SELECT_TYPE);
				if ( DomainConstants.TYPE_PROJECT_SPACE.equals(type) )
				{
//					tableMasterRevision = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, DomainConstants.SELECT_NAME);
					
					// table fix
					if ( StringUtils.isEmpty(table) )
					{
						table = (String) RequestMap.get("selectedTable");
					}
					
					// Table Detail 조회
					StringList slSelectParam = new StringList();
					slSelectParam.add("attribute[decGroupHeader]");
					slSelectParam.add(DomainConstants.SELECT_CURRENT);
					
					Map programMap = new HashMap();
					programMap.put("projectId", objectId);
					programMap.put("codeMasterName", table);
//					programMap.put("codeMasterRevision", tableMasterRevision);
					programMap.put("slSelectParam", slSelectParam);
					programMap.put("activeOnly", false);
					programMap.put("expandLevelParam", 1);
					
					MapList tableDetailList = null;
					try {
						tableDetailList = JPO.invoke(context, "decTableMaster", null, "getCodeDetailList", JPO.packArgs(programMap), MapList.class);
						if ( tableDetailList != null && tableDetailList.size() > 0 )
						{
							MapList columns = (MapList) tempMap.get("columns");
							Map columnMap = null;
							String columnName = null;
							Map tableDetailMap = null;
							String tableDetailName = null;
							String tableDetailLabel = null;
							String tableDetailCurrent = null;
							String tableDetailGroupHeader = null;
							Map settings = null;
							String strResourceFile = null;
							
							MapList refineColumnList = new MapList();
							
							boolean useColumn = true;
							
							for (Object columnObj : columns)
							{
								columnMap = (Map) columnObj;
								columnName = (String) columnMap.get(DomainConstants.SELECT_NAME);
								settings = (Map) columnMap.get("settings");
								
								for (Object tableDetailObj : tableDetailList)
								{
									tableDetailMap = (Map) tableDetailObj;
									tableDetailName = (String) tableDetailMap.get("attribute[decCode]");
									
									useColumn = true;
									
									// Table Detail name 정보와 column 
									if ( tableDetailName.equals(columnName) )
									{
										// Table Detail 정보로 label 변경
										tableDetailLabel = (String) tableDetailMap.get(DomainConstants.SELECT_DESCRIPTION);
										strResourceFile = UINavigatorUtil.getStringResourceFileId(context, (String) settings.get("Registered Suite"));
										
										columnMap.put("label", EnoviaResourceBundle.getProperty(context, strResourceFile, context.getLocale(), tableDetailLabel));
										
										// Table Detail 정보로 Show/Hide 설정
										tableDetailCurrent = (String) tableDetailMap.get(DomainConstants.SELECT_CURRENT);
										if ( "Inactive".equals(tableDetailCurrent) )
										{
											useColumn = false;
										}
										
										// Table Detail 정보로 Group Header 변경
										tableDetailGroupHeader = (String) tableDetailMap.get("attribute[decGroupHeader]");
										if ( StringUtils.isNotEmpty(tableDetailGroupHeader) )
										{
											if ( settings.containsKey("Group Header") )
											{
												settings.put("Group Header", tableDetailGroupHeader);
											}
										}
										break;
									}
								}
								
								if ( useColumn )
								{
									refineColumnList.add(columnMap);
								}
							}
							tempMap.put("columns", refineColumnList);
						}
					} catch (MatrixException e) {
						e.printStackTrace();
					}
				}
			}
		} catch (FrameworkException e) {
			e.printStackTrace();
		}
		
	}
	
}