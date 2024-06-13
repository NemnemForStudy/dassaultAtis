// Calendar --- [s]

function fnRenderCalendar(fromYear, fromMonth, toYear, toMonth, hideBody, idPrefix) {
	let calendarContainer = document.getElementsByClassName("calendar-container");
	
	if ( calendarContainer.length === 0 )
	{
		let fromCalDiv = document.getElementById( "fromCalendarDiv" );
		let fromUICal = new emxUICalendar(window);
		fromUICal.draw(fromCalDiv);
		
		let tdYear = document.getElementById("tdYear");
		let tdYear1 = document.getElementById("tdYear1");
		let tdMonth = document.getElementById("tdMonth");
		
		idPrefix = idPrefix === undefined || idPrefix === null ? "" : idPrefix; 
		
		tdYear.id = idPrefix + "fromTdYear";
		tdYear1.id = idPrefix + "fromTdYear1";
		tdMonth.id = idPrefix + "fromTdMonth";
		
		tdYear.setAttribute("class", "tdYear");
		tdYear1.setAttribute("class", "tdYear1");
		tdMonth.setAttribute("class", "tdMonth");
		
		fromUICal.setMonth = fnOnClickMonth;
		fromUICal.setYear = fnOnClickYear;
		if ( fromMonth ) { fromUICal.setMonth(fromMonth - 1); }
		if ( fromYear ) { fromUICal.setYear(fromYear); }
		
		
		
		let toCalDiv = document.getElementById( "toCalendarDiv" );
		let toUICal = new emxUICalendar(window);
		toUICal.draw(toCalDiv);
		
		tdYear = document.getElementById("tdYear");
		tdYear1 = document.getElementById("tdYear1");
		tdMonth = document.getElementById("tdMonth");
		
		tdYear.id = idPrefix + "toTdYear";
		tdYear1.id = idPrefix + "toTdYear1";
		tdMonth.id = idPrefix + "toTdMonth";
		
		tdYear.setAttribute("class", "tdYear");
		tdYear1.setAttribute("class", "tdYear1");
		tdMonth.setAttribute("class", "tdMonth");
		
		toUICal.setMonth = fnOnClickMonth;
		toUICal.setYear = fnOnClickYear;
		if ( toMonth ) { toUICal.setMonth(toMonth - 1); }
		if ( toYear ) { toUICal.setYear(toYear); }
		
		if ( hideBody === true )
		{
			$(".calendarBody").hide();
		}
	}
}

function fnOnClickMonth(intMonth) {
	if (typeof intMonth != "number") {
	        throw new Error("Required parameter intMonth is null or not a number. (emxUICalendar.js::emxUICalendar.prototype.setMonth)");
	} else if (intMonth > 11 || intMonth < 0) {
	        throw new Error("Required parameter intMonth must be a value between 0 and 11. (emxUICalendar.js::emxUICalendar.prototype.setMonth)");
	}
	this.curDate.setMonth(intMonth);
//Added:For Enhanced Calendar Control:AEF:nr2:20-11-09
	clickedOnCalIcon = "true";
//End:For Enhanced Calendar Control:AEF:nr2:20-11-09
	this.refresh(true);//Added for performance improvement.
	
	$(this.container).parent().find("input[id$='TdMonthVal']").val( intMonth + 1 );
}

function fnOnClickYear(intYear) {
	if (typeof intYear != "number") {
	        throw new Error("Required parameter intYear is null or not a number. (emxUICalendar.js::emxUICalendar.prototype.setYear)");
	}
	this.curDate.setFullYear(intYear);
//Added:For Enhanced Calendar Control:AEF:nr2:20-11-09
	clickedOnCalIcon = "true";
//End:For Enhanced Calendar Control:AEF:nr2:20-11-09
	this.refresh(true); //Added for performance improvement.
	
	$(this.container).parent().find("input[id$='TdYearVal']").val( intYear );
}
// Calendar --- [e]