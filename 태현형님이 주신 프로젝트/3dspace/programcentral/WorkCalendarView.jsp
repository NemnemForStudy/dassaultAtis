<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.matrixone.apps.common.Task"%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@page import="com.matrixone.apps.common.WorkCalendar"%>
<%@include file="../common/emxNavigatorTopErrorInclude.inc"%>

<%@include file="../emxUICommonAppInclude.inc"%>
<%@ include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../emxUICommonHeaderEndInclude.inc" %>
<%@include file = "../common/emxUIConstantsInclude.inc"%>


<%
	//Get Exceptions
	String objectId = (String) emxGetParameter(request, "objectId");
	objectId = XSSUtil.encodeForURL(objectId);
	
	String mode = (String) emxGetParameter(request, "mode");
	
	String activeTabIndex = emxGetParameter(request, "activeTabIndex");
	
	
	WorkCalendar calendar = new WorkCalendar(objectId);    
	
	
	StringList busSelect = new StringList(3);
	busSelect.addElement(ProgramCentralConstants.SELECT_NAME);
	busSelect.addElement("attribute[Working Time Per Day]");

	Map<String,String> calendarInfoMap = calendar.getInfo(context, busSelect);
	
	String calendarName = calendarInfoMap.get(ProgramCentralConstants.SELECT_NAME);
	
	String standardWorkHrs = calendarInfoMap.get("attribute[Working Time Per Day]");
	
	double dWork = Task.parseToDouble(standardWorkHrs);
	dWork = (dWork / 60);
	standardWorkHrs =  (dWork + ProgramCentralConstants.EMPTY_STRING);
	
	MapList events = calendar.getEvents(context);
	session.putValue("calendarEvents", events);
	//Get Workweek
	MapList mlWorkWeek = calendar.getWorkWeek(context);
	mlWorkWeek.sort("attribute[Title].value", "ascending", "integer");

	String displayLanguage = context.getLocale().getLanguage();
	String lblWorkweek = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.WorkWeek", displayLanguage);
	lblWorkweek = XSSUtil.encodeForXML(context,lblWorkweek);
	String lblExceptions = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.Exceptions", displayLanguage);
	lblExceptions = XSSUtil.encodeForXML(context,lblExceptions);
	String lblWorkException = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.DatePicker.Legend.WorkException", displayLanguage);
	String lblHoliday = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.DatePicker.Legend.Holiday", displayLanguage);
	String lblStandardWorkHours = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.Attribute.WorkTimePerDay", displayLanguage);
	String lblName = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.Common.Name", displayLanguage);
	
	
%>

<html lang="en">
<head>
	<link rel="stylesheet" href="../plugins/libs/jqueryui/1.10.3/css/jquery-ui.css">
	<link rel="stylesheet" href="../programcentral/styles/WorkCalendar.css">
	<script src="../common/scripts/jquery-1.9.1.js"></script>
	<script src="../plugins/libs/jqueryui/1.10.3/js/jquery-ui.js"></script>
	<script src="../programcentral/script/WorkCalendar.js"></script>
	<style>
		td {
			vertical-align:top;
		}
	</style>
  <script>
  var calendarId = '<%=objectId%>';
  var workWeekViewHeight = 550;
  var exceptionViewHeight = 550;
  $(function() {
	  	//maintain the order of invoke
		loadDatePicker(calendarId);
		displaySelectedDateInfo();
		loadCalendarEvents();
		loadEventCreateDialog();
  });

  function loadCalendarEvents(){
	  var calendarId = "<%=objectId%>";
	  var lblWorkweek = "<%=lblWorkweek%>";
	  var lblExceptions = "<%=lblExceptions%>";
	  var activeTabIndex = "<%=activeTabIndex%>";
	  
	  var workWeek = '<iframe id="WorkWeek" style="border:1px solid #BCBCBC; width:100%; height: ' + workWeekViewHeight + 'px;" src="../programcentral/WorkCalendarWeekSummary.jsp?&suiteKey=ProgramCentral&SuiteDirectory=programcentral&objectId=' + calendarId + '&parentOID=' + calendarId + '&activeTabIndex='+activeTabIndex+'"/> ';
	  var exceptions = '<iframe id="objCalendarExceptions" style="border:1px solid #BCBCBC; width:100%; height:' + exceptionViewHeight + 'px;" src="../common/emxIndentedTable.jsp?table=PMCWorkCalendarExceptions&program=emxWorkCalendar:getExceptions&toolbar=PMCWorkCalendarEventsToolbar&selection=multiple&HelpMarker=emxhelpcalendareventlist&suiteKey=Components&SuiteDirectory=components&multiColumnSort=false&objectCompare=false&editLink=false&hideLaunchButton=true&showClipboard=false&customize=false&displayView=details&rowGrouping=false&showPageURLIcon=false&findMxLink=false&showRMB=false&massPromoteDemote=false&objectId=' + calendarId + '&parentOID=' + calendarId + '"/> ';
	  
	  if(<%= ("workweek".equalsIgnoreCase(mode))%>){
	  $('#divWorkweek').html(workWeek);
	  }
	  
	 if(<%= ("event".equalsIgnoreCase(mode))%>){
	  $('#divCalendarEvents').html(exceptions);
  }
  }
	  
  function loadEventCreateDialog(){
	  $( "#divEventCreationDialog" ).dialog({
	      autoOpen: false,
	      height: 500,
	      width: 700,
	      modal: true,
	      show: {
	        duration: 200
	      },
	      hide: {
	        duration: 200
	      }
	    }).dialog("widget").find(".ui-dialog-titlebar").hide();
  }

  </script>
</head>

<body style="background:#EEEEEE;" height=100%>
	<table height="100%">
		<%
				if(("workweek".equalsIgnoreCase(mode)))
				{
				%>
		<tr>
			<td><div style="color:#5B5D5E;font-size:1.1em;margin-left:10px;margin-top:10px;margin-bottom:5px;"><b><%=lblName%>:</b> <%=calendarName%> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><%=lblStandardWorkHours%>:</b> <%=standardWorkHrs%></div></td>
			<td><div style="margin:10px;">&nbsp;</div></td>
		</tr>
		<%
				}
				%>
		<tr>
			<td>
				<%
				if(("workweek".equalsIgnoreCase(mode)))
				{
				%>
				<div style="margin-left:10px;" id="divWorkweek">&nbsp;</div>
				<%
				}
				else if(("event".equalsIgnoreCase(mode)))
				{
				%>
				<div style="color:#5B5D5E;font-size:1.1em;margin-left:10px;margin-top:5px;margin-bottom:5px;"><%=lblExceptions%></div>
				<div style="margin-left:10px;" id="divCalendarEvents">&nbsp;</div>
				<%
				}
				%>
			</td>				
			<td style="width:320px;">
				<div style="margin-left:12px;" id="datepicker"></div>
				<div style="width:277px;margin-left:10px;padding-top:5px;text-align:center;">
					<div style="display: inline-block;background: #1684C2; width:1em; height:1em; border: 0px #535C65 solid;">&nbsp;</div>&nbsp;<span style="font-size:0.9em;"><%=lblWorkException %></span> 
					<div style="display: inline-block;background: #FF8000; width:1em; height:1em; border: 0px #535C65 solid;">&nbsp;</div>&nbsp;<span style="font-size:0.9em;"><%=lblHoliday%></span>
				</div>	
				<hr style="margin-left:10px;margin-right:10px;">						
				<div style="margin-left:10px;" id="divEventInfoHeader">&nbsp;</div><br/>
				<div style="margin-left:10px;" id="divEventWorkHours">&nbsp;</div>
			</td>		
		</tr>
	</table>	
</body>
</html>
