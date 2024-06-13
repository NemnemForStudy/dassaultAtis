
<%@page import="java.util.List"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.dec.util.DecConstants"%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>

<%@include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/emxUIConstantsInclude.inc"%>


<%@include file = "../emxUICommonHeaderEndInclude.inc" %>
<%
	String sLang = request.getHeader("Accept-Language");
	String sProjectCode = emxGetParameter(request,"projectCode");
	/*
	 * Refactored by hslee on 2023.07.11 --- [s]
	String sObjectId = DecConstants.EMPTY_STRING;
	String sImgSource = DecConstants.EMPTY_STRING;
	String sSiteName = DecConstants.EMPTY_STRING;
	String sClassfication = DecConstants.EMPTY_STRING;
	String sCountryANDRegion = DecConstants.EMPTY_STRING;
	String sEPC = DecConstants.EMPTY_STRING;
	String sConstructionDate = DecConstants.EMPTY_STRING;
	
	StringList slParam = new StringList();
	slParam.add(DecConstants.SELECT_ID);
	slParam.add(DecConstants.SELECT_NAME);
	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECSITENAME);
	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECEPCTYPE);
	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECCOUNTRYCODE);
	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECCATEGORY1);
	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECCATEGORY2);
	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECCATEGORY3);
	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECACTUALSTARTDATE);
	slParam.add(DecConstants.SELECT_ATTRIBUTE_DECEXPECTEDDATE);
	
	MapList mlProject = DomainObject.findObjects(context, DecConstants.TYPE_PROJECT_SPACE, "*", DecConstants.SELECT_NAME + "=='" + sProjectCode + "'", slParam);
	Map mProject = null;
	Map mArgs = new HashMap();
	Map paramMap = new HashMap();
	if(mlProject != null && !mlProject.isEmpty()){
		mProject = (Map)mlProject.get(0);
		sObjectId = (String)mProject.get("id");
		paramMap.put("objectId", sObjectId);
		paramMap.put("style", "width:100%; height:100%;");
		mArgs.put("paramMap", paramMap);
		sImgSource = JPO.invoke(context, "emxProjectSpace", null, "getImageHolder", JPO.packArgs(mArgs), String.class);
		DomainObject doProject = DomainObject.newInstance(context, sObjectId);
		sSiteName = (String)mProject.get(DecConstants.SELECT_ATTRIBUTE_DECSITENAME);
		sClassfication = (String)mProject.get(DecConstants.SELECT_ATTRIBUTE_DECCATEGORY1);
		sCountryANDRegion = (String)mProject.get(DecConstants.SELECT_ATTRIBUTE_DECCOUNTRYCODE);
		// Added by hslee on 2023.07.11 --- [s]
		Map programMap = new HashMap();
		programMap.put(DecConstants.ATTRIBUTE_DECCOUNTRYCODE, sCountryANDRegion);
		MapList countryList = JPO.invoke(context, "emxProjectSpace", null, "getCountryList", JPO.packArgs(programMap), MapList.class);
		if ( countryList != null && countryList.size() >= 0 )
		{
			Map countryMap = (Map) countryList.get(0);
			sCountryANDRegion = (String) countryMap.get(DecConstants.SELECT_NAME);
		}
		// Added by hslee on 2023.07.11 --- [e]
		sEPC = (String)mProject.get(DecConstants.SELECT_ATTRIBUTE_DECEPCTYPE);
    	sConstructionDate = DecDateUtil.changeDateFormat((String)mProject.get(DecConstants.SELECT_ATTRIBUTE_DECACTUALSTARTDATE), new SimpleDateFormat("yyyy.MM.dd"))
							+ " ~ "
							+ DecDateUtil.changeDateFormat((String)mProject.get(DecConstants.SELECT_ATTRIBUTE_DECEXPECTEDDATE), new SimpleDateFormat("yyyy.MM.dd"));
	}
	*/
	
	Map programMap = new HashMap();
	programMap.put("projectCode", sProjectCode);
	
	Map projectOutLineMap = null;
	boolean pushContext = false;	
	try {
		ContextUtil.pushContext(context);
		pushContext = true;
		
		projectOutLineMap = JPO.invoke(context, "emxProjectSpace", null, "getProjectOutLine", JPO.packArgs(programMap), Map.class);
	} catch(Exception e) {
		e.printStackTrace();
		throw e;
	} finally {
		if ( pushContext ) { ContextUtil.popContext(context); }
	}
	String sImgSource = (String) projectOutLineMap.get("imgSource");
	String sSiteName = (String) projectOutLineMap.get("siteName");
	String sObjectId = (String) projectOutLineMap.get("objectId");
	String sClassfication = (String) projectOutLineMap.get("classfication");
	String sCountryANDRegion = (String) projectOutLineMap.get("countryANDRegion");
	String sEPC = (String) projectOutLineMap.get("EPC");
	String sConstructionDate = (String) projectOutLineMap.get("constructionDate");
	// Refactored by hslee on 2023.07.11 --- [e]
%>
<script>
	$(function (){
	    window.onresize = function() {
	    	imgResize();
	    }
		imgResize();
		function imgResize(){
			var imgTable = document.getElementById('imgTable');
			var img = document.getElementById('divDropPrimaryImage');
			var imgTD = document.getElementById('imgTD');
			
			// 원본 이미지 사이즈 저장
			var width = img.clientWidth;
			var height = img.clientHeight;
			var widthTable = imgTable.clientWidth;
			var heightTable = imgTable.clientHeight;
		
			// 가로, 세로 최대 사이즈 설정
			var bodyWidth = document.body.clientWidth;   // 원하는대로 설정. 픽셀로 하려면 bodyWidth = 400
			var bodyHeight = document.body.clientHeight;   // 원래 사이즈 * 0.5 = 50%

			if(heightTable > bodyHeight){
				img.style.width = 'auto';
				img.style.height = (bodyHeight - imgTD.clientHeight - 2) + 'px';
			}else if(heightTable < bodyHeight){
				img.style.width = '100%';
				img.style.height = '100%';
			}
			imgResize2();
		}
		function imgResize2(){
			var imgTable = document.getElementById('imgTable');
			var img = document.getElementById('divDropPrimaryImage');
			var imgTD = document.getElementById('imgTD');
			
			// 원본 이미지 사이즈 저장
			var width = img.clientWidth;
			var height = img.clientHeight;
			var widthTable = imgTable.clientWidth;
			var heightTable = imgTable.clientHeight;
		
			// 가로, 세로 최대 사이즈 설정
			var bodyWidth = document.body.clientWidth;   // 원하는대로 설정. 픽셀로 하려면 bodyWidth = 400
			var bodyHeight = document.body.clientHeight;   // 원래 사이즈 * 0.5 = 50%

			if(heightTable > bodyHeight){
				img.style.width = 'auto';
				img.style.height = (bodyHeight - imgTD.clientHeight - 2) + 'px';
			}else if(heightTable < bodyHeight){
				img.style.width = '100%';
				img.style.height = '100%';
			}
		}
	});
</script>
<head>
<link rel="stylesheet" href="../webapps/UIKIT/UIKIT.css" type="text/css" />
</head>
<body style="height:100%;">
 	<table id="imgTable">
    	<tbody>
    	<tr>
    		<td id="imgTD" class="label" style="text-align:center;">Site Photo</td>
    		<td class="label" style="text-align:center; width:20%;"><%=i18nNow.getI18nString("ProgramCentral.Common.Division", "emxProgramCentralStringResource", sLang) %></td>
    		<td class="label" style="text-align:center; width:20%;"><%=i18nNow.getI18nString("ProgramCentral.Common.Detail", "emxProgramCentralStringResource", sLang) %></td>
    	</tr>
     	<tr>
     		<td rowspan="6" style="text-align: center;">
    			<%=sImgSource%>
       		</td>
       		<td class="label" style="text-align:center;">
       			<%=i18nNow.getI18nString("ProgramCentral.Common.SiteName", "emxProgramCentralStringResource", sLang) %>
       		</td>
       		<td class="inputField" style="text-align:center;">
       			<%=sSiteName%>
       		</td>
    	</tr>
    	<tr>
       		<td class="label" style="text-align:center;">
       			<%=i18nNow.getI18nString("ProgramCentral.Common.ProjectCode", "emxProgramCentralStringResource", sLang) %>
       		</td>
       		<td class="inputField" style="text-align:center;">
       			<%=sProjectCode%> <a href=JavaScript:window.open("emxTree.jsp?objectId=<%=sObjectId%>");><img src="images/iconActionNewWindow.png" border="0"></a>
       		</td>
    	</tr>
    	<tr>
       		<td class="label" style="text-align:center;">
       			<%=i18nNow.getI18nString("ProgramCentral.Common.Classfication", "emxProgramCentralStringResource", sLang) %>
       		</td>
       		<td class="inputField" style="text-align:center;">
       			<%=sClassfication%>
       		</td>
    	</tr>
    	<tr>
       		<td class="label" style="text-align:center;">
       			<%=i18nNow.getI18nString("emxProgramCentral.Label.Country", "emxProgramCentralStringResource", sLang) %>
<%--        			<%=i18nNow.getI18nString("ProgramCentral.Common.Country/Region", "emxProgramCentralStringResource", sLang) %> --%>
       		</td>
       		<td class="inputField" style="text-align:center;">
       			<%=sCountryANDRegion%>
       		</td>
    	</tr>
    	<tr>
       		<td class="label" style="text-align:center;">
       			<%=i18nNow.getI18nString("ProgramCentral.Common.EPC", "emxProgramCentralStringResource", sLang) %>
       		</td>
       		<td class="inputField" style="text-align:center;">
       			<%=sEPC%>
       		</td>
    	</tr>
    	<tr>
       		<td class="label" style="text-align:center;">
       			<%=i18nNow.getI18nString("ProgramCentral.Common.ConstructionPeriod", "emxProgramCentralStringResource", sLang) %>
       		</td>
       		<td class="inputField" style="text-align:center;">
       			<%=sConstructionDate%>
       		</td>
    	</tr>
    	</tbody>
	</table>
</body>