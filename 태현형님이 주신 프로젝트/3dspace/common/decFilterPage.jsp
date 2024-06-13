<%@page import="java.time.LocalDate"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="com.dec.util.decListUtil"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.dec.util.decCollectionUtil"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<%!
public int getPaddingCount(StringList strList) throws Exception{
	try {
		String maxLengthStr = strList.stream().max( new Comparator<String>(){
			public int compare(String o1, String o2) {
				return o1.length() - o2.length();
			}
		}).orElse("");
		return maxLengthStr.length();
	} catch(Exception e) {
		e.printStackTrace();
		throw e;
	}
}

public StringList parseWebReport(Context context, String query, String... paramStr) throws Exception{
	try {
		String result = MqlUtil.mqlCommand(context, query, paramStr);
		StringList slParse = new StringList();
		if ( StringUtils.isNotEmpty(result) )
		{
			StringList strResultList = FrameworkUtil.split(result,"Objects");
            StringList tokenList = new StringList();
            
            try ( BufferedReader in = new BufferedReader(new StringReader((String)strResultList.get(strResultList.size()-1))) ) {
                String line;
                String recToken;
                Map objMap = null;
                Vector idVector = new Vector();
                while ((line = in.readLine()) != null)
                {
                    tokenList = FrameworkUtil.split(line,"=");
                    if(tokenList.size()==2)
                    {
                        String booltoken = (String)tokenList.get(0);
                        if(booltoken==null || booltoken.trim().length()<0)
                        {
                            booltoken="";
                        }
                        slParse.add(booltoken.trim());
                    }
                }
            }
		}
		return slParse;
	} catch(Exception e) {
		e.printStackTrace();
		throw e;
	}
}
%>

<%
try {
	System.out.println(emxGetQueryString(request));
	
	String objectId = emxGetParameter(request, "objectId");
	String codeMasterParam = emxGetParameter(request, "codeMaster");
	
	String lang = request.getLocale().getLanguage();
	
	DomainObject doObj = DomainObject.newInstance(context, objectId);
	
	StringList slSelect = new StringList();
	slSelect.add(DomainConstants.SELECT_NAME);
	
	Map objInfo = doObj.getInfo(context, slSelect);
	String projectCode = (String) objInfo.get(DomainConstants.SELECT_NAME);
	
	// Get Code Master
	Map<String, StringList> codeListMap = new HashMap();
	Map<String, StringList> valueListMap = new HashMap();
	Map<String, StringList> parentIdListMap = new HashMap();
	Map<String, StringList> selfIdListMap = new HashMap();
	Map programMap = new HashMap();
	MapList codeMasterList = null;
	Map<String,StringList> codeMasterMap = null;
	StringList codeList = null;
	StringList valueList = null;
	StringList parentIdList = null;
	StringList selfIdList = null;
	StringList tempDescendantList = new StringList();
	StringList descendantList = new StringList(); // selectbox가 onchange되었을 때 함께 변경될 자식 selectbox 목록
	String descendant = null; // selectbox가 onchange되었을 때 함께 변경될 자식 selectbox 이름
	String codeMaster = null;
	StringList slCodeMasterWithDetailType = null;
	StringList slCodeMaster2HTML = new StringList(); // html tag로 출력될 Code Master 순서
			
	StringList slCodeMasterSplitByPipeline = FrameworkUtil.splitString(codeMasterParam, "|");
	StringList slCodeMasterSplitByGT = null;
	String codeMasterTemp = null;
	
	for ( String codeMasterSplitByPipeline : slCodeMasterSplitByPipeline )
	{
		slCodeMasterSplitByGT = FrameworkUtil.splitString(codeMasterSplitByPipeline, ">");
		
		tempDescendantList.clear();
		
		for (int k = 0; k < slCodeMasterSplitByGT.size(); k++)
		{
			codeMasterTemp = slCodeMasterSplitByGT.get(k);
			
			programMap.clear();
			programMap.put("projectId", objectId);
			programMap.put("codeMasterRevision", projectCode);
			programMap.put("applyFilter", true);
			
			if ( codeMasterTemp.contains(".") )
			{
				slCodeMasterWithDetailType = FrameworkUtil.splitString(codeMasterTemp, ".");
				
				if ( slCodeMasterWithDetailType.size() >= 2 )
				{
					codeMaster = slCodeMasterWithDetailType.get(1);
					
					programMap.put("codeMasterName", slCodeMasterWithDetailType.get(0));
					programMap.put("codeDetailType", codeMaster);
				}
				else
				{
					throw new Exception("Syntax of Code Master Parameter is not proper. codeMaster parameter : " + codeMasterParam);
				}
			}
			else if ( codeMasterTemp.contains(":") )
			{
				slCodeMasterWithDetailType = FrameworkUtil.splitString(codeMasterTemp, ":");
				
				if ( slCodeMasterWithDetailType.size() >= 2 )
				{
					codeMaster = codeMasterTemp.replace(":", " ");
					
					programMap.put("codeMasterName", slCodeMasterWithDetailType.get(0));
					programMap.put("codeDetailLevel", slCodeMasterWithDetailType.get(1));
					programMap.put("expandLevelParam", 0);
				}
				else
				{
					throw new Exception("Syntax of Code Master Parameter is not proper. codeMaster parameter : " + codeMasterParam);
				}
			}
			else
			{
				codeMaster = codeMasterTemp;
				
				programMap.put("codeMasterName", codeMasterTemp);
				programMap.put("expandLevelParam", 1);
			}
			
			codeMasterList = JPO.invoke(context, "decCodeMaster", null, "getCodeDetailList", JPO.packArgs(programMap), MapList.class);
			
			codeMasterMap = decCollectionUtil.extractStringList(codeMasterList, "attribute[decCode]", DomainConstants.SELECT_DESCRIPTION, "from.id", DomainConstants.SELECT_ID);
			
			codeList = codeMasterMap.get("attribute[decCode]");
			valueList = codeMasterMap.get(DomainConstants.SELECT_DESCRIPTION);
			parentIdList = codeMasterMap.get("from.id");
			selfIdList = codeMasterMap.get(DomainConstants.SELECT_ID);
			
			codeList.add(0, "");
			valueList.add(0, "All");
			parentIdList.add(0, "");
			selfIdList.add(0, "");
			
			codeListMap.put(codeMaster, codeList);
			valueListMap.put(codeMaster, valueList);
			parentIdListMap.put(codeMaster, parentIdList);
			selfIdListMap.put(codeMaster, selfIdList);
			
			if ( k == 0 )
			{
				descendant = "";
			}
			else
			{
				descendant = codeMaster;
			}

			slCodeMaster2HTML.add(codeMaster);
			tempDescendantList.add(descendant);
		}
		
		// tempDescendantList 정리
		// 1. idx:0의 데이터를 제거하고 --> 현재 tempDescendantList는 idx 하나씩 밀려있음.
		// 2. 마지막에 ""을 add한다. --> 마지막 Code Master는 변경될 자식 없음.
		tempDescendantList.remove(0);
		tempDescendantList.add("");
		descendantList.addAll(tempDescendantList);
	}
	
	StringList attrNameList = new StringList();
	StringList attrDisplayNameList = new StringList();
	Map<String, StringList> attrValueMap = new HashMap<String, StringList>();
	Map<String, StringList> attrDisplayMap = new HashMap<String, StringList>();
	Map<String,String> defaultValueMap = new HashMap<String,String>();
	StringList attrValueList = new StringList();
	StringList attrDisplayList = new StringList();
	String attrName = null;
	String attrDisplayName = null;
	boolean hasEmpty = false;
	
	// Get Project Type
	if ( StringUtils.isNotEmpty( emxGetParameter(request, DecConstants.ATTRIBUTE_DECPROJECTTYPE) ) )
	{
		attrName = DecConstants.ATTRIBUTE_DECPROJECTTYPE;
		attrDisplayList = new StringList();
		
		AttributeType attrType = new AttributeType(attrName);
		attrType.open(context);
		attrValueList = attrType.getChoices(context);
		for (String attrValue : attrValueList)
		{
			if ( !hasEmpty && StringUtils.isEmpty(attrValue) ) 
			{
				hasEmpty = true;
			}
			else
			{
				attrDisplayList.add( i18nNow.getRangeI18NString(attrName, attrValue, lang) );
			}
		}
		
		if ( hasEmpty )
		{
			attrValueList.add(0, "");
			attrDisplayList.add(0, "All");
		}
		
		attrNameList.add( DecConstants.ATTRIBUTE_DECPROJECTTYPE );
		attrDisplayName = i18nNow.getAttributeI18NString(attrName, lang);
		attrDisplayNameList.add( attrDisplayName );
		
		attrValueMap.put(attrName, attrValueList);
		attrDisplayMap.put(attrName, attrDisplayList);
	}
	
	// Get Country
	if ( StringUtils.isNotEmpty( emxGetParameter(request, DecConstants.ATTRIBUTE_DECCOUNTRYCODE) ) )
	{
		hasEmpty = false;
		
		attrName = DecConstants.ATTRIBUTE_DECCOUNTRYCODE;
		attrNameList.add( attrName );
		attrDisplayName = i18nNow.getAttributeI18NString(attrName, lang);
		attrDisplayNameList.add( attrDisplayName );
		
		MapList countryList = JPO.invoke(context, "emxProjectSpace", null, "getCountryList", JPO.packArgs(new HashMap()), MapList.class);
		Map allCountryMap = decListUtil.getSelectKeyDataMapForMapList(countryList, "attribute[Country Code (2 Letter)]");
		
		attrValueList = parseWebReport(context, "temp webreport searchcriteria $1 groupby value $2", "temp query bus 'Project Space' * *", DecConstants.SELECT_ATTRIBUTE_DECCOUNTRYCODE);
		
		Map countryMap = null;
		attrDisplayList = new StringList();
		for (String attrValue : attrValueList)
		{
			if ( !hasEmpty && StringUtils.isEmpty(attrValue) ) 
			{
				hasEmpty = true;
			}
			else
			{
				countryMap = (Map) allCountryMap.get(attrValue);
				if ( countryMap == null )
				{
					attrDisplayList.add(attrValue);
				}
				else
				{
					attrDisplayList.add((String) countryMap.get(DecConstants.SELECT_NAME));
				}
			}
		}
		
		if ( hasEmpty )
		{
// 			attrValueList.add(0, "");
			attrDisplayList.add(0, "All");
		}
		
		attrValueMap.put(attrName, attrValueList);
		attrDisplayMap.put(attrName, attrDisplayList);
	}
	
	// Get WBS
	StringList wbsTypeList = new StringList(new String[] {"Unit", "EWP"});
	MapList wbsList = null;
	Map<String,StringList> wbsSummary = null;
	
	for ( String wbsType : wbsTypeList )
	{
		if ( StringUtils.isNotEmpty( emxGetParameter(request, wbsType) ) )
		{
			hasEmpty = false;
			
			attrName = wbsType; 
			attrNameList.add( attrName );
			attrDisplayName = wbsType;
			attrDisplayNameList.add( attrDisplayName );
					
			if ( "Unit".equals(wbsType) )
			{
				slSelect.clear();
				slSelect.add(DecConstants.SELECT_ID);
				slSelect.add(DecConstants.SELECT_NAME);
				
				programMap.clear();
				programMap.put("objectId", objectId);
				programMap.put("wbsType", wbsType);
				programMap.put("slSelect", slSelect);
				
				wbsList = JPO.invoke(context, "emxProjectSpace", null, "getActivityListWithWBSType", JPO.packArgs(programMap), MapList.class);
				wbsSummary = decCollectionUtil.extractStringList(wbsList, DecConstants.SELECT_ID, DecConstants.SELECT_NAME);
			}
			else if ( "EWP".equals(wbsType) )
			{
				programMap.clear();
				programMap.put("objectId", objectId);
				
				wbsList = JPO.invoke(context, "emxProjectSpace", null, "getEWPList", JPO.packArgs(programMap), MapList.class);
				wbsSummary = decCollectionUtil.extractStringList(wbsList, DecConstants.SELECT_ID, DecConstants.SELECT_NAME);
			}
			
			attrValueList = new StringList();
			attrDisplayList = new StringList();
			
			attrValueList.addAll( wbsSummary.get(DecConstants.SELECT_ID) );
			attrDisplayList.addAll( wbsSummary.get(DecConstants.SELECT_NAME) );
			
			attrValueList.add(0, "");
			attrDisplayList.add(0, "All");
			
			attrValueMap.put(attrName, attrValueList);
			attrDisplayMap.put(attrName, attrDisplayList);
		}
	}
	
	// Get PO
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "PO_No") ) )
	{
		hasEmpty = false;
		
		attrName = "PO_No"; 
		attrNameList.add( attrName );
		attrDisplayName = "PO No";
		attrDisplayNameList.add( attrDisplayName );
				
		programMap.clear();
		programMap.put("objectId", objectId);
		
		MapList poList = JPO.invoke(context, "emxProjectSpace", null, "getPOList", JPO.packArgs(programMap), MapList.class);
		Map<String,StringList> poSummary = decCollectionUtil.extractStringList(poList, "PO_NO", "PO_NM");
		
		attrValueList = new StringList();
		attrDisplayList = new StringList();
		
		attrValueList.addAll( poSummary.get("PO_NO") );
		attrDisplayList.addAll( poSummary.get("PO_NO") );
		
		attrValueList.add(0, "");
		attrDisplayList.add(0, "All");
		
		attrValueMap.put(attrName, attrValueList);
		attrDisplayMap.put(attrName, attrDisplayList);
	}
	
	// Get Action
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "Action") ) )
	{
		attrName = "Action"; 
		attrNameList.add( attrName );
		attrDisplayName = "Action";
		attrDisplayNameList.add( attrDisplayName );
				
		attrValueList = new StringList( new String[] {"", "Create", "Modify", "Delete"} );
		attrDisplayList = new StringList( new String[] {"All", "Create", "Update", "Delete"}) ;
		
		attrValueMap.put(attrName, attrValueList);
		attrDisplayMap.put(attrName, attrDisplayList);
	}
	
	// Get Input Type
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "Input Type") ) )
	{
		attrName = "Input Type"; 
		attrNameList.add( attrName );
		attrDisplayName = "Input Type";
		attrDisplayNameList.add( attrDisplayName );
				
		attrValueList = new StringList( new String[] {"", "Excel", "View"} );
		attrDisplayList = new StringList( new String[] {"All", "Excel", "View"} );
		
		attrValueMap.put(attrName, attrValueList);
		attrDisplayMap.put(attrName, attrDisplayList);
	}
	
	// Get Year
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "Year") ) )
	{
		attrName = "Year"; 
		attrNameList.add( attrName );
		attrDisplayName = "Year";
		attrDisplayNameList.add( attrDisplayName );
		
		attrValueList = new StringList(  );
		attrDisplayList = attrValueList;
		
		int yearIntValue = LocalDate.now().getYear();
		
		for (int k = yearIntValue - 20; k < yearIntValue + 20; k++)
		{
			attrValueList.add( String.valueOf(k) );
		}
		
		defaultValueMap.put(attrName, String.valueOf(yearIntValue));
		attrValueMap.put(attrName, attrValueList);
		attrDisplayMap.put(attrName, attrDisplayList);
	}
	
	// Get Month
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "Month") ) )
	{
		attrName = "Month"; 
		attrNameList.add( attrName );
		attrDisplayName = "Month";
		attrDisplayNameList.add( attrDisplayName );
		
		attrValueList = new StringList( new String[] {"1","2","3","4","5","6","7","8","9","10","11","12"} );
		attrDisplayList = attrValueList;
		
		defaultValueMap.put(attrName, String.valueOf(LocalDate.now().getMonthValue()));
		attrValueMap.put(attrName, attrValueList);
		attrDisplayMap.put(attrName, attrDisplayList);
	}
	
	StringList checkboxNameList = new StringList();
	StringList checkboxLabelList = new StringList();
	
	// Get Material Delay
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "Material Delay") ) )
	{
		checkboxNameList.add("Material Delay");
		checkboxLabelList.add("Material Delay");
	}

	// Get IFC
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "IFC") ) )
	{
		checkboxNameList.add("IFC");
		checkboxLabelList.add("IFC");
	}
	
	StringList inputTextNameList = new StringList();
	StringList inputTextLabelList = new StringList();
	
	// Get Document Search
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "Doc_StrSearch") ) )
	{
		inputTextNameList.add("Doc_Title");
		inputTextNameList.add("Doc_No");
		
		inputTextLabelList.add("Doc Title");
		inputTextLabelList.add("Doc No");
	}
	
	String tdLabel = null;
	StringList tdLabelList = new StringList();
	StringList inputRadioLabelList = null;
	Map<String,String> inputRadioNameMap = new HashMap<String,String>();
	Map<String,StringList> inputRadioLabelMap = new HashMap<String,StringList>();
	
	// Get Date_StandType
	if ( StringUtils.isNotEmpty( emxGetParameter(request, "Date_StandType") ) )
	{
		tdLabel = "Date Type";
		tdLabelList.add(tdLabel);
		
		inputRadioNameMap.put(tdLabel, "Date_StandType");
		
		inputRadioLabelList = new StringList();
		inputRadioLabelList.add("Monthly");
		inputRadioLabelList.add("Weekly");
		
		inputRadioLabelMap.put(tdLabel, inputRadioLabelList);
	}
%>

<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="javascript" src="../common/scripts/emxUICore.js"></script>
<script language="javascript" src="../common/scripts/emxUICoreMenu.js"></script>
<script language="javascript" src="../common/scripts/emxUIModal.js"></script>
<script language="javascript" src="../common/scripts/emxUICalendar.js"></script>
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script type="text/javascript">
function fnOnload() {
	parent.fnAdjustHeight( document.getElementById("filterTable").offsetHeight );	
}

function fnApplyMasterFilter(selectDOM) {
	let descendant = $(selectDOM).attr("descendant");
	let selectedValue = $(selectDOM).val();
	let selectedDOMOptionCnt = $(selectDOM).find("option").not("[style*='display: none']").length;
	let selfId = $(selectDOM).find("option:selected").attr("selfid");
	
	if ( descendant !== "" )
	{
		$("select[name='" + descendant + "']").each(function() {
			if ( selectedValue === "" && selectedDOMOptionCnt > 1 )
// 			if ( selectedValue === "" )
			{
				// 선택된 값이 없을 경우 전체 목록이 나오도록 한다.
				$(this).find("option").show();
				$(this).find("option:eq(0)").prop("selected", true);
			}
			else
			{
				$(this).find("option:gt(0)").hide();
				
				let $toBeAppliedOptionArr = $(this).find("option[parentid='" + selfId + "']");
				$toBeAppliedOptionArr.show();
				
				if ( $toBeAppliedOptionArr.length === 1 )
				{
					let optIdx = $toBeAppliedOptionArr.index();
					$(this).find("option:eq(" + optIdx + ")").prop("selected", true);
				}
// 				else if ($toBeAppliedOptionArr.length === 0 )
// 				{
// 					$(this).find("option:eq(0)").prop("selected", true);
// 				}
				else
				{
					$(this).find("option:eq(0)").prop("selected", true);
				}
			}
			$(this).trigger("change");
		});
	}
	else
	{
		parent.fnReloadHierarchyFrame();
	}
}

function fnFullSearch() {
	let searchURL = "../common/emxFullSearch.jsp";
	searchURL += "?field=TYPES=type_decCodeDetail:CURRENT=policy_decCodeMaster.state_Active";
	searchURL += "&objectId=<%=objectId %>";
	searchURL += "&includeOIDprogram=emxProjectSpace:getCodeDetailList";
	searchURL += "&table=AEFGeneralSearchResults";
	searchURL += "&selection=multiple";
	searchURL += "&submitURL=../common/AEFSearchUtil.jsp";
	searchURL += "&fieldNameActual=EPC Category";
	searchURL += "&fieldNameDisplay=EPC CategoryDisplay";
	searchURL += "&codeMasterName=EPC Category";

	showModalDialog(searchURL);
}
</script>

<link rel="stylesheet" href="../common/styles/emxUIDefault.css"/>
<link rel="stylesheet" href="../common/styles/emxUIList.css"/>
<link rel="stylesheet" href="../common/styles/emxUIForm.css"/>
<link rel="stylesheet" href="../common/styles/emxUICalendar.css"/>
<style type="text/css">
select, option {
/* 	font-family: monospace; */
/* 	font-weight: bold; */
}
select {
	width: 100%;
}
input[type=text] {
	width: calc(100% - 55px);
}
table.form tr td.label {
	min-width: unset;
	max-width: 100px;
}
</style>

<body onload="fnOnload()">
	
<form name="commonFilterForm">
	
	<table id="filterTable" class="form list">
	<%
		int descendantIdx = 0;
		int paddingCount = 0;
		String code = null;
		
		for (String codeMaster2HTML : slCodeMaster2HTML)
		{
			codeList = codeListMap.get(codeMaster2HTML);
			valueList = valueListMap.get(codeMaster2HTML);
			parentIdList = parentIdListMap.get(codeMaster2HTML);
			selfIdList = selfIdListMap.get(codeMaster2HTML);
			descendant = descendantList.get(descendantIdx++);
			
			paddingCount = getPaddingCount(codeList);
	%>
		<tr>
			<td class="label"><%=codeMaster2HTML %></td>
			<td class="field">
				<select name="<%=codeMaster2HTML %>" onchange="fnApplyMasterFilter(this)" descendant="<%=descendant %>">
	<%
				for (int k = 0; k < codeList.size(); k++)
				{
					code = codeList.get(k);
	%>
					<option value="<%=code %>" parentId="<%=parentIdList.get(k) %>" selfId="<%=selfIdList.get(k) %>"><%=valueList.get(k) %></option>
<%-- 					<option value="<%=code %>" parentId="<%=parentIdList.get(k) %>" selfId="<%=selfIdList.get(k) %>"><%=String.format("%-" + paddingCount + "s", code).replace(" ", "&nbsp;") + "&nbsp;&nbsp;|&nbsp;&nbsp;" + valueList.get(k) %></option> --%>
	<%
				}
	%>
				</select>
			</td>
		</tr>
	<%
		}
	
		for (int k = 0; k < attrNameList.size(); k++)
		{
			attrName = attrNameList.get(k);
			attrDisplayName = attrDisplayNameList.get(k);
			attrValueList = attrValueMap.get(attrName);
			attrDisplayList = attrDisplayMap.get(attrName);
	%>
		<tr>
			<td class="label"><%=attrDisplayName %></td>
			<td class="field"> 
				<select name="subcon" name="<%=attrName %>">
					<framework:optionList  valueList="<%=attrValueList%>" optionList="<%=attrDisplayList%>" selected="<%=defaultValueMap.get(attrName) %>"/>
				</select>
			</td>
		</tr>
	<%	
		}
		
		String checkboxName = null;
		String checkboxLabel = null;
		
		for (int k = 0; k < checkboxNameList.size(); k++)
		{
			checkboxName = checkboxNameList.get(k);
			checkboxLabel = checkboxLabelList.get(k);
			%>
			<tr>
				<td class="label"><%=checkboxLabel %></td>
				<td class="field"> 
					<input type="checkbox" name="<%=checkboxLabel %>" value="Y" />
				</td>
			</tr>
		<%	
		}
		
		String inputTextName = null;
		String inputTextLabel = null;
		
		for (int k = 0; k < inputTextNameList.size(); k++)
		{
			inputTextName = inputTextNameList.get(k);
			inputTextLabel = inputTextLabelList.get(k);
			%>
			<tr>
				<td class="label"><%=inputTextLabel %></td>
				<td class="field"> 
					<input type="text" name="<%=inputTextName %>" value="" />
				</td>
			</tr>
		<%	
		}
		
		String inputRadioName = null;
		String inputRadioLabel = null;
		
		for (int k = 0; k < tdLabelList.size(); k++)
		{
			tdLabel = tdLabelList.get(k);
			inputRadioName = inputRadioNameMap.get(tdLabel);
			inputRadioLabelList = inputRadioLabelMap.get(tdLabel);
			%>
			<tr>
				<td class="label"><%=tdLabel %></td>
				<td class="field"> 
<%
				for (int m = 0; m < inputRadioLabelList.size(); m++)
				{
%>
					<input type="radio" name="<%=inputRadioName %>" value="Y" /> <%=inputRadioLabelList.get(m) %>&nbsp;&nbsp;&nbsp;
<%
				}
%>
				</td>
			</tr>
		<%	
		}
		
		if ( StringUtils.isNotEmpty(emxGetParameter(request, "Select_Date")) )
		{
%>
		<tr>
			<td>Date</td>
			<td>
				From 
				<input type="text" id="Select_Date_Start" name="Select_Date_Start" value="" size="8" readonly="readonly" />
				<a href="javascript:showCalendar('commonFilterForm', 'Select_Date_Start', '', '', '', '', parent);">
					<img src="../common/images/iconSmallCalendar.gif" alt="Date Picker" border="0" />
				</a>
			   	<input type="hidden" id="Select_Date_Start_msvalue" name="Select_Date_Start_msvalue" value="" />
			   	<a class = "dialogClear" onclick = "javascript:$('#fromDate').val(''); $('#fromDate_msvalue').val('');">
					<emxUtil:i18n localize="i18nId">emxProgramCentral.Common.Clear</emxUtil:i18n>
				</a>
				 ~ 
				To <div id='toCalendarDiv' style='box-shadow: none;'></div>
				<input type='hidden' id='toTdMonthVal' />
				<input type='hidden' id='toTdYearVal' />
			</td>
		</tr>
<%
		}
		
		if ( StringUtils.isNotEmpty(emxGetParameter(request, "Select_Date")) )
		{
%>
		<tr>
			<td>Date</td>
			<td>
				From 
				<input type="text" id="Select_Date_Start" name="Select_Date_Start" value="" size="8" readonly="readonly" />
				<a href="javascript:showCalendar('commonFilterForm', 'Select_Date_Start', '', '', '', '', parent);">
					<img src="../common/images/iconSmallCalendar.gif" alt="Date Picker" border="0" />
				</a>
			   	<input type="hidden" id="Select_Date_Start_msvalue" name="Select_Date_Start_msvalue" value="" />
			   	<a class = "dialogClear" onclick = "javascript:$('#fromDate').val(''); $('#fromDate_msvalue').val('');">
					<emxUtil:i18n localize="i18nId">emxProgramCentral.Common.Clear</emxUtil:i18n>
				</a>
				 ~ 
				To <div id='toCalendarDiv' style='box-shadow: none;'></div>
				<input type='hidden' id='toTdMonthVal' />
				<input type='hidden' id='toTdYearVal' />
			</td>
		</tr>
<%
		}
%>
	</table>
	
	

</form>

</body>

<%
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>