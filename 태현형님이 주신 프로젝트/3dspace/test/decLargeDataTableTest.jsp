<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	Map programMap = new HashMap();
	programMap.put("objectId", "22220.15368.25882.32063");
	
	MapList materialList = JPO.invoke(context, "emxProjectSpace", null, "getMaterialStatusList", JPO.packArgs(programMap), MapList.class);
	
	StringList columnList = new StringList(
		new String[] {
			"SITE_CD","DCPLN_CD","AREA_NM","UNIT_NM","CWP_NO"
			,"SYS_NM","LINE_NO","LVL_NM","ISO_NO","REV_NO"
			,"IDENT_CD","ITEM_NO","TIO_NO","SUB_SYS_NM","DELI_DEST_NM"
			,"PRFR_GRP_CD","PRFR_RANK","ITEM_GRP_CD","GRP_CD","GRP_SHORTDESC"
			,"PART_CD","PART_SHORTDESC","COMMODITY_CD","COMMODITY_SHORTDESC","SPEC_CD"
			,"SHRT_CD","SIZE1","SIZE2","SIZE3","SIZE4"
			,"BASE_MAT_CD","RAT_CD","SUB_TAG_NO","PID_NO","CHR_VAL1"
			,"CHR_VAL2","CHR_VAL3","CHR_VAL4","DES_QTY","ALLOC_QTY"
			,"UNT_CD","WGT","DIA_WIDTH","ITEM_STS_CD","DOCNO"
			,"STS_EDIT_DT","MR_NO","PO_OUT_NO","VOYAGE_NO","PACKAGE_NO"
			,"SITE_INWH_DEMYMD","DELAY_NO","ETA","ATA","FNL_ETA_YMD"
			,"MAT_STS_CD","FAB_CAT_CD","STRH_CD","IWP_NO","ORG_CD"
			,"ALLOC_EXEC_NO"
		}
	);
%>

<link rel="stylesheet" href="../common/styles/emxUIDefault.css"/>
<link rel="stylesheet" href="../common/styles/emxUIList.css"/>

<table class="list">
	<tr>
		<th>ROW NO</th>
<%
	for (int k = 0; k < columnList.size(); k++)
	{
%>
		<th><%=columnList.get(k) %></th>
<%
	}
%>	
	</tr>
<%
	int rowIdx = 0;
	Map materialMap = null;
	for (Object obj : materialList)
	{
		materialMap = (Map) obj;
		rowIdx++;
%>	
		<tr class="<%=rowIdx%2 == 0 ? "even" : "odd" %>">
			<td><%=rowIdx %></td>
<%
		for (int k = 0; k < columnList.size(); k++)
		{
%>
			<td><%=String.valueOf( materialMap.get(columnList.get(k)) ) %></td>
<%			
		}
%>
		</tr>
<%		
	}
%>	
</table>
<%	
} catch (Exception e) {
	e.printStackTrace();
	throw e;
}
%>