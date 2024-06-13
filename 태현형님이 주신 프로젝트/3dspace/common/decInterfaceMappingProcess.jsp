<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.domain.util.SetUtil"%>
<%@page import="com.matrixone.apps.domain.util.*"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<%@page import="java.util.Locale"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.time.LocalDate"%>
<%@page import="java.time.LocalDateTime"%>
<%@page import="java.time.format.DateTimeFormatter"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="matrix.db.JPO"%>
<%@page import="matrix.db.Environment"%>
<%@page import="com.matrixone.apps.domain.*"%>
<%@page import="java.util.*"%>
<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@include file="../emxUICommonAppInclude.inc"%>
<%@include file = "emxUIConstantsInclude.inc"%>
<%@include file = "../emxStyleDefaultInclude.inc"%>
<%@include file = "../emxStyleListInclude.inc"%>
<%@include file = "../emxStyleFormInclude.inc"%>
<%@include file = "emxCompCommonUtilAppInclude.inc"%>
<%@include file = "../emxTagLibInclude.inc" %>
<html>
<head>

<meta charset="UTF-8">
<script language="javascript" src="../common/scripts/emxUICore.js"></script>
<script language="javascript" src="../common/scripts/emxUICoreMenu.js"></script>
<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="JavaScript" src="../common/scripts/emxUICalendar.js" type="text/javascript"></script>
<script language="javascript" src="../common/scripts/emxUITimeline.js"></script>
<script language="JavaScript" src="scripts/emxUICollections.js" type="text/javascript"></script>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<script type="text/javascript" src="../common/scripts/emxUIModal.js"></script>
<script type="text/javascript" src="../common/scripts/emxUIPopups.js"></script>
<script src="../common/scripts/hichart/jquery-3.1.1.min.js"></script>
<script src="../common/scripts/hichart/highcharts.js"></script>
<script src="../common/scripts/hichart/map.js"></script>
<script src="../common/scripts/hichart/data.js"></script>
<script src="../common/scripts/hichart/world.js"></script>
<script src="../common/scripts/hichart/accessibility.js"></script>
<link rel="stylesheet" href="styles/emxUIExtendedHeader.css"/>
<link rel="stylesheet" href="styles/emxUIDefault.css"/>
<link rel="stylesheet" href="styles/emxUIToolbar.css"/>
<link rel="stylesheet" href="styles/emxUIMenu.css"/>
<link rel="stylesheet" href="styles/emxUIStructureBrowser.css"/>
<%@include file = "../emxUICommonHeaderBeginInclude.inc"%>
<%@include file = "../emxJSValidation.inc" %>
<script
	src="../common/scripts/hichart/proj4.js"></script>
<script
	src="../common/scripts/hichart/jquery-ui.min.js"></script>
<script language="JavaScript" src="../common/scripts/emxUIPopups.js"
	type="text/javascript"></script>
<link href="../common/styles/jquery-ui.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="../common/styles/decDailyLoginStatus.css">
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>

</head>
<body>
	
	<%
	///////////////////////
	String resultMessage = "";
	String objectId = emxGetParameter(request, "objectId");
	String commandName = emxGetParameter(request, "commandName");
	String projectCode = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, DomainConstants.SELECT_NAME);
//	String action = request.getParameter("commandName")==null? "":request.getParameter("commandName"); //action값 들어옴
	Map programMap = new HashMap();
	programMap.put("projectCode", projectCode);
	programMap.put("commandName", commandName);
	
	 JPO.invoke(context, "emxProjectSpace", null, "dogetSitecdDcplnInterfaceProject", JPO.packArgs(programMap), null);

	//  if(abc2.equals("decEngProgressInterfaceMapping")){
	
	//	  commandName.invoke(context, "emxProjectSpace", null, "dogetEngProgressInterfaceProject", JPO.packArgs(programMap), null);
	 
	//  }
	///////////////////////
	//  if(commandName.equals("decSitecdDcplnInterfaceMapping")){
		  
		  
	//	 JPO.invoke(context, "emxProjectSpace", null, "dogetSitecdDcplnInterfaceProject", JPO.packArgs(programMap), null);

	//  }
	%>
	

	<figure class="highcharts-figure">
    <div id="container" style="height: 500px;  max-width: 100%; left: 0; top: 80px; position: relative;"></div>
    <p class="highcharts-description">
    </p>
	</figure>

	<form name ="select_date" id="select_date" 
		style= "background: white;  position: absolute; top: 50px; left: 50%; transform: translate(-50%, -50%); width: 550px; height: 20px;">
		<table style ="Border-Spacing : 5px;">
			   <tr>
			    <td>
			    	<label for ="fromDate">시작일</label>
			  	    <input type="text" id="fromDate" name="fromDate" value="" size="8" readonly="readonly" />
			  	    &nbsp;<a href="javascript:showCalendar('select_date', 'fromDate', '');"><img src="../common/images/iconSmallCalendar.gif" alt="Date Picker" border="0" /></a>
			    	<input type="hidden" name="fromDate_msvalue" value="" />
			    	<a class = "dialogClear" href = "javascript:;" onclick = "javascript:dateClear('from');">
						<emxUtil:i18n localize="i18nId">emxProgramCentral.Common.Clear</emxUtil:i18n>
					</a>
				</td>
				 <td>
			    	<label for ="toDate">종료일</label>
			  	    <input type="text" id="toDate" name="toDate" value="" size="8" readonly="readonly" />
			  	    &nbsp;<a href="javascript:showCalendar('select_date', 'toDate', '');"><img src="../common/images/iconSmallCalendar.gif" alt="Date Picker" border="0" /></a>
			    	<input type="hidden" name="toDate_msvalue" value="" />
					<a class = "dialogClear" href = "javascript:;" onclick = "javascript:dateClear('to');">
						<emxUtil:i18n localize="i18nId">emxProgramCentral.Common.Clear</emxUtil:i18n>
					</a>				
				</td>
				<td>
				<p id="p_all"><input type="submit" value="Submit"></p>
				</td>
			  </tr>
				
		</table>
	</form>
  </script>
</body>
</html>