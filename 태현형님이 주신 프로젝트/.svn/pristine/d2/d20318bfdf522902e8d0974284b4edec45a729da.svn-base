//////////////////////////////Slider control///////////////////////////////////////
var url = "../programcentral/WorkCalendarUtil.jsp?mode=getWorkingHourRange";
var workingHourRange = emxUICore.getData(url);
var sTimeRange = emxUICore.parseJSON(workingHourRange);
var ssTimeRange = sTimeRange["workingHourRange"];
var steps = ssTimeRange.split(",");

var warningOverlapRecessTimes = sTimeRange["warningOverlapRecessTimes"];
var warningMaximumRecess = sTimeRange["warningMaximumRecess"];
var warningOverlapWorkHourRecessTimes = sTimeRange["warningOverlapWorkHourRecessTimes"];
var confirmDeleteLastRecess = sTimeRange["confirmDeleteLastRecess"];
var confirmApplyToAllWorkingDays = sTimeRange["confirmApplyToAllWorkingDays"];
var deleteRecessLabel = sTimeRange["deleteRecessLabel"];

function loadTimeSlider(calendarId, relId, activeSliderId, otherSliderId, workSliderId,  options, tableId){
	var mode;
	var min;
	var max;
	var values;
	var disabled;
    if (options !== null && options !== undefined) { 
    	mode = options["mode"];
    	min = options["min"];
    	max = options["max"];
    	values = options["values"];
    	disabled = options["disabled"];
    }
    if (min == null && min == undefined) { 
    	min = 0;
    }
    if (max == null && max == undefined) { 
    	max = 48;
    }
    if (disabled == null && disabled == undefined) { 
    	disabled = false;
    }
    if (values == null && values == undefined) { 
    	value = [18, 36];
    }

	var activeSlider = "#" + activeSliderId;
	var otherSlider = "#" + otherSliderId;
	
	var workSlider = null;
	if(workSliderId){
		workSlider = "#" + workSliderId;
	}
	
	
	var nextSliderId;
	var nextSliderMode;
	var previousSliderId;
	var previousSliderMode;
	
	$(activeSlider).slider({
		range: true,
		step: 1,
		min: min,
		max: max,
		values: values,
		disabled: disabled,
		slide: function (event, ui) {
			var workStart;
			var workFinish;
			var recessStart;
			var recessFinish;

			var minIndex = parseInt(ui.values[0], 10);
			var maxIndex = parseInt(ui.values[1], 10);

			var selectedHours = $( otherSlider ).slider( "option", "values" );
			
				if(mode === "Work Hours"){
					recessStart = parseInt(selectedHours[0], 10);//if deleted 1st slider, it will come as undefine
					recessFinish = parseInt(selectedHours[1], 10);
					var tableIdSelector = "#" + tableId;
					var tableElement = document.getElementById(tableId);
					var divLunchElements = tableElement.querySelectorAll('*[id^="divLunchHours"]');
					for(var i=0; i <divLunchElements.length; i++){
						
						var lunchSelectorId = "#" + divLunchElements[i].id;
						var recessHrs = $( lunchSelectorId ).slider( "option", "values" );
						
						if(parseInt(recessHrs[0], 10) < recessStart || !recessStart){ 
							recessStart = parseInt(recessHrs[0], 10);
						}
						if(parseInt(recessHrs[1], 10) > recessFinish || !recessFinish){
							recessFinish =parseInt(recessHrs[1], 10);
						}
					}
					
				workStart = minIndex;
				workFinish = maxIndex;
				
			}else if (mode === "Lunch Hours"){
				
				workStart = parseInt(selectedHours[0],10);
				workFinish = parseInt(selectedHours[1], 10);
				recessStart = minIndex;
				recessFinish = maxIndex;
				if(workSlider){
					var workingHours = $( workSlider ).slider( "option", "values" );
					workStart = parseInt(selectedHours[1],10);
					workFinish = parseInt(workingHours[1],10);
				}else{
					workStart = parseInt(selectedHours[0],10);
					workFinish = parseInt(selectedHours[1],10);
				}
				
				
			}
			if( recessStart < workStart || recessFinish > workFinish){
		      	//alert("Recess hours must fall within Work hours");
				return false;
			}
			if(minIndex == maxIndex && mode === "Work Hours"){
				return false;
			}
			setSliderTooltip(activeSliderId, ui.values);
		},
		change: function( event, ui ) {
			//var attrValue = this.attributes["value"].value;
			if (relId != null && relId !== undefined) {
				var minIndex = ui.values[0];
				var maxIndex = ui.values[1];
				var startTime = steps[minIndex];
				var finishTime = steps[maxIndex];
				if(mode === "Lunch Hours"){
					var tableId = "table_"+relId;
					//if(validateRecessTimes(tableId)){
					//updateLunchHours(calendarId, relId, startTime, finishTime);	
					//}
				}else if(mode === "Work Hours"){
					//updateWorkHours(calendarId, relId, startTime, finishTime);	
				}
			}
		}
		
	});
	values = $( activeSlider ).slider( "option", "values" );
	setSliderTooltip(activeSliderId, values);
}
function setSliderTooltip(sliderId, values){
	var sliderSelector = "#" + sliderId;
	var minIndex = values[0];
	var maxIndex = values[1];
	var diff = maxIndex - minIndex;
		if(diff == 0){
			$(sliderSelector + ' .ui-slider-handle:first').html('<div class="tooltip"><div class="tooltip-inner">' + 'No Recess' + '</div></div>');
			$(sliderSelector + ' .ui-slider-handle:last').html('');
	}else if(diff > 5){
			$(sliderSelector + ' .ui-slider-handle:first').html('<div class="tooltip"><div class="tooltip-inner">' + steps[minIndex] + '</div></div>');
			$(sliderSelector + ' .ui-slider-handle:last').html('<div class="tooltip"><div class="tooltip-inner">' + steps[maxIndex] + '</div></div>');
		}else{
			var range = steps[minIndex] + " - " + steps[maxIndex];
			$(sliderSelector + ' .ui-slider-handle:first').html('<div class="tooltip-range"><div class="tooltip-inner">' + range + '</div></div>');
			$(sliderSelector + ' .ui-slider-handle:last').html('');					
		}
	
}

var toggleSliderState = function (index,tableId){
	var workHourSliderSelector = "#divWorkHours" + index;
	var lunchHourSliderSelector = "#divLunchHours" + index;
	var isDisabled = $(workHourSliderSelector).slider("option", "disabled");
	var divLunchHoursElements;
	var addButtonElements;
	var deleteButtonElements;
	var saveButtonElements;
	var saveButtonId;
	var saveAllButtonElement;
	if(tableId){
		var tableElement = document.getElementById(tableId);
		divLunchHoursElements = tableElement.querySelectorAll('*[id^="divLunchHours"]');
		addButtonElements = tableElement.querySelectorAll('*[id^="button_AddRecess"]');
		deleteButtonElements = tableElement.querySelectorAll('*[id^="button_deleteRecess"]');
		saveAllButtonElement = tableElement.querySelectorAll('*[id^="button_saveAll"]');
	}else{
		divLunchHoursElements = document.querySelectorAll('*[id^="divLunchHours"]');
	}
	
	var disable = true;
	if(isDisabled){
		disable = false;
	}
	
	$(workHourSliderSelector).slider("option", "disabled", disable);
	$(lunchHourSliderSelector).slider("option", "disabled", disable);		
	
	if(addButtonElements){
		var addButtonId = "#"+addButtonElements[0].id;
		$(addButtonId).prop('disabled', disable);
	}
	
	if(saveAllButtonElement){
		var saveAllButtonElementId = "#"+saveAllButtonElement[0].id;
		$(saveAllButtonElementId).prop('disabled', disable);
	}
	
	for(var i =0; i< divLunchHoursElements.length; i++){
		var recessId = "#"+divLunchHoursElements[i].id;
		$(recessId).slider("option", "disabled", disable);
		var deleteButtonId = "#"+deleteButtonElements[i].id;
		$(deleteButtonId).prop('disabled', disable);
	}
	
}

////////////Workweek Fields////////////////////////////////////////

function updateExceptionType (calendarId, eventRelId, newExceptionType){
	var relId = eventRelId;
	//Append a unique number to avoid caching in IE
	var date = new Date();
	var uniqueNumber = date.getMilliseconds();
	//var url = "../programcentral/WorkCalendarUtil.jsp?mode=updateWorkWeek&newExceptionType=" + newExceptionType + "&objectId=" + calendarId + "&relId=" + relId + "&uniqueNumber=" + uniqueNumber;
	//var response = emxUICore.getData(url);
	var target = window.parent;	
	refreshDatePicker(calendarId, target);
	displaySelectedDateInfo(new Date(), target);
}
function updateWorkHours(calendarId, eventRelId, startTime, finishTime){
	//Append a unique number to avoid caching in IE
	var date = new Date();
	var uniqueNumber = date.getMilliseconds();
	var tableId = "table_"+eventRelId;
	
	var workingTimes = getSortedWorkingHours(tableId);
	var url = "../programcentral/WorkCalendarUtil.jsp?mode=updateWorkWeek&startTime=" + startTime + "&finishTime=" + finishTime + "&objectId=" + calendarId + "&relId=" + eventRelId + "&uniqueNumber=" + uniqueNumber  + "&workingTimes=" + workingTimes;
	var response = emxUICore.getData(url);
	var target = window.parent;	
	refreshDatePicker(calendarId, target);
	displaySelectedDateInfo(new Date(), target);
}
function updateLunchHours(calendarId, eventRelId, startTime, finishTime){
	//Append a unique number to avoid caching in IE
	var date = new Date();
	var tableId = "table_"+eventRelId;
	var workingTimes = getSortedWorkingHours(tableId);
	var uniqueNumber = date.getMilliseconds();
	var url = "../programcentral/WorkCalendarUtil.jsp?mode=updateWorkWeek&lunchStartTime=" + startTime + "&lunchFinishTime=" + finishTime + "&objectId=" + calendarId +  "&relId=" + eventRelId + "&uniqueNumber=" + uniqueNumber + "&workingTimes=" + workingTimes;
	var response = emxUICore.getData(url);
	var target = window.parent;	
	refreshDatePicker(calendarId, target);
	displaySelectedDateInfo(new Date(), target);
}



function saveChanges(calendarId,relId,tableId,exceptionTypeId, activeTabIndex, saveAllWorkingHour){
	if(relId && calendarId){
		var exceptionElement = document.getElementById(exceptionTypeId);	
		var newExceptionType = exceptionElement.getElementsByTagName("input")[0].value;
		var isChecked=	exceptionElement.getElementsByTagName("input")[1].checked;
		if(isChecked){
			newExceptionType = exceptionElement.getElementsByTagName("input")[1].value;
		}
		var date = new Date();
		var tableId = "table_"+relId;
		var workingTimes = getSortedWorkingHours(tableId);
	var uniqueNumber = date.getMilliseconds();
		var relIds  = "";
		
		if("Non Working" === newExceptionType){
			relIds = relId;
			//var url = "../programcentral/WorkCalendarUtil.jsp?mode=updateWorkWeek&objectId=" + calendarId +  "&relId=" + relId +  "&relIds=" + relIds + "&uniqueNumber=" + uniqueNumber + "&newExceptionType=" + newExceptionType ;
			var url = "../programcentral/WorkCalendarUtil.jsp?mode=updateWorkWeek&objectId=" + calendarId +  "&relIds=" + relIds + "&uniqueNumber=" + uniqueNumber + "&newExceptionType=" + newExceptionType ;
			var response = emxUICore.getData(url);
			var target = window.parent;	
			refreshDatePicker(calendarId, target);
			displaySelectedDateInfo(new Date(), target);
			//reloadActiveTab(activeTabIndex);
			topFrame = findFrame(getTopWindow(), "detailsDisplay");
			var url = topFrame.location.href;
			var strUrl = url.split("&activeTabIndex");
			url = strUrl[0] + "&activeTabIndex=" + activeTabIndex;
			topFrame.location.href = url; 		
		} else if(validateRecessTimes(tableId)){
			
			var contextDayId = "";
			var applyToAll = true;
		    if(saveAllWorkingHour){
		    	applyToAll = confirm(confirmApplyToAllWorkingDays);
		    }
		    
		    if(applyToAll){
		    	if(saveAllWorkingHour){
					var tableElement = document.querySelectorAll('*[id^="table_"]');
					
					for(var i=0; i< tableElement.length; i++){
						var exceptionElement = tableElement[i].querySelectorAll('*[id^="exceptionTypeWorking"]');
						//var isWorkingException = exceptionElement[0].checked;
						//if(isWorkingException){
							var workingTimesTemp = getSortedWorkingHours(tableElement[i].id);
							var tableId = tableElement[i].id;
							var r = tableId.split("table_");
							//relArr.push(r[1]);
							relIds += r[1] +"|";
						//}
					}
					relIds = relIds.slice(0, -1); 
					contextDayId = relId;
				}
				else{
					relIds = relId; 
				}
        
        workingTimes = encodeURIComponent(workingTimes);
        relIds  = encodeURIComponent(relIds);
				
				//var url = "../programcentral/WorkCalendarUtil.jsp?mode=updateWorkWeek&objectId=" + calendarId +  "&relId=" + relId +  "&relIds=" + relIds + "&uniqueNumber=" + uniqueNumber + "&workingTimes=" + workingTimes + "&newExceptionType=" + newExceptionType ;
				var url = "../programcentral/WorkCalendarUtil.jsp?mode=updateWorkWeek&objectId=" + calendarId + "&relIds=" + relIds + "&uniqueNumber=" + uniqueNumber + "&workingTimes=" + workingTimes + "&newExceptionType=" + newExceptionType +"&contextDayId=" + contextDayId;
	var response = emxUICore.getData(url);
	var target = window.parent;	
	refreshDatePicker(calendarId, target);
	displaySelectedDateInfo(new Date(), target);
	//reloadActiveTab(activeTabIndex);
	topFrame = findFrame(getTopWindow(), "detailsDisplay");
	var url = topFrame.location.href;
	var strUrl = url.split("&activeTabIndex");
	url = strUrl[0] + "&activeTabIndex=" + activeTabIndex;
	topFrame.location.href = url; 		
		    }
		} 
		
	}
}

function cancelChanges(calendarId,tabId,tableId,tabIndex){
	reloadActiveTab(tabIndex);
}

function reloadActiveTab(tabIndex){
	var target = window.parent;	
	var activeIndex = tabIndex;
	target.$("#WorkWeek").attr( 'src', function ( i, val ) { 
		var url = val.split("&activeTabIndex");
		val = url[0] + "&activeTabIndex=" + activeIndex;
		return val; });
}

function getSelectedWorkingHours(){
	var value = $( "#divWorkHours" ).slider( "option", "values" );
	var minIndex = steps[value[0]];
	var maxIndex = steps[value[1]];
	var workingHours = minIndex + ";" +  maxIndex;
	return workingHours;
}


function getSortedWorkingHours(tableId){
	
	var divWorkHoursId = "#divWorkHours";
	if(tableId){
		var tableElement = document.getElementById(tableId);
		divWorkHoursElements = tableElement.querySelectorAll('*[id^="divWorkHours"]');
		divWorkHoursId = "#"+divWorkHoursElements[0].id
	}
	
	var value = $( divWorkHoursId ).slider( "option", "values" );
	var minIndex = steps[value[0]];
	var maxIndex = steps[value[1]];
	var workingHours = minIndex + ";" +  maxIndex;
	
	var sortedRecessTimes = getSortedRecessHours(tableId);
	
	
	var length = sortedRecessTimes.length;
	var recessHours = [];
	for(var i=0; i<length; i++){
		recessHours.push(sortedRecessTimes[i][0]);
		recessHours.push(sortedRecessTimes[i][1]);
	}
	
	recessHours.unshift(value[0]);
	recessHours.push(value[1]);
	var wrkHr = "";
	for(var i=0; (i+1)<recessHours.length; i++,i++){
		wrkHr += steps[recessHours[i]] +"-"+ steps[recessHours[i+1]] + ",";
	}
	
	workingHours = wrkHr.substring(0,wrkHr.length-1);
	
	
	
	return workingHours;
}

function getSortedWorkingHoursForNonWorkingDay(tableId,mode){
	
	var workingTimes  = "" ;	
	if("create" === mode){
		workingTimes  = steps[16] +"-"+ steps[34] ;	
	}
	return workingTimes;
	
}


function getSelectedLunchHours(){
	var value = $( "#divLunchHours" ).slider( "option", "values" );
	var minIndex = steps[value[0]];
	var maxIndex = steps[value[1]];
	var lunchHours = minIndex + ";" +  maxIndex;
	return lunchHours;
}


function getSelectedRecessHours(){
	var sortedRecessTimes = getSortedRecessHours();
	var length = sortedRecessTimes.length;
	var recessHours = null;
	for(var i=0; i<length; i++){
		recessHours+= sortedRecessTimes[i][0] + "-" + sortedRecessTimes[i][1] + ",";
	}
	recessHours = recessHours.substring(0,recessHours.length-1);
	return recessHours;
}

function getSortedRecessHours(tableId){
	var divLunchHoursElements;
	var recessTimes = [];
	if(tableId){
		var tableElement = document.getElementById(tableId);
		divLunchHoursElements = tableElement.querySelectorAll('*[id^="divLunchHours"]');
	}else{
		divLunchHoursElements = document.querySelectorAll('*[id^="divLunchHours"]');
	}
	 
	if(divLunchHoursElements.length >0){
		var lunchHourId = "#"+divLunchHoursElements[0].id;
		var op = $( lunchHourId ).slider( "option", "values" );
	
	
		var length = divLunchHoursElements.length;
		for(var i=0;i<length;i++){
			var lunchHourId = "#"+divLunchHoursElements[i].id;
			var optionValues = $( lunchHourId ).slider( "option", "values" );
			optionValues[0] = parseInt(optionValues[0], 10);
			optionValues[1] = parseInt(optionValues[1], 10);
			if(optionValues[0] != optionValues[1]){
			//if(optionValues[0] != optionValues[1] || length ==1){
				recessTimes.push(optionValues);
			}
		}
	
		
		recessTimes.sort(function(recess1, recess2){if (recess1[0] < recess2[0]) {return -1;}
		if (recess1[0] > recess2[0]) {return 1;}
		return 0;});
	}
	
	return recessTimes;
}

///////////Exception Creation Fields///////////////////////////////////
function getExceptionType(){
	var val = $("input[name=exceptionTypeRadio]:checked").val();
	return val;
}

function getFrequency(){
	var val = $("input[name=recurrenceTypeRadio]:checked").val();
	return val;
}

function getMonthlyRecurringDate(){
	var val = $( "#monthlyRecurringDate" ).val();
	return val;
}

function getMonthlyRecurrringWeekOfMonth(){
	var val = $( "#monthlyRecurringWeekOfMonth" ).val();
	return val;
}

function getMonthlyRecurrringDayOfWeek(){
	var val = $( "#monthlyRecurringDayOfWeek" ).val();
	return val;
}

function getYearlyRecurringDate(){
	var val = $( "#yearlyRecurringDate" ).val();
	return val;
}

function getYearlyRecurrringWeekOfMonth(){
	var val = $( "#yearlyRecurringWeekOfMonth" ).val();
	return val;
}

function getYearlyRecurrringDayOfWeek(){
	var val = $( "#yearlyRecurringDayOfWeek" ).val();
	return val;
}

function getYearlyRecurrringMonthOfYear(){
	var selectedPattern = getYearlyRecurringPattern();
	var val = "";
	if("yearlyRecurringDate" === selectedPattern){
		val = $( "#yearlyrecurringMonthOfYear1" ).val();	
	}else{
		val = $( "#yearlyrecurringMonthOfYear2" ).val();	
	}
	return val;
}

function getMonthlyRecurringPattern(){
	var pattern = $("input[name=monthlyRecurringPattern]:checked").val();
	return pattern;
}

function getYearlyRecurringPattern(){
	var pattern = $("input[name=yearlyRecurringPattern]:checked").val();
	return pattern;
}

function enableAllOptions(optionListId){
  	var optionList = document.getElementById(optionListId);
  	var options = optionList.options;
  	for (var index = 0; index < options.length; index++) {
  		options[index].disabled = false; 
  	}
  };
function populateMonths(optionList){
	var selectedIndex = optionList.selectedIndex;
	var date = selectedIndex + 1;
	enableAllOptions("yearlyrecurringMonthOfYear1");
	var options = document.getElementById("yearlyrecurringMonthOfYear1").options;
	if(date === 31){
		options[1].disabled = true;
		options[3].disabled = true;
		options[5].disabled = true;
		options[8].disabled = true;
		options[10].disabled = true;
    }else if(date > 29){
		options[1].disabled = true;
	}
};

/////////////////////jQuery UI DatePicker/////////////////////////////////

var isTimeRangeValid = function (){
	var selectedWorkHours = $( "#divWorkHours" ).slider( "option", "values" );
	var selectedRecessHours = $( "#divLunchHours" ).slider( "option", "values" );
	
	var workStart = selectedWorkHours[0];
	var workFinish = selectedWorkHours[1];

	var recessStart = selectedRecessHours[0];
	var recessFinish = selectedRecessHours[1];
	
	if( workStart < recessStart && workFinish > recessFinish ){
		return true;
	}
	return false;
}

var displaySelectedDateInfo = function(date, target){
	if(date == null || date == undefined){
		date = new Date();
	}
	
	var month = date.getMonth();
	var year = date.getFullYear();
  	var day = date.getDate();
  	var key = year + "/" + month + "/" + day;

	//Append a unique number to avoid caching in IE 
	var now = new Date();
	var uniqueNumber = now.getMilliseconds();
	var url = "../programcentral/WorkCalendarUtil.jsp?mode=getEventInfoBydate&day=" + day + "&month=" + month + "&year=" + year +  "&uniqueNumber=" + uniqueNumber;
	var response = emxUICore.getData(url);
	var responseJSONObject = emxUICore.parseJSON(response);

	var dateStyle = responseJSONObject[key + "_css"];
	if(typeof dateStyle === 'undefined'){	dateStyle = '';	}
	  
	var eventName = responseJSONObject[key + "_event"];
	if(typeof eventName === 'undefined'){	eventName = '';	}
	  
	var eventStartTime = responseJSONObject[key + "_eventStartTime"];
    if(typeof eventStartTime === 'undefined'){	eventStartTime = '';	}

	var eventFinishTime = responseJSONObject[key + "_eventFinishTime"];
	if(typeof eventFinishTime === 'undefined'){	eventFinishTime = '';	}
		 
	var eventExceptionType = responseJSONObject[key + "_eventExceptionType"];
	if(typeof eventExceptionType === 'undefined'){	eventExceptionType = '';}
	
	var translatedMonthString = responseJSONObject["translatedMonthString"];
	var monthNamesShort = translatedMonthString.split(",");
	var monthNames = monthNamesShort;
	
	var translatedExceptionType = responseJSONObject["translatedExceptionType"];
	
		
	var eventHeader = monthNames[month] + " " + day + ", " + year + " "+"is"+" " + translatedExceptionType;
	var eventTimings = "";
	if("Working" === eventExceptionType){
		
		var translated_Working_Timings = responseJSONObject["translated_Working_Timings"];
	  eventTimings = translated_Working_Timings+" " + eventStartTime + " - " + eventFinishTime;
	}
	if(target == null || target == undefined){
		$('#divEventInfoHeader').html(eventHeader);
		$('#divEventWorkHours').html(eventTimings);
	}else{
		target.$('#divEventInfoHeader').html(eventHeader);
		target.$('#divEventWorkHours').html(eventTimings);
	}
};

var getMonthlyEvents = function(calendarId, year, month){
	  //Append a unique number to avoid caching in IE 
	  var date = new Date();
	  var uniqueNumber = date.getMilliseconds();
	  var url = "../programcentral/WorkCalendarUtil.jsp?mode=getCalendarMonthlyEvents&month=" + month + "&year=" + year + "&objectId=" + calendarId + "&uniqueNumber=" + uniqueNumber;
	  var response = emxUICore.getData(url);
	  var responseJSONObject = emxUICore.parseJSON(response);
	  return responseJSONObject;
};

var loadDatePicker = function (calendarId, target) {
  	var today = new Date();
  	var month = today.getMonth();
  	var year = today.getFullYear();
  	var responseJSONObject = getMonthlyEvents(calendarId, year, month);
	var datepicker;
  	if(target == null || target == undefined){
		datepicker = $("#datepicker");
	}else{
		datepicker = target.$("#datepicker");
	}

	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	
	var key = "translatedatePicker";
	var strURL = "../programcentral/WorkCalendarUtil.jsp?mode=translateMonthsForWorkCalendar&key="+key;
	var responseText = emxUICore.getData(strURL);
	var responseTranslatedJSONObject = emxUICore.parseJSON(responseText);
	var translatedMonthString = responseTranslatedJSONObject["translatedMonthString"];
	var translatedWkDayString = responseTranslatedJSONObject["translatedWkDayString"];
	var monthNamesShort = translatedMonthString.split(",");
	var dayNamesMin = translatedWkDayString.split(",");
	var translatedCurrentText = responseTranslatedJSONObject["translatedCurrentText"];
	
  	datepicker.datepicker({
		changeMonth: true,
		changeYear: true,
		showWeek: false,
		showButtonPanel: true,
		numberOfMonths: 1,
        showOtherMonths: false,
        monthNames : monthNames,
        monthNamesShort: monthNamesShort,
        dayNamesMin: dayNamesMin,
        currentText: translatedCurrentText,
        selectOtherMonths: false,
        onChangeMonthYear: function (year, month) {
        	month = month - 1;
        	responseJSONObject = getMonthlyEvents(calendarId, year, month);
        },
        onSelect: function (date, t) {
        	var oDate = new Date(date);
        	displaySelectedDateInfo(oDate, target);
        },
	    beforeShowDay: function (date) {
	    	var key = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
			var dateStyle = responseJSONObject[key + "_css"];
            if(typeof dateStyle === 'undefined'){	dateStyle = '';	}
            var eventName = responseJSONObject[key + "_event"];
            if(typeof eventName === 'undefined'){	eventName = '';	}
            return [true, dateStyle, eventName];
        }
    });
};

var refreshDatePicker = function (calendarId, target) {
	if(target){
	target.$("#datepicker").datepicker("destroy");
	loadDatePicker(calendarId, target);
	refreshDatePicker(target);
	}
};

var onclickWorkDay = function (event) {
	event.preventDefault();
	refreshDatePicker(target);
};

var add = function(selectedItem, lbl, createType, tableId,relId,calendarId){

	var tracklistTable = document.getElementById(tableId);
    var divLunchHoursElements = tracklistTable.querySelectorAll('*[id^="divLunchHours"]');
    var length = divLunchHoursElements.length;
    
    if(length < 4 ){
    	var workingSlider = 	tracklistTable.querySelectorAll('*[id^="divWorkHours"]');
    	var workingSliderId = "#"+workingSlider[0].id;
    	var selectedWorkingHours = $( workingSliderId ).slider( "option", "values" );
   
    	var newDate = new Date;
    	var id = "divLunchHours"+newDate.getTime();
    	var name = id;
    	newRowIndex = (tracklistTable.rows.length);
    
    	if(createType && createType==="createEvent"){
    			var e = tracklistTable.getElementsByClassName("trHiddenWorkingHours");
    			newRowIndex = e[e.length-1].rowIndex +1;
    	}
    
    	if(createType && createType==="createCalendar"){
    			newRowIndex = tracklistTable.rows.length-1;
    	}
    	
    	if(!createType || createType == null || createType == "null"){
    		newRowIndex = newRowIndex -1;
    	}
    
    	var deleteButtonId = "button_deleteRecess" +newDate.getTime();
    
    	var row = tracklistTable.insertRow(newRowIndex);
      
    	var newRow = '<td class="label" ></td><td class="field"><br/><div id='+id+' name='+name+' ></div></td><td class="field"><br/><button id='+deleteButtonId+' onclick="deleteRecess(this,\''+createType+'\',\''+tableId+'\',\''+calendarId+'\',\''+relId+'\')"><img src="../common/images/iconActionRemove.png" alt='+deleteRecessLabel+' title= '+deleteRecessLabel+' width="20" height="20"/></button></td>';
    	row.innerHTML = newRow;
      
    	var startTime = selectedWorkingHours[0];
    	var finishTime = selectedWorkingHours[1];
    	var midPoint = (startTime + finishTime)/2 ;
    	startTime = Math.floor(midPoint) -1;
    	finishTime = Math.floor(midPoint) +1;
    	options = {"mode": "Lunch Hours", "values": [startTime, finishTime], "disabled" : false};
    	//options = {"mode": "Lunch Hours", "values": [24, 26], "disabled" : false};
    	loadTimeSlider(calendarId, relId, id, workingSlider[0].id,null, options,tableId);
	  
    	if(createType && createType==="createEvent"){
	    	 row.className = "trHiddenWorkingHours";
	    	 $(".trHiddenWorkingHours").show();
    	}
	  
    }
    else{
    	alert(warningMaximumRecess);
    }
}

var deleteRecess = function (selectedItem,createType,tableId,calendarId,relId){

	var tracklistTable = document.getElementById(tableId);
	
	var deleteRowId = selectedItem.parentNode.parentNode.id;
	var deleteRowIndex = selectedItem.parentNode.parentNode.rowIndex;
	
	var divLunchHoursElements = tracklistTable.querySelectorAll('*[id^="divLunchHours"]');
    var length = divLunchHoursElements.length;
    
    var deleteRecess = true;
    if(length == 1){
    	deleteRecess = confirm(confirmDeleteLastRecess);
    }
    if(deleteRecess){
    	tracklistTable.deleteRow(deleteRowIndex);
    }
}

var validateRecessTimes =  function (tableId) {
		var divWorkHoursElements;	
		var divLunchHoursElements;
		if(tableId){
			var tableElement = document.getElementById(tableId);
			divLunchHoursElements = tableElement.querySelectorAll('*[id^="divLunchHours"]');
			divWorkHoursElements = tableElement.querySelectorAll('*[id^="divWorkHours"]');
		}else{
			divLunchHoursElements = document.querySelectorAll('*[id^="divLunchHours"]');
			divWorkHoursElements = document.querySelectorAll('*[id^="divWorkHours"]');
		}
	
		if(divLunchHoursElements.length > 0){
			var lunchHourId = "#"+divLunchHoursElements[0].id;
		 
			var workHourId = "#"+divWorkHoursElements[0].id;
			var workStartFinishTime = $( workHourId ).slider( "option", "values" );
		
			var recessTimes = [];
			var length = divLunchHoursElements.length;
			for(var i=0;i<length;i++){
				var lunchHourId = "#"+divLunchHoursElements[i].id;
				var optionValues = $( lunchHourId ).slider( "option", "values" );
				optionValues[0] = parseInt(optionValues[0], 10);
				optionValues[1] = parseInt(optionValues[1], 10);
				//if((optionValues[0] != optionValues[1]) || (length==1)){
				if((optionValues[0] != optionValues[1])){
					recessTimes.push(optionValues);
				}
			}
		
		
			recessTimes.sort(function(recess1, recess2){if (recess1[0] < recess2[0]) {return -1;}
			if (recess1[0] > recess2[0]) {return 1;}
			return 0;});
		
		
			var workHoursStart =  workStartFinishTime[0];
			var workHoursFinish =  workStartFinishTime[1];
			length = recessTimes.length;
			
			if(length == 1){
				var start = recessTimes[0][0];
				var end = recessTimes[0][1];
				if(workHoursStart == start || workHoursFinish== end){
					alert(warningOverlapWorkHourRecessTimes);
					return false;
				}
			}
			
			for(var j=0; j+1<length; j++){
				var next = j+1;
				var start = recessTimes[j][0];
				var end = recessTimes[j][1];
				var nextStart = recessTimes[next][0];
				var nextEnd = recessTimes[next][1];
			
				if(nextStart <= end ){
				 				
					alert(warningOverlapRecessTimes);
					return false;
				}
				
				if(workHoursStart == start || workHoursFinish== end || workHoursStart == nextStart || workHoursFinish== nextEnd){
	 				
					alert(warningOverlapWorkHourRecessTimes);
					return false;
				}
			}
		}
		return true;
	}



