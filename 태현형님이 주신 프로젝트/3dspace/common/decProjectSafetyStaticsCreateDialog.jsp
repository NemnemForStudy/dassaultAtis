<%--  emxCollectionsEditDialog.jsp   - Dialog page to take input for editing a Collection.

   Copyright (c) 2003-2020 Dassault Systemes.All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or intended publication of such program

   decCreateSafetyStaticsDialog.jsp
   Created By thok 2023-05-26
--%>
   
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "emxCompCommonUtilAppInclude.inc"%>
<%@include file = "emxUIConstantsInclude.inc"%>
<%@page import="com.matrixone.apps.domain.util.SetUtil,
                com.matrixone.apps.domain.util.XSSUtil"
%>
<%@include file = "../emxTagLibInclude.inc" %>

<script language="JavaScript" src="scripts/emxUICollections.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript" src="../common/scripts/emxUICalendar.js"></script>
<%@include file = "../emxUICommonHeaderBeginInclude.inc"%>
<%@include file = "../emxJSValidation.inc" %>

<%
  String languageStr = request.getHeader("Accept-Language");
  String jsTreeID    = emxGetParameter(request,"jsTreeID");
  String suiteKey    = emxGetParameter(request,"suiteKey");
  String strSetId = emxGetParameter(request, "relId");
  String objectName = SetUtil.getCollectionName(context, strSetId);
  String sCharSet    = Framework.getCharacterEncoding(request);

  String yearLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Common.Year", context.getSession().getLanguage()) + " ";
  String monthLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Common.Month", context.getSession().getLanguage()) + " ";
  String weekLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Label.cutOffWeek", context.getSession().getLanguage());
 %>
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script language="Javascript" >
  function cancelMethod()
  {
	  getTopWindow().closeSlideInDialog();
  }
  var originalName = "<%=objectName%>";//XSSOK
  function doneMethod()
  {
     var cutOffDate = document.editForm.cutOffDate;
     cutOffDate = cutOffDate.value;

     var noAccidentHour = document.editForm.noAccidentHour; 
     noAccidentHour = noAccidentHour.value;
     
     var death = document.editForm.death; 
     death = death.value;
     
     var injury = document.editForm.injury; 
     injury = injury.value;
     
     var nearMiss = document.editForm.nearMiss; 
     nearMiss = nearMiss.value;
     
     var uaUc = document.editForm.uaUc; 
     uaUc = uaUc.value;
     
     var peopleInput = document.editForm.peopleInput; 
     peopleInput = peopleInput.value;
     
     //validate that all required fields are entered
     if(cutOffDate==null || cutOffDate=="") {
        alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.input.typeCutOffDate</emxUtil:i18nScript>");
        document.editForm.cutOffDate.focus();
        return;
     } else if(noAccidentHour==null || noAccidentHour=="") {
         alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.input.typeNoAccidentHour</emxUtil:i18nScript>");
         document.editForm.noAccidentHour.focus();
         return;
     } else if(death==null || death=="") {
         alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.input.typeDeath</emxUtil:i18nScript>");
         document.editForm.death.focus();
         return;
     } else if(injury==null || injury=="") {
         alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.input.typeInjury</emxUtil:i18nScript>");
         document.editForm.injury.focus();
         return;
     } else if(nearMiss==null || nearMiss=="") {
         alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.input.typeNearMiss</emxUtil:i18nScript>");
         document.editForm.nearMiss.focus();
         return;
     } else if(uaUc==null || uaUc=="") {
         alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.input.typeUaUc</emxUtil:i18nScript>");
         document.editForm.uaUc.focus();
         return;
     } else if(peopleInput==null || peopleInput=="") {
         alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.input.typePeopleInput</emxUtil:i18nScript>");
         document.editForm.peopleInput.focus();
         return;
     } else {
        document.editForm.submit();
     }
  }
  
  
  function weekNumberByMonth() {
	var dateFormat = document.editForm.cutOffDate;
    const inputDate = new Date(dateFormat.value);
    
    // 인풋의 년, 월
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;
   
    // 목요일 기준 주차 구하기
    const weekNumberByThurFnc = (paramDate) => {
   
      const year = paramDate.getFullYear();
      const month = paramDate.getMonth();
      const date = paramDate.getDate();
   
      // 인풋한 달의 첫 날과 마지막 날의 요일
      const firstDate = new Date(year, month, 1);
      const lastDate = new Date(year, month+1, 0);
      const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
      const lastDayOfweek = lastDate.getDay();
   
      // 인풋한 달의 마지막 일
      const lastDay = lastDate.getDate();
   
      // 첫 날의 요일이 금, 토, 일요일 이라면 true
      const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
      // 마지막 날의 요일이 월, 화, 수라면 true
      const lastWeekCheck = lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;
   
      // 해당 달이 총 몇주까지 있는지
      const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);
   
      // 날짜 기준으로 몇주차 인지
      let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);
   
      // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
      if(weekNo === 1 && firstWeekCheck) weekNo = 'prev';
      // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
      else if(weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next';
      // 인풋한 날짜의 첫 주는 아니지만 첫날이 월, 화 수로 시작하면 -1;
      else if(firstWeekCheck) weekNo = weekNo -1;
   
      return weekNo;
    };
   
    // 목요일 기준의 주차
    let weekNo = weekNumberByThurFnc(inputDate);
   
    // 이전달의 마지막 주차일 떄
    if(weekNo === 'prev') {
      // 이전 달의 마지막날
      const afterDate = new Date(year, month-1, 0);
      year = month === 1 ? year - 1 : year;
      month = month === 1 ? 12 : month - 1;
      weekNo = weekNumberByThurFnc(afterDate);
    }
    // 다음달의 첫 주차일 때
    if(weekNo === 'next') {
      year = month === 12 ? year + 1 : year;
      month = month === 12 ? 1 : month + 1;
      weekNo = 1;
    }
    document.editForm.year.value = year;
    document.editForm.month.value = month;
    document.editForm.week.value = weekNo;
    
    var cutOffWeek = year + '<%=yearLabel%>' + month + '<%=monthLabel%>' + weekNo + '<%=weekLabel%>';
    
    $("#cutOffWeek").text(cutOffWeek);
    
    document.editForm.noAccidentHour.value = '0';
	document.editForm.death.value = '0';
	document.editForm.injury.value = '0';
	document.editForm.nearMiss.value = '0';
	document.editForm.uaUc.value = '0';
	document.editForm.peopleInput.value = '0';
    
    var objectId = document.editForm.objId.value;
	var date = document.editForm.cutOffDate_msvalue.value;
	
	$.ajax({
		url : "./decProjectDBSelectSafetyStatics.jsp",
		type : "post",
		data : {"year" : year, "month" : month, "weekNo" : weekNo, "objectId" : objectId, "date" : date},
		dataType : "text",
		success : function(response){
			 var closingBraceIndex = response.lastIndexOf('}');
		     var trimmedResponse = response.substring(0, closingBraceIndex + 1);
		     var obj = JSON.parse(trimmedResponse);
		     if(obj.Data!="Empty"){
		    	 var confirmMsg = confirm("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.alarm.changeWeekData</emxUtil:i18nScript>");
		    	 if(confirmMsg){
		    		 document.editForm.noAccidentHour.value = obj.NO_ACCIDENT_HOUR;
		    		 document.editForm.death.value = obj.DEATH;
		    		 document.editForm.injury.value = obj.INJURY;
		    		 document.editForm.nearMiss.value = obj.NEAR_MISS;
		    		 document.editForm.uaUc.value = obj.PEOPLE_INPUT;
		    		 document.editForm.peopleInput.value = obj.PEOPLE_INPUT;
		    	 }
		     } else {
		    	 document.editForm.noAccidentHour.value = '0';
	    		 document.editForm.death.value = '0';
	    		 document.editForm.injury.value = '0';
	    		 document.editForm.nearMiss.value = '0';
	    		 document.editForm.uaUc.value = '0';
	    		 document.editForm.peopleInput.value = '0';
		     }
		}
	});
  }
  function dateClear(){
	  document.editForm.cutOffDate.value = '';
	  document.editForm.year.value = '';
	  document.editForm.month.value = '';
	  document.editForm.week.value = '';
	  document.editForm.noAccidentHour.value = '0';
	  document.editForm.death.value = '0';
	  document.editForm.injury.value = '0';
	  document.editForm.nearMiss.value = '0';
	  document.editForm.uaUc.value = '0';
	  document.editForm.peopleInput.value = '0';
	  $("#cutOffWeek").text("");
  }
</script>
<%@include file = "../emxUICommonHeaderEndInclude.inc" %>
<%

    long collectionCnt = SetUtil.getCount(context, objectName);

    // ----------- set up the url to do the edit and refresh itself.
    StringBuffer editURL = new StringBuffer("decProjectSafetyStaticsCreateProcess.jsp?objectName=");
    
    editURL.append(XSSUtil.encodeForURL(context, objectName));
    editURL.append("&jsTreeID=");
    editURL.append(XSSUtil.encodeForURL(context,jsTreeID));
    editURL.append("&suiteKey=");
    editURL.append(XSSUtil.encodeForURL(context, suiteKey));
    editURL.append("&relId=");
    editURL.append(XSSUtil.encodeForURL(context,strSetId));
%>
<!-- \\XSSOK -->
<form name="editForm"  target="pagehidden" method="post" onsubmit="doneMethod(); return false" action="<%=editURL.toString()%>">
<table border="0" width="100%" cellpadding="5" cellspacing="2">
  <input type="hidden" name="objId" value="<%=strSetId%>">
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.cutOffDate</emxUtil:i18n></td>
    <td class="inputField"><input type="text" name="cutOffDate" value="" onFocus="this.select()" readonly/><!-- XSSOK -->
    <input type="hidden" name="cutOffDate_msvalue"/>
    <a href="javascript:showCalendar('editForm', 'cutOffDate', '', '', weekNumberByMonth);" name="cutOffDate_date" id="formDateChooser"><img border="0" alt="Date Picker" src="../common/images/iconSmallCalendar.gif"></a>
    	<a class = "dialogClear" href = "javascript:;" onclick = "javascript:dateClear();">
				<emxUtil:i18n localize="i18nId">emxProgramCentral.Common.Clear</emxUtil:i18n>
		</a>
	</td>
  </tr>
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.cutOffWeek</emxUtil:i18n></td>
    <td class="field" id="cutOffWeek"></td>
    <input type="hidden" name="year">
    <input type="hidden" name="month">
    <input type="hidden" name="week">
  </tr>
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.noAccidentHour</emxUtil:i18n></td>
    <td class="inputField"><input type="text" name="noAccidentHour" value="0" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="" onFocus="this.select()"/><!-- XSSOK --></td>
  </tr>
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.death</emxUtil:i18n></td>
    <td class="inputField"><input type="text" name="death" value="0" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="" onFocus="this.select()"/><!-- XSSOK --></td>
  </tr>
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.injury</emxUtil:i18n></td>
    <td class="inputField"><input type="text" name="injury" value="0" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="" onFocus="this.select()"/><!-- XSSOK --></td>
  </tr>
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.nearMiss</emxUtil:i18n></td>
    <td class="inputField"><input type="text" name="nearMiss" value="0" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="" onFocus="this.select()"/><!-- XSSOK --></td>
  </tr>
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.uaUc</emxUtil:i18n></td>
    <td class="inputField"><input type="text" name="uaUc" value="0" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="" onFocus="this.select()"/><!-- XSSOK --></td>
  </tr>
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.peopleInput</emxUtil:i18n></td>
    <td class="inputField"><input type="text" name="peopleInput" value="0" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="" onFocus="this.select()"/><!-- XSSOK --></td>
  </tr>
</table>
</form>

<%@include file = "../emxUICommonEndOfPageInclude.inc" %>
