<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@page import="com.matrixone.apps.common.WorkCalendar"%>
<%@include file="../emxUICommonAppInclude.inc"%>
<%@ include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../emxUICommonHeaderEndInclude.inc" %>
<%@include file = "../common/enoviaCSRFTokenInjection.inc"%>	  
<%@ include file = "../emxTagLibInclude.inc"%>

<%
	String calendarId = emxGetParameter(request, "objectId");
	calendarId = XSSUtil.encodeURLForServer(context, calendarId);
	//Get workweek
	WorkCalendar workCalendar = new WorkCalendar(calendarId);
	MapList mlWorkWeek = workCalendar.getWorkWeek(context);
	String activeTabIndex = emxGetParameter(request, "activeTabIndex");
	
	//Sort workweek.
	mlWorkWeek.sort("attribute[Title].value", "ascending", "integer");
	
	//Get First Working day in the workweek
	int firstWorkingDayIndex = 0;
	
	if(ProgramCentralUtil.isNotNullString(activeTabIndex)){
		firstWorkingDayIndex = (Integer.parseInt(activeTabIndex))-1;
	}else{
	for (Iterator iterator = mlWorkWeek.iterator(); iterator.hasNext();){
		Map weekDayInfo = (Map) iterator.next();
		String exceptionType = (String) weekDayInfo.get("attribute[Calendar Exception Type]");
		if("Working".equals(exceptionType)){
			break;
		}
		firstWorkingDayIndex++;
	}
	}
	
	String relId = DomainConstants.EMPTY_STRING;
	String exceptionType = DomainConstants.EMPTY_STRING;
	String dayOfWeek = DomainConstants.EMPTY_STRING;
	String dayOfWeekGlobalized = DomainConstants.EMPTY_STRING;
	int dayOfWeekIndex = 0;
	int tabIndex = 0;
	String displayLanguage= context.getLocale().getLanguage();
	StringList days = workCalendar.getDayOfWeekAttributeRange(context, Locale.ENGLISH.getLanguage());
	StringList daysGlobalized = workCalendar.getDayOfWeekAttributeRange(context, displayLanguage);
	StringList slWorkTimeMilitaryFormatRange = workCalendar.getWorkingTimeIntervals(WorkCalendar.TimeFormat.MILITARY);
	
	String lblWorkHours = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.WorkHours", displayLanguage);
	String lblLunchHours = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.LunchHours", displayLanguage);
	String lblWorking = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.Attribute.CalendarExceptionType.Range.Working", displayLanguage);
	String lblNonWorking = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.Attribute.CalendarExceptionType.Range.NonWorking", displayLanguage);
	String saveLable = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.Common.Save", displayLanguage);
	String saveAllLable = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.Button.SaveAll", displayLanguage);
	String cancelLable = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.Common.Cancel", displayLanguage);
	String lblDeleteRecess = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.DeleteRecess", displayLanguage);
    String lblAddRecess = ProgramCentralUtil.getPMCI18nString(context, "emxProgramCentral.WorkCalendar.AddRecess", displayLanguage);
	
	
	 
	
%>
<html lang="en-EN">
	<link rel="stylesheet" href="../plugins/libs/jqueryui/1.10.3/css/jquery-ui.css">
	<link rel="stylesheet" href="../programcentral/styles/WorkCalendar.css">
	<script src="../common/scripts/jquery-1.9.1.js"></script>
	<script src="../plugins/libs/jqueryui/1.10.3/js/jquery-ui.js"></script>
	<script src="../programcentral/script/WorkCalendar.js"></script>
	<script language="Javascript">
		var calendarId = "<%=calendarId%>";
		$(function(){
			$( "#tabs" ).tabs({
				active: <%=firstWorkingDayIndex%> 				
			}).addClass( "ui-tabs-vertical ui-helper-clearfix" );
		});
	</script>
	<style>
</style>
	<body>
		<div id="divWorkWeekView">
			<framework:ifExpr expr="<%= mlWorkWeek.size() > 0 %>">	
				<div id="tabs" class="tabs ui-tabs" style="background:#fff;border:none;">
					<ul class="ui-tabs-nav ui-tabs">
						<framework:mapListItr mapList="<%=mlWorkWeek%>" mapName="workWeekInfo">
						<%
			               	relId = (String) workWeekInfo.get("id");
							tabIndex ++ ;
			               	String tabId = "#tab" + "_" + relId;
			               	exceptionType = (String) workWeekInfo.get("attribute[Calendar Exception Type]");
			               	dayOfWeekIndex = Integer.parseInt((String)workWeekInfo.get("attribute[Title].value"));
			               	dayOfWeekIndex--;
			               	dayOfWeek = (String) days.get(dayOfWeekIndex);
			               	dayOfWeekGlobalized = (String)daysGlobalized.get(dayOfWeekIndex);
			               	dayOfWeekGlobalized = XSSUtil.encodeForHTML(context, dayOfWeekGlobalized);
			            %>			               	
						<li><b><a href="<%=XSSUtil.encodeForHTMLAttribute(context, tabId)%>"> <%=dayOfWeekGlobalized %></a></b></li>
						</framework:mapListItr>
					</ul>
					<% tabIndex = 0; %>
					<framework:mapListItr mapList="<%=mlWorkWeek%>" mapName="workWeekInfo">
						<%
							tabIndex ++ ;
			               	relId = (String) workWeekInfo.get("id");
							exceptionType = (String) workWeekInfo.get("attribute[Calendar Exception Type]");							
			               	dayOfWeekIndex = Integer.parseInt((String)workWeekInfo.get("attribute[Title].value"));
			               	
							               	int iStartTime = 0;
							               	int iFinishTime = 0;
							               	
							               	MapList recessStartEndMapList = new MapList();
							               	String workingTimes = (String)workWeekInfo.get(WorkCalendar.SELECT_WORKING_TIMES);
							               	StringList workingHoursStartEndTime = new StringList();
							    			StringList workingHours = FrameworkUtil.split(workingTimes, ",");
							    			for(int i=0,size=workingHours.size(); i<size; i++) {
							    				StringList startFinishTime = FrameworkUtil.split(workingHours.get(i), "-");
							    				workingHoursStartEndTime.addAll(startFinishTime);
							    				if(i==0){
							    					iStartTime = slWorkTimeMilitaryFormatRange.indexOf(startFinishTime.get(0).trim());
							    				}
							    				if(i==size-1){
							    					iFinishTime = slWorkTimeMilitaryFormatRange.indexOf(startFinishTime.get(1));
							    				}
							    			}
							    			
							    			int rstartTime = 0;
							    			int rfinishTime = 0;
							    			int workingHoursStartEndTimeSize = workingHoursStartEndTime.size();
							    			StringBuffer recessStartFinishStr =new StringBuffer();
							    			
							    			for(int i=1; (i+1)<workingHoursStartEndTimeSize; i++,i++) {
							    				Map recessMap = new HashMap<String,String>();
							    				rstartTime = Integer.parseInt(workingHoursStartEndTime.get(i));
							    				rfinishTime = Integer.parseInt(workingHoursStartEndTime.get(i+1));
							    				recessMap.put(WorkCalendar.RECESS_START_TIME, workingHoursStartEndTime.get(i));
							    				recessMap.put(WorkCalendar.RECESS_FINISH_TIME,workingHoursStartEndTime.get(i+1) );
							    				
							    				int s = slWorkTimeMilitaryFormatRange.indexOf((String)workingHoursStartEndTime.get(i));
							    				int f = slWorkTimeMilitaryFormatRange.indexOf((String)workingHoursStartEndTime.get(i+1));
							    							    				
							    				recessStartEndMapList.add(recessMap);
							    				recessStartFinishStr.append( s+"-"+ f+",");
							    			}
							    			
							    			if(recessStartFinishStr.length()>0){
							    				recessStartFinishStr.deleteCharAt(recessStartFinishStr.length() - 1);
							    			}
							    			String recesTimingsStr = recessStartFinishStr.toString();
			               	
			               	dayOfWeekIndex--;
			               	dayOfWeek = (String)days.get(dayOfWeekIndex);
			               	dayOfWeekGlobalized = (String)daysGlobalized.get(dayOfWeekIndex);
							String tabId = "tab" + "_" + relId;
											String tableId = "table" + "_" + relId;
							String inputId = "input" + tabIndex;
			               	String divExceptionType = "divExceptionType" + tabIndex;
			               	String exceptionTypeWorkingId = "exceptionTypeWorking" + "_" + relId; 
			               	String exceptionTypeNonWorkingId = "exceptionTypeNonWorking" + "_" + relId; 
							               	String saveAllWorkingHourId = "checkbox_saveAllWorkingHour" + "_" + tabIndex; 
			               	String radioGroup = "radioGroup" + tabIndex; 
			               	String divWorkHourId = "divWorkHours" + tabIndex; 
			               	String divLunchHourId = "divLunchHours" + tabIndex;
							               	String formId = "form" + tabIndex;
							               	String addButtonId = "button_AddRecess" + tabIndex;
							               	String saveButtonId = "button_save" + tabIndex;
							               	String saveAllButtonId = "button_saveAll" + tabIndex;
							               	String deleteButtonId = "button_deleteRecess" + tabIndex;
							               	String activeTabIndexForEdit = "" + (tabIndex);
						%>
						
						<div  id="<%=XSSUtil.encodeForHTMLAttribute(context, tabId)%>">
							<table style="margin:1px;border:1px solid #BCBCBC;" id="<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>">
								<tr>
									<td class="label" width="120px"><%=dayOfWeekGlobalized%></td>
									<td class="field" width="500px">
										<div id="<%=divExceptionType%>">
											<framework:ifExpr expr='<%="Working".equalsIgnoreCase(exceptionType)%>'>
												<input type="radio" id="<%=exceptionTypeNonWorkingId%>" value="Non Working" name="<%=radioGroup%>"><label class="label" for="<%=exceptionTypeNonWorkingId%>"><%=XSSUtil.encodeForXML(context, lblNonWorking)%></label>
												<input type="radio" id="<%=exceptionTypeWorkingId%>" value="Working" name="<%=radioGroup%>" checked="checked"><label class="label" for="<%=exceptionTypeWorkingId%>"><%=XSSUtil.encodeForXML(context, lblWorking)%></label>
											</framework:ifExpr>
											<framework:ifExpr expr='<%="Non Working".equalsIgnoreCase(exceptionType)%>'>
												<input type="radio" id="<%=exceptionTypeNonWorkingId%>" value="Non Working" name="<%=radioGroup%>" checked="checked"><label class="label" for="<%=exceptionTypeNonWorkingId%>"><%=XSSUtil.encodeForXML(context, lblNonWorking)%></label>
												<input type="radio" id="<%=exceptionTypeWorkingId%>" value="Working" name="<%=radioGroup%>"><label class="label" for="<%=exceptionTypeWorkingId%>"><%=XSSUtil.encodeForXML(context, lblWorking)%></label>
											</framework:ifExpr>
										</div>
										<script>
											var divExceptionType = '<%=divExceptionType%>';
											var radioGroup = '<%=radioGroup%>';
											$("#" + divExceptionType ).buttonset();
											//Change in exception mode 
											$("input[name=" + radioGroup + " ]").change(function(){
												var radioId = this.id;
												var newExceptionType = this.value;
												var idParts = radioId.split("_");
												var relId = idParts[1];
												updateExceptionType(calendarId, relId, newExceptionType);
												
												var divExceptionType = this.parentElement.id;
												var size = divExceptionType.length;
												size = size-1;
												var index = divExceptionType.charAt(size);
												toggleSliderState(index, '<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>');
											});														
										</script>
									</td>
									<td class="field">&nbsp;</td>
								</tr>
								<tr>
									<td class="label"><%=lblWorkHours %></td>
									<td class="field">
										<br/><br/>
										<div id="<%=divWorkHourId%>" value="<%=relId%>"></div>
									</td>
									<td class="field">&nbsp;&nbsp;&nbsp;&nbsp;
									
									</td>
								</tr>
								<tr>
									<td class="label"><%=lblLunchHours%></td>
									<td class="field">
									</td>
									<td class="field">
									<%
										if(("Non Working".equalsIgnoreCase(exceptionType)))
												{
									%>
										<button id='<%=XSSUtil.encodeForHTMLAttribute(context, addButtonId)%>' onclick="add(this,'<%=XSSUtil.encodeForHTMLAttribute(context, lblLunchHours)%>','null','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>',calendarId)"  disabled><img src="../common/images/I_WorkCalendarAddRecess_32.png" alt="<%=XSSUtil.encodeForHTMLAttribute(context, lblAddRecess)%>" title="<%=XSSUtil.encodeForHTMLAttribute(context, lblAddRecess)%>" width="20" height="20"/></button>
										<%
										} else{
									%>
									<button id='<%=XSSUtil.encodeForHTMLAttribute(context, addButtonId)%>' onclick="add(this,'<%=XSSUtil.encodeForHTMLAttribute(context, lblLunchHours)%>','null','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>',calendarId)"  ><img src="../common/images/I_WorkCalendarAddRecess_32.png" alt="<%=XSSUtil.encodeForHTMLAttribute(context, lblAddRecess)%>" title="<%=XSSUtil.encodeForHTMLAttribute(context, lblAddRecess)%>" width="20" height="20"/></button>
									<%
										}
									%>
									</td>
								</tr>
								<%
								for(int i=0; i<recessStartEndMapList.size(); i++) {
									String divId = divLunchHourId+ "_" +i;
									String deleteId = deleteButtonId+ "_" +i;
									%>
									
									<tr>
									<td class="label"></td>
									<td class="field">
										<br/>
										<div id="<%=divId%>" value="<%=relId%>"></div>
									</td>
									<%
										if(("Non Working".equalsIgnoreCase(exceptionType)))
												{
									%>
										<td class="field"><br/><button id="<%=deleteId%>"  onclick="deleteRecess(this,'<%=XSSUtil.encodeForHTMLAttribute(context, tabId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>',calendarId,'<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>')" disabled><img src="../common/images/iconActionRemove.png" alt="<%=XSSUtil.encodeForHTMLAttribute(context, lblDeleteRecess)%>"  title="<%=XSSUtil.encodeForHTMLAttribute(context, lblDeleteRecess)%>" width="20" height="20"/></button></td>
										<%
										} else{
									%>
									<td class="field"><br/><button id="<%=deleteId%>" onclick="deleteRecess(this,'<%=XSSUtil.encodeForHTMLAttribute(context, tabId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>',calendarId,'<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>')"><img src="../common/images/iconActionRemove.png" alt="<%=XSSUtil.encodeForHTMLAttribute(context, lblDeleteRecess)%>"  title="<%=XSSUtil.encodeForHTMLAttribute(context, lblDeleteRecess)%>" width="20" height="20"/></button></td>
									<%
										}
									%>
									</tr>
									
								<%
									}
								
								if(recessStartEndMapList.size() == 0){
									String divId = divLunchHourId+ "_0" ;
									String deleteId = deleteButtonId+ "_0";
								%>
									
									<tr>
									<td class="label"></td>
									<td class="field">
										<br/>
										<div id="<%=divId%>" value="<%=relId%>"></div>
									</td>
									<%
										if(("Non Working".equalsIgnoreCase(exceptionType)))
												{
									%>
										<td class="field"><br/><button id="<%=deleteId%>"  onclick="deleteRecess(this,'<%=XSSUtil.encodeForHTMLAttribute(context, tabId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>',calendarId,'<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>')" disabled><img src="../common/images/iconActionRemove.png" alt="<%=XSSUtil.encodeForHTMLAttribute(context, lblDeleteRecess)%>"  title="<%=XSSUtil.encodeForHTMLAttribute(context, lblDeleteRecess)%>" width="20" height="20"/></button></td>
										<%
										} else{
									%>
									<td class="field"><br/><button id="<%=deleteId%>" onclick="deleteRecess(this,'<%=XSSUtil.encodeForHTMLAttribute(context, tabId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>',calendarId,'<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>')"><img src="../common/images/iconActionRemove.png" alt="<%=XSSUtil.encodeForHTMLAttribute(context, lblDeleteRecess)%>"  title="<%=XSSUtil.encodeForHTMLAttribute(context, lblDeleteRecess)%>" width="20" height="20"/></button></td>
									<%
										}
									%>
									</tr>
									
								<%
									
								}
								
								%>
								
								<tr style="height: 60px">
								<td class="label"></td>
								<td class="field" style="text-align:right; vertical-align: bottom">
								<button id="<%=XSSUtil.encodeForHTMLAttribute(context, saveButtonId)%>" class="btn-primary"  onclick="saveChanges(calendarId,'<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, divExceptionType)%>','<%=XSSUtil.encodeForHTMLAttribute(context, activeTabIndexForEdit)%>',false)"><%=saveLable%></button>
							&nbsp;
							<%
										if(("Non Working".equalsIgnoreCase(exceptionType)))
												{
									%>
							<button id="<%=XSSUtil.encodeForHTMLAttribute(context, saveAllButtonId)%>" class="btn-default"  onclick="saveChanges(calendarId,'<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, divExceptionType)%>','<%=XSSUtil.encodeForHTMLAttribute(context, activeTabIndexForEdit)%>',true)" disabled><%=saveAllLable%></button>
							<%
												} 
										else{
							%>
							<button id="<%=XSSUtil.encodeForHTMLAttribute(context, saveAllButtonId)%>" class="btn-default"  onclick="saveChanges(calendarId,'<%=XSSUtil.encodeForHTMLAttribute(context, relId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, divExceptionType)%>','<%=XSSUtil.encodeForHTMLAttribute(context, activeTabIndexForEdit)%>',true)"><%=saveAllLable%></button>
							<%
										}
							%>
							
								</td>
								<td class="field" style="text-align:left; vertical-align: bottom">
							<button class="btn-default"  onclick="cancelChanges(calendarId,'<%=XSSUtil.encodeForHTMLAttribute(context, tabId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, tableId)%>','<%=XSSUtil.encodeForHTMLAttribute(context, activeTabIndexForEdit)%>')"><%=cancelLable%></button>
									</td>
								</tr>
								
								
								
							
								
							</table>
							
						</div>
						
											<script>
												var relId = '<%=relId%>';
												var criteria = '*[id^="'+'<%=divLunchHourId%>'+'"]';
												var divLunchHoursElements = document.querySelectorAll(criteria);
							var divWorkHourId = '<%=divWorkHourId%>';
							var workStartTime = <%=iStartTime%>;
							var workFinishTime = <%=iFinishTime%>;
												var divLunchHourId = '<%=divLunchHourId%>';
							
												var recessStartEndTimes= '<%=recesTimingsStr%>';

												var disabled = <%= ("Non Working".equalsIgnoreCase(exceptionType))?true:false %>;
												var lunchHourId ;
												
												if(recessStartEndTimes == ""){
													lunchHourId = divLunchHoursElements[0].id;
													var midPoint = (workStartTime + workFinishTime)/2 ;
													var noRecessStartEndTime = Math.floor(midPoint) -1;
													  
													options = {"mode": "Lunch Hours", "values": [noRecessStartEndTime, noRecessStartEndTime], "disabled": disabled};
													loadTimeSlider(calendarId, relId, lunchHourId, divWorkHourId,null, options, '<%=tableId%>');
												}
												else{
													var length = divLunchHoursElements.length;
											
													var recessArr = recessStartEndTimes.split(",");
													
					 								for(var i=0;i<length;i++){
					 			 						lunchHourId = divLunchHoursElements[i].id;
					 									var recessTimeStr = recessArr[i];
					 									var recessTimeArr = recessTimeStr.split("-");
					 			 
					 									options = {"mode": "Lunch Hours", "values": [recessTimeArr[0], recessTimeArr[1]], "disabled": disabled};
														loadTimeSlider(calendarId, relId, lunchHourId, divWorkHourId,null, options, '<%=tableId%>');
					 			 
					 	 		
					 								}
												}

							//Work Slider 
							var options = {"mode": "Work Hours", "values": [workStartTime, workFinishTime], "disabled": disabled};
											loadTimeSlider(calendarId, relId, divWorkHourId, lunchHourId,null, options,'<%=tableId%>');
											</script>

					</framework:mapListItr>
				</div>		
			</framework:ifExpr>							
		</div>
	</body>	
</html>
