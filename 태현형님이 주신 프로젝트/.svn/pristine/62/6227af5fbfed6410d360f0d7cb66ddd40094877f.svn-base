<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.dec.util.decListUtil"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.decUITableIndented" scope="session"/>

<%
try {
	String timeStamp = emxGetParameter(request, "timeStamp");
	HashMap tempMap = indentedTableBean.getTableData(timeStamp);
	MapList columns = (MapList) tempMap.get("columns");
	Map RequestMap = (Map) tempMap.get("RequestMap");
	String table = (String) RequestMap.get("table");
	
	String objectId = emxGetParameter(request, "objectId");
	
	Map<String,Map> tableDetailSummary = null;
	Map programMap = new HashMap();
	
	StringList slSelectParam = new StringList();
	slSelectParam.add(DecConstants.SELECT_ATTRIBUTE_DECGROUPHEADER);
	slSelectParam.add(DecConstants.SELECT_ATTRIBUTE_DECAPPLYFILTER);
	slSelectParam.add(DecConstants.SELECT_CURRENT);
	
	if ( StringUtils.isNotEmpty(objectId) )
	{
		String type = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, DomainConstants.SELECT_TYPE);
		if ( DomainConstants.TYPE_PROJECT_SPACE.equals(type) )
		{
//			tableMasterRevision = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, DomainConstants.SELECT_NAME);
			
			// table fix
			if ( StringUtils.isEmpty(table) )
			{
				table = (String) RequestMap.get("selectedTable");
			}
			
			// Table Detail 조회
			programMap.put("projectId", objectId);
			programMap.put("codeMasterName", table);
//			programMap.put("codeMasterRevision", tableMasterRevision);
			programMap.put("slSelectParam", slSelectParam);
			programMap.put("activeOnly", false);
			programMap.put("expandLevelParam", 1);
			
			try {
				MapList tableDetailList = JPO.invoke(context, "decTableMaster", null, "getCodeDetailList", JPO.packArgs(programMap), MapList.class);
				tableDetailSummary = decListUtil.getSelectKeyDataMapForMapList(tableDetailList, DecConstants.SELECT_ATTRIBUTE_DECCODE);
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	else
	{
		programMap.put("projectId", null);
		programMap.put("codeMasterName", table);
		programMap.put("codeMasterRevision", "-");
		programMap.put("slSelectParam", slSelectParam);
		programMap.put("activeOnly", false);
		programMap.put("expandLevelParam", 1);
		
		try {
			MapList tableDetailList = JPO.invoke(context, "decTableMaster", null, "getCodeDetailList", JPO.packArgs(programMap), MapList.class);
			tableDetailSummary = decListUtil.getSelectKeyDataMapForMapList(tableDetailList, DecConstants.SELECT_ATTRIBUTE_DECCODE);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
%>

<link rel="stylesheet" href="../common/styles/emxUIDefault.css"/>
<link rel="stylesheet" href="../common/styles/emxUIForm.css"/>
<link rel="stylesheet" href="../common/styles/emxUIList.css"/>
<style type="text/css">
table tr th {
	position: sticky;
	top: 0;
}
</style>
<body style="background-color: white;">

<form name="otherForm">
	
	<div id="overflowDiv">
	<!-- Blocked by hslee on 2023.08.21
		<table id="keywordTable" class="form" style="position: sticky; top: 0px;">
			<tr>
				<td class="label">Others</td>
				<td class="field" style="background: white;">
					<input type="text" name="keyword" id="keyword" />
				</td>
			</tr>
		</table>
	 -->
		<table class="list" style="margin: 0;">
			<tr>
<!-- 				<th></th> -->
				<th>Column Name</th>
				<th>Search Keyword</th>
			</tr>
		<%
			Map columnMap = null;
			Map settings = null;
			Map tableDetailMap = null;
			String label = null;
			String columnName = null;
			String format = null;
			String applyFilter = null;
			String groupHeader = null;
			String isDynamicColumn = null;
			String dynamicColumnName = null;
			int rowIdx = 0;
			for (Object obj : columns)
			{
				rowIdx++;
				columnMap = (Map) obj;
				columnName = (String) columnMap.get("name"); 
				settings = (Map) columnMap.get("settings"); 
				format = (String) settings.get("format");
				groupHeader = (String) settings.get("Group Header");
				isDynamicColumn = (String) settings.get("Dynamic Column");
				
				// init
				tableDetailMap = null;
				
				if ( tableDetailSummary != null )
				{
					if ( Boolean.valueOf(isDynamicColumn) )
					{
						dynamicColumnName = (String) settings.get("dynamicColumnName");
						if ( StringUtils.isNotEmpty(dynamicColumnName) )
						{
							tableDetailMap = tableDetailSummary.get(dynamicColumnName);
						}
					}
					if ( tableDetailMap == null )
					{
						tableDetailMap = tableDetailSummary.get(columnName);
					}
					
					if ( tableDetailMap != null )
					{
						applyFilter = (String) tableDetailMap.get(DecConstants.SELECT_ATTRIBUTE_DECAPPLYFILTER);
						
						if ( "N".equalsIgnoreCase(applyFilter) )
						{
							// Apply Filter가 N인 컬럼은 skip
							continue;
						}
					}
				}
				
				if ( "date".equalsIgnoreCase(format) )
				{
					// date format인 컬럼은 skip
					continue;
				}
		%>
			<tr class="<%=rowIdx%2 == 0 ? "even" : "odd" %>">
<%-- 				<td><input type="checkbox" name="columnName" value="<%=columnName %>" /></td> --%>
				<td><%=(String) columnMap.get("label") + (StringUtils.isNotEmpty(groupHeader) ? "(" + groupHeader + ")" : "") %></td>
				<td><input type="text" name="<%=columnName %>" style="width: 80%;" /></td>
			</tr>
		<%
			}
		%>
		</table>
	</div>
	
</form>

</body>

<script type="text/javascript">

</script>

<%		
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>